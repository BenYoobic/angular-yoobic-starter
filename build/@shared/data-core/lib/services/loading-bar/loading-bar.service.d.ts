import { Observable } from 'rxjs';
export declare enum LoadingBarEventType {
    PROGRESS = 0,
    VISIBLE = 1
}
export declare class LoadingBarEvent {
    type: LoadingBarEventType;
    value: any;
    constructor(type: LoadingBarEventType, value: any);
}
export declare class LoadingBar {
    interval: number;
    observable: Observable<LoadingBarEvent>;
    private _progress;
    private _visible;
    private _intervalCounterId;
    private subscriber;
    private isStarting;
    constructor();
    progress: number;
    visible: boolean;
    start(onCompleted?: Function): void;
    complete(): void;
    private emitEvent;
}
