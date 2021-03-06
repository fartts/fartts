import { el, rAF, on } from '../../../lib/core/dom';
import { min, ππ, hypot, lerp, max, abs } from '../../../lib/core/math';

import { resize, shouldResize } from './resize';

import './style.css';

const { devicePixelRatio: dpr } = window;

const m = el('main') as HTMLElement;
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

interface Handle {
  ox: number;
  oy: number;
  x: number;
  y: number;
  sx: number;
  sy: number;
  isDragging: boolean;
}

const handles: Handle[] = [
  {
    ox: 0,
    oy: 0,
    x: 0,
    y: 0,
    sx: 0,
    sy: 0,
    isDragging: false,
  },
  {
    ox: 0,
    oy: 0,
    x: 0,
    y: 0,
    sx: 0,
    sy: 0,
    isDragging: false,
  },
];

const handleRadius = 30;

function onMouseDown(event: MouseEvent) {
  pointerX = event.clientX * dpr;
  pointerY = event.clientY * dpr;

  handles.forEach((handle) => {
    handle.isDragging =
      hypot(pointerX - handle.x, pointerY - handle.y) < handleRadius;
  });
}

function onMouseUp() {
  handles.forEach((handle) => {
    handle.isDragging = false;
  });
}

function onMouseMove(event: MouseEvent) {
  pointerX = event.clientX * dpr;
  pointerY = event.clientY * dpr;

  m.style.cursor = handles.some(
    (handle) => hypot(pointerX - handle.x, pointerY - handle.y) < handleRadius,
  )
    ? 'pointer'
    : 'default';
}

function onTouchStart(event: TouchEvent) {
  pointerX = event.touches[0].clientX * dpr;
  pointerY = event.touches[0].clientY * dpr;

  handles.forEach((handle) => {
    handle.isDragging =
      hypot(pointerX - handle.x, pointerY - handle.y) < handleRadius;
  });
}

function onTouchEnd() {
  handles.forEach((handle) => {
    handle.isDragging = false;
  });
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

function drawShadow() {
  ctx.strokeStyle = 'hsl(0,0%,40%)';
  ctx.strokeRect(hw, hh - hs, graphSize, graphSize);

  handles.forEach((handle) => {
    ctx.beginPath();
    ctx.arc(handle.sx, handle.sy, handleRadius, 0, ππ);
    ctx.moveTo(hw + abs(hw - handle.ox), handle.oy);
    ctx.lineTo(handle.sx, handle.sy);
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.moveTo(hw + abs(hw - handles[0].ox), handles[0].oy);
  ctx.bezierCurveTo(
    handles[0].sx,
    handles[0].sy,
    handles[1].sx,
    handles[1].sy,
    handles[1].ox,
    handles[1].oy,
  );
  ctx.stroke();
}

function drawGraph() {
  ctx.strokeStyle = 'hsl(0,0%,90%)';
  ctx.strokeRect(hw - graphSize, hh - hs, graphSize, graphSize);

  handles.forEach((handle) => {
    if (handle.isDragging) {
      handle.x = min(max(hw - graphSize, lerp(handle.x, pointerX, 0.5)), hw);
      handle.y = lerp(handle.y, pointerY, 0.5);

      handle.sx = hw + abs(hw - handle.x);
      handle.sy = handle.oy + handle.oy - handle.y;
    }

    ctx.beginPath();
    ctx.arc(handle.x, handle.y, handleRadius, 0, ππ);
    ctx.moveTo(handle.ox, handle.oy);
    ctx.lineTo(handle.x, handle.y);
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.moveTo(handles[0].ox, handles[0].oy);
  ctx.bezierCurveTo(
    handles[0].x,
    handles[0].y,
    handles[1].x,
    handles[1].y,
    handles[1].ox,
    handles[1].oy,
  );
  ctx.stroke();
}

function draw(/* ts: number */) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);
    const { width, height } = c;

    w = width;
    h = height;
    hw = w / 2;
    hh = h / 2;

    graphSize = min(c.width, c.height) * 0.4;
    hs = graphSize / 2;

    handles.forEach((handle, i) => {
      handle.x = hw - hs;
      handle.y = hh + hs - graphSize * i;
    });

    handles[0].ox = hw - graphSize;
    handles[0].oy = hh + hs;

    handles[1].ox = hw;
    handles[1].oy = hh - hs;

    handles.forEach((handle) => {
      handle.sx = hw + abs(hw - handle.x);
      handle.sy = handle.oy + handle.oy - handle.y;
    });
  }

  ctx.clearRect(0, 0, c.width, c.height);

  ctx.lineWidth = 3;
  drawShadow();
  drawGraph();
}

rAF(draw);
