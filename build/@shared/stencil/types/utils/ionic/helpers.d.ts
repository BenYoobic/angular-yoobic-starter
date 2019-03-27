import { CssClassMap } from './interfaces';
export declare function rIC(callback: () => void): void;
export declare function getButtonClassMap(buttonType: string | undefined): CssClassMap;
export declare function getButtonTypeClassMap(buttonType: string, type: string | undefined): CssClassMap;
export declare function getColorClassMap(buttonType: string, color: string | undefined, fill: string | undefined): CssClassMap;
export declare function assert(actual: any, reason: string): void;
export declare function now(ev: UIEvent): number;
export declare function isEndSide(win: Window, side: 'start' | 'end'): boolean;
