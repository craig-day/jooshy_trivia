import React from 'react'
import { Col, Grid, Row } from '@zendeskgarden/react-grid'
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

const Questions = ({ questions }) =>
  questions.map((question, i) => (
    <QuestionContainer key={`question-${i + 1}`}>
      <Question
        number={i + 1}
        prompt={question.prompt}
        choices={question.choices}
      />
    </QuestionContainer>
  ))

const MultipleChoice = ({ round }) => {
  if (!round) return null

  return (
    <Grid>
      <Row justifyContent="center">
        <Col xl={8} lg={12}>
          <Questions questions={round.questions} />
        </Col>
      </Row>
    </Grid>
  )
}

export default MultipleChoice
