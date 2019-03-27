/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Session } from '../session/session.service';
//require('yoobic-loopback-node-sdk/client/browserify.bundle');
var Loopback = /** @class */ (function () {
    function Loopback(session) {
        this.session = session;
        this._client = ((/** @type {?} */ (window))).loopbackClient;
        if (this._client) {
            //this._client.setBaseUrl(this._config.apiUrl);
            this._client.setAccessToken(this.session.token);
        }
    }
    Object.defineProperty(Loopback.prototype, "client", {
        get: /**
         * @return {?}
         */
        function () {
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    Loopback.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Loopback.ctorParameters = function () { return [
        { type: Session }
    ]; };
    return Loopback;
}());
export { Loopback };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Loopback.prototype._client;
    /**
     * @type {?}
     * @private
     */
    Loopback.prototype.session;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9vcGJhY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sb29wYmFjay9sb29wYmFjay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFHckQ7SUFJRSxrQkFBb0IsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUY1QixZQUFPLEdBQUcsQ0FBQyxtQkFBSyxNQUFNLEVBQUEsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUc3QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBRUQsc0JBQUksNEJBQU07Ozs7UUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7T0FBQTs7Z0JBYkYsVUFBVTs7OztnQkFIRixPQUFPOztJQWlCaEIsZUFBQztDQUFBLEFBZEQsSUFjQztTQWJZLFFBQVE7Ozs7OztJQUNuQiwyQkFBK0M7Ozs7O0lBRW5DLDJCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG4vL3JlcXVpcmUoJ3lvb2JpYy1sb29wYmFjay1ub2RlLXNkay9jbGllbnQvYnJvd3NlcmlmeS5idW5kbGUnKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvb3BiYWNrIHtcbiAgcHJpdmF0ZSBfY2xpZW50ID0gKDxhbnk+d2luZG93KS5sb29wYmFja0NsaWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlc3Npb246IFNlc3Npb24pIHtcbiAgICBpZiAodGhpcy5fY2xpZW50KSB7XG4gICAgICAvL3RoaXMuX2NsaWVudC5zZXRCYXNlVXJsKHRoaXMuX2NvbmZpZy5hcGlVcmwpO1xuICAgICAgdGhpcy5fY2xpZW50LnNldEFjY2Vzc1Rva2VuKHRoaXMuc2Vzc2lvbi50b2tlbik7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNsaWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xpZW50O1xuICB9XG59XG4iXX0=