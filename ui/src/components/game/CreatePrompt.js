import React from 'react'
import { Row, Col } from '@zendeskgarden/react-grid'
import { Button } from '@zendeskgarden/react-buttons'
import { Field, Label, Input } from '@zendeskgarden/react-forms'
import { Datepicker } from '@zendeskgarden/react-datepickers'
import RowSpace from '../RowSpace'

const CreatePrompt = (props) => (
  <>
    <Row>
      <Col>
        <Field>
          <Label>Title</Label>
          <Input />
        </Field>
      </Col>
    </Row>
    <RowSpace />
    <Row>
      <Col>
        <Field>
          <Label>Start Time (optional)</Label>
          <Datepicker>
            <Input />
          </Datepicker>
        </Field>
      </Col>
    </Row>
    <RowSpace />
    <Row>
      <Col>
        <Field>
          <Label>Max Players (optional)</Label>
          <Input />
        </Field>
      </Col>
    </Row>
    <RowSpace />
    <Row>
      <Col>
        <Button isPrimary>Create</Button>
      </Col>
      <Col>
        <Button onClick={props.cancel} isBasic>
          Cancel
        </Button>
      </Col>
    </Row>
  </>
)

export default CreatePrompt
