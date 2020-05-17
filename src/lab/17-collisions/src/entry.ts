import './style.css';

import { max } from '../../../lib/core/math';
import { vec2 } from '../../../lib/vec';

import { on } from './events';
import { create } from './game/create';
import { render } from './game/render';
import { update } from './game/update';
import { env, handleResize } from './util/env';
import { loop } from './util/loop';
import { state } from './util/state';

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
