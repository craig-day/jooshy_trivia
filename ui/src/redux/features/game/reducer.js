import { CREATE_GAME, JOIN_GAME } from './actionTypes'

const initialState = {}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return { ...state }
    case JOIN_GAME:
      return { ...state }
    default:
      return state
  }
}

export default gameReducer
