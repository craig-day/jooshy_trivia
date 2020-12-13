import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'

const Landing = () => (
  <Grid
    style={{
      height: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Row justifyContent="center">
      <Col justifyContent="center">
        <h1>Hello, world!</h1>
      </Col>
    </Row>
  </Grid>
)

export default Landing
