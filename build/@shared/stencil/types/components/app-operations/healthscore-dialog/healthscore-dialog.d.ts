import '../../../stencil.core';
import { IHealthscoreEvolution, HealthScoreRange } from '../../../index';
export declare class YooHealthscoreDialogComponent {
    evolutions: Array<IHealthscoreEvolution>;
    hideToolbar: boolean;
    selectedMode: number;
    evolution: IHealthscoreEvolution;
    host: HTMLStencilElement;
    private chartEvolutionConfig;
    private chartComparisonConfig;
    private timeTabs;
    private xAxis;
    private yAxis;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    private getTimesTabObject;
    private getChartTooltipOptions;
    onCancel(): void;
    setChartStyles(): void;
    reverseEvolutionOrder(): void;
    initEvolution(): void;
    initComparison(): void;
    getColor(start: string, end: string, y1: number, x2: number): {
        linearGradient: {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
        stops: (string | number)[][];
    };
    initChart(): void;
    renderHealthscoreRange(range: HealthScoreRange): JSX.Element;
    renderHealthscoreNumbers(): JSX.Element;
    onTimeTabSelected(event: any): void;
    renderHealthscoreNavbar(): JSX.Element;
    renderHealthscoreChart(chartConfig: any): JSX.Element;
    renderHealthscoreEvolution(): JSX.Element;
    renderHealthscoreComparisonLegend(): JSX.Element;
    renderHealthscoreComparison(): JSX.Element;
    renderHealthscoreTitle(title: string): JSX.Element;
    renderEvolution(): JSX.Element;
    renderWeb(): JSX.Element;
    renderWebSlides(): JSX.Element;
    renderMobileContent(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element[];
}
