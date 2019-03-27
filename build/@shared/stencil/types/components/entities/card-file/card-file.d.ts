import '../../../stencil.core';
export declare class YooCardFileComponent {
    imgSrc: string;
    icon: string;
    iconClass: string;
    heading: string;
    subheading: string;
    isClosable: boolean;
    type?: string;
    _downloadURL?: string;
    host: HTMLStencilElement;
    hasImageSource(): boolean;
    hasIcon(): boolean;
    isVideoFile(): boolean;
    renderIconBasedOnSource(): JSX.Element;
    renderBase(): JSX.Element;
    renderIconWithImageSource(): JSX.Element;
    renderBasedOnType(): JSX.Element;
    renderAudioCard(): JSX.Element;
    render(): JSX.Element;
}
