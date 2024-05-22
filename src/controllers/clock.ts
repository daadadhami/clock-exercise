import { MathService } from "../algo/math-service";
import { Matrix3 } from "../algo/matrix";
import { ClockModel } from "../models/clock-model";
import { ClockView } from "../views/clock-view";
import { BaseController } from "./base-controller";


export class Clock extends BaseController<ClockModel, ClockView> {

    private counter: number = 0; // mode button click count
    private isEnabledIncreaseHours: boolean; // increase button initial state 
    private transformationMatrix: Matrix3;

    private mathService: MathService;

    constructor(model: ClockModel, view: ClockView) {
        super(model, view);
        this.mathService = MathService.getInstance();
    }

    protected bindListeners() {
        this.view.onClickModeButton(this.toggleMode.bind(this));
        this.view.onClickIncreaseButton(this.incrementTime.bind(this));
        this.view.onClickLightButton(this.toggleLight.bind(this));
        this.view.onClickDisplayButton(this.toggleDisplay.bind(this));
        this.view.onClickResetButton(this.reset.bind(this));
        this.view.onClickAnimateButton(this.animateClock.bind(this));
    }

    protected updateView() {
        this.view.setHours(this.model.getHours());
        this.view.setMinutes(this.model.getMinutes());
        this.view.setSeconds(this.model.getSeconds());
        this.view.setTimeZone(this.model.getTimeZone());
        this.view.setDisplay(this.model.getDisplay());
    }

    // view methods

    private toggleMode() {
        this.counter = (this.counter + 1) % 3;
        switch (this.counter) {
            case 1:
                // enable increment hours
                this.view.enableIncreaseButton(true);
                this.isEnabledIncreaseHours = true;
                this.view.selectHours();
                break;
            case 2:
                // enable increment minutes
                this.view.enableIncreaseButton(true);
                this.isEnabledIncreaseHours = false;
                this.view.selectMinutes();
                break;
            default:
                // disable increment button
                this.view.enableIncreaseButton(false);
                this.view.removeSelection();
                break;
        }
    }

    private incrementTime() {
        if (!this.view.isEnabledIncreaseButton()) {
            return;
        }

        if (this.isEnabledIncreaseHours) {
            this.incrementHours();
        } else {
            this.incrementMinutes();
        }
    }

    private toggleLight() {
        this.view.toggleLight();
    }

    private animateClock() {
        // doc css 
        // a	c	tx
        // b	d	ty
        // 0	0	1
        // matrix([a b c d tx ty])

        if (this.transformationMatrix !== undefined && this.transformationMatrix !== null) {
            const inverseTransformationMatrix = this.transformationMatrix.inverse();
            const t = inverseTransformationMatrix.getValue();
            this.view.startAnimation(t[0][0], t[1][0], t[0][1], t[1][1], t[0][2], t[1][2]);
            this.transformationMatrix = null;
        } else {
            // scale and rotate over arbitrary point
            this.transformationMatrix = this.mathService.createScalingMatrix(2, 2);
            this.transformationMatrix = this.transformationMatrix.multiply(this.mathService.createTranslationMatrix(50, 50));
            this.transformationMatrix = this.transformationMatrix.multiply(this.mathService.createRotationMatrix(45));
            this.transformationMatrix = this.transformationMatrix.multiply(this.mathService.createTranslationMatrix(-50, -50));
            const t = this.transformationMatrix.getValue();
            this.view.startAnimation(t[0][0], t[1][0], t[0][1], t[1][1], t[0][2], t[1][2]);
        }
    }

    // model methods

    private incrementHours() {
        this.model.incrementHours();
    }

    private incrementMinutes() {
        this.model.incrementMinutes();
    }

    private toggleDisplay() {
        this.model.toggleDisplay();
    }

    private reset() {
        this.model.reset();
    }
}