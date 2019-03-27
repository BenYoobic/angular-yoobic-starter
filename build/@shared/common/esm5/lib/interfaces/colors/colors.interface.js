/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Colors = /** @class */ (function () {
    function Colors() {
    }
    /**
     * @param {?} hex
     * @param {?=} opacity
     * @return {?}
     */
    Colors.hexToRgb = /**
     * @param {?} hex
     * @param {?=} opacity
     * @return {?}
     */
    function (hex, opacity) {
        if (opacity === void 0) { opacity = 1; }
        /** @type {?} */
        var bigint = parseInt(hex.replace('#', ''), 16);
        /** @type {?} */
        var r = (bigint >> 16) & 255;
        /** @type {?} */
        var g = (bigint >> 8) & 255;
        /** @type {?} */
        var b = bigint & 255;
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    };
    /**
     * @return {?}
     */
    Colors.getKeys = /**
     * @return {?}
     */
    function () {
        return ['success', 'danger', 'black', 'warning', 'stable'];
    };
    /**
     * @param {?} color
     * @param {?=} defaultValue
     * @return {?}
     */
    Colors.getCssColor = /**
     * @param {?} color
     * @param {?=} defaultValue
     * @return {?}
     */
    function (color, defaultValue) {
        if (document) {
            /** @type {?} */
            var retVal = getComputedStyle(document.body).getPropertyValue('--' + color) || defaultValue || Colors[color.replace('-color', '')];
            retVal = (retVal || '').trim();
            return retVal;
        }
        return defaultValue || Colors[color];
    };
    /**
     * @param {?} color
     * @param {?} amount
     * @return {?}
     */
    Colors.lightenDarkenColor = /**
     * @param {?} color
     * @param {?} amount
     * @return {?}
     */
    function (color, amount) {
        /** @type {?} */
        var usePound = false;
        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }
        /** @type {?} */
        var num = parseInt(color, 16);
        /** @type {?} */
        var r = (num >> 16) + amount;
        if (r > 255) {
            r = 255;
        }
        else if (r < 0) {
            r = 0;
        }
        /** @type {?} */
        var b = ((num >> 8) & 0x00ff) + amount;
        if (b > 255) {
            b = 255;
        }
        else if (b < 0) {
            b = 0;
        }
        /** @type {?} */
        var g = (num & 0x0000ff) + amount;
        if (g > 255) {
            g = 255;
        }
        else if (g < 0) {
            g = 0;
        }
        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    };
    /**
     * @return {?}
     */
    Colors.toggleDarkTheme = /**
     * @return {?}
     */
    function () {
        Colors.setDarkTheme(!Colors.isDarkTheme());
    };
    /**
     * @return {?}
     */
    Colors.isDarkTheme = /**
     * @return {?}
     */
    function () {
        return Colors._isDarkTheme;
    };
    /**
     * @param {?} enabled
     * @return {?}
     */
    Colors.setDarkTheme = /**
     * @param {?} enabled
     * @return {?}
     */
    function (enabled) {
        Colors._isDarkTheme = enabled;
        if (document) {
            if (enabled) {
                document.documentElement.classList.add('dark-theme');
            }
            else {
                document.documentElement.classList.remove('dark-theme');
            }
            Colors.success = Colors.getCssColor('success');
            Colors.danger = Colors.getCssColor('danger');
            Colors.warning = Colors.getCssColor('warning');
            Colors.black = Colors.getCssColor('black');
            Colors.light = Colors.getCssColor('light');
            Colors.stable = Colors.getCssColor('stable');
            //Colors.text = Colors.getCssColor('always-text-color');
        }
    };
    /**
     * @return {?}
     */
    Colors.toggleBigFonts = /**
     * @return {?}
     */
    function () {
        Colors.setBigFonts(!Colors.isBigFonts());
    };
    /**
     * @return {?}
     */
    Colors.isBigFonts = /**
     * @return {?}
     */
    function () {
        return Colors._isBigFonts;
    };
    /**
     * @param {?} enabled
     * @return {?}
     */
    Colors.setBigFonts = /**
     * @param {?} enabled
     * @return {?}
     */
    function (enabled) {
        Colors._isBigFonts = enabled;
        if (document) {
            if (enabled) {
                document.documentElement.classList.add('big-fonts');
            }
            else {
                document.documentElement.classList.remove('big-fonts');
            }
        }
    };
    Colors._isDarkTheme = false;
    Colors._isBigFonts = false;
    Colors.success = Colors.getCssColor('success');
    Colors.danger = Colors.getCssColor('danger');
    Colors.warning = Colors.getCssColor('warning');
    Colors.black = Colors.getCssColor('black');
    Colors.light = Colors.getCssColor('light');
    Colors.stable = Colors.getCssColor('stable');
    return Colors;
}());
export { Colors };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Colors._isDarkTheme;
    /**
     * @type {?}
     * @private
     */
    Colors._isBigFonts;
    /** @type {?} */
    Colors.success;
    /** @type {?} */
    Colors.danger;
    /** @type {?} */
    Colors.warning;
    /** @type {?} */
    Colors.black;
    /** @type {?} */
    Colors.light;
    /** @type {?} */
    Colors.stable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JzLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2NvbG9ycy9jb2xvcnMuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQUFBO0lBOEdBLENBQUM7Ozs7OztJQW5HZSxlQUFROzs7OztJQUF0QixVQUF1QixHQUFXLEVBQUUsT0FBVztRQUFYLHdCQUFBLEVBQUEsV0FBVzs7WUFDekMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7O1lBQzNDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHOztZQUN4QixDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRzs7WUFDdkIsQ0FBQyxHQUFHLE1BQU0sR0FBRyxHQUFHO1FBQ3BCLE9BQU8sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDL0QsQ0FBQzs7OztJQUVhLGNBQU87OztJQUFyQjtRQUNFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7O0lBRWEsa0JBQVc7Ozs7O0lBQXpCLFVBQTBCLEtBQWEsRUFBRSxZQUFxQjtRQUM1RCxJQUFJLFFBQVEsRUFBRTs7Z0JBQ1IsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksWUFBWSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZ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cUd0RCxhQUFDO0NBQUEsQUE5R0QsSUE4R0M7U0E5R1ksTUFBTTs7Ozs7O0lBQ2pCLG9CQUE2Qzs7Ozs7SUFDN0MsbUJBQTRDOztJQUU1QyxlQUFzRDs7SUFDdEQsY0FBb0Q7O0lBQ3BELGVBQXNEOztJQUN0RCxhQUFrRDs7SUFDbEQsYUFBa0Q7O0lBQ2xELGNBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENvbG9ycyB7XG4gIHByaXZhdGUgc3RhdGljIF9pc0RhcmtUaGVtZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHN0YXRpYyBfaXNCaWdGb250czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBzdGF0aWMgc3VjY2VzcyA9IENvbG9ycy5nZXRDc3NDb2xvcignc3VjY2VzcycpO1xuICBwdWJsaWMgc3RhdGljIGRhbmdlciA9IENvbG9ycy5nZXRDc3NDb2xvcignZGFuZ2VyJyk7XG4gIHB1YmxpYyBzdGF0aWMgd2FybmluZyA9IENvbG9ycy5nZXRDc3NDb2xvcignd2FybmluZycpO1xuICBwdWJsaWMgc3RhdGljIGJsYWNrID0gQ29sb3JzLmdldENzc0NvbG9yKCdibGFjaycpO1xuICBwdWJsaWMgc3RhdGljIGxpZ2h0ID0gQ29sb3JzLmdldENzc0NvbG9yKCdsaWdodCcpO1xuICBwdWJsaWMgc3RhdGljIHN0YWJsZSA9IENvbG9ycy5nZXRDc3NDb2xvcignc3RhYmxlJyk7XG5cbiAgcHVibGljIHN0YXRpYyBoZXhUb1JnYihoZXg6IHN0cmluZywgb3BhY2l0eSA9IDEpIHtcbiAgICBsZXQgYmlnaW50ID0gcGFyc2VJbnQoaGV4LnJlcGxhY2UoJyMnLCAnJyksIDE2KTtcbiAgICBsZXQgciA9IChiaWdpbnQgPj4gMTYpICYgMjU1O1xuICAgIGxldCBnID0gKGJpZ2ludCA+PiA4KSAmIDI1NTtcbiAgICBsZXQgYiA9IGJpZ2ludCAmIDI1NTtcbiAgICByZXR1cm4gJ3JnYmEoJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICcsJyArIG9wYWNpdHkgKyAnKSc7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEtleXMoKSB7XG4gICAgcmV0dXJuIFsnc3VjY2VzcycsICdkYW5nZXInLCAnYmxhY2snLCAnd2FybmluZycsICdzdGFibGUnXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Q3NzQ29sb3IoY29sb3I6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogc3RyaW5nKSB7XG4gICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICBsZXQgcmV0VmFsID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCctLScgKyBjb2xvcikgfHwgZGVmYXVsdFZhbHVlIHx8IENvbG9yc1tjb2xvci5yZXBsYWNlKCctY29sb3InLCAnJyldO1xuICAgICAgcmV0VmFsID0gKHJldFZhbCB8fCAnJykudHJpbSgpO1xuICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZSB8fCBDb2xvcnNbY29sb3JdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBsaWdodGVuRGFya2VuQ29sb3IoY29sb3I6IHN0cmluZywgYW1vdW50OiBudW1iZXIpIHtcbiAgICBsZXQgdXNlUG91bmQgPSBmYWxzZTtcbiAgICBpZiAoY29sb3JbMF0gPT09ICcjJykge1xuICAgICAgY29sb3IgPSBjb2xvci5zbGljZSgxKTtcbiAgICAgIHVzZVBvdW5kID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZXQgbnVtID0gcGFyc2VJbnQoY29sb3IsIDE2KTtcblxuICAgIGxldCByID0gKG51bSA+PiAxNikgKyBhbW91bnQ7XG4gICAgaWYgKHIgPiAyNTUpIHtcbiAgICAgIHIgPSAyNTU7XG4gICAgfSBlbHNlIGlmIChyIDwgMCkge1xuICAgICAgciA9IDA7XG4gICAgfVxuXG4gICAgbGV0IGIgPSAoKG51bSA+PiA4KSAmIDB4MDBmZikgKyBhbW91bnQ7XG4gICAgaWYgKGIgPiAyNTUpIHtcbiAgICAgIGIgPSAyNTU7XG4gICAgfSBlbHNlIGlmIChiIDwgMCkge1xuICAgICAgYiA9IDA7XG4gICAgfVxuXG4gICAgbGV0IGcgPSAobnVtICYgMHgwMDAwZmYpICsgYW1vdW50O1xuICAgIGlmIChnID4gMjU1KSB7XG4gICAgICBnID0gMjU1O1xuICAgIH0gZWxzZSBpZiAoZyA8IDApIHtcbiAgICAgIGcgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiAodXNlUG91bmQgPyAnIycgOiAnJykgKyAoZyB8IChiIDw8IDgpIHwgKHIgPDwgMTYpKS50b1N0cmluZygxNik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHRvZ2dsZURhcmtUaGVtZSgpIHtcbiAgICBDb2xvcnMuc2V0RGFya1RoZW1lKCFDb2xvcnMuaXNEYXJrVGhlbWUoKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzRGFya1RoZW1lKCkge1xuICAgIHJldHVybiBDb2xvcnMuX2lzRGFya1RoZW1lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXREYXJrVGhlbWUoZW5hYmxlZCkge1xuICAgIENvbG9ycy5faXNEYXJrVGhlbWUgPSBlbmFibGVkO1xuICAgIGlmIChkb2N1bWVudCkge1xuICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrLXRoZW1lJyk7XG4gICAgICB9XG5cbiAgICAgIENvbG9ycy5zdWNjZXNzID0gQ29sb3JzLmdldENzc0NvbG9yKCdzdWNjZXNzJyk7XG4gICAgICBDb2xvcnMuZGFuZ2VyID0gQ29sb3JzLmdldENzc0NvbG9yKCdkYW5nZXInKTtcbiAgICAgIENvbG9ycy53YXJuaW5nID0gQ29sb3JzLmdldENzc0NvbG9yKCd3YXJuaW5nJyk7XG4gICAgICBDb2xvcnMuYmxhY2sgPSBDb2xvcnMuZ2V0Q3NzQ29sb3IoJ2JsYWNrJyk7XG4gICAgICBDb2xvcnMubGlnaHQgPSBDb2xvcnMuZ2V0Q3NzQ29sb3IoJ2xpZ2h0Jyk7XG4gICAgICBDb2xvcnMuc3RhYmxlID0gQ29sb3JzLmdldENzc0NvbG9yKCdzdGFibGUnKTtcbiAgICAgIC8vQ29sb3JzLnRleHQgPSBDb2xvcnMuZ2V0Q3NzQ29sb3IoJ2Fsd2F5cy10ZXh0LWNvbG9yJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyB0b2dnbGVCaWdGb250cygpIHtcbiAgICBDb2xvcnMuc2V0QmlnRm9udHMoIUNvbG9ycy5pc0JpZ0ZvbnRzKCkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0JpZ0ZvbnRzKCkge1xuICAgIHJldHVybiBDb2xvcnMuX2lzQmlnRm9udHM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldEJpZ0ZvbnRzKGVuYWJsZWQpIHtcbiAgICBDb2xvcnMuX2lzQmlnRm9udHMgPSBlbmFibGVkO1xuICAgIGlmIChkb2N1bWVudCkge1xuICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2JpZy1mb250cycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2JpZy1mb250cycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19