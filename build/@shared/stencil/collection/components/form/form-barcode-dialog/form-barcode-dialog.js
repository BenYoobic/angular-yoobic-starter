import { translate, closeModal, getAppContext, isCordova, isIOS, enableKeyboardResize, dateParse } from '../../../utils';
export class YooFormBarcodeDialogComponent {
    constructor() {
        this.mainMode = 'default';
        this.ocrRegexes = [{
                _id: 'regex0',
                title: 'dd-mm-yyyy',
                parsingPattern: 'dd-MM-yyyy',
                regex: '(([0-2][0-9])|(3[0-1]))-((0[1-9])|(1[0-2]))-[0-9]{4}'
            },
            {
                _id: 'regex1',
                title: 'dd.mm.yy',
                parsingPattern: 'dd.MM.yy',
                regex: '(([0-2][0-9])|(3[0-1]))([.])((0[1-9])|(1[0-2]))([.])[0-9]{2}'
            }, {
                _id: 'regex2',
                title: 'dd.mm.yyyy',
                parsingPattern: 'dd.MM.yyyy',
                regex: '(([0-2][0-9])|(3[0-1]))([.])((0[1-9])|(1[0-2]))([.])[0-9]{4}'
            }, {
                _id: 'regex3',
                title: 'dd/mm/yy',
                parsingPattern: 'dd/MM/yy',
                regex: '(([0-2][0-9])|(3[0-1]))([/])((0[1-9])|(1[0-2]))([/])[0-9]{2}'
            }, {
                _id: 'regex4',
                title: 'dd/mm',
                parsingPattern: 'dd/MM',
                regex: '(([0-2][0-9])|(3[0-1]))([/])((0[1-9])|(1[0-2]))'
            }, {
                _id: 'regex5',
                title: 'dd.mm',
                parsingPattern: 'dd.MM',
                regex: '(([0-2][0-9])|(3[0-1]))([.])((0[1-9])|(1[0-2]))'
            }, {
                _id: 'regex6',
                title: 'mmm yy',
                parsingPattern: 'MMM yy',
                regex: '([A-Z]{3} [0-2][0-9])'
            }, {
                _id: 'regex7',
                title: 'yyyy',
                parsingPattern: 'yyyy',
                regex: '[0-9]{4}'
            }];
        this.supportMode = [];
    }
    close() {
        this.onCancel();
    }
    restartOcrScanner() {
        if (this.scandit) {
            this.scandit.restartOcrScanner();
        }
    }
    componentWillLoad() {
        this.onInitMainMode();
    }
    componentDidLoad() {
        this.textManualInput = this.value;
        if (isCordova() && isIOS() && this.enableKeyboardResizing) {
            enableKeyboardResize(Keyboard);
        }
    }
    onCancel() {
        if (this.scandit) {
            this.scandit.cleanUpScandit();
        }
        closeModal(null);
    }
    onInitMainMode() {
        this.supportMode = [];
        if (this.mainMode === 'default' || this.mainMode === 'batch') {
            this.supportMode.push(this.onCreateModeObj('default', 'yo-camera', 'CAMERA'));
        }
        if (this.mainMode === 'ocr') {
            this.supportMode.push(this.onCreateModeObj('ocr', 'yo-camera', 'OCR'));
            this.selectedOcrRegex = this.ocrRegexes[0];
        }
        this.supportMode.push(this.onCreateModeObj('keyboard', 'yo-keyboard', 'KEYBOARD'));
        this.inputMode = this.supportMode[0].mode;
    }
    onCreateModeObj(mode, icon, text) {
        return { mode, icon, text };
    }
    isMode(compareMode) {
        return this.inputMode === compareMode;
    }
    onSelectMode(mode, initialSelect = false) {
        if (this.inputMode !== mode || initialSelect) {
            this.inputMode = mode;
        }
    }
    onInputChanged(ev) {
        this.textManualInput = ev.detail;
    }
    onScannedSuccess(ev) {
        if (ev && ev.stopPropagation) {
            ev.stopPropagation();
        }
        let data = ev.detail ? ev.detail : ev;
        if (this.mainMode !== 'batch') {
            if (this.mainMode === 'ocr' && this.hasRegexPattern(this.selectedOcrRegex)) {
                try {
                    let pattern = this.selectedOcrRegex.parsingPattern;
                    data = dateParse(ev.detail, pattern, new Date()).toISOString();
                }
                catch (_a) {
                    data = new Date().toISOString();
                }
            }
        }
        this.scannedSuccess.emit(data);
        if (this.scandit) {
            this.scandit.cleanUpScandit();
        }
    }
    onRegexInputFocued() {
        if (this.scandit) {
            this.scandit.cleanUpScandit();
        }
    }
    hasRegexPattern(regex) {
        return regex && regex.parsingPattern;
    }
    onChangeOcrRegex(regex) {
        this.selectedOcrRegex = regex;
    }
    onSave() {
        this.scannedSuccess.emit(this.textManualInput);
        if (this.mainMode !== 'batch') {
            closeModal(this.textManualInput);
        }
    }
    renderHeaderTitle() {
        return [
            h("div", { class: "title-container" },
                h("yoo-ion-button", { class: "close", onClick: () => this.onCancel() },
                    h("yoo-icon", { slot: "icon-only", class: "yo-close" })),
                h("yoo-ion-title", null, translate('SCAN')))
        ];
    }
    renderHeaderTab() {
        return [
            h("div", { class: "tab-container" }, this.supportMode.map(tab => {
                return [
                    h("div", { class: {
                            'tab-item': true,
                            'active': this.isMode(tab.mode)
                        }, onClick: () => { this.onSelectMode(tab.mode); } },
                        h("yoo-icon", { class: tab.icon }),
                        h("div", { class: "icon-text" }, translate(tab.text)))
                ];
            }))
        ];
    }
    renderTags() {
        if (this.mainMode === 'ocr') {
            return h("div", { class: "tags" },
                h("yoo-ion-scroll", { class: "horizontal" }, this.ocrRegexes ? this.ocrRegexes.map(ocrRegex => {
                    return [h("yoo-badge", { onClick: ev => this.onChangeOcrRegex(ocrRegex), class: { 'small round': true, 'success': this.selectedOcrRegex === ocrRegex, 'stable': this.selectedOcrRegex !== ocrRegex }, text: ocrRegex.title }),
                        h("div", { class: "button-spacer" })
                    ];
                }) : null));
        }
    }
    renderRegexSelector() {
        return [
            h("div", { class: "regex-container" },
                h("yoo-form-autocomplete", { placeholder: translate('SELECTDATEFORMAT'), values: this.ocrRegexes, value: this.selectedOcrRegex, iconPrefix: "yo-barcode", entityType: 'regex', displayType: 'card-list', onInputChanged: (ev) => this.onChangeOcrRegex(ev.detail), onInputFocused: () => this.onRegexInputFocued(), class: "ocr-data-input" }))
        ];
    }
    renderHeader() {
        return [
            h("div", { class: {
                    'header-container': true,
                    'ocr-mode': this.mainMode === 'ocr'
                } },
                this.renderHeaderTitle(),
                this.renderHeaderTab(),
                this.mainMode === 'ocr' && this.inputMode !== 'keyboard' && this.renderRegexSelector())
        ];
    }
    renderKeyboardContent() {
        return [
            h("yoo-ion-content", { scrollEnabled: false, class: {
                    'input-container bg-light': true
                } },
                h("div", { class: "input-inner-container" },
                    h("div", { class: "content-code" }, !this.textManualInput ? h("yoo-img", { src: "./assets/empty-states/barcodelong.svg" }) : h("yoo-barcode", { value: this.textManualInput })),
                    h("div", { class: "content-numbers" },
                        h("yoo-form-input", { onInputChanged: (ev) => this.onInputChanged(ev), value: this.textManualInput }))),
                h("div", { class: "bottom-toolbar" },
                    h("div", { class: "action", onClick: () => { this.onSave(); } }, translate('DONE'))))
        ];
    }
    renderScannerContent() {
        return [
            h("div", { class: {
                    'scanner-container': true
                } }, (this.isMode('default') || this.isMode('ocr')) &&
                h("yoo-scandit", { ref: el => this.scandit = el, currentOcrRegex: this.selectedOcrRegex, scanMode: this.mainMode, onScannedSuccess: (ev) => this.onScannedSuccess(ev) }))
        ];
    }
    renderBody() {
        return [
            this.renderScannerContent(),
            this.isMode('keyboard') && this.renderKeyboardContent()
        ];
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext(true))
        };
    }
    render() {
        return [
            this.renderHeader(),
            this.renderBody()
        ];
    }
    static get is() { return "yoo-form-barcode-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "close": {
            "method": true
        },
        "enableKeyboardResizing": {
            "type": Boolean,
            "attr": "enable-keyboard-resizing"
        },
        "fnBarcodeResult": {
            "type": "Any",
            "attr": "fn-barcode-result",
            "mutable": true
        },
        "fnOcrResult": {
            "type": "Any",
            "attr": "fn-ocr-result",
            "mutable": true
        },
        "host": {
            "elementRef": true
        },
        "inputMode": {
            "state": true
        },
        "mainMode": {
            "type": String,
            "attr": "main-mode",
            "mutable": true
        },
        "ocrRegexes": {
            "type": "Any",
            "attr": "ocr-regexes"
        },
        "restartOcrScanner": {
            "method": true
        },
        "selectedOcrRegex": {
            "state": true
        },
        "textManualInput": {
            "state": true
        },
        "value": {
            "type": String,
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "scannedSuccess",
            "method": "scannedSuccess",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-barcode-dialog:**/"; }
}
