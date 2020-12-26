import React from 'react'
import styled from 'styled-components'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { LG, XL, XXL } from '@zendeskgarden/react-typography'
import { ReactComponent as NextIcon } from '@zendeskgarden/svg-icons/src/16/chevron-double-right-fill.svg'
import RoundTypeIcon from '../../../components/RoundTypeIcon'
import { Tiles } from '@zendeskgarden/react-forms'
import * as List from '../../../utils/List'

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

const RoundTile = ({ type, name, questionCount, points }) => (
  <Tiles
    name={name}
    onChange={(e) => e.preventDefault() && e.stopPropagation()}
  >
    <Tiles.Tile
      value="one"
      onClick={(e) => e.preventDefault()}
      style={{ cursor: 'default' }}
    >
      <Tiles.Icon>
        <RoundTypeIcon type={type} />
      </Tiles.Icon>
      <Tiles.Label>{name}</Tiles.Label>
      <Tiles.Description>
        {questionCount === 1 ? `1 question` : `${questionCount} questions`},{' '}
        {points === 1 ? `1 point` : `${points} points`}
      </Tiles.Description>
    </Tiles.Tile>
  </Tiles>
)

const StyledTransitionIcon = styled.div`
  padding: ${(p) => p.theme.space.sm};
  text-align: center;
  flex-grow: 1;
`

const NextRound = () => (
  <Col size={0.5}>
    <StyledTransitionIcon>
      <NextIcon />
    </StyledTransitionIcon>
  </Col>
)

const RoundFlowChart = ({ rounds }) =>
  List.chunk(rounds, 5).map((roundChunk, i) => (
    <React.Fragment key={`round-row-${i}`}>
      <Row alignItems="center">
        {roundChunk.map((round, j) => (
          <React.Fragment key={`round-${j}`}>
            <Col size={2}>
              <RoundTile
                type={round.__typename}
                name={round.name}
                questionCount={round.questionCount}
                points={round.points}
              />
            </Col>
            {j < roundChunk.length - 1 ? <NextRound /> : null}
          </React.Fragment>
        ))}
      </Row>
      {i < rounds.length / 5 - 1 ? <br /> : null}
    </React.Fragment>
  ))

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
    <br />
    <Row>
      <Col>
        <RoundFlowChart rounds={game.rounds} />
      </Col>
    </Row>
  </Grid>
)

export default Summary
