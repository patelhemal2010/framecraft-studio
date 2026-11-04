import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const PARENTS_DAY_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'parents-day-mom-floral-tribute',
    slug: 'to-the-best-mom-floral-frame',
    name: '"To The World\'s Best Mom" Floral Poster',
    category: 'parents-day',
    description: 'Loving floral keepsake tribute for Mother\'s Day with soft blush background, rose accents, and 3 photo slots.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 3,
    tags: ['parents', 'mom', 'mothers-day', 'floral', 'love'],
    version: 1,
    background: {
      type: 'color',
      color: '#fff1f2',
    },
    decorativeElements: [
      { id: 'rose-mom', type: 'rose', x: 0.44, y: 0.05, width: 0.12, height: 0.18, zIndex: 3 },
      { id: 'heart-mom', type: 'heart', x: 0.48, y: 0.90, width: 0.05, height: 0.05, color: '#e11d48', zIndex: 3 },
    ],
    photoSlots: [
      { id: 'mom-hero', label: 'Mom & Me', x: 0.25, y: 0.24, width: 0.50, height: 0.42, shape: 'rounded', borderRadius: 20, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 22, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[0] },
      { id: 'mom-snap-1', label: 'Laughs', x: 0.08, y: 0.48, width: 0.28, height: 0.28, shape: 'polaroid', rotation: -5, borderWidth: 4, borderColor: '#ffffff', zIndex: 3, defaultSampleUrl: SAMPLE_IMAGES.families[1] },
      { id: 'mom-snap-2', label: 'Hugs', x: 0.64, y: 0.48, width: 0.28, height: 0.28, shape: 'polaroid', rotation: 4, borderWidth: 4, borderColor: '#ffffff', zIndex: 3, defaultSampleUrl: SAMPLE_IMAGES.families[2] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.14, text: 'TO THE WORLD\'S BEST MOM', fontFamily: 'Playfair Display', fontSize: 44, fontWeight: '700', fill: '#9f1239', align: 'center', letterSpacing: 3, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.82, text: 'A mother is she who can take the place of all others, but whose place no one else can take.', fontFamily: 'Caveat', fontSize: 32, fill: '#be123c', align: 'center', zIndex: 3 },
      { id: 't3', x: 0.5, y: 0.95, text: 'Happy Mother\'s Day • Forever Grateful', fontFamily: 'Montserrat', fontSize: 20, fill: '#881337', align: 'center', letterSpacing: 2, zIndex: 3 },
    ],
  },
  {
    id: 'parents-day-dad-hero-memories',
    slug: 'dad-my-first-hero-leather-frame',
    name: '"Dad, My Hero" Classic Warm Keepsake',
    category: 'parents-day',
    description: 'Distinguished Father\'s Day tribute frame with 4 photo slots, rich navy & warm amber tones, and inspiring message.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 4,
    tags: ['parents', 'dad', 'fathers-day', 'hero', 'family'],
    version: 1,
    background: {
      type: 'color',
      color: '#0f172a',
    },
    decorativeElements: [
      { id: 'crown-dad', type: 'crown', x: 0.46, y: 0.05, width: 0.08, height: 0.05, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'dad-1', label: 'Best Pals', x: 0.10, y: 0.18, width: 0.38, height: 0.32, shape: 'rounded', borderRadius: 12, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[3] },
      { id: 'dad-2', label: 'Big Adventure', x: 0.52, y: 0.18, width: 0.38, height: 0.32, shape: 'rounded', borderRadius: 12, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[4] },
      { id: 'dad-3', label: 'Proud Smiles', x: 0.10, y: 0.54, width: 0.38, height: 0.32, shape: 'rounded', borderRadius: 12, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[5] },
      { id: 'dad-4', label: 'Life Lessons', x: 0.52, y: 0.54, width: 0.38, height: 0.32, shape: 'rounded', borderRadius: 12, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[6] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.10, text: 'DAD, MY FIRST HERO', fontFamily: 'Montserrat', fontSize: 38, fontWeight: '700', fill: '#fef08a', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.94, text: 'Thank you for your steady hand, wisdom, and endless love.', fontFamily: 'Caveat', fontSize: 32, fill: '#f4f4f5', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'parents-day-family-legacy',
    slug: 'parents-golden-generations-tribute',
    name: 'Generational Legacy Family Tree Frame',
    category: 'parents-day',
    description: 'Generations tribute frame connecting grandparents, parents, and children with 5 elegant circular & rectangular frames.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 5,
    tags: ['parents', 'family-tree', 'generations', 'legacy', 'heirloom'],
    version: 1,
    background: {
      type: 'color',
      color: '#fdfbf7',
    },
    photoSlots: [
      { id: 'gen-head', label: 'Parents / Grandparents', x: 0.35, y: 0.14, width: 0.30, height: 0.24, shape: 'circle', borderWidth: 6, borderColor: '#ca8a04', shadowBlur: 18, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[7] },
      { id: 'gen-c1', label: 'Family 1', x: 0.08, y: 0.44, width: 0.38, height: 0.22, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[8] },
      { id: 'gen-c2', label: 'Family 2', x: 0.54, y: 0.44, width: 0.38, height: 0.22, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[9] },
      { id: 'gen-c3', label: 'Grandchildren 1', x: 0.08, y: 0.70, width: 0.38, height: 0.22, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[10] },
      { id: 'gen-c4', label: 'Grandchildren 2', x: 0.54, y: 0.70, width: 0.38, height: 0.22, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.families[11] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.05, text: 'A LEGACY OF LOVE & STRENGTH', fontFamily: 'Playfair Display', fontSize: 36, fontWeight: '700', fill: '#854d0e', align: 'center', letterSpacing: 3, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.96, text: 'Roots give us strength; love makes us grow.', fontFamily: 'Caveat', fontSize: 32, fill: '#a16207', align: 'center', zIndex: 3 },
    ],
  },
];
