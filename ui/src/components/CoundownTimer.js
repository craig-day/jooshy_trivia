import { Span } from '@zendeskgarden/react-typography'
import React, { useEffect, useState } from 'react'

const CountdownTimer = ({ millis, onExpire, isMinimal }) => {
  // Compute the end time and store it in state so we only compute it on component mount
  const [endTime] = useState(+new Date() + millis)
  const [remaining, setRemaining] = useState(millis)

  useEffect(() => {
    const timer = setTimeout(() => {
      const remainingTime = endTime - +new Date()

      if (remainingTime <= 0) {
        onExpire && onExpire()
      } else {
        setRemaining(remainingTime)
      }
    }, 1000)

    return () => clearTimeout(timer)
  })

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((remaining / 1000 / 60) % 60)
  const seconds = Math.floor((remaining / 1000) % 60)

  if (seconds < 0)
    return (
      <Span isMonospace hue="red">
        00:00:00
      </Span>
    )

  const timer = [`${seconds > 9 ? seconds : `0${seconds}`}`]

  if (!isMinimal || minutes > 0)
    timer.unshift(`${minutes > 9 ? minutes : `0${minutes}`}`)

  if (!isMinimal || hours > 0)
    timer.unshift(`${hours > 9 ? hours : `0${hours}`}`)

  if (days > 0) {
    return <Span isMonospace>{`${days} days, ${timer.join(':')}`}</Span>
  } else {
    return <Span isMonospace>{timer.join(':')}</Span>
  }
}

export default CountdownTimer
