#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 aPositions;

uniform vec2 uTranslation;
uniform vec2 uResolution;
uniform float uPointSize;

varying vec4 vColor;

void main() {
  vec2 position = ((aPositions + uTranslation) / uResolution) * 2.0 - 1.0;
  gl_PointSize = uPointSize;
  gl_Position = vec4(position, 0.0, 1.0);
  vColor = gl_Position * 0.5 + 0.5;
}
