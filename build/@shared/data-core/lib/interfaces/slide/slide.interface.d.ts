import { ISlide, IFormField, ICondition } from '@shared/stencil';
export declare class Slide extends ISlide {
    title: string;
    description?: string;
    hideheader?: boolean;
    service?: boolean;
    condition?: Array<ICondition | string | any> | string | ICondition;
    items: Array<IFormField>;
}
