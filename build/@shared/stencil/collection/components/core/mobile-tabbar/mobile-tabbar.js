import { getAppContext } from '../../../utils';
export class YooMobileTabbarComponent {
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
    static get style() { return "/**style-placeholder:yoo-mobile-tabbar:**/"; }
}
