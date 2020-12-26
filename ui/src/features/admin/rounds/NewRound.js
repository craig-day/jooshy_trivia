import React, { useState } from 'react'
import styled from 'styled-components'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Tiles, Field, Label, Input, InputGroup, Radio } from '@zendeskgarden/react-forms'
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
  <Tiles name="round-types" isCentered={false} onChange={(e) => setRound(e.target.value)}>
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

const DisplayQuestion = ( {questions} ) => (
  <Row justifyContent="center">
	<Col sm={5}>
	  <Field>
		<Label>{questions}</Label>
	  </Field>
	</Col>
  </Row>
)

const AddRoundQuestions = ({ type }) => {
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
			return (
				<NewMultipleChoiceQuestion/>
			)
		default:
			return <p>hi</p>
	}
}

const NewMultipleChoiceAnswer = ({ letter, value }) => (
  <Row justifyContent="center">
  	<Col sm={5}>
			<InputGroup>
				<Input value={value}/>
			</InputGroup>
		</Col>
    <Col size="auto">
      <div role="group" aria-label="Choose a plant lifecycle">
        <Field>
          <Radio
            name={value}
            value={value}
          >
            <Label>{`${letter}. ${value}`}</Label>
          </Radio>
        </Field>
      </div>
    </Col>
  </Row>
)

const NewMultipleChoiceQuestion = () => {
	const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState({a: ''})
  const [correctAnswer, setCorrectAnswer] = useState('')

  // console.log(Object.keys(answers)[answers.length-1])

  function nextCharacter(c) { 
  	return String.fromCharCode(c.charCodeAt(0) + 1)
  } 

  function onClickNewAnswer() {
  	/* figure out next letter and add an entry to answers + setAnswers. name[key]=something */
  	const answerKeys = Object.keys(answers)
  	const newKey = nextCharacter(answerKeys[answerKeys.length - 1])
  	const newAnswers = { ...answers}
  	newAnswers[newKey] = ''
  	setAnswers(newAnswers) 
  }

	return (
		<React.Fragment>
		  <Row justifyContent="center">
			<Col sm={5}>
			  <Field>
				<Label>Question:</Label>
				<InputGroup>
					<Input value={question} onChange={(e) => setQuestion(e.target.value)}/>
				</InputGroup>
			  </Field>
			</Col>
		  </Row>

		  <Row justifyContent="center">
			<Col sm={5}>
			  <Field>
				<Label>Answers:</Label>
		  		{ Object.entries(answers).map( ([letter, value]) => 
		  				<NewMultipleChoiceAnswer letter={letter} value={value}/>) }
			  </Field>
			</Col>
		  </Row> 

		  <Row justifyContent="center">
			<Col sm={5}>
			  <Field>
					<Button focusInset onClick={() => onClickNewAnswer()}>Add another answer</Button>
			  </Field>
			</Col>
		  </Row>
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
  const [questions, setQuestions] = useState('')
  const [answers, setAnswers] = useState('')

  const onNext = () => setStep(currentStep + 1)
  const onBack = () => setStep(currentStep - 1)

  const allSteps = [
	{
	  content: <RoundTypes types={roundTypes} setRound={setRound}/>,
	  buttons: <Button onClick={onNext}>Next</Button>,
	},
	{
	  content: <AddRoundQuestions type={round}/>,
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
