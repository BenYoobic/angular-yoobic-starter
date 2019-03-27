/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Authentication } from './authentication.service';
import { Requestor } from '../requestor/requestor.service';
export class AuthenticationGuard {
    /**
     * @param {?} authentication
     */
    constructor(authentication) {
        this.authentication = authentication;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        /** @type {?} */
        let retVal = false;
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
    }
}
AuthenticationGuard.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthenticationGuard.ctorParameters = () => [
    { type: Authentication }
];
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
export class CanDeactivateGuard {
    /**
     * @param {?} component
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canDeactivate(component, route, state) {
        return component && component.canDeactivate ? component.canDeactivate(component, route, state) : true;
    }
}
CanDeactivateGuard.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24uZ3VhcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUkzRCxNQUFNLE9BQU8sbUJBQW1COzs7O0lBQzlCLFlBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUFHLENBQUM7Ozs7OztJQUV0RCxXQUFXLENBQUMsSUFBNEIsRUFBRSxLQUEwQjs7WUFDOUQsTUFBTSxHQUFHLEtBQUs7UUFDbEIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3BDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNuQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDNUY7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNmO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUM3RSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2FBQzlFO1NBQ0Y7YUFBTTtZQUNMLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDckQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7WUFuQkYsVUFBVTs7OztZQUpGLGNBQWM7Ozs7Ozs7SUFNVCw2Q0FBc0M7Ozs7O0FBb0JwRCw0Q0FFQzs7O0lBREMsK0NBQStJOztBQUlqSixNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7O0lBQzdCLGFBQWEsQ0FBQyxTQUFpQyxFQUFFLEtBQTZCLEVBQUUsS0FBMEI7UUFDeEcsT0FBTyxTQUFTLElBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDeEcsQ0FBQzs7O1lBSkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBDYW5EZWFjdGl2YXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlcXVlc3RvciB9IGZyb20gJy4uL3JlcXVlc3Rvci9yZXF1ZXN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbkd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhlbnRpY2F0aW9uOiBBdXRoZW50aWNhdGlvbikge31cblxuICBjYW5BY3RpdmF0ZShuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xuICAgIGxldCByZXRWYWwgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5hdXRoZW50aWNhdGlvbi5pc0xvZ2dlZEluKCkpIHtcbiAgICAgIGlmIChuZXh0LmRhdGEgJiYgbmV4dC5kYXRhWydyb2xlcyddKSB7XG4gICAgICAgIHJldFZhbCA9IHRoaXMuYXV0aGVudGljYXRpb24uaGFzUm9sZXMobmV4dC5kYXRhWydyb2xlcyddKSB8fCB0aGlzLmF1dGhlbnRpY2F0aW9uLmlzQWRtaW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldFZhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAobmV4dC5kYXRhICYmIG5leHQuZGF0YVsnZXhjbHVkZWRSb2xlcyddICYmICF0aGlzLmF1dGhlbnRpY2F0aW9uLmlzQWRtaW4oKSkge1xuICAgICAgICByZXRWYWwgPSByZXRWYWwgJiYgIXRoaXMuYXV0aGVudGljYXRpb24uaGFzUm9sZXMobmV4dC5kYXRhWydleGNsdWRlZFJvbGVzJ10pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBSZXF1ZXN0b3IudW5hdXRob3JpemVkRW1pdHRlci5lbWl0KCdub3QgbG9nZ2VkIGluJyk7XG4gICAgfVxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYW5Db21wb25lbnREZWFjdGl2YXRlIHtcbiAgY2FuRGVhY3RpdmF0ZTogKGNvbXBvbmVudDogQ2FuQ29tcG9uZW50RGVhY3RpdmF0ZSwgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiBib29sZWFuIHwgT2JzZXJ2YWJsZTxib29sZWFuPjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbkRlYWN0aXZhdGVHdWFyZCBpbXBsZW1lbnRzIENhbkRlYWN0aXZhdGU8Q2FuQ29tcG9uZW50RGVhY3RpdmF0ZT4ge1xuICBjYW5EZWFjdGl2YXRlKGNvbXBvbmVudDogQ2FuQ29tcG9uZW50RGVhY3RpdmF0ZSwgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB8IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb21wb25lbnQgJiYgY29tcG9uZW50LmNhbkRlYWN0aXZhdGUgPyBjb21wb25lbnQuY2FuRGVhY3RpdmF0ZShjb21wb25lbnQsIHJvdXRlLCBzdGF0ZSkgOiB0cnVlO1xuICB9XG59XG4iXX0=