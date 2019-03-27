import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IRadioGroupEntry } from '../../../interfaces';
export declare class YooFormRadioGroupComponent {
    values: IRadioGroupEntry[];
    multiple: boolean;
    name: string;
    selectionChanged: EventEmitter<Array<IRadioGroupEntry>>;
    items: IRadioGroupEntry[];
    host: HTMLStencilElement;
    componentWillLoad(): void;
    private radioReset;
    private calculateRadioSelection;
    onRadioClicked(index: number): void;
    render(): JSX.Element;
}
