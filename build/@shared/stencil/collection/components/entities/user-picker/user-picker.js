export class YooUserPickerComponent {
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
    static get style() { return "/**style-placeholder:yoo-user-picker:**/"; }
}
