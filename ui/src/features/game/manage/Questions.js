import React, { useState } from 'react'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from '@zendeskgarden/react-tabs'
import { Well, Title, Paragraph } from '@zendeskgarden/react-notifications'
import styled from 'styled-components'
import { Stepper } from '@zendeskgarden/react-accordions'
import { Button } from '@zendeskgarden/react-buttons'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Tiles, Field, Label, Radio } from '@zendeskgarden/react-forms'
import { MD, Span, XXL } from '@zendeskgarden/react-typography'
import { ReactComponent as AddIcon } from '@zendeskgarden/svg-icons/src/16/plus-fill.svg'
import { ReactComponent as BulletListIcon } from '@zendeskgarden/svg-icons/src/16/list-bullet-stroke.svg'
import { ReactComponent as RecordIcon } from '@zendeskgarden/svg-icons/src/16/record-fill.svg'
import { ReactComponent as MusicIcon } from '@zendeskgarden/svg-icons/src/16/volume-unmuted-fill.svg'
import { ReactComponent as SequenceIcon } from '@zendeskgarden/svg-icons/src/16/list-number-stroke.svg'
import { ReactComponent as ImageIcon } from '@zendeskgarden/svg-icons/src/16/image-fill.svg'
import { SAMPLE_GAME, SAMPLE_ROUND_TYPES } from './fakeData'
import * as List from '../../../utils/List'

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

const MultipleChoiceAnswers = (props) => {
  function AddAnswers(choices) {
    return Object.entries(choices).map(MakeRadio)
  }

  function MakeRadio([letter, choice]) {
    return (
      <Field key={`answers-${letter}`}>
        <Radio
          name={choice}
          value={choice}
          checked={props.radioValue === choice}
          onChange={(event) => {
            props.setRadioValue(event.target.value)
            if (props.answer === event.target.value) {
              props.setScoreValue(props.score + 1)
            }
          }}
        >
          <Label>{`${letter}. ${choice}`}</Label>
        </Radio>
      </Field>
    )
  }

  return (
    <Row key={`answer`} style={{ paddingBottom: 8 }}>
      <Col>
        <MD tag="span" isBold>
          {AddAnswers(props.choices)}
        </MD>
      </Col>
    </Row>
  )
}

const MultipleChoiceQuestion = ({ question, index, score, setScoreValue }) => {
  const [radioValue, setRadioValue] = useState('')
  const [q, setQ] = useState(question)

  console.log(score)

  return (
    <Row>
      <Col>
        <Well>
          <Title>{`${index + 1}. ${q.prompt}`}</Title>
          <br />
          <MultipleChoiceAnswers
            choices={q.choices}
            answer={q.answer}
            radioValue={radioValue}
            setRadioValue={setRadioValue}
            score={score}
            setScoreValue={setScoreValue}
          />
        </Well>
      </Col>
      <Col>
        <Well>
          <Title>{`${index + 1}. Last submitted answer:`}</Title>
          <br />
          <Paragraph>{radioValue}</Paragraph>
        </Well>
      </Col>
    </Row>
  )
}

const MultipleChoiceQuestions = ({ questions, score, setScoreValue }) => {
  return questions.map((question, index) => (
    <MultipleChoiceQuestion
      question={question}
      index={index}
      score={score}
      setScoreValue={setScoreValue}
      key={`question-${index}`}
    />
  ))
}

const MultipleChoice = ({ name, description, questions }) => {
  const [score, setScoreValue] = useState(0)

  return (
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
      <MultipleChoiceQuestions
        questions={questions}
        score={score}
        setScoreValue={setScoreValue}
      />
      <Row>
        <Paragraph>{`Score: ${score}`}</Paragraph>
      </Row>
    </Grid>
  )
}


const StyledButtons = styled.div`
  margin-top: ${p => p.theme.space.sm};
  padding: ${p => p.theme.shadowWidths.md};

  & > button {
    margin-${p => (p.theme.rtl ? 'right' : 'left')}: ${p => p.theme.space.base * 3}px;

    &:first-child {
      margin-${p => (p.theme.rtl ? 'right' : 'left')}: 0;
    }
  }
`;

const StyledContainer = styled.div`
  margin: ${p => p.theme.space.md} 0 0 0;
`;

const RoundCreationStepper = ( {categories} ) => {
  const [currentStep, setStep] = useState(0);

  console.log(currentStep)

  const onNext = () => setStep(currentStep + 1);
  const onBack = () => setStep(currentStep - 1);

  const allSteps = [
    {
      content: <RoundTypes categories={categories} />,
      buttons: <Button onClick={onNext}>Next</Button>
    },
    {
      content: `Add Questions and Answers.`,
      buttons: (
        <React.Fragment>
          <Button onClick={onBack}>Back</Button>
          <Button onClick={onNext}>Next</Button>
        </React.Fragment>
      )
    },
    {
      content: `Buy clean, hearty, disease-free seeds. Most seed from reliable seed companies will meet these specifications.`,
      buttons: <Button onClick={onBack}>Back</Button>
    }
  ];

  return (
    <Row justifyContent="center">
      <Col sm={10} textAlign="center">
        <Stepper activeIndex={currentStep} isHorizontal>
          <Stepper.Step key="step-1">
            <Stepper.Label>Pick new round type</Stepper.Label>
          </Stepper.Step>
          <Stepper.Step key="step-2">
            <Stepper.Label>Add round questions, answers, and time limit</Stepper.Label>
          </Stepper.Step>
          <Stepper.Step key="step-3">
            <Stepper.Label>Verify round properties</Stepper.Label>
          </Stepper.Step>
        </Stepper>
        {allSteps.map(
          (step, index) =>
            index === currentStep && (
              <StyledContainer key={index}>
                {step.content}
                <StyledButtons>{step.buttons}</StyledButtons>
              </StyledContainer>
            )
        )}
      </Col>
    </Row>
  );
};




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

const RoundTypeIcon = ({ category }) => {
  switch (category) {
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

const RoundTypes = ({ categories }) => (
  <Tiles name="round-types" isCentered={false}>
    {List.chunk(categories, 3).map((categoryChunk, i) => (
      <React.Fragment key={`new-round-cat-${i}`}>
        <Row>
          {categoryChunk.map((category) => (
            <Col size={4} key={`category-${category.name}`}>
              <Tiles.Tile value={category.name}>
                <Tiles.Icon>
                  <RoundTypeIcon category={category.name} />
                </Tiles.Icon>
                <Tiles.Label>{category.name}</Tiles.Label>
                <Tiles.Description>{category.description}</Tiles.Description>
              </Tiles.Tile>
            </Col>
          ))}
        </Row>
        <br />
      </React.Fragment>
    ))}
  </Tiles>
)

const AddRoundTab = ( {categories} ) => (
  <TabPanel item="add-round">
    <Grid>
      <Row>
        <Col>
          <XXL>Add New Round</XXL>
        </Col>
      </Row>
      <br />
      <RoundCreationStepper categories={SAMPLE_ROUND_TYPES}/>
    </Grid>
  </TabPanel>
)

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
            Round {round.number}
          </Tab>
        ))}
        <Tab item="add-round">
          <Span>
            <Span.StartIcon>
              <AddIcon />
            </Span.StartIcon>
            New
          </Span>
        </Tab>
      </TabList>
      <TabPanels rounds={game.rounds} />
      <AddRoundTab />
    </Tabs>
  )
}

export default Questions
