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
let Currency = class Currency {
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvY3VycmVuY3kvY3VycmVuY3kuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztJQVNqQyxRQUFRLFNBQVIsUUFBUTtDQXdCcEIsQ0FBQTtBQVRDO0lBVEMsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNwQixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxLQUFLLEVBQUUsVUFBVTtRQUNqQixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRSxTQUFTLENBQUMsa0JBQWtCO1FBQ3BDLFNBQVMsRUFBRSxLQUFLO0tBQ2pCLENBQUM7SUFDRCxVQUFVLENBQUMsVUFBVSxDQUFDOzswQ0FDTjtBQUlqQjtJQUZDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEUsVUFBVSxDQUFDLFVBQVUsQ0FBQzs7d0NBQ1I7QUFJZjtJQUZDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNwRixVQUFVLENBQUMsVUFBVSxDQUFDOztzQ0FDVjtBQXZCRixRQUFRO0lBTnBCLEtBQUssQ0FBQztRQUNMLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLGNBQWMsRUFBRSxZQUFZO1FBQzVCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNiLE9BQU8sRUFBRSxFQUFFO0tBQ1osQ0FBQztHQUNXLFFBQVEsQ0F3QnBCO1NBeEJZLFFBQVE7OztJQUNuQix1QkFBYTs7SUFDYix3QkFBWTs7SUFDWix3QkFBYzs7SUFDZCx3QkFBYzs7SUFFZCw0QkFTaUI7O0lBRWpCLDBCQUVlOztJQUVmLHdCQUVhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSUN1cnJlbmN5IH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IFRyYW5zbGF0ZSB9IGZyb20gJ0BzaGFyZWQvdHJhbnNsYXRlJztcbmltcG9ydCB7IElBY2wgfSBmcm9tICcuLi9lbnRpdHkvZW50aXR5LmludGVyZmFjZSc7XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0N1cnJlbmN5JyxcbiAgY29sbGVjdGlvbk5hbWU6ICdjdXJyZW5jaWVzJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogW11cbn0pXG5leHBvcnQgY2xhc3MgQ3VycmVuY3kgaW1wbGVtZW50cyBJQ3VycmVuY3kge1xuICBfaWQ/OiBzdHJpbmc7XG4gIF9hY2w/OiBJQWNsO1xuICBfbG10Pzogc3RyaW5nO1xuICBfZWN0Pzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ3VycmVuY3knLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGl0bGU6ICdMQU5HVUFHRScsXG4gICAgdHJhbnNsYXRlOiB0cnVlLFxuICAgIHZhbHVlczogVHJhbnNsYXRlLmF2YWlsYWJsZXNMYW5ndWFnZSxcbiAgICBjbGVhcmFibGU6IGZhbHNlXG4gIH0pXG4gIEBTZWFyY2hhYmxlKCdDdXJyZW5jeScpXG4gIGN1cnJlbmN5OiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDdXJyZW5jeScsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBAU2VhcmNoYWJsZSgnQ3VycmVuY3knKVxuICBzeW1ib2w6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0N1cnJlbmN5JywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS5udW1iZXIsIHRpdGxlOiAnUkFURTEnIH0pXG4gIEBTZWFyY2hhYmxlKCdDdXJyZW5jeScpXG4gIHJhdGU6IG51bWJlcjtcbn1cbiJdfQ==