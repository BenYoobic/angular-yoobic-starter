/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { map } from 'rxjs/operators';
export class Workplace {
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
        return this.config.apiUrl + 'workplace/';
    }
    /**
     * @return {?}
     */
    getAllGroups() {
        /** @type {?} */
        let url = this.apiUrl + 'getGroups';
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
        res => {
            res.data.forEach((/**
             * @param {?} g
             * @return {?}
             */
            g => (g._id = g.id)));
            return res;
        })));
    }
    /**
     * @param {?} groupIds
     * @param {?} options
     * @return {?}
     */
    postOnGroup(groupIds, options) {
        /** @type {?} */
        let url = this.apiUrl + 'post';
        return this.rq.post(url, {
            groupIds,
            options
        });
    }
}
Workplace.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Workplace.ctorParameters = () => [
    { type: Requestor },
    { type: Config }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3BsYWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvd29ya3BsYWNlL3dvcmtwbGFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE1BQU0sT0FBTyxTQUFTOzs7OztJQUtwQixZQUFvQixFQUFhLEVBQVUsTUFBYztRQUFyQyxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7Ozs7O0lBSjdELElBQVksTUFBTTtRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztJQUMzQyxDQUFDOzs7O0lBSUQsWUFBWTs7WUFDTixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEVBQUU7YUFDWCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxnQ0FBZ0M7YUFDekM7U0FDRixDQUFDO2FBQ0QsSUFBSSxDQUNILEdBQUc7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDO1lBQ3RDLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7Ozs7OztJQUVELFdBQVcsQ0FBQyxRQUF1QixFQUFFLE9BQVk7O1lBQzNDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07UUFDOUIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdkIsUUFBUTtZQUNSLE9BQU87U0FDUixDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUEvQkYsVUFBVTs7OztZQUxGLFNBQVM7WUFDVCxNQUFNOzs7Ozs7O0lBVUQsdUJBQXFCOzs7OztJQUFFLDJCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcXVlc3RvciB9IGZyb20gJy4uL3JlcXVlc3Rvci9yZXF1ZXN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV29ya3BsYWNlIHtcbiAgcHJpdmF0ZSBnZXQgYXBpVXJsKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnd29ya3BsYWNlLyc7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJxOiBSZXF1ZXN0b3IsIHByaXZhdGUgY29uZmlnOiBDb25maWcpIHt9XG5cbiAgZ2V0QWxsR3JvdXBzKCkge1xuICAgIGxldCB1cmwgPSB0aGlzLmFwaVVybCArICdnZXRHcm91cHMnO1xuICAgIHJldHVybiB0aGlzLnJxXG4gICAgICAucG9zdCh1cmwsIHtcbiAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICBsaW1pdDogMjAsXG4gICAgICAgICAgZmllbGRzOiAnaWNvbiwgbmFtZSwgY292ZXIsIGRlc2NyaXB0aW9uJ1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICAgIHJlcy5kYXRhLmZvckVhY2goZyA9PiAoZy5faWQgPSBnLmlkKSk7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwb3N0T25Hcm91cChncm91cElkczogQXJyYXk8c3RyaW5nPiwgb3B0aW9uczogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5hcGlVcmwgKyAncG9zdCc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHtcbiAgICAgIGdyb3VwSWRzLFxuICAgICAgb3B0aW9uc1xuICAgIH0pO1xuICB9XG59XG4iXX0=