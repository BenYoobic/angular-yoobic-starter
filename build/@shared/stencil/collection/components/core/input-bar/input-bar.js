import { getUserDisplayName, querySelectorDeep, translate, isCordova, isIphoneX, getPicture, getVideoDevices, showModal, isIE, isIE11, getAppContext, isWeb } from '../../../utils';
import { PictureSourceType, MediaType } from '@ionic-native/camera';
const MODAL_ANIMATION_TIME = 500;
export class YooInputBarComponent {
    constructor() {
        this.icon = 'yo-camera';
        this.iconAction = 'yo-photo-library';
        this.actionText = translate('SEND');
        this.value = '';
        this.placeholder = translate('ADDCOMMENT');
        this.topIndication = null;
        this.replyToUser = null;
        this.keepFocusAfterAction = false;
    }
    focusInputField(hasText = false) {
        let formTextArea = querySelectorDeep(this.host, 'yoo-form-text-area');
        this.hasTextInside = hasText ? true : false;
        if (formTextArea) {
            formTextArea.setFocus();
        }
    }
    componentWillLoad() {
        if (this.host.classList.contains('footer') && isIphoneX()) {
            this.host.classList.add('iphone-x-padding');
        }
    }
    componentDidLoad() {
        if (this.focusOnOpen) {
            setTimeout(() => {
                this.focusInputField();
            }, MODAL_ANIMATION_TIME);
        }
    }
    onActionClick() {
        if (this.keepFocusAfterAction && this.formTextArea) {
            this.formTextArea.setFocus();
        }
        if (this.hasTextInside || (this.value && this.value !== '')) {
            this.sendText.emit(this.value);
            this.value = null;
            this.hasTextInside = false;
        }
        else {
            this.browseLibrary.emit(true);
            if (isCordova()) {
                getPicture(70, PictureSourceType.PHOTOLIBRARY, MediaType.PICTURE, false).then((imageData) => {
                    this.sendPicture.emit(imageData);
                });
            }
            else {
                this.captureFile();
            }
        }
    }
    captureFile() {
        if (this.fileInput) {
            let event;
            if (isIE() || isIE11()) {
                event = document.createEvent('MouseEvent');
                event.initMouseEvent('click', false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            else {
                event = new MouseEvent('click', { bubbles: false });
            }
            this.fileInput.dispatchEvent(event);
        }
    }
    async onCaptureClick() {
        this.iconClicked.emit(true);
        if (isCordova()) {
            getPicture(70, PictureSourceType.CAMERA, MediaType.PICTURE, false).then((imageData) => {
                this.sendPicture.emit(imageData);
            });
        }
        else {
            let devices = await getVideoDevices();
            let webcam = document.createElement('yoo-form-capture-webcam-dialog');
            if (devices && devices.length > 0) {
                webcam.device = devices[0];
                showModal(webcam).then(ret => {
                    if (ret && ret.data) {
                        this.sendPicture.emit(ret.data);
                    }
                    webcam = null;
                });
            }
            else {
                // No webcam detected; add messages to user here
                return;
            }
        }
    }
    onInput(ev) {
        this.value = ev.target.value;
        this.hasTextInside = this.value ? true : false;
        this.onEmitTypingEvent(true);
    }
    onEmitTypingEvent(isTyping) {
        if (isTyping !== this.previousIsTyping) {
            this.isTyping.emit(isTyping);
            this.previousIsTyping = isTyping;
        }
    }
    onFileSelect(ev) {
        if (!isCordova() && ev.target.files) {
            let file = ev.target.files[0];
            this.sendPicture.emit(file);
        }
    }
    onCloseReplyMode(event) {
        this.replyToUser = null;
        this.replyCancelled.emit(true);
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.topIndication || this.replyToUser ?
                h("div", { class: "indications-container" },
                    h("span", { class: "indications-inner" }, this.topIndication ?
                        this.topIndication
                        : this.replyToUser ?
                            h("span", null,
                                translate('REPLY_TO') + ' ',
                                h("span", { class: "user-indication" }, getUserDisplayName(this.replyToUser)))
                            : null),
                    this.replyToUser ? h("span", { class: "close-reply", onClick: (event) => this.onCloseReplyMode(event) },
                        h("yoo-icon", { class: "yo-close" })) : null)
                : null,
            h("div", { class: "input-container" },
                h("div", { class: "icon-container" },
                    h("div", { class: "capture-icon", onClick: () => this.onCaptureClick() },
                        h("yoo-icon", { class: this.icon }))),
                h("div", { class: "input-zone" },
                    h("yoo-form-text-area", { ref: (el) => this.formTextArea = el, class: "input-bar", resizable: "none", value: this.value, placeholder: this.placeholder, initialRows: 1, maxRows: 5, disableEnter: isWeb() ? true : false, onInputBlurred: (ev) => this.onEmitTypingEvent(false), onInputChanged: (ev) => this.onInput(ev), onEnterPressed: () => isWeb() ? this.onActionClick() : null }),
                    h("div", { class: "input-action", onClick: () => this.onActionClick() },
                        h("div", null,
                            h("span", null, this.hasTextInside ? this.actionText : h("yoo-icon", { class: this.iconAction })),
                            !this.hasTextInside ? h("input", { ref: el => this.fileInput = el, type: "file", class: "invisible", onChange: (ev) => this.onFileSelect(ev) }) : null))))));
    }
    static get is() { return "yoo-input-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "actionText": {
            "type": String,
            "attr": "action-text"
        },
        "focusInputField": {
            "method": true
        },
        "focusOnOpen": {
            "type": Boolean,
            "attr": "focus-on-open"
        },
        "hasTextInside": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "iconAction": {
            "type": String,
            "attr": "icon-action"
        },
        "keepFocusAfterAction": {
            "type": Boolean,
            "attr": "keep-focus-after-action"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder",
            "mutable": true
        },
        "replyToUser": {
            "type": "Any",
            "attr": "reply-to-user",
            "mutable": true
        },
        "topIndication": {
            "type": String,
            "attr": "top-indication"
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "sendText",
            "method": "sendText",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "iconClicked",
            "method": "iconClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "browseLibrary",
            "method": "browseLibrary",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "rowNumberChanged",
            "method": "rowNumberChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "sendPicture",
            "method": "sendPicture",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "replyCancelled",
            "method": "replyCancelled",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "isTyping",
            "method": "isTyping",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-input-bar:**/"; }
}
