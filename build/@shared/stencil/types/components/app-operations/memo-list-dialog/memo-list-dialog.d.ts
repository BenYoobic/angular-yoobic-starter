import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IMemo } from '../../../index';
export declare class YooMemoListDialogComponent {
    memo: IMemo;
    type: 'open' | 'closed';
    memoEdit: EventEmitter<IMemo>;
    usersView: EventEmitter<Array<string>>;
    host: HTMLStencilElement;
    private actionSheetDismiss;
    private changed;
    private memoElement;
    showDeleteAlert(memo: IMemo): void;
    onClose(): void;
    onCloseActionSheet(memo: IMemo, action: string): void;
    isEditable(): boolean;
    onViewUsers(memo: IMemo): void;
    onShowActionSheet(memo: IMemo): void;
    onMemoToggle(event: CustomEvent, memo: IMemo): void;
    onExtraDataChanged(ev: any): void;
    setSelectedStyles(element: HTMLElement, cssClass: string): void;
    renderHeader(): JSX.Element;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
