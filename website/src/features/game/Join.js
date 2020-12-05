import React, { useState } from 'react'
import './Join.css'
import { useDispatch } from 'react-redux'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Field, Label, Input } from '@zendeskgarden/react-forms'
import { Button } from '@zendeskgarden/react-buttons'
import { joinGame } from './gameSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const Join = () => {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const onJoinClick = async () => {
    try {
      const resultAction = await dispatch(joinGame({ code, name }))
      const { data: game } = unwrapResult(resultAction)
    } catch (err) {
      console.log(`Failed to join game: ${err}`)
    }
  }

  return (
    <Grid style={{ height: '100%' }}>
      <Row
        style={{ height: '100%' }}
        alignItems="center"
        justifyContent="center"
      >
        <Col size={3}>
          <Row alignItems="center" justifyContent="center">
            <Col>
              <Field>
                <Label>Game Code</Label>
                <Input
                  placeholder="8 digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  isStretched
                />
              </Field>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Field>
                <Label>Player Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isStretched
                />
              </Field>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button size="large" onClick={onJoinClick} isPrimary isStretched>
                Join!
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  )
}
