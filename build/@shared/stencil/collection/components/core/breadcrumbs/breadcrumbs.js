import { getElementDimensions, debounce } from '../../../utils';
export class YooBreadcrumbsComponent {
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
    static get style() { return "/**style-placeholder:yoo-breadcrumbs:**/"; }
}
