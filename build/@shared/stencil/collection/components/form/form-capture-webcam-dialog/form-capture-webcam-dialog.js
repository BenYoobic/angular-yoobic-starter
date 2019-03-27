import { closeModal, querySelectorDeep, translate, getConfig } from '../../../utils';
import JpegCamera from 'jpeg-camera-es6';
export class YooFormCaptureWebcamDialogComponent {
    constructor() {
        this.isReady = false;
    }
    //private _jpegCamera = (window as any).JpegCamera || JpegCamera;
    componentDidLoad() {
        this.holderRef = querySelectorDeep(this.host, '#webcamHolder');
        setTimeout(() => { this.initWebcam(); }, 200);
    }
    componentDidUnload() {
        this.cleanUpCamera();
    }
    initWebcam() {
        //this.getJpegCamera().then(() => {
        if (this.webcamCamera) {
            this.webcamCamera.destruct();
        }
        let options = {
            shutterMp3Url: 'assets/audio/shutter.mp3',
            shutterOggUrl: 'assets/audio/shutter.ogg',
            onInit: (webcam) => {
                this.webcamCamera = webcam;
                this.cleanUpCamera();
            },
            onReady: (specs) => { this.isReady = true; this.host.forceUpdate(); },
            onError: (err) => { },
            onDebug: (debug) => { },
            shutter: true,
            mirror: true,
            previewMirror: true
        };
        if (this.device) {
            options.deviceId = this.device.deviceId;
            options.mirror = false;
        }
        if (this.holderRef) {
            JpegCamera(this.holderRef, options);
        }
    }
    cleanUpCamera() {
        if (this.webcamCamera) {
            try {
                if (this.webcamCamera && this.webcamCamera.audio_context && this.webcamCamera.audio_context.state !== 'closed') {
                    this.webcamCamera.audio_context.close();
                }
            }
            catch (err) { }
            try {
                this.webcamCamera.destruct();
            }
            catch (err) { }
        }
    }
    onCancel() {
        this.cleanUpCamera();
        closeModal(null);
    }
    onSave() {
        if (this.webcamCamera && this.isReady) {
            try {
                let snapshot = this.webcamCamera.capture();
                snapshot.getCanvas(canvas => {
                    let canvasData = canvas.toDataURL('image/jpeg', 0.7);
                    if (canvasData && canvasData.length > 10) {
                        closeModal(canvasData);
                    }
                });
            }
            catch (err) { }
        }
    }
    render() {
        if (getConfig().isE2E) {
            this.isReady = true;
        }
        return [
            h("yoo-ion-header", { class: "shadow", "no-border": true },
                h("yoo-ion-toolbar", { color: "light" },
                    h("yoo-ion-buttons", { slot: "start" },
                        h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                            h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                    h("yoo-ion-title", null, translate('ADVANCED')),
                    h("yoo-ion-buttons", { slot: "end" },
                        h("yoo-ion-button", { color: "success", class: "button-clear", disabled: !this.isReady, onClick: () => this.onSave() },
                            " ",
                            translate('SAVE'),
                            " ")))),
            h("yoo-ion-content", { scrollEnabled: false },
                h("div", { id: "webcamHolder" }, "Webcam"))
        ];
    }
    static get is() { return "yoo-form-capture-webcam-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "device": {
            "type": "Any",
            "attr": "device"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-form-capture-webcam-dialog:**/"; }
}
