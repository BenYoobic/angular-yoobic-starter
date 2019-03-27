import { setAnimation, animations, setValueAndValidateInput, getAppContext } from '../../../utils';
// import { Vibration } from '@ionic-native/vibration';
export class YooFormToggleComponent {
    constructor() {
        this.validators = [];
        this.type = 'normal';
        this.required = false;
    }
    requiredWatch() {
        this.validate();
    }
    componentWillLoad() {
        this.validate();
    }
    componentDidLoad() {
        if (this.type === 'line') {
            this.host.classList.add('line');
        }
    }
    componentDidUpdate() {
        if (this.type === 'line') {
            this.host.classList.add('line');
        }
    }
    validate() {
        let isValid = true;
        if (this.required && !this.value) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validity = isValid;
            this.validityChanged.emit(isValid);
        }
        return this.validity;
    }
    onToggle() {
        // if (!getSession().user.disableHapticFeedback) {
        //     Vibration.vibrate(200);
        // }
        if (!this.readonly) {
            setAnimation(animations.slideHorizontal, this.innerContainer, { open: (this.value ? true : false), distance: 23, start: -1 }).finished.then(() => {
                setValueAndValidateInput(!this.value, this);
                this.clicked.emit(true);
            });
        }
    }
    renderReadonly() {
        return (h("div", { class: "readonly" },
            this.header ?
                h("div", { class: "label readonly" },
                    h("span", { innerHTML: this.header })) : null,
            this.value === true ? h("yoo-icon", { class: "yo-check success" }) : (this.value === false ? h("yoo-icon", { class: "yo-cross danger" }) : h("yoo-icon", { class: "yo-circle" }))));
    }
    renderEditable() {
        return (h("div", { class: "outer-container" },
            this.header &&
                h("div", { class: "label" },
                    h("span", { innerHTML: this.header })),
            h("div", { class: 'toggle-container' + (this.value ? ' active' : ''), onClick: () => this.onToggle() },
                h("div", { ref: (el) => this.innerContainer = el, class: 'inner-container' + (this.value ? ' active' : '') }))));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "header": {
            "type": String,
            "attr": "header"
        },
        "host": {
            "elementRef": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required",
            "watchCallbacks": ["requiredWatch"]
        },
        "type": {
            "type": String,
            "attr": "type",
            "reflectToAttr": true
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": Boolean,
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
        }, {
            "name": "clicked",
            "method": "clicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-toggle:**/"; }
}
