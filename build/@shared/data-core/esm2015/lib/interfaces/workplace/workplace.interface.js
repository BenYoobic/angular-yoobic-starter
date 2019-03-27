/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IWorkplaceGroups, IWorkplacePost } from '@shared/stencil';
let WorkplaceGroups = class WorkplaceGroups extends IWorkplaceGroups {
};
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
let WorkplacePost = class WorkplacePost extends IWorkplacePost {
};
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
export { WorkplacePost };
if (false) {
    /** @type {?} */
    WorkplacePost.prototype.comments;
    /** @type {?} */
    WorkplacePost.prototype.workplaceGroups;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3BsYWNlLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL3dvcmtwbGFjZS93b3JrcGxhY2UuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0lBUXJFLGVBQWUsU0FBZixlQUFnQixTQUFRLGdCQUFnQjtDQVlwRCxDQUFBO0FBVkM7SUFEQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7OzZDQUM3RDtBQUdiO0lBREMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDOzs2Q0FDN0Q7QUFHYjtJQURDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7OENBQzVEO0FBR2Q7SUFEQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7O29EQUN0RDtBQVhULGVBQWU7SUFOM0IsS0FBSyxDQUFDO1FBQ0wsU0FBUyxFQUFFLGlCQUFpQjtRQUM1QixjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUNiLE9BQU8sRUFBRSxFQUFFO0tBQ1osQ0FBQztHQUNXLGVBQWUsQ0FZM0I7U0FaWSxlQUFlOzs7SUFDMUIsK0JBQ2E7O0lBRWIsK0JBQ2E7O0lBRWIsZ0NBQ2M7O0lBRWQsc0NBQ29COztJQUlULGFBQWEsU0FBYixhQUFjLFNBQVEsY0FBYztDQVloRCxDQUFBO0FBVkM7SUFEQyxRQUFRLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzsrQ0FDM0Q7QUFTakI7SUFQQyxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3pCLEtBQUssRUFBRSxRQUFRO1FBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLGNBQWMsRUFBRSxrQkFBa0I7UUFDbEMsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7O3NEQUNtQjtBQVhWLGFBQWE7SUFEekIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxDQUFDO0dBQ3pCLGFBQWEsQ0FZekI7U0FaWSxhQUFhOzs7SUFDeEIsaUNBQ2lCOztJQUVqQix3Q0FPcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSVdvcmtwbGFjZUdyb3VwcywgSVdvcmtwbGFjZVBvc3QgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdXb3JrcGxhY2VHcm91cHMnLFxuICBjb2xsZWN0aW9uTmFtZTogJ3dvcmtwbGFjZV9ncm91cHMnLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBXb3JrcGxhY2VHcm91cHMgZXh0ZW5kcyBJV29ya3BsYWNlR3JvdXBzIHtcbiAgQEVkaXRhYmxlKCdXb3JrcGxhY2VHcm91cHMnLCB7IHJlYWRvbmx5OiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnV29ya3BsYWNlR3JvdXBzJywgeyByZWFkb25seTogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIGljb246IHN0cmluZztcblxuICBARWRpdGFibGUoJ1dvcmtwbGFjZUdyb3VwcycsIHsgcmVhZG9ubHk6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBjb3Zlcjogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnV29ya3BsYWNlR3JvdXBzJywgeyByZWFkb25seTogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5cbkBNb2RlbCh7IGNsYXNzTmFtZTogJ1dvcmtwbGFjZVBvc3QnIH0pXG5leHBvcnQgY2xhc3MgV29ya3BsYWNlUG9zdCBleHRlbmRzIElXb3JrcGxhY2VQb3N0IHtcbiAgQEVkaXRhYmxlKCdXb3JrcGxhY2VQb3N0JywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLCByZXF1aXJlZDogdHJ1ZSB9KVxuICBjb21tZW50czogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnV29ya3BsYWNlUG9zdCcsIHtcbiAgICB0aXRsZTogJ0dST1VQUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICd3b3JrcGxhY2VfZ3JvdXBzJyxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9KVxuICB3b3JrcGxhY2VHcm91cHM6IGFueTtcbn1cbiJdfQ==