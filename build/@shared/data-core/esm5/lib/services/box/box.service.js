/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { CoreConfig } from '@shared/common';
import { map } from 'rxjs/operators';
var Box = /** @class */ (function () {
    function Box(config, rq, coreConfig) {
        this.config = config;
        this.rq = rq;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} documentUrl
     * @return {?}
     */
    Box.prototype.upload = /**
     * @param {?} documentUrl
     * @return {?}
     */
    function (documentUrl) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/uploadToBox';
        return this.rq.post(url, { params: { documentUrl: documentUrl } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && retVal.data) {
                return retVal.data.id;
            }
            return null;
        })));
    };
    /**
     * @param {?} boxId
     * @return {?}
     */
    Box.prototype.createViewingSession = /**
     * @param {?} boxId
     * @return {?}
     */
    function (boxId) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/createViewingSessionBox';
        return this.rq.post(url, { params: { boxId: boxId } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && retVal.data) {
                return retVal.data;
            }
            return null;
        })));
    };
    /**
     * @param {?} contentUrl
     * @return {?}
     */
    Box.prototype.getViewingContent = /**
     * @param {?} contentUrl
     * @return {?}
     */
    function (contentUrl) {
        var _this = this;
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getViewingContentBox';
        return this.rq.post(url, { params: { contentUrl: contentUrl } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            if (retVal && retVal.data) {
                /** @type {?} */
                var content = retVal.data;
                /** @type {?} */
                var headIndex = content.indexOf('<head>') + 6;
                /** @type {?} */
                var overwriteStyle = '<style type="text/css">';
                overwriteStyle += '.controls-center .scroll-previous-btn, .controls-center .scroll-next-btn, .controls-right .zoom-in-btn, .controls-right .zoom-out-btn, .controls-right {';
                overwriteStyle += '  display: initial !important;';
                overwriteStyle += '}';
                overwriteStyle += '.fullscreen-btn {';
                overwriteStyle += '  display: none !important;';
                overwriteStyle += '}';
                overwriteStyle += '</style>';
                /** @type {?} */
                var protocol = _this.coreConfig.getProtocol();
                content = [content.slice(0, headIndex), overwriteStyle, content.slice(headIndex)].join('');
                content = content.replace(new RegExp('href="//', 'g'), 'href="' + protocol + '//');
                content = content.replace(new RegExp('src="//', 'g'), 'src="' + protocol + '//');
                return content;
            }
            return null;
        })));
    };
    Box.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Box.ctorParameters = function () { return [
        { type: Config },
        { type: Requestor },
        { type: CoreConfig }
    ]; };
    return Box;
}());
export { Box };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Box.prototype.config;
    /**
     * @type {?}
     * @private
     */
    Box.prototype.rq;
    /**
     * @type {?}
     * @private
     */
    Box.prototype.coreConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYm94L2JveC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQztJQUVFLGFBQW9CLE1BQWMsRUFBVSxFQUFhLEVBQVUsVUFBc0I7UUFBckUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQzs7Ozs7SUFFN0Ysb0JBQU07Ozs7SUFBTixVQUFPLFdBQW1COztZQUNwQixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsMkJBQTJCO1FBQzFELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsV0FBVyxhQUFBLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUN4RCxHQUFHOzs7O1FBQUMsVUFBQSxNQUFNO1lBQ1IsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDekIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUN2QjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsa0NBQW9COzs7O0lBQXBCLFVBQXFCLEtBQWE7O1lBQzVCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyx1Q0FBdUM7UUFDdEUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLE9BQUEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2xELEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU07WUFDUixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUN6QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDcEI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7OztJQUVELCtCQUFpQjs7OztJQUFqQixVQUFrQixVQUFrQjtRQUFwQyxpQkF3QkM7O1lBdkJLLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxvQ0FBb0M7UUFDbkUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxVQUFVLFlBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3ZELEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU07WUFDUixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFOztvQkFDckIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJOztvQkFDckIsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzs7b0JBQ3pDLGNBQWMsR0FBRyx5QkFBeUI7Z0JBQzlDLGNBQWMsSUFBSSwwSkFBMEosQ0FBQztnQkFDN0ssY0FBYyxJQUFJLGdDQUFnQyxDQUFDO2dCQUNuRCxjQUFjLElBQUksR0FBRyxDQUFDO2dCQUN0QixjQUFjLElBQUksbUJBQW1CLENBQUM7Z0JBQ3RDLGNBQWMsSUFBSSw2QkFBNkIsQ0FBQztnQkFDaEQsY0FBYyxJQUFJLEdBQUcsQ0FBQztnQkFDdEIsY0FBYyxJQUFJLFVBQVUsQ0FBQzs7b0JBQ3pCLFFBQVEsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtnQkFDNUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNGLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNuRixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDakYsT0FBTyxPQUFPLENBQUM7YUFDaEI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOztnQkFwREYsVUFBVTs7OztnQkFORixNQUFNO2dCQUNOLFNBQVM7Z0JBRVQsVUFBVTs7SUF3RG5CLFVBQUM7Q0FBQSxBQXJERCxJQXFEQztTQXBEWSxHQUFHOzs7Ozs7SUFDRixxQkFBc0I7Ozs7O0lBQUUsaUJBQXFCOzs7OztJQUFFLHlCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29yZUNvbmZpZyB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJveCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWcsIHByaXZhdGUgcnE6IFJlcXVlc3RvciwgcHJpdmF0ZSBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnKSB7fVxuXG4gIHVwbG9hZChkb2N1bWVudFVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvdXBsb2FkVG9Cb3gnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHBhcmFtczogeyBkb2N1bWVudFVybCB9IH0pLnBpcGUoXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuZGF0YSkge1xuICAgICAgICAgIHJldHVybiByZXRWYWwuZGF0YS5pZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZVZpZXdpbmdTZXNzaW9uKGJveElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnYnVzaW5lc3Nsb2dpYy9jcmVhdGVWaWV3aW5nU2Vzc2lvbkJveCc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgcGFyYW1zOiB7IGJveElkIH0gfSkucGlwZShcbiAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5kYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIHJldFZhbC5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0Vmlld2luZ0NvbnRlbnQoY29udGVudFVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvZ2V0Vmlld2luZ0NvbnRlbnRCb3gnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHBhcmFtczogeyBjb250ZW50VXJsIH0gfSkucGlwZShcbiAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5kYXRhKSB7XG4gICAgICAgICAgbGV0IGNvbnRlbnQgPSByZXRWYWwuZGF0YTtcbiAgICAgICAgICBsZXQgaGVhZEluZGV4ID0gY29udGVudC5pbmRleE9mKCc8aGVhZD4nKSArIDY7XG4gICAgICAgICAgbGV0IG92ZXJ3cml0ZVN0eWxlID0gJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4nO1xuICAgICAgICAgIG92ZXJ3cml0ZVN0eWxlICs9ICcuY29udHJvbHMtY2VudGVyIC5zY3JvbGwtcHJldmlvdXMtYnRuLCAuY29udHJvbHMtY2VudGVyIC5zY3JvbGwtbmV4dC1idG4sIC5jb250cm9scy1yaWdodCAuem9vbS1pbi1idG4sIC5jb250cm9scy1yaWdodCAuem9vbS1vdXQtYnRuLCAuY29udHJvbHMtcmlnaHQgeyc7XG4gICAgICAgICAgb3ZlcndyaXRlU3R5bGUgKz0gJyAgZGlzcGxheTogaW5pdGlhbCAhaW1wb3J0YW50Oyc7XG4gICAgICAgICAgb3ZlcndyaXRlU3R5bGUgKz0gJ30nO1xuICAgICAgICAgIG92ZXJ3cml0ZVN0eWxlICs9ICcuZnVsbHNjcmVlbi1idG4geyc7XG4gICAgICAgICAgb3ZlcndyaXRlU3R5bGUgKz0gJyAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50Oyc7XG4gICAgICAgICAgb3ZlcndyaXRlU3R5bGUgKz0gJ30nO1xuICAgICAgICAgIG92ZXJ3cml0ZVN0eWxlICs9ICc8L3N0eWxlPic7XG4gICAgICAgICAgbGV0IHByb3RvY29sID0gdGhpcy5jb3JlQ29uZmlnLmdldFByb3RvY29sKCk7XG4gICAgICAgICAgY29udGVudCA9IFtjb250ZW50LnNsaWNlKDAsIGhlYWRJbmRleCksIG92ZXJ3cml0ZVN0eWxlLCBjb250ZW50LnNsaWNlKGhlYWRJbmRleCldLmpvaW4oJycpO1xuICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UobmV3IFJlZ0V4cCgnaHJlZj1cIi8vJywgJ2cnKSwgJ2hyZWY9XCInICsgcHJvdG9jb2wgKyAnLy8nKTtcbiAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKG5ldyBSZWdFeHAoJ3NyYz1cIi8vJywgJ2cnKSwgJ3NyYz1cIicgKyBwcm90b2NvbCArICcvLycpO1xuICAgICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=