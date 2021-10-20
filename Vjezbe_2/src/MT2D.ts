/**
 * Class for matrix manipulation
 */
class MT2D {
    public matrix: number[][];

    constructor() {
        this.setIdentityMatrix();
    }

    /**
     * Returns identity matrix
     * @returns {number[][]} Identity matrix
     */
    public static getIdentityMatrix(): number[][] {
        return [[1,0,0],[0,1,0],[0,0,1]];
    }

    /** Set identity matrix */
    public setIdentityMatrix(): void {
        this.matrix = [[1,0,0],[0,1,0],[0,0,1]];
    }

    public mult(m) {
        let m1 = [[0,0,0],[0,0,0],[0,0,0]];
        for (let i=0; i<3; i++){
            for (let j=0; j<3; j++){
                for (let k=0; k<3; k++){
                    m1[i][j] = m[i][k] * m[k][j];
                }
            }
        }
        this.matrix = m1;
    }

    /**
     * Create transormation matrix for translation
     * @param px X translation factor
     * @param py Y translation factor
     */
    public translate(px: number, py: number): void {
        this.matrix = [[1,0,px],[0,1,py],[0,0,1]];
    }

    /**
     * Create transormation matrix for scaling
     * @param sx X scale factor
     * @param sy Y scale factior
     */
    public scale(sx: number, sy: number): void {
        this.matrix = [[sx,0,0],[0,sy,0],[0,0,1]];
    }

    /**
     * Create transormation matrix for rotation
     * @param angle rotation angle (in radians)
     */
    public rotate(angle: number): void {
        this.matrix = [[Math.cos(angle),-Math.sin(angle),0],[Math.sin(angle),Math.cos(angle),0],[0,0,1]];
    }

    /** Create transformation matrix that mirrors the vectors for X axis */
    public mirrorForX(): void {
        this.matrix = [[1,0,0],[0,-1,0],[0,0,1]];
    }

    /** Create transformation matrix that mirrors the vectors for Y axis */
    public mirrorForY(): void {
        this.matrix = [[-1,0,0],[0,1,0],[0,0,1]];
    }
    
    public stretch(alpha: number, beta: number): void {
        this.matrix = [[1,Math.tan(beta),0],[Math.tan(alpha),1,0],[0,0,1]];
    }
}