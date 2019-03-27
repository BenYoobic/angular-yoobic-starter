import { PipeTransform } from '@angular/core';
import { Translate } from '@shared/translate';
export declare class FilterPipe implements PipeTransform {
    private translate;
    constructor(translate: Translate);
    transform(value: Array<any>, ...args: any[]): any;
    getStringToTest(s: string, translate: boolean): string;
}
