import { h } from '../design-system.core.js';

import { a as createCommonjsModule, b as commonjsGlobal, b5 as unwrapExports, aQ as setValueAndValidateInput } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

var pell_min = createCommonjsModule(function (module, exports) {
!function(t,e){"object"=='object'&&"undefined"!='object'?e(exports):"function"==typeof undefined&&undefined.amd?undefined(["exports"],e):e(t.pell={});}(commonjsGlobal,function(t){"use strict";var e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r]);}return t},c="defaultParagraphSeparator",l="formatBlock",a=function(t,e,n){return t.addEventListener(e,n)},s=function(t,e){return t.appendChild(e)},d=function(t){return document.createElement(t)},n=function(t){return document.queryCommandState(t)},f=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return document.execCommand(t,!1,e)},p={bold:{icon:"<b>B</b>",title:"Bold",state:function(){return n("bold")},result:function(){return f("bold")}},italic:{icon:"<i>I</i>",title:"Italic",state:function(){return n("italic")},result:function(){return f("italic")}},underline:{icon:"<u>U</u>",title:"Underline",state:function(){return n("underline")},result:function(){return f("underline")}},strikethrough:{icon:"<strike>S</strike>",title:"Strike-through",state:function(){return n("strikeThrough")},result:function(){return f("strikeThrough")}},heading1:{icon:"<b>H<sub>1</sub></b>",title:"Heading 1",result:function(){return f(l,"<h1>")}},heading2:{icon:"<b>H<sub>2</sub></b>",title:"Heading 2",result:function(){return f(l,"<h2>")}},paragraph:{icon:"&#182;",title:"Paragraph",result:function(){return f(l,"<p>")}},quote:{icon:"&#8220; &#8221;",title:"Quote",result:function(){return f(l,"<blockquote>")}},olist:{icon:"&#35;",title:"Ordered List",result:function(){return f("insertOrderedList")}},ulist:{icon:"&#8226;",title:"Unordered List",result:function(){return f("insertUnorderedList")}},code:{icon:"&lt;/&gt;",title:"Code",result:function(){return f(l,"<pre>")}},line:{icon:"&#8213;",title:"Horizontal Line",result:function(){return f("insertHorizontalRule")}},link:{icon:"&#128279;",title:"Link",result:function(){var t=window.prompt("Enter the link URL");t&&f("createLink",t);}},image:{icon:"&#128247;",title:"Image",result:function(){var t=window.prompt("Enter the image URL");t&&f("insertImage",t);}}},m={actionbar:"pell-actionbar",button:"pell-button",content:"pell-content",selected:"pell-button-selected"},r=function(n){var t=n.actions?n.actions.map(function(t){return "string"==typeof t?p[t]:p[t.name]?e({},p[t.name],t):t}):Object.keys(p).map(function(t){return p[t]}),r=e({},m,n.classes),i=n[c]||"div",o=d("div");o.className=r.actionbar,s(n.element,o);var u=n.element.content=d("div");return u.contentEditable=!0,u.className=r.content,u.oninput=function(t){var e=t.target.firstChild;e&&3===e.nodeType?f(l,"<"+i+">"):"<br>"===u.innerHTML&&(u.innerHTML=""),n.onChange(u.innerHTML);},u.onkeydown=function(t){var e;"Enter"===t.key&&"blockquote"===(e=l,document.queryCommandValue(e))&&setTimeout(function(){return f(l,"<"+i+">")},0);},s(n.element,u),t.forEach(function(t){var e=d("button");if(e.className=r.button,e.innerHTML=t.icon,e.title=t.title,e.setAttribute("type","button"),e.onclick=function(){return t.result()&&u.focus()},t.state){var n=function(){return e.classList[t.state()?"add":"remove"](r.selected)};a(u,"keyup",n),a(u,"mouseup",n),a(e,"click",n);}s(o,e);}),n.styleWithCSS&&f("styleWithCSS"),f(c,i),n.element},i={exec:f,init:r};t.exec=f,t.init=r,t.default=i,Object.defineProperty(t,"__esModule",{value:!0});});
});

var pell = unwrapExports(pell_min);

class YooFormTextEditorComponent {
    constructor() {
        this.validators = [];
    }
    componentDidLoad() {
        if (!this.readonly && this.containerEl) {
            this.editor = pell.init({
                element: this.containerEl,
                actions: [
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'heading1',
                    'heading2',
                    'paragraph',
                    'quote',
                    'olist',
                    'ulist',
                    //'code',
                    'line'
                    // {
                    //     name: 'link',
                    //     icon: '<yoo-icon class="yo-link"></yoo-icon>',
                    //     result: () => {
                    //         showRename(
                    //             translate('INSERTLINK'),
                    //             null,
                    //             '').then(ret => {
                    //                 if (ret) {
                    //                     pell.exec('createLink', ret);
                    //                 }
                    //             })
                    //     }
                    // }
                    //'image'
                ],
                onChange: (html) => this.onChange(html)
            });
            if (this.value) {
                this.editor.content.innerHTML = this.value;
            }
        }
    }
    componentDidUnload() {
        if (this.editor && this.editor.disable) {
            this.editor.disable();
        }
    }
    onChange(html) {
        // if (this.editor) {
        //     let value = this.editor.getContents();
        //     // tslint:disable-next-line:no-console
        //     console.log(value);
        //     setValueAndValidateInput(value, this);
        // }
        setValueAndValidateInput(html, this);
    }
    validate() {
        let isValid = true;
        if (this.required && !this.value) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validity = isValid;
            this.validityChanged.emit(isValid);
        }
        return this.validity;
    }
    renderEditable() {
        return (h("div", { class: "container", ref: el => this.containerEl = el }));
    }
    renderReadonly() {
        return h("div", { class: "readonly", innerHTML: this.value || '' });
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-text-editor"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
        },
        "value": {
            "type": String,
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
    static get style() { return ":host .pell {\n  border: 1px solid var(--input-container-border-color, #E6E6E6);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host .pell-content {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  height: 180px;\n  outline: 0;\n  overflow-y: auto;\n  padding: 1rem; }\n\n:host .pell-actionbar {\n  background-color: var(--light, #FFFFFF);\n  border-bottom: 1px solid var(--input-container-border-color, #E6E6E6); }\n\n:host .pell-button {\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n  height: 30px;\n  outline: 0;\n  width: 30px;\n  vertical-align: bottom; }\n\n:host .pell-button-selected {\n  background-color: var(--success, #04CC99); }\n\n:host .container {\n  width: 100%;\n  border: 1px solid var(--input-container-border-color, #E6E6E6);\n  border-radius: var(--border-radius-input, 5px); }\n  :host .container .pell-actionbar {\n    border-top-left-radius: var(--border-radius-input, 5px);\n    border-top-right-radius: var(--border-radius-input, 5px); }\n    :host .container .pell-actionbar .pell-button {\n      color: var(--black, #000000); }"; }
}

export { YooFormTextEditorComponent as YooFormTextEditor };
