import { setValueAndValidateInput, getMimeType } from '../../../utils';
//import * as FilePond$ from 'filepond/dist/filepond.min';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
if (FilePond) {
    FilePond.registerPlugin(FilePondPluginFileValidateType);
}
export class YooFormUploaderComponent {
    constructor() {
        this.validators = [];
        this.required = false;
    }
    requiredWatch() {
        this.validate();
    }
    componentDidLoad() {
        if (this.inputElement && !this.readonly) {
            if (FilePond) {
                this.pond = FilePond.create(this.inputElement, {
                    maxFiles: this.multiple ? null : 1,
                    required: this.required,
                    allowMultiple: this.multiple,
                    acceptedFileTypes: this.extensions ? this.extensions.map(ext => getMimeType(ext)) : []
                    //fileValidateTypeLabelExpectedTypesMap: 
                });
                this.pond.on('updatefiles', () => {
                    let files = this.pond.getFiles();
                    if (files && files.length > 0) {
                        files = files.map(f => f.file);
                        if (this.multiple) {
                            setValueAndValidateInput(files, this);
                        }
                        else {
                            setValueAndValidateInput(files[0], this);
                        }
                    }
                    else {
                        setValueAndValidateInput(null, this);
                    }
                });
            }
        }
    }
    componentDidUnload() {
        if (this.pond) {
            this.pond.destroy();
        }
    }
    validate() {
        let isValid = true;
        if (this.required && !this.value) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validity = isValid;
            this.validityChanged.emit(isValid);
        }
        return this.validity;
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.value);
    }
    renderEditable() {
        return h("div", { class: "container" },
            h("input", { ref: el => this.inputElement = el, type: "file" }));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-uploader"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "extensions": {
            "type": "Any",
            "attr": "extensions"
        },
        "host": {
            "elementRef": true
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required",
            "watchCallbacks": ["requiredWatch"]
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": Boolean,
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
    static get style() { return "/**style-placeholder:yoo-form-uploader:**/"; }
}
