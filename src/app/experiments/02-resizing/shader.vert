#ifdef GL_ES
precision mediump float;
#endif

attribute vec4 a_position;
varying vec4 v_color;

void main() {
  gl_Position = a_position;
  v_color = gl_Position * 0.5 + 0.5;
}
