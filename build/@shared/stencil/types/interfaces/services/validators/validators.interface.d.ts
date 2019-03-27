export declare type Validator<A> = (x: A) => boolean;
export declare type AsyncValidator<A> = (x: A) => Promise<boolean>;
export interface ValidatorEntry {
    name?: string;
    options?: any;
}
export interface ExternalValidator {
    externalFieldName: string;
    rule: 'lower' | 'higher' | 'equal';
}
