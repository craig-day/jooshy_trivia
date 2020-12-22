import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Title, Well } from '@zendeskgarden/react-notifications'
import { Span } from '@zendeskgarden/react-typography'
import { ReactComponent as TeamIcon } from '@zendeskgarden/svg-icons/src/16/user-group-fill.svg'
import { SAMPLE_GAME } from '../fakeData'
import * as List from '../../../utils/List'

const TeamMembers = ({ members }) => (
  <ul>
    {members.map(({ name }) => (
      <li key={`team-member-${name}`}>{name}</li>
    ))}
  </ul>
)

const TeamChunk = ({ teams }) => {
  const teamCols = teams.map((team) => (
    <Col key={`team-${team.name}`}>
      <Well isFloating>
        <Title>
          <Span>
            <Span.StartIcon>
              <TeamIcon />
            </Span.StartIcon>
            {team.name}
          </Span>
        </Title>
        <TeamMembers members={team.members} />
      </Well>
    </Col>
  ))

  while (teamCols.length < 3) {
    teamCols.push(<Col key={`team-holder-${teamCols.length}`} />)
  }

  return teamCols
}

const TeamRows = ({ teams }) =>
  List.chunk(teams, 3).map((teamsChunk, i) => (
    <React.Fragment key={`team-row-${i}`}>
      <Row>
        <TeamChunk teams={teamsChunk} />
      </Row>
      <br />
      <br />
    </React.Fragment>
  ))

export const Teams = () => {
  const { game } = SAMPLE_GAME

  return (
    <Grid>
      <TeamRows teams={game.teams} />
    </Grid>
  )
}

export default Teams
