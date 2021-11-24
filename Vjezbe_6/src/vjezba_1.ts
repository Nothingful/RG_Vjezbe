window.onload = vjezba_6_1;

function vjezba_6_1() {
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");
    var gl: WebGL2RenderingContext = canvas.getContext("webgl2");
    if (!gl) alert("WebGL2 nije dostupan!");

    var GPUprogram1: WebGLProgram = prepareGPUprogram(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(GPUprogram1); // možemo imati više GPU programa

    // definiranje geometrije preko javascript polja
    var vertices = [ 0.0,  0.0,   // sredina
                -0.5,  0.5,   // lijevi gornji vrh
                -0.5, -0.5,   // lijevi donji vrh
                -0.5,  0.5,   // lijevi gornji vrh
                -0.5, -0.5,   // lijevi donji vrh
                0.5,  0.5,   // desni gornji vrh
                0.5, -0.5,   // desni donji vrh
                0.5,  0.5,   // desni gornji vrh
                0.5, -0.5,   // desni donji vrh
                0.0,  0.0 ]; // sredina

    function fillBuffers() {
        var vertexBuffer: WebGLBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        // povezivanje s atribut varijablom a_vrhXY u programu za sjenčanje
        let a_vrhXY = gl.getAttribLocation(GPUprogram1, "a_vrhXY");
        gl.enableVertexAttribArray(a_vrhXY);
        gl.vertexAttribPointer(a_vrhXY, 2, gl.FLOAT, false, 0, 0);
        // punjenje spremnika - podaci koji se šalju na GPU
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }

    function draw() {
        gl.clearColor(0.4, 0.4, 0.4, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.drawArrays(gl.LINES , 0, vertices.length / 2);
    }

    fillBuffers();
    draw();
}