import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import MultipleChoice from './MultipleChoice'
import Music from './Music'
import PickOne from './PickOne'
import Image from './Image'

const RoundComponent = (props) => {
  switch (props.round?.__typename) {
    case 'PickOne':
      return <PickOne {...props} />
    case 'MultipleChoice':
      return <MultipleChoice {...props} />
    case 'Music':
      return <Music {...props} />
    case 'Image':
      return <Image {...props} />
    default:
      return null
  }
}

export const Round = (props) => (
  <Grid>
    <Row justifyContent="center">
      <Col xl={8} lg={12}>
        <RoundComponent {...props} />
      </Col>
    </Row>
  </Grid>
)

export default Round
