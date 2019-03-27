import { translate, pipes, querySelectorDeep, debounce, isNullOrUndefined, showAlert } from '../../../utils';
export class YooFormTodoSingleComponent {
    constructor() {
        this.type = 'mission';
        this.onCommentsChange = debounce((ev, index) => {
            this.valuesState[index].userComments = ev.detail;
            this.valuesState = [...this.valuesState];
            this.update.emit(this.valuesState);
        });
    }
    componentWillLoad() {
        this.valuesState = this.values;
        if (this.valuesState) {
            this.valuesState.forEach(task => {
                task.finished = task.finished || { value: null };
            });
        }
        this.showComments = new Array();
        if (this.values) {
            for (let i = 0; i < this.values.length; i++) {
                this.showComments.push(false);
            }
        }
    }
    onIconClick(todo, index, value) {
        let hasRequiredImageNoValue;
        if (todo.isphotorequired) {
            hasRequiredImageNoValue = todo.isphotorequired.value && !todo.imageData;
        }
        let finished = this.valuesState[index].finished;
        if (hasRequiredImageNoValue) {
            showAlert(translate('TASK'), [translate('CANCEL'), translate('CONFIRM')], '', translate('MANDATORYPHOTO'));
            finished.value = null;
            finished.date = null;
        }
        else if (finished.value === value) {
            finished.value = null;
            finished.date = null;
        }
        else {
            finished.value = value;
            finished.date = new Date();
        }
        this.valuesState = [...this.valuesState];
        this.update.emit(this.valuesState);
    }
    onImageChanged(ev, index) {
        ev.stopPropagation();
        this.valuesState[index].imageData = ev.detail;
        this.valuesState = [...this.valuesState];
        this.update.emit(this.valuesState);
    }
    onToggleComments(todo, index) {
        if (!todo.userComments) {
            this.showComments[index] = !this.showComments[index];
            this.showComments = [...this.showComments];
            if (this.showComments[index]) {
                setTimeout(() => {
                    this.onFocusComments(index);
                }, 200);
            }
        }
    }
    onFocusComments(index) {
        let comment = querySelectorDeep(this.host, 'yoo-form-text-area.index' + index);
        if (comment) {
            comment.setFocus();
        }
    }
    renderComments(index) {
        let userComments = this.valuesState[index].userComments;
        return this.showComments[index] || userComments || this.readonly ?
            h("yoo-form-text-area", { onInputChanged: ev => this.onCommentsChange(ev, index), 
                // onInputFocused={() => this.onCommentFocused(index)}
                readonly: this.readonly, value: userComments, class: 'animated fadeIn ' + ' index' + index }) : null;
    }
    renderIconCheck(todo, index) {
        if (this.type === 'mission') {
            return [h("yoo-icon", { class: 'yo-check ' + (todo.finished && todo.finished.value === true ? 'success' : 'stable-alt'), onClick: () => this.onIconClick(todo, index, true) }),
                h("yoo-icon", { class: 'yo-cross ' + (todo.finished && todo.finished.value === false ? 'danger' : 'stable-alt'), onClick: () => this.onIconClick(todo, index, false) })
            ];
        }
        else if (this.type === 'form') {
            return h("yoo-form-checkbox", { value: todo.finished.value, onClick: () => this.onIconClick(todo, index, todo.finished.value) });
        }
    }
    renderContentLeft(todo, index) {
        if (this.readonly) {
            return [
                h("yoo-icon", { class: ' ' + (todo.finished && todo.finished.value === true ? 'yo-check success' : (todo.finished && todo.finished.value === false ? 'yo-cross danger' : 'yo-circle stable-alt')) }),
                todo.text && todo.text.value ?
                    todo.finished && !isNullOrUndefined(todo.finished.value) ?
                        h("span", { class: 'text break-line ' + (todo.finished.value === true ? 'success' : 'danger') }, todo.text.value)
                        : h("span", { class: "text" },
                            todo.text.value,
                            " ",
                            this.type === 'mission' ? translate('INCOMPLETE') : null)
                    : null
            ];
        }
        return [
            this.renderIconCheck(todo, index),
            todo.text && todo.text.value ?
                h("span", { class: "text" }, todo.text.value)
                : null
        ];
    }
    renderLinkedField(todo) {
        if (todo && todo.field && todo.field.name) {
            return h("div", { class: "menu" },
                h("li", { class: "menu-item" },
                    h("div", { class: "menu-left" },
                        h("span", { class: "menu-icon" },
                            h("yoo-icon", { class: "yo-link" })),
                        h("div", { class: "border" })),
                    h("div", { class: "menu-right" },
                        h("div", { class: "menu-title" }, translate('LINKEDTO')),
                        h("div", { class: "menu-content menu-requestor" },
                            h("yoo-form-dynamic", { class: "inline", slides: [{ title: 'GENERAL', items: [todo.field] }], data: { [todo.field.name]: Object.assign({ value: todo.fieldValue }, todo.fieldExtra) }, forceReadonly: true, onFormValidityChanged: (ev) => ev.stopPropagation(), suffix: ".value", animated: false, showRecap: false })))));
        }
    }
    render() {
        return h("div", { class: "outer-container" },
            h("div", { class: "title" }, translate('ACTIONPLAN')),
            this.valuesState ?
                this.valuesState.map((todo, index) => (h("div", { class: "todo-container" },
                    h("div", { class: "previous" }, this.renderLinkedField(todo)),
                    h("div", { class: "content" },
                        h("div", { class: "content-left" }, this.renderContentLeft(todo, index)),
                        h("div", { class: "content-right" }, todo.duedate && todo.duedate.value ?
                            h("div", { class: "date" }, pipes.dateFormat.transform(todo.duedate.value, 'L'))
                            : null)),
                    todo.comments && todo.comments.value ?
                        h("div", { class: "comments", innerHTML: todo.comments.value })
                        : null,
                    todo.hasphoto && todo.hasphoto.value && (!this.readonly || todo.imageData) ?
                        h("div", { class: "photo-container" },
                            h("yoo-form-capture", { value: todo.imageData, type: "photo", required: todo.isphotorequired && todo.isphotorequired.value, allowLibrary: todo.allowLibrary && todo.allowLibrary.value, readonly: this.readonly, onInputChanged: (ev) => this.onImageChanged(ev, index) }))
                        : null,
                    (!this.readonly || this.valuesState[index].userComments) ? h("div", { class: "border" }) : null,
                    !this.readonly ?
                        h("div", { class: "comment-container" },
                            h("span", { onClick: () => this.onToggleComments(todo, index) },
                                h("yoo-icon", { class: "yo-comment stable-alt" })))
                        : null,
                    !this.readonly || this.valuesState[index].userComments ?
                        h("div", { class: "textarea-container" }, this.renderComments(index)) : null)))
                : null);
    }
    static get is() { return "yoo-form-todo-single"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "showComments": {
            "state": true
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "values": {
            "type": "Any",
            "attr": "values"
        },
        "valuesState": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "update",
            "method": "update",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-todo-single:**/"; }
}
