import { slideXEnterAnimation, slideXLeaveAnimation, fadeEnterAnimation, fadeLeaveAnimation, setAnimation } from '../../../utils/anim';
import { querySelectorDeep } from '../../../utils/helpers';
import { isAnimationsDisabled } from '../../../utils/config';
export const DEFAULT_ANIMATIONS = {
    ENTER: 'slideXEnterAnimation',
    LEAVE: 'slideXLeaveAnimation'
};
export function modalAnimationFactory(animationName, host, preview = false) {
    if (isAnimationsDisabled()) {
        return Promise.resolve();
    }
    const element = preview ? host : querySelectorDeep(host, 'div.modal-wrapper');
    switch (animationName) {
        case 'slideXEnterAnimation':
            return slideXEnterAnimation(element);
        case 'slideXLeaveAnimation':
            return slideXLeaveAnimation(element);
        case 'slideYEnterAnimation':
            return slideYEnterAnimation(host, element); // keep animejs for now -> better performance
        case 'slideYLeaveAnimation':
            return slideYLeaveAnimation(host, element); // keep animejs for now -> better performance
        case 'fadeEnterAnimation':
            return fadeEnterAnimation(element);
        case 'fadeLeaveAnimation':
            return fadeLeaveAnimation(element);
    }
}
const ENTER_Y_ANIMATION_DURATION = 400;
// const ENTER_X_ANIMATION_DURATION: number = 400;
// const ENTER_FADE_ANIMATION_DURATION: number = 400;
const LEAVE_ANIMATION_DURATION = 400;
const ENTER_ANIMATION_EASE = [0.3, 0.8, 0.3, 1.0]; // http://cubic-bezier.com/#.3,.8,.3,1.0
const LEAVE_ANIMATION_EASE = [0.4, 0.0, 0.7, 0.2]; // http://cubic-bezier.com/#.4,0,.7,.2
function slideYEnterAnimation(host, element) {
    return setAnimation('slide_vertical', element, {
        open: true,
        up: true,
        distance: 900,
        duration: ENTER_Y_ANIMATION_DURATION,
        easing: ENTER_ANIMATION_EASE
    }).finished;
}
function slideYLeaveAnimation(host, element) {
    return setAnimation('slide_vertical', element, {
        open: false,
        up: true,
        distance: 900,
        duration: LEAVE_ANIMATION_DURATION,
        easing: LEAVE_ANIMATION_EASE
    }).finished;
}
