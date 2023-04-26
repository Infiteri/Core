#VERTEX
attribute vec3 aPosition;
attribute vec2 aUVs;

uniform mat4 uCamera;
uniform mat4 uObject;

varying vec2 vUVs;

void main() {
    gl_Position = uCamera * uObject * vec4(aPosition, 1.0);
    vUVs = aUVs;
}

#FRAGMENT
precision mediump float;

uniform vec4 uColor;
uniform sampler2D uSampler;
uniform int useTexture;

varying vec2 vUVs;

void main() {
    vec4 finalColor = uColor;

    if(useTexture == 1) {
        finalColor = uColor * texture2D(uSampler, vUVs);
    }

    gl_FragColor = finalColor;
}
