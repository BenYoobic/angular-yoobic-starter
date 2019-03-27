const h = window.DesignSystem.h;

import { Q as closeModal, W as isWeb, a5 as getAppContext, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooProfileComponent {
    constructor() {
        this.showProfileHeader = true;
        this.isPreview = false;
        this.disableProfileLink = false;
    }
    onProfileEdit() {
        let detail = { host: this.modalHost, isPreview: this.isPreview };
        if (this.isPreview) {
            closeModal(null);
        }
        this.profileEdit.emit(detail);
    }
    componentWillLoad() {
        this.localConfig = this.config;
        if (this.selectedTitle) {
            this.activeItem = this.selectedTitle;
        }
    }
    componentDidLoad() {
        if (this.selectedTitle) {
            if (this.selectedTitle === 'edit') {
                this.onProfileEdit();
            }
            else {
                let selectedItem;
                this.config.links.forEach((link) => {
                    link.items.forEach((item) => {
                        if (item.title === this.selectedTitle) {
                            selectedItem = item;
                        }
                    });
                });
                this.onClicked(selectedItem);
            }
        }
    }
    onClicked(item, isToggle = false) {
        if (this.isPreview) {
            item = Object.assign({}, item, { isPreview: true, isToggle });
            this.clicked.emit(item);
            if (!isToggle) {
                closeModal(null);
            }
        }
        else {
            item = Object.assign({}, item, { host: this.modalHost });
            if (isWeb()) {
                closeModal(null);
                this.activeItem = item.title;
            }
            this.clicked.emit(item);
        }
    }
    onLogout() {
        this.logout.emit(true);
    }
    onToggleChanged(ev, linkIndex, itemIndex) {
        if (ev && this.localConfig && this.localConfig.links[linkIndex] && this.localConfig.links[linkIndex].items[itemIndex]) {
            this.localConfig.links[linkIndex].items[itemIndex].checked = ev.detail;
        }
    }
    renderUl(link, linkIndex) {
        return [
            link.title ?
                h("div", { class: "profile-links-title" }, link.title)
                : null,
            link.items ?
                h("ul", { class: "profile-links-menu" }, link.items.map((item, i) => {
                    return this.renderLi(item, linkIndex, i);
                }))
                : null
        ];
    }
    renderLi(item, linkIndex, itemIndex) {
        let profileMenuClass = {
            'profile-links-menu-item ': true,
            [item.color]: item.color,
            'web': isWeb(),
            'active': item.title === this.activeItem
        };
        return (item.isVisible && !item.isVisible() ? null :
            item.type !== 'toggle' ?
                h("li", { class: profileMenuClass, onClick: () => this.onClicked(item) },
                    h("div", { class: "title-container" },
                        h("div", null,
                            item.icon && h("yoo-icon", { class: item.icon }),
                            item.title),
                        h("div", { class: "end-container" },
                            item.badge ? h("yoo-badge", { class: "energized", text: item.badge }) : null,
                            !isWeb() && h("yoo-icon", { class: "yo-right stable" }))))
                :
                    h("li", { class: profileMenuClass },
                        h("div", null,
                            item.icon && h("yoo-icon", { class: item.icon }),
                            item.title),
                        h("yoo-form-toggle", { class: item.color || null, value: item.checked, onClicked: () => this.onClicked(item, true), onInputChanged: (ev) => this.onToggleChanged(ev, linkIndex, itemIndex) })));
    }
    hostData() {
        return {
            class: Object.assign({ [this.extraClasses]: this.extraClasses }, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "profile-content" }, (this.localConfig ?
            h("span", null,
                this.showProfileHeader && !isWeb() &&
                    h("div", { class: { 'profile-user': true, 'margin-bottom': getAppContext()['operations'] }, onClick: () => this.onProfileEdit() },
                        h("yoo-avatar", { class: "llarge", user: this.localConfig.user }),
                        h("div", { class: "profile-user-name" },
                            this.localConfig.user.firstName,
                            " ",
                            this.localConfig.user.lastName),
                        h("div", { class: "profile-user-role" }, translate(this.localConfig.user.role))),
                h("div", { class: "profile-links" },
                    h("div", { class: "profile-details" },
                        h("slot", null)),
                    !this.disableProfileLink && h("ul", { class: "profile-links-menu" },
                        h("li", { class: {
                                'profile-links-menu-item ': true,
                                'web': isWeb()
                            }, onClick: () => this.onProfileEdit() },
                            h("div", { class: "title-container" },
                                h("div", null,
                                    h("yoo-icon", { class: "yo-user" }),
                                    translate('PROFILE')),
                                h("div", { class: "end-container" }, !isWeb() && h("yoo-icon", { class: "yo-right stable" }))))),
                    this.localConfig.links.map((link, i) => {
                        return this.renderUl(link, i);
                    })),
                (this.localConfig.hideLogout && this.localConfig.hideLogout() ?
                    null
                    :
                        h("div", { class: "profile-logout", onClick: () => this.onLogout() },
                            h("yoo-icon", { class: "yo-unbook" }),
                            h("span", { class: "profile-logout-text" }, this.localConfig.logoutText))))
            :
                h("div", null, translate('LOADING')))));
    }
    static get is() { return "yoo-profile"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "activeItem": {
            "state": true
        },
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "disableProfileLink": {
            "type": Boolean,
            "attr": "disable-profile-link"
        },
        "extraClasses": {
            "type": String,
            "attr": "extra-classes"
        },
        "host": {
            "elementRef": true
        },
        "isPreview": {
            "type": Boolean,
            "attr": "is-preview"
        },
        "modalHost": {
            "type": "Any",
            "attr": "modal-host"
        },
        "selectedTitle": {
            "type": String,
            "attr": "selected-title"
        },
        "showProfileHeader": {
            "type": Boolean,
            "attr": "show-profile-header"
        }
    }; }
    static get events() { return [{
            "name": "clicked",
            "method": "clicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "profileEdit",
            "method": "profileEdit",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "logout",
            "method": "logout",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "bottomRightClicked",
            "method": "onProfileEdit"
        }]; }
    static get style() { return ".sc-yoo-profile-h {\n  height: 100%;\n  font-size: var(--font-l, 17px);\n  font-weight: 400; }\n  .sc-yoo-profile-h   .border.sc-yoo-profile {\n    width: 100%;\n    height: 0;\n    border-top: 1px solid var(--stable-30, #E6E6E6); }\n  .sc-yoo-profile-h   .profile-content.sc-yoo-profile {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n    .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-user.sc-yoo-profile {\n      margin-top: 0.5rem;\n      text-align: center; }\n      .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-user.margin-bottom.sc-yoo-profile {\n        margin-bottom: 2rem; }\n      .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-user.sc-yoo-profile   .profile-user-name.sc-yoo-profile {\n        line-height: 1.3125rem; }\n      .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-user.sc-yoo-profile   .profile-user-role.sc-yoo-profile {\n        color: var(--stable, #adadad);\n        font-size: var(--font-s, 13px);\n        font-weight: 300;\n        line-height: 1rem; }\n      .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-user.sc-yoo-profile   .profile-cta.sc-yoo-profile {\n        color: var(--success, #04CC99);\n        font-size: var(--font-s, 13px); }\n    .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-details.sc-yoo-profile   yoo-user-detail.sc-yoo-profile {\n      display: block;\n      padding: var(--padding-5, 0.3125rem) var(--padding-15, 0.9375rem); }\n    .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile {\n      padding-left: 1rem; }\n      .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-title.sc-yoo-profile {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        width: 100%;\n        height: 1.875rem;\n        margin-top: 2rem;\n        color: var(--stable, #adadad);\n        font-size: var(--font-s, 13px); }\n      .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile {\n        list-style: none outside none;\n        background: none repeat scroll 0 0 transparent;\n        border: 0 none;\n        font-size: 100%;\n        margin: 0;\n        outline: 0 none;\n        padding: 0;\n        vertical-align: baseline;\n        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        cursor: pointer; }\n        .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile   .profile-links-menu-item.sc-yoo-profile {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-align: center;\n          align-items: center;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n          height: 2.6875rem;\n          font-weight: 400;\n          cursor: pointer; }\n          .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile   .profile-links-menu-item.web.sc-yoo-profile   .title-container.sc-yoo-profile {\n            margin-right: var(--padding-15, 0.9375rem); }\n          .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile   .profile-links-menu-item.active.sc-yoo-profile {\n            margin-left: -26px;\n            padding-left: 26px;\n            background-color: var(--success-light, rgba(46, 219, 183, 0.1)); }\n          .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile   .profile-links-menu-item.sc-yoo-profile   .title-container.sc-yoo-profile {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-align: center;\n            align-items: center;\n            -ms-flex-pack: justify;\n            justify-content: space-between;\n            width: 100%;\n            height: 2.6875rem;\n            border-bottom: 1px solid var(--stable-light, #f1f1f1); }\n          .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile   .profile-links-menu-item.sc-yoo-profile   yoo-icon.sc-yoo-profile {\n            margin-right: 1rem; }\n          .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile   .profile-links-menu-item.sc-yoo-profile   .end-container.sc-yoo-profile {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-align: center;\n            align-items: center;\n            -ms-flex-pack: center;\n            justify-content: center; }\n          .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile   .profile-links-menu-item.sc-yoo-profile   .yo-right.sc-yoo-profile, .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile   .profile-links-menu-item.sc-yoo-profile   yoo-form-toggle.sc-yoo-profile {\n            margin-right: 1rem; }\n          .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-links.sc-yoo-profile   .profile-links-menu.sc-yoo-profile   .profile-links-menu-item.sc-yoo-profile   yoo-badge.sc-yoo-profile {\n            padding-right: var(--padding-5, 0.3125rem); }\n    .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-logout.sc-yoo-profile {\n      display: block;\n      height: 2.75rem;\n      margin-top: 0.6875rem;\n      margin-bottom: 2.75rem;\n      padding-left: 1rem;\n      color: var(--danger-light, #F46885); }\n      .sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-logout.sc-yoo-profile   yoo-icon.sc-yoo-profile {\n        margin-right: 1rem; }\n\n.boost.sc-yoo-profile-h   .profile-content.sc-yoo-profile   .profile-user.sc-yoo-profile   .profile-cta.sc-yoo-profile {\n  color: var(--danger-light, #F46885); }\n\n.side-menu.sc-yoo-profile-h   .profile-content.sc-yoo-profile {\n  margin-right: var(--padding-10, 0.625rem);\n  padding: var(--padding-10, 0.625rem) 0 var(--padding-10, 0.625rem) var(--padding-10, 0.625rem);\n  border-radius: 5px;\n  background: var(--light, #FFFFFF);\n  -webkit-box-shadow: 0 5px 13px 0 rgba(40, 47, 54, 0.08);\n  box-shadow: 0 5px 13px 0 rgba(40, 47, 54, 0.08); }\n\n.boost.sc-yoo-profile-h   .profile-details.sc-yoo-profile {\n  font-size: var(--font-s, 13px); }"; }
}

export { YooProfileComponent as YooProfile };
