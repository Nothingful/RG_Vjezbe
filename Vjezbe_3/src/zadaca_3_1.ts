function zadaca_3_1(): void{
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

    gks.drawCoordinateSystem();

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
        gks.strokeStyle("Red");
        gks.moveTo(2,-5,2);
        gks.lineTo(-3,5,-3);
        gks.stroke();
        
        // Draw cube
        gks.strokeStyle("Black");
        mat.setIdentityMatrix();
        mat.translate(1,1,0);
        mat.rotateAroundAxis(2,-5,2,-3,5,-3,MT3D.toRad(alpha));
        gks.trans(mat);
        cube(2);

        alpha += STEP;
        if (alpha >= 360) alpha = 0;
        requestAnimationFrame(rotating_cube);
    }

    gks.strokeStyle("red");
    rotating_cube();

    // Draw cube
    /*gks.strokeStyle("Black");
    mat.setIdentityMatrix();
    mat.translate(1,1,0);
    mat.rotateAroundAxis(2,-5,2,-3,5,-3,MT3D.toRad(alpha));
    gks.trans(mat);
    cube(2);*/
}

document.addEventListener('DOMContentLoaded', function () {
    zadaca_3_1();
});