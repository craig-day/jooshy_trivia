import React from 'react'
import MultipleChoice from './MultipleChoice'
import Music from './Music'
import PickOne from './PickOne'

export const Round = (props) => {
  switch (props.round.__typename) {
    case 'PickOne':
      return <PickOne {...props} />
    case 'MultipleChoice':
      return <MultipleChoice {...props} />
    case 'Music':
      return <Music {...props} />
    default:
      return null
  }
}

export default Round
