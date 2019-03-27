import interact from 'interactjs';
// New draggable slider - Implemented for photo-editor and destinated to replace 
// form-slider and slider-scale component with the refactoring  
export class YooSliderComponent {
    constructor() {
        this.isDoubleSlider = false;
        this.showTriangleBackground = false;
        this.secondaryValue = 0;
        this.minValue = 0;
        this.maxValue = 10;
        this.primaryValue = 0;
    }
    componentDidLoad() {
        this.getInitialThumbPosition();
        this.getSlotDimension();
        this.initInteractDraggable(this.thumbPrimaryElement);
        if (this.isDoubleSlider) {
            this.initInteractDraggable(this.thumbSecondaryElement);
        }
    }
    componentDidUpdate() {
        this.initInteractDraggable(this.thumbPrimaryElement);
    }
    initInteractDraggable(draggableContainer) {
        interact(draggableContainer)
            .draggable({
            restrict: {
                restriction: this.sliderElement
            },
            inertia: true,
            onmove: (ev) => this.onTouch(ev)
        });
    }
    isHorizontal() {
        return this.orientation === 'horizontal';
    }
    onTouch(event) {
        const target = event.target;
        const currentSlot = this.getCurrentSlot(event);
        const currentValue = currentSlot + this.minValue;
        const axis = this.isHorizontal() ? 'x' : 'y';
        const coords = Math.round((parseFloat(target.getAttribute(`data-${axis}`)) || 1) + event[`d${axis}`]);
        const xMove = (axis === 'x') ? coords : 0;
        const yMove = (axis === 'y') ? coords : 0;
        target.style.webkitTransform = target.style.transform = `translate(${xMove}px, ${yMove}px)`;
        target.setAttribute(`data-${axis}`, coords);
        this.singleSliderChanged.emit(currentValue);
    }
    getInitialThumbPosition() {
        const sliderHeight = this.sliderElement.clientHeight;
        const thumbStep = sliderHeight / this.maxValue;
        const currentThumbStep = this.primaryValue * thumbStep;
        const currentThumbPosition = sliderHeight - currentThumbStep;
        this.thumbPrimaryElement.style.top = `${currentThumbPosition}px`;
    }
    getCurrentSlot(event) {
        let currentSlot;
        if (this.isHorizontal()) {
            const currentThumbXPosition = event.clientX;
            currentSlot = Math.round(currentThumbXPosition / this.slotDimension);
        }
        else {
            const currentThumbYPosition = event.clientY;
            const sliderBottomPosition = this.sliderElement.getBoundingClientRect().bottom;
            currentSlot = Math.round((sliderBottomPosition - currentThumbYPosition) / this.slotDimension);
        }
        return currentSlot <= 0 ? 0 : currentSlot >= this.maxValue ? this.maxValue : currentSlot;
    }
    getSlotDimension() {
        let sliderElementDimension = this.isHorizontal() ? this.sliderElement.clientWidth : this.sliderElement.clientHeight;
        let slotElementDimension = Math.round(sliderElementDimension / (this.maxValue - this.minValue));
        this.slotDimension = slotElementDimension;
    }
    renderPrimaryThumb() {
        return h("div", { class: "slider-thumb primary", ref: el => (this.thumbPrimaryElement = el) });
    }
    renderSecondaryThumb() {
        return h("div", { class: "slider-thumb secondary", ref: el => (this.thumbSecondaryElement = el) });
    }
    render() {
        return h("div", null,
            h("div", { class: "slider-container" },
                h("div", { class: 'slider ' + this.orientation, ref: el => (this.sliderElement = el) },
                    this.showTriangleBackground ?
                        h("div", { class: "triangle-background" }) :
                        h("div", { class: "line-background" }),
                    this.renderPrimaryThumb())));
    }
    static get is() { return "yoo-slider"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "isDoubleSlider": {
            "type": Boolean,
            "attr": "is-double-slider"
        },
        "maxValue": {
            "type": Number,
            "attr": "max-value"
        },
        "minValue": {
            "type": Number,
            "attr": "min-value"
        },
        "orientation": {
            "type": String,
            "attr": "orientation"
        },
        "primaryValue": {
            "type": Number,
            "attr": "primary-value"
        },
        "secondaryValue": {
            "type": Number,
            "attr": "secondary-value"
        },
        "showTriangleBackground": {
            "type": Boolean,
            "attr": "show-triangle-background"
        },
        "slotDimension": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "singleSliderChanged",
            "method": "singleSliderChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-slider:**/"; }
}
