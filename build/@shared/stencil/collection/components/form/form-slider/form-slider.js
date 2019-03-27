import { querySelectorDeep } from '../../../utils';
import { isNumber } from 'lodash-es';
const inlineClass = 'inline';
export class YooFormSliderComponent {
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
    static get style() { return "/**style-placeholder:yoo-form-slider:**/"; }
}
