export interface Villa {
  id: number
  name: string
  location: string
  image: string
  gallery: string[]
  description: string
  shortDescription: string
  price: number
  bedrooms: number
  bathrooms: number
  sqm: number
  landSqm: number
  features: string[]
  tag: string
}

const BASE = 'https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/public'
const img = (filename: string) => `${BASE}/${encodeURIComponent(filename)}`

const villas: Array<Villa> = [
  {
    id: 1,
    name: 'Villa Azur',
    location: 'Grand Baie, North Coast · Mauritius',
    // Hero image: Screenshot 2026-03-21 175630
    image: img('Screenshot 2026-03-21 175630.png'),
    gallery: [
      img('Screenshot 2026-03-21 175630.png'),           // 1. Hero
      img('Modern-Dream-House-McClean-Design-09-1-Kindesign'), // 2. Second
      img('Screenshot 2026-05-14 202045.png'),           // 3. Third
      img('Screenshot 2026-05-14 201935.png'),           // 4. Fourth
      img('Screenshot 2026-05-14 201944.png'),           // 5. Fifth
      img('Screenshot 2026-05-14 202001.png'),           // 6. Sixth
      img('Screenshot 2026-05-14 202012.png'),           // 7. Seventh
      img('Screenshot 2026-05-14 202036.png'),           // 8. Eighth
      img('Screenshot 2026-05-14 202054.png'),           // 9. Ninth (before staircase)
      img('Screenshot 2026-05-11 171922.png'),           // 10. Staircase → transition into Wellness
      // Wellness/Spa (only these 3)
      img('Screenshot 2026-05-14 202025.png'),           // 11. Wellness: Concierge
      img('Screenshot 2026-05-15 220411.png'),           // 12. Wellness: second
      img('Image.jpg'),                                  // 13. Wellness: third
    ],
    shortDescription: 'Suspended above the Indian Ocean, Villa Azur commands panoramic views across the northern lagoon — a masterwork of glass, stone, and tropical modernism.',
    description: 'Villa Azur is a landmark of contemporary architecture perched on the north coast of Mauritius. Five en-suite bedrooms, an infinity pool that merges with the horizon, a private beach pathway, and a dedicated concierge team make this estate among the most sought-after on the island.',
    price: 3_750_000,
    bedrooms: 5,
    bathrooms: 6,
    sqm: 820,
    landSqm: 2400,
    features: ['Infinity Pool', 'Private Beach Access', 'Smart Home', 'Wine Cellar', 'Spa Suite', 'Concierge'],
    tag: 'Flagship',
  },
]

export default villas
