import { describe, it, expect } from 'vitest';
import {
  INITIAL_TEMPLATES,
  TemplateDefinitionSchema,
  calculateCoverFit,
  clampPanOffset,
  getHeartSvgPath,
  isLeapYear,
  getDaysInMonth,
  generateCalendarGrid,
  autoFillSlots,
  calculateExportDimensions,
  PRINT_SIZE_PRESETS,
} from '../index.js';

describe('Template Schemas & Definitions', () => {
  it('should have at least 60 templates defined', () => {
    expect(INITIAL_TEMPLATES.length).toBeGreaterThanOrEqual(60);
  });

  it('validates every template against TemplateDefinitionSchema without errors', () => {
    for (const template of INITIAL_TEMPLATES) {
      const result = TemplateDefinitionSchema.safeParse(template);
      if (!result.success) {
        console.error('Validation failure on template:', template.id, (result.error as any).issues || (result.error as any).errors);
      }
      expect(result.success).toBe(true);
      expect(template.photoSlots.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('covers all 20 required categories with at least 3 templates each', () => {
    const requiredCategories = [
      'birthday',
      'wedding',
      'anniversary',
      'baby',
      'first-birthday',
      'family',
      'couple',
      'friends',
      'travel',
      'scrapbook',
      'polaroid',
      'floral',
      'calendar',
      'festival',
      'graduation',
      'parents-day',
      'valentines',
      'minimalist',
      'black-and-white',
      'custom-frames',
    ];

    for (const cat of requiredCategories) {
      const count = INITIAL_TEMPLATES.filter((t) => t.category === cat).length;
      expect(count).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('Geometry & Crop Math', () => {
  it('correctly calculates cover-fit for landscape image in portrait slot', () => {
    // Slot 400x600, Image 1000x800
    // scaleX = 400/1000 = 0.4, scaleY = 600/800 = 0.75 -> baseScale = 0.75
    const fit = calculateCoverFit(400, 600, 1000, 800);
    expect(fit.baseScale).toBeCloseTo(0.75);
    expect(fit.scaledWidth).toBe(750);
    expect(fit.scaledHeight).toBe(600);
    // Center X: (400 - 750) / 2 = -175
    expect(fit.initialX).toBeCloseTo(-175);
    expect(fit.initialY).toBeCloseTo(0);
  });

  it('correctly calculates cover-fit for portrait image in square slot', () => {
    const fit = calculateCoverFit(500, 500, 400, 800);
    // scaleX = 500/400 = 1.25, scaleY = 500/800 = 0.625 -> baseScale = 1.25
    expect(fit.baseScale).toBeCloseTo(1.25);
    expect(fit.scaledWidth).toBe(500);
    expect(fit.scaledHeight).toBe(1000);
    expect(fit.initialX).toBe(0);
    expect(fit.initialY).toBe(-250);
  });

  it('clamps pan offsets within bounds', () => {
    const clamped = clampPanOffset(-300, 50, 400, 400, 600, 600);
    // For 600 in 400 slot: min is -200, max is 0
    expect(clamped.x).toBe(-200);
    expect(clamped.y).toBe(0);
  });

  it('generates valid heart SVG path with matching dimensions', () => {
    const path = getHeartSvgPath(200, 200);
    expect(path).toContain('M 100,56');
    expect(path).toContain('Z');
  });
});

describe('Calendar Engine', () => {
  it('correctly detects leap years', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2025)).toBe(false);
    expect(isLeapYear(2026)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
  });

  it('computes correct days for all months including February leap year', () => {
    expect(getDaysInMonth(2024, 2)).toBe(29);
    expect(getDaysInMonth(2025, 2)).toBe(28);
    expect(getDaysInMonth(2026, 1)).toBe(31);
    expect(getDaysInMonth(2026, 4)).toBe(30);
  });

  it('generates structured calendar grid with highlighted dates', () => {
    const grid = generateCalendarGrid({
      month: 10,
      year: 2026,
      weekStart: 'sun',
      highlightedDates: [{ day: 24, label: 'Birthday', style: 'badge' }],
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      zIndex: 1,
    });

    expect(grid.monthName).toBe('October');
    expect(grid.year).toBe(2026);
    expect(grid.totalDays).toBe(31);
    expect(grid.weeks.length).toBeGreaterThanOrEqual(4);

    // Flatten to find day 24
    const allCells = grid.weeks.flat();
    const cell24 = allCells.find((c) => c.day === 24);
    expect(cell24).toBeDefined();
    expect(cell24?.isHighlighted).toBe(true);
    expect(cell24?.highlightLabel).toBe('Birthday');
  });
});

describe('Slot Auto-Filling Algorithm', () => {
  it('fills slots in predictable order and tracks remaining slots', () => {
    const template = INITIAL_TEMPLATES.find((t) => t.photoSlots.length === 5)!; // template with 5 photos
    const mockUploads = [
      { id: 'img-1', url: 'https://example.com/1.jpg' },
      { id: 'img-2', url: 'https://example.com/2.jpg' },
      { id: 'img-3', url: 'https://example.com/3.jpg' },
    ];

    const result = autoFillSlots(template.photoSlots, mockUploads);
    expect(result.filledSlotIds.length).toBe(3);
    expect(result.remainingSlotIds.length).toBe(2);
    expect(result.unassignedImages.length).toBe(0);

    const assignedUrls = result.filledSlotIds.map((id) => result.assignments[id].photoUrl);
    expect(assignedUrls).toContain('https://example.com/1.jpg');
    expect(assignedUrls).toContain('https://example.com/2.jpg');
    expect(assignedUrls).toContain('https://example.com/3.jpg');
    expect(result.assignments[result.filledSlotIds[0]].crop.scale).toBe(1);
  });
});

describe('Export Presets & Resolution', () => {
  it('contains expected presets', () => {
    expect(PRINT_SIZE_PRESETS.some((p) => p.id === '8x10')).toBe(true);
    expect(PRINT_SIZE_PRESETS.some((p) => p.id === 'a4')).toBe(true);
  });

  it('calculates print dimensions safely within max bounds', () => {
    const dims = calculateExportDimensions(2400, 3000, 1.0, 4000);
    expect(dims.width).toBe(2400);
    expect(dims.height).toBe(3000);

    // If scaleFactor would exceed maxDimension (e.g. 2.0x on 3000 = 6000)
    const clampedDims = calculateExportDimensions(2400, 3000, 2.0, 4000);
    expect(clampedDims.height).toBeLessThanOrEqual(4000);
    expect(clampedDims.width).toBeLessThanOrEqual(4000);
  });
});
