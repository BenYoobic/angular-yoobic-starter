import * as hammer from 'hammerjs';
export const Hammer = hammer.default;
const PAN = 'pan';
const PINCH = 'pinch';
const PRESS = 'press';
const ROTATE = 'rotate';
const SWIPE = 'swipe';
const TAP = 'tap';
export const hammerTypes = {
    PAN,
    PINCH,
    PRESS,
    ROTATE,
    SWIPE,
    TAP
};
// These are numbers
export const hammerDirections = {
    vertical: Hammer.DIRECTION_VERTICAL,
    horizontal: Hammer.DIRECTION_HORIZONTAL,
    all: Hammer.DIRECTION_ALL
};
export function setupHammer(element, gestureType, hammerOptions) {
    let hammerController = new Hammer(element, hammerOptions);
    hammerController.on(gestureType, ev => {
        hammerOptions.handleFn(ev);
    });
    if (hammerOptions.direction) {
        switch (gestureType) {
            case hammerTypes.SWIPE:
            case hammerTypes.PAN: {
                hammerController.get(gestureType).set({ direction: hammerOptions.direction });
                break;
            }
        }
    }
}
export function isTopSwipe(deltaY) {
    return deltaY < 0;
}
export function isBottomSwipe(deltaY) {
    return deltaY > 0;
}
