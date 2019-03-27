import { closeModal } from '../../../utils';
export class YooBarcodeDialogComponent {
    onClose() {
        closeModal(null);
    }
    renderHeader() {
        return h("yoo-ion-header", { class: "shadow", "no-border": true },
            h("yoo-ion-toolbar", { color: "light" },
                h("yoo-ion-buttons", { slot: "start" },
                    h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onClose() },
                        h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                h("yoo-ion-title", null, this.heading)));
    }
    renderContent() {
        return h("yoo-ion-content", { scrollEnabled: false, class: "bg-light" },
            h("yoo-barcode", { value: this.value, type: this.type, height: 100 }));
    }
    render() {
        return [
            this.renderHeader(),
            this.renderContent()
        ];
    }
    static get is() { return "yoo-barcode-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "value": {
            "type": String,
            "attr": "value"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-barcode-dialog:**/"; }
}
