import { translate } from '../../../utils';
export class YooFormCreatorPageCardComponent {
    onPageCardClicked() {
        this.pageClicked.emit();
    }
    renderHeading() {
        return (h("div", { class: "heading" },
            h("div", { class: "page-number" }, `${translate('PAGE')} ${this.pageCardEntry.pageNumber}`),
            this.pageCardEntry.selected && h("div", { class: "check-container" },
                h("yoo-icon", { class: "yo-check" }))));
    }
    renderSubheading() {
        return (h("div", { class: "subheading" },
            h("div", { class: "page-title" }, this.pageCardEntry.pageTitle)));
    }
    renderFooter() {
        return (h("div", { class: "footer" },
            h("div", { class: "block-number" }, `${this.pageCardEntry.blockNumber} Blocks`),
            h("div", { class: "more-container" },
                h("yoo-icon", { class: "yo-more" }))));
    }
    render() {
        return (h("div", { class: { 'outer-container': true, 'selected': this.pageCardEntry.selected }, onClick: () => this.onPageCardClicked() },
            this.renderHeading(),
            this.renderSubheading(),
            this.renderFooter()));
    }
    static get is() { return "yoo-form-creator-page-card"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "pageCardEntry": {
            "type": "Any",
            "attr": "page-card-entry"
        }
    }; }
    static get events() { return [{
            "name": "pageClicked",
            "method": "pageClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-creator-page-card:**/"; }
}
