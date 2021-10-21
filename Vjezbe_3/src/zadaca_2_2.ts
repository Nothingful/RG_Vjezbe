function zadaca_2_2(): void{
  var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

  if (!canvas){
    alert("No canvas found!");
  }

  const X_MIN = -15;
  const X_MAX = 16;
  const Y_MIN = -15;
  const Y_MAX = 16;

  var mat = new MT2D();
  var gks = new GKS(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);
  gks.trans(mat);

  //gks.drawCoordinateSystem();
  
  /**
   * Draw geometric butterfly
   * @param x - scale in X axis (default = 1)
   * @param y - scale in Y axis (default = 1)
   */
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

  /**
   * Draw geometric flower
   * @param a - flower outer edge
   * @param step - flower drawing decrement
   * @param x - scale in X axis (default = 1)
   * @param y - scale in Y axis (default = 1)
   */
  function drawFlower(a_max: number, step: number, x: number, y: number): void {
    const MOVE = 0.01;
    for (let a = a_max; a > 0; a-=step) {
      var r = a * Math.sin(0);
      gks.moveTo(r * Math.cos(0), r * Math.sin(0));
      for (let t = 0; t < 2*Math.PI; t += MOVE) {
          r = a * Math.sin(4*t);
          let X = r * Math.cos(t) * x;
          let Y = r * Math.sin(t) * y;
          gks.lineTo(X,Y);
      }
      gks.stroke();
    }
  }

  function left_side(){
    // Blue flower
    gks.strokeStyle("blue");
    mat.setIdentityMatrix();
    mat.rotate(MT2D.toRad(160));
    mat.translate(8, 10);
    gks.trans(mat);
    drawFlower(4, 0.4, 1, 1);

    // Blue line
    mat.setIdentityMatrix();
    gks.trans(mat);
    gks.lineTo(0, 0);
    gks.stroke();

    // Red butterfly
    gks.strokeStyle("red");
    mat.setIdentityMatrix();
    mat.rotate(MT2D.toRad(30));
    mat.stretch(0.3, 0);
    mat.translate(11, 0);
    gks.trans(mat);
    butterfly(1, 1);

    // Black butterfly
    gks.strokeStyle("black");
    mat.setIdentityMatrix();
    mat.rotate(MT2D.toRad(220));
    mat.stretch(-0.5, -0.5);
    mat.translate(8, -7);
    gks.trans(mat);
    butterfly(1, 1);
  }

  function right_side(){
    // Blue Flower
    gks.strokeStyle("blue");
    mat.setIdentityMatrix();
    mat.rotate(MT2D.toRad(160));
    mat.translate(8, 10);
    mat.mirrorForY();
    gks.trans(mat);
    drawFlower(4, 0.4, 1, 1);

    // Blue line
    mat.setIdentityMatrix();
    gks.trans(mat);
    gks.lineTo(0, 0);
    gks.stroke();

    // Red butterfly
    gks.strokeStyle("red");
    mat.rotate(MT2D.toRad(30));
    mat.stretch(0.3, 0);
    mat.translate(11, 0);
    mat.mirrorForY();
    gks.trans(mat);
    butterfly(1, 1);

    // Black butterfly
    gks.strokeStyle("black");
    mat.setIdentityMatrix();
    mat.rotate(MT2D.toRad(220));
    mat.stretch(-0.5, -0.5);
    mat.translate(8, -7);
    mat.mirrorForY();
    gks.trans(mat);
    butterfly(1, 1);
  }
  
  function middle(){
    // Blue butterfly
    gks.strokeStyle("blue");
    mat.setIdentityMatrix();
    mat.translate(0, -11);
    gks.trans(mat);
    drawFlower(4, 0.4, 1, 1);

    // Blue line
    mat.setIdentityMatrix();
    gks.trans(mat);
    gks.lineTo(0, 0);
    gks.stroke();
  }
  
  left_side();
  right_side();
  middle();

}

document.addEventListener('DOMContentLoaded', function () {
  zadaca_2_2();
});