import { π, cos, sin, lerp } from '../../../../lib/core/math';
import { randomRange, random } from '../../../../lib/core/rand';

import Branch from './constants/branch';
import Collar from './constants/collar';
import Config from './constants/config';
import Root from './constants/root';

let maxIterations = 0;

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
      if (random() < 0.85) {
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
  // const n = round(randomRange(1, 1));

  const angle = π * 1.5 + randomRange(-0.2, 0.2);
  const iteration = maxIterations /*  / n */;
  const length = root.length /*  / n */;

  const b = Array.from(
    branches(
      { ...root, angle, length, iteration },
      {
        a: () => randomRange(0.2, 0.4) /* * n */,
        l: () => randomRange(0.7, 0.9) /*  / n */,
        n: () => 1,
      },
    ),
  );

  return b.length < 5
    ? tree(root) // this tree's too scrimpy, make another
    : [root, b.sort(({ iteration: i1 }, { iteration: i2 }) => i2 - i1)];
}

addEventListener('message', ({ data: { root, iterations } }) => {
  if (maxIterations !== iterations) {
    maxIterations = iterations;
  }

  postMessage(tree(root));
});
