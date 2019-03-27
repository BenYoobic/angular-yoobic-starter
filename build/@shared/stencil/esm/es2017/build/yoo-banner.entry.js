import { h } from '../design-system.core.js';

import { a8 as setAnimation, be as isIphoneX, Q as closeModal, m as translate, k as isCordova, b7 as disableKeyboardResize, o as isIOS, L as querySelectorDeep, a6 as debounce, a4 as getElementDimensions, cV as LoginFocusAnimation, bb as isSafari, aD as enableKeyboardResize, cm as isDarkTheme, b_ as isTablet, ad as isIonic, cW as isIphone5, aa as querySelectorAllDeep, ba as showActionSheet, a_ as showModal, W as isWeb, cX as isIphoneSE, v as isAndroid, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';
import { a as StatusBar } from './chunk-ed57ca2e.js';

class YooBannerComponent {
    componentDidLoad() {
        setAnimation(this.animationName, this.host, { open: true });
    }
    onActionTextClick() {
        this.alertActionSelected.emit(true);
    }
    onDismissButtonClick() {
        this.alertClosed.emit(true);
        this.closed = true;
    }
    hostData() {
        return {
            class: {
                'closed': this.closed
            }
        };
    }
    render() {
        return (h("div", { class: {
                'container': true,
                'closed': this.closed,
                'iphone-x': isIphoneX()
            } },
            this.link ? h("div", { class: "link", onClick: () => this.onActionTextClick() }, this.link) : null,
            h("div", { class: "inner-container" },
                this.icon ? h("span", { class: "icon" },
                    h("yoo-icon", { class: this.icon })) : null,
                h("div", { class: "text-container" },
                    this.heading ? h("span", { class: "heading" }, this.heading) : null,
                    h("span", { class: "value" }, this.text))),
            h("div", { class: "close-container" }, this.closeable ? h("span", { class: "close", onClick: () => this.onDismissButtonClick() },
                " ",
                h("yoo-icon", { class: "yo-close" })) : null)));
    }
    static get is() { return "yoo-banner"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "animationName": {
            "type": String,
            "attr": "animation-name"
        },
        "closeable": {
            "type": Boolean,
            "attr": "closeable"
        },
        "closed": {
            "state": true
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "host": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "link": {
            "type": String,
            "attr": "link"
        },
        "text": {
            "type": String,
            "attr": "text"
        }
    }; }
    static get events() { return [{
            "name": "alertClosed",
            "method": "alertClosed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "alertActionSelected",
            "method": "alertActionSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --font-size-text-container: var(--font-s, 13px);\n  --padding-top-container: 0.75rem;\n  --margin-top-inner-container: unset; }\n\n:host {\n  display: block; }\n  :host.closed {\n    opacity: 0; }\n  :host .container {\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    width: 100%;\n    padding: var(--padding-top-container) 1rem;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s; }\n    :host .container.closed {\n      opacity: 0; }\n    :host .container .link {\n      color: var(--light, #FFFFFF);\n      font-size: var(--font-s, 13px);\n      font-weight: 100;\n      text-decoration: underline;\n      cursor: pointer;\n      opacity: 0.5; }\n    :host .container .inner-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: center;\n      justify-content: center;\n      margin-top: var(--margin-top-inner-container); }\n      :host .container .inner-container .icon {\n        margin-right: 0.5rem;\n        color: var(--light, #FFFFFF);\n        font-family: \"yoobicons\"; }\n      :host .container .inner-container .text-container {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-pack: center;\n        justify-content: center;\n        color: var(--light, #FFFFFF); }\n        :host .container .inner-container .text-container .value {\n          margin-bottom: 0.25rem;\n          font-size: var(--font-size-text-container);\n          line-height: 1rem; }\n        :host .container .inner-container .text-container .heading {\n          -ms-flex-item-align: baseline;\n          align-self: baseline;\n          font-size: var(--font-s, 13px);\n          font-weight: bold; }\n    :host .container .close-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: end;\n      justify-content: flex-end;\n      color: var(--light, #FFFFFF); }\n      :host .container .close-container .close {\n        -ms-flex-pack: end;\n        justify-content: flex-end;\n        margin-left: 1rem;\n        font-family: \"yoobicons\";\n        cursor: pointer; }\n\n:host(.small) {\n  --padding-top-container: 0;\n  --font-size-text-container: var(--font-xs, 10px); }\n\n:host(.round) .container {\n  border-radius: 0.5rem; }\n\n:host(.toast) .container {\n  -webkit-box-shadow: var(--button-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));\n  box-shadow: var(--button-shadow, 0 2px 6px rgba(0, 0, 0, 0.1)); }\n  :host(.toast) .container .inner-container .text-container .value {\n    margin-top: 0.25rem;\n    margin-left: 0.5rem; }\n\n:host(.toast).round .container {\n  border: 0.05rem solid; }\n\n\@-webkit-keyframes scaleUp {\n  0% {\n    -webkit-transform: scale(0.8) translateY(1000px);\n    transform: scale(0.8) translateY(1000px);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1) translateY(0px);\n    transform: scale(1) translateY(0px);\n    opacity: 1; } }\n\n\@keyframes scaleUp {\n  0% {\n    -webkit-transform: scale(0.8) translateY(1000px);\n    transform: scale(0.8) translateY(1000px);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1) translateY(0px);\n    transform: scale(1) translateY(0px);\n    opacity: 1; } }\n\n:host(.stripe) .container {\n  width: 100%;\n  border-bottom: 0.05rem solid;\n  border-radius: 0rem; }\n  :host(.stripe) .container .inner-container .text-container .value {\n    margin-top: 0.25rem;\n    margin-left: 0.5rem; }\n\n:host(.embedded) {\n  width: 100%; }\n  :host(.embedded) .container {\n    width: 100%; }\n    :host(.embedded) .container .inner-container .text-container .value {\n      margin-top: 0.25rem;\n      margin-left: 0.5rem; }\n  :host(.embedded).round .container {\n    border: 0.05rem solid; }\n\n:host(.centered) {\n  display: -ms-flexbox;\n  display: flex; }\n  :host(.centered) .container {\n    -ms-flex-pack: justify !important;\n    justify-content: space-between !important; }\n    :host(.centered) .container .inner-container {\n      width: 100%; }\n      :host(.centered) .container .inner-container .text-container .value {\n        margin-left: 0; }\n\n:host(.accent) {\n  background: var(--accent, #1FB6FF); }\n  :host(.accent) .container {\n    background: var(--accent, #1FB6FF);\n    color: var(--accent, #1FB6FF); }\n\n:host(.success) {\n  background: var(--success, #04CC99); }\n  :host(.success) .container {\n    background: var(--success, #04CC99);\n    color: var(--success, #04CC99); }\n\n:host(.danger) {\n  background: var(--danger, #ff625f); }\n  :host(.danger) .container {\n    background: var(--danger, #ff625f);\n    color: var(--danger, #ff625f); }\n\n:host(.info) {\n  background: var(--info, #fc459e); }\n  :host(.info) .container {\n    background: var(--info, #fc459e);\n    color: var(--info, #fc459e); }\n\n:host(.warning) {\n  background: var(--warning, #ff6402); }\n  :host(.warning) .container {\n    background: var(--warning, #ff6402);\n    color: var(--warning, #ff6402); }\n\n:host(.danger-gradient) .container {\n  background: var(--gradient-danger, #ff625f);\n  color: var(--light, #FFFFFF); }\n\n:host(.success-gradient2) .container {\n  background: var(--gradient-success, #04CC99);\n  color: var(--light, #FFFFFF); }\n\n:host(.card) .container {\n  border-left: 0.3rem solid;\n  border-radius: 0rem;\n  background: var(--light, #FFFFFF);\n  -webkit-box-shadow: var(--button-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));\n  box-shadow: var(--button-shadow, 0 2px 6px rgba(0, 0, 0, 0.1)); }\n  :host(.card) .container .inner-container .icon {\n    margin-right: 1.5rem;\n    margin-left: 0.5rem;\n    font-size: var(--font-xl, 36px); }\n  :host(.card) .container .inner-container .text-container {\n    -ms-flex-direction: column;\n    flex-direction: column;\n    color: var(--dark, #2b3648); }\n    :host(.card) .container .inner-container .text-container .value {\n      color: var(--dark-80, #495b79);\n      line-height: 1.3rem; }\n    :host(.card) .container .inner-container .text-container .heading {\n      margin-top: 0.5rem; }\n  :host(.card) .container .close-container {\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n    color: var(--dark, #2b3648);\n    font-size: var(--font-xs, 10px); }\n\n:host(.header) .container.iphone-x {\n  -ms-flex-align: end;\n  align-items: flex-end;\n  height: 3.5rem;\n  padding-bottom: 0.325rem; }\n\n:host(.footer) .container.iphone-x {\n  padding-top: var(--padding-5, 0.3125rem);\n  padding-bottom: var(--padding-15, 0.9375rem); }\n\n:host(.accent-gradient-card) .container {\n  -o-border-image: var(--bottom-gradient);\n  border-image: var(--bottom-gradient);\n  border-image-slice: 1; }\n  :host(.accent-gradient-card) .container .inner-container .icon {\n    -webkit-background-clip: text;\n    background-clip: text;\n    background-image: var(--webkit-gradient);\n    -webkit-text-fill-color: transparent; }\n\n:host(.danger-gradient-card) .container {\n  -o-border-image: var(--bottom-gradient);\n  border-image: var(--bottom-gradient);\n  border-image-slice: 1; }\n  :host(.danger-gradient-card) .container .inner-container .icon {\n    -webkit-background-clip: text;\n    background-clip: text;\n    background-image: var(--webkit-gradient);\n    -webkit-text-fill-color: transparent; }\n\n:host(.success-gradient-card) .container {\n  -o-border-image: var(--bottom-gradient);\n  border-image: var(--bottom-gradient);\n  border-image-slice: 1; }\n  :host(.success-gradient-card) .container .inner-container .icon {\n    -webkit-background-clip: text;\n    background-clip: text;\n    background-image: var(--webkit-gradient);\n    -webkit-text-fill-color: transparent; }\n\n:host(.info-gradient-card) .container {\n  -o-border-image: var(--bottom-gradient);\n  border-image: var(--bottom-gradient);\n  border-image-slice: 1; }\n  :host(.info-gradient-card) .container .inner-container .icon {\n    -webkit-background-clip: text;\n    background-clip: text;\n    background-image: var(--webkit-gradient);\n    -webkit-text-fill-color: transparent; }\n\n:host(.accent-gradient-card) .container {\n  -o-border-image: var(--bottom-gradient);\n  border-image: var(--bottom-gradient);\n  border-image-slice: 1; }\n  :host(.accent-gradient-card) .container .inner-container .icon {\n    -webkit-background-clip: text;\n    background-clip: text;\n    background-image: var(--webkit-gradient);\n    -webkit-text-fill-color: transparent; }"; }
}

class YooLanguageSelectorComponent {
    constructor() {
        this.hasPreseneted = false;
    }
    componentDidLoad() {
        if (this.wrapperElement) {
            this.wrapperElement.style.top = `${this.topPosition}px`;
        }
        setAnimation('fade', this.host, { open: true });
        const FADE_DURATION = 500;
        setTimeout(() => {
            this.hasPreseneted = true;
        }, FADE_DURATION);
    }
    componentDidUpdate() {
        if (this.wrapperElement) {
            this.wrapperElement.style.top = `${this.topPosition}px`;
        }
    }
    onLanguageSelector(language) {
        this.languageSelected.emit(language);
        closeModal(language);
    }
    closeLanguageSelector() {
        if (this.hasPreseneted) {
            closeModal(null);
        }
    }
    renderList(language) {
        return (h("div", { class: "item" },
            h("div", { class: 'icon ' + (this.currentLanguage === language.value ? 'current' : ''), onClick: () => this.onLanguageSelector(language.value) },
                h("yoo-icon", { class: language.icon + ' icon-class' }),
                this.currentLanguage.toLowerCase() === language.value ? [
                    h("div", { class: "overlay" }),
                    h("div", { class: "check" },
                        h("yoo-icon", { class: "yo-check" }))
                ]
                    : null),
            h("div", { class: "item-title" }, language.title)));
    }
    render() {
        return (h("div", { class: "wrapper", onClick: () => this.closeLanguageSelector() },
            h("div", { class: "inner-wrapper", ref: el => this.wrapperElement = el },
                h("div", { class: "heading" }, translate('LANGUAGE')),
                h("div", { class: "lists-container" },
                    this.languages.map((language) => this.renderList(language)),
                    h("div", { class: "item-empty" }),
                    h("div", { class: "item-empty" }),
                    h("div", { class: "item-empty" }),
                    h("div", { class: "item-empty" })))));
    }
    static get is() { return "yoo-language-selector"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "currentLanguage": {
            "type": String,
            "attr": "current-language"
        },
        "host": {
            "elementRef": true
        },
        "languages": {
            "type": "Any",
            "attr": "languages"
        },
        "topPosition": {
            "type": Number,
            "attr": "top-position"
        }
    }; }
    static get events() { return [{
            "name": "languageSelected",
            "method": "languageSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .wrapper {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  position: absolute; }\n  :host .wrapper .inner-wrapper {\n    position: absolute;\n    right: 0.75rem;\n    bottom: auto;\n    left: auto;\n    width: 250px;\n    height: auto !important;\n    border-radius: 12.5px;\n    background-color: var(--light, #FFFFFF); }\n    :host .wrapper .inner-wrapper .heading {\n      padding-top: var(--padding-25, 1.5625rem);\n      padding-bottom: 1.0625rem;\n      padding-left: var(--padding-25, 1.5625rem);\n      line-height: normal;\n      text-transform: uppercase; }\n    :host .wrapper .inner-wrapper .load-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-line-pack: center;\n      align-content: center;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 100%;\n      max-width: 100%;\n      height: 100%; }\n    :host .wrapper .inner-wrapper .lists-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      padding: 0 1.5625rem; }\n      :host .wrapper .inner-wrapper .lists-container .item {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: justify;\n        justify-content: space-between;\n        width: 2rem;\n        height: 3rem;\n        margin-right: 0.75rem;\n        margin-bottom: 0.75rem; }\n        :host .wrapper .inner-wrapper .lists-container .item .icon {\n          display: -ms-flexbox;\n          display: flex;\n          position: relative;\n          -ms-flex-align: center;\n          align-items: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n          width: 2rem;\n          height: 2rem;\n          border-radius: 1rem;\n          font-size: var(--font-xl, 36px);\n          overflow: hidden; }\n          :host .wrapper .inner-wrapper .lists-container .item .icon .icon-class {\n            position: absolute; }\n        :host .wrapper .inner-wrapper .lists-container .item .overlay {\n          position: absolute;\n          top: 0%;\n          width: 2rem;\n          height: 2rem;\n          border-radius: 1rem;\n          background-color: var(--text-color, #807f83);\n          opacity: 0.6; }\n        :host .wrapper .inner-wrapper .lists-container .item .check {\n          top: 0.5rem;\n          right: auto;\n          bottom: auto;\n          left: 0.5rem;\n          position: absolute;\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-align: center;\n          align-items: center;\n          -ms-flex-pack: center;\n          justify-content: center;\n          width: 1rem;\n          height: 1rem;\n          border-radius: 0.5rem;\n          background-color: var(--light, #FFFFFF);\n          font-size: var(--font-s, 13px); }\n      :host .wrapper .inner-wrapper .lists-container .item-empty {\n        width: 2rem;\n        height: 0;\n        margin-right: 0.75rem; }\n      :host .wrapper .inner-wrapper .lists-container .item-title {\n        font-size: var(--font-xs, 10px); }"; }
}

const MIN_SCREEN_SIZE_LEFT_PANEL = 900;
const IPAD_MINI_SCREEN_HEIGHT = 1024;
const MINIMUM_SCREEN_SIZE_TO_SHOW_HEADER = 665;
class YooLoginComponent {
    constructor() {
        this.leftPanelMobileHeaderIcon = './assets/logo/operations_simple.svg';
        this.leftPanelWebHeaderIcon = './assets/logo/operations_landscape_light.svg';
        this.videoBackgroundUrl = '';
        this.backgroundColor = 'dark';
        this.leftPanelFooterText = 'POWEREDBY';
        this.webTitleText = 'Operations';
        this.webSubtitleText = [];
        this.webLoginFormTitle = '';
        this.webLoginFormSubtitle = 'LOGINSUBTITLE';
        this.rememberMeText = 'REMEMBERME';
        this.forgotPasswordText = 'HELP';
        this.emailLabel = 'EMAIL';
        this.passwordLabel = 'PASSWORD';
        this.borderClass = 'success';
        this.magicLinkButtonText = 'MAGICLINK';
        this.resetPasswordButtonText = 'RESETPASSWORD';
        this.loginButtonText = 'LOGIN';
        this.showRememberMe = false;
        this.language = 'EN';
        this.passwordInputChanged = false;
        this.inputFocused = false;
        this.deviceInputFocused = false;
        this.showLeftPanel = true;
        this.rememberMe = false;
        this.emailFocused = false;
        this.passwordFocused = false;
        this.fullWindowHeight = 0;
        this.loginContainerMobileHeight = 0;
        this.showHeaderFooterOnFocus = true;
        this.hideTitleAndFooterForIpadMini = false;
    }
    onLeftPanelChanged(newValue) {
        if (newValue) {
            this.updateVideoSrcOnDidUpdate = true;
        }
    }
    setStatusBarColor(light) {
        if (light) {
            StatusBar.styleLightContent();
        }
        else {
            StatusBar.styleDefault();
        }
    }
    componentWillLoad() {
        if (isCordova()) {
            disableKeyboardResize(Keyboard);
            this.setStatusBarColor(true);
        }
    }
    componentDidLoad() {
        // Workaround for angular route bug 
        // where login through SSO and logout cause route to stop working
        if (isIOS() && document) {
            let oldMenuPage = querySelectorDeep(document, 'menu-page');
            if (oldMenuPage && oldMenuPage.remove) {
                oldMenuPage.remove();
            }
        }
        this.resizePage();
        this.resizeListener = debounce(this.resizePage, 500).bind(this);
        window.addEventListener('resize', this.resizeListener);
        // this.deviceHeight = window.innerHeight;
        this.resizeLanguageSelectorWidth();
        setTimeout(() => {
            if (isCordova() && this.loginContainerMobile) {
                this.loginContainerMobileHeight = getElementDimensions(this.loginContainerMobile).height;
                this.loginContainerMobile.setAttribute('style', `height: ${this.loginContainerMobileHeight}px;`);
            }
        }, 1000);
        if (this.videoHeaderContainerEl) {
            this.focusAnimation = new LoginFocusAnimation();
            this.focusAnimation.addContainer(this.videoHeaderContainerEl);
        }
        if (((isCordova() && isIOS()) || isSafari()) && this.outerContainerElement) {
            this.outerContainerElement.style.height = `${window.innerHeight}px`;
        }
    }
    componentDidUpdate() {
        this.resizeLanguageSelectorWidth();
        if (this.updateVideoSrcOnDidUpdate && this.loginVideoEl) {
            this.loginVideoEl.src = this.videoBackgroundUrl;
            this.loginVideoEl.play();
            this.updateVideoSrcOnDidUpdate = false;
        }
        if (((isCordova() && isIOS()) || isSafari()) && this.outerContainerElement) {
            this.outerContainerElement.style.height = `${window.innerHeight}px`;
        }
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
        if (isCordova()) {
            enableKeyboardResize(Keyboard);
            if (isIOS()) {
                this.setStatusBarColor(false);
            }
        }
    }
    hasVideoBackground() {
        return this.videoBackgroundUrl !== '';
    }
    hasLoginScreenClass() {
        return isDarkTheme();
    }
    onAlertClosed() {
        this.error = '';
    }
    onAlertActionSelected() {
        this.error = '';
        window.location.href = 'mailto:support@yoobic.com';
    }
    onRadioClicked(event) {
        event.detail === 'checked' ? this.rememberMe = true : this.rememberMe = false;
    }
    onInputChanged(ev, type) {
        this.validateLoginInputs();
        if (type === 'email') {
            this.userEmail = ev.detail;
        }
        else if (type === 'password') {
            this.userPassword = ev.detail;
        }
    }
    onAdvancedLogin() {
        this.advancedLoginRequested.emit(true);
    }
    onEnterPressed() {
        this.validateLoginInputs();
        this.onLogin();
    }
    validateLoginInputs() {
        let isValidEmail = this.emailInputEl && this.emailInputEl.validity;
        let isValidPassword = this.passwordInputEl && this.passwordInputEl.validity;
        //TODO: what is happening in this line exactly, we are also passing disabled at the level of the component
        if (this.loginBtnEl) {
            this.loginBtnEl.disabled = (!(isValidEmail && isValidPassword)); // this.hasVideoBackground() ? false :}
        }
    }
    onInputFocused(type) {
        this.error = '';
        type === 'password' ? (this.passwordFocused = true) : (this.emailFocused = true);
        if (isCordova() && (!isTablet() || this.hideTitleAndFooterForIpadMini)) {
            this.hideTitleAndFooter();
        }
        if (isIonic()) {
            this.inputFocused = true;
            if (this.focusAnimation) {
                this.focusAnimation.playFocus();
            }
        }
    }
    onInputBlurred(type) {
        this.validateLoginInputs();
        if (isIonic()) {
            type === 'password' ? (this.passwordFocused = false) : (this.emailFocused = false);
            setTimeout(() => {
                if (isCordova()) {
                    this.hideTitleAndFooter();
                }
            }, 100);
            this.inputFocused = false;
            if (this.focusAnimation) {
                this.focusAnimation.playBlur();
            }
        }
    }
    onPasswordIconClicked(ev) {
        if (ev.detail === 'clear') {
            this.validateLoginInputs();
        }
    }
    hideTitleAndFooter() {
        if (this.emailFocused || this.passwordFocused) {
            if (this.loginContainerMobile) {
                let height = isIphone5() ? '75%' : '100%';
                this.loginContainerMobile.setAttribute('style', `height: ${height};`);
            }
            this.deviceInputFocused = true;
        }
        else {
            if (this.loginContainerMobile) {
                this.loginContainerMobile.setAttribute('style', `height: ${this.loginContainerMobileHeight}px;`);
            }
            this.deviceInputFocused = false;
        }
    }
    resizeLanguageSelectorWidth() {
        if (this.languageSelectorEl && this.languageSelectorEl.clientWidth) {
            this.spaceFillEl.setAttribute('style', `width: ${this.languageSelectorEl.clientWidth}px`);
        }
        this.language = this.currentLanguage;
    }
    resizePage() {
        if (isIonic()) {
            this.fullWindowHeight = window.innerHeight > this.fullWindowHeight ? window.innerHeight : this.fullWindowHeight;
        }
        this.showLeftPanel = window.innerWidth > MIN_SCREEN_SIZE_LEFT_PANEL;
        this.showHeaderFooterOnFocus = window.innerHeight > MINIMUM_SCREEN_SIZE_TO_SHOW_HEADER;
        this.hideTitleAndFooterForIpadMini = window.innerHeight < IPAD_MINI_SCREEN_HEIGHT && isIOS();
    }
    onLogin() {
        if (this.userEmail && this.userPassword && this.loginBtnEl.disabled === false) {
            let inputs = querySelectorAllDeep(this.host, 'input');
            if (inputs && inputs.forEach) {
                inputs.forEach((el) => el && el.blur && el.blur());
            }
            let loginDetails = { username: this.userEmail, password: this.userPassword };
            this.doLogin.emit(loginDetails);
            this.rememberMeSelected.emit(this.rememberMe);
        }
    }
    onForgotPassword() {
        isIonic() ? (this.presentActionSheet()) :
            this.passwordResetModalRequested.emit(true);
    }
    presentActionSheet() {
        showActionSheet([
            { text: translate(this.resetPasswordButtonText), handler: () => this.passwordResetModalRequested.emit(true) },
            { text: translate(this.magicLinkButtonText), handler: () => this.magicLinkModalRequested.emit(true) }
        ]);
    }
    showLanguageModal() {
        const modalTopPadding = 5;
        let topPositionLanguageSelectorButton = Math.floor(this.languageSelectorButtonElement ? this.languageSelectorButtonElement.getBoundingClientRect().bottom : 0);
        let topPositionLanguageSelectorModal = Math.ceil(topPositionLanguageSelectorButton) + modalTopPadding;
        let languageSelectorEl = document.createElement('yoo-language-selector');
        languageSelectorEl.currentLanguage = this.currentLanguage;
        languageSelectorEl.languages = this.languages;
        languageSelectorEl.topPosition = topPositionLanguageSelectorModal;
        showModal(languageSelectorEl, null, null, 'fadeEnterAnimation', 'fadeLeaveAnimation').then(ret => {
            if (ret && ret.data) {
                this.language = ret.data;
                this.languageSelectedParent.emit(ret.data);
            }
            languageSelectorEl = null;
        });
    }
    getVideoBackgroundClasses() {
        if (this.hasVideoBackground() && !isWeb()) {
            return {
                'no-border': true,
                'translucent': true
            };
        }
    }
    renderLoginForm() {
        let newClass = {};
        newClass['link-' + (this.hasVideoBackground() && !isWeb() ? 'translucent' : ('transparent-' + this.borderClass))] = true;
        return [
            h("div", { ref: el => this.loginContainerMobile = el, class: {
                    'login-container-mobile': isIonic(),
                    'login-container': !isIonic(),
                    'iphone-se-focus': this.inputFocused && isIphoneSE()
                } },
                isIonic() ? null :
                    [h("div", { class: "login-title" }, translate(this.webLoginFormTitle)),
                        h("div", { class: "login-subtitle" }, translate(this.webLoginFormSubtitle))],
                h("yoo-form-input-container", { class: this.hasLoginScreenClass() ? 'login-screen' : '', field: { title: translate(this.emailLabel) }, required: true },
                    h("yoo-form-input", { ref: el => this.emailInputEl = el, 
                        // id used by e2e selector
                        id: "email-input", type: "email", class: this.getVideoBackgroundClasses(), validators: [{ name: 'email' }, { name: 'required' }], uiValidation: { valid: false, invalid: true }, onInputChanged: (event) => this.onInputChanged(event, 'email'), onInputFocused: () => this.onInputFocused('email'), onInputBlurred: () => this.onInputBlurred('email'), onEnterPressed: () => this.onEnterPressed() })),
                h("div", { class: "password-container" },
                    h("yoo-form-input-container", { class: this.hasLoginScreenClass() ? 'login-screen' : '', field: { title: translate(this.passwordLabel) }, required: true },
                        h("yoo-form-input", { ref: el => this.passwordInputEl = el, id: "password-input", type: "password", showPasswordToggle: true, validators: [{ name: 'required' }], uiValidation: { valid: false, invalid: true }, class: this.getVideoBackgroundClasses(), onInputChanged: (event) => this.onInputChanged(event, 'password'), onInputFocused: () => this.onInputFocused('password'), onInputBlurred: () => this.onInputBlurred('password'), onIconClicked: (ev) => this.onPasswordIconClicked(ev), onEnterPressed: () => this.onEnterPressed() }))),
                h("div", { class: 'inner-container' + (isIonic() ? ' mobile' : '') },
                    h("div", { class: "radio" }, this.showRememberMe &&
                        h("yoo-form-radio", { text: translate(this.rememberMeText), class: 'stable ' + this.borderClass, onRadioClicked: (event) => this.onRadioClicked(event) })),
                    h("yoo-button", { id: "forgot-password", text: translate(this.forgotPasswordText), onClick: () => this.onForgotPassword(), class: Object.assign({}, newClass, { 'medium': isIonic(), 'login-screen': this.hasLoginScreenClass(), 'no-min-width': true }) })),
                h("div", { class: 'login-button ' + (isCordova() ? 'device-padding' : '') },
                    h("yoo-button", { ref: el => this.loginBtnEl = el, id: "login-btn", disabled: !this.userEmail || !this.userPassword, text: translate(this.loginButtonText), class: (isIonic() ? 'large full-width ' : 'full-width ') + (this.hasLoginScreenClass() ? 'login-screen ' : '') + (this.buttonClass || ''), 
                        //disabled={!this.hasVideoBackground()} 
                        onClick: () => this.onLogin() })),
                isIonic() && this.renderPoweredBy())
        ];
    }
    renderHeaderVideo() {
        if (!this.hasVideoBackground() || isWeb() || ((isIphone5() || isIphoneSE()) && this.error) || (this.deviceInputFocused && isAndroid() && !this.showHeaderFooterOnFocus)) {
            return null;
        }
        if (getAppContext()['boost']) {
            this.videoHeaderIcon = './assets/logo/boost_portrait_light.svg';
        }
        else {
            this.videoHeaderIcon = './assets/logo/operations_portrait_light.svg';
        }
        return (h("div", { ref: el => this.videoHeaderContainerEl = el, class: "video-header-container-mobile" },
            h("img", { class: "logo", src: this.videoHeaderIcon, height: '120', alt: "YOOBIC Logo" }),
            h("div", { class: {
                    'text': true,
                    'iphone-5': isIphone5() || isIphoneSE()
                } }, translate('GLADTOSEEYOU'))));
    }
    renderLanguageSelector() {
        return (h("yoo-button", { id: "language-selector", ref: el => this.languageSelectorButtonElement = el, class: {
                'clear': true,
                'squared': true,
                'small': true,
                'no-shadow': true,
                'login-screen': this.hasLoginScreenClass(),
                'translucent': this.hasVideoBackground() && !isWeb()
            }, onClick: () => this.showLanguageModal(), text: this.currentLanguage, icon: "yo-down", translateText: false }));
    }
    renderPoweredBy() {
        if (!((this.error || this.inputFocused) && isCordova() && isAndroid())) {
            return [
                h("div", { class: "powered-by" },
                    translate(this.leftPanelFooterText),
                    h("div", { class: "powered-img" },
                        h("img", { src: isIonic() || !this.showLeftPanel ? './assets/logo/yoobic_simple_grey.svg' : './assets/logo/yoobic_simple_white.svg', height: "12.8" })),
                    h("div", { class: "yoobic-text" }, "YOOBIC")),
                h("div", { class: "powered-by version" },
                    "v",
                    this.version)
            ];
        }
    }
    renderFooter() {
        return (isIonic() ? h("yoo-button", { text: translate('ADVANCEDLOGIN'), onClick: () => this.onAdvancedLogin(), class: 'block ' + (this.hasLoginScreenClass() ? 'login-screen ' : '') + (this.hasVideoBackground() && !isWeb() ? 'transparent' : 'stable') })
            : this.renderPoweredBy());
    }
    renderVideo() {
        return h("video", { ref: el => this.loginVideoEl = el, class: { 'android': isAndroid() }, src: this.videoBackgroundUrl, muted: true, autoplay: true, loop: true, playsinline: true, "webkit-playsinline": true });
    }
    renderHeader() {
        return h("div", { class: "header" },
            isIonic() && h("div", { class: "space-fill", ref: el => this.spaceFillEl = el }),
            h("div", { class: "logo" },
                h("img", { src: this.leftPanelWebHeaderIcon, height: '32', alt: "YOOBIC Logo" })));
    }
    renderPanelBody(type) {
        if (type === 'leftPanel') {
            return h("div", { class: "left-body" },
                h("div", { class: "title-container" }, this.webTitleText),
                this.webSubtitleText.map((text) => h("div", { class: "subtitle-container" }, text)));
        }
        return '';
    }
    renderLeftPanel() {
        let backStyle;
        if (!this.hasVideoBackground() && !isWeb()) {
            backStyle = { backgroundImage: `url(${this.backgroundSrc})` };
        }
        return (h("div", { class: "left-panel" },
            this.backgroundSrc && backStyle ?
                h("div", { class: "background", style: backStyle }) : (this.hasVideoBackground() ? this.renderVideo() : null),
            h("div", { class: 'background-overlay ' + 'bg-' + (this.backgroundColor || 'dark') }),
            h("div", { class: "content-container" },
                this.renderHeader(),
                this.renderPanelBody('leftPanel'),
                h("div", { class: "footer" }, this.renderFooter()))));
    }
    renderErrorBanner() {
        return h("yoo-banner", { id: "error-alert", animationName: "sticky_up", class: "danger embedded centered header", text: this.error, closeable: !isIonic(), link: !isIonic() ? `Problems? We're here to help` : '', onAlertActionSelected: () => this.onAlertActionSelected(), onAlertClosed: () => this.onAlertClosed() });
    }
    renderRightPanel() {
        return (h("div", { class: {
                'right-panel': true,
                'mobile': isIonic(),
                'ios': isCordova() && isIOS(),
                'video-background': this.hasVideoBackground() && !isWeb()
            }, "justify-content": "flex-start" },
            this.hasVideoBackground() && !isWeb() && this.renderVideo(),
            this.error && this.renderErrorBanner(),
            h("div", { class: "right-panel-content", "justify-content": "space-between" },
                h("div", { id: "header", class: {
                        'header': true,
                        'mobile': isIonic() || !this.showLeftPanel,
                        'ios': isCordova() && isIOS(),
                        'iphone-x': isIphoneX(),
                        'no-padding': +this.error && isIonic()
                    } }, (isIonic() || !this.showLeftPanel ? [
                    h("div", { class: "space-fill" }),
                    h("div", { class: "logo" }, this.hasVideoBackground() && !isWeb() ? null : h("img", { src: this.leftPanelMobileHeaderIcon, height: '25', alt: "YOOBIC Logo" })),
                    h("div", { class: 'language-container mobile' }, this.renderLanguageSelector())
                ] :
                    (this.renderLanguageSelector()))),
                h("div", { class: { 'content': true, 'mobile': isIonic(), 'small-android': isAndroid() && !this.showHeaderFooterOnFocus }, "justify-content": "center" },
                    this.renderHeaderVideo(),
                    this.renderLoginForm()),
                h("div", { class: {
                        'footer': true,
                        'web': isWeb(),
                        'iphone-x': isIphoneX()
                    } }, isIonic() || !this.showLeftPanel ? this.renderFooter() :
                    h("yoo-button", { text: translate('ADVANCEDLOGIN'), onClick: () => this.onAdvancedLogin(), class: ' ' + (this.hasLoginScreenClass() ? 'login-screen ' : '') + 'link-transparent-' + (this.borderClass) + (isIphoneX() ? ' iphone-x-padding' : '') })))));
    }
    renderLoading() {
        return h("yoo-loader", { class: "absolute large backdrop" });
    }
    render() {
        return (h("div", { ref: el => this.outerContainerElement = el, class: "outer-container" },
            this.loading && this.renderLoading(),
            isWeb() && this.showLeftPanel && this.renderLeftPanel(),
            this.renderRightPanel()));
    }
    static get is() { return "yoo-login"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "backgroundColor": {
            "type": String,
            "attr": "background-color"
        },
        "backgroundSrc": {
            "type": String,
            "attr": "background-src"
        },
        "borderClass": {
            "type": String,
            "attr": "border-class"
        },
        "buttonClass": {
            "type": String,
            "attr": "button-class"
        },
        "currentLanguage": {
            "type": String,
            "attr": "current-language"
        },
        "deviceInputFocused": {
            "state": true
        },
        "emailLabel": {
            "type": String,
            "attr": "email-label"
        },
        "error": {
            "type": String,
            "attr": "error",
            "mutable": true
        },
        "forgotPasswordText": {
            "type": String,
            "attr": "forgot-password-text"
        },
        "host": {
            "elementRef": true
        },
        "inputFocused": {
            "state": true
        },
        "language": {
            "state": true
        },
        "languages": {
            "type": "Any",
            "attr": "languages"
        },
        "leftPanelFooterText": {
            "type": String,
            "attr": "left-panel-footer-text"
        },
        "leftPanelMobileHeaderIcon": {
            "type": String,
            "attr": "left-panel-mobile-header-icon"
        },
        "leftPanelWebHeaderIcon": {
            "type": String,
            "attr": "left-panel-web-header-icon"
        },
        "loading": {
            "type": Boolean,
            "attr": "loading"
        },
        "loginButtonText": {
            "type": String,
            "attr": "login-button-text"
        },
        "magicLinkButtonText": {
            "type": String,
            "attr": "magic-link-button-text"
        },
        "pageWidthSize": {
            "state": true
        },
        "passwordInputChanged": {
            "state": true
        },
        "passwordLabel": {
            "type": String,
            "attr": "password-label"
        },
        "rememberMeText": {
            "type": String,
            "attr": "remember-me-text"
        },
        "resetPasswordButtonText": {
            "type": String,
            "attr": "reset-password-button-text"
        },
        "setStatusBarColor": {
            "method": true
        },
        "showLeftPanel": {
            "state": true,
            "watchCallbacks": ["onLeftPanelChanged"]
        },
        "showRememberMe": {
            "type": Boolean,
            "attr": "show-remember-me"
        },
        "showSupport": {
            "state": true
        },
        "version": {
            "type": String,
            "attr": "version"
        },
        "videoBackgroundUrl": {
            "type": String,
            "attr": "video-background-url"
        },
        "videoHeaderIcon": {
            "type": String,
            "attr": "video-header-icon",
            "mutable": true
        },
        "webLoginFormSubtitle": {
            "type": String,
            "attr": "web-login-form-subtitle"
        },
        "webLoginFormTitle": {
            "type": String,
            "attr": "web-login-form-title"
        },
        "webSubtitleText": {
            "type": "Any",
            "attr": "web-subtitle-text"
        },
        "webTitleText": {
            "type": String,
            "attr": "web-title-text"
        }
    }; }
    static get events() { return [{
            "name": "doLogin",
            "method": "doLogin",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "languageSelectedParent",
            "method": "languageSelectedParent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "rememberMeSelected",
            "method": "rememberMeSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "passwordResetModalRequested",
            "method": "passwordResetModalRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "magicLinkModalRequested",
            "method": "magicLinkModalRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "advancedLoginRequested",
            "method": "advancedLoginRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  width: 100%; }\n  :host .outer-container .left-panel {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    min-width: 25rem;\n    background-color: var(--light, #FFFFFF);\n    overflow: hidden; }\n    :host .outer-container .left-panel video {\n      position: absolute;\n      min-width: 100%;\n      min-height: 100%; }\n    :host .outer-container .left-panel .content-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      height: 100%;\n      z-index: 2; }\n      :host .outer-container .left-panel .content-container .header {\n        padding: 1.875rem 0 0 1.875rem; }\n      :host .outer-container .left-panel .content-container .left-body {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -ms-flex-line-pack: center;\n        align-content: center;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        color: var(--light, #FFFFFF);\n        font-weight: 600;\n        text-transform: uppercase;\n        font-variant-caps: all-petite-caps; }\n        :host .outer-container .left-panel .content-container .left-body .title-container {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: row;\n          flex-direction: row;\n          padding-bottom: 1.25rem;\n          font-size: var(--font-s, 13px);\n          letter-spacing: 0.225rem; }\n        :host .outer-container .left-panel .content-container .left-body .subtitle-container {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: row;\n          flex-direction: row;\n          padding: 0 2rem;\n          letter-spacing: 0.125rem;\n          text-align: center; }\n      :host .outer-container .left-panel .content-container .footer {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -ms-flex-line-pack: center;\n        align-content: center;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        padding-bottom: 1.875rem; }\n        :host .outer-container .left-panel .content-container .footer .powered-by {\n          font-size: var(--font-xs_login, 11px);\n          height: 13px;\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: row;\n          flex-direction: row;\n          -ms-flex-pack: center;\n          justify-content: center;\n          -ms-flex-align: center;\n          align-items: center;\n          color: var(--stable-alt-to-white, #d0d0d0);\n          letter-spacing: 0.0625rem; }\n          :host .outer-container .left-panel .content-container .footer .powered-by .powered-img {\n            -ms-flex-align: center;\n            align-items: center;\n            display: -ms-flexbox;\n            display: flex;\n            padding-left: 0.3125rem;\n            padding-right: 0.25rem; }\n        :host .outer-container .left-panel .content-container .footer .version {\n          font-size: var(--font-s, 13px);\n          color: var(--stable, #adadad);\n          margin-top: 0.5rem;\n          text-align: center; }\n        :host .outer-container .left-panel .content-container .footer .powered-by {\n          color: var(--light, #FFFFFF); }\n    :host .outer-container .left-panel .text-container {\n      padding-top: 2rem;\n      font-size: var(--font-l, 17px);\n      font-weight: 600;\n      text-align: center; }\n    :host .outer-container .left-panel .background {\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      position: absolute;\n      background-repeat: no-repeat;\n      background-size: cover;\n      z-index: 1;\n      background-position-x: 50%; }\n    :host .outer-container .left-panel .background-overlay {\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      position: absolute;\n      background-color: var(--black, #000000);\n      opacity: 0.5;\n      z-index: 2; }\n  :host .outer-container .right-panel {\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    width: 100%;\n    height: 100%;\n    background-color: var(--light, #FFFFFF);\n    color: var(--text-color, #807f83);\n    overflow: hidden; }\n    :host .outer-container .right-panel yoo-alert {\n      width: 100%; }\n    :host .outer-container .right-panel.mobile yoo-banner {\n      --padding-top-container: 1.325rem;\n      margin-bottom: var(--padding-10, 0.625rem); }\n    :host .outer-container .right-panel.ios yoo-banner {\n      --margin-top-inner-container: 0.6315rem; }\n    :host .outer-container .right-panel .right-panel-content {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      width: 100%;\n      height: 100%; }\n      :host .outer-container .right-panel .right-panel-content .header {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-pack: end;\n        justify-content: flex-end;\n        width: calc(100% - 3.75rem);\n        padding-top: 1.875rem;\n        padding-right: 1.875rem;\n        padding-left: 1.875rem;\n        z-index: 4; }\n        :host .outer-container .right-panel .right-panel-content .header.no-padding {\n          padding-top: 0.375rem !important; }\n        :host .outer-container .right-panel .right-panel-content .header.reset {\n          -ms-flex-pack: justify;\n          justify-content: space-between; }\n        :host .outer-container .right-panel .right-panel-content .header.mobile {\n          -ms-flex-align: center;\n          align-items: center;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n          width: calc(100% - 1.5rem);\n          padding-top: 1.25rem; }\n        :host .outer-container .right-panel .right-panel-content .header.ios {\n          padding-top: 1.75rem; }\n        :host .outer-container .right-panel .right-panel-content .header.iphone-x {\n          padding-top: 2.4375rem; }\n        :host .outer-container .right-panel .right-panel-content .header .space-fill {\n          width: 3.375rem !important; }\n        :host .outer-container .right-panel .right-panel-content .header .close {\n          width: 1.875rem;\n          height: 1.875rem;\n          border: solid 0.0625rem var(--stable, #adadad);\n          border-radius: var(--padding-15, 0.9375rem);\n          opacity: 0; }\n          :host .outer-container .right-panel .right-panel-content .header .close:hover {\n            cursor: pointer; }\n        :host .outer-container .right-panel .right-panel-content .header .logo {\n          display: -ms-flexbox;\n          display: flex; }\n        :host .outer-container .right-panel .right-panel-content .header .language-container.mobile yoo-button {\n          --height-container: 1.875rem; }\n      :host .outer-container .right-panel .right-panel-content .content {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        width: 100%;\n        max-width: 460px;\n        z-index: 3; }\n        :host .outer-container .right-panel .right-panel-content .content.mobile {\n          -ms-flex-pack: center;\n          justify-content: center;\n          width: 100%;\n          height: 100%; }\n          :host .outer-container .right-panel .right-panel-content .content.mobile .version {\n            text-align: center; }\n        :host .outer-container .right-panel .right-panel-content .content.small-android {\n          -ms-flex-pack: start;\n          justify-content: flex-start; }\n        :host .outer-container .right-panel .right-panel-content .content .login-title {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: row;\n          flex-direction: row;\n          padding-bottom: 0.75rem;\n          color: var(--black, #000000);\n          font-size: var(--font-xl, 36px); }\n          :host .outer-container .right-panel .right-panel-content .content .login-title.mobile {\n            -ms-flex-align: end;\n            align-items: flex-end;\n            -ms-flex-pack: center;\n            justify-content: center;\n            height: 25%; }\n            :host .outer-container .right-panel .right-panel-content .content .login-title.mobile .inner-title {\n              text-align: center; }\n        :host .outer-container .right-panel .right-panel-content .content .version {\n          font-size: var(--font-xs, 10px); }\n        :host .outer-container .right-panel .right-panel-content .content .login-container {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: column;\n          flex-direction: column;\n          padding-top: 2.8125rem; }\n          :host .outer-container .right-panel .right-panel-content .content .login-container .password-container {\n            padding: 1.25rem 0; }\n          :host .outer-container .right-panel .right-panel-content .content .login-container .login-subtitle {\n            padding-bottom: 2.8125rem; }\n          :host .outer-container .right-panel .right-panel-content .content .login-container .inner-container {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: row;\n            flex-direction: row;\n            -ms-flex-pack: justify;\n            justify-content: space-between; }\n            :host .outer-container .right-panel .right-panel-content .content .login-container .inner-container .radio {\n              display: -ms-flexbox;\n              display: flex;\n              -ms-flex-align: center;\n              align-items: center;\n              -ms-flex-pack: center;\n              justify-content: center; }\n          :host .outer-container .right-panel .right-panel-content .content .login-container .login-button {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: row;\n            flex-direction: row;\n            -ms-flex-pack: center;\n            justify-content: center; }\n        :host .outer-container .right-panel .right-panel-content .content .login-container-mobile {\n          height: -webkit-fit-content;\n          height: -moz-fit-content;\n          height: fit-content;\n          padding-right: 2rem;\n          padding-left: 2rem;\n          -webkit-transition: 0.3s;\n          transition: 0.3s; }\n          :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .powered-by {\n            font-size: var(--font-xs_login, 11px);\n            height: 13px;\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: row;\n            flex-direction: row;\n            -ms-flex-pack: center;\n            justify-content: center;\n            -ms-flex-align: center;\n            align-items: center;\n            color: var(--stable-alt-to-white, #d0d0d0);\n            letter-spacing: 0.0625rem; }\n            :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .powered-by .powered-img {\n              -ms-flex-align: center;\n              align-items: center;\n              display: -ms-flexbox;\n              display: flex;\n              padding-left: 0.3125rem;\n              padding-right: 0.25rem; }\n          :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .version {\n            font-size: var(--font-s, 13px);\n            color: var(--stable, #adadad);\n            margin-top: 0.5rem;\n            text-align: center; }\n          :host .outer-container .right-panel .right-panel-content .content .login-container-mobile.iphone-se-focus {\n            margin-bottom: 10rem; }\n          :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .password-container {\n            padding-top: 1rem; }\n            :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .password-container yoo-form-input-container {\n              margin-bottom: 0; }\n          :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .inner-container {\n            -ms-flex-pack: justify;\n            justify-content: space-between; }\n            :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .inner-container .radio {\n              display: -ms-flexbox;\n              display: flex;\n              -ms-flex-align: center;\n              align-items: center;\n              -ms-flex-pack: center;\n              justify-content: center; }\n            :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .inner-container.mobile {\n              display: -ms-flexbox;\n              display: flex; }\n              :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .inner-container.mobile yoo-button {\n                --padding-value: 0 2px 0 var(--padding-10, 0.625rem); }\n          :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .login-button {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: row;\n            flex-direction: row;\n            -ms-flex-pack: center;\n            justify-content: center;\n            margin-top: 3.125rem;\n            margin-bottom: var(--padding-15, 0.9375rem);\n            -webkit-transition: 0.3s;\n            transition: 0.3s; }\n            :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .login-button.device-padding {\n              margin-top: var(--padding-10, 0.625rem); }\n          :host .outer-container .right-panel .right-panel-content .content .login-container-mobile .powered-by {\n            padding-bottom: var(--padding-5, 0.3125rem); }\n      :host .outer-container .right-panel .right-panel-content .footer {\n        width: 100%; }\n        :host .outer-container .right-panel .right-panel-content .footer .powered-by {\n          font-size: var(--font-xs_login, 11px);\n          height: 13px;\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: row;\n          flex-direction: row;\n          -ms-flex-pack: center;\n          justify-content: center;\n          -ms-flex-align: center;\n          align-items: center;\n          color: var(--stable-alt-to-white, #d0d0d0);\n          letter-spacing: 0.0625rem; }\n          :host .outer-container .right-panel .right-panel-content .footer .powered-by .powered-img {\n            -ms-flex-align: center;\n            align-items: center;\n            display: -ms-flexbox;\n            display: flex;\n            padding-left: 0.3125rem;\n            padding-right: 0.25rem; }\n        :host .outer-container .right-panel .right-panel-content .footer .version {\n          font-size: var(--font-s, 13px);\n          color: var(--stable, #adadad);\n          margin-top: 0.5rem;\n          text-align: center; }\n        :host .outer-container .right-panel .right-panel-content .footer.iphone-x {\n          padding-bottom: var(--padding-20, 1.25rem); }\n        :host .outer-container .right-panel .right-panel-content .footer.web {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: column;\n          flex-direction: column;\n          -ms-flex-pack: center;\n          justify-content: center;\n          padding-bottom: 1.25rem;\n          font-size: var(--font-s, 13px); }\n    :host .outer-container .right-panel.video-background {\n      background-color: rgba(0, 0, 0, 0.4);\n      color: var(--light, #FFFFFF); }\n\n\@-webkit-keyframes show {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n\n\@keyframes show {\n  from {\n    opacity: 0;\n    visibility: hidden; }\n  to {\n    opacity: 1;\n    visibility: visible; } }\n      :host .outer-container .right-panel.video-background video {\n        position: absolute;\n        min-width: 100%;\n        min-height: 100%;\n        z-index: -100; }\n        :host .outer-container .right-panel.video-background video.android {\n          opacity: 0;\n          visibility: hidden;\n          -webkit-animation: show 500ms forwards;\n          animation: show 500ms forwards;\n          -webkit-animation-delay: 1s;\n          animation-delay: 1s; }\n      :host .outer-container .right-panel.video-background .right-panel-content .video-header-container-mobile {\n        display: block;\n        position: relative;\n        text-align: center; }\n        :host .outer-container .right-panel.video-background .right-panel-content .video-header-container-mobile .logo {\n          margin-bottom: 40px; }\n        :host .outer-container .right-panel.video-background .right-panel-content .video-header-container-mobile .text {\n          position: absolute;\n          top: 0;\n          margin-bottom: 40px;\n          padding-left: 2rem;\n          color: var(--always-light, #FFFFFF);\n          font-size: 27px;\n          font-weight: bold;\n          text-align: left;\n          opacity: 0; }\n          :host .outer-container .right-panel.video-background .right-panel-content .video-header-container-mobile .text.iphone-5 {\n            margin-bottom: 0; }\n      :host .outer-container .right-panel.video-background .right-panel-content .login-container-mobile yoo-form-input-container yoo-form-input {\n        --input-text-color: cssvar(always-light) !important;\n        --input-icon-color: cssvar(always-light) !important; }\n        :host .outer-container .right-panel.video-background .right-panel-content .login-container-mobile yoo-form-input-container yoo-form-input.has-invalid-format {\n          margin-top: 0; }\n      :host .outer-container .right-panel.video-background .right-panel-content .login-container-mobile .powered-by {\n        color: var(--always-light, #FFFFFF) !important; }\n      :host .outer-container .right-panel.video-background .right-panel-content .login-container-mobile .version {\n        color: var(--always-light, #FFFFFF) !important;\n        font-size: var(--font-xs_login, 11px) !important; }\n\n\@media only screen and (max-width: 370px) {\n  :host .outer-container .left-panel .header {\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -ms-flex-align: end;\n    align-items: flex-end;\n    padding: 29px 8px 8px; }\n  :host .outer-container .left-panel .text-container {\n    padding-top: .5rem; }\n  :host .outer-container .left-panel .login-container .inner-container {\n    display: -ms-flexbox !important;\n    display: flex !important; }\n  :host .outer-container .left-panel .login-container .login-button {\n    -ms-flex-pack: center;\n    justify-content: center; } }"; }
}

export { YooBannerComponent as YooBanner, YooLanguageSelectorComponent as YooLanguageSelector, YooLoginComponent as YooLogin };
