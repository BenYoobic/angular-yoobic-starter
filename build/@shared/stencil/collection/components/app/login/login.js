import { getElementDimensions, showActionSheet, showModal, translate, isCordova, isIonic, isIphoneX, isIOS, isTablet, disableKeyboardResize, LoginFocusAnimation, enableKeyboardResize, querySelectorAllDeep, isAndroid, isIphone5, isIphoneSE, isDarkTheme, isWeb, isSafari, debounce, querySelectorDeep } from '../../../index';
import { StatusBar } from '@ionic-native/status-bar';
import { getAppContext } from '../../../utils';
const MIN_SCREEN_SIZE_LEFT_PANEL = 900;
const IPAD_MINI_SCREEN_HEIGHT = 1024;
const MINIMUM_SCREEN_SIZE_TO_SHOW_HEADER = 665;
export class YooLoginComponent {
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
    static get style() { return "/**style-placeholder:yoo-login:**/"; }
}
