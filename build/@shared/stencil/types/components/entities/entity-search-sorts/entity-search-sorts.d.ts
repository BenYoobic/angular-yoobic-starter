import '../../../stencil.core';
import { EventEmitter } from '../../../stencil.core';
import { IFormField, ISort, ISortDir } from '../../../interfaces';
export declare class YooEntitySearchSortsComponent {
    header: string;
    fields: Array<IFormField>;
    values: Array<ISort>;
    sort: EventEmitter<Array<ISort>>;
    sorts: Array<ISort>;
    host: HTMLStencilElement;
    componentWillLoad(): void;
    onUpdateValues(): void;
    getDir(name: string): ISortDir;
    getIcon(dir: string): string;
    changeDir(dir: ISortDir): "desc" | "asc";
    onSort(field: IFormField): void;
    hasSorts(): boolean;
    renderLi(field: IFormField): JSX.Element[];
    render(): JSX.Element;
}
