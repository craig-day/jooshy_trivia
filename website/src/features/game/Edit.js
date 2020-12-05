import React from 'react'
import { useSelector } from 'react-redux'

export const Edit = ({ match }) => {
  const { gameId } = match.params

  const game = useSelector((state) => state.game)

  return <h1>Game {game?.code}</h1>
}
