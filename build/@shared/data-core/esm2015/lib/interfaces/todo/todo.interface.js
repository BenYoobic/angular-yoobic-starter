/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Model } from '../../decorators/model/model.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, ITodo, ITodoTask, ITodoTaskSimple } from '@shared/stencil';
import { User } from '../user/user.interface';
/**
 * @return {?}
 */
export function onUserMeActionHandler() {
    this.selectMatch(this.session.user);
}
let Todo = class Todo extends ITodo {
};
tslib_1.__decorate([
    Editable('Todo', { type: FormFieldType.text, name: 'title', required: true }),
    tslib_1.__metadata("design:type", String)
], Todo.prototype, "title", void 0);
tslib_1.__decorate([
    Editable('Todo', {
        title: 'ASSIGNTO',
        name: 'user',
        type: FormFieldType.autocomplete,
        collectionName: 'user',
        queryFields: User.getSimpleFields(),
        multiple: false,
        required: true,
        extraButton: { title: 'ASSIGNTO', buttons: [{ text: 'ME', handler: onUserMeActionHandler }] }
    }),
    tslib_1.__metadata("design:type", Object)
], Todo.prototype, "user", void 0);
tslib_1.__decorate([
    Editable('Todo', {
        title: 'DUEDATE',
        type: FormFieldType.datetime,
        required: false,
        clearable: true,
        minDate: new Date(),
        secondary: true,
        icon: 'yo-calendar'
    }),
    tslib_1.__metadata("design:type", Date)
], Todo.prototype, "duedate", void 0);
tslib_1.__decorate([
    Editable('Todo', {
        title: 'NOTIFICATIONEMAILS',
        type: FormFieldType.emailreport,
        showUsers: true,
        secondary: true,
        icon: 'yo-email'
    }),
    tslib_1.__metadata("design:type", Array)
], Todo.prototype, "notificationemail", void 0);
tslib_1.__decorate([
    Editable('Todo', {
        title: 'REMINDER',
        type: FormFieldType.datetime,
        required: false,
        clearable: true,
        secondary: true,
        icon: 'yo-activity'
    }),
    tslib_1.__metadata("design:type", Date)
], Todo.prototype, "reminderdate", void 0);
tslib_1.__decorate([
    Editable('Todo', { type: FormFieldType.starrating, secondary: true, icon: 'yo-priority' }),
    tslib_1.__metadata("design:type", Number)
], Todo.prototype, "priority", void 0);
Todo = tslib_1.__decorate([
    Model({ className: 'Todo' })
], Todo);
export { Todo };
if (false) {
    /** @type {?} */
    Todo.prototype.title;
    /** @type {?} */
    Todo.prototype.user;
    /** @type {?} */
    Todo.prototype.duedate;
    /** @type {?} */
    Todo.prototype.notificationemail;
    /** @type {?} */
    Todo.prototype.reminderdate;
    /** @type {?} */
    Todo.prototype.priority;
    /** @type {?} */
    Todo.prototype.field;
}
let TodoTask = class TodoTask extends ITodoTask {
};
tslib_1.__decorate([
    Editable('TodoTask', { type: FormFieldType.text, title: 'TITLE', required: true }),
    tslib_1.__metadata("design:type", Object)
], TodoTask.prototype, "text", void 0);
tslib_1.__decorate([
    Editable('TodoTask', { type: FormFieldType.textarea, required: false }),
    tslib_1.__metadata("design:type", Object)
], TodoTask.prototype, "comments", void 0);
tslib_1.__decorate([
    Editable('TodoTask', {
        type: FormFieldType.datetime,
        required: false,
        clearable: true,
        minDate: new Date()
    }),
    tslib_1.__metadata("design:type", Object)
], TodoTask.prototype, "duedate", void 0);
tslib_1.__decorate([
    Editable('TodoTask', { type: FormFieldType.toggle, required: false, title: 'PHOTO', flex: 50 }),
    tslib_1.__metadata("design:type", Object)
], TodoTask.prototype, "hasphoto", void 0);
tslib_1.__decorate([
    Editable('TodoTask', {
        type: FormFieldType.toggle,
        required: false,
        title: 'MANDATORYPHOTO',
        flex: 50,
        condition: 'hasphoto.value==1'
    }),
    tslib_1.__metadata("design:type", Object)
], TodoTask.prototype, "isphotorequired", void 0);
tslib_1.__decorate([
    Editable('TodoTask', {
        type: FormFieldType.toggle,
        required: false,
        title: 'ALLOWLIBRARY',
        flex: 50,
        condition: 'hasphoto.value==1'
    }),
    tslib_1.__metadata("design:type", Object)
], TodoTask.prototype, "allowLibrary", void 0);
TodoTask = tslib_1.__decorate([
    Model({ className: 'TodoTask' })
], TodoTask);
export { TodoTask };
if (false) {
    /** @type {?} */
    TodoTask.prototype.text;
    /** @type {?} */
    TodoTask.prototype.comments;
    /** @type {?} */
    TodoTask.prototype.duedate;
    /** @type {?} */
    TodoTask.prototype.hasphoto;
    /** @type {?} */
    TodoTask.prototype.isphotorequired;
    /** @type {?} */
    TodoTask.prototype.allowLibrary;
    /** @type {?} */
    TodoTask.prototype.field;
}
let TodoTaskSimple = class TodoTaskSimple extends ITodoTaskSimple {
};
tslib_1.__decorate([
    Editable('TodoTaskSimple', {
        type: FormFieldType.textarea,
        title: 'DESCRIPTION',
        required: true
    }),
    tslib_1.__metadata("design:type", Object)
], TodoTaskSimple.prototype, "text", void 0);
tslib_1.__decorate([
    Editable('TodoTaskSimple', {
        title: 'ASSIGNTO',
        name: 'user',
        type: FormFieldType.autocomplete,
        queryFields: User.getSimpleFields(),
        collectionName: 'user',
        multiple: false,
        required: true,
        extraButton: { title: 'ASSIGNTO', buttons: [{ text: 'ME', handler: onUserMeActionHandler }] }
    }),
    tslib_1.__metadata("design:type", Object)
], TodoTaskSimple.prototype, "user", void 0);
tslib_1.__decorate([
    Editable('TodoTaskSimple', {
        type: FormFieldType.datetime,
        required: false,
        clearable: true,
        minDate: new Date()
    }),
    tslib_1.__metadata("design:type", Object)
], TodoTaskSimple.prototype, "duedate", void 0);
tslib_1.__decorate([
    Editable('TodoTaskSimple', {
        type: FormFieldType.toggle,
        required: false,
        title: 'ASKFORPHOTO',
        flex: 50
    }),
    tslib_1.__metadata("design:type", Object)
], TodoTaskSimple.prototype, "hasphoto", void 0);
tslib_1.__decorate([
    Editable('TodoTaskSimple', {
        type: FormFieldType.toggle,
        required: false,
        title: 'MANDATORYPHOTO',
        flex: 50,
        condition: 'hasphoto.value==1'
    }),
    tslib_1.__metadata("design:type", Object)
], TodoTaskSimple.prototype, "isphotorequired", void 0);
tslib_1.__decorate([
    Editable('TodoTaskSimple', {
        type: FormFieldType.toggle,
        required: false,
        title: 'ALLOWLIBRARY',
        flex: 50,
        condition: 'hasphoto.value==1'
    }),
    tslib_1.__metadata("design:type", Object)
], TodoTaskSimple.prototype, "allowLibrary", void 0);
TodoTaskSimple = tslib_1.__decorate([
    Model({ className: 'TodoTaskSimple' })
], TodoTaskSimple);
export { TodoTaskSimple };
if (false) {
    /** @type {?} */
    TodoTaskSimple.prototype.text;
    /** @type {?} */
    TodoTaskSimple.prototype.user;
    /** @type {?} */
    TodoTaskSimple.prototype.duedate;
    /** @type {?} */
    TodoTaskSimple.prototype.hasphoto;
    /** @type {?} */
    TodoTaskSimple.prototype.isphotorequired;
    /** @type {?} */
    TodoTaskSimple.prototype.allowLibrary;
    /** @type {?} */
    TodoTaskSimple.prototype.field;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kby5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy90b2RvL3RvZG8uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQWMsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0YsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBRTlDLE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLENBQUM7SUFHWSxJQUFJLFNBQUosSUFBSyxTQUFRLEtBQUs7Q0FrRDlCLENBQUE7QUFoREM7SUFEQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21DQUNoRTtBQVlkO0lBVkMsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNoQixLQUFLLEVBQUUsVUFBVTtRQUNqQixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtRQUNoQyxjQUFjLEVBQUUsTUFBTTtRQUN0QixXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUNuQyxRQUFRLEVBQUUsS0FBSztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFF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QWEsQ0FBQyxNQUFNO1FBQzFCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsS0FBSyxFQUFFLGFBQWE7UUFDcEIsSUFBSSxFQUFFLEVBQUU7S0FDVCxDQUFDOztnREFDNEI7QUFTOUI7SUFQQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDMUIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNO1FBQzFCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxtQkFBbUI7S0FDL0IsQ0FBQzs7dURBQ21DO0FBU3JDO0lBUEMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQzFCLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtRQUMxQixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxjQUFjO1FBQ3JCLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLG1CQUFtQjtLQUMvQixDQUFDOztvREFDZ0M7QUFwRHZCLGNBQWM7SUFEMUIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUM7R0FDMUIsY0FBYyxDQXNEMUI7U0F0RFksY0FBYzs7O0lBQ3pCLDhCQUt3Qjs7SUFFeEIsOEJBVVU7O0lBRVYsaUNBTTBCOztJQUUxQixrQ0FNOEI7O0lBRTlCLHlDQU9xQzs7SUFFckMsc0NBT2tDOztJQUNsQywrQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL2RlY29yYXRvcnMvbW9kZWwvbW9kZWwuZGVjb3JhdG9yJztcbmltcG9ydCB7IEVkaXRhYmxlIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9lZGl0YWJsZS9lZGl0YWJsZS5kZWNvcmF0b3InO1xuaW1wb3J0IHsgSUZvcm1GaWVsZCwgRm9ybUZpZWxkVHlwZSwgSVRvZG8sIElUb2RvVGFzaywgSVRvZG9UYXNrU2ltcGxlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2VyL3VzZXIuaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG9uVXNlck1lQWN0aW9uSGFuZGxlcigpIHtcbiAgdGhpcy5zZWxlY3RNYXRjaCh0aGlzLnNlc3Npb24udXNlcik7XG59XG5cbkBNb2RlbCh7IGNsYXNzTmFtZTogJ1RvZG8nIH0pXG5leHBvcnQgY2xhc3MgVG9kbyBleHRlbmRzIElUb2RvIHtcbiAgQEVkaXRhYmxlKCdUb2RvJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHQsIG5hbWU6ICd0aXRsZScsIHJlcXVpcmVkOiB0cnVlIH0pXG4gIHRpdGxlOiBzdHJpbmc7XG5cbiAgQEVkaXRhYmxlKCdUb2RvJywge1xuICAgIHRpdGxlOiAnQVNTSUdOVE8nLFxuICAgIG5hbWU6ICd1c2VyJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3VzZXInLFxuICAgIHF1ZXJ5RmllbGRzOiBVc2VyLmdldFNpbXBsZUZpZWxkcygpLFxuICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBleHRyYUJ1dHRvbjogeyB0aXRsZTogJ0FTU0lHTlRPJywgYnV0dG9uczogW3sgdGV4dDogJ01FJywgaGFuZGxlcjogb25Vc2VyTWVBY3Rpb25IYW5kbGVyIH1dIH1cbiAgfSlcbiAgdXNlcjogYW55O1xuXG4gIEBFZGl0YWJsZSgnVG9kbycsIHtcbiAgICB0aXRsZTogJ0RVRURBVEUnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGNsZWFyYWJsZTogdHJ1ZSxcbiAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxuICAgIHNlY29uZGFyeTogdHJ1ZSxcbiAgICBpY29uOiAneW8tY2FsZW5kYXInXG4gIH0pXG4gIGR1ZWRhdGU6IERhdGU7XG5cbiAgQEVkaXRhYmxlKCdUb2RvJywge1xuICAgIHRpdGxlOiAnTk9USUZJQ0FUSU9ORU1BSUxTJyxcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmVtYWlscmVwb3J0LFxuICAgIHNob3dVc2VyczogdHJ1ZSxcbiAgICBzZWNvbmRhcnk6IHRydWUsXG4gICAgaWNvbjogJ3lvLWVtYWlsJ1xuICB9KVxuICBub3RpZmljYXRpb25lbWFpbD86IEFycmF5PHN0cmluZz47XG5cbiAgQEVkaXRhYmxlKCdUb2RvJywge1xuICAgIHRpdGxlOiAnUkVNSU5ERVInLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGNsZWFyYWJsZTogdHJ1ZSxcbiAgICBzZWNvbmRhcnk6IHRydWUsXG4gICAgaWNvbjogJ3lvLWFjdGl2aXR5J1xuICB9KVxuICByZW1pbmRlcmRhdGU/OiBEYXRlO1xuXG4gIEBFZGl0YWJsZSgnVG9kbycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS5zdGFycmF0aW5nLCBzZWNvbmRhcnk6IHRydWUsIGljb246ICd5by1wcmlvcml0eScgfSlcbiAgcHJpb3JpdHk/OiBudW1iZXI7XG5cbiAgZmllbGQ/OiBJRm9ybUZpZWxkO1xufVxuXG5ATW9kZWwoeyBjbGFzc05hbWU6ICdUb2RvVGFzaycgfSlcbmV4cG9ydCBjbGFzcyBUb2RvVGFzayBleHRlbmRzIElUb2RvVGFzayB7XG4gIEBFZGl0YWJsZSgnVG9kb1Rhc2snLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgdGl0bGU6ICdUSVRMRScsIHJlcXVpcmVkOiB0cnVlIH0pXG4gIHRleHQ6IHsgdmFsdWU6IHN0cmluZyB9O1xuXG4gIEBFZGl0YWJsZSgnVG9kb1Rhc2snLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEsIHJlcXVpcmVkOiBmYWxzZSB9KVxuICBjb21tZW50cz86IHsgdmFsdWU6IHN0cmluZyB9O1xuXG4gIEBFZGl0YWJsZSgnVG9kb1Rhc2snLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRldGltZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgY2xlYXJhYmxlOiB0cnVlLFxuICAgIG1pbkRhdGU6IG5ldyBEYXRlKClcbiAgfSlcbiAgZHVlZGF0ZT86IHsgdmFsdWU6IERhdGUgfTtcblxuICBARWRpdGFibGUoJ1RvZG9UYXNrJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSwgcmVxdWlyZWQ6IGZhbHNlLCB0aXRsZTogJ1BIT1RPJywgZmxleDogNTAgfSlcbiAgaGFzcGhvdG8/OiB7IHZhbHVlOiBib29sZWFuIH07XG5cbiAgQEVkaXRhYmxlKCdUb2RvVGFzaycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdGl0bGU6ICdNQU5EQVRPUllQSE9UTycsXG4gICAgZmxleDogNTAsXG4gICAgY29uZGl0aW9uOiAnaGFzcGhvdG8udmFsdWU9PTEnXG4gIH0pXG4gIGlzcGhvdG9yZXF1aXJlZD86IHsgdmFsdWU6IGJvb2xlYW4gfTtcblxuICBARWRpdGFibGUoJ1RvZG9UYXNrJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0aXRsZTogJ0FMTE9XTElCUkFSWScsXG4gICAgZmxleDogNTAsXG4gICAgY29uZGl0aW9uOiAnaGFzcGhvdG8udmFsdWU9PTEnXG4gIH0pXG4gIGFsbG93TGlicmFyeT86IHsgdmFsdWU6IGJvb2xlYW4gfTtcblxuICBmaWVsZD86IElGb3JtRmllbGQ7XG59XG5cbkBNb2RlbCh7IGNsYXNzTmFtZTogJ1RvZG9UYXNrU2ltcGxlJyB9KVxuZXhwb3J0IGNsYXNzIFRvZG9UYXNrU2ltcGxlIGV4dGVuZHMgSVRvZG9UYXNrU2ltcGxlIHtcbiAgQEVkaXRhYmxlKCdUb2RvVGFza1NpbXBsZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRleHRhcmVhLFxuICAgIHRpdGxlOiAnREVTQ1JJUFRJT04nLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0pXG4gIHRleHQ6IHsgdmFsdWU6IHN0cmluZyB9O1xuXG4gIEBFZGl0YWJsZSgnVG9kb1Rhc2tTaW1wbGUnLCB7XG4gICAgdGl0bGU6ICdBU1NJR05UTycsXG4gICAgbmFtZTogJ3VzZXInLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIHF1ZXJ5RmllbGRzOiBVc2VyLmdldFNpbXBsZUZpZWxkcygpLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAndXNlcicsXG4gICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGV4dHJhQnV0dG9uOiB7IHRpdGxlOiAnQVNTSUdOVE8nLCBidXR0b25zOiBbeyB0ZXh0OiAnTUUnLCBoYW5kbGVyOiBvblVzZXJNZUFjdGlvbkhhbmRsZXIgfV0gfVxuICB9KVxuICB1c2VyOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdUb2RvVGFza1NpbXBsZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGV0aW1lLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgbWluRGF0ZTogbmV3IERhdGUoKVxuICB9KVxuICBkdWVkYXRlPzogeyB2YWx1ZTogRGF0ZSB9O1xuXG4gIEBFZGl0YWJsZSgnVG9kb1Rhc2tTaW1wbGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRpdGxlOiAnQVNLRk9SUEhPVE8nLFxuICAgIGZsZXg6IDUwXG4gIH0pXG4gIGhhc3Bob3RvPzogeyB2YWx1ZTogYm9vbGVhbiB9O1xuXG4gIEBFZGl0YWJsZSgnVG9kb1Rhc2tTaW1wbGUnLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRpdGxlOiAnTUFOREFUT1JZUEhPVE8nLFxuICAgIGZsZXg6IDUwLFxuICAgIGNvbmRpdGlvbjogJ2hhc3Bob3RvLnZhbHVlPT0xJ1xuICB9KVxuICBpc3Bob3RvcmVxdWlyZWQ/OiB7IHZhbHVlOiBib29sZWFuIH07XG5cbiAgQEVkaXRhYmxlKCdUb2RvVGFza1NpbXBsZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdGl0bGU6ICdBTExPV0xJQlJBUlknLFxuICAgIGZsZXg6IDUwLFxuICAgIGNvbmRpdGlvbjogJ2hhc3Bob3RvLnZhbHVlPT0xJ1xuICB9KVxuICBhbGxvd0xpYnJhcnk/OiB7IHZhbHVlOiBib29sZWFuIH07XG4gIGZpZWxkPzogSUZvcm1GaWVsZDtcbn1cbiJdfQ==