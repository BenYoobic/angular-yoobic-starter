/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class Broker {
    /**
     * @param {?} rq
     * @param {?} box
     * @param {?} googlemaps
     * @param {?} workplace
     * @param {?} session
     * @param {?} files
     * @param {?} promise
     * @param {?} coreConfig
     * @param {?} log
     * @param {?} network
     * @param {?} transfer
     * @param {?} localForage
     * @param {?} config
     * @param {?} injector
     * @param {?} cache
     * @param {?} geoloc
     * @param {?} translate
     * @param {?} unsplash
     */
    constructor(rq, box, googlemaps, workplace, session, files, promise, coreConfig, log, network, transfer, localForage, config, injector, cache, geoloc, translate, unsplash) {
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
    init() { }
    /**
     * @return {?}
     */
    getApiUrl() {
        return this.config.apiUrl;
    }
    /**
     * @return {?}
     */
    getServerUrl() {
        return this.config.serverUrl;
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    getCollectionName(collectionName) {
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            return 'custommodelinstances';
        }
        return collectionName;
    }
    /**
     * @param {?} collectionName
     * @param {?} id
     * @param {?=} fields
     * @param {?=} include
     * @param {?=} idAttributeName
     * @return {?}
     */
    getById(collectionName, id, fields, include, idAttributeName) {
        /** @type {?} */
        let query = this.getQuery(collectionName, fields, include);
        delete query.limit;
        delete query.skip;
        delete query.order;
        delete query.subQuery;
        if (this.network.isOffline()) {
            return from(this.cache.getByIdFromDatabaseCollection(collectionName, id, idAttributeName));
        }
        else if (!idAttributeName || idAttributeName === '_id') {
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + id + '?filter=' + encodeURIComponent(JSON.stringify(query));
            return this.rq.get(url);
        }
        else {
            /** @type {?} */
            let filters = [[{ field: idAttributeName, operator: { _id: 'eq' }, value: id }]];
            return this.getAll(collectionName, fields, include, null, filters).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                if (res.data && res.data.length > 0) {
                    return res.data[0];
                }
                return null;
            })));
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    create(collectionName, entity) {
        /** @type {?} */
        let url = this.config.apiUrl + this.getCollectionName(collectionName);
        this.updateCustomModel(collectionName, entity);
        if (this.network.isOffline()) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else {
            return this.rq.post(url, entity);
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    update(collectionName, entity) {
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else if (collectionName === 'groups') {
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName);
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
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} fields
     * @return {?}
     */
    save(collectionName, entity, fields) {
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity));
        }
        else {
            return this.upsert(collectionName, entity).pipe(mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            res => this.getById(collectionName, res._id, fields))));
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    patch(collectionName, entity) {
        if (!entity || !entity._id) {
            throw new Error('Cant patch an empty entity or an entity without an id');
        }
        this.updateCustomModel(collectionName, entity);
        if (this.network.isOffline() || this.isOfflineEntity(entity)) {
            return from(this.cache.upsertInDatabaseCollection(collectionName, entity, true));
        }
        else {
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + entity._id;
            return this.rq.patch(url, entity);
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @param {?=} previousEntity
     * @param {?=} skipAcl
     * @return {?}
     */
    upsert(collectionName, entity, previousEntity, skipAcl) {
        if (!skipAcl) {
            this.setAcl(entity, ((/** @type {?} */ (entity))).group, false, collectionName);
        }
        this.incrementTags(collectionName, entity).subscribe((/**
         * @return {?}
         */
        () => { }));
        /** @type {?} */
        let suffixs = collectionName === 'missiondatas' ? ['.value', '.edit', '.value.fieldValue'] : ['._downloadURL', '.edit'];
        /** @type {?} */
        let hasFiles = this._hasFiles(entity, suffixs);
        if (this.network.isOffline() || !hasFiles) {
            return this.update(collectionName, entity);
        }
        else {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                this.uploadEntityFiles(entity, suffixs).then((/**
                 * @return {?}
                 */
                () => {
                    this.update(collectionName, entity).subscribe((/**
                     * @param {?} ret
                     * @return {?}
                     */
                    ret => {
                        if (ret._downloadURL && this.files.isDocument(ret._downloadURL)) {
                            this.box.upload(ret._downloadURL).subscribe((/**
                             * @param {?} boxId
                             * @return {?}
                             */
                            boxId => {
                                if (boxId) {
                                    ret.boxId = boxId;
                                }
                                this.update(collectionName, ret).subscribe((/**
                                 * @param {?} retval
                                 * @return {?}
                                 */
                                retval => {
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
                err => { }));
            }));
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entities
     * @return {?}
     */
    upsertAll(collectionName, entities) {
        /** @type {?} */
        let obs = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        entity => this.upsert(collectionName, entity)));
        return forkJoin(obs);
    }
    /**
     * @param {?} entity
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @param {?=} promisesOnly
     * @param {?=} totalOffset
     * @return {?}
     */
    uploadEntityFiles(entity, suffixs = [], progressEmitter, tags, promisesOnly = false, totalOffset = 0) {
        /** @type {?} */
        let properties = this._getFileProperties(entity, suffixs);
        /** @type {?} */
        let count = 0;
        /** @type {?} */
        let promises = properties.map((/**
         * @param {?} prop
         * @return {?}
         */
        prop => {
            /** @type {?} */
            let promise;
            /** @type {?} */
            let file = get(entity, prop);
            promise = ((/**
             * @param {?} offsetIndex
             * @param {?} total
             * @return {?}
             */
            (offsetIndex, total) => {
                return (/**
                 * @return {?}
                 */
                () => this.prepareUpload(file)
                    .then((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => {
                    return this.upload(f, progressEmitter, offsetIndex, total, tags, totalOffset);
                }))
                    .then((/**
                 * @param {?} url
                 * @return {?}
                 */
                url => {
                    set(entity, prop, url);
                }))
                    .catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => Promise.reject(err))));
            }))(count, properties.length);
            count += 1;
            return promise;
        }));
        if (promisesOnly) {
            return promises.length > 0 ? promises : (/** @type {?} */ ([(/**
                 * @return {?}
                 */
                () => Promise.resolve('empty'))]));
        }
        return this.promise.sequential(promises);
    }
    /**
     * @param {?} entities
     * @param {?=} suffixs
     * @param {?=} progressEmitter
     * @param {?=} tags
     * @return {?}
     */
    uploadEntitiesFiles(entities, suffixs = [], progressEmitter, tags) {
        /** @type {?} */
        let promises = entities.map((/**
         * @param {?} entity
         * @return {?}
         */
        entity => {
            return (/**
             * @return {?}
             */
            () => this.uploadEntityFiles(entity, suffixs, progressEmitter, tags, false));
        }));
        return this.promise.sequential(promises);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    prepareUpload(file) {
        return this.files._requestExternalStoragePermission().then((/**
         * @return {?}
         */
        () => {
            if (this.files.isBase64(file)) {
                return Promise.resolve(this.files.b64toBlob(file));
            }
            else if (this.files.isFileUri(file)) {
                return this.files.resolveFilePath((/** @type {?} */ (file)));
            }
            else {
                return Promise.resolve(file);
            }
        }));
    }
    /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?} entity
     * @return {?}
     */
    updateAll(collectionName, query, entity) {
        /** @type {?} */
        let rawQuery = assign({}, query.where);
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        if (entity.group) {
            entity['_acl.groups.r'] = entity.group;
        }
        /** @type {?} */
        let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/update?where=' + encodeURIComponent(JSON.stringify(rawQuery));
        return this.rq.post(url, entity);
    }
    /**
     * @param {?} entity
     * @param {?=} group
     * @param {?=} addWrite
     * @param {?=} collectionName
     * @param {?=} users
     * @return {?}
     */
    setAcl(entity, group, addWrite = false, collectionName, users) {
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
    }
    /**
     * @return {?}
     */
    getCurrentGroups() {
        if (this.session.roles.indexOf('admin') < 0) {
            return this.session.groups;
        }
        else {
            return ['debug_v2'];
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    updateCustomModel(collectionName, entity) {
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
        if (model && model.isCustom) {
            entity._modelName = collectionName;
            if (entity.location && entity.location._id) {
                entity.locationRef = entity.location._id;
            }
        }
    }
    /**
     * @param {?} file
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @param {?=} tags
     * @param {?=} totalOffset
     * @return {?}
     */
    upload(file, progressEmitter, offsetIndex = 0, total = 1, tags = [], totalOffset = 0) {
        tags = concat([this.session.userId], tags);
        //check for file created from base64 if we can send them through cordova transfert plugin.
        if (this.coreConfig.isCordova() && file.nativeURL) {
            /** @type {?} */
            let fileTransfer = this.transfer.create();
            if (progressEmitter) {
                fileTransfer.onProgress((/**
                 * @param {?} ev
                 * @return {?}
                 */
                ev => {
                    if (ev.lengthComputable) {
                        /** @type {?} */
                        let percentage = ((ev.loaded / ev.total) * 100) / (total + totalOffset) + (offsetIndex * 100) / (total + totalOffset);
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
            (result) => {
                /** @type {?} */
                let retVal = JSON.parse(result.response);
                return this.files.getCloudinaryUrl(retVal);
            }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                /** @type {?} */
                let fileError = err && err.message ? err.message : 'File Error';
                return Promise.reject(fileError);
            }));
        }
        else {
            /** @type {?} */
            let fileUploader = this.getFileUploader(null);
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                fileUploader.onBuildItemForm = (/**
                 * @param {?} fileItem
                 * @param {?} form
                 * @return {?}
                 */
                (fileItem, form) => {
                    form.append('tags', JSON.stringify(tags));
                });
                fileUploader.onCompleteItem = (/**
                 * @param {?} item
                 * @param {?} response
                 * @param {?} status
                 * @param {?} headers
                 * @return {?}
                 */
                (item, response, status, headers) => {
                    this.log.log('upload finish');
                    fileUploader.clearQueue();
                    if (status === 200) {
                        /** @type {?} */
                        let retVal = JSON.parse(response);
                        resolve(this.files.getCloudinaryUrl(retVal));
                    }
                    else {
                        reject(response ? JSON.parse(response) : 'error');
                    }
                });
                if (progressEmitter) {
                    fileUploader.onProgressItem = (/**
                     * @param {?} item
                     * @param {?} progress
                     * @return {?}
                     */
                    (item, progress) => {
                        /** @type {?} */
                        let percentage = progress / (total + totalOffset) + (offsetIndex * 100) / (total + totalOffset);
                        progressEmitter.next(percentage);
                    });
                }
                fileUploader.addToQueue([file]);
                fileUploader.queue[0].alias = 'undefined';
                //fileItem.alias = 'undefined';
                this.log.log('upload begin');
                fileUploader.uploadAll();
            }));
        }
    }
    /**
     * @param {?} data
     * @param {?=} progressEmitter
     * @param {?=} offsetIndex
     * @param {?=} total
     * @return {?}
     */
    uploadData(data, progressEmitter, offsetIndex = 0, total = 1) {
        /** @type {?} */
        let file = this.files.b64toBlob(data);
        return this.upload(file, progressEmitter, offsetIndex, total);
    }
    /**
     * @param {?} collectionName
     * @param {?} entity
     * @return {?}
     */
    incrementTags(collectionName, entity) {
        if (entity.tags && entity.tags.length > 0) {
            entity.tags = uniq(compact([].concat(entity.tags)));
            if (entity.tags.length > 0 && !this.network.isOffline()) {
                /** @type {?} */
                let url = this.config.apiUrl + 'tags/incrementTags';
                return this.rq.post(url, {
                    params: {
                        collectionName: Models.fixCollectionName(collectionName),
                        tags: entity.tags,
                        groups: [].concat(entity.group || entity._acl.groups.r),
                        entity
                    }
                });
            }
        }
        return of(null);
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    updateTags(collectionName) {
        /** @type {?} */
        let url = this.config.apiUrl + 'tags/updateTags';
        return this.rq.post(url, { params: { collection: collectionName } });
    }
    /**
     * @return {?}
     */
    createAllTags() {
        /** @type {?} */
        let url = this.config.apiUrl + 'businessLogic/createAllTags';
        return this.rq.post(url, { params: {} });
    }
    /**
     * @param {?} collectionName
     * @param {?} id
     * @return {?}
     */
    delete(collectionName, id) {
        if (this.isOfflineId(id)) {
            return from(this.cache.removeFromDatabaseCollection(collectionName, id));
        }
        else {
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/' + encodeURIComponent(id);
            return this.rq.delete(url);
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    deleteAll(collectionName, query) {
        /** @type {?} */
        let url = this.config.apiUrl + this.getCollectionName(collectionName);
        /** @type {?} */
        let rawQuery = assign({}, query.where || { _id: { exists: true } });
        if (query.subQuery) {
            rawQuery.__options = { subQuery: query.subQuery };
        }
        return this.rq.delete(url, rawQuery);
    }
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
    getQuery(collectionName, fields, include, search, filters, sorts, skip = 0, limit = 20, subQuery = null, customFilter = null) {
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
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
                    f => {
                        f.push({ field: '_modelName', operator: { _id: 'eq' }, value: model.collectionName });
                    }));
                }
            }
        }
        /** @type {?} */
        let query = {};
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
            s => isString(s) || (s.colId && s.sort))).map((/**
             * @param {?} s
             * @return {?}
             */
            s => (isString(s) ? s : s.colId + ' ' + (s.sort ? s.sort.toUpperCase() : 'ASC'))));
        }
        else if (sorts && sorts.length === 0) {
            query.order = [];
        }
        else {
            query.order = ['_lmt DESC'];
        }
        /** @type {?} */
        let searchWhere = null;
        /** @type {?} */
        let filterWhere = null;
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
        let filterSubquery = Models.exportSubQuery(collectionName, filters);
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
    }
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} subQuery
     * @param {?=} customFilter
     * @param {?=} noOffline
     * @return {?}
     */
    getCount(collectionName, search, filters, subQuery = null, customFilter = null, noOffline = false) {
        if (this.network.isOffline()) {
            return this.getAllOffline(collectionName, false, search, filters, null, null, null, customFilter, false).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            ret => {
                return { count: ret.count, data: [] };
            })));
        }
        else {
            /** @type {?} */
            let query = this.getQuery(collectionName, null, null, search, filters, null, null, null, subQuery, customFilter);
            /** @type {?} */
            let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/count';
            //?where=' + encodeURIComponent(JSON.stringify(query.where || {}));
            /** @type {?} */
            let finalQuery = {};
            if (query.where) {
                finalQuery.where = query.where;
            }
            if (query.subQuery) {
                finalQuery.subQuery = query.subQuery;
            }
            /** @type {?} */
            let finalRes;
            return this.rq
                .post(url, finalQuery)
                .pipe(mergeMap((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                finalRes = res;
                if (noOffline) {
                    return of([]);
                }
                else {
                    return from(this.getAllOffline(collectionName, true, search, filters, null, null, null, customFilter));
                }
            })))
                .pipe(map((/**
             * @param {?} offlineRes
             * @return {?}
             */
            offlineRes => {
                /** @type {?} */
                let count = finalRes || 0;
                if (offlineRes && offlineRes.count > 0) {
                    count += offlineRes.count;
                }
                return { count: count, data: [] };
            })));
        }
    }
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
    getAll(collectionName, fields, include, search, filters, sorts, skip = 0, limit = 20, tag = false, subQuery = null, customFilter = null, cacheId = null, looseCount = null, noCount = false, noOffline = false) {
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
            let query = this.getQuery(collectionName, fields, include, search, filters, sorts, skip, limit, subQuery, customFilter);
            if (collectionName.indexOf('_store') >= 0) {
                return this.getAllOperation(collectionName, query);
            }
            /** @type {?} */
            let obs;
            if (this.network.isOffline()) {
                if (cacheId) {
                    obs = from(this.localForage.get(cacheId)).pipe(map((/**
                     * @param {?} res
                     * @return {?}
                     */
                    res => {
                        return res || (noCount ? [] : { count: 0, data: [] });
                    })));
                }
                else {
                    obs = this.getAllOffline(collectionName, false, search, filters, sorts, skip, limit, customFilter, noCount);
                }
            }
            else {
                /** @type {?} */
                let finalRes;
                obs = this.getAllQuery(collectionName, query, looseCount, noCount)
                    .pipe(mergeMap((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => {
                    finalRes = res;
                    if (cacheId) {
                        this.localForage.set(cacheId, res);
                    }
                    if (noOffline) {
                        return of([]);
                    }
                    else {
                        return from(this.getAllOffline(collectionName, true, search, filters, sorts, skip, limit, customFilter, noCount));
                    }
                })))
                    .pipe(map((/**
                 * @param {?} offlineRes
                 * @return {?}
                 */
                (offlineRes) => {
                    if (noCount) {
                        finalRes = [...(offlineRes || []), ...(finalRes || [])];
                    }
                    else {
                        finalRes.data = [...(offlineRes.data || []), ...(finalRes.data || [])];
                    }
                    return finalRes;
                })));
            }
            return obs;
        }
    }
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @param {?=} filters
     * @param {?=} skip
     * @param {?=} limit
     * @param {?=} useTagsCollection
     * @return {?}
     */
    getAllTags(collectionName, search, filters, skip = 0, limit = 20, useTagsCollection = false) {
        filters = filters || [[]];
        //fix for "MongoError","message":"$geoNear, $near, and $nearSphere are not allowed in this context"
        if (collectionName === 'locations') {
            filters = filters.map((/**
             * @param {?} ff
             * @return {?}
             */
            ff => {
                return ff.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.field !== '_geoloc'));
            }));
        }
        if (this.network.isOffline()) {
            return this.getAllTagsOffline({ collectionName, search, filters });
        }
        else if (useTagsCollection) {
            //this is not used anymore
            /** @type {?} */
            let aggregateOptions = [{ $match: { collectionName: Models.fixCollectionName(collectionName) } }, { $group: { _id: '$tag', count: { $max: '$count' } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }, { $group: { _id: 1, total: { $sum: 1 }, data: { $push: '$$ROOT' } } }, { $project: { count: '$total', data: { $slice: ['$data', skip, skip + limit] } } }];
            return this.aggregateQuery('tags', filters, aggregateOptions, search).pipe(map((/**
             * @param {?} res
             * @return {?}
             */
            (res) => (res && res.length > 0 ? { data: res[0].data, count: res[0].count } : { data: [], count: 0 }))));
        }
        else {
            /** @type {?} */
            let aggregateOptions = [{ $unwind: '$tags' }];
            if (search) {
                aggregateOptions.push({
                    $match: { tags: { $regex: search.replace(/([^a-z0-9]+)/gi, ''), $options: 'i' } }
                });
            }
            aggregateOptions = aggregateOptions.concat([{ $group: { _id: '$tags', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }, ...(skip > 0 ? [{ $skip: skip }] : []), ...(limit > 0 ? [{ $limit: limit }] : [])]);
            return this.aggregateQuery(collectionName, filters, aggregateOptions).pipe(map((/**
             * @param {?=} res
             * @return {?}
             */
            (res = []) => ({ data: res, count: res.length }))));
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    getAllTagsOffline(config) {
        return this.getAllOffline(config.collectionName, false, config.search, config.filters, null, null, null, null, true).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            /** @type {?} */
            let data = [];
            /** @type {?} */
            let count = {};
            if (res && res.length > 0) {
                res.forEach((/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    if (t.tags) {
                        [].concat(t.tags).forEach((/**
                         * @param {?} tag
                         * @return {?}
                         */
                        tag => {
                            count[tag] = count[tag] > 0 ? count[tag] + 1 : 1;
                        }));
                    }
                }));
                keys(count).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => {
                    data.push({ _id: key, tag: key, count: count[key] });
                }));
                data = orderBy(data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => -d.count));
            }
            return { data, count: data.length, config };
        })));
    }
    /**
     * @param {?} config
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    getMultipleAllTags(config, skip = 0, limit = 20) {
        if (this.network.isOffline()) {
            /** @type {?} */
            let obs = config.map((/**
             * @param {?} c
             * @return {?}
             */
            c => this.getAllTagsOffline(c)));
            return combineLatest(obs).pipe(map((/**
             * @param {?} ret
             * @return {?}
             */
            ret => {
                return ret;
            })));
        }
        else {
            /** @type {?} */
            let aggregateOptions = [{ $unwind: '$tags' }, { $group: { _id: '$tags', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $project: { _id: 1, tag: '$_id', count: 1 } }, ...(skip > 0 ? [{ $skip: skip }] : []), ...(limit > 0 ? [{ $limit: limit }] : [])];
            /** @type {?} */
            let queries = config.map((/**
             * @param {?} conf
             * @return {?}
             */
            conf => {
                /** @type {?} */
                let filters = conf.filters || [];
                if (conf.collectionName === 'locations') {
                    filters = filters.map((/**
                     * @param {?} ff
                     * @return {?}
                     */
                    ff => {
                        return ff.filter((/**
                         * @param {?} f
                         * @return {?}
                         */
                        f => f.field !== '_geoloc'));
                    }));
                }
                return this.getAggregateQuery(conf.collectionName, filters, aggregateOptions, conf.search, null, null, null, conf.subQuery);
            }));
            return this.aggregateQueries(queries).pipe(map((/**
             * @param {?} rets
             * @return {?}
             */
            rets => {
                /** @type {?} */
                let retVal = rets.map((/**
                 * @param {?} res
                 * @param {?} i
                 * @return {?}
                 */
                (res, i) => ({ data: res, count: res.length, config: config[i] })));
                return retVal;
            })));
        }
    }
    /**
     * @param {?} collectionName
     * @param {?} query
     * @param {?=} looseCount
     * @param {?=} noCount
     * @return {?}
     */
    getAllQuery(collectionName, query, looseCount, noCount) {
        /** @type {?} */
        let url = this.config.apiUrl + this.getCollectionName(collectionName) + '/find';
        return this.rq.post(url, { filter: query }, null, !noCount, false, looseCount);
        //let url = this.config.apiUrl + collectionName + '?filter=' + encodeURIComponent(JSON.stringify(query));
        //return this.rq.get(url, true);
    }
    /**
     * @param {?=} search
     * @return {?}
     */
    getAllGoogleMaps(search) {
        if (search) {
            return this.googlemaps.placePredictionsLocationObserver(search).pipe(map((/**
             * @param {?} predictions
             * @return {?}
             */
            predictions => {
                /** @type {?} */
                let details = flatten(predictions).filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => d.geometry && d.geometry.location));
                return {
                    count: details.length,
                    data: details.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => {
                        /** @type {?} */
                        let position = new Position(d.geometry.location);
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
            addresses => {
                return { count: addresses.length, data: addresses };
            })));
        }
    }
    /**
     * @param {?=} search
     * @param {?=} skip
     * @param {?=} limit
     * @return {?}
     */
    getAllUnsplash(search, skip, limit) {
        return this.unsplash.getAll(search, skip, limit);
    }
    /**
     * @param {?} collectionName
     * @param {?=} search
     * @return {?}
     */
    getAllWorkplace(collectionName, search) {
        /** @type {?} */
        let graphEntity = collectionName.replace('workplace_', '');
        switch (graphEntity) {
            case 'groups':
                return (/** @type {?} */ (this.workplace.getAllGroups()));
        }
        return of({ count: 0, data: [] });
    }
    /**
     * @param {?} collectionName
     * @param {?} query
     * @return {?}
     */
    getAllOperation(collectionName, query) {
        /** @type {?} */
        let url = this.config.apiUrl + 'Operation/findDocument';
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
        res => {
            if (res.data && res.data.map) {
                res.data = res.data; //.map(r => r.doc);
            }
            return res;
        })));
    }
    /**
     * @param {?=} lastSync
     * @param {?=} progressEvent
     * @return {?}
     */
    syncDatabase(lastSync, progressEvent) {
        /** @type {?} */
        let collections = this.coreConfig.getSyncedCollections();
        if (collections && collections.length > 0) {
            this.log.log('Syncing Database - Start');
            /** @type {?} */
            let promises = collections.map((/**
             * @param {?} entry
             * @param {?} i
             * @return {?}
             */
            (entry, i) => {
                return (/**
                 * @return {?}
                 */
                () => {
                    if (entry.max <= 0) {
                        return;
                    }
                    this.log.log('Syncing Database - Syncing ' + entry.name);
                    return this.cache.getDatabaseCollection(entry.name).then((/**
                     * @param {?} data
                     * @return {?}
                     */
                    data => {
                        /** @type {?} */
                        let filters = cloneDeep(entry.filters || [[]]);
                        filters.forEach((/**
                         * @param {?} fs
                         * @return {?}
                         */
                        fs => fs.forEach((/**
                         * @param {?} f
                         * @return {?}
                         */
                        f => {
                            if (f.value && isArray(f.value) && f.value.indexOf('currentLanguage') >= 0) {
                                f.value[f.value.indexOf('currentLanguage')] = this.translate.getCurrentLanguage();
                            }
                        }))));
                        if (lastSync && data.length > 0) {
                            // && ) {
                            filters.forEach((/**
                             * @param {?} f
                             * @return {?}
                             */
                            f => f.push({ field: '_lmt', operator: { _id: 'gte' }, value: lastSync })));
                        }
                        return (this.getAll(entry.name, entry.fields, null, null, filters, null, 0, Math.min(entry.max || 1000, 1000), null, null, null, null, null, null, true)
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
                        ret => {
                            if (progressEvent) {
                                progressEvent.emit((i / collections.length) * 100);
                            }
                            if (ret && ret.data) {
                                /** @type {?} */
                                let filePromises = [Promise.resolve(null)];
                                /** @type {?} */
                                let deletedKeys;
                                if (lastSync) {
                                    filePromises = [
                                        this.getDeletedEntities(entry.name, data)
                                            .toPromise()
                                            .then((/**
                                         * @param {?} deletedkeys
                                         * @return {?}
                                         */
                                        (deletedkeys) => {
                                            deletedKeys = deletedkeys;
                                        }))
                                    ];
                                }
                                if (entry.addToCache && entry.addToCache.length > 0) {
                                    entry.addToCache.forEach((/**
                                     * @param {?} key
                                     * @return {?}
                                     */
                                    key => {
                                        ret.data.forEach((/**
                                         * @param {?} item
                                         * @return {?}
                                         */
                                        item => {
                                            if (item[key]) {
                                                filePromises.push((/**
                                                 * @return {?}
                                                 */
                                                () => cacheFile(item[key])));
                                            }
                                        }));
                                    }));
                                }
                                return Promise.all(filePromises).then((/**
                                 * @return {?}
                                 */
                                () => {
                                    return this.cache.updateDatabaseCollection(entry.name, ret.data, '_id', deletedKeys);
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
            ret => {
                if (progressEvent) {
                    progressEvent.emit(100);
                }
                return ret;
            }));
        }
        return Promise.resolve(null);
    }
    /**
     * @return {?}
     */
    clearDatabase() {
        /** @type {?} */
        let collections = this.coreConfig.getSyncedCollections();
        if (collections && collections.length > 0) {
            /** @type {?} */
            let promises = collections.map((/**
             * @param {?} entry
             * @return {?}
             */
            entry => {
                return (/**
                 * @return {?}
                 */
                () => this.cache.clearDatabaseCollection(entry.name));
            }));
            return this.promise.sequential(promises);
        }
        return Promise.resolve(null);
    }
    /**
     * @param {?} collectionName
     * @param {?} data
     * @return {?}
     */
    getDeletedEntities(collectionName, data) {
        data = data || [];
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getDeletedIds';
        /** @type {?} */
        let modelName = Models.fixCollectionName(collectionName, true);
        return this.rq.post(url, { modelName, ids: data.map((/**
             * @param {?} e
             * @return {?}
             */
            e => e._id)) }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal) {
                return retVal || [];
            }
            return [];
        })));
    }
    /**
     * @return {?}
     */
    getOfflineEntitiesCount() {
        return this.uploadDatabaseOrGetCount(true);
    }
    /**
     * @param {?=} progressEmitter
     * @return {?}
     */
    uploadDatabase(progressEmitter) {
        return this.uploadDatabaseOrGetCount(false, progressEmitter);
    }
    /**
     * @param {?} returnCount
     * @param {?=} progressEmitter
     * @return {?}
     */
    uploadDatabaseOrGetCount(returnCount, progressEmitter) {
        /** @type {?} */
        let total = 0;
        /** @type {?} */
        let count = 0;
        /** @type {?} */
        let offlineData = {};
        if (!this.isUploadingDatabase || this.network.isOffline()) {
            this.isUploadingDatabase = true;
            /** @type {?} */
            let collections = this.coreConfig.getSyncedCollections();
            return this.cache.getDatabaseCollection('custommodels').then((/**
             * @param {?} custommodels
             * @return {?}
             */
            custommodels => {
                if (collections && collections.length > 0) {
                    collections = cloneDeep(collections);
                    collections = collections.concat(custommodels.map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => ({ name: c.name }))));
                    /** @type {?} */
                    let promisesCount = collections.map((/**
                     * @param {?} entry
                     * @return {?}
                     */
                    entry => {
                        return (/**
                         * @return {?}
                         */
                        () => this.cache.getDatabaseCollection(entry.name).then((/**
                         * @param {?} data
                         * @return {?}
                         */
                        data => {
                            data = data.filter((/**
                             * @param {?} e
                             * @return {?}
                             */
                            e => this.isOfflineEntity(e) && ((/** @type {?} */ (e))).status !== 'draft'));
                            offlineData[entry.name] = data;
                            total += data.length;
                        })));
                    }));
                    return this.promise.sequential(promisesCount).then((/**
                     * @return {?}
                     */
                    () => {
                        if (returnCount) {
                            this.isUploadingDatabase = false;
                            return total;
                        }
                        else {
                            this.log.log('uploadDatabase', 'total', total);
                            if (progressEmitter) {
                                progressEmitter.emit(total > 0 ? (count / total) * 100 : 0);
                            }
                            /** @type {?} */
                            let promises = [];
                            if (total > 0) {
                                collections.forEach((/**
                                 * @param {?} entry
                                 * @return {?}
                                 */
                                entry => {
                                    /** @type {?} */
                                    let data = offlineData[entry.name];
                                    data.forEach((/**
                                     * @param {?} entity
                                     * @return {?}
                                     */
                                    entity => {
                                        promises.push((/**
                                         * @return {?}
                                         */
                                        () => {
                                            /** @type {?} */
                                            let offlineId = entity._id;
                                            entity = Object.assign({}, entity);
                                            delete entity._id;
                                            return this.upsert(entry.name, entity)
                                                .toPromise()
                                                .then((/**
                                             * @param {?} retVal
                                             * @return {?}
                                             */
                                            retVal => {
                                                count += 1;
                                                if (progressEmitter) {
                                                    progressEmitter.emit((count / total) * 100);
                                                }
                                                this.log.log('uploadDatabase', 'count', count);
                                                return this.cache.replaceFromDatabaseCollection(entry.name, offlineId, retVal);
                                            }));
                                        }));
                                    }));
                                }));
                            }
                            return this.promise.sequential(promises).then((/**
                             * @return {?}
                             */
                            () => {
                                setTimeout((/**
                                 * @return {?}
                                 */
                                () => {
                                    if (progressEmitter) {
                                        progressEmitter.emit(100);
                                    }
                                }), 300);
                                this.isUploadingDatabase = false;
                                return total;
                            }));
                        }
                    }));
                }
            }));
        }
        return Promise.resolve(returnCount ? 0 : null);
    }
    /**
     * @param {?} entity
     * @return {?}
     */
    isOfflineEntity(entity) {
        return entity && entity._id && this.isOfflineId(entity._id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    isOfflineId(id) {
        return id && id.startsWith && id.startsWith(Cache.OFFLINE_PREFIX);
    }
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
    getAllOffline(collectionName, offlineOnly, search, filters, sorts, skip = 0, limit = 20, customFilter = null, noCount = false) {
        return from(this.cache.getDatabaseCollection(collectionName).then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            let model = Models.getModelByCollectionName(collectionName);
            if (offlineOnly) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.isOfflineEntity(d)));
            }
            if (filters && filters.length > 0) {
                /** @type {?} */
                let newData = [];
                filters.forEach((/**
                 * @param {?} fs
                 * @return {?}
                 */
                fs => {
                    /** @type {?} */
                    let subData = [...data];
                    fs.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => f.removeFromOffline !== true)).forEach((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => {
                        subData = subData.filter((/**
                         * @param {?} e
                         * @return {?}
                         */
                        e => {
                            /** @type {?} */
                            let value = isArray(f.value) && isObject(f.value[0]) ? lodashMap(f.value, '_id') : isArray(f.value) ? f.value : isObject(f.value) ? f.value._id : f.value;
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
                                        ((/** @type {?} */ (e))).distance = this.geoloc.getDistance(e[f.field][1], e[f.field][0], value[1], value[0]);
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
                    newData = [...newData, ...subData];
                }));
                data = uniqBy(newData, (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => e._id));
            }
            if (search && model && model.searchableFields) {
                data = data.filter((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => {
                    if (model.searchableFields.some((/**
                     * @param {?} name
                     * @return {?}
                     */
                    name => d[name] &&
                        d[name]
                            .toString()
                            .toUpperCase()
                            .indexOf(search.toUpperCase()) >= 0))) {
                        return true;
                    }
                    return false;
                }));
            }
            if (filters && filters.some((/**
             * @param {?} fs
             * @return {?}
             */
            fs => fs.some((/**
             * @param {?} f
             * @return {?}
             */
            f => f.operator._id === 'nearSphere'))))) {
                data = orderBy(data, ['distance']);
            }
            if (sorts) {
                data = orderBy(data, sorts.map((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => s.colId)), sorts.map((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => s.sort)));
            }
            /** @type {?} */
            let total = data.length;
            if (limit > 0) {
                skip = skip || 0;
                data = data.slice(skip, skip + limit);
            }
            return noCount ? data : { count: total, data: data };
        })));
    }
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
    aggregateQuery(collectionName, filters, aggregateOptions, search, excludedFields, includeCount = false, cacheId = null, customFilter, subQuery, aggregateOptionsOffline) {
        /** @type {?} */
        let obs;
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
                data => {
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
            let url = this.config.apiUrl + 'businesslogic/aggregateQuery';
            /** @type {?} */
            let query = this.getAggregateQuery(collectionName, filters, aggregateOptions, search, excludedFields, includeCount, customFilter, subQuery);
            obs = this.rq.post(url, { params: query }).pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            retVal => {
                if (cacheId) {
                    this.localForage.set(cacheId, retVal);
                }
                return retVal;
            })));
        }
        return obs.pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        (retVal) => {
            /** @type {?} */
            let data = [];
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
    }
    /**
     * @param {?} queries
     * @param {?=} includeCount
     * @param {?=} cacheId
     * @return {?}
     */
    aggregateQueries(queries, includeCount = false, cacheId = null) {
        /** @type {?} */
        let obs;
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
            let url = this.config.apiUrl + 'businesslogic/aggregateQueries';
            obs = this.rq.post(url, queries).pipe(map((/**
             * @param {?} retVal
             * @return {?}
             */
            (retVal) => {
                /** @type {?} */
                let finalArray = Array(queries.length);
                for (let i = 0; i < finalArray.length; i++) {
                    finalArray[i] = [];
                }
                if (retVal && retVal.data && retVal.data.some((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => isObject(d.doc)))) {
                    retVal.data.forEach((/**
                     * @param {?} d
                     * @return {?}
                     */
                    (d) => {
                        finalArray[d.index] = finalArray[d.index] || [];
                        finalArray[d.index].push(d.doc);
                    }));
                    retVal.data = finalArray;
                }
                else if (retVal && isArray(retVal.data) && retVal.data.length === 0) {
                    retVal.data = finalArray;
                }
                if (cacheId) {
                    this.localForage.set(cacheId, retVal);
                }
                return retVal;
            })));
        }
        return obs.pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        (retVal) => {
            /** @type {?} */
            let data = [];
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
    }
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
    getAggregateQuery(collectionName, filters, aggregateOptions, search, excludedFields, includeCount = false, customFilter, subQuery) {
        /** @type {?} */
        let match = {};
        /** @type {?} */
        let project = {};
        /** @type {?} */
        let filterWhere = null;
        /** @type {?} */
        let searchWhere = null;
        /** @type {?} */
        let defaultFields = [];
        /** @type {?} */
        let query = (/** @type {?} */ ({
            collectionName: Models.fixCollectionName(collectionName, true),
            includeCount
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
            (field, i) => {
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
    }
    /**
     * @param {?=} stages
     * @param {?=} groups
     * @param {?=} userIds
     * @return {?}
     */
    aggregateLogs(stages, groups, userIds) {
        /** @type {?} */
        let url = this.config.apiUrl + 'AdminDashboard/aggregateLogs';
        return this.rq.post(url, { stages, groups, userIds });
    }
    /**
     * @param {?} query
     * @param {?} collectionName
     * @return {?}
     */
    textSearch(query, collectionName) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/textSearch';
        return this.rq.post(url, { query, modelName: collectionName });
    }
    /**
     * @param {?} file
     * @param {?} group
     * @param {?=} hideMobile
     * @param {?=} fileName
     * @param {?=} tenantRef
     * @return {?}
     */
    createFile(file, group, hideMobile = true, fileName, tenantRef) {
        return this.upsert('files', {
            _downloadURL: file,
            _filename: file.name,
            group: group,
            hideMobile: hideMobile,
            mimeType: file.type,
            size: file.size,
            _tenantRef: tenantRef
        });
    }
    /**
     * @param {?=} fileTypes
     * @param {?=} maxFileSize
     * @return {?}
     */
    getFileUploader(fileTypes, maxFileSize) {
        /** @type {?} */
        let options = {
            maxFileSize: maxFileSize,
            url: this.config.uploadUrl
        };
        // if (fileTypes && fileTypes.length > 0) {
        //     options.allowedFileType = fileTypes;
        // }
        return new FileUploader(options);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    execute(params) {
        /** @type {?} */
        let url = this.config.apiUrl + 'Endpoints/execute';
        return this.rq.post(url, { params });
    }
    /**
     * @param {?} operationId
     * @return {?}
     */
    undoOperation(operationId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'operation/undoDelete';
        return this.rq.post(url, { operationId });
    }
    /**
     * @param {?} locations
     * @return {?}
     */
    getMarkers(locations) {
        return locations
            .filter((/**
         * @param {?} l
         * @return {?}
         */
        (l) => l._geoloc && l._geoloc.length > 1))
            .map((/**
         * @param {?} l
         * @return {?}
         */
        (l) => {
            return {
                _id: l._id,
                address: l.address,
                latitude: l._geoloc[1],
                longitude: l._geoloc[0],
                title: l.title,
                color: l.status === 'place' ? 'success' : l.status === 'file' ? 'info' : l.status === 'error' ? 'danger' : l.status === 'prediction' ? 'stable' : 'dark'
            };
        }));
    }
    /**
     * @param {?} id
     * @param {?} mode
     * @param {?=} customFilter
     * @return {?}
     */
    getUserOrLocationStat(id, mode, customFilter) {
        /** @type {?} */
        let value = (/** @type {?} */ ((isString(id) ? [{ _id: id }] : id)));
        /** @type {?} */
        let ref = mode === 'campaign' ? 'descriptionRef' : mode === 'location' ? 'locationRef' : 'ownerRef';
        /** @type {?} */
        let filters = [[{ field: ref, operator: { _id: 'inq' }, value: value }]];
        /** @type {?} */
        let options = [
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
        (stats) => {
            if (stats && stats.length > 0) {
                stats[0].available = (stats[0].count || 0) - (stats[0].finished || 0) - (stats[0].booked || 0) - (stats[0].archived || 0);
                stats[0].tobevalidated = (stats[0].finished || 0) - (stats[0].validated || 0) - (stats[0].rejected || 0);
            }
            return stats;
        })));
    }
    /**
     * @param {?} filters
     * @param {?} timescale
     * @param {?=} dateField
     * @param {?=} endDate
     * @param {?=} previous
     * @return {?}
     */
    setTimescale(filters, timescale, dateField = 'finishedDate', endDate, previous = false) {
        if (timescale) {
            filters = filters || [];
            filters.forEach((/**
             * @param {?} fs
             * @return {?}
             */
            fs => {
                fs = fs || [];
                remove(fs, (/**
                 * @param {?} f
                 * @return {?}
                 */
                (f) => f.field === dateField));
                fs.push({
                    field: dateField,
                    operator: { _id: 'between', interval: true },
                    value: getStartAndEndDates(timescale, endDate, undefined, undefined, previous)
                });
            }));
        }
    }
    /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    _hasFiles(entity, suffixs = []) {
        /** @type {?} */
        let retVal = false;
        for (let prop in entity) {
            if (entity.hasOwnProperty(prop) && this.files.isImageFile(entity[prop])) {
                retVal = true;
            }
            forEach(suffixs, (/**
             * @param {?} suffix
             * @return {?}
             */
            suffix => {
                if (suffix) {
                    /** @type {?} */
                    let object = get(entity, prop + suffix);
                    if (isArray(object)) {
                        // for multiphoto field, value is an array;
                        /** @type {?} */
                        let extraDataSuffix = '.extraData';
                        /** @type {?} */
                        let extraData = get(entity, prop + extraDataSuffix);
                        object.forEach((/**
                         * @param {?} v
                         * @param {?} index
                         * @return {?}
                         */
                        (v, index) => {
                            if (this.files.isImageFile(v)) {
                                retVal = true;
                            }
                            if (extraData && extraData[index] && extraData[index].edit) {
                                if (this.files.isImageFile(extraData[index].edit)) {
                                    retVal = true;
                                }
                            }
                        }));
                    }
                    else {
                        if (this.files.isImageFile(get(entity, prop + suffix))) {
                            retVal = true;
                        }
                    }
                }
            }));
        }
        return retVal;
    }
    /**
     * @private
     * @param {?} entity
     * @param {?=} suffixs
     * @return {?}
     */
    _getFileProperties(entity, suffixs = []) {
        /** @type {?} */
        let retVal = [];
        for (let prop in entity) {
            if (entity.hasOwnProperty(prop) && this.files.isImageFile(entity[prop])) {
                retVal.push(prop);
            }
            forEach(suffixs, (/**
             * @param {?} suffix
             * @return {?}
             */
            suffix => {
                if (suffix) {
                    /** @type {?} */
                    let objectPath = get(entity, prop + suffix);
                    // for multiphoto field, value is an array; and for todo with linked multi photo we need to do it to
                    if (isArray(objectPath)) {
                        /** @type {?} */
                        let extraDataSuffixs = ['.extraData', '.value.fieldExtra'];
                        extraDataSuffixs.forEach((/**
                         * @param {?} extraDataSuffix
                         * @return {?}
                         */
                        extraDataSuffix => {
                            /** @type {?} */
                            let extraData = get(entity, prop + extraDataSuffix);
                            objectPath.forEach((/**
                             * @param {?} v
                             * @param {?} index
                             * @return {?}
                             */
                            (v, index) => {
                                if (this.files.isImageFile(v)) {
                                    retVal.push(prop + suffix + '[' + index + ']');
                                }
                                if (extraData && extraData[index] && extraData[index].edit) {
                                    if (this.files.isImageFile(extraData[index].edit)) {
                                        retVal.push(prop + extraDataSuffix + '[' + index + ']' + '.edit');
                                    }
                                }
                            }));
                        }));
                    }
                    else {
                        if (this.files.isImageFile(objectPath)) {
                            retVal.push(prop + suffix);
                        }
                    }
                }
            }));
        }
        retVal = uniq(retVal);
        return retVal;
    }
}
Broker.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Broker.ctorParameters = () => [
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
];
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
export function getStartAndEndDates(timescale, endDate, amount, notsliding, previous = false) {
    /** @type {?} */
    let lastDate = endDate || new Date();
    amount = amount || 7;
    /** @type {?} */
    let period = 'days';
    /** @type {?} */
    let startof = 'day';
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
    let dateFrom = startOf(dateAdd(utc(toDate(lastDate)), period, -amount), startof);
    /** @type {?} */
    let dateTo = toDate(lastDate);
    if (previous) {
        dateFrom = dateAdd(dateFrom, period, -amount);
        dateTo = dateAdd(dateTo, period, -amount);
    }
    //use .utc() to get the startOf with no offset issues
    return [dateFrom.toISOString(), dateTo.toISOString()];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJva2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYnJva2VyL2Jyb2tlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFnQixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUl4RCwrQkFBYyw0REFBNEQsQ0FBQztBQUUzRSxPQUFPLEVBQTBELE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0SixPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hHLE9BQU8s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QUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gJy4uL2NhY2hlL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVscyB9IGZyb20gJy4uL21vZGVscy9tb2RlbHMuc2VydmljZSc7XG5pbXBvcnQgeyBHb29nbGVtYXBzIH0gZnJvbSAnLi4vZ29vZ2xlbWFwcy9nb29nbGVtYXBzLnNlcnZpY2UnO1xuaW1wb3J0IHsgV29ya3BsYWNlIH0gZnJvbSAnLi4vd29ya3BsYWNlL3dvcmtwbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBGaWxlcyB9IGZyb20gJy4uL2ZpbGVzL2ZpbGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi4vYm94L2JveC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBTbWFydGxvYyB9IGZyb20gJy4uL3NtYXJ0bG9jL3NtYXJ0bG9jLnNlcnZpY2UnO1xuaW1wb3J0IHsgVW5zcGxhc2ggfSBmcm9tICcuLi91bnNwbGFzaC91bnNwbGFzaC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgUmVzcG9uc2VPYmplY3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3Jlc3BvbnNlLW9iamVjdC9yZXNwb25zZS1vYmplY3QuaW50ZXJmYWNlJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9sb2NhdGlvbi9sb2NhdGlvbi5pbnRlcmZhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9yZXNwb25zZS1vYmplY3QvcmVzcG9uc2Utb2JqZWN0LmludGVyZmFjZSc7XG5cbmltcG9ydCB7IEZpbHRlcnMsIFF1ZXJ5LCBTdWJRdWVyeSwgSUVudGl0eSwgSUN1c3RvbU1vZGVsLCBJU29ydCwgdG9EYXRlLCB1dGMsIGRhdGVBZGQsIHN0YXJ0T2YsIGNhY2hlRmlsZSwgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgUG9zaXRpb24sIENvcmVDb25maWcsIFByb21pc2VTZXJ2aWNlLCBMb2csIExvY2FsRm9yYWdlU2VydmljZSwgTmV0d29yayB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcblxuaW1wb3J0IHsgRmlsZVVwbG9hZGVyIH0gZnJvbSAnbmcyLWZpbGUtdXBsb2FkJztcbmltcG9ydCB7IEZpbGVUcmFuc2ZlciB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmlsZS10cmFuc2Zlci9uZ3gnO1xuaW1wb3J0IHsgdW5pcSwgY29tcGFjdCwgZ2V0LCBzZXQsIGFzc2lnbiwgaXNBcnJheSwgaXNTdHJpbmcsIGlzT2JqZWN0LCBpc0VtcHR5LCBmbGF0dGVuLCBmb3JFYWNoLCBjb25jYXQsIHJlbW92ZSwgY2xvbmVEZWVwLCB1bmlxQnksIGlzRXF1YWwsIGludGVyc2VjdGlvbiwgb3JkZXJCeSwga2V5cywgbWFwIGFzIGxvZGFzaE1hcCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBmb3JrSm9pbiwgZnJvbSwgb2YsIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7IC8vLCBncm91cEJ5LCBmbGF0TWFwLCByZWR1Y2VcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb2tlciB7XG4gIHByaXZhdGUgaXNVcGxvYWRpbmdEYXRhYmFzZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJxOiBSZXF1ZXN0b3IsXG4gICAgcHJpdmF0ZSBib3g6IEJveCxcbiAgICBwcml2YXRlIGdvb2dsZW1hcHM6IEdvb2dsZW1hcHMsXG4gICAgcHJpdmF0ZSB3b3JrcGxhY2U6IFdvcmtwbGFjZSxcbiAgICBwcml2YXRlIHNlc3Npb246IFNlc3Npb24sXG4gICAgcHJpdmF0ZSBmaWxlczogRmlsZXMsXG4gICAgcHJpdmF0ZSBwcm9taXNlOiBQcm9taXNlU2VydmljZSxcbiAgICBwcml2YXRlIGNvcmVDb25maWc6IENvcmVDb25maWcsXG4gICAgcHJpdmF0ZSBsb2c6IExvZyxcbiAgICBwcml2YXRlIG5ldHdvcms6IE5ldHdvcmssXG4gICAgcHJpdmF0ZSB0cmFuc2ZlcjogRmlsZVRyYW5zZmVyLFxuICAgIHByaXZhdGUgbG9jYWxGb3JhZ2U6IExvY2FsRm9yYWdlU2VydmljZSxcbiAgICBwdWJsaWMgY29uZmlnOiBDb25maWcsXG4gICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcm90ZWN0ZWQgY2FjaGU6IENhY2hlLFxuICAgIHByb3RlY3RlZCBnZW9sb2M6IFNtYXJ0bG9jLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZSxcbiAgICBwcm90ZWN0ZWQgdW5zcGxhc2g6IFVuc3BsYXNoXG4gICkge1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCgpIHt9XG5cbiAgZ2V0QXBpVXJsKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5hcGlVcmw7XG4gIH1cblxuICBnZXRTZXJ2ZXJVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnNlcnZlclVybDtcbiAgfVxuXG4gIGdldENvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgbW9kZWwgPSBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICBpZiAobW9kZWwgJiYgbW9kZWwuaXNDdXN0b20pIHtcbiAgICAgIHJldHVybiAnY3VzdG9tbW9kZWxpbnN0YW5jZXMnO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbk5hbWU7XG4gIH1cblxuICBnZXRCeUlkKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcsIGZpZWxkcz86IEFycmF5PHN0cmluZz4sIGluY2x1ZGU/OiBBcnJheTxzdHJpbmc+LCBpZEF0dHJpYnV0ZU5hbWU/OiBzdHJpbmcpIHtcbiAgICBsZXQgcXVlcnkgPSB0aGlzLmdldFF1ZXJ5KGNvbGxlY3Rpb25OYW1lLCBmaWVsZHMsIGluY2x1ZGUpO1xuICAgIGRlbGV0ZSBxdWVyeS5saW1pdDtcbiAgICBkZWxldGUgcXVlcnkuc2tpcDtcbiAgICBkZWxldGUgcXVlcnkub3JkZXI7XG4gICAgZGVsZXRlIHF1ZXJ5LnN1YlF1ZXJ5O1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHJldHVybiBmcm9tKHRoaXMuY2FjaGUuZ2V0QnlJZEZyb21EYXRhYmFzZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUsIGlkLCBpZEF0dHJpYnV0ZU5hbWUpKTtcbiAgICB9IGVsc2UgaWYgKCFpZEF0dHJpYnV0ZU5hbWUgfHwgaWRBdHRyaWJ1dGVOYW1lID09PSAnX2lkJykge1xuICAgICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArIHRoaXMuZ2V0Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpICsgJy8nICsgaWQgKyAnP2ZpbHRlcj0nICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHF1ZXJ5KSk7XG4gICAgICByZXR1cm4gdGhpcy5ycS5nZXQodXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZpbHRlcnM6IEZpbHRlcnMgPSBbW3sgZmllbGQ6IGlkQXR0cmlidXRlTmFtZSwgb3BlcmF0b3I6IHsgX2lkOiAnZXEnIH0sIHZhbHVlOiBpZCB9XV07XG4gICAgICByZXR1cm4gdGhpcy5nZXRBbGwoY29sbGVjdGlvbk5hbWUsIGZpZWxkcywgaW5jbHVkZSwgbnVsbCwgZmlsdGVycykucGlwZShcbiAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBlbnRpdHk6IGFueSkge1xuICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyB0aGlzLmdldENvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICB0aGlzLnVwZGF0ZUN1c3RvbU1vZGVsKGNvbGxlY3Rpb25OYW1lLCBlbnRpdHkpO1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIHJldHVybiBmcm9tKHRoaXMuY2FjaGUudXBzZXJ0SW5EYXRhYmFzZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUsIGVudGl0eSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgZW50aXR5KTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZW50aXR5OiBhbnkpIHtcbiAgICBpZiAodGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpIHx8IHRoaXMuaXNPZmZsaW5lRW50aXR5KGVudGl0eSkpIHtcbiAgICAgIHJldHVybiBmcm9tKHRoaXMuY2FjaGUudXBzZXJ0SW5EYXRhYmFzZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUsIGVudGl0eSkpO1xuICAgIH0gZWxzZSBpZiAoY29sbGVjdGlvbk5hbWUgPT09ICdncm91cHMnKSB7XG4gICAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgdGhpcy5nZXRDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSk7XG4gICAgICB0aGlzLnVwZGF0ZUN1c3RvbU1vZGVsKGNvbGxlY3Rpb25OYW1lLCBlbnRpdHkpO1xuICAgICAgcmV0dXJuIHRoaXMucnEucHV0KHVybCwgZW50aXR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGVudGl0eS5faWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0Y2goY29sbGVjdGlvbk5hbWUsIGVudGl0eSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoY29sbGVjdGlvbk5hbWUsIGVudGl0eSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2F2ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBlbnRpdHk6IGFueSwgZmllbGRzPzogQXJyYXk8c3RyaW5nPikge1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkgfHwgdGhpcy5pc09mZmxpbmVFbnRpdHkoZW50aXR5KSkge1xuICAgICAgcmV0dXJuIGZyb20odGhpcy5jYWNoZS51cHNlcnRJbkRhdGFiYXNlQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSwgZW50aXR5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnVwc2VydChjb2xsZWN0aW9uTmFtZSwgZW50aXR5KS5waXBlKG1lcmdlTWFwKHJlcyA9PiB0aGlzLmdldEJ5SWQoY29sbGVjdGlvbk5hbWUsIHJlcy5faWQsIGZpZWxkcykpKTtcbiAgICB9XG4gIH1cblxuICBwYXRjaChjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBlbnRpdHk6IGFueSkge1xuICAgIGlmICghZW50aXR5IHx8ICFlbnRpdHkuX2lkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbnQgcGF0Y2ggYW4gZW1wdHkgZW50aXR5IG9yIGFuIGVudGl0eSB3aXRob3V0IGFuIGlkJyk7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlQ3VzdG9tTW9kZWwoY29sbGVjdGlvbk5hbWUsIGVudGl0eSk7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSB8fCB0aGlzLmlzT2ZmbGluZUVudGl0eShlbnRpdHkpKSB7XG4gICAgICByZXR1cm4gZnJvbSh0aGlzLmNhY2hlLnVwc2VydEluRGF0YWJhc2VDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lLCBlbnRpdHksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArIHRoaXMuZ2V0Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpICsgJy8nICsgZW50aXR5Ll9pZDtcbiAgICAgIHJldHVybiB0aGlzLnJxLnBhdGNoKHVybCwgZW50aXR5KTtcbiAgICB9XG4gIH1cblxuICB1cHNlcnQoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZW50aXR5OiBPYmplY3QsIHByZXZpb3VzRW50aXR5PzogT2JqZWN0LCBza2lwQWNsPzogYm9vbGVhbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgaWYgKCFza2lwQWNsKSB7XG4gICAgICB0aGlzLnNldEFjbChlbnRpdHksICg8YW55PmVudGl0eSkuZ3JvdXAsIGZhbHNlLCBjb2xsZWN0aW9uTmFtZSk7XG4gICAgfVxuICAgIHRoaXMuaW5jcmVtZW50VGFncyhjb2xsZWN0aW9uTmFtZSwgZW50aXR5KS5zdWJzY3JpYmUoKCkgPT4ge30pO1xuICAgIGxldCBzdWZmaXhzID0gY29sbGVjdGlvbk5hbWUgPT09ICdtaXNzaW9uZGF0YXMnID8gWycudmFsdWUnLCAnLmVkaXQnLCAnLnZhbHVlLmZpZWxkVmFsdWUnXSA6IFsnLl9kb3dubG9hZFVSTCcsICcuZWRpdCddO1xuICAgIGxldCBoYXNGaWxlcyA9IHRoaXMuX2hhc0ZpbGVzKGVudGl0eSwgc3VmZml4cyk7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSB8fCAhaGFzRmlsZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZShjb2xsZWN0aW9uTmFtZSwgZW50aXR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0Pigob2JzZXJ2ZXI6IE9ic2VydmVyPGFueT4pID0+IHtcbiAgICAgICAgdGhpcy51cGxvYWRFbnRpdHlGaWxlcyhlbnRpdHksIHN1ZmZpeHMpLnRoZW4oXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoY29sbGVjdGlvbk5hbWUsIGVudGl0eSkuc3Vic2NyaWJlKHJldCA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXQuX2Rvd25sb2FkVVJMICYmIHRoaXMuZmlsZXMuaXNEb2N1bWVudChyZXQuX2Rvd25sb2FkVVJMKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYm94LnVwbG9hZChyZXQuX2Rvd25sb2FkVVJMKS5zdWJzY3JpYmUoYm94SWQgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGJveElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldC5ib3hJZCA9IGJveElkO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoY29sbGVjdGlvbk5hbWUsIHJldCkuc3Vic2NyaWJlKHJldHZhbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmV0dmFsKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmV0KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVyciA9PiB7fVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdXBzZXJ0QWxsKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGVudGl0aWVzOiBBcnJheTxPYmplY3Q+KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgb2JzID0gZW50aXRpZXMubWFwKGVudGl0eSA9PiB0aGlzLnVwc2VydChjb2xsZWN0aW9uTmFtZSwgZW50aXR5KSk7XG4gICAgcmV0dXJuIGZvcmtKb2luKG9icyk7XG4gIH1cblxuICB1cGxvYWRFbnRpdHlGaWxlcyhlbnRpdHksIHN1ZmZpeHM6IEFycmF5PHN0cmluZz4gPSBbXSwgcHJvZ3Jlc3NFbWl0dGVyPzogRXZlbnRFbWl0dGVyPGFueT4sIHRhZ3M/OiBBcnJheTxzdHJpbmc+LCBwcm9taXNlc09ubHkgPSBmYWxzZSwgdG90YWxPZmZzZXQgPSAwKTogUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgcHJvcGVydGllcyA9IHRoaXMuX2dldEZpbGVQcm9wZXJ0aWVzKGVudGl0eSwgc3VmZml4cyk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBsZXQgcHJvbWlzZXM6IEFycmF5PFByb21pc2U8YW55Pj4gPSBwcm9wZXJ0aWVzLm1hcChwcm9wID0+IHtcbiAgICAgIGxldCBwcm9taXNlO1xuICAgICAgbGV0IGZpbGUgPSBnZXQoZW50aXR5LCBwcm9wKTtcbiAgICAgIHByb21pc2UgPSAoKG9mZnNldEluZGV4LCB0b3RhbCkgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT5cbiAgICAgICAgICB0aGlzLnByZXBhcmVVcGxvYWQoZmlsZSlcbiAgICAgICAgICAgIC50aGVuKGYgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGxvYWQoZiwgcHJvZ3Jlc3NFbWl0dGVyLCBvZmZzZXRJbmRleCwgdG90YWwsIHRhZ3MsIHRvdGFsT2Zmc2V0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbih1cmwgPT4ge1xuICAgICAgICAgICAgICBzZXQoZW50aXR5LCBwcm9wLCB1cmwpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IFByb21pc2UucmVqZWN0KGVycikpO1xuICAgICAgfSkoY291bnQsIHByb3BlcnRpZXMubGVuZ3RoKTtcbiAgICAgIGNvdW50ICs9IDE7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9KTtcbiAgICBpZiAocHJvbWlzZXNPbmx5KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZXMubGVuZ3RoID4gMCA/IHByb21pc2VzIDogPGFueT5bKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCdlbXB0eScpXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZS5zZXF1ZW50aWFsKHByb21pc2VzKTtcbiAgfVxuXG4gIHVwbG9hZEVudGl0aWVzRmlsZXMoZW50aXRpZXM6IEFycmF5PGFueT4sIHN1ZmZpeHM6IEFycmF5PHN0cmluZz4gPSBbXSwgcHJvZ3Jlc3NFbWl0dGVyPzogRXZlbnRFbWl0dGVyPGFueT4sIHRhZ3M/OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgbGV0IHByb21pc2VzID0gZW50aXRpZXMubWFwKGVudGl0eSA9PiB7XG4gICAgICByZXR1cm4gKCkgPT4gdGhpcy51cGxvYWRFbnRpdHlGaWxlcyhlbnRpdHksIHN1ZmZpeHMsIHByb2dyZXNzRW1pdHRlciwgdGFncywgZmFsc2UpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLnByb21pc2Uuc2VxdWVudGlhbChwcm9taXNlcyk7XG4gIH1cblxuICBwcmVwYXJlVXBsb2FkKGZpbGUpIHtcbiAgICByZXR1cm4gdGhpcy5maWxlcy5fcmVxdWVzdEV4dGVybmFsU3RvcmFnZVBlcm1pc3Npb24oKS50aGVuKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmZpbGVzLmlzQmFzZTY0KGZpbGUpKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5maWxlcy5iNjR0b0Jsb2IoZmlsZSkpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmZpbGVzLmlzRmlsZVVyaShmaWxlKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlcy5yZXNvbHZlRmlsZVBhdGgoPHN0cmluZz5maWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmlsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVBbGwoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgcXVlcnk6IFF1ZXJ5LCBlbnRpdHk6IGFueSkge1xuICAgIGxldCByYXdRdWVyeTogYW55ID0gYXNzaWduKHt9LCBxdWVyeS53aGVyZSk7XG4gICAgaWYgKHF1ZXJ5LnN1YlF1ZXJ5KSB7XG4gICAgICByYXdRdWVyeS5fX29wdGlvbnMgPSB7IHN1YlF1ZXJ5OiBxdWVyeS5zdWJRdWVyeSB9O1xuICAgIH1cbiAgICBpZiAoZW50aXR5Lmdyb3VwKSB7XG4gICAgICBlbnRpdHlbJ19hY2wuZ3JvdXBzLnInXSA9IGVudGl0eS5ncm91cDtcbiAgICB9XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArIHRoaXMuZ2V0Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpICsgJy91cGRhdGU/d2hlcmU9JyArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShyYXdRdWVyeSkpO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCBlbnRpdHkpO1xuICB9XG5cbiAgc2V0QWNsKGVudGl0eSwgZ3JvdXA/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBhZGRXcml0ZTogYm9vbGVhbiA9IGZhbHNlLCBjb2xsZWN0aW9uTmFtZT86IHN0cmluZywgdXNlcnM/OiBBcnJheTxzdHJpbmc+KSB7XG4gICAgLy9lbnRpdHkuX2FjbCA9IGVudGl0eS5fYWNsIHx8IHsgZ3JvdXBzOiB7IHI6IFsnYWRtaW4nXSwgdzogWydhZG1pbicsICdtYW5hZ2VyJ10gfSB9O1xuICAgIGVudGl0eS5fYWNsID0gZW50aXR5Ll9hY2wgfHwgeyBncm91cHM6IHsgcjogW10sIHc6IFtdIH0gfTtcbiAgICBlbnRpdHkuX2FjbC5jcmVhdG9yID0gZW50aXR5Ll9hY2wgJiYgZW50aXR5Ll9hY2wuY3JlYXRvciA/IGVudGl0eS5fYWNsLmNyZWF0b3IgOiB0aGlzLnNlc3Npb24udXNlciA/IHRoaXMuc2Vzc2lvbi51c2VyLl9pZCA6IG51bGw7XG4gICAgZW50aXR5Ll9hY2wuZ3JvdXBzID0gZW50aXR5Ll9hY2wgJiYgZW50aXR5Ll9hY2wuZ3JvdXBzID8gZW50aXR5Ll9hY2wuZ3JvdXBzIDoge307XG4gICAgaWYgKGdyb3VwKSB7XG4gICAgICBlbnRpdHkuX2FjbC5ncm91cHMuciA9IHVuaXEoW10uY29uY2F0KGdyb3VwKS5jb25jYXQoZW50aXR5Ll9hY2wuZ3JvdXBzLnIpKTtcbiAgICB9XG4gICAgZW50aXR5Ll9hY2wuZ3JvdXBzLnIgPSBjb21wYWN0KGVudGl0eS5fYWNsLmdyb3Vwcy5yKTtcbiAgICAvL2VudGl0eS5fYWNsLmdyb3Vwcy53ID0gY29tcGFjdCh1bmlxKFsnYWRtaW4nLCAnbWFuYWdlciddLmNvbmNhdChlbnRpdHkuX2FjbC5ncm91cHMudyB8fCBbXSkpKTtcbiAgICBlbnRpdHkuX2FjbC5ncm91cHMudyA9IGNvbXBhY3QodW5pcShbXS5jb25jYXQoZW50aXR5Ll9hY2wuZ3JvdXBzLncgfHwgW10pKSk7XG5cbiAgICBpZiAoY29sbGVjdGlvbk5hbWUgPT09ICd0cmFuc2xhdGlvbnMnICYmIGdyb3VwKSB7XG4gICAgICBlbnRpdHkuX2FjbC5ncm91cHMuciA9IHVuaXEoW10uY29uY2F0KGdyb3VwKSk7XG4gICAgICBlbnRpdHkuX2FjbC5ncm91cHMudyA9IHVuaXEoW10uY29uY2F0KGdyb3VwKSk7XG4gICAgfVxuICAgIGlmIChhZGRXcml0ZSAmJiBncm91cCkge1xuICAgICAgZW50aXR5Ll9hY2wuZ3JvdXBzLncgPSBjb21wYWN0KHVuaXEoW10uY29uY2F0KGdyb3VwKS5jb25jYXQoZW50aXR5Ll9hY2wuZ3JvdXBzLncpKSk7XG4gICAgfVxuICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAvL2VudGl0eS5fYWNsLnVzZXJzID0geyByOiB1c2VycywgdzogdXNlcnMgfTtcbiAgICAgIGVudGl0eS5fYWNsLmdyb3Vwcy5yID0gZW50aXR5Ll9hY2wuZ3JvdXBzLnIuY29uY2F0KHVzZXJzKTtcbiAgICB9XG4gIH1cblxuICBnZXRDdXJyZW50R3JvdXBzKCkge1xuICAgIGlmICh0aGlzLnNlc3Npb24ucm9sZXMuaW5kZXhPZignYWRtaW4nKSA8IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uZ3JvdXBzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gWydkZWJ1Z192MiddO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUN1c3RvbU1vZGVsKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGVudGl0eTogYW55KSB7XG4gICAgbGV0IG1vZGVsID0gTW9kZWxzLmdldE1vZGVsQnlDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSk7XG4gICAgaWYgKG1vZGVsICYmIG1vZGVsLmlzQ3VzdG9tKSB7XG4gICAgICBlbnRpdHkuX21vZGVsTmFtZSA9IGNvbGxlY3Rpb25OYW1lO1xuICAgICAgaWYgKGVudGl0eS5sb2NhdGlvbiAmJiBlbnRpdHkubG9jYXRpb24uX2lkKSB7XG4gICAgICAgIGVudGl0eS5sb2NhdGlvblJlZiA9IGVudGl0eS5sb2NhdGlvbi5faWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkKGZpbGU6IGFueSwgcHJvZ3Jlc3NFbWl0dGVyPzogRXZlbnRFbWl0dGVyPGFueT4sIG9mZnNldEluZGV4ID0gMCwgdG90YWwgPSAxLCB0YWdzOiBBcnJheTxzdHJpbmc+ID0gW10sIHRvdGFsT2Zmc2V0ID0gMCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgdGFncyA9IGNvbmNhdChbdGhpcy5zZXNzaW9uLnVzZXJJZF0sIHRhZ3MpO1xuICAgIC8vY2hlY2sgZm9yIGZpbGUgY3JlYXRlZCBmcm9tIGJhc2U2NCBpZiB3ZSBjYW4gc2VuZCB0aGVtIHRocm91Z2ggY29yZG92YSB0cmFuc2ZlcnQgcGx1Z2luLlxuICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNDb3Jkb3ZhKCkgJiYgZmlsZS5uYXRpdmVVUkwpIHtcbiAgICAgIGxldCBmaWxlVHJhbnNmZXIgPSB0aGlzLnRyYW5zZmVyLmNyZWF0ZSgpO1xuICAgICAgaWYgKHByb2dyZXNzRW1pdHRlcikge1xuICAgICAgICBmaWxlVHJhbnNmZXIub25Qcm9ncmVzcyhldiA9PiB7XG4gICAgICAgICAgaWYgKGV2Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICAgIGxldCBwZXJjZW50YWdlID0gKChldi5sb2FkZWQgLyBldi50b3RhbCkgKiAxMDApIC8gKHRvdGFsICsgdG90YWxPZmZzZXQpICsgKG9mZnNldEluZGV4ICogMTAwKSAvICh0b3RhbCArIHRvdGFsT2Zmc2V0KTtcbiAgICAgICAgICAgIHByb2dyZXNzRW1pdHRlci5uZXh0KHBlcmNlbnRhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlsZVRyYW5zZmVyXG4gICAgICAgIC51cGxvYWQoZmlsZS5uYXRpdmVVUkwsIHRoaXMuY29uZmlnLnVwbG9hZFVybCwge1xuICAgICAgICAgIGZpbGVLZXk6ICdmaWxlJyxcbiAgICAgICAgICBmaWxlTmFtZTogZmlsZS5uYW1lLFxuICAgICAgICAgIGNodW5rZWRNb2RlOiBmYWxzZSxcbiAgICAgICAgICBwYXJhbXM6IHsgdGFnczogdGFncyB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgIGxldCByZXRWYWwgPSBKU09OLnBhcnNlKHJlc3VsdC5yZXNwb25zZSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZ2V0Q2xvdWRpbmFyeVVybChyZXRWYWwpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IGZpbGVFcnJvciA9IGVyciAmJiBlcnIubWVzc2FnZSA/IGVyci5tZXNzYWdlIDogJ0ZpbGUgRXJyb3InO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChmaWxlRXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZpbGVVcGxvYWRlciA9IHRoaXMuZ2V0RmlsZVVwbG9hZGVyKG51bGwpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZmlsZVVwbG9hZGVyLm9uQnVpbGRJdGVtRm9ybSA9IChmaWxlSXRlbTogYW55LCBmb3JtOiBhbnkpID0+IHtcbiAgICAgICAgICBmb3JtLmFwcGVuZCgndGFncycsIEpTT04uc3RyaW5naWZ5KHRhZ3MpKTtcbiAgICAgICAgfTtcbiAgICAgICAgZmlsZVVwbG9hZGVyLm9uQ29tcGxldGVJdGVtID0gKGl0ZW06IGFueSwgcmVzcG9uc2U6IGFueSwgc3RhdHVzOiBhbnksIGhlYWRlcnM6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2cubG9nKCd1cGxvYWQgZmluaXNoJyk7XG4gICAgICAgICAgZmlsZVVwbG9hZGVyLmNsZWFyUXVldWUoKTtcbiAgICAgICAgICBpZiAoc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIGxldCByZXRWYWwgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5maWxlcy5nZXRDbG91ZGluYXJ5VXJsKHJldFZhbCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QocmVzcG9uc2UgPyBKU09OLnBhcnNlKHJlc3BvbnNlKSA6ICdlcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHByb2dyZXNzRW1pdHRlcikge1xuICAgICAgICAgIGZpbGVVcGxvYWRlci5vblByb2dyZXNzSXRlbSA9IChpdGVtOiBhbnksIHByb2dyZXNzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBwZXJjZW50YWdlID0gcHJvZ3Jlc3MgLyAodG90YWwgKyB0b3RhbE9mZnNldCkgKyAob2Zmc2V0SW5kZXggKiAxMDApIC8gKHRvdGFsICsgdG90YWxPZmZzZXQpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NFbWl0dGVyLm5leHQocGVyY2VudGFnZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmaWxlVXBsb2FkZXIuYWRkVG9RdWV1ZShbZmlsZV0pO1xuICAgICAgICBmaWxlVXBsb2FkZXIucXVldWVbMF0uYWxpYXMgPSAndW5kZWZpbmVkJztcbiAgICAgICAgLy9maWxlSXRlbS5hbGlhcyA9ICd1bmRlZmluZWQnO1xuICAgICAgICB0aGlzLmxvZy5sb2coJ3VwbG9hZCBiZWdpbicpO1xuICAgICAgICBmaWxlVXBsb2FkZXIudXBsb2FkQWxsKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB1cGxvYWREYXRhKGRhdGEsIHByb2dyZXNzRW1pdHRlcj86IEV2ZW50RW1pdHRlcjxhbnk+LCBvZmZzZXRJbmRleCA9IDAsIHRvdGFsID0gMSkge1xuICAgIGxldCBmaWxlID0gdGhpcy5maWxlcy5iNjR0b0Jsb2IoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMudXBsb2FkKGZpbGUsIHByb2dyZXNzRW1pdHRlciwgb2Zmc2V0SW5kZXgsIHRvdGFsKTtcbiAgfVxuXG4gIGluY3JlbWVudFRhZ3MoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZW50aXR5OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGlmIChlbnRpdHkudGFncyAmJiBlbnRpdHkudGFncy5sZW5ndGggPiAwKSB7XG4gICAgICBlbnRpdHkudGFncyA9IHVuaXEoY29tcGFjdChbXS5jb25jYXQoZW50aXR5LnRhZ3MpKSk7XG4gICAgICBpZiAoZW50aXR5LnRhZ3MubGVuZ3RoID4gMCAmJiAhdGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpKSB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAndGFncy9pbmNyZW1lbnRUYWdzJztcbiAgICAgICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHtcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25OYW1lOiBNb2RlbHMuZml4Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpLFxuICAgICAgICAgICAgdGFnczogZW50aXR5LnRhZ3MsXG4gICAgICAgICAgICBncm91cHM6IFtdLmNvbmNhdChlbnRpdHkuZ3JvdXAgfHwgZW50aXR5Ll9hY2wuZ3JvdXBzLnIpLFxuICAgICAgICAgICAgZW50aXR5XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9mKG51bGwpO1xuICB9XG5cbiAgdXBkYXRlVGFncyhjb2xsZWN0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICd0YWdzL3VwZGF0ZVRhZ3MnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHBhcmFtczogeyBjb2xsZWN0aW9uOiBjb2xsZWN0aW9uTmFtZSB9IH0pO1xuICB9XG5cbiAgY3JlYXRlQWxsVGFncygpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzTG9naWMvY3JlYXRlQWxsVGFncyc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgcGFyYW1zOiB7fSB9KTtcbiAgfVxuXG4gIGRlbGV0ZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaXNPZmZsaW5lSWQoaWQpKSB7XG4gICAgICByZXR1cm4gZnJvbSh0aGlzLmNhY2hlLnJlbW92ZUZyb21EYXRhYmFzZUNvbGxlY3Rpb24oY29sbGVjdGlvbk5hbWUsIGlkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyB0aGlzLmdldENvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChpZCk7XG4gICAgICByZXR1cm4gdGhpcy5ycS5kZWxldGUodXJsKTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVBbGwoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgcXVlcnk6IFF1ZXJ5KSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArIHRoaXMuZ2V0Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpO1xuICAgIGxldCByYXdRdWVyeTogYW55ID0gYXNzaWduKHt9LCBxdWVyeS53aGVyZSB8fCB7IF9pZDogeyBleGlzdHM6IHRydWUgfSB9KTtcbiAgICBpZiAocXVlcnkuc3ViUXVlcnkpIHtcbiAgICAgIHJhd1F1ZXJ5Ll9fb3B0aW9ucyA9IHsgc3ViUXVlcnk6IHF1ZXJ5LnN1YlF1ZXJ5IH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJxLmRlbGV0ZSh1cmwsIHJhd1F1ZXJ5KTtcbiAgfVxuXG4gIGdldFF1ZXJ5KGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGZpZWxkcz86IEFycmF5PHN0cmluZz4sIGluY2x1ZGU/OiBBcnJheTxzdHJpbmc+LCBzZWFyY2g/OiBzdHJpbmcsIGZpbHRlcnM/OiBGaWx0ZXJzIHwgT2JqZWN0LCBzb3J0cz86IEFycmF5PElTb3J0Piwgc2tpcCA9IDAsIGxpbWl0ID0gMjAsIHN1YlF1ZXJ5OiBTdWJRdWVyeSA9IG51bGwsIGN1c3RvbUZpbHRlciA9IG51bGwpOiBRdWVyeSB7XG4gICAgbGV0IG1vZGVsID0gTW9kZWxzLmdldE1vZGVsQnlDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSk7XG4gICAgaWYgKG1vZGVsKSB7XG4gICAgICBmaWVsZHMgPSBmaWVsZHMgJiYgZmllbGRzLmxlbmd0aCA+IDAgPyBmaWVsZHMgOiBtb2RlbC5maWVsZHM7XG4gICAgICBpbmNsdWRlID0gaW5jbHVkZSB8fCBtb2RlbC5pbmNsdWRlO1xuICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLmlzQ3VzdG9tKSB7XG4gICAgICAgIGlmICghZmlsdGVycyB8fCAoaXNBcnJheShmaWx0ZXJzKSAmJiAoPEFycmF5PGFueT4+ZmlsdGVycykubGVuZ3RoIDwgMSkpIHtcbiAgICAgICAgICBmaWx0ZXJzID0gW1tdXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheShmaWx0ZXJzKSkge1xuICAgICAgICAgIGZpbHRlcnMgPSBjbG9uZURlZXAoZmlsdGVycyk7XG4gICAgICAgICAgKDxhbnk+ZmlsdGVycykuZm9yRWFjaChmID0+IHtcbiAgICAgICAgICAgIGYucHVzaCh7IGZpZWxkOiAnX21vZGVsTmFtZScsIG9wZXJhdG9yOiB7IF9pZDogJ2VxJyB9LCB2YWx1ZTogbW9kZWwuY29sbGVjdGlvbk5hbWUgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcXVlcnk6IFF1ZXJ5ID0ge307XG4gICAgaWYgKHNraXAgJiYgc2tpcCA+IDApIHtcbiAgICAgIHF1ZXJ5LnNraXAgPSBza2lwO1xuICAgIH1cblxuICAgIGlmIChsaW1pdCAmJiBsaW1pdCA+IDApIHtcbiAgICAgIHF1ZXJ5LmxpbWl0ID0gbGltaXQ7XG4gICAgfVxuXG4gICAgaWYgKHNvcnRzICYmIHNvcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHF1ZXJ5Lm9yZGVyID0gc29ydHMuZmlsdGVyKHMgPT4gaXNTdHJpbmcocykgfHwgKHMuY29sSWQgJiYgcy5zb3J0KSkubWFwKHMgPT4gKGlzU3RyaW5nKHMpID8gcyA6IHMuY29sSWQgKyAnICcgKyAocy5zb3J0ID8gcy5zb3J0LnRvVXBwZXJDYXNlKCkgOiAnQVNDJykpKTtcbiAgICB9IGVsc2UgaWYgKHNvcnRzICYmIHNvcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVlcnkub3JkZXIgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcXVlcnkub3JkZXIgPSBbJ19sbXQgREVTQyddO1xuICAgIH1cbiAgICBsZXQgc2VhcmNoV2hlcmUgPSBudWxsO1xuICAgIGxldCBmaWx0ZXJXaGVyZSA9IG51bGw7XG4gICAgaWYgKHNlYXJjaCAmJiBtb2RlbCAmJiAhbW9kZWwuc2VhcmNoU3VicXVlcnkpIHtcbiAgICAgIHNlYXJjaFdoZXJlID0gTW9kZWxzLmV4cG9ydFNlYXJjaChjb2xsZWN0aW9uTmFtZSwgc2VhcmNoKTtcbiAgICB9XG5cbiAgICBpZiAoZmlsdGVycyAmJiBpc0FycmF5KGZpbHRlcnMpICYmICg8QXJyYXk8YW55Pj5maWx0ZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICBmaWx0ZXJXaGVyZSA9IE1vZGVscy5leHBvcnRXaGVyZShjb2xsZWN0aW9uTmFtZSwgPEZpbHRlcnM+ZmlsdGVycyk7XG4gICAgfSBlbHNlIGlmIChmaWx0ZXJzICYmICFpc0FycmF5KGZpbHRlcnMpICYmIGlzT2JqZWN0KGZpbHRlcnMpKSB7XG4gICAgICBmaWx0ZXJXaGVyZSA9IGZpbHRlcnM7XG4gICAgfVxuICAgIGlmIChzZWFyY2hXaGVyZSAmJiBmaWx0ZXJXaGVyZSkge1xuICAgICAgcXVlcnkud2hlcmUgPSB7IGFuZDogW3NlYXJjaFdoZXJlLCBmaWx0ZXJXaGVyZV0gfTtcbiAgICB9IGVsc2UgaWYgKHNlYXJjaFdoZXJlKSB7XG4gICAgICBxdWVyeS53aGVyZSA9IHNlYXJjaFdoZXJlO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyV2hlcmUpIHtcbiAgICAgIHF1ZXJ5LndoZXJlID0gZmlsdGVyV2hlcmU7XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbUZpbHRlciAmJiBxdWVyeS53aGVyZSkge1xuICAgICAgcXVlcnkud2hlcmUgPSB7IGFuZDogW3F1ZXJ5LndoZXJlLCBjdXN0b21GaWx0ZXJdIH07XG4gICAgfSBlbHNlIGlmIChjdXN0b21GaWx0ZXIpIHtcbiAgICAgIHF1ZXJ5LndoZXJlID0gY3VzdG9tRmlsdGVyO1xuICAgIH1cblxuICAgIGlmIChmaWVsZHMgJiYgZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHF1ZXJ5LmZpZWxkcyA9IGZpZWxkcztcbiAgICB9XG5cbiAgICBpZiAoIWlzRW1wdHkoaW5jbHVkZSkpIHtcbiAgICAgIHF1ZXJ5LmluY2x1ZGUgPSBpbmNsdWRlO1xuICAgIH1cblxuICAgIGlmIChzdWJRdWVyeSkge1xuICAgICAgcXVlcnkuc3ViUXVlcnkgPSBzdWJRdWVyeTtcbiAgICB9XG5cbiAgICBsZXQgZmlsdGVyU3VicXVlcnkgPSBNb2RlbHMuZXhwb3J0U3ViUXVlcnkoY29sbGVjdGlvbk5hbWUsIGZpbHRlcnMpO1xuICAgIGlmIChmaWx0ZXJTdWJxdWVyeSkge1xuICAgICAgaWYgKHF1ZXJ5LnN1YlF1ZXJ5KSB7XG4gICAgICAgIHF1ZXJ5LnN1YlF1ZXJ5ID0gW10uY29uY2F0KHF1ZXJ5LnN1YlF1ZXJ5LCBmaWx0ZXJTdWJxdWVyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeS5zdWJRdWVyeSA9IGZpbHRlclN1YnF1ZXJ5O1xuICAgICAgfVxuICAgIH1cbiAgICAvL3RoaXMgaXMgbWFpbmx5IHVzZWQgaW4gdGhlIGNoYW5uZWwgbW9kZWwgYmVjYXVzZSB3ZSB3YW50IHRvIGZpbHRlciBvbiB1c2VycyBwcm9wZXJ0aWVzXG4gICAgaWYgKHNlYXJjaCAmJiBtb2RlbCAmJiBtb2RlbC5zZWFyY2hTdWJxdWVyeSkge1xuICAgICAgc2VhcmNoV2hlcmUgPSBNb2RlbHMuZXhwb3J0U2VhcmNoKG1vZGVsLnNlYXJjaFN1YnF1ZXJ5LmNvbGxlY3Rpb25OYW1lLCBzZWFyY2gpO1xuICAgICAgaWYgKCFxdWVyeS5zdWJRdWVyeSkge1xuICAgICAgICBxdWVyeS5zdWJRdWVyeSA9IHtcbiAgICAgICAgICBjb2xsZWN0aW9uTmFtZTogbW9kZWwuc2VhcmNoU3VicXVlcnkuY29sbGVjdGlvbk5hbWUsXG4gICAgICAgICAgZmllbGQ6IG1vZGVsLnNlYXJjaFN1YnF1ZXJ5LmZpZWxkLFxuICAgICAgICAgIHZhbHVlczogbW9kZWwuc2VhcmNoU3VicXVlcnkudmFsdWVzLFxuICAgICAgICAgIHdoZXJlOiBzZWFyY2hXaGVyZVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChxdWVyeS5zdWJRdWVyeSAmJiAhaXNBcnJheShxdWVyeS5zdWJRdWVyeSkgJiYgKDxTdWJRdWVyeT5xdWVyeS5zdWJRdWVyeSkud2hlcmUpIHtcbiAgICAgICAgKDxTdWJRdWVyeT5xdWVyeS5zdWJRdWVyeSkud2hlcmUgPSB7IGFuZDogW3NlYXJjaFdoZXJlLCAoPFN1YlF1ZXJ5PnF1ZXJ5LnN1YlF1ZXJ5KS53aGVyZV0gfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgZ2V0Q291bnQoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgc2VhcmNoPzogc3RyaW5nLCBmaWx0ZXJzPzogRmlsdGVycywgc3ViUXVlcnk6IFN1YlF1ZXJ5ID0gbnVsbCwgY3VzdG9tRmlsdGVyID0gbnVsbCwgbm9PZmZsaW5lOiBib29sZWFuID0gZmFsc2UpOiBPYnNlcnZhYmxlPFJlc3BvbnNlT2JqZWN0PiB7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsT2ZmbGluZShjb2xsZWN0aW9uTmFtZSwgZmFsc2UsIHNlYXJjaCwgZmlsdGVycywgbnVsbCwgbnVsbCwgbnVsbCwgY3VzdG9tRmlsdGVyLCBmYWxzZSkucGlwZShcbiAgICAgICAgbWFwKHJldCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHsgY291bnQ6IHJldC5jb3VudCwgZGF0YTogW10gfTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBxdWVyeSA9IHRoaXMuZ2V0UXVlcnkoY29sbGVjdGlvbk5hbWUsIG51bGwsIG51bGwsIHNlYXJjaCwgZmlsdGVycywgbnVsbCwgbnVsbCwgbnVsbCwgc3ViUXVlcnksIGN1c3RvbUZpbHRlcik7XG4gICAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgdGhpcy5nZXRDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSkgKyAnL2NvdW50JzsgLy8/d2hlcmU9JyArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShxdWVyeS53aGVyZSB8fCB7fSkpO1xuICAgICAgbGV0IGZpbmFsUXVlcnk6IGFueSA9IHt9O1xuICAgICAgaWYgKHF1ZXJ5LndoZXJlKSB7XG4gICAgICAgIGZpbmFsUXVlcnkud2hlcmUgPSBxdWVyeS53aGVyZTtcbiAgICAgIH1cbiAgICAgIGlmIChxdWVyeS5zdWJRdWVyeSkge1xuICAgICAgICBmaW5hbFF1ZXJ5LnN1YlF1ZXJ5ID0gcXVlcnkuc3ViUXVlcnk7XG4gICAgICB9XG5cbiAgICAgIGxldCBmaW5hbFJlcztcbiAgICAgIHJldHVybiB0aGlzLnJxXG4gICAgICAgIC5wb3N0KHVybCwgZmluYWxRdWVyeSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWVyZ2VNYXAocmVzID0+IHtcbiAgICAgICAgICAgIGZpbmFsUmVzID0gcmVzO1xuICAgICAgICAgICAgaWYgKG5vT2ZmbGluZSkge1xuICAgICAgICAgICAgICByZXR1cm4gb2YoW10pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZyb20odGhpcy5nZXRBbGxPZmZsaW5lKGNvbGxlY3Rpb25OYW1lLCB0cnVlLCBzZWFyY2gsIGZpbHRlcnMsIG51bGwsIG51bGwsIG51bGwsIGN1c3RvbUZpbHRlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKG9mZmxpbmVSZXMgPT4ge1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gZmluYWxSZXMgfHwgMDtcbiAgICAgICAgICAgIGlmIChvZmZsaW5lUmVzICYmIG9mZmxpbmVSZXMuY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgIGNvdW50ICs9IG9mZmxpbmVSZXMuY291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBjb3VudDogY291bnQsIGRhdGE6IFtdIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGwoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZmllbGRzPzogQXJyYXk8c3RyaW5nPiwgaW5jbHVkZT86IEFycmF5PHN0cmluZz4sIHNlYXJjaD86IHN0cmluZywgZmlsdGVycz86IEZpbHRlcnMsIHNvcnRzPzogQXJyYXk8SVNvcnQ+LCBza2lwID0gMCwgbGltaXQgPSAyMCwgdGFnID0gZmFsc2UsIHN1YlF1ZXJ5OiBTdWJRdWVyeSA9IG51bGwsIGN1c3RvbUZpbHRlciA9IG51bGwsIGNhY2hlSWQ6IHN0cmluZyA9IG51bGwsIGxvb3NlQ291bnQ6IGJvb2xlYW4gPSBudWxsLCBub0NvdW50OiBib29sZWFuID0gZmFsc2UsIG5vT2ZmbGluZTogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxSZXNwb25zZU9iamVjdD4ge1xuICAgIGlmIChjb2xsZWN0aW9uTmFtZSA9PT0gJ2dvb2dsZW1hcHMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBbGxHb29nbGVNYXBzKHNlYXJjaCk7XG4gICAgfVxuICAgIGlmIChjb2xsZWN0aW9uTmFtZS5pbmRleE9mKCd3b3JrcGxhY2VfJykgPj0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QWxsV29ya3BsYWNlKGNvbGxlY3Rpb25OYW1lLCBzZWFyY2gpO1xuICAgIH1cbiAgICBpZiAoY29sbGVjdGlvbk5hbWUgPT09ICd1bnNwbGFzaCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEFsbFVuc3BsYXNoKHNlYXJjaCwgc2tpcCwgbGltaXQpO1xuICAgIH1cbiAgICBpZiAodGFnID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBbGxUYWdzKGNvbGxlY3Rpb25OYW1lLCBzZWFyY2gsIGZpbHRlcnMsIHNraXAsIGxpbWl0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5nZXRRdWVyeShjb2xsZWN0aW9uTmFtZSwgZmllbGRzLCBpbmNsdWRlLCBzZWFyY2gsIGZpbHRlcnMsIHNvcnRzLCBza2lwLCBsaW1pdCwgc3ViUXVlcnksIGN1c3RvbUZpbHRlcik7XG4gICAgICBpZiAoY29sbGVjdGlvbk5hbWUuaW5kZXhPZignX3N0b3JlJykgPj0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGxPcGVyYXRpb24oY29sbGVjdGlvbk5hbWUsIHF1ZXJ5KTtcbiAgICAgIH1cbiAgICAgIGxldCBvYnM7XG4gICAgICBpZiAodGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpKSB7XG4gICAgICAgIGlmIChjYWNoZUlkKSB7XG4gICAgICAgICAgb2JzID0gZnJvbSh0aGlzLmxvY2FsRm9yYWdlLmdldChjYWNoZUlkKSkucGlwZShcbiAgICAgICAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzIHx8IChub0NvdW50ID8gW10gOiB7IGNvdW50OiAwLCBkYXRhOiBbXSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnMgPSB0aGlzLmdldEFsbE9mZmxpbmUoY29sbGVjdGlvbk5hbWUsIGZhbHNlLCBzZWFyY2gsIGZpbHRlcnMsIHNvcnRzLCBza2lwLCBsaW1pdCwgY3VzdG9tRmlsdGVyLCBub0NvdW50KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGZpbmFsUmVzO1xuICAgICAgICBvYnMgPSB0aGlzLmdldEFsbFF1ZXJ5KGNvbGxlY3Rpb25OYW1lLCBxdWVyeSwgbG9vc2VDb3VudCwgbm9Db3VudClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgIGZpbmFsUmVzID0gcmVzO1xuICAgICAgICAgICAgICBpZiAoY2FjaGVJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxGb3JhZ2Uuc2V0KGNhY2hlSWQsIHJlcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG5vT2ZmbGluZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb20odGhpcy5nZXRBbGxPZmZsaW5lKGNvbGxlY3Rpb25OYW1lLCB0cnVlLCBzZWFyY2gsIGZpbHRlcnMsIHNvcnRzLCBza2lwLCBsaW1pdCwgY3VzdG9tRmlsdGVyLCBub0NvdW50KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKChvZmZsaW5lUmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vQ291bnQpIHtcbiAgICAgICAgICAgICAgICBmaW5hbFJlcyA9IFsuLi4ob2ZmbGluZVJlcyB8fCBbXSksIC4uLihmaW5hbFJlcyB8fCBbXSldO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbmFsUmVzLmRhdGEgPSBbLi4uKG9mZmxpbmVSZXMuZGF0YSB8fCBbXSksIC4uLihmaW5hbFJlcy5kYXRhIHx8IFtdKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZpbmFsUmVzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9icztcbiAgICB9XG4gIH1cblxuICBnZXRBbGxUYWdzKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIHNlYXJjaD86IHN0cmluZywgZmlsdGVycz86IEZpbHRlcnMsIHNraXAgPSAwLCBsaW1pdCA9IDIwLCB1c2VUYWdzQ29sbGVjdGlvbiA9IGZhbHNlKSB7XG4gICAgZmlsdGVycyA9IGZpbHRlcnMgfHwgW1tdXTtcbiAgICAvL2ZpeCBmb3IgXCJNb25nb0Vycm9yXCIsXCJtZXNzYWdlXCI6XCIkZ2VvTmVhciwgJG5lYXIsIGFuZCAkbmVhclNwaGVyZSBhcmUgbm90IGFsbG93ZWQgaW4gdGhpcyBjb250ZXh0XCJcbiAgICBpZiAoY29sbGVjdGlvbk5hbWUgPT09ICdsb2NhdGlvbnMnKSB7XG4gICAgICBmaWx0ZXJzID0gZmlsdGVycy5tYXAoZmYgPT4ge1xuICAgICAgICByZXR1cm4gZmYuZmlsdGVyKGYgPT4gZi5maWVsZCAhPT0gJ19nZW9sb2MnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uZXR3b3JrLmlzT2ZmbGluZSgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBbGxUYWdzT2ZmbGluZSh7IGNvbGxlY3Rpb25OYW1lLCBzZWFyY2gsIGZpbHRlcnMgfSk7XG4gICAgfSBlbHNlIGlmICh1c2VUYWdzQ29sbGVjdGlvbikge1xuICAgICAgLy90aGlzIGlzIG5vdCB1c2VkIGFueW1vcmVcbiAgICAgIGxldCBhZ2dyZWdhdGVPcHRpb25zID0gW3sgJG1hdGNoOiB7IGNvbGxlY3Rpb25OYW1lOiBNb2RlbHMuZml4Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpIH0gfSwgeyAkZ3JvdXA6IHsgX2lkOiAnJHRhZycsIGNvdW50OiB7ICRtYXg6ICckY291bnQnIH0gfSB9LCB7ICRzb3J0OiB7IGNvdW50OiAtMSB9IH0sIHsgJHByb2plY3Q6IHsgX2lkOiAxLCB0YWc6ICckX2lkJywgY291bnQ6IDEgfSB9LCB7ICRncm91cDogeyBfaWQ6IDEsIHRvdGFsOiB7ICRzdW06IDEgfSwgZGF0YTogeyAkcHVzaDogJyQkUk9PVCcgfSB9IH0sIHsgJHByb2plY3Q6IHsgY291bnQ6ICckdG90YWwnLCBkYXRhOiB7ICRzbGljZTogWyckZGF0YScsIHNraXAsIHNraXAgKyBsaW1pdF0gfSB9IH1dO1xuICAgICAgcmV0dXJuIHRoaXMuYWdncmVnYXRlUXVlcnkoJ3RhZ3MnLCBmaWx0ZXJzLCBhZ2dyZWdhdGVPcHRpb25zLCBzZWFyY2gpLnBpcGUobWFwKChyZXM6IGFueSkgPT4gKHJlcyAmJiByZXMubGVuZ3RoID4gMCA/IHsgZGF0YTogcmVzWzBdLmRhdGEsIGNvdW50OiByZXNbMF0uY291bnQgfSA6IHsgZGF0YTogW10sIGNvdW50OiAwIH0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBhZ2dyZWdhdGVPcHRpb25zOiBBcnJheTxhbnk+ID0gW3sgJHVud2luZDogJyR0YWdzJyB9XTtcbiAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgYWdncmVnYXRlT3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAkbWF0Y2g6IHsgdGFnczogeyAkcmVnZXg6IHNlYXJjaC5yZXBsYWNlKC8oW15hLXowLTldKykvZ2ksICcnKSwgJG9wdGlvbnM6ICdpJyB9IH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGFnZ3JlZ2F0ZU9wdGlvbnMgPSBhZ2dyZWdhdGVPcHRpb25zLmNvbmNhdChbeyAkZ3JvdXA6IHsgX2lkOiAnJHRhZ3MnLCBjb3VudDogeyAkc3VtOiAxIH0gfSB9LCB7ICRzb3J0OiB7IGNvdW50OiAtMSB9IH0sIHsgJHByb2plY3Q6IHsgX2lkOiAxLCB0YWc6ICckX2lkJywgY291bnQ6IDEgfSB9LCAuLi4oc2tpcCA+IDAgPyBbeyAkc2tpcDogc2tpcCB9XSA6IFtdKSwgLi4uKGxpbWl0ID4gMCA/IFt7ICRsaW1pdDogbGltaXQgfV0gOiBbXSldKTtcbiAgICAgIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZVF1ZXJ5KGNvbGxlY3Rpb25OYW1lLCBmaWx0ZXJzLCBhZ2dyZWdhdGVPcHRpb25zKS5waXBlKG1hcCgocmVzOiBBcnJheTxhbnk+ID0gW10pID0+ICh7IGRhdGE6IHJlcywgY291bnQ6IHJlcy5sZW5ndGggfSkpKTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxUYWdzT2ZmbGluZShjb25maWc6IHsgY29sbGVjdGlvbk5hbWU6IHN0cmluZzsgc2VhcmNoPzogc3RyaW5nOyBmaWx0ZXJzPzogRmlsdGVycyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QWxsT2ZmbGluZShjb25maWcuY29sbGVjdGlvbk5hbWUsIGZhbHNlLCBjb25maWcuc2VhcmNoLCBjb25maWcuZmlsdGVycywgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgdHJ1ZSkucGlwZShcbiAgICAgIG1hcCgocmVzOiBBcnJheTxJRW50aXR5PikgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IFtdO1xuICAgICAgICBsZXQgY291bnQ6IGFueSA9IHt9O1xuICAgICAgICBpZiAocmVzICYmIHJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmVzLmZvckVhY2godCA9PiB7XG4gICAgICAgICAgICBpZiAodC50YWdzKSB7XG4gICAgICAgICAgICAgIFtdLmNvbmNhdCh0LnRhZ3MpLmZvckVhY2godGFnID0+IHtcbiAgICAgICAgICAgICAgICBjb3VudFt0YWddID0gY291bnRbdGFnXSA+IDAgPyBjb3VudFt0YWddICsgMSA6IDE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGtleXMoY291bnQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGRhdGEucHVzaCh7IF9pZDoga2V5LCB0YWc6IGtleSwgY291bnQ6IGNvdW50W2tleV0gfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZGF0YSA9IG9yZGVyQnkoZGF0YSwgZCA9PiAtZC5jb3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGF0YSwgY291bnQ6IGRhdGEubGVuZ3RoLCBjb25maWcgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldE11bHRpcGxlQWxsVGFncyhjb25maWc6IHsgY29sbGVjdGlvbk5hbWU6IHN0cmluZzsgc2VhcmNoPzogc3RyaW5nOyBmaWx0ZXJzPzogRmlsdGVyczsgc3ViUXVlcnk/OiBTdWJRdWVyeSB9W10sIHNraXAgPSAwLCBsaW1pdCA9IDIwKSB7XG4gICAgaWYgKHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgbGV0IG9icyA9IGNvbmZpZy5tYXAoYyA9PiB0aGlzLmdldEFsbFRhZ3NPZmZsaW5lKGMpKTtcbiAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KG9icykucGlwZShcbiAgICAgICAgbWFwKHJldCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBhZ2dyZWdhdGVPcHRpb25zID0gW3sgJHVud2luZDogJyR0YWdzJyB9LCB7ICRncm91cDogeyBfaWQ6ICckdGFncycsIGNvdW50OiB7ICRzdW06IDEgfSB9IH0sIHsgJHNvcnQ6IHsgY291bnQ6IC0xIH0gfSwgeyAkcHJvamVjdDogeyBfaWQ6IDEsIHRhZzogJyRfaWQnLCBjb3VudDogMSB9IH0sIC4uLihza2lwID4gMCA/IFt7ICRza2lwOiBza2lwIH1dIDogW10pLCAuLi4obGltaXQgPiAwID8gW3sgJGxpbWl0OiBsaW1pdCB9XSA6IFtdKV07XG4gICAgICBsZXQgcXVlcmllczogUXVlcnlbXSA9IGNvbmZpZy5tYXAoY29uZiA9PiB7XG4gICAgICAgIGxldCBmaWx0ZXJzID0gY29uZi5maWx0ZXJzIHx8IFtdO1xuICAgICAgICBpZiAoY29uZi5jb2xsZWN0aW9uTmFtZSA9PT0gJ2xvY2F0aW9ucycpIHtcbiAgICAgICAgICBmaWx0ZXJzID0gZmlsdGVycy5tYXAoZmYgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZmLmZpbHRlcihmID0+IGYuZmllbGQgIT09ICdfZ2VvbG9jJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWdncmVnYXRlUXVlcnkoY29uZi5jb2xsZWN0aW9uTmFtZSwgZmlsdGVycywgYWdncmVnYXRlT3B0aW9ucywgY29uZi5zZWFyY2gsIG51bGwsIG51bGwsIG51bGwsIGNvbmYuc3ViUXVlcnkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGVRdWVyaWVzKHF1ZXJpZXMpLnBpcGUoXG4gICAgICAgIG1hcChyZXRzID0+IHtcbiAgICAgICAgICBsZXQgcmV0VmFsID0gcmV0cy5tYXAoKHJlcywgaSkgPT4gKHsgZGF0YTogcmVzLCBjb3VudDogcmVzLmxlbmd0aCwgY29uZmlnOiBjb25maWdbaV0gfSkpO1xuICAgICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbFF1ZXJ5KGNvbGxlY3Rpb25OYW1lLCBxdWVyeTogUXVlcnksIGxvb3NlQ291bnQ/OiBib29sZWFuLCBub0NvdW50PzogYm9vbGVhbikge1xuICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyB0aGlzLmdldENvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKSArICcvZmluZCc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgZmlsdGVyOiBxdWVyeSB9LCBudWxsLCAhbm9Db3VudCwgZmFsc2UsIGxvb3NlQ291bnQpO1xuICAgIC8vbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArIGNvbGxlY3Rpb25OYW1lICsgJz9maWx0ZXI9JyArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShxdWVyeSkpO1xuICAgIC8vcmV0dXJuIHRoaXMucnEuZ2V0KHVybCwgdHJ1ZSk7XG4gIH1cblxuICBnZXRBbGxHb29nbGVNYXBzKHNlYXJjaD86IHN0cmluZykge1xuICAgIGlmIChzZWFyY2gpIHtcbiAgICAgIHJldHVybiB0aGlzLmdvb2dsZW1hcHMucGxhY2VQcmVkaWN0aW9uc0xvY2F0aW9uT2JzZXJ2ZXIoc2VhcmNoKS5waXBlKFxuICAgICAgICBtYXAocHJlZGljdGlvbnMgPT4ge1xuICAgICAgICAgIGxldCBkZXRhaWxzID0gZmxhdHRlbihwcmVkaWN0aW9ucykuZmlsdGVyKGQgPT4gZC5nZW9tZXRyeSAmJiBkLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY291bnQ6IGRldGFpbHMubGVuZ3RoLFxuICAgICAgICAgICAgZGF0YTogZGV0YWlscy5tYXAoZCA9PiB7XG4gICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbihkLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBkLmZvcm1hdHRlZF9hZGRyZXNzLFxuICAgICAgICAgICAgICAgIF9pZDogZC5pZCxcbiAgICAgICAgICAgICAgICBfZ2VvbG9jOiBwb3NpdGlvbi50b0dlb0xvYyh0cnVlKSxcbiAgICAgICAgICAgICAgICBjb29yZHM6IHBvc2l0aW9uLnRvSnNvbigpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZnJvbSh0aGlzLmdvb2dsZW1hcHMuZ2V0Q3VycmVudEFkZHJlc3Nlcyh0cnVlKSkucGlwZShcbiAgICAgICAgbWFwKGFkZHJlc3NlcyA9PiB7XG4gICAgICAgICAgcmV0dXJuIHsgY291bnQ6IGFkZHJlc3Nlcy5sZW5ndGgsIGRhdGE6IGFkZHJlc3NlcyB9O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGxVbnNwbGFzaChzZWFyY2g/OiBzdHJpbmcsIHNraXA/OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMudW5zcGxhc2guZ2V0QWxsKHNlYXJjaCwgc2tpcCwgbGltaXQpO1xuICB9XG5cbiAgZ2V0QWxsV29ya3BsYWNlKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIHNlYXJjaD86IHN0cmluZyk6IE9ic2VydmFibGU8UmVzcG9uc2VPYmplY3Q+IHtcbiAgICBsZXQgZ3JhcGhFbnRpdHkgPSBjb2xsZWN0aW9uTmFtZS5yZXBsYWNlKCd3b3JrcGxhY2VfJywgJycpO1xuICAgIHN3aXRjaCAoZ3JhcGhFbnRpdHkpIHtcbiAgICAgIGNhc2UgJ2dyb3Vwcyc6XG4gICAgICAgIHJldHVybiA8YW55PnRoaXMud29ya3BsYWNlLmdldEFsbEdyb3VwcygpO1xuICAgIH1cbiAgICByZXR1cm4gb2YoeyBjb3VudDogMCwgZGF0YTogW10gfSk7XG4gIH1cblxuICBnZXRBbGxPcGVyYXRpb24oY29sbGVjdGlvbk5hbWU6IHN0cmluZywgcXVlcnk6IFF1ZXJ5KSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdPcGVyYXRpb24vZmluZERvY3VtZW50JztcbiAgICByZXR1cm4gdGhpcy5ycVxuICAgICAgLnBvc3QoXG4gICAgICAgIHVybCxcbiAgICAgICAge1xuICAgICAgICAgIGNvbGxlY3Rpb25OYW1lOiBNb2RlbHMuZml4Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUucmVwbGFjZSgnX3N0b3JlJywgJycpLCB0cnVlKSxcbiAgICAgICAgICB3aGVyZTogcXVlcnkud2hlcmUsXG4gICAgICAgICAgLy9vcGVyYXRpb25JZDogKDxhbnk+cXVlcnkud2hlcmUpLm9wZXJhdGlvbklkLmlucVswXSxcbiAgICAgICAgICBsaW1pdDogcXVlcnkubGltaXQsXG4gICAgICAgICAgc2tpcDogcXVlcnkuc2tpcFxuICAgICAgICB9LFxuICAgICAgICBudWxsLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLm1hcCkge1xuICAgICAgICAgICAgcmVzLmRhdGEgPSByZXMuZGF0YTsgLy8ubWFwKHIgPT4gci5kb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHN5bmNEYXRhYmFzZShsYXN0U3luYz86IERhdGUsIHByb2dyZXNzRXZlbnQ/OiBFdmVudEVtaXR0ZXI8bnVtYmVyPikge1xuICAgIGxldCBjb2xsZWN0aW9ucyA9IHRoaXMuY29yZUNvbmZpZy5nZXRTeW5jZWRDb2xsZWN0aW9ucygpO1xuICAgIGlmIChjb2xsZWN0aW9ucyAmJiBjb2xsZWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmxvZy5sb2coJ1N5bmNpbmcgRGF0YWJhc2UgLSBTdGFydCcpO1xuICAgICAgbGV0IHByb21pc2VzID0gY29sbGVjdGlvbnMubWFwKChlbnRyeSwgaSkgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgIGlmIChlbnRyeS5tYXggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmxvZy5sb2coJ1N5bmNpbmcgRGF0YWJhc2UgLSBTeW5jaW5nICcgKyBlbnRyeS5uYW1lKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXREYXRhYmFzZUNvbGxlY3Rpb24oZW50cnkubmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzOiBGaWx0ZXJzID0gY2xvbmVEZWVwKGVudHJ5LmZpbHRlcnMgfHwgW1tdXSk7XG4gICAgICAgICAgICBmaWx0ZXJzLmZvckVhY2goZnMgPT5cbiAgICAgICAgICAgICAgZnMuZm9yRWFjaChmID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZi52YWx1ZSAmJiBpc0FycmF5KGYudmFsdWUpICYmIGYudmFsdWUuaW5kZXhPZignY3VycmVudExhbmd1YWdlJykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgZi52YWx1ZVtmLnZhbHVlLmluZGV4T2YoJ2N1cnJlbnRMYW5ndWFnZScpXSA9IHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAobGFzdFN5bmMgJiYgZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIC8vICYmICkge1xuICAgICAgICAgICAgICBmaWx0ZXJzLmZvckVhY2goZiA9PiBmLnB1c2goeyBmaWVsZDogJ19sbXQnLCBvcGVyYXRvcjogeyBfaWQ6ICdndGUnIH0sIHZhbHVlOiBsYXN0U3luYyB9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIHRoaXMuZ2V0QWxsKGVudHJ5Lm5hbWUsIGVudHJ5LmZpZWxkcywgbnVsbCwgbnVsbCwgZmlsdGVycywgbnVsbCwgMCwgTWF0aC5taW4oZW50cnkubWF4IHx8IDEwMDAsIDEwMDApLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCB0cnVlKVxuICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgICAgIC8vIGxldCBjaHVuY2tOdW1iZXIgPSAoZW50cnkubWF4IHx8IDEwMDAwKSAvIDEwMDtcbiAgICAgICAgICAgICAgICAvLyBsZXQgcHMgPSBbXTtcbiAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBpaSA9IDA7IGlpIDw9IGNodW5ja051bWJlcjsgaWkrKykge1xuICAgICAgICAgICAgICAgIC8vICAgcHMucHVzaCh0aGlzLmdldEFsbChlbnRyeS5uYW1lLCBlbnRyeS5maWVsZHMsIG51bGwsIG51bGwsIGZpbHRlcnMsIG51bGwsIGlpICogMTAwLCAxMDApLnRvUHJvbWlzZSgpKTtcbiAgICAgICAgICAgICAgICAvLyAgIC8vcHMucHVzaCh0aGlzLmFnZ3JlZ2F0ZVF1ZXJ5KGVudHJ5Lm5hbWUsIGZpbHRlcnMsIFt7ICRza2lwOiBpaSAqIDEwMCB9LCB7ICRsaW1pdDogMTAwIH1dLCBudWxsLCBudWxsLCBmYWxzZSwgbnVsbCwgbnVsbCkudG9Qcm9taXNlKCkpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gUHJvbWlzZS5hbGwocHMpXG4gICAgICAgICAgICAgICAgLy8gLnRoZW4oKHJldDogQXJyYXk8UmVzcG9uc2VPYmplY3Q+KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICBsZXQgZCA9IFtdLmNvbmNhdC5hcHBseShbXSwgcmV0Lm1hcChyID0+IHIuZGF0YSkpO1xuICAgICAgICAgICAgICAgIC8vICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY291bnQ6IGQubGVuZ3RoLFxuICAgICAgICAgICAgICAgIC8vICAgICBkYXRhOiBkXG4gICAgICAgICAgICAgICAgLy8gICB9O1xuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc0V2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzRXZlbnQuZW1pdCgoaSAvIGNvbGxlY3Rpb25zLmxlbmd0aCkgKiAxMDApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKHJldCAmJiByZXQuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZVByb21pc2VzOiBBcnJheTxhbnk+ID0gW1Byb21pc2UucmVzb2x2ZShudWxsKV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWxldGVkS2V5czogQXJyYXk8c3RyaW5nPjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZmlsZVByb21pc2VzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREZWxldGVkRW50aXRpZXMoZW50cnkubmFtZSwgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkZWxldGVka2V5czogQXJyYXk8c3RyaW5nPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZWRLZXlzID0gZGVsZXRlZGtleXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuYWRkVG9DYWNoZSAmJiBlbnRyeS5hZGRUb0NhY2hlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5hZGRUb0NhY2hlLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5kYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlUHJvbWlzZXMucHVzaCgoKSA9PiBjYWNoZUZpbGUoaXRlbVtrZXldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGZpbGVQcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGUudXBkYXRlRGF0YWJhc2VDb2xsZWN0aW9uKGVudHJ5Lm5hbWUsIHJldC5kYXRhLCAnX2lkJywgZGVsZXRlZEtleXMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZS5zZXF1ZW50aWFsKHByb21pc2VzKS50aGVuKHJldCA9PiB7XG4gICAgICAgIGlmIChwcm9ncmVzc0V2ZW50KSB7XG4gICAgICAgICAgcHJvZ3Jlc3NFdmVudC5lbWl0KDEwMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG5cbiAgY2xlYXJEYXRhYmFzZSgpIHtcbiAgICBsZXQgY29sbGVjdGlvbnMgPSB0aGlzLmNvcmVDb25maWcuZ2V0U3luY2VkQ29sbGVjdGlvbnMoKTtcbiAgICBpZiAoY29sbGVjdGlvbnMgJiYgY29sbGVjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHByb21pc2VzID0gY29sbGVjdGlvbnMubWFwKGVudHJ5ID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHRoaXMuY2FjaGUuY2xlYXJEYXRhYmFzZUNvbGxlY3Rpb24oZW50cnkubmFtZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLnByb21pc2Uuc2VxdWVudGlhbChwcm9taXNlcyk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cblxuICBnZXREZWxldGVkRW50aXRpZXMoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZGF0YTogSUVudGl0eVtdKSB7XG4gICAgZGF0YSA9IGRhdGEgfHwgW107XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdidXNpbmVzc2xvZ2ljL2dldERlbGV0ZWRJZHMnO1xuICAgIGxldCBtb2RlbE5hbWUgPSBNb2RlbHMuZml4Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUsIHRydWUpO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IG1vZGVsTmFtZSwgaWRzOiBkYXRhLm1hcChlID0+IGUuX2lkKSB9KS5waXBlKFxuICAgICAgbWFwKHJldFZhbCA9PiB7XG4gICAgICAgIGlmIChyZXRWYWwpIHtcbiAgICAgICAgICByZXR1cm4gcmV0VmFsIHx8IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldE9mZmxpbmVFbnRpdGllc0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnVwbG9hZERhdGFiYXNlT3JHZXRDb3VudCh0cnVlKTtcbiAgfVxuXG4gIHVwbG9hZERhdGFiYXNlKHByb2dyZXNzRW1pdHRlcj86IEV2ZW50RW1pdHRlcjxudW1iZXI+KSB7XG4gICAgcmV0dXJuIHRoaXMudXBsb2FkRGF0YWJhc2VPckdldENvdW50KGZhbHNlLCBwcm9ncmVzc0VtaXR0ZXIpO1xuICB9XG5cbiAgdXBsb2FkRGF0YWJhc2VPckdldENvdW50KHJldHVybkNvdW50OiBib29sZWFuLCBwcm9ncmVzc0VtaXR0ZXI/OiBFdmVudEVtaXR0ZXI8bnVtYmVyPikge1xuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBsZXQgb2ZmbGluZURhdGEgPSB7fTtcblxuICAgIGlmICghdGhpcy5pc1VwbG9hZGluZ0RhdGFiYXNlIHx8IHRoaXMubmV0d29yay5pc09mZmxpbmUoKSkge1xuICAgICAgdGhpcy5pc1VwbG9hZGluZ0RhdGFiYXNlID0gdHJ1ZTtcbiAgICAgIGxldCBjb2xsZWN0aW9ucyA9IHRoaXMuY29yZUNvbmZpZy5nZXRTeW5jZWRDb2xsZWN0aW9ucygpO1xuXG4gICAgICByZXR1cm4gdGhpcy5jYWNoZS5nZXREYXRhYmFzZUNvbGxlY3Rpb248SUN1c3RvbU1vZGVsPignY3VzdG9tbW9kZWxzJykudGhlbihjdXN0b21tb2RlbHMgPT4ge1xuICAgICAgICBpZiAoY29sbGVjdGlvbnMgJiYgY29sbGVjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbGxlY3Rpb25zID0gY2xvbmVEZWVwKGNvbGxlY3Rpb25zKTtcbiAgICAgICAgICBjb2xsZWN0aW9ucyA9IGNvbGxlY3Rpb25zLmNvbmNhdChjdXN0b21tb2RlbHMubWFwKGMgPT4gKHsgbmFtZTogYy5uYW1lIH0pKSk7XG4gICAgICAgICAgbGV0IHByb21pc2VzQ291bnQgPSBjb2xsZWN0aW9ucy5tYXAoZW50cnkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICgpID0+XG4gICAgICAgICAgICAgIHRoaXMuY2FjaGUuZ2V0RGF0YWJhc2VDb2xsZWN0aW9uKGVudHJ5Lm5hbWUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuZmlsdGVyKGUgPT4gdGhpcy5pc09mZmxpbmVFbnRpdHkoZSkgJiYgKGUgYXMgYW55KS5zdGF0dXMgIT09ICdkcmFmdCcpO1xuICAgICAgICAgICAgICAgIG9mZmxpbmVEYXRhW2VudHJ5Lm5hbWVdID0gZGF0YTtcbiAgICAgICAgICAgICAgICB0b3RhbCArPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZS5zZXF1ZW50aWFsKHByb21pc2VzQ291bnQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJldHVybkNvdW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuaXNVcGxvYWRpbmdEYXRhYmFzZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmxvZy5sb2coJ3VwbG9hZERhdGFiYXNlJywgJ3RvdGFsJywgdG90YWwpO1xuICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NFbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NFbWl0dGVyLmVtaXQodG90YWwgPiAwID8gKGNvdW50IC8gdG90YWwpICogMTAwIDogMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGV0IHByb21pc2VzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICAgICAgICAgIGlmICh0b3RhbCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9ucy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gb2ZmbGluZURhdGFbZW50cnkubmFtZV07XG4gICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZW50aXR5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZmxpbmVJZCA9IGVudGl0eS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgZW50aXR5ID0geyAuLi5lbnRpdHkgfTtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZW50aXR5Ll9pZDtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cHNlcnQoZW50cnkubmFtZSwgZW50aXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXRWYWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3NFbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NFbWl0dGVyLmVtaXQoKGNvdW50IC8gdG90YWwpICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5sb2coJ3VwbG9hZERhdGFiYXNlJywgJ2NvdW50JywgY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZS5yZXBsYWNlRnJvbURhdGFiYXNlQ29sbGVjdGlvbihlbnRyeS5uYW1lLCBvZmZsaW5lSWQsIHJldFZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlLnNlcXVlbnRpYWwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzRW1pdHRlcikge1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0VtaXR0ZXIuZW1pdCgxMDApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1VwbG9hZGluZ0RhdGFiYXNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmV0dXJuQ291bnQgPyAwIDogbnVsbCk7XG4gIH1cblxuICBpc09mZmxpbmVFbnRpdHkoZW50aXR5OiBJRW50aXR5KSB7XG4gICAgcmV0dXJuIGVudGl0eSAmJiBlbnRpdHkuX2lkICYmIHRoaXMuaXNPZmZsaW5lSWQoZW50aXR5Ll9pZCk7XG4gIH1cblxuICBpc09mZmxpbmVJZChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGlkICYmIGlkLnN0YXJ0c1dpdGggJiYgaWQuc3RhcnRzV2l0aChDYWNoZS5PRkZMSU5FX1BSRUZJWCk7XG4gIH1cblxuICBnZXRBbGxPZmZsaW5lKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIG9mZmxpbmVPbmx5OiBib29sZWFuLCBzZWFyY2g/OiBzdHJpbmcsIGZpbHRlcnM/OiBGaWx0ZXJzLCBzb3J0cz86IEFycmF5PElTb3J0Piwgc2tpcCA9IDAsIGxpbWl0ID0gMjAsIGN1c3RvbUZpbHRlciA9IG51bGwsIG5vQ291bnQ6IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIGZyb20oXG4gICAgICB0aGlzLmNhY2hlLmdldERhdGFiYXNlQ29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgbGV0IG1vZGVsID0gTW9kZWxzLmdldE1vZGVsQnlDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSk7XG4gICAgICAgIGlmIChvZmZsaW5lT25seSkge1xuICAgICAgICAgIGRhdGEgPSBkYXRhLmZpbHRlcihkID0+IHRoaXMuaXNPZmZsaW5lRW50aXR5KGQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWx0ZXJzICYmIGZpbHRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxldCBuZXdEYXRhOiBBcnJheTxJRW50aXR5PiA9IFtdO1xuICAgICAgICAgIGZpbHRlcnMuZm9yRWFjaChmcyA9PiB7XG4gICAgICAgICAgICBsZXQgc3ViRGF0YSA9IFsuLi5kYXRhXTtcbiAgICAgICAgICAgIGZzLmZpbHRlcihmID0+IGYucmVtb3ZlRnJvbU9mZmxpbmUgIT09IHRydWUpLmZvckVhY2goZiA9PiB7XG4gICAgICAgICAgICAgIHN1YkRhdGEgPSBzdWJEYXRhLmZpbHRlcihlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBpc0FycmF5KGYudmFsdWUpICYmIGlzT2JqZWN0KGYudmFsdWVbMF0pID8gbG9kYXNoTWFwKGYudmFsdWUsICdfaWQnKSA6IGlzQXJyYXkoZi52YWx1ZSkgPyBmLnZhbHVlIDogaXNPYmplY3QoZi52YWx1ZSkgPyBmLnZhbHVlLl9pZCA6IGYudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGUgJiYgZVtmLmZpZWxkXSAhPT0gdW5kZWZpbmVkICYmIGVbZi5maWVsZF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZi5vcGVyYXRvci5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZXEnOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc0VxdWFsKGVbZi5maWVsZF0sIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbmVxJzpcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzRXF1YWwoZVtmLmZpZWxkXSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnEnOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcnNlY3Rpb24oW10uY29uY2F0KGVbZi5maWVsZF0pLCBbXS5jb25jYXQodmFsdWUpKS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICduaW4nOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcnNlY3Rpb24oW10uY29uY2F0KGVbZi5maWVsZF0pLCBbXS5jb25jYXQodmFsdWUpKS5sZW5ndGggPD0gMDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3QnOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlW2YuZmllbGRdID4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2d0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVbZi5maWVsZF0gPj0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2x0JzpcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZVtmLmZpZWxkXSA8IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsdGUnOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlW2YuZmllbGRdIDw9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICduZWFyU3BoZXJlJzpcbiAgICAgICAgICAgICAgICAgICAgICAoZSBhcyBhbnkpLmRpc3RhbmNlID0gdGhpcy5nZW9sb2MuZ2V0RGlzdGFuY2UoZVtmLmZpZWxkXVsxXSwgZVtmLmZpZWxkXVswXSwgdmFsdWVbMV0sIHZhbHVlWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGUgYXMgYW55KS5kaXN0YW5jZSA8IGYubWF4O1xuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdleGlzdHMnOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNOdWxsT3JVbmRlZmluZWQoZVtmLmZpZWxkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZi5vcGVyYXRvci5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbmVxJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbmluJzpcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnEnOlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5pbmRleE9mKG51bGwpID49IDA7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmV3RGF0YSA9IFsuLi5uZXdEYXRhLCAuLi5zdWJEYXRhXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkYXRhID0gdW5pcUJ5KG5ld0RhdGEsIGUgPT4gZS5faWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlYXJjaCAmJiBtb2RlbCAmJiBtb2RlbC5zZWFyY2hhYmxlRmllbGRzKSB7XG4gICAgICAgICAgZGF0YSA9IGRhdGEuZmlsdGVyKGQgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBtb2RlbC5zZWFyY2hhYmxlRmllbGRzLnNvbWUoXG4gICAgICAgICAgICAgICAgbmFtZSA9PlxuICAgICAgICAgICAgICAgICAgZFtuYW1lXSAmJlxuICAgICAgICAgICAgICAgICAgZFtuYW1lXVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgICAgICAudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZihzZWFyY2gudG9VcHBlckNhc2UoKSkgPj0gMFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVycy5zb21lKGZzID0+IGZzLnNvbWUoZiA9PiBmLm9wZXJhdG9yLl9pZCA9PT0gJ25lYXJTcGhlcmUnKSkpIHtcbiAgICAgICAgICBkYXRhID0gb3JkZXJCeShkYXRhLCBbJ2Rpc3RhbmNlJ10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3J0cykge1xuICAgICAgICAgIGRhdGEgPSBvcmRlckJ5KGRhdGEsIHNvcnRzLm1hcChzID0+IHMuY29sSWQpLCBzb3J0cy5tYXAocyA9PiBzLnNvcnQpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdG90YWwgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgaWYgKGxpbWl0ID4gMCkge1xuICAgICAgICAgIHNraXAgPSBza2lwIHx8IDA7XG4gICAgICAgICAgZGF0YSA9IGRhdGEuc2xpY2Uoc2tpcCwgc2tpcCArIGxpbWl0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9Db3VudCA/IGRhdGEgOiB7IGNvdW50OiB0b3RhbCwgZGF0YTogZGF0YSB9O1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgYWdncmVnYXRlUXVlcnkoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZmlsdGVycz86IEZpbHRlcnMsIGFnZ3JlZ2F0ZU9wdGlvbnM/OiBBcnJheTxhbnk+LCBzZWFyY2g/OiBzdHJpbmcsIGV4Y2x1ZGVkRmllbGRzPzogQXJyYXk8YW55PiwgaW5jbHVkZUNvdW50ID0gZmFsc2UsIGNhY2hlSWQ6IHN0cmluZyA9IG51bGwsIGN1c3RvbUZpbHRlcj86IGFueSwgc3ViUXVlcnk/OiBTdWJRdWVyeSwgYWdncmVnYXRlT3B0aW9uc09mZmxpbmU/OiBhbnkpIHtcbiAgICBsZXQgb2JzOiBPYnNlcnZhYmxlPGFueT47XG4gICAgY29sbGVjdGlvbk5hbWUgPSBNb2RlbHMuZml4Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUsIHRydWUpO1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIGlmIChjYWNoZUlkKSB7XG4gICAgICAgIG9icyA9IGZyb20odGhpcy5sb2NhbEZvcmFnZS5nZXQoY2FjaGVJZCkpO1xuICAgICAgfSBlbHNlIGlmIChhZ2dyZWdhdGVPcHRpb25zT2ZmbGluZSkge1xuICAgICAgICBvYnMgPSBmcm9tKFxuICAgICAgICAgIHRoaXMuY2FjaGUuZ2V0RGF0YWJhc2VDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGFnZ3JlZ2F0ZU9wdGlvbnNPZmZsaW5lKGRhdGEpO1xuICAgICAgICAgICAgaWYgKGluY2x1ZGVDb3VudCkge1xuICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBbeyBjb3VudDogZGF0YS5sZW5ndGgsIGRhdGE6IGRhdGEgfV0gfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IGRhdGEgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzID0gb2YoeyBjb3VudDogMCwgZGF0YTogW10gfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb2xsZWN0aW9uTmFtZSA9PT0gJ2FnZ3JlZ2F0ZUxvZ3MnKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGVMb2dzKGFnZ3JlZ2F0ZU9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvYWdncmVnYXRlUXVlcnknO1xuICAgICAgbGV0IHF1ZXJ5OiBRdWVyeSA9IHRoaXMuZ2V0QWdncmVnYXRlUXVlcnkoY29sbGVjdGlvbk5hbWUsIGZpbHRlcnMsIGFnZ3JlZ2F0ZU9wdGlvbnMsIHNlYXJjaCwgZXhjbHVkZWRGaWVsZHMsIGluY2x1ZGVDb3VudCwgY3VzdG9tRmlsdGVyLCBzdWJRdWVyeSk7XG4gICAgICBvYnMgPSB0aGlzLnJxLnBvc3QodXJsLCB7IHBhcmFtczogcXVlcnkgfSkucGlwZShcbiAgICAgICAgbWFwKHJldFZhbCA9PiB7XG4gICAgICAgICAgaWYgKGNhY2hlSWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxGb3JhZ2Uuc2V0KGNhY2hlSWQsIHJldFZhbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBvYnMucGlwZShcbiAgICAgIG1hcCgocmV0VmFsOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSBbXTtcbiAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuZGF0YSAmJiByZXRWYWwuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKGluY2x1ZGVDb3VudCkge1xuICAgICAgICAgICAgZGF0YSA9IHJldFZhbC5kYXRhWzBdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gcmV0VmFsLmRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgYWdncmVnYXRlUXVlcmllcyhxdWVyaWVzOiBBcnJheTxRdWVyeT4sIGluY2x1ZGVDb3VudCA9IGZhbHNlLCBjYWNoZUlkOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgbGV0IG9iczogT2JzZXJ2YWJsZTxhbnk+O1xuICAgIGlmICh0aGlzLm5ldHdvcmsuaXNPZmZsaW5lKCkpIHtcbiAgICAgIGlmIChjYWNoZUlkKSB7XG4gICAgICAgIG9icyA9IGZyb20odGhpcy5sb2NhbEZvcmFnZS5nZXQoY2FjaGVJZCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JzID0gb2YoeyBjb3VudDogMCwgZGF0YTogW10gfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnYnVzaW5lc3Nsb2dpYy9hZ2dyZWdhdGVRdWVyaWVzJztcbiAgICAgIG9icyA9IHRoaXMucnEucG9zdCh1cmwsIHF1ZXJpZXMpLnBpcGUoXG4gICAgICAgIG1hcCgocmV0VmFsOiB7IGRhdGE6IEFycmF5PGFueT4gfSkgPT4ge1xuICAgICAgICAgIGxldCBmaW5hbEFycmF5ID0gQXJyYXkocXVlcmllcy5sZW5ndGgpO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmluYWxBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZmluYWxBcnJheVtpXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5kYXRhICYmIHJldFZhbC5kYXRhLnNvbWUoZCA9PiBpc09iamVjdChkLmRvYykpKSB7XG4gICAgICAgICAgICByZXRWYWwuZGF0YS5mb3JFYWNoKChkOiB7IGluZGV4OiBudW1iZXI7IGRvYzogYW55IH0pID0+IHtcbiAgICAgICAgICAgICAgZmluYWxBcnJheVtkLmluZGV4XSA9IGZpbmFsQXJyYXlbZC5pbmRleF0gfHwgW107XG4gICAgICAgICAgICAgIGZpbmFsQXJyYXlbZC5pbmRleF0ucHVzaChkLmRvYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldFZhbC5kYXRhID0gZmluYWxBcnJheTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJldFZhbCAmJiBpc0FycmF5KHJldFZhbC5kYXRhKSAmJiByZXRWYWwuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldFZhbC5kYXRhID0gZmluYWxBcnJheTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY2FjaGVJZCkge1xuICAgICAgICAgICAgdGhpcy5sb2NhbEZvcmFnZS5zZXQoY2FjaGVJZCwgcmV0VmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9icy5waXBlKFxuICAgICAgbWFwKChyZXRWYWw6IGFueSkgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IFtdO1xuICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5kYXRhICYmIHJldFZhbC5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpZiAoaW5jbHVkZUNvdW50KSB7XG4gICAgICAgICAgICBkYXRhID0gcmV0VmFsLmRhdGFbMF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSByZXRWYWwuZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRBZ2dyZWdhdGVRdWVyeShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBmaWx0ZXJzPzogRmlsdGVycywgYWdncmVnYXRlT3B0aW9ucz86IEFycmF5PGFueT4sIHNlYXJjaD86IHN0cmluZywgZXhjbHVkZWRGaWVsZHM/OiBBcnJheTxhbnk+LCBpbmNsdWRlQ291bnQgPSBmYWxzZSwgY3VzdG9tRmlsdGVyPzogYW55LCBzdWJRdWVyeT86IFN1YlF1ZXJ5KSB7XG4gICAgbGV0IG1hdGNoID0ge307XG4gICAgbGV0IHByb2plY3QgPSB7fTtcbiAgICBsZXQgZmlsdGVyV2hlcmUgPSBudWxsO1xuICAgIGxldCBzZWFyY2hXaGVyZSA9IG51bGw7XG4gICAgbGV0IGRlZmF1bHRGaWVsZHMgPSBbXTtcbiAgICBsZXQgcXVlcnk6IFF1ZXJ5ID0gPFF1ZXJ5PntcbiAgICAgIGNvbGxlY3Rpb25OYW1lOiBNb2RlbHMuZml4Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUsIHRydWUpLFxuICAgICAgaW5jbHVkZUNvdW50XG4gICAgfTtcbiAgICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZpbHRlcldoZXJlID0gTW9kZWxzLmV4cG9ydFdoZXJlKGNvbGxlY3Rpb25OYW1lLCBmaWx0ZXJzLCBleGNsdWRlZEZpZWxkcyk7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaCkge1xuICAgICAgc2VhcmNoV2hlcmUgPSBNb2RlbHMuZXhwb3J0U2VhcmNoKGNvbGxlY3Rpb25OYW1lLCBzZWFyY2gpO1xuICAgIH1cblxuICAgIGlmIChzZWFyY2hXaGVyZSAmJiBmaWx0ZXJXaGVyZSkge1xuICAgICAgcXVlcnkud2hlcmUgPSB7IGFuZDogW3NlYXJjaFdoZXJlLCBmaWx0ZXJXaGVyZV0gfTtcbiAgICB9IGVsc2UgaWYgKHNlYXJjaFdoZXJlKSB7XG4gICAgICBxdWVyeS53aGVyZSA9IHNlYXJjaFdoZXJlO1xuICAgIH0gZWxzZSBpZiAoZmlsdGVyV2hlcmUpIHtcbiAgICAgIHF1ZXJ5LndoZXJlID0gZmlsdGVyV2hlcmU7XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbUZpbHRlciAmJiBxdWVyeS53aGVyZSkge1xuICAgICAgcXVlcnkud2hlcmUgPSB7IGFuZDogW3F1ZXJ5LndoZXJlLCBjdXN0b21GaWx0ZXJdIH07XG4gICAgfSBlbHNlIGlmIChjdXN0b21GaWx0ZXIpIHtcbiAgICAgIHF1ZXJ5LndoZXJlID0gY3VzdG9tRmlsdGVyO1xuICAgIH1cbiAgICBxdWVyeS53aGVyZSA9IHF1ZXJ5LndoZXJlIHx8IHt9O1xuXG4gICAgaWYgKGRlZmF1bHRGaWVsZHMgJiYgZGVmYXVsdEZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICBkZWZhdWx0RmllbGRzLmZvckVhY2goKGZpZWxkLCBpKSA9PiB7XG4gICAgICAgIHByb2plY3RbZmllbGRdID0gMTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghaXNFbXB0eShwcm9qZWN0KSkge1xuICAgICAgYWdncmVnYXRlT3B0aW9ucy51bnNoaWZ0KHsgJHByb2plY3Q6IHByb2plY3QgfSk7XG4gICAgfVxuICAgIGlmICghaXNFbXB0eShtYXRjaCkpIHtcbiAgICAgIGFnZ3JlZ2F0ZU9wdGlvbnMudW5zaGlmdCh7ICRtYXRjaDogbWF0Y2ggfSk7XG4gICAgfVxuXG4gICAgcXVlcnkub3B0aW9ucyA9IGFnZ3JlZ2F0ZU9wdGlvbnM7XG4gICAgcXVlcnkuc3ViUXVlcnkgPSBNb2RlbHMuZXhwb3J0U3ViUXVlcnkoY29sbGVjdGlvbk5hbWUsIGZpbHRlcnMsIHRydWUpO1xuICAgIGlmIChzdWJRdWVyeSkge1xuICAgICAgcXVlcnkuc3ViUXVlcnkgPSBzdWJRdWVyeTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgYWdncmVnYXRlTG9ncyhzdGFnZXM/OiBBcnJheTxhbnk+LCBncm91cHM/OiBBcnJheTxzdHJpbmc+LCB1c2VySWRzPzogQXJyYXk8c3RyaW5nPikge1xuICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnQWRtaW5EYXNoYm9hcmQvYWdncmVnYXRlTG9ncyc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgc3RhZ2VzLCBncm91cHMsIHVzZXJJZHMgfSk7XG4gIH1cblxuICB0ZXh0U2VhcmNoKHF1ZXJ5OiBzdHJpbmcsIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvdGV4dFNlYXJjaCc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgcXVlcnksIG1vZGVsTmFtZTogY29sbGVjdGlvbk5hbWUgfSk7XG4gIH1cblxuICBjcmVhdGVGaWxlKGZpbGU6IEZpbGUsIGdyb3VwOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBoaWRlTW9iaWxlID0gdHJ1ZSwgZmlsZU5hbWU/OiBzdHJpbmcsIHRlbmFudFJlZj86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnVwc2VydCgnZmlsZXMnLCB7XG4gICAgICBfZG93bmxvYWRVUkw6IGZpbGUsXG4gICAgICBfZmlsZW5hbWU6IGZpbGUubmFtZSxcbiAgICAgIGdyb3VwOiBncm91cCxcbiAgICAgIGhpZGVNb2JpbGU6IGhpZGVNb2JpbGUsXG4gICAgICBtaW1lVHlwZTogZmlsZS50eXBlLFxuICAgICAgc2l6ZTogZmlsZS5zaXplLFxuICAgICAgX3RlbmFudFJlZjogdGVuYW50UmVmXG4gICAgfSk7XG4gIH1cblxuICBnZXRGaWxlVXBsb2FkZXIoZmlsZVR5cGVzPywgbWF4RmlsZVNpemU/KSB7XG4gICAgbGV0IG9wdGlvbnM6IGFueSA9IHtcbiAgICAgIG1heEZpbGVTaXplOiBtYXhGaWxlU2l6ZSxcbiAgICAgIHVybDogdGhpcy5jb25maWcudXBsb2FkVXJsXG4gICAgfTtcbiAgICAvLyBpZiAoZmlsZVR5cGVzICYmIGZpbGVUeXBlcy5sZW5ndGggPiAwKSB7XG4gICAgLy8gICAgIG9wdGlvbnMuYWxsb3dlZEZpbGVUeXBlID0gZmlsZVR5cGVzO1xuICAgIC8vIH1cbiAgICByZXR1cm4gbmV3IEZpbGVVcGxvYWRlcihvcHRpb25zKTtcbiAgfVxuXG4gIGV4ZWN1dGUocGFyYW1zKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdFbmRwb2ludHMvZXhlY3V0ZSc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgcGFyYW1zIH0pO1xuICB9XG5cbiAgdW5kb09wZXJhdGlvbihvcGVyYXRpb25JZDogc3RyaW5nKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdvcGVyYXRpb24vdW5kb0RlbGV0ZSc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgb3BlcmF0aW9uSWQgfSk7XG4gIH1cblxuICBnZXRNYXJrZXJzKGxvY2F0aW9uczogQXJyYXk8TG9jYXRpb24+KSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uc1xuICAgICAgLmZpbHRlcigobDogTG9jYXRpb24pID0+IGwuX2dlb2xvYyAmJiBsLl9nZW9sb2MubGVuZ3RoID4gMSlcbiAgICAgIC5tYXAoKGw6IExvY2F0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgX2lkOiBsLl9pZCxcbiAgICAgICAgICBhZGRyZXNzOiBsLmFkZHJlc3MsXG4gICAgICAgICAgbGF0aXR1ZGU6IGwuX2dlb2xvY1sxXSxcbiAgICAgICAgICBsb25naXR1ZGU6IGwuX2dlb2xvY1swXSxcbiAgICAgICAgICB0aXRsZTogbC50aXRsZSxcbiAgICAgICAgICBjb2xvcjogbC5zdGF0dXMgPT09ICdwbGFjZScgPyAnc3VjY2VzcycgOiBsLnN0YXR1cyA9PT0gJ2ZpbGUnID8gJ2luZm8nIDogbC5zdGF0dXMgPT09ICdlcnJvcicgPyAnZGFuZ2VyJyA6IGwuc3RhdHVzID09PSAncHJlZGljdGlvbicgPyAnc3RhYmxlJyA6ICdkYXJrJ1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cblxuICBnZXRVc2VyT3JMb2NhdGlvblN0YXQoXG4gICAgaWQ6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sXG4gICAgbW9kZTogc3RyaW5nLFxuICAgIGN1c3RvbUZpbHRlcj86IGFueVxuICApOiBPYnNlcnZhYmxlPFxuICAgIEFycmF5PHtcbiAgICAgIF9pZDogc3RyaW5nO1xuICAgICAgYm9va2VkOiBudW1iZXI7XG4gICAgICBjb3VudDogbnVtYmVyO1xuICAgICAgZmluaXNoZWQ6IG51bWJlcjtcbiAgICAgIGFyY2hpdmVkOiBudW1iZXI7XG4gICAgICB2YWxpZGF0ZWQ6IG51bWJlcjtcbiAgICAgIHJlamVjdGVkOiBudW1iZXI7XG4gICAgICB0b2JldmFsaWRhdGVkOiBudW1iZXI7XG4gICAgICBhdmFpbGFibGU6IG51bWJlcjtcbiAgICB9PlxuICA+IHtcbiAgICBsZXQgdmFsdWU6IEFycmF5PGFueT4gPSA8YW55Pihpc1N0cmluZyhpZCkgPyBbeyBfaWQ6IGlkIH1dIDogaWQpO1xuICAgIGxldCByZWYgPSBtb2RlID09PSAnY2FtcGFpZ24nID8gJ2Rlc2NyaXB0aW9uUmVmJyA6IG1vZGUgPT09ICdsb2NhdGlvbicgPyAnbG9jYXRpb25SZWYnIDogJ293bmVyUmVmJztcbiAgICBsZXQgZmlsdGVycyA9IFtbeyBmaWVsZDogcmVmLCBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sIHZhbHVlOiB2YWx1ZSB9XV07XG5cbiAgICBsZXQgb3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgJHByb2plY3Q6IHtcbiAgICAgICAgICBfaWQ6ICckJyArIHJlZixcbiAgICAgICAgICBib29rZWQ6IHsgJGNvbmQ6IHsgaWY6IHsgJGVxOiBbJyRzdGF0dXMnLCAnYm9va2VkJ10gfSwgdGhlbjogMSwgZWxzZTogMCB9IH0sXG4gICAgICAgICAgZmluaXNoZWQ6IHsgJGNvbmQ6IHsgaWY6IHsgJGVxOiBbJyRzdGF0dXMnLCAnZmluaXNoZWQnXSB9LCB0aGVuOiAxLCBlbHNlOiAwIH0gfSxcbiAgICAgICAgICBhcmNoaXZlZDogeyAkY29uZDogeyBpZjogeyAkZXE6IFsnJHN0YXR1cycsICdhcmNoaXZlZCddIH0sIHRoZW46IDEsIGVsc2U6IDAgfSB9LFxuICAgICAgICAgIHZhbGlkYXRlZDogeyAkY29uZDogeyBpZjogeyAkZXE6IFsnJHZhbGlkYXRlZCcsIHRydWVdIH0sIHRoZW46IDEsIGVsc2U6IDAgfSB9LFxuICAgICAgICAgIHJlamVjdGVkOiB7ICRjb25kOiB7IGlmOiB7ICRlcTogWyckdmFsaWRhdGVkJywgZmFsc2VdIH0sIHRoZW46IDEsIGVsc2U6IDAgfSB9LFxuICAgICAgICAgIGZpbmlzaGVkRGF0ZTogJyRmaW5pc2hlZERhdGUnXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgIF9pZDogJyRfaWQnLFxuICAgICAgICAgIGJvb2tlZDogeyAkc3VtOiAnJGJvb2tlZCcgfSxcbiAgICAgICAgICBmaW5pc2hlZDogeyAkc3VtOiAnJGZpbmlzaGVkJyB9LFxuICAgICAgICAgIGFyY2hpdmVkOiB7ICRzdW06ICckYXJjaGl2ZWQnIH0sXG4gICAgICAgICAgdmFsaWRhdGVkOiB7ICRzdW06ICckdmFsaWRhdGVkJyB9LFxuICAgICAgICAgIHJlamVjdGVkOiB7ICRzdW06ICckcmVqZWN0ZWQnIH0sXG4gICAgICAgICAgbGF0ZXN0OiB7ICRtYXg6ICckZmluaXNoZWREYXRlJyB9LFxuICAgICAgICAgIGNvdW50OiB7ICRzdW06IDEgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgICByZXR1cm4gdGhpcy5hZ2dyZWdhdGVRdWVyeSgnbWlzc2lvbnMnLCBmaWx0ZXJzLCBvcHRpb25zLCBudWxsLCBudWxsLCBmYWxzZSwgbnVsbCwgY3VzdG9tRmlsdGVyKS5waXBlKFxuICAgICAgbWFwKChzdGF0czogYW55KSA9PiB7XG4gICAgICAgIGlmIChzdGF0cyAmJiBzdGF0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgc3RhdHNbMF0uYXZhaWxhYmxlID0gKHN0YXRzWzBdLmNvdW50IHx8IDApIC0gKHN0YXRzWzBdLmZpbmlzaGVkIHx8IDApIC0gKHN0YXRzWzBdLmJvb2tlZCB8fCAwKSAtIChzdGF0c1swXS5hcmNoaXZlZCB8fCAwKTtcbiAgICAgICAgICBzdGF0c1swXS50b2JldmFsaWRhdGVkID0gKHN0YXRzWzBdLmZpbmlzaGVkIHx8IDApIC0gKHN0YXRzWzBdLnZhbGlkYXRlZCB8fCAwKSAtIChzdGF0c1swXS5yZWplY3RlZCB8fCAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdHM7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBzZXRUaW1lc2NhbGUoZmlsdGVyczogRmlsdGVycywgdGltZXNjYWxlOiBzdHJpbmcsIGRhdGVGaWVsZCA9ICdmaW5pc2hlZERhdGUnLCBlbmREYXRlPzogRGF0ZSB8IHN0cmluZywgcHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmICh0aW1lc2NhbGUpIHtcbiAgICAgIGZpbHRlcnMgPSBmaWx0ZXJzIHx8IFtdO1xuICAgICAgZmlsdGVycy5mb3JFYWNoKGZzID0+IHtcbiAgICAgICAgZnMgPSBmcyB8fCBbXTtcbiAgICAgICAgcmVtb3ZlKGZzLCAoZjogYW55KSA9PiBmLmZpZWxkID09PSBkYXRlRmllbGQpO1xuICAgICAgICBmcy5wdXNoKHtcbiAgICAgICAgICBmaWVsZDogZGF0ZUZpZWxkLFxuICAgICAgICAgIG9wZXJhdG9yOiB7IF9pZDogJ2JldHdlZW4nLCBpbnRlcnZhbDogdHJ1ZSB9LFxuICAgICAgICAgIHZhbHVlOiBnZXRTdGFydEFuZEVuZERhdGVzKHRpbWVzY2FsZSwgZW5kRGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHByZXZpb3VzKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhc0ZpbGVzKGVudGl0eSwgc3VmZml4czogQXJyYXk8c3RyaW5nPiA9IFtdKTogYm9vbGVhbiB7XG4gICAgbGV0IHJldFZhbCA9IGZhbHNlO1xuICAgIGZvciAobGV0IHByb3AgaW4gZW50aXR5KSB7XG4gICAgICBpZiAoZW50aXR5Lmhhc093blByb3BlcnR5KHByb3ApICYmIHRoaXMuZmlsZXMuaXNJbWFnZUZpbGUoZW50aXR5W3Byb3BdKSkge1xuICAgICAgICByZXRWYWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZm9yRWFjaChzdWZmaXhzLCBzdWZmaXggPT4ge1xuICAgICAgICBpZiAoc3VmZml4KSB7XG4gICAgICAgICAgbGV0IG9iamVjdCA9IGdldChlbnRpdHksIHByb3AgKyBzdWZmaXgpO1xuICAgICAgICAgIGlmIChpc0FycmF5KG9iamVjdCkpIHtcbiAgICAgICAgICAgIC8vIGZvciBtdWx0aXBob3RvIGZpZWxkLCB2YWx1ZSBpcyBhbiBhcnJheTtcbiAgICAgICAgICAgIGxldCBleHRyYURhdGFTdWZmaXggPSAnLmV4dHJhRGF0YSc7XG4gICAgICAgICAgICBsZXQgZXh0cmFEYXRhID0gZ2V0KGVudGl0eSwgcHJvcCArIGV4dHJhRGF0YVN1ZmZpeCk7XG4gICAgICAgICAgICBvYmplY3QuZm9yRWFjaCgodiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsZXMuaXNJbWFnZUZpbGUodikpIHtcbiAgICAgICAgICAgICAgICByZXRWYWwgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChleHRyYURhdGEgJiYgZXh0cmFEYXRhW2luZGV4XSAmJiBleHRyYURhdGFbaW5kZXhdLmVkaXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWxlcy5pc0ltYWdlRmlsZShleHRyYURhdGFbaW5kZXhdLmVkaXQpKSB7XG4gICAgICAgICAgICAgICAgICByZXRWYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbGVzLmlzSW1hZ2VGaWxlKGdldChlbnRpdHksIHByb3AgKyBzdWZmaXgpKSkge1xuICAgICAgICAgICAgICByZXRWYWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRGaWxlUHJvcGVydGllcyhlbnRpdHksIHN1ZmZpeHM6IEFycmF5PHN0cmluZz4gPSBbXSk6IEFycmF5PHN0cmluZz4ge1xuICAgIGxldCByZXRWYWwgPSBbXTtcbiAgICBmb3IgKGxldCBwcm9wIGluIGVudGl0eSkge1xuICAgICAgaWYgKGVudGl0eS5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiB0aGlzLmZpbGVzLmlzSW1hZ2VGaWxlKGVudGl0eVtwcm9wXSkpIHtcbiAgICAgICAgcmV0VmFsLnB1c2gocHJvcCk7XG4gICAgICB9XG4gICAgICBmb3JFYWNoKHN1ZmZpeHMsIHN1ZmZpeCA9PiB7XG4gICAgICAgIGlmIChzdWZmaXgpIHtcbiAgICAgICAgICBsZXQgb2JqZWN0UGF0aCA9IGdldChlbnRpdHksIHByb3AgKyBzdWZmaXgpO1xuICAgICAgICAgIC8vIGZvciBtdWx0aXBob3RvIGZpZWxkLCB2YWx1ZSBpcyBhbiBhcnJheTsgYW5kIGZvciB0b2RvIHdpdGggbGlua2VkIG11bHRpIHBob3RvIHdlIG5lZWQgdG8gZG8gaXQgdG9cbiAgICAgICAgICBpZiAoaXNBcnJheShvYmplY3RQYXRoKSkge1xuICAgICAgICAgICAgbGV0IGV4dHJhRGF0YVN1ZmZpeHMgPSBbJy5leHRyYURhdGEnLCAnLnZhbHVlLmZpZWxkRXh0cmEnXTtcbiAgICAgICAgICAgIGV4dHJhRGF0YVN1ZmZpeHMuZm9yRWFjaChleHRyYURhdGFTdWZmaXggPT4ge1xuICAgICAgICAgICAgICBsZXQgZXh0cmFEYXRhID0gZ2V0KGVudGl0eSwgcHJvcCArIGV4dHJhRGF0YVN1ZmZpeCk7XG4gICAgICAgICAgICAgIG9iamVjdFBhdGguZm9yRWFjaCgodiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWxlcy5pc0ltYWdlRmlsZSh2KSkge1xuICAgICAgICAgICAgICAgICAgcmV0VmFsLnB1c2gocHJvcCArIHN1ZmZpeCArICdbJyArIGluZGV4ICsgJ10nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGV4dHJhRGF0YSAmJiBleHRyYURhdGFbaW5kZXhdICYmIGV4dHJhRGF0YVtpbmRleF0uZWRpdCkge1xuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsZXMuaXNJbWFnZUZpbGUoZXh0cmFEYXRhW2luZGV4XS5lZGl0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXRWYWwucHVzaChwcm9wICsgZXh0cmFEYXRhU3VmZml4ICsgJ1snICsgaW5kZXggKyAnXScgKyAnLmVkaXQnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbGVzLmlzSW1hZ2VGaWxlKG9iamVjdFBhdGgpKSB7XG4gICAgICAgICAgICAgIHJldFZhbC5wdXNoKHByb3AgKyBzdWZmaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldFZhbCA9IHVuaXEocmV0VmFsKTtcbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydEFuZEVuZERhdGVzKHRpbWVzY2FsZSwgZW5kRGF0ZT86IERhdGUgfCBzdHJpbmcsIGFtb3VudD86IG51bWJlciwgbm90c2xpZGluZz86IGJvb2xlYW4sIHByZXZpb3VzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgbGV0IGxhc3REYXRlID0gZW5kRGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICBhbW91bnQgPSBhbW91bnQgfHwgNztcbiAgbGV0IHBlcmlvZCA9ICdkYXlzJztcbiAgbGV0IHN0YXJ0b2YgPSAnZGF5JztcbiAgc3dpdGNoICh0aW1lc2NhbGUpIHtcbiAgICBjYXNlICdsYXN0MzBkYXlzJzpcbiAgICAgIGFtb3VudCA9IDMwO1xuICAgICAgcGVyaW9kID0gJ2RheXMnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGFzdDkwZGF5cyc6XG4gICAgICBhbW91bnQgPSA5MDtcbiAgICAgIHBlcmlvZCA9ICdkYXlzJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xhc3QzNjVkYXlzJzpcbiAgICAgIGFtb3VudCA9IDM2NTtcbiAgICAgIHBlcmlvZCA9ICdkYXlzJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xhc3R3ZWVrJzpcbiAgICAgIGFtb3VudCA9IDA7XG4gICAgICBwZXJpb2QgPSAnd2Vla3MnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGFzdG1vbnRoJzpcbiAgICAgIGFtb3VudCA9IDA7XG4gICAgICBwZXJpb2QgPSAnbW9udGhzJztcbiAgICAgIHN0YXJ0b2YgPSAnbW9udGgnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGFzdHF1YXJ0ZXInOlxuICAgICAgYW1vdW50ID0gMjtcbiAgICAgIHBlcmlvZCA9ICdtb250aHMnO1xuICAgICAgc3RhcnRvZiA9ICdtb250aCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsYXN0eWVhcic6XG4gICAgICBhbW91bnQgPSAwO1xuICAgICAgcGVyaW9kID0gJ3llYXJzJztcbiAgICAgIHN0YXJ0b2YgPSAneWVhcic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsYXN0N2RheXMnOlxuICAgICAgYW1vdW50ID0gNztcbiAgICAgIHBlcmlvZCA9ICdkYXlzJztcbiAgICAgIHN0YXJ0b2YgPSAnZGF5JztcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIGlmIChub3RzbGlkaW5nKSB7XG4gICAgICAgIGFtb3VudCA9IGFtb3VudCA/IGFtb3VudCAtIDEgOiAwO1xuICAgICAgICBwZXJpb2QgPSB0aW1lc2NhbGU7XG4gICAgICAgIHN0YXJ0b2YgPSB0aW1lc2NhbGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbW91bnQgPSBhbW91bnQgfHwgMTtcbiAgICAgICAgcGVyaW9kID0gdGltZXNjYWxlO1xuICAgICAgICBzdGFydG9mID0gJ2RheSc7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgbGV0IGRhdGVGcm9tID0gc3RhcnRPZihkYXRlQWRkKHV0Yyh0b0RhdGUobGFzdERhdGUpKSwgcGVyaW9kLCAtYW1vdW50KSwgc3RhcnRvZik7XG4gIGxldCBkYXRlVG8gPSB0b0RhdGUobGFzdERhdGUpO1xuXG4gIGlmIChwcmV2aW91cykge1xuICAgIGRhdGVGcm9tID0gZGF0ZUFkZChkYXRlRnJvbSwgcGVyaW9kLCAtYW1vdW50KTtcbiAgICBkYXRlVG8gPSBkYXRlQWRkKGRhdGVUbywgcGVyaW9kLCAtYW1vdW50KTtcbiAgfVxuXG4gIC8vdXNlIC51dGMoKSB0byBnZXQgdGhlIHN0YXJ0T2Ygd2l0aCBubyBvZmZzZXQgaXNzdWVzXG4gIHJldHVybiBbZGF0ZUZyb20udG9JU09TdHJpbmcoKSwgZGF0ZVRvLnRvSVNPU3RyaW5nKCldO1xufVxuIl19