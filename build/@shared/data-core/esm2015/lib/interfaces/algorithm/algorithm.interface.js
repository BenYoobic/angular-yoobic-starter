/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IAlgorithm } from '@shared/stencil';
let Algorithm = class Algorithm extends IAlgorithm {
};
tslib_1.__decorate([
    Editable('Algorithm', { required: true, type: FormFieldType.text }),
    Searchable('Algorithm'),
    tslib_1.__metadata("design:type", String)
], Algorithm.prototype, "name", void 0);
Algorithm = tslib_1.__decorate([
    Model({
        className: 'Algorithm',
        collectionName: 'algorithm',
        fields: ['name', '_id', 'stitch'],
        include: []
    })
], Algorithm);
export { Algorithm };
if (false) {
    /** @type {?} */
    Algorithm.prototype.name;
    /** @type {?} */
    Algorithm.prototype.stitch;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxnb3JpdGhtLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2FsZ29yaXRobS9hbGdvcml0aG0uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztJQVEvQyxTQUFTLFNBQVQsU0FBVSxTQUFRLFVBQVU7Q0FNeEMsQ0FBQTtBQUhDO0lBRkMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuRSxVQUFVLENBQUMsV0FBVyxDQUFDOzt1Q0FDWDtBQUhGLFNBQVM7SUFOckIsS0FBSyxDQUFDO1FBQ0wsU0FBUyxFQUFFLFdBQVc7UUFDdEIsY0FBYyxFQUFFLFdBQVc7UUFDM0IsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7UUFDakMsT0FBTyxFQUFFLEVBQUU7S0FDWixDQUFDO0dBQ1csU0FBUyxDQU1yQjtTQU5ZLFNBQVM7OztJQUNwQix5QkFFYTs7SUFFYiwyQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJQWxnb3JpdGhtIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnQWxnb3JpdGhtJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdhbGdvcml0aG0nLFxuICBmaWVsZHM6IFsnbmFtZScsICdfaWQnLCAnc3RpdGNoJ10sXG4gIGluY2x1ZGU6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFsZ29yaXRobSBleHRlbmRzIElBbGdvcml0aG0ge1xuICBARWRpdGFibGUoJ0FsZ29yaXRobScsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBAU2VhcmNoYWJsZSgnQWxnb3JpdGhtJylcbiAgbmFtZTogc3RyaW5nO1xuXG4gIHN0aXRjaD86IGJvb2xlYW47XG59XG4iXX0=