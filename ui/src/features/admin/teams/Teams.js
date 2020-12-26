import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Paragraph, Title, Well } from '@zendeskgarden/react-notifications'
import { Span } from '@zendeskgarden/react-typography'
import { ReactComponent as TeamIcon } from '@zendeskgarden/svg-icons/src/16/user-group-fill.svg'
import * as List from '../../../utils/List'
import { Field, InputGroup, Input, Label } from '@zendeskgarden/react-forms'
import { Button } from '@zendeskgarden/react-buttons'

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

const TeamChunk = ({ teams, onClickCopy }) => {
  const teamCols = teams.map((team, i) => {
    const joinUrl = `${window.location.origin}${team.joinLink}`

    return (
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
          <Paragraph>
            <TeamMembers members={team.members} />
          </Paragraph>
          <br />
          <Field>
            <Label>Join Link</Label>
            <InputGroup isCompact>
              <Input
                id={`join-team-${i}`}
                isCompact
                value={joinUrl}
                onChange={() => {}}
              />
              <Button
                size="small"
                focusInset
                onClick={() => onClickCopy(`join-team-${i}`)}
              >
                Copy
              </Button>
            </InputGroup>
          </Field>
        </Well>
      </Col>
    )
  })

  while (teamCols.length < 3) {
    teamCols.push(<Col key={`team-holder-${teamCols.length}`} />)
  }

  return teamCols
}

const TeamRows = ({ teams, onClickCopy }) =>
  List.chunk(teams, 3).map((teamsChunk, i) => (
    <React.Fragment key={`team-row-${i}`}>
      <Row>
        <TeamChunk teams={teamsChunk} onClickCopy={onClickCopy} />
      </Row>
      <br />
      <br />
    </React.Fragment>
  ))

export const Teams = ({ game: { teams } }) => {
  const onClickCopy = (id) => {
    const copyText = document.querySelector(`#${id}`)
    copyText.select()
    document.execCommand('copy')
  }

  return (
    <Grid>
      <TeamRows teams={teams} onClickCopy={onClickCopy} />
    </Grid>
  )
}

export default Teams
