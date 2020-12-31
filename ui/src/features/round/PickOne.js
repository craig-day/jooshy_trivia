import React, { useState } from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import * as Well from '@zendeskgarden/react-notifications'
import { Field, InputGroup, Input } from '@zendeskgarden/react-forms'
import { Button, ButtonGroup } from '@zendeskgarden/react-buttons'
import styled from 'styled-components'
import { XL } from '@zendeskgarden/react-typography'

const StyledQuestionContainer = styled.div`
  margin-bottom: ${(p) => p.theme.space.sm};

  &:last-of-type {
    margin-bottom: 0;
  }
`

const StyledButton = styled(Button)`
  color: ${(p) => p.theme.palette.grey['600']};
  border-color: ${(p) => p.theme.palette.grey['600']};

  &:hover {
    color: ${(p) => p.theme.palette.grey['700']};
    border-color: ${(p) => p.theme.palette.grey['700']};
    background-color: ${(p) => p.theme.palette.grey['100']};
  }

  &[aria-pressed='true'] {
    color: ${(p) => p.theme.palette.white};
    font-weight: ${(p) => p.theme.fontWeights.semibold};
    border-color: ${(p) => p.theme.palette.grey['700']};
    background-color: ${(p) => p.theme.palette.grey['600']};
  }

  &[aria-pressed='true']:hover {
    color: ${(p) => p.theme.palette.white};
    font-weight: ${(p) => p.theme.fontWeights.semibold};
    border-color: ${(p) => p.theme.palette.grey['800']};
    background-color: ${(p) => p.theme.palette.grey['700']};
  }
`

const Question = ({ choiceA, choiceB, question }) => {
  const [selected, setSelected] = useState('')

  return (
    <Field>
      <InputGroup isCompact>
        <ButtonGroup
          selectedItem={selected}
          onSelect={setSelected}
          style={{ width: '100%' }}
        >
          <StyledButton size="small" isPill focusInset value={choiceA}>
            {choiceA}
          </StyledButton>
          <Input isCompact value={question} readOnly />
          <StyledButton size="small" isPill focusInset value={choiceB}>
            {choiceB}
          </StyledButton>
        </ButtonGroup>
      </InputGroup>
    </Field>
  )
}

const Questions = ({ options: [a, b], questions }) =>
  questions.map((question) => (
    <StyledQuestionContainer key={`question-${question.question}`}>
      <Question choiceA={a} choiceB={b} question={question.question} />
    </StyledQuestionContainer>
  ))

const StyledCategoryContainer = styled.div`
  margin-top: ${(p) => p.theme.space.sm};
  margin-bottom: ${(p) => p.theme.space.sm};
`

const Categories = ({ categories }) =>
  categories.map((category, i) => (
    <StyledCategoryContainer key={`category-${i}`}>
      <Well.Well>
        <Well.Title style={{ paddingBottom: 10 }}>
          <XL>{category.title}</XL>
        </Well.Title>
        <Questions
          options={category.options}
          questions={category.questions}
          categoryNumber={i + 1}
        />
      </Well.Well>
    </StyledCategoryContainer>
  ))

export const PickOne = ({ round }) => {
  if (!round) return null

  return (
    <Grid>
      <Row justifyContent="center">
        <Col xl={8} lg={12}>
          <Categories categories={round.categories} />
        </Col>
      </Row>
    </Grid>
  )
}

export default PickOne
