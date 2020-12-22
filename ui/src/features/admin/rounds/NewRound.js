import React, { useState } from 'react'
import styled from 'styled-components'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Tiles } from '@zendeskgarden/react-forms'
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

const RoundTypes = ({ types }) => (
  <Tiles name="round-types" isCentered={false}>
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

  const onNext = () => setStep(currentStep + 1)
  const onBack = () => setStep(currentStep - 1)

  const allSteps = [
    {
      content: <RoundTypes types={roundTypes} />,
      buttons: <Button onClick={onNext}>Next</Button>,
    },
    {
      content: `Add Questions and Answers.`,
      buttons: (
        <React.Fragment>
          <Button onClick={onBack}>Back</Button>
          <Button onClick={onNext}>Next</Button>
        </React.Fragment>
      ),
    },
    {
      content: `Buy clean, hearty, disease-free seeds. Most seed from reliable seed companies will meet these specifications.`,
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
