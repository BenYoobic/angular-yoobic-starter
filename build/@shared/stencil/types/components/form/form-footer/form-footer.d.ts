import '../../../stencil.core';
import { IButton } from '../../../index';
import { ISessionService } from '../../../interfaces';
export declare class YooFormFooterComponent {
    buttons: Array<IButton>;
    timerStart: any;
    host: HTMLStencilElement;
    protected session: ISessionService;
    private isTabbarHidden;
    onListenTimerCounterValue(ev: CustomEvent): void;
    onHideShowTabbar(ev: any): void;
    componentWillLoad(): void;
    onButtonClick(ev: any, button: IButton): void;
    renderButton(button: IButton, index: number): JSX.Element;
    renderTimer(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
