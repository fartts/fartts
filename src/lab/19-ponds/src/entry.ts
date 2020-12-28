import { min, ππ } from '../../../lib/core/math';
import './style.css';

const el = <T extends keyof HTMLElementTagNameMap>(
  selector: T,
): HTMLElementTagNameMap[T] =>
  document.querySelector(selector) ?? document.createElement(selector);

const canvas = el('canvas');
const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error(`Expected \`CanvasRenderingContext2D\` but got ${ctx}`);
}

const size = 800;
canvas.width = canvas.height = size;
const { width: w, height: h } = canvas;

const hw = w / 2;
const hh = h / 2;

const r = min(hw, hh) * 0.8;
const line = size * 0.025;
const circ = ππ * r;
const dash = circ / 30;

ctx.fillStyle = 'hsl(100, 40%, 60%)';
ctx.fillRect(0, 0, w, h);

ctx.strokeStyle = 'hsl(50, 10%, 90%)';
ctx.lineWidth = line;
ctx.setLineDash([dash * (17 / 32), dash * (15 / 32)]);

ctx.beginPath();
ctx.arc(hw, hh, r, 0, ππ);
ctx.closePath();
ctx.stroke();
