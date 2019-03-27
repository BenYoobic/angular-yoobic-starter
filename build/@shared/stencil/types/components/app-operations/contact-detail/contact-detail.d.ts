import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IContact } from '../../../index';
export declare class YooContactDetailComponent {
    item: IContact;
    isUser: boolean;
    canChat: boolean;
    chat: EventEmitter<IContact>;
    email: EventEmitter<IContact>;
    call: EventEmitter<IContact>;
    textMessage: EventEmitter<IContact>;
    host: HTMLStencilElement;
    onSendTextMessage(): void;
    onCall(): void;
    onEmail(): void;
    onAvatarSelect(): void;
    onChat(): void;
    render(): JSX.Element;
}
