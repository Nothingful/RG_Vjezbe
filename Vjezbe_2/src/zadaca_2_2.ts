function zadaca_2_2(): void{
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

  gks.drawCoordinateSystem();

  function line(k: number, l: number) {
    gks.moveTo(X_MIN, k*X_MIN + l);
    gks.lineTo(X_MAX, k*X_MAX + l)
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

  function butterfly(x: number, y: number) {
    const MOVE = 0.01;
    var constant = (Math.pow(Math.E, Math.cos(0)) - (2 * Math.cos(4*0)) + Math.pow(Math.sin(0/12), 5))
    gks.moveTo(constant * Math.sin(0), constant * Math.cos(0));
    for (let t = 0; t < 12*Math.PI; t += MOVE) {
      constant = (Math.pow(Math.E, Math.cos(t)) - (2 * Math.cos(4*t)) + Math.pow(Math.sin(t/12), 5));
      let X = constant * Math.sin(t) * x;
      let Y = constant * Math.cos(t) * y;
      gks.lineTo(X,Y);
    }
    gks.stroke();
  }


  function train_wheel() {
    gks.trans(mat);
    elipsis(0.5, 0.5);
  }

  // Red line
  gks.strokeStyle("blue");
  line(3, 6);

  //butterfly(1, 1);

}

document.addEventListener('DOMContentLoaded', function () {
  zadaca_2_2();
});