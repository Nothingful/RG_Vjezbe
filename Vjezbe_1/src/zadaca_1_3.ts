function zadaca_1_3(): void{
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

   // DRAW BUTTERFLY
   const MOVE = 0.01;
   gks.strokeStyle("red");
   var constant = (Math.pow(Math.E, Math.cos(0)) - (2 * Math.cos(4*0)) + Math.pow(Math.sin(0/12), 5))
   gks.moveTo(constant * Math.sin(0), constant * Math.cos(0));
   for (let t = 0; t < 12*Math.PI; t += MOVE) {
      constant = (Math.pow(Math.E, Math.cos(t)) - (2 * Math.cos(4*t)) + Math.pow(Math.sin(t/12), 5));
      let X = constant * Math.sin(t);
      let Y = constant * Math.cos(t);
      gks.lineTo(X,Y);
   }
   gks.stroke();

   // Event listener for slider
   document.querySelector("#t_range").addEventListener("change", function () {
      document.querySelector("#t_range_value").innerHTML = this.valueAsNumber;
      gks.clearCanvas();
      gks.strokeStyle("black");
      gks.drawCoordinateSystem();
      gks.strokeStyle("red");
      var constant = (Math.pow(Math.E, Math.cos(0)) - (2 * Math.cos(4*0)) + Math.pow(Math.sin(0/12), 5))
      gks.moveTo(constant * Math.sin(0), constant * Math.cos(0));
      for (let t = 0; t < this.valueAsNumber*Math.PI; t += MOVE) {
         constant = (Math.pow(Math.E, Math.cos(t)) - (2 * Math.cos(4*t)) + Math.pow(Math.sin(t/12), 5));
         let X = constant * Math.sin(t);
         let Y = constant * Math.cos(t);
         gks.lineTo(X,Y);
      }
      gks.stroke();
   });
}

document.addEventListener('DOMContentLoaded', function () {
   zadaca_1_3();
});