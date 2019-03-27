import { h } from '../design-system.core.js';

import { aN as setValidator, bW as shuffle, aQ as setValueAndValidateInput, c2 as isUndefined, L as querySelectorDeep, c3 as isNil, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import { a as interact } from './chunk-3d0cf4d4.js';

const BADGE_FONTSIZE = 8;
const BADGE_PADDING_TOP_OR_BOTTOM = 6;
const BADGE_PADDING_SIDE = 10;
const BADGE_MARGIN = 5;
const ANNOTATION_PADDING = 20;
const IMAGE_MARGIN = 30;
const IMAGE_RATIO = 0.753623188405797;
// image ration is height/width
class YooFormImageTaggingComponent {
    constructor() {
        this.validators = [];
        this.placeholder = "DRAGDROPTAGS";
    }
    requiredWatch() {
        this.validate();
    }
    componentWillLoad() {
        setValidator(this);
        this.value = this.value || new Array(this.annotations.length).fill('');
        this.values = this.values ? shuffle(this.values) : [];
        setValueAndValidateInput(this.value, this);
        this.isRendered = false;
    }
    componentDidLoad() {
        this.initInteract();
        this.isRendered = true;
    }
    getImageSize() {
        let imgWidth = window.innerWidth - IMAGE_MARGIN;
        let imgHeight = Math.abs(imgWidth * IMAGE_RATIO);
        return { ['width']: `${imgWidth}px`, ['height']: `${imgHeight}px` };
    }
    validate() {
        let isValid = true;
        let hasValueEmptyItems = isUndefined(this.value && this.value.find(t => t === ""));
        if (this.required && !hasValueEmptyItems) {
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
        interact(`yoo-badge.item-${this.slideIndex}`)
            .on('tap', (ev) => {
            if (ev.currentTarget) {
                this.onDragOrTapWord(ev.currentTarget);
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
        interact('.drop-zone', {
            context: querySelectorDeep(this.host, '.outer-container')
        }).dropzone({
            overlap: 'pointer',
            ondragenter: (ev) => {
                if (ev.target && ev.target.classList) {
                    let annotation = querySelectorDeep(this.host, `.annotation[data-index='${ev.target.getAttribute('data-index')}']`);
                    if (annotation) {
                        annotation.classList.add('drop-target');
                    }
                }
            },
            ondragleave: (ev) => {
                if (ev.target && ev.target.classList) {
                    let annotation = querySelectorDeep(this.host, `.annotation[data-index='${ev.target.getAttribute('data-index')}']`);
                    if (annotation) {
                        annotation.classList.remove('drop-target');
                    }
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
            ondrop: (ev) => {
                if (ev.relatedTarget && !ev.relatedTarget.classList.contains('suggested')) {
                    this.onDragOrTapWord(ev.relatedTarget);
                }
                ev.target.classList.remove('drop-target');
            }
        });
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
    onDropWord(ev) {
        if (ev.target && ev.relatedTarget) {
            let targetWordIndex = ev.target.getAttribute('data-index');
            let droppedWord = ev.relatedTarget.text;
            let annotation = querySelectorDeep(this.host, `.annotation[data-index='${ev.target.getAttribute('data-index')}']`);
            if (this.value.indexOf(droppedWord) >= 0) {
                this.onDragOrTapWord(ev.relatedTarget);
            }
            if (this.value[targetWordIndex] === '') {
                this.value[targetWordIndex] = droppedWord;
                this.updateAnswer();
            }
            annotation.classList.remove('drop-target');
        }
        ;
    }
    onDragOrTapWord(target) {
        let targetWordIndex = target.getAttribute('data-index');
        let word = target.text;
        if (targetWordIndex) {
            // from annotation to suggestions
            this.value[targetWordIndex] = '';
            this.updateAnswer();
        }
        else {
            // from suggestions to first empty annotation 
            let emptyIndex = this.value.indexOf('');
            if (!isNil(emptyIndex) && !isNil(word)) {
                this.value[emptyIndex] = word;
                this.updateAnswer();
            }
        }
    }
    isDropped(word) {
        return this.value ? this.value.indexOf(word) >= 0 : false;
    }
    getTopPosition(annotation, isDropZone = false, isBadge = false) {
        let top = '0px';
        let imageEl = querySelectorDeep(this.host, `.image`);
        if (imageEl) {
            top = `${(imageEl.offsetHeight * annotation.percent_y) - (isDropZone ? ANNOTATION_PADDING : 0) - (isBadge ? BADGE_PADDING_TOP_OR_BOTTOM : 0)}px`;
        }
        return top;
    }
    getHorizontalPosition(annotation, isDropZone = false, word) {
        let halfWordLength = word ? (((word.length * BADGE_FONTSIZE) + BADGE_PADDING_SIDE) / 2) : 0;
        let imageEl = querySelectorDeep(this.host, `.image`);
        if (imageEl) {
            let offset = imageEl.offsetWidth * annotation.percent_x;
            let offsetMiddleBadge = offset - halfWordLength;
            if (isDropZone) {
                return `${offset - ANNOTATION_PADDING}px`;
            }
            else {
                if ((imageEl.offsetWidth - offset) <= (2 * (halfWordLength + BADGE_MARGIN)) || offsetMiddleBadge <= 0) {
                    return '0px';
                }
                else {
                    return `${offsetMiddleBadge}px`;
                }
            }
        }
    }
    getPositionSide(annotation, word) {
        let offset = this.getHorizontalPosition(annotation, false, word);
        if (offset !== '0px') {
            return 'left';
        }
        else {
            if (annotation.percent_x <= 0.5) {
                return 'left';
            }
            else {
                return 'right';
            }
        }
    }
    updateAnswer() {
        setValueAndValidateInput(this.value, this);
    }
    checkAnswer(val, answer) {
        return (val === answer) ? 'success' : 'danger';
    }
    renderAnnotationAndDropZone(annotation, index) {
        if (this.value && this.value[index] !== '') {
            return [
                h("div", { class: "annotation", "data-text": annotation.text, "data-index": index, style: { top: this.getTopPosition(annotation), [this.getPositionSide(annotation)]: this.getHorizontalPosition(annotation) } }),
                h("yoo-badge", { class: 'round ' + (this.readonly ? this.checkAnswer(this.value[index], this.answer[index]) : 'danger-light') + ` item-${this.slideIndex}`, "data-index": index, text: this.value[index], style: { top: this.getTopPosition(annotation, false, true), [this.getPositionSide(annotation, this.value[index])]: this.getHorizontalPosition(annotation, false, this.value[index]) } })
            ];
        }
        else {
            return [
                h("div", { class: "annotation", "data-text": annotation.text, "data-index": index, style: { top: this.getTopPosition(annotation), [this.getPositionSide(annotation)]: this.getHorizontalPosition(annotation) } }),
                this.readonly ? null : h("div", { class: "drop-zone", "data-text": annotation.text, "data-index": index, style: { top: this.getTopPosition(annotation, true), [this.getPositionSide(annotation)]: this.getHorizontalPosition(annotation, true) } })
            ];
        }
        ;
    }
    renderReadonly() {
        return h("div", { class: "outer-container" },
            h("div", { class: "top-container" },
                h("yoo-img", { disabled: isNil(this.imageData), src: this.imageData ? this.imageData._downloadURL : '', class: "image", style: this.getImageSize() }),
                this.isRendered ? this.annotations.map((a, i) => this.renderAnnotationAndDropZone(a, i)) : null));
    }
    renderEditable() {
        return h("div", { class: "outer-container" },
            h("div", { class: "top-container" },
                h("yoo-img", { disabled: isNil(this.imageData), src: this.imageData ? this.imageData._downloadURL : '', class: "image", style: this.getImageSize() }),
                this.isRendered ? this.annotations.map((a, i) => this.renderAnnotationAndDropZone(a, i)) : null),
            h("div", { class: "bottom-container" },
                h("div", { class: "instructions" }, translate(this.placeholder)),
                h("div", { class: "suggestions" }, this.values.map((w) => {
                    if (!this.isDropped(w)) {
                        return h("yoo-badge", { class: `round danger-light suggested item-${this.slideIndex}`, text: w });
                    }
                }))));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-image-tagging"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "annotations": {
            "type": "Any",
            "attr": "annotations"
        },
        "answer": {
            "type": "Any",
            "attr": "answer"
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "imageData": {
            "type": "Any",
            "attr": "image-data"
        },
        "isRendered": {
            "state": true
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
            "state": true
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
    static get style() { return ":host .outer-container .top-container .image {\n  border-radius: 0.5rem; }\n\n:host .outer-container .top-container .annotation {\n  position: absolute;\n  width: var(--padding-20, 1.25rem);\n  height: var(--padding-20, 1.25rem);\n  border-radius: 50%;\n  background-color: var(--light, #FFFFFF);\n  -webkit-box-shadow: 0 0.25rem 0.625rem 0 rgba(0, 0, 0, 0.5);\n  box-shadow: 0 0.25rem 0.625rem 0 rgba(0, 0, 0, 0.5); }\n  :host .outer-container .top-container .annotation.drop-target {\n    background-color: var(--energized, #fed05b); }\n\n:host .outer-container .top-container .drop-zone {\n  position: absolute;\n  width: 3.75rem;\n  height: 3.75rem;\n  border-radius: 50%; }\n\n:host .outer-container .top-container yoo-badge {\n  --font-size-inner-container: var(--font-m, 15px);\n  --inner-container-default-padding: 0.375rem 0.625rem;\n  position: absolute;\n  margin: 0 0.3125rem 0.3125rem 0.3125rem;\n  cursor: pointer;\n  -ms-touch-action: none;\n  touch-action: none;\n  z-index: 1; }\n  :host .outer-container .top-container yoo-badge.transparent {\n    --color-inner-text: var(--stable-alt, #d0d0d0); }\n\n:host .outer-container .bottom-container .instructions {\n  margin: 1.875rem auto 0.625rem;\n  color: var(--stable, #adadad);\n  font-size: var(--font-m, 15px);\n  letter-spacing: normal; }\n\n:host .outer-container .bottom-container .suggestions {\n  background: var(--light, #FFFFFF);\n  font-size: var(--font-l, 17px); }\n  :host .outer-container .bottom-container .suggestions yoo-badge {\n    --font-size-inner-container: var(--font-m, 15px);\n    --inner-container-default-padding: 0.375rem 0.625rem;\n    margin: 0 0.3125rem 0.3125rem 0.3125rem;\n    cursor: pointer;\n    -ms-touch-action: none;\n    touch-action: none; }\n    :host .outer-container .bottom-container .suggestions yoo-badge.transparent {\n      --color-inner-text: var(--stable-alt, #d0d0d0); }\n  :host .outer-container .bottom-container .suggestions.drop-target {\n    padding: 0.25rem;\n    border: 0.0625rem dashed var(--stable-alt-to-dark, #d0d0d0); }"; }
}

export { YooFormImageTaggingComponent as YooFormImageTagging };
