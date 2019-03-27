import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IFilterGroup } from '../../../interfaces';
export declare class YooMapLegendComponent {
    filterGroups: IFilterGroup[];
    filterClicked: EventEmitter<IFilterGroup>;
    legendVisible: boolean;
    host: HTMLStencilElement;
    private legendColors;
    private mapLegendContainer;
    private legendToggleContainer;
    componentWillLoad(): void;
    onCloseClicked(): void;
    toggleLegend(): void;
    renderLegendHeader(): JSX.Element;
    renderFilter(filter: IFilterGroup): JSX.Element;
    renderMapLegendContainer(): JSX.Element;
    renderLegendToogleContainer(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
