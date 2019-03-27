import '../../../stencil.core';
export declare class YooDateComponent {
    date: Date;
    startTime?: number;
    timerMode?: boolean;
    format: string;
    time: number;
    host: HTMLStencilElement;
    timer: number;
    pausedTime: number;
    pauseTimer(): void;
    resumeTimer(): void;
    getPausedTime(): Promise<number>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    onStartTimer(): void;
    renderTimer(): JSX.Element;
    render(): JSX.Element;
}
