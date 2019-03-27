import { translate, getElementDimensions } from '../../../utils';
const ITEM_WIDTH = 40;
const ARROWS_SIZE = ITEM_WIDTH * 2;
const DESCRIPTION_LENGTH = 310; // need to adjust for translation
const TRUNCATION = '…';
const MIN_TRUNCATION_PAGER = 5;
export class YooPaginationComponent {
    constructor() {
        this.currentPage = 0; // index number, i.e currentPage=0 will be page 1
        this.maxPagerSize = 11;
    }
    componentDidLoad() {
        this.updateVisibility();
        this.resizeListener = () => this.updateVisibility();
        window.addEventListener('resize', this.resizeListener, false);
    }
    componentDidUpdate() {
        this.updateVisibility();
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener, false);
    }
    get currentPageDisplay() {
        return this.currentPage + 1;
    }
    get totalPages() {
        return this.itemsPerPage > 0 ? Math.ceil(this.totalItems / this.itemsPerPage) : 0;
    }
    isLastPage(page) {
        return page >= this.totalPages;
    }
    isFirstPage(page) {
        return page === 1;
    }
    hasNext() {
        return !this.isLastPage(this.currentPageDisplay);
    }
    hasPrevious() {
        return !this.isFirstPage(this.currentPageDisplay);
    }
    isTotalVisible(width) {
        const minWidthWithDescription = DESCRIPTION_LENGTH + ARROWS_SIZE + this.getPagerSize(width) * ITEM_WIDTH;
        return this.showTotal && width > minWidthWithDescription;
    }
    getPagerSize(width) {
        width -= ARROWS_SIZE;
        let availableItems = Math.floor(width / ITEM_WIDTH);
        return Math.min(this.totalPages, Math.max(0, availableItems), this.maxPagerSize);
    }
    getDisplayValue(position) {
        // no truncation required. position = page number.
        if (this.totalPages <= this.pagerSize) {
            return position;
        }
        let leftTruncationPos = this.currentPageDisplay >= this.pagerSize - 1 ? 2 : undefined;
        let rightTruncationPos = this.totalPages - this.currentPageDisplay + 1 >= this.pagerSize - 1 ? this.pagerSize - 1 : undefined;
        let currentPagePosition = Math.ceil(this.pagerSize / 2);
        if (this.pagerSize < MIN_TRUNCATION_PAGER) {
            if (leftTruncationPos && !rightTruncationPos) {
                currentPagePosition = this.pagerSize - this.totalPages + this.currentPageDisplay;
            }
            if (!leftTruncationPos && rightTruncationPos) {
                currentPagePosition = this.currentPageDisplay;
            }
            return this.currentPageDisplay - currentPagePosition + position;
        }
        // Both truncations
        if (rightTruncationPos && leftTruncationPos) {
            if (position === leftTruncationPos || position === rightTruncationPos) {
                return TRUNCATION;
            }
            if (position === 1) {
                return position;
            }
            if (position === this.pagerSize) {
                return this.totalPages;
            }
            return this.currentPageDisplay - currentPagePosition + position;
        }
        // only right or left truncation
        let truncationPosition = leftTruncationPos || rightTruncationPos;
        if (position < truncationPosition) {
            return position;
        }
        if (position > truncationPosition) {
            return this.totalPages - this.pagerSize + position;
        }
        return TRUNCATION;
    }
    moveToPage(page) {
        let newPage = this.currentPageDisplay;
        if (page === 'right' && this.hasNext()) {
            newPage++;
        }
        if (page === 'left' && this.hasPrevious()) {
            newPage--;
        }
        if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
            newPage = page;
        }
        if (this.pageChanged && this.currentPageDisplay !== newPage) {
            this.pageChanged.emit(newPage - 1);
        }
    }
    updateVisibility() {
        let width = getElementDimensions(this.host).width;
        this.pagerSize = this.getPagerSize(width);
        this.totalVisible = this.isTotalVisible(width);
    }
    updateItemsPerPage(newItemsPerPage) {
        this.itemsPerPageChanged.emit(newItemsPerPage);
    }
    // rendering functions
    renderTotalDescription() {
        if (this.totalVisible) {
            return (h("div", { class: "total-container" },
                h("span", { class: "text-container" }, translate('NUMBEROFITEMSPERPAGE')),
                h("yoo-context-menu", null,
                    h("div", { slot: "trigger", class: "text-container" },
                        ' ' + this.itemsPerPage + ' ',
                        h("span", { class: "yo-arrow-dropdown" })),
                    h("div", { class: "dropdown-entry", onClick: () => this.updateItemsPerPage(10) }, "10"),
                    h("div", { class: "dropdown-entry", onClick: () => this.updateItemsPerPage(25) }, "25"),
                    h("div", { class: "dropdown-entry", onClick: () => this.updateItemsPerPage(100) }, "100"),
                    h("div", { class: "dropdown-entry", onClick: () => this.updateItemsPerPage(500) }, "500")),
                h("span", { class: "items-container", slot: "trigger" },
                    " ",
                    translate('TOTALITEMS') + this.totalItems)));
        }
        return null;
    }
    renderPageItem(pos) {
        let page = this.getDisplayValue(pos);
        if (page === '…') {
            return (h("span", { class: "page-number ellipsis" },
                h("span", { class: "yo-more" })));
        }
        return (h("span", { class: 'page-number ' + (page === this.currentPageDisplay ? 'active' : ''), onClick: () => this.moveToPage(page) }, page));
    }
    render() {
        return (h("div", { class: 'container ' + (this.totalVisible ? 'show-total' : 'show-total-disabled') },
            this.renderTotalDescription(),
            h("div", { class: "inner-container" },
                h("div", { class: 'page-number ' + (!this.hasPrevious() ? 'disabled' : ''), onClick: this.hasPrevious() ? () => this.moveToPage('left') : null },
                    h("span", { class: "yo-left" })),
                [...Array(this.pagerSize)].fill(0).map((_, k) => {
                    return this.renderPageItem(k + 1);
                }),
                h("div", { class: 'page-number ' + (!this.hasNext() ? 'disabled' : ''), onClick: this.hasNext() ? () => this.moveToPage('right') : null },
                    h("span", { class: "yo-right" })))));
    }
    static get is() { return "yoo-pagination"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "currentPage": {
            "type": Number,
            "attr": "current-page"
        },
        "host": {
            "elementRef": true
        },
        "itemsPerPage": {
            "type": Number,
            "attr": "items-per-page"
        },
        "maxPagerSize": {
            "type": Number,
            "attr": "max-pager-size"
        },
        "pagerSize": {
            "state": true
        },
        "showTotal": {
            "type": Boolean,
            "attr": "show-total"
        },
        "totalItems": {
            "type": Number,
            "attr": "total-items"
        },
        "totalVisible": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "pageChanged",
            "method": "pageChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "itemsPerPageChanged",
            "method": "itemsPerPageChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-pagination:**/"; }
}
