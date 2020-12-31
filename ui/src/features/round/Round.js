import React from 'react'
import MultipleChoice from './MultipleChoice'
import PickOne from './PickOne'

export const Round = (props) => {
  switch (props.round.__typename) {
    case 'PickOne':
      return <PickOne {...props} />
    case 'MultipleChoice':
      return <MultipleChoice {...props} />
    default:
      return null
  }
}

export default Round
