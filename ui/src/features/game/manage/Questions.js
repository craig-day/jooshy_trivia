import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from '@zendeskgarden/react-tabs'
import { Well, Title, Paragraph } from '@zendeskgarden/react-notifications'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { MD, XXL } from '@zendeskgarden/react-typography'
import { SAMPLE_GAME } from './fakeData'

const tabId = (round) => `round-${round.number}`

const RoundTabs = ({ rounds }) =>
  rounds.map((round) => (
    <Tab key={tabId(round)} item={tabId(round)}>
      Round {round.number}
    </Tab>
  ))

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

const PickOne = ({ name, description, options, categories }) => (
  <Grid>
    <Row>
      <Col>
        <XXL>{name}</XXL>
        <br />
        <Paragraph>{description}</Paragraph>
      </Col>
    </Row>
    <hr />
    <br />
    <PickOneCategories categories={categories} />
  </Grid>
)

const MultipleChoice = ({ round }) => null

const Round = ({ round }) => {
  switch (round.__typename) {
    case 'PickOne':
      return (
        <PickOne
          name={round.name}
          description={round.description}
          options={round.options}
          categories={round.categories}
        />
      )
    case 'MultipleChoice':
      return <MultipleChoice round={round} />
    default:
      return null
  }
}

const TabPanels = ({ rounds }) =>
  rounds.map((round) => (
    <TabPanel key={tabId(round)} item={tabId(round)}>
      <Round round={round} />
    </TabPanel>
  ))

export const Questions = () => {
  const { game } = SAMPLE_GAME

  return (
    <Tabs style={{ width: '100%' }} isVertical>
      <TabList style={{ width: 150 }}>
        <RoundTabs rounds={game.rounds} />
      </TabList>
      <TabPanels rounds={game.rounds} />
    </Tabs>
  )
}

export default Questions
