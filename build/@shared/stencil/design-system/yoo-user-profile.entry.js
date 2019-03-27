const h = window.DesignSystem.h;

import { m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooUserProfileComponent {
    onClicked(item) {
        this.clicked.emit(item);
    }
    renderLi(item) {
        return (item.isVisible && !item.isVisible() ? null :
            item.type !== 'toggle' ?
                h("li", { class: 'profile-links-menu-item ' + (item.color || ''), onClick: () => this.onClicked(item) },
                    h("div", null,
                        item.icon && h("yoo-icon", { class: item.icon }),
                        item.title),
                    h("div", { class: "end-container" },
                        item.subtitle ? h("div", { class: "subtitle-container", innerHTML: item.subtitle }) : null,
                        item.clickable ?
                            h("div", null,
                                item.badge ? h("yoo-badge", { class: "energized", text: item.badge }) : null,
                                h("yoo-icon", { class: "yo-right stable" })) : null))
                :
                    h("li", { class: 'profile-links-menu-item ' + (item.color || '') },
                        h("div", null,
                            item.icon && h("yoo-icon", { class: item.icon }),
                            item.title),
                        " ",
                        h("yoo-form-toggle", { class: item.color || 'success', value: item.checked, onClick: () => this.onClicked(item) })));
    }
    render() {
        return (h("div", { class: "profile-content" },
            h("div", { class: "profile-user" },
                h("yoo-avatar", { class: "large", user: this.user }),
                h("div", { class: "profile-user-name" },
                    this.user.firstName,
                    " ",
                    this.user.lastName),
                h("div", { class: "profile-user-role" }, translate(this.user.role))),
            this.config && this.config.links ?
                h("div", { class: "profile-links" }, this.config.links.map(link => {
                    return h("ul", { class: "profile-links-menu" }, link.items.map(item => {
                        return this.renderLi(item);
                    }));
                }))
                : null));
    }
    static get is() { return "yoo-user-profile"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "host": {
            "elementRef": true
        },
        "user": {
            "type": "Any",
            "attr": "user"
        }
    }; }
    static get events() { return [{
            "name": "clicked",
            "method": "clicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  height: 100%;\n  font-size: var(--font-l, 17px);\n  font-weight: 400; }\n  :host .profile-content {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n    :host .profile-content .profile-user {\n      margin-top: 0.5rem;\n      margin-bottom: 3rem;\n      text-align: center; }\n      :host .profile-content .profile-user .profile-user-name {\n        line-height: 1.3125rem; }\n      :host .profile-content .profile-user .profile-user-role {\n        color: var(--stable, #adadad);\n        font-size: var(--font-s, 13px);\n        font-weight: 300;\n        line-height: 1rem; }\n    :host .profile-content .profile-links {\n      padding-left: 1rem; }\n      :host .profile-content .profile-links .profile-links-title {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        width: 100%;\n        height: 1.875rem;\n        color: var(--stable, #adadad);\n        font-size: var(--font-s, 13px); }\n      :host .profile-content .profile-links .profile-links-menu {\n        list-style: none outside none;\n        background: none repeat scroll 0 0 transparent;\n        border: 0 none;\n        font-size: 100%;\n        margin: 0;\n        outline: 0 none;\n        padding: 0;\n        vertical-align: baseline;\n        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        cursor: pointer; }\n        :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-align: center;\n          align-items: center;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n          height: 2.6875rem;\n          border-bottom: 1px solid var(--stable-light, #f1f1f1);\n          font-weight: 400;\n          line-height: 36px;\n          cursor: pointer; }\n          :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item:last-child {\n            margin-bottom: 0.5rem;\n            border-bottom: none; }\n          :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item yoo-icon:not(.flag-icon) {\n            margin-right: 1rem; }\n          :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item .yo-right,\n          :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item yoo-form-toggle {\n            margin-right: 1rem; }\n          :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item yoo-badge {\n            padding-right: var(--padding-5, 0.3125rem); }\n          :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item .end-container {\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: row;\n            flex-direction: row; }\n            :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item .end-container .subtitle-container {\n              padding-right: var(--padding-10, 0.625rem); }\n              :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item .end-container .subtitle-container .flag-container {\n                display: -ms-flexbox;\n                display: flex;\n                -ms-flex-align: center;\n                align-items: center;\n                -ms-flex-pack: center;\n                justify-content: center;\n                width: 2rem;\n                height: 2rem;\n                margin-right: var(--padding-10, 0.625rem);\n                padding: 0;\n                border-radius: 1rem;\n                font-size: var(--font-xl, 36px);\n                overflow: hidden; }"; }
}

export { YooUserProfileComponent as YooUserProfile };
