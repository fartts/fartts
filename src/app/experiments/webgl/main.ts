import './main.css';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const canvasContext = canvas.getContext('webgl') as WebGLRenderingContext;

const scale = 5;
const width = canvas.clientWidth / scale;
const height = canvas.clientHeight / scale;
const centerX = width / 2;
const centerY = height / 2;

canvas.width = width;
canvas.height = height;

console.log(canvasContext, centerX, centerY); // tslint:disable-line no-console

enum WebGLShaderType {
  Vertex = canvasContext.VERTEX_SHADER,
  Fragment = canvasContext.FRAGMENT_SHADER,
}

function compileShader(
  context: WebGLRenderingContext,
  type: WebGLShaderType,
  source: string,
): WebGLShader | null {
  const shader = context.createShader(type);
  context.shaderSource(shader, source);
  context.compileShader(shader);
  return shader;
}
