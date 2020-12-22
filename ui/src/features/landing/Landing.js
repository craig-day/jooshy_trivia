import React, { useState } from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Input, Label } from '@zendeskgarden/react-forms'
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
const CodeInput = ({ value, onChange }) => (
  <Field>
    <Label>Code</Label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} />
  </Field>
)

const JoinInput = ({ code, name, onCodeChange, onNameChange }) => (
  <Row alignItems="center">
    <Col>
      <CodeInput value={code} onChange={onCodeChange} />
    </Col>
    <Col>
      <Field>
        <Label>Name</Label>
        <Input value={name} onChange={onNameChange} />
      </Field>
    </Col>
  </Row>
)

const ManageInput = ({ code, auth, onCodeChange, onAuthChange }) => (
  <Row alignItems="center">
    <Col>
      <CodeInput value={code} onChange={onCodeChange} />
    </Col>
    <Col>
      <Field>
        <Label>Passcode</Label>
        <Input value={auth} onChange={onAuthChange} />
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
          onCodeChange={props.onCodeChange}
          onNameChange={props.onNameChange}
        />
      )
    case Mode.Managing:
      return (
        <ManageInput
          code={props.code}
          auth={props.auth}
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
      return <Submit onClickSubmit={() => {}} onClickCancel={props.onCancel} />
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

  const onClickCreate = () => {
    history.push('/create')
  }

  const onClickJoin = () => {
    setMode(Mode.Joining)
  }

  const onClickManage = () => {
    setMode(Mode.Managing)
  }

  const onSubmitManage = () => {
    setMode(Mode.Loading)
    history.push(`/game/${code}/manage`)
  }

  const onCancel = () => {
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
