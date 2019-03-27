/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FormFieldType, ITagGroup } from '@shared/stencil';
import { Editable } from '../../decorators/editable/editable.decorator';
import { getGroupsTransform } from '../condition/condition.interface';
let TagGroup = class TagGroup extends ITagGroup {
};
tslib_1.__decorate([
    Editable('TagGroup', { required: true, type: FormFieldType.text }),
    Searchable('TagGroup'),
    tslib_1.__metadata("design:type", String)
], TagGroup.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('TagGroup', {
        title: 'LOCATIONTAGS',
        required: true,
        type: FormFieldType.autocomplete,
        tag: true,
        collectionName: 'locations',
        multiple: true,
        subQuery: { field: 'locationRef', values: '_id' },
        fixedPosition: true
    }),
    tslib_1.__metadata("design:type", Array)
], TagGroup.prototype, "tags", void 0);
tslib_1.__decorate([
    Editable('TagGroup', {
        title: 'GROUPS',
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true,
        clearable: false,
        required: true,
        fixedPosition: true
    }),
    tslib_1.__metadata("design:type", Object)
], TagGroup.prototype, "group", void 0);
TagGroup = tslib_1.__decorate([
    Model({
        className: 'TagGroup',
        collectionName: 'tagGroups',
        fields: ['*'],
        include: []
    })
], TagGroup);
export { TagGroup };
if (false) {
    /** @type {?} */
    TagGroup.prototype.title;
    /** @type {?} */
    TagGroup.prototype.tags;
    /** @type {?} */
    TagGroup.prototype.group;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWdyb3VwLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL3RhZy1ncm91cC90YWctZ3JvdXAuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztJQVF6RCxRQUFRLFNBQVIsUUFBUyxTQUFRLFNBQVM7Q0ErQnRDLENBQUE7QUE1QkM7SUFGQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xFLFVBQVUsQ0FBQyxVQUFVLENBQUM7O3VDQUNUO0FBWWQ7SUFWQyxRQUFRLENBQUMsVUFBVSxFQUFFO1FBQ3BCLEtBQUssRUFBRSxjQUFjO1FBQ3JCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLEdBQUcsRUFBRSxJQUFJO1FBQ1QsY0FBYyxFQUFFLFdBQVc7UUFDM0IsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7UUFDakQsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztzQ0FDSSxLQUFLO3NDQUFTO0FBZXBCO0lBYkMsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNwQixLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxjQUFjLEVBQUUsUUFBUTtRQUN4QixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JJLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7UUFDaEMsTUFBTSxFQUFFLElBQUk7UUFDWixZQUFZLEVBQUUsa0JBQWtCO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLEtBQUs7UUFDaEIsUUFBUSxFQUFFLElBQUk7UUFDZCxhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDOzt1Q0FDNEI7QUE5Qm5CLFFBQVE7SUFOcEIsS0FBSyxDQUFDO1FBQ0wsU0FBUyxFQUFFLFVBQVU7UUFDckIsY0FBYyxFQUFFLFdBQVc7UUFDM0IsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2IsT0FBTyxFQUFFLEVBQUU7S0FDWixDQUFDO0dBQ1csUUFBUSxDQStCcEI7U0EvQlksUUFBUTs7O0lBQ25CLHlCQUVjOztJQUVkLHdCQVVvQjs7SUFFcEIseUJBYThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElUYWdHcm91cCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IGdldEdyb3Vwc1RyYW5zZm9ybSB9IGZyb20gJy4uL2NvbmRpdGlvbi9jb25kaXRpb24uaW50ZXJmYWNlJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnVGFnR3JvdXAnLFxuICBjb2xsZWN0aW9uTmFtZTogJ3RhZ0dyb3VwcycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFRhZ0dyb3VwIGV4dGVuZHMgSVRhZ0dyb3VwIHtcbiAgQEVkaXRhYmxlKCdUYWdHcm91cCcsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBAU2VhcmNoYWJsZSgnVGFnR3JvdXAnKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnVGFnR3JvdXAnLCB7XG4gICAgdGl0bGU6ICdMT0NBVElPTlRBR1MnLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRhZzogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2xvY2F0aW9ucycsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgc3ViUXVlcnk6IHsgZmllbGQ6ICdsb2NhdGlvblJlZicsIHZhbHVlczogJ19pZCcgfSxcbiAgICBmaXhlZFBvc2l0aW9uOiB0cnVlXG4gIH0pXG4gIHRhZ3M6IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdUYWdHcm91cCcsIHtcbiAgICB0aXRsZTogJ0dST1VQUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdncm91cHMnLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSwgeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduaW4nIH0sIHZhbHVlOiBbJ3BsYW4nXSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2lzUm9sZScsICd0eXBlJ10sXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZml4ZWRQb3NpdGlvbjogdHJ1ZVxuICB9KVxuICBncm91cDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPjtcbn1cbiJdfQ==