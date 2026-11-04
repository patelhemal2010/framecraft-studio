import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const ANNIVERSARY_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'anniversary-tulip-scrapbook',
    slug: 'spring-romance-tulip-scrapbook',
    name: 'Spring Romance Tulip Polaroid Scrapbook',
    category: 'anniversary',
    description: 'Rustic Kraft wrapped tulip bouquet on warm parchment with staggered polaroid memory frames and scribble hearts.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4', '4x6"'],
    photoCount: 3,
    tags: ['anniversary', 'romance', 'tulips', 'polaroid', 'aesthetic', 'scrapbook'],
    version: 1,
    background: {
      type: 'color',
      color: '#f5efe6',
    },
    decorativeElements: [
      { id: 'dec-tulip', type: 'bouquet', x: 0.05, y: 0.15, width: 0.36, height: 0.56, zIndex: 3 },
      { id: 'dec-doodle-1', type: 'doodle', x: 0.44, y: 0.60, width: 0.08, height: 0.08, zIndex: 3 },
      { id: 'dec-doodle-2', type: 'doodle', x: 0.85, y: 0.16, width: 0.08, height: 0.08, zIndex: 3 },
      { id: 'dec-tape', type: 'tape', x: 0.62, y: 0.12, width: 0.18, height: 0.05, color: '#e7d8c9', rotation: 3, zIndex: 4 },
    ],
    photoSlots: [
      { id: 'slot-1', label: 'Polaroid 1', x: 0.48, y: 0.15, width: 0.44, height: 0.42, shape: 'polaroid', rotation: -5, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, shadowColor: 'rgba(0,0,0,0.2)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[0] },
      { id: 'slot-2', label: 'Polaroid 2', x: 0.52, y: 0.42, width: 0.42, height: 0.40, shape: 'polaroid', rotation: 6, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 22, shadowColor: 'rgba(0,0,0,0.2)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[1] },
      { id: 'slot-3', label: 'Polaroid 3', x: 0.12, y: 0.62, width: 0.42, height: 0.34, shape: 'polaroid', rotation: -3, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 18, shadowColor: 'rgba(0,0,0,0.2)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.couples[2] },
    ],
    textElements: [
      { id: 'text-1', x: 0.5, y: 0.06, text: 'SPRING OF OUR LOVE', fontFamily: 'Playfair Display', fontSize: 48, fontWeight: '700', fill: '#44403c', align: 'center', letterSpacing: 3, zIndex: 3 },
      { id: 'text-2', x: 0.65, y: 0.88, text: 'With you, every day feels like blooming spring.', fontFamily: 'Caveat', fontSize: 34, fontStyle: 'italic', fill: '#78716c', align: 'center', zIndex: 3 },
    ],
  },
];
