import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { MD } from '@zendeskgarden/react-typography'
import { Well, Title } from '@zendeskgarden/react-notifications'
import RoundHeader from './RoundHeader'

const CategoryQuestions = ({ questions }) =>
  questions.map((question, i) => (
    <Row key={`question-${i}`} style={{ paddingBottom: 8 }}>
      <Col>
        <MD tag="span" isBold>
          {`${i + 1}. `}
        </MD>
        <MD tag="span">{question.question}</MD>
      </Col>
    </Row>
  ))

const PickOneCategories = ({ categories }) =>
  categories.map((category, i) => (
    <React.Fragment key={`category-${i}`}>
      <Row>
        <Col>
          <Well>
            <Title>{category.title}</Title>
            <br />
            <CategoryQuestions questions={category.questions} />
          </Well>
        </Col>
      </Row>
      <br />
    </React.Fragment>
  ))

export const PickOne = ({ name, description, options, categories }) => (
  <Grid>
    <RoundHeader name={name} description={description} />
    <PickOneCategories categories={categories} />
  </Grid>
)

export default PickOne
