import './button-view.css'
import { BaseView } from './base-view';

export class ButtonView extends BaseView {
    private isEnabled: boolean = true;

    constructor() {
        super();
    }

    protected createHtmlElement(): HTMLElement {
        let button = document.createElement('div');
        button.classList.add('button-view');
        return button;
    }

    bindClickListener(callback: (this: HTMLElement, ev: MouseEvent) => any) {
        this.htmlElement.addEventListener('click', callback);
    }

    setTitle(value: string) {
        this.htmlElement.innerHTML = value;
    }

    getIsEnabled(): boolean {
        return this.isEnabled;
    }

    setIsEnabled(value: boolean)  {
        this.isEnabled = value;
    }
}