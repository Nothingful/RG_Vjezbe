/**
 * Class for 3D matrix manipulation
 */
 class MT3D {
    public matrix: number[][];

    constructor() {
        this.setIdentityMatrix();
    }

    /**
     * Returns identity matrix
     * @returns {number[][]} Identity matrix
     */
    public static getIdentityMatrix(): number[][] {
        return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
    }

    public static toRad(degrees: number): number {
        return degrees * Math.PI / 180;
    }

    /** Set identity matrix */
    public setIdentityMatrix(): void {
        this.matrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
    }

    /**
     * Multiplies current MT"D matrix with input matrix
     * @param m input matrix
     */
    public mult(m: number[][]) {
        let m1 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for (let i=0; i<4; i++){
            for (let j=0; j<4; j++){
                for (let k=0; k<4; k++){
                    m1[i][j] += m[i][k] * this.matrix[k][j];
                }
            }
        }
        this.matrix = m1;
    }

    /**
     * Appyl transormation matrix for translation
     * @param px X translation factor
     * @param py Y translation factor
     * @param pz Z translation factor
     */
    public translate(px: number, py: number, pz: number): void {
        let m = [[1,0,0,px],[0,1,0,py],[0,0,1,pz],[0,0,0,1]];
        this.mult(m);
    }

    /**
     * Apply transormation matrix for scaling
     * @param sx X scale factor
     * @param sy Y scale factior
     * @param sz Z scale factior
     */
    public scale(sx: number, sy: number, sz: number): void {
        let m = [[sx,0,0,0],[0,sy,0,0],[0,0,sz,0],[0,0,0,1]];
        this.mult(m);
    }

    /**
     * Apply transormation matrix for rotation around X axis
     * @param angle rotation angle (in radians)
     */
     public rotateAroundX(angle: number): void {
        let m = [[1,0,0,0],[0,Math.cos(angle),-Math.sin(angle),0],[0,Math.sin(angle),Math.cos(angle),0],[0,0,0,1]];
        this.mult(m);
    }

    /**
     * Apply transormation matrix for rotation around Y axis
     * @param angle rotation angle (in radians)
     */
     public rotateAroundY(angle: number): void {
        let m = [[Math.cos(angle),0,Math.sin(angle),0],[0,1,0,0],[-Math.sin(angle),0,Math.cos(angle),0],[0,0,0,1]];
        this.mult(m);
    }

    /**
     * Apply transormation matrix for rotation around Z axis
     * @param angle rotation angle (in radians)
     */
     public rotateAroundZ(angle: number): void {
        let m = [[Math.cos(angle),-Math.sin(angle),0,0],[Math.sin(angle),Math.cos(angle),0,0],[0,0,1,0],[0,0,0,1]];
        this.mult(m);
    }


    /** Apply transformation matrix that mirrors the vectors for X axis */
    public mirrorForX(): void {
        let m = [[1,0,0,0],[0,-1,0,0],[0,0,-1,0],[0,0,0,1]];
        this.mult(m);
    }

    /** Apply transformation matrix that mirrors the vectors for Y axis */
    public mirrorForY(): void {
        let m = [[-1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,1]];
        this.mult(m);
    }

    /** Apply transformation matrix that mirrors the vectors for Z axis */
    public mirrorForZ(): void {
        let m = [[-1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,1]];
        this.mult(m);
    }

    /** Apply transformation matrix that mirrors the vectors for XY plane */
    public mirrorForXY(): void {
        let m = [[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,1]];
        this.mult(m);
    }

    /** Apply transformation matrix that mirrors the vectors for XZ plane */
    public mirrorForXZ(): void {
        let m = [[1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,1]];
        this.mult(m);
    }

    /** Apply transformation matrix that mirrors the vectors for YZ plane */
    public mirrorForYZ(): void {
        let m = [[-1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
        this.mult(m);
    }
}