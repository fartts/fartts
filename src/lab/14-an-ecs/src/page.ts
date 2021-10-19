import { el } from '../../../lib/core/dom';

export const m = el('main') as HTMLElement;
export const c = el('canvas') as HTMLCanvasElement;
export const ctx = c.getContext('2d') as CanvasRenderingContext2D;
