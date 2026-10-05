import type { Product, Review } from '../types/shop';
import chairImg from '../assets/images/product_walnut_accent_chair_1791180860757.jpg';
import vaseImg from '../assets/images/product_fluted_ceramic_vase_1791180851118.jpg';
import lampImg from '../assets/images/product_brass_pendulum_lamp_1791180871444.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'atv-chair-01',
    name: 'Kallio Bouclé Lounge Chair',
    category: 'furniture',
    designer: 'Studio Ilmari, Helsinki',
    price: 840,
    originalPrice: 920,
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    stockCount: 8,
    isBestseller: true,
    editionText: 'Crafted in small batches of 25',
    description: 'A low-slung, sculptural lounge chair carved from certified American solid walnut, enveloped in heavy tactile Italian bouclé fabric with double-stitched piping.',
    story: 'Designed to introduce an organic counterweight to rectilinear modern interiors. The joinery is completed with traditional mortise-and-tenon joints, hand-rubbed with organic tung oil for a natural satin finish.',
    materials: ['Solid American Walnut', 'Heavy Italian Bouclé (78% Wool, 22% Cotton)', 'High-Resilience Bio-Foam Core'],
    dimensions: 'W 82cm × D 86cm × H 74cm (Seat Height 41cm)',
    colors: [
      { name: 'Oatmeal Bouclé', hex: '#EDE8DF' },
      { name: 'Charcoal Wool', hex: '#2A2928' },
      { name: 'Olive Drab', hex: '#585C4F' }
    ],
    image: chairImg,
    leadTime: 'Ready to ship in 3-5 business days',
    care: 'Professional dry clean for fabric. Dust walnut frame with soft dry microfiber cloth.'
  },
  {
    id: 'atv-vase-02',
    name: 'Rannik Fluted Stoneware Vase',
    category: 'ceramics',
    designer: 'Elena Møller, Copenhagen',
    price: 165,
    rating: 4.8,
    reviewsCount: 64,
    inStock: true,
    stockCount: 19,
    isNew: true,
    editionText: 'Hand-thrown stoneware',
    description: 'Architectural fluted vessel wheel-thrown with iron-flecked Nordic clay, finished with a subtle matte chalk glaze that leaves mineral speckles visible.',
    story: 'Inspired by classical Ionic fluting stripped down to pure minimalist geometry. Watertight interior suitable for fresh botanicals or standing as an unadorned sculptural object.',
    materials: ['Iron-speckled Nordic Stoneware', 'Matte Chalk Silicate Glaze'],
    dimensions: 'Ø 18cm × H 32cm · Weight 2.4kg',
    colors: [
      { name: 'Chalk Matte', hex: '#EAE6DD' },
      { name: 'Smoked Basalt', hex: '#3B3835' },
      { name: 'Terracotta Raw', hex: '#9E5D4E' }
    ],
    image: vaseImg,
    leadTime: 'Ships within 24 hours',
    care: 'Hand wash with mild soapy water. Interior is glazed watertight.'
  },
  {
    id: 'atv-lamp-03',
    name: 'Astrid Opal Pendant Fixture',
    category: 'lighting',
    designer: 'Lars Westermark, Stockholm',
    price: 340,
    originalPrice: 380,
    rating: 5.0,
    reviewsCount: 38,
    inStock: true,
    stockCount: 12,
    isBestseller: true,
    editionText: 'Mouth-blown opal glass',
    description: 'Suspended pendulum lighting fixture featuring a brushed solid brass armature supporting a triplex mouth-blown opal glass sphere that diffuses shadowless warm 2700K glow.',
    story: 'Engineered for dining rooms, kitchen islands, and quiet reading alcoves. The brushed brass receives an unlacquered treatment that develops a soft, graceful living patina over decades.',
    materials: ['Unlacquered Brushed Brass', 'Triplex Mouth-Blown Opal Glass', 'Braided Linen Cord'],
    dimensions: 'Glass Sphere Ø 25cm · Brass Stem 35cm · Cord Length 250cm (Adjustable)',
    colors: [
      { name: 'Brushed Brass', hex: '#CDB172' },
      { name: 'Blackened Bronze', hex: '#262423' },
      { name: 'Satin Nickel', hex: '#B8B8B5' }
    ],
    image: lampImg,
    leadTime: 'Ready to ship in 2-4 business days',
    care: 'Ensure fixture is powered off. Wipe brass and glass with dry microfiber cloth.'
  },
  {
    id: 'atv-table-04',
    name: 'Sylvan Travertine Plinth Table',
    category: 'furniture',
    designer: 'Atelier V Studio, Copenhagen',
    price: 1250,
    rating: 4.9,
    reviewsCount: 23,
    inStock: true,
    stockCount: 4,
    editionText: 'Limited edition of 50',
    description: 'Monolithic low coffee table carved from unfilled Italian Roman travertine with open-pore veining and chamfered structural slab legs.',
    story: 'Every piece celebrates millions of years of geothermal sedimentary formation. The surface is hand-honed to a tactile matte finish that resists liquid penetration while honoring the stone.',
    materials: ['Honed Roman Travertine Stone', 'Natural Stone Sealer'],
    dimensions: 'L 110cm × W 60cm × H 34cm · Weight 58kg',
    colors: [
      { name: 'Natural Travertine', hex: '#E2D9CC' },
      { name: 'Silver Vein Travertine', hex: '#BFB8AB' }
    ],
    image: chairImg, // Fallback/preview paired with stylized badge
    leadTime: 'White Glove Freight Delivery · 7-10 business days',
    care: 'Seal refreshed annually. Clean spills immediately with pH-neutral stone cleaner.'
  },
  {
    id: 'atv-candle-05',
    name: 'Kyoto Hinoki & Cast Bronze Burner',
    category: 'objects',
    designer: 'Kenji Takahashi, Kyoto',
    price: 95,
    rating: 4.8,
    reviewsCount: 51,
    inStock: true,
    stockCount: 28,
    isNew: true,
    description: 'Sand-cast solid bronze incense holder paired with 40 sticks of aged Kyoto Hinoki cypress and smoky cedarwood incense made by artisanal incense masters.',
    story: 'Casting irregularities give each bronze receptacle an individual fingerprint. Features a stepped slot that holds standard and bamboo incense cores without ash scattering.',
    materials: ['Sand-Cast Solid Bronze', 'Japanese Hinoki Wood Essential Oils'],
    dimensions: 'L 14cm × W 4cm × H 2.5cm · Weight 420g',
    colors: [
      { name: 'Raw Sandcast Bronze', hex: '#8C6F4E' },
      { name: 'Verdigris Aged', hex: '#4B6B63' }
    ],
    image: vaseImg,
    leadTime: 'Ships within 24 hours',
    care: 'Rinse with warm water to clear ash residue. Bronze will deepen naturally with age.'
  },
  {
    id: 'atv-sconce-06',
    name: 'Norden Swivel Wall Sconce',
    category: 'lighting',
    designer: 'Lars Westermark, Stockholm',
    price: 260,
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
    stockCount: 14,
    description: 'A quiet architectural sconce with 180-degree horizontal articulated swivel and an asymmetric spun aluminum conical shade casting focused direct and soft ambient back-glow.',
    story: 'Designed as a bedside or reading room fixture that eliminates the clutter of bedside table lamps. Includes integrated smooth rotary brass dimmer switch.',
    materials: ['Spun Matte Aluminum', 'Solid Brass Articulation Joint', 'Textile Wrapped Cord'],
    dimensions: 'Arm Reach 42cm · Shade Ø 16cm · Backplate Ø 10cm',
    colors: [
      { name: 'Matte Bone White', hex: '#ECE8DF' },
      { name: 'Burnt Ochre', hex: '#874D33' },
      { name: 'Soot Black', hex: '#232220' }
    ],
    image: lampImg,
    leadTime: 'Ready to ship in 2-3 business days',
    care: 'Wipe with soft clean dry cloth. Compatible with E26 LED bulbs up to 40W equivalent.'
  },
  {
    id: 'atv-carafe-07',
    name: 'Aalto Hand-Blown Smoke Carafe & Tumbler',
    category: 'objects',
    designer: 'Studio Ilmari, Helsinki',
    price: 120,
    rating: 4.9,
    reviewsCount: 33,
    inStock: true,
    stockCount: 22,
    description: 'Mouth-blown smoke-tinted borosilicate glass carafe with an integrated nestable drinking tumbler that functions as a dust lid.',
    story: 'Created for desktop and bedside hydration ritual. The tapered neck balances ergonomics with optimal pouring velocity without droplets.',
    materials: ['Lead-Free Borosilicate Glass', 'Smoke Pigment Inclusion'],
    dimensions: 'Carafe 900ml (H 24cm) · Tumbler 280ml (H 9cm)',
    colors: [
      { name: 'Smoked Charcoal', hex: '#63625E' },
      { name: 'Amber Honey', hex: '#9E7848' },
      { name: 'Clear Fluted', hex: '#E5E7EB' }
    ],
    image: vaseImg,
    leadTime: 'Ships within 24 hours',
    care: 'Dishwasher safe. Heat resistant up to 120°C.'
  },
  {
    id: 'atv-bench-08',
    name: 'Hedda Woven Danish Cord Bench',
    category: 'furniture',
    designer: 'Elena Møller, Copenhagen',
    price: 680,
    originalPrice: 750,
    rating: 5.0,
    reviewsCount: 17,
    inStock: true,
    stockCount: 6,
    editionText: 'Hand-woven seat pattern',
    description: 'An entryway or foot-of-bed bench constructed with solid White Ash timber and 140 meters of continuous unbleached Danish paper cord woven in a herringbone pattern.',
    story: 'Woven entirely by hand by master craftswomen in Funen, Denmark. The tensioned paper cord conforms comfortably to the body and offers over 40 years of structural resilience.',
    materials: ['FSC-Certified Solid White Ash', '3-Ply Natural Danish Paper Cord'],
    dimensions: 'L 120cm × D 38cm × H 44cm · Weight 11kg',
    colors: [
      { name: 'Natural Ash & Cord', hex: '#E4DFD5' },
      { name: 'Smoked Oak & Black Cord', hex: '#3C3833' }
    ],
    image: chairImg,
    leadTime: 'Ready to ship in 4-6 business days',
    care: 'Vacuum cord with soft brush attachment. Avoid soaking cord.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Camilla Lindqvist',
    role: 'Lead Architect at Studio Forma',
    location: 'Stockholm, Sweden',
    rating: 5,
    title: 'An heirloom caliber piece of furniture',
    comment: 'The Kallio Bouclé Chair surpassed every expectation. The walnut joinery is invisible, the bouclé is heavy and tactile, and it commands the room without shouting. Our clients were stunned.',
    date: 'February 2026',
    verified: true
  },
  {
    id: 'rev-02',
    author: 'Julian Vance',
    role: 'Creative Director',
    location: 'Brooklyn, NY',
    rating: 5,
    title: 'Sublime diffused light quality',
    comment: 'The Astrid Opal pendant completely changed the warmth of our dining space. The 2700K diffusion through the three-layer mouth-blown glass eliminates glare entirely.',
    date: 'January 2026',
    verified: true
  },
  {
    id: 'rev-03',
    author: 'Dr. Soraya Bennett',
    role: 'Art Historian & Collector',
    location: 'Zurich, Switzerland',
    rating: 5,
    title: 'Tactile perfection in stoneware',
    comment: 'The Rannik vase has that rare museum quality where you want to trace the fluting with your fingertips every time you walk past. Exceptional packaging and prompt courier handling.',
    date: 'March 2026',
    verified: true
  }
];

export const PROMO_CODES: Record<string, { discountPercent?: number; discountFixed?: number; description: string }> = {
  'WELCOME10': { discountPercent: 10, description: '10% off your first studio order' },
  'ATELIER25': { discountPercent: 15, description: '15% seasonal collector appreciation' },
  'FREESHIP': { discountFixed: 0, description: 'Complimentary expedited handling' }
};
