import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  Body,
  Chrome,
  Content,
  Header,
  HeaderItemWrapper,
  Main,
  Sidebar,
} from '@zendeskgarden/react-chrome'
import { Col, Row } from '@zendeskgarden/react-grid'
import { Span, LG, XXL, XXXL } from '@zendeskgarden/react-typography'
import { Button } from '@zendeskgarden/react-buttons'
import { ReactComponent as ExitIcon } from '@zendeskgarden/svg-icons/src/16/exit-fill.svg'
import styled from 'styled-components'
import GameLoading from '../../components/GameLoading'
import RoundTypeIcon from '../../components/RoundTypeIcon'
import ActiveRound from '../round/ActiveRound'
import { SAMPLE_GAME } from '../admin/fakeData'

const GET_GAME = gql`
  query GetGame($code: String!) {
    game: gameByCode(code: $code) {
      id
      code
      name
    }
  }
`

const GameBody = ({ loading, game }) => {
  if (loading) return <GameLoading />

  const activeRound =
    game.rounds.find((round) => round.isActive) || game.rounds[0]

  return <ActiveRound round={activeRound} />
}

const StyledRoundName = styled.span`
  display: block;
  padding: ${(p) => p.theme.space.xxs};
  margin-top: ${(p) => p.theme.space.xxs};
  margin-bottom: ${(p) => p.theme.space.xxs};
  margin-left: ${(p) => p.theme.space.sm};
  border: ${(p) => p.theme.borders.sm};
  border-color: ${(p) =>
    p.isActive ? p.theme.palette.blue['600'] : 'transparent'};
  border-radius: ${(p) => p.theme.borderRadii.md};

  ${(p) =>
    p.isActive
      ? `
        color: ${p.theme.palette.white};
        background-color: ${p.theme.palette.blue['500']};
        `
      : ''}

  &:first-of-type {
    margin-top: ${(p) => p.theme.space.md};
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  & svg {
    position: relative;
    top: 1px;
    margin-left: ${(p) => p.theme.space.xs};
    margin-right: ${(p) => p.theme.space.xxs};
  }
`

const StyledScore = styled.div`
  color: ${(p) => p.theme.palette.kale['700']};
  font-size: ${(p) => p.theme.fontSizes.xl};
  font-weight: ${(p) => p.theme.fontWeights.semibold};
`

const RoundName = ({ round }) => (
  <StyledRoundName isActive={round.isActive}>
    <LG>
      {`${round.number}.`}
      <Span>
        <Span.StartIcon>
          <RoundTypeIcon type={round.__typename} />
        </Span.StartIcon>
        {round.name}
      </Span>
    </LG>
  </StyledRoundName>
)

const GameSidebar = ({ loading, game }) => {
  if (loading) return null

  return (
    <React.Fragment>
      <XXL>Rounds:</XXL>
      {game.rounds.map((round, i) => (
        <RoundName key={`round-${i}`} round={round} />
      ))}
    </React.Fragment>
  )
}

export const Play = ({ code }) => {
  const { loading, data, error } = useQuery(GET_GAME, {
    variables: { code },
  })

  // const { game } = data
  const { game } = SAMPLE_GAME

  if (error) {
    console.error(error)
    return <h1>Error: {error.message}</h1>
  }

  // TODO
  const score = 84

  return (
    <Chrome>
      <Body>
        <Header>
          <HeaderItemWrapper maxX maxY>
            <Row style={{ width: '100%', margin: 0 }} alignItems="center">
              <Col size={1}>
                <StyledScore>
                  <Span>{`Score: ${score}`}</Span>
                </StyledScore>
              </Col>
              <Col textAlign="center" isStretched>
                <XXXL>{game?.name}</XXXL>
              </Col>
              <Col textAlign="end" size={1} style={{ padding: 0 }}>
                <Button isDanger>
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
            <GameBody loading={loading} game={game} />
          </Main>
          <Sidebar style={{ padding: 20 }}>
            <GameSidebar loading={loading} game={game} />
          </Sidebar>
        </Content>
      </Body>
    </Chrome>
  )
}

export default Play
