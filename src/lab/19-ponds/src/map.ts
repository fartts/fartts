import { floor, random } from '../../../lib/core/math';

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

export const generate = (cols: number, rows: number): string[][] => {
  const cells: string[][] = [];

  for (let i = 0; i < rows; ++i) {
    cells[i] = [];
    for (let j = 0; j < cols; ++j) {
      cells[i][j] =
        i === 0 || j === 0 || i === rows - 1 || j === cols - 1 ? '∙' : '';
    }
  }

  for (let i = 1; i < rows - 1; ++i) {
    for (let j = 1; j < cols - 1; ++j) {
      const neighborUp = cells[i - 1]?.[j];
      const neighborRight = cells[i][j + 1];
      const neighborDown = cells[i + 1]?.[j];
      const neighborLeft = cells[i][j - 1];

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

      const allowedCells = (
        allowedUp +
        allowedRight +
        allowedDown +
        allowedLeft
      )
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
        allowedCells.includes('∙')
      ) {
        if (chance(7 / 10)) {
          cells[i][j] = '∙';
          continue;
        }
      }

      // prefer empty spaces as neighbors to empty spaces
      if (
        (neighborRight === '∙' ||
          neighborLeft === '∙' ||
          neighborUp === '∙' ||
          neighborDown === '∙') &&
        allowedCells.includes('∙')
      ) {
        if (chance(7 / 10)) {
          cells[i][j] = '∙';
          continue;
        }
      }

      // prefer continuing vertical lines
      if (
        (neighborUp === '│' || neighborDown === '│') &&
        allowedCells.includes('│')
      ) {
        if (chance(5 / 10)) {
          cells[i][j] = '│';
          continue;
        }
      }

      // prefer continuing horizontal lines
      if (
        (neighborRight === '─' || neighborLeft === '─') &&
        allowedCells.includes('─')
      ) {
        if (chance(5 / 10)) {
          cells[i][j] = '─';
          continue;
        }
      }

      cells[i][j] = allowedCells.charAt(floor(random() * allowedCells.length));
    }
  }

  return cells;
};
