import { createColorClasses, hostContext } from '../../../utils/ionic';
import { querySelectorAllDeep, getAppContext } from '../../../utils';
export class YooIonItemComponent {
    constructor() {
        /**
         * The mode determines which platform styles to use.
         * Possible values are: `"ios"` or `"md"`.
         */
        /**
         * If true, a button tag will be rendered and the item will be tappable. Defaults to `false`.
         */
        this.button = false;
        /**
         * The icon to use when `detail` is set to `true`. Defaults to `"ios-arrow-forward"`.
         */
        this.detailIcon = 'ios-arrow-forward';
        /**
         * If true, the user cannot interact with the item. Defaults to `false`.
         */
        this.disabled = false;
        this.itemStyles = {};
    }
    itemStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const updatedKeys = Object.keys(ev.detail);
        const newStyles = {};
        const childStyles = this.itemStyles[tagName] || {};
        let hasStyleChange = false;
        for (const key of updatedKeys) {
            const itemKey = `item-${key}`;
            const newValue = updatedStyles[key];
            if (newValue !== childStyles[itemKey]) {
                hasStyleChange = true;
            }
            newStyles[itemKey] = newValue;
        }
        if (hasStyleChange) {
            this.itemStyles[tagName] = newStyles;
            this.el.forceUpdate();
        }
    }
    componentDidLoad() {
        // Change the button size to small for each ion-button in the item
        // unless the size is explicitly set
        const buttons = querySelectorAllDeep(this.el, 'yoo-ion-button');
        for (let i = 0; i < buttons.length; i++) {
            if (!buttons[i].size) {
                buttons[i].size = 'small';
            }
        }
    }
    isClickable() {
        return !!(this.href || this.el.onclick || this.button);
    }
    hostData() {
        const childStyles = {};
        for (const key in this.itemStyles) {
            Object.assign(childStyles, this.itemStyles[key]);
        }
        return {
            'tappable': this.isClickable(),
            class: Object.assign({}, childStyles, getAppContext(), createColorClasses(this.color), { [`item-lines-${this.lines}`]: !!this.lines, 'item-disabled': this.disabled, 'in-list': hostContext('yoo-ion-list', this.el), 'item': true, 
                // added
                'item-ios': true })
        };
    }
    render() {
        const clickable = this.isClickable();
        const TagType = clickable ? (this.href ? 'a' : 'button') : 'div';
        const attrs = TagType === 'button' ? { type: 'button' } : { href: this.href };
        // const showDetail = this.detail !== null ? this.detail : 'ios' === 'ios' && clickable;
        return (h(TagType, Object.assign({}, attrs, { class: "item-native" }),
            h("slot", { name: "start" }),
            h("div", { class: "item-inner" },
                h("div", { class: "input-wrapper" },
                    h("slot", null)),
                h("slot", { name: "end" })),
            this.state && h("div", { class: "item-state" })));
    }
    static get is() { return "yoo-ion-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "button": {
            "type": Boolean,
            "attr": "button"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "detail": {
            "type": Boolean,
            "attr": "detail"
        },
        "detailIcon": {
            "type": String,
            "attr": "detail-icon"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "lines": {
            "type": String,
            "attr": "lines"
        },
        "routerDirection": {
            "type": String,
            "attr": "router-direction"
        },
        "state": {
            "type": String,
            "attr": "state"
        }
    }; }
    static get listeners() { return [{
            "name": "ionStyle",
            "method": "itemStyle"
        }]; }
    static get style() { return "/**style-placeholder:yoo-ion-item:**/"; }
}
