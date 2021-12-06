window.onload = vjezba_8_1;

function vjezba_8_1() {
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
    var vrhoviLeptira =
      [[ 0,  0,  0, 1, 0, 0],  // crveno
       [-a, -a,  0, 1, 0, 0],  // crveno
       [ a, -a,  0, 1, 0, 0],  // crveno
       [ 0,  0,  0, 1, 0, 0],  // crveno
       [ a,  a,  0, 1, 1, 0],  // žuto
       [-a,  a,  0, 0.5, 0, 1]]; // ljubičasto

    let r = 0.9; // raspon koordinatnih osi
    var vrhoviKoordOsi =
      [[-r,  0,  0],
       [ r,  0,  0],
       [ 0,  r,  0],
       [ 0, -r,  0]];

    var leptirVAO = gl.createVertexArray();
    var koordOsiVAO = gl.createVertexArray();
    
    function fillBuffers() {
        // povezivanje s atribut varijablama u programu za sjenčanje
        let a_vrhXYZ = gl.getAttribLocation(GPUprogram1, "a_vrhXYZ");
        let a_boja = gl.getAttribLocation(GPUprogram1, "a_boja");
        
        gl.bindVertexArray(leptirVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(a_vrhXYZ);
        gl.enableVertexAttribArray(a_boja);
        gl.vertexAttribPointer(a_vrhXYZ, 3, gl.FLOAT, false, 24, 0);
        gl.vertexAttribPointer(a_boja, 3, gl.FLOAT, false, 24, 12);

        // punjenje spremnika - podaci koji se šalju na GPU
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviLeptira.flat()), gl.STATIC_DRAW);

        gl.bindVertexArray(koordOsiVAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(a_vrhXYZ);
        gl.vertexAttribPointer(a_vrhXYZ, 3, gl.FLOAT, false, 12, 0);
        // punjenje spremnika - podaci koji se šalju na GPU
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vrhoviKoordOsi.flat()), gl.STATIC_DRAW);
        gl.vertexAttrib3f(a_boja, 1, 1, 1); // svi vrhovi su bijeli
    }

    function draw() {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);

        // poveži sa spremnikom u kojem je leptir
        gl.bindVertexArray(leptirVAO);          
        gl.drawArrays(gl.TRIANGLES, 0, vrhoviLeptira.length);

        // poveži sa spremnikom u kojem su osi
        gl.bindVertexArray(koordOsiVAO);          
        gl.drawArrays(gl.LINES, 0, vrhoviKoordOsi.length);
    }

    fillBuffers();
    draw();
}