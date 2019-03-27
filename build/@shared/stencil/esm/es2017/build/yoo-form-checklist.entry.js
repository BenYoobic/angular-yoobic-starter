import { h } from '../design-system.core.js';

import { aN as setValidator, aA as FormFieldType, L as querySelectorDeep, aQ as setValueAndValidateInput, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooFormChecklistComponent {
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
    static get style() { return ":host .outer-container,\n:host .readonly {\n  text-align: left; }\n  :host .outer-container .title,\n  :host .readonly .title {\n    margin-top: 0.5rem;\n    margin-bottom: 0.625rem;\n    font-size: var(--font-m, 15px); }\n    :host .outer-container .title:first-child,\n    :host .readonly .title:first-child {\n      margin-top: 0; }\n  :host .outer-container yoo-form-input,\n  :host .readonly yoo-form-input {\n    margin-bottom: 0.5rem; }\n  :host .outer-container .flex,\n  :host .readonly .flex {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex: 1;\n    flex: 1; }\n  :host .outer-container .previous,\n  :host .outer-container .task,\n  :host .readonly .previous,\n  :host .readonly .task {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    margin-bottom: 0.25rem;\n    padding: 0.6rem 0;\n    border-bottom: 1px solid var(--stable-30, #E6E6E6);\n    font-size: var(--font-m, 15px);\n    font-weight: 400;\n    line-height: 17px; }\n    :host .outer-container .previous yoo-icon,\n    :host .outer-container .task yoo-icon,\n    :host .readonly .previous yoo-icon,\n    :host .readonly .task yoo-icon {\n      color: var(--dark, #2b3648);\n      font-size: var(--icon-m, 20px);\n      padding: 0 0.2rem;\n      opacity: 0.3; }\n      :host .outer-container .previous yoo-icon .yo-down,\n      :host .outer-container .previous yoo-icon .yo-up,\n      :host .outer-container .task yoo-icon .yo-down,\n      :host .outer-container .task yoo-icon .yo-up,\n      :host .readonly .previous yoo-icon .yo-down,\n      :host .readonly .previous yoo-icon .yo-up,\n      :host .readonly .task yoo-icon .yo-down,\n      :host .readonly .task yoo-icon .yo-up {\n        margin: 0 0 0 -0.8rem;\n        font-size: var(--font-xs, 10px); }\n      :host .outer-container .previous yoo-icon .yo-cross,\n      :host .outer-container .task yoo-icon .yo-cross,\n      :host .readonly .previous yoo-icon .yo-cross,\n      :host .readonly .task yoo-icon .yo-cross {\n        margin: 0 0 0 -0.8rem; }\n    :host .outer-container .previous yoo-icon.yo-repeat,\n    :host .outer-container .task yoo-icon.yo-repeat,\n    :host .readonly .previous yoo-icon.yo-repeat,\n    :host .readonly .task yoo-icon.yo-repeat {\n      font-size: 1.5rem;\n      opacity: 1; }\n    :host .outer-container .previous .text,\n    :host .outer-container .task .text,\n    :host .readonly .previous .text,\n    :host .readonly .task .text {\n      padding-left: 0.2rem; }\n    :host .outer-container .previous.first,\n    :host .outer-container .task.first,\n    :host .readonly .previous.first,\n    :host .readonly .task.first {\n      padding-top: var(--padding-10, 0.625rem); }\n    :host .outer-container .previous.validated yoo-icon.yo-check,\n    :host .outer-container .task.validated yoo-icon.yo-check,\n    :host .readonly .previous.validated yoo-icon.yo-check,\n    :host .readonly .task.validated yoo-icon.yo-check {\n      color: var(--success, #04CC99);\n      opacity: 1; }\n    :host .outer-container .previous.rejected yoo-icon.yo-cross,\n    :host .outer-container .task.rejected yoo-icon.yo-cross,\n    :host .readonly .previous.rejected yoo-icon.yo-cross,\n    :host .readonly .task.rejected yoo-icon.yo-cross {\n      color: var(--danger, #ff625f);\n      opacity: 1; }\n\n:host .readonly {\n  padding: 0.5rem;\n  padding-left: 0;\n  padding-bottom: 0; }\n  :host .readonly .task,\n  :host .readonly .previous {\n    border-bottom: none; }\n\n:host(.history) .outer-container .title,\n:host(.history) .readonly .title {\n  margin-top: 0rem;\n  margin-bottom: 0rem;\n  font-size: inherit; }\n\n:host(.history) .outer-container .previous,\n:host(.history) .outer-container .task,\n:host(.history) .readonly .previous,\n:host(.history) .readonly .task {\n  margin-bottom: 0;\n  font-size: inherit;\n  font-weight: inherit;\n  line-height: inherit; }"; }
}

export { YooFormChecklistComponent as YooFormChecklist };
