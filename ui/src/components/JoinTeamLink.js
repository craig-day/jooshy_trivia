import React from 'react'
import { Field, Label, InputGroup, Input } from '@zendeskgarden/react-forms'
import { Button } from '@zendeskgarden/react-buttons'

const onClickCopy = (id) => {
  const copyText = document.querySelector(`#${id}`)
  copyText.select()
  document.execCommand('copy')
}

const TeamJoinLink = ({ team, hideLabel }) => (
  <Field>
    {!hideLabel && <Label>Join Link</Label>}
    <InputGroup isCompact>
      <Input
        id={`join-team-${team.id}`}
        isCompact
        value={`${window.location.origin}${team.joinLink}`}
        readOnly
      />
      <Button
        size="small"
        focusInset
        onClick={() => onClickCopy(`join-team-${team.id}`)}
      >
        Copy
      </Button>
    </InputGroup>
  </Field>
)

export default TeamJoinLink
