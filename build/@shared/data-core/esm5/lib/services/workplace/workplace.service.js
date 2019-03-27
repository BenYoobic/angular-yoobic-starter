/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { map } from 'rxjs/operators';
var Workplace = /** @class */ (function () {
    function Workplace(rq, config) {
        this.rq = rq;
        this.config = config;
    }
    Object.defineProperty(Workplace.prototype, "apiUrl", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.config.apiUrl + 'workplace/';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Workplace.prototype.getAllGroups = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.apiUrl + 'getGroups';
        return this.rq
            .post(url, {
            query: {
                limit: 20,
                fields: 'icon, name, cover, description'
            }
        })
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            res.data.forEach((/**
             * @param {?} g
             * @return {?}
             */
            function (g) { return (g._id = g.id); }));
            return res;
        })));
    };
    /**
     * @param {?} groupIds
     * @param {?} options
     * @return {?}
     */
    Workplace.prototype.postOnGroup = /**
     * @param {?} groupIds
     * @param {?} options
     * @return {?}
     */
    function (groupIds, options) {
        /** @type {?} */
        var url = this.apiUrl + 'post';
        return this.rq.post(url, {
            groupIds: groupIds,
            options: options
        });
    };
    Workplace.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Workplace.ctorParameters = function () { return [
        { type: Requestor },
        { type: Config }
    ]; };
    return Workplace;
}());
export { Workplace };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Workplace.prototype.rq;
    /**
     * @type {?}
     * @private
     */
    Workplace.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3BsYWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvd29ya3BsYWNlL3dvcmtwbGFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDO0lBTUUsbUJBQW9CLEVBQWEsRUFBVSxNQUFjO1FBQXJDLE9BQUUsR0FBRixFQUFFLENBQVc7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUo3RCxzQkFBWSw2QkFBTTs7Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTs7OztJQUlELGdDQUFZOzs7SUFBWjs7WUFDTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEVBQUU7YUFDWCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxnQ0FBZ0M7YUFDekM7U0FDRixDQUFDO2FBQ0QsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQWQsQ0FBYyxFQUFDLENBQUM7WUFDdEMsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRUQsK0JBQVc7Ozs7O0lBQVgsVUFBWSxRQUF1QixFQUFFLE9BQVk7O1lBQzNDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07UUFDOUIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdkIsUUFBUSxVQUFBO1lBQ1IsT0FBTyxTQUFBO1NBQ1IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBL0JGLFVBQVU7Ozs7Z0JBTEYsU0FBUztnQkFDVCxNQUFNOztJQW9DZixnQkFBQztDQUFBLEFBaENELElBZ0NDO1NBL0JZLFNBQVM7Ozs7OztJQUtSLHVCQUFxQjs7Ozs7SUFBRSwyQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdvcmtwbGFjZSB7XG4gIHByaXZhdGUgZ2V0IGFwaVVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYXBpVXJsICsgJ3dvcmtwbGFjZS8nO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBycTogUmVxdWVzdG9yLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnKSB7fVxuXG4gIGdldEFsbEdyb3VwcygpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5hcGlVcmwgKyAnZ2V0R3JvdXBzJztcbiAgICByZXR1cm4gdGhpcy5ycVxuICAgICAgLnBvc3QodXJsLCB7XG4gICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgbGltaXQ6IDIwLFxuICAgICAgICAgIGZpZWxkczogJ2ljb24sIG5hbWUsIGNvdmVyLCBkZXNjcmlwdGlvbidcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKGcgPT4gKGcuX2lkID0gZy5pZCkpO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcG9zdE9uR3JvdXAoZ3JvdXBJZHM6IEFycmF5PHN0cmluZz4sIG9wdGlvbnM6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHVybCA9IHRoaXMuYXBpVXJsICsgJ3Bvc3QnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7XG4gICAgICBncm91cElkcyxcbiAgICAgIG9wdGlvbnNcbiAgICB9KTtcbiAgfVxufVxuIl19