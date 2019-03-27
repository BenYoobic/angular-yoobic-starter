import { ICondition } from '@shared/data-core';
export declare class Conditions {
    constructor();
    generateConditionId(): any;
    convertOperator(op: string): any;
    convertType(type: string): any;
    convertField(f: any): {
        name: any;
        title: any;
        type: any;
    };
    isValid(c: ICondition): any;
    areEqual(c1: ICondition, c2: ICondition): boolean;
}
