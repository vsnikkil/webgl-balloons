export const simpleFragmentShader = `#version 300 es
precision mediump float;

in float v_xPos;
out vec4 o_Color;

void main() {
    float r = 0.0;
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = dot(cxy, cxy);
    
    if (r > 1.0) {
        discard;
    }

    o_Color = vec4(
        0.5 + sin(v_xPos) / 2.0,
        0.5 + sin(v_xPos) / 2.0,
        0.7 + sin(v_xPos) / 2.0,
        1.0
    );
}`;
