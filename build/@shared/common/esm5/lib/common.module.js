/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreConfig } from './services/core-config/core-config.service';
import { GeoLocation } from './services/geo-location/geo-location.service';
import { LocalForageService } from './services/local-forage/local-forage.service';
import { LocalStorage } from './services/local-storage/local-storage.service';
import { Log } from './services/log/log.service';
import { Network } from './services/network/network.service';
import { PromiseService } from './services/promise/promise.service';
import { Utils } from './services/utils/utils.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network as NetworkNative } from '@ionic-native/network/ngx';
var CommonModule = /** @class */ (function () {
    function CommonModule() {
    }
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    CommonModule.forRoot = /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    function (configuredProviders) {
        if (configuredProviders === void 0) { configuredProviders = []; }
        return {
            ngModule: CommonModule,
            providers: tslib_1.__spread(configuredProviders, [CoreConfig, GeoLocation, LocalForageService, LocalStorage, Log, Network, PromiseService, Utils, Geolocation, NetworkNative])
        };
    };
    CommonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [AngularCommonModule, HttpClientModule],
                    exports: [AngularCommonModule, HttpClientModule]
                },] }
    ];
    return CommonModule;
}());
export { CommonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksSUFBSSxtQkFBbUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzlFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE9BQU8sSUFBSSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRTtJQUFBO0lBWUEsQ0FBQzs7Ozs7SUFOUSxvQkFBTzs7OztJQUFkLFVBQWUsbUJBQXlDO1FBQXpDLG9DQUFBLEVBQUEsd0JBQXlDO1FBQ3RELE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLG1CQUFNLG1CQUFtQixHQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFDO1NBQ2hLLENBQUM7SUFDSixDQUFDOztnQkFYRixRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDO29CQUNoRCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQztpQkFDakQ7O0lBUUQsbUJBQUM7Q0FBQSxBQVpELElBWUM7U0FQWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgYXMgQW5ndWxhckNvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBDb3JlQ29uZmlnIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb3JlLWNvbmZpZy9jb3JlLWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEdlb0xvY2F0aW9uIH0gZnJvbSAnLi9zZXJ2aWNlcy9nZW8tbG9jYXRpb24vZ2VvLWxvY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxGb3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2NhbC1mb3JhZ2UvbG9jYWwtZm9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2NhbC1zdG9yYWdlL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuL3NlcnZpY2VzL2xvZy9sb2cuc2VydmljZSc7XG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSAnLi9zZXJ2aWNlcy9uZXR3b3JrL25ldHdvcmsuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9taXNlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcHJvbWlzZS9wcm9taXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL3NlcnZpY2VzL3V0aWxzL3V0aWxzLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBHZW9sb2NhdGlvbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZ2VvbG9jYXRpb24vbmd4JztcbmltcG9ydCB7IE5ldHdvcmsgYXMgTmV0d29ya05hdGl2ZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvbmV0d29yay9uZ3gnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBpbXBvcnRzOiBbQW5ndWxhckNvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtBbmd1bGFyQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBDb21tb25Nb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmVkUHJvdmlkZXJzOiBBcnJheTxQcm92aWRlcj4gPSBbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ29tbW9uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbLi4uY29uZmlndXJlZFByb3ZpZGVycywgQ29yZUNvbmZpZywgR2VvTG9jYXRpb24sIExvY2FsRm9yYWdlU2VydmljZSwgTG9jYWxTdG9yYWdlLCBMb2csIE5ldHdvcmssIFByb21pc2VTZXJ2aWNlLCBVdGlscywgR2VvbG9jYXRpb24sIE5ldHdvcmtOYXRpdmVdXG4gICAgfTtcbiAgfVxufVxuIl19