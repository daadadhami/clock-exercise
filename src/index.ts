import './index.css';
import { AppView } from './views/app-view';
import { App } from './controllers/app';
import { AppModel } from './models/app-model';
import { TimeZone } from './models/clock-model';


document.addEventListener('DOMContentLoaded', () => {
    const appView = new AppView();
    const initialModels: TimeZone[] = [TimeZone.GMT2, TimeZone.GMT0, TimeZone.GMT4, TimeZone.GMTm2]; 
    const app = new App(new AppModel(initialModels), appView);
    app.start();
});
