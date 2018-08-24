#ifdef GL_ES
precision mediump float;
#endif

varying vec4 vColor;

void main() {
	gl_FragColor = vec4(vColor.xy, 1.0 - vColor.y, 1.0);
}
