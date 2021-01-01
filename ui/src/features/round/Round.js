import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import MultipleChoice from './MultipleChoice'
import Music from './Music'
import PickOne from './PickOne'
import Image from './Image'
import Sequence from './Sequence'

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
    case 'Sequence':
      return <Sequence {...props} />
    default:
      return null
  }
}

export const Round = (props) => (
  <Grid>
    <Row>
      <Col xl={9} lg={12}>
        <RoundComponent {...props} />
      </Col>
    </Row>
  </Grid>
)

export default Round
