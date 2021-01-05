import React from 'react'
import styled from 'styled-components'
import { Col, Row } from '@zendeskgarden/react-grid'
import QuestionContainer from './QuestionContainer'
import { XL } from '@zendeskgarden/react-typography'
import { Field, Input, Label } from '@zendeskgarden/react-forms'

const StyledRow = styled(Row)`
  padding: ${(p) => p.theme.space.md};
  border: ${(p) => `${p.theme.borders.sm} ${p.theme.palette.grey['300']}`};
  border-radius: ${(p) => p.theme.borderRadii.md};
`

const Question = ({ number, question }) => (
  <StyledRow justifyContent="center">
    <Col size={1} textAlign="center">
      <XL>{`${number}.`}</XL>
    </Col>
    <Col alignSelf="center" textAlign="center">
      <audio
        controls
        controlsList="nodownload nofullscreen noremoteplayback"
        src={question.fileSource}
      />
    </Col>
    <Col>
      <Field>
        <Label>Title</Label>
        <Input isCompact autoComplete="off" />
      </Field>
    </Col>
    <Col>
      <Field>
        <Label>Artist</Label>
        <Input isCompact autoComplete="off" />
      </Field>
    </Col>
  </StyledRow>
)

const Music = ({ round }) =>
  round.questions.map((question, i) => (
    <QuestionContainer key={`question-${i}`}>
      <Question number={i + 1} question={question} />
    </QuestionContainer>
  ))

export default Music
