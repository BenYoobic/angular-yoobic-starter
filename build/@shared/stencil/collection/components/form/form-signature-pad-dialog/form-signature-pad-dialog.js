import { translate, closeModal, cloudinary, getAppContext } from '../../../utils';
import SignaturePad from 'signature_pad';
export class YooFormSignaturePadDialogComponent {
    componentWillUpdate() {
        if (!this.isCanvasSetup) {
            this.isCanvasSetup = true;
            if (!this.readonly) {
                this.canvasSetup();
            }
        }
    }
    canvasSetup() {
        let ratio = 1; //Math.max(window.devicePixelRatio || 1, 1);
        if (this.canvasEl && this.signatureContainerDiv) {
            this.canvasEl.width = this.signatureContainerDiv.clientWidth;
            this.canvasEl.height = this.signatureContainerDiv.clientHeight;
            this.canvasEl.getContext('2d').scale(ratio, ratio);
            this.signaturePad = new SignaturePad(this.canvasEl, { backgroundColor: '#ffffff', penColor: '#000000', onBegin: () => { this.hasContent = true; } /**, onEnd: () => this.onSave()**/ });
            if (this.value) {
                let image = new Image();
                image.crossOrigin = 'Anonymous';
                image.onload = () => {
                    this.canvasEl.getContext('2d').drawImage(image, 0, 0, this.canvasEl.width, this.canvasEl.height);
                };
                image.src = this.value;
                this.hasContent = true;
            }
        }
    }
    onCancel() {
        closeModal(this.value);
    }
    onSave() {
        let data;
        if (!this.signaturePad || this.signaturePad.isEmpty()) {
            data = this.isDirty ? null : this.value;
        }
        else {
            data = this.signaturePad.toDataURL();
        }
        closeModal(data);
    }
    onClear() {
        if (this.signaturePad) {
            this.signaturePad.clear();
        }
        this.hasContent = false;
        this.isDirty = true;
    }
    renderSignaturePad() {
        return h("div", { class: "signature-container", ref: (el) => this.signatureContainerDiv = el },
            h("canvas", { ref: (el) => this.canvasEl = el }));
    }
    renderReadonly() {
        const width = this.host.clientWidth;
        const height = this.host.clientHeight;
        return this.value ?
            h("yoo-img", { type: "back", class: "image", src: cloudinary(this.value, width, height, null, null, null, null, true) })
            : null;
    }
    renderHeader() {
        return h("yoo-ion-header", { class: "shadow", "no-border": true },
            h("yoo-ion-toolbar", { color: "light" },
                h("yoo-ion-buttons", { slot: "start" },
                    h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                        h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                h("yoo-ion-title", null, translate('SIGNATURE')),
                h("yoo-ion-buttons", { slot: "end", onClick: () => this.onSave() },
                    h("yoo-ion-button", { color: "success", class: "button-clear" }, translate('DONE')))));
    }
    renderContent() {
        return h("div", { class: "signature-pad-dialog" },
            h("yoo-ion-content", { scrollEnabled: false, class: "bg-light" }, this.readonly ? this.renderReadonly() : this.renderSignaturePad()));
    }
    renderBottom() {
        return (this.readonly ? null : h("div", { class: "signature-footer" },
            h("yoo-button", { text: translate('DELETE'), onClick: this.onClear.bind(this), class: 'block ' + (this.hasContent ? 'stable-danger' : 'stable') })));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return [
            this.renderHeader(),
            this.renderContent(),
            this.renderBottom()
        ];
    }
    static get is() { return "yoo-form-signature-pad-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "hasContent": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "isAnimationFinished": {
            "type": Boolean,
            "attr": "is-animation-finished"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "value": {
            "type": String,
            "attr": "value"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-form-signature-pad-dialog:**/"; }
}
