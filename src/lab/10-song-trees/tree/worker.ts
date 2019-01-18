import {
  π,
  randomRange,
  cos,
  sin,
  random,
  lerp,
  round,
} from '../../../lib/core/math';

import { Branch, Collar, Config, maxIterations, Root } from './constants';

function branch({ x, y, angle, length, iteration }: Collar): Branch {
  return {
    startX: x,
    startY: y,
    endX: x + cos(angle) * length,
    endY: y + sin(angle) * length,
    lineWidth: length * 0.1,
    iteration,
  };
}

function* branches(c: Collar, config: Config): IterableIterator<Branch> {
  const b = branch(c);
  yield b;

  if (c.iteration - 1 > 0) {
    const a = config.a();
    const l = config.l();
    const n = config.n();

    const nextCollar = {
      x: b.endX,
      y: b.endY,
      length: c.length * l,
      iteration: c.iteration - 1,
    };

    for (let i = 0; i <= n; ++i) {
      if (random() < 0.8) {
        yield* branches(
          {
            ...nextCollar,
            angle: c.angle + lerp(-a, a, i / n),
          },
          config,
        );
      }
    }
  }
}

function tree(root: Root): [Root, Branch[]] {
  const n = round(randomRange(1, 1));

  const angle = π * 1.5 + randomRange(-0.2, 0.2);
  const iteration = maxIterations / n;
  const length = root.length / n;

  let b: Branch[] = [];
  while (b.length < 1000) {
    b = Array.from(
      branches(
        { ...root, angle, length, iteration },
        {
          a: () => randomRange(0.2, 0.4) * n,
          l: () => randomRange(0.7, 0.9) / n,
          n: () => n,
        },
      ),
    );
  }

  return [root, b.sort(({ iteration: i1 }, { iteration: i2 }) => i2 - i1)];
}

addEventListener('message', ({ data }) => {
  postMessage(tree(data));
});
