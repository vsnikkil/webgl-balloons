export const simpleVertexShader = `#version 300 es
precision mediump float;

in vec3 i_Position;

uniform int u_Time;

out float v_xPos;

void main() {
    float yPos = i_Position.y;
    float zPos = i_Position.z;
    yPos = mod(1.0 + yPos + zPos * float(u_Time) / 30000.0, 2.0) - 1.0;
    gl_Position = vec4(i_Position.x + 0.1 * sin(4.0 * yPos), 1.5 * yPos, 0.0, 1.0);
    gl_PointSize = (zPos + yPos) * 60.0;
    v_xPos = yPos;
}`;
