import { Observer } from "../controllers/base-controller";
import { Subject } from "../models/base-model";


export class ClockService implements Subject {

    private static instance: ClockService | null = null;
    
    private clockModels: Observer[] = [];

    constructor() {
        setInterval(this.notifyObserver.bind(this), 1000); // init timer and update models
    }

    static getInstance() {
        if (this.instance === null) {
            this.instance = new ClockService();
        }
        return this.instance;
    }

    private notifyClockModels() {
        if (this.clockModels.length > 0) {
            this.clockModels.forEach(model => {
                model.update();
            })
        }
    }

    // subject methods
    registerObserver(observer: Observer): void {
       this.clockModels = [...this.clockModels, observer];
    }

    notifyObserver(): void {
        this.notifyClockModels();
    }
}