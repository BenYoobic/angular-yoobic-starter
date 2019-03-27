/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Entity, Model, Editable } from '@shared/data-core';
import { FormFieldType } from '@shared/stencil';
var Channel = /** @class */ (function (_super) {
    tslib_1.__extends(Channel, _super);
    function Channel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        Editable('Channel', {
            type: FormFieldType.autocomplete,
            collectionName: 'user',
            multiple: true,
            subQuery: { field: 'usersRef', values: '_id', collectionName: 'user' },
            subQueryOverride: { field: 'usersRef', values: '_id', collectionName: 'user' }
        }),
        tslib_1.__metadata("design:type", Array)
    ], Channel.prototype, "users", void 0);
    Channel = tslib_1.__decorate([
        Model({
            className: 'Channel',
            collectionName: 'channel',
            fields: null,
            include: ['users'],
            searchSubquery: { collectionName: 'user', field: 'usersRef', values: '_id' }
        })
    ], Channel);
    return Channel;
}(Entity));
export { Channel };
if (false) {
    /** @type {?} */
    Channel.prototype._id;
    /** @type {?} */
    Channel.prototype._acl;
    /** @type {?} */
    Channel.prototype._lmt;
    /** @type {?} */
    Channel.prototype._ect;
    /** @type {?} */
    Channel.prototype.channel;
    /** @type {?} */
    Channel.prototype.isSupport;
    /** @type {?} */
    Channel.prototype.isFavorite;
    /** @type {?} */
    Channel.prototype.isOnline;
    /** @type {?} */
    Channel.prototype.users;
    /** @type {?} */
    Channel.prototype.others;
    /** @type {?} */
    Channel.prototype.lastMessage;
    /** @type {?} */
    Channel.prototype.lastMessageAlternate;
    /** @type {?} */
    Channel.prototype.lastMessageDate;
    /** @type {?} */
    Channel.prototype.deleteMessages;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWxpdmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9jaGFubmVsL2NoYW5uZWwuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBYyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQVNuQixtQ0FBTTs7O0lBNEJuQyxDQUFDO0lBVEM7UUFQQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWTtZQUNoQyxjQUFjLEVBQUUsTUFBTTtZQUN0QixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFO1lBQ3RFLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUU7U0FDL0UsQ0FBQzswQ0FDSyxLQUFLOzBDQUFPO0lBbkJSLE9BQU87UUFQbkIsS0FBSyxDQUFDO1lBQ0wsU0FBUyxFQUFFLFNBQVM7WUFDcEIsY0FBYyxFQUFFLFNBQVM7WUFDekIsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDbEIsY0FBYyxFQUFFLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7U0FDN0UsQ0FBQztPQUNXLE9BQU8sQ0E0Qm5CO0lBQUQsY0FBQztDQUFBLENBNUI0QixNQUFNLEdBNEJsQztTQTVCWSxPQUFPOzs7SUFFbEIsc0JBQVk7O0lBQ1osdUJBQVc7O0lBQ1gsdUJBQWM7O0lBQ2QsdUJBQWM7O0lBRWQsMEJBQWdCOztJQUNoQiw0QkFBbUI7O0lBQ25CLDZCQUFvQjs7SUFDcEIsMkJBQWtCOztJQUVsQix3QkFPbUI7O0lBRW5CLHlCQUFvQjs7SUFFcEIsOEJBQWlCOztJQUNqQix1Q0FBOEI7O0lBQzlCLGtDQUFzQjs7SUFFdEIsaUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5LCBJQWNsLCBVc2VyLCBNb2RlbCwgRWRpdGFibGUgfSBmcm9tICdAc2hhcmVkL2RhdGEtY29yZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRUeXBlIH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuQE1vZGVsKHtcbiAgY2xhc3NOYW1lOiAnQ2hhbm5lbCcsXG4gIGNvbGxlY3Rpb25OYW1lOiAnY2hhbm5lbCcsXG4gIGZpZWxkczogbnVsbCxcbiAgaW5jbHVkZTogWyd1c2VycyddLFxuICBzZWFyY2hTdWJxdWVyeTogeyBjb2xsZWN0aW9uTmFtZTogJ3VzZXInLCBmaWVsZDogJ3VzZXJzUmVmJywgdmFsdWVzOiAnX2lkJyB9XG59KVxuZXhwb3J0IGNsYXNzIENoYW5uZWwgZXh0ZW5kcyBFbnRpdHkge1xuICAvLyBleHBvcnQgY2xhc3MgQ2hhbm5lbCBpbXBsZW1lbnRzIElFbnRpdHkge1xuICBfaWQ6IHN0cmluZztcbiAgX2FjbDogSUFjbDtcbiAgX2xtdD86IHN0cmluZztcbiAgX2VjdD86IHN0cmluZztcblxuICBjaGFubmVsOiBzdHJpbmc7XG4gIGlzU3VwcG9ydDogYm9vbGVhbjtcbiAgaXNGYXZvcml0ZTogYm9vbGVhbjtcbiAgaXNPbmxpbmU6IGJvb2xlYW47XG4gIC8vQWxsIFVzZXJzIGluIHRoZSBDaGFubmVsXG4gIEBFZGl0YWJsZSgnQ2hhbm5lbCcsIHtcbiAgICB0eXBlOiBGb3JtRmllbGRUeXBlLmF1dG9jb21wbGV0ZSxcbiAgICBjb2xsZWN0aW9uTmFtZTogJ3VzZXInLFxuICAgIG11bHRpcGxlOiB0cnVlLFxuICAgIHN1YlF1ZXJ5OiB7IGZpZWxkOiAndXNlcnNSZWYnLCB2YWx1ZXM6ICdfaWQnLCBjb2xsZWN0aW9uTmFtZTogJ3VzZXInIH0sXG4gICAgc3ViUXVlcnlPdmVycmlkZTogeyBmaWVsZDogJ3VzZXJzUmVmJywgdmFsdWVzOiAnX2lkJywgY29sbGVjdGlvbk5hbWU6ICd1c2VyJyB9XG4gIH0pXG4gIHVzZXJzOiBBcnJheTxVc2VyPjtcbiAgLy9vdGhlciBVc2VycyB0aGFuIHRoZSBsb2dnZWQgaW4gdXNlclxuICBvdGhlcnM6IEFycmF5PFVzZXI+O1xuXG4gIGxhc3RNZXNzYWdlOiBhbnk7XG4gIGxhc3RNZXNzYWdlQWx0ZXJuYXRlOiBib29sZWFuO1xuICBsYXN0TWVzc2FnZURhdGU/OiBhbnk7XG5cbiAgZGVsZXRlTWVzc2FnZXM6IEFycmF5PGFueT47XG59XG4iXX0=