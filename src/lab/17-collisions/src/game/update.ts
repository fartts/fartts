import { state } from '../util/state';
import { addv, copy, muls, poiv, size, subv, Vec2 } from '../util/vec2';

export const update: (t: number, dt: number) => void = (t, dt) => {
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
