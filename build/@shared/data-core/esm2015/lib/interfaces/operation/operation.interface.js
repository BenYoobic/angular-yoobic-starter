/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { IOperation, FormFieldType } from '@shared/stencil';
let Operation = class Operation extends IOperation {
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL29wZXJhdGlvbi9vcGVyYXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztJQVEvQyxTQUFTLFNBQVQsU0FBVSxTQUFRLFVBQVU7Q0FheEMsQ0FBQTtBQVowQjtJQUF4QixVQUFVLENBQUMsV0FBVyxDQUFDOzs4Q0FBcUI7QUFDcEI7SUFBeEIsVUFBVSxDQUFDLFdBQVcsQ0FBQzs7Z0RBQXVCO0FBQ3RCO0lBQXhCLFVBQVUsQ0FBQyxXQUFXLENBQUM7OzZDQUFvQjtBQUNuQjtJQUF4QixVQUFVLENBQUMsV0FBVyxDQUFDOzs0Q0FBbUI7QUFJM0M7SUFGQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZFLFVBQVUsQ0FBQyxXQUFXLENBQUM7c0NBQ1osSUFBSTs2Q0FBQztBQUlqQjtJQUZDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDckUsVUFBVSxDQUFDLFdBQVcsQ0FBQzs7d0NBQ1Y7QUFaSCxTQUFTO0lBTnJCLEtBQUssQ0FBQztRQUNMLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLGNBQWMsRUFBRSxXQUFXO1FBQzNCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNiLE9BQU8sRUFBRSxFQUFFO0tBQ1osQ0FBQztHQUNXLFNBQVMsQ0FhckI7U0FiWSxTQUFTOzs7SUFDcEIsZ0NBQTZDOztJQUM3QyxrQ0FBK0M7O0lBQy9DLCtCQUE0Qzs7SUFDNUMsOEJBQTJDOztJQUUzQywrQkFFaUI7O0lBRWpCLDBCQUVjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgSU9wZXJhdGlvbiwgRm9ybUZpZWxkVHlwZSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ09wZXJhdGlvbicsXG4gIGNvbGxlY3Rpb25OYW1lOiAnb3BlcmF0aW9uJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogW11cbn0pXG5leHBvcnQgY2xhc3MgT3BlcmF0aW9uIGV4dGVuZHMgSU9wZXJhdGlvbiB7XG4gIEBTZWFyY2hhYmxlKCdPcGVyYXRpb24nKSBvcGVyYXRpb25JZDogc3RyaW5nO1xuICBAU2VhcmNoYWJsZSgnT3BlcmF0aW9uJykgb3BlcmF0aW9uTmFtZTogc3RyaW5nO1xuICBAU2VhcmNoYWJsZSgnT3BlcmF0aW9uJykgbWV0aG9kTmFtZTogc3RyaW5nO1xuICBAU2VhcmNoYWJsZSgnT3BlcmF0aW9uJykgbW9kZWxOYW1lOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdPcGVyYXRpb24nLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUsIHJlYWRvbmx5OiB0cnVlIH0pXG4gIEBTZWFyY2hhYmxlKCdPcGVyYXRpb24nKVxuICBfY3JlYXRlZEF0OiBEYXRlO1xuXG4gIEBFZGl0YWJsZSgnT3BlcmF0aW9uJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlciwgcmVhZG9ubHk6IHRydWUgfSlcbiAgQFNlYXJjaGFibGUoJ09wZXJhdGlvbicpXG4gIGNvdW50OiBudW1iZXI7XG59XG4iXX0=