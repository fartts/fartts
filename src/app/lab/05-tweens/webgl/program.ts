export function validate(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
): void {
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    gl.deleteProgram(program);
    const info = gl.getProgramInfoLog(program);
    throw new Error(`program (${program}) failed to link:\n${info}`);
  }

  gl.validateProgram(program);
  const valid = gl.getProgramParameter(program, gl.VALIDATE_STATUS);
  if (!valid) {
    gl.deleteProgram(program);
    const info = gl.getProgramInfoLog(program);
    throw new Error(`program (${program}) failed to validate:\n${info}`);
  }
}

export function link(
  gl: WebGLRenderingContext,
  vert: WebGLShader,
  frag: WebGLShader,
): WebGLProgram {
  const program = gl.createProgram() as WebGLProgram;

  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);

  if (process.env.NODE_ENV === 'development') {
    validate(gl, program);
  }

  return program;
}
