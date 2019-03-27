export interface PubnubEvent {
    presence?: PresenceEvent;
    message?: MessageEvent;
    status?: StatusEvent;
}
export declare const PN_STATUS_CATEGORIES: {
    up: string;
    down: string;
    issues: string;
    reconnected: string;
    connected: string;
};
export interface PresenceEvent {
    action?: string;
    uuid?: string;
    timestamp?: number;
    occupancy?: number;
    state?: any;
    channel?: string;
    subscription?: string;
    timetoken?: number;
    userMetadata?: any;
    join?: Array<string>;
    timedout?: Array<string>;
    leave?: Array<string>;
    here_now_refresh?: boolean;
}
export interface MessageEvent {
    message?: any;
    channel?: string;
    subscription?: string;
    timetoken?: number;
    userMetadata?: any;
}
export interface StatusEvent {
    error?: boolean;
    statusCode?: number;
    category?: string;
    errorData?: any;
    affectedChannels?: Array<string>;
    affectedChannelGroups?: Array<string>;
}
export interface Listener {
    message?(p: MessageEvent): any;
    presence?(p: PresenceEvent): any;
    status?(p: StatusEvent): any;
}
export interface HistoryArguments {
    channel: string;
    start?: number;
    end?: number;
    includeTimetoken?: boolean;
    reverse?: boolean;
    count?: number;
}
export interface DeleteHistoryArguments {
    channel: string;
    start?: number;
    end?: number;
}
export interface HistoryItem {
    timetoken?: number;
    entry?: any;
}
export interface HistoryResponse {
    messages?: Array<HistoryItem>;
    startTimeToken?: number;
    endTimeToken?: number;
}
export interface LeaveArguments {
    channels: Array<string>;
    channelGroups: Array<string>;
}
export interface HereNowArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
    includeUUIDs?: boolean;
    includeState?: boolean;
}
export declare type ChannelState = any;
export interface GlobalState {
    [channelName: string]: ChannelState;
}
export interface UUIDState<T> {
    uuid: string;
    state: T;
}
export interface ChannelStatus<T> {
    occupants?: Array<T>;
    occupancy: number;
}
export interface HereNowResponse<T> {
    totalChannels?: number;
    totalOccupancy?: number;
    channels?: {
        [channelName: string]: ChannelStatus<T>;
    };
    uuids?: Array<T>;
}
export interface WhereNowArguments {
    uuid?: string;
}
export interface WhereNowResponse {
    channels: Array<string>;
}
export interface SubscribeArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
    withPresence?: boolean;
    timetoken?: number;
}
export interface UnsubscribeArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
}
export interface GetStateArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
    uuid?: string;
}
export interface SetStateArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
    uuid?: string;
    state?: {
        [key: string]: string | number;
    };
}
export interface GetStateResponse {
    channels?: GlobalState;
}
export interface SetStateResponse {
    state?: GlobalState;
}
export interface PublishResponse {
    timetoken: number;
}
export interface PublishArguments {
    message: any;
    channel?: string;
    sendByPost?: boolean;
    storeInHistory?: boolean;
    meta?: any;
}
export interface ProxySetup {
    port: number;
    hostname: string;
    headers: {
        [header: string]: any;
    };
}
export interface PubNubSetup {
    publishKey?: string;
    subscribeKey: string;
    cipherKey?: string;
    origin?: string;
    ssl?: boolean;
    shutdown?: () => any;
    uuid?: string;
    sendBeacon?: (url: string) => any;
    useSendBeacon?: boolean;
    subscribeRequestTimeout?: number;
    transactionalRequestTimeout?: number;
    proxy?: ProxySetup;
    suppressLev?: boolean;
    db?: {
        get: (key: string) => any;
        set: (key: string, data: any) => void;
    };
}
export interface Push {
    addChannels(args: {
        channels: Array<string>;
        device: string;
        pushGateway: string;
    }, cb?: (status: StatusEvent) => any): any;
    removeChannels(args: {
        channels: Array<string>;
        device: string;
        pushGateway: string;
    }, cb?: (status: StatusEvent) => any): any;
    listChannels(args: {
        device: string;
        pushGateway: string;
    }, cb?: (status: StatusEvent, response: {
        channels: Array<string>;
    }) => any): any;
    deleteDevice(args: {
        device: string;
        pushGateway: string;
    }, cb?: (status: StatusEvent) => any): any;
}
export interface IPubNub {
    push: Push;
    setUUID(uuid: string): void;
    getUUID(): string;
    generateUUID(): string;
    setAuthKey(authKey: string): any;
    publish(args: {
        message: any;
        channel?: string;
        sendByPost?: boolean;
        storeInHistory?: boolean;
        meta?: any;
    }, cb?: (r: {
        timetoken: number;
    }) => any): any;
    subscribe(args: {
        channels?: Array<string>;
        channelGroups?: Array<string>;
        withPresence?: boolean;
        timetoken?: number;
    }): any;
    unsubscribe(args: {
        channels?: Array<string>;
        channelGroups?: Array<string>;
    }): any;
    unsubscribeAll(): void;
    addListener(l: Listener): any;
    removeListener(l: Listener): any;
    removeAllListeners(): any;
    hereNow(args: {
        channels?: Array<string>;
        channelGroups?: Array<string>;
        includeUUIDs?: boolean;
    }, cb?: (status: StatusEvent, response: HereNowResponse<string>) => any): any;
    hereNow(args: {
        channels?: Array<string>;
        channelGroups?: Array<string>;
        includeUUIDs?: boolean;
    }): Promise<HereNowResponse<string>>;
    hereNow(args: {
        channels?: Array<string>;
        channelGroups?: Array<string>;
        includeUUIDs?: boolean;
        includeState: boolean;
    }, cb?: (status: StatusEvent, response: HereNowResponse<UUIDState<GlobalState>>) => any): any;
    hereNow(args: {
        channels?: Array<string>;
        channelGroups?: Array<string>;
        includeUUIDs?: boolean;
        includeState: boolean;
    }): Promise<HereNowResponse<UUIDState<GlobalState>>>;
    whereNow(args: WhereNowArguments, cb?: (status: StatusEvent, response: WhereNowResponse) => any): any;
    whereNow(args: WhereNowArguments): Promise<WhereNowResponse>;
    getState(args: GetStateArguments, cb?: (status: StatusEvent, response: GetStateResponse) => any): any;
    getState(args: GetStateArguments): Promise<GetStateResponse>;
    setState(args: SetStateArguments, cb?: (status: StatusEvent, response: SetStateResponse) => any): any;
    setState(args: SetStateArguments): Promise<SetStateResponse>;
    history(args: HistoryArguments, cb?: (status: StatusEvent, response: HistoryResponse) => any): any;
    history(args: HistoryArguments): Promise<HistoryResponse>;
    deleteMessages(args: DeleteHistoryArguments): Promise<StatusEvent>;
    stop(): void;
}
