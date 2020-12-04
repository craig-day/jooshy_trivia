import { combineReducers } from 'redux'
import gameReducer from '../features/game/reducer'

const rootReducer = combineReducers({
  games: gameReducer,
})

export default rootReducer
