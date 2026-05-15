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
    location: 'Grand Baie, North Coast',
    image: img('Screenshot 2026-05-14 201935.png'),
    gallery: [
      img('Screenshot 2026-03-21 175630.png'),
      img('Screenshot 2026-05-11 171922.png'),
      img('Screenshot 2026-05-14 201935.png'),
      img('Screenshot 2026-05-14 201944.png'),
      img('Screenshot 2026-05-14 202001.png'),
      img('Screenshot 2026-05-14 202012.png'),
      img('Screenshot 2026-05-14 202025.png'),
      img('Screenshot 2026-05-14 202036.png'),
      img('Screenshot 2026-05-14 202045.png'),
      img('Screenshot 2026-05-14 202054.png'),
      img('Screenshot 2026-05-14 202110.png'),
      img('Screenshot 2026-05-15 220411.png'),
    ],
    shortDescription: 'Suspended above the Indian Ocean, Villa Azur commands panoramic views across the northern lagoon — a masterwork of glass, stone, and tropical modernism.',
    description: 'Villa Azur is a landmark of contemporary architecture perched on the north coast of Mauritius. Five en-suite bedrooms, an infinity pool that merges with the horizon, a private beach pathway, and a dedicated concierge team make this estate among the most sought-after on the island. Designed by award-winning architects Atelier Côté Sud, every interior detail reflects the island\'s natural palette — volcanic stone, reclaimed teak, and hand-woven local textiles. The property includes a fully equipped chef\'s kitchen, a climate-controlled wine cellar, a private spa suite, and a smart-home system by Control4. The estate sits on 2,400m² of manicured tropical grounds with direct lagoon access.',
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
