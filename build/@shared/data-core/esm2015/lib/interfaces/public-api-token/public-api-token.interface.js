/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IPublicApiToken } from '@shared/stencil';
let PublicApiToken = class PublicApiToken extends IPublicApiToken {
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS10b2tlbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9wdWJsaWMtYXBpLXRva2VuL3B1YmxpYy1hcGktdG9rZW4uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0lBVXBELGNBQWMsU0FBZCxjQUFlLFNBQVEsZUFBZTtDQU9sRCxDQUFBO0FBTEM7SUFEQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDOzttREFDekU7QUFGakIsY0FBYztJQVAxQixLQUFLLENBQUM7UUFDTCxTQUFTLEVBQUUsZ0JBQWdCO1FBQzNCLGNBQWMsRUFBRSxpQkFBaUI7UUFDakMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ2IsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2pCLElBQUksRUFBRSxVQUFVO0tBQ2pCLENBQUM7R0FDVyxjQUFjLENBTzFCO1NBUFksY0FBYzs7O0lBQ3pCLHFDQUM0Qjs7SUFFNUIsOEJBQVc7O0lBQ1gsaUNBQWdCOztJQUNoQixpQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IFRlbmFudCB9IGZyb20gJy4uL3RlbmFudC90ZW5hbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSVB1YmxpY0FwaVRva2VuIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2VyL3VzZXIuaW50ZXJmYWNlJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnUHVibGljQXBpVG9rZW4nLFxuICBjb2xsZWN0aW9uTmFtZTogJ3B1YmxpY0FQSVRva2VucycsXG4gIGZpZWxkczogWycqJ10sXG4gIGluY2x1ZGU6IFsndXNlciddLFxuICBpY29uOiAneW8tYmFkZ2UnXG59KVxuZXhwb3J0IGNsYXNzIFB1YmxpY0FwaVRva2VuIGV4dGVuZHMgSVB1YmxpY0FwaVRva2VuIHtcbiAgQEVkaXRhYmxlKCdQdWJsaWNBcGlUb2tlbicsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSwgcmVhZG9ubHk6IHRydWUsIG5hbWU6ICdhY2Nlc3NUb2tlbi5pZCcgfSlcbiAgYWNjZXNzVG9rZW46IHsgaWQ6IHN0cmluZyB9O1xuXG4gIHVzZXI6IFVzZXI7XG4gIHVzZXJSZWY6IHN0cmluZztcbiAgX3RlbmFudDogVGVuYW50O1xufVxuIl19