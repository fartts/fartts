export function validate(gl: WebGLRenderingContext, shader: WebGLShader): void {
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!success) {
    gl.deleteShader(shader);

    throw new Error(
      `shader ${shader} failed to compile:\n${gl.getShaderInfoLog(shader)}`,
    );
  }
}

export function compile(
  gl: WebGLRenderingContext,
  type:
    | WebGLRenderingContext['VERTEX_SHADER']
    | WebGLRenderingContext['FRAGMENT_SHADER'],
  source: string,
): WebGLShader {
  const shader = gl.createShader(type) as WebGLShader;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (process.env.NODE_ENV === 'development') {
    validate(gl, shader);
  }

  return shader;
}
