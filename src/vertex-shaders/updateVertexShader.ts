export const updateVertexShader = `#version 300 es

precision mediump float;

in vec2 i_Position;
out vec2 v_Position;

void main() {
    v_Position = i_Position + vec2(0.01, 0.01);
}`;
