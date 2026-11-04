import { PrintSizePreset } from '../types/template.js';

export const PRINT_SIZE_PRESETS: PrintSizePreset[] = [
  {
    id: '4x6',
    label: '4 × 6 in (Standard Photo)',
    category: 'photo',
    inches: { width: 4, height: 6 },
    pixels300Dpi: { width: 1200, height: 1800 },
    aspectRatio: '4:5', // closest ratio
  },
  {
    id: '5x7',
    label: '5 × 7 in (Desk Frame)',
    category: 'photo',
    inches: { width: 5, height: 7 },
    pixels300Dpi: { width: 1500, height: 2100 },
    aspectRatio: '4:5',
  },
  {
    id: '8x10',
    label: '8 × 10 in (Classic Portrait)',
    category: 'standard',
    inches: { width: 8, height: 10 },
    pixels300Dpi: { width: 2400, height: 3000 },
    aspectRatio: '4:5',
  },
  {
    id: '11x14',
    label: '11 × 14 in (Medium Poster)',
    category: 'poster',
    inches: { width: 11, height: 14 },
    pixels300Dpi: { width: 3300, height: 4200 },
    aspectRatio: '11:14',
  },
  {
    id: '12x12',
    label: '12 × 12 in (Square Canvas)',
    category: 'standard',
    inches: { width: 12, height: 12 },
    pixels300Dpi: { width: 3600, height: 3600 },
    aspectRatio: '1:1',
  },
  {
    id: 'a4',
    label: 'A4 Document (210 × 297 mm)',
    category: 'metric',
    inches: { width: 8.27, height: 11.69 },
    pixels300Dpi: { width: 2480, height: 3508 },
    aspectRatio: 'A4',
  },
  {
    id: 'a3',
    label: 'A3 Wall Frame (297 × 420 mm)',
    category: 'metric',
    inches: { width: 11.69, height: 16.54 },
    pixels300Dpi: { width: 3508, height: 4960 },
    aspectRatio: 'A4',
  },
];

export function getPresetById(id: string): PrintSizePreset | undefined {
  return PRINT_SIZE_PRESETS.find((p) => p.id === id);
}

/**
 * Calculates target export dimensions in pixels for a given template and preset
 */
export function calculateExportDimensions(
  templateWidth: number,
  templateHeight: number,
  scaleFactor: number = 1.0,
  maxDimension: number = 4000
): { width: number; height: number; scale: number } {
  let targetW = Math.round(templateWidth * scaleFactor);
  let targetH = Math.round(templateHeight * scaleFactor);

  // Guard against runaway memory issues (canvas limit)
  if (targetW > maxDimension || targetH > maxDimension) {
    const downscale = Math.min(maxDimension / targetW, maxDimension / targetH);
    targetW = Math.round(targetW * downscale);
    targetH = Math.round(targetH * downscale);
    return {
      width: targetW,
      height: targetH,
      scale: scaleFactor * downscale,
    };
  }

  return {
    width: targetW,
    height: targetH,
    scale: scaleFactor,
  };
}
