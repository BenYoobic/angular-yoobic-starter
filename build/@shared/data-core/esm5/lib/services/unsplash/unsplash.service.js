/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '@shared/common';
import { Requestor } from '../requestor/requestor.service';
import { map } from 'rxjs/operators';
var Unsplash = /** @class */ (function () {
    function Unsplash(rq, coreConfig) {
        this.rq = rq;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    Unsplash.prototype.getAll = /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    function (search, skip, limit) {
        /** @type {?} */
        var url;
        if (search) {
            url = 'https://api.unsplash.com/search/photos?client_id=' + this.coreConfig.getKey('unsplashAccessKey');
            url += '&query=' + search;
            url += '&page=' + (skip / limit + 1);
            url += '&per_page=' + limit;
        }
        else {
            url = 'https://api.unsplash.com/photos?page=1&per_page=20&client_id=' + this.coreConfig.getKey('unsplashAccessKey');
        }
        return this.rq.get(url, null, null, null, true).pipe(map((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            //{
            //count: search ? ret.total : 100,
            //data:
            return (search ? ret.results : ret).map((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { return ({
                _id: r.id,
                title: r.description,
                value: r.urls.raw,
                thumb: r.urls.thumb
            }); }));
            //};
        })));
    };
    Unsplash.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Unsplash.ctorParameters = function () { return [
        { type: Requestor },
        { type: CoreConfig }
    ]; };
    return Unsplash;
}());
export { Unsplash };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Unsplash.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    Unsplash.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zcGxhc2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy91bnNwbGFzaC91bnNwbGFzaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDO0lBRUUsa0JBQXNCLEVBQWEsRUFBWSxVQUFzQjtRQUEvQyxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVksZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7Ozs7Ozs7SUFFekUseUJBQU07Ozs7OztJQUFOLFVBQU8sTUFBZSxFQUFFLElBQWEsRUFBRSxLQUFjOztZQUMvQyxHQUFHO1FBQ1AsSUFBSSxNQUFNLEVBQUU7WUFDVixHQUFHLEdBQUcsbURBQW1ELEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN4RyxHQUFHLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztZQUMxQixHQUFHLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyQyxHQUFHLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QjthQUFNO1lBQ0wsR0FBRyxHQUFHLCtEQUErRCxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDckg7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2xELEdBQUc7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDTCxHQUFHO1lBQ0gsa0NBQWtDO1lBQ2xDLE9BQU87WUFDUCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDO2dCQUM1QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLENBQUMsQ0FBQyxXQUFXO2dCQUNwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNqQixLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUMsRUFMMkMsQ0FLM0MsRUFBQyxDQUFDO1lBQ0osSUFBSTtRQUNOLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOztnQkE1QkYsVUFBVTs7OztnQkFIRixTQUFTO2dCQUZULFVBQVU7O0lBa0NuQixlQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0E1QlksUUFBUTs7Ozs7O0lBQ1Asc0JBQXVCOzs7OztJQUFFLDhCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVDb25maWcgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5cbmltcG9ydCB7IFJlcXVlc3RvciB9IGZyb20gJy4uL3JlcXVlc3Rvci9yZXF1ZXN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVbnNwbGFzaCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBycTogUmVxdWVzdG9yLCBwcm90ZWN0ZWQgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge31cblxuICBnZXRBbGwoc2VhcmNoPzogc3RyaW5nLCBza2lwPzogbnVtYmVyLCBsaW1pdD86IG51bWJlcikge1xuICAgIGxldCB1cmw7XG4gICAgaWYgKHNlYXJjaCkge1xuICAgICAgdXJsID0gJ2h0dHBzOi8vYXBpLnVuc3BsYXNoLmNvbS9zZWFyY2gvcGhvdG9zP2NsaWVudF9pZD0nICsgdGhpcy5jb3JlQ29uZmlnLmdldEtleSgndW5zcGxhc2hBY2Nlc3NLZXknKTtcbiAgICAgIHVybCArPSAnJnF1ZXJ5PScgKyBzZWFyY2g7XG4gICAgICB1cmwgKz0gJyZwYWdlPScgKyAoc2tpcCAvIGxpbWl0ICsgMSk7XG4gICAgICB1cmwgKz0gJyZwZXJfcGFnZT0nICsgbGltaXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9ICdodHRwczovL2FwaS51bnNwbGFzaC5jb20vcGhvdG9zP3BhZ2U9MSZwZXJfcGFnZT0yMCZjbGllbnRfaWQ9JyArIHRoaXMuY29yZUNvbmZpZy5nZXRLZXkoJ3Vuc3BsYXNoQWNjZXNzS2V5Jyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJxLmdldCh1cmwsIG51bGwsIG51bGwsIG51bGwsIHRydWUpLnBpcGUoXG4gICAgICBtYXAocmV0ID0+IHtcbiAgICAgICAgLy97XG4gICAgICAgIC8vY291bnQ6IHNlYXJjaCA/IHJldC50b3RhbCA6IDEwMCxcbiAgICAgICAgLy9kYXRhOlxuICAgICAgICByZXR1cm4gKHNlYXJjaCA/IHJldC5yZXN1bHRzIDogcmV0KS5tYXAociA9PiAoe1xuICAgICAgICAgIF9pZDogci5pZCxcbiAgICAgICAgICB0aXRsZTogci5kZXNjcmlwdGlvbixcbiAgICAgICAgICB2YWx1ZTogci51cmxzLnJhdyxcbiAgICAgICAgICB0aHVtYjogci51cmxzLnRodW1iXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy99O1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=