function vjezba_3_1(): void{
  var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

  if (!canvas){
    alert("No canvas found!");
  }

  const X_MIN = -7;
  const X_MAX = 10;
  const Y_MIN = -6;
  const Y_MAX = 6;

  var mat = new MT2D();
  var gks = new GKS(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);
  gks.trans(mat);

  gks.drawCoordinateSystem();

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
  gks.strokeStyle("red");
  mat.translate(4,2);
  gks.trans(mat);
  elipsis(4, 2);

  gks.strokeStyle("blue");
  mat.rotate(MT2D.toRad(30));
  gks.trans(mat);
  elipsis(4, 2);
}

document.addEventListener('DOMContentLoaded', function () {
  vjezba_3_1();
});