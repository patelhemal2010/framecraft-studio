import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const FLORAL_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'floral-wildflower-wreath-center',
    slug: 'wildflower-wreath-featured-photo',
    name: 'Wildflower Blossom Ring Central Feature',
    category: 'floral',
    description: 'Square botanical frame with a centered circular portrait slot surrounded by blooming floral petals and serif typography.',
    aspectRatio: '1:1',
    canvasWidth: 2400,
    canvasHeight: 2400,
    supportedPrintSizes: ['8x8"', '12x12"', '16x16"'],
    photoCount: 1,
    tags: ['floral', 'botanical', 'circle', 'square', 'wildflower'],
    version: 1,
    background: {
      type: 'color',
      color: '#fdfbf7',
    },
    decorativeElements: [
      { id: 'dec-lotus', type: 'lotus', x: 0.12, y: 0.10, width: 0.22, height: 0.18, zIndex: 3 },
      { id: 'dec-bouquet', type: 'bouquet', x: 0.70, y: 0.72, width: 0.22, height: 0.24, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'circle-hero', label: 'Central Feature', x: 0.24, y: 0.24, width: 0.52, height: 0.52, shape: 'circle', borderWidth: 8, borderColor: '#ffffff', shadowBlur: 24, shadowColor: 'rgba(0,0,0,0.15)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[0] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.12, text: 'BLOOM WITH GRACE', fontFamily: 'Playfair Display', fontSize: 44, fontWeight: '700', fill: '#44403c', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.86, text: 'Like wildflowers, you must allow yourself to grow in all the places people never thought you would.', fontFamily: 'Caveat', fontSize: 28, fill: '#78716c', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'floral-botanical-herbarium-grid',
    slug: 'botanical-herbarium-specimen-grid',
    name: 'Botanical Specimen 4-Photo Herbarium',
    category: 'floral',
    description: 'Pressed botanical specimen card aesthetic with 4 rectangular frames, Latin flora labels, and soft parchment texture.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 4,
    tags: ['floral', 'herbarium', 'specimen', 'vintage', 'botanical'],
    version: 1,
    background: {
      type: 'color',
      color: '#f9f6f0',
    },
    decorativeElements: [
      { id: 'lotus-1', type: 'lotus', x: 0.44, y: 0.44, width: 0.12, height: 0.10, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'h1', label: 'Specimen 1', x: 0.10, y: 0.14, width: 0.38, height: 0.34, shape: 'rounded', borderRadius: 8, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[1] },
      { id: 'h2', label: 'Specimen 2', x: 0.52, y: 0.14, width: 0.38, height: 0.34, shape: 'rounded', borderRadius: 8, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[2] },
      { id: 'h3', label: 'Specimen 3', x: 0.10, y: 0.52, width: 0.38, height: 0.34, shape: 'rounded', borderRadius: 8, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[3] },
      { id: 'h4', label: 'Specimen 4', x: 0.52, y: 0.52, width: 0.38, height: 0.34, shape: 'rounded', borderRadius: 8, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[4] },
    ],
    textElements: [
      { id: 'text-1', x: 0.5, y: 0.05, text: 'HERBARIUM BOTANICUM', fontFamily: 'Playfair Display', fontSize: 38, fontWeight: '700', fill: '#1c1917', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 'text-2', x: 0.5, y: 0.92, text: 'NATURAL SPECIMENS & CHERISHED MOMENTS', fontFamily: 'Montserrat', fontSize: 20, fill: '#78716c', align: 'center', letterSpacing: 3, zIndex: 3 },
    ],
  },
  {
    id: 'floral-cherry-blossom-romance',
    slug: 'cherry-blossom-arch-duo',
    name: 'Sakura Cherry Blossom Branch Duo',
    category: 'floral',
    description: 'Spring sakura petals falling across dual portrait photo frames with soft pastel rose backdrop.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 2,
    tags: ['floral', 'sakura', 'cherry-blossom', 'spring', 'romance'],
    version: 1,
    background: {
      type: 'color',
      color: '#fdf2f8',
    },
    decorativeElements: [
      { id: 'butterfly-1', type: 'butterfly', x: 0.14, y: 0.12, width: 0.14, height: 0.14, zIndex: 3 },
      { id: 'butterfly-2', type: 'butterfly', x: 0.80, y: 0.76, width: 0.12, height: 0.12, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'slot-1', label: 'Left Portrait', x: 0.10, y: 0.22, width: 0.38, height: 0.54, shape: 'rounded', borderRadius: 20, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[5] },
      { id: 'slot-2', label: 'Right Portrait', x: 0.52, y: 0.22, width: 0.38, height: 0.54, shape: 'rounded', borderRadius: 20, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[6] },
    ],
    textElements: [
      { id: 'text-1', x: 0.5, y: 0.10, text: 'SPRINGTIME WHISPERS', fontFamily: 'Playfair Display', fontSize: 44, fontWeight: '700', fill: '#9d174d', align: 'center', letterSpacing: 3, zIndex: 3 },
      { id: 'text-2', x: 0.5, y: 0.88, text: 'Under the cherry blossoms, every breath is poetry.', fontFamily: 'Caveat', fontSize: 32, fontStyle: 'italic', fill: '#be185d', align: 'center', zIndex: 3 },
    ],
  },
];
