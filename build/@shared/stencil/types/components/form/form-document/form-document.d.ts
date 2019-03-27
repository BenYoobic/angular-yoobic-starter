import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IFormDocument, IFile } from '../../../interfaces';
export declare class YooFormDocumentComponent implements IFormDocument {
    document: IFile;
    type: 'image' | 'document';
    readonly: boolean;
    name: string;
    validity: boolean;
    showDialog: boolean;
    useGallery: boolean;
    validityChanged: EventEmitter<boolean>;
    inputBlurred: EventEmitter<any>;
    inputFocused: EventEmitter<any>;
    inputChanged: EventEmitter<any>;
    galleryOpened: EventEmitter<boolean>;
    host: HTMLStencilElement;
    preview: string;
    isVideo: boolean;
    icon: string;
    filename: string;
    componentWillLoad(): void;
    onShowDocument(ev: any): void;
    updateDocumentInfo(): void;
    renderBase(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
