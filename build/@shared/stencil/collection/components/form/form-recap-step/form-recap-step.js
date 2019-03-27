import { translate, translateMulti, isNullOrUndefined } from '../../../utils';
export class YooFormRecapStepComponent {
    renderIcon() {
        if (this.step.valid === false && !this.locked) {
            return (h("yoo-icon", { class: "yo-rejected2" }));
        }
        else if (this.step.validityPercentage > 0 && this.step.validityPercentage < 100 && !this.locked) {
            return (h("div", { class: "percentage-fill", style: { 'height': `${this.step.validityPercentage}%` } }));
        }
        if (this.locked) {
            return (h("yoo-icon", { class: "yo-lock" }));
        }
        else if (this.step.valid) {
            return (h("yoo-icon", { class: "yo-thick" }));
        }
        else {
            return (h("yoo-icon", { class: "yo-step" }));
        }
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "icon-outer-container" },
                h("div", { class: {
                        'icon-container': true,
                        'locked': this.locked,
                        'valid': this.step.valid && !this.locked,
                        'invalid': this.step.valid === false && !this.locked,
                        'step': isNullOrUndefined(this.step.valid) && !this.locked
                    } }, this.renderIcon())),
            h("div", { class: "text-container" },
                h("div", { class: "step-container" }, translate('STEP') + ' ' + this.stepNumber),
                h("div", { class: "title-container" },
                    h("yoo-text-truncate", { class: "form-recap", maxLine: 2, content: translateMulti(this.mainTitle) })),
                h("div", { class: "subtitle-container" }, translateMulti(this.subTitle)))));
    }
    static get is() { return "yoo-form-recap-step"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "locked": {
            "type": Boolean,
            "attr": "locked"
        },
        "mainTitle": {
            "type": String,
            "attr": "main-title"
        },
        "step": {
            "type": "Any",
            "attr": "step"
        },
        "stepNumber": {
            "type": Number,
            "attr": "step-number"
        },
        "subTitle": {
            "type": String,
            "attr": "sub-title"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-form-recap-step:**/"; }
}
