import axios from 'axios'

class YelpClient {
  private BASE_URL = 'http://localhost:3000'

  businessesSearch = async (params: SearchParams) => {
    const url =
      `${this.BASE_URL}/search?` +
      new URLSearchParams(this.sanitizeParams(params))
    const { data } = await axios.get<SearchResponse>(url)
    return data.businesses
  }

  private sanitizeParams(params: object) {
    return Object.entries(params).reduce(
      (str, [key, value]) => str + `&${key}=${value}`,
      '',
    )
  }
}

export const yelpClient = new YelpClient()

export type Sort = 'best_match' | 'rating' | 'review_count' | 'distance'

interface SearchParams {
  term?: string
  location: string
  radius?: string
  sort_by?: Sort
  offset?: string
  limit?: string
}

export interface Business {
  id: string
  name: string
  location: { display_address: string[] }
  rating: number
  distance: number
}

interface SearchResponse {
  businesses: Array<Business>
}
