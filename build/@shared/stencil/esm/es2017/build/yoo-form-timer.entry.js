import { h } from '../design-system.core.js';

import { B as isNumber, aZ as setDateMinutes, aY as setDateHours, ci as toDate, cj as debounce, ag as dateAdd, a4 as getElementDimensions, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooFormTimerComponent {
    constructor() {
        this.smallWindowSize = false;
    }
    timeChanged(event, position) {
        let hours = Number(event.detail.split(':')[0]);
        let minutes = Number(event.detail.split(':')[1]);
        if (isNumber(hours) && isNumber(minutes)) {
            if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                if (position === 'start') {
                    this.startHour = hours;
                    this.startMinute = minutes;
                }
                else {
                    this.endTime = setDateMinutes(setDateHours(this.endTime ? toDate(this.endTime) : new Date(), hours), minutes);
                }
            }
        }
        if (this.startHour && this.startMinute && this.endTime) {
            this.calculatedTime = this.formatTime(this.calculateTotalTime());
            this.timeCalculated.emit(this.calculatedTime);
        }
    }
    componentDidLoad() {
        this.resizeComponent();
        this.resizeListener = debounce(this.resizeComponent, 500).bind(this);
        window.addEventListener('resize', this.resizeListener);
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    formatTime(time) {
        let removeDateStringFromCalc = time.split(' ')[1];
        return removeDateStringFromCalc.split(':')[0] + ':' + removeDateStringFromCalc.split(':')[1];
    }
    calculateTotalTime() {
        let calcTime = dateAdd(this.endTime, 'hours', this.startHour);
        return dateAdd(calcTime, 'minutes', this.startMinute).toLocaleString();
    }
    resizeComponent() {
        const MAX_COMPONENT_WIDTH = 350;
        let width = getElementDimensions(this.host).width;
        MAX_COMPONENT_WIDTH > width ? this.smallWindowSize = true : this.smallWindowSize = false;
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "column-container" },
                h("div", { class: "text-container" }, translate('TIMEIN')),
                h("yoo-form-input", { type: "time", onInputChanged: (event) => this.timeChanged(event, 'start') }),
                this.smallWindowSize ? [h("div", { class: "text-container" }, "TIME OUT"), h("yoo-form-input", { type: "time", onInputChanged: (event) => this.timeChanged(event, 'end') })] : null),
            h("div", { class: "column-container" },
                h("div", { class: "text-container" }, translate('TOTALCOMPLETION')),
                h("div", { class: "text-container" }, this.calculatedTime),
                h("div", { class: "text-container" }, translate('HOURINITIAL') + ' ' + translate('MINUTEINITIAL'))),
            this.smallWindowSize ? null :
                h("div", { class: "column-container" },
                    h("div", { class: "text-container" }, translate('TIMEOUT')),
                    h("yoo-form-input", { type: "time", onInputChanged: (event) => this.timeChanged(event, 'end') }))));
    }
    static get is() { return "yoo-form-timer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "calculatedTime": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "smallWindowSize": {
            "state": true
        },
        "timeChanged": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "timeCalculated",
            "method": "timeCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding: 0.5rem; }\n  :host .outer-container .column-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center; }"; }
}

export { YooFormTimerComponent as YooFormTimer };
