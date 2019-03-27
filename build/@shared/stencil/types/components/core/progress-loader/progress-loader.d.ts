import '../../../stencil.core';
export declare class YooProgressLoaderComponent {
    progress: number;
    logo: string;
    progressBarClass: string;
    host: HTMLStencilElement;
    hostData(): {
        class: {
            [x: string]: boolean;
        };
    };
    render(): JSX.Element;
}
