window.onload = vjezba_7_1;

function vjezba_7_1() {
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");
    var gl: WebGL2RenderingContext = canvas.getContext("webgl2");
    if (!gl) alert("WebGL2 nije dostupan!");

    var GPUprogram1: WebGLProgram = prepareGPUprogram(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(GPUprogram1); // možemo imati više GPU programa

    // povezivanje s uniform varijablama u programima za sjenčanje
    let u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");
    let u_boja = gl.getUniformLocation(GPUprogram1, "u_boja");

    // definiranje geometrije preko javascript polja
    var vertices = [[ -1, -0.5,  0.5, 0, 1],  // ljubičasto
                    [-1, 0.5,  0.5, 0, 1],  // ljubičasto
                    [ -0.67, -0.5,  0, 0, 1],  // plavo
                    [ -0.67, 0.5,  0, 0, 1],  // plavo
                    [ -0.33, -0.5,  0, 1, 1],  // cijan
                    [ -0.33, 0.5,  0, 1, 1], // cijan
                    [ 0.33, -0.5,  0, 1, 0],  // zeleno
                    [ 0.33, 0.5,  0, 1, 0],  // zeleno
                    [ 0.67, -0.5,  1, 1, 0],  // žuto
                    [ 0.67, 0.5,  1, 1, 0],  // žuto
                    [ 1, -0.5,  1, 0, 0],  // crveno
                    [ 1, 0.5,  1, 0, 0]];  // crveno

    function fillBuffers() {
        var vertexBuffer: WebGLBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        // povezivanje s atribut varijablama u programu za sjenčanje
        let a_vrhXY = gl.getAttribLocation(GPUprogram1, "a_vrhXY");
        let a_boja = gl.getAttribLocation(GPUprogram1, "a_boja");

        //gl.uniformMatrix3fv(u_mTrans, false, mt2D.list());
        //gl.uniform4fv(u_boja, red_color);
        
        var vertexBuffer: WebGLBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.enableVertexAttribArray(a_vrhXY);
        gl.enableVertexAttribArray(a_boja);
        gl.vertexAttribPointer(a_vrhXY, 2, gl.FLOAT, false, 20, 0);
        gl.vertexAttribPointer(a_boja, 3, gl.FLOAT, false, 20, 8);
        // punjenje spremnika - podaci koji se šalju na GPU
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices.flat()), gl.STATIC_DRAW);
    }

    function draw() {
        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length);
    }

    fillBuffers();
    draw();
}