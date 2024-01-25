import { useEffect, useState } from 'react'
import { Business, Sort, yelpClient } from '../common/yelp'

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
export const SORT_OPTIONS: Array<{ label: string; value: Sort }> = [
  { label: 'Distance', value: 'distance' },
  { label: 'Best Match', value: 'best_match' },
  { label: 'Rating', value: 'rating' },
  { label: 'Review Count', value: 'review_count' },
]
const RADIUS = '9656' // 6 miles in meters

export const useYelp = () => {
  const [location, setLocation] = useState(LOCATION_OPTIONS[0].address)
  const [results, setResults] = useState<Business[]>([])
  const [offset, setOffset] = useState(0)
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value)

  const search = async () => {
    setOffset(0)
    const result = await yelpClient.businessesSearch({
      location,
      term: 'boba shops',
      offset: '0',
      sort_by: sortBy,
      radius: RADIUS,
      limit: PAGE_SIZE.toString(),
    })
    setResults(result)
  }

  useEffect(() => {
    if (offset === 0) return

    const loadMore = async () => {
      const result = await yelpClient.businessesSearch({
        location,
        term: 'boba shops',
        sort_by: sortBy,
        radius: RADIUS,
        limit: PAGE_SIZE.toString(),
        offset: offset.toString(),
      })
      setResults((prev) => [...prev, ...result])
    }

    loadMore()
  }, [offset])

  return {
    location,
    results,
    search,
    setLocation,
    setOffset,
    setSortBy,
    sortBy,
  }
}
