import React from 'react'
import styled from 'styled-components'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { LG, XL } from '@zendeskgarden/react-typography'

const SummaryRow = styled.div`
  & > div {
    & > div {
      border-right: 1px solid ${(p) => p.theme.colors.neutralHue};

      &:last-child {
        border: none;
      }
    }
  }
`

const StatCol = ({ title, value }) => (
  <Col textAlign="center">
    <XL isBold>{title}</XL>
    <br />
    <LG>{value}</LG>
  </Col>
)

export const Summary = ({ game }) => (
  <Grid>
    <SummaryRow>
      <Row>
        <Col size={1} />
        <StatCol title="Start Time" value={game.startsAt} />
        <StatCol
          title="Registered Players"
          value={game.registeredPlayerCount}
        />
        <StatCol title="Teams" value={game.teams.length} />
        <StatCol title="Rounds" value={game.rounds.length} />
        <Col size={1} />
      </Row>
    </SummaryRow>
    <br />
    <Row>
      <Col></Col>
    </Row>
  </Grid>
)

export default Summary
