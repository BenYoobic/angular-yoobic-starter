/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Network, Log } from '@shared/common';
var HttpCustomInterceptor = /** @class */ (function () {
    function HttpCustomInterceptor(config, network, log) {
        this.config = config;
        this.network = network;
        this.log = log;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    HttpCustomInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        // if (req.url && req.url.indexOf(this.config.serverUrl) >= 0) {
        //     const authReq = req.clone({ headers: req.headers.set('Yoobic-Client-Version', this.coreConfig.getAppVersion()) });
        //     return next.handle(authReq);
        // } else {
        if (this.network.isOffline() && req.url && !req.url.startsWith('./')) {
            this.log.error(req);
        }
        return next.handle(req);
        //}
    };
    HttpCustomInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    HttpCustomInterceptor.ctorParameters = function () { return [
        { type: Config },
        { type: Network },
        { type: Log }
    ]; };
    return HttpCustomInterceptor;
}());
export { HttpCustomInterceptor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1pbnRlcmNlcHRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2h0dHAtaW50ZXJjZXB0b3IvaHR0cC1pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDO0lBRUUsK0JBQXNCLE1BQWMsRUFBWSxPQUFnQixFQUFZLEdBQVE7UUFBOUQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBWSxRQUFHLEdBQUgsR0FBRyxDQUFLO0lBQUcsQ0FBQzs7Ozs7O0lBRXhGLHlDQUFTOzs7OztJQUFULFVBQVUsR0FBcUIsRUFBRSxJQUFpQjtRQUNoRCxnRUFBZ0U7UUFDaEUseUhBQXlIO1FBQ3pILG1DQUFtQztRQUNuQyxXQUFXO1FBRVgsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixHQUFHO0lBQ0wsQ0FBQzs7Z0JBZkYsVUFBVTs7OztnQkFIRixNQUFNO2dCQUNOLE9BQU87Z0JBQUUsR0FBRzs7SUFrQnJCLDRCQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FmWSxxQkFBcUI7Ozs7OztJQUNwQix1Q0FBd0I7Ozs7O0lBQUUsd0NBQTBCOzs7OztJQUFFLG9DQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEludGVyY2VwdG9yLCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmV0d29yaywgTG9nIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cEN1c3RvbUludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLCBwcm90ZWN0ZWQgbmV0d29yazogTmV0d29yaywgcHJvdGVjdGVkIGxvZzogTG9nKSB7fVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIC8vIGlmIChyZXEudXJsICYmIHJlcS51cmwuaW5kZXhPZih0aGlzLmNvbmZpZy5zZXJ2ZXJVcmwpID49IDApIHtcbiAgICAvLyAgICAgY29uc3QgYXV0aFJlcSA9IHJlcS5jbG9uZSh7IGhlYWRlcnM6IHJlcS5oZWFkZXJzLnNldCgnWW9vYmljLUNsaWVudC1WZXJzaW9uJywgdGhpcy5jb3JlQ29uZmlnLmdldEFwcFZlcnNpb24oKSkgfSk7XG4gICAgLy8gICAgIHJldHVybiBuZXh0LmhhbmRsZShhdXRoUmVxKTtcbiAgICAvLyB9IGVsc2Uge1xuXG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSAmJiByZXEudXJsICYmICFyZXEudXJsLnN0YXJ0c1dpdGgoJy4vJykpIHtcbiAgICAgIHRoaXMubG9nLmVycm9yKHJlcSk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIC8vfVxuICB9XG59XG4iXX0=