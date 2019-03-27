import { FormFieldType } from '../../../interfaces';
import { setValidator, setValueAndValidateInput, translate, querySelectorDeep } from '../../../utils';
export class YooFormChecklistComponent {
    constructor() {
        this.validators = [];
        this.placeholder = 'ADDNEWACTION';
        this.previousTasks = [];
        this.currentTasks = [];
        this.rows = 1;
    }
    componentWillLoad() {
        setValidator(this, FormFieldType.checklist);
    }
    onValidate(i) {
        if (this.readonly) {
            return;
        }
        this.previousTasks[i].validated = this.previousTasks[i].validated === true ? null : true;
        this.onUpdateValue();
    }
    onReject(i) {
        if (this.readonly) {
            return;
        }
        this.previousTasks[i].validated = this.previousTasks[i].validated === false ? null : false;
        this.onUpdateValue();
    }
    onReport(i) {
        if (this.readonly) {
            return;
        }
        let task = this.previousTasks[i];
        this.currentTasks.push(task.text);
        this.onUpdateValue();
    }
    onNewTaskRemove(i) {
        this.currentTasks.splice(i, 1);
        this.onUpdateValue();
    }
    onInputChanged(ev) {
        ev.stopPropagation();
    }
    onInputBlurred(ev) {
        let task = querySelectorDeep(this.host, 'yoo-form-text-area').value; //ev.target.value;
        if (task) {
            this.currentTasks.push(task);
            querySelectorDeep(this.host, 'yoo-form-text-area').clear();
            this.onUpdateValue();
            this.rows = 1;
        }
    }
    onUpdateValue() {
        let value = {
            previousTasks: this.previousTasks,
            currentTasks: this.currentTasks
        };
        setValueAndValidateInput(value, this);
        this.host.forceUpdate();
    }
    renderPreviousTasks(readonly) {
        if (this.previousTasks && this.previousTasks.length > 0) {
            return [
                h("div", { class: "title" },
                    " ",
                    translate('PREVIOUSACTIONS')),
                h("div", { class: "tasks" }, this.previousTasks.map((task, i) => h("div", { class: 'previous ' + (task.validated ? 'validated' : (task.validated === false ? 'rejected' : '')) + (i === 0 ? ' first' : '') },
                    !readonly || task.validated === true ? h("yoo-icon", { class: "yo-check", onClick: (ev) => this.onValidate(i) }) : null,
                    !readonly || task.validated === false ? h("yoo-icon", { class: "yo-cross", onClick: (ev) => this.onReject(i) }) : null,
                    h("div", { class: "flex text" }, task.text),
                    !readonly ? h("yoo-icon", { class: "yo-repeat", onClick: (ev) => this.onReport(i) }) : null)))
            ];
        }
    }
    renderCurrentTasks(readonly) {
        return [
            !readonly || (this.currentTasks && this.currentTasks.length > 0) ? h("div", { class: "title" },
                " ",
                translate('NEXTACTIONS')) : null,
            !readonly ? this.renderTextArea() : null,
            !readonly || (this.currentTasks && this.currentTasks.length > 0) ? h("div", { class: "tasks" }, this.currentTasks ? this.currentTasks.map((task, i) => h("div", { class: 'task' + (i === 0 ? ' first' : '') },
                h("div", { class: "flex" },
                    " ",
                    task),
                !readonly ? h("yoo-icon", { class: "yo-cross", onClick: (ev) => this.onNewTaskRemove(i) }) : null)) : null) : null
        ];
    }
    renderTextArea() {
        return h("yoo-form-text-area", { resizable: "none", initialRows: this.rows, maxRows: 5, placeholder: translate(this.placeholder), disableEnter: true, validateInput: false, onInputChanged: (ev) => this.onInputChanged(ev), onInputBlurred: (ev) => this.onInputBlurred(ev), onEnterPressed: (ev) => this.onInputBlurred(ev), onTabPressed: (ev) => this.onInputBlurred(ev) });
    }
    renderEditable() {
        return h("div", { class: "outer-container" },
            this.renderPreviousTasks(false),
            this.renderCurrentTasks(false));
    }
    renderReadonly() {
        return h("div", { class: "readonly" },
            this.renderPreviousTasks(true),
            this.renderCurrentTasks(true));
    }
    parseHistoryData() {
        let value = '';
        value = ' ' + translate('NEXTACTIONS');
        this.currentTasks.forEach((item, index) => {
            value += ', ' + item;
        });
        return value;
    }
    renderHistory() {
        let innerText = this.parseHistoryData();
        return h("div", { class: "history-container" },
            h("yoo-text-truncate", { maxLine: 2, content: innerText, hideMoreButton: true }, " "));
    }
    render() {
        if (this.isHistory) {
            return this.renderHistory();
        }
        else {
            return this.readonly ? this.renderReadonly() : this.renderEditable();
        }
    }
    static get is() { return "yoo-form-checklist"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "currentTasks": {
            "type": "Any",
            "attr": "current-tasks"
        },
        "host": {
            "elementRef": true
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "previousTasks": {
            "type": "Any",
            "attr": "previous-tasks"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputBlurred",
            "method": "inputBlurred",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-checklist:**/"; }
}
