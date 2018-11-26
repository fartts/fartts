#ifdef GL_ES
precision mediump float;
#endif

varying vec4 vColor;

float PI = 3.14159;

void main() {
	gl_FragColor = vec4(1.0 - sin(vColor.y * PI), 0.5, 1.0 - sin(vColor.x * PI), 1.0);
}
