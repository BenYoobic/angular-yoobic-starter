/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class CommonModule {
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    static forRoot(configuredProviders = []) {
        return {
            ngModule: CommonModule,
            providers: [...configuredProviders, CoreConfig, GeoLocation, LocalForageService, LocalStorage, Log, Network, PromiseService, Utils, Geolocation, NetworkNative]
        };
    }
}
CommonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [AngularCommonModule, HttpClientModule],
                exports: [AngularCommonModule, HttpClientModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9jb21tb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsWUFBWSxJQUFJLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBT3JFLE1BQU0sT0FBTyxZQUFZOzs7OztJQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDLHNCQUF1QyxFQUFFO1FBQ3RELE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUUsQ0FBQyxHQUFHLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsYUFBYSxDQUFDO1NBQ2hLLENBQUM7SUFDSixDQUFDOzs7WUFYRixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDO2dCQUNoRCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQzthQUNqRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIGFzIEFuZ3VsYXJDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgQ29yZUNvbmZpZyB9IGZyb20gJy4vc2VydmljZXMvY29yZS1jb25maWcvY29yZS1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBHZW9Mb2NhdGlvbiB9IGZyb20gJy4vc2VydmljZXMvZ2VvLWxvY2F0aW9uL2dlby1sb2NhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsRm9yYWdlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbG9jYWwtZm9yYWdlL2xvY2FsLWZvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gJy4vc2VydmljZXMvbG9jYWwtc3RvcmFnZS9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2cvbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gJy4vc2VydmljZXMvbmV0d29yay9uZXR3b3JrLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvbWlzZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9zZXJ2aWNlcy91dGlscy91dGlscy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgR2VvbG9jYXRpb24gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2dlb2xvY2F0aW9uL25neCc7XG5pbXBvcnQgeyBOZXR3b3JrIGFzIE5ldHdvcmtOYXRpdmUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL25ldHdvcmsvbmd4JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW0FuZ3VsYXJDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGVdLFxuICBleHBvcnRzOiBbQW5ndWxhckNvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQ29tbW9uTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlndXJlZFByb3ZpZGVyczogQXJyYXk8UHJvdmlkZXI+ID0gW10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IENvbW1vbk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWy4uLmNvbmZpZ3VyZWRQcm92aWRlcnMsIENvcmVDb25maWcsIEdlb0xvY2F0aW9uLCBMb2NhbEZvcmFnZVNlcnZpY2UsIExvY2FsU3RvcmFnZSwgTG9nLCBOZXR3b3JrLCBQcm9taXNlU2VydmljZSwgVXRpbHMsIEdlb2xvY2F0aW9uLCBOZXR3b3JrTmF0aXZlXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==