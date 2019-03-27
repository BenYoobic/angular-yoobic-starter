export declare const CONDITION_TYPES: string[];
export declare const CONDITION_ALL_OPERATORS: string[];
export declare const SIMPLE_FIELD_TYPES: string[];
export declare const WITH_VALUES_FIELD_TYPES: string[];
export interface ICondition {
    _id?: string;
    type?: string;
    operator?: string;
    title?: string;
    field?: any;
    tags?: Array<string>;
    group?: Array<string>;
    values?: Array<any>;
    value?: any;
    key?: string;
}
export declare const ROLES: string[];
export declare const ROLES_ASK: string[];
export declare const ROLES_CONDITIONS: {
    isAdmin: {
        type: string;
        operator: string;
        group: string[];
    };
    isClientAdmin: {
        type: string;
        operator: string;
        group: string[];
    };
    isAdminOrClientAdmin: {
        type: string;
        operator: string;
        group: string[];
    };
    isNotAdmin: {
        type: string;
        operator: string;
        group: string[];
    };
    isNeitherAdminNorClientAdmin: {
        type: string;
        operator: string;
        group: string[];
    };
    isManager: {
        type: string;
        operator: string;
        group: string[];
    };
    isNotManager: {
        type: string;
        operator: string;
        group: string[];
    };
    isTeam: {
        type: string;
        operator: string;
        group: string[];
    };
    isWorkplace: {
        type: string;
        operator: string;
        group: string[];
    };
    hasTodoOrScore: {
        type: string;
        operator: string;
        group: string[];
    };
    hasTodo: {
        type: string;
        operator: string;
        group: string[];
    };
    hasScore: {
        type: string;
        operator: string;
        group: string[];
    };
    hasService: {
        type: string;
        operator: string;
        group: string[];
    };
    hasProductBatch: {
        type: string;
        operator: string;
        group: string[];
    };
    hasMemoAssign: {
        type: string;
        operator: string;
        group: string[];
    };
};
