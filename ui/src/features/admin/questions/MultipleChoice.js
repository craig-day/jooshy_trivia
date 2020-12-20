import React, { useState } from 'react'
import { Field, Label, Radio } from '@zendeskgarden/react-forms'
import { Row, Col } from '@zendeskgarden/react-grid'

export const Create = (_props) => {
  const [radioValue, setRadioValue] = useState('')
  const [question, setQuestion] = useState('')
  const [choices, setChoices] = useState('')
  const [answer, setAnswer] = useState('')

  function AddAnswers(choices) {
    return choices.map(MakeRadio)
  }

  function MakeRadio(choice) {
    return (
      <Field>
        <Radio
          name={choice}
          value={choice}
          checked={radioValue === choice}
          onChange={(event) => setRadioValue(event.target.value)}
        >
          <Label>{choice}</Label>
        </Radio>
      </Field>
    )
  }

  return (
    <Row justifyContent="center">
      <Col size="auto">
        <h2>{question}</h2>
        <div role="group" aria-label="Choose a plant lifecycle">
          {AddAnswers(choices)}
        </div>
      </Col>
    </Row>
  )
}

// export function Hi() {
//   return <div>hi</div>
// }

//export default Question
