/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IAlgorithm } from '@shared/stencil';
var Algorithm = /** @class */ (function (_super) {
    tslib_1.__extends(Algorithm, _super);
    function Algorithm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return Algorithm;
}(IAlgorithm));
export { Algorithm };
if (false) {
    /** @type {?} */
    Algorithm.prototype.name;
    /** @type {?} */
    Algorithm.prototype.stitch;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxnb3JpdGhtLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2FsZ29yaXRobS9hbGdvcml0aG0uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFRN0IscUNBQVU7OztJQU16QyxDQUFDO0lBSEM7UUFGQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25FLFVBQVUsQ0FBQyxXQUFXLENBQUM7OzJDQUNYO0lBSEYsU0FBUztRQU5yQixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsV0FBVztZQUN0QixjQUFjLEVBQUUsV0FBVztZQUMzQixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztZQUNqQyxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7T0FDVyxTQUFTLENBTXJCO0lBQUQsZ0JBQUM7Q0FBQSxDQU44QixVQUFVLEdBTXhDO1NBTlksU0FBUzs7O0lBQ3BCLHlCQUVhOztJQUViLDJCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElBbGdvcml0aG0gfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdBbGdvcml0aG0nLFxuICBjb2xsZWN0aW9uTmFtZTogJ2FsZ29yaXRobScsXG4gIGZpZWxkczogWyduYW1lJywgJ19pZCcsICdzdGl0Y2gnXSxcbiAgaW5jbHVkZTogW11cbn0pXG5leHBvcnQgY2xhc3MgQWxnb3JpdGhtIGV4dGVuZHMgSUFsZ29yaXRobSB7XG4gIEBFZGl0YWJsZSgnQWxnb3JpdGhtJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIEBTZWFyY2hhYmxlKCdBbGdvcml0aG0nKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgc3RpdGNoPzogYm9vbGVhbjtcbn1cbiJdfQ==