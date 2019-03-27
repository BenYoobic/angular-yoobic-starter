import { setValidator, taskStyle, translate, showModal, showActionSheet, showAlert, pipes, setValueAndValidateInput } from '../../../utils';
import { remove } from 'lodash-es';
export class YooFormTaskComponent {
    constructor() {
        this.validators = [];
    }
    onTaskClicked(ev) {
        this.onAddNewTask();
    }
    setSlides(data) {
        this.slidesTask = data;
    }
    componentWillLoad() {
        setValidator(this);
        this.value = this.value || [];
        this.fetchCustomData.emit();
    }
    onAddNewTask() {
        this.upsertTask({ hasphoto: { value: true } }, -1);
    }
    onEditTask(task, index) {
        this.upsertTask(task, index);
    }
    onRemoveTask(task, index) {
        let message = translate('DELETETODOTASKCONFIRM') + ' "' + (task.text && task.text.value ? ' ' + task.text.value : '') + '"';
        showAlert(translate('DELETE'), [translate('CANCEL'), translate('OK')], null, message).then(ret => {
            if (ret === true) {
                remove(this.value, (t) => t === task);
                this.value = [...this.value];
                setValueAndValidateInput(this.value, this);
            }
        });
    }
    onShowActionSheet(task, index) {
        let buttons = [{
                type: 'edit',
                text: translate('EDIT'),
                handler: () => this.onEditTask(task, index)
            }, {
                type: 'delete',
                text: translate('DELETE'),
                cssClass: 'danger',
                handler: () => this.onRemoveTask(task, index)
            }];
        showActionSheet(buttons);
    }
    upsertTask(task, index) {
        let form = document.createElement('yoo-form-dynamic-dialog');
        form.slides = this.slidesTask;
        form.showTabs = false;
        form.showRecap = false;
        form.data = task;
        form.suffix = '.value';
        form.header = translate('ADDNEWACTION');
        form.onFieldFetchData = (ev) => {
            this.fieldFetchData.emit(ev);
        };
        showModal(form).then(ret => {
            if (ret && ret.data) {
                this.value = this.value || [];
                if (index < 0) {
                    this.value = [...this.value, ret.data];
                }
                else {
                    this.value[index] = ret.data;
                    this.value = [...this.value];
                }
                setValueAndValidateInput(this.value, this);
            }
            form = null;
        });
    }
    renderTasks() {
        return (this.value ? this.value.map((t, i) => {
            let tStyle = taskStyle(t.finished);
            return [
                h("div", { class: "task" },
                    h("div", { class: "task-part" }, (t.text.value ?
                        h("div", { class: tStyle.style + ' description-container' },
                            this.readonly ? null : h("yoo-icon", { class: tStyle.icon }),
                            h("div", { class: "text-container" },
                                h("span", { class: 'text ' + tStyle.breakText }, t.text.value)))
                        : null)),
                    this.isHistory ? null :
                        h("div", { class: "task-part" },
                            t.user && t.user.value ? h("yoo-avatar", { class: "xsmall", user: t.user.value }) : null,
                            t.duedate && t.duedate.value ? h("span", { class: "date" }, pipes.dateFormat.transform(t.duedate.value, 'L')) : null,
                            this.readonly ? null : h("yoo-button", { icon: "yo-more", class: "icon-only link-transparent-dark", onClick: (ev) => this.onShowActionSheet(t, i) }))),
                this.readonly ? null : h("div", { class: "border" })
            ];
        }) : null);
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.value && this.value.length > 0 ? [
            this.hideTitle ? null : h("div", { class: "title" }, translate('ACTIONS')),
            this.renderTasks()
        ] : null);
    }
    renderEditable() {
        return h("div", { class: (this.value && this.value.length) > 0 ? 'outer-container' : 'outer-container outer-container-empty' },
            (this.value && this.value.length > 0) ? h("div", { class: "title" }, translate('ACTIONS')) : null,
            this.renderTasks(),
            this.type === 'todo' || this.type === 'task' ?
                h("div", { class: 'success newtask ' + (this.value && this.value.length > 0 ? '' : ' nomargin'), onClick: ev => this.onAddNewTask() },
                    h("div", { class: "icon" },
                        h("yoo-icon", { class: "yo-plus" })),
                    translate('ADDNEWACTION')) : null);
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-task"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "hideTitle": {
            "type": Boolean,
            "attr": "hide-title"
        },
        "host": {
            "elementRef": true
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "setSlides": {
            "method": true
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "validity": {
            "type": Boolean,
            "attr": "validity",
            "mutable": true
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
        }, {
            "name": "fetchCustomData",
            "method": "fetchCustomData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "fieldFetchData",
            "method": "fieldFetchData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "parent:taskClicked",
            "method": "onTaskClicked"
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-task:**/"; }
}
