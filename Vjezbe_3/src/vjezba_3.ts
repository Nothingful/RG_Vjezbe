function vjezba_3_3(): void{
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

    if (!canvas){
        alert("No canvas found!");
    }

    const X_MIN = -9;
    const X_MAX = 10;
    const Y_MIN = -9;
    const Y_MAX = 10;

    var mat = new MT3D();
    var gks = new Ortho(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);
    gks.trans(mat);

    //gks.drawCoordinateSystem();

    function elipsis(a: number, b: number) {
        const MOVE = 0.01;
        gks.moveTo(a * Math.cos(0), b * Math.sin(0), 1);
        for (let t = 0; t < 2*Math.PI; t += MOVE) {
            let X = a * Math.cos(t);
            let Y = b * Math.sin(t);
            gks.lineTo(X,Y,1);
        }
        gks.stroke();
    }

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

    const STEP = 0.6;
    var alpha = 0;
    function rotating_cube() {
        gks.clearCanvas();
        mat.setIdentityMatrix();
        gks.trans(mat);

        mat.setIdentityMatrix();
        mat.rotateAroundX(MT3D.toRad(alpha));
        mat.rotateAroundY(MT3D.toRad(alpha));
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        cube(8);

        alpha += STEP;
        if (alpha >= 360) alpha = 0;
        requestAnimationFrame(rotating_cube);
    }

    gks.strokeStyle("red");
    rotating_cube();
}

document.addEventListener('DOMContentLoaded', function () {
    vjezba_3_3();
});