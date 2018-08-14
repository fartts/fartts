import './main.css';

const c = document.querySelector('canvas') as HTMLCanvasElement;
const gl = c.getContext('webgl', {
  antialias: false,
}) as WebGLRenderingContext;

gl.clearColor(0, 0, 0, 1);
