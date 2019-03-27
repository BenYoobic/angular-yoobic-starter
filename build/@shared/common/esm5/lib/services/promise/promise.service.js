/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var PromiseService = /** @class */ (function () {
    function PromiseService() {
        var _this = this;
        this.retryOnFailure = (/**
         * @param {?} functionToRetry
         * @param {?=} timesToRetry
         * @param {?=} delay
         * @return {?}
         */
        function (functionToRetry, timesToRetry, delay) {
            if (timesToRetry === void 0) { timesToRetry = 3; }
            if (delay === void 0) { delay = 300; }
            /** @type {?} */
            var retryCount = timesToRetry;
            /** @type {?} */
            var failureReason;
            /** @type {?} */
            var functionToIterate = (/**
             * @param {...?} args
             * @return {?}
             */
            function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (retryCount < 1) {
                    return Promise.reject(failureReason);
                }
                else {
                    retryCount--;
                    return functionToRetry.apply(void 0, tslib_1.__spread(args)).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) {
                        failureReason = err;
                        return _this.wait(delay).then((/**
                         * @return {?}
                         */
                        function () { return functionToIterate.apply(void 0, tslib_1.__spread(args)); }));
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
    PromiseService.prototype.wait = /**
     * @param {?} duration
     * @return {?}
     */
    function (duration) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            setTimeout(resolve, duration);
        }));
    };
    /**
     * @param {?} ms
     * @param {?} promise
     * @return {?}
     */
    PromiseService.prototype.promiseTimeout = /**
     * @param {?} ms
     * @param {?} promise
     * @return {?}
     */
    function (ms, promise) {
        // Create a promise that rejects in <ms> milliseconds
        /** @type {?} */
        var timeout = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var id = setTimeout((/**
             * @return {?}
             */
            function () {
                clearTimeout(id);
                reject('Timed out in ' + ms + 'ms.');
            }), ms);
        }));
        // Returns a race between our timeout and the passed in promise
        return Promise.race([promise, timeout]);
    };
    /**
     * @param {?} promises
     * @return {?}
     */
    PromiseService.prototype.sequential = /**
     * @param {?} promises
     * @return {?}
     */
    function (promises) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (!promises || promises.length === 0) {
                //throw new Error('First argument need to be an array of Promises');
                return resolve([]);
            }
            /** @type {?} */
            var count = 0;
            /** @type {?} */
            var results = [];
            /** @type {?} */
            var iterateeFunc = (/**
             * @param {?} previousPromise
             * @param {?} currentPromise
             * @return {?}
             */
            function (previousPromise, currentPromise) {
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
                function (err) {
                    return reject(err);
                }));
            });
            promises = promises.concat((/**
             * @return {?}
             */
            function () { return Promise.resolve(); }));
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
    };
    PromiseService.decorators = [
        { type: Injectable }
    ];
    return PromiseService;
}());
export { PromiseService };
if (false) {
    /** @type {?} */
    PromiseService.prototype.retryOnFailure;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3Byb21pc2UvcHJvbWlzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQztJQUFBO1FBQUEsaUJBcUVDO1FBN0RDLG1CQUFjOzs7Ozs7UUFBRyxVQUFDLGVBQWUsRUFBRSxZQUFnQixFQUFFLEtBQVc7WUFBN0IsNkJBQUEsRUFBQSxnQkFBZ0I7WUFBRSxzQkFBQSxFQUFBLFdBQVc7O2dCQUMxRCxVQUFVLEdBQUcsWUFBWTs7Z0JBQ3pCLGFBQWE7O2dCQUNiLGlCQUFpQjs7OztZQUFHO2dCQUFDLGNBQU87cUJBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztvQkFBUCx5QkFBTzs7Z0JBQzlCLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtvQkFDbEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUN0QztxQkFBTTtvQkFDTCxVQUFVLEVBQUUsQ0FBQztvQkFDYixPQUFPLGVBQWUsZ0NBQUksSUFBSSxHQUFFLEtBQUs7Ozs7b0JBQUMsVUFBQSxHQUFHO3dCQUN2QyxhQUFhLEdBQUcsR0FBRyxDQUFDO3dCQUNwQixPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSTs7O3dCQUFDLGNBQU0sT0FBQSxpQkFBaUIsZ0NBQUksSUFBSSxJQUF6QixDQUEwQixFQUFDLENBQUM7b0JBQ2pFLENBQUMsRUFBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFBO1lBQ0QsT0FBTyxpQkFBaUIsQ0FBQztRQUMzQixDQUFDLEVBQUM7SUE4Q0osQ0FBQzs7Ozs7SUFuRUMsNkJBQUk7Ozs7SUFBSixVQUFLLFFBQVE7UUFDWCxPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFtQkQsdUNBQWM7Ozs7O0lBQWQsVUFBZSxFQUFFLEVBQUUsT0FBTzs7O1lBRXBCLE9BQU8sR0FBRyxJQUFJLE9BQU87Ozs7O1FBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTs7Z0JBQ3BDLEVBQUUsR0FBRyxVQUFVOzs7WUFBQztnQkFDbEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLENBQUMsZUFBZSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUN2QyxDQUFDLEdBQUUsRUFBRSxDQUFDO1FBQ1IsQ0FBQyxFQUFDO1FBRUYsK0RBQStEO1FBQy9ELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRUQsbUNBQVU7Ozs7SUFBVixVQUFXLFFBQW9CO1FBQzdCLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDdEMsb0VBQW9FO2dCQUNwRSxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNwQjs7Z0JBQ0csS0FBSyxHQUFHLENBQUM7O2dCQUNULE9BQU8sR0FBRyxFQUFFOztnQkFDVixZQUFZOzs7OztZQUFHLFVBQUMsZUFBZSxFQUFFLGNBQWM7Z0JBQ25ELE9BQU8sZUFBZTtxQkFDbkIsSUFBSTs7OztnQkFBQyxVQUFTLE1BQU07b0JBQ25CLElBQUksS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO3dCQUNqQixPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDbEM7b0JBQ0QsT0FBTyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEQsQ0FBQyxFQUFDO3FCQUNELEtBQUs7Ozs7Z0JBQUMsVUFBQSxHQUFHO29CQUNSLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixDQUFDLEVBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQTtZQUNELFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTTs7O1lBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBUyxHQUFHO2dCQUNyRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILDZCQUE2QjtRQUM3Qix5Q0FBeUM7UUFDekMsbUNBQW1DO1FBQ25DLFNBQVM7SUFDWCxDQUFDOztnQkFwRUYsVUFBVTs7SUFxRVgscUJBQUM7Q0FBQSxBQXJFRCxJQXFFQztTQXBFWSxjQUFjOzs7SUFPekIsd0NBZUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9taXNlU2VydmljZSB7XG4gIHdhaXQoZHVyYXRpb24pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dChyZXNvbHZlLCBkdXJhdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICByZXRyeU9uRmFpbHVyZSA9IChmdW5jdGlvblRvUmV0cnksIHRpbWVzVG9SZXRyeSA9IDMsIGRlbGF5ID0gMzAwKSA9PiB7XG4gICAgbGV0IHJldHJ5Q291bnQgPSB0aW1lc1RvUmV0cnk7XG4gICAgbGV0IGZhaWx1cmVSZWFzb247XG4gICAgbGV0IGZ1bmN0aW9uVG9JdGVyYXRlID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChyZXRyeUNvdW50IDwgMSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZmFpbHVyZVJlYXNvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXRyeUNvdW50LS07XG4gICAgICAgIHJldHVybiBmdW5jdGlvblRvUmV0cnkoLi4uYXJncykuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICBmYWlsdXJlUmVhc29uID0gZXJyO1xuICAgICAgICAgIHJldHVybiB0aGlzLndhaXQoZGVsYXkpLnRoZW4oKCkgPT4gZnVuY3Rpb25Ub0l0ZXJhdGUoLi4uYXJncykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvblRvSXRlcmF0ZTtcbiAgfTtcblxuICBwcm9taXNlVGltZW91dChtcywgcHJvbWlzZSkge1xuICAgIC8vIENyZWF0ZSBhIHByb21pc2UgdGhhdCByZWplY3RzIGluIDxtcz4gbWlsbGlzZWNvbmRzXG4gICAgbGV0IHRpbWVvdXQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgcmVqZWN0KCdUaW1lZCBvdXQgaW4gJyArIG1zICsgJ21zLicpO1xuICAgICAgfSwgbXMpO1xuICAgIH0pO1xuXG4gICAgLy8gUmV0dXJucyBhIHJhY2UgYmV0d2VlbiBvdXIgdGltZW91dCBhbmQgdGhlIHBhc3NlZCBpbiBwcm9taXNlXG4gICAgcmV0dXJuIFByb21pc2UucmFjZShbcHJvbWlzZSwgdGltZW91dF0pO1xuICB9XG5cbiAgc2VxdWVudGlhbChwcm9taXNlczogQXJyYXk8YW55Pik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghcHJvbWlzZXMgfHwgcHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBuZWVkIHRvIGJlIGFuIGFycmF5IG9mIFByb21pc2VzJyk7XG4gICAgICAgIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgIH1cbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgY29uc3QgaXRlcmF0ZWVGdW5jID0gKHByZXZpb3VzUHJvbWlzZSwgY3VycmVudFByb21pc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGNvdW50KysgIT09IDApIHtcbiAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb21pc2UocmVzdWx0LCByZXN1bHRzLCBjb3VudCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBwcm9taXNlcyA9IHByb21pc2VzLmNvbmNhdCgoKSA9PiBQcm9taXNlLnJlc29sdmUoKSk7XG4gICAgICBwcm9taXNlcy5yZWR1Y2UoaXRlcmF0ZWVGdW5jLCBQcm9taXNlLnJlc29sdmUoZmFsc2UpKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBsZXQgcCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIC8vIHJldHVybiBwcm9taXNlcy5yZWR1Y2UoKHBhY2MsIGZuKSA9PiB7XG4gICAgLy8gICAgIHJldHVybiBwYWNjID0gcGFjYy50aGVuKGZuKTtcbiAgICAvLyB9LCBwKTtcbiAgfVxufVxuIl19