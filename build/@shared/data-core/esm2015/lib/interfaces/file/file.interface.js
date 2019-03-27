/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { getGroupsTransform, ROLES_CONDITIONS } from '../condition/condition.interface';
import { FormFieldType, IFile } from '@shared/stencil';
import { Tenant } from '../tenant/tenant.interface';
/**
 * @param {?} doc
 * @param {?} data
 * @return {?}
 */
export function onUrlChange(doc, data) {
    if (doc && doc.name) {
        data._filename = doc.name;
    }
    if (doc && doc.size) {
        data.size = doc.size;
    }
    if (doc && doc.type) {
        data.mimeType = doc.type;
    }
}
let File = class File extends IFile {
};
tslib_1.__decorate([
    Editable('File', {
        name: '_ect',
        title: 'CREATIONDATE',
        type: FormFieldType.date,
        readonly: true,
        sortable: true,
        exportOrder: 21,
        filterableAdvanced: true
    }),
    tslib_1.__metadata("design:type", Object)
], File.prototype, "_ect", void 0);
tslib_1.__decorate([
    Editable('File', {
        type: FormFieldType.documentuploader,
        filterable: false,
        required: true,
        title: 'DOCUMENT',
        columnDefinition: { width: 52 },
        onChange: onUrlChange
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "_downloadURL", void 0);
tslib_1.__decorate([
    Editable('File', { title: 'TITLE', required: true, type: FormFieldType.text, sortable: true }),
    Searchable('File'),
    tslib_1.__metadata("design:type", String)
], File.prototype, "_filename", void 0);
tslib_1.__decorate([
    Editable('File', { visible: false, type: FormFieldType.number, sortable: true }),
    tslib_1.__metadata("design:type", Number)
], File.prototype, "size", void 0);
tslib_1.__decorate([
    Editable('File', { visible: false, type: FormFieldType.autocomplete, filterable: true }),
    Searchable('File'),
    tslib_1.__metadata("design:type", String)
], File.prototype, "mimeType", void 0);
tslib_1.__decorate([
    Editable('File', { type: FormFieldType.toggle, columnDefinition: { width: 80 } }),
    tslib_1.__metadata("design:type", Boolean)
], File.prototype, "hideMobile", void 0);
tslib_1.__decorate([
    Editable('File', {
        required: true,
        name: 'group',
        columnDefinition: { name: 'group', forceName: true },
        title: 'GROUPS',
        type: FormFieldType.autocomplete,
        collectionName: 'groups',
        filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
        hiddenFields: ['isRole', 'type'],
        idOnly: true,
        mapTransform: getGroupsTransform,
        multiple: true,
        clearable: false
    }),
    tslib_1.__metadata("design:type", Object)
], File.prototype, "group", void 0);
tslib_1.__decorate([
    Editable('File', {
        type: FormFieldType.autocomplete,
        tag: true,
        allowCustomTag: true,
        collectionName: 'files',
        multiple: true,
        icon: 'yo-flag',
        subQuery: { field: 'fileRef', values: '_id' }
    }),
    Searchable('File'),
    tslib_1.__metadata("design:type", Array)
], File.prototype, "tags", void 0);
tslib_1.__decorate([
    Editable('File', {
        required: true,
        title: 'TENANT',
        type: FormFieldType.autocomplete,
        collectionName: 'tenants',
        columnDefinition: { name: 'name' },
        multiple: false,
        filterable: true,
        condition: [ROLES_CONDITIONS.isAdmin]
    }),
    tslib_1.__metadata("design:type", Tenant)
], File.prototype, "_tenant", void 0);
File = tslib_1.__decorate([
    Model({
        className: 'File',
        collectionName: 'files',
        fields: ['*'],
        include: ['container'],
        icon: 'yo-file'
    })
], File);
export { File };
if (false) {
    /** @type {?} */
    File.prototype._ect;
    /** @type {?} */
    File.prototype._downloadURL;
    /** @type {?} */
    File.prototype._filename;
    /** @type {?} */
    File.prototype.size;
    /** @type {?} */
    File.prototype.mimeType;
    /** @type {?} */
    File.prototype.hideMobile;
    /** @type {?} */
    File.prototype.group;
    /** @type {?} */
    File.prototype.tags;
    /** @type {?} */
    File.prototype._tenant;
    /** @type {?} */
    File.prototype._tenantRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9maWxlL2ZpbGUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFeEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7OztBQUVwRCxNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJO0lBQ25DLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0tBQzNCO0lBQ0QsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7S0FDdEI7SUFDRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztLQUMxQjtBQUNILENBQUM7SUFTWSxJQUFJLFNBQUosSUFBSyxTQUFRLEtBQUs7Q0E0RTlCLENBQUE7QUFsRUM7SUFUQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ2hCLElBQUksRUFBRSxNQUFNO1FBQ1osS0FBSyxFQUFFLGNBQWM7UUFDckIsSUFBSSxFQUFFLGFBQWEs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LGFBQWEsQ0FBQyxZQUFZO1FBQ2hDLGNBQWMsRUFBRSxTQUFTO1FBQ3pCLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNsQyxRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztLQUN0QyxDQUFDO3NDQUNPLE1BQU07cUNBQUM7QUExRUwsSUFBSTtJQVBoQixLQUFLLENBQUM7UUFDTCxTQUFTLEVBQUUsTUFBTTtRQUNqQixjQUFjLEVBQUUsT0FBTztRQUN2QixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDYixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDdEIsSUFBSSxFQUFFLFNBQVM7S0FDaEIsQ0FBQztHQUNXLElBQUksQ0E0RWhCO1NBNUVZLElBQUk7OztJQUNmLG9CQVNXOztJQUVYLDRCQVFxQjs7SUFFckIseUJBRWtCOztJQUVsQixvQkFDYTs7SUFFYix3QkFFaUI7O0lBRWpCLDBCQUNvQjs7SUFFcEIscUJBY1c7O0lBRVgsb0JBVXFCOztJQUVyQix1QkFVZ0I7O0lBQ2hCLDBCQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IGdldEdyb3Vwc1RyYW5zZm9ybSwgUk9MRVNfQ09ORElUSU9OUyB9IGZyb20gJy4uL2NvbmRpdGlvbi9jb25kaXRpb24uaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSUZpbGUgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi4vdGVuYW50L3RlbmFudC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gb25VcmxDaGFuZ2UoZG9jLCBkYXRhKSB7XG4gIGlmIChkb2MgJiYgZG9jLm5hbWUpIHtcbiAgICBkYXRhLl9maWxlbmFtZSA9IGRvYy5uYW1lO1xuICB9XG4gIGlmIChkb2MgJiYgZG9jLnNpemUpIHtcbiAgICBkYXRhLnNpemUgPSBkb2Muc2l6ZTtcbiAgfVxuICBpZiAoZG9jICYmIGRvYy50eXBlKSB7XG4gICAgZGF0YS5taW1lVHlwZSA9IGRvYy50eXBlO1xuICB9XG59XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0ZpbGUnLFxuICBjb2xsZWN0aW9uTmFtZTogJ2ZpbGVzJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogWydjb250YWluZXInXSxcbiAgaWNvbjogJ3lvLWZpbGUnXG59KVxuZXhwb3J0IGNsYXNzIEZpbGUgZXh0ZW5kcyBJRmlsZSB7XG4gIEBFZGl0YWJsZSgnRmlsZScsIHtcbiAgICBuYW1lOiAnX2VjdCcsXG4gICAgdGl0bGU6ICdDUkVBVElPTkRBVEUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZSxcbiAgICByZWFkb25seTogdHJ1ZSxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICBleHBvcnRPcmRlcjogMjEsXG4gICAgZmlsdGVyYWJsZUFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIF9lY3Q/OiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdGaWxlJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZG9jdW1lbnR1cGxvYWRlcixcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ0RPQ1VNRU5UJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiA1MiB9LFxuICAgIG9uQ2hhbmdlOiBvblVybENoYW5nZVxuICB9KVxuICBfZG93bmxvYWRVUkw6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0ZpbGUnLCB7IHRpdGxlOiAnVElUTEUnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LCBzb3J0YWJsZTogdHJ1ZSB9KVxuICBAU2VhcmNoYWJsZSgnRmlsZScpXG4gIF9maWxlbmFtZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRmlsZScsIHsgdmlzaWJsZTogZmFsc2UsIHR5cGU6IEZvcm1GaWVsZFR5cGUubnVtYmVyLCBzb3J0YWJsZTogdHJ1ZSB9KVxuICBzaXplOiBudW1iZXI7XG5cbiAgQEVkaXRhYmxlKCdGaWxlJywgeyB2aXNpYmxlOiBmYWxzZSwgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsIGZpbHRlcmFibGU6IHRydWUgfSlcbiAgQFNlYXJjaGFibGUoJ0ZpbGUnKVxuICBtaW1lVHlwZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnRmlsZScsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsIGNvbHVtbkRlZmluaXRpb246IHsgd2lkdGg6IDgwIH0gfSlcbiAgaGlkZU1vYmlsZTogYm9vbGVhbjtcblxuICBARWRpdGFibGUoJ0ZpbGUnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbmFtZTogJ2dyb3VwJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICdncm91cCcsIGZvcmNlTmFtZTogdHJ1ZSB9LFxuICAgIHRpdGxlOiAnR1JPVVBTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2dyb3VwcycsXG4gICAgZmlsdGVyczogW1t7IGZpZWxkOiAnaXNSb2xlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmVxJyB9LCB2YWx1ZTogdHJ1ZSB9LCB7IGZpZWxkOiAndHlwZScsIG9wZXJhdG9yOiB7IF9pZDogJ25pbicgfSwgdmFsdWU6IFsncGxhbiddIH1dXSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnaXNSb2xlJywgJ3R5cGUnXSxcbiAgICBpZE9ubHk6IHRydWUsXG4gICAgbWFwVHJhbnNmb3JtOiBnZXRHcm91cHNUcmFuc2Zvcm0sXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiBmYWxzZVxuICB9KVxuICBncm91cDogYW55O1xuXG4gIEBFZGl0YWJsZSgnRmlsZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0YWc6IHRydWUsXG4gICAgYWxsb3dDdXN0b21UYWc6IHRydWUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgaWNvbjogJ3lvLWZsYWcnLFxuICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAnZmlsZVJlZicsIHZhbHVlczogJ19pZCcgfVxuICB9KVxuICBAU2VhcmNoYWJsZSgnRmlsZScpXG4gIHRhZ3M/OiBBcnJheTxzdHJpbmc+O1xuXG4gIEBFZGl0YWJsZSgnRmlsZScsIHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ1RFTkFOVCcsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICd0ZW5hbnRzJyxcbiAgICBjb2x1bW5EZWZpbml0aW9uOiB7IG5hbWU6ICduYW1lJyB9LFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICBmaWx0ZXJhYmxlOiB0cnVlLFxuICAgIGNvbmRpdGlvbjogW1JPTEVTX0NPTkRJVElPTlMuaXNBZG1pbl1cbiAgfSlcbiAgX3RlbmFudDogVGVuYW50O1xuICBfdGVuYW50UmVmPzogc3RyaW5nO1xufVxuIl19