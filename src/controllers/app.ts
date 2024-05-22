import { AppModel, TimeZoneOption } from "../models/app-model";
import { AppView } from "../views/app-view";
import { ClockModel, TimeZone } from "../models/clock-model";
import { ClockView } from "../views/clock-view";
import { Clock } from "./clock";
import { BaseController } from "./base-controller";


export class App extends BaseController<AppModel, AppView> {

    constructor(model: AppModel, view: AppView) {
        super(model, view);
    }

    protected bindListeners() {
        this.view.onClickCreateButton(this.createButtonHandler.bind(this));
    }

    protected override init() {
        super.init();
        this.setViewTimeZoneOptions();
    }

    private setViewTimeZoneOptions() {
        this.view.setSelectorOptions(this.model.getTimeZoneOptions());
    }

    protected updateView() {
        const clockModels = this.model.getclockModels();
        if (clockModels.length > 0) {
            clockModels.forEach(model => {
                this.addClockView(model);
            })
        }
    }

    private addClockView(model: ClockModel) {
        const view = new ClockView();
        const clock = new Clock(model, view);
        this.view.appendGridElement(clock.getHtmlElement());
        clock.start();
    }

    private createButtonHandler() {
        const timeZone: TimeZoneOption = this.view.getSelectedOption();
        const mappedTimeZone = this.model.getTimeZonesMap().get(timeZone);
        this.addClockModel(mappedTimeZone, (model) => {
            this.addClockView(model);
        })
    }

    private addClockModel(timeZone: TimeZone, callback?: (addedModel: ClockModel) => any) {
        this.model.addClockModel(timeZone, callback);
    }
}