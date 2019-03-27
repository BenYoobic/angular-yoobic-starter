/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Authentication } from './authentication.service';
import { Network } from '@shared/common';
import { of } from 'rxjs';
var CurrentSessionResolver = /** @class */ (function () {
    function CurrentSessionResolver(authentication, network) {
        this.authentication = authentication;
        this.network = network;
    }
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    CurrentSessionResolver.prototype.resolve = /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    function (route, state) {
        if (this.network.isOffline()) {
            return of(null);
        }
        return this.authentication.getCurrentSession();
    };
    CurrentSessionResolver.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CurrentSessionResolver.ctorParameters = function () { return [
        { type: Authentication },
        { type: Network }
    ]; };
    return CurrentSessionResolver;
}());
export { CurrentSessionResolver };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1zZXNzaW9uLnJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uL2N1cnJlbnQtc2Vzc2lvbi5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJdEM7SUFFRSxnQ0FBb0IsY0FBOEIsRUFBVSxPQUFnQjtRQUF4RCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQUcsQ0FBQzs7Ozs7O0lBRWhGLHdDQUFPOzs7OztJQUFQLFVBQVEsS0FBNkIsRUFBRSxLQUEwQjtRQUMvRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDNUIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7UUFDRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNqRCxDQUFDOztnQkFURixVQUFVOzs7O2dCQVJGLGNBQWM7Z0JBR2QsT0FBTzs7SUFlaEIsNkJBQUM7Q0FBQSxBQVZELElBVUM7U0FUWSxzQkFBc0I7Ozs7OztJQUNyQixnREFBc0M7Ozs7O0lBQUUseUNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QsIFJlc29sdmUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ3VycmVudFNlc3Npb25SZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8YW55PiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aGVudGljYXRpb246IEF1dGhlbnRpY2F0aW9uLCBwcml2YXRlIG5ldHdvcms6IE5ldHdvcmspIHt9XG5cbiAgcmVzb2x2ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPFNlc3Npb24+IHtcbiAgICBpZiAodGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpKSB7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmF1dGhlbnRpY2F0aW9uLmdldEN1cnJlbnRTZXNzaW9uKCk7XG4gIH1cbn1cbiJdfQ==