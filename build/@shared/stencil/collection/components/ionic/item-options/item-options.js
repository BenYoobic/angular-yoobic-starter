import { isEndSide } from '../../../utils/ionic';
export class YooIonItemOptionsComponent {
    constructor() {
        /**
         * The side the option button should be on. Possible values: `"start"` and `"end"`. Defaults to `"end"`. If you have multiple `ion-item-options`, a side must be provided for each.
         *
         */
        this.side = 'end';
    }
    fireSwipeEvent() {
        this.ionSwipe.emit();
    }
    hostData() {
        const isEnd = isEndSide(window, this.side);
        return {
            class: {
                'item-options-start': !isEnd,
                'item-options-end': isEnd
            }
        };
    }
    static get is() { return "yoo-ion-item-options"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "fireSwipeEvent": {
            "method": true
        },
        "side": {
            "type": String,
            "attr": "side"
        }
    }; }
    static get events() { return [{
            "name": "ionSwipe",
            "method": "ionSwipe",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-ion-item-options:**/"; }
}
