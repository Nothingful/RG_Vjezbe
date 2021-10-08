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

    /** Draw a standard centered coordinate system */
    public drawCoordinateSystem(): void{
        // DRAW X AXIS LINE
        this.moveTo(0, this.xmax);
        this.lineTo(0, this.xmin);
        this.stroke();

        // DRAW Y AXIS LINE
        this.moveTo(this.ymax, 0);
        this.lineTo(this.ymin, 0);
        this.stroke();
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