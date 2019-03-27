/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CoreConfig } from '@shared/common';
import { Translate } from '@shared/translate';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { map } from 'rxjs/operators';
import { isString } from 'lodash-es';
export class Blog {
    /**
     * @param {?} coreConfig
     * @param {?} config
     * @param {?} rq
     * @param {?} translate
     */
    constructor(coreConfig, config, rq, translate) {
        this.coreConfig = coreConfig;
        this.config = config;
        this.rq = rq;
        this.translate = translate;
    }
    /**
     * @return {?}
     */
    getUrl() {
        /** @type {?} */
        let url;
        if (this.coreConfig.getAppName() === 'operations') {
            if (this.translate.getCurrentLanguage() === 'fr') {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=20417&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=20415&public_link=true';
                }
            }
            else if (this.translate.getCurrentLanguage() === 'it') {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=21144&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=21143&public_link=true';
                }
            }
            else {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=20416&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=20414&public_link=true';
                }
            }
        }
        else if (this.coreConfig.getAppName() === 'boost') {
            if (this.translate.getCurrentLanguage() === 'fr') {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25008&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25006&public_link=true';
                }
            }
            else if (this.translate.getCurrentLanguage() === 'it') {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25009&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25010&public_link=true';
                }
            }
            else {
                if (this.coreConfig.isIonic()) {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25007&public_link=true';
                }
                else {
                    url = 'https://yoobic.blogin.co/rss.xml?mt=521fe7a42642c458e2403084bad1f468504f2da6&c=25005&public_link=true';
                }
            }
        }
        return url;
    }
    /**
     * @param {?} blogUrl
     * @param {?=} limit
     * @param {?=} skip
     * @return {?}
     */
    get(blogUrl, limit, skip) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit, skip }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            /** @type {?} */
            let items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            items.forEach((/**
             * @param {?} b
             * @return {?}
             */
            b => {
                try {
                    if (b && b.enclosure && b.enclosure.$ && b.enclosure.$.url) {
                        b.background = b.enclosure.$.url;
                    }
                    else {
                        /** @type {?} */
                        let content = b['content:encoded'];
                        /** @type {?} */
                        let re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                        /** @type {?} */
                        let results = re.exec(content);
                        if (results) {
                            b.background = results[1];
                        }
                    }
                    if (b.pubDate && isString(b.pubDate)) {
                        b.pubDate = new Date(b.pubDate);
                    }
                    if (b.background) {
                        b.background = b.background.replace('blog.yoobic.com', 'yoobic.blogin.co');
                    }
                }
                catch (err) { }
            }));
            return items;
        })));
    }
    /**
     * @param {?} blogUrl
     * @return {?}
     */
    getLatestArticleDate(blogUrl) {
        /** @type {?} */
        let url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit: 1 }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        retVal => {
            /** @type {?} */
            let items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            if (items && items.length > 0 && items[0]) {
                return items[0].pubDate;
            }
            return null;
        })));
    }
}
Blog.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Blog.ctorParameters = () => [
    { type: CoreConfig },
    { type: Config },
    { type: Requestor },
    { type: Translate }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Blog.prototype.coreConfig;
    /**
     * @type {?}
     * @protected
     */
    Blog.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    Blog.prototype.rq;
    /**
     * @type {?}
     * @protected
     */
    Blog.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Jsb2cvYmxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUczRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUdyQyxNQUFNLE9BQU8sSUFBSTs7Ozs7OztJQUNmLFlBQXNCLFVBQXNCLEVBQVksTUFBYyxFQUFZLEVBQWEsRUFBWSxTQUFvQjtRQUF6RyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLE9BQUUsR0FBRixFQUFFLENBQVc7UUFBWSxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQzs7OztJQUVuSSxNQUFNOztZQUNBLEdBQVc7UUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEtBQUssWUFBWSxFQUFFO1lBQ2pELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDaEQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUM3QixHQUFHLEdBQUcsdUdBQXVHLENBQUM7aUJBQy9HO3FCQUFNO29CQUNMLEdBQUcsR0FBRyx1R0FBdUcsQ0FBQztpQkFDL0c7YUFDRjtpQkFBTSxJ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QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUN6QjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OztZQWpHRixVQUFVOzs7O1lBVkYsVUFBVTtZQUdWLE1BQU07WUFDTixTQUFTO1lBSFQsU0FBUzs7Ozs7OztJQVdKLDBCQUFnQzs7Ozs7SUFBRSxzQkFBd0I7Ozs7O0lBQUUsa0JBQXVCOzs7OztJQUFFLHlCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVDb25maWcgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2xhdGUgfSBmcm9tICdAc2hhcmVkL3RyYW5zbGF0ZSc7XG5cbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBSZXF1ZXN0b3IgfSBmcm9tICcuLi9yZXF1ZXN0b3IvcmVxdWVzdG9yLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCbG9nIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZywgcHJvdGVjdGVkIHJxOiBSZXF1ZXN0b3IsIHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZSkge31cblxuICBnZXRVcmwoKSB7XG4gICAgbGV0IHVybDogc3RyaW5nO1xuICAgIGlmICh0aGlzLmNvcmVDb25maWcuZ2V0QXBwTmFtZSgpID09PSAnb3BlcmF0aW9ucycpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSA9PT0gJ2ZyJykge1xuICAgICAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmlzSW9uaWMoKSkge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjA0MTcmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW9vYmljLmJsb2dpbi5jby9yc3MueG1sP210PTUyMWZlN2E0MjY0MmM0NThlMjQwMzA4NGJhZDFmNDY4NTA0ZjJkYTYmYz0yMDQxNSZwdWJsaWNfbGluaz10cnVlJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSA9PT0gJ2l0Jykge1xuICAgICAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmlzSW9uaWMoKSkge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjExNDQmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW9vYmljLmJsb2dpbi5jby9yc3MueG1sP210PTUyMWZlN2E0MjY0MmM0NThlMjQwMzA4NGJhZDFmNDY4NTA0ZjJkYTYmYz0yMTE0MyZwdWJsaWNfbGluaz10cnVlJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0lvbmljKCkpIHtcbiAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b29iaWMuYmxvZ2luLmNvL3Jzcy54bWw/bXQ9NTIxZmU3YTQyNjQyYzQ1OGUyNDAzMDg0YmFkMWY0Njg1MDRmMmRhNiZjPTIwNDE2JnB1YmxpY19saW5rPXRydWUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjA0MTQmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuY29yZUNvbmZpZy5nZXRBcHBOYW1lKCkgPT09ICdib29zdCcpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSA9PT0gJ2ZyJykge1xuICAgICAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmlzSW9uaWMoKSkge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjUwMDgmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW9vYmljLmJsb2dpbi5jby9yc3MueG1sP210PTUyMWZlN2E0MjY0MmM0NThlMjQwMzA4NGJhZDFmNDY4NTA0ZjJkYTYmYz0yNTAwNiZwdWJsaWNfbGluaz10cnVlJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZ3VhZ2UoKSA9PT0gJ2l0Jykge1xuICAgICAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmlzSW9uaWMoKSkge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjUwMDkmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW9vYmljLmJsb2dpbi5jby9yc3MueG1sP210PTUyMWZlN2E0MjY0MmM0NThlMjQwMzA4NGJhZDFmNDY4NTA0ZjJkYTYmYz0yNTAxMCZwdWJsaWNfbGluaz10cnVlJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0lvbmljKCkpIHtcbiAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b29iaWMuYmxvZ2luLmNvL3Jzcy54bWw/bXQ9NTIxZmU3YTQyNjQyYzQ1OGUyNDAzMDg0YmFkMWY0Njg1MDRmMmRhNiZjPTI1MDA3JnB1YmxpY19saW5rPXRydWUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjUwMDUmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGdldChibG9nVXJsOiBzdHJpbmcsIGxpbWl0PzogbnVtYmVyLCBza2lwPzogbnVtYmVyKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvZ2V0QmxvZyc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgdXJsOiBibG9nVXJsLCBsaW1pdCwgc2tpcCB9KS5waXBlKFxuICAgICAgbWFwKHJldFZhbCA9PiB7XG4gICAgICAgIGxldCBpdGVtcyA9IFtdO1xuICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5yc3MgJiYgcmV0VmFsLnJzcy5jaGFubmVsICYmIHJldFZhbC5yc3MuY2hhbm5lbC5pdGVtICYmIHJldFZhbC5yc3MuY2hhbm5lbC5pdGVtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpdGVtcyA9IFtdLmNvbmNhdChyZXRWYWwucnNzLmNoYW5uZWwuaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbXMuZm9yRWFjaChiID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGIgJiYgYi5lbmNsb3N1cmUgJiYgYi5lbmNsb3N1cmUuJCAmJiBiLmVuY2xvc3VyZS4kLnVybCkge1xuICAgICAgICAgICAgICBiLmJhY2tncm91bmQgPSBiLmVuY2xvc3VyZS4kLnVybDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxldCBjb250ZW50ID0gYlsnY29udGVudDplbmNvZGVkJ107XG4gICAgICAgICAgICAgIGxldCByZSA9IC88aW1nW14+XStzcmM9XCI/KFteXCJcXHNdKylcIj9bXj5dKlxcLz4vZztcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSByZS5leGVjKGNvbnRlbnQpO1xuICAgICAgICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGIuYmFja2dyb3VuZCA9IHJlc3VsdHNbMV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiLnB1YkRhdGUgJiYgaXNTdHJpbmcoYi5wdWJEYXRlKSkge1xuICAgICAgICAgICAgICBiLnB1YkRhdGUgPSBuZXcgRGF0ZShiLnB1YkRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGIuYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgICBiLmJhY2tncm91bmQgPSBiLmJhY2tncm91bmQucmVwbGFjZSgnYmxvZy55b29iaWMuY29tJywgJ3lvb2JpYy5ibG9naW4uY28nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRMYXRlc3RBcnRpY2xlRGF0ZShibG9nVXJsOiBzdHJpbmcpIHtcbiAgICBsZXQgdXJsID0gdGhpcy5jb25maWcuYXBpVXJsICsgJ2J1c2luZXNzbG9naWMvZ2V0QmxvZyc7XG4gICAgcmV0dXJuIHRoaXMucnEucG9zdCh1cmwsIHsgdXJsOiBibG9nVXJsLCBsaW1pdDogMSB9KS5waXBlKFxuICAgICAgbWFwKHJldFZhbCA9PiB7XG4gICAgICAgIGxldCBpdGVtcyA9IFtdO1xuICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5yc3MgJiYgcmV0VmFsLnJzcy5jaGFubmVsICYmIHJldFZhbC5yc3MuY2hhbm5lbC5pdGVtICYmIHJldFZhbC5yc3MuY2hhbm5lbC5pdGVtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBpdGVtcyA9IFtdLmNvbmNhdChyZXRWYWwucnNzLmNoYW5uZWwuaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDAgJiYgaXRlbXNbMF0pIHtcbiAgICAgICAgICByZXR1cm4gaXRlbXNbMF0ucHViRGF0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19