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
    var rq = injector.get(Requestor);
    /** @type {?} */
    var language = data.language;
    /** @type {?} */
    var value = data.value;
    if (value && language) {
        data[language] = value;
        return Googletranslate.getAll(value, language, rq)
            .toPromise()
            .then((/**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            /** @type {?} */
            var isCapitalized = capitalize(value) === value;
            values.forEach((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
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
    function (l) { return l !== 'key'; }))
        .forEach((/**
     * @param {?} l
     * @return {?}
     */
    function (l) {
        data[l] = null;
    }));
    data = tslib_1.__assign({}, data);
}
var Translation = /** @class */ (function (_super) {
    tslib_1.__extends(Translation, _super);
    function Translation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return Translation;
}(ITranslation));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24uaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvdHJhbnNsYXRpb24vdHJhbnNsYXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUV0RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUV2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7O0FBRXZDLE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQWtCOztRQUM5RCxFQUFFLEdBQWMsUUFBUSxDQUFDLEdBQUcsQ0FBWSxTQUFTLENBQUM7O1FBQ3BELFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUTs7UUFDeEIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO0lBQ3RCLElBQUksS0FBSyxJQUFJLFFBQVEsRUFBRTtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQzthQUMvQyxTQUFTLEVBQUU7YUFDWCxJQUFJOzs7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Q0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OzJDQUFZO0lBRVg7UUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7MkNBQVk7SUFFWDtRQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzsyQ0FBWTtJQUVYO1FBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OzJDQUFZO0lBRVg7UUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7NENBQWE7SUFFWjtRQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzs0Q0FBYTtJQUVaO1FBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OzJDQUFZO0lBRVg7UUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7MkNBQVk7SUFFWDtRQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzsyQ0FBWTtJQUVYO1FBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OzJDQUFZO0lBRVg7UUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7MkNBQVk7SUFFWDtRQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzsyQ0FBWTtJQUVYO1FBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OzJDQUFZO0lBRVg7UUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7MkNBQVk7SUFFWDtRQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzsyQ0FBWTtJQUVYO1FBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OzJDQUFZO0lBRVg7UUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7MkNBQVk7SUFFWDtRQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzsyQ0FBWTtJQUVYO1FBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OzJDQUFZO0lBRVg7UUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7MkNBQVk7SUFFWDtRQUF0RSxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzsyQ0FBWTtJQUVYO1FBQXRFLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OzJDQUFZO0lBRVg7UUFBdEUsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7MkNBQVk7SUF0SHZFLFdBQVc7UUFQdkIsS0FBSyxDQUFDO1lBQ0wsU0FBUyxFQUFFLGFBQWE7WUFDeEIsY0FBYyxFQUFFLGNBQWM7WUFDOUIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3BCLElBQUksRUFBRSxjQUFjO1NBQ3JCLENBQUM7T0FDVyxXQUFXLENBdUh2QjtJQUFELGtCQUFDO0NBQUEsQ0F2SGdDLFlBQVksR0F1SDVDO1NBdkhZLFdBQVc7OztJQUN0QiwwQkFDYTs7SUFFYiwrQkFVaUI7O0lBRWpCLDBCQUVZOztJQUVaLDRCQUljOztJQUVkLHNDQU9zQjs7SUFFdEIsa0NBT2tCOztJQUVsQiwrQkFDa0I7O0lBRWxCLHdDQUMyQjs7SUFFM0IsNEJBWThCOztJQUU5Qix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRiwwQkFBbUY7O0lBRW5GLDBCQUFtRjs7SUFFbkYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0Y7O0lBRWxGLHlCQUFrRjs7SUFFbEYseUJBQWtGOztJQUVsRix5QkFBa0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSVRyYW5zbGF0aW9uIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgZ2V0R3JvdXBzVHJhbnNmb3JtIH0gZnJvbSAnLi4vY29uZGl0aW9uL2NvbmRpdGlvbi5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBHb29nbGV0cmFuc2xhdGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9nb29nbGV0cmFuc2xhdGUvZ29vZ2xldHJhbnNsYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgY2FwaXRhbGl6ZSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVCdXR0b25IYW5kbGVyKGRhdGEsIGZpZWxkLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgY29uc3QgcnE6IFJlcXVlc3RvciA9IGluamVjdG9yLmdldDxSZXF1ZXN0b3I+KFJlcXVlc3Rvcik7XG4gIGxldCBsYW5ndWFnZSA9IGRhdGEubGFuZ3VhZ2U7XG4gIGxldCB2YWx1ZSA9IGRhdGEudmFsdWU7XG4gIGlmICh2YWx1ZSAmJiBsYW5ndWFnZSkge1xuICAgIGRhdGFbbGFuZ3VhZ2VdID0gdmFsdWU7XG4gICAgcmV0dXJuIEdvb2dsZXRyYW5zbGF0ZS5nZXRBbGwodmFsdWUsIGxhbmd1YWdlLCBycSlcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oKHZhbHVlczogQXJyYXk8eyBsYW5ndWFnZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH0+KSA9PiB7XG4gICAgICAgIGxldCBpc0NhcGl0YWxpemVkID0gY2FwaXRhbGl6ZSh2YWx1ZSkgPT09IHZhbHVlO1xuICAgICAgICB2YWx1ZXMuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICBkYXRhW3YubGFuZ3VhZ2VdID0gaXNDYXBpdGFsaXplZCA/IGNhcGl0YWxpemUodi52YWx1ZSkgOiB2LnZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldEJ1dHRvbkhhbmRsZXIoZGF0YSwgZmllbGQpIHtcbiAgVHJhbnNsYXRlLmF2YWlsYWJsZXNMYW5ndWFnZVxuICAgIC5maWx0ZXIobCA9PiBsICE9PSAna2V5JylcbiAgICAuZm9yRWFjaChsID0+IHtcbiAgICAgIGRhdGFbbF0gPSBudWxsO1xuICAgIH0pO1xuICBkYXRhID0geyAuLi5kYXRhIH07XG59XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ1RyYW5zbGF0aW9uJyxcbiAgY29sbGVjdGlvbk5hbWU6ICd0cmFuc2xhdGlvbnMnLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbJ190ZW5hbnQnXSxcbiAgaWNvbjogJ3lvLXRyYW5zbGF0ZSdcbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRpb24gZXh0ZW5kcyBJVHJhbnNsYXRpb24ge1xuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyB0aXRsZTogJ0lEJywgdmlzaWJsZTogZmFsc2UsIGZvcmNlRXhwb3J0OiB0cnVlIH0pXG4gIF9pZD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRpdGxlOiAnTEFOR1VBR0UnLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICB2YWx1ZXM6IFRyYW5zbGF0ZS5hdmFpbGFibGVzTGFuZ3VhZ2UsXG4gICAgY2xlYXJhYmxlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBhdXRvc2VsZWN0OiB0cnVlLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDQwIH1cbiAgfSlcbiAgbGFuZ3VhZ2U6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIEBTZWFyY2hhYmxlKCdUcmFuc2xhdGlvbicpXG4gIGtleTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0XG4gIH0pXG4gIHZhbHVlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmJ1dHRvbixcbiAgICB0aXRsZTogJ1RSQU5TTEFURScsXG4gICAgY29sb3I6ICdzdWNjZXNzJyxcbiAgICBzdXBwcmVzc0V4cG9ydDogdHJ1ZSxcbiAgICBoYW5kbGVyOiB0cmFuc2xhdGVCdXR0b25IYW5kbGVyXG4gIH0pXG4gIHRyYW5zbGF0ZUJ1dHRvbj86IGFueTtcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYnV0dG9uLFxuICAgIHRpdGxlOiAnUkVTRVQnLFxuICAgIHN1cHByZXNzRXhwb3J0OiB0cnVlLFxuICAgIGNvbG9yOiAnZGFuZ2VyJyxcbiAgICBoYW5kbGVyOiByZXNldEJ1dHRvbkhhbmRsZXJcbiAgfSlcbiAgcmVzZXRCdXR0b24/OiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsIHRpdGxlOiAnVU5WQUxJREFURVJFQVNPTicgfSlcbiAgaXNSZWplY3Q6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsIHRpdGxlOiAnQU5OT1RBVEUnIH0pXG4gIGlzUGhvdG9Bbm5vdGF0aW9uOiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7XG4gICAgdGl0bGU6ICdHUk9VUFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZ3JvdXBzJyxcbiAgICBmaWx0ZXJzOiBbW3sgZmllbGQ6ICdpc1JvbGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH0sIHsgZmllbGQ6ICd0eXBlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmluJyB9LCB2YWx1ZTogWydwbGFuJ10gfV1dLFxuICAgIGhpZGRlbkZpZWxkczogWydpc1JvbGUnLCAndHlwZSddLFxuICAgIGlkT25seTogdHJ1ZSxcbiAgICBtYXBUcmFuc2Zvcm06IGdldEdyb3Vwc1RyYW5zZm9ybSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0pXG4gIGdyb3VwOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+O1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgZW46IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHVzOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBmcjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgZXM6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHBsOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBubDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgZGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIGl0OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBydTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgemhzOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSB6aHQ6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHB0OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBrcjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgamE6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHVhOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBoZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgYXI6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIGN6OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSB0aDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgdHI6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIGJnOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBlbDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgc2w6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIHNrOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBybzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVHJhbnNsYXRpb24nLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSkgaHU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RyYW5zbGF0aW9uJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pIGV0OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUcmFuc2xhdGlvbicsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KSBicjogc3RyaW5nO1xufVxuIl19