/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Files } from '../files/files.service';
import { Config } from '../config/config.service';
import { Models } from '../models/models.service';
import { Authentication } from '../authentication/authentication.service';
import { FormFieldType, downloadFile } from '@shared/stencil';
import { compact, sortBy, cloneDeep, uniq, get } from 'lodash-es';
import { timer, of } from 'rxjs';
import { concatMap, filter, take, catchError } from 'rxjs/operators';
var Print = /** @class */ (function () {
    function Print(rq, config, authentication, files) {
        this.rq = rq;
        this.config = config;
        this.authentication = authentication;
        this.files = files;
        this.excludedDashboardColumns = ['validated', 'validatedBy', 'owner.username', 'creator.username', 'user.username'];
    }
    /**
     * @param {?} collectionName
     * @param {?} columns
     * @param {?} query
     * @param {?} subQuery
     * @param {?} aggregateOptions
     * @param {?} type
     * @param {?} campaignFields
     * @param {?=} filename
     * @param {?=} progress
     * @return {?}
     */
    Print.prototype.printToMapping = /**
     * @param {?} collectionName
     * @param {?} columns
     * @param {?} query
     * @param {?} subQuery
     * @param {?} aggregateOptions
     * @param {?} type
     * @param {?} campaignFields
     * @param {?=} filename
     * @param {?=} progress
     * @return {?}
     */
    function (collectionName, columns, query, subQuery, aggregateOptions, type, campaignFields, filename, progress) {
        var _this = this;
        /** @type {?} */
        var publicCollectionName = Models.getPublicCollectionName(collectionName);
        /** @type {?} */
        var url = this.config.publicApiUrl + publicCollectionName + '/export';
        type = type === 'xlsx' ? 'xlsx' : 'csv';
        //query.limit = 25500;
        if (subQuery) {
            query.subQuery = subQuery;
        }
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        query.include = model.include;
        /** @type {?} */
        var exportColumns = sortBy(cloneDeep(columns.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return !c.suppressExport; }))), (/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.exportOrder || 100; })).map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (c.field) {
                c.field = c.field.replace(/\?/g, '');
            }
            return c;
        }));
        if (this.authentication.isDashboard()) {
            exportColumns = exportColumns.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.excludedDashboardColumns.indexOf(c.field) < 0; }));
        }
        //let mime = type === 'csv' ? 'text/plain' : 'application/xlsx';
        filename = this.files.cleanFileName(filename || publicCollectionName) + this.rq.getFilenameSuffix() + '.' + type;
        /** @type {?} */
        var cacheQuery = {};
        if (campaignFields && campaignFields.length > 0) {
            /** @type {?} */
            var catalogs = uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.type === FormFieldType.catalog; })).map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.catalog; })));
            if (catalogs.length > 0) {
                cacheQuery.products = { where: { catalogRef: { inq: catalogs } } };
            }
            /** @type {?} */
            var collectionNames = compact(uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.type === FormFieldType.autocomplete; })).map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.collectionName; }))));
            if (collectionNames.length > 0) {
                cacheQuery.custommodels = { where: { name: { inq: collectionNames } }, cacheKey: 'name' };
            }
        }
        query = cloneDeep(query);
        delete query.fields;
        return this.rq
            .get(url, false, null, [{ name: 'filter', value: JSON.stringify(query) }, { name: 'type', value: type === 'xlsx' ? 'excel' : 'csv' }]) //r.token
            .toPromise()
            .then((/**
         * @param {?} ret
         * @return {?}
         */
        function (ret) {
            if (ret._id) {
                return timer(1000, 500)
                    .pipe(concatMap((/**
                 * @return {?}
                 */
                function () {
                    return _this.rq.get(_this.config.publicApiUrl + 'jobs/' + ret._id, false, null).pipe(catchError((/**
                     * @return {?}
                     */
                    function () {
                        return of({});
                    })));
                })))
                    .pipe(filter((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) {
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
                function (res) {
                    /** @type {?} */
                    var fileUrl = get(res, 'data.output.data.download_url');
                    if (fileUrl) {
                        return downloadFile(fileUrl, filename);
                    }
                }));
            }
        }));
    };
    /**
     * @param {?} collectionName
     * @param {?} columns
     * @param {?} query
     * @param {?} subQuery
     * @param {?} aggregateOptions
     * @param {?} channel
     * @param {?} type
     * @param {?} campaignFields
     * @param {?=} filename
     * @return {?}
     */
    Print.prototype.printToSpreadsheet = /**
     * @param {?} collectionName
     * @param {?} columns
     * @param {?} query
     * @param {?} subQuery
     * @param {?} aggregateOptions
     * @param {?} channel
     * @param {?} type
     * @param {?} campaignFields
     * @param {?=} filename
     * @return {?}
     */
    function (collectionName, columns, query, subQuery, aggregateOptions, channel, type, campaignFields, filename) {
        var _this = this;
        /** @type {?} */
        var url = this.config.apiUrl + 'print/write-spreadsheet';
        /** @type {?} */
        var fixedCollectionName = Models.fixCollectionName(collectionName);
        type = type === 'csv' ? 'csv' : 'xlsx';
        //query.limit = 25500;
        if (subQuery) {
            query.subQuery = subQuery;
        }
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        query.include = model.include;
        /** @type {?} */
        var exportColumns = sortBy(cloneDeep(columns.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return !c.suppressExport; }))), (/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.exportOrder || 100; })).map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (c.field) {
                c.field = c.field.replace(/\?/g, '');
            }
            return c;
        }));
        if (this.authentication.isDashboard()) {
            exportColumns = exportColumns.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.excludedDashboardColumns.indexOf(c.field) < 0; }));
        }
        /** @type {?} */
        var mime = type === 'csv' ? 'text/plain' : 'application/xlsx';
        filename = this.files.cleanFileName(filename || fixedCollectionName) + this.rq.getFilenameSuffix() + '.' + type;
        /** @type {?} */
        var cacheQuery = {};
        if (campaignFields && campaignFields.length > 0) {
            /** @type {?} */
            var catalogs = uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.type === FormFieldType.catalog; })).map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.catalog; })));
            if (catalogs.length > 0) {
                cacheQuery.products = { where: { catalogRef: { inq: catalogs } } };
            }
            /** @type {?} */
            var collectionNames = compact(uniq(campaignFields.filter((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.type === FormFieldType.autocomplete; })).map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.collectionName; }))));
            if (collectionNames.length > 0) {
                cacheQuery.custommodels = { where: { name: { inq: collectionNames } }, cacheKey: 'name' };
            }
        }
        /** @type {?} */
        var body = {
            collectionName: fixedCollectionName,
            columns: exportColumns,
            query: query,
            aggregateOptions: aggregateOptions,
            channel: channel,
            type: type,
            cacheQuery: cacheQuery
        };
        return this.rq.downloadFile(filename, mime, url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
    };
    Print.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Print.ctorParameters = function () { return [
        { type: Requestor },
        { type: Config },
        { type: Authentication },
        { type: Files }
    ]; };
    return Print;
}());
export { Print };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Print.prototype.excludedDashboardColumns;
    /**
     * @type {?}
     * @protected
     */
    Print.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    Print.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Print.prototype.authentication;
    /**
     * @type {?}
     * @protected
     */
    Print.prototype.files;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9wcmludC9wcmludC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRTFFLE9BQU8sRUFBK0IsYUFBYSxFQUFFLFlBQVksRUFBcUIsTUFBTSxpQkFBaUIsQ0FBQztBQUU5RyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckU7SUFJRSxlQUFzQixFQUFhLEVBQVksTUFBYyxFQUFZLGNBQThCLEVBQVksS0FBWTtRQUF6RyxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFZLFVBQUssR0FBTCxLQUFLLENBQU87UUFGckgsNkJBQXdCLEdBQWtCLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FB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QTtZQUNoQixPQUFPLFNBQUE7WUFDUCxJQUFJLE1BQUE7WUFDSixVQUFVLFlBQUE7U0FDWDtRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDL0MsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUU7WUFDL0MsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFoSUYsVUFBVTs7OztnQkFYRixTQUFTO2dCQUVULE1BQU07Z0JBRU4sY0FBYztnQkFIZCxLQUFLOztJQTJJZCxZQUFDO0NBQUEsQUFqSUQsSUFpSUM7U0FoSVksS0FBSzs7Ozs7O0lBQ2hCLHlDQUF3STs7Ozs7SUFFNUgsbUJBQXVCOzs7OztJQUFFLHVCQUF3Qjs7Ozs7SUFBRSwrQkFBd0M7Ozs7O0lBQUUsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsZXMgfSBmcm9tICcuLi9maWxlcy9maWxlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RlbHMgfSBmcm9tICcuLi9tb2RlbHMvbW9kZWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tICcuLi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi5zZXJ2aWNlJztcblxuaW1wb3J0IHsgSUZvcm1GaWVsZCwgUXVlcnksIFN1YlF1ZXJ5LCBGb3JtRmllbGRUeXBlLCBkb3dubG9hZEZpbGUsIElDb2x1bW5EZWZpbml0aW9uIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuaW1wb3J0IHsgY29tcGFjdCwgc29ydEJ5LCBjbG9uZURlZXAsIHVuaXEsIGdldCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5pbXBvcnQgeyB0aW1lciwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgZmlsdGVyLCB0YWtlLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByaW50IHtcbiAgcHJvdGVjdGVkIGV4Y2x1ZGVkRGFzaGJvYXJkQ29sdW1uczogQXJyYXk8c3RyaW5nPiA9IFsndmFsaWRhdGVkJywgJ3ZhbGlkYXRlZEJ5JywgJ293bmVyLnVzZXJuYW1lJywgJ2NyZWF0b3IudXNlcm5hbWUnLCAndXNlci51c2VybmFtZSddO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBycTogUmVxdWVzdG9yLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcsIHByb3RlY3RlZCBhdXRoZW50aWNhdGlvbjogQXV0aGVudGljYXRpb24sIHByb3RlY3RlZCBmaWxlczogRmlsZXMpIHt9XG5cbiAgcHJpbnRUb01hcHBpbmcoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgY29sdW1uczogQXJyYXk8SUZvcm1GaWVsZD4sIHF1ZXJ5OiBRdWVyeSwgc3ViUXVlcnk6IFN1YlF1ZXJ5LCBhZ2dyZWdhdGVPcHRpb25zOiBBcnJheTxhbnk+LCB0eXBlOiAnY3N2JyB8ICd4bHN4JywgY2FtcGFpZ25GaWVsZHM6IEFycmF5PElGb3JtRmllbGQ+LCBmaWxlbmFtZT86IHN0cmluZywgcHJvZ3Jlc3M/OiBFdmVudEVtaXR0ZXI8bnVtYmVyPikge1xuICAgIGxldCBwdWJsaWNDb2xsZWN0aW9uTmFtZSA9IE1vZGVscy5nZXRQdWJsaWNDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSk7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLnB1YmxpY0FwaVVybCArIHB1YmxpY0NvbGxlY3Rpb25OYW1lICsgJy9leHBvcnQnO1xuICAgIHR5cGUgPSB0eXBlID09PSAneGxzeCcgPyAneGxzeCcgOiAnY3N2JztcbiAgICAvL3F1ZXJ5LmxpbWl0ID0gMjU1MDA7XG4gICAgaWYgKHN1YlF1ZXJ5KSB7XG4gICAgICBxdWVyeS5zdWJRdWVyeSA9IHN1YlF1ZXJ5O1xuICAgIH1cblxuICAgIGxldCBtb2RlbCA9IE1vZGVscy5nZXRNb2RlbEJ5Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpO1xuICAgIHF1ZXJ5LmluY2x1ZGUgPSBtb2RlbC5pbmNsdWRlO1xuXG4gICAgbGV0IGV4cG9ydENvbHVtbnMgPSBzb3J0QnkoY2xvbmVEZWVwKGNvbHVtbnMuZmlsdGVyKGMgPT4gIWMuc3VwcHJlc3NFeHBvcnQpKSwgYyA9PiBjLmV4cG9ydE9yZGVyIHx8IDEwMCkubWFwKChjOiBhbnkpID0+IHtcbiAgICAgIGlmIChjLmZpZWxkKSB7XG4gICAgICAgIGMuZmllbGQgPSBjLmZpZWxkLnJlcGxhY2UoL1xcPy9nLCAnJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYztcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0aW9uLmlzRGFzaGJvYXJkKCkpIHtcbiAgICAgIGV4cG9ydENvbHVtbnMgPSBleHBvcnRDb2x1bW5zLmZpbHRlcihjID0+IHRoaXMuZXhjbHVkZWREYXNoYm9hcmRDb2x1bW5zLmluZGV4T2YoYy5maWVsZCkgPCAwKTtcbiAgICB9XG4gICAgLy9sZXQgbWltZSA9IHR5cGUgPT09ICdjc3YnID8gJ3RleHQvcGxhaW4nIDogJ2FwcGxpY2F0aW9uL3hsc3gnO1xuICAgIGZpbGVuYW1lID0gdGhpcy5maWxlcy5jbGVhbkZpbGVOYW1lKGZpbGVuYW1lIHx8IHB1YmxpY0NvbGxlY3Rpb25OYW1lKSArIHRoaXMucnEuZ2V0RmlsZW5hbWVTdWZmaXgoKSArICcuJyArIHR5cGU7XG4gICAgbGV0IGNhY2hlUXVlcnk6IGFueSA9IHt9O1xuICAgIGlmIChjYW1wYWlnbkZpZWxkcyAmJiBjYW1wYWlnbkZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgY2F0YWxvZ3MgPSB1bmlxKGNhbXBhaWduRmllbGRzLmZpbHRlcihmID0+IGYudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5jYXRhbG9nKS5tYXAoZiA9PiBmLmNhdGFsb2cpKTtcbiAgICAgIGlmIChjYXRhbG9ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNhY2hlUXVlcnkucHJvZHVjdHMgPSB7IHdoZXJlOiB7IGNhdGFsb2dSZWY6IHsgaW5xOiBjYXRhbG9ncyB9IH0gfTtcbiAgICAgIH1cbiAgICAgIGxldCBjb2xsZWN0aW9uTmFtZXMgPSBjb21wYWN0KHVuaXEoY2FtcGFpZ25GaWVsZHMuZmlsdGVyKGYgPT4gZi50eXBlID09PSBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSkubWFwKGYgPT4gZi5jb2xsZWN0aW9uTmFtZSkpKTtcbiAgICAgIGlmIChjb2xsZWN0aW9uTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjYWNoZVF1ZXJ5LmN1c3RvbW1vZGVscyA9IHsgd2hlcmU6IHsgbmFtZTogeyBpbnE6IGNvbGxlY3Rpb25OYW1lcyB9IH0sIGNhY2hlS2V5OiAnbmFtZScgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcXVlcnkgPSBjbG9uZURlZXAocXVlcnkpO1xuICAgIGRlbGV0ZSBxdWVyeS5maWVsZHM7XG4gICAgcmV0dXJuIHRoaXMucnFcbiAgICAgIC5nZXQodXJsLCBmYWxzZSwgbnVsbCwgW3sgbmFtZTogJ2ZpbHRlcicsIHZhbHVlOiBKU09OLnN0cmluZ2lmeShxdWVyeSkgfSwgeyBuYW1lOiAndHlwZScsIHZhbHVlOiB0eXBlID09PSAneGxzeCcgPyAnZXhjZWwnIDogJ2NzdicgfV0pIC8vci50b2tlblxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihyZXQgPT4ge1xuICAgICAgICBpZiAocmV0Ll9pZCkge1xuICAgICAgICAgIHJldHVybiB0aW1lcigxMDAwLCA1MDApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgY29uY2F0TWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ycS5nZXQodGhpcy5jb25maWcucHVibGljQXBpVXJsICsgJ2pvYnMvJyArIHJldC5faWQsIGZhbHNlLCBudWxsKS5waXBlKFxuICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih7fSk7XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyAmJiBzICYmIHMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgIHByb2dyZXNzLmVtaXQocy5wcm9ncmVzcyAqIDEwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzICYmIHMucHJvZ3Jlc3MgPT09IDE7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICBsZXQgZmlsZVVybCA9IGdldChyZXMsICdkYXRhLm91dHB1dC5kYXRhLmRvd25sb2FkX3VybCcpO1xuICAgICAgICAgICAgICBpZiAoZmlsZVVybCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb3dubG9hZEZpbGUoZmlsZVVybCwgZmlsZW5hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcmludFRvU3ByZWFkc2hlZXQoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgY29sdW1uczogQXJyYXk8SUNvbHVtbkRlZmluaXRpb24+LCBxdWVyeTogUXVlcnksIHN1YlF1ZXJ5OiBTdWJRdWVyeSwgYWdncmVnYXRlT3B0aW9uczogQXJyYXk8YW55PiwgY2hhbm5lbDogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGNhbXBhaWduRmllbGRzOiBBcnJheTxJRm9ybUZpZWxkPiwgZmlsZW5hbWU/OiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ3ByaW50L3dyaXRlLXNwcmVhZHNoZWV0JztcbiAgICBsZXQgZml4ZWRDb2xsZWN0aW9uTmFtZSA9IE1vZGVscy5maXhDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSk7XG4gICAgdHlwZSA9IHR5cGUgPT09ICdjc3YnID8gJ2NzdicgOiAneGxzeCc7XG4gICAgLy9xdWVyeS5saW1pdCA9IDI1NTAwO1xuICAgIGlmIChzdWJRdWVyeSkge1xuICAgICAgcXVlcnkuc3ViUXVlcnkgPSBzdWJRdWVyeTtcbiAgICB9XG5cbiAgICBsZXQgbW9kZWwgPSBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICBxdWVyeS5pbmNsdWRlID0gbW9kZWwuaW5jbHVkZTtcblxuICAgIGxldCBleHBvcnRDb2x1bW5zID0gc29ydEJ5KGNsb25lRGVlcChjb2x1bW5zLmZpbHRlcihjID0+ICFjLnN1cHByZXNzRXhwb3J0KSksIChjOiBhbnkpID0+IGMuZXhwb3J0T3JkZXIgfHwgMTAwKS5tYXAoKGM6IGFueSkgPT4ge1xuICAgICAgaWYgKGMuZmllbGQpIHtcbiAgICAgICAgYy5maWVsZCA9IGMuZmllbGQucmVwbGFjZSgvXFw/L2csICcnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXV0aGVudGljYXRpb24uaXNEYXNoYm9hcmQoKSkge1xuICAgICAgZXhwb3J0Q29sdW1ucyA9IGV4cG9ydENvbHVtbnMuZmlsdGVyKGMgPT4gdGhpcy5leGNsdWRlZERhc2hib2FyZENvbHVtbnMuaW5kZXhPZihjLmZpZWxkKSA8IDApO1xuICAgIH1cbiAgICBsZXQgbWltZSA9IHR5cGUgPT09ICdjc3YnID8gJ3RleHQvcGxhaW4nIDogJ2FwcGxpY2F0aW9uL3hsc3gnO1xuICAgIGZpbGVuYW1lID0gdGhpcy5maWxlcy5jbGVhbkZpbGVOYW1lKGZpbGVuYW1lIHx8IGZpeGVkQ29sbGVjdGlvbk5hbWUpICsgdGhpcy5ycS5nZXRGaWxlbmFtZVN1ZmZpeCgpICsgJy4nICsgdHlwZTtcbiAgICBsZXQgY2FjaGVRdWVyeTogYW55ID0ge307XG4gICAgaWYgKGNhbXBhaWduRmllbGRzICYmIGNhbXBhaWduRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBjYXRhbG9ncyA9IHVuaXEoY2FtcGFpZ25GaWVsZHMuZmlsdGVyKGYgPT4gZi50eXBlID09PSBGb3JtRmllbGRUeXBlLmNhdGFsb2cpLm1hcChmID0+IGYuY2F0YWxvZykpO1xuICAgICAgaWYgKGNhdGFsb2dzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY2FjaGVRdWVyeS5wcm9kdWN0cyA9IHsgd2hlcmU6IHsgY2F0YWxvZ1JlZjogeyBpbnE6IGNhdGFsb2dzIH0gfSB9O1xuICAgICAgfVxuICAgICAgbGV0IGNvbGxlY3Rpb25OYW1lcyA9IGNvbXBhY3QodW5pcShjYW1wYWlnbkZpZWxkcy5maWx0ZXIoZiA9PiBmLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlKS5tYXAoZiA9PiBmLmNvbGxlY3Rpb25OYW1lKSkpO1xuICAgICAgaWYgKGNvbGxlY3Rpb25OYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNhY2hlUXVlcnkuY3VzdG9tbW9kZWxzID0geyB3aGVyZTogeyBuYW1lOiB7IGlucTogY29sbGVjdGlvbk5hbWVzIH0gfSwgY2FjaGVLZXk6ICduYW1lJyB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBib2R5ID0ge1xuICAgICAgY29sbGVjdGlvbk5hbWU6IGZpeGVkQ29sbGVjdGlvbk5hbWUsXG4gICAgICBjb2x1bW5zOiBleHBvcnRDb2x1bW5zLFxuICAgICAgcXVlcnksXG4gICAgICBhZ2dyZWdhdGVPcHRpb25zLFxuICAgICAgY2hhbm5lbCxcbiAgICAgIHR5cGUsXG4gICAgICBjYWNoZVF1ZXJ5XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5ycS5kb3dubG9hZEZpbGUoZmlsZW5hbWUsIG1pbWUsIHVybCwge1xuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IGJvZHlcbiAgICB9KTtcbiAgfVxufVxuIl19