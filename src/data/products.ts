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

const villas: Array<Villa> = [
  {
    id: 1,
    name: 'Villa Azur',
    location: 'Grand Baie, North Coast',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85&auto=format',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85&auto=format',
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
  {
    id: 2,
    name: 'Domaine Noir',
    location: 'Bel Ombre, South Coast',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format',
    ],
    shortDescription: 'Monolithic basalt walls, an obsidian-finish pool, and 1.4 hectares of private nature reserve define this singular estate on the wild south coast.',
    description: 'Domaine Noir is a study in dramatic restraint. Built with locally quarried basalt and black-stained concrete, this four-bedroom estate commands a protected nature reserve in Bel Ombre — one of the last untouched coastlines in Mauritius. The architecture references brutalist tradition while embracing the landscape entirely. Floor-to-ceiling glazing dissolves the boundary between interior and wilderness. The estate includes a 22-metre lap pool, underground cinema room, a generator and solar array for full energy autonomy, and a private entrance gate with biometric security. A dedicated villa manager is included for the first year.',
    price: 2_400_000,
    bedrooms: 4,
    bathrooms: 5,
    sqm: 640,
    landSqm: 14000,
    features: ['22m Lap Pool', 'Cinema Room', 'Solar Array', 'Nature Reserve', 'Biometric Security', 'Villa Manager'],
    tag: 'Collector\'s Edition',
  },
  {
    id: 3,
    name: 'Maison Lagon',
    location: 'Trou aux Biches, West',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85&auto=format',
    ],
    shortDescription: 'A refined coastal retreat in Trou aux Biches, steps from Mauritius\'s most celebrated lagoon — intimate, impeccably curated, and ready to occupy.',
    description: 'Maison Lagon represents the ideal entry point into ultra-luxury Mauritian property. Three spacious en-suite bedrooms open to a private tropical garden and a 14-metre pool with integrated jacuzzi. Located in the prestigious Trou aux Biches corridor, the villa is 80 metres from the beach and within walking distance of the finest restaurants on the west coast. Designed in a contemporary Creole style, the interiors feature hand-laid terrazzo floors, custom Mauritian woodwork, and a curated art collection by emerging local artists. The property is fully furnished, professionally managed, and generating rental income, with a 6.8% annual yield track record.',
    price: 1_250_000,
    bedrooms: 3,
    bathrooms: 4,
    sqm: 380,
    landSqm: 900,
    features: ['14m Pool', 'Tropical Garden', 'Creole Architecture', 'Furnished', 'Rental Income Ready', '6.8% Yield'],
    tag: 'Best Entry Value',
  },
  {
    id: 4,
    name: 'Résidence Soleil',
    location: 'Tamarin, Black River',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85&auto=format',
    ],
    shortDescription: 'Situated in the culturally rich Black River district, Résidence Soleil blends Moroccan-inspired architecture with Mauritian sensibility across six expansive suites.',
    description: 'Résidence Soleil is a grand statement of cosmopolitan luxury in one of Mauritius\'s most vibrant expat communities. Six bedroom suites, each with a private terrace, surround a double-level infinity pool with built-in fire features and a submerged lounge. The interior design is the work of Paris-based Studio Nathalie Lemaire, who drew from Moorish geometry and Creole color to create an interior that is both eclectic and supremely elegant. The estate includes a rooftop observation deck with 360° mountain-to-ocean views, a home gym, a sauna, a covered outdoor dining pavilion for 20, and a 4-car garage. Tamarin Bay is steps away — beloved by surfers and yachters alike.',
    price: 4_200_000,
    bedrooms: 6,
    bathrooms: 7,
    sqm: 1100,
    landSqm: 3200,
    features: ['Double Infinity Pool', 'Rooftop Deck', 'Fire Features', 'Sauna', 'Home Gym', '4-Car Garage'],
    tag: 'Grand Estate',
  },
]

export default villas
