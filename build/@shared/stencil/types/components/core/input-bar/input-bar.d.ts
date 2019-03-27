import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IUser } from '../../../interfaces';
export declare class YooInputBarComponent {
    icon: string;
    iconAction: string;
    actionText: string;
    value: string;
    placeholder: string;
    topIndication: string;
    replyToUser: IUser;
    focusOnOpen: boolean;
    keepFocusAfterAction: boolean;
    sendText: EventEmitter<string>;
    iconClicked: EventEmitter<boolean>;
    browseLibrary: EventEmitter<boolean>;
    rowNumberChanged: EventEmitter<boolean>;
    sendPicture: EventEmitter<string>;
    replyCancelled: EventEmitter<boolean>;
    isTyping: EventEmitter<boolean>;
    hasTextInside: boolean;
    host: HTMLStencilElement;
    private fileInput;
    private formTextArea;
    private previousIsTyping;
    focusInputField(hasText?: boolean): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onActionClick(): void;
    captureFile(): void;
    onCaptureClick(): Promise<void>;
    onInput(ev: Event): void;
    onEmitTypingEvent(isTyping: boolean): void;
    onFileSelect(ev: any): void;
    onCloseReplyMode(event: any): void;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}