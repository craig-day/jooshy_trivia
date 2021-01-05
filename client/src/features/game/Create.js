import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Field, Label, Input, Hint, Message } from '@zendeskgarden/react-forms'
import { Button } from '@zendeskgarden/react-buttons'

const CREATE_GAME = gql`
  mutation CreateGame($name: String!, $startsAt: String, $maxPlayers: Int) {
    createGame(name: $name, startsAt: $startsAt, maxPlayers: $maxPlayers) {
      code
    }
  }
`

export const Create = () => {
  const [name, setName] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('')
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState({})
  const history = useHistory()
  const [createGame] = useMutation(CREATE_GAME)

  const onClickCreate = () => {
    setPending(true)

    const variables = { name, startsAt }
    const validationErrors = {}

    if (!name) validationErrors.name = 'Name is required'
    if (!startsAt) validationErrors.startsAt = 'Start time is required'

    if (Object.entries(validationErrors).length > 0) {
      setErrors(validationErrors)
      setPending(false)
      return
    }

    if (maxPlayers > 0) variables.maxPlayers = Number(maxPlayers)

    return createGame({ variables }).then(({ data }) => {
      history.push(`/game/${data.createGame.code}/manage`)
    })
  }

  return (
    <div className="centered-grid-container">
      <Grid>
        <Row justifyContent="center" alignItems="center">
          <Col size={4} justifyContent="center">
            <Row>
              <Col>
                <Field>
                  <Label>Game Name</Label>
                  <Input
                    disabled={pending}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    validation={errors?.name ? 'error' : undefined}
                  />
                  {errors?.name ? (
                    <Message validation="error">{errors.name}</Message>
                  ) : null}
                </Field>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Field>
                  <Label>Start Time</Label>
                  <Input
                    disabled={pending}
                    type="datetime-local"
                    value={startsAt}
                    onChange={(e) => setStartsAt(e.target.value)}
                    validation={errors?.startsAt ? 'error' : undefined}
                  />
                  {errors?.startsAt ? (
                    <Message validation="error">{errors.startsAt}</Message>
                  ) : null}
                </Field>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Field>
                  <Label>Max Players</Label>
                  <Hint>Optional</Hint>
                  <Input
                    disabled={pending}
                    type="number"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(e.target.value)}
                  />
                </Field>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Button isPrimary isStretched onClick={() => onClickCreate()}>
                  Create
                </Button>
              </Col>
              <Col>
                <Button
                  isBasic
                  isDanger
                  isStretched
                  onClick={() => history.push('/')}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default Create
