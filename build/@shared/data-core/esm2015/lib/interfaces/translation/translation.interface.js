/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormFieldType, ITranslation } from '@shared/stencil';
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { getGroupsTransform } from '../condition/condition.interface';
import { Translate } from '@shared/translate';
import { Googletranslate } from '../../services/googletranslate/googletranslate.service';
import { Requestor } from '../../services/requestor/requestor.service';
import { capitalize } from 'lodash-es';
/**
 * @param {?} data
 * @param {?} field
 * @param {?} injector
 * @return {?}
 */
export function translateButtonHandler(data, field, injector) {
    /** @type {?} */
    const rq = injector.get(Requestor);
    /** @type {?} */
    let language = data.language;
    /** @type {?} */
    let value = data.value;
    if (value && language) {
        data[language] = value;
        return Googletranslate.getAll(value, language, rq)
            .toPromise()
            .then((/**
         * @param {?} values
         * @return {?}
         */
        (values) => {
            /** @type {?} */
            let isCapitalized = capitalize(value) === value;
            values.forEach((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                data[v.language] = isCapitalized ? capitalize(v.value) : v.value;
            }));
        }));
    }
}
/**
 * @param {?} data
 * @param {?} field
 * @return {?}
 */
export function resetButtonHandler(data, field) {
    Translate.availablesLanguage
        .filter((/**
     * @param {?} l
     * @return {?}
     */
    l => l !== 'key'))
        .forEach((/**
     * @param {?} l
     * @return {?}
     */
    l => {
        data[l] = null;
    }));
    data = Object.assign({}, data);
}
let Translation = class Translation extends ITranslation {
};
tslib_1.__decorate([
    Editable('Translation', { title: 'ID', visible: false, forceExport: true }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "_id", void 0);
tslib_1.__decorate([
    Editable('Translation', {
        type: FormFieldType.autocomplete,
        title: 'LANGUAGE',
        translate: true,
        values: Translate.availablesLanguage,
        clearable: false,
        required: true,
        autoselect: true,
        columnDefinition: { width: 40 }
    }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "language", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    Searchable('Translation'),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "key", void 0);
tslib_1.__decorate([
    Editable('Translation', {
        required: true,
        type: FormFieldType.text
    }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "value", void 0);
tslib_1.__decorate([
    Editable('Translation', {
        type: FormFieldType.button,
        title: 'TRANSLATE',
        color: 'success',
        suppressExport: true,
        handler: translateButtonHandler
    }),
    tslib_1.__metadata("design:type", Object)
], Translation.prototype, "translateButton", void 0);
tslib_1.__decorate([
    Editable('Translation', {
        type: FormFieldType.button,
        title: 'RESET',
        suppressExport: true,
        color: 'danger',
        handler: resetButtonHandler
    }),
    tslib_1.__metadata("design:type", Object)
], Translation.prototype, "resetButton", void 0);
tslib_1.__decorate([
    Editable('Translation', { type: FormFieldType.toggle, title: 'UNVALIDATEREASON' }),
    tslib_1.__metadata("design:type", Boolean)
], Translation.prototype, "isReject", void 0);
tslib_1.__decorate([
    Editable('Translation', { type: FormFieldType.toggle, title: 'ANNOTATE' }),
    tslib_1.__metadata("design:type", Boolean)
], Translation.prototype, "isPhotoAnnotation", void 0);
tslib_1.__decorate([
    Editable('Translation', {
        title: 'GROUPS',
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true,
        clearable: false,
        required: true
    }),
    tslib_1.__metadata("design:type", Object)
], Translation.prototype, "group", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "en", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "us", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "fr", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "es", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "pl", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "nl", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "de", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "it", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "ru", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "zhs", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "zht", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "pt", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "kr", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "ja", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "ua", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "he", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "ar", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "cz", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "th", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "tr", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "bg", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "el", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "sl", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "sk", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "ro", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "hu", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "et", void 0);
tslib_1.__decorate([
    Editable('Translation', { required: true, type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "br", void 0);
Translation = tslib_1.__decorate([
    Model({
        className: 'Translation',
        collectionName: 'translations',
        fields: ['*'],
        include: ['_tenant'],
        icon: 'yo-translate'
    })
], Translation);
export { Translation };
if (false) {
    /** @type {?} */
    Translation.prototype._id;
    /** @type {?} */
    Translation.prototype.language;
    /** @type {?} */
    Translation.prototype.key;
    /** @type {?} */
    Translation.prototype.value;
    /** @type {?} */
    Translation.prototype.translateButton;
    /** @type {?} */
    Translation.prototype.resetButton;
    /** @type {?} */
    Translation.prototype.isReject;
    /** @type {?} */
    Translation.prototype.isPhotoAnnotation;
    /** @type {?} */
    Translation.prototype.group;
    /** @type {?} */
    Translation.prototype.en;
    /** @type {?} */
    Translation.prototype.us;
    /** @type {?} */
    Translation.prototype.fr;
    /** @type {?} */
    Translation.prototype.es;
    /** @type {?} */
    Translation.prototype.pl;
    /** @type {?} */
    Translation.prototype.nl;
    /** @type {?} */
    Translation.prototype.de;
    /** @type {?} */
    Translation.prototype.it;
    /** @type {?} */
    Translation.prototype.ru;
    /** @type {?} */
    Translation.prototype.zhs;
    /** @type {?} */
    Translation.prototype.zht;
    /** @type {?} */
    Translation.prototype.pt;
    /** @type {?} */
    Translation.prototype.kr;
    /** @type {?} */
    Translation.prototype.ja;
    /** @type {?} */
    Translation.prototype.ua;
    /** @type {?} */
    Translation.prototype.he;
    /** @type {?} */
    Translation.prototype.ar;
    /** @type {?} */
    Translation.prototype.cz;
    /** @type {?} */
    Translation.prototype.th;
    /** @type {?} */
    Translation.prototype.tr;
    /** @type {?} */
    Translation.prototype.bg;
    /** @type {?} */
    Translation.prototype.el;
    /** @type {?} */
    Translation.prototype.sl;
    /** @type {?} */
    Translation.prototype.sk;
    /** @type {?} */
    Translation.prototype.ro;
    /** @type {?} */
    Translation.prototype.hu;
    /** @type {?} */
    Translation.prototype.et;
    /** @type {?} */
    Translation.prototype.br;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24uaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvdHJhbnNsYXRpb24vdHJhbnNsYXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUV0RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUV2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7O0FBRXZDLE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQWtCOztVQUM5RCxFQUFFLEdBQWMsUUFBUSxDQUFDLEdBQUcsQ0FBWSxTQUFTLENBQUM7O1FBQ3BELFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUTs7UUFDeEIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO0lBQ3RCLElBQUksS0FBSyxJQUFJLFFBQVEsRUFBRTtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQzthQUMvQyxTQUFTLEVBQUU7YUFDWCxJQUFJOzs7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QUM7O3VDQUFZO0FBRVg7SUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7dUNBQVk7QUFFWDtJQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzt1Q0FBWTtBQUVYO0lBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O3VDQUFZO0FBRVg7SUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7dUNBQVk7QUFFWDtJQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzt3Q0FBYTtBQUVaO0lBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O3dDQUFhO0FBRVo7SUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7dUNBQVk7QUFFWDtJQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzt1Q0FBWTtBQUVYO0lBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O3VDQUFZO0FBRVg7SUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7dUNBQVk7QUFFWDtJQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzt1Q0FBWTtBQUVYO0lBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O3VDQUFZO0FBRVg7SUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7dUNBQVk7QUFFWDtJQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzt1Q0FBWTtBQUVYO0lBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O3VDQUFZO0FBRVg7SUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7dUNBQVk7QUFFWDtJQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzt1Q0FBWTtBQUVYO0lBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O3VDQUFZO0FBRVg7SUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7dUNBQVk7QUFFWDtJQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzt1Q0FBWTtBQUVYO0lBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O3VDQUFZO0FBRVg7SUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7dUNBQVk7QUFFWDtJQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzt1Q0FBWTtBQXRIdkUsV0FBVztJQVB2QixLQUFLLENBQUM7UUFDTCxTQUFTLEVBQUUsYUFBYTtRQUN4QixjQUFjLEVBQUUsY0FBYztRQUM5QixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDYixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDcEIsSUFBSSxFQUFFLGNBQWM7S0FDckIsQ0FBQztHQUNXLFdBQVcsQ0F1SHZCO1NBdkhZLFdBQVc7OztJQUN0QiwwQkFDYTs7SUFFYiwrQkFVaUI7O0lBRWpCLDBCQUVZOztJQUVaLDRCQUljOztJQUVkLHNDQU9zQjs7SUFFdEIsa0NBT2tCOztJQUVsQiwrQkFDa0I7O0lBRWxCLHdDQUMyQjs7SUFFM0IsNEJBWThCOztJQUU5Qix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRiwwQkFBbUY7O0lBRW5GLDBCQUFtRjs7SUFFbkYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSVRyYW5zbGF0aW9uIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgZ2V0R3JvdXBzVHJhbnNmb3JtIH0gZnJvbSAnLi4vY29uZGl0aW9uL2NvbmRpdGlvbi5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBHb29nbGV0cmFuc2xhdGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGV0cmFuc2xhdGUvZ29vZ2xldHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgY2FwaXRhbGl6ZSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVCdXR0b25IYW5kbGVyKGRhdGEsIGZpZWxkLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3QgcnE6IFJlcXVlc3RvciA9IGluamVjdG9yLmdldDxSZXF1ZXN0b3I+KFJlcXVlc3Rvcik7XG4gIGxldCBsYW5ndWFnZSA9IGRhdGEubGFuZ3VhZ2U7XG4gIGxldCB2YWx1ZSA9IGRhdGEudmFsdWU7XG4gIGlmICh2YWx1ZSAmJiBsYW5ndWFnZSkge1xuICAgIGRhdGFbbGFuZ3VhZ2VdID0gdmFsdWU7XG4gICAgcmV0dXJuIEdvb2dsZXRyYW5zbGF0ZS5nZXRBbGwodmFsdWUsIGxhbmd1YWdlLCBycSlcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oKHZhbHVlczogQXJyYXk8eyBsYW5ndWFnZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+KSA9PiB7XG4gICAgICAgIGxldCBpc0NhcGl0YWxpemVkID0gY2FwaXRhbGl6ZSh2YWx1ZSkgPT09IHZhbHVlO1xuICAgICAgICB2YWx1ZXMuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICBkYXRhW3YubGFuZ3VhZ2VdID0gaXNDYXBpdGFsaXplZCA/IGNhcGl0YWxpemUodi52YWx1ZSkgOiB2LnZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldEJ1dHRvbkhhbmRsZXIoZGF0YSwgZmllbGQpIHtcbiAgVHJhbnNsYXRlLmF2YWlsYWJsZXNMYW5ndWFnZVxuICAgIC5maWx0ZXIobCA9PiBsICE9PSAna2V5JylcbiAgICAuZm9yRWFjaChsID0+IHtcbiAgICAgIGRhdGFbbF0gPSBudWxsO1xuICAgIH0pO1xuICBkYXRhID0geyAuLi5kYXRhIH07XG59XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ1RyYW5zbGF0aW9uJyxcbiAgY29sbGVjdGlvbk5hbWU6ICd0cmFuc2xhdGlvbnMnLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbJ190ZW5hbnQnXSxcbiAgaWNvbjogJ3lvLXRyYW5zbGF0ZSdcbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRpb24gZXh0ZW5kcyBJVHJhbnNsYXRpb24ge1xuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyB0aXRsZTogJ0lEJywgdmlzaWJsZTogZmFsc2UsIGZvcmNlRXhwb3J0OiB0cnVlIH0pXG4gIF9pZD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRpdGxlOiAnTEFOR1VBR0UnLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICB2YWx1ZXM6IFRyYW5zbGF0ZS5hdmFpbGFibGVzTGFuZ3VhZ2UsXG4gICAgY2xlYXJhYmxlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBhdXRvc2VsZWN0OiB0cnVlLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDQwIH1cbiAgfSlcbiAgbGFuZ3VhZ2U6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIEBTZWFyY2hhYmxlKCdUcmFuc2xhdGlvbicpXG4gIGtleTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0XG4gIH0pXG4gIHZhbHVlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmJ1dHRvbixcbiAgICB0aXRsZTogJ1RSQU5TTEFURScsXG4gICAgY29sb3I6ICdzdWNjZXNzJyxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBoYW5kbGVyOiB0cmFuc2xhdGVCdXR0b25IYW5kbGVyXG4gIH0pXG4gIHRyYW5zbGF0ZUJ1dHRvbj86IGFueTtcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYnV0dG9uLFxuICAgIHRpdGxlOiAnUkVTRVQnLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGNvbG9yOiAnZGFuZ2VyJyxcbiAgICBoYW5kbGVyOiByZXNldEJ1dHRvbkhhbmRsZXJcbiAgfSlcbiAgcmVzZXRCdXR0b24/OiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsIHRpdGxlOiAnVU5WQUxJREFURVJFQVNPTicgfSlcbiAgaXNSZWplY3Q6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsIHRpdGxlOiAnQU5OT1RBVEUnIH0pXG4gIGlzUGhvdG9Bbm5vdGF0aW9uOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7XG4gICAgdGl0bGU6ICdHUk9VUFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdpc1JvbGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH0sIHsgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogWydwbGFuJ10gfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydpc1JvbGUnLCAndHlwZSddLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBtYXBUcmFuc2Zvcm06IGdldEdyb3Vwc1RyYW5zZm9ybSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0pXG4gIGdyb3VwOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgZW46IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHVzOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBmcjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgZXM6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHBsOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBubDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgZGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIGl0OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBydTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgemhzOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSB6aHQ6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHB0OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBrcjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgamE6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHVhOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBoZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgYXI6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIGN6OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSB0aDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgdHI6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIGJnOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBlbDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgc2w6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHNrOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBybzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgaHU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIGV0OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBicjogc3RyaW5nO1xufVxuIl19