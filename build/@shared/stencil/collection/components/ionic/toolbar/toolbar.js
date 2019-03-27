import { createColorClasses } from '../../../utils/ionic';
import { isCordova, isIOS, isIphoneX, querySelectorDeep, getElementDimensions, getAppContext, getConfig } from '../../../utils';
export class YooIonToolbarComponent {
    constructor() {
        this.translucent = false;
        this.halfScreen = false;
        this.animateOnLoad = false;
        this.secondary = false;
        this.centerTitle = true;
    }
    componentDidLoad() {
        if (this.animateOnLoad) {
            const DELAY_ANIMATION = 100;
            setTimeout(() => {
                this.host.setAttribute('style', 'height: 55px');
            }, DELAY_ANIMATION);
        }
        if (this.host.shadowRoot && !getConfig().isE2E) {
            this.adjustPositionTitle();
        }
    }
    adjustPositionTitle() {
        if (this.centerTitle) {
            this.elementStart = querySelectorDeep(this.host, '[name=start]').assignedNodes()[0];
            this.elementSecondary = querySelectorDeep(this.host, '[name=secondary]').assignedNodes()[0];
            this.elementPrimary = querySelectorDeep(this.host, '[name=primary]').assignedNodes()[0];
            this.elementEnd = querySelectorDeep(this.host, '[name=end]').assignedNodes()[0];
            this.elementTitle = querySelectorDeep(this.host, '.toolbar-content').firstElementChild.assignedNodes()[0];
            let sumWidthLeft = 0;
            let sumWidthRight = 0;
            this.elementStart ? sumWidthLeft += getElementDimensions(this.elementStart).width : sumWidthLeft += 0;
            this.elementSecondary ? sumWidthLeft += getElementDimensions(this.elementSecondary).width : sumWidthLeft += 0;
            this.elementPrimary ? sumWidthRight += getElementDimensions(this.elementPrimary).width : sumWidthRight += 0;
            this.elementEnd ? sumWidthRight += getElementDimensions(this.elementEnd).width : sumWidthRight += 0;
            let paddingValue = sumWidthLeft - sumWidthRight;
            if ((sumWidthLeft > 0 || sumWidthRight > 0) && this.elementTitle && this.elementTitle.style) {
                paddingValue > 0 ? this.elementTitle.style.paddingRight = paddingValue + 'px' : this.elementTitle.style.paddingLeft = Math.abs(paddingValue) + 'px';
                this.elementTitle.style.position = 'relative';
            }
        }
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { 'toolbar-translucent': this.translucent, 'ios': isCordova() && isIOS() && !this.halfScreen && !this.secondary, 'iphone-x-fullscreen': isIphoneX() && !this.halfScreen && !this.secondary, 'isCordova': isCordova(), 'animate': this.animateOnLoad }, getAppContext())
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-background" }),
            h("slot", { name: "start" }),
            h("slot", { name: "secondary" }),
            h("div", { class: "toolbar-content" },
                h("slot", null)),
            h("slot", { name: "primary" }),
            h("slot", { name: "end" })
        ];
    }
    static get is() { return "yoo-ion-toolbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "animateOnLoad": {
            "type": Boolean,
            "attr": "animate-on-load"
        },
        "centerTitle": {
            "type": Boolean,
            "attr": "center-title"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "halfScreen": {
            "type": Boolean,
            "attr": "half-screen"
        },
        "host": {
            "elementRef": true
        },
        "secondary": {
            "type": Boolean,
            "attr": "secondary"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-ion-toolbar:**/"; }
}
