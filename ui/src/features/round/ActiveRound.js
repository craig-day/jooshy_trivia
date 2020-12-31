import React, { useEffect, useState } from 'react'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
import { XXL, XXXL } from '@zendeskgarden/react-typography'
import GameLoading from '../../components/GameLoading'

const WaitingForStart = ({ startsAt, onWaitExpire }) => {
  const [timeToStart, setTimeToStart] = useState(startsAt - +new Date())

  useEffect(() => {
    const timer = setTimeout(() => {
      const remainingTime = startsAt - +new Date()

      if (remainingTime <= 0) {
        onWaitExpire()
      } else {
        setTimeToStart(remainingTime)
      }
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timeParts = {
    days: Math.floor(timeToStart / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeToStart / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeToStart / 1000 / 60) % 60),
    seconds: Math.floor((timeToStart / 1000) % 60),
  }

  const timer = [`${timeParts.seconds}s`]

  if (timeParts.minutes > 0) timer.unshift(`${timeParts.minutes}m`)
  if (timeParts.hours > 0) timer.unshift(`${timeParts.hours}h`)
  if (timeParts.days > 0) timer.unshift(`${timeParts.days}d`)

  return <XXL>Round Starts in {timer.join(', ')}</XXL>
}

export const ActiveRound = ({ round }) => {
  const [waitingForStart, setWaitingForStart] = useState(!round.isStarted)

  if (waitingForStart) {
    return (
      <WaitingForStart
        startsAt={+new Date(round.startsAt)}
        onWaitExpire={() => setWaitingForStart(false)}
      />
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
