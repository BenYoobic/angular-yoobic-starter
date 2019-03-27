import '../../../stencil.core';
import { IProperty } from '../../../index';
export declare class YooPropertyCardComponent {
    properties: Array<IProperty>;
    extraClass?: string;
    host: HTMLStencilElement;
    private isPositive;
    private isGrowing;
    private getArrowIconClassName;
    private getChartIconClassName;
    private getDeltaColor;
    renderDelta(value: any, orientation?: 'column' | 'row'): JSX.Element;
    renderTitle(value: any): JSX.Element;
    renderNumber(value: any, orientation?: 'column' | 'row'): JSX.Element;
    renderColumns(property: IProperty): JSX.Element;
    renderGrid(property: IProperty): JSX.Element;
    getValueArr(value: any): {}[];
    renderKpiGrid(property: IProperty): JSX.Element;
    renderRows(p: any): JSX.Element;
    renderChart(p: any): JSX.Element;
    renderHtml(property: IProperty): JSX.Element;
    renderPropertyTitle(property: IProperty): JSX.Element;
    renderPropertyEntity(property: IProperty): JSX.Element;
    renderPropertyType(property: IProperty): JSX.Element;
    renderProperty(property: IProperty): JSX.Element;
    hostData(): {
        class: {
            'web': any;
        };
    };
    render(): JSX.Element;
}
