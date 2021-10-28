function zadaca_4_1(): void{
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

    if (!canvas){
        alert("No canvas found!");
    }

    const X_MIN = -7;
    const X_MAX = 8;
    const Y_MIN = -7;
    const Y_MAX = 8;

    var mat = new MT3D();
    var gks = new Ortho(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);
    gks.trans(mat);

    //gks.drawCoordinateSystem();

    /**
     * Pravac između tocaka T1(x1,y1,z1) i T2(x2,y2,z2)
     */
    function line(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number){
        gks.moveTo(X_MIN, ((y2 - y1)/(x2 - x1)*(X_MIN - x1)) + y1, ((z2 - z1)/(x2 - x1)*(X_MIN - x1)) + z1);
        for (let x = X_MIN; x < X_MAX; x++) {
            let y = ((y2 - y1)/(x2 - x1)*(x - x1)) + y1;
            let z = ((z2 - z1)/(x2 - x1)*(x - x1)) + z1;
            gks.lineTo(x, y, z);
        }
        gks.stroke();
    }

    /**
     * Draw cube with sides length of a
     */
    function cube(a: number) {
        let half = a/2;
        gks.moveTo(half,-half,-half);
        gks.lineTo(half,half,-half);
        gks.lineTo(-half,half,-half);
        gks.lineTo(-half,-half,-half);
        gks.lineTo(half,-half,-half);
        gks.lineTo(half,-half,half);
        gks.lineTo(half,half,half);
        gks.lineTo(-half,half,half);
        gks.lineTo(-half,-half,half);
        gks.lineTo(half,-half,half);
        gks.stroke();
        gks.moveTo(half,half,half);
        gks.lineTo(half,half,-half);
        gks.stroke();
        gks.moveTo(-half,half,half);
        gks.lineTo(-half,half,-half);
        gks.stroke();
        gks.moveTo(-half,-half,half);
        gks.lineTo(-half,-half,-half);
        gks.stroke();
    }

    const STEP = 0.5;
    var alpha = 0;
    function rotating_cube() {
        gks.clearCanvas();
        mat.setIdentityMatrix();
        gks.trans(mat);
        
        // Draw axis
        /*gks.strokeStyle("Red");
        gks.moveTo(2,-5,2);
        gks.lineTo(-3,5,-3);
        gks.stroke();*/
        gks.strokeStyle("Red");
        line(2,-5,2,-3,5,-3);
        
        // Draw cube
        gks.strokeStyle("Black");
        mat.setIdentityMatrix();
        mat.translate(1,1,1);
        mat.rotateAroundAxis(2,-5,2,-3,5,-3,MT3D.toRad(alpha));
        gks.trans(mat);
        cube(2);

        alpha += STEP;
        if (alpha >= 360) alpha = 0;
        requestAnimationFrame(rotating_cube);
    }

    gks.strokeStyle("red");
    rotating_cube();
}

document.addEventListener('DOMContentLoaded', function () {
    zadaca_4_1();
});