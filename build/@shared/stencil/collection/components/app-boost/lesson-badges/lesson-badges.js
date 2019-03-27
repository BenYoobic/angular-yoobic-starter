import { translate } from '../../../index'; //'../../../../stencil';
export class YooLessonBadgesComponent {
    render() {
        return ((this.badges && this.badges.length) ?
            h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: "yo-badge" })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate('BADGES')),
                    h("div", { class: "menu-content" }, this.badges.map((badge) => h("div", { class: "badge" },
                        h("yoo-img", { src: './assets/badges/' + badge + '.svg' }),
                        h("div", { class: "badge-title" }, translate(badge.toUpperCase())))))))
            : null);
    }
    static get is() { return "yoo-lesson-badges"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "badges": {
            "type": "Any",
            "attr": "badges"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-lesson-badges:**/"; }
}
