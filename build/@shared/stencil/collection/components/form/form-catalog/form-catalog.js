import { setValidator, setValueAndValidateInput, pipes, translate, showModal } from '../../../utils';
import { filter, keys, isObject, difference } from 'lodash-es';
export class YooFormCatalogComponent {
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
    static get style() { return "/**style-placeholder:yoo-form-catalog:**/"; }
}
