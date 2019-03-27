import { translate, pipes, getSession, showAlert, showModal, isDateBefore, isWeb } from '../../../index'; //'../../../../stencil';
const MAX_AVATAR_DISPLAY = 3;
const CLOSED_STATE = 'closed';
export class YooMemoListComponent {
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
    static get style() { return "/**style-placeholder:yoo-memo-list:**/"; }
}
