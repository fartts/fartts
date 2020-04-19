import './style.css';

import { env, handleResize } from './game/env';
import { loop } from './game/loop';

import { on } from './events';
import { lerp, random, ππ } from '../../../lib/core/math';

interface Vec2 {
  x: number;
  y: number;
}

interface State {
  mouseX: number;
  mouseY: number;
  mouseDown: boolean;
  keys: string[];

  world: {
    lines: [Vec2, Vec2][];
  };
}

const vec2: (x: number, y: number) => Vec2 = (x, y) => ({ x, y });

const state: State = {
  mouseX: 0,
  mouseY: 0,
  mouseDown: false,
  keys: [],

  world: {
    lines: [],
  },
};

const rng: (a: number, b: number) => number = (a, b) => lerp(a, b, random());

const create: () => void = () => {
  const { width, height } = env.canvas;

  const top = () => rng(height * 0.1, height * 0.2);
  const right = () => rng(width * 0.8, width * 0.9);
  const bottom = () => rng(height * 0.8, height * 0.9);
  const left = () => rng(width * 0.1, width * 0.2);

  const lt = vec2(left(), top());
  const lb = vec2(left(), bottom());
  const rb = vec2(right(), bottom());
  const rt = vec2(right(), top());

  state.world.lines.push([lt, lb]);
  state.world.lines.push([lb, rb]);
  state.world.lines.push([rb, rt]);
  state.world.lines.push([rt, lt]);
};

const update: (t: number, dt: number) => void = (t, dt) => {
  // console.log('update', t, dt);
};

const render: (ctx: CanvasRenderingContext2D) => void = (ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.beginPath();
  state.world.lines.forEach(([a, b]) => {
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  });
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(state.mouseX, state.mouseY, 10, 10, 0, 0, ππ);
  ctx.stroke();
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
  state.mouseX = event.clientX;
  state.mouseY = event.clientY;
  state.mouseDown = event.buttons > 0;
});

handleResize();
start();
