import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const COUPLE_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'couple-our-love-story-strip',
    slug: 'our-love-story-photostrip',
    name: 'Romantic 4-Photo Strip Keepsake',
    category: 'couple',
    description: 'Vintage photo-booth style 4-frame vertical strip on textured linen paper with handwritten memories.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4', '4x6"'],
    photoCount: 4,
    tags: ['couple', 'photostrip', 'vintage', 'booth', 'romance'],
    version: 1,
    background: {
      type: 'color',
      color: '#fdfbf7',
    },
    decorativeElements: [
      { id: 'heart-tape', type: 'tape', x: 0.42, y: 0.05, width: 0.16, height: 0.04, color: '#fbcfe8', rotation: -3, zIndex: 4 },
      { id: 'heart-dec', type: 'heart', x: 0.48, y: 0.90, width: 0.04, height: 0.04, color: '#e11d48', zIndex: 3 },
    ],
    photoSlots: [
      { id: 'ps-1', label: 'First Date', x: 0.28, y: 0.12, width: 0.44, height: 0.17, shape: 'rounded', borderRadius: 8, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[0] },
      { id: 'ps-2', label: 'The Proposal', x: 0.28, y: 0.31, width: 0.44, height: 0.17, shape: 'rounded', borderRadius: 8, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[1] },
      { id: 'ps-3', label: 'Getaway', x: 0.28, y: 0.50, width: 0.44, height: 0.17, shape: 'rounded', borderRadius: 8, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[2] },
      { id: 'ps-4', label: 'Always Us', x: 0.28, y: 0.69, width: 0.44, height: 0.17, shape: 'rounded', borderRadius: 8, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[3] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.02, text: 'PHOTO BOOTH MEMORIES', fontFamily: 'Montserrat', fontSize: 22, fontWeight: '700', fill: '#831843', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.94, text: 'you & me against the world ♡', fontFamily: 'Caveat', fontSize: 36, fill: '#be185d', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'couple-heart-duet-framed',
    slug: 'heart-duet-couple-poster',
    name: 'Dual Heart Silhouette Romantic Frame',
    category: 'couple',
    description: 'Two interlocking heart photo frames over warm sunset crimson with romantic quote.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4', '4x6"'],
    photoCount: 2,
    tags: ['couple', 'heart', 'silhouette', 'romantic', 'love'],
    version: 1,
    background: {
      type: 'color',
      color: '#fff1f2',
    },
    decorativeElements: [
      { id: 'butterfly', type: 'butterfly', x: 0.44, y: 0.18, width: 0.12, height: 0.12, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'heart-left', label: 'His Heart', x: 0.08, y: 0.26, width: 0.46, height: 0.42, shape: 'heart', borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, shadowColor: 'rgba(0,0,0,0.15)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[4] },
      { id: 'heart-right', label: 'Her Heart', x: 0.46, y: 0.32, width: 0.46, height: 0.42, shape: 'heart', borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, shadowColor: 'rgba(0,0,0,0.15)', zIndex: 3, defaultSampleUrl: SAMPLE_IMAGES.couples[5] },
    ],
    textElements: [
      { id: 'text-1', x: 0.5, y: 0.10, text: 'TWO HEARTS BEATING AS ONE', fontFamily: 'Playfair Display', fontSize: 44, fontWeight: '700', fill: '#9f1239', align: 'center', letterSpacing: 3, zIndex: 3 },
      { id: 'text-2', x: 0.5, y: 0.88, text: 'In your smile, I see something more beautiful than stars.', fontFamily: 'Caveat', fontSize: 34, fontStyle: 'italic', fill: '#be123c', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'couple-cinema-film-reel',
    slug: 'cinema-filmstrip-couple-memories',
    name: 'Vintage 35mm Filmstrip Couple Poster',
    category: 'couple',
    description: 'Black cinema negative filmstrip with 6 widescreen memory frames and minimalist Helvetica typography.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 6,
    tags: ['couple', 'filmstrip', 'cinema', 'vintage', '35mm'],
    version: 1,
    background: {
      type: 'color',
      color: '#09090b',
    },
    photoSlots: [
      { id: 'f1', label: 'Scene 1', x: 0.08, y: 0.14, width: 0.40, height: 0.22, shape: 'rectangle', borderWidth: 3, borderColor: '#27272a', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[6] },
      { id: 'f2', label: 'Scene 2', x: 0.52, y: 0.14, width: 0.40, height: 0.22, shape: 'rectangle', borderWidth: 3, borderColor: '#27272a', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[7] },
      { id: 'f3', label: 'Scene 3', x: 0.08, y: 0.40, width: 0.40, height: 0.22, shape: 'rectangle', borderWidth: 3, borderColor: '#27272a', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[8] },
      { id: 'f4', label: 'Scene 4', x: 0.52, y: 0.40, width: 0.40, height: 0.22, shape: 'rectangle', borderWidth: 3, borderColor: '#27272a', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[9] },
      { id: 'f5', label: 'Scene 5', x: 0.08, y: 0.66, width: 0.40, height: 0.22, shape: 'rectangle', borderWidth: 3, borderColor: '#27272a', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[10] },
      { id: 'f6', label: 'Scene 6', x: 0.52, y: 0.66, width: 0.40, height: 0.22, shape: 'rectangle', borderWidth: 3, borderColor: '#27272a', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[11] },
    ],
    textElements: [
      { id: 'text-1', x: 0.5, y: 0.05, text: 'KODAK PORTRA 400 • OUR STORY', fontFamily: 'Montserrat', fontSize: 24, fontWeight: '700', fill: '#f4f4f5', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 'text-2', x: 0.5, y: 0.93, text: 'EVERY FRAME A MASTERPIECE', fontFamily: 'Montserrat', fontSize: 18, fill: '#a1a1aa', align: 'center', letterSpacing: 6, zIndex: 3 },
    ],
  },
];
