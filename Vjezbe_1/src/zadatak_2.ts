/**
 * Globalni Koordinatni Sustav
 * 
 * Klasa za iscrtavanje na HTML canvasu i
 * konvertiranje matematickih X i Y koordinata na koordinate ekrana
 * @param {HTMLCanvasElement} canvas 
 * @param {number} xmin 
 * @param {number} xmax 
 * @param {number} ymin 
 * @param {number} ymax 
 */
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
        this.context = this.canvas.getContext("2d");

        var height: number = this.canvas.height;
        var width: number = this.canvas.width;
        
        this.SX = width / (this.xmax - this.xmin);
        this.SY = -height / (this.ymax - this.ymin);
        this.PX = -this.SX * this.xmin;
        this.PY = -this.SY * this.ymax;
    }

    /**
     * Postavlja "olovku" na poziciju (x, y) u globalnim koordinatama
     * @param {number} X 
     * @param {number} Y 
     */
    public moveTo(X: number, Y: number): void {
        this.context.beginPath();
        this.context.moveTo(this.scaleX(X), this.scaleY(Y));
    }

    /**
     * Povlači liniju od posljednje zapamćene pozicije do (x, y) u globalnim koordinatama
     * @param {number} X 
     * @param {number} Y 
     */
    public lineTo(X: number, Y: number): void {
        this.context.lineTo(this.scaleX(X), this.scaleY(Y));
    }

    /**
     * Povlači liniju pozivom HTML5-rutine stroke()
     */
    public stroke(): void {
        this.context.stroke();
    }

    /**
     * Linija se povlači bojom c (npr. "red", "green", "blue", "black")
     * @param {string | CanvasGradient | CanvasPattern} color 
     */
    public strokeStyle(color: string | CanvasGradient | CanvasPattern): void {
        this.context.strokeStyle = color;
    }

    /**
     * Update canvas size and context. Also update scaling variables.
     * @param canvas 
     */
    public updateCanvas(canvas: HTMLCanvasElement): void{
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        var height = this.canvas.height;
        var width = this.canvas.width;
        
        this.SX = width / (this.xmax - this.xmin);
        this.SY = -height / (this.ymax - this.ymin);
        this.PX = -this.SX * this.xmin;
        this.PY = -this.SY * this.ymax;
    }

    /** Return pixel value for X */
    private scaleX(X: number){
        return this.SX * X + this.PX;
    }

    /** Return pixel value for Y */
    private scaleY(Y: number){
        return this.SY * Y + this.PY;
    }
}

function zadatak_2(): void{
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
    zadatak_2();
 });