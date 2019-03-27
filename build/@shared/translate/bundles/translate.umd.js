(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@shared/common'), require('rxjs'), require('@angular/common/http'), require('@shared/stencil'), require('@angular/core'), require('lodash-es'), require('@angular/common/locales/en-GB'), require('@angular/common/locales/extra/en'), require('@angular/common/locales/fr'), require('@angular/common/locales/extra/fr'), require('@angular/common/locales/de'), require('@angular/common/locales/extra/de'), require('@angular/common/locales/es'), require('@angular/common/locales/extra/es'), require('@angular/common/locales/nl'), require('@angular/common/locales/extra/nl'), require('@angular/common/locales/pl'), require('@angular/common/locales/extra/pl'), require('@angular/common/locales/it'), require('@angular/common/locales/extra/it'), require('@angular/common/locales/ru'), require('@angular/common/locales/extra/ru'), require('@angular/common/locales/zh-Hans'), require('@angular/common/locales/extra/zh-Hans'), require('@angular/common/locales/zh-Hant'), require('@angular/common/locales/extra/zh-Hant'), require('@angular/common/locales/pt'), require('@angular/common/locales/extra/pt'), require('@angular/common/locales/ja'), require('@angular/common/locales/extra/ja'), require('@angular/common/locales/he'), require('@angular/common/locales/extra/he'), require('@angular/common/locales/ar'), require('@angular/common/locales/extra/ar'), require('@angular/common/locales/th'), require('@angular/common/locales/extra/th'), require('@angular/common/locales/tr'), require('@angular/common/locales/extra/tr'), require('@angular/common/locales/bg'), require('@angular/common/locales/extra/bg'), require('@angular/common/locales/el'), require('@angular/common/locales/extra/el'), require('@angular/common/locales/sl'), require('@angular/common/locales/extra/sl'), require('@angular/common/locales/sk'), require('@angular/common/locales/extra/sk')) :
    typeof define === 'function' && define.amd ? define('translate', ['exports', '@angular/common', '@shared/common', 'rxjs', '@angular/common/http', '@shared/stencil', '@angular/core', 'lodash-es', '@angular/common/locales/en-GB', '@angular/common/locales/extra/en', '@angular/common/locales/fr', '@angular/common/locales/extra/fr', '@angular/common/locales/de', '@angular/common/locales/extra/de', '@angular/common/locales/es', '@angular/common/locales/extra/es', '@angular/common/locales/nl', '@angular/common/locales/extra/nl', '@angular/common/locales/pl', '@angular/common/locales/extra/pl', '@angular/common/locales/it', '@angular/common/locales/extra/it', '@angular/common/locales/ru', '@angular/common/locales/extra/ru', '@angular/common/locales/zh-Hans', '@angular/common/locales/extra/zh-Hans', '@angular/common/locales/zh-Hant', '@angular/common/locales/extra/zh-Hant', '@angular/common/locales/pt', '@angular/common/locales/extra/pt', '@angular/common/locales/ja', '@angular/common/locales/extra/ja', '@angular/common/locales/he', '@angular/common/locales/extra/he', '@angular/common/locales/ar', '@angular/common/locales/extra/ar', '@angular/common/locales/th', '@angular/common/locales/extra/th', '@angular/common/locales/tr', '@angular/common/locales/extra/tr', '@angular/common/locales/bg', '@angular/common/locales/extra/bg', '@angular/common/locales/el', '@angular/common/locales/extra/el', '@angular/common/locales/sl', '@angular/common/locales/extra/sl', '@angular/common/locales/sk', '@angular/common/locales/extra/sk'], factory) :
    (factory((global.translate = {}),global.ng.common,global['@shared/common'],global.rxjs,global.ng.common.http,global.DesignSystem,global.ng.core,global['lodash-es'],global.ng.common.locales['en-GB'],global.ng.common.locales.extra.en,global.ng.common.locales.fr,global.ng.common.locales.extra.fr,global.ng.common.locales.de,global.ng.common.locales.extra.de,global.ng.common.locales.es,global.ng.common.locales.extra.es,global.ng.common.locales.nl,global.ng.common.locales.extra.nl,global.ng.common.locales.pl,global.ng.common.locales.extra.pl,global.ng.common.locales.it,global.ng.common.locales.extra.it,global.ng.common.locales.ru,global.ng.common.locales.extra.ru,global.ng.common.locales['zh-Hans'],global.ng.common.locales.extra['zh-Hans'],global.ng.common.locales['zh-Hant'],global.ng.common.locales.extra['zh-Hant'],global.ng.common.locales.pt,global.ng.common.locales.extra.pt,global.ng.common.locales.ja,global.ng.common.locales.extra.ja,global.ng.common.locales.he,global.ng.common.locales.extra.he,global.ng.common.locales.ar,global.ng.common.locales.extra.ar,global.ng.common.locales.th,global.ng.common.locales.extra.th,global.ng.common.locales.tr,global.ng.common.locales.extra.tr,global.ng.common.locales.bg,global.ng.common.locales.extra.bg,global.ng.common.locales.el,global.ng.common.locales.extra.el,global.ng.common.locales.sl,global.ng.common.locales.extra.sl,global.ng.common.locales.sk,global.ng.common.locales.extra.sk));
}(this, (function (exports,common,common$1,rxjs,http,stencil,core,lodashEs,localeEnGB,localeEnGBExtra,localeFr,localeFrExtra,localeDe,localeDeExtra,localeEs,localeEsExtra,localeNl,localeNlExtra,localePl,localePlExtra,localeIt,localeItExtra,localeRu,localeRuExtra,localeZhs,localeZhsExtra,localeZht,localeZhtExtra,localePt,localePtExtra,localeJa,localeJaExtra,localeHe,localeHeExtra,localeAr,localeArExtra,localeTh,localeThExtra,localeTr,localeTrExtra,localeBg,localeBgExtra,localeEl,localeElExtra,localeSl,localeSlExtra,localeSk,localeSkExtra) { 'use strict';

    localeEnGB = localeEnGB && localeEnGB.hasOwnProperty('default') ? localeEnGB['default'] : localeEnGB;
    localeEnGBExtra = localeEnGBExtra && localeEnGBExtra.hasOwnProperty('default') ? localeEnGBExtra['default'] : localeEnGBExtra;
    localeFr = localeFr && localeFr.hasOwnProperty('default') ? localeFr['default'] : localeFr;
    localeFrExtra = localeFrExtra && localeFrExtra.hasOwnProperty('default') ? localeFrExtra['default'] : localeFrExtra;
    localeDe = localeDe && localeDe.hasOwnProperty('default') ? localeDe['default'] : localeDe;
    localeDeExtra = localeDeExtra && localeDeExtra.hasOwnProperty('default') ? localeDeExtra['default'] : localeDeExtra;
    localeEs = localeEs && localeEs.hasOwnProperty('default') ? localeEs['default'] : localeEs;
    localeEsExtra = localeEsExtra && localeEsExtra.hasOwnProperty('default') ? localeEsExtra['default'] : localeEsExtra;
    localeNl = localeNl && localeNl.hasOwnProperty('default') ? localeNl['default'] : localeNl;
    localeNlExtra = localeNlExtra && localeNlExtra.hasOwnProperty('default') ? localeNlExtra['default'] : localeNlExtra;
    localePl = localePl && localePl.hasOwnProperty('default') ? localePl['default'] : localePl;
    localePlExtra = localePlExtra && localePlExtra.hasOwnProperty('default') ? localePlExtra['default'] : localePlExtra;
    localeIt = localeIt && localeIt.hasOwnProperty('default') ? localeIt['default'] : localeIt;
    localeItExtra = localeItExtra && localeItExtra.hasOwnProperty('default') ? localeItExtra['default'] : localeItExtra;
    localeRu = localeRu && localeRu.hasOwnProperty('default') ? localeRu['default'] : localeRu;
    localeRuExtra = localeRuExtra && localeRuExtra.hasOwnProperty('default') ? localeRuExtra['default'] : localeRuExtra;
    localeZhs = localeZhs && localeZhs.hasOwnProperty('default') ? localeZhs['default'] : localeZhs;
    localeZhsExtra = localeZhsExtra && localeZhsExtra.hasOwnProperty('default') ? localeZhsExtra['default'] : localeZhsExtra;
    localeZht = localeZht && localeZht.hasOwnProperty('default') ? localeZht['default'] : localeZht;
    localeZhtExtra = localeZhtExtra && localeZhtExtra.hasOwnProperty('default') ? localeZhtExtra['default'] : localeZhtExtra;
    localePt = localePt && localePt.hasOwnProperty('default') ? localePt['default'] : localePt;
    localePtExtra = localePtExtra && localePtExtra.hasOwnProperty('default') ? localePtExtra['default'] : localePtExtra;
    localeJa = localeJa && localeJa.hasOwnProperty('default') ? localeJa['default'] : localeJa;
    localeJaExtra = localeJaExtra && localeJaExtra.hasOwnProperty('default') ? localeJaExtra['default'] : localeJaExtra;
    localeHe = localeHe && localeHe.hasOwnProperty('default') ? localeHe['default'] : localeHe;
    localeHeExtra = localeHeExtra && localeHeExtra.hasOwnProperty('default') ? localeHeExtra['default'] : localeHeExtra;
    localeAr = localeAr && localeAr.hasOwnProperty('default') ? localeAr['default'] : localeAr;
    localeArExtra = localeArExtra && localeArExtra.hasOwnProperty('default') ? localeArExtra['default'] : localeArExtra;
    localeTh = localeTh && localeTh.hasOwnProperty('default') ? localeTh['default'] : localeTh;
    localeThExtra = localeThExtra && localeThExtra.hasOwnProperty('default') ? localeThExtra['default'] : localeThExtra;
    localeTr = localeTr && localeTr.hasOwnProperty('default') ? localeTr['default'] : localeTr;
    localeTrExtra = localeTrExtra && localeTrExtra.hasOwnProperty('default') ? localeTrExtra['default'] : localeTrExtra;
    localeBg = localeBg && localeBg.hasOwnProperty('default') ? localeBg['default'] : localeBg;
    localeBgExtra = localeBgExtra && localeBgExtra.hasOwnProperty('default') ? localeBgExtra['default'] : localeBgExtra;
    localeEl = localeEl && localeEl.hasOwnProperty('default') ? localeEl['default'] : localeEl;
    localeElExtra = localeElExtra && localeElExtra.hasOwnProperty('default') ? localeElExtra['default'] : localeElExtra;
    localeSl = localeSl && localeSl.hasOwnProperty('default') ? localeSl['default'] : localeSl;
    localeSlExtra = localeSlExtra && localeSlExtra.hasOwnProperty('default') ? localeSlExtra['default'] : localeSlExtra;
    localeSk = localeSk && localeSk.hasOwnProperty('default') ? localeSk['default'] : localeSk;
    localeSkExtra = localeSkExtra && localeSkExtra.hasOwnProperty('default') ? localeSkExtra['default'] : localeSkExtra;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var AVAILABLE_LANGUAGES = ['en', 'us', 'fr', 'de', 'es', 'nl', 'pl', 'it', 'ru', 'zhs', 'zht', 'pt', 'kr', 'ja', 'ua', 'he', 'ar', 'cz', 'th', 'tr', 'bg', 'el', 'sl', 'sk', 'ro', 'hu', 'et', 'br', 'key'];
    var Translate = /** @class */ (function () {
        function Translate(coreConfig, http$$1) {
            this.coreConfig = coreConfig;
            this.http = http$$1;
            this._languageChange = new rxjs.Subject();
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
                    browserLanguage = (( /** @type {?} */(window))).navigator.userLanguage || window.navigator.language || 'en';
                }
                this.defaultLanguage = this.defaultLanguage || browserLanguage;
                return this.setLanguage(this.defaultLanguage, false);
            };
        Object.defineProperty(Translate.prototype, "languageChange$", {
            get: /**
             * @return {?}
             */ function () {
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
                if (reload === void 0) {
                    reload = true;
                }
                return new Promise(( /**
                 * @param {?} resolve
                 * @param {?} reject
                 * @return {?}
                 */function (resolve, reject) {
                    if (language) {
                        language = _this.checkLanguage(language);
                        _this.defaultLanguage = language;
                        //this.ngTranslate.setDefaultLang(this.defaultLanguage);
                        // moment.locale(this.getLanguageFull(language, '-'));
                        _this._languageChange.next(language);
                        Translate.currentLanguage = language;
                        (( /** @type {?} */(window))).__currentLanguage__ = language;
                        if (typeof window !== 'undefined' && window.document) {
                            if (_this.isRtl(language)) {
                                window.document.dir = 'rtl';
                            }
                            else {
                                window.document.dir = 'ltr';
                            }
                        }
                        _this.http.get('./assets/i18n/' + language + '.json').subscribe(( /**
                         * @param {?} res
                         * @return {?}
                         */function (res) {
                            // this.ngTranslate.use(language).subscribe(() => {
                            stencil.setCurrentLanguage(language);
                            stencil.loadTranslations(res);
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
                translations.forEach(( /**
                 * @param {?} d
                 * @return {?}
                 */function (d) {
                    if (d && d.key && (!isAdmin || stencil.translate(d.key) === d.key)) {
                        newTranslations[d.key] = d[language];
                    }
                }));
                stencil.loadTranslations(newTranslations);
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
                if (separator === void 0) {
                    separator = '_';
                }
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
                    return stencil.translate(key, params); //this.ngTranslate.instant(key, params);
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
                return stencil.translateMulti(value);
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
                return stencil.isCurrentLanguageChinese();
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
                if (separator === void 0) {
                    separator = '_';
                }
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Translate.ctorParameters = function () {
            return [
                { type: common$1.CoreConfig },
                { type: http.HttpClient }
            ];
        };
        __decorate([
            common$1.Persistent('defaultLanguage'),
            __metadata("design:type", Object)
        ], Translate.prototype, "defaultLanguage", void 0);
        return Translate;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TranslatePipe = /** @class */ (function () {
        function TranslatePipe(translate) {
            this.translate = translate;
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
                if (!lodashEs.isUndefined(args[0]) && args.length) {
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
            { type: core.Pipe, args: [{
                        name: 'translate'
                    },] }
        ];
        /** @nocollapse */
        TranslatePipe.ctorParameters = function () {
            return [
                { type: Translate }
            ];
        };
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
                if (configuredProviders === void 0) {
                    configuredProviders = [];
                }
                return {
                    ngModule: TranslateModule,
                    providers: __spread([Translate], configuredProviders)
                };
            };
        TranslateModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [TranslatePipe],
                        imports: [common.CommonModule, http.HttpClientModule],
                        exports: [TranslatePipe]
                    },] }
        ];
        return TranslateModule;
    }());
    common.registerLocaleData(localeEnGB, 'en-GB', localeEnGBExtra);
    common.registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
    common.registerLocaleData(localeDe, 'de-DE', localeDeExtra);
    common.registerLocaleData(localeEs, 'es-ES', localeEsExtra);
    common.registerLocaleData(localeNl, 'nl-NL', localeNlExtra);
    common.registerLocaleData(localePl, 'pl-PL', localePlExtra);
    common.registerLocaleData(localeIt, 'it-IT', localeItExtra);
    common.registerLocaleData(localeRu, 'ru-RU', localeRuExtra);
    common.registerLocaleData(localeZhs, 'zh-Hans', localeZhsExtra);
    common.registerLocaleData(localeZht, 'zh-Hant', localeZhtExtra);
    common.registerLocaleData(localePt, 'pt-PT', localePtExtra);
    common.registerLocaleData(localePt, 'pt-BR', localePtExtra);
    common.registerLocaleData(localeJa, 'ja-JA', localeJaExtra);
    common.registerLocaleData(localeHe, 'he-HE', localeHeExtra);
    common.registerLocaleData(localeAr, 'ar-AR', localeArExtra);
    common.registerLocaleData(localeTh, 'th-TH', localeThExtra);
    common.registerLocaleData(localeTr, 'tr-TR', localeTrExtra);
    common.registerLocaleData(localeBg, 'bg-BG', localeBgExtra);
    common.registerLocaleData(localeEl, 'el-EL', localeElExtra);
    common.registerLocaleData(localeSl, 'sl-SL', localeSlExtra);
    common.registerLocaleData(localeSk, 'sk-SK', localeSkExtra);

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.TranslateModule = TranslateModule;
    exports.AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
    exports.Translate = Translate;
    exports.TranslatePipe = TranslatePipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=translate.umd.js.map