import { Observer } from "../controllers/base-controller";

export interface Subject {
    registerObserver(observer: Observer): void;
    notifyObserver(): void;
}

export class BaseModel implements Subject {

    protected observer: Observer;

    registerObserver(observer: Observer): void {
        this.observer = observer;
    }

    notifyObserver(): void {
        this.observer?.update();
    }

}