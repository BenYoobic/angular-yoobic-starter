import { isCordova, getAppContext, translate, showAlert } from '../../../utils';
import ScanditSDKWeb from 'scandit-sdk/build/browser';
const SCANDIT_KEY_WEB = 'AdUcQCAfPcDNJN3lljyPTyI/AtdVI/XfV0/rZPVr16vYJeJEsTqhfIA1hoNuYc5SeCbtu8hIKrZdEVaTOlvP+ulg9oqFFCezMV9AB8ooO/azf3IFtVe2yvp1CxqjTmLzfxNmBWkrSb97AUuGxa4YrSy3tRZyS/fAJvUVMwdSCcanVu8tgH+24Br6USnlHBTenQfNVFC/nHiQ+9qFz3uAyC/VcPU9GbIBaTOizpTdrCUyUvjt/XM/unEjFIL/GDE5zizsiIj7zwvcDpKvIG/FSjuNJpBmxTkTBqGTMh8/yyEusuUcRjwC4bZyWFhJ0Sr2++ZSQeCYPnZ7PXrlaxlfHYsD8+FmyADDIOePjJy5qx7Voax5kYfm9U9dgHsrzoBmWdVEc6BTFXr9yELjPEqo5yi2KX7DiI2xvaQk7uAA9lF9x9O54iDPVM7pt7tAGFJG1fQbxPHozeaYsJvID5G1ehLTkl7Rbn81R3eTD0hHm7djq9oEbrfDfNT/ByPd3W6dsK8KwVFNV2LVdc62MnIj1yosA+m2zlLpAyak5lRA50RugVJoWlYk3bL/jkNaGzpxlkMeWnRcJ3Bxjj27nry8IlPAjECUBg+pErrqldFbA64v7J1CFrJRTPGdDjavBWzDI3Jo0/nkrC4MAsI0djCmUAUmG24H8O+FZx0+JRkm8U3zDD0FUYPCrQOZ4KAZDQZlOfs7lPDGdkn5IAbt62un641Vl0PbKCaqNmT6mXR4mNnaRXpxGk+Pk3kAokup/jqEAtz6xT4NQkzWSuHz1vKN4QRg5g9BezKdZwn6Iyihj4OxjOcN2NrIxUz4Mw==';
const SCANDIT_KEY_MOBILE = 'Ace8ayQfOR2wL4B3nAG1l9IgknlWGPYBPlUyU/xWjgr+K/ThFm9mjDAfBlymFna3K3IpbdYAXpz4ZaPrGnUnnR8UFbLkXHOdsB7FkZct266nE7X7Ijl7G5I5AnKMByxOijMVqiEGFCq3N/eO0q+urPsxwE4VRrhKZQ5uES/YQU1TCYaT//q7je74OUZemIHUmRaTYGJEwJfNdoWw0HohI6uvk1EsI/QO/d8Szk5kEw0keaGDuCmr3DKfWM4WEaHbUadImcuNnmQabmpujoWOyjwHh5qLOMlWnqlgbEiygLGYGljYOybPZDr/Leu6HwSr/Egxa61quxex7M9kDmOqbI2EHFBCpzG43as0FhrRVfwu/+GJYw+cKimwMdprjFpGb7hl9C2a73UhmEEep+FMNB3bk7rl+zfGB2MCoPeeMG3LA2yFObj5wCxf9nv0mEn5ialsZVlbYOxZSL4aV6S59nkvAcV5jkGk1jlV9IdvolqSX+3QLdbESfTdP6Zes1k1usRLfiUW7zalUN9RvzWhRP3za/A196NfNEaClUwMuBL8CNvsaNM7oMlP6B9HKaNTyRB5g0SoKmH//bZpY5EaTDN8IicvWpsd5s4d8hKqNxN27wLVZitbSvu+qRDclxLuRY9zg/4vd4pDJE+AgfuvOR779GgJj3py6SOwx5MR2KyPNzY4wDbQCDv5exEwMYI1N0P7Gjxr00nQ/bzrYJg0ntEXf09mwQL1l1oBKhX8efgnZfReatjFrxHGzmJvMPMgmD2PO6szZT/yDFaof3XJgTpz6NYs0dPn0N+Rb+7JNA==';
const ENABLED_SYMBOLOGIES = [
    ScanditSDKWeb.Barcode.Symbology.EAN8,
    ScanditSDKWeb.Barcode.Symbology.EAN13,
    ScanditSDKWeb.Barcode.Symbology.UPCA,
    ScanditSDKWeb.Barcode.Symbology.UPCE,
    ScanditSDKWeb.Barcode.Symbology.CODE128,
    ScanditSDKWeb.Barcode.Symbology.CODE39,
    ScanditSDKWeb.Barcode.Symbology.CODE93,
    ScanditSDKWeb.Barcode.Symbology.INTERLEAVED_2_OF_5
];
export class YooScanditComponent {
    constructor() {
        this.scanMode = 'default';
        this.isScanditSupported = true;
    }
    pauseScanning() {
        if (this.barcodePickerWeb) {
            this.barcodePickerWeb.pauseScanning();
        }
        if (this.barcodePickerCordovaRef) {
            this.barcodePickerCordovaRef.pauseScanning();
        }
    }
    cleanUpScandit() {
        if (this.barcodePickerWeb) {
            this.barcodePickerWeb.destroy();
            this.barcodePickerWeb = null;
        }
        if (this.barcodePickerCordovaRef) {
            this.barcodePickerCordovaRef.cancel();
            this.barcodePickerCordovaRef = null;
        }
    }
    restartOcrScanner() {
        if (isCordova()) {
            this.cleanUpScandit();
            setTimeout(() => {
                this.onInitOcrScannerCordova();
            }, 300);
        }
    }
    componentWillLoad() {
        if (!isCordova()) {
            return ScanditSDKWeb.configure(SCANDIT_KEY_WEB, {
                engineLocation: 'assets/scandit'
            }).then(() => { }, (err) => {
                if (err && err.name && err.name === 'UnsupportedBrowserError') {
                    this.isScanditSupported = false;
                }
            });
        }
        else if (window['Scandit']) {
            Scandit.License.setAppKey(SCANDIT_KEY_MOBILE);
        }
    }
    componentDidLoad() {
        if (isCordova()) {
            setTimeout(() => {
                this.onInitBarCodePickerForCordova();
            }, 300);
        }
        else {
            if (this.isScanditSupported) {
                this.onInitBarCodePickerForWeb();
            }
            else {
                setTimeout(() => {
                    showAlert('', [translate('OK')], '', translate('SCANDITNOTSUPPORTED'));
                }, 1000);
            }
        }
    }
    componentDidUnload() {
        this.cleanUpScandit();
    }
    isScanMode(compareMode) {
        return this.scanMode === compareMode;
    }
    onHasResult(result) {
        if (this.isScanMode('default') || this.isScanMode('batch')) {
            this.onSingleScanSuccess(result);
        }
        else if (this.isScanMode('ocr')) {
            this.onOcrScanSuccess(result);
        }
    }
    onHasError(error) {
    }
    onOcrScanSuccess(result) {
        if (this.barcodePickerCordovaRef) {
            this.barcodePickerCordovaRef.stopScanning();
        }
        if (result && result.text) {
            this.scannedSuccess.emit(result.text);
        }
    }
    onSingleScanSuccess(result) {
        let reference;
        if (result && result.allRecognizedCodes && result.allRecognizedCodes[0] && result.allRecognizedCodes[0].data) {
            reference = result.allRecognizedCodes[0].data;
        }
        else if (result && result.barcodes && result.barcodes[0] && result.barcodes[0].data) {
            reference = result.barcodes[0].data;
        }
        else if (result && result.newlyRecognizedCodes[0] && result.newlyRecognizedCodes[0].data) {
            reference = result.newlyRecognizedCodes[0].data;
        }
        if (result && result.pauseScanning) {
            result.pauseScanning();
        }
        else {
            this.pauseScanning();
        }
        this.scannedSuccess.emit(reference);
    }
    onInitBarCodePickerForWeb() {
        if (this.barcodePickerWebEl) {
            ScanditSDKWeb.BarcodePicker.create(this.barcodePickerWebEl, {
                playSoundOnScan: true,
                vibrateOnScan: true
            }).then((barcodePicker) => {
                this.barcodePickerWeb = barcodePicker;
                const scanSettings = new ScanditSDKWeb.ScanSettings({
                    enabledSymbologies: ENABLED_SYMBOLOGIES,
                    codeDuplicateFilter: 1000
                });
                this.isScannerInit = true;
                this.barcodePickerWeb.applyScanSettings(scanSettings);
                this.barcodePickerWeb.onScan((scanResult) => {
                    this.onHasResult(scanResult);
                });
            });
        }
    }
    onInitBarCodePickerForCordova() {
        this.initScannerBasedOnModeCordova();
    }
    onInitSingleScannerCordova() {
        let settings = new Scandit.ScanSettings();
        ENABLED_SYMBOLOGIES.forEach(symbol => {
            settings.setSymbologyEnabled(symbol, true);
        });
        this.barcodePickerCordovaRef = new Scandit.BarcodePicker(settings);
        this.barcodePickerCordovaRef.continuousMode = this.isScanMode('batch');
        this.barcodePickerCordovaRef.setMargins(new Scandit.Margins(0, 150, 0, 0), new Scandit.Margins(0, 150, 0, 0), 0);
        this.barcodePickerCordovaRef.getOverlayView().setGuiStyle(Scandit.ScanOverlay.GuiStyle.MATRIXSCAN);
        this.barcodePickerCordovaRef.getOverlayView().setTextRecognitionSwitchVisible(false);
        this.barcodePickerCordovaRef.show((result) => {
            this.onHasResult(result);
        }, null, (error) => {
            this.onHasError(error);
        });
        this.barcodePickerCordovaRef.startScanning();
    }
    onInitOcrScannerCordova() {
        let settings = new Scandit.ScanSettings();
        settings.recognitionMode = Scandit.ScanSettings.RecognitionMode.TEXT;
        settings.textRecognition = new Scandit.TextRecognitionSettings();
        settings.textRecognition.regex = this.currentOcrRegex.regex;
        this.barcodePickerCordovaRef = new Scandit.BarcodePicker(settings);
        this.barcodePickerCordovaRef.continuousMode = false;
        this.barcodePickerCordovaRef.setMargins(new Scandit.Margins(0, 230, 0, 0), new Scandit.Margins(0, 230, 0, 0), 0);
        this.barcodePickerCordovaRef.getOverlayView().setTextRecognitionSwitchVisible(false);
        this.barcodePickerCordovaRef.show({
            didRecognizeText: (ev) => { this.onHasResult(ev); }
        });
        this.barcodePickerCordovaRef.startScanning();
    }
    initScannerBasedOnModeCordova() {
        if (this.isScanMode('default') || this.isScanMode('batch')) {
            this.onInitSingleScannerCordova();
        }
        if (this.isScanMode('ocr')) {
            this.onInitOcrScannerCordova();
        }
    }
    renderSideElement() {
        return [
            h("div", { class: "rect" }),
            h("div", { class: "rect-large" })
        ];
    }
    renderScannerCamera() {
        return [
            h("div", { class: "barcode-picker", ref: el => this.barcodePickerWebEl = el })
        ];
    }
    renderWebOverlay() {
        return [
            h("div", { class: {
                    "scanner-overlay": true,
                    'active': this.isScannerInit
                } },
                h("div", { class: "left-part" }, this.renderSideElement()),
                h("div", { class: "right-part" }, this.renderSideElement()),
                h("div", { class: "bottom-part" }, translate(this.isScanMode('ocr') ? 'SCANADATE' : 'SCANABARCODE')))
        ];
    }
    renderScannerContent() {
        return [
            h("div", { class: {
                    'scanner-container': true
                } },
                this.renderScannerCamera(),
                this.renderWebOverlay())
        ];
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return [
            !isCordova() && this.renderScannerContent()
        ];
    }
    static get is() { return "yoo-scandit"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "cleanUpScandit": {
            "method": true
        },
        "currentOcrRegex": {
            "type": "Any",
            "attr": "current-ocr-regex",
            "watchCallbacks": ["restartOcrScanner"]
        },
        "host": {
            "elementRef": true
        },
        "isScanditSupported": {
            "state": true
        },
        "isScannerInit": {
            "state": true
        },
        "pauseScanning": {
            "method": true
        },
        "restartOcrScanner": {
            "method": true
        },
        "scanMode": {
            "type": String,
            "attr": "scan-mode"
        }
    }; }
    static get events() { return [{
            "name": "scannedSuccess",
            "method": "scannedSuccess",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-scandit:**/"; }
}
