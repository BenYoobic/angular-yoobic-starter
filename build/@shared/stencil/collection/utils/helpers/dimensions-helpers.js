export function getElementDimensions(element) {
    if (element === window) {
        return { height: element.innerHeight, width: element.innerWidth };
    }
    if (element && element.clientWidth && element.clientHeight) {
        return { height: element.clientHeight, width: element.clientWidth };
    }
    if (element) {
        let rect = element.getBoundingClientRect();
        if (rect) {
            return { height: rect.height, width: rect.width };
        }
    }
    return { height: 0, width: 0 };
}
