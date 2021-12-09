window.onload = vjezba_9_3;

function vjezba_9_3() {
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");
    var gl: WebGL2RenderingContext = canvas.getContext("webgl2");
    if (!gl) alert("WebGL2 nije dostupan!");

    var GPUprogram1: WebGLProgram = prepareGPUprogram(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(GPUprogram1); // možemo imati više GPU programa

    // povezivanje s uniform varijablama u programima za sjenčanje
    let u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");
    let u_boja = gl.getUniformLocation(GPUprogram1, "u_boja");

    // definiranje geometrije preko javascript polja
    let a = 0.5;
    /*var vertices = [[ 0,  0,  1, 0, 0],  // crveno
                    [-a, -a,  1, 0, 0],  // crveno
                    [ a, -a,  1, 0, 0],  // crveno
                    [ 0,  0,  1, 0, 0],  // crveno
                    [ a,  a,  1, 1, 0],  // žuto
                    [-a,  a,  0.5, 0, 1]]; // ljubičasto*/

    var vertices1 = [[ 0,  0,  1, 1, 0],  // žuto
                    [-a, -a,  1, 0, 0],  // crveno
                    [ a, -a,  1, 0, 0],  // crveno
                    [ 0,  0,  1, 1, 0],  // žuto
                    [ a,  a,  1, 0, 0],  // crveno
                    [-a,  a,  1, 0, 0]]; // crveno

    var vertices2 = [[ 0,  0,  0.5, 0, 1],  // ljubičasto
                    [-a, -a,  1, 1, 0],  // žuto
                    [ a, -a,  1, 1, 0],  // žuto
                    [ 0,  0,  0.5, 0, 1],  // ljubičasto
                    [ a,  a,  1, 1, 0],  // žuto
                    [-a,  a,  1, 1, 0]]; // žuto

    function fillBuffers(vertices: number[][]) {
        var vertexBuffer: WebGLBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        // povezivanje s atribut varijablama u programu za sjenčanje
        let a_vrhXY = gl.getAttribLocation(GPUprogram1, "a_vrhXY");
        let a_boja = gl.getAttribLocation(GPUprogram1, "a_boja");
        
        var vertexBuffer: WebGLBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.enableVertexAttribArray(a_vrhXY);
        gl.enableVertexAttribArray(a_boja);
        gl.vertexAttribPointer(a_vrhXY, 2, gl.FLOAT, false, 20, 0);
        gl.vertexAttribPointer(a_boja, 3, gl.FLOAT, false, 20, 8);
        // punjenje spremnika - podaci koji se šalju na GPU
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices.flat()), gl.STATIC_DRAW);
    }

    var mt3D = new MT3D();
    var green_color = [0.0, 1.0, 0.0, 1.0]; // zelena boja
    var red_color = [0.8, 0.0, 0.2, 1.0]; // crvena boja
    var blue_color = [0.1, 0.54, 0.98, 1.0]; // plava boja
    var STEP = 1;
    function draw() {
        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
        
        let radians = MT3D.toRad(STEP);
        mt3D.setIdentityMatrix();
        mt3D.rotateAroundY(radians);
        mt3D.rotateAroundX(radians*2);
        mt3D.rotateAroundZ(radians*3);
        
        gl.uniformMatrix4fv(u_mTrans, false, mt3D.list());
        //console.log(mt3D.list());
        gl.uniform4fv(u_boja, red_color);
        fillBuffers(vertices1);
        gl.drawArrays(gl.TRIANGLES, 0, vertices1.length);

        mt3D.setIdentityMatrix();
        mt3D.rotateAroundX(MT3D.toRad(90));
        mt3D.rotateAroundY(radians);
        mt3D.rotateAroundX(radians*2);
        mt3D.rotateAroundZ(radians*3);
        
        gl.uniformMatrix4fv(u_mTrans, false, mt3D.list());
        //console.log(mt3D.list());
        gl.uniform4fv(u_boja, red_color);
        fillBuffers(vertices2);
        gl.drawArrays(gl.TRIANGLES, 0, vertices2.length);
        
        if (STEP < 360) STEP += 0.2;
        else STEP = 0;
        requestAnimationFrame(draw);
    }
    gl.enable(gl.DEPTH_TEST);
    //gl.enable(gl.CULL_FACE);
    //gl.cullFace(gl.FRONT);
    draw();
}