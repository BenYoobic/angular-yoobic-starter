import { h } from '../design-system.core.js';

import { aN as setValidator, aj as isArray, aQ as setValueAndValidateInput, L as querySelectorDeep, ch as sum, c3 as isNil, _ as cloudinary, m as translate } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';
import { a as interact } from './chunk-3d0cf4d4.js';

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
class YooFormSwipeCardsComponent {
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
    static get style() { return ":host .outer-container {\n  min-height: 510px;\n  padding-top: var(--padding-30, 1.875rem);\n  -webkit-transition: background-color 0.1s ease-in;\n  transition: background-color 0.1s ease-in;\n  background: #2b3648; }\n  :host .outer-container .card:nth-child(1) {\n    -webkit-transform: translateY(0vh) scale(1);\n    transform: translateY(0vh) scale(1);\n    z-index: 10; }\n  :host .outer-container .card:nth-child(2) {\n    -webkit-transform: translateY(-3.3vh) scale(0.9);\n    transform: translateY(-3.3vh) scale(0.9);\n    z-index: 9; }\n  :host .outer-container .card:nth-child(3) {\n    -webkit-transform: translateY(-6.6vh) scale(0.8);\n    transform: translateY(-6.6vh) scale(0.8);\n    z-index: 8; }\n  :host .outer-container .card:nth-child(4) {\n    -webkit-transform: translateY(-9.9vh) scale(0.7);\n    transform: translateY(-9.9vh) scale(0.7);\n    z-index: 7; }\n  :host .outer-container .card:nth-child(5) {\n    -webkit-transform: translateY(-13.2vh) scale(0.6);\n    transform: translateY(-13.2vh) scale(0.6);\n    z-index: 6; }\n  :host .outer-container .card:nth-child(6) {\n    -webkit-transform: translateY(-16.5vh) scale(0.5);\n    transform: translateY(-16.5vh) scale(0.5);\n    z-index: 5; }\n  :host .outer-container .card:nth-child(7) {\n    -webkit-transform: translateY(-19.8vh) scale(0.4);\n    transform: translateY(-19.8vh) scale(0.4);\n    z-index: 4; }\n  :host .outer-container .card:nth-child(8) {\n    -webkit-transform: translateY(-23.1vh) scale(0.3);\n    transform: translateY(-23.1vh) scale(0.3);\n    z-index: 3; }\n  :host .outer-container .card:nth-child(9) {\n    -webkit-transform: translateY(-26.4vh) scale(0.2);\n    transform: translateY(-26.4vh) scale(0.2);\n    z-index: 2; }\n  :host .outer-container .card:nth-child(10) {\n    -webkit-transform: translateY(-29.7vh) scale(0.1);\n    transform: translateY(-29.7vh) scale(0.1);\n    z-index: 1; }\n  :host .outer-container yoo-button.small {\n    --border-radius-container: 50%;\n    --height-container: 2.5rem;\n    --min-height-container: 2.5rem;\n    --width-container: 2.45rem;\n    --min-width-container: 2.45rem;\n    --margin-container: 0; }\n  :host .outer-container .instructions {\n    min-height: 540px; }\n    :host .outer-container .instructions .texts {\n      min-height: 105px;\n      padding: var(--padding-10, 0.625rem) 0.9375rem 0 0.9375rem;\n      background: #2b3648; }\n      :host .outer-container .instructions .texts .title {\n        color: var(--light, #FFFFFF);\n        font-size: var(--font-m, 15px);\n        font-weight: bold;\n        line-height: 1.33; }\n      :host .outer-container .instructions .texts .description {\n        padding: 5px 0 45px 0;\n        color: var(--stable, #adadad); }\n    :host .outer-container .instructions .categories {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: justify;\n      justify-content: space-between;\n      margin-bottom: -0.9375rem;\n      padding-top: var(--padding-20, 1.25rem);\n      background-color: var(--light, #FFFFFF); }\n      :host .outer-container .instructions .categories .category {\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-direction: column;\n        flex-direction: column;\n        justify-items: center;\n        height: 150px;\n        padding: 0 0.9375rem;\n        color: var(--stable, #adadad); }\n        :host .outer-container .instructions .categories .category .icon {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-pack: center;\n          justify-content: center;\n          padding-bottom: var(--padding-20, 1.25rem); }\n          :host .outer-container .instructions .categories .category .icon yoo-icon {\n            padding: 0.61rem;\n            border: none;\n            border-radius: 50%;\n            font-size: var(--font-l, 17px); }\n            :host .outer-container .instructions .categories .category .icon yoo-icon.yo-big-arrow-left {\n              background: var(--danger-light, #F46885);\n              color: var(--light, #FFFFFF); }\n            :host .outer-container .instructions .categories .category .icon yoo-icon.yo-swipe {\n              color: #e1e1e1;\n              font-size: 50px; }\n            :host .outer-container .instructions .categories .category .icon yoo-icon.yo-big-arrow-right {\n              background: var(--light-orange, #fcae49);\n              color: var(--light, #FFFFFF); }\n        :host .outer-container .instructions .categories .category .name {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-pack: center;\n          justify-content: center;\n          padding-bottom: var(--padding-5, 0.3125rem); }\n          :host .outer-container .instructions .categories .category .name.left {\n            color: var(--danger-light, #F46885); }\n          :host .outer-container .instructions .categories .category .name.right {\n            color: var(--light-orange, #fcae49); }\n        :host .outer-container .instructions .categories .category .direction {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-pack: center;\n          justify-content: center;\n          color: var(--stable, #adadad); }\n        :host .outer-container .instructions .categories .category.center {\n          -ms-flex-pack: center;\n          justify-content: center; }\n    :host .outer-container .instructions .document {\n      background-color: var(--light, #FFFFFF); }\n      :host .outer-container .instructions .document .document-title {\n        padding: 0 0.9375rem;\n        font-size: var(--font-m, 15px); }\n      :host .outer-container .instructions .document yoo-form-document {\n        --outer-container-padding: 0.9375rem 0.9375rem;\n        width: calc(100% - 0.9375rem); }\n  :host .outer-container .card {\n    border-radius: 15px;\n    -webkit-box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.05);\n    box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.05);\n    position: absolute;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    display: flex;\n    width: 250px;\n    max-width: 250px;\n    height: 385px;\n    max-height: 385px;\n    margin: auto;\n    -webkit-transform-origin: 50%, 100%;\n    transform-origin: 50%, 100%;\n    -webkit-transition: background-color 0.1s ease-in, -webkit-transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    transition: background-color 0.1s ease-in, -webkit-transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    transition: background-color 0.1s ease-in, transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    transition: background-color 0.1s ease-in, transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275), -webkit-transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    background: var(--light, #FFFFFF);\n    color: transparent;\n    -webkit-box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);\n    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.15);\n    opacity: 1;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    pointer-events: none;\n    will-change: transform, opacity; }\n    :host .outer-container .card.isCurrent {\n      -webkit-transform: translateY(33vh) scale(0);\n      transform: translateY(33vh) scale(0);\n      color: var(--black, #000000);\n      pointer-events: auto; }\n      :host .outer-container .card.isCurrent yoo-img {\n        border-radius: 15px;\n        -webkit-box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.05);\n        box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.05);\n        width: 250px;\n        height: 385px; }\n      :host .outer-container .card.isCurrent .title {\n        position: absolute;\n        width: 100%;\n        margin: 0 0 15px;\n        font-size: 27px;\n        font-weight: 600;\n        text-align: center; }\n        :host .outer-container .card.isCurrent .title.image {\n          color: transparent; }\n        :host .outer-container .card.isCurrent .title.imagetext {\n          bottom: 0;\n          height: 100px;\n          margin: 0;\n          border-bottom-left-radius: 15px;\n          border-bottom-right-radius: 15px;\n          background: var(--light, #FFFFFF);\n          line-height: 100px; }\n      :host .outer-container .card.isCurrent.swiping {\n        color: var(--light, #FFFFFF); }\n        :host .outer-container .card.isCurrent.swiping yoo-img {\n          visibility: hidden; }\n        :host .outer-container .card.isCurrent.swiping .title.image {\n          color: var(--light, #FFFFFF); }\n        :host .outer-container .card.isCurrent.swiping .title.imagetext {\n          display: -ms-flexbox;\n          display: flex;\n          -ms-flex-direction: column;\n          flex-direction: column;\n          -ms-flex-pack: center;\n          justify-content: center;\n          height: 100%;\n          background: transparent; }\n      :host .outer-container .card.isCurrent.swiping-right {\n        background: var(--energized-light, #fcae49); }\n      :host .outer-container .card.isCurrent.swiping-left {\n        background: var(--danger-light, #F46885); }\n    :host .outer-container .card.isBehind {\n      background: transparent;\n      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.35)), to(rgba(255, 255, 255, 0)));\n      background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0));\n      color: transparent;\n      -webkit-box-shadow: none;\n      box-shadow: none; }\n  :host .outer-container .cards {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n    justify-content: center; }\n  :host .outer-container .cards, :host .outer-container .cards * {\n    -ms-touch-action: none;\n    touch-action: none; }\n  :host .outer-container.swiping-right {\n    background: #fcae49; }\n  :host .outer-container.swiping-left {\n    background: #e6627d; }\n  :host .outer-container.with-instructions {\n    padding-top: 0;\n    background: transparent; }\n  :host .outer-container.empty {\n    background: transparent; }\n    :host .outer-container.empty .cards .card {\n      visibility: hidden; }\n  :host .outer-container .button-container {\n    display: -ms-flexbox;\n    display: flex;\n    position: absolute;\n    bottom: 0;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n    -ms-flex-pack: space-evenly;\n    justify-content: space-evenly;\n    width: 100%;\n    height: 150px;\n    background: var(--light, #FFFFFF); }\n    :host .outer-container .button-container .swipe-buttons {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-pack: center;\n      justify-content: center; }\n      :host .outer-container .button-container .swipe-buttons yoo-button.centered {\n        --border-radius-container: 50%;\n        --font-size-icon: var(--icon-large, 24px);\n        --height-container: 4.375rem;\n        --min-height-container: 4.375rem;\n        --width-container: 4.375rem;\n        --min-width-container: 4.375rem;\n        margin: 0 var(--padding-10, 0.625rem); }\n        :host .outer-container .button-container .swipe-buttons yoo-button.centered.swipe-left {\n          --color-value: var(--danger-light, #F46885); }\n        :host .outer-container .button-container .swipe-buttons yoo-button.centered.swipe-right {\n          --color-value: var(--energized-light, #fcae49); }\n\n:host .readonly .values li.success {\n  color: var(--success, #04CC99); }\n\n:host .readonly .values li.danger {\n  color: var(--danger, #ff625f); }"; }
}

export { YooFormSwipeCardsComponent as YooFormSwipeCards };
