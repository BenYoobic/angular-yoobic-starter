/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IBackup } from '@shared/stencil';
let Backup = class Backup extends IBackup {
};
tslib_1.__decorate([
    Editable('Backup', { required: false, type: FormFieldType.date }),
    tslib_1.__metadata("design:type", Date)
], Backup.prototype, "date", void 0);
tslib_1.__decorate([
    Editable('Backup', { required: true, type: FormFieldType.autocomplete, clearable: true }),
    tslib_1.__metadata("design:type", Object)
], Backup.prototype, "backup", void 0);
tslib_1.__decorate([
    Editable('Backup', {
        required: false,
        type: FormFieldType.autocomplete,
        clearable: true,
        multiple: true,
        values: ['missions', 'missiondescription', 'missiondatas', 'user', 'locations', 'locationtypes', 'missiondatas', 'photos']
    }),
    tslib_1.__metadata("design:type", Array)
], Backup.prototype, "collections", void 0);
Backup = tslib_1.__decorate([
    Model({
        className: 'Backup',
        fields: ['*'],
        include: []
    })
], Backup);
export { Backup };
if (false) {
    /** @type {?} */
    Backup.prototype.date;
    /** @type {?} */
    Backup.prototype.backup;
    /** @type {?} */
    Backup.prototype.collections;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2JhY2t1cC9iYWNrdXAuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0lBTzVDLE1BQU0sU0FBTixNQUFPLFNBQVEsT0FBTztDQWVsQyxDQUFBO0FBYkM7SUFEQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO3NDQUM1RCxJQUFJO29DQUFDO0FBR1g7SUFEQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7O3NDQUNoQjtBQVMxRTtJQVBDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDbEIsUUFBUSxFQUFFLEtBQUs7UUFDZixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7UUFDaEMsU0FBUyxFQUFFLElBQUk7UUFDZixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQztLQUMzSCxDQUFDO3NDQUNXLEtBQUs7MkNBQVM7QUFkaEIsTUFBTTtJQUxsQixLQUFLLENBQUM7UUFDTCxTQUFTLEVBQUUsUUFBUTtRQUNuQixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDYixPQUFPLEVBQUUsRUFBRTtLQUNaLENBQUM7R0FDVyxNQUFNLENBZWxCO1NBZlksTUFBTTs7O0lBQ2pCLHNCQUNXOztJQUVYLHdCQUMwRTs7SUFFMUUsNkJBTzJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL21vZGVsL21vZGVsLmRlY29yYXRvcic7XG5pbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IEZvcm1GaWVsZFR5cGUsIElCYWNrdXAgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdCYWNrdXAnLFxuICBmaWVsZHM6IFsnKiddLFxuICBpbmNsdWRlOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBCYWNrdXAgZXh0ZW5kcyBJQmFja3VwIHtcbiAgQEVkaXRhYmxlKCdCYWNrdXAnLCB7IHJlcXVpcmVkOiBmYWxzZSwgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRlIH0pXG4gIGRhdGU6IERhdGU7XG5cbiAgQEVkaXRhYmxlKCdCYWNrdXAnLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSwgY2xlYXJhYmxlOiB0cnVlIH0pXG4gIGJhY2t1cDogeyBfaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nOyBiYWRnZTogc3RyaW5nIH07XG5cbiAgQEVkaXRhYmxlKCdCYWNrdXAnLCB7XG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNsZWFyYWJsZTogdHJ1ZSxcbiAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICB2YWx1ZXM6IFsnbWlzc2lvbnMnLCAnbWlzc2lvbmRlc2NyaXB0aW9uJywgJ21pc3Npb25kYXRhcycsICd1c2VyJywgJ2xvY2F0aW9ucycsICdsb2NhdGlvbnR5cGVzJywgJ21pc3Npb25kYXRhcycsICdwaG90b3MnXVxuICB9KVxuICBjb2xsZWN0aW9uczogQXJyYXk8c3RyaW5nPjtcbn1cbiJdfQ==