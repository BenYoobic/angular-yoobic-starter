/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Injector } from '@angular/core';
import { Cache } from '../cache/cache.service';
import { Requestor } from '../requestor/requestor.service';
import { Models } from '../models/models.service';
import { Googlemaps } from '../googlemaps/googlemaps.service';
import { Workplace } from '../workplace/workplace.service';
import { Session } from '../session/session.service';
import { Files } from '../files/files.service';
import { Box } from '../box/box.service';
import { Config } from '../config/config.service';
import { Smartloc } from '../smartloc/smartloc.service';
import { Unsplash } from '../unsplash/unsplash.service';
export { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { toDate, utc, dateAdd, startOf, cacheFile, isNullOrUndefined } from '@shared/stencil';
import { Position, CoreConfig, PromiseService, Log, LocalForageService, Network } from '@shared/common';
import { Translate } from '@shared/translate';
import { FileUploader } from 'ng2-file-upload';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { uniq, compact, get, set, assign, isArray, isString, isObject, isEmpty, flatten, forEach, concat, remove, cloneDeep, uniqBy, isEqual, intersection, orderBy, keys, map as lodashMap } from 'lodash-es';
import { Observable, forkJoin, from, of, combineLatest } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators'; //, groupBy, flatMap, reduce
//, groupBy, flatMap, reduce
var Broker = /** @class */ (function () {
    function Broker(rq, box, googlemaps, workplace, session, files, promise, coreConfig, log, network, transfer, localForage, config, injector, cache, geoloc, translate, unsplash) {
        this.rq = rq;
        this.box = box;
        this.googlemaps = googlemaps;
        this.workplace = workplace;
        this.session = session;
        this.files = files;
        this.promise = promise;
        this.coreConfig = coreConfig;
        this.log = log;
        this.network = network;
        this.transfer = transfer;
        this.localForage = localForage;
        this.config = config;
        this.injector = injector;
        this.cache = cache;
        this.geoloc = geoloc;
        this.translate = translate;
        this.unsplash = unsplash;
        this.init();
    }
    /**
     * @return {?}
     */
    Broker.prototype.init = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    Broker.prototype.getApiUrl = /**
     * @return {?}
     */
    function () {
        return this.config.apiUrl;
    };
    /**
     * @return {?}
     */
    Broker.prototype.getServerUrl = /**
     * @return {?}
     */
    function () {
        return this.config.serverUrl;
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Broker.prototype.getCollectionName = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            return 'custommodelinstances';
        }
        return collectionName;
    };
    /**
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} idAttributeName
     * @return {?}
     */
    Broker.prototype.getById = /**
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} idAttributeName
     * @return {?}
     */
    function (collectionName, id, fields, include, idAttributeName) {
        /** @type {?} */
        var query = this.getQuery(collectionName, fields, include);
        delete query.limit;
        delete query.skip;
        delete query.order;
        delete query.subQuery;
        if (this.network.isOffline()) {
            return from(this.cache.getByIdFromDatabaseCollection(collectionName, id, idAttributeName));
        }
        else if (!idAttributeName || idAttributeName === '_id') {
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + id + '?filter=' + encodeURIComponent(JSON.stringify(query));
            return this.rq.get(url);
        }
        else {
            /** @type {?} */
            var filters = [[{ field: idAttributeName, operator: { _id: 'eq' }, value: id }]];
            return this.getAll(collectionName, fields, include, null, filters).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                if (res.data && res.data.length > 0) {
                    return res.data[0];
                }
                return null;
            })));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.create = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        /** @type {?} */
        var url = this.config.apiUrl + this.getCollectionName(collectionName);
        this.updateCustomModel(collectionName, entity);
        if (this.network.isOffline()) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else {
            return this.rq.post(url, entity);
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.update = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else if (collectionName === 'groups') {
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName);
            this.updateCustomModel(collectionName, entity);
            return this.rq.put(url, entity);
        }
        else {
            if (entity._id) {
                return this.patch(collectionName, entity);
            }
            else {
                return this.create(collectionName, entity);
            }
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} fields
     * @return {?}
     */
    Broker.prototype.save = /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} fields
     * @return {?}
     */
    function (collectionName, entity, fields) {
        var _this = this;
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else {
            return this.upsert(collectionName, entity).pipe(mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.getById(collectionName, res._id, fields); })));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.patch = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        if (!entity || !entity._id) {
            throw new Error('Cant patch an empty entity or an entity without an id');
        }
        this.updateCustomModel(collectionName, entity);
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity, true));
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + entity._id;
            return this.rq.patch(url, entity);
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} previousEntity
     * @param {?=} skipAcl
     * @return {?}
     */
    Broker.prototype.upsert = /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} previousEntity
     * @param {?=} skipAcl
     * @return {?}
     */
    function (collectionName, entity, previousEntity, skipAcl) {
        var _this = this;
        if (!skipAcl) {
            this.setAcl(entity, ((/** @type {?} */ (entity))).group, false, collectionName);
        }
        this.incrementTags(collectionName, entity).subscribe((/**
         * @return {?}
         */
        function () { }));
        /** @type {?} */
        var suffixs = collectionName === 'missiondatas' ? ['.value', '.edit', '.value.fieldValue'] : ['._downloadURL', '.edit'];
        /** @type {?} */
        var hasFiles = this._hasFiles(entity, suffixs);
        if (this.network.isOffline() || !hasFiles) {
            return this.update(collectionName, entity);
        }
        else {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                _this.uploadEntityFiles(entity, suffixs).then((/**
                 * @return {?}
                 */
                function () {
                    _this.update(collectionName, entity).subscribe((/**
                     * @param {?} ret
                     * @return {?}
                     */
                    function (ret) {
                        if (ret._downloadURL && _this.files.isDocument(ret._downloadURL)) {
                            _this.box.upload(ret._downloadURL).subscribe((/**
                             * @param {?} boxId
                             * @return {?}
                             */
                            function (boxId) {
                                if (boxId) {
                                    ret.boxId = boxId;
                                }
                                _this.update(collectionName, ret).subscribe((/**
                                 * @param {?} retval
                                 * @return {?}
                                 */
                                function (retval) {
                                    observer.next(retval);
                                    observer.complete();
                                }));
                            }));
                        }
                        else {
                            observer.next(ret);
                            observer.complete();
                        }
                    }));
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) { }));
            }));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entities
     * @return {?}
     */
    Broker.prototype.upsertAll = /**
     * @param {?} collectionName
     * @param {?} entities
     * @return {?}
     */
    function (collectionName, entities) {
        var _this = this;
        /** @type {?} */
        var obs = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) { return _this.upsert(collectionName, entity); }));
        return forkJoin(obs);
    };
    /**
     * @param {?} entity
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @param {?=} promisesOnly
     * @param {?=} totalOffset
     * @return {?}
     */
    Broker.prototype.uploadEntityFiles = /**
     * @param {?} entity
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @param {?=} promisesOnly
     * @param {?=} totalOffset
     * @return {?}
     */
    function (entity, suffixs, progressEmitter, tags, promisesOnly, totalOffset) {
        var _this = this;
        if (suffixs === void 0) { suffixs = []; }
        if (promisesOnly === void 0) { promisesOnly = false; }
        if (totalOffset === void 0) { totalOffset = 0; }
        /** @type {?} */
        var properties = this._getFileProperties(entity, suffixs);
        /** @type {?} */
        var count = 0;
        /** @type {?} */
        var promises = properties.map((/**
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
            /** @type {?} */
            var promise;
            /** @type {?} */
            var file = get(entity, prop);
            promise = ((/**
             * @param {?} offsetIndex
             * @param {?} total
             * @return {?}
             */
            function (offsetIndex, total) {
                return (/**
                 * @return {?}
                 */
                function () {
                    return _this.prepareUpload(file)
                        .then((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        return _this.upload(f, progressEmitter, offsetIndex, total, tags, totalOffset);
                    }))
                        .then((/**
                     * @param {?} url
                     * @return {?}
                     */
                    function (url) {
                        set(entity, prop, url);
                    }))
                        .catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) { return Promise.reject(err); }));
                });
            }))(count, properties.length);
            count += 1;
            return promise;
        }));
        if (promisesOnly) {
            return promises.length > 0 ? promises : (/** @type {?} */ ([(/**
                 * @return {?}
                 */
                function () { return Promise.resolve('empty'); })]));
        }
        return this.promise.sequential(promises);
    };
    /**
     * @param {?} entities
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @return {?}
     */
    Broker.prototype.uploadEntitiesFiles = /**
     * @param {?} entities
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @return {?}
     */
    function (entities, suffixs, progressEmitter, tags) {
        var _this = this;
        if (suffixs === void 0) { suffixs = []; }
        /** @type {?} */
        var promises = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) {
            return (/**
             * @return {?}
             */
            function () { return _this.uploadEntityFiles(entity, suffixs, progressEmitter, tags, false); });
        }));
        return this.promise.sequential(promises);
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Broker.prototype.prepareUpload = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        var _this = this;
        return this.files._requestExternalStoragePermission().then((/**
         * @return {?}
         */
        function () {
            if (_this.files.isBase64(file)) {
                return Promise.resolve(_this.files.b64toBlob(file));
            }
            else if (_this.files.isFileUri(file)) {
                return _this.files.resolveFilePath((/** @type {?} */ (file)));
            }
            else {
                return Promise.resolve(file);
            }
        }));
    };
    /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.updateAll = /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, query, entity) {
        /** @type {?} */
        var rawQuery = assign({}, query.where);
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        if (entity.group) {
            entity['_acl.groups.r'] = entity.group;
        }
        /** @type {?} */
        var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/update?where=' + encodeURIComponent(JSON.stringify(rawQuery));
        return this.rq.post(url, entity);
    };
    /**
     * @param {?} entity
     * @param {?=} group
     * @param {?=} addWrite
     * @param {?=} collectionName
     * @param {?=} users
     * @return {?}
     */
    Broker.prototype.setAcl = /**
     * @param {?} entity
     * @param {?=} group
     * @param {?=} addWrite
     * @param {?=} collectionName
     * @param {?=} users
     * @return {?}
     */
    function (entity, group, addWrite, collectionName, users) {
        if (addWrite === void 0) { addWrite = false; }
        //entity._acl = entity._acl || { groups: { r: ['admin'], w: ['admin', 'manager'] } };
        entity._acl = entity._acl || { groups: { r: [], w: [] } };
        entity._acl.creator = entity._acl && entity._acl.creator ? entity._acl.creator : this.session.user ? this.session.user._id : null;
        entity._acl.groups = entity._acl && entity._acl.groups ? entity._acl.groups : {};
        if (group) {
            entity._acl.groups.r = uniq([].concat(group).concat(entity._acl.groups.r));
        }
        entity._acl.groups.r = compact(entity._acl.groups.r);
        //entity._acl.groups.w = compact(uniq(['admin', 'manager'].concat(entity._acl.groups.w || [])));
        entity._acl.groups.w = compact(uniq([].concat(entity._acl.groups.w || [])));
        if (collectionName === 'translations' && group) {
            entity._acl.groups.r = uniq([].concat(group));
            entity._acl.groups.w = uniq([].concat(group));
        }
        if (addWrite && group) {
            entity._acl.groups.w = compact(uniq([].concat(group).concat(entity._acl.groups.w)));
        }
        if (users && users.length > 0) {
            //entity._acl.users = { r: users, w: users };
            entity._acl.groups.r = entity._acl.groups.r.concat(users);
        }
    };
    /**
     * @return {?}
     */
    Broker.prototype.getCurrentGroups = /**
     * @return {?}
     */
    function () {
        if (this.session.roles.indexOf('admin') < 0) {
            return this.session.groups;
        }
        else {
            return ['debug_v2'];
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.updateCustomModel = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            entity._modelName = collectionName;
            if (entity.location && entity.location._id) {
                entity.locationRef = entity.location._id;
            }
        }
    };
    /**
     * @param {?} file
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @param {?=} tags
     * @param {?=} totalOffset
     * @return {?}
     */
    Broker.prototype.upload = /**
     * @param {?} file
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @param {?=} tags
     * @param {?=} totalOffset
     * @return {?}
     */
    function (file, progressEmitter, offsetIndex, total, tags, totalOffset) {
        var _this = this;
        if (offsetIndex === void 0) { offsetIndex = 0; }
        if (total === void 0) { total = 1; }
        if (tags === void 0) { tags = []; }
        if (totalOffset === void 0) { totalOffset = 0; }
        tags = concat([this.session.userId], tags);
        //check for file created from base64 if we can send them through cordova transfert plugin.
        if (this.coreConfig.isCordova() && file.nativeURL) {
            /** @type {?} */
            var fileTransfer = this.transfer.create();
            if (progressEmitter) {
                fileTransfer.onProgress((/**
                 * @param {?} ev
                 * @return {?}
                 */
                function (ev) {
                    if (ev.lengthComputable) {
                        /** @type {?} */
                        var percentage = ((ev.loaded / ev.total) * 100) / (total + totalOffset) + (offsetIndex * 100) / (total + totalOffset);
                        progressEmitter.next(percentage);
                    }
                }));
            }
            return fileTransfer
                .upload(file.nativeURL, this.config.uploadUrl, {
                fileKey: 'file',
                fileName: file.name,
                chunkedMode: false,
                params: { tags: tags }
            })
                .then((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                /** @type {?} */
                var retVal = JSON.parse(result.response);
                return _this.files.getCloudinaryUrl(retVal);
            }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                /** @type {?} */
                var fileError = err && err.message ? err.message : 'File Error';
                return Promise.reject(fileError);
            }));
        }
        else {
            /** @type {?} */
            var fileUploader_1 = this.getFileUploader(null);
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                fileUploader_1.onBuildItemForm = (/**
                 * @param {?} fileItem
                 * @param {?} form
                 * @return {?}
                 */
                function (fileItem, form) {
                    form.append('tags', JSON.stringify(tags));
                });
                fileUploader_1.onCompleteItem = (/**
                 * @param {?} item
                 * @param {?} response
                 * @param {?} status
                 * @param {?} headers
                 * @return {?}
                 */
                function (item, response, status, headers) {
                    _this.log.log('upload finish');
                    fileUploader_1.clearQueue();
                    if (status === 200) {
                        /** @type {?} */
                        var retVal = JSON.parse(response);
                        resolve(_this.files.getCloudinaryUrl(retVal));
                    }
                    else {
                        reject(response ? JSON.parse(response) : 'error');
                    }
                });
                if (progressEmitter) {
                    fileUploader_1.onProgressItem = (/**
                     * @param {?} item
                     * @param {?} progress
                     * @return {?}
                     */
                    function (item, progress) {
                        /** @type {?} */
                        var percentage = progress / (total + totalOffset) + (offsetIndex * 100) / (total + totalOffset);
                        progressEmitter.next(percentage);
                    });
                }
                fileUploader_1.addToQueue([file]);
                fileUploader_1.queue[0].alias = 'undefined';
                //fileItem.alias = 'undefined';
                _this.log.log('upload begin');
                fileUploader_1.uploadAll();
            }));
        }
    };
    /**
     * @param {?} data
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @return {?}
     */
    Broker.prototype.uploadData = /**
     * @param {?} data
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @return {?}
     */
    function (data, progressEmitter, offsetIndex, total) {
        if (offsetIndex === void 0) { offsetIndex = 0; }
        if (total === void 0) { total = 1; }
        /** @type {?} */
        var file = this.files.b64toBlob(data);
        return this.upload(file, progressEmitter, offsetIndex, total);
    };
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.incrementTags = /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    function (collectionName, entity) {
        if (entity.tags && entity.tags.length > 0) {
            entity.tags = uniq(compact([].concat(entity.tags)));
            if (entity.tags.length > 0 && !this.network.isOffline()) {
                /** @type {?} */
                var url = this.config.apiUrl + 'tags/incrementTags';
                return this.rq.post(url, {
                    params: {
                        collectionName: Models.fixCollectionName(collectionName),
                        tags: entity.tags,
                        groups: [].concat(entity.group || entity._acl.groups.r),
                        entity: entity
                    }
                });
            }
        }
        return of(null);
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Broker.prototype.updateTags = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var url = this.config.apiUrl + 'tags/updateTags';
        return this.rq.post(url, { params: { collection: collectionName } });
    };
    /**
     * @return {?}
     */
    Broker.prototype.createAllTags = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.config.apiUrl + 'businessLogic/createAllTags';
        return this.rq.post(url, { params: {} });
    };
    /**
     * @param {?} collectionName
     * @param {?} id
     * @return {?}
     */
    Broker.prototype.delete = /**
     * @param {?} collectionName
     * @param {?} id
     * @return {?}
     */
    function (collectionName, id) {
        if (this.isOfflineId(id)) {
            return from(this.cache.removeFromDatabaseCollection(collectionName, id));
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + encodeURIComponent(id);
            return this.rq.delete(url);
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    Broker.prototype.deleteAll = /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    function (collectionName, query) {
        /** @type {?} */
        var url = this.config.apiUrl + this.getCollectionName(collectionName);
        /** @type {?} */
        var rawQuery = assign({}, query.where || { _id: { exists: true } });
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        return this.rq.delete(url, rawQuery);
    };
    /**
     * @param {?} collectionName
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    Broker.prototype.getQuery = /**
     * @param {?} collectionName
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @return {?}
     */
    function (collectionName, fields, include, search, filters, sorts, skip, limit, subQuery, customFilter) {
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (subQuery === void 0) { subQuery = null; }
        if (customFilter === void 0) { customFilter = null; }
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        if (model) {
            fields = fields && fields.length > 0 ? fields : model.fields;
            include = include || model.include;
            if (model && model.isCustom) {
                if (!filters || (isArray(filters) && ((/** @type {?} */ (filters))).length < 1)) {
                    filters = [[]];
                }
                if (isArray(filters)) {
                    filters = cloneDeep(filters);
                    ((/** @type {?} */ (filters))).forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        f.push({ field: '_modelName', operator: { _id: 'eq' }, value: model.collectionName });
                    }));
                }
            }
        }
        /** @type {?} */
        var query = {};
        if (skip && skip > 0) {
            query.skip = skip;
        }
        if (limit && limit > 0) {
            query.limit = limit;
        }
        if (sorts && sorts.length > 0) {
            query.order = sorts.filter((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return isString(s) || (s.colId && s.sort); })).map((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return (isString(s) ? s : s.colId + ' ' + (s.sort ? s.sort.toUpperCase() : 'ASC')); }));
        }
        else if (sorts && sorts.length === 0) {
            query.order = [];
        }
        else {
            query.order = ['_lmt DESC'];
        }
        /** @type {?} */
        var searchWhere = null;
        /** @type {?} */
        var filterWhere = null;
        if (search && model && !model.searchSubquery) {
            searchWhere = Models.exportSearch(collectionName, search);
        }
        if (filters && isArray(filters) && ((/** @type {?} */ (filters))).length > 0) {
            filterWhere = Models.exportWhere(collectionName, (/** @type {?} */ (filters)));
        }
        else if (filters && !isArray(filters) && isObject(filters)) {
            filterWhere = filters;
        }
        if (searchWhere && filterWhere) {
            query.where = { and: [searchWhere, filterWhere] };
        }
        else if (searchWhere) {
            query.where = searchWhere;
        }
        else if (filterWhere) {
            query.where = filterWhere;
        }
        if (customFilter && query.where) {
            query.where = { and: [query.where, customFilter] };
        }
        else if (customFilter) {
            query.where = customFilter;
        }
        if (fields && fields.length > 0) {
            query.fields = fields;
        }
        if (!isEmpty(include)) {
            query.include = include;
        }
        if (subQuery) {
            query.subQuery = subQuery;
        }
        /** @type {?} */
        var filterSubquery = Models.exportSubQuery(collectionName, filters);
        if (filterSubquery) {
            if (query.subQuery) {
                query.subQuery = [].concat(query.subQuery, filterSubquery);
            }
            else {
                query.subQuery = filterSubquery;
            }
        }
        //this is mainly used in the channel model because we want to filter on users properties
        if (search && model && model.searchSubquery) {
            searchWhere = Models.exportSearch(model.searchSubquery.collectionName, search);
            if (!query.subQuery) {
                query.subQuery = {
                    collectionName: model.searchSubquery.collectionName,
                    field: model.searchSubquery.field,
                    values: model.searchSubquery.values,
                    where: searchWhere
                };
            }
            else if (query.subQuery && !isArray(query.subQuery) && ((/** @type {?} */ (query.subQuery))).where) {
                ((/** @type {?} */ (query.subQuery))).where = { and: [searchWhere, ((/** @type {?} */ (query.subQuery))).where] };
            }
        }
        return query;
    };
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} noOffline
     * @return {?}
     */
    Broker.prototype.getCount = /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} noOffline
     * @return {?}
     */
    function (collectionName, search, filters, subQuery, customFilter, noOffline) {
        var _this = this;
        if (subQuery === void 0) { subQuery = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (noOffline === void 0) { noOffline = false; }
        if (this.network.isOffline()) {
            return this.getAllOffline(collectionName, false, search, filters, null, null, null, customFilter, false).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            function (ret) {
                return { count: ret.count, data: [] };
            })));
        }
        else {
            /** @type {?} */
            var query = this.getQuery(collectionName, null, null, search, filters, null, null, null, subQuery, customFilter);
            /** @type {?} */
            var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/count';
            //?where=' + encodeURIComponent(JSON.stringify(query.where || {}));
            /** @type {?} */
            var finalQuery = {};
            if (query.where) {
                finalQuery.where = query.where;
            }
            if (query.subQuery) {
                finalQuery.subQuery = query.subQuery;
            }
            /** @type {?} */
            var finalRes_1;
            return this.rq
                .post(url, finalQuery)
                .pipe(mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                finalRes_1 = res;
                if (noOffline) {
                    return of([]);
                }
                else {
                    return from(_this.getAllOffline(collectionName, true, search, filters, null, null, null, customFilter));
                }
            })))
                .pipe(map((/**
             * @param {?} offlineRes
             * @return {?}
             */
            function (offlineRes) {
                /** @type {?} */
                var count = finalRes_1 || 0;
                if (offlineRes && offlineRes.count > 0) {
                    count += offlineRes.count;
                }
                return { count: count, data: [] };
            })));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} cacheId
     * @param {?=} looseCount
     * @param {?=} noCount
     * @param {?=} noOffline
     * @return {?}
     */
    Broker.prototype.getAll = /**
     * @param {?} collectionName
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} tag
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} cacheId
     * @param {?=} looseCount
     * @param {?=} noCount
     * @param {?=} noOffline
     * @return {?}
     */
    function (collectionName, fields, include, search, filters, sorts, skip, limit, tag, subQuery, customFilter, cacheId, looseCount, noCount, noOffline) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (tag === void 0) { tag = false; }
        if (subQuery === void 0) { subQuery = null; }
        if (customFilter === void 0) { customFilter = null; }
        if (cacheId === void 0) { cacheId = null; }
        if (looseCount === void 0) { looseCount = null; }
        if (noCount === void 0) { noCount = false; }
        if (noOffline === void 0) { noOffline = false; }
        if (collectionName === 'googlemaps') {
            return this.getAllGoogleMaps(search);
        }
        if (collectionName.indexOf('workplace_') >= 0) {
            return this.getAllWorkplace(collectionName, search);
        }
        if (collectionName === 'unsplash') {
            return this.getAllUnsplash(search, skip, limit);
        }
        if (tag === true) {
            return this.getAllTags(collectionName, search, filters, skip, limit);
        }
        else {
            /** @type {?} */
            var query = this.getQuery(collectionName, fields, include, search, filters, sorts, skip, limit, subQuery, customFilter);
            if (collectionName.indexOf('_store') >= 0) {
                return this.getAllOperation(collectionName, query);
            }
            /** @type {?} */
            var obs = void 0;
            if (this.network.isOffline()) {
                if (cacheId) {
                    obs = from(this.localForage.get(cacheId)).pipe(map((/**
                     * @param {?} res
                     * @return {?}
                     */
                    function (res) {
                        return res || (noCount ? [] : { count: 0, data: [] });
                    })));
                }
                else {
                    obs = this.getAllOffline(collectionName, false, search, filters, sorts, skip, limit, customFilter, noCount);
                }
            }
            else {
                /** @type {?} */
                var finalRes_2;
                obs = this.getAllQuery(collectionName, query, looseCount, noCount)
                    .pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    finalRes_2 = res;
                    if (cacheId) {
                        _this.localForage.set(cacheId, res);
                    }
                    if (noOffline) {
                        return of([]);
                    }
                    else {
                        return from(_this.getAllOffline(collectionName, true, search, filters, sorts, skip, limit, customFilter, noCount));
                    }
                })))
                    .pipe(map((/**
                 * @param {?} offlineRes
                 * @return {?}
                 */
                function (offlineRes) {
                    if (noCount) {
                        finalRes_2 = tslib_1.__spread((offlineRes || []), (finalRes_2 || []));
                    }
                    else {
                        finalRes_2.data = tslib_1.__spread((offlineRes.data || []), (finalRes_2.data || []));
                    }
                    return finalRes_2;
                })));
            }
            return obs;
        }
    };
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} useTagsCollection
     * @return {?}
     */
    Broker.prototype.getAllTags = /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} useTagsCollection
     * @return {?}
     */
    function (collectionName, search, filters, skip, limit, useTagsCollection) {
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (useTagsCollection === void 0) { useTagsCollection = false; }
        filters = filters || [[]];
        //fix for "MongoError","message":"$geoNear, $near, and $nearSphere are not allowed in this context"
        if (collectionName === 'locations') {
            filters = filters.map((/**
             * @param {?} ff
             * @return {?}
             */
            function (ff) {
                return ff.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.field !== '_geoloc'; }));
            }));
        }
        if (this.network.isOffline()) {
            return this.getAllTagsOffline({ collectionName: collectionName, search: search, filters: filters });
        }
        else if (useTagsCollection) {
            //this is not used anymore
            /** @type {?} */
            var aggregateOptions = [{ $match: { collectionName: Models.fixCollectionName(collectionName) } }, { $group: { _id: '$tag', count: { $max: '$count' } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }, { $group: { _id: 1, total: { $sum: 1 }, data: { $push: '$$ROOT' } } }, { $project: { count: '$total', data: { $slice: ['$data', skip, skip + limit] } } }];
            return this.aggregateQuery('tags', filters, aggregateOptions, search).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return (res && res.length > 0 ? { data: res[0].data, count: res[0].count } : { data: [], count: 0 }); })));
        }
        else {
            /** @type {?} */
            var aggregateOptions = [{ $unwind: '$tags' }];
            if (search) {
                aggregateOptions.push({
                    $match: { tags: { $regex: search.replace(/([^a-z0-9]+)/gi, ''), $options: 'i' } }
                });
            }
            aggregateOptions = aggregateOptions.concat(tslib_1.__spread([{ $group: { _id: '$tags', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }], (skip > 0 ? [{ $skip: skip }] : []), (limit > 0 ? [{ $limit: limit }] : [])));
            return this.aggregateQuery(collectionName, filters, aggregateOptions).pipe(map((/**
             * @param {?=} res
             * @return {?}
             */
            function (res) {
                if (res === void 0) { res = []; }
                return ({ data: res, count: res.length });
            })));
        }
    };
    /**
     * @param {?} config
     * @return {?}
     */
    Broker.prototype.getAllTagsOffline = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return this.getAllOffline(config.collectionName, false, config.search, config.filters, null, null, null, null, true).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var data = [];
            /** @type {?} */
            var count = {};
            if (res && res.length > 0) {
                res.forEach((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    if (t.tags) {
                        [].concat(t.tags).forEach((/**
                         * @param {?} tag
                         * @return {?}
                         */
                        function (tag) {
                            count[tag] = count[tag] > 0 ? count[tag] + 1 : 1;
                        }));
                    }
                }));
                keys(count).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    data.push({ _id: key, tag: key, count: count[key] });
                }));
                data = orderBy(data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return -d.count; }));
            }
            return { data: data, count: data.length, config: config };
        })));
    };
    /**
     * @param {?} config
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    Broker.prototype.getMultipleAllTags = /**
     * @param {?} config
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    function (config, skip, limit) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (this.network.isOffline()) {
            /** @type {?} */
            var obs = config.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.getAllTagsOffline(c); }));
            return combineLatest(obs).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            function (ret) {
                return ret;
            })));
        }
        else {
            /** @type {?} */
            var aggregateOptions_1 = tslib_1.__spread([{ $unwind: '$tags' }, { $group: { _id: '$tags', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }], (skip > 0 ? [{ $skip: skip }] : []), (limit > 0 ? [{ $limit: limit }] : []));
            /** @type {?} */
            var queries = config.map((/**
             * @param {?} conf
             * @return {?}
             */
            function (conf) {
                /** @type {?} */
                var filters = conf.filters || [];
                if (conf.collectionName === 'locations') {
                    filters = filters.map((/**
                     * @param {?} ff
                     * @return {?}
                     */
                    function (ff) {
                        return ff.filter((/**
                         * @param {?} f
                         * @return {?}
                         */
                        function (f) { return f.field !== '_geoloc'; }));
                    }));
                }
                return _this.getAggregateQuery(conf.collectionName, filters, aggregateOptions_1, conf.search, null, null, null, conf.subQuery);
            }));
            return this.aggregateQueries(queries).pipe(map((/**
             * @param {?} rets
             * @return {?}
             */
            function (rets) {
                /** @type {?} */
                var retVal = rets.map((/**
                 * @param {?} res
                 * @param {?} i
                 * @return {?}
                 */
                function (res, i) { return ({ data: res, count: res.length, config: config[i] }); }));
                return retVal;
            })));
        }
    };
    /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?=} looseCount
     * @param {?=} noCount
     * @return {?}
     */
    Broker.prototype.getAllQuery = /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?=} looseCount
     * @param {?=} noCount
     * @return {?}
     */
    function (collectionName, query, looseCount, noCount) {
        /** @type {?} */
        var url = this.config.apiUrl + this.getCollectionName(collectionName) + '/find';
        return this.rq.post(url, { filter: query }, null, !noCount, false, looseCount);
        //let url = this.config.apiUrl + collectionName + '?filter=' + encodeURIComponent(JSON.stringify(query));
        //return this.rq.get(url, true);
    };
    /**
     * @param {?=} search
     * @return {?}
     */
    Broker.prototype.getAllGoogleMaps = /**
     * @param {?=} search
     * @return {?}
     */
    function (search) {
        if (search) {
            return this.googlemaps.placePredictionsLocationObserver(search).pipe(map((/**
             * @param {?} predictions
             * @return {?}
             */
            function (predictions) {
                /** @type {?} */
                var details = flatten(predictions).filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.geometry && d.geometry.location; }));
                return {
                    count: details.length,
                    data: details.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        /** @type {?} */
                        var position = new Position(d.geometry.location);
                        return {
                            address: d.formatted_address,
                            _id: d.id,
                            _geoloc: position.toGeoLoc(true),
                            coords: position.toJson()
                        };
                    }))
                };
            })));
        }
        else {
            return from(this.googlemaps.getCurrentAddresses(true)).pipe(map((/**
             * @param {?} addresses
             * @return {?}
             */
            function (addresses) {
                return { count: addresses.length, data: addresses };
            })));
        }
    };
    /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    Broker.prototype.getAllUnsplash = /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    function (search, skip, limit) {
        return this.unsplash.getAll(search, skip, limit);
    };
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @return {?}
     */
    Broker.prototype.getAllWorkplace = /**
     * @param {?} collectionName
     * @param {?=} search
     * @return {?}
     */
    function (collectionName, search) {
        /** @type {?} */
        var graphEntity = collectionName.replace('workplace_', '');
        switch (graphEntity) {
            case 'groups':
                return (/** @type {?} */ (this.workplace.getAllGroups()));
        }
        return of({ count: 0, data: [] });
    };
    /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    Broker.prototype.getAllOperation = /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    function (collectionName, query) {
        /** @type {?} */
        var url = this.config.apiUrl + 'Operation/findDocument';
        return this.rq
            .post(url, {
            collectionName: Models.fixCollectionName(collectionName.replace('_store', ''), true),
            where: query.where,
            //operationId: (<any>query.where).operationId.inq[0],
            limit: query.limit,
            skip: query.skip
        }, null, true)
            .pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.data && res.data.map) {
                res.data = res.data; //.map(r => r.doc);
            }
            return res;
        })));
    };
    /**
     * @param {?=} lastSync
     * @param {?=} progressEvent
     * @return {?}
     */
    Broker.prototype.syncDatabase = /**
     * @param {?=} lastSync
     * @param {?=} progressEvent
     * @return {?}
     */
    function (lastSync, progressEvent) {
        var _this = this;
        /** @type {?} */
        var collections = this.coreConfig.getSyncedCollections();
        if (collections && collections.length > 0) {
            this.log.log('Syncing Database - Start');
            /** @type {?} */
            var promises = collections.map((/**
             * @param {?} entry
             * @param {?} i
             * @return {?}
             */
            function (entry, i) {
                return (/**
                 * @return {?}
                 */
                function () {
                    if (entry.max <= 0) {
                        return;
                    }
                    _this.log.log('Syncing Database - Syncing ' + entry.name);
                    return _this.cache.getDatabaseCollection(entry.name).then((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) {
                        /** @type {?} */
                        var filters = cloneDeep(entry.filters || [[]]);
                        filters.forEach((/**
                         * @param {?} fs
                         * @return {?}
                         */
                        function (fs) {
                            return fs.forEach((/**
                             * @param {?} f
                             * @return {?}
                             */
                            function (f) {
                                if (f.value && isArray(f.value) && f.value.indexOf('currentLanguage') >= 0) {
                                    f.value[f.value.indexOf('currentLanguage')] = _this.translate.getCurrentLanguage();
                                }
                            }));
                        }));
                        if (lastSync && data.length > 0) {
                            // && ) {
                            filters.forEach((/**
                             * @param {?} f
                             * @return {?}
                             */
                            function (f) { return f.push({ field: '_lmt', operator: { _id: 'gte' }, value: lastSync }); }));
                        }
                        return (_this.getAll(entry.name, entry.fields, null, null, filters, null, 0, Math.min(entry.max || 1000, 1000), null, null, null, null, null, null, true)
                            .toPromise()
                            // let chunckNumber = (entry.max || 10000) / 100;
                            // let ps = [];
                            // for (let ii = 0; ii <= chunckNumber; ii++) {
                            //   ps.push(this.getAll(entry.name, entry.fields, null, null, filters, null, ii * 100, 100).toPromise());
                            //   //ps.push(this.aggregateQuery(entry.name, filters, [{ $skip: ii * 100 }, { $limit: 100 }], null, null, false, null, null).toPromise());
                            // }
                            // return Promise.all(ps)
                            // .then((ret: Array<ResponseObject>) => {
                            //   let d = [].concat.apply([], ret.map(r => r.data));
                            //   return {
                            //     count: d.length,
                            //     data: d
                            //   };
                            // })
                            .then((/**
                         * @param {?} ret
                         * @return {?}
                         */
                        function (ret) {
                            if (progressEvent) {
                                progressEvent.emit((i / collections.length) * 100);
                            }
                            if (ret && ret.data) {
                                /** @type {?} */
                                var filePromises_1 = [Promise.resolve(null)];
                                /** @type {?} */
                                var deletedKeys_1;
                                if (lastSync) {
                                    filePromises_1 = [
                                        _this.getDeletedEntities(entry.name, data)
                                            .toPromise()
                                            .then((/**
                                         * @param {?} deletedkeys
                                         * @return {?}
                                         */
                                        function (deletedkeys) {
                                            deletedKeys_1 = deletedkeys;
                                        }))
                                    ];
                                }
                                if (entry.addToCache && entry.addToCache.length > 0) {
                                    entry.addToCache.forEach((/**
                                     * @param {?} key
                                     * @return {?}
                                     */
                                    function (key) {
                                        ret.data.forEach((/**
                                         * @param {?} item
                                         * @return {?}
                                         */
                                        function (item) {
                                            if (item[key]) {
                                                filePromises_1.push((/**
                                                 * @return {?}
                                                 */
                                                function () { return cacheFile(item[key]); }));
                                            }
                                        }));
                                    }));
                                }
                                return Promise.all(filePromises_1).then((/**
                                 * @return {?}
                                 */
                                function () {
                                    return _this.cache.updateDatabaseCollection(entry.name, ret.data, '_id', deletedKeys_1);
                                }));
                            }
                        })));
                    }));
                });
            }));
            return this.promise.sequential(promises).then((/**
             * @param {?} ret
             * @return {?}
             */
            function (ret) {
                if (progressEvent) {
                    progressEvent.emit(100);
                }
                return ret;
            }));
        }
        return Promise.resolve(null);
    };
    /**
     * @return {?}
     */
    Broker.prototype.clearDatabase = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var collections = this.coreConfig.getSyncedCollections();
        if (collections && collections.length > 0) {
            /** @type {?} */
            var promises = collections.map((/**
             * @param {?} entry
             * @return {?}
             */
            function (entry) {
                return (/**
                 * @return {?}
                 */
                function () { return _this.cache.clearDatabaseCollection(entry.name); });
            }));
            return this.promise.sequential(promises);
        }
        return Promise.resolve(null);
    };
    /**
     * @param {?} collectionName
     * @param {?} data
     * @return {?}
     */
    Broker.prototype.getDeletedEntities = /**
     * @param {?} collectionName
     * @param {?} data
     * @return {?}
     */
    function (collectionName, data) {
        data = data || [];
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getDeletedIds';
        /** @type {?} */
        var modelName = Models.fixCollectionName(collectionName, true);
        return this.rq.post(url, { modelName: modelName, ids: data.map((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e._id; })) }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal) {
                return retVal || [];
            }
            return [];
        })));
    };
    /**
     * @return {?}
     */
    Broker.prototype.getOfflineEntitiesCount = /**
     * @return {?}
     */
    function () {
        return this.uploadDatabaseOrGetCount(true);
    };
    /**
     * @param {?=} progressEmitter
     * @return {?}
     */
    Broker.prototype.uploadDatabase = /**
     * @param {?=} progressEmitter
     * @return {?}
     */
    function (progressEmitter) {
        return this.uploadDatabaseOrGetCount(false, progressEmitter);
    };
    /**
     * @param {?} returnCount
     * @param {?=} progressEmitter
     * @return {?}
     */
    Broker.prototype.uploadDatabaseOrGetCount = /**
     * @param {?} returnCount
     * @param {?=} progressEmitter
     * @return {?}
     */
    function (returnCount, progressEmitter) {
        var _this = this;
        /** @type {?} */
        var total = 0;
        /** @type {?} */
        var count = 0;
        /** @type {?} */
        var offlineData = {};
        if (!this.isUploadingDatabase || this.network.isOffline()) {
            this.isUploadingDatabase = true;
            /** @type {?} */
            var collections_1 = this.coreConfig.getSyncedCollections();
            return this.cache.getDatabaseCollection('custommodels').then((/**
             * @param {?} custommodels
             * @return {?}
             */
            function (custommodels) {
                if (collections_1 && collections_1.length > 0) {
                    collections_1 = cloneDeep(collections_1);
                    collections_1 = collections_1.concat(custommodels.map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return ({ name: c.name }); })));
                    /** @type {?} */
                    var promisesCount = collections_1.map((/**
                     * @param {?} entry
                     * @return {?}
                     */
                    function (entry) {
                        return (/**
                         * @return {?}
                         */
                        function () {
                            return _this.cache.getDatabaseCollection(entry.name).then((/**
                             * @param {?} data
                             * @return {?}
                             */
                            function (data) {
                                data = data.filter((/**
                                 * @param {?} e
                                 * @return {?}
                                 */
                                function (e) { return _this.isOfflineEntity(e) && ((/** @type {?} */ (e))).status !== 'draft'; }));
                                offlineData[entry.name] = data;
                                total += data.length;
                            }));
                        });
                    }));
                    return _this.promise.sequential(promisesCount).then((/**
                     * @return {?}
                     */
                    function () {
                        if (returnCount) {
                            _this.isUploadingDatabase = false;
                            return total;
                        }
                        else {
                            _this.log.log('uploadDatabase', 'total', total);
                            if (progressEmitter) {
                                progressEmitter.emit(total > 0 ? (count / total) * 100 : 0);
                            }
                            /** @type {?} */
                            var promises_1 = [];
                            if (total > 0) {
                                collections_1.forEach((/**
                                 * @param {?} entry
                                 * @return {?}
                                 */
                                function (entry) {
                                    /** @type {?} */
                                    var data = offlineData[entry.name];
                                    data.forEach((/**
                                     * @param {?} entity
                                     * @return {?}
                                     */
                                    function (entity) {
                                        promises_1.push((/**
                                         * @return {?}
                                         */
                                        function () {
                                            /** @type {?} */
                                            var offlineId = entity._id;
                                            entity = tslib_1.__assign({}, entity);
                                            delete entity._id;
                                            return _this.upsert(entry.name, entity)
                                                .toPromise()
                                                .then((/**
                                             * @param {?} retVal
                                             * @return {?}
                                             */
                                            function (retVal) {
                                                count += 1;
                                                if (progressEmitter) {
                                                    progressEmitter.emit((count / total) * 100);
                                                }
                                                _this.log.log('uploadDatabase', 'count', count);
                                                return _this.cache.replaceFromDatabaseCollection(entry.name, offlineId, retVal);
                                            }));
                                        }));
                                    }));
                                }));
                            }
                            return _this.promise.sequential(promises_1).then((/**
                             * @return {?}
                             */
                            function () {
                                setTimeout((/**
                                 * @return {?}
                                 */
                                function () {
                                    if (progressEmitter) {
                                        progressEmitter.emit(100);
                                    }
                                }), 300);
                                _this.isUploadingDatabase = false;
                                return total;
                            }));
                        }
                    }));
                }
            }));
        }
        return Promise.resolve(returnCount ? 0 : null);
    };
    /**
     * @param {?} entity
     * @return {?}
     */
    Broker.prototype.isOfflineEntity = /**
     * @param {?} entity
     * @return {?}
     */
    function (entity) {
        return entity && entity._id && this.isOfflineId(entity._id);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    Broker.prototype.isOfflineId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return id && id.startsWith && id.startsWith(Cache.OFFLINE_PREFIX);
    };
    /**
     * @param {?} collectionName
     * @param {?} offlineOnly
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} customFilter
     * @param {?=} noCount
     * @return {?}
     */
    Broker.prototype.getAllOffline = /**
     * @param {?} collectionName
     * @param {?} offlineOnly
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} sorts
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} customFilter
     * @param {?=} noCount
     * @return {?}
     */
    function (collectionName, offlineOnly, search, filters, sorts, skip, limit, customFilter, noCount) {
        var _this = this;
        if (skip === void 0) { skip = 0; }
        if (limit === void 0) { limit = 20; }
        if (customFilter === void 0) { customFilter = null; }
        if (noCount === void 0) { noCount = false; }
        return from(this.cache.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var model = Models.getModelByCollectionName(collectionName);
            if (offlineOnly) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.isOfflineEntity(d); }));
            }
            if (filters && filters.length > 0) {
                /** @type {?} */
                var newData_1 = [];
                filters.forEach((/**
                 * @param {?} fs
                 * @return {?}
                 */
                function (fs) {
                    /** @type {?} */
                    var subData = tslib_1.__spread(data);
                    fs.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) { return f.removeFromOffline !== true; })).forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    function (f) {
                        subData = subData.filter((/**
                         * @param {?} e
                         * @return {?}
                         */
                        function (e) {
                            /** @type {?} */
                            var value = isArray(f.value) && isObject(f.value[0]) ? lodashMap(f.value, '_id') : isArray(f.value) ? f.value : isObject(f.value) ? f.value._id : f.value;
                            if (e && e[f.field] !== undefined && e[f.field] !== null) {
                                switch (f.operator._id) {
                                    case 'eq':
                                        return isEqual(e[f.field], value);
                                    case 'neq':
                                        return !isEqual(e[f.field], value);
                                    case 'inq':
                                        return intersection([].concat(e[f.field]), [].concat(value)).length > 0;
                                    case 'nin':
                                        return intersection([].concat(e[f.field]), [].concat(value)).length <= 0;
                                    case 'gt':
                                        return e[f.field] > value;
                                    case 'gte':
                                        return e[f.field] >= value;
                                    case 'lt':
                                        return e[f.field] < value;
                                    case 'lte':
                                        return e[f.field] <= value;
                                    case 'nearSphere':
                                        ((/** @type {?} */ (e))).distance = _this.geoloc.getDistance(e[f.field][1], e[f.field][0], value[1], value[0]);
                                        return ((/** @type {?} */ (e))).distance < f.max;
                                        break;
                                    case 'exists':
                                        return !isNullOrUndefined(e[f.field]);
                                        break;
                                }
                            }
                            else {
                                switch (f.operator._id) {
                                    case 'neq':
                                    case 'nin':
                                        return true;
                                    case 'inq':
                                        return value && value.indexOf(null) >= 0;
                                }
                            }
                        }));
                    }));
                    newData_1 = tslib_1.__spread(newData_1, subData);
                }));
                data = uniqBy(newData_1, (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e._id; }));
            }
            if (search && model && model.searchableFields) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    if (model.searchableFields.some((/**
                     * @param {?} name
                     * @return {?}
                     */
                    function (name) {
                        return d[name] &&
                            d[name]
                                .toString()
                                .toUpperCase()
                                .indexOf(search.toUpperCase()) >= 0;
                    }))) {
                        return true;
                    }
                    return false;
                }));
            }
            if (filters && filters.some((/**
             * @param {?} fs
             * @return {?}
             */
            function (fs) { return fs.some((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.operator._id === 'nearSphere'; })); }))) {
                data = orderBy(data, ['distance']);
            }
            if (sorts) {
                data = orderBy(data, sorts.map((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s.colId; })), sorts.map((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s.sort; })));
            }
            /** @type {?} */
            var total = data.length;
            if (limit > 0) {
                skip = skip || 0;
                data = data.slice(skip, skip + limit);
            }
            return noCount ? data : { count: total, data: data };
        })));
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} aggregateOptions
     * @param {?=} search
     * @param {?=} excludedFields
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @param {?=} aggregateOptionsOffline
     * @return {?}
     */
    Broker.prototype.aggregateQuery = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} aggregateOptions
     * @param {?=} search
     * @param {?=} excludedFields
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @param {?=} aggregateOptionsOffline
     * @return {?}
     */
    function (collectionName, filters, aggregateOptions, search, excludedFields, includeCount, cacheId, customFilter, subQuery, aggregateOptionsOffline) {
        var _this = this;
        if (includeCount === void 0) { includeCount = false; }
        if (cacheId === void 0) { cacheId = null; }
        /** @type {?} */
        var obs;
        collectionName = Models.fixCollectionName(collectionName, true);
        if (this.network.isOffline()) {
            if (cacheId) {
                obs = from(this.localForage.get(cacheId));
            }
            else if (aggregateOptionsOffline) {
                obs = from(this.cache.getDatabaseCollection(collectionName).then((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    data = aggregateOptionsOffline(data);
                    if (includeCount) {
                        return { data: [{ count: data.length, data: data }] };
                    }
                    else {
                        return { data: data };
                    }
                })));
            }
            else {
                obs = of({ count: 0, data: [] });
            }
        }
        else if (collectionName === 'aggregateLogs') {
            return this.aggregateLogs(aggregateOptions);
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + 'businesslogic/aggregateQuery';
            /** @type {?} */
            var query = this.getAggregateQuery(collectionName, filters, aggregateOptions, search, excludedFields, includeCount, customFilter, subQuery);
            obs = this.rq.post(url, { params: query }).pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            function (retVal) {
                if (cacheId) {
                    _this.localForage.set(cacheId, retVal);
                }
                return retVal;
            })));
        }
        return obs.pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var data = [];
            if (retVal && retVal.data && retVal.data.length > 0) {
                if (includeCount) {
                    data = retVal.data[0];
                }
                else {
                    data = retVal.data;
                }
            }
            return data;
        })));
    };
    /**
     * @param {?} queries
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @return {?}
     */
    Broker.prototype.aggregateQueries = /**
     * @param {?} queries
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @return {?}
     */
    function (queries, includeCount, cacheId) {
        var _this = this;
        if (includeCount === void 0) { includeCount = false; }
        if (cacheId === void 0) { cacheId = null; }
        /** @type {?} */
        var obs;
        if (this.network.isOffline()) {
            if (cacheId) {
                obs = from(this.localForage.get(cacheId));
            }
            else {
                obs = of({ count: 0, data: [] });
            }
        }
        else {
            /** @type {?} */
            var url = this.config.apiUrl + 'businesslogic/aggregateQueries';
            obs = this.rq.post(url, queries).pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            function (retVal) {
                /** @type {?} */
                var finalArray = Array(queries.length);
                for (var i = 0; i < finalArray.length; i++) {
                    finalArray[i] = [];
                }
                if (retVal && retVal.data && retVal.data.some((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return isObject(d.doc); }))) {
                    retVal.data.forEach((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        finalArray[d.index] = finalArray[d.index] || [];
                        finalArray[d.index].push(d.doc);
                    }));
                    retVal.data = finalArray;
                }
                else if (retVal && isArray(retVal.data) && retVal.data.length === 0) {
                    retVal.data = finalArray;
                }
                if (cacheId) {
                    _this.localForage.set(cacheId, retVal);
                }
                return retVal;
            })));
        }
        return obs.pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var data = [];
            if (retVal && retVal.data && retVal.data.length > 0) {
                if (includeCount) {
                    data = retVal.data[0];
                }
                else {
                    data = retVal.data;
                }
            }
            return data;
        })));
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} aggregateOptions
     * @param {?=} search
     * @param {?=} excludedFields
     * @param {?=} includeCount
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    Broker.prototype.getAggregateQuery = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} aggregateOptions
     * @param {?=} search
     * @param {?=} excludedFields
     * @param {?=} includeCount
     * @param {?=} customFilter
     * @param {?=} subQuery
     * @return {?}
     */
    function (collectionName, filters, aggregateOptions, search, excludedFields, includeCount, customFilter, subQuery) {
        if (includeCount === void 0) { includeCount = false; }
        /** @type {?} */
        var match = {};
        /** @type {?} */
        var project = {};
        /** @type {?} */
        var filterWhere = null;
        /** @type {?} */
        var searchWhere = null;
        /** @type {?} */
        var defaultFields = [];
        /** @type {?} */
        var query = (/** @type {?} */ ({
            collectionName: Models.fixCollectionName(collectionName, true),
            includeCount: includeCount
        }));
        if (filters && filters.length > 0) {
            filterWhere = Models.exportWhere(collectionName, filters, excludedFields);
        }
        if (search) {
            searchWhere = Models.exportSearch(collectionName, search);
        }
        if (searchWhere && filterWhere) {
            query.where = { and: [searchWhere, filterWhere] };
        }
        else if (searchWhere) {
            query.where = searchWhere;
        }
        else if (filterWhere) {
            query.where = filterWhere;
        }
        if (customFilter && query.where) {
            query.where = { and: [query.where, customFilter] };
        }
        else if (customFilter) {
            query.where = customFilter;
        }
        query.where = query.where || {};
        if (defaultFields && defaultFields.length > 0) {
            defaultFields.forEach((/**
             * @param {?} field
             * @param {?} i
             * @return {?}
             */
            function (field, i) {
                project[field] = 1;
            }));
        }
        if (!isEmpty(project)) {
            aggregateOptions.unshift({ $project: project });
        }
        if (!isEmpty(match)) {
            aggregateOptions.unshift({ $match: match });
        }
        query.options = aggregateOptions;
        query.subQuery = Models.exportSubQuery(collectionName, filters, true);
        if (subQuery) {
            query.subQuery = subQuery;
        }
        return query;
    };
    /**
     * @param {?=} stages
     * @param {?=} groups
     * @param {?=} userIds
     * @return {?}
     */
    Broker.prototype.aggregateLogs = /**
     * @param {?=} stages
     * @param {?=} groups
     * @param {?=} userIds
     * @return {?}
     */
    function (stages, groups, userIds) {
        /** @type {?} */
        var url = this.config.apiUrl + 'AdminDashboard/aggregateLogs';
        return this.rq.post(url, { stages: stages, groups: groups, userIds: userIds });
    };
    /**
     * @param {?} query
     * @param {?} collectionName
     * @return {?}
     */
    Broker.prototype.textSearch = /**
     * @param {?} query
     * @param {?} collectionName
     * @return {?}
     */
    function (query, collectionName) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/textSearch';
        return this.rq.post(url, { query: query, modelName: collectionName });
    };
    /**
     * @param {?} file
     * @param {?} group
     * @param {?=} hideMobile
     * @param {?=} fileName
     * @param {?=} tenantRef
     * @return {?}
     */
    Broker.prototype.createFile = /**
     * @param {?} file
     * @param {?} group
     * @param {?=} hideMobile
     * @param {?=} fileName
     * @param {?=} tenantRef
     * @return {?}
     */
    function (file, group, hideMobile, fileName, tenantRef) {
        if (hideMobile === void 0) { hideMobile = true; }
        return this.upsert('files', {
            _downloadURL: file,
            _filename: file.name,
            group: group,
            hideMobile: hideMobile,
            mimeType: file.type,
            size: file.size,
            _tenantRef: tenantRef
        });
    };
    /**
     * @param {?=} fileTypes
     * @param {?=} maxFileSize
     * @return {?}
     */
    Broker.prototype.getFileUploader = /**
     * @param {?=} fileTypes
     * @param {?=} maxFileSize
     * @return {?}
     */
    function (fileTypes, maxFileSize) {
        /** @type {?} */
        var options = {
            maxFileSize: maxFileSize,
            url: this.config.uploadUrl
        };
        // if (fileTypes && fileTypes.length > 0) {
        //     options.allowedFileType = fileTypes;
        // }
        return new FileUploader(options);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    Broker.prototype.execute = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var url = this.config.apiUrl + 'Endpoints/execute';
        return this.rq.post(url, { params: params });
    };
    /**
     * @param {?} operationId
     * @return {?}
     */
    Broker.prototype.undoOperation = /**
     * @param {?} operationId
     * @return {?}
     */
    function (operationId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'operation/undoDelete';
        return this.rq.post(url, { operationId: operationId });
    };
    /**
     * @param {?} locations
     * @return {?}
     */
    Broker.prototype.getMarkers = /**
     * @param {?} locations
     * @return {?}
     */
    function (locations) {
        return locations
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l._geoloc && l._geoloc.length > 1; }))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        function (l) {
            return {
                _id: l._id,
                address: l.address,
                latitude: l._geoloc[1],
                longitude: l._geoloc[0],
                title: l.title,
                color: l.status === 'place' ? 'success' : l.status === 'file' ? 'info' : l.status === 'error' ? 'danger' : l.status === 'prediction' ? 'stable' : 'dark'
            };
        }));
    };
    /**
     * @param {?} id
     * @param {?} mode
     * @param {?=} customFilter
     * @return {?}
     */
    Broker.prototype.getUserOrLocationStat = /**
     * @param {?} id
     * @param {?} mode
     * @param {?=} customFilter
     * @return {?}
     */
    function (id, mode, customFilter) {
        /** @type {?} */
        var value = (/** @type {?} */ ((isString(id) ? [{ _id: id }] : id)));
        /** @type {?} */
        var ref = mode === 'campaign' ? 'descriptionRef' : mode === 'location' ? 'locationRef' : 'ownerRef';
        /** @type {?} */
        var filters = [[{ field: ref, operator: { _id: 'inq' }, value: value }]];
        /** @type {?} */
        var options = [
            {
                $project: {
                    _id: '$' + ref,
                    booked: { $cond: { if: { $eq: ['$status', 'booked'] }, then: 1, else: 0 } },
                    finished: { $cond: { if: { $eq: ['$status', 'finished'] }, then: 1, else: 0 } },
                    archived: { $cond: { if: { $eq: ['$status', 'archived'] }, then: 1, else: 0 } },
                    validated: { $cond: { if: { $eq: ['$validated', true] }, then: 1, else: 0 } },
                    rejected: { $cond: { if: { $eq: ['$validated', false] }, then: 1, else: 0 } },
                    finishedDate: '$finishedDate'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    booked: { $sum: '$booked' },
                    finished: { $sum: '$finished' },
                    archived: { $sum: '$archived' },
                    validated: { $sum: '$validated' },
                    rejected: { $sum: '$rejected' },
                    latest: { $max: '$finishedDate' },
                    count: { $sum: 1 }
                }
            }
        ];
        return this.aggregateQuery('missions', filters, options, null, null, false, null, customFilter).pipe(map((/**
         * @param {?} stats
         * @return {?}
         */
        function (stats) {
            if (stats && stats.length > 0) {
                stats[0].available = (stats[0].count || 0) - (stats[0].finished || 0) - (stats[0].booked || 0) - (stats[0].archived || 0);
                stats[0].tobevalidated = (stats[0].finished || 0) - (stats[0].validated || 0) - (stats[0].rejected || 0);
            }
            return stats;
        })));
    };
    /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    Broker.prototype.setTimescale = /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    function (filters, timescale, dateField, endDate, previous) {
        if (dateField === void 0) { dateField = 'finishedDate'; }
        if (previous === void 0) { previous = false; }
        if (timescale) {
            filters = filters || [];
            filters.forEach((/**
             * @param {?} fs
             * @return {?}
             */
            function (fs) {
                fs = fs || [];
                remove(fs, (/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.field === dateField; }));
                fs.push({
                    field: dateField,
                    operator: { _id: 'between', interval: true },
                    value: getStartAndEndDates(timescale, endDate, undefined, undefined, previous)
                });
            }));
        }
    };
    /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    Broker.prototype._hasFiles = /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    function (entity, suffixs) {
        var _this = this;
        if (suffixs === void 0) { suffixs = []; }
        /** @type {?} */
        var retVal = false;
        var _loop_1 = function (prop) {
            if (entity.hasOwnProperty(prop) && this_1.files.isImageFile(entity[prop])) {
                retVal = true;
            }
            forEach(suffixs, (/**
             * @param {?} suffix
             * @return {?}
             */
            function (suffix) {
                if (suffix) {
                    /** @type {?} */
                    var object = get(entity, prop + suffix);
                    if (isArray(object)) {
                        // for multiphoto field, value is an array;
                        /** @type {?} */
                        var extraDataSuffix = '.extraData';
                        /** @type {?} */
                        var extraData_1 = get(entity, prop + extraDataSuffix);
                        object.forEach((/**
                         * @param {?} v
                         * @param {?} index
                         * @return {?}
                         */
                        function (v, index) {
                            if (_this.files.isImageFile(v)) {
                                retVal = true;
                            }
                            if (extraData_1 && extraData_1[index] && extraData_1[index].edit) {
                                if (_this.files.isImageFile(extraData_1[index].edit)) {
                                    retVal = true;
                                }
                            }
                        }));
                    }
                    else {
                        if (_this.files.isImageFile(get(entity, prop + suffix))) {
                            retVal = true;
                        }
                    }
                }
            }));
        };
        var this_1 = this;
        for (var prop in entity) {
            _loop_1(prop);
        }
        return retVal;
    };
    /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    Broker.prototype._getFileProperties = /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    function (entity, suffixs) {
        var _this = this;
        if (suffixs === void 0) { suffixs = []; }
        /** @type {?} */
        var retVal = [];
        var _loop_2 = function (prop) {
            if (entity.hasOwnProperty(prop) && this_2.files.isImageFile(entity[prop])) {
                retVal.push(prop);
            }
            forEach(suffixs, (/**
             * @param {?} suffix
             * @return {?}
             */
            function (suffix) {
                if (suffix) {
                    /** @type {?} */
                    var objectPath_1 = get(entity, prop + suffix);
                    // for multiphoto field, value is an array; and for todo with linked multi photo we need to do it to
                    if (isArray(objectPath_1)) {
                        /** @type {?} */
                        var extraDataSuffixs = ['.extraData', '.value.fieldExtra'];
                        extraDataSuffixs.forEach((/**
                         * @param {?} extraDataSuffix
                         * @return {?}
                         */
                        function (extraDataSuffix) {
                            /** @type {?} */
                            var extraData = get(entity, prop + extraDataSuffix);
                            objectPath_1.forEach((/**
                             * @param {?} v
                             * @param {?} index
                             * @return {?}
                             */
                            function (v, index) {
                                if (_this.files.isImageFile(v)) {
                                    retVal.push(prop + suffix + '[' + index + ']');
                                }
                                if (extraData && extraData[index] && extraData[index].edit) {
                                    if (_this.files.isImageFile(extraData[index].edit)) {
                                        retVal.push(prop + extraDataSuffix + '[' + index + ']' + '.edit');
                                    }
                                }
                            }));
                        }));
                    }
                    else {
                        if (_this.files.isImageFile(objectPath_1)) {
                            retVal.push(prop + suffix);
                        }
                    }
                }
            }));
        };
        var this_2 = this;
        for (var prop in entity) {
            _loop_2(prop);
        }
        retVal = uniq(retVal);
        return retVal;
    };
    Broker.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Broker.ctorParameters = function () { return [
        { type: Requestor },
        { type: Box },
        { type: Googlemaps },
        { type: Workplace },
        { type: Session },
        { type: Files },
        { type: PromiseService },
        { type: CoreConfig },
        { type: Log },
        { type: Network },
        { type: FileTransfer },
        { type: LocalForageService },
        { type: Config },
        { type: Injector },
        { type: Cache },
        { type: Smartloc },
        { type: Translate },
        { type: Unsplash }
    ]; };
    return Broker;
}());
export { Broker };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.isUploadingDatabase;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.rq;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.box;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.googlemaps;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.workplace;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.session;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.files;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.promise;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.coreConfig;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.log;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.network;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.transfer;
    /**
     * @type {?}
     * @private
     */
    Broker.prototype.localForage;
    /** @type {?} */
    Broker.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Broker.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    Broker.prototype.cache;
    /**
     * @type {?}
     * @protected
     */
    Broker.prototype.geoloc;
    /**
     * @type {?}
     * @protected
     */
    Broker.prototype.translate;
    /**
     * @type {?}
     * @protected
     */
    Broker.prototype.unsplash;
}
/**
 * @param {?} timescale
 * @param {?=} endDate
 * @param {?=} amount
 * @param {?=} notsliding
 * @param {?=} previous
 * @return {?}
 */
export function getStartAndEndDates(timescale, endDate, amount, notsliding, previous) {
    if (previous === void 0) { previous = false; }
    /** @type {?} */
    var lastDate = endDate || new Date();
    amount = amount || 7;
    /** @type {?} */
    var period = 'days';
    /** @type {?} */
    var startof = 'day';
    switch (timescale) {
        case 'last30days':
            amount = 30;
            period = 'days';
            break;
        case 'last90days':
            amount = 90;
            period = 'days';
            break;
        case 'last365days':
            amount = 365;
            period = 'days';
            break;
        case 'lastweek':
            amount = 0;
            period = 'weeks';
            break;
        case 'lastmonth':
            amount = 0;
            period = 'months';
            startof = 'month';
            break;
        case 'lastquarter':
            amount = 2;
            period = 'months';
            startof = 'month';
            break;
        case 'lastyear':
            amount = 0;
            period = 'years';
            startof = 'year';
            break;
        case 'last7days':
            amount = 7;
            period = 'days';
            startof = 'day';
            break;
        default:
            if (notsliding) {
                amount = amount ? amount - 1 : 0;
                period = timescale;
                startof = timescale;
            }
            else {
                amount = amount || 1;
                period = timescale;
                startof = 'day';
            }
            break;
    }
    /** @type {?} */
    var dateFrom = startOf(dateAdd(utc(toDate(lastDate)), period, -amount), startof);
    /** @type {?} */
    var dateTo = toDate(lastDate);
    if (previous) {
        dateFrom = dateAdd(dateFrom, period, -amount);
        dateTo = dateAdd(dateTo, period, -amount);
    }
    //use .utc() to get the startOf with no offset issues
    return [dateFrom.toISOString(), dateTo.toISOString()];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJva2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYnJva2VyL2Jyb2tlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFJeEQsK0JBQWMsNERBQTRELENBQUM7QUFFM0UsT0FBTyxFQUEwRCxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEosT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFL00sT0FBTyxFQUFFLFVBQVUsRUFBWSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQyxDQUFDLDRCQUE0Qjs7QUFFNUU7SUFJRSxnQkFDVSxFQUFhLEVBQ2IsR0FBUSxFQUNSLFVBQXNCLEVBQ3RCLFNBQW9CLEVBQ3BCLE9BQWdCLEVBQ2hCLEtBQVksRUFDWixPQUF1QixFQUN2QixVQUFzQixFQUN0QixHQUFRLEVBQ1IsT0FBZ0IsRUFDaEIsUUFBc0IsRUFDdEIsV0FBK0IsRUFDaEMsTUFBYyxFQUNYLFFBQWtCLEVBQ2xCLEtBQVksRUFDWixNQUFnQixFQUNoQixTQUFvQixFQUNwQixRQUFrQjtRQWpCcEIsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUNiLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFDUixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ1IsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFjO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQUNoQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFNUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELHFCQUFJOzs7SUFBSixjQUFRLENBQUM7Ozs7SUFFVCwwQkFBUzs7O0lBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCw2QkFBWTs7O0lBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsa0NBQWlCOzs7O0lBQWpCLFVBQWtCLGNBQXNCOztZQUNsQyxLQUFLLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLGNBQWMsQ0FBQztRQUMzRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzNCLE9BQU8sc0JBQXNCLENBQUM7U0FDL0I7UUFDRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDOzs7Ozs7Ozs7SUFFRCx3QkFBTzs7Ozs7Ozs7SUFBUCxVQUFRLGNBQXNCLEVBQUUsRUFBVSxFQUFFLE1BQXNCLEVBQUUsT0FBdUIsRUFBRSxlQUF3Qjs7WUFDL0csS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7UUFDMUQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ25CLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQztRQUNsQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDbkIsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztTQUM1RjthQUFNLElBQUksQ0FBQyxlQUFlLElBQUksZUFBZSxLQUFLLEtBQUssRUFBRTs7Z0JBQ3BELEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxVQUFVLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6SSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO2FBQU07O2dCQUNELE9BQU8sR0FBWSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN6RixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDckUsR0FBRzs7OztZQUFDLFVBQUEsR0FBRztnQkFDTCxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxFQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsdUJBQU07Ozs7O0lBQU4sVUFBTyxjQUFzQixFQUFFLE1BQVc7O1lBQ3BDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDNUU7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsdUJBQU07Ozs7O0lBQU4sVUFBTyxjQUFzQixFQUFFLE1BQVc7UUFDeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUM1RTthQUFNLElBQUksY0FBYyxLQUFLLFFBQVEsRUFBRTs7Z0JBQ2xDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0MsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzNDO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDNUM7U0FDRjtJQUNILENBQUM7Ozs7Ozs7SUFFRCxxQkFBSTs7Ozs7O0lBQUosVUFBSyxjQUFzQixFQUFFLE1BQVcsRUFBRSxNQUFzQjtRQUFoRSxpQkFNQztRQUxDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDNUU7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVE7Ozs7WUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQTdDLENBQTZDLEVBQUMsQ0FBQyxDQUFDO1NBQ2pIO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsc0JBQUs7Ozs7O0lBQUwsVUFBTSxjQUFzQixFQUFFLE1BQVc7UUFDdkMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNsRjthQUFNOztnQkFDRCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRztZQUN4RixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7Ozs7Ozs7O0lBRUQsdUJBQU07Ozs7Ozs7SUFBTixVQUFPLGNBQXNCLEVBQUUsTUFBYyxFQUFFLGNBQXVCLEVBQUUsT0FBaUI7UUFBekYsaUJBa0NDO1FBakNDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLG1CQUFLLE1BQU0sRUFBQSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFNBQVM7OztRQUFDLGNBQU8sQ0FBQyxFQUFDLENBQUM7O1lBQzNELE9BQU8sR0FBRyxjQUFjLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDOztZQUNuSCxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxPQUFPLElBQUksVUFBVTs7OztZQUFpQixVQUFDLFFBQXVCO2dCQUM1RCxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUk7OztnQkFDMUM7b0JBQ0UsS0FBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUMsU0FBUzs7OztvQkFBQyxVQUFBLEdBQUc7d0JBQy9DLElBQUksR0FBRyxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUU7NEJBQy9ELEtBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTOzs7OzRCQUFDLFVBQUEsS0FBSztnQ0FDL0MsSUFBSSxLQUFLLEVBQUU7b0NBQ1QsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7aUNBQ25CO2dDQUNELEtBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFNBQVM7Ozs7Z0NBQUMsVUFBQSxNQUFNO29DQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29DQUN0QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ3RCLENBQUMsRUFBQyxDQUFDOzRCQUNMLENBQUMsRUFBQyxDQUFDO3lCQUNKOzZCQUFNOzRCQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ25CLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt5QkFDckI7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7Z0JBQ0wsQ0FBQzs7OztnQkFDRCxVQUFBLEdBQUcsSUFBSyxDQUFDLEVBQ1YsQ0FBQztZQUNKLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7Ozs7SUFFRCwwQkFBUzs7Ozs7SUFBVCxVQUFVLGNBQXNCLEVBQUUsUUFBdUI7UUFBekQsaUJBR0M7O1lBRkssR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFBbkMsQ0FBbUMsRUFBQztRQUNyRSxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7Ozs7Ozs7O0lBRUQsa0NBQWlCOzs7Ozs7Ozs7SUFBakIsVUFBa0IsTUFBTSxFQUFFLE9BQTJCLEVBQUUsZUFBbUMsRUFBRSxJQUFvQixFQUFFLFlBQW9CLEVBQUUsV0FBZTtRQUF2SixpQkF3QkM7UUF4QnlCLHdCQUFBLEVBQUEsWUFBMkI7UUFBNkQsNkJBQUEsRUFBQSxvQkFBb0I7UUFBRSw0QkFBQSxFQUFBLGVBQWU7O1lBQ2pKLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzs7WUFDckQsS0FBSyxHQUFHLENBQUM7O1lBQ1QsUUFBUSxHQUF3QixVQUFVLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsSUFBSTs7Z0JBQ2pELE9BQU87O2dCQUNQLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztZQUM1QixPQUFPLEdBQUc7Ozs7O1lBQUMsVUFBQyxXQUFXLEVBQUUsS0FBSztnQkFDNUI7OztnQkFBTztvQkFDTCxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO3lCQUNyQixJQUFJOzs7O29CQUFDLFVBQUEsQ0FBQzt3QkFDTCxPQUFPLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDaEYsQ0FBQyxFQUFDO3lCQUNELElBQUk7Ozs7b0JBQUMsVUFBQSxHQUFHO3dCQUNQLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN6QixDQUFDLEVBQUM7eUJBQ0QsS0FBSzs7OztvQkFBQyxVQUFDLEdBQVEsSUFBSyxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQW5CLENBQW1CLEVBQUM7Z0JBUDNDLENBTzJDLEVBQUM7WUFDaEQsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ1gsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxFQUFDO1FBQ0YsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxtQkFBSzs7O2dCQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUF4QixDQUF3QixFQUFDLEVBQUEsQ0FBQztTQUMvRTtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7Ozs7SUFFRCxvQ0FBbUI7Ozs7Ozs7SUFBbkIsVUFBb0IsUUFBb0IsRUFBRSxPQUEyQixFQUFFLGVBQW1DLEVBQUUsSUFBb0I7UUFBaEksaUJBS0M7UUFMeUMsd0JBQUEsRUFBQSxZQUEyQjs7WUFDL0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxNQUFNO1lBQ2hDOzs7WUFBTyxjQUFNLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBckUsQ0FBcUUsRUFBQztRQUNyRixDQUFDLEVBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsOEJBQWE7Ozs7SUFBYixVQUFjLElBQUk7UUFBbEIsaUJBVUM7UUFUQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxJQUFJOzs7UUFBQztZQUN6RCxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM3QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNwRDtpQkFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNyQyxPQUFPLEtBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLG1CQUFRLElBQUksRUFBQSxDQUFDLENBQUM7YUFDakQ7aUJBQU07Z0JBQ0wsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBRUQsMEJBQVM7Ozs7OztJQUFULFVBQVUsY0FBc0IsRUFBRSxLQUFZLEVBQUUsTUFBVzs7WUFDckQsUUFBUSxHQUFRLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkQ7UUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDaEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDeEM7O1lBQ0csR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7Ozs7OztJQUVELHVCQUFNOzs7Ozs7OztJQUFOLFVBQU8sTUFBTSxFQUFFLEtBQThCLEVBQUUsUUFBeUIsRUFBRSxjQUF1QixFQUFFLEtBQXFCO1FBQXpFLHlCQUFBLEVBQUEsZ0JBQXlCO1FBQ3RFLHFGQUFxRjtRQUNyRixNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbEksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqRixJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1RTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsZ0dBQWdHO1FBQ2hHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1RSxJQUFJLGNBQWMsS0FBSyxjQUFjLElBQUksS0FBSyxFQUFFO1lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRjtRQUNELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLDZDQUE2QztZQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7Ozs7SUFFRCxpQ0FBZ0I7OztJQUFoQjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQzVCO2FBQU07WUFDTCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7Ozs7SUFFRCxrQ0FBaUI7Ozs7O0lBQWpCLFVBQWtCLGNBQXNCLEVBQUUsTUFBVzs7WUFDL0MsS0FBSyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUM7UUFDM0QsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUMzQixNQUFNLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztZQUNuQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7Z0JBQzFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDMUM7U0FDRjtJQUNILENBQUM7Ozs7Ozs7Ozs7SUFFRCx1QkFBTTs7Ozs7Ozs7O0lBQU4sVUFBTyxJQUFTLEVBQUUsZUFBbUMsRUFBRSxXQUFlLEVBQUUsS0FBUyxFQUFFLElBQXdCLEVBQUUsV0FBZTtRQUE1SCxpQkF5REM7UUF6RHNELDRCQUFBLEVBQUEsZUFBZTtRQUFFLHNCQUFBLEVBQUEsU0FBUztRQUFFLHFCQUFBLEVBQUEsU0FBd0I7UUFBRSw0QkFBQSxFQUFBLGVBQWU7UUFDMUgsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsMEZBQTBGO1FBQzFGLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFOztnQkFDN0MsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3pDLElBQUksZUFBZSxFQUFFO2dCQUNuQixZQUFZLENBQUMsVUFBVTs7OztnQkFBQyxVQUFBLEVBQUU7b0JBQ3hCLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFOzs0QkFDbkIsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7d0JBQ3JILGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ2xDO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLFlBQVk7aUJBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUM3QyxPQUFPLEVBQUUsTUFBTTtnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ25CLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO2FBQ3ZCLENBQUM7aUJBQ0QsSUFBSTs7OztZQUFDLFVBQUMsTUFBVzs7b0JBQ1osTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDeEMsT0FBTyxLQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLENBQUMsRUFBQztpQkFDRCxLQUFLOzs7O1lBQUMsVUFBQyxHQUFROztvQkFDVixTQUFTLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVk7Z0JBQy9ELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxDQUFDLEVBQUMsQ0FBQztTQUNOO2FBQU07O2dCQUNELGNBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUM3QyxPQUFPLElBQUksT0FBTzs7Ozs7WUFBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUNqQyxjQUFZLENBQUMsZUFBZTs7Ozs7Z0JBQUcsVUFBQyxRQUFhLEVBQUUsSUFBUztvQkFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUEsQ0FBQztnQkFDRixjQUFZLENBQUMsY0FBYzs7Ozs7OztnQkFBRyxVQUFDLElBQVMsRUFBRSxRQUFhLEVBQUUsTUFBVyxFQUFFLE9BQVk7b0JBQ2hGLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUM5QixjQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQzFCLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTs7NEJBQ2QsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO3dCQUNqQyxPQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3FCQUM5Qzt5QkFBTTt3QkFDTCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDbkQ7Z0JBQ0gsQ0FBQyxDQUFBLENBQUM7Z0JBQ0YsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLGNBQVksQ0FBQyxjQUFjOzs7OztvQkFBRyxVQUFDLElBQVMsRUFBRSxRQUFhOzs0QkFDakQsVUFBVSxHQUFHLFFBQVEsR0FBRyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7d0JBQy9GLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ25DLENBQUMsQ0FBQSxDQUFDO2lCQUNIO2dCQUNELGNBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxjQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7Z0JBQzFDLCtCQUErQjtnQkFDL0IsS0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdCLGNBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMzQixDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFFRCwyQkFBVTs7Ozs7OztJQUFWLFVBQVcsSUFBSSxFQUFFLGVBQW1DLEVBQUUsV0FBZSxFQUFFLEtBQVM7UUFBMUIsNEJBQUEsRUFBQSxlQUFlO1FBQUUsc0JBQUEsRUFBQSxTQUFTOztZQUMxRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7Ozs7SUFFRCw4QkFBYTs7Ozs7SUFBYixVQUFjLGNBQXNCLEVBQUUsTUFBVztRQUMvQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFOztvQkFDbkQsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLG9CQUFvQjtnQkFDbkQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ3ZCLE1BQU0sRUFBRTt3QkFDTixjQUFjLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQzt3QkFDeEQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO3dCQUNqQixNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDdkQsTUFBTSxRQUFBO3FCQUNQO2lCQUNGLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDOzs7OztJQUVELDJCQUFVOzs7O0lBQVYsVUFBVyxjQUFzQjs7WUFDM0IsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGlCQUFpQjtRQUNoRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQzs7OztJQUVELDhCQUFhOzs7SUFBYjs7WUFDTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsNkJBQTZCO1FBQzVELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRUQsdUJBQU07Ozs7O0lBQU4sVUFBTyxjQUFzQixFQUFFLEVBQVU7UUFDdkMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUU7YUFBTTs7Z0JBQ0QsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxDQUFDO1lBQ3BHLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDOzs7Ozs7SUFFRCwwQkFBUzs7Ozs7SUFBVCxVQUFVLGNBQXNCLEVBQUUsS0FBWTs7WUFDeEMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUM7O1lBQ2pFLFFBQVEsR0FBUSxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUN4RSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbEIsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkQ7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7Ozs7Ozs7OztJQUVELHlCQUFROzs7Ozs7Ozs7Ozs7O0lBQVIsVUFBUyxjQUFzQixFQUFFLE1BQXNCLEVBQUUsT0FBdUIsRUFBRSxNQUFlLEVBQUUsT0FBMEIsRUFBRSxLQUFvQixFQUFFLElBQVEsRUFBRSxLQUFVLEVBQUUsUUFBeUIsRUFBRSxZQUFtQjtRQUFwRSxxQkFBQSxFQUFBLFFBQVE7UUFBRSxzQkFBQSxFQUFBLFVBQVU7UUFBRSx5QkFBQSxFQUFBLGVBQXlCO1FBQUUsNkJBQUEsRUFBQSxtQkFBbUI7O1lBQ25OLEtBQUssR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDO1FBQzNELElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzdELE9BQU8sR0FBRyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUMzQixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQVksT0FBTyxFQUFBLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3RFLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNoQjtnQkFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDcEIsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDN0IsQ0FBQyxtQkFBSyxPQUFPLEVBQUEsQ0FBQyxDQUFDLE9BQU87Ozs7b0JBQUMsVUFBQSxDQUFDO3dCQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUN4RixDQUFDLEVBQUMsQ0FBQztpQkFDSjthQUNGO1NBQ0Y7O1lBRUcsS0FBSyxHQUFVLEVBQUU7UUFDckIsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNwQixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNuQjtRQUVELElBQUksS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDdEIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDckI7UUFFRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3QixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBbEMsQ0FBa0MsRUFBQyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBM0UsQ0FBMkUsRUFBQyxDQUFDO1NBQzNKO2FBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbEI7YUFBTTtZQUNMLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM3Qjs7WUFDRyxXQUFXLEdBQUcsSUFBSTs7WUFDbEIsV0FBVyxHQUFHLElBQUk7UUFDdEIsSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtZQUM1QyxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0Q7UUFFRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBWSxPQUFPLEVBQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkUsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLG1CQUFTLE9BQU8sRUFBQSxDQUFDLENBQUM7U0FDcEU7YUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUQsV0FBVyxHQUFHLE9BQU8sQ0FBQztTQUN2QjtRQUNELElBQUksV0FBVyxJQUFJLFdBQVcsRUFBRTtZQUM5QixLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUM7U0FDbkQ7YUFBTSxJQUFJLFdBQVcsRUFBRTtZQUN0QixLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztTQUMzQjthQUFNLElBQUksV0FBVyxFQUFFO1lBQ3RCLEtBQUssQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxZQUFZLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUMvQixLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDO1NBQ3BEO2FBQU0sSUFBSSxZQUFZLEVBQUU7WUFDdkIsS0FBSyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7U0FDNUI7UUFFRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckIsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDekI7UUFFRCxJQUFJLFFBQVEsRUFBRTtZQUNaLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzNCOztZQUVHLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7UUFDbkUsSUFBSSxjQUFjLEVBQUU7WUFDbEIsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNsQixLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUM1RDtpQkFBTTtnQkFDTCxLQUFLLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQzthQUNqQztTQUNGO1FBQ0Qsd0ZBQXdGO1FBQ3hGLElBQUksTUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFO1lBQzNDLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9FLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNuQixLQUFLLENBQUMsUUFBUSxHQUFHO29CQUNmLGNBQWMsRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLGNBQWM7b0JBQ25ELEtBQUssRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUs7b0JBQ2pDLE1BQU0sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU07b0JBQ25DLEtBQUssRUFBRSxXQUFXO2lCQUNuQixDQUFDO2FBQ0g7aUJBQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFVLEtBQUssQ0FBQyxRQUFRLEVBQUEsQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDekYsQ0FBQyxtQkFBVSxLQUFLLENBQUMsUUFBUSxFQUFBLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxtQkFBVSxLQUFLLENBQUMsUUFBUSxFQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2FBQzdGO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7Ozs7Ozs7SUFFRCx5QkFBUTs7Ozs7Ozs7O0lBQVIsVUFBUyxjQUFzQixFQUFFLE1BQWUsRUFBRSxPQUFpQixFQUFFLFFBQXlCLEVBQUUsWUFBbUIsRUFBRSxTQUEwQjtRQUEvSSxpQkF5Q0M7UUF6Q29FLHlCQUFBLEVBQUEsZUFBeUI7UUFBRSw2QkFBQSxFQUFBLG1CQUFtQjtRQUFFLDBCQUFBLEVBQUEsaUJBQTBCO1FBQzdJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQzNHLEdBQUc7Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQ0wsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUN4QyxDQUFDLEVBQUMsQ0FDSCxDQUFDO1NBQ0g7YUFBTTs7Z0JBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDOztnQkFDNUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxRQUFROzs7Z0JBQzVFLFVBQVUsR0FBUSxFQUFFO1lBQ3hCLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDZixVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDaEM7WUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUN0Qzs7Z0JBRUcsVUFBUTtZQUNaLE9BQU8sSUFBSSxDQUFDLEVBQUU7aUJBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7aUJBQ3JCLElBQUksQ0FDSCxRQUFROzs7O1lBQUMsVUFBQSxHQUFHO2dCQUNWLFVBQVEsR0FBRyxHQUFHLENBQUM7Z0JBQ2YsSUFBSSxTQUFTLEVBQUU7b0JBQ2IsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztpQkFDeEc7WUFDSCxDQUFDLEVBQUMsQ0FDSDtpQkFDQSxJQUFJLENBQ0gsR0FBRzs7OztZQUFDLFVBQUEsVUFBVTs7b0JBQ1IsS0FBSyxHQUFHLFVBQVEsSUFBSSxDQUFDO2dCQUN6QixJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDdEMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUM7aUJBQzNCO2dCQUNELE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNwQyxDQUFDLEVBQUMsQ0FDSCxDQUFDO1NBQ0w7SUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRUQsdUJBQU07Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFOLFVBQU8sY0FBc0IsRUFBRSxNQUFzQixFQUFFLE9BQXVCLEVBQUUsTUFBZSxFQUFFLE9BQWlCLEVBQUUsS0FBb0IsRUFBRSxJQUFRLEVBQUUsS0FBVSxFQUFFLEdBQVcsRUFBRSxRQUF5QixFQUFFLFlBQW1CLEVBQUUsT0FBc0IsRUFBRSxVQUEwQixFQUFFLE9BQXdCLEVBQUUsU0FBMEI7UUFBclUsaUJBeURDO1FBekR5SSxxQkFBQSxFQUFBLFFBQVE7UUFBRSxzQkFBQSxFQUFBLFVBQVU7UUFBRSxvQkFBQSxFQUFBLFdBQVc7UUFBRSx5QkFBQSxFQUFBLGVBQXlCO1FBQUUsNkJBQUEsRUFBQSxtQkFBbUI7UUFBRSx3QkFBQSxFQUFBLGNBQXNCO1FBQUUsMkJBQUEsRUFBQSxpQkFBMEI7UUFBRSx3QkFBQSxFQUFBLGVBQXdCO1FBQUUsMEJBQUEsRUFBQSxpQkFBMEI7UUFDblUsSUFBSSxjQUFjLEtBQUssWUFBWSxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxjQUFjLEtBQUssVUFBVSxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdEU7YUFBTTs7Z0JBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO1lBQ3ZILElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEQ7O2dCQUNHLEdBQUcsU0FBQTtZQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDNUMsR0FBRzs7OztvQkFBQyxVQUFBLEdBQUc7d0JBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxDQUFDLEVBQUMsQ0FDSCxDQUFDO2lCQUNIO3FCQUFNO29CQUNMLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzdHO2FBQ0Y7aUJBQU07O29CQUNELFVBQVE7Z0JBQ1osR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDO3FCQUMvRCxJQUFJLENBQ0gsUUFBUTs7OztnQkFBQyxVQUFBLEdBQUc7b0JBQ1YsVUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFDZixJQUFJLE9BQU8sRUFBRTt3QkFDWCxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7cUJBQ3BDO29CQUNELElBQUksU0FBUyxFQUFFO3dCQUNiLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNmO3lCQUFNO3dCQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO3FCQUNuSDtnQkFDSCxDQUFDLEVBQUMsQ0FDSDtxQkFDQSxJQUFJLENBQ0gsR0FBRzs7OztnQkFBQyxVQUFDLFVBQWU7b0JBQ2xCLElBQUksT0FBTyxFQUFFO3dCQUNYLFVBQVEsb0JBQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUssQ0FBQyxVQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDekQ7eUJBQU07d0JBQ0wsVUFBUSxDQUFDLElBQUksb0JBQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFLLENBQUMsVUFBUSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUN4RTtvQkFDRCxPQUFPLFVBQVEsQ0FBQztnQkFDbEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQzthQUNMO1lBQ0QsT0FBTyxHQUFHLENBQUM7U0FDWjtJQUNILENBQUM7Ozs7Ozs7Ozs7SUFFRCwyQkFBVTs7Ozs7Ozs7O0lBQVYsVUFBVyxjQUFzQixFQUFFLE1BQWUsRUFBRSxPQUFpQixFQUFFLElBQVEsRUFBRSxLQUFVLEVBQUUsaUJBQXlCO1FBQS9DLHFCQUFBLEVBQUEsUUFBUTtRQUFFLHNCQUFBLEVBQUEsVUFBVTtRQUFFLGtDQUFBLEVBQUEseUJBQXlCO1FBQ3BILE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixtR0FBbUc7UUFDbkcsSUFBSSxjQUFjLEtBQUssV0FBVyxFQUFFO1lBQ2xDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsRUFBRTtnQkFDdEIsT0FBTyxFQUFFLENBQUMsTUFBTTs7OztnQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFyQixDQUFxQixFQUFDLENBQUM7WUFDL0MsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLENBQUM7U0FDcEU7YUFBTSxJQUFJLGlCQUFpQixFQUFFOzs7Z0JBRXhCLGdCQUFnQixHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUMvWCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztZQUFDLFVBQUMsR0FBUSxJQUFLLE9BQUEsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUE3RixDQUE2RixFQUFDLENBQUMsQ0FBQztTQUM5TDthQUFNOztnQkFDRCxnQkFBZ0IsR0FBZSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO1lBQ3pELElBQUksTUFBTSxFQUFFO2dCQUNWLGdCQUFnQixDQUFDLElBQUksQ0FBQztvQkFDcEIsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFO2lCQUNsRixDQUFDLENBQUM7YUFDSjtZQUVELGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLE1BQU0sbUJBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUM3UCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxHQUFvQjtnQkFBcEIsb0JBQUEsRUFBQSxRQUFvQjtnQkFBSyxPQUFBLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFBbEMsQ0FBa0MsRUFBQyxDQUFDLENBQUM7U0FDL0k7SUFDSCxDQUFDOzs7OztJQUVELGtDQUFpQjs7OztJQUFqQixVQUFrQixNQUFzRTtRQUN0RixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3ZILEdBQUc7Ozs7UUFBQyxVQUFDLEdBQW1COztnQkFDbEIsSUFBSSxHQUFHLEVBQUU7O2dCQUNULEtBQUssR0FBUSxFQUFFO1lBQ25CLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixHQUFHLENBQUMsT0FBTzs7OztnQkFBQyxVQUFBLENBQUM7b0JBQ1gsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFO3dCQUNWLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU87Ozs7d0JBQUMsVUFBQSxHQUFHOzRCQUMzQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRCxDQUFDLEVBQUMsQ0FBQztxQkFDSjtnQkFDSCxDQUFDLEVBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTzs7OztnQkFBQyxVQUFBLEdBQUc7b0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsRUFBQyxDQUFDO2dCQUNILElBQUksR0FBRyxPQUFPLENBQUMsSUFBSTs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUixDQUFRLEVBQUMsQ0FBQzthQUNyQztZQUNELE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDO1FBQzlDLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRUQsbUNBQWtCOzs7Ozs7SUFBbEIsVUFBbUIsTUFBNkYsRUFBRSxJQUFRLEVBQUUsS0FBVTtRQUF0SSxpQkEwQkM7UUExQmlILHFCQUFBLEVBQUEsUUFBUTtRQUFFLHNCQUFBLEVBQUEsVUFBVTtRQUNwSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUU7O2dCQUN4QixHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBekIsQ0FBeUIsRUFBQztZQUNwRCxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzVCLEdBQUc7Ozs7WUFBQyxVQUFBLEdBQUc7Z0JBQ0wsT0FBTyxHQUFHLENBQUM7WUFDYixDQUFDLEVBQUMsQ0FDSCxDQUFDO1NBQ0g7YUFBTTs7Z0JBQ0Qsa0JBQWdCLHFCQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztnQkFDelAsT0FBTyxHQUFZLE1BQU0sQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxJQUFJOztvQkFDaEMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRTtnQkFDaEMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFdBQVcsRUFBRTtvQkFDdkMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHOzs7O29CQUFDLFVBQUEsRUFBRTt3QkFDdEIsT0FBTyxFQUFFLENBQUMsTUFBTTs7Ozt3QkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFyQixDQUFxQixFQUFDLENBQUM7b0JBQy9DLENBQUMsRUFBQyxDQUFDO2lCQUNKO2dCQUNELE9BQU8sS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxFQUFFLGtCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlILENBQUMsRUFBQztZQUNGLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDeEMsR0FBRzs7OztZQUFDLFVBQUEsSUFBSTs7b0JBQ0YsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHOzs7OztnQkFBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBckQsQ0FBcUQsRUFBQztnQkFDeEYsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFFRCw0QkFBVzs7Ozs7OztJQUFYLFVBQVksY0FBYyxFQUFFLEtBQVksRUFBRSxVQUFvQixFQUFFLE9BQWlCOztZQUMzRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxHQUFHLE9BQU87UUFDL0UsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvRSx5R0FBeUc7UUFDekcsZ0NBQWdDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsaUNBQWdCOzs7O0lBQWhCLFVBQWlCLE1BQWU7UUFDOUIsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUNsRSxHQUFHOzs7O1lBQUMsVUFBQSxXQUFXOztvQkFDVCxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU07Ozs7Z0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFqQyxDQUFpQyxFQUFDO2dCQUNqRixPQUFPO29CQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTTtvQkFDckIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHOzs7O29CQUFDLFVBQUEsQ0FBQzs7NEJBQ2IsUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO3dCQUNoRCxPQUFPOzRCQUNMLE9BQU8sRUFBRSxDQUFDLENBQUMsaUJBQWlCOzRCQUM1QixHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUU7NEJBQ1QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUNoQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRTt5QkFDMUIsQ0FBQztvQkFDSixDQUFDLEVBQUM7aUJBQ0gsQ0FBQztZQUNKLENBQUMsRUFBQyxDQUNILENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekQsR0FBRzs7OztZQUFDLFVBQUEsU0FBUztnQkFDWCxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQ3RELENBQUMsRUFBQyxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7Ozs7Ozs7SUFFRCwrQkFBYzs7Ozs7O0lBQWQsVUFBZSxNQUFlLEVBQUUsSUFBYSxFQUFFLEtBQWM7UUFDM0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQUVELGdDQUFlOzs7OztJQUFmLFVBQWdCLGNBQXNCLEVBQUUsTUFBZTs7WUFDakQsV0FBVyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUMxRCxRQUFRLFdBQVcsRUFBRTtZQUNuQixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxtQkFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFBLENBQUM7U0FDN0M7UUFDRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRUQsZ0NBQWU7Ozs7O0lBQWYsVUFBZ0IsY0FBc0IsRUFBRSxLQUFZOztZQUM5QyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsd0JBQXdCO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLEVBQUU7YUFDWCxJQUFJLENBQ0gsR0FBRyxFQUNIO1lBQ0UsY0FBYyxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUM7WUFDcEYsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLOztZQUVsQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7WUFDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1NBQ2pCLEVBQ0QsSUFBSSxFQUNKLElBQUksQ0FDTDthQUNBLElBQUksQ0FDSCxHQUFHOzs7O1FBQUMsVUFBQSxHQUFHO1lBQ0wsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUM1QixHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBbUI7YUFDekM7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBQyxDQUNILENBQUM7SUFDTixDQUFDOzs7Ozs7SUFFRCw2QkFBWTs7Ozs7SUFBWixVQUFhLFFBQWUsRUFBRSxhQUFvQztRQUFsRSxpQkFvRkM7O1lBbkZLLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFO1FBQ3hELElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7O2dCQUNyQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUc7Ozs7O1lBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEM7OztnQkFBTztvQkFDTCxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO3dCQUNsQixPQUFPO3FCQUNSO29CQUNELEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekQsT0FBTyxLQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJOzs7O29CQUFDLFVBQUEsSUFBSTs7NEJBQ3ZELE9BQU8sR0FBWSxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN2RCxPQUFPLENBQUMsT0FBTzs7Ozt3QkFBQyxVQUFBLEVBQUU7NEJBQ2hCLE9BQUEsRUFBRSxDQUFDLE9BQU87Ozs7NEJBQUMsVUFBQSxDQUFDO2dDQUNWLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFO29DQUMxRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUNBQ25GOzRCQUNILENBQUMsRUFBQzt3QkFKRixDQUlFLEVBQ0gsQ0FBQzt3QkFDRixJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDL0IsU0FBUzs0QkFDVCxPQUFPLENBQUMsT0FBTzs7Ozs0QkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBcEUsQ0FBb0UsRUFBQyxDQUFDO3lCQUM1Rjt3QkFFRCxPQUFPLENBQ0wsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzs2QkFDN0ksU0FBUyxFQUFFOzRCQUNaLGlEQUFpRDs0QkFDakQsZUFBZTs0QkFDZiwrQ0FBK0M7NEJBQy9DLDBHQUEwRzs0QkFDMUcsNElBQTRJOzRCQUM1SSxJQUFJOzRCQUNKLHlCQUF5Qjs0QkFDekIsMENBQTBDOzRCQUMxQyx1REFBdUQ7NEJBQ3ZELGFBQWE7NEJBQ2IsdUJBQXVCOzRCQUN2QixjQUFjOzRCQUNkLE9BQU87NEJBQ1AsS0FBSzs2QkFDSixJQUFJOzs7O3dCQUFDLFVBQUEsR0FBRzs0QkFDUCxJQUFJLGFBQWEsRUFBRTtnQ0FDakIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7NkJBQ3BEOzRCQUNELElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7O29DQUNmLGNBQVksR0FBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O29DQUNsRCxhQUEwQjtnQ0FDOUIsSUFBSSxRQUFRLEVBQUU7b0NBQ1osY0FBWSxHQUFHO3dDQUNiLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzs2Q0FDdEMsU0FBUyxFQUFFOzZDQUNYLElBQUk7Ozs7d0NBQUMsVUFBQyxXQUEwQjs0Q0FDL0IsYUFBVyxHQUFHLFdBQVcsQ0FBQzt3Q0FDNUIsQ0FBQyxFQUFDO3FDQUNMLENBQUM7aUNBQ0g7Z0NBQ0QsSUFBSSxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQ0FDbkQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPOzs7O29DQUFDLFVBQUEsR0FBRzt3Q0FDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPOzs7O3dDQUFDLFVBQUEsSUFBSTs0Q0FDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0RBQ2IsY0FBWSxDQUFDLElBQUk7OztnREFBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFwQixDQUFvQixFQUFDLENBQUM7NkNBQy9DO3dDQUNILENBQUMsRUFBQyxDQUFDO29DQUNMLENBQUMsRUFBQyxDQUFDO2lDQUNKO2dDQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFZLENBQUMsQ0FBQyxJQUFJOzs7Z0NBQUM7b0NBQ3BDLE9BQU8sS0FBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQVcsQ0FBQyxDQUFDO2dDQUN2RixDQUFDLEVBQUMsQ0FBQzs2QkFDSjt3QkFDSCxDQUFDLEVBQUMsQ0FDTCxDQUFDO29CQUNKLENBQUMsRUFBQyxDQUFDO2dCQUNMLENBQUMsRUFBQztZQUNKLENBQUMsRUFBQztZQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsR0FBRztnQkFDL0MsSUFBSSxhQUFhLEVBQUU7b0JBQ2pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO2dCQUNELE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsOEJBQWE7OztJQUFiO1FBQUEsaUJBU0M7O1lBUkssV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUU7UUFDeEQsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O2dCQUNyQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFBLEtBQUs7Z0JBQ2xDOzs7Z0JBQU8sY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUE5QyxDQUE4QyxFQUFDO1lBQzlELENBQUMsRUFBQztZQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRUQsbUNBQWtCOzs7OztJQUFsQixVQUFtQixjQUFzQixFQUFFLElBQWU7UUFDeEQsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7O1lBQ2QsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLDZCQUE2Qjs7WUFDeEQsU0FBUyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDO1FBQzlELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsU0FBUyxXQUFBLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxFQUFMLENBQUssRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3JFLEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU07WUFDUixJQUFJLE1BQU0sRUFBRTtnQkFDVixPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7YUFDckI7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7O0lBRUQsd0NBQXVCOzs7SUFBdkI7UUFDRSxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7OztJQUVELCtCQUFjOzs7O0lBQWQsVUFBZSxlQUFzQztRQUNuRCxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7O0lBRUQseUNBQXdCOzs7OztJQUF4QixVQUF5QixXQUFvQixFQUFFLGVBQXNDO1FBQXJGLGlCQW9FQzs7WUFuRUssS0FBSyxHQUFHLENBQUM7O1lBQ1QsS0FBSyxHQUFHLENBQUM7O1lBQ1QsV0FBVyxHQUFHLEVBQUU7UUFFcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7O2dCQUM1QixhQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRTtZQUV4RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQWUsY0FBYyxDQUFDLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsWUFBWTtnQkFDckYsSUFBSSxhQUFXLElBQUksYUFBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3pDLGFBQVcsR0FBRyxTQUFTLENBQUMsYUFBVyxDQUFDLENBQUM7b0JBQ3JDLGFBQVcsR0FBRyxhQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHOzs7O29CQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBbEIsQ0FBa0IsRUFBQyxDQUFDLENBQUM7O3dCQUN4RSxhQUFhLEdBQUcsYUFBVyxDQUFDLEdBQUc7Ozs7b0JBQUMsVUFBQSxLQUFLO3dCQUN2Qzs7O3dCQUFPOzRCQUNMLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTs7Ozs0QkFBQyxVQUFBLElBQUk7Z0NBQ3BELElBQUksR0FBRyxJQUFJLENBQUMsTUFBTTs7OztnQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBQSxDQUFDLEVBQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQXhELENBQXdELEVBQUMsQ0FBQztnQ0FDbEYsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7Z0NBQy9CLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDOzRCQUN2QixDQUFDLEVBQUM7d0JBSkYsQ0FJRSxFQUFDO29CQUNQLENBQUMsRUFBQztvQkFDRixPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUk7OztvQkFBQzt3QkFDakQsSUFBSSxXQUFXLEVBQUU7NEJBQ2YsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzs0QkFDakMsT0FBTyxLQUFLLENBQUM7eUJBQ2Q7NkJBQU07NEJBQ0wsS0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUMvQyxJQUFJLGVBQWUsRUFBRTtnQ0FDbkIsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUM3RDs7Z0NBQ0csVUFBUSxHQUFlLEVBQUU7NEJBQzdCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQ0FDYixhQUFXLENBQUMsT0FBTzs7OztnQ0FBQyxVQUFBLEtBQUs7O3dDQUNuQixJQUFJLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0NBQ2xDLElBQUksQ0FBQyxPQUFPOzs7O29DQUFDLFVBQUEsTUFBTTt3Q0FDakIsVUFBUSxDQUFDLElBQUk7Ozt3Q0FBQzs7Z0RBQ1IsU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHOzRDQUMxQixNQUFNLHdCQUFRLE1BQU0sQ0FBRSxDQUFDOzRDQUN2QixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7NENBQ2xCLE9BQU8sS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztpREFDbkMsU0FBUyxFQUFFO2lEQUNYLElBQUk7Ozs7NENBQUMsVUFBQSxNQUFNO2dEQUNWLEtBQUssSUFBSSxDQUFDLENBQUM7Z0RBQ1gsSUFBSSxlQUFlLEVBQUU7b0RBQ25CLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7aURBQzdDO2dEQUNELEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnREFDL0MsT0FBTyxLQUFJLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRDQUNqRixDQUFDLEVBQUMsQ0FBQzt3Q0FDUCxDQUFDLEVBQUMsQ0FBQztvQ0FDTCxDQUFDLEVBQUMsQ0FBQztnQ0FDTCxDQUFDLEVBQUMsQ0FBQzs2QkFDSjs0QkFDRCxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVEsQ0FBQyxDQUFDLElBQUk7Ozs0QkFBQztnQ0FDNUMsVUFBVTs7O2dDQUFDO29DQUNULElBQUksZUFBZSxFQUFFO3dDQUNuQixlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FDQUMzQjtnQ0FDSCxDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQ1IsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztnQ0FDakMsT0FBTyxLQUFLLENBQUM7NEJBQ2YsQ0FBQyxFQUFDLENBQUM7eUJBQ0o7b0JBQ0gsQ0FBQyxFQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVELGdDQUFlOzs7O0lBQWYsVUFBZ0IsTUFBZTtRQUM3QixPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRUQsNEJBQVc7Ozs7SUFBWCxVQUFZLEVBQVU7UUFDcEIsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7Ozs7Ozs7Ozs7O0lBRUQsOEJBQWE7Ozs7Ozs7Ozs7OztJQUFiLFVBQWMsY0FBc0IsRUFBRSxXQUFvQixFQUFFLE1BQWUsRUFBRSxPQUFpQixFQUFFLEtBQW9CLEVBQUUsSUFBUSxFQUFFLEtBQVUsRUFBRSxZQUFtQixFQUFFLE9BQXdCO1FBQXpMLGlCQXlGQztRQXpGcUgscUJBQUEsRUFBQSxRQUFRO1FBQUUsc0JBQUEsRUFBQSxVQUFVO1FBQUUsNkJBQUEsRUFBQSxtQkFBbUI7UUFBRSx3QkFBQSxFQUFBLGVBQXdCO1FBQ3ZMLE9BQU8sSUFBSSxDQUNULElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSTs7OztRQUFDLFVBQUEsSUFBSTs7Z0JBQ3BELEtBQUssR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDO1lBQzNELElBQUksV0FBVyxFQUFFO2dCQUNmLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQXZCLENBQXVCLEVBQUMsQ0FBQzthQUNsRDtZQUVELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztvQkFDN0IsU0FBTyxHQUFtQixFQUFFO2dCQUNoQyxPQUFPLENBQUMsT0FBTzs7OztnQkFBQyxVQUFBLEVBQUU7O3dCQUNaLE9BQU8sb0JBQU8sSUFBSSxDQUFDO29CQUN2QixFQUFFLENBQUMsTUFBTTs7OztvQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLEVBQTVCLENBQTRCLEVBQUMsQ0FBQyxPQUFPOzs7O29CQUFDLFVBQUEsQ0FBQzt3QkFDcEQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNOzs7O3dCQUFDLFVBQUEsQ0FBQzs7Z0NBQ3BCLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7NEJBQ3pKLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO2dDQUN4RCxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO29DQUN0QixLQUFLLElBQUk7d0NBQ1AsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQ0FDcEMsS0FBSyxLQUFLO3dDQUNSLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQ0FDckMsS0FBSyxLQUFLO3dDQUNSLE9BQU8sWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29DQUMxRSxLQUFLLEtBQUs7d0NBQ1IsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7b0NBQzNFLEtBQUssSUFBSTt3Q0FDUCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO29DQUM1QixLQUFLLEtBQUs7d0NBQ1IsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQztvQ0FDN0IsS0FBSyxJQUFJO3dDQUNQLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7b0NBQzVCLEtBQUssS0FBSzt3Q0FDUixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDO29DQUM3QixLQUFLLFlBQVk7d0NBQ2YsQ0FBQyxtQkFBQSxDQUFDLEVBQU8sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNoRyxPQUFPLENBQUMsbUJBQUEsQ0FBQyxFQUFPLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQzt3Q0FDbkMsTUFBTTtvQ0FDUixLQUFLLFFBQVE7d0NBQ1gsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3Q0FDdEMsTUFBTTtpQ0FDVDs2QkFDRjtpQ0FBTTtnQ0FDTCxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO29DQUN0QixLQUFLLEtBQUssQ0FBQztvQ0FDWCxLQUFLLEtBQUs7d0NBQ1IsT0FBTyxJQUFJLENBQUM7b0NBRWQsS0FBSyxLQUFLO3dDQUNSLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUM1Qzs2QkFDRjt3QkFDSCxDQUFDLEVBQUMsQ0FBQztvQkFDTCxDQUFDLEVBQUMsQ0FBQztvQkFDSCxTQUFPLG9CQUFPLFNBQU8sRUFBSyxPQUFPLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxFQUFDLENBQUM7Z0JBQ0gsSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFPOzs7O2dCQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsRUFBTCxDQUFLLEVBQUMsQ0FBQzthQUNwQztZQUVELElBQUksTUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzdDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTTs7OztnQkFBQyxVQUFBLENBQUM7b0JBQ2xCLElBQ0UsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUk7Ozs7b0JBQ3pCLFVBQUEsSUFBSTt3QkFDRixPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ1AsQ0FBQyxDQUFDLElBQUksQ0FBQztpQ0FDSixRQUFRLEVBQUU7aUNBQ1YsV0FBVyxFQUFFO2lDQUNiLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUpyQyxDQUlxQyxFQUN4QyxFQUNEO3dCQUNBLE9BQU8sSUFBSSxDQUFDO3FCQUNiO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNmLENBQUMsRUFBQyxDQUFDO2FBQ0o7WUFDRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLElBQUk7Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLFlBQVksRUFBL0IsQ0FBK0IsRUFBQyxFQUE3QyxDQUE2QyxFQUFDLEVBQUU7Z0JBQ2hGLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUNwQztZQUNELElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLEVBQUMsRUFBRSxLQUFLLENBQUMsR0FBRzs7OztnQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxFQUFDLENBQUMsQ0FBQzthQUN2RTs7Z0JBQ0csS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNO1lBQ3ZCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDYixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDakIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQzthQUN2QztZQUNELE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdkQsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBRUQsK0JBQWM7Ozs7Ozs7Ozs7Ozs7SUFBZCxVQUFlLGNBQXNCLEVBQUUsT0FBaUIsRUFBRSxnQkFBNkIsRUFBRSxNQUFlLEVBQUUsY0FBMkIsRUFBRSxZQUFvQixFQUFFLE9BQXNCLEVBQUUsWUFBa0IsRUFBRSxRQUFtQixFQUFFLHVCQUE2QjtRQUEzUCxpQkFnREM7UUFoRHNJLDZCQUFBLEVBQUEsb0JBQW9CO1FBQUUsd0JBQUEsRUFBQSxjQUFzQjs7WUFDN0ssR0FBb0I7UUFDeEIsY0FBYyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzVCLElBQUksT0FBTyxFQUFFO2dCQUNYLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUMzQztpQkFBTSxJQUFJLHVCQUF1QixFQUFFO2dCQUNsQyxHQUFHLEdBQUcsSUFBSSxDQUNSLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSTs7OztnQkFBQyxVQUFBLElBQUk7b0JBQ3hELElBQUksR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckMsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7cUJBQ3ZEO3lCQUFNO3dCQUNMLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7cUJBQ3ZCO2dCQUNILENBQUMsRUFBQyxDQUNILENBQUM7YUFDSDtpQkFBTTtnQkFDTCxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNsQztTQUNGO2FBQU0sSUFBSSxjQUFjLEtBQUssZUFBZSxFQUFFO1lBQzdDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzdDO2FBQU07O2dCQUNELEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyw4QkFBOEI7O2dCQUN6RCxLQUFLLEdBQVUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQztZQUNsSixHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUM3QyxHQUFHOzs7O1lBQUMsVUFBQSxNQUFNO2dCQUNSLElBQUksT0FBTyxFQUFFO29CQUNYLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDdkM7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztTQUNIO1FBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNiLEdBQUc7Ozs7UUFBQyxVQUFDLE1BQVc7O2dCQUNWLElBQUksR0FBRyxFQUFFO1lBQ2IsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25ELElBQUksWUFBWSxFQUFFO29CQUNoQixJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkI7cUJBQU07b0JBQ0wsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQ3BCO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRUQsaUNBQWdCOzs7Ozs7SUFBaEIsVUFBaUIsT0FBcUIsRUFBRSxZQUFvQixFQUFFLE9BQXNCO1FBQXBGLGlCQStDQztRQS9DdUMsNkJBQUEsRUFBQSxvQkFBb0I7UUFBRSx3QkFBQSxFQUFBLGNBQXNCOztZQUM5RSxHQUFvQjtRQUN4QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQzNDO2lCQUFNO2dCQUNMLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7YUFBTTs7Z0JBQ0QsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGdDQUFnQztZQUMvRCxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDbkMsR0FBRzs7OztZQUFDLFVBQUMsTUFBNEI7O29CQUMzQixVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUNwQjtnQkFDRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztnQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQWYsQ0FBZSxFQUFDLEVBQUU7b0JBQ25FLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztvQkFBQyxVQUFDLENBQThCO3dCQUNqRCxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNoRCxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2xDLENBQUMsRUFBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO2lCQUMxQjtxQkFBTSxJQUFJLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDckUsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7aUJBQzFCO2dCQUVELElBQUksT0FBTyxFQUFFO29CQUNYLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDdkM7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztTQUNIO1FBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNiLEdBQUc7Ozs7UUFBQyxVQUFDLE1BQVc7O2dCQUNWLElBQUksR0FBRyxFQUFFO1lBQ2IsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25ELElBQUksWUFBWSxFQUFFO29CQUNoQixJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkI7cUJBQU07b0JBQ0wsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7aUJBQ3BCO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7Ozs7Ozs7SUFFRCxrQ0FBaUI7Ozs7Ozs7Ozs7O0lBQWpCLFVBQWtCLGNBQXNCLEVBQUUsT0FBaUIsRUFBRSxnQkFBNkIsRUFBRSxNQUFlLEVBQUUsY0FBMkIsRUFBRSxZQUFvQixFQUFFLFlBQWtCLEVBQUUsUUFBbUI7UUFBN0QsNkJBQUEsRUFBQSxvQkFBb0I7O1lBQ3hKLEtBQUssR0FBRyxFQUFFOztZQUNWLE9BQU8sR0FBRyxFQUFFOztZQUNaLFdBQVcsR0FBRyxJQUFJOztZQUNsQixXQUFXLEdBQUcsSUFBSTs7WUFDbEIsYUFBYSxHQUFHLEVBQUU7O1lBQ2xCLEtBQUssR0FBVSxtQkFBTztZQUN4QixjQUFjLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUM7WUFDOUQsWUFBWSxjQUFBO1NBQ2IsRUFBQTtRQUNELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDM0U7UUFFRCxJQUFJLE1BQU0sRUFBRTtZQUNWLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksV0FBVyxJQUFJLFdBQVcsRUFBRTtZQUM5QixLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUM7U0FDbkQ7YUFBTSxJQUFJLFdBQVcsRUFBRTtZQUN0QixLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztTQUMzQjthQUFNLElBQUksV0FBVyxFQUFFO1lBQ3RCLEtBQUssQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxZQUFZLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUMvQixLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDO1NBQ3BEO2FBQU0sSUFBSSxZQUFZLEVBQUU7WUFDdkIsS0FBSyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7U0FDNUI7UUFDRCxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBRWhDLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdDLGFBQWEsQ0FBQyxPQUFPOzs7OztZQUFDLFVBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25CLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUNqQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0RSxJQUFJLFFBQVEsRUFBRTtZQUNaLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7O0lBRUQsOEJBQWE7Ozs7OztJQUFiLFVBQWMsTUFBbUIsRUFBRSxNQUFzQixFQUFFLE9BQXVCOztZQUM1RSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsOEJBQThCO1FBQzdELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7OztJQUVELDJCQUFVOzs7OztJQUFWLFVBQVcsS0FBYSxFQUFFLGNBQXNCOztZQUMxQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsMEJBQTBCO1FBQ3pELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7Ozs7O0lBRUQsMkJBQVU7Ozs7Ozs7O0lBQVYsVUFBVyxJQUFVLEVBQUUsS0FBNkIsRUFBRSxVQUFpQixFQUFFLFFBQWlCLEVBQUUsU0FBa0I7UUFBeEQsMkJBQUEsRUFBQSxpQkFBaUI7UUFDckUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUMxQixZQUFZLEVBQUUsSUFBSTtZQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDcEIsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsVUFBVTtZQUN0QixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsVUFBVSxFQUFFLFNBQVM7U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsZ0NBQWU7Ozs7O0lBQWYsVUFBZ0IsU0FBVSxFQUFFLFdBQVk7O1lBQ2xDLE9BQU8sR0FBUTtZQUNqQixXQUFXLEVBQUUsV0FBVztZQUN4QixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTO1NBQzNCO1FBQ0QsMkNBQTJDO1FBQzNDLDJDQUEyQztRQUMzQyxJQUFJO1FBQ0osT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELHdCQUFPOzs7O0lBQVAsVUFBUSxNQUFNOztZQUNSLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxtQkFBbUI7UUFDbEQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCw4QkFBYTs7OztJQUFiLFVBQWMsV0FBbUI7O1lBQzNCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxzQkFBc0I7UUFDckQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLGFBQUEsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCwyQkFBVTs7OztJQUFWLFVBQVcsU0FBMEI7UUFDbkMsT0FBTyxTQUFTO2FBQ2IsTUFBTTs7OztRQUFDLFVBQUMsQ0FBVyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWpDLENBQWlDLEVBQUM7YUFDMUQsR0FBRzs7OztRQUFDLFVBQUMsQ0FBVztZQUNmLE9BQU87Z0JBQ0wsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHO2dCQUNWLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztnQkFDbEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixTQUFTLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSztnQkFDZCxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTTthQUN6SixDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBRUQsc0NBQXFCOzs7Ozs7SUFBckIsVUFDRSxFQUEwQixFQUMxQixJQUFZLEVBQ1osWUFBa0I7O1lBY2QsS0FBSyxHQUFlLG1CQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFBOztZQUM1RCxHQUFHLEdBQUcsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsVUFBVTs7WUFDL0YsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDOztZQUVwRSxPQUFPLEdBQUc7WUFDWjtnQkFDRSxRQUFRLEVBQUU7b0JBQ1IsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHO29CQUNkLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMzRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0UsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQy9FLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM3RSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDN0UsWUFBWSxFQUFFLGVBQWU7aUJBQzlCO2FBQ0Y7WUFDRDtnQkFDRSxNQUFNLEVBQUU7b0JBQ04sR0FBRyxFQUFFLE1BQU07b0JBQ1gsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtvQkFDM0IsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtvQkFDL0IsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtvQkFDL0IsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRTtvQkFDakMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtvQkFDL0IsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRTtvQkFDakMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtpQkFDbkI7YUFDRjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQ2xHLEdBQUc7Ozs7UUFBQyxVQUFDLEtBQVU7WUFDYixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDN0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFILEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDMUc7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7Ozs7SUFFRCw2QkFBWTs7Ozs7Ozs7SUFBWixVQUFhLE9BQWdCLEVBQUUsU0FBaUIsRUFBRSxTQUEwQixFQUFFLE9BQXVCLEVBQUUsUUFBeUI7UUFBOUUsMEJBQUEsRUFBQSwwQkFBMEI7UUFBMkIseUJBQUEsRUFBQSxnQkFBeUI7UUFDOUgsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUN4QixPQUFPLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsRUFBRTtnQkFDaEIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLEVBQUU7Ozs7Z0JBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBckIsQ0FBcUIsRUFBQyxDQUFDO2dCQUM5QyxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUNOLEtBQUssRUFBRSxTQUFTO29CQUNoQixRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7b0JBQzVDLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO2lCQUMvRSxDQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7OztJQUVPLDBCQUFTOzs7Ozs7SUFBakIsVUFBa0IsTUFBTSxFQUFFLE9BQTJCO1FBQXJELGlCQWdDQztRQWhDeUIsd0JBQUEsRUFBQSxZQUEyQjs7WUFDL0MsTUFBTSxHQUFHLEtBQUs7Z0NBQ1QsSUFBSTtZQUNYLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFLLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZFLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sQ0FBQyxPQUFPOzs7O1lBQUUsVUFBQSxNQUFNO2dCQUNyQixJQUFJLE1BQU0sRUFBRTs7d0JBQ04sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQztvQkFDdkMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Ozs0QkFFZixlQUFlLEdBQUcsWUFBWTs7NEJBQzlCLFdBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxlQUFlLENBQUM7d0JBQ25ELE1BQU0sQ0FBQyxPQUFPOzs7Ozt3QkFBQyxVQUFDLENBQUMsRUFBRSxLQUFLOzRCQUN0QixJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUM3QixNQUFNLEdBQUcsSUFBSSxDQUFDOzZCQUNmOzRCQUNELElBQUksV0FBUyxJQUFJLFdBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFO2dDQUMxRCxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQ0FDakQsTUFBTSxHQUFHLElBQUksQ0FBQztpQ0FDZjs2QkFDRjt3QkFDSCxDQUFDLEVBQUMsQ0FBQztxQkFDSjt5QkFBTTt3QkFDTCxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUU7NEJBQ3RELE1BQU0sR0FBRyxJQUFJLENBQUM7eUJBQ2Y7cUJBQ0Y7aUJBQ0Y7WUFDSCxDQUFDLEVBQUMsQ0FBQzs7O1FBM0JMLEtBQUssSUFBSSxJQUFJLElBQUksTUFBTTtvQkFBZCxJQUFJO1NBNEJaO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVPLG1DQUFrQjs7Ozs7O0lBQTFCLFVBQTJCLE1BQU0sRUFBRSxPQUEyQjtRQUE5RCxpQkFtQ0M7UUFuQ2tDLHdCQUFBLEVBQUEsWUFBMkI7O1lBQ3hELE1BQU0sR0FBRyxFQUFFO2dDQUNOLElBQUk7WUFDWCxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksT0FBSyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25CO1lBQ0QsT0FBTyxDQUFDLE9BQU87Ozs7WUFBRSxVQUFBLE1BQU07Z0JBQ3JCLElBQUksTUFBTSxFQUFFOzt3QkFDTixZQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUMzQyxvR0FBb0c7b0JBQ3BHLElBQUksT0FBTyxDQUFDLFlBQVUsQ0FBQyxFQUFFOzs0QkFDbkIsZ0JBQWdCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7d0JBQzFELGdCQUFnQixDQUFDLE9BQU87Ozs7d0JBQUMsVUFBQSxlQUFlOztnQ0FDbEMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLGVBQWUsQ0FBQzs0QkFDbkQsWUFBVSxDQUFDLE9BQU87Ozs7OzRCQUFDLFVBQUMsQ0FBQyxFQUFFLEtBQUs7Z0NBQzFCLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0NBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2lDQUNoRDtnQ0FDRCxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRTtvQ0FDMUQsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7d0NBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQztxQ0FDbkU7aUNBQ0Y7NEJBQ0gsQ0FBQyxFQUFDLENBQUM7d0JBQ0wsQ0FBQyxFQUFDLENBQUM7cUJBQ0o7eUJBQU07d0JBQ0wsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFVLENBQUMsRUFBRTs0QkFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUM7eUJBQzVCO3FCQUNGO2lCQUNGO1lBQ0gsQ0FBQyxFQUFDLENBQUM7OztRQTdCTCxLQUFLLElBQUksSUFBSSxJQUFJLE1BQU07b0JBQWQsSUFBSTtTQThCWjtRQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Z0JBNTBDRixVQUFVOzs7O2dCQTFCRixTQUFTO2dCQU1ULEdBQUc7Z0JBSkgsVUFBVTtnQkFDVixTQUFTO2dCQUNULE9BQU87Z0JBQ1AsS0FBSztnQkFXaUIsY0FBYztnQkFBMUIsVUFBVTtnQkFBa0IsR0FBRztnQkFBc0IsT0FBTztnQkFJdEUsWUFBWTtnQkFKK0Isa0JBQWtCO2dCQVQ3RCxNQUFNO2dCQVRvQixRQUFRO2dCQUNsQyxLQUFLO2dCQVNMLFFBQVE7Z0JBU1IsU0FBUztnQkFSVCxRQUFROztJQTgxQ2pCLGFBQUM7Q0FBQSxBQTcwQ0QsSUE2MENDO1NBNTBDWSxNQUFNOzs7Ozs7SUFDakIscUNBQXFDOzs7OztJQUduQyxvQkFBcUI7Ozs7O0lBQ3JCLHFCQUFnQjs7Ozs7SUFDaEIsNEJBQThCOzs7OztJQUM5QiwyQkFBNEI7Ozs7O0lBQzVCLHlCQUF3Qjs7Ozs7SUFDeEIsdUJBQW9COzs7OztJQUNwQix5QkFBK0I7Ozs7O0lBQy9CLDRCQUE4Qjs7Ozs7SUFDOUIscUJBQWdCOzs7OztJQUNoQix5QkFBd0I7Ozs7O0lBQ3hCLDBCQUE4Qjs7Ozs7SUFDOUIsNkJBQXVDOztJQUN2Qyx3QkFBcUI7Ozs7O0lBQ3JCLDBCQUE0Qjs7Ozs7SUFDNUIsdUJBQXNCOzs7OztJQUN0Qix3QkFBMEI7Ozs7O0lBQzFCLDJCQUE4Qjs7Ozs7SUFDOUIsMEJBQTRCOzs7Ozs7Ozs7O0FBeXpDaEMsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUF1QixFQUFFLE1BQWUsRUFBRSxVQUFvQixFQUFFLFFBQXlCO0lBQXpCLHlCQUFBLEVBQUEsZ0JBQXlCOztRQUNsSSxRQUFRLEdBQUcsT0FBTyxJQUFJLElBQUksSUFBSSxFQUFFO0lBQ3BDLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFDOztRQUNqQixNQUFNLEdBQUcsTUFBTTs7UUFDZixPQUFPLEdBQUcsS0FBSztJQUNuQixRQUFRLFNBQVMsRUFBRTtRQUNqQixLQUFLLFlBQVk7WUFDZixNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNoQixNQUFNO1FBQ1IsS0FBSyxZQUFZO1lBQ2YsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNaLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDaEIsTUFBTTtRQUNSLEtBQUssYUFBYTtZQUNoQixNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2IsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNoQixNQUFNO1FBQ1IsS0FBSyxVQUFVO1lBQ2IsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNYLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFDakIsTUFBTTtRQUNSLEtBQUssV0FBVztZQUNkLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ2xCLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDbEIsTUFBTTtRQUNSLEtBQUssYUFBYTtZQUNoQixNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUNsQixPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ2xCLE1BQU07UUFDUixLQUFLLFVBQVU7WUFDYixNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUNqQixPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2pCLE1BQU07UUFDUixLQUFLLFdBQVc7WUFDZCxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNoQixPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLE1BQU07UUFFUjtZQUNFLElBQUksVUFBVSxFQUFFO2dCQUNkLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxHQUFHLFNBQVMsQ0FBQzthQUNyQjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFDckIsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDbkIsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUNqQjtZQUVELE1BQU07S0FDVDs7UUFFRyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDOztRQUM1RSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUU3QixJQUFJLFFBQVEsRUFBRTtRQUNaLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzNDO0lBRUQscURBQXFEO0lBQ3JELE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDeEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhY2hlIH0gZnJvbSAnLi4vY2FjaGUvY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kZWxzIH0gZnJvbSAnLi4vbW9kZWxzL21vZGVscy5zZXJ2aWNlJztcbmltcG9ydCB7IEdvb2dsZW1hcHMgfSBmcm9tICcuLi9nb29nbGVtYXBzL2dvb2dsZW1hcHMuc2VydmljZSc7XG5pbXBvcnQgeyBXb3JrcGxhY2UgfSBmcm9tICcuLi93b3JrcGxhY2Uvd29ya3BsYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4uL3Nlc3Npb24vc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVzIH0gZnJvbSAnLi4vZmlsZXMvZmlsZXMuc2VydmljZSc7XG5pbXBvcnQgeyBCb3ggfSBmcm9tICcuLi9ib3gvYm94LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFNtYXJ0bG9jIH0gZnJvbSAnLi4vc21hcnRsb2Mvc21hcnRsb2Muc2VydmljZSc7XG5pbXBvcnQgeyBVbnNwbGFzaCB9IGZyb20gJy4uL3Vuc3BsYXNoL3Vuc3BsYXNoLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBSZXNwb25zZU9iamVjdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvcmVzcG9uc2Utb2JqZWN0L3Jlc3BvbnNlLW9iamVjdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2xvY2F0aW9uL2xvY2F0aW9uLmludGVyZmFjZSc7XG5leHBvcnQgKiBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3Jlc3BvbnNlLW9iamVjdC9yZXNwb25zZS1vYmplY3QuaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgRmlsdGVycywgUXVlcnksIFN1YlF1ZXJ5LCBJRW50aXR5LCBJQ3VzdG9tTW9kZWwsIElTb3J0LCB0b0RhdGUsIHV0YywgZGF0ZUFkZCwgc3RhcnRPZiwgY2FjaGVGaWxlLCBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBQb3NpdGlvbiwgQ29yZUNvbmZpZywgUHJvbWlzZVNlcnZpY2UsIExvZywgTG9jYWxGb3JhZ2VTZXJ2aWNlLCBOZXR3b3JrIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyBGaWxlVXBsb2FkZXIgfSBmcm9tICduZzItZmlsZS11cGxvYWQnO1xuaW1wb3J0IHsgRmlsZVRyYW5zZmVyIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlLXRyYW5zZmVyL25neCc7XG5pbXBvcnQgeyB1bmlxLCBjb21wYWN0LCBnZXQsIHNldCwgYXNzaWduLCBpc0FycmF5LCBpc1N0cmluZywgaXNPYmplY3QsIGlzRW1wdHksIGZsYXR0ZW4sIGZvckVhY2gsIGNvbmNhdCwgcmVtb3ZlLCBjbG9uZURlZXAsIHVuaXFCeSwgaXNFcXVhbCwgaW50ZXJzZWN0aW9uLCBvcmRlckJ5LCBrZXlzLCBtYXAgYXMgbG9kYXNoTWFwIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIGZvcmtKb2luLCBmcm9tLCBvZiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJzsgLy8sIGdyb3VwQnksIGZsYXRNYXAsIHJlZHVjZVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJva2VyIHtcbiAgcHJpdmF0ZSBpc1VwbG9hZGluZ0RhdGFiYXNlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcnE6IFJlcXVlc3RvcixcbiAgICBwcml2YXRlIGJveDogQm94LFxuICAgIHByaXZhdGUgZ29vZ2xlbWFwczogR29vZ2xlbWFwcyxcbiAgICBwcml2YXRlIHdvcmtwbGFjZTogV29ya3BsYWNlLFxuICAgIHByaXZhdGUgc2Vzc2lvbjogU2Vzc2lvbixcbiAgICBwcml2YXRlIGZpbGVzOiBGaWxlcyxcbiAgICBwcml2YXRlIHByb21pc2U6IFByb21pc2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29yZUNvbmZpZzogQ29yZUNvbmZpZyxcbiAgICBwcml2YXRlIGxvZzogTG9nLFxuICAgIHByaXZhdGUgbmV0d29yazogTmV0d29yayxcbiAgICBwcml2YXRlIHRyYW5zZmVyOiBGaWxlVHJhbnNmZXIsXG4gICAgcHJpdmF0ZSBsb2NhbEZvcmFnZTogTG9jYWxGb3JhZ2VTZXJ2aWNlLFxuICAgIHB1YmxpYyBjb25maWc6IENvbmZpZyxcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCBjYWNoZTogQ2FjaGUsXG4gICAgcHJvdGVjdGVkIGdlb2xvYzogU21hcnRsb2MsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZTogVHJhbnNsYXRlLFxuICAgIHByb3RlY3RlZCB1bnNwbGFzaDogVW5zcGxhc2hcbiAgKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge31cblxuICBnZXRBcGlVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmFwaVVybDtcbiAgfVxuXG4gIGdldFNlcnZlclVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuc2VydmVyVXJsO1xuICB9XG5cbiAgZ2V0Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWU6IHN0cmluZykge1xuICAgIGxldCBtb2RlbCA9IE1vZGVscy5nZXRNb2RlbEJ5Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpO1xuICAgIGlmIChtb2RlbCAmJiBtb2RlbC5pc0N1c3RvbSkge1xuICAgICAgcmV0dXJuICdjdXN0b21tb2RlbGluc3RhbmNlcyc7XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uTmFtZTtcbiAgfVxuXG4gIGdldEJ5SWQoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaWQ6IHN0cmluZywgZmllbGRzPzogQXJyYXk8c3RyaW5nPiwgaW5jbHVkZT86IEFycmF5PHN0cmluZz4sIGlkQXR0cmlidXRlTmFtZT86IHN0cmluZykge1xuICAgIGxldCBxdWVyeSA9IHRoaXMuZ2V0UXVlcnkoY29sbGVjdGlvbk5hbWUsIGZpZWxkcywgaW5jbHVkZSk7XG4gICAgZGVsZXRlIHF1ZXJ5LmxpbWl0O1xuICAgIGRlbGV0ZSBxdWVyeS5za2lwO1xuICAgIGRlbGV0ZSBxdWVyeS5vcmRlcjtcbiAgICBkZWxldGUgcXVlcnkuc3ViUXVlcnk7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgcmV0dXJuIGZyb20odGhpcy5jYWNoZS5nZXRCeUlkRnJvbURhdGFiYXNlQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSwgaWQsIGlkQXR0cmlidXRlTmFtZSkpO1xuICAgIH0gZWxzZSBpZiAoIWlkQXR0cmlidXRlTmFtZSB8fCBpZEF0dHJpYnV0ZU5hbWUgPT09ICdfaWQnKSB7XG4gICAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgdGhpcy5nZXRDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSkgKyAnLycgKyBpZCArICc/ZmlsdGVyPScgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkocXVlcnkpKTtcbiAgICAgIHJldHVybiB0aGlzLnJxLmdldCh1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZmlsdGVyczogRmlsdGVycyA9IFtbeyBmaWVsZDogaWRBdHRyaWJ1dGVOYW1lLCBvcGVyYXRvcjogeyBfaWQ6ICdlcScgfSwgdmFsdWU6IGlkIH1dXTtcbiAgICAgIHJldHVybiB0aGlzLmdldEFsbChjb2xsZWN0aW9uTmFtZSwgZmllbGRzLCBpbmNsdWRlLCBudWxsLCBmaWx0ZXJzKS5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhWzBdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGVudGl0eTogYW55KSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArIHRoaXMuZ2V0Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpO1xuICAgIHRoaXMudXBkYXRlQ3VzdG9tTW9kZWwoY29sbGVjdGlvbk5hbWUsIGVudGl0eSk7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgcmV0dXJuIGZyb20odGhpcy5jYWNoZS51cHNlcnRJbkRhdGFiYXNlQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSwgZW50aXR5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCBlbnRpdHkpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBlbnRpdHk6IGFueSkge1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkgfHwgdGhpcy5pc09mZmxpbmVFbnRpdHkoZW50aXR5KSkge1xuICAgICAgcmV0dXJuIGZyb20odGhpcy5jYWNoZS51cHNlcnRJbkRhdGFiYXNlQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSwgZW50aXR5KSk7XG4gICAgfSBlbHNlIGlmIChjb2xsZWN0aW9uTmFtZSA9PT0gJ2dyb3VwcycpIHtcbiAgICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyB0aGlzLmdldENvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgIHRoaXMudXBkYXRlQ3VzdG9tTW9kZWwoY29sbGVjdGlvbk5hbWUsIGVudGl0eSk7XG4gICAgICByZXR1cm4gdGhpcy5ycS5wdXQodXJsLCBlbnRpdHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZW50aXR5Ll9pZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRjaChjb2xsZWN0aW9uTmFtZSwgZW50aXR5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZShjb2xsZWN0aW9uTmFtZSwgZW50aXR5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzYXZlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGVudGl0eTogYW55LCBmaWVsZHM/OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSB8fCB0aGlzLmlzT2ZmbGluZUVudGl0eShlbnRpdHkpKSB7XG4gICAgICByZXR1cm4gZnJvbSh0aGlzLmNhY2hlLnVwc2VydEluRGF0YWJhc2VDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lLCBlbnRpdHkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudXBzZXJ0KGNvbGxlY3Rpb25OYW1lLCBlbnRpdHkpLnBpcGUobWVyZ2VNYXAocmVzID0+IHRoaXMuZ2V0QnlJZChjb2xsZWN0aW9uTmFtZSwgcmVzLl9pZCwgZmllbGRzKSkpO1xuICAgIH1cbiAgfVxuXG4gIHBhdGNoKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGVudGl0eTogYW55KSB7XG4gICAgaWYgKCFlbnRpdHkgfHwgIWVudGl0eS5faWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBwYXRjaCBhbiBlbXB0eSBlbnRpdHkgb3IgYW4gZW50aXR5IHdpdGhvdXQgYW4gaWQnKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVDdXN0b21Nb2RlbChjb2xsZWN0aW9uTmFtZSwgZW50aXR5KTtcbiAgICBpZiAodGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpIHx8IHRoaXMuaXNPZmZsaW5lRW50aXR5KGVudGl0eSkpIHtcbiAgICAgIHJldHVybiBmcm9tKHRoaXMuY2FjaGUudXBzZXJ0SW5EYXRhYmFzZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUsIGVudGl0eSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgdGhpcy5nZXRDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSkgKyAnLycgKyBlbnRpdHkuX2lkO1xuICAgICAgcmV0dXJuIHRoaXMucnEucGF0Y2godXJsLCBlbnRpdHkpO1xuICAgIH1cbiAgfVxuXG4gIHVwc2VydChjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBlbnRpdHk6IE9iamVjdCwgcHJldmlvdXNFbnRpdHk/OiBPYmplY3QsIHNraXBBY2w/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoIXNraXBBY2wpIHtcbiAgICAgIHRoaXMuc2V0QWNsKGVudGl0eSwgKDxhbnk+ZW50aXR5KS5ncm91cCwgZmFsc2UsIGNvbGxlY3Rpb25OYW1lKTtcbiAgICB9XG4gICAgdGhpcy5pbmNyZW1lbnRUYWdzKGNvbGxlY3Rpb25OYW1lLCBlbnRpdHkpLnN1YnNjcmliZSgoKSA9PiB7fSk7XG4gICAgbGV0IHN1ZmZpeHMgPSBjb2xsZWN0aW9uTmFtZSA9PT0gJ21pc3Npb25kYXRhcycgPyBbJy52YWx1ZScsICcuZWRpdCcsICcudmFsdWUuZmllbGRWYWx1ZSddIDogWycuX2Rvd25sb2FkVVJMJywgJy5lZGl0J107XG4gICAgbGV0IGhhc0ZpbGVzID0gdGhpcy5faGFzRmlsZXMoZW50aXR5LCBzdWZmaXhzKTtcbiAgICBpZiAodGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpIHx8ICFoYXNGaWxlcykge1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKGNvbGxlY3Rpb25OYW1lLCBlbnRpdHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8UmVzcG9uc2VPYmplY3Q+KChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgICB0aGlzLnVwbG9hZEVudGl0eUZpbGVzKGVudGl0eSwgc3VmZml4cykudGhlbihcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShjb2xsZWN0aW9uTmFtZSwgZW50aXR5KS5zdWJzY3JpYmUocmV0ID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJldC5fZG93bmxvYWRVUkwgJiYgdGhpcy5maWxlcy5pc0RvY3VtZW50KHJldC5fZG93bmxvYWRVUkwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3gudXBsb2FkKHJldC5fZG93bmxvYWRVUkwpLnN1YnNjcmliZShib3hJZCA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoYm94SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0LmJveElkID0gYm94SWQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShjb2xsZWN0aW9uTmFtZSwgcmV0KS5zdWJzY3JpYmUocmV0dmFsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXR2YWwpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXQpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyID0+IHt9XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB1cHNlcnRBbGwoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZW50aXRpZXM6IEFycmF5PE9iamVjdD4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBvYnMgPSBlbnRpdGllcy5tYXAoZW50aXR5ID0+IHRoaXMudXBzZXJ0KGNvbGxlY3Rpb25OYW1lLCBlbnRpdHkpKTtcbiAgICByZXR1cm4gZm9ya0pvaW4ob2JzKTtcbiAgfVxuXG4gIHVwbG9hZEVudGl0eUZpbGVzKGVudGl0eSwgc3VmZml4czogQXJyYXk8c3RyaW5nPiA9IFtdLCBwcm9ncmVzc0VtaXR0ZXI/OiBFdmVudEVtaXR0ZXI8YW55PiwgdGFncz86IEFycmF5PHN0cmluZz4sIHByb21pc2VzT25seSA9IGZhbHNlLCB0b3RhbE9mZnNldCA9IDApOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCBwcm9wZXJ0aWVzID0gdGhpcy5fZ2V0RmlsZVByb3BlcnRpZXMoZW50aXR5LCBzdWZmaXhzKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGxldCBwcm9taXNlczogQXJyYXk8UHJvbWlzZTxhbnk+PiA9IHByb3BlcnRpZXMubWFwKHByb3AgPT4ge1xuICAgICAgbGV0IHByb21pc2U7XG4gICAgICBsZXQgZmlsZSA9IGdldChlbnRpdHksIHByb3ApO1xuICAgICAgcHJvbWlzZSA9ICgob2Zmc2V0SW5kZXgsIHRvdGFsKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PlxuICAgICAgICAgIHRoaXMucHJlcGFyZVVwbG9hZChmaWxlKVxuICAgICAgICAgICAgLnRoZW4oZiA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwbG9hZChmLCBwcm9ncmVzc0VtaXR0ZXIsIG9mZnNldEluZGV4LCB0b3RhbCwgdGFncywgdG90YWxPZmZzZXQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHVybCA9PiB7XG4gICAgICAgICAgICAgIHNldChlbnRpdHksIHByb3AsIHVybCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4gUHJvbWlzZS5yZWplY3QoZXJyKSk7XG4gICAgICB9KShjb3VudCwgcHJvcGVydGllcy5sZW5ndGgpO1xuICAgICAgY291bnQgKz0gMTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0pO1xuICAgIGlmIChwcm9taXNlc09ubHkpIHtcbiAgICAgIHJldHVybiBwcm9taXNlcy5sZW5ndGggPiAwID8gcHJvbWlzZXMgOiA8YW55PlsoKSA9PiBQcm9taXNlLnJlc29sdmUoJ2VtcHR5JyldO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9taXNlLnNlcXVlbnRpYWwocHJvbWlzZXMpO1xuICB9XG5cbiAgdXBsb2FkRW50aXRpZXNGaWxlcyhlbnRpdGllczogQXJyYXk8YW55Piwgc3VmZml4czogQXJyYXk8c3RyaW5nPiA9IFtdLCBwcm9ncmVzc0VtaXR0ZXI/OiBFdmVudEVtaXR0ZXI8YW55PiwgdGFncz86IEFycmF5PHN0cmluZz4pIHtcbiAgICBsZXQgcHJvbWlzZXMgPSBlbnRpdGllcy5tYXAoZW50aXR5ID0+IHtcbiAgICAgIHJldHVybiAoKSA9PiB0aGlzLnVwbG9hZEVudGl0eUZpbGVzKGVudGl0eSwgc3VmZml4cywgcHJvZ3Jlc3NFbWl0dGVyLCB0YWdzLCBmYWxzZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZS5zZXF1ZW50aWFsKHByb21pc2VzKTtcbiAgfVxuXG4gIHByZXBhcmVVcGxvYWQoZmlsZSkge1xuICAgIHJldHVybiB0aGlzLmZpbGVzLl9yZXF1ZXN0RXh0ZXJuYWxTdG9yYWdlUGVybWlzc2lvbigpLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZmlsZXMuaXNCYXNlNjQoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmZpbGVzLmI2NHRvQmxvYihmaWxlKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmlsZXMuaXNGaWxlVXJpKGZpbGUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzLnJlc29sdmVGaWxlUGF0aCg8c3RyaW5nPmZpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmaWxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUFsbChjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBxdWVyeTogUXVlcnksIGVudGl0eTogYW55KSB7XG4gICAgbGV0IHJhd1F1ZXJ5OiBhbnkgPSBhc3NpZ24oe30sIHF1ZXJ5LndoZXJlKTtcbiAgICBpZiAocXVlcnkuc3ViUXVlcnkpIHtcbiAgICAgIHJhd1F1ZXJ5Ll9fb3B0aW9ucyA9IHsgc3ViUXVlcnk6IHF1ZXJ5LnN1YlF1ZXJ5IH07XG4gICAgfVxuICAgIGlmIChlbnRpdHkuZ3JvdXApIHtcbiAgICAgIGVudGl0eVsnX2FjbC5ncm91cHMuciddID0gZW50aXR5Lmdyb3VwO1xuICAgIH1cbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgdGhpcy5nZXRDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSkgKyAnL3VwZGF0ZT93aGVyZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHJhd1F1ZXJ5KSk7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIGVudGl0eSk7XG4gIH1cblxuICBzZXRBY2woZW50aXR5LCBncm91cD86IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGFkZFdyaXRlOiBib29sZWFuID0gZmFsc2UsIGNvbGxlY3Rpb25OYW1lPzogc3RyaW5nLCB1c2Vycz86IEFycmF5PHN0cmluZz4pIHtcbiAgICAvL2VudGl0eS5fYWNsID0gZW50aXR5Ll9hY2wgfHwgeyBncm91cHM6IHsgcjogWydhZG1pbiddLCB3OiBbJ2FkbWluJywgJ21hbmFnZXInXSB9IH07XG4gICAgZW50aXR5Ll9hY2wgPSBlbnRpdHkuX2FjbCB8fCB7IGdyb3VwczogeyByOiBbXSwgdzogW10gfSB9O1xuICAgIGVudGl0eS5fYWNsLmNyZWF0b3IgPSBlbnRpdHkuX2FjbCAmJiBlbnRpdHkuX2FjbC5jcmVhdG9yID8gZW50aXR5Ll9hY2wuY3JlYXRvciA6IHRoaXMuc2Vzc2lvbi51c2VyID8gdGhpcy5zZXNzaW9uLnVzZXIuX2lkIDogbnVsbDtcbiAgICBlbnRpdHkuX2FjbC5ncm91cHMgPSBlbnRpdHkuX2FjbCAmJiBlbnRpdHkuX2FjbC5ncm91cHMgPyBlbnRpdHkuX2FjbC5ncm91cHMgOiB7fTtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGVudGl0eS5fYWNsLmdyb3Vwcy5yID0gdW5pcShbXS5jb25jYXQoZ3JvdXApLmNvbmNhdChlbnRpdHkuX2FjbC5ncm91cHMucikpO1xuICAgIH1cbiAgICBlbnRpdHkuX2FjbC5ncm91cHMuciA9IGNvbXBhY3QoZW50aXR5Ll9hY2wuZ3JvdXBzLnIpO1xuICAgIC8vZW50aXR5Ll9hY2wuZ3JvdXBzLncgPSBjb21wYWN0KHVuaXEoWydhZG1pbicsICdtYW5hZ2VyJ10uY29uY2F0KGVudGl0eS5fYWNsLmdyb3Vwcy53IHx8IFtdKSkpO1xuICAgIGVudGl0eS5fYWNsLmdyb3Vwcy53ID0gY29tcGFjdCh1bmlxKFtdLmNvbmNhdChlbnRpdHkuX2FjbC5ncm91cHMudyB8fCBbXSkpKTtcblxuICAgIGlmIChjb2xsZWN0aW9uTmFtZSA9PT0gJ3RyYW5zbGF0aW9ucycgJiYgZ3JvdXApIHtcbiAgICAgIGVudGl0eS5fYWNsLmdyb3Vwcy5yID0gdW5pcShbXS5jb25jYXQoZ3JvdXApKTtcbiAgICAgIGVudGl0eS5fYWNsLmdyb3Vwcy53ID0gdW5pcShbXS5jb25jYXQoZ3JvdXApKTtcbiAgICB9XG4gICAgaWYgKGFkZFdyaXRlICYmIGdyb3VwKSB7XG4gICAgICBlbnRpdHkuX2FjbC5ncm91cHMudyA9IGNvbXBhY3QodW5pcShbXS5jb25jYXQoZ3JvdXApLmNvbmNhdChlbnRpdHkuX2FjbC5ncm91cHMudykpKTtcbiAgICB9XG4gICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vZW50aXR5Ll9hY2wudXNlcnMgPSB7IHI6IHVzZXJzLCB3OiB1c2VycyB9O1xuICAgICAgZW50aXR5Ll9hY2wuZ3JvdXBzLnIgPSBlbnRpdHkuX2FjbC5ncm91cHMuci5jb25jYXQodXNlcnMpO1xuICAgIH1cbiAgfVxuXG4gIGdldEN1cnJlbnRHcm91cHMoKSB7XG4gICAgaWYgKHRoaXMuc2Vzc2lvbi5yb2xlcy5pbmRleE9mKCdhZG1pbicpIDwgMCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi5ncm91cHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbJ2RlYnVnX3YyJ107XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQ3VzdG9tTW9kZWwoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZW50aXR5OiBhbnkpIHtcbiAgICBsZXQgbW9kZWwgPSBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICBpZiAobW9kZWwgJiYgbW9kZWwuaXNDdXN0b20pIHtcbiAgICAgIGVudGl0eS5fbW9kZWxOYW1lID0gY29sbGVjdGlvbk5hbWU7XG4gICAgICBpZiAoZW50aXR5LmxvY2F0aW9uICYmIGVudGl0eS5sb2NhdGlvbi5faWQpIHtcbiAgICAgICAgZW50aXR5LmxvY2F0aW9uUmVmID0gZW50aXR5LmxvY2F0aW9uLl9pZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGxvYWQoZmlsZTogYW55LCBwcm9ncmVzc0VtaXR0ZXI/OiBFdmVudEVtaXR0ZXI8YW55Piwgb2Zmc2V0SW5kZXggPSAwLCB0b3RhbCA9IDEsIHRhZ3M6IEFycmF5PHN0cmluZz4gPSBbXSwgdG90YWxPZmZzZXQgPSAwKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICB0YWdzID0gY29uY2F0KFt0aGlzLnNlc3Npb24udXNlcklkXSwgdGFncyk7XG4gICAgLy9jaGVjayBmb3IgZmlsZSBjcmVhdGVkIGZyb20gYmFzZTY0IGlmIHdlIGNhbiBzZW5kIHRoZW0gdGhyb3VnaCBjb3Jkb3ZhIHRyYW5zZmVydCBwbHVnaW4uXG4gICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0NvcmRvdmEoKSAmJiBmaWxlLm5hdGl2ZVVSTCkge1xuICAgICAgbGV0IGZpbGVUcmFuc2ZlciA9IHRoaXMudHJhbnNmZXIuY3JlYXRlKCk7XG4gICAgICBpZiAocHJvZ3Jlc3NFbWl0dGVyKSB7XG4gICAgICAgIGZpbGVUcmFuc2Zlci5vblByb2dyZXNzKGV2ID0+IHtcbiAgICAgICAgICBpZiAoZXYubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSAoKGV2LmxvYWRlZCAvIGV2LnRvdGFsKSAqIDEwMCkgLyAodG90YWwgKyB0b3RhbE9mZnNldCkgKyAob2Zmc2V0SW5kZXggKiAxMDApIC8gKHRvdGFsICsgdG90YWxPZmZzZXQpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NFbWl0dGVyLm5leHQocGVyY2VudGFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaWxlVHJhbnNmZXJcbiAgICAgICAgLnVwbG9hZChmaWxlLm5hdGl2ZVVSTCwgdGhpcy5jb25maWcudXBsb2FkVXJsLCB7XG4gICAgICAgICAgZmlsZUtleTogJ2ZpbGUnLFxuICAgICAgICAgIGZpbGVOYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgY2h1bmtlZE1vZGU6IGZhbHNlLFxuICAgICAgICAgIHBhcmFtczogeyB0YWdzOiB0YWdzIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IHJldFZhbCA9IEpTT04ucGFyc2UocmVzdWx0LnJlc3BvbnNlKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5maWxlcy5nZXRDbG91ZGluYXJ5VXJsKHJldFZhbCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgZmlsZUVycm9yID0gZXJyICYmIGVyci5tZXNzYWdlID8gZXJyLm1lc3NhZ2UgOiAnRmlsZSBFcnJvcic7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGZpbGVFcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZmlsZVVwbG9hZGVyID0gdGhpcy5nZXRGaWxlVXBsb2FkZXIobnVsbCk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmaWxlVXBsb2FkZXIub25CdWlsZEl0ZW1Gb3JtID0gKGZpbGVJdGVtOiBhbnksIGZvcm06IGFueSkgPT4ge1xuICAgICAgICAgIGZvcm0uYXBwZW5kKCd0YWdzJywgSlNPTi5zdHJpbmdpZnkodGFncykpO1xuICAgICAgICB9O1xuICAgICAgICBmaWxlVXBsb2FkZXIub25Db21wbGV0ZUl0ZW0gPSAoaXRlbTogYW55LCByZXNwb25zZTogYW55LCBzdGF0dXM6IGFueSwgaGVhZGVyczogYW55KTogYW55ID0+IHtcbiAgICAgICAgICB0aGlzLmxvZy5sb2coJ3VwbG9hZCBmaW5pc2gnKTtcbiAgICAgICAgICBmaWxlVXBsb2FkZXIuY2xlYXJRdWV1ZSgpO1xuICAgICAgICAgIGlmIChzdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgbGV0IHJldFZhbCA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZpbGVzLmdldENsb3VkaW5hcnlVcmwocmV0VmFsKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChyZXNwb25zZSA/IEpTT04ucGFyc2UocmVzcG9uc2UpIDogJ2Vycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAocHJvZ3Jlc3NFbWl0dGVyKSB7XG4gICAgICAgICAgZmlsZVVwbG9hZGVyLm9uUHJvZ3Jlc3NJdGVtID0gKGl0ZW06IGFueSwgcHJvZ3Jlc3M6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBwcm9ncmVzcyAvICh0b3RhbCArIHRvdGFsT2Zmc2V0KSArIChvZmZzZXRJbmRleCAqIDEwMCkgLyAodG90YWwgKyB0b3RhbE9mZnNldCk7XG4gICAgICAgICAgICBwcm9ncmVzc0VtaXR0ZXIubmV4dChwZXJjZW50YWdlKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZpbGVVcGxvYWRlci5hZGRUb1F1ZXVlKFtmaWxlXSk7XG4gICAgICAgIGZpbGVVcGxvYWRlci5xdWV1ZVswXS5hbGlhcyA9ICd1bmRlZmluZWQnO1xuICAgICAgICAvL2ZpbGVJdGVtLmFsaWFzID0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIHRoaXMubG9nLmxvZygndXBsb2FkIGJlZ2luJyk7XG4gICAgICAgIGZpbGVVcGxvYWRlci51cGxvYWRBbGwoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHVwbG9hZERhdGEoZGF0YSwgcHJvZ3Jlc3NFbWl0dGVyPzogRXZlbnRFbWl0dGVyPGFueT4sIG9mZnNldEluZGV4ID0gMCwgdG90YWwgPSAxKSB7XG4gICAgbGV0IGZpbGUgPSB0aGlzLmZpbGVzLmI2NHRvQmxvYihkYXRhKTtcbiAgICByZXR1cm4gdGhpcy51cGxvYWQoZmlsZSwgcHJvZ3Jlc3NFbWl0dGVyLCBvZmZzZXRJbmRleCwgdG90YWwpO1xuICB9XG5cbiAgaW5jcmVtZW50VGFncyhjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBlbnRpdHk6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgaWYgKGVudGl0eS50YWdzICYmIGVudGl0eS50YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgIGVudGl0eS50YWdzID0gdW5pcShjb21wYWN0KFtdLmNvbmNhdChlbnRpdHkudGFncykpKTtcbiAgICAgIGlmIChlbnRpdHkudGFncy5sZW5ndGggPiAwICYmICF0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICd0YWdzL2luY3JlbWVudFRhZ3MnO1xuICAgICAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwge1xuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgY29sbGVjdGlvbk5hbWU6IE1vZGVscy5maXhDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSksXG4gICAgICAgICAgICB0YWdzOiBlbnRpdHkudGFncyxcbiAgICAgICAgICAgIGdyb3VwczogW10uY29uY2F0KGVudGl0eS5ncm91cCB8fCBlbnRpdHkuX2FjbC5ncm91cHMuciksXG4gICAgICAgICAgICBlbnRpdHlcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2YobnVsbCk7XG4gIH1cblxuICB1cGRhdGVUYWdzKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ3RhZ3MvdXBkYXRlVGFncyc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgcGFyYW1zOiB7IGNvbGxlY3Rpb246IGNvbGxlY3Rpb25OYW1lIH0gfSk7XG4gIH1cblxuICBjcmVhdGVBbGxUYWdzKCkge1xuICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnYnVzaW5lc3NMb2dpYy9jcmVhdGVBbGxUYWdzJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBwYXJhbXM6IHt9IH0pO1xuICB9XG5cbiAgZGVsZXRlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5pc09mZmxpbmVJZChpZCkpIHtcbiAgICAgIHJldHVybiBmcm9tKHRoaXMuY2FjaGUucmVtb3ZlRnJvbURhdGFiYXNlQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSwgaWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArIHRoaXMuZ2V0Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlkKTtcbiAgICAgIHJldHVybiB0aGlzLnJxLmRlbGV0ZSh1cmwpO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUFsbChjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBxdWVyeTogUXVlcnkpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgdGhpcy5nZXRDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSk7XG4gICAgbGV0IHJhd1F1ZXJ5OiBhbnkgPSBhc3NpZ24oe30sIHF1ZXJ5LndoZXJlIHx8IHsgX2lkOiB7IGV4aXN0czogdHJ1ZSB9IH0pO1xuICAgIGlmIChxdWVyeS5zdWJRdWVyeSkge1xuICAgICAgcmF3UXVlcnkuX19vcHRpb25zID0geyBzdWJRdWVyeTogcXVlcnkuc3ViUXVlcnkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucnEuZGVsZXRlKHVybCwgcmF3UXVlcnkpO1xuICB9XG5cbiAgZ2V0UXVlcnkoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZmllbGRzPzogQXJyYXk8c3RyaW5nPiwgaW5jbHVkZT86IEFycmF5PHN0cmluZz4sIHNlYXJjaD86IHN0cmluZywgZmlsdGVycz86IEZpbHRlcnMgfCBPYmplY3QsIHNvcnRzPzogQXJyYXk8SVNvcnQ+LCBza2lwID0gMCwgbGltaXQgPSAyMCwgc3ViUXVlcnk6IFN1YlF1ZXJ5ID0gbnVsbCwgY3VzdG9tRmlsdGVyID0gbnVsbCk6IFF1ZXJ5IHtcbiAgICBsZXQgbW9kZWwgPSBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICBpZiAobW9kZWwpIHtcbiAgICAgIGZpZWxkcyA9IGZpZWxkcyAmJiBmaWVsZHMubGVuZ3RoID4gMCA/IGZpZWxkcyA6IG1vZGVsLmZpZWxkcztcbiAgICAgIGluY2x1ZGUgPSBpbmNsdWRlIHx8IG1vZGVsLmluY2x1ZGU7XG4gICAgICBpZiAobW9kZWwgJiYgbW9kZWwuaXNDdXN0b20pIHtcbiAgICAgICAgaWYgKCFmaWx0ZXJzIHx8IChpc0FycmF5KGZpbHRlcnMpICYmICg8QXJyYXk8YW55Pj5maWx0ZXJzKS5sZW5ndGggPCAxKSkge1xuICAgICAgICAgIGZpbHRlcnMgPSBbW11dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KGZpbHRlcnMpKSB7XG4gICAgICAgICAgZmlsdGVycyA9IGNsb25lRGVlcChmaWx0ZXJzKTtcbiAgICAgICAgICAoPGFueT5maWx0ZXJzKS5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgZi5wdXNoKHsgZmllbGQ6ICdfbW9kZWxOYW1lJywgb3BlcmF0b3I6IHsgX2lkOiAnZXEnIH0sIHZhbHVlOiBtb2RlbC5jb2xsZWN0aW9uTmFtZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBxdWVyeTogUXVlcnkgPSB7fTtcbiAgICBpZiAoc2tpcCAmJiBza2lwID4gMCkge1xuICAgICAgcXVlcnkuc2tpcCA9IHNraXA7XG4gICAgfVxuXG4gICAgaWYgKGxpbWl0ICYmIGxpbWl0ID4gMCkge1xuICAgICAgcXVlcnkubGltaXQgPSBsaW1pdDtcbiAgICB9XG5cbiAgICBpZiAoc29ydHMgJiYgc29ydHMubGVuZ3RoID4gMCkge1xuICAgICAgcXVlcnkub3JkZXIgPSBzb3J0cy5maWx0ZXIocyA9PiBpc1N0cmluZyhzKSB8fCAocy5jb2xJZCAmJiBzLnNvcnQpKS5tYXAocyA9PiAoaXNTdHJpbmcocykgPyBzIDogcy5jb2xJZCArICcgJyArIChzLnNvcnQgPyBzLnNvcnQudG9VcHBlckNhc2UoKSA6ICdBU0MnKSkpO1xuICAgIH0gZWxzZSBpZiAoc29ydHMgJiYgc29ydHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWVyeS5vcmRlciA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWVyeS5vcmRlciA9IFsnX2xtdCBERVNDJ107XG4gICAgfVxuICAgIGxldCBzZWFyY2hXaGVyZSA9IG51bGw7XG4gICAgbGV0IGZpbHRlcldoZXJlID0gbnVsbDtcbiAgICBpZiAoc2VhcmNoICYmIG1vZGVsICYmICFtb2RlbC5zZWFyY2hTdWJxdWVyeSkge1xuICAgICAgc2VhcmNoV2hlcmUgPSBNb2RlbHMuZXhwb3J0U2VhcmNoKGNvbGxlY3Rpb25OYW1lLCBzZWFyY2gpO1xuICAgIH1cblxuICAgIGlmIChmaWx0ZXJzICYmIGlzQXJyYXkoZmlsdGVycykgJiYgKDxBcnJheTxhbnk+PmZpbHRlcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgIGZpbHRlcldoZXJlID0gTW9kZWxzLmV4cG9ydFdoZXJlKGNvbGxlY3Rpb25OYW1lLCA8RmlsdGVycz5maWx0ZXJzKTtcbiAgICB9IGVsc2UgaWYgKGZpbHRlcnMgJiYgIWlzQXJyYXkoZmlsdGVycykgJiYgaXNPYmplY3QoZmlsdGVycykpIHtcbiAgICAgIGZpbHRlcldoZXJlID0gZmlsdGVycztcbiAgICB9XG4gICAgaWYgKHNlYXJjaFdoZXJlICYmIGZpbHRlcldoZXJlKSB7XG4gICAgICBxdWVyeS53aGVyZSA9IHsgYW5kOiBbc2VhcmNoV2hlcmUsIGZpbHRlcldoZXJlXSB9O1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoV2hlcmUpIHtcbiAgICAgIHF1ZXJ5LndoZXJlID0gc2VhcmNoV2hlcmU7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJXaGVyZSkge1xuICAgICAgcXVlcnkud2hlcmUgPSBmaWx0ZXJXaGVyZTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tRmlsdGVyICYmIHF1ZXJ5LndoZXJlKSB7XG4gICAgICBxdWVyeS53aGVyZSA9IHsgYW5kOiBbcXVlcnkud2hlcmUsIGN1c3RvbUZpbHRlcl0gfTtcbiAgICB9IGVsc2UgaWYgKGN1c3RvbUZpbHRlcikge1xuICAgICAgcXVlcnkud2hlcmUgPSBjdXN0b21GaWx0ZXI7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkcyAmJiBmaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgcXVlcnkuZmllbGRzID0gZmllbGRzO1xuICAgIH1cblxuICAgIGlmICghaXNFbXB0eShpbmNsdWRlKSkge1xuICAgICAgcXVlcnkuaW5jbHVkZSA9IGluY2x1ZGU7XG4gICAgfVxuXG4gICAgaWYgKHN1YlF1ZXJ5KSB7XG4gICAgICBxdWVyeS5zdWJRdWVyeSA9IHN1YlF1ZXJ5O1xuICAgIH1cblxuICAgIGxldCBmaWx0ZXJTdWJxdWVyeSA9IE1vZGVscy5leHBvcnRTdWJRdWVyeShjb2xsZWN0aW9uTmFtZSwgZmlsdGVycyk7XG4gICAgaWYgKGZpbHRlclN1YnF1ZXJ5KSB7XG4gICAgICBpZiAocXVlcnkuc3ViUXVlcnkpIHtcbiAgICAgICAgcXVlcnkuc3ViUXVlcnkgPSBbXS5jb25jYXQocXVlcnkuc3ViUXVlcnksIGZpbHRlclN1YnF1ZXJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5LnN1YlF1ZXJ5ID0gZmlsdGVyU3VicXVlcnk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vdGhpcyBpcyBtYWlubHkgdXNlZCBpbiB0aGUgY2hhbm5lbCBtb2RlbCBiZWNhdXNlIHdlIHdhbnQgdG8gZmlsdGVyIG9uIHVzZXJzIHByb3BlcnRpZXNcbiAgICBpZiAoc2VhcmNoICYmIG1vZGVsICYmIG1vZGVsLnNlYXJjaFN1YnF1ZXJ5KSB7XG4gICAgICBzZWFyY2hXaGVyZSA9IE1vZGVscy5leHBvcnRTZWFyY2gobW9kZWwuc2VhcmNoU3VicXVlcnkuY29sbGVjdGlvbk5hbWUsIHNlYXJjaCk7XG4gICAgICBpZiAoIXF1ZXJ5LnN1YlF1ZXJ5KSB7XG4gICAgICAgIHF1ZXJ5LnN1YlF1ZXJ5ID0ge1xuICAgICAgICAgIGNvbGxlY3Rpb25OYW1lOiBtb2RlbC5zZWFyY2hTdWJxdWVyeS5jb2xsZWN0aW9uTmFtZSxcbiAgICAgICAgICBmaWVsZDogbW9kZWwuc2VhcmNoU3VicXVlcnkuZmllbGQsXG4gICAgICAgICAgdmFsdWVzOiBtb2RlbC5zZWFyY2hTdWJxdWVyeS52YWx1ZXMsXG4gICAgICAgICAgd2hlcmU6IHNlYXJjaFdoZXJlXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHF1ZXJ5LnN1YlF1ZXJ5ICYmICFpc0FycmF5KHF1ZXJ5LnN1YlF1ZXJ5KSAmJiAoPFN1YlF1ZXJ5PnF1ZXJ5LnN1YlF1ZXJ5KS53aGVyZSkge1xuICAgICAgICAoPFN1YlF1ZXJ5PnF1ZXJ5LnN1YlF1ZXJ5KS53aGVyZSA9IHsgYW5kOiBbc2VhcmNoV2hlcmUsICg8U3ViUXVlcnk+cXVlcnkuc3ViUXVlcnkpLndoZXJlXSB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuICBnZXRDb3VudChjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBzZWFyY2g/OiBzdHJpbmcsIGZpbHRlcnM/OiBGaWx0ZXJzLCBzdWJRdWVyeTogU3ViUXVlcnkgPSBudWxsLCBjdXN0b21GaWx0ZXIgPSBudWxsLCBub09mZmxpbmU6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBpZiAodGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBbGxPZmZsaW5lKGNvbGxlY3Rpb25OYW1lLCBmYWxzZSwgc2VhcmNoLCBmaWx0ZXJzLCBudWxsLCBudWxsLCBudWxsLCBjdXN0b21GaWx0ZXIsIGZhbHNlKS5waXBlKFxuICAgICAgICBtYXAocmV0ID0+IHtcbiAgICAgICAgICByZXR1cm4geyBjb3VudDogcmV0LmNvdW50LCBkYXRhOiBbXSB9O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5nZXRRdWVyeShjb2xsZWN0aW9uTmFtZSwgbnVsbCwgbnVsbCwgc2VhcmNoLCBmaWx0ZXJzLCBudWxsLCBudWxsLCBudWxsLCBzdWJRdWVyeSwgY3VzdG9tRmlsdGVyKTtcbiAgICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyB0aGlzLmdldENvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKSArICcvY291bnQnOyAvLz93aGVyZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHF1ZXJ5LndoZXJlIHx8IHt9KSk7XG4gICAgICBsZXQgZmluYWxRdWVyeTogYW55ID0ge307XG4gICAgICBpZiAocXVlcnkud2hlcmUpIHtcbiAgICAgICAgZmluYWxRdWVyeS53aGVyZSA9IHF1ZXJ5LndoZXJlO1xuICAgICAgfVxuICAgICAgaWYgKHF1ZXJ5LnN1YlF1ZXJ5KSB7XG4gICAgICAgIGZpbmFsUXVlcnkuc3ViUXVlcnkgPSBxdWVyeS5zdWJRdWVyeTtcbiAgICAgIH1cblxuICAgICAgbGV0IGZpbmFsUmVzO1xuICAgICAgcmV0dXJuIHRoaXMucnFcbiAgICAgICAgLnBvc3QodXJsLCBmaW5hbFF1ZXJ5KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtZXJnZU1hcChyZXMgPT4ge1xuICAgICAgICAgICAgZmluYWxSZXMgPSByZXM7XG4gICAgICAgICAgICBpZiAobm9PZmZsaW5lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmdldEFsbE9mZmxpbmUoY29sbGVjdGlvbk5hbWUsIHRydWUsIHNlYXJjaCwgZmlsdGVycywgbnVsbCwgbnVsbCwgbnVsbCwgY3VzdG9tRmlsdGVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAob2ZmbGluZVJlcyA9PiB7XG4gICAgICAgICAgICBsZXQgY291bnQgPSBmaW5hbFJlcyB8fCAwO1xuICAgICAgICAgICAgaWYgKG9mZmxpbmVSZXMgJiYgb2ZmbGluZVJlcy5jb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgY291bnQgKz0gb2ZmbGluZVJlcy5jb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGNvdW50OiBjb3VudCwgZGF0YTogW10gfTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbChjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBmaWVsZHM/OiBBcnJheTxzdHJpbmc+LCBpbmNsdWRlPzogQXJyYXk8c3RyaW5nPiwgc2VhcmNoPzogc3RyaW5nLCBmaWx0ZXJzPzogRmlsdGVycywgc29ydHM/OiBBcnJheTxJU29ydD4sIHNraXAgPSAwLCBsaW1pdCA9IDIwLCB0YWcgPSBmYWxzZSwgc3ViUXVlcnk6IFN1YlF1ZXJ5ID0gbnVsbCwgY3VzdG9tRmlsdGVyID0gbnVsbCwgY2FjaGVJZDogc3RyaW5nID0gbnVsbCwgbG9vc2VDb3VudDogYm9vbGVhbiA9IG51bGwsIG5vQ291bnQ6IGJvb2xlYW4gPSBmYWxzZSwgbm9PZmZsaW5lOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgaWYgKGNvbGxlY3Rpb25OYW1lID09PSAnZ29vZ2xlbWFwcycpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEFsbEdvb2dsZU1hcHMoc2VhcmNoKTtcbiAgICB9XG4gICAgaWYgKGNvbGxlY3Rpb25OYW1lLmluZGV4T2YoJ3dvcmtwbGFjZV8nKSA+PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBbGxXb3JrcGxhY2UoY29sbGVjdGlvbk5hbWUsIHNlYXJjaCk7XG4gICAgfVxuICAgIGlmIChjb2xsZWN0aW9uTmFtZSA9PT0gJ3Vuc3BsYXNoJykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsVW5zcGxhc2goc2VhcmNoLCBza2lwLCBsaW1pdCk7XG4gICAgfVxuICAgIGlmICh0YWcgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEFsbFRhZ3MoY29sbGVjdGlvbk5hbWUsIHNlYXJjaCwgZmlsdGVycywgc2tpcCwgbGltaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcXVlcnkgPSB0aGlzLmdldFF1ZXJ5KGNvbGxlY3Rpb25OYW1lLCBmaWVsZHMsIGluY2x1ZGUsIHNlYXJjaCwgZmlsdGVycywgc29ydHMsIHNraXAsIGxpbWl0LCBzdWJRdWVyeSwgY3VzdG9tRmlsdGVyKTtcbiAgICAgIGlmIChjb2xsZWN0aW9uTmFtZS5pbmRleE9mKCdfc3RvcmUnKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFsbE9wZXJhdGlvbihjb2xsZWN0aW9uTmFtZSwgcXVlcnkpO1xuICAgICAgfVxuICAgICAgbGV0IG9icztcbiAgICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgICAgaWYgKGNhY2hlSWQpIHtcbiAgICAgICAgICBvYnMgPSBmcm9tKHRoaXMubG9jYWxGb3JhZ2UuZ2V0KGNhY2hlSWQpKS5waXBlKFxuICAgICAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiByZXMgfHwgKG5vQ291bnQgPyBbXSA6IHsgY291bnQ6IDAsIGRhdGE6IFtdIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9icyA9IHRoaXMuZ2V0QWxsT2ZmbGluZShjb2xsZWN0aW9uTmFtZSwgZmFsc2UsIHNlYXJjaCwgZmlsdGVycywgc29ydHMsIHNraXAsIGxpbWl0LCBjdXN0b21GaWx0ZXIsIG5vQ291bnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZmluYWxSZXM7XG4gICAgICAgIG9icyA9IHRoaXMuZ2V0QWxsUXVlcnkoY29sbGVjdGlvbk5hbWUsIHF1ZXJ5LCBsb29zZUNvdW50LCBub0NvdW50KVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAocmVzID0+IHtcbiAgICAgICAgICAgICAgZmluYWxSZXMgPSByZXM7XG4gICAgICAgICAgICAgIGlmIChjYWNoZUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbEZvcmFnZS5zZXQoY2FjaGVJZCwgcmVzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobm9PZmZsaW5lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmdldEFsbE9mZmxpbmUoY29sbGVjdGlvbk5hbWUsIHRydWUsIHNlYXJjaCwgZmlsdGVycywgc29ydHMsIHNraXAsIGxpbWl0LCBjdXN0b21GaWx0ZXIsIG5vQ291bnQpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKG9mZmxpbmVSZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICBpZiAobm9Db3VudCkge1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzID0gWy4uLihvZmZsaW5lUmVzIHx8IFtdKSwgLi4uKGZpbmFsUmVzIHx8IFtdKV07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmluYWxSZXMuZGF0YSA9IFsuLi4ob2ZmbGluZVJlcy5kYXRhIHx8IFtdKSwgLi4uKGZpbmFsUmVzLmRhdGEgfHwgW10pXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZmluYWxSZXM7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JzO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbFRhZ3MoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgc2VhcmNoPzogc3RyaW5nLCBmaWx0ZXJzPzogRmlsdGVycywgc2tpcCA9IDAsIGxpbWl0ID0gMjAsIHVzZVRhZ3NDb2xsZWN0aW9uID0gZmFsc2UpIHtcbiAgICBmaWx0ZXJzID0gZmlsdGVycyB8fCBbW11dO1xuICAgIC8vZml4IGZvciBcIk1vbmdvRXJyb3JcIixcIm1lc3NhZ2VcIjpcIiRnZW9OZWFyLCAkbmVhciwgYW5kICRuZWFyU3BoZXJlIGFyZSBub3QgYWxsb3dlZCBpbiB0aGlzIGNvbnRleHRcIlxuICAgIGlmIChjb2xsZWN0aW9uTmFtZSA9PT0gJ2xvY2F0aW9ucycpIHtcbiAgICAgIGZpbHRlcnMgPSBmaWx0ZXJzLm1hcChmZiA9PiB7XG4gICAgICAgIHJldHVybiBmZi5maWx0ZXIoZiA9PiBmLmZpZWxkICE9PSAnX2dlb2xvYycpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEFsbFRhZ3NPZmZsaW5lKHsgY29sbGVjdGlvbk5hbWUsIHNlYXJjaCwgZmlsdGVycyB9KTtcbiAgICB9IGVsc2UgaWYgKHVzZVRhZ3NDb2xsZWN0aW9uKSB7XG4gICAgICAvL3RoaXMgaXMgbm90IHVzZWQgYW55bW9yZVxuICAgICAgbGV0IGFnZ3JlZ2F0ZU9wdGlvbnMgPSBbeyAkbWF0Y2g6IHsgY29sbGVjdGlvbk5hbWU6IE1vZGVscy5maXhDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSkgfSB9LCB7ICRncm91cDogeyBfaWQ6ICckdGFnJywgY291bnQ6IHsgJG1heDogJyRjb3VudCcgfSB9IH0sIHsgJHNvcnQ6IHsgY291bnQ6IC0xIH0gfSwgeyAkcHJvamVjdDogeyBfaWQ6IDEsIHRhZzogJyRfaWQnLCBjb3VudDogMSB9IH0sIHsgJGdyb3VwOiB7IF9pZDogMSwgdG90YWw6IHsgJHN1bTogMSB9LCBkYXRhOiB7ICRwdXNoOiAnJCRST09UJyB9IH0gfSwgeyAkcHJvamVjdDogeyBjb3VudDogJyR0b3RhbCcsIGRhdGE6IHsgJHNsaWNlOiBbJyRkYXRhJywgc2tpcCwgc2tpcCArIGxpbWl0XSB9IH0gfV07XG4gICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGVRdWVyeSgndGFncycsIGZpbHRlcnMsIGFnZ3JlZ2F0ZU9wdGlvbnMsIHNlYXJjaCkucGlwZShtYXAoKHJlczogYW55KSA9PiAocmVzICYmIHJlcy5sZW5ndGggPiAwID8geyBkYXRhOiByZXNbMF0uZGF0YSwgY291bnQ6IHJlc1swXS5jb3VudCB9IDogeyBkYXRhOiBbXSwgY291bnQ6IDAgfSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGFnZ3JlZ2F0ZU9wdGlvbnM6IEFycmF5PGFueT4gPSBbeyAkdW53aW5kOiAnJHRhZ3MnIH1dO1xuICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICBhZ2dyZWdhdGVPcHRpb25zLnB1c2goe1xuICAgICAgICAgICRtYXRjaDogeyB0YWdzOiB7ICRyZWdleDogc2VhcmNoLnJlcGxhY2UoLyhbXmEtejAtOV0rKS9naSwgJycpLCAkb3B0aW9uczogJ2knIH0gfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgYWdncmVnYXRlT3B0aW9ucyA9IGFnZ3JlZ2F0ZU9wdGlvbnMuY29uY2F0KFt7ICRncm91cDogeyBfaWQ6ICckdGFncycsIGNvdW50OiB7ICRzdW06IDEgfSB9IH0sIHsgJHNvcnQ6IHsgY291bnQ6IC0xIH0gfSwgeyAkcHJvamVjdDogeyBfaWQ6IDEsIHRhZzogJyRfaWQnLCBjb3VudDogMSB9IH0sIC4uLihza2lwID4gMCA/IFt7ICRza2lwOiBza2lwIH1dIDogW10pLCAuLi4obGltaXQgPiAwID8gW3sgJGxpbWl0OiBsaW1pdCB9XSA6IFtdKV0pO1xuICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlUXVlcnkoY29sbGVjdGlvbk5hbWUsIGZpbHRlcnMsIGFnZ3JlZ2F0ZU9wdGlvbnMpLnBpcGUobWFwKChyZXM6IEFycmF5PGFueT4gPSBbXSkgPT4gKHsgZGF0YTogcmVzLCBjb3VudDogcmVzLmxlbmd0aCB9KSkpO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbFRhZ3NPZmZsaW5lKGNvbmZpZzogeyBjb2xsZWN0aW9uTmFtZTogc3RyaW5nOyBzZWFyY2g/OiBzdHJpbmc7IGZpbHRlcnM/OiBGaWx0ZXJzIH0pIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBbGxPZmZsaW5lKGNvbmZpZy5jb2xsZWN0aW9uTmFtZSwgZmFsc2UsIGNvbmZpZy5zZWFyY2gsIGNvbmZpZy5maWx0ZXJzLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCB0cnVlKS5waXBlKFxuICAgICAgbWFwKChyZXM6IEFycmF5PElFbnRpdHk+KSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gW107XG4gICAgICAgIGxldCBjb3VudDogYW55ID0ge307XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXMuZm9yRWFjaCh0ID0+IHtcbiAgICAgICAgICAgIGlmICh0LnRhZ3MpIHtcbiAgICAgICAgICAgICAgW10uY29uY2F0KHQudGFncykuZm9yRWFjaCh0YWcgPT4ge1xuICAgICAgICAgICAgICAgIGNvdW50W3RhZ10gPSBjb3VudFt0YWddID4gMCA/IGNvdW50W3RhZ10gKyAxIDogMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAga2V5cyhjb3VudCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgZGF0YS5wdXNoKHsgX2lkOiBrZXksIHRhZzoga2V5LCBjb3VudDogY291bnRba2V5XSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkYXRhID0gb3JkZXJCeShkYXRhLCBkID0+IC1kLmNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkYXRhLCBjb3VudDogZGF0YS5sZW5ndGgsIGNvbmZpZyB9O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0TXVsdGlwbGVBbGxUYWdzKGNvbmZpZzogeyBjb2xsZWN0aW9uTmFtZTogc3RyaW5nOyBzZWFyY2g/OiBzdHJpbmc7IGZpbHRlcnM/OiBGaWx0ZXJzOyBzdWJRdWVyeT86IFN1YlF1ZXJ5IH1bXSwgc2tpcCA9IDAsIGxpbWl0ID0gMjApIHtcbiAgICBpZiAodGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpKSB7XG4gICAgICBsZXQgb2JzID0gY29uZmlnLm1hcChjID0+IHRoaXMuZ2V0QWxsVGFnc09mZmxpbmUoYykpO1xuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qob2JzKS5waXBlKFxuICAgICAgICBtYXAocmV0ID0+IHtcbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGFnZ3JlZ2F0ZU9wdGlvbnMgPSBbeyAkdW53aW5kOiAnJHRhZ3MnIH0sIHsgJGdyb3VwOiB7IF9pZDogJyR0YWdzJywgY291bnQ6IHsgJHN1bTogMSB9IH0gfSwgeyAkc29ydDogeyBjb3VudDogLTEgfSB9LCB7ICRwcm9qZWN0OiB7IF9pZDogMSwgdGFnOiAnJF9pZCcsIGNvdW50OiAxIH0gfSwgLi4uKHNraXAgPiAwID8gW3sgJHNraXA6IHNraXAgfV0gOiBbXSksIC4uLihsaW1pdCA+IDAgPyBbeyAkbGltaXQ6IGxpbWl0IH1dIDogW10pXTtcbiAgICAgIGxldCBxdWVyaWVzOiBRdWVyeVtdID0gY29uZmlnLm1hcChjb25mID0+IHtcbiAgICAgICAgbGV0IGZpbHRlcnMgPSBjb25mLmZpbHRlcnMgfHwgW107XG4gICAgICAgIGlmIChjb25mLmNvbGxlY3Rpb25OYW1lID09PSAnbG9jYXRpb25zJykge1xuICAgICAgICAgIGZpbHRlcnMgPSBmaWx0ZXJzLm1hcChmZiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmYuZmlsdGVyKGYgPT4gZi5maWVsZCAhPT0gJ19nZW9sb2MnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBZ2dyZWdhdGVRdWVyeShjb25mLmNvbGxlY3Rpb25OYW1lLCBmaWx0ZXJzLCBhZ2dyZWdhdGVPcHRpb25zLCBjb25mLnNlYXJjaCwgbnVsbCwgbnVsbCwgbnVsbCwgY29uZi5zdWJRdWVyeSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZVF1ZXJpZXMocXVlcmllcykucGlwZShcbiAgICAgICAgbWFwKHJldHMgPT4ge1xuICAgICAgICAgIGxldCByZXRWYWwgPSByZXRzLm1hcCgocmVzLCBpKSA9PiAoeyBkYXRhOiByZXMsIGNvdW50OiByZXMubGVuZ3RoLCBjb25maWc6IGNvbmZpZ1tpXSB9KSk7XG4gICAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWxsUXVlcnkoY29sbGVjdGlvbk5hbWUsIHF1ZXJ5OiBRdWVyeSwgbG9vc2VDb3VudD86IGJvb2xlYW4sIG5vQ291bnQ/OiBib29sZWFuKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArIHRoaXMuZ2V0Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpICsgJy9maW5kJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBmaWx0ZXI6IHF1ZXJ5IH0sIG51bGwsICFub0NvdW50LCBmYWxzZSwgbG9vc2VDb3VudCk7XG4gICAgLy9sZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgY29sbGVjdGlvbk5hbWUgKyAnP2ZpbHRlcj0nICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHF1ZXJ5KSk7XG4gICAgLy9yZXR1cm4gdGhpcy5ycS5nZXQodXJsLCB0cnVlKTtcbiAgfVxuXG4gIGdldEFsbEdvb2dsZU1hcHMoc2VhcmNoPzogc3RyaW5nKSB7XG4gICAgaWYgKHNlYXJjaCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlbWFwcy5wbGFjZVByZWRpY3Rpb25zTG9jYXRpb25PYnNlcnZlcihzZWFyY2gpLnBpcGUoXG4gICAgICAgIG1hcChwcmVkaWN0aW9ucyA9PiB7XG4gICAgICAgICAgbGV0IGRldGFpbHMgPSBmbGF0dGVuKHByZWRpY3Rpb25zKS5maWx0ZXIoZCA9PiBkLmdlb21ldHJ5ICYmIGQuZ2VvbWV0cnkubG9jYXRpb24pO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb3VudDogZGV0YWlscy5sZW5ndGgsXG4gICAgICAgICAgICBkYXRhOiBkZXRhaWxzLm1hcChkID0+IHtcbiAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKGQuZ2VvbWV0cnkubG9jYXRpb24pO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGQuZm9ybWF0dGVkX2FkZHJlc3MsXG4gICAgICAgICAgICAgICAgX2lkOiBkLmlkLFxuICAgICAgICAgICAgICAgIF9nZW9sb2M6IHBvc2l0aW9uLnRvR2VvTG9jKHRydWUpLFxuICAgICAgICAgICAgICAgIGNvb3JkczogcG9zaXRpb24udG9Kc29uKClcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmcm9tKHRoaXMuZ29vZ2xlbWFwcy5nZXRDdXJyZW50QWRkcmVzc2VzKHRydWUpKS5waXBlKFxuICAgICAgICBtYXAoYWRkcmVzc2VzID0+IHtcbiAgICAgICAgICByZXR1cm4geyBjb3VudDogYWRkcmVzc2VzLmxlbmd0aCwgZGF0YTogYWRkcmVzc2VzIH07XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbFVuc3BsYXNoKHNlYXJjaD86IHN0cmluZywgc2tpcD86IG51bWJlciwgbGltaXQ/OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy51bnNwbGFzaC5nZXRBbGwoc2VhcmNoLCBza2lwLCBsaW1pdCk7XG4gIH1cblxuICBnZXRBbGxXb3JrcGxhY2UoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgc2VhcmNoPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGxldCBncmFwaEVudGl0eSA9IGNvbGxlY3Rpb25OYW1lLnJlcGxhY2UoJ3dvcmtwbGFjZV8nLCAnJyk7XG4gICAgc3dpdGNoIChncmFwaEVudGl0eSkge1xuICAgICAgY2FzZSAnZ3JvdXBzJzpcbiAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy53b3JrcGxhY2UuZ2V0QWxsR3JvdXBzKCk7XG4gICAgfVxuICAgIHJldHVybiBvZih7IGNvdW50OiAwLCBkYXRhOiBbXSB9KTtcbiAgfVxuXG4gIGdldEFsbE9wZXJhdGlvbihjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBxdWVyeTogUXVlcnkpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ09wZXJhdGlvbi9maW5kRG9jdW1lbnQnO1xuICAgIHJldHVybiB0aGlzLnJxXG4gICAgICAucG9zdChcbiAgICAgICAgdXJsLFxuICAgICAgICB7XG4gICAgICAgICAgY29sbGVjdGlvbk5hbWU6IE1vZGVscy5maXhDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZS5yZXBsYWNlKCdfc3RvcmUnLCAnJyksIHRydWUpLFxuICAgICAgICAgIHdoZXJlOiBxdWVyeS53aGVyZSxcbiAgICAgICAgICAvL29wZXJhdGlvbklkOiAoPGFueT5xdWVyeS53aGVyZSkub3BlcmF0aW9uSWQuaW5xWzBdLFxuICAgICAgICAgIGxpbWl0OiBxdWVyeS5saW1pdCxcbiAgICAgICAgICBza2lwOiBxdWVyeS5za2lwXG4gICAgICAgIH0sXG4gICAgICAgIG51bGwsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEubWFwKSB7XG4gICAgICAgICAgICByZXMuZGF0YSA9IHJlcy5kYXRhOyAvLy5tYXAociA9PiByLmRvYyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgc3luY0RhdGFiYXNlKGxhc3RTeW5jPzogRGF0ZSwgcHJvZ3Jlc3NFdmVudD86IEV2ZW50RW1pdHRlcjxudW1iZXI+KSB7XG4gICAgbGV0IGNvbGxlY3Rpb25zID0gdGhpcy5jb3JlQ29uZmlnLmdldFN5bmNlZENvbGxlY3Rpb25zKCk7XG4gICAgaWYgKGNvbGxlY3Rpb25zICYmIGNvbGxlY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubG9nLmxvZygnU3luY2luZyBEYXRhYmFzZSAtIFN0YXJ0Jyk7XG4gICAgICBsZXQgcHJvbWlzZXMgPSBjb2xsZWN0aW9ucy5tYXAoKGVudHJ5LCBpKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5Lm1heCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubG9nLmxvZygnU3luY2luZyBEYXRhYmFzZSAtIFN5bmNpbmcgJyArIGVudHJ5Lm5hbWUpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlLmdldERhdGFiYXNlQ29sbGVjdGlvbihlbnRyeS5uYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbGV0IGZpbHRlcnM6IEZpbHRlcnMgPSBjbG9uZURlZXAoZW50cnkuZmlsdGVycyB8fCBbW11dKTtcbiAgICAgICAgICAgIGZpbHRlcnMuZm9yRWFjaChmcyA9PlxuICAgICAgICAgICAgICBmcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmLnZhbHVlICYmIGlzQXJyYXkoZi52YWx1ZSkgJiYgZi52YWx1ZS5pbmRleE9mKCdjdXJyZW50TGFuZ3VhZ2UnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBmLnZhbHVlW2YudmFsdWUuaW5kZXhPZignY3VycmVudExhbmd1YWdlJyldID0gdGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChsYXN0U3luYyAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgLy8gJiYgKSB7XG4gICAgICAgICAgICAgIGZpbHRlcnMuZm9yRWFjaChmID0+IGYucHVzaCh7IGZpZWxkOiAnX2xtdCcsIG9wZXJhdG9yOiB7IF9pZDogJ2d0ZScgfSwgdmFsdWU6IGxhc3RTeW5jIH0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgdGhpcy5nZXRBbGwoZW50cnkubmFtZSwgZW50cnkuZmllbGRzLCBudWxsLCBudWxsLCBmaWx0ZXJzLCBudWxsLCAwLCBNYXRoLm1pbihlbnRyeS5tYXggfHwgMTAwMCwgMTAwMCksIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIHRydWUpXG4gICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgLy8gbGV0IGNodW5ja051bWJlciA9IChlbnRyeS5tYXggfHwgMTAwMDApIC8gMTAwO1xuICAgICAgICAgICAgICAgIC8vIGxldCBwcyA9IFtdO1xuICAgICAgICAgICAgICAgIC8vIGZvciAobGV0IGlpID0gMDsgaWkgPD0gY2h1bmNrTnVtYmVyOyBpaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gICBwcy5wdXNoKHRoaXMuZ2V0QWxsKGVudHJ5Lm5hbWUsIGVudHJ5LmZpZWxkcywgbnVsbCwgbnVsbCwgZmlsdGVycywgbnVsbCwgaWkgKiAxMDAsIDEwMCkudG9Qcm9taXNlKCkpO1xuICAgICAgICAgICAgICAgIC8vICAgLy9wcy5wdXNoKHRoaXMuYWdncmVnYXRlUXVlcnkoZW50cnkubmFtZSwgZmlsdGVycywgW3sgJHNraXA6IGlpICogMTAwIH0sIHsgJGxpbWl0OiAxMDAgfV0sIG51bGwsIG51bGwsIGZhbHNlLCBudWxsLCBudWxsKS50b1Byb21pc2UoKSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBQcm9taXNlLmFsbChwcylcbiAgICAgICAgICAgICAgICAvLyAudGhlbigocmV0OiBBcnJheTxSZXNwb25zZU9iamVjdD4pID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgIGxldCBkID0gW10uY29uY2F0LmFwcGx5KFtdLCByZXQubWFwKHIgPT4gci5kYXRhKSk7XG4gICAgICAgICAgICAgICAgLy8gICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBjb3VudDogZC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgLy8gICAgIGRhdGE6IGRcbiAgICAgICAgICAgICAgICAvLyAgIH07XG4gICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudC5lbWl0KChpIC8gY29sbGVjdGlvbnMubGVuZ3RoKSAqIDEwMCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAocmV0ICYmIHJldC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlUHJvbWlzZXM6IEFycmF5PGFueT4gPSBbUHJvbWlzZS5yZXNvbHZlKG51bGwpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlbGV0ZWRLZXlzOiBBcnJheTxzdHJpbmc+O1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICBmaWxlUHJvbWlzZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERlbGV0ZWRFbnRpdGllcyhlbnRyeS5uYW1lLCBkYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRlbGV0ZWRrZXlzOiBBcnJheTxzdHJpbmc+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlZEtleXMgPSBkZWxldGVka2V5cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5hZGRUb0NhY2hlICYmIGVudHJ5LmFkZFRvQ2FjaGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LmFkZFRvQ2FjaGUuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LmRhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1ba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQcm9taXNlcy5wdXNoKCgpID0+IGNhY2hlRmlsZShpdGVtW2tleV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZmlsZVByb21pc2VzKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS51cGRhdGVEYXRhYmFzZUNvbGxlY3Rpb24oZW50cnkubmFtZSwgcmV0LmRhdGEsICdfaWQnLCBkZWxldGVkS2V5cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcy5wcm9taXNlLnNlcXVlbnRpYWwocHJvbWlzZXMpLnRoZW4ocmV0ID0+IHtcbiAgICAgICAgaWYgKHByb2dyZXNzRXZlbnQpIHtcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50LmVtaXQoMTAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cblxuICBjbGVhckRhdGFiYXNlKCkge1xuICAgIGxldCBjb2xsZWN0aW9ucyA9IHRoaXMuY29yZUNvbmZpZy5nZXRTeW5jZWRDb2xsZWN0aW9ucygpO1xuICAgIGlmIChjb2xsZWN0aW9ucyAmJiBjb2xsZWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgcHJvbWlzZXMgPSBjb2xsZWN0aW9ucy5tYXAoZW50cnkgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4gdGhpcy5jYWNoZS5jbGVhckRhdGFiYXNlQ29sbGVjdGlvbihlbnRyeS5uYW1lKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZS5zZXF1ZW50aWFsKHByb21pc2VzKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxuXG4gIGdldERlbGV0ZWRFbnRpdGllcyhjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBkYXRhOiBJRW50aXR5W10pIHtcbiAgICBkYXRhID0gZGF0YSB8fCBbXTtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvZ2V0RGVsZXRlZElkcyc7XG4gICAgbGV0IG1vZGVsTmFtZSA9IE1vZGVscy5maXhDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgbW9kZWxOYW1lLCBpZHM6IGRhdGEubWFwKGUgPT4gZS5faWQpIH0pLnBpcGUoXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgaWYgKHJldFZhbCkge1xuICAgICAgICAgIHJldHVybiByZXRWYWwgfHwgW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0T2ZmbGluZUVudGl0aWVzQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBsb2FkRGF0YWJhc2VPckdldENvdW50KHRydWUpO1xuICB9XG5cbiAgdXBsb2FkRGF0YWJhc2UocHJvZ3Jlc3NFbWl0dGVyPzogRXZlbnRFbWl0dGVyPG51bWJlcj4pIHtcbiAgICByZXR1cm4gdGhpcy51cGxvYWREYXRhYmFzZU9yR2V0Q291bnQoZmFsc2UsIHByb2dyZXNzRW1pdHRlcik7XG4gIH1cblxuICB1cGxvYWREYXRhYmFzZU9yR2V0Q291bnQocmV0dXJuQ291bnQ6IGJvb2xlYW4sIHByb2dyZXNzRW1pdHRlcj86IEV2ZW50RW1pdHRlcjxudW1iZXI+KSB7XG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGxldCBvZmZsaW5lRGF0YSA9IHt9O1xuXG4gICAgaWYgKCF0aGlzLmlzVXBsb2FkaW5nRGF0YWJhc2UgfHwgdGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpKSB7XG4gICAgICB0aGlzLmlzVXBsb2FkaW5nRGF0YWJhc2UgPSB0cnVlO1xuICAgICAgbGV0IGNvbGxlY3Rpb25zID0gdGhpcy5jb3JlQ29uZmlnLmdldFN5bmNlZENvbGxlY3Rpb25zKCk7XG5cbiAgICAgIHJldHVybiB0aGlzLmNhY2hlLmdldERhdGFiYXNlQ29sbGVjdGlvbjxJQ3VzdG9tTW9kZWw+KCdjdXN0b21tb2RlbHMnKS50aGVuKGN1c3RvbW1vZGVscyA9PiB7XG4gICAgICAgIGlmIChjb2xsZWN0aW9ucyAmJiBjb2xsZWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29sbGVjdGlvbnMgPSBjbG9uZURlZXAoY29sbGVjdGlvbnMpO1xuICAgICAgICAgIGNvbGxlY3Rpb25zID0gY29sbGVjdGlvbnMuY29uY2F0KGN1c3RvbW1vZGVscy5tYXAoYyA9PiAoeyBuYW1lOiBjLm5hbWUgfSkpKTtcbiAgICAgICAgICBsZXQgcHJvbWlzZXNDb3VudCA9IGNvbGxlY3Rpb25zLm1hcChlbnRyeSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT5cbiAgICAgICAgICAgICAgdGhpcy5jYWNoZS5nZXREYXRhYmFzZUNvbGxlY3Rpb24oZW50cnkubmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5maWx0ZXIoZSA9PiB0aGlzLmlzT2ZmbGluZUVudGl0eShlKSAmJiAoZSBhcyBhbnkpLnN0YXR1cyAhPT0gJ2RyYWZ0Jyk7XG4gICAgICAgICAgICAgICAgb2ZmbGluZURhdGFbZW50cnkubmFtZV0gPSBkYXRhO1xuICAgICAgICAgICAgICAgIHRvdGFsICs9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlLnNlcXVlbnRpYWwocHJvbWlzZXNDb3VudCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAocmV0dXJuQ291bnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5pc1VwbG9hZGluZ0RhdGFiYXNlID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiB0b3RhbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nLmxvZygndXBsb2FkRGF0YWJhc2UnLCAndG90YWwnLCB0b3RhbCk7XG4gICAgICAgICAgICAgIGlmIChwcm9ncmVzc0VtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0VtaXR0ZXIuZW1pdCh0b3RhbCA+IDAgPyAoY291bnQgLyB0b3RhbCkgKiAxMDAgOiAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsZXQgcHJvbWlzZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgICAgICAgICAgaWYgKHRvdGFsID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25zLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBvZmZsaW5lRGF0YVtlbnRyeS5uYW1lXTtcbiAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChlbnRpdHkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgb2ZmbGluZUlkID0gZW50aXR5Ll9pZDtcbiAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkgPSB7IC4uLmVudGl0eSB9O1xuICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlbnRpdHkuX2lkO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwc2VydChlbnRyeS5uYW1lLCBlbnRpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJldFZhbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc0VtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0VtaXR0ZXIuZW1pdCgoY291bnQgLyB0b3RhbCkgKiAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nLmxvZygndXBsb2FkRGF0YWJhc2UnLCAnY291bnQnLCBjb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlLnJlcGxhY2VGcm9tRGF0YWJhc2VDb2xsZWN0aW9uKGVudHJ5Lm5hbWUsIG9mZmxpbmVJZCwgcmV0VmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb21pc2Uuc2VxdWVudGlhbChwcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NFbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzRW1pdHRlci5lbWl0KDEwMCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVXBsb2FkaW5nRGF0YWJhc2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXR1cm5Db3VudCA/IDAgOiBudWxsKTtcbiAgfVxuXG4gIGlzT2ZmbGluZUVudGl0eShlbnRpdHk6IElFbnRpdHkpIHtcbiAgICByZXR1cm4gZW50aXR5ICYmIGVudGl0eS5faWQgJiYgdGhpcy5pc09mZmxpbmVJZChlbnRpdHkuX2lkKTtcbiAgfVxuXG4gIGlzT2ZmbGluZUlkKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gaWQgJiYgaWQuc3RhcnRzV2l0aCAmJiBpZC5zdGFydHNXaXRoKENhY2hlLk9GRkxJTkVfUFJFRklYKTtcbiAgfVxuXG4gIGdldEFsbE9mZmxpbmUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgb2ZmbGluZU9ubHk6IGJvb2xlYW4sIHNlYXJjaD86IHN0cmluZywgZmlsdGVycz86IEZpbHRlcnMsIHNvcnRzPzogQXJyYXk8SVNvcnQ+LCBza2lwID0gMCwgbGltaXQgPSAyMCwgY3VzdG9tRmlsdGVyID0gbnVsbCwgbm9Db3VudDogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gZnJvbShcbiAgICAgIHRoaXMuY2FjaGUuZ2V0RGF0YWJhc2VDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBsZXQgbW9kZWwgPSBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgICAgaWYgKG9mZmxpbmVPbmx5KSB7XG4gICAgICAgICAgZGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4gdGhpcy5pc09mZmxpbmVFbnRpdHkoZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IG5ld0RhdGE6IEFycmF5PElFbnRpdHk+ID0gW107XG4gICAgICAgICAgZmlsdGVycy5mb3JFYWNoKGZzID0+IHtcbiAgICAgICAgICAgIGxldCBzdWJEYXRhID0gWy4uLmRhdGFdO1xuICAgICAgICAgICAgZnMuZmlsdGVyKGYgPT4gZi5yZW1vdmVGcm9tT2ZmbGluZSAhPT0gdHJ1ZSkuZm9yRWFjaChmID0+IHtcbiAgICAgICAgICAgICAgc3ViRGF0YSA9IHN1YkRhdGEuZmlsdGVyKGUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGlzQXJyYXkoZi52YWx1ZSkgJiYgaXNPYmplY3QoZi52YWx1ZVswXSkgPyBsb2Rhc2hNYXAoZi52YWx1ZSwgJ19pZCcpIDogaXNBcnJheShmLnZhbHVlKSA/IGYudmFsdWUgOiBpc09iamVjdChmLnZhbHVlKSA/IGYudmFsdWUuX2lkIDogZi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoZSAmJiBlW2YuZmllbGRdICE9PSB1bmRlZmluZWQgJiYgZVtmLmZpZWxkXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgc3dpdGNoIChmLm9wZXJhdG9yLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdlcSc6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzRXF1YWwoZVtmLmZpZWxkXSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICduZXEnOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNFcXVhbChlW2YuZmllbGRdLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2lucSc6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbihbXS5jb25jYXQoZVtmLmZpZWxkXSksIFtdLmNvbmNhdCh2YWx1ZSkpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25pbic6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbihbXS5jb25jYXQoZVtmLmZpZWxkXSksIFtdLmNvbmNhdCh2YWx1ZSkpLmxlbmd0aCA8PSAwO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdndCc6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVbZi5maWVsZF0gPiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3RlJzpcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZVtmLmZpZWxkXSA+PSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbHQnOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlW2YuZmllbGRdIDwgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2x0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVbZi5maWVsZF0gPD0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25lYXJTcGhlcmUnOlxuICAgICAgICAgICAgICAgICAgICAgIChlIGFzIGFueSkuZGlzdGFuY2UgPSB0aGlzLmdlb2xvYy5nZXREaXN0YW5jZShlW2YuZmllbGRdWzFdLCBlW2YuZmllbGRdWzBdLCB2YWx1ZVsxXSwgdmFsdWVbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZSBhcyBhbnkpLmRpc3RhbmNlIDwgZi5tYXg7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2V4aXN0cyc6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc051bGxPclVuZGVmaW5lZChlW2YuZmllbGRdKTtcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgc3dpdGNoIChmLm9wZXJhdG9yLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICduZXEnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICduaW4nOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2lucSc6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmluZGV4T2YobnVsbCkgPj0gMDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuZXdEYXRhID0gWy4uLm5ld0RhdGEsIC4uLnN1YkRhdGFdO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGRhdGEgPSB1bmlxQnkobmV3RGF0YSwgZSA9PiBlLl9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VhcmNoICYmIG1vZGVsICYmIG1vZGVsLnNlYXJjaGFibGVGaWVsZHMpIHtcbiAgICAgICAgICBkYXRhID0gZGF0YS5maWx0ZXIoZCA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG1vZGVsLnNlYXJjaGFibGVGaWVsZHMuc29tZShcbiAgICAgICAgICAgICAgICBuYW1lID0+XG4gICAgICAgICAgICAgICAgICBkW25hbWVdICYmXG4gICAgICAgICAgICAgICAgICBkW25hbWVdXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgICAgIC50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgIC5pbmRleE9mKHNlYXJjaC50b1VwcGVyQ2FzZSgpKSA+PSAwXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzLnNvbWUoZnMgPT4gZnMuc29tZShmID0+IGYub3BlcmF0b3IuX2lkID09PSAnbmVhclNwaGVyZScpKSkge1xuICAgICAgICAgIGRhdGEgPSBvcmRlckJ5KGRhdGEsIFsnZGlzdGFuY2UnXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNvcnRzKSB7XG4gICAgICAgICAgZGF0YSA9IG9yZGVyQnkoZGF0YSwgc29ydHMubWFwKHMgPT4gcy5jb2xJZCksIHNvcnRzLm1hcChzID0+IHMuc29ydCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0b3RhbCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICBpZiAobGltaXQgPiAwKSB7XG4gICAgICAgICAgc2tpcCA9IHNraXAgfHwgMDtcbiAgICAgICAgICBkYXRhID0gZGF0YS5zbGljZShza2lwLCBza2lwICsgbGltaXQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub0NvdW50ID8gZGF0YSA6IHsgY291bnQ6IHRvdGFsLCBkYXRhOiBkYXRhIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBhZ2dyZWdhdGVRdWVyeShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBmaWx0ZXJzPzogRmlsdGVycywgYWdncmVnYXRlT3B0aW9ucz86IEFycmF5PGFueT4sIHNlYXJjaD86IHN0cmluZywgZXhjbHVkZWRGaWVsZHM/OiBBcnJheTxhbnk+LCBpbmNsdWRlQ291bnQgPSBmYWxzZSwgY2FjaGVJZDogc3RyaW5nID0gbnVsbCwgY3VzdG9tRmlsdGVyPzogYW55LCBzdWJRdWVyeT86IFN1YlF1ZXJ5LCBhZ2dyZWdhdGVPcHRpb25zT2ZmbGluZT86IGFueSkge1xuICAgIGxldCBvYnM6IE9ic2VydmFibGU8YW55PjtcbiAgICBjb2xsZWN0aW9uTmFtZSA9IE1vZGVscy5maXhDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSwgdHJ1ZSk7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgaWYgKGNhY2hlSWQpIHtcbiAgICAgICAgb2JzID0gZnJvbSh0aGlzLmxvY2FsRm9yYWdlLmdldChjYWNoZUlkKSk7XG4gICAgICB9IGVsc2UgaWYgKGFnZ3JlZ2F0ZU9wdGlvbnNPZmZsaW5lKSB7XG4gICAgICAgIG9icyA9IGZyb20oXG4gICAgICAgICAgdGhpcy5jYWNoZS5nZXREYXRhYmFzZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gYWdncmVnYXRlT3B0aW9uc09mZmxpbmUoZGF0YSk7XG4gICAgICAgICAgICBpZiAoaW5jbHVkZUNvdW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IFt7IGNvdW50OiBkYXRhLmxlbmd0aCwgZGF0YTogZGF0YSB9XSB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogZGF0YSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnMgPSBvZih7IGNvdW50OiAwLCBkYXRhOiBbXSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbGxlY3Rpb25OYW1lID09PSAnYWdncmVnYXRlTG9ncycpIHtcbiAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZUxvZ3MoYWdncmVnYXRlT3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnYnVzaW5lc3Nsb2dpYy9hZ2dyZWdhdGVRdWVyeSc7XG4gICAgICBsZXQgcXVlcnk6IFF1ZXJ5ID0gdGhpcy5nZXRBZ2dyZWdhdGVRdWVyeShjb2xsZWN0aW9uTmFtZSwgZmlsdGVycywgYWdncmVnYXRlT3B0aW9ucywgc2VhcmNoLCBleGNsdWRlZEZpZWxkcywgaW5jbHVkZUNvdW50LCBjdXN0b21GaWx0ZXIsIHN1YlF1ZXJ5KTtcbiAgICAgIG9icyA9IHRoaXMucnEucG9zdCh1cmwsIHsgcGFyYW1zOiBxdWVyeSB9KS5waXBlKFxuICAgICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgICBpZiAoY2FjaGVJZCkge1xuICAgICAgICAgICAgdGhpcy5sb2NhbEZvcmFnZS5zZXQoY2FjaGVJZCwgcmV0VmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9icy5waXBlKFxuICAgICAgbWFwKChyZXRWYWw6IGFueSkgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IFtdO1xuICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5kYXRhICYmIHJldFZhbC5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpZiAoaW5jbHVkZUNvdW50KSB7XG4gICAgICAgICAgICBkYXRhID0gcmV0VmFsLmRhdGFbMF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSByZXRWYWwuZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBhZ2dyZWdhdGVRdWVyaWVzKHF1ZXJpZXM6IEFycmF5PFF1ZXJ5PiwgaW5jbHVkZUNvdW50ID0gZmFsc2UsIGNhY2hlSWQ6IHN0cmluZyA9IG51bGwpIHtcbiAgICBsZXQgb2JzOiBPYnNlcnZhYmxlPGFueT47XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgaWYgKGNhY2hlSWQpIHtcbiAgICAgICAgb2JzID0gZnJvbSh0aGlzLmxvY2FsRm9yYWdlLmdldChjYWNoZUlkKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnMgPSBvZih7IGNvdW50OiAwLCBkYXRhOiBbXSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdidXNpbmVzc2xvZ2ljL2FnZ3JlZ2F0ZVF1ZXJpZXMnO1xuICAgICAgb2JzID0gdGhpcy5ycS5wb3N0KHVybCwgcXVlcmllcykucGlwZShcbiAgICAgICAgbWFwKChyZXRWYWw6IHsgZGF0YTogQXJyYXk8YW55PiB9KSA9PiB7XG4gICAgICAgICAgbGV0IGZpbmFsQXJyYXkgPSBBcnJheShxdWVyaWVzLmxlbmd0aCk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaW5hbEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmaW5hbEFycmF5W2ldID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXRWYWwgJiYgcmV0VmFsLmRhdGEgJiYgcmV0VmFsLmRhdGEuc29tZShkID0+IGlzT2JqZWN0KGQuZG9jKSkpIHtcbiAgICAgICAgICAgIHJldFZhbC5kYXRhLmZvckVhY2goKGQ6IHsgaW5kZXg6IG51bWJlcjsgZG9jOiBhbnkgfSkgPT4ge1xuICAgICAgICAgICAgICBmaW5hbEFycmF5W2QuaW5kZXhdID0gZmluYWxBcnJheVtkLmluZGV4XSB8fCBbXTtcbiAgICAgICAgICAgICAgZmluYWxBcnJheVtkLmluZGV4XS5wdXNoKGQuZG9jKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0VmFsLmRhdGEgPSBmaW5hbEFycmF5O1xuICAgICAgICAgIH0gZWxzZSBpZiAocmV0VmFsICYmIGlzQXJyYXkocmV0VmFsLmRhdGEpICYmIHJldFZhbC5kYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0VmFsLmRhdGEgPSBmaW5hbEFycmF5O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjYWNoZUlkKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsRm9yYWdlLnNldChjYWNoZUlkLCByZXRWYWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JzLnBpcGUoXG4gICAgICBtYXAoKHJldFZhbDogYW55KSA9PiB7XG4gICAgICAgIGxldCBkYXRhID0gW107XG4gICAgICAgIGlmIChyZXRWYWwgJiYgcmV0VmFsLmRhdGEgJiYgcmV0VmFsLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGlmIChpbmNsdWRlQ291bnQpIHtcbiAgICAgICAgICAgIGRhdGEgPSByZXRWYWwuZGF0YVswXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IHJldFZhbC5kYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldEFnZ3JlZ2F0ZVF1ZXJ5KGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGZpbHRlcnM/OiBGaWx0ZXJzLCBhZ2dyZWdhdGVPcHRpb25zPzogQXJyYXk8YW55Piwgc2VhcmNoPzogc3RyaW5nLCBleGNsdWRlZEZpZWxkcz86IEFycmF5PGFueT4sIGluY2x1ZGVDb3VudCA9IGZhbHNlLCBjdXN0b21GaWx0ZXI/OiBhbnksIHN1YlF1ZXJ5PzogU3ViUXVlcnkpIHtcbiAgICBsZXQgbWF0Y2ggPSB7fTtcbiAgICBsZXQgcHJvamVjdCA9IHt9O1xuICAgIGxldCBmaWx0ZXJXaGVyZSA9IG51bGw7XG4gICAgbGV0IHNlYXJjaFdoZXJlID0gbnVsbDtcbiAgICBsZXQgZGVmYXVsdEZpZWxkcyA9IFtdO1xuICAgIGxldCBxdWVyeTogUXVlcnkgPSA8UXVlcnk+e1xuICAgICAgY29sbGVjdGlvbk5hbWU6IE1vZGVscy5maXhDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSwgdHJ1ZSksXG4gICAgICBpbmNsdWRlQ291bnRcbiAgICB9O1xuICAgIGlmIChmaWx0ZXJzICYmIGZpbHRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgZmlsdGVyV2hlcmUgPSBNb2RlbHMuZXhwb3J0V2hlcmUoY29sbGVjdGlvbk5hbWUsIGZpbHRlcnMsIGV4Y2x1ZGVkRmllbGRzKTtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICBzZWFyY2hXaGVyZSA9IE1vZGVscy5leHBvcnRTZWFyY2goY29sbGVjdGlvbk5hbWUsIHNlYXJjaCk7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaFdoZXJlICYmIGZpbHRlcldoZXJlKSB7XG4gICAgICBxdWVyeS53aGVyZSA9IHsgYW5kOiBbc2VhcmNoV2hlcmUsIGZpbHRlcldoZXJlXSB9O1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoV2hlcmUpIHtcbiAgICAgIHF1ZXJ5LndoZXJlID0gc2VhcmNoV2hlcmU7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJXaGVyZSkge1xuICAgICAgcXVlcnkud2hlcmUgPSBmaWx0ZXJXaGVyZTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tRmlsdGVyICYmIHF1ZXJ5LndoZXJlKSB7XG4gICAgICBxdWVyeS53aGVyZSA9IHsgYW5kOiBbcXVlcnkud2hlcmUsIGN1c3RvbUZpbHRlcl0gfTtcbiAgICB9IGVsc2UgaWYgKGN1c3RvbUZpbHRlcikge1xuICAgICAgcXVlcnkud2hlcmUgPSBjdXN0b21GaWx0ZXI7XG4gICAgfVxuICAgIHF1ZXJ5LndoZXJlID0gcXVlcnkud2hlcmUgfHwge307XG5cbiAgICBpZiAoZGVmYXVsdEZpZWxkcyAmJiBkZWZhdWx0RmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGRlZmF1bHRGaWVsZHMuZm9yRWFjaCgoZmllbGQsIGkpID0+IHtcbiAgICAgICAgcHJvamVjdFtmaWVsZF0gPSAxO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0VtcHR5KHByb2plY3QpKSB7XG4gICAgICBhZ2dyZWdhdGVPcHRpb25zLnVuc2hpZnQoeyAkcHJvamVjdDogcHJvamVjdCB9KTtcbiAgICB9XG4gICAgaWYgKCFpc0VtcHR5KG1hdGNoKSkge1xuICAgICAgYWdncmVnYXRlT3B0aW9ucy51bnNoaWZ0KHsgJG1hdGNoOiBtYXRjaCB9KTtcbiAgICB9XG5cbiAgICBxdWVyeS5vcHRpb25zID0gYWdncmVnYXRlT3B0aW9ucztcbiAgICBxdWVyeS5zdWJRdWVyeSA9IE1vZGVscy5leHBvcnRTdWJRdWVyeShjb2xsZWN0aW9uTmFtZSwgZmlsdGVycywgdHJ1ZSk7XG4gICAgaWYgKHN1YlF1ZXJ5KSB7XG4gICAgICBxdWVyeS5zdWJRdWVyeSA9IHN1YlF1ZXJ5O1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuICBhZ2dyZWdhdGVMb2dzKHN0YWdlcz86IEFycmF5PGFueT4sIGdyb3Vwcz86IEFycmF5PHN0cmluZz4sIHVzZXJJZHM/OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdBZG1pbkRhc2hib2FyZC9hZ2dyZWdhdGVMb2dzJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBzdGFnZXMsIGdyb3VwcywgdXNlcklkcyB9KTtcbiAgfVxuXG4gIHRleHRTZWFyY2gocXVlcnk6IHN0cmluZywgY29sbGVjdGlvbk5hbWU6IHN0cmluZykge1xuICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnYnVzaW5lc3Nsb2dpYy90ZXh0U2VhcmNoJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBxdWVyeSwgbW9kZWxOYW1lOiBjb2xsZWN0aW9uTmFtZSB9KTtcbiAgfVxuXG4gIGNyZWF0ZUZpbGUoZmlsZTogRmlsZSwgZ3JvdXA6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGhpZGVNb2JpbGUgPSB0cnVlLCBmaWxlTmFtZT86IHN0cmluZywgdGVuYW50UmVmPzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMudXBzZXJ0KCdmaWxlcycsIHtcbiAgICAgIF9kb3dubG9hZFVSTDogZmlsZSxcbiAgICAgIF9maWxlbmFtZTogZmlsZS5uYW1lLFxuICAgICAgZ3JvdXA6IGdyb3VwLFxuICAgICAgaGlkZU1vYmlsZTogaGlkZU1vYmlsZSxcbiAgICAgIG1pbWVUeXBlOiBmaWxlLnR5cGUsXG4gICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICBfdGVuYW50UmVmOiB0ZW5hbnRSZWZcbiAgICB9KTtcbiAgfVxuXG4gIGdldEZpbGVVcGxvYWRlcihmaWxlVHlwZXM/LCBtYXhGaWxlU2l6ZT8pIHtcbiAgICBsZXQgb3B0aW9uczogYW55ID0ge1xuICAgICAgbWF4RmlsZVNpemU6IG1heEZpbGVTaXplLFxuICAgICAgdXJsOiB0aGlzLmNvbmZpZy51cGxvYWRVcmxcbiAgICB9O1xuICAgIC8vIGlmIChmaWxlVHlwZXMgJiYgZmlsZVR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAvLyAgICAgb3B0aW9ucy5hbGxvd2VkRmlsZVR5cGUgPSBmaWxlVHlwZXM7XG4gICAgLy8gfVxuICAgIHJldHVybiBuZXcgRmlsZVVwbG9hZGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgZXhlY3V0ZShwYXJhbXMpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ0VuZHBvaW50cy9leGVjdXRlJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBwYXJhbXMgfSk7XG4gIH1cblxuICB1bmRvT3BlcmF0aW9uKG9wZXJhdGlvbklkOiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ29wZXJhdGlvbi91bmRvRGVsZXRlJztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBvcGVyYXRpb25JZCB9KTtcbiAgfVxuXG4gIGdldE1hcmtlcnMobG9jYXRpb25zOiBBcnJheTxMb2NhdGlvbj4pIHtcbiAgICByZXR1cm4gbG9jYXRpb25zXG4gICAgICAuZmlsdGVyKChsOiBMb2NhdGlvbikgPT4gbC5fZ2VvbG9jICYmIGwuX2dlb2xvYy5sZW5ndGggPiAxKVxuICAgICAgLm1hcCgobDogTG9jYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBfaWQ6IGwuX2lkLFxuICAgICAgICAgIGFkZHJlc3M6IGwuYWRkcmVzcyxcbiAgICAgICAgICBsYXRpdHVkZTogbC5fZ2VvbG9jWzFdLFxuICAgICAgICAgIGxvbmdpdHVkZTogbC5fZ2VvbG9jWzBdLFxuICAgICAgICAgIHRpdGxlOiBsLnRpdGxlLFxuICAgICAgICAgIGNvbG9yOiBsLnN0YXR1cyA9PT0gJ3BsYWNlJyA/ICdzdWNjZXNzJyA6IGwuc3RhdHVzID09PSAnZmlsZScgPyAnaW5mbycgOiBsLnN0YXR1cyA9PT0gJ2Vycm9yJyA/ICdkYW5nZXInIDogbC5zdGF0dXMgPT09ICdwcmVkaWN0aW9uJyA/ICdzdGFibGUnIDogJ2RhcmsnXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxuXG4gIGdldFVzZXJPckxvY2F0aW9uU3RhdChcbiAgICBpZDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPixcbiAgICBtb2RlOiBzdHJpbmcsXG4gICAgY3VzdG9tRmlsdGVyPzogYW55XG4gICk6IE9ic2VydmFibGU8XG4gICAgQXJyYXk8e1xuICAgICAgX2lkOiBzdHJpbmc7XG4gICAgICBib29rZWQ6IG51bWJlcjtcbiAgICAgIGNvdW50OiBudW1iZXI7XG4gICAgICBmaW5pc2hlZDogbnVtYmVyO1xuICAgICAgYXJjaGl2ZWQ6IG51bWJlcjtcbiAgICAgIHZhbGlkYXRlZDogbnVtYmVyO1xuICAgICAgcmVqZWN0ZWQ6IG51bWJlcjtcbiAgICAgIHRvYmV2YWxpZGF0ZWQ6IG51bWJlcjtcbiAgICAgIGF2YWlsYWJsZTogbnVtYmVyO1xuICAgIH0+XG4gID4ge1xuICAgIGxldCB2YWx1ZTogQXJyYXk8YW55PiA9IDxhbnk+KGlzU3RyaW5nKGlkKSA/IFt7IF9pZDogaWQgfV0gOiBpZCk7XG4gICAgbGV0IHJlZiA9IG1vZGUgPT09ICdjYW1wYWlnbicgPyAnZGVzY3JpcHRpb25SZWYnIDogbW9kZSA9PT0gJ2xvY2F0aW9uJyA/ICdsb2NhdGlvblJlZicgOiAnb3duZXJSZWYnO1xuICAgIGxldCBmaWx0ZXJzID0gW1t7IGZpZWxkOiByZWYsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IHZhbHVlIH1dXTtcblxuICAgIGxldCBvcHRpb25zID0gW1xuICAgICAge1xuICAgICAgICAkcHJvamVjdDoge1xuICAgICAgICAgIF9pZDogJyQnICsgcmVmLFxuICAgICAgICAgIGJvb2tlZDogeyAkY29uZDogeyBpZjogeyAkZXE6IFsnJHN0YXR1cycsICdib29rZWQnXSB9LCB0aGVuOiAxLCBlbHNlOiAwIH0gfSxcbiAgICAgICAgICBmaW5pc2hlZDogeyAkY29uZDogeyBpZjogeyAkZXE6IFsnJHN0YXR1cycsICdmaW5pc2hlZCddIH0sIHRoZW46IDEsIGVsc2U6IDAgfSB9LFxuICAgICAgICAgIGFyY2hpdmVkOiB7ICRjb25kOiB7IGlmOiB7ICRlcTogWyckc3RhdHVzJywgJ2FyY2hpdmVkJ10gfSwgdGhlbjogMSwgZWxzZTogMCB9IH0sXG4gICAgICAgICAgdmFsaWRhdGVkOiB7ICRjb25kOiB7IGlmOiB7ICRlcTogWyckdmFsaWRhdGVkJywgdHJ1ZV0gfSwgdGhlbjogMSwgZWxzZTogMCB9IH0sXG4gICAgICAgICAgcmVqZWN0ZWQ6IHsgJGNvbmQ6IHsgaWY6IHsgJGVxOiBbJyR2YWxpZGF0ZWQnLCBmYWxzZV0gfSwgdGhlbjogMSwgZWxzZTogMCB9IH0sXG4gICAgICAgICAgZmluaXNoZWREYXRlOiAnJGZpbmlzaGVkRGF0ZSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJGdyb3VwOiB7XG4gICAgICAgICAgX2lkOiAnJF9pZCcsXG4gICAgICAgICAgYm9va2VkOiB7ICRzdW06ICckYm9va2VkJyB9LFxuICAgICAgICAgIGZpbmlzaGVkOiB7ICRzdW06ICckZmluaXNoZWQnIH0sXG4gICAgICAgICAgYXJjaGl2ZWQ6IHsgJHN1bTogJyRhcmNoaXZlZCcgfSxcbiAgICAgICAgICB2YWxpZGF0ZWQ6IHsgJHN1bTogJyR2YWxpZGF0ZWQnIH0sXG4gICAgICAgICAgcmVqZWN0ZWQ6IHsgJHN1bTogJyRyZWplY3RlZCcgfSxcbiAgICAgICAgICBsYXRlc3Q6IHsgJG1heDogJyRmaW5pc2hlZERhdGUnIH0sXG4gICAgICAgICAgY291bnQ6IHsgJHN1bTogMSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdO1xuICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZVF1ZXJ5KCdtaXNzaW9ucycsIGZpbHRlcnMsIG9wdGlvbnMsIG51bGwsIG51bGwsIGZhbHNlLCBudWxsLCBjdXN0b21GaWx0ZXIpLnBpcGUoXG4gICAgICBtYXAoKHN0YXRzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHN0YXRzICYmIHN0YXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzdGF0c1swXS5hdmFpbGFibGUgPSAoc3RhdHNbMF0uY291bnQgfHwgMCkgLSAoc3RhdHNbMF0uZmluaXNoZWQgfHwgMCkgLSAoc3RhdHNbMF0uYm9va2VkIHx8IDApIC0gKHN0YXRzWzBdLmFyY2hpdmVkIHx8IDApO1xuICAgICAgICAgIHN0YXRzWzBdLnRvYmV2YWxpZGF0ZWQgPSAoc3RhdHNbMF0uZmluaXNoZWQgfHwgMCkgLSAoc3RhdHNbMF0udmFsaWRhdGVkIHx8IDApIC0gKHN0YXRzWzBdLnJlamVjdGVkIHx8IDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0cztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHNldFRpbWVzY2FsZShmaWx0ZXJzOiBGaWx0ZXJzLCB0aW1lc2NhbGU6IHN0cmluZywgZGF0ZUZpZWxkID0gJ2ZpbmlzaGVkRGF0ZScsIGVuZERhdGU/OiBEYXRlIHwgc3RyaW5nLCBwcmV2aW91czogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKHRpbWVzY2FsZSkge1xuICAgICAgZmlsdGVycyA9IGZpbHRlcnMgfHwgW107XG4gICAgICBmaWx0ZXJzLmZvckVhY2goZnMgPT4ge1xuICAgICAgICBmcyA9IGZzIHx8IFtdO1xuICAgICAgICByZW1vdmUoZnMsIChmOiBhbnkpID0+IGYuZmllbGQgPT09IGRhdGVGaWVsZCk7XG4gICAgICAgIGZzLnB1c2goe1xuICAgICAgICAgIGZpZWxkOiBkYXRlRmllbGQsXG4gICAgICAgICAgb3BlcmF0b3I6IHsgX2lkOiAnYmV0d2VlbicsIGludGVydmFsOiB0cnVlIH0sXG4gICAgICAgICAgdmFsdWU6IGdldFN0YXJ0QW5kRW5kRGF0ZXModGltZXNjYWxlLCBlbmREYXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgcHJldmlvdXMpXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFzRmlsZXMoZW50aXR5LCBzdWZmaXhzOiBBcnJheTxzdHJpbmc+ID0gW10pOiBib29sZWFuIHtcbiAgICBsZXQgcmV0VmFsID0gZmFsc2U7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBlbnRpdHkpIHtcbiAgICAgIGlmIChlbnRpdHkuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgdGhpcy5maWxlcy5pc0ltYWdlRmlsZShlbnRpdHlbcHJvcF0pKSB7XG4gICAgICAgIHJldFZhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3JFYWNoKHN1ZmZpeHMsIHN1ZmZpeCA9PiB7XG4gICAgICAgIGlmIChzdWZmaXgpIHtcbiAgICAgICAgICBsZXQgb2JqZWN0ID0gZ2V0KGVudGl0eSwgcHJvcCArIHN1ZmZpeCk7XG4gICAgICAgICAgaWYgKGlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICAgICAgLy8gZm9yIG11bHRpcGhvdG8gZmllbGQsIHZhbHVlIGlzIGFuIGFycmF5O1xuICAgICAgICAgICAgbGV0IGV4dHJhRGF0YVN1ZmZpeCA9ICcuZXh0cmFEYXRhJztcbiAgICAgICAgICAgIGxldCBleHRyYURhdGEgPSBnZXQoZW50aXR5LCBwcm9wICsgZXh0cmFEYXRhU3VmZml4KTtcbiAgICAgICAgICAgIG9iamVjdC5mb3JFYWNoKCh2LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5maWxlcy5pc0ltYWdlRmlsZSh2KSkge1xuICAgICAgICAgICAgICAgIHJldFZhbCA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGV4dHJhRGF0YSAmJiBleHRyYURhdGFbaW5kZXhdICYmIGV4dHJhRGF0YVtpbmRleF0uZWRpdCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbGVzLmlzSW1hZ2VGaWxlKGV4dHJhRGF0YVtpbmRleF0uZWRpdCkpIHtcbiAgICAgICAgICAgICAgICAgIHJldFZhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsZXMuaXNJbWFnZUZpbGUoZ2V0KGVudGl0eSwgcHJvcCArIHN1ZmZpeCkpKSB7XG4gICAgICAgICAgICAgIHJldFZhbCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEZpbGVQcm9wZXJ0aWVzKGVudGl0eSwgc3VmZml4czogQXJyYXk8c3RyaW5nPiA9IFtdKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgbGV0IHJldFZhbCA9IFtdO1xuICAgIGZvciAobGV0IHByb3AgaW4gZW50aXR5KSB7XG4gICAgICBpZiAoZW50aXR5Lmhhc093blByb3BlcnR5KHByb3ApICYmIHRoaXMuZmlsZXMuaXNJbWFnZUZpbGUoZW50aXR5W3Byb3BdKSkge1xuICAgICAgICByZXRWYWwucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICAgIGZvckVhY2goc3VmZml4cywgc3VmZml4ID0+IHtcbiAgICAgICAgaWYgKHN1ZmZpeCkge1xuICAgICAgICAgIGxldCBvYmplY3RQYXRoID0gZ2V0KGVudGl0eSwgcHJvcCArIHN1ZmZpeCk7XG4gICAgICAgICAgLy8gZm9yIG11bHRpcGhvdG8gZmllbGQsIHZhbHVlIGlzIGFuIGFycmF5OyBhbmQgZm9yIHRvZG8gd2l0aCBsaW5rZWQgbXVsdGkgcGhvdG8gd2UgbmVlZCB0byBkbyBpdCB0b1xuICAgICAgICAgIGlmIChpc0FycmF5KG9iamVjdFBhdGgpKSB7XG4gICAgICAgICAgICBsZXQgZXh0cmFEYXRhU3VmZml4cyA9IFsnLmV4dHJhRGF0YScsICcudmFsdWUuZmllbGRFeHRyYSddO1xuICAgICAgICAgICAgZXh0cmFEYXRhU3VmZml4cy5mb3JFYWNoKGV4dHJhRGF0YVN1ZmZpeCA9PiB7XG4gICAgICAgICAgICAgIGxldCBleHRyYURhdGEgPSBnZXQoZW50aXR5LCBwcm9wICsgZXh0cmFEYXRhU3VmZml4KTtcbiAgICAgICAgICAgICAgb2JqZWN0UGF0aC5mb3JFYWNoKCh2LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbGVzLmlzSW1hZ2VGaWxlKHYpKSB7XG4gICAgICAgICAgICAgICAgICByZXRWYWwucHVzaChwcm9wICsgc3VmZml4ICsgJ1snICsgaW5kZXggKyAnXScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXh0cmFEYXRhICYmIGV4dHJhRGF0YVtpbmRleF0gJiYgZXh0cmFEYXRhW2luZGV4XS5lZGl0KSB7XG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWxlcy5pc0ltYWdlRmlsZShleHRyYURhdGFbaW5kZXhdLmVkaXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbC5wdXNoKHByb3AgKyBleHRyYURhdGFTdWZmaXggKyAnWycgKyBpbmRleCArICddJyArICcuZWRpdCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsZXMuaXNJbWFnZUZpbGUob2JqZWN0UGF0aCkpIHtcbiAgICAgICAgICAgICAgcmV0VmFsLnB1c2gocHJvcCArIHN1ZmZpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0VmFsID0gdW5pcShyZXRWYWwpO1xuICAgIHJldHVybiByZXRWYWw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0QW5kRW5kRGF0ZXModGltZXNjYWxlLCBlbmREYXRlPzogRGF0ZSB8IHN0cmluZywgYW1vdW50PzogbnVtYmVyLCBub3RzbGlkaW5nPzogYm9vbGVhbiwgcHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICBsZXQgbGFzdERhdGUgPSBlbmREYXRlIHx8IG5ldyBEYXRlKCk7XG4gIGFtb3VudCA9IGFtb3VudCB8fCA3O1xuICBsZXQgcGVyaW9kID0gJ2RheXMnO1xuICBsZXQgc3RhcnRvZiA9ICdkYXknO1xuICBzd2l0Y2ggKHRpbWVzY2FsZSkge1xuICAgIGNhc2UgJ2xhc3QzMGRheXMnOlxuICAgICAgYW1vdW50ID0gMzA7XG4gICAgICBwZXJpb2QgPSAnZGF5cyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsYXN0OTBkYXlzJzpcbiAgICAgIGFtb3VudCA9IDkwO1xuICAgICAgcGVyaW9kID0gJ2RheXMnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGFzdDM2NWRheXMnOlxuICAgICAgYW1vdW50ID0gMzY1O1xuICAgICAgcGVyaW9kID0gJ2RheXMnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGFzdHdlZWsnOlxuICAgICAgYW1vdW50ID0gMDtcbiAgICAgIHBlcmlvZCA9ICd3ZWVrcyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsYXN0bW9udGgnOlxuICAgICAgYW1vdW50ID0gMDtcbiAgICAgIHBlcmlvZCA9ICdtb250aHMnO1xuICAgICAgc3RhcnRvZiA9ICdtb250aCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsYXN0cXVhcnRlcic6XG4gICAgICBhbW91bnQgPSAyO1xuICAgICAgcGVyaW9kID0gJ21vbnRocyc7XG4gICAgICBzdGFydG9mID0gJ21vbnRoJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xhc3R5ZWFyJzpcbiAgICAgIGFtb3VudCA9IDA7XG4gICAgICBwZXJpb2QgPSAneWVhcnMnO1xuICAgICAgc3RhcnRvZiA9ICd5ZWFyJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xhc3Q3ZGF5cyc6XG4gICAgICBhbW91bnQgPSA3O1xuICAgICAgcGVyaW9kID0gJ2RheXMnO1xuICAgICAgc3RhcnRvZiA9ICdkYXknO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKG5vdHNsaWRpbmcpIHtcbiAgICAgICAgYW1vdW50ID0gYW1vdW50ID8gYW1vdW50IC0gMSA6IDA7XG4gICAgICAgIHBlcmlvZCA9IHRpbWVzY2FsZTtcbiAgICAgICAgc3RhcnRvZiA9IHRpbWVzY2FsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFtb3VudCA9IGFtb3VudCB8fCAxO1xuICAgICAgICBwZXJpb2QgPSB0aW1lc2NhbGU7XG4gICAgICAgIHN0YXJ0b2YgPSAnZGF5JztcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gIH1cblxuICBsZXQgZGF0ZUZyb20gPSBzdGFydE9mKGRhdGVBZGQodXRjKHRvRGF0ZShsYXN0RGF0ZSkpLCBwZXJpb2QsIC1hbW91bnQpLCBzdGFydG9mKTtcbiAgbGV0IGRhdGVUbyA9IHRvRGF0ZShsYXN0RGF0ZSk7XG5cbiAgaWYgKHByZXZpb3VzKSB7XG4gICAgZGF0ZUZyb20gPSBkYXRlQWRkKGRhdGVGcm9tLCBwZXJpb2QsIC1hbW91bnQpO1xuICAgIGRhdGVUbyA9IGRhdGVBZGQoZGF0ZVRvLCBwZXJpb2QsIC1hbW91bnQpO1xuICB9XG5cbiAgLy91c2UgLnV0YygpIHRvIGdldCB0aGUgc3RhcnRPZiB3aXRoIG5vIG9mZnNldCBpc3N1ZXNcbiAgcmV0dXJuIFtkYXRlRnJvbS50b0lTT1N0cmluZygpLCBkYXRlVG8udG9JU09TdHJpbmcoKV07XG59XG4iXX0=