import { NgZone, ErrorHandler } from '@angular/core';
import { Log, CoreConfig } from '@shared/common';
import { Config } from '@shared/data-core';
import { Track } from '../track/track.service';
export declare class SentryErrorHandler implements ErrorHandler {
    private log;
    private zone;
    private trackService;
    protected coreConfig: CoreConfig;
    protected config: Config;
    static disabledErrorMessages: Array<string>;
    constructor(log: Log, zone: NgZone, trackService: Track, coreConfig: CoreConfig, config: Config);
    isEnabled(): boolean;
    handleError(err: any): void;
    identify(id: any, email: any, username: any): void;
}
