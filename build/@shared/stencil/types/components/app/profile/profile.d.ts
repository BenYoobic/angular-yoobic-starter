import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IProfileConfig, IProfileConfigLink, IProfileConfigItem } from '../../../index';
export declare class YooProfileComponent {
    config: IProfileConfig;
    showProfileHeader: boolean;
    isPreview: boolean;
    extraClasses: string;
    modalHost: HTMLElement;
    selectedTitle: string;
    disableProfileLink: boolean;
    clicked: EventEmitter<string>;
    profileEdit: EventEmitter<{
        host: HTMLElement;
        isPreview: boolean;
    }>;
    logout: EventEmitter<boolean>;
    activeItem: string;
    host: HTMLStencilElement;
    private localConfig;
    onProfileEdit(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onClicked(item: any, isToggle?: boolean): void;
    onLogout(): void;
    onToggleChanged(ev: CustomEvent, linkIndex: number, itemIndex: number): void;
    renderUl(link: IProfileConfigLink, linkIndex: number): JSX.Element;
    renderLi(item: IProfileConfigItem, linkIndex: number, itemIndex: number): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
