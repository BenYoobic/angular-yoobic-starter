/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType } from '@shared/stencil';
import { Translate } from '@shared/translate';
var Currency = /** @class */ (function () {
    function Currency() {
    }
    tslib_1.__decorate([
        Editable('Currency', {
            required: true,
            type: FormFieldType.autocomplete,
            title: 'LANGUAGE',
            translate: true,
            values: Translate.availablesLanguage,
            clearable: false
        }),
        Searchable('Currency'),
        tslib_1.__metadata("design:type", String)
    ], Currency.prototype, "currency", void 0);
    tslib_1.__decorate([
        Editable('Currency', { required: true, type: FormFieldType.text }),
        Searchable('Currency'),
        tslib_1.__metadata("design:type", String)
    ], Currency.prototype, "symbol", void 0);
    tslib_1.__decorate([
        Editable('Currency', { required: true, type: FormFieldType.number, title: 'RATE1' }),
        Searchable('Currency'),
        tslib_1.__metadata("design:type", Number)
    ], Currency.prototype, "rate", void 0);
    Currency = tslib_1.__decorate([
        Model({
            className: 'Currency',
            collectionName: 'currencies',
            fields: ['*'],
            include: []
        })
    ], Currency);
    return Currency;
}());
export { Currency };
if (false) {
    /** @type {?} */
    Currency.prototype._id;
    /** @type {?} */
    Currency.prototype._acl;
    /** @type {?} */
    Currency.prototype._lmt;
    /** @type {?} */
    Currency.prototype._ect;
    /** @type {?} */
    Currency.prototype.currency;
    /** @type {?} */
    Currency.prototype.symbol;
    /** @type {?} */
    Currency.prototype.rate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvY3VycmVuY3kvY3VycmVuY3kuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0lBaUM5QyxDQUFDO0lBVEM7UUFUQyxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ3BCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLFNBQVMsQ0FBQyxrQkFBa0I7WUFDcEMsU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQztRQUNELFVBQVUsQ0FBQyxVQUFVLENBQUM7OzhDQUNOO0lBSWpCO1FBRkMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsRSxVQUFVLENBQUMsVUFBVSxDQUFDOzs0Q0FDUjtJQUlmO1FBRkMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3BGLFVBQVUsQ0FBQyxVQUFVLENBQUM7OzBDQUNWO0lBdkJGLFFBQVE7UUFOcEIsS0FBSyxDQUFDO1lBQ0wsU0FBUyxFQUFFLFVBQVU7WUFDckIsY0FBYyxFQUFFLFlBQVk7WUFDNUIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2IsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFDO09BQ1csUUFBUSxDQXdCcEI7SUFBRCxlQUFDO0NBQUEsSUFBQTtTQXhCWSxRQUFROzs7SUFDbkIsdUJBQWE7O0lBQ2Isd0JBQVk7O0lBQ1osd0JBQWM7O0lBQ2Qsd0JBQWM7O0lBRWQsNEJBU2lCOztJQUVqQiwwQkFFZTs7SUFFZix3QkFFYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElDdXJyZW5jeSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5pbXBvcnQgeyBJQWNsIH0gZnJvbSAnLi4vZW50aXR5L2VudGl0eS5pbnRlcmZhY2UnO1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdDdXJyZW5jeScsXG4gIGNvbGxlY3Rpb25OYW1lOiAnY3VycmVuY2llcycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5IGltcGxlbWVudHMgSUN1cnJlbmN5IHtcbiAgX2lkPzogc3RyaW5nO1xuICBfYWNsPzogSUFjbDtcbiAgX2xtdD86IHN0cmluZztcbiAgX2VjdD86IHN0cmluZztcblxuICBARWRpdGFibGUoJ0N1cnJlbmN5Jywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRpdGxlOiAnTEFOR1VBR0UnLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICB2YWx1ZXM6IFRyYW5zbGF0ZS5hdmFpbGFibGVzTGFuZ3VhZ2UsXG4gICAgY2xlYXJhYmxlOiBmYWxzZVxuICB9KVxuICBAU2VhcmNoYWJsZSgnQ3VycmVuY3knKVxuICBjdXJyZW5jeTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ3VycmVuY3knLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgQFNlYXJjaGFibGUoJ0N1cnJlbmN5JylcbiAgc3ltYm9sOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDdXJyZW5jeScsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLCB0aXRsZTogJ1JBVEUxJyB9KVxuICBAU2VhcmNoYWJsZSgnQ3VycmVuY3knKVxuICByYXRlOiBudW1iZXI7XG59XG4iXX0=