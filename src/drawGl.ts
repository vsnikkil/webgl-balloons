import {
    createFragmentShader,
    createShaderProgram,
    createVertexShader,
} from "./shaderUtils";
import { simpleFragmentShader } from "./fragment-shaders/simpleFragmentShader";
import { simpleVertexShader } from "./vertex-shaders/simpleVertexShader";

const NUM_OF_PARTICLES = 10;
const initParticleData = (numOfParticles: number): number[] => {
    const particleData = [];

    for (let x = 0; x < numOfParticles; x = x + 1) {
        const x0 =
            1.8 * (x / (NUM_OF_PARTICLES - 1)) -
            0.9 +
            0.1 * (Math.random() - 0.5);
        const y0 = 2 * (Math.random() - 0.5);
        const z = Math.floor(Math.random() * 3) + 1;
        particleData.push(x0, y0, z);
    }

    return particleData;
};

const RENDER_PROGRAM = 0;
const programs = new Map<number, WebGLProgram>();
const getProgram = (programId: number) => programs.get(programId);

let particleData: ReturnType<typeof initParticleData> | null = null;
let particleBuffer: WebGLBuffer = null;

export const initGl = (gl: WebGL2RenderingContext): void => {
    particleBuffer = gl.createBuffer();

    let vertexShader;
    let fragmentShader;
    let renderProgram;

    try {
        vertexShader = createVertexShader(gl, simpleVertexShader);
        fragmentShader = createFragmentShader(gl, simpleFragmentShader);
        renderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
    } catch (error) {
        throw error;
    }

    programs.set(RENDER_PROGRAM, renderProgram);

    particleData = initParticleData(NUM_OF_PARTICLES);

    const aPositionLoc = gl.getAttribLocation(renderProgram, "i_Position");
    const bufData = new Float32Array(particleData);

    gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufData, gl.STATIC_DRAW);

    gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 3 * 4, 0);
    gl.enableVertexAttribArray(aPositionLoc);

    gl.clearColor(0.95, 0.95, 0.95, 1.0);
};

let prevTimestamp: DOMHighResTimeStamp = performance.now();
export const drawGl = (
    gl: WebGL2RenderingContext,
    timestamp: DOMHighResTimeStamp = performance.now()
) => {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const renderProgram = getProgram(RENDER_PROGRAM);
    gl.useProgram(renderProgram);
    const uTimeLoc = gl.getUniformLocation(renderProgram, "u_Time");
    const uTimeDeltaLoc = gl.getUniformLocation(renderProgram, "u_TimeDelta");

    // set uniforms
    gl.uniform1i(uTimeLoc, timestamp);
    gl.uniform1i(uTimeDeltaLoc, timestamp - prevTimestamp);

    // draw particles
    gl.drawArrays(gl.POINTS, 0, particleData.length / 3);

    prevTimestamp = timestamp;

    window.requestAnimationFrame((timestamp) => drawGl(gl, timestamp));
};
