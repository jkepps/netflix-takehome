import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { Business } from '../types'
import { Rating } from './Rating'

interface Props {
  results: Business[]
  loading: boolean
  onLoadMore: () => void
  hasMore: boolean
}

export const ResultsTable = ({
  results,
  onLoadMore,
  loading,
  hasMore,
}: Props) => {
  const formatAddress = (address: string[]) => address.join(', ')

  // convert m to km and round to 2 decimal places
  const formatDistance = (distance: number) => Math.round(distance / 10) / 100

  return (
    <>
      <Table sx={{ mt: 5 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Distance (km)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{result.name}</TableCell>
              <TableCell>
                {formatAddress(result.location.display_address)}
              </TableCell>
              <TableCell>
                <Rating rating={result.rating} />
              </TableCell>
              <TableCell>{formatDistance(result.distance)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        {/* if results exist and there are more to fetch, display a "Load More" button */}
        {!!results.length && hasMore && (
          <Box sx={{ position: 'absolute' }}>
            <Button
              onClick={onLoadMore}
              variant="outlined"
              disabled={loading}
              aria-label="Load More"
            >
              Load More
            </Button>
            {loading && (
              <CircularProgress
                aria-label="Loading"
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  mt: '-12px',
                  ml: '-12px',
                }}
              />
            )}
          </Box>
        )}
      </Box>
    </>
  )
}
