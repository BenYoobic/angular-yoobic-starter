const h = window.DesignSystem.h;

import { aN as setValidator, bW as shuffle, k as isCordova, bZ as isEqual, aQ as setValueAndValidateInput, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import { a as interact } from './chunk-3d0cf4d4.js';

class YooFormConnectComponent {
    constructor() {
        this.value = null;
        this.validators = [];
        this.colorArray = ['danger-light', 'accent', 'royal', 'info', 'light-orange', 'energized'];
    }
    async isValid() {
        return this.validity;
    }
    componentWillLoad() {
        setValidator(this);
        this.values = this.values || [];
        this.answer = this.answer || [];
        this.values.forEach((el, index) => {
            this.values[index] = shuffle(el);
        });
    }
    componentDidLoad() {
        if (isCordova()) {
            this.clearInteractEvents();
        }
        this.initInteract();
    }
    requiredWatch() {
        this.validate();
    }
    validate() {
        let isValid = true;
        let areAllTagsConnected = (this.values[0].length === this.value.length) || (this.values[1].length === this.value.length);
        if (this.required && !areAllTagsConnected) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validityChanged.emit(isValid);
            this.validity = isValid;
        }
        return this.validity;
    }
    initInteract() {
        if (!this.readonly) {
            this.initInteractDraggable();
            this.initInteractDroppable();
        }
    }
    initInteractDraggable() {
        interact('.draggable')
            .on('tap', ev => {
            if (ev.target && ev.target.innerText) {
                this.onClickBadge(ev.target.innerText);
            }
        })
            .draggable({
            inertia: true,
            onmove: (ev) => {
                this.dragMoveListener(ev);
                if (ev.target && ev.target.classList) {
                    ev.target.classList.add('drag-target');
                }
            },
            onend: (ev) => {
                this.dragEndListener(ev);
                if (ev.target && ev.target.classList) {
                    ev.target.classList.remove('drag-target');
                }
            }
        });
    }
    initInteractDroppable() {
        interact('.droppable', {
            context: this.outerContainerElement
        }).dropzone({
            overlap: 0.55,
            ondragenter: (ev) => {
                if (ev.target && ev.target.classList) {
                    ev.target.classList.add('drop-target');
                }
            },
            ondragleave: (ev) => {
                if (ev.target && ev.target.classList) {
                    ev.target.classList.remove('drop-target');
                }
            },
            ondrop: (ev) => this.onDropWord(ev)
        });
    }
    updateValue(leftWord, rightWord) {
        let tempValue = [];
        let newConnection = [leftWord, rightWord].sort();
        let newConnectionIndex = -1;
        if (this.value) {
            newConnectionIndex = this.value.findIndex(el => {
                return isEqual(el, newConnection) || el.includes(newConnection[0]) || el.includes(newConnection[1]);
            });
            tempValue = this.value;
        }
        if (newConnectionIndex <= -1) {
            tempValue.push(newConnection);
            this.value = tempValue;
        }
        setValueAndValidateInput(this.value, this);
    }
    isConnected(word) {
        let color;
        let pairedBadges;
        if (this.value) {
            this.value.map(el => {
                if (el.includes(word)) {
                    pairedBadges = el;
                }
            });
        }
        if (pairedBadges && pairedBadges[0] && pairedBadges[1] && this.values[0]) {
            let index = this.values[0].findIndex(w => w === pairedBadges[0] || w === pairedBadges[1]);
            color = this.colorArray[index];
        }
        return color;
    }
    getAnswerColor(word) {
        let color;
        this.answer.map((el, index) => {
            if (el.includes(word)) {
                color = this.colorArray[index];
            }
        });
        return color;
    }
    onClickBadge(word) {
        let index = -1;
        if (this.value) {
            index = this.value.findIndex(el => {
                return el[0] === word || el[1] === word;
            });
            if (index > -1) {
                this.value.splice(index, 1);
                setValueAndValidateInput(this.value, this);
            }
        }
        return;
    }
    onDropWord(event) {
        if (event.target && event.relatedTarget) {
            let leftWord = event.relatedTarget.text;
            let rightWord = event.target.text;
            if (leftWord && rightWord && !(this.values[1].includes(leftWord) && this.values[1].includes(rightWord))) {
                this.updateValue(leftWord, rightWord);
            }
            event.target.classList.remove('drop-target');
        }
    }
    clearInteractEvents() {
        // Remove interact to avoid event duplication
        interact('yoo-badge').unset();
    }
    dragMoveListener(event) {
        let target = event.target, 
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx, y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        if (target) {
            // translate the element
            target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            // update the position attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    }
    dragEndListener(event) {
        let target = event.target;
        if (target) {
            // reset translate transformation
            target.style.webkitTransform = target.style.transform = 'translate(' + 0 + 'px, ' + 0 + 'px)';
            // reset the position attributes
            target.setAttribute('data-x', 0);
            target.setAttribute('data-y', 0);
        }
    }
    renderReadonly() {
        return h("div", { class: "readonly" },
            h("div", { class: "title" }, translate('ANSWER')),
            h("div", { class: "words-container" },
                h("div", { class: "left-container" }, this.values && this.values[0] && this.values[0].map((w) => {
                    return h("yoo-badge", { class: 'light-border button-like ' + this.getAnswerColor(w), text: w });
                })),
                h("div", { class: "right-container" }, this.values && this.values[1] && this.values[1].map((w) => {
                    return h("yoo-badge", { class: 'light-border button-like ' + this.getAnswerColor(w), text: w });
                }))));
    }
    renderEditable() {
        return h("div", { ref: el => this.outerContainerElement = el, class: "outer-container" },
            h("div", { class: "title" }, translate('CONNECTWORDS')),
            h("div", { class: "placeholder" }, translate('MATCHWORDS')),
            h("div", { class: "words-container" },
                h("div", { class: "left-container" }, this.values && this.values[0] && this.values[0].map((w) => {
                    return h("yoo-badge", { class: 'draggable light-border button-like ' + this.isConnected(w), text: w });
                })),
                h("div", { class: "right-container" }, this.values && this.values[1] && this.values[1].map((w) => {
                    return h("yoo-badge", { class: 'droppable light-border button-like ' + this.isConnected(w), text: w });
                }))));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-connect"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "answer": {
            "type": "Any",
            "attr": "answer",
            "mutable": true
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "method": true
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
            "attr": "required",
            "watchCallbacks": ["requiredWatch"]
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
            "attr": "values",
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
    static get style() { return ":host .outer-container,\n:host .readonly {\n  -ms-touch-action: none;\n  touch-action: none; }\n  :host .outer-container .title,\n  :host .readonly .title {\n    color: var(--black, #000000);\n    font-size: var(--font-lx, 27px);\n    font-weight: bold; }\n  :host .outer-container .placeholder,\n  :host .readonly .placeholder {\n    color: var(--stable, #adadad);\n    font-size: var(--font-l, 17px); }\n  :host .outer-container .words-container,\n  :host .readonly .words-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-pack: distribute;\n    justify-content: space-around;\n    padding-top: var(--padding-40, 2.5rem); }\n    :host .outer-container .words-container .left-container,\n    :host .outer-container .words-container .right-container,\n    :host .readonly .words-container .left-container,\n    :host .readonly .words-container .right-container {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex: 1;\n      flex: 1;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      text-align: center; }\n      :host .outer-container .words-container .left-container yoo-badge,\n      :host .outer-container .words-container .right-container yoo-badge,\n      :host .readonly .words-container .left-container yoo-badge,\n      :host .readonly .words-container .right-container yoo-badge {\n        --color-inner-text: var(--black, #000000);\n        --font-size-inner-container: var(--font-m, 15px);\n        --inner-container-default-padding: 0.375rem 0.625rem;\n        margin: 0 0.3125rem 0.3125rem 0.3125rem;\n        -ms-touch-action: none;\n        touch-action: none; }\n        :host .outer-container .words-container .left-container yoo-badge.drag-target,\n        :host .outer-container .words-container .right-container yoo-badge.drag-target,\n        :host .readonly .words-container .left-container yoo-badge.drag-target,\n        :host .readonly .words-container .right-container yoo-badge.drag-target {\n          --shadow: var(--button-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));\n          --background: var(--light, #FFFFFF);\n          position: relative;\n          z-index: 50; }\n        :host .outer-container .words-container .left-container yoo-badge.drop-target,\n        :host .outer-container .words-container .right-container yoo-badge.drop-target,\n        :host .readonly .words-container .left-container yoo-badge.drop-target,\n        :host .readonly .words-container .right-container yoo-badge.drop-target {\n          --background: var(--stable-30, #E6E6E6); }"; }
}

export { YooFormConnectComponent as YooFormConnect };
