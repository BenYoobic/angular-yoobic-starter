import { closeModal, isCordova, translate, getAppContext, isAndroid, isSamsung, showModal, moveToImageDirectory, isIOS, rotateBase64Image, isPixelOne, saveBase64AsImageFile, getSession, getPictureMaxSize, isXiaoMi } from '../../../utils';
import { CameraPreview } from '@ionic-native/camera-preview';
import { isArray } from 'lodash-es';
export class YooCameraPreviewDialogComponent {
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
    static get style() { return "/**style-placeholder:yoo-camera-preview-dialog:**/"; }
}
