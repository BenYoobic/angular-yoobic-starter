import '../../../stencil.core';
import { ISlide } from '../../../interfaces';
export declare class YooFormDynamicModalComponent {
    slides: Array<ISlide>;
    data: Object;
    showTabs: boolean;
    showRecap: boolean;
    suffix: string;
    forceReadonly: boolean;
    onFieldFetchData: any;
    header: string;
    currentData: Object;
    validity: boolean;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    onCancel(): void;
    onSave(): void;
    onDataChanged(ev: CustomEvent<Object>): void;
    onInternalFieldFetchData(ev: CustomEvent): void;
    onValidityChanged(ev: CustomEvent<boolean>): void;
    render(): JSX.Element[];
}
