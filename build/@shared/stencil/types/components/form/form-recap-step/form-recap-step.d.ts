import '../../../stencil.core';
import { IProgressIndicator } from '../../../interfaces';
export declare class YooFormRecapStepComponent {
    stepNumber: number;
    mainTitle: string;
    subTitle: string;
    locked: boolean;
    step: IProgressIndicator;
    host: HTMLStencilElement;
    renderIcon(): JSX.Element;
    render(): JSX.Element;
}
