import { useState } from 'react'

import { yelpClient } from '../common/yelp'
import { Business, SortBy } from '../types'

export const LOCATION_OPTIONS = [
  {
    key: 'los-gatos',
    display: 'Los Gatos',
    address: '121 Albright Way, Los Gatos, CA 95032',
  },
  {
    key: 'new-york',
    display: 'Manhattan',
    address: '888 Broadway, New York, NY 10003',
  },
  {
    key: 'los-angeles',
    display: 'Los Angeles',
    address: '5808 Sunset Blvd, Los Angeles, CA 90028',
  },
]
export const PAGE_SIZE = 20
export const SORT_OPTIONS: Array<{ label: string; value: SortBy }> = [
  { label: 'Distance', value: 'distance' },
  { label: 'Best Match', value: 'best_match' },
  { label: 'Rating', value: 'rating' },
  { label: 'Review Count', value: 'review_count' },
]

// 6 miles in meters
const RADIUS = '9656'

export const useYelp = () => {
  const [results, setResults] = useState<Business[]>([])
  const [location, setLocation] = useState(LOCATION_OPTIONS[0].address)
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalCount, setTotalCount] = useState<number | null>(null)

  const search = async (loadMore = false) => {
    if (loading) return

    setLoading(true)
    try {
      const { total, businesses } = await yelpClient.businesses({
        location,
        term: 'boba shops',
        offset: loadMore ? results.length.toString() : '0',
        sort_by: sortBy,
        radius: RADIUS,
        limit: PAGE_SIZE.toString(),
      })
      setResults((prev) => (loadMore ? [...prev, ...businesses] : businesses))
      setTotalCount(total)
    } catch (error) {
      setError('Oops, something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const clearError = () => setError('')

  return {
    clearError,
    error,
    loading,
    location,
    results,
    search,
    setLocation,
    setSortBy,
    sortBy,
    hasMore: totalCount !== null && results.length < totalCount,
    totalCount,
  }
}
