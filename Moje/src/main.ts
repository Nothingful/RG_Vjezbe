/**
 * WebGL helper functions and constants
 */
namespace webglUtils {
   const defaultShaderType = [
      "VERTEX_SHADER",
      "FRAGMENT_SHADER",
   ];

   /**
    * Creates and compiles a shader.
    *
    * @param {!WebGLRenderingContext} gl The WebGL Context.
    * @param {string} shaderSource The GLSL source code for the shader.
    * @param {number} shaderType The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
    * @return {!WebGLShader} The shader.
    */
   export function compileShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader {
      // Create the shader object
      var shader = gl.createShader(shaderType);

      // Set the shader source code.
      gl.shaderSource(shader, shaderSource);

      // Compile the shader
      gl.compileShader(shader);

      // Check if it compiled
      var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!success) {
         // Something went wrong during compilation; get the error
         throw ("could not compile shader:" + gl.getShaderInfoLog(shader));
      }

      return shader;
   }

   /**
    * Creates a program from 2 shaders.
    *
    * @param {!WebGLRenderingContext} gl The WebGL context.
    * @param {!WebGLShader} vertexShader A vertex shader.
    * @param {!WebGLShader} fragmentShader A fragment shader.
    * @return {!WebGLProgram} A program.
   */
   export function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
      // create a program.
      var program = gl.createProgram();

      // attach the shaders.
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);

      // link the program.
      gl.linkProgram(program);

      // Check if it linked.
      var success = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!success) {
         // something went wrong with the link; get the error
         throw ("program failed to link:" + gl.getProgramInfoLog(program));
      }

      return program;
   };

   /**
    * Creates a shader from the content of a script tag.
    *
    * @param {!WebGLRenderingContext} gl The WebGL Context.
    * @param {string} scriptId The id of the script tag.
    * @param {number} opt_shaderType. The type of shader to create.
    *     If not passed in will use the type attribute from the
    *     script tag.
    * @return {!WebGLShader} A shader.
    */
   export function createShaderFromScript(gl: WebGLRenderingContext, scriptId: string, opt_shaderType: number) {
      // look up the script tag by id.
      var shaderScript = <HTMLScriptElement>document.getElementById(scriptId);
      if (!shaderScript) {
         throw("*** Error: unknown script element" + scriptId);
      }
      
      // extract the contents of the script tag.
      var shaderSource = shaderScript.textContent;
      
      // If we didn't pass in a type, use the 'type' from
      // the script tag.
      if (!opt_shaderType) {
         if (shaderScript.type == "x-shader/x-vertex") {
            opt_shaderType = gl.VERTEX_SHADER;
         } else if (shaderScript.type == "x-shader/x-fragment") {
            opt_shaderType = gl.FRAGMENT_SHADER;
         } else if (!opt_shaderType) {
            throw("*** Error: shader type not set");
         }
      }
      
      return compileShader(gl, shaderSource, opt_shaderType);
   };

   /**
    * Creates a program from 2 script tags.
    *
    * @param {!WebGLRenderingContext} gl The WebGL Context.
    * @param {string} vertexShaderId The id of the vertex shader script tag.
    * @param {string} fragmentShaderId The id of the fragment shader script tag.
    * @return {!WebGLProgram} A program
    */
   export function createProgramFromScripts(
      gl: WebGLRenderingContext, vertexShaderId: string, fragmentShaderId: string): WebGLProgram {
      var vertexShader = createShaderFromScript(gl, vertexShaderId, gl.VERTEX_SHADER);
      var fragmentShader = createShaderFromScript(gl, fragmentShaderId, gl.FRAGMENT_SHADER);
      return createProgram(gl, vertexShader, fragmentShader);
   }

   /**
    * Creates a program from 2 sources.
    *
    * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
    * @param {string} vertexShaderSources The GLSL source code for the vertex shader.
    * @param {string} fragmentShaderSources The GLSL source code for the fragment shader.
    * @return {WebGLProgram} The created program.
    * @memberOf module:webgl-utils
    */
   export function createProgramFromSources(gl: WebGLRenderingContext, vertexShaderSources: string, fragmentShaderSources: string): WebGLProgram{
      var vertexShader = createShaderFromScript(gl, vertexShaderSources, gl.VERTEX_SHADER);
      var fragmentShader = createShaderFromScript(gl, fragmentShaderSources, gl.FRAGMENT_SHADER);
      return createProgram(gl, vertexShader, fragmentShader);
   }

   /**
   * Resize a canvas to match the size its displayed.
   * @param {HTMLCanvasElement} canvas The canvas to resize.
   * @param {number} [multiplier] amount to multiply by.
   *    Pass in window.devicePixelRatio for native pixels.
   * @return {boolean} true if the canvas was resized.
   */
   export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, multiplier?: number): boolean {
      multiplier = multiplier || 1;

      // Lookup the size the browser is displaying the canvas in CSS pixels.
      const width  = canvas.clientWidth  * multiplier | 0;
      const height = canvas.clientHeight * multiplier | 0;

      // Check if the canvas is not the same size.
      if (canvas.width !== width || canvas.height !== height) {
         canvas.width  = width;
         canvas.height = height;
         return true;
      }
      return false;
   }
}

function init(): void{
   var canvas: HTMLCanvasElement = document.querySelector("#webgl_canvas");

   var gl = canvas.getContext("webgl2");
   if (!gl) {
      // no webgl2 for you!
      console.log("no webgl2 for you!");
   }
   
   var vertexShaderSource = document.getElementById("vertex_shader").innerText.trim();
   var fragmentShaderSource = document.getElementById("fragment_shader").innerText.trim();
   
   console.log(vertexShaderSource);
   console.log(fragmentShaderSource);

   var vertexShader: WebGLShader = webglUtils.compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
   var fragmentShader: WebGLShader = webglUtils.compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

   var program: WebGLProgram = webglUtils.createProgram(gl, vertexShader, fragmentShader);

   var positionAttributeLocation: number = gl.getAttribLocation(program, "a_position");

   var resolutionUniformLocation: WebGLUniformLocation = gl.getUniformLocation(program, "u_resolution");

   var positionBuffer: WebGLBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

   // we're going to draw a rectangle made from 2 triangles, 3 points each
   var positions = [
      100, 200,
      800, 200,
      100, 300,
      100, 300,
      800, 200,
      800, 300,
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

   var vao: WebGLVertexArrayObject = gl.createVertexArray();
   gl.bindVertexArray(vao);

   gl.enableVertexAttribArray(positionAttributeLocation);

   var size: number = 2;          // 2 components per iteration
   var type: number = gl.FLOAT;   // the data is 32bit floats
   var normalize: boolean = false; // don't normalize the data
   var stride: number = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
   var offset: number = 0;        // start at the beginning of the buffer
   gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
   
   webglUtils.resizeCanvasToDisplaySize(gl.canvas);
   
   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

   // Clear the canvas
   gl.clearColor(0, 0, 0, 0);
   gl.clear(gl.COLOR_BUFFER_BIT);

   // Tell it to use our program (pair of shaders)
   gl.useProgram(program);

   // Pass in the canvas resolution so we can convert from
   // pixels to clip space in the shader
   gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
   
   // Bind the attribute/buffer set we want.
   gl.bindVertexArray(vao);

   // draw
   var primitiveType: number = gl.TRIANGLES;
   var offset: number = 0;
   var count: number = 6;
   gl.drawArrays(primitiveType, offset, count);
}

function drawScene() {
   /*resizeCanvasToDisplaySize(gl.canvas);
   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);*/
}

document.addEventListener('DOMContentLoaded', function () {
   init();
});