import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'
import { yelpClient } from './common/yelp'

vi.mock('./common/yelp', () => ({
  yelpClient: { businesses: vi.fn() },
}))

describe('<App />', () => {
  it('renders a title', () => {
    render(<App />)

    expect(
      screen.getByText('Boba Shops By Netflix Office Locations'),
    ).toBeVisible()
  })

  it('renders an empty state message', () => {
    render(<App />)

    expect(screen.getByText('Click "Search" to get started')).toBeVisible()
  })

  it('renders the table headers', () => {
    render(<App />)

    expect(screen.getByText('Name')).toBeVisible()
    expect(screen.getByText('Address')).toBeVisible()
    expect(screen.getByText('Rating')).toBeVisible()
    expect(screen.getByText('Distance (km)')).toBeVisible()
  })

  describe('when the user clicks "Search"', () => {
    it('renders the loading indicator', async () => {
      vi.mocked(yelpClient.businesses).mockReturnValue(new Promise(() => {}))
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByText('Search'))

      expect(await screen.findByLabelText('Loading')).toBeVisible()
    })

    it('renders the results', async () => {
      vi.mocked(yelpClient.businesses).mockResolvedValue({
        total: 1,
        businesses: [
          {
            id: '123',
            name: 'Boba Guys',
            rating: 4.5,
            distance: 100,
            location: {
              display_address: ['429 Stockton St', 'Los Gatos, CA 12345'],
            },
          },
        ],
      })
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByText('Search'))

      expect(screen.getByText('Boba Guys')).toBeVisible()
      expect(
        screen.getByText('429 Stockton St, Los Gatos, CA 12345'),
      ).toBeVisible()
      expect(screen.getByText('0.1')).toBeVisible()
    })

    describe('when the user clicks "Load More"', () => {
      it('appends new results to the list', async () => {
        vi.mocked(yelpClient.businesses).mockResolvedValueOnce({
          total: 2,
          businesses: [
            {
              id: '123',
              name: 'Boba Guys',
              rating: 4.5,
              distance: 100,
              location: {
                display_address: ['429 Stockton St', 'Los Gatos, CA 12345'],
              },
            },
          ],
        })
        vi.mocked(yelpClient.businesses).mockResolvedValueOnce({
          total: 2,
          businesses: [
            {
              id: '321',
              name: 'Boba Gals',
              rating: 5,
              distance: 200,
              location: {
                display_address: ['432 Main St', 'Los Gatos, CA 12345'],
              },
            },
          ],
        })

        const user = userEvent.setup()
        render(<App />)

        await user.click(screen.getByText('Search'))

        expect(screen.queryByText('Boba Gals')).not.toBeInTheDocument()
        expect(
          screen.queryByText('432 Main St, Los Gatos, CA 12345'),
        ).not.toBeInTheDocument()
        expect(screen.queryByText('0.2')).not.toBeInTheDocument()

        await user.click(screen.getByText('Load More'))

        expect(screen.getByText('Boba Gals')).toBeVisible()
        expect(
          screen.getByText('432 Main St, Los Gatos, CA 12345'),
        ).toBeVisible()
        expect(screen.getByText('0.2')).toBeVisible()
      })
    })

    describe('when there is an error fetching the results', () => {
      it('renders an error message', async () => {
        vi.mocked(yelpClient.businesses).mockRejectedValue(
          new Error('Error fetching results'),
        )

        const user = userEvent.setup()
        render(<App />)

        await user.click(screen.getByText('Search'))

        expect(
          screen.getByText('Oops, something went wrong. Please try again.'),
        ).toBeVisible()
      })
    })
  })
})
