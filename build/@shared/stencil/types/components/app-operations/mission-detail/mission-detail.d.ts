import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMission, IUser, IFormProgress, IFormField, IChartDefinition, IMissionScoring, ISlide } from '../../../index';
export declare class YooMissionDetailComponent {
    mission: IMission;
    linkedField: IFormField;
    linkedFieldValue: any;
    slidesNumber: number;
    photosNumber: number;
    questionsNumber: number;
    charts: Array<{
        score: IMissionScoring;
        chart: IChartDefinition;
    }>;
    networkScore: number;
    progress: IFormProgress;
    tagContainer: string;
    isBookable: (m: IMission) => boolean;
    serviceSlides: Array<ISlide>;
    book: EventEmitter<'book' | 'start' | 'unbook' | 'continue'>;
    showScoreChart: EventEmitter<IChartDefinition>;
    showUser: EventEmitter<IUser>;
    shouldClose: EventEmitter<boolean>;
    scrollHeight: string;
    host: HTMLStencilElement;
    private isMobile;
    private footer;
    private isTabbarHidden;
    onHideTabbar(ev: any): void;
    componentWillLoad(): void;
    getSizeContainer(): {
        height: string;
    };
    onBook(action: 'book' | 'start' | 'unbook' | 'continue', ev: MouseEvent): void;
    onScoreSelect(conf: any): void;
    onCloseIconClicked(): void;
    renderPriority(): JSX.Element;
    renderButtonFooter(): JSX.Element;
    renderSimpleSection(value: string, title: string, icon: string, isInnerHTML?: boolean, last?: boolean): JSX.Element;
    renderServiceData(): JSX.Element;
    renderUserSection(user: IUser, title: string, icon: string): JSX.Element;
    renderMission(): JSX.Element[];
    renderMenuItem(title: string, withContent?: boolean): JSX.Element;
    renderMenuRight(title: string, withContent: boolean): JSX.Element;
    renderMenuLeft(iconClass: string): JSX.Element;
    renderTodo(): JSX.Element;
    hostData(): {
        class: {
            'web': any;
        };
    };
    render(): JSX.Element;
}
