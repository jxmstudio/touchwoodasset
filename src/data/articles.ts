export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  publication: string
  publicationUrl?: string
  author?: string
  date: string
  category: string[]
  externalLink: string
  featuredImage?: string
  featured?: boolean
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'investing-in-car-parks',
    title: 'Investing in car parks',
    excerpt:
      'Discover why car park investments are becoming an attractive asset class for property investors seeking stable returns in urban areas.',
    content: `Car parks are emerging as a compelling investment opportunity in the Australian commercial real estate market. With increasing urbanisation and limited parking availability in city centres, car park assets offer investors a unique combination of stable income and capital growth potential.

The article explores key considerations for investors looking at car park opportunities, including location analysis, revenue streams, and management strategies. As referenced in this Commercial Real Estate feature, industry experts highlight the growing demand for secure parking solutions in metropolitan areas.

Car parks provide several advantages as an investment asset:
- Consistent cash flow from daily, monthly, or lease arrangements
- Lower maintenance costs compared to traditional commercial properties
- Resilience during economic downturns as parking remains essential
- Potential for technology integration and automation
- Diversification benefits for property portfolios

For investors considering entry into this market, understanding local parking demand, zoning regulations, and operational requirements is essential. The car park sector continues to evolve with smart parking technologies and changing urban mobility patterns, making it an exciting space for forward-thinking investors.`,
    publication: 'Commercial Real Estate',
    publicationUrl: 'https://www.commercialrealestate.com.au',
    date: '2024-03-15',
    category: ['Investment', 'Car Parks', 'Commercial Real Estate', 'Media'],
    externalLink:
      'https://www.commercialrealestate.com.au/news/investing-in-car-parks-1442519/',
    featuredImage: '/hero/parking.jpg',
    featured: true,
  },
]
