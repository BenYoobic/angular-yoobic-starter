/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var Models = /** @class */ (function () {
    function Models() {
    }
    /**
     * @param {?} className
     * @param {?} fieldName
     * @return {?}
     */
    Models.addSearchableField = /**
     * @param {?} className
     * @param {?} fieldName
     * @return {?}
     */
    function (className, fieldName) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        model.searchableFields.push(fieldName);
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @param {?} fieldName
     * @param {?} order
     * @return {?}
     */
    Models.addMappingField = /**
     * @param {?} className
     * @param {?} fieldName
     * @param {?} order
     * @return {?}
     */
    function (className, fieldName, order) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        model.mappingFields.set(order, fieldName);
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @param {?} entityListItemProperty
     * @param {?} appearance
     * @return {?}
     */
    Models.addAppearance = /**
     * @param {?} className
     * @param {?} entityListItemProperty
     * @param {?} appearance
     * @return {?}
     */
    function (className, entityListItemProperty, appearance) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        model.appearance.set(entityListItemProperty, appearance);
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @param {?} field
     * @return {?}
     */
    Models.addFormField = /**
     * @param {?} className
     * @param {?} field
     * @return {?}
     */
    function (className, field) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        /** @type {?} */
        var formFields = model.formFields;
        formFields = formFields.filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name !== field.name; }));
        formFields.push(field);
        model.formFields = formFields;
        this.updateModel(className, model);
    };
    /**
     * @param {?} className
     * @param {?} baseClassName
     * @param {?} target
     * @return {?}
     */
    Models.addBaseModel = /**
     * @param {?} className
     * @param {?} baseClassName
     * @param {?} target
     * @return {?}
     */
    function (className, baseClassName, target) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
        /** @type {?} */
        var base = this.createOrGetModel(baseClassName);
        /** @type {?} */
        var formFields = model.formFields || [];
        /** @type {?} */
        var baseFields = [];
        if (base.formFields) {
            base.formFields.map((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                if (formFields.findIndex((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.name === field.name; })) < 0) {
                    baseFields.push(cloneDeep(field));
                }
            }));
        }
        model.formFields = compact(union(baseFields, formFields));
        model.searchableFields = uniq(union(cloneDeep(base.searchableFields), model.searchableFields));
        model.type = target;
        this.updateModel(className, model);
    };
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
    Models.setCollectionName = /**
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
    function (className, collectionName, fields, include, searchSubquery, feathersService, target, isCustom, detailComponent, icon) {
        /** @type {?} */
        var model = this.createOrGetModel(className);
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
    };
    /**
     * @param {?} className
     * @return {?}
     */
    Models.clearCollectionName = /**
     * @param {?} className
     * @return {?}
     */
    function (className) {
        Models._models.delete(className);
    };
    /**
     * @param {?} className
     * @return {?}
     */
    Models.getModel = /**
     * @param {?} className
     * @return {?}
     */
    function (className) {
        /** @type {?} */
        var retVal;
        if (isString(className) === true) {
            retVal = this.createOrGetModel((/** @type {?} */ (className)));
        }
        else {
            Models._models.forEach((/**
             * @param {?} m
             * @return {?}
             */
            function (m) {
                if (m.type && m.type === className) {
                    retVal = m;
                }
            }));
        }
        return retVal;
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Models.getModelByCollectionName = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
        /** @type {?} */
        var model;
        Models._models.forEach((/**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            if (m.collectionName === collectionName) {
                model = m;
            }
        }));
        if (!model && collectionName && collectionName.endsWith('_store')) {
            /** @type {?} */
            var name_1 = collectionName.replace('_store', '');
            if (name_1 === 'missiondescription') {
                name_1 += 's';
            }
            return Models.getModelByCollectionName(name_1);
        }
        return model;
    };
    /**
     * @param {?} collectionName
     * @param {?=} advancedFiltersFields
     * @param {?=} campaignFields
     * @param {?=} isAdmin
     * @return {?}
     */
    Models.getFilterableFields = /**
     * @param {?} collectionName
     * @param {?=} advancedFiltersFields
     * @param {?=} campaignFields
     * @param {?=} isAdmin
     * @return {?}
     */
    function (collectionName, advancedFiltersFields, campaignFields, isAdmin) {
        if (isAdmin === void 0) { isAdmin = false; }
        /** @type {?} */
        var fields = [];
        /** @type {?} */
        var model = Models.getModelByCollectionName(collectionName);
        if (model && model.formFields) {
            fields = cloneDeep(model.formFields);
        }
        if (model && model.isCustom && fields) {
            fields.forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
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
            function (af) {
                /** @type {?} */
                var index = findIndex(fields, (/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.name === af.name; }));
                if (index < 0) {
                    fields.push(af);
                }
                else {
                    fields[index] = tslib_1.__assign({}, fields[index], af);
                }
            }));
        }
        if (campaignFields) {
            campaignFields = cloneDeep(campaignFields);
            campaignFields.forEach((/**
             * @param {?} c
             * @return {?}
             */
            function (c) {
                c.name += '.value';
                c.filterable = true;
                //c.sortable = true;
            }));
            fields = fields.concat(campaignFields);
        }
        /** @type {?} */
        var tenantIndex = findIndex(fields, (/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name === '_tenant'; }));
        if (tenantIndex >= 0 && !isAdmin) {
            fields[tenantIndex].filterable = false;
        }
        /** @type {?} */
        var finalFields = [];
        fields.forEach((/**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            finalFields.push(f);
            if (f.collectionName && f.collectionName !== collectionName && f.filterable === true && f.showSubQueryFilters === true) {
                Models.getModelByCollectionName(f.collectionName).formFields.forEach((/**
                 * @param {?} subfield
                 * @return {?}
                 */
                function (subfield) {
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
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.getFieldName = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var fieldName = field.name + (field.columnDefinition && field.columnDefinition.name ? '.' + field.columnDefinition.name : '');
        if (field.columnDefinition && field.columnDefinition.forceName) {
            fieldName = field.columnDefinition.name;
        }
        return fieldName;
    };
    /**
     * @param {?} field
     * @param {?} translate
     * @return {?}
     */
    Models.getFieldTitle = /**
     * @param {?} field
     * @param {?} translate
     * @return {?}
     */
    function (field, translate) {
        /** @type {?} */
        var fieldTitle = field.title || field.name;
        fieldTitle = translate.polyglot(fieldTitle);
        return fieldTitle;
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isBooleanField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isBooleanField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isNumberField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isNumberField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isPhotoField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isPhotoField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isMultiPhotosField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isMultiPhotosField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isPhotoOrMultiPhotosField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isPhotoOrMultiPhotosField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isVideoField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isVideoField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isDateTimeField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isDateTimeField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isIntervalField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isIntervalField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isChartableAutoFieldNoPhoto = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return Models.isChartableAutoField(field, false);
    };
    /**
     * @param {?} field
     * @param {?=} includePhoto
     * @return {?}
     */
    Models.isChartableAutoField = /**
     * @param {?} field
     * @param {?=} includePhoto
     * @return {?}
     */
    function (field, includePhoto) {
        if (includePhoto === void 0) { includePhoto = true; }
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
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isMultipleField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isMultipleField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.isColoredField = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        return isColoredField(field);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    Models.getFieldOperator = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
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
    };
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
    Models.getMobileFieldIcon = 
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
    function (type) {
        /** @type {?} */
        var fields = [].concat(MOBILE_FORM_FIELDS_ALL).filter((/**
         * @param {?} field
         * @return {?}
         */
        function (field) { return field.type === type; }));
        if (fields && fields.length > 0) {
            return fields[0].icon;
        }
        return '';
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} excludedFields
     * @return {?}
     */
    Models.exportWhere = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} excludedFields
     * @return {?}
     */
    function (collectionName, filters, excludedFields) {
        if (excludedFields === void 0) { excludedFields = []; }
        /** @type {?} */
        var retVal = filters.map((/**
         * @param {?} fs
         * @return {?}
         */
        function (fs) {
            /** @type {?} */
            var simplifiedFilters = [];
            fs.forEach((/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
                if ((!f.subQuery || f.collectionName === collectionName) && (!excludedFields || excludedFields.indexOf(f.field) < 0)) {
                    //&& !f.isFieldSelector
                    /** @type {?} */
                    var filter = Models.exportFilterField(f);
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
    };
    /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    Models.exportSubQuery = /**
     * @param {?} collectionName
     * @param {?=} filters
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    function (collectionName, filters, isAggregationQuery) {
        var _this = this;
        /** @type {?} */
        var retVal = [];
        if (filters && isArray(filters) && ((/** @type {?} */ (filters))).length > 0) {
            ((/** @type {?} */ (filters))).forEach((/**
             * @param {?} fs
             * @return {?}
             */
            function (fs) {
                fs.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) {
                    if (f.subQuery && f.collectionName !== collectionName) {
                        retVal.push({
                            collectionName: _this.fixCollectionName(f.collectionName, isAggregationQuery),
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
    };
    /**
     * @param {?} collectionName
     * @param {?} search
     * @return {?}
     */
    Models.exportSearch = /**
     * @param {?} collectionName
     * @param {?} search
     * @return {?}
     */
    function (collectionName, search) {
        if (search && search.match && search.match(/^[0-9a-fA-F]{24}$/)) {
            return { _id: search };
        }
        else {
            /** @type {?} */
            var retVal = Models.getModelByCollectionName(collectionName).searchableFields.map((/**
             * @param {?} field
             * @return {?}
             */
            function (field) {
                /** @type {?} */
                var filter = {};
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
    };
    /**
     * @param {?} collectionName
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    Models.fixCollectionName = /**
     * @param {?} collectionName
     * @param {?=} isAggregationQuery
     * @return {?}
     */
    function (collectionName, isAggregationQuery) {
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
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Models.getPublicCollectionName = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
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
    };
    /**
     * @param {?} params
     * @return {?}
     */
    Models.getPhotoFromParams = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (params && params.node && params.node.data) {
            /** @type {?} */
            var row = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            /** @type {?} */
            var f = params.colDef.field.replace('.value', '');
            /** @type {?} */
            var photo = Models.extractPhoto(row[f], row, {}, f);
            return photo;
        }
        return null;
    };
    // get photos for multiphoto component
    // get photos for multiphoto component
    /**
     * @param {?} params
     * @return {?}
     */
    Models.getPhotosFromParams = 
    // get photos for multiphoto component
    /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (params && params.node && params.node.data) {
            /** @type {?} */
            var row_1 = params.node.data.toJS ? params.node.data.toJS() : params.node.data;
            /** @type {?} */
            var f_1 = params.colDef.field.replace('.value', '');
            // field name
            /** @type {?} */
            var photos_1 = [];
            if (row_1 && f_1 && row_1[f_1] && row_1[f_1].value && isArray(row_1[f_1].value)) {
                row_1[f_1].value.forEach((/**
                 * @param {?} v
                 * @param {?} multiIndex
                 * @return {?}
                 */
                function (v, multiIndex) {
                    photos_1.push(Models.extractPhoto(v, row_1, {}, f_1, FormFieldType.multiphotos, null, multiIndex));
                }));
            }
            return photos_1;
        }
        return null;
    };
    /**
     * @param {?} collectionName
     * @return {?}
     */
    Models.getEmptyUrl = /**
     * @param {?} collectionName
     * @return {?}
     */
    function (collectionName) {
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
    };
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
    Models.extractPhoto = /**
     * @param {?} data
     * @param {?} missiondata
     * @param {?} field
     * @param {?} name
     * @param {?=} type
     * @param {?=} hideUser
     * @param {?=} multiIndex
     * @return {?}
     */
    function (data, missiondata, field, name, type, hideUser, multiIndex) {
        if (hideUser === void 0) { hideUser = false; }
        /** @type {?} */
        var photo = {};
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
                    var fieldData = get(missiondata, field.name || name);
                    /** @type {?} */
                    var extraData = fieldData && ((/** @type {?} */ (fieldData))).extraData ? ((/** @type {?} */ (fieldData))).extraData : {};
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
    };
    /*
         Return the transform to extract the fields from a mission description
     */
    /*
           Return the transform to extract the fields from a mission description
       */
    /**
     * @param {?=} types
     * @return {?}
     */
    Models.getFieldTransform = /*
           Return the transform to extract the fields from a mission description
       */
    /**
     * @param {?=} types
     * @return {?}
     */
    function (types) {
        if (types === void 0) { types = []; }
        /**
         * @param {?} res
         * @return {?}
         */
        function getFieldTransformInternal(res) {
            if (res.data && res.data.forEach) {
                /** @type {?} */
                var fields_1 = [];
                res.data.forEach((/**
                 * @param {?} missiondescription
                 * @return {?}
                 */
                function (missiondescription) {
                    /** @type {?} */
                    var missionFields = Models.getFields(missiondescription, types);
                    missionFields = missionFields.map((/**
                     * @param {?} field
                     * @return {?}
                     */
                    function (field) {
                        return assign(field, {
                            _id: field.name,
                            name: field.name + '.value',
                            operators: Models.getFieldOperator(field),
                            slideTitle: missiondescription.title
                        });
                    }));
                    fields_1 = fields_1.concat(missionFields);
                }));
                res.data = fields_1;
            }
            return res;
        }
        return getFieldTransformInternal;
    };
    /*
          Return the list of slide items fields from a mission description (mobile type)
      */
    /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    Models.getFields = /*
            Return the list of slide items fields from a mission description (mobile type)
        */
    /**
     * @param {?} missiondescription
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    function (missiondescription, types, excludedTypes) {
        if (types === void 0) { types = []; }
        if (excludedTypes === void 0) { excludedTypes = []; }
        return Models.getFieldsFromSlides(missiondescription.slides, types, excludedTypes);
    };
    /*
          Return the list of slide items fields from an array of slides (mobile type)
      */
    /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    Models.getFieldsFromSlides = /*
            Return the list of slide items fields from an array of slides (mobile type)
        */
    /**
     * @param {?} slides
     * @param {?=} types
     * @param {?=} excludedTypes
     * @return {?}
     */
    function (slides, types, excludedTypes) {
        if (types === void 0) { types = []; }
        if (excludedTypes === void 0) { excludedTypes = []; }
        /** @type {?} */
        var fields = [];
        if (slides) {
            slides.forEach((/**
             * @param {?} slide
             * @param {?} index
             * @return {?}
             */
            function (slide, index) {
                if (slide.items) {
                    slide.items.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) {
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
    };
    /**
     * @private
     * @param {?} f
     * @return {?}
     */
    Models.exportFilterField = /**
     * @private
     * @param {?} f
     * @return {?}
     */
    function (f) {
        /** @type {?} */
        var filter = {};
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
                var def = filter;
                def[f.field] = {};
                def[f.field][f.operator._id] = map(f.value, (/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
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
                var value = isArray(f.value) && isObject(f.value[0]) ? map(f.value, '_id') : isArray(f.value) ? f.value : isObject(f.value) ? f.value._id : f.value;
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
    };
    /**
     * @private
     * @param {?} className
     * @param {?=} override
     * @return {?}
     */
    Models.createOrGetModel = /**
     * @private
     * @param {?} className
     * @param {?=} override
     * @return {?}
     */
    function (className, override) {
        Models._models = Models._models || new Map();
        if (Models._models.has(className) && override !== true) {
            return Models._models.get(className);
        }
        else {
            /** @type {?} */
            var model = new IModel(className);
            Models._models.set(className, model);
            return model;
        }
    };
    /**
     * @private
     * @param {?} className
     * @param {?} model
     * @return {?}
     */
    Models.updateModel = /**
     * @private
     * @param {?} className
     * @param {?} model
     * @return {?}
     */
    function (className, model) {
        /** @type {?} */
        var formFields = model.formFields || [];
        if (formFields.findIndex((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return f.name === '_tenant'; })) < 0 && model.collectionName && model.collectionName !== 'tenants') {
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
    };
    Models._models = new Map();
    Models.decorators = [
        { type: Injectable }
    ];
    return Models;
}());
export { Models };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Models._models;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbW9kZWxzL21vZGVscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQThELHNCQUFzQixFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUseUJBQXlCLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTlWLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUVuRixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7QUFNckk7SUFBQTtJQWlzQkEsQ0FBQzs7Ozs7O0lBN3JCZSx5QkFBa0I7Ozs7O0lBQWhDLFVBQWlDLFNBQWlCLEVBQUUsU0FBaUI7O1lBQy9ELEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7OztJQUVhLHNCQUFl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QUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNyRSxJQUFJLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUMvRCxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNuRSxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNuRSxTQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUN6RSxVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUMzRSxLQUFLLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUMvRCxPQUFPLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNyRSxPQUFPLEVBQUUsSUFBSTtxQkFDZCxDQUFDO2lCQUNIO3FCQUFNO29CQUNMLEtBQUssR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztpQkFDekI7YUFDRjtpQkFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFL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LFNBQWlCLEVBQUUsS0FBYTs7WUFDckQsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRTtRQUN2QyxJQUFJLFVBQVUsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBcEIsQ0FBb0IsRUFBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQ3JILFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO2dCQUNoQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLGNBQWMsRUFBRSxTQUFTO2dCQUN6QixRQUFRLEVBQUUsS0FBSztnQkFDZixnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7Z0JBQ2xDLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQztTQUNKO1FBQ0QsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUE5ckJjLGNBQU8sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQzs7Z0JBRnBELFVBQVU7O0lBaXNCWCxhQUFDO0NBQUEsQUFqc0JELElBaXNCQztTQWhzQlksTUFBTTs7Ozs7O0lBQ2pCLGVBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQcmVzZW50LCBkYXRlRm9ybWF0LCBkYXRlQWRkLCBGaWx0ZXJzLCBGaWx0ZXJGaWVsZCwgRmlsdGVyT3BlcmF0b3IsIFN1YlF1ZXJ5LCBJRm9ybUZpZWxkLCBNT0JJTEVfRk9STV9GSUVMRFNfQUxMLCBGb3JtRmllbGRUeXBlLCBpc0ltYWdlRmlsZSwgaXNOdW1iZXJGaWVsZCwgaXNCb29sZWFuRmllbGQsIGlzUGhvdG9GaWVsZCwgaXNNdWx0aVBob3Rvc0ZpZWxkLCBpc1Bob3RvT3JNdWx0aVBob3Rvc0ZpZWxkLCBpc1ZpZGVvRmllbGQsIGlzRGF0ZVRpbWVGaWVsZCwgaXNJbnRlcnZhbEZpZWxkLCBpc011bHRpcGxlRmllbGQsIGlzQ29sb3JlZEZpZWxkIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IFJlc3BvbnNlT2JqZWN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9yZXNwb25zZS1vYmplY3QvcmVzcG9uc2Utb2JqZWN0LmludGVyZmFjZSc7XG5pbXBvcnQgeyBJTW9kZWwgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL21vZGVsL21vZGVsLmludGVyZmFjZSc7XG5pbXBvcnQgeyBST0xFU19DT05ESVRJT05TIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9jb25kaXRpb24vaWNvbmRpdGlvbi5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBjbG9uZURlZXAsIGNvbXBhY3QsIHVuaXEsIHVuaW9uLCBpc0FycmF5LCBpc09iamVjdCwgaXNTdHJpbmcsIG1hcCwgcHVsbCwgYXNzaWduLCBpc0VtcHR5LCBnZXQsIGZpbmRJbmRleCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbi8qKiBAbmFtZSBNb2RlbHNcbiAqIEBhbmd1bGFyVHlwZSBzZXJ2aWNlXG4gKiBAZGVzY3JpcHRpb24gQSBwb3dlcmZ1bCBzZXJ2aWNlIHdoaWNoIGdldHMgdGhlIG1vZGVsIGZvciBhIGNvbGxlY3Rpb24gb3IgY2xhc3MuIFRoZSBtb2RlbCBjb3VsZCBpbmNsdWRlIGZvcm0gZmllbGRzLCBzZWFyY2hhYmxlIGZpZWxkcyBhbmQgbWFwcGluZyBmaWVsZHMgd2hpY2ggYXJlIHVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBmb3JtcyBvciBmaWx0ZXJzIHJlbGF0ZWQgdG8gdGhlIGNvbGxlY3Rpb24gb3IgY2xhc3MuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2RlbHMge1xuICBwcml2YXRlIHN0YXRpYyBfbW9kZWxzID0gbmV3IE1hcDxzdHJpbmcsIElNb2RlbD4oKTtcblxuICBwdWJsaWMgc3RhdGljIGFkZFNlYXJjaGFibGVGaWVsZChjbGFzc05hbWU6IHN0cmluZywgZmllbGROYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgbW9kZWwgPSB0aGlzLmNyZWF0ZU9yR2V0TW9kZWwoY2xhc3NOYW1lKTtcbiAgICBtb2RlbC5zZWFyY2hhYmxlRmllbGRzLnB1c2goZmllbGROYW1lKTtcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKGNsYXNzTmFtZSwgbW9kZWwpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhZGRNYXBwaW5nRmllbGQoY2xhc3NOYW1lOiBzdHJpbmcsIGZpZWxkTmFtZTogc3RyaW5nLCBvcmRlcjogbnVtYmVyKSB7XG4gICAgbGV0IG1vZGVsID0gdGhpcy5jcmVhdGVPckdldE1vZGVsKGNsYXNzTmFtZSk7XG4gICAgbW9kZWwubWFwcGluZ0ZpZWxkcy5zZXQob3JkZXIsIGZpZWxkTmFtZSk7XG4gICAgdGhpcy51cGRhdGVNb2RlbChjbGFzc05hbWUsIG1vZGVsKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYWRkQXBwZWFyYW5jZShjbGFzc05hbWU6IHN0cmluZywgZW50aXR5TGlzdEl0ZW1Qcm9wZXJ0eTogc3RyaW5nLCBhcHBlYXJhbmNlOiBhbnkpIHtcbiAgICBsZXQgbW9kZWwgPSB0aGlzLmNyZWF0ZU9yR2V0TW9kZWwoY2xhc3NOYW1lKTtcbiAgICBtb2RlbC5hcHBlYXJhbmNlLnNldChlbnRpdHlMaXN0SXRlbVByb3BlcnR5LCBhcHBlYXJhbmNlKTtcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKGNsYXNzTmFtZSwgbW9kZWwpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhZGRGb3JtRmllbGQoY2xhc3NOYW1lOiBzdHJpbmcsIGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgbGV0IG1vZGVsID0gdGhpcy5jcmVhdGVPckdldE1vZGVsKGNsYXNzTmFtZSk7XG4gICAgbGV0IGZvcm1GaWVsZHMgPSBtb2RlbC5mb3JtRmllbGRzO1xuICAgIGZvcm1GaWVsZHMgPSBmb3JtRmllbGRzLmZpbHRlcihmID0+IGYubmFtZSAhPT0gZmllbGQubmFtZSk7XG4gICAgZm9ybUZpZWxkcy5wdXNoKGZpZWxkKTtcbiAgICBtb2RlbC5mb3JtRmllbGRzID0gZm9ybUZpZWxkcztcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKGNsYXNzTmFtZSwgbW9kZWwpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhZGRCYXNlTW9kZWwoY2xhc3NOYW1lOiBzdHJpbmcsIGJhc2VDbGFzc05hbWU6IHN0cmluZywgdGFyZ2V0KSB7XG4gICAgbGV0IG1vZGVsID0gdGhpcy5jcmVhdGVPckdldE1vZGVsKGNsYXNzTmFtZSk7XG4gICAgbGV0IGJhc2UgPSB0aGlzLmNyZWF0ZU9yR2V0TW9kZWwoYmFzZUNsYXNzTmFtZSk7XG4gICAgbGV0IGZvcm1GaWVsZHMgPSBtb2RlbC5mb3JtRmllbGRzIHx8IFtdO1xuXG4gICAgbGV0IGJhc2VGaWVsZHMgPSBbXTtcbiAgICBpZiAoYmFzZS5mb3JtRmllbGRzKSB7XG4gICAgICBiYXNlLmZvcm1GaWVsZHMubWFwKGZpZWxkID0+IHtcbiAgICAgICAgaWYgKGZvcm1GaWVsZHMuZmluZEluZGV4KGYgPT4gZi5uYW1lID09PSBmaWVsZC5uYW1lKSA8IDApIHtcbiAgICAgICAgICBiYXNlRmllbGRzLnB1c2goY2xvbmVEZWVwKGZpZWxkKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vZGVsLmZvcm1GaWVsZHMgPSBjb21wYWN0KHVuaW9uKGJhc2VGaWVsZHMsIGZvcm1GaWVsZHMpKTtcbiAgICBtb2RlbC5zZWFyY2hhYmxlRmllbGRzID0gdW5pcSh1bmlvbihjbG9uZURlZXAoYmFzZS5zZWFyY2hhYmxlRmllbGRzKSwgbW9kZWwuc2VhcmNoYWJsZUZpZWxkcykpO1xuICAgIG1vZGVsLnR5cGUgPSB0YXJnZXQ7XG4gICAgdGhpcy51cGRhdGVNb2RlbChjbGFzc05hbWUsIG1vZGVsKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2V0Q29sbGVjdGlvbk5hbWUoY2xhc3NOYW1lOiBzdHJpbmcsIGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGZpZWxkczogYW55LCBpbmNsdWRlOiBhbnksIHNlYXJjaFN1YnF1ZXJ5OiBhbnksIGZlYXRoZXJzU2VydmljZTogc3RyaW5nLCB0YXJnZXQ6IGFueSwgaXNDdXN0b20/OiBib29sZWFuLCBkZXRhaWxDb21wb25lbnQ/OiBzdHJpbmcsIGljb24/OiBzdHJpbmcpIHtcbiAgICBsZXQgbW9kZWwgPSB0aGlzLmNyZWF0ZU9yR2V0TW9kZWwoY2xhc3NOYW1lKTtcbiAgICBtb2RlbC5jb2xsZWN0aW9uTmFtZSA9IGNvbGxlY3Rpb25OYW1lO1xuICAgIG1vZGVsLmZpZWxkcyA9IGZpZWxkcztcbiAgICBtb2RlbC5pbmNsdWRlID0gaW5jbHVkZTtcbiAgICBtb2RlbC5zZWFyY2hTdWJxdWVyeSA9IHNlYXJjaFN1YnF1ZXJ5O1xuICAgIG1vZGVsLnR5cGUgPSB0YXJnZXQ7XG4gICAgbW9kZWwuZmVhdGhlcnNTZXJ2aWNlID0gZmVhdGhlcnNTZXJ2aWNlO1xuICAgIG1vZGVsLmlzQ3VzdG9tID0gaXNDdXN0b207XG4gICAgbW9kZWwuZGV0YWlsQ29tcG9uZW50ID0gZGV0YWlsQ29tcG9uZW50O1xuICAgIG1vZGVsLmljb24gPSBpY29uO1xuICAgIGlmIChtb2RlbC5jb2xsZWN0aW9uTmFtZSAmJiBtb2RlbC5jb2xsZWN0aW9uTmFtZSAhPT0gJ3RlbmFudHMnKSB7XG4gICAgICBtb2RlbC5pbmNsdWRlID0gbW9kZWwuaW5jbHVkZSB8fCBbXTtcbiAgICAgIGlmIChtb2RlbC5pbmNsdWRlLmluZGV4T2YoJ190ZW5hbnQnKSA8IDApIHtcbiAgICAgICAgbW9kZWwuaW5jbHVkZS5wdXNoKCdfdGVuYW50Jyk7XG4gICAgICB9XG4gICAgICBpZiAobW9kZWwuZmllbGRzICYmIG1vZGVsLmZpZWxkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIG1vZGVsLmZpZWxkcy5wdXNoKCdfdGVuYW50Lm5hbWUnKTtcbiAgICAgICAgbW9kZWwuZmllbGRzLnB1c2goJ190ZW5hbnQudGl0bGUnKTtcbiAgICAgICAgbW9kZWwuZmllbGRzLnB1c2goJ190ZW5hbnQuaWNvbicpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZU1vZGVsKGNsYXNzTmFtZSwgbW9kZWwpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjbGVhckNvbGxlY3Rpb25OYW1lKGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgTW9kZWxzLl9tb2RlbHMuZGVsZXRlKGNsYXNzTmFtZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsKGNsYXNzTmFtZTogc3RyaW5nIHwgVHlwZTxhbnk+KTogSU1vZGVsIHtcbiAgICBsZXQgcmV0VmFsO1xuICAgIGlmIChpc1N0cmluZyhjbGFzc05hbWUpID09PSB0cnVlKSB7XG4gICAgICByZXRWYWwgPSB0aGlzLmNyZWF0ZU9yR2V0TW9kZWwoPHN0cmluZz5jbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBNb2RlbHMuX21vZGVscy5mb3JFYWNoKG0gPT4ge1xuICAgICAgICBpZiAobS50eXBlICYmIG0udHlwZSA9PT0gY2xhc3NOYW1lKSB7XG4gICAgICAgICAgcmV0VmFsID0gbTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXRWYWw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsQnlDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nKTogSU1vZGVsIHtcbiAgICBsZXQgbW9kZWw7XG4gICAgTW9kZWxzLl9tb2RlbHMuZm9yRWFjaChtID0+IHtcbiAgICAgIGlmIChtLmNvbGxlY3Rpb25OYW1lID09PSBjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgICBtb2RlbCA9IG07XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFtb2RlbCAmJiBjb2xsZWN0aW9uTmFtZSAmJiBjb2xsZWN0aW9uTmFtZS5lbmRzV2l0aCgnX3N0b3JlJykpIHtcbiAgICAgIGxldCBuYW1lID0gY29sbGVjdGlvbk5hbWUucmVwbGFjZSgnX3N0b3JlJywgJycpO1xuICAgICAgaWYgKG5hbWUgPT09ICdtaXNzaW9uZGVzY3JpcHRpb24nKSB7XG4gICAgICAgIG5hbWUgKz0gJ3MnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1vZGVscy5nZXRNb2RlbEJ5Q29sbGVjdGlvbk5hbWUobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBtb2RlbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RmlsdGVyYWJsZUZpZWxkcyhjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBhZHZhbmNlZEZpbHRlcnNGaWVsZHM/OiBBcnJheTxJRm9ybUZpZWxkPiwgY2FtcGFpZ25GaWVsZHM/OiBBcnJheTxJRm9ybUZpZWxkPiwgaXNBZG1pbjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgbGV0IGZpZWxkczogQXJyYXk8SUZvcm1GaWVsZD4gPSBbXTtcbiAgICBsZXQgbW9kZWwgPSBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGNvbGxlY3Rpb25OYW1lKTtcbiAgICBpZiAobW9kZWwgJiYgbW9kZWwuZm9ybUZpZWxkcykge1xuICAgICAgZmllbGRzID0gY2xvbmVEZWVwKG1vZGVsLmZvcm1GaWVsZHMpO1xuICAgIH1cblxuICAgIGlmIChtb2RlbCAmJiBtb2RlbC5pc0N1c3RvbSAmJiBmaWVsZHMpIHtcbiAgICAgIGZpZWxkcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICBmLmZpbHRlcmFibGUgPSBmLnNlYXJjaGFibGU7XG4gICAgICAgIGYuc29ydGFibGUgPSBmLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuZGF0ZSB8fCBmLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUgfHwgZi50eXBlID09PSBGb3JtRmllbGRUeXBlLm51bWJlcjtcbiAgICAgICAgaWYgKGYudHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5sb2NhdGlvbikge1xuICAgICAgICAgIGYuZmlsdGVyTmFtZSA9IGYubmFtZSArICdSZWYnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoYWR2YW5jZWRGaWx0ZXJzRmllbGRzICYmIGFkdmFuY2VkRmlsdGVyc0ZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICBhZHZhbmNlZEZpbHRlcnNGaWVsZHMuZm9yRWFjaChhZiA9PiB7XG4gICAgICAgIGxldCBpbmRleCA9IGZpbmRJbmRleChmaWVsZHMsIGYgPT4gZi5uYW1lID09PSBhZi5uYW1lKTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIGZpZWxkcy5wdXNoKGFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWVsZHNbaW5kZXhdID0geyAuLi5maWVsZHNbaW5kZXhdLCAuLi5hZiB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY2FtcGFpZ25GaWVsZHMpIHtcbiAgICAgIGNhbXBhaWduRmllbGRzID0gY2xvbmVEZWVwKGNhbXBhaWduRmllbGRzKTtcbiAgICAgIGNhbXBhaWduRmllbGRzLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGMubmFtZSArPSAnLnZhbHVlJztcbiAgICAgICAgYy5maWx0ZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgLy9jLnNvcnRhYmxlID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgZmllbGRzID0gZmllbGRzLmNvbmNhdChjYW1wYWlnbkZpZWxkcyk7XG4gICAgfVxuXG4gICAgbGV0IHRlbmFudEluZGV4ID0gZmluZEluZGV4KGZpZWxkcywgZiA9PiBmLm5hbWUgPT09ICdfdGVuYW50Jyk7XG4gICAgaWYgKHRlbmFudEluZGV4ID49IDAgJiYgIWlzQWRtaW4pIHtcbiAgICAgIGZpZWxkc1t0ZW5hbnRJbmRleF0uZmlsdGVyYWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBsZXQgZmluYWxGaWVsZHM6IEFycmF5PElGb3JtRmllbGQ+ID0gW107XG4gICAgZmllbGRzLmZvckVhY2goZiA9PiB7XG4gICAgICBmaW5hbEZpZWxkcy5wdXNoKGYpO1xuICAgICAgaWYgKGYuY29sbGVjdGlvbk5hbWUgJiYgZi5jb2xsZWN0aW9uTmFtZSAhPT0gY29sbGVjdGlvbk5hbWUgJiYgZi5maWx0ZXJhYmxlID09PSB0cnVlICYmIGYuc2hvd1N1YlF1ZXJ5RmlsdGVycyA9PT0gdHJ1ZSkge1xuICAgICAgICBNb2RlbHMuZ2V0TW9kZWxCeUNvbGxlY3Rpb25OYW1lKGYuY29sbGVjdGlvbk5hbWUpLmZvcm1GaWVsZHMuZm9yRWFjaChzdWJmaWVsZCA9PiB7XG4gICAgICAgICAgc3ViZmllbGQgPSBjbG9uZURlZXAoc3ViZmllbGQpO1xuICAgICAgICAgIGRlbGV0ZSBzdWJmaWVsZC5hZHZhbmNlZDtcbiAgICAgICAgICBzdWJmaWVsZC5maWx0ZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICBzdWJmaWVsZC5pY29uID0gJ3lvLXRhZyc7XG4gICAgICAgICAgLy90aGlzIGlzIHVzZWQgaW4gdGhlIGNoYW5lbCBjb2xsZWN0aW9uIHdoZXJlIHdlIHdhbnQgdG8gb3ZlcnJpZGUgdGhlIHN1YlF1ZXJ5IGRlZmluZWQgaW4gdGhlIHVzZXIgaW50ZXJmYWNlXG4gICAgICAgICAgLy90aGlzIGV2ZW4gYWxsb3cgdXMgdG8gZmlsdGVyIG9uIGFueSBzdWJmaWVsZCBvZiBhIHVzZXIgdG8gbG9vayBmb3IgY2hhbm5lbFxuICAgICAgICAgIGlmIChmLnN1YlF1ZXJ5KSB7XG4gICAgICAgICAgICBzdWJmaWVsZC5zdWJRdWVyeSA9IHN1YmZpZWxkLnN1YlF1ZXJ5IHx8IGYuc3ViUXVlcnk7XG4gICAgICAgICAgICBpZiAoIXN1YmZpZWxkLnNlc3Npb25WYWx1ZXMpIHtcbiAgICAgICAgICAgICAgc3ViZmllbGQuY29sbGVjdGlvbk5hbWUgPSBzdWJmaWVsZC5jb2xsZWN0aW9uTmFtZSB8fCBmLmNvbGxlY3Rpb25OYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3ViZmllbGQuc3ViUXVlcnkpIHtcbiAgICAgICAgICAgIGlmIChmLnN1YlF1ZXJ5T3ZlcnJpZGUpIHtcbiAgICAgICAgICAgICAgc3ViZmllbGQuc3ViUXVlcnkgPSBmLnN1YlF1ZXJ5T3ZlcnJpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJmaWVsZC5pc1N1YlF1ZXJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHN1YmZpZWxkLm5hbWUgPSBzdWJmaWVsZC5jb2xsZWN0aW9uTmFtZSArICdfJyArIHN1YmZpZWxkLm5hbWU7XG4gICAgICAgICAgICBmaW5hbEZpZWxkcy5wdXNoKHN1YmZpZWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmaW5hbEZpZWxkcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RmllbGROYW1lKGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgbGV0IGZpZWxkTmFtZSA9IGZpZWxkLm5hbWUgKyAoZmllbGQuY29sdW1uRGVmaW5pdGlvbiAmJiBmaWVsZC5jb2x1bW5EZWZpbml0aW9uLm5hbWUgPyAnLicgKyBmaWVsZC5jb2x1bW5EZWZpbml0aW9uLm5hbWUgOiAnJyk7XG4gICAgaWYgKGZpZWxkLmNvbHVtbkRlZmluaXRpb24gJiYgZmllbGQuY29sdW1uRGVmaW5pdGlvbi5mb3JjZU5hbWUpIHtcbiAgICAgIGZpZWxkTmFtZSA9IGZpZWxkLmNvbHVtbkRlZmluaXRpb24ubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkTmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RmllbGRUaXRsZShmaWVsZDogSUZvcm1GaWVsZCwgdHJhbnNsYXRlOiBhbnkpIHtcbiAgICBsZXQgZmllbGRUaXRsZSA9IGZpZWxkLnRpdGxlIHx8IGZpZWxkLm5hbWU7XG4gICAgZmllbGRUaXRsZSA9IHRyYW5zbGF0ZS5wb2x5Z2xvdChmaWVsZFRpdGxlKTtcbiAgICByZXR1cm4gZmllbGRUaXRsZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCb29sZWFuRmllbGQoZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICByZXR1cm4gaXNCb29sZWFuRmllbGQoZmllbGQpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc051bWJlckZpZWxkKGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgcmV0dXJuIGlzTnVtYmVyRmllbGQoZmllbGQpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc1Bob3RvRmllbGQoZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICByZXR1cm4gaXNQaG90b0ZpZWxkKGZpZWxkKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNNdWx0aVBob3Rvc0ZpZWxkKGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgcmV0dXJuIGlzTXVsdGlQaG90b3NGaWVsZChmaWVsZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzUGhvdG9Pck11bHRpUGhvdG9zRmllbGQoZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICByZXR1cm4gaXNQaG90b09yTXVsdGlQaG90b3NGaWVsZChmaWVsZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzVmlkZW9GaWVsZChmaWVsZDogSUZvcm1GaWVsZCkge1xuICAgIHJldHVybiBpc1ZpZGVvRmllbGQoZmllbGQpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0RhdGVUaW1lRmllbGQoZmllbGQ6IElGb3JtRmllbGQpIHtcbiAgICByZXR1cm4gaXNEYXRlVGltZUZpZWxkKGZpZWxkKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNJbnRlcnZhbEZpZWxkKGZpZWxkOiBJRm9ybUZpZWxkKSB7XG4gICAgcmV0dXJuIGlzSW50ZXJ2YWxGaWVsZChmaWVsZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzQ2hhcnRhYmxlQXV0b0ZpZWxkTm9QaG90byhmaWVsZDogSUZvcm1GaWVsZCkge1xuICAgIHJldHVybiBNb2RlbHMuaXNDaGFydGFibGVBdXRvRmllbGQoZmllbGQsIGZhbHNlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNDaGFydGFibGVBdXRvRmllbGQoZmllbGQ6IElGb3JtRmllbGQsIGluY2x1ZGVQaG90byA9IHRydWUpIHtcbiAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5jaGVja2JveDpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS50b2dnbGU6XG5cbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5zZWxlY3Q6XG4gICAgICBjYXNlIEZvcm1GaWVsZFR5cGUuc2VsZWN0bXVsdGk6XG4gICAgICBjYXNlIEZvcm1GaWVsZFR5cGUuc2VsZWN0YnV0dG9uczpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5zZWxlY3RidXR0b25zbXVsdGk6XG4gICAgICBjYXNlIEZvcm1GaWVsZFR5cGUuc3RhcnJhdGluZzpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5udW1iZXI6XG4gICAgICBjYXNlIEZvcm1GaWVsZFR5cGUucmFuZ2U6XG4gICAgICBjYXNlIEZvcm1GaWVsZFR5cGUucmFua2luZzpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5mb3JtdWxhOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5waG90bzpcbiAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5tdWx0aXBob3RvczpcbiAgICAgICAgcmV0dXJuIGluY2x1ZGVQaG90bztcblxuICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZTpcbiAgICAgICAgcmV0dXJuICFmaWVsZC5jb2xsZWN0aW9uTmFtZSB8fCBNb2RlbHMuZ2V0TW9kZWwoZmllbGQuY29sbGVjdGlvbk5hbWUpLmlzQ3VzdG9tICE9PSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzTXVsdGlwbGVGaWVsZChmaWVsZDogSUZvcm1GaWVsZCkge1xuICAgIHJldHVybiBpc011bHRpcGxlRmllbGQoZmllbGQpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0NvbG9yZWRGaWVsZChmaWVsZDogSUZvcm1GaWVsZCkge1xuICAgIHJldHVybiBpc0NvbG9yZWRGaWVsZChmaWVsZCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEZpZWxkT3BlcmF0b3IoZmllbGQ6IElGb3JtRmllbGQpOiBBcnJheTxGaWx0ZXJPcGVyYXRvcj4ge1xuICAgIGlmIChmaWVsZC50eXBlID09PSAnZmllbGRzZWxlY3RvcicpIHtcbiAgICAgIHJldHVybiBbeyB0aXRsZTogJ2luJywgX2lkOiAnaW5xJyB9XTtcbiAgICB9IGVsc2UgaWYgKE1vZGVscy5pc0Jvb2xlYW5GaWVsZChmaWVsZCkpIHtcbiAgICAgIHJldHVybiBbeyB0aXRsZTogJ2VxdWFscycsIF9pZDogJ2VxJyB9LCB7IHRpdGxlOiAnbm90ZXF1YWxzJywgX2lkOiAnbmVxJyB9XTtcbiAgICB9IGVsc2UgaWYgKE1vZGVscy5pc1Bob3RvRmllbGQoZmllbGQpKSB7XG4gICAgICByZXR1cm4gW3sgdGl0bGU6ICdleGlzdHMnLCBfaWQ6ICdleGlzdHMnIH1dO1xuICAgIH0gZWxzZSBpZiAoTW9kZWxzLmlzSW50ZXJ2YWxGaWVsZChmaWVsZCkgfHwgTW9kZWxzLmlzRGF0ZVRpbWVGaWVsZChmaWVsZCkpIHtcbiAgICAgIHJldHVybiBbeyB0aXRsZTogJ2dyZWF0ZXJ0aGFuJywgX2lkOiAnZ3RlJywgaW50ZXJ2YWw6IHRydWUgfSwgeyB0aXRsZTogJ2JldHdlZW4nLCBfaWQ6ICdiZXR3ZWVuJywgaW50ZXJ2YWw6IHRydWUgfSwgeyB0aXRsZTogJ2xlc3N0aGFuJywgX2lkOiAnbHRlJywgaW50ZXJ2YWw6IHRydWUgfSwgeyB0aXRsZTogJ2VxdWFscycsIF9pZDogJ2VxJywgaW50ZXJ2YWw6IHRydWUgfV07XG4gICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSB8fCBmaWVsZC50eXBlID09PSBGb3JtRmllbGRUeXBlLmxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gW3sgdGl0bGU6ICdpbicsIF9pZDogJ2lucScgfSwgeyB0aXRsZTogJ25vdGluJywgX2lkOiAnbmluJyB9LCB7IHRpdGxlOiAnYWxsJywgX2lkOiAnYWxsJyB9XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt7IHRpdGxlOiAnbGlrZScsIF9pZDogJ2xpa2UnIH0sIHsgdGl0bGU6ICdub3RsaWtlJywgX2lkOiAnbmxpa2UnIH0sIHsgdGl0bGU6ICdlcXVhbHMnLCBfaWQ6ICdlcScgfSwgeyB0aXRsZTogJ25vdGVxdWFscycsIF9pZDogJ25lcScgfV07XG4gICAgfVxuICB9XG5cbiAgLy8gcHVibGljIHN0YXRpYyBnZXRGb3JtRmllbGRGcm9tTW9iaWxlRmllbGQodHlwZSkge1xuICAvLyAgICAgc3dpdGNoICh0eXBlKSB7XG4gIC8vICAgICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLnBob3RvOlxuICAvLyAgICAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5zaWduYXR1cmU6XG4gIC8vICAgICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLmltYWdlOlxuICAvLyAgICAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS5iYXJjb2RlOlxuICAvLyAgICAgICAgIGNhc2UgRm9ybUZpZWxkVHlwZS52aWRlbzpcbiAgLy8gICAgICAgICBjYXNlIEZvcm1GaWVsZFR5cGUuYXVkaW86XG4gIC8vICAgICAgICAgY2FzZSBGb3JtRmllbGRUeXBlLmRvY3VtZW50OlxuICAvLyAgICAgICAgICAgICByZXR1cm4gRm9ybUZpZWxkVHlwZS5waG90bztcbiAgLy8gICAgICAgICBjYXNlIEZvcm1GaWVsZFR5cGUuZGF0ZTpcbiAgLy8gICAgICAgICAgICAgcmV0dXJuIEZvcm1GaWVsZFR5cGUuZGF0ZTtcbiAgLy8gICAgICAgICBkZWZhdWx0OlxuICAvLyAgICAgICAgICAgICByZXR1cm4gRm9ybUZpZWxkVHlwZVt0eXBlXSB8fCBGb3JtRmllbGRUeXBlLnRleHQ7XG4gIC8vICAgICB9XG4gIC8vIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE1vYmlsZUZpZWxkSWNvbih0eXBlOiBzdHJpbmcpIHtcbiAgICBsZXQgZmllbGRzID0gW10uY29uY2F0KE1PQklMRV9GT1JNX0ZJRUxEU19BTEwpLmZpbHRlcihmaWVsZCA9PiBmaWVsZC50eXBlID09PSB0eXBlKTtcbiAgICBpZiAoZmllbGRzICYmIGZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZmllbGRzWzBdLmljb247XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZXhwb3J0V2hlcmUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgZmlsdGVycz86IEZpbHRlcnMsIGV4Y2x1ZGVkRmllbGRzID0gW10pIHtcbiAgICBsZXQgcmV0VmFsID0gZmlsdGVycy5tYXAoZnMgPT4ge1xuICAgICAgbGV0IHNpbXBsaWZpZWRGaWx0ZXJzID0gW107XG4gICAgICBmcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICBpZiAoKCFmLnN1YlF1ZXJ5IHx8IGYuY29sbGVjdGlvbk5hbWUgPT09IGNvbGxlY3Rpb25OYW1lKSAmJiAoIWV4Y2x1ZGVkRmllbGRzIHx8IGV4Y2x1ZGVkRmllbGRzLmluZGV4T2YoZi5maWVsZCkgPCAwKSkge1xuICAgICAgICAgIC8vJiYgIWYuaXNGaWVsZFNlbGVjdG9yXG4gICAgICAgICAgbGV0IGZpbHRlciA9IE1vZGVscy5leHBvcnRGaWx0ZXJGaWVsZChmKTtcbiAgICAgICAgICBpZiAoZmlsdGVyICYmICFpc0VtcHR5KGZpbHRlcikpIHtcbiAgICAgICAgICAgIHNpbXBsaWZpZWRGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHNpbXBsaWZpZWRGaWx0ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoc2ltcGxpZmllZEZpbHRlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBzaW1wbGlmaWVkRmlsdGVyc1swXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7IGFuZDogc2ltcGxpZmllZEZpbHRlcnMgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChyZXRWYWwpIHtcbiAgICAgIHB1bGwocmV0VmFsLCBudWxsKTtcbiAgICB9XG5cbiAgICBpZiAocmV0VmFsICYmIHJldFZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiByZXRWYWxbMF07XG4gICAgfSBlbHNlIGlmIChyZXRWYWwgJiYgcmV0VmFsLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB7IG9yOiByZXRWYWwgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGV4cG9ydFN1YlF1ZXJ5KGNvbGxlY3Rpb25OYW1lOiBzdHJpbmcsIGZpbHRlcnM/OiBGaWx0ZXJzIHwgT2JqZWN0LCBpc0FnZ3JlZ2F0aW9uUXVlcnk/OiBib29sZWFuKTogU3ViUXVlcnkgfCBBcnJheTxTdWJRdWVyeT4ge1xuICAgIGxldCByZXRWYWw6IEFycmF5PFN1YlF1ZXJ5PiA9IFtdO1xuICAgIGlmIChmaWx0ZXJzICYmIGlzQXJyYXkoZmlsdGVycykgJiYgKDxGaWx0ZXJzPmZpbHRlcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgICg8RmlsdGVycz5maWx0ZXJzKS5mb3JFYWNoKGZzID0+IHtcbiAgICAgICAgZnMuZm9yRWFjaChmID0+IHtcbiAgICAgICAgICBpZiAoZi5zdWJRdWVyeSAmJiBmLmNvbGxlY3Rpb25OYW1lICE9PSBjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgICAgICAgcmV0VmFsLnB1c2goe1xuICAgICAgICAgICAgICBjb2xsZWN0aW9uTmFtZTogdGhpcy5maXhDb2xsZWN0aW9uTmFtZShmLmNvbGxlY3Rpb25OYW1lLCBpc0FnZ3JlZ2F0aW9uUXVlcnkpLFxuICAgICAgICAgICAgICB3aGVyZTogTW9kZWxzLmV4cG9ydEZpbHRlckZpZWxkKGYpLFxuICAgICAgICAgICAgICBmaWVsZDogZi5zdWJRdWVyeS5maWVsZCxcbiAgICAgICAgICAgICAgdmFsdWVzOiBmLnN1YlF1ZXJ5LnZhbHVlcyxcbiAgICAgICAgICAgICAgbGVmdEpvaW46IGYuc3ViUXVlcnkubGVmdEpvaW5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbC5sZW5ndGggPT09IDEgPyByZXRWYWxbMF0gOiByZXRWYWwubGVuZ3RoID4gMSA/IHJldFZhbCA6IG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGV4cG9ydFNlYXJjaChjb2xsZWN0aW9uTmFtZTogc3RyaW5nLCBzZWFyY2g6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKHNlYXJjaCAmJiBzZWFyY2gubWF0Y2ggJiYgc2VhcmNoLm1hdGNoKC9eWzAtOWEtZkEtRl17MjR9JC8pKSB7XG4gICAgICByZXR1cm4geyBfaWQ6IHNlYXJjaCB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmV0VmFsID0gTW9kZWxzLmdldE1vZGVsQnlDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZSkuc2VhcmNoYWJsZUZpZWxkcy5tYXAoZmllbGQgPT4ge1xuICAgICAgICBsZXQgZmlsdGVyID0ge307XG4gICAgICAgIGlmIChmaWVsZCA9PT0gJ19pZCcgJiYgY29sbGVjdGlvbk5hbWUgIT09ICdncm91cHMnKSB7XG4gICAgICAgICAgZmlsdGVyW2ZpZWxkXSA9IHNlYXJjaDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWx0ZXJbZmllbGRdID0geyBsaWtlOiBzZWFyY2gsIG9wdGlvbnM6ICdpJyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWx0ZXI7XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXRWYWwubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiByZXRWYWxbMF07XG4gICAgICB9IGVsc2UgaWYgKHJldFZhbC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB7IG9yOiByZXRWYWwgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZml4Q29sbGVjdGlvbk5hbWUoY29sbGVjdGlvbk5hbWU6IHN0cmluZywgaXNBZ2dyZWdhdGlvblF1ZXJ5PzogYm9vbGVhbikge1xuICAgIHN3aXRjaCAoY29sbGVjdGlvbk5hbWUpIHtcbiAgICAgIGNhc2UgJ21pc3Npb25kZXNjcmlwdGlvbnMnOlxuICAgICAgICByZXR1cm4gaXNBZ2dyZWdhdGlvblF1ZXJ5ID8gJ21pc3Npb25kZXNjcmlwdGlvbicgOiBjb2xsZWN0aW9uTmFtZTtcbiAgICAgIGNhc2UgJ2dyb3Vwcyc6XG4gICAgICAgIHJldHVybiBpc0FnZ3JlZ2F0aW9uUXVlcnkgPyAnZ3JvdXAnIDogY29sbGVjdGlvbk5hbWU7XG4gICAgICBjYXNlICdmZWVkc0NvbW1lbnRzJzpcbiAgICAgICAgcmV0dXJuIGlzQWdncmVnYXRpb25RdWVyeSA/ICdmZWVkc0NvbW1lbnQnIDogY29sbGVjdGlvbk5hbWU7XG4gICAgICBjYXNlICd1c2Vycyc6XG4gICAgICAgIHJldHVybiAndXNlcic7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbk5hbWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRQdWJsaWNDb2xsZWN0aW9uTmFtZShjb2xsZWN0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgc3dpdGNoIChjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgY2FzZSAnbG9jYXRpb25zJzpcbiAgICAgICAgcmV0dXJuICdzdG9yZXMnO1xuICAgICAgY2FzZSAndXNlcic6XG4gICAgICBjYXNlICd1c2Vycyc6XG4gICAgICAgIHJldHVybiAndXNlcnMnO1xuICAgICAgY2FzZSAnbG9jYXRpb250eXBlcyc6XG4gICAgICAgIHJldHVybiAnc3RvcmUtdHlwZXMnO1xuICAgICAgY2FzZSAnbWlzc2lvbmRlc2NyaXB0aW9ucyc6XG4gICAgICAgIHJldHVybiAnY2FtcGFpZ25zJztcbiAgICAgIGNhc2UgJ2ZlZWRzJzpcbiAgICAgICAgcmV0dXJuICduZXdzJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uTmFtZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFBob3RvRnJvbVBhcmFtcyhwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5ub2RlICYmIHBhcmFtcy5ub2RlLmRhdGEpIHtcbiAgICAgIGxldCByb3cgPSBwYXJhbXMubm9kZS5kYXRhLnRvSlMgPyBwYXJhbXMubm9kZS5kYXRhLnRvSlMoKSA6IHBhcmFtcy5ub2RlLmRhdGE7XG4gICAgICBsZXQgZiA9IHBhcmFtcy5jb2xEZWYuZmllbGQucmVwbGFjZSgnLnZhbHVlJywgJycpO1xuICAgICAgbGV0IHBob3RvID0gTW9kZWxzLmV4dHJhY3RQaG90byhyb3dbZl0sIHJvdywge30sIGYpO1xuICAgICAgcmV0dXJuIHBob3RvO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIGdldCBwaG90b3MgZm9yIG11bHRpcGhvdG8gY29tcG9uZW50XG4gIHB1YmxpYyBzdGF0aWMgZ2V0UGhvdG9zRnJvbVBhcmFtcyhwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5ub2RlICYmIHBhcmFtcy5ub2RlLmRhdGEpIHtcbiAgICAgIGxldCByb3cgPSBwYXJhbXMubm9kZS5kYXRhLnRvSlMgPyBwYXJhbXMubm9kZS5kYXRhLnRvSlMoKSA6IHBhcmFtcy5ub2RlLmRhdGE7XG4gICAgICBsZXQgZiA9IHBhcmFtcy5jb2xEZWYuZmllbGQucmVwbGFjZSgnLnZhbHVlJywgJycpOyAvLyBmaWVsZCBuYW1lXG4gICAgICBsZXQgcGhvdG9zID0gW107XG4gICAgICBpZiAocm93ICYmIGYgJiYgcm93W2ZdICYmIHJvd1tmXS52YWx1ZSAmJiBpc0FycmF5KHJvd1tmXS52YWx1ZSkpIHtcbiAgICAgICAgcm93W2ZdLnZhbHVlLmZvckVhY2goKHYsIG11bHRpSW5kZXgpID0+IHtcbiAgICAgICAgICBwaG90b3MucHVzaChNb2RlbHMuZXh0cmFjdFBob3RvKHYsIHJvdywge30sIGYsIEZvcm1GaWVsZFR5cGUubXVsdGlwaG90b3MsIG51bGwsIG11bHRpSW5kZXgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGhvdG9zO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RW1wdHlVcmwoY29sbGVjdGlvbk5hbWU6IHN0cmluZykge1xuICAgIHN3aXRjaCAoY29sbGVjdGlvbk5hbWUpIHtcbiAgICAgIGNhc2UgJ2Rhc2hib2FyZHMnOlxuICAgICAgY2FzZSAnZGFzaGJvYXJkJzpcbiAgICAgICAgcmV0dXJuICdkYXNoYm9hcmQuc3ZnJztcblxuICAgICAgY2FzZSAnbWlzc2lvbnMnOlxuICAgICAgY2FzZSAnbWlzc2lvbic6XG4gICAgICAgIHJldHVybiAnbWlzc2lvbi5zdmcnO1xuXG4gICAgICBjYXNlICdtaXNzaW9uZGVzY3JpcHRpb25zJzpcbiAgICAgIGNhc2UgJ21pc3Npb25kZXNjcmlwdGlvbic6XG4gICAgICBjYXNlICdjYW1wYWlnbic6XG4gICAgICAgIHJldHVybiAnY2FtcGFpZ24uc3ZnJztcblxuICAgICAgY2FzZSAncGhvdG9zJzpcbiAgICAgIGNhc2UgJ3Bob3RvJzpcbiAgICAgICAgcmV0dXJuICdwaG90by5zdmcnO1xuXG4gICAgICBjYXNlICdmZWVkcyc6XG4gICAgICBjYXNlICdmZWVkJzpcbiAgICAgICAgcmV0dXJuICdmZWVkLnN2Zyc7XG5cbiAgICAgIGNhc2UgJ2ZpbGVzJzpcbiAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICByZXR1cm4gJ2ZpbGUuc3ZnJztcblxuICAgICAgY2FzZSAnbG9jYXRpb25zJzpcbiAgICAgIGNhc2UgJ2xvY2F0aW9uJzpcbiAgICAgICAgcmV0dXJuICdsb2NhdGlvbi5zdmcnO1xuXG4gICAgICBjYXNlICdub3Rlcyc6XG4gICAgICBjYXNlICdub3RlJzpcbiAgICAgICAgcmV0dXJuICdub3RlLnN2Zyc7XG5cbiAgICAgIGNhc2UgJ3VzZXJzJzpcbiAgICAgIGNhc2UgJ3VzZXInOlxuICAgICAgICByZXR1cm4gJ3VzZXIuc3ZnJztcbiAgICB9XG4gICAgcmV0dXJuICdlbXB0eS5zdmcnO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBleHRyYWN0UGhvdG8oZGF0YSwgbWlzc2lvbmRhdGEsIGZpZWxkLCBuYW1lLCB0eXBlPzogc3RyaW5nLCBoaWRlVXNlcjogYm9vbGVhbiA9IGZhbHNlLCBtdWx0aUluZGV4PzogbnVtYmVyKSB7XG4gICAgbGV0IHBob3RvOiBhbnkgPSB7fTtcbiAgICBpZiAoZGF0YSB8fCAoZmllbGQgJiYgZmllbGQudHlwZSA9PT0gJ2ltYWdlJyAmJiBmaWVsZC5pbWFnZSAmJiBmaWVsZC5pbWFnZS5fZG93bmxvYWRVUkwpKSB7XG4gICAgICBpZiAoZGF0YSAmJiBkYXRhLnZhbHVlICYmICgoZGF0YS52YWx1ZS5pbmRleE9mICYmIGRhdGEudmFsdWUuaW5kZXhPZignaHR0cCcpID09PSAwKSB8fCBpc0ltYWdlRmlsZShkYXRhLnZhbHVlKSkgJiYgKCF0eXBlIHx8ICFkYXRhLmZpZWxkVHlwZSB8fCBkYXRhLmZpZWxkVHlwZSA9PT0gdHlwZSkpIHtcbiAgICAgICAgcGhvdG8gPSB7XG4gICAgICAgICAgdmFsdWU6IGRhdGEudmFsdWUsXG4gICAgICAgICAgY29tbWVudHM6IGRhdGEuY29tbWVudHMsXG4gICAgICAgICAgdGFnczogZGF0YS50YWdzLFxuICAgICAgICAgIGZsYWdnZWQ6IGRhdGEuZmxhZ2dlZCxcbiAgICAgICAgICBlZGl0OiBkYXRhLmVkaXQsXG4gICAgICAgICAgc3RpdGNoOiBkYXRhLnN0aXRjaCxcbiAgICAgICAgICBlZGl0Qnk6IGRhdGEuZWRpdEJ5LFxuICAgICAgICAgIGVkaXRXaWR0aDogZGF0YS5lZGl0V2lkdGgsXG4gICAgICAgICAgZWRpdEhlaWdodDogZGF0YS5lZGl0SGVpZ2h0LFxuICAgICAgICAgIHRleHRzOiBkYXRhLnRleHRzLFxuICAgICAgICAgIHN2Z0RhdGE6IGRhdGEuc3ZnRGF0YVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChkYXRhICYmICgoZGF0YS5pbmRleE9mICYmIGRhdGEuaW5kZXhPZignaHR0cCcpID09PSAwKSB8fCBpc0ltYWdlRmlsZShkYXRhKSkpIHtcbiAgICAgICAgaWYgKHR5cGUgJiYgdHlwZSA9PT0gRm9ybUZpZWxkVHlwZS5tdWx0aXBob3Rvcykge1xuICAgICAgICAgIGxldCBmaWVsZERhdGEgPSBnZXQobWlzc2lvbmRhdGEsIGZpZWxkLm5hbWUgfHwgbmFtZSk7XG4gICAgICAgICAgbGV0IGV4dHJhRGF0YSA9IGZpZWxkRGF0YSAmJiAoPGFueT5maWVsZERhdGEpLmV4dHJhRGF0YSA/ICg8YW55PmZpZWxkRGF0YSkuZXh0cmFEYXRhIDoge307XG4gICAgICAgICAgcGhvdG8gPSB7XG4gICAgICAgICAgICB2YWx1ZTogZGF0YSxcbiAgICAgICAgICAgIHRhZ3M6IGV4dHJhRGF0YVttdWx0aUluZGV4XSA/IGV4dHJhRGF0YVttdWx0aUluZGV4XS50YWdzIDogbnVsbCxcbiAgICAgICAgICAgIGZsYWdnZWQ6IGV4dHJhRGF0YVttdWx0aUluZGV4XSA/IGV4dHJhRGF0YVttdWx0aUluZGV4XS5mbGFnZ2VkIDogbnVsbCxcbiAgICAgICAgICAgIGVkaXQ6IGV4dHJhRGF0YVttdWx0aUluZGV4XSA/IGV4dHJhRGF0YVttdWx0aUluZGV4XS5lZGl0IDogbnVsbCxcbiAgICAgICAgICAgIHN0aXRjaDogZXh0cmFEYXRhW211bHRpSW5kZXhdID8gZXh0cmFEYXRhW211bHRpSW5kZXhdLnN0aXRjaCA6IG51bGwsXG4gICAgICAgICAgICBlZGl0Qnk6IGV4dHJhRGF0YVttdWx0aUluZGV4XSA/IGV4dHJhRGF0YVttdWx0aUluZGV4XS5lZGl0QnkgOiBudWxsLFxuICAgICAgICAgICAgZWRpdFdpZHRoOiBleHRyYURhdGFbbXVsdGlJbmRleF0gPyBleHRyYURhdGFbbXVsdGlJbmRleF0uZWRpdFdpZHRoIDogbnVsbCxcbiAgICAgICAgICAgIGVkaXRIZWlnaHQ6IGV4dHJhRGF0YVttdWx0aUluZGV4XSA/IGV4dHJhRGF0YVttdWx0aUluZGV4XS5lZGl0SGVpZ2h0IDogbnVsbCxcbiAgICAgICAgICAgIHRleHRzOiBleHRyYURhdGFbbXVsdGlJbmRleF0gPyBleHRyYURhdGFbbXVsdGlJbmRleF0udGV4dHMgOiBbXSxcbiAgICAgICAgICAgIHN2Z0RhdGE6IGV4dHJhRGF0YVttdWx0aUluZGV4XSA/IGV4dHJhRGF0YVttdWx0aUluZGV4XS5zdmdEYXRhIDogbnVsbCxcbiAgICAgICAgICAgIGlzTXVsdGk6IHRydWVcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBob3RvID0geyB2YWx1ZTogZGF0YSB9O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGZpZWxkICYmIGZpZWxkLnR5cGUgPT09ICdpbWFnZScgJiYgZmllbGQuaW1hZ2UgJiYgZmllbGQuaW1hZ2UuX2Rvd25sb2FkVVJMKSB7XG4gICAgICAgIHBob3RvID0ge1xuICAgICAgICAgIG5hbWU6IGZpZWxkLm5hbWUgfHwgbmFtZSxcbiAgICAgICAgICB0aXRsZTogZmllbGQudGl0bGUsXG4gICAgICAgICAgdmFsdWU6IGZpZWxkLmltYWdlLl9kb3dubG9hZFVSTCxcbiAgICAgICAgICBpc0ltYWdlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoIWlzRW1wdHkocGhvdG8pKSB7XG4gICAgICAgIGlmICghZmllbGQgfHwgZmllbGQudHlwZSAhPT0gJ2ltYWdlJykge1xuICAgICAgICAgIGFzc2lnbihwaG90bywge1xuICAgICAgICAgICAgdGl0bGU6IGZpZWxkLnRpdGxlLFxuICAgICAgICAgICAgbmFtZTogZmllbGQubmFtZSB8fCBuYW1lLFxuICAgICAgICAgICAgbXVsdGlJbmRleDogbXVsdGlJbmRleCxcbiAgICAgICAgICAgIF9pZDogbWlzc2lvbmRhdGEuX2lkICsgJyBfJyArIChmaWVsZC5uYW1lIHx8IG5hbWUpLFxuICAgICAgICAgICAgbWlzc2lvbmRlc2NyaXB0aW9uUmVmOiBtaXNzaW9uZGF0YS5taXNzaW9uZGVzY3JpcHRpb25SZWYsXG4gICAgICAgICAgICBtaXNzaW9uZGVzY3JpcHRpb246IG1pc3Npb25kYXRhLm1pc3Npb25kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIG1pc3Npb25kYXRhOiBtaXNzaW9uZGF0YSxcbiAgICAgICAgICAgIG1pc3Npb25kYXRhUmVmOiBtaXNzaW9uZGF0YS5faWQsXG4gICAgICAgICAgICBtaXNzaW9uOiBtaXNzaW9uZGF0YS5taXNzaW9uLFxuICAgICAgICAgICAgbWlzc2lvblJlZjogbWlzc2lvbmRhdGEubWlzc2lvblJlZixcbiAgICAgICAgICAgIHVzZXJSZWY6IG1pc3Npb25kYXRhLnVzZXJSZWYsXG4gICAgICAgICAgICB1c2VyRGlzcGxheW5hbWU6IGhpZGVVc2VyID8gJycgOiBtaXNzaW9uZGF0YS51c2VyRGlzcGxheW5hbWUsXG4gICAgICAgICAgICBhZGRyZXNzOiBtaXNzaW9uZGF0YS5hZGRyZXNzLFxuICAgICAgICAgICAgbG9jYXRpb246IG1pc3Npb25kYXRhLmxvY2F0aW9uLFxuICAgICAgICAgICAgdmFsaWRhdGVkOiBtaXNzaW9uZGF0YS52YWxpZGF0ZWQsXG4gICAgICAgICAgICBfYWNsOiBtaXNzaW9uZGF0YS5fYWNsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmllbGQuaXNJbWFnZVJlY29nbml0aW9uICYmIHBob3RvLnN0aXRjaCkge1xuICAgICAgICAgIHBob3RvLnZhbHVlID0gcGhvdG8uc3RpdGNoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwaG90bztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKlxuICAgICAgIFJldHVybiB0aGUgdHJhbnNmb3JtIHRvIGV4dHJhY3QgdGhlIGZpZWxkcyBmcm9tIGEgbWlzc2lvbiBkZXNjcmlwdGlvblxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRGaWVsZFRyYW5zZm9ybSh0eXBlczogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgZnVuY3Rpb24gZ2V0RmllbGRUcmFuc2Zvcm1JbnRlcm5hbChyZXM6IFJlc3BvbnNlT2JqZWN0KSB7XG4gICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEuZm9yRWFjaCkge1xuICAgICAgICBsZXQgZmllbGRzID0gW107XG4gICAgICAgIHJlcy5kYXRhLmZvckVhY2goKG1pc3Npb25kZXNjcmlwdGlvbjogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IG1pc3Npb25GaWVsZHMgPSBNb2RlbHMuZ2V0RmllbGRzKG1pc3Npb25kZXNjcmlwdGlvbiwgdHlwZXMpO1xuICAgICAgICAgIG1pc3Npb25GaWVsZHMgPSBtaXNzaW9uRmllbGRzLm1hcCgoZmllbGQ6IElGb3JtRmllbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhc3NpZ24oZmllbGQsIHtcbiAgICAgICAgICAgICAgX2lkOiBmaWVsZC5uYW1lLFxuICAgICAgICAgICAgICBuYW1lOiBmaWVsZC5uYW1lICsgJy52YWx1ZScsXG4gICAgICAgICAgICAgIG9wZXJhdG9yczogTW9kZWxzLmdldEZpZWxkT3BlcmF0b3IoZmllbGQpLFxuICAgICAgICAgICAgICBzbGlkZVRpdGxlOiBtaXNzaW9uZGVzY3JpcHRpb24udGl0bGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGZpZWxkcyA9IGZpZWxkcy5jb25jYXQobWlzc2lvbkZpZWxkcyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXMuZGF0YSA9IGZpZWxkcztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldEZpZWxkVHJhbnNmb3JtSW50ZXJuYWw7XG4gIH1cblxuICAvKlxuICAgICAgICBSZXR1cm4gdGhlIGxpc3Qgb2Ygc2xpZGUgaXRlbXMgZmllbGRzIGZyb20gYSBtaXNzaW9uIGRlc2NyaXB0aW9uIChtb2JpbGUgdHlwZSlcbiAgICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEZpZWxkcyhtaXNzaW9uZGVzY3JpcHRpb246IGFueSwgdHlwZXM6IEFycmF5PHN0cmluZz4gPSBbXSwgZXhjbHVkZWRUeXBlczogQXJyYXk8c3RyaW5nPiA9IFtdKSB7XG4gICAgcmV0dXJuIE1vZGVscy5nZXRGaWVsZHNGcm9tU2xpZGVzKG1pc3Npb25kZXNjcmlwdGlvbi5zbGlkZXMsIHR5cGVzLCBleGNsdWRlZFR5cGVzKTtcbiAgfVxuXG4gIC8qXG4gICAgICAgIFJldHVybiB0aGUgbGlzdCBvZiBzbGlkZSBpdGVtcyBmaWVsZHMgZnJvbSBhbiBhcnJheSBvZiBzbGlkZXMgKG1vYmlsZSB0eXBlKVxuICAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0RmllbGRzRnJvbVNsaWRlcyhzbGlkZXM6IEFycmF5PGFueT4sIHR5cGVzOiBBcnJheTxzdHJpbmc+ID0gW10sIGV4Y2x1ZGVkVHlwZXM6IEFycmF5PHN0cmluZz4gPSBbXSkge1xuICAgIGxldCBmaWVsZHM6IEFycmF5PElGb3JtRmllbGQ+ID0gW107XG4gICAgaWYgKHNsaWRlcykge1xuICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoc2xpZGUuaXRlbXMpIHtcbiAgICAgICAgICBzbGlkZS5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5zbGlkZVRpdGxlID0gc2xpZGUudGl0bGU7XG4gICAgICAgICAgICBpZiAoIXR5cGVzIHx8IHR5cGVzLmxlbmd0aCA9PT0gMCB8fCB0eXBlcy5pbmRleE9mKGl0ZW0udHlwZSkgPj0gMCkge1xuICAgICAgICAgICAgICBpZiAoIWV4Y2x1ZGVkVHlwZXMgfHwgZXhjbHVkZWRUeXBlcy5sZW5ndGggPT09IDAgfHwgZXhjbHVkZWRUeXBlcy5pbmRleE9mKGl0ZW0udHlwZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5zbGlkZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgZmllbGRzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmaWVsZHM7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBleHBvcnRGaWx0ZXJGaWVsZChmOiBGaWx0ZXJGaWVsZCkge1xuICAgIGxldCBmaWx0ZXIgPSB7fTtcbiAgICBpZiAoaXNBcnJheShmLnZhbHVlKSAmJiBmLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICB9XG5cbiAgICBpZiAoZi5oYW5kbGVVbmRlZmluZWQgJiYgaXNQcmVzZW50KGYudmFsdWUpICYmIGlzQXJyYXkoZi52YWx1ZSkpIHtcbiAgICAgIGlmIChmLnZhbHVlLmluZGV4T2YodW5kZWZpbmVkKSA8IDAgJiYgZi52YWx1ZS5pbmRleE9mKCd1bmRlZmluZWQnKSA8IDApIHtcbiAgICAgICAgZmlsdGVyW2YuZmllbGRdID0ge307XG4gICAgICAgIGZpbHRlcltmLmZpZWxkXVtmLm9wZXJhdG9yLl9pZF0gPSBmLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGRlZiA9IGZpbHRlcjtcbiAgICAgICAgZGVmW2YuZmllbGRdID0ge307XG4gICAgICAgIGRlZltmLmZpZWxkXVtmLm9wZXJhdG9yLl9pZF0gPSBtYXAoZi52YWx1ZSwgdiA9PiB7XG4gICAgICAgICAgcmV0dXJuIHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB2O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZmlsdGVyW2YuZmllbGRdID0ge307XG4gICAgICBpZiAoZi50eXBlID09PSBGb3JtRmllbGRUeXBlLmFkZHJlc3MgJiYgZi52YWx1ZSAmJiAoaXNBcnJheShmLnZhbHVlKSB8fCBpc0FycmF5KGYudmFsdWUuX2dlb2xvYykpKSB7XG4gICAgICAgIGZpbHRlcltmLmZpZWxkXSA9IHtcbiAgICAgICAgICBuZWFyU3BoZXJlOiB7XG4gICAgICAgICAgICAkZ2VvbWV0cnk6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGYudmFsdWUgJiYgZi52YWx1ZS5fZ2VvbG9jID8gZi52YWx1ZS5fZ2VvbG9jIDogZi52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICRtYXhEaXN0YW5jZTogZi5yYWRpdXMgKiAxMDAwIHx8IDQwMDAwXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChmLm9wZXJhdG9yLl9pZCA9PT0gJ25lYXJTcGhlcmUnICYmIGYudmFsdWUgJiYgKGlzQXJyYXkoZi52YWx1ZSkgfHwgaXNBcnJheShmLnZhbHVlLl9nZW9sb2MpKSkge1xuICAgICAgICBmaWx0ZXJbZi5maWVsZF0gPSB7XG4gICAgICAgICAgbmVhclNwaGVyZToge1xuICAgICAgICAgICAgJGdlb21ldHJ5OiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBmLnZhbHVlICYmIGYudmFsdWUuX2dlb2xvYyA/IGYudmFsdWUuX2dlb2xvYyA6IGYudmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkbWF4RGlzdGFuY2U6IGYubWF4IHx8IDQwMDAwXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChmLnR5cGUgPT09IEZvcm1GaWVsZFR5cGUuZGF0ZSAmJiBmLm9wZXJhdG9yLl9pZCA9PT0gJ2VxJykge1xuICAgICAgICBmaWx0ZXJbZi5maWVsZF1bJ2JldHdlZW4nXSA9IFtmLnZhbHVlLCBkYXRlRm9ybWF0KGRhdGVBZGQoZi52YWx1ZSwgJ2RheXMnLCAxKSwgJ1lZWVktTU0tZGQnKV07XG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChmLnZhbHVlKSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBpc0FycmF5KGYudmFsdWUpICYmIGlzT2JqZWN0KGYudmFsdWVbMF0pID8gbWFwKGYudmFsdWUsICdfaWQnKSA6IGlzQXJyYXkoZi52YWx1ZSkgPyBmLnZhbHVlIDogaXNPYmplY3QoZi52YWx1ZSkgPyBmLnZhbHVlLl9pZCA6IGYudmFsdWU7XG4gICAgICAgIGlmIChmLm9wZXJhdG9yICYmIGYub3BlcmF0b3IuX2lkID09PSAnZXEnKSB7XG4gICAgICAgICAgZmlsdGVyW2YuZmllbGRdID0gdmFsdWU7XG4gICAgICAgICAgLy8gfSBlbHNlIGlmIChmLm9wZXJhdG9yICYmIGYub3BlcmF0b3IuX2lkID09PSAnYmV0d2VlbicgJiYgaXNBcnJheShmLnZhbHVlKSAmJiBmLnZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAvLyAgICAgZmlsdGVyW2YuZmllbGRdID0geyAnZ3RlJzogZi52YWx1ZVswXSwgJ2x0JzogZi52YWx1ZVsxXSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbHRlcltmLmZpZWxkXVtmLm9wZXJhdG9yLl9pZF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGYub3BlcmF0b3IgJiYgKGYub3BlcmF0b3IuX2lkID09PSAnbGlrZScgfHwgZi5vcGVyYXRvci5faWQgPT09ICdubGlrZScpKSB7XG4gICAgICAgIGZpbHRlcltmLmZpZWxkXS5vcHRpb25zID0gJ2knO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlT3JHZXRNb2RlbChjbGFzc05hbWU6IHN0cmluZywgb3ZlcnJpZGU/OiBib29sZWFuKTogSU1vZGVsIHtcbiAgICBNb2RlbHMuX21vZGVscyA9IE1vZGVscy5fbW9kZWxzIHx8IG5ldyBNYXA8c3RyaW5nLCBJTW9kZWw+KCk7XG4gICAgaWYgKE1vZGVscy5fbW9kZWxzLmhhcyhjbGFzc05hbWUpICYmIG92ZXJyaWRlICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm4gTW9kZWxzLl9tb2RlbHMuZ2V0KGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtb2RlbCA9IG5ldyBJTW9kZWwoY2xhc3NOYW1lKTtcbiAgICAgIE1vZGVscy5fbW9kZWxzLnNldChjbGFzc05hbWUsIG1vZGVsKTtcbiAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyB1cGRhdGVNb2RlbChjbGFzc05hbWU6IHN0cmluZywgbW9kZWw6IElNb2RlbCkge1xuICAgIGxldCBmb3JtRmllbGRzID0gbW9kZWwuZm9ybUZpZWxkcyB8fCBbXTtcbiAgICBpZiAoZm9ybUZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09ICdfdGVuYW50JykgPCAwICYmIG1vZGVsLmNvbGxlY3Rpb25OYW1lICYmIG1vZGVsLmNvbGxlY3Rpb25OYW1lICE9PSAndGVuYW50cycpIHtcbiAgICAgIGZvcm1GaWVsZHMucHVzaCh7XG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICBuYW1lOiAnX3RlbmFudCcsXG4gICAgICAgIHRpdGxlOiAnVEVOQU5UJyxcbiAgICAgICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgICAgIGNvbmRpdGlvbjogW1JPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl0sXG4gICAgICAgIGNvbGxlY3Rpb25OYW1lOiAndGVuYW50cycsXG4gICAgICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICAgICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnbmFtZScgfSxcbiAgICAgICAgc3VwcHJlc3NFeHBvcnQ6IHRydWUsXG4gICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gICAgbW9kZWwuZm9ybUZpZWxkcyA9IGZvcm1GaWVsZHM7XG4gICAgTW9kZWxzLl9tb2RlbHMuc2V0KGNsYXNzTmFtZSwgbW9kZWwpO1xuICB9XG59XG4iXX0=