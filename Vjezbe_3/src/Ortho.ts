/**
 * Klasa za ortogonalnu projekciju linija
 * definiranih u 3D globalnom koordinatnom sustavu na xy-ravninu
 * @param {HTMLCanvasElement} canvas - HTML canvas element
 * @param {number} xmin - minimum system X coordinate
 * @param {number} xmax - maximum system X coordinate
 * @param {number} ymin - minimum system Y coordinate
 * @param {number} ymax - maximum system Y coordinate
 */
 class Ortho {
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

        this.matrix = MT3D.getIdentityMatrix();
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
     * @param {number} Z 
     * @returns {[number, number]} new X and Y values
     */
    private matTransform(X: number, Y: number, Z: number): [number, number] {
        let x_new = this.matrix[0][0]*X + this.matrix[0][1]*Y + this.matrix[0][2]*Z + this.matrix[0][3];
        let y_new = this.matrix[1][0]*X + this.matrix[1][1]*Y + this.matrix[1][2]*Z + this.matrix[1][3];
        return [x_new, y_new];
    }

    /**
     * Moves the "pen" to the canvas scaled X and Y coordinates
     * @param {number} X - global X coordinate
     * @param {number} Y - global Y coordinate
     * @param {number} Z - global Z coordinate
     */
    public moveTo(X: number, Y: number, Z: number): void {
        this.context.beginPath();
        let [x_new, y_new] = this.matTransform(X, Y, Z);
        this.context.moveTo(this.scaleX(x_new), this.scaleY(y_new));
    }

    /**
     * Moves a line to the canvas scaled X and Y coordinates
     * @param {number} X - global X coordinate
     * @param {number} Y - global Y coordinate
     * @param {number} Z - global Z coordinate
     */
    public lineTo(X: number, Y: number, Z: number): void {
        let [x_new, y_new] = this.matTransform(X, Y, Z);
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
     public strokeText(text: string, X: number, Y: number, Z: number): void {
        let [x_new, y_new] = this.matTransform(X, Y, Z);
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
        this.moveTo(this.xmin, 0, 0);
        this.lineTo(this.xmax, 0, 0);
        this.stroke();
        // DRAW X AXIS POINTS AND NUMBERS
        for (let X = this.xmin; X < this.xmax; X += MOVE) {
            this.moveTo(X,0-0.1, 0);
            this.lineTo(X,0+0.1, 0);
            this.stroke();
            if (X != 0) this.strokeText(X.toString(),X,-0.3, 0);
        }

        // DRAW Y AXIS LINE
        this.moveTo(0, this.ymin, 0);
        this.lineTo(0, this.ymax, 0);
        this.stroke();
        // DRAW Y AXIS POINTS AND NUMBERS
        for (let Y = this.ymin; Y < this.ymax; Y += MOVE) {
            this.moveTo(0-0.1,Y, 0);
            this.lineTo(0+0.1,Y, 0);
            this.stroke();
            if (Y != 0) this.strokeText(Y.toString(),0.2,Y, 0);
        }
    }

    /**
     * Update Ortho transformation matrix
     * @param m MT3D matrix object
     */
    public trans(m: MT3D) {
        this.matrix = m.matrix;
    }
}