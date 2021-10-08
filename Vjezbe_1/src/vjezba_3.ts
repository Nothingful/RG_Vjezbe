function vjezba_3(): void{
   var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

   if (!canvas){
      alert("No canvas found!");
   }

   const X_MIN = -5;
   const X_MAX = 5;
   const Y_MIN = X_MIN;
   const Y_MAX = X_MAX;

   var gks = new GKS(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);

   // DRAW X AXIS LINE
   gks.moveTo(0, 5);
   gks.lineTo(0, -5);
   gks.stroke();

   // DRAW Y AXIS LINE
   gks.moveTo(5, 0);
   gks.lineTo(-5, 0);
   gks.stroke();

   // DRAW PARABOLA
   const MOVE = 0.1;
   gks.strokeStyle("red");
   gks.moveTo(-5, (0.5 * -5 * -5) - 3);
   for (let X = -5; X < 5; X += MOVE) {
      let Y = ((0.5 * X * X) - 3);
      gks.lineTo(X,Y);
   }
   gks.stroke();
}

document.addEventListener('DOMContentLoaded', function () {
   vjezba_3();
});