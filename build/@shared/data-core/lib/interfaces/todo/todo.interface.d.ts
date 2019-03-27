import { IFormField, ITodo, ITodoTask, ITodoTaskSimple } from '@shared/stencil';
export declare function onUserMeActionHandler(): void;
export declare class Todo extends ITodo {
    title: string;
    user: any;
    duedate: Date;
    notificationemail?: Array<string>;
    reminderdate?: Date;
    priority?: number;
    field?: IFormField;
}
export declare class TodoTask extends ITodoTask {
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
    field?: IFormField;
}
export declare class TodoTaskSimple extends ITodoTaskSimple {
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
    field?: IFormField;
}
