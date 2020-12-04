import React from 'react'
import { Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import './Landing.css'

const Landing = () => (
  <div className="landing">
    <Row alignItems="center">
      <Col textAlign="center">
        <Row alignItems="center">
          <Col alignItems="center">
            <Button
              style={{ fontSize: 'larger' }}
              size="large"
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

export default Landing
