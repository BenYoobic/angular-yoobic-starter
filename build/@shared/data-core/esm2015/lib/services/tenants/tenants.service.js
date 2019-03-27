/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Broker } from '../broker/broker.service';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';
import { timer, of } from 'rxjs';
import { concatMap, catchError, filter, take } from 'rxjs/operators';
import { get } from 'lodash-es';
export class Tenants {
    /**
     * @param {?} rq
     * @param {?} broker
     * @param {?} config
     */
    constructor(rq, broker, config) {
        this.rq = rq;
        this.broker = broker;
        this.config = config;
    }
    /**
     * @param {?} from
     * @param {?} to
     * @param {?=} progress
     * @return {?}
     */
    clone(from, to, progress) {
        return this.rq
            .post(this.broker.getApiUrl() + 'demoManagement/CopyTenantToTenant', {
            copyFromId: from._id,
            copyToId: to._id
        })
            .toPromise()
            .then((/**
         * @param {?} ret
         * @return {?}
         */
        ret => {
            if (ret._id) {
                return timer(1000, 500)
                    .pipe(concatMap((/**
                 * @return {?}
                 */
                () => {
                    return this.rq.get(this.config.publicApiUrl + 'jobs/' + ret._id, false, null).pipe(catchError((/**
                     * @return {?}
                     */
                    () => {
                        return of({});
                    })));
                })))
                    .pipe(filter((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => {
                    if (progress && s && s.progress) {
                        progress.emit(s.progress * 100);
                    }
                    return s && s.progress === 1;
                })))
                    .pipe(take(1))
                    .toPromise()
                    .then((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => {
                    /** @type {?} */
                    let errors = get(res, 'data.output.errors');
                    /** @type {?} */
                    let data = get(res, 'data.output.data');
                    return { data, errors };
                }));
            }
        }));
    }
}
Tenants.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Tenants.ctorParameters = () => [
    { type: Requestor },
    { type: Broker },
    { type: Config }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Tenants.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    Tenants.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    Tenants.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RlbmFudHMvdGVuYW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUdsRCxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUdoQyxNQUFNLE9BQU8sT0FBTzs7Ozs7O0lBQ2xCLFlBQXNCLEVBQWEsRUFBWSxNQUFjLEVBQVksTUFBYztRQUFqRSxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBRyxDQUFDOzs7Ozs7O0lBRTNGLEtBQUssQ0FBQyxJQUFhLEVBQUUsRUFBVyxFQUFFLFFBQStCO1FBQy9ELE9BQU8sSUFBSSxDQUFDLEVBQUU7YUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxtQ0FBbUMsRUFBRTtZQUNuRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDcEIsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHO1NBQ2pCLENBQUM7YUFDRCxTQUFTLEVBQUU7YUFDWCxJQUFJOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVixJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1gsT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztxQkFDcEIsSUFBSSxDQUNILFNBQVM7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNoRixVQUFVOzs7b0JBQUMsR0FBRyxFQUFFO3dCQUNkLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNoQixDQUFDLEVBQUMsQ0FDSCxDQUFDO2dCQUNKLENBQUMsRUFBQyxDQUNIO3FCQUNBLElBQUksQ0FDSCxNQUFNOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNULElBQUksUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO3dCQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUM7cUJBQ2pDO29CQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixDQUFDLEVBQUMsQ0FDSDtxQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNiLFNBQVMsRUFBRTtxQkFDWCxJQUFJOzs7O2dCQUFDLEdBQUcsQ0FBQyxFQUFFOzt3QkFDTixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQzs7d0JBQ3ZDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDO29CQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO2dCQUMxQixDQUFDLEVBQUMsQ0FBQzthQUNOO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUF4Q0YsVUFBVTs7OztZQVJGLFNBQVM7WUFEVCxNQUFNO1lBRU4sTUFBTTs7Ozs7OztJQVNELHFCQUF1Qjs7Ozs7SUFBRSx5QkFBd0I7Ozs7O0lBQUUseUJBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm9rZXIgfSBmcm9tICcuLi9icm9rZXIvYnJva2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5cbmltcG9ydCB7IElUZW5hbnQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgdGltZXIsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGNhdGNoRXJyb3IsIGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGdldCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZW5hbnRzIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJxOiBSZXF1ZXN0b3IsIHByb3RlY3RlZCBicm9rZXI6IEJyb2tlciwgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnKSB7fVxuXG4gIGNsb25lKGZyb206IElUZW5hbnQsIHRvOiBJVGVuYW50LCBwcm9ncmVzcz86IEV2ZW50RW1pdHRlcjxudW1iZXI+KSB7XG4gICAgcmV0dXJuIHRoaXMucnFcbiAgICAgIC5wb3N0KHRoaXMuYnJva2VyLmdldEFwaVVybCgpICsgJ2RlbW9NYW5hZ2VtZW50L0NvcHlUZW5hbnRUb1RlbmFudCcsIHtcbiAgICAgICAgY29weUZyb21JZDogZnJvbS5faWQsXG4gICAgICAgIGNvcHlUb0lkOiB0by5faWRcbiAgICAgIH0pXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKHJldCA9PiB7XG4gICAgICAgIGlmIChyZXQuX2lkKSB7XG4gICAgICAgICAgcmV0dXJuIHRpbWVyKDEwMDAsIDUwMClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBjb25jYXRNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJxLmdldCh0aGlzLmNvbmZpZy5wdWJsaWNBcGlVcmwgKyAnam9icy8nICsgcmV0Ll9pZCwgZmFsc2UsIG51bGwpLnBpcGUoXG4gICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHt9KTtcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBmaWx0ZXIocyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzICYmIHMgJiYgcy5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MuZW1pdChzLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMgJiYgcy5wcm9ncmVzcyA9PT0gMTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgIGxldCBlcnJvcnMgPSBnZXQocmVzLCAnZGF0YS5vdXRwdXQuZXJyb3JzJyk7XG4gICAgICAgICAgICAgIGxldCBkYXRhID0gZ2V0KHJlcywgJ2RhdGEub3V0cHV0LmRhdGEnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3JzIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==