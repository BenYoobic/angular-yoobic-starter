import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooAppComponent {
    language: string;
    isOffline: boolean;
    isDarkTheme: boolean;
    getSession: Function;
    darkThemeChanged: EventEmitter<boolean>;
    host: HTMLStencilElement;
    protected backbuttonListener: any;
    constructor();
    onDarkThemeChanged(): void;
    onLanguageChange(): Promise<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): JSX.Element;
}
