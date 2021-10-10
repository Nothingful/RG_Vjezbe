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

   /**
     * Draw geometric flower
     * @param a - flower outer edge
     * @param step - flower drawing decrement
     */
   function drawFlower(a_max: number, step: number): void {
      const MOVE = 0.01;
      gks.strokeStyle("red");
      for (let a = a_max; a > 0; a-=step) {
            var r = a * Math.sin(0);
            gks.moveTo(r * Math.cos(0), r * Math.sin(0));
            for (let t = 0; t < 2*Math.PI; t += MOVE) {
               r = a * Math.sin(4*t);
               let X = r * Math.cos(t);
               let Y = r * Math.sin(t);
               gks.lineTo(X,Y);
            }
            gks.stroke();
      }
      gks.strokeStyle("black");
   }

   drawFlower(4, 0.4);

   // Event listener for a slider
   document.querySelector("#a_range").addEventListener("change", function () {
      document.querySelector("#a_range_value").innerHTML = (this.valueAsNumber).toString();
      gks.clearCanvas();
      gks.strokeStyle("black");
      gks.drawCoordinateSystem();
      gks.strokeStyle("red");

      drawFlower(this.valueAsNumber, document.querySelector<HTMLInputElement>("#step_range").valueAsNumber / 100);
   });

   // Event listener for step slider
   document.querySelector("#step_range").addEventListener("change", function () {
      document.querySelector("#step_range_value").innerHTML = (this.valueAsNumber / 100).toString();
      gks.clearCanvas();
      gks.strokeStyle("black");
      gks.drawCoordinateSystem();
      gks.strokeStyle("red");

      drawFlower(document.querySelector<HTMLInputElement>("#a_range").valueAsNumber, this.valueAsNumber / 100);
   });
}

document.addEventListener('DOMContentLoaded', function () {
   zadaca_1_4();
});