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
export const AVAILABLE_LANGUAGES = ['en', 'us', 'fr', 'de', 'es', 'nl', 'pl', 'it', 'ru', 'zhs', 'zht', 'pt', 'kr', 'ja', 'ua', 'he', 'ar', 'cz', 'th', 'tr', 'bg', 'el', 'sl', 'sk', 'ro', 'hu', 'et', 'br', 'key'];
export class Translate {
    /**
     * @param {?} coreConfig
     * @param {?} http
     */
    constructor(coreConfig, http) {
        this.coreConfig = coreConfig;
        this.http = http;
        this._languageChange = new Subject();
    }
    /**
     * @return {?}
     */
    init() {
        /** @type {?} */
        let browserLanguage = 'en';
        if (!this.coreConfig.isUniversal()) {
            browserLanguage = ((/** @type {?} */ (window))).navigator.userLanguage || window.navigator.language || 'en';
        }
        this.defaultLanguage = this.defaultLanguage || browserLanguage;
        return this.setLanguage(this.defaultLanguage, false);
    }
    /**
     * @return {?}
     */
    get languageChange$() {
        return this._languageChange.asObservable();
    }
    /**
     * @param {?} language
     * @return {?}
     */
    checkLanguage(language) {
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
    }
    /**
     * @param {?} language
     * @param {?=} reload
     * @return {?}
     */
    setLanguage(language, reload = true) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (language) {
                language = this.checkLanguage(language);
                this.defaultLanguage = language;
                //this.ngTranslate.setDefaultLang(this.defaultLanguage);
                // moment.locale(this.getLanguageFull(language, '-'));
                this._languageChange.next(language);
                Translate.currentLanguage = language;
                ((/** @type {?} */ (window))).__currentLanguage__ = language;
                if (typeof window !== 'undefined' && window.document) {
                    if (this.isRtl(language)) {
                        window.document.dir = 'rtl';
                    }
                    else {
                        window.document.dir = 'ltr';
                    }
                }
                this.http.get('./assets/i18n/' + language + '.json').subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => {
                    // this.ngTranslate.use(language).subscribe(() => {
                    setCurrentLanguage(language);
                    loadTranslations(res);
                    resolve(language);
                    if (reload) {
                        this.coreConfig.reload();
                    }
                }));
            }
            else {
                resolve(null);
            }
        }));
    }
    /**
     * @param {?} language
     * @param {?} translations
     * @param {?} isAdmin
     * @return {?}
     */
    addDynamicLanguage(language, translations, isAdmin) {
        /** @type {?} */
        let newTranslations = {};
        translations.forEach((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            if (d && d.key && (!isAdmin || translate(d.key) === d.key)) {
                newTranslations[d.key] = d[language];
            }
        }));
        loadTranslations(newTranslations);
    }
    /**
     * @return {?}
     */
    getCurrentLanguage() {
        return this.defaultLanguage;
    }
    /**
     * @return {?}
     */
    getCurrentAngularLocale() {
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
                return `${this.defaultLanguage}-${this.defaultLanguage.toUpperCase()}`;
            default:
                return 'en-US';
        }
    }
    /**
     * @param {?=} separator
     * @return {?}
     */
    getCurrentLanguageFull(separator = '_') {
        /** @type {?} */
        let l = this.getCurrentLanguage();
        return this.getLanguageFull(l, separator);
    }
    /**
     * @param {?} key
     * @param {?=} params
     * @return {?}
     */
    get(key, params) {
        try {
            return translate(key, params); //this.ngTranslate.instant(key, params);
        }
        catch (err) {
            return key;
        }
    }
    /**
     * @param {?} language
     * @return {?}
     */
    getIcon(language) {
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
    }
    /**
     * @param {?} language
     * @return {?}
     */
    getAll(language) {
        return Translate[language];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    polyglot(value) {
        return translateMulti(value);
    }
    /**
     * @return {?}
     */
    isCurrentLanguageRtl() {
        return this.isRtl(this.getCurrentLanguage());
    }
    /**
     * @return {?}
     */
    isCurrentLanguageChinese() {
        return isCurrentLanguageChinese();
    }
    /**
     * @param {?} language
     * @return {?}
     */
    isRtl(language) {
        if (language === 'he' || language === 'ar') {
            return true;
        }
        return false;
    }
    /**
     * @param {?} language
     * @param {?=} separator
     * @return {?}
     */
    getLanguageFull(language, separator = '_') {
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
    }
}
Translate.availablesLanguage = AVAILABLE_LANGUAGES;
Translate.availablesLanguageAll = ['all'].concat(Translate.availablesLanguage);
Translate.currentLanguage = '';
Translate.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Translate.ctorParameters = () => [
    { type: CoreConfig },
    { type: HttpClient }
];
tslib_1.__decorate([
    Persistent('defaultLanguage'),
    tslib_1.__metadata("design:type", Object)
], Translate.prototype, "defaultLanguage", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly90cmFuc2xhdGUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvdHJhbnNsYXRlL3RyYW5zbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRTVILE1BQU0sT0FBTyxtQkFBbUIsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7QUFHcE4sTUFBTSxPQUFPLFNBQVM7Ozs7O0lBUXBCLFlBQW9CLFVBQXNCLEVBQVksSUFBZ0I7UUFBbEQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFZLFNBQUksR0FBSixJQUFJLENBQVk7UUFGOUQsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO0lBRXlCLENB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RyxJQUFJLENBQUM7WUFDakMsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakMsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakMsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakM7Z0JBQ0UsT0FBTyxRQUFRLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN4RDtJQUNILENBQUM7O0FBM01hLDRCQUFrQixHQUFrQixtQkFBbUIsQ0FBQztBQUN4RCwrQkFBcUIsR0FBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDcEYseUJBQWUsR0FBVyxFQUFFLENBQUM7O1lBSjVDLFVBQVU7Ozs7WUFQRixVQUFVO1lBRVYsVUFBVTs7QUFXYztJQUE5QixVQUFVLENBQUMsaUJBQWlCLENBQUM7O2tEQUF5Qjs7O0lBSnZELDZCQUFzRTs7SUFDdEUsZ0NBQWtHOztJQUNsRywwQkFBMkM7Ozs7O0lBRTNDLG9DQUF1RDs7Ozs7SUFDdkQsb0NBQWdEOzs7OztJQUVwQywrQkFBOEI7Ozs7O0lBQUUseUJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZUNvbmZpZywgUGVyc2lzdGVudCB9IGZyb20gJ0BzaGFyZWQvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyB0cmFuc2xhdGUsIGxvYWRUcmFuc2xhdGlvbnMsIHRyYW5zbGF0ZU11bHRpLCBzZXRDdXJyZW50TGFuZ3VhZ2UsIGlzQ3VycmVudExhbmd1YWdlQ2hpbmVzZSB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbmV4cG9ydCBjb25zdCBBVkFJTEFCTEVfTEFOR1VBR0VTID0gWydlbicsICd1cycsICdmcicsICdkZScsICdlcycsICdubCcsICdwbCcsICdpdCcsICdydScsICd6aHMnLCAnemh0JywgJ3B0JywgJ2tyJywgJ2phJywgJ3VhJywgJ2hlJywgJ2FyJywgJ2N6JywgJ3RoJywgJ3RyJywgJ2JnJywgJ2VsJywgJ3NsJywgJ3NrJywgJ3JvJywgJ2h1JywgJ2V0JywgJ2JyJywgJ2tleSddO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlIHtcbiAgcHVibGljIHN0YXRpYyBhdmFpbGFibGVzTGFuZ3VhZ2U6IEFycmF5PHN0cmluZz4gPSBBVkFJTEFCTEVfTEFOR1VBR0VTO1xuICBwdWJsaWMgc3RhdGljIGF2YWlsYWJsZXNMYW5ndWFnZUFsbDogQXJyYXk8c3RyaW5nPiA9IFsnYWxsJ10uY29uY2F0KFRyYW5zbGF0ZS5hdmFpbGFibGVzTGFuZ3VhZ2UpO1xuICBwdWJsaWMgc3RhdGljIGN1cnJlbnRMYW5ndWFnZTogc3RyaW5nID0gJyc7XG5cbiAgQFBlcnNpc3RlbnQoJ2RlZmF1bHRMYW5ndWFnZScpIHByaXZhdGUgZGVmYXVsdExhbmd1YWdlO1xuICBwcml2YXRlIF9sYW5ndWFnZUNoYW5nZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvcmVDb25maWc6IENvcmVDb25maWcsIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IGJyb3dzZXJMYW5ndWFnZSA9ICdlbic7XG4gICAgaWYgKCF0aGlzLmNvcmVDb25maWcuaXNVbml2ZXJzYWwoKSkge1xuICAgICAgYnJvd3Nlckxhbmd1YWdlID0gKDxhbnk+d2luZG93KS5uYXZpZ2F0b3IudXNlckxhbmd1YWdlIHx8IHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgJ2VuJztcbiAgICB9XG4gICAgdGhpcy5kZWZhdWx0TGFuZ3VhZ2UgPSB0aGlzLmRlZmF1bHRMYW5ndWFnZSB8fCBicm93c2VyTGFuZ3VhZ2U7XG4gICAgcmV0dXJuIHRoaXMuc2V0TGFuZ3VhZ2UodGhpcy5kZWZhdWx0TGFuZ3VhZ2UsIGZhbHNlKTtcbiAgfVxuXG4gIGdldCBsYW5ndWFnZUNoYW5nZSQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2VDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjaGVja0xhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBpZiAobGFuZ3VhZ2UgPT09ICdrZXknKSB7XG4gICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgfVxuICAgIGlmIChsYW5ndWFnZSA9PT0gJ3poLUhhbnQtSEsnIHx8IGxhbmd1YWdlID09PSAnemh0Jykge1xuICAgICAgbGFuZ3VhZ2UgPSAnemh0JztcbiAgICB9IGVsc2UgaWYgKGxhbmd1YWdlID09PSAnemgtSGFucy1HQicgfHwgbGFuZ3VhZ2Uuc3RhcnRzV2l0aCgnemgnKSkge1xuICAgICAgbGFuZ3VhZ2UgPSAnemhzJztcbiAgICB9IGVsc2Uge1xuICAgICAgbGFuZ3VhZ2UgPSBsYW5ndWFnZS5zdWJzdHJpbmcoMCwgMik7XG4gICAgfVxuICAgIGlmIChUcmFuc2xhdGUuYXZhaWxhYmxlc0xhbmd1YWdlLmluZGV4T2YobGFuZ3VhZ2UpIDwgMCkge1xuICAgICAgbGFuZ3VhZ2UgPSAnZW4nO1xuICAgIH1cbiAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gIH1cblxuICBzZXRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nLCByZWxvYWQ6IGJvb2xlYW4gPSB0cnVlKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKGxhbmd1YWdlKSB7XG4gICAgICAgIGxhbmd1YWdlID0gdGhpcy5jaGVja0xhbmd1YWdlKGxhbmd1YWdlKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0TGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgICAgICAgLy90aGlzLm5nVHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKHRoaXMuZGVmYXVsdExhbmd1YWdlKTtcbiAgICAgICAgLy8gbW9tZW50LmxvY2FsZSh0aGlzLmdldExhbmd1YWdlRnVsbChsYW5ndWFnZSwgJy0nKSk7XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlQ2hhbmdlLm5leHQobGFuZ3VhZ2UpO1xuICAgICAgICBUcmFuc2xhdGUuY3VycmVudExhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgICAgICg8YW55PndpbmRvdykuX19jdXJyZW50TGFuZ3VhZ2VfXyA9IGxhbmd1YWdlO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNSdGwobGFuZ3VhZ2UpKSB7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuZGlyID0gJ3J0bCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5kaXIgPSAnbHRyJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5odHRwLmdldCgnLi9hc3NldHMvaTE4bi8nICsgbGFuZ3VhZ2UgKyAnLmpzb24nKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAvLyB0aGlzLm5nVHJhbnNsYXRlLnVzZShsYW5ndWFnZSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBzZXRDdXJyZW50TGFuZ3VhZ2UobGFuZ3VhZ2UpO1xuICAgICAgICAgIGxvYWRUcmFuc2xhdGlvbnMocmVzKTtcbiAgICAgICAgICByZXNvbHZlKGxhbmd1YWdlKTtcbiAgICAgICAgICBpZiAocmVsb2FkKSB7XG4gICAgICAgICAgICB0aGlzLmNvcmVDb25maWcucmVsb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhZGREeW5hbWljTGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZywgdHJhbnNsYXRpb25zOiBBcnJheTxhbnk+LCBpc0FkbWluOiBib29sZWFuKSB7XG4gICAgbGV0IG5ld1RyYW5zbGF0aW9uczogYW55ID0ge307XG4gICAgdHJhbnNsYXRpb25zLmZvckVhY2goZCA9PiB7XG4gICAgICBpZiAoZCAmJiBkLmtleSAmJiAoIWlzQWRtaW4gfHwgdHJhbnNsYXRlKGQua2V5KSA9PT0gZC5rZXkpKSB7XG4gICAgICAgIG5ld1RyYW5zbGF0aW9uc1tkLmtleV0gPSBkW2xhbmd1YWdlXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsb2FkVHJhbnNsYXRpb25zKG5ld1RyYW5zbGF0aW9ucyk7XG4gIH1cblxuICBnZXRDdXJyZW50TGFuZ3VhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdExhbmd1YWdlO1xuICB9XG5cbiAgZ2V0Q3VycmVudEFuZ3VsYXJMb2NhbGUoKSB7XG4gICAgc3dpdGNoICh0aGlzLmRlZmF1bHRMYW5ndWFnZSkge1xuICAgICAgY2FzZSAnZW4nOlxuICAgICAgICByZXR1cm4gJ2VuLUdCJztcbiAgICAgIGNhc2UgJ3VzJzpcbiAgICAgICAgcmV0dXJuICdlbi1VUyc7XG4gICAgICBjYXNlICd6aHMnOlxuICAgICAgICByZXR1cm4gJ3poLUhhbnMnO1xuICAgICAgY2FzZSAnemh0JzpcbiAgICAgICAgcmV0dXJuICd6aC1IYW50JztcbiAgICAgIGNhc2UgJ2JyJzpcbiAgICAgICAgcmV0dXJuICdwdC1CUic7XG4gICAgICBjYXNlICdmcic6XG4gICAgICBjYXNlICdkZSc6XG4gICAgICBjYXNlICdlcyc6XG4gICAgICBjYXNlICdubCc6XG4gICAgICBjYXNlICdwbCc6XG4gICAgICBjYXNlICdpdCc6XG4gICAgICBjYXNlICdydSc6XG4gICAgICBjYXNlICdwdCc6XG4gICAgICBjYXNlICdqYSc6XG4gICAgICBjYXNlICdoZSc6XG4gICAgICBjYXNlICdhcic6XG4gICAgICBjYXNlICd0aCc6XG4gICAgICBjYXNlICd0cic6XG4gICAgICBjYXNlICdiZyc6XG4gICAgICBjYXNlICdncic6XG4gICAgICBjYXNlICdzbCc6XG4gICAgICBjYXNlICdzayc6XG4gICAgICBjYXNlICdlbCc6XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmRlZmF1bHRMYW5ndWFnZX0tJHt0aGlzLmRlZmF1bHRMYW5ndWFnZS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2VuLVVTJztcbiAgICB9XG4gIH1cblxuICBnZXRDdXJyZW50TGFuZ3VhZ2VGdWxsKHNlcGFyYXRvciA9ICdfJykge1xuICAgIGxldCBsID0gdGhpcy5nZXRDdXJyZW50TGFuZ3VhZ2UoKTtcbiAgICByZXR1cm4gdGhpcy5nZXRMYW5ndWFnZUZ1bGwobCwgc2VwYXJhdG9yKTtcbiAgfVxuXG4gIGdldChrZXk6IHN0cmluZywgcGFyYW1zPzogT2JqZWN0KTogc3RyaW5nIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRyYW5zbGF0ZShrZXksIHBhcmFtcyk7IC8vdGhpcy5uZ1RyYW5zbGF0ZS5pbnN0YW50KGtleSwgcGFyYW1zKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG5cbiAgZ2V0SWNvbihsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgc3dpdGNoIChsYW5ndWFnZSkge1xuICAgICAgY2FzZSAnZW4nOlxuICAgICAgICByZXR1cm4gJ2ZsYWctaWNvbiBmbGFnLWljb24tZ2InO1xuICAgICAgY2FzZSAnemhzJzpcbiAgICAgICAgcmV0dXJuICdmbGFnLWljb24gZmxhZy1pY29uLWNuJztcbiAgICAgIGNhc2UgJ3podCc6XG4gICAgICAgIHJldHVybiAnZmxhZy1pY29uIGZsYWctaWNvbi1oayc7XG4gICAgICBjYXNlICdqYSc6XG4gICAgICAgIHJldHVybiAnZmxhZy1pY29uIGZsYWctaWNvbi1qcCc7XG4gICAgICBjYXNlICdoZSc6XG4gICAgICAgIHJldHVybiAnZmxhZy1pY29uIGZsYWctaWNvbi1pbCc7XG4gICAgICBjYXNlICdhcic6XG4gICAgICAgIHJldHVybiAnZmxhZy1pY29uIGZsYWctaWNvbi1hZSc7XG4gICAgICBjYXNlICdlbCc6XG4gICAgICAgIHJldHVybiAnZmxhZy1pY29uIGZsYWctaWNvbi1ncic7XG4gICAgICBjYXNlICdzbCc6XG4gICAgICAgIHJldHVybiAnZmxhZy1pY29uIGZsYWctaWNvbi1zaSc7XG4gICAgICBjYXNlICdldCc6XG4gICAgICAgIHJldHVybiAnZmxhZy1pY29uIGZsYWctaWNvbi1lZSc7XG4gICAgICBjYXNlICdrZXknOlxuICAgICAgICByZXR1cm4gJ3lvLXRhZyc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ2ZsYWctaWNvbiBmbGFnLWljb24tJyArIGxhbmd1YWdlO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbChsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFRyYW5zbGF0ZVtsYW5ndWFnZV07XG4gIH1cblxuICBwb2x5Z2xvdCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRyYW5zbGF0ZU11bHRpKHZhbHVlKTtcbiAgfVxuXG4gIGlzQ3VycmVudExhbmd1YWdlUnRsKCkge1xuICAgIHJldHVybiB0aGlzLmlzUnRsKHRoaXMuZ2V0Q3VycmVudExhbmd1YWdlKCkpO1xuICB9XG5cbiAgaXNDdXJyZW50TGFuZ3VhZ2VDaGluZXNlKCkge1xuICAgIHJldHVybiBpc0N1cnJlbnRMYW5ndWFnZUNoaW5lc2UoKTtcbiAgfVxuXG4gIGlzUnRsKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBpZiAobGFuZ3VhZ2UgPT09ICdoZScgfHwgbGFuZ3VhZ2UgPT09ICdhcicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRMYW5ndWFnZUZ1bGwobGFuZ3VhZ2U6IHN0cmluZywgc2VwYXJhdG9yID0gJ18nKSB7XG4gICAgc3dpdGNoIChsYW5ndWFnZSkge1xuICAgICAgY2FzZSAndXMnOlxuICAgICAgICByZXR1cm4gJ2VuJyArIHNlcGFyYXRvciArICdVUyc7XG4gICAgICBjYXNlICdlbic6XG4gICAgICAgIHJldHVybiAnZW4nICsgc2VwYXJhdG9yICsgJ0dCJztcbiAgICAgIGNhc2UgJ3VhJzpcbiAgICAgICAgcmV0dXJuICd1aycgKyBzZXBhcmF0b3IgKyAnVUEnO1xuICAgICAgY2FzZSAnemhzJzpcbiAgICAgICAgcmV0dXJuICd6aCcgKyBzZXBhcmF0b3IgKyAnQ04nO1xuICAgICAgY2FzZSAnemh0JzpcbiAgICAgICAgcmV0dXJuICd6aCcgKyBzZXBhcmF0b3IgKyAnVFcnO1xuICAgICAgY2FzZSAnYWUnOlxuICAgICAgICByZXR1cm4gJ2FyJyArIHNlcGFyYXRvciArICdBRSc7XG4gICAgICBjYXNlICdicic6XG4gICAgICAgIHJldHVybiAncHQnICsgc2VwYXJhdG9yICsgJ0JSJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsYW5ndWFnZSArIHNlcGFyYXRvciArIGxhbmd1YWdlLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=