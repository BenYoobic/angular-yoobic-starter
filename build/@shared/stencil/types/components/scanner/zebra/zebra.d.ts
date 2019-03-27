import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooZebraComponent {
    appId: string;
    scannedSuccess: EventEmitter<string>;
    host: HTMLStencilElement;
    protected requestResultCodes: any;
    componentDidLoad(): void;
    getAppId(): string;
    onInitZebraScanner(): void;
    render(): JSX.Element;
}
