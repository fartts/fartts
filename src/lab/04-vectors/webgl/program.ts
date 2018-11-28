export function validate(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
): void {
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  const valid = gl.getProgramParameter(program, gl.VALIDATE_STATUS);

  if (!(linked && valid)) {
    const info = gl.getProgramInfoLog(program);
    const failure = [
      ...(linked ? ['link'] : []),
      ...(valid ? ['validate'] : []),
    ].join(' & ');

    gl.deleteProgram(program);
    throw new Error(`program (${program}) failed to ${failure}:\n${info}`);
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
    gl.validateProgram(program);
    validate(gl, program);
  }

  return program;
}
