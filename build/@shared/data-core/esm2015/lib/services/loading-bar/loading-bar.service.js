/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { isPresent } from '@shared/stencil';
import { Observable } from 'rxjs';
/** @enum {number} */
const LoadingBarEventType = {
    PROGRESS: 0,
    VISIBLE: 1,
};
export { LoadingBarEventType };
LoadingBarEventType[LoadingBarEventType.PROGRESS] = 'PROGRESS';
LoadingBarEventType[LoadingBarEventType.VISIBLE] = 'VISIBLE';
export class LoadingBarEvent {
    /**
     * @param {?} type
     * @param {?} value
     */
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
if (false) {
    /** @type {?} */
    LoadingBarEvent.prototype.type;
    /** @type {?} */
    LoadingBarEvent.prototype.value;
}
export class LoadingBar {
    constructor() {
        this.interval = 500; // in milliseconds
        this._progress = 0;
        this._visible = true;
        this._intervalCounterId = 0;
        this.observable = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this.subscriber = subscriber;
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set progress(value) {
        if (isPresent(value)) {
            if (value > 0) {
                this.visible = true;
            }
            this._progress = value;
            this.emitEvent(new LoadingBarEvent(LoadingBarEventType.PROGRESS, this._progress));
        }
    }
    /**
     * @return {?}
     */
    get progress() {
        return this._progress;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set visible(value) {
        if (isPresent(value)) {
            this._visible = value;
            this.emitEvent(new LoadingBarEvent(LoadingBarEventType.VISIBLE, this._visible));
        }
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @param {?=} onCompleted
     * @return {?}
     */
    start(onCompleted = null) {
        if (!this.isStarting) {
            this.isStarting = true;
            this.complete();
            this.visible = true;
            this._intervalCounterId = setInterval((/**
             * @return {?}
             */
            () => {
                this.progress++;
                if (this.progress === 100) {
                    this.complete();
                }
            }), this.interval);
            this.isStarting = false;
        }
    }
    /**
     * @return {?}
     */
    complete() {
        if (this._intervalCounterId) {
            clearInterval(this._intervalCounterId);
            this._intervalCounterId = null;
        }
        this.progress = 100;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.visible = false;
            this.progress = 0;
        }), 250);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    emitEvent(event) {
        if (this.subscriber) {
            this.subscriber.next(event);
        }
    }
}
LoadingBar.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LoadingBar.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9sb2FkaW5nLWJhci9sb2FkaW5nLWJhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU1QyxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDOzs7SUFHNUMsV0FBUTtJQUNSLFVBQU87Ozs7O0FBR1QsTUFBTSxPQUFPLGVBQWU7Ozs7O0lBQzFCLFlBQW1CLElBQXlCLEVBQVMsS0FBVTtRQUE1QyxTQUFJLEdBQUosSUFBSSxDQUFxQjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQUs7SUFBRyxDQUFDO0NBQ3BFOzs7SUFEYSwrQkFBZ0M7O0lBQUUsZ0NBQWlCOztBQUlqRSxNQUFNLE9BQU8sVUFBVTtJQVVyQjtRQVRPLGFBQVEsR0FBVyxHQUFHLENBQUMsQ0FBQyxrQkFBa0I7UUFHekMsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLHVCQUFrQixHQUFRLENBQUMsQ0FBQztRQUtsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVTs7OztRQUFrQixDQUFDLFVBQXVDLEVBQUUsRUFBRTtZQUM1RixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUMvQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYTtRQUN4QixJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDckI7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksZUFBZSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUNuRjtJQUNILENBQUM7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFlLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0gsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxjQUF3QixJQUFJO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVzs7O1lBQUMsR0FBRyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakI7WUFDSCxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsR0FBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7Ozs7OztJQUVPLFNBQVMsQ0FBQyxLQUFzQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7WUF6RUYsVUFBVTs7Ozs7O0lBRVQsOEJBQThCOztJQUM5QixnQ0FBK0M7Ozs7O0lBRS9DLCtCQUE4Qjs7Ozs7SUFDOUIsOEJBQWlDOzs7OztJQUNqQyx3Q0FBb0M7Ozs7O0lBQ3BDLGdDQUFnRDs7Ozs7SUFDaEQsZ0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQcmVzZW50IH0gZnJvbSAnQHNoYXJlZC9zdGVuY2lsJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlciB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZW51bSBMb2FkaW5nQmFyRXZlbnRUeXBlIHtcbiAgUFJPR1JFU1MsXG4gIFZJU0lCTEVcbn1cblxuZXhwb3J0IGNsYXNzIExvYWRpbmdCYXJFdmVudCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBMb2FkaW5nQmFyRXZlbnRUeXBlLCBwdWJsaWMgdmFsdWU6IGFueSkge31cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvYWRpbmdCYXIge1xuICBwdWJsaWMgaW50ZXJ2YWw6IG51bWJlciA9IDUwMDsgLy8gaW4gbWlsbGlzZWNvbmRzXG4gIHB1YmxpYyBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPExvYWRpbmdCYXJFdmVudD47XG5cbiAgcHJpdmF0ZSBfcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIF9pbnRlcnZhbENvdW50ZXJJZDogYW55ID0gMDtcbiAgcHJpdmF0ZSBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPExvYWRpbmdCYXJFdmVudD47XG4gIHByaXZhdGUgaXNTdGFydGluZzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxMb2FkaW5nQmFyRXZlbnQ+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPExvYWRpbmdCYXJFdmVudD4pID0+IHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gICAgfSk7XG4gIH1cblxuICBzZXQgcHJvZ3Jlc3ModmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc1ByZXNlbnQodmFsdWUpKSB7XG4gICAgICBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLl9wcm9ncmVzcyA9IHZhbHVlO1xuICAgICAgdGhpcy5lbWl0RXZlbnQobmV3IExvYWRpbmdCYXJFdmVudChMb2FkaW5nQmFyRXZlbnRUeXBlLlBST0dSRVNTLCB0aGlzLl9wcm9ncmVzcykpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwcm9ncmVzcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wcm9ncmVzcztcbiAgfVxuXG4gIHNldCB2aXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKGlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZW1pdEV2ZW50KG5ldyBMb2FkaW5nQmFyRXZlbnQoTG9hZGluZ0JhckV2ZW50VHlwZS5WSVNJQkxFLCB0aGlzLl92aXNpYmxlKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gIH1cblxuICBzdGFydChvbkNvbXBsZXRlZDogRnVuY3Rpb24gPSBudWxsKSB7XG4gICAgaWYgKCF0aGlzLmlzU3RhcnRpbmcpIHtcbiAgICAgIHRoaXMuaXNTdGFydGluZyA9IHRydWU7XG4gICAgICB0aGlzLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgdGhpcy5faW50ZXJ2YWxDb3VudGVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MrKztcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MgPT09IDEwMCkge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5pbnRlcnZhbCk7XG4gICAgICB0aGlzLmlzU3RhcnRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICBpZiAodGhpcy5faW50ZXJ2YWxDb3VudGVySWQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxDb3VudGVySWQpO1xuICAgICAgdGhpcy5faW50ZXJ2YWxDb3VudGVySWQgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLnByb2dyZXNzID0gMTAwO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB9LCAyNTApO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0RXZlbnQoZXZlbnQ6IExvYWRpbmdCYXJFdmVudCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmliZXIpIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlci5uZXh0KGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==