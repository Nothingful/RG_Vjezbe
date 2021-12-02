window.onload = zadaca_8_1;

function zadaca_8_1() {
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");
    var gl: WebGL2RenderingContext = canvas.getContext("webgl2");
    if (!gl) alert("WebGL2 nije dostupan!");

    var GPUprogram1: WebGLProgram = prepareGPUprogram(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(GPUprogram1); // možemo imati više GPU programa

    // povezivanje s uniform varijablama u programima za sjenčanje
    let u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");
    let u_boja = gl.getUniformLocation(GPUprogram1, "u_boja");

    function cube_page(a: number, color: number[]): number[][] {
        let vertices = [[-a,  a].concat(color),
                        [-a, -a].concat(color),
                        [ a, -a].concat(color),
                        [ a,  a].concat(color),
                        [-a,  a].concat(color),
                        [ a, -a].concat(color)];
        return vertices;
    }

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

    var zuto = [1, 1, 0];
    var crveno = [1, 0, 0];
    var ljubicasto = [0.5, 0, 1];
    var zeleno = [0, 1, 0];
    var plavo = [0, 0, 1];
    var tirkizno = [0, 1, 1];
    
    var mt3D = new MT3D();
    var STEP = 1;
    var a = 0.75;
    var cube_page_vertices = [];
    function draw() {
        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
        let radians = MT3D.toRad(STEP);
        
        // CRVENO

        mt3D.setIdentityMatrix();
        mt3D.rotateAroundX(MT3D.toRad(-180));
        mt3D.translate(0, 0, a);
        mt3D.rotateAroundY(radians);
        mt3D.rotateAroundX(radians*2);
        mt3D.rotateAroundZ(radians*3);
        
        gl.uniformMatrix4fv(u_mTrans, false, mt3D.list());
        cube_page_vertices = cube_page(a, crveno);
        fillBuffers(cube_page_vertices);
        gl.drawArrays(gl.TRIANGLES, 0, cube_page_vertices.length);

        // ZUTO

        mt3D.setIdentityMatrix();
        mt3D.rotateAroundY(MT3D.toRad(-90));
        mt3D.translate(a, 0, 0);
        mt3D.rotateAroundY(radians);
        mt3D.rotateAroundX(radians*2);
        mt3D.rotateAroundZ(radians*3);
        
        gl.uniformMatrix4fv(u_mTrans, false, mt3D.list());
        cube_page_vertices = cube_page(a, zuto);
        fillBuffers(cube_page_vertices);
        gl.drawArrays(gl.TRIANGLES, 0, cube_page_vertices.length);

        // LJUBICASTO

        mt3D.setIdentityMatrix();
        mt3D.rotateAroundY(MT3D.toRad(90));
        mt3D.translate(-a, 0, 0);
        mt3D.rotateAroundY(radians);
        mt3D.rotateAroundX(radians*2);
        mt3D.rotateAroundZ(radians*3);
        
        gl.uniformMatrix4fv(u_mTrans, false, mt3D.list());
        cube_page_vertices = cube_page(a, ljubicasto);
        fillBuffers(cube_page_vertices);
        gl.drawArrays(gl.TRIANGLES, 0, cube_page_vertices.length);

        // ZELENO

        mt3D.setIdentityMatrix();
        mt3D.translate(0, 0, -a);
        mt3D.rotateAroundY(radians);
        mt3D.rotateAroundX(radians*2);
        mt3D.rotateAroundZ(radians*3);
        
        gl.uniformMatrix4fv(u_mTrans, false, mt3D.list());
        cube_page_vertices = cube_page(a, zeleno);
        fillBuffers(cube_page_vertices);
        gl.drawArrays(gl.TRIANGLES, 0, cube_page_vertices.length);

        // PLAVO

        mt3D.setIdentityMatrix();
        mt3D.rotateAroundX(MT3D.toRad(-90));
        mt3D.translate(0, -a, 0);
        mt3D.rotateAroundY(radians);
        mt3D.rotateAroundX(radians*2);
        mt3D.rotateAroundZ(radians*3);
        
        gl.uniformMatrix4fv(u_mTrans, false, mt3D.list());
        cube_page_vertices = cube_page(a, plavo);
        fillBuffers(cube_page_vertices);
        gl.drawArrays(gl.TRIANGLES, 0, cube_page_vertices.length);

        // TIRKIZNO

        mt3D.setIdentityMatrix();
        mt3D.rotateAroundX(MT3D.toRad(90));
        mt3D.translate(0, a, 0);
        mt3D.rotateAroundY(radians);
        mt3D.rotateAroundX(radians*2);
        mt3D.rotateAroundZ(radians*3);
        
        gl.uniformMatrix4fv(u_mTrans, false, mt3D.list());
        cube_page_vertices = cube_page(a, tirkizno);
        fillBuffers(cube_page_vertices);
        gl.drawArrays(gl.TRIANGLES, 0, cube_page_vertices.length);
        
        if (STEP < 360) STEP += 0.15;
        else STEP = 0;
        requestAnimationFrame(draw);
    }
    //gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    //gl.cullFace(gl.FRONT);
    draw();
}