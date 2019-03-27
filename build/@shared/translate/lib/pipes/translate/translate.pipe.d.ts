import { PipeTransform } from '@angular/core';
import { Translate } from '../../services/translate/translate.service';
export declare class TranslatePipe implements PipeTransform {
    private translate;
    constructor(translate: Translate);
    transform(value: string, ...args: string[]): any;
}
