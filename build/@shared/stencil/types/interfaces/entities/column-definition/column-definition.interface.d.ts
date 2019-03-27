export interface IColumnDefinition {
    headerName?: string;
    headerClass?: string;
    cellClass?: string;
    width?: number;
    minWidth?: number;
    hidden?: boolean;
    name?: string;
    format?: string;
    forceName?: boolean;
    rendererType?: string;
    cellRenderer?: string | any;
    suppressExport?: boolean;
    sortable?: boolean;
    suppressFilter?: boolean;
    pinned?: 'right' | 'left';
    menuTabs?: Array<string>;
    context?: {
        icon?: string;
        color?: string;
        text?: string;
    };
    onCellClicked?: (event: any) => void;
}
