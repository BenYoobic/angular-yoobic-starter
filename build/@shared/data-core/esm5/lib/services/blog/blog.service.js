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
var Blog = /** @class */ (function () {
    function Blog(coreConfig, config, rq, translate) {
        this.coreConfig = coreConfig;
        this.config = config;
        this.rq = rq;
        this.translate = translate;
    }
    /**
     * @return {?}
     */
    Blog.prototype.getUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url;
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
    };
    /**
     * @param {?} blogUrl
     * @param {?=} limit
     * @param {?=} skip
     * @return {?}
     */
    Blog.prototype.get = /**
     * @param {?} blogUrl
     * @param {?=} limit
     * @param {?=} skip
     * @return {?}
     */
    function (blogUrl, limit, skip) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit: limit, skip: skip }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            items.forEach((/**
             * @param {?} b
             * @return {?}
             */
            function (b) {
                try {
                    if (b && b.enclosure && b.enclosure.$ && b.enclosure.$.url) {
                        b.background = b.enclosure.$.url;
                    }
                    else {
                        /** @type {?} */
                        var content = b['content:encoded'];
                        /** @type {?} */
                        var re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                        /** @type {?} */
                        var results = re.exec(content);
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
    };
    /**
     * @param {?} blogUrl
     * @return {?}
     */
    Blog.prototype.getLatestArticleDate = /**
     * @param {?} blogUrl
     * @return {?}
     */
    function (blogUrl) {
        /** @type {?} */
        var url = this.config.apiUrl + 'businesslogic/getBlog';
        return this.rq.post(url, { url: blogUrl, limit: 1 }).pipe(map((/**
         * @param {?} retVal
         * @return {?}
         */
        function (retVal) {
            /** @type {?} */
            var items = [];
            if (retVal && retVal.rss && retVal.rss.channel && retVal.rss.channel.item && retVal.rss.channel.item.length > 0) {
                items = [].concat(retVal.rss.channel.item);
            }
            if (items && items.length > 0 && items[0]) {
                return items[0].pubDate;
            }
            return null;
        })));
    };
    Blog.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Blog.ctorParameters = function () { return [
        { type: CoreConfig },
        { type: Config },
        { type: Requestor },
        { type: Translate }
    ]; };
    return Blog;
}());
export { Blog };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2Jsb2cvYmxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUczRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVyQztJQUVFLGNBQXNCLFVBQXNCLEVBQVksTUFBYyxFQUFZLEVBQWEsRUFBWSxTQUFvQjtRQUF6RyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLE9BQUUsR0FBRixFQUFFLENBQVc7UUFBWSxjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQzs7OztJQUVuSSxxQkFBTTs7O0lBQU47O1lBQ00sR0FBVztRQUNmLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxZQUFZLEVBQUU7WUFDakQsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNoRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQzdCLEdBQUcsR0FBRyx1R0FBdUcsQ0FBQztpQkFDL0c7cUJBQU07b0JBQ0wsR0FBRyxHQUFHLHVHQUF1RyxDQUFDO2lCQUMvRzthQUNGO2lCQUFNLElBQUksSUFBSSxDQUFD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QUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QztZQUNELElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Z0JBakdGLFVBQVU7Ozs7Z0JBVkYsVUFBVTtnQkFHVixNQUFNO2dCQUNOLFNBQVM7Z0JBSFQsU0FBUzs7SUEyR2xCLFdBQUM7Q0FBQSxBQWxHRCxJQWtHQztTQWpHWSxJQUFJOzs7Ozs7SUFDSCwwQkFBZ0M7Ozs7O0lBQUUsc0JBQXdCOzs7OztJQUFFLGtCQUF1Qjs7Ozs7SUFBRSx5QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3JlQ29uZmlnIH0gZnJvbSAnQHNoYXJlZC9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlIH0gZnJvbSAnQHNoYXJlZC90cmFuc2xhdGUnO1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmxvZyB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWcsIHByb3RlY3RlZCBycTogUmVxdWVzdG9yLCBwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGUpIHt9XG5cbiAgZ2V0VXJsKCkge1xuICAgIGxldCB1cmw6IHN0cmluZztcbiAgICBpZiAodGhpcy5jb3JlQ29uZmlnLmdldEFwcE5hbWUoKSA9PT0gJ29wZXJhdGlvbnMnKSB7XG4gICAgICBpZiAodGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCkgPT09ICdmcicpIHtcbiAgICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0lvbmljKCkpIHtcbiAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b29iaWMuYmxvZ2luLmNvL3Jzcy54bWw/bXQ9NTIxZmU3YTQyNjQyYzQ1OGUyNDAzMDg0YmFkMWY0Njg1MDRmMmRhNiZjPTIwNDE3JnB1YmxpY19saW5rPXRydWUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjA0MTUmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCkgPT09ICdpdCcpIHtcbiAgICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0lvbmljKCkpIHtcbiAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b29iaWMuYmxvZ2luLmNvL3Jzcy54bWw/bXQ9NTIxZmU3YTQyNjQyYzQ1OGUyNDAzMDg0YmFkMWY0Njg1MDRmMmRhNiZjPTIxMTQ0JnB1YmxpY19saW5rPXRydWUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjExNDMmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNJb25pYygpKSB7XG4gICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW9vYmljLmJsb2dpbi5jby9yc3MueG1sP210PTUyMWZlN2E0MjY0MmM0NThlMjQwMzA4NGJhZDFmNDY4NTA0ZjJkYTYmYz0yMDQxNiZwdWJsaWNfbGluaz10cnVlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b29iaWMuYmxvZ2luLmNvL3Jzcy54bWw/bXQ9NTIxZmU3YTQyNjQyYzQ1OGUyNDAzMDg0YmFkMWY0Njg1MDRmMmRhNiZjPTIwNDE0JnB1YmxpY19saW5rPXRydWUnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvcmVDb25maWcuZ2V0QXBwTmFtZSgpID09PSAnYm9vc3QnKSB7XG4gICAgICBpZiAodGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCkgPT09ICdmcicpIHtcbiAgICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0lvbmljKCkpIHtcbiAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b29iaWMuYmxvZ2luLmNvL3Jzcy54bWw/bXQ9NTIxZmU3YTQyNjQyYzQ1OGUyNDAzMDg0YmFkMWY0Njg1MDRmMmRhNiZjPTI1MDA4JnB1YmxpY19saW5rPXRydWUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjUwMDYmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy50cmFuc2xhdGUuZ2V0Q3VycmVudExhbmd1YWdlKCkgPT09ICdpdCcpIHtcbiAgICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5pc0lvbmljKCkpIHtcbiAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b29iaWMuYmxvZ2luLmNvL3Jzcy54bWw/bXQ9NTIxZmU3YTQyNjQyYzQ1OGUyNDAzMDg0YmFkMWY0Njg1MDRmMmRhNiZjPTI1MDA5JnB1YmxpY19saW5rPXRydWUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybCA9ICdodHRwczovL3lvb2JpYy5ibG9naW4uY28vcnNzLnhtbD9tdD01MjFmZTdhNDI2NDJjNDU4ZTI0MDMwODRiYWQxZjQ2ODUwNGYyZGE2JmM9MjUwMTAmcHVibGljX2xpbms9dHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmNvcmVDb25maWcuaXNJb25pYygpKSB7XG4gICAgICAgICAgdXJsID0gJ2h0dHBzOi8veW9vYmljLmJsb2dpbi5jby9yc3MueG1sP210PTUyMWZlN2E0MjY0MmM0NThlMjQwMzA4NGJhZDFmNDY4NTA0ZjJkYTYmYz0yNTAwNyZwdWJsaWNfbGluaz10cnVlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmwgPSAnaHR0cHM6Ly95b29iaWMuYmxvZ2luLmNvL3Jzcy54bWw/bXQ9NTIxZmU3YTQyNjQyYzQ1OGUyNDAzMDg0YmFkMWY0Njg1MDRmMmRhNiZjPTI1MDA1JnB1YmxpY19saW5rPXRydWUnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBnZXQoYmxvZ1VybDogc3RyaW5nLCBsaW1pdD86IG51bWJlciwgc2tpcD86IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdidXNpbmVzc2xvZ2ljL2dldEJsb2cnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHVybDogYmxvZ1VybCwgbGltaXQsIHNraXAgfSkucGlwZShcbiAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICBsZXQgaXRlbXMgPSBbXTtcbiAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwucnNzICYmIHJldFZhbC5yc3MuY2hhbm5lbCAmJiByZXRWYWwucnNzLmNoYW5uZWwuaXRlbSAmJiByZXRWYWwucnNzLmNoYW5uZWwuaXRlbS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaXRlbXMgPSBbXS5jb25jYXQocmV0VmFsLnJzcy5jaGFubmVsLml0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW1zLmZvckVhY2goYiA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChiICYmIGIuZW5jbG9zdXJlICYmIGIuZW5jbG9zdXJlLiQgJiYgYi5lbmNsb3N1cmUuJC51cmwpIHtcbiAgICAgICAgICAgICAgYi5iYWNrZ3JvdW5kID0gYi5lbmNsb3N1cmUuJC51cmw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsZXQgY29udGVudCA9IGJbJ2NvbnRlbnQ6ZW5jb2RlZCddO1xuICAgICAgICAgICAgICBsZXQgcmUgPSAvPGltZ1tePl0rc3JjPVwiPyhbXlwiXFxzXSspXCI/W14+XSpcXC8+L2c7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gcmUuZXhlYyhjb250ZW50KTtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBiLmJhY2tncm91bmQgPSByZXN1bHRzWzFdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYi5wdWJEYXRlICYmIGlzU3RyaW5nKGIucHViRGF0ZSkpIHtcbiAgICAgICAgICAgICAgYi5wdWJEYXRlID0gbmV3IERhdGUoYi5wdWJEYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiLmJhY2tncm91bmQpIHtcbiAgICAgICAgICAgICAgYi5iYWNrZ3JvdW5kID0gYi5iYWNrZ3JvdW5kLnJlcGxhY2UoJ2Jsb2cueW9vYmljLmNvbScsICd5b29iaWMuYmxvZ2luLmNvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0TGF0ZXN0QXJ0aWNsZURhdGUoYmxvZ1VybDogc3RyaW5nKSB7XG4gICAgbGV0IHVybCA9IHRoaXMuY29uZmlnLmFwaVVybCArICdidXNpbmVzc2xvZ2ljL2dldEJsb2cnO1xuICAgIHJldHVybiB0aGlzLnJxLnBvc3QodXJsLCB7IHVybDogYmxvZ1VybCwgbGltaXQ6IDEgfSkucGlwZShcbiAgICAgIG1hcChyZXRWYWwgPT4ge1xuICAgICAgICBsZXQgaXRlbXMgPSBbXTtcbiAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwucnNzICYmIHJldFZhbC5yc3MuY2hhbm5lbCAmJiByZXRWYWwucnNzLmNoYW5uZWwuaXRlbSAmJiByZXRWYWwucnNzLmNoYW5uZWwuaXRlbS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaXRlbXMgPSBbXS5jb25jYXQocmV0VmFsLnJzcy5jaGFubmVsLml0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwICYmIGl0ZW1zWzBdKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1zWzBdLnB1YkRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==