import React, { useState } from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Input } from '@zendeskgarden/react-forms'
import { useHistory } from 'react-router-dom'

const Mode = {
  Default: 'DEFAULT',
  Joining: 'JOIN',
  Managing: 'MANAGE',
}

const CreateOrJoin = ({ onClickCreate, onClickJoin }) => (
  <Row alignItems="center">
    <Col isStretched>
      <Button
        style={{ fontSize: 'larger' }}
        size="large"
        isPrimary
        isStretched
        onClick={onClickCreate}
      >
        Create Game
      </Button>
    </Col>
    <Col isStretched>
      <Button
        style={{ fontSize: 'larger' }}
        size="large"
        isPrimary
        isStretched
        onClick={onClickJoin}
      >
        Join Game
      </Button>
    </Col>
  </Row>
)
const CodeInput = () => (
  <Row alignItems="center">
    <Col>
      <Field>
        <Input placeholder="Code" />
      </Field>
    </Col>
  </Row>
)

const PrimaryLayer = (props) => {
  switch (props.mode) {
    case Mode.Joining:
    case Mode.Managing:
      return <CodeInput />
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
      <Button
        style={{ fontSize: 'larger' }}
        size="large"
        isStretched
        isBasic
        onClick={onClickManage}
      >
        Manage Game
      </Button>
    </Col>
  </Row>
)

const Submit = ({ onClickSubmit, onClickCancel }) => (
  <Row>
    <Col isStretched>
      <Button size="large" isStretched isPrimary onClick={onClickSubmit}>
        Submit
      </Button>
    </Col>
    <Col isStretched>
      <Button size="large" isStretched isBasic isDanger onClick={onClickCancel}>
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
      return <Submit onClickSubmit={() => {}} onClickCancel={props.onCancel} />
    default:
      return <Manage onClickManage={props.onClickManage} />
  }
}

export const Landing = () => {
  const history = useHistory()
  const [mode, setMode] = useState(Mode.Default)

  const onClickCreate = () => {
    history.push('/create')
  }

  const onClickJoin = () => {
    setMode(Mode.Joining)
  }

  const onClickManage = () => {
    setMode(Mode.Managing)
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
              onCancel={onCancel}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default Landing
