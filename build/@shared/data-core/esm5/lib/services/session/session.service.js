/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Persistent, LocalForageService } from '@shared/common';
var Session = /** @class */ (function () {
    function Session(localForage, config) {
        this.localForage = localForage;
        this.config = config;
        this.openedChannels = [];
        this.selectedMissionDescription = null;
        this.selectedLocation = null;
    }
    Object.defineProperty(Session.prototype, "apiUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.apiUrl;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} clearUser
     * @return {?}
     */
    Session.prototype.clear = /**
     * @param {?=} clearUser
     * @return {?}
     */
    function (clearUser) {
        if (clearUser === void 0) { clearUser = true; }
        if (clearUser) {
            this.token = '';
            this.user = null;
            this.userId = null;
            this.tenant = null;
            this.currencies = [];
            this.groups = [];
            this.roles = [];
            this.hideWalkthrough = false;
            this.localPendingBadges = {};
            this.debugEvent = false;
        }
        return Promise.resolve();
    };
    Session.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Session.ctorParameters = function () { return [
        { type: LocalForageService },
        { type: Config }
    ]; };
    tslib_1.__decorate([
        Persistent('login.hideWalkthrough'),
        tslib_1.__metadata("design:type", Boolean)
    ], Session.prototype, "hideWalkthrough", void 0);
    tslib_1.__decorate([
        Persistent('badges'),
        tslib_1.__metadata("design:type", Object)
    ], Session.prototype, "localPendingBadges", void 0);
    tslib_1.__decorate([
        Persistent('debugEvent'),
        tslib_1.__metadata("design:type", Boolean)
    ], Session.prototype, "debugEvent", void 0);
    return Session;
}());
export { Session };
if (false) {
    /** @type {?} */
    Session.prototype.token;
    /** @type {?} */
    Session.prototype.user;
    /** @type {?} */
    Session.prototype.userId;
    /** @type {?} */
    Session.prototype.currencies;
    /** @type {?} */
    Session.prototype.groups;
    /** @type {?} */
    Session.prototype.roles;
    /** @type {?} */
    Session.prototype.tenant;
    /** @type {?} */
    Session.prototype.photoAnnotationTranslations;
    /** @type {?} */
    Session.prototype.cameraStarted;
    /** @type {?} */
    Session.prototype.hasScandit;
    /** @type {?} */
    Session.prototype.hideWalkthrough;
    /** @type {?} */
    Session.prototype.localPendingBadges;
    /** @type {?} */
    Session.prototype.debugEvent;
    /** @type {?} */
    Session.prototype.openedChannels;
    /** @type {?} */
    Session.prototype.selectedMissionDescription;
    /** @type {?} */
    Session.prototype.selectedLocation;
    /**
     * @type {?}
     * @protected
     */
    Session.prototype.localForage;
    /**
     * @type {?}
     * @protected
     */
    Session.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR2hFO0lBc0JFLGlCQUFzQixXQUErQixFQUFZLE1BQWM7UUFBekQsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUx4RSxtQkFBYyxHQUFrQixFQUFFLENBQUM7UUFFbkMsK0JBQTBCLEdBQXVCLElBQUksQ0FBQztRQUN0RCxxQkFBZ0IsR0FBYSxJQUFJLENBQUM7SUFFeUMsQ0FBQztJQUVuRixzQkFBSSwyQkFBTTs7OztRQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7Ozs7SUFFRCx1QkFBSzs7OztJQUFMLFVBQU0sU0FBZ0I7UUFBaEIsMEJBQUEsRUFBQSxnQkFBZ0I7UUFDcEIsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7Z0JBMUNGLFVBQVU7Ozs7Z0JBSFUsa0JBQWtCO2dCQUg5QixNQUFNOztJQW1Cd0I7UUFBcEMsVUFBVSxDQUFDLHVCQUF1QixDQUFDOztvREFBaUM7SUFDL0M7UUFBckIsVUFBVSxDQUFDLFFBQVEsQ0FBQzs7dURBQW9CO0lBQ2Y7UUFBekIsVUFBVSxDQUFDLFlBQVksQ0FBQzs7K0NBQXFCO0lBNEJoRCxjQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7U0ExQ1ksT0FBTzs7O0lBQ2xCLHdCQUFxQjs7SUFDckIsdUJBQW1COztJQUNuQix5QkFBc0I7O0lBQ3RCLDZCQUFtQzs7SUFDbkMseUJBQTZCOztJQUM3Qix3QkFBNEI7O0lBQzVCLHlCQUFzQjs7SUFDdEIsOENBQXdEOztJQUN4RCxnQ0FBOEI7O0lBQzlCLDZCQUEyQjs7SUFFM0Isa0NBQXFFOztJQUNyRSxxQ0FBeUM7O0lBQ3pDLDZCQUE4Qzs7SUFFOUMsaUNBQTBDOztJQUUxQyw2Q0FBNkQ7O0lBQzdELG1DQUF5Qzs7Ozs7SUFFN0IsOEJBQXlDOzs7OztJQUFFLHlCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvdXNlci91c2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDdXJyZW5jeSB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvY3VycmVuY3kvY3VycmVuY3kuaW50ZXJmYWNlJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9sb2NhdGlvbi9sb2NhdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy90ZW5hbnQvdGVuYW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBNaXNzaW9uRGVzY3JpcHRpb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL21pc3Npb24tZGVzY3JpcHRpb24vbWlzc2lvbi1kZXNjcmlwdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUGVyc2lzdGVudCwgTG9jYWxGb3JhZ2VTZXJ2aWNlIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgSVVzZXIsIElTZXNzaW9uU2VydmljZSwgSVRyYW5zbGF0aW9uIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlc3Npb24gaW1wbGVtZW50cyBJU2Vzc2lvblNlcnZpY2Uge1xuICBwdWJsaWMgdG9rZW46IHN0cmluZztcbiAgcHVibGljIHVzZXI6IElVc2VyO1xuICBwdWJsaWMgdXNlcklkOiBzdHJpbmc7XG4gIHB1YmxpYyBjdXJyZW5jaWVzOiBBcnJheTxDdXJyZW5jeT47XG4gIHB1YmxpYyBncm91cHM6IEFycmF5PHN0cmluZz47XG4gIHB1YmxpYyByb2xlczogQXJyYXk8c3RyaW5nPjtcbiAgcHVibGljIHRlbmFudDogVGVuYW50O1xuICBwdWJsaWMgcGhvdG9Bbm5vdGF0aW9uVHJhbnNsYXRpb25zOiBBcnJheTxJVHJhbnNsYXRpb24+O1xuICBwdWJsaWMgY2FtZXJhU3RhcnRlZDogYm9vbGVhbjtcbiAgcHVibGljIGhhc1NjYW5kaXQ6IGJvb2xlYW47XG5cbiAgQFBlcnNpc3RlbnQoJ2xvZ2luLmhpZGVXYWxrdGhyb3VnaCcpIHB1YmxpYyBoaWRlV2Fsa3Rocm91Z2g6IGJvb2xlYW47XG4gIEBQZXJzaXN0ZW50KCdiYWRnZXMnKSBsb2NhbFBlbmRpbmdCYWRnZXM7XG4gIEBQZXJzaXN0ZW50KCdkZWJ1Z0V2ZW50JykgZGVidWdFdmVudDogYm9vbGVhbjtcblxuICBwdWJsaWMgb3BlbmVkQ2hhbm5lbHM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICBwdWJsaWMgc2VsZWN0ZWRNaXNzaW9uRGVzY3JpcHRpb246IE1pc3Npb25EZXNjcmlwdGlvbiA9IG51bGw7XG4gIHB1YmxpYyBzZWxlY3RlZExvY2F0aW9uOiBMb2NhdGlvbiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGxvY2FsRm9yYWdlOiBMb2NhbEZvcmFnZVNlcnZpY2UsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZykge31cblxuICBnZXQgYXBpVXJsKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5hcGlVcmw7XG4gIH1cblxuICBjbGVhcihjbGVhclVzZXIgPSB0cnVlKSB7XG4gICAgaWYgKGNsZWFyVXNlcikge1xuICAgICAgdGhpcy50b2tlbiA9ICcnO1xuICAgICAgdGhpcy51c2VyID0gbnVsbDtcbiAgICAgIHRoaXMudXNlcklkID0gbnVsbDtcbiAgICAgIHRoaXMudGVuYW50ID0gbnVsbDtcbiAgICAgIHRoaXMuY3VycmVuY2llcyA9IFtdO1xuICAgICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICAgIHRoaXMucm9sZXMgPSBbXTtcbiAgICAgIHRoaXMuaGlkZVdhbGt0aHJvdWdoID0gZmFsc2U7XG4gICAgICB0aGlzLmxvY2FsUGVuZGluZ0JhZGdlcyA9IHt9O1xuICAgICAgdGhpcy5kZWJ1Z0V2ZW50ID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuIl19