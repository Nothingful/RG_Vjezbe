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
     * Moves the "pet" to the canvas scaled X and Y coordinates
     * @param {number} X - global X coordinate
     * @param {number} Y - global Y coordinate
     */
    public moveTo(X: number, Y: number): void {
        this.context.beginPath();
        this.context.moveTo(this.scaleX(X), this.scaleY(Y));
    }

    /**
     * Moves a line to the canvas scaled X and Y coordinates
     * @param {number} X - global X coordinate
     * @param {number} Y - global Y coordinate
     */
    public lineTo(X: number, Y: number): void {
        this.context.lineTo(this.scaleX(X), this.scaleY(Y));
    }

    /**
     * Draws a line by calling HTML5 routine stroke()
     */
    public stroke(): void {
        this.context.stroke();
    }

    /**
     * Draws text by calling HTML5 routine stroke()
     */
     public strokeText(text: string, X: number, Y: number): void {
        this.context.strokeText(text, this.scaleX(X), this.scaleY(Y));
    }

    /**
     * Set line color (npr. "red", "green", "blue", "black")
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

    /** Draw a standard coordinate system based on xmin, xmax, ymin and ymax */
    public drawCoordinateSystem(): void{
        const MOVE = 1;

        // DRAW X AXIS LINE
        this.moveTo(this.xmin, 0);
        this.lineTo(this.xmax, 0);
        this.stroke();
        // DRAW X AXIS POINTS AND NUMBERS
        for (let X = this.xmin; X < this.xmax; X += MOVE) {
            this.moveTo(X,0);
            this.lineTo(X,0+0.05);
            this.stroke();
            this.moveTo(X,0);
            this.lineTo(X,0-0.05);
            this.stroke();
            if (X != 0) this.strokeText(X.toString(),X,-0.2);
        }

        // DRAW Y AXIS LINE
        this.moveTo(0, this.ymin);
        this.lineTo(0, this.ymax);
        this.stroke();
        // DRAW Y AXIS POINTS AND NUMBERS
        for (let Y = this.ymin; Y < this.ymax; Y += MOVE) {
            let X = 0;
            this.moveTo(X,Y);
            this.lineTo(X+0.05,Y);
            this.stroke();
            this.moveTo(X,Y);
            this.lineTo(X-0.05,Y);
            this.stroke();
            if (Y != 0) this.strokeText(Y.toString(),0.2,Y);
        }
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