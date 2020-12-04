import './App.css'
import React from 'react'
import { Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { Field, Label, Input } from '@zendeskgarden/react-forms'

const CreateButton = (props) => (
  <Row alignItems="center">
    <Col textAlign="center">
      <Button
        onClick={props.createGame}
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

const RowSpace = () => (
  <Row>
    <div className="row-spacer" />
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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isJoining: false, code: null }
    this.createGame = this.createGame.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  createGame() {}

  joinGame() {
    this.setState({ isJoining: true })
  }

  cancel() {
    this.setState({ isJoining: false })
  }

  render(_props) {
    return (
      <div className="landing">
        <ThemeProvider>
          <Row alignItems="center">
            <Col textAlign="center">
              {this.state.isJoining ? (
                <JoinPrompt cancel={this.cancel} />
              ) : (
                <LandingButtons
                  createGame={this.createGame}
                  joinGame={this.joinGame}
                  cancel={this.cancel}
                />
              )}
            </Col>
          </Row>
        </ThemeProvider>
      </div>
    )
  }
}

export default App
