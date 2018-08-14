import './main.css';

import { cos, sin, toRadians } from '@fartts/lib/math';

import frag from './shader.frag';
import vert from './shader.vert';

const c = document.querySelector('canvas') as HTMLCanvasElement;
const gl = c.getContext('webgl', {
  antialias: false,
}) as WebGLRenderingContext;

gl.clearColor(0, 0, 0, 1);

enum WebGLShaderType {
  Vertex = gl.VERTEX_SHADER,
  Fragment = gl.FRAGMENT_SHADER,
}

function makeShader(
  context: WebGLRenderingContext,
  type: WebGLShaderType,
  source: string,
): WebGLShader {
  const shader = context.createShader(type);

  context.shaderSource(shader, source);
  context.compileShader(shader);

  if (process.env.NODE_ENV === 'development') {
    const compileSuccess = context.getShaderParameter(
      shader,
      context.COMPILE_STATUS,
    );

    if (!compileSuccess) {
      throw new Error(
        `shader (${shader}) failed to compile:\n${context.getShaderInfoLog(
          shader,
        )}`,
      );

      context.deleteShader(shader);
    }
  }

  return shader as WebGLShader;
}

function makeProgram(
  context: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram {
  const program = context.createProgram();

  context.attachShader(program, vertexShader);
  context.attachShader(program, fragmentShader);

  context.linkProgram(program);

  if (process.env.NODE_ENV === 'development') {
    const linkSuccess = context.getProgramParameter(
      program,
      context.LINK_STATUS,
    );

    if (!linkSuccess) {
      throw new Error(
        `program (${program}) failed to link:\n${context.getProgramInfoLog(
          program,
        )}`,
      );

      context.deleteProgram(program);
    }
  }

  return program as WebGLProgram;
}

const vertShader = makeShader(gl, WebGLShaderType.Vertex, vert);
const fragShader = makeShader(gl, WebGLShaderType.Fragment, frag);
const prog = makeProgram(gl, vertShader, fragShader);

const aPosition = gl.getAttribLocation(prog, 'a_position');
const buffer = gl.createBuffer();

let a = 0;
let didResize = false;

function draw(t: number) {
  requestAnimationFrame(draw);

  if (didResize) {
    const { innerHeight: height, innerWidth: width } = window;

    const scale = 0.1;

    c.width = width * scale;
    c.height = height * scale;
    gl.viewport(0, 0, c.width, c.height);

    c.style.width = `${width}px`;
    c.style.height = `${height}px`;

    didResize = false;
  }

  a = (a + 1) % 360;
  const x = sin(toRadians(a));
  const y = cos(toRadians(a));

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    // prettier-ignore
    new Float32Array([
       0.4 + (x * 0.4),  0.6 + (y * 0.3),
      -0.4 + (x * 0.3),  0.4 + (y * 0.4),
       0.1 + (x * 0.2), -0.7 + (y * 0.2),
    ]),
    gl.DYNAMIC_DRAW,
  );

  gl.enableVertexAttribArray(aPosition);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function onResize(/* event: Event */): void {
  didResize = true;
}

window.addEventListener('resize', onResize);
window.dispatchEvent(new Event('resize'));

requestAnimationFrame(draw);
