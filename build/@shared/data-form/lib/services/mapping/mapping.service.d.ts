import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Translate } from '@shared/translate';
import { Location, IMapping, Xlsx, Condition, Config, Broker, Requestor, Googlemaps, Slide } from '@shared/data-core';
import { IErrorMapping } from '@shared/stencil';
import { FormDynamicBuilder } from '../form-dynamic-builder/form-dynamic-builder.service';
import { Conditions } from '../conditions/conditions.service';
import { Observable } from 'rxjs';
export declare class Mapping {
    private rq;
    private googlemaps;
    private broker;
    private conditionsService;
    private config;
    private translate;
    protected xlsx: Xlsx;
    constructor(rq: Requestor, googlemaps: Googlemaps, broker: Broker, conditionsService: Conditions, config: Config, translate: Translate, xlsx: Xlsx);
    getTotal(mapping: IMapping): Promise<number>;
    convertMissionForExcelExport(slides: Array<any>, conditions: Array<any>): {
        columns: {
            name: string;
        }[];
        data: any[];
        title: string;
    }[];
    convertSlidesForExcelExport(slides: Array<any>): {
        columns: {
            name: string;
        }[];
        data: any[];
        title: string;
    };
    convertConditonsForExcelExport(conditions: Array<any>): {
        columns: {
            name: string;
        }[];
        data: any[];
        title: string;
    };
    upload(mapping: IMapping, collectionName: string, progress?: EventEmitter<number>): Promise<Array<IErrorMapping>>;
    convertTranslations(data: Array<Array<any>>): any[];
    convertLocations(data: Array<Array<any>>, progress: {
        count: number;
        total: number;
    }, cd: ChangeDetectorRef): Observable<Location[]>;
    convertFormAndConditions(data: Array<Array<Array<any>>>, formDynamicBuilder: FormDynamicBuilder): {
        slides: Array<Slide>;
        conditions: Array<Condition>;
        errors: Array<any>;
    };
    private createField;
    private createCondition;
    private removeEmptyRows;
    private _stringToArray;
    private isTrue;
}
