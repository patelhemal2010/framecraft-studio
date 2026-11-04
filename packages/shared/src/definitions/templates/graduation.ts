import { TemplateDefinition } from '../../types/template.js';
import { SAMPLE_IMAGES } from '../sample-images.js';

export const GRADUATION_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'graduation-class-of-honor',
    slug: 'class-of-honor-graduation-tribute',
    name: 'Class of 2026 Diploma & Cap Tribute',
    category: 'graduation',
    description: 'Distinguished academic honor frame with 4 graduate portraits, gold laurel accents, and graduation year lettering.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 4,
    tags: ['graduation', 'class-of', 'diploma', 'cap', 'academic'],
    version: 1,
    background: {
      type: 'color',
      color: '#0f172a',
    },
    decorativeElements: [
      { id: 'crown-gold', type: 'crown', x: 0.46, y: 0.05, width: 0.08, height: 0.05, zIndex: 3 },
    ],
    photoSlots: [
      { id: 'grad-hero', label: 'Cap Toss Hero', x: 0.10, y: 0.18, width: 0.44, height: 0.48, shape: 'rounded', borderRadius: 16, borderWidth: 6, borderColor: '#fef08a', shadowBlur: 22, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.graduation[0] },
      { id: 'grad-2', label: 'With Diploma', x: 0.58, y: 0.18, width: 0.32, height: 0.22, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#fef08a', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.graduation[1] },
      { id: 'grad-3', label: 'Friends', x: 0.58, y: 0.44, width: 0.32, height: 0.22, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#fef08a', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.graduation[2] },
      { id: 'grad-4', label: 'Family Pride', x: 0.10, y: 0.70, width: 0.80, height: 0.20, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#fef08a', zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.graduation[3] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.11, text: 'CLASS OF 2026', fontFamily: 'Playfair Display', fontSize: 56, fontWeight: '700', fill: '#fef08a', align: 'center', letterSpacing: 6, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.94, text: 'The future belongs to those who believe in the beauty of their dreams.', fontFamily: 'Montserrat', fontSize: 22, fill: '#e2e8f0', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'graduation-journey-milestones',
    slug: 'grad-journey-milestones-triptych',
    name: 'High School to Degree 3-Stage Milestone',
    category: 'graduation',
    description: '3-stage milestone triptych depicting the student’s journey from freshman days to graduation cap ceremony.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 3,
    tags: ['graduation', 'journey', 'milestones', 'triptych', 'degree'],
    version: 1,
    background: {
      type: 'color',
      color: '#f8fafc',
    },
    photoSlots: [
      { id: 'm1', label: 'Freshman Year', x: 0.12, y: 0.16, width: 0.76, height: 0.22, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.graduation[4] },
      { id: 'm2', label: 'College Years', x: 0.12, y: 0.42, width: 0.76, height: 0.22, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.graduation[5] },
      { id: 'm3', label: 'Degree Achieved', x: 0.12, y: 0.68, width: 0.76, height: 0.22, shape: 'rounded', borderRadius: 12, borderWidth: 4, borderColor: '#ffffff', shadowBlur: 16, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.graduation[6] },
    ],
    textElements: [
      { id: 't1', x: 0.5, y: 0.06, text: 'THE JOURNEY OF A SCHOLAR', fontFamily: 'Montserrat', fontSize: 32, fontWeight: '700', fill: '#1e293b', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 't2', x: 0.5, y: 0.94, text: 'Hard work, late nights, proud triumph.', fontFamily: 'Playfair Display', fontSize: 28, fontStyle: 'italic', fill: '#64748b', align: 'center', zIndex: 3 },
    ],
  },
  {
    id: 'graduation-mortarboard-achievement',
    slug: 'mortarboard-achievement-portrait',
    name: 'Gold Trim Academic Excellence Poster',
    category: 'graduation',
    description: 'Clean modern gallery layout with 2 bold portraits, golden diploma seals, and faculty degree honours.',
    aspectRatio: '4:5',
    canvasWidth: 2400,
    canvasHeight: 3000,
    supportedPrintSizes: ['8x10"', '16x20"', 'A4'],
    photoCount: 2,
    tags: ['graduation', 'achievement', 'academic', 'honors'],
    version: 1,
    background: {
      type: 'color',
      color: '#111827',
    },
    decorativeElements: [
      { id: 'star-grad', type: 'star', x: 0.46, y: 0.05, width: 0.08, height: 0.08, color: '#f59e0b', zIndex: 3 },
    ],
    photoSlots: [
      { id: 'slot-1', label: 'Portrait Honors', x: 0.12, y: 0.20, width: 0.36, height: 0.58, shape: 'rounded', borderRadius: 16, borderWidth: 5, borderColor: '#f59e0b', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.graduation[7] },
      { id: 'slot-2', label: 'Celebration Moment', x: 0.52, y: 0.20, width: 0.36, height: 0.58, shape: 'rounded', borderRadius: 16, borderWidth: 5, borderColor: '#f59e0b', shadowBlur: 20, zIndex: 2, defaultSampleUrl: SAMPLE_IMAGES.portraits[0] },
    ],
    textElements: [
      { id: 'text-1', x: 0.5, y: 0.10, text: 'CONGRATULATIONS GRADUATE', fontFamily: 'Playfair Display', fontSize: 42, fontWeight: '700', fill: '#fef08a', align: 'center', letterSpacing: 4, zIndex: 3 },
      { id: 'text-2', x: 0.5, y: 0.88, text: 'Your degree is a stepping stone to your greatness.', fontFamily: 'Montserrat', fontSize: 22, fill: '#e5e7eb', align: 'center', zIndex: 3 },
    ],
  },
];
