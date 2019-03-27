import '../../../stencil.core';
import { IEntityAction, IParticipant, IUser } from '../../../interfaces';
export declare class YooCardMediaComponent {
    /**
     *  List of action and its handler
     */
    bottomActions?: Array<IEntityAction>;
    /**
     *  List of extra action and its handler
     */
    extraActions?: Array<IEntityAction>;
    /**
     *  Card media require participant which contains userInfo and media stream
     */
    participant: IParticipant;
    /**
     *  state for showing the placehodler/modal when video feed is not presented
     */
    showEmptyPlaceholder: boolean;
    /**
     *  state for showing the redial button
     */
    showRedialButton: boolean;
    host: HTMLStencilElement;
    /**
     * Container div for video element and status bar
     */
    trackDiv: HTMLElement;
    /**
     * Reference to the video element
     */
    videoRef: HTMLElement;
    /**
     * Width of the video element
     */
    videoWidth: string;
    /**
     * Height of the video element
     */
    videoHeight: string;
    componentDidLoad(): void;
    onParticipantUpdates(): void;
    hasVideoStream(): boolean;
    hasAudioStream(): boolean;
    isLocalParticipant(): boolean;
    isMobile(): boolean;
    isConnecting(): boolean;
    onUpdateVideoCard(): void;
    getStream(): MediaStream;
    onActionClicked(action: IEntityAction): void;
    getParticipantName(): string;
    getUser(): IUser;
    renderConnectingPlaceholder(): JSX.Element;
    renderAvatarPlaceholder(): JSX.Element;
    renderPlaceholder(): JSX.Element;
    renderBottomStatus(): JSX.Element;
    renderAction(action: IEntityAction): JSX.Element;
    renderRedial(): JSX.Element;
    renderBody(): JSX.Element;
    render(): JSX.Element;
}
