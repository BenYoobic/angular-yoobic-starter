import { translate } from '../../../index'; //'../../../../stencil';
export class YooUserProfileComponent {
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
    static get style() { return "/**style-placeholder:yoo-user-profile:**/"; }
}
