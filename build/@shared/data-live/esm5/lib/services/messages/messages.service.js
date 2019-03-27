/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import { Broker, Requestor } from '@shared/data-core';
var Messages = /** @class */ (function () {
    function Messages(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    Messages.prototype.getJsonMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        return {
            to: message.to,
            content: {
                title: message.title,
                body: message.body,
                //footer: message.footer,
                actionURL: message.actionURL,
                actionText: message.actionText,
                action: message.actionURL ? true : false,
                thankyou: message.thankyou
            }
        };
    };
    /**
     * @param {?} message
     * @return {?}
     */
    Messages.prototype.sendMail = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        return this.rq.post(this.apiUrl + 'mail', this.getJsonMessage(message));
    };
    /**
     * @param {?} emails
     * @return {?}
     */
    Messages.prototype.unblockEmails = /**
     * @param {?} emails
     * @return {?}
     */
    function (emails) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/unblockEmails', { emails: emails });
    };
    Object.defineProperty(Messages.prototype, "apiUrl", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.broker.getApiUrl() + 'Messages/';
        },
        enumerable: true,
        configurable: true
    });
    Messages.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Messages.ctorParameters = function () { return [
        { type: Broker },
        { type: Requestor }
    ]; };
    return Messages;
}());
export { Messages };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Messages.prototype.broker;
    /**
     * @type {?}
     * @private
     */
    Messages.prototype.rq;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9tZXNzYWdlcy9tZXNzYWdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSXREO0lBRUUsa0JBQW9CLE1BQWMsRUFBVSxFQUFhO1FBQXJDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFXO0lBQUcsQ0FBQzs7Ozs7SUFFN0QsaUNBQWM7Ozs7SUFBZCxVQUFlLE9BQWdCO1FBQzdCLE9BQU87WUFDTCxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDZCxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2dCQUNwQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7O2dCQUVsQixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7Z0JBQzVCLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtnQkFDOUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztnQkFDeEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2FBQzNCO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsMkJBQVE7Ozs7SUFBUixVQUFTLE9BQWdCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Ozs7O0lBRUQsZ0NBQWE7Ozs7SUFBYixVQUFjLE1BQXFCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyw2QkFBNkIsRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRUQsc0JBQVksNEJBQU07Ozs7O1FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLFdBQVcsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTs7Z0JBN0JGLFVBQVU7Ozs7Z0JBSkYsTUFBTTtnQkFBRSxTQUFTOztJQWtDMUIsZUFBQztDQUFBLEFBOUJELElBOEJDO1NBN0JZLFFBQVE7Ozs7OztJQUNQLDBCQUFzQjs7Ozs7SUFBRSxzQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTp2YXJpYWJsZS1uYW1lICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm9rZXIsIFJlcXVlc3RvciB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL21lc3NhZ2UvbWVzc2FnZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJva2VyOiBCcm9rZXIsIHByaXZhdGUgcnE6IFJlcXVlc3Rvcikge31cblxuICBnZXRKc29uTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvOiBtZXNzYWdlLnRvLFxuICAgICAgY29udGVudDoge1xuICAgICAgICB0aXRsZTogbWVzc2FnZS50aXRsZSxcbiAgICAgICAgYm9keTogbWVzc2FnZS5ib2R5LFxuICAgICAgICAvL2Zvb3RlcjogbWVzc2FnZS5mb290ZXIsXG4gICAgICAgIGFjdGlvblVSTDogbWVzc2FnZS5hY3Rpb25VUkwsXG4gICAgICAgIGFjdGlvblRleHQ6IG1lc3NhZ2UuYWN0aW9uVGV4dCxcbiAgICAgICAgYWN0aW9uOiBtZXNzYWdlLmFjdGlvblVSTCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgdGhhbmt5b3U6IG1lc3NhZ2UudGhhbmt5b3VcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc2VuZE1haWwobWVzc2FnZTogTWVzc2FnZSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmFwaVVybCArICdtYWlsJywgdGhpcy5nZXRKc29uTWVzc2FnZShtZXNzYWdlKSk7XG4gIH1cblxuICB1bmJsb2NrRW1haWxzKGVtYWlsczogQXJyYXk8c3RyaW5nPik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdidXNpbmVzc2xvZ2ljL3VuYmxvY2tFbWFpbHMnLCB7IGVtYWlscyB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGFwaVVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAnTWVzc2FnZXMvJztcbiAgfVxufVxuIl19