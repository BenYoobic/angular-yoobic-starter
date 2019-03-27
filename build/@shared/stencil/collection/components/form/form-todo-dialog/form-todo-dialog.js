import { closeModal, showModal, showActionSheet, showAlert, querySelectorDeep, pipes, translate, isPresent } from '../../../utils';
import { remove } from 'lodash-es';
export class YooFormTodoDialogComponent {
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
    static get style() { return "/**style-placeholder:yoo-form-todo-dialog:**/"; }
}
