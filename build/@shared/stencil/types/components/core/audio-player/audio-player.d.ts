import '../../../stencil.core';
export declare class YooAudioPlayerComponent {
    _downloadURL?: string;
    displayMode?: string;
    currentProgressTime: any;
    currentStatus: string;
    host: HTMLStencilElement;
    audioRef: HTMLMediaElement;
    timer: number;
    increment: number;
    progressWrapper: any;
    progressButton: any;
    progressOverlay: any;
    progressBarWidth: any;
    updatedURL: string;
    protected loadedmetadataListener: any;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    onControlClick(): void;
    getInitDuration(): void;
    updateCurrentTime(ev: any): void;
    onPlay(): void;
    shouldShowPlay(): boolean;
    onPause(): void;
    render(): JSX.Element;
}
