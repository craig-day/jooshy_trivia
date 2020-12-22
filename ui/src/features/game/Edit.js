import React, { useState } from 'react'
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
import { ReactComponent as PlayersIcon } from '@zendeskgarden/svg-icons/src/16/user-list-fill.svg'
import { ReactComponent as QuestionIcon } from '@zendeskgarden/svg-icons/src/16/list-bullet-fill.svg'
import { ReactComponent as ExitIcon } from '@zendeskgarden/svg-icons/src/16/exit-fill.svg'
import { gql, useQuery } from '@apollo/client'
import { Col, Row } from '@zendeskgarden/react-grid'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import { Button } from '@zendeskgarden/react-buttons'
import Summary from '../admin/summary/Summary'
import Teams from '../admin/teams/Teams'
import Questions from '../admin/questions/Questions'

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
        path={`${url}/questions/:round`}
        render={() => <Questions game={game} />}
      />
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

  const [currentNav, setCurrentNav] = useState('')
  const history = useHistory()
  const { url } = useRouteMatch()
  const {
    location: { pathname },
  } = history

  const questionUrlPattern = new RegExp(`${url}/questions`)

  const isSelectedNav = (nav) => {
    if (pathname.match(questionUrlPattern)) {
      return nav === 'questions'
    } else {
      return nav === currentNav
    }
  }

  const onClickNav = (nav) => {
    setCurrentNav(nav)

    switch (nav) {
      case 'teams':
        history.push(`${url}/teams`)
        break
      case 'questions':
        history.push(`${url}/questions`)
        break
      default:
        history.push(`/game/${code}/manage`)
    }
  }

  return (
    <Chrome isFluid>
      <Nav isExpanded>
        <NavItem hasLogo>
          <NavItemText>This needs a logo</NavItemText>
        </NavItem>
        <NavItem isCurrent={isSelectedNav('')} onClick={() => onClickNav('')}>
          <NavItemIcon>
            <HomeIcon />
          </NavItemIcon>
          <NavItemText>Summary</NavItemText>
        </NavItem>
        <NavItem
          isCurrent={isSelectedNav('teams')}
          onClick={() => onClickNav('teams')}
        >
          <NavItemIcon>
            <PlayersIcon />
          </NavItemIcon>
          <NavItemText>Teams</NavItemText>
        </NavItem>
        <NavItem
          isCurrent={isSelectedNav('questions')}
          onClick={() => onClickNav('questions')}
        >
          <NavItemIcon>
            <QuestionIcon />
          </NavItemIcon>
          <NavItemText>Questions</NavItemText>
        </NavItem>
      </Nav>
      <Body>
        <Header>
          <HeaderItemWrapper maxX maxY>
            <Row style={{ width: '100%', margin: 0 }} alignItems="center">
              <Col size={1}></Col>
              <Col textAlign="center" isStretched>
                <XXXL>{data?.gameByCode?.name}</XXXL>
              </Col>
              <Col textAlign="end" size={1} style={{ padding: 0 }}>
                <Button>
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
          <Main style={{ padding: 28 }}>
            <MainContent loading={loading} url={url} game={data?.gameByCode} />
          </Main>
        </Content>
      </Body>
    </Chrome>
  )
}
