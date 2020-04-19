import './style.css';

import { loop } from './game/loop';

import { on } from './events';

const state = {
  mouseX: 0,
  mouseY: 0,
  mouseDown: false,
};

const create: () => void = () => {
  // console.log('create');
};

const update: (t: number, dt: number) => void = (t, dt) => {
  // console.log('update', t, dt);
};

const render: (ctx: CanvasRenderingContext2D) => void = (ctx) => {
  // console.log('render', ctx);
};

const { isPlaying, start, stop } = loop(create, update, render);

on(window, 'keyup', (event) => {
  if (event.key === ' ') {
    isPlaying() ? stop() : start();
  }
});

on(window, 'mousemove', (event) => {
  state.mouseX = event.clientX;
  state.mouseY = event.clientY;
  state.mouseDown = event.buttons === 1;
});
