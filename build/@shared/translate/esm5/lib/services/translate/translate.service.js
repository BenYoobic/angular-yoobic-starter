/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { CoreConfig, Persistent } from '@shared/common';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { translate, loadTranslations, translateMulti, setCurrentLanguage, isCurrentLanguageChinese } from '@shared/stencil';
/** @type {?} */
export var AVAILABLE_LANGUAGES = ['en', 'us', 'fr', 'de', 'es', 'nl', 'pl', 'it', 'ru', 'zhs', 'zht', 'pt', 'kr', 'ja', 'ua', 'he', 'ar', 'cz', 'th', 'tr', 'bg', 'el', 'sl', 'sk', 'ro', 'hu', 'et', 'br', 'key'];
var Translate = /** @class */ (function () {
    function Translate(coreConfig, http) {
        this.coreConfig = coreConfig;
        this.http = http;
        this._languageChange = new Subject();
    }
    /**
     * @return {?}
     */
    Translate.prototype.init = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var browserLanguage = 'en';
        if (!this.coreConfig.isUniversal()) {
            browserLanguage = ((/** @type {?} */ (window))).navigator.userLanguage || window.navigator.language || 'en';
        }
        this.defaultLanguage = this.defaultLanguage || browserLanguage;
        return this.setLanguage(this.defaultLanguage, false);
    };
    Object.defineProperty(Translate.prototype, "languageChange$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._languageChange.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} language
     * @return {?}
     */
    Translate.prototype.checkLanguage = /**
     * @param {?} language
     * @return {?}
     */
    function (language) {
        if (language === 'key') {
            return language;
        }
        if (language === 'zh-Hant-HK' || language === 'zht') {
            language = 'zht';
        }
        else if (language === 'zh-Hans-GB' || language.startsWith('zh')) {
            language = 'zhs';
        }
        else {
            language = language.substring(0, 2);
        }
        if (Translate.availablesLanguage.indexOf(language) < 0) {
            language = 'en';
        }
        return language;
    };
    /**
     * @param {?} language
     * @param {?=} reload
     * @return {?}
     */
    Translate.prototype.setLanguage = /**
     * @param {?} language
     * @param {?=} reload
     * @return {?}
     */
    function (language, reload) {
        var _this = this;
        if (reload === void 0) { reload = true; }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (language) {
                language = _this.checkLanguage(language);
                _this.defaultLanguage = language;
                //this.ngTranslate.setDefaultLang(this.defaultLanguage);
                // moment.locale(this.getLanguageFull(language, '-'));
                _this._languageChange.next(language);
                Translate.currentLanguage = language;
                ((/** @type {?} */ (window))).__currentLanguage__ = language;
                if (typeof window !== 'undefined' && window.document) {
                    if (_this.isRtl(language)) {
                        window.document.dir = 'rtl';
                    }
                    else {
                        window.document.dir = 'ltr';
                    }
                }
                _this.http.get('./assets/i18n/' + language + '.json').subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    // this.ngTranslate.use(language).subscribe(() => {
                    setCurrentLanguage(language);
                    loadTranslations(res);
                    resolve(language);
                    if (reload) {
                        _this.coreConfig.reload();
                    }
                }));
            }
            else {
                resolve(null);
            }
        }));
    };
    /**
     * @param {?} language
     * @param {?} translations
     * @param {?} isAdmin
     * @return {?}
     */
    Translate.prototype.addDynamicLanguage = /**
     * @param {?} language
     * @param {?} translations
     * @param {?} isAdmin
     * @return {?}
     */
    function (language, translations, isAdmin) {
        /** @type {?} */
        var newTranslations = {};
        translations.forEach((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            if (d && d.key && (!isAdmin || translate(d.key) === d.key)) {
                newTranslations[d.key] = d[language];
            }
        }));
        loadTranslations(newTranslations);
    };
    /**
     * @return {?}
     */
    Translate.prototype.getCurrentLanguage = /**
     * @return {?}
     */
    function () {
        return this.defaultLanguage;
    };
    /**
     * @return {?}
     */
    Translate.prototype.getCurrentAngularLocale = /**
     * @return {?}
     */
    function () {
        switch (this.defaultLanguage) {
            case 'en':
                return 'en-GB';
            case 'us':
                return 'en-US';
            case 'zhs':
                return 'zh-Hans';
            case 'zht':
                return 'zh-Hant';
            case 'br':
                return 'pt-BR';
            case 'fr':
            case 'de':
            case 'es':
            case 'nl':
            case 'pl':
            case 'it':
            case 'ru':
            case 'pt':
            case 'ja':
            case 'he':
            case 'ar':
            case 'th':
            case 'tr':
            case 'bg':
            case 'gr':
            case 'sl':
            case 'sk':
            case 'el':
                return this.defaultLanguage + "-" + this.defaultLanguage.toUpperCase();
            default:
                return 'en-US';
        }
    };
    /**
     * @param {?=} separator
     * @return {?}
     */
    Translate.prototype.getCurrentLanguageFull = /**
     * @param {?=} separator
     * @return {?}
     */
    function (separator) {
        if (separator === void 0) { separator = '_'; }
        /** @type {?} */
        var l = this.getCurrentLanguage();
        return this.getLanguageFull(l, separator);
    };
    /**
     * @param {?} key
     * @param {?=} params
     * @return {?}
     */
    Translate.prototype.get = /**
     * @param {?} key
     * @param {?=} params
     * @return {?}
     */
    function (key, params) {
        try {
            return translate(key, params); //this.ngTranslate.instant(key, params);
        }
        catch (err) {
            return key;
        }
    };
    /**
     * @param {?} language
     * @return {?}
     */
    Translate.prototype.getIcon = /**
     * @param {?} language
     * @return {?}
     */
    function (language) {
        switch (language) {
            case 'en':
                return 'flag-icon flag-icon-gb';
            case 'zhs':
                return 'flag-icon flag-icon-cn';
            case 'zht':
                return 'flag-icon flag-icon-hk';
            case 'ja':
                return 'flag-icon flag-icon-jp';
            case 'he':
                return 'flag-icon flag-icon-il';
            case 'ar':
                return 'flag-icon flag-icon-ae';
            case 'el':
                return 'flag-icon flag-icon-gr';
            case 'sl':
                return 'flag-icon flag-icon-si';
            case 'et':
                return 'flag-icon flag-icon-ee';
            case 'key':
                return 'yo-tag';
            default:
                return 'flag-icon flag-icon-' + language;
        }
    };
    /**
     * @param {?} language
     * @return {?}
     */
    Translate.prototype.getAll = /**
     * @param {?} language
     * @return {?}
     */
    function (language) {
        return Translate[language];
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Translate.prototype.polyglot = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return translateMulti(value);
    };
    /**
     * @return {?}
     */
    Translate.prototype.isCurrentLanguageRtl = /**
     * @return {?}
     */
    function () {
        return this.isRtl(this.getCurrentLanguage());
    };
    /**
     * @return {?}
     */
    Translate.prototype.isCurrentLanguageChinese = /**
     * @return {?}
     */
    function () {
        return isCurrentLanguageChinese();
    };
    /**
     * @param {?} language
     * @return {?}
     */
    Translate.prototype.isRtl = /**
     * @param {?} language
     * @return {?}
     */
    function (language) {
        if (language === 'he' || language === 'ar') {
            return true;
        }
        return false;
    };
    /**
     * @param {?} language
     * @param {?=} separator
     * @return {?}
     */
    Translate.prototype.getLanguageFull = /**
     * @param {?} language
     * @param {?=} separator
     * @return {?}
     */
    function (language, separator) {
        if (separator === void 0) { separator = '_'; }
        switch (language) {
            case 'us':
                return 'en' + separator + 'US';
            case 'en':
                return 'en' + separator + 'GB';
            case 'ua':
                return 'uk' + separator + 'UA';
            case 'zhs':
                return 'zh' + separator + 'CN';
            case 'zht':
                return 'zh' + separator + 'TW';
            case 'ae':
                return 'ar' + separator + 'AE';
            case 'br':
                return 'pt' + separator + 'BR';
            default:
                return language + separator + language.toUpperCase();
        }
    };
    Translate.availablesLanguage = AVAILABLE_LANGUAGES;
    Translate.availablesLanguageAll = ['all'].concat(Translate.availablesLanguage);
    Translate.currentLanguage = '';
    Translate.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Translate.ctorParameters = function () { return [
        { type: CoreConfig },
        { type: HttpClient }
    ]; };
    tslib_1.__decorate([
        Persistent('defaultLanguage'),
        tslib_1.__metadata("design:type", Object)
    ], Translate.prototype, "defaultLanguage", void 0);
    return Translate;
}());
export { Translate };
if (false) {
    /** @type {?} */
    Translate.availablesLanguage;
    /** @type {?} */
    Translate.availablesLanguageAll;
    /** @type {?} */
    Translate.currentLanguage;
    /**
     * @type {?}
     * @private
     */
    Translate.prototype.defaultLanguage;
    /**
     * @type {?}
     * @private
     */
    Translate.prototype._languageChange;
    /**
     * @type {?}
     * @private
     */
    Translate.prototype.coreConfig;
    /**
     * @type {?}
     * @protected
     */
    Translate.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90cmFuc2xhdGUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdHJhbnNsYXRlL3RyYW5zbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRTVILE1BQU0sS0FBTyxtQkFBbUIsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7QUFFcE47SUFTRSxtQkFBb0IsVUFBc0IsRUFBWSxJQUFnQjtRQUFsRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBWTtRQUY5RCxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7SUFFeUIsQ0FBQzs7OztJQUUxRSx3QkFBSTs7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S0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakMsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakMsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakMsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakMsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakMsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakM7Z0JBQ0UsT0FBTyxRQUFRLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN4RDtJQUNILENBQUM7SUEzTWEsNEJBQWtCLEdBQWtCLG1CQUFtQixDQUFDO0lBQ3hELCtCQUFxQixHQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNwRix5QkFBZSxHQUFXLEVBQUUsQ0FBQzs7Z0JBSjVDLFVBQVU7Ozs7Z0JBUEYsVUFBVTtnQkFFVixVQUFVOztJQVdjO1FBQTlCLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQzs7c0RBQXlCO0lBd016RCxnQkFBQztDQUFBLEFBOU1ELElBOE1DO1NBN01ZLFNBQVM7OztJQUNwQiw2QkFBc0U7O0lBQ3RFLGdDQUFrRzs7SUFDbEcsMEJBQTJDOzs7OztJQUUzQyxvQ0FBdUQ7Ozs7O0lBQ3ZELG9DQUFnRDs7Ozs7SUFFcEMsK0JBQThCOzs7OztJQUFFLHlCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmVDb25maWcsIFBlcnNpc3RlbnQgfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgdHJhbnNsYXRlLCBsb2FkVHJhbnNsYXRpb25zLCB0cmFuc2xhdGVNdWx0aSwgc2V0Q3VycmVudExhbmd1YWdlLCBpc0N1cnJlbnRMYW5ndWFnZUNoaW5lc2UgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5leHBvcnQgY29uc3QgQVZBSUxBQkxFX0xBTkdVQUdFUyA9IFsnZW4nLCAndXMnLCAnZnInLCAnZGUnLCAnZXMnLCAnbmwnLCAncGwnLCAnaXQnLCAncnUnLCAnemhzJywgJ3podCcsICdwdCcsICdrcicsICdqYScsICd1YScsICdoZScsICdhcicsICdjeicsICd0aCcsICd0cicsICdiZycsICdlbCcsICdzbCcsICdzaycsICdybycsICdodScsICdldCcsICdicicsICdrZXknXTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0ZSB7XG4gIHB1YmxpYyBzdGF0aWMgYXZhaWxhYmxlc0xhbmd1YWdlOiBBcnJheTxzdHJpbmc+ID0gQVZBSUxBQkxFX0xBTkdVQUdFUztcbiAgcHVibGljIHN0YXRpYyBhdmFpbGFibGVzTGFuZ3VhZ2VBbGw6IEFycmF5PHN0cmluZz4gPSBbJ2FsbCddLmNvbmNhdChUcmFuc2xhdGUuYXZhaWxhYmxlc0xhbmd1YWdlKTtcbiAgcHVibGljIHN0YXRpYyBjdXJyZW50TGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xuXG4gIEBQZXJzaXN0ZW50KCdkZWZhdWx0TGFuZ3VhZ2UnKSBwcml2YXRlIGRlZmF1bHRMYW5ndWFnZTtcbiAgcHJpdmF0ZSBfbGFuZ3VhZ2VDaGFuZ2UgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3JlQ29uZmlnOiBDb3JlQ29uZmlnLCBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCkge31cblxuICBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBicm93c2VyTGFuZ3VhZ2UgPSAnZW4nO1xuICAgIGlmICghdGhpcy5jb3JlQ29uZmlnLmlzVW5pdmVyc2FsKCkpIHtcbiAgICAgIGJyb3dzZXJMYW5ndWFnZSA9ICg8YW55PndpbmRvdykubmF2aWdhdG9yLnVzZXJMYW5ndWFnZSB8fCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlIHx8ICdlbic7XG4gICAgfVxuICAgIHRoaXMuZGVmYXVsdExhbmd1YWdlID0gdGhpcy5kZWZhdWx0TGFuZ3VhZ2UgfHwgYnJvd3Nlckxhbmd1YWdlO1xuICAgIHJldHVybiB0aGlzLnNldExhbmd1YWdlKHRoaXMuZGVmYXVsdExhbmd1YWdlLCBmYWxzZSk7XG4gIH1cblxuICBnZXQgbGFuZ3VhZ2VDaGFuZ2UkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY2hlY2tMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgaWYgKGxhbmd1YWdlID09PSAna2V5Jykge1xuICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgIH1cbiAgICBpZiAobGFuZ3VhZ2UgPT09ICd6aC1IYW50LUhLJyB8fCBsYW5ndWFnZSA9PT0gJ3podCcpIHtcbiAgICAgIGxhbmd1YWdlID0gJ3podCc7XG4gICAgfSBlbHNlIGlmIChsYW5ndWFnZSA9PT0gJ3poLUhhbnMtR0InIHx8IGxhbmd1YWdlLnN0YXJ0c1dpdGgoJ3poJykpIHtcbiAgICAgIGxhbmd1YWdlID0gJ3pocyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhbmd1YWdlID0gbGFuZ3VhZ2Uuc3Vic3RyaW5nKDAsIDIpO1xuICAgIH1cbiAgICBpZiAoVHJhbnNsYXRlLmF2YWlsYWJsZXNMYW5ndWFnZS5pbmRleE9mKGxhbmd1YWdlKSA8IDApIHtcbiAgICAgIGxhbmd1YWdlID0gJ2VuJztcbiAgICB9XG4gICAgcmV0dXJuIGxhbmd1YWdlO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZywgcmVsb2FkOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChsYW5ndWFnZSkge1xuICAgICAgICBsYW5ndWFnZSA9IHRoaXMuY2hlY2tMYW5ndWFnZShsYW5ndWFnZSk7XG4gICAgICAgIHRoaXMuZGVmYXVsdExhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgICAgIC8vdGhpcy5uZ1RyYW5zbGF0ZS5zZXREZWZhdWx0TGFuZyh0aGlzLmRlZmF1bHRMYW5ndWFnZSk7XG4gICAgICAgIC8vIG1vbWVudC5sb2NhbGUodGhpcy5nZXRMYW5ndWFnZUZ1bGwobGFuZ3VhZ2UsICctJykpO1xuICAgICAgICB0aGlzLl9sYW5ndWFnZUNoYW5nZS5uZXh0KGxhbmd1YWdlKTtcbiAgICAgICAgVHJhbnNsYXRlLmN1cnJlbnRMYW5ndWFnZSA9IGxhbmd1YWdlO1xuICAgICAgICAoPGFueT53aW5kb3cpLl9fY3VycmVudExhbmd1YWdlX18gPSBsYW5ndWFnZTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgICAgIGlmICh0aGlzLmlzUnRsKGxhbmd1YWdlKSkge1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmRpciA9ICdydGwnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZGlyID0gJ2x0cic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaHR0cC5nZXQoJy4vYXNzZXRzL2kxOG4vJyArIGxhbmd1YWdlICsgJy5qc29uJykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgLy8gdGhpcy5uZ1RyYW5zbGF0ZS51c2UobGFuZ3VhZ2UpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgc2V0Q3VycmVudExhbmd1YWdlKGxhbmd1YWdlKTtcbiAgICAgICAgICBsb2FkVHJhbnNsYXRpb25zKHJlcyk7XG4gICAgICAgICAgcmVzb2x2ZShsYW5ndWFnZSk7XG4gICAgICAgICAgaWYgKHJlbG9hZCkge1xuICAgICAgICAgICAgdGhpcy5jb3JlQ29uZmlnLnJlbG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkRHluYW1pY0xhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcsIHRyYW5zbGF0aW9uczogQXJyYXk8YW55PiwgaXNBZG1pbjogYm9vbGVhbikge1xuICAgIGxldCBuZXdUcmFuc2xhdGlvbnM6IGFueSA9IHt9O1xuICAgIHRyYW5zbGF0aW9ucy5mb3JFYWNoKGQgPT4ge1xuICAgICAgaWYgKGQgJiYgZC5rZXkgJiYgKCFpc0FkbWluIHx8IHRyYW5zbGF0ZShkLmtleSkgPT09IGQua2V5KSkge1xuICAgICAgICBuZXdUcmFuc2xhdGlvbnNbZC5rZXldID0gZFtsYW5ndWFnZV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgbG9hZFRyYW5zbGF0aW9ucyhuZXdUcmFuc2xhdGlvbnMpO1xuICB9XG5cbiAgZ2V0Q3VycmVudExhbmd1YWdlKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRMYW5ndWFnZTtcbiAgfVxuXG4gIGdldEN1cnJlbnRBbmd1bGFyTG9jYWxlKCkge1xuICAgIHN3aXRjaCAodGhpcy5kZWZhdWx0TGFuZ3VhZ2UpIHtcbiAgICAgIGNhc2UgJ2VuJzpcbiAgICAgICAgcmV0dXJuICdlbi1HQic7XG4gICAgICBjYXNlICd1cyc6XG4gICAgICAgIHJldHVybiAnZW4tVVMnO1xuICAgICAgY2FzZSAnemhzJzpcbiAgICAgICAgcmV0dXJuICd6aC1IYW5zJztcbiAgICAgIGNhc2UgJ3podCc6XG4gICAgICAgIHJldHVybiAnemgtSGFudCc7XG4gICAgICBjYXNlICdicic6XG4gICAgICAgIHJldHVybiAncHQtQlInO1xuICAgICAgY2FzZSAnZnInOlxuICAgICAgY2FzZSAnZGUnOlxuICAgICAgY2FzZSAnZXMnOlxuICAgICAgY2FzZSAnbmwnOlxuICAgICAgY2FzZSAncGwnOlxuICAgICAgY2FzZSAnaXQnOlxuICAgICAgY2FzZSAncnUnOlxuICAgICAgY2FzZSAncHQnOlxuICAgICAgY2FzZSAnamEnOlxuICAgICAgY2FzZSAnaGUnOlxuICAgICAgY2FzZSAnYXInOlxuICAgICAgY2FzZSAndGgnOlxuICAgICAgY2FzZSAndHInOlxuICAgICAgY2FzZSAnYmcnOlxuICAgICAgY2FzZSAnZ3InOlxuICAgICAgY2FzZSAnc2wnOlxuICAgICAgY2FzZSAnc2snOlxuICAgICAgY2FzZSAnZWwnOlxuICAgICAgICByZXR1cm4gYCR7dGhpcy5kZWZhdWx0TGFuZ3VhZ2V9LSR7dGhpcy5kZWZhdWx0TGFuZ3VhZ2UudG9VcHBlckNhc2UoKX1gO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdlbi1VUyc7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q3VycmVudExhbmd1YWdlRnVsbChzZXBhcmF0b3IgPSAnXycpIHtcbiAgICBsZXQgbCA9IHRoaXMuZ2V0Q3VycmVudExhbmd1YWdlKCk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TGFuZ3VhZ2VGdWxsKGwsIHNlcGFyYXRvcik7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcsIHBhcmFtcz86IE9iamVjdCk6IHN0cmluZyB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGUoa2V5LCBwYXJhbXMpOyAvL3RoaXMubmdUcmFuc2xhdGUuaW5zdGFudChrZXksIHBhcmFtcyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuXG4gIGdldEljb24obGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcbiAgICAgIGNhc2UgJ2VuJzpcbiAgICAgICAgcmV0dXJuICdmbGFnLWljb24gZmxhZy1pY29uLWdiJztcbiAgICAgIGNhc2UgJ3pocyc6XG4gICAgICAgIHJldHVybiAnZmxhZy1pY29uIGZsYWctaWNvbi1jbic7XG4gICAgICBjYXNlICd6aHQnOlxuICAgICAgICByZXR1cm4gJ2ZsYWctaWNvbiBmbGFnLWljb24taGsnO1xuICAgICAgY2FzZSAnamEnOlxuICAgICAgICByZXR1cm4gJ2ZsYWctaWNvbiBmbGFnLWljb24tanAnO1xuICAgICAgY2FzZSAnaGUnOlxuICAgICAgICByZXR1cm4gJ2ZsYWctaWNvbiBmbGFnLWljb24taWwnO1xuICAgICAgY2FzZSAnYXInOlxuICAgICAgICByZXR1cm4gJ2ZsYWctaWNvbiBmbGFnLWljb24tYWUnO1xuICAgICAgY2FzZSAnZWwnOlxuICAgICAgICByZXR1cm4gJ2ZsYWctaWNvbiBmbGFnLWljb24tZ3InO1xuICAgICAgY2FzZSAnc2wnOlxuICAgICAgICByZXR1cm4gJ2ZsYWctaWNvbiBmbGFnLWljb24tc2knO1xuICAgICAgY2FzZSAnZXQnOlxuICAgICAgICByZXR1cm4gJ2ZsYWctaWNvbiBmbGFnLWljb24tZWUnO1xuICAgICAgY2FzZSAna2V5JzpcbiAgICAgICAgcmV0dXJuICd5by10YWcnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdmbGFnLWljb24gZmxhZy1pY29uLScgKyBsYW5ndWFnZTtcbiAgICB9XG4gIH1cblxuICBnZXRBbGwobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIHJldHVybiBUcmFuc2xhdGVbbGFuZ3VhZ2VdO1xuICB9XG5cbiAgcG9seWdsb3QodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0cmFuc2xhdGVNdWx0aSh2YWx1ZSk7XG4gIH1cblxuICBpc0N1cnJlbnRMYW5ndWFnZVJ0bCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1J0bCh0aGlzLmdldEN1cnJlbnRMYW5ndWFnZSgpKTtcbiAgfVxuXG4gIGlzQ3VycmVudExhbmd1YWdlQ2hpbmVzZSgpIHtcbiAgICByZXR1cm4gaXNDdXJyZW50TGFuZ3VhZ2VDaGluZXNlKCk7XG4gIH1cblxuICBpc1J0bChsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgaWYgKGxhbmd1YWdlID09PSAnaGUnIHx8IGxhbmd1YWdlID09PSAnYXInKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0TGFuZ3VhZ2VGdWxsKGxhbmd1YWdlOiBzdHJpbmcsIHNlcGFyYXRvciA9ICdfJykge1xuICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcbiAgICAgIGNhc2UgJ3VzJzpcbiAgICAgICAgcmV0dXJuICdlbicgKyBzZXBhcmF0b3IgKyAnVVMnO1xuICAgICAgY2FzZSAnZW4nOlxuICAgICAgICByZXR1cm4gJ2VuJyArIHNlcGFyYXRvciArICdHQic7XG4gICAgICBjYXNlICd1YSc6XG4gICAgICAgIHJldHVybiAndWsnICsgc2VwYXJhdG9yICsgJ1VBJztcbiAgICAgIGNhc2UgJ3pocyc6XG4gICAgICAgIHJldHVybiAnemgnICsgc2VwYXJhdG9yICsgJ0NOJztcbiAgICAgIGNhc2UgJ3podCc6XG4gICAgICAgIHJldHVybiAnemgnICsgc2VwYXJhdG9yICsgJ1RXJztcbiAgICAgIGNhc2UgJ2FlJzpcbiAgICAgICAgcmV0dXJuICdhcicgKyBzZXBhcmF0b3IgKyAnQUUnO1xuICAgICAgY2FzZSAnYnInOlxuICAgICAgICByZXR1cm4gJ3B0JyArIHNlcGFyYXRvciArICdCUic7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbGFuZ3VhZ2UgKyBzZXBhcmF0b3IgKyBsYW5ndWFnZS50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgfVxufVxuIl19