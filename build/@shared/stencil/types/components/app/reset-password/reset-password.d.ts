import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooResetPasswordComponent {
    heading: string;
    subheading: string;
    borderClass: string;
    buttonClass: string;
    isMagicLink: boolean;
    showTitle: boolean;
    passwordResetRequestSubmitted: EventEmitter<{
        email: string;
        isMagicLink: boolean;
    }>;
    validateInput: boolean;
    host: HTMLStencilElement;
    private userEmail;
    private emailInput;
    private submitButton;
    validateEmaiInput(): void;
    onSubmit(): void;
    onInputChanged(ev: CustomEvent<string>): void;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
