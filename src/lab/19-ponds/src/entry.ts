import { ceil, floor, min, random, ππ } from '../../../lib/core/math';
import { el, on } from './dom-utils';
import { gridRect, roundRect } from './drawing-utils';
import './style.css';
import type { AppState } from './types';

const canvas = el('canvas');
const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error(`Expected \`CanvasRenderingContext2D\` but got ${ctx}`);
}

const resize = () => {
  const { innerWidth, innerHeight } = window;
  const doubleWidth = ceil(innerWidth * 2);
  const doubleHeight = ceil(innerHeight * 2);

  canvas.width = doubleWidth;
  canvas.height = doubleHeight;
  canvas.style.width = `${doubleWidth}px`;
  canvas.style.height = `${doubleHeight}px`;
  canvas.style.transform = 'scale(0.5)';

  draw();
};

/**
 * ```
 * ∙ ╭ ─ ─ ╮ ∙
 * ╭ ╯ ∙ ∙ ╰ ╮
 * │ ∙ ╭ ╮ ∙ │
 * │ ∙ ╰ ╯ ∙ │
 * ╰ ╮ ∙ ∙ ╭ ╯
 * ∙ ╰ ─ ─ ╯ ∙
 * ```
 */
const allowedNeighbors: {
  [k: string]: {
    up: string;
    right: string;
    down: string;
    left: string;
  };
} = {
  '╭': {
    up: '∙─╯╰',
    right: '─╮╯',
    down: '│╯╰',
    left: '∙│╯╮',
  },
  '╮': {
    up: '∙─╯╰',
    right: '∙│╭╰',
    down: '│╯╰',
    left: '╭╰─',
  },
  '╯': {
    up: '│╮╭',
    right: '∙│╭╰',
    down: '∙─╮╭',
    left: '╭╰─',
  },
  '╰': {
    up: '│╮╭',
    right: '─╮╯',
    down: '∙─╮╭',
    left: '∙│╯╮',
  },
  '│': {
    up: '│╮╭',
    right: '∙│╭╰',
    down: '│╯╰',
    left: '∙│╯╮',
  },
  '─': {
    up: '∙─╯╰',
    right: '─╮╯',
    down: '∙─╮╭',
    left: '╭╰─',
  },
  '∙': {
    up: '∙─╯╰',
    right: '∙│╭╰',
    down: '∙─╮╭',
    left: '∙│╯╮',
  },
};

const chance = (n: number) => random() < n;

const k = 10;
const neighbors: string[][] = [];
for (let i = 0; i < k; ++i) {
  neighbors[i] = [];
  for (let j = 0; j < k; ++j) {
    neighbors[i][j] =
      i === 0 || j === 0 || i === k - 1 || j === k - 1 ? '∙' : '';
  }
}

for (let i = 1; i < k - 1; ++i) {
  for (let j = 1; j < k - 1; ++j) {
    const neighborUp = neighbors[i - 1]?.[j];
    const neighborRight = neighbors[i][j + 1];
    const neighborDown = neighbors[i + 1]?.[j];
    const neighborLeft = neighbors[i][j - 1];

    /**
     * this might be kind of confusing to future me, but I'm using "downward
     * neighbor" to get the "upward constraint" and so on, because this is
     * working top to bottom and left to right it's mostly downward and right-
     * ward constraints
     */
    const allowedUp = allowedNeighbors[neighborDown]?.up ?? '';
    const allowedRight = allowedNeighbors[neighborLeft]?.right ?? '';
    const allowedDown = allowedNeighbors[neighborUp]?.down ?? '';
    const allowedLeft = allowedNeighbors[neighborRight]?.left ?? '';

    const n = (allowedUp + allowedRight + allowedDown + allowedLeft)
      .split('')
      .filter(
        (c) =>
          // only check for includes if the constraint is a non-empty string
          (allowedUp !== '' ? allowedUp.includes(c) : true) &&
          (allowedRight !== '' ? allowedRight.includes(c) : true) &&
          (allowedDown !== '' ? allowedDown.includes(c) : true) &&
          (allowedLeft !== '' ? allowedLeft.includes(c) : true),
      )
      .join('');

    // prefer empty spaces as neighbors to straight lines
    if (
      (neighborRight === '│' ||
        neighborLeft === '│' ||
        neighborUp === '─' ||
        neighborDown === '─') &&
      n.includes('∙')
    ) {
      if (chance(7 / 10)) {
        neighbors[i][j] = '∙';
        continue;
      }
    }

    // prefer empty spaces as neighbors to empty spaces
    if (
      (neighborRight === '∙' ||
        neighborLeft === '∙' ||
        neighborUp === '∙' ||
        neighborDown === '∙') &&
      n.includes('∙')
    ) {
      if (chance(7 / 10)) {
        neighbors[i][j] = '∙';
        continue;
      }
    }

    // prefer continuing vertical lines
    if ((neighborUp === '│' || neighborDown === '│') && n.includes('│')) {
      if (chance(5 / 10)) {
        neighbors[i][j] = '│';
        continue;
      }
    }

    // prefer continuing horizontal lines
    if ((neighborRight === '─' || neighborLeft === '─') && n.includes('─')) {
      if (chance(5 / 10)) {
        neighbors[i][j] = '─';
        continue;
      }
    }

    neighbors[i][j] = n.charAt(floor(random() * n.length));
  }
}

console.log(neighbors.map((row) => row.join(' ')).join('\n'));

const getState = (): AppState => {
  const { width: canvasWidth, height: canvasHeight } = canvas;

  const safeWidth = canvasWidth * 0.8;
  const safeHeight = canvasHeight * 0.8;

  const halfWidth = canvasWidth / 2;
  const halfHeight = canvasHeight / 2;

  const r = min(halfWidth, halfHeight) * 0.2;
  const step = r;

  const rectWidth = floor(safeWidth / step) * step;
  const rectHeight = floor(safeHeight / step) * step;

  const lineWidth = min(rectWidth, rectHeight) * 0.025;
  const C = ππ * r + (rectWidth - r * 2) * 2 + (rectHeight - r * 2) * 2;
  const dash = C / 38;

  return {
    ctx,
    canvasWidth,
    canvasHeight,
    safeWidth,
    safeHeight,
    halfWidth,
    halfHeight,
    r,
    step,
    rectWidth,
    rectHeight,
    lineWidth,
    C,
    dash,
  };
};

const bkgd = ({ ctx, canvasWidth, canvasHeight }: AppState) => {
  ctx.fillStyle = 'hsl(100, 40%, 60%)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const pond = (state: AppState) => {
  const {
    ctx,
    halfWidth,
    halfHeight,
    rectWidth,
    rectHeight,
    lineWidth,
    dash,
    step,
    r,
  } = state;

  ctx.strokeStyle = 'hsl(50, 10%, 90%)';
  ctx.lineWidth = lineWidth;

  ctx.setLineDash([dash * (17 / 32), dash * (15 / 32)]);
  roundRect(
    state,
    halfWidth - rectWidth / 2,
    halfHeight - rectHeight / 2,
    rectWidth,
    rectHeight,
    r,
  );
  ctx.stroke();

  const C = ππ * step;
  ctx.setLineDash([(C / 8) * (17 / 32), (C / 8) * (15 / 32)]);
  roundRect(state, halfWidth - step, halfHeight - step, step * 2, step * 2, r);
  ctx.stroke();
};

const grid = (state: AppState) => {
  const { ctx, halfWidth, halfHeight, rectWidth, rectHeight, step } = state;

  ctx.strokeStyle = 'hsl(0, 0%, 20%)';
  ctx.lineWidth = 1;

  ctx.setLineDash([]);
  gridRect(
    state,
    halfWidth - rectWidth / 2,
    halfHeight - rectHeight / 2,
    rectWidth,
    rectHeight,
    step,
  );
  ctx.stroke();
};

const draw = () => {
  const state = getState();
  bkgd(state);
  pond(state);
  grid(state);
};

on(window, 'resize', resize);
resize();
