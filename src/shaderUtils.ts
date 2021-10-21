const COMPILE_ERROR = Object.freeze(new Error("Could not compile shader!"));

export const createShader = (
    gl: WebGL2RenderingContext,
    shaderType: number,
    source: string
) => {
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("Could not compile the shader!");
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        throw COMPILE_ERROR;
    } else {
        return shader;
    }
};

export const createVertexShader = (
    gl: WebGL2RenderingContext,
    source: string
) => createShader(gl, gl.VERTEX_SHADER, source);

export const createFragmentShader = (
    gl: WebGL2RenderingContext,
    source: string
) => createShader(gl, gl.FRAGMENT_SHADER, source);

export const createShaderProgram = (
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader,
    transformFeedbackVaryings?: string[]
) => {
    const shaderProgram = gl.createProgram();

    if (transformFeedbackVaryings) {
        gl.transformFeedbackVaryings(
            shaderProgram,
            transformFeedbackVaryings,
            gl.INTERLEAVED_ATTRIBS
        );
    }

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Could not link shader program!");
        console.log(gl.getProgramInfoLog(shaderProgram));
        return null;
    } else {
        return shaderProgram;
    }
};
