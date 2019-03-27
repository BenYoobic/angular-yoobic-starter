/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { ROLES_CONDITIONS } from '../condition/condition.interface';
import { ISlide, FormFieldType } from '@shared/stencil';
var Slide = /** @class */ (function (_super) {
    tslib_1.__extends(Slide, _super);
    function Slide() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('Slide', { required: true, type: FormFieldType.text }),
        tslib_1.__metadata("design:type", String)
    ], Slide.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('Slide', { type: FormFieldType.textarea }),
        tslib_1.__metadata("design:type", String)
    ], Slide.prototype, "description", void 0);
    tslib_1.__decorate([
        Editable('Slide', { type: FormFieldType.checkbox, flex: 100, advanced: true }),
        tslib_1.__metadata("design:type", Boolean)
    ], Slide.prototype, "hideheader", void 0);
    tslib_1.__decorate([
        Editable('Slide', {
            type: FormFieldType.checkbox,
            flex: 100,
            condition: [ROLES_CONDITIONS.hasService],
            advanced: true
        }),
        tslib_1.__metadata("design:type", Boolean)
    ], Slide.prototype, "service", void 0);
    tslib_1.__decorate([
        Editable('Slide', {
            type: FormFieldType.autocomplete,
            multiple: true,
            clearable: true,
            advanced: true
        }),
        tslib_1.__metadata("design:type", Object)
    ], Slide.prototype, "condition", void 0);
    Slide = tslib_1.__decorate([
        Model({ className: 'Slide' })
    ], Slide);
    return Slide;
}(ISlide));
export { Slide };
if (false) {
    /** @type {?} */
    Slide.prototype.title;
    /** @type {?} */
    Slide.prototype.description;
    /** @type {?} */
    Slide.prototype.hideheader;
    /** @type {?} */
    Slide.prototype.service;
    /** @type {?} */
    Slide.prototype.condition;
    /** @type {?} */
    Slide.prototype.items;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvc2xpZGUvc2xpZGUuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVwRSxPQUFPLEVBQUUsTUFBTSxFQUFjLGFBQWEsRUFBYyxNQUFNLGlCQUFpQixDQUFDOztJQUdyRCxpQ0FBTTs7O0lBMkJqQyxDQUFDO0lBekJDO1FBREMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7d0NBQ2xEO0lBR2Q7UUFEQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7OENBQy9CO0lBR3JCO1FBREMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs2Q0FDMUQ7SUFRckI7UUFOQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUTtZQUM1QixJQUFJLEVBQUUsR0FBRztZQUNULFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztZQUN4QyxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7OzBDQUNnQjtJQVFsQjtRQU5DLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7OzRDQUNpRTtJQXhCeEQsS0FBSztRQURqQixLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUM7T0FDakIsS0FBSyxDQTJCakI7SUFBRCxZQUFDO0NBQUEsQ0EzQjBCLE1BQU0sR0EyQmhDO1NBM0JZLEtBQUs7OztJQUNoQixzQkFDYzs7SUFFZCw0QkFDcUI7O0lBRXJCLDJCQUNxQjs7SUFFckIsd0JBTWtCOztJQUVsQiwwQkFNbUU7O0lBRW5FLHNCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBST0xFU19DT05ESVRJT05TIH0gZnJvbSAnLi4vY29uZGl0aW9uL2NvbmRpdGlvbi5pbnRlcmZhY2UnO1xuXG5pbXBvcnQgeyBJU2xpZGUsIElGb3JtRmllbGQsIEZvcm1GaWVsZFR5cGUsIElDb25kaXRpb24gfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5ATW9kZWwoeyBjbGFzc05hbWU6ICdTbGlkZScgfSlcbmV4cG9ydCBjbGFzcyBTbGlkZSBleHRlbmRzIElTbGlkZSB7XG4gIEBFZGl0YWJsZSgnU2xpZGUnLCB7IHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgdGl0bGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1NsaWRlJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhIH0pXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnU2xpZGUnLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUuY2hlY2tib3gsIGZsZXg6IDEwMCwgYWR2YW5jZWQ6IHRydWUgfSlcbiAgaGlkZWhlYWRlcj86IGJvb2xlYW47XG5cbiAgQEVkaXRhYmxlKCdTbGlkZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmNoZWNrYm94LFxuICAgIGZsZXg6IDEwMCxcbiAgICBjb25kaXRpb246IFtST0xFU19DT05ESVRJT05TLmhhc1NlcnZpY2VdLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIHNlcnZpY2U/OiBib29sZWFuO1xuXG4gIEBFZGl0YWJsZSgnU2xpZGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgbXVsdGlwbGU6IHRydWUsXG4gICAgY2xlYXJhYmxlOiB0cnVlLFxuICAgIGFkdmFuY2VkOiB0cnVlXG4gIH0pXG4gIGNvbmRpdGlvbj86IEFycmF5PElDb25kaXRpb24gfCBzdHJpbmcgfCBhbnk+IHwgc3RyaW5nIHwgSUNvbmRpdGlvbjtcblxuICBpdGVtczogQXJyYXk8SUZvcm1GaWVsZD47XG59XG4iXX0=