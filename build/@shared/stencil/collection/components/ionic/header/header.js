import { createThemedClasses } from '../../../utils/ionic';
export class YooIonHeaderComponent {
    hostData() {
        return {
            class: createThemedClasses('ios', 'header')
        };
    }
    static get is() { return "yoo-ion-header"; }
    static get style() { return "/**style-placeholder:yoo-ion-header:**/"; }
}
