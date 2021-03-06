import { Session, User } from '@shared/data-core';
import { Log, CoreConfig } from '@shared/common';
import { VxtConferenceConfig, WebRTCConstraints, ScreenShareOptions } from '../../interfaces/voxeet/voxeet.interface';
import { Translate } from '@shared/translate';
import { Pubnub } from '../pubnub/pubnub.service';
export declare class VideoCall {
    protected session: Session;
    protected log: Log;
    protected coreConfig: CoreConfig;
    protected pubnub: Pubnub;
    protected translate: Translate;
    protected isInit: boolean;
    private voxeet;
    private voxeetUserId;
    private userInfo;
    private videoModal;
    private videoToast;
    private constraints;
    constructor(session: Session, log: Log, coreConfig: CoreConfig, pubnub: Pubnub, translate: Translate);
    useCordova(): any;
    init(): Promise<void>;
    onInitUserInfo(): void;
    convertUserInfo(user?: User): {
        name: string;
        externalId: string;
        avatarUrl: string;
    };
    onInitCordova(): void;
    onInitWeb(): void;
    getUserInfo(): any;
    createConference(alias: string): any;
    joinConference(conf: any, options?: VxtConferenceConfig): any;
    hasWebCam(): Promise<boolean>;
    hasMicrophone(): Promise<boolean>;
    getConstraint(): {
        video: any;
        audio: any;
    };
    inviteParticipants(conferenceId: string, externalIds: Array<User>): void;
    leaveConference(leaveRoom?: boolean): any;
    addListener(event: string, handler: Function): void;
    removeListener(event: string, handler: Function): void;
    removeAllListeners(): Promise<any>;
    getUserId(): string;
    startVideo(userId?: string, constraints?: WebRTCConstraints): any;
    stopVideo(userId?: string): any;
    startAudio(userId?: string): any;
    stopAudio(userId?: string): any;
    muteUser(isMuted: boolean, userId?: string): void;
    toggleMute(userId?: string): any;
    setUserPosition(userId: string, x: number, y: number): any;
    getCurrentSession(): any;
    getEnumerateAudioDevices(option?: string): Promise<any>;
    getEnumerateVideoDevices(): Promise<any>;
    selectAudioInput(deviceId: string, constraints?: {}): Promise<any>;
    selectAudioOutput(deviceId: string, constraints?: {}): Promise<any>;
    selectVideoInput(deviceId: string, constraints?: {}): Promise<any>;
    startVideoForUser(userId: string, constraints?: {}): Promise<any>;
    stopVideoForUser(userId: string, constraints?: {}): Promise<any>;
    startAudioForUser(userId: string, constraints?: {}): Promise<any>;
    stopAudioForUser(userId: string, constraints?: {}): Promise<any>;
    startScreenShare(options: Array<ScreenShareOptions>): Promise<any>;
    stopScreenShare(): Promise<any>;
    startRecording(): Promise<any>;
    stopRecording(): Promise<any>;
    replayRecording(conferenceId: string, offset?: any): Promise<any>;
    shareVideo(url: string): Promise<any>;
    updateMediaSettings(settings: {
        microphone: MediaDeviceInfo;
        video: MediaDeviceInfo;
    }): Array<Promise<any>>;
    sendChatMessage(users: Array<User>, roomName: string, conferenceId: string): void;
    disconnect(): void;
    reconnect(): void;
    sendRecordedConferenceId(currentMessage: string, channel: any): void;
    showNoWebCamAlert(): void;
    showFailedConnectAlert(): void;
    showCallerLeftAlert(): Promise<any>;
    showRecieverLeft(): Promise<any>;
    showRecordCompleteAlert(): Promise<any>;
    setVideoToast(toast: HTMLYooToastElement): void;
    setVideoModal(modal: HTMLYooIonModalElement): void;
    closeVideoModal(): void;
    dismissVideoToast(): void;
    onSendDeclineMessage(data: any): void;
    onSendCancelNotificationMessage(users: Array<User>, conferenceId: string): void;
    onReceiveDeclineMessage(data: any): void;
}
