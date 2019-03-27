import { translate } from '../../../index';
export class YooFormCreatorBlockExpandableComponent {
    constructor() {
        this.isExpanded = false;
    }
    onHeaderIconClicked(icon) {
        switch (icon) {
            case 'yo-down':
                this.isExpanded = true;
                break;
            case 'yo-up':
                this.isExpanded = false;
                break;
        }
    }
    renderHeader() {
        return (h("div", { class: "header" },
            h("div", { class: 'form-icon ' + this.formField.category },
                h("yoo-icon", { class: this.formField.icon + ' always-light' })),
            h("div", { class: "title" }, translate(this.formField.title)),
            h("div", { class: "icons-container" },
                this.renderIcon('yo-logic'),
                this.renderIcon('yo-scoring'),
                this.renderIcon('yo-translate'),
                this.renderIcon('yo-more'),
                this.renderIcon(this.isExpanded ? 'yo-up' : 'yo-down'))));
    }
    renderIcon(icon) {
        return (h("div", { class: "icon-container", onClick: () => this.onHeaderIconClicked(icon) },
            h("yoo-icon", { class: { [icon]: true, 'stable': true } })));
    }
    renderContent() {
        return (h("div", { class: "content-container" },
            h("slot", null)));
    }
    render() {
        return (h("div", { class: { 'outer-container': true, 'expanded': this.isExpanded } },
            this.renderHeader(),
            this.isExpanded && this.renderContent()));
    }
    static get is() { return "yoo-form-creator-block-expandable"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "formField": {
            "type": "Any",
            "attr": "form-field"
        },
        "host": {
            "elementRef": true
        },
        "isExpanded": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-form-creator-block-expandable:**/"; }
}
