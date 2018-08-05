import './main.css';

import { cos, sin, toRadians } from '@fartts/lib/math';

const DEV = 'development';
// const PROD = 'production';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const canvasContext = canvas.getContext('webgl', {
  antialias: false,
}) as WebGLRenderingContext;

const scale = 10;
const width = canvas.clientWidth / scale;
const height = canvas.clientHeight / scale;
// const centerX = width / 2;
// const centerY = height / 2;

canvas.width = width;
canvas.height = height;
canvasContext.clearColor(1, 1, 1, 1);

enum WebGLShaderType {
  Vertex = canvasContext.VERTEX_SHADER,
  Fragment = canvasContext.FRAGMENT_SHADER,
}

function makeShader(
  context: WebGLRenderingContext,
  type: WebGLShaderType,
  source: string,
): WebGLShader {
  const shader = context.createShader(type);

  context.shaderSource(shader, source);
  context.compileShader(shader);

  if (process.env.NODE_ENV === DEV) {
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

  if (process.env.NODE_ENV === DEV) {
    const linkSuccess = context.getProgramParameter(
      program,
      context.LINK_STATUS,
    );

    if (!linkSuccess) {
      throw new Error(
        `program (${program}) failed to compile:\n${context.getShaderInfoLog(
          program,
        )}`,
      );

      context.deleteProgram(program);
    }
  }

  return program as WebGLProgram;
}

const vertShader = makeShader(
  canvasContext,
  WebGLShaderType.Vertex,
  `\
#ifdef GL_ES
precision mediump float;
#endif

attribute vec4 a_position;
varying vec4 v_color;

void main() {
  gl_Position = a_position;
  v_color = gl_Position * 0.5 + 0.5;
}
`,
);

const fragShader = makeShader(
  canvasContext,
  WebGLShaderType.Fragment,
  `\
#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_color;

void main() {

	gl_FragColor = vec4(v_color.xy, 1.0, 1.0);
}
`,
);

const prog = makeProgram(canvasContext, vertShader, fragShader);
const aPosition = canvasContext.getAttribLocation(prog, 'a_position');
const buffer = canvasContext.createBuffer();

canvasContext.viewport(0, 0, width, height);
canvasContext.useProgram(prog);

let a = 0;

function draw(t: number) {
  requestAnimationFrame(draw);

  a = (a + 1) % 360;
  const x = sin(toRadians(a));
  const y = cos(toRadians(a));

  canvasContext.clear(canvasContext.COLOR_BUFFER_BIT);

  canvasContext.bindBuffer(canvasContext.ARRAY_BUFFER, buffer);
  canvasContext.bufferData(
    canvasContext.ARRAY_BUFFER,
    // prettier-ignore
    new Float32Array([
      -0.4 + (x * 0.4), -0.6 + (y * 0.3),
       0.4 + (x * 0.3), -0.4 + (y * 0.4),
      -0.1 + (x * 0.2),  0.7 + (y * 0.2),
    ]),
    canvasContext.DYNAMIC_DRAW,
  );

  canvasContext.enableVertexAttribArray(aPosition);
  canvasContext.bindBuffer(canvasContext.ARRAY_BUFFER, buffer);
  canvasContext.vertexAttribPointer(
    aPosition,
    2,
    canvasContext.FLOAT,
    false,
    0,
    0,
  );

  canvasContext.drawArrays(canvasContext.TRIANGLES, 0, 3);
}

requestAnimationFrame(draw);
