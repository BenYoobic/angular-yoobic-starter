/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Entity, Model, Editable, Searchable } from '@shared/data-core';
import { FormFieldType } from '@shared/stencil';
let Message = class Message extends Entity {
};
tslib_1.__decorate([
    Editable('Message', {
        title: 'TO',
        type: FormFieldType.emailreport,
        required: true,
        showUsers: true
    }),
    Searchable('Message'),
    tslib_1.__metadata("design:type", Array)
], Message.prototype, "to", void 0);
tslib_1.__decorate([
    Editable('Message', { title: 'SUBJECT', required: true, type: FormFieldType.text }),
    Searchable('Message'),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('Message', { title: 'BODY', required: true, type: FormFieldType.textarea }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "body", void 0);
tslib_1.__decorate([
    Editable('Message', { title: 'THANKYOU', type: FormFieldType.text }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "thankyou", void 0);
Message = tslib_1.__decorate([
    Model({
        className: 'Message',
        collectionName: 'messages',
        fields: ['*', 'from.imageData', 'from.username', 'from.email'],
        include: ['from']
    })
], Message);
export { Message };
if (false) {
    /** @type {?} */
    Message.prototype._id;
    /** @type {?} */
    Message.prototype._acl;
    /** @type {?} */
    Message.prototype._lmt;
    /** @type {?} */
    Message.prototype._ect;
    /** @type {?} */
    Message.prototype.to;
    /** @type {?} */
    Message.prototype.title;
    /** @type {?} */
    Message.prototype.body;
    /** @type {?} */
    Message.prototype.actionURL;
    /** @type {?} */
    Message.prototype.actionText;
    /** @type {?} */
    Message.prototype.thankyou;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL21lc3NhZ2UvbWVzc2FnZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQVEsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7SUFRbkMsT0FBTyxTQUFQLE9BQVEsU0FBUSxNQUFNO0NBOEJsQyxDQUFBO0FBakJDO0lBUEMsUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNuQixLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxhQUFhLENBQUMsV0FBVztRQUMvQixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDO3NDQUNsQixLQUFLO21DQUFTO0FBSWxCO0lBRkMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25GLFVBQVUsQ0FBQyxTQUFTLENBQUM7O3NDQUNSO0FBR2Q7SUFEQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7O3FDQUN4RTtBQVNiO0lBREMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7eUNBQ3BEO0FBN0JOLE9BQU87SUFObkIsS0FBSyxDQUFDO1FBQ0wsU0FBUyxFQUFFLFNBQVM7UUFDcEIsY0FBYyxFQUFFLFVBQVU7UUFDMUIsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7UUFDOUQsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO0tBQ2xCLENBQUM7R0FDVyxPQUFPLENBOEJuQjtTQTlCWSxPQUFPOzs7SUFDbEIsc0JBQWE7O0lBQ2IsdUJBQVk7O0lBQ1osdUJBQWM7O0lBQ2QsdUJBQWM7O0lBRWQscUJBT2tCOztJQUVsQix3QkFFYzs7SUFFZCx1QkFDYTs7SUFLYiw0QkFBa0I7O0lBQ2xCLDZCQUFtQjs7SUFFbkIsMkJBQ2lCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZUludGVyZmFjZSB9IGZyb20gJy4vbWVzc2FnZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRW50aXR5LCBJQWNsLCBNb2RlbCwgRWRpdGFibGUsIFNlYXJjaGFibGUgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnTWVzc2FnZScsXG4gIGNvbGxlY3Rpb25OYW1lOiAnbWVzc2FnZXMnLFxuICBmaWVsZHM6IFsnKicsICdmcm9tLmltYWdlRGF0YScsICdmcm9tLnVzZXJuYW1lJywgJ2Zyb20uZW1haWwnXSxcbiAgaW5jbHVkZTogWydmcm9tJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZSBleHRlbmRzIEVudGl0eSBpbXBsZW1lbnRzIE1lc3NhZ2VJbnRlcmZhY2Uge1xuICBfaWQ/OiBzdHJpbmc7XG4gIF9hY2w/OiBJQWNsO1xuICBfbG10Pzogc3RyaW5nO1xuICBfZWN0Pzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTWVzc2FnZScsIHtcbiAgICB0aXRsZTogJ1RPJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlscmVwb3J0LFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHNob3dVc2VyczogdHJ1ZVxuICB9KVxuICBAU2VhcmNoYWJsZSgnTWVzc2FnZScpXG4gIHRvOiBBcnJheTxzdHJpbmc+O1xuXG4gIEBFZGl0YWJsZSgnTWVzc2FnZScsIHsgdGl0bGU6ICdTVUJKRUNUJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCB9KVxuICBAU2VhcmNoYWJsZSgnTWVzc2FnZScpXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdNZXNzYWdlJywgeyB0aXRsZTogJ0JPRFknLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSB9KVxuICBib2R5OiBzdHJpbmc7XG5cbiAgLy8gQEVkaXRhYmxlKCdNZXNzYWdlJywgeyB0aXRsZTogJ0ZPT1RFUicsIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEgfSlcbiAgLy8gZm9vdGVyOiBzdHJpbmc7XG5cbiAgYWN0aW9uVVJMOiBzdHJpbmc7XG4gIGFjdGlvblRleHQ6IHN0cmluZztcblxuICBARWRpdGFibGUoJ01lc3NhZ2UnLCB7IHRpdGxlOiAnVEhBTktZT1UnLCB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQgfSlcbiAgdGhhbmt5b3U6IHN0cmluZztcbn1cbiJdfQ==