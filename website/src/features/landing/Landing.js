import React from 'react'
import { Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import './Landing.css'

const Landing = () => {
  const dispatch = useDispatch()

  return (
    <div className="landing">
      <Row alignItems="center">
        <Col textAlign="center">
          <Row alignItems="center">
            <Col alignItems="center">
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
          </Row>
          <br />
          <Row alignItems="center">
            <Col alignItems="center">
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
        </Col>
      </Row>
    </div>
  )
}
export default Landing
