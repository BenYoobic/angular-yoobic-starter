const h = window.DesignSystem.h;

import { aN as setValidator, a_ as showModal, aQ as setValueAndValidateInput, _ as cloudinary, Q as closeModal, m as translate, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

class YooFormSignaturePadComponent {
    constructor() {
        this.validators = [];
    }
    componentWillLoad() {
        setValidator(this);
    }
    onShowDialog() {
        let dialog = document.createElement('yoo-form-signature-pad-dialog');
        dialog.value = this.value;
        dialog.readonly = this.readonly;
        showModal(dialog).then(ret => {
            if (ret) {
                // this.value = ret.data;
                setValueAndValidateInput(ret.data, this);
            }
            dialog = null;
        });
    }
    renderEditable() {
        return h("div", { class: "outer-container" },
            h("div", { class: "signature-container", onClick: (ev) => this.onShowDialog() },
                this.required ? h("span", { class: "required" }, "*") : null,
                this.value ? h("yoo-img", { type: "back", class: "preview", src: cloudinary(this.value, 500, 500) }) : null,
                this.value ? h("div", { class: "overlay" }) : null,
                h("yoo-icon", { class: 'yo-signature' + (this.value ? ' light' : ' success') })));
    }
    renderReadonly() {
        return this.value ? h("div", { class: "readonly" },
            h("div", { class: "signature-container", onClick: () => this.onShowDialog() },
                h("yoo-img", { type: "back", class: "preview", src: cloudinary(this.value, 500, 500) }))) : null;
    }
    hostData() {
        return {
            class: {
                'swiper-no-swiping': true
            }
        };
    }
    render() {
        return this.readonly ? this.renderReadonly() : this.renderEditable();
    }
    static get is() { return "yoo-form-signature-pad"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "asyncValidators": {
            "type": "Any",
            "attr": "async-validators"
        },
        "host": {
            "elementRef": true
        },
        "isHistory": {
            "type": Boolean,
            "attr": "is-history"
        },
        "name": {
            "type": String,
            "attr": "name"
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
    static get style() { return ":host {\n  display: block; }\n  :host .readonly .signature-container,\n  :host .outer-container .signature-container {\n    position: relative;\n    width: var(--camera-container-height, 98px);\n    height: var(--camera-container-height, 98px);\n    border: 1px solid var(--input-container-border-color, #E6E6E6);\n    border-radius: 0.5rem;\n    cursor: pointer;\n    position: relative; }\n    :host .readonly .signature-container .required,\n    :host .outer-container .signature-container .required {\n      top: auto;\n      right: auto;\n      bottom: auto;\n      left: 0.625rem;\n      position: absolute;\n      color: var(--success, #04CC99);\n      font-size: 15px; }\n    :host .readonly .signature-container yoo-icon,\n    :host .outer-container .signature-container yoo-icon {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n      font-size: var(--camera-container-size, 30px); }\n      :host .readonly .signature-container yoo-icon.light,\n      :host .outer-container .signature-container yoo-icon.light {\n        color: var(--light, #FFFFFF); }\n      :host .readonly .signature-container yoo-icon.success,\n      :host .outer-container .signature-container yoo-icon.success {\n        color: var(--success, #04CC99); }\n    :host .readonly .signature-container .preview,\n    :host .readonly .signature-container .edit,\n    :host .readonly .signature-container .overlay,\n    :host .outer-container .signature-container .preview,\n    :host .outer-container .signature-container .edit,\n    :host .outer-container .signature-container .overlay {\n      top: 0;\n      right: auto;\n      bottom: auto;\n      left: auto;\n      position: absolute;\n      width: var(--camera-container-height, 98px);\n      height: var(--camera-container-height, 98px);\n      border-radius: 0.5rem; }\n      :host .readonly .signature-container .preview.edit,\n      :host .readonly .signature-container .edit.edit,\n      :host .readonly .signature-container .overlay.edit,\n      :host .outer-container .signature-container .preview.edit,\n      :host .outer-container .signature-container .edit.edit,\n      :host .outer-container .signature-container .overlay.edit {\n        top: 0;\n        right: auto;\n        bottom: auto;\n        left: 0;\n        position: absolute;\n        z-index: 0; }\n    :host .readonly .signature-container .overlay,\n    :host .outer-container .signature-container .overlay {\n      background: var(--dark-two, #212936);\n      opacity: 0.5; }\n    :host .readonly .signature-container yoo-icon,\n    :host .outer-container .signature-container yoo-icon {\n      font-size: 30px; }\n  :host .readonly {\n    padding: 0.5rem;\n    padding-left: 0;\n    padding-bottom: 0; }\n\n:host(.history) {\n  margin: 0 !important;\n  padding: 0 !important;\n  border: none !important; }\n  :host(.history) .readonly {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n    -ms-flex-align: center;\n    align-items: center;\n    padding: 0;\n    padding-bottom: 2px; }\n    :host(.history) .readonly .signature-container {\n      width: 30px;\n      height: 30px;\n      border: none; }\n      :host(.history) .readonly .signature-container .preview {\n        width: 30px;\n        height: 30px;\n        border: 1px solid var(--stable, #adadad);\n        border-radius: 2px !important; }"; }
}

/*!
 * Signature Pad v3.0.0-beta.3 | https://github.com/szimek/signature_pad
 * (c) 2018 Szymon Nowak | Released under the MIT license
 */

class Point {
    constructor(x, y, time) {
        this.x = x;
        this.y = y;
        this.time = time || Date.now();
    }
    distanceTo(start) {
        return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
    }
    equals(other) {
        return this.x === other.x && this.y === other.y && this.time === other.time;
    }
    velocityFrom(start) {
        return (this.time !== start.time) ? this.distanceTo(start) / (this.time - start.time) : 0;
    }
}

class Bezier {
    constructor(startPoint, control2, control1, endPoint, startWidth, endWidth) {
        this.startPoint = startPoint;
        this.control2 = control2;
        this.control1 = control1;
        this.endPoint = endPoint;
        this.startWidth = startWidth;
        this.endWidth = endWidth;
    }
    static fromPoints(points, widths) {
        const c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
        const c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
        return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
    }
    static calculateControlPoints(s1, s2, s3) {
        const dx1 = s1.x - s2.x;
        const dy1 = s1.y - s2.y;
        const dx2 = s2.x - s3.x;
        const dy2 = s2.y - s3.y;
        const m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
        const m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };
        const l1 = Math.sqrt((dx1 * dx1) + (dy1 * dy1));
        const l2 = Math.sqrt((dx2 * dx2) + (dy2 * dy2));
        const dxm = (m1.x - m2.x);
        const dym = (m1.y - m2.y);
        const k = l2 / (l1 + l2);
        const cm = { x: m2.x + (dxm * k), y: m2.y + (dym * k) };
        const tx = s2.x - cm.x;
        const ty = s2.y - cm.y;
        return {
            c1: new Point(m1.x + tx, m1.y + ty),
            c2: new Point(m2.x + tx, m2.y + ty),
        };
    }
    length() {
        const steps = 10;
        let length = 0;
        let px;
        let py;
        for (let i = 0; i <= steps; i += 1) {
            const t = i / steps;
            const cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
            const cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
            if (i > 0) {
                const xdiff = cx - px;
                const ydiff = cy - py;
                length += Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
            }
            px = cx;
            py = cy;
        }
        return length;
    }
    point(t, start, c1, c2, end) {
        return (start * (1.0 - t) * (1.0 - t) * (1.0 - t))
            + (3.0 * c1 * (1.0 - t) * (1.0 - t) * t)
            + (3.0 * c2 * (1.0 - t) * t * t)
            + (end * t * t * t);
    }
}

function throttle(fn, wait = 250) {
    let previous = 0;
    let timeout = null;
    let result;
    let storedContext;
    let storedArgs;
    const later = () => {
        previous = Date.now();
        timeout = null;
        result = fn.apply(storedContext, storedArgs);
        if (!timeout) {
            storedContext = null;
            storedArgs = [];
        }
    };
    return function (...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        storedContext = this;
        storedArgs = args;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = fn.apply(storedContext, storedArgs);
            if (!timeout) {
                storedContext = null;
                storedArgs = [];
            }
        }
        else if (!timeout) {
            timeout = window.setTimeout(later, remaining);
        }
        return result;
    };
}

class SignaturePad {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.options = options;
        this._handleMouseDown = (event) => {
            if (event.which === 1) {
                this._mouseButtonDown = true;
                this._strokeBegin(event);
            }
        };
        this._handleMouseMove = (event) => {
            if (this._mouseButtonDown) {
                this._strokeMoveUpdate(event);
            }
        };
        this._handleMouseUp = (event) => {
            if (event.which === 1 && this._mouseButtonDown) {
                this._mouseButtonDown = false;
                this._strokeEnd(event);
            }
        };
        this._handleTouchStart = (event) => {
            event.preventDefault();
            if (event.targetTouches.length === 1) {
                const touch = event.changedTouches[0];
                this._strokeBegin(touch);
            }
        };
        this._handleTouchMove = (event) => {
            event.preventDefault();
            const touch = event.targetTouches[0];
            this._strokeMoveUpdate(touch);
        };
        this._handleTouchEnd = (event) => {
            const wasCanvasTouched = event.target === this.canvas;
            if (wasCanvasTouched) {
                event.preventDefault();
                const touch = event.changedTouches[0];
                this._strokeEnd(touch);
            }
        };
        this.velocityFilterWeight = options.velocityFilterWeight || 0.7;
        this.minWidth = options.minWidth || 0.5;
        this.maxWidth = options.maxWidth || 2.5;
        this.throttle = ('throttle' in options ? options.throttle : 16);
        this.minDistance = ('minDistance' in options ? options.minDistance : 5);
        if (this.throttle) {
            this._strokeMoveUpdate = throttle(SignaturePad.prototype._strokeUpdate, this.throttle);
        }
        else {
            this._strokeMoveUpdate = SignaturePad.prototype._strokeUpdate;
        }
        this.dotSize = options.dotSize || function () {
            return (this.minWidth + this.maxWidth) / 2;
        };
        this.penColor = options.penColor || 'black';
        this.backgroundColor = options.backgroundColor || 'rgba(0,0,0,0)';
        this.onBegin = options.onBegin;
        this.onEnd = options.onEnd;
        this._ctx = canvas.getContext('2d');
        this.clear();
        this.on();
    }
    clear() {
        const ctx = this._ctx;
        const canvas = this.canvas;
        ctx.fillStyle = this.backgroundColor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this._data = [];
        this._reset();
        this._isEmpty = true;
    }
    fromDataURL(dataUrl, options = {}, callback) {
        const image = new Image();
        const ratio = options.ratio || window.devicePixelRatio || 1;
        const width = options.width || (this.canvas.width / ratio);
        const height = options.height || (this.canvas.height / ratio);
        this._reset();
        image.onload = () => {
            this._ctx.drawImage(image, 0, 0, width, height);
            if (callback) {
                callback();
            }
        };
        image.onerror = (error) => {
            if (callback) {
                callback(error);
            }
        };
        image.src = dataUrl;
        this._isEmpty = false;
    }
    toDataURL(type = 'image/png', encoderOptions) {
        switch (type) {
            case 'image/svg+xml':
                return this._toSVG();
            default:
                return this.canvas.toDataURL(type, encoderOptions);
        }
    }
    on() {
        this.canvas.style.touchAction = 'none';
        this.canvas.style.msTouchAction = 'none';
        if (window.PointerEvent) {
            this._handlePointerEvents();
        }
        else {
            this._handleMouseEvents();
            if ('ontouchstart' in window) {
                this._handleTouchEvents();
            }
        }
    }
    off() {
        this.canvas.style.touchAction = 'auto';
        this.canvas.style.msTouchAction = 'auto';
        this.canvas.removeEventListener('pointerdown', this._handleMouseDown);
        this.canvas.removeEventListener('pointermove', this._handleMouseMove);
        document.removeEventListener('pointerup', this._handleMouseUp);
        this.canvas.removeEventListener('mousedown', this._handleMouseDown);
        this.canvas.removeEventListener('mousemove', this._handleMouseMove);
        document.removeEventListener('mouseup', this._handleMouseUp);
        this.canvas.removeEventListener('touchstart', this._handleTouchStart);
        this.canvas.removeEventListener('touchmove', this._handleTouchMove);
        this.canvas.removeEventListener('touchend', this._handleTouchEnd);
    }
    isEmpty() {
        return this._isEmpty;
    }
    fromData(pointGroups) {
        this.clear();
        this._fromData(pointGroups, ({ color, curve }) => this._drawCurve({ color, curve }), ({ color, point }) => this._drawDot({ color, point }));
        this._data = pointGroups;
    }
    toData() {
        return this._data;
    }
    _strokeBegin(event) {
        const newPointGroup = {
            color: this.penColor,
            points: [],
        };
        this._data.push(newPointGroup);
        this._reset();
        this._strokeUpdate(event);
        if (typeof this.onBegin === 'function') {
            this.onBegin(event);
        }
    }
    _strokeUpdate(event) {
        const x = event.clientX;
        const y = event.clientY;
        const point = this._createPoint(x, y);
        const lastPointGroup = this._data[this._data.length - 1];
        const lastPoints = lastPointGroup.points;
        const lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
        const isLastPointTooClose = lastPoint ? point.distanceTo(lastPoint) <= this.minDistance : false;
        const color = lastPointGroup.color;
        if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
            const curve = this._addPoint(point);
            if (!lastPoint) {
                this._drawDot({ color, point });
            }
            else if (curve) {
                this._drawCurve({ color, curve });
            }
            lastPoints.push({
                time: point.time,
                x: point.x,
                y: point.y,
            });
        }
    }
    _strokeEnd(event) {
        this._strokeUpdate(event);
        if (typeof this.onEnd === 'function') {
            this.onEnd(event);
        }
    }
    _handlePointerEvents() {
        this._mouseButtonDown = false;
        this.canvas.addEventListener('pointerdown', this._handleMouseDown);
        this.canvas.addEventListener('pointermove', this._handleMouseMove);
        document.addEventListener('pointerup', this._handleMouseUp);
    }
    _handleMouseEvents() {
        this._mouseButtonDown = false;
        this.canvas.addEventListener('mousedown', this._handleMouseDown);
        this.canvas.addEventListener('mousemove', this._handleMouseMove);
        document.addEventListener('mouseup', this._handleMouseUp);
    }
    _handleTouchEvents() {
        this.canvas.addEventListener('touchstart', this._handleTouchStart);
        this.canvas.addEventListener('touchmove', this._handleTouchMove);
        this.canvas.addEventListener('touchend', this._handleTouchEnd);
    }
    _reset() {
        this._lastPoints = [];
        this._lastVelocity = 0;
        this._lastWidth = (this.minWidth + this.maxWidth) / 2;
        this._ctx.fillStyle = this.penColor;
    }
    _createPoint(x, y) {
        const rect = this.canvas.getBoundingClientRect();
        return new Point(x - rect.left, y - rect.top, new Date().getTime());
    }
    _addPoint(point) {
        const { _lastPoints } = this;
        _lastPoints.push(point);
        if (_lastPoints.length > 2) {
            if (_lastPoints.length === 3) {
                _lastPoints.unshift(_lastPoints[0]);
            }
            const widths = this._calculateCurveWidths(_lastPoints[1], _lastPoints[2]);
            const curve = Bezier.fromPoints(_lastPoints, widths);
            _lastPoints.shift();
            return curve;
        }
        return null;
    }
    _calculateCurveWidths(startPoint, endPoint) {
        const velocity = (this.velocityFilterWeight * endPoint.velocityFrom(startPoint))
            + ((1 - this.velocityFilterWeight) * this._lastVelocity);
        const newWidth = this._strokeWidth(velocity);
        const widths = {
            end: newWidth,
            start: this._lastWidth,
        };
        this._lastVelocity = velocity;
        this._lastWidth = newWidth;
        return widths;
    }
    _strokeWidth(velocity) {
        return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
    }
    _drawCurveSegment(x, y, width) {
        const ctx = this._ctx;
        ctx.moveTo(x, y);
        ctx.arc(x, y, width, 0, 2 * Math.PI, false);
        this._isEmpty = false;
    }
    _drawCurve({ color, curve }) {
        const ctx = this._ctx;
        const widthDelta = curve.endWidth - curve.startWidth;
        const drawSteps = Math.floor(curve.length()) * 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        for (let i = 0; i < drawSteps; i += 1) {
            const t = i / drawSteps;
            const tt = t * t;
            const ttt = tt * t;
            const u = 1 - t;
            const uu = u * u;
            const uuu = uu * u;
            let x = uuu * curve.startPoint.x;
            x += 3 * uu * t * curve.control1.x;
            x += 3 * u * tt * curve.control2.x;
            x += ttt * curve.endPoint.x;
            let y = uuu * curve.startPoint.y;
            y += 3 * uu * t * curve.control1.y;
            y += 3 * u * tt * curve.control2.y;
            y += ttt * curve.endPoint.y;
            const width = curve.startWidth + (ttt * widthDelta);
            this._drawCurveSegment(x, y, width);
        }
        ctx.closePath();
        ctx.fill();
    }
    _drawDot({ color, point }) {
        const ctx = this._ctx;
        const width = typeof this.dotSize === 'function' ? this.dotSize() : this.dotSize;
        ctx.beginPath();
        this._drawCurveSegment(point.x, point.y, width);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
    _fromData(pointGroups, drawCurve, drawDot) {
        for (const group of pointGroups) {
            const { color, points } = group;
            if (points.length > 1) {
                for (let j = 0; j < points.length; j += 1) {
                    const basicPoint = points[j];
                    const point = new Point(basicPoint.x, basicPoint.y, basicPoint.time);
                    this.penColor = color;
                    if (j === 0) {
                        this._reset();
                    }
                    const curve = this._addPoint(point);
                    if (curve) {
                        drawCurve({ color, curve });
                    }
                }
            }
            else {
                this._reset();
                drawDot({
                    color,
                    point: points[0],
                });
            }
        }
    }
    _toSVG() {
        const pointGroups = this._data;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const minX = 0;
        const minY = 0;
        const maxX = this.canvas.width / ratio;
        const maxY = this.canvas.height / ratio;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.canvas.width.toString());
        svg.setAttribute('height', this.canvas.height.toString());
        this._fromData(pointGroups, ({ color, curve }) => {
            const path = document.createElement('path');
            if (!isNaN(curve.control1.x) &&
                !isNaN(curve.control1.y) &&
                !isNaN(curve.control2.x) &&
                !isNaN(curve.control2.y)) {
                const attr = `M ${curve.startPoint.x.toFixed(3)},${curve.startPoint.y.toFixed(3)} `
                    + `C ${curve.control1.x.toFixed(3)},${curve.control1.y.toFixed(3)} `
                    + `${curve.control2.x.toFixed(3)},${curve.control2.y.toFixed(3)} `
                    + `${curve.endPoint.x.toFixed(3)},${curve.endPoint.y.toFixed(3)}`;
                path.setAttribute('d', attr);
                path.setAttribute('stroke-width', (curve.endWidth * 2.25).toFixed(3));
                path.setAttribute('stroke', color);
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke-linecap', 'round');
                svg.appendChild(path);
            }
        }, ({ color, point }) => {
            const circle = document.createElement('circle');
            const dotSize = typeof this.dotSize === 'function' ? this.dotSize() : this.dotSize;
            circle.setAttribute('r', dotSize.toString());
            circle.setAttribute('cx', point.x.toString());
            circle.setAttribute('cy', point.y.toString());
            circle.setAttribute('fill', color);
            svg.appendChild(circle);
        });
        const prefix = 'data:image/svg+xml;base64,';
        const header = '<svg'
            + ' xmlns="http://www.w3.org/2000/svg"'
            + ' xmlns:xlink="http://www.w3.org/1999/xlink"'
            + ` viewBox="${minX} ${minY} ${maxX} ${maxY}"`
            + ` width="${maxX}"`
            + ` height="${maxY}"`
            + '>';
        let body = svg.innerHTML;
        if (body === undefined) {
            const dummy = document.createElement('dummy');
            const nodes = svg.childNodes;
            dummy.innerHTML = '';
            for (let i = 0; i < nodes.length; i += 1) {
                dummy.appendChild(nodes[i].cloneNode(true));
            }
            body = dummy.innerHTML;
        }
        const footer = '</svg>';
        const data = header + body + footer;
        return prefix + btoa(data);
    }
}

class YooFormSignaturePadDialogComponent {
    componentWillUpdate() {
        if (!this.isCanvasSetup) {
            this.isCanvasSetup = true;
            if (!this.readonly) {
                this.canvasSetup();
            }
        }
    }
    canvasSetup() {
        let ratio = 1; //Math.max(window.devicePixelRatio || 1, 1);
        if (this.canvasEl && this.signatureContainerDiv) {
            this.canvasEl.width = this.signatureContainerDiv.clientWidth;
            this.canvasEl.height = this.signatureContainerDiv.clientHeight;
            this.canvasEl.getContext('2d').scale(ratio, ratio);
            this.signaturePad = new SignaturePad(this.canvasEl, { backgroundColor: '#ffffff', penColor: '#000000', onBegin: () => { this.hasContent = true; } /**, onEnd: () => this.onSave()**/ });
            if (this.value) {
                let image = new Image();
                image.crossOrigin = 'Anonymous';
                image.onload = () => {
                    this.canvasEl.getContext('2d').drawImage(image, 0, 0, this.canvasEl.width, this.canvasEl.height);
                };
                image.src = this.value;
                this.hasContent = true;
            }
        }
    }
    onCancel() {
        closeModal(this.value);
    }
    onSave() {
        let data;
        if (!this.signaturePad || this.signaturePad.isEmpty()) {
            data = this.isDirty ? null : this.value;
        }
        else {
            data = this.signaturePad.toDataURL();
        }
        closeModal(data);
    }
    onClear() {
        if (this.signaturePad) {
            this.signaturePad.clear();
        }
        this.hasContent = false;
        this.isDirty = true;
    }
    renderSignaturePad() {
        return h("div", { class: "signature-container", ref: (el) => this.signatureContainerDiv = el },
            h("canvas", { ref: (el) => this.canvasEl = el }));
    }
    renderReadonly() {
        const width = this.host.clientWidth;
        const height = this.host.clientHeight;
        return this.value ?
            h("yoo-img", { type: "back", class: "image", src: cloudinary(this.value, width, height, null, null, null, null, true) })
            : null;
    }
    renderHeader() {
        return h("yoo-ion-header", { class: "shadow", "no-border": true },
            h("yoo-ion-toolbar", { color: "light" },
                h("yoo-ion-buttons", { slot: "start" },
                    h("yoo-ion-button", { class: "close button-clear", onClick: () => this.onCancel() },
                        h("yoo-icon", { slot: "icon-only", class: "yo-close" }))),
                h("yoo-ion-title", null, translate('SIGNATURE')),
                h("yoo-ion-buttons", { slot: "end", onClick: () => this.onSave() },
                    h("yoo-ion-button", { color: "success", class: "button-clear" }, translate('DONE')))));
    }
    renderContent() {
        return h("div", { class: "signature-pad-dialog" },
            h("yoo-ion-content", { scrollEnabled: false, class: "bg-light" }, this.readonly ? this.renderReadonly() : this.renderSignaturePad()));
    }
    renderBottom() {
        return (this.readonly ? null : h("div", { class: "signature-footer" },
            h("yoo-button", { text: translate('DELETE'), onClick: this.onClear.bind(this), class: 'block ' + (this.hasContent ? 'stable-danger' : 'stable') })));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        return [
            this.renderHeader(),
            this.renderContent(),
            this.renderBottom()
        ];
    }
    static get is() { return "yoo-form-signature-pad-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "hasContent": {
            "state": true
        },
        "host": {
            "elementRef": true
        },
        "isAnimationFinished": {
            "type": Boolean,
            "attr": "is-animation-finished"
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "value": {
            "type": String,
            "attr": "value"
        }
    }; }
    static get style() { return ":host .signature-pad-dialog {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  height: 100%; }\n  :host .signature-pad-dialog yoo-ion-content {\n    overflow-y: hidden; }\n    :host .signature-pad-dialog yoo-ion-content .signature-container {\n      height: 100%; }\n      :host .signature-pad-dialog yoo-ion-content .signature-container canvas {\n        height: 100%; }\n\n:host .signature-footer {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n  width: 100%;\n  min-height: 52px;\n  background: var(--light, #FFFFFF);\n  z-index: 2; }\n\n:host .image {\n  width: 100%;\n  height: 100%;\n  margin-right: auto;\n  margin-left: auto; }\n\n:host(.iphone-x) .signature-footer {\n  padding-bottom: var(--padding-30, 1.875rem); }"; }
}

export { YooFormSignaturePadComponent as YooFormSignaturePad, YooFormSignaturePadDialogComponent as YooFormSignaturePadDialog };
