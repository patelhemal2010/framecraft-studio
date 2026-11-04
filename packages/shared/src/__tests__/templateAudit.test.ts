import { describe, it, expect } from 'vitest';
import { INITIAL_TEMPLATES, TemplateDefinitionSchema } from '../index.js';

describe('Phase 5 Template Audit: All 65 Templates', () => {
  it('should have exactly 65 templates loaded', () => {
    expect(INITIAL_TEMPLATES.length).toBe(65);
  });

  it('every template should have a unique ID and slug', () => {
    const ids = new Set<string>();
    const slugs = new Set<string>();

    for (const t of INITIAL_TEMPLATES) {
      expect(ids.has(t.id), `Duplicate ID found: ${t.id}`).toBe(false);
      ids.add(t.id);

      expect(slugs.has(t.slug), `Duplicate slug found: ${t.slug}`).toBe(false);
      slugs.add(t.slug);
    }
  });

  it('every template canvas dimensions and aspect ratios should be valid and consistent', () => {
    for (const t of INITIAL_TEMPLATES) {
      expect(t.canvasWidth).toBeGreaterThanOrEqual(1000);
      expect(t.canvasHeight).toBeGreaterThanOrEqual(1000);

      const ratio = t.canvasWidth / t.canvasHeight;
      if (t.aspectRatio === '1:1') {
        expect(Math.abs(ratio - 1.0)).toBeLessThan(0.05);
      } else if (t.aspectRatio === '4:5') {
        expect(Math.abs(ratio - 0.8)).toBeLessThan(0.05);
      } else if (t.aspectRatio === '16:9') {
        expect(Math.abs(ratio - 16 / 9)).toBeLessThan(0.05);
      } else if (t.aspectRatio === '3:4') {
        expect(Math.abs(ratio - 0.75)).toBeLessThan(0.05);
      } else if (t.aspectRatio === '9:16') {
        expect(Math.abs(ratio - 9 / 16)).toBeLessThan(0.05);
      }
    }
  });

  it('every photo slot has valid normalized coordinates and dimensions', () => {
    for (const t of INITIAL_TEMPLATES) {
      expect(t.photoSlots.length).toBeGreaterThanOrEqual(1);
      for (const slot of t.photoSlots) {
        expect(slot.x).toBeGreaterThanOrEqual(0);
        expect(slot.x).toBeLessThanOrEqual(1);
        expect(slot.y).toBeGreaterThanOrEqual(0);
        expect(slot.y).toBeLessThanOrEqual(1);
        expect(slot.width).toBeGreaterThan(0);
        expect(slot.width).toBeLessThanOrEqual(1);
        expect(slot.height).toBeGreaterThan(0);
        expect(slot.height).toBeLessThanOrEqual(1);
        expect(['rectangle', 'rounded', 'circle', 'heart', 'polaroid', 'arch', 'hexagon']).toContain(slot.shape);
        expect(slot.defaultSampleUrl).toBeDefined();
        expect(typeof slot.defaultSampleUrl).toBe('string');
        expect(slot.defaultSampleUrl!.length).toBeGreaterThan(10);
      }
    }
  });

  it('no template has duplicate sample photo URLs across its slots', () => {
    for (const t of INITIAL_TEMPLATES) {
      const urls = t.photoSlots.map((s) => s.defaultSampleUrl);
      const unique = new Set(urls);
      expect(unique.size, `Template ${t.id} has duplicate sample URLs: ${urls}`).toBe(urls.length);
    }
  });

  it('every decorative element is of a supported type with valid normalized positioning', () => {
    const supportedTypes = new Set([
      'heart',
      'star',
      'floral',
      'ribbon',
      'badge',
      'frame-border',
      'line',
      'svg',
      'bouquet',
      'lotus',
      'butterfly',
      'rose',
      'crown',
      'tape',
      'envelope',
      'doodle',
    ]);

    for (const t of INITIAL_TEMPLATES) {
      if (t.decorativeElements) {
        for (const dec of t.decorativeElements) {
          expect(supportedTypes.has(dec.type), `Template ${t.id} has unsupported type: ${dec.type}`).toBe(true);
          expect(dec.x).toBeGreaterThanOrEqual(0);
          expect(dec.x).toBeLessThanOrEqual(1);
          expect(dec.y).toBeGreaterThanOrEqual(0);
          expect(dec.y).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  it('every calendar configuration is valid', () => {
    for (const t of INITIAL_TEMPLATES) {
      if (t.calendarConfig) {
        expect(t.calendarConfig.month).toBeGreaterThanOrEqual(1);
        expect(t.calendarConfig.month).toBeLessThanOrEqual(12);
        expect(t.calendarConfig.year).toBeGreaterThanOrEqual(2025);
        expect(t.calendarConfig.x).toBeGreaterThanOrEqual(0);
        expect(t.calendarConfig.y).toBeGreaterThanOrEqual(0);
        expect(t.calendarConfig.width).toBeGreaterThan(0);
        expect(t.calendarConfig.height).toBeGreaterThan(0);
      }
    }
  });

  it('every template matches TemplateDefinitionSchema Zod validation', () => {
    for (const t of INITIAL_TEMPLATES) {
      const parseResult = TemplateDefinitionSchema.safeParse(t);
      expect(parseResult.success, `Zod validation failed for ${t.id}: ${JSON.stringify(parseResult)}`).toBe(true);
    }
  });
});
