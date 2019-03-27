import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { ILanguage } from '../../../index';
export declare class YooLanguageSelectorComponent {
    languages: ILanguage[];
    currentLanguage: string;
    topPosition: number;
    languageSelected: EventEmitter<string>;
    host: HTMLStencilElement;
    private hasPreseneted;
    private wrapperElement;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    onLanguageSelector(language: string): void;
    closeLanguageSelector(): void;
    renderList(language: ILanguage): JSX.Element;
    render(): JSX.Element;
}
