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
var SentryErrorHandler = /** @class */ (function () {
    function SentryErrorHandler(log, zone, trackService, coreConfig, config) {
        var _this = this;
        this.log = log;
        this.zone = zone;
        this.trackService = trackService;
        this.coreConfig = coreConfig;
        this.config = config;
        if (this.isEnabled()) {
            try {
                /** @type {?} */
                var currentEnv_1 = this.config.getCurrentConfig().initialSelection;
                this.zone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var options = {
                        dsn: _this.coreConfig.getKey('sentryClientKey'),
                        release: _this.coreConfig.getAppVersion(),
                        environment: (currentEnv_1 ? currentEnv_1._id : '') || 'prod'
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
    SentryErrorHandler.prototype.isEnabled = /**
     * @return {?}
     */
    function () {
        return this.coreConfig.getMode() === 'prod' && this.coreConfig.getKey('sentryClientKey') && this.coreConfig.getKey('sentryClientKey').length > 0; //
    };
    /**
     * @param {?} err
     * @return {?}
     */
    SentryErrorHandler.prototype.handleError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        /** @type {?} */
        var disabled = false;
        SentryErrorHandler.disabledErrorMessages.forEach((/**
         * @param {?} m
         * @return {?}
         */
        function (m) {
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
    };
    /**
     * @param {?} id
     * @param {?} email
     * @param {?} username
     * @return {?}
     */
    SentryErrorHandler.prototype.identify = /**
     * @param {?} id
     * @param {?} email
     * @param {?} username
     * @return {?}
     */
    function (id, email, username) {
        var _this = this;
        if (this.isEnabled() && id) {
            try {
                this.trackService.getSessionStackSession().then((/**
                 * @param {?} session_id
                 * @return {?}
                 */
                function (session_id) {
                    Sentry.configureScope((/**
                     * @param {?} scope
                     * @return {?}
                     */
                    function (scope) {
                        scope.setUser({ email: email, username: username, id: id });
                        scope.addEventProcessor((/**
                         * @param {?} event
                         * @return {?}
                         */
                        function (event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
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
                                return [2 /*return*/, event];
                            });
                        }); }));
                    }));
                }));
            }
            catch (e) { }
        }
    };
    SentryErrorHandler.disabledErrorMessages = ["Cannot read property 'disconnect' of null", 'PubNub call failed', 'PubNub call failed, check status for details', "InvalidStateError: Failed to execute 'transaction'", 'Loading chunk', "You provided 'undefined' where a stream was expected", "Cannot read property 'value' of undefined", 'Uncaught (in promise): OK', 'Uncaught (in promise): Error: Timeout', 'NS_ERROR_NOT_INITIALIZED', 'Error: No available storage method found'];
    SentryErrorHandler.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SentryErrorHandler.ctorParameters = function () { return [
        { type: Log },
        { type: NgZone },
        { type: Track },
        { type: CoreConfig },
        { type: Config }
    ]; };
    return SentryErrorHandler;
}());
export { SentryErrorHandler };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudHJ5LWVycm9yLWhhbmRsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zZW50cnktZXJyb3ItaGFuZGxlci9zZW50cnktZXJyb3ItaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQyxPQUFPLEtBQUssTUFBTSxNQUFNLGlCQUFpQixDQUFDO0FBRTFDO0lBSUUsNEJBQW9CLEdBQVEsRUFBVSxJQUFZLEVBQVUsWUFBbUIsRUFBWSxVQUFzQixFQUFZLE1BQWM7UUFBM0ksaUJBZ0JDO1FBaEJtQixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFPO1FBQVksZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFZLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDekksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDcEIsSUFBSTs7b0JBQ0UsWUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxnQkFBZ0I7Z0JBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzs7Z0JBQUM7O3dCQUN0QixPQUFPLEdBQUc7d0JBQ1osR0FBRyxFQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO3dCQUM5QyxPQUFPLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7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QUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2dDQUNoQyxvRkFBb0Y7Z0NBQ3BGLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLEVBQUU7b0NBQy9ELEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2lDQUNoRTtnQ0FDRCxzQkFBTyxLQUFLLEVBQUM7OzZCQUNkLEVBQUMsQ0FBQztvQkFDTCxDQUFDLEVBQUMsQ0FBQztnQkFDTCxDQUFDLEVBQUMsQ0FBQzthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtTQUNmO0lBQ0gsQ0FBQztJQXRFYSx3Q0FBcUIsR0FBa0IsQ0FBQywyQ0FBMkMsRUFBRSxvQkFBb0IsRUFBRSw4Q0FBOEMsRUFBRSxvREFBb0QsRUFBRSxlQUFlLEVBQUUsc0RBQXNELEVBQUUsMkNBQTJDLEVBQUUsMkJBQTJCLEVBQUUsdUNBQXVDLEVBQUUsMEJBQTBCLEVBQUUsMENBQTBDLENBQUMsQ0FBQzs7Z0JBRnBlLFVBQVU7Ozs7Z0JBTkYsR0FBRztnQkFEUyxNQUFNO2dCQUdsQixLQUFLO2dCQUZBLFVBQVU7Z0JBQ2YsTUFBTTs7SUE4RWYseUJBQUM7Q0FBQSxBQXpFRCxJQXlFQztTQXhFWSxrQkFBa0I7OztJQUM3Qix5Q0FBbWU7Ozs7O0lBRXZkLGlDQUFnQjs7Ozs7SUFBRSxrQ0FBb0I7Ozs7O0lBQUUsMENBQTJCOzs7OztJQUFFLHdDQUFnQzs7Ozs7SUFBRSxvQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUsIEVycm9ySGFuZGxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nLCBDb3JlQ29uZmlnIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgVHJhY2sgfSBmcm9tICcuLi90cmFjay90cmFjay5zZXJ2aWNlJztcblxuaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvYnJvd3Nlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZW50cnlFcnJvckhhbmRsZXIgaW1wbGVtZW50cyBFcnJvckhhbmRsZXIge1xuICBwdWJsaWMgc3RhdGljIGRpc2FibGVkRXJyb3JNZXNzYWdlczogQXJyYXk8c3RyaW5nPiA9IFtcIkNhbm5vdCByZWFkIHByb3BlcnR5ICdkaXNjb25uZWN0JyBvZiBudWxsXCIsICdQdWJOdWIgY2FsbCBmYWlsZWQnLCAnUHViTnViIGNhbGwgZmFpbGVkLCBjaGVjayBzdGF0dXMgZm9yIGRldGFpbHMnLCBcIkludmFsaWRTdGF0ZUVycm9yOiBGYWlsZWQgdG8gZXhlY3V0ZSAndHJhbnNhY3Rpb24nXCIsICdMb2FkaW5nIGNodW5rJywgXCJZb3UgcHJvdmlkZWQgJ3VuZGVmaW5lZCcgd2hlcmUgYSBzdHJlYW0gd2FzIGV4cGVjdGVkXCIsIFwiQ2Fubm90IHJlYWQgcHJvcGVydHkgJ3ZhbHVlJyBvZiB1bmRlZmluZWRcIiwgJ1VuY2F1Z2h0IChpbiBwcm9taXNlKTogT0snLCAnVW5jYXVnaHQgKGluIHByb21pc2UpOiBFcnJvcjogVGltZW91dCcsICdOU19FUlJPUl9OT1RfSU5JVElBTElaRUQnLCAnRXJyb3I6IE5vIGF2YWlsYWJsZSBzdG9yYWdlIG1ldGhvZCBmb3VuZCddO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9nOiBMb2csIHByaXZhdGUgem9uZTogTmdab25lLCBwcml2YXRlIHRyYWNrU2VydmljZTogVHJhY2ssIHByb3RlY3RlZCBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcpIHtcbiAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IGN1cnJlbnRFbnYgPSB0aGlzLmNvbmZpZy5nZXRDdXJyZW50Q29uZmlnKCkuaW5pdGlhbFNlbGVjdGlvbjtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGRzbjogdGhpcy5jb3JlQ29uZmlnLmdldEtleSgnc2VudHJ5Q2xpZW50S2V5JyksXG4gICAgICAgICAgICByZWxlYXNlOiB0aGlzLmNvcmVDb25maWcuZ2V0QXBwVmVyc2lvbigpLFxuICAgICAgICAgICAgZW52aXJvbm1lbnQ6IChjdXJyZW50RW52ID8gY3VycmVudEVudi5faWQgOiAnJykgfHwgJ3Byb2QnXG4gICAgICAgICAgfTtcbiAgICAgICAgICBTZW50cnkuaW5pdChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5sb2cuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29yZUNvbmZpZy5nZXRNb2RlKCkgPT09ICdwcm9kJyAmJiB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdzZW50cnlDbGllbnRLZXknKSAmJiB0aGlzLmNvcmVDb25maWcuZ2V0S2V5KCdzZW50cnlDbGllbnRLZXknKS5sZW5ndGggPiAwOyAvL1xuICB9XG5cbiAgaGFuZGxlRXJyb3IoZXJyOiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBTZW50cnlFcnJvckhhbmRsZXIuZGlzYWJsZWRFcnJvck1lc3NhZ2VzLmZvckVhY2gobSA9PiB7XG4gICAgICBpZiAoZXJyICYmIGVyci5tZXNzYWdlICYmIGVyci5tZXNzYWdlLmluZGV4T2YobSkgPj0gMCkge1xuICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlcnIgJiYgdGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgU2VudHJ5LmNhcHR1cmVFeGNlcHRpb24oZXJyLm9yaWdpbmFsRXJyb3IgfHwgZXJyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAvL3RoaXMudHJhY2tTZXJ2aWNlLnNlbmRMb2dSb2NrZXRFcnJvcihlcnIub3JpZ2luYWxFcnJvciB8fCBlcnIpO1xuICAgICAgLy90aGlzLnRyYWNrU2VydmljZS5zZW5kU2Vzc2lvblN0YWNrRXJyb3IoZXJyLm9yaWdpbmFsRXJyb3IgfHwgZXJyKTtcbiAgICAgIHRoaXMudHJhY2tTZXJ2aWNlLnRyYWNrKCdBcHAgQ3Jhc2gnLCB7IGVycm9yOiBlcnIub3JpZ2luYWxFcnJvciB8fCBlcnIgfSk7XG4gICAgICB0aGlzLmxvZy5lcnJvcihlcnIub3JpZ2luYWxFcnJvciB8fCBlcnIpO1xuICAgIH0gZWxzZSBpZiAoZXJyICYmIHRoaXMuY29yZUNvbmZpZy5nZXRNb2RlKCkgPT09ICdkZXYnKSB7XG4gICAgICB0aGlzLmxvZy5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGlkZW50aWZ5KGlkLCBlbWFpbCwgdXNlcm5hbWUpIHtcbiAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSAmJiBpZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy50cmFja1NlcnZpY2UuZ2V0U2Vzc2lvblN0YWNrU2Vzc2lvbigpLnRoZW4oc2Vzc2lvbl9pZCA9PiB7XG4gICAgICAgICAgU2VudHJ5LmNvbmZpZ3VyZVNjb3BlKHNjb3BlID0+IHtcbiAgICAgICAgICAgIHNjb3BlLnNldFVzZXIoeyBlbWFpbCwgdXNlcm5hbWUsIGlkIH0pO1xuICAgICAgICAgICAgc2NvcGUuYWRkRXZlbnRQcm9jZXNzb3IoYXN5bmMgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICBldmVudC5jb250ZXh0cyA9IGV2ZW50LmNvbnRleHRzIHx8IHt9O1xuICAgICAgICAgICAgICBldmVudC5jb250ZXh0cy5zZXNzaW9uc3RhY2sgPSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbl9pZDogc2Vzc2lvbl9pZCxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGV2ZW50LmV4dHJhID0gZXZlbnQuZXh0cmEgfHwge307XG4gICAgICAgICAgICAgIC8vZXZlbnQuZXh0cmEuc2Vzc2lvbnN0YWNrVXJsID0gdGhpcy50cmFja1NlcnZpY2UuZ2V0U2Vzc2lvblN0YWNrVXJsKCkgKyBzZXNzaW9uX2lkO1xuICAgICAgICAgICAgICBpZiAod2luZG93ICYmIHdpbmRvd1snRlMnXSAmJiB3aW5kb3dbJ0ZTJ10uZ2V0Q3VycmVudFNlc3Npb25VUkwpIHtcbiAgICAgICAgICAgICAgICBldmVudC5leHRyYS5mdWxsc3RvcnlVcmwgPSB3aW5kb3dbJ0ZTJ10uZ2V0Q3VycmVudFNlc3Npb25VUkwoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cbiAgfVxufVxuIl19