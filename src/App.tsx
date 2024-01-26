import { Alert, Container, Snackbar, Typography } from '@mui/material'

import { useYelp } from './hooks/useYelp'

import { ResultsTable } from './components/ResultsTable'
import { Filters } from './components/Filters'

export const App = () => {
  const {
    search,
    results,
    location,
    setLocation,
    sortBy,
    setSortBy,
    loading,
    error,
    clearError,
    hasMore,
    totalCount,
  } = useYelp()

  return (
    <Container sx={{ p: 5, pb: 10 }}>
      <Typography variant="h2">
        Boba Shops By Netflix Office Locations
      </Typography>

      <Filters
        loading={loading}
        onSearch={search}
        onChangeLocation={setLocation}
        onChangeSort={setSortBy}
        location={location}
        sortBy={sortBy}
      />

      <ResultsTable
        results={results}
        onLoadMore={() => search(true)}
        loading={loading}
        hasMore={hasMore}
      />

      {/*  prompt the user to click "Search" when no results have been fetched yet */}
      {totalCount === null && (
        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
          Click "Search" to get started
        </Typography>
      )}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={clearError}>
        <Alert
          severity="error"
          variant="filled"
          onClose={clearError}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  )
}
