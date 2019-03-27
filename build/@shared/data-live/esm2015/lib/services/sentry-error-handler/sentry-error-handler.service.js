/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Log, CoreConfig } from '@shared/common';
import { Config } from '@shared/data-core';
import { Track } from '../track/track.service';
import * as Sentry from '@sentry/browser';
export class SentryErrorHandler {
    /**
     * @param {?} log
     * @param {?} zone
     * @param {?} trackService
     * @param {?} coreConfig
     * @param {?} config
     */
    constructor(log, zone, trackService, coreConfig, config) {
        this.log = log;
        this.zone = zone;
        this.trackService = trackService;
        this.coreConfig = coreConfig;
        this.config = config;
        if (this.isEnabled()) {
            try {
                /** @type {?} */
                let currentEnv = this.config.getCurrentConfig().initialSelection;
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    let options = {
                        dsn: this.coreConfig.getKey('sentryClientKey'),
                        release: this.coreConfig.getAppVersion(),
                        environment: (currentEnv ? currentEnv._id : '') || 'prod'
                    };
                    Sentry.init(options);
                }));
            }
            catch (err) {
                this.log.error(err);
            }
        }
    }
    /**
     * @return {?}
     */
    isEnabled() {
        return this.coreConfig.getMode() === 'prod' && this.coreConfig.getKey('sentryClientKey') && this.coreConfig.getKey('sentryClientKey').length > 0; //
    }
    /**
     * @param {?} err
     * @return {?}
     */
    handleError(err) {
        /** @type {?} */
        let disabled = false;
        SentryErrorHandler.disabledErrorMessages.forEach((/**
         * @param {?} m
         * @return {?}
         */
        m => {
            if (err && err.message && err.message.indexOf(m) >= 0) {
                disabled = true;
            }
        }));
        if (disabled) {
            return;
        }
        if (err && this.isEnabled()) {
            try {
                Sentry.captureException(err.originalError || err);
            }
            catch (e) { }
            //this.trackService.sendLogRocketError(err.originalError || err);
            //this.trackService.sendSessionStackError(err.originalError || err);
            this.trackService.track('App Crash', { error: err.originalError || err });
            this.log.error(err.originalError || err);
        }
        else if (err && this.coreConfig.getMode() === 'dev') {
            this.log.error(err);
        }
    }
    /**
     * @param {?} id
     * @param {?} email
     * @param {?} username
     * @return {?}
     */
    identify(id, email, username) {
        if (this.isEnabled() && id) {
            try {
                this.trackService.getSessionStackSession().then((/**
                 * @param {?} session_id
                 * @return {?}
                 */
                session_id => {
                    Sentry.configureScope((/**
                     * @param {?} scope
                     * @return {?}
                     */
                    scope => {
                        scope.setUser({ email, username, id });
                        scope.addEventProcessor((/**
                         * @param {?} event
                         * @return {?}
                         */
                        (event) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            event.contexts = event.contexts || {};
                            event.contexts.sessionstack = {
                                session_id: session_id,
                                timestamp: new Date().getTime()
                            };
                            event.extra = event.extra || {};
                            //event.extra.sessionstackUrl = this.trackService.getSessionStackUrl() + session_id;
                            if (window && window['FS'] && window['FS'].getCurrentSessionURL) {
                                event.extra.fullstoryUrl = window['FS'].getCurrentSessionURL();
                            }
                            return event;
                        })));
                    }));
                }));
            }
            catch (e) { }
        }
    }
}
SentryErrorHandler.disabledErrorMessages = ["Cannot read property 'disconnect' of null", 'PubNub call failed', 'PubNub call failed, check status for details', "InvalidStateError: Failed to execute 'transaction'", 'Loading chunk', "You provided 'undefined' where a stream was expected", "Cannot read property 'value' of undefined", 'Uncaught (in promise): OK', 'Uncaught (in promise): Error: Timeout', 'NS_ERROR_NOT_INITIALIZED', 'Error: No available storage method found'];
SentryErrorHandler.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SentryErrorHandler.ctorParameters = () => [
    { type: Log },
    { type: NgZone },
    { type: Track },
    { type: CoreConfig },
    { type: Config }
];
if (false) {
    /** @type {?} */
    SentryErrorHandler.disabledErrorMessages;
    /**
     * @type {?}
     * @private
     */
    SentryErrorHandler.prototype.log;
    /**
     * @type {?}
     * @private
     */
    SentryErrorHandler.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    SentryErrorHandler.prototype.trackService;
    /**
     * @type {?}
     * @protected
     */
    SentryErrorHandler.prototype.coreConfig;
    /**
     * @type {?}
     * @protected
     */
    SentryErrorHandler.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudHJ5LWVycm9yLWhhbmRsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zZW50cnktZXJyb3ItaGFuZGxlci9zZW50cnktZXJyb3ItaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQyxPQUFPLEtBQUssTUFBTSxNQUFNLGlCQUFpQixDQUFDO0FBRzFDLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7O0lBRzdCLFlBQW9CLEdBQVEsRUFBVSxJQUFZLEVBQVUsWUFBbUIsRUFBWSxVQUFzQixFQUFZLE1BQWM7UUFBdkgsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBTztRQUFZLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ3pJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3BCLElBQUk7O29CQUNFLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsZ0JBQWdCO2dCQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQjs7O2dCQUFDLEdBQUcsRUFBRTs7d0JBQzNCLE9BQU8sR0FBRzt3QkFDWixHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7d0JBQzlDLE9BQU8sRUFBRSxJQUFJLENBQUMs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LEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDOzRCQUNoQyxvRkFBb0Y7NEJBQ3BGLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLEVBQUU7Z0NBQy9ELEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDOzZCQUNoRTs0QkFDRCxPQUFPLEtBQUssQ0FBQzt3QkFDZixDQUFDLENBQUEsRUFBQyxDQUFDO29CQUNMLENBQUMsRUFBQyxDQUFDO2dCQUNMLENBQUMsRUFBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1NBQ2Y7SUFDSCxDQUFDOztBQXRFYSx3Q0FBcUIsR0FBa0IsQ0FBQywyQ0FBMkMsRUFBRSxvQkFBb0IsRUFBRSw4Q0FBOEMsRUFBRSxvREFBb0QsRUFBRSxlQUFlLEVBQUUsc0RBQXNELEVBQUUsMkNBQTJDLEVBQUUsMkJBQTJCLEVBQUUsdUNBQXVDLEVBQUUsMEJBQTBCLEVBQUUsMENBQTBDLENBQUMsQ0FBQzs7WUFGcGUsVUFBVTs7OztZQU5GLEdBQUc7WUFEUyxNQUFNO1lBR2xCLEtBQUs7WUFGQSxVQUFVO1lBQ2YsTUFBTTs7OztJQU9iLHlDQUFtZTs7Ozs7SUFFdmQsaUNBQWdCOzs7OztJQUFFLGtDQUFvQjs7Ozs7SUFBRSwwQ0FBMkI7Ozs7O0lBQUUsd0NBQWdDOzs7OztJQUFFLG9DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgRXJyb3JIYW5kbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2csIENvcmVDb25maWcgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBUcmFjayB9IGZyb20gJy4uL3RyYWNrL3RyYWNrLnNlcnZpY2UnO1xuXG5pbXBvcnQgKiBhcyBTZW50cnkgZnJvbSAnQHNlbnRyeS9icm93c2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlbnRyeUVycm9ySGFuZGxlciBpbXBsZW1lbnRzIEVycm9ySGFuZGxlciB7XG4gIHB1YmxpYyBzdGF0aWMgZGlzYWJsZWRFcnJvck1lc3NhZ2VzOiBBcnJheTxzdHJpbmc+ID0gW1wiQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2Rpc2Nvbm5lY3QnIG9mIG51bGxcIiwgJ1B1Yk51YiBjYWxsIGZhaWxlZCcsICdQdWJOdWIgY2FsbCBmYWlsZWQsIGNoZWNrIHN0YXR1cyBmb3IgZGV0YWlscycsIFwiSW52YWxpZFN0YXRlRXJyb3I6IEZhaWxlZCB0byBleGVjdXRlICd0cmFuc2FjdGlvbidcIiwgJ0xvYWRpbmcgY2h1bmsnLCBcIllvdSBwcm92aWRlZCAndW5kZWZpbmVkJyB3aGVyZSBhIHN0cmVhbSB3YXMgZXhwZWN0ZWRcIiwgXCJDYW5ub3QgcmVhZCBwcm9wZXJ0eSAndmFsdWUnIG9mIHVuZGVmaW5lZFwiLCAnVW5jYXVnaHQgKGluIHByb21pc2UpOiBPSycsICdVbmNhdWdodCAoaW4gcHJvbWlzZSk6IEVycm9yOiBUaW1lb3V0JywgJ05TX0VSUk9SX05PVF9JTklUSUFMSVpFRCcsICdFcnJvcjogTm8gYXZhaWxhYmxlIHN0b3JhZ2UgbWV0aG9kIGZvdW5kJ107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2c6IExvZywgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsIHByaXZhdGUgdHJhY2tTZXJ2aWNlOiBUcmFjaywgcHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZykge1xuICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgY3VycmVudEVudiA9IHRoaXMuY29uZmlnLmdldEN1cnJlbnRDb25maWcoKS5pbml0aWFsU2VsZWN0aW9uO1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgZHNuOiB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdzZW50cnlDbGllbnRLZXknKSxcbiAgICAgICAgICAgIHJlbGVhc2U6IHRoaXMuY29yZUNvbmZpZy5nZXRBcHBWZXJzaW9uKCksXG4gICAgICAgICAgICBlbnZpcm9ubWVudDogKGN1cnJlbnRFbnYgPyBjdXJyZW50RW52Ll9pZCA6ICcnKSB8fCAncHJvZCdcbiAgICAgICAgICB9O1xuICAgICAgICAgIFNlbnRyeS5pbml0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLmxvZy5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JlQ29uZmlnLmdldE1vZGUoKSA9PT0gJ3Byb2QnICYmIHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ3NlbnRyeUNsaWVudEtleScpICYmIHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ3NlbnRyeUNsaWVudEtleScpLmxlbmd0aCA+IDA7IC8vXG4gIH1cblxuICBoYW5kbGVFcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICAgIFNlbnRyeUVycm9ySGFuZGxlci5kaXNhYmxlZEVycm9yTWVzc2FnZXMuZm9yRWFjaChtID0+IHtcbiAgICAgIGlmIChlcnIgJiYgZXJyLm1lc3NhZ2UgJiYgZXJyLm1lc3NhZ2UuaW5kZXhPZihtKSA+PSAwKSB7XG4gICAgICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGVyciAmJiB0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBTZW50cnkuY2FwdHVyZUV4Y2VwdGlvbihlcnIub3JpZ2luYWxFcnJvciB8fCBlcnIpO1xuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIC8vdGhpcy50cmFja1NlcnZpY2Uuc2VuZExvZ1JvY2tldEVycm9yKGVyci5vcmlnaW5hbEVycm9yIHx8IGVycik7XG4gICAgICAvL3RoaXMudHJhY2tTZXJ2aWNlLnNlbmRTZXNzaW9uU3RhY2tFcnJvcihlcnIub3JpZ2luYWxFcnJvciB8fCBlcnIpO1xuICAgICAgdGhpcy50cmFja1NlcnZpY2UudHJhY2soJ0FwcCBDcmFzaCcsIHsgZXJyb3I6IGVyci5vcmlnaW5hbEVycm9yIHx8IGVyciB9KTtcbiAgICAgIHRoaXMubG9nLmVycm9yKGVyci5vcmlnaW5hbEVycm9yIHx8IGVycik7XG4gICAgfSBlbHNlIGlmIChlcnIgJiYgdGhpcy5jb3JlQ29uZmlnLmdldE1vZGUoKSA9PT0gJ2RldicpIHtcbiAgICAgIHRoaXMubG9nLmVycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgaWRlbnRpZnkoaWQsIGVtYWlsLCB1c2VybmFtZSkge1xuICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpICYmIGlkKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnRyYWNrU2VydmljZS5nZXRTZXNzaW9uU3RhY2tTZXNzaW9uKCkudGhlbihzZXNzaW9uX2lkID0+IHtcbiAgICAgICAgICBTZW50cnkuY29uZmlndXJlU2NvcGUoc2NvcGUgPT4ge1xuICAgICAgICAgICAgc2NvcGUuc2V0VXNlcih7IGVtYWlsLCB1c2VybmFtZSwgaWQgfSk7XG4gICAgICAgICAgICBzY29wZS5hZGRFdmVudFByb2Nlc3Nvcihhc3luYyBldmVudCA9PiB7XG4gICAgICAgICAgICAgIGV2ZW50LmNvbnRleHRzID0gZXZlbnQuY29udGV4dHMgfHwge307XG4gICAgICAgICAgICAgIGV2ZW50LmNvbnRleHRzLnNlc3Npb25zdGFjayA9IHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uX2lkOiBzZXNzaW9uX2lkLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgZXZlbnQuZXh0cmEgPSBldmVudC5leHRyYSB8fCB7fTtcbiAgICAgICAgICAgICAgLy9ldmVudC5leHRyYS5zZXNzaW9uc3RhY2tVcmwgPSB0aGlzLnRyYWNrU2VydmljZS5nZXRTZXNzaW9uU3RhY2tVcmwoKSArIHNlc3Npb25faWQ7XG4gICAgICAgICAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93WydGUyddICYmIHdpbmRvd1snRlMnXS5nZXRDdXJyZW50U2Vzc2lvblVSTCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmV4dHJhLmZ1bGxzdG9yeVVybCA9IHdpbmRvd1snRlMnXS5nZXRDdXJyZW50U2Vzc2lvblVSTCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBldmVudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuICB9XG59XG4iXX0=