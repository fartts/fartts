export function validate(
  gl: WebGLRenderingContext,
  program: WebGLProgram | null,
): void {
  const {
    LINK_STATUS,
    getProgramParameter,
    getProgramInfoLog,
    deleteProgram,
  } = gl;
  const success = getProgramParameter(program, LINK_STATUS);

  if (!success) {
    throw new Error(
      `program (${program}) failed to link:\n${getProgramInfoLog(program)}`,
    );

    deleteProgram(program);
  }
}

export function link(
  gl: WebGLRenderingContext,
  vert: WebGLShader,
  frag: WebGLShader,
): WebGLProgram {
  const { createProgram, attachShader, linkProgram } = gl;
  const program = createProgram();

  attachShader(program, vert);
  attachShader(program, frag);
  linkProgram(program);

  if (process.env.NODE_ENV === 'development') {
    validate(gl, program);
  }

  return program as WebGLProgram;
}
