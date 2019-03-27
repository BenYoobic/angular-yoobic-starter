import { isCordova, isIOS, isIphoneX } from '../../../utils';
export class YooIonToolbarTitleComponent {
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
    static get style() { return "/**style-placeholder:yoo-ion-title:**/"; }
}
