import { h } from '../design-system.core.js';

import { aN as setValidator, aQ as setValueAndValidateInput, ay as showAlert, m as translate, a7 as findParent, a_ as showModal, bE as taskStyle, L as querySelectorDeep, Q as closeModal, bD as remove, ba as showActionSheet, ck as isPresent } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';

class YooFormTodoComponent {
    constructor() {
        this.validators = [];
    }
    setSlides(data) {
        this.slidesTodo = data.todo;
        this.slidesTodoTask = data.todotask;
    }
    componentWillLoad() {
        setValidator(this);
        this.fetchCustomData.emit();
    }
    onUpdateTodo(ev) {
        ev.stopPropagation();
        this.value.values = ev.detail;
        this.value = Object.assign({}, this.value);
        setValueAndValidateInput(this.value, this);
    }
    onClearTodo(ev) {
        ev.stopPropagation();
        showAlert(translate('DELETEAPCONFIRM'), [translate('CANCEL'), translate('OK')]).then(ret => {
            if (ret) {
                this.value = null;
                setValueAndValidateInput(this.value, this);
            }
        });
    }
    async onOpenModal() {
        if (this.slidesTodo && this.slidesTodo.length > 0) {
            if (this.linked) {
                this.value = this.value || {};
                let formDynamic = findParent(this.host, 'yoo-form-dynamic');
                let previous = await formDynamic.findPreviousValue(this.name);
                this.value.field = previous.field;
                this.value.fieldValue = previous.value;
                this.value.fieldExtra = previous.extra;
            }
            let dialog = document.createElement('yoo-form-todo-dialog');
            dialog.todo = this.value;
            dialog.slidesTodo = this.slidesTodo;
            dialog.slidesTodoTask = this.slidesTodoTask;
            dialog.allPhotosRequired = this.allPhotosRequired;
            dialog.allowLibrary = this.allowLibrary;
            dialog.values = this.values;
            dialog.linked = this.linked;
            dialog.onFieldFetchData = (ev) => {
                this.fieldFetchData.emit(ev);
            };
            showModal(dialog).then(ret => {
                if (ret && ret.data) {
                    setValueAndValidateInput(ret.data, this);
                }
                dialog = null;
            });
        }
    }
    convertToNumber(priority) {
        if (priority && priority.slice) {
            return Number(priority.slice(-1));
        }
        return null;
    }
    renderTasks() {
        return this.value.values.map((t) => {
            let tStyle = taskStyle(t.finished);
            return [h("div", { class: "task" },
                    h("div", { class: "task-part" },
                        (t.text.value ?
                            h("div", { class: tStyle.style },
                                h("yoo-icon", { class: tStyle.icon }),
                                h("span", { class: 'text ' + tStyle.breakText }, t.text.value))
                            : null),
                        (t.duedate && t.duedate.value ?
                            h("div", { class: "subtitle" },
                                h("span", { class: "date-label" },
                                    translate('DUEDATE'),
                                    ":"),
                                h("span", null,
                                    " ",
                                    pipes.dateFormat.transform(t.duedate.value, 'L')))
                            : null)),
                    h("div", { class: "task-part" },
                        (t.comments && t.comments.value ?
                            h("div", { class: "subtitle" },
                                " ",
                                t.comments.value)
                            : null),
                        (t.finished && t.finished.date ?
                            h("div", { class: "subtitle" },
                                h("span", { class: "date-label" },
                                    translate('FINISHEDDATE'),
                                    ":"),
                                h("span", null,
                                    " ",
                                    pipes.dateFormat.transform(t.finished.date, 'L LT')))
                            : null),
                        (t.hasphoto ?
                            h("div", { class: "subtitle photo cursor" })
                            : null),
                        (t.userComments ?
                            h("div", { class: "subtitle" },
                                " ",
                                t.userComments)
                            : null))),
                h("div", { class: "border" })];
        });
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.value && this.value.values && this.value.values.length > 0 ?
            h("yoo-form-todo-single", { type: "form", readonly: this.readonly, values: this.value.values, onUpdate: (ev) => this.onUpdateTodo(ev) }) : null);
    }
    renderEditable() {
        if (this.value && this.value.title) {
            return h("div", { class: 'newtodo nomargin', onClick: ev => this.onOpenModal() },
                h("div", { class: "success margin-right" }, translate('EDIT')),
                h("div", { class: "flex" },
                    " ",
                    ' ' + this.value.title),
                h("div", { class: "icon" },
                    h("yoo-icon", { class: "yo-cross", onClick: ev => this.onClearTodo(ev) })));
        }
        else {
            return h("div", { class: 'success newtodo nomargin', onClick: ev => this.onOpenModal() },
                h("div", { class: "icon" },
                    h("yoo-icon", { class: "yo-plus" })),
                translate('ADDTODO'));
        }
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-todo"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowLibrary": {
            "type": Boolean,
            "attr": "allow-library"
        },
        "allPhotosRequired": {
            "type": Boolean,
            "attr": "all-photos-required"
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "linked": {
            "type": Boolean,
            "attr": "linked"
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
        },
        "values": {
            "type": "Any",
            "attr": "values"
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
    static get style() { return ":host .outer-container yoo-button {\n  --margin-container: auto; }\n\n:host yoo-icon {\n  font-size: var(--font-m, 15px); }\n\n:host .border {\n  width: 100%;\n  height: 0;\n  border-top: 1px solid var(--stable-30, #E6E6E6); }\n\n:host .newtodo {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  margin-top: 0.875rem;\n  font-size: var(--font-m, 15px); }\n  :host .newtodo.nomargin {\n    margin-top: 0; }\n  :host .newtodo .margin-right {\n    margin-right: 0.5rem; }\n  :host .newtodo .success {\n    color: var(--success, #04CC99); }\n  :host .newtodo .icon {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    margin-right: 0.125rem; }\n    :host .newtodo .icon .yo-plus {\n      font-size: 0.5rem; }\n    :host .newtodo .icon .yo-cross {\n      font-size: var(--icon-m, 20px); }\n  :host .newtodo .flex {\n    -ms-flex: 1;\n    flex: 1; }\n\n:host .readonly .todo-container {\n  margin-bottom: 1.5625rem; }\n  :host .readonly .todo-container .content {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    margin: 0.6875rem 0 0.5rem 0; }\n    :host .readonly .todo-container .content .content-left yoo-icon {\n      margin-right: var(--padding-10, 0.625rem); }\n      :host .readonly .todo-container .content .content-left yoo-icon.stable-alt {\n        color: var(--stable-alt, #d0d0d0); }\n    :host .readonly .todo-container .content .content-left .break-line {\n      text-decoration: line-through; }\n    :host .readonly .todo-container .content .content-right {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center; }\n      :host .readonly .todo-container .content .content-right .date {\n        color: var(--stable-alt, #d0d0d0);\n        font-size: 13px;\n        font-weight: 300; }\n  :host .readonly .todo-container .comments {\n    margin-bottom: var(--padding-15, 0.9375rem);\n    color: var(--stable, #adadad);\n    font-size: 14px;\n    font-weight: 300; }\n  :host .readonly .todo-container .photo-container {\n    margin-bottom: 0.875rem; }\n  :host .readonly .todo-container .comment-container {\n    margin-top: 0.875rem; }\n    :host .readonly .todo-container .comment-container .yo-comment {\n      font-size: 1.25rem; }\n  :host .readonly .todo-container .textarea-container {\n    margin-top: var(--padding-10, 0.625rem); }\n  :host .readonly .todo-container .border {\n    width: 100%;\n    height: 0;\n    border-top: 1px solid var(--stable-30, #E6E6E6);\n    margin-bottom: var(--padding-10, 0.625rem); }"; }
}

class YooFormTodoDialogComponent {
    //private formDynamic: HTMLYooFormDynamicElement;
    onInternalFieldFetchData(ev) {
        ev.stopPropagation();
        if (this.onFieldFetchData) {
            this.onFieldFetchData(Object.assign({}, ev.detail, { form: querySelectorDeep(this.host, 'yoo-form-dynamic') }));
        }
    }
    onDataChanged(ev) {
        ev.stopPropagation();
        Object.assign(this.todo, ev.detail);
    }
    onInputChanged(ev) {
        ev.stopPropagation();
        this.currentTask = ev.detail;
    }
    onEnterPressed() {
        this.onAddTask();
    }
    componentWillLoad() {
        this.todo = this.todo || {};
    }
    onValidityChanged(ev) {
        this.validity = ev.detail;
    }
    isValid() {
        return this.validity && this.todo.values && this.todo.values.length > 0;
    }
    onCancel() {
        closeModal(null);
    }
    onSave() {
        if (this.isValid()) {
            closeModal(this.todo);
        }
    }
    onAddTask() {
        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
        if (this.currentTask) {
            this.todo.values = this.todo.values || [];
            this.todo.values.push({
                text: { value: this.currentTask },
                finished: { value: null },
                isphotorequired: { value: this.allPhotosRequired === true },
                hasphoto: { value: true },
                allowLibrary: { value: this.allowLibrary === true }
            });
            this.currentTask = '';
            setTimeout(() => querySelectorDeep(this.host, 'yoo-form-input.task-edit').clear(), 200);
            this.host.forceUpdate();
        }
    }
    onEditTask(task) {
        let form = document.createElement('yoo-form-dynamic-dialog');
        form.slides = this.slidesTodoTask;
        form.showTabs = false;
        form.showRecap = false;
        form.data = task;
        form.suffix = '.value';
        form.title = translate('EDIT');
        showModal(form).then(ret => {
            if (ret && ret.data) {
                task = ret.data;
                this.host.forceUpdate();
            }
            form = null;
        });
    }
    onRemoveTask(task) {
        showAlert(translate('DELETE'), [translate('CANCEL'), translate('OK')], null, translate('DELETEACTIONCONFIRM')).then(ret => {
            if (ret === true) {
                remove(this.todo.values, (t) => t === task);
                this.host.forceUpdate();
            }
        });
    }
    onShowActionSheet(task) {
        let buttons = [{
                type: 'edit',
                text: translate('EDIT'),
                handler: () => this.onEditTask(task)
            }, {
                type: 'delete',
                text: translate('DELETE'),
                cssClass: 'danger',
                handler: () => this.onRemoveTask(task)
            }];
        showActionSheet(buttons);
    }
    onSelect(ev) {
        ev.stopPropagation();
        if (ev.detail && ev.detail.length > 0) {
            let tasks = ev.detail.map(r => ({
                text: { value: r._id },
                finished: { value: null },
                isphotorequired: { value: this.allPhotosRequired === true },
                hasphoto: { value: true },
                allowLibrary: { value: this.allowLibrary === true }
            }));
            this.todo.values = this.todo.values || [];
            this.todo.values = [...this.todo.values, ...tasks];
            setTimeout(() => {
                let autocomplete = querySelectorDeep(this.host, 'yoo-form-autocomplete.predefined');
                if (autocomplete) {
                    autocomplete.clear();
                }
            }, 200);
            this.host.forceUpdate();
        }
    }
    renderLinkedField() {
        if (this.todo && this.todo.field && this.todo.field.name) {
            return h("div", { class: "menu" },
                h("li", { class: "menu-item" },
                    h("div", { class: "menu-left" },
                        h("span", { class: "menu-icon" },
                            h("yoo-icon", { class: "yo-link" })),
                        h("div", { class: "border" })),
                    h("div", { class: "menu-right" },
                        h("div", { class: "menu-title" }, translate('LINKEDTO')),
                        h("div", { class: "menu-content menu-requestor" },
                            h("yoo-form-dynamic", { class: "inline", slides: [{ title: 'GENERAL', items: [this.todo.field] }], data: { [this.todo.field.name]: Object.assign({ value: this.todo.fieldValue }, this.todo.fieldExtra) }, forceReadonly: true, onFormValidityChanged: (ev) => ev.stopPropagation(), suffix: ".value", animated: false, showRecap: false })))));
        }
    }
    renderTasks() {
        return h("div", { slot: "end" },
            h("div", { class: "tasks" },
                h("div", { class: "field-placeholder" },
                    h("yoo-form-input-container", { field: { title: translate('ACTIONS') }, hideOptional: true },
                        h("yoo-form-input", { class: "task-edit", onInputChanged: (event) => this.onInputChanged(event), onValidityChanged: (ev) => ev.stopPropagation(), onEnterPressed: () => this.onEnterPressed() }))),
                this.values && this.values.length > 0 ?
                    h("div", { class: "field-placeholder" },
                        h("yoo-form-input-container", { field: { title: translate('ADDPREDEFINEDTASKS') }, hideOptional: true },
                            h("yoo-form-autocomplete", { class: "predefined", displayType: 'card-list', values: this.values.map(v => ({ _id: v, title: v })), multiple: true, onValidityChanged: (ev) => ev.stopPropagation(), hideSelectionFromInput: true, onInputChanged: (ev) => this.onSelect(ev) })))
                    : null),
            h("div", null, this.todo && this.todo.values ?
                this.todo.values.map((t, i) => [h("div", { class: "task" },
                        h("div", { class: "task-part" },
                            h("span", { class: "text" }, t.text.value)),
                        h("div", { class: "task-part" },
                            t.duedate && t.duedate.value ? h("span", { class: "date" }, pipes.dateFormat.transform(t.duedate.value, 'L')) : null,
                            h("yoo-button", { icon: "yo-more", class: "icon-only link-transparent-dark", onClick: (ev) => this.onShowActionSheet(t) }))),
                    h("div", { class: "border" })]) : null));
    }
    render() {
        return [
            h("yoo-ion-header", { class: "shadow", "no-border": true },
                h("yoo-ion-toolbar", { color: "light" },
                    h("yoo-ion-buttons", { slot: "start" },
                        h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                            h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                    h("yoo-ion-title", null, translate('TODO')),
                    h("yoo-ion-buttons", { slot: "end", onClick: () => this.onSave() },
                        h("yoo-ion-button", { color: "success", class: "button-clear", disabled: !this.isValid() }, translate('SAVE'))))),
            h("yoo-ion-content", { scrollEnabled: false, class: "bg-light" },
                h("yoo-form-dynamic", { 
                    // ref={el => this.formDynamic = el as HTMLYooFormDynamicElement}
                    slides: this.slidesTodo, data: this.todo, showRecap: false, onDataChanged: (ev) => this.onDataChanged(ev), onFormValidityChanged: (ev) => this.onValidityChanged(ev), onFieldFetchData: (ev) => this.onInternalFieldFetchData(ev) },
                    h("div", { slot: "start" }, this.todo && this.todo.field && isPresent(this.todo.fieldValue) ? this.renderLinkedField() : null),
                    h("div", { slot: "end" }, this.renderTasks())))
        ];
    }
    static get is() { return "yoo-form-todo-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "allowLibrary": {
            "type": Boolean,
            "attr": "allow-library"
        },
        "allPhotosRequired": {
            "type": Boolean,
            "attr": "all-photos-required"
        },
        "host": {
            "elementRef": true
        },
        "linked": {
            "type": Boolean,
            "attr": "linked"
        },
        "onFieldFetchData": {
            "type": "Any",
            "attr": "on-field-fetch-data"
        },
        "slidesTodo": {
            "type": "Any",
            "attr": "slides-todo"
        },
        "slidesTodoTask": {
            "type": "Any",
            "attr": "slides-todo-task"
        },
        "todo": {
            "type": "Any",
            "attr": "todo",
            "mutable": true
        },
        "validity": {
            "state": true
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get listeners() { return [{
            "name": "fieldFetchData",
            "method": "onInternalFieldFetchData"
        }, {
            "name": "dataChanged",
            "method": "onDataChanged"
        }, {
            "name": "inputChanged",
            "method": "onInputChanged"
        }, {
            "name": "enterPressed",
            "method": "onEnterPressed"
        }]; }
    static get style() { return ":host .task {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  background: var(--light, #FFFFFF);\n  line-height: 39px; }\n  :host .task .task-part {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n    :host .task .task-part yoo-avatar {\n      --transform-avatar: translateY(5px);\n      margin-right: 0.5rem; }\n    :host .task .task-part .text {\n      font-size: var(--font-l, 17px); }\n    :host .task .task-part .date {\n      margin-right: 0.625rem;\n      color: var(--text-color, #807f83);\n      font-size: var(--font-s, 13px); }\n    :host .task .task-part yoo-button {\n      --width-icon-only-container: 0.25rem;\n      --font-size-icon: 1.125rem;\n      padding-top: 0.6875rem; }\n\n:host .border {\n  width: 100%;\n  height: 0;\n  border-top: 1px solid var(--stable-30, #E6E6E6); }\n\n:host .task .task-part {\n  margin: 0 1rem; }\n  :host .task .task-part yoo-icon {\n    margin-right: 0.5rem;\n    font-size: var(--font-m, 15px); }\n\n:host .tasks {\n  margin-bottom: 0.5rem;\n  padding: 1rem;\n  background: var(--light, #FFFFFF); }\n  :host .tasks .field-placeholder {\n    margin-bottom: 0.625rem; }\n\n:host .menu {\n  list-style: none outside none;\n  background: none repeat scroll 0 0 transparent;\n  border: 0 none;\n  font-size: 100%;\n  margin: 0;\n  outline: 0 none;\n  padding: 0;\n  vertical-align: baseline;\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n  margin: 0.5rem;\n  padding: 0;\n  list-style: none; }\n  :host .menu .menu-item {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n    :host .menu .menu-item .menu-left {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      -ms-flex-align: center;\n      align-items: center; }\n      :host .menu .menu-item .menu-left .menu-icon {\n        height: 1.875rem;\n        width: 1.875rem; }\n        :host .menu .menu-item .menu-left .menu-icon yoo-icon {\n          height: 1.1875rem;\n          width: 1.1875rem;\n          font-size: var(--font-l, 17px);\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-pack: center;\n          justify-content: center;\n          background-color: var(--light, #FFFFFF);\n          border: solid 0.03125rem #d0d0d0;\n          border-radius: 50%;\n          padding: 0.34375rem; }\n      :host .menu .menu-item .menu-left .border {\n        width: 1px;\n        height: 100%;\n        background-color: #d0d0d0; }\n    :host .menu .menu-item .menu-right {\n      margin-left: 0.625rem;\n      width: 100%;\n      overflow: hidden; }\n      :host .menu .menu-item .menu-right .menu-title {\n        font-weight: 600;\n        line-height: 1.125rem;\n        margin-top: 0.375rem; }\n      :host .menu .menu-item .menu-right .menu-content {\n        margin-top: 0.25rem;\n        margin-bottom: 1.25rem; }\n  :host .menu .menu-item .menu-right .menu-title {\n    margin-bottom: 0.625rem; }\n  :host .menu .menu-item .menu-right .menu-content span {\n    margin-right: 1.25rem; }\n  :host .menu .menu-item .menu-right .menu-content yoo-avatar {\n    margin-right: 0.3125rem; }"; }
}

export { YooFormTodoComponent as YooFormTodo, YooFormTodoDialogComponent as YooFormTodoDialog };
