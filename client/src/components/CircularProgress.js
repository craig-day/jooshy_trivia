import React from 'react'
import styled from 'styled-components'
import { withTheme } from '@zendeskgarden/react-theming'

const BackgroundCircle = styled.circle`
  fill: transparent;
  stroke: ${(p) => p.theme.palette.grey['200']};
  stroke-width: ${(p) => p.theme.strokes.md};
`

const PrimaryCircle = styled.circle`
  fill: transparent;
  stroke: ${(p) => p.theme.palette.blue['600']};
  stroke-width: ${(p) => p.theme.strokes.md};
`

const CircularProgress = ({ radius, progress, theme }) => {
  const normalizedRadius = radius - theme.strokes.md * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg height={radius * 2} width={radius * 2}>
      <BackgroundCircle r={normalizedRadius} cx={radius} cy={radius} />
      <PrimaryCircle
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  )
}

export default withTheme(CircularProgress)
