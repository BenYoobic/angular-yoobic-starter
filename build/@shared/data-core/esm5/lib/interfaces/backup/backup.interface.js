/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IBackup } from '@shared/stencil';
var Backup = /** @class */ (function (_super) {
    tslib_1.__extends(Backup, _super);
    function Backup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return Backup;
}(IBackup));
export { Backup };
if (false) {
    /** @type {?} */
    Backup.prototype.date;
    /** @type {?} */
    Backup.prototype.backup;
    /** @type {?} */
    Backup.prototype.collections;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2JhY2t1cC9iYWNrdXAuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQU83QixrQ0FBTzs7O0lBZW5DLENBQUM7SUFiQztRQURDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7MENBQzVELElBQUk7d0NBQUM7SUFHWDtRQURDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7MENBQ2hCO0lBUzFFO1FBUEMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNsQixRQUFRLEVBQUUsS0FBSztZQUNmLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtZQUNoQyxTQUFTLEVBQUUsSUFBSTtZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDO1NBQzNILENBQUM7MENBQ1csS0FBSzsrQ0FBUztJQWRoQixNQUFNO1FBTGxCLEtBQUssQ0FBQztZQUNMLFNBQVMsRUFBRSxRQUFRO1lBQ25CLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNiLE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQztPQUNXLE1BQU0sQ0FlbEI7SUFBRCxhQUFDO0NBQUEsQ0FmMkIsT0FBTyxHQWVsQztTQWZZLE1BQU07OztJQUNqQixzQkFDVzs7SUFFWCx3QkFDMEU7O0lBRTFFLDZCQU8yQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJQmFja3VwIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnQmFja3VwJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogW11cbn0pXG5leHBvcnQgY2xhc3MgQmFja3VwIGV4dGVuZHMgSUJhY2t1cCB7XG4gIEBFZGl0YWJsZSgnQmFja3VwJywgeyByZXF1aXJlZDogZmFsc2UsIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZSB9KVxuICBkYXRlOiBEYXRlO1xuXG4gIEBFZGl0YWJsZSgnQmFja3VwJywgeyByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsIGNsZWFyYWJsZTogdHJ1ZSB9KVxuICBiYWNrdXA6IHsgX2lkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZzsgYmFkZ2U6IHN0cmluZyB9O1xuXG4gIEBFZGl0YWJsZSgnQmFja3VwJywge1xuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgdmFsdWVzOiBbJ21pc3Npb25zJywgJ21pc3Npb25kZXNjcmlwdGlvbicsICdtaXNzaW9uZGF0YXMnLCAndXNlcicsICdsb2NhdGlvbnMnLCAnbG9jYXRpb250eXBlcycsICdtaXNzaW9uZGF0YXMnLCAncGhvdG9zJ11cbiAgfSlcbiAgY29sbGVjdGlvbnM6IEFycmF5PHN0cmluZz47XG59XG4iXX0=