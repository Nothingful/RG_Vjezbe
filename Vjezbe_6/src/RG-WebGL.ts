// RG-WebGL.js - skup potprograma koji automatizira prevođenje programa za sjenčanje
// za potrebe kolegija Računalna grafika pripremio Damir Horvat / preradio Ivan Hip

/**
 * Create shader from script tag id
 * @param gl - WebGL2 Rendering Context
 * @param id - HTML script tag id
 * @param shaderType - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
 * @returns WebGLShader
 */
function translateShader(gl: WebGL2RenderingContext, id: string, shaderType: number): WebGLShader {
    //potrazi skriptu u dokumentu
    var shaderScript = document.querySelector<HTMLScriptElement>("#" + id);
    if (!shaderScript) {
        throw "Unknown script: " + id;
    }
    //uzmi sadrzaj skripte
    var shaderSource = shaderScript.text.trim();
    //napravi shader objekt
    var shader: WebGLShader = gl.createShader(shaderType);
    //pridruzi mu izvorni kod
    gl.shaderSource(shader, shaderSource);
    //kompajliraj shader
    gl.compileShader(shader);
    //provjeri da li je sve ok
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        throw "Shader not compiled: " + gl.getShaderInfoLog(shader);
    }
    return shader;
}
  
/**
 * Prepares WebGLProgram from vertex and fragment shaders
 * @param gl - WebGL2 Rendering Context
 * @param vsID - HTML script tag id for Vertex shader
 * @param fsID - HTML script tag id for Fragment shader
 * @returns WebGLProgram
 */
function prepareGPUprogram(gl: WebGL2RenderingContext, vsID: string, fsID: string): WebGLProgram {
    var vshader = translateShader(gl, vsID, gl.VERTEX_SHADER);
    var fshader = translateShader(gl, fsID, gl.FRAGMENT_SHADER);
    var program: WebGLProgram = gl.createProgram();
    //pridruzi shadere
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    //povezi shadere u program
    gl.linkProgram(program);
    //provjeri je li dobro povezano
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        throw "Program not prepared: " + gl.getProgramInfoLog(program);
    }
    return program;
}
