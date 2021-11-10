function zadaca_4_1(): void{
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

    if (!canvas){
        alert("No canvas found!");
    }

    const X_MIN = -100;
    const X_MAX = 100;
    const Y_MIN = -100;
    const Y_MAX = 100;

    var mat = new MT3D();
    var gks = new Persp(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX, 80);
    mat.setCamera(3, 7, 4, 1, 1, 4, 0, 0, 1);
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
        gks.moveTo(a, 0, 0);
        gks.lineTo(a, a, 0);
        gks.lineTo(0, a, 0);
        gks.lineTo(0, 0, 0);
        gks.lineTo(a, 0, 0);
        gks.lineTo(a, 0, a);
        gks.lineTo(a, a, a);
        gks.lineTo(0, a, a);
        gks.lineTo(0, 0, a);
        gks.lineTo(a, 0, a);
        gks.stroke();
        gks.moveTo(a, a, a);
        gks.lineTo(a, a, 0);
        gks.stroke();
        gks.moveTo(0, a, a);
        gks.lineTo(0, a, 0);
        gks.stroke();
        gks.moveTo(0, 0, a);
        gks.lineTo(0, 0, 0);
        gks.stroke();
    }

    function draw_grid() {
        for(let x=-5; x<=5; x=x+0.5){
            gks.moveTo(5 , x, 0);
            gks.lineTo(-5, x, 0);
            gks.stroke();
        }
        for(let y=-5; y<=5; y=y+0.5){
            gks.moveTo(y, 5, 0);
            gks.lineTo(y, -5, 0);
            gks.stroke();
        }
    }

    const STEP = 0.5;
    var alpha = 0;
    function rotating_cube() {
        gks.clearCanvas();
        mat.setIdentityMatrix();
        gks.trans(mat);
        
        // Draw axis
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

    var min_z = 5;
    var max_z = 10;
    var set_z = 7;
    var gore = true;
    function big_F(){
        gks.clearCanvas();
        mat.setIdentityMatrix();
        gks.trans(mat);
        gks.strokeStyle("black");
        
        // Set Camera
        mat.setCamera(6,6,set_z, 2,2,4, 1,1,2);
        gks.trans(mat);
        
        // Draw Grid
        mat.setIdentityMatrix();
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        gks.strokeStyle("red");
        draw_grid();

        // Draw Big F
        gks.strokeStyle("black");
        let a = 1;
        mat.setIdentityMatrix();
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        cube(a);

        mat.translate(0, 0, a);
        gks.trans(mat);
        cube(a);

        mat.translate(0, 0, a);
        gks.trans(mat);
        cube(a);

        mat.translate(0, 0, a);
        gks.trans(mat);
        cube(a);

        mat.translate(0, 0, a);
        gks.trans(mat);
        cube(a);

        mat.setIdentityMatrix();
        mat.translate(0, a, 4*a);
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        cube(a);

        mat.setIdentityMatrix();
        mat.translate(0, 2*a, 4*a);
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        cube(a);

        mat.setIdentityMatrix();
        mat.translate(0, a, 2*a);
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        cube(a);

        alpha += STEP;
        if (alpha >= 360) alpha = 0;
        if( gore == true){
            set_z = set_z + 0.01;
            if(set_z > max_z){
                gore = false;
            }
        }else {
            set_z = set_z - 0.01;
            if(set_z < min_z){
                gore = true;
            }
        }
        requestAnimationFrame(big_F);
    }

    big_F();
}

document.addEventListener('DOMContentLoaded', function () {
    zadaca_4_1();
});