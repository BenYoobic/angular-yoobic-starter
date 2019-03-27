import { findParent } from '../../../index';
export class YooIonContentComponent {
    constructor() {
        // mode!: Mode;
        // @Prop() color?: Color;
        /**
         * If true, the content will scroll behind the headers
         * and footers. This effect can easily be seen by setting the toolbar
         * to transparent.
         */
        this.fullscreen = false;
        /**
         * By default `ion-content` uses an `ion-scroll` under the hood to implement scrolling,
         * if you want to disable the content scrolling for a given page, set this property to `false`.
         */
        this.scrollEnabled = true;
        /**
         * Because of performance reasons, ionScroll events are disabled by default, in order to enable them
         * and start listening from (ionScroll), set this property to `true`.
         */
        this.scrollEvents = false;
        this.cTop = -1;
        this.cBottom = -1;
    }
    onNavChanged() {
        this.resize();
    }
    async getScrollElement() {
        return this.scrollEl;
    }
    componentDidLoad() {
        this.resize();
    }
    componentDidUnload() {
        this.scrollEl = undefined;
    }
    resize() {
        if (!this.scrollEl) {
            return;
        }
        if (this.fullscreen) {
            this.queue.read(this.readDimensions.bind(this));
        }
        else if (this.cTop !== 0 || this.cBottom !== 0) {
            this.cTop = this.cBottom = 0;
            this.el.forceUpdate();
        }
    }
    readDimensions() {
        const page = getPageElement(this.el);
        const top = Math.max(this.el.offsetTop, 0);
        const bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
        const dirty = top !== this.cTop || bottom !== this.cBottom;
        if (dirty) {
            this.cTop = top;
            this.cBottom = bottom;
            this.el.forceUpdate();
        }
    }
    handleScroll(event) {
        this.ionScroll.emit(event.detail);
    }
    hostData() {
        return {
            // class: createColorClasses(this.color)
            class: {
                'scroll-disabled': !this.scrollEnabled
            }
        };
    }
    render() {
        this.resize();
        return [
            this.scrollEnabled ? (h("yoo-ion-scroll", { ref: el => this.scrollEl = el, scrollEvents: this.scrollEvents, forceOverscroll: this.forceOverscroll, onIonScroll: (ev) => this.handleScroll(ev), style: {
                    'top': `${-this.cTop}px`,
                    'bottom': `${-this.cBottom}px`,
                    '--offset-top': `${this.cTop}px`,
                    '--offset-bottom': `${this.cBottom}px`
                }, class: {
                    'no-scrollbar': this.el.classList.contains('no-scrollbar')
                } },
                h("slot", null))) : h("slot", null),
            h("slot", { name: "fixed" })
        ];
    }
    static get is() { return "yoo-ion-content"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "forceOverscroll": {
            "type": Boolean,
            "attr": "force-overscroll"
        },
        "fullscreen": {
            "type": Boolean,
            "attr": "fullscreen"
        },
        "getScrollElement": {
            "method": true
        },
        "queue": {
            "context": "queue"
        },
        "scrollEnabled": {
            "type": Boolean,
            "attr": "scroll-enabled"
        },
        "scrollEvents": {
            "type": Boolean,
            "attr": "scroll-events"
        }
    }; }
    static get events() { return [{
            "name": "ionScroll",
            "method": "ionScroll",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:ionNavDidChange",
            "method": "onNavChanged"
        }]; }
    static get style() { return "/**style-placeholder:yoo-ion-content:**/"; }
}
function getParentElement(el) {
    if (el.parentElement) {
        // normal element with a parent element
        return el.parentElement;
    }
    if (el.parentNode && el.parentNode.host) {
        // shadow dom's document fragment
        return el.parentNode.host;
    }
    return null;
}
function getPageElement(el) {
    const page = findParent(el, 'yoo-ion-app,ion-page,.ion-page,page-inner');
    if (page) {
        return page;
    }
    return getParentElement(el);
}
