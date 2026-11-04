import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const FIRST_BIRTHDAY_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'first-birthday-wild-one',
    slug: 'wild-one-first-birthday-grid',
    name: 'Wild One 1st Birthday Milestone Poster',
    category: 'first-birthday',
    description: 'Adventure & safari inspired 1st birthday collage with large central cake smash photo and 4 quarterly milestone frames.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 5,
    tags: ['first-birthday', 'wild-one', 'milestone', 'safari', 'one'],
    version: 1,
    background: {
      type: 'color',
      color: '#f7f6f0',
    },
    decorativeElements: [
      { id: 'crown-wild', type: 'crown', x: 0.46, y: 0.05, width: 0.08, height: 0.05, zIndex: 3 },
      { id: 'tape-1', type: 'tape', x: 0.14, y: 0.18, width: 0.12, height: 0.04, color: '#d97706', rotation: -5, zIndex: 4 },
      { id: 'tape-2', type: 'tape', x: 0.74, y: 0.18, width: 0.12, height: 0.04, color: '#d97706', rotation: 6, zIndex: 4 },
    ],
    photoSlots: [
      { id: 'hero-cake', label: 'Cake Smash Hero', x: 0.25, y: 0.22, width: 0.50, height: 0.42, shape: 'rounded', borderRadius: 16, borderWidth: 6, borderColor: '#ffffff', shadowBlur: 22, shadowColor: 'rgba(0,0,0,0.15)', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[0] },
      { id: 'q1', label: '3 Months', x: 0.06, y: 0.24, width: 0.16, height: 0.18, shape: 'polaroid', borderWidth: 4, borderColor: '#ffffff', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[1] },
      { id: 'q2', label: '6 Months', x: 0.06, y: 0.46, width: 0.16, height: 0.18, shape: 'polaroid', borderWidth: 4, borderColor: '#ffffff', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[2] },
      { id: 'q3', label: '9 Months', x: 0.78, y: 0.24, width: 0.16, height: 0.18, shape: 'polaroid', borderWidth: 4, borderColor: '#ffffff', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[3] },
      { id: 'q4', label: '12 Months', x: 0.78, y: 0.46, width: 0.16, height: 0.18, shape: 'polaroid', borderWidth: 4, borderColor: '#ffffff', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[4] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.12, text: 'WILD ONE', fontFamily: 'Playfair Display', fontSize: 64, fontWeight: '700', fill: '#78350f', align: 'center', letterSpacing: 6, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.68, text: 'ONE YEAR OF WONDER & ADVENTURE', fontFamily: 'Montserrat', fontSize: 24, fontWeight: '600', fill: '#92400e', align: 'center', letterSpacing: 3, zIndex: 3 },
      { id: 't3', x: 0.5, y: 0.76, text: 'Favorite food: Avocado • First word: Mama • Can crawl & stand tall!', fontFamily: 'Caveat', fontSize: 32, fill: '#78350f', align: 'center', zIndex: 3 },
      { id: 't4', x: 0.5, y: 0.92, text: 'Happy 1st Birthday, Little Explorer ♡', fontFamily: 'Montserrat', fontSize: 22, fill: '#a16207', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'first-birthday-sweet-one-donut',
    slug: 'sweet-one-first-birthday-polaroids',
    name: 'Sweet One Pastel First Birthday Polaroids',
    category: 'first-birthday',
    description: 'Blush pastel aesthetic celebrating baby turning one with tilted polaroids, ribbons, and sweet quotes.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4', '4x6"'],
    photoCount: 4,
    tags: ['first-birthday', 'sweet-one', 'pastel', 'polaroid', 'pink'],
    version: 1,
    background: {
      type: 'color',
      color: '#fdf2f8',
    },
    decorativeElements: [
      { id: 'butterfly', type: 'butterfly', x: 0.82, y: 0.15, width: 0.14, height: 0.14, zIndex: 3 },
      { id: 'doodle-1', type: 'doodle', x: 0.10, y: 0.82, width: 0.10, height: 0.10, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'slot-1', label: 'First Smile', x: 0.12, y: 0.20, width: 0.36, height: 0.34, shape: 'polaroid', rotation: -5, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[5] },
      { id: 'slot-2', label: 'First Giggle', x: 0.52, y: 0.20, width: 0.36, height: 0.34, shape: 'polaroid', rotation: 4, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[6] },
      { id: 'slot-3', label: 'Standing Tall', x: 0.12, y: 0.54, width: 0.36, height: 0.34, shape: 'polaroid', rotation: 3, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[7] },
      { id: 'slot-4', label: 'Birthday Girl', x: 0.52, y: 0.54, width: 0.36, height: 0.34, shape: 'polaroid', rotation: -4, borderWidth: 5, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[8] },
    ],
    textElements: [
      { id: 'text-1', x: 0.5, y: 0.08, text: 'SWEET ONE', fontFamily: 'Playfair Display', fontSize: 60, fontWeight: '700', fill: '#db2777', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 'text-2', x: 0.5, y: 0.94, text: 'you are our greatest blessing ♡', fontFamily: 'Caveat', fontSize: 36, fill: '#9d174d', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'first-birthday-chalkboard-stats',
    slug: 'first-birthday-chalkboard-stats',
    name: 'Blackboard 1st Birthday Milestone Board',
    category: 'first-birthday',
    description: 'Classic chalkboard style 1st birthday milestone board with 3 framed portrait slots and blackboard lettering.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4', '4x6"'],
    photoCount: 3,
    tags: ['first-birthday', 'chalkboard', 'milestones', 'stats', 'birthday'],
    version: 1,
    background: {
      type: 'color',
      color: '#1e293b',
    },
    decorativeElements: [
      { id: 'crown-cb', type: 'crown', x: 0.46, y: 0.06, width: 0.08, height: 0.05, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'slot-center', label: 'Birthday Star', x: 0.30, y: 0.18, width: 0.40, height: 0.38, shape: 'polaroid', borderWidth: 6, borderColor: '#ffffff', shadowBlur: 18, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[9] },
      { id: 'slot-left', label: 'Baby Steps', x: 0.08, y: 0.58, width: 0.38, height: 0.28, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#ffffff', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[10] },
      { id: 'slot-right', label: 'Smiles', x: 0.54, y: 0.58, width: 0.38, height: 0.28, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#ffffff', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.babies[11] },
    ],
    textElements: [
      { id: 'text-1', x: 0.5, y: 0.02, text: 'I AM ONE YEAR OLD!', fontFamily: 'Playfair Display', fontSize: 50, fontWeight: '700', fill: '#fef08a', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 'text-2', x: 0.5, y: 0.94, text: 'Loved beyond measure', fontFamily: 'Caveat', fontSize: 36, fill: '#fef08a', align: 'center', zIndex: 3 },
    ],
  },
];
