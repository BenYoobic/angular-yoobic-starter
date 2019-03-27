import { IButton } from '../button/button.interface';
export declare const ARROW_PAIR: string[];
export declare const PLUS_MINUS_PAIR: string[];
export interface IAccordionEntry {
    title: string;
    subItemCount?: number;
    selected?: boolean;
    actionButton?: IButton;
}
export interface IAccordionItem extends IAccordionEntry {
    selected: boolean;
}
