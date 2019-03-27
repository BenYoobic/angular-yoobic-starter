/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class DataLiveModule {
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    static forRoot(configuredProviders = []) {
        return {
            ngModule: DataLiveModule,
            providers: [...configuredProviders, Channel, Intercom, IntercomNative, Messages, Pubnub, SentryErrorHandler, Track, TwilioToken, VideoCall, WebIntercom]
        };
    }
}
DataLiveModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [DataCoreModule],
                exports: [DataCoreModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1saXZlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLWxpdmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUV4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBRW5ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDMUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOERBQThELENBQUM7QUFFbEcsT0FBTyxFQUFFLFFBQVEsSUFBSSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU94RSxNQUFNLE9BQU8sY0FBYzs7Ozs7SUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQkFBdUMsRUFBRTtRQUN0RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQztTQUN6SixDQUFDO0lBQ0osQ0FBQzs7O1lBWEYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ3pCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQzthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRhQ29yZU1vZHVsZSB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcbi8vaW1wb3J0IHsgREFUQV9MSVZFX1BST1ZJREVSUyB9IGZyb20gJy4vc2VydmljZXMnO1xuaW1wb3J0IHsgQ2hhbm5lbCB9IGZyb20gJy4vc2VydmljZXMvY2hhbm5lbC9jaGFubmVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW50ZXJjb20gfSBmcm9tICcuL3NlcnZpY2VzL2ludGVyY29tL2ludGVyY29tLnNlcnZpY2UnO1xuaW1wb3J0IHsgV2ViSW50ZXJjb20gfSBmcm9tICcuL3NlcnZpY2VzL2ludGVyY29tL3dlYi1pbnRlcmNvbS5zZXJ2aWNlJztcbmltcG9ydCB7IE1lc3NhZ2VzIH0gZnJvbSAnLi9zZXJ2aWNlcy9tZXNzYWdlcy9tZXNzYWdlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFB1Ym51YiB9IGZyb20gJy4vc2VydmljZXMvcHVibnViL3B1Ym51Yi5zZXJ2aWNlJztcbmltcG9ydCB7IFRyYWNrIH0gZnJvbSAnLi9zZXJ2aWNlcy90cmFjay90cmFjay5zZXJ2aWNlJztcbmltcG9ydCB7IFR3aWxpb1Rva2VuIH0gZnJvbSAnLi9zZXJ2aWNlcy90d2lsaW8tdG9rZW4vdHdpbGlvLXRva2VuLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlkZW9DYWxsIH0gZnJvbSAnLi9zZXJ2aWNlcy92aWRlby1jYWxsL3ZpZGVvLWNhbGwuc2VydmljZSc7XG5pbXBvcnQgeyBTZW50cnlFcnJvckhhbmRsZXIgfSBmcm9tICcuL3NlcnZpY2VzL3NlbnRyeS1lcnJvci1oYW5kbGVyL3NlbnRyeS1lcnJvci1oYW5kbGVyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBJbnRlcmNvbSBhcyBJbnRlcmNvbU5hdGl2ZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvaW50ZXJjb20vbmd4JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW0RhdGFDb3JlTW9kdWxlXSxcbiAgZXhwb3J0czogW0RhdGFDb3JlTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhTGl2ZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyZWRQcm92aWRlcnM6IEFycmF5PFByb3ZpZGVyPiA9IFtdKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEYXRhTGl2ZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWy4uLmNvbmZpZ3VyZWRQcm92aWRlcnMsIENoYW5uZWwsIEludGVyY29tLCBJbnRlcmNvbU5hdGl2ZSwgTWVzc2FnZXMsIFB1Ym51YiwgU2VudHJ5RXJyb3JIYW5kbGVyLCBUcmFjaywgVHdpbGlvVG9rZW4sIFZpZGVvQ2FsbCwgV2ViSW50ZXJjb21dXG4gICAgfTtcbiAgfVxufVxuIl19