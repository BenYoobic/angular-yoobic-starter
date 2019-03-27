/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Session } from '../session/session.service';
//require('yoobic-loopback-node-sdk/client/browserify.bundle');
export class Loopback {
    /**
     * @param {?} session
     */
    constructor(session) {
        this.session = session;
        this._client = ((/** @type {?} */ (window))).loopbackClient;
        if (this._client) {
            //this._client.setBaseUrl(this._config.apiUrl);
            this._client.setAccessToken(this.session.token);
        }
    }
    /**
     * @return {?}
     */
    get client() {
        return this._client;
    }
}
Loopback.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Loopback.ctorParameters = () => [
    { type: Session }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9vcGJhY2suc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sb29wYmFjay9sb29wYmFjay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFJckQsTUFBTSxPQUFPLFFBQVE7Ozs7SUFHbkIsWUFBb0IsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUY1QixZQUFPLEdBQUcsQ0FBQyxtQkFBSyxNQUFNLEVBQUEsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUc3QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7OztZQWJGLFVBQVU7Ozs7WUFIRixPQUFPOzs7Ozs7O0lBS2QsMkJBQStDOzs7OztJQUVuQywyQkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuLy9yZXF1aXJlKCd5b29iaWMtbG9vcGJhY2stbm9kZS1zZGsvY2xpZW50L2Jyb3dzZXJpZnkuYnVuZGxlJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb29wYmFjayB7XG4gIHByaXZhdGUgX2NsaWVudCA9ICg8YW55PndpbmRvdykubG9vcGJhY2tDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXNzaW9uOiBTZXNzaW9uKSB7XG4gICAgaWYgKHRoaXMuX2NsaWVudCkge1xuICAgICAgLy90aGlzLl9jbGllbnQuc2V0QmFzZVVybCh0aGlzLl9jb25maWcuYXBpVXJsKTtcbiAgICAgIHRoaXMuX2NsaWVudC5zZXRBY2Nlc3NUb2tlbih0aGlzLnNlc3Npb24udG9rZW4pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjbGllbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsaWVudDtcbiAgfVxufVxuIl19