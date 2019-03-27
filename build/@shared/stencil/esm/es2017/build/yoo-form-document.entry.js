import { h } from '../design-system.core.js';

import { a_ as showModal, _ as cloudinary, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { C as getType, N as isVideo, O as isDocument, P as getExtension, H as isImage, Q as toPng, R as getIcon, b as pipes } from './chunk-262e5ad4.js';

class YooFormDocumentComponent {
    constructor() {
        this.showDialog = true;
        this.isVideo = false;
    }
    componentWillLoad() {
        this.updateDocumentInfo();
    }
    onShowDocument(ev) {
        // When click on form-document of type audio, prevent feed-detail from opening
        if (getType(this.document) === 'audio') {
            ev.stopPropagation();
            ev.preventDefault();
        }
        else if (this.readonly && this.useGallery && this.type === 'image') {
            this.galleryOpened.emit(true);
        }
        else {
            if (this.document && this.showDialog) {
                let modal = document.createElement('yoo-form-document-dialog');
                modal.document = this.document;
                let type = getType(this.document);
                modal.modalMode = type && type === 'video';
                showModal(modal, {}, '', 'slideYEnterAnimation', 'slideYLeaveAnimation').then(() => {
                    if (modal) {
                        modal = null;
                    }
                });
                this.inputChanged.emit(true);
            }
        }
    }
    updateDocumentInfo() {
        if (this.document && this.document._downloadURL && (this.type === 'image' || isVideo(this.document._downloadURL) || (isDocument(this.document._downloadURL) && getExtension(this.document._downloadURL) === 'pdf') || isImage(this.document._downloadURL))) {
            this.preview = this.document._downloadURL;
            if (isDocument(this.document._downloadURL)) {
                this.preview = toPng(this.preview);
            }
            if (isVideo(this.preview)) {
                this.preview = toPng(this.preview);
                this.isVideo = true;
            }
        }
        if (this.document) {
            this.icon = getIcon(this.document);
            this.filename = this.document._filename;
        }
        else {
            this.icon = this.type === 'image' ? 'yo-image' : 'yo-document';
            this.filename = '';
        }
    }
    renderBase() {
        let width = Math.max(window.innerWidth - 2 * 15, 340);
        let height = 260;
        return h("div", { class: (this.readonly ? 'readonly ' : 'outer-container'), onClick: (ev) => this.onShowDocument(ev) }, this.type === 'image' ?
            (this.document ?
                h("yoo-img", { type: "back", class: {
                        'image-container': true,
                        'contain': this.document.contain,
                        'relative-to-window': this.document.relativeSizeToWindow
                    }, src: cloudinary(this.document._downloadURL, width, height, null, null, null, null, true) })
                : null)
            :
                (this.document ? h("div", { class: "document-container" },
                    h("yoo-card-file", { heading: this.filename, subheading: pipes.fileSize.transform(this.document.size), icon: this.icon, imgSrc: getType(this.document) !== 'document' ? this.preview : null, class: 'document ' + this.host.className, type: getType(this.document), _downloadURL: this.document._downloadURL })) : null));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return this.renderBase();
    }
    static get is() { return "yoo-form-document"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "document": {
            "type": "Any",
            "attr": "document"
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
        "showDialog": {
            "type": Boolean,
            "attr": "show-dialog"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "useGallery": {
            "type": Boolean,
            "attr": "use-gallery"
        },
        "validity": {
            "type": Boolean,
            "attr": "validity",
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
            "name": "galleryOpened",
            "method": "galleryOpened",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --height-image-container: 260px;\n  --outer-container-padding: 0.5rem 0rem; }\n\n:host .outer-container,\n:host .readonly {\n  padding: var(--outer-container-padding); }\n  :host .outer-container .image-container,\n  :host .readonly .image-container {\n    height: var(--height-image-container);\n    margin-right: auto;\n    margin-left: auto;\n    border: 1px solid var(--stable-30, #E6E6E6);\n    border-radius: 0.5rem; }\n    :host .outer-container .image-container.contain,\n    :host .readonly .image-container.contain {\n      height: 320px;\n      margin: 0 1rem;\n      border: none; }\n    :host .outer-container .image-container.relative-to-window,\n    :host .readonly .image-container.relative-to-window {\n      height: 25vh; }\n\n:host .readonly .image-container {\n  width: 98px;\n  height: 98px;\n  margin-left: 0; }\n\n:host(.boost.tablet) {\n  --height-image-container: 520px; }"; }
}

export { YooFormDocumentComponent as YooFormDocument };
