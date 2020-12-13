import React from 'react'

export const Join = ({ code }) =>
  code ? <h1>Joining Game {code}</h1> : <h1>Prompt for Join Code</h1>

export default Join
