import { getAppContext } from '../../../index';
export class YooIonSlideComponent {
    hostData() {
        return {
            class: Object.assign({ 'slide-zoom': true, 'swiper-slide': true }, getAppContext())
        };
    }
    static get is() { return "yoo-ion-slide"; }
    static get style() { return "/**style-placeholder:yoo-ion-slide:**/"; }
}
