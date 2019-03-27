import { ModalAnimation } from '../../../utils/ionic';
export declare const DEFAULT_ANIMATIONS: {
    [key: string]: ModalAnimation;
};
export declare function modalAnimationFactory(animationName: ModalAnimation, host: HTMLElement, preview?: boolean): Promise<void>;
