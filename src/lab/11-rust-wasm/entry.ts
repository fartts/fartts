import { el } from '../../lib/core/dom';
import { max } from '../../lib/core/math';

import { draw } from './crates/lab-11/Cargo.toml';
import './style.css';

const { devicePixelRatio: dpr } = window;

const c = el('canvas') as HTMLCanvasElement;
const w = 720;
const h = 480;

c.width = w * dpr;
c.height = h * dpr;
c.style.transform = `scale(${max(w / c.width, h / c.height)})`;

const ctx = c.getContext('2d') as CanvasRenderingContext2D;
draw(ctx, c.width, c.height);
