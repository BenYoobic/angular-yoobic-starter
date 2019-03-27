export declare class PromiseService {
    wait(duration: any): Promise<{}>;
    retryOnFailure: (functionToRetry: any, timesToRetry?: number, delay?: number) => (...args: any[]) => any;
    promiseTimeout(ms: any, promise: any): Promise<any>;
    sequential(promises: Array<any>): Promise<any>;
}
