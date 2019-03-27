import { translate } from '../../../index'; //'../../../../stencil';
export class YooLessonHighscoresComponent {
    render() {
        return ((this.ranks && this.ranks.length) ?
            h("li", { class: "menu-item" },
                h("div", { class: "menu-left" },
                    h("span", { class: "menu-icon" },
                        h("yoo-icon", { class: "yo-medal" })),
                    h("div", { class: "border" })),
                h("div", { class: "menu-right" },
                    h("div", { class: "menu-title" }, translate('HIGHSCORES')),
                    h("div", { class: "menu-content" },
                        h("yoo-grid", { items: this.ranks, entityType: 'userranks', displayType: 'card-list' }))))
            : null);
    }
    static get is() { return "yoo-lesson-highscores"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "ranks": {
            "type": "Any",
            "attr": "ranks"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-lesson-highscores:**/"; }
}
