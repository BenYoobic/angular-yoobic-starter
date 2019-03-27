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
var Xlsx = /** @class */ (function () {
    // private _xlsx: any;
    // private _papaparse: any;
    function Xlsx() {
    }
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
    Xlsx.prototype.readFile = 
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
    function (nativeFile, type, encoding) {
        if (type === void 0) { type = 'blob'; }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var fileReader = new FileReader();
            fileReader.onload = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                resolve(e.target.result);
            });
            fileReader.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return reject(e); });
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
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Xlsx.prototype.read = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var csv = '';
            if (file.name.endsWith('csv')) {
                csv = data;
            }
            else {
                /** @type {?} */
                var workbook = XLSX.read(data, { type: 'binary' });
                /** @type {?} */
                var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                csv = XLSX.utils['sheet_to_csv'](worksheet, { FS: ';' });
            }
            /** @type {?} */
            var retVal = parse(csv, { skipEmptyLines: true });
            return retVal.data;
        }));
        //});
        //});
    };
    /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    Xlsx.prototype.exportToFile = /**
     * @param {?} content
     * @param {?} type
     * @param {?} encoding
     * @param {?} filename
     * @return {?}
     */
    function (content, type, encoding, filename) {
        encoding = encoding || 'charset=ISO-8859-1';
        filename = filename || 'data.csv';
        type = type || 'data:application/csv;charset=ISO-8859-1;';
        if (encoding === 'base64') {
            content = this.b64toBlob(content, type);
        }
        /** @type {?} */
        var blob = new Blob([content], {
            type: type
        });
        return this.saveBlob(blob, filename);
    };
    /**
     * @param {?} blob
     * @param {?} filename
     * @return {?}
     */
    Xlsx.prototype.saveBlob = /**
     * @param {?} blob
     * @param {?} filename
     * @return {?}
     */
    function (blob, filename) {
        ((/** @type {?} */ (saveAs)))(blob, filename);
    };
    /**
     * @param {?} base64
     * @return {?}
     */
    Xlsx.prototype.getBase64MimeType = /**
     * @param {?} base64
     * @return {?}
     */
    function (base64) {
        return base64.split(';')[0].replace('data:', '');
    };
    /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    Xlsx.prototype.b64toBlob = /**
     * @param {?} b64Data
     * @param {?=} contentType
     * @param {?=} sliceSize
     * @return {?}
     */
    function (b64Data, contentType, sliceSize) {
        if (contentType === void 0) { contentType = null; }
        if (sliceSize === void 0) { sliceSize = 512; }
        if (!contentType) {
            contentType = this.getBase64MimeType(b64Data);
        }
        b64Data = b64Data.replace('data:' + contentType + ';base64,', '').replace(/\s/g, '');
        /** @type {?} */
        var byteCharacters = atob(b64Data);
        /** @type {?} */
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            /** @type {?} */
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            /** @type {?} */
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            /** @type {?} */
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        /** @type {?} */
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };
    /**
     * @param {?} file
     * @return {?}
     */
    Xlsx.prototype.readSheets = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var retVal = [];
            if (file.name.endsWith('csv')) {
                retVal.push(parse(data, { skipEmptyLines: true }).data);
            }
            else {
                /** @type {?} */
                var workbook_1 = XLSX.read(data, { type: 'binary' });
                workbook_1.SheetNames.forEach((/**
                 * @param {?} sheet
                 * @return {?}
                 */
                function (sheet) {
                    /** @type {?} */
                    var v = XLSX.utils['sheet_to_csv'](workbook_1.Sheets[sheet], { FS: ';' });
                    retVal.push(parse(v, { skipEmptyLines: true }).data);
                }));
            }
            return retVal;
        }));
        //});
        //});
    };
    /**
     * @param {?} title
     * @param {?} sheets
     * @return {?}
     */
    Xlsx.prototype.write = /**
     * @param {?} title
     * @param {?} sheets
     * @return {?}
     */
    function (title, sheets) {
        //return this.getXlsx().then((xlsx: any) => {
        /** @type {?} */
        var tables = new Array();
        /** @type {?} */
        var headers = new Array();
        forEach(sheets, (/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            /** @type {?} */
            var hasHeader = false;
            /** @type {?} */
            var table = [];
            /** @type {?} */
            var header = [];
            forEach(s.data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                var row = [];
                forEach(s.columns, (/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) {
                    if (!((c.visible === false || c.suppressExport === true || c.action) && c.forceExport !== true)) {
                        /** @type {?} */
                        var value_1 = get(d, c.name);
                        if (c.type === 'address') {
                            value_1 = value_1 && value_1.address ? value_1.address : value_1;
                            if (typeof value_1 === 'object') {
                                value_1 = null;
                            }
                        }
                        if (c.type === 'catalog') {
                            delete value_1.valid;
                            /** @type {?} */
                            var retVal_1 = '';
                            keys(value_1).forEach((/**
                             * @param {?} pid
                             * @return {?}
                             */
                            function (pid) {
                                /** @type {?} */
                                var product = find(c.products, (/**
                                 * @param {?} p
                                 * @return {?}
                                 */
                                function (p) {
                                    return p._id === pid;
                                }));
                                if (product) {
                                    retVal_1 += product.reference + ' * ' + value_1[pid] + ',';
                                }
                            }));
                            value_1 = retVal_1; //JSON.stringify(value).replace('{', '').replace('}', '');
                        }
                        if (c.type === 'date' && value_1) {
                            /** @type {?} */
                            var m = toDate(value_1);
                            m = dateAdd(m, 'minutes', getUTCOffset(m));
                            value_1 = m;
                        }
                        if (c.type === 'time' && value_1) {
                            /** @type {?} */
                            var t = toDate(value_1);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value_1 = dateFormat(t, 'HH:mm:ss');
                        }
                        if (c.type === 'datetime' && value_1) {
                            /** @type {?} */
                            var dt = toDate(value_1);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value_1 = dateFormat(dt, 'L LT');
                        }
                        if (c.name === '_acl') {
                            value_1 = value_1.groups.r; //_difference(value.groups.r, roles);
                        }
                        if (value_1 && value_1._downloadURL) {
                            value_1 = value_1._downloadURL;
                        }
                        if (isObject(value_1) && !isDate(value_1) && !isArray(value_1)) {
                            //&& _isEmpty(value)
                            value_1 = null;
                        }
                        row.push(value_1);
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
        var wb = { SheetNames: [], Sheets: {}, Props: null };
        for (var i = 0; i < tables.length; i++) {
            tables[i].unshift(headers[i]);
            /** @type {?} */
            var wsName = sheets[i].title || 'SheetJs_' + i;
            /** @type {?} */
            var ws = this.sheetFromArrayOfArrays(tables[i]);
            wb.SheetNames.push(wsName);
            wb.Sheets[wsName] = ws;
        }
        /** @type {?} */
        var wbout = XLSX.write(wb, (/** @type {?} */ ({ bookType: 'xlsx', bookSST: true, type: 'binary' })));
        /** @type {?} */
        var filename = title + '-' + dateFormat(new Date(), 'YYYY-MM-DDTHH:MM') + '.xlsx';
        this.exportToFile(this.s2ab(wbout), 'application/octet-stream', '', filename);
        //});
    };
    /**
     * @private
     * @param {?} v
     * @param {?=} date1904
     * @return {?}
     */
    Xlsx.prototype.datenum = /**
     * @private
     * @param {?} v
     * @param {?=} date1904
     * @return {?}
     */
    function (v, date1904) {
        if (date1904) {
            v += 1462;
        }
        /** @type {?} */
        var epoch = Date.parse(v);
        return (epoch - (/** @type {?} */ (new Date(Date.UTC(1899, 11, 30))))) / (24 * 60 * 60 * 1000);
    };
    /**
     * @private
     * @param {?} data
     * @param {?=} opts
     * @return {?}
     */
    Xlsx.prototype.sheetFromArrayOfArrays = /**
     * @private
     * @param {?} data
     * @param {?=} opts
     * @return {?}
     */
    function (data, opts) {
        /** @type {?} */
        var ws = {};
        /** @type {?} */
        var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (var R = 0; R !== data.length; ++R) {
            for (var C = 0; C !== data[R].length; ++C) {
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
                var cell = {
                    v: data[R][C]
                };
                if (cell.v === null) {
                    continue;
                }
                /** @type {?} */
                var cellRef = XLSX.utils.encode_cell({ c: C, r: R });
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
    };
    /**
     * @private
     * @param {?} s
     * @return {?}
     */
    Xlsx.prototype.s2ab = /**
     * @private
     * @param {?} s
     * @return {?}
     */
    function (s) {
        /** @type {?} */
        var buf = new ArrayBuffer(s.length);
        /** @type {?} */
        var view = new Uint8Array(buf);
        for (var i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    };
    Xlsx.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Xlsx.ctorParameters = function () { return []; };
    return Xlsx;
}());
export { Xlsx };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzeC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3hsc3gveGxzeC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQzs7QUFFN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUc1RSxPQUFPLE1BQU0sTUFBTSxZQUFZLENBQUM7QUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVsQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFJMUY7SUFFRSxzQkFBc0I7SUFDdEIsMkJBQTJCO0lBRTNCO0lBQWUsQ0FBQztJQUVoQixjQUFjO0lBQ2Qsd0JBQXdCO0lBQ3hCLDhDQUE4QztJQUM5QyxRQUFRO0lBQ1Isa0ZBQWtGO0lBQ2xGLDZCQUE2QjtJQUM3Qix1QkFBdUI7SUFDdkIsVUFBVTtJQUNWLElBQUk7SUFFSixtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLG1EQUFtRDtJQUNuRCxRQUFRO0lBQ1IsNEZBQTRGO0lBQzVGLHVDQUF1QztJQUN2Qyw0QkFBNEI7SUFDNUIsVUFBVTtJQUNWLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFSix1QkFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFSLFVBQVMsVUFBdUIsRUFBRSxJQUFhLEVBQUUsUUFBaUI7UUFBaEMscUJBQUEsRUFBQSxhQUFhO1FBQzdDLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxF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UlgsV0FBQztDQUFBLEFBMVJELElBMFJDO1NBelJZLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vL2ltcG9ydCB7IFdvcmtCb29rLCByZWFkLCByZWFkRmlsZSwgdXRpbHMsIFNTRiwgd3JpdGUgfSBmcm9tICd4bHN4JztcbmltcG9ydCAqIGFzIFhMU1ggZnJvbSAneGxzeCc7XG4vL2NvbnN0IFhMU1ggPSByZXF1aXJlKCd4bHN4Jyk7XG5pbXBvcnQgeyB0b0RhdGUsIGdldFVUQ09mZnNldCwgZGF0ZUFkZCwgZGF0ZUZvcm1hdCB9IGZyb20gJ0BzaGFyZWQvc3RlbmNpbCc7XG5cbi8vaW1wb3J0ICogYXMgRmlsZVNhdmVyIGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IHNhdmVBcyBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncGFwYXBhcnNlJztcblxuaW1wb3J0IHsgZm9yRWFjaCwgZ2V0LCBpc0FycmF5LCBpc09iamVjdCwgaXNOdW1iZXIsIGtleXMsIGZpbmQsIGlzRGF0ZSB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbi8vZGVjbGFyZSBjb25zdCBTeXN0ZW06IFN5c3RlbTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFhsc3gge1xuICAvLyBwcml2YXRlIF94bHN4OiBhbnk7XG4gIC8vIHByaXZhdGUgX3BhcGFwYXJzZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyBnZXRYbHN4KCkge1xuICAvLyAgICAgaWYgKHRoaXMuX3hsc3gpIHtcbiAgLy8gICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX3hsc3gpO1xuICAvLyAgICAgfVxuICAvLyAgICAgcmV0dXJuIFN5c3RlbS5pbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJ4bHN4XCIgKi8neGxzeCcpLnRoZW4oKHhsc3gpID0+IHtcbiAgLy8gICAgICAgICB0aGlzLl94bHN4ID0geGxzeDtcbiAgLy8gICAgICAgICByZXR1cm4geGxzeDtcbiAgLy8gICAgIH0pO1xuICAvLyB9XG5cbiAgLy8gZ2V0UGFwYVBhcnNlKCkge1xuICAvLyAgICAgaWYgKHRoaXMuX3BhcGFwYXJzZSkge1xuICAvLyAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fcGFwYXBhcnNlKTtcbiAgLy8gICAgIH1cbiAgLy8gICAgIHJldHVybiBTeXN0ZW0uaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwieGxzeFwiICovJ3BhcGFwYXJzZScpLnRoZW4oKHBhcGFwYXJzZSkgPT4ge1xuICAvLyAgICAgICAgIHRoaXMuX3BhcGFwYXJzZSA9IHBhcGFwYXJzZTtcbiAgLy8gICAgICAgICByZXR1cm4gcGFwYXBhcnNlO1xuICAvLyAgICAgfSk7XG4gIC8vIH1cblxuICByZWFkRmlsZShuYXRpdmVGaWxlOiBGaWxlIHwgQmxvYiwgdHlwZSA9ICdibG9iJywgZW5jb2Rpbmc/OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IChlOiBhbnkpID0+IHtcbiAgICAgICAgcmVzb2x2ZShlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgfTtcbiAgICAgIGZpbGVSZWFkZXIub25lcnJvciA9IGUgPT4gcmVqZWN0KGUpO1xuICAgICAgaWYgKHR5cGUgPT09ICdibG9iJykge1xuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoPGFueT5uYXRpdmVGaWxlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2JpbmFyeScpIHtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNCaW5hcnlTdHJpbmcoPGFueT5uYXRpdmVGaWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzVGV4dCg8YW55Pm5hdGl2ZUZpbGUsIGVuY29kaW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlYWQoZmlsZTogRmlsZSkge1xuICAgIC8vcmV0dXJuIHRoaXMuZ2V0WGxzeCgpLnRoZW4oKHhsc3g6IGFueSkgPT4ge1xuICAgIC8vcmV0dXJuIHRoaXMuZ2V0UGFwYVBhcnNlKCkudGhlbigocGFwYXBhcnNlOiBhbnkpID0+IHtcbiAgICByZXR1cm4gdGhpcy5yZWFkRmlsZShmaWxlLCAnYmluYXJ5JykudGhlbihkYXRhID0+IHtcbiAgICAgIGxldCBjc3YgPSAnJztcbiAgICAgIGlmIChmaWxlLm5hbWUuZW5kc1dpdGgoJ2NzdicpKSB7XG4gICAgICAgIGNzdiA9IGRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgd29ya2Jvb2sgPSBYTFNYLnJlYWQoZGF0YSwgeyB0eXBlOiAnYmluYXJ5JyB9KTtcbiAgICAgICAgbGV0IHdvcmtzaGVldCA9IHdvcmtib29rLlNoZWV0c1t3b3JrYm9vay5TaGVldE5hbWVzWzBdXTtcbiAgICAgICAgY3N2ID0gWExTWC51dGlsc1snc2hlZXRfdG9fY3N2J10od29ya3NoZWV0LCB7IEZTOiAnOycgfSk7XG4gICAgICB9XG4gICAgICBsZXQgcmV0VmFsID0gcGFyc2UoY3N2LCB7IHNraXBFbXB0eUxpbmVzOiB0cnVlIH0pO1xuICAgICAgcmV0dXJuIHJldFZhbC5kYXRhO1xuICAgIH0pO1xuICAgIC8vfSk7XG4gICAgLy99KTtcbiAgfVxuXG4gIGV4cG9ydFRvRmlsZShjb250ZW50LCB0eXBlLCBlbmNvZGluZywgZmlsZW5hbWUpIHtcbiAgICBlbmNvZGluZyA9IGVuY29kaW5nIHx8ICdjaGFyc2V0PUlTTy04ODU5LTEnO1xuICAgIGZpbGVuYW1lID0gZmlsZW5hbWUgfHwgJ2RhdGEuY3N2JztcbiAgICB0eXBlID0gdHlwZSB8fCAnZGF0YTphcHBsaWNhdGlvbi9jc3Y7Y2hhcnNldD1JU08tODg1OS0xOyc7XG5cbiAgICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnKSB7XG4gICAgICBjb250ZW50ID0gdGhpcy5iNjR0b0Jsb2IoY29udGVudCwgdHlwZSk7XG4gICAgfVxuICAgIGxldCBibG9iID0gbmV3IEJsb2IoW2NvbnRlbnRdLCB7XG4gICAgICB0eXBlOiB0eXBlXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuc2F2ZUJsb2IoYmxvYiwgZmlsZW5hbWUpO1xuICB9XG5cbiAgc2F2ZUJsb2IoYmxvYjogQmxvYiwgZmlsZW5hbWU6IHN0cmluZykge1xuICAgICg8YW55PnNhdmVBcykoYmxvYiwgZmlsZW5hbWUpO1xuICB9XG5cbiAgZ2V0QmFzZTY0TWltZVR5cGUoYmFzZTY0KSB7XG4gICAgcmV0dXJuIGJhc2U2NC5zcGxpdCgnOycpWzBdLnJlcGxhY2UoJ2RhdGE6JywgJycpO1xuICB9XG5cbiAgYjY0dG9CbG9iKGI2NERhdGEsIGNvbnRlbnRUeXBlID0gbnVsbCwgc2xpY2VTaXplID0gNTEyKSB7XG4gICAgaWYgKCFjb250ZW50VHlwZSkge1xuICAgICAgY29udGVudFR5cGUgPSB0aGlzLmdldEJhc2U2NE1pbWVUeXBlKGI2NERhdGEpO1xuICAgIH1cbiAgICBiNjREYXRhID0gYjY0RGF0YS5yZXBsYWNlKCdkYXRhOicgKyBjb250ZW50VHlwZSArICc7YmFzZTY0LCcsICcnKS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgIGNvbnN0IGJ5dGVDaGFyYWN0ZXJzID0gYXRvYihiNjREYXRhKTtcbiAgICBjb25zdCBieXRlQXJyYXlzID0gW107XG5cbiAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IG9mZnNldCArPSBzbGljZVNpemUpIHtcbiAgICAgIGNvbnN0IHNsaWNlID0gYnl0ZUNoYXJhY3RlcnMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBzbGljZVNpemUpO1xuICAgICAgY29uc3QgYnl0ZU51bWJlcnMgPSBuZXcgQXJyYXkoc2xpY2UubGVuZ3RoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYnl0ZU51bWJlcnNbaV0gPSBzbGljZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgfVxuICAgICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xuICAgICAgYnl0ZUFycmF5cy5wdXNoKGJ5dGVBcnJheSk7XG4gICAgfVxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihieXRlQXJyYXlzLCB7IHR5cGU6IGNvbnRlbnRUeXBlIH0pO1xuICAgIHJldHVybiBibG9iO1xuICB9XG5cbiAgcmVhZFNoZWV0cyhmaWxlOiBGaWxlKSB7XG4gICAgLy9yZXR1cm4gdGhpcy5nZXRYbHN4KCkudGhlbigoeGxzeDogYW55KSA9PiB7XG4gICAgLy9yZXR1cm4gdGhpcy5nZXRQYXBhUGFyc2UoKS50aGVuKChwYXBhcGFyc2U6IGFueSkgPT4ge1xuICAgIHJldHVybiB0aGlzLnJlYWRGaWxlKGZpbGUsICdiaW5hcnknKS50aGVuKGRhdGEgPT4ge1xuICAgICAgbGV0IHJldFZhbCA9IFtdO1xuICAgICAgaWYgKGZpbGUubmFtZS5lbmRzV2l0aCgnY3N2JykpIHtcbiAgICAgICAgcmV0VmFsLnB1c2gocGFyc2UoZGF0YSwgeyBza2lwRW1wdHlMaW5lczogdHJ1ZSB9KS5kYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB3b3JrYm9vayA9IFhMU1gucmVhZChkYXRhLCB7IHR5cGU6ICdiaW5hcnknIH0pO1xuICAgICAgICB3b3JrYm9vay5TaGVldE5hbWVzLmZvckVhY2goc2hlZXQgPT4ge1xuICAgICAgICAgIGxldCB2ID0gWExTWC51dGlsc1snc2hlZXRfdG9fY3N2J10od29ya2Jvb2suU2hlZXRzW3NoZWV0XSwgeyBGUzogJzsnIH0pO1xuICAgICAgICAgIHJldFZhbC5wdXNoKHBhcnNlKHYsIHsgc2tpcEVtcHR5TGluZXM6IHRydWUgfSkuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9KTtcbiAgICAvL30pO1xuICAgIC8vfSk7XG4gIH1cblxuICB3cml0ZSh0aXRsZTogc3RyaW5nLCBzaGVldHM6IEFycmF5PHsgY29sdW1uczogQXJyYXk8YW55PjsgZGF0YTogQXJyYXk8YW55PjsgdGl0bGU6IHN0cmluZyB9Pikge1xuICAgIC8vcmV0dXJuIHRoaXMuZ2V0WGxzeCgpLnRoZW4oKHhsc3g6IGFueSkgPT4ge1xuICAgIGxldCB0YWJsZXMgPSBuZXcgQXJyYXk8YW55PigpO1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICBmb3JFYWNoKHNoZWV0cywgcyA9PiB7XG4gICAgICBsZXQgaGFzSGVhZGVyID0gZmFsc2U7XG4gICAgICBsZXQgdGFibGUgPSBbXTtcbiAgICAgIGxldCBoZWFkZXIgPSBbXTtcbiAgICAgIGZvckVhY2gocy5kYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGxldCByb3cgPSBbXTtcbiAgICAgICAgZm9yRWFjaChzLmNvbHVtbnMsIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICBpZiAoISgoYy52aXNpYmxlID09PSBmYWxzZSB8fCBjLnN1cHByZXNzRXhwb3J0ID09PSB0cnVlIHx8IGMuYWN0aW9uKSAmJiBjLmZvcmNlRXhwb3J0ICE9PSB0cnVlKSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBnZXQoZCwgYy5uYW1lKTtcbiAgICAgICAgICAgIGlmIChjLnR5cGUgPT09ICdhZGRyZXNzJykge1xuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICYmIHZhbHVlLmFkZHJlc3MgPyB2YWx1ZS5hZGRyZXNzIDogdmFsdWU7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYy50eXBlID09PSAnY2F0YWxvZycpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlLnZhbGlkO1xuICAgICAgICAgICAgICBsZXQgcmV0VmFsID0gJyc7XG4gICAgICAgICAgICAgIGtleXModmFsdWUpLmZvckVhY2goZnVuY3Rpb24ocGlkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb2R1Y3QgPSBmaW5kKGMucHJvZHVjdHMsIChwOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwLl9pZCA9PT0gcGlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgICAgICAgICAgICByZXRWYWwgKz0gcHJvZHVjdC5yZWZlcmVuY2UgKyAnICogJyArIHZhbHVlW3BpZF0gKyAnLCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdmFsdWUgPSByZXRWYWw7IC8vSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoJ3snLCAnJykucmVwbGFjZSgnfScsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjLnR5cGUgPT09ICdkYXRlJyAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICBsZXQgbSA9IHRvRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgIG0gPSBkYXRlQWRkKG0sICdtaW51dGVzJywgZ2V0VVRDT2Zmc2V0KG0pKTtcbiAgICAgICAgICAgICAgdmFsdWUgPSBtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMudHlwZSA9PT0gJ3RpbWUnICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgIGxldCB0ID0gdG9EYXRlKHZhbHVlKTtcbiAgICAgICAgICAgICAgLy90ID0gdC5hZGQodC51dGNPZmZzZXQoKSwgJ21pbnV0ZXMnKTtcbiAgICAgICAgICAgICAgdmFsdWUgPSBkYXRlRm9ybWF0KHQsICdISDptbTpzcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMudHlwZSA9PT0gJ2RhdGV0aW1lJyAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICBsZXQgZHQgPSB0b0RhdGUodmFsdWUpO1xuICAgICAgICAgICAgICAvL3QgPSB0LmFkZCh0LnV0Y09mZnNldCgpLCAnbWludXRlcycpO1xuICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGVGb3JtYXQoZHQsICdMIExUJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYy5uYW1lID09PSAnX2FjbCcpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5ncm91cHMucjsgLy9fZGlmZmVyZW5jZSh2YWx1ZS5ncm91cHMuciwgcm9sZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLl9kb3dubG9hZFVSTCkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLl9kb3dubG9hZFVSTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkgJiYgIWlzRGF0ZSh2YWx1ZSkgJiYgIWlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgIC8vJiYgX2lzRW1wdHkodmFsdWUpXG4gICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcm93LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFoYXNIZWFkZXIpIHtcbiAgICAgICAgICAgICAgaGVhZGVyLnB1c2goYy5kaXNwbGF5TmFtZSB8fCBjLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGhhc0hlYWRlciA9IHRydWU7XG4gICAgICAgIHRhYmxlLnB1c2gocm93KTtcbiAgICAgIH0pO1xuICAgICAgdGFibGVzLnB1c2godGFibGUpO1xuICAgICAgaGVhZGVycy5wdXNoKGhlYWRlcik7XG4gICAgfSk7XG4gICAgbGV0IHdiID0geyBTaGVldE5hbWVzOiBbXSwgU2hlZXRzOiB7fSwgUHJvcHM6IG51bGwgfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGFibGVzW2ldLnVuc2hpZnQoaGVhZGVyc1tpXSk7XG4gICAgICBsZXQgd3NOYW1lID0gc2hlZXRzW2ldLnRpdGxlIHx8ICdTaGVldEpzXycgKyBpO1xuICAgICAgbGV0IHdzID0gdGhpcy5zaGVldEZyb21BcnJheU9mQXJyYXlzKHRhYmxlc1tpXSk7XG4gICAgICB3Yi5TaGVldE5hbWVzLnB1c2god3NOYW1lKTtcbiAgICAgIHdiLlNoZWV0c1t3c05hbWVdID0gd3M7XG4gICAgfVxuICAgIGxldCB3Ym91dCA9IFhMU1gud3JpdGUod2IsIDxhbnk+eyBib29rVHlwZTogJ3hsc3gnLCBib29rU1NUOiB0cnVlLCB0eXBlOiAnYmluYXJ5JyB9KTtcbiAgICBsZXQgZmlsZW5hbWUgPSB0aXRsZSArICctJyArIGRhdGVGb3JtYXQobmV3IERhdGUoKSwgJ1lZWVktTU0tRERUSEg6TU0nKSArICcueGxzeCc7XG4gICAgdGhpcy5leHBvcnRUb0ZpbGUodGhpcy5zMmFiKHdib3V0KSwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsICcnLCBmaWxlbmFtZSk7XG4gICAgLy99KTtcbiAgfVxuXG4gIHByaXZhdGUgZGF0ZW51bSh2OiBhbnksIGRhdGUxOTA0PzogYm9vbGVhbikge1xuICAgIGlmIChkYXRlMTkwNCkge1xuICAgICAgdiArPSAxNDYyO1xuICAgIH1cbiAgICBsZXQgZXBvY2g6IGFueSA9IERhdGUucGFyc2Uodik7XG4gICAgcmV0dXJuIChlcG9jaCAtIDxhbnk+bmV3IERhdGUoRGF0ZS5VVEMoMTg5OSwgMTEsIDMwKSkpIC8gKDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICB9XG5cbiAgcHJpdmF0ZSBzaGVldEZyb21BcnJheU9mQXJyYXlzKGRhdGEsIG9wdHM/KSB7XG4gICAgbGV0IHdzID0ge307XG4gICAgbGV0IHJhbmdlID0geyBzOiB7IGM6IDEwMDAwMDAwLCByOiAxMDAwMDAwMCB9LCBlOiB7IGM6IDAsIHI6IDAgfSB9O1xuICAgIGZvciAobGV0IFIgPSAwOyBSICE9PSBkYXRhLmxlbmd0aDsgKytSKSB7XG4gICAgICBmb3IgKGxldCBDID0gMDsgQyAhPT0gZGF0YVtSXS5sZW5ndGg7ICsrQykge1xuICAgICAgICBpZiAocmFuZ2Uucy5yID4gUikge1xuICAgICAgICAgIHJhbmdlLnMuciA9IFI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmdlLnMuYyA+IEMpIHtcbiAgICAgICAgICByYW5nZS5zLmMgPSBDO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZS5lLnIgPCBSKSB7XG4gICAgICAgICAgcmFuZ2UuZS5yID0gUjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZ2UuZS5jIDwgQykge1xuICAgICAgICAgIHJhbmdlLmUuYyA9IEM7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNlbGw6IGFueSA9IHtcbiAgICAgICAgICB2OiBkYXRhW1JdW0NdXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjZWxsLnYgPT09IG51bGwpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjZWxsUmVmID0gWExTWC51dGlscy5lbmNvZGVfY2VsbCh7IGM6IEMsIHI6IFIgfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjZWxsLnYgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgY2VsbC50ID0gJ24nO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjZWxsLnYgPT09ICdib29sZWFuJykge1xuICAgICAgICAgIGNlbGwudCA9ICdiJztcbiAgICAgICAgfSBlbHNlIGlmIChjZWxsLnYgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgY2VsbC50ID0gJ24nO1xuICAgICAgICAgIGNlbGwueiA9ICg8YW55PlhMU1guU1NGKS5fdGFibGVbMTRdO1xuICAgICAgICAgIGNlbGwudiA9IHRoaXMuZGF0ZW51bShjZWxsLnYpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY2VsbC52KSAmJiBjZWxsLnYubGVuZ3RoID4gMCAmJiBpc051bWJlcihjZWxsLnZbMF0pKSB7XG4gICAgICAgICAgY2VsbC50ID0gJ3MnO1xuICAgICAgICAgIGNlbGwudiA9ICdbJyArIGNlbGwudi5qb2luKCcsJykgKyAnXSc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShjZWxsLnYpICYmIGNlbGwudi5sZW5ndGggPiAwICYmICFpc051bWJlcihjZWxsLnZbMF0pKSB7XG4gICAgICAgICAgY2VsbC50ID0gJ3MnO1xuICAgICAgICAgIGNlbGwudiA9IGNlbGwudi5qb2luKCcsJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShjZWxsLnYpICYmIGNlbGwudi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBjZWxsLnQgPSAncyc7XG4gICAgICAgICAgY2VsbC52ID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbC50ID0gJ3MnO1xuICAgICAgICB9XG5cbiAgICAgICAgd3NbY2VsbFJlZl0gPSBjZWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmFuZ2Uucy5jIDwgMTAwMDAwMDApIHtcbiAgICAgIHdzWychcmVmJ10gPSBYTFNYLnV0aWxzLmVuY29kZV9yYW5nZShyYW5nZS5zLCByYW5nZS5lKTtcbiAgICB9XG4gICAgcmV0dXJuIHdzO1xuICB9XG5cbiAgcHJpdmF0ZSBzMmFiKHMpIHtcbiAgICBsZXQgYnVmID0gbmV3IEFycmF5QnVmZmVyKHMubGVuZ3RoKTtcbiAgICBsZXQgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgIT09IHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZpZXdbaV0gPSBzLmNoYXJDb2RlQXQoaSkgJiAweGZmO1xuICAgIH1cbiAgICByZXR1cm4gYnVmO1xuICB9XG59XG4iXX0=