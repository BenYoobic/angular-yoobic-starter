/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { map } from 'rxjs/operators';
import { toDate, dateParse, dateFormat, fromNow } from '@shared/stencil';
var BackupService = /** @class */ (function () {
    function BackupService(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    Object.defineProperty(BackupService.prototype, "apiUrl", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.config.apiUrl + 'AdminDashboard/';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} date
     * @return {?}
     */
    BackupService.prototype.getAll = /**
     * @param {?=} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var url = this.apiUrl + 'listBackup';
        return this.rq
            .post(url, {
            clusterName: 'rs-ds039424',
            date: toDate(date || new Date()).toISOString()
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res && res.map) {
                res = res
                    .map((/**
                 * @param {?} name
                 * @return {?}
                 */
                function (name) {
                    /** @type {?} */
                    var backup = { _id: name };
                    /** @type {?} */
                    var lastIndex = name.lastIndexOf('_');
                    /** @type {?} */
                    var dateStr = name.substr(lastIndex + 1).replace('.tgz', '');
                    backup.title = fromNow(dateParse(dateStr, 'YYYY-MM-DDTHHmmss.sssZ'));
                    backup.badge = dateFormat(dateParse(dateStr, 'YYYY-MM-DDTHHmmss.sssZ'), 'L LT');
                    backup.description = name;
                    return backup;
                }))
                    .reverse();
            }
            return res;
        })));
    };
    /**
     * @param {?} backupName
     * @param {?=} collections
     * @return {?}
     */
    BackupService.prototype.restore = /**
     * @param {?} backupName
     * @param {?=} collections
     * @return {?}
     */
    function (backupName, collections) {
        /** @type {?} */
        var url = this.apiUrl + 'restoreBackup ';
        return this.rq.post(url, {
            s3Key: backupName,
            collections: collections
        });
    };
    BackupService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    BackupService.ctorParameters = function () { return [
        { type: Requestor },
        { type: Config }
    ]; };
    return BackupService;
}());
export { BackupService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYmFja3VwL2JhY2t1cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RTtJQU1FLHVCQUFzQixFQUFhLEVBQVksTUFBYztRQUF2QyxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFKakUsc0JBQVksaUNBQU07Ozs7O1FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTs7Ozs7SUFJRCw4QkFBTTs7OztJQUFOLFVBQU8sSUFBVzs7WUFDWixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEVBQUU7YUFDWCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsV0FBVyxFQUFFLGFBQWE7WUFDMUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRTtTQUMvQyxDQUFDO2FBQ0QsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxVQUFDLEdBQWtCO1lBQ3JCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEdBQUcsR0FBRyxHQUFHO3FCQUNOLEdBQUc7Ozs7Z0JBQUMsVUFBQyxJQUFZOzt3QkFDWixNQUFNLEdBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOzt3QkFDM0IsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDOzt3QkFDakMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO29CQUM1RCxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLHdCQUF3QixDQUFDLENBQUMsQ0FBQztvQkFDckUsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSx3QkFBd0IsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNoRixNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztvQkFDMUIsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUMsRUFBQztxQkFDRCxPQUFPLEVBQUUsQ0FBQzthQUNkO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRUQsK0JBQU87Ozs7O0lBQVAsVUFBUSxVQUFrQixFQUFFLFdBQTJCOztZQUNqRCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBZ0I7UUFDeEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdkIsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxhQUFBO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBekNGLFVBQVU7Ozs7Z0JBUEYsU0FBUztnQkFDVCxNQUFNOztJQWdEZixvQkFBQztDQUFBLEFBMUNELElBMENDO1NBekNZLGFBQWE7Ozs7OztJQUtaLDJCQUF1Qjs7Ozs7SUFBRSwrQkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgdG9EYXRlLCBkYXRlUGFyc2UsIGRhdGVGb3JtYXQsIGZyb21Ob3cgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja3VwU2VydmljZSB7XG4gIHByaXZhdGUgZ2V0IGFwaVVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYXBpVXJsICsgJ0FkbWluRGFzaGJvYXJkLyc7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcnE6IFJlcXVlc3RvciwgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnKSB7fVxuXG4gIGdldEFsbChkYXRlPzogRGF0ZSkge1xuICAgIGxldCB1cmwgPSB0aGlzLmFwaVVybCArICdsaXN0QmFja3VwJztcbiAgICByZXR1cm4gdGhpcy5ycVxuICAgICAgLnBvc3QodXJsLCB7XG4gICAgICAgIGNsdXN0ZXJOYW1lOiAncnMtZHMwMzk0MjQnLFxuICAgICAgICBkYXRlOiB0b0RhdGUoZGF0ZSB8fCBuZXcgRGF0ZSgpKS50b0lTT1N0cmluZygpXG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzOiBBcnJheTxzdHJpbmc+KSA9PiB7XG4gICAgICAgICAgaWYgKHJlcyAmJiByZXMubWFwKSB7XG4gICAgICAgICAgICByZXMgPSByZXNcbiAgICAgICAgICAgICAgLm1hcCgobmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGJhY2t1cDogYW55ID0geyBfaWQ6IG5hbWUgfTtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEluZGV4ID0gbmFtZS5sYXN0SW5kZXhPZignXycpO1xuICAgICAgICAgICAgICAgIGxldCBkYXRlU3RyID0gbmFtZS5zdWJzdHIobGFzdEluZGV4ICsgMSkucmVwbGFjZSgnLnRneicsICcnKTtcbiAgICAgICAgICAgICAgICBiYWNrdXAudGl0bGUgPSBmcm9tTm93KGRhdGVQYXJzZShkYXRlU3RyLCAnWVlZWS1NTS1ERFRISG1tc3Muc3NzWicpKTtcbiAgICAgICAgICAgICAgICBiYWNrdXAuYmFkZ2UgPSBkYXRlRm9ybWF0KGRhdGVQYXJzZShkYXRlU3RyLCAnWVlZWS1NTS1ERFRISG1tc3Muc3NzWicpLCAnTCBMVCcpO1xuICAgICAgICAgICAgICAgIGJhY2t1cC5kZXNjcmlwdGlvbiA9IG5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhY2t1cDtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnJldmVyc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICByZXN0b3JlKGJhY2t1cE5hbWU6IHN0cmluZywgY29sbGVjdGlvbnM/OiBBcnJheTxzdHJpbmc+KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5hcGlVcmwgKyAncmVzdG9yZUJhY2t1cCAnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7XG4gICAgICBzM0tleTogYmFja3VwTmFtZSxcbiAgICAgIGNvbGxlY3Rpb25zXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==