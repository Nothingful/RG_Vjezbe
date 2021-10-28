function vjezba_4_1(): void{
  var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

  if (!canvas){
    alert("No canvas found!");
  }

  const X_MIN = -9;
  const X_MAX = 10;
  const Y_MIN = -9;
  const Y_MAX = 10;

  var mat = new MT2D();
  var gks = new GKS(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);
  gks.trans(mat);

  //gks.drawCoordinateSystem();

  function elipsis(a: number, b: number) {
    const MOVE = 0.01;
    gks.moveTo(a * Math.cos(0), b * Math.sin(0));
    for (let t = 0; t < 2*Math.PI; t += MOVE) {
        let X = a * Math.cos(t);
        let Y = b * Math.sin(t);
        gks.lineTo(X,Y);
    }
    gks.stroke();
  }

  const STEP = 1;
  var alpha = 0;
  function ventilator(){
    gks.clearCanvas();
    //gks.drawCoordinateSystem();
    gks.strokeText("Alpha: "+alpha+"°", -8.5, 9);
    elipsis(0.2, 0.2);
    
    mat.translate(-3.5,0);
    mat.rotate(MT2D.toRad(alpha));
    gks.trans(mat);
    elipsis(4, 0.8);
    
    mat.setIdentityMatrix();
    mat.translate(-3.5,0);
    mat.rotate(MT2D.toRad(alpha+120));
    gks.trans(mat);
    elipsis(4, 0.8);
    
    mat.setIdentityMatrix();
    mat.translate(-3.5,0);
    mat.rotate(MT2D.toRad(alpha+240));
    gks.trans(mat);
    elipsis(4, 0.8);
    
    alpha += STEP;
    if (alpha >= 360) alpha = 0;
    mat.setIdentityMatrix();
    gks.trans(mat);
    requestAnimationFrame(ventilator);
  }

  gks.strokeStyle("black");
  ventilator();
}

document.addEventListener('DOMContentLoaded', function () {
  vjezba_4_1();
});