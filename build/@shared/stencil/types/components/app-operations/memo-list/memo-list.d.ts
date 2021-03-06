import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMemo } from '../../../index';
export declare class YooMemoListComponent {
    memos: Array<IMemo>;
    modalHost: HTMLElement;
    type: 'open' | 'closed';
    memoUpdate: EventEmitter<IMemo>;
    memoEdit: EventEmitter<IMemo>;
    memoSelect: EventEmitter<IMemo>;
    memoDelete: EventEmitter<IMemo>;
    usersView: EventEmitter<Array<string>>;
    collapse: boolean;
    showEllipsis: boolean;
    forceRefresh: boolean;
    host: HTMLStencilElement;
    MAX_LINE_HEIGHT: number;
    private dialog;
    componentWillLoad(): void;
    isEditable(memo: IMemo): boolean;
    onIconClicked(): void;
    onMemoUpdate(event: CustomEvent, memo: IMemo, spanElement: HTMLSpanElement): void;
    setSelectedStyles(element: HTMLElement, cssClass: string, memo: IMemo): void;
    onOpenMemoListDialog(memo: IMemo): void;
    onMemoDelete(memo: IMemo, itemElement: HTMLElement): void;
    renderLi(memo: IMemo): JSX.Element;
    renderInnerContainer(memo: IMemo): JSX.Element;
    renderAvatarContainer(memo: IMemo): JSX.Element;
    render(): JSX.Element;
}
