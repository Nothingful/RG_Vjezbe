window.onload = vjezba_9_1;

function vjezba_9_1() {
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");
    var gl: WebGL2RenderingContext = canvas.getContext("webgl2");
    if (!gl) alert("WebGL2 nije dostupan!");

    var GPUprogram1: WebGLProgram = prepareGPUprogram(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(GPUprogram1); // možemo imati više GPU programa

    // povezivanje s uniform varijablama u programima za sjenčanje
    let u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");
    let u_boja = gl.getUniformLocation(GPUprogram1, "u_boja");
    let izvor1 = gl.getUniformLocation(GPUprogram1, "izvor1");
    let izvor2 = gl.getUniformLocation(GPUprogram1, "izvor2");


    function valjak(r, h, n) {
        var vrhovi = []; 

        // n-terokut - donja baza valjka na z = -h / 2
        // vektori normale su prema dolje, tj. [0, 0, -1]
        vrhovi.push(0, 0, -h / 2, 0, 0, -1); // središte za TRIANGLE_FAN
        let phi = 2 * Math.PI / n;
        for(let i = 0; i <= n; i++) {
        vrhovi.push(r * Math.cos(phi), r * Math.sin(phi), -h / 2, 0, 0, -1);
        phi += 2 * Math.PI / n;
        } // for

        // n-terokut - gornja baza valjka na z = h / 2
        // vektori normale su prema gore, tj. [0, 0, 1]
        vrhovi.push(0, 0, h / 2, 0, 0, 1); // središte za TRIANGLE_FAN
        phi = 2 * Math.PI;
        for(let i = 0; i <= n; i++) {
        vrhovi.push(r * Math.cos(phi), r * Math.sin(phi), h / 2, 0, 0, 1);
        phi -= 2 * Math.PI / n;
        } // for
    
        // plašt valjka
        phi = 0;
        for(let i = 0; i <= n; i++) {
        let c = Math.cos(phi);
        let s = Math.sin(phi);
        let x = r * c;
        let y = r * s;
        vrhovi.push(x, y, -h / 2, c, s, 0);
        vrhovi.push(x, y, h / 2, c, s, 0);
        phi += 2 * Math.PI / n;
        } // for

        console.log("vrhovi.length: ", vrhovi.length);
        return vrhovi;
    } // valjak

    function fillBuffers() {
        let a_vrhXYZ = gl.getAttribLocation(GPUprogram1, "a_vrhXYZ");
        let a_normala = gl.getAttribLocation(GPUprogram1, "a_normala");
    
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.enableVertexAttribArray(a_vrhXYZ);
        gl.enableVertexAttribArray(a_normala);
        gl.vertexAttribPointer(a_vrhXYZ, 3, gl.FLOAT, false, 24, 0);
        gl.vertexAttribPointer(a_normala, 3, gl.FLOAT, false, 24, 12);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(valjak(0.5, 1, n)),
        gl.STATIC_DRAW);
    }

    function draw() {
        gl.clearColor(0.5, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);

        // postavljanje vrijednosti uniform varijable - matrice transformacije
        gl.uniformMatrix4fv(u_mTrans, false,
        [1, 0, 0, 0,
            0, Math.cos(alpha), Math.sin(alpha), 0,
            0, -Math.sin(alpha), Math.cos(alpha), 0, 
            0, 0, 0, 1]);

        // pozicija izvora svjetlosti
        gl.uniform3fv(izvor1, [-10, 0, -10]);
        gl.uniform3fv(izvor2, [10, 0, -10]);

        // donja baza valjka
        gl.drawArrays(gl.TRIANGLE_FAN, 0, n + 2);

        // gornja baza valjka
        gl.drawArrays(gl.TRIANGLE_FAN, n + 2, n + 2);

        // plašt valjka
        gl.drawArrays(gl.TRIANGLE_STRIP, 2 * (n + 2), 2 * n + 2);

        alpha += Math.PI / 360;
        requestAnimationFrame(draw);
    } // iscrtaj

    var alpha = Math.PI / 6.0; // kut rotacije
    var n = 32; // broj stranica koje čine plašt valjka
    fillBuffers();
    gl.enable(gl.CULL_FACE);
    draw();
}