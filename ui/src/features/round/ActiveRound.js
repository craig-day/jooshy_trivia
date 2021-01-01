import React, { useState } from 'react'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { LG, Span, XXL, XXXL } from '@zendeskgarden/react-typography'
import { ReactComponent as ClockIcon } from '@zendeskgarden/svg-icons/src/16/clock-stroke.svg'
import CountdownTimer from '../../components/CoundownTimer'
import Round from './Round'

export const ActiveRound = ({ round }) => {
  const [waitingForStart, setWaitingForStart] = useState(!round.isStarted)

  const roundStart = new Date(round.startsAt)
  const now = new Date()
  const timerDuration = roundStart > now ? roundStart - now : 0

  if (waitingForStart) {
    return (
      <XXL>
        <CountdownTimer
          millis={timerDuration}
          onExpire={() => setWaitingForStart(false)}
        />
      </XXL>
    )
  }

  return (
    <Grid>
      <Row>
        <Col>
          <XXXL tag="span">{round.name}</XXXL>
        </Col>
      </Row>
      <Row>
        <Col>
          <XXL tag="span">
            <Span>
              <Span.StartIcon>
                <ClockIcon />
              </Span.StartIcon>
              <CountdownTimer millis={round.duration * 1000} isMinimal />
            </Span>
          </XXL>
        </Col>
      </Row>
      <Row>
        <Col>
          <LG>{round.description}</LG>
        </Col>
      </Row>
      <Row>
        <Col>
          <Round round={round} />
        </Col>
      </Row>
    </Grid>
  )
}

export default ActiveRound
