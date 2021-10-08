class GKS {
    /** HTML canvas element */
    private canvas: HTMLCanvasElement;
    /** HTML canvas rendering context */
    private context: CanvasRenderingContext2D;
    private xmin: number;
    private xmax: number;
    private ymin: number;
    private ymax: number;

    private SX: number;
    private SY: number;
    private PX: number;
    private PY: number;

    constructor(canvas: HTMLCanvasElement, xmin: number, xmax: number, ymin: number, ymax: number) {
        this.canvas = canvas;
        this.xmax = xmax;
        this.xmin = xmin;
        this.ymax = ymax;
        this.ymin = ymin;
        this.context = canvas.getContext("2d");

        var height: number = this.canvas.height;
        var width: number = this.canvas.width;
        
        this.SX = width / (this.xmax - this.xmin);
        this.SY = -height / (this.ymax - this.ymin);
        this.PX = -this.SX * this.xmin;
        this.PY = -this.SY * this.ymax;
    }

    /** Return pixel value for X */
    public scaleX(X: number){
        return this.SX * X + this.PX;
    }

    /** Return pixel value for Y */
    public scaleY(Y: number){
        return this.SY * Y + this.PY;
    }
}

function zadatak_2(): void{
    var canvas = document.querySelector<HTMLCanvasElement>("#canvas");
 
    if (!canvas){
       alert("No canvas found!");
    }
    
    var height: number = canvas.height;
    var width: number = canvas.width;
    var g: CanvasRenderingContext2D = canvas.getContext("2d");

    const X_MIN = -5;
    const X_MAX = 5;
    const Y_MIN = X_MIN;
    const Y_MAX = X_MAX;
    
    const SX = width / (X_MAX - X_MIN);
    const SY = -height / (Y_MAX - Y_MIN);
    const PX = -SX * X_MIN;
    const PY = -SY * Y_MAX;

    function scaleX(X: number){
        return SX * X + PX;
    }

    function scaleY(Y: number){
        return SY * Y + PY;
    }

    // DRAW X AXIS LINE
    g.beginPath();
    g.moveTo(scaleX(0), scaleY(5));
    g.lineTo(scaleX(0), scaleY(-5));
    g.stroke();

    // DRAW Y AXIS LINE
    g.beginPath();
    g.moveTo(scaleX(5), scaleY(0));
    g.lineTo(scaleX(-5), scaleY(0));
    g.stroke();

    // DRAW PARABOLA
    const MOVE = 0.1;
    g.strokeStyle = "red";
    g.beginPath();
    for (let X = -5; X < 5; X+=MOVE) {
        let Y = ((0.5 * X * X) - 3);
        g.lineTo(scaleX(X),scaleY(Y));
    }
    g.stroke();
 }
 
 document.addEventListener('DOMContentLoaded', function () {
    zadatak_2();
 });