import { setValidator, setValueAndValidateInput, taskStyle, pipes, translate, showModal, findParent, showAlert } from '../../../utils';
export class YooFormTodoComponent {
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
    static get style() { return "/**style-placeholder:yoo-form-todo:**/"; }
}
