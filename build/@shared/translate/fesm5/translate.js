import { CommonModule, registerLocaleData } from '@angular/common';
import { __spread, __decorate, __metadata } from 'tslib';
import { CoreConfig, Persistent } from '@shared/common';
import { Subject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { translate, loadTranslations, translateMulti, setCurrentLanguage, isCurrentLanguageChinese } from '@shared/stencil';
import { Injectable, Pipe, NgModule } from '@angular/core';
import { isUndefined } from 'lodash-es';
import localeEnGB from '@angular/common/locales/en-GB';
import localeEnGBExtra from '@angular/common/locales/extra/en';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import localeNl from '@angular/common/locales/nl';
import localeNlExtra from '@angular/common/locales/extra/nl';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
import localeIt from '@angular/common/locales/it';
import localeItExtra from '@angular/common/locales/extra/it';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import localeZhs from '@angular/common/locales/zh-Hans';
import localeZhsExtra from '@angular/common/locales/extra/zh-Hans';
import localeZht from '@angular/common/locales/zh-Hant';
import localeZhtExtra from '@angular/common/locales/extra/zh-Hant';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import localeJa from '@angular/common/locales/ja';
import localeJaExtra from '@angular/common/locales/extra/ja';
import localeHe from '@angular/common/locales/he';
import localeHeExtra from '@angular/common/locales/extra/he';
import localeAr from '@angular/common/locales/ar';
import localeArExtra from '@angular/common/locales/extra/ar';
import localeTh from '@angular/common/locales/th';
import localeThExtra from '@angular/common/locales/extra/th';
import localeTr from '@angular/common/locales/tr';
import localeTrExtra from '@angular/common/locales/extra/tr';
import localeBg from '@angular/common/locales/bg';
import localeBgExtra from '@angular/common/locales/extra/bg';
import localeEl from '@angular/common/locales/el';
import localeElExtra from '@angular/common/locales/extra/el';
import localeSl from '@angular/common/locales/sl';
import localeSlExtra from '@angular/common/locales/extra/sl';
import localeSk from '@angular/common/locales/sk';
import localeSkExtra from '@angular/common/locales/extra/sk';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var AVAILABLE_LANGUAGES = ['en', 'us', 'fr', 'de', 'es', 'nl', 'pl', 'it', 'ru', 'zhs', 'zht', 'pt', 'kr', 'ja', 'ua', 'he', 'ar', 'cz', 'th', 'tr', 'bg', 'el', 'sl', 'sk', 'ro', 'hu', 'et', 'br', 'key'];
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
    __decorate([
        Persistent('defaultLanguage'),
        __metadata("design:type", Object)
    ], Translate.prototype, "defaultLanguage", void 0);
    return Translate;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(translate$$1) {
        this.translate = translate$$1;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    TranslatePipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        /** @type {?} */
        var interpolateParams;
        if (!isUndefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                /** @type {?} */
                var validArgs = args[0].replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":').replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError("Wrong parameter in TranslatePipe. Expected a valid Object, received: " + args[0]);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        return this.translate.get(value, interpolateParams);
    };
    TranslatePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'translate'
                },] }
    ];
    /** @nocollapse */
    TranslatePipe.ctorParameters = function () { return [
        { type: Translate }
    ]; };
    return TranslatePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TranslateModule = /** @class */ (function () {
    function TranslateModule() {
    }
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    TranslateModule.forRoot = /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    function (configuredProviders) {
        if (configuredProviders === void 0) { configuredProviders = []; }
        return {
            ngModule: TranslateModule,
            providers: __spread([Translate], configuredProviders)
        };
    };
    TranslateModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [TranslatePipe],
                    imports: [CommonModule, HttpClientModule],
                    exports: [TranslatePipe]
                },] }
    ];
    return TranslateModule;
}());
registerLocaleData(localeEnGB, 'en-GB', localeEnGBExtra);
registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
registerLocaleData(localeDe, 'de-DE', localeDeExtra);
registerLocaleData(localeEs, 'es-ES', localeEsExtra);
registerLocaleData(localeNl, 'nl-NL', localeNlExtra);
registerLocaleData(localePl, 'pl-PL', localePlExtra);
registerLocaleData(localeIt, 'it-IT', localeItExtra);
registerLocaleData(localeRu, 'ru-RU', localeRuExtra);
registerLocaleData(localeZhs, 'zh-Hans', localeZhsExtra);
registerLocaleData(localeZht, 'zh-Hant', localeZhtExtra);
registerLocaleData(localePt, 'pt-PT', localePtExtra);
registerLocaleData(localePt, 'pt-BR', localePtExtra);
registerLocaleData(localeJa, 'ja-JA', localeJaExtra);
registerLocaleData(localeHe, 'he-HE', localeHeExtra);
registerLocaleData(localeAr, 'ar-AR', localeArExtra);
registerLocaleData(localeTh, 'th-TH', localeThExtra);
registerLocaleData(localeTr, 'tr-TR', localeTrExtra);
registerLocaleData(localeBg, 'bg-BG', localeBgExtra);
registerLocaleData(localeEl, 'el-EL', localeElExtra);
registerLocaleData(localeSl, 'sl-SL', localeSlExtra);
registerLocaleData(localeSk, 'sk-SK', localeSkExtra);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { TranslateModule, AVAILABLE_LANGUAGES, Translate, TranslatePipe };

//# sourceMappingURL=translate.js.map