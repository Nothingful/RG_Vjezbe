window.onload = vjezba_7_3;

function vjezba_7_3() {
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");
    var gl: WebGL2RenderingContext = canvas.getContext("webgl2");
    if (!gl) alert("WebGL2 nije dostupan!");

    var GPUprogram1: WebGLProgram = prepareGPUprogram(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(GPUprogram1); // možemo imati više GPU programa

    // povezivanje s uniform varijablama u programima za sjenčanje
    let u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");
    let u_boja = gl.getUniformLocation(GPUprogram1, "u_boja");

    // definiranje geometrije preko javascript polja
    var vertices = [];
    var a = 0.9;
    var b = 0.3;
    for (var i = 0; i < 2 * Math.PI; i += 0.01){
        let x = Math.cos(i) * a;
        let y = Math.sin(i) * b;
        vertices.push(x);
        vertices.push(y);
    }

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

        // postavljanje vrijednosti uniform varijabli
        let angle = Math.PI / 3.0;
        gl.uniformMatrix3fv(u_mTrans, false, [Math.cos(angle), Math.sin(angle), 0, -Math.sin(angle), Math.cos(angle), 0, 0, 0, 1]);
        gl.uniform4fv(u_boja, [0.0, 1.0, 0.0, 1.0]); // zelena boja
        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);

        let trans_x = 0.9;
        let trans_y = 0.3;
        
        gl.uniformMatrix3fv(u_mTrans, false, [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, trans_x, trans_y, 1.0]);
        gl.uniform4fv(u_boja, [1.0, 1.0, 0.0, 1.0]); // žuta boja
        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);

        gl.uniformMatrix3fv(u_mTrans, false, [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, -trans_x, -trans_y, 1.0]);
        gl.uniform4fv(u_boja, [1.0, 0.0, 0.0, 1.0]); // crvena boja
        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
    }

    fillBuffers();
    draw();
}