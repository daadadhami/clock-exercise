export class Vector {
    private value: number[];

    constructor(x: number, y: number, z?: number) {
        if (z !== undefined && z !== null) {
            this.value = [x, y, z];
        } else {
            this.value = [x, y, 1];
        }
    }

    getValue(): number[] {
        return this.value;
    }

    print() {
        console.log(this.value);
    }
}