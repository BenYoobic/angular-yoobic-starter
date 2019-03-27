import { setValidator, translate, isCordova, querySelectorDeep } from '../../../utils/';
import interact from 'interactjs';
import { shuffle } from 'lodash-es';
import { setValueAndValidateInput } from '../../../utils';
const BADGE_FONTSIZE = 8;
const BADGE_PADDING = 20;
const DROPPED_WORD_PADDING = 20;
const WORD_PADING = 4;
export class YooFormMissingWordComponent {
    constructor() {
        this.value = null;
        this.validators = [];
        this.placeholder = 'SELECTRIGHTWORDS';
    }
    async isValid() {
        return this.validity;
    }
    componentWillLoad() {
        setValidator(this);
        if (this.sentence) {
            this.values = this.values ? shuffle(this.values) : [];
            this.answer = this.answer || [];
            this.originalValues = this.values.slice();
            this.words = this.sentence.split(' ').map(w => ({ value: w, hidden: this.values.indexOf(w) >= 0, dynamic: this.values.indexOf(w) >= 0 }));
            this.sentenceAnswer = this.sentence.split(' ').map(w => ({ value: w, hidden: true, dynamic: this.answer.indexOf(w) >= 0 }));
            this.valueAsSentence = !this.value || !this.answer ? [] : this.sentence.split(' ').map(w => ({
                value: this.values.indexOf(w) >= 0 ? this.value[this.answer.indexOf(w)] : w,
                answer: w,
                valid: this.value[this.answer.indexOf(w)] === w,
                dynamic: this.answer.indexOf(w) >= 0
            }));
        }
        this.isRendered = false;
    }
    componentDidLoad() {
        if (isCordova()) {
            this.clearInteractEvents();
        }
        this.initInteract();
        this.isRendered = true;
        this.setMissingWordsWidth();
    }
    setMissingWordsWidth() {
        let longestWord = this.values.reduce(function (a, b) { return a.length > b.length ? a : b; });
        if (longestWord) {
            this.missingWordWidth = this.getMissingOrDroppedWordWidth(longestWord);
        }
    }
    getMissingOrDroppedWordWidth(word, droppedWord = false) {
        let wordWidth = (word.length * BADGE_FONTSIZE) + BADGE_PADDING;
        if (this.sentenceEl) {
            if (wordWidth >= this.sentenceEl.offsetWidth) {
                return (this.sentenceEl.offsetWidth - WORD_PADING);
            }
            else {
                return (wordWidth + (droppedWord ? DROPPED_WORD_PADDING : 0));
            }
        }
    }
    getWordClass(word) {
        if (this.value && this.answer) {
            let ind = this.answer.indexOf(word);
            if (ind > -1) {
                return this.answer[ind] === this.value[ind] ? 'valid' : 'invalid';
            }
            else {
                return;
            }
        }
        return;
    }
    getWordText(word) {
        if (this.getWordClass(word) === 'invalid') {
            return this.value[this.answer.indexOf(word)];
        }
        else {
            return word;
        }
    }
    initInteract() {
        if (!this.readonly) {
            this.initInteractDraggable();
            this.initInteractDroppable();
        }
    }
    initInteractDraggable() {
        interact(`yoo-badge.dropped.item-${this.slideIndex}`).on('tap', ev => {
            if (ev.target && ev.target.innerText) {
                this.onClickOrDropWord(ev.target.innerText);
            }
        });
        interact(`yoo-badge.suggested.item-${this.slideIndex}`).on('tap', ev => {
            if (ev.target && ev.target.innerText) {
                this.onClickSuggestionsWord(ev.target.innerText);
            }
        });
        interact(`yoo-badge.item-${this.slideIndex}`).draggable({
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
        interact('.word.droppable', {
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
        interact('.suggestions', {
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
            ondrop: ev => {
                if (ev && ev.relatedTarget && ev.target) {
                    ev.target.classList.remove('drop-target');
                    let droppedWord = ev.relatedTarget.text;
                    this.onClickOrDropWord(droppedWord);
                }
            }
        });
    }
    findDroppedWord(word) {
        return this.words.find(dropped => dropped.displayedValue === word);
    }
    isDropped(word) {
        return this.findDroppedWord(word) !== undefined;
    }
    updateAnswer() {
        let tempValue = [];
        this.words.forEach(w => {
            if (w.dynamic && w.displayedValue) {
                tempValue.push(w.displayedValue);
            }
        });
        if (tempValue.length === this.words.filter(w => w.dynamic).length) {
            this.value = tempValue;
        }
        setValueAndValidateInput(this.value, this);
    }
    onDropWord(event) {
        if (event.target && event.relatedTarget) {
            let targetWord = event.target.title;
            let droppedWord = event.relatedTarget.text;
            this.onClickOrDropWord(droppedWord);
            let replacedWord = this.words.find(w => w.value === targetWord);
            if (replacedWord) {
                replacedWord.displayedValue = droppedWord;
            }
            this.updateAnswer();
            event.target.classList.remove('drop-target');
        }
    }
    onClickOrDropWord(word) {
        let alreadyDroppedWord = this.findDroppedWord(word);
        if (alreadyDroppedWord) {
            alreadyDroppedWord.displayedValue = undefined;
            this.updateAnswer();
        }
    }
    onClickSuggestionsWord(word) {
        if (!this.isDropped(word)) {
            let firstAvailableSpot = this.words.find(w => w.dynamic === true && !w.displayedValue);
            if (firstAvailableSpot) {
                firstAvailableSpot.displayedValue = word;
                this.updateAnswer();
            }
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
            h("div", { class: "sentence-answers" }, this.valueAsSentence.map((w) => h("span", { class: 'word ' + (w.dynamic ? (w.valid ? 'success' : 'danger') : '') },
                " ",
                w.value,
                " "))));
    }
    renderEditable() {
        return h("div", { class: "outer-container" },
            h("div", { class: "sentence", ref: (el) => this.sentenceEl = el }, this.isRendered ?
                this.words.map((w) => {
                    return [
                        !w.hidden ? h("span", { title: w.value, class: 'word ' + (w.dynamic ? 'dynamic droppable' : '') }, w.value) :
                            (!w.displayedValue ? h("span", { style: { width: `${this.missingWordWidth}px` }, class: "word droppable hidden", title: w.value }, "*") :
                                h("yoo-badge", { style: { width: `${this.getMissingOrDroppedWordWidth(w.displayedValue, true)}px` }, class: `missing-word round danger-light dropped item-${this.slideIndex}`, text: w.displayedValue }))
                    ];
                }) :
                null),
            h("div", { class: "placeholder" }, translate(this.placeholder)),
            h("div", { class: "suggestions" }, this.values.map((w) => {
                if (!this.isDropped(w)) {
                    return h("yoo-badge", { class: `missing-word round danger-light suggested item-${this.slideIndex}`, text: w });
                }
            })));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-missing-word"; }
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
        "isRendered": {
            "state": true
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
            "attr": "required"
        },
        "sentence": {
            "type": String,
            "attr": "sentence",
            "mutable": true
        },
        "slideIndex": {
            "type": Number,
            "attr": "slide-index"
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
    static get style() { return "/**style-placeholder:yoo-form-missing-word:**/"; }
}
