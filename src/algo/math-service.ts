import { Matrix3 } from "./matrix";

export class MathService {

    private static instance: MathService | null = null;

    constructor() {

    }

    static getInstance() {
        if (this.instance === null) {
            this.instance = new MathService();
        }
        return this.instance;
    }

    createTranslationMatrix(tx: number, ty: number): Matrix3 {
        return new Matrix3([
            [1, 0, tx],
            [0, 1, ty],
            [0, 0, 1]
        ]);
    }

    createRotationMatrix(teta: number): Matrix3 {
        return new Matrix3([
            [Math.cos(teta), -Math.sin(teta), 0],
            [Math.sin(teta), Math.cos(teta), 0],
            [0, 0, 1]
        ]);
    }

    createScalingMatrix(sx: number, sy: number): Matrix3 {
        return new Matrix3([
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1]
        ]);
    }
}