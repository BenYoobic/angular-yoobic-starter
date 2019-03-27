/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IWorkplaceGroups, IWorkplacePost } from '@shared/stencil';
var WorkplaceGroups = /** @class */ (function (_super) {
    tslib_1.__extends(WorkplaceGroups, _super);
    function WorkplaceGroups() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text }),
        tslib_1.__metadata("design:type", String)
    ], WorkplaceGroups.prototype, "name", void 0);
    tslib_1.__decorate([
        Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text }),
        tslib_1.__metadata("design:type", String)
    ], WorkplaceGroups.prototype, "icon", void 0);
    tslib_1.__decorate([
        Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text }),
        tslib_1.__metadata("design:type", String)
    ], WorkplaceGroups.prototype, "cover", void 0);
    tslib_1.__decorate([
        Editable('WorkplaceGroups', { readonly: true, type: FormFieldType.text }),
        tslib_1.__metadata("design:type", String)
    ], WorkplaceGroups.prototype, "description", void 0);
    WorkplaceGroups = tslib_1.__decorate([
        Model({
            className: 'WorkplaceGroups',
            collectionName: 'workplace_groups',
            fields: ['*'],
            include: []
        })
    ], WorkplaceGroups);
    return WorkplaceGroups;
}(IWorkplaceGroups));
export { WorkplaceGroups };
if (false) {
    /** @type {?} */
    WorkplaceGroups.prototype.name;
    /** @type {?} */
    WorkplaceGroups.prototype.icon;
    /** @type {?} */
    WorkplaceGroups.prototype.cover;
    /** @type {?} */
    WorkplaceGroups.prototype.description;
}
var WorkplacePost = /** @class */ (function (_super) {
    tslib_1.__extends(WorkplacePost, _super);
    function WorkplacePost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('WorkplacePost', { type: FormFieldType.textarea, required: true }),
        tslib_1.__metadata("design:type", String)
    ], WorkplacePost.prototype, "comments", void 0);
    tslib_1.__decorate([
        Editable('WorkplacePost', {
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            collectionName: 'workplace_groups',
            multiple: true,
            required: true
        }),
        tslib_1.__metadata("design:type", Object)
    ], WorkplacePost.prototype, "workplaceGroups", void 0);
    WorkplacePost = tslib_1.__decorate([
        Model({ className: 'WorkplacePost' })
    ], WorkplacePost);
    return WorkplacePost;
}(IWorkplacePost));
export { WorkplacePost };
if (false) {
    /** @type {?} */
    WorkplacePost.prototype.comments;
    /** @type {?} */
    WorkplacePost.prototype.workplaceGroups;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3BsYWNlLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL3dvcmtwbGFjZS93b3JrcGxhY2UuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQVE3QywyQ0FBZ0I7OztJQVlyRCxDQUFDO0lBVkM7UUFEQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O2lEQUM3RDtJQUdiO1FBREMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOztpREFDN0Q7SUFHYjtRQURDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7a0RBQzVEO0lBR2Q7UUFEQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O3dEQUN0RDtJQVhULGVBQWU7UUFOM0IsS0FBSyxDQUFDO1lBQ0wsU0FBUyxFQUFFLGlCQUFpQjtZQUM1QixjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNiLE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztPQUNXLGVBQWUsQ0FZM0I7SUFBRCxzQkFBQztDQUFBLENBWm9DLGdCQUFnQixHQVlwRDtTQVpZLGVBQWU7OztJQUMxQiwrQkFDYTs7SUFFYiwrQkFDYTs7SUFFYixnQ0FDYzs7SUFFZCxzQ0FDb0I7OztJQUlhLHlDQUFjOzs7SUFZakQsQ0FBQztJQVZDO1FBREMsUUFBUSxDQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bURBQzNEO0lBU2pCO1FBUEMsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUN6QixLQUFLLEVBQUUsUUFBUTtZQUNmLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtZQUNoQyxjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDOzswREFDbUI7SUFYVixhQUFhO1FBRHpCLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsQ0FBQztPQUN6QixhQUFhLENBWXpCO0lBQUQsb0JBQUM7Q0FBQSxDQVprQyxjQUFjLEdBWWhEO1NBWlksYUFBYTs7O0lBQ3hCLGlDQUNpQjs7SUFFakIsd0NBT3FCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElXb3JrcGxhY2VHcm91cHMsIElXb3JrcGxhY2VQb3N0IH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnV29ya3BsYWNlR3JvdXBzJyxcbiAgY29sbGVjdGlvbk5hbWU6ICd3b3JrcGxhY2VfZ3JvdXBzJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogW11cbn0pXG5leHBvcnQgY2xhc3MgV29ya3BsYWNlR3JvdXBzIGV4dGVuZHMgSVdvcmtwbGFjZUdyb3VwcyB7XG4gIEBFZGl0YWJsZSgnV29ya3BsYWNlR3JvdXBzJywgeyByZWFkb25seTogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIG5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1dvcmtwbGFjZUdyb3VwcycsIHsgcmVhZG9ubHk6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBpY29uOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdXb3JrcGxhY2VHcm91cHMnLCB7IHJlYWRvbmx5OiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgY292ZXI6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1dvcmtwbGFjZUdyb3VwcycsIHsgcmVhZG9ubHk6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG5ATW9kZWwoeyBjbGFzc05hbWU6ICdXb3JrcGxhY2VQb3N0JyB9KVxuZXhwb3J0IGNsYXNzIFdvcmtwbGFjZVBvc3QgZXh0ZW5kcyBJV29ya3BsYWNlUG9zdCB7XG4gIEBFZGl0YWJsZSgnV29ya3BsYWNlUG9zdCcsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSwgcmVxdWlyZWQ6IHRydWUgfSlcbiAgY29tbWVudHM6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1dvcmtwbGFjZVBvc3QnLCB7XG4gICAgdGl0bGU6ICdHUk9VUFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnd29ya3BsYWNlX2dyb3VwcycsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgcmVxdWlyZWQ6IHRydWVcbiAgfSlcbiAgd29ya3BsYWNlR3JvdXBzOiBhbnk7XG59XG4iXX0=