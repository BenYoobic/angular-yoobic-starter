/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { IOperation, FormFieldType } from '@shared/stencil';
var Operation = /** @class */ (function (_super) {
    tslib_1.__extends(Operation, _super);
    function Operation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Searchable('Operation'),
        tslib_1.__metadata("design:type", String)
    ], Operation.prototype, "operationId", void 0);
    tslib_1.__decorate([
        Searchable('Operation'),
        tslib_1.__metadata("design:type", String)
    ], Operation.prototype, "operationName", void 0);
    tslib_1.__decorate([
        Searchable('Operation'),
        tslib_1.__metadata("design:type", String)
    ], Operation.prototype, "methodName", void 0);
    tslib_1.__decorate([
        Searchable('Operation'),
        tslib_1.__metadata("design:type", String)
    ], Operation.prototype, "modelName", void 0);
    tslib_1.__decorate([
        Editable('Operation', { type: FormFieldType.datetime, readonly: true }),
        Searchable('Operation'),
        tslib_1.__metadata("design:type", Date)
    ], Operation.prototype, "_createdAt", void 0);
    tslib_1.__decorate([
        Editable('Operation', { type: FormFieldType.number, readonly: true }),
        Searchable('Operation'),
        tslib_1.__metadata("design:type", Number)
    ], Operation.prototype, "count", void 0);
    Operation = tslib_1.__decorate([
        Model({
            className: 'Operation',
            collectionName: 'operation',
            fields: ['*'],
            include: []
        })
    ], Operation);
    return Operation;
}(IOperation));
export { Operation };
if (false) {
    /** @type {?} */
    Operation.prototype.operationId;
    /** @type {?} */
    Operation.prototype.operationName;
    /** @type {?} */
    Operation.prototype.methodName;
    /** @type {?} */
    Operation.prototype.modelName;
    /** @type {?} */
    Operation.prototype._createdAt;
    /** @type {?} */
    Operation.prototype.count;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL29wZXJhdGlvbi9vcGVyYXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFRN0IscUNBQVU7OztJQWF6QyxDQUFDO0lBWjBCO1FBQXhCLFVBQVUsQ0FBQyxXQUFXLENBQUM7O2tEQUFxQjtJQUNwQjtRQUF4QixVQUFVLENBQUMsV0FBVyxDQUFDOztvREFBdUI7SUFDdEI7UUFBeEIsVUFBVSxDQUFDLFdBQVcsQ0FBQzs7aURBQW9CO0lBQ25CO1FBQXhCLFVBQVUsQ0FBQyxXQUFXLENBQUM7O2dEQUFtQjtJQUkzQztRQUZDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdkUsVUFBVSxDQUFDLFdBQVcsQ0FBQzswQ0FDWixJQUFJO2lEQUFDO0lBSWpCO1FBRkMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNyRSxVQUFVLENBQUMsV0FBVyxDQUFDOzs0Q0FDVjtJQVpILFNBQVM7UUFOckIsS0FBSyxDQUFDO1lBQ0wsU0FBUyxFQUFFLFdBQVc7WUFDdEIsY0FBYyxFQUFFLFdBQVc7WUFDM0IsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2IsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFDO09BQ1csU0FBUyxDQWFyQjtJQUFELGdCQUFDO0NBQUEsQ0FiOEIsVUFBVSxHQWF4QztTQWJZLFNBQVM7OztJQUNwQixnQ0FBNkM7O0lBQzdDLGtDQUErQzs7SUFDL0MsK0JBQTRDOztJQUM1Qyw4QkFBMkM7O0lBRTNDLCtCQUVpQjs7SUFFakIsMEJBRWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBJT3BlcmF0aW9uLCBGb3JtRmllbGRUeXBlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnT3BlcmF0aW9uJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdvcGVyYXRpb24nLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBPcGVyYXRpb24gZXh0ZW5kcyBJT3BlcmF0aW9uIHtcbiAgQFNlYXJjaGFibGUoJ09wZXJhdGlvbicpIG9wZXJhdGlvbklkOiBzdHJpbmc7XG4gIEBTZWFyY2hhYmxlKCdPcGVyYXRpb24nKSBvcGVyYXRpb25OYW1lOiBzdHJpbmc7XG4gIEBTZWFyY2hhYmxlKCdPcGVyYXRpb24nKSBtZXRob2ROYW1lOiBzdHJpbmc7XG4gIEBTZWFyY2hhYmxlKCdPcGVyYXRpb24nKSBtb2RlbE5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ09wZXJhdGlvbicsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRldGltZSwgcmVhZG9ubHk6IHRydWUgfSlcbiAgQFNlYXJjaGFibGUoJ09wZXJhdGlvbicpXG4gIF9jcmVhdGVkQXQ6IERhdGU7XG5cbiAgQEVkaXRhYmxlKCdPcGVyYXRpb24nLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLCByZWFkb25seTogdHJ1ZSB9KVxuICBAU2VhcmNoYWJsZSgnT3BlcmF0aW9uJylcbiAgY291bnQ6IG51bWJlcjtcbn1cbiJdfQ==