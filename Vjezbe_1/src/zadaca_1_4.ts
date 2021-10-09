function zadaca_1_4(): void{
   var canvas = document.querySelector<HTMLCanvasElement>("#canvas");

   if (!canvas){
      alert("No canvas found!");
   }

   const X_MIN = -5;
   const X_MAX = 5;
   const Y_MIN = -5;
   const Y_MAX = 5;

   var gks = new GKS(canvas, X_MIN, X_MAX, Y_MIN, Y_MAX);

   gks.drawCoordinateSystem();

   gks.drawFlower(4, 0.4);
}

document.addEventListener('DOMContentLoaded', function () {
   zadaca_1_4();
});