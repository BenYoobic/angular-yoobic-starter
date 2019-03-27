import { Translate } from '@shared/translate';
import { Slide, MissionDescription } from '@shared/data-core';
import { IFormField } from '@shared/stencil';
export interface FieldControl {
    [key: string]: any;
}
export declare class FormDynamicBuilder {
    private translate;
    constructor(translate: Translate);
    generateFieldName(): any;
    answerIsValid(value: any, answer: any, field: any): boolean;
    hasScoring(missiondescription: MissionDescription): boolean;
    calculateScoring(mission: any, data: {
        [key: string]: any;
    }): void;
    calculateScoringQuizz(mission: any, slides: Array<Slide>, data: {
        [key: string]: any;
    }): void;
    hasTabs(formDefinition: Array<IFormField>): boolean;
    getSlides(formDefinition: Array<IFormField>): Slide[];
    updateDataFieldType(data: any, fields: Array<IFormField>): void;
    getTabName(field: IFormField): string;
    encodeScoringValue(v: any): any;
}
