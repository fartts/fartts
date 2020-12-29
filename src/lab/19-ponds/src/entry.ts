import { ceil, floor, min, ππ } from '../../../lib/core/math';
import { step } from '../../../lib/core/step';
import { el, on } from './dom-utils';
import { gridRect, roundRect } from './drawing-utils';
import './style.css';
import type { AppState } from './types';

const canvas = el('canvas');
const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error(`Expected \`CanvasRenderingContext2D\` but got ${ctx}`);
}

const resize = () => {
  const { innerWidth, innerHeight } = window;
  const doubleWidth = ceil(innerWidth * 2);
  const doubleHeight = ceil(innerHeight * 2);

  canvas.width = doubleWidth;
  canvas.height = doubleHeight;
  canvas.style.width = `${doubleWidth}px`;
  canvas.style.height = `${doubleHeight}px`;
  canvas.style.transform = 'scale(0.5)';

  draw();
};

const getState = (): AppState => {
  const { width: canvasWidth, height: canvasHeight } = canvas;

  const safeWidth = canvasWidth * 0.8;
  const safeHeight = canvasHeight * 0.8;

  const halfWidth = canvasWidth / 2;
  const halfHeight = canvasHeight / 2;

  const r = min(halfWidth, halfHeight) * 0.2;
  const step = r;

  const rectWidth = floor(safeWidth / step) * step;
  const rectHeight = floor(safeHeight / step) * step;

  const lineWidth = min(rectWidth, rectHeight) * 0.025;
  const C = ππ * r + (rectWidth - r * 2) * 2 + (rectHeight - r * 2) * 2;
  const dash = C / 38;

  return {
    ctx,
    canvasWidth,
    canvasHeight,
    safeWidth,
    safeHeight,
    halfWidth,
    halfHeight,
    r,
    step,
    rectWidth,
    rectHeight,
    lineWidth,
    C,
    dash,
  };
};

const bkgd = ({ ctx, canvasWidth, canvasHeight }: AppState) => {
  ctx.fillStyle = 'hsl(100, 40%, 60%)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const pond = (state: AppState) => {
  const {
    ctx,
    halfWidth,
    halfHeight,
    rectWidth,
    rectHeight,
    lineWidth,
    dash,
    step,
    r,
  } = state;

  ctx.strokeStyle = 'hsl(50, 10%, 90%)';
  ctx.lineWidth = lineWidth;

  ctx.setLineDash([dash * (17 / 32), dash * (15 / 32)]);
  roundRect(
    state,
    halfWidth - rectWidth / 2,
    halfHeight - rectHeight / 2,
    rectWidth,
    rectHeight,
    r,
  );
  ctx.stroke();

  const C = ππ * step;
  ctx.setLineDash([(C / 8) * (17 / 32), (C / 8) * (15 / 32)]);
  roundRect(state, halfWidth - step, halfHeight - step, step * 2, step * 2, r);
  ctx.stroke();
};

const grid = (state: AppState) => {
  const { ctx, halfWidth, halfHeight, rectWidth, rectHeight, step } = state;

  ctx.strokeStyle = 'hsl(0, 0%, 20%)';
  ctx.lineWidth = 1;

  ctx.setLineDash([]);
  gridRect(
    state,
    halfWidth - rectWidth / 2,
    halfHeight - rectHeight / 2,
    rectWidth,
    rectHeight,
    step,
  );
  ctx.stroke();
};

const draw = () => {
  const state = getState();
  bkgd(state);
  pond(state);
  grid(state);
};

on(window, 'resize', resize);
resize();
