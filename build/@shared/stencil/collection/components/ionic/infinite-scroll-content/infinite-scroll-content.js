import { createThemedClasses } from '../../../utils/ionic';
export class YooInfiniteScrollContentComponent {
    constructor() {
        /**
         * An animated SVG spinner that shows while loading.
         */
        this.loadingSpinner = 'spinner';
    }
    hostData() {
        return {
            class: createThemedClasses('ios', 'infinite-scroll-content')
        };
    }
    render() {
        return (h("div", { class: "infinite-loading" },
            this.loadingSpinner && (h("div", { class: "infinite-loading-spinner" },
                h("img", { src: "assets/loader/loading_thin.svg" }))),
            this.loadingText && (h("div", { class: "infinite-loading-text", innerHTML: this.loadingText }))));
    }
    static get is() { return "yoo-ion-infinite-scroll-content"; }
    static get properties() { return {
        "loadingSpinner": {
            "type": String,
            "attr": "loading-spinner",
            "mutable": true
        },
        "loadingText": {
            "type": String,
            "attr": "loading-text"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-ion-infinite-scroll-content:**/"; }
}
