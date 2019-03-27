/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Files } from '../files/files.service';
import { Broker } from '../broker/broker.service';
import { Dashboard } from '../dashboard/dashboard.service';
import { Observable } from 'rxjs';
var FilesBroker = /** @class */ (function () {
    function FilesBroker(dashboard, broker, files) {
        this.dashboard = dashboard;
        this.broker = broker;
        this.files = files;
    }
    /**
     * @return {?}
     */
    FilesBroker.prototype.getFilesTransform = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res && res.data && res.data.map) {
                res.data.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return _this.updateFileIcon(f); }));
            }
            return res;
        });
    };
    /**
     * @return {?}
     */
    FilesBroker.prototype.getFilesFoldersTransformAsync = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} res
         * @param {?} search
         * @param {?} filters
         * @param {?} start
         * @param {?} pageSize
         * @return {?}
         */
        function (res, search, filters, start, pageSize) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                if (res && res.data && res.data.length > 0) {
                    res.data.forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        delete f.items;
                        if (f.fftype === 'file') {
                            _this.updateFileIcon(f);
                        }
                    }));
                    /** @type {?} */
                    var ids_1 = res.data.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) { return f.fftype === 'folder'; })).map((/**
                     * @param {?} folder
                     * @return {?}
                     */
                    function (folder) { return folder._id; }));
                    _this.dashboard.getFolderFolderStat(ids_1).subscribe((/**
                     * @param {?} stats
                     * @return {?}
                     */
                    function (stats) {
                        res.data.forEach((/**
                         * @param {?} folder
                         * @return {?}
                         */
                        function (folder) {
                            /** @type {?} */
                            var stat = stats.find((/**
                             * @param {?} s
                             * @return {?}
                             */
                            function (s) { return s._id === folder._id; }));
                            /** @type {?} */
                            var value = stat ? stat.folders || 0 : 0;
                            folder.stats = [{ title: 'FOLDERS', color: 'dark', value: value }];
                            ((/** @type {?} */ (folder))).hasChildren = value > 0;
                        }));
                        _this.dashboard.getFolderFileStat(ids_1, false).subscribe((/**
                         * @param {?} fileStats
                         * @return {?}
                         */
                        function (fileStats) {
                            res.data.forEach((/**
                             * @param {?} folder
                             * @return {?}
                             */
                            function (folder) {
                                /** @type {?} */
                                var stat = fileStats.find((/**
                                 * @param {?} s
                                 * @return {?}
                                 */
                                function (s) { return s._id === folder._id; }));
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
    };
    /**
     * @param {?} folderId
     * @return {?}
     */
    FilesBroker.prototype.cleanupFolder = /**
     * @param {?} folderId
     * @return {?}
     */
    function (folderId) {
        return this.broker.deleteAll('files', { where: { folder: folderId } });
    };
    /**
     * @param {?} f
     * @return {?}
     */
    FilesBroker.prototype.updateFileIcon = /**
     * @param {?} f
     * @return {?}
     */
    function (f) {
        if (this.files.isImage(f)) {
            f.imgSrc = f._downloadURL;
        }
        else if (this.files.isVideo(f)) {
            f.imgSrc = this.files.getVideoPoster(f._downloadURL);
        }
        else {
            f.icon = this.files.getIcon(f);
        }
    };
    FilesBroker.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    FilesBroker.ctorParameters = function () { return [
        { type: Dashboard },
        { type: Broker },
        { type: Files }
    ]; };
    return FilesBroker;
}());
export { FilesBroker };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMtYnJva2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZmlsZXMvZmlsZXMtYnJva2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFLM0QsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUU1QztJQUVFLHFCQUFvQixTQUFvQixFQUFVLE1BQWMsRUFBWSxLQUFZO1FBQXBFLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVksVUFBSyxHQUFMLEtBQUssQ0FBTztJQUFHLENBQUM7Ozs7SUFFNUYsdUNBQWlCOzs7SUFBakI7UUFBQSxpQkFPQztRQU5DOzs7O1FBQU8sVUFBQyxHQUFtQjtZQUN6QixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNuQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7Z0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUF0QixDQUFzQixFQUFDLENBQUM7YUFDL0M7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBQztJQUNKLENBQUM7Ozs7SUFFRCxtREFBNkI7OztJQUE3QjtRQUFBLGlCQXFDQztRQXBDQzs7Ozs7Ozs7UUFBTyxVQUFDLEdBQW1CLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUTtZ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LENBQUM7UUFDTCxDQUFDLEVBQUM7SUFDSixDQUFDOzs7OztJQUVELG1DQUFhOzs7O0lBQWIsVUFBYyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7OztJQUVELG9DQUFjOzs7O0lBQWQsVUFBZSxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6QixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7U0FDM0I7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDTCxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Z0JBaEVGLFVBQVU7Ozs7Z0JBUEYsU0FBUztnQkFEVCxNQUFNO2dCQUROLEtBQUs7O0lBMEVkLGtCQUFDO0NBQUEsQUFqRUQsSUFpRUM7U0FoRVksV0FBVzs7Ozs7O0lBQ1YsZ0NBQTRCOzs7OztJQUFFLDZCQUFzQjs7Ozs7SUFBRSw0QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZpbGVzIH0gZnJvbSAnLi4vZmlsZXMvZmlsZXMuc2VydmljZSc7XG5pbXBvcnQgeyBCcm9rZXIgfSBmcm9tICcuLi9icm9rZXIvYnJva2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFzaGJvYXJkIH0gZnJvbSAnLi4vZGFzaGJvYXJkL2Rhc2hib2FyZC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUmVzcG9uc2VPYmplY3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3Jlc3BvbnNlLW9iamVjdC9yZXNwb25zZS1vYmplY3QuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvbGRlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvZm9sZGVyL2ZvbGRlci5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlsZXNCcm9rZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhc2hib2FyZDogRGFzaGJvYXJkLCBwcml2YXRlIGJyb2tlcjogQnJva2VyLCBwcm90ZWN0ZWQgZmlsZXM6IEZpbGVzKSB7fVxuXG4gIGdldEZpbGVzVHJhbnNmb3JtKCkge1xuICAgIHJldHVybiAocmVzOiBSZXNwb25zZU9iamVjdCkgPT4ge1xuICAgICAgaWYgKHJlcyAmJiByZXMuZGF0YSAmJiByZXMuZGF0YS5tYXApIHtcbiAgICAgICAgcmVzLmRhdGEuZm9yRWFjaChmID0+IHRoaXMudXBkYXRlRmlsZUljb24oZikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICB9XG5cbiAgZ2V0RmlsZXNGb2xkZXJzVHJhbnNmb3JtQXN5bmMoKSB7XG4gICAgcmV0dXJuIChyZXM6IFJlc3BvbnNlT2JqZWN0LCBzZWFyY2gsIGZpbHRlcnMsIHN0YXJ0LCBwYWdlU2l6ZSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0Pigob2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlT2JqZWN0PikgPT4ge1xuICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhICYmIHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIGYuaXRlbXM7XG4gICAgICAgICAgICBpZiAoZi5mZnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGVJY29uKGYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCBpZHMgPSByZXMuZGF0YS5maWx0ZXIoZiA9PiBmLmZmdHlwZSA9PT0gJ2ZvbGRlcicpLm1hcCgoZm9sZGVyOiBGb2xkZXIpID0+IGZvbGRlci5faWQpO1xuICAgICAgICAgIHRoaXMuZGFzaGJvYXJkLmdldEZvbGRlckZvbGRlclN0YXQoaWRzKS5zdWJzY3JpYmUoc3RhdHMgPT4ge1xuICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoZm9sZGVyOiBGb2xkZXIpID0+IHtcbiAgICAgICAgICAgICAgbGV0IHN0YXQgPSBzdGF0cy5maW5kKHMgPT4gcy5faWQgPT09IGZvbGRlci5faWQpO1xuICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBzdGF0ID8gc3RhdC5mb2xkZXJzIHx8IDAgOiAwO1xuICAgICAgICAgICAgICBmb2xkZXIuc3RhdHMgPSBbeyB0aXRsZTogJ0ZPTERFUlMnLCBjb2xvcjogJ2RhcmsnLCB2YWx1ZSB9XTtcbiAgICAgICAgICAgICAgKDxhbnk+Zm9sZGVyKS5oYXNDaGlsZHJlbiA9IHZhbHVlID4gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kYXNoYm9hcmQuZ2V0Rm9sZGVyRmlsZVN0YXQoaWRzLCBmYWxzZSkuc3Vic2NyaWJlKGZpbGVTdGF0cyA9PiB7XG4gICAgICAgICAgICAgIHJlcy5kYXRhLmZvckVhY2goKGZvbGRlcjogRm9sZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXQgPSBmaWxlU3RhdHMuZmluZChzID0+IHMuX2lkID09PSBmb2xkZXIuX2lkKTtcbiAgICAgICAgICAgICAgICBmb2xkZXIuc3RhdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ0ZJTEVTJyxcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnZGFyaycsXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogc3RhdCA/IHN0YXQuZmlsZXMgfHwgMCA6IDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoeyBjb3VudDogcmVzLmNvdW50LCBkYXRhOiA8YW55PnJlcy5kYXRhIH0pO1xuICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7IGNvdW50OiAwLCBkYXRhOiBbXSB9KTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgY2xlYW51cEZvbGRlcihmb2xkZXJJZCkge1xuICAgIHJldHVybiB0aGlzLmJyb2tlci5kZWxldGVBbGwoJ2ZpbGVzJywgeyB3aGVyZTogeyBmb2xkZXI6IGZvbGRlcklkIH0gfSk7XG4gIH1cblxuICB1cGRhdGVGaWxlSWNvbihmKSB7XG4gICAgaWYgKHRoaXMuZmlsZXMuaXNJbWFnZShmKSkge1xuICAgICAgZi5pbWdTcmMgPSBmLl9kb3dubG9hZFVSTDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmlsZXMuaXNWaWRlbyhmKSkge1xuICAgICAgZi5pbWdTcmMgPSB0aGlzLmZpbGVzLmdldFZpZGVvUG9zdGVyKGYuX2Rvd25sb2FkVVJMKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZi5pY29uID0gdGhpcy5maWxlcy5nZXRJY29uKGYpO1xuICAgIH1cbiAgfVxufVxuIl19