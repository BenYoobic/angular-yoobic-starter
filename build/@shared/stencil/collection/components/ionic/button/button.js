import { findParent, getAppContext } from '../../../utils';
import { getButtonClassMap, getButtonTypeClassMap, getColorClassMap } from '../../../utils/ionic';
export class YooIonButtonComponent {
    constructor() {
        this.buttonType = 'button';
        this.disabled = false;
        this.strong = false;
        this.type = 'button';
        this.keyFocus = false;
    }
    componentWillLoad() {
        if (this.fill === undefined) {
            this.fill = findParent(this.el, 'yoo-ion-buttons') ? 'clear' : 'solid';
        }
    }
    onFocus() {
        this.ionFocus.emit();
    }
    onKeyUp() {
        this.keyFocus = true;
    }
    onBlur() {
        this.keyFocus = false;
        this.ionBlur.emit();
    }
    // onClick(ev: Event) {
    //   if (this.type === 'submit') {
    //     // this button wants to specifically submit a form
    //     // climb up the dom to see if we're in a <form>
    //     // and if so, then use JS to submit it
    //     let node = this.el;
    //     while ((node = getParentNode(node))) {
    //       if (node.nodeName.toLowerCase() === 'form') {
    //         // cool, this submit button is within a <form>, let's submit it
    //         // prevent the button's default and stop it's propagation
    //         ev.preventDefault();
    //         ev.stopPropagation();
    //         // submit the <form> via JS
    //         (node as HTMLFormElement).submit();
    //         break;
    //       }
    //     }
    //   }
    // }
    renderButton() {
        const TagType = this.href ? 'a' : 'button';
        const attrs = (TagType === 'button')
            ? { type: this.type }
            : { href: this.href };
        return (h(TagType, Object.assign({}, attrs, { class: "button-native", disabled: this.disabled, onFocus: this.onFocus.bind(this), onKeyUp: this.onKeyUp.bind(this), onBlur: this.onBlur.bind(this) }),
            h("span", { class: "button-inner" },
                h("slot", { name: "icon-only" }),
                h("slot", { name: "start" }),
                h("slot", null),
                h("slot", { name: "end" }))));
    }
    getExtraClasses() {
        let extraClasses = ' ';
        if (this.el.classList.contains('neutral')) {
            extraClasses += 'neutral';
        }
        return extraClasses;
    }
    hostData() {
        const { buttonType, color, disabled, expand, fill, shape, size, strong } = this;
        return {
            class: Object.assign({}, getButtonClassMap(buttonType), getButtonTypeClassMap(buttonType, expand), getButtonTypeClassMap(buttonType, size), getButtonTypeClassMap(buttonType, shape), getButtonTypeClassMap(buttonType, strong ? 'strong' : undefined), getColorClassMap(buttonType, color, fill), { 'focused': this.keyFocus, 'button-disabled': disabled }, getAppContext()),
            'tappable': true
        };
    }
    render() {
        if (this.tapAnimation) {
            return h("yoo-tappable", { class: this.getExtraClasses() }, this.renderButton());
        }
        else {
            return this.renderButton();
        }
    }
    static get is() { return "yoo-ion-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "buttonType": {
            "type": String,
            "attr": "button-type",
            "mutable": true
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "reflectToAttr": true
        },
        "el": {
            "elementRef": true
        },
        "expand": {
            "type": String,
            "attr": "expand",
            "reflectToAttr": true
        },
        "fill": {
            "type": String,
            "attr": "fill",
            "reflectToAttr": true,
            "mutable": true
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "keyFocus": {
            "state": true
        },
        "routerDirection": {
            "type": String,
            "attr": "router-direction"
        },
        "shape": {
            "type": String,
            "attr": "shape",
            "reflectToAttr": true
        },
        "size": {
            "type": String,
            "attr": "size",
            "reflectToAttr": true
        },
        "strong": {
            "type": Boolean,
            "attr": "strong"
        },
        "tapAnimation": {
            "type": Boolean,
            "attr": "tap-animation"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get events() { return [{
            "name": "ionFocus",
            "method": "ionFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionBlur",
            "method": "ionBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-ion-button:**/"; }
}
