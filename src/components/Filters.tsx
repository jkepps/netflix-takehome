import {
  Button,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material'
import { SortBy } from '../types'
import { LOCATION_OPTIONS, SORT_OPTIONS } from '../hooks/useYelp'

interface Props {
  loading: boolean
  sortBy: SortBy
  location: string
  onChangeLocation: (location: string) => void
  onChangeSort: (sort: SortBy) => void
  onSearch: () => void
}

export const Filters = ({
  sortBy,
  location,
  onSearch,
  onChangeLocation,
  onChangeSort,
  loading,
}: Props) => {
  const handleChangeLocation = (event: SelectChangeEvent<string>) =>
    onChangeLocation(event.target.value)

  const handleChangeSort = (event: SelectChangeEvent<SortBy>) =>
    onChangeSort(event.target.value as SortBy)

  return (
    <Box sx={{ display: 'flex', mt: 8, alignItems: 'center' }}>
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
      <Box sx={{ ml: 'auto' }}>
        <Box sx={{ position: 'relative' }}>
          <Button
            size="large"
            aria-label="Search"
            disabled={loading}
            variant="contained"
            type="button"
            onClick={() => onSearch()}
          >
            Search
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
      </Box>
    </Box>
  )
}
