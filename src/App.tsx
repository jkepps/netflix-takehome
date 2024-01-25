import './App.css'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material'

import {
  LOCATION_OPTIONS,
  PAGE_SIZE,
  SORT_OPTIONS,
  useYelp,
} from './hooks/useYelp'
import { Sort } from './common/yelp'

function App() {
  const {
    search,
    results,
    location,
    setLocation,
    setOffset,
    sortBy,
    setSortBy,
  } = useYelp()

  const handleChangeLocation = (event: SelectChangeEvent<string>) =>
    setLocation(event.target.value)

  const handleChangeSort = (event: SelectChangeEvent<Sort>) =>
    setSortBy(event.target.value as Sort)

  return (
    <Container sx={{ p: 5 }}>
      <Typography variant="h2">
        Boba Shops By Netflix Office Locations
      </Typography>
      <Box sx={{ display: 'flex', mt: 8 }}>
        <FormControl variant="outlined">
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            label="Location"
            labelId="location-select-label"
            id="location-select"
            variant="outlined"
            onChange={handleChangeLocation}
            value={location}
          >
            {LOCATION_OPTIONS.map(({ key, display, address }) => (
              <MenuItem key={key} value={address}>
                {display}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ ml: 2 }} variant="outlined">
          <InputLabel id="location-select-label">Sort By</InputLabel>
          <Select
            label="Sort By"
            labelId="sort-select-label"
            id="sort-select"
            variant="outlined"
            onChange={handleChangeSort}
            value={sortBy}
          >
            {SORT_OPTIONS.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{ ml: 'auto' }}
          variant="contained"
          type="button"
          onClick={search}
        >
          Search
        </Button>
      </Box>
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
                {result.location.display_address.join(', ')}
              </TableCell>
              <TableCell>{result.rating}</TableCell>
              <TableCell>{Math.round(result.distance / 10) / 100}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        {results.length ? (
          <Button
            onClick={() => setOffset((value) => value + PAGE_SIZE)}
            variant="outlined"
          >
            Load More
          </Button>
        ) : (
          <Typography variant="subtitle1">
            Click "Search" to get started
          </Typography>
        )}
      </Box>
    </Container>
  )
}

export default App
