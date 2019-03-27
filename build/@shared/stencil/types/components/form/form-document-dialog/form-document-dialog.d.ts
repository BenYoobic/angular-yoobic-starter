import '../../../stencil.core';
import { IFile } from '../../../interfaces';
export declare class YooFormDocumentModalComponent {
    document: IFile;
    modalTitle: string;
    startTime: any;
    modalMode: boolean;
    isAnimationFinished: boolean;
    previousPlayerState: number;
    type: string;
    isLoading: boolean;
    host: HTMLStencilElement;
    preview: string;
    isVideo: boolean;
    icon: string;
    filename: string;
    private useBox;
    private filePath;
    private isPdf;
    private isChinese;
    private url;
    private currentEndTime;
    private isVideoSetup?;
    private playerElement;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    updateURL(): any;
    updateDocument(): void;
    setDocument(): void;
    onCancel(): Promise<void>;
    getPdfForViewer(): Promise<any>;
    downloadPdfToStorage(): Promise<any>;
    getCachedKeys(directoryUrl: any): string[];
    openBoxLink(url: any): void;
    initBox(): void;
    onPlayerTimeUpdate(ev: any): void;
    onSwipeDown(): void;
    isDocumentDownloadSupported(): boolean;
    showMoreActionSheet(): void;
    renderDocument(): JSX.Element;
    renderBox(): JSX.Element;
    renderHeader(): JSX.Element;
    renderContent(): JSX.Element;
    hostData(): {
        class: {
            [x: string]: any;
            'web': any;
        };
    };
    render(): JSX.Element;
}
