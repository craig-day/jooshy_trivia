import React from 'react'
import {
  Body,
  Chrome,
  Content,
  Header,
  HeaderItem,
  HeaderItemText,
  Main,
  Nav,
  NavItem,
  NavItemIcon,
  NavItemText,
} from '@zendeskgarden/react-chrome'
import { MD, XL, XXXL } from '@zendeskgarden/react-typography'
import { Skeleton } from '@zendeskgarden/react-loaders'
import { ReactComponent as HomeIcon } from '@zendeskgarden/svg-icons/src/26/home-fill.svg'
import { ReactComponent as PlayersIcon } from '@zendeskgarden/svg-icons/src/26/group-fill.svg'
import { ReactComponent as QuestionIcon } from '@zendeskgarden/svg-icons/src/16/list-bullet-fill.svg'
import { gql, useQuery } from '@apollo/client'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { useHistory } from 'react-router-dom'

const GET_GAME = gql`
  query GetGame($code: String!) {
    gameByCode(code: $code) {
      id
      code
      name
      startsAt
      maxPlayers
    }
  }
`

const ContentLoading = () => (
  <Row>
    <Col sm={5}>
      <XXXL>
        <Skeleton />
      </XXXL>
      <XL>
        <Skeleton />
      </XL>
      <MD>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </MD>
    </Col>
  </Row>
)

const GameSummary = ({ game }) => (
  <Grid>
    <Row>
      <Col>
        <XXXL>{game.name}</XXXL>
      </Col>
    </Row>
    <br />
    <Row>
      <Col>
        <MD>Starts at: {game.startsAt}</MD>
      </Col>
    </Row>
    <br />
    <Row>
      <Col>
        <MD>Max players: {game.maxPlayers}</MD>
      </Col>
    </Row>
  </Grid>
)

const MainContent = ({ loading, game }) => {
  if (loading) return <ContentLoading />

  return <GameSummary game={game} />
}

export const Edit = ({ code }) => {
  const { loading, data } = useQuery(GET_GAME, {
    variables: { code },
  })

  const history = useHistory()

  return (
    <Chrome isFluid>
      <Nav isExpanded>
        <NavItem hasLogo>
          <NavItemText>This needs a logo</NavItemText>
        </NavItem>
        <NavItem onClick={() => history.push(`/game/${code}/manage`)}>
          <NavItemIcon>
            <HomeIcon />
          </NavItemIcon>
          <NavItemText>Game</NavItemText>
        </NavItem>
        <NavItem onClick={() => history.push(`/game/${code}/manage/teams`)}>
          <NavItemIcon>
            <PlayersIcon />
          </NavItemIcon>
          <NavItemText>Teams</NavItemText>
        </NavItem>
        <NavItem onClick={() => history.push(`/game/${code}/manage/questions`)}>
          <NavItemIcon>
            <QuestionIcon />
          </NavItemIcon>
          <NavItemText>Questions</NavItemText>
        </NavItem>
      </Nav>
      <Body>
        <Header />
        <Content>
          <Main style={{ padding: 28 }}>
            <MainContent loading={loading} game={data?.gameByCode} />
          </Main>
        </Content>
      </Body>
    </Chrome>
  )
}
