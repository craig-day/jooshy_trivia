import React from 'react'
import { Row, Col } from '@zendeskgarden/react-grid'
import { XXL } from '@zendeskgarden/react-typography'
import { Paragraph } from '@zendeskgarden/react-notifications'

const RoundHeader = ({ name, description }) => (
  <React.Fragment>
    <Row>
      <Col>
        <XXL>{name}</XXL>
        <br />
        <Paragraph>{description}</Paragraph>
      </Col>
    </Row>
    <hr />
    <br />
  </React.Fragment>
)

export default RoundHeader
