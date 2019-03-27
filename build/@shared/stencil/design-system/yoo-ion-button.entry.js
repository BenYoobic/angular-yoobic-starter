const h = window.DesignSystem.h;

import { a7 as findParent, cy as getButtonClassMap, cz as getButtonTypeClassMap, cA as getColorClassMap, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooIonButtonComponent {
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
    static get style() { return ":host(.success):host(.operations),\n:host(.ion-color-success):host(.operations),\n:host([color=success]):host(.operations) {\n  color: var(--success, #04CC99) !important; }\n\n:host(.success):host(.boost),\n:host(.ion-color-success):host(.boost),\n:host([color=success]):host(.boost) {\n  color: var(--danger-light, #F46885) !important; }\n\n:host(.energized),\n:host(.ion-color-energized),\n:host([color=energized]) {\n  color: var(--energized, #fed05b) !important; }\n\n:host(.boost.energized),\n:host(.boost.ion-color-energized),\n:host(.boost[color=energized]) {\n  color: var(--danger-light, #F46885) !important; }\n\n:host(.text-color) {\n  color: var(--text-color, #807f83) !important; }\n\n:host {\n  --ion-color-base: var(--ion-color-primary, #1FB6FF);\n  --ion-color-contrast: var(--ion-color-primary-contrast, #fff);\n  --ion-color-shade: var(--ion-color-primary-shade, get-color-shade(#1FB6FF));\n  --ripple-color: currentColor;\n  display: inline-block;\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle; }\n\n:host([disabled]) {\n  pointer-events: none; }\n\n:host(.button-disabled) {\n  pointer-events: none; }\n\n:host(.button-outline) {\n  --border-color: var(--ion-color-base);\n  --background: transparent;\n  color: var(--ion-color-base); }\n\n:host(.button-clear) {\n  --border-width: 0;\n  --background: transparent;\n  color: var(--ion-color-base); }\n\n:host(.button-block) {\n  display: block; }\n\n:host(.button-block) .button-native {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  clear: both;\n  contain: strict; }\n\n:host(.button-block) .button-native::after {\n  clear: both; }\n\n:host(.button-full) {\n  display: block; }\n\n:host(.button-full) .button-native {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  contain: strict; }\n\n:host(.button-full:not(.button-round)) .button-native {\n  border-radius: 0;\n  border-right-width: 0;\n  border-left-width: 0; }\n\n:host(.ion-color-dark) {\n  color: var(--black, #000000); }\n\n:host(.ion-color-success) {\n  color: var(--success, #04CC99); }\n\n:host(.ion-color-stable) {\n  color: var(--stable, #adadad); }\n  :host(.ion-color-stable):hover {\n    color: var(--black, #000000); }\n\n:host(.ion-color-stable-alt) {\n  color: var(--stable-alt, #d0d0d0); }\n\n:host(.ion-color-text-color) {\n  color: var(--text-color, #807f83); }\n\n:host(.ion-color-energized) {\n  color: var(--energized, #fed05b); }\n\n:host(.ion-color-danger-light) {\n  color: var(--danger-light, #F46885); }\n\n:host(.ion-color-always-light) {\n  color: var(--white); }\n\n.button-native {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  border-radius: var(--border-radius, 1px);\n  margin: var(--margin-top) var(--margin-end) var(--margin-bottom) var(--margin-start);\n  padding: var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);\n  display: inline-block;\n  position: relative;\n  min-width: var(--padding-35, 2.1875rem);\n  height: var(--height);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  -webkit-transition: opacity 300ms;\n  transition: opacity 300ms;\n  border-width: var(--border-width, 1px);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background: var(--background);\n  color: inherit;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  line-height: 1;\n  text-align: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  white-space: inherit;\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  contain: content;\n  cursor: pointer;\n  opacity: var(--opacity);\n  overflow: hidden;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  z-index: 0;\n  -webkit-font-kerning: none;\n  font-kerning: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\n.button-native[disabled] {\n  cursor: default;\n  opacity: .5;\n  pointer-events: none; }\n\n.button-native:active,\n.button-native:focus {\n  outline: none; }\n\n.button-inner {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%; }\n\n::slotted(ion-icon) {\n  font-size: 1.4em;\n  pointer-events: none; }\n\n::slotted(ion-icon[slot=\"start\"]) {\n  margin: 0 0.3em 0 -0.3em; }\n\n::slotted(ion-icon[slot=\"end\"]) {\n  margin: 0 -0.2em 0 0.3em; }\n\n::slotted(ion-icon[slot=\"icon-only\"]) {\n  font-size: 1.8em; }\n\nion-ripple-effect {\n  color: var(--ripple-color); }\n\n:host {\n  --border-radius: 12px;\n  --margin-top: 4px;\n  --margin-bottom: 4px;\n  --margin-start: 2px;\n  --margin-end: 2px;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 1em;\n  --padding-end: 1em;\n  --height: 2.8em;\n  --transition: background-color, opacity 100ms linear;\n  font-family: Lato !important;\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: -0.03em; }\n\n:host(.button-outline) {\n  --border-radius: 12px;\n  --border-width: 1px;\n  --border-style: solid; }\n\n:host(.button-outline.activated) {\n  --background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n:host(.button-outline.focused) {\n  --background: rgba(var(--ion-color-base-rgb), 0.1); }\n\n:host(.button-outline.activated.focused) {\n  --border-color: var(--ion-color-shade);\n  --background-color: var(--ion-color-shade); }\n\n:host(.button-clear.activated) {\n  --opacity: 0.4; }\n\n:host(.button-clear.focused) {\n  --background: rgba(var(--ion-color-base-rgb), 0.1); }\n\n:host(.button-round) {\n  --border-radius: 64px;\n  --padding-top: 0;\n  --padding-start: 26px;\n  --padding-end: 26px;\n  --padding-bottom: 0; }\n\n:host(.button-large) {\n  --border-radius: 14px;\n  --padding-top: 0;\n  --padding-start: 1em;\n  --padding-end: 1em;\n  --padding-bottom: 0;\n  --height: 2.8em;\n  font-size: 20px; }\n\n:host(.button-small) {\n  --border-radius: 8px;\n  --padding-top: 0;\n  --padding-start: 0.9em;\n  --padding-end: 0.9em;\n  --padding-bottom: 0;\n  --height: 2.1em;\n  font-size: 13px; }\n\n:host(.button-strong) {\n  font-weight: 600; }\n\n:host(.header) {\n  padding-bottom: 0.2rem; }"; }
}

export { YooIonButtonComponent as YooIonButton };
