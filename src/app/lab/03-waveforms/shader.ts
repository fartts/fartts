export function validate(
  gl: WebGLRenderingContext,
  shader: WebGLShader | null,
): void {
  const {
    COMPILE_STATUS,
    getShaderParameter,
    getShaderInfoLog,
    deleteShader,
  } = gl;
  const success = getShaderParameter(shader, COMPILE_STATUS);

  if (!success) {
    throw new Error(
      `shader ${shader} failed to compile:\n${getShaderInfoLog(shader)}`,
    );

    deleteShader(shader);
  }
}

export function compile(
  gl: WebGLRenderingContext,
  type:
    | WebGLRenderingContext['VERTEX_SHADER']
    | WebGLRenderingContext['FRAGMENT_SHADER'],
  source: string,
): WebGLShader {
  const { createShader, shaderSource, compileShader } = gl;
  const shader = createShader(type);

  shaderSource(shader, source);
  compileShader(shader);

  if (process.env.NODE_ENV === 'development') {
    validate(gl, shader);
  }

  return shader as WebGLShader;
}
