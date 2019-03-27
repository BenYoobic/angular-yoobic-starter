import '../../../stencil.core';
import { IActionBar } from '../../../interfaces';
export declare class YooToolbarComponent {
    actions: IActionBar[];
    showActive: boolean;
    activeAction: IActionBar;
    host: HTMLStencilElement;
    colors: Array<string>;
    onClick(action: IActionBar): void;
    getColor(i: number): string;
    render(): JSX.Element;
}
