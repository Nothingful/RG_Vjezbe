function zadaca_5_1(): void{
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

    if (!canvas){
        alert("No canvas found!");
    }

    const X_MIN = -100;
    const X_MAX = 100;
    const Y_MIN = -100;
    const Y_MAX = 100;

    var mat = new MT3D();
    var gks = new Persp(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX, 100);
    //mat.setCamera(3, 7, 4, 1, 1, 4, 0, 0, 1);
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

    const STEP = 0.5;
    var alpha = 0;

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
        gks.draw_grid(5);

        // Draw Big F
        gks.strokeStyle("black");
        let a = 1;
        mat.setIdentityMatrix();
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        gks.cube(a);

        mat.translate(0, 0, a);
        gks.trans(mat);
        gks.cube(a);

        mat.translate(0, 0, a);
        gks.trans(mat);
        gks.cube(a);

        mat.translate(0, 0, a);
        gks.trans(mat);
        gks.cube(a);

        mat.translate(0, 0, a);
        gks.trans(mat);
        gks.cube(a);

        mat.setIdentityMatrix();
        mat.translate(0, a, 4*a);
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        gks.cube(a);

        mat.setIdentityMatrix();
        mat.translate(0, 2*a, 4*a);
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        gks.cube(a);

        mat.setIdentityMatrix();
        mat.translate(0, a, 2*a);
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        gks.cube(a);

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

    function turbine() {
        gks.clearCanvas();
        mat.setIdentityMatrix();
        gks.trans(mat);
        gks.strokeStyle("black");
        
        // Set Camera
        mat.setCamera(8,8,10, 2,2,4, 1,1,2);
        gks.trans(mat);
        
        // Draw Grid
        mat.setIdentityMatrix();
        //mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        gks.strokeStyle("red");
        gks.draw_grid(10);

        // Draw turbine
        gks.strokeStyle("black");
        mat.setIdentityMatrix();
        //mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        gks.cone(5, 8, 16);

        mat.setIdentityMatrix();
        mat.rotateAroundZ(MT3D.toRad(alpha));
        mat.translate(0, 0, 6.5);
        gks.trans(mat);
        gks.cylinder(1, 2, 10);

        mat.setIdentityMatrix();
        mat.rotateAroundY(MT3D.toRad(90));
        mat.rotateAroundZ(MT3D.toRad(alpha));
        mat.translate(0, 0, 7.5);
        gks.trans(mat);
        gks.cylinder(0.3, 5, 10);

        mat.setIdentityMatrix();
        mat.rotateAroundY(MT3D.toRad(90));
        mat.rotateAroundZ(MT3D.toRad(alpha+120));
        mat.translate(0, 0, 7.5);
        gks.trans(mat);
        gks.cylinder(0.3, 5, 10);

        mat.setIdentityMatrix();
        mat.rotateAroundY(MT3D.toRad(90));
        mat.rotateAroundZ(MT3D.toRad(alpha+240));
        mat.translate(0, 0, 7.5);
        gks.trans(mat);
        gks.cylinder(0.3, 5, 10);

        mat.setIdentityMatrix();
        //mat.rotateAroundX(MT3D.toRad(90));
        mat.translate(6, -0.2, 7.5);
        mat.rotateAroundZ(MT3D.toRad(alpha));
        gks.trans(mat);
        gks.half_sphere(1, 12, 12);

        mat.setIdentityMatrix();
        //mat.rotateAroundX(MT3D.toRad(90));
        mat.translate(6, -0.2, 7.5);
        mat.rotateAroundZ(MT3D.toRad(alpha+120));
        gks.trans(mat);
        gks.half_sphere(1, 12, 12);

        mat.setIdentityMatrix();
        //mat.rotateAroundX(MT3D.toRad(90));
        mat.translate(6, -0.2, 7.5);
        mat.rotateAroundZ(MT3D.toRad(alpha+240));
        gks.trans(mat);
        gks.half_sphere(1, 12, 12);

        alpha += STEP;
        if (alpha >= 360) alpha = 0;
        requestAnimationFrame(turbine);
    }

    //big_F();
    turbine();
}

document.addEventListener('DOMContentLoaded', function () {
    zadaca_5_1();
});