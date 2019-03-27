import { setValidator, setValueAndValidateInput, isNullOrUndefined, getAppContext } from '../../../utils';
export class YooFormStarRatingComponent {
    constructor() {
        this.validators = [];
        this.type = 'star';
    }
    componentWillLoad() {
        setValidator(this);
        if (this.type === 'button') {
            this.host.classList.add('button');
        }
    }
    getArray() {
        return new Array(this.max > 0 ? this.max : 5).fill(0);
    }
    onStarClick(index) {
        if (index + 1 === this.value) {
            setValueAndValidateInput(null, this);
        }
        else {
            setValueAndValidateInput(index + 1, this);
        }
    }
    renderReadonly() {
        return (h("div", { class: "readonly" }, this.getArray().map((elem, index) => h("div", { class: "star-container" }, this.type === 'star' ?
            h("yoo-icon", { class: !isNullOrUndefined(this.value) && (this.value - 1 >= index) ? 'yo-star solid' : 'yo-star border' })
            :
                h("div", { class: 'button ' + (!isNullOrUndefined(this.value) && (this.value - 1 >= index) ? 'solid' : '') },
                    h("span", { class: "number" }, index))))));
    }
    renderEditable() {
        return (h("div", { class: "outer-container" }, this.getArray().map((elem, index) => h("div", { class: "star-container" }, this.type === 'star' ?
            h("yoo-icon", { class: !isNullOrUndefined(this.value) && (this.value - 1 >= index) ? 'yo-star solid' : 'yo-star border', onClick: () => this.onStarClick(index) })
            :
                h("div", { class: 'button ' + (!isNullOrUndefined(this.value) && (this.value - 1 >= index) ? 'solid' : ''), onClick: () => this.onStarClick(index) },
                    h("span", { class: "number" }, index))))));
    }
    renderHistory() {
        return h("div", { class: "outer-container" },
            h("div", null, this.value || this.value === 0 ? this.value : null),
            h("div", { class: "star-container" },
                h("yoo-icon", { class: "yo-star solid" })));
    }
    hostData() {
        return {
            class: Object.assign({ 'swiper-no-swiping': true }, getAppContext())
        };
    }
    render() {
        if (this.isHistory) {
            return this.renderHistory();
        }
        return h("yoo-ion-scroll", { class: "relative", horizontalMode: true, showScrollbar: false }, this.readonly ? this.renderReadonly() : this.renderEditable());
    }
    static get is() { return "yoo-form-star-rating"; }
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
        "max": {
            "type": Number,
            "attr": "max"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "type": {
            "type": String,
            "attr": "type"
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
    static get style() { return "/**style-placeholder:yoo-form-star-rating:**/"; }
}
