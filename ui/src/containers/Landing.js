import React from 'react'
import { Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Input } from '@zendeskgarden/react-forms'
import CreatePrompt from '../components/game/CreatePrompt'
import RowSpace from '../components/RowSpace'
import { connect } from 'react-redux'
import { createGame, joinGame } from '../redux/features/game/actions'

const CreateButton = (props) => (
  <Row alignItems="center">
    <Col textAlign="center">
      <Button
        onClick={props.onClick}
        className="landing-button"
        size="large"
        isPrimary
        isStretched
      >
        Create Game
      </Button>
    </Col>
  </Row>
)

const JoinButton = (props) => (
  <Row alignItems="center">
    <Col textAlign="center">
      <Button
        className="landing-button"
        size="large"
        onClick={props.onClick}
        isPrimary
        isStretched
      >
        Join Game
      </Button>
    </Col>
  </Row>
)

const LandingButtons = (props) => (
  <div>
    <CreateButton onClick={props.createGame} />
    <RowSpace />
    <JoinButton onClick={props.joinGame} />
  </div>
)

const JoinPrompt = (props) => (
  <div>
    <Row>
      <Col>
        <Field>
          <Label>Code</Label>
          <Input />
        </Field>
      </Col>
    </Row>
    <RowSpace />
    <Row>
      <Col>
        <Button isPrimary isStretched>
          Join
        </Button>
      </Col>
      <Col>
        <Button onClick={props.cancel} isBasic>
          Back
        </Button>
      </Col>
    </Row>
  </div>
)

const Selection = (props) => {
  if (props.isCreating) {
    return <CreatePrompt {...props} />
  } else if (props.isJoining) {
    return <JoinPrompt {...props} />
  } else {
    return <LandingButtons {...props} />
  }
}

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isCreating: false, isJoining: false, code: null }
    this.createGame = this.createGame.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  createGame() {
    this.setState({ isCreating: true, isJoining: false })
  }

  joinGame() {
    this.setState({ isCreating: false, isJoining: true })
  }

  cancel() {
    this.setState({ isCreating: false, isJoining: false })
  }

  render(_props) {
    return (
      <Row alignItems="center">
        <Col textAlign="center">
          <Selection
            isCreating={this.state.isCreating}
            isJoining={this.state.isJoining}
            createGame={this.createGame}
            joinGame={this.joinGame}
            cancel={this.cancel}
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (_state, _ownProps) => {
  return {}
}

const mapDispatchToProps = {
  createGame,
  joinGame,
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
