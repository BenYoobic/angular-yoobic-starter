import { hammerDirections, hammerTypes, setupHammer, isBottomSwipe, isTopSwipe } from '../../../utils';
export class YooSwipeContainerComponent {
    constructor() {
        this.showSwipeControl = false;
        // If true can only swipe on the swipe control area
        this.controlOnly = false;
        this.hammerOptions = {};
    }
    componentDidLoad() {
        const finalHammerOptions = this.normalizeOptions();
        setupHammer(this.controlOnly ? this.swipeControl : this.swipeWrapper, hammerTypes.SWIPE, finalHammerOptions);
    }
    onSwipe(event) {
        const deltaY = event.deltaY;
        if (isBottomSwipe(deltaY)) {
            this.swipedDown.emit(true);
        }
        else if (isTopSwipe(deltaY)) {
            this.swipedUp.emit(true);
        }
    }
    normalizeOptions() {
        const hammerOptions = {
            handleFn: (ev) => this.onSwipe(ev),
            direction: hammerDirections.vertical
        };
        return Object.assign({}, hammerOptions, this.hammerOptions);
    }
    renderSwipeControl() {
        return (this.showSwipeControl &&
            h("div", { class: "swiper-control", ref: (el) => this.swipeControl = el },
                h("div", { class: "swiper-control-inner" })));
    }
    render() {
        return (h("div", { class: "swipe-container-wrapper", ref: (el) => this.swipeWrapper = el },
            this.renderSwipeControl(),
            h("slot", null)));
    }
    static get is() { return "yoo-swipe-container"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "controlOnly": {
            "type": Boolean,
            "attr": "control-only"
        },
        "hammerOptions": {
            "type": "Any",
            "attr": "hammer-options"
        },
        "host": {
            "elementRef": true
        },
        "showSwipeControl": {
            "type": Boolean,
            "attr": "show-swipe-control"
        }
    }; }
    static get events() { return [{
            "name": "swipedUp",
            "method": "swipedUp",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "swipedDown",
            "method": "swipedDown",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-swipe-container:**/"; }
}
