/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Requestor, Config } from '@shared/data-core';
import { map } from 'rxjs/operators';
var TwilioToken = /** @class */ (function () {
    function TwilioToken(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    /**
     * @return {?}
     */
    TwilioToken.prototype.getToken = /**
     * @return {?}
     */
    function () {
        return this.rq.get(this.config.apiUrl + 'Twilio/getToken').pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            return ret.TwilioVideoToken;
        })));
    };
    TwilioToken.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TwilioToken.ctorParameters = function () { return [
        { type: Requestor },
        { type: Config }
    ]; };
    return TwilioToken;
}());
export { TwilioToken };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TwilioToken.prototype.rq;
    /**
     * @type {?}
     * @private
     */
    TwilioToken.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpbGlvLXRva2VuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWxpdmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdHdpbGlvLXRva2VuL3R3aWxpby10b2tlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDO0lBRUUscUJBQW9CLEVBQWEsRUFBVSxNQUFjO1FBQXJDLE9BQUUsR0FBRixFQUFFLENBQVc7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQzs7OztJQUU3RCw4QkFBUTs7O0lBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUM3RCxHQUFHOzs7O1FBQUMsVUFBQSxHQUFHO1lBQ0wsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7UUFDOUIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O2dCQVZGLFVBQVU7Ozs7Z0JBSkYsU0FBUztnQkFBRSxNQUFNOztJQWUxQixrQkFBQztDQUFBLEFBWEQsSUFXQztTQVZZLFdBQVc7Ozs7OztJQUNWLHlCQUFxQjs7Ozs7SUFBRSw2QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IsIENvbmZpZyB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcblxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHdpbGlvVG9rZW4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJxOiBSZXF1ZXN0b3IsIHByaXZhdGUgY29uZmlnOiBDb25maWcpIHt9XG5cbiAgZ2V0VG9rZW4oKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5ycS5nZXQodGhpcy5jb25maWcuYXBpVXJsICsgJ1R3aWxpby9nZXRUb2tlbicpLnBpcGUoXG4gICAgICBtYXAocmV0ID0+IHtcbiAgICAgICAgcmV0dXJuIHJldC5Ud2lsaW9WaWRlb1Rva2VuO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=