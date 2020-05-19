import { max } from '../../../lib/core/math';
import { vec2 } from '../../../lib/vec';

import { on } from './events';
import { create } from './game/create';
import { render } from './game/render';
import { env, handleResize } from './util/env';
import { loop } from './util/loop';
import { state } from './util/state';
import { addv, copy, muls, poiv, size, subv, Vec2 } from './util/vec2';

import './style.css';

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

  state.mouse.ppos = copy(state.mouse.cpos);
  state.mouse.cpos = vec2(
    (event.clientX - env.main.offsetLeft) / scale,
    (event.clientY - env.main.offsetTop) / scale,
  );
});

on(window, 'mousedown', () => {
  state.mouseDown = true;
});

on(window, 'mouseup', () => {
  state.mouseDown = false;
});

handleResize();
start();
