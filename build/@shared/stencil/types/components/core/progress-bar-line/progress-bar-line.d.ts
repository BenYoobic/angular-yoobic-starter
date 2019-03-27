import '../../../stencil.core';
import { IProgressLine, IProgressCore } from '../../../interfaces';
export declare class YooProgressBarLineComponent {
    progressCoreParameters: IProgressCore;
    progressCustomParameters: IProgressLine;
    progressInstance: any;
    progressLabelClassAttribute: string;
    progressUnitLabel: string;
    getFormatedLabelToDisplay: Function;
    addBaseClass: Function;
    allowNonAvailableValue: boolean;
    progressAnimationDuration: number;
    progressColorClassAttribute: Function;
    percentColorScheme: boolean;
    progressValue: number;
    progressStepValues: Array<number>;
    updatedProgressValue: Array<number>;
    host: HTMLStencilElement;
    private progressContainer;
    private progressBarElement;
    private negativeDisplay;
    onProgressChange(newProgress: number): void;
    onProgressStepValuesChange(newProgressStepValues: Array<number>): void;
    componentDidLoad(): void;
    private initProgressLine;
    private animateProgressBar;
    /**
     * Negative display for progress bar currently disabled
     */
    private setUploadingMode;
    private getCustomParameters;
    renderProgressContainer(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
