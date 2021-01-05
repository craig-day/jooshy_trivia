import React from 'react'
import { Field, Input } from '@zendeskgarden/react-forms'
import { LG, XL } from '@zendeskgarden/react-typography'
import * as Table from '@zendeskgarden/react-tables'

const Cells = ({ questionNumber, items }) =>
  items.map((item, i) => (
    <Table.Cell key={`item-${questionNumber}-${i}`}>{item}</Table.Cell>
  ))

const Rows = ({ questions }) =>
  questions.map((question, i) => (
    <Table.Row isStriped={i % 2 === 1}>
      <Table.Cell isMinimum>
        <LG>{`${i + 1}.`}</LG>
      </Table.Cell>
      <Cells questionNumber={i + 1} items={question.items} />
      <Table.Cell>
        <Field>
          <Input placeholder="Next..." isCompact autoComplete="off" />
        </Field>
      </Table.Cell>
    </Table.Row>
  ))

const Sequence = ({ round }) => (
  <Table.Table>
    <Table.Head>
      <Table.HeaderRow>
        <Table.HeaderCell isMinimum></Table.HeaderCell>
        <Table.HeaderCell>
          <XL>A</XL>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <XL>B</XL>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <XL>C</XL>
        </Table.HeaderCell>
        <Table.HeaderCell width="35%">
          <XL>?</XL>
        </Table.HeaderCell>
      </Table.HeaderRow>
    </Table.Head>
    <Table.Body>
      <Rows questions={round.questions} />
    </Table.Body>
  </Table.Table>
)

export default Sequence
