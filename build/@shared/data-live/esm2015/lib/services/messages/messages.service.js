/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:variable-name */
import { Injectable } from '@angular/core';
import { Broker, Requestor } from '@shared/data-core';
export class Messages {
    /**
     * @param {?} broker
     * @param {?} rq
     */
    constructor(broker, rq) {
        this.broker = broker;
        this.rq = rq;
    }
    /**
     * @param {?} message
     * @return {?}
     */
    getJsonMessage(message) {
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
    }
    /**
     * @param {?} message
     * @return {?}
     */
    sendMail(message) {
        return this.rq.post(this.apiUrl + 'mail', this.getJsonMessage(message));
    }
    /**
     * @param {?} emails
     * @return {?}
     */
    unblockEmails(emails) {
        return this.rq.post(this.broker.getApiUrl() + 'businesslogic/unblockEmails', { emails });
    }
    /**
     * @private
     * @return {?}
     */
    get apiUrl() {
        return this.broker.getApiUrl() + 'Messages/';
    }
}
Messages.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Messages.ctorParameters = () => [
    { type: Broker },
    { type: Requestor }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtbGl2ZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9tZXNzYWdlcy9tZXNzYWdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBS3RELE1BQU0sT0FBTyxRQUFROzs7OztJQUNuQixZQUFvQixNQUFjLEVBQVUsRUFBYTtRQUFyQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBVztJQUFHLENBQUM7Ozs7O0lBRTdELGNBQWMsQ0FBQyxPQUFnQjtRQUM3QixPQUFPO1lBQ0wsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztnQkFDcEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJOztnQkFFbEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO2dCQUM1QixVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7Z0JBQzlCLE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7Z0JBQ3hDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTthQUMzQjtTQUNGLENBQUM7SUFDSixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxPQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxNQUFxQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsNkJBQTZCLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7Ozs7O0lBRUQsSUFBWSxNQUFNO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxXQUFXLENBQUM7SUFDL0MsQ0FBQzs7O1lBN0JGLFVBQVU7Ozs7WUFKRixNQUFNO1lBQUUsU0FBUzs7Ozs7OztJQU1aLDBCQUFzQjs7Ozs7SUFBRSxzQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTp2YXJpYWJsZS1uYW1lICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm9rZXIsIFJlcXVlc3RvciB9IGZyb20gJ0BzaGFyZWQvZGF0YS1jb3JlJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL21lc3NhZ2UvbWVzc2FnZS5tb2RlbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYnJva2VyOiBCcm9rZXIsIHByaXZhdGUgcnE6IFJlcXVlc3Rvcikge31cblxuICBnZXRKc29uTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvOiBtZXNzYWdlLnRvLFxuICAgICAgY29udGVudDoge1xuICAgICAgICB0aXRsZTogbWVzc2FnZS50aXRsZSxcbiAgICAgICAgYm9keTogbWVzc2FnZS5ib2R5LFxuICAgICAgICAvL2Zvb3RlcjogbWVzc2FnZS5mb290ZXIsXG4gICAgICAgIGFjdGlvblVSTDogbWVzc2FnZS5hY3Rpb25VUkwsXG4gICAgICAgIGFjdGlvblRleHQ6IG1lc3NhZ2UuYWN0aW9uVGV4dCxcbiAgICAgICAgYWN0aW9uOiBtZXNzYWdlLmFjdGlvblVSTCA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgdGhhbmt5b3U6IG1lc3NhZ2UudGhhbmt5b3VcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc2VuZE1haWwobWVzc2FnZTogTWVzc2FnZSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmFwaVVybCArICdtYWlsJywgdGhpcy5nZXRKc29uTWVzc2FnZShtZXNzYWdlKSk7XG4gIH1cblxuICB1bmJsb2NrRW1haWxzKGVtYWlsczogQXJyYXk8c3RyaW5nPik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh0aGlzLmJyb2tlci5nZXRBcGlVcmwoKSArICdidXNpbmVzc2xvZ2ljL3VuYmxvY2tFbWFpbHMnLCB7IGVtYWlscyB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGFwaVVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5icm9rZXIuZ2V0QXBpVXJsKCkgKyAnTWVzc2FnZXMvJztcbiAgfVxufVxuIl19