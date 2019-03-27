/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Network, Log } from '@shared/common';
export class HttpCustomInterceptor {
    /**
     * @param {?} config
     * @param {?} network
     * @param {?} log
     */
    constructor(config, network, log) {
        this.config = config;
        this.network = network;
        this.log = log;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        // if (req.url && req.url.indexOf(this.config.serverUrl) >= 0) {
        //     const authReq = req.clone({ headers: req.headers.set('Yoobic-Client-Version', this.coreConfig.getAppVersion()) });
        //     return next.handle(authReq);
        // } else {
        if (this.network.isOffline() && req.url && !req.url.startsWith('./')) {
            this.log.error(req);
        }
        return next.handle(req);
        //}
    }
}
HttpCustomInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpCustomInterceptor.ctorParameters = () => [
    { type: Config },
    { type: Network },
    { type: Log }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    HttpCustomInterceptor.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    HttpCustomInterceptor.prototype.network;
    /**
     * @type {?}
     * @protected
     */
    HttpCustomInterceptor.prototype.log;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1pbnRlcmNlcHRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2h0dHAtaW50ZXJjZXB0b3IvaHR0cC1pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7OztJQUNoQyxZQUFzQixNQUFjLEVBQVksT0FBZ0IsRUFBWSxHQUFRO1FBQTlELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVksUUFBRyxHQUFILEdBQUcsQ0FBSztJQUFHLENBQUM7Ozs7OztJQUV4RixTQUFTLENBQUMsR0FBcUIsRUFBRSxJQUFpQjtRQUNoRCxnRUFBZ0U7UUFDaEUseUhBQXlIO1FBQ3pILG1DQUFtQztRQUNuQyxXQUFXO1FBRVgsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixHQUFHO0lBQ0wsQ0FBQzs7O1lBZkYsVUFBVTs7OztZQUhGLE1BQU07WUFDTixPQUFPO1lBQUUsR0FBRzs7Ozs7OztJQUlQLHVDQUF3Qjs7Ozs7SUFBRSx3Q0FBMEI7Ozs7O0lBQUUsb0NBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSW50ZXJjZXB0b3IsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBOZXR3b3JrLCBMb2cgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwQ3VzdG9tSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcsIHByb3RlY3RlZCBuZXR3b3JrOiBOZXR3b3JrLCBwcm90ZWN0ZWQgbG9nOiBMb2cpIHt9XG5cbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgLy8gaWYgKHJlcS51cmwgJiYgcmVxLnVybC5pbmRleE9mKHRoaXMuY29uZmlnLnNlcnZlclVybCkgPj0gMCkge1xuICAgIC8vICAgICBjb25zdCBhdXRoUmVxID0gcmVxLmNsb25lKHsgaGVhZGVyczogcmVxLmhlYWRlcnMuc2V0KCdZb29iaWMtQ2xpZW50LVZlcnNpb24nLCB0aGlzLmNvcmVDb25maWcuZ2V0QXBwVmVyc2lvbigpKSB9KTtcbiAgICAvLyAgICAgcmV0dXJuIG5leHQuaGFuZGxlKGF1dGhSZXEpO1xuICAgIC8vIH0gZWxzZSB7XG5cbiAgICBpZiAodGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpICYmIHJlcS51cmwgJiYgIXJlcS51cmwuc3RhcnRzV2l0aCgnLi8nKSkge1xuICAgICAgdGhpcy5sb2cuZXJyb3IocmVxKTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgLy99XG4gIH1cbn1cbiJdfQ==