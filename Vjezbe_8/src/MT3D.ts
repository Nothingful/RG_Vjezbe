/**
 * Class for 3D matrix manipulation
 */
 class MT3D {

    /**
     * 3x3 matrix, holds MT3D transformation data
     */
    public matrix: number[][];

    /**
     * 3x3 matrix, holds KSK transformation data
     */
    public camera: number[][];

    constructor() {
        this.setIdentityMatrix();
        this.camera = MT3D.getIdentityMatrix();
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
    private mult(m: number[][]): void {
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
     * Multiplies two matrices
     * @param m1 first 4x4 matrix
     * @param m2 second 4x4 matrix
     * @returns {number[][]} new matrix
     */
    public static multiplyMatrices(m1: number[][], m2: number[][]): number[][] {
        let rez = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for (let i=0; i<4; i++){
            for (let j=0; j<4; j++){
                for (let k=0; k<4; k++){
                    rez[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        return rez;
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

    /**
     * Transforms GKS coordinates to KSK coordinates
     * @param x0 GKS X coordinate
     * @param y0 GKS Y coordinate
     * @param z0 GKS Z coordinate
     * @param x1 Camera X coordinate
     * @param y1 Camera Y coordinate
     * @param z1 Camera Z coordinate
     * @param Vx view-up vector X coordinate
     * @param Vy view-up vector Y coordinate
     * @param Vz view-up vector Z coordinate
     */
    public setCamera(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, Vx: number, Vy: number, Vz: number): void {
        let N = [x0-x1, y0-y1, z0-z1];
        let N_len = MT3D.VL(N);
        let n = MT3D.VN(N, N_len);
        
        let V = [Vx,Vy,Vz];
        
        let U = MT3D.VP(V, n);
        let U_len = MT3D.VL(U);
        let u = MT3D.VN(U, U_len);

        let v = MT3D.VP(n, u);

        this.camera = [[u[0],u[1],u[2],(-u[0]*x0)-(u[1]*y0)-(u[2]*z0)],
                       [v[0],v[1],v[2],(-v[0]*x0)-(v[1]*y0)-(v[2]*z0)],
                       [n[0],n[1],n[2],(-n[0]*x0)-(n[1]*y0)-(n[2]*z0)],
                       [   0,   0,   0,                             1]];
        //console.log(this.camera);
    }

    /**
     * Calculates vector product
     * @param u first 3x1 vector
     * @param v second 3x1 vector
     * @returns {number[]} vector 3x1 product
     */
    public static VP(u: number[], v: number[]): number[]{
        let vek = [0,0,0];
        vek[0] = (u[1]*v[2]) - (u[2]*v[1]);
        vek[1] = (u[2]*v[0]) - (u[0]*v[2]);
        vek[2] = (u[0]*v[1]) - (u[1]*v[0]);
        return vek;
    }

    /**
     * Calculates vector length
     * @param v input 3x1 vector
     * @returns {number} vetor length
     */
    public static VL(v: number[]): number {
        return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
    }

    /**
     * Calculates normalised vector
     * @param V input 3x1 vector
     * @param V_len input vector length
     * @returns {number[]} normalised 3x1 vector
     */
     public static VN(V: number[], V_len: number): number[] {
        return [V[0]/V_len, V[1]/V_len, V[2]/V_len];
    }

    /**
     * Transform MT3D matrix into 1D array for use with gl uniformMatrix4fv function
     * @returns List containing matrix members
     */
     public list() {
        var list = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                list.push(this.matrix[j][i]);
            }
        }
        return list;
    }

    /**
     * Maps the coordinates from the given range to the normalized coordinates between -1 and 1 
     * @param xmin 
     * @param xmax 
     * @param ymin 
     * @param ymax 
     */
    public projection2D(xmin: number, xmax: number, ymin: number, ymax: number) {
        let sx = 2 / (xmax - xmin);
        let sy = 2 / (ymax - ymin);
        let tx = (xmin + xmax) / (xmin - xmax);
        let ty = (ymin + ymax) / (ymin - ymax);

        this.mult([[sx, 0, tx, 0], [0, sy, ty, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
    }
}