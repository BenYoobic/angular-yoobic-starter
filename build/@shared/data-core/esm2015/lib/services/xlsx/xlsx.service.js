/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
//import { WorkBook, read, readFile, utils, SSF, write } from 'xlsx';
import * as XLSX from 'xlsx';
//const XLSX = require('xlsx');
import { toDate, getUTCOffset, dateAdd, dateFormat } from '@shared/stencil';
//import * as FileSaver from 'file-saver';
import saveAs from 'file-saver';
import { parse } from 'papaparse';
import { forEach, get, isArray, isObject, isNumber, keys, find, isDate } from 'lodash-es';
//declare const System: System;
export class Xlsx {
    // private _xlsx: any;
    // private _papaparse: any;
    constructor() { }
    // getXlsx() {
    //     if (this._xlsx) {
    //         return Promise.resolve(this._xlsx);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'xlsx').then((xlsx) => {
    //         this._xlsx = xlsx;
    //         return xlsx;
    //     });
    // }
    // getPapaParse() {
    //     if (this._papaparse) {
    //         return Promise.resolve(this._papaparse);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'papaparse').then((papaparse) => {
    //         this._papaparse = papaparse;
    //         return papaparse;
    //     });
    // }
    /**
     * @param {?} nativeFile
     * @param {?=} type
     * @param {?=} encoding
     * @return {?}
     */
    readFile(nativeFile, type = 'blob', encoding) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            let fileReader = new FileReader();
            fileReader.onload = (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                resolve(e.target.result);
            });
            fileReader.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            e => reject(e));
            if (type === 'blob') {
                fileReader.readAsDataURL((/** @type {?} */ (nativeFile)));
            }
            else if (type === 'binary') {
                fileReader.readAsBinaryString((/** @type {?} */ (nativeFile)));
            }
            else {
                fileReader.readAsText((/** @type {?} */ (nativeFile)), encoding);
            }
        }));
    }
    /**
     * @param {?} file
     * @return {?}
     */
    read(file) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            let csv = '';
            if (file.name.endsWith('csv')) {
                csv = data;
            }
            else {
                /** @type {?} */
                let workbook = XLSX.read(data, { type: 'binary' });
                /** @type {?} */
                let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                csv = XLSX.utils['sheet_to_csv'](worksheet, { FS: ';' });
            }
            /** @type {?} */
            let retVal = parse(csv, { skipEmptyLines: true });
            return retVal.data;
        }));
        //});
        //});
    }
    /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    exportToFile(content, type, encoding, filename) {
        encoding = encoding || 'charset=ISO-8859-1';
        filename = filename || 'data.csv';
        type = type || 'data:application/csv;charset=ISO-8859-1;';
        if (encoding === 'base64') {
            content = this.b64toBlob(content, type);
        }
        /** @type {?} */
        let blob = new Blob([content], {
            type: type
        });
        return this.saveBlob(blob, filename);
    }
    /**
     * @param {?} blob
     * @param {?} filename
     * @return {?}
     */
    saveBlob(blob, filename) {
        ((/** @type {?} */ (saveAs)))(blob, filename);
    }
    /**
     * @param {?} base64
     * @return {?}
     */
    getBase64MimeType(base64) {
        return base64.split(';')[0].replace('data:', '');
    }
    /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    b64toBlob(b64Data, contentType = null, sliceSize = 512) {
        if (!contentType) {
            contentType = this.getBase64MimeType(b64Data);
        }
        b64Data = b64Data.replace('data:' + contentType + ';base64,', '').replace(/\s/g, '');
        /** @type {?} */
        const byteCharacters = atob(b64Data);
        /** @type {?} */
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            /** @type {?} */
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            /** @type {?} */
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            /** @type {?} */
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        /** @type {?} */
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    /**
     * @param {?} file
     * @return {?}
     */
    readSheets(file) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            let retVal = [];
            if (file.name.endsWith('csv')) {
                retVal.push(parse(data, { skipEmptyLines: true }).data);
            }
            else {
                /** @type {?} */
                let workbook = XLSX.read(data, { type: 'binary' });
                workbook.SheetNames.forEach((/**
                 * @param {?} sheet
                 * @return {?}
                 */
                sheet => {
                    /** @type {?} */
                    let v = XLSX.utils['sheet_to_csv'](workbook.Sheets[sheet], { FS: ';' });
                    retVal.push(parse(v, { skipEmptyLines: true }).data);
                }));
            }
            return retVal;
        }));
        //});
        //});
    }
    /**
     * @param {?} title
     * @param {?} sheets
     * @return {?}
     */
    write(title, sheets) {
        //return this.getXlsx().then((xlsx: any) => {
        /** @type {?} */
        let tables = new Array();
        /** @type {?} */
        let headers = new Array();
        forEach(sheets, (/**
         * @param {?} s
         * @return {?}
         */
        s => {
            /** @type {?} */
            let hasHeader = false;
            /** @type {?} */
            let table = [];
            /** @type {?} */
            let header = [];
            forEach(s.data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                let row = [];
                forEach(s.columns, (/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) {
                    if (!((c.visible === false || c.suppressExport === true || c.action) && c.forceExport !== true)) {
                        /** @type {?} */
                        let value = get(d, c.name);
                        if (c.type === 'address') {
                            value = value && value.address ? value.address : value;
                            if (typeof value === 'object') {
                                value = null;
                            }
                        }
                        if (c.type === 'catalog') {
                            delete value.valid;
                            /** @type {?} */
                            let retVal = '';
                            keys(value).forEach((/**
                             * @param {?} pid
                             * @return {?}
                             */
                            function (pid) {
                                /** @type {?} */
                                let product = find(c.products, (/**
                                 * @param {?} p
                                 * @return {?}
                                 */
                                (p) => {
                                    return p._id === pid;
                                }));
                                if (product) {
                                    retVal += product.reference + ' * ' + value[pid] + ',';
                                }
                            }));
                            value = retVal; //JSON.stringify(value).replace('{', '').replace('}', '');
                        }
                        if (c.type === 'date' && value) {
                            /** @type {?} */
                            let m = toDate(value);
                            m = dateAdd(m, 'minutes', getUTCOffset(m));
                            value = m;
                        }
                        if (c.type === 'time' && value) {
                            /** @type {?} */
                            let t = toDate(value);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value = dateFormat(t, 'HH:mm:ss');
                        }
                        if (c.type === 'datetime' && value) {
                            /** @type {?} */
                            let dt = toDate(value);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value = dateFormat(dt, 'L LT');
                        }
                        if (c.name === '_acl') {
                            value = value.groups.r; //_difference(value.groups.r, roles);
                        }
                        if (value && value._downloadURL) {
                            value = value._downloadURL;
                        }
                        if (isObject(value) && !isDate(value) && !isArray(value)) {
                            //&& _isEmpty(value)
                            value = null;
                        }
                        row.push(value);
                        if (!hasHeader) {
                            header.push(c.displayName || c.name);
                        }
                    }
                }));
                hasHeader = true;
                table.push(row);
            }));
            tables.push(table);
            headers.push(header);
        }));
        /** @type {?} */
        let wb = { SheetNames: [], Sheets: {}, Props: null };
        for (let i = 0; i < tables.length; i++) {
            tables[i].unshift(headers[i]);
            /** @type {?} */
            let wsName = sheets[i].title || 'SheetJs_' + i;
            /** @type {?} */
            let ws = this.sheetFromArrayOfArrays(tables[i]);
            wb.SheetNames.push(wsName);
            wb.Sheets[wsName] = ws;
        }
        /** @type {?} */
        let wbout = XLSX.write(wb, (/** @type {?} */ ({ bookType: 'xlsx', bookSST: true, type: 'binary' })));
        /** @type {?} */
        let filename = title + '-' + dateFormat(new Date(), 'YYYY-MM-DDTHH:MM') + '.xlsx';
        this.exportToFile(this.s2ab(wbout), 'application/octet-stream', '', filename);
        //});
    }
    /**
     * @private
     * @param {?} v
     * @param {?=} date1904
     * @return {?}
     */
    datenum(v, date1904) {
        if (date1904) {
            v += 1462;
        }
        /** @type {?} */
        let epoch = Date.parse(v);
        return (epoch - (/** @type {?} */ (new Date(Date.UTC(1899, 11, 30))))) / (24 * 60 * 60 * 1000);
    }
    /**
     * @private
     * @param {?} data
     * @param {?=} opts
     * @return {?}
     */
    sheetFromArrayOfArrays(data, opts) {
        /** @type {?} */
        let ws = {};
        /** @type {?} */
        let range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (let R = 0; R !== data.length; ++R) {
            for (let C = 0; C !== data[R].length; ++C) {
                if (range.s.r > R) {
                    range.s.r = R;
                }
                if (range.s.c > C) {
                    range.s.c = C;
                }
                if (range.e.r < R) {
                    range.e.r = R;
                }
                if (range.e.c < C) {
                    range.e.c = C;
                }
                /** @type {?} */
                let cell = {
                    v: data[R][C]
                };
                if (cell.v === null) {
                    continue;
                }
                /** @type {?} */
                let cellRef = XLSX.utils.encode_cell({ c: C, r: R });
                if (typeof cell.v === 'number') {
                    cell.t = 'n';
                }
                else if (typeof cell.v === 'boolean') {
                    cell.t = 'b';
                }
                else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = ((/** @type {?} */ (XLSX.SSF)))._table[14];
                    cell.v = this.datenum(cell.v);
                }
                else if (isArray(cell.v) && cell.v.length > 0 && isNumber(cell.v[0])) {
                    cell.t = 's';
                    cell.v = '[' + cell.v.join(',') + ']';
                }
                else if (isArray(cell.v) && cell.v.length > 0 && !isNumber(cell.v[0])) {
                    cell.t = 's';
                    cell.v = cell.v.join(',');
                }
                else if (isArray(cell.v) && cell.v.length === 0) {
                    cell.t = 's';
                    cell.v = '';
                }
                else {
                    cell.t = 's';
                }
                ws[cellRef] = cell;
            }
        }
        if (range.s.c < 10000000) {
            ws['!ref'] = XLSX.utils.encode_range(range.s, range.e);
        }
        return ws;
    }
    /**
     * @private
     * @param {?} s
     * @return {?}
     */
    s2ab(s) {
        /** @type {?} */
        let buf = new ArrayBuffer(s.length);
        /** @type {?} */
        let view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    }
}
Xlsx.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Xlsx.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzeC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3hsc3gveGxzeC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQzs7QUFFN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUc1RSxPQUFPLE1BQU0sTUFBTSxZQUFZLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFLMUYsTUFBTSxPQUFPLElBQUk7OztJQUlmLGdCQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzQmhCLFFBQVEsQ0FBQyxVQUF1QixFQUFFLElBQUksR0FBRyxNQUFNLEVBQUUsUUFBaUI7UUFDaEUsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O2dCQUNqQyxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUU7WUFDakMsVUFBVSxDQUFDLE1BQU07Ozs7WUFBRyxDQUFDLENBQU0sRUFBRSxFQUFFO2dCQUM3QixPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUEsQ0FBQztZQUNGLFVBQVUsQ0FBQyxPQUFPOzs7O1lBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUNwQyxJQUFJ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QUFHLElBQUksQ0FBQzthQUNwQjtTQUNGO1FBQ0QsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUU7WUFDeEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7Ozs7SUFFTyxJQUFJLENBQUMsQ0FBQzs7WUFDUixHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzs7WUFDL0IsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDbEM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7OztZQXpSRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy9pbXBvcnQgeyBXb3JrQm9vaywgcmVhZCwgcmVhZEZpbGUsIHV0aWxzLCBTU0YsIHdyaXRlIH0gZnJvbSAneGxzeCc7XG5pbXBvcnQgKiBhcyBYTFNYIGZyb20gJ3hsc3gnO1xuLy9jb25zdCBYTFNYID0gcmVxdWlyZSgneGxzeCcpO1xuaW1wb3J0IHsgdG9EYXRlLCBnZXRVVENPZmZzZXQsIGRhdGVBZGQsIGRhdGVGb3JtYXQgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG4vL2ltcG9ydCAqIGFzIEZpbGVTYXZlciBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCBzYXZlQXMgZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3BhcGFwYXJzZSc7XG5cbmltcG9ydCB7IGZvckVhY2gsIGdldCwgaXNBcnJheSwgaXNPYmplY3QsIGlzTnVtYmVyLCBrZXlzLCBmaW5kLCBpc0RhdGUgfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG4vL2RlY2xhcmUgY29uc3QgU3lzdGVtOiBTeXN0ZW07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBYbHN4IHtcbiAgLy8gcHJpdmF0ZSBfeGxzeDogYW55O1xuICAvLyBwcml2YXRlIF9wYXBhcGFyc2U6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gZ2V0WGxzeCgpIHtcbiAgLy8gICAgIGlmICh0aGlzLl94bHN4KSB7XG4gIC8vICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl94bHN4KTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIHJldHVybiBTeXN0ZW0uaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwieGxzeFwiICovJ3hsc3gnKS50aGVuKCh4bHN4KSA9PiB7XG4gIC8vICAgICAgICAgdGhpcy5feGxzeCA9IHhsc3g7XG4gIC8vICAgICAgICAgcmV0dXJuIHhsc3g7XG4gIC8vICAgICB9KTtcbiAgLy8gfVxuXG4gIC8vIGdldFBhcGFQYXJzZSgpIHtcbiAgLy8gICAgIGlmICh0aGlzLl9wYXBhcGFyc2UpIHtcbiAgLy8gICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3BhcGFwYXJzZSk7XG4gIC8vICAgICB9XG4gIC8vICAgICByZXR1cm4gU3lzdGVtLmltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcInhsc3hcIiAqLydwYXBhcGFyc2UnKS50aGVuKChwYXBhcGFyc2UpID0+IHtcbiAgLy8gICAgICAgICB0aGlzLl9wYXBhcGFyc2UgPSBwYXBhcGFyc2U7XG4gIC8vICAgICAgICAgcmV0dXJuIHBhcGFwYXJzZTtcbiAgLy8gICAgIH0pO1xuICAvLyB9XG5cbiAgcmVhZEZpbGUobmF0aXZlRmlsZTogRmlsZSB8IEJsb2IsIHR5cGUgPSAnYmxvYicsIGVuY29kaW5nPzogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSAoZTogYW55KSA9PiB7XG4gICAgICAgIHJlc29sdmUoZS50YXJnZXQucmVzdWx0KTtcbiAgICAgIH07XG4gICAgICBmaWxlUmVhZGVyLm9uZXJyb3IgPSBlID0+IHJlamVjdChlKTtcbiAgICAgIGlmICh0eXBlID09PSAnYmxvYicpIHtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKDxhbnk+bmF0aXZlRmlsZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdiaW5hcnknKSB7XG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzQmluYXJ5U3RyaW5nKDxhbnk+bmF0aXZlRmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc1RleHQoPGFueT5uYXRpdmVGaWxlLCBlbmNvZGluZyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZWFkKGZpbGU6IEZpbGUpIHtcbiAgICAvL3JldHVybiB0aGlzLmdldFhsc3goKS50aGVuKCh4bHN4OiBhbnkpID0+IHtcbiAgICAvL3JldHVybiB0aGlzLmdldFBhcGFQYXJzZSgpLnRoZW4oKHBhcGFwYXJzZTogYW55KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucmVhZEZpbGUoZmlsZSwgJ2JpbmFyeScpLnRoZW4oZGF0YSA9PiB7XG4gICAgICBsZXQgY3N2ID0gJyc7XG4gICAgICBpZiAoZmlsZS5uYW1lLmVuZHNXaXRoKCdjc3YnKSkge1xuICAgICAgICBjc3YgPSBkYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHdvcmtib29rID0gWExTWC5yZWFkKGRhdGEsIHsgdHlwZTogJ2JpbmFyeScgfSk7XG4gICAgICAgIGxldCB3b3Jrc2hlZXQgPSB3b3JrYm9vay5TaGVldHNbd29ya2Jvb2suU2hlZXROYW1lc1swXV07XG4gICAgICAgIGNzdiA9IFhMU1gudXRpbHNbJ3NoZWV0X3RvX2NzdiddKHdvcmtzaGVldCwgeyBGUzogJzsnIH0pO1xuICAgICAgfVxuICAgICAgbGV0IHJldFZhbCA9IHBhcnNlKGNzdiwgeyBza2lwRW1wdHlMaW5lczogdHJ1ZSB9KTtcbiAgICAgIHJldHVybiByZXRWYWwuZGF0YTtcbiAgICB9KTtcbiAgICAvL30pO1xuICAgIC8vfSk7XG4gIH1cblxuICBleHBvcnRUb0ZpbGUoY29udGVudCwgdHlwZSwgZW5jb2RpbmcsIGZpbGVuYW1lKSB7XG4gICAgZW5jb2RpbmcgPSBlbmNvZGluZyB8fCAnY2hhcnNldD1JU08tODg1OS0xJztcbiAgICBmaWxlbmFtZSA9IGZpbGVuYW1lIHx8ICdkYXRhLmNzdic7XG4gICAgdHlwZSA9IHR5cGUgfHwgJ2RhdGE6YXBwbGljYXRpb24vY3N2O2NoYXJzZXQ9SVNPLTg4NTktMTsnO1xuXG4gICAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0Jykge1xuICAgICAgY29udGVudCA9IHRoaXMuYjY0dG9CbG9iKGNvbnRlbnQsIHR5cGUpO1xuICAgIH1cbiAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSwge1xuICAgICAgdHlwZTogdHlwZVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLnNhdmVCbG9iKGJsb2IsIGZpbGVuYW1lKTtcbiAgfVxuXG4gIHNhdmVCbG9iKGJsb2I6IEJsb2IsIGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAoPGFueT5zYXZlQXMpKGJsb2IsIGZpbGVuYW1lKTtcbiAgfVxuXG4gIGdldEJhc2U2NE1pbWVUeXBlKGJhc2U2NCkge1xuICAgIHJldHVybiBiYXNlNjQuc3BsaXQoJzsnKVswXS5yZXBsYWNlKCdkYXRhOicsICcnKTtcbiAgfVxuXG4gIGI2NHRvQmxvYihiNjREYXRhLCBjb250ZW50VHlwZSA9IG51bGwsIHNsaWNlU2l6ZSA9IDUxMikge1xuICAgIGlmICghY29udGVudFR5cGUpIHtcbiAgICAgIGNvbnRlbnRUeXBlID0gdGhpcy5nZXRCYXNlNjRNaW1lVHlwZShiNjREYXRhKTtcbiAgICB9XG4gICAgYjY0RGF0YSA9IGI2NERhdGEucmVwbGFjZSgnZGF0YTonICsgY29udGVudFR5cGUgKyAnO2Jhc2U2NCwnLCAnJykucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICBjb25zdCBieXRlQ2hhcmFjdGVycyA9IGF0b2IoYjY0RGF0YSk7XG4gICAgY29uc3QgYnl0ZUFycmF5cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYnl0ZUNoYXJhY3RlcnMubGVuZ3RoOyBvZmZzZXQgKz0gc2xpY2VTaXplKSB7XG4gICAgICBjb25zdCBzbGljZSA9IGJ5dGVDaGFyYWN0ZXJzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgc2xpY2VTaXplKTtcbiAgICAgIGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KHNsaWNlLmxlbmd0aCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJ5dGVOdW1iZXJzW2ldID0gc2xpY2UuY2hhckNvZGVBdChpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJ5dGVBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ5dGVOdW1iZXJzKTtcbiAgICAgIGJ5dGVBcnJheXMucHVzaChieXRlQXJyYXkpO1xuICAgIH1cbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoYnl0ZUFycmF5cywgeyB0eXBlOiBjb250ZW50VHlwZSB9KTtcbiAgICByZXR1cm4gYmxvYjtcbiAgfVxuXG4gIHJlYWRTaGVldHMoZmlsZTogRmlsZSkge1xuICAgIC8vcmV0dXJuIHRoaXMuZ2V0WGxzeCgpLnRoZW4oKHhsc3g6IGFueSkgPT4ge1xuICAgIC8vcmV0dXJuIHRoaXMuZ2V0UGFwYVBhcnNlKCkudGhlbigocGFwYXBhcnNlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdGhpcy5yZWFkRmlsZShmaWxlLCAnYmluYXJ5JykudGhlbihkYXRhID0+IHtcbiAgICAgIGxldCByZXRWYWwgPSBbXTtcbiAgICAgIGlmIChmaWxlLm5hbWUuZW5kc1dpdGgoJ2NzdicpKSB7XG4gICAgICAgIHJldFZhbC5wdXNoKHBhcnNlKGRhdGEsIHsgc2tpcEVtcHR5TGluZXM6IHRydWUgfSkuZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgd29ya2Jvb2sgPSBYTFNYLnJlYWQoZGF0YSwgeyB0eXBlOiAnYmluYXJ5JyB9KTtcbiAgICAgICAgd29ya2Jvb2suU2hlZXROYW1lcy5mb3JFYWNoKHNoZWV0ID0+IHtcbiAgICAgICAgICBsZXQgdiA9IFhMU1gudXRpbHNbJ3NoZWV0X3RvX2NzdiddKHdvcmtib29rLlNoZWV0c1tzaGVldF0sIHsgRlM6ICc7JyB9KTtcbiAgICAgICAgICByZXRWYWwucHVzaChwYXJzZSh2LCB7IHNraXBFbXB0eUxpbmVzOiB0cnVlIH0pLmRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfSk7XG4gICAgLy99KTtcbiAgICAvL30pO1xuICB9XG5cbiAgd3JpdGUodGl0bGU6IHN0cmluZywgc2hlZXRzOiBBcnJheTx7IGNvbHVtbnM6IEFycmF5PGFueT47IGRhdGE6IEFycmF5PGFueT47IHRpdGxlOiBzdHJpbmcgfT4pIHtcbiAgICAvL3JldHVybiB0aGlzLmdldFhsc3goKS50aGVuKCh4bHN4OiBhbnkpID0+IHtcbiAgICBsZXQgdGFibGVzID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBBcnJheTxhbnk+KCk7XG4gICAgZm9yRWFjaChzaGVldHMsIHMgPT4ge1xuICAgICAgbGV0IGhhc0hlYWRlciA9IGZhbHNlO1xuICAgICAgbGV0IHRhYmxlID0gW107XG4gICAgICBsZXQgaGVhZGVyID0gW107XG4gICAgICBmb3JFYWNoKHMuZGF0YSwgZnVuY3Rpb24oZCkge1xuICAgICAgICBsZXQgcm93ID0gW107XG4gICAgICAgIGZvckVhY2gocy5jb2x1bW5zLCBmdW5jdGlvbihjKSB7XG4gICAgICAgICAgaWYgKCEoKGMudmlzaWJsZSA9PT0gZmFsc2UgfHwgYy5zdXBwcmVzc0V4cG9ydCA9PT0gdHJ1ZSB8fCBjLmFjdGlvbikgJiYgYy5mb3JjZUV4cG9ydCAhPT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gZ2V0KGQsIGMubmFtZSk7XG4gICAgICAgICAgICBpZiAoYy50eXBlID09PSAnYWRkcmVzcycpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAmJiB2YWx1ZS5hZGRyZXNzID8gdmFsdWUuYWRkcmVzcyA6IHZhbHVlO1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMudHlwZSA9PT0gJ2NhdGFsb2cnKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZS52YWxpZDtcbiAgICAgICAgICAgICAgbGV0IHJldFZhbCA9ICcnO1xuICAgICAgICAgICAgICBrZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uKHBpZCkge1xuICAgICAgICAgICAgICAgIGxldCBwcm9kdWN0ID0gZmluZChjLnByb2R1Y3RzLCAocDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcC5faWQgPT09IHBpZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdCkge1xuICAgICAgICAgICAgICAgICAgcmV0VmFsICs9IHByb2R1Y3QucmVmZXJlbmNlICsgJyAqICcgKyB2YWx1ZVtwaWRdICsgJywnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHZhbHVlID0gcmV0VmFsOyAvL0pTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKCd7JywgJycpLnJlcGxhY2UoJ30nLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYy50eXBlID09PSAnZGF0ZScgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgbGV0IG0gPSB0b0RhdGUodmFsdWUpO1xuICAgICAgICAgICAgICBtID0gZGF0ZUFkZChtLCAnbWludXRlcycsIGdldFVUQ09mZnNldChtKSk7XG4gICAgICAgICAgICAgIHZhbHVlID0gbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjLnR5cGUgPT09ICd0aW1lJyAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICBsZXQgdCA9IHRvRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgIC8vdCA9IHQuYWRkKHQudXRjT2Zmc2V0KCksICdtaW51dGVzJyk7XG4gICAgICAgICAgICAgIHZhbHVlID0gZGF0ZUZvcm1hdCh0LCAnSEg6bW06c3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjLnR5cGUgPT09ICdkYXRldGltZScgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgbGV0IGR0ID0gdG9EYXRlKHZhbHVlKTtcbiAgICAgICAgICAgICAgLy90ID0gdC5hZGQodC51dGNPZmZzZXQoKSwgJ21pbnV0ZXMnKTtcbiAgICAgICAgICAgICAgdmFsdWUgPSBkYXRlRm9ybWF0KGR0LCAnTCBMVCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gJ19hY2wnKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuZ3JvdXBzLnI7IC8vX2RpZmZlcmVuY2UodmFsdWUuZ3JvdXBzLnIsIHJvbGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5fZG93bmxvYWRVUkwpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5fZG93bmxvYWRVUkw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QodmFsdWUpICYmICFpc0RhdGUodmFsdWUpICYmICFpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAvLyYmIF9pc0VtcHR5KHZhbHVlKVxuICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJvdy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghaGFzSGVhZGVyKSB7XG4gICAgICAgICAgICAgIGhlYWRlci5wdXNoKGMuZGlzcGxheU5hbWUgfHwgYy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBoYXNIZWFkZXIgPSB0cnVlO1xuICAgICAgICB0YWJsZS5wdXNoKHJvdyk7XG4gICAgICB9KTtcbiAgICAgIHRhYmxlcy5wdXNoKHRhYmxlKTtcbiAgICAgIGhlYWRlcnMucHVzaChoZWFkZXIpO1xuICAgIH0pO1xuICAgIGxldCB3YiA9IHsgU2hlZXROYW1lczogW10sIFNoZWV0czoge30sIFByb3BzOiBudWxsIH07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhYmxlc1tpXS51bnNoaWZ0KGhlYWRlcnNbaV0pO1xuICAgICAgbGV0IHdzTmFtZSA9IHNoZWV0c1tpXS50aXRsZSB8fCAnU2hlZXRKc18nICsgaTtcbiAgICAgIGxldCB3cyA9IHRoaXMuc2hlZXRGcm9tQXJyYXlPZkFycmF5cyh0YWJsZXNbaV0pO1xuICAgICAgd2IuU2hlZXROYW1lcy5wdXNoKHdzTmFtZSk7XG4gICAgICB3Yi5TaGVldHNbd3NOYW1lXSA9IHdzO1xuICAgIH1cbiAgICBsZXQgd2JvdXQgPSBYTFNYLndyaXRlKHdiLCA8YW55PnsgYm9va1R5cGU6ICd4bHN4JywgYm9va1NTVDogdHJ1ZSwgdHlwZTogJ2JpbmFyeScgfSk7XG4gICAgbGV0IGZpbGVuYW1lID0gdGl0bGUgKyAnLScgKyBkYXRlRm9ybWF0KG5ldyBEYXRlKCksICdZWVlZLU1NLUREVEhIOk1NJykgKyAnLnhsc3gnO1xuICAgIHRoaXMuZXhwb3J0VG9GaWxlKHRoaXMuczJhYih3Ym91dCksICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLCAnJywgZmlsZW5hbWUpO1xuICAgIC8vfSk7XG4gIH1cblxuICBwcml2YXRlIGRhdGVudW0odjogYW55LCBkYXRlMTkwND86IGJvb2xlYW4pIHtcbiAgICBpZiAoZGF0ZTE5MDQpIHtcbiAgICAgIHYgKz0gMTQ2MjtcbiAgICB9XG4gICAgbGV0IGVwb2NoOiBhbnkgPSBEYXRlLnBhcnNlKHYpO1xuICAgIHJldHVybiAoZXBvY2ggLSA8YW55Pm5ldyBEYXRlKERhdGUuVVRDKDE4OTksIDExLCAzMCkpKSAvICgyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hlZXRGcm9tQXJyYXlPZkFycmF5cyhkYXRhLCBvcHRzPykge1xuICAgIGxldCB3cyA9IHt9O1xuICAgIGxldCByYW5nZSA9IHsgczogeyBjOiAxMDAwMDAwMCwgcjogMTAwMDAwMDAgfSwgZTogeyBjOiAwLCByOiAwIH0gfTtcbiAgICBmb3IgKGxldCBSID0gMDsgUiAhPT0gZGF0YS5sZW5ndGg7ICsrUikge1xuICAgICAgZm9yIChsZXQgQyA9IDA7IEMgIT09IGRhdGFbUl0ubGVuZ3RoOyArK0MpIHtcbiAgICAgICAgaWYgKHJhbmdlLnMuciA+IFIpIHtcbiAgICAgICAgICByYW5nZS5zLnIgPSBSO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZS5zLmMgPiBDKSB7XG4gICAgICAgICAgcmFuZ2Uucy5jID0gQztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UuZS5yIDwgUikge1xuICAgICAgICAgIHJhbmdlLmUuciA9IFI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlLmUuYyA8IEMpIHtcbiAgICAgICAgICByYW5nZS5lLmMgPSBDO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjZWxsOiBhbnkgPSB7XG4gICAgICAgICAgdjogZGF0YVtSXVtDXVxuICAgICAgICB9O1xuICAgICAgICBpZiAoY2VsbC52ID09PSBudWxsKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2VsbFJlZiA9IFhMU1gudXRpbHMuZW5jb2RlX2NlbGwoeyBjOiBDLCByOiBSIH0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2VsbC52ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNlbGwudCA9ICduJztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2VsbC52ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICBjZWxsLnQgPSAnYic7XG4gICAgICAgIH0gZWxzZSBpZiAoY2VsbC52IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgIGNlbGwudCA9ICduJztcbiAgICAgICAgICBjZWxsLnogPSAoPGFueT5YTFNYLlNTRikuX3RhYmxlWzE0XTtcbiAgICAgICAgICBjZWxsLnYgPSB0aGlzLmRhdGVudW0oY2VsbC52KTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGNlbGwudikgJiYgY2VsbC52Lmxlbmd0aCA+IDAgJiYgaXNOdW1iZXIoY2VsbC52WzBdKSkge1xuICAgICAgICAgIGNlbGwudCA9ICdzJztcbiAgICAgICAgICBjZWxsLnYgPSAnWycgKyBjZWxsLnYuam9pbignLCcpICsgJ10nO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY2VsbC52KSAmJiBjZWxsLnYubGVuZ3RoID4gMCAmJiAhaXNOdW1iZXIoY2VsbC52WzBdKSkge1xuICAgICAgICAgIGNlbGwudCA9ICdzJztcbiAgICAgICAgICBjZWxsLnYgPSBjZWxsLnYuam9pbignLCcpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY2VsbC52KSAmJiBjZWxsLnYubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgY2VsbC50ID0gJ3MnO1xuICAgICAgICAgIGNlbGwudiA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwudCA9ICdzJztcbiAgICAgICAgfVxuXG4gICAgICAgIHdzW2NlbGxSZWZdID0gY2VsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJhbmdlLnMuYyA8IDEwMDAwMDAwKSB7XG4gICAgICB3c1snIXJlZiddID0gWExTWC51dGlscy5lbmNvZGVfcmFuZ2UocmFuZ2UucywgcmFuZ2UuZSk7XG4gICAgfVxuICAgIHJldHVybiB3cztcbiAgfVxuXG4gIHByaXZhdGUgczJhYihzKSB7XG4gICAgbGV0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzLmxlbmd0aCk7XG4gICAgbGV0IHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpICE9PSBzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2aWV3W2ldID0gcy5jaGFyQ29kZUF0KGkpICYgMHhmZjtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxufVxuIl19