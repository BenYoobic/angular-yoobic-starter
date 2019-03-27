/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class PromiseService {
    constructor() {
        this.retryOnFailure = (/**
         * @param {?} functionToRetry
         * @param {?=} timesToRetry
         * @param {?=} delay
         * @return {?}
         */
        (functionToRetry, timesToRetry = 3, delay = 300) => {
            /** @type {?} */
            let retryCount = timesToRetry;
            /** @type {?} */
            let failureReason;
            /** @type {?} */
            let functionToIterate = (/**
             * @param {...?} args
             * @return {?}
             */
            (...args) => {
                if (retryCount < 1) {
                    return Promise.reject(failureReason);
                }
                else {
                    retryCount--;
                    return functionToRetry(...args).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    err => {
                        failureReason = err;
                        return this.wait(delay).then((/**
                         * @return {?}
                         */
                        () => functionToIterate(...args)));
                    }));
                }
            });
            return functionToIterate;
        });
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    wait(duration) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            setTimeout(resolve, duration);
        }));
    }
    /**
     * @param {?} ms
     * @param {?} promise
     * @return {?}
     */
    promiseTimeout(ms, promise) {
        // Create a promise that rejects in <ms> milliseconds
        /** @type {?} */
        let timeout = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            let id = setTimeout((/**
             * @return {?}
             */
            () => {
                clearTimeout(id);
                reject('Timed out in ' + ms + 'ms.');
            }), ms);
        }));
        // Returns a race between our timeout and the passed in promise
        return Promise.race([promise, timeout]);
    }
    /**
     * @param {?} promises
     * @return {?}
     */
    sequential(promises) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (!promises || promises.length === 0) {
                //throw new Error('First argument need to be an array of Promises');
                return resolve([]);
            }
            /** @type {?} */
            let count = 0;
            /** @type {?} */
            let results = [];
            /** @type {?} */
            const iterateeFunc = (/**
             * @param {?} previousPromise
             * @param {?} currentPromise
             * @return {?}
             */
            (previousPromise, currentPromise) => {
                return previousPromise
                    .then((/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    if (count++ !== 0) {
                        results = results.concat(result);
                    }
                    return currentPromise(result, results, count);
                }))
                    .catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                err => {
                    return reject(err);
                }));
            });
            promises = promises.concat((/**
             * @return {?}
             */
            () => Promise.resolve()));
            promises.reduce(iterateeFunc, Promise.resolve(false)).then((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                resolve(results);
            }));
        }));
        // let p = Promise.resolve();
        // return promises.reduce((pacc, fn) => {
        //     return pacc = pacc.then(fn);
        // }, p);
    }
}
PromiseService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    PromiseService.prototype.retryOnFailure;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE1BQU0sT0FBTyxjQUFjO0lBRDNCO1FBUUUsbUJBQWM7Ozs7OztRQUFHLENBQUMsZUFBZSxFQUFFLFlBQVksR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsRUFBRSxFQUFFOztnQkFDOUQsVUFBVSxHQUFHLFlBQVk7O2dCQUN6QixhQUFhOztnQkFDYixpQkFBaUI7Ozs7WUFBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtvQkFDbEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUN0QztxQkFBTTtvQkFDTCxVQUFVLEVBQUUsQ0FBQztvQkFDYixPQUFPLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUs7Ozs7b0JBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzFDLGFBQWEsR0FBRyxHQUFHLENBQUM7d0JBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJOzs7d0JBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBQyxDQUFDO29CQUNqRSxDQUFDLEVBQUMsQ0FBQztpQkFDSjtZQUNILENBQUMsQ0FBQTtZQUNELE9BQU8saUJBQWlCLENBQUM7UUFDM0IsQ0FBQyxFQUFDO0lBOENKLENBQUM7Ozs7O0lBbkVDLElBQUksQ0FBQyxRQUFRO1FBQ1gsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsVUFBVSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQW1CRCxjQUFjLENBQUMsRUFBRSxFQUFFLE9BQU87OztZQUVwQixPQUFPLEdBQUcsSUFBSSxPQUFPOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztnQkFDeEMsRUFBRSxHQUFHLFVBQVU7OztZQUFDLEdBQUcsRUFBRTtnQkFDdkIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLENBQUMsZUFBZSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUN2QyxDQUFDLEdBQUUsRUFBRSxDQUFDO1FBQ1IsQ0FBQyxFQUFDO1FBRUYsK0RBQStEO1FBQy9ELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLFFBQW9CO1FBQzdCLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3RDLG9FQUFvRTtnQkFDcEUsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDcEI7O2dCQUNHLEtBQUssR0FBRyxDQUFDOztnQkFDVCxPQUFPLEdBQUcsRUFBRTs7a0JBQ1YsWUFBWTs7Ozs7WUFBRyxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsRUFBRTtnQkFDdkQsT0FBTyxlQUFlO3FCQUNuQixJQUFJOzs7O2dCQUFDLFVBQVMsTUFBTTtvQkFDbkIsSUFBSSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7d0JBQ2pCLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNsQztvQkFDRCxPQUFPLGNBQWMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLEVBQUM7cUJBQ0QsS0FBSzs7OztnQkFBQyxHQUFHLENBQUMsRUFBRTtvQkFDWCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxFQUFDLENBQUM7WUFDUCxDQUFDLENBQUE7WUFDRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU07OztZQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBQyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBUyxHQUFHO2dCQUNyRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILDZCQUE2QjtRQUM3Qix5Q0FBeUM7UUFDekMsbUNBQW1DO1FBQ25DLFNBQVM7SUFDWCxDQUFDOzs7WUFwRUYsVUFBVTs7OztJQVFULHdDQWVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvbWlzZVNlcnZpY2Uge1xuICB3YWl0KGR1cmF0aW9uKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgZHVyYXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0cnlPbkZhaWx1cmUgPSAoZnVuY3Rpb25Ub1JldHJ5LCB0aW1lc1RvUmV0cnkgPSAzLCBkZWxheSA9IDMwMCkgPT4ge1xuICAgIGxldCByZXRyeUNvdW50ID0gdGltZXNUb1JldHJ5O1xuICAgIGxldCBmYWlsdXJlUmVhc29uO1xuICAgIGxldCBmdW5jdGlvblRvSXRlcmF0ZSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAocmV0cnlDb3VudCA8IDEpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGZhaWx1cmVSZWFzb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0cnlDb3VudC0tO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb25Ub1JldHJ5KC4uLmFyZ3MpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgZmFpbHVyZVJlYXNvbiA9IGVycjtcbiAgICAgICAgICByZXR1cm4gdGhpcy53YWl0KGRlbGF5KS50aGVuKCgpID0+IGZ1bmN0aW9uVG9JdGVyYXRlKC4uLmFyZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub0l0ZXJhdGU7XG4gIH07XG5cbiAgcHJvbWlzZVRpbWVvdXQobXMsIHByb21pc2UpIHtcbiAgICAvLyBDcmVhdGUgYSBwcm9taXNlIHRoYXQgcmVqZWN0cyBpbiA8bXM+IG1pbGxpc2Vjb25kc1xuICAgIGxldCB0aW1lb3V0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgIHJlamVjdCgnVGltZWQgb3V0IGluICcgKyBtcyArICdtcy4nKTtcbiAgICAgIH0sIG1zKTtcbiAgICB9KTtcblxuICAgIC8vIFJldHVybnMgYSByYWNlIGJldHdlZW4gb3VyIHRpbWVvdXQgYW5kIHRoZSBwYXNzZWQgaW4gcHJvbWlzZVxuICAgIHJldHVybiBQcm9taXNlLnJhY2UoW3Byb21pc2UsIHRpbWVvdXRdKTtcbiAgfVxuXG4gIHNlcXVlbnRpYWwocHJvbWlzZXM6IEFycmF5PGFueT4pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXByb21pc2VzIHx8IHByb21pc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvL3Rocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZCB0byBiZSBhbiBhcnJheSBvZiBQcm9taXNlcycpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICB9XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgICAgIGNvbnN0IGl0ZXJhdGVlRnVuYyA9IChwcmV2aW91c1Byb21pc2UsIGN1cnJlbnRQcm9taXNlKSA9PiB7XG4gICAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2VcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCsrICE9PSAwKSB7XG4gICAgICAgICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmNvbmNhdChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9taXNlKHJlc3VsdCwgcmVzdWx0cywgY291bnQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgcHJvbWlzZXMgPSBwcm9taXNlcy5jb25jYXQoKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCkpO1xuICAgICAgcHJvbWlzZXMucmVkdWNlKGl0ZXJhdGVlRnVuYywgUHJvbWlzZS5yZXNvbHZlKGZhbHNlKSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gbGV0IHAgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAvLyByZXR1cm4gcHJvbWlzZXMucmVkdWNlKChwYWNjLCBmbikgPT4ge1xuICAgIC8vICAgICByZXR1cm4gcGFjYyA9IHBhY2MudGhlbihmbik7XG4gICAgLy8gfSwgcCk7XG4gIH1cbn1cbiJdfQ==