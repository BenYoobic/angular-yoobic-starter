import { cloudinary, pipes, isVideo, isDocument, toPng, getIcon, isImage, getExtension, getType, showModal, getAppContext } from '../../../utils';
export class YooFormDocumentComponent {
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
    static get style() { return "/**style-placeholder:yoo-form-document:**/"; }
}
