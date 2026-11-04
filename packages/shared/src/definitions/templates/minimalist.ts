import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const MINIMALIST_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'minimalist-swiss-bauhaus-grid',
    slug: 'swiss-modernist-bauhaus-grid',
    name: 'Swiss Modernist Architectural 6-Grid',
    category: 'minimalist',
    description: 'Disciplined Swiss International Style grid with 6 sharp rectangular photos and understated typography.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 6,
    tags: ['minimalist', 'swiss', 'modernist', 'grid', 'clean'],
    version: 1,
    background: {
      type: 'color',
      color: '#f4f4f5',
    },
    photoSlots: [
      { id: 's1', label: 'Frame 1', x: 0.10, y: 0.16, width: 0.38, height: 0.22, shape: 'rectangle', borderWidth: 1, borderColor: '#d4d4d8', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[0] },
      { id: 's2', label: 'Frame 2', x: 0.52, y: 0.16, width: 0.38, height: 0.22, shape: 'rectangle', borderWidth: 1, borderColor: '#d4d4d8', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[1] },
      { id: 's3', label: 'Frame 3', x: 0.10, y: 0.42, width: 0.38, height: 0.22, shape: 'rectangle', borderWidth: 1, borderColor: '#d4d4d8', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[2] },
      { id: 's4', label: 'Frame 4', x: 0.52, y: 0.42, width: 0.38, height: 0.22, shape: 'rectangle', borderWidth: 1, borderColor: '#d4d4d8', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[3] },
      { id: 's5', label: 'Frame 5', x: 0.10, y: 0.68, width: 0.38, height: 0.22, shape: 'rectangle', borderWidth: 1, borderColor: '#d4d4d8', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[4] },
      { id: 's6', label: 'Frame 6', x: 0.52, y: 0.68, width: 0.38, height: 0.22, shape: 'rectangle', borderWidth: 1, borderColor: '#d4d4d8', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[5] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.06, text: 'ARCHITECTURAL ANTHOLOGY', fontFamily: 'Montserrat', fontSize: 26, fontWeight: '700', fill: '#18181b', align: 'center', letterSpacing: 8, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.94, text: 'FORM FOLLOWS FUNCTION • EDITION 2026', fontFamily: 'Montserrat', fontSize: 16, fill: '#71717a', align: 'center', letterSpacing: 4, zIndex: 3 },
    ],
  },
  {
    id: 'minimalist-mono-zen-duo',
    slug: 'zen-serenity-minimalist-duo',
    name: 'Zen Serenity Asymmetric Dual Frame',
    category: 'minimalist',
    description: 'Spacious zen gallery framing with dual asymmetric photo slots and generous white margins.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 2,
    tags: ['minimalist', 'zen', 'whitespace', 'duo', 'editorial'],
    version: 1,
    background: {
      type: 'color',
      color: '#ffffff',
    },
    photoSlots: [
      { id: 'zen-large', label: 'Main Subject', x: 0.12, y: 0.15, width: 0.76, height: 0.50, shape: 'rectangle', borderWidth: 1, borderColor: '#e4e4e7', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[6] },
      { id: 'zen-small', label: 'Detail Focus', x: 0.52, y: 0.70, width: 0.36, height: 0.20, shape: 'rectangle', borderWidth: 1, borderColor: '#e4e4e7', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[7] },
    ],
    textElements: [
      { id: 't1', x: 0.12, y: 0.72, text: 'SERENITY', fontFamily: 'Playfair Display', fontSize: 44, fontWeight: '700', fill: '#18181b', align: 'left', letterSpacing: 4, zIndex: 3 },
      { id: 't2', x: 0.12, y: 0.79, text: 'In silence and solitude,\nthe world reveals its grace.', fontFamily: 'Montserrat', fontSize: 18, fill: '#71717a', align: 'left', lineHeight: 1.5, zIndex: 3 },
    ],
  },
];
