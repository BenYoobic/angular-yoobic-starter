const h = window.DesignSystem.h;

import { df as DEFAULT_BADGES, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';
import './index.js';

class YooUserDetailComponent {
    constructor() {
        this.courses = [];
    }
    onSelectCourse(ev) {
        ev.stopPropagation();
        this.courseSelected.emit(ev.detail);
    }
    onSelectBadge(ev) {
        ev.stopPropagation();
        this.badgeSelected.emit(ev.detail);
    }
    onSeeAllCourses() {
        this.seeAllCourses.emit(true);
    }
    getBadgeEntries() {
        return Object.keys(DEFAULT_BADGES).map(k => {
            let isLocked = this.stats && this.stats.earnedBadges.indexOf(DEFAULT_BADGES[k]) < 0;
            return {
                text: translate(DEFAULT_BADGES[k].toUpperCase()),
                cssClass: './assets/badges/' + (isLocked ? 'locked/' : '') + DEFAULT_BADGES[k] + (isLocked ? '_locked' : '') + '.svg'
            };
        });
    }
    render() {
        return ([
            h("div", { class: {
                    'user-detail': true,
                    'no-padding': this.courses.length <= 0
                } },
                this.stats ?
                    h("div", { class: "points" },
                        h("yoo-icon", { class: "yo-star energized" }),
                        h("span", null,
                            Math.ceil(this.stats.earnedPoints * 10) / 10,
                            "/",
                            this.stats.availablePoints)) : null,
                h("div", { class: "description" }, this.user['description'] || '')),
            this.courses.length > 0 ?
                h("yoo-grid", { items: this.courses, entityType: 'courses', extraClass: 'no-background', displayType: 'card-sticky', direction: 'horizontal', onSelect: (ev) => this.onSelectCourse(ev), isLocal: true, hideHeader: true },
                    h("div", { slot: "header", class: "small-margin-bottom" },
                        h("div", { class: "title" }, translate('COURSES')),
                        h("div", { class: "total-number" }, this.courses.length),
                        h("div", { class: "action", onClick: () => this.onSeeAllCourses() }, translate('SEEALL')))) : null,
            h("yoo-grid", { items: this.getBadgeEntries(), entityType: 'badges', displayType: 'card-cell', onSelect: (ev) => this.onSelectBadge(ev), isLocal: true, hideHeader: true },
                h("div", { slot: "header" },
                    h("div", { class: "title" }, translate('BADGES')),
                    h("div", { class: "total-number" }, this.getBadgeEntries().length))),
            h("div", { class: "dates" },
                h("span", { class: "date-label" }, translate('JOINEDON')),
                h("span", null, pipes.dateFormat.transform(this.user._ect, 'MMM YYYY')))
        ]);
    }
    static get is() { return "yoo-user-detail"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "courses": {
            "type": "Any",
            "attr": "courses"
        },
        "stats": {
            "type": "Any",
            "attr": "stats"
        },
        "user": {
            "type": "Any",
            "attr": "user"
        }
    }; }
    static get events() { return [{
            "name": "courseSelected",
            "method": "courseSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "badgeSelected",
            "method": "badgeSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "seeAllCourses",
            "method": "seeAllCourses",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .user-detail {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  padding-bottom: var(--padding-30, 1.875rem);\n  text-align: center; }\n  :host .user-detail.no-padding {\n    padding-bottom: 0; }\n  :host .user-detail .points {\n    font-size: var(--font-s, 13px); }\n    :host .user-detail .points span {\n      margin-left: 5px; }\n  :host .user-detail .description {\n    padding: var(--padding-10, 0.625rem) var(--padding-10, 0.625rem) 0;\n    font-size: var(--font-s, 13px);\n    font-weight: 300; }\n\n:host yoo-grid div[slot=\"header\"] {\n  display: -ms-flexbox;\n  display: flex;\n  font-size: var(--font-s, 13px); }\n  :host yoo-grid div[slot=\"header\"] .title {\n    display: -ms-flexbox;\n    display: flex; }\n  :host yoo-grid div[slot=\"header\"] .action {\n    margin-left: auto;\n    padding-right: 1rem;\n    color: var(--stable, #adadad);\n    font-weight: 300; }\n  :host yoo-grid div[slot=\"header\"] .total-number {\n    padding-left: 0.2rem;\n    color: var(--stable, #adadad); }\n  :host yoo-grid div[slot=\"header\"].small-margin-bottom {\n    margin-bottom: -0.3125rem; }\n\n:host .dates {\n  padding: var(--padding-30, 1.875rem) 0;\n  color: var(--stable, #adadad);\n  font-size: var(--font-s, 13px);\n  font-weight: 300; }\n  :host .dates span.date-label {\n    margin-right: var(--padding-5, 0.3125rem);\n    color: var(--black, #000000);\n    font-weight: normal; }"; }
}

export { YooUserDetailComponent as YooUserDetail };
