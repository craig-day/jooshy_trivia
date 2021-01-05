import React from 'react'
import styled from 'styled-components'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { LG, Span, XL, XXL } from '@zendeskgarden/react-typography'
import RoundTypeIcon from '../../../components/RoundTypeIcon'
import {
  Body,
  Head,
  HeaderCell,
  HeaderRow,
  Table,
  Row as TableRow,
  Cell,
} from '@zendeskgarden/react-tables'

const SummaryRow = styled.div`
  & > div {
    & > div {
      border-right: ${(p) =>
        `${p.theme.borders.sm} ${p.theme.palette.grey['300']}`};

      &:last-child {
        border: none;
      }
    }
  }
`

const Divider = styled.hr`
  border: none;
  border-bottom: ${(p) =>
    `${p.theme.borders.sm} ${p.theme.palette.grey['300']}`};
  margin-top: ${(p) => p.theme.space.md};
  margin-bottom: ${(p) => p.theme.space.md};
`

const StatCol = ({ title, value }) => (
  <Col textAlign="center">
    <XL isBold>{title}</XL>
    <br />
    <LG>{value}</LG>
  </Col>
)

const RoundRows = ({ rounds }) =>
  rounds.map((round, i) => (
    <TableRow key={`round-${i}`} isStriped={i % 2 === 1}>
      <Cell isMinimum>{i + 1}.</Cell>
      <Cell isMinimum>
        <Span>
          <Span.StartIcon>
            <RoundTypeIcon type={round.__typename} />
          </Span.StartIcon>
          {`  ${round.name}`}
        </Span>
      </Cell>
      <Cell>{round.questionCount}</Cell>
      <Cell>{round.points}</Cell>
    </TableRow>
  ))

const RoundsTable = ({ rounds }) => (
  <Table>
    <Head>
      <HeaderRow>
        <HeaderCell isMinimum />
        <HeaderCell>Name</HeaderCell>
        <HeaderCell>Questions</HeaderCell>
        <HeaderCell>Points</HeaderCell>
      </HeaderRow>
    </Head>
    <Body>
      <RoundRows rounds={rounds} />
    </Body>
  </Table>
)

export const Summary = ({ game }) => (
  <Grid>
    <SummaryRow>
      <Row>
        <Col size={1} />
        <StatCol
          title="Start Time"
          value={new Date(game.startsAt).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        />
        <StatCol
          title="Registered Players"
          value={game.registeredPlayerCount}
        />
        <StatCol title="Teams" value={game.teams.length} />
        <StatCol title="Rounds" value={game.rounds.length} />
        <Col size={1} />
      </Row>
    </SummaryRow>
    <Divider />
    <Row>
      <Col>
        <XXL>Rounds</XXL>
      </Col>
    </Row>
    <Row>
      <Col size={6}>
        <RoundsTable rounds={game.rounds} />
      </Col>
    </Row>
  </Grid>
)

export default Summary
