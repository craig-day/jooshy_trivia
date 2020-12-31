import React from 'react'
import { Col, Row } from '@zendeskgarden/react-grid'
import { Skeleton } from '@zendeskgarden/react-loaders'
import { MD, XL, XXXL } from '@zendeskgarden/react-typography'

export const GameLoading = ({ width }) => (
  <Row>
    <Col sm={width ? width : 5}>
      <XXXL>
        <Skeleton />
      </XXXL>
      <XL>
        <Skeleton />
      </XL>
      <MD>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </MD>
    </Col>
  </Row>
)

export default GameLoading
