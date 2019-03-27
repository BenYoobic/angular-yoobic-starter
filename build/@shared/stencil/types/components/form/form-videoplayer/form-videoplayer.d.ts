import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooFormVideoPlayerComponent {
    protected static componentCounter: number;
    protected static hosts: Array<HTMLStencilElement>;
    modalMode: boolean;
    enableModalFullscreen: boolean;
    readonly: boolean;
    fullscreen: boolean;
    isModal: boolean;
    isVisible: boolean;
    hideFullscreen: boolean;
    disableHeader: boolean;
    autoplay: boolean;
    isInsideForm: boolean;
    previousPlayerState?: number;
    type: any;
    playsOnFullscreen: boolean;
    source: string;
    name: string;
    mediaType: string;
    startTime: any;
    disableSeekbar: boolean;
    url: string;
    poster: string;
    fullscreenModal: boolean;
    wrapperHeight: number;
    videoPlayed: boolean;
    inputChanged: EventEmitter<any>;
    playerTimeUpdate: EventEmitter<any>;
    host: HTMLStencilElement;
    player: any;
    hostedPlayerId: string;
    lastUpdatedTime: any;
    protected videoEl: HTMLVideoElement;
    private outerContainerElement;
    private videoControlBarElement;
    private fullscreenContainer;
    private vimeoOverlayEl;
    private playerState;
    private pauseOnStateChanges;
    private hammerCtrl;
    private triggerFullscreenOnPause;
    constructor();
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    updateCurrentTime(time: number): void;
    getCurrentTime(): Promise<number>;
    pauseVideo(): void;
    updateSource(): void;
    updateVisibility(): void;
    onPlayerReady(ev: any): void;
    getYoutubeIFrameAPI(): Promise<any>;
    getVimeoPlayerAPI(): Promise<any>;
    getDailymotionPlayerAPI(): Promise<any>;
    onTimeUpdate(): void;
    openFullscreenModal(): void;
    showMoreActionSheet(): void;
    getVideoId(): string;
    updateURL(): string;
    onVideoPlayerStateChanged(state: number): void;
    renderFullscreenButtonOverlay(): JSX.Element;
    renderBasedOnVideoURL(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}