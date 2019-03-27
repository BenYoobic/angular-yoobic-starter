/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IPublicApiToken } from '@shared/stencil';
var PublicApiToken = /** @class */ (function (_super) {
    tslib_1.__extends(PublicApiToken, _super);
    function PublicApiToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('PublicApiToken', { type: FormFieldType.textarea, readonly: true, name: 'accessToken.id' }),
        tslib_1.__metadata("design:type", Object)
    ], PublicApiToken.prototype, "accessToken", void 0);
    PublicApiToken = tslib_1.__decorate([
        Model({
            className: 'PublicApiToken',
            collectionName: 'publicAPITokens',
            fields: ['*'],
            include: ['user'],
            icon: 'yo-badge'
        })
    ], PublicApiToken);
    return PublicApiToken;
}(IPublicApiToken));
export { PublicApiToken };
if (false) {
    /** @type {?} */
    PublicApiToken.prototype.accessToken;
    /** @type {?} */
    PublicApiToken.prototype.user;
    /** @type {?} */
    PublicApiToken.prototype.userRef;
    /** @type {?} */
    PublicApiToken.prototype._tenant;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS10b2tlbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9wdWJsaWMtYXBpLXRva2VuL3B1YmxpYy1hcGktdG9rZW4uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQVU3QiwwQ0FBZTs7O0lBT25ELENBQUM7SUFMQztRQURDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUM7O3VEQUN6RTtJQUZqQixjQUFjO1FBUDFCLEtBQUssQ0FBQztZQUNMLFNBQVMsRUFBRSxnQkFBZ0I7WUFDM0IsY0FBYyxFQUFFLGlCQUFpQjtZQUNqQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDYixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsSUFBSSxFQUFFLFVBQVU7U0FDakIsQ0FBQztPQUNXLGNBQWMsQ0FPMUI7SUFBRCxxQkFBQztDQUFBLENBUG1DLGVBQWUsR0FPbEQ7U0FQWSxjQUFjOzs7SUFDekIscUNBQzRCOztJQUU1Qiw4QkFBVzs7SUFDWCxpQ0FBZ0I7O0lBQ2hCLGlDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi4vdGVuYW50L3RlbmFudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlLCBJUHVibGljQXBpVG9rZW4gfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXIvdXNlci5pbnRlcmZhY2UnO1xuXG5ATW9kZWwoe1xuICBjbGFzc05hbWU6ICdQdWJsaWNBcGlUb2tlbicsXG4gIGNvbGxlY3Rpb25OYW1lOiAncHVibGljQVBJVG9rZW5zJyxcbiAgZmllbGRzOiBbJyonXSxcbiAgaW5jbHVkZTogWyd1c2VyJ10sXG4gIGljb246ICd5by1iYWRnZSdcbn0pXG5leHBvcnQgY2xhc3MgUHVibGljQXBpVG9rZW4gZXh0ZW5kcyBJUHVibGljQXBpVG9rZW4ge1xuICBARWRpdGFibGUoJ1B1YmxpY0FwaVRva2VuJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLCByZWFkb25seTogdHJ1ZSwgbmFtZTogJ2FjY2Vzc1Rva2VuLmlkJyB9KVxuICBhY2Nlc3NUb2tlbjogeyBpZDogc3RyaW5nIH07XG5cbiAgdXNlcjogVXNlcjtcbiAgdXNlclJlZjogc3RyaW5nO1xuICBfdGVuYW50OiBUZW5hbnQ7XG59XG4iXX0=