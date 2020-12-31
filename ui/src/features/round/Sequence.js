import React from 'react'
import styled from 'styled-components'
import { Field, Input, Label } from '@zendeskgarden/react-forms'
import { Row, Col } from '@zendeskgarden/react-grid'
import { XL } from '@zendeskgarden/react-typography'
import QuestionContainer from './QuestionContainer'

const StyledQuestionContainer = styled(QuestionContainer)`
  margin: 0;
  padding-top: ${(p) => p.theme.space.md};
  padding-bottom: ${(p) => p.theme.space.md};
  border-bottom: ${(p) =>
    `${p.theme.borders.sm} ${p.theme.palette.grey['300']}`};

  &:last-of-type {
    border: none;
  }
`

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: ${(p) =>
    `${p.theme.borders.sm} ${p.theme.palette.grey['200']}`};

  &:last-of-type {
    border: none;
  }
`

const SequenceColumns = ({ questionNumber, items }) =>
  items.map((item, i) => (
    <StyledCol key={`item-${questionNumber}-${i}`}>
      <XL tag="span">{item}</XL>
    </StyledCol>
  ))

const AnswerColumn = () => (
  <StyledCol>
    <Field>
      <Label>Next Item</Label>
      <Input />
    </Field>
  </StyledCol>
)

const Question = ({ number, question }) => (
  <Row>
    <SequenceColumns questionNumber={number} items={question.items} />
    <AnswerColumn />
  </Row>
)

const Sequence = ({ round }) =>
  round.questions.map((question, i) => (
    <StyledQuestionContainer key={`question-${i}`}>
      <Question number={i + 1} question={question} />
    </StyledQuestionContainer>
  ))

export default Sequence
