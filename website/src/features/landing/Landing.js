import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, InputGroup, Input } from '@zendeskgarden/react-forms'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import './Landing.css'

const Landing = () => {
  const dispatch = useDispatch()

  return (
    <div className="landing">
      <Grid>
        <Row alignItems="center" justifyContent="center">
          <Col size={3} textAlign="center">
            <Row alignItems="center">
              <Col isStretched>
                <Button
                  style={{ fontSize: 'larger' }}
                  size="large"
                  onClick={() => dispatch(push('/create'))}
                  isPrimary
                  isStretched
                >
                  Create Game
                </Button>
              </Col>
              <Col isStretched>
                <Button
                  style={{ fontSize: 'larger' }}
                  size="large"
                  onClick={() => dispatch(push('/join'))}
                  isPrimary
                  isStretched
                >
                  Join Game
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col isStretched>
                <hr />
              </Col>
            </Row>
            <br />
            <Row alignItems="center">
              <Col>
                <Button
                  style={{ fontSize: 'larger' }}
                  size="large"
                  onClick={() => {}}
                  isStretched
                  isBasic
                >
                  Manage Game
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default Landing
