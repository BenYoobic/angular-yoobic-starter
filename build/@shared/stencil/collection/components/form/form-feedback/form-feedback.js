import { setValidator, setValueAndValidateInput, getAppContext, bounceAnimation } from '../../../utils';
export class YooFormFeedbackComponent {
    constructor() {
        this.validators = [];
        this.values = ['😕', '😐', '😀'];
        this.buttonElements = [];
    }
    componentWillLoad() {
        setValidator(this);
    }
    animateSelectedButton() {
        const element = this.buttonElements[this.value - 1];
        return bounceAnimation(element['elm']);
    }
    onStateClick(index) {
        // @todo: this is weird usecase:
        if ((index + 1) === this.value) {
            setValueAndValidateInput(null, this);
        }
        else {
            setValueAndValidateInput(index + 1, this);
        }
        this.animateSelectedButton();
    }
    getBackgroundColorClass(isSelected = false) {
        const isBoost = getAppContext() && getAppContext()['boost'];
        return {
            'centered': true,
            'gradient-danger': isBoost && isSelected,
            'gradient-success': !isBoost && isSelected
        };
    }
    renderButtons(listenOnClick = true) {
        this.buttonElements = this.values.map((text, index) => h("div", { class: "button-container" },
            h("yoo-button", { text: text, class: this.getBackgroundColorClass(this.value - 1 === index), onClick: () => listenOnClick && this.onStateClick(index) })));
        return this.buttonElements;
    }
    renderReadonly() {
        return (h("div", { class: "readonly" }, this.renderButtons(false)));
    }
    renderEditable() {
        return (h("div", { class: "outer-container" }, this.renderButtons(true)));
    }
    hostData() {
        return {
            class: Object.assign({ 'swiper-no-swiping': true }, getAppContext())
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-feedback"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": Number,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-feedback:**/"; }
}
