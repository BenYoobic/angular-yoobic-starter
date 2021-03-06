/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormFieldType, ICatalog } from '@shared/stencil';
import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FORM_FILES_IMAGE_FILTER } from '../constants/constants.interface';
import { getGroupsTransform } from '../condition/condition.interface';
var Catalog = /** @class */ (function (_super) {
    tslib_1.__extends(Catalog, _super);
    function Catalog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('Catalog', { required: true, type: FormFieldType.text }),
        Searchable('Catalog'),
        tslib_1.__metadata("design:type", String)
    ], Catalog.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('Catalog', {
            type: FormFieldType.autocomplete,
            maxWidth: 600,
            filters: FORM_FILES_IMAGE_FILTER,
            forceModal: true,
            hiddenFields: ['mimeType'],
            mode: 'tile',
            pageSize: 20,
            fixedPosition: true,
            maxHeight: 300,
            crop: 'square',
            collectionName: 'files',
            title: 'PHOTO',
            required: true,
            columnDefinition: { name: '_downloadURL' }
        }),
        tslib_1.__metadata("design:type", Object)
    ], Catalog.prototype, "image", void 0);
    tslib_1.__decorate([
        Editable('Catalog', { type: FormFieldType.textarea }),
        tslib_1.__metadata("design:type", String)
    ], Catalog.prototype, "description", void 0);
    tslib_1.__decorate([
        Editable('Catalog', {
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
    ], Catalog.prototype, "group", void 0);
    Catalog = tslib_1.__decorate([
        Model({
            className: 'Catalog',
            collectionName: 'catalogs',
            fields: ['*'],
            include: [],
            icon: 'yo-catalogue'
        })
    ], Catalog);
    return Catalog;
}(ICatalog));
export { Catalog };
if (false) {
    /** @type {?} */
    Catalog.prototype.title;
    /** @type {?} */
    Catalog.prototype.image;
    /** @type {?} */
    Catalog.prototype.description;
    /** @type {?} */
    Catalog.prototype.group;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9jYXRhbG9nL2NhdGFsb2cuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7SUFTekMsbUNBQVE7OztJQXVDckMsQ0FBQztJQXBDQztRQUZDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakUsVUFBVSxDQUFDLFNBQVMsQ0FBQzs7MENBQ1I7SUFrQmQ7UUFoQkMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7WUFDaEMsUUFBUSxFQUFFLEdBQUc7WUFDYixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUMxQixJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxFQUFFO1lBQ1osYUFBYSxFQUFFLElBQUk7WUFDbkIsU0FBUyxFQUFFLEdBQUc7WUFDZCxJQUFJLEVBQUUsUUFBUTtZQUNkLGNBQWMsRUFBRSxPQUFPO1lBQ3ZCLEtBQUssRUFBRSxPQUFPO1lBQ2QsUUFBUSxFQUFFLElBQUk7WUFDZCxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUU7U0FDM0MsQ0FBQzs7MENBQ1M7SUFHWDtRQURDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDOztnREFDbEM7SUFjcEI7UUFaQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ25CLEtBQUssRUFBRSxRQUFRO1lBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckksWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztZQUNoQyxNQUFNLEVBQUUsSUFBSTtZQUNaLFlBQVksRUFBRSxrQkFBa0I7WUFDaEMsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7OzBDQUNZO0lBdENILE9BQU87UUFQbkIsS0FBSyxDQUFDO1lBQ0wsU0FBUyxFQUFFLFNBQVM7WUFDcEIsY0FBYyxFQUFFLFVBQVU7WUFDMUIsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLEVBQUUsY0FBYztTQUNyQixDQUFDO09BQ1csT0FBTyxDQXVDbkI7SUFBRCxjQUFDO0NBQUEsQ0F2QzRCLFFBQVEsR0F1Q3BDO1NBdkNZLE9BQU87OztJQUNsQix3QkFFYzs7SUFFZCx3QkFnQlc7O0lBRVgsOEJBQ29COztJQUVwQix3QkFZYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElDYXRhbG9nIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBTZWFyY2hhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9zZWFyY2hhYmxlL3NlYXJjaGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRk9STV9GSUxFU19JTUFHRV9GSUxURVIgfSBmcm9tICcuLi9jb25zdGFudHMvY29uc3RhbnRzLmludGVyZmFjZSc7XG5pbXBvcnQgeyBnZXRHcm91cHNUcmFuc2Zvcm0gfSBmcm9tICcuLi9jb25kaXRpb24vY29uZGl0aW9uLmludGVyZmFjZSc7XG5cbkBNb2RlbCh7XG4gIGNsYXNzTmFtZTogJ0NhdGFsb2cnLFxuICBjb2xsZWN0aW9uTmFtZTogJ2NhdGFsb2dzJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogW10sXG4gIGljb246ICd5by1jYXRhbG9ndWUnXG59KVxuZXhwb3J0IGNsYXNzIENhdGFsb2cgZXh0ZW5kcyBJQ2F0YWxvZyB7XG4gIEBFZGl0YWJsZSgnQ2F0YWxvZycsIHsgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBAU2VhcmNoYWJsZSgnQ2F0YWxvZycpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDYXRhbG9nJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIG1heFdpZHRoOiA2MDAsXG4gICAgZmlsdGVyczogRk9STV9GSUxFU19JTUFHRV9GSUxURVIsXG4gICAgZm9yY2VNb2RhbDogdHJ1ZSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnbWltZVR5cGUnXSxcbiAgICBtb2RlOiAndGlsZScsXG4gICAgcGFnZVNpemU6IDIwLFxuICAgIGZpeGVkUG9zaXRpb246IHRydWUsXG4gICAgbWF4SGVpZ2h0OiAzMDAsXG4gICAgY3JvcDogJ3NxdWFyZScsXG4gICAgY29sbGVjdGlvbk5hbWU6ICdmaWxlcycsXG4gICAgdGl0bGU6ICdQSE9UTycsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAnX2Rvd25sb2FkVVJMJyB9XG4gIH0pXG4gIGltYWdlOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdDYXRhbG9nJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhIH0pXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdDYXRhbG9nJywge1xuICAgIHRpdGxlOiAnR1JPVVBTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ2dyb3VwcycsXG4gICAgZmlsdGVyczogW1t7IGZpZWxkOiAnaXNSb2xlJywgb3BlcmF0b3I6IHsgX2lkOiAnbmVxJyB9LCB2YWx1ZTogdHJ1ZSB9LCB7IGZpZWxkOiAndHlwZScsIG9wZXJhdG9yOiB7IF9pZDogJ25pbicgfSwgdmFsdWU6IFsncGxhbiddIH1dXSxcbiAgICBoaWRkZW5GaWVsZHM6IFsnaXNSb2xlJywgJ3R5cGUnXSxcbiAgICBpZE9ubHk6IHRydWUsXG4gICAgbWFwVHJhbnNmb3JtOiBnZXRHcm91cHNUcmFuc2Zvcm0sXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9KVxuICBncm91cDogc3RyaW5nO1xufVxuIl19