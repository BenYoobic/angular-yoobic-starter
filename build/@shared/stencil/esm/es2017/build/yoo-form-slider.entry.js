import { h } from '../design-system.core.js';

import { B as isNumber, L as querySelectorDeep } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

const inlineClass = 'inline';
class YooFormSliderComponent {
    constructor() {
        this.step = 1;
        this.disabled = false;
        this.hideLabel = false;
        this.hideReferences = false;
        this.doubleSlider = false;
        this.triangleColor = 'light';
    }
    componentWillLoad() {
        this.value = this.initialValue;
        this.secondValue = this.initialLowValue || this.minimum;
        if (!isNumber(this.minimum)) {
            this.minimum = 0;
        }
        if (!isNumber(this.maximum)) {
            this.maximum = 100;
        }
    }
    componentDidLoad() {
        if (this.doubleSlider) {
            this.setDoubleProgressStyle();
        }
    }
    componentWillUpdate() {
        if (this.doubleSlider) {
            this.setDoubleProgressStyle();
        }
    }
    initialValueChanged(newValue) {
        if (newValue > this.maximum || newValue < this.minimum) {
            this.value = this.minimum;
        }
        else {
            this.value = this.initialValue;
        }
    }
    initialLowValueChanged(newValue) {
        if (newValue > this.maximum || newValue < this.minimum) {
            this.initialLowValue = this.minimum;
        }
        else {
            this.secondValue = this.initialLowValue;
        }
    }
    getProgress() {
        return 100 * (this.value - this.minimum) / (this.maximum - this.minimum);
    }
    onChange(event) {
        if (event.target.value > this.maximum || event.target.value < this.minimum) {
            this.value = this.minimum;
        }
        else {
            this.value = event.target.value;
        }
        this.handleEvent();
    }
    onChangeSecond(event) {
        if (event.target.value > this.maximum || event.target.value < this.minimum) {
            this.secondValue = this.minimum;
        }
        else {
            this.secondValue = event.target.value;
        }
        this.handleEvent();
    }
    handleEvent() {
        if (this.doubleSlider) {
            let lowValue = Math.min(this.value, this.secondValue);
            let highValue = Math.max(this.value, this.secondValue);
            this.doubleSliderChanged.emit({ lowValue: lowValue, highValue: highValue });
        }
        else {
            this.singleSliderChanged.emit(this.value);
        }
    }
    setDoubleProgressStyle() {
        let width = 100 * Math.abs(this.value - this.secondValue) / (this.maximum - this.minimum);
        let translate = 0;
        if (width !== 0) {
            translate = 100 * ((Math.min(this.value, this.secondValue) - this.minimum) / (Math.abs(this.value - this.secondValue)));
        }
        let style = { width: width + '%', transform: 'translateX(' + translate + '%)' };
        style.toString();
        let bar = querySelectorDeep(this.host, 'div.progress-container');
        if (bar) {
            bar.setAttribute('style', 'width: ' + width + '%; ' + 'transform: translateX(' + translate + '%)');
        }
        // reverse label if inline double
        if (this.host.className.indexOf(inlineClass) !== -1) {
            let sliderContainer = querySelectorDeep(this.host, 'div.slider-content');
            if (sliderContainer) {
                sliderContainer.setAttribute('style', 'flex-direction: row');
            }
        }
    }
    renderInputNumber() {
        return (this.disabled ?
            h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event), disabled: true })
            :
                (this.doubleSlider ?
                    [h("input", { type: "number", value: this.secondValue, onChange: (event) => this.onChangeSecond(event) }),
                        (this.host.className.indexOf(inlineClass) === -1 ?
                            h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event) })
                            : null)]
                    :
                        h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event) })));
    }
    renderInputRange() {
        return (this.disabled ?
            h("input", { type: "range", min: this.minimum, max: this.maximum, step: this.step, value: this.value, onInput: (event) => this.onChange(event), disabled: true })
            :
                [h("input", { type: "range", min: this.minimum, max: this.maximum, step: this.step, value: this.value, onInput: (event) => this.onChange(event) }),
                    (this.doubleSlider ?
                        h("input", { class: "second-slider", type: "range", min: this.minimum, max: this.maximum, step: this.step, value: this.secondValue, onInput: (event) => this.onChangeSecond(event) })
                        : null)]);
    }
    renderDoubleSlider() {
        return (this.doubleSlider && this.host.className.indexOf(inlineClass) !== -1 ?
            h("div", { class: 'label-value' + ((this.hideLabel) ? ' label-hidden' : '') }, this.disabled ?
                h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event), disabled: true })
                :
                    h("input", { type: "number", value: this.value, onChange: (event) => this.onChange(event) }))
            : null);
    }
    hostData() {
        return {
            class: {
                'swiper-no-swiping': true
            }
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.host.classList.contains('triangle') ?
                h("div", null,
                    h("yoo-slider-scale", { type: "scale", triangleBackgroundColor: this.triangleColor })) : null,
            h("div", { class: 'slider-container' + ((this.disabled) ? ' disabled' : '') },
                h("div", { class: "slider-content" },
                    this.hideLabel ? null :
                        h("div", { class: 'label-value' }, this.renderInputNumber()),
                    h("div", { class: "range-container" },
                        this.renderInputRange(),
                        this.doubleSlider ?
                            h("yoo-slider-scale", { type: "range" })
                            :
                                h("yoo-slider-scale", { type: "range", sliderValue: this.getProgress() })),
                    this.renderDoubleSlider()),
                !this.hideReferences ?
                    h("label", { class: 'slider-minimum' }, this.minimum)
                    : null,
                !this.hideReferences ?
                    h("label", { class: 'slider-maximum' }, this.maximum)
                    : null)));
    }
    static get is() { return "yoo-form-slider"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "doubleSlider": {
            "type": Boolean,
            "attr": "double-slider"
        },
        "hideLabel": {
            "type": Boolean,
            "attr": "hide-label"
        },
        "hideReferences": {
            "type": Boolean,
            "attr": "hide-references"
        },
        "host": {
            "elementRef": true
        },
        "initialLowValue": {
            "type": Number,
            "attr": "initial-low-value",
            "mutable": true,
            "watchCallbacks": ["initialLowValueChanged"]
        },
        "initialValue": {
            "type": Number,
            "attr": "initial-value",
            "watchCallbacks": ["initialValueChanged"]
        },
        "maximum": {
            "type": Number,
            "attr": "maximum",
            "mutable": true
        },
        "minimum": {
            "type": Number,
            "attr": "minimum",
            "mutable": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "secondValue": {
            "state": true
        },
        "step": {
            "type": Number,
            "attr": "step"
        },
        "triangleColor": {
            "type": String,
            "attr": "triangle-color"
        },
        "value": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "singleSliderChanged",
            "method": "singleSliderChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "doubleSliderChanged",
            "method": "doubleSliderChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  display: inline-block; }\n  :host .slider-container {\n    min-height: 2.5rem; }\n    :host .slider-container label {\n      position: absolute;\n      padding-top: 0.5rem;\n      color: var(--text-color, #807f83);\n      font-size: var(--font-s, 13px);\n      text-align: center;\n      vertical-align: bottom; }\n    :host .slider-container .slider-minimum {\n      padding-left: 0.5rem; }\n    :host .slider-container .slider-maximum {\n      right: 0; }\n    :host .slider-container .slider-content {\n      padding-right: 0.3rem; }\n      :host .slider-container .slider-content .range-container {\n        position: relative;\n        -ms-flex-align: center;\n        align-items: center;\n        width: 10rem;\n        padding-top: 0.5rem; }\n        :host .slider-container .slider-content .range-container input[type=range] {\n          position: absolute;\n          width: 10.8rem;\n          background: transparent;\n          pointer-events: none;\n          -webkit-appearance: none; }\n          :host .slider-container .slider-content .range-container input[type=range]:focus {\n            outline-width: 0rem; }\n        :host .slider-container .slider-content .range-container input[type=range]::-webkit-slider-runnable-track {\n          width: 10.8rem;\n          -webkit-appearance: none; }\n        :host .slider-container .slider-content .range-container input[type=range]::-webkit-slider-thumb {\n          width: 1.2rem;\n          height: 1.2rem;\n          border-width: 1px;\n          border-style: solid;\n          border-radius: 50%;\n          border-color: var(--dark-40, #9cabc4);\n          background: var(--light, #FFFFFF);\n          cursor: pointer;\n          pointer-events: all;\n          -webkit-appearance: none; }\n        :host .slider-container .slider-content .range-container input[type=range] {\n          -moz-appearance: none; }\n        :host .slider-container .slider-content .range-container input[type=range]::-moz-focus-outer {\n          border: 0; }\n        :host .slider-container .slider-content .range-container input[type=range]::-moz-range-track {\n          width: 10.8rem;\n          background: transparent;\n          -moz-appearance: none; }\n        :host .slider-container .slider-content .range-container input[type=range]::-moz-range-thumb {\n          width: 1.2rem;\n          height: 1.2rem;\n          transform: translateY(0.3rem);\n          border-width: 1px;\n          border-style: solid;\n          border-radius: 50%;\n          border-color: var(--dark-40, #9cabc4);\n          background: var(--light, #FFFFFF);\n          cursor: pointer;\n          z-index: 400;\n          pointer-events: all;\n          -moz-appearance: none; }\n        :host .slider-container .slider-content .range-container input {\n          margin: 0;\n          border: 0;\n          padding: 0;\n          display: inline-block;\n          vertical-align: middle;\n          white-space: normal;\n          background: none;\n          line-height: 1;\n          font-size: var(--font-m, 15px);\n          font-family: \"Lato\" !important;\n          min-width: 0;\n          -webkit-box-sizing: content-box;\n          box-sizing: content-box; }\n          :host .slider-container .slider-content .range-container input:focus {\n            outline: 0; }\n          :host .slider-container .slider-content .range-container input[type=reset], :host .slider-container .slider-content .range-container input[type=button], :host .slider-container .slider-content .range-container input[type=submit], :host .slider-container .slider-content .range-container input[type=checkbox], :host .slider-container .slider-content .range-container input[type=radio] {\n            -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n          :host .slider-container .slider-content .range-container input[type=search] {\n            -webkit-appearance: textfield;\n            -webkit-box-sizing: content-box;\n            box-sizing: content-box; }\n      :host .slider-container .slider-content .label-value {\n        width: 11rem;\n        text-align: center; }\n        :host .slider-container .slider-content .label-value input[type=number] {\n          width: 2rem;\n          border-color: transparent;\n          outline: none;\n          background: transparent;\n          font-size: var(--font-m, 15px);\n          text-align: center;\n          -webkit-appearance: none; }\n        :host .slider-container .slider-content .label-value input[type=number]::-webkit-inner-spin-button,\n        :host .slider-container .slider-content .label-value input[type=number]::-webkit-outer-spin-button {\n          -webkit-appearance: none; }\n        :host .slider-container .slider-content .label-value input[type=number] {\n          -moz-appearance: textfield; }\n\n:host(.inline) .slider-container {\n  height: 2rem; }\n  :host(.inline) .slider-container label {\n    display: none; }\n  :host(.inline) .slider-container .slider-content {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse; }\n    :host(.inline) .slider-container .slider-content .label-value {\n      position: relative;\n      width: 2rem;\n      height: 1.5rem;\n      margin-left: 1.3rem;\n      border-radius: 4px;\n      color: var(--light, #FFFFFF);\n      text-align: center; }\n      :host(.inline) .slider-container .slider-content .label-value input[type=number] {\n        color: var(--light, #FFFFFF); }\n\n:host(.simple) .slider-container label {\n  display: none; }\n\n:host(.simple) .slider-container .slider-content .label-value {\n  display: none; }\n\n:host(.vertical) .slider-container {\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100%; }\n  :host(.vertical) .slider-container label {\n    padding: 0; }\n  :host(.vertical) .slider-container .slider-content {\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse;\n    -ms-flex-align: center;\n    align-items: center; }\n    :host(.vertical) .slider-container .slider-content .label-value {\n      width: 100%; }\n    :host(.vertical) .slider-container .slider-content .range-container {\n      display: inline-block;\n      width: 20px;\n      height: 15rem;\n      padding: 0; }\n      :host(.vertical) .slider-container .slider-content .range-container input {\n        width: 15rem;\n        height: 20px;\n        margin: 0;\n        -webkit-transform: rotate(-90deg);\n        transform: rotate(-90deg);\n        -webkit-transform-origin: 7.5rem 7.5rem;\n        transform-origin: 7.5rem 7.5rem; }\n\n:host(.triangle) {\n  width: 100%;\n  height: 100%; }\n  :host(.triangle) .outer-container {\n    position: relative;\n    height: 100%; }\n    :host(.triangle) .outer-container .slider-container {\n      display: -ms-flexbox;\n      display: flex; }\n      :host(.triangle) .outer-container .slider-container .slider-content {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column; }\n        :host(.triangle) .outer-container .slider-container .slider-content .label-value {\n          width: 100%; }\n        :host(.triangle) .outer-container .slider-container .slider-content .range-container {\n          display: -ms-flexbox;\n          display: flex;\n          display: flex;\n          -ms-flex-direction: row;\n          flex-direction: row;\n          -ms-flex-pack: center;\n          justify-content: center;\n          width: 100%; }\n          :host(.triangle) .outer-container .slider-container .slider-content .range-container input[type=\"range\"]::-webkit-slider-thumb {\n            width: 1.4375rem;\n            height: 1.4375rem;\n            border: none;\n            -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);\n            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5); }\n          :host(.triangle) .outer-container .slider-container .slider-content .range-container input[type=\"range\"] {\n            width: 15rem; }\n\n:host(.t-vertical) .outer-container .slider-container {\n  min-height: inherit; }\n  :host(.t-vertical) .outer-container .slider-container label {\n    padding: 0;\n    padding-left: 0.5rem; }\n  :host(.t-vertical) .outer-container .slider-container .slider-content {\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse;\n    -ms-flex-pack: center;\n    justify-content: center;\n    height: 100%; }\n    :host(.t-vertical) .outer-container .slider-container .slider-content .label-value {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: center;\n      justify-content: center; }\n    :host(.t-vertical) .outer-container .slider-container .slider-content .range-container {\n      display: inline-block;\n      padding-top: 0; }\n      :host(.t-vertical) .outer-container .slider-container .slider-content .range-container input {\n        top: -1.5rem;\n        left: 0.25rem;\n        -webkit-transform: rotate(-90deg);\n        transform: rotate(-90deg);\n        -webkit-transform-origin: 7.5rem 7.5rem;\n        transform-origin: 7.5rem 7.5rem; }\n\n:host(.range-display) {\n  width: 100%; }\n  :host(.range-display) .outer-container {\n    width: 100%;\n    margin-bottom: var(--padding-10, 0.625rem); }\n    :host(.range-display) .outer-container .slider-container {\n      width: 100%; }\n      :host(.range-display) .outer-container .slider-container .slider-content {\n        width: 100%; }\n        :host(.range-display) .outer-container .slider-container .slider-content .range-container {\n          width: 100%;\n          padding-top: 1rem;\n          z-index: 1; }\n          :host(.range-display) .outer-container .slider-container .slider-content .range-container input {\n            width: 100% !important; }\n        :host(.range-display) .outer-container .slider-container .slider-content .label-value.label-hidden {\n          display: none; }\n\n:host(.accent) .slider-container .label-value {\n  background: var(--accent, #1FB6FF); }\n\n:host(.accent) .slider-container .slider-content .range-container input[type=range]::-webkit-slider-thumb {\n  border: none;\n  background: var(--light, #FFFFFF) !important;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.accent) .slider-container .slider-content .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.dark) .slider-container .label-value {\n  background: var(--dark-40, #9cabc4); }\n\n:host(.dark) .slider-container .slider-content .range-container input[type=range]::-webkit-slider-thumb {\n  border: none;\n  background: var(--light, #FFFFFF) !important;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.dark) .slider-container .slider-content .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.danger) .slider-container .label-value {\n  background: var(--danger, #ff625f); }\n\n:host(.danger) .slider-container .slider-content .range-container input[type=range]::-webkit-slider-thumb {\n  border: none;\n  background: var(--light, #FFFFFF) !important;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.danger) .slider-container .slider-content .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.success) .slider-container .label-value {\n  background: var(--success, #04CC99); }\n\n:host(.success) .slider-container .slider-content .range-container input[type=range]::-webkit-slider-thumb {\n  border: none;\n  background: var(--light, #FFFFFF) !important;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.success) .slider-container .slider-content .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.info) .slider-container .label-value {\n  background: var(--info, #fc459e); }\n\n:host(.info) .slider-container .slider-content .range-container input[type=range]::-webkit-slider-thumb {\n  border: none;\n  background: var(--light, #FFFFFF) !important;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.info) .slider-container .slider-content .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.warning) .slider-container .label-value {\n  background: var(--warning, #ff6402); }\n\n:host(.warning) .slider-container .slider-content .range-container input[type=range]::-webkit-slider-thumb {\n  border: none;\n  background: var(--light, #FFFFFF) !important;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.warning) .slider-container .slider-content .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--light, #FFFFFF) !important; }\n\n:host(.gradient-danger) .slider-container .label-value {\n  background: var(--gradient-danger, #ff625f); }\n\n:host(.gradient-danger) .slider-container .slider-content .range-container input[type=range]::-webkit-slider-thumb {\n  border: none;\n  background: var(--danger, #ff625f) !important;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.gradient-danger) .slider-container .slider-content .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--danger, #ff625f) !important; }\n\n:host(.gradient-success) .slider-container .label-value {\n  background: var(--gradient-success, #04CC99); }\n\n:host(.gradient-success) .slider-container .slider-content .range-container input[type=range]::-webkit-slider-thumb {\n  border: none;\n  background: var(--success, #04CC99) !important;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); }\n\n:host(.gradient-success) .slider-container .slider-content .range-container input[type=range].second-slider::-webkit-slider-thumb {\n  background: var(--gradient-success2, #04CC99) !important; }"; }
}

class YooSliderScaleComponent {
    constructor() {
        this.triangleBackgroundColor = 'dark-10';
    }
    componentDidLoad() {
        if (this.isType('scale')) {
            this.setSliderScaleStyle();
        }
    }
    isType(type) {
        return this.type === type;
    }
    setSliderScaleStyle() {
        let width = 15;
        querySelectorDeep(this.host, '.bar-container').setAttribute('style', `
            border-right: ${width}rem solid var(--${this.triangleBackgroundColor})`);
    }
    properProgress() {
        const MAX_VALUE = 100;
        let prog = 0;
        if (this.sliderValue < 0) {
            prog = 0;
        }
        else if (this.sliderValue > MAX_VALUE) {
            prog = 100;
        }
        else {
            prog = ((this.sliderValue / MAX_VALUE) * 100);
        }
        return prog;
    }
    renderRangeSlider() {
        this.progressStyle = { width: this.properProgress() + '%' };
        return h("div", { class: "range-container" },
            h("div", { class: "bar-container slider" },
                h("div", { class: "progress-container", style: this.progressStyle })));
    }
    renderScaleSlider() {
        return h("div", { class: "scale-container" },
            h("div", { class: "bar-container slider" }));
    }
    render() {
        return this.isType('range') ? this.renderRangeSlider() : this.renderScaleSlider();
    }
    static get is() { return "yoo-slider-scale"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "sliderValue": {
            "type": Number,
            "attr": "slider-value"
        },
        "triangleBackgroundColor": {
            "type": String,
            "attr": "triangle-background-color"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return ":host .scale-container {\n  position: relative;\n  top: 0;\n  left: 0.25rem;\n  width: 15rem;\n  -webkit-transform: rotate(-90deg);\n  transform: rotate(-90deg);\n  -webkit-transform-origin: 7.5rem 7.5rem;\n  transform-origin: 7.5rem 7.5rem;\n  opacity: 0.7; }\n  :host .scale-container .bar-container {\n    border-top: 0.71875rem solid transparent;\n    border-bottom: 0.718rem solid transparent; }\n\n:host .range-container {\n  display: -ms-flexbox;\n  display: flex;\n  padding-top: 0.5rem; }\n  :host .range-container .bar-container {\n    width: 100%;\n    background-color: var(--dark-10, #e6eaf0); }\n    :host .range-container .bar-container .progress-container {\n      height: 2px;\n      background-color: var(--success, #04CC99); }"; }
}

export { YooFormSliderComponent as YooFormSlider, YooSliderScaleComponent as YooSliderScale };
