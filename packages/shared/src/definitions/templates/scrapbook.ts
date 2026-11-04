import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const SCRAPBOOK_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'scrapbook-vintage-ephemera',
    slug: 'vintage-ephemera-pressed-botanical',
    name: 'Pressed Florals & Antique Ephemera Scrapbook',
    category: 'scrapbook',
    description: 'Nostalgic scrapbook page with torn parchment borders, pressed dried botanicals, and handwritten notes.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 4,
    tags: ['scrapbook', 'botanical', 'vintage', 'pressed-flowers', 'ephemera'],
    version: 1,
    background: {
      type: 'color',
      color: '#f5efe6',
    },
    decorativeElements: [
      { id: 'bouquet-1', type: 'bouquet', x: 0.08, y: 0.12, width: 0.28, height: 0.40, zIndex: 3 },
      { id: 'butterfly', type: 'butterfly', x: 0.82, y: 0.75, width: 0.12, height: 0.12, zIndex: 3 },
      { id: 'tape-1', type: 'tape', x: 0.58, y: 0.10, width: 0.16, height: 0.04, color: '#e5d5c5', rotation: 4, zIndex: 4 },
    ],
    photoSlots: [
      { id: 's1', label: 'Pressed Flower 1', x: 0.46, y: 0.14, width: 0.44, height: 0.38, shape: 'polaroid', rotation: 4, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 18, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[0] },
      { id: 's2', label: 'Field Memory', x: 0.10, y: 0.44, width: 0.40, height: 0.36, shape: 'polaroid', rotation: -5, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 18, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[1] },
      { id: 's3', label: 'Blossoms', x: 0.52, y: 0.46, width: 0.40, height: 0.36, shape: 'polaroid', rotation: 2, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 18, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[2] },
      { id: 's4', label: 'Keepsake', x: 0.24, y: 0.68, width: 0.48, height: 0.26, shape: 'rounded', borderRadius: 8, borderWidth: 4, borderColor: '#ffffff', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[3] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.04, text: 'PRESSED PETALS & MEMORIES', fontFamily: 'Playfair Display', fontSize: 36, fontWeight: '700', fill: '#451a03', align: 'center', letterSpacing: 3, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.96, text: 'Held forever in the pages of time.', fontFamily: 'Caveat', fontSize: 32, fontStyle: 'italic', fill: '#78350f', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'scrapbook-paper-cutout-collage',
    slug: 'textured-paper-cutout-scrapbook',
    name: 'Torn Kraft Paper & Washi Scrapbook',
    category: 'scrapbook',
    description: 'Dynamic multi-photo scrapbook page with 6 tilted polaroid memories held with washi tapes and stickers.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 6,
    tags: ['scrapbook', 'washi', 'kraft', 'polaroid', 'aesthetic'],
    version: 1,
    background: {
      type: 'color',
      color: '#ece5dd',
    },
    decorativeElements: [
      { id: 'tape-1', type: 'tape', x: 0.12, y: 0.08, width: 0.14, height: 0.04, color: '#fbcfe8', rotation: -8, zIndex: 4 },
      { id: 'tape-2', type: 'tape', x: 0.60, y: 0.08, width: 0.14, height: 0.04, color: '#bae6fd', rotation: 6, zIndex: 4 },
      { id: 'tape-3', type: 'tape', x: 0.38, y: 0.66, width: 0.14, height: 0.04, color: '#bbf7d0', rotation: -4, zIndex: 4 },
    ],
    photoSlots: [
      { id: 'p1', label: 'Memory 1', x: 0.08, y: 0.12, width: 0.38, height: 0.25, shape: 'polaroid', rotation: -3, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[4] },
      { id: 'p2', label: 'Memory 2', x: 0.54, y: 0.12, width: 0.38, height: 0.25, shape: 'polaroid', rotation: 4, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[5] },
      { id: 'p3', label: 'Memory 3', x: 0.08, y: 0.40, width: 0.38, height: 0.25, shape: 'polaroid', rotation: 2, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[6] },
      { id: 'p4', label: 'Memory 4', x: 0.54, y: 0.40, width: 0.38, height: 0.25, shape: 'polaroid', rotation: -2, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[7] },
      { id: 'p5', label: 'Memory 5', x: 0.08, y: 0.68, width: 0.38, height: 0.25, shape: 'polaroid', rotation: -4, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[8] },
      { id: 'p6', label: 'Memory 6', x: 0.54, y: 0.68, width: 0.38, height: 0.25, shape: 'polaroid', rotation: 3, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.scrapbook[9] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.04, text: 'LITTLE BITS OF HAPPINESS', fontFamily: 'Montserrat', fontSize: 28, fontWeight: '700', fill: '#292524', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.96, text: 'Collect moments, not things ♡', fontFamily: 'Caveat', fontSize: 32, fill: '#78716c', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'scrapbook-retro-coffee-shop',
    slug: 'warm-cozy-cafe-scrapbook',
    name: 'Cozy Warm Mocha Memory Scrapbook',
    category: 'scrapbook',
    description: 'Mocha and latte toned scrapbook layout with warm coffee notes, tilted Polaroid memories, and cozy textures.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 4,
    tags: ['scrapbook', 'cozy', 'coffee', 'warm', 'aesthetic'],
    version: 1,
    background: {
      type: 'color',
      color: '#f0eae1',
    },
    decorativeElements: [
      { id: 'doodle-cup', type: 'doodle', x: 0.12, y: 0.84, width: 0.12, height: 0.12, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'c1', label: 'Coffee Date', x: 0.12, y: 0.16, width: 0.36, height: 0.34, shape: 'polaroid', rotation: -4, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[0] },
      { id: 'c2', label: 'Latte Art', x: 0.52, y: 0.16, width: 0.36, height: 0.34, shape: 'polaroid', rotation: 5, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[1] },
      { id: 'c3', label: 'Afternoon Chat', x: 0.12, y: 0.52, width: 0.36, height: 0.34, shape: 'polaroid', rotation: 3, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[2] },
      { id: 'c4', label: 'Golden Hour', x: 0.52, y: 0.52, width: 0.36, height: 0.34, shape: 'polaroid', rotation: -3, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.floral[3] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.06, text: 'COZY CAFE DIARIES', fontFamily: 'Playfair Display', fontSize: 44, fontWeight: '700', fill: '#451a03', align: 'center', letterSpacing: 3, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.92, text: 'Warm drinks, sweet smiles, unforgettable stories.', fontFamily: 'Caveat', fontSize: 32, fill: '#78350f', align: 'center', zIndex: 3 },
    ],
  },
];
