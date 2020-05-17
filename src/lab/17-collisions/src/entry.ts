import './style.css';

import { max, ππ } from '../../../lib/core/math';

import { on } from './events';
import { env, handleResize } from './game/env';
import { loop } from './game/loop';
import { Vec2 } from './types';
import {
  vec2,
  copy,
  addv,
  subv,
  muls,
  size,
  poiv,
  particle,
  state,
  rng,
} from './utils';

const create: () => void = () => {
  const { width, height } = env.canvas;

  const top = () => rng(height * 0.1, height * 0.2);
  const right = () => rng(width * 0.8, width * 0.9);
  const bottom = () => rng(height * 0.8, height * 0.9);
  const bottomMiddle = () => rng(height * 0.6, height * 0.8);
  const left = () => rng(width * 0.1, width * 0.2);

  const lt = vec2(left(), top());
  const ct = vec2((left() + right()) * 0.5, top());
  const rt = vec2(right(), top());
  const rc = vec2(right(), (top() + bottom()) * 0.5);
  const rb = vec2(right(), bottom());
  const cb = vec2((left() + right()) * 0.333, bottomMiddle());
  const lb = vec2(left(), bottom());
  const lc = vec2(left(), (top() + bottom()) * 0.5);

  state.bounds = [
    [lt, ct],
    [ct, rt],
    [rt, rc],
    [rc, rb],
    [rb, cb],
    [cb, lb],
    [lb, lc],
    [lc, lt],
  ];
  state.mouse = particle(width * 0.5, height * 0.5);
  state.player = particle(width * 0.5, height * 0.5);
};

const update: (t: number, dt: number) => void = (t, dt) => {
  // const { width, height } = env.canvas;
  const { /* mouse, */ bounds, gravity, player } = state;

  const cvel = addv(subv(player.cpos, player.ppos), gravity);
  let npos = addv(player.cpos, cvel);

  // const line: [Vec2, Vec2] = [vec2(width * 0.5, height * 0.5), mouse.cpos];
  const line: [Vec2, Vec2] = [player.ppos, npos];
  state.intersections = bounds.reduce<Vec2[]>((acc, [a, b]) => {
    const i = poiv([a, b], line);
    return isNaN(i.x) || isNaN(i.y) ? acc : acc.concat(i);
  }, []);

  if (state.intersections.length) {
    const pen =
      size(subv(state.intersections[0], player.ppos)) /
      size(subv(npos, player.ppos));
    npos = addv(player.cpos, muls(cvel, 1 - pen));
    stop();
  }

  player.ppos = copy(player.cpos);
  player.cpos = copy(npos);
};

const render: (ctx: CanvasRenderingContext2D) => void = (ctx) => {
  const { width, height } = env.canvas;
  const { mouse, mouseDown, bounds, intersections, player } = state;

  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = 'black';
  bounds.forEach(([a, b]) => {
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  });
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = 'black';
  ctx.ellipse(player.cpos.x, player.cpos.y, 13, 13, 0, 0, ππ);
  mouseDown ? ctx.fill() : ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(player.ppos.x, player.ppos.y);
  ctx.lineTo(player.cpos.x, player.cpos.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = 'blue';
  ctx.ellipse(mouse.cpos.x, mouse.cpos.y, 8, 8, 0, 0, ππ);
  mouseDown ? ctx.fill() : ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = 'red';
  ctx.ellipse(mouse.ppos.x, mouse.ppos.y, 5, 5, 0, 0, ππ);
  mouseDown ? ctx.fill() : ctx.stroke();

  ctx.strokeStyle = ctx.fillStyle = 'green';
  intersections.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.moveTo(x - 3, y - 3);
    ctx.lineTo(x + 3, y + 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - 3, y + 3);
    ctx.lineTo(x + 3, y - 3);
    ctx.stroke();
  });
};

const { isPlaying, start, stop } = loop(create, update, render);

on(window, 'keyup', (event) => {
  if (event.key === ' ') {
    isPlaying() ? stop() : start();

    // tslint:disable-next-line:no-console
    console.log(isPlaying() ? 'started' : 'stopped');
  }
});

on(window, 'mousemove', (event) => {
  const { clientWidth, clientHeight } = env.main;
  const { width, height } = env.canvas;
  const scale = max(clientWidth / width, clientHeight / height);

  state.mouse.ppos = vec2(state.mouse.cpos.x, state.mouse.cpos.y);
  state.mouse.cpos = vec2(event.clientX / scale, event.clientY / scale);
});

on(window, 'mousedown', () => {
  state.mouseDown = true;
});

on(window, 'mouseup', () => {
  state.mouseDown = false;
});

handleResize();
start();
