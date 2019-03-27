/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import { CoreConfig } from '@shared/common';
import { ReplaySubject } from 'rxjs';
export class PlatformService {
    /**
     * @param {?} coreConfig
     */
    constructor(coreConfig) {
        this.coreConfig = coreConfig;
        this.data$ = new ReplaySubject(1, 2000);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    handler(data) {
        if (data) {
            this.data$.next(data);
        }
    }
    /**
     * @param {?=} debug
     * @return {?}
     */
    onReadyOrResume(debug = false) {
        if (this.coreConfig.isCordova() && window.Branch) {
            window.Branch.setDebug(debug);
            window.Branch.initSession().then((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                this.handler(data);
            }));
        }
    }
}
PlatformService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PlatformService.ctorParameters = () => [
    { type: CoreConfig }
];
if (false) {
    /** @type {?} */
    PlatformService.prototype.data$;
    /**
     * @type {?}
     * @private
     */
    PlatformService.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9wbGF0Zm9ybS9wbGF0Zm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdyQyxNQUFNLE9BQU8sZUFBZTs7OztJQUcxQixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRm5DLFVBQUssR0FBdUIsSUFBSSxhQUFhLENBQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXRCLENBQUM7Ozs7O0lBRTlDLE9BQU8sQ0FBQyxJQUFJO1FBQ1YsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7O0lBRUQsZUFBZSxDQUFDLEtBQUssR0FBRyxLQUFLO1FBQzNCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSTs7OztZQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7WUFuQkYsVUFBVTs7OztZQUhGLFVBQVU7Ozs7SUFLakIsZ0NBQW1FOzs7OztJQUV2RCxxQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTp2YXJpYWJsZS1uYW1lICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3JlQ29uZmlnIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGxhdGZvcm1TZXJ2aWNlIHtcbiAgcHVibGljIGRhdGEkOiBSZXBsYXlTdWJqZWN0PGFueT4gPSBuZXcgUmVwbGF5U3ViamVjdDxhbnk+KDEsIDIwMDApO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge31cblxuICBoYW5kbGVyKGRhdGEpIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdGhpcy5kYXRhJC5uZXh0KGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIG9uUmVhZHlPclJlc3VtZShkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSAmJiB3aW5kb3cuQnJhbmNoKSB7XG4gICAgICB3aW5kb3cuQnJhbmNoLnNldERlYnVnKGRlYnVnKTtcbiAgICAgIHdpbmRvdy5CcmFuY2guaW5pdFNlc3Npb24oKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZXIoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==