import { BaseModel } from "../models/base-model";
import { BaseView } from "../views/base-view";

export interface Observer {
    update(): void;
}

export abstract class BaseController<M extends BaseModel, V extends BaseView> implements Observer {

    protected view: V;
    protected model: M;

    constructor(model: M, view: V) {
        this.model = model;
        this.view = view;
    }

    start() {
        this.init();
        this.bindListeners();
        this.updateView();
    }

    protected init() {
        this.model.registerObserver(this);
    }

    protected abstract bindListeners(): void;

    protected abstract updateView(): void;

    getHtmlElement(): HTMLElement {
        return this.view.getHtmlElement();
    }

    // observer methods

    update() {
        this.updateView();
    }
}