/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Authentication } from './authentication.service';
import { Network } from '@shared/common';
import { of } from 'rxjs';
export class CurrentSessionResolver {
    /**
     * @param {?} authentication
     * @param {?} network
     */
    constructor(authentication, network) {
        this.authentication = authentication;
        this.network = network;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    resolve(route, state) {
        if (this.network.isOffline()) {
            return of(null);
        }
        return this.authentication.getCurrentSession();
    }
}
CurrentSessionResolver.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CurrentSessionResolver.ctorParameters = () => [
    { type: Authentication },
    { type: Network }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    CurrentSessionResolver.prototype.authentication;
    /**
     * @type {?}
     * @private
     */
    CurrentSessionResolver.prototype.network;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1zZXNzaW9uLnJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uL2N1cnJlbnQtc2Vzc2lvbi5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLdEMsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFDakMsWUFBb0IsY0FBOEIsRUFBVSxPQUFnQjtRQUF4RCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQUcsQ0FBQzs7Ozs7O0lBRWhGLE9BQU8sQ0FBQyxLQUE2QixFQUFFLEtBQTBCO1FBQy9ELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM1QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtRQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ2pELENBQUM7OztZQVRGLFVBQVU7Ozs7WUFSRixjQUFjO1lBR2QsT0FBTzs7Ozs7OztJQU9GLGdEQUFzQzs7Ozs7SUFBRSx5Q0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vYXV0aGVudGljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi4vc2Vzc2lvbi9zZXNzaW9uLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCwgUmVzb2x2ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDdXJyZW50U2Vzc2lvblJlc29sdmVyIGltcGxlbWVudHMgUmVzb2x2ZTxhbnk+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoZW50aWNhdGlvbjogQXV0aGVudGljYXRpb24sIHByaXZhdGUgbmV0d29yazogTmV0d29yaykge31cblxuICByZXNvbHZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8U2Vzc2lvbj4ge1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRpb24uZ2V0Q3VycmVudFNlc3Npb24oKTtcbiAgfVxufVxuIl19