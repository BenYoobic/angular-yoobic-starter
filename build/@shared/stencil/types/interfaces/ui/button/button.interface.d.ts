export interface IButton {
    type?: string;
    icon?: string;
    text?: string;
    textClass?: string;
    isLoading?: boolean;
    cssClass?: string;
    disabled?: boolean;
    performHandlerWhenDisabled?: boolean;
    handler?: (ev?: any) => void;
    isVisible?: () => boolean;
}
