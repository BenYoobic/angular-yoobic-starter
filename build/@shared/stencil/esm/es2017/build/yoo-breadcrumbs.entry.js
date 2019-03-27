import { h } from '../design-system.core.js';

import { a6 as debounce, a4 as getElementDimensions } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooBreadcrumbsComponent {
    constructor() {
        this.items = [];
        this.visibleItems = 7;
        this.ITEM_WIDTH = 80;
        this.MAX_VISIBLE_ITEMS = 7;
    }
    componentWillLoad() {
        this.setItemNumber();
        // check the body width here and set max_steps accordingly
        this.resizeListener = debounce(this.setItemNumber, 500).bind(this);
        window.addEventListener('resize', this.resizeListener);
    }
    commponentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    setItemNumber() {
        let width = getElementDimensions(this.host.parentElement).width;
        this.visibleItems = Math.min(Math.floor(width / this.ITEM_WIDTH), this.MAX_VISIBLE_ITEMS);
    }
    selectItem(item) {
        this.itemSelected.emit(item);
    }
    isLastItem(index, arr) {
        return index === arr.length - 1;
    }
    renderDefaultBreadcrumbItem(item, index, arr) {
        // last item is active
        return (h("div", { class: 'breadcrumb-item ' + (this.isLastItem(index, arr) ? 'active' : ''), onClick: this.selectItem.bind(this, item) },
            h("span", null, item),
            (!this.isLastItem(index, arr) ? h("yoo-icon", { class: "yo-right" }) : '')));
    }
    renderCollapsedBreadcrumbItem(item) {
        return (h("span", { onClick: this.selectItem.bind(this, item) }, item));
    }
    // totalItems > MAX_VISIBLE_ITEMS creates a dropdown
    render() {
        let collapsedItems = [];
        if (this.items.length > this.MAX_VISIBLE_ITEMS) {
            collapsedItems = this.items.slice(0, this.items.length - this.visibleItems);
        }
        let visibleItems;
        collapsedItems.length > 0 ? visibleItems = this.items.slice(this.items.length - this.visibleItems) : visibleItems = this.items;
        return (h("div", { class: 'breadcrumb ' + (collapsedItems.length > 0 ? 'long' : '') },
            collapsedItems.length > 0 ?
                h("yoo-context-menu", null,
                    h("div", { slot: "trigger", class: "breadcrumb-item more" },
                        h("span", { class: "more-icons" },
                            h("yoo-icon", { class: "yo-more" }),
                            " ",
                            h("yoo-icon", { class: "yo-arrow-dropdown" })),
                        h("span", { class: "yo-right" })),
                    h("div", { class: "context-container" }, collapsedItems.map(item => this.renderCollapsedBreadcrumbItem(item))))
                : '',
            visibleItems.map((item, index, arr) => this.renderDefaultBreadcrumbItem(item, index, arr))));
    }
    static get is() { return "yoo-breadcrumbs"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "visibleItems": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "itemSelected",
            "method": "itemSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .breadcrumb {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 0.375rem 0rem;\n  font-size: var(--font-s, 13px);\n  line-height: 2; }\n  :host .breadcrumb .breadcrumb-item {\n    -ms-flex-item-align: center;\n    align-self: center;\n    padding-right: 0.75rem;\n    color: var(--dark-60, #6b81a6); }\n    :host .breadcrumb .breadcrumb-item span {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      position: relative;\n      padding-right: 0.75rem; }\n    :host .breadcrumb .breadcrumb-item.active {\n      color: var(--text-color, #807f83); }\n    :host .breadcrumb .breadcrumb-item.more span.yo-right {\n      padding-right: 0rem; }\n    :host .breadcrumb .breadcrumb-item.more .more-icons {\n      padding-left: 0.75rem; }\n      :host .breadcrumb .breadcrumb-item.more .more-icons yoo-icon.yo-arrow-dropdown {\n        padding: 0rem 0.25rem; }\n  :host .breadcrumb yoo-context-menu .context-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column-reverse;\n    flex-direction: column-reverse; }\n    :host .breadcrumb yoo-context-menu .context-container span {\n      position: relative;\n      width: 100%;\n      padding: 0.5rem 1rem;\n      border-top: 1px solid var(--stable-30, #E6E6E6);\n      line-height: 1.5; }\n      :host .breadcrumb yoo-context-menu .context-container span:last-child {\n        border-top: none; }\n      :host .breadcrumb yoo-context-menu .context-container span:hover {\n        background: var(--accent-05, #f4fbff);\n        color: var(--dark, #2b3648); }"; }
}

export { YooBreadcrumbsComponent as YooBreadcrumbs };
