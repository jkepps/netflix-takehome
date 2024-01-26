import {
  StarRateRounded,
  StarBorderRounded,
  StarHalfRounded,
} from '@mui/icons-material'
import { Box, Tooltip } from '@mui/material'

interface Props {
  rating: number
}

export const Rating = ({ rating }: Props) => {
  const fullStarCount = Math.floor(rating)
  const partialStarCount = Math.floor((rating * 10) % 10) > 0 ? 1 : 0

  const stars = []

  for (let i = 0; i < fullStarCount; i++)
    stars.push(<StarRateRounded key={i} color="warning" />)

  if (partialStarCount)
    stars.push(<StarHalfRounded key={fullStarCount} color="warning" />)

  for (let i = fullStarCount + partialStarCount; i < 5; i++)
    stars.push(<StarBorderRounded key={i} color="warning" />)

  return (
    <Tooltip title={rating} placement="left" arrow>
      <Box>{stars}</Box>
    </Tooltip>
  )
}
