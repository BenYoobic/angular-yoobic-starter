import { IEntity } from '../entity/entity.interface';
import { IFormField } from '../form-field/form-field.interface';
import { ICondition } from '../condition/condition.interface';
export declare class ISlide extends IEntity {
    visible?: boolean;
    order?: number;
    title: string;
    description?: string;
    hideheader?: boolean;
    service?: boolean;
    items: Array<IFormField>;
    condition?: Array<ICondition | string | any> | string | ICondition;
}
