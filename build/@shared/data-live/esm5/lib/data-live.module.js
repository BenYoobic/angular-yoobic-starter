/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { DataCoreModule } from '@shared/data-core';
//import { DATA_LIVE_PROVIDERS } from './services';
import { Channel } from './services/channel/channel.service';
import { Intercom } from './services/intercom/intercom.service';
import { WebIntercom } from './services/intercom/web-intercom.service';
import { Messages } from './services/messages/messages.service';
import { Pubnub } from './services/pubnub/pubnub.service';
import { Track } from './services/track/track.service';
import { TwilioToken } from './services/twilio-token/twilio-token.service';
import { VideoCall } from './services/video-call/video-call.service';
import { SentryErrorHandler } from './services/sentry-error-handler/sentry-error-handler.service';
import { Intercom as IntercomNative } from '@ionic-native/intercom/ngx';
var DataLiveModule = /** @class */ (function () {
    function DataLiveModule() {
    }
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    DataLiveModule.forRoot = /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    function (configuredProviders) {
        if (configuredProviders === void 0) { configuredProviders = []; }
        return {
            ngModule: DataLiveModule,
            providers: tslib_1.__spread(configuredProviders, [Channel, Intercom, IntercomNative, Messages, Pubnub, SentryErrorHandler, Track, TwilioToken, VideoCall, WebIntercom])
        };
    };
    DataLiveModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [DataCoreModule],
                    exports: [DataCoreModule]
                },] }
    ];
    return DataLiveModule;
}());
export { DataLiveModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1saXZlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLWxpdmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUVuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDM0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBRWxHLE9BQU8sRUFBRSxRQUFRLElBQUksY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFeEU7SUFBQTtJQVlBLENBQUM7Ozs7O0lBTlEsc0JBQU87Ozs7SUFBZCxVQUFlLG1CQUF5QztRQUF6QyxvQ0FBQSxFQUFBLHdCQUF5QztRQUN0RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxtQkFBTSxtQkFBbUIsR0FBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQztTQUN6SixDQUFDO0lBQ0osQ0FBQzs7Z0JBWEYsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQ3pCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztpQkFDMUI7O0lBUUQscUJBQUM7Q0FBQSxBQVpELElBWUM7U0FQWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFDb3JlTW9kdWxlIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuLy9pbXBvcnQgeyBEQVRBX0xJVkVfUFJPVklERVJTIH0gZnJvbSAnLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBDaGFubmVsIH0gZnJvbSAnLi9zZXJ2aWNlcy9jaGFubmVsL2NoYW5uZWwuc2VydmljZSc7XG5pbXBvcnQgeyBJbnRlcmNvbSB9IGZyb20gJy4vc2VydmljZXMvaW50ZXJjb20vaW50ZXJjb20uc2VydmljZSc7XG5pbXBvcnQgeyBXZWJJbnRlcmNvbSB9IGZyb20gJy4vc2VydmljZXMvaW50ZXJjb20vd2ViLWludGVyY29tLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWVzc2FnZXMgfSBmcm9tICcuL3NlcnZpY2VzL21lc3NhZ2VzL21lc3NhZ2VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHVibnViIH0gZnJvbSAnLi9zZXJ2aWNlcy9wdWJudWIvcHVibnViLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHJhY2sgfSBmcm9tICcuL3NlcnZpY2VzL3RyYWNrL3RyYWNrLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHdpbGlvVG9rZW4gfSBmcm9tICcuL3NlcnZpY2VzL3R3aWxpby10b2tlbi90d2lsaW8tdG9rZW4uc2VydmljZSc7XG5pbXBvcnQgeyBWaWRlb0NhbGwgfSBmcm9tICcuL3NlcnZpY2VzL3ZpZGVvLWNhbGwvdmlkZW8tY2FsbC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbnRyeUVycm9ySGFuZGxlciB9IGZyb20gJy4vc2VydmljZXMvc2VudHJ5LWVycm9yLWhhbmRsZXIvc2VudHJ5LWVycm9yLWhhbmRsZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IEludGVyY29tIGFzIEludGVyY29tTmF0aXZlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9pbnRlcmNvbS9uZ3gnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbRGF0YUNvcmVNb2R1bGVdLFxuICBleHBvcnRzOiBbRGF0YUNvcmVNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFMaXZlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlndXJlZFByb3ZpZGVyczogQXJyYXk8UHJvdmlkZXI+ID0gW10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERhdGFMaXZlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbLi4uY29uZmlndXJlZFByb3ZpZGVycywgQ2hhbm5lbCwgSW50ZXJjb20sIEludGVyY29tTmF0aXZlLCBNZXNzYWdlcywgUHVibnViLCBTZW50cnlFcnJvckhhbmRsZXIsIFRyYWNrLCBUd2lsaW9Ub2tlbiwgVmlkZW9DYWxsLCBXZWJJbnRlcmNvbV1cbiAgICB9O1xuICB9XG59XG4iXX0=