import { el, rAF, on, off } from '../../lib/core/dom';
import { min, ππ, hypot, lerp } from '../../lib/core/math';

import { resize, shouldResize } from './resize';

import './style.css';

const { devicePixelRatio: dpr } = window;

const m = el('main') as HTMLMainElement;
const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

let graphSize = 0;
let hs = 0;

let w = 0;
let h = 0;
let hw = 0;
let hh = 0;

let pointerX = 0;
let pointerY = 0;
let isDragging = false;

let handle1X = 0;
let handle1Y = 0;
const handle1Radius = 20;

function onMouseDown(event: MouseEvent) {
  pointerX = event.clientX * dpr;
  pointerY = event.clientY * dpr;

  isDragging = hypot(pointerX - handle1X, pointerY - handle1Y) < handle1Radius;
}
function onMouseUp() {
  isDragging = false;
}
function onMouseMove(event: MouseEvent) {
  pointerX = event.clientX * dpr;
  pointerY = event.clientY * dpr;

  m.style.cursor =
    hypot(pointerX - handle1X, pointerY - handle1Y) < handle1Radius
      ? 'pointer'
      : 'default';
}

function onTouchStart(event: TouchEvent) {
  pointerX = event.touches[0].clientX * dpr;
  pointerY = event.touches[0].clientY * dpr;

  isDragging = hypot(pointerX - handle1X, pointerY - handle1Y) < handle1Radius;
}
function onTouchEnd() {
  isDragging = false;
}
function onTouchMove(event: TouchEvent) {
  pointerX = event.touches[0].clientX * dpr;
  pointerY = event.touches[0].clientY * dpr;
}

on<MouseEvent>('mousedown', onMouseDown);
on<MouseEvent>('mouseup', onMouseUp);
on<MouseEvent>('mousemove', onMouseMove);

on<TouchEvent>('touchstart', onTouchStart);
on<TouchEvent>('touchend', onTouchEnd);
on<TouchEvent>('touchmove', onTouchMove);

function draw(/* ts: number */) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);
    const { width, height } = c;

    w = width;
    h = height;
    hw = w / 2;
    hh = h / 2;

    graphSize = min(c.width, c.height) * 0.8;
    hs = graphSize / 2;

    handle1X = hw;
    handle1Y = hh;
  }

  if (isDragging) {
    handle1X = lerp(handle1X, pointerX, 0.5);
    handle1Y = lerp(handle1Y, pointerY, 0.5);
  }

  ctx.clearRect(0, 0, c.width, c.height);

  ctx.font = '32px monospace';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#e7e7e7';

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#e7e7e7';

  `pointerX: ${pointerX}\npointerY: ${pointerY}`
    .split('\n')
    .forEach((line, i) => {
      ctx.fillText(line, 10, 10 + i * 38.4);
    });

  ctx.strokeRect(hw - hs, hh - hs, graphSize, graphSize);

  ctx.beginPath();
  ctx.arc(handle1X, handle1Y, handle1Radius, 0, ππ);
  ctx.stroke();
}

rAF(draw);
