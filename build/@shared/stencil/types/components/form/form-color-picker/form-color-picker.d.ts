import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooFormColorPickerComponent {
    color: string;
    hideLabel: boolean;
    colorSelected: EventEmitter<string>;
    currentColor: string;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    colorValidation(newValue: string): void;
    onInputChange(ev: Event): void;
    render(): JSX.Element;
}
