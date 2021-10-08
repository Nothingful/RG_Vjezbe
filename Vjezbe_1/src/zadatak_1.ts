
function zadatak_1(): void{
   var canvas: HTMLCanvasElement = document.querySelector("#canvas");

   if (!canvas){
      alert("No canvas found!");
   }

   const DIST_X = 30;
   const DIST_Y = DIST_X;

   var height: number = canvas.height;
   var width: number = canvas.width;
   var g: CanvasRenderingContext2D = canvas.getContext("2d");

   // DRAW X LINES
   for (let index = 0; index < width; index++) {
      g.beginPath();
      g.moveTo(index * DIST_X, 0);
      g.lineTo(index * DIST_X, height);
      g.stroke();
   }

   // DRAW Y LINES
   for (let index = 0; index < height; index++) {
      g.beginPath();
      g.moveTo(0, index * DIST_Y);
      g.lineTo(width, index * DIST_Y);
      g.stroke();
   }
}

document.addEventListener('DOMContentLoaded', function () {
   zadatak_1();
});