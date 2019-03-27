import { CommonModule, registerLocaleData } from '@angular/common';
import { __decorate, __metadata } from 'tslib';
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
const AVAILABLE_LANGUAGES = ['en', 'us', 'fr', 'de', 'es', 'nl', 'pl', 'it', 'ru', 'zhs', 'zht', 'pt', 'kr', 'ja', 'ua', 'he', 'ar', 'cz', 'th', 'tr', 'bg', 'el', 'sl', 'sk', 'ro', 'hu', 'et', 'br', 'key'];
class Translate {
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
__decorate([
    Persistent('defaultLanguage'),
    __metadata("design:type", Object)
], Translate.prototype, "defaultLanguage", void 0);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TranslatePipe {
    /**
     * @param {?} translate
     */
    constructor(translate$$1) {
        this.translate = translate$$1;
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    transform(value, ...args) {
        /** @type {?} */
        let interpolateParams;
        if (!isUndefined(args[0]) && args.length) {
            if (typeof args[0] === 'string' && args[0].length) {
                /** @type {?} */
                let validArgs = args[0].replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":').replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                try {
                    interpolateParams = JSON.parse(validArgs);
                }
                catch (e) {
                    throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`);
                }
            }
            else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
                interpolateParams = args[0];
            }
        }
        return this.translate.get(value, interpolateParams);
    }
}
TranslatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'translate'
            },] }
];
/** @nocollapse */
TranslatePipe.ctorParameters = () => [
    { type: Translate }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TranslateModule {
    /**
     * @param {?=} configuredProviders
     * @return {?}
     */
    static forRoot(configuredProviders = []) {
        return {
            ngModule: TranslateModule,
            providers: [Translate, ...configuredProviders]
        };
    }
}
TranslateModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TranslatePipe],
                imports: [CommonModule, HttpClientModule],
                exports: [TranslatePipe]
            },] }
];
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