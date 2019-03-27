const h = window.DesignSystem.h;

import { a6 as debounce, ay as showAlert, m as translate, L as querySelectorDeep, ae as isNullOrUndefined } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import { b as pipes } from './chunk-262e5ad4.js';

class YooFormTodoSingleComponent {
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
    static get style() { return ":host .outer-container .todo-container {\n  margin-bottom: 1.5625rem; }\n  :host .outer-container .todo-container .content {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    margin: 0.6875rem 0 0.5rem 0; }\n    :host .outer-container .todo-container .content .content-left {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -ms-flex-align: center;\n      align-items: center; }\n      :host .outer-container .todo-container .content .content-left yoo-icon {\n        margin-top: 0.2rem;\n        margin-right: var(--padding-10, 0.625rem);\n        font-size: var(--font-ll, 20px); }\n        :host .outer-container .todo-container .content .content-left yoo-icon.stable-alt {\n          color: var(--text-color, #807f83); }\n      :host .outer-container .todo-container .content .content-left yoo-form-checkbox {\n        margin-right: var(--padding-10, 0.625rem); }\n      :host .outer-container .todo-container .content .content-left .break-line {\n        text-decoration: line-through; }\n    :host .outer-container .todo-container .content .content-right {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center; }\n      :host .outer-container .todo-container .content .content-right .date {\n        color: var(--text-color, #807f83);\n        font-size: 13px;\n        font-weight: 300; }\n  :host .outer-container .todo-container .comments {\n    margin-bottom: var(--padding-15, 0.9375rem);\n    color: var(--text-color, #807f83);\n    font-size: 14px;\n    font-weight: 300; }\n  :host .outer-container .todo-container .photo-container {\n    margin-bottom: 0.875rem; }\n  :host .outer-container .todo-container .comment-container {\n    margin-top: 0.875rem; }\n    :host .outer-container .todo-container .comment-container .yo-comment {\n      font-size: 1.25rem; }\n  :host .outer-container .todo-container .textarea-container {\n    margin-top: var(--padding-10, 0.625rem); }\n  :host .outer-container .todo-container .border {\n    width: 100%;\n    height: 0;\n    border-top: 1px solid var(--stable-30, #E6E6E6);\n    margin-bottom: var(--padding-10, 0.625rem); }\n  :host .outer-container .todo-container .menu {\n    list-style: none outside none;\n    background: none repeat scroll 0 0 transparent;\n    border: 0 none;\n    font-size: 100%;\n    margin: 0;\n    outline: 0 none;\n    padding: 0;\n    vertical-align: baseline;\n    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n    margin: 0.5rem;\n    padding: 0;\n    list-style: none; }\n    :host .outer-container .todo-container .menu .menu-item {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-direction: row;\n      flex-direction: row; }\n      :host .outer-container .todo-container .menu .menu-item .menu-left {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        -ms-flex-align: center;\n        align-items: center; }\n        :host .outer-container .todo-container .menu .menu-item .menu-left .menu-icon {\n          height: 1.875rem;\n          width: 1.875rem; }\n          :host .outer-container .todo-container .menu .menu-item .menu-left .menu-icon yoo-icon {\n            height: 1.1875rem;\n            width: 1.1875rem;\n            font-size: var(--font-l, 17px);\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-pack: center;\n            justify-content: center;\n            background-color: var(--light, #FFFFFF);\n            border: solid 0.03125rem #d0d0d0;\n            border-radius: 50%;\n            padding: 0.34375rem; }\n        :host .outer-container .todo-container .menu .menu-item .menu-left .border {\n          width: 1px;\n          height: 100%;\n          background-color: #d0d0d0; }\n      :host .outer-container .todo-container .menu .menu-item .menu-right {\n        margin-left: 0.625rem;\n        width: 100%;\n        overflow: hidden; }\n        :host .outer-container .todo-container .menu .menu-item .menu-right .menu-title {\n          font-weight: 600;\n          line-height: 1.125rem;\n          margin-top: 0.375rem; }\n        :host .outer-container .todo-container .menu .menu-item .menu-right .menu-content {\n          margin-top: 0.25rem;\n          margin-bottom: 1.25rem; }\n    :host .outer-container .todo-container .menu .menu-item .menu-right .menu-title {\n      margin-bottom: 0.625rem; }\n    :host .outer-container .todo-container .menu .menu-item .menu-right .menu-content span {\n      margin-right: 1.25rem; }\n    :host .outer-container .todo-container .menu .menu-item .menu-right .menu-content yoo-avatar {\n      margin-right: 0.3125rem; }"; }
}

export { YooFormTodoSingleComponent as YooFormTodoSingle };
