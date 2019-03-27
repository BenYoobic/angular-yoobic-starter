import { querySelectorDeep } from '../../../utils';
export class YooSliderScaleComponent {
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
    static get style() { return "/**style-placeholder:yoo-slider-scale:**/"; }
}
