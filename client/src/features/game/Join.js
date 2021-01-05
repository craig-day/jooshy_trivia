import { gql, useMutation } from '@apollo/client'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Input, Label, Message } from '@zendeskgarden/react-forms'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { Spinner } from '@zendeskgarden/react-loaders'
import { XL } from '@zendeskgarden/react-typography'
import React, { useState } from 'react'
import styled from 'styled-components'

const JOIN_TEAM = gql`
  mutation JoinTeam($code: String!, $name: String!) {
    joinTeam(code: $code, name: $name) {
      id
    }
  }
`

const FullHeightGrid = styled(Grid)`
  height: 100%;
`

const FullHeightRow = styled(Row)`
  height: 100%;
`

const JoiningGame = () => (
  <FullHeightGrid>
    <FullHeightRow alignItems="center" justifyContent="center">
      <Col textAlign="center">
        <Spinner size="128" />
      </Col>
    </FullHeightRow>
  </FullHeightGrid>
)

const NamePrompt = ({ value, errors, onChange, onSubmit }) => (
  <FullHeightGrid>
    <FullHeightRow alignItems="center" justifyContent="center">
      <Col xl={4} lg={8} textAlign="center">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <Row>
            <Col>
              <Field>
                <Label>
                  <XL>Name</XL>
                </Label>
                <Input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  validation={errors.name ? 'error' : undefined}
                />
                {errors.name && (
                  <Message validation="error">{errors.name}</Message>
                )}
              </Field>
            </Col>
          </Row>
          <br />
          <Row justifyContent="center">
            <Col xl={6} lg={12}>
              <Button isPrimary isStretched onClick={onSubmit}>
                Join
              </Button>
            </Col>
          </Row>
        </form>
      </Col>
    </FullHeightRow>
  </FullHeightGrid>
)

export const Join = ({ code }) => {
  const [joinGame, { loading, data, error }] = useMutation(JOIN_TEAM)

  const [name, setName] = useState('')
  const [errors, setErrors] = useState({})

  if (loading) return <JoiningGame />

  const onClickJoin = () => {
    const newErrors = {}

    if (!name) newErrors.name = 'Required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    joinGame({ variables: { code, name } })
  }

  return (
    <NamePrompt
      value={name}
      errors={errors}
      onChange={setName}
      onSubmit={onClickJoin}
    />
  )
}

export default Join
