import { IOperation } from '@shared/stencil';
export declare class Operation extends IOperation {
    operationId: string;
    operationName: string;
    methodName: string;
    modelName: string;
    _createdAt: Date;
    count: number;
}
