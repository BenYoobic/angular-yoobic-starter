import { h } from '../design-system.core.js';

import { a6 as debounce, a4 as getElementDimensions, _ as cloudinary, m as translate, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooWebMenuComponent {
    activePageChange(activePage) {
        this.activePreviewPage = undefined;
        this._activePage = activePage;
    }
    onIonModalDidDismiss() {
        this.activePreviewPage = undefined;
        this.previewIcon = undefined;
    }
    componentWillLoad() {
        if (this.activePage) {
            this._activePage = this.activePage;
        }
    }
    componentDidLoad() {
        this.resizeListener = debounce(this.resizePage, 500).bind(this);
        window.addEventListener('resize', this.resizeListener);
    }
    componentDidUnload() {
        window.removeEventListener('resize', this.resizeListener);
    }
    isActivePage(page, isClickOnMenuItem) {
        let paramIndex = this.activePage.indexOf('?');
        if (paramIndex > 0) {
            this._activePage = this.activePage.slice(0, paramIndex);
        }
        return page.href && this._activePage && page.name === 'profile' ? this.isAProfilePage(this._activePage, isClickOnMenuItem) : page.href === this._activePage;
    }
    isHighlightedPage(page) {
        if (this.activePreviewPage) {
            return page.name === this.activePreviewPage;
        }
        else {
            return this.isActivePage(page);
        }
    }
    isAProfilePage(activePage, isClickOnMenuItem) {
        let isProfileSubPage = false;
        switch (activePage) {
            case '/menu/documents':
            case '/menu/contacts':
            case '/menu/notes':
                isProfileSubPage = true;
                break;
        }
        return activePage === '/menu/profile' || (isProfileSubPage && !isClickOnMenuItem);
    }
    onItemClicked(item, itemContainer) {
        if (this.isActivePage(item, true)) {
            // Do nothing if we click on the currently active item
            return;
        }
        if (item.openPreview) {
            let itemEvent = item;
            itemEvent.position = this.getPreviewIconPosition(itemContainer);
            this.previewIcon = itemContainer;
            this.activePreviewPage = item.name;
        }
        this.itemClicked.emit(item);
    }
    resizePage() {
        if (this.previewIcon) {
            let position = this.getPreviewIconPosition(this.previewIcon);
            this.previewIconMoved.emit(position);
        }
    }
    getPreviewIconPosition(itemContainer) {
        let left = itemContainer.getBoundingClientRect().left;
        let width = getElementDimensions(itemContainer).width;
        let centerPosition = left + (width / 2);
        return centerPosition;
    }
    renderUser(entry) {
        let avatar;
        let avatarItem = {
            label: 'user',
            name: 'profile',
            icon: entry.user.imageData,
            iconSelected: entry.user.imageData,
            openPreview: true,
            href: '/menu/profile'
        };
        return (entry ? (h("div", { class: { 'item-container': true, 'selected-profile': this.isHighlightedPage(avatarItem) } },
            h("div", { class: "avatar-container" },
                h("yoo-avatar", { ref: el => avatar = el, class: "msmall web-menu", user: entry.user, onClick: () => this.onItemClicked(avatarItem, avatar) }))))
            : null);
    }
    renderLogo(entry) {
        return (h("div", { class: "menu-logo" },
            h("yoo-img", { type: "back", class: "image", src: cloudinary(entry.logo, 20, 20) })));
    }
    renderItems(entry, renderUser) {
        return (entry &&
            h("div", { class: "menu-items" },
                entry.items && entry.items.length >= 0 && entry.items.map(item => this.renderItem(item)),
                renderUser && this.renderUser(entry)));
    }
    renderItem(item) {
        let itemContainer;
        return (h("div", { class: {
                'item-container': true,
                'selected': this.isHighlightedPage(item)
            }, ref: el => itemContainer = el },
            h("yoo-tooltip", { placement: "bottom", content: item.label, options: {
                    distance: '15'
                } }, item.icon &&
                h("div", { class: "menu-icon", onClick: () => this.onItemClicked(item, itemContainer) },
                    h("yoo-icon", { class: item.icon }),
                    item.notif && h("div", { class: "notification" })))));
    }
    renderLeftContainer() {
        return (h("div", { class: "container left" },
            this.leftEntry && this.leftEntry.logo ? this.renderLogo(this.leftEntry) : null,
            this.renderItems(this.leftEntry, false)));
    }
    renderMiddleContainer() {
        return (h("div", { class: "container middle" },
            h("yoo-form-input", { class: { 'flex search web-menu': true }, "icon-prefix": "yo-search", placeholder: translate('SEARCH'), disabled: true, onClick: () => this.searchClicked.emit() })));
    }
    renderRightContainer() {
        return (h("div", { class: "container right" }, this.renderItems(this.rightEntry, true)));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "menu-container" },
            this.renderLeftContainer(),
            this.renderMiddleContainer(),
            this.renderRightContainer()));
    }
    static get is() { return "yoo-web-menu"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "activePage": {
            "type": String,
            "attr": "active-page",
            "watchCallbacks": ["activePageChange"]
        },
        "activePreviewPage": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "leftEntry": {
            "type": "Any",
            "attr": "left-entry"
        },
        "rightEntry": {
            "type": "Any",
            "attr": "right-entry"
        }
    }; }
    static get events() { return [{
            "name": "itemClicked",
            "method": "itemClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "previewIconMoved",
            "method": "previewIconMoved",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "searchClicked",
            "method": "searchClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:ionModalDidDismiss",
            "method": "onIonModalDidDismiss"
        }]; }
    static get style() { return ".sc-yoo-web-menu-h {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  border-bottom: 1px solid var(--stable-30, #E6E6E6);\n  background-color: var(--light, #FFFFFF); }\n  .sc-yoo-web-menu-h   .container.sc-yoo-web-menu {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 100%;\n    max-width: 250px;\n    color: var(--text-color, #807f83);\n    font-size: var(--font-ll, 20px); }\n    .sc-yoo-web-menu-h   .container.left.sc-yoo-web-menu {\n      -ms-flex-pack: start;\n      justify-content: flex-start;\n      padding-left: var(--padding-10, 0.625rem); }\n    .sc-yoo-web-menu-h   .container.middle.sc-yoo-web-menu {\n      -ms-flex-pack: center;\n      justify-content: center; }\n    .sc-yoo-web-menu-h   .container.right.sc-yoo-web-menu {\n      -ms-flex-pack: end;\n      justify-content: flex-end; }\n  .sc-yoo-web-menu-h   .menu-container.sc-yoo-web-menu {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    width: 80%;\n    min-width: 1070px;\n    height: 48px; }\n    .sc-yoo-web-menu-h   .menu-container.sc-yoo-web-menu   .menu-logo.sc-yoo-web-menu   .image.sc-yoo-web-menu {\n      width: 30px;\n      height: 30px; }\n    .sc-yoo-web-menu-h   .menu-container.sc-yoo-web-menu   .menu-items.sc-yoo-web-menu {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      height: 100%;\n      padding: 0 var(--padding-10, 0.625rem); }\n      .sc-yoo-web-menu-h   .menu-container.sc-yoo-web-menu   .menu-items.sc-yoo-web-menu   .item-container.sc-yoo-web-menu {\n        display: -ms-flexbox;\n        display: flex;\n        position: relative;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -ms-flex-align: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n        padding: 0 var(--padding-10, 0.625rem); }\n        .sc-yoo-web-menu-h   .menu-container.sc-yoo-web-menu   .menu-items.sc-yoo-web-menu   .item-container.sc-yoo-web-menu   .menu-icon.sc-yoo-web-menu {\n          display: -ms-flexbox;\n          display: flex; }\n        .sc-yoo-web-menu-h   .menu-container.sc-yoo-web-menu   .menu-items.sc-yoo-web-menu   .item-container.sc-yoo-web-menu   .notification.sc-yoo-web-menu {\n          position: absolute;\n          top: 0;\n          right: 0;\n          width: 0.3125rem;\n          height: 0.3125rem;\n          margin-right: var(--padding-5, 0.3125rem);\n          border-radius: 0.15625rem;\n          background-color: var(--danger, #ff625f); }\n\n.operations.sc-yoo-web-menu-h   .selected.sc-yoo-web-menu {\n  color: var(--success, #04CC99); }\n\n.operations.sc-yoo-web-menu-h   .selected-profile.sc-yoo-web-menu   .avatar-container.sc-yoo-web-menu {\n  border: 2px solid var(--success, #04CC99);\n  border-radius: 50%; }\n\n.boost.sc-yoo-web-menu-h   .selected.sc-yoo-web-menu {\n  color: var(--danger-light, #F46885); }\n\n.boost.sc-yoo-web-menu-h   .selected-profile.sc-yoo-web-menu   .avatar-container.sc-yoo-web-menu {\n  border: 2px solid var(--danger-light, #F46885);\n  border-radius: 50%; }"; }
}

export { YooWebMenuComponent as YooWebMenu };
