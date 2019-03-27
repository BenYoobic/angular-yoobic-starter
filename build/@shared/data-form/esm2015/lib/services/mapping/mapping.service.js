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
export class Mapping {
    /**
     * @param {?} rq
     * @param {?} googlemaps
     * @param {?} broker
     * @param {?} conditionsService
     * @param {?} config
     * @param {?} translate
     * @param {?} xlsx
     */
    constructor(rq, googlemaps, broker, conditionsService, config, translate, xlsx) {
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
            let array = str ? trimEnd(trimStart(str, '['), ']').split(',') : [];
            for (let i = 0; i < array.length; i++) {
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
    getTotal(mapping) {
        if (mapping.document) {
            return this.xlsx.read(mapping.document).then((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                return data.length - 1;
            }));
        }
        else {
            return Promise.resolve(0);
        }
    }
    /**
     * @param {?} slides
     * @param {?} conditions
     * @return {?}
     */
    convertMissionForExcelExport(slides, conditions) {
        /** @type {?} */
        let conditionsData = this.convertConditonsForExcelExport(conditions);
        /** @type {?} */
        let slidesData = this.convertSlidesForExcelExport(slides);
        return [slidesData, conditionsData];
    }
    /**
     * @param {?} slides
     * @return {?}
     */
    convertSlidesForExcelExport(slides) {
        /** @type {?} */
        let columns = [
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
        let data = [];
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
                    c => c.title)) : '',
                    allowTime: field.allowTime,
                    image: field.image
                });
            }));
        }));
        return { columns: columns, data: data, title: 'Slides' };
    }
    /**
     * @param {?} conditions
     * @return {?}
     */
    convertConditonsForExcelExport(conditions) {
        /** @type {?} */
        let columns = [{ name: 'title' }, { name: 'type' }, { name: 'field' }, { name: 'operator' }, { name: 'values' }, { name: 'id' }];
        /** @type {?} */
        let data = [];
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
    }
    /**
     * @param {?} mapping
     * @param {?} collectionName
     * @param {?=} progress
     * @return {?}
     */
    upload(mapping, collectionName, progress) {
        /** @type {?} */
        let publicCollectionName = Models.getPublicCollectionName(collectionName);
        return this.rq
            .postFile(this.config.publicApiUrl + publicCollectionName + '/import', mapping.document)
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
                    .pipe(filter$((/**
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
                    return errors || [];
                }));
            }
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    convertTranslations(data) {
        data.shift();
        /** @type {?} */
        let translations = [];
        forEach(data, (/**
         * @param {?} row
         * @param {?} i
         * @return {?}
         */
        (row, i) => {
            if (row[1]) {
                /** @type {?} */
                let translation = {
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
                    isReject: this.isTrue(row[32]),
                    group: this._stringToArray(row[33]),
                    isPhotoAnnotation: this.isTrue(row[34])
                };
                if (row[0]) {
                    translation._id = row[0];
                }
                translations.push(translation);
            }
        }));
        return translations;
    }
    /**
     * @param {?} data
     * @param {?} progress
     * @param {?} cd
     * @return {?}
     */
    convertLocations(data, progress, cd) {
        //: Observable<Array<Location>>
        data.shift();
        progress.total = data.length;
        /** @type {?} */
        let typeNames = [];
        data.forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => {
            if (typeNames.indexOf(row[2]) < 0) {
                typeNames.push(row[2]);
            }
        }));
        return this.broker.getAll('locationtypes', null, null, null, [[{ field: 'name', operator: { _id: 'inq' }, value: typeNames }]]).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        res => res.data)), mergeMap((/**
         * @param {?} types
         * @return {?}
         */
        (types) => {
            /** @type {?} */
            let obs = [];
            data.forEach((/**
             * @param {?} row
             * @param {?} index
             * @return {?}
             */
            (row, index) => {
                if (row[0] && row[1]) {
                    /** @type {?} */
                    let location = new Location();
                    location.title = row[0];
                    location.address = row[1];
                    location.placesearch = row[4] ? row[4] : location.title; // + ' ' + location.address;
                    location.contactname = row[5];
                    location.contactemail = row[6];
                    location.contactphone = row[7];
                    location.info = row[8];
                    location.tags = this._stringToArray(row[9]);
                    location.notificationemail = row[10];
                    location.clientid = row[11];
                    if (row[12]) {
                        location._id = row[12];
                    }
                    else {
                        location._id = 'mapping_' + index;
                    }
                    if (row[13]) {
                        location.vip = this.isTrue(row[13]);
                    }
                    location.type = types.find((/**
                     * @param {?} t
                     * @return {?}
                     */
                    t => t.name === row[2]));
                    if (row[14]) {
                        location.missiondescriptionsRef = this._stringToArray(row[14]);
                    }
                    if (!row[3]) {
                        /** @type {?} */
                        let o = this.googlemaps.resolveAddressLocation(location.address, this.translate.getCurrentLanguage(), location.placesearch).pipe(map((/**
                         * @param {?} value
                         * @return {?}
                         */
                        value => {
                            if (value && value.coords) {
                                location.status = value.source;
                                location._geoloc = [value.coords.lng, value.coords.lat];
                            }
                            else {
                                location.status = 'error';
                            }
                            progress.count += 1;
                            cd.markForCheck();
                            return location;
                        })));
                        obs.push(o);
                    }
                    else {
                        location._geoloc = JSON.parse(row[3]);
                        location.status = 'file';
                        progress.count += 1;
                        cd.markForCheck();
                        obs.push(of(location));
                    }
                }
            }));
            return forkJoin(obs);
        })));
    }
    /**
     * @param {?} data
     * @param {?} formDynamicBuilder
     * @return {?}
     */
    convertFormAndConditions(data, formDynamicBuilder) {
        /** @type {?} */
        let convertError = [];
        /** @type {?} */
        let slides = (/** @type {?} */ ([]));
        /** @type {?} */
        let conditions = [];
        /** @type {?} */
        let fieldsDef = this.removeEmptyRows(data[0]);
        /** @type {?} */
        let conditionsDef = data.length >= 2 ? this.removeEmptyRows(data[1]) : [];
        fieldsDef.shift();
        conditionsDef.shift();
        /** @type {?} */
        let currentSlide = (/** @type {?} */ ({}));
        /** @type {?} */
        let fields = new Map();
        /** @type {?} */
        let conditionedFields = new Map();
        fieldsDef.forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => {
            if (row[1] && currentSlide.title !== row[1]) {
                currentSlide = (/** @type {?} */ ({ title: row[1], description: row[2], items: [] }));
                slides.push(currentSlide);
            }
            if (currentSlide) {
                if (row[5]) {
                    /** @type {?} */
                    let f = this.createField(row, formDynamicBuilder);
                    if (row[28]) {
                        /** @type {?} */
                        let conditionsTitles = this._stringToArray(row[28]);
                        if (conditionsTitles.length > 0) {
                            /** @type {?} */
                            let cara = {
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
        condition => {
            /** @type {?} */
            let c = this.createCondition(condition, fields);
            if (this.conditionsService.isValid(c)) {
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
        (value, key) => {
            /** @type {?} */
            let i = findIndex(slides[value.slideId].items, (/**
             * @param {?} f
             * @return {?}
             */
            (f) => f.name === key));
            if (i >= 0) {
                slides[value.slideId].items[i].condition = [];
                value.conditions.forEach((/**
                 * @param {?} title
                 * @return {?}
                 */
                title => {
                    /** @type {?} */
                    let cond = find(conditions, (/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => c.title === title));
                    if (cond) {
                        ((/** @type {?} */ (slides[value.slideId].items[i].condition))).push(cond);
                    }
                }));
            }
        }));
        return { slides: slides, conditions: conditions, errors: convertError };
    }
    /**
     * @private
     * @param {?} row
     * @param {?} formDynamicBuilder
     * @return {?}
     */
    createField(row, formDynamicBuilder) {
        /** @type {?} */
        let field = (/** @type {?} */ ({
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
    }
    /**
     * @private
     * @param {?} row
     * @param {?} fields
     * @return {?}
     */
    createCondition(row, fields) {
        /** @type {?} */
        let c = (/** @type {?} */ ({
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
    }
    /**
     * @private
     * @param {?} array
     * @return {?}
     */
    removeEmptyRows(array) {
        return filter(array, (/**
         * @param {?} row
         * @return {?}
         */
        row => {
            return filter(row, (/**
             * @param {?} v
             * @return {?}
             */
            v => v && !!v.replace(/\s/g, ''))).length > 0;
        }));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    isTrue(str) {
        return str === 'TRUE' || str === 'VRAI' || str === 'true' || str === 'vrai';
    }
}
Mapping.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Mapping.ctorParameters = () => [
    { type: Requestor },
    { type: Googlemaps },
    { type: Broker },
    { type: Conditions },
    { type: Config },
    { type: Translate },
    { type: Xlsx }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcGluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1mb3JtLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21hcHBpbmcvbWFwcGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUU1RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBWSxJQUFJLEVBQTBCLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBUyxNQUFNLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUkvSixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxJQUFJLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRixPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUcvRixNQUFNLE9BQU8sT0FBTzs7Ozs7Ozs7OztJQUNsQixZQUFvQixFQUFhLEVBQVUsVUFBc0IsRUFBVSxNQUFjLEVBQVUsaUJBQTZCLEVBQVUsTUFBYyxFQUFVLFNBQW9CLEVBQVksSUFBVTtRQUF4TCxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQVk7UUFBVSxXQUFNLEdB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QUc7Ozs7WUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBWU8sTUFBTSxDQUFDLEdBQUc7UUFDaEIsT0FBTyxHQUFHLEtBQUssTUFBTSxJQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLE1BQU0sSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDO0lBQzlFLENBQUM7OztZQTFaRixVQUFVOzs7O1lBVm9GLFNBQVM7WUFBRSxVQUFVO1lBQTdCLE1BQU07WUFJcEYsVUFBVTtZQUo0RCxNQUFNO1lBRDVFLFNBQVM7WUFDVyxJQUFJOzs7Ozs7O0lBd1ovQixpQ0FRRTs7Ozs7SUFwWlUscUJBQXFCOzs7OztJQUFFLDZCQUE4Qjs7Ozs7SUFBRSx5QkFBc0I7Ozs7O0lBQUUsb0NBQXFDOzs7OztJQUFFLHlCQUFzQjs7Ozs7SUFBRSw0QkFBNEI7Ozs7O0lBQUUsdUJBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBMb2NhdGlvbiwgSU1hcHBpbmcsIFhsc3gsIENvbmRpdGlvbiwgVHJhbnNsYXRpb24sIFNJTVBMRV9GSUVMRF9UWVBFUywgQ29uZmlnLCBCcm9rZXIsIFJlcXVlc3RvciwgR29vZ2xlbWFwcywgU2xpZGUsIE1vZGVscyB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcbmltcG9ydCB7IElGb3JtRmllbGQsIElFcnJvck1hcHBpbmcgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBGb3JtRHluYW1pY0J1aWxkZXIgfSBmcm9tICcuLi9mb3JtLWR5bmFtaWMtYnVpbGRlci9mb3JtLWR5bmFtaWMtYnVpbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmRpdGlvbnMgfSBmcm9tICcuLi9jb25kaXRpb25zL2NvbmRpdGlvbnMuc2VydmljZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBmb3JrSm9pbiwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwLCBtYXAsIGNvbmNhdE1hcCwgY2F0Y2hFcnJvciwgZmlsdGVyIGFzIGZpbHRlciQsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmb3JFYWNoLCBmaW5kLCBmaW5kSW5kZXgsIGluZGV4T2YsIGZpbHRlciwgdHJpbUVuZCwgdHJpbVN0YXJ0LCBnZXQgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwcGluZyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcnE6IFJlcXVlc3RvciwgcHJpdmF0ZSBnb29nbGVtYXBzOiBHb29nbGVtYXBzLCBwcml2YXRlIGJyb2tlcjogQnJva2VyLCBwcml2YXRlIGNvbmRpdGlvbnNTZXJ2aWNlOiBDb25kaXRpb25zLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnLCBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlLCBwcm90ZWN0ZWQgeGxzeDogWGxzeCkge31cblxuICBnZXRUb3RhbChtYXBwaW5nOiBJTWFwcGluZykge1xuICAgIGlmIChtYXBwaW5nLmRvY3VtZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy54bHN4LnJlYWQobWFwcGluZy5kb2N1bWVudCkudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLmxlbmd0aCAtIDE7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgwKTtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0TWlzc2lvbkZvckV4Y2VsRXhwb3J0KHNsaWRlczogQXJyYXk8YW55PiwgY29uZGl0aW9uczogQXJyYXk8YW55Pikge1xuICAgIGxldCBjb25kaXRpb25zRGF0YSA9IHRoaXMuY29udmVydENvbmRpdG9uc0ZvckV4Y2VsRXhwb3J0KGNvbmRpdGlvbnMpO1xuICAgIGxldCBzbGlkZXNEYXRhID0gdGhpcy5jb252ZXJ0U2xpZGVzRm9yRXhjZWxFeHBvcnQoc2xpZGVzKTtcbiAgICByZXR1cm4gW3NsaWRlc0RhdGEsIGNvbmRpdGlvbnNEYXRhXTtcbiAgfVxuXG4gIGNvbnZlcnRTbGlkZXNGb3JFeGNlbEV4cG9ydChzbGlkZXM6IEFycmF5PGFueT4pIHtcbiAgICBsZXQgY29sdW1ucyA9IFtcbiAgICAgIHsgbmFtZTogJ2lkJyB9LFxuICAgICAgeyBuYW1lOiAncGFnZVRpdGxlJyB9LFxuICAgICAgeyBuYW1lOiAncGFnZURlc2NyaXB0aW9uJyB9LFxuICAgICAgeyBuYW1lOiAndGl0bGUnIH0sXG4gICAgICB7IG5hbWU6ICdkZXNjcmlwdGlvbicgfSxcbiAgICAgIHsgbmFtZTogJ3R5cGUnIH0sXG4gICAgICB7IG5hbWU6ICdhbGxvd0NvbW1lbnRzJyB9LFxuICAgICAgeyBuYW1lOiAncmVxdWlyZWQnIH0sXG4gICAgICB7IG5hbWU6ICd2YWx1ZXMnIH0sXG4gICAgICB7IG5hbWU6ICdhbGxvd0xpYnJhcnknIH0sXG4gICAgICB7IG5hbWU6ICdtaW4nIH0sXG4gICAgICB7IG5hbWU6ICdtYXgnIH0sXG4gICAgICB7IG5hbWU6ICdzdGVwJyB9LFxuICAgICAgeyBuYW1lOiAnbWluRGF0ZScgfSxcbiAgICAgIHsgbmFtZTogJ21heERhdGUnIH0sXG4gICAgICB7IG5hbWU6ICdoaWRlTW9iaWxlJyB9LFxuICAgICAgeyBuYW1lOiAnYWxsb3dIaXN0b3J5JyB9LFxuICAgICAgeyBuYW1lOiAnc2hvd09uTG9jYXRpb24nIH0sXG4gICAgICB7IG5hbWU6ICdhbGxvd0Fubm90YXRlJyB9LFxuICAgICAgeyBuYW1lOiAnc2hvd1VzZXJzJyB9LFxuICAgICAgeyBuYW1lOiAnc2hvd1NlcnZpY2UnIH0sXG4gICAgICB7IG5hbWU6ICdhbGxvd090aGVyJyB9LFxuICAgICAgeyBuYW1lOiAncmFkaXVzJyB9LFxuICAgICAgeyBuYW1lOiAnbXVsdGlwbGUnIH0sXG4gICAgICB7IG5hbWU6ICdjbGVhcmFibGUnIH0sXG4gICAgICB7IG5hbWU6ICdkdXJhdGlvbicgfSxcbiAgICAgIHsgbmFtZTogJ2Fud3NlcicgfSxcbiAgICAgIHsgbmFtZTogJ2V4cGxhbmF0aW9uJyB9LFxuICAgICAgeyBuYW1lOiAnY29uZGl0aW9ucycgfSxcbiAgICAgIHsgbmFtZTogJ2FsbG93VGltZScgfSxcbiAgICAgIHsgbmFtZTogJ2ltYWdlJyB9XG4gICAgXTtcbiAgICBsZXQgZGF0YSA9IFtdO1xuICAgIC8vbGV0IGNvdW50ZXIgPSAxO1xuICAgIGZvckVhY2goc2xpZGVzLCBmdW5jdGlvbihzbGlkZSkge1xuICAgICAgZm9yRWFjaChzbGlkZS5pdGVtcywgZnVuY3Rpb24oZmllbGQ6IGFueSkge1xuICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgIGlkOiBmaWVsZC5uYW1lLFxuICAgICAgICAgIHBhZ2VUaXRsZTogc2xpZGUudGl0bGUsXG4gICAgICAgICAgcGFnZURlc2NyaXB0aW9uOiBzbGlkZS5kZXNjcmlwdGlvbixcbiAgICAgICAgICB0aXRsZTogZmllbGQudGl0bGUsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGZpZWxkLnR5cGUgPT09ICdpbmZvcm1hdGlvbicgPyBmaWVsZC52YWx1ZSA6IGZpZWxkLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHR5cGU6IGZpZWxkLnR5cGUsXG4gICAgICAgICAgYWxsb3dDb21tZW50czogZmllbGQuYWxsb3dDb21tZW50cyxcbiAgICAgICAgICByZXF1aXJlZDogZmllbGQucmVxdWlyZWQsXG4gICAgICAgICAgdmFsdWVzOiBmaWVsZC52YWx1ZXMsXG4gICAgICAgICAgYWxsb3dMaWJyYXJ5OiBmaWVsZC5hbGxvd0xpYnJhcnksXG4gICAgICAgICAgbWluOiBmaWVsZC5taW4sXG4gICAgICAgICAgbWF4OiBmaWVsZC5tYXgsXG4gICAgICAgICAgc3RlcDogZmllbGQuc3RlcCxcbiAgICAgICAgICBtaW5EYXRlOiBmaWVsZC5taW5EYXRlLFxuICAgICAgICAgIG1heERhdGU6IGZpZWxkLm1heERhdGUsXG4gICAgICAgICAgaGlkZU1vYmlsZTogZmllbGQuaGlkZU1vYmlsZSxcbiAgICAgICAgICBhbGxvd0hpc3Rvcnk6IGZpZWxkLmFsbG93SGlzdG9yeSxcbiAgICAgICAgICBzaG93T25Mb2NhdGlvbjogZmllbGQuc2hvd09uTG9jYXRpb24sXG4gICAgICAgICAgYWxsb3dBbm5vdGF0ZTogZmllbGQuYWxsb3dBbm5vdGF0ZSxcbiAgICAgICAgICBzaG93VXNlcnM6IGZpZWxkLnNob3dVc2VycyxcbiAgICAgICAgICBzaG93U2VydmljZTogZmllbGQuc2hvd1NlcnZpY2UsXG4gICAgICAgICAgYWxsb3dPdGhlcjogZmllbGQuYWxsb3dPdGhlcixcbiAgICAgICAgICByYWRpdXM6IGZpZWxkLnJhZGl1cyxcbiAgICAgICAgICBtdWx0aXBsZTogZmllbGQubXVsdGlwbGUsXG4gICAgICAgICAgY2xlYXJhYmxlOiBmaWVsZC5jbGVhcmFibGUsXG4gICAgICAgICAgZHVyYXRpb246IGZpZWxkLmR1cmF0aW9uLFxuICAgICAgICAgIGFud3NlcjogZmllbGQuYW53c2VyLFxuICAgICAgICAgIGV4cGxhbmF0aW9uOiBmaWVsZC5leHBsYW5hdGlvbixcbiAgICAgICAgICBjb25kaXRpb25zOiBmaWVsZC5jb25kaXRpb24gPyBmaWVsZC5jb25kaXRpb24ubWFwKGMgPT4gYy50aXRsZSkgOiAnJyxcbiAgICAgICAgICBhbGxvd1RpbWU6IGZpZWxkLmFsbG93VGltZSxcbiAgICAgICAgICBpbWFnZTogZmllbGQuaW1hZ2VcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4geyBjb2x1bW5zOiBjb2x1bW5zLCBkYXRhOiBkYXRhLCB0aXRsZTogJ1NsaWRlcycgfTtcbiAgfVxuXG4gIGNvbnZlcnRDb25kaXRvbnNGb3JFeGNlbEV4cG9ydChjb25kaXRpb25zOiBBcnJheTxhbnk+KSB7XG4gICAgbGV0IGNvbHVtbnMgPSBbeyBuYW1lOiAndGl0bGUnIH0sIHsgbmFtZTogJ3R5cGUnIH0sIHsgbmFtZTogJ2ZpZWxkJyB9LCB7IG5hbWU6ICdvcGVyYXRvcicgfSwgeyBuYW1lOiAndmFsdWVzJyB9LCB7IG5hbWU6ICdpZCcgfV07XG4gICAgbGV0IGRhdGEgPSBbXTtcbiAgICBmb3JFYWNoKGNvbmRpdGlvbnMsIGZ1bmN0aW9uKGNvbmRpdGlvbikge1xuICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgdGl0bGU6IGNvbmRpdGlvbi50aXRsZSxcbiAgICAgICAgdHlwZTogY29uZGl0aW9uLnR5cGUsXG4gICAgICAgIGZpZWxkOiBjb25kaXRpb24uZmllbGQgPyBjb25kaXRpb24uZmllbGQubmFtZSA6ICcnLFxuICAgICAgICBvcGVyYXRvcjogY29uZGl0aW9uLm9wZXJhdG9yLFxuICAgICAgICB2YWx1ZXM6IGNvbmRpdGlvbi52YWx1ZXMgfHwgY29uZGl0aW9uLnZhbHVlIHx8IGNvbmRpdGlvbi50YWdzIHx8IGNvbmRpdGlvbi5ncm91cCxcbiAgICAgICAgaWQ6IGNvbmRpdGlvbi5faWRcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB7IGNvbHVtbnM6IGNvbHVtbnMsIGRhdGE6IGRhdGEsIHRpdGxlOiAnQ29uZGl0aW9ucycgfTtcbiAgfVxuXG4gIHVwbG9hZChtYXBwaW5nOiBJTWFwcGluZywgY29sbGVjdGlvbk5hbWU6IHN0cmluZywgcHJvZ3Jlc3M/OiBFdmVudEVtaXR0ZXI8bnVtYmVyPik6IFByb21pc2U8QXJyYXk8SUVycm9yTWFwcGluZz4+IHtcbiAgICBsZXQgcHVibGljQ29sbGVjdGlvbk5hbWUgPSBNb2RlbHMuZ2V0UHVibGljQ29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpO1xuICAgIHJldHVybiB0aGlzLnJxXG4gICAgICAucG9zdEZpbGUodGhpcy5jb25maWcucHVibGljQXBpVXJsICsgcHVibGljQ29sbGVjdGlvbk5hbWUgKyAnL2ltcG9ydCcsIG1hcHBpbmcuZG9jdW1lbnQpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKHJldCA9PiB7XG4gICAgICAgIGlmIChyZXQuX2lkKSB7XG4gICAgICAgICAgcmV0dXJuIHRpbWVyKDEwMDAsIDUwMClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBjb25jYXRNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJxLmdldCh0aGlzLmNvbmZpZy5wdWJsaWNBcGlVcmwgKyAnam9icy8nICsgcmV0Ll9pZCwgZmFsc2UsIG51bGwpLnBpcGUoXG4gICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHt9KTtcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBmaWx0ZXIkKHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyAmJiBzICYmIHMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgIHByb2dyZXNzLmVtaXQocy5wcm9ncmVzcyAqIDEwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzICYmIHMucHJvZ3Jlc3MgPT09IDE7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICBsZXQgZXJyb3JzOiBBcnJheTxJRXJyb3JNYXBwaW5nPiA9IGdldChyZXMsICdkYXRhLm91dHB1dC5lcnJvcnMnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGVycm9ycyB8fCBbXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGNvbnZlcnRUcmFuc2xhdGlvbnMoZGF0YTogQXJyYXk8QXJyYXk8YW55Pj4pIHtcbiAgICBkYXRhLnNoaWZ0KCk7XG4gICAgbGV0IHRyYW5zbGF0aW9ucyA9IFtdO1xuICAgIGZvckVhY2goZGF0YSwgKHJvdywgaSkgPT4ge1xuICAgICAgaWYgKHJvd1sxXSkge1xuICAgICAgICBsZXQgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uID0ge1xuICAgICAgICAgIGxhbmd1YWdlOiByb3dbMV0sXG4gICAgICAgICAga2V5OiByb3dbMl0sXG4gICAgICAgICAgdmFsdWU6IHJvd1szXSxcbiAgICAgICAgICBlbjogcm93WzRdLFxuICAgICAgICAgIHVzOiByb3dbNV0sXG4gICAgICAgICAgZnI6IHJvd1s2XSxcbiAgICAgICAgICBlczogcm93WzddLFxuICAgICAgICAgIHBsOiByb3dbOF0sXG4gICAgICAgICAgbmw6IHJvd1s5XSxcbiAgICAgICAgICBkZTogcm93WzEwXSxcbiAgICAgICAgICBpdDogcm93WzExXSxcbiAgICAgICAgICBydTogcm93WzEyXSxcbiAgICAgICAgICB6aHM6IHJvd1sxM10sXG4gICAgICAgICAgemh0OiByb3dbMTRdLFxuICAgICAgICAgIHB0OiByb3dbMTVdLFxuICAgICAgICAgIGtyOiByb3dbMTZdLFxuICAgICAgICAgIGphOiByb3dbMTddLFxuICAgICAgICAgIHVhOiByb3dbMThdLFxuICAgICAgICAgIGhlOiByb3dbMTldLFxuICAgICAgICAgIGFyOiByb3dbMjBdLFxuICAgICAgICAgIGN6OiByb3dbMjFdLFxuICAgICAgICAgIHRoOiByb3dbMjJdLFxuICAgICAgICAgIHRyOiByb3dbMjNdLFxuICAgICAgICAgIGJnOiByb3dbMjRdLFxuICAgICAgICAgIGVsOiByb3dbMjVdLFxuICAgICAgICAgIHNsOiByb3dbMjZdLFxuICAgICAgICAgIHNrOiByb3dbMjddLFxuICAgICAgICAgIHJvOiByb3dbMjhdLFxuICAgICAgICAgIGh1OiByb3dbMjldLFxuICAgICAgICAgIGV0OiByb3dbMzBdLFxuICAgICAgICAgIGJyOiByb3dbMzFdLFxuICAgICAgICAgIGlzUmVqZWN0OiB0aGlzLmlzVHJ1ZShyb3dbMzJdKSxcbiAgICAgICAgICBncm91cDogdGhpcy5fc3RyaW5nVG9BcnJheShyb3dbMzNdKSxcbiAgICAgICAgICBpc1Bob3RvQW5ub3RhdGlvbjogdGhpcy5pc1RydWUocm93WzM0XSlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJvd1swXSkge1xuICAgICAgICAgIHRyYW5zbGF0aW9uLl9pZCA9IHJvd1swXTtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc2xhdGlvbnMucHVzaCh0cmFuc2xhdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRyYW5zbGF0aW9ucztcbiAgfVxuXG4gIGNvbnZlcnRMb2NhdGlvbnMoZGF0YTogQXJyYXk8QXJyYXk8YW55Pj4sIHByb2dyZXNzOiB7IGNvdW50OiBudW1iZXI7IHRvdGFsOiBudW1iZXIgfSwgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgLy86IE9ic2VydmFibGU8QXJyYXk8TG9jYXRpb24+PlxuICAgIGRhdGEuc2hpZnQoKTtcbiAgICBwcm9ncmVzcy50b3RhbCA9IGRhdGEubGVuZ3RoO1xuICAgIGxldCB0eXBlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBkYXRhLmZvckVhY2gocm93ID0+IHtcbiAgICAgIGlmICh0eXBlTmFtZXMuaW5kZXhPZihyb3dbMl0pIDwgMCkge1xuICAgICAgICB0eXBlTmFtZXMucHVzaChyb3dbMl0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYnJva2VyLmdldEFsbCgnbG9jYXRpb250eXBlcycsIG51bGwsIG51bGwsIG51bGwsIFtbeyBmaWVsZDogJ25hbWUnLCBvcGVyYXRvcjogeyBfaWQ6ICdpbnEnIH0sIHZhbHVlOiB0eXBlTmFtZXMgfV1dKS5waXBlKFxuICAgICAgbWFwKHJlcyA9PiByZXMuZGF0YSksXG4gICAgICBtZXJnZU1hcCgodHlwZXM6IEFycmF5PGFueT4pID0+IHtcbiAgICAgICAgbGV0IG9iczogQXJyYXk8T2JzZXJ2YWJsZTxMb2NhdGlvbj4+ID0gW107XG4gICAgICAgIGRhdGEuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChyb3dbMF0gJiYgcm93WzFdKSB7XG4gICAgICAgICAgICBsZXQgbG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnRpdGxlID0gcm93WzBdO1xuICAgICAgICAgICAgbG9jYXRpb24uYWRkcmVzcyA9IHJvd1sxXTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnBsYWNlc2VhcmNoID0gcm93WzRdID8gcm93WzRdIDogbG9jYXRpb24udGl0bGU7IC8vICsgJyAnICsgbG9jYXRpb24uYWRkcmVzcztcbiAgICAgICAgICAgIGxvY2F0aW9uLmNvbnRhY3RuYW1lID0gcm93WzVdO1xuICAgICAgICAgICAgbG9jYXRpb24uY29udGFjdGVtYWlsID0gcm93WzZdO1xuICAgICAgICAgICAgbG9jYXRpb24uY29udGFjdHBob25lID0gcm93WzddO1xuICAgICAgICAgICAgbG9jYXRpb24uaW5mbyA9IHJvd1s4XTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnRhZ3MgPSB0aGlzLl9zdHJpbmdUb0FycmF5KHJvd1s5XSk7XG4gICAgICAgICAgICBsb2NhdGlvbi5ub3RpZmljYXRpb25lbWFpbCA9IHJvd1sxMF07XG4gICAgICAgICAgICBsb2NhdGlvbi5jbGllbnRpZCA9IHJvd1sxMV07XG4gICAgICAgICAgICBpZiAocm93WzEyXSkge1xuICAgICAgICAgICAgICBsb2NhdGlvbi5faWQgPSByb3dbMTJdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbG9jYXRpb24uX2lkID0gJ21hcHBpbmdfJyArIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJvd1sxM10pIHtcbiAgICAgICAgICAgICAgbG9jYXRpb24udmlwID0gdGhpcy5pc1RydWUocm93WzEzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhdGlvbi50eXBlID0gdHlwZXMuZmluZCh0ID0+IHQubmFtZSA9PT0gcm93WzJdKTtcbiAgICAgICAgICAgIGlmIChyb3dbMTRdKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLm1pc3Npb25kZXNjcmlwdGlvbnNSZWYgPSB0aGlzLl9zdHJpbmdUb0FycmF5KHJvd1sxNF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFyb3dbM10pIHtcbiAgICAgICAgICAgICAgbGV0IG8gPSB0aGlzLmdvb2dsZW1hcHMucmVzb2x2ZUFkZHJlc3NMb2NhdGlvbihsb2NhdGlvbi5hZGRyZXNzLCB0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSwgbG9jYXRpb24ucGxhY2VzZWFyY2gpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5jb29yZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uc3RhdHVzID0gdmFsdWUuc291cmNlO1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5fZ2VvbG9jID0gW3ZhbHVlLmNvb3Jkcy5sbmcsIHZhbHVlLmNvb3Jkcy5sYXRdO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHByb2dyZXNzLmNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICBjZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBvYnMucHVzaChvKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLl9nZW9sb2MgPSBKU09OLnBhcnNlKHJvd1szXSk7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLnN0YXR1cyA9ICdmaWxlJztcbiAgICAgICAgICAgICAgcHJvZ3Jlc3MuY291bnQgKz0gMTtcbiAgICAgICAgICAgICAgY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgIG9icy5wdXNoKG9mKGxvY2F0aW9uKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKG9icyk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBjb252ZXJ0Rm9ybUFuZENvbmRpdGlvbnMoZGF0YTogQXJyYXk8QXJyYXk8QXJyYXk8YW55Pj4+LCBmb3JtRHluYW1pY0J1aWxkZXI6IEZvcm1EeW5hbWljQnVpbGRlcik6IHsgc2xpZGVzOiBBcnJheTxTbGlkZT47IGNvbmRpdGlvbnM6IEFycmF5PENvbmRpdGlvbj47IGVycm9yczogQXJyYXk8YW55PiB9IHtcbiAgICBsZXQgY29udmVydEVycm9yID0gW107XG4gICAgbGV0IHNsaWRlcyA9IDxBcnJheTxTbGlkZT4+W107XG4gICAgbGV0IGNvbmRpdGlvbnMgPSBbXTtcbiAgICBsZXQgZmllbGRzRGVmID0gdGhpcy5yZW1vdmVFbXB0eVJvd3MoZGF0YVswXSk7XG4gICAgbGV0IGNvbmRpdGlvbnNEZWYgPSBkYXRhLmxlbmd0aCA+PSAyID8gdGhpcy5yZW1vdmVFbXB0eVJvd3MoZGF0YVsxXSkgOiBbXTtcbiAgICBmaWVsZHNEZWYuc2hpZnQoKTtcbiAgICBjb25kaXRpb25zRGVmLnNoaWZ0KCk7XG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IDxTbGlkZT57fTtcbiAgICBsZXQgZmllbGRzID0gbmV3IE1hcDxzdHJpbmcsIElGb3JtRmllbGQ+KCk7XG4gICAgbGV0IGNvbmRpdGlvbmVkRmllbGRzID0gbmV3IE1hcDxzdHJpbmcsIHsgY29uZGl0aW9uczogQXJyYXk8YW55Pjsgc2xpZGVJZDogbnVtYmVyIH0+KCk7XG4gICAgZmllbGRzRGVmLmZvckVhY2gocm93ID0+IHtcbiAgICAgIGlmIChyb3dbMV0gJiYgY3VycmVudFNsaWRlLnRpdGxlICE9PSByb3dbMV0pIHtcbiAgICAgICAgY3VycmVudFNsaWRlID0gPFNsaWRlPnsgdGl0bGU6IHJvd1sxXSwgZGVzY3JpcHRpb246IHJvd1syXSwgaXRlbXM6IFtdIH07XG4gICAgICAgIHNsaWRlcy5wdXNoKGN1cnJlbnRTbGlkZSk7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFNsaWRlKSB7XG4gICAgICAgIGlmIChyb3dbNV0pIHtcbiAgICAgICAgICBsZXQgZiA9IHRoaXMuY3JlYXRlRmllbGQocm93LCBmb3JtRHluYW1pY0J1aWxkZXIpO1xuICAgICAgICAgIGlmIChyb3dbMjhdKSB7XG4gICAgICAgICAgICBsZXQgY29uZGl0aW9uc1RpdGxlcyA9IHRoaXMuX3N0cmluZ1RvQXJyYXkocm93WzI4XSk7XG4gICAgICAgICAgICBpZiAoY29uZGl0aW9uc1RpdGxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGxldCBjYXJhID0ge1xuICAgICAgICAgICAgICAgIGNvbmRpdGlvbnM6IGNvbmRpdGlvbnNUaXRsZXMsXG4gICAgICAgICAgICAgICAgc2xpZGVJZDogc2xpZGVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgY29uZGl0aW9uZWRGaWVsZHMuc2V0KGYubmFtZSwgY2FyYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRTbGlkZS5pdGVtcy5wdXNoKGYpO1xuICAgICAgICAgIGZpZWxkcy5zZXQocm93WzBdLCBmKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbmRpdGlvbnNEZWYuZm9yRWFjaChjb25kaXRpb24gPT4ge1xuICAgICAgbGV0IGMgPSB0aGlzLmNyZWF0ZUNvbmRpdGlvbihjb25kaXRpb24sIGZpZWxkcyk7XG4gICAgICBpZiAodGhpcy5jb25kaXRpb25zU2VydmljZS5pc1ZhbGlkKGMpKSB7XG4gICAgICAgIGNvbmRpdGlvbnMucHVzaChjKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnZlcnRFcnJvci5wdXNoKCdDT05WRVJUQ09ORElUSU9ORVJST1IgOiAnICsgY29uZGl0aW9uWzBdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25kaXRpb25lZEZpZWxkcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBsZXQgaSA9IGZpbmRJbmRleChzbGlkZXNbdmFsdWUuc2xpZGVJZF0uaXRlbXMsIChmOiBJRm9ybUZpZWxkKSA9PiBmLm5hbWUgPT09IGtleSk7XG4gICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHNsaWRlc1t2YWx1ZS5zbGlkZUlkXS5pdGVtc1tpXS5jb25kaXRpb24gPSBbXTtcbiAgICAgICAgdmFsdWUuY29uZGl0aW9ucy5mb3JFYWNoKHRpdGxlID0+IHtcbiAgICAgICAgICBsZXQgY29uZCA9IGZpbmQoY29uZGl0aW9ucywgYyA9PiBjLnRpdGxlID09PSB0aXRsZSk7XG4gICAgICAgICAgaWYgKGNvbmQpIHtcbiAgICAgICAgICAgICg8QXJyYXk8Q29uZGl0aW9uPj5zbGlkZXNbdmFsdWUuc2xpZGVJZF0uaXRlbXNbaV0uY29uZGl0aW9uKS5wdXNoKGNvbmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgc2xpZGVzOiBzbGlkZXMsIGNvbmRpdGlvbnM6IGNvbmRpdGlvbnMsIGVycm9yczogY29udmVydEVycm9yIH07XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUZpZWxkKHJvdzogQXJyYXk8YW55PiwgZm9ybUR5bmFtaWNCdWlsZGVyOiBGb3JtRHluYW1pY0J1aWxkZXIpOiBJRm9ybUZpZWxkIHtcbiAgICBsZXQgZmllbGQgPSA8SUZvcm1GaWVsZD57XG4gICAgICBuYW1lOiByb3dbMF0gfHwgZm9ybUR5bmFtaWNCdWlsZGVyLmdlbmVyYXRlRmllbGROYW1lKCksXG4gICAgICB0eXBlOiA8c3RyaW5nPnJvd1s1XS50b0xvd2VyQ2FzZSgpLFxuICAgICAgdGl0bGU6IHJvd1szXSxcbiAgICAgIGRlc2NyaXB0aW9uOiByb3dbNF0sXG4gICAgICBhbGxvd0NvbW1lbnRzOiB0aGlzLmlzVHJ1ZShyb3dbNl0pLFxuICAgICAgcmVxdWlyZWQ6IHRoaXMuaXNUcnVlKHJvd1s3XSksXG4gICAgICB2YWx1ZXM6IHRoaXMuX3N0cmluZ1RvQXJyYXkocm93WzhdKSxcbiAgICAgIGFsbG93TGlicmFyeTogdGhpcy5pc1RydWUocm93WzldKSxcbiAgICAgIG1pbjogcm93WzEwXSxcbiAgICAgIG1heDogcm93WzExXSxcbiAgICAgIHN0ZXA6IHJvd1sxMl0sXG4gICAgICBtaW5EYXRlOiByb3dbMTNdLFxuICAgICAgbWF4RGF0ZTogcm93WzE0XSxcbiAgICAgIGhpZGVNb2JpbGU6IHRoaXMuaXNUcnVlKHJvd1sxNV0pLFxuICAgICAgYWxsb3dIaXN0b3J5OiB0aGlzLmlzVHJ1ZShyb3dbMTZdKSxcbiAgICAgIHNob3dPbkxvY2F0aW9uOiB0aGlzLmlzVHJ1ZShyb3dbMTddKSxcbiAgICAgIGFsbG93QW5ub3RhdGU6IHRoaXMuaXNUcnVlKHJvd1sxOF0pLFxuICAgICAgc2hvd1VzZXJzOiB0aGlzLmlzVHJ1ZShyb3dbMTldKSxcbiAgICAgIHNob3dTZXJ2aWNlOiB0aGlzLmlzVHJ1ZShyb3dbMjBdKSxcbiAgICAgIGFsbG93T3RoZXI6IHRoaXMuaXNUcnVlKHJvd1syMV0pLFxuICAgICAgcmFkaXVzOiByb3dbMjJdLFxuICAgICAgbXVsdGlwbGU6IHRoaXMuaXNUcnVlKHJvd1syM10pLFxuICAgICAgY2xlYXJhYmxlOiB0aGlzLmlzVHJ1ZShyb3dbMjRdKSxcbiAgICAgIGR1cmF0aW9uOiByb3dbMjVdLFxuICAgICAgYW53c2VyOiB0aGlzLl9zdHJpbmdUb0FycmF5KHJvd1syNl0pLFxuICAgICAgZXhwbGFuYXRpb246IHJvd1syN10sXG4gICAgICBhbGxvd1RpbWU6IHRoaXMuaXNUcnVlKHJvd1syOV0pXG4gICAgfTtcbiAgICBpZiAocm93WzMwXSAmJiBmaWVsZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICBmaWVsZC5pbWFnZSA9IHsgX2Rvd25sb2FkVVJMOiByb3dbMzBdIH07XG4gICAgfVxuICAgIGlmIChmaWVsZC50eXBlID09PSAnaW5mb3JtYXRpb24nKSB7XG4gICAgICBmaWVsZC52YWx1ZSA9IGZpZWxkLmRlc2NyaXB0aW9uO1xuICAgICAgZGVsZXRlIGZpZWxkLmRlc2NyaXB0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGQ7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbmRpdGlvbihyb3c6IEFycmF5PGFueT4sIGZpZWxkczogTWFwPHN0cmluZywgSUZvcm1GaWVsZD4pIHtcbiAgICBsZXQgYyA9IDxDb25kaXRpb24+e1xuICAgICAgdGl0bGU6IHJvd1swXVxuICAgIH07XG4gICAgYy5vcGVyYXRvciA9IHRoaXMuY29uZGl0aW9uc1NlcnZpY2UuY29udmVydE9wZXJhdG9yKHJvd1szXSk7XG4gICAgYy50eXBlID0gdGhpcy5jb25kaXRpb25zU2VydmljZS5jb252ZXJ0VHlwZShyb3dbMV0pO1xuICAgIGlmIChyb3dbNV0pIHtcbiAgICAgIGMuX2lkID0gcm93WzVdO1xuICAgIH1cbiAgICBpZiAoYy50eXBlID09PSAnZmllbGQnKSB7XG4gICAgICBjLmZpZWxkID0gdGhpcy5jb25kaXRpb25zU2VydmljZS5jb252ZXJ0RmllbGQoZmllbGRzLmdldChyb3dbMl0pKTtcbiAgICAgIGlmICghYy5maWVsZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXhPZihTSU1QTEVfRklFTERfVFlQRVMsIGMuZmllbGQudHlwZSkgPj0gMCkge1xuICAgICAgICBjLnZhbHVlID0gcm93WzRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYy52YWx1ZXMgPSB0aGlzLl9zdHJpbmdUb0FycmF5KHJvd1s0XSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjLnR5cGUgPT09ICd0YWdzJykge1xuICAgICAgYy50YWdzID0gdGhpcy5fc3RyaW5nVG9BcnJheShyb3dbNF0pO1xuICAgIH0gZWxzZSBpZiAoYy50eXBlID09PSAnZ3JvdXBzJykge1xuICAgICAgYy5ncm91cCA9IHRoaXMuX3N0cmluZ1RvQXJyYXkocm93WzRdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gYztcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlRW1wdHlSb3dzKGFycmF5OiBBcnJheTxBcnJheTxzdHJpbmc+Pik6IEFycmF5PEFycmF5PHN0cmluZz4+IHtcbiAgICByZXR1cm4gZmlsdGVyKGFycmF5LCByb3cgPT4ge1xuICAgICAgcmV0dXJuIGZpbHRlcihyb3csIHYgPT4gdiAmJiAhIXYucmVwbGFjZSgvXFxzL2csICcnKSkubGVuZ3RoID4gMDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0cmluZ1RvQXJyYXkgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBsZXQgYXJyYXkgPSBzdHIgPyB0cmltRW5kKHRyaW1TdGFydChzdHIsICdbJyksICddJykuc3BsaXQoJywnKSA6IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICgvXlxccy8udGVzdChhcnJheVtpXSkpIHtcbiAgICAgICAgYXJyYXlbaV0gPSBhcnJheVtpXS5zdWJzdHJpbmcoMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfTtcblxuICBwcml2YXRlIGlzVHJ1ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyID09PSAnVFJVRScgfHwgc3RyID09PSAnVlJBSScgfHwgc3RyID09PSAndHJ1ZScgfHwgc3RyID09PSAndnJhaSc7XG4gIH1cbn1cbiJdfQ==