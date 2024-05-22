import { TimeZoneOptionObject, TimeZoneOption } from '../models/app-model';
import '../index.css'
import './app-view.css'
import { BaseView } from './base-view';

export class AppView extends BaseView {

    private createButton: HTMLElement;
    private selector: HTMLSelectElement;
    private gridView: HTMLElement;

    constructor() {
        super();
    }

    protected createHtmlElement(): HTMLElement {
        const container = document.getElementById('app');

        const header = document.createElement('div');
        header.classList.add('header');
        container.appendChild(header);

        this.createButton = document.createElement('button');
        this.createButton.setAttribute('id', 'new-clock');
        this.createButton.innerHTML = 'Add Clock';
        header.appendChild(this.createButton);

        this.selector = document.createElement('select');
        this.selector.setAttribute('id', 'timezones');
        this.selector.setAttribute('name', 'timezones');
        header.appendChild(this.selector);

        this.gridView = document.createElement('div');
        this.gridView.setAttribute('id', 'grid-container');
        container.appendChild(this.gridView);

        return container;
    }

    appendGridElement(element: HTMLElement) {
        this.gridView.appendChild(element);
    }

    // selector methods

    setSelectorOptions(options: TimeZoneOptionObject[]) {
        if(options.length > 0) {
            options.forEach(element => {
                const option = document.createElement('option');
                option.setAttribute('value', element.value);
                option.innerHTML = element.value;
                if (element.selected) {
                    option.setAttribute('selected', 'selected');
                }
                this.selector.appendChild(option)
            })
        }
    }

    getSelectedOption(): TimeZoneOption {
        return this.selector.value as TimeZoneOption;
    }

    // button methods

    onClickCreateButton(callback: (this: HTMLElement, ev: MouseEvent) => any) {
        this.createButton.addEventListener('click', callback);
    }
}