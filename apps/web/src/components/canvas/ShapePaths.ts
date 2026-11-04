/**
 * Canvas clip helpers for non-rectangular photo slot shapes.
 */

export function drawHeartPath(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const w = width;
  const h = height;

  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.28);
  ctx.bezierCurveTo(w * 0.5, h * 0.12, w * 0.35, h * 0.02, w * 0.22, h * 0.02);
  ctx.bezierCurveTo(w * 0.05, h * 0.02, 0, h * 0.2, 0, h * 0.38);
  ctx.bezierCurveTo(0, h * 0.62, w * 0.25, h * 0.8, w * 0.5, h * 0.98);
  ctx.bezierCurveTo(w * 0.75, h * 0.8, w, h * 0.62, w, h * 0.38);
  ctx.bezierCurveTo(w, h * 0.2, w * 0.95, h * 0.02, w * 0.78, h * 0.02);
  ctx.bezierCurveTo(w * 0.65, h * 0.02, w * 0.5, h * 0.12, w * 0.5, h * 0.28);
  ctx.closePath();
}

export function drawArchPath(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const w = width;
  const h = height;
  const r = Math.min(w / 2, h * 0.45);
  const cy = r;

  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, cy);
  ctx.arc(w / 2, cy, r, Math.PI, 0, false);
  ctx.lineTo(w, h);
  ctx.closePath();
}

export function drawHexagonPath(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const w = width;
  const h = height;

  ctx.beginPath();
  ctx.moveTo(w * 0.25, h * 0.02);
  ctx.lineTo(w * 0.75, h * 0.02);
  ctx.lineTo(w * 0.98, h * 0.5);
  ctx.lineTo(w * 0.75, h * 0.98);
  ctx.lineTo(w * 0.25, h * 0.98);
  ctx.lineTo(w * 0.02, h * 0.5);
  ctx.closePath();
}
