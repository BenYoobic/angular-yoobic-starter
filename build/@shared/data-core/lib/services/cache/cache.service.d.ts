import { IEntity } from '@shared/stencil';
import { LocalForageService, PromiseService, Log } from '@shared/common';
export declare class Cache {
    protected localForage: LocalForageService;
    protected promise: PromiseService;
    protected log: Log;
    static OFFLINE_PREFIX: string;
    constructor(localForage: LocalForageService, promise: PromiseService, log: Log);
    add(cacheKey: string, entryKey: string, item: any): Promise<any>;
    get(cacheKey: string, entryKey: string): import("rxjs").Observable<any>;
    getAll(cacheKey: string): Promise<any[]>;
    remove(cacheKey: string, entryKey: string): import("rxjs").Observable<{}>;
    getDatabaseCacheKey(collectionName: string): string;
    getDatabaseCollection<T = IEntity>(collectionName: string): Promise<Array<T>>;
    setDatabaseCollection<T = IEntity>(collectionName: string, items: Array<T>): Promise<Array<T>>;
    updateDatabaseCollection<T = IEntity>(collectionName: string, items: Array<T>, idField?: string, deletedKeys?: Array<string>): Promise<{}>;
    clearDatabaseCollection(collectionName: string): any;
    upsertInDatabaseCollection<T = IEntity>(collectionName: string, entity: T, patch?: boolean, idField?: string): Promise<T>;
    removeFromDatabaseCollection<T = IEntity>(collectionName: string, id: string, idField?: string): Promise<T[]>;
    replaceFromDatabaseCollection<T = IEntity>(collectionName: string, id: string, newEntity: T, idField?: string): Promise<T[]>;
    getByIdFromDatabaseCollection<T = IEntity>(collectionName: string, id: string, idField?: string): Promise<T>;
}
