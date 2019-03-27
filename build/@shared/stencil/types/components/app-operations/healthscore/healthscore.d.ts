import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IHealthscore, IHealthscoreEvolution, HealthscoreDisplayMode } from '../../../index';
export declare class YooHealthscoreComponent {
    displayMode: HealthscoreDisplayMode;
    modalHost: HTMLElement;
    scores: Array<IHealthscore>;
    showDialog: EventEmitter<any>;
    showHelp: EventEmitter<string>;
    score: IHealthscore;
    evolutions: Array<IHealthscoreEvolution>;
    host: HTMLStencilElement;
    onScoresChanged(newScores: Array<IHealthscore>): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    isMode(mode: HealthscoreDisplayMode): boolean;
    setupHealthscores(scores: Array<IHealthscore>): IHealthscore;
    getCurrentScore(scoreType: string, scoreValueType?: string): any;
    setScoreAndEvolutions(scores: Array<IHealthscore>): void;
    onShowDialog(): void;
    onShowHelp(mode: string): void;
    renderShowDetailsButton(): JSX.Element;
    renderHelpButton(scoreType: string): JSX.Element;
    renderTileContainer(scoreType: string): JSX.Element;
    renderProgressLineContainer(scoreType: string): JSX.Element;
    renderChangeContainer(change: number): JSX.Element;
    renderRegularHealthScore(): JSX.Element;
    renderTilesRow(): JSX.Element;
    renderMiniHealthScore(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
