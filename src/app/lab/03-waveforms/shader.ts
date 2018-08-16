export function validate(
  gl: WebGLRenderingContext,
  shader: WebGLShader | null,
): void {
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!success) {
    throw new Error(
      `shader ${shader} failed to compile:\n${gl.getShaderInfoLog(shader)}`,
    );

    gl.deleteShader(shader);
  }
}

export function compile(
  gl: WebGLRenderingContext,
  type:
    | WebGLRenderingContext['VERTEX_SHADER']
    | WebGLRenderingContext['FRAGMENT_SHADER'],
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (process.env.NODE_ENV === 'development') {
    validate(gl, shader);
  }

  return shader as WebGLShader;
}
