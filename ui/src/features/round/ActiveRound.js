import React, { useState } from 'react'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { Span, XXL, XXXL } from '@zendeskgarden/react-typography'
import { ReactComponent as ClockIcon } from '@zendeskgarden/svg-icons/src/16/clock-stroke.svg'
import GameLoading from '../../components/GameLoading'
import CountdownTimer from '../../components/CoundownTimer'

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
        <Col textAlign="center">
          <XXXL tag="span">{round.name}</XXXL>
        </Col>
      </Row>
      <Row>
        <Col textAlign="center">
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
        <Col textAlign="center">Loading Questions</Col>
      </Row>
      <Row alignItems="center">
        <Col textAlign="center">
          <GameLoading />
        </Col>
      </Row>
    </Grid>
  )
}

export default ActiveRound
