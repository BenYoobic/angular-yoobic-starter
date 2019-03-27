import { closeModal } from '../../../utils';
import { translate, isWeb, getAppContext } from '../../../index';
export class YooProfileComponent {
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
    static get style() { return "/**style-placeholder:yoo-profile:**/"; }
}
