import { max } from '../../../lib/core/math';
import { vec2 } from '../../../lib/vec';

import { on } from './events';

import { create } from './game/create';
import { render } from './game/render';

import { env, handleResize } from './util/env';
import { loop } from './util/loop';
import { state } from './util/state';
import { addv, copy, poiv, size, subv, Vec2 } from './util/vec2';

import './style.css';

const update: (t: number, dt: number) => void = (t, dt) => {
  // const { width, height } = env.canvas;
  const { /* mouse, */ bounds, gravity, player } = state;

  const cvel = addv(subv(player.cpos, player.ppos), gravity);
  const npos = addv(player.cpos, cvel);

  // const move: [Vec2, Vec2] = [vec2(width * 0.5, height * 0.5), mouse.cpos];
  const proj: [Vec2, Vec2] = [player.cpos, npos];
  state.intersections = bounds.reduce<[[Vec2, Vec2], [Vec2, Vec2], Vec2][]>(
    (acc, line) => {
      const ipos = poiv(line, proj);
      if (!(isNaN(ipos.x) || isNaN(ipos.y))) {
        acc.push([line, proj, ipos]);
      }

      // const jpos = poiv(line, move);
      // if (!(isNaN(jpos.x) || isNaN(jpos.y))) {
      //   acc.push([line, move, jpos]);
      // }

      return acc;
    },
    [],
  );

  if (state.intersections.length) {
    const [a, , ipos] = state.intersections[0];

    const pens = size(subv(npos, ipos)) / size(subv(npos, player.cpos));
    console.log(pens, size(subv(a[0], ipos)), size(subv(a[1], ipos)));

    // const pen = size(subv(ipos, player.ppos)) / size(subv(npos, player.ppos));
    // npos = addv(player.cpos, muls(cvel, -pen));

    player.ppos = copy(ipos);
    player.cpos = copy(ipos);
  } else {
    player.ppos = copy(player.cpos);
    player.cpos = copy(npos);
  }

  if (state.intersections.length) {
    // stop();
  }
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
