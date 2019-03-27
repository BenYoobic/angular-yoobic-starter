export function shiftSlidesToNext(activeSlideIndex, slides, cachedSlides = 1) {
    let shiftedSlides = [...slides];
    while (activeSlideIndex > cachedSlides) {
        activeSlideIndex--;
        shiftedSlides.push(shiftedSlides[shiftedSlides.length - 1] + 1);
        shiftedSlides.shift();
    }
    return shiftedSlides;
}
export function shiftSlidesToPrevious(activeSlideIndex, slides, cachedSlides = 1) {
    let shiftedSlides = [...slides];
    while (activeSlideIndex < cachedSlides) {
        activeSlideIndex++;
        shiftedSlides.unshift(shiftedSlides[0] - 1);
        shiftedSlides.pop();
    }
    return shiftedSlides;
}
