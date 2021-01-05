import React, { useState } from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Input, Label, Message } from '@zendeskgarden/react-forms'
import { useHistory } from 'react-router-dom'

const Mode = {
  Default: 'DEFAULT',
  Joining: 'JOIN',
  Managing: 'MANAGE',
  Loading: 'LOADING',
}

const CreateOrJoin = ({ onClickCreate, onClickJoin }) => (
  <Row alignItems="center">
    <Col isStretched>
      <Button isPrimary isStretched onClick={onClickCreate}>
        Create Game
      </Button>
    </Col>
    <Col isStretched>
      <Button isPrimary isStretched onClick={onClickJoin}>
        Join Game
      </Button>
    </Col>
  </Row>
)

const FieldMessage = ({ errors, name }) => {
  if (Object.entries(errors).length < 1) {
    return null
  } else {
    return errors[name] ? (
      <Message validation="error">{errors[name]}</Message>
    ) : (
      <Message validation="success" />
    )
  }
}

const CodeInput = ({ value, onChange, errors }) => (
  <Field>
    <Label>Code</Label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      validation={errors?.code ? 'error' : undefined}
    />
    <FieldMessage name="code" errors={errors} />
  </Field>
)

const JoinInput = ({ code, name, onCodeChange, onNameChange, errors }) => (
  <Row alignItems="center">
    <Col>
      <CodeInput value={code} onChange={onCodeChange} errors={errors} />
    </Col>
    <Col>
      <Field>
        <Label>Name</Label>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          validation={errors?.name ? 'error' : undefined}
        />
        <FieldMessage name="name" errors={errors} />
      </Field>
    </Col>
  </Row>
)

const ManageInput = ({ code, auth, onCodeChange, onAuthChange, errors }) => (
  <Row alignItems="center">
    <Col>
      <CodeInput value={code} onChange={onCodeChange} errors={errors} />
    </Col>
    <Col>
      <Field>
        <Label>Passcode</Label>
        <Input
          value={auth}
          onChange={(e) => onAuthChange(e.target.value)}
          validation={errors?.auth ? 'error' : undefined}
        />
        <FieldMessage name="auth" errors={errors} />
      </Field>
    </Col>
  </Row>
)

const PrimaryLayer = (props) => {
  switch (props.mode) {
    case Mode.Joining:
      return (
        <JoinInput
          code={props.code}
          name={props.name}
          errors={props.errors}
          onCodeChange={props.onCodeChange}
          onNameChange={props.onNameChange}
        />
      )
    case Mode.Managing:
      return (
        <ManageInput
          code={props.code}
          auth={props.auth}
          errors={props.errors}
          onCodeChange={props.onCodeChange}
          onAuthChange={props.onAuthChange}
        />
      )
    default:
      return (
        <CreateOrJoin
          onClickCreate={props.onClickCreate}
          onClickJoin={props.onClickJoin}
        />
      )
  }
}

const Manage = ({ onClickManage }) => (
  <Row alignItems="center">
    <Col>
      <Button isStretched isBasic onClick={onClickManage}>
        Manage Game
      </Button>
    </Col>
  </Row>
)

const Submit = ({ isDisabled, onClickSubmit, onClickCancel }) => (
  <Row>
    <Col isStretched>
      <Button
        isStretched
        isPrimary
        onClick={onClickSubmit}
        isDisabled={isDisabled}
      >
        Submit
      </Button>
    </Col>
    <Col isStretched>
      <Button
        isStretched
        isBasic
        isDanger
        onClick={onClickCancel}
        isDisabled={isDisabled}
      >
        Cancel
      </Button>
    </Col>
  </Row>
)

const SecondaryLayer = (props) => {
  switch (props.mode) {
    case Mode.Joining:
      return (
        <Submit
          onClickSubmit={props.onSubmitJoin}
          onClickCancel={props.onCancel}
        />
      )
    case Mode.Managing:
      return (
        <Submit
          onClickSubmit={props.onSubmitManage}
          onClickCancel={props.onCancel}
        />
      )
    case Mode.Loading:
      return <Submit isDisabled />
    default:
      return <Manage onClickManage={props.onClickManage} />
  }
}

export const Landing = () => {
  const history = useHistory()
  const [mode, setMode] = useState(Mode.Default)
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [auth, setAuth] = useState('')
  const [errors, setErrors] = useState({})

  const onClickCreate = () => {
    history.push('/create')
  }

  const onClickJoin = () => {
    setErrors({})
    setMode(Mode.Joining)
  }

  const onClickManage = () => {
    setErrors({})
    setMode(Mode.Managing)
  }

  const onSubmitJoin = () => {
    setMode(Mode.Loading)

    const validationErrors = {}

    if (!code) validationErrors.code = 'Required'
    if (!name) validationErrors.name = 'Required'

    if (Object.entries(validationErrors).length > 0) {
      setErrors(validationErrors)
      setMode(Mode.Joining)
    } else {
      history.push(`/game/${code}/lobby`)
    }
  }

  const onSubmitManage = () => {
    setMode(Mode.Loading)

    const validationErrors = {}

    if (!code) validationErrors.code = 'Required'
    if (!auth) validationErrors.auth = 'Required'

    if (Object.entries(validationErrors).length > 0) {
      setErrors(validationErrors)
      setMode(Mode.Managing)
    } else {
      history.push(`/game/${code}/manage`)
    }
  }

  const onCancel = () => {
    setErrors({})
    setMode(Mode.Default)
  }

  return (
    <div className="centered-grid-container">
      <Grid>
        <Row alignItems="center" justifyContent="center">
          <Col size={3} textAlign="center">
            <PrimaryLayer
              mode={mode}
              code={code}
              name={name}
              auth={auth}
              errors={errors}
              onCodeChange={setCode}
              onNameChange={setName}
              onAuthChange={setAuth}
              onClickCreate={onClickCreate}
              onClickJoin={onClickJoin}
            />
            <br />
            <Row>
              <Col isStretched>
                <hr />
              </Col>
            </Row>
            <br />
            <SecondaryLayer
              mode={mode}
              onClickManage={onClickManage}
              onSubmitJoin={onSubmitJoin}
              onSubmitManage={onSubmitManage}
              onCancel={onCancel}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default Landing
