function vjezba_4_2(): void{
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
        console.log(half);
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

    gks.strokeStyle("red");
    mat.rotateAroundX(MT3D.toRad(30));
    gks.trans(mat);
    cube(8);

    mat.setIdentityMatrix();
    gks.strokeStyle("green");
    mat.rotateAroundY(MT3D.toRad(30));
    gks.trans(mat);
    cube(8);

    mat.setIdentityMatrix();
    gks.strokeStyle("blue");
    mat.rotateAroundZ(MT3D.toRad(30));
    gks.trans(mat);
    cube(8);

    mat.setIdentityMatrix();
    gks.strokeStyle("black");
    mat.rotateAroundX(MT3D.toRad(30));
    mat.rotateAroundY(MT3D.toRad(30));
    mat.rotateAroundZ(MT3D.toRad(30));
    gks.trans(mat);
    cube(8);
}

document.addEventListener('DOMContentLoaded', function () {
    vjezba_4_2();
});