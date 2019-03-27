import { FormFieldType } from '../../../interfaces';
import { debounce, isBlank, querySelectorDeep, translateMulti, translate, isFieldWithNoValue, getAppContext, isIonic } from '../../../utils';
export class YooFormInputContainerComponent {
    constructor() {
        this.showComments = false;
        // tslint:disable-next-line:member-ordering
        this.onCommentsChange = debounce((ev) => {
            this.commented.emit(ev.detail);
        });
    }
    componentDidLoad() {
        this.setInlineStyle();
        this.showComments = !isBlank(this.comments);
    }
    componentDidUpdate() {
        this.setInlineStyle();
    }
    setInlineStyle() {
        this.toggleLine = querySelectorDeep(this.host, 'yoo-form-toggle.line');
        this.checkboxLine = querySelectorDeep(this.host, 'yoo-form-checkbox.line');
        this.formLocation = querySelectorDeep(this.host, 'yoo-form-location');
        if ((this.toggleLine || this.checkboxLine) && !this.formLocation) {
            if (this.forceReadonly) {
                this.host.classList.add('line');
            }
            if (this.checkboxLine && !this.field.description) {
                this.host.classList.add('reversed');
                this.checkboxLine.header = (translateMulti((this.field.title || this.field.name || '')));
                this.checkboxLine.required = this.showRequiredStar();
                this.checkboxLine.readonly = this.readonly;
            }
            else if (this.toggleLine && !this.field.description) {
                this.toggleLine.header = (translateMulti((this.field.title || this.field.name || '')));
                this.toggleLine.required = this.showRequiredStar();
                this.toggleLine.readonly = this.readonly;
            }
        }
    }
    onToggleComments() {
        this.showComments = !this.showComments;
        if (this.showComments) {
            setTimeout(() => {
                this.onFocusComments();
            }, 200);
        }
    }
    onFocusComments() {
        let comment = querySelectorDeep(this.host, '.comment-text-area');
        if (comment) {
            comment.setFocus();
        }
    }
    showRequiredStar() {
        return this.required && !this.readonly; //&& (this.field.type !== FormFieldType.photo && this.field.type !== FormFieldType.multiphotos && this.field.type !== FormFieldType.barcode)
    }
    showOptional() {
        return !this.hideOptional && !this.showRequiredStar() && !this.readonly && !isFieldWithNoValue(this.field);
    }
    onCommentFocused() {
        let textArea = querySelectorDeep(this.host, '.comment-text-area');
        this.commentFocused.emit(textArea);
    }
    onAddNewTaskContainer() {
        this.taskClicked.emit();
    }
    showDescription() {
        return (this.field.description && (!this.readonly || this.isCheckboxOrToggle())) && (this.field.type !== 'information') && !this.field.hideLabel;
    }
    isCheckboxOrToggle() {
        return this.field.type === FormFieldType.toggle || this.field.type === FormFieldType.checkbox;
    }
    getComponentDescriptionExtraClass() {
        let extraClass = '';
        switch (this.field.type) {
            case FormFieldType.selectbuttons:
            case FormFieldType.selectbuttonsmulti:
            case FormFieldType.selectimage:
            case FormFieldType.selectmulti:
                extraClass = 'choice';
                break;
            case FormFieldType.selectchat:
                extraClass = 'within-chat';
                break;
        }
        return extraClass;
    }
    renderContainer() {
        const hasDefaultInstruction = getAppContext()['boost'] && (this.field.type === FormFieldType.selectmulti || this.field.type === FormFieldType.select) && !this.readonly;
        return h("div", { class: { 'top-container': true, 'column': this.readonly && this.isCheckboxOrToggle() } },
            this.field.type === FormFieldType.selectchat && !this.readonly ?
                h("div", null, this.field.description && h("span", { class: "title within-chat" }, this.field.title))
                : null,
            this.showDescription() ?
                h("div", { class: 'description' + (this.invalid ? ' invalid ' : ' ') + this.getComponentDescriptionExtraClass() },
                    h("span", { innerHTML: translateMulti(this.field.description) }),
                    this.showOptional() ? h("span", { class: "optional" },
                        "(",
                        translate('OPTIONAL'),
                        ")") : null)
                : null,
            ((!this.field.description) || this.readonly) && (this.field.type !== 'information') && !this.field.hideLabel ?
                ((!this.toggleLine && !this.checkboxLine) ? (this.field.type !== FormFieldType.swipecards || (this.field.type === FormFieldType.swipecards && this.readonly)) ?
                    h("div", { class: 'label ' +
                            (this.field && this.field.type === FormFieldType.image ? ' center ' : '') +
                            (this.readonly ? ' readonly ' : '') +
                            (this.invalid ? ' invalid' : '') +
                            (getAppContext()['boost'] && isIonic() ? ' boost-heading' : '') +
                            (this.field && this.field.type === FormFieldType.password ? ' password-title' : '') },
                        h("span", { class: (this.field && this.field.title ? 'field-title-name ' : ''), innerHTML: translateMulti(this.field.title || this.field.name.toUpperCase()) }),
                        this.showOptional() ? h("span", { class: "optional" },
                            "(",
                            translate('OPTIONAL'),
                            ")") : null) : null : null)
                : null,
            hasDefaultInstruction && h("span", { class: "instructions" }, translate(this.field.type === FormFieldType.selectmulti ? 'SELECTALLAPPLY' : 'SELECTONE')),
            h("div", { class: 'content-container ' + (this.readonly ? 'readonly' : '') + ((this.toggleLine || this.checkboxLine) ? ' full-width' : '') + (this.field.allowTask ? ' no-margin' : '') },
                h("slot", null)));
    }
    renderHint() {
        return this.field.hint ? h("div", { class: "hint-container", innerHTML: this.field.hint }) : null;
    }
    renderFooter() {
        return (this.field.allowComments || this.field.allowTask || this.field.shareToFeed) && !this.readonly ?
            h("div", { class: "footer-container" },
                this.field.allowComments ? h("span", { class: "comment-container", onClick: () => this.onToggleComments() },
                    h("yoo-icon", { class: "yo-comment stable-alt" })) : null,
                this.field.shareToFeed ? h("span", { class: "feed-container" },
                    h("yoo-icon", { class: "yo-feed stable-alt" })) : null,
                this.field.allowTask ?
                    h("span", { class: "success newtask", onClick: ev => this.onAddNewTaskContainer() },
                        h("div", { class: "icon" },
                            h("yoo-icon", { class: "yo-plus" })),
                        translate('ADDNEWACTION')) : null) : null;
    }
    renderComments() {
        return this.showComments || this.readonly && this.comments ?
            h("yoo-form-text-area", { onInputChanged: ev => this.onCommentsChange(ev), onInputFocused: () => this.onCommentFocused(), readonly: this.readonly, value: this.comments, class: {
                    'animated fadeIn comment-text-area': true,
                    'italic': this.readonly
                } }) : null;
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext(), { 'readonly': this.readonly })
        };
    }
    render() {
        return this.field ? [
            this.renderContainer(),
            this.renderHint(),
            this.renderFooter(),
            this.renderComments()
        ] : null;
    }
    static get is() { return "yoo-form-input-container"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "checkboxLine": {
            "state": true
        },
        "comments": {
            "type": String,
            "attr": "comments"
        },
        "field": {
            "type": "Any",
            "attr": "field"
        },
        "forceReadonly": {
            "type": Boolean,
            "attr": "force-readonly"
        },
        "formLocation": {
            "state": true
        },
        "hideOptional": {
            "type": Boolean,
            "attr": "hide-optional"
        },
        "host": {
            "elementRef": true
        },
        "invalid": {
            "type": Boolean,
            "attr": "invalid"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "showComments": {
            "state": true
        },
        "toggleLine": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "commented",
            "method": "commented",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "commentFocused",
            "method": "commentFocused",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "taskClicked",
            "method": "taskClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-form-input-container:**/"; }
}
