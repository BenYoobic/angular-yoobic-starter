/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Persistent, LocalForageService } from '@shared/common';
export class Session {
    /**
     * @param {?} localForage
     * @param {?} config
     */
    constructor(localForage, config) {
        this.localForage = localForage;
        this.config = config;
        this.openedChannels = [];
        this.selectedMissionDescription = null;
        this.selectedLocation = null;
    }
    /**
     * @return {?}
     */
    get apiUrl() {
        return this.config.apiUrl;
    }
    /**
     * @param {?=} clearUser
     * @return {?}
     */
    clear(clearUser = true) {
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
    }
}
Session.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Session.ctorParameters = () => [
    { type: LocalForageService },
    { type: Config }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSWhFLE1BQU0sT0FBTyxPQUFPOzs7OztJQXFCbEIsWUFBc0IsV0FBK0IsRUFBWSxNQUFjO1FBQXpELGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUFZLFdBQU0sR0FBTixNQUFNLENBQVE7UUFMeEUsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1FBRW5DLCtCQUEwQixHQUF1QixJQUFJLENBQUM7UUFDdEQscUJBQWdCLEdBQWEsSUFBSSxDQUFDO0lBRXlDLENBQUM7Ozs7SUFFbkYsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSTtRQUNwQixJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDekI7UUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7WUExQ0YsVUFBVTs7OztZQUhVLGtCQUFrQjtZQUg5QixNQUFNOztBQW1Cd0I7SUFBcEMsVUFBVSxDQUFDLHVCQUF1QixDQUFDOztnREFBaUM7QUFDL0M7SUFBckIsVUFBVSxDQUFDLFFBQVEsQ0FBQzs7bURBQW9CO0FBQ2Y7SUFBekIsVUFBVSxDQUFDLFlBQVksQ0FBQzs7MkNBQXFCOzs7SUFiOUMsd0JBQXFCOztJQUNyQix1QkFBbUI7O0lBQ25CLHlCQUFzQjs7SUFDdEIsNkJBQW1DOztJQUNuQyx5QkFBNkI7O0lBQzdCLHdCQUE0Qjs7SUFDNUIseUJBQXNCOztJQUN0Qiw4Q0FBd0Q7O0lBQ3hELGdDQUE4Qjs7SUFDOUIsNkJBQTJCOztJQUUzQixrQ0FBcUU7O0lBQ3JFLHFDQUF5Qzs7SUFDekMsNkJBQThDOztJQUU5QyxpQ0FBMEM7O0lBRTFDLDZDQUE2RDs7SUFDN0QsbUNBQXlDOzs7OztJQUU3Qiw4QkFBeUM7Ozs7O0lBQUUseUJBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy9pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy91c2VyL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1cnJlbmN5IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jdXJyZW5jeS9jdXJyZW5jeS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2xvY2F0aW9uL2xvY2F0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBUZW5hbnQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3RlbmFudC90ZW5hbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5cbmltcG9ydCB7IE1pc3Npb25EZXNjcmlwdGlvbiB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbWlzc2lvbi1kZXNjcmlwdGlvbi9taXNzaW9uLWRlc2NyaXB0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQZXJzaXN0ZW50LCBMb2NhbEZvcmFnZVNlcnZpY2UgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBJVXNlciwgSVNlc3Npb25TZXJ2aWNlLCBJVHJhbnNsYXRpb24gfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2Vzc2lvbiBpbXBsZW1lbnRzIElTZXNzaW9uU2VydmljZSB7XG4gIHB1YmxpYyB0b2tlbjogc3RyaW5nO1xuICBwdWJsaWMgdXNlcjogSVVzZXI7XG4gIHB1YmxpYyB1c2VySWQ6IHN0cmluZztcbiAgcHVibGljIGN1cnJlbmNpZXM6IEFycmF5PEN1cnJlbmN5PjtcbiAgcHVibGljIGdyb3VwczogQXJyYXk8c3RyaW5nPjtcbiAgcHVibGljIHJvbGVzOiBBcnJheTxzdHJpbmc+O1xuICBwdWJsaWMgdGVuYW50OiBUZW5hbnQ7XG4gIHB1YmxpYyBwaG90b0Fubm90YXRpb25UcmFuc2xhdGlvbnM6IEFycmF5PElUcmFuc2xhdGlvbj47XG4gIHB1YmxpYyBjYW1lcmFTdGFydGVkOiBib29sZWFuO1xuICBwdWJsaWMgaGFzU2NhbmRpdDogYm9vbGVhbjtcblxuICBAUGVyc2lzdGVudCgnbG9naW4uaGlkZVdhbGt0aHJvdWdoJykgcHVibGljIGhpZGVXYWxrdGhyb3VnaDogYm9vbGVhbjtcbiAgQFBlcnNpc3RlbnQoJ2JhZGdlcycpIGxvY2FsUGVuZGluZ0JhZGdlcztcbiAgQFBlcnNpc3RlbnQoJ2RlYnVnRXZlbnQnKSBkZWJ1Z0V2ZW50OiBib29sZWFuO1xuXG4gIHB1YmxpYyBvcGVuZWRDaGFubmVsczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gIHB1YmxpYyBzZWxlY3RlZE1pc3Npb25EZXNjcmlwdGlvbjogTWlzc2lvbkRlc2NyaXB0aW9uID0gbnVsbDtcbiAgcHVibGljIHNlbGVjdGVkTG9jYXRpb246IExvY2F0aW9uID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbG9jYWxGb3JhZ2U6IExvY2FsRm9yYWdlU2VydmljZSwgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnKSB7fVxuXG4gIGdldCBhcGlVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmFwaVVybDtcbiAgfVxuXG4gIGNsZWFyKGNsZWFyVXNlciA9IHRydWUpIHtcbiAgICBpZiAoY2xlYXJVc2VyKSB7XG4gICAgICB0aGlzLnRva2VuID0gJyc7XG4gICAgICB0aGlzLnVzZXIgPSBudWxsO1xuICAgICAgdGhpcy51c2VySWQgPSBudWxsO1xuICAgICAgdGhpcy50ZW5hbnQgPSBudWxsO1xuICAgICAgdGhpcy5jdXJyZW5jaWVzID0gW107XG4gICAgICB0aGlzLmdyb3VwcyA9IFtdO1xuICAgICAgdGhpcy5yb2xlcyA9IFtdO1xuICAgICAgdGhpcy5oaWRlV2Fsa3Rocm91Z2ggPSBmYWxzZTtcbiAgICAgIHRoaXMubG9jYWxQZW5kaW5nQmFkZ2VzID0ge307XG4gICAgICB0aGlzLmRlYnVnRXZlbnQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG4iXX0=