import React from 'react'
import PickOne from './PickOne'
import MultipleChoice from './MultipleChoice'

export const Round = ({ round }) => {
  switch (round.__typename) {
    case 'PickOne':
      return <PickOne {...round} />
    case 'MultipleChoice':
      return <MultipleChoice {...round} />
    default:
      return null
  }
}

export default Round
