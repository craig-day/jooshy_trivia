import React from 'react'
import {
  Body,
  Chrome,
  Content,
  Header,
  HeaderItemWrapper,
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
import { ReactComponent as SaveIcon } from '@zendeskgarden/svg-icons/src/16/folder-closed-fill.svg'
import { gql, useQuery } from '@apollo/client'
import { Col, Row } from '@zendeskgarden/react-grid'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import { Button } from '@zendeskgarden/react-buttons'
import Summary from './manage/Summary'
import Teams from './manage/Teams'
import Questions from './manage/Questions'

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

const MainContent = ({ loading, url, game }) => {
  if (loading) return <ContentLoading />

  return (
    <Switch>
      <Route path={`${url}/teams`} render={() => <Teams game={game} />} />
      <Route
        path={`${url}/questions`}
        render={() => <Questions game={game} />}
      />
      <Route path={url} render={() => <Summary game={game} />} />
    </Switch>
  )
}

export const Edit = ({ code }) => {
  const { loading, data } = useQuery(GET_GAME, {
    variables: { code },
  })

  const history = useHistory()
  const { url } = useRouteMatch()

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
        <NavItem onClick={() => history.push(`${url}/teams`)}>
          <NavItemIcon>
            <PlayersIcon />
          </NavItemIcon>
          <NavItemText>Teams</NavItemText>
        </NavItem>
        <NavItem onClick={() => history.push(`${url}/questions`)}>
          <NavItemIcon>
            <QuestionIcon />
          </NavItemIcon>
          <NavItemText>Questions</NavItemText>
        </NavItem>
      </Nav>
      <Body>
        <Header>
          <HeaderItemWrapper maxX maxY>
            <Row style={{ width: '100%' }}>
              <Col size={1}></Col>
              <Col textAlign="center" isStretched>
                <XXXL>{data?.gameByCode?.name}</XXXL>
              </Col>
              <Col textAlign="right" size={1}>
                <Button isPrimary>
                  <Button.StartIcon>
                    <SaveIcon />
                  </Button.StartIcon>
                  Save
                </Button>
              </Col>
            </Row>
          </HeaderItemWrapper>
        </Header>
        <Content>
          <Main style={{ padding: 28 }}>
            <MainContent loading={loading} url={url} game={data?.gameByCode} />
          </Main>
        </Content>
      </Body>
    </Chrome>
  )
}
