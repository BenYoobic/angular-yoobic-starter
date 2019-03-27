const h = window.DesignSystem.h;

import { L as querySelectorDeep, a6 as debounce, a8 as setAnimation, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooModalComponent {
    constructor() {
        this.hasHeader = true;
        this.closeIcon = true;
    }
    onInputBarRawChange() {
        // resize the modal to adjust slim scroll if the input bar take more or less space
        setTimeout(() => this.resize(), 100);
    }
    /**
     * Dismiss the modal overlay after it has been presented.
     */
    async dismiss(data, role) {
        // await dismiss(this, data, role, 'modalLeave', iosLeaveAnimation, mdLeaveAnimation);
        // await detachComponent(this.delegate, this.usersElement);
    }
    close() {
        if (this.animationProp) {
            this.animationProp.open = false;
        }
        this.closed.emit(true);
        this.animation(false);
    }
    resize() {
        let ionScroll = querySelectorDeep(this.host, 'yoo-ion-scroll');
        if (ionScroll) {
            if (ionScroll.height === this.getSizeContainer().height) {
                ionScroll.refresh();
            }
            else {
                ionScroll.height = this.getSizeContainer().height;
            }
        }
    }
    componentDidLoad() {
        this.setContentInModal();
        this.animation(true);
        this.resizeListener = debounce(this.resize, 500).bind(this);
        window.addEventListener('resize', this.resizeListener);
    }
    componentDidUpdate() {
        this.setContentInModal();
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    onPrimaryButtonClick(ev) {
        if (ev) {
            this.primaryButtonClicked.emit(true);
            this.primaryFn();
        }
    }
    animation(open, sentFromClose) {
        if (this.animationName) {
            if (this.animationName === 'sticky_up') {
                const padding = 16;
                const modalHeight = (querySelectorDeep(this.host, 'div.outer-container').clientHeight);
                setAnimation(this.animationName, this.host, { open: open, distance: (((window.innerHeight / 2) + padding) - (modalHeight / 2)), modalHeight: modalHeight });
            }
            else {
                setAnimation(this.animationName, querySelectorDeep(this.host, '.outer-container'), (sentFromClose ? { open: open, up: true } : (this.animationProp ? this.animationProp : { open: open })));
            }
        }
    }
    setContentInModal() {
        if (this.scrollEnabled) {
            if (this.content) {
                let slim = document.createElement('yoo-ion-scroll');
                querySelectorDeep(this.host, 'div.modal-scroll-container').appendChild(slim);
                slim.appendChild(this.content);
            }
            this.resize();
        }
        else if (this.content) {
            querySelectorDeep(this.host, 'div.modal-body').appendChild(this.content);
        }
    }
    getSizeContainer() {
        let modalContainer = querySelectorDeep(this.host, '.modal-scroll-container');
        let maxHeight = window.innerHeight;
        if (modalContainer) {
            let modalHeader = querySelectorDeep(this.host, '.modal-header');
            if (modalHeader) {
                maxHeight -= modalHeader.clientHeight;
            }
            let modalFooter = querySelectorDeep(this.host, '.modal-footer');
            if (modalFooter) {
                maxHeight -= modalFooter.clientHeight;
            }
            return { height: Math.min((modalContainer.clientHeight), maxHeight) + 'px', width: modalContainer.clientWidth + 'px' };
        }
        return { height: '', width: '' };
    }
    renderHeadingIcons(headingIcons) {
        return headingIcons.map((headingIcon) => h("yoo-icon", { class: 'icon ' + headingIcon.icon, onClick: headingIcon.handler ? () => headingIcon.handler() : null }));
    }
    hostData() {
        return {
            class: Object.assign({ ['custom-controller']: this.withYooCtrl }, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            this.hasHeader ?
                h("div", { class: "modal-header" },
                    h("span", { class: 'icons ' + (this.headingIcons ? '' : 'hide-icon') }, this.headingIcons ? this.renderHeadingIcons(this.headingIcons) : null),
                    h("div", { class: "inner-header" },
                        h("span", { class: "modal-heading" }, this.heading)),
                    this.closeIcon ? h("span", { class: "close-icon", onClick: () => this.close() },
                        h("yoo-icon", { class: "yo-close" })) : h("span", null))
                : null,
            h("div", { class: "modal-body" },
                h("div", { class: "modal-scroll-container" },
                    h("yoo-ion-scroll", { class: 'relative ' + (this.cssClass || '') },
                        h("slot", null)))),
            this.hasFooter ?
                h("div", { class: "modal-footer" },
                    this.footerText ? h("div", { class: "footer-text" },
                        h("span", null, this.footerText)) : null,
                    h("div", { class: "footer-buttons" },
                        this.secondaryButtonText ? h("div", { class: "secondary-button squared" },
                            h("yoo-button", { class: "dark", onClick: () => this.close(), text: this.secondaryButtonText })) : null,
                        this.primaryButtonText ? h("div", { class: "primary-button squared" },
                            h("yoo-button", { class: "accent", onClick: (event) => this.onPrimaryButtonClick(event), text: this.primaryButtonText })) : null,
                        h("slot", { name: "footer-slot" }))) : null));
    }
    static get is() { return "yoo-modal"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "animationName": {
            "type": String,
            "attr": "animation-name"
        },
        "animationProp": {
            "type": "Any",
            "attr": "animation-prop"
        },
        "close": {
            "method": true
        },
        "closeIcon": {
            "type": Boolean,
            "attr": "close-icon"
        },
        "content": {
            "type": "Any",
            "attr": "content"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "footerText": {
            "type": String,
            "attr": "footer-text"
        },
        "hasFooter": {
            "type": Boolean,
            "attr": "has-footer"
        },
        "hasHeader": {
            "type": Boolean,
            "attr": "has-header"
        },
        "heading": {
            "type": String,
            "attr": "heading"
        },
        "headingIcons": {
            "type": "Any",
            "attr": "heading-icons"
        },
        "host": {
            "elementRef": true
        },
        "overlayId": {
            "type": Number,
            "attr": "overlay-id"
        },
        "primaryButtonText": {
            "type": String,
            "attr": "primary-button-text"
        },
        "primaryFn": {
            "type": "Any",
            "attr": "primary-fn"
        },
        "resize": {
            "method": true
        },
        "scrollEnabled": {
            "type": Boolean,
            "attr": "scroll-enabled"
        },
        "secondaryButtonText": {
            "type": String,
            "attr": "secondary-button-text"
        },
        "withYooCtrl": {
            "type": Boolean,
            "attr": "with-yoo-ctrl"
        }
    }; }
    static get events() { return [{
            "name": "primaryButtonClicked",
            "method": "primaryButtonClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "closed",
            "method": "closed",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "rowNumberChanged",
            "method": "onInputBarRawChange"
        }]; }
    static get style() { return ":host[padding] .outer-container .modal-body {\n  padding: 1rem; }\n\n:host .outer-container {\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  border-radius: 0.3125rem;\n  background: var(--light, #FFFFFF); }\n  :host .outer-container .modal-header {\n    -webkit-border-top-right-radius: 0.3125rem;\n    border-top-right-radius: 0.3125rem;\n    -webkit-border-top-left-radius: 0.3125rem;\n    border-top-left-radius: 0.3125rem;\n    background-clip: padding-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    padding: 1rem;\n    border-bottom: 1px solid var(--stable-30, #E6E6E6);\n    color: var(--black, #000000);\n    z-index: 10; }\n    :host .outer-container .modal-header .inner-header {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      padding: 0 1rem; }\n    :host .outer-container .modal-header .modal-heading {\n      font-size: var(--font-l, 17px);\n      font-weight: 400; }\n    :host .outer-container .modal-header .icon {\n      padding: 0.5rem;\n      cursor: pointer; }\n    :host .outer-container .modal-header .close-icon {\n      padding-right: 0.5rem;\n      cursor: pointer; }\n    :host .outer-container .modal-header .hide-icon {\n      color: transparent; }\n  :host .outer-container .modal-body {\n    position: relative;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    height: 100%;\n    min-height: 10.9375rem; }\n    :host .outer-container .modal-body .modal-scroll-container {\n      width: 100%;\n      height: 100%; }\n      :host .outer-container .modal-body .modal-scroll-container .bg-stable-ultralight {\n        background: var(--stable-ultralight, #F5F5F5); }\n    :host .outer-container .modal-body .modal-content {\n      width: 100%; }\n  :host .outer-container .modal-footer {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    padding: 1rem;\n    -webkit-box-shadow: var(--input-bar-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15));\n    box-shadow: var(--input-bar-shadow, 0 1px 10px 0 rgba(0, 0, 0, 0.15));\n    z-index: 1; }\n    :host .outer-container .modal-footer .footer-buttons {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1 1 33%;\n      flex: 1 1 33%;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-line-pack: center;\n      align-content: center;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: end;\n      justify-content: flex-end; }\n      :host .outer-container .modal-footer .footer-buttons .primary-button,\n      :host .outer-container .modal-footer .footer-buttons .secondary-button {\n        padding-top: 0.5rem;\n        padding-right: 0.5rem;\n        padding-bottom: 0.5rem; }\n\n:host(.custom-controller) {\n  position: relative;\n  z-index: 2000; }\n  :host(.custom-controller) .outer-container {\n    height: auto; }\n\n:host(.fullscreen) {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  margin-top: 0;\n  margin-left: 0; }\n  :host(.fullscreen) .outer-container {\n    width: 100%;\n    height: 100%;\n    border-radius: 0rem; }\n    :host(.fullscreen) .outer-container .modal-header {\n      position: absolute;\n      width: 100%;\n      border-radius: 0rem; }\n    :host(.fullscreen) .outer-container .modal-body {\n      padding-top: 5.0625rem; }\n    :host(.fullscreen) .outer-container .modal-footer {\n      position: absolute;\n      bottom: 0rem;\n      width: 100%; }\n\n:host(.drawer) {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 66.66%;\n  position: absolute;\n  margin-top: 0;\n  margin-left: 0; }\n  :host(.drawer) .outer-container {\n    width: 100%;\n    height: 100%;\n    border-radius: 0rem; }\n    :host(.drawer) .outer-container .modal-header {\n      position: absolute;\n      width: 100%;\n      border-radius: 0rem; }\n    :host(.drawer) .outer-container .modal-body {\n      padding-top: 5.0625rem; }\n    :host(.drawer) .outer-container .modal-footer {\n      position: absolute;\n      bottom: 0rem;\n      width: 100%; }\n  :host(.drawer) .outer-container .modal-header {\n    -ms-flex-direction: row-reverse;\n    flex-direction: row-reverse; }\n\n:host(.menu) {\n  position: relative;\n  top: 0rem;\n  left: 0rem;\n  width: 100%;\n  height: 100%;\n  margin-top: 0;\n  margin-left: 0; }\n  :host(.menu) .outer-container {\n    width: 100%;\n    height: 100%;\n    border-radius: 0rem; }\n    :host(.menu) .outer-container .modal-header {\n      position: absolute;\n      width: 100%;\n      border-radius: 0rem; }\n    :host(.menu) .outer-container .modal-body {\n      padding-top: 5.0625rem; }\n    :host(.menu) .outer-container .modal-footer {\n      position: absolute;\n      bottom: 0rem;\n      width: 100%; }\n  :host(.menu) .outer-container .modal-header {\n    position: relative;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n  :host(.menu) .outer-container .modal-body {\n    padding-top: 0 !important; }\n\n:host(.action-sheet) {\n  position: absolute;\n  top: auto;\n  bottom: 0rem;\n  left: 0rem;\n  width: 100%;\n  margin-top: 0;\n  margin-left: 0; }\n  :host(.action-sheet) .outer-container {\n    width: 100%;\n    height: 100%;\n    border-radius: 0rem; }\n    :host(.action-sheet) .outer-container .modal-header {\n      position: absolute;\n      width: 100%;\n      border-radius: 0rem; }\n    :host(.action-sheet) .outer-container .modal-body {\n      padding-top: 5.0625rem; }\n    :host(.action-sheet) .outer-container .modal-footer {\n      position: absolute;\n      bottom: 0rem;\n      width: 100%; }\n  :host(.action-sheet) .outer-container {\n    border: none;\n    background-color: transparent; }\n    :host(.action-sheet) .outer-container .modal-body {\n      -ms-flex-pack: center;\n      justify-content: center;\n      width: 100%; }\n    :host(.action-sheet) .outer-container .modal-body > div {\n      width: 100%; }\n      :host(.action-sheet) .outer-container .modal-body > div div[slot=\"[modal-content\"] {\n        width: 100%; }\n\n:host(.language-selector) .outer-container {\n  width: 250px;\n  min-height: 475px;\n  border: 0 solid;\n  border-radius: 0.78125rem;\n  color: var(--text-color, #807f83);\n  -webkit-box-shadow: 0 6px 19px 0 rgba(40, 47, 54, 0.08);\n  box-shadow: 0 6px 19px 0 rgba(40, 47, 54, 0.08); }\n  :host(.language-selector) .outer-container .modal-body {\n    height: 100%;\n    border-radius: 0.78125rem;\n    background-color: var(--light, #FFFFFF); }\n\n:host(.simple) .outer-container .modal-header {\n  border: none;\n  background-color: var(--light, #FFFFFF) !important; }\n  :host(.simple) .outer-container .modal-header .modal-heading {\n    font-weight: normal; }\n\n:host(.vertical-menu) .outer-container {\n  border: none !important;\n  background: var(--dark, #2b3648) !important; }\n  :host(.vertical-menu) .outer-container .modal-body {\n    width: 100%;\n    background-color: var(--dark, #2b3648);\n    color: var(--light, #FFFFFF);\n    padding: 0 !important;\n    padding-top: 5.0625rem !important; }\n    :host(.vertical-menu) .outer-container .modal-body .row {\n      -webkit-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n      transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n      :host(.vertical-menu) .outer-container .modal-body .row a {\n        color: var(--light, #FFFFFF);\n        text-decoration: none;\n        -ms-flex-positive: 1;\n        flex-grow: 1; }\n        :host(.vertical-menu) .outer-container .modal-body .row a.active {\n          border-left: 0.25rem solid var(--accent, #1FB6FF);\n          padding-left: 0.75rem; }\n        :host(.vertical-menu) .outer-container .modal-body .row a:hover {\n          background-color: var(--dark-two, #212936); }\n        :host(.vertical-menu) .outer-container .modal-body .row a .item {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: row;\n          flex-direction: row;\n          padding-left: 1rem;\n          padding-top: 0.4rem;\n          padding-bottom: 0.4rem;\n          -ms-flex-align: center;\n          align-items: center; }\n          :host(.vertical-menu) .outer-container .modal-body .row a .item img {\n            max-height: 1.5rem;\n            max-width: 1.5rem;\n            margin-right: 1rem; }\n          :host(.vertical-menu) .outer-container .modal-body .row a .item yoo-icon {\n            margin-left: auto;\n            margin-right: 1rem;\n            -webkit-transition: all 0.3s;\n            transition: all 0.3s; }\n            :host(.vertical-menu) .outer-container .modal-body .row a .item yoo-icon.chevron-active {\n              -webkit-transform: rotate(-90deg);\n              transform: rotate(-90deg); }\n          :host(.vertical-menu) .outer-container .modal-body .row a .item.active {\n            background-color: var(--dark-two, #212936);\n            border-left: 0.25rem solid var(--accent, #1FB6FF);\n            padding-left: 0.75rem; }\n          :host(.vertical-menu) .outer-container .modal-body .row a .item:hover {\n            background-color: var(--dark-two, #212936); }\n      :host(.vertical-menu) .outer-container .modal-body .row a:hover {\n        text-decoration: none; }\n      :host(.vertical-menu) .outer-container .modal-body .row .sub-container {\n        overflow: hidden;\n        width: 100%;\n        background: var(--dark, #2b3648); }\n        :host(.vertical-menu) .outer-container .modal-body .row .sub-container .row-subitems {\n          overflow: hidden;\n          -webkit-animation: sub-item-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n          animation: sub-item-appear 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n          :host(.vertical-menu) .outer-container .modal-body .row .sub-container .row-subitems .item {\n            padding-left: 2rem; }\n            :host(.vertical-menu) .outer-container .modal-body .row .sub-container .row-subitems .item.active {\n              padding-left: 1.75rem;\n              background-color: var(--dark-60, #6b81a6); }\n            :host(.vertical-menu) .outer-container .modal-body .row .sub-container .row-subitems .item:hover {\n              background-color: var(--dark-60, #6b81a6); }\n      :host(.vertical-menu) .outer-container .modal-body .row.hidden .row-subitems {\n        display: none; }\n      :host(.vertical-menu) .outer-container .modal-body .row.sub-display {\n        background: var(--dark-two, #212936); }\n    :host(.vertical-menu) .outer-container .modal-body .column {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n\n:host(.modal-input) yoo-input-bar {\n  --padding-input-container: 0;\n  width: 100%; }\n\n:host(.modal-input) .outer-container .modal-footer {\n  height: unset !important;\n  padding: 0.5rem 1rem; }\n\n:host(.web) .outer-container .modal-footer {\n  padding: 0; }\n\n:host(.accent) .outer-container {\n  color: #807f83; }\n  :host(.accent) .outer-container .modal-header {\n    border-bottom-color: var(--accent, #1FB6FF);\n    background-color: var(--accent-20, #d2f0ff);\n    color: var(--accent, #1FB6FF); }\n\n:host(.accent):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--accent, #1FB6FF); }\n\n:host(.success) .outer-container {\n  color: #807f83; }\n  :host(.success) .outer-container .modal-header {\n    border-bottom-color: var(--success-110, #04b88a);\n    background-color: var(--success-20, #c4feef);\n    color: var(--success-110, #04b88a); }\n\n:host(.success):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--success-110, #04b88a); }\n\n:host(.danger) .outer-container {\n  color: #807f83; }\n  :host(.danger) .outer-container .modal-header {\n    border-bottom-color: var(--danger, #ff625f);\n    background-color: var(--danger-20, #ffe0df);\n    color: var(--danger, #ff625f); }\n\n:host(.danger):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--danger, #ff625f); }\n\n:host(.info) .outer-container {\n  color: #807f83; }\n  :host(.info) .outer-container .modal-header {\n    border-bottom-color: var(--info, #fc459e);\n    background-color: var(--info-20, #fedaec);\n    color: var(--info, #fc459e); }\n\n:host(.info):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--info, #fc459e); }\n\n:host(.warning) .outer-container {\n  color: #807f83; }\n  :host(.warning) .outer-container .modal-header {\n    border-bottom-color: var(--warning, #ff6402);\n    background-color: var(--warning-20, #ffe0cc);\n    color: var(--warning, #ff6402); }\n\n:host(.warning):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--warning, #ff6402); }\n\n:host(.dark) .outer-container {\n  color: #807f83; }\n  :host(.dark) .outer-container .modal-header {\n    border-bottom-color: var(--dark, #2b3648);\n    background-color: var(--stable-30, #E6E6E6);\n    color: var(--dark, #2b3648); }\n\n:host(.dark):not(.fullscreen):not(.drawer):not(.menu) .outer-container {\n  border: 1px solid var(--dark, #2b3648); }"; }
}

export { YooModalComponent as YooModal };
