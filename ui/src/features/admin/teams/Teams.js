import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Paragraph, Title, Well } from '@zendeskgarden/react-notifications'
import { Span } from '@zendeskgarden/react-typography'
import { ReactComponent as TeamIcon } from '@zendeskgarden/svg-icons/src/16/user-group-fill.svg'
import * as List from '../../../utils/List'
import TeamJoinLink from '../../../components/JoinTeamLink'

const TeamMembers = ({ members }) =>
  members.length < 1 ? (
    <Span>No team members</Span>
  ) : (
    <ul>
      {members.map(({ name }) => (
        <li key={`team-member-${name}`}>{name}</li>
      ))}
    </ul>
  )

const TeamChunk = ({ teams }) => {
  const teamCols = teams.map((team) => (
    <Col key={`team-${team.id}`}>
      <Well isFloating>
        <Title>
          <Span>
            <Span.StartIcon>
              <TeamIcon />
            </Span.StartIcon>
            {team.name}
          </Span>
        </Title>
        <Paragraph>
          <TeamMembers members={team.members} />
        </Paragraph>
        <br />
        <TeamJoinLink team={team} />
      </Well>
    </Col>
  ))

  while (teamCols.length < 3) {
    teamCols.push(<Col key={`team-holder-${teamCols.length}`} />)
  }

  return teamCols
}

const TeamRows = ({ teams }) =>
  List.chunk(teams, 4).map((teamsChunk, i) => (
    <React.Fragment key={`team-row-${i}`}>
      <Row>
        <TeamChunk teams={teamsChunk} />
      </Row>
      <br />
      <br />
    </React.Fragment>
  ))

export const Teams = ({ game: { teams } }) => (
  <Grid>
    <TeamRows teams={teams} />
  </Grid>
)

export default Teams
