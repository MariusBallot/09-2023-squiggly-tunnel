varying vec2 vN;
varying vec2 vUv;
varying vec3 vPosition;

uniform vec2 u_res;

uniform sampler2D u_fboTex;

void main() {
    vec4 fboCol = texture2D(u_fboTex, gl_FragCoord.xy/u_res);

    gl_FragColor =vec4(fboCol);
}