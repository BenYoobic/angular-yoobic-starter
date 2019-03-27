/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
let SERVICES = [
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
let PIPES = [FilterPipe];
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { Device } from '@ionic-native/device/ngx';
import { File as FileNative } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Push as PushNative } from '@ionic-native/push/ngx';
export class DataCoreModule {
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    static forRoot(configuredProviders = []) {
        return {
            ngModule: DataCoreModule,
            providers: [
                ...SERVICES,
                ...configuredProviders,
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
            ]
        };
    }
}
DataCoreModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...PIPES],
                imports: [CommonModule, TranslateModule, HttpClientModule],
                exports: [CommonModule, TranslateModule, HttpClientModule, ...PIPES]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQyxDQUFDLHFCQUFxQjs7QUFFakcsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUdwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkQsT0FBTyxF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QUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsR0FBRyxRQUFRO2dCQUNYLEdBQUcsbUJBQW1CO2dCQUN0QixZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsTUFBTTtnQkFDTixVQUFVO2dCQUNWLFNBQVM7Z0JBQ1QsVUFBVTtnQkFDVixVQUFVO2dCQUNWO29CQUNFLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDO29CQUM1QixLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTNCRixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7Z0JBQzFELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxLQUFLLENBQUM7YUFDckUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUsIEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnOyAvLywgSFRUUF9JTlRFUkNFUFRPUlNcblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBOZXR3b3JrLCBMb2cgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5cbi8vaW1wb3J0IHsgREFUQV9QUk9WSURFUlMgfSBmcm9tICcuL3NlcnZpY2VzJzsgLy9IdHRwQ3VzdG9tSW50ZXJjZXB0b3IsIENvbmZpZ1xuaW1wb3J0IHsgQWxnb3JpdGhtcyB9IGZyb20gJy4vc2VydmljZXMvYWxnb3JpdGhtcy9hbGdvcml0aG1zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tICcuL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb25HdWFyZCwgQ2FuRGVhY3RpdmF0ZUd1YXJkIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5ndWFyZCc7XG5pbXBvcnQgeyBCYWNrdXBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9iYWNrdXAvYmFja3VwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi9zZXJ2aWNlcy9ib3gvYm94LnNlcnZpY2UnO1xuaW1wb3J0IHsgQmxvZyB9IGZyb20gJy4vc2VydmljZXMvYmxvZy9ibG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnJva2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9icm9rZXIvYnJva2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tICcuL3NlcnZpY2VzL2NhY2hlL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudFNlc3Npb25SZXNvbHZlciB9IGZyb20gJy4vc2VydmljZXMvYXV0aGVudGljYXRpb24vY3VycmVudC1zZXNzaW9uLnJlc29sdmVyJztcbmltcG9ydCB7IERhc2hib2FyZCB9IGZyb20gJy4vc2VydmljZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVzIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWxlcy9maWxlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVzQnJva2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWxlcy9maWxlcy1icm9rZXIuc2VydmljZSc7XG5pbXBvcnQgeyBHb29nbGVtYXBzIH0gZnJvbSAnLi9zZXJ2aWNlcy9nb29nbGVtYXBzL2dvb2dsZW1hcHMuc2VydmljZSc7XG5pbXBvcnQgeyBHb29nbGV0cmFuc2xhdGUgfSBmcm9tICcuL3NlcnZpY2VzL2dvb2dsZXRyYW5zbGF0ZS9nb29nbGV0cmFuc2xhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ3VzdG9tSW50ZXJjZXB0b3IgfSBmcm9tICcuL3NlcnZpY2VzL2h0dHAtaW50ZXJjZXB0b3IvaHR0cC1pbnRlcmNlcHRvci5zZXJ2aWNlJztcbmltcG9ydCB7IFBsYXRmb3JtU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcGxhdGZvcm0vcGxhdGZvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2FkaW5nLWJhci9sb2FkaW5nLWJhci5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2F0aW9ucyB9IGZyb20gJy4vc2VydmljZXMvbG9jYXRpb25zL2xvY2F0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IExvb3BiYWNrIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb29wYmFjay9sb29wYmFjay5zZXJ2aWNlJztcbmltcG9ydCB7IE1pc3Npb25kZXNjcmlwdGlvbnMgfSBmcm9tICcuL3NlcnZpY2VzL21pc3Npb25kZXNjcmlwdGlvbnMvbWlzc2lvbmRlc2NyaXB0aW9ucy5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVscyB9IGZyb20gJy4vc2VydmljZXMvbW9kZWxzL21vZGVscy5zZXJ2aWNlJztcbmltcG9ydCB7IFByaW50IH0gZnJvbSAnLi9zZXJ2aWNlcy9wcmludC9wcmludC5zZXJ2aWNlJztcbmltcG9ydCB7IFB1c2ggfSBmcm9tICcuL3NlcnZpY2VzL3B1c2gvcHVzaC5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RvciB9IGZyb20gJy4vc2VydmljZXMvcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IFNlY3VyaXR5IH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWN1cml0eS9zZWN1cml0eS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuL3NlcnZpY2VzL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNtYXJ0bG9jIH0gZnJvbSAnLi9zZXJ2aWNlcy9zbWFydGxvYy9zbWFydGxvYy5zZXJ2aWNlJztcbmltcG9ydCB7IFRlbmFudHMgfSBmcm9tICcuL3NlcnZpY2VzL3RlbmFudHMvdGVuYW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFVuc3BsYXNoIH0gZnJvbSAnLi9zZXJ2aWNlcy91bnNwbGFzaC91bnNwbGFzaC5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJzIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2Vycy91c2Vycy5zZXJ2aWNlJztcbmltcG9ydCB7IFZlcnNpb24gfSBmcm9tICcuL3NlcnZpY2VzL3ZlcnNpb24vdmVyc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFdvcmtwbGFjZSB9IGZyb20gJy4vc2VydmljZXMvd29ya3BsYWNlL3dvcmtwbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IFhsc3ggfSBmcm9tICcuL3NlcnZpY2VzL3hsc3gveGxzeC5zZXJ2aWNlJztcbmxldCBTRVJWSUNFUyA9IFtcbiAgQWxnb3JpdGhtcywgLy9cbiAgQXV0aGVudGljYXRpb24sXG4gIEF1dGhlbnRpY2F0aW9uR3VhcmQsXG4gIEJhY2t1cFNlcnZpY2UsXG4gIEJveCxcbiAgQmxvZyxcbiAgQnJva2VyLFxuICBDYW5EZWFjdGl2YXRlR3VhcmQsXG4gIENhY2hlLFxuICBDb25maWcsXG4gIEN1cnJlbnRTZXNzaW9uUmVzb2x2ZXIsXG4gIERhc2hib2FyZCxcbiAgRmlsZXMsXG4gIEZpbGVzQnJva2VyLFxuICBHb29nbGVtYXBzLFxuICBHb29nbGV0cmFuc2xhdGUsXG4gIEh0dHBDdXN0b21JbnRlcmNlcHRvcixcbiAgUGxhdGZvcm1TZXJ2aWNlLFxuICBMb2FkaW5nQmFyLFxuICBMb2NhdGlvbnMsXG4gIExvb3BiYWNrLFxuICBNaXNzaW9uZGVzY3JpcHRpb25zLFxuICBNb2RlbHMsXG4gIFByaW50LFxuICBQdXNoLFxuICBSZXF1ZXN0b3IsXG4gIFNlY3VyaXR5LFxuICBTZXNzaW9uLFxuICBTbWFydGxvYyxcbiAgVGVuYW50cyxcbiAgVW5zcGxhc2gsXG4gIFVzZXJzLFxuICBWZXJzaW9uLFxuICBXb3JrcGxhY2UsXG4gIFhsc3hcbl07XG5cbmltcG9ydCB7IEZpbHRlclBpcGUgfSBmcm9tICcuL3BpcGVzL2ZpbHRlci9maWx0ZXIucGlwZSc7XG5cbmxldCBQSVBFUyA9IFtGaWx0ZXJQaXBlXTtcblxuaW1wb3J0IHsgRmlsZVRyYW5zZmVyIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlLXRyYW5zZmVyL25neCc7XG5pbXBvcnQgeyBEb2N1bWVudFZpZXdlciB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZG9jdW1lbnQtdmlld2VyL25neCc7XG5pbXBvcnQgeyBEZXZpY2UgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2RldmljZS9uZ3gnO1xuaW1wb3J0IHsgRmlsZSBhcyBGaWxlTmF0aXZlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlL25neCc7XG5pbXBvcnQgeyBGaWxlT3BlbmVyIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlLW9wZW5lci9uZ3gnO1xuaW1wb3J0IHsgT25lU2lnbmFsIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9vbmVzaWduYWwvbmd4JztcbmltcG9ydCB7IFB1c2ggYXMgUHVzaE5hdGl2ZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvcHVzaC9uZ3gnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFsuLi5QSVBFU10sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFRyYW5zbGF0ZU1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtDb21tb25Nb2R1bGUsIFRyYW5zbGF0ZU1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgLi4uUElQRVNdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFDb3JlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlndXJlZFByb3ZpZGVyczogQXJyYXk8UHJvdmlkZXI+ID0gW10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERhdGFDb3JlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIC4uLlNFUlZJQ0VTLFxuICAgICAgICAuLi5jb25maWd1cmVkUHJvdmlkZXJzLFxuICAgICAgICBGaWxlVHJhbnNmZXIsXG4gICAgICAgIERvY3VtZW50Vmlld2VyLFxuICAgICAgICBEZXZpY2UsXG4gICAgICAgIEZpbGVPcGVuZXIsXG4gICAgICAgIE9uZVNpZ25hbCxcbiAgICAgICAgUHVzaE5hdGl2ZSxcbiAgICAgICAgRmlsZU5hdGl2ZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgICAgIHVzZUNsYXNzOiBIdHRwQ3VzdG9tSW50ZXJjZXB0b3IsXG4gICAgICAgICAgZGVwczogW0NvbmZpZywgTmV0d29yaywgTG9nXSxcbiAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19