/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Editable } from '../../decorators/editable/editable.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { FormFieldType, INotification } from '@shared/stencil';
import { Model } from '../../decorators/model/model.decorator';
import { User } from '../user/user.interface';
var Notification = /** @class */ (function (_super) {
    tslib_1.__extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('Notification', {
            type: FormFieldType.autocomplete,
            translate: true,
            values: ['email', 'notification', 'allnotification'],
            required: true,
            filterable: true
        }),
        tslib_1.__metadata("design:type", String)
    ], Notification.prototype, "mode", void 0);
    tslib_1.__decorate([
        Editable('Notification', { type: FormFieldType.text, required: true }),
        Searchable('Notification'),
        tslib_1.__metadata("design:type", String)
    ], Notification.prototype, "title", void 0);
    tslib_1.__decorate([
        Editable('Notification', { type: FormFieldType.textarea, required: true }),
        tslib_1.__metadata("design:type", String)
    ], Notification.prototype, "body", void 0);
    tslib_1.__decorate([
        Editable('Notification', {
            type: FormFieldType.datetime,
            minDate: new Date(),
            condition: 'mode!="sms"'
        }),
        tslib_1.__metadata("design:type", Date)
    ], Notification.prototype, "scheduledDate", void 0);
    tslib_1.__decorate([
        Editable('Notification', {
            type: FormFieldType.autocomplete,
            collectionName: 'user',
            icon: 'yo-user',
            columnDefinition: { name: 'username' },
            exportOrder: 24,
            title: 'SENDBY',
            filterable: true
        }),
        tslib_1.__metadata("design:type", User)
    ], Notification.prototype, "sender", void 0);
    Notification = tslib_1.__decorate([
        Model({
            className: 'Notification',
            collectionName: 'notifications',
            fields: ['*', 'sender._id', 'sender.firstName', 'sender.lastName', 'sender.username', 'sender.imageData', 'sender.email', 'sender.telephone'],
            include: ['sender'],
            //'creator'
            icon: 'yo-activity'
        })
    ], Notification);
    return Notification;
}(INotification));
export { Notification };
if (false) {
    /** @type {?} */
    Notification.prototype.mode;
    /** @type {?} */
    Notification.prototype.title;
    /** @type {?} */
    Notification.prototype.body;
    /** @type {?} */
    Notification.prototype.scheduledDate;
    /** @type {?} */
    Notification.prototype.apps;
    /** @type {?} */
    Notification.prototype.sender;
    /** @type {?} */
    Notification.prototype.senderRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBU1osd0NBQWE7OztJQXNDL0MsQ0FBQztJQTlCQztRQVBDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7WUFDeEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztZQUNwRCxRQUFRLEVBQUUsSUFBSTtZQUNkLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7OzhDQUNpRDtJQUluRDtRQUZDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdEUsVUFBVSxDQUFDLGNBQWMsQ0FBQzs7K0NBQ2I7SUFHZDtRQURDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUM3RDtJQU9kO1FBTEMsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN4QixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7WUFDNUIsT0FBTyxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ25CLFNBQVMsRUFBRSxhQUFhO1NBQ3pCLENBQUM7MENBQ2MsSUFBSTt1REFBQztJQWNyQjtRQVRDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7WUFDeEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZO1lBQ2hDLGNBQWMsRUFBRSxNQUFNO1lBQ3RCLElBQUksRUFBRSxTQUFTO1lBQ2YsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3RDLFdBQVcsRUFBRSxFQUFFO1lBQ2YsS0FBSyxFQUFFLFFBQVE7WUFDZixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDOzBDQUNPLElBQUk7Z0RBQUM7SUFwQ0gsWUFBWTtRQVB4QixLQUFLLENBQUM7WUFDTCxTQUFTLEVBQUUsY0FBYztZQUN6QixjQUFjLEVBQUUsZUFBZTtZQUMvQixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQztZQUM3SSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O1lBQ25CLElBQUksRUFBRSxhQUFhO1NBQ3BCLENBQUM7T0FDVyxZQUFZLENBc0N4QjtJQUFELG1CQUFDO0NBQUEsQ0F0Q2lDLGFBQWEsR0FzQzlDO1NBdENZLFlBQVk7OztJQUN2Qiw0QkFPbUQ7O0lBRW5ELDZCQUVjOztJQUVkLDRCQUNjOztJQUVkLHFDQUtxQjs7SUFHckIsNEJBQXFCOztJQUVyQiw4QkFTYzs7SUFDZCxpQ0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFZGl0YWJsZSB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvZWRpdGFibGUvZWRpdGFibGUuZGVjb3JhdG9yJztcbmltcG9ydCB7IFNlYXJjaGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL3NlYXJjaGFibGUvc2VhcmNoYWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRm9ybUZpZWxkVHlwZSwgSU5vdGlmaWNhdGlvbiB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2VyL3VzZXIuaW50ZXJmYWNlJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnTm90aWZpY2F0aW9uJyxcbiAgY29sbGVjdGlvbk5hbWU6ICdub3RpZmljYXRpb25zJyxcbiAgZmllbGRzOiBbJyonLCAnc2VuZGVyLl9pZCcsICdzZW5kZXIuZmlyc3ROYW1lJywgJ3NlbmRlci5sYXN0TmFtZScsICdzZW5kZXIudXNlcm5hbWUnLCAnc2VuZGVyLmltYWdlRGF0YScsICdzZW5kZXIuZW1haWwnLCAnc2VuZGVyLnRlbGVwaG9uZSddLFxuICBpbmNsdWRlOiBbJ3NlbmRlciddLCAvLydjcmVhdG9yJ1xuICBpY29uOiAneW8tYWN0aXZpdHknXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIElOb3RpZmljYXRpb24ge1xuICBARWRpdGFibGUoJ05vdGlmaWNhdGlvbicsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICB0cmFuc2xhdGU6IHRydWUsXG4gICAgdmFsdWVzOiBbJ2VtYWlsJywgJ25vdGlmaWNhdGlvbicsICdhbGxub3RpZmljYXRpb24nXSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBmaWx0ZXJhYmxlOiB0cnVlXG4gIH0pXG4gIG1vZGU6ICdlbWFpbCcgfCAnbm90aWZpY2F0aW9uJyB8ICdhbGxub3RpZmljYXRpb24nO1xuXG4gIEBFZGl0YWJsZSgnTm90aWZpY2F0aW9uJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsIHJlcXVpcmVkOiB0cnVlIH0pXG4gIEBTZWFyY2hhYmxlKCdOb3RpZmljYXRpb24nKVxuICB0aXRsZTogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTm90aWZpY2F0aW9uJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLCByZXF1aXJlZDogdHJ1ZSB9KVxuICBib2R5Pzogc3RyaW5nO1xuXG4gIEBFZGl0YWJsZSgnTm90aWZpY2F0aW9uJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUsXG4gICAgbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICBjb25kaXRpb246ICdtb2RlIT1cInNtc1wiJ1xuICB9KVxuICBzY2hlZHVsZWREYXRlPzogRGF0ZTtcblxuICAvL0BFZGl0YWJsZSgnTm90aWZpY2F0aW9uJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSwgdmFsdWVzOiBbJ2NvbS5pcGVsaWEueW9vYmljdjMnLCAnY29tLmtlcmluZy55b29iaWMnLCAnY29tLmlwZWxpYS55b29hc2snXSwgY29uZGl0aW9uOiBST0xFU19DT05ESVRJT05TLmlzQWRtaW4sIGNsZWFyYWJsZTogdHJ1ZSwgdHJhbnNsYXRlOiB0cnVlLCBtdWx0aXBsZTogdHJ1ZSwgYWR2YW5jZWQ6IHRydWUgfSlcbiAgYXBwcz86IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdOb3RpZmljYXRpb24nLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgY29sbGVjdGlvbk5hbWU6ICd1c2VyJyxcbiAgICBpY29uOiAneW8tdXNlcicsXG4gICAgY29sdW1uRGVmaW5pdGlvbjogeyBuYW1lOiAndXNlcm5hbWUnIH0sXG4gICAgZXhwb3J0T3JkZXI6IDI0LFxuICAgIHRpdGxlOiAnU0VOREJZJyxcbiAgICBmaWx0ZXJhYmxlOiB0cnVlXG4gIH0pXG4gIHNlbmRlcj86IFVzZXI7XG4gIHNlbmRlclJlZj86IHN0cmluZztcbn1cbiJdfQ==