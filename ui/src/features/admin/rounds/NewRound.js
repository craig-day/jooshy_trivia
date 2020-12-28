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
import { XXL } from '@zendeskgarden/react-typography'
import { Stepper } from '@zendeskgarden/react-accordions'
import { Button } from '@zendeskgarden/react-buttons'
import { ReactComponent as BulletListIcon } from '@zendeskgarden/svg-icons/src/16/list-bullet-stroke.svg'
import { ReactComponent as RecordIcon } from '@zendeskgarden/svg-icons/src/16/record-fill.svg'
import { ReactComponent as MusicIcon } from '@zendeskgarden/svg-icons/src/16/volume-unmuted-fill.svg'
import { ReactComponent as SequenceIcon } from '@zendeskgarden/svg-icons/src/16/list-number-stroke.svg'
import { ReactComponent as ImageIcon } from '@zendeskgarden/svg-icons/src/16/image-fill.svg'
import * as List from '../../../utils/List'

const RoundTypeIcon = ({ type }) => {
  switch (type) {
    case 'PickOne':
      return <RecordIcon />
    case 'MultipleChoice':
      return <BulletListIcon />
    case 'Music':
      return <MusicIcon />
    case 'Sequence':
      return <SequenceIcon />
    case 'Image':
      return <ImageIcon />
    default:
      return null
  }
}

const RoundTypes = ({ types, setRound }) => (
  <Tiles
    name="round-types"
    isCentered={false}
    onChange={(e) => setRound(e.target.value)}
  >
    {List.chunk(types, 3).map((typeChunk, i) => (
      <React.Fragment key={`new-round-type-${i}`}>
        <Row>
          {typeChunk.map((type) => (
            <Col size={4} key={`type-${type.name}`}>
              <Tiles.Tile value={type.name}>
                <Tiles.Icon>
                  <RoundTypeIcon type={type.name} />
                </Tiles.Icon>
                <Tiles.Label>{type.name}</Tiles.Label>
                <Tiles.Description>{type.description}</Tiles.Description>
              </Tiles.Tile>
            </Col>
          ))}
        </Row>
        <br />
      </React.Fragment>
    ))}
  </Tiles>
)

const DisplayQuestion = ({ questions }) => (
  <Row justifyContent="center">
    <Col sm={5}>
      <Field>
        <Label>{questions}</Label>
      </Field>
    </Col>
  </Row>
)

const AddRoundQuestions = ({
  type,
  questions,
  setQuestions,
  answers,
  setAnswers,
}) => {
  const [visible, setVisible] = useState(false)

  switch (type) {
    case 'PickOne':
      return (
        <Col sm={5}>
          <Field>
            <Label>Add Question</Label>
          </Field>
        </Col>
      )
    case 'MultipleChoice':
      console.log(questions, answers)

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

      return (
        <React.Fragment>
          {Object.entries(questions).map(([number, question], i) => {
            const test = Object.entries(answers[i + 1]).map(
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
                {test}
                <br />
              </React.Fragment>
            )
          })}
          <Button onClick={() => setVisible(true)}>Add new question</Button>
          {visible && (
            <Modal isLarge onClose={() => setVisible(false)}>
              <NewMultipleChoiceQuestion
                onAddNewQuestion={onAddNewQuestion}
                setVisible={setVisible}
              />

              <Close aria-label="Close modal" />
            </Modal>
          )}
        </React.Fragment>
      )
    default:
      return <p>hi</p>
  }
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

const NewMultipleChoiceQuestion = ({ onAddNewQuestion, setVisible }) => {
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
            <Label>Answers:</Label>
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
                setVisible(false)
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

const StyledButtons = styled.div`
  margin-top: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.shadowWidths.md};

  & > button {
	margin-${(p) => (p.theme.rtl ? 'right' : 'left')}: ${(p) =>
  p.theme.space.base * 3}px;

	&:first-child {
	  margin-${(p) => (p.theme.rtl ? 'right' : 'left')}: 0;
	}
  }
`

const StyledContainer = styled.div`
  margin: ${(p) => p.theme.space.md} 0 0 0;
`

const RoundCreationStepper = ({ roundTypes }) => {
  const [currentStep, setStep] = useState(0)
  const [round, setRound] = useState('')
  const [questions, setQuestions] = useState({})
  const [answers, setAnswers] = useState({})

  const onNext = () => setStep(currentStep + 1)
  const onBack = () => setStep(currentStep - 1)

  const allSteps = [
    {
      content: <RoundTypes types={roundTypes} setRound={setRound} />,
      buttons: <Button onClick={onNext}>Next</Button>,
    },
    {
      content: (
        <AddRoundQuestions
          type={round}
          questions={questions}
          setQuestions={setQuestions}
          answers={answers}
          setAnswers={setAnswers}
        />
      ),
      buttons: (
        <React.Fragment>
          <Button onClick={onBack}>Back</Button>
          <Button onClick={onNext}>Next</Button>
        </React.Fragment>
      ),
    },
    {
      content: <DisplayQuestion q={questions.questions} />,
      buttons: <Button onClick={onBack}>Back</Button>,
    },
  ]

  return (
    <Row justifyContent="center">
      <Col textAlign="center">
        <Stepper activeIndex={currentStep} isHorizontal>
          <Stepper.Step>
            <Stepper.Label>Pick new round type</Stepper.Label>
          </Stepper.Step>
          <Stepper.Step>
            <Stepper.Label>
              Add round questions, answers, and time limit
            </Stepper.Label>
          </Stepper.Step>
          <Stepper.Step>
            <Stepper.Label>Verify round properties</Stepper.Label>
          </Stepper.Step>
        </Stepper>
        {allSteps.map((step, index) =>
          index === currentStep ? (
            <StyledContainer key={`step-${index + 1}`}>
              {step.content}
              <StyledButtons>{step.buttons}</StyledButtons>
            </StyledContainer>
          ) : null
        )}
      </Col>
    </Row>
  )
}

export const NewRound = ({ roundTypes }) => (
  <Grid>
    <Row>
      <Col>
        <XXL>Add New Round</XXL>
      </Col>
    </Row>
    <br />
    <RoundCreationStepper roundTypes={roundTypes} />
  </Grid>
)

export default NewRound
