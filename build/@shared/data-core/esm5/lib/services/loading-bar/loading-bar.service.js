/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isPresent } from '@shared/stencil';
import { Observable } from 'rxjs';
/** @enum {number} */
var LoadingBarEventType = {
    PROGRESS: 0,
    VISIBLE: 1,
};
export { LoadingBarEventType };
LoadingBarEventType[LoadingBarEventType.PROGRESS] = 'PROGRESS';
LoadingBarEventType[LoadingBarEventType.VISIBLE] = 'VISIBLE';
var LoadingBarEvent = /** @class */ (function () {
    function LoadingBarEvent(type, value) {
        this.type = type;
        this.value = value;
    }
    return LoadingBarEvent;
}());
export { LoadingBarEvent };
if (false) {
    /** @type {?} */
    LoadingBarEvent.prototype.type;
    /** @type {?} */
    LoadingBarEvent.prototype.value;
}
var LoadingBar = /** @class */ (function () {
    function LoadingBar() {
        var _this = this;
        this.interval = 500; // in milliseconds
        this._progress = 0;
        this._visible = true;
        this._intervalCounterId = 0;
        this.observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            _this.subscriber = subscriber;
        }));
    }
    Object.defineProperty(LoadingBar.prototype, "progress", {
        get: /**
         * @return {?}
         */
        function () {
            return this._progress;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isPresent(value)) {
                if (value > 0) {
                    this.visible = true;
                }
                this._progress = value;
                this.emitEvent(new LoadingBarEvent(LoadingBarEventType.PROGRESS, this._progress));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingBar.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isPresent(value)) {
                this._visible = value;
                this.emitEvent(new LoadingBarEvent(LoadingBarEventType.VISIBLE, this._visible));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} onCompleted
     * @return {?}
     */
    LoadingBar.prototype.start = /**
     * @param {?=} onCompleted
     * @return {?}
     */
    function (onCompleted) {
        var _this = this;
        if (onCompleted === void 0) { onCompleted = null; }
        if (!this.isStarting) {
            this.isStarting = true;
            this.complete();
            this.visible = true;
            this._intervalCounterId = setInterval((/**
             * @return {?}
             */
            function () {
                _this.progress++;
                if (_this.progress === 100) {
                    _this.complete();
                }
            }), this.interval);
            this.isStarting = false;
        }
    };
    /**
     * @return {?}
     */
    LoadingBar.prototype.complete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._intervalCounterId) {
            clearInterval(this._intervalCounterId);
            this._intervalCounterId = null;
        }
        this.progress = 100;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.visible = false;
            _this.progress = 0;
        }), 250);
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    LoadingBar.prototype.emitEvent = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.subscriber) {
            this.subscriber.next(event);
        }
    };
    LoadingBar.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LoadingBar.ctorParameters = function () { return []; };
    return LoadingBar;
}());
export { LoadingBar };
if (false) {
    /** @type {?} */
    LoadingBar.prototype.interval;
    /** @type {?} */
    LoadingBar.prototype.observable;
    /**
     * @type {?}
     * @private
     */
    LoadingBar.prototype._progress;
    /**
     * @type {?}
     * @private
     */
    LoadingBar.prototype._visible;
    /**
     * @type {?}
     * @private
     */
    LoadingBar.prototype._intervalCounterId;
    /**
     * @type {?}
     * @private
     */
    LoadingBar.prototype.subscriber;
    /**
     * @type {?}
     * @private
     */
    LoadingBar.prototype.isStarting;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sb2FkaW5nLWJhci9sb2FkaW5nLWJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU1QyxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDOzs7SUFHNUMsV0FBUTtJQUNSLFVBQU87Ozs7O0FBR1Q7SUFDRSx5QkFBbUIsSUFBeUIsRUFBUyxLQUFVO1FBQTVDLFNBQUksR0FBSixJQUFJLENBQXFCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBSztJQUFHLENBQUM7SUFDckUsc0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7OztJQURhLCtCQUFnQzs7SUFBRSxnQ0FBaUI7O0FBR2pFO0lBV0U7UUFBQSxpQkFJQztRQWJNLGFBQVEsR0FBVyxHQUFHLENBQUMsQ0FBQyxrQkFBa0I7UUFHekMsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLHVCQUFrQixHQUFRLENBQUMsQ0FBQztRQUtsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVTs7OztRQUFrQixVQUFDLFVBQXVDO1lBQ3hGLEtBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQy9CLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHNCQUFJLGdDQUFROzs7O1FBVVo7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFaRCxVQUFhLEtBQWE7WUFDeEIsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDckI7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFlLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ25GO1FBQ0gsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSwrQkFBTzs7OztRQU9YO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBVEQsVUFBWSxLQUFjO1lBQ3hCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDakY7UUFDSCxDQUFDOzs7T0FBQTs7Ozs7SUFNRCwwQkFBSzs7OztJQUFMLFVBQU0sV0FBNEI7UUFBbEMsaUJBYUM7UUFiSyw0QkFBQSxFQUFBLGtCQUE0QjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVc7OztZQUFDO2dCQUNwQyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksS0FBSSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakI7WUFDSCxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7OztJQUVELDZCQUFROzs7SUFBUjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixVQUFVOzs7UUFBQztZQUNULEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsR0FBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7Ozs7OztJQUVPLDhCQUFTOzs7OztJQUFqQixVQUFrQixLQUFzQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOztnQkF6RUYsVUFBVTs7OztJQTBFWCxpQkFBQztDQUFBLEFBMUVELElBMEVDO1NBekVZLFVBQVU7OztJQUNyQiw4QkFBOEI7O0lBQzlCLGdDQUErQzs7Ozs7SUFFL0MsK0JBQThCOzs7OztJQUM5Qiw4QkFBaUM7Ozs7O0lBQ2pDLHdDQUFvQzs7Ozs7SUFDcEMsZ0NBQWdEOzs7OztJQUNoRCxnQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1ByZXNlbnQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpYmVyIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBlbnVtIExvYWRpbmdCYXJFdmVudFR5cGUge1xuICBQUk9HUkVTUyxcbiAgVklTSUJMRVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZGluZ0JhckV2ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IExvYWRpbmdCYXJFdmVudFR5cGUsIHB1YmxpYyB2YWx1ZTogYW55KSB7fVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9hZGluZ0JhciB7XG4gIHB1YmxpYyBpbnRlcnZhbDogbnVtYmVyID0gNTAwOyAvLyBpbiBtaWxsaXNlY29uZHNcbiAgcHVibGljIG9ic2VydmFibGU6IE9ic2VydmFibGU8TG9hZGluZ0JhckV2ZW50PjtcblxuICBwcml2YXRlIF9wcm9ncmVzczogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgX2ludGVydmFsQ291bnRlcklkOiBhbnkgPSAwO1xuICBwcml2YXRlIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8TG9hZGluZ0JhckV2ZW50PjtcbiAgcHJpdmF0ZSBpc1N0YXJ0aW5nOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlPExvYWRpbmdCYXJFdmVudD4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8TG9hZGluZ0JhckV2ZW50PikgPT4ge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyID0gc3Vic2NyaWJlcjtcbiAgICB9KTtcbiAgfVxuXG4gIHNldCBwcm9ncmVzcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3Byb2dyZXNzID0gdmFsdWU7XG4gICAgICB0aGlzLmVtaXRFdmVudChuZXcgTG9hZGluZ0JhckV2ZW50KExvYWRpbmdCYXJFdmVudFR5cGUuUFJPR1JFU1MsIHRoaXMuX3Byb2dyZXNzKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHByb2dyZXNzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2dyZXNzO1xuICB9XG5cbiAgc2V0IHZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNQcmVzZW50KHZhbHVlKSkge1xuICAgICAgdGhpcy5fdmlzaWJsZSA9IHZhbHVlO1xuICAgICAgdGhpcy5lbWl0RXZlbnQobmV3IExvYWRpbmdCYXJFdmVudChMb2FkaW5nQmFyRXZlbnRUeXBlLlZJU0lCTEUsIHRoaXMuX3Zpc2libGUpKTtcbiAgICB9XG4gIH1cblxuICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgfVxuXG4gIHN0YXJ0KG9uQ29tcGxldGVkOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICBpZiAoIXRoaXMuaXNTdGFydGluZykge1xuICAgICAgdGhpcy5pc1N0YXJ0aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLl9pbnRlcnZhbENvdW50ZXJJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9ncmVzcysrO1xuICAgICAgICBpZiAodGhpcy5wcm9ncmVzcyA9PT0gMTAwKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzLmludGVydmFsKTtcbiAgICAgIHRoaXMuaXNTdGFydGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIGlmICh0aGlzLl9pbnRlcnZhbENvdW50ZXJJZCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbENvdW50ZXJJZCk7XG4gICAgICB0aGlzLl9pbnRlcnZhbENvdW50ZXJJZCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgIH0sIDI1MCk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRFdmVudChldmVudDogTG9hZGluZ0JhckV2ZW50KSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaWJlcikge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyLm5leHQoZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuIl19