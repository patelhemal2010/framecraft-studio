import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const VALENTINES_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'valentines-crimson-heart-cluster',
    slug: 'crimson-heart-cluster-be-mine',
    name: '"Be Mine" Heart Photo Collage',
    category: 'valentines',
    description: 'Square romantic collage with 5 heart-shaped photo slots nestled in soft crimson watercolor and Cupid arrows.',
    aspectRatio: '1:1',
    canvasWidth: 2400,
    canvasHeight: 2400,
    supportedPrintSizes: ['8x8"', '12x12"', '16x16"'],
    photoCount: 5,
    tags: ['valentines', 'heart', 'be-mine', 'romantic', 'love'],
    version: 1,
    background: {
      type: 'color',
      color: '#fff1f2',
    },
    decorativeElements: [
      { id: 'heart-top', type: 'heart', x: 0.48, y: 0.05, width: 0.05, height: 0.05, color: '#e11d48', zIndex: 3 },
    ],
    photoSlots: [
      { id: 'hc-1', label: 'Center Heart', x: 0.32, y: 0.32, width: 0.36, height: 0.36, shape: 'heart', borderWidth: 6, borderColor: '#ffffff', shadowBlur: 22, zIndex: 4, defaultSampleUrl: SAMPLE_IMAGES.couples[0] },
      { id: 'hc-2', label: 'Top Left', x: 0.10, y: 0.14, width: 0.30, height: 0.30, shape: 'heart', borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[1] },
      { id: 'hc-3', label: 'Top Right', x: 0.60, y: 0.14, width: 0.30, height: 0.30, shape: 'heart', borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[2] },
      { id: 'hc-4', label: 'Bottom Left', x: 0.10, y: 0.54, width: 0.30, height: 0.30, shape: 'heart', borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[3] },
      { id: 'hc-5', label: 'Bottom Right', x: 0.60, y: 0.54, width: 0.30, height: 0.30, shape: 'heart', borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[4] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.08, text: 'BE MINE FOREVER', fontFamily: 'Playfair Display', fontSize: 44, fontWeight: '700', fill: '#9f1239', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.92, text: 'You have my whole heart for my whole life ♡', fontFamily: 'Caveat', fontSize: 34, fill: '#be123c', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'valentines-midnight-love-letters',
    slug: 'midnight-love-letters-starlight',
    name: 'Deep Burgundy & Gold Valentine Keepsake',
    category: 'valentines',
    description: 'Sultry midnight burgundy backdrop with golden starlight accents, red rose vector, and 3 romantic polaroid frames.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 3,
    tags: ['valentines', 'burgundy', 'rose', 'starlight', 'romance'],
    version: 1,
    background: {
      type: 'color',
      color: '#4c0519',
    },
    decorativeElements: [
      { id: 'rose-val', type: 'rose', x: 0.44, y: 0.05, width: 0.12, height: 0.20, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'val-main', label: 'Our Romantic Date', x: 0.50, y: 0.26, width: 0.44, height: 0.44, shape: 'polaroid', rotation: 3, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[5] },
      { id: 'val-snap1', label: 'Sweet Whispers', x: 0.08, y: 0.32, width: 0.38, height: 0.36, shape: 'polaroid', rotation: -5, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 18, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[6] },
      { id: 'val-snap2', label: 'Moonlit Walk', x: 0.25, y: 0.62, width: 0.50, height: 0.30, shape: 'polaroid', rotation: -1, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, zIndex: 3, defaultSampleUrl: SAMPLE_IMAGES.couples[7] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.12, text: 'HAPPY VALENTINE\'S DAY', fontFamily: 'Playfair Display', fontSize: 44, fontWeight: '700', fill: '#fef08a', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.95, text: 'You are the finest, loveliest, tenderest person I have ever known.', fontFamily: 'Caveat', fontSize: 30, fill: '#fde047', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'valentines-cupid-arrow-duet',
    slug: 'cupid-arrow-duet-photostrip',
    name: 'Romantic Cupid Arrow Dual Photo Strip',
    category: 'valentines',
    description: 'Clean romantic dual photo strip with Cupid’s arrow piercing through the frames on warm blush paper.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 2,
    tags: ['valentines', 'cupid', 'duet', 'arrow', 'blush'],
    version: 1,
    background: {
      type: 'color',
      color: '#fdf2f8',
    },
    decorativeElements: [
      { id: 'heart-cupid', type: 'heart', x: 0.46, y: 0.48, width: 0.08, height: 0.08, color: '#f43f5e', zIndex: 4 },
    ],
    photoSlots: [
      { id: 'p-top', label: 'Looking at You', x: 0.16, y: 0.16, width: 0.68, height: 0.34, shape: 'rounded', borderRadius: 16, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[8] },
      { id: 'p-bottom', label: 'Hand in Hand', x: 0.16, y: 0.54, width: 0.68, height: 0.34, shape: 'rounded', borderRadius: 16, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[9] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.06, text: 'STRUCK BY CUPID', fontFamily: 'Montserrat', fontSize: 32, fontWeight: '700', fill: '#9d174d', align: 'center', letterSpacing: 6, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.94, text: 'Forever my favorite love story ♡', fontFamily: 'Caveat', fontSize: 34, fill: '#be185d', align: 'center', zIndex: 3 },
    ],
  },
];
