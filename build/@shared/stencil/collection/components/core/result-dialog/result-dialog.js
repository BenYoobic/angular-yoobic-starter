import { translateMulti, translate } from '../../../utils';
export class YooResultDialogComponent {
    onClose() {
        this.close.emit();
    }
    render() {
        return ([
            h("div", { class: "outer-container" },
                h("img", { class: "result-dialog-icon", src: this.success ? 'assets/empty-states/check.svg' : 'assets/empty-states/reject.svg' }),
                (this.heading ?
                    h("div", { class: "result-dialog-heading", innerHTML: translateMulti(this.heading) }) : null),
                (this.subheading ? h("div", { class: "result-dialog-subheading", innerHTML: translateMulti(this.subheading) }) : null),
                h("div", { class: "result-dialog-footer" },
                    h("div", { class: "border" }),
                    h("div", { class: "result-dialog-footer-button", onClick: () => this.onClose() }, translate(this.buttonText || 'OK'))))
        ]);
    }
    static get is() { return "yoo-result-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "buttonText": {
            "type": String,
            "attr": "button-text"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "subheading": {
            "type": String,
            "attr": "subheading"
        },
        "success": {
            "type": Boolean,
            "attr": "success"
        }
    }; }
    static get events() { return [{
            "name": "close",
            "method": "close",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-result-dialog:**/"; }
}
