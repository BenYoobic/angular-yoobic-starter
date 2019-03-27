import { IEntity } from '../entity/entity.interface';
import { IFormField } from '../form-field/form-field.interface';
import { ISlide } from '../slide/slide.interface';
export declare class ICustomModel extends IEntity {
    _id?: string;
    title: string;
    name: string;
    shortDescription: string;
    group: Array<string>;
    allowInventory: boolean;
    background: any;
    feathersService: string;
    fields: Array<IFormField>;
    properties?: Array<any>;
    permissions?: string;
    appearance?: Map<string, Array<string>>;
    slides?: Array<ISlide>;
    formFields?: Array<IFormField>;
}
