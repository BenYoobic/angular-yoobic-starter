/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { CoreConfig } from '@shared/common';
import { map } from 'rxjs/operators';
export class Box {
    /**
     * @param {?} config
     * @param {?} rq
     * @param {?} coreConfig
     */
    constructor(config, rq, coreConfig) {
        this.config = config;
        this.rq = rq;
        this.coreConfig = coreConfig;
    }
    /**
     * @param {?} documentUrl
     * @return {?}
     */
    upload(documentUrl) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/uploadToBox';
        return this.rq.post(url, { params: { documentUrl } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && retVal.data) {
                return retVal.data.id;
            }
            return null;
        })));
    }
    /**
     * @param {?} boxId
     * @return {?}
     */
    createViewingSession(boxId) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/createViewingSessionBox';
        return this.rq.post(url, { params: { boxId } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && retVal.data) {
                return retVal.data;
            }
            return null;
        })));
    }
    /**
     * @param {?} contentUrl
     * @return {?}
     */
    getViewingContent(contentUrl) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getViewingContentBox';
        return this.rq.post(url, { params: { contentUrl } }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            if (retVal && retVal.data) {
                /** @type {?} */
                let content = retVal.data;
                /** @type {?} */
                let headIndex = content.indexOf('<head>') + 6;
                /** @type {?} */
                let overwriteStyle = '<style type="text/css">';
                overwriteStyle += '.controls-center .scroll-previous-btn, .controls-center .scroll-next-btn, .controls-right .zoom-in-btn, .controls-right .zoom-out-btn, .controls-right {';
                overwriteStyle += '  display: initial !important;';
                overwriteStyle += '}';
                overwriteStyle += '.fullscreen-btn {';
                overwriteStyle += '  display: none !important;';
                overwriteStyle += '}';
                overwriteStyle += '</style>';
                /** @type {?} */
                let protocol = this.coreConfig.getProtocol();
                content = [content.slice(0, headIndex), overwriteStyle, content.slice(headIndex)].join('');
                content = content.replace(new RegExp('href="//', 'g'), 'href="' + protocol + '//');
                content = content.replace(new RegExp('src="//', 'g'), 'src="' + protocol + '//');
                return content;
            }
            return null;
        })));
    }
}
Box.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Box.ctorParameters = () => [
    { type: Config },
    { type: Requestor },
    { type: CoreConfig }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYm94L2JveC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdyQyxNQUFNLE9BQU8sR0FBRzs7Ozs7O0lBQ2QsWUFBb0IsTUFBYyxFQUFVLEVBQWEsRUFBVSxVQUFzQjtRQUFyRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDOzs7OztJQUU3RixNQUFNLENBQUMsV0FBbUI7O1lBQ3BCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRywyQkFBMkI7UUFDMUQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUN4RCxHQUFHOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUU7WUFDWCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUN6QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ3ZCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxLQUFhOztZQUM1QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsdUNBQXVDO1FBQ3RFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDbEQsR0FBRzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ1gsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDekIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3BCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxVQUFrQjs7WUFDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLG9DQUFvQztRQUNuRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3ZELEdBQUc7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRTtZQUNYLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7O29CQUNyQixPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUk7O29CQUNyQixTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDOztvQkFDekMsY0FBYyxHQUFHLHlCQUF5QjtnQkFDOUMsY0FBYyxJQUFJLDBKQUEwSixDQUFDO2dCQUM3SyxjQUFjLElBQUksZ0NBQWdDLENBQUM7Z0JBQ25ELGNBQWMsSUFBSSxHQUFHLENBQUM7Z0JBQ3RCLGNBQWMsSUFBSSxtQkFBbUIsQ0FBQztnQkFDdEMsY0FBYyxJQUFJLDZCQUE2QixDQUFDO2dCQUNoRCxjQUFjLElBQUksR0FBRyxDQUFDO2dCQUN0QixjQUFjLElBQUksVUFBVSxDQUFDOztvQkFDekIsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO2dCQUM1QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0YsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ25GLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNqRixPQUFPLE9BQU8sQ0FBQzthQUNoQjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OztZQXBERixVQUFVOzs7O1lBTkYsTUFBTTtZQUNOLFNBQVM7WUFFVCxVQUFVOzs7Ozs7O0lBS0wscUJBQXNCOzs7OztJQUFFLGlCQUFxQjs7Ozs7SUFBRSx5QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvcmVDb25maWcgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCb3gge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnLCBwcml2YXRlIHJxOiBSZXF1ZXN0b3IsIHByaXZhdGUgY29yZUNvbmZpZzogQ29yZUNvbmZpZykge31cblxuICB1cGxvYWQoZG9jdW1lbnRVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdidXNpbmVzc2xvZ2ljL3VwbG9hZFRvQm94JztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBwYXJhbXM6IHsgZG9jdW1lbnRVcmwgfSB9KS5waXBlKFxuICAgICAgbWFwKHJldFZhbCA9PiB7XG4gICAgICAgIGlmIChyZXRWYWwgJiYgcmV0VmFsLmRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gcmV0VmFsLmRhdGEuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBjcmVhdGVWaWV3aW5nU2Vzc2lvbihib3hJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvY3JlYXRlVmlld2luZ1Nlc3Npb25Cb3gnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHBhcmFtczogeyBib3hJZCB9IH0pLnBpcGUoXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuZGF0YSkge1xuICAgICAgICAgIHJldHVybiByZXRWYWwuZGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldFZpZXdpbmdDb250ZW50KGNvbnRlbnRVcmw6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdidXNpbmVzc2xvZ2ljL2dldFZpZXdpbmdDb250ZW50Qm94JztcbiAgICByZXR1cm4gdGhpcy5ycS5wb3N0KHVybCwgeyBwYXJhbXM6IHsgY29udGVudFVybCB9IH0pLnBpcGUoXG4gICAgICBtYXAocmV0VmFsID0+IHtcbiAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuZGF0YSkge1xuICAgICAgICAgIGxldCBjb250ZW50ID0gcmV0VmFsLmRhdGE7XG4gICAgICAgICAgbGV0IGhlYWRJbmRleCA9IGNvbnRlbnQuaW5kZXhPZignPGhlYWQ+JykgKyA2O1xuICAgICAgICAgIGxldCBvdmVyd3JpdGVTdHlsZSA9ICc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+JztcbiAgICAgICAgICBvdmVyd3JpdGVTdHlsZSArPSAnLmNvbnRyb2xzLWNlbnRlciAuc2Nyb2xsLXByZXZpb3VzLWJ0biwgLmNvbnRyb2xzLWNlbnRlciAuc2Nyb2xsLW5leHQtYnRuLCAuY29udHJvbHMtcmlnaHQgLnpvb20taW4tYnRuLCAuY29udHJvbHMtcmlnaHQgLnpvb20tb3V0LWJ0biwgLmNvbnRyb2xzLXJpZ2h0IHsnO1xuICAgICAgICAgIG92ZXJ3cml0ZVN0eWxlICs9ICcgIGRpc3BsYXk6IGluaXRpYWwgIWltcG9ydGFudDsnO1xuICAgICAgICAgIG92ZXJ3cml0ZVN0eWxlICs9ICd9JztcbiAgICAgICAgICBvdmVyd3JpdGVTdHlsZSArPSAnLmZ1bGxzY3JlZW4tYnRuIHsnO1xuICAgICAgICAgIG92ZXJ3cml0ZVN0eWxlICs9ICcgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsnO1xuICAgICAgICAgIG92ZXJ3cml0ZVN0eWxlICs9ICd9JztcbiAgICAgICAgICBvdmVyd3JpdGVTdHlsZSArPSAnPC9zdHlsZT4nO1xuICAgICAgICAgIGxldCBwcm90b2NvbCA9IHRoaXMuY29yZUNvbmZpZy5nZXRQcm90b2NvbCgpO1xuICAgICAgICAgIGNvbnRlbnQgPSBbY29udGVudC5zbGljZSgwLCBoZWFkSW5kZXgpLCBvdmVyd3JpdGVTdHlsZSwgY29udGVudC5zbGljZShoZWFkSW5kZXgpXS5qb2luKCcnKTtcbiAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKG5ldyBSZWdFeHAoJ2hyZWY9XCIvLycsICdnJyksICdocmVmPVwiJyArIHByb3RvY29sICsgJy8vJyk7XG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZShuZXcgUmVnRXhwKCdzcmM9XCIvLycsICdnJyksICdzcmM9XCInICsgcHJvdG9jb2wgKyAnLy8nKTtcbiAgICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19