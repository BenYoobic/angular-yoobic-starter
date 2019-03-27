export function rIC(callback) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback);
    }
    else {
        setTimeout(callback, 32);
    }
}
export function getButtonClassMap(buttonType) {
    if (!buttonType) {
        return {};
    }
    return {
        [buttonType]: true
    };
}
export function getButtonTypeClassMap(buttonType, type) {
    if (!type) {
        return {};
    }
    type = type.toLocaleLowerCase();
    return {
        [`${buttonType}-${type}`]: true
    };
}
export function getColorClassMap(buttonType, color, fill) {
    let className = buttonType;
    if (fill) {
        className += `-${fill.toLowerCase()}`;
    }
    const map = {
        [className]: true
    };
    if (color) {
        map[`ion-color-${color}`] = true;
    }
    return map;
}
export function assert(actual, reason) {
    if (!actual) {
        const message = 'ASSERT: ' + reason;
        //console.error(message);
        throw new Error(message);
    }
}
export function now(ev) {
    return ev.timeStamp || Date.now();
}
export function isEndSide(win, side) {
    const isRTL = win.document.dir === 'rtl';
    switch (side) {
        case 'start':
            return isRTL;
        case 'end':
            return !isRTL;
        default:
            throw new Error(`"${side}" is not a valid value for [side]. Use "start" or "end" instead.`);
    }
}
