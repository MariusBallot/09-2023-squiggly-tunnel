uniform sampler2D u_metalMatCap;
uniform float u_index;
uniform float u_layersCount;
uniform float u_time;
uniform vec3 u_layerColor;

varying vec2 vN;
varying vec2 vUv;
varying vec3 vPosition;
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 


float cutOutSizeF(float index){
    float cutOutSize = (u_layersCount-(index+1.));
    cutOutSize = cutOutSize/u_layersCount;
    cutOutSize = cutOutSize*6.;

    float sn = snoise3(vec3(vPosition.xy*0.5, 1.+index*0.01+u_time*0.001));
    cutOutSize +=sn*0.5;


    return cutOutSize;
}


void main() {

    float d = distance(vPosition.xy, vec2(0.));
    float cutOutSize = cutOutSizeF(u_index);
    float cookieCutter = 1.-smoothstep(cutOutSize, cutOutSize-0.01, d);

    float maxIndex = u_layersCount-1.;
    if(u_index == maxIndex){
        cookieCutter = 1.;
    }


    float AO = d - cutOutSize;
    if(u_index == 0.){AO = 0.;}

    vec3 shadow = vec3(0.);
    if(u_index != 0.){

        float offsetD = distance(vPosition.xy, vec2(0.2));
        float prevCutOutSize = cutOutSizeF(u_index-1.);
        float prevCookieCutter = 1.-smoothstep(prevCutOutSize, prevCutOutSize-0.01, d);


        shadow = vec3(prevCookieCutter*0.1);
    }

    vec4 outCol = vec4(u_layerColor-shadow - AO,cookieCutter);
    gl_FragColor =outCol;
}