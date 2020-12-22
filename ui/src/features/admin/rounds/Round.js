import React from 'react'
import PickOne from './PickOne'
import MultipleChoice from './MultipleChoice'

export const Round = ({ __typename, name, description, round }) => {
  switch (__typename) {
    case 'PickOne':
      return (
        <PickOne
          name={name}
          description={description}
          options={round.options}
          categories={round.categories}
        />
      )
    case 'MultipleChoice':
      return (
        <MultipleChoice
          name={name}
          description={description}
          questions={round.questions}
        />
      )
    default:
      return null
  }
}

export default Round
