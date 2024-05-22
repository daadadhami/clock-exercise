export abstract class BaseView {
    protected htmlElement: HTMLElement;

    constructor() {
        this.htmlElement = this.createHtmlElement();
    }

    protected abstract createHtmlElement(): HTMLElement;

    getHtmlElement(): HTMLElement {
        return this.htmlElement;
    }
}