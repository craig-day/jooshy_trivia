import React, { useState } from 'react'
import styled from 'styled-components'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import {
  Tiles,
  Field,
  Label,
  Input,
  InputGroup,
  Radio,
} from '@zendeskgarden/react-forms'
import {
  Modal,
  Header,
  Body,
  Footer,
  FooterItem,
  Close,
} from '@zendeskgarden/react-modals'
import { Button } from '@zendeskgarden/react-buttons'

const DisplayQuestionAnswers = ({ questions, answers }) => (
  Object.entries(questions).map(([number, question], i) => {
    const allAnswers = Object.entries(answers[i + 1]).map(
      ([letter, answer]) => (
        <Row>
          <Col>
            {`${letter}. ${answer}`}
            <br />
          </Col>
        </Row>
      )
    )
    return (
      <React.Fragment>
        <Row>
          <Col>
            {`${number}. ${question}`}
            <br />
          </Col>
        </Row>
        {allAnswers}
        <br />
      </React.Fragment>
    )
  })
)

const DisplayQuestionAnswersEditForm = ({ questions, answers, setQuestions, setAnswers, setVisibleEdit }) => {

  function editQuestion(number, newQuestion) {
    const newQuestions = {...questions}
    newQuestions[number] = newQuestion
    setQuestions(newQuestions)
  }

  function editAnswer(number, letter, newAnswer) {
    const newAnswers = {...answers}
    newAnswers[number][letter] = newAnswer
    setAnswers(newAnswers)
  }


  return (
    Object.entries(questions).map(([number, question]) => {
      const allAnswers = Object.entries(answers[number]).map(
        ([letter, answer]) => (
          <Row>
            <Col>
              <Input 
                placeholder={answer}
                value={answer}
                onChange={(e) => editAnswer(number, letter, e.target.value)} 
              />
              <br />
            </Col>
          </Row>
        )
      )
      return (
        <React.Fragment>
          <Row>
            <Col>
              <Label>Question: {number}.</Label>
              <Input 
                placeholder={question}
                value={question}
                onChange={(e) => editQuestion(number, e.target.value)} 
              />
              <br />
              <br />
            </Col>
          </Row>
          {allAnswers}
          <br />
          <Row justifyContent="center">
            <Col sm={5}>
              <Field>
                <Button
                  onClick={() => {
                    setVisibleEdit(false)
                  }}
                >
                  Submit edits
                </Button>
              </Field>
            </Col>
          </Row>
        </React.Fragment>

      )
    })
  )
}


const NewMultipleChoiceAnswer = ({
  letter,
  value,
  onChangeAnswer,
  radioValue,
  setRadioValue,
  correctAnswer,
  setCorrectAnswer,
}) => (
  <Row justifyContent="center">
    <Col>
      <Input
        value={value}
        onChange={(e) => onChangeAnswer(letter, e.target.value)}
      />
      <Field>
        <Radio
          name="newQuestion"
          value={letter}
          checked={correctAnswer === letter}
          onChange={(e) => {
            setRadioValue(e.target.value)
            setCorrectAnswer(e.target.value)
          }}
        >
          <Label>{`${letter}.`}</Label>
        </Radio>
      </Field>
    </Col>
  </Row>
)

const NewMultipleChoiceQuestion = ({ onAddNewQuestion, setVisibleNew }) => {
  const [question, setQuestion] = useState('')
  const [choices, setChoices] = useState({ a: '' })
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [radioValue, setRadioValue] = useState('')

  function nextCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1)
  }

  function onClickNewAnswer() {
    const choiceKeys = Object.keys(choices)
    const newKey = nextCharacter(choiceKeys[choiceKeys.length - 1])
    const newChoices = { ...choices }
    newChoices[newKey] = ''
    setChoices(newChoices)
  }

  function onChangeAnswer(letter, value) {
    const newChoices = { ...choices }
    newChoices[letter] = value
    setChoices(newChoices)
  }

  return (
    <React.Fragment>
      <Row justifyContent="center">
        <Col sm={5}>
          <Field>
            <Label>Question:</Label>
            <InputGroup>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </InputGroup>
          </Field>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col sm={5}>
          <Field>
            <Label>Answers (click to set solution):</Label>
            {Object.entries(choices).map(([letter, value], i) => (
              <NewMultipleChoiceAnswer
                key={`answer-${i}`}
                letter={letter}
                value={value}
                onChangeAnswer={onChangeAnswer}
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                correctAnswer={correctAnswer}
                setCorrectAnswer={setCorrectAnswer}
              />
            ))}
          </Field>
        </Col>
      </Row>
      <br />
      <Row justifyContent="center">
        <Col sm={5}>
          <Field>
            <Button focusInset onClick={() => onClickNewAnswer()}>
              Add another answer
            </Button>
          </Field>
        </Col>
      </Row>
      <Row justifyContent="center">
        <Col sm={5}>
          <Field>
            <Button
              onClick={() => {
                onAddNewQuestion(question, choices)
                setVisibleNew(false)
              }}
            >
              Submit question
            </Button>
          </Field>
        </Col>
      </Row>
      }
    </React.Fragment>
  )
}

export const AddMultipleChoiceRound = ( {questions, setQuestions, answers, setAnswers} ) => {

  const [visibleNew, setVisibleNew] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)

  function nextCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1)
  }

  function onAddNewQuestion(question, choices) {
    const questionKeys = Object.keys(questions)
    const answersKeys = Object.keys(answers)
    let newQuestionKey
    let newQuestions
    let newAnswerKey
    let newAnswers

    if (questionKeys.length === 0) {
      newQuestionKey = '1'
    } else {
      newQuestionKey = nextCharacter(questionKeys[questionKeys.length - 1])
    }

    newQuestions = { ...questions }
    newQuestions[newQuestionKey] = question
    setQuestions(newQuestions)

    if (answersKeys.length === 0) {
      newAnswerKey = '1'
    } else {
      newAnswerKey = nextCharacter(answersKeys[answersKeys.length - 1])
    }

    newAnswers = { ...answers }
    newAnswers[newAnswerKey] = choices
    setAnswers(newAnswers)
  }

  function editQuestion(questionEdit, questionIndex) {
  	const newQuestions = { ...questions }
  	newQuestions[questionIndex] = questionEdit
  	setQuestions(newQuestions)
  }

  return (
    <React.Fragment>
			<DisplayQuestionAnswers questions={questions} answers={answers} />
      <Button onClick={() => setVisibleNew(true)}>Add new question</Button>
      {visibleNew && (
        <Modal isLarge onClose={() => setVisibleNew(false)}>
          <NewMultipleChoiceQuestion
            onAddNewQuestion={onAddNewQuestion}
            setVisibleNew={setVisibleNew}
          />
          <Close aria-label="Close modal" />
        </Modal>
      )}
      <br />
      <Button onClick={() => setVisibleEdit(true)}>Edit questions</Button>
      {visibleEdit && (
        <Modal isLarge onClose={() => setVisibleEdit(false)}>
          <DisplayQuestionAnswersEditForm 
            questions={questions} 
            answers={answers} 
            setQuestions={setQuestions}
            setAnswers={setAnswers}
            setVisibleEdit={setVisibleEdit}/>
          <Close aria-label="Close modal" />
        </Modal>

      )}
    </React.Fragment>
  )
}

export default AddMultipleChoiceRound