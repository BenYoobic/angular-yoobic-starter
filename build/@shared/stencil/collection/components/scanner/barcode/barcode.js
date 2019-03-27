import JsBarcode from 'jsbarcode';
export class YooBarcodeComponent {
    onValueChanged() {
        this.updateBarcode();
    }
    componentDidLoad() {
        this.updateBarcode();
    }
    updateBarcode() {
        if (this.svg && this.value) {
            JsBarcode(this.svg, this.value, { height: this.height || 60 });
        }
    }
    render() {
        return (h("svg", { ref: el => this.svg = el }));
    }
    static get is() { return "yoo-barcode"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "height": {
            "type": Number,
            "attr": "height"
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
            "attr": "value",
            "watchCallbacks": ["onValueChanged"]
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-barcode:**/"; }
}
