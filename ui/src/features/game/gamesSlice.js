import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../client'

export const initialState = {}

export const createGame = createAsyncThunk(
  'games/createGame',
  // The payload creator receives the partial `{title, content, user}` object
  async (params) => {
    // We send the initial data to the fake API server
    const response = await client.create('games', params)
    // The response includes the complete post object, including unique ID
    return response.post
  }
)

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    // The existing `postAdded` reducer and prepare callback were deleted
    // reactionAdded(state, action) {}, // omit logic
    // postUpdated(state, action) {}, // omit logic
  },
  extraReducers: {
    // omit posts loading reducers
    [createGame.fulfilled]: (state, action) => {
      // We can directly add the new post object to our posts array
      console.log(state)
      console.log(action)
    },
  },
})

export default gamesSlice.reducer
