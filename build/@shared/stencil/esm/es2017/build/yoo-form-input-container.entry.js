import { h } from '../design-system.core.js';

import { a6 as debounce, c8 as isBlank, L as querySelectorDeep, b6 as translateMulti, bv as isFieldWithNoValue, aA as FormFieldType, a5 as getAppContext, m as translate, ad as isIonic } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooFormInputContainerComponent {
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
    static get style() { return ":host {\n  display: block; }\n  :host .optional {\n    margin-left: 0.5rem !important;\n    color: var(--stable, #adadad);\n    white-space: nowrap; }\n  :host .description .label,\n  :host .description .optional,\n  :host .top-container .label,\n  :host .top-container .optional {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    font-weight: normal;\n    line-height: 1.5;\n    text-align: left;\n    overflow-wrap: break-word;\n    word-break: break-word; }\n    :host .description .label .required,\n    :host .description .optional .required,\n    :host .top-container .label .required,\n    :host .top-container .optional .required {\n      height: 22px;\n      margin-right: 0.25rem;\n      color: var(--danger, #ff625f);\n      font-size: var(--icon-large, 24px);\n      font-weight: 700;\n      font-variant-caps: normal; }\n    :host .description .label .label-required,\n    :host .description .optional .label-required,\n    :host .top-container .label .label-required,\n    :host .top-container .optional .label-required {\n      margin-left: 0.25rem;\n      color: var(--danger, #ff625f); }\n    :host .description .label.readonly,\n    :host .description .optional.readonly,\n    :host .top-container .label.readonly,\n    :host .top-container .optional.readonly {\n      color: var(--text-color, #807f83);\n      letter-spacing: 0px;\n      text-transform: initial;\n      font-variant-caps: initial; }\n    :host .description .label.invalid,\n    :host .description .optional.invalid,\n    :host .top-container .label.invalid,\n    :host .top-container .optional.invalid {\n      color: var(--danger, #ff625f); }\n    :host .description .label.center,\n    :host .description .optional.center,\n    :host .top-container .label.center,\n    :host .top-container .optional.center {\n      text-align: center; }\n  :host .description .boost-heading:not(.center),\n  :host .top-container .boost-heading:not(.center) {\n    font-size: var(--font-xs, 10px);\n    text-transform: uppercase; }\n    :host .description .boost-heading:not(.center).password-title .field-title-name,\n    :host .top-container .boost-heading:not(.center).password-title .field-title-name {\n      font-size: var(--font-xs, 10px);\n      font-weight: normal;\n      text-transform: uppercase; }\n  :host .description .description,\n  :host .top-container .description {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    font-size: var(--font-m, 15px); }\n    :host .description .description.invalid,\n    :host .top-container .description.invalid {\n      color: var(--danger, #ff625f); }\n    :host .description .description.slotted,\n    :host .top-container .description.slotted {\n      padding-right: var(--padding-5, 0.3125rem); }\n    :host .description .description .required,\n    :host .top-container .description .required {\n      height: 22px;\n      height: var(--icon-large, 24px);\n      margin-right: 0.25rem;\n      color: var(--danger, #ff625f);\n      font-size: var(--icon-large, 24px);\n      font-weight: 700;\n      font-variant-caps: normal; }\n    :host .description .description.within-chat,\n    :host .top-container .description.within-chat {\n      margin-bottom: 0.9375rem; }\n  :host .hint-container {\n    margin-top: 0.25rem;\n    margin-bottom: 0.25rem;\n    color: var(--text-color, #807f83);\n    font-size: var(--font-s, 13px);\n    line-height: 1.33;\n    text-align: left; }\n  :host .footer-container {\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    padding: 0.5rem;\n    padding-bottom: 0;\n    padding-left: 1px;\n    font-size: var(--font-s, 13px); }\n    :host .footer-container .comment-container,\n    :host .footer-container .feed-container,\n    :host .footer-container .newtask {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      min-height: 22px; }\n    :host .footer-container yoo-form-task {\n      padding-left: 0.5rem; }\n    :host .footer-container yoo-icon {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1;\n      flex: 1;\n      margin-right: 0.5rem;\n      font-size: var(--font-ll, 20px); }\n    :host .footer-container yoo-icon.stable {\n      color: var(--stable, #adadad); }\n    :host .footer-container .newtask {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1;\n      flex: 1;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      font-size: var(--font-m, 15px); }\n      :host .footer-container .newtask .icon {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-align: center;\n        align-items: center;\n        margin-right: 0.125rem; }\n        :host .footer-container .newtask .icon .yo-plus {\n          margin-right: 0;\n          font-size: 0.5rem; }\n  :host .content-container {\n    position: relative;\n    padding-top: 0.625rem; }\n    :host .content-container.no-margin {\n      margin-bottom: -1rem; }\n    :host .content-container.readonly {\n      padding: 0; }\n    :host .content-container yoo-form-toggle:not(.line) {\n      top: auto;\n      right: 0;\n      bottom: 0.25rem;\n      left: auto;\n      position: absolute; }\n    :host .content-container yoo-form-checkbox:not(.line) {\n      top: auto;\n      right: 0;\n      bottom: 0.25rem;\n      left: auto;\n      position: absolute; }\n    :host .content-container yoo-form-checkbox[type=\"normal\"] {\n      top: -1.3rem;\n      right: 0;\n      bottom: auto;\n      left: auto;\n      position: absolute; }\n    :host .content-container yoo-form-toggle[type=\"normal\"] {\n      top: -1rem;\n      right: 0;\n      bottom: auto;\n      left: auto;\n      position: absolute; }\n  :host p {\n    -webkit-margin-before: 0;\n    -webkit-margin-after: 0;\n    -webkit-margin-start: 0;\n    -webkit-margin-end: 0;\n    -webkit-padding-start: 0; }\n  :host .instructions {\n    display: block;\n    margin: 0.625rem auto 3.125rem;\n    color: var(--stable, #adadad);\n    font-size: var(--font-l, 17px);\n    letter-spacing: normal; }\n    :host .instructions.under-title {\n      margin: 0 auto 1.875rem; }\n\n:host(.line) {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid var(--stable-30, #E6E6E6); }\n  :host(.line) .top-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n    :host(.line) .top-container .label,\n    :host(.line) .top-container .description {\n      -ms-flex: 1;\n      flex: 1;\n      -ms-flex-item-align: center;\n      align-self: center;\n      margin-left: 0.5rem; }\n    :host(.line) .top-container .label {\n      color: inherit;\n      font-variant-caps: normal; }\n    :host(.line) .top-container .content-container {\n      -ms-flex: 0;\n      flex: 0;\n      padding-top: 0; }\n      :host(.line) .top-container .content-container yoo-form-checkbox {\n        --margin-top-container: -0.5rem; }\n      :host(.line) .top-container .content-container.full-width {\n        -ms-flex: 1;\n        flex: 1; }\n      :host(.line) .top-container .content-container.no-margin {\n        margin-bottom: -1rem; }\n    :host(.line) .top-container slot {\n      -ms-flex: 1;\n      flex: 1; }\n\n:host(.no-border) {\n  padding-bottom: 0;\n  border-bottom: none; }\n\n:host(.line.reversed) .top-container {\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse; }\n\n:host(.line.noborder) {\n  border-bottom: none; }\n\n:host(.autocomplete) {\n  position: relative;\n  z-index: 20004; }\n\n:host(.readonly) {\n  padding: 1rem;\n  padding-bottom: 0;\n  border: none; }\n  :host(.readonly) .top-container.column {\n    -ms-flex-direction: column;\n    flex-direction: column; }\n    :host(.readonly) .top-container.column .description {\n      -ms-flex-item-align: start;\n      align-self: flex-start;\n      margin-bottom: var(--padding-15, 0.9375rem);\n      margin-left: 0;\n      color: var(--text-color, #807f83); }\n\n:host(.form-readonly) {\n  padding: 1rem 0rem;\n  border-bottom: 1px solid var(--stable-30, #E6E6E6); }\n\n:host(.form-readonly.no-border) {\n  padding-bottom: 0;\n  border-bottom: none; }\n\n:host(.login-screen) .top-container .label span {\n  color: var(--text-color-to-white, #807f83); }\n\n:host(:not(.boost)) .description html,\n:host(:not(.boost)) .description body,\n:host(:not(.boost)) .description div,\n:host(:not(.boost)) .description span,\n:host(:not(.boost)) .description applet,\n:host(:not(.boost)) .description object,\n:host(:not(.boost)) .description iframe,\n:host(:not(.boost)) .description h1,\n:host(:not(.boost)) .description h2,\n:host(:not(.boost)) .description h3,\n:host(:not(.boost)) .description h4,\n:host(:not(.boost)) .description h5,\n:host(:not(.boost)) .description h6,\n:host(:not(.boost)) .description p,\n:host(:not(.boost)) .description blockquote,\n:host(:not(.boost)) .description pre,\n:host(:not(.boost)) .description a,\n:host(:not(.boost)) .description abbr,\n:host(:not(.boost)) .description acronym,\n:host(:not(.boost)) .description address,\n:host(:not(.boost)) .description big,\n:host(:not(.boost)) .description cite,\n:host(:not(.boost)) .description code,\n:host(:not(.boost)) .description del,\n:host(:not(.boost)) .description dfn,\n:host(:not(.boost)) .description em,\n:host(:not(.boost)) .description font,\n:host(:not(.boost)) .description img,\n:host(:not(.boost)) .description ins,\n:host(:not(.boost)) .description kbd,\n:host(:not(.boost)) .description q,\n:host(:not(.boost)) .description s,\n:host(:not(.boost)) .description samp,\n:host(:not(.boost)) .description small,\n:host(:not(.boost)) .description strike,\n:host(:not(.boost)) .description strong,\n:host(:not(.boost)) .description sub,\n:host(:not(.boost)) .description sup,\n:host(:not(.boost)) .description tt,\n:host(:not(.boost)) .description var,\n:host(:not(.boost)) .description dl,\n:host(:not(.boost)) .description dt,\n:host(:not(.boost)) .description dd,\n:host(:not(.boost)) .description ol,\n:host(:not(.boost)) .description ul,\n:host(:not(.boost)) .description li,\n:host(:not(.boost)) .description fieldset,\n:host(:not(.boost)) .description form,\n:host(:not(.boost)) .description label,\n:host(:not(.boost)) .description legend,\n:host(:not(.boost)) .description table,\n:host(:not(.boost)) .description caption,\n:host(:not(.boost)) .description tbody,\n:host(:not(.boost)) .description tfoot,\n:host(:not(.boost)) .description thead,\n:host(:not(.boost)) .description tr,\n:host(:not(.boost)) .description th,\n:host(:not(.boost)) .description td {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-weight: inherit;\n  font-style: inherit;\n  font-size: 100%;\n  font-family: inherit;\n  vertical-align: baseline;\n  -webkit-margin-before: 0;\n  -webkit-margin-after: 0;\n  -webkit-margin-start: 0;\n  -webkit-margin-end: 0; }\n\n:host(.lesson) {\n  --font-size-title-name: 27px;\n  --font-weight-title-name: 600;\n  --text-tranform-title-name: none;\n  --field-title-color: black; }\n  :host(.lesson) .top-container .description.choice {\n    font-size: var(--font-lx, 27px);\n    font-weight: 600; }\n  :host(.lesson) .title.within-chat,\n  :host(.lesson) .field-title-name {\n    display: contents;\n    margin: 0 auto;\n    color: var(--field-title-color);\n    font-size: var(--font-size-title-name);\n    font-weight: var(--font-weight-title-name);\n    text-transform: var(--text-tranform-title-name); }\n\n:host(.accent) .hint-container {\n  color: var(--accent-20, #d2f0ff); }\n\n:host(.accent) .description {\n  color: var(--accent, #1FB6FF); }\n\n:host(.dark) .hint-container {\n  color: var(--stable-30, #E6E6E6); }\n\n:host(.dark) .description {\n  color: var(--dark, #2b3648); }\n\n:host(.danger) .hint-container {\n  color: var(--danger-20, #ffe0df); }\n\n:host(.danger) .description {\n  color: var(--danger, #ff625f); }\n\n:host(.success) .hint-container {\n  color: var(--success-20, #c4feef); }\n\n:host(.success) .description {\n  color: var(--success, #04CC99); }\n\n:host(.warning) .hint-container {\n  color: var(--warning-20, #ffe0cc); }\n\n:host(.warning) .description {\n  color: var(--warning, #ff6402); }\n\n:host(.info) .hint-container {\n  color: var(--info-20, #fedaec); }\n\n:host(.info) .description {\n  color: var(--info, #fc459e); }\n\n:host(.stable) .hint-container {\n  color: var(--stable, #adadad); }\n\n:host(.stable) .description {\n  color: var(--stable, #adadad); }"; }
}

export { YooFormInputContainerComponent as YooFormInputContainer };
