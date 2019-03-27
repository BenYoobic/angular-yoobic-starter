import { translate, closeModal, cloudinary, getAppContext } from '../../../utils';
export class YooFormCaptureTagDialogComponent {
    constructor() {
        this.newValue = [];
    }
    componentWillLoad() {
        if (this.value) {
            this.newValue = this.value;
        }
        else {
            this.newValue = [];
        }
    }
    onSave() {
        closeModal(this.newValue);
    }
    onCancel() {
        closeModal(null);
    }
    onFetchGridData(ev) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }
    onTagChanged(ev) {
        ev.stopPropagation();
        if (ev.detail && ev.detail.length > 0) {
            this.newValue = ev.detail;
        }
    }
    renderTags() {
        return [
            h("div", { class: "tag-header" },
                translate('TAGS'),
                h("span", { class: "optional" }, `(${translate('OPTIONAL')})`)),
            h("yoo-form-autocomplete", { class: "tags", iconPrefix: "tag", displayType: 'card-list', value: this.value, values: this.tags, multiple: true, onValidityChanged: (ev) => ev.stopPropagation(), onInputChanged: (ev) => this.onTagChanged(ev), onFetchData: (ev) => this.onFetchGridData(ev), placeholder: translate('SELECTTAG') })
        ];
    }
    renderHeader() {
        return [
            h("div", { class: "title-container" },
                h("yoo-ion-button", { class: "close", onClick: () => this.onCancel() },
                    h("yoo-icon", { slot: "icon-only", class: "yo-close" })),
                h("yoo-ion-title", null, translate('PREVIEW')))
        ];
    }
    renderBody() {
        return [
            h("div", { class: "outer-container" },
                h("div", { class: "image-container" },
                    h("yoo-img", { type: "back", loadStrategy: "instant", src: cloudinary(this.imageSrc, window && window.innerWidth ? window.innerWidth : 375, this.imageHeight ? this.imageHeight : 375) })),
                h("div", { class: "tags-container" }, this.renderTags()),
                h("div", { class: "button-container" },
                    h("yoo-button", { class: "large full-width gradient-success mobile operations", text: translate('SAVE'), onClick: () => this.onSave() })))
        ];
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return [
            this.renderHeader(),
            this.renderBody()
        ];
    }
    static get is() { return "yoo-form-capture-tag-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "imageHeight": {
            "type": Number,
            "attr": "image-height"
        },
        "imageSrc": {
            "type": String,
            "attr": "image-src"
        },
        "imageWidth": {
            "type": Number,
            "attr": "image-width"
        },
        "tags": {
            "type": "Any",
            "attr": "tags"
        },
        "value": {
            "type": "Any",
            "attr": "value"
        }
    }; }
    static get events() { return [{
            "name": "fetchData",
            "method": "fetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-capture-tag-dialog:**/"; }
}
