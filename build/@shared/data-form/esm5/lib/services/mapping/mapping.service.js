/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Translate } from '@shared/translate';
import { Location, Xlsx, SIMPLE_FIELD_TYPES, Config, Broker, Requestor, Googlemaps, Models } from '@shared/data-core';
import { Conditions } from '../conditions/conditions.service';
import { of, forkJoin, timer } from 'rxjs';
import { mergeMap, map, concatMap, catchError, filter as filter$, take } from 'rxjs/operators';
import { forEach, find, findIndex, indexOf, filter, trimEnd, trimStart, get } from 'lodash-es';
var Mapping = /** @class */ (function () {
    function Mapping(rq, googlemaps, broker, conditionsService, config, translate, xlsx) {
        this.rq = rq;
        this.googlemaps = googlemaps;
        this.broker = broker;
        this.conditionsService = conditionsService;
        this.config = config;
        this.translate = translate;
        this.xlsx = xlsx;
        this._stringToArray = (/**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var array = str ? trimEnd(trimStart(str, '['), ']').split(',') : [];
            for (var i = 0; i < array.length; i++) {
                if (/^\s/.test(array[i])) {
                    array[i] = array[i].substring(1);
                }
            }
            return array;
        });
    }
    /**
     * @param {?} mapping
     * @return {?}
     */
    Mapping.prototype.getTotal = /**
     * @param {?} mapping
     * @return {?}
     */
    function (mapping) {
        if (mapping.document) {
            return this.xlsx.read(mapping.document).then((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                return data.length - 1;
            }));
        }
        else {
            return Promise.resolve(0);
        }
    };
    /**
     * @param {?} slides
     * @param {?} conditions
     * @return {?}
     */
    Mapping.prototype.convertMissionForExcelExport = /**
     * @param {?} slides
     * @param {?} conditions
     * @return {?}
     */
    function (slides, conditions) {
        /** @type {?} */
        var conditionsData = this.convertConditonsForExcelExport(conditions);
        /** @type {?} */
        var slidesData = this.convertSlidesForExcelExport(slides);
        return [slidesData, conditionsData];
    };
    /**
     * @param {?} slides
     * @return {?}
     */
    Mapping.prototype.convertSlidesForExcelExport = /**
     * @param {?} slides
     * @return {?}
     */
    function (slides) {
        /** @type {?} */
        var columns = [
            { name: 'id' },
            { name: 'pageTitle' },
            { name: 'pageDescription' },
            { name: 'title' },
            { name: 'description' },
            { name: 'type' },
            { name: 'allowComments' },
            { name: 'required' },
            { name: 'values' },
            { name: 'allowLibrary' },
            { name: 'min' },
            { name: 'max' },
            { name: 'step' },
            { name: 'minDate' },
            { name: 'maxDate' },
            { name: 'hideMobile' },
            { name: 'allowHistory' },
            { name: 'showOnLocation' },
            { name: 'allowAnnotate' },
            { name: 'showUsers' },
            { name: 'showService' },
            { name: 'allowOther' },
            { name: 'radius' },
            { name: 'multiple' },
            { name: 'clearable' },
            { name: 'duration' },
            { name: 'anwser' },
            { name: 'explanation' },
            { name: 'conditions' },
            { name: 'allowTime' },
            { name: 'image' }
        ];
        /** @type {?} */
        var data = [];
        //let counter = 1;
        forEach(slides, (/**
         * @param {?} slide
         * @return {?}
         */
        function (slide) {
            forEach(slide.items, (/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                data.push({
                    id: field.name,
                    pageTitle: slide.title,
                    pageDescription: slide.description,
                    title: field.title,
                    description: field.type === 'information' ? field.value : field.description,
                    type: field.type,
                    allowComments: field.allowComments,
                    required: field.required,
                    values: field.values,
                    allowLibrary: field.allowLibrary,
                    min: field.min,
                    max: field.max,
                    step: field.step,
                    minDate: field.minDate,
                    maxDate: field.maxDate,
                    hideMobile: field.hideMobile,
                    allowHistory: field.allowHistory,
                    showOnLocation: field.showOnLocation,
                    allowAnnotate: field.allowAnnotate,
                    showUsers: field.showUsers,
                    showService: field.showService,
                    allowOther: field.allowOther,
                    radius: field.radius,
                    multiple: field.multiple,
                    clearable: field.clearable,
                    duration: field.duration,
                    anwser: field.anwser,
                    explanation: field.explanation,
                    conditions: field.condition ? field.condition.map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return c.title; })) : '',
                    allowTime: field.allowTime,
                    image: field.image
                });
            }));
        }));
        return { columns: columns, data: data, title: 'Slides' };
    };
    /**
     * @param {?} conditions
     * @return {?}
     */
    Mapping.prototype.convertConditonsForExcelExport = /**
     * @param {?} conditions
     * @return {?}
     */
    function (conditions) {
        /** @type {?} */
        var columns = [{ name: 'title' }, { name: 'type' }, { name: 'field' }, { name: 'operator' }, { name: 'values' }, { name: 'id' }];
        /** @type {?} */
        var data = [];
        forEach(conditions, (/**
         * @param {?} condition
         * @return {?}
         */
        function (condition) {
            data.push({
                title: condition.title,
                type: condition.type,
                field: condition.field ? condition.field.name : '',
                operator: condition.operator,
                values: condition.values || condition.value || condition.tags || condition.group,
                id: condition._id
            });
        }));
        return { columns: columns, data: data, title: 'Conditions' };
    };
    /**
     * @param {?} mapping
     * @param {?} collectionName
     * @param {?=} progress
     * @return {?}
     */
    Mapping.prototype.upload = /**
     * @param {?} mapping
     * @param {?} collectionName
     * @param {?=} progress
     * @return {?}
     */
    function (mapping, collectionName, progress) {
        var _this = this;
        /** @type {?} */
        var publicCollectionName = Models.getPublicCollectionName(collectionName);
        return this.rq
            .postFile(this.config.publicApiUrl + publicCollectionName + '/import', mapping.document)
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
                    .pipe(filter$((/**
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
                    var errors = get(res, 'data.output.errors');
                    return errors || [];
                }));
            }
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    Mapping.prototype.convertTranslations = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        data.shift();
        /** @type {?} */
        var translations = [];
        forEach(data, (/**
         * @param {?} row
         * @param {?} i
         * @return {?}
         */
        function (row, i) {
            if (row[1]) {
                /** @type {?} */
                var translation = {
                    language: row[1],
                    key: row[2],
                    value: row[3],
                    en: row[4],
                    us: row[5],
                    fr: row[6],
                    es: row[7],
                    pl: row[8],
                    nl: row[9],
                    de: row[10],
                    it: row[11],
                    ru: row[12],
                    zhs: row[13],
                    zht: row[14],
                    pt: row[15],
                    kr: row[16],
                    ja: row[17],
                    ua: row[18],
                    he: row[19],
                    ar: row[20],
                    cz: row[21],
                    th: row[22],
                    tr: row[23],
                    bg: row[24],
                    el: row[25],
                    sl: row[26],
                    sk: row[27],
                    ro: row[28],
                    hu: row[29],
                    et: row[30],
                    br: row[31],
                    isReject: _this.isTrue(row[32]),
                    group: _this._stringToArray(row[33]),
                    isPhotoAnnotation: _this.isTrue(row[34])
                };
                if (row[0]) {
                    translation._id = row[0];
                }
                translations.push(translation);
            }
        }));
        return translations;
    };
    /**
     * @param {?} data
     * @param {?} progress
     * @param {?} cd
     * @return {?}
     */
    Mapping.prototype.convertLocations = /**
     * @param {?} data
     * @param {?} progress
     * @param {?} cd
     * @return {?}
     */
    function (data, progress, cd) {
        var _this = this;
        //: Observable<Array<Location>>
        data.shift();
        progress.total = data.length;
        /** @type {?} */
        var typeNames = [];
        data.forEach((/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            if (typeNames.indexOf(row[2]) < 0) {
                typeNames.push(row[2]);
            }
        }));
        return this.broker.getAll('locationtypes', null, null, null, [[{ field: 'name', operator: { _id: 'inq' }, value: typeNames }]]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), mergeMap((/**
         * @param {?} types
         * @return {?}
         */
        function (types) {
            /** @type {?} */
            var obs = [];
            data.forEach((/**
             * @param {?} row
             * @param {?} index
             * @return {?}
             */
            function (row, index) {
                if (row[0] && row[1]) {
                    /** @type {?} */
                    var location_1 = new Location();
                    location_1.title = row[0];
                    location_1.address = row[1];
                    location_1.placesearch = row[4] ? row[4] : location_1.title; // + ' ' + location.address;
                    location_1.contactname = row[5];
                    location_1.contactemail = row[6];
                    location_1.contactphone = row[7];
                    location_1.info = row[8];
                    location_1.tags = _this._stringToArray(row[9]);
                    location_1.notificationemail = row[10];
                    location_1.clientid = row[11];
                    if (row[12]) {
                        location_1._id = row[12];
                    }
                    else {
                        location_1._id = 'mapping_' + index;
                    }
                    if (row[13]) {
                        location_1.vip = _this.isTrue(row[13]);
                    }
                    location_1.type = types.find((/**
                     * @param {?} t
                     * @return {?}
                     */
                    function (t) { return t.name === row[2]; }));
                    if (row[14]) {
                        location_1.missiondescriptionsRef = _this._stringToArray(row[14]);
                    }
                    if (!row[3]) {
                        /** @type {?} */
                        var o = _this.googlemaps.resolveAddressLocation(location_1.address, _this.translate.getCurrentLanguage(), location_1.placesearch).pipe(map((/**
                         * @param {?} value
                         * @return {?}
                         */
                        function (value) {
                            if (value && value.coords) {
                                location_1.status = value.source;
                                location_1._geoloc = [value.coords.lng, value.coords.lat];
                            }
                            else {
                                location_1.status = 'error';
                            }
                            progress.count += 1;
                            cd.markForCheck();
                            return location_1;
                        })));
                        obs.push(o);
                    }
                    else {
                        location_1._geoloc = JSON.parse(row[3]);
                        location_1.status = 'file';
                        progress.count += 1;
                        cd.markForCheck();
                        obs.push(of(location_1));
                    }
                }
            }));
            return forkJoin(obs);
        })));
    };
    /**
     * @param {?} data
     * @param {?} formDynamicBuilder
     * @return {?}
     */
    Mapping.prototype.convertFormAndConditions = /**
     * @param {?} data
     * @param {?} formDynamicBuilder
     * @return {?}
     */
    function (data, formDynamicBuilder) {
        var _this = this;
        /** @type {?} */
        var convertError = [];
        /** @type {?} */
        var slides = (/** @type {?} */ ([]));
        /** @type {?} */
        var conditions = [];
        /** @type {?} */
        var fieldsDef = this.removeEmptyRows(data[0]);
        /** @type {?} */
        var conditionsDef = data.length >= 2 ? this.removeEmptyRows(data[1]) : [];
        fieldsDef.shift();
        conditionsDef.shift();
        /** @type {?} */
        var currentSlide = (/** @type {?} */ ({}));
        /** @type {?} */
        var fields = new Map();
        /** @type {?} */
        var conditionedFields = new Map();
        fieldsDef.forEach((/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            if (row[1] && currentSlide.title !== row[1]) {
                currentSlide = (/** @type {?} */ ({ title: row[1], description: row[2], items: [] }));
                slides.push(currentSlide);
            }
            if (currentSlide) {
                if (row[5]) {
                    /** @type {?} */
                    var f = _this.createField(row, formDynamicBuilder);
                    if (row[28]) {
                        /** @type {?} */
                        var conditionsTitles = _this._stringToArray(row[28]);
                        if (conditionsTitles.length > 0) {
                            /** @type {?} */
                            var cara = {
                                conditions: conditionsTitles,
                                slideId: slides.length - 1
                            };
                            conditionedFields.set(f.name, cara);
                        }
                    }
                    currentSlide.items.push(f);
                    fields.set(row[0], f);
                }
            }
        }));
        conditionsDef.forEach((/**
         * @param {?} condition
         * @return {?}
         */
        function (condition) {
            /** @type {?} */
            var c = _this.createCondition(condition, fields);
            if (_this.conditionsService.isValid(c)) {
                conditions.push(c);
            }
            else {
                convertError.push('CONVERTCONDITIONERROR : ' + condition[0]);
            }
        }));
        conditionedFields.forEach((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        function (value, key) {
            /** @type {?} */
            var i = findIndex(slides[value.slideId].items, (/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.name === key; }));
            if (i >= 0) {
                slides[value.slideId].items[i].condition = [];
                value.conditions.forEach((/**
                 * @param {?} title
                 * @return {?}
                 */
                function (title) {
                    /** @type {?} */
                    var cond = find(conditions, (/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return c.title === title; }));
                    if (cond) {
                        ((/** @type {?} */ (slides[value.slideId].items[i].condition))).push(cond);
                    }
                }));
            }
        }));
        return { slides: slides, conditions: conditions, errors: convertError };
    };
    /**
     * @private
     * @param {?} row
     * @param {?} formDynamicBuilder
     * @return {?}
     */
    Mapping.prototype.createField = /**
     * @private
     * @param {?} row
     * @param {?} formDynamicBuilder
     * @return {?}
     */
    function (row, formDynamicBuilder) {
        /** @type {?} */
        var field = (/** @type {?} */ ({
            name: row[0] || formDynamicBuilder.generateFieldName(),
            type: (/** @type {?} */ (row[5].toLowerCase())),
            title: row[3],
            description: row[4],
            allowComments: this.isTrue(row[6]),
            required: this.isTrue(row[7]),
            values: this._stringToArray(row[8]),
            allowLibrary: this.isTrue(row[9]),
            min: row[10],
            max: row[11],
            step: row[12],
            minDate: row[13],
            maxDate: row[14],
            hideMobile: this.isTrue(row[15]),
            allowHistory: this.isTrue(row[16]),
            showOnLocation: this.isTrue(row[17]),
            allowAnnotate: this.isTrue(row[18]),
            showUsers: this.isTrue(row[19]),
            showService: this.isTrue(row[20]),
            allowOther: this.isTrue(row[21]),
            radius: row[22],
            multiple: this.isTrue(row[23]),
            clearable: this.isTrue(row[24]),
            duration: row[25],
            anwser: this._stringToArray(row[26]),
            explanation: row[27],
            allowTime: this.isTrue(row[29])
        }));
        if (row[30] && field.type === 'image') {
            field.image = { _downloadURL: row[30] };
        }
        if (field.type === 'information') {
            field.value = field.description;
            delete field.description;
        }
        return field;
    };
    /**
     * @private
     * @param {?} row
     * @param {?} fields
     * @return {?}
     */
    Mapping.prototype.createCondition = /**
     * @private
     * @param {?} row
     * @param {?} fields
     * @return {?}
     */
    function (row, fields) {
        /** @type {?} */
        var c = (/** @type {?} */ ({
            title: row[0]
        }));
        c.operator = this.conditionsService.convertOperator(row[3]);
        c.type = this.conditionsService.convertType(row[1]);
        if (row[5]) {
            c._id = row[5];
        }
        if (c.type === 'field') {
            c.field = this.conditionsService.convertField(fields.get(row[2]));
            if (!c.field) {
                return;
            }
            if (indexOf(SIMPLE_FIELD_TYPES, c.field.type) >= 0) {
                c.value = row[4];
            }
            else {
                c.values = this._stringToArray(row[4]);
            }
        }
        else if (c.type === 'tags') {
            c.tags = this._stringToArray(row[4]);
        }
        else if (c.type === 'groups') {
            c.group = this._stringToArray(row[4]);
        }
        else {
            return;
        }
        return c;
    };
    /**
     * @private
     * @param {?} array
     * @return {?}
     */
    Mapping.prototype.removeEmptyRows = /**
     * @private
     * @param {?} array
     * @return {?}
     */
    function (array) {
        return filter(array, (/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            return filter(row, (/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v && !!v.replace(/\s/g, ''); })).length > 0;
        }));
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    Mapping.prototype.isTrue = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str === 'TRUE' || str === 'VRAI' || str === 'true' || str === 'vrai';
    };
    Mapping.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Mapping.ctorParameters = function () { return [
        { type: Requestor },
        { type: Googlemaps },
        { type: Broker },
        { type: Conditions },
        { type: Config },
        { type: Translate },
        { type: Xlsx }
    ]; };
    return Mapping;
}());
export { Mapping };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Mapping.prototype._stringToArray;
    /**
     * @type {?}
     * @private
     */
    Mapping.prototype.rq;
    /**
     * @type {?}
     * @private
     */
    Mapping.prototype.googlemaps;
    /**
     * @type {?}
     * @private
     */
    Mapping.prototype.broker;
    /**
     * @type {?}
     * @private
     */
    Mapping.prototype.conditionsService;
    /**
     * @type {?}
     * @private
     */
    Mapping.prototype.config;
    /**
     * @type {?}
     * @private
     */
    Mapping.prototype.translate;
    /**
     * @type {?}
     * @protected
     */
    Mapping.prototype.xlsx;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21hcHBpbmcvbWFwcGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUU1RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBWSxJQUFJLEVBQTBCLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBUyxNQUFNLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUkvSixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxJQUFJLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRixPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUvRjtJQUVFLGlCQUFvQixFQUFhLEVBQVUsVUFBc0IsRUFBVSxNQUFjLEVBQVUsaUJBQTZCLEVBQVUsTUFBYyxFQUFVLFNBQW9CLEVBQVksSUFBVTtRQUF4TCxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsY0FBUyxH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QXZCLFVBQXdCLEtBQTJCO1FBQ2pELE9BQU8sTUFBTSxDQUFDLEtBQUs7Ozs7UUFBRSxVQUFBLEdBQUc7WUFDdEIsT0FBTyxNQUFNLENBQUMsR0FBRzs7OztZQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBM0IsQ0FBMkIsRUFBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFZTyx3QkFBTTs7Ozs7SUFBZCxVQUFlLEdBQUc7UUFDaEIsT0FBTyxHQUFHLEtBQUssTUFBTSxJQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLE1BQU0sSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDO0lBQzlFLENBQUM7O2dCQTFaRixVQUFVOzs7O2dCQVZvRixTQUFTO2dCQUFFLFVBQVU7Z0JBQTdCLE1BQU07Z0JBSXBGLFVBQVU7Z0JBSjRELE1BQU07Z0JBRDVFLFNBQVM7Z0JBQ1csSUFBSTs7SUFxYWpDLGNBQUM7Q0FBQSxBQTNaRCxJQTJaQztTQTFaWSxPQUFPOzs7Ozs7SUE2WWxCLGlDQVFFOzs7OztJQXBaVSxxQkFBcUI7Ozs7O0lBQUUsNkJBQThCOzs7OztJQUFFLHlCQUFzQjs7Ozs7SUFBRSxvQ0FBcUM7Ozs7O0lBQUUseUJBQXNCOzs7OztJQUFFLDRCQUE0Qjs7Ozs7SUFBRSx1QkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBDaGFuZ2VEZXRlY3RvclJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcbmltcG9ydCB7IExvY2F0aW9uLCBJTWFwcGluZywgWGxzeCwgQ29uZGl0aW9uLCBUcmFuc2xhdGlvbiwgU0lNUExFX0ZJRUxEX1RZUEVTLCBDb25maWcsIEJyb2tlciwgUmVxdWVzdG9yLCBHb29nbGVtYXBzLCBTbGlkZSwgTW9kZWxzIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgSUZvcm1GaWVsZCwgSUVycm9yTWFwcGluZyB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmltcG9ydCB7IEZvcm1EeW5hbWljQnVpbGRlciB9IGZyb20gJy4uL2Zvcm0tZHluYW1pYy1idWlsZGVyL2Zvcm0tZHluYW1pYy1idWlsZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZGl0aW9ucyB9IGZyb20gJy4uL2NvbmRpdGlvbnMvY29uZGl0aW9ucy5zZXJ2aWNlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIGZvcmtKb2luLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAsIG1hcCwgY29uY2F0TWFwLCBjYXRjaEVycm9yLCBmaWx0ZXIgYXMgZmlsdGVyJCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGZvckVhY2gsIGZpbmQsIGZpbmRJbmRleCwgaW5kZXhPZiwgZmlsdGVyLCB0cmltRW5kLCB0cmltU3RhcnQsIGdldCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBwaW5nIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBycTogUmVxdWVzdG9yLCBwcml2YXRlIGdvb2dsZW1hcHM6IEdvb2dsZW1hcHMsIHByaXZhdGUgYnJva2VyOiBCcm9rZXIsIHByaXZhdGUgY29uZGl0aW9uc1NlcnZpY2U6IENvbmRpdGlvbnMsIHByaXZhdGUgY29uZmlnOiBDb25maWcsIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGUsIHByb3RlY3RlZCB4bHN4OiBYbHN4KSB7fVxuXG4gIGdldFRvdGFsKG1hcHBpbmc6IElNYXBwaW5nKSB7XG4gICAgaWYgKG1hcHBpbmcuZG9jdW1lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnhsc3gucmVhZChtYXBwaW5nLmRvY3VtZW50KS50aGVuKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGEubGVuZ3RoIC0gMTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKDApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnZlcnRNaXNzaW9uRm9yRXhjZWxFeHBvcnQoc2xpZGVzOiBBcnJheTxhbnk+LCBjb25kaXRpb25zOiBBcnJheTxhbnk+KSB7XG4gICAgbGV0IGNvbmRpdGlvbnNEYXRhID0gdGhpcy5jb252ZXJ0Q29uZGl0b25zRm9yRXhjZWxFeHBvcnQoY29uZGl0aW9ucyk7XG4gICAgbGV0IHNsaWRlc0RhdGEgPSB0aGlzLmNvbnZlcnRTbGlkZXNGb3JFeGNlbEV4cG9ydChzbGlkZXMpO1xuICAgIHJldHVybiBbc2xpZGVzRGF0YSwgY29uZGl0aW9uc0RhdGFdO1xuICB9XG5cbiAgY29udmVydFNsaWRlc0ZvckV4Y2VsRXhwb3J0KHNsaWRlczogQXJyYXk8YW55Pikge1xuICAgIGxldCBjb2x1bW5zID0gW1xuICAgICAgeyBuYW1lOiAnaWQnIH0sXG4gICAgICB7IG5hbWU6ICdwYWdlVGl0bGUnIH0sXG4gICAgICB7IG5hbWU6ICdwYWdlRGVzY3JpcHRpb24nIH0sXG4gICAgICB7IG5hbWU6ICd0aXRsZScgfSxcbiAgICAgIHsgbmFtZTogJ2Rlc2NyaXB0aW9uJyB9LFxuICAgICAgeyBuYW1lOiAndHlwZScgfSxcbiAgICAgIHsgbmFtZTogJ2FsbG93Q29tbWVudHMnIH0sXG4gICAgICB7IG5hbWU6ICdyZXF1aXJlZCcgfSxcbiAgICAgIHsgbmFtZTogJ3ZhbHVlcycgfSxcbiAgICAgIHsgbmFtZTogJ2FsbG93TGlicmFyeScgfSxcbiAgICAgIHsgbmFtZTogJ21pbicgfSxcbiAgICAgIHsgbmFtZTogJ21heCcgfSxcbiAgICAgIHsgbmFtZTogJ3N0ZXAnIH0sXG4gICAgICB7IG5hbWU6ICdtaW5EYXRlJyB9LFxuICAgICAgeyBuYW1lOiAnbWF4RGF0ZScgfSxcbiAgICAgIHsgbmFtZTogJ2hpZGVNb2JpbGUnIH0sXG4gICAgICB7IG5hbWU6ICdhbGxvd0hpc3RvcnknIH0sXG4gICAgICB7IG5hbWU6ICdzaG93T25Mb2NhdGlvbicgfSxcbiAgICAgIHsgbmFtZTogJ2FsbG93QW5ub3RhdGUnIH0sXG4gICAgICB7IG5hbWU6ICdzaG93VXNlcnMnIH0sXG4gICAgICB7IG5hbWU6ICdzaG93U2VydmljZScgfSxcbiAgICAgIHsgbmFtZTogJ2FsbG93T3RoZXInIH0sXG4gICAgICB7IG5hbWU6ICdyYWRpdXMnIH0sXG4gICAgICB7IG5hbWU6ICdtdWx0aXBsZScgfSxcbiAgICAgIHsgbmFtZTogJ2NsZWFyYWJsZScgfSxcbiAgICAgIHsgbmFtZTogJ2R1cmF0aW9uJyB9LFxuICAgICAgeyBuYW1lOiAnYW53c2VyJyB9LFxuICAgICAgeyBuYW1lOiAnZXhwbGFuYXRpb24nIH0sXG4gICAgICB7IG5hbWU6ICdjb25kaXRpb25zJyB9LFxuICAgICAgeyBuYW1lOiAnYWxsb3dUaW1lJyB9LFxuICAgICAgeyBuYW1lOiAnaW1hZ2UnIH1cbiAgICBdO1xuICAgIGxldCBkYXRhID0gW107XG4gICAgLy9sZXQgY291bnRlciA9IDE7XG4gICAgZm9yRWFjaChzbGlkZXMsIGZ1bmN0aW9uKHNsaWRlKSB7XG4gICAgICBmb3JFYWNoKHNsaWRlLml0ZW1zLCBmdW5jdGlvbihmaWVsZDogYW55KSB7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgaWQ6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgcGFnZVRpdGxlOiBzbGlkZS50aXRsZSxcbiAgICAgICAgICBwYWdlRGVzY3JpcHRpb246IHNsaWRlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHRpdGxlOiBmaWVsZC50aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogZmllbGQudHlwZSA9PT0gJ2luZm9ybWF0aW9uJyA/IGZpZWxkLnZhbHVlIDogZmllbGQuZGVzY3JpcHRpb24sXG4gICAgICAgICAgdHlwZTogZmllbGQudHlwZSxcbiAgICAgICAgICBhbGxvd0NvbW1lbnRzOiBmaWVsZC5hbGxvd0NvbW1lbnRzLFxuICAgICAgICAgIHJlcXVpcmVkOiBmaWVsZC5yZXF1aXJlZCxcbiAgICAgICAgICB2YWx1ZXM6IGZpZWxkLnZhbHVlcyxcbiAgICAgICAgICBhbGxvd0xpYnJhcnk6IGZpZWxkLmFsbG93TGlicmFyeSxcbiAgICAgICAgICBtaW46IGZpZWxkLm1pbixcbiAgICAgICAgICBtYXg6IGZpZWxkLm1heCxcbiAgICAgICAgICBzdGVwOiBmaWVsZC5zdGVwLFxuICAgICAgICAgIG1pbkRhdGU6IGZpZWxkLm1pbkRhdGUsXG4gICAgICAgICAgbWF4RGF0ZTogZmllbGQubWF4RGF0ZSxcbiAgICAgICAgICBoaWRlTW9iaWxlOiBmaWVsZC5oaWRlTW9iaWxlLFxuICAgICAgICAgIGFsbG93SGlzdG9yeTogZmllbGQuYWxsb3dIaXN0b3J5LFxuICAgICAgICAgIHNob3dPbkxvY2F0aW9uOiBmaWVsZC5zaG93T25Mb2NhdGlvbixcbiAgICAgICAgICBhbGxvd0Fubm90YXRlOiBmaWVsZC5hbGxvd0Fubm90YXRlLFxuICAgICAgICAgIHNob3dVc2VyczogZmllbGQuc2hvd1VzZXJzLFxuICAgICAgICAgIHNob3dTZXJ2aWNlOiBmaWVsZC5zaG93U2VydmljZSxcbiAgICAgICAgICBhbGxvd090aGVyOiBmaWVsZC5hbGxvd090aGVyLFxuICAgICAgICAgIHJhZGl1czogZmllbGQucmFkaXVzLFxuICAgICAgICAgIG11bHRpcGxlOiBmaWVsZC5tdWx0aXBsZSxcbiAgICAgICAgICBjbGVhcmFibGU6IGZpZWxkLmNsZWFyYWJsZSxcbiAgICAgICAgICBkdXJhdGlvbjogZmllbGQuZHVyYXRpb24sXG4gICAgICAgICAgYW53c2VyOiBmaWVsZC5hbndzZXIsXG4gICAgICAgICAgZXhwbGFuYXRpb246IGZpZWxkLmV4cGxhbmF0aW9uLFxuICAgICAgICAgIGNvbmRpdGlvbnM6IGZpZWxkLmNvbmRpdGlvbiA/IGZpZWxkLmNvbmRpdGlvbi5tYXAoYyA9PiBjLnRpdGxlKSA6ICcnLFxuICAgICAgICAgIGFsbG93VGltZTogZmllbGQuYWxsb3dUaW1lLFxuICAgICAgICAgIGltYWdlOiBmaWVsZC5pbWFnZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB7IGNvbHVtbnM6IGNvbHVtbnMsIGRhdGE6IGRhdGEsIHRpdGxlOiAnU2xpZGVzJyB9O1xuICB9XG5cbiAgY29udmVydENvbmRpdG9uc0ZvckV4Y2VsRXhwb3J0KGNvbmRpdGlvbnM6IEFycmF5PGFueT4pIHtcbiAgICBsZXQgY29sdW1ucyA9IFt7IG5hbWU6ICd0aXRsZScgfSwgeyBuYW1lOiAndHlwZScgfSwgeyBuYW1lOiAnZmllbGQnIH0sIHsgbmFtZTogJ29wZXJhdG9yJyB9LCB7IG5hbWU6ICd2YWx1ZXMnIH0sIHsgbmFtZTogJ2lkJyB9XTtcbiAgICBsZXQgZGF0YSA9IFtdO1xuICAgIGZvckVhY2goY29uZGl0aW9ucywgZnVuY3Rpb24oY29uZGl0aW9uKSB7XG4gICAgICBkYXRhLnB1c2goe1xuICAgICAgICB0aXRsZTogY29uZGl0aW9uLnRpdGxlLFxuICAgICAgICB0eXBlOiBjb25kaXRpb24udHlwZSxcbiAgICAgICAgZmllbGQ6IGNvbmRpdGlvbi5maWVsZCA/IGNvbmRpdGlvbi5maWVsZC5uYW1lIDogJycsXG4gICAgICAgIG9wZXJhdG9yOiBjb25kaXRpb24ub3BlcmF0b3IsXG4gICAgICAgIHZhbHVlczogY29uZGl0aW9uLnZhbHVlcyB8fCBjb25kaXRpb24udmFsdWUgfHwgY29uZGl0aW9uLnRhZ3MgfHwgY29uZGl0aW9uLmdyb3VwLFxuICAgICAgICBpZDogY29uZGl0aW9uLl9pZFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgY29sdW1uczogY29sdW1ucywgZGF0YTogZGF0YSwgdGl0bGU6ICdDb25kaXRpb25zJyB9O1xuICB9XG5cbiAgdXBsb2FkKG1hcHBpbmc6IElNYXBwaW5nLCBjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBwcm9ncmVzcz86IEV2ZW50RW1pdHRlcjxudW1iZXI+KTogUHJvbWlzZTxBcnJheTxJRXJyb3JNYXBwaW5nPj4ge1xuICAgIGxldCBwdWJsaWNDb2xsZWN0aW9uTmFtZSA9IE1vZGVscy5nZXRQdWJsaWNDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSk7XG4gICAgcmV0dXJuIHRoaXMucnFcbiAgICAgIC5wb3N0RmlsZSh0aGlzLmNvbmZpZy5wdWJsaWNBcGlVcmwgKyBwdWJsaWNDb2xsZWN0aW9uTmFtZSArICcvaW1wb3J0JywgbWFwcGluZy5kb2N1bWVudClcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4ocmV0ID0+IHtcbiAgICAgICAgaWYgKHJldC5faWQpIHtcbiAgICAgICAgICByZXR1cm4gdGltZXIoMTAwMCwgNTAwKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGNvbmNhdE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucnEuZ2V0KHRoaXMuY29uZmlnLnB1YmxpY0FwaVVybCArICdqb2JzLycgKyByZXQuX2lkLCBmYWxzZSwgbnVsbCkucGlwZShcbiAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Yoe30pO1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlciQocyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzICYmIHMgJiYgcy5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MuZW1pdChzLnByb2dyZXNzICogMTAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMgJiYgcy5wcm9ncmVzcyA9PT0gMTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgIGxldCBlcnJvcnM6IEFycmF5PElFcnJvck1hcHBpbmc+ID0gZ2V0KHJlcywgJ2RhdGEub3V0cHV0LmVycm9ycycpO1xuICAgICAgICAgICAgICByZXR1cm4gZXJyb3JzIHx8IFtdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgY29udmVydFRyYW5zbGF0aW9ucyhkYXRhOiBBcnJheTxBcnJheTxhbnk+Pikge1xuICAgIGRhdGEuc2hpZnQoKTtcbiAgICBsZXQgdHJhbnNsYXRpb25zID0gW107XG4gICAgZm9yRWFjaChkYXRhLCAocm93LCBpKSA9PiB7XG4gICAgICBpZiAocm93WzFdKSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGlvbjogVHJhbnNsYXRpb24gPSB7XG4gICAgICAgICAgbGFuZ3VhZ2U6IHJvd1sxXSxcbiAgICAgICAgICBrZXk6IHJvd1syXSxcbiAgICAgICAgICB2YWx1ZTogcm93WzNdLFxuICAgICAgICAgIGVuOiByb3dbNF0sXG4gICAgICAgICAgdXM6IHJvd1s1XSxcbiAgICAgICAgICBmcjogcm93WzZdLFxuICAgICAgICAgIGVzOiByb3dbN10sXG4gICAgICAgICAgcGw6IHJvd1s4XSxcbiAgICAgICAgICBubDogcm93WzldLFxuICAgICAgICAgIGRlOiByb3dbMTBdLFxuICAgICAgICAgIGl0OiByb3dbMTFdLFxuICAgICAgICAgIHJ1OiByb3dbMTJdLFxuICAgICAgICAgIHpoczogcm93WzEzXSxcbiAgICAgICAgICB6aHQ6IHJvd1sxNF0sXG4gICAgICAgICAgcHQ6IHJvd1sxNV0sXG4gICAgICAgICAga3I6IHJvd1sxNl0sXG4gICAgICAgICAgamE6IHJvd1sxN10sXG4gICAgICAgICAgdWE6IHJvd1sxOF0sXG4gICAgICAgICAgaGU6IHJvd1sxOV0sXG4gICAgICAgICAgYXI6IHJvd1syMF0sXG4gICAgICAgICAgY3o6IHJvd1syMV0sXG4gICAgICAgICAgdGg6IHJvd1syMl0sXG4gICAgICAgICAgdHI6IHJvd1syM10sXG4gICAgICAgICAgYmc6IHJvd1syNF0sXG4gICAgICAgICAgZWw6IHJvd1syNV0sXG4gICAgICAgICAgc2w6IHJvd1syNl0sXG4gICAgICAgICAgc2s6IHJvd1syN10sXG4gICAgICAgICAgcm86IHJvd1syOF0sXG4gICAgICAgICAgaHU6IHJvd1syOV0sXG4gICAgICAgICAgZXQ6IHJvd1szMF0sXG4gICAgICAgICAgYnI6IHJvd1szMV0sXG4gICAgICAgICAgaXNSZWplY3Q6IHRoaXMuaXNUcnVlKHJvd1szMl0pLFxuICAgICAgICAgIGdyb3VwOiB0aGlzLl9zdHJpbmdUb0FycmF5KHJvd1szM10pLFxuICAgICAgICAgIGlzUGhvdG9Bbm5vdGF0aW9uOiB0aGlzLmlzVHJ1ZShyb3dbMzRdKVxuICAgICAgICB9O1xuICAgICAgICBpZiAocm93WzBdKSB7XG4gICAgICAgICAgdHJhbnNsYXRpb24uX2lkID0gcm93WzBdO1xuICAgICAgICB9XG4gICAgICAgIHRyYW5zbGF0aW9ucy5wdXNoKHRyYW5zbGF0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdHJhbnNsYXRpb25zO1xuICB9XG5cbiAgY29udmVydExvY2F0aW9ucyhkYXRhOiBBcnJheTxBcnJheTxhbnk+PiwgcHJvZ3Jlc3M6IHsgY291bnQ6IG51bWJlcjsgdG90YWw6IG51bWJlciB9LCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAvLzogT2JzZXJ2YWJsZTxBcnJheTxMb2NhdGlvbj4+XG4gICAgZGF0YS5zaGlmdCgpO1xuICAgIHByb2dyZXNzLnRvdGFsID0gZGF0YS5sZW5ndGg7XG4gICAgbGV0IHR5cGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGRhdGEuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgaWYgKHR5cGVOYW1lcy5pbmRleE9mKHJvd1syXSkgPCAwKSB7XG4gICAgICAgIHR5cGVOYW1lcy5wdXNoKHJvd1syXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QWxsKCdsb2NhdGlvbnR5cGVzJywgbnVsbCwgbnVsbCwgbnVsbCwgW1t7IGZpZWxkOiAnbmFtZScsIG9wZXJhdG9yOiB7IF9pZDogJ2lucScgfSwgdmFsdWU6IHR5cGVOYW1lcyB9XV0pLnBpcGUoXG4gICAgICBtYXAocmVzID0+IHJlcy5kYXRhKSxcbiAgICAgIG1lcmdlTWFwKCh0eXBlczogQXJyYXk8YW55PikgPT4ge1xuICAgICAgICBsZXQgb2JzOiBBcnJheTxPYnNlcnZhYmxlPExvY2F0aW9uPj4gPSBbXTtcbiAgICAgICAgZGF0YS5mb3JFYWNoKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHJvd1swXSAmJiByb3dbMV0pIHtcbiAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IG5ldyBMb2NhdGlvbigpO1xuICAgICAgICAgICAgbG9jYXRpb24udGl0bGUgPSByb3dbMF07XG4gICAgICAgICAgICBsb2NhdGlvbi5hZGRyZXNzID0gcm93WzFdO1xuICAgICAgICAgICAgbG9jYXRpb24ucGxhY2VzZWFyY2ggPSByb3dbNF0gPyByb3dbNF0gOiBsb2NhdGlvbi50aXRsZTsgLy8gKyAnICcgKyBsb2NhdGlvbi5hZGRyZXNzO1xuICAgICAgICAgICAgbG9jYXRpb24uY29udGFjdG5hbWUgPSByb3dbNV07XG4gICAgICAgICAgICBsb2NhdGlvbi5jb250YWN0ZW1haWwgPSByb3dbNl07XG4gICAgICAgICAgICBsb2NhdGlvbi5jb250YWN0cGhvbmUgPSByb3dbN107XG4gICAgICAgICAgICBsb2NhdGlvbi5pbmZvID0gcm93WzhdO1xuICAgICAgICAgICAgbG9jYXRpb24udGFncyA9IHRoaXMuX3N0cmluZ1RvQXJyYXkocm93WzldKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLm5vdGlmaWNhdGlvbmVtYWlsID0gcm93WzEwXTtcbiAgICAgICAgICAgIGxvY2F0aW9uLmNsaWVudGlkID0gcm93WzExXTtcbiAgICAgICAgICAgIGlmIChyb3dbMTJdKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLl9pZCA9IHJvd1sxMl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2NhdGlvbi5faWQgPSAnbWFwcGluZ18nICsgaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocm93WzEzXSkge1xuICAgICAgICAgICAgICBsb2NhdGlvbi52aXAgPSB0aGlzLmlzVHJ1ZShyb3dbMTNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2F0aW9uLnR5cGUgPSB0eXBlcy5maW5kKHQgPT4gdC5uYW1lID09PSByb3dbMl0pO1xuICAgICAgICAgICAgaWYgKHJvd1sxNF0pIHtcbiAgICAgICAgICAgICAgbG9jYXRpb24ubWlzc2lvbmRlc2NyaXB0aW9uc1JlZiA9IHRoaXMuX3N0cmluZ1RvQXJyYXkocm93WzE0XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXJvd1szXSkge1xuICAgICAgICAgICAgICBsZXQgbyA9IHRoaXMuZ29vZ2xlbWFwcy5yZXNvbHZlQWRkcmVzc0xvY2F0aW9uKGxvY2F0aW9uLmFkZHJlc3MsIHRoaXMudHJhbnNsYXRlLmdldEN1cnJlbnRMYW5ndWFnZSgpLCBsb2NhdGlvbi5wbGFjZXNlYXJjaCkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmNvb3Jkcykge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5zdGF0dXMgPSB2YWx1ZS5zb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLl9nZW9sb2MgPSBbdmFsdWUuY29vcmRzLmxuZywgdmFsdWUuY29vcmRzLmxhdF07XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5zdGF0dXMgPSAnZXJyb3InO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MuY291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICAgIGNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIG9icy5wdXNoKG8pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9jYXRpb24uX2dlb2xvYyA9IEpTT04ucGFyc2Uocm93WzNdKTtcbiAgICAgICAgICAgICAgbG9jYXRpb24uc3RhdHVzID0gJ2ZpbGUnO1xuICAgICAgICAgICAgICBwcm9ncmVzcy5jb3VudCArPSAxO1xuICAgICAgICAgICAgICBjZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgb2JzLnB1c2gob2YobG9jYXRpb24pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZm9ya0pvaW4ob2JzKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGNvbnZlcnRGb3JtQW5kQ29uZGl0aW9ucyhkYXRhOiBBcnJheTxBcnJheTxBcnJheTxhbnk+Pj4sIGZvcm1EeW5hbWljQnVpbGRlcjogRm9ybUR5bmFtaWNCdWlsZGVyKTogeyBzbGlkZXM6IEFycmF5PFNsaWRlPjsgY29uZGl0aW9uczogQXJyYXk8Q29uZGl0aW9uPjsgZXJyb3JzOiBBcnJheTxhbnk+IH0ge1xuICAgIGxldCBjb252ZXJ0RXJyb3IgPSBbXTtcbiAgICBsZXQgc2xpZGVzID0gPEFycmF5PFNsaWRlPj5bXTtcbiAgICBsZXQgY29uZGl0aW9ucyA9IFtdO1xuICAgIGxldCBmaWVsZHNEZWYgPSB0aGlzLnJlbW92ZUVtcHR5Um93cyhkYXRhWzBdKTtcbiAgICBsZXQgY29uZGl0aW9uc0RlZiA9IGRhdGEubGVuZ3RoID49IDIgPyB0aGlzLnJlbW92ZUVtcHR5Um93cyhkYXRhWzFdKSA6IFtdO1xuICAgIGZpZWxkc0RlZi5zaGlmdCgpO1xuICAgIGNvbmRpdGlvbnNEZWYuc2hpZnQoKTtcbiAgICBsZXQgY3VycmVudFNsaWRlID0gPFNsaWRlPnt9O1xuICAgIGxldCBmaWVsZHMgPSBuZXcgTWFwPHN0cmluZywgSUZvcm1GaWVsZD4oKTtcbiAgICBsZXQgY29uZGl0aW9uZWRGaWVsZHMgPSBuZXcgTWFwPHN0cmluZywgeyBjb25kaXRpb25zOiBBcnJheTxhbnk+OyBzbGlkZUlkOiBudW1iZXIgfT4oKTtcbiAgICBmaWVsZHNEZWYuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgaWYgKHJvd1sxXSAmJiBjdXJyZW50U2xpZGUudGl0bGUgIT09IHJvd1sxXSkge1xuICAgICAgICBjdXJyZW50U2xpZGUgPSA8U2xpZGU+eyB0aXRsZTogcm93WzFdLCBkZXNjcmlwdGlvbjogcm93WzJdLCBpdGVtczogW10gfTtcbiAgICAgICAgc2xpZGVzLnB1c2goY3VycmVudFNsaWRlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50U2xpZGUpIHtcbiAgICAgICAgaWYgKHJvd1s1XSkge1xuICAgICAgICAgIGxldCBmID0gdGhpcy5jcmVhdGVGaWVsZChyb3csIGZvcm1EeW5hbWljQnVpbGRlcik7XG4gICAgICAgICAgaWYgKHJvd1syOF0pIHtcbiAgICAgICAgICAgIGxldCBjb25kaXRpb25zVGl0bGVzID0gdGhpcy5fc3RyaW5nVG9BcnJheShyb3dbMjhdKTtcbiAgICAgICAgICAgIGlmIChjb25kaXRpb25zVGl0bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgbGV0IGNhcmEgPSB7XG4gICAgICAgICAgICAgICAgY29uZGl0aW9uczogY29uZGl0aW9uc1RpdGxlcyxcbiAgICAgICAgICAgICAgICBzbGlkZUlkOiBzbGlkZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBjb25kaXRpb25lZEZpZWxkcy5zZXQoZi5uYW1lLCBjYXJhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudFNsaWRlLml0ZW1zLnB1c2goZik7XG4gICAgICAgICAgZmllbGRzLnNldChyb3dbMF0sIGYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uZGl0aW9uc0RlZi5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICBsZXQgYyA9IHRoaXMuY3JlYXRlQ29uZGl0aW9uKGNvbmRpdGlvbiwgZmllbGRzKTtcbiAgICAgIGlmICh0aGlzLmNvbmRpdGlvbnNTZXJ2aWNlLmlzVmFsaWQoYykpIHtcbiAgICAgICAgY29uZGl0aW9ucy5wdXNoKGMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udmVydEVycm9yLnB1c2goJ0NPTlZFUlRDT05ESVRJT05FUlJPUiA6ICcgKyBjb25kaXRpb25bMF0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbmRpdGlvbmVkRmllbGRzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGxldCBpID0gZmluZEluZGV4KHNsaWRlc1t2YWx1ZS5zbGlkZUlkXS5pdGVtcywgKGY6IElGb3JtRmllbGQpID0+IGYubmFtZSA9PT0ga2V5KTtcbiAgICAgIGlmIChpID49IDApIHtcbiAgICAgICAgc2xpZGVzW3ZhbHVlLnNsaWRlSWRdLml0ZW1zW2ldLmNvbmRpdGlvbiA9IFtdO1xuICAgICAgICB2YWx1ZS5jb25kaXRpb25zLmZvckVhY2godGl0bGUgPT4ge1xuICAgICAgICAgIGxldCBjb25kID0gZmluZChjb25kaXRpb25zLCBjID0+IGMudGl0bGUgPT09IHRpdGxlKTtcbiAgICAgICAgICBpZiAoY29uZCkge1xuICAgICAgICAgICAgKDxBcnJheTxDb25kaXRpb24+PnNsaWRlc1t2YWx1ZS5zbGlkZUlkXS5pdGVtc1tpXS5jb25kaXRpb24pLnB1c2goY29uZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4geyBzbGlkZXM6IHNsaWRlcywgY29uZGl0aW9uczogY29uZGl0aW9ucywgZXJyb3JzOiBjb252ZXJ0RXJyb3IgfTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRmllbGQocm93OiBBcnJheTxhbnk+LCBmb3JtRHluYW1pY0J1aWxkZXI6IEZvcm1EeW5hbWljQnVpbGRlcik6IElGb3JtRmllbGQge1xuICAgIGxldCBmaWVsZCA9IDxJRm9ybUZpZWxkPntcbiAgICAgIG5hbWU6IHJvd1swXSB8fCBmb3JtRHluYW1pY0J1aWxkZXIuZ2VuZXJhdGVGaWVsZE5hbWUoKSxcbiAgICAgIHR5cGU6IDxzdHJpbmc+cm93WzVdLnRvTG93ZXJDYXNlKCksXG4gICAgICB0aXRsZTogcm93WzNdLFxuICAgICAgZGVzY3JpcHRpb246IHJvd1s0XSxcbiAgICAgIGFsbG93Q29tbWVudHM6IHRoaXMuaXNUcnVlKHJvd1s2XSksXG4gICAgICByZXF1aXJlZDogdGhpcy5pc1RydWUocm93WzddKSxcbiAgICAgIHZhbHVlczogdGhpcy5fc3RyaW5nVG9BcnJheShyb3dbOF0pLFxuICAgICAgYWxsb3dMaWJyYXJ5OiB0aGlzLmlzVHJ1ZShyb3dbOV0pLFxuICAgICAgbWluOiByb3dbMTBdLFxuICAgICAgbWF4OiByb3dbMTFdLFxuICAgICAgc3RlcDogcm93WzEyXSxcbiAgICAgIG1pbkRhdGU6IHJvd1sxM10sXG4gICAgICBtYXhEYXRlOiByb3dbMTRdLFxuICAgICAgaGlkZU1vYmlsZTogdGhpcy5pc1RydWUocm93WzE1XSksXG4gICAgICBhbGxvd0hpc3Rvcnk6IHRoaXMuaXNUcnVlKHJvd1sxNl0pLFxuICAgICAgc2hvd09uTG9jYXRpb246IHRoaXMuaXNUcnVlKHJvd1sxN10pLFxuICAgICAgYWxsb3dBbm5vdGF0ZTogdGhpcy5pc1RydWUocm93WzE4XSksXG4gICAgICBzaG93VXNlcnM6IHRoaXMuaXNUcnVlKHJvd1sxOV0pLFxuICAgICAgc2hvd1NlcnZpY2U6IHRoaXMuaXNUcnVlKHJvd1syMF0pLFxuICAgICAgYWxsb3dPdGhlcjogdGhpcy5pc1RydWUocm93WzIxXSksXG4gICAgICByYWRpdXM6IHJvd1syMl0sXG4gICAgICBtdWx0aXBsZTogdGhpcy5pc1RydWUocm93WzIzXSksXG4gICAgICBjbGVhcmFibGU6IHRoaXMuaXNUcnVlKHJvd1syNF0pLFxuICAgICAgZHVyYXRpb246IHJvd1syNV0sXG4gICAgICBhbndzZXI6IHRoaXMuX3N0cmluZ1RvQXJyYXkocm93WzI2XSksXG4gICAgICBleHBsYW5hdGlvbjogcm93WzI3XSxcbiAgICAgIGFsbG93VGltZTogdGhpcy5pc1RydWUocm93WzI5XSlcbiAgICB9O1xuICAgIGlmIChyb3dbMzBdICYmIGZpZWxkLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgIGZpZWxkLmltYWdlID0geyBfZG93bmxvYWRVUkw6IHJvd1szMF0gfTtcbiAgICB9XG4gICAgaWYgKGZpZWxkLnR5cGUgPT09ICdpbmZvcm1hdGlvbicpIHtcbiAgICAgIGZpZWxkLnZhbHVlID0gZmllbGQuZGVzY3JpcHRpb247XG4gICAgICBkZWxldGUgZmllbGQuZGVzY3JpcHRpb247XG4gICAgfVxuICAgIHJldHVybiBmaWVsZDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29uZGl0aW9uKHJvdzogQXJyYXk8YW55PiwgZmllbGRzOiBNYXA8c3RyaW5nLCBJRm9ybUZpZWxkPikge1xuICAgIGxldCBjID0gPENvbmRpdGlvbj57XG4gICAgICB0aXRsZTogcm93WzBdXG4gICAgfTtcbiAgICBjLm9wZXJhdG9yID0gdGhpcy5jb25kaXRpb25zU2VydmljZS5jb252ZXJ0T3BlcmF0b3Iocm93WzNdKTtcbiAgICBjLnR5cGUgPSB0aGlzLmNvbmRpdGlvbnNTZXJ2aWNlLmNvbnZlcnRUeXBlKHJvd1sxXSk7XG4gICAgaWYgKHJvd1s1XSkge1xuICAgICAgYy5faWQgPSByb3dbNV07XG4gICAgfVxuICAgIGlmIChjLnR5cGUgPT09ICdmaWVsZCcpIHtcbiAgICAgIGMuZmllbGQgPSB0aGlzLmNvbmRpdGlvbnNTZXJ2aWNlLmNvbnZlcnRGaWVsZChmaWVsZHMuZ2V0KHJvd1syXSkpO1xuICAgICAgaWYgKCFjLmZpZWxkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleE9mKFNJTVBMRV9GSUVMRF9UWVBFUywgYy5maWVsZC50eXBlKSA+PSAwKSB7XG4gICAgICAgIGMudmFsdWUgPSByb3dbNF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjLnZhbHVlcyA9IHRoaXMuX3N0cmluZ1RvQXJyYXkocm93WzRdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGMudHlwZSA9PT0gJ3RhZ3MnKSB7XG4gICAgICBjLnRhZ3MgPSB0aGlzLl9zdHJpbmdUb0FycmF5KHJvd1s0XSk7XG4gICAgfSBlbHNlIGlmIChjLnR5cGUgPT09ICdncm91cHMnKSB7XG4gICAgICBjLmdyb3VwID0gdGhpcy5fc3RyaW5nVG9BcnJheShyb3dbNF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBjO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVFbXB0eVJvd3MoYXJyYXk6IEFycmF5PEFycmF5PHN0cmluZz4+KTogQXJyYXk8QXJyYXk8c3RyaW5nPj4ge1xuICAgIHJldHVybiBmaWx0ZXIoYXJyYXksIHJvdyA9PiB7XG4gICAgICByZXR1cm4gZmlsdGVyKHJvdywgdiA9PiB2ICYmICEhdi5yZXBsYWNlKC9cXHMvZywgJycpKS5sZW5ndGggPiAwO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RyaW5nVG9BcnJheSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGxldCBhcnJheSA9IHN0ciA/IHRyaW1FbmQodHJpbVN0YXJ0KHN0ciwgJ1snKSwgJ10nKS5zcGxpdCgnLCcpIDogW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKC9eXFxzLy50ZXN0KGFycmF5W2ldKSkge1xuICAgICAgICBhcnJheVtpXSA9IGFycmF5W2ldLnN1YnN0cmluZygxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xuICB9O1xuXG4gIHByaXZhdGUgaXNUcnVlKHN0cikge1xuICAgIHJldHVybiBzdHIgPT09ICdUUlVFJyB8fCBzdHIgPT09ICdWUkFJJyB8fCBzdHIgPT09ICd0cnVlJyB8fCBzdHIgPT09ICd2cmFpJztcbiAgfVxufVxuIl19