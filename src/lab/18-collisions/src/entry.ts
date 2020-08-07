import { max } from '../../../lib/core/math';
import { vec2 } from '../../../lib/vec';

import { on } from './events';

import { create } from './game/create';
import { render } from './game/render';

import { env, handleResize } from './util/env';
import { loop } from './util/loop';
import { state } from './util/state';
import {
  addv,
  copy,
  poiv,
  size,
  subv,
  Vec2,
  muls,
  perp,
  nrml,
  dotp,
} from './util/vec2';

import './style.css';

/**
 * trying to figure out point-line, and eventually circle-line collision with
 * Verlet integration ... it sorta works, but the point slides through joints
 * and the collision response isn't right
 *
 * @param t - time (ms since loop start)
 * @param dt - delta time (fixed, 60 / 1_000)
 *
 * @see https://ericleong.me/research/circle-line/
 * @see https://www.metanetsoftware.com/technique/tutorialA.html
 */
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
    // this is: `[bound: Line, proj: Line, poi: Vec2]`
    const [[a, b], [c, d], i] = state.intersections[0];

    // a.k.a. `cvel`
    const v = subv(d, c);
    // normal vector to the collided bound
    const n = nrml(perp(subv(b, a)));

    // penetration percent (0 - 1)
    const pens = size(subv(d, i)) / size(v);

    /**
     * reflected position
     *
     * @see https://math.stackexchange.com/a/13263
     * @see https://math.stackexchange.com/a/3340378
     * @see https://gamedev.stackexchange.com/a/113394
     * @see https://gamedev.stackexchange.com/a/23674
     */
    const rpos = addv(i, muls(subv(v, muls(n, 2 * dotp(v, n))), 1 - pens));

    // make previous position the point of impact
    player.ppos = copy(i);

    // the new current position is the reflected position
    player.cpos = rpos;

    // // for debugging in the renderer
    // player.cpos = copy(i);
  } else {
    player.ppos = copy(player.cpos);
    player.cpos = copy(npos);
  }

  // if (state.intersections.length) {
  //   stop();
  // }
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
