import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const CUSTOM_FRAMES_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'custom-ornate-baroque-gold',
    slug: 'ornate-baroque-museum-gold-frame',
    name: 'Museum Baroque Gold Framed Masterpiece',
    category: 'custom-frames',
    description: 'Opulent baroque gold gilded museum frame highlighting a single central masterpiece photograph with deep shadows.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 1,
    tags: ['custom-frames', 'baroque', 'gold', 'museum', 'ornate'],
    version: 1,
    background: {
      type: 'color',
      color: '#1c1917',
    },
    decorativeElements: [
      { id: 'border-gold', type: 'frame-border', x: 0.05, y: 0.05, width: 0.90, height: 0.90, color: '#ca8a04', opacity: 0.8, zIndex: 1 },
      { id: 'crown-baroque', type: 'crown', x: 0.46, y: 0.07, width: 0.08, height: 0.05, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'masterpiece', label: 'Museum Masterpiece', x: 0.16, y: 0.16, width: 0.68, height: 0.64, shape: 'rounded', borderRadius: 4, borderWidth: 14, borderColor: '#ca8a04', shadowBlur: 32, shadowColor: 'rgba(0,0,0,0.8)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[0] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.86, text: 'PORTRAIT OF EXCELLENCE', fontFamily: 'Playfair Display', fontSize: 38, fontWeight: '700', fill: '#fef08a', align: 'center', letterSpacing: 6, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.92, text: 'PRIVATE COLLECTION • EST. 2026', fontFamily: 'Montserrat', fontSize: 18, fill: '#ca8a04', align: 'center', letterSpacing: 4, zIndex: 3 },
    ],
  },
  {
    id: 'custom-rustic-wooden-barnboard',
    slug: 'rustic-wooden-barnboard-trio',
    name: 'Rustic Weathered Cedar Wood Photo Trio',
    category: 'custom-frames',
    description: 'Warm rustic farmhouse cedar wood frame collage holding 3 warm family memories with metal rivet accents.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 3,
    tags: ['custom-frames', 'wood', 'rustic', 'barnboard', 'farmhouse'],
    version: 1,
    background: {
      type: 'color',
      color: '#292524',
    },
    photoSlots: [
      { id: 'wood-1', label: 'Top Memory', x: 0.12, y: 0.12, width: 0.76, height: 0.36, shape: 'rounded', borderRadius: 8, borderWidth: 8, borderColor: '#78350f', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[1] },
      { id: 'wood-2', label: 'Bottom Left', x: 0.12, y: 0.52, width: 0.36, height: 0.34, shape: 'rounded', borderRadius: 8, borderWidth: 8, borderColor: '#78350f', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[2] },
      { id: 'wood-3', label: 'Bottom Right', x: 0.52, y: 0.52, width: 0.36, height: 0.34, shape: 'rounded', borderRadius: 8, borderWidth: 8, borderColor: '#78350f', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[3] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.92, text: 'OUR ROOTS RUN DEEP', fontFamily: 'Playfair Display', fontSize: 40, fontWeight: '700', fill: '#fef08a', align: 'center', letterSpacing: 4, zIndex: 3 },
    ],
  },
  {
    id: 'custom-floating-acrylic-modern',
    slug: 'modern-floating-acrylic-frame',
    name: 'Modern Floating Glass Gallery Collage',
    category: 'custom-frames',
    description: 'Contemporary floating acrylic frame aesthetic with polished chrome wall standoffs and 4 crisp memories.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 4,
    tags: ['custom-frames', 'acrylic', 'floating', 'glass', 'contemporary'],
    version: 1,
    background: {
      type: 'color',
      color: '#f8fafc',
    },
    photoSlots: [
      { id: 'ac-1', label: 'Float 1', x: 0.10, y: 0.14, width: 0.38, height: 0.34, shape: 'rounded', borderRadius: 4, borderWidth: 2, borderColor: '#cbd5e1', shadowBlur: 24, shadowColor: 'rgba(0,0,0,0.18)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[4] },
      { id: 'ac-2', label: 'Float 2', x: 0.52, y: 0.14, width: 0.38, height: 0.34, shape: 'rounded', borderRadius: 4, borderWidth: 2, borderColor: '#cbd5e1', shadowBlur: 24, shadowColor: 'rgba(0,0,0,0.18)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[5] },
      { id: 'ac-3', label: 'Float 3', x: 0.10, y: 0.52, width: 0.38, height: 0.34, shape: 'rounded', borderRadius: 4, borderWidth: 2, borderColor: '#cbd5e1', shadowBlur: 24, shadowColor: 'rgba(0,0,0,0.18)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[6] },
      { id: 'ac-4', label: 'Float 4', x: 0.52, y: 0.52, width: 0.38, height: 0.34, shape: 'rounded', borderRadius: 4, borderWidth: 2, borderColor: '#cbd5e1', shadowBlur: 24, shadowColor: 'rgba(0,0,0,0.18)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[7] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.05, text: 'FLOATING ACRYLIC GALLERY', fontFamily: 'Montserrat', fontSize: 26, fontWeight: '700', fill: '#0f172a', align: 'center', letterSpacing: 8, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.94, text: 'TIMELESS MOMENTS SUSPENDED IN LIGHT', fontFamily: 'Montserrat', fontSize: 16, fill: '#64748b', align: 'center', letterSpacing: 4, zIndex: 3 },
    ],
  },
];
