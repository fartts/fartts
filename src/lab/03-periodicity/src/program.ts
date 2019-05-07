export function validate(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
): void {
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!success) {
    gl.deleteProgram(program);

    throw new Error(
      `program (${program}) failed to link:\n${gl.getProgramInfoLog(program)}`,
    );
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
