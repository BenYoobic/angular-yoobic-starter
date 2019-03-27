import { isIphoneX } from '../../../utils';
export class YooIonButtonsComponent {
    hostData() {
        return {
            class: {
                'iphone-x': isIphoneX() && !this.halfScreen
            }
        };
    }
    static get is() { return "yoo-ion-buttons"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "halfScreen": {
            "type": Boolean,
            "attr": "half-screen"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-ion-buttons:**/"; }
}
