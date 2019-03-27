import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
export declare class YooFormRankingComponent {
    values: Array<string>;
    value: Array<string>;
    answers?: Array<string>;
    readonly: boolean;
    required?: boolean;
    validityChanged: EventEmitter<boolean>;
    inputChanged: EventEmitter<Array<string>>;
    host: HTMLStencilElement;
    validity: boolean;
    private sortables;
    private items;
    private rowsMargin;
    private rowHeight;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    private prepareItems;
    private calcRowHeight;
    validate(): boolean;
    private updateAnswer;
    private calcBadgesValues;
    private setBadgeValue;
    /**
     * This function apply sortable ability to element.
     * All necessary logic is encapsulated in this function
     * and can be moved into separate class and reused somewhere else.
     */
    private sortable;
    private setRowPosition;
    private changeIndex;
    private arrayMove;
    private clamp;
    private renderToggleIcon;
    private renderItem;
    private renderItems;
    hostData(): {
        class: any;
    };
    render(): JSX.Element;
}
