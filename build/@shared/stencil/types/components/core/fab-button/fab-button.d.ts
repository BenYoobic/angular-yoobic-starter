import '../../../stencil.core';
import { IButton } from '../../../index';
export declare class YooFabButtonComponent {
    fabEntry: IButton;
    text: string;
    icon: string;
    disabled: boolean;
    toggleActive: Function;
    parentHasList: boolean;
    activated: boolean;
    label: string;
    buttonClass: string;
    inContainer: boolean;
    inList: boolean;
    activatedState: boolean;
    host: HTMLStencilElement;
    componentDidLoad(): void;
    getButtonClasses(): {
        'fab-button': boolean;
        'fab-in-list': boolean;
    };
    onClick(): void;
    isActivated(): boolean;
    renderListButton(): JSX.Element;
    renderContainerButton(): JSX.Element;
    render(): JSX.Element;
}
