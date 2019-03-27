/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { map } from 'rxjs/operators';
import { toDate, dateParse, dateFormat, fromNow } from '@shared/stencil';
export class BackupService {
    /**
     * @param {?} rq
     * @param {?} config
     */
    constructor(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    /**
     * @private
     * @return {?}
     */
    get apiUrl() {
        return this.config.apiUrl + 'AdminDashboard/';
    }
    /**
     * @param {?=} date
     * @return {?}
     */
    getAll(date) {
        /** @type {?} */
        let url = this.apiUrl + 'listBackup';
        return this.rq
            .post(url, {
            clusterName: 'rs-ds039424',
            date: toDate(date || new Date()).toISOString()
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (res && res.map) {
                res = res
                    .map((/**
                 * @param {?} name
                 * @return {?}
                 */
                (name) => {
                    /** @type {?} */
                    let backup = { _id: name };
                    /** @type {?} */
                    let lastIndex = name.lastIndexOf('_');
                    /** @type {?} */
                    let dateStr = name.substr(lastIndex + 1).replace('.tgz', '');
                    backup.title = fromNow(dateParse(dateStr, 'YYYY-MM-DDTHHmmss.sssZ'));
                    backup.badge = dateFormat(dateParse(dateStr, 'YYYY-MM-DDTHHmmss.sssZ'), 'L LT');
                    backup.description = name;
                    return backup;
                }))
                    .reverse();
            }
            return res;
        })));
    }
    /**
     * @param {?} backupName
     * @param {?=} collections
     * @return {?}
     */
    restore(backupName, collections) {
        /** @type {?} */
        let url = this.apiUrl + 'restoreBackup ';
        return this.rq.post(url, {
            s3Key: backupName,
            collections
        });
    }
}
BackupService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BackupService.ctorParameters = () => [
    { type: Requestor },
    { type: Config }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    BackupService.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    BackupService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYmFja3VwL2JhY2t1cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd6RSxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFLeEIsWUFBc0IsRUFBYSxFQUFZLE1BQWM7UUFBdkMsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUFZLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDOzs7OztJQUpqRSxJQUFZLE1BQU07UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztJQUNoRCxDQUFDOzs7OztJQUlELE1BQU0sQ0FBQyxJQUFXOztZQUNaLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVk7UUFDcEMsT0FBTyxJQUFJLENBQUMsRUFBRTthQUNYLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxXQUFXLEVBQUUsYUFBYTtZQUMxQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFO1NBQy9DLENBQUM7YUFDRCxJQUFJLENBQ0gsR0FBRzs7OztRQUFDLENBQUMsR0FBa0IsRUFBRSxFQUFFO1lBQ3pCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEdBQUcsR0FBRyxHQUFHO3FCQUNOLEdBQUc7Ozs7Z0JBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTs7d0JBQ2hCLE1BQU0sR0FBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O3dCQUMzQixTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7O3dCQUNqQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7b0JBQzVELE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO29CQUNyRSxNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLHdCQUF3QixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ2hGLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUMxQixPQUFPLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQyxFQUFDO3FCQUNELE9BQU8sRUFBRSxDQUFDO2FBQ2Q7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBQyxDQUNILENBQUM7SUFDTixDQUFDOzs7Ozs7SUFFRCxPQUFPLENBQUMsVUFBa0IsRUFBRSxXQUEyQjs7WUFDakQsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3ZCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFdBQVc7U0FDWixDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF6Q0YsVUFBVTs7OztZQVBGLFNBQVM7WUFDVCxNQUFNOzs7Ozs7O0lBWUQsMkJBQXVCOzs7OztJQUFFLCtCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcXVlc3RvciB9IGZyb20gJy4uL3JlcXVlc3Rvci9yZXF1ZXN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyB0b0RhdGUsIGRhdGVQYXJzZSwgZGF0ZUZvcm1hdCwgZnJvbU5vdyB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYWNrdXBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBnZXQgYXBpVXJsKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnQWRtaW5EYXNoYm9hcmQvJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBycTogUmVxdWVzdG9yLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcpIHt9XG5cbiAgZ2V0QWxsKGRhdGU/OiBEYXRlKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuYXBpVXJsICsgJ2xpc3RCYWNrdXAnO1xuICAgIHJldHVybiB0aGlzLnJxXG4gICAgICAucG9zdCh1cmwsIHtcbiAgICAgICAgY2x1c3Rlck5hbWU6ICdycy1kczAzOTQyNCcsXG4gICAgICAgIGRhdGU6IHRvRGF0ZShkYXRlIHx8IG5ldyBEYXRlKCkpLnRvSVNPU3RyaW5nKClcbiAgICAgIH0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXM6IEFycmF5PHN0cmluZz4pID0+IHtcbiAgICAgICAgICBpZiAocmVzICYmIHJlcy5tYXApIHtcbiAgICAgICAgICAgIHJlcyA9IHJlc1xuICAgICAgICAgICAgICAubWFwKChuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYmFja3VwOiBhbnkgPSB7IF9pZDogbmFtZSB9O1xuICAgICAgICAgICAgICAgIGxldCBsYXN0SW5kZXggPSBuYW1lLmxhc3RJbmRleE9mKCdfJyk7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGVTdHIgPSBuYW1lLnN1YnN0cihsYXN0SW5kZXggKyAxKS5yZXBsYWNlKCcudGd6JywgJycpO1xuICAgICAgICAgICAgICAgIGJhY2t1cC50aXRsZSA9IGZyb21Ob3coZGF0ZVBhcnNlKGRhdGVTdHIsICdZWVlZLU1NLUREVEhIbW1zcy5zc3NaJykpO1xuICAgICAgICAgICAgICAgIGJhY2t1cC5iYWRnZSA9IGRhdGVGb3JtYXQoZGF0ZVBhcnNlKGRhdGVTdHIsICdZWVlZLU1NLUREVEhIbW1zcy5zc3NaJyksICdMIExUJyk7XG4gICAgICAgICAgICAgICAgYmFja3VwLmRlc2NyaXB0aW9uID0gbmFtZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmFja3VwO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAucmV2ZXJzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHJlc3RvcmUoYmFja3VwTmFtZTogc3RyaW5nLCBjb2xsZWN0aW9ucz86IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCB1cmwgPSB0aGlzLmFwaVVybCArICdyZXN0b3JlQmFja3VwICc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHtcbiAgICAgIHMzS2V5OiBiYWNrdXBOYW1lLFxuICAgICAgY29sbGVjdGlvbnNcbiAgICB9KTtcbiAgfVxufVxuIl19