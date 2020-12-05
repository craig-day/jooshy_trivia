import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as client from '../../app/client'

const initialState = {
  game: null,
}

export const createGame = createAsyncThunk('games/create', async (game) => {
  const response = await client.create('games', { game })

  return response.data
})

export const joinGame = createAsyncThunk('games/join', async (code) => {
  const response = await client.joinGame(code)

  return response.data
})

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: {
    [createGame.fulfilled]: (state, action) => {
      console.log(state, action)
      state.game = action.payload
    },
  },
})

export const { updateCreateForm } = gameSlice.actions

export default gameSlice.reducer
