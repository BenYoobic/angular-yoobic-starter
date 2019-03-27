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
var File = /** @class */ (function (_super) {
    tslib_1.__extends(File, _super);
    function File() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return File;
}(IFile));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9maWxlL2ZpbGUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFeEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7OztBQUVwRCxNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJO0lBQ25DLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0tBQzNCO0lBQ0QsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7S0FDdEI7SUFDRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztLQUMxQjtBQUNILENBQUM7O0lBU3lCLGdDQUFLOzs7SUE0RS9CLENBQUM7SUFsRUM7UUFUQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGNBQWM7WUFDckIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1lBQ3hC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O1lBQ2hDLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUNsQyxRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztTQUN0QyxDQUFDOzBDQUNPLE1BQU07eUNBQUM7SUExRUwsSUFBSTtRQVBoQixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsTUFBTTtZQUNqQixjQUFjLEVBQUUsT0FBTztZQUN2QixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDYixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQztPQUNXLElBQUksQ0E0RWhCO0lBQUQsV0FBQztDQUFBLENBNUV5QixLQUFLLEdBNEU5QjtTQTVFWSxJQUFJOzs7SUFDZixvQkFTVzs7SUFFWCw0QkFRcUI7O0lBRXJCLHlCQUVrQjs7SUFFbEIsb0JBQ2E7O0lBRWIsd0JBRWlCOztJQUVqQiwwQkFDb0I7O0lBRXBCLHFCQWNXOztJQUVYLG9CQVVxQjs7SUFFckIsdUJBVWdCOztJQUNoQiwwQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBnZXRHcm91cHNUcmFuc2Zvcm0sIFJPTEVTX0NPTkRJVElPTlMgfSBmcm9tICcuLi9jb25kaXRpb24vY29uZGl0aW9uLmludGVyZmFjZSc7XG5cbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElGaWxlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IFRlbmFudCB9IGZyb20gJy4uL3RlbmFudC90ZW5hbnQuaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG9uVXJsQ2hhbmdlKGRvYywgZGF0YSkge1xuICBpZiAoZG9jICYmIGRvYy5uYW1lKSB7XG4gICAgZGF0YS5fZmlsZW5hbWUgPSBkb2MubmFtZTtcbiAgfVxuICBpZiAoZG9jICYmIGRvYy5zaXplKSB7XG4gICAgZGF0YS5zaXplID0gZG9jLnNpemU7XG4gIH1cbiAgaWYgKGRvYyAmJiBkb2MudHlwZSkge1xuICAgIGRhdGEubWltZVR5cGUgPSBkb2MudHlwZTtcbiAgfVxufVxuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdGaWxlJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFsnY29udGFpbmVyJ10sXG4gIGljb246ICd5by1maWxlJ1xufSlcbmV4cG9ydCBjbGFzcyBGaWxlIGV4dGVuZHMgSUZpbGUge1xuICBARWRpdGFibGUoJ0ZpbGUnLCB7XG4gICAgbmFtZTogJ19lY3QnLFxuICAgIHRpdGxlOiAnQ1JFQVRJT05EQVRFJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGUsXG4gICAgcmVhZG9ubHk6IHRydWUsXG4gICAgc29ydGFibGU6IHRydWUsXG4gICAgZXhwb3J0T3JkZXI6IDIxLFxuICAgIGZpbHRlcmFibGVBZHZhbmNlZDogdHJ1ZVxuICB9KVxuICBfZWN0PzogYW55O1xuXG4gIEBFZGl0YWJsZSgnRmlsZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRvY3VtZW50dXBsb2FkZXIsXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdET0NVTUVOVCcsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyB3aWR0aDogNTIgfSxcbiAgICBvbkNoYW5nZTogb25VcmxDaGFuZ2VcbiAgfSlcbiAgX2Rvd25sb2FkVVJMOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdGaWxlJywgeyB0aXRsZTogJ1RJVExFJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgc29ydGFibGU6IHRydWUgfSlcbiAgQFNlYXJjaGFibGUoJ0ZpbGUnKVxuICBfZmlsZW5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0ZpbGUnLCB7IHZpc2libGU6IGZhbHNlLCB0eXBlOiBGb3JtRmllbGRUeXBlLm51bWJlciwgc29ydGFibGU6IHRydWUgfSlcbiAgc2l6ZTogbnVtYmVyO1xuXG4gIEBFZGl0YWJsZSgnRmlsZScsIHsgdmlzaWJsZTogZmFsc2UsIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLCBmaWx0ZXJhYmxlOiB0cnVlIH0pXG4gIEBTZWFyY2hhYmxlKCdGaWxlJylcbiAgbWltZVR5cGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0ZpbGUnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLCBjb2x1bW5EZWZpbml0aW9uOiB7IHdpZHRoOiA4MCB9IH0pXG4gIGhpZGVNb2JpbGU6IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdGaWxlJywge1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIG5hbWU6ICdncm91cCcsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnZ3JvdXAnLCBmb3JjZU5hbWU6IHRydWUgfSxcbiAgICB0aXRsZTogJ0dST1VQUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdncm91cHMnLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSwgeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduaW4nIH0sIHZhbHVlOiBbJ3BsYW4nXSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2lzUm9sZScsICd0eXBlJ10sXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogZmFsc2VcbiAgfSlcbiAgZ3JvdXA6IGFueTtcblxuICBARWRpdGFibGUoJ0ZpbGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgdGFnOiB0cnVlLFxuICAgIGFsbG93Q3VzdG9tVGFnOiB0cnVlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAnZmlsZXMnLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGljb246ICd5by1mbGFnJyxcbiAgICBzdWJRdWVyeTogeyBmaWVsZDogJ2ZpbGVSZWYnLCB2YWx1ZXM6ICdfaWQnIH1cbiAgfSlcbiAgQFNlYXJjaGFibGUoJ0ZpbGUnKVxuICB0YWdzPzogQXJyYXk8c3RyaW5nPjtcblxuICBARWRpdGFibGUoJ0ZpbGUnLCB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdGl0bGU6ICdURU5BTlQnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAndGVuYW50cycsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnbmFtZScgfSxcbiAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgZmlsdGVyYWJsZTogdHJ1ZSxcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmlzQWRtaW5dXG4gIH0pXG4gIF90ZW5hbnQ6IFRlbmFudDtcbiAgX3RlbmFudFJlZj86IHN0cmluZztcbn1cbiJdfQ==