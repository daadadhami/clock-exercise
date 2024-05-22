import { BaseModel, Subject } from "./base-model";
import { ClockModel, TimeZone } from "./clock-model";

export enum TimeZoneOption {
    GMTm4 = 'GMT-4',
    GMTm3 = 'GMT-3',
    GMTm2 = 'GMT-2',
    GMTm1 = 'GMT-1',
    GMT0 = 'GMT+0',
    GMT1 = 'GMT+1',
    GMT2 = 'GMT+2',
    GMT3 = 'GMT+3',
    GMT4 = 'GMT+4',
}

export interface TimeZoneOptionObject {
    value: TimeZoneOption,
    selected?: boolean
}

export class AppModel extends BaseModel {

    private clockModels: ClockModel[] = [];
    private timeZoneOptions: TimeZoneOptionObject[] = []; 
    private timeZonesMap: Map<TimeZoneOption, TimeZone>;

    constructor(timeZones?: TimeZone[]) {
        super();
        if (timeZones && timeZones.length > 0) {
            timeZones.forEach(timeZone => this.addClockModel(timeZone));
        }

        this.timeZoneOptions = [
            { value: TimeZoneOption.GMTm4 },
            { value: TimeZoneOption.GMTm3 },
            { value: TimeZoneOption.GMTm2 },
            { value: TimeZoneOption.GMTm1 },
            { value: TimeZoneOption.GMT0 },
            { value: TimeZoneOption.GMT1 },
            { value: TimeZoneOption.GMT2, selected: true },
            { value: TimeZoneOption.GMT3 },
            { value: TimeZoneOption.GMT4 }
        ];

        this.timeZonesMap = new Map<TimeZoneOption, TimeZone>([
            [TimeZoneOption.GMTm4, TimeZone.GMTm4],
            [TimeZoneOption.GMTm3, TimeZone.GMTm3],
            [TimeZoneOption.GMTm2, TimeZone.GMTm2],
            [TimeZoneOption.GMTm1, TimeZone.GMTm1],
            [TimeZoneOption.GMT0, TimeZone.GMT0],
            [TimeZoneOption.GMT1, TimeZone.GMT1],
            [TimeZoneOption.GMT2, TimeZone.GMT2],
            [TimeZoneOption.GMT3, TimeZone.GMT3],
            [TimeZoneOption.GMT4, TimeZone.GMT4],
        ]);
    }

    getclockModels(): ClockModel[] {
        return this.clockModels;
    }

    addClockModel(timeZone: TimeZone, callback?: (addedModel: ClockModel) => any) {
        const newClockModel = new ClockModel(timeZone);
        this.clockModels = [...this.clockModels, newClockModel];
        if (callback) { 
            callback(newClockModel); // option 1 : returns created model to app controller and adds it to the gridview
        } else {
            this.notifyObserver(); // option 2 : notifies the app controller to rerender the gridview 
        }
    }

    getTimeZoneOptions() {
        return this.timeZoneOptions;
    }

    getTimeZonesMap() {
        return this.timeZonesMap;
    }
}