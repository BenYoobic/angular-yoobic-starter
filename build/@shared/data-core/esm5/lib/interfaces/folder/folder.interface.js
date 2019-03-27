/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { getGroupsTransform } from '../condition/condition.interface';
import { FormFieldType, IFolder, IFileOrFolder } from '@shared/stencil';
var Folder = /** @class */ (function (_super) {
    tslib_1.__extends(Folder, _super);
    function Folder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('Folder', { title: 'TITLE', required: true, type: FormFieldType.text }),
        Searchable('Folder'),
        tslib_1.__metadata("design:type", String)
    ], Folder.prototype, "name", void 0);
    tslib_1.__decorate([
        Editable('Folder', {
            title: 'GROUPS',
            type: FormFieldType.autocomplete,
            collectionName: 'groups',
            filters: [[{ field: 'isRole', operator: { _id: 'neq' }, value: true }, { field: 'type', operator: { _id: 'nin' }, value: ['plan'] }]],
            hiddenFields: ['isRole', 'type'],
            idOnly: true,
            mapTransform: getGroupsTransform,
            multiple: true,
            clearable: false,
            required: true
        }),
        tslib_1.__metadata("design:type", String)
    ], Folder.prototype, "group", void 0);
    Folder = tslib_1.__decorate([
        Model({
            className: 'Folder',
            collectionName: 'folders',
            fields: ['*'],
            include: ['container'],
            icon: 'yo-folder'
        })
    ], Folder);
    return Folder;
}(IFolder));
export { Folder };
if (false) {
    /** @type {?} */
    Folder.prototype.name;
    /** @type {?} */
    Folder.prototype.group;
}
var FileOrFolder = /** @class */ (function (_super) {
    tslib_1.__extends(FileOrFolder, _super);
    function FileOrFolder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Searchable('FileOrFolder'),
        tslib_1.__metadata("design:type", String)
    ], FileOrFolder.prototype, "name", void 0);
    tslib_1.__decorate([
        Searchable('FileOrFolder'),
        tslib_1.__metadata("design:type", String)
    ], FileOrFolder.prototype, "_filename", void 0);
    tslib_1.__decorate([
        Searchable('FileOrFolder'),
        tslib_1.__metadata("design:type", String)
    ], FileOrFolder.prototype, "mimeType", void 0);
    FileOrFolder = tslib_1.__decorate([
        Model({
            className: 'FileOrFolder',
            collectionName: 'filesFolders',
            fields: ['*'],
            include: ['container']
        })
    ], FileOrFolder);
    return FileOrFolder;
}(IFileOrFolder));
export { FileOrFolder };
if (false) {
    /** @type {?} */
    FileOrFolder.prototype.name;
    /** @type {?} */
    FileOrFolder.prototype._filename;
    /** @type {?} */
    FileOrFolder.prototype.mimeType;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2ZvbGRlci9mb2xkZXIuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0lBUzVDLGtDQUFPOzs7SUFrQm5DLENBQUM7SUFmQztRQUZDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoRixVQUFVLENBQUMsUUFBUSxDQUFDOzt3Q0FDUjtJQWNiO1FBWkMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNsQixLQUFLLEVBQUUsUUFBUTtZQUNmLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtZQUNoQyxjQUFjLEVBQUUsUUFBUTtZQUN4QixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JJLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7WUFDaEMsTUFBTSxFQUFFLElBQUk7WUFDWixZQUFZLEVBQUUsa0JBQWtCO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDOzt5Q0FDWTtJQWpCSCxNQUFNO1FBUGxCLEtBQUssQ0FBQztZQUNMLFNBQVMsRUFBRSxRQUFRO1lBQ25CLGNBQWMsRUFBRSxTQUFTO1lBQ3pCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNiLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN0QixJQUFJLEVBQUUsV0FBVztTQUNsQixDQUFDO09BQ1csTUFBTSxDQWtCbEI7SUFBRCxhQUFDO0NBQUEsQ0FsQjJCLE9BQU8sR0FrQmxDO1NBbEJZLE1BQU07OztJQUNqQixzQkFFYTs7SUFFYix1QkFZYzs7O0lBU2tCLHdDQUFhOzs7SUFLL0MsQ0FBQztJQUo2QjtRQUEzQixVQUFVLENBQUMsY0FBYyxDQUFDOzs4Q0FBZTtJQUNkO1FBQTNCLFVBQVUsQ0FBQyxjQUFjLENBQUM7O21EQUFvQjtJQUVuQjtRQUEzQixVQUFVLENBQUMsY0FBYyxDQUFDOztrREFBbUI7SUFKbkMsWUFBWTtRQU54QixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsY0FBYztZQUN6QixjQUFjLEVBQUUsY0FBYztZQUM5QixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDYixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDdkIsQ0FBQztPQUNXLFlBQVksQ0FLeEI7SUFBRCxtQkFBQztDQUFBLENBTGlDLGFBQWEsR0FLOUM7U0FMWSxZQUFZOzs7SUFDdkIsNEJBQTBDOztJQUMxQyxpQ0FBK0M7O0lBRS9DLGdDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgU2VhcmNoYWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvc2VhcmNoYWJsZS9zZWFyY2hhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IGdldEdyb3Vwc1RyYW5zZm9ybSB9IGZyb20gJy4uL2NvbmRpdGlvbi9jb25kaXRpb24uaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSUZvbGRlciwgSUZpbGVPckZvbGRlciB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0ZvbGRlcicsXG4gIGNvbGxlY3Rpb25OYW1lOiAnZm9sZGVycycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFsnY29udGFpbmVyJ10sXG4gIGljb246ICd5by1mb2xkZXInXG59KVxuZXhwb3J0IGNsYXNzIEZvbGRlciBleHRlbmRzIElGb2xkZXIge1xuICBARWRpdGFibGUoJ0ZvbGRlcicsIHsgdGl0bGU6ICdUSVRMRScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgQFNlYXJjaGFibGUoJ0ZvbGRlcicpXG4gIG5hbWU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ0ZvbGRlcicsIHtcbiAgICB0aXRsZTogJ0dST1VQUycsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdncm91cHMnLFxuICAgIGZpbHRlcnM6IFtbeyBmaWVsZDogJ2lzUm9sZScsIG9wZXJhdG9yOiB7IF9pZDogJ25lcScgfSwgdmFsdWU6IHRydWUgfSwgeyBmaWVsZDogJ3R5cGUnLCBvcGVyYXRvcjogeyBfaWQ6ICduaW4nIH0sIHZhbHVlOiBbJ3BsYW4nXSB9XV0sXG4gICAgaGlkZGVuRmllbGRzOiBbJ2lzUm9sZScsICd0eXBlJ10sXG4gICAgaWRPbmx5OiB0cnVlLFxuICAgIG1hcFRyYW5zZm9ybTogZ2V0R3JvdXBzVHJhbnNmb3JtLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIGNsZWFyYWJsZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IHRydWVcbiAgfSlcbiAgZ3JvdXA6IHN0cmluZztcbn1cblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnRmlsZU9yRm9sZGVyJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdmaWxlc0ZvbGRlcnMnLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbJ2NvbnRhaW5lciddXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVPckZvbGRlciBleHRlbmRzIElGaWxlT3JGb2xkZXIge1xuICBAU2VhcmNoYWJsZSgnRmlsZU9yRm9sZGVyJykgbmFtZT86IHN0cmluZztcbiAgQFNlYXJjaGFibGUoJ0ZpbGVPckZvbGRlcicpIF9maWxlbmFtZT86IHN0cmluZztcblxuICBAU2VhcmNoYWJsZSgnRmlsZU9yRm9sZGVyJykgbWltZVR5cGU/OiBzdHJpbmc7XG59XG4iXX0=