import { IFormField } from '@shared/stencil';
import { ResponseObject } from '../../interfaces/response-object/response-object.interface';
import { MissionDescription } from '../../interfaces/mission-description/mission-description.interface';
import { Slide } from '../../interfaces/slide/slide.interface';
export declare class Missiondescriptions {
    static getFieldTransform(types?: Array<string>): (res: ResponseObject) => ResponseObject;
    static getFields(missiondescription: MissionDescription, types?: Array<string>, excludedTypes?: Array<string>): IFormField[];
    static getFieldsFromSlides(slides: Array<Slide>, types?: Array<string>, excludedTypes?: Array<string>): IFormField[];
    static getFormFields(missiondescription: MissionDescription, translate: any, includeComments?: boolean): Array<IFormField>;
    static encodeScoringValue(v: any): any;
}
