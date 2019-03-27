const h = window.DesignSystem.h;

class YooMissionTodoComponent {
    componentWillLoad() {
        this.missionState = this.mission;
    }
    onUpdateTodo(ev) {
        ev.stopPropagation();
        this.missionState.todo.values = ev.detail;
        this.missionState = Object.assign({}, this.missionState);
        this.update.emit(this.missionState);
    }
    render() {
        return this.missionState.todo && this.missionState.todo.values ?
            h("yoo-form-todo-single", { type: "mission", readonly: this.readonly, values: this.missionState.todo.values, onUpdate: (ev) => this.onUpdateTodo(ev) })
            : null;
    }
    static get is() { return "yoo-mission-todo"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "mission": {
            "type": "Any",
            "attr": "mission"
        },
        "missionState": {
            "state": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        }
    }; }
    static get events() { return [{
            "name": "update",
            "method": "update",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

export { YooMissionTodoComponent as YooMissionTodo };
