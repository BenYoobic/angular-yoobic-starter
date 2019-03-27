import { translate, isIonic, translateMulti, pipes, getMissionStateBadges } from '../../../index'; //'../../../../stencil';
export class YooMissionHeadingComponent {
    componentWillLoad() {
        this.isMobile = isIonic();
    }
    renderMissionDate() {
        return [
            (this.mission && this.mission.duedate ?
                h("div", { class: "mission-date" },
                    translate('DUEDATE'),
                    ": ",
                    pipes.dateFormat.transform(this.mission.duedate, 'L'))
                :
                    this.mission && this.mission.finishedDate && this.mission.type === 'visit' ?
                        h("div", { class: "mission-date" },
                            translate('DATE'),
                            ": ",
                            pipes.dateFormat.transform(this.mission.finishedDate, 'L LT'))
                        :
                            h("div", { class: "mission-date" }, translate('NODUEDATE')))
        ];
    }
    renderTodoDate() {
        return [
            (this.mission && this.mission.todo && this.mission.todo.duedate ?
                h("div", { class: "mission-date-todo" },
                    translate('DUEDATE'),
                    ": ",
                    pipes.dateFormat.transform(this.mission.todo.duedate, 'L'))
                :
                    h("div", { class: "mission-date-todo" }, translate('NODUEDATE'))),
            (this.mission && this.mission.todo && this.mission.todo.reminderdate ?
                h("div", { class: "mission-date-todo" },
                    translate('REMINDER'),
                    ": ",
                    pipes.dateFormat.transform(this.mission.todo.reminderdate, 'L')) : null)
        ];
    }
    render() {
        let badges = getMissionStateBadges(this.mission, true);
        return (h("div", { class: "background-container" },
            h("div", { class: "content-container" },
                h("div", { class: "badge-container" }, badges && badges.map(badge => {
                    return h("yoo-badge", { text: translate(badge.text || ''), class: badge.cssClass, iconLeft: badge.iconLeft });
                })),
                this.mission && [
                    this.mission.title && (h("div", { class: "mission-title" }, translateMulti(this.mission.title))),
                    this.mission.type !== 'todo' ? this.renderMissionDate() : this.renderTodoDate(),
                    this.progress >= 0 && (h("div", { class: {
                            'mission-progress': true,
                            'mission-progress-web': !this.isMobile
                        } },
                        h("yoo-progress-bar-core", { shape: "line", progressValue: this.progress })))
                ])));
    }
    static get is() { return "yoo-mission-heading"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "mission": {
            "type": "Any",
            "attr": "mission"
        },
        "progress": {
            "type": Number,
            "attr": "progress"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-mission-heading:**/"; }
}
