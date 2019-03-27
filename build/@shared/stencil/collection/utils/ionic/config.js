export class Config {
    constructor(configObj) {
        let entriesArray = [];
        for (const key in configObj) {
            entriesArray.push([key, configObj[key]]);
        }
        this.m = new Map(entriesArray);
    }
    get(key, fallback) {
        const value = this.m.get(key);
        return value !== undefined ? value : fallback;
    }
    getBoolean(key, fallback = false) {
        const val = this.m.get(key);
        if (val === undefined) {
            return fallback;
        }
        if (typeof val === 'string') {
            return val === 'true';
        }
        return !!val;
    }
    getNumber(key, fallback) {
        const val = parseFloat(this.m.get(key));
        return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
    }
    set(key, value) {
        this.m.set(key, value);
    }
}
