import '../index.css'
import './clock-view.css'
import { BaseView } from './base-view';
import { ButtonView } from './button-view';

export class ClockView extends BaseView {

    private screen: HTMLElement;
    private circularFrame: HTMLElement;
    private timeZone: HTMLElement;
    private hoursDiv: HTMLElement;
    private minsDiv: HTMLElement;
    private secondsDiv: HTMLElement;
    private display: HTMLElement;

    private modeButton: ButtonView;
    private increaseButton: ButtonView;
    private lightButton: ButtonView;
    private displayButton: ButtonView;
    private resetButton: ButtonView;
    private animateButton: ButtonView;
    private revertAnimateButton: ButtonView;

    constructor() {
        super();
    }

    protected createHtmlElement(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('clock-container');

        this.circularFrame = document.createElement('div');
        this.circularFrame.classList.add('circle', 'center');
        container.appendChild(this.circularFrame);

        this.screen = document.createElement('div');
        this.screen.classList.add('screen');
        this.circularFrame.appendChild(this.screen);

        this.timeZone = document.createElement('div');
        this.timeZone.classList.add('screen-element');
        this.screen.appendChild(this.timeZone);

        const digitsContainer = document.createElement('div');
        digitsContainer.classList.add('screen-element', 'center', 'digit-container');
        this.screen.appendChild(digitsContainer);

        this.hoursDiv = document.createElement('div');
        this.hoursDiv.innerHTML = '00';
        digitsContainer.appendChild(this.hoursDiv);

        const seperator = document.createElement('div');
        seperator.innerHTML = ':';
        digitsContainer.appendChild(seperator);

        this.minsDiv = document.createElement('div');
        this.minsDiv.innerHTML = '00';
        digitsContainer.appendChild(this.minsDiv);

        const displayContainer = document.createElement('div');
        displayContainer.classList.add('screen-element', 'display-container');
        this.screen.appendChild(displayContainer);

        this.display = document.createElement('div');
        displayContainer.appendChild(this.display);

        this.secondsDiv = document.createElement('div');
        this.secondsDiv.innerHTML = '00';
        displayContainer.appendChild(this.secondsDiv);

        this.modeButton = new ButtonView();
        this.modeButton.setTitle('Mode');
        container.appendChild(this.modeButton.getHtmlElement());

        this.increaseButton = new ButtonView();
        this.increaseButton.setTitle('Increase');
        container.appendChild(this.increaseButton.getHtmlElement());
        this.increaseButton.setIsEnabled(false);

        this.lightButton = new ButtonView();
        this.lightButton.setTitle('Light');
        container.appendChild(this.lightButton.getHtmlElement());

        this.displayButton = new ButtonView();
        this.displayButton.setTitle('Display');
        container.appendChild(this.displayButton.getHtmlElement());

        this.resetButton = new ButtonView();
        this.resetButton.setTitle('Reset');
        container.appendChild(this.resetButton.getHtmlElement());

        this.animateButton = new ButtonView();
        this.animateButton.setTitle('Animate');
        container.appendChild(this.animateButton.getHtmlElement());

        return container;
    }

    onClickModeButton(callback: (this: HTMLElement, ev: MouseEvent) => any) {
        this.modeButton.bindClickListener(callback);
    }

    onClickIncreaseButton(callback: (this: HTMLElement, ev: MouseEvent) => any) {
        this.increaseButton.bindClickListener(callback);
    }

    onClickLightButton(callback: (this: HTMLElement, ev: MouseEvent) => any) {
        this.lightButton.bindClickListener(callback);
    }

    onClickDisplayButton(callback: (this: HTMLElement, ev: MouseEvent) => any) {
        this.displayButton.bindClickListener(callback);
    }

    onClickResetButton(callback: (this: HTMLElement, ev: MouseEvent) => any) {
        this.resetButton.bindClickListener(callback);
    }

    onClickAnimateButton(callback: (this: HTMLElement, ev: MouseEvent) => any) {
        this.animateButton.bindClickListener(callback);
    }

    enableIncreaseButton(value: boolean) {
        this.increaseButton.setIsEnabled(value);
    }

    isEnabledIncreaseButton(): boolean {
        return this.increaseButton.getIsEnabled();
    }

    selectHours() {
        this.hoursDiv.classList.add('red'); 
        if (this.minsDiv.classList.contains('red')) {
            this.minsDiv.classList.remove('red'); 
        }
    }

    selectMinutes() {
        this.minsDiv.classList.add('red'); 
        if (this.hoursDiv.classList.contains('red')) {
            this.hoursDiv.classList.remove('red'); 
        }
    }

    removeSelection() {
        if (this.hoursDiv.classList.contains('red')) {
            this.hoursDiv.classList.remove('red'); 
        }
        if (this.minsDiv.classList.contains('red')) {
            this.minsDiv.classList.remove('red'); 
        }
    }

    toggleLight() {
        if (this.screen.classList.contains('light')) {
            this.screen.classList.remove('light'); 
        } else {
            this.screen.classList.add('light'); 
        }
    }

    startAnimation(v1: number, v2: number, v3: number, v4: number, v5: number, v6: number) {
        if (this.circularFrame.style.transform == '') {
            this.circularFrame.style.transform = `matrix(${v1}, ${v2}, ${v3}, ${v4}, ${v5}, ${v6})`;
        } else {
            this.circularFrame.style.transform = `${this.circularFrame.style.transform} matrix(${v1}, ${v2}, ${v3}, ${v4}, ${v5}, ${v6})`;
        }
        
        this.circularFrame.style.transition = '4s';
    }

    setHours(value: number) {
        this.hoursDiv.innerHTML =  value < 10 ? `0${value}` : value.toString();
    }

    setMinutes(value: number) {
        this.minsDiv.innerHTML = value < 10 ? `0${value}` : value.toString();
    }

    setSeconds(value: number) {
        this.secondsDiv.innerHTML = value < 10 ? `0${value}` : value.toString();
    }

    setTimeZone(value: string) {
        this.timeZone.innerHTML = value.toString();
    }

    setDisplay(value: string) {
        this.display.innerHTML = value.toString();
    }
}