import '../../../stencil.core';
import { IProgressSemiCircle, IProgressCore } from '../../../interfaces';
export declare class YooProgressBarSemiCircleComponent {
    progressCoreParameters: IProgressCore;
    progressInstance: any;
    progressAnimationDuration: number;
    progressLabelClassAttribute: string;
    allowNonAvailableValue: boolean;
    progressUnitLabel: string;
    getFormatedLabelToDisplay: Function;
    progressColorClassAttribute: Function;
    percentColorScheme: boolean;
    addBaseClass: Function;
    progressValue: number;
    progressCustomParameters: IProgressSemiCircle;
    host: HTMLStencilElement;
    private progressBarElement;
    private progressContainer;
    onProgressChange(newProgress: number): void;
    onprogressCustomParametersChange(newParams: IProgressSemiCircle): void;
    componentDidLoad(): void;
    private initProgressLine;
    private animateProgressBar;
    renderProgressContainer(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
