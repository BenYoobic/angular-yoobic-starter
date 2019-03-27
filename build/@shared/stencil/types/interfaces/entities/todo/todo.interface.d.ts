import { IEntity } from '../entity/entity.interface';
import { IFormField } from '../form-field/form-field.interface';
export declare class ITodo extends IEntity {
    field?: IFormField;
    fieldValue?: any;
    fieldExtra?: any;
    ownerDisplayName?: string;
    title: string;
    user: any;
    duedate: Date;
    notificationemail?: Array<string>;
    reminderdate?: Date;
    priority?: number;
    values: Array<ITodoTask>;
}
export declare class ITodoTask extends IEntity {
    finished?: {
        value: boolean;
        date?: Date;
    };
    imageData?: any;
    userComments?: string;
    fieldExtra?: any;
    fieldValue?: any;
    field?: IFormField;
    text: {
        value: string;
    };
    comments?: {
        value: string;
    };
    duedate?: {
        value: Date;
    };
    hasphoto?: {
        value: boolean;
    };
    isphotorequired?: {
        value: boolean;
    };
    allowLibrary?: {
        value: boolean;
    };
}
export declare class ITodoTaskSimple extends IEntity {
    finished?: {
        value: boolean;
        date?: Date;
    };
    fieldExtra?: any;
    fieldValue?: any;
    originalFieldName?: string;
    field?: IFormField;
    text: {
        value: string;
    };
    user: any;
    duedate?: {
        value: Date;
    };
    hasphoto?: {
        value: boolean;
    };
    isphotorequired?: {
        value: boolean;
    };
    allowLibrary?: {
        value: boolean;
    };
}
