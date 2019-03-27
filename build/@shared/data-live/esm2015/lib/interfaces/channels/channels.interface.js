/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Entity, Model, Editable, Searchable, FORM_FILES_IMAGE_FILTER, getGroupsTransform } from '@shared/data-core';
import { FormFieldType } from '@shared/stencil';
let Channels = class Channels extends Entity {
};
tslib_1.__decorate([
    Editable('Channels', { required: true, type: FormFieldType.text }),
    Searchable('Channels'),
    tslib_1.__metadata("design:type", String)
], Channels.prototype, "name", void 0);
tslib_1.__decorate([
    Editable('Channels', {
        type: FormFieldType.autocomplete,
        filters: FORM_FILES_IMAGE_FILTER,
        forceModal: true,
        hiddenFields: ['mimeType'],
        mode: 'tile',
        pageSize: 20,
        fixedPosition: true,
        collectionName: 'files',
        title: 'BACKGROUND',
        required: false,
        columnDefinition: { name: '_downloadURL' }
    }),
    tslib_1.__metadata("design:type", Object)
], Channels.prototype, "background", void 0);
tslib_1.__decorate([
    Editable('Channels', {
        title: 'GROUPS',
        flex: 100,
        required: true,
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true,
        clearable: false
    }),
    tslib_1.__metadata("design:type", String)
], Channels.prototype, "group", void 0);
tslib_1.__decorate([
    Editable('Channels', {
        type: FormFieldType.autocomplete,
        required: true,
        collectionName: 'user',
        clearable: true,
        multiple: true,
        columnDefinition: { name: 'username' }
    }),
    tslib_1.__metadata("design:type", Array)
], Channels.prototype, "users", void 0);
Channels = tslib_1.__decorate([
    Model({
        className: 'Channels',
        collectionName: 'channels',
        fields: ['*'],
        include: ['users']
    })
], Channels);
export { Channels };
if (false) {
    /** @type {?} */
    Channels.prototype._id;
    /** @type {?} */
    Channels.prototype._acl;
    /** @type {?} */
    Channels.prototype._lmt;
    /** @type {?} */
    Channels.prototype._ect;
    /** @type {?} */
    Channels.prototype.channel;
    /** @type {?} */
    Channels.prototype.name;
    /** @type {?} */
    Channels.prototype.background;
    /** @type {?} */
    Channels.prototype.group;
    /** @type {?} */
    Channels.prototype.users;
    /** @type {?} */
    Channels.prototype.others;
    /** @type {?} */
    Channels.prototype.lastMessage;
    /** @type {?} */
    Channels.prototype.lastMessageAlternate;
    /** @type {?} */
    Channels.prototype.lastMessageDate;
    /** @type {?} */
    Channels.prototype.deleteMessages;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbHMuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1saXZlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvY2hhbm5lbHMvY2hhbm5lbHMuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBYyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pJLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztJQVFuQyxRQUFRLFNBQVIsUUFBUyxTQUFRLE1BQU07Q0E0RG5DLENBQUE7QUFqREM7SUFGQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xFLFVBQVUsQ0FBQyxVQUFVLENBQUM7O3NDQUNWO0FBZWI7SUFiQyxRQUFRLENBQUMsVUFBVSxFQUFFO1FBQ3BCLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUMxQixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxFQUFFO1FBQ1osYUFBYSxFQUFFLElBQUk7UUFDbkIsY0FBYyxFQUFFLE9BQU87UUFDdkIsS0FBSyxFQUFFLFlBQVk7UUFDbkIsUUFBUSxFQUFFLEtBQUs7UUFDZixnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUU7S0FDM0MsQ0FBQzs7NENBQ2M7QUFlaEI7SUFiQyxRQUFRLENBQUMsVUFBVSxFQUFFO1FBQ3BCLEtBQUssRUFBRSxRQUFRO1FBQ2YsSUFBSSxFQUFFLEdBQUc7UUFDVCxRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxjQUFjLEVBQUUsUUFBUTtRQUN4QixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JJLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7UUFDaEMsTUFBTSxFQUFFLElBQUk7UUFDWixZQUFZLEVBQUUsa0JBQWtCO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLEtBQUs7S0FDakIsQ0FBQzs7dUNBQ1k7QUFVZDtJQVJDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDcEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsY0FBYyxFQUFFLE1BQU07UUFDdEIsU0FBUyxFQUFFLElBQUk7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtLQUN2QyxDQUFDO3NDQUNLLEtBQUs7dUNBQU87QUFuRFIsUUFBUTtJQU5wQixLQUFLLENBQUM7UUFDTCxTQUFTLEVBQUUsVUFBVTtRQUNyQixjQUFjLEVBQUUsVUFBVTtRQUMxQixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDYixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDbkIsQ0FBQztHQUNXLFFBQVEsQ0E0RHBCO1NBNURZLFFBQVE7OztJQUVuQix1QkFBWTs7SUFDWix3QkFBVzs7SUFDWCx3QkFBYzs7SUFDZCx3QkFBYzs7SUFFZCwyQkFBZ0I7O0lBRWhCLHdCQUVhOztJQUViLDhCQWFnQjs7SUFFaEIseUJBYWM7O0lBRWQseUJBUW1COztJQUVuQiwwQkFBb0I7O0lBRXBCLCtCQUFpQjs7SUFDakIsd0NBQThCOztJQUM5QixtQ0FBc0I7O0lBRXRCLGtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eSwgSUFjbCwgVXNlciwgTW9kZWwsIEVkaXRhYmxlLCBTZWFyY2hhYmxlLCBGT1JNX0ZJTEVTX0lNQUdFX0ZJTFRFUiwgZ2V0R3JvdXBzVHJhbnNmb3JtIH0gZnJvbSAnQHNoYXJlZC9kYXRhLWNvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0NoYW5uZWxzJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdjaGFubmVscycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFsndXNlcnMnXVxufSlcbmV4cG9ydCBjbGFzcyBDaGFubmVscyBleHRlbmRzIEVudGl0eSB7XG4gIC8vIGV4cG9ydCBjbGFzcyBDaGFubmVscyBpbXBsZW1lbnRzIElFbnRpdHkge1xuICBfaWQ6IHN0cmluZztcbiAgX2FjbDogSUFjbDtcbiAgX2xtdD86IHN0cmluZztcbiAgX2VjdD86IHN0cmluZztcblxuICBjaGFubmVsOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDaGFubmVscycsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBAU2VhcmNoYWJsZSgnQ2hhbm5lbHMnKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDaGFubmVscycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBmaWx0ZXJzOiBGT1JNX0ZJTEVTX0lNQUdFX0ZJTFRFUixcbiAgICBmb3JjZU1vZGFsOiB0cnVlLFxuICAgIGhpZGRlbkZpZWxkczogWydtaW1lVHlwZSddLFxuICAgIG1vZGU6ICd0aWxlJyxcbiAgICBwYWdlU2l6ZTogMjAsXG4gICAgZml4ZWRQb3NpdGlvbjogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2ZpbGVzJyxcbiAgICB0aXRsZTogJ0JBQ0tHUk9VTkQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdfZG93bmxvYWRVUkwnIH1cbiAgfSlcbiAgYmFja2dyb3VuZDogYW55O1xuXG4gIEBFZGl0YWJsZSgnQ2hhbm5lbHMnLCB7XG4gICAgdGl0bGU6ICdHUk9VUFMnLFxuICAgIGZsZXg6IDEwMCxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2dyb3VwcycsXG4gICAgZmlsdGVyczogW1t7IGZpZWxkOiAnaXNSb2xlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmVxJyB9LCB2YWx1ZTogdHJ1ZSB9LCB7IGZpZWxkOiAndHlwZScsIG9wZXJhdG9yOiB7IF9pZDogJ25pbicgfSwgdmFsdWU6IFsncGxhbiddIH1dXSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnaXNSb2xlJywgJ3R5cGUnXSxcbiAgICBpZE9ubHk6IHRydWUsXG4gICAgbWFwVHJhbnNmb3JtOiBnZXRHcm91cHNUcmFuc2Zvcm0sXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiBmYWxzZVxuICB9KVxuICBncm91cDogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnQ2hhbm5lbHMnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICd1c2VyJyxcbiAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAndXNlcm5hbWUnIH1cbiAgfSlcbiAgdXNlcnM6IEFycmF5PFVzZXI+O1xuXG4gIG90aGVyczogQXJyYXk8VXNlcj47XG5cbiAgbGFzdE1lc3NhZ2U6IGFueTtcbiAgbGFzdE1lc3NhZ2VBbHRlcm5hdGU6IGJvb2xlYW47XG4gIGxhc3RNZXNzYWdlRGF0ZT86IGFueTtcblxuICBkZWxldGVNZXNzYWdlczogQXJyYXk8YW55Pjtcbn1cbiJdfQ==