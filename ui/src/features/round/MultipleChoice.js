import React from 'react'
import { LG, XL } from '@zendeskgarden/react-typography'
import { Field, Label, Radio } from '@zendeskgarden/react-forms'
import styled from 'styled-components'
import QuestionContainer from './QuestionContainer'

const StyledField = styled(Field)`
  padding-left: ${(p) => p.theme.space.md};
`

const Choices = ({ questionNumber, choices }) =>
  Object.entries(choices).map(([letter, text], i) => (
    <StyledField key={`answer-${questionNumber}-${letter}`}>
      <Radio name={`question-${questionNumber}`} value={letter}>
        <Label isRegular>
          <LG>{`${letter}. ${text}`}</LG>
        </Label>
      </Radio>
    </StyledField>
  ))

const StyledPrompt = styled(XL)`
  margin-bottom: ${(p) => p.theme.space.xs};
`

const Question = ({ number, prompt, choices }) => (
  <React.Fragment>
    <StyledPrompt>{`${number}. ${prompt}`}</StyledPrompt>
    <Choices questionNumber={number} choices={choices} />
  </React.Fragment>
)

const MultipleChoice = ({ round }) =>
  round.questions.map((question, i) => (
    <QuestionContainer key={`question-${i + 1}`}>
      <Question
        number={i + 1}
        prompt={question.prompt}
        choices={question.choices}
      />
    </QuestionContainer>
  ))

export default MultipleChoice
