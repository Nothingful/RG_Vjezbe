function zadaca_1_2(): void{
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");
 
    if (!canvas){
       alert("No canvas found!");
    }
 
    const X_MIN = -5;
    const X_MAX = 5;
    const Y_MIN = -5;
    const Y_MAX = 5;
 
    var mat = new MT2D();
    var gks = new GKS(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);
 
    gks.drawCoordinateSystem();
 
    // DRAW ELIPSIS
    const a = 4;
    const b = 2;
    const MOVE = 0.01;
    gks.strokeStyle("red");
    gks.moveTo(a * Math.cos(0), b * Math.sin(0));
    for (let t = 0; t < 2*Math.PI; t += MOVE) {
        let X = a * Math.cos(t);
        let Y = b * Math.sin(t);
        gks.lineTo(X,Y);
    }
    gks.stroke();
 }
 
 document.addEventListener('DOMContentLoaded', function () {
    zadaca_1_2();
 });