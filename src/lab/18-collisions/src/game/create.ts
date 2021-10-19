import { env } from '../util/env';
import { rng } from '../util/math';
import { particle } from '../util/particle';
import { state } from '../util/state';
import { vec2 } from '../util/vec2';

export const create: () => void = () => {
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
