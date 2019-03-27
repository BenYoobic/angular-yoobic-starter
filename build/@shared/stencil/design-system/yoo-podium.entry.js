const h = window.DesignSystem.h;

import { b_ as isTablet, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import './index.js';

class YooPodiumComponent {
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
    static get style() { return ":host {\n  --container-position: initial;\n  --container-display: initial;\n  --container-top: initial; }\n  :host .outer-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%; }\n    :host .outer-container .users-ranked-container {\n      display: var(--container-display);\n      position: var(--container-position);\n      -ms-flex-pack: distribute;\n      justify-content: space-around;\n      padding-top: 6.5vh; }\n      :host .outer-container .users-ranked-container .user-container {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        height: 100%;\n        text-align: center; }\n        :host .outer-container .users-ranked-container .user-container .username {\n          display: inherit;\n          width: 5.75rem;\n          margin: 0 auto;\n          font-size: var(--font-s, 13px);\n          text-overflow: ellipsis;\n          white-space: nowrap;\n          overflow: hidden; }\n        :host .outer-container .users-ranked-container .user-container .points {\n          color: var(--always-light, #FFFFFF); }\n        :host .outer-container .users-ranked-container .user-container.first .points {\n          margin-top: 4.25rem;\n          margin-left: 0.5rem; }\n        :host .outer-container .users-ranked-container .user-container.second div {\n          padding-top: 50%; }\n        :host .outer-container .users-ranked-container .user-container.second .points {\n          margin-top: 1rem;\n          margin-left: 0.25rem; }\n        :host .outer-container .users-ranked-container .user-container.third div {\n          padding-top: 85%; }\n        :host .outer-container .users-ranked-container .user-container.third .points {\n          margin-top: -0.25rem;\n          margin-right: 0.75rem; }\n\n\@media only screen and (-webkit-max-device-pixel-ratio: 1) {\n  .users-ranked-container {\n    padding-top: 11.75vh !important; } }\n\n\@media only screen and (-webkit-min-device-pixel-ratio: 1.1) and (-webkit-max-device-pixel-ratio: 1.9) {\n  .users-ranked-container {\n    padding-top: 5.5vh !important; }\n  .first .points {\n    margin-top: 4.25rem !important;\n    margin-left: 0.5rem !important; }\n  .second .points {\n    margin-top: 1.5rem !important;\n    margin-left: -0.25rem !important; }\n  .third .points {\n    margin-top: -0.5rem !important;\n    margin-right: 1rem !important; } }\n\n\@media only screen and (-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9) and (max-width: 320px) {\n  .users-ranked-container {\n    padding-top: 5.5vh !important; }\n  .first .points {\n    margin-top: 4rem !important;\n    margin-left: 0.25rem !important; }\n  .second .points {\n    margin-top: 0.25rem !important;\n    margin-left: 1rem !important; }\n  .third .points {\n    margin-top: -1.75rem !important;\n    margin-right: 1.75rem !important; } }\n\n\@media only screen and (-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9) and (min-width: 321px) and (max-width: 375px) {\n  .users-ranked-container {\n    padding-top: 7vh !important; }\n  .first .points {\n    margin-top: 3.25rem !important;\n    margin-left: 0.25rem !important; }\n  .second .points {\n    margin-top: 1.5rem !important;\n    margin-left: 0.25rem !important; }\n  .third .points {\n    margin-top: -0.5rem !important;\n    margin-right: 1rem !important; } }\n\n\@media only screen and (-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.4) and (min-width: 376px) and (max-width: 999px) {\n  .users-ranked-container {\n    padding-top: 11vh !important; } }\n\n\@media only screen and (-webkit-min-device-pixel-ratio: 2.5) and (-webkit-max-device-pixel-ratio: 2.9) and (min-width: 376px) and (max-width: 999px) {\n  .users-ranked-container {\n    padding-top: 8vh !important; } }\n\n\@media only screen and (-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9) and (min-width: 1000px) {\n  .users-ranked-container {\n    padding-top: 9.5vh !important; }\n  .first .points {\n    margin-top: 3.25rem !important;\n    margin-left: 0.25rem !important; }\n  .second .points {\n    margin-top: 0.5rem !important;\n    margin-left: 1.5rem !important; }\n  .third .points {\n    margin-top: -1rem !important;\n    margin-right: 2.25rem !important; } }\n\n\@media only screen and (-webkit-min-device-pixel-ratio: 3) and (-webkit-max-device-pixel-ratio: 3.4) {\n  .users-ranked-container {\n    padding-top: 4.5vh !important; }\n  .first .points {\n    margin-top: 3.75rem !important;\n    margin-left: 0.25rem !important; }\n  .second .points {\n    margin-top: 1.5rem !important;\n    margin-left: 0.5rem !important; }\n  .third .points {\n    margin-top: -0.5rem !important;\n    margin-right: 1.25rem !important; } }\n\n\@media only screen and (-webkit-min-device-pixel-ratio: 3.5) and (max-width: 411px) {\n  .users-ranked-container {\n    padding-top: 5.5vh !important; } }\n\n\@media only screen and (-webkit-min-device-pixel-ratio: 3.5) and (min-width: 412px) {\n  .users-ranked-container {\n    padding-top: 3.5vh !important; }\n  .first .points {\n    margin-top: 3.75rem !important;\n    margin-left: 0.25rem !important; }\n  .second .points {\n    margin-top: 1.75rem !important;\n    margin-left: 0 !important; }\n  .third .points {\n    margin-top: 1rem !important;\n    margin-right: 1rem !important; } }\n\n\@media only screen and (min-width: 750px) and (max-width: 1000px) {\n  .users-ranked-container {\n    padding-top: 6.5vh !important; }\n  .first .points {\n    margin-top: 4rem !important;\n    margin-left: 0.25rem !important; }\n  .second .points {\n    margin-top: 2.25rem !important;\n    margin-left: 0 !important; }\n  .third .points {\n    margin-top: 1.75rem !important;\n    margin-right: 1.25rem !important; } }\n\n\@media only screen and (min-width: 1001px) {\n  .users-ranked-container {\n    padding-top: 4.5vh !important; }\n  .first .points {\n    margin-top: 5.75rem !important;\n    margin-left: 0.5rem !important; }\n  .second div {\n    padding-top: 75%; }\n  .second .points {\n    margin-top: 5rem !important;\n    margin-left: 0.25rem !important; }\n  .third div {\n    padding-top: 125%; }\n  .third .points {\n    margin-top: 5.25rem !important;\n    margin-right: 1.5rem !important; } }"; }
}

export { YooPodiumComponent as YooPodium };
