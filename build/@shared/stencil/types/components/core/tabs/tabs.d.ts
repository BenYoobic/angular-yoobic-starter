import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooTabsComponent {
    titles: string[];
    selected: number;
    numberTabsDisplayed: number;
    tabChanged: EventEmitter<string>;
    tabsDisplayed: number;
    selectedTab: string;
    host: HTMLStencilElement;
    private resizeListener;
    selectedChange(newValue: number): void;
    titlesChange(newValue: string[]): void;
    setMaximumTabDisplayable(newValue: number): void;
    componentWillLoad(): void;
    componentDidUnload(): void;
    onResize(): void;
    private handleClickTab;
    render(): JSX.Element;
}
