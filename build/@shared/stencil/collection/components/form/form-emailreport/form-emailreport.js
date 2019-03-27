import { setValidator, setValueAndValidateInput, getSession } from '../../../utils';
import { compact, uniq, isArray } from 'lodash-es';
export class YooFormEmailreportComponent {
    constructor() {
        this.validators = [];
    }
    updateValues(values, formSearch) {
        if (this.formAutocomplete) {
            if (formSearch && formSearch.search && formSearch.search.currentPage === 0) {
                let emails = [];
                if (this.fieldValues && this.fieldValues.length > 0) {
                    emails = emails.concat(this.fieldValues);
                }
                if (getSession().selectedLocation && isArray(getSession().selectedLocation.notificationemail) && getSession().selectedLocation.notificationemail.length > 0) {
                    emails = emails.concat(getSession().selectedLocation.notificationemail);
                }
                if (getSession().selectedLocation && getSession().selectedLocation.contactemail) {
                    emails.push(getSession().selectedLocation.contactemail);
                }
                if (getSession().user) {
                    values.unshift(getSession().user);
                }
                if (values && values.length > 0) {
                    let emailValues = values.map(u => u.email || u.username || u._id);
                    let concatEmails = [...emails, ...emailValues];
                    emails = concatEmails.filter(email => email.includes(formSearch.search.search));
                }
                emails = compact(uniq(emails));
                // if (emails.length > 0) {
                //     values = [...emails.map(email => ({ username: email, _id: email })), ...values];
                // }
                this.formAutocomplete.updateValues(emails);
            }
            else {
                this.formAutocomplete.updateValues(values.map(u => u.email || u.username || u._id));
            }
        }
    }
    componentWillLoad() {
        setValidator(this);
    }
    componentDidLoad() {
        this.value = this.value || [];
    }
    onFetchData(ev) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }
    onInputChanged(ev) {
        ev.stopPropagation();
        if (ev.detail && ev.detail.length > 0) {
            let userEmails = compact(uniq(ev.detail));
            setValueAndValidateInput(userEmails, this);
        }
        else {
            setValueAndValidateInput(null, this);
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
    onAutoCompleteValidityChanged(ev) {
        ev.stopPropagation();
    }
    renderInput() {
        return h("yoo-form-autocomplete", { ref: el => this.formAutocomplete = el, multiple: true, value: this.value, iconPrefix: "yo-email", entityType: 'emails', displayType: 'card-list', onFetchData: (ev) => this.onFetchData(ev), onInputChanged: (ev) => this.onInputChanged(ev), onInputBlurred: (ev) => this.onInputBlurred(ev), onInputFocused: (ev) => this.onInputFocused(ev), onValidityChanged: (ev) => this.onAutoCompleteValidityChanged(ev), tags: this.tags, clearable: true, allowCustomTag: true });
    }
    renderReadonly() {
        let emails = compact([].concat(this.value));
        if (emails.length > 0) {
            return h("div", { class: "readonly" }, [].concat(this.value).map(mail => {
                //return <a tabindex="-1" href={'mailto:' + mail}>{mail}</a>;
                return h("div", { class: "email" }, mail);
            }));
        }
        return null;
    }
    renderEditable() {
        return (h("div", { class: "outer-container" }, this.renderInput()));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-emailreport"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "fieldValues": {
            "type": "Any",
            "attr": "field-values"
        },
        "host": {
            "elementRef": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "stateful": {
            "type": Boolean,
            "attr": "stateful"
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
    static get style() { return "/**style-placeholder:yoo-form-emailreport:**/"; }
}
