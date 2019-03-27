import '../../../stencil.core';
export declare class YooFabListComponent {
    animated: boolean;
    side: string;
    mini: boolean;
    activated: boolean;
    host: HTMLYooFabContainerElement;
    activatedChanged(activated: boolean): void;
    componentWillLoad(): void;
    animatedDisplay(activated: boolean): void;
    nonAnimatedDisplay(activated: boolean): void;
    render(): JSX.Element;
}
