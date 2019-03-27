import { setValidator, translate, isCordova, querySelectorDeep, setValueAndValidateInput } from '../../../utils/';
import { shuffle } from 'lodash-es';
import interact from 'interactjs';
export class YooFormCategorizeWordsComponent {
    constructor() {
        this.value = null;
        this.validators = [];
    }
    async isValid() {
        return this.validity;
    }
    componentWillLoad() {
        setValidator(this);
        this.values = this.values ? shuffle(this.values) : [];
        this.answer = this.answer || [];
        this.topContainerWords = this.topContainerWords || [];
        this.bottomContainerWords = this.bottomContainerWords || [];
    }
    componentDidLoad() {
        if (isCordova()) {
            this.clearInteractEvents();
        }
        this.initInteract();
    }
    initInteract() {
        if (!this.readonly) {
            this.initInteractDraggable();
            this.initInteractDroppable();
        }
    }
    initInteractDraggable() {
        interact('.draggable').draggable({
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
            context: querySelectorDeep(this.host, '.outer-container')
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
    findDroppedWord(word, from) {
        let isTop = this.topContainerWords.find(dropped => dropped === word);
        let isMiddle = this.values.find(dropped => dropped === word);
        let isBottom = this.bottomContainerWords.find(dropped => dropped === word);
        let result;
        switch (from) {
            case 'top':
                result = isMiddle || isBottom;
                break;
            case 'middle':
                result = isTop || isBottom;
                break;
            case 'bottom':
                result = isMiddle || isTop;
                break;
            default:
                result = undefined;
        }
        return result;
    }
    isDropped(word, from) {
        return this.findDroppedWord(word, from) !== undefined;
    }
    updateContainer() {
        let value = [this.topContainerWords, this.bottomContainerWords];
        this.value = value;
        setValueAndValidateInput(this.value, this);
    }
    updateArrays(from, droppedWord) {
        if (from.includes('suggestions')) {
            this.values = this.values.filter(el => el !== droppedWord);
        }
        else if (from.includes('top')) {
            this.topContainerWords = this.topContainerWords.filter(el => el !== droppedWord);
        }
        else if (from.includes('bottom')) {
            this.bottomContainerWords = this.bottomContainerWords.filter(el => el !== droppedWord);
        }
        else {
            return;
        }
    }
    onDropWord(event) {
        if (event.target && event.relatedTarget) {
            let targetContainerClasses = event.target.className;
            let droppedWord = event.relatedTarget.text;
            let initialArea = event.relatedTarget.parentElement.className;
            let droppedArea = "bottomContainerWords";
            if (targetContainerClasses.includes('top-container')) {
                droppedArea = "topContainerWords";
            }
            else if (targetContainerClasses.includes('suggestions')) {
                droppedArea = "values";
            }
            if (initialArea && this[droppedArea].find(word => word === droppedWord) === undefined) {
                this.updateArrays(initialArea, droppedWord);
                this[droppedArea].push(droppedWord);
                this.updateContainer();
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
    checkAnswer(val, answer) {
        return (answer.includes(val)) ? 'success' : 'danger';
    }
    badgesCount(container) {
        let count = 0;
        let answerExpected = 0;
        if (container === 'top') {
            count = this.topContainerWords.length;
            answerExpected = this.answer[0].length;
        }
        else {
            count = this.bottomContainerWords.length;
            answerExpected = this.answer[1].length;
        }
        return `${count} / ${answerExpected}`;
    }
    renderReadonly() {
        return h("div", { class: "categories-answers" },
            h("div", { class: "answertitle" },
                translate('ANSWER'),
                ":"),
            h("div", { class: "readonly" },
                h("div", { class: "top-container" },
                    h("div", { class: "header" },
                        this.categories[0] ? this.categories[0] : '',
                        h("span", { class: "header-count" }, this.badgesCount('top'))),
                    h("div", { class: "badges-container top" }, this.value[0].map((w) => h("yoo-badge", { class: `round ${this.checkAnswer(w, this.answer[0])}`, text: w })))),
                h("div", { class: "bottom-container" },
                    h("div", { class: "header" },
                        this.categories[1] ? this.categories[1] : '',
                        h("span", { class: "header-count" }, this.badgesCount('bottom'))),
                    h("div", { class: "badges-container bottom" }, this.value[1].map((w) => h("yoo-badge", { class: `round ${this.checkAnswer(w, this.answer[1])}`, text: w }))))));
    }
    renderEditable() {
        return h("div", { class: "outer-container" },
            h("div", { class: "top-container droppable" },
                h("div", { class: "header" },
                    this.categories[0],
                    h("span", { class: "header-count" }, this.badgesCount('top'))),
                h("div", { class: "badges-container top" }, this.topContainerWords.map((w) => {
                    return h("yoo-badge", { class: 'draggable round light-border', text: w });
                }))),
            h("div", { class: "title" }, translate('PLACEMENTINTRODUCTION')),
            h("div", { class: "placeholder" }, translate('DRAGRIGHTWORDS')),
            h("div", { class: "suggestions droppable" }, this.values.map((w) => {
                return h("yoo-badge", { class: 'draggable round light light-border', text: w });
            })),
            h("div", { class: "bottom-container droppable" },
                h("div", { class: "header" },
                    this.categories[1],
                    h("span", { class: "header-count" }, this.badgesCount('bottom'))),
                h("div", { class: "badges-container bottom" }, this.bottomContainerWords.map((w) => {
                    return h("yoo-badge", { class: 'draggable round light-border', text: w });
                }))));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-categorize-words"; }
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
        "categories": {
            "type": "Any",
            "attr": "categories",
            "mutable": true
        },
        "host": {
            "elementRef": true
        },
        "isValid": {
            "method": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
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
    static get style() { return "/**style-placeholder:yoo-form-categorize-words:**/"; }
}
