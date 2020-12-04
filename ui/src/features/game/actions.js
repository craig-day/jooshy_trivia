import { CREATE_GAME, JOIN_GAME } from './actionTypes'

export const createGame = (game) => ({
  type: CREATE_GAME,
  payload: {
    game,
  },
})

export const joinGame = ({ code }) => ({
  type: JOIN_GAME,
  payload: {
    code,
  },
})
