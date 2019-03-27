import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IGridSearch } from '../../../interfaces';
export declare class YooFormCaptureTagDialogComponent {
    imageSrc: string;
    imageHeight: number;
    imageWidth: number;
    tags: Array<string>;
    value: any;
    fetchData: EventEmitter<IGridSearch>;
    host: HTMLStencilElement;
    private newValue;
    componentWillLoad(): void;
    onSave(): void;
    onCancel(): void;
    onFetchGridData(ev: CustomEvent<IGridSearch>): void;
    onTagChanged(ev: CustomEvent<Array<{
        _id: string;
        title: string;
    }>>): void;
    renderTags(): JSX.Element[];
    renderHeader(): JSX.Element;
    renderBody(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
