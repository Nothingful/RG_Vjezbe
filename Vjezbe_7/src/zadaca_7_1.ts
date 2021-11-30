window.onload = zadaca_7_1;

function zadaca_7_1() {
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");
    var gl: WebGL2RenderingContext = canvas.getContext("webgl2");
    if (!gl) alert("WebGL2 nije dostupan!");

    var GPUprogram1: WebGLProgram = prepareGPUprogram(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(GPUprogram1); // možemo imati više GPU programa

    // povezivanje s uniform varijablama u programima za sjenčanje
    let u_mTrans = gl.getUniformLocation(GPUprogram1, "u_mTrans");
    let u_boja = gl.getUniformLocation(GPUprogram1, "u_boja");

    function drawElipsis(vertices: number[]){
        gl.viewport(0, 0, canvas.width, canvas.height);

        function draw(px: number, py: number, k: number) {
            let angle = Math.PI / k;
            gl.uniformMatrix3fv(u_mTrans, false, [Math.cos(angle), Math.sin(angle), 0.0, -Math.sin(angle), Math.cos(angle), 0.0, px, py, 1.0]);
            gl.uniform4fv(u_boja, [1.0, 1.0, 0.0, 1.0]); // žuta boja
            gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
        }

        draw(0.0, 0.5, 2);
        draw(0.0, -0.5, 2);
        draw(0.5, 0.0, 1);
        draw(-0.5, 0.0, 1);
        draw(0.33, 0.38, 3.5);
        draw(0.33, -0.38, -3.5);
        draw(-0.33, -0.38, 3.5);
        draw(-0.33, 0.38, -3.5);
    }

    // definiranje geometrije preko javascript polja
    var mt2D = new MT2D();
    //mt2D.projection2D(0, canvas.width, 0, canvas.height);

    /**
     * Cretes array of vertices for drawing elipsis
     * @returns array of elipsis vertices
     */
    function generateElipsisVertices(a: number, b: number): number[] {
        var vertices = [];
        for (let t = 0; t <= 2 * Math.PI+1; t += 0.01) {
            vertices.push(a * Math.cos(t));
            vertices.push(b * Math.sin(t));
            /*vertices.push(mt2D.transX(a * Math.cos(t)));
            vertices.push(mt2D.transY(b * Math.sin(t)));*/
        }
        //console.log(vertices);
        return vertices;
    }

    function fillBuffers(vertices: number[]) {
        var vertexBuffer: WebGLBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        // povezivanje s atribut varijablom a_vrhXY u programu za sjenčanje
        let a_vrhXY = gl.getAttribLocation(GPUprogram1, "a_vrhXY");
        gl.enableVertexAttribArray(a_vrhXY);
        gl.vertexAttribPointer(a_vrhXY, 2, gl.FLOAT, false, 0, 0);
        // punjenje spremnika - podaci koji se šalju na GPU
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }

    function draw(){
        gl.clearColor(0.4, 0.4, 0.4, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);

        //mt2D.projection2D(-10, 10, -10, 10);
        var green_color = [0.0, 1.0, 0.0, 1.0]; // zelena boja
        var red_color = [0.8, 0.0, 0.2, 1.0]; // crvena boja
        var blue_color = [0.1, 0.54, 0.98, 1.0]; // plava boja

        /********************* */

        mt2D.setIdentityMatrix();
        var vertices_el1 = generateElipsisVertices(6, 3);
        //mt2D.translate(mt2D.transX(4), mt2D.transY(0));
        mt2D.translate(4, 0);
        mt2D.rotate(MT2D.toRad(-30));
        mt2D.projection2D(-10, 10, -10, 10);
        fillBuffers(vertices_el1);

        gl.uniformMatrix3fv(u_mTrans, false, mt2D.list());
        gl.uniform4fv(u_boja, red_color);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices_el1.length / 2);

        /********************* */

        mt2D.setIdentityMatrix();
        var vertices_el2 = generateElipsisVertices(6, 3);
        mt2D.rotate(MT2D.toRad(-30));
        mt2D.translate(4, 0);
        mt2D.projection2D(-10, 10, -10, 10);
        fillBuffers(vertices_el2);

        gl.uniformMatrix3fv(u_mTrans, false, mt2D.list());
        gl.uniform4fv(u_boja, blue_color);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices_el2.length / 2);

        /********************* */

        mt2D.setIdentityMatrix();
        var vertices_el3 = generateElipsisVertices(4, 1);
        mt2D.rotate(MT2D.toRad(75));
        mt2D.translate(3, 0);
        mt2D.mirrorForY();
        mt2D.projection2D(-10, 10, -10, 10);
        fillBuffers(vertices_el3);

        gl.uniformMatrix3fv(u_mTrans, false, mt2D.list());
        gl.uniform4fv(u_boja, green_color);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices_el3.length / 2);
    }

    draw();
}