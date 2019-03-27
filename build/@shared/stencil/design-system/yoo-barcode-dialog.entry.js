const h = window.DesignSystem.h;

import { Q as closeModal } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooBarcodeDialogComponent {
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
    static get style() { return ":host yoo-ion-content {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n:host yoo-barcode {\n  width: 100%;\n  height: 100px;\n  margin: 1rem 0; }"; }
}

export { YooBarcodeDialogComponent as YooBarcodeDialog };
