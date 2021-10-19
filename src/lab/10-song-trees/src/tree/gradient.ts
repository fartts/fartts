import { atan2, hypot, toDegrees, round, π } from '../../../../lib/core/math';
import { sawWave, sinWave, WaveFunction } from '../../../../lib/core/wave';
import Branch from './constants/branch';

let sWave: WaveFunction;
let lWave: WaveFunction;

function hsla(h: number, s: number, l: number, a: number) {
  return `hsla(${h},${s}%,${l}%,${a})`;
}

const memo: { [k: string]: CanvasGradient } = {};

export function gradient(
  context: CanvasRenderingContext2D,
  { startX, startY, endX, endY, lineWidth, iteration }: Branch,
  maxIterations: number,
): CanvasGradient {
  if (sWave === undefined) {
    sWave = sawWave(maxIterations + 1, 100, 50);
  }

  if (lWave === undefined) {
    lWave = sinWave(maxIterations + 1, 20, 50);
  }

  const radians = atan2(endY - startY, endX - startX) + π;
  const degrees = round(toDegrees(radians));
  const key = `${degrees}:${iteration}`;

  if (!memo[key]) {
    const prev = hsla(degrees, sWave(iteration + 1), lWave(iteration + 1), 1);
    const color = hsla(degrees, sWave(iteration), lWave(iteration), 1);

    const length = hypot(endX - startX, endY - startY);
    const stop = lineWidth / 2 / length;

    const g = context.createRadialGradient(
      startX,
      startY,
      lineWidth / 2,
      startX,
      startY,
      length,
    );

    g.addColorStop(0, prev);
    g.addColorStop(stop, color);

    memo[key] = g;
  }

  return memo[key];
}
