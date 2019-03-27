const h = window.DesignSystem.h;

import { k as isCordova, v as isAndroid, x as getSession, r as isSamsung, aj as isArray, bH as isPixelOne, bI as isXiaoMi, bJ as getPictureMaxSize, o as isIOS, Q as closeModal, a_ as showModal, m as translate, a5 as getAppContext, aQ as setValueAndValidateInput, bK as keys, bL as omit, B as isNumber, aN as setValidator, ae as isNullOrUndefined, aa as querySelectorAllDeep, L as querySelectorDeep, bq as assign, be as isIphoneX, bM as PictureSourceType, bN as MediaType, bO as getPicture, bP as MediaCapture, bQ as isPixel, ay as showAlert, bR as cleanupCamera, bS as isIE, bT as isIE11, p as isFile, t as clone, bU as getVideoDevices, b6 as translateMulti, ba as showActionSheet, _ as cloudinary, bg as cloneDeep, C as orderBy, bh as lockSwipes, W as isWeb, aC as isString } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { D as rotateBase64Image, E as moveToImageDirectory, F as saveBase64AsImageFile, G as updatePathSessionId, H as isImage, I as read, J as getMimeType, K as videos, L as audios, M as images } from './chunk-262e5ad4.js';
import './index.js';
import { a as StatusBar } from './chunk-ed57ca2e.js';
import { a as CameraPreview } from './chunk-a9e7b546.js';

class YooCameraPreviewDialogComponent {
    constructor() {
        this.regularMode = false;
        this.showLoader = false;
        this.listviewItems = [];
        this.flashMode = 'auto';
        this.isProcessing = false;
        this.showCapturedImage = false;
        this.dataPrefix = 'data:image/jpeg;base64,';
        this.FLASH_MODE = ['on', 'off', 'auto'];
        this.isCancel = false;
        this.isTapped = false;
    }
    componentWillLoad() {
        if (this.values && !this.regularMode) {
            this.listviewItems = this.values.slice();
        }
    }
    componentDidLoad() {
        window.document.body.classList.add('camera-preview');
        this.captures = [];
        this.photos = [];
        if (isCordova()) {
            if ((this.cameraStarted && !isAndroid()) || (this.regularMode && getSession().cameraStarted)) {
                CameraPreview.show().then(() => { }, (err) => {
                    this.onStartCamera().then(() => { }, () => {
                        CameraPreview.show();
                    });
                });
            }
            else {
                if (isSamsung()) {
                    CameraPreview.setFocusMode('continuous-picture');
                }
                this.onStartCamera().then(() => { }, () => {
                    CameraPreview.show().then(() => { }, () => {
                        this.onStartCamera();
                    });
                });
            }
        }
    }
    componentDidUnload() {
        if (this.regularMode) {
            this.isTapped = false;
        }
    }
    onStartCamera() {
        return CameraPreview.startCamera({
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            toBack: true,
            tapPhoto: false,
            tapToFocus: true,
            previewDrag: false,
            camera: CameraPreview.CAMERA_DIRECTION.BACK,
            disableExifHeaderStripping: true,
            storeToFile: true
        });
    }
    onModalTimeout() {
        if (this.helperModalDiv && this.helperModalDiv.classList) {
            this.helperModalDiv.classList.add('active');
        }
        setTimeout(() => { this.onDismissHelperModal(); }, this.photos && this.photos.length > 0 ? 2000 : 5000);
    }
    getCameraPreview() {
        if (isAndroid()) {
            return new Promise((resolve) => {
                window.CameraPreview.getCameraPreview((data) => {
                    let photo = this.dataPrefix + data.image;
                    let rotate = -90;
                    if (isAndroid()) {
                        rotate = 0;
                    }
                    rotateBase64Image(photo, rotate, true).then(ret => resolve(ret));
                });
            });
        }
        else {
            return CameraPreview.takePicture({
                quality: this.quality,
                height: window.innerHeight * 2,
                width: window.innerWidth * 2
            }).then(data => this.transformCameraPicture(data));
        }
    }
    transformCameraPicture(data) {
        let photo;
        let newPrefix = this.dataPrefix;
        let newData;
        if (data && isArray(data) && data[0]) {
            newData = data[0];
        }
        else {
            newData = data;
        }
        if (isAndroid()) {
            newPrefix = '';
            if (newData && newData['image']) {
                newData = newData['image'];
            }
            if (newData && newData.indexOf('file://') < 0) {
                newData = 'file://' + newData;
            }
            if (isPixelOne() || isXiaoMi()) {
                return moveToImageDirectory(newData, true);
            }
            else {
                return moveToImageDirectory(newData, true, '_rotate_image');
            }
        }
        else {
            photo = newPrefix + newData;
            return Promise.resolve(photo);
        }
    }
    onCapture() {
        if (isCordova() && !this.isTapped) {
            if (this.regularMode) {
                return CameraPreview.takePicture({
                    quality: this.quality,
                    width: getPictureMaxSize(this.isImageRecognition, this.maxWidth),
                    height: getPictureMaxSize(this.isImageRecognition, this.maxWidth)
                })
                    .then(data => {
                    this.isTapped = true;
                    return this.transformCameraPicture(data);
                })
                    .then((data) => {
                    return saveBase64AsImageFile(data);
                }).then((path) => {
                    this.capturedPath = path;
                    this.stopCamera();
                });
            }
            else {
                return this.getCameraPreview()
                    .then(capture => {
                    this.captures.push(capture);
                    this.onDismissHelperModal();
                    this.listviewItems.push(capture);
                    this.listviewItems = [...this.listviewItems];
                })
                    .then(() => {
                    return CameraPreview.takePicture({
                        quality: this.quality,
                        width: window.innerWidth * 4,
                        height: window.innerHeight * 4 //getPictureMaxSize(this.isImageRecognition, this.maxWidth)
                    });
                })
                    .then(data => this.transformCameraPicture(data))
                    .then(photo => {
                    this.photos.push(photo);
                    if (this.max > 0 && this.listviewItems.length === this.max) {
                        this.onSave();
                    }
                    else {
                        if (this.listviewItems.length < this.max - 1) {
                            this.onModalTimeout();
                        }
                        // setTimeout(() => this.ionScrollDiv ? this.ionScrollDiv.refresh() : null, 200);
                        this.host.forceUpdate();
                    }
                    this.isTapped = false;
                });
            }
        }
    }
    stopCamera() {
        if (isAndroid()) {
            CameraPreview.stopCamera().then(() => {
                window.document.body.classList.remove('camera-preview');
                this.closeModalByType();
            });
        }
        else if (isIOS()) {
            window.document.body.classList.remove('camera-preview');
            CameraPreview.hide();
            this.closeModalByType();
        }
    }
    closeModalByType() {
        if (this.isCancel) {
            closeModal(null);
        }
        else {
            if (this.regularMode) {
                closeModal(this.capturedPath);
            }
            else {
                closeModal(this.photos);
            }
        }
    }
    onCancel() {
        this.isCancel = true;
        this.stopCamera();
    }
    onSave() {
        this.isCancel = false;
        this.stopCamera();
    }
    onDismissHelperModal() {
        if (this.helperModalDiv && this.helperModalDiv.classList && this.helperModalDiv.classList.contains('active')) {
            this.helperModalDiv.classList.remove('active');
        }
    }
    onToggleListView() {
        if (this.listviewDiv.classList.contains('active')) {
            this.listviewDiv.classList.remove('active');
        }
        else {
            this.listviewDiv.classList.add('active');
        }
    }
    onImageClick(index) {
        let photoEditors = document.createElement('yoo-photo-editors');
        photoEditors.index = index;
        photoEditors.isReadonly = true;
        photoEditors.items = this.listviewItems.map(v => ({ value: v }));
        showModal(photoEditors, null, 'camera-preview-visible').then(() => {
            if (photoEditors) {
                photoEditors = null;
            }
        });
    }
    onCaptureInnerTouchStart() {
        this.innerButtonDiv.classList.add('tapped');
    }
    onCaptureInnerTouchEnd() {
        this.innerButtonDiv.classList.remove('tapped');
    }
    onToggleFrontCamera() {
        if (CameraPreview && CameraPreview.switchCamera) {
            CameraPreview.switchCamera();
        }
    }
    onToggleFlashLight() {
        if (CameraPreview && CameraPreview.setFlashMode && CameraPreview.getFlashMode) {
            CameraPreview.getFlashMode().then(mode => {
                let newIndex = this.FLASH_MODE.indexOf(mode) + 1;
                if (newIndex === this.FLASH_MODE.length) {
                    newIndex = 0;
                }
                this.flashMode = this.FLASH_MODE[newIndex];
                CameraPreview.setFlashMode(this.flashMode);
            });
        }
    }
    onDeleteCaptured(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.listviewItems.pop();
        this.captures.pop();
        this.photos.pop();
        if (this.captures.length === 0) {
            this.onToggleListView();
        }
        this.listviewItems = [...this.listviewItems];
    }
    onHeaderTouchStart(ev) {
        const firstTouch = this.getTouches(ev)[0];
        this.yDown = firstTouch.clientY;
        this.headerTouchStartY = ev.touches[0].clientY;
        this.headerTouchStartTime = ev.timeStamp;
    }
    onHeaderTouchMove(ev) {
        const timeOffset = 100;
        const swipeOffset = 70;
        if (!this.yDown && (ev.timeStamp - this.headerTouchStartTime < timeOffset)) {
            return;
        }
        let yDiff = this.headerTouchStartY - ev.touches[0].clientY;
        if (Math.abs(yDiff) > swipeOffset) {
            if (yDiff > 0) {
                this.listviewDiv.classList.remove('active');
            }
        }
        else {
            if (yDiff < 0) {
                this.listviewDiv.classList.add('active');
            }
        }
    }
    onResizePreview() {
        if (this.previewImageDiv.classList.contains('active')) {
            this.previewImageDiv.classList.remove('active');
        }
        else {
            this.previewImageDiv.classList.add('active');
        }
    }
    getTouches(ev) {
        return ev.touches ||
            ev.originalEvent.touches;
    }
    renderHeader() {
        return h("div", { class: "header-container", ref: el => this.listviewDiv = el },
            h("div", { class: "item-container" },
                h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                    h("yoo-icon", { slot: "icon-only", class: "yo-close" })),
                h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onToggleFrontCamera() },
                    h("yoo-icon", { slot: "icon-only", class: "yo-rotate-camera" })),
                h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onToggleFlashLight() },
                    h("yoo-icon", { slot: "icon-only", class: {
                            'yo-flash-on success': this.flashMode === 'on',
                            'yo-flash-off success': this.flashMode === 'off',
                            'yo-auto-flash success': this.flashMode === 'auto'
                        } })),
                !this.regularMode && [
                    h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onResizePreview() },
                        h("yoo-icon", { slot: "icon-only", class: "yo-circle" })),
                    h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onToggleListView() },
                        h("yoo-icon", { slot: "icon-only", class: "yo-frame" })),
                    h("div", { onClick: () => { this.onSave(); }, class: "save-button" }, translate('SAVE'))
                ]),
            h("div", { class: "hidden-items-container" },
                h("yoo-ion-scroll", { 
                    // ref={el => this.ionScrollDiv = el as HTMLYooSlimScrollElement}
                    class: "relative", horizontalMode: true }, this.listviewItems.map((image, index) => {
                    return h("yoo-img", { type: "back", class: "item", src: (image), onClick: () => { this.onImageClick(index); } }, index === this.listviewItems.length - 1 ? h("yoo-icon", { onClick: (ev) => { this.onDeleteCaptured(ev); }, class: "yo-cross" }) : null);
                }))),
            h("div", { class: "header-bottom-handler", onTouchStart: (ev) => { this.onHeaderTouchStart(ev); }, onTouchMove: (ev) => { this.onHeaderTouchMove(ev); }, onClick: () => { this.onToggleListView(); } }));
    }
    renderBody() {
        let imageSrc = null;
        if (this.captures && this.captures.length > 0) {
            imageSrc = this.captures[this.captures.length - 1];
        }
        else {
            imageSrc = this.imageData; //|| 'https://via.placeholder.com/375x812';
        }
        return [
            h("yoo-ion-content", { scrollEnabled: false }, !this.regularMode && h("div", { class: "camera-preview-container" },
                h("div", { class: "helper-modal", ref: el => this.helperModalDiv = el, onClick: () => this.onDismissHelperModal() },
                    h("div", { class: "modal-text" }, translate('MOVERIGHTTOTAKEPICTURE')),
                    h("div", { class: "modal-icon" },
                        h("yoo-icon", { class: "yo-next-photo" }))),
                h("yoo-img", { type: "back", class: "overlay", src: './assets/overlay/camera.png' }))),
            h("div", { class: "footer", onClick: () => { this.onCapture(); } },
                h("div", { class: "outer-circle" }, " "),
                h("div", { onTouchStart: () => { this.onCaptureInnerTouchStart(); }, onTouchEnd: () => { this.onCaptureInnerTouchEnd(); }, ref: el => this.innerButtonDiv = el, class: "inner-circle" })),
            //imageSrc ? <yoo-img class="image" src={imageSrc} /> : null
            imageSrc ? h("yoo-img", { type: "back", class: "image-bg", onTouchMove: (ev) => this.previewOnTouchMove(ev), ref: el => this.previewImageDiv = el, src: imageSrc }) : null
        ];
    }
    previewOnTouchMove(ev) {
        let y = ev.touches[0].clientY + 'px';
        if (typeof this.previewImageDiv.style['webkitClipPath'] !== 'undefined') {
            this.previewImageDiv.style['webkitClipPath'] = `circle(calc((100vw - (0.75 * 100vw)) /2 ) at calc(100% - (calc((100vw - (0.75 * 100vw)) /2 ))) ${y})`;
        }
        this.previewImageDiv.style.clipPath = `circle(calc((100vw - (0.75 * 100vw)) /2 ) at calc(100% - (calc((100vw - (0.75 * 100vw)) /2 ))) ${y})`;
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
    static get is() { return "yoo-camera-preview-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "cameraStarted": {
            "type": Boolean,
            "attr": "camera-started"
        },
        "flashMode": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "imageData": {
            "type": String,
            "attr": "image-data"
        },
        "isImageRecognition": {
            "type": Boolean,
            "attr": "is-image-recognition"
        },
        "isProcessing": {
            "state": true
        },
        "listviewItems": {
            "state": true
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "maxWidth": {
            "type": Number,
            "attr": "max-width"
        },
        "quality": {
            "type": Number,
            "attr": "quality"
        },
        "regularMode": {
            "type": Boolean,
            "attr": "regular-mode"
        },
        "showCapturedImage": {
            "state": true
        },
        "showLoader": {
            "state": true
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "cameraStop",
            "method": "cameraStop",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  position: relative; }\n  :host yoo-ion-header {\n    position: absolute;\n    top: 0;\n    background: transparent !important; }\n    :host yoo-ion-header yoo-ion-toolbar {\n      --ion-color-base: rgba(0, 0, 0, 0.6); }\n      :host yoo-ion-header yoo-ion-toolbar yoo-ion-button.button-clear {\n        --ion-color-base: var(--always-light, #FFFFFF); }\n  :host .header-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: absolute;\n    top: 0;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 100%;\n    -webkit-transition: all .3s ease;\n    transition: all .3s ease;\n    background-color: rgba(0, 0, 0, 0.5);\n    font-size: 17px;\n    overflow: hidden;\n    z-index: 999;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n    :host .header-container.active .hidden-items-container {\n      display: -ms-flexbox;\n      display: flex;\n      width: 100%;\n      max-height: 150px;\n      padding-top: 25px;\n      padding-right: var(--padding-15, 0.9375rem);\n      padding-bottom: var(--padding-15, 0.9375rem);\n      padding-left: var(--padding-15, 0.9375rem);\n      -webkit-transition: all .3s ease;\n      transition: all .3s ease;\n      opacity: 1;\n      z-index: 3;\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box; }\n    :host .header-container.active .header-bottom-handler {\n      display: block; }\n    :host .header-container .item-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      width: 100%;\n      padding-right: var(--padding-15, 0.9375rem);\n      padding-bottom: var(--padding-10, 0.625rem);\n      color: var(--always-light, #FFFFFF); }\n      :host .header-container .item-container yoo-ion-button yoo-icon {\n        color: var(--always-light, #FFFFFF);\n        font-size: 20px; }\n        :host .header-container .item-container yoo-ion-button yoo-icon.yo-rotate-camera {\n          font-size: 30px; }\n    :host .header-container .hidden-items-container {\n      top: 0;\n      width: 100%;\n      max-height: 0px;\n      -webkit-transition: all .3s ease;\n      transition: all .3s ease;\n      opacity: 0;\n      z-index: -1; }\n      :host .header-container .hidden-items-container .item {\n        display: inline-block;\n        position: relative;\n        width: 60px;\n        height: 90px;\n        margin-top: 13px;\n        margin-right: 30px;\n        border: solid 1px var(--always-light, #FFFFFF);\n        background-color: var(--always-light, #FFFFFF); }\n        :host .header-container .hidden-items-container .item yoo-icon {\n          position: absolute;\n          top: -13px;\n          right: -15px;\n          color: var(--always-light, #FFFFFF);\n          font-size: 20px; }\n    :host .header-container .header-bottom-handler {\n      display: none;\n      width: 30px;\n      height: 5px;\n      margin-top: var(--padding-15, 0.9375rem);\n      margin-bottom: var(--padding-15, 0.9375rem);\n      border-radius: 100px;\n      background-color: var(--always-light, #FFFFFF); }\n  :host .camera-preview-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    width: 100%;\n    height: 100%;\n    background: transparent; }\n    :host .camera-preview-container .helper-modal {\n      display: -ms-flexbox;\n      display: flex;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-line-pack: center;\n      align-content: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 100%;\n      width: 220px;\n      height: 100%;\n      height: 150px;\n      -webkit-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n      border-radius: 12px;\n      background-color: rgba(0, 0, 0, 0.4);\n      color: var(--always-light, #FFFFFF);\n      font-size: 17px;\n      text-align: center;\n      opacity: 0;\n      z-index: 0;\n      -webkit-backdrop-filter: blur(10px);\n      backdrop-filter: blur(10px); }\n      :host .camera-preview-container .helper-modal.active {\n        opacity: 1;\n        z-index: 3; }\n      :host .camera-preview-container .helper-modal .modal-text {\n        padding: 15px 15px 0 15px; }\n      :host .camera-preview-container .helper-modal .modal-icon {\n        padding: 15px 0 15px 0; }\n        :host .camera-preview-container .helper-modal .modal-icon yoo-icon {\n          font-size: 40px; }\n    :host .camera-preview-container .overlay {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: 100%;\n      height: 100%;\n      margin-top: 20px;\n      -webkit-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n      background-size: contain !important; }\n  :host .image {\n    position: absolute;\n    width: auto;\n    max-width: initial;\n    height: 100%;\n    opacity: .8; }\n  :host .image-bg {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    -webkit-transform: translateX(-70%);\n    transform: translateX(-70%);\n    opacity: .8;\n    -webkit-clip-path: circle(calc((100vw - (0.75 * 100vw)) /2) at calc(100% - (calc((100vw - (0.75 * 100vw)) /2 ))) calc(50% - 20px));\n    clip-path: circle(calc((100vw - (0.75 * 100vw)) /2) at calc(100% - (calc((100vw - (0.75 * 100vw)) /2 ))) calc(50% - 20px)); }\n    :host .image-bg.active {\n      -webkit-clip-path: none;\n      clip-path: none; }\n  :host .footer {\n    display: -ms-flexbox;\n    display: flex;\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 100%;\n    height: 120px;\n    background: rgba(0, 0, 0, 0.6); }\n    :host .footer .outer-circle {\n      position: absolute;\n      width: 88px;\n      height: 88px;\n      border-radius: 50%;\n      background-color: var(--always-light, #FFFFFF);\n      opacity: 0.3;\n      z-index: 1; }\n    :host .footer .inner-circle {\n      position: absolute;\n      width: 68px;\n      height: 68px;\n      border-radius: 50%;\n      background-color: white;\n      z-index: 2; }\n      :host .footer .inner-circle.tapped {\n        background-color: var(--always-light, #FFFFFF);\n        opacity: 0.6; }\n  :host yoo-ion-content {\n    background: transparent; }\n\n:host(.iphone-x) .header-container {\n  padding-top: 54px; }\n\n:host(.iphone-x) .footer {\n  height: 140px;\n  padding-top: 20px;\n  padding-bottom: 34px; }"; }
}

class YooFormCaptureComponent {
    constructor() {
        this.extraData = {};
        this.validators = [];
        this.isHistory = false;
        this.min = 1;
        this.max = 1;
        this.isSelectorMode = false;
        this.selectedIndex = [];
        this.overflowOffset = 4;
        this.cameraStarted = false;
    }
    updateAutocompleteValues(tags) {
        if (this.autocomplete && tags) {
            this.autocomplete.updateValues(tags);
        }
    }
    updateData(value, extraData) {
        this.isProcessing = false; // image recognition finish
        setValueAndValidateInput(value, this);
        this.updateExtraData(extraData);
    }
    /** If there is index, the field is a multiphoto */
    setFieldValue(index, data) {
        if (index === undefined) {
            setValueAndValidateInput(data, this);
        }
        else {
            let newValue = this.value ? [...this.value] : [];
            newValue[index] = data;
            setValueAndValidateInput(newValue, this);
        }
    }
    stopImageRecognitionProcess() {
        this.isProcessing = false;
    }
    processImageRecognitionResults(retVal) {
        this.extraData = this.extraData || {};
        if (this.multiple) {
            let markupImages = [].concat(retVal.markup_image);
            markupImages.forEach((image, index) => {
                this.extraData[index] = this.extraData[index] ? this.extraData[index] : {};
                this.extraData[index].edit = image;
                this.extraData[index].stitch = image;
                this.extraData[index].stitchMode = this.isStitch();
            });
        }
        else {
            this.extraData = Object.assign(this.extraData, { edit: retVal.markup_image });
        }
        this.imageRecognitionResults = [];
        this.imageRecognitionKpiKeys = keys(omit(retVal, ['time', 'original_image', 'markup_image', 'hiddenFields']));
        this.imageRecognitionKpiKeys = this.imageRecognitionKpiKeys.filter(key => key.toLowerCase().startsWith('delay_') === false);
        let keyValues = [];
        this.imageRecognitionKpiKeys.forEach(key => {
            let algoValue = retVal[key];
            if (isNumber(algoValue)) {
                algoValue = Math.round(algoValue * 100) / 100;
            }
            keyValues.push({ key, value: algoValue });
            let color = 'dark';
            if (algoValue === true) {
                color = 'success';
                algoValue = translate('true');
            }
            if (algoValue === false) {
                color = 'danger';
                algoValue = translate('false');
            }
            let hidden = retVal.hiddenFields && retVal.hiddenFields.indexOf(key) >= 0;
            this.imageRecognitionResults.push({ title: translate(key.toUpperCase()), color: color, value: algoValue, rawValue: retVal[key], hidden, key });
        });
        this.extraData.imageRecognitionResults = this.imageRecognitionResults;
        this.extraDataChanged.emit(keyValues);
        this.extraDataChanged.emit(this.extraData);
        this.isProcessing = false;
        this.validators = this.validators.map(v => {
            let validator = v;
            if (validator.name !== 'required') {
                validator.options.extraData = this.extraData;
            }
            return validator;
        });
        setValidator(this, null, true);
        //this.openPreview(this.multiple ? 0 : undefined);
    }
    processGeoloc(geolocation, index) {
        this.extraData = this.extraData || {};
        if (this.multiple && index !== undefined) {
            this.extraData._geoloc = this.extraData && this.extraData._geoloc ? this.extraData._geoloc : [];
            this.extraData._geoloc[index] = geolocation;
        }
        else {
            this.extraData._geoloc = geolocation;
        }
        this.extraDataChanged.emit(this.extraData);
    }
    componentWillLoad() {
        setValidator(this);
        this.initExtraData();
        this.initMultiObjects();
    }
    componentDidLoad() {
        this.fixSessionIdPath();
        this.getFileInputs();
        this.type = this.type || 'photo';
    }
    componentWillUpdate() {
        this.initMultiObjects();
    }
    componentDidUpdate() {
        this.getFileInputs();
    }
    componentDidUnload() {
        if (this.cameraStarted && isCordova() && isIOS()) {
            CameraPreview.stopCamera();
        }
    }
    initExtraData() {
        if (this.extraData) {
            if (isNullOrUndefined(this.value) && this.extraData.edit) {
                this.value = this.extraData.edit;
            }
            if (this.extraData.imageRecognitionResults) {
                this.imageRecognitionResults = this.extraData.imageRecognitionResults;
            }
        }
        this.initTags();
    }
    initMultiObjects() {
        if (this.multiple) {
            if (isNullOrUndefined(this.value)) {
                this.value = [];
            }
        }
    }
    initTags() {
        if (this.multiple) {
            for (let i = 0; i < this.max; i++) {
                this.extraData[i] = this.extraData[i] || {};
                this.extraData[i]['tags'] = this.extraData[i]['tags'] || {};
            }
        }
        else {
            this.extraData = this.extraData || {};
            this.extraData['tags'] = this.extraData['tags'] || {};
        }
    }
    getFileInputs() {
        if (this.multiple) {
            this.fileInputs = querySelectorAllDeep(this.host, '.camera-input');
        }
        else {
            this.fileInputs = querySelectorDeep(this.host, '.camera-input');
        }
    }
    removeAllCapture() {
        this.value = [];
        this.value.slice();
        setValueAndValidateInput(this.value, this);
    }
    getAddFileInput() {
        return querySelectorDeep(this.host, '.add-input');
    }
    updateExtraData(extraData) {
        this.extraData = assign(this.extraData || {}, extraData);
        this.extraDataChanged.emit(this.extraData);
    }
    getFieldValue(index) {
        return !this.multiple ? this.value : this.value[index];
    }
    /** for webcam, choose which device to take photo/video */
    capture(device, index) {
        if (isCordova()) {
            if (this.type === 'photo') {
                this.capturePhoto(false, index);
            }
            else if (this.type === 'audio') {
                this.captureAudio();
            }
            else if (this.type === 'video') {
                this.captureVideo();
            }
        }
        else {
            if (this.type === 'photo') {
                this.captureFromWebcam(device, index);
            }
        }
    }
    processImageData(imageData, index) {
        let promise;
        if (!imageData) {
            return promise = Promise.resolve(imageData);
        }
        if (isAndroid() && this.type === 'video' && imageData && imageData.indexOf('file://') < 0) {
            imageData = 'file://' + imageData;
        }
        if (imageData && imageData.indexOf('?') > 0) {
            imageData = imageData.substring(0, imageData.indexOf('?'));
        }
        if (imageData && imageData.startsWith && imageData.startsWith('data:image')) {
            promise = Promise.resolve(imageData);
        }
        else {
            if (isAndroid() && imageData.indexOf('tmp') < 0 && imageData.indexOf('cache') < 0) {
                promise = Promise.resolve(imageData);
            }
            else {
                promise = moveToImageDirectory(imageData, getSession().user ? getSession().user.disablePhotoOrientationAutoFix : false);
            }
        }
        return promise.then((newPath) => {
            if (this.shouldTagImage()) {
                this.showPhotoTagDialog(newPath).then((tag) => {
                    if (!isNullOrUndefined(tag.data)) {
                        this.updateTagData(tag, index);
                        this.setFieldValue(index, newPath);
                        this.clearPhotoEdit(index);
                        if (this.saveGeoloc) {
                            this.captureGeoloc(index);
                        }
                    }
                });
            }
            else {
                this.setFieldValue(index, newPath);
                this.clearPhotoEdit(index);
                if (this.saveGeoloc) {
                    this.captureGeoloc(index);
                }
            }
        });
    }
    showPhotoTagDialog(imageSrc, value) {
        let imageTag = document.createElement('yoo-form-capture-tag-dialog');
        imageTag.tags = this.tags;
        imageTag.imageSrc = imageSrc;
        imageTag.value = value;
        imageTag.addEventListener('fetchData', (ev) => {
            this.onFetchGridData(ev);
        });
        return showModal(imageTag, null, '', 'slideYEnterAnimation', 'slideYLeaveAnimation');
    }
    updateTagData(tag, index) {
        this.initTags();
        if (this.multiple) {
            if (this.extraData[index] && this.extraData[index].tags) {
                this.extraData[index].tags = tag.data;
            }
            else {
                this.extraData[0].tags = tag.data;
            }
        }
        else {
            this.extraData.tags = tag.data;
        }
        this.extraDataChanged.emit(this.extraData);
    }
    showCameraPreviewDialog(src, quality, isImageRecognition, maxWidth, max, extraClass, regularMode) {
        let cameraPreviewer = document.createElement('yoo-camera-preview-dialog');
        cameraPreviewer.imageData = src;
        cameraPreviewer.values = this.value;
        cameraPreviewer.quality = quality;
        cameraPreviewer.isImageRecognition = isImageRecognition;
        cameraPreviewer.maxWidth = maxWidth;
        cameraPreviewer.max = max;
        cameraPreviewer.cameraStarted = this.cameraStarted;
        cameraPreviewer.regularMode = regularMode;
        if (isCordova()) {
            if (isIOS() && !isIphoneX()) {
                StatusBar.hide();
            }
            else {
                StatusBar.styleLightContent();
            }
        }
        return showModal(cameraPreviewer, null, extraClass, 'slideYEnterAnimation', 'slideYLeaveAnimation').then(ret => {
            if (!regularMode) {
                this.cameraStarted = true;
            }
            else {
                getSession().cameraStarted = true;
            }
            if (isCordova()) {
                if (isIOS() && !isIphoneX()) {
                    StatusBar.show();
                }
                else {
                    StatusBar.styleDefault();
                }
            }
            cameraPreviewer = null;
            return ret && ret.data ? ret.data : null;
        });
    }
    capturePhoto(useLibrary, index) {
        let quality = this.isImageRecognition ? 100 : 70;
        let sourceType = useLibrary ? PictureSourceType.PHOTOLIBRARY : PictureSourceType.CAMERA;
        let mediaType = this.type === 'video' ? MediaType.VIDEO : MediaType.PICTURE;
        let isMultiMode = false; //this.multiple && isAndroid() ? true : false;
        let captureIndex = index;
        if (index === -1) {
            captureIndex = this.value && this.value.length - 1 > -1 ? this.value.length - 1 : -1;
        }
        let promise;
        if (this.algorithm && this.algorithm.stitch && !useLibrary) {
            this.showImageLoader = true;
            promise = this.showCameraPreviewDialog(this.value && captureIndex > -1 && this.value[captureIndex] ? this.value[captureIndex] : null, quality, this.isImageRecognition, this.maxWidth, this.max, 'camera-preview-visible');
        }
        else {
            //if (isIOS()){
            //    promise = this.showCameraPreviewDialog('', quality, this.isImageRecognition, this.maxWidth, this.max, 'camera-preview-visible', true);
            //} else {
            promise = getPicture(quality, sourceType, mediaType, isMultiMode, this.maxWidth, this.isImageRecognition, this.max);
            //}
        }
        return promise.then((imageData) => {
            if (!imageData && this.showImageLoader) {
                this.showImageLoader = false;
            }
            let newIndex = index;
            if (index < 0) {
                if (this.value && this.value.length) {
                    newIndex = this.value.length;
                }
                else {
                    newIndex = 0;
                }
            }
            if (isMultiMode) {
                let promises = imageData.map((d, ind) => {
                    return this.processImageData(d.fullPath, ind);
                });
                return Promise.all(promises).then(() => { });
            }
            else if (isArray(imageData)) {
                let promises = imageData.map((d, ind) => {
                    return this.processImageData(d, ind + newIndex);
                });
                return Promise.all(promises).then(() => { this.showImageLoader = false; });
            }
            else {
                if (imageData && imageData['data']) {
                    return this.processImageData(imageData['data'], newIndex);
                }
                return this.processImageData(imageData, newIndex);
            }
        }).catch((err) => {
            // console.log(err);
        });
    }
    captureVideo() {
        let options = { limit: 1, duration: this.duration || 60 };
        return MediaCapture.captureVideo(options).then((files) => {
            this.fixPathAndSetValue(files);
        });
    }
    captureAudio() {
        if (isPixel()) {
            this.noAudio();
            return;
        }
        let options = { limit: 1, duration: this.duration || 60 };
        return MediaCapture.captureAudio(options).then((files) => {
            this.fixPathAndSetValue(files);
        }).catch((err) => {
            if (err.code !== 3) {
                this.noAudio();
            }
        });
    }
    noAudio() {
        showAlert(translate('AUDIO'), [translate('OK')], null, translate('NOAUDIO'));
    }
    fixSessionIdPath() {
        if (isIOS() && isCordova() && this.value && typeof this.value !== 'undefined') {
            if (Array.isArray(this.value)) {
                let newValue = [];
                let promises = this.value.map((val, i) => {
                    return updatePathSessionId(val).then(res => {
                        newValue[i] = res;
                    });
                });
                Promise.all(promises).then(() => {
                    setValueAndValidateInput(newValue, this);
                });
            }
            else {
                updatePathSessionId(this.value).then(res => {
                    if (res && this.value !== res) {
                        setValueAndValidateInput(res, this);
                    }
                });
            }
        }
    }
    fixPathAndSetValue(files) {
        if (files && files.length > 0) {
            let path = files[0].fullPath;
            if (isIOS()) {
                path = 'file://' + path;
            }
            return moveToImageDirectory(path, getSession().user ? getSession().user.disablePhotoOrientationAutoFix : false).then((newPath) => {
                cleanupCamera();
                setValueAndValidateInput(newPath, this);
                if (this.saveGeoloc) {
                    this.captureGeoloc();
                }
            });
        }
    }
    captureFromWebcam(device, index) {
        let promise;
        let newIndex = index;
        if (index < 0) {
            if (this.value && this.value.length) {
                newIndex = this.value.length;
            }
            else {
                newIndex = 0;
            }
        }
        // if (this.algorithm && this.algorithm.stitch) {
        //     promise = showCameraPreviewDialog(this.value && newIndex > -1 && this.value[newIndex] ? this.value[newIndex] : null, 100, this.isImageRecognition, this.maxWidth, this.max, 'camera-preview-visible');
        // } else {
        let webcam = document.createElement('yoo-form-capture-webcam-dialog');
        webcam.device = device;
        promise = showModal(webcam);
        //}
        promise.then(ret => {
            if (ret && ret.data) {
                if (this.shouldTagImage()) {
                    this.showPhotoTagDialog(ret.data).then((tag) => {
                        if (!isNullOrUndefined(tag.data)) {
                            this.updateTagData(tag, newIndex);
                            this.setFieldValue(newIndex, ret.data);
                            this.clearPhotoEdit();
                            if (this.saveGeoloc) {
                                this.captureGeoloc();
                            }
                        }
                    });
                }
                else {
                    this.setFieldValue(newIndex, ret.data);
                    this.clearPhotoEdit();
                    if (this.saveGeoloc) {
                        this.captureGeoloc();
                    }
                }
            }
            webcam = null;
        });
    }
    captureFromDisk(index) {
        let targetElement = (index && index < 0 ? this.getAddFileInput() : this.getTargetElement(index));
        if (targetElement) {
            let event;
            if (isIE() || isIE11()) {
                event = document.createEvent('MouseEvent');
                event.initMouseEvent('click', false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            else {
                event = new MouseEvent('click', { bubbles: false });
            }
            targetElement.dispatchEvent(event);
        }
    }
    captureGeoloc(index) {
        if (this.saveGeoloc) {
            this.getGeoloc.emit(index);
        }
    }
    getIcon() {
        const ICON_CLASS = {
            'video': 'yo-videocamera',
            'audio': 'yo-microphone',
            'default': 'yo-camera'
        };
        let newClass = ICON_CLASS[this.type];
        if (!newClass) {
            newClass = ICON_CLASS['default'];
        }
        return newClass;
    }
    upload(index) {
        if (isCordova()) {
            this.capturePhoto(true, index);
        }
        else {
            this.captureFromDisk(index);
        }
    }
    onFetchGridData(ev) {
        ev.stopPropagation();
        this.fetchData.emit(ev.detail);
    }
    getTargetElement(index) {
        return index !== undefined ? Array.from(this.fileInputs).find((item, ind) => ind === index) : this.fileInputs;
    }
    onFileSelect(ev, index) {
        let targetElement = this.getTargetElement(index);
        let file = targetElement.files[0];
        if (isImage(file)) {
            read(file, 'blob')
                .then((data) => {
                if (this.shouldTagImage()) {
                    this.showPhotoTagDialog(data).then((tag) => {
                        if (!isNullOrUndefined(tag.data)) {
                            this.updateTagData(tag, index);
                            this.setFieldValue(index, data);
                            this.clearPhotoEdit(index);
                        }
                    });
                }
                else {
                    this.setFieldValue(index, data);
                    this.clearPhotoEdit(index);
                }
            });
        }
        else {
            this.setFieldValue(undefined, file);
        }
        // else if (isCordova() === false && this.type === 'video' && isFile(file)) {
        //     //we re uploading when in emulate to be able to have a video thumbnail, i m disabling it for now
        //     this.getMediaurl.emit(file);
        // }
        targetElement.value = null;
    }
    clearPhotoEdit(index) {
        if (!index && index !== 0) {
            if (this.extraData && (this.extraData.edit || (this.extraData.texts && this.extraData.texts.length > 0))) {
                this.extraData = { edit: null, texts: [], stitch: null };
                this.extraDataChanged.emit(this.extraData);
            }
        }
        else {
            if (this.extraData && this.extraData[index] && (this.extraData[index].edit || (this.extraData[index].texts && this.extraData[index].texts.length > 0))) {
                let newExtraData = {};
                delete this.extraData[index];
                Object.keys(this.extraData).forEach((item, i) => {
                    newExtraData[i] = this.extraData[item];
                });
                // Object.keys(obj).filter(k => obj[k]).sort((a,b) => a-b).reduce((acc, cur) => { acc[cur] = obj[cur]; return acc }, {})
                this.extraDataChanged.emit(newExtraData);
            }
        }
    }
    clearPhotoTag(index) {
        if (this.onHasTag(index)) {
            let newExtraData = {};
            if (this.multiple) {
                delete this.extraData[index];
                Object.keys(this.extraData).forEach((item, i) => {
                    newExtraData[i] = this.extraData[item];
                });
                this.extraDataChanged.emit(newExtraData);
            }
            else {
                this.extraData['tags'] = {};
                newExtraData = this.extraData;
            }
            this.extraDataChanged.emit(newExtraData);
        }
    }
    openPhotoEditorPreview(index, forceReadonly = false) {
        let photoEditor = document.createElement('yoo-photo-editor');
        photoEditor.readonly = forceReadonly || !this.allowAnnotate;
        photoEditor.isModal = true;
        photoEditor.src = this.getFieldValue(index);
        if (index === undefined) {
            if (this.extraData) {
                if (this.isStitch()) {
                    photoEditor.isStitch = this.extraData.stitch ? true : false;
                }
                photoEditor.annotatedImgSrc = this.extraData.edit;
                photoEditor.texts = this.extraData.texts;
                photoEditor.svgData = this.extraData.svgData;
            }
        }
        else {
            if (this.extraData && this.extraData[index]) {
                if (this.isStitch()) {
                    photoEditor.src = this.extraData[index].stitch || photoEditor.src;
                    photoEditor.isStitch = this.extraData[index].stitch ? true : false;
                    photoEditor.annotatedImgSrc = this.extraData[index].edit === this.extraData[index].stitch ? null : this.extraData[index].edit;
                }
                else {
                    photoEditor.annotatedImgSrc = this.extraData[index].edit;
                }
                photoEditor.texts = this.extraData[index].texts;
                photoEditor.svgData = this.extraData[index].svgData;
            }
        }
        showModal(photoEditor).then((retVal) => this.onAfterAnnotate(index, retVal));
    }
    /**
     * Need to handle this differently depending on whether we have are opening the preview from the image
     * or whether we are simply viewing the photo in readonly mode
     */
    openPreview(index, forceReadonly = false) {
        if (this.type === 'photo') {
            if (this.multiple && (!this.imageRecognitionResults || this.imageRecognitionResults.length === 0)) {
                this.renderMultiplePreview(index);
            }
            else {
                this.openPhotoEditorPreview(index, forceReadonly);
            }
        }
        else {
            // use document viewer for audio and video mode
            let file;
            if (isFile(this.value)) {
                file = this.value;
            }
            else {
                let newPath = this.value.toString();
                file = { _filename: newPath, _downloadURL: newPath, mimeType: getMimeType(newPath) };
            }
            let documentViewer = document.createElement('yoo-form-document-dialog');
            documentViewer.document = file;
            documentViewer.modalTitle = translate(this.type);
            showModal(documentViewer).then(ret => { });
        }
    }
    openGallery(index) {
        this.galleryOpened.emit(index);
    }
    onAnnotate(index) {
        let photoEditor = document.createElement('yoo-photo-editor');
        photoEditor.readonly = false;
        // Base 64 of the image
        photoEditor.src = this.getFieldValue(index);
        if (index === undefined) {
            if (this.extraData) {
                photoEditor.annotatedImgSrc = this.extraData.edit;
                photoEditor.texts = this.extraData.texts;
                photoEditor.svgData = this.extraData.svgData;
            }
        }
        else {
            if (this.extraData && this.extraData[index]) {
                photoEditor.annotatedImgSrc = this.extraData[index].edit;
                photoEditor.texts = this.extraData[index].texts;
                photoEditor.svgData = this.extraData[index].svgData;
                photoEditor.src = this.extraData[index].stitch || photoEditor.src;
            }
        }
        showModal(photoEditor).then((retVal) => this.onAfterAnnotate(index, retVal));
    }
    onAfterAnnotate(index, retVal) {
        if (retVal && retVal.data) {
            let extraData = { edit: retVal.data.canvasData, texts: retVal.data.texts, svgData: retVal.data.svgData };
            if (index === undefined) {
                this.extraData = Object.assign({}, extraData);
            }
            else {
                let tempData = clone(this.extraData);
                tempData[index] = assign(tempData[index] || {}, extraData);
                this.extraData = tempData;
            }
            this.extraDataChanged.emit(this.extraData);
        }
    }
    deleteCapture(index) {
        if (this.type === 'photo' && this.multiple && isArray(this.value)) {
            this.value.splice(index, 1);
            this.value = this.value.slice();
            setValueAndValidateInput(this.value, this);
            this.clearPhotoEdit(index);
            this.clearImageRecognition();
        }
        else {
            this.value = null;
            setValueAndValidateInput(this.value, this);
            if (this.type === 'photo') {
                this.clearPhotoEdit();
                this.clearImageRecognition();
            }
        }
        this.clearPhotoTag(index);
    }
    clearImageRecognition() {
        if (this.imageRecognitionKpiKeys && this.imageRecognitionKpiKeys.length > 0) {
            let keyValues = [];
            this.imageRecognitionKpiKeys.forEach(key => {
                keyValues.push({ key, value: null });
            });
            this.extraDataChanged.emit(keyValues);
        }
        if (this.extraData && this.extraData.imageRecognitionResults) {
            this.extraData.imageRecognitionResults = [];
        }
        this.extraDataChanged.emit(this.extraData);
    }
    isRequired(index) {
        return (index ? this.required && (index < this.min) : this.required);
    }
    async addCaptureButtons(buttons, index) {
        let textPrefix = 'TAKEANEW';
        if (isCordova()) {
            buttons.push({
                text: translate(textPrefix + this.type.toUpperCase()),
                handler: () => this.capture(null, index)
            });
        }
        else if (!isCordova() && this.type === 'photo') {
            this.devices = await getVideoDevices();
            if (this.devices && this.devices.length > 0) {
                this.devices.forEach((device, i) => {
                    buttons.push({
                        text: translate(textPrefix + this.type.toUpperCase()) + ':<br/> ' + (device.label || 'WEBCAM ' + i),
                        handler: () => this.capture(device, index)
                    });
                });
            }
        }
    }
    isValueValid() {
        if (this.multiple) {
            return isArray(this.value) && this.value.length > 0;
        }
        else {
            return this.value !== undefined && this.value !== null;
        }
    }
    onImageRecognition(ev) {
        if (this.isValueValid() && this.algorithm && !this.isProcessing) { //&& !this.isOffline
            // emit image recognition event
            this.imageRecognition.emit(this.value);
            this.isProcessing = true;
        }
    }
    isStitch() {
        return this.algorithm && this.algorithm.stitch;
    }
    onShowImageRecoKpis(ev) {
        let photoView = document.createElement('yoo-form-capture-view-dialog');
        photoView.label = translateMulti('KPIS');
        photoView.imageRecognitionResults = this.imageRecognitionResults;
        photoView.imageRecognitionDisplay = this.algorithmDisplay;
        photoView.isStitch = this.isStitch();
        showModal(photoView).then(ret => { });
    }
    onShowMaximumCaptureReached() {
        let description = translate('MAXIMUMCAPTUREREACHED');
        showAlert('', [translate('OK')], null, description);
    }
    async onShowActionSheet(value, index) {
        if ((index && index < 0 && this.max && this.value && this.value.length === this.max)) {
            this.onShowMaximumCaptureReached();
            return;
        }
        else if (this.isProcessing) {
            return;
        }
        else {
            this.actionSheetOpened.emit(index);
            let buttons = [];
            if (!value) {
                await this.addCaptureButtons(buttons, index);
                if (this.allowLibrary === true || (!isCordova() && (this.type === 'video' || this.type === 'audio'))) {
                    buttons.push({
                        text: translate('IMPORTFROMLIBRARY'),
                        handler: () => this.upload(index)
                    });
                }
            }
            else {
                const forceReadonly = true;
                buttons.push({
                    text: translate(this.type === 'photo' ? 'VIEWPHOTO' : 'VIEW'),
                    handler: () => this.openPreview(index, forceReadonly)
                });
                if (this.allowLibrary === true) {
                    buttons.push({
                        text: translate('IMPORTFROMLIBRARY'),
                        handler: () => this.upload(index)
                    });
                }
                if (this.type === 'photo' && this.allowAnnotate) {
                    buttons.push({
                        text: translate('ANNOTATE'),
                        handler: () => this.onAnnotate(index)
                    });
                }
                await this.addCaptureButtons(buttons, index);
                buttons.push({
                    text: translate(this.type === 'photo' ? 'DELETEPHOTO' : 'DELETE'),
                    handler: () => this.deleteCapture(index)
                });
            }
            if (this.shouldTagImage() && value) {
                buttons.push({
                    text: this.onHasTag(index) ? translate('EDITTAG') : translate('ADDNEWTAG'),
                    handler: () => {
                        let tagsData;
                        if (this.multiple) {
                            if (this.extraData && this.extraData[index] && this.extraData[index].tags) {
                                tagsData = this.extraData[index].tags;
                            }
                        }
                        else {
                            if (this.extraData && this.extraData.tags) {
                                tagsData = this.extraData.tags;
                            }
                        }
                        this.showPhotoTagDialog(value, tagsData).then((tag) => {
                            if (!isNullOrUndefined(tag.data)) {
                                this.updateTagData(tag, index);
                            }
                        });
                    }
                });
            }
            if (buttons.length === 1 && (this.type !== 'photo' || isCordova())) {
                buttons[0].handler();
            }
            else if (buttons.length > 0) {
                showActionSheet(buttons);
            }
        }
    }
    hasExtraData(index, isMultiple = false) {
        if (this.extraData) {
            if (isMultiple && this.extraData[index] && this.extraData[index].edit) {
                return true;
            }
            else if (isMultiple && this.extraData[index] && this.extraData[index].texts) {
            }
            else if (!isMultiple) {
                return this.extraData.edit ? true : this.extraData.texts ? true : false;
            }
        }
        return false;
    }
    onAddFileSelect() {
        if (this.value) {
            let targetElement = this.getAddFileInput();
            let initialFileSize = this.value.length;
            let allowedSize = this.max - initialFileSize;
            let files = Array.from(targetElement.files).slice(0, allowedSize);
            let newArr = [];
            let promises = files.map((imagegFile, index) => {
                if (isImage(imagegFile)) {
                    return read(imagegFile, 'blob').then((data) => {
                        newArr[index] = data;
                    });
                }
            });
            Promise.all(promises).then(() => {
                this.value = [...this.value, ...newArr];
                setValueAndValidateInput(this.value, this);
                targetElement.value = null;
            });
        }
    }
    isAllItemSelected() {
        return this.selectedIndex.length === this.value.length;
    }
    isItemSelected(index) {
        let foundIndex = this.selectedIndex.indexOf(index);
        return typeof foundIndex !== 'undefined' && foundIndex > -1;
    }
    unselectAll() {
        this.selectedIndex = [];
        this.selectedIndex.slice();
    }
    selectAll() {
        if (isArray(this.value)) {
            let arrayKeys = Array.from(this.value.keys());
            this.selectedIndex = [...arrayKeys];
        }
    }
    onItemSelect(index) {
        if (this.isItemSelected(index)) {
            this.selectedIndex.splice(this.selectedIndex.indexOf(index), 1);
            this.selectedIndex = [...this.selectedIndex];
        }
        else {
            this.selectedIndex = [...this.selectedIndex, index];
        }
    }
    onDeleteSelect() {
        let newValue = [...this.value];
        this.selectedIndex.sort().reverse().forEach(index => {
            newValue.splice(index, 1);
            this.clearPhotoEdit(index);
        });
        this.value = [...newValue];
        setValueAndValidateInput(this.value, this);
        this.clearImageRecognition();
        this.toggleSelectorMode();
    }
    toggleSelectorMode() {
        this.isSelectorMode = !this.isSelectorMode;
        this.selectedIndex = [];
    }
    getAcceptExtension() {
        let extensions;
        switch (this.type) {
            case 'video':
                extensions = videos;
                break;
            case 'audio':
                extensions = audios;
                break;
            case 'photo':
            default:
                extensions = images;
                break;
        }
        return extensions && extensions.length > 0 ? extensions.map(e => '.' + e).join(',') : null;
    }
    renderEditIcon() {
        return (h("div", { class: "edit-icon-container" },
            h("span", { class: "edit-icon" },
                h("yoo-icon", { class: "yo-brush" }))));
    }
    renderAudio() {
        return h("yoo-card-file", { class: 'document', type: this.type, _downloadURL: this.value });
    }
    renderPreviewPlayIcon() {
        return (this.type === 'video' && this.readonly ?
            h("div", { class: "control-container" },
                h("yoo-icon", { class: "yo-play" }))
            : null);
    }
    renderPreview() {
        return h("yoo-img", { type: "back", class: "preview", onClick: (ev) => this.handleImageClick(), src: cloudinary(this.value, 500, 500) },
            this.type === 'video' ? h("div", { class: "overlay" }) : null,
            this.renderPreviewPlayIcon());
    }
    handleImageClick(index) {
        if (this.readonly && this.useGallery) {
            this.openGallery(index);
        }
        else if (this.multiple && index > -1) {
            this.renderMultiplePreview(index);
        }
        else {
            this.openPreview();
        }
    }
    renderMultiplePreview(index) {
        if (this.readonly && this.useGallery) {
            this.openGallery(index);
        }
        else if (this.value && isArray(this.value) && this.value.length > 0) {
            let photoEditors = document.createElement('yoo-photo-editors');
            photoEditors.index = index;
            photoEditors.isReadonly = true;
            // Add any extra data to the items
            photoEditors.items = this.value.map(((v, valueIndex) => {
                let item = { value: v };
                if (this.extraData[valueIndex]) {
                    item = {
                        value: v,
                        edit: this.extraData[valueIndex].edit,
                        texts: this.extraData[valueIndex].texts,
                        svgData: this.extraData[valueIndex].svgData
                    };
                }
                return item;
            }));
            showModal(photoEditors);
        }
        else if (this.allowAnnotate) {
            this.onAnnotate(index);
        }
    }
    shouldRotateImage(path) {
        if (path && path.includes) {
            return path.includes('rotate_image');
        }
        else {
            return false;
        }
    }
    renderSingle() {
        if (this.readonly) {
            return h("div", { class: "readonly-container" },
                this.type === 'audio' ? this.renderAudio() : this.renderPreview(),
                this.extraData && this.extraData.distance ? h("div", { class: "distance" },
                    h("yoo-icon", { class: "yo-map" }),
                    h("span", null, this.extraData.distance)) : null,
                this.hasExtraData() && !this.isHistory ? this.renderEditIcon() : null);
        }
        else {
            return h("div", { class: "single" },
                this.renderCameraContainer(this.value, this.extraData),
                this.isImageRecognition && !this.isBackgroundProcess && this.renderButtonContainer());
        }
    }
    renderCaptureStatus() {
        let value = this.value || [];
        return value && h("div", { class: "capture-status" },
            this.required &&
                h("div", { class: "status" }, value.length > this.min ?
                    translate('PHOTOTAKEN', { 'captured_number': `${this.min}/${this.min}` }) :
                    translate('PHOTOTAKEN', { 'captured_number': `${value.length}/${this.min}` })),
            this.max && this.max > 0 &&
                h("div", { class: {
                        'status': true,
                        'max-reached': value.length === this.max
                    } }, translate('MAXIMUMCAPTURE', { 'captured_number': `${value.length}/${this.max}` })),
            value.length > 0 && h("div", { class: "action", onClick: () => { this.toggleSelectorMode(); } }, translate('SELECT2')));
    }
    renderMultiple() {
        let value = this.value || [];
        if (this.readonly) {
            return value.map && value.map((v, index) => {
                return v ? h("div", { class: "readonly-container multiple" },
                    h("yoo-img", { type: "back", class: "preview", onClick: ev => this.handleImageClick(index), src: cloudinary(v, 500, 500) }),
                    this.extraData && this.extraData.distance && this.extraData.distance[index] ? h("div", { class: "distance" },
                        h("yoo-icon", { class: "yo-map" }),
                        h("span", null, this.extraData.distance[index])) : null,
                    this.hasExtraData(index, this.multiple) && !this.isHistory ? this.renderEditIcon() : null) : null;
            });
        }
        else {
            return this.isSelectorMode ? this.renderMultipleInSelectMode() : this.renderMultipleInNormalMode();
        }
    }
    checkImageOverflow() {
        if (this.value && isArray(this.value) && this.value.length) {
            return this.value.length > this.overflowOffset;
        }
        else {
            return false;
        }
    }
    renderBottomAction() {
        return h("div", { class: {
                'bottom-action-container': true,
                'active': this.selectedIndex.length > 0
            }, onClick: () => { this.onDeleteSelect(); } },
            " ",
            translate('DELETE'));
    }
    renderTopAction() {
        return h("div", { class: "top-action-container" },
            h("div", { class: "left-action" }, this.isAllItemSelected() ?
                h("div", { onClick: () => { this.unselectAll(); } }, translate('UNSELECTALL')) :
                h("div", { onClick: () => { this.selectAll(); } }, translate('SELECTALL'))),
            h("div", { class: "right-action", onClick: () => { this.toggleSelectorMode(); } }, 'Cancel'));
    }
    renderCameraContainerInSelectMode(item, index) {
        return h("div", { class: {
                'camera-selector-container': true,
                'rotate': this.shouldRotateImage(item)
            }, onClick: () => { this.onItemSelect(index); } },
            item ? h("yoo-img", { type: "back", class: "preview", src: cloudinary(item, 500, 500) }) : null,
            h("yoo-icon", { class: "yo-circle" }),
            this.isItemSelected(index) ? h("yoo-icon", { class: "yo-check success" }) : null);
    }
    renderMultipleInSelectMode() {
        let value = this.value || [];
        return h("div", { class: "multiple selector-mode" },
            this.renderTopAction(),
            isArray(value) && value.length > 0 ?
                value.map((item, index) => {
                    return this.renderCameraContainerInSelectMode(item, index);
                })
                : null,
            this.renderBottomAction());
    }
    renderMultipleInNormalMode() {
        let value = this.value || [];
        return h("div", { class: "multiple" },
            this.showImageLoader ? h("yoo-loader", { class: "absolute large backdrop" }) : null,
            this.renderCaptureStatus(),
            this.renderAddCameraContainer(),
            isArray(value) && value.length > 0 ?
                value.map((item, index) => {
                    return this.renderCameraContainer(item, this.extraData[index], index);
                })
                : null,
            this.isImageRecognition && !this.isBackgroundProcess ? this.renderButtonContainer() : null);
    }
    renderAddCameraContainer(index = -1) {
        return h("div", { class: "camera-container", onClick: (ev) => this.onShowActionSheet(null, index) },
            h("input", { multiple: true, class: "add-input", type: "file", onChange: () => this.onAddFileSelect(), accept: this.getAcceptExtension() }),
            h("yoo-icon", { class: this.getIcon() + ' success' }));
    }
    renderProgressBar() {
        let progressLineParams = {
            uploadingMode: true
        };
        return h("div", { class: "progressbar-wrapper" },
            h("yoo-progress-bar-core", { shape: "line", percentColorScheme: false, progressParameters: progressLineParams }));
    }
    renderCameraContainer(value, extraData, index) {
        return h("div", { class: {
                'camera-container': true,
                'rotate': this.shouldRotateImage(value)
            }, onClick: (ev) => this.onShowActionSheet(value, index) },
            h("input", { class: "camera-input", type: "file", onChange: (ev) => this.onFileSelect(ev, index), accept: this.getAcceptExtension() }),
            value ? h("yoo-img", { type: "back", class: "preview", src: cloudinary(value, 500, 500) }) : null,
            extraData && extraData.edit ? h("yoo-img", { type: "back", class: "edit", src: cloudinary(extraData.edit, 340, 250) }) : null,
            value && !this.multiple ? h("div", { class: "overlay" }) : null,
            !this.multiple ? h("yoo-icon", { class: this.getIcon() + (value ? ' always-light' : ' success') }) : null,
            this.onHasTag(index) && h("div", { class: "tag-icon-container" },
                h("yoo-icon", { class: "yo-tag" })));
    }
    renderButtonContainer() {
        return [
            h("div", { class: "button-container" },
                h("yoo-button", { class: "x-medium gradient-success full-width", onClick: (ev) => this.onImageRecognition(ev), disabled: this.isProcessing || !this.isValueValid(), text: !this.isProcessing ? translate('PHOTOLIVECOUNTER') : translate('PROCESSING') + '...' }),
                this.imageRecognitionResults && this.imageRecognitionResults.length > 0 && this.algorithmDisplay &&
                    h("yoo-button", { class: "x-medium dark show-kpi full-width", onClick: (ev) => this.onShowImageRecoKpis(ev), text: translate('SHOWIMAGERECOKPIS') }))
        ];
    }
    renderReadonly() {
        if (!this.value) {
            return null;
        }
        let overflown = this.isHistory && this.checkImageOverflow();
        return [h("div", { class: {
                    'readonly': true,
                    'truncate': overflown
                }, ref: el => this.readonlyDiv = el }, !this.multiple ? this.renderSingle() : this.renderMultiple()),
            (this.imageRecognitionResults && this.imageRecognitionResults.length > 0 && this.algorithmDisplay ? h("div", { class: "button-container" },
                h("yoo-button", { class: "x-medium dark full-width", onClick: (ev) => this.onShowImageRecoKpis(ev), text: translate('SHOWIMAGERECOKPIS') })) : null),
            (overflown ? h("div", { class: "more-button", ref: el => this.moreButtonDiv = el, onClick: () => this.onToggleMore() }, translate('MORE')) : null)
        ];
    }
    onToggleMore() {
        if (this.readonlyDiv && this.readonlyDiv.classList.contains('truncate')) {
            this.readonlyDiv.classList.remove('truncate');
            this.moreButtonDiv.innerHTML = translate('VIEWLESS');
        }
        else {
            this.readonlyDiv.classList.add('truncate');
            this.moreButtonDiv.innerHTML = translate('MORE');
        }
    }
    onHasTag(index) {
        if (index > -1) {
            return this.extraData && this.extraData[index] && this.extraData[index].tags.length > 0;
        }
        else {
            return this.extraData && this.extraData.tags && this.extraData.tags.length > 0;
        }
    }
    shouldTagImage() {
        return this.tags && this.tags.length > 0;
    }
    renderEditable() {
        return h("div", { class: {
                'outer-container': true,
                'uploading': this.isProcessing
            } },
            this.isProcessing ? h("div", { class: "upload-overlay" }) : null,
            this.isProcessing ? this.renderProgressBar() : null,
            !this.multiple ? this.renderSingle() : this.renderMultiple());
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext(), { 'audio': this.type && this.type === 'audio' && this.isHistory })
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-capture"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "algorithm": {
            "type": "Any",
            "attr": "algorithm"
        },
        "algorithmDisplay": {
            "type": "Any",
            "attr": "algorithm-display"
        },
        "allowAnnotate": {
            "type": Boolean,
            "attr": "allow-annotate"
        },
        "allowLibrary": {
            "type": Boolean,
            "attr": "allow-library"
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "extraData": {
            "type": "Any",
            "attr": "extra-data",
            "mutable": true
        },
        "host": {
            "elementRef": true
        },
        "imageRecognitionResults": {
            "state": true
        },
        "isBackgroundProcess": {
            "type": Boolean,
            "attr": "is-background-process"
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "isImageRecognition": {
            "type": Boolean,
            "attr": "is-image-recognition"
        },
        "isProcessing": {
            "state": true
        },
        "isSelectorMode": {
            "state": true
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "max": {
            "type": Number,
            "attr": "max"
        },
        "maxWidth": {
            "type": Number,
            "attr": "max-width"
        },
        "min": {
            "type": Number,
            "attr": "min"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "processGeoloc": {
            "method": true
        },
        "processImageRecognitionResults": {
            "method": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "saveGeoloc": {
            "type": Boolean,
            "attr": "save-geoloc"
        },
        "selectedIndex": {
            "state": true
        },
        "setFieldValue": {
            "method": true
        },
        "showImageLoader": {
            "state": true
        },
        "stopImageRecognitionProcess": {
            "method": true
        },
        "tags": {
            "type": "Any",
            "attr": "tags"
        },
        "type": {
            "type": String,
            "attr": "type",
            "mutable": true
        },
        "updateAutocompleteValues": {
            "method": true
        },
        "updateData": {
            "method": true
        },
        "useGallery": {
            "type": Boolean,
            "attr": "use-gallery"
        },
        "validators": {
            "type": "Any",
            "attr": "validators",
            "mutable": true
        },
        "validity": {
            "state": true
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
        }, {
            "name": "imageRecognition",
            "method": "imageRecognition",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "getGeoloc",
            "method": "getGeoloc",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "getMediaurl",
            "method": "getMediaurl",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "galleryOpened",
            "method": "galleryOpened",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "actionSheetOpened",
            "method": "actionSheetOpened",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "extraDataChanged",
            "method": "extraDataChanged",
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
    static get style() { return ":host {\n  --width-readonly-preview: 100%;\n  --height-readonly-preview: 250px;\n  --play-icon-size: 50px;\n  --selector-icon-size: 15px;\n  --camera-selector-container-size: 98px;\n  --camera-container-height: 98px; }\n\n:host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: start;\n  align-items: flex-start; }\n  :host .outer-container.uploading {\n    opacity: .6; }\n  :host .outer-container .upload-overlay {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background: transparent;\n    z-index: 999; }\n  :host .outer-container .progressbar-wrapper {\n    width: 100%;\n    margin-top: -0.5rem;\n    padding: 0.5rem 0; }\n  :host .outer-container .camera-container {\n    position: relative;\n    width: var(--camera-container-height, 98px);\n    height: var(--camera-container-height, 98px);\n    border: 1px solid var(--input-container-border-color, #E6E6E6);\n    border-radius: 0.5rem;\n    cursor: pointer;\n    min-width: var(--camera-container-height, 98px); }\n    :host .outer-container .camera-container .required {\n      top: auto;\n      right: auto;\n      bottom: auto;\n      left: 0.625rem;\n      position: absolute;\n      color: var(--success, #04CC99);\n      font-size: 15px; }\n    :host .outer-container .camera-container yoo-icon {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n      font-size: var(--camera-container-size, 30px); }\n      :host .outer-container .camera-container yoo-icon.light {\n        color: var(--light, #FFFFFF); }\n      :host .outer-container .camera-container yoo-icon.success {\n        color: var(--success, #04CC99); }\n    :host .outer-container .camera-container .preview,\n    :host .outer-container .camera-container .edit,\n    :host .outer-container .camera-container .overlay {\n      top: 0;\n      right: auto;\n      bottom: auto;\n      left: auto;\n      position: absolute;\n      width: var(--camera-container-height, 98px);\n      height: var(--camera-container-height, 98px);\n      border-radius: 0.5rem; }\n      :host .outer-container .camera-container .preview.edit,\n      :host .outer-container .camera-container .edit.edit,\n      :host .outer-container .camera-container .overlay.edit {\n        top: 0;\n        right: auto;\n        bottom: auto;\n        left: 0;\n        position: absolute;\n        z-index: 0; }\n    :host .outer-container .camera-container .overlay {\n      background: var(--dark-60, #6b81a6);\n      opacity: 0.5; }\n    :host .outer-container .camera-container input[type=file] {\n      top: 0;\n      right: auto;\n      bottom: auto;\n      left: 50%;\n      position: absolute;\n      display: block;\n      width: var(--camera-container-height, 98px);\n      min-width: var(--camera-container-height, 98px);\n      height: var(--camera-container-height, 98px);\n      margin-left: -50px;\n      border-radius: 50%;\n      outline: none;\n      background: var(--light, #FFFFFF);\n      text-align: right;\n      cursor: inherit;\n      opacity: 0;\n      filter: alpha(opacity=0);\n      pointer-events: none; }\n    :host .outer-container .camera-container.rotate {\n      -webkit-transform: rotate(90deg);\n      transform: rotate(90deg); }\n    :host .outer-container .camera-container .tag-icon-container {\n      display: -ms-flexbox;\n      display: flex;\n      position: absolute;\n      right: 5px;\n      bottom: 5px;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 20px;\n      height: 20px;\n      border-radius: 50%;\n      background-color: rgba(0, 0, 0, 0.6); }\n      :host .outer-container .camera-container .tag-icon-container yoo-icon.yo-tag {\n        color: var(--light, #FFFFFF);\n        font-size: var(--font-s, 13px); }\n  :host .outer-container .multiple {\n    position: relative;\n    width: 100%;\n    margin-bottom: -0.75rem; }\n    :host .outer-container .multiple.selector-mode {\n      margin-bottom: 0; }\n    :host .outer-container .multiple .capture-status {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      padding-bottom: 10px; }\n      :host .outer-container .multiple .capture-status .action {\n        padding-left: var(--padding-16);\n        color: var(--success, #04CC99);\n        text-align: right; }\n      :host .outer-container .multiple .capture-status .status {\n        width: 100%;\n        padding-right: var(--padding-15, 0.9375rem);\n        color: var(--stable, #adadad);\n        text-align: left;\n        white-space: nowrap; }\n        :host .outer-container .multiple .capture-status .status.max-reached {\n          color: var(--black, #000000); }\n    :host .outer-container .multiple .camera-container {\n      display: inline-block;\n      margin-right: var(--padding-15, 0.9375rem);\n      margin-bottom: var(--padding-15, 0.9375rem); }\n      :host .outer-container .multiple .camera-container .yo-plus {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        width: 25px;\n        height: 25px;\n        border-radius: 20px;\n        background: var(--success, #04CC99);\n        font-size: var(--font-l, 17px); }\n        :host .outer-container .multiple .camera-container .yo-plus:before {\n          color: var(--light, #FFFFFF); }\n    :host .outer-container .multiple .camera-selector-container {\n      display: inline-block;\n      position: relative;\n      width: var(--camera-selector-container-size);\n      min-width: var(--camera-selector-container-size);\n      height: var(--camera-selector-container-size);\n      margin-right: var(--padding-15, 0.9375rem); }\n      :host .outer-container .multiple .camera-selector-container .preview {\n        width: 100%;\n        height: 100%;\n        border-radius: var(--border-radius-input, 5px); }\n      :host .outer-container .multiple .camera-selector-container yoo-icon {\n        position: absolute;\n        top: 5px;\n        right: 5px;\n        width: var(--selector-icon-size);\n        height: var(--selector-icon-size);\n        color: var(--light, #FFFFFF);\n        font-size: var(--selector-icon-size); }\n      :host .outer-container .multiple .camera-selector-container yoo-icon.yo-circle {\n        z-index: 2; }\n      :host .outer-container .multiple .camera-selector-container yoo-icon.yo-check {\n        color: var(--success, #04CC99);\n        z-index: 3; }\n      :host .outer-container .multiple .camera-selector-container.rotate {\n        -webkit-transform: rotate(90deg);\n        transform: rotate(90deg); }\n        :host .outer-container .multiple .camera-selector-container.rotate yoo-icon {\n          right: 0;\n          left: 5px;\n          -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg); }\n    :host .outer-container .multiple .bottom-action-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      height: 45px;\n      margin-top: var(--padding-15, 0.9375rem);\n      background: #f1f1f1;\n      color: #d0d0d0; }\n      :host .outer-container .multiple .bottom-action-container.active {\n        color: var(--danger, #ff625f); }\n    :host .outer-container .multiple .top-action-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: distribute;\n      justify-content: space-around;\n      padding-bottom: var(--padding-15, 0.9375rem); }\n      :host .outer-container .multiple .top-action-container .left-action, :host .outer-container .multiple .top-action-container .right-action {\n        width: 100%;\n        color: var(--success, #04CC99); }\n      :host .outer-container .multiple .top-action-container .left-action {\n        text-align: left; }\n      :host .outer-container .multiple .top-action-container .right-action {\n        text-align: right; }\n  :host .outer-container .single {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    width: 100%; }\n    :host .outer-container .single .button-container {\n      margin-left: 1rem; }\n      :host .outer-container .single .button-container yoo-button {\n        --padding-value:0; }\n  :host .outer-container .button-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex: 1;\n    flex: 1;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    margin-bottom: 1rem; }\n    :host .outer-container .button-container yoo-button {\n      --padding-container: 0 3rem;\n      --width-container: 230px; }\n      :host .outer-container .button-container yoo-button.show-kpi {\n        padding-top: 1rem; }\n  :host .outer-container .tags {\n    width: 100%;\n    margin-top: 0.5rem; }\n\n:host .readonly {\n  padding: 0.5rem 0rem; }\n  :host .readonly .readonly-container {\n    position: relative; }\n    :host .readonly .readonly-container .preview {\n      display: -ms-flexbox;\n      display: flex;\n      position: relative;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: var(--width-readonly-preview);\n      height: var(--height-readonly-preview);\n      margin-right: auto;\n      margin-bottom: 1rem;\n      margin-left: auto;\n      border-radius: var(--border-radius-input, 5px); }\n      :host .readonly .readonly-container .preview .overlay {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        background-color: rgba(0, 0, 0, 0.4); }\n      :host .readonly .readonly-container .preview .control-container {\n        display: -ms-flexbox;\n        display: flex;\n        position: relative;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        width: 100%;\n        height: 100%;\n        background: transparent;\n        font-size: var(--play-icon-size);\n        z-index: 1; }\n        :host .readonly .readonly-container .preview .control-container yoo-icon {\n          position: absolute;\n          width: var(--play-icon-size);\n          height: var(--play-icon-size);\n          color: white; }\n    :host .readonly .readonly-container .edit-icon-container {\n      display: -ms-flexbox;\n      display: flex;\n      position: absolute;\n      bottom: var(--padding-15, 0.9375rem);\n      left: var(--padding-15, 0.9375rem);\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 1.875rem;\n      height: 1.875rem;\n      border-radius: 0.9375rem;\n      background: var(--light, #FFFFFF);\n      color: var(--black, #000000);\n      font-size: var(--font-m, 15px); }\n  :host .readonly .button-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex: 1;\n    flex: 1;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-line-pack: center;\n    align-content: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    margin-bottom: 0.5rem; }\n    :host .readonly .button-container yoo-button {\n      --padding-container: 0 3rem;\n      --width-container: 230px; }\n\n:host(.audio) .readonly .readonly-container {\n  width: 100%; }\n\n:host(.history) {\n  padding: 0 !important; }\n  :host(.history) .readonly {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n    padding: 0 !important; }\n    :host(.history) .readonly .readonly-container .preview {\n      margin: 0 !important;\n      border-radius: 2px !important; }\n    :host(.history) .readonly .readonly-container.multiple {\n      width: initial;\n      min-width: initial;\n      padding-right: 5px;\n      padding-bottom: 5px; }\n    :host(.history) .readonly .preview .overlay {\n      background-color: unset; }\n    :host(.history) .readonly.truncate {\n      max-height: 30px;\n      overflow: hidden; }\n  :host(.history) .more-button {\n    display: -ms-flexbox;\n    display: flex;\n    margin-left: auto;\n    float: right;\n    color: var(--stable, #adadad); }\n\n:host(.truncate) .readonly {\n  max-height: 70px;\n  overflow: hidden; }\n\n:host(.boost) yoo-icon.success {\n  color: var(--danger-light, #F46885) !important; }\n\n\@media only screen and (max-width: 370px) {\n  :host {\n    --camera-selector-container-size: 93px !important;\n    --camera-container-height: 93px !important; }\n    :host .outer-container .camera-container {\n      position: relative;\n      width: var(--camera-container-height-medium-screen, 93px);\n      height: var(--camera-container-height-medium-screen, 93px);\n      border: 1px solid var(--input-container-border-color, #E6E6E6);\n      border-radius: 0.5rem;\n      cursor: pointer; }\n      :host .outer-container .camera-container .required {\n        top: auto;\n        right: auto;\n        bottom: auto;\n        left: 0.625rem;\n        position: absolute;\n        color: var(--success, #04CC99);\n        font-size: 15px; }\n      :host .outer-container .camera-container yoo-icon {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        -webkit-transform: translate(-50%, -50%);\n        transform: translate(-50%, -50%);\n        font-size: var(--camera-container-size, 30px); }\n        :host .outer-container .camera-container yoo-icon.light {\n          color: var(--light, #FFFFFF); }\n        :host .outer-container .camera-container yoo-icon.success {\n          color: var(--success, #04CC99); }\n      :host .outer-container .camera-container .preview,\n      :host .outer-container .camera-container .edit,\n      :host .outer-container .camera-container .overlay {\n        top: 0;\n        right: auto;\n        bottom: auto;\n        left: auto;\n        position: absolute;\n        width: var(--camera-container-height-medium-screen, 93px);\n        height: var(--camera-container-height-medium-screen, 93px);\n        border-radius: 0.5rem; }\n        :host .outer-container .camera-container .preview.edit,\n        :host .outer-container .camera-container .edit.edit,\n        :host .outer-container .camera-container .overlay.edit {\n          top: 0;\n          right: auto;\n          bottom: auto;\n          left: 0;\n          position: absolute;\n          z-index: 0; }\n      :host .outer-container .camera-container .overlay {\n        background: var(--dark-60, #6b81a6);\n        opacity: 0.5; }\n    :host .outer-container .button-container yoo-button {\n      --padding-container: 0 3rem;\n      --width-container: 200px; } }\n\n\@media only screen and (max-width: 320px) {\n  :host {\n    --camera-selector-container-size: 60px !important;\n    --camera-container-height: 60px !important; }\n    :host .outer-container .camera-container {\n      position: relative;\n      width: var(--camera-container-height-small-screen, 80px);\n      height: var(--camera-container-height-small-screen, 80px);\n      border: 1px solid var(--input-container-border-color, #E6E6E6);\n      border-radius: 0.5rem;\n      cursor: pointer; }\n      :host .outer-container .camera-container .required {\n        top: auto;\n        right: auto;\n        bottom: auto;\n        left: 0.625rem;\n        position: absolute;\n        color: var(--success, #04CC99);\n        font-size: 15px; }\n      :host .outer-container .camera-container yoo-icon {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        -webkit-transform: translate(-50%, -50%);\n        transform: translate(-50%, -50%);\n        font-size: var(--camera-container-size, 30px); }\n        :host .outer-container .camera-container yoo-icon.light {\n          color: var(--light, #FFFFFF); }\n        :host .outer-container .camera-container yoo-icon.success {\n          color: var(--success, #04CC99); }\n      :host .outer-container .camera-container .preview,\n      :host .outer-container .camera-container .edit,\n      :host .outer-container .camera-container .overlay {\n        top: 0;\n        right: auto;\n        bottom: auto;\n        left: auto;\n        position: absolute;\n        width: var(--camera-container-height-small-screen, 80px);\n        height: var(--camera-container-height-small-screen, 80px);\n        border-radius: 0.5rem; }\n        :host .outer-container .camera-container .preview.edit,\n        :host .outer-container .camera-container .edit.edit,\n        :host .outer-container .camera-container .overlay.edit {\n          top: 0;\n          right: auto;\n          bottom: auto;\n          left: 0;\n          position: absolute;\n          z-index: 0; }\n      :host .outer-container .camera-container .overlay {\n        background: var(--dark-60, #6b81a6);\n        opacity: 0.5; }\n    :host .outer-container .button-container yoo-button {\n      --padding-container: 0 3rem;\n      --width-container: 190px; } }"; }
}

class YooFormCaptureTagDialogComponent {
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
    static get style() { return ":host {\n  background: var(--light, #FFFFFF); }\n  :host .outer-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    height: 100%; }\n    :host .outer-container .image-container {\n      display: -ms-flexbox;\n      display: flex;\n      width: 375px;\n      width: 100%;\n      height: 375px; }\n      :host .outer-container .image-container yoo-img {\n        width: 100%;\n        height: 100%; }\n    :host .outer-container .tags-container {\n      padding: var(--padding-15, 0.9375rem); }\n      :host .outer-container .tags-container .tag-header {\n        padding-bottom: var(--padding-5, 0.3125rem); }\n        :host .outer-container .tags-container .tag-header .optional {\n          padding-left: var(--padding-5, 0.3125rem);\n          color: var(--text-color, #807f83); }\n    :host .outer-container .button-container {\n      margin-top: auto;\n      padding: var(--padding-15, 0.9375rem); }\n  :host .title-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    height: 64px; }\n    :host .title-container yoo-ion-button {\n      position: absolute;\n      left: 0;\n      color: var(--text-color, #807f83);\n      z-index: 1; }\n    :host .title-container yoo-ion-button.list {\n      position: relative;\n      right: 0; }\n      :host .title-container yoo-ion-button.list yoo-icon.yo-list-view yoo-badge {\n        position: absolute;\n        top: 2px;\n        right: 5px;\n        border-radius: 50%; }\n\n:host(.iphone-x) .title-container {\n  padding-top: 50px; }\n\n:host(.iphone-x) .bottom-container {\n  padding-bottom: 35px; }"; }
}

class YooFormCaptureViewDialogComponent {
    componentWillLoad() {
        if (this.imageRecognitionResults && this.imageRecognitionResults.length > 0 && this.imageRecognitionDisplay && this.imageRecognitionDisplay.length > 0) {
            this.properties = [];
            this.imageRecognitionDisplay.forEach(display => {
                switch (display.type) {
                    case 'list':
                    case 'grid':
                        let values = cloneDeep(this.imageRecognitionResults);
                        if (display.filter) {
                            values = values.filter(r => r.key.toUpperCase().indexOf(display.filter.toUpperCase()) >= 0);
                        }
                        if (display.filters) {
                            values = values.filter(r => display.filters.map(k => k.toUpperCase()).indexOf(r.key.toUpperCase()) >= 0);
                        }
                        if (display.value !== null && display.value !== undefined) {
                            values = values.filter(r => r.rawValue === display.value.toString());
                        }
                        if (display.factor) {
                            values.forEach(v => v.value * display.factor);
                        }
                        if (display.sort) {
                            values = orderBy(values, v => v.value * (display.sort === 'desc' ? -1 : 1));
                        }
                        if (display.limit) {
                            values = values.slice(0, display.limit);
                        }
                        let rows = values.map(v => ({ values: [v.title, v.value + (display.unit ? display.unit : '')], color: v.color }));
                        if (display.rows) {
                            rows = [];
                            display.rows.forEach((row) => {
                                let rowValues = [];
                                row.forEach((r, i) => {
                                    if (i === 0) {
                                        rowValues.push(r);
                                    }
                                    else {
                                        if (r) {
                                            let kpi = this.imageRecognitionResults.find(k => k.key === r);
                                            if (kpi) {
                                                rowValues.push(kpi.value);
                                            }
                                            else {
                                                rowValues.push(null);
                                            }
                                        }
                                        else {
                                            rowValues.push(null);
                                        }
                                    }
                                });
                                rows.push({ values: rowValues, color: null });
                            });
                        }
                        this.properties.push({
                            title: display.title,
                            type: 'grid',
                            headers: display.headers || ['KPI', 'Value'],
                            values: rows
                        });
                        break;
                }
            });
        }
    }
    componentDidLoad() {
        if (!this.edit && !this.preview) {
            //setTimeout(() => {
            lockSwipes(this.ionSlides, true);
            //}, 300);
        }
    }
    onCancel() {
        closeModal(null);
    }
    getResultColor(color) {
        if (color) {
            if (color === 'balanced') {
                return 'success';
            }
            if (color === 'assertive') {
                return 'danger';
            }
            return color;
        }
        return 'black';
    }
    renderWebBody() {
        return h("yoo-ion-content", { scrollEnabled: false },
            h("div", { class: "images" },
                !(this.edit && this.isStitch) ? h("yoo-img", { class: "preview", src: this.preview }) : null,
                this.edit ? h("yoo-img", { class: "preview edit", src: this.edit }) : null,
                this.imageRecognitionResults && this.imageRecognitionResults.length > 0 ?
                    h("div", { class: "image-recos" }, this.imageRecognitionResults.map((result) => {
                        return !result.hidden ? h("div", { class: 'image-reco' },
                            h("div", { class: "title" },
                                result.title,
                                ":"),
                            h("div", { class: 'image-reco-value ' + this.getResultColor(result.color) }, result.value)) : null;
                    })) : null));
    }
    renderMobileBody() {
        return h("yoo-ion-content", { class: "bg-dark-05", scrollEnabled: false },
            h("yoo-ion-slides", { ref: el => this.ionSlides = el, pager: this.imageRecognitionResults && this.imageRecognitionResults.length > 0 && (this.edit || this.preview) ? true : false },
                this.preview || this.edit ?
                    h("yoo-ion-slide", null,
                        h("div", { class: "images" },
                            !(this.edit && this.isStitch) ? h("yoo-img", { class: "preview", src: this.preview }) : null,
                            this.edit ? h("yoo-img", { class: "preview edit", src: this.edit }) : null)) : null,
                this.imageRecognitionResults && this.imageRecognitionResults.length > 0 ?
                    h("yoo-ion-slide", null,
                        h("yoo-ion-scroll", null, this.properties && this.properties.length > 0 ?
                            [h("yoo-property-card", { class: "kpi swiper-no-swiping", properties: this.properties }),
                                (isIOS() && isCordova()) && h("div", { class: "scroll-spacer" })]
                            : h("div", { class: "image-recos swiper-no-swiping" }, this.imageRecognitionResults.map((result, i) => {
                                return !result.hidden ? h("div", { class: 'image-reco' + ((i % 2 === 0) ? ' contrasted' : '') },
                                    h("div", { class: "title" },
                                        result.title,
                                        ":"),
                                    h("div", { class: 'image-reco-value ' + this.getResultColor(result.color) }, result.value)) : null;
                            })))) : null));
    }
    render() {
        return [
            h("yoo-ion-header", { class: "shadow", "no-border": true },
                h("yoo-ion-toolbar", { color: "light" },
                    h("yoo-ion-buttons", { slot: "start" },
                        h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                            h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                    h("yoo-ion-title", null, this.label))),
            isWeb() ? this.renderWebBody() : this.renderMobileBody()
        ];
    }
    static get is() { return "yoo-form-capture-view-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowAnnotate": {
            "type": Boolean,
            "attr": "allow-annotate"
        },
        "edit": {
            "type": "Any",
            "attr": "edit"
        },
        "host": {
            "elementRef": true
        },
        "imageRecognitionDisplay": {
            "type": "Any",
            "attr": "image-recognition-display"
        },
        "imageRecognitionResults": {
            "type": "Any",
            "attr": "image-recognition-results"
        },
        "isStitch": {
            "type": Boolean,
            "attr": "is-stitch"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "preview": {
            "type": "Any",
            "attr": "preview"
        }
    }; }
    static get style() { return ":host {\n  --list-padding: 1.25rem 0.625rem 1.25rem 0.625rem;\n  --list-row-height: 38px; }\n\n:host yoo-ion-content {\n  background: var(--dark-05, #f3f5f8); }\n\n:host yoo-ion-slides {\n  height: 100%; }\n\n:host .scroll-spacer {\n  width: 100%;\n  height: 100px; }\n\n:host .swiper-pagination-bullet-active {\n  background-color: var(--black, #000000) !important; }\n\n:host .preview {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  width: 100% !important;\n  height: auto;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n  :host .preview.edit {\n    z-index: 1; }\n  :host .preview.web {\n    right: 0;\n    left: 0;\n    width: auto;\n    max-width: 100%;\n    max-height: 600px; }\n\n:host .image-recos {\n  padding: var(--list-padding);\n  background-color: white;\n  z-index: 10; }\n  :host .image-recos .image-reco {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n    height: var(--list-row-height);\n    padding: 0.25rem 1rem; }\n    :host .image-recos .image-reco.contrasted {\n      background-color: var(--stable-light, #f1f1f1) !important; }\n    :host .image-recos .image-reco .title, :host .image-recos .image-reco .image-reco-value {\n      font-size: var(--font-m, 15px); }\n    :host .image-recos .image-reco .title {\n      width: 90%;\n      text-align: left;\n      overflow-wrap: break-word; }\n    :host .image-recos .image-reco .image-reco-value {\n      width: 10%;\n      text-align: right;\n      overflow-wrap: break-word; }\n  :host .image-recos .image-reco:nth-of-type(even) {\n    background: white; }\n  :host .image-recos .image-reco:nth-of-type(odd) {\n    background: var(--kpi-list-item-background); }"; }
}

class YooPropertyCardComponent {
    isPositive(value) {
        if (value.isPositive === true || value.isPositive === false) {
            return value.isPositive;
        }
        return value.delta > 0;
    }
    isGrowing(value) {
        if (value.isGrowing === true || value.isGrowing === false) {
            return value.isGrowing;
        }
        return value.delta > 0;
    }
    getArrowIconClassName(value) {
        if (value.delta === 0) {
            return;
        }
        return this.isGrowing(value) ? 'yo-big-arrow-up' : 'yo-big-arrow-down';
    }
    getChartIconClassName(value) {
        if (value.delta === 0) {
            return;
        }
        return this.isGrowing(value) ? 'yo-chart-up' : 'yo-chart-down';
    }
    getDeltaColor(value) {
        if (value.delta === 0) {
            return;
        }
        return this.isPositive(value) ? 'success' : 'danger';
    }
    renderDelta(value, orientation = 'column') {
        if (value.delta === null || value.delta === undefined) {
            return null; // (<div class="delta"><div class="chart-container"><yoo-icon class="yo-no-data"></yoo-icon></div></div>);
        }
        let content = value.delta;
        let deltaContent = [value.delta, value.deltaSign || null].join(' ');
        if (orientation !== 'row') {
            content = [
                h("yoo-icon", { class: (this.getArrowIconClassName(value)) }),
                h("span", null, deltaContent),
                h("div", { class: "chart-container" },
                    h("yoo-icon", { class: (this.getChartIconClassName(value)) }))
            ];
        }
        return (h("div", { class: 'delta ' + (this.getDeltaColor(value)), style: { color: value.colorHex } }, content));
    }
    renderTitle(value) {
        return h("div", { class: "title" },
            h("span", null, translate(value.title)));
    }
    renderNumber(value, orientation = 'column') {
        return (h("div", { class: "number" },
            value.value && h("span", null, value.value),
            orientation === 'column' && value.isPercent && h("span", null, "%")));
    }
    renderColumns(property) {
        return [
            property.values.map((value) => h("div", { class: "p-column" },
                h("div", { class: "top" }, this.renderDelta(value)),
                h("div", { class: "bottom" },
                    this.renderNumber(value),
                    value.title && this.renderTitle(value))))
        ];
    }
    renderGrid(property) {
        return (h("div", { class: "p-type-grid-scroll-container swiper-no-swiping" },
            h("yoo-ion-scroll", { class: "relative", horizontalMode: true, showScrollbar: true },
                h("div", { class: "inner-container" },
                    h("div", { class: 'p-row header ' + property.headers.length }),
                    property.values.map((r) => h("div", { class: 'p-row ' }, r.values.map((value) => (value ? h("span", { class: (value.truncate ? 'break-lines' : null) },
                        " ",
                        isString(value) ? value : translate(value.title),
                        " ") : null))))))));
    }
    getValueArr(value) {
        return [...Array.from(value.keys())];
    }
    renderKpiGrid(property) {
        return (h("div", { class: "p-type-grid-scroll-container swiper-no-swiping" },
            h("yoo-ion-scroll", { class: "relative", horizontalMode: true, showScrollbar: true },
                h("div", { class: "inner-container" }, property.headers.map((value, index) => {
                    return h("div", { class: "p-column" },
                        h("div", { class: "p-column-header" }, value),
                        this.getValueArr(property.values).map((x, valueIdx) => {
                            return h("div", { class: 'p-column-item' }, (property.values[valueIdx].values)[index]);
                        }));
                })))));
    }
    renderRows(p) {
        return [
            p.values.map((value) => h("div", { class: "p-row" },
                value.title && this.renderTitle(value),
                value.value && this.renderNumber(value, 'row'),
                value.delta && this.renderDelta(value, 'row')))
        ];
    }
    // TODO: is this work in progress
    renderChart(p) {
        return h("div", null);
    }
    renderHtml(property) {
        return h("div", null, property.value);
    }
    renderPropertyTitle(property) {
        return (h("div", { class: `details-title ${property.type}` }, translate(property.title)));
    }
    renderPropertyEntity(property) {
        switch (property.type) {
            case 'columns': {
                return this.renderColumns(property);
            }
            case 'grid': {
                return this.host.classList.contains('kpi') ? this.renderKpiGrid(property) : this.renderGrid(property);
            }
            case 'rows': {
                return this.renderRows(property);
            }
            case 'chart': {
                return this.renderChart(property);
            }
            case 'html': {
                return this.renderHtml(property);
            }
            default:
                return null;
        }
    }
    renderPropertyType(property) {
        return (h("div", { class: 'p-type-' + property.type }, this.renderPropertyEntity(property)));
    }
    renderProperty(property) {
        return (h("div", { class: "details" },
            property.title && this.renderPropertyTitle(property),
            property.type && this.renderPropertyType(property)));
    }
    hostData() {
        return {
            class: {
                'web': isWeb()
            }
        };
    }
    render() {
        const TagType = isWeb() ? 'yoo-ion-content' : 'div';
        return (this.properties &&
            h(TagType, { class: "outer-container" }, this.properties.map((property) => this.renderProperty(property))));
    }
    static get is() { return "yoo-property-card"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "extraClass": {
            "type": String,
            "attr": "extra-class"
        },
        "host": {
            "elementRef": true
        },
        "properties": {
            "type": "Any",
            "attr": "properties"
        }
    }; }
    static get style() { return ":host {\n  --padding-outer-container: 1rem;\n  --list-padding: 1.25rem 0.625rem 1.25rem 0.625rem;\n  --list-row-height: 38px; }\n\n:host .outer-container {\n  padding: var(--padding-outer-container); }\n  :host .outer-container .details:first-child .details-title {\n    margin-top: 0; }\n  :host .outer-container .details {\n    width: 100%; }\n    :host .outer-container .details .details-title {\n      margin-top: var(--padding-15, 0.9375rem);\n      padding-bottom: 1rem;\n      font-size: var(--font-m, 15px);\n      letter-spacing: 1px;\n      line-height: 1.0625rem;\n      text-align: center;\n      text-transform: uppercase; }\n    :host .outer-container .details .title-rows {\n      padding-bottom: 1.25rem; }\n  :host .outer-container .p-type-columns {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n    :host .outer-container .p-type-columns .p-column {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      width: 38%;\n      height: 6.3125rem;\n      margin-bottom: var(--padding-15, 0.9375rem);\n      padding: 0.75rem 5% 0.9375rem 5%;\n      border-radius: 8px;\n      background-color: var(--light, #FFFFFF);\n      -webkit-box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07));\n      box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07));\n      overflow: hidden; }\n      :host .outer-container .p-type-columns .p-column .top {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        width: 100%; }\n        :host .outer-container .p-type-columns .p-column .top .delta {\n          -ms-flex-item-align: end;\n          align-self: flex-end;\n          font-size: 14px; }\n          :host .outer-container .p-type-columns .p-column .top .delta yoo-icon {\n            margin-right: 0.3125rem; }\n            :host .outer-container .p-type-columns .p-column .top .delta yoo-icon.yo-no-data {\n              height: 1rem;\n              font-size: 1.875rem; }\n            :host .outer-container .p-type-columns .p-column .top .delta yoo-icon.yo-big-arrow-up, :host .outer-container .p-type-columns .p-column .top .delta yoo-icon.yo-big-arrow-down {\n              font-size: 0.5rem; }\n          :host .outer-container .p-type-columns .p-column .top .delta .chat-container {\n            -ms-flex-item-align: end;\n            align-self: flex-end;\n            margin-top: 0.5rem; }\n            :host .outer-container .p-type-columns .p-column .top .delta .chat-container.yo-chart-up, :host .outer-container .p-type-columns .p-column .top .delta .chat-container.yo-chart-down {\n              font-size: 3.125rem;\n              line-height: 0.625rem; }\n      :host .outer-container .p-type-columns .p-column .bottom {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column; }\n        :host .outer-container .p-type-columns .p-column .bottom .title {\n          width: 100%;\n          height: 1.0625rem;\n          color: var(--stable, #adadad);\n          font-size: var(--font-m, 15px);\n          font-weight: 300;\n          letter-spacing: 1.1px;\n          white-space: nowrap; }\n        :host .outer-container .p-type-columns .p-column .bottom .number {\n          width: 100%;\n          font-size: var(--font-l, 17px);\n          line-height: 1.8125rem; }\n  :host .outer-container .p-type-rows {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    padding: 1.3125rem 1.25rem 0.8125rem 1.25rem;\n    border-radius: 0.5rem;\n    background-color: var(--light, #FFFFFF);\n    -webkit-box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07));\n    box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07)); }\n    :host .outer-container .p-type-rows .p-row {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      height: 3.5625rem;\n      padding-top: var(--padding-10, 0.625rem);\n      padding-bottom: 0.5625rem;\n      border-bottom: solid 1px var(--stable-light, #f1f1f1);\n      font-size: var(--padding-15, 0.9375rem); }\n      :host .outer-container .p-type-rows .p-row .title {\n        width: 100%;\n        font-weight: 600;\n        line-height: 1.125rem; }\n      :host .outer-container .p-type-rows .p-row .number {\n        line-height: 1.125rem; }\n      :host .outer-container .p-type-rows .p-row .delta {\n        -ms-flex-item-align: end;\n        align-self: end;\n        line-height: 1.125rem; }\n    :host .outer-container .p-type-rows .p-row:last-child {\n      margin-bottom: 0;\n      border: none; }\n  :host .outer-container .p-type-grid {\n    margin: auto;\n    margin-top: 3px;\n    padding: 1.3125rem 1.25rem 0.8125rem 1.25rem;\n    border-radius: 0.5rem;\n    background-color: var(--light, #FFFFFF);\n    -webkit-box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07));\n    box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07)); }\n    :host .outer-container .p-type-grid .p-type-grid-scroll-container {\n      width: 100%;\n      height: 100%; }\n      :host .outer-container .p-type-grid .p-type-grid-scroll-container .inner-container .p-row {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        margin-bottom: var(--padding-15, 0.9375rem); }\n        :host .outer-container .p-type-grid .p-type-grid-scroll-container .inner-container .p-row span {\n          width: 5.4375rem;\n          font-size: var(--font-m, 15px);\n          line-height: 1.0625rem; }\n        :host .outer-container .p-type-grid .p-type-grid-scroll-container .inner-container .p-row:not(.header) {\n          color: var(--stable, #adadad); }\n        :host .outer-container .p-type-grid .p-type-grid-scroll-container .inner-container .p-row > div {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap; }\n        :host .outer-container .p-type-grid .p-type-grid-scroll-container .inner-container .p-row.header > span {\n          overflow: hidden;\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          width: 4.375rem;\n          margin-right: 1.0625rem;\n          text-transform: uppercase; }\n  :host .outer-container .p-type-chart chart-high {\n    height: 18.75rem; }\n\n:host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  text-align: left; }\n  :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column {\n    padding-right: var(--padding-15, 0.9375rem); }\n    :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column .p-column-header,\n    :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column .p-column-item {\n      height: var(--list-row-height);\n      padding: 0.25rem 1rem;\n      white-space: nowrap; }\n    :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column .p-column-item {\n      white-space: nowrap; }\n      :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column .p-column-item.assertive, :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column .p-column-item.danger {\n        color: var(--danger, #ff625f); }\n      :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column .p-column-item.dark, :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column .p-column-item.black {\n        color: var(--black, #000000); }\n      :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column .p-column-item.balanced, :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container .p-column .p-column-item.success {\n        color: var(--success, #04CC99); }\n  :host(.kpi) .outer-container .details .p-type-grid .p-type-grid-scroll-container .inner-container.header > span {\n    margin-right: 0; }\n\n:host(.framed) .outer-container {\n  display: block;\n  margin: 1rem;\n  padding: 1rem;\n  border-radius: 5px;\n  -webkit-box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07));\n  box-shadow: var(--grid-frame-shadow, 0 5px 15px 3px rgba(40, 47, 54, 0.07)); }\n\n:host(.web) .outer-container yoo-ion-scroll {\n  padding: var(--padding-20, 1.25rem); }\n  :host(.web) .outer-container yoo-ion-scroll .details .p-type-columns .p-column {\n    width: 46%;\n    height: 6.5625rem;\n    margin: 0 var(--padding-5, 0.3125rem) var(--padding-10, 0.625rem) var(--padding-5, 0.3125rem);\n    padding: 0; }\n    :host(.web) .outer-container yoo-ion-scroll .details .p-type-columns .p-column .bottom {\n      padding: 0 0 var(--padding-10, 0.625rem) var(--padding-15, 0.9375rem); }\n      :host(.web) .outer-container yoo-ion-scroll .details .p-type-columns .p-column .bottom .title {\n        overflow: hidden; }\n    :host(.web) .outer-container yoo-ion-scroll .details .p-type-columns .p-column .top {\n      padding-left: var(--padding-15, 0.9375rem); }"; }
}

export { YooCameraPreviewDialogComponent as YooCameraPreviewDialog, YooFormCaptureComponent as YooFormCapture, YooFormCaptureTagDialogComponent as YooFormCaptureTagDialog, YooFormCaptureViewDialogComponent as YooFormCaptureViewDialog, YooPropertyCardComponent as YooPropertyCard };
