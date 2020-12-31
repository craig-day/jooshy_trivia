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
import { XXL, XXXL } from '@zendeskgarden/react-typography'
import GameLoading from '../../components/GameLoading'
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

export const Lobby = ({ code }) => {
  const { loading, data, error } = useQuery(GET_GAME, {
    variables: { code },
  })

  if (loading) return <GameLoading />

  // const { game } = data
  const { game } = SAMPLE_GAME

  if (error) {
    console.error(error)
    return <h1>Error: {error.message}</h1>
  }

  return (
    <Chrome>
      <Body>
        <Header>
          <HeaderItemWrapper maxX maxY>
            <Row style={{ width: '100%', margin: 0 }} alignItems="center">
              <Col size={1}></Col>
              <Col textAlign="center" isStretched>
                <XXXL>{game.name}</XXXL>
              </Col>
              <Col textAlign="end" size={1} style={{ padding: 0 }}></Col>
            </Row>
          </HeaderItemWrapper>
        </Header>
        <Content>
          <Main style={{ padding: 20 }}>
            Hello! Welcome to game {game.name}
          </Main>
          <Sidebar style={{ padding: 20 }}>
            <XXL>Rounds:</XXL>
          </Sidebar>
        </Content>
      </Body>
    </Chrome>
  )
}

export default Lobby
