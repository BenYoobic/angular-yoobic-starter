import { getElementDimensions, Hammer, isCordova, isIOS } from '../../../utils';
export class YooZoomComponent {
    constructor() {
        this.containerWidth = 0;
        this.containerHeight = 0;
        this.currentScale = 1;
        this.adjustScale = 1;
        this.adjustDeltaX = 0;
        this.adjustDeltaY = 0;
        this.maxScale = 25;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
        this.transforms = [];
    }
    componentWillLoad() {
        if (this.initialScale) {
            this.currentScale = this.initialScale;
        }
    }
    componentDidLoad() {
        // In Safari, width and height are always 0 so when in Cordova and iOS, we use the window height instead
        // Zoom is only used in mobile context
        if (isCordova() && isIOS()) {
            this.containerHeight = window.innerHeight;
            this.containerWidth = window.innerWidth;
        }
        else {
            const { height, width } = getElementDimensions(this.parentContainer);
            this.containerHeight = height;
            this.containerWidth = width;
        }
        this.emitTransforms();
        this.hammerCtrl = new Hammer(this.childContainer);
        this.addGestureRecognizers();
        this.initGestures();
    }
    initGestures() {
        this.hammerCtrl.on('doubletap', (event) => {
            this.handleDoubleTap(event);
        });
        this.hammerCtrl.on('pinch', (event) => {
            this.lockPan = false;
            // When we are no longer in the zoomed state
            if (event.scale <= 1) {
                this.pinched.emit(false);
            }
            else {
                this.pinched.emit(true);
            }
            this.setTransform(event);
        });
        this.hammerCtrl.on('pinchend', (event) => {
            if (!this.lockPan) {
                this.saveTransform();
            }
        });
        this.hammerCtrl.on('pan', (event) => {
            if (!this.lockPan) {
                this.setTransform(event);
            }
        });
        this.hammerCtrl.on('panend', (event) => {
            this.saveTransform();
        });
    }
    addGestureRecognizers() {
        let singleTap = new Hammer.Tap({ event: 'singletap' });
        let doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2 });
        this.hammerCtrl.add([doubleTap, singleTap]);
        this.hammerCtrl.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
        this.hammerCtrl.get('pinch').set({ enable: true });
        doubleTap.recognizeWith(singleTap);
        singleTap.requireFailure(doubleTap);
    }
    handleDoubleTap(event) {
        this.transforms = [];
        this.adjustScale += 1;
        if (this.adjustScale > 4) {
            this.adjustScale = 1;
        }
        this.lockPan = false;
        this.transforms.push('scale(' + this.adjustScale + ')');
        if (this.parentContainer && this.parentContainer.style) {
            this.parentContainer.style.transform = this.transforms.join(' ');
        }
    }
    setTransform(event) {
        this.transforms = [];
        this.currentScale = this.adjustScale * event.scale;
        this.currentDeltaX = this.adjustDeltaX + (event.deltaX / this.currentScale);
        this.currentDeltaY = this.adjustDeltaY + (event.deltaY / this.currentScale);
        // Revert to original scale if < 1 - this might not be needed
        if (this.currentScale < 1) {
            this.currentScale = 1;
            this.currentDeltaX = 0;
            this.currentDeltaY = 0;
        }
        this.limitDraggingAreaOnPan();
        if (this.currentScale > this.maxScale) {
            this.currentScale = this.maxScale;
        }
        this.transforms.push(`scale(${this.currentScale})`);
        this.transforms.push(`translate(${this.currentDeltaX}px, ${this.currentDeltaY}px)`);
        if (this.parentContainer && this.parentContainer.style) {
            this.parentContainer.style.transform = this.transforms.join(' ');
        }
        this.emitTransforms();
    }
    emitTransforms() {
        this.transformsChanged.emit({
            currentScale: this.currentScale,
            adjustDeltaX: this.currentDeltaX,
            adjustDeltaY: this.currentDeltaY
        });
    }
    limitDraggingAreaOnPan() {
        // Create the drag boundary
        let dragWidthLimit = this.containerWidth * (this.currentScale - 1) / this.currentScale / 2;
        let dragHeightLimit = this.containerHeight * (this.currentScale - 1) / this.currentScale / 2;
        if (this.currentDeltaX > dragWidthLimit) {
            this.currentDeltaX = dragWidthLimit;
        }
        else if (this.currentDeltaX < -dragWidthLimit) {
            this.currentDeltaX = -dragWidthLimit;
        }
        if (this.currentDeltaY > dragHeightLimit) {
            this.currentDeltaY = dragHeightLimit;
        }
        else if (this.currentDeltaY < -dragHeightLimit) {
            this.currentDeltaY = -dragHeightLimit;
        }
    }
    saveTransform() {
        // Saving the final transforms for adjustment next time the user interacts.
        this.adjustScale = this.currentScale;
        this.adjustDeltaX = this.currentDeltaX;
        this.adjustDeltaY = this.currentDeltaY;
    }
    render() {
        return (h("div", { class: "zoom-container", ref: (el) => this.parentContainer = el },
            h("div", { class: "zoom-container-child", ref: (el) => this.childContainer = el },
                h("slot", null))));
    }
    static get is() { return "yoo-zoom"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "host": {
            "elementRef": true
        },
        "initialScale": {
            "type": Number,
            "attr": "initial-scale"
        },
        "lockPan": {
            "type": Boolean,
            "attr": "lock-pan",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "pinched",
            "method": "pinched",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "transformsChanged",
            "method": "transformsChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:yoo-zoom:**/"; }
}
