import { Vector } from "./vector";

export class Matrix3 {
    private value: number[][];

    constructor(value: number[][]) {
        if (value.length !== 3 || value.some(row => row.length !== 3)) {
            throw new Error('Must be 3x3 matrix');
        } 
        this.value = value;
    }

    getValue(): number[][] {
        return this.value;
    }

    inverse(): Matrix3 | null {
        const m = this.value;

        const determinant = 
            m[0][0] * (m[1][1] * m[2][2] - m[2][1] * m[1][2]) -
            m[0][1] * (m[1][0] * m[2][2] - m[2][0] * m[1][2]) +
            m[0][2] * (m[1][0] * m[2][1] - m[2][0] * m[1][1]);

        if (determinant === 0) {
            return null;
        }

        // inverse = (transpose of adjoint matrix) * 1/determinant
        return new Matrix3([
            [
                (m[1][1] * m[2][2] - m[2][1] * m[1][2]) / determinant,
                - (m[0][1] * m[2][2] - m[2][1] * m[0][2]) / determinant,
                (m[0][1] * m[1][2] - m[1][1] * m[0][2]) / determinant,
            ],
            [
                - (m[1][0] * m[2][2] - m[2][0] * m[1][2]) / determinant,
                (m[0][0] * m[2][2] - m[2][0] * m[0][2]) / determinant,
                - (m[0][0] * m[1][2] - m[1][0] * m[0][2]) / determinant,
            ],
            [
                (m[1][0] * m[2][1] - m[2][0] * m[1][1]) / determinant,
                - (m[0][0] * m[2][1] - m[2][0] * m[0][1]) / determinant,
                (m[0][0] * m[1][1] - m[1][0] * m[0][1]) / determinant,
            ],
        ]);
    }

    multiply(matrix: Matrix3): Matrix3 {
        const m1 = this.value;
        const m2 = matrix.value;

        const result = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    result[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        return new Matrix3(result);
    }

    transform(vector: Vector): Vector {
        const m = this.value;
        const v = vector.getValue();;

        const result = [0,0,0];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    result[i] += m[i][k] * v[k];
                }
            }
        }
        return new Vector(result[0], result[1], result[2]);
    }

    print() {
        console.log(this.value.map(row => row.join('\t')).join('\n'));
    }
}