/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Authentication } from './authentication.service';
import { Requestor } from '../requestor/requestor.service';
var AuthenticationGuard = /** @class */ (function () {
    function AuthenticationGuard(authentication) {
        this.authentication = authentication;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    AuthenticationGuard.prototype.canActivate = /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    function (next, state) {
        /** @type {?} */
        var retVal = false;
        if (this.authentication.isLoggedIn()) {
            if (next.data && next.data['roles']) {
                retVal = this.authentication.hasRoles(next.data['roles']) || this.authentication.isAdmin();
            }
            else {
                retVal = true;
            }
            if (next.data && next.data['excludedRoles'] && !this.authentication.isAdmin()) {
                retVal = retVal && !this.authentication.hasRoles(next.data['excludedRoles']);
            }
        }
        else {
            Requestor.unauthorizedEmitter.emit('not logged in');
        }
        return retVal;
    };
    AuthenticationGuard.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthenticationGuard.ctorParameters = function () { return [
        { type: Authentication }
    ]; };
    return AuthenticationGuard;
}());
export { AuthenticationGuard };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthenticationGuard.prototype.authentication;
}
/**
 * @record
 */
export function CanComponentDeactivate() { }
if (false) {
    /** @type {?} */
    CanComponentDeactivate.prototype.canDeactivate;
}
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard() {
    }
    /**
     * @param {?} component
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    CanDeactivateGuard.prototype.canDeactivate = /**
     * @param {?} component
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (component, route, state) {
        return component && component.canDeactivate ? component.canDeactivate(component, route, state) : true;
    };
    CanDeactivateGuard.decorators = [
        { type: Injectable }
    ];
    return CanDeactivateGuard;
}());
export { CanDeactivateGuard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uZ3VhcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUczRDtJQUVFLDZCQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBRyxDQUFDOzs7Ozs7SUFFdEQseUNBQVc7Ozs7O0lBQVgsVUFBWSxJQUE0QixFQUFFLEtBQTBCOztZQUM5RCxNQUFNLEdBQUcsS0FBSztRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ25DLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM1RjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzdFLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDOUU7U0FDRjthQUFNO1lBQ0wsU0FBUyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2dCQW5CRixVQUFVOzs7O2dCQUpGLGNBQWM7O0lBd0J2QiwwQkFBQztDQUFBLEFBcEJELElBb0JDO1NBbkJZLG1CQUFtQjs7Ozs7O0lBQ2xCLDZDQUFzQzs7Ozs7QUFvQnBELDRDQUVDOzs7SUFEQywrQ0FBK0k7O0FBR2pKO0lBQUE7SUFLQSxDQUFDOzs7Ozs7O0lBSEMsMENBQWE7Ozs7OztJQUFiLFVBQWMsU0FBaUMsRUFBRSxLQUE2QixFQUFFLEtBQTBCO1FBQ3hHLE9BQU8sU0FBUyxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3hHLENBQUM7O2dCQUpGLFVBQVU7O0lBS1gseUJBQUM7Q0FBQSxBQUxELElBS0M7U0FKWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgQ2FuRGVhY3RpdmF0ZSwgUm91dGVyU3RhdGVTbmFwc2hvdCwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoZW50aWNhdGlvbjogQXV0aGVudGljYXRpb24pIHt9XG5cbiAgY2FuQWN0aXZhdGUobmV4dDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHtcbiAgICBsZXQgcmV0VmFsID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuYXV0aGVudGljYXRpb24uaXNMb2dnZWRJbigpKSB7XG4gICAgICBpZiAobmV4dC5kYXRhICYmIG5leHQuZGF0YVsncm9sZXMnXSkge1xuICAgICAgICByZXRWYWwgPSB0aGlzLmF1dGhlbnRpY2F0aW9uLmhhc1JvbGVzKG5leHQuZGF0YVsncm9sZXMnXSkgfHwgdGhpcy5hdXRoZW50aWNhdGlvbi5pc0FkbWluKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXRWYWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKG5leHQuZGF0YSAmJiBuZXh0LmRhdGFbJ2V4Y2x1ZGVkUm9sZXMnXSAmJiAhdGhpcy5hdXRoZW50aWNhdGlvbi5pc0FkbWluKCkpIHtcbiAgICAgICAgcmV0VmFsID0gcmV0VmFsICYmICF0aGlzLmF1dGhlbnRpY2F0aW9uLmhhc1JvbGVzKG5leHQuZGF0YVsnZXhjbHVkZWRSb2xlcyddKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgUmVxdWVzdG9yLnVuYXV0aG9yaXplZEVtaXR0ZXIuZW1pdCgnbm90IGxvZ2dlZCBpbicpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FuQ29tcG9uZW50RGVhY3RpdmF0ZSB7XG4gIGNhbkRlYWN0aXZhdGU6IChjb21wb25lbnQ6IENhbkNvbXBvbmVudERlYWN0aXZhdGUsIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkgPT4gYm9vbGVhbiB8IE9ic2VydmFibGU8Ym9vbGVhbj47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYW5EZWFjdGl2YXRlR3VhcmQgaW1wbGVtZW50cyBDYW5EZWFjdGl2YXRlPENhbkNvbXBvbmVudERlYWN0aXZhdGU+IHtcbiAgY2FuRGVhY3RpdmF0ZShjb21wb25lbnQ6IENhbkNvbXBvbmVudERlYWN0aXZhdGUsIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4gfCBib29sZWFuIHtcbiAgICByZXR1cm4gY29tcG9uZW50ICYmIGNvbXBvbmVudC5jYW5EZWFjdGl2YXRlID8gY29tcG9uZW50LmNhbkRlYWN0aXZhdGUoY29tcG9uZW50LCByb3V0ZSwgc3RhdGUpIDogdHJ1ZTtcbiAgfVxufVxuIl19