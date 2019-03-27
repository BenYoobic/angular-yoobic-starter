import { VxtParticipant, VxtUserInfoLight } from './user-info.model';
import { WebRTCConstraints } from './web-rtc.model';
export interface Conference {
    /**
     * Id of the conference
     */
    id?: string;
    /**
     * Alias of the conference
     */
    alias?: string;
    /**
     * true if the conference is live
     */
    isLive?: boolean;
    /**
     * Type of the conference
     */
    type?: string;
    /**
     * Status of the conference recording
     */
    recordingStatus?: 'NOT_RECORDING' | 'RECORDING';
    user?: {
        /**
         * Voxeet id of the current user
         */
        id?: string;
        /**
         * Name of the current user
         */
        name?: string;
        /**
         * External id of the current user
         */
        externalId?: string;
        /**
         * true if the current user joined the conference
         */
        joined?: boolean;
        /**
         * true if the microphone is turned on
         */
        audio?: 'on' | 'off' | 'none' | 'blocked' | 'unsupported';
        /**
         * true if the camera is turned on
         */
        video?: 'on' | 'off' | 'none' | 'blocked' | 'unsupported';
        /**
         * true if the screen sharing is turned on
         */
        screenShare?: boolean;
    };
    /**
     * List of current participants in the conference
     */
    participants?: VxtParticipant[];
    /**
     * List of user invited to (or currently) in the conference
     */
    candidates?: VxtParticipant[];
    metadata?: {
        currentLanguage: string;
        liveRecording: boolean;
        maxDuration: number;
        mode: VxtConferenceMode;
        multiSession: boolean;
        rtcpMode: RtcpMode;
        stats: boolean;
        ttl: number;
        videoCodec: VideoCodec;
    };
}
export interface VxtConference {
    candidates?: {
        [key: string]: any;
    }[];
    conferenceAlias?: string;
    conferenceId?: string;
    conferencePincode?: string;
    conferenceType?: 'SDK_CONF';
    isNew?: boolean;
    description?: {
        [key: string]: any;
    };
    type?: string;
    metadata?: {
        [key: string]: any;
    };
    currentLanguage?: string;
    liveRecording?: boolean;
    maxDuration?: number;
    mode?: VxtConferenceMode;
    multiSession?: string;
    rtcpMode?: RtcpMode;
    stats?: string;
    ttl?: number;
    videoCodec?: VideoCodec;
    participants?: {
        [key: string]: any;
    }[];
    pincode?: string;
    quality?: string;
    recordingStatus?: string;
    recordingUser?: null;
    startRecordTimestamp?: number;
}
export declare interface VxtConferenceConfig {
    /**
     * WebRTC audio and video contraints.
     */
    constraints?: WebRTCConstraints;
    /**
     * Activate (true) or deactivate (false) 3D audio (default true).
     */
    audio3D?: boolean;
    /**
     * User options (default {}).
     */
    user?: VxtUserInfoLight;
    /**
     * The other conference options
     */
    conference?: VxtConferenceLightOptions;
}
export declare interface VxtConferenceListenerOptions {
    /**
     * User options (default {}).
     */
    user?: VxtUserInfoLight;
}
export declare interface VxtConferenceLightOptions {
    /**
     * An alias for the conference or empty (default "")
     */
    alias?: string;
    /**
     * Parameters for the conference (default {}).
     */
    params?: {
        /**
         * The conference time-to-live, in seconds (default 0)
         */
        ttl?: number;
        /**
         * The conference real-time communication (RTC) mode for quality control (default worst).
         */
        rtcpMode?: RtcpMode;
        /**
         * The conference mode (default standard).
         */
        mode?: VxtConferenceMode;
        /**
         * The conference video codec (default "vp8")
         */
        videoCodec?: VideoCodec;
        /**
         * Allows to mix the conference in realtime when calling startRecording (default false)
         */
        liveRecording?: boolean;
    };
}
export declare type VideoCodec = 'vp8' | 'h264';
export declare type RtcpMode = 'best' | 'worst';
export declare type VxtConferenceMode = 'push' | 'standard';
