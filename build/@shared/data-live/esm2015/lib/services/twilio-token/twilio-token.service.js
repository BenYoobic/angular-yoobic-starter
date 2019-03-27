/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Requestor, Config } from '@shared/data-core';
import { map } from 'rxjs/operators';
export class TwilioToken {
    /**
     * @param {?} rq
     * @param {?} config
     */
    constructor(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    /**
     * @return {?}
     */
    getToken() {
        return this.rq.get(this.config.apiUrl + 'Twilio/getToken').pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        ret => {
            return ret.TwilioVideoToken;
        })));
    }
}
TwilioToken.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TwilioToken.ctorParameters = () => [
    { type: Requestor },
    { type: Config }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpbGlvLXRva2VuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWxpdmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdHdpbGlvLXRva2VuL3R3aWxpby10b2tlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE1BQU0sT0FBTyxXQUFXOzs7OztJQUN0QixZQUFvQixFQUFhLEVBQVUsTUFBYztRQUFyQyxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7Ozs7SUFFN0QsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQzdELEdBQUc7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNSLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDO1FBQzlCLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7WUFWRixVQUFVOzs7O1lBSkYsU0FBUztZQUFFLE1BQU07Ozs7Ozs7SUFNWix5QkFBcUI7Ozs7O0lBQUUsNkJBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVxdWVzdG9yLCBDb25maWcgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5cbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFR3aWxpb1Rva2VuIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBycTogUmVxdWVzdG9yLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnKSB7fVxuXG4gIGdldFRva2VuKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMucnEuZ2V0KHRoaXMuY29uZmlnLmFwaVVybCArICdUd2lsaW8vZ2V0VG9rZW4nKS5waXBlKFxuICAgICAgbWFwKHJldCA9PiB7XG4gICAgICAgIHJldHVybiByZXQuVHdpbGlvVmlkZW9Ub2tlbjtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19