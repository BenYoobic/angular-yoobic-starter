import '../../../stencil.core';
/// <reference path="../../../../../../../types/scandit/index.d.ts" />
import { EventEmitter } from '../../../stencil.core';
import { IFormBarcodeOcrRegex } from '../../../interfaces';
import { BarcodePicker } from 'scandit-sdk';
export declare class YooScanditComponent {
    scanMode: 'default' | 'batch' | 'ocr';
    currentOcrRegex: IFormBarcodeOcrRegex;
    scannedSuccess: EventEmitter<any>;
    isScannerInit: boolean;
    isScanditSupported: boolean;
    host: HTMLStencilElement;
    protected barcodePickerCordovaRef: Scandit.BarcodePicker;
    protected barcodePickerWebEl: HTMLElement;
    protected barcodePickerWeb: BarcodePicker;
    protected previousReference: string;
    pauseScanning(): void;
    cleanUpScandit(): void;
    restartOcrScanner(): void;
    componentWillLoad(): any;
    componentDidLoad(): void;
    componentDidUnload(): void;
    isScanMode(compareMode: string): boolean;
    onHasResult(result: any): void;
    onHasError(error: any): void;
    onOcrScanSuccess(result: any): void;
    onSingleScanSuccess(result: any): void;
    onInitBarCodePickerForWeb(): void;
    onInitBarCodePickerForCordova(): void;
    onInitSingleScannerCordova(): void;
    onInitOcrScannerCordova(): void;
    initScannerBasedOnModeCordova(): void;
    renderSideElement(): JSX.Element;
    renderScannerCamera(): JSX.Element;
    renderWebOverlay(): JSX.Element;
    renderScannerContent(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
