import { Observer } from "../controllers/base-controller";
import { ClockService } from "../services/clock-service";
import { BaseModel, Subject } from "./base-model";

export enum TimeZone {
    GMTm4 = -4,
    GMTm3 = -3,
    GMTm2 = -2,
    GMTm1 = -1,
    GMT0 = +0,
    GMT1 = +1,
    GMT2 = +2,
    GMT3 = +3,
    GMT4 = +4,
}

export enum Display {
    H24,
    AMPM
}

export class ClockModel extends BaseModel implements Observer {
    private hours: number;
    private minutes: number;
    private seconds: number;
    private timeZone: TimeZone;
    private display: Display;

    private service: ClockService;

    constructor(timeZone: TimeZone) {
        super();
        this.timeZone = timeZone;
        this.display = Display.H24;
        this.setCurrentTime();
        this.service = ClockService.getInstance();
        this.service.registerObserver(this);
    }

    getSeconds(): number {
        return this.seconds;
    }

    incrementSeconds() {
        this.seconds = (this.seconds + 1) % 60;
        if (this.seconds === 0) {
            this.incrementMinutes();
            return;
        }
        this.notifyObserver();
    }

    getMinutes(): number {
        return this.minutes;
    }

    incrementMinutes() {
        this.minutes = (this.minutes + 1) % 60;
        if (this.minutes === 0) {
            this.incrementHours();
            return;
        }
        this.notifyObserver();
    }

    getHours(): number {
        if (this.display === Display.AMPM && this.hours > 12) {
            return this.hours - 12;
        } else {
            return  this.hours;
        } 
    }

    incrementHours() {
        this.hours = (this.hours + 1) % 24;
        this.notifyObserver();
    }

    getTimeZone(): string {
        return this.timeZone >= 0 ? `GMT+${this.timeZone}` : `GMT${this.timeZone}`;
    }

    toggleDisplay() {
        this.display = this.display === Display.H24 ? Display.AMPM : Display.H24;
        this.notifyObserver();
    }

    getDisplay(): string {
        if (this.display === Display.H24) {
            return '';
        } else if (this.hours > 12) {
            return 'PM';
        } else {
            return 'AM';
        } 
    }

    reset() {
        this.display = Display.H24;
        this.setCurrentTime();
        this.notifyObserver();
    }

    // time methods

    private setCurrentTime() {
        const date = new Date();
        const hours = date.getHours();
        const offset = date.getTimezoneOffset() / -60;
        const delta = this.timeZone - offset;
        this.hours = (hours + delta + 24) % 24; // avoid negative values 
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
    }

    // observer methods
    update() {
        this.incrementSeconds();
    }
}