import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col } from '@zendeskgarden/react-grid'
import { mediaQuery } from '@zendeskgarden/react-theming'
import * as Modal from '@zendeskgarden/react-modals'
import QuestionContainer from './QuestionContainer'
import { XL } from '@zendeskgarden/react-typography'
import { Field, Label, Textarea } from '@zendeskgarden/react-forms'

const StyledRow = styled(Row)`
  padding: ${(p) => p.theme.space.md};
  border: ${(p) => `${p.theme.borders.sm} ${p.theme.palette.grey['300']}`};
  border-radius: ${(p) => p.theme.borderRadii.md};
`

const Thumbnail = styled.img`
  ${() => mediaQuery('up', 'xl')} {
    width: 200px;
  }

  ${() => mediaQuery('down', 'lg')} {
    width: 150px;
  }

  &:hover {
    cursor: zoom-in;
  }
`

const WideModal = styled(Modal.Modal)`
  width: fit-content;
`

const ZoomImg = styled.img`
  ${() => mediaQuery('up', 'xl')} {
    width: 800px;
  }

  ${() => mediaQuery('down', 'lg')} {
    width: 500px;
  }
`

const ZoomModal = ({ src, number, visible, setVisible }) => {
  if (!visible) return null

  return (
    <WideModal isLarge onClose={() => setVisible(false)}>
      <Modal.Header>
        <XL>{`Image ${number}`}</XL>
      </Modal.Header>
      <Modal.Body>
        <ZoomImg src={src} alt={`Image for question ${number}`} />
      </Modal.Body>
      <Modal.Close aria-label="Close modal" />
    </WideModal>
  )
}

const Question = ({ number, question }) => {
  const [zoomVisible, setZoomVisible] = useState(false)

  return (
    <StyledRow>
      <Col size={5} textAlign="center">
        <figure>
          <Thumbnail
            src={question.fileSource}
            alt={`Image thumbnail for question ${number}`}
            onClick={() => setZoomVisible(true)}
          />
          <figcaption>{`Image ${number}`}</figcaption>
        </figure>
        <ZoomModal
          src={question.fileSource}
          number={number}
          visible={zoomVisible}
          setVisible={setZoomVisible}
        />
      </Col>
      <Col alignItems="center">
        <Field alignSelf="center">
          <Label>Answer</Label>
          <Textarea minRows={2} maxRows={5} />
        </Field>
      </Col>
    </StyledRow>
  )
}

const Image = ({ round }) =>
  round.questions.map((question, i) => (
    <QuestionContainer key={`question-${i}`}>
      <Question number={i + 1} question={question} />
    </QuestionContainer>
  ))

export default Image
