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

    /**
     * Converts degrees to radians
     * @param degrees value expressed in degrees
     * @returns value expressed in radians
     */
    public static toRad(degrees: number): number {
        return degrees * Math.PI / 180;
    }

    /** Set identity matrix */
    public setIdentityMatrix(): void {
        this.matrix = MT3D.getIdentityMatrix();
    }

    /**
     * Multiplies current MT3D matrix with input matrix
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

    /**
     * Apply transormation matrix for rotation around a given axis
     * @param x0 Vertex X coordinate
     * @param y0 Vertex Y coordinate
     * @param z0 Vertex X coordinate
     * @param u1 Vector X component (Or X coordinate of second vertex)
     * @param u2 Vector Y component (Or Y coordinate of second vertex)
     * @param u3 Vector Z component (Or Z coordinate of second vertex)
     * @param angle rotation angle (in radians)
     */
    public rotateAroundAxis(x0: number, y0: number, z0: number, u1: number, u2: number, u3: number, angle: number): void {
        let a = (u1 - x0) / (Math.sqrt(((u1 - x0)*(u1 - x0)) + ((u2 - y0)*(u2 - y0)) + ((u3 - z0)*(u3 - z0))))
        let b = (u2 - y0) / (Math.sqrt(((u1 - x0)*(u1 - x0)) + ((u2 - y0)*(u2 - y0)) + ((u3 - z0)*(u3 - z0))))
        let c = (u3 - z0) / (Math.sqrt(((u1 - x0)*(u1 - x0)) + ((u2 - y0)*(u2 - y0)) + ((u3 - z0)*(u3 - z0))))
        let d = Math.sqrt((b*b) + (c*c));

        this.translate(-x0, -y0, -z0);
        this.rotateAroundX(Math.asin(b/d));
        this.rotateAroundY(-Math.asin(a));
        this.rotateAroundZ(angle);
        this.rotateAroundY(Math.asin(a));
        this.rotateAroundX(-Math.asin(b/d));
        this.translate(x0, y0, z0);
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