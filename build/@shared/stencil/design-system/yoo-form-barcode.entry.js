const h = window.DesignSystem.h;

import { c as cordova, d as IonicNativePlugin, aN as setValidator, k as isCordova, x as getSession, aQ as setValueAndValidateInput, Q as closeModal, a_ as showModal, w as filter, m as translate, aB as isObject, bV as difference, bK as keys, a4 as getElementDimensions, L as querySelectorDeep, at as showImageModal, _ as cloudinary } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BarcodeScannerOriginal = /** @class */ (function (_super) {
    __extends(BarcodeScannerOriginal, _super);
    function BarcodeScannerOriginal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Encode = {
            TEXT_TYPE: 'TEXT_TYPE',
            EMAIL_TYPE: 'EMAIL_TYPE',
            PHONE_TYPE: 'PHONE_TYPE',
            SMS_TYPE: 'SMS_TYPE'
        };
        return _this;
    }
    BarcodeScannerOriginal.prototype.scan = function (options) { return cordova(this, "scan", { "callbackOrder": "reverse" }, arguments); };
    BarcodeScannerOriginal.prototype.encode = function (type, data) { return cordova(this, "encode", {}, arguments); };
    BarcodeScannerOriginal.pluginName = "BarcodeScanner";
    BarcodeScannerOriginal.plugin = "phonegap-plugin-barcodescanner";
    BarcodeScannerOriginal.pluginRef = "cordova.plugins.barcodeScanner";
    BarcodeScannerOriginal.repo = "https://github.com/phonegap/phonegap-plugin-barcodescanner";
    BarcodeScannerOriginal.platforms = ["Android", "BlackBerry 10", "Browser", "iOS", "Windows"];
    return BarcodeScannerOriginal;
}(IonicNativePlugin));
var BarcodeScanner = new BarcodeScannerOriginal();

class YooFormBarcodeComponent {
    constructor() {
        this.validators = [];
        this.scanning = false;
    }
    //private dialog: any;
    componentWillLoad() {
        setValidator(this);
    }
    onOpenScanner() {
        if (this.scanning) {
            return;
        }
        if (isCordova() && !getSession().hasScandit) {
            this.scanning = true;
            return BarcodeScanner.scan({
                showFlipCameraButton: true,
                showTorchButton: true
            }).then((result) => {
                this.scanning = false;
                if (result && result.text) {
                    let value = result.text;
                    setValueAndValidateInput(value, this);
                }
            });
        }
        else if (getSession().hasScandit) {
            let dialog = document.createElement('yoo-form-barcode-dialog');
            dialog.mainMode = 'default';
            let scannedSuccessListener = (ev) => {
                if (ev && ev.detail) {
                    setValueAndValidateInput(ev.detail, this);
                    this.value = ev.detail;
                }
                closeModal(dialog);
            };
            dialog.addEventListener('scannedSuccess', scannedSuccessListener);
            showModal(dialog).then(() => {
                if (dialog) {
                    dialog.removeEventListener('scannedSuccess', scannedSuccessListener);
                    dialog = null;
                }
            });
        }
    }
    renderReadonly() {
        return (h("div", { class: "readonly" }, this.value));
    }
    renderEditable() {
        return (h("div", { class: "outer-container" },
            h("div", { class: "barcode-container", onClick: (ev) => this.onOpenScanner() },
                h("yoo-icon", { class: "center yo-barcode success" })),
            h("div", { class: "value-container" },
                h("div", null,
                    this.placeholder ? h("div", null, this.placeholder) : null,
                    this.value && !this.hideValue ? h("div", null, this.value) : null))));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-barcode"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "hideValue": {
            "type": Boolean,
            "attr": "hide-value"
        },
        "host": {
            "elementRef": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  padding-bottom: 1rem; }\n  :host .outer-container .barcode-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 98px;\n    height: 98px;\n    border: 1px solid var(--input-container-border-color, #E6E6E6);\n    border-radius: 0.5rem;\n    cursor: pointer; }\n    :host .outer-container .barcode-container .required {\n      top: auto;\n      right: auto;\n      bottom: auto;\n      left: 0.625rem;\n      position: absolute;\n      color: var(--success, #04CC99);\n      font-size: var(--font-m, 15px); }\n    :host .outer-container .barcode-container yoo-icon {\n      font-size: var(--font-xl, 36px); }\n  :host .outer-container .value-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    height: 98px;\n    padding-left: 2rem;\n    color: var(--text-color, #807f83);\n    font-size: var(--font-m, 15px); }\n\n:host .center {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n:host .readonly {\n  padding: 0.5rem;\n  padding-left: 0;\n  padding-bottom: 0; }\n\n:host(.history) {\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important; }\n  :host(.history) .readonly {\n    padding: 0 !important; }"; }
}

class YooFormCatalogComponent {
    constructor() {
        this.validators = [];
        this.isHistory = false;
    }
    updateValues(values) {
        if (this.formAutocomplete) {
            this.formAutocomplete.updateValues(values);
        }
    }
    componentWillLoad() {
        setValidator(this);
    }
    onSelect(ev) {
        ev.stopPropagation();
        if (ev.detail) {
            if (this.isCheck) {
                this.setValue(ev.detail);
            }
            else {
                this.addProducts(ev.detail);
            }
        }
    }
    get selectedProducts() {
        if (this.isCheck) {
            return [].concat(this.value);
        }
        else {
            let selectedProducts = [];
            let productRefs = this.getProductRefs();
            productRefs.forEach(id => {
                this.products.forEach(product => {
                    if (product._id === id && this.value[id] > 0) {
                        selectedProducts.push(product);
                    }
                });
            });
            return selectedProducts;
        }
    }
    onFetchData(ev) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }
    onScanned(ev) {
        ev.stopPropagation();
        this.notFoundError = '';
        let ref = ev.detail;
        if (ref) {
            let products = filter(this.products, function (p) {
                return p.reference === ref;
            });
            if (products && products.length > 0) {
                let product = products[0];
                if (this.isCheck) {
                    this.setValue(product);
                }
                this.addProducts([product]);
            }
            else {
                this.notFoundError = (ref || '') + ' ' + translate('NOTFOUND');
            }
        }
    }
    onInputBlurred(ev) {
        ev.stopPropagation();
        this.inputBlurred.emit(ev.detail);
    }
    onInputFocused(ev) {
        ev.stopPropagation();
        this.inputFocused.emit(ev.detail);
    }
    addProducts(products) {
        if (products && products.length > 0) {
            products.forEach(p => this.addProduct(p));
        }
    }
    addProduct(product) {
        if (product.outofstock) {
            return;
        }
        let value = this.value || {};
        if (!isObject(this.value)) {
            this.value = {};
        }
        value[product._id] = value[product._id] || 0;
        if (this.isPresence) {
            value[product._id] = 1;
        }
        else {
            value[product._id] += (product.step - 0) || 1;
        }
        this.setValue(value);
    }
    removeProduct(product) {
        if (product.outofstock) {
            return;
        }
        let value = this.value || {};
        value[product._id] = value[product._id] || 0;
        value[product._id] -= (product.step - 0) || 1;
        if (value[product._id] <= 0) {
            value[product._id] = 0;
        }
        this.setValue(value);
    }
    clearProduct(product) {
        let value = this.value || {};
        value[product._id] = 0;
        this.setValue(value);
    }
    getProductRefs() {
        return difference(keys(this.value || {}), ['price', 'total']);
    }
    getTotalAndPrice() {
        let productRefs = this.getProductRefs();
        let total = 0;
        let price = 0;
        productRefs.forEach(ref => {
            let quantity = this.value[ref];
            if (quantity > 0) {
                total += quantity;
            }
            if (this.products) {
                let product = this.products.find(p => p._id === ref);
                if (quantity > 0 && product && product.price > 0) {
                    price += quantity * product.price;
                }
            }
        });
        return { total, price };
    }
    setValue(value) {
        let ret = this.getTotalAndPrice();
        value = value || {};
        value.price = ret.price;
        value.total = ret.total;
        setValueAndValidateInput(value, this);
        this.inputChanged.emit(value);
    }
    onOpenCatalogDialog(product) {
        this.dialog = document.createElement('yoo-form-catalog-dialog');
        this.dialog.product = product;
        showModal(this.dialog, { half: false }, null, 'slideXEnterAnimation', 'slideXLeaveAnimation', true).then(ret => {
            if (ret && ret.data) {
            }
            this.dialog = null;
        });
    }
    renderProducts(readonly) {
        if (readonly && this.isCheck) {
            return h("yoo-entity", { displayType: "card-list", entityType: "products", item: this.value });
        }
        let ret = this.getTotalAndPrice();
        return ret.total > 0 ? h("div", { class: "products" },
            !readonly ?
                ([
                    h("div", { class: "title" },
                        " ",
                        translate('PRODUCTS')),
                    h("div", { class: "subtitle" },
                        " ",
                        ret.total + ' ' + translate('ITEMS'))
                ]) : null,
            this.renderInnerProducts(readonly),
            !this.isInventory && !this.isPresence && !this.isCheck ? h("div", { class: "footer" },
                h("div", { class: "title" },
                    translate('TOTAL'),
                    ":"),
                h("div", { class: "price" }, pipes.currency.transform(ret.price))) : null) : null;
    }
    renderInnerProducts(readonly) {
        if (this.products && this.products.length > 0) {
            let productRefs = this.getProductRefs();
            return productRefs.map(ref => {
                let quantity = this.value[ref];
                let product = this.products.find(p => p._id === ref);
                if (quantity > 0 && product) {
                    let price = product.price * quantity;
                    return [
                        h("div", { class: "entity" },
                            h("yoo-entity", { onClick: () => this.onOpenCatalogDialog(product), class: "catalog-display", isHistory: this.isHistory, displayType: 'card-list', entityType: 'products', item: product }),
                            readonly ? null : h("div", { class: "remove", onClick: (ev) => this.clearProduct(product) },
                                " ",
                                h("yoo-icon", { class: "yo-cross" }),
                                " ")),
                        this.isPresence ?
                            null
                            :
                                h("div", { class: { 'toolbar': true, 'history': this.isHistory } },
                                    h("div", { class: "title" },
                                        translate('QUANTITY'),
                                        ": "),
                                    readonly ? null : h("div", { class: "icon right", onClick: (ev) => this.removeProduct(product) }, " - "),
                                    h("div", { class: "quantity" },
                                        quantity,
                                        this.isHistory && !this.isInventory && price > 0 ? h("span", null, "x") : null),
                                    readonly ? null : h("div", { class: "icon left", onClick: (ev) => this.addProduct(product) }, " + "),
                                    !this.isInventory && price > 0 ? h("div", { class: "price" },
                                        pipes.currency.transform(price),
                                        " ") : null)
                    ];
                }
            });
        }
    }
    onAutoCompleteValidityChanged(ev) {
        ev.stopPropagation();
    }
    renderEditable() {
        return (h("div", { class: "outer-container" },
            h("yoo-form-autocomplete", { ref: el => this.formAutocomplete = el, multiple: !this.isCheck, value: this.selectedProducts, entityType: 'products', displayType: 'card-list', iconPrefix: "yo-catalogue", onFetchData: (ev) => this.onFetchData(ev), onInputChanged: (ev) => this.onSelect(ev), onInputBlurred: (ev) => this.onInputBlurred(ev), onInputFocused: (ev) => this.onInputFocused(ev), onValidityChanged: (ev) => this.onAutoCompleteValidityChanged(ev), placeholder: translate('ADDPRODUCTTOBASKET'), hideSelectionFromInput: !this.isCheck, tags: this.tags, isLocal: false }),
            h("div", { class: "or" }, translate('OR')),
            h("yoo-form-barcode", { onInputChanged: (ev) => this.onScanned(ev), placeholder: translate('SCANPRODUCTTOBASKET'), hideValue: true }),
            this.notFoundError ? h("div", { class: "error", innerHTML: this.notFoundError }) : null,
            this.isCheck ? null : this.renderProducts(false)));
    }
    renderHistory() {
        return h("yoo-ion-scroll", { class: "relative" }, this.renderReadonly());
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.renderProducts(true));
    }
    render() {
        if (this.isHistory) {
            return this.renderHistory();
        }
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-catalog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "catalog": {
            "type": String,
            "attr": "catalog"
        },
        "host": {
            "elementRef": true
        },
        "isCheck": {
            "type": Boolean,
            "attr": "is-check"
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "isInventory": {
            "type": Boolean,
            "attr": "is-inventory"
        },
        "isPresence": {
            "type": Boolean,
            "attr": "is-presence"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "notFoundError": {
            "state": true
        },
        "products": {
            "type": "Any",
            "attr": "products"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "tags": {
            "type": "Any",
            "attr": "tags"
        },
        "updateValues": {
            "method": true
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "type": Boolean,
            "attr": "validity",
            "mutable": true
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fetchData",
            "method": "fetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container,\n:host .readonly {\n  padding: 0.5rem;\n  padding-left: 0;\n  padding-bottom: 0; }\n  :host .outer-container .or,\n  :host .readonly .or {\n    padding: 0.5rem;\n    color: var(--text-color, #807f83);\n    font-size: var(--font-s, 13px);\n    text-align: center; }\n  :host .outer-container .selected,\n  :host .readonly .selected {\n    background-color: var(--light, #FFFFFF); }\n  :host .outer-container .error,\n  :host .readonly .error {\n    color: var(--danger, #ff625f); }\n  :host .outer-container .products > .title,\n  :host .readonly .products > .title {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    margin-top: 0.5rem;\n    color: var(--black, #000000);\n    font-size: var(--font-m, 15px);\n    font-weight: normal;\n    line-height: 1.5;\n    text-align: left;\n    text-transform: uppercase; }\n  :host .outer-container .products .subtitle,\n  :host .readonly .products .subtitle {\n    margin-top: 0.125rem;\n    color: var(--text-color, #807f83);\n    font-size: var(--font-xs, 10px); }\n  :host .outer-container .products .remove,\n  :host .readonly .products .remove {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    min-width: 40px;\n    border-bottom: 1px solid var(--stable-light, #f1f1f1);\n    text-align: center; }\n  :host .outer-container .products .entity,\n  :host .readonly .products .entity {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n  :host .outer-container .products .toolbar,\n  :host .readonly .products .toolbar {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    padding: 0.5rem;\n    padding-left: 110px;\n    border-bottom: 1px solid var(--stable-light, #f1f1f1);\n    font-size: var(--font-m, 15px); }\n    :host .outer-container .products .toolbar.history,\n    :host .readonly .products .toolbar.history {\n      font-size: var(--font-s, 13px); }\n    :host .outer-container .products .toolbar .title,\n    :host .readonly .products .toolbar .title {\n      -ms-flex: 1;\n      flex: 1;\n      padding: 3px .5rem 3px 0;\n      color: var(--black, #000000);\n      font-size: var(--font-xs, 10px); }\n      :host .outer-container .products .toolbar .title.align-right,\n      :host .readonly .products .toolbar .title.align-right {\n        text-align: right; }\n    :host .outer-container .products .toolbar .quantity,\n    :host .readonly .products .toolbar .quantity {\n      padding: 0 .5rem;\n      color: var(--black, #000000);\n      text-align: center; }\n    :host .outer-container .products .toolbar .price,\n    :host .readonly .products .toolbar .price {\n      -ms-flex: 1;\n      flex: 1;\n      padding-left: .5rem;\n      color: var(--black, #000000);\n      text-align: right;\n      white-space: nowrap; }\n    :host .outer-container .products .toolbar .icon,\n    :host .readonly .products .toolbar .icon {\n      width: 22px;\n      min-width: 22px;\n      height: 22px;\n      min-height: 22px;\n      border-radius: 50%;\n      background: var(--stable-light, #f1f1f1);\n      text-align: center; }\n  :host .outer-container .products .footer,\n  :host .readonly .products .footer {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    padding: 0.5rem;\n    padding-top: 1rem;\n    padding-bottom: 0.5rem;\n    color: var(--black, #000000); }\n    :host .outer-container .products .footer .title,\n    :host .readonly .products .footer .title {\n      -ms-flex: 1;\n      flex: 1;\n      text-transform: uppercase; }\n    :host .outer-container .products .footer .price,\n    :host .readonly .products .footer .price {\n      text-align: right; }\n\n:host(.history) .readonly {\n  max-width: 800px; }"; }
}

class YooFormCatalogDialogComponent {
    constructor() {
        this.pictureWidth = 300;
        this.pictureHeight = 195;
        this.MIN_WIDTH_TABLET = 500;
    }
    componentDidLoad() {
        this.sizeContainer = getElementDimensions(this.innerContainer).width;
        this.tabletMod = this.sizeContainer > this.MIN_WIDTH_TABLET;
        this.pictureWidth = !this.tabletMod ? this.sizeContainer : 300;
        this.sizeText = getElementDimensions(this.textContainer).height;
        this.topTagPosition = Math.ceil((this.pictureWidth + this.sizeText) / 5) * 5 - 5;
        this.tagsContainer = querySelectorDeep(this.host, '.horizontal');
        this.tagsContainer.style.top = `${this.topTagPosition}px`;
        this.imageContainer.style.height = `${this.host.clientWidth}px`;
    }
    componentDidUpdate() {
        this.imageContainer.style.height = `${this.host.clientWidth}px`;
    }
    onClose() {
        closeModal(null);
    }
    onShowImage() {
        showImageModal(this.product.image._downloadURL, this.product.image._filename, true);
    }
    renderHeader() {
        return h("yoo-ion-header", { class: "shadow", "no-border": true },
            h("yoo-ion-toolbar", { color: "light" },
                h("yoo-ion-buttons", { slot: "start" },
                    h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onClose() },
                        h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                h("yoo-ion-title", null, translate('PRODUCT'))));
    }
    renderTag(tag) {
        return h("span", { class: "bg-light tag-item" }, tag);
    }
    renderContent() {
        return h("yoo-ion-content", { scrollEnabled: true, class: "bg-light" },
            h("div", { class: "inner-container", ref: el => this.innerContainer = el },
                h("div", { onClick: () => this.onShowImage(), ref: el => this.imageContainer = el, class: 'image-container ' + (this.tabletMod ? 'tablet-mod' : '') },
                    h("yoo-img", { type: "back", class: "image", src: cloudinary(this.product.image._downloadURL, this.pictureWidth, this.pictureHeight, null, null, null, null, true) })),
                h("div", { class: "text-container", ref: el => this.textContainer = el },
                    h("div", { class: "row-container" },
                        h("div", { class: "title" }, translate('TITLE')),
                        h("div", { class: "value" }, this.product.title)),
                    this.product.price ? h("div", { class: "row-container" },
                        h("div", { class: "title" }, translate('PRICE')),
                        h("div", { class: "value" }, pipes.currency.transform(this.product.price))) : null,
                    this.product.color ? h("div", { class: "row-container" },
                        h("div", { class: "title" }, translate('COLOR')),
                        h("div", { class: "value" }, this.product.color)) : null,
                    this.product.reference ? h("div", { class: "row-container" },
                        h("div", { class: "title" }, translate('REFERENCE')),
                        h("div", { class: "value" }, this.product.reference)) : null,
                    this.product.shortdescription || this.product.description ? h("div", { class: "row-container description" },
                        h("div", { class: "title" }, translate('DESCRIPTION')),
                        h("div", { class: "value", innerHTML: this.product.shortdescription || this.product.description })) : null),
                h("div", { class: "tags" },
                    h("yoo-ion-scroll", { class: "horizontal" },
                        h("div", { class: "button-spacer" }),
                        this.product.tags ? this.product.tags.map(value => {
                            return (this.renderTag(value));
                        }) : null,
                        h("div", { class: "button-spacer" })))));
    }
    render() {
        return [
            this.renderHeader(),
            this.renderContent()
        ];
    }
    static get is() { return "yoo-form-catalog-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "pictureHeight": {
            "state": true
        },
        "pictureWidth": {
            "state": true
        },
        "product": {
            "type": "Any",
            "attr": "product"
        },
        "sizeText": {
            "state": true
        }
    }; }
    static get style() { return ":host .inner-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  font-size: var(--font-l, 17px); }\n  :host .inner-container .image-container {\n    position: relative; }\n    :host .inner-container .image-container yoo-img {\n      position: inherit;\n      height: 100%; }\n  :host .inner-container .row-container {\n    padding: 0.5rem 0;\n    border-bottom: 1px solid var(--stable-light, #f1f1f1);\n    font-size: var(--font-m, 15px); }\n    :host .inner-container .row-container .value {\n      color: var(--text-color, #807f83); }\n  :host .inner-container .tags {\n    position: relative;\n    height: 100px; }\n    :host .inner-container .tags yoo-ion-scroll {\n      top: 0 !important;\n      padding: 0 0.75rem; }\n  :host .inner-container .text-container {\n    padding: 0.75rem; }\n  :host .inner-container .tablet-mod {\n    margin: 0 auto;\n    padding-top: 0.5rem; }\n  :host .inner-container .tag-item {\n    height: -webkit-fit-content;\n    height: -moz-fit-content;\n    height: fit-content;\n    margin-right: 0.5rem;\n    padding: 0.5rem;\n    padding-bottom: 0.75rem;\n    border: 1px solid var(--stable-light, #f1f1f1);\n    border-radius: 15px;\n    font-size: var(--font-m, 15px); }"; }
}

export { YooFormBarcodeComponent as YooFormBarcode, YooFormCatalogComponent as YooFormCatalog, YooFormCatalogDialogComponent as YooFormCatalogDialog };
