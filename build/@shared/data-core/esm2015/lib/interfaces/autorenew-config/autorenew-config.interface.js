/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { FormFieldType, IAutorenewConfig } from '@shared/stencil';
import { MissionDescription } from '../mission-description/mission-description.interface';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { range } from 'lodash-es';
let AutorenewConfig = class AutorenewConfig extends IAutorenewConfig {
};
tslib_1.__decorate([
    Editable('AutorenewConfig', { required: true, type: FormFieldType.text }),
    Searchable('AutorenewConfig'),
    tslib_1.__metadata("design:type", String)
], AutorenewConfig.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('AutorenewConfig', {
        required: true,
        title: 'PREFIX',
        type: FormFieldType.text,
        flex: 50
    }),
    Searchable('AutorenewConfig'),
    tslib_1.__metadata("design:type", String)
], AutorenewConfig.prototype, "prefix_title", void 0);
tslib_1.__decorate([
    Editable('AutorenewConfig', {
        type: FormFieldType.autocomplete,
        translate: true,
        values: range(1, 5),
        flex: 50,
        clearable: true,
        icon: 'yo-flag'
    }),
    tslib_1.__metadata("design:type", Number)
], AutorenewConfig.prototype, "priority", void 0);
tslib_1.__decorate([
    Editable('AutorenewConfig', {
        type: FormFieldType.autocomplete,
        title: 'SOURCE',
        collectionName: 'missiondescriptions',
        required: false,
        columnDefinition: { name: 'title' },
        icon: 'yo-list2',
        filterable: false,
        sortable: false,
        filters: [[{ field: 'archived', operator: { _id: 'neq' }, value: true }]],
        hiddenFields: ['archived']
    }),
    tslib_1.__metadata("design:type", MissionDescription)
], AutorenewConfig.prototype, "descriptionSource", void 0);
tslib_1.__decorate([
    Editable('AutorenewConfig', {
        type: FormFieldType.autocomplete,
        title: 'TARGET',
        collectionName: 'missiondescriptions',
        required: false,
        columnDefinition: { name: 'title' },
        icon: 'yo-list2',
        filterable: false,
        sortable: false,
        filters: [[{ field: 'archived', operator: { _id: 'neq' }, value: true }]],
        hiddenFields: ['archived']
    }),
    tslib_1.__metadata("design:type", MissionDescription)
], AutorenewConfig.prototype, "descriptionTarget", void 0);
tslib_1.__decorate([
    Editable('AutorenewConfig', { type: FormFieldType.toggle }),
    Searchable('AutorenewConfig'),
    tslib_1.__metadata("design:type", Boolean)
], AutorenewConfig.prototype, "active", void 0);
AutorenewConfig = tslib_1.__decorate([
    Model({
        className: 'AutorenewConfig',
        collectionName: 'autorenewConfig',
        fields: ['*'],
        include: ['descriptionSource', 'descriptionTarget']
    })
], AutorenewConfig);
export { AutorenewConfig };
if (false) {
    /** @type {?} */
    AutorenewConfig.prototype.title;
    /** @type {?} */
    AutorenewConfig.prototype.prefix_title;
    /** @type {?} */
    AutorenewConfig.prototype.priority;
    /** @type {?} */
    AutorenewConfig.prototype.descriptionSource;
    /** @type {?} */
    AutorenewConfig.prototype.descriptionTarget;
    /** @type {?} */
    AutorenewConfig.prototype.active;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3JlbmV3LWNvbmZpZy5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9hdXRvcmVuZXctY29uZmlnL2F1dG9yZW5ldy1jb25maWcuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDOUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7SUFRckIsZUFBZSxTQUFmLGVBQWdCLFNBQVEsZ0JBQWdCO0NBdURwRCxDQUFBO0FBcERDO0lBRkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQzs7OENBQ2hCO0FBU2Q7SUFQQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDM0IsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtRQUN4QixJQUFJLEVBQUUsRUFBRTtLQUNULENBQUM7SUFDRCxVQUFVLENBQUMsaUJBQWlCLENBQUM7O3FEQUNUO0FBVXJCO0lBUkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzNCLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxJQUFJO1FBQ2YsSUFBSSxFQUFFLFNBQVM7S0FDaEIsQ0FBQzs7aURBQ2dCO0FBY2xCO0lBWkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzNCLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxLQUFLLEVBQUUsUUFBUTtRQUNmLGNBQWMsRUFBRSxxQkFBcUI7UUFDckMsUUFBUSxFQUFFLEtBQUs7UUFDZixnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7UUFDbkMsSUFBSSxFQUFFLFVBQVU7UUFDaEIsVUFBVSxFQUFFLEtBQUs7UUFDakIsUUFBUSxFQUFFLEtBQUs7UUFDZixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekUsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDO0tBQzNCLENBQUM7c0NBQ2lCLGtCQUFrQjswREFBQztBQWN0QztJQVpDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMzQixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsS0FBSyxFQUFFLFFBQVE7UUFDZixjQUFjLEVBQUUscUJBQXFCO1FBQ3JDLFFBQVEsRUFBRSxLQUFLO1FBQ2YsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1FBQ25DLElBQUksRUFBRSxVQUFVO1FBQ2hCLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztLQUMzQixDQUFDO3NDQUNpQixrQkFBa0I7MERBQUM7QUFJdEM7SUFGQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzNELFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQzs7K0NBQ2Q7QUF0REwsZUFBZTtJQU4zQixLQUFLLENBQUM7UUFDTCxTQUFTLEVBQUUsaUJBQWlCO1FBQzVCLGNBQWMsRUFBRSxpQkFBaUI7UUFDakMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2IsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUM7S0FDcEQsQ0FBQztHQUNXLGVBQWUsQ0F1RDNCO1NBdkRZLGVBQWU7OztJQUMxQixnQ0FFYzs7SUFFZCx1Q0FPcUI7O0lBRXJCLG1DQVFrQjs7SUFFbEIsNENBWXNDOztJQUV0Qyw0Q0FZc0M7O0lBRXRDLGlDQUVnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSUF1dG9yZW5ld0NvbmZpZyB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBNaXNzaW9uRGVzY3JpcHRpb24gfSBmcm9tICcuLi9taXNzaW9uLWRlc2NyaXB0aW9uL21pc3Npb24tZGVzY3JpcHRpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5cbmltcG9ydCB7IHJhbmdlIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnQXV0b3JlbmV3Q29uZmlnJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdhdXRvcmVuZXdDb25maWcnLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbJ2Rlc2NyaXB0aW9uU291cmNlJywgJ2Rlc2NyaXB0aW9uVGFyZ2V0J11cbn0pXG5leHBvcnQgY2xhc3MgQXV0b3JlbmV3Q29uZmlnIGV4dGVuZHMgSUF1dG9yZW5ld0NvbmZpZyB7XG4gIEBFZGl0YWJsZSgnQXV0b3JlbmV3Q29uZmlnJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0IH0pXG4gIEBTZWFyY2hhYmxlKCdBdXRvcmVuZXdDb25maWcnKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQXV0b3JlbmV3Q29uZmlnJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHRpdGxlOiAnUFJFRklYJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsXG4gICAgZmxleDogNTBcbiAgfSlcbiAgQFNlYXJjaGFibGUoJ0F1dG9yZW5ld0NvbmZpZycpXG4gIHByZWZpeF90aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQXV0b3JlbmV3Q29uZmlnJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHRyYW5zbGF0ZTogdHJ1ZSxcbiAgICB2YWx1ZXM6IHJhbmdlKDEsIDUpLFxuICAgIGZsZXg6IDUwLFxuICAgIGNsZWFyYWJsZTogdHJ1ZSxcbiAgICBpY29uOiAneW8tZmxhZydcbiAgfSlcbiAgcHJpb3JpdHk/OiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdBdXRvcmVuZXdDb25maWcnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGl0bGU6ICdTT1VSQ0UnLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnbWlzc2lvbmRlc2NyaXB0aW9ucycsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGNvbHVtbkRlZmluaXRpb246IHsgbmFtZTogJ3RpdGxlJyB9LFxuICAgIGljb246ICd5by1saXN0MicsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgc29ydGFibGU6IGZhbHNlLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2FyY2hpdmVkJywgb3BlcmF0b3I6IHsgX2lkOiAnbmVxJyB9LCB2YWx1ZTogdHJ1ZSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2FyY2hpdmVkJ11cbiAgfSlcbiAgZGVzY3JpcHRpb25Tb3VyY2U6IE1pc3Npb25EZXNjcmlwdGlvbjtcblxuICBARWRpdGFibGUoJ0F1dG9yZW5ld0NvbmZpZycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0aXRsZTogJ1RBUkdFVCcsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdtaXNzaW9uZGVzY3JpcHRpb25zJyxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAndGl0bGUnIH0sXG4gICAgaWNvbjogJ3lvLWxpc3QyJyxcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICBzb3J0YWJsZTogZmFsc2UsXG4gICAgZmlsdGVyczogW1t7IGZpZWxkOiAnYXJjaGl2ZWQnLCBvcGVyYXRvcjogeyBfaWQ6ICduZXEnIH0sIHZhbHVlOiB0cnVlIH1dXSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnYXJjaGl2ZWQnXVxuICB9KVxuICBkZXNjcmlwdGlvblRhcmdldDogTWlzc2lvbkRlc2NyaXB0aW9uO1xuXG4gIEBFZGl0YWJsZSgnQXV0b3JlbmV3Q29uZmlnJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSB9KVxuICBAU2VhcmNoYWJsZSgnQXV0b3JlbmV3Q29uZmlnJylcbiAgYWN0aXZlOiBib29sZWFuO1xufVxuIl19