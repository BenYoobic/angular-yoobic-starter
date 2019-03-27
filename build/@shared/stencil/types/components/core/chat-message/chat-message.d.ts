import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IChatMessage } from '../../../interfaces';
export declare class YooChatMessageComponent {
    message: IChatMessage;
    isLast: boolean;
    isFirst: boolean;
    isNextImage: boolean;
    hideEmptyCheckbox: boolean;
    isGroup: boolean;
    clicked: EventEmitter<boolean>;
    conferenceMessageClicked: EventEmitter<string>;
    host: HTMLStencilElement;
    readonly isConferenceMessage: boolean;
    onClickMessage(): void;
    onShowImage(): void;
    renderConferenceMessage(): JSX.Element;
    renderUser(): JSX.Element;
    renderTimeStamp(): JSX.Element;
    renderUserName(): JSX.Element;
    renderMessageContent(): JSX.Element;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
