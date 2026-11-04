import { CropState } from '../types/template.js';

/**
 * Calculates cover-fit scale and centering offset for an image inside a bounding slot.
 * Ensures aspect ratio is preserved with NO distortion, cropping overflow.
 */
export function calculateCoverFit(
  slotWidth: number,
  slotHeight: number,
  imageWidth: number,
  imageHeight: number
): {
  baseScale: number;
  initialX: number;
  initialY: number;
  scaledWidth: number;
  scaledHeight: number;
} {
  if (!imageWidth || !imageHeight || !slotWidth || !slotHeight) {
    return {
      baseScale: 1,
      initialX: 0,
      initialY: 0,
      scaledWidth: slotWidth,
      scaledHeight: slotHeight,
    };
  }

  // Cover: choose max ratio so slot is fully filled
  const scaleX = slotWidth / imageWidth;
  const scaleY = slotHeight / imageHeight;
  const baseScale = Math.max(scaleX, scaleY);

  const scaledWidth = imageWidth * baseScale;
  const scaledHeight = imageHeight * baseScale;

  // Center within slot
  const initialX = (slotWidth - scaledWidth) / 2;
  const initialY = (slotHeight - scaledHeight) / 2;

  return {
    baseScale,
    initialX,
    initialY,
    scaledWidth,
    scaledHeight,
  };
}

/**
 * Creates default crop state for a newly placed photo
 */
export function createDefaultCrop(): CropState {
  return {
    x: 0,
    y: 0,
    scale: 1, // 1.0 means 100% of base cover scale
    rotation: 0,
    flipH: false,
    flipV: false,
    brightness: 1,
    contrast: 1,
  };
}

/**
 * Clamps pan offset so image doesn't expose empty space inside the slot when zoomed
 */
export function clampPanOffset(
  panX: number,
  panY: number,
  slotWidth: number,
  slotHeight: number,
  renderedImageWidth: number,
  renderedImageHeight: number
): { x: number; y: number } {
  // If the rendered image is wider than the slot, offset range is [slotW - imgW, 0]
  let minX = 0;
  let maxX = 0;
  if (renderedImageWidth > slotWidth) {
    minX = slotWidth - renderedImageWidth;
    maxX = 0;
  } else {
    minX = (slotWidth - renderedImageWidth) / 2;
    maxX = minX;
  }

  let minY = 0;
  let maxY = 0;
  if (renderedImageHeight > slotHeight) {
    minY = slotHeight - renderedImageHeight;
    maxY = 0;
  } else {
    minY = (slotHeight - renderedImageHeight) / 2;
    maxY = minY;
  }

  return {
    x: Math.max(minX, Math.min(maxX, panX)),
    y: Math.max(minY, Math.min(maxY, panY)),
  };
}

/**
 * Flat-top hexagon SVG path scaled to (width, height).
 */
export function getHexagonSvgPath(width: number, height: number): string {
  const w = width;
  const h = height;
  return [
    `M ${w * 0.25},${h * 0.02}`,
    `L ${w * 0.75},${h * 0.02}`,
    `L ${w * 0.98},${h * 0.5}`,
    `L ${w * 0.75},${h * 0.98}`,
    `L ${w * 0.25},${h * 0.98}`,
    `L ${w * 0.02},${h * 0.5}`,
    'Z',
  ].join(' ');
}

/**
 * Arch / vault window SVG path: rectangular body with semicircular top.
 */
export function getArchSvgPath(width: number, height: number): string {
  const w = width;
  const h = height;
  const r = Math.min(w / 2, h * 0.45);
  const cy = r;
  return [
    `M 0,${h}`,
    `L 0,${cy}`,
    `A ${r},${r} 0 0 1 ${w},${cy}`,
    `L ${w},${h}`,
    'Z',
  ].join(' ');
}

/**
 * Generates an SVG path for a perfect symmetrical heart scaled to (width, height)
 */
export function getHeartSvgPath(width: number, height: number): string {
  // Normalized heart points from (0,0) to (1,1)
  // Top cleft at (0.5, 0.2), left lobe top at (0.25, 0.0), right lobe top at (0.75, 0.0), bottom tip at (0.5, 0.95)
  const w = width;
  const h = height;

  const p0 = `${w * 0.5},${h * 0.28}`;
  // Left curve
  const c1 = `${w * 0.5},${h * 0.12} ${w * 0.35},${h * 0.02} ${w * 0.22},${h * 0.02}`;
  const c2 = `${w * 0.05},${h * 0.02} ${w * 0.0},${h * 0.2} ${w * 0.0},${h * 0.38}`;
  const c3 = `${w * 0.0},${h * 0.62} ${w * 0.25},${h * 0.8} ${w * 0.5},${h * 0.98}`;
  // Right curve
  const c4 = `${w * 0.75},${h * 0.8} ${w * 1.0},${h * 0.62} ${w * 1.0},${h * 0.38}`;
  const c5 = `${w * 1.0},${h * 0.2} ${w * 0.95},${h * 0.02} ${w * 0.78},${h * 0.02}`;
  const c6 = `${w * 0.65},${h * 0.02} ${w * 0.5},${h * 0.12} ${w * 0.5},${h * 0.28}`;

  return `M ${p0} C ${c1} C ${c2} C ${c3} C ${c4} C ${c5} C ${c6} Z`;
}

/**
 * Converts normalized coordinate (0..1) to actual pixel coordinate given canvas size
 */
export function normalizedToCanvas(
  val: number,
  canvasDimension: number
): number {
  return Math.round(val * canvasDimension);
}

/**
 * Converts pixel coordinate to normalized (0..1)
 */
export function canvasToNormalized(
  val: number,
  canvasDimension: number
): number {
  if (canvasDimension === 0) return 0;
  return Number((val / canvasDimension).toFixed(5));
}
