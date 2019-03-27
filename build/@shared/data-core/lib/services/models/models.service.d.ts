import { Type } from '@angular/core';
import { Filters, FilterOperator, SubQuery, IFormField } from '@shared/stencil';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { IModel } from '../../interfaces/model/model.interface';
/** @name Models
 * @angularType service
 * @description A powerful service which gets the model for a collection or class. The model could include form fields, searchable fields and mapping fields which are useful for generating forms or filters related to the collection or class.
 */
export declare class Models {
    private static _models;
    static addSearchableField(className: string, fieldName: string): void;
    static addMappingField(className: string, fieldName: string, order: number): void;
    static addAppearance(className: string, entityListItemProperty: string, appearance: any): void;
    static addFormField(className: string, field: IFormField): void;
    static addBaseModel(className: string, baseClassName: string, target: any): void;
    static setCollectionName(className: string, collectionName: string, fields: any, include: any, searchSubquery: any, feathersService: string, target: any, isCustom?: boolean, detailComponent?: string, icon?: string): void;
    static clearCollectionName(className: string): void;
    static getModel(className: string | Type<any>): IModel;
    static getModelByCollectionName(collectionName: string): IModel;
    static getFilterableFields(collectionName: string, advancedFiltersFields?: Array<IFormField>, campaignFields?: Array<IFormField>, isAdmin?: boolean): IFormField[];
    static getFieldName(field: IFormField): string;
    static getFieldTitle(field: IFormField, translate: any): string;
    static isBooleanField(field: IFormField): boolean;
    static isNumberField(field: IFormField): boolean;
    static isPhotoField(field: IFormField): boolean;
    static isMultiPhotosField(field: IFormField): boolean;
    static isPhotoOrMultiPhotosField(field: IFormField): boolean;
    static isVideoField(field: IFormField): boolean;
    static isDateTimeField(field: IFormField): boolean;
    static isIntervalField(field: IFormField): boolean;
    static isChartableAutoFieldNoPhoto(field: IFormField): boolean;
    static isChartableAutoField(field: IFormField, includePhoto?: boolean): boolean;
    static isMultipleField(field: IFormField): boolean;
    static isColoredField(field: IFormField): boolean;
    static getFieldOperator(field: IFormField): Array<FilterOperator>;
    static getMobileFieldIcon(type: string): any;
    static exportWhere(collectionName: string, filters?: Filters, excludedFields?: any[]): any;
    static exportSubQuery(collectionName: string, filters?: Filters | Object, isAggregationQuery?: boolean): SubQuery | Array<SubQuery>;
    static exportSearch(collectionName: string, search: string): any;
    static fixCollectionName(collectionName: string, isAggregationQuery?: boolean): string;
    static getPublicCollectionName(collectionName: string): string;
    static getPhotoFromParams(params: any): any;
    static getPhotosFromParams(params: any): any[];
    static getEmptyUrl(collectionName: string): "dashboard.svg" | "mission.svg" | "campaign.svg" | "photo.svg" | "feed.svg" | "file.svg" | "location.svg" | "note.svg" | "user.svg" | "empty.svg";
    static extractPhoto(data: any, missiondata: any, field: any, name: any, type?: string, hideUser?: boolean, multiIndex?: number): any;
    static getFieldTransform(types?: Array<string>): (res: ResponseObject) => ResponseObject;
    static getFields(missiondescription: any, types?: Array<string>, excludedTypes?: Array<string>): IFormField[];
    static getFieldsFromSlides(slides: Array<any>, types?: Array<string>, excludedTypes?: Array<string>): IFormField[];
    private static exportFilterField;
    private static createOrGetModel;
    private static updateModel;
}
