function zadaca_2_1(): void{
  var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

  if (!canvas){
      alert("No canvas found!");
  }

  const X_MIN = -7;
  const X_MAX = 10;
  const Y_MIN = -2;
  const Y_MAX = 10;

  var mat = new MT2D();
  var gks = new GKS(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);
  gks.trans(mat);

  gks.drawCoordinateSystem();

  function line() {
    gks.moveTo(X_MIN, 3*X_MIN + 6);
    gks.lineTo(X_MAX, 3*X_MAX + 6)
    gks.stroke();
  }

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

  function train_body() {
    // Body
    gks.moveTo(0, 0);
    gks.lineTo(4, 0);
    gks.lineTo(4, 2);
    gks.lineTo(0, 2);
    gks.lineTo(0, 0);
    gks.stroke();

    // Body 2
    gks.moveTo(4, 0);
    gks.lineTo(6, 0);
    gks.lineTo(6, 3);
    gks.lineTo(4, 3);
    gks.lineTo(4, 0);
    gks.stroke();

    // Window
    gks.moveTo(4.2, 2);
    gks.lineTo(5.8, 2);
    gks.lineTo(5.8, 2.8);
    gks.lineTo(4.2, 2.8);
    gks.lineTo(4.2, 2);
    gks.stroke();
  }

  function train_wheel() {
    gks.trans(mat);
    elipsis(0.5, 0.5);
  }

  // Red line
  gks.strokeStyle("red");
  line();

  // Black train
  gks.strokeStyle("black");
  mat.translate(1, 2);
  gks.trans(mat);
  train_body();
  
  mat.setIdentityMatrix();
  mat.translate(2, 2);
  gks.trans(mat);
  train_wheel();

  mat.setIdentityMatrix();
  mat.translate(6, 2);
  gks.trans(mat);
  train_wheel();

  // Blue mirror train
  mat.setIdentityMatrix();
  gks.strokeStyle("blue");
  mat.translate(1, 2);
  mat.mirrorFor(3, 6);
  gks.trans(mat);
  train_body();

  mat.setIdentityMatrix();
  mat.translate(2, 2);
  mat.mirrorFor(3, 6);
  gks.trans(mat);
  train_wheel();

  mat.setIdentityMatrix();
  mat.translate(6, 2);
  mat.mirrorFor(3, 6);
  gks.trans(mat);
  train_wheel();
}

document.addEventListener('DOMContentLoaded', function () {
  zadaca_2_1();
});