import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooEntitySearchRecentComponent {
    header: string;
    values: Array<string>;
    clear: EventEmitter<boolean>;
    select: EventEmitter<string>;
    host: HTMLStencilElement;
    private clearText;
    setValues(values: Array<string>): void;
    componentWillLoad(): void;
    onClear(): void;
    onSelect(ev: MouseEvent, value: string): void;
    renderLi(value: string): JSX.Element;
    render(): JSX.Element;
}
