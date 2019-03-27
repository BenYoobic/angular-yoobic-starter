import { setValidator, setValueAndValidateInput } from '../../../utils';
export class YooFormLocationComponent {
    constructor() {
        this.validators = [];
    }
    updateValues(values) {
        if (this.formAutocomplete) {
            this.formAutocomplete.updateValues(values);
        }
    }
    componentWillLoad() {
        setValidator(this);
    }
    onFetchData(ev) {
        ev.stopPropagation();
        if (ev.detail) {
            ev.detail.aroundMe = this.aroundMe;
            this.fetchData.emit(ev.detail);
        }
    }
    onAroundMeToggle(ev) {
        ev.stopPropagation();
        this.aroundMe = ev.detail;
        this.updateValues([]);
    }
    onInputChanged(ev) {
        ev.stopPropagation();
        let loc = ev.detail;
        if (loc && loc._geoloc) {
            this.marker = {
                _id: loc._id,
                latitude: loc._geoloc[1],
                longitude: loc._geoloc[0],
                title: loc.title,
                address: loc.address
            };
        }
        else {
            this.marker = null;
        }
        setValueAndValidateInput(loc, this);
        this.inputChanged.emit(loc);
    }
    onInputBlurred(ev) {
        ev.stopPropagation();
        this.inputBlurred.emit(ev.detail);
    }
    onInputFocused(ev) {
        ev.stopPropagation();
        this.inputFocused.emit(ev.detail);
    }
    stopValidityChangeEvent(ev) {
        ev.stopPropagation();
    }
    renderInput(readonly) {
        return h("yoo-form-autocomplete", { ref: el => this.formAutocomplete = el, readonly: readonly, multiple: this.multiple, value: this.value, iconPrefix: "yo-store", entityType: 'locations', displayType: 'card-list', isLocal: false, onFetchData: (ev) => this.onFetchData(ev), onInputChanged: (ev) => this.onInputChanged(ev), onInputBlurred: (ev) => this.onInputBlurred(ev), onInputFocused: (ev) => this.onInputFocused(ev), onValidityChanged: (ev) => this.stopValidityChangeEvent(ev), clearable: true, tags: this.tags, isHistory: this.isHistory });
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.renderInput(true));
    }
    renderEditable() {
        return (h("div", { class: "outer-container" },
            this.renderInput(false),
            h("yoo-form-input-container", { field: { title: 'AROUNDME' }, class: "noborder" },
                h("yoo-form-checkbox", { class: "success", type: "line", onInputChanged: (ev) => this.onAroundMeToggle(ev), onValidityChanged: (ev) => this.stopValidityChangeEvent(ev) })),
            this.marker && this.marker.latitude && this.marker.longitude ? h("div", { class: "map-container" },
                h("yoo-map", { class: "absolute", position: this.marker, markers: [this.marker] })) : null));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-location"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "aroundMe": {
            "state": true
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
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
    static get style() { return "/**style-placeholder:yoo-form-location:**/"; }
}
