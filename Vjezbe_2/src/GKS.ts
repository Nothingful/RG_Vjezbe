/**
 * Globalni Koordinatni Sustav
 * 
 * Klasa za iscrtavanje na HTML canvasu i
 * konvertiranje matematickih X i Y koordinata na koordinate ekrana
 * @param {HTMLCanvasElement} canvas - HTML canvas element
 * @param {number} xmin - minimum system X coordinate
 * @param {number} xmax - maximum system X coordinate
 * @param {number} ymin - minimum system Y coordinate
 * @param {number} ymax - maximum system Y coordinate
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

    public SX: number;
    public SY: number;
    public PX: number;
    public PY: number;

    public matrix: number[][];

    constructor(canvas: HTMLCanvasElement, xmin: number, xmax: number, ymin: number, ymax: number) {
        this.canvas = canvas;
        this.xmax = xmax;
        this.xmin = xmin;
        this.ymax = ymax;
        this.ymin = ymin;
        this.context = this.canvas.getContext("2d");
        
        this.SX = this.canvas.width / (this.xmax - this.xmin);
        this.SY = -this.canvas.height / (this.ymax - this.ymin);
        //this.SY = -this.SX;
        this.PX = -this.SX * this.xmin;
        this.PY = -this.SY * this.ymax;
        //this.PY = this.canvas.height/2;

        this.matrix = MT2D.getIdentityMatrix();
    }

    /** Overrides contructor and creates special GKS for elipsis drawing */
    public static createElipsisGKS(canvas: HTMLCanvasElement, xmin: number, xmax: number): GKS {
        var gks = new GKS(canvas, xmin, xmax, 1, 1);
        gks.SY = -gks.SX;
        gks.PY = canvas.height/2;
        return gks;
    }

    /** Clear canvas */
    public clearCanvas(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /** Return pixel value for X */
    private scaleX(X: number): number {
        return this.SX * X + this.PX;
    }

    /** Return pixel value for Y */
    private scaleY(Y: number): number {
        return this.SY * Y + this.PY;
    }

    /**
     * Perfoms matrix transformations on X and Y coordinates
     * @param {number} X 
     * @param {number} Y 
     * @returns {[number, number]} new X and Y values
     */
    private matTransform(X: number, Y: number): [number, number] {
        let x_new = this.matrix[0][0]*X + this.matrix[0][1]*Y + this.matrix[0][2];
        let y_new = this.matrix[1][0]*X + this.matrix[1][1]*Y + this.matrix[1][2];
        return [x_new, y_new];
    }

    /**
     * Moves the "pet" to the canvas scaled X and Y coordinates
     * @param {number} X - global X coordinate
     * @param {number} Y - global Y coordinate
     */
    public moveTo(X: number, Y: number): void {
        this.context.beginPath();
        let [x_new, y_new] = this.matTransform(X, Y);
        this.context.moveTo(this.scaleX(x_new), this.scaleY(y_new));
    }

    /**
     * Moves a line to the canvas scaled X and Y coordinates
     * @param {number} X - global X coordinate
     * @param {number} Y - global Y coordinate
     */
    public lineTo(X: number, Y: number): void {
        let [x_new, y_new] = this.matTransform(X, Y);
        this.context.lineTo(this.scaleX(x_new), this.scaleY(y_new));
    }

    /**
     * Draws a line by calling HTML5 routine stroke()
     */
    public stroke(): void {
        this.context.stroke();
    }

    /**
     * Draws text by calling HTML5 routine strokeText()
     */
     public strokeText(text: string, X: number, Y: number): void {
        let [x_new, y_new] = this.matTransform(X, Y);
        this.context.strokeText(text, this.scaleX(x_new), this.scaleY(y_new));
    }

    /**
     * Set line color (e.q. "red", "green", "blue", "black")
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
            this.moveTo(X,0-0.05);
            this.lineTo(X,0+0.05);
            this.stroke();
            /*this.context.moveTo(this.scaleX(X), this.PX/2 - 5);
            this.context.lineTo(this.scaleX(X), this.PX/2 + 5);*/
            /*this.moveTo(X, this.PX - 0.5);
            this.lineTo(X, this.PX + 0.5);*/
            this.stroke();
            if (X != 0) this.strokeText(X.toString(),X,-0.3);
        }

        // DRAW Y AXIS LINE
        this.moveTo(0, this.ymin);
        this.lineTo(0, this.ymax);
        this.stroke();
        // DRAW Y AXIS POINTS AND NUMBERS
        for (let Y = this.ymin; Y < this.ymax; Y += MOVE) {
            this.moveTo(0-0.05,Y);
            this.lineTo(0+0.05,Y);
            this.stroke();
            if (Y != 0) this.strokeText(Y.toString(),0.2,Y);
        }
    }

    /**
     * Update GKS transformation matrix
     * @param m MT2D matrix object
     */
    public trans(m: MT2D) {
        this.matrix = m.matrix;
    }
}