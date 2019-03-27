import { findParent } from '../helpers';
export function createThemedClasses(mode, name) {
    return {
        [name]: true,
        [`${name}-${mode}`]: !!mode
    };
}
export function getClassList(classes) {
    if (classes) {
        const array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(c => c !== null && c.trim)
            .map(c => c.trim())
            .filter(c => c !== '');
    }
    return [];
}
export function getClassMap(classes) {
    const map = {};
    getClassList(classes).forEach(c => (map[c] = true));
    return map;
}
export function createColorClasses(color) {
    return color
        ? {
            'ion-color': true,
            [`ion-color-${color}`]: true
        }
        : null;
}
export function hostContext(selector, el) {
    return !!findParent(el, selector);
}
export function getParentNode(node) {
    // this also checks for host elements of shadow root node
    // if the parent node is a document fragment (shadow root)
    // then use the "host" property on it
    // otherwise use the parent node
    // DOCUMENT_FRAGMENT_NODE nodeType === 11
    const parentNode = node.parentNode;
    return parentNode && parentNode.NODE_TYPE === 11 ? parentNode.host : parentNode;
}
