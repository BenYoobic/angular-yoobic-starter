const h = window.DesignSystem.h;

class YooUserPickerComponent {
    constructor() {
        this.usersList = [];
    }
    componentWillLoad() {
        // Pass the currentUser as the first member of the list of users
        this.usersList.unshift(this.currentUser);
        // The current user is selected by default
        this.selectedUser = this.currentUser;
    }
    componentWillUpdate() {
        if (!this.isCurrentUserInList()) {
            this.usersList.unshift(this.currentUser);
        }
    }
    isCurrentUserInList() {
        return this.usersList.indexOf(this.currentUser) >= 0;
    }
    onFilterClicked() {
        this.filterClicked.emit(true);
    }
    onUserSelected(user) {
        this.selectedUser = user;
        this.userSelected.emit(user);
    }
    renderUsersList() {
        return (h("yoo-ion-scroll", { class: "horizontal" },
            h("div", { class: "user-list-container" }, this.usersList.map((user) => {
                return (h("yoo-avatar", { class: {
                        'list-small': true,
                        'selected': this.selectedUser === user
                    }, user: user, onClick: () => this.onUserSelected(user) }));
            }))));
    }
    render() {
        return (h("div", { class: "user-picker-container" },
            h("yoo-button", { onClick: () => this.onFilterClicked(), icon: "yo-filter", class: 'fab no-shadow icon-only' }),
            this.renderUsersList()));
    }
    static get is() { return "yoo-user-picker"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "currentUser": {
            "type": "Any",
            "attr": "current-user"
        },
        "host": {
            "elementRef": true
        },
        "selectedUser": {
            "state": true
        },
        "usersList": {
            "type": "Any",
            "attr": "users-list"
        }
    }; }
    static get events() { return [{
            "name": "userSelected",
            "method": "userSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "filterClicked",
            "method": "filterClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .user-picker-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  margin-left: var(--padding-15, 0.9375rem); }\n  :host .user-picker-container yoo-button {\n    --width-icon-only-container: 2.25rem;\n    --height-icon-only-container: 1.875rem;\n    --color-value: var(--black, #000000);\n    --font-size-icon: var(--font-ll, 20px);\n    --border-radius-container: var(--button-border-radius-15, 0.9375rem);\n    --border-container: 1px solid var(--stable-light, #f1f1f1); }\n  :host .user-picker-container yoo-ion-scroll {\n    position: relative;\n    -ms-flex: 1;\n    flex: 1;\n    width: 100%;\n    height: 2.8125rem;\n    margin-left: var(--padding-5, 0.3125rem);\n    padding: var(--padding-5, 0.3125rem) 0px; }\n    :host .user-picker-container yoo-ion-scroll .user-list-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1;\n      flex: 1;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-align: center;\n      align-items: center;\n      padding: var(--padding-5, 0.3125rem) var(--padding-5, 0.3125rem) var(--padding-5, 0.3125rem) var(--padding-10, 0.625rem); }\n      :host .user-picker-container yoo-ion-scroll .user-list-container yoo-avatar {\n        display: -ms-flexbox;\n        display: flex;\n        margin-right: var(--padding-15, 0.9375rem);\n        border-radius: 50%;\n        -webkit-box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.22);\n        box-shadow: 0 5px 15px 0 rgba(40, 47, 54, 0.22); }\n        :host .user-picker-container yoo-ion-scroll .user-list-container yoo-avatar.selected {\n          --border: 1px solid var(--success, #04CC99);\n          --border-initial: 1px solid var(--success, #04CC99); }"; }
}

export { YooUserPickerComponent as YooUserPicker };
