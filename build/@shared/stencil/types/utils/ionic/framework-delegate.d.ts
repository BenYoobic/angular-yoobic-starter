import { ComponentRef } from './interfaces';
export interface FrameworkDelegate {
    attachViewToDom(container: any, component: any, propsOrDataObj?: any, cssClasses?: string[]): Promise<HTMLElement>;
    removeViewFromDom(container: any, component: any): Promise<void>;
}
export declare function attachComponent(delegate: FrameworkDelegate | undefined, container: Element, component: ComponentRef, cssClasses?: string[], componentProps?: {
    [key: string]: any;
}): Promise<HTMLElement>;
export declare function detachComponent(delegate: FrameworkDelegate | undefined, element: HTMLElement | undefined): Promise<void>;
