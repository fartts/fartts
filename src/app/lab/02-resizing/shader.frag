#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_color;

void main() {
	gl_FragColor = vec4(1.0, v_color.xy, 1.0);
}
