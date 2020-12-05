import React, { useState } from 'react'
import './Create.css'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Field, Label, Hint, Input } from '@zendeskgarden/react-forms'
import { Button } from '@zendeskgarden/react-buttons'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { createGame } from './gameSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const Create = (_props) => {
  const [title, setTitle] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [maxPlayers, setMaxPlayers] = useState('')
  const dispatch = useDispatch()

  const onClickCreate = async () => {
    try {
      const resultAction = await dispatch(
        createGame({ title, startsAt, maxPlayers })
      )
      const { data: game } = unwrapResult(resultAction)

      dispatch(push(`/games/${game.id}/edit`))
    } catch (err) {
      console.log('Failed to create post', err)
    }
  }

  return (
    <div className="createForm">
      <Grid>
        <Row alignItems="center" justifyContent="center">
          <Col size={3}>
            <Row>
              <Col>
                <Field>
                  <Label>Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Field>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Field>
                  <Label>Start Time</Label>
                  <Hint>Optional</Hint>
                  <Input
                    value={startsAt}
                    onChange={(e) => setStartsAt(e.target.value)}
                  />
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
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value) || 0)}
                  />
                </Field>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Button onClick={onClickCreate} isPrimary isStretched>
                  Create
                </Button>
              </Col>
              <Col>
                <Button onClick={() => dispatch(push('/'))} isBasic isStretched>
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
