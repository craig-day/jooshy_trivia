import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

export default configureStore({
  reducer: {
    router: connectRouter(history),
    counter: counterReducer,
  },
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
})
