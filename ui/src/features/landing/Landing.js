import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { useHistory } from 'react-router-dom'

const Landing = () => {
  const history = useHistory()

  return (
    <div className="centered-grid-container">
      <Grid>
        <Row alignItems="center" justifyContent="center">
          <Col size={3} textAlign="center">
            <Row alignItems="center">
              <Col isStretched>
                <Button
                  style={{ fontSize: 'larger' }}
                  size="large"
                  isPrimary
                  isStretched
                  onClick={() => history.push('/create')}
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
                  onClick={() => history.push('/join')}
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
