/*!
 * https://github.com/john-doherty/long-press
 */
export function longPress(el) {
    let timer = null;
    // check if we're using a touch screen
    let isTouch = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    // switch to touch events if using a touch screen
    let mouseDown = isTouch ? 'touchstart' : 'mousedown';
    let mouseOut = isTouch ? 'touchcancel' : 'mouseout';
    let mouseUp = isTouch ? 'touchend' : 'mouseup';
    let mouseMove = isTouch ? 'touchmove' : 'mousemove';
    el.addEventListener(mouseDown, function (e) {
        let longPressDelayInMs = parseInt(el.getAttribute('data-long-press-delay') || '1500', 10);
        timer = setTimeout(fireLongPressEvent.bind(el), longPressDelayInMs);
    });
    // clear the timeout if the user releases the mouse/touch
    el.addEventListener(mouseUp, function (e) {
        clearTimeout(timer);
    });
    // clear the timeout if the user leaves the element
    el.addEventListener(mouseOut, function (e) {
        clearTimeout(timer);
    });
    // clear if the mouse moves
    el.addEventListener(mouseMove, function (e) {
        clearTimeout(timer);
    });
    function fireLongPressEvent() {
        this.dispatchEvent(new CustomEvent('long-press', { bubbles: true, cancelable: true }));
        clearTimeout(timer);
    }
}
