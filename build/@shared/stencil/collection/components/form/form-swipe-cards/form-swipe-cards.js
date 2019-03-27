import { cloudinary, querySelectorDeep, setValidator, setValueAndValidateInput, translate } from '../../../utils';
import interact from 'interactjs';
import { isNil, isArray, sum } from 'lodash-es';
const SWIPE_OPTIONS = {
    interactMaxRotation: 10,
    interactOutOfSightXCoordinate: 500,
    //interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 50,
    SWIPED_RIGHT: 'swiped-right',
    SWIPED_LEFT: 'swiped-left',
    SWIPING_RIGHT: 'swiping-right',
    SWIPING_LEFT: 'swiping-left',
    SWIPED_RIGHT_INDEX: 0,
    SWIPED_LEFT_INDEX: 1
};
export class YooFormSwipeCardsComponent {
    constructor() {
        this.validators = [];
        this.mode = 'text';
    }
    requiredWatch() {
        this.validate();
    }
    componentWillLoad() {
        setValidator(this);
        this.showInstructions = true;
        const arrayLength = isArray(this.values) ? this.values.length : (isArray(this.images) ? this.images.length : 0);
        this.isCardIndexCurrent = new Array(arrayLength).fill(false);
        this.swipingClass = '';
        this.cardPositions = new Array(arrayLength).fill({ x: 0, y: 0, rotation: 0 });
        this.value = isArray(this.value) ? this.value || [[], []] : [[], []];
        this.images = this.images || [];
        this.values = this.values || this.images.map(i => i._filename);
        setValueAndValidateInput(this.value, this);
        if (isArray(this.values) || isArray(this.images)) {
            this.isCardIndexCurrent[0] = true;
        }
    }
    validate() {
        let isValid = true;
        if (this.required && !this.areAllCardsSwiped()) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validityChanged.emit(isValid);
            this.validity = isValid;
        }
        return this.validity;
    }
    transformString(cardIndex) {
        if (this.isCardIndexCurrent[cardIndex] || this.isSwiped(cardIndex)) {
            const { x, y, rotation } = this.cardPositions[cardIndex];
            return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
        }
        return null;
    }
    interactSetPosition(cardIndex, coordinates) {
        const { x = 0, y = 0, rotation = 0 } = coordinates;
        this.cardPositions[cardIndex] = { x, y, rotation };
        this.cardPositions = [...this.cardPositions];
    }
    initInteract() {
        if (!this.readonly) {
            this.initInteractDraggable();
        }
    }
    initInteractDraggable() {
        interact('.card', { context: querySelectorDeep(this.host, '.cards') })
            .draggable({
            onmove: (event) => {
                let cardIndex = parseInt(event.target.getAttribute('data-index'), 10);
                const { interactMaxRotation, interactXThreshold } = SWIPE_OPTIONS;
                const x = this.cardPositions[cardIndex].x + event.dx;
                const y = this.cardPositions[cardIndex].y + event.dy;
                let rotation = interactMaxRotation * (x / interactXThreshold);
                if (rotation > interactMaxRotation)
                    rotation = interactMaxRotation;
                else if (rotation < -interactMaxRotation)
                    rotation = -interactMaxRotation;
                this.interactSetPosition(cardIndex, { x, y, rotation });
                if (x > interactXThreshold)
                    this.swipingClass = SWIPE_OPTIONS.SWIPING_RIGHT;
                else if (x < -interactXThreshold)
                    this.swipingClass = SWIPE_OPTIONS.SWIPING_LEFT;
                else
                    this.swipingClass = '';
            },
            onend: (ev) => {
                const cardEl = ev.target;
                const cardIndex = parseInt(cardEl.getAttribute('data-index'), 10);
                const { x } = this.cardPositions[cardIndex];
                const { interactXThreshold } = SWIPE_OPTIONS;
                if (x > interactXThreshold) {
                    this.swipeCard(SWIPE_OPTIONS.SWIPED_RIGHT, cardIndex);
                }
                else if (x < -interactXThreshold) {
                    this.swipeCard(SWIPE_OPTIONS.SWIPED_LEFT, cardIndex);
                }
                else {
                    this.resetCardPosition(cardIndex);
                }
                this.swipingClass = '';
            }
        });
    }
    swipeCard(direction, cardIndex) {
        let directionIndex;
        switch (direction) {
            case SWIPE_OPTIONS.SWIPED_RIGHT:
                this.interactSetPosition(cardIndex, {
                    x: SWIPE_OPTIONS.interactOutOfSightXCoordinate,
                    rotation: SWIPE_OPTIONS.interactMaxRotation
                });
                directionIndex = SWIPE_OPTIONS.SWIPED_RIGHT_INDEX;
                break;
            case SWIPE_OPTIONS.SWIPED_LEFT:
                this.interactSetPosition(cardIndex, {
                    x: -SWIPE_OPTIONS.interactOutOfSightXCoordinate,
                    rotation: -SWIPE_OPTIONS.interactMaxRotation
                });
                directionIndex = SWIPE_OPTIONS.SWIPED_LEFT_INDEX;
                break;
        }
        this.hideCard(directionIndex, cardIndex);
    }
    hideCard(directionIndex, cardIndex) {
        let nextCardIndex = cardIndex + 1;
        this.value[directionIndex] = [...this.value[directionIndex], this.values[cardIndex]];
        this.isCardIndexCurrent = this.isCardIndexCurrent.map((v, i) => this.values[nextCardIndex] ? (i === nextCardIndex) : false);
        setTimeout(() => {
            this.host.forceUpdate();
            setValueAndValidateInput(this.value, this);
        }, 700);
    }
    resetCardPosition(cardIndex) {
        this.interactSetPosition(cardIndex, { x: 0, y: 0, rotation: 0 });
    }
    isCurrentCardIndexFirst() {
        return this.isCardIndexCurrent.findIndex(isCurrent => isCurrent) === 0;
    }
    isSwiped(cardIndex) {
        return (!isArray(this.value) || !isArray(this.values)) ? false : this.value[SWIPE_OPTIONS.SWIPED_LEFT_INDEX].indexOf(this.values[cardIndex]) >= 0 || this.value[SWIPE_OPTIONS.SWIPED_RIGHT_INDEX].indexOf(this.values[cardIndex]) >= 0;
    }
    areAllCardsSwiped() {
        if (isArray(this.value) && isArray(this.values)) {
            const nbCardsSwiped = sum(this.value.map(cat => cat.length));
            return this.values.length === nbCardsSwiped;
        }
        return false;
    }
    onClickArrow(direction) {
        if (!this.areAllCardsSwiped()) {
            const currentIndex = this.isCardIndexCurrent.findIndex(isCurrent => isCurrent);
            if (!isNil(currentIndex) && !isNil(currentIndex)) {
                this.swipeCard(direction, currentIndex);
            }
        }
    }
    unSwipeCard() {
        if (!this.isCurrentCardIndexFirst()) {
            const currentCardIndex = this.isCardIndexCurrent.findIndex((isCurrent) => isCurrent);
            const previousCardIndex = currentCardIndex > 0 ? currentCardIndex - 1 : (this.values.length - 1);
            if (this.values[previousCardIndex]) {
                this.value[SWIPE_OPTIONS.SWIPED_RIGHT_INDEX] = this.value[SWIPE_OPTIONS.SWIPED_RIGHT_INDEX].filter(v => v !== this.values[previousCardIndex]);
                this.value[SWIPE_OPTIONS.SWIPED_LEFT_INDEX] = this.value[SWIPE_OPTIONS.SWIPED_LEFT_INDEX].filter(v => v !== this.values[previousCardIndex]);
                this.isCardIndexCurrent = this.isCardIndexCurrent.map((v, i) => (i === previousCardIndex));
                this.resetCardPosition(previousCardIndex);
                this.host.forceUpdate();
                setValueAndValidateInput(this.value, this);
            }
        }
    }
    hideInstructions() {
        this.showInstructions = false;
        this.initInteract();
    }
    renderCardText(cardIndex) {
        let text = '';
        if (this.swipingClass !== '') {
            text = this.categories[this.swipingClass === SWIPE_OPTIONS.SWIPING_LEFT ? SWIPE_OPTIONS.SWIPED_LEFT_INDEX : SWIPE_OPTIONS.SWIPED_RIGHT_INDEX];
        }
        else {
            if (this.mode !== 'image') {
                text = this.values[cardIndex];
            }
        }
        return text;
    }
    renderCard(cardIndex, isCurrent) {
        return h("div", { class: {
                'card': true,
                'isCurrent': isCurrent,
                'isBehind': !isCurrent && !this.isSwiped(cardIndex),
                'swiping': this.swipingClass !== '',
                [this.swipingClass]: this.isCardIndexCurrent[cardIndex]
            }, style: { 'transform': this.transformString(cardIndex) }, "data-index": cardIndex, "data-title": this.values[cardIndex] },
            this.mode !== 'text' && h("yoo-img", { type: "back", src: cloudinary(this.images[cardIndex]._downloadURL, 250, 385) }),
            h("h3", { class: 'title ' + this.mode }, this.renderCardText(cardIndex)));
    }
    renderInstructionsContainer() {
        return h("div", { class: "instructions" },
            h("div", { class: "texts" },
                h("div", { class: "title" }, this.label),
                h("div", { class: "description" }, translate(this.description || 'CARDSWIPEDEFAULTINSTRUCTIONS'))),
            h("div", { class: "categories" },
                h("div", { class: "category left" },
                    h("div", { class: "icon" },
                        h("yoo-icon", { class: "yo-big-arrow-left" })),
                    h("div", { class: "name left" }, this.categories && this.categories[SWIPE_OPTIONS.SWIPED_LEFT_INDEX]),
                    h("div", { class: "direction" }, translate('SWIPELEFT'))),
                h("div", { class: "category center" },
                    h("div", { class: "icon" },
                        h("yoo-icon", { class: "yo-swipe" }))),
                h("div", { class: "category right" },
                    h("div", { class: "icon" },
                        h("yoo-icon", { class: "yo-big-arrow-right" })),
                    h("div", { class: "name right" }, this.categories && this.categories[SWIPE_OPTIONS.SWIPED_RIGHT_INDEX]),
                    h("div", { class: "direction" }, translate('SWIPERIGHT')))),
            this.instructionsDocument &&
                h("div", { class: "document" },
                    h("div", { class: "document-title" }, translate('ATTACHMENTS')),
                    h("yoo-form-document", { document: this.instructionsDocument, readonly: true, onInputChanged: (ev) => ev.stopPropagation() })));
    }
    renderButtons() {
        return (h("div", { class: "button-container" },
            this.showInstructions && h("yoo-button", { disabled: false, class: "danger-light", text: "START", onClick: () => this.hideInstructions() }),
            !this.showInstructions &&
                h("div", { class: "swipe-buttons" },
                    h("yoo-button", { icon: "yo-big-arrow-left", class: 'centered swipe-left', disabled: this.areAllCardsSwiped(), onClick: () => this.onClickArrow(SWIPE_OPTIONS.SWIPED_LEFT) }),
                    h("yoo-button", { icon: "yo-undo", class: 'centered undo-swipe', disabled: this.isCurrentCardIndexFirst(), onClick: () => this.unSwipeCard() }),
                    h("yoo-button", { icon: "yo-big-arrow-right", class: 'centered swipe-right', disabled: this.areAllCardsSwiped(), onClick: () => this.onClickArrow(SWIPE_OPTIONS.SWIPED_RIGHT) }))));
    }
    renderEditable() {
        return (h("div", { class: {
                'outer-container': true,
                [this.swipingClass]: true,
                'with-instructions': this.showInstructions,
                'empty': this.areAllCardsSwiped()
            } },
            this.showInstructions ? this.renderInstructionsContainer() : h("div", { class: "cards" },
                " ",
                this.values.map((val, i) => this.renderCard(i, this.isCardIndexCurrent[i])),
                " "),
            this.renderButtons()));
    }
    renderReadonly() {
        return h("div", { class: "readonly" }, this.categories.map((cat, i) => {
            if (this.value[i] && this.answer[i]) {
                return (h("ul", { class: "category" },
                    h("li", null,
                        cat,
                        h("ul", { class: "values" }, this.value[i].map((v) => h("li", { class: this.answer[i].indexOf(v) >= 0 ? 'success' : 'danger' }, v))))));
            }
            else {
                return null;
            }
        }));
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-swipe-cards"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "answer": {
            "type": "Any",
            "attr": "answer"
        },
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "cardPositions": {
            "state": true
        },
        "categories": {
            "type": "Any",
            "attr": "categories",
            "mutable": true
        },
        "description": {
            "type": String,
            "attr": "description"
        },
        "host": {
            "elementRef": true
        },
        "images": {
            "type": "Any",
            "attr": "images",
            "mutable": true
        },
        "instructionsDocument": {
            "type": "Any",
            "attr": "instructions-document"
        },
        "isCardIndexCurrent": {
            "state": true
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "mode": {
            "type": String,
            "attr": "mode"
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
        "showInstructions": {
            "state": true
        },
        "swipingClass": {
            "state": true
        },
        "validators": {
            "type": "Any",
            "attr": "validators"
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
    static get style() { return "/**style-placeholder:yoo-form-swipe-cards:**/"; }
}
