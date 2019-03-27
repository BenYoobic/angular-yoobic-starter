import { getAppContext, isTablet } from '../../../index';
export class YooPodiumComponent {
    componentDidLoad() {
        if (this.userRankedContainerEl) {
            let userRankedElWidth = isTablet() ? '50%' : '75%';
            this.userRankedContainerEl.style.width = userRankedElWidth;
        }
    }
    getUserOnPosition(position) {
        if (!this.usersRanked || !this.usersRanked.length) {
            return null;
        }
        return this.usersRanked.find((usersRanked) => usersRanked.rank === position);
    }
    onAvatarClicked(rank) {
        if (rank) {
            this.select.emit(rank);
        }
    }
    renderRichAvatar(userRank) {
        return h("div", null,
            h("yoo-avatar", { class: "xlarge", user: userRank ? userRank.user : null, onClick: () => this.onAvatarClicked(userRank) }),
            h("span", { class: "username" },
                userRank ? userRank.user.firstName : '',
                " ",
                userRank ? userRank.user.lastName : ''),
            h("div", { class: "points" }, userRank ? Math.trunc(userRank.points * 10) / 10 || 0 : ''));
    }
    renderRank(userRank) {
        return (h("div", { class: {
                'user-container': true,
                'first': userRank && (userRank.rank === 1),
                'second': userRank && (userRank.rank === 2),
                'third': userRank && (userRank.rank === 3)
            } }, this.renderRichAvatar(userRank)));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return (h("div", { class: "outer-container" },
            h("div", { ref: el => this.userRankedContainerEl = el, class: "users-ranked-container" }, [2, 1, 3].map(position => this.renderRank(this.getUserOnPosition(position))))));
    }
    static get is() { return "yoo-podium"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "usersRanked": {
            "type": "Any",
            "attr": "users-ranked"
        }
    }; }
    static get events() { return [{
            "name": "select",
            "method": "select",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-podium:**/"; }
}
