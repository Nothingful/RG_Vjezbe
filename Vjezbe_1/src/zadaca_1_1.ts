function zadaca_1_1(): void{
   var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

   if (!canvas){
      alert("No canvas found!");
   }

   const X_MIN = -2;
   const X_MAX = 8;
   const Y_MIN = -2;
   const Y_MAX = 2;

   var gks = new GKS(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);

   gks.drawCoordinateSystem();

   // DRAW SINE FUNCTION
   const MOVE = 0.01;
   gks.strokeStyle("red");
   gks.moveTo(0, Math.sin(0));
   for (let X = 0; X < 2*Math.PI; X += MOVE) {
      let Y = Math.sin(X);
      gks.lineTo(X,Y);
   }
   gks.stroke();
}

document.addEventListener('DOMContentLoaded', function () {
   zadaca_1_1();
});