import { getAppContext } from '../../../index';
export class YooIonFooterComponent {
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    static get is() { return "yoo-ion-footer"; }
    static get style() { return "/**style-placeholder:yoo-ion-footer:**/"; }
}
