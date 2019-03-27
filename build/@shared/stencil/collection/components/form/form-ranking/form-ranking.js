import { Draggable, TweenLite } from 'gsap/all';
import { setValueAndValidateInput, getAppContext } from '../../../utils/';
export class YooFormRankingComponent {
    constructor() {
        this.rowsMargin = 10; // procentual margin between items
    }
    componentWillLoad() {
        this.items = [...this.values];
    }
    componentDidLoad() {
        this.prepareItems(this.readonly);
    }
    componentDidUpdate() {
        this.prepareItems(true);
    }
    prepareItems(calcBadges = false) {
        const listItems = Array.from(this.host.shadowRoot.querySelectorAll('.list-item'));
        this.rowHeight = this.calcRowHeight(listItems, this.rowsMargin);
        if (!this.readonly) {
            this.sortables = listItems.map((el, index) => this.sortable(el, index));
        }
        else {
            listItems.forEach((el, index) => this.setRowPosition(el, index, this.rowHeight));
        }
        if (calcBadges) {
            this.calcBadgesValues(listItems);
        }
    }
    calcRowHeight(elements, rowsMargin) {
        const count = elements.length;
        const totalHeight = elements.reduce((acc, el) => acc + el.offsetHeight, 0);
        return (totalHeight / count) * (100 / (100 - rowsMargin));
    }
    validate() {
        let isValid = true;
        let isCompleted = true;
        if (this.answers && this.answers.length) {
            isCompleted = this.value.length === this.answers.length;
        }
        if (this.required && !isCompleted) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validityChanged.emit(isValid);
            this.validity = isValid;
        }
        return this.validity;
    }
    updateAnswer() {
        this.value = this.items;
        setValueAndValidateInput(this.value, this);
    }
    calcBadgesValues(listItems) {
        // this is badges value fix
        // when the component is re-rendered because of this.value mutation, the badges stays with wrong value
        listItems.forEach((element, index) => {
            this.setBadgeValue(element.querySelector('.badge'), index);
        });
    }
    setBadgeValue(badgeElement, index) {
        badgeElement.textContent = (index + 1).toString();
        badgeElement.classList.add('active');
    }
    /**
     * This function apply sortable ability to element.
     * All necessary logic is encapsulated in this function
     * and can be moved into separate class and reused somewhere else.
     */
    sortable(element, index) {
        const contentElement = element.querySelector('.item-content');
        const badgeElement = element.querySelector('.badge');
        const totalItems = this.items.length;
        const rowHeight = this.rowHeight;
        const sortable = {
            dragger: null,
            element: element,
            index: index,
            setIndex: null
        };
        const animation = TweenLite.to(contentElement, 0.3, {
            boxShadow: 'rgba(40, 47, 54, 0.07) 0px 16px 32px 0px',
            force3D: true,
            scale: 1.1,
            paused: true
        });
        const dragStartAction = (scope) => {
            animation.play();
            scope.update();
        };
        const moveAnimation = () => {
            TweenLite.to(element, 0.3, { y: sortable.index * rowHeight });
        };
        const releaseAction = () => {
            animation.reverse();
            moveAnimation();
            this.updateAnswer();
        };
        const clickAction = () => {
            this.changeIndex(sortable, 0);
            this.updateAnswer();
        };
        const dragAction = (scope) => {
            // calculate the current index based on element's position
            const currentIndex = this.clamp(Math.round(scope.y / rowHeight), 0, totalItems - 1);
            if (currentIndex !== sortable.index) {
                this.changeIndex(sortable, currentIndex);
            }
        };
        const dragger = new Draggable(element, {
            onDragStart: function () { dragStartAction(this); },
            onRelease: function () { releaseAction(); },
            onDrag: function () { dragAction(this); },
            onClick: function () { clickAction(); },
            cursor: 'inherit',
            type: 'y'
        });
        sortable.dragger = dragger;
        const setIndex = (i) => {
            sortable.index = i;
            this.setBadgeValue(badgeElement, i);
            if (!dragger.isDragging) {
                moveAnimation();
            }
        };
        sortable.setIndex = setIndex;
        this.setRowPosition(element, index, rowHeight);
        return sortable;
    }
    setRowPosition(element, index, rowSize) {
        TweenLite.set(element, { y: index * rowSize });
    }
    changeIndex(item, to) {
        this.arrayMove(this.sortables, item.index, to);
        this.arrayMove(this.items, item.index, to);
        // re-indexing all sortables objects
        this.sortables.forEach((sortable, index) => sortable.setIndex(index));
    }
    arrayMove(array, from, to) {
        // changes an elements's position in array
        array.splice(to, 0, array.splice(from, 1)[0]);
    }
    clamp(value, a, b) {
        // clamps a value to a min/max
        return value < a ? a : (value > b ? b : value);
    }
    renderToggleIcon() {
        if (this.readonly) {
            return;
        }
        return (h("yoo-icon", { class: 'yo-ranking-toggle' }));
    }
    renderItem(value, index) {
        return (h("div", { class: "list-item" },
            h("div", { class: "item-content" },
                h("span", { class: "badge" }, this.readonly && (index + 1)),
                h("span", null, value),
                h("span", { class: "icon" }, this.renderToggleIcon()))));
    }
    renderItems(values) {
        return values.map((value, index) => this.renderItem(value, index));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        const containerStyle = {
            height: (this.values.length * 2.8125) + 'rem'
        };
        return (h("div", { class: "outer-container", style: containerStyle }, this.renderItems(this.readonly ? this.value : this.items)));
    }
    static get is() { return "yoo-form-ranking"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "answers": {
            "type": "Any",
            "attr": "answers"
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
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
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
    static get style() { return "/**style-placeholder:yoo-form-ranking:**/"; }
}
