/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isPresent, dateFormat, dateAdd, MOBILE_FORM_FIELDS_ALL, FormFieldType, isImageFile, isNumberField, isBooleanField, isPhotoField, isMultiPhotosField, isPhotoOrMultiPhotosField, isVideoField, isDateTimeField, isIntervalField, isMultipleField, isColoredField } from '@shared/stencil';
import { IModel } from '../../interfaces/model/model.interface';
import { ROLES_CONDITIONS } from '../../interfaces/condition/icondition.interface';
import { cloneDeep, compact, uniq, union, isArray, isObject, isString, map, pull, assign, isEmpty, get, findIndex } from 'lodash-es';
/**
 * \@name Models
 * \@angularType service
 * \@description A powerful service which gets the model for a collection or class. The model could include form fields, searchable fields and mapping fields which are useful for generating forms or filters related to the collection or class.
 */
export class Models {
    /**
     * @param {?} className
     * @param {?} fieldName
     * @return {?}
     */
    static addSearchableField(className, fieldName) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        model.searchableFields.push(fieldName);
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @param {?} fieldName
     * @param {?} order
     * @return {?}
     */
    static addMappingField(className, fieldName, order) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        model.mappingFields.set(order, fieldName);
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @param {?} entityListItemProperty
     * @param {?} appearance
     * @return {?}
     */
    static addAppearance(className, entityListItemProperty, appearance) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        model.appearance.set(entityListItemProperty, appearance);
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @param {?} field
     * @return {?}
     */
    static addFormField(className, field) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        /** @type {?} */
        let formFields = model.formFields;
        formFields = formFields.filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name !== field.name));
        formFields.push(field);
        model.formFields = formFields;
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @param {?} baseClassName
     * @param {?} target
     * @return {?}
     */
    static addBaseModel(className, baseClassName, target) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        /** @type {?} */
        let base = this.createOrGetModel(baseClassName);
        /** @type {?} */
        let formFields = model.formFields || [];
        /** @type {?} */
        let baseFields = [];
        if (base.formFields) {
            base.formFields.map((/**
             * @param {?} field
             * @return {?}
             */
            field => {
                if (formFields.findIndex((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.name === field.name)) < 0) {
                    baseFields.push(cloneDeep(field));
                }
            }));
        }
        model.formFields = compact(union(baseFields, formFields));
        model.searchableFields = uniq(union(cloneDeep(base.searchableFields), model.searchableFields));
        model.type = target;
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @param {?} collectionName
     * @param {?} fields
     * @param {?} include
     * @param {?} searchSubquery
     * @param {?} feathersService
     * @param {?} target
     * @param {?=} isCustom
     * @param {?=} detailComponent
     * @param {?=} icon
     * @return {?}
     */
    static setCollectionName(className, collectionName, fields, include, searchSubquery, feathersService, target, isCustom, detailComponent, icon) {
        /** @type {?} */
        let model = this.createOrGetModel(className);
        model.collectionName = collectionName;
        model.fields = fields;
        model.include = include;
        model.searchSubquery = searchSubquery;
        model.type = target;
        model.feathersService = feathersService;
        model.isCustom = isCustom;
        model.detailComponent = detailComponent;
        model.icon = icon;
        if (model.collectionName && model.collectionName !== 'tenants') {
            model.include = model.include || [];
            if (model.include.indexOf('_tenant') < 0) {
                model.include.push('_tenant');
            }
            if (model.fields && model.fields.length > 1) {
                model.fields.push('_tenant.name');
                model.fields.push('_tenant.title');
                model.fields.push('_tenant.icon');
            }
        }
        this.updateModel(className, model);
    }
    /**
     * @param {?} className
     * @return {?}
     */
    static clearCollectionName(className) {
        Models._models.delete(className);
    }
    /**
     * @param {?} className
     * @return {?}
     */
    static getModel(className) {
        /** @type {?} */
        let retVal;
        if (isString(className) === true) {
            retVal = this.createOrGetModel((/** @type {?} */ (className)));
        }
        else {
            Models._models.forEach((/**
             * @param {?} m
             * @return {?}
             */
            m => {
                if (m.type && m.type === className) {
                    retVal = m;
                }
            }));
        }
        return retVal;
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    static getModelByCollectionName(collectionName) {
        /** @type {?} */
        let model;
        Models._models.forEach((/**
         * @param {?} m
         * @return {?}
         */
        m => {
            if (m.collectionName === collectionName) {
                model = m;
            }
        }));
        if (!model && collectionName && collectionName.endsWith('_store')) {
            /** @type {?} */
            let name = collectionName.replace('_store', '');
            if (name === 'missiondescription') {
                name += 's';
            }
            return Models.getModelByCollectionName(name);
        }
        return model;
    }
    /**
     * @param {?} collectionName
     * @param {?=} advancedFiltersFields
     * @param {?=} campaignFields
     * @param {?=} isAdmin
     * @return {?}
     */
    static getFilterableFields(collectionName, advancedFiltersFields, campaignFields, isAdmin = false) {
        /** @type {?} */
        let fields = [];
        /** @type {?} */
        let model = Models.getModelByCollectionName(collectionName);
        if (model && model.formFields) {
            fields = cloneDeep(model.formFields);
        }
        if (model && model.isCustom && fields) {
            fields.forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => {
                f.filterable = f.searchable;
                f.sortable = f.type === FormFieldType.date || f.type === FormFieldType.datetime || f.type === FormFieldType.number;
                if (f.type === FormFieldType.location) {
                    f.filterName = f.name + 'Ref';
                }
            }));
        }
        if (advancedFiltersFields && advancedFiltersFields.length > 0) {
            advancedFiltersFields.forEach((/**
             * @param {?} af
             * @return {?}
             */
            af => {
                /** @type {?} */
                let index = findIndex(fields, (/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.name === af.name));
                if (index < 0) {
                    fields.push(af);
                }
                else {
                    fields[index] = Object.assign({}, fields[index], af);
                }
            }));
        }
        if (campaignFields) {
            campaignFields = cloneDeep(campaignFields);
            campaignFields.forEach((/**
             * @param {?} c
             * @return {?}
             */
            c => {
                c.name += '.value';
                c.filterable = true;
                //c.sortable = true;
            }));
            fields = fields.concat(campaignFields);
        }
        /** @type {?} */
        let tenantIndex = findIndex(fields, (/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === '_tenant'));
        if (tenantIndex >= 0 && !isAdmin) {
            fields[tenantIndex].filterable = false;
        }
        /** @type {?} */
        let finalFields = [];
        fields.forEach((/**
         * @param {?} f
         * @return {?}
         */
        f => {
            finalFields.push(f);
            if (f.collectionName && f.collectionName !== collectionName && f.filterable === true && f.showSubQueryFilters === true) {
                Models.getModelByCollectionName(f.collectionName).formFields.forEach((/**
                 * @param {?} subfield
                 * @return {?}
                 */
                subfield => {
                    subfield = cloneDeep(subfield);
                    delete subfield.advanced;
                    subfield.filterable = true;
                    subfield.icon = 'yo-tag';
                    //this is used in the chanel collection where we want to override the subQuery defined in the user interface
                    //this even allow us to filter on any subfield of a user to look for channel
                    if (f.subQuery) {
                        subfield.subQuery = subfield.subQuery || f.subQuery;
                        if (!subfield.sessionValues) {
                            subfield.collectionName = subfield.collectionName || f.collectionName;
                        }
                    }
                    if (subfield.subQuery) {
                        if (f.subQueryOverride) {
                            subfield.subQuery = f.subQueryOverride;
                        }
                        subfield.isSubQuery = true;
                        subfield.name = subfield.collectionName + '_' + subfield.name;
                        finalFields.push(subfield);
                    }
                }));
            }
        }));
        return finalFields;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static getFieldName(field) {
        /** @type {?} */
        let fieldName = field.name + (field.columnDefinition && field.columnDefinition.name ? '.' + field.columnDefinition.name : '');
        if (field.columnDefinition && field.columnDefinition.forceName) {
            fieldName = field.columnDefinition.name;
        }
        return fieldName;
    }
    /**
     * @param {?} field
     * @param {?} translate
     * @return {?}
     */
    static getFieldTitle(field, translate) {
        /** @type {?} */
        let fieldTitle = field.title || field.name;
        fieldTitle = translate.polyglot(fieldTitle);
        return fieldTitle;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isBooleanField(field) {
        return isBooleanField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isNumberField(field) {
        return isNumberField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isPhotoField(field) {
        return isPhotoField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isMultiPhotosField(field) {
        return isMultiPhotosField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isPhotoOrMultiPhotosField(field) {
        return isPhotoOrMultiPhotosField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isVideoField(field) {
        return isVideoField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isDateTimeField(field) {
        return isDateTimeField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isIntervalField(field) {
        return isIntervalField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isChartableAutoFieldNoPhoto(field) {
        return Models.isChartableAutoField(field, false);
    }
    /**
     * @param {?} field
     * @param {?=} includePhoto
     * @return {?}
     */
    static isChartableAutoField(field, includePhoto = true) {
        switch (field.type) {
            case FormFieldType.checkbox:
            case FormFieldType.toggle:
            case FormFieldType.select:
            case FormFieldType.selectmulti:
            case FormFieldType.selectbuttons:
            case FormFieldType.selectbuttonsmulti:
            case FormFieldType.starrating:
            case FormFieldType.number:
            case FormFieldType.range:
            case FormFieldType.ranking:
            case FormFieldType.formula:
                return true;
            case FormFieldType.photo:
            case FormFieldType.multiphotos:
                return includePhoto;
            case FormFieldType.autocomplete:
                return !field.collectionName || Models.getModel(field.collectionName).isCustom !== true;
        }
        return false;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isMultipleField(field) {
        return isMultipleField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static isColoredField(field) {
        return isColoredField(field);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    static getFieldOperator(field) {
        if (field.type === 'fieldselector') {
            return [{ title: 'in', _id: 'inq' }];
        }
        else if (Models.isBooleanField(field)) {
            return [{ title: 'equals', _id: 'eq' }, { title: 'notequals', _id: 'neq' }];
        }
        else if (Models.isPhotoField(field)) {
            return [{ title: 'exists', _id: 'exists' }];
        }
        else if (Models.isIntervalField(field) || Models.isDateTimeField(field)) {
            return [{ title: 'greaterthan', _id: 'gte', interval: true }, { title: 'between', _id: 'between', interval: true }, { title: 'lessthan', _id: 'lte', interval: true }, { title: 'equals', _id: 'eq', interval: true }];
        }
        else if (field.type === FormFieldType.autocomplete || field.type === FormFieldType.location) {
            return [{ title: 'in', _id: 'inq' }, { title: 'notin', _id: 'nin' }, { title: 'all', _id: 'all' }];
        }
        else {
            return [{ title: 'like', _id: 'like' }, { title: 'notlike', _id: 'nlike' }, { title: 'equals', _id: 'eq' }, { title: 'notequals', _id: 'neq' }];
        }
    }
    // public static getFormFieldFromMobileField(type) {
    //     switch (type) {
    //         case FormFieldType.photo:
    //         case FormFieldType.signature:
    //         case FormFieldType.image:
    //         case FormFieldType.barcode:
    //         case FormFieldType.video:
    //         case FormFieldType.audio:
    //         case FormFieldType.document:
    //             return FormFieldType.photo;
    //         case FormFieldType.date:
    //             return FormFieldType.date;
    //         default:
    //             return FormFieldType[type] || FormFieldType.text;
    //     }
    // }
    /**
     * @param {?} type
     * @return {?}
     */
    static getMobileFieldIcon(type) {
        /** @type {?} */
        let fields = [].concat(MOBILE_FORM_FIELDS_ALL).filter((/**
         * @param {?} field
         * @return {?}
         */
        field => field.type === type));
        if (fields && fields.length > 0) {
            return fields[0].icon;
        }
        return '';
    }
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} excludedFields
     * @return {?}
     */
    static exportWhere(collectionName, filters, excludedFields = []) {
        /** @type {?} */
        let retVal = filters.map((/**
         * @param {?} fs
         * @return {?}
         */
        fs => {
            /** @type {?} */
            let simplifiedFilters = [];
            fs.forEach((/**
             * @param {?} f
             * @return {?}
             */
            f => {
                if ((!f.subQuery || f.collectionName === collectionName) && (!excludedFields || excludedFields.indexOf(f.field) < 0)) {
                    //&& !f.isFieldSelector
                    /** @type {?} */
                    let filter = Models.exportFilterField(f);
                    if (filter && !isEmpty(filter)) {
                        simplifiedFilters.push(filter);
                    }
                }
            }));
            if (simplifiedFilters.length === 0) {
                return null;
            }
            else if (simplifiedFilters.length === 1) {
                return simplifiedFilters[0];
            }
            else {
                return { and: simplifiedFilters };
            }
        }));
        if (retVal) {
            pull(retVal, null);
        }
        if (retVal && retVal.length === 1) {
            return retVal[0];
        }
        else if (retVal && retVal.length > 0) {
            return { or: retVal };
        }
        return null;
    }
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    static exportSubQuery(collectionName, filters, isAggregationQuery) {
        /** @type {?} */
        let retVal = [];
        if (filters && isArray(filters) && ((/** @type {?} */ (filters))).length > 0) {
            ((/** @type {?} */ (filters))).forEach((/**
             * @param {?} fs
             * @return {?}
             */
            fs => {
                fs.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => {
                    if (f.subQuery && f.collectionName !== collectionName) {
                        retVal.push({
                            collectionName: this.fixCollectionName(f.collectionName, isAggregationQuery),
                            where: Models.exportFilterField(f),
                            field: f.subQuery.field,
                            values: f.subQuery.values,
                            leftJoin: f.subQuery.leftJoin
                        });
                    }
                }));
            }));
        }
        return retVal.length === 1 ? retVal[0] : retVal.length > 1 ? retVal : null;
    }
    /**
     * @param {?} collectionName
     * @param {?} search
     * @return {?}
     */
    static exportSearch(collectionName, search) {
        if (search && search.match && search.match(/^[0-9a-fA-F]{24}$/)) {
            return { _id: search };
        }
        else {
            /** @type {?} */
            let retVal = Models.getModelByCollectionName(collectionName).searchableFields.map((/**
             * @param {?} field
             * @return {?}
             */
            field => {
                /** @type {?} */
                let filter = {};
                if (field === '_id' && collectionName !== 'groups') {
                    filter[field] = search;
                }
                else {
                    filter[field] = { like: search, options: 'i' };
                }
                return filter;
            }));
            if (retVal.length === 1) {
                return retVal[0];
            }
            else if (retVal.length > 0) {
                return { or: retVal };
            }
            return null;
        }
    }
    /**
     * @param {?} collectionName
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    static fixCollectionName(collectionName, isAggregationQuery) {
        switch (collectionName) {
            case 'missiondescriptions':
                return isAggregationQuery ? 'missiondescription' : collectionName;
            case 'groups':
                return isAggregationQuery ? 'group' : collectionName;
            case 'feedsComments':
                return isAggregationQuery ? 'feedsComment' : collectionName;
            case 'users':
                return 'user';
            default:
                return collectionName;
        }
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    static getPublicCollectionName(collectionName) {
        switch (collectionName) {
            case 'locations':
                return 'stores';
            case 'user':
            case 'users':
                return 'users';
            case 'locationtypes':
                return 'store-types';
            case 'missiondescriptions':
                return 'campaigns';
            case 'feeds':
                return 'news';
            default:
                return collectionName;
        }
    }
    /**
     * @param {?} params
     * @return {?}
     */
    static getPhotoFromParams(params) {
        if (params && params.node && params.node.data) {
            /** @type {?} */
            let row = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            /** @type {?} */
            let f = params.colDef.field.replace('.value', '');
            /** @type {?} */
            let photo = Models.extractPhoto(row[f], row, {}, f);
            return photo;
        }
        return null;
    }
    // get photos for multiphoto component
    /**
     * @param {?} params
     * @return {?}
     */
    static getPhotosFromParams(params) {
        if (params && params.node && params.node.data) {
            /** @type {?} */
            let row = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            /** @type {?} */
            let f = params.colDef.field.replace('.value', '');
            // field name
            /** @type {?} */
            let photos = [];
            if (row && f && row[f] && row[f].value && isArray(row[f].value)) {
                row[f].value.forEach((/**
                 * @param {?} v
                 * @param {?} multiIndex
                 * @return {?}
                 */
                (v, multiIndex) => {
                    photos.push(Models.extractPhoto(v, row, {}, f, FormFieldType.multiphotos, null, multiIndex));
                }));
            }
            return photos;
        }
        return null;
    }
    /**
     * @param {?} collectionName
     * @return {?}
     */
    static getEmptyUrl(collectionName) {
        switch (collectionName) {
            case 'dashboards':
            case 'dashboard':
                return 'dashboard.svg';
            case 'missions':
            case 'mission':
                return 'mission.svg';
            case 'missiondescriptions':
            case 'missiondescription':
            case 'campaign':
                return 'campaign.svg';
            case 'photos':
            case 'photo':
                return 'photo.svg';
            case 'feeds':
            case 'feed':
                return 'feed.svg';
            case 'files':
            case 'file':
                return 'file.svg';
            case 'locations':
            case 'location':
                return 'location.svg';
            case 'notes':
            case 'note':
                return 'note.svg';
            case 'users':
            case 'user':
                return 'user.svg';
        }
        return 'empty.svg';
    }
    /**
     * @param {?} data
     * @param {?} missiondata
     * @param {?} field
     * @param {?} name
     * @param {?=} type
     * @param {?=} hideUser
     * @param {?=} multiIndex
     * @return {?}
     */
    static extractPhoto(data, missiondata, field, name, type, hideUser = false, multiIndex) {
        /** @type {?} */
        let photo = {};
        if (data || (field && field.type === 'image' && field.image && field.image._downloadURL)) {
            if (data && data.value && ((data.value.indexOf && data.value.indexOf('http') === 0) || isImageFile(data.value)) && (!type || !data.fieldType || data.fieldType === type)) {
                photo = {
                    value: data.value,
                    comments: data.comments,
                    tags: data.tags,
                    flagged: data.flagged,
                    edit: data.edit,
                    stitch: data.stitch,
                    editBy: data.editBy,
                    editWidth: data.editWidth,
                    editHeight: data.editHeight,
                    texts: data.texts,
                    svgData: data.svgData
                };
            }
            else if (data && ((data.indexOf && data.indexOf('http') === 0) || isImageFile(data))) {
                if (type && type === FormFieldType.multiphotos) {
                    /** @type {?} */
                    let fieldData = get(missiondata, field.name || name);
                    /** @type {?} */
                    let extraData = fieldData && ((/** @type {?} */ (fieldData))).extraData ? ((/** @type {?} */ (fieldData))).extraData : {};
                    photo = {
                        value: data,
                        tags: extraData[multiIndex] ? extraData[multiIndex].tags : null,
                        flagged: extraData[multiIndex] ? extraData[multiIndex].flagged : null,
                        edit: extraData[multiIndex] ? extraData[multiIndex].edit : null,
                        stitch: extraData[multiIndex] ? extraData[multiIndex].stitch : null,
                        editBy: extraData[multiIndex] ? extraData[multiIndex].editBy : null,
                        editWidth: extraData[multiIndex] ? extraData[multiIndex].editWidth : null,
                        editHeight: extraData[multiIndex] ? extraData[multiIndex].editHeight : null,
                        texts: extraData[multiIndex] ? extraData[multiIndex].texts : [],
                        svgData: extraData[multiIndex] ? extraData[multiIndex].svgData : null,
                        isMulti: true
                    };
                }
                else {
                    photo = { value: data };
                }
            }
            else if (field && field.type === 'image' && field.image && field.image._downloadURL) {
                photo = {
                    name: field.name || name,
                    title: field.title,
                    value: field.image._downloadURL,
                    isImage: true
                };
            }
            if (!isEmpty(photo)) {
                if (!field || field.type !== 'image') {
                    assign(photo, {
                        title: field.title,
                        name: field.name || name,
                        multiIndex: multiIndex,
                        _id: missiondata._id + ' _' + (field.name || name),
                        missiondescriptionRef: missiondata.missiondescriptionRef,
                        missiondescription: missiondata.missiondescription,
                        missiondata: missiondata,
                        missiondataRef: missiondata._id,
                        mission: missiondata.mission,
                        missionRef: missiondata.missionRef,
                        userRef: missiondata.userRef,
                        userDisplayname: hideUser ? '' : missiondata.userDisplayname,
                        address: missiondata.address,
                        location: missiondata.location,
                        validated: missiondata.validated,
                        _acl: missiondata._acl
                    });
                }
                if (field.isImageRecognition && photo.stitch) {
                    photo.value = photo.stitch;
                }
                return photo;
            }
        }
        return null;
    }
    /*
           Return the transform to extract the fields from a mission description
       */
    /**
     * @param {?=} types
     * @return {?}
     */
    static getFieldTransform(types = []) {
        /**
         * @param {?} res
         * @return {?}
         */
        function getFieldTransformInternal(res) {
            if (res.data && res.data.forEach) {
                /** @type {?} */
                let fields = [];
                res.data.forEach((/**
                 * @param {?} missiondescription
                 * @return {?}
                 */
                (missiondescription) => {
                    /** @type {?} */
                    let missionFields = Models.getFields(missiondescription, types);
                    missionFields = missionFields.map((/**
                     * @param {?} field
                     * @return {?}
                     */
                    (field) => {
                        return assign(field, {
                            _id: field.name,
                            name: field.name + '.value',
                            operators: Models.getFieldOperator(field),
                            slideTitle: missiondescription.title
                        });
                    }));
                    fields = fields.concat(missionFields);
                }));
                res.data = fields;
            }
            return res;
        }
        return getFieldTransformInternal;
    }
    /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    static getFields(missiondescription, types = [], excludedTypes = []) {
        return Models.getFieldsFromSlides(missiondescription.slides, types, excludedTypes);
    }
    /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    static getFieldsFromSlides(slides, types = [], excludedTypes = []) {
        /** @type {?} */
        let fields = [];
        if (slides) {
            slides.forEach((/**
             * @param {?} slide
             * @param {?} index
             * @return {?}
             */
            (slide, index) => {
                if (slide.items) {
                    slide.items.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    item => {
                        item.slideTitle = slide.title;
                        if (!types || types.length === 0 || types.indexOf(item.type) >= 0) {
                            if (!excludedTypes || excludedTypes.length === 0 || excludedTypes.indexOf(item.type) < 0) {
                                item.slideIndex = index;
                                fields.push(item);
                            }
                        }
                    }));
                }
            }));
        }
        return fields;
    }
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    static exportFilterField(f) {
        /** @type {?} */
        let filter = {};
        if (isArray(f.value) && f.value.length === 0) {
            return filter;
        }
        if (f.handleUndefined && isPresent(f.value) && isArray(f.value)) {
            if (f.value.indexOf(undefined) < 0 && f.value.indexOf('undefined') < 0) {
                filter[f.field] = {};
                filter[f.field][f.operator._id] = f.value;
            }
            else {
                /** @type {?} */
                let def = filter;
                def[f.field] = {};
                def[f.field][f.operator._id] = map(f.value, (/**
                 * @param {?} v
                 * @return {?}
                 */
                v => {
                    return v === undefined || v === 'undefined' ? null : v;
                }));
            }
        }
        else {
            filter[f.field] = {};
            if (f.type === FormFieldType.address && f.value && (isArray(f.value) || isArray(f.value._geoloc))) {
                filter[f.field] = {
                    nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: f.value && f.value._geoloc ? f.value._geoloc : f.value
                        },
                        $maxDistance: f.radius * 1000 || 40000
                    }
                };
            }
            else if (f.operator._id === 'nearSphere' && f.value && (isArray(f.value) || isArray(f.value._geoloc))) {
                filter[f.field] = {
                    nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: f.value && f.value._geoloc ? f.value._geoloc : f.value
                        },
                        $maxDistance: f.max || 40000
                    }
                };
            }
            else if (f.type === FormFieldType.date && f.operator._id === 'eq') {
                filter[f.field]['between'] = [f.value, dateFormat(dateAdd(f.value, 'days', 1), 'YYYY-MM-dd')];
            }
            else if (isPresent(f.value)) {
                /** @type {?} */
                let value = isArray(f.value) && isObject(f.value[0]) ? map(f.value, '_id') : isArray(f.value) ? f.value : isObject(f.value) ? f.value._id : f.value;
                if (f.operator && f.operator._id === 'eq') {
                    filter[f.field] = value;
                    // } else if (f.operator && f.operator._id === 'between' && isArray(f.value) && f.value.length > 1) {
                    //     filter[f.field] = { 'gte': f.value[0], 'lt': f.value[1] };
                }
                else {
                    filter[f.field][f.operator._id] = value;
                }
            }
            if (f.operator && (f.operator._id === 'like' || f.operator._id === 'nlike')) {
                filter[f.field].options = 'i';
            }
        }
        return filter;
    }
    /**
     * @private
     * @param {?} className
     * @param {?=} override
     * @return {?}
     */
    static createOrGetModel(className, override) {
        Models._models = Models._models || new Map();
        if (Models._models.has(className) && override !== true) {
            return Models._models.get(className);
        }
        else {
            /** @type {?} */
            let model = new IModel(className);
            Models._models.set(className, model);
            return model;
        }
    }
    /**
     * @private
     * @param {?} className
     * @param {?} model
     * @return {?}
     */
    static updateModel(className, model) {
        /** @type {?} */
        let formFields = model.formFields || [];
        if (formFields.findIndex((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name === '_tenant')) < 0 && model.collectionName && model.collectionName !== 'tenants') {
            formFields.push({
                required: true,
                name: '_tenant',
                title: 'TENANT',
                type: FormFieldType.autocomplete,
                condition: [ROLES_CONDITIONS.isAdmin],
                collectionName: 'tenants',
                multiple: false,
                columnDefinition: { name: 'name' },
                suppressExport: true,
                visible: false
            });
        }
        model.formFields = formFields;
        Models._models.set(className, model);
    }
}
Models._models = new Map();
Models.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Models._models;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbW9kZWxzL21vZGVscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBOEQsc0JBQXNCLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSx5QkFBeUIsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFOVYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBRW5GLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7OztBQU9ySSxNQUFNLE9BQU8sTUFBTTs7Ozs7O0lBR1YsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQWlCLEVBQUUsU0FBaUI7O1lBQy9ELEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7OztJQUVNLE1BQU0sQ0FBQyxl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QUFFO2dCQUNsQyxjQUFjLEVBQUUsSUFBSTtnQkFDcEIsT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFDLENBQUM7U0FDSjtRQUNELEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOztBQTlyQmMsY0FBTyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDOztZQUZwRCxVQUFVOzs7Ozs7O0lBRVQsZUFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1ByZXNlbnQsIGRhdGVGb3JtYXQsIGRhdGVBZGQsIEZpbHRlcnMsIEZpbHRlckZpZWxkLCBGaWx0ZXJPcGVyYXRvciwgU3ViUXVlcnksIElGb3JtRmllbGQsIE1PQklMRV9GT1JNX0ZJRUxEU19BTEwsIEZvcm1GaWVsZFR5cGUsIGlzSW1hZ2VGaWxlLCBpc051bWJlckZpZWxkLCBpc0Jvb2xlYW5GaWVsZCwgaXNQaG90b0ZpZWxkLCBpc011bHRpUGhvdG9zRmllbGQsIGlzUGhvdG9Pck11bHRpUGhvdG9zRmllbGQsIGlzVmlkZW9GaWVsZCwgaXNEYXRlVGltZUZpZWxkLCBpc0ludGVydmFsRmllbGQsIGlzTXVsdGlwbGVGaWVsZCwgaXNDb2xvcmVkRmllbGQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgUmVzcG9uc2VPYmplY3QgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3Jlc3BvbnNlLW9iamVjdC9yZXNwb25zZS1vYmplY3QuaW50ZXJmYWNlJztcbmltcG9ydCB7IElNb2RlbCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvbW9kZWwvbW9kZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7IFJPTEVTX0NPTkRJVElPTlMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2NvbmRpdGlvbi9pY29uZGl0aW9uLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IGNsb25lRGVlcCwgY29tcGFjdCwgdW5pcSwgdW5pb24sIGlzQXJyYXksIGlzT2JqZWN0LCBpc1N0cmluZywgbWFwLCBwdWxsLCBhc3NpZ24sIGlzRW1wdHksIGdldCwgZmluZEluZGV4IH0gZnJvbSAnbG9kYXNoLWVzJztcblxuLyoqIEBuYW1lIE1vZGVsc1xuICogQGFuZ3VsYXJUeXBlIHNlcnZpY2VcbiAqIEBkZXNjcmlwdGlvbiBBIHBvd2VyZnVsIHNlcnZpY2Ugd2hpY2ggZ2V0cyB0aGUgbW9kZWwgZm9yIGEgY29sbGVjdGlvbiBvciBjbGFzcy4gVGhlIG1vZGVsIGNvdWxkIGluY2x1ZGUgZm9ybSBmaWVsZHMsIHNlYXJjaGFibGUgZmllbGRzIGFuZCBtYXBwaW5nIGZpZWxkcyB3aGljaCBhcmUgdXNlZnVsIGZvciBnZW5lcmF0aW5nIGZvcm1zIG9yIGZpbHRlcnMgcmVsYXRlZCB0byB0aGUgY29sbGVjdGlvbiBvciBjbGFzcy5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGVscyB7XG4gIHByaXZhdGUgc3RhdGljIF9tb2RlbHMgPSBuZXcgTWFwPHN0cmluZywgSU1vZGVsPigpO1xuXG4gIHB1YmxpYyBzdGF0aWMgYWRkU2VhcmNoYWJsZUZpZWxkKGNsYXNzTmFtZTogc3RyaW5nLCBmaWVsZE5hbWU6IHN0cmluZykge1xuICAgIGxldCBtb2RlbCA9IHRoaXMuY3JlYXRlT3JHZXRNb2RlbChjbGFzc05hbWUpO1xuICAgIG1vZGVsLnNlYXJjaGFibGVGaWVsZHMucHVzaChmaWVsZE5hbWUpO1xuICAgIHRoaXMudXBkYXRlTW9kZWwoY2xhc3NOYW1lLCBtb2RlbCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFkZE1hcHBpbmdGaWVsZChjbGFzc05hbWU6IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcsIG9yZGVyOiBudW1iZXIpIHtcbiAgICBsZXQgbW9kZWwgPSB0aGlzLmNyZWF0ZU9yR2V0TW9kZWwoY2xhc3NOYW1lKTtcbiAgICBtb2RlbC5tYXBwaW5nRmllbGRzLnNldChvcmRlciwgZmllbGROYW1lKTtcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKGNsYXNzTmFtZSwgbW9kZWwpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhZGRBcHBlYXJhbmNlKGNsYXNzTmFtZTogc3RyaW5nLCBlbnRpdHlMaXN0SXRlbVByb3BlcnR5OiBzdHJpbmcsIGFwcGVhcmFuY2U6IGFueSkge1xuICAgIGxldCBtb2RlbCA9IHRoaXMuY3JlYXRlT3JHZXRNb2RlbChjbGFzc05hbWUpO1xuICAgIG1vZGVsLmFwcGVhcmFuY2Uuc2V0KGVudGl0eUxpc3RJdGVtUHJvcGVydHksIGFwcGVhcmFuY2UpO1xuICAgIHRoaXMudXBkYXRlTW9kZWwoY2xhc3NOYW1lLCBtb2RlbCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFkZEZvcm1GaWVsZChjbGFzc05hbWU6IHN0cmluZywgZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICBsZXQgbW9kZWwgPSB0aGlzLmNyZWF0ZU9yR2V0TW9kZWwoY2xhc3NOYW1lKTtcbiAgICBsZXQgZm9ybUZpZWxkcyA9IG1vZGVsLmZvcm1GaWVsZHM7XG4gICAgZm9ybUZpZWxkcyA9IGZvcm1GaWVsZHMuZmlsdGVyKGYgPT4gZi5uYW1lICE9PSBmaWVsZC5uYW1lKTtcbiAgICBmb3JtRmllbGRzLnB1c2goZmllbGQpO1xuICAgIG1vZGVsLmZvcm1GaWVsZHMgPSBmb3JtRmllbGRzO1xuICAgIHRoaXMudXBkYXRlTW9kZWwoY2xhc3NOYW1lLCBtb2RlbCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFkZEJhc2VNb2RlbChjbGFzc05hbWU6IHN0cmluZywgYmFzZUNsYXNzTmFtZTogc3RyaW5nLCB0YXJnZXQpIHtcbiAgICBsZXQgbW9kZWwgPSB0aGlzLmNyZWF0ZU9yR2V0TW9kZWwoY2xhc3NOYW1lKTtcbiAgICBsZXQgYmFzZSA9IHRoaXMuY3JlYXRlT3JHZXRNb2RlbChiYXNlQ2xhc3NOYW1lKTtcbiAgICBsZXQgZm9ybUZpZWxkcyA9IG1vZGVsLmZvcm1GaWVsZHMgfHwgW107XG5cbiAgICBsZXQgYmFzZUZpZWxkcyA9IFtdO1xuICAgIGlmIChiYXNlLmZvcm1GaWVsZHMpIHtcbiAgICAgIGJhc2UuZm9ybUZpZWxkcy5tYXAoZmllbGQgPT4ge1xuICAgICAgICBpZiAoZm9ybUZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09IGZpZWxkLm5hbWUpIDwgMCkge1xuICAgICAgICAgIGJhc2VGaWVsZHMucHVzaChjbG9uZURlZXAoZmllbGQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbW9kZWwuZm9ybUZpZWxkcyA9IGNvbXBhY3QodW5pb24oYmFzZUZpZWxkcywgZm9ybUZpZWxkcykpO1xuICAgIG1vZGVsLnNlYXJjaGFibGVGaWVsZHMgPSB1bmlxKHVuaW9uKGNsb25lRGVlcChiYXNlLnNlYXJjaGFibGVGaWVsZHMpLCBtb2RlbC5zZWFyY2hhYmxlRmllbGRzKSk7XG4gICAgbW9kZWwudHlwZSA9IHRhcmdldDtcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKGNsYXNzTmFtZSwgbW9kZWwpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXRDb2xsZWN0aW9uTmFtZShjbGFzc05hbWU6IHN0cmluZywgY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZmllbGRzOiBhbnksIGluY2x1ZGU6IGFueSwgc2VhcmNoU3VicXVlcnk6IGFueSwgZmVhdGhlcnNTZXJ2aWNlOiBzdHJpbmcsIHRhcmdldDogYW55LCBpc0N1c3RvbT86IGJvb2xlYW4sIGRldGFpbENvbXBvbmVudD86IHN0cmluZywgaWNvbj86IHN0cmluZykge1xuICAgIGxldCBtb2RlbCA9IHRoaXMuY3JlYXRlT3JHZXRNb2RlbChjbGFzc05hbWUpO1xuICAgIG1vZGVsLmNvbGxlY3Rpb25OYW1lID0gY29sbGVjdGlvbk5hbWU7XG4gICAgbW9kZWwuZmllbGRzID0gZmllbGRzO1xuICAgIG1vZGVsLmluY2x1ZGUgPSBpbmNsdWRlO1xuICAgIG1vZGVsLnNlYXJjaFN1YnF1ZXJ5ID0gc2VhcmNoU3VicXVlcnk7XG4gICAgbW9kZWwudHlwZSA9IHRhcmdldDtcbiAgICBtb2RlbC5mZWF0aGVyc1NlcnZpY2UgPSBmZWF0aGVyc1NlcnZpY2U7XG4gICAgbW9kZWwuaXNDdXN0b20gPSBpc0N1c3RvbTtcbiAgICBtb2RlbC5kZXRhaWxDb21wb25lbnQgPSBkZXRhaWxDb21wb25lbnQ7XG4gICAgbW9kZWwuaWNvbiA9IGljb247XG4gICAgaWYgKG1vZGVsLmNvbGxlY3Rpb25OYW1lICYmIG1vZGVsLmNvbGxlY3Rpb25OYW1lICE9PSAndGVuYW50cycpIHtcbiAgICAgIG1vZGVsLmluY2x1ZGUgPSBtb2RlbC5pbmNsdWRlIHx8IFtdO1xuICAgICAgaWYgKG1vZGVsLmluY2x1ZGUuaW5kZXhPZignX3RlbmFudCcpIDwgMCkge1xuICAgICAgICBtb2RlbC5pbmNsdWRlLnB1c2goJ190ZW5hbnQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChtb2RlbC5maWVsZHMgJiYgbW9kZWwuZmllbGRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbW9kZWwuZmllbGRzLnB1c2goJ190ZW5hbnQubmFtZScpO1xuICAgICAgICBtb2RlbC5maWVsZHMucHVzaCgnX3RlbmFudC50aXRsZScpO1xuICAgICAgICBtb2RlbC5maWVsZHMucHVzaCgnX3RlbmFudC5pY29uJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudXBkYXRlTW9kZWwoY2xhc3NOYW1lLCBtb2RlbCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNsZWFyQ29sbGVjdGlvbk5hbWUoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICBNb2RlbHMuX21vZGVscy5kZWxldGUoY2xhc3NOYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWwoY2xhc3NOYW1lOiBzdHJpbmcgfCBUeXBlPGFueT4pOiBJTW9kZWwge1xuICAgIGxldCByZXRWYWw7XG4gICAgaWYgKGlzU3RyaW5nKGNsYXNzTmFtZSkgPT09IHRydWUpIHtcbiAgICAgIHJldFZhbCA9IHRoaXMuY3JlYXRlT3JHZXRNb2RlbCg8c3RyaW5nPmNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE1vZGVscy5fbW9kZWxzLmZvckVhY2gobSA9PiB7XG4gICAgICAgIGlmIChtLnR5cGUgJiYgbS50eXBlID09PSBjbGFzc05hbWUpIHtcbiAgICAgICAgICByZXRWYWwgPSBtO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpOiBJTW9kZWwge1xuICAgIGxldCBtb2RlbDtcbiAgICBNb2RlbHMuX21vZGVscy5mb3JFYWNoKG0gPT4ge1xuICAgICAgaWYgKG0uY29sbGVjdGlvbk5hbWUgPT09IGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICAgIG1vZGVsID0gbTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIW1vZGVsICYmIGNvbGxlY3Rpb25OYW1lICYmIGNvbGxlY3Rpb25OYW1lLmVuZHNXaXRoKCdfc3RvcmUnKSkge1xuICAgICAgbGV0IG5hbWUgPSBjb2xsZWN0aW9uTmFtZS5yZXBsYWNlKCdfc3RvcmUnLCAnJyk7XG4gICAgICBpZiAobmFtZSA9PT0gJ21pc3Npb25kZXNjcmlwdGlvbicpIHtcbiAgICAgICAgbmFtZSArPSAncyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gTW9kZWxzLmdldE1vZGVsQnlDb2xsZWN0aW9uTmFtZShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vZGVsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRGaWx0ZXJhYmxlRmllbGRzKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGFkdmFuY2VkRmlsdGVyc0ZpZWxkcz86IEFycmF5PElGb3JtRmllbGQ+LCBjYW1wYWlnbkZpZWxkcz86IEFycmF5PElGb3JtRmllbGQ+LCBpc0FkbWluOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBsZXQgZmllbGRzOiBBcnJheTxJRm9ybUZpZWxkPiA9IFtdO1xuICAgIGxldCBtb2RlbCA9IE1vZGVscy5nZXRNb2RlbEJ5Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWUpO1xuICAgIGlmIChtb2RlbCAmJiBtb2RlbC5mb3JtRmllbGRzKSB7XG4gICAgICBmaWVsZHMgPSBjbG9uZURlZXAobW9kZWwuZm9ybUZpZWxkcyk7XG4gICAgfVxuXG4gICAgaWYgKG1vZGVsICYmIG1vZGVsLmlzQ3VzdG9tICYmIGZpZWxkcykge1xuICAgICAgZmllbGRzLmZvckVhY2goZiA9PiB7XG4gICAgICAgIGYuZmlsdGVyYWJsZSA9IGYuc2VhcmNoYWJsZTtcbiAgICAgICAgZi5zb3J0YWJsZSA9IGYudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5kYXRlIHx8IGYudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5kYXRldGltZSB8fCBmLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUubnVtYmVyO1xuICAgICAgICBpZiAoZi50eXBlID09PSBGb3JtRmllbGRUeXBlLmxvY2F0aW9uKSB7XG4gICAgICAgICAgZi5maWx0ZXJOYW1lID0gZi5uYW1lICsgJ1JlZic7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChhZHZhbmNlZEZpbHRlcnNGaWVsZHMgJiYgYWR2YW5jZWRGaWx0ZXJzRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGFkdmFuY2VkRmlsdGVyc0ZpZWxkcy5mb3JFYWNoKGFmID0+IHtcbiAgICAgICAgbGV0IGluZGV4ID0gZmluZEluZGV4KGZpZWxkcywgZiA9PiBmLm5hbWUgPT09IGFmLm5hbWUpO1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgZmllbGRzLnB1c2goYWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpZWxkc1tpbmRleF0gPSB7IC4uLmZpZWxkc1tpbmRleF0sIC4uLmFmIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjYW1wYWlnbkZpZWxkcykge1xuICAgICAgY2FtcGFpZ25GaWVsZHMgPSBjbG9uZURlZXAoY2FtcGFpZ25GaWVsZHMpO1xuICAgICAgY2FtcGFpZ25GaWVsZHMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgYy5uYW1lICs9ICcudmFsdWUnO1xuICAgICAgICBjLmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAvL2Muc29ydGFibGUgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICBmaWVsZHMgPSBmaWVsZHMuY29uY2F0KGNhbXBhaWduRmllbGRzKTtcbiAgICB9XG5cbiAgICBsZXQgdGVuYW50SW5kZXggPSBmaW5kSW5kZXgoZmllbGRzLCBmID0+IGYubmFtZSA9PT0gJ190ZW5hbnQnKTtcbiAgICBpZiAodGVuYW50SW5kZXggPj0gMCAmJiAhaXNBZG1pbikge1xuICAgICAgZmllbGRzW3RlbmFudEluZGV4XS5maWx0ZXJhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIGxldCBmaW5hbEZpZWxkczogQXJyYXk8SUZvcm1GaWVsZD4gPSBbXTtcbiAgICBmaWVsZHMuZm9yRWFjaChmID0+IHtcbiAgICAgIGZpbmFsRmllbGRzLnB1c2goZik7XG4gICAgICBpZiAoZi5jb2xsZWN0aW9uTmFtZSAmJiBmLmNvbGxlY3Rpb25OYW1lICE9PSBjb2xsZWN0aW9uTmFtZSAmJiBmLmZpbHRlcmFibGUgPT09IHRydWUgJiYgZi5zaG93U3ViUXVlcnlGaWx0ZXJzID09PSB0cnVlKSB7XG4gICAgICAgIE1vZGVscy5nZXRNb2RlbEJ5Q29sbGVjdGlvbk5hbWUoZi5jb2xsZWN0aW9uTmFtZSkuZm9ybUZpZWxkcy5mb3JFYWNoKHN1YmZpZWxkID0+IHtcbiAgICAgICAgICBzdWJmaWVsZCA9IGNsb25lRGVlcChzdWJmaWVsZCk7XG4gICAgICAgICAgZGVsZXRlIHN1YmZpZWxkLmFkdmFuY2VkO1xuICAgICAgICAgIHN1YmZpZWxkLmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgIHN1YmZpZWxkLmljb24gPSAneW8tdGFnJztcbiAgICAgICAgICAvL3RoaXMgaXMgdXNlZCBpbiB0aGUgY2hhbmVsIGNvbGxlY3Rpb24gd2hlcmUgd2Ugd2FudCB0byBvdmVycmlkZSB0aGUgc3ViUXVlcnkgZGVmaW5lZCBpbiB0aGUgdXNlciBpbnRlcmZhY2VcbiAgICAgICAgICAvL3RoaXMgZXZlbiBhbGxvdyB1cyB0byBmaWx0ZXIgb24gYW55IHN1YmZpZWxkIG9mIGEgdXNlciB0byBsb29rIGZvciBjaGFubmVsXG4gICAgICAgICAgaWYgKGYuc3ViUXVlcnkpIHtcbiAgICAgICAgICAgIHN1YmZpZWxkLnN1YlF1ZXJ5ID0gc3ViZmllbGQuc3ViUXVlcnkgfHwgZi5zdWJRdWVyeTtcbiAgICAgICAgICAgIGlmICghc3ViZmllbGQuc2Vzc2lvblZhbHVlcykge1xuICAgICAgICAgICAgICBzdWJmaWVsZC5jb2xsZWN0aW9uTmFtZSA9IHN1YmZpZWxkLmNvbGxlY3Rpb25OYW1lIHx8IGYuY29sbGVjdGlvbk5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdWJmaWVsZC5zdWJRdWVyeSkge1xuICAgICAgICAgICAgaWYgKGYuc3ViUXVlcnlPdmVycmlkZSkge1xuICAgICAgICAgICAgICBzdWJmaWVsZC5zdWJRdWVyeSA9IGYuc3ViUXVlcnlPdmVycmlkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YmZpZWxkLmlzU3ViUXVlcnkgPSB0cnVlO1xuICAgICAgICAgICAgc3ViZmllbGQubmFtZSA9IHN1YmZpZWxkLmNvbGxlY3Rpb25OYW1lICsgJ18nICsgc3ViZmllbGQubmFtZTtcbiAgICAgICAgICAgIGZpbmFsRmllbGRzLnB1c2goc3ViZmllbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZpbmFsRmllbGRzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRGaWVsZE5hbWUoZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICBsZXQgZmllbGROYW1lID0gZmllbGQubmFtZSArIChmaWVsZC5jb2x1bW5EZWZpbml0aW9uICYmIGZpZWxkLmNvbHVtbkRlZmluaXRpb24ubmFtZSA/ICcuJyArIGZpZWxkLmNvbHVtbkRlZmluaXRpb24ubmFtZSA6ICcnKTtcbiAgICBpZiAoZmllbGQuY29sdW1uRGVmaW5pdGlvbiAmJiBmaWVsZC5jb2x1bW5EZWZpbml0aW9uLmZvcmNlTmFtZSkge1xuICAgICAgZmllbGROYW1lID0gZmllbGQuY29sdW1uRGVmaW5pdGlvbi5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGROYW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRGaWVsZFRpdGxlKGZpZWxkOiBJRm9ybUZpZWxkLCB0cmFuc2xhdGU6IGFueSkge1xuICAgIGxldCBmaWVsZFRpdGxlID0gZmllbGQudGl0bGUgfHwgZmllbGQubmFtZTtcbiAgICBmaWVsZFRpdGxlID0gdHJhbnNsYXRlLnBvbHlnbG90KGZpZWxkVGl0bGUpO1xuICAgIHJldHVybiBmaWVsZFRpdGxlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0Jvb2xlYW5GaWVsZChmaWVsZDogSUZvcm1GaWVsZCkge1xuICAgIHJldHVybiBpc0Jvb2xlYW5GaWVsZChmaWVsZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTnVtYmVyRmllbGQoZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICByZXR1cm4gaXNOdW1iZXJGaWVsZChmaWVsZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzUGhvdG9GaWVsZChmaWVsZDogSUZvcm1GaWVsZCkge1xuICAgIHJldHVybiBpc1Bob3RvRmllbGQoZmllbGQpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc011bHRpUGhvdG9zRmllbGQoZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICByZXR1cm4gaXNNdWx0aVBob3Rvc0ZpZWxkKGZpZWxkKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNQaG90b09yTXVsdGlQaG90b3NGaWVsZChmaWVsZDogSUZvcm1GaWVsZCkge1xuICAgIHJldHVybiBpc1Bob3RvT3JNdWx0aVBob3Rvc0ZpZWxkKGZpZWxkKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNWaWRlb0ZpZWxkKGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgcmV0dXJuIGlzVmlkZW9GaWVsZChmaWVsZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzRGF0ZVRpbWVGaWVsZChmaWVsZDogSUZvcm1GaWVsZCkge1xuICAgIHJldHVybiBpc0RhdGVUaW1lRmllbGQoZmllbGQpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0ludGVydmFsRmllbGQoZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICByZXR1cm4gaXNJbnRlcnZhbEZpZWxkKGZpZWxkKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNDaGFydGFibGVBdXRvRmllbGROb1Bob3RvKGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgcmV0dXJuIE1vZGVscy5pc0NoYXJ0YWJsZUF1dG9GaWVsZChmaWVsZCwgZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0NoYXJ0YWJsZUF1dG9GaWVsZChmaWVsZDogSUZvcm1GaWVsZCwgaW5jbHVkZVBob3RvID0gdHJ1ZSkge1xuICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLmNoZWNrYm94OlxuICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLnRvZ2dsZTpcblxuICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLnNlbGVjdDpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5zZWxlY3RtdWx0aTpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5zZWxlY3RidXR0b25zOlxuICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLnNlbGVjdGJ1dHRvbnNtdWx0aTpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5zdGFycmF0aW5nOlxuICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLm51bWJlcjpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5yYW5nZTpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5yYW5raW5nOlxuICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLmZvcm11bGE6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLnBob3RvOlxuICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLm11bHRpcGhvdG9zOlxuICAgICAgICByZXR1cm4gaW5jbHVkZVBob3RvO1xuXG4gICAgICBjYXNlIEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlOlxuICAgICAgICByZXR1cm4gIWZpZWxkLmNvbGxlY3Rpb25OYW1lIHx8IE1vZGVscy5nZXRNb2RlbChmaWVsZC5jb2xsZWN0aW9uTmFtZSkuaXNDdXN0b20gIT09IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNdWx0aXBsZUZpZWxkKGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgcmV0dXJuIGlzTXVsdGlwbGVGaWVsZChmaWVsZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQ29sb3JlZEZpZWxkKGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgcmV0dXJuIGlzQ29sb3JlZEZpZWxkKGZpZWxkKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RmllbGRPcGVyYXRvcihmaWVsZDogSUZvcm1GaWVsZCk6IEFycmF5PEZpbHRlck9wZXJhdG9yPiB7XG4gICAgaWYgKGZpZWxkLnR5cGUgPT09ICdmaWVsZHNlbGVjdG9yJykge1xuICAgICAgcmV0dXJuIFt7IHRpdGxlOiAnaW4nLCBfaWQ6ICdpbnEnIH1dO1xuICAgIH0gZWxzZSBpZiAoTW9kZWxzLmlzQm9vbGVhbkZpZWxkKGZpZWxkKSkge1xuICAgICAgcmV0dXJuIFt7IHRpdGxlOiAnZXF1YWxzJywgX2lkOiAnZXEnIH0sIHsgdGl0bGU6ICdub3RlcXVhbHMnLCBfaWQ6ICduZXEnIH1dO1xuICAgIH0gZWxzZSBpZiAoTW9kZWxzLmlzUGhvdG9GaWVsZChmaWVsZCkpIHtcbiAgICAgIHJldHVybiBbeyB0aXRsZTogJ2V4aXN0cycsIF9pZDogJ2V4aXN0cycgfV07XG4gICAgfSBlbHNlIGlmIChNb2RlbHMuaXNJbnRlcnZhbEZpZWxkKGZpZWxkKSB8fCBNb2RlbHMuaXNEYXRlVGltZUZpZWxkKGZpZWxkKSkge1xuICAgICAgcmV0dXJuIFt7IHRpdGxlOiAnZ3JlYXRlcnRoYW4nLCBfaWQ6ICdndGUnLCBpbnRlcnZhbDogdHJ1ZSB9LCB7IHRpdGxlOiAnYmV0d2VlbicsIF9pZDogJ2JldHdlZW4nLCBpbnRlcnZhbDogdHJ1ZSB9LCB7IHRpdGxlOiAnbGVzc3RoYW4nLCBfaWQ6ICdsdGUnLCBpbnRlcnZhbDogdHJ1ZSB9LCB7IHRpdGxlOiAnZXF1YWxzJywgX2lkOiAnZXEnLCBpbnRlcnZhbDogdHJ1ZSB9XTtcbiAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlIHx8IGZpZWxkLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUubG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBbeyB0aXRsZTogJ2luJywgX2lkOiAnaW5xJyB9LCB7IHRpdGxlOiAnbm90aW4nLCBfaWQ6ICduaW4nIH0sIHsgdGl0bGU6ICdhbGwnLCBfaWQ6ICdhbGwnIH1dO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3sgdGl0bGU6ICdsaWtlJywgX2lkOiAnbGlrZScgfSwgeyB0aXRsZTogJ25vdGxpa2UnLCBfaWQ6ICdubGlrZScgfSwgeyB0aXRsZTogJ2VxdWFscycsIF9pZDogJ2VxJyB9LCB7IHRpdGxlOiAnbm90ZXF1YWxzJywgX2lkOiAnbmVxJyB9XTtcbiAgICB9XG4gIH1cblxuICAvLyBwdWJsaWMgc3RhdGljIGdldEZvcm1GaWVsZEZyb21Nb2JpbGVGaWVsZCh0eXBlKSB7XG4gIC8vICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgLy8gICAgICAgICBjYXNlIEZvcm1GaWVsZFR5cGUucGhvdG86XG4gIC8vICAgICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLnNpZ25hdHVyZTpcbiAgLy8gICAgICAgICBjYXNlIEZvcm1GaWVsZFR5cGUuaW1hZ2U6XG4gIC8vICAgICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLmJhcmNvZGU6XG4gIC8vICAgICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLnZpZGVvOlxuICAvLyAgICAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5hdWRpbzpcbiAgLy8gICAgICAgICBjYXNlIEZvcm1GaWVsZFR5cGUuZG9jdW1lbnQ6XG4gIC8vICAgICAgICAgICAgIHJldHVybiBGb3JtRmllbGRUeXBlLnBob3RvO1xuICAvLyAgICAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5kYXRlOlxuICAvLyAgICAgICAgICAgICByZXR1cm4gRm9ybUZpZWxkVHlwZS5kYXRlO1xuICAvLyAgICAgICAgIGRlZmF1bHQ6XG4gIC8vICAgICAgICAgICAgIHJldHVybiBGb3JtRmllbGRUeXBlW3R5cGVdIHx8IEZvcm1GaWVsZFR5cGUudGV4dDtcbiAgLy8gICAgIH1cbiAgLy8gfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9iaWxlRmllbGRJY29uKHR5cGU6IHN0cmluZykge1xuICAgIGxldCBmaWVsZHMgPSBbXS5jb25jYXQoTU9CSUxFX0ZPUk1fRklFTERTX0FMTCkuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnR5cGUgPT09IHR5cGUpO1xuICAgIGlmIChmaWVsZHMgJiYgZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmaWVsZHNbMF0uaWNvbjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBleHBvcnRXaGVyZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBmaWx0ZXJzPzogRmlsdGVycywgZXhjbHVkZWRGaWVsZHMgPSBbXSkge1xuICAgIGxldCByZXRWYWwgPSBmaWx0ZXJzLm1hcChmcyA9PiB7XG4gICAgICBsZXQgc2ltcGxpZmllZEZpbHRlcnMgPSBbXTtcbiAgICAgIGZzLmZvckVhY2goZiA9PiB7XG4gICAgICAgIGlmICgoIWYuc3ViUXVlcnkgfHwgZi5jb2xsZWN0aW9uTmFtZSA9PT0gY29sbGVjdGlvbk5hbWUpICYmICghZXhjbHVkZWRGaWVsZHMgfHwgZXhjbHVkZWRGaWVsZHMuaW5kZXhPZihmLmZpZWxkKSA8IDApKSB7XG4gICAgICAgICAgLy8mJiAhZi5pc0ZpZWxkU2VsZWN0b3JcbiAgICAgICAgICBsZXQgZmlsdGVyID0gTW9kZWxzLmV4cG9ydEZpbHRlckZpZWxkKGYpO1xuICAgICAgICAgIGlmIChmaWx0ZXIgJiYgIWlzRW1wdHkoZmlsdGVyKSkge1xuICAgICAgICAgICAgc2ltcGxpZmllZEZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoc2ltcGxpZmllZEZpbHRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIGlmIChzaW1wbGlmaWVkRmlsdGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHNpbXBsaWZpZWRGaWx0ZXJzWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHsgYW5kOiBzaW1wbGlmaWVkRmlsdGVycyB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHJldFZhbCkge1xuICAgICAgcHVsbChyZXRWYWwsIG51bGwpO1xuICAgIH1cblxuICAgIGlmIChyZXRWYWwgJiYgcmV0VmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHJldFZhbFswXTtcbiAgICB9IGVsc2UgaWYgKHJldFZhbCAmJiByZXRWYWwubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHsgb3I6IHJldFZhbCB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZXhwb3J0U3ViUXVlcnkoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZmlsdGVycz86IEZpbHRlcnMgfCBPYmplY3QsIGlzQWdncmVnYXRpb25RdWVyeT86IGJvb2xlYW4pOiBTdWJRdWVyeSB8IEFycmF5PFN1YlF1ZXJ5PiB7XG4gICAgbGV0IHJldFZhbDogQXJyYXk8U3ViUXVlcnk+ID0gW107XG4gICAgaWYgKGZpbHRlcnMgJiYgaXNBcnJheShmaWx0ZXJzKSAmJiAoPEZpbHRlcnM+ZmlsdGVycykubGVuZ3RoID4gMCkge1xuICAgICAgKDxGaWx0ZXJzPmZpbHRlcnMpLmZvckVhY2goZnMgPT4ge1xuICAgICAgICBmcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgIGlmIChmLnN1YlF1ZXJ5ICYmIGYuY29sbGVjdGlvbk5hbWUgIT09IGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICAgICAgICByZXRWYWwucHVzaCh7XG4gICAgICAgICAgICAgIGNvbGxlY3Rpb25OYW1lOiB0aGlzLmZpeENvbGxlY3Rpb25OYW1lKGYuY29sbGVjdGlvbk5hbWUsIGlzQWdncmVnYXRpb25RdWVyeSksXG4gICAgICAgICAgICAgIHdoZXJlOiBNb2RlbHMuZXhwb3J0RmlsdGVyRmllbGQoZiksXG4gICAgICAgICAgICAgIGZpZWxkOiBmLnN1YlF1ZXJ5LmZpZWxkLFxuICAgICAgICAgICAgICB2YWx1ZXM6IGYuc3ViUXVlcnkudmFsdWVzLFxuICAgICAgICAgICAgICBsZWZ0Sm9pbjogZi5zdWJRdWVyeS5sZWZ0Sm9pblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsLmxlbmd0aCA9PT0gMSA/IHJldFZhbFswXSA6IHJldFZhbC5sZW5ndGggPiAxID8gcmV0VmFsIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZXhwb3J0U2VhcmNoKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoc2VhcmNoICYmIHNlYXJjaC5tYXRjaCAmJiBzZWFyY2gubWF0Y2goL15bMC05YS1mQS1GXXsyNH0kLykpIHtcbiAgICAgIHJldHVybiB7IF9pZDogc2VhcmNoIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXRWYWwgPSBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKS5zZWFyY2hhYmxlRmllbGRzLm1hcChmaWVsZCA9PiB7XG4gICAgICAgIGxldCBmaWx0ZXIgPSB7fTtcbiAgICAgICAgaWYgKGZpZWxkID09PSAnX2lkJyAmJiBjb2xsZWN0aW9uTmFtZSAhPT0gJ2dyb3VwcycpIHtcbiAgICAgICAgICBmaWx0ZXJbZmllbGRdID0gc2VhcmNoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbHRlcltmaWVsZF0gPSB7IGxpa2U6IHNlYXJjaCwgb3B0aW9uczogJ2knIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICAgIH0pO1xuICAgICAgaWYgKHJldFZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHJldFZhbFswXTtcbiAgICAgIH0gZWxzZSBpZiAocmV0VmFsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHsgb3I6IHJldFZhbCB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaXhDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBpc0FnZ3JlZ2F0aW9uUXVlcnk/OiBib29sZWFuKSB7XG4gICAgc3dpdGNoIChjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgY2FzZSAnbWlzc2lvbmRlc2NyaXB0aW9ucyc6XG4gICAgICAgIHJldHVybiBpc0FnZ3JlZ2F0aW9uUXVlcnkgPyAnbWlzc2lvbmRlc2NyaXB0aW9uJyA6IGNvbGxlY3Rpb25OYW1lO1xuICAgICAgY2FzZSAnZ3JvdXBzJzpcbiAgICAgICAgcmV0dXJuIGlzQWdncmVnYXRpb25RdWVyeSA/ICdncm91cCcgOiBjb2xsZWN0aW9uTmFtZTtcbiAgICAgIGNhc2UgJ2ZlZWRzQ29tbWVudHMnOlxuICAgICAgICByZXR1cm4gaXNBZ2dyZWdhdGlvblF1ZXJ5ID8gJ2ZlZWRzQ29tbWVudCcgOiBjb2xsZWN0aW9uTmFtZTtcbiAgICAgIGNhc2UgJ3VzZXJzJzpcbiAgICAgICAgcmV0dXJuICd1c2VyJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uTmFtZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFB1YmxpY0NvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpIHtcbiAgICBzd2l0Y2ggKGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICBjYXNlICdsb2NhdGlvbnMnOlxuICAgICAgICByZXR1cm4gJ3N0b3Jlcyc7XG4gICAgICBjYXNlICd1c2VyJzpcbiAgICAgIGNhc2UgJ3VzZXJzJzpcbiAgICAgICAgcmV0dXJuICd1c2Vycyc7XG4gICAgICBjYXNlICdsb2NhdGlvbnR5cGVzJzpcbiAgICAgICAgcmV0dXJuICdzdG9yZS10eXBlcyc7XG4gICAgICBjYXNlICdtaXNzaW9uZGVzY3JpcHRpb25zJzpcbiAgICAgICAgcmV0dXJuICdjYW1wYWlnbnMnO1xuICAgICAgY2FzZSAnZmVlZHMnOlxuICAgICAgICByZXR1cm4gJ25ld3MnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25OYW1lO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0UGhvdG9Gcm9tUGFyYW1zKHBhcmFtcykge1xuICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLm5vZGUgJiYgcGFyYW1zLm5vZGUuZGF0YSkge1xuICAgICAgbGV0IHJvdyA9IHBhcmFtcy5ub2RlLmRhdGEudG9KUyA/IHBhcmFtcy5ub2RlLmRhdGEudG9KUygpIDogcGFyYW1zLm5vZGUuZGF0YTtcbiAgICAgIGxldCBmID0gcGFyYW1zLmNvbERlZi5maWVsZC5yZXBsYWNlKCcudmFsdWUnLCAnJyk7XG4gICAgICBsZXQgcGhvdG8gPSBNb2RlbHMuZXh0cmFjdFBob3RvKHJvd1tmXSwgcm93LCB7fSwgZik7XG4gICAgICByZXR1cm4gcGhvdG87XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gZ2V0IHBob3RvcyBmb3IgbXVsdGlwaG90byBjb21wb25lbnRcbiAgcHVibGljIHN0YXRpYyBnZXRQaG90b3NGcm9tUGFyYW1zKHBhcmFtcykge1xuICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLm5vZGUgJiYgcGFyYW1zLm5vZGUuZGF0YSkge1xuICAgICAgbGV0IHJvdyA9IHBhcmFtcy5ub2RlLmRhdGEudG9KUyA/IHBhcmFtcy5ub2RlLmRhdGEudG9KUygpIDogcGFyYW1zLm5vZGUuZGF0YTtcbiAgICAgIGxldCBmID0gcGFyYW1zLmNvbERlZi5maWVsZC5yZXBsYWNlKCcudmFsdWUnLCAnJyk7IC8vIGZpZWxkIG5hbWVcbiAgICAgIGxldCBwaG90b3MgPSBbXTtcbiAgICAgIGlmIChyb3cgJiYgZiAmJiByb3dbZl0gJiYgcm93W2ZdLnZhbHVlICYmIGlzQXJyYXkocm93W2ZdLnZhbHVlKSkge1xuICAgICAgICByb3dbZl0udmFsdWUuZm9yRWFjaCgodiwgbXVsdGlJbmRleCkgPT4ge1xuICAgICAgICAgIHBob3Rvcy5wdXNoKE1vZGVscy5leHRyYWN0UGhvdG8odiwgcm93LCB7fSwgZiwgRm9ybUZpZWxkVHlwZS5tdWx0aXBob3RvcywgbnVsbCwgbXVsdGlJbmRleCkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwaG90b3M7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRFbXB0eVVybChjb2xsZWN0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgc3dpdGNoIChjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgY2FzZSAnZGFzaGJvYXJkcyc6XG4gICAgICBjYXNlICdkYXNoYm9hcmQnOlxuICAgICAgICByZXR1cm4gJ2Rhc2hib2FyZC5zdmcnO1xuXG4gICAgICBjYXNlICdtaXNzaW9ucyc6XG4gICAgICBjYXNlICdtaXNzaW9uJzpcbiAgICAgICAgcmV0dXJuICdtaXNzaW9uLnN2Zyc7XG5cbiAgICAgIGNhc2UgJ21pc3Npb25kZXNjcmlwdGlvbnMnOlxuICAgICAgY2FzZSAnbWlzc2lvbmRlc2NyaXB0aW9uJzpcbiAgICAgIGNhc2UgJ2NhbXBhaWduJzpcbiAgICAgICAgcmV0dXJuICdjYW1wYWlnbi5zdmcnO1xuXG4gICAgICBjYXNlICdwaG90b3MnOlxuICAgICAgY2FzZSAncGhvdG8nOlxuICAgICAgICByZXR1cm4gJ3Bob3RvLnN2Zyc7XG5cbiAgICAgIGNhc2UgJ2ZlZWRzJzpcbiAgICAgIGNhc2UgJ2ZlZWQnOlxuICAgICAgICByZXR1cm4gJ2ZlZWQuc3ZnJztcblxuICAgICAgY2FzZSAnZmlsZXMnOlxuICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgIHJldHVybiAnZmlsZS5zdmcnO1xuXG4gICAgICBjYXNlICdsb2NhdGlvbnMnOlxuICAgICAgY2FzZSAnbG9jYXRpb24nOlxuICAgICAgICByZXR1cm4gJ2xvY2F0aW9uLnN2Zyc7XG5cbiAgICAgIGNhc2UgJ25vdGVzJzpcbiAgICAgIGNhc2UgJ25vdGUnOlxuICAgICAgICByZXR1cm4gJ25vdGUuc3ZnJztcblxuICAgICAgY2FzZSAndXNlcnMnOlxuICAgICAgY2FzZSAndXNlcic6XG4gICAgICAgIHJldHVybiAndXNlci5zdmcnO1xuICAgIH1cbiAgICByZXR1cm4gJ2VtcHR5LnN2Zyc7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGV4dHJhY3RQaG90byhkYXRhLCBtaXNzaW9uZGF0YSwgZmllbGQsIG5hbWUsIHR5cGU/OiBzdHJpbmcsIGhpZGVVc2VyOiBib29sZWFuID0gZmFsc2UsIG11bHRpSW5kZXg/OiBudW1iZXIpIHtcbiAgICBsZXQgcGhvdG86IGFueSA9IHt9O1xuICAgIGlmIChkYXRhIHx8IChmaWVsZCAmJiBmaWVsZC50eXBlID09PSAnaW1hZ2UnICYmIGZpZWxkLmltYWdlICYmIGZpZWxkLmltYWdlLl9kb3dubG9hZFVSTCkpIHtcbiAgICAgIGlmIChkYXRhICYmIGRhdGEudmFsdWUgJiYgKChkYXRhLnZhbHVlLmluZGV4T2YgJiYgZGF0YS52YWx1ZS5pbmRleE9mKCdodHRwJykgPT09IDApIHx8IGlzSW1hZ2VGaWxlKGRhdGEudmFsdWUpKSAmJiAoIXR5cGUgfHwgIWRhdGEuZmllbGRUeXBlIHx8IGRhdGEuZmllbGRUeXBlID09PSB0eXBlKSkge1xuICAgICAgICBwaG90byA9IHtcbiAgICAgICAgICB2YWx1ZTogZGF0YS52YWx1ZSxcbiAgICAgICAgICBjb21tZW50czogZGF0YS5jb21tZW50cyxcbiAgICAgICAgICB0YWdzOiBkYXRhLnRhZ3MsXG4gICAgICAgICAgZmxhZ2dlZDogZGF0YS5mbGFnZ2VkLFxuICAgICAgICAgIGVkaXQ6IGRhdGEuZWRpdCxcbiAgICAgICAgICBzdGl0Y2g6IGRhdGEuc3RpdGNoLFxuICAgICAgICAgIGVkaXRCeTogZGF0YS5lZGl0QnksXG4gICAgICAgICAgZWRpdFdpZHRoOiBkYXRhLmVkaXRXaWR0aCxcbiAgICAgICAgICBlZGl0SGVpZ2h0OiBkYXRhLmVkaXRIZWlnaHQsXG4gICAgICAgICAgdGV4dHM6IGRhdGEudGV4dHMsXG4gICAgICAgICAgc3ZnRGF0YTogZGF0YS5zdmdEYXRhXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgKChkYXRhLmluZGV4T2YgJiYgZGF0YS5pbmRleE9mKCdodHRwJykgPT09IDApIHx8IGlzSW1hZ2VGaWxlKGRhdGEpKSkge1xuICAgICAgICBpZiAodHlwZSAmJiB0eXBlID09PSBGb3JtRmllbGRUeXBlLm11bHRpcGhvdG9zKSB7XG4gICAgICAgICAgbGV0IGZpZWxkRGF0YSA9IGdldChtaXNzaW9uZGF0YSwgZmllbGQubmFtZSB8fCBuYW1lKTtcbiAgICAgICAgICBsZXQgZXh0cmFEYXRhID0gZmllbGREYXRhICYmICg8YW55PmZpZWxkRGF0YSkuZXh0cmFEYXRhID8gKDxhbnk+ZmllbGREYXRhKS5leHRyYURhdGEgOiB7fTtcbiAgICAgICAgICBwaG90byA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBkYXRhLFxuICAgICAgICAgICAgdGFnczogZXh0cmFEYXRhW211bHRpSW5kZXhdID8gZXh0cmFEYXRhW211bHRpSW5kZXhdLnRhZ3MgOiBudWxsLFxuICAgICAgICAgICAgZmxhZ2dlZDogZXh0cmFEYXRhW211bHRpSW5kZXhdID8gZXh0cmFEYXRhW211bHRpSW5kZXhdLmZsYWdnZWQgOiBudWxsLFxuICAgICAgICAgICAgZWRpdDogZXh0cmFEYXRhW211bHRpSW5kZXhdID8gZXh0cmFEYXRhW211bHRpSW5kZXhdLmVkaXQgOiBudWxsLFxuICAgICAgICAgICAgc3RpdGNoOiBleHRyYURhdGFbbXVsdGlJbmRleF0gPyBleHRyYURhdGFbbXVsdGlJbmRleF0uc3RpdGNoIDogbnVsbCxcbiAgICAgICAgICAgIGVkaXRCeTogZXh0cmFEYXRhW211bHRpSW5kZXhdID8gZXh0cmFEYXRhW211bHRpSW5kZXhdLmVkaXRCeSA6IG51bGwsXG4gICAgICAgICAgICBlZGl0V2lkdGg6IGV4dHJhRGF0YVttdWx0aUluZGV4XSA/IGV4dHJhRGF0YVttdWx0aUluZGV4XS5lZGl0V2lkdGggOiBudWxsLFxuICAgICAgICAgICAgZWRpdEhlaWdodDogZXh0cmFEYXRhW211bHRpSW5kZXhdID8gZXh0cmFEYXRhW211bHRpSW5kZXhdLmVkaXRIZWlnaHQgOiBudWxsLFxuICAgICAgICAgICAgdGV4dHM6IGV4dHJhRGF0YVttdWx0aUluZGV4XSA/IGV4dHJhRGF0YVttdWx0aUluZGV4XS50ZXh0cyA6IFtdLFxuICAgICAgICAgICAgc3ZnRGF0YTogZXh0cmFEYXRhW211bHRpSW5kZXhdID8gZXh0cmFEYXRhW211bHRpSW5kZXhdLnN2Z0RhdGEgOiBudWxsLFxuICAgICAgICAgICAgaXNNdWx0aTogdHJ1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGhvdG8gPSB7IHZhbHVlOiBkYXRhIH07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZmllbGQgJiYgZmllbGQudHlwZSA9PT0gJ2ltYWdlJyAmJiBmaWVsZC5pbWFnZSAmJiBmaWVsZC5pbWFnZS5fZG93bmxvYWRVUkwpIHtcbiAgICAgICAgcGhvdG8gPSB7XG4gICAgICAgICAgbmFtZTogZmllbGQubmFtZSB8fCBuYW1lLFxuICAgICAgICAgIHRpdGxlOiBmaWVsZC50aXRsZSxcbiAgICAgICAgICB2YWx1ZTogZmllbGQuaW1hZ2UuX2Rvd25sb2FkVVJMLFxuICAgICAgICAgIGlzSW1hZ2U6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmICghaXNFbXB0eShwaG90bykpIHtcbiAgICAgICAgaWYgKCFmaWVsZCB8fCBmaWVsZC50eXBlICE9PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgYXNzaWduKHBob3RvLCB7XG4gICAgICAgICAgICB0aXRsZTogZmllbGQudGl0bGUsXG4gICAgICAgICAgICBuYW1lOiBmaWVsZC5uYW1lIHx8IG5hbWUsXG4gICAgICAgICAgICBtdWx0aUluZGV4OiBtdWx0aUluZGV4LFxuICAgICAgICAgICAgX2lkOiBtaXNzaW9uZGF0YS5faWQgKyAnIF8nICsgKGZpZWxkLm5hbWUgfHwgbmFtZSksXG4gICAgICAgICAgICBtaXNzaW9uZGVzY3JpcHRpb25SZWY6IG1pc3Npb25kYXRhLm1pc3Npb25kZXNjcmlwdGlvblJlZixcbiAgICAgICAgICAgIG1pc3Npb25kZXNjcmlwdGlvbjogbWlzc2lvbmRhdGEubWlzc2lvbmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgbWlzc2lvbmRhdGE6IG1pc3Npb25kYXRhLFxuICAgICAgICAgICAgbWlzc2lvbmRhdGFSZWY6IG1pc3Npb25kYXRhLl9pZCxcbiAgICAgICAgICAgIG1pc3Npb246IG1pc3Npb25kYXRhLm1pc3Npb24sXG4gICAgICAgICAgICBtaXNzaW9uUmVmOiBtaXNzaW9uZGF0YS5taXNzaW9uUmVmLFxuICAgICAgICAgICAgdXNlclJlZjogbWlzc2lvbmRhdGEudXNlclJlZixcbiAgICAgICAgICAgIHVzZXJEaXNwbGF5bmFtZTogaGlkZVVzZXIgPyAnJyA6IG1pc3Npb25kYXRhLnVzZXJEaXNwbGF5bmFtZSxcbiAgICAgICAgICAgIGFkZHJlc3M6IG1pc3Npb25kYXRhLmFkZHJlc3MsXG4gICAgICAgICAgICBsb2NhdGlvbjogbWlzc2lvbmRhdGEubG9jYXRpb24sXG4gICAgICAgICAgICB2YWxpZGF0ZWQ6IG1pc3Npb25kYXRhLnZhbGlkYXRlZCxcbiAgICAgICAgICAgIF9hY2w6IG1pc3Npb25kYXRhLl9hY2xcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWVsZC5pc0ltYWdlUmVjb2duaXRpb24gJiYgcGhvdG8uc3RpdGNoKSB7XG4gICAgICAgICAgcGhvdG8udmFsdWUgPSBwaG90by5zdGl0Y2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBob3RvO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qXG4gICAgICAgUmV0dXJuIHRoZSB0cmFuc2Zvcm0gdG8gZXh0cmFjdCB0aGUgZmllbGRzIGZyb20gYSBtaXNzaW9uIGRlc2NyaXB0aW9uXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEZpZWxkVHJhbnNmb3JtKHR5cGVzOiBBcnJheTxzdHJpbmc+ID0gW10pIHtcbiAgICBmdW5jdGlvbiBnZXRGaWVsZFRyYW5zZm9ybUludGVybmFsKHJlczogUmVzcG9uc2VPYmplY3QpIHtcbiAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5mb3JFYWNoKSB7XG4gICAgICAgIGxldCBmaWVsZHMgPSBbXTtcbiAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgobWlzc2lvbmRlc2NyaXB0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgbWlzc2lvbkZpZWxkcyA9IE1vZGVscy5nZXRGaWVsZHMobWlzc2lvbmRlc2NyaXB0aW9uLCB0eXBlcyk7XG4gICAgICAgICAgbWlzc2lvbkZpZWxkcyA9IG1pc3Npb25GaWVsZHMubWFwKChmaWVsZDogSUZvcm1GaWVsZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFzc2lnbihmaWVsZCwge1xuICAgICAgICAgICAgICBfaWQ6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgICAgIG5hbWU6IGZpZWxkLm5hbWUgKyAnLnZhbHVlJyxcbiAgICAgICAgICAgICAgb3BlcmF0b3JzOiBNb2RlbHMuZ2V0RmllbGRPcGVyYXRvcihmaWVsZCksXG4gICAgICAgICAgICAgIHNsaWRlVGl0bGU6IG1pc3Npb25kZXNjcmlwdGlvbi50aXRsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZmllbGRzID0gZmllbGRzLmNvbmNhdChtaXNzaW9uRmllbGRzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcy5kYXRhID0gZmllbGRzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0RmllbGRUcmFuc2Zvcm1JbnRlcm5hbDtcbiAgfVxuXG4gIC8qXG4gICAgICAgIFJldHVybiB0aGUgbGlzdCBvZiBzbGlkZSBpdGVtcyBmaWVsZHMgZnJvbSBhIG1pc3Npb24gZGVzY3JpcHRpb24gKG1vYmlsZSB0eXBlKVxuICAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RmllbGRzKG1pc3Npb25kZXNjcmlwdGlvbjogYW55LCB0eXBlczogQXJyYXk8c3RyaW5nPiA9IFtdLCBleGNsdWRlZFR5cGVzOiBBcnJheTxzdHJpbmc+ID0gW10pIHtcbiAgICByZXR1cm4gTW9kZWxzLmdldEZpZWxkc0Zyb21TbGlkZXMobWlzc2lvbmRlc2NyaXB0aW9uLnNsaWRlcywgdHlwZXMsIGV4Y2x1ZGVkVHlwZXMpO1xuICB9XG5cbiAgLypcbiAgICAgICAgUmV0dXJuIHRoZSBsaXN0IG9mIHNsaWRlIGl0ZW1zIGZpZWxkcyBmcm9tIGFuIGFycmF5IG9mIHNsaWRlcyAobW9iaWxlIHR5cGUpXG4gICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRGaWVsZHNGcm9tU2xpZGVzKHNsaWRlczogQXJyYXk8YW55PiwgdHlwZXM6IEFycmF5PHN0cmluZz4gPSBbXSwgZXhjbHVkZWRUeXBlczogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgbGV0IGZpZWxkczogQXJyYXk8SUZvcm1GaWVsZD4gPSBbXTtcbiAgICBpZiAoc2xpZGVzKSB7XG4gICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChzbGlkZS5pdGVtcykge1xuICAgICAgICAgIHNsaWRlLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLnNsaWRlVGl0bGUgPSBzbGlkZS50aXRsZTtcbiAgICAgICAgICAgIGlmICghdHlwZXMgfHwgdHlwZXMubGVuZ3RoID09PSAwIHx8IHR5cGVzLmluZGV4T2YoaXRlbS50eXBlKSA+PSAwKSB7XG4gICAgICAgICAgICAgIGlmICghZXhjbHVkZWRUeXBlcyB8fCBleGNsdWRlZFR5cGVzLmxlbmd0aCA9PT0gMCB8fCBleGNsdWRlZFR5cGVzLmluZGV4T2YoaXRlbS50eXBlKSA8IDApIHtcbiAgICAgICAgICAgICAgICBpdGVtLnNsaWRlSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICBmaWVsZHMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkcztcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGV4cG9ydEZpbHRlckZpZWxkKGY6IEZpbHRlckZpZWxkKSB7XG4gICAgbGV0IGZpbHRlciA9IHt9O1xuICAgIGlmIChpc0FycmF5KGYudmFsdWUpICYmIGYudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmlsdGVyO1xuICAgIH1cblxuICAgIGlmIChmLmhhbmRsZVVuZGVmaW5lZCAmJiBpc1ByZXNlbnQoZi52YWx1ZSkgJiYgaXNBcnJheShmLnZhbHVlKSkge1xuICAgICAgaWYgKGYudmFsdWUuaW5kZXhPZih1bmRlZmluZWQpIDwgMCAmJiBmLnZhbHVlLmluZGV4T2YoJ3VuZGVmaW5lZCcpIDwgMCkge1xuICAgICAgICBmaWx0ZXJbZi5maWVsZF0gPSB7fTtcbiAgICAgICAgZmlsdGVyW2YuZmllbGRdW2Yub3BlcmF0b3IuX2lkXSA9IGYudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZGVmID0gZmlsdGVyO1xuICAgICAgICBkZWZbZi5maWVsZF0gPSB7fTtcbiAgICAgICAgZGVmW2YuZmllbGRdW2Yub3BlcmF0b3IuX2lkXSA9IG1hcChmLnZhbHVlLCB2ID0+IHtcbiAgICAgICAgICByZXR1cm4gdiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHY7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmaWx0ZXJbZi5maWVsZF0gPSB7fTtcbiAgICAgIGlmIChmLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuYWRkcmVzcyAmJiBmLnZhbHVlICYmIChpc0FycmF5KGYudmFsdWUpIHx8IGlzQXJyYXkoZi52YWx1ZS5fZ2VvbG9jKSkpIHtcbiAgICAgICAgZmlsdGVyW2YuZmllbGRdID0ge1xuICAgICAgICAgIG5lYXJTcGhlcmU6IHtcbiAgICAgICAgICAgICRnZW9tZXRyeToge1xuICAgICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgICAgICBjb29yZGluYXRlczogZi52YWx1ZSAmJiBmLnZhbHVlLl9nZW9sb2MgPyBmLnZhbHVlLl9nZW9sb2MgOiBmLnZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJG1heERpc3RhbmNlOiBmLnJhZGl1cyAqIDEwMDAgfHwgNDAwMDBcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGYub3BlcmF0b3IuX2lkID09PSAnbmVhclNwaGVyZScgJiYgZi52YWx1ZSAmJiAoaXNBcnJheShmLnZhbHVlKSB8fCBpc0FycmF5KGYudmFsdWUuX2dlb2xvYykpKSB7XG4gICAgICAgIGZpbHRlcltmLmZpZWxkXSA9IHtcbiAgICAgICAgICBuZWFyU3BoZXJlOiB7XG4gICAgICAgICAgICAkZ2VvbWV0cnk6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGYudmFsdWUgJiYgZi52YWx1ZS5fZ2VvbG9jID8gZi52YWx1ZS5fZ2VvbG9jIDogZi52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRtYXhEaXN0YW5jZTogZi5tYXggfHwgNDAwMDBcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGYudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5kYXRlICYmIGYub3BlcmF0b3IuX2lkID09PSAnZXEnKSB7XG4gICAgICAgIGZpbHRlcltmLmZpZWxkXVsnYmV0d2VlbiddID0gW2YudmFsdWUsIGRhdGVGb3JtYXQoZGF0ZUFkZChmLnZhbHVlLCAnZGF5cycsIDEpLCAnWVlZWS1NTS1kZCcpXTtcbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGYudmFsdWUpKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGlzQXJyYXkoZi52YWx1ZSkgJiYgaXNPYmplY3QoZi52YWx1ZVswXSkgPyBtYXAoZi52YWx1ZSwgJ19pZCcpIDogaXNBcnJheShmLnZhbHVlKSA/IGYudmFsdWUgOiBpc09iamVjdChmLnZhbHVlKSA/IGYudmFsdWUuX2lkIDogZi52YWx1ZTtcbiAgICAgICAgaWYgKGYub3BlcmF0b3IgJiYgZi5vcGVyYXRvci5faWQgPT09ICdlcScpIHtcbiAgICAgICAgICBmaWx0ZXJbZi5maWVsZF0gPSB2YWx1ZTtcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKGYub3BlcmF0b3IgJiYgZi5vcGVyYXRvci5faWQgPT09ICdiZXR3ZWVuJyAmJiBpc0FycmF5KGYudmFsdWUpICYmIGYudmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgICAgIC8vICAgICBmaWx0ZXJbZi5maWVsZF0gPSB7ICdndGUnOiBmLnZhbHVlWzBdLCAnbHQnOiBmLnZhbHVlWzFdIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsdGVyW2YuZmllbGRdW2Yub3BlcmF0b3IuX2lkXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZi5vcGVyYXRvciAmJiAoZi5vcGVyYXRvci5faWQgPT09ICdsaWtlJyB8fCBmLm9wZXJhdG9yLl9pZCA9PT0gJ25saWtlJykpIHtcbiAgICAgICAgZmlsdGVyW2YuZmllbGRdLm9wdGlvbnMgPSAnaSc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXI7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjcmVhdGVPckdldE1vZGVsKGNsYXNzTmFtZTogc3RyaW5nLCBvdmVycmlkZT86IGJvb2xlYW4pOiBJTW9kZWwge1xuICAgIE1vZGVscy5fbW9kZWxzID0gTW9kZWxzLl9tb2RlbHMgfHwgbmV3IE1hcDxzdHJpbmcsIElNb2RlbD4oKTtcbiAgICBpZiAoTW9kZWxzLl9tb2RlbHMuaGFzKGNsYXNzTmFtZSkgJiYgb3ZlcnJpZGUgIT09IHRydWUpIHtcbiAgICAgIHJldHVybiBNb2RlbHMuX21vZGVscy5nZXQoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG1vZGVsID0gbmV3IElNb2RlbChjbGFzc05hbWUpO1xuICAgICAgTW9kZWxzLl9tb2RlbHMuc2V0KGNsYXNzTmFtZSwgbW9kZWwpO1xuICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHVwZGF0ZU1vZGVsKGNsYXNzTmFtZTogc3RyaW5nLCBtb2RlbDogSU1vZGVsKSB7XG4gICAgbGV0IGZvcm1GaWVsZHMgPSBtb2RlbC5mb3JtRmllbGRzIHx8IFtdO1xuICAgIGlmIChmb3JtRmllbGRzLmZpbmRJbmRleChmID0+IGYubmFtZSA9PT0gJ190ZW5hbnQnKSA8IDAgJiYgbW9kZWwuY29sbGVjdGlvbk5hbWUgJiYgbW9kZWwuY29sbGVjdGlvbk5hbWUgIT09ICd0ZW5hbnRzJykge1xuICAgICAgZm9ybUZpZWxkcy5wdXNoKHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG5hbWU6ICdfdGVuYW50JyxcbiAgICAgICAgdGl0bGU6ICdURU5BTlQnLFxuICAgICAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgY29uZGl0aW9uOiBbUk9MRVNfQ09ORElUSU9OUy5pc0FkbWluXSxcbiAgICAgICAgY29sbGVjdGlvbk5hbWU6ICd0ZW5hbnRzJyxcbiAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9LFxuICAgICAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICBtb2RlbC5mb3JtRmllbGRzID0gZm9ybUZpZWxkcztcbiAgICBNb2RlbHMuX21vZGVscy5zZXQoY2xhc3NOYW1lLCBtb2RlbCk7XG4gIH1cbn1cbiJdfQ==