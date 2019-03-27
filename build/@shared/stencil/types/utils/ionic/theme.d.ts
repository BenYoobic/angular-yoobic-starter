import { CssClassMap } from './interfaces';
export declare function createThemedClasses(mode: string | undefined, name: string): CssClassMap;
export declare function getClassList(classes: string | string[] | undefined): string[];
export declare function getClassMap(classes: string | string[] | undefined): CssClassMap;
export declare function createColorClasses(color: string | undefined): CssClassMap | null;
export declare function hostContext(selector: string, el: HTMLElement): boolean;
export declare function getParentNode(node: Node): any;
