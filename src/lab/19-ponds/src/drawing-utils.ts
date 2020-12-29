import { π } from '../../../lib/core/math';
import type { AppState } from './types';

const hπ = π / 2;

/**
 * apparently this is coming to canvas at some point
 * @see https://www.chromestatus.com/feature/5678204184428544
 * @see https://github.com/fserb/canvas2D/blob/master/spec/roundrect.md
 */
export const roundRect = (
  { ctx }: Pick<AppState, 'ctx'>,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void => {
  ctx.beginPath();

  // top left
  ctx.arc(x + r, y + r, r, π, π + hπ);
  ctx.lineTo(x + w - r, y);

  // top right
  ctx.arc(x + w - r, y + r, r, π + hπ, 0);
  ctx.lineTo(x + w, y + h - r);

  // bottom right
  ctx.arc(x + w - r, y + h - r, r, 0, hπ);
  ctx.lineTo(x + w - r, y + h);

  // bottom left
  ctx.arc(x + r, y + h - r, r, hπ, π);
  ctx.lineTo(x, y + r);

  ctx.closePath();
};

export const gridRect = (
  {
    ctx,
    canvasWidth,
    canvasHeight,
  }: Pick<AppState, 'ctx' | 'canvasWidth' | 'canvasHeight'>,
  x: number,
  y: number,
  w: number,
  h: number,
  s: number,
): void => {
  ctx.beginPath();

  for (let i = 0; i <= w; i += s) {
    ctx.moveTo(x + i, 0);
    ctx.lineTo(x + i, canvasHeight);
  }

  for (let j = 0; j <= h; j += s) {
    ctx.moveTo(0, y + j);
    ctx.lineTo(canvasWidth, y + j);
  }
};
