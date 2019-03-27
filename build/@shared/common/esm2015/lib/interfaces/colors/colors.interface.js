/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class Colors {
    /**
     * @param {?} hex
     * @param {?=} opacity
     * @return {?}
     */
    static hexToRgb(hex, opacity = 1) {
        /** @type {?} */
        let bigint = parseInt(hex.replace('#', ''), 16);
        /** @type {?} */
        let r = (bigint >> 16) & 255;
        /** @type {?} */
        let g = (bigint >> 8) & 255;
        /** @type {?} */
        let b = bigint & 255;
        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    }
    /**
     * @return {?}
     */
    static getKeys() {
        return ['success', 'danger', 'black', 'warning', 'stable'];
    }
    /**
     * @param {?} color
     * @param {?=} defaultValue
     * @return {?}
     */
    static getCssColor(color, defaultValue) {
        if (document) {
            /** @type {?} */
            let retVal = getComputedStyle(document.body).getPropertyValue('--' + color) || defaultValue || Colors[color.replace('-color', '')];
            retVal = (retVal || '').trim();
            return retVal;
        }
        return defaultValue || Colors[color];
    }
    /**
     * @param {?} color
     * @param {?} amount
     * @return {?}
     */
    static lightenDarkenColor(color, amount) {
        /** @type {?} */
        let usePound = false;
        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }
        /** @type {?} */
        let num = parseInt(color, 16);
        /** @type {?} */
        let r = (num >> 16) + amount;
        if (r > 255) {
            r = 255;
        }
        else if (r < 0) {
            r = 0;
        }
        /** @type {?} */
        let b = ((num >> 8) & 0x00ff) + amount;
        if (b > 255) {
            b = 255;
        }
        else if (b < 0) {
            b = 0;
        }
        /** @type {?} */
        let g = (num & 0x0000ff) + amount;
        if (g > 255) {
            g = 255;
        }
        else if (g < 0) {
            g = 0;
        }
        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    }
    /**
     * @return {?}
     */
    static toggleDarkTheme() {
        Colors.setDarkTheme(!Colors.isDarkTheme());
    }
    /**
     * @return {?}
     */
    static isDarkTheme() {
        return Colors._isDarkTheme;
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    static setDarkTheme(enabled) {
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
    }
    /**
     * @return {?}
     */
    static toggleBigFonts() {
        Colors.setBigFonts(!Colors.isBigFonts());
    }
    /**
     * @return {?}
     */
    static isBigFonts() {
        return Colors._isBigFonts;
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    static setBigFonts(enabled) {
        Colors._isBigFonts = enabled;
        if (document) {
            if (enabled) {
                document.documentElement.classList.add('big-fonts');
            }
            else {
                document.documentElement.classList.remove('big-fonts');
            }
        }
    }
}
Colors._isDarkTheme = false;
Colors._isBigFonts = false;
Colors.success = Colors.getCssColor('success');
Colors.danger = Colors.getCssColor('danger');
Colors.warning = Colors.getCssColor('warning');
Colors.black = Colors.getCssColor('black');
Colors.light = Colors.getCssColor('light');
Colors.stable = Colors.getCssColor('stable');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JzLmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9pbnRlcmZhY2VzL2NvbG9ycy9jb2xvcnMuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sTUFBTTs7Ozs7O0lBV1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFXLEVBQUUsT0FBTyxHQUFHLENBQUM7O1lBQ3pDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOztZQUMzQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRzs7WUFDeEIsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUc7O1lBQ3ZCLENBQUMsR0FBRyxNQUFNLEdBQUcsR0FBRztRQUNwQixPQUFPLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQy9ELENBQUM7Ozs7SUFFTSxNQUFNLENBQUMsT0FBTztRQUNuQixPQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7OztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBYSxFQUFFLFlBQXFCO1FBQzVELElBQUksUUFBUSxFQUFFOztnQkFDUixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxZQUFZLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xJLE1BQU0sR0FB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RCxvQkFBNkM7Ozs7O0lBQzdDLG1CQUE0Qzs7SUFFNUMsZUFBc0Q7O0lBQ3RELGNBQW9EOztJQUNwRCxlQUFzRDs7SUFDdEQsYUFBa0Q7O0lBQ2xELGFBQWtEOztJQUNsRCxjQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb2xvcnMge1xuICBwcml2YXRlIHN0YXRpYyBfaXNEYXJrVGhlbWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdGF0aWMgX2lzQmlnRm9udHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgc3RhdGljIHN1Y2Nlc3MgPSBDb2xvcnMuZ2V0Q3NzQ29sb3IoJ3N1Y2Nlc3MnKTtcbiAgcHVibGljIHN0YXRpYyBkYW5nZXIgPSBDb2xvcnMuZ2V0Q3NzQ29sb3IoJ2RhbmdlcicpO1xuICBwdWJsaWMgc3RhdGljIHdhcm5pbmcgPSBDb2xvcnMuZ2V0Q3NzQ29sb3IoJ3dhcm5pbmcnKTtcbiAgcHVibGljIHN0YXRpYyBibGFjayA9IENvbG9ycy5nZXRDc3NDb2xvcignYmxhY2snKTtcbiAgcHVibGljIHN0YXRpYyBsaWdodCA9IENvbG9ycy5nZXRDc3NDb2xvcignbGlnaHQnKTtcbiAgcHVibGljIHN0YXRpYyBzdGFibGUgPSBDb2xvcnMuZ2V0Q3NzQ29sb3IoJ3N0YWJsZScpO1xuXG4gIHB1YmxpYyBzdGF0aWMgaGV4VG9SZ2IoaGV4OiBzdHJpbmcsIG9wYWNpdHkgPSAxKSB7XG4gICAgbGV0IGJpZ2ludCA9IHBhcnNlSW50KGhleC5yZXBsYWNlKCcjJywgJycpLCAxNik7XG4gICAgbGV0IHIgPSAoYmlnaW50ID4+IDE2KSAmIDI1NTtcbiAgICBsZXQgZyA9IChiaWdpbnQgPj4gOCkgJiAyNTU7XG4gICAgbGV0IGIgPSBiaWdpbnQgJiAyNTU7XG4gICAgcmV0dXJuICdyZ2JhKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLCcgKyBvcGFjaXR5ICsgJyknO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRLZXlzKCkge1xuICAgIHJldHVybiBbJ3N1Y2Nlc3MnLCAnZGFuZ2VyJywgJ2JsYWNrJywgJ3dhcm5pbmcnLCAnc3RhYmxlJ107XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldENzc0NvbG9yKGNvbG9yOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IHN0cmluZykge1xuICAgIGlmIChkb2N1bWVudCkge1xuICAgICAgbGV0IHJldFZhbCA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgnLS0nICsgY29sb3IpIHx8IGRlZmF1bHRWYWx1ZSB8fCBDb2xvcnNbY29sb3IucmVwbGFjZSgnLWNvbG9yJywgJycpXTtcbiAgICAgIHJldFZhbCA9IChyZXRWYWwgfHwgJycpLnRyaW0oKTtcbiAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0VmFsdWUgfHwgQ29sb3JzW2NvbG9yXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbGlnaHRlbkRhcmtlbkNvbG9yKGNvbG9yOiBzdHJpbmcsIGFtb3VudDogbnVtYmVyKSB7XG4gICAgbGV0IHVzZVBvdW5kID0gZmFsc2U7XG4gICAgaWYgKGNvbG9yWzBdID09PSAnIycpIHtcbiAgICAgIGNvbG9yID0gY29sb3Iuc2xpY2UoMSk7XG4gICAgICB1c2VQb3VuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbGV0IG51bSA9IHBhcnNlSW50KGNvbG9yLCAxNik7XG5cbiAgICBsZXQgciA9IChudW0gPj4gMTYpICsgYW1vdW50O1xuICAgIGlmIChyID4gMjU1KSB7XG4gICAgICByID0gMjU1O1xuICAgIH0gZWxzZSBpZiAociA8IDApIHtcbiAgICAgIHIgPSAwO1xuICAgIH1cblxuICAgIGxldCBiID0gKChudW0gPj4gOCkgJiAweDAwZmYpICsgYW1vdW50O1xuICAgIGlmIChiID4gMjU1KSB7XG4gICAgICBiID0gMjU1O1xuICAgIH0gZWxzZSBpZiAoYiA8IDApIHtcbiAgICAgIGIgPSAwO1xuICAgIH1cblxuICAgIGxldCBnID0gKG51bSAmIDB4MDAwMGZmKSArIGFtb3VudDtcbiAgICBpZiAoZyA+IDI1NSkge1xuICAgICAgZyA9IDI1NTtcbiAgICB9IGVsc2UgaWYgKGcgPCAwKSB7XG4gICAgICBnID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gKHVzZVBvdW5kID8gJyMnIDogJycpICsgKGcgfCAoYiA8PCA4KSB8IChyIDw8IDE2KSkudG9TdHJpbmcoMTYpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyB0b2dnbGVEYXJrVGhlbWUoKSB7XG4gICAgQ29sb3JzLnNldERhcmtUaGVtZSghQ29sb3JzLmlzRGFya1RoZW1lKCkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc0RhcmtUaGVtZSgpIHtcbiAgICByZXR1cm4gQ29sb3JzLl9pc0RhcmtUaGVtZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2V0RGFya1RoZW1lKGVuYWJsZWQpIHtcbiAgICBDb2xvcnMuX2lzRGFya1RoZW1lID0gZW5hYmxlZDtcbiAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXJrLXRoZW1lJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGFyay10aGVtZScpO1xuICAgICAgfVxuXG4gICAgICBDb2xvcnMuc3VjY2VzcyA9IENvbG9ycy5nZXRDc3NDb2xvcignc3VjY2VzcycpO1xuICAgICAgQ29sb3JzLmRhbmdlciA9IENvbG9ycy5nZXRDc3NDb2xvcignZGFuZ2VyJyk7XG4gICAgICBDb2xvcnMud2FybmluZyA9IENvbG9ycy5nZXRDc3NDb2xvcignd2FybmluZycpO1xuICAgICAgQ29sb3JzLmJsYWNrID0gQ29sb3JzLmdldENzc0NvbG9yKCdibGFjaycpO1xuICAgICAgQ29sb3JzLmxpZ2h0ID0gQ29sb3JzLmdldENzc0NvbG9yKCdsaWdodCcpO1xuICAgICAgQ29sb3JzLnN0YWJsZSA9IENvbG9ycy5nZXRDc3NDb2xvcignc3RhYmxlJyk7XG4gICAgICAvL0NvbG9ycy50ZXh0ID0gQ29sb3JzLmdldENzc0NvbG9yKCdhbHdheXMtdGV4dC1jb2xvcicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgdG9nZ2xlQmlnRm9udHMoKSB7XG4gICAgQ29sb3JzLnNldEJpZ0ZvbnRzKCFDb2xvcnMuaXNCaWdGb250cygpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNCaWdGb250cygpIHtcbiAgICByZXR1cm4gQ29sb3JzLl9pc0JpZ0ZvbnRzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXRCaWdGb250cyhlbmFibGVkKSB7XG4gICAgQ29sb3JzLl9pc0JpZ0ZvbnRzID0gZW5hYmxlZDtcbiAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdiaWctZm9udHMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdiaWctZm9udHMnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==