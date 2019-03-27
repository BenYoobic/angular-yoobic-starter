/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; //, HTTP_INTERCEPTORS
//, HTTP_INTERCEPTORS
import { CommonModule, Network, Log } from '@shared/common';
import { TranslateModule } from '@shared/translate';
//import { DATA_PROVIDERS } from './services'; //HttpCustomInterceptor, Config
import { Algorithms } from './services/algorithms/algorithms.service';
import { Authentication } from './services/authentication/authentication.service';
import { AuthenticationGuard, CanDeactivateGuard } from './services/authentication/authentication.guard';
import { BackupService } from './services/backup/backup.service';
import { Box } from './services/box/box.service';
import { Blog } from './services/blog/blog.service';
import { Broker } from './services/broker/broker.service';
import { Cache } from './services/cache/cache.service';
import { Config } from './services/config/config.service';
import { CurrentSessionResolver } from './services/authentication/current-session.resolver';
import { Dashboard } from './services/dashboard/dashboard.service';
import { Files } from './services/files/files.service';
import { FilesBroker } from './services/files/files-broker.service';
import { Googlemaps } from './services/googlemaps/googlemaps.service';
import { Googletranslate } from './services/googletranslate/googletranslate.service';
import { HttpCustomInterceptor } from './services/http-interceptor/http-interceptor.service';
import { PlatformService } from './services/platform/platform.service';
import { LoadingBar } from './services/loading-bar/loading-bar.service';
import { Locations } from './services/locations/locations.service';
import { Loopback } from './services/loopback/loopback.service';
import { Missiondescriptions } from './services/missiondescriptions/missiondescriptions.service';
import { Models } from './services/models/models.service';
import { Print } from './services/print/print.service';
import { Push } from './services/push/push.service';
import { Requestor } from './services/requestor/requestor.service';
import { Security } from './services/security/security.service';
import { Session } from './services/session/session.service';
import { Smartloc } from './services/smartloc/smartloc.service';
import { Tenants } from './services/tenants/tenants.service';
import { Unsplash } from './services/unsplash/unsplash.service';
import { Users } from './services/users/users.service';
import { Version } from './services/version/version.service';
import { Workplace } from './services/workplace/workplace.service';
import { Xlsx } from './services/xlsx/xlsx.service';
/** @type {?} */
var SERVICES = [
    Algorithms,
    Authentication,
    AuthenticationGuard,
    BackupService,
    Box,
    Blog,
    Broker,
    CanDeactivateGuard,
    Cache,
    Config,
    CurrentSessionResolver,
    Dashboard,
    Files,
    FilesBroker,
    Googlemaps,
    Googletranslate,
    HttpCustomInterceptor,
    PlatformService,
    LoadingBar,
    Locations,
    Loopback,
    Missiondescriptions,
    Models,
    Print,
    Push,
    Requestor,
    Security,
    Session,
    Smartloc,
    Tenants,
    Unsplash,
    Users,
    Version,
    Workplace,
    Xlsx
];
import { FilterPipe } from './pipes/filter/filter.pipe';
/** @type {?} */
var PIPES = [FilterPipe];
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { Device } from '@ionic-native/device/ngx';
import { File as FileNative } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Push as PushNative } from '@ionic-native/push/ngx';
var DataCoreModule = /** @class */ (function () {
    function DataCoreModule() {
    }
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    DataCoreModule.forRoot = /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    function (configuredProviders) {
        if (configuredProviders === void 0) { configuredProviders = []; }
        return {
            ngModule: DataCoreModule,
            providers: tslib_1.__spread(SERVICES, configuredProviders, [
                FileTransfer,
                DocumentViewer,
                Device,
                FileOpener,
                OneSignal,
                PushNative,
                FileNative,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpCustomInterceptor,
                    deps: [Config, Network, Log],
                    multi: true
                }
            ])
        };
    };
    DataCoreModule.decorators = [
        { type: NgModule, args: [{
                    declarations: tslib_1.__spread(PIPES),
                    imports: [CommonModule, TranslateModule, HttpClientModule],
                    exports: tslib_1.__spread([CommonModule, TranslateModule, HttpClientModule], PIPES)
                },] }
    ];
    return DataCoreModule;
}());
export { DataCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUMsQ0FBQyxxQkFBcUI7O0FBRWpHLE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFHcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN6RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDMUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzdGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDMUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0lBQ2hELFFBQVEsR0FBRztJQUNiLFVBQVU7SUFDVixjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLGFBQWE7SUFDYixHQUFHO0lBQ0gsSUFBSTtJQUNKLE1BQU07SUFDTixrQkFBa0I7SUFDbEIsS0FBSztJQUNMLE1BQU07SUFDTixzQkFBc0I7SUFDdEIsU0FBUztJQUNULEtBQUs7SUFDTCxXQUFXO0lBQ1gsVUFBVTtJQUNWLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsZUFBZTtJQUNmLFVBQVU7SUFDVixTQUFTO0lBQ1QsUUFBUTtJQUNSLG1CQUFtQjtJQUNuQixNQUFNO0lBQ04sS0FBSztJQUNMLElBQUk7SUFDSixTQUFTO0lBQ1QsUUFBUTtJQUNSLE9BQU87SUFDUCxRQUFRO0lBQ1IsT0FBTztJQUNQLFFBQVE7SUFDUixLQUFLO0lBQ0wsT0FBTztJQUNQLFNBQVM7SUFDVCxJQUFJO0NBQ0w7QUFFRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBRXBELEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUV4QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxJQUFJLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEQsT0FBTyxFQUFFLElBQUksSUFBSSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RDtJQUFBO0lBNEJBLENBQUM7Ozs7O0lBdEJRLHNCQUFPOzs7O0lBQWQsVUFBZSxtQkFBeUM7UUFBekMsb0NBQUEsRUFBQSx3QkFBeUM7UUFDdEQsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsbUJBQ0osUUFBUSxFQUNSLG1CQUFtQjtnQkFDdEIsWUFBWTtnQkFDWixjQUFjO2dCQUNkLE1BQU07Z0JBQ04sVUFBVTtnQkFDVixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsVUFBVTtnQkFDVjtvQkFDRSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUscUJBQXFCO29CQUMvQixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQztvQkFDNUIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7Y0FDRjtTQUNGLENBQUM7SUFDSixDQUFDOztnQkEzQkYsUUFBUSxTQUFDO29CQUNSLFlBQVksbUJBQU0sS0FBSyxDQUFDO29CQUN4QixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixDQUFDO29CQUMxRCxPQUFPLG9CQUFHLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEdBQUssS0FBSyxDQUFDO2lCQUNyRTs7SUF3QkQscUJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQXZCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlLCBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJzsgLy8sIEhUVFBfSU5URVJDRVBUT1JTXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgTmV0d29yaywgTG9nIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuXG4vL2ltcG9ydCB7IERBVEFfUFJPVklERVJTIH0gZnJvbSAnLi9zZXJ2aWNlcyc7IC8vSHR0cEN1c3RvbUludGVyY2VwdG9yLCBDb25maWdcbmltcG9ydCB7IEFsZ29yaXRobXMgfSBmcm9tICcuL3NlcnZpY2VzL2FsZ29yaXRobXMvYWxnb3JpdGhtcy5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uR3VhcmQsIENhbkRlYWN0aXZhdGVHdWFyZCB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uZ3VhcmQnO1xuaW1wb3J0IHsgQmFja3VwU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYmFja3VwL2JhY2t1cC5zZXJ2aWNlJztcbmltcG9ydCB7IEJveCB9IGZyb20gJy4vc2VydmljZXMvYm94L2JveC5zZXJ2aWNlJztcbmltcG9ydCB7IEJsb2cgfSBmcm9tICcuL3NlcnZpY2VzL2Jsb2cvYmxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEJyb2tlciB9IGZyb20gJy4vc2VydmljZXMvYnJva2VyL2Jyb2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYWNoZS9jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vc2VydmljZXMvY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IEN1cnJlbnRTZXNzaW9uUmVzb2x2ZXIgfSBmcm9tICcuL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uL2N1cnJlbnQtc2Vzc2lvbi5yZXNvbHZlcic7XG5pbXBvcnQgeyBEYXNoYm9hcmQgfSBmcm9tICcuL3NlcnZpY2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBGaWxlcyB9IGZyb20gJy4vc2VydmljZXMvZmlsZXMvZmlsZXMuc2VydmljZSc7XG5pbXBvcnQgeyBGaWxlc0Jyb2tlciB9IGZyb20gJy4vc2VydmljZXMvZmlsZXMvZmlsZXMtYnJva2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xlbWFwcyB9IGZyb20gJy4vc2VydmljZXMvZ29vZ2xlbWFwcy9nb29nbGVtYXBzLnNlcnZpY2UnO1xuaW1wb3J0IHsgR29vZ2xldHJhbnNsYXRlIH0gZnJvbSAnLi9zZXJ2aWNlcy9nb29nbGV0cmFuc2xhdGUvZ29vZ2xldHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cEN1c3RvbUludGVyY2VwdG9yIH0gZnJvbSAnLi9zZXJ2aWNlcy9odHRwLWludGVyY2VwdG9yL2h0dHAtaW50ZXJjZXB0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBQbGF0Zm9ybVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3BsYXRmb3JtL3BsYXRmb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGluZ0JhciB9IGZyb20gJy4vc2VydmljZXMvbG9hZGluZy1iYXIvbG9hZGluZy1iYXIuc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhdGlvbnMgfSBmcm9tICcuL3NlcnZpY2VzL2xvY2F0aW9ucy9sb2NhdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBMb29wYmFjayB9IGZyb20gJy4vc2VydmljZXMvbG9vcGJhY2svbG9vcGJhY2suc2VydmljZSc7XG5pbXBvcnQgeyBNaXNzaW9uZGVzY3JpcHRpb25zIH0gZnJvbSAnLi9zZXJ2aWNlcy9taXNzaW9uZGVzY3JpcHRpb25zL21pc3Npb25kZXNjcmlwdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RlbHMgfSBmcm9tICcuL3NlcnZpY2VzL21vZGVscy9tb2RlbHMuc2VydmljZSc7XG5pbXBvcnQgeyBQcmludCB9IGZyb20gJy4vc2VydmljZXMvcHJpbnQvcHJpbnQuc2VydmljZSc7XG5pbXBvcnQgeyBQdXNoIH0gZnJvbSAnLi9zZXJ2aWNlcy9wdXNoL3B1c2guc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuL3NlcnZpY2VzL3JlcXVlc3Rvci9yZXF1ZXN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBTZWN1cml0eSB9IGZyb20gJy4vc2VydmljZXMvc2VjdXJpdHkvc2VjdXJpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBTbWFydGxvYyB9IGZyb20gJy4vc2VydmljZXMvc21hcnRsb2Mvc21hcnRsb2Muc2VydmljZSc7XG5pbXBvcnQgeyBUZW5hbnRzIH0gZnJvbSAnLi9zZXJ2aWNlcy90ZW5hbnRzL3RlbmFudHMuc2VydmljZSc7XG5pbXBvcnQgeyBVbnNwbGFzaCB9IGZyb20gJy4vc2VydmljZXMvdW5zcGxhc2gvdW5zcGxhc2guc2VydmljZSc7XG5pbXBvcnQgeyBVc2VycyB9IGZyb20gJy4vc2VydmljZXMvdXNlcnMvdXNlcnMuc2VydmljZSc7XG5pbXBvcnQgeyBWZXJzaW9uIH0gZnJvbSAnLi9zZXJ2aWNlcy92ZXJzaW9uL3ZlcnNpb24uc2VydmljZSc7XG5pbXBvcnQgeyBXb3JrcGxhY2UgfSBmcm9tICcuL3NlcnZpY2VzL3dvcmtwbGFjZS93b3JrcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBYbHN4IH0gZnJvbSAnLi9zZXJ2aWNlcy94bHN4L3hsc3guc2VydmljZSc7XG5sZXQgU0VSVklDRVMgPSBbXG4gIEFsZ29yaXRobXMsIC8vXG4gIEF1dGhlbnRpY2F0aW9uLFxuICBBdXRoZW50aWNhdGlvbkd1YXJkLFxuICBCYWNrdXBTZXJ2aWNlLFxuICBCb3gsXG4gIEJsb2csXG4gIEJyb2tlcixcbiAgQ2FuRGVhY3RpdmF0ZUd1YXJkLFxuICBDYWNoZSxcbiAgQ29uZmlnLFxuICBDdXJyZW50U2Vzc2lvblJlc29sdmVyLFxuICBEYXNoYm9hcmQsXG4gIEZpbGVzLFxuICBGaWxlc0Jyb2tlcixcbiAgR29vZ2xlbWFwcyxcbiAgR29vZ2xldHJhbnNsYXRlLFxuICBIdHRwQ3VzdG9tSW50ZXJjZXB0b3IsXG4gIFBsYXRmb3JtU2VydmljZSxcbiAgTG9hZGluZ0JhcixcbiAgTG9jYXRpb25zLFxuICBMb29wYmFjayxcbiAgTWlzc2lvbmRlc2NyaXB0aW9ucyxcbiAgTW9kZWxzLFxuICBQcmludCxcbiAgUHVzaCxcbiAgUmVxdWVzdG9yLFxuICBTZWN1cml0eSxcbiAgU2Vzc2lvbixcbiAgU21hcnRsb2MsXG4gIFRlbmFudHMsXG4gIFVuc3BsYXNoLFxuICBVc2VycyxcbiAgVmVyc2lvbixcbiAgV29ya3BsYWNlLFxuICBYbHN4XG5dO1xuXG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi9waXBlcy9maWx0ZXIvZmlsdGVyLnBpcGUnO1xuXG5sZXQgUElQRVMgPSBbRmlsdGVyUGlwZV07XG5cbmltcG9ydCB7IEZpbGVUcmFuc2ZlciB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS10cmFuc2Zlci9uZ3gnO1xuaW1wb3J0IHsgRG9jdW1lbnRWaWV3ZXIgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2RvY3VtZW50LXZpZXdlci9uZ3gnO1xuaW1wb3J0IHsgRGV2aWNlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9kZXZpY2Uvbmd4JztcbmltcG9ydCB7IEZpbGUgYXMgRmlsZU5hdGl2ZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS9uZ3gnO1xuaW1wb3J0IHsgRmlsZU9wZW5lciB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS1vcGVuZXIvbmd4JztcbmltcG9ydCB7IE9uZVNpZ25hbCB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvb25lc2lnbmFsL25neCc7XG5pbXBvcnQgeyBQdXNoIGFzIFB1c2hOYXRpdmUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL3B1c2gvbmd4JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbLi4uUElQRVNdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBUcmFuc2xhdGVNb2R1bGUsIEh0dHBDbGllbnRNb2R1bGVdLFxuICBleHBvcnRzOiBbQ29tbW9uTW9kdWxlLCBUcmFuc2xhdGVNb2R1bGUsIEh0dHBDbGllbnRNb2R1bGUsIC4uLlBJUEVTXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhQ29yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyZWRQcm92aWRlcnM6IEFycmF5PFByb3ZpZGVyPiA9IFtdKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBEYXRhQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi5TRVJWSUNFUyxcbiAgICAgICAgLi4uY29uZmlndXJlZFByb3ZpZGVycyxcbiAgICAgICAgRmlsZVRyYW5zZmVyLFxuICAgICAgICBEb2N1bWVudFZpZXdlcixcbiAgICAgICAgRGV2aWNlLFxuICAgICAgICBGaWxlT3BlbmVyLFxuICAgICAgICBPbmVTaWduYWwsXG4gICAgICAgIFB1c2hOYXRpdmUsXG4gICAgICAgIEZpbGVOYXRpdmUsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcbiAgICAgICAgICB1c2VDbGFzczogSHR0cEN1c3RvbUludGVyY2VwdG9yLFxuICAgICAgICAgIGRlcHM6IFtDb25maWcsIE5ldHdvcmssIExvZ10sXG4gICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==