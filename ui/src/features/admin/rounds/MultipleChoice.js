import React, { useState } from 'react'
import { Well, Title, Paragraph } from '@zendeskgarden/react-notifications'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Field, Label, Radio } from '@zendeskgarden/react-forms'
import { MD, XXL } from '@zendeskgarden/react-typography'

const MultipleChoiceAnswers = (props) => {
  function AddAnswers(choices) {
    return Object.entries(choices).map(MakeRadio)
  }

  function MakeRadio([letter, choice]) {
    return (
      <Field key={`answers-${letter}`}>
        <Radio
          name={choice}
          value={choice}
          checked={props.radioValue === choice}
          onChange={(event) => {
            props.setRadioValue(event.target.value)
            if (props.answer === event.target.value) {
              props.setScoreValue(props.score + 1)
            }
          }}
        >
          <Label>{`${letter}. ${choice}`}</Label>
        </Radio>
      </Field>
    )
  }

  return (
    <Row key={`answer`} style={{ paddingBottom: 8 }}>
      <Col>
        <MD tag="span" isBold>
          {AddAnswers(props.choices)}
        </MD>
      </Col>
    </Row>
  )
}

const MultipleChoiceQuestion = ({ question, index, score, setScoreValue }) => {
  const [radioValue, setRadioValue] = useState('')

  console.log(score)

  return (
    <Row>
      <Col>
        <Well>
          <Title>{`${index + 1}. ${question.prompt}`}</Title>
          <br />
          <MultipleChoiceAnswers
            choices={question.choices}
            answer={question.answer}
            radioValue={radioValue}
            setRadioValue={setRadioValue}
            score={score}
            setScoreValue={setScoreValue}
          />
        </Well>
      </Col>
      <Col>
        <Well>
          <Title>{`${index + 1}. Last submitted answer:`}</Title>
          <br />
          <Paragraph>{radioValue}</Paragraph>
        </Well>
      </Col>
    </Row>
  )
}

const MultipleChoiceQuestions = ({ questions, score, setScoreValue }) => {
  return questions.map((question, index) => (
    <MultipleChoiceQuestion
      question={question}
      index={index}
      score={score}
      setScoreValue={setScoreValue}
      key={`question-${index}`}
    />
  ))
}

export const MultipleChoice = ({ name, description, questions }) => {
  const [score, setScoreValue] = useState(0)

  return (
    <Grid>
      <Row>
        <Col>
          <XXL>{name}</XXL>
          <br />
          <Paragraph>{description}</Paragraph>
        </Col>
      </Row>
      <br />
      <br />
      <MultipleChoiceQuestions
        questions={questions}
        score={score}
        setScoreValue={setScoreValue}
      />
      <Row>
        <Paragraph>{`Score: ${score}`}</Paragraph>
      </Row>
    </Grid>
  )
}

export default MultipleChoice
