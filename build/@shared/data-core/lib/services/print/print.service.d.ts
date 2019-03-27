import { EventEmitter } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Files } from '../files/files.service';
import { Config } from '../config/config.service';
import { Authentication } from '../authentication/authentication.service';
import { IFormField, Query, SubQuery, IColumnDefinition } from '@shared/stencil';
export declare class Print {
    protected rq: Requestor;
    protected config: Config;
    protected authentication: Authentication;
    protected files: Files;
    protected excludedDashboardColumns: Array<string>;
    constructor(rq: Requestor, config: Config, authentication: Authentication, files: Files);
    printToMapping(collectionName: string, columns: Array<IFormField>, query: Query, subQuery: SubQuery, aggregateOptions: Array<any>, type: 'csv' | 'xlsx', campaignFields: Array<IFormField>, filename?: string, progress?: EventEmitter<number>): Promise<void>;
    printToSpreadsheet(collectionName: string, columns: Array<IColumnDefinition>, query: Query, subQuery: SubQuery, aggregateOptions: Array<any>, channel: string, type: string, campaignFields: Array<IFormField>, filename?: string): Promise<any>;
}
