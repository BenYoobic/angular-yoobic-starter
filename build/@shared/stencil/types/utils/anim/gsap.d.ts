import { TimelineMax } from 'gsap';
/**
 * This is GSAP helper class for managing several
 * timelines across Angular and Stencil components.
 */
declare abstract class Gsap {
    protected autoplayInTimelineNum?: number;
    private isPrepared;
    private masterTimeline;
    private childTimelines;
    protected onStart?(): any;
    protected onComplete?(): any;
    /**
     * @param timeline TimelineMax
     * @param delay positive or negative value of delay in seconds of previous ordered timeline
     * @param order timeline will be placed to master Timeline in given order
     * @param label string label for timeline in master timeline
     */
    protected addTimeline(timeline: TimelineMax, delay?: number, order?: number): string;
    protected clean(): this;
    protected play(): this;
    protected stop(): this;
    protected pause(): this;
    protected reverse(): this;
    protected getTimelineByLabel(label: string): TimelineMax | null;
    private checkAutoplay;
    private translateDelayToPosition;
    private prepareTimeline;
}
declare class DashboardGsapAnimation extends Gsap {
    protected autoplayInTimelineNum: any;
    private isActive;
    protected onStart(): void;
    addContainerElements(elements: NodeList, disableChildrenAnimation?: boolean): this;
    instantPlay(): Promise<any>;
    addHeaderElement(el: Element): this;
    addListElement(el: Element): this;
}
export declare const dashboardAnimation: DashboardGsapAnimation;
export declare class HorizontalSlidesAnimation extends Gsap {
    private updateTimeout;
    private done;
    addElements(elements: NodeList): void;
}
export declare class LoginFocusAnimation extends Gsap {
    addContainer(el: Element): this;
    playFocus(): this;
    playBlur(): this;
}
export declare function slideXEnterAnimation(element: Element, duration?: number): Promise<void>;
export declare function slideXLeaveAnimation(element: Element, duration?: number): Promise<void>;
export declare function slideYEnterAnimation(element: Element, duration?: number): Promise<void>;
export declare function slideYLeaveAnimation(element: Element, duration?: number): Promise<void>;
export declare function fadeEnterAnimation(element: Element, duration?: number): Promise<void>;
export declare function fadeLeaveAnimation(element: Element, duration?: number): Promise<void>;
export declare function bounceAnimation(element: any): Promise<void>;
export declare function staggerBounceAnimation(elements: Array<Element>): TimelineMax;
export {};
