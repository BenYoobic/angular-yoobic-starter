const h = window.DesignSystem.h;

import { k as isCordova, o as isIOS, be as isIphoneX } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooIonToolbarTitleComponent {
    constructor() {
        this.halfScreen = false;
    }
    hostData() {
        return {
            class: {
                'ios': isCordova() && isIOS() && !this.halfScreen,
                'iphone-x': isIphoneX() && !this.halfScreen
            }
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-title" },
                h("slot", null))
        ];
    }
    static get is() { return "yoo-ion-title"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "halfScreen": {
            "type": Boolean,
            "attr": "half-screen"
        }
    }; }
    static get style() { return ":host {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0); }\n\n.toolbar-title {\n  display: block;\n  font-size: var(--font-l, 17px);\n  letter-spacing: normal;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  pointer-events: auto; }\n\n:host(.left) .toolbar-title {\n  width: 100%;\n  padding-left: var(--padding-20, 1.25rem);\n  text-align: left; }\n\n:host(.calendar-title) .toolbar-title {\n  font-size: var(--font-l, 17px);\n  font-style: normal;\n  font-weight: 400 !important; }\n\n:host(.no-bold) .toolbar-title {\n  font-weight: 400; }\n\n:host(.ios) {\n  -ms-flex-align: end !important;\n  align-items: flex-end !important; }\n  :host(.ios) .toolbar-title {\n    margin-bottom: 0.3125rem; }\n\n:host(.img) {\n  padding-bottom: 0 !important; }\n\n:host(.autocomplete-half-screen.ios) .toolbar-title {\n  margin-bottom: 1.20rem; }\n\n:host(.flex) .toolbar-title {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n:host(.dark) {\n  color: var(--black, #000000); }"; }
}

export { YooIonToolbarTitleComponent as YooIonTitle };
