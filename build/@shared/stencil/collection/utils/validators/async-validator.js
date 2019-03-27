export function combineAsyncValidators(x, y) {
    return async (a) => (await x(a)) && (await y(a));
}
export function getReducedAsyncValidator(validators) {
    return (validators || []).reduce(combineAsyncValidators, async (a) => true);
}
