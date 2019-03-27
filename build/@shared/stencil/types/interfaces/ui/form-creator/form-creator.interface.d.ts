import { FormFieldCategory } from '../../entities/form-field/form-field-type';
export interface IPageCardEntry {
    pageTitle: string;
    pageNumber: number;
    selected: boolean;
    blockNumber: number;
}
export interface IFormCreatorBlock {
    title: string;
    icon: string;
    category: FormFieldCategory;
}
export declare enum FormCreatorLeftMenuOptions {
    blocks = "blocks",
    logic = "logic",
    scoring = "scoring",
    translate = "translate"
}
