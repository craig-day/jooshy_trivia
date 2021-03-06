import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import {
  Body,
  Chrome,
  Content,
  Header,
  HeaderItemWrapper,
  Main,
  Sidebar,
} from '@zendeskgarden/react-chrome'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { Span, LG, XXL, XXXL, Paragraph } from '@zendeskgarden/react-typography'
import { Button } from '@zendeskgarden/react-buttons'
import * as Modal from '@zendeskgarden/react-modals'
import { ReactComponent as ExitIcon } from '@zendeskgarden/svg-icons/src/16/exit-fill.svg'
import { ReactComponent as LockIcon } from '@zendeskgarden/svg-icons/src/16/lock-locked-fill.svg'
import GameLoading from '../../components/GameLoading'
import RoundTypeIcon from '../../components/RoundTypeIcon'
import ActiveRound from '../round/ActiveRound'
import { ROUND_STATE, SAMPLE_GAME } from '../admin/fakeData'
import JoinTeamLink from '../../components/JoinTeamLink'
import { Spinner } from '@zendeskgarden/react-loaders'

const GET_GAME = gql`
  query GetGame($code: String!) {
    game: gameByCode(code: $code) {
      id
      code
      name
    }
  }
`

const GameBody = ({ loading, game, routeMatch }) => {
  if (loading) return <GameLoading />

  const activeRound = routeMatch?.params?.number
    ? game.rounds.find((r) => +r.number === +routeMatch?.params?.number)
    : game.rounds.find((r) => r.state === ROUND_STATE.ACTIVE) || game.rounds[0]

  return <ActiveRound round={activeRound} />
}

const StyledRoundRow = styled(Row)`
  padding: ${(p) => p.theme.space.xxs};
  margin-top: ${(p) => p.theme.space.xxs};
  margin-bottom: ${(p) => p.theme.space.xxs};
  margin-left: ${(p) => p.theme.space.sm};
  border: ${(p) => p.theme.borders.sm};
  border-color: ${(p) =>
    p.isActive ? p.theme.palette.blue['600'] : 'transparent'};
  border-radius: ${(p) => p.theme.borderRadii.md};
  border-color: ${(p) =>
    p.isSelected
      ? p.isActive
        ? p.theme.palette.blue['600']
        : p.theme.palette.grey['400']
      : 'transparent'};

  ${(p) =>
    p.isActive
      ? `
        color: ${p.theme.palette.white};
        background-color: ${p.theme.palette.blue['500']};
        `
      : ''}

  &:hover {
    ${(p) =>
      p.isActive
        ? `
          cursor: pointer;
          background-color: ${p.theme.palette.blue['600']};
          border-color: ${p.theme.palette.blue['700']};
          `
        : ''}

    ${(p) =>
      p.isCompleted
        ? `
          cursor: pointer;
          background-color: ${p.theme.palette.grey['200']};
          border-color: ${p.theme.palette.grey['200']};
          `
        : ''}
  }

  &:first-of-type {
    margin-top: ${(p) => p.theme.space.md};
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const StyledRoundCol = styled(Col)`
  padding-left: 0;
  padding-right: 0;
`

const RoundStatusIcon = ({ state, score }) => {
  switch (state) {
    case ROUND_STATE.NOT_STARTED:
      return (
        <LG>
          <LockIcon />
        </LG>
      )
    case ROUND_STATE.ACTIVE:
      return (
        <LG>
          <Spinner />
        </LG>
      )
    case ROUND_STATE.COMPLETED:
      return <LG>{score}</LG>
    default:
      return null
  }
}

const RoundName = ({ round, isActive, isSelected, onClick }) => (
  <StyledRoundRow
    isCompleted={round.state === ROUND_STATE.COMPLETED}
    isActive={isActive}
    isSelected={isSelected}
    onClick={() => round.state !== ROUND_STATE.NOT_STARTED && onClick()}
  >
    <StyledRoundCol size={1}>
      <LG>{`${round.number}.`}</LG>
    </StyledRoundCol>
    <StyledRoundCol size={1}>
      <LG>
        <RoundTypeIcon type={round.__typename} />
      </LG>
    </StyledRoundCol>
    <StyledRoundCol>
      <LG>{round.name}</LG>
    </StyledRoundCol>
    <StyledRoundCol size={1}>
      <RoundStatusIcon state={round.state} score={round.score} />
    </StyledRoundCol>
  </StyledRoundRow>
)

const GameSidebar = ({ loading, game, history, routeMatch }) => {
  if (loading) return null

  const onClickRound = (number) => () => {
    const {
      path,
      url,
      params: { code },
    } = routeMatch

    const urlTo =
      path === '*'
        ? `${url}/round/${number}`
        : path.replace(':code', code).replace(':number', number)

    history.push(urlTo)
  }

  return (
    <Grid>
      <XXL>Rounds:</XXL>
      {game.rounds.map((round, i) => (
        <RoundName
          key={`round-${i}`}
          round={round}
          isActive={round.state === ROUND_STATE.ACTIVE}
          isSelected={+round.number === +routeMatch.params.number}
          onClick={onClickRound(round.number)}
        />
      ))}
    </Grid>
  )
}

const ExitPrompt = ({ visible, setVisible, team, history }) => {
  if (!visible) return null

  return (
    <Modal.Modal onClose={() => setVisible(false)}>
      <Modal.Header isDanger>Are you sure you want to exit?</Modal.Header>
      <Modal.Body>
        <Paragraph>
          You will be able to join again later using the same link.
        </Paragraph>
        <br />
        <JoinTeamLink team={team} hideLabel />
      </Modal.Body>
      <Modal.Footer>
        <Button isPrimary isDanger onClick={() => history.push('/')}>
          Exit Game
        </Button>
      </Modal.Footer>
      <Modal.Close aria-label="Close modal" />
    </Modal.Modal>
  )
}

const StyledScore = styled.div`
  color: ${(p) => p.theme.palette.kale['700']};
  font-size: ${(p) => p.theme.fontSizes.xl};
  font-weight: ${(p) => p.theme.fontWeights.semibold};
`

const PlayGame = ({ code }) => {
  const { loading, error } = useQuery(GET_GAME, {
    variables: { code },
  })

  const routeMatch = useRouteMatch()
  const history = useHistory()
  const [showExitPrompt, setShowExitPrompt] = useState(false)

  if (error) return <h1>Error: {error.message}</h1>

  // const { game } = data
  const { game } = SAMPLE_GAME
  const { currentTeam } = game

  return (
    <Chrome>
      <Body>
        <Header>
          <HeaderItemWrapper maxX maxY>
            <Row style={{ width: '100%', margin: 0 }} alignItems="center">
              <Col size={1}>
                <StyledScore>
                  <Span>{`Score: ${currentTeam?.score}`}</Span>
                </StyledScore>
              </Col>
              <Col textAlign="center" isStretched>
                <XXXL>{game?.name}</XXXL>
              </Col>
              <Col textAlign="end" size={1} style={{ padding: 0 }}>
                <Button isDanger onClick={() => setShowExitPrompt(true)}>
                  <Button.StartIcon>
                    <ExitIcon />
                  </Button.StartIcon>
                  Exit
                </Button>
              </Col>
            </Row>
          </HeaderItemWrapper>
        </Header>
        <Content>
          <Main style={{ padding: 20 }}>
            <GameBody loading={loading} game={game} routeMatch={routeMatch} />
            <ExitPrompt
              visible={showExitPrompt}
              setVisible={setShowExitPrompt}
              team={currentTeam}
              history={history}
            />
          </Main>
          <Sidebar style={{ padding: 20 }}>
            <GameSidebar
              loading={loading}
              game={game}
              history={history}
              routeMatch={routeMatch}
            />
          </Sidebar>
        </Content>
      </Body>
    </Chrome>
  )
}

export const Play = ({ code }) => {
  const routeMatch = useRouteMatch()

  return (
    <Switch>
      <Route
        path={`${routeMatch.path}/round/:number`}
        render={({ match }) => <PlayGame code={code} />}
      />
      <Route path="*" render={() => <PlayGame code={code} />} />
    </Switch>
  )
}

export default Play
