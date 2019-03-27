import { translate, pipes, DEFAULT_BADGES } from '../../../index'; //'../../../../stencil';
export class YooUserDetailComponent {
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
    static get style() { return "/**style-placeholder:yoo-user-detail:**/"; }
}
