import axios from 'axios'
import { Business, SortBy } from '../types'

interface SearchParams {
  term?: string
  location: string
  radius?: string
  sort_by?: SortBy
  offset?: string
  limit?: string
}

interface SearchResponse {
  businesses: Array<Business>
  total: number
}

class YelpClient {
  private BASE_URL = import.meta.env.VITE_SERVER_URL

  async businesses(params: SearchParams) {
    const url = `${this.BASE_URL}/yelpSearch?` + this.stringifyParams(params)
    try {
      const { data } = await axios.get<SearchResponse>(url)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private stringifyParams(params: object) {
    const str = Object.entries(params).reduce(
      (str, [key, value]) => str + `&${key}=${value}`,
      '',
    )
    return new URLSearchParams(str)
  }
}

export const yelpClient = new YelpClient()
