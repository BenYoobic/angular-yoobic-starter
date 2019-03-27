const h = window.DesignSystem.h;

import { a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooMobileTabbarComponent {
    constructor() {
        this.activeIndex = 0;
        this.isBusy = false;
    }
    setActiveIcon(index) {
        this.activeIndex = index;
    }
    onIconClick(item, index) {
        const PAGE_TRANSITION_DURATION = 500;
        if (this.isBusy) {
            return;
        }
        else {
            this.isBusy = true;
            if (item.handler) {
                item.handler();
            }
            if (index !== this.activeIndex) {
                this.tabChanged.emit(item);
                this.activeIndex = index;
            }
        }
        setTimeout(() => {
            this.isBusy = false;
        }, PAGE_TRANSITION_DURATION);
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return h("div", { class: "outer-container" }, (this.items || []).map((item, index) => {
            const isNotificationHasText = typeof item.notif === 'string' || typeof item.notif === 'number';
            return h("yoo-tappable", null,
                h("div", { class: 'item-container ' + (index === this.activeIndex ? 'active' : ''), onClick: () => this.onIconClick(item, index) },
                    item.icon ? h("div", { class: "icon-container" },
                        h("yoo-icon", { class: index === this.activeIndex ? item.iconActive || item.icon : item.icon }, item.notif ? h("yoo-badge", { class: 'danger notification-' + (isNotificationHasText ? 'medium' : 'mini'), text: isNotificationHasText ? item.notif + '' : null }) : null)) : null,
                    item.text ? h("div", { class: "text-container" },
                        h("span", { class: "text" }, item.text)) : null));
        }));
    }
    static get is() { return "yoo-mobile-tabbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "activeIndex": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "setActiveIcon": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "tabChanged",
            "method": "tabChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n  height: 49px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n  :host .outer-container .item-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: end;\n    justify-content: flex-end;\n    width: 100%;\n    min-width: 48px;\n    padding-top: 0.4875rem;\n    color: var(--tab-bar-color, #adadad);\n    overflow: hidden; }\n    :host .outer-container .item-container.active {\n      display: inline; }\n      :host .outer-container .item-container.active .icon-container {\n        -webkit-background-clip: text;\n        background-clip: text;\n        color: var(--success, #04CC99);\n        text-align: center; }\n      :host .outer-container .item-container.active .text-container {\n        color: var(--success, #04CC99);\n        text-align: center; }\n    :host .outer-container .item-container .icon-container {\n      position: relative;\n      max-height: 22px;\n      margin-bottom: -5px; }\n      :host .outer-container .item-container .icon-container yoo-icon {\n        font-size: 20px;\n        line-height: 1.4rem; }\n        :host .outer-container .item-container .icon-container yoo-icon yoo-badge {\n          position: absolute;\n          top: -20px; }\n    :host .outer-container .item-container .text {\n      font-size: var(--font-xs, 10px); }\n\n:host(.iphone-x) .outer-container {\n  -ms-flex-align: start;\n  align-items: flex-start;\n  height: 73px !important; }\n  :host(.iphone-x) .outer-container .item-container {\n    -ms-flex-pack: initial !important;\n    justify-content: initial !important;\n    height: 100%; }\n    :host(.iphone-x) .outer-container .item-container .dot {\n      top: 35%; }\n\n:host(.boost) .outer-container .item-container.active .icon-container {\n  color: var(--danger-light, #F46885) !important; }\n\n:host(.boost) .outer-container .item-container.active .text-container {\n  color: var(--danger-light, #F46885) !important; }"; }
}

export { YooMobileTabbarComponent as YooMobileTabbar };
