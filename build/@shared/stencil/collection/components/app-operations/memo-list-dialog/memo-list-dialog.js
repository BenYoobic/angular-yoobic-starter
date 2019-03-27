import { closeModal, translate, pipes, showActionSheet, showAlert, getSession, isDateBefore } from '../../../index'; //'../../../../stencil';
export class YooMemoListDialogComponent {
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
    static get style() { return "/**style-placeholder:yoo-memo-list-dialog:**/"; }
}
