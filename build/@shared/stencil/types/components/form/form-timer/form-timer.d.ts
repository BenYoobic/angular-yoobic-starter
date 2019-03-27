import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooFormTimerComponent {
    name: string;
    timeCalculated: EventEmitter<string>;
    calculatedTime: any;
    smallWindowSize: boolean;
    host: HTMLStencilElement;
    startHour: any;
    startMinute: any;
    endTime: any;
    protected resizeListener: any;
    timeChanged(event: any, position: string): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    formatTime(time: string): string;
    calculateTotalTime(): string;
    resizeComponent(): void;
    render(): JSX.Element;
}
