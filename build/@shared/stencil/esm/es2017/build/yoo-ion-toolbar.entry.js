import { h } from '../design-system.core.js';

import { cO as getConfig, L as querySelectorDeep, a4 as getElementDimensions, b1 as createColorClasses, k as isCordova, o as isIOS, be as isIphoneX, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooIonToolbarComponent {
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
    static get style() { return ":host(.light),\n:host(.ion-color-light),\n:host([color=light]) {\n  color: var(--black, #000000) !important; }\n\n:host(.dark),\n:host(.ion-color-dark),\n:host([color=dark]) {\n  color: var(--light, #FFFFFF) !important; }\n\n:host(.always-drak),\n:host(.ion-color-alaways-dark),\n:host([color=always-drak]) {\n  color: #000000 !important; }\n\n:host {\n  --border-width: 0;\n  --border-style: solid;\n  --background: var(--ion-color-base);\n  --ion-color-base: var(--light, #FFFFFF);\n  --ion-color-contrast: #807f83;\n  --border-color: rgba(0, 0, 0, 0.2);\n  --translucent-filter: saturate(180%) blur(20px);\n  --translucent-background: rgba(248, 248, 248, 0.8);\n  --title-margin-top: none;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding: 4px;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  min-height: 44px;\n  color: var(--ion-color-contrast);\n  font-family: \"Lato\" !important;\n  contain: content;\n  overflow: hidden;\n  z-index: 11;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host(.toolbar-translucent) {\n  --border-color: transparent; }\n  :host(.toolbar-translucent) .toolbar-background {\n    background: var(--translucent-background);\n    -webkit-backdrop-filter: var(--translucent-filter);\n    backdrop-filter: var(--translucent-filter); }\n\n:host(.ios) {\n  -ms-flex-align: end;\n  align-items: flex-end;\n  height: 64px;\n  padding-bottom: 0.3125rem !important; }\n\n:host(.iphone-x-fullscreen) {\n  height: 88px !important;\n  padding-top: 46px !important; }\n\n:host(.ion-color-light) {\n  --ion-color-light: var(--text-color, #807f83); }\n\n:host(.ion-color-dark) {\n  --ion-color-base: var(--black, #000000); }\n\n:host(.ion-color-always-dark) {\n  --background: $black;\n  color: white; }\n\n:host(.ion-color-transparent) {\n  --ion-color-base: transparent; }\n\n.toolbar-background {\n  right: 0;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  border-width: var(--border-width, 1px);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  background: var(--background);\n  contain: strict;\n  z-index: -1;\n  pointer-events: none; }\n\n.toolbar-content {\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-order: 4;\n  order: 4;\n  min-width: 0; }\n\n::slotted(yoo-ion-title) {\n  position: relative;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  margin-top: var(--title-margin-top);\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  font-size: 5vw;\n  font-weight: 400;\n  letter-spacing: -.03em;\n  text-align: center;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  pointer-events: none; }\n\n::slotted(yoo-ion-title.img) {\n  position: absolute; }\n\n:host(.animate) {\n  height: 0;\n  min-height: 0;\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n  z-index: 0; }\n\n:host(.no-border) {\n  --border-width: 0 !important; }\n\n:host(.web) {\n  height: var(--toolbar-web-height, 48px); }\n\n:host(.shadow) {\n  color: var(--black, #000000);\n  -webkit-box-shadow: var(--toolbar-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15));\n  box-shadow: var(--toolbar-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15)); }\n\n:host(.overflow-visible) {\n  contain: none;\n  overflow: visible; }"; }
}

export { YooIonToolbarComponent as YooIonToolbar };
