import React from 'react'
import PickOne from './PickOne'

export const Round = (props) => {
  switch (props.round.__typename) {
    case 'PickOne':
      return <PickOne {...props} />
    default:
      return null
  }
}

export default Round
