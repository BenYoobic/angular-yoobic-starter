const h = window.DesignSystem.h;

import { x as getSession, a_ as showModal, W as isWeb, m as translate, ay as showAlert, am as isDateBefore, Q as closeModal, ba as showActionSheet } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';
import './index.js';

const MAX_AVATAR_DISPLAY = 3;
const CLOSED_STATE = 'closed';
class YooMemoListComponent {
    constructor() {
        this.collapse = false;
        this.showEllipsis = false;
        this.forceRefresh = true;
        this.MAX_LINE_HEIGHT = 30;
    }
    componentWillLoad() {
        this.collapse = (this.type === CLOSED_STATE);
    }
    isEditable(memo) {
        return memo.creatorRef === getSession().userId;
    }
    onIconClicked() {
        this.collapse = !this.collapse;
    }
    onMemoUpdate(event, memo, spanElement) {
        memo.done = event.detail;
        if (event.detail) {
            this.setSelectedStyles(spanElement, 'selected', memo);
        }
        else {
            this.setSelectedStyles(spanElement, 'unselected', memo);
        }
    }
    setSelectedStyles(element, cssClass, memo) {
        const ANIMATION_DURATION = 1000;
        element.classList.add(cssClass);
        setTimeout(() => {
            this.memoUpdate.emit(memo);
            element.classList.remove(cssClass);
        }, ANIMATION_DURATION);
    }
    onOpenMemoListDialog(memo) {
        this.dialog = document.createElement('yoo-memo-list-dialog');
        this.dialog.memo = memo;
        this.dialog.type = this.type;
        this.memoSelect.emit(memo);
        showModal(this.dialog, { half: false }, isWeb() ? 'fullscreen' : '', 'slideXEnterAnimation', 'slideXLeaveAnimation', true, false, this.modalHost).then(ret => {
            if (ret && ret.data) {
                let action = ret.data.action;
                switch (action) {
                    case 'edit':
                        this.memoEdit.emit(memo);
                        break;
                    case 'delete':
                        this.memoDelete.emit(memo);
                        break;
                    case 'update':
                        this.memoUpdate.emit(memo);
                        break;
                    default:
                        this.usersView.emit(memo.users.map(u => u._id));
                        break;
                }
            }
            this.dialog = null;
        });
    }
    onMemoDelete(memo, itemElement) {
        let title = translate('DELETE');
        let bodyMessage = translate('DELETETODOTASKCONFIRM');
        showAlert(title, [translate('CANCEL'), translate('OK')], null, bodyMessage, translate('DELETETODOTASKCONFIRM')).then(ret => {
            if (ret === true) {
                this.memoDelete.emit(memo);
            }
            else {
                itemElement.style.transform = 'translate3d(0px, 0px, 0px)';
            }
        });
    }
    renderLi(memo) {
        let itemElement;
        return [
            h("yoo-ion-item-sliding", null,
                h("yoo-ion-item", { ref: el => itemElement = el, class: "border", lines: "none" }, this.renderInnerContainer(memo)),
                this.isEditable(memo) ?
                    h("yoo-ion-item-options", null,
                        h("button", { class: "bg-stable", onClick: () => this.memoEdit.emit(memo), "ion-button": true },
                            h("yoo-icon", { class: "yo-pen" }),
                            h("span", { class: "text-action" }, translate('EDIT'))),
                        h("button", { class: "bg-danger", onClick: () => this.onMemoDelete(memo, itemElement), "ion-button": true },
                            h("yoo-icon", { class: "yo-delete" }),
                            h("span", { class: "text-action" }, translate('DELETE')))) : null)
        ];
    }
    renderInnerContainer(memo) {
        const readonly = memo.usersRef.indexOf(getSession().userId) < 0;
        let spanElement;
        return [h("div", { class: "inner-container" },
                h("div", { class: "item-container" },
                    h("div", { class: {
                            'checkbox-container': true,
                            'disabled': readonly
                        } },
                        h("yoo-form-checkbox", { value: this.type === CLOSED_STATE ? true : null, readonly: readonly, onInputChanged: event => (!readonly ? this.onMemoUpdate(event, memo, spanElement) : null) })),
                    h("div", { class: "center-container", onClick: () => this.onOpenMemoListDialog(memo) },
                        h("span", { ref: el => (spanElement = el), class: 'menu-item-title ' + this.type + (readonly ? ' readonly' : '') }, memo.title)),
                    h("div", { class: "right-container", onClick: () => this.onOpenMemoListDialog(memo) },
                        this.renderAvatarContainer(memo),
                        h("div", { class: "date-box" }, memo.duedate && (h("span", { class: {
                                'menu-item-date': true,
                                danger: this.type !== CLOSED_STATE && isDateBefore(memo.duedate, new Date())
                            } }, pipes.dateFormat.transform(memo.duedate, 'L')))))),
                memo.imageData && h("yoo-img", { type: "back", class: "photo", onClick: () => this.onOpenMemoListDialog(memo), src: memo.imageData }),
                memo.description && h("div", { class: "description-container", onClick: () => this.onOpenMemoListDialog(memo) },
                    h("yoo-text-truncate", { maxLine: 2, content: memo.description })))];
    }
    renderAvatarContainer(memo) {
        return [
            h("div", { class: "avatar-box" },
                h("div", { class: "avatar-container" },
                    h("ul", null,
                        memo.users.map((user, userIndex) => {
                            if (userIndex < MAX_AVATAR_DISPLAY) {
                                return (h("li", null,
                                    h("yoo-avatar", { class: 'xsmall' + (user.imageData ? ' avatar-image' : ''), user: user })));
                            }
                        }),
                        memo.users.length > MAX_AVATAR_DISPLAY ?
                            h("li", null,
                                h("yoo-avatar", { class: "xsmall counter", reversedColor: true, iconText: '+' + String(memo.users.length - MAX_AVATAR_DISPLAY) })) : null)))
        ];
    }
    render() {
        return [
            h("div", { class: "outer-container" },
                h("span", null,
                    this.memos && this.memos.length ?
                        h("div", { class: "title-container", onClick: () => this.onIconClicked() },
                            h("div", { class: "title" }, (this.type === 'open' ? translate('TASKS') : (this.type === CLOSED_STATE ? translate('COMPLETED') : null))),
                            h("yoo-badge", { text: pipes.number.transform(this.memos.length), class: 'round medium ' + (this.type === 'open' ? 'danger' : 'success') }),
                            h("span", { class: "flex" }),
                            h("yoo-icon", { class: this.collapse ? 'yo-down' : 'yo-up' }))
                        : null,
                    !this.collapse && this.memos ?
                        h("yoo-ion-list", null, this.memos.map((memo) => {
                            return this.renderLi(memo);
                        }))
                        : null))
        ];
    }
    static get is() { return "yoo-memo-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "collapse": {
            "state": true
        },
        "forceRefresh": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "memos": {
            "type": "Any",
            "attr": "memos"
        },
        "modalHost": {
            "type": "Any",
            "attr": "modal-host"
        },
        "showEllipsis": {
            "state": true
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get events() { return [{
            "name": "memoUpdate",
            "method": "memoUpdate",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "memoEdit",
            "method": "memoEdit",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "memoSelect",
            "method": "memoSelect",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "memoDelete",
            "method": "memoDelete",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "usersView",
            "method": "usersView",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  padding: 0 1rem; }\n  :host .outer-container .title-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    padding-top: 1rem; }\n    :host .outer-container .title-container .title {\n      color: var(--black, #000000);\n      font-size: var(--font-l, 17px);\n      font-weight: 700; }\n    :host .outer-container .title-container .flex {\n      -ms-flex: 1;\n      flex: 1; }\n    :host .outer-container .title-container yoo-badge {\n      margin-left: 0.5rem; }\n    :host .outer-container .title-container yoo-icon {\n      padding-left: var(--padding-10, 0.625rem);\n      font-size: var(--font-s, 13px);\n      cursor: pointer; }\n      :host .outer-container .title-container yoo-icon.yo-down, :host .outer-container .title-container yoo-icon.yo-up {\n        color: var(--black, #000000);\n        font-weight: 600; }\n  :host .outer-container yoo-ion-list yoo-ion-item-sliding yoo-ion-item-options button {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    margin: 0;\n    padding: 0;\n    border: none; }\n    :host .outer-container yoo-ion-list yoo-ion-item-sliding yoo-ion-item-options button .text-action {\n      padding-top: 0.25rem;\n      font-family: \"Lato\" !important;\n      font-size: var(--font-xs, 10px); }\n    :host .outer-container yoo-ion-list yoo-ion-item-sliding yoo-ion-item-options button yoo-icon {\n      width: 60px;\n      font-size: var(--font-l, 17px); }\n  :host .outer-container .border {\n    border-bottom: 1px solid var(--stable-30, #E6E6E6); }\n  :host .outer-container .checkbox-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    height: 100%;\n    padding-right: 0.5rem; }\n  :host .outer-container .disabled {\n    padding-top: 0.25rem; }\n  :host .outer-container .inner-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    width: 100%;\n    padding-top: 0.75rem;\n    padding-bottom: 0.4rem; }\n    :host .outer-container .inner-container .photo {\n      width: 40px;\n      height: 40px;\n      margin-top: 0.2rem;\n      margin-bottom: 0.5rem;\n      margin-left: 1.9rem;\n      border-radius: 5px; }\n    :host .outer-container .inner-container .description-container {\n      margin-bottom: 0.3rem;\n      padding-left: 1.75rem; }\n      :host .outer-container .inner-container .description-container yoo-text-truncate {\n        --text-color: var(--text-color, #807f83);\n        font-size: var(--font-s, 13px); }\n    :host .outer-container .inner-container .item-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      width: 100%; }\n      :host .outer-container .inner-container .item-container .center-container {\n        -ms-flex-positive: 1;\n        flex-grow: 1;\n        color: var(--black, #000000);\n        font-size: var(--font-m, 15px); }\n        :host .outer-container .inner-container .item-container .center-container .menu-item-title.closed {\n          color: var(--success, #04CC99);\n          text-decoration: line-through; }\n        :host .outer-container .inner-container .item-container .center-container .menu-item-title.open {\n          line-height: 1.2rem; }\n        :host .outer-container .inner-container .item-container .center-container .menu-item-title.readonly {\n          opacity: 0.7; }\n        :host .outer-container .inner-container .item-container .center-container .menu-item-title.selected {\n          -webkit-transition: 0.3s;\n          transition: 0.3s;\n          color: var(--success, #04CC99);\n          text-decoration: line-through; }\n        :host .outer-container .inner-container .item-container .center-container .menu-item-title.unselected {\n          -webkit-transition: 0.3s;\n          transition: 0.3s;\n          color: var(--black, #000000);\n          text-decoration: none; }\n      :host .outer-container .inner-container .item-container .right-container {\n        display: -ms-flexbox;\n        display: flex;\n        padding: 0 0.5rem;\n        font-size: var(--font-s, 13px); }\n        :host .outer-container .inner-container .item-container .right-container .date-box {\n          margin-top: 0.25rem; }\n          :host .outer-container .inner-container .item-container .right-container .date-box .menu-item-date {\n            -ms-flex-item-align: center;\n            align-self: center;\n            margin-left: var(--padding-10, 0.625rem);\n            color: var(--text-color, #807f83);\n            font-size: var(--font-s, 13px); }\n            :host .outer-container .inner-container .item-container .right-container .date-box .menu-item-date.danger {\n              color: var(--danger, #ff625f); }\n        :host .outer-container .inner-container .item-container .right-container .avatar-box {\n          padding-right: 0.4rem; }\n          :host .outer-container .inner-container .item-container .right-container .avatar-box .avatar-container yoo-avatar {\n            height: 24px; }\n          :host .outer-container .inner-container .item-container .right-container .avatar-box .avatar-container ul {\n            display: -ms-flexbox;\n            display: flex;\n            margin: auto;\n            padding: 0;\n            list-style: none; }\n          :host .outer-container .inner-container .item-container .right-container .avatar-box .avatar-container ul li {\n            display: inline-table;\n            margin-right: -0.5rem; }\n\n:host([type=closed]) .outer-container {\n  padding-bottom: 2rem; }"; }
}

class YooMemoListDialogComponent {
    showDeleteAlert(memo) {
        let title = translate('DELETE');
        let bodyMessage = translate('DELETETODOTASKCONFIRM');
        showAlert(title, [translate('CANCEL'), translate('OK')], bodyMessage, translate('DELETETODOTASKCONFIRM')).then(ret => {
            if (ret === true) {
                closeModal({ memo: memo, action: 'delete' });
            }
        });
    }
    onClose() {
        if (this.changed) {
            closeModal({ memo: this.memo, action: 'update' });
        }
        else {
            closeModal(null);
        }
    }
    onCloseActionSheet(memo, action) {
        this.actionSheetDismiss = { memo: memo, action: action };
    }
    isEditable() {
        return this.memo.creatorRef === getSession().userId;
    }
    onViewUsers(memo) {
        closeModal({ memo: memo, action: 'view_users' });
    }
    onShowActionSheet(memo) {
        let buttons = [{
                type: 'edit',
                text: translate('EDIT'),
                handler: () => this.onCloseActionSheet(memo, 'edit')
            }, {
                type: 'delete',
                text: translate('DELETE'),
                handler: () => this.onCloseActionSheet(memo, 'delete')
            }];
        showActionSheet(buttons, 'black').then(() => {
            const ANIMATION_DURATION = 300;
            if (this.actionSheetDismiss) {
                let action = this.actionSheetDismiss.action;
                setTimeout(() => {
                    if (action === 'edit') {
                        closeModal(this.actionSheetDismiss);
                    }
                    else {
                        this.showDeleteAlert(this.actionSheetDismiss.memo);
                    }
                }, ANIMATION_DURATION);
            }
        });
    }
    onMemoToggle(event, memo) {
        let titleElement = this.memoElement;
        if (event.detail) {
            this.setSelectedStyles(titleElement, 'completed');
        }
        else {
            this.setSelectedStyles(titleElement, 'active');
        }
        memo.done = event.detail;
        this.changed = true;
    }
    onExtraDataChanged(ev) {
        this.changed = true;
        this.memo.imageEdit = ev.detail;
    }
    setSelectedStyles(element, cssClass) {
        if (cssClass === 'completed') {
            element.classList.add('completed');
            element.classList.remove('active');
        }
        else {
            element.classList.add('active');
            element.classList.remove('completed');
        }
    }
    renderHeader() {
        return h("yoo-ion-header", { class: "shadow", "no-border": true },
            h("yoo-ion-toolbar", { color: "light" },
                h("yoo-ion-buttons", { slot: "start" },
                    h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onClose() },
                        h("yoo-icon", { slot: "icon-only", class: "yo-left" }))),
                h("yoo-ion-title", null, translate('TASKDETAIL')),
                this.isEditable() ?
                    h("yoo-ion-buttons", { slot: "end" },
                        h("yoo-ion-button", { color: "dark", onClick: () => this.onShowActionSheet(this.memo) },
                            h("yoo-icon", { slot: "icon-only", class: "yo-more" }))) : null));
    }
    renderContent() {
        const readonly = this.memo.usersRef.indexOf(getSession().userId) < 0;
        const allowAnnotate = this.memo.usersRef.indexOf(getSession().userId) >= 0 || this.memo.creatorRef === getSession().userId;
        return h("yoo-ion-content", { scrollEnabled: false, class: "bg-light" },
            h("div", { class: "inner-container" },
                h("div", { class: "left-container" },
                    h("yoo-form-checkbox", { value: this.memo.done, readonly: readonly, onInputChanged: (event) => !readonly ? this.onMemoToggle(event, this.memo) : null })),
                h("div", { class: "right-container" },
                    h("div", { class: 'title' + (this.memo.done ? ' completed' : ' active'), ref: (el) => this.memoElement = el }, this.memo.title),
                    this.memo.description ?
                        h("div", { class: "description" }, this.memo.description) : null,
                    this.memo.duedate ?
                        h("div", { class: { 'date': true, 'danger': this.type !== 'closed' && isDateBefore(this.memo.duedate, new Date()) } },
                            h("yoo-icon", { class: "yo-alarm" }),
                            " ",
                            pipes.dateFormat.transform(this.memo.duedate, 'L'),
                            " ") : null,
                    h("div", { class: "avatar-box" },
                        h("div", { class: "avatar-container" },
                            h("ul", null, this.memo.users.map((user) => {
                                return (h("li", { onClick: () => this.onViewUsers(this.memo) },
                                    h("yoo-avatar", { class: 'xsmall' + (user.imageData ? ' avatar-image' : ''), user: user })));
                            })))))),
            this.memo.imageData ? h("div", { class: "photo" },
                h("yoo-form-capture", { readonly: true, value: this.memo.imageData, allowAnnotate: allowAnnotate, onExtraDataChanged: ev => this.onExtraDataChanged(ev), extraData: this.memo.imageEdit })) : null);
    }
    render() {
        return [
            this.renderHeader(),
            this.renderContent()
        ];
    }
    static get is() { return "yoo-memo-list-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "memo": {
            "type": "Any",
            "attr": "memo"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get events() { return [{
            "name": "memoEdit",
            "method": "memoEdit",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "usersView",
            "method": "usersView",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .inner-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  padding: 1rem 0.5rem;\n  padding-bottom: 0; }\n  :host .inner-container .left-container {\n    padding: 0.25rem 0.5rem; }\n  :host .inner-container .right-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: column;\n    flex-direction: column; }\n    :host .inner-container .right-container .title {\n      padding-top: 0.1rem;\n      font-size: var(--font-l, 17px); }\n    :host .inner-container .right-container .completed {\n      -webkit-transition: 0.3s;\n      transition: 0.3s;\n      color: var(--success, #04CC99);\n      text-decoration: line-through; }\n    :host .inner-container .right-container .active {\n      -webkit-transition: 0.3s;\n      transition: 0.3s;\n      color: var(--black, #000000);\n      text-decoration: none; }\n    :host .inner-container .right-container .description {\n      padding-top: 0.5rem;\n      padding-bottom: 0.5rem;\n      color: var(--text-color, #807f83);\n      font-size: var(--font-s, 13px); }\n    :host .inner-container .right-container .date.danger {\n      color: var(--danger, #ff625f); }\n    :host .inner-container .right-container .avatar-box {\n      padding-top: 0.5rem;\n      padding-right: 0.4rem; }\n      :host .inner-container .right-container .avatar-box .avatar-container yoo-avatar {\n        height: 24px; }\n      :host .inner-container .right-container .avatar-box .avatar-container ul {\n        margin: auto;\n        padding: 0;\n        line-height: 2rem;\n        list-style: none; }\n      :host .inner-container .right-container .avatar-box .avatar-container ul li {\n        display: inline-table;\n        margin-right: 0.25rem; }\n\n:host .photo {\n  margin: 1rem;\n  margin-top: 0; }"; }
}

export { YooMemoListComponent as YooMemoList, YooMemoListDialogComponent as YooMemoListDialog };
