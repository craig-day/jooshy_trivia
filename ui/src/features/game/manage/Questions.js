import React, { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from '@zendeskgarden/react-tabs'
import { Well, Title, Paragraph } from '@zendeskgarden/react-notifications'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { MD, XXL } from '@zendeskgarden/react-typography'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { SAMPLE_GAME } from './fakeData'

const tabId = (round) => `round-${round.number}`

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

const MultipleChoiceAnswers = ({ answers }) =>
  Object.entries(answers).map(([letter, choice]) => (
    <Row key={`answer-${letter}`} style={{ paddingBottom: 8 }}>
      <Col>
        <MD tag="span" isBold>
          {`${letter}. `}
        </MD>
        <MD tag="span">{choice}</MD>
      </Col>
    </Row>
  ))

const MultipleChoiceQuestions = ({ questions }) =>
  questions.map((question, i) => (
    <React.Fragment key={`question-${i}`}>
      <Row>
        <Col>
          <Well>
            <Title>{`${i + 1}. ${question.prompt}`}</Title>
            <br />
            <MultipleChoiceAnswers answers={question.choices} />
          </Well>
        </Col>
      </Row>
    </React.Fragment>
  ))

const MultipleChoice = ({ name, description, questions }) => (
  <Grid>
    <Row>
      <Col>
        <XXL>{name}</XXL>
        <br />
        <Paragraph>{description}</Paragraph>
      </Col>
    </Row>
    <br />
    <br />
    <MultipleChoiceQuestions questions={questions} />
  </Grid>
)

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
      return (
        <MultipleChoice
          name={round.name}
          description={round.description}
          questions={round.questions}
        />
      )
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
  const history = useHistory()
  const { round } = useParams()
  const { path, url } = useRouteMatch()
  const [selectedTab, setSelectedTab] = useState(round || tabId(game.rounds[0]))

  const onChangeTab = (tab) => {
    setSelectedTab(tab)

    const nextPath = path.endsWith(':round')
      ? path.replace(':round', tab)
      : `${url}/${tab}`

    history.push(nextPath)
  }

  return (
    <Tabs
      selectedItem={selectedTab}
      onChange={onChangeTab}
      style={{ width: '100%' }}
      isVertical
    >
      <TabList style={{ width: 150 }}>
        {game.rounds.map((round) => (
          <Tab key={tabId(round)} item={tabId(round)}>
            <MD isBold>Round {round.number}</MD>
          </Tab>
        ))}
      </TabList>
      <TabPanels rounds={game.rounds} />
    </Tabs>
  )
}

export default Questions
