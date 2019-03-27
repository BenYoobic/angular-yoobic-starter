/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Files } from '../files/files.service';
import { Broker } from '../broker/broker.service';
import { Dashboard } from '../dashboard/dashboard.service';
import { Observable } from 'rxjs';
export class FilesBroker {
    /**
     * @param {?} dashboard
     * @param {?} broker
     * @param {?} files
     */
    constructor(dashboard, broker, files) {
        this.dashboard = dashboard;
        this.broker = broker;
        this.files = files;
    }
    /**
     * @return {?}
     */
    getFilesTransform() {
        return (/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (res && res.data && res.data.map) {
                res.data.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => this.updateFileIcon(f)));
            }
            return res;
        });
    }
    /**
     * @return {?}
     */
    getFilesFoldersTransformAsync() {
        return (/**
         * @param {?} res
         * @param {?} search
         * @param {?} filters
         * @param {?} start
         * @param {?} pageSize
         * @return {?}
         */
        (res, search, filters, start, pageSize) => {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                if (res && res.data && res.data.length > 0) {
                    res.data.forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => {
                        delete f.items;
                        if (f.fftype === 'file') {
                            this.updateFileIcon(f);
                        }
                    }));
                    /** @type {?} */
                    let ids = res.data.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => f.fftype === 'folder')).map((/**
                     * @param {?} folder
                     * @return {?}
                     */
                    (folder) => folder._id));
                    this.dashboard.getFolderFolderStat(ids).subscribe((/**
                     * @param {?} stats
                     * @return {?}
                     */
                    stats => {
                        res.data.forEach((/**
                         * @param {?} folder
                         * @return {?}
                         */
                        (folder) => {
                            /** @type {?} */
                            let stat = stats.find((/**
                             * @param {?} s
                             * @return {?}
                             */
                            s => s._id === folder._id));
                            /** @type {?} */
                            let value = stat ? stat.folders || 0 : 0;
                            folder.stats = [{ title: 'FOLDERS', color: 'dark', value }];
                            ((/** @type {?} */ (folder))).hasChildren = value > 0;
                        }));
                        this.dashboard.getFolderFileStat(ids, false).subscribe((/**
                         * @param {?} fileStats
                         * @return {?}
                         */
                        fileStats => {
                            res.data.forEach((/**
                             * @param {?} folder
                             * @return {?}
                             */
                            (folder) => {
                                /** @type {?} */
                                let stat = fileStats.find((/**
                                 * @param {?} s
                                 * @return {?}
                                 */
                                s => s._id === folder._id));
                                folder.stats.push({
                                    title: 'FILES',
                                    color: 'dark',
                                    value: stat ? stat.files || 0 : 0
                                });
                            }));
                            observer.next({ count: res.count, data: (/** @type {?} */ (res.data)) });
                            observer.complete();
                        }));
                    }));
                }
                else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            }));
        });
    }
    /**
     * @param {?} folderId
     * @return {?}
     */
    cleanupFolder(folderId) {
        return this.broker.deleteAll('files', { where: { folder: folderId } });
    }
    /**
     * @param {?} f
     * @return {?}
     */
    updateFileIcon(f) {
        if (this.files.isImage(f)) {
            f.imgSrc = f._downloadURL;
        }
        else if (this.files.isVideo(f)) {
            f.imgSrc = this.files.getVideoPoster(f._downloadURL);
        }
        else {
            f.icon = this.files.getIcon(f);
        }
    }
}
FilesBroker.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FilesBroker.ctorParameters = () => [
    { type: Dashboard },
    { type: Broker },
    { type: Files }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FilesBroker.prototype.dashboard;
    /**
     * @type {?}
     * @private
     */
    FilesBroker.prototype.broker;
    /**
     * @type {?}
     * @protected
     */
    FilesBroker.prototype.files;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMtYnJva2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlsZXMvZmlsZXMtYnJva2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFLM0QsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUc1QyxNQUFNLE9BQU8sV0FBVzs7Ozs7O0lBQ3RCLFlBQW9CLFNBQW9CLEVBQVUsTUFBYyxFQUFZLEtBQVk7UUFBcEUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFPO0lBQUcsQ0FBQzs7OztJQUU1RixpQkFBaUI7UUFDZjs7OztRQUFPLENBQUMsR0FBbUIsRUFBRSxFQUFFO1lBQzdCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ25DLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQzthQUMvQztZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxFQUFDO0lBQ0osQ0FBQzs7OztJQUVELDZCQUE2QjtRQUMzQjs7Ozs7Ozs7UUFBTyxDQUFDLEdBQW1CLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDL0QsT0FBTyxJ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QUFDLEVBQUM7SUFDSixDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7U0FDM0I7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDTCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7O1lBaEVGLFVBQVU7Ozs7WUFQRixTQUFTO1lBRFQsTUFBTTtZQUROLEtBQUs7Ozs7Ozs7SUFXQSxnQ0FBNEI7Ozs7O0lBQUUsNkJBQXNCOzs7OztJQUFFLDRCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRmlsZXMgfSBmcm9tICcuLi9maWxlcy9maWxlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEJyb2tlciB9IGZyb20gJy4uL2Jyb2tlci9icm9rZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmQgfSBmcm9tICcuLi9kYXNoYm9hcmQvZGFzaGJvYXJkLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBSZXNwb25zZU9iamVjdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvcmVzcG9uc2Utb2JqZWN0L3Jlc3BvbnNlLW9iamVjdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9sZGVyIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9mb2xkZXIvZm9sZGVyLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaWxlc0Jyb2tlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGFzaGJvYXJkOiBEYXNoYm9hcmQsIHByaXZhdGUgYnJva2VyOiBCcm9rZXIsIHByb3RlY3RlZCBmaWxlczogRmlsZXMpIHt9XG5cbiAgZ2V0RmlsZXNUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIChyZXM6IFJlc3BvbnNlT2JqZWN0KSA9PiB7XG4gICAgICBpZiAocmVzICYmIHJlcy5kYXRhICYmIHJlcy5kYXRhLm1hcCkge1xuICAgICAgICByZXMuZGF0YS5mb3JFYWNoKGYgPT4gdGhpcy51cGRhdGVGaWxlSWNvbihmKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gIH1cblxuICBnZXRGaWxlc0ZvbGRlcnNUcmFuc2Zvcm1Bc3luYygpIHtcbiAgICByZXR1cm4gKHJlczogUmVzcG9uc2VPYmplY3QsIHNlYXJjaCwgZmlsdGVycywgc3RhcnQsIHBhZ2VTaXplKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8UmVzcG9uc2VPYmplY3Q+KChvYnNlcnZlcjogT2JzZXJ2ZXI8UmVzcG9uc2VPYmplY3Q+KSA9PiB7XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmRhdGEgJiYgcmVzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJlcy5kYXRhLmZvckVhY2goZiA9PiB7XG4gICAgICAgICAgICBkZWxldGUgZi5pdGVtcztcbiAgICAgICAgICAgIGlmIChmLmZmdHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsZUljb24oZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGV0IGlkcyA9IHJlcy5kYXRhLmZpbHRlcihmID0+IGYuZmZ0eXBlID09PSAnZm9sZGVyJykubWFwKChmb2xkZXI6IEZvbGRlcikgPT4gZm9sZGVyLl9pZCk7XG4gICAgICAgICAgdGhpcy5kYXNoYm9hcmQuZ2V0Rm9sZGVyRm9sZGVyU3RhdChpZHMpLnN1YnNjcmliZShzdGF0cyA9PiB7XG4gICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKChmb2xkZXI6IEZvbGRlcikgPT4ge1xuICAgICAgICAgICAgICBsZXQgc3RhdCA9IHN0YXRzLmZpbmQocyA9PiBzLl9pZCA9PT0gZm9sZGVyLl9pZCk7XG4gICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHN0YXQgPyBzdGF0LmZvbGRlcnMgfHwgMCA6IDA7XG4gICAgICAgICAgICAgIGZvbGRlci5zdGF0cyA9IFt7IHRpdGxlOiAnRk9MREVSUycsIGNvbG9yOiAnZGFyaycsIHZhbHVlIH1dO1xuICAgICAgICAgICAgICAoPGFueT5mb2xkZXIpLmhhc0NoaWxkcmVuID0gdmFsdWUgPiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRhc2hib2FyZC5nZXRGb2xkZXJGaWxlU3RhdChpZHMsIGZhbHNlKS5zdWJzY3JpYmUoZmlsZVN0YXRzID0+IHtcbiAgICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoZm9sZGVyOiBGb2xkZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhdCA9IGZpbGVTdGF0cy5maW5kKHMgPT4gcy5faWQgPT09IGZvbGRlci5faWQpO1xuICAgICAgICAgICAgICAgIGZvbGRlci5zdGF0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRklMRVMnLFxuICAgICAgICAgICAgICAgICAgY29sb3I6ICdkYXJrJyxcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBzdGF0ID8gc3RhdC5maWxlcyB8fCAwIDogMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiByZXMuY291bnQsIGRhdGE6IDxhbnk+cmVzLmRhdGEgfSk7XG4gICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHsgY291bnQ6IDAsIGRhdGE6IFtdIH0pO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBjbGVhbnVwRm9sZGVyKGZvbGRlcklkKSB7XG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmRlbGV0ZUFsbCgnZmlsZXMnLCB7IHdoZXJlOiB7IGZvbGRlcjogZm9sZGVySWQgfSB9KTtcbiAgfVxuXG4gIHVwZGF0ZUZpbGVJY29uKGYpIHtcbiAgICBpZiAodGhpcy5maWxlcy5pc0ltYWdlKGYpKSB7XG4gICAgICBmLmltZ1NyYyA9IGYuX2Rvd25sb2FkVVJMO1xuICAgIH0gZWxzZSBpZiAodGhpcy5maWxlcy5pc1ZpZGVvKGYpKSB7XG4gICAgICBmLmltZ1NyYyA9IHRoaXMuZmlsZXMuZ2V0VmlkZW9Qb3N0ZXIoZi5fZG93bmxvYWRVUkwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmLmljb24gPSB0aGlzLmZpbGVzLmdldEljb24oZik7XG4gICAgfVxuICB9XG59XG4iXX0=