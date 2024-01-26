export type SortBy = 'best_match' | 'rating' | 'review_count' | 'distance'

export interface Business {
  id: string
  name: string
  location: { display_address: string[] }
  rating: number
  distance: number
}
