import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const TRAVEL_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'travel-wanderlust-passport',
    slug: 'wanderlust-passport-scrapbook',
    name: 'Travel Journal & Passport Stamp Collage',
    category: 'travel',
    description: 'Adventurer scrapbook with tilted travel polaroids, flight details, vintage postal stamps, and wanderlust quotes.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 5,
    tags: ['travel', 'wanderlust', 'passport', 'journal', 'scrapbook'],
    version: 1,
    background: {
      type: 'color',
      color: '#f6f1ea',
    },
    decorativeElements: [
      { id: 'dec-tape', type: 'tape', x: 0.44, y: 0.10, width: 0.16, height: 0.045, color: '#fef08a', rotation: -4, zIndex: 4 },
      { id: 'dec-doodle', type: 'doodle', x: 0.82, y: 0.82, width: 0.12, height: 0.12, zIndex: 3 },
    ],
    photoSlots: [
      { id: 't1', label: 'Landmark Hero', x: 0.28, y: 0.14, width: 0.44, height: 0.40, shape: 'polaroid', rotation: 2, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[0] },
      { id: 't2', label: 'Street Snap', x: 0.08, y: 0.24, width: 0.24, height: 0.24, shape: 'polaroid', rotation: -6, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 16, zIndex: 3, defaultSampleUrl: SAMPLE_IMAGES.travel[1] },
      { id: 't3', label: 'Local Flavor', x: 0.68, y: 0.28, width: 0.24, height: 0.24, shape: 'polaroid', rotation: 5, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 16, zIndex: 3, defaultSampleUrl: SAMPLE_IMAGES.travel[2] },
      { id: 't4', label: 'Scenic Vista', x: 0.12, y: 0.58, width: 0.36, height: 0.32, shape: 'polaroid', rotation: -3, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 18, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[3] },
      { id: 't5', label: 'Golden Hour', x: 0.52, y: 0.58, width: 0.36, height: 0.32, shape: 'polaroid', rotation: 4, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 18, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[4] },
    ],
    textElements: [
      { id: 'txt-1', x: 0.5, y: 0.04, text: 'PASSPORT TO ADVENTURE', fontFamily: 'Montserrat', fontSize: 28, fontWeight: '700', fill: '#1c1917', align: 'center', letterSpacing: 6, zIndex: 3 },
      { id: 'txt-2', x: 0.5, y: 0.94, text: 'I haven’t been everywhere, but it’s on my list.', fontFamily: 'Caveat', fontSize: 34, fontStyle: 'italic', fill: '#57534e', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'travel-coastal-getaway-triptych',
    slug: 'coastal-getaway-panoramic-triptych',
    name: 'Coastal Horizon 3-Panel Triptych',
    category: 'travel',
    description: 'Minimalist 16:9 panoramic widescreen triptych frame capturing ocean horizons, sunsets, and beach road trips.',
    aspectRatio: '16:9',
    canvasWidth: 3200,
    canvasHeight: 1800,
    supportedPrintSizes: ['16x9"', '24x14"', 'A3'],
    photoCount: 3,
    tags: ['travel', 'panorama', 'triptych', 'ocean', 'coastal'],
    version: 1,
    background: {
      type: 'color',
      color: '#ffffff',
    },
    photoSlots: [
      { id: 'panel-1', label: 'Panel Left', x: 0.06, y: 0.15, width: 0.28, height: 0.68, shape: 'rounded', borderRadius: 8, borderWidth: 2, borderColor: '#e2e8f0', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[5] },
      { id: 'panel-2', label: 'Panel Center', x: 0.36, y: 0.15, width: 0.28, height: 0.68, shape: 'rounded', borderRadius: 8, borderWidth: 2, borderColor: '#e2e8f0', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[6] },
      { id: 'panel-3', label: 'Panel Right', x: 0.66, y: 0.15, width: 0.28, height: 0.68, shape: 'rounded', borderRadius: 8, borderWidth: 2, borderColor: '#e2e8f0', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[7] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.05, text: 'COASTAL RETREAT • THE HORIZON SERIES', fontFamily: 'Montserrat', fontSize: 24, fontWeight: '600', fill: '#0f172a', align: 'center', letterSpacing: 8, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.90, text: 'Salt in the air, sand in my hair, freedom in the soul.', fontFamily: 'Playfair Display', fontSize: 26, fontStyle: 'italic', fill: '#64748b', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'travel-postcard-from-paradise',
    slug: 'postcard-from-paradise-stamp',
    name: 'Vintage Airmail Postcard Layout',
    category: 'travel',
    description: 'Old-world epistolary airmail postcard collage with 4 travel memories and airmail stripe borders.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 4,
    tags: ['travel', 'postcard', 'airmail', 'vintage', 'wanderlust'],
    version: 1,
    background: {
      type: 'color',
      color: '#faf6ee',
    },
    decorativeElements: [
      { id: 'border-frame', type: 'frame-border', x: 0.04, y: 0.04, width: 0.92, height: 0.92, color: '#38bdf8', opacity: 0.5, zIndex: 1 },
    ],
    photoSlots: [
      { id: 'p1', label: 'Morning Sight', x: 0.08, y: 0.14, width: 0.40, height: 0.34, shape: 'rectangle', borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[8] },
      { id: 'p2', label: 'Midday Stroll', x: 0.52, y: 0.14, width: 0.40, height: 0.34, shape: 'rectangle', borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[9] },
      { id: 'p3', label: 'Sunset Haven', x: 0.08, y: 0.52, width: 0.40, height: 0.34, shape: 'rectangle', borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[10] },
      { id: 'p4', label: 'Nightlights', x: 0.52, y: 0.52, width: 0.40, height: 0.34, shape: 'rectangle', borderWidth: 4, borderColor: '#ffffff', shadowBlur: 14, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.travel[11] },
    ],
    textElements: [
      { id: 'text-1', x: 0.5, y: 0.06, text: 'PAR AVION • POSTCARD FROM PARADISE', fontFamily: 'Montserrat', fontSize: 24, fontWeight: '700', fill: '#0369a1', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 'text-2', x: 0.5, y: 0.92, text: 'Finding paradise wherever the compass leads.', fontFamily: 'Caveat', fontSize: 34, fill: '#0f172a', align: 'center', zIndex: 3 },
    ],
  },
];
