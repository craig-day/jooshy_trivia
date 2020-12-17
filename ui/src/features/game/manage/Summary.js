import React from 'react'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { MD } from '@zendeskgarden/react-typography'

export const Summary = ({ game }) => (
  <Grid>
    <Row>
      <Col>
        <MD>Starts at: {game.startsAt}</MD>
        <MD>Max players: {game.maxPlayers}</MD>
      </Col>
    </Row>
    <br />
    <Row>
      <Col></Col>
    </Row>
  </Grid>
)

export default Summary
