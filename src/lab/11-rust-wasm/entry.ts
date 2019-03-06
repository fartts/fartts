import { el } from '../../lib/core/dom';
import { max } from '../../lib/core/math';

import './style.css';

const { devicePixelRatio: dpr } = window;

const c = el('canvas') as HTMLCanvasElement;

c.width = 720 * dpr;
c.height = 480 * dpr;
c.style.transform = `scale(${max(720 / c.width, 480 / c.height)})`;

const ctx = c.getContext('2d') as CanvasRenderingContext2D;
console.log(ctx); // tslint:disable-line
