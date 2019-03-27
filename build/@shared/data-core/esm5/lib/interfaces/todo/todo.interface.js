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
var Todo = /** @class */ (function (_super) {
    tslib_1.__extends(Todo, _super);
    function Todo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return Todo;
}(ITodo));
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
var TodoTask = /** @class */ (function (_super) {
    tslib_1.__extends(TodoTask, _super);
    function TodoTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return TodoTask;
}(ITodoTask));
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
var TodoTaskSimple = /** @class */ (function (_super) {
    tslib_1.__extends(TodoTaskSimple, _super);
    function TodoTaskSimple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return TodoTaskSimple;
}(ITodoTaskSimple));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kby5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy90b2RvL3RvZG8uaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEVBQWMsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0YsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBRTlDLE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLENBQUM7O0lBR3lCLGdDQUFLOzs7SUFrRC9CLENBQUM7SUFoREM7UUFEQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3VDQUNoRTtJQVlkO1FBVkMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNoQixLQUFLLEVBQUUsVUFBVTtZQUNqQixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtZQUNoQyxjQUFjLEVBQUUsTUFBTTtZQUN0QixXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNuQyxRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBRTtTQUM5RixDQUFDOztzQ0FDUTtJQVdWO1FBVEMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNoQixLQUFLLEVBQUUsU0FBUztZQUNoQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7WUFDNUIsUUFBUSxFQUFFLEtBQUs7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJLElBQUksRUFBRTtZQUNuQixTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRSxhQUFhO1NBQ3BCLENBQUM7MENBQ08sSUFBSTt5Q0FBQztJQVNkO1FBUEMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNoQixLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLElBQUksRUFBRSxhQUFhLENBQUMsV0FBVztZQUMvQixTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLFVBQVU7U0FDakIsQ0FBQzswQ0FDa0IsS0FBSzttREFBUztJQVVsQztRQVJDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDaEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1lBQzVCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRSxhQUFhO1NBQ3BCLENBQUM7MENBQ2EsSUFBSTs4Q0FBQztJQUdwQjtRQURDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQzs7MENBQ3pFO0lBL0NQLElBQUk7UUFEaEIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ2hCLElBQUksQ0FrRGhCO0lBQUQsV0FBQztDQUFBLENBbER5QixLQUFLLEdBa0Q5QjtTQWxEWSxJQUFJOzs7SUFDZixxQkFDYzs7SUFFZCxvQkFVVTs7SUFFVix1QkFTYzs7SUFFZCxpQ0FPa0M7O0lBRWxDLDRCQVFvQjs7SUFFcEIsd0JBQ2tCOztJQUVsQixxQkFBbUI7OztJQUlTLG9DQUFTOzs7SUFxQ3ZDLENBQUM7SUFuQ0M7UUFEQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzBDQUMzRDtJQUd4QjtRQURDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzhDQUMzQztJQVE3QjtRQU5DLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1lBQzVCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxJQUFJLEVBQUU7U0FDcEIsQ0FBQzs7NkNBQ3dCO0lBRzFCO1FBREMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7OzhDQUNsRTtJQVM5QjtRQVBDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNO1lBQzFCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxtQkFBbUI7U0FDL0IsQ0FBQzs7cURBQ21DO0lBU3JDO1FBUEMsUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLEVBQUUsYUFBYSxDQUFDLE1BQU07WUFDMUIsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsY0FBYztZQUNyQixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxtQkFBbUI7U0FDL0IsQ0FBQzs7a0RBQ2dDO0lBbEN2QixRQUFRO1FBRHBCLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQztPQUNwQixRQUFRLENBcUNwQjtJQUFELGVBQUM7Q0FBQSxDQXJDNkIsU0FBUyxHQXFDdEM7U0FyQ1ksUUFBUTs7O0lBQ25CLHdCQUN3Qjs7SUFFeEIsNEJBQzZCOztJQUU3QiwyQkFNMEI7O0lBRTFCLDRCQUM4Qjs7SUFFOUIsbUNBT3FDOztJQUVyQyxnQ0FPa0M7O0lBRWxDLHlCQUFtQjs7O0lBSWUsMENBQWU7OztJQXNEbkQsQ0FBQztJQWhEQztRQUxDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7WUFDNUIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDOztnREFDc0I7SUFZeEI7UUFWQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsS0FBSyxFQUFFLFVBQVU7WUFDakIsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVk7WUFDaEMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDbkMsY0FBYyxFQUFFLE1BQU07WUFDdEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsSUFBSTtZQUNkLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDLEVBQUU7U0FDOUYsQ0FBQzs7Z0RBQ1E7SUFRVjtRQU5DLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMxQixJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVE7WUFDNUIsUUFBUSxFQUFFLEtBQUs7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJLElBQUksRUFBRTtTQUNwQixDQUFDOzttREFDd0I7SUFRMUI7UUFOQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNO1lBQzFCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLGFBQWE7WUFDcEIsSUFBSSxFQUFFLEVBQUU7U0FDVCxDQUFDOztvREFDNEI7SUFTOUI7UUFQQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxNQUFNO1lBQzFCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixJQUFJLEVBQUUsRUFBRTtZQUNSLFNBQVMsRUFBRSxtQkFBbUI7U0FDL0IsQ0FBQzs7MkRBQ21DO0lBU3JDO1FBUEMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQzFCLElBQUksRUFBRSxhQUFhLENBQUMsTUFBTTtZQUMxQixRQUFRLEVBQUUsS0FBSztZQUNmLEtBQUssRUFBRSxjQUFjO1lBQ3JCLElBQUksRUFBRSxFQUFFO1lBQ1IsU0FBUyxFQUFFLG1CQUFtQjtTQUMvQixDQUFDOzt3REFDZ0M7SUFwRHZCLGNBQWM7UUFEMUIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUM7T0FDMUIsY0FBYyxDQXNEMUI7SUFBRCxxQkFBQztDQUFBLENBdERtQyxlQUFlLEdBc0RsRDtTQXREWSxjQUFjOzs7SUFDekIsOEJBS3dCOztJQUV4Qiw4QkFVVTs7SUFFVixpQ0FNMEI7O0lBRTFCLGtDQU04Qjs7SUFFOUIseUNBT3FDOztJQUVyQyxzQ0FPa0M7O0lBQ2xDLCtCQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vZGVjb3JhdG9ycy9tb2RlbC9tb2RlbC5kZWNvcmF0b3InO1xuaW1wb3J0IHsgRWRpdGFibGUgfSBmcm9tICcuLi8uLi9kZWNvcmF0b3JzL2VkaXRhYmxlL2VkaXRhYmxlLmRlY29yYXRvcic7XG5pbXBvcnQgeyBJRm9ybUZpZWxkLCBGb3JtRmllbGRUeXBlLCBJVG9kbywgSVRvZG9UYXNrLCBJVG9kb1Rhc2tTaW1wbGUgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXIvdXNlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gb25Vc2VyTWVBY3Rpb25IYW5kbGVyKCkge1xuICB0aGlzLnNlbGVjdE1hdGNoKHRoaXMuc2Vzc2lvbi51c2VyKTtcbn1cblxuQE1vZGVsKHsgY2xhc3NOYW1lOiAnVG9kbycgfSlcbmV4cG9ydCBjbGFzcyBUb2RvIGV4dGVuZHMgSVRvZG8ge1xuICBARWRpdGFibGUoJ1RvZG8nLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dCwgbmFtZTogJ3RpdGxlJywgcmVxdWlyZWQ6IHRydWUgfSlcbiAgdGl0bGU6IHN0cmluZztcblxuICBARWRpdGFibGUoJ1RvZG8nLCB7XG4gICAgdGl0bGU6ICdBU1NJR05UTycsXG4gICAgbmFtZTogJ3VzZXInLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuYXV0b2NvbXBsZXRlLFxuICAgIGNvbGxlY3Rpb25OYW1lOiAndXNlcicsXG4gICAgcXVlcnlGaWVsZHM6IFVzZXIuZ2V0U2ltcGxlRmllbGRzKCksXG4gICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGV4dHJhQnV0dG9uOiB7IHRpdGxlOiAnQVNTSUdOVE8nLCBidXR0b25zOiBbeyB0ZXh0OiAnTUUnLCBoYW5kbGVyOiBvblVzZXJNZUFjdGlvbkhhbmRsZXIgfV0gfVxuICB9KVxuICB1c2VyOiBhbnk7XG5cbiAgQEVkaXRhYmxlKCdUb2RvJywge1xuICAgIHRpdGxlOiAnRFVFREFURScsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRldGltZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgY2xlYXJhYmxlOiB0cnVlLFxuICAgIG1pbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgc2Vjb25kYXJ5OiB0cnVlLFxuICAgIGljb246ICd5by1jYWxlbmRhcidcbiAgfSlcbiAgZHVlZGF0ZTogRGF0ZTtcblxuICBARWRpdGFibGUoJ1RvZG8nLCB7XG4gICAgdGl0bGU6ICdOT1RJRklDQVRJT05FTUFJTFMnLFxuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZW1haWxyZXBvcnQsXG4gICAgc2hvd1VzZXJzOiB0cnVlLFxuICAgIHNlY29uZGFyeTogdHJ1ZSxcbiAgICBpY29uOiAneW8tZW1haWwnXG4gIH0pXG4gIG5vdGlmaWNhdGlvbmVtYWlsPzogQXJyYXk8c3RyaW5nPjtcblxuICBARWRpdGFibGUoJ1RvZG8nLCB7XG4gICAgdGl0bGU6ICdSRU1JTkRFUicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5kYXRldGltZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgY2xlYXJhYmxlOiB0cnVlLFxuICAgIHNlY29uZGFyeTogdHJ1ZSxcbiAgICBpY29uOiAneW8tYWN0aXZpdHknXG4gIH0pXG4gIHJlbWluZGVyZGF0ZT86IERhdGU7XG5cbiAgQEVkaXRhYmxlKCdUb2RvJywgeyB0eXBlOiBGb3JtRmllbGRUeXBlLnN0YXJyYXRpbmcsIHNlY29uZGFyeTogdHJ1ZSwgaWNvbjogJ3lvLXByaW9yaXR5JyB9KVxuICBwcmlvcml0eT86IG51bWJlcjtcblxuICBmaWVsZD86IElGb3JtRmllbGQ7XG59XG5cbkBNb2RlbCh7IGNsYXNzTmFtZTogJ1RvZG9UYXNrJyB9KVxuZXhwb3J0IGNsYXNzIFRvZG9UYXNrIGV4dGVuZHMgSVRvZG9UYXNrIHtcbiAgQEVkaXRhYmxlKCdUb2RvVGFzaycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0LCB0aXRsZTogJ1RJVExFJywgcmVxdWlyZWQ6IHRydWUgfSlcbiAgdGV4dDogeyB2YWx1ZTogc3RyaW5nIH07XG5cbiAgQEVkaXRhYmxlKCdUb2RvVGFzaycsIHsgdHlwZTogRm9ybUZpZWxkVHlwZS50ZXh0YXJlYSwgcmVxdWlyZWQ6IGZhbHNlIH0pXG4gIGNvbW1lbnRzPzogeyB2YWx1ZTogc3RyaW5nIH07XG5cbiAgQEVkaXRhYmxlKCdUb2RvVGFzaycsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmRhdGV0aW1lLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBjbGVhcmFibGU6IHRydWUsXG4gICAgbWluRGF0ZTogbmV3IERhdGUoKVxuICB9KVxuICBkdWVkYXRlPzogeyB2YWx1ZTogRGF0ZSB9O1xuXG4gIEBFZGl0YWJsZSgnVG9kb1Rhc2snLCB7IHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLCByZXF1aXJlZDogZmFsc2UsIHRpdGxlOiAnUEhPVE8nLCBmbGV4OiA1MCB9KVxuICBoYXNwaG90bz86IHsgdmFsdWU6IGJvb2xlYW4gfTtcblxuICBARWRpdGFibGUoJ1RvZG9UYXNrJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0aXRsZTogJ01BTkRBVE9SWVBIT1RPJyxcbiAgICBmbGV4OiA1MCxcbiAgICBjb25kaXRpb246ICdoYXNwaG90by52YWx1ZT09MSdcbiAgfSlcbiAgaXNwaG90b3JlcXVpcmVkPzogeyB2YWx1ZTogYm9vbGVhbiB9O1xuXG4gIEBFZGl0YWJsZSgnVG9kb1Rhc2snLCB7XG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS50b2dnbGUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHRpdGxlOiAnQUxMT1dMSUJSQVJZJyxcbiAgICBmbGV4OiA1MCxcbiAgICBjb25kaXRpb246ICdoYXNwaG90by52YWx1ZT09MSdcbiAgfSlcbiAgYWxsb3dMaWJyYXJ5PzogeyB2YWx1ZTogYm9vbGVhbiB9O1xuXG4gIGZpZWxkPzogSUZvcm1GaWVsZDtcbn1cblxuQE1vZGVsKHsgY2xhc3NOYW1lOiAnVG9kb1Rhc2tTaW1wbGUnIH0pXG5leHBvcnQgY2xhc3MgVG9kb1Rhc2tTaW1wbGUgZXh0ZW5kcyBJVG9kb1Rhc2tTaW1wbGUge1xuICBARWRpdGFibGUoJ1RvZG9UYXNrU2ltcGxlJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudGV4dGFyZWEsXG4gICAgdGl0bGU6ICdERVNDUklQVElPTicsXG4gICAgcmVxdWlyZWQ6IHRydWVcbiAgfSlcbiAgdGV4dDogeyB2YWx1ZTogc3RyaW5nIH07XG5cbiAgQEVkaXRhYmxlKCdUb2RvVGFza1NpbXBsZScsIHtcbiAgICB0aXRsZTogJ0FTU0lHTlRPJyxcbiAgICBuYW1lOiAndXNlcicsXG4gICAgdHlwZTogRm9ybUZpZWxkVHlwZS5hdXRvY29tcGxldGUsXG4gICAgcXVlcnlGaWVsZHM6IFVzZXIuZ2V0U2ltcGxlRmllbGRzKCksXG4gICAgY29sbGVjdGlvbk5hbWU6ICd1c2VyJyxcbiAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZXh0cmFCdXR0b246IHsgdGl0bGU6ICdBU1NJR05UTycsIGJ1dHRvbnM6IFt7IHRleHQ6ICdNRScsIGhhbmRsZXI6IG9uVXNlck1lQWN0aW9uSGFuZGxlciB9XSB9XG4gIH0pXG4gIHVzZXI6IGFueTtcblxuICBARWRpdGFibGUoJ1RvZG9UYXNrU2ltcGxlJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUuZGF0ZXRpbWUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGNsZWFyYWJsZTogdHJ1ZSxcbiAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpXG4gIH0pXG4gIGR1ZWRhdGU/OiB7IHZhbHVlOiBEYXRlIH07XG5cbiAgQEVkaXRhYmxlKCdUb2RvVGFza1NpbXBsZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdGl0bGU6ICdBU0tGT1JQSE9UTycsXG4gICAgZmxleDogNTBcbiAgfSlcbiAgaGFzcGhvdG8/OiB7IHZhbHVlOiBib29sZWFuIH07XG5cbiAgQEVkaXRhYmxlKCdUb2RvVGFza1NpbXBsZScsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLnRvZ2dsZSxcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgdGl0bGU6ICdNQU5EQVRPUllQSE9UTycsXG4gICAgZmxleDogNTAsXG4gICAgY29uZGl0aW9uOiAnaGFzcGhvdG8udmFsdWU9PTEnXG4gIH0pXG4gIGlzcGhvdG9yZXF1aXJlZD86IHsgdmFsdWU6IGJvb2xlYW4gfTtcblxuICBARWRpdGFibGUoJ1RvZG9UYXNrU2ltcGxlJywge1xuICAgIHR5cGU6IEZvcm1GaWVsZFR5cGUudG9nZ2xlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0aXRsZTogJ0FMTE9XTElCUkFSWScsXG4gICAgZmxleDogNTAsXG4gICAgY29uZGl0aW9uOiAnaGFzcGhvdG8udmFsdWU9PTEnXG4gIH0pXG4gIGFsbG93TGlicmFyeT86IHsgdmFsdWU6IGJvb2xlYW4gfTtcbiAgZmllbGQ/OiBJRm9ybUZpZWxkO1xufVxuIl19