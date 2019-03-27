import { h } from '../design-system.core.js';

import { cb as _gsScope, cc as TweenPlugin, cd as CSSPlugin, ce as globals, cf as TweenLite$3, cg as EventDispatcher, aQ as setValueAndValidateInput, a5 as getAppContext } from './chunk-30364fba.js';
import './chunk-c535de07.js';
import './chunk-262e5ad4.js';

/*!
 * VERSION: 1.5.3
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/


	var _numExp = /(\d|\.)+/g,
		_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
		_colorLookup = {aqua:[0,255,255],
			lime:[0,255,0],
			silver:[192,192,192],
			black:[0,0,0],
			maroon:[128,0,0],
			teal:[0,128,128],
			blue:[0,0,255],
			navy:[0,0,128],
			white:[255,255,255],
			fuchsia:[255,0,255],
			olive:[128,128,0],
			yellow:[255,255,0],
			orange:[255,165,0],
			gray:[128,128,128],
			purple:[128,0,128],
			green:[0,128,0],
			red:[255,0,0],
			pink:[255,192,203],
			cyan:[0,255,255],
			transparent:[255,255,255,0]},
		_hue = function(h, m1, m2) {
			h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
			return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
		},
		/**
		 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
		 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
		 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
		 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
		 */
		_parseColor = function(v, toHSL) {
			var a, r, g, b, h, s, l, max, min, d, wasHSL;
			if (!v) {
				a = _colorLookup.black;
			} else if (typeof(v) === "number") {
				a = [v >> 16, (v >> 8) & 255, v & 255];
			} else {
				if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
					v = v.substr(0, v.length - 1);
				}
				if (_colorLookup[v]) {
					a = _colorLookup[v];
				} else if (v.charAt(0) === "#") {
					if (v.length === 4) { //for shorthand like #9F0
						r = v.charAt(1);
						g = v.charAt(2);
						b = v.charAt(3);
						v = "#" + r + r + g + g + b + b;
					}
					v = parseInt(v.substr(1), 16);
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else if (v.substr(0, 3) === "hsl") {
					a = wasHSL = v.match(_numExp);
					if (!toHSL) {
						h = (Number(a[0]) % 360) / 360;
						s = Number(a[1]) / 100;
						l = Number(a[2]) / 100;
						g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
						r = l * 2 - g;
						if (a.length > 3) {
							a[3] = Number(a[3]);
						}
						a[0] = _hue(h + 1 / 3, r, g);
						a[1] = _hue(h, r, g);
						a[2] = _hue(h - 1 / 3, r, g);
					} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
						return v.match(_relNumExp);
					}
				} else {
					a = v.match(_numExp) || _colorLookup.transparent;
				}
				a[0] = Number(a[0]);
				a[1] = Number(a[1]);
				a[2] = Number(a[2]);
				if (a.length > 3) {
					a[3] = Number(a[3]);
				}
			}
			if (toHSL && !wasHSL) {
				r = a[0] / 255;
				g = a[1] / 255;
				b = a[2] / 255;
				max = Math.max(r, g, b);
				min = Math.min(r, g, b);
				l = (max + min) / 2;
				if (max === min) {
					h = s = 0;
				} else {
					d = max - min;
					s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
					h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
					h *= 60;
				}
				a[0] = (h + 0.5) | 0;
				a[1] = (s * 100 + 0.5) | 0;
				a[2] = (l * 100 + 0.5) | 0;
			}
			return a;
		},
		_formatColors = function(s, toHSL) {
			var colors = (s + "").match(_colorExp) || [],
				charIndex = 0,
				parsed = "",
				i, color, temp;
			if (!colors.length) {
				return s;
			}
			for (i = 0; i < colors.length; i++) {
				color = colors[i];
				temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
				charIndex += temp.length + color.length;
				color = _parseColor(color, toHSL);
				if (color.length === 3) {
					color.push(1);
				}
				parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
			}
			return parsed + s.substr(charIndex);
		}, p, _colorStringFilter,
		TweenLite$1 = (_gsScope.GreenSockGlobals || _gsScope).TweenLite,
		_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b", //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		ColorPropsPlugin = _gsScope._gsDefine.plugin({
			propName: "colorProps",
			version: "1.5.3",
			priority: -1,
			API: 2,
			global: true,

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween, index) {
				var p, proxy, pt, val;
				this._target = target;
				this._proxy = proxy = ((value.format + "").toUpperCase() === "NUMBER") ? {} : 0;
				for (p in value) {
					if (p !== "format") {
						if (proxy) {
							this._firstNumPT = pt = {_next:this._firstNumPT, t:target, p:p, f:(typeof(target[p]) === "function")};
							proxy[p] = "rgb(" + _parseColor(!pt.f ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]()).join(",") + ")";
							val = value[p];
							if (typeof(val) === "function") {
								val = val(index, target);
							}
							this._addTween(proxy, p, "get", ((typeof(val) === "number") ? "rgb(" + _parseColor(val, false).join(",") + ")" : val), p, null, null, _colorStringFilter);
						} else {
							this._addTween(target, p, "get", value[p], p, null, null, _colorStringFilter, index);
						}

					}
				}
				return true;
			},

			//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
			set: function(v) {
				var pt = this._firstNumPT,
					val;
				this._super.setRatio.call(this, v);
				while (pt) {
					val = _parseColor(this._proxy[pt.p], false);
					val = val[0] << 16 | val[1] << 8 | val[2];
					if (pt.f) {
						this._target[pt.p](val);
					} else {
						this._target[pt.p] = val;
					}
					pt = pt._next;
				}
			}
		});

	for (p in _colorLookup) {
		_colorExp += "|" + p + "\\b";
	}
	_colorExp = new RegExp(_colorExp+")", "gi");
	ColorPropsPlugin.colorStringFilter = _colorStringFilter = function(a) {
		var combined = a[0] + " " + a[1],
			toHSL;
		_colorExp.lastIndex = 0;
		if (_colorExp.test(combined)) {
			toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
			a[0] = _formatColors(a[0], toHSL);
			a[1] = _formatColors(a[1], toHSL);
		}
	};

	if (!TweenLite$1.defaultStringFilter) {
		TweenLite$1.defaultStringFilter = ColorPropsPlugin.colorStringFilter;
	}

	ColorPropsPlugin.parseColor = _parseColor;
	p = ColorPropsPlugin.prototype;
	p._firstNumPT = null;
	p._kill = function(lookup) {
		var pt = this._firstNumPT,
			prev;
		while (pt) {
			if (pt.p in lookup) {
				if (pt === p._firstNumPT) {
					this._firstNumPT = pt._next;
				}
				if (prev) {
					prev._next = pt._next;
				}
			} else {
				prev = pt;
			}
			pt = pt._next;
		}
		return this._super._kill(lookup);
	};

/*!
 * VERSION: 0.6.8
 * DATE: 2019-02-22
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

_gsScope._gsDefine("plugins.CSSRulePlugin", ["plugins.TweenPlugin","TweenLite","plugins.CSSPlugin"], function() {

		/** @constructor **/
		var CSSRulePlugin = function() {
				TweenPlugin.call(this, "cssRule");
				this._overwriteProps.length = 0;
			},
			_doc = _gsScope.document,
			_superSetRatio = CSSPlugin.prototype.setRatio,
			p = CSSRulePlugin.prototype = new CSSPlugin();

		p._propName = "cssRule";
		p.constructor = CSSRulePlugin;
		CSSRulePlugin.version = "0.6.8";
		CSSRulePlugin.API = 2;

		/**
		 * Searches the style sheets in the document for a particular selector like ".myClass" or "a" or "a:hover" or ":after" and
		 * returns a reference to that style sheet (or an array of them in the case of a pseudo selector like ":after"). Then you
		 * can animate the individual properties of the style sheet.
		 *
		 * @param {!string} selector a string describing the selector, like ".myClass" or "a" or "a:hover" or ":after"
		 * @return a reference to the style sheet (or an array of them in the case of a pseudo selector). If none was found, null is returned (or an empty array for a pseudo selector)
		 */
		CSSRulePlugin.getRule = function(selector) {
			var ruleProp = _doc.all ? "rules" : "cssRules",
				ss = _doc.styleSheets,
				i = ss.length,
				pseudo = (selector.charAt(0) === ":"),
				j, curSS, cs, a;
			selector = (pseudo ? "" : ",") + selector.split("::").join(":").toLowerCase() + ","; //note: old versions of IE report tag name selectors as upper case, so we just change everything to lowercase.
			if (pseudo) {
				a = [];
			}
			while (--i > -1) {
				//Firefox may throw insecure operation errors when css is loaded from other domains, so try/catch.
				try {
					curSS = ss[i][ruleProp];
					if (!curSS) {
						continue;
					}
					j = curSS.length;
				} catch (e) {
					console.log(e);
					continue;
				}
				while (--j > -1) {
					cs = curSS[j];
					if (cs.selectorText && ("," + cs.selectorText.split("::").join(":").toLowerCase() + ",").indexOf(selector) !== -1) { //note: IE adds an extra ":" to pseudo selectors, so .myClass:after becomes .myClass::after, so we need to strip the extra one out.
						if (pseudo) {
							a.push(cs.style);
						} else {
							return cs.style;
						}
					}
				}
			}
			return a;
		};
							
		
		// @private gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
		p._onInitTween = function(target, value, tween) {
			if (target.cssText === undefined) {
				return false;
			}
			var div = target._gsProxy = target._gsProxy || _doc.createElement("div");
			this._ss = target;
			this._proxy = div.style;
			div.style.cssText = target.cssText;
			CSSPlugin.prototype._onInitTween.call(this, div, value, tween); //we just offload all the work to the regular CSSPlugin and then copy the cssText back over to the rule in the setRatio() method. This allows us to have all of the updates to CSSPlugin automatically flow through to CSSRulePlugin instead of having to maintain both
			return true;
		};

		
		
		// @private gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
		p.setRatio = function(v) {
			_superSetRatio.call(this, v);
			var proxy = this._proxy,
				ss = this._ss,
				i = proxy.length;
			while (--i > -1) {
				ss[proxy[i]] = proxy[proxy[i]];
			}
		};
		
		
		TweenPlugin.activate([CSSRulePlugin]);
		return CSSRulePlugin;
		
	}, true);

var CSSRulePlugin = globals.CSSRulePlugin;

/*!
 * VERSION: 0.2.2
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/


	var _numExp$1 = /(\d|\.)+/g,
		_ColorFilter, _ColorMatrixFilter,
		_colorProps = ["redMultiplier","greenMultiplier","blueMultiplier","alphaMultiplier","redOffset","greenOffset","blueOffset","alphaOffset"],
		_colorLookup$1 = {aqua:[0,255,255],
			lime:[0,255,0],
			silver:[192,192,192],
			black:[0,0,0],
			maroon:[128,0,0],
			teal:[0,128,128],
			blue:[0,0,255],
			navy:[0,0,128],
			white:[255,255,255],
			fuchsia:[255,0,255],
			olive:[128,128,0],
			yellow:[255,255,0],
			orange:[255,165,0],
			gray:[128,128,128],
			purple:[128,0,128],
			green:[0,128,0],
			red:[255,0,0],
			pink:[255,192,203],
			cyan:[0,255,255],
			transparent:[255,255,255,0]},
		_parseColor$1 = function(color) {
			if (color === "" || color == null || color === "none") {
				return _colorLookup$1.transparent;
			} else if (_colorLookup$1[color]) {
				return _colorLookup$1[color];
			} else if (typeof(color) === "number") {
				return [color >> 16, (color >> 8) & 255, color & 255];
			} else if (color.charAt(0) === "#") {
				if (color.length === 4) { //for shorthand like #9F0
					color = "#" + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);
				}
				color = parseInt(color.substr(1), 16);
				return [color >> 16, (color >> 8) & 255, color & 255];
			}
			return color.match(_numExp$1) || _colorLookup$1.transparent;
		},
		_parseColorFilter = function(t, v, pg) {
			if (!_ColorFilter) {
				_ColorFilter = (_gsScope.ColorFilter || _gsScope.createjs.ColorFilter);
				if (!_ColorFilter) {
					throw("EaselPlugin error: The EaselJS ColorFilter JavaScript file wasn't loaded.");
				}
			}
			var filters = t.filters || [],
				i = filters.length,
				c, s, e, a, p;
			while (--i > -1) {
				if (filters[i] instanceof _ColorFilter) {
					s = filters[i];
					break;
				}
			}
			if (!s) {
				s = new _ColorFilter();
				filters.push(s);
				t.filters = filters;
			}
			e = s.clone();
			if (v.tint != null) {
				c = _parseColor$1(v.tint);
				a = (v.tintAmount != null) ? Number(v.tintAmount) : 1;
				e.redOffset = Number(c[0]) * a;
				e.greenOffset = Number(c[1]) * a;
				e.blueOffset = Number(c[2]) * a;
				e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - a;
			} else {
				for (p in v) {
					if (p !== "exposure") if (p !== "brightness") {
						e[p] = Number(v[p]);
					}
				}
			}
			if (v.exposure != null) {
				e.redOffset = e.greenOffset = e.blueOffset = 255 * (Number(v.exposure) - 1);
				e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1;
			} else if (v.brightness != null) {
				a = Number(v.brightness) - 1;
				e.redOffset = e.greenOffset = e.blueOffset = (a > 0) ? a * 255 : 0;
				e.redMultiplier = e.greenMultiplier = e.blueMultiplier = 1 - Math.abs(a);
			}
			i = 8;
			while (--i > -1) {
				p = _colorProps[i];
				if (s[p] !== e[p]) {
					pg._addTween(s, p, s[p], e[p], "easel_colorFilter");
				}
			}
			pg._overwriteProps.push("easel_colorFilter");
			if (!t.cacheID) {
				throw("EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + t);
			}
		},

		_idMatrix = [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],
		_lumR = 0.212671,
		_lumG = 0.715160,
		_lumB = 0.072169,

		_applyMatrix = function(m, m2) {
			if (!(m instanceof Array) || !(m2 instanceof Array)) {
				return m2;
			}
			var temp = [],
				i = 0,
				z = 0,
				y, x;
			for (y = 0; y < 4; y++) {
				for (x = 0; x < 5; x++) {
					z = (x === 4) ? m[i + 4] : 0;
					temp[i + x] = m[i]   * m2[x] + m[i+1] * m2[x + 5] +	m[i+2] * m2[x + 10] + m[i+3] * m2[x + 15] +	z;
				}
				i += 5;
			}
			return temp;
		},

		_setSaturation = function(m, n) {
			if (isNaN(n)) {
				return m;
			}
			var inv = 1 - n,
				r = inv * _lumR,
				g = inv * _lumG,
				b = inv * _lumB;
			return _applyMatrix([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
		},

		_colorize = function(m, color, amount) {
			if (isNaN(amount)) {
				amount = 1;
			}
			var c = _parseColor$1(color),
				r = c[0] / 255,
				g = c[1] / 255,
				b = c[2] / 255,
				inv = 1 - amount;
			return _applyMatrix([inv + amount * r * _lumR, amount * r * _lumG, amount * r * _lumB, 0, 0, amount * g * _lumR, inv + amount * g * _lumG, amount * g * _lumB, 0, 0, amount * b * _lumR, amount * b * _lumG, inv + amount * b * _lumB, 0, 0, 0, 0, 0, 1, 0], m);
		},

		_setHue = function(m, n) {
			if (isNaN(n)) {
				return m;
			}
			n *= Math.PI / 180;
			var c = Math.cos(n),
				s = Math.sin(n);
			return _applyMatrix([(_lumR + (c * (1 - _lumR))) + (s * (-_lumR)), (_lumG + (c * (-_lumG))) + (s * (-_lumG)), (_lumB + (c * (-_lumB))) + (s * (1 - _lumB)), 0, 0, (_lumR + (c * (-_lumR))) + (s * 0.143), (_lumG + (c * (1 - _lumG))) + (s * 0.14), (_lumB + (c * (-_lumB))) + (s * -0.283), 0, 0, (_lumR + (c * (-_lumR))) + (s * (-(1 - _lumR))), (_lumG + (c * (-_lumG))) + (s * _lumG), (_lumB + (c * (1 - _lumB))) + (s * _lumB), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
		},

		_setContrast = function(m, n) {
			if (isNaN(n)) {
				return m;
			}
			n += 0.01;
			return _applyMatrix([n,0,0,0,128 * (1 - n), 0,n,0,0,128 * (1 - n), 0,0,n,0,128 * (1 - n), 0,0,0,1,0], m);
		},

		_parseColorMatrixFilter = function(t, v, pg) {
			if (!_ColorMatrixFilter) {
				_ColorMatrixFilter = (_gsScope.ColorMatrixFilter || _gsScope.createjs.ColorMatrixFilter);
				if (!_ColorMatrixFilter) {
					throw("EaselPlugin error: The EaselJS ColorMatrixFilter JavaScript file wasn't loaded.");
				}
			}
			var filters = t.filters || [],
				i = filters.length,
				matrix, startMatrix, s;
			while (--i > -1) {
				if (filters[i] instanceof _ColorMatrixFilter) {
					s = filters[i];
					break;
				}
			}
			if (!s) {
				s = new _ColorMatrixFilter(_idMatrix.slice());
				filters.push(s);
				t.filters = filters;
			}
			startMatrix = s.matrix;
			matrix = _idMatrix.slice();
			if (v.colorize != null) {
				matrix = _colorize(matrix, v.colorize, Number(v.colorizeAmount));
			}
			if (v.contrast != null) {
				matrix = _setContrast(matrix, Number(v.contrast));
			}
			if (v.hue != null) {
				matrix = _setHue(matrix, Number(v.hue));
			}
			if (v.saturation != null) {
				matrix = _setSaturation(matrix, Number(v.saturation));
			}

			i = matrix.length;
			while (--i > -1) {
				if (matrix[i] !== startMatrix[i]) {
					pg._addTween(startMatrix, i, startMatrix[i], matrix[i], "easel_colorMatrixFilter");
				}
			}

			pg._overwriteProps.push("easel_colorMatrixFilter");
			if (!t.cacheID) {
				throw("EaselPlugin warning: for filters to display in EaselJS, you must call the object's cache() method first. " + t);
			}

			pg._matrix = startMatrix;
		};


	var EaselPlugin = _gsScope._gsDefine.plugin({
		propName: "easel",
		priority: -1,
		version: "0.2.2",
		API: 2,

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween, index) {
			this._target = target;
			var p, pt, tint, colorMatrix, end, labels, i;
			for (p in value) {

				end = value[p];
				if (typeof(end) === "function") {
					end = end(index, target);
				}
				if (p === "colorFilter" || p === "tint" || p === "tintAmount" || p === "exposure" || p === "brightness") {
					if (!tint) {
						_parseColorFilter(target, value.colorFilter || value, this);
						tint = true;
					}

				} else if (p === "saturation" || p === "contrast" || p === "hue" || p === "colorize" || p === "colorizeAmount") {
					if (!colorMatrix) {
						_parseColorMatrixFilter(target, value.colorMatrixFilter || value, this);
						colorMatrix = true;
					}

				} else if (p === "frame") {
					this._firstPT = pt = {_next:this._firstPT, t:target, p:"gotoAndStop", s:target.currentFrame, f:true, n:"frame", pr:0, type:0, m:Math.round};
					if (typeof(end) === "string" && end.charAt(1) !== "=" && (labels = target.labels)) {
						for (i = 0; i < labels.length; i++) {
							if (labels[i].label === end) {
								end = labels[i].position;
							}
						}
					}
					pt.c = (typeof(end) === "number") ? end - pt.s : parseFloat((end+"").split("=").join(""));
					if (pt._next) {
						pt._next._prev = pt;
					}

				} else if (target[p] != null) {
					this._firstPT = pt = {_next:this._firstPT, t:target, p:p, f:(typeof(target[p]) === "function"), n:p, pr:0, type:0};
					pt.s = (!pt.f) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
					pt.c = (typeof(end) === "number") ? end - pt.s : (typeof(end) === "string") ? parseFloat(end.split("=").join("")) : 0;

					if (pt._next) {
						pt._next._prev = pt;
					}
				}

			}
			return true;
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(v) {
			var pt = this._firstPT,
				min = 0.000001,
				val;
			while (pt) {
				val = pt.c * v + pt.s;
				if (pt.m) {
					val = pt.m(val, pt.t);
				} else if (val < min && val > -min) {
					val = 0;
				}
				if (pt.f) {
					pt.t[pt.p](val);
				} else {
					pt.t[pt.p] = val;
				}
				pt = pt._next;
			}
			if (this._target.cacheID) {
				this._target.updateCache();
			}
		}

	});

/*!
 * VERSION: 0.1.3
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

var EndArrayPlugin = _gsScope._gsDefine.plugin({
		propName: "endArray",
		API: 2,
		version: "0.1.3",

		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {
			var i = value.length,
				a = this.a = [],
				start, end;
			this.target = target;
			this._mod = 0;
			if (!i) {
				return false;
			}
			while (--i > -1) {
				start = target[i];
				end = value[i];
				if (start !== end) {
					a.push({i:i, s:start, c:end - start});
				}
			}
			return true;
		},

		mod: function(lookup) {
			if (typeof(lookup.endArray) === "function") {
				this._mod = lookup.endArray;
			}
		},

		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {
			var target = this.target,
				a = this.a,
				i = a.length,
				mod = this._mod,
				e, val;
			if (mod) {
				while (--i > -1) {
					e = a[i];
					target[e.i] = mod(e.s + e.c * ratio, target);
				}
			} else {
				while (--i > -1) {
					e = a[i];
					val = e.s + e.c * ratio;
					target[e.i] = (val < 0.000001 && val > -0.000001) ? 0 : val;
				}
			}
		}

	});

/*!
 * VERSION: 0.0.4
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */


		var _cssRatioSetter = function(pt, cssp, mod) { //Takes an individual CSSPropTween and converts it into a type:2 that has a setRatio that does everything the regular CSSPlugin.setRatio() method does but applying the mod() too. We do this to keep the main CSSPlugin.setRatio() as fast as possible (the vast majority of times, no mod() will be necessary)
				var type = pt.type,
					oldSetRatio = pt.setRatio,
					tween = cssp._tween,
					target = cssp._target;
				pt.type = 2;
				pt.m = mod;
				pt.setRatio = function(v) {
					var min = 0.000001,
						val, str, i;
					if (v === 1 && (tween._time === tween._duration || tween._time === 0)) {

						if (type !== 2) {
							if (pt.r && type !== -1) {
								val = Math.round(pt.s + pt.c);
								if (!type) {
									pt.t[pt.p] = mod.call(tween, val + pt.xs0, target, tween);
								} else if (type === 1) {
									str = pt.xs0 + val + pt.xs1;
									for (i = 1; i < pt.l; i++) {
										str += pt["xn"+i] + pt["xs"+(i+1)];
									}
									pt.t[pt.p] = mod.call(tween, str, target, tween);
								}
							} else {
								pt.t[pt.p] = mod.call(tween, pt.e, target, tween);
							}
						} else {
							oldSetRatio.call(pt, v);
						}

					} else if (v || !(tween._time === tween._duration || tween._time === 0) || tween._rawPrevTime === -0.000001) {
						val = pt.c * v + pt.s;
						if (pt.r) {
							val = Math.round(val);
						} else if (val < min) if (val > -min) {
							val = 0;
						}
						if (!type) {
							pt.t[pt.p] = mod.call(tween, val + pt.xs0, target, tween);
						} else if (type === 1) {
							str = pt.xs0 + val + pt.xs1;
							for (i = 1; i < pt.l; i++) {
								str += pt["xn"+i] + pt["xs"+(i+1)];
							}
							pt.t[pt.p] = mod.call(tween, str, target, tween);

						} else if (type === -1) { //non-tweening value
							pt.t[pt.p] = mod.call(tween, pt.xs0, target, tween);

						} else if (oldSetRatio) {
							oldSetRatio.call(pt, v);
						}

					} else {
						if (type !== 2) {
							pt.t[pt.p] = mod.call(tween, pt.b, target, tween);
						} else {
							oldSetRatio.call(pt, v);
						}
					}
				};
			},
			_modCSS = function(lookup, cssp) {
				var pt = cssp._firstPT,
					hasBezier = (lookup.rotation && cssp._overwriteProps.join("").indexOf("bezier") !== -1); //when a Bezier tween is applying autoRotation, it's a very special case we need to handle differently.
				if (lookup.scale) {
					lookup.scaleX = lookup.scaleY = lookup.scale;
				} else if (lookup.rotationZ) {
					lookup.rotation = lookup.rotationZ;
				}
				while (pt) {
					if (typeof(lookup[pt.p]) === "function") {
						_cssRatioSetter(pt, cssp, lookup[pt.p]);
					} else if (hasBezier && pt.n === "bezier" && pt.plugin._overwriteProps.join("").indexOf("rotation") !== -1) {
						pt.data.mod = lookup.rotation;
					}
					pt = pt._next;
				}
			},

			ModifiersPlugin = _gsScope._gsDefine.plugin({
				propName: "modifiers",
				version: "0.0.4",
				API: 2,

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {
					this._tween = tween;
					this._vars = value;
					return true;
				},

				initAll: function() {
					var tween = this._tween,
						lookup = this._vars,
						mpt = this,
						pt = tween._firstPT,
						val, next;
					//initAll() gets called for each and every ModifiersPlugin instance in a tween, so if there are multiple targets, there will be multiple instances. Since we're ripping through the whole tween (and all the PropTweens), we only need to run this code ONCE. So we're setting a toggle on the first PropTween that just tells us if we've done it already. We don't set it on the tween instance because if it gets invalidated, we don't want to have to track this property and reset it. PropTweens get blown away when a tween is invalidated.
					if (pt._modInitted) {
						return false;
					} else {
						pt._modInitted = 1;
					}
					while (pt) {
						next = pt._next; //record here, because it may get removed
						val = lookup[pt.n];
						if (pt.pg) {
							if (pt.t._propName === "css") { //handle CSSPlugin uniquely (for performance, due to the fact that the values almost always are a concatenation of numbers and strings, like suffixes, and we don't want to slow down the regular CSSPlugin setRatio() performance with conditional checks for if the value needs to be modded, so we pull any modding prop out and change it to a type:2 one that simply calls a setRatio() method where we encapsulate the modding and update all together. That way, it says in the main CSSProp linked list and just has some custom logic applied to it inside its setRatio())
								_modCSS(lookup, pt.t);
							} else if (pt.t !== mpt) { //don't run modProps on modProps :)
								val = lookup[pt.t._propName];
								pt.t._tween = tween;
								pt.t._mod((typeof(val) === "object") ? val : lookup);
							}
						} else if (typeof(val) === "function") {
							if (pt.f === 2 && pt.t) { //a blob (text containing multiple numeric values)
								pt.t._applyPT.m = val;
								pt.t._tween = tween;
							} else {
								this._add(pt.t, pt.p, pt.s, pt.c, val);
								//remove from linked list
								if (next) {
									next._prev = pt._prev;
								}
								if (pt._prev) {
									pt._prev._next = next;
								} else if (tween._firstPT === pt) {
									tween._firstPT = next;
								}
								pt._next = pt._prev = null;
								tween._propLookup[pt.n] = mpt;
							}
						}
						pt = next;
					}
					return false;
				}

			}),
			p$1 = ModifiersPlugin.prototype;

		p$1._add = function(target, p, s, c, mod) {
			this._addTween(target, p, s, s + c, p, mod);
			this._overwriteProps.push(p);
		};

	p$1 = _gsScope._gsDefine.globals.TweenLite.version.split(".");
	if (Number(p$1[0]) <= 1 && Number(p$1[1]) < 19 && _gsScope.console) {
		console.log("ModifiersPlugin requires GSAP 1.19.0 or later.");
	}

/*!
 * VERSION: 0.2.1
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * PixiPlugin is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */


    var _numExp$2 = /(\d|\.)+/g,
		_relNumExp$1 = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
		_colorLookup$2 = {aqua:[0,255,255],
			lime:[0,255,0],
			silver:[192,192,192],
			black:[0,0,0],
			maroon:[128,0,0],
			teal:[0,128,128],
			blue:[0,0,255],
			navy:[0,0,128],
			white:[255,255,255],
			fuchsia:[255,0,255],
			olive:[128,128,0],
			yellow:[255,255,0],
			orange:[255,165,0],
			gray:[128,128,128],
			purple:[128,0,128],
			green:[0,128,0],
			red:[255,0,0],
			pink:[255,192,203],
			cyan:[0,255,255],
			transparent:[255,255,255,0]},
		_hue$1 = function(h, m1, m2) {
			h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
			return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
		},
		/**
		 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if "format" parameter is "hsl", it will populate the array with hue, saturation, and lightness values. Or if "format" is "number", it'll return a number like 0xFF0000 instead of an array. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
		 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
		 * @param {(string)} format If "hsl", an hsl() or hsla() value will be returned instead of rgb() or rgba(). Or if "number", then a numeric value will be returned, like 0xFF0000. Default is rgb.
		 * @return {(array|number)} An array containing red, green, and blue (and optionally alpha) in that order, or if the format parameter was "hsl", the array will contain hue, saturation and lightness (and optionally alpha) in that order. Or if "format" is defined as "number", it'll return a number like 0xFF0000. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and "format" is "hsl".
		 */
		_parseColor$2 = function(v, format) {
			var toHSL = (format === "hsl"),
				a, r, g, b, h, s, l, max, min, d, wasHSL;
			if (!v) {
				a = _colorLookup$2.black;
			} else if (typeof(v) === "number") {
				a = [v >> 16, (v >> 8) & 255, v & 255];
			} else {
				if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
					v = v.substr(0, v.length - 1);
				}
				if (_colorLookup$2[v]) {
					a = _colorLookup$2[v];
				} else if (v.charAt(0) === "#") {
					if (v.length === 4) { //for shorthand like #9F0
						r = v.charAt(1);
						g = v.charAt(2);
						b = v.charAt(3);
						v = "#" + r + r + g + g + b + b;
					}
					v = parseInt(v.substr(1), 16);
					a = [v >> 16, (v >> 8) & 255, v & 255];
				} else if (v.substr(0, 3) === "hsl") {
					a = wasHSL = v.match(_numExp$2);
					if (!toHSL) {
						h = (Number(a[0]) % 360) / 360;
						s = Number(a[1]) / 100;
						l = Number(a[2]) / 100;
						g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
						r = l * 2 - g;
						if (a.length > 3) {
							a[3] = Number(v[3]);
						}
						a[0] = _hue$1(h + 1 / 3, r, g);
						a[1] = _hue$1(h, r, g);
						a[2] = _hue$1(h - 1 / 3, r, g);
					} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
						return v.match(_relNumExp$1);
					}
				} else {
					a = v.match(_numExp$2) || _colorLookup$2.transparent;
				}
				a[0] = Number(a[0]);
				a[1] = Number(a[1]);
				a[2] = Number(a[2]);
				if (a.length > 3) {
					a[3] = Number(a[3]);
				}
			}
			if (toHSL && !wasHSL) {
				r = a[0] / 255;
				g = a[1] / 255;
				b = a[2] / 255;
				max = Math.max(r, g, b);
				min = Math.min(r, g, b);
				l = (max + min) / 2;
				if (max === min) {
					h = s = 0;
				} else {
					d = max - min;
					s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
					h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
					h *= 60;
				}
				a[0] = (h + 0.5) | 0;
				a[1] = (s * 100 + 0.5) | 0;
				a[2] = (l * 100 + 0.5) | 0;
			}
			return (format === "number") ? (a[0] << 16 | a[1] << 8 | a[2]) : a;
		},
		_formatColors$1 = function(s, toHSL) {
			var colors = (s + "").match(_colorExp$1) || [],
				charIndex = 0,
				parsed = "",
				i, color, temp;
			if (!colors.length) {
				return s;
			}
			for (i = 0; i < colors.length; i++) {
				color = colors[i];
				temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
				charIndex += temp.length + color.length;
				color = _parseColor$2(color, (toHSL ? "hsl" : "rgb"));
				if (color.length === 3) {
					color.push(1);
				}
				parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
			}
			return parsed + s.substr(charIndex);
		}, _colorStringFilter$1,
		TweenLite$2 = (_gsScope.GreenSockGlobals || _gsScope).TweenLite,
		_colorExp$1 = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b", //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.

		_idMatrix$1 = [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],
		_lumR$1 = 0.212671,
		_lumG$1 = 0.715160,
		_lumB$1 = 0.072169,

		_applyMatrix$1 = function(m, m2) {
			var temp = [],
				i = 0,
				z = 0,
				y, x;
			for (y = 0; y < 4; y++) {
				for (x = 0; x < 5; x++) {
					z = (x === 4) ? m[i + 4] : 0;
					temp[i + x] = m[i]   * m2[x] + m[i+1] * m2[x + 5] +	m[i+2] * m2[x + 10] + m[i+3] * m2[x + 15] +	z;
				}
				i += 5;
			}
			return temp;
		},

		_setSaturation$1 = function(m, n) {
			var inv = 1 - n,
				r = inv * _lumR$1,
				g = inv * _lumG$1,
				b = inv * _lumB$1;
			return _applyMatrix$1([r + n, g, b, 0, 0, r, g + n, b, 0, 0, r, g, b + n, 0, 0, 0, 0, 0, 1, 0], m);
		},

		_colorize$1 = function(m, color, amount) {
			var c = _parseColor$2(color),
				r = c[0] / 255,
				g = c[1] / 255,
				b = c[2] / 255,
				inv = 1 - amount;
			return _applyMatrix$1([inv + amount * r * _lumR$1, amount * r * _lumG$1, amount * r * _lumB$1, 0, 0, amount * g * _lumR$1, inv + amount * g * _lumG$1, amount * g * _lumB$1, 0, 0, amount * b * _lumR$1, amount * b * _lumG$1, inv + amount * b * _lumB$1, 0, 0, 0, 0, 0, 1, 0], m);
		},

		_setHue$1 = function(m, n) {
			n *= Math.PI / 180;
			var c = Math.cos(n),
				s = Math.sin(n);
			return _applyMatrix$1([(_lumR$1 + (c * (1 - _lumR$1))) + (s * (-_lumR$1)), (_lumG$1 + (c * (-_lumG$1))) + (s * (-_lumG$1)), (_lumB$1 + (c * (-_lumB$1))) + (s * (1 - _lumB$1)), 0, 0, (_lumR$1 + (c * (-_lumR$1))) + (s * 0.143), (_lumG$1 + (c * (1 - _lumG$1))) + (s * 0.14), (_lumB$1 + (c * (-_lumB$1))) + (s * -0.283), 0, 0, (_lumR$1 + (c * (-_lumR$1))) + (s * (-(1 - _lumR$1))), (_lumG$1 + (c * (-_lumG$1))) + (s * _lumG$1), (_lumB$1 + (c * (1 - _lumB$1))) + (s * _lumB$1), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], m);
		},

		_setContrast$1 = function(m, n) {
			return _applyMatrix$1([n,0,0,0,0.5 * (1 - n), 0,n,0,0,0.5 * (1 - n), 0,0,n,0,0.5 * (1 - n), 0,0,0,1,0], m);
		},

		_getFilter = function(t, type) {
			var filterClass = _gsScope.PIXI.filters[type],
				filters = t.filters || [],
				i = filters.length,
				filter;
			if (!filterClass) {
				throw("PixiPlugin error: " + type + " isn't present.");
			}
			while (--i > -1) {
				if (filters[i] instanceof filterClass) {
					return filters[i];
				}
			}
			filter = new filterClass();
			if (type === "BlurFilter") {
				filter.blur = 0;
			}
			filters.push(filter);
			t.filters = filters;
			return filter;
		},

		_addColorMatrixFilterCacheTween = function(p, pg, cache, vars) { //we cache the ColorMatrixFilter components in a _gsColorMatrixFilter object attached to the target object so that it's easy to grab the current value at any time.
			pg._addTween(cache, p, cache[p], vars[p], p);
			pg._overwriteProps.push(p);
		},

		_applyBrightnessToMatrix = function(brightness, matrix) {
			var temp = new _gsScope.PIXI.filters.ColorMatrixFilter();
			temp.matrix = matrix;
			temp.brightness(brightness, true);
			return temp.matrix;
		},

		_CMFdefaults = {contrast:1, saturation:1, colorizeAmount:0, colorize:"rgb(255,255,255)", hue:0, brightness:1},

		_parseColorMatrixFilter$1 = function(t, v, pg) {
			var filter = _getFilter(t, "ColorMatrixFilter"),
				cache = t._gsColorMatrixFilter = t._gsColorMatrixFilter || {contrast:1, saturation:1, colorizeAmount:0, colorize:"rgb(255,255,255)", hue:0, brightness:1},
				combine = v.combineCMF && !("colorMatrixFilter" in v && !v.colorMatrixFilter),
				i, matrix, startMatrix;
			startMatrix = filter.matrix;
			if (v.resolution) {
				filter.resolution = v.resolution;
			}
			if (v.matrix && v.matrix.length === startMatrix.length) {
				matrix = v.matrix;
				if (cache.contrast !== 1) {
					_addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
				}
				if (cache.hue) {
					_addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
				}
				if (cache.brightness !== 1) {
					_addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
				}
				if (cache.colorizeAmount) {
					_addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);
					_addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
				}
				if (cache.saturation !== 1) {
					_addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
				}

			} else {
				matrix = _idMatrix$1.slice();
				if (v.contrast != null) {
					matrix = _setContrast$1(matrix, Number(v.contrast));
					_addColorMatrixFilterCacheTween("contrast", pg, cache, v);
				} else if (cache.contrast !== 1) {
					if (combine) {
						matrix = _setContrast$1(matrix, cache.contrast);
					} else {
						_addColorMatrixFilterCacheTween("contrast", pg, cache, _CMFdefaults);
					}
				}
				if (v.hue != null) {
					matrix = _setHue$1(matrix, Number(v.hue));
					_addColorMatrixFilterCacheTween("hue", pg, cache, v);
				} else if (cache.hue) {
					if (combine) {
						matrix = _setHue$1(matrix, cache.hue);
					} else {
						_addColorMatrixFilterCacheTween("hue", pg, cache, _CMFdefaults);
					}
				}
				if (v.brightness != null) {
					matrix = _applyBrightnessToMatrix(Number(v.brightness), matrix);
					_addColorMatrixFilterCacheTween("brightness", pg, cache, v);
				} else if (cache.brightness !== 1) {
					if (combine) {
						matrix = _applyBrightnessToMatrix(cache.brightness, matrix);
					} else {
						_addColorMatrixFilterCacheTween("brightness", pg, cache, _CMFdefaults);
					}
				}
				if (v.colorize != null) {
					v.colorizeAmount = ("colorizeAmount" in v) ? Number(v.colorizeAmount) : 1;
					matrix = _colorize$1(matrix, v.colorize, v.colorizeAmount);
					_addColorMatrixFilterCacheTween("colorize", pg, cache, v);
					_addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, v);
				} else if (cache.colorizeAmount) {
					if (combine) {
						matrix = _colorize$1(matrix, cache.colorize, cache.colorizeAmount);
					} else {
						_addColorMatrixFilterCacheTween("colorize", pg, cache, _CMFdefaults);
						_addColorMatrixFilterCacheTween("colorizeAmount", pg, cache, _CMFdefaults);
					}
				}
				if (v.saturation != null) {
					matrix = _setSaturation$1(matrix, Number(v.saturation));
					_addColorMatrixFilterCacheTween("saturation", pg, cache, v);
				} else if (cache.saturation !== 1) {
					if (combine) {
						matrix = _setSaturation$1(matrix, cache.saturation);
					} else {
						_addColorMatrixFilterCacheTween("saturation", pg, cache, _CMFdefaults);
					}
				}
			}
			i = matrix.length;
			while (--i > -1) {
				if (matrix[i] !== startMatrix[i]) {
					pg._addTween(startMatrix, i, startMatrix[i], matrix[i], "colorMatrixFilter");
				}
			}
			pg._overwriteProps.push("colorMatrixFilter");
		},

		_addColorTween = function(target, p, value, colorSetter, plugin) {
			var pt = colorSetter._firstPT = {_next:colorSetter._firstPT, t:target, p:p, proxy:{}, f:(typeof(target[p]) === "function")};
			pt.proxy[p] = "rgb(" + _parseColor$2(!pt.f ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]()).join(",") + ")";
			plugin._addTween(pt.proxy, p, "get", ((typeof(value) === "number") ? "rgb(" + _parseColor$2(value, false).join(",") + ")" : value), p, null, null, _colorStringFilter$1);
		},

		//to improve performance, when a color is sensed, we hijack the setRatio() method of the plugin instance with a new function that this method spits back. This is a special method that handles parsing color values on-the-fly and turns them into numeric values which PixiJS requires. In other words, instead of "rgb(255, 0, 0)", PixiJS wants 0xFF0000. This also works with hsl() values.
		_buildColorSetter = function(tween, plugin) {
			var setRatio = plugin.setRatio, //save the original (super) setRatio() function
				func = function(v) {
					var pt = func._firstPT,
						val;
					setRatio.call(plugin, v);
					while (pt) {
						val = _parseColor$2(pt.proxy[pt.p], "number");
						if (pt.f) {
							pt.t[pt.p](val);
						} else {
							pt.t[pt.p] = val;
						}
						pt = pt._next;
					}
					if (func.graphics) { //in order for PixiJS to actually redraw GraphicsData, we've gotta increment the "dirty" and "clearDirty" values. If we don't do this, the values will be tween properly, but not rendered.
						func.graphics.dirty++;
						func.graphics.clearDirty++;
					}
				};
			plugin.setRatio = func;
			return func;
		},


		_colorProps$1 = {tint:1, lineColor:1, fillColor:1},
		_xyContexts = "position,scale,skew,pivot,anchor,tilePosition,tileScale".split(","),
		_contexts = {x:"position", y:"position", tileX:"tilePosition", tileY:"tilePosition"},
		_colorMatrixFilterProps = {colorMatrixFilter:1, saturation:1, contrast:1, hue:1, colorize:1, colorizeAmount:1, brightness:1, combineCMF:1},
		_DEG2RAD = Math.PI / 180,
        _degreesToRadians = function(value) {
			return (typeof(value) === "string" && value.charAt(1) === "=") ? value.substr(0, 2) + (parseFloat(value.substr(2)) * _DEG2RAD) : value * _DEG2RAD;
        }, i, p$2;

	//context setup...
	for (i = 0; i < _xyContexts.length; i++) {
		p$2 = _xyContexts[i];
		_contexts[p$2 + "X"] = p$2;
		_contexts[p$2 + "Y"] = p$2;
    }

    //color parsing setup...
	for (p$2 in _colorLookup$2) {
		_colorExp$1 += "|" + p$2 + "\\b";
	}
	_colorExp$1 = new RegExp(_colorExp$1+")", "gi");
	_colorStringFilter$1 = function(a) {
		var combined = a[0] + " " + a[1],
			toHSL;
		_colorExp$1.lastIndex = 0;
		if (_colorExp$1.test(combined)) {
			toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
			a[0] = _formatColors$1(a[0], toHSL);
			a[1] = _formatColors$1(a[1], toHSL);
		}
	};

	if (!TweenLite$2.defaultStringFilter) {
		TweenLite$2.defaultStringFilter = _colorStringFilter$1;
	}

    var PixiPlugin = _gsScope._gsDefine.plugin({
        propName: "pixi",
        priority: 0,
        API: 2,
		global: true,
        version: "0.2.1",

        init: function (target, values, tween, index) {
            if (!target instanceof _gsScope.PIXI.DisplayObject) {
                return false;
            }
            var context, axis, value, colorMatrix, filter, p, padding, colorSetter, i, data, pt;
            for (p in values) {
                context = _contexts[p];
                value = values[p];
                if (typeof(value) === "function") {
                    value = value(index || 0, target);
                }
                if (context) {
                    axis = (p.charAt(p.length-1).toLowerCase().indexOf("x") !== -1) ? "x" : "y";
					this._addTween(target[context], axis, target[context][axis], (context === "skew") ? _degreesToRadians(value) : value, p);
                } else if (p === "scale" || p === "anchor" || p === "pivot" || p === "tileScale") {
					this._addTween(target[p], "x", target[p].x, value, p + "X");
					this._addTween(target[p], "y", target[p].y, value, p + "Y");
                } else if (p === "rotation") { //PIXI expects rotation in radians, but as a convenience we let folks define it in degrees and we do the conversion.
					this._addTween(target, p, target.rotation, _degreesToRadians(value), p);

                } else if (_colorMatrixFilterProps[p]) {
					if (!colorMatrix) {
						_parseColorMatrixFilter$1(target, values.colorMatrixFilter || values, this);
						colorMatrix = true;
					}
                } else if (p === "blur" || p === "blurX" || p === "blurY" || p === "blurPadding") {
					filter = _getFilter(target, "BlurFilter");
					this._addTween(filter, p, filter[p], value, p);
					if (values.blurPadding !== 0) {
						padding = values.blurPadding || Math.max(filter[p], value) * 2;
						i = target.filters.length;
						while (--i > -1) {
							target.filters[i].padding = Math.max(target.filters[i].padding, padding); //if we don't expand the padding on all the filters, it can look clipped.
						}
					}
                } else if (_colorProps$1[p]) {
					if (!colorSetter) {
						colorSetter = _buildColorSetter(tween, this);
					}
					if ((p === "lineColor" || p === "fillColor") && target instanceof _gsScope.PIXI.Graphics) {
						data = target.graphicsData;
						i = data.length;
						while (--i > -1) {
							_addColorTween(data[i], p, value, colorSetter, this);
						}
						colorSetter.graphics = target;
					} else {
						_addColorTween(target, p, value, colorSetter, this);
					}
                } else if (p === "autoAlpha") {
					this._firstPT = pt = {t: {setRatio:function() { target.visible = !!target.alpha; }}, p: "setRatio", s: 0, c: 1, f: 1, pg: 0, n: "visible", pr: 0, m: 0, _next:this._firstPT};
					if (pt._next) {
						pt._next._prev = pt;
					}
					this._addTween(target, "alpha", target.alpha, value, "alpha");
					this._overwriteProps.push("alpha", "visible");
                } else {
					this._addTween(target, p, target[p], value, p);
                }
				this._overwriteProps.push(p);
            }
            return true;
        }
    });

	PixiPlugin.colorProps = _colorProps$1;
	PixiPlugin.parseColor = _parseColor$2;
	PixiPlugin.formatColors = _formatColors$1;
	PixiPlugin.colorStringFilter = _colorStringFilter$1;

/*!
 * VERSION: 1.9.2
 * DATE: 2019-02-07
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/


var _doc = (_gsScope.document || {}).documentElement,
		_window = _gsScope,
		_max = function(element, axis) {
			var dim = (axis === "x") ? "Width" : "Height",
				scroll = "scroll" + dim,
				client = "client" + dim,
				body = document.body;
			return (element === _window || element === _doc || element === body) ? Math.max(_doc[scroll], body[scroll]) - (_window["inner" + dim] || _doc[client] || body[client]) : element[scroll] - element["offset" + dim];
		},
		_unwrapElement = function(value) {
			if (typeof(value) === "string") {
				value = TweenLite.selector(value);
			}
			if (value.length && value !== _window && value[0] && value[0].style && !value.nodeType) {
				value = value[0];
			}
			return (value === _window || (value.nodeType && value.style)) ? value : null;
		},
		_buildGetter = function(e, axis) { //pass in an element and an axis ("x" or "y") and it'll return a getter function for the scroll position of that element (like scrollTop or scrollLeft, although if the element is the window, it'll use the pageXOffset/pageYOffset or the documentElement's scrollTop/scrollLeft or document.body's. Basically this streamlines things and makes a very fast getter across browsers.
			var p = "scroll" + ((axis === "x") ? "Left" : "Top");
			if (e === _window) {
				if (e.pageXOffset != null) {
					p = "page" + axis.toUpperCase() + "Offset";
				} else if (_doc[p] != null) {
					e = _doc;
				} else {
					e = document.body;
				}
			}
			return function() {
				return e[p];
			};
		},
		_getOffset = function(element, container) {
			var rect = _unwrapElement(element).getBoundingClientRect(),
				b = document.body,
				isRoot = (!container || container === _window || container === b),
				cRect = isRoot ? {top:_doc.clientTop - (window.pageYOffset || _doc.scrollTop || b.scrollTop || 0), left:_doc.clientLeft - (window.pageXOffset || _doc.scrollLeft || b.scrollLeft || 0)} : container.getBoundingClientRect(),
				offsets = {x: rect.left - cRect.left, y: rect.top - cRect.top};
			if (!isRoot && container) { //only add the current scroll position if it's not the window/body.
				offsets.x += _buildGetter(container, "x")();
				offsets.y += _buildGetter(container, "y")();
			}
			return offsets;
			/*	PREVIOUS
			var rect = _unwrapElement(element).getBoundingClientRect(),
				isRoot = (!container || container === _window || container === document.body),
				cRect = (isRoot ? _doc : container).getBoundingClientRect(),
				offsets = {x: rect.left - cRect.left, y: rect.top - cRect.top};
			if (!isRoot && container) { //only add the current scroll position if it's not the window/body.
				offsets.x += _buildGetter(container, "x")();
				offsets.y += _buildGetter(container, "y")();
			}
			return offsets;
			*/
		},
		_parseVal = function(value, target, axis, currentVal) {
			var type = typeof(value);
			return !isNaN(value) ? parseFloat(value) : (type === "string" && value.charAt(1) === "=") ? parseInt(value.charAt(0) + "1", 10) * parseFloat(value.substr(2)) + currentVal : (value === "max") ? _max(target, axis) : Math.min(_max(target, axis), _getOffset(value, target)[axis]);
		},

		ScrollToPlugin = _gsScope._gsDefine.plugin({
			propName: "scrollTo",
			API: 2,
			global: true,
			version:"1.9.2",

			//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
			init: function(target, value, tween) {
				this._wdw = (target === _window);
				this._target = target;
				this._tween = tween;
				if (typeof(value) !== "object") {
					value = {y:value}; //if we don't receive an object as the parameter, assume the user intends "y".
					if (typeof(value.y) === "string" && value.y !== "max" && value.y.charAt(1) !== "=") {
						value.x = value.y;
					}
				} else if (value.nodeType) {
					value = {y:value, x:value};
				}
				this.vars = value;
				this._autoKill = (value.autoKill !== false);
				this.getX = _buildGetter(target, "x");
				this.getY = _buildGetter(target, "y");
				this.x = this.xPrev = this.getX();
				this.y = this.yPrev = this.getY();
				if (value.x != null) {
					this._addTween(this, "x", this.x, _parseVal(value.x, target, "x", this.x) - (value.offsetX || 0), "scrollTo_x", true);
					this._overwriteProps.push("scrollTo_x");
				} else {
					this.skipX = true;
				}
				if (value.y != null) {
					this._addTween(this, "y", this.y, _parseVal(value.y, target, "y", this.y) - (value.offsetY || 0), "scrollTo_y", true);
					this._overwriteProps.push("scrollTo_y");
				} else {
					this.skipY = true;
				}
				return true;
			},

			//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
			set: function(v) {
				this._super.setRatio.call(this, v);

				var x = (this._wdw || !this.skipX) ? this.getX() : this.xPrev,
					y = (this._wdw || !this.skipY) ? this.getY() : this.yPrev,
					yDif = y - this.yPrev,
					xDif = x - this.xPrev,
					threshold = ScrollToPlugin.autoKillThreshold;

				if (this.x < 0) { //can't scroll to a position less than 0! Might happen if someone uses a Back.easeOut or Elastic.easeOut when scrolling back to the top of the page (for example)
					this.x = 0;
				}
				if (this.y < 0) {
					this.y = 0;
				}
				if (this._autoKill) {
					//note: iOS has a bug that throws off the scroll by several pixels, so we need to check if it's within 7 pixels of the previous one that we set instead of just looking for an exact match.
					if (!this.skipX && (xDif > threshold || xDif < -threshold) && x < _max(this._target, "x")) {
						this.skipX = true; //if the user scrolls separately, we should stop tweening!
					}
					if (!this.skipY && (yDif > threshold || yDif < -threshold) && y < _max(this._target, "y")) {
						this.skipY = true; //if the user scrolls separately, we should stop tweening!
					}
					if (this.skipX && this.skipY) {
						this._tween.kill();
						if (this.vars.onAutoKill) {
							this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []);
						}
					}
				}
				if (this._wdw) {
					_window.scrollTo((!this.skipX) ? this.x : x, (!this.skipY) ? this.y : y);
				} else {
					if (!this.skipY) {
						this._target.scrollTop = this.y;
					}
					if (!this.skipX) {
						this._target.scrollLeft = this.x;
					}
				}
				this.xPrev = this.x;
				this.yPrev = this.y;
			}

		}),
		p$3 = ScrollToPlugin.prototype;

	ScrollToPlugin.max = _max;
	ScrollToPlugin.getOffset = _getOffset;
	ScrollToPlugin.buildGetter = _buildGetter;
	ScrollToPlugin.autoKillThreshold = 7;

	p$3._kill = function(lookup) {
		if (lookup.scrollTo_x) {
			this.skipX = true;
		}
		if (lookup.scrollTo_y) {
			this.skipY = true;
		}
		return this._super._kill.call(this, lookup);
	};

/*!
 * VERSION: 0.6.2
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

var _getText = function(e) {
				var type = e.nodeType,
					result = "";
				if (type === 1 || type === 9 || type === 11) {
					if (typeof(e.textContent) === "string") {
						return e.textContent;
					} else {
						for ( e = e.firstChild; e; e = e.nextSibling ) {
							result += _getText(e);
						}
					}
				} else if (type === 3 || type === 4) {
					return e.nodeValue;
				}
				return result;
			},
			_emoji = "[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D]|[\uD800-\uDBFF][\uDC00-\uDFFF]",
			_emojiExp = new RegExp(_emoji),
			_emojiAndCharsExp = new RegExp(_emoji + "|.", "g"),
			_emojiSafeSplit = function(text, delimiter) {
				return ((delimiter === "" || !delimiter) && _emojiExp.test(text)) ? text.match(_emojiAndCharsExp) : text.split(delimiter || "");
			},
			/* //previous emoji-related splitting. New method above is faster and more concise.
			_emojiStart = 0xD800,
			_emojiEnd = 0xDBFF,
			_emojiLowStart = 0xDC00,
			_emojiRegionStart = 0x1F1E6,
			_emojiRegionEnd = 0x1F1FF,
			_emojiModStart = 0x1f3fb,
			_emojiModEnd = 0x1f3ff,
			_emojiPairCode = function(s) {
				return ((s.charCodeAt(0) - _emojiStart) << 10) + (s.charCodeAt(1) - _emojiLowStart) + 0x10000;
			},
			_emojiSafeSplit = function(text, delimiter) { //like calling String.split(delimiter) except that it keeps emoji characters together.
				if (delimiter !== "") {
					return text.split(delimiter);
				}
				var l = text.length,
					a = [],
					character, i, emojiPair1, emojiPair2, j;
				for (i = 0; i < l; i++) {
					character = text.charAt(i);
					if ((character.charCodeAt(0) >= _emojiStart && character.charCodeAt(0) <= _emojiEnd) || (text.charCodeAt(i+1) >= 0xFE00 && text.charCodeAt(i+1) <= 0xFE0F)) { //special emoji characters use 2 or 4 unicode characters that we must keep together.
						emojiPair1 = _emojiPairCode(text.substr(i, 2));
						emojiPair2 = _emojiPairCode(text.substr(i + 2, 2));
						j = ((emojiPair1 >= _emojiRegionStart && emojiPair1 <= _emojiRegionEnd && emojiPair2 >= _emojiRegionStart && emojiPair2 <= _emojiRegionEnd) || (emojiPair2 >= _emojiModStart && emojiPair2 <= _emojiModEnd)) ? 4 : 2;
						a.push(text.substr(i, j));
						i += j - 1;
					} else {
						a.push(character);
					}
				}
				return a;
			},
			*/
			TextPlugin = _gsScope._gsDefine.plugin({
				propName: "text",
				API: 2,
				version:"0.6.2",

				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween, index) {
					var i = target.nodeName.toUpperCase(),
						shrt;
					if (typeof(value) === "function") {
						value = value(index, target);
					}
					this._svg = (target.getBBox && (i === "TEXT" || i === "TSPAN"));
					if (!("innerHTML" in target) && !this._svg) {
						return false;
					}
					this._target = target;
					if (typeof(value) !== "object") {
						value = {value:value};
					}
					if (value.value === undefined) {
						this._text = this._original = [""];
						return true;
					}
					this._delimiter = value.delimiter || "";
					this._original = _emojiSafeSplit(_getText(target).replace(/\s+/g, " "), this._delimiter);
					this._text = _emojiSafeSplit(value.value.replace(/\s+/g, " "), this._delimiter);
					this._runBackwards = (tween.vars.runBackwards === true);
					if (this._runBackwards) {
						i = this._original;
						this._original = this._text;
						this._text = i;
					}
					if (typeof(value.newClass) === "string") {
						this._newClass = value.newClass;
						this._hasClass = true;
					}
					if (typeof(value.oldClass) === "string") {
						this._oldClass = value.oldClass;
						this._hasClass = true;
					}
					i = this._original.length - this._text.length;
					shrt = (i < 0) ? this._original : this._text;
					this._fillChar = value.fillChar || (value.padSpace ? "&nbsp;" : "");
					if (i < 0) {
						i = -i;
					}
					while (--i > -1) {
						shrt.push(this._fillChar);
					}
					return true;
				},

				//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
				set: function(ratio) {
					if (ratio > 1) {
						ratio = 1;
					} else if (ratio < 0) {
						ratio = 0;
					}
					if (this._runBackwards) {
						ratio = 1 - ratio;
					}
					var l = this._text.length,
						i = (ratio * l + 0.5) | 0,
						applyNew, applyOld, str;
					if (this._hasClass) {
						applyNew = (this._newClass && i !== 0);
						applyOld = (this._oldClass && i !== l);
						str = (applyNew ? "<span class='" + this._newClass + "'>" : "") + this._text.slice(0, i).join(this._delimiter) + (applyNew ? "</span>" : "") + (applyOld ? "<span class='" + this._oldClass + "'>" : "") + this._delimiter + this._original.slice(i).join(this._delimiter) + (applyOld ? "</span>" : "");
					} else {
						str = this._text.slice(0, i).join(this._delimiter) + this._delimiter + this._original.slice(i).join(this._delimiter);
					}
					if (this._svg) { //SVG text elements don't have an "innerHTML" in Microsoft browsers.
						this._target.textContent = str;
					} else {
						this._target.innerHTML = (this._fillChar === "&nbsp;" && str.indexOf("  ") !== -1) ? str.split("  ").join("&nbsp;&nbsp;") : str;
					}
				}

			}),
			p$4 = TextPlugin.prototype;

		p$4._newClass = p$4._oldClass = p$4._delimiter = "";

/*!
 * VERSION: 0.17.1
 * DATE: 2019-02-28
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Requires TweenLite and CSSPlugin version 1.17.0 or later (TweenMax contains both TweenLite and CSSPlugin). ThrowPropsPlugin is required for momentum-based continuation of movement after the mouse/touch is released (ThrowPropsPlugin is a membership benefit of Club GreenSock - http://greensock.com/club/).
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

	_gsScope._gsDefine("utils.Draggable", ["events.EventDispatcher","TweenLite","plugins.CSSPlugin"], function() {

		var _tempVarsXY = {css:{}, data:"_draggable"}, //speed optimization - we reuse the same vars object for x/y TweenLite.set() calls to minimize garbage collection tasks and improve performance.
			_tempVarsX = {css:{}, data:"_draggable"},
			_tempVarsY = {css:{}, data:"_draggable"},
			_tempVarsRotation = {css:{}},
			_globals = _gsScope._gsDefine.globals,
			_tempEvent = {}, //for populating with pageX/pageY in old versions of IE
			_emptyFunc = function() { return false; },
			_dummyElement = {style:{}, appendChild:_emptyFunc, removeChild:_emptyFunc},
			_doc = _gsScope.document || {createElement: function() {return _dummyElement;}},
			_docElement = _doc.documentElement || {},
			_createElement = function(type) {
				return _doc.createElementNS ? _doc.createElementNS("http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
			},
			_tempDiv = _createElement("div"),
			_emptyArray = [],
			_RAD2DEG = 180 / Math.PI,
			_max = 999999999999999,
			_getTime = Date.now || function() {return new Date().getTime();},
			_isOldIE = !!(!_doc.addEventListener && _doc.all),
			_placeholderDiv = _doc.createElement("div"),
			_renderQueue = [],
			_lookup = {}, //when a Draggable is created, the target gets a unique _gsDragID property that allows gets associated with the Draggable instance for quick lookups in Draggable.get(). This avoids circular references that could cause gc problems.
			_lookupCount = 0,
			_clickableTagExp = /^(?:a|input|textarea|button|select)$/i,
			_dragCount = 0, //total number of elements currently being dragged
			_prefix,
			_isMultiTouching,
			_isAndroid = (_gsScope.navigator && _gsScope.navigator.userAgent.toLowerCase().indexOf("android") !== -1), //Android handles touch events in an odd way and it's virtually impossible to "feature test" so we resort to UA sniffing
			_lastDragTime = 0,
			_temp1 = {}, // a simple object we reuse and populate (usually x/y properties) to conserve memory and improve performance.
			_windowProxy = {}, //memory/performance optimization - we reuse this object during autoScroll to store window-related bounds/offsets.
			_supportsPassive,
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				if (typeof(a) === "string") {
					a = TweenLite$3.selector(a);
				}
				if (!a || a.nodeType) { //if it's not an array, wrap it in one.
					return [a];
				}
				var b = [],
					l = a.length,
					i;
				for (i = 0; i !== l; b.push(a[i++]));
				return b;
			},
			_copy = function(obj, factor) {
				var copy = {}, p;
				if (factor) {
					for (p in obj) {
						copy[p] = obj[p] * factor;
					}
				} else {
					for (p in obj) {
						copy[p] = obj[p];
					}
				}
				return copy;
			},
			ThrowPropsPlugin,

			_renderQueueTick = function() {
				var i = _renderQueue.length;
				while (--i > -1) {
					_renderQueue[i]();
				}
			},
			_addToRenderQueue = function(func) {
				_renderQueue.push(func);
				if (_renderQueue.length === 1) {
					TweenLite$3.ticker.addEventListener("tick", _renderQueueTick, this, false, 1);
				}
			},
			_removeFromRenderQueue = function(func) {
				var i = _renderQueue.length;
				while (--i > -1) {
					if (_renderQueue[i] === func) {
						_renderQueue.splice(i, 1);
					}
				}
				TweenLite$3.to(_renderQueueTimeout, 0, {overwrite:"all", delay:15, onComplete:_renderQueueTimeout, data:"_draggable"}); //remove the "tick" listener only after the render queue is empty for 15 seconds (to improve performance). Adding/removing it constantly for every click/touch wouldn't deliver optimal speed, and we also don't want the ticker to keep calling the render method when things are idle for long periods of time (we want to improve battery life on mobile devices).
			},
			_renderQueueTimeout = function() {
				if (!_renderQueue.length) {
					TweenLite$3.ticker.removeEventListener("tick", _renderQueueTick);
				}
			},

			_extend = function(obj, defaults) {
				var p;
				for (p in defaults) {
					if (obj[p] === undefined) {
						obj[p] = defaults[p];
					}
				}
				return obj;
			},
			_getDocScrollTop = function() {
				return (window.pageYOffset != null) ? window.pageYOffset : (_doc.scrollTop != null) ? _doc.scrollTop : _docElement.scrollTop || _doc.body.scrollTop || 0;
			},
			_getDocScrollLeft = function() {
				return (window.pageXOffset != null) ? window.pageXOffset : (_doc.scrollLeft != null) ? _doc.scrollLeft : _docElement.scrollLeft || _doc.body.scrollLeft || 0;
			},
			_addScrollListener = function(e, callback) {
				_addListener(e, "scroll", callback);
				if (!_isRoot(e.parentNode)) {
					_addScrollListener(e.parentNode, callback);
				}
			},
			_removeScrollListener = function(e, callback) {
				_removeListener(e, "scroll", callback);
				if (!_isRoot(e.parentNode)) {
					_removeScrollListener(e.parentNode, callback);
				}
			},
			_isRoot = function (e) {
				return !!(!e || e === _docElement || e === _doc || e === _doc.body || e === window || !e.nodeType || !e.parentNode);
			},
			_getMaxScroll = function(element, axis) {
				var dim = (axis === "x") ? "Width" : "Height",
					scroll = "scroll" + dim,
					client = "client" + dim,
					body = _doc.body;
				return Math.max(0, _isRoot(element) ? Math.max(_docElement[scroll], body[scroll]) - (window["inner" + dim] || _docElement[client] || body[client]) : element[scroll] - element[client]);
			},
			_recordMaxScrolls = function(e) { //records _gsMaxScrollX and _gsMaxScrollY properties for the element and all ancestors up the chain so that we can cap it, otherwise dragging beyond the edges with autoScroll on can endlessly scroll.
				var isRoot = _isRoot(e),
					x = _getMaxScroll(e, "x"),
					y = _getMaxScroll(e, "y");
				if (isRoot) {
					e = _windowProxy;
				} else {
					_recordMaxScrolls(e.parentNode);
				}
				e._gsMaxScrollX = x;
				e._gsMaxScrollY = y;
				e._gsScrollX = e.scrollLeft || 0;
				e._gsScrollY = e.scrollTop || 0;
			},

			//just used for IE8 and earlier to normalize events and populate pageX/pageY
			_populateIEEvent = function(e, preventDefault) {
				e = e || window.event;
				_tempEvent.pageX = e.clientX + _doc.body.scrollLeft + _docElement.scrollLeft;
				_tempEvent.pageY = e.clientY + _doc.body.scrollTop + _docElement.scrollTop;
				if (preventDefault) {
					e.returnValue = false;
				}
				return _tempEvent;
			},

			//grabs the first element it finds (and we include the window as an element), so if it's selector text, it'll feed that value to TweenLite.selector, if it's a jQuery object or some other selector engine's result, it'll grab the first one, and same for an array. If the value doesn't contain a DOM element, it'll just return null.
			_unwrapElement = function(value) {
				if (!value) {
					return value;
				}
				if (typeof(value) === "string") {
					value = TweenLite$3.selector(value);
				}
				if (value.length && value !== window && value[0] && value[0].style && !value.nodeType) {
					value = value[0];
				}
				return (value === window || (value.nodeType && value.style)) ? value : null;
			},

			_checkPrefix = function(e, p) {
				var s = e.style,
					capped, i, a;
				if (s[p] === undefined) {
					a = ["O","Moz","ms","Ms","Webkit"];
					i = 5;
					capped = p.charAt(0).toUpperCase() + p.substr(1);
					while (--i > -1 && s[a[i]+capped] === undefined) { }
					if (i < 0) {
						return "";
					}
					_prefix = (i === 3) ? "ms" : a[i];
					p = _prefix + capped;
				}
				return p;
			},

			_setStyle = function(e, p, value) {
				var s = e.style;
				if (!s) {
					return;
				}
				if (s[p] === undefined) {
					p = _checkPrefix(e, p);
				}
				if (value == null) {
					if (s.removeProperty) {
						s.removeProperty(p.replace(/([A-Z])/g, "-$1").toLowerCase());
					} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
						s.removeAttribute(p);
					}
				} else if (s[p] !== undefined) {
					s[p] = value;
				}
			},

			_computedStyleScope = (typeof(window) !== "undefined" ? window : _doc.defaultView || {getComputedStyle:function() {}}),
			_getComputedStyle = function(e, s) {
				return _computedStyleScope.getComputedStyle((e instanceof Element) ? e : e.host || (e.parentNode || {}).host || e, s); //the "host" stuff helps to accommodate ShadowDom objects.
			},
			_horizExp = /(?:Left|Right|Width)/i,
			_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
			_convertToPixels = function(t, p, v, sfx, recurse) {
				if (sfx === "px" || !sfx) { return v; }
				if (sfx === "auto" || !v) { return 0; }
				var horiz = _horizExp.test(p),
					node = t,
					style = _tempDiv.style,
					neg = (v < 0),
					pix;
				if (neg) {
					v = -v;
				}
				if (sfx === "%" && p.indexOf("border") !== -1) {
					pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
				} else {
					style.cssText = "border:0 solid red;position:" + _getStyle(t, "position", true) + ";line-height:0;";
					if (sfx === "%" || !node.appendChild) {
						node = t.parentNode || _doc.body;
						style[(horiz ? "width" : "height")] = v + sfx;
					} else {
						style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
					}
					node.appendChild(_tempDiv);
					pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
					node.removeChild(_tempDiv);
					if (pix === 0 && !recurse) {
						pix = _convertToPixels(t, p, v, sfx, true);
					}
				}
				return neg ? -pix : pix;
			},
			_calculateOffset = function(t, p) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
				if (_getStyle(t, "position", true) !== "absolute") { return 0; }
				var dim = ((p === "left") ? "Left" : "Top"),
					v = _getStyle(t, "margin" + dim, true);
				return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), (v + "").replace(_suffixExp, "")) || 0);
			},

			_getStyle = function(element, prop, keepUnits) {
				var rv = (element._gsTransform || {})[prop],
					cs;
				if (rv || rv === 0) {
					return rv;
				} else if (element.style && element.style[prop]) { //shadow dom elements don't have "style".
					rv = element.style[prop];
				} else if ((cs = _getComputedStyle(element))) {
					rv = cs.getPropertyValue(prop.replace(/([A-Z])/g, "-$1").toLowerCase());
					rv = (rv || cs.length) ? rv : cs[prop]; //Opera behaves VERY strangely - length is usually 0 and cs[prop] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
				} else if (element.currentStyle) {
					rv = element.currentStyle[prop];
				}
				if (rv === "auto" && (prop === "top" || prop === "left")) {
					rv = _calculateOffset(element, prop);
				}
				return keepUnits ? rv : parseFloat(rv) || 0;
			},

			_dispatchEvent = function(instance, type, callbackName) {
				var vars = instance.vars,
					callback = vars[callbackName],
					listeners = instance._listeners[type];
				if (typeof(callback) === "function") {
					callback.apply(vars[callbackName + "Scope"] || vars.callbackScope || instance, vars[callbackName + "Params"] || [instance.pointerEvent]);
				}
				if (listeners) {
					instance.dispatchEvent(type);
				}
			},
			_getBounds = function(obj, context) { //accepts any of the following: a DOM element, jQuery object, selector text, or an object defining bounds as {top, left, width, height} or {minX, maxX, minY, maxY}. Returns an object with left, top, width, and height properties.
				var e = _unwrapElement(obj),
					top, left, offset;
				if (!e) {
					if (obj.left !== undefined) {
						offset = _getOffsetTransformOrigin(context); //the bounds should be relative to the origin
						return {left: obj.left - offset.x, top: obj.top - offset.y, width: obj.width, height: obj.height};
					}
					left = obj.min || obj.minX || obj.minRotation || 0;
					top = obj.min || obj.minY || 0;
					return {left:left, top:top, width:(obj.max || obj.maxX || obj.maxRotation || 0) - left, height:(obj.max || obj.maxY || 0) - top};
				}
				return _getElementBounds(e, context);
			},

			_svgBorderFactor,
			_svgBorderScales,
			_svgScrollOffset,
			_hasBorderBug,
			_hasReparentBug,//some browsers, like Chrome 49, alter the offsetTop/offsetLeft/offsetParent of elements when a non-identity transform is applied.
			_setEnvironmentVariables = function() { //some browsers factor the border into the SVG coordinate space, some don't (like Firefox). Some apply transforms to them, some don't. We feature-detect here so we know how to handle the border(s). We can't do this immediately - we must wait for the document.body to exist.
				if (!_doc.createElementNS) {
					_svgBorderFactor = 0;
					_svgBorderScales = false;
					return;
				}
				var div = _createElement("div"),
					svg = _doc.createElementNS("http://www.w3.org/2000/svg", "svg"),
					wrapper = _createElement("div"),
					style = div.style,
					parent = _doc.body || _docElement,
					isFlex = (_getStyle(parent, "display", true) === "flex"), //Firefox bug causes getScreenCTM() to return null when parent is display:flex and the element isn't rendered inside the window (like if it's below the scroll position)
					matrix, e1, point, oldValue;
				if (_doc.body && _transformProp) {
					style.position = "absolute";
					parent.appendChild(wrapper);
					wrapper.appendChild(div);
					oldValue = div.offsetParent;
					wrapper.style[_transformProp] = "rotate(1deg)";
					_hasReparentBug = (div.offsetParent === oldValue);
					wrapper.style.position = "absolute";
					style.height = "10px";
					oldValue = div.offsetTop;
					wrapper.style.border = "5px solid red";
					_hasBorderBug = (oldValue !== div.offsetTop); //some browsers, like Firefox 38, cause the offsetTop/Left to be affected by a parent's border.
					parent.removeChild(wrapper);
				}
				style = svg.style;
				svg.setAttributeNS(null, "width", "400px");
				svg.setAttributeNS(null, "height", "400px");
				svg.setAttributeNS(null, "viewBox", "0 0 400 400");
				style.display = "block";
				style.boxSizing = "border-box";
				style.border = "0px solid red";
				style.transform = "none";
				// in some browsers (like certain flavors of Android), the getScreenCTM() matrix is contaminated by the scroll position. We can run some logic here to detect that condition, but we ended up not needing this because we found another workaround using getBoundingClientRect().
				div.style.cssText = "width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;";
				parent.appendChild(div);
				div.appendChild(svg);
				point = svg.createSVGPoint().matrixTransform(svg.getScreenCTM());
				e1 = point.y;
				div.scrollTop = 100;
				point.x = point.y = 0;
				point = point.matrixTransform(svg.getScreenCTM());
				_svgScrollOffset = (e1 - point.y < 100.1) ? 0 : e1 - point.y - 150;
				div.removeChild(svg);
				parent.removeChild(div);
				// -- end _svgScrollOffset calculation.
				parent.appendChild(svg);
				if (isFlex) {
					parent.style.display = "block"; //Firefox bug causes getScreenCTM() to return null when parent is display:flex and the element isn't rendered inside the window (like if it's below the scroll position)
				}
				matrix = svg.getScreenCTM();
				e1 = matrix.e;
				style.border = "50px solid red";
				matrix = svg.getScreenCTM();
				if (e1 === 0 && matrix.e === 0 && matrix.f === 0 && matrix.a === 1) { //Opera has a bunch of bugs - it doesn't adjust the x/y of the matrix, nor does it scale when box-sizing is border-box but it does so elsewhere; to get the correct behavior we set _svgBorderScales to true.
					_svgBorderFactor = 1;
					_svgBorderScales = true;
				} else {
					_svgBorderFactor = (e1 !== matrix.e) ? 1 : 0;
					_svgBorderScales = (matrix.a !== 1);
				}
				if (isFlex) {
					parent.style.display = "flex";
				}
				parent.removeChild(svg);
			},

			_supports3D = (_checkPrefix(_tempDiv, "perspective") !== ""),

			// start matrix and point conversion methods...
			_transformOriginProp = _checkPrefix(_tempDiv, "transformOrigin").replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
			_transformProp = _checkPrefix(_tempDiv, "transform"),
			_transformPropCSS = _transformProp.replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
			_point1 = {}, //we reuse _point1 and _point2 objects inside matrix and point conversion methods to conserve memory and minimize garbage collection tasks.
			_point2 = {},
			_SVGElement = _gsScope.SVGElement,
			_isSVG = function(e) {
				return !!(_SVGElement && typeof(e.getBBox) === "function" && e.getCTM && (!e.parentNode || (e.parentNode.getBBox && e.parentNode.getCTM)));
			},
			_isIE10orBelow = (_gsScope.navigator && (((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_gsScope.navigator.userAgent) || (/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(_gsScope.navigator.userAgent)) && parseFloat( RegExp.$1 ) < 11)), //Ideally we'd avoid user agent sniffing, but there doesn't seem to be a way to feature-detect and sense a border-related bug that only affects IE10 and IE9.
			_tempTransforms = [],
			_tempElements = [],
			_getSVGOffsets = function(e) { //SVG elements don't always report offsetTop/offsetLeft/offsetParent at all (I'm looking at you, Firefox 29 and Android), so we have to do some work to manufacture those values. You can pass any SVG element and it'll spit back an object with offsetTop, offsetLeft, offsetParent, scaleX, and scaleY properties. We need the scaleX and scaleY to handle the way SVG can resize itself based on the container.
				if (!e.getBoundingClientRect || !e.parentNode || !_transformProp) {
					return {offsetTop:0, offsetLeft:0, scaleX:1, scaleY:1, offsetParent:_docElement};
				}
				if (Draggable.cacheSVGData !== false && e._dCache && e._dCache.lastUpdate === TweenLite$3.ticker.frame) { //performance optimization. Assume that if the offsets are requested again on the same tick, we can just feed back the values we already calculated (no need to keep recalculating until another tick elapses).
					return e._dCache;
				}
				var curElement = e,
					cache = _cache(e),
					eRect, parentRect, offsetParent, cs, m, i, point1, point2, borderWidth, borderHeight, width, height;
				cache.lastUpdate = TweenLite$3.ticker.frame;
				if (e.getBBox && !cache.isSVGRoot) { //if it's a nested/child SVG element, we must find the parent SVG canvas and measure the offset from there.
					curElement = e.parentNode;
					eRect = e.getBBox();
					while (curElement && (curElement.nodeName + "").toLowerCase() !== "svg") {
						curElement = curElement.parentNode;
					}
					cs = _getSVGOffsets(curElement);
					cache.offsetTop = eRect.y * cs.scaleY;
					cache.offsetLeft = eRect.x * cs.scaleX;
					cache.scaleX = cs.scaleX;
					cache.scaleY = cs.scaleY;
					cache.offsetParent = curElement || _docElement;
					return cache;
				}
				//only root SVG elements continue here...
				offsetParent = cache.offsetParent;
				if (offsetParent === _doc.body) {
					offsetParent = _docElement; //avoids problems with margins/padding on the body
				}
				//walk up the ancestors and record any non-identity transforms (and reset them to "none") until we reach the offsetParent. We must do this so that the getBoundingClientRect() is accurate for measuring the offsetTop/offsetLeft. We'll revert the values later...
				_tempElements.length = _tempTransforms.length = 0;
				while (curElement && curElement.parentNode) {
					m = _getStyle(curElement, _transformProp, true);
					if (m !== "matrix(1, 0, 0, 1, 0, 0)" && m !== "none" && m !== "translate3d(0px, 0px, 0px)") {
						_tempElements.push(curElement);
						_tempTransforms.push(curElement.style[_transformProp]);
						curElement.style[_transformProp] = "none";
					}
					curElement = curElement.parentNode;
				}
				parentRect = offsetParent.getBoundingClientRect();
				m = e.getScreenCTM();

				point2 = e.createSVGPoint();
				point1 = point2.matrixTransform(m);
				cache.scaleX = Math.sqrt(m.a * m.a + m.b * m.b);
				cache.scaleY = Math.sqrt(m.d * m.d + m.c * m.c);
				if (_svgBorderFactor === undefined) {
					_setEnvironmentVariables();
				}
				if (cache.borderBox && !_svgBorderScales && e.getAttribute("width")) { //some browsers (like Safari) don't properly scale the matrix to accommodate the border when box-sizing is border-box, so we must calculate it here...
					cs = _getComputedStyle(e) || {};
					borderWidth = (parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)) || 0;
					borderHeight = (parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth)) || 0;
					width = parseFloat(cs.width) || 0;
					height = parseFloat(cs.height) || 0;
					cache.scaleX *= (width - borderWidth) / width;
					cache.scaleY *= (height - borderHeight) / height;
				}
				if (_svgScrollOffset) { //some browsers (like Chrome for Android) have bugs in the way getScreenCTM() is reported (it doesn't factor in scroll position), so we must revert to a more expensive technique for calculating offsetTop/Left.
					eRect = e.getBoundingClientRect();
					cache.offsetLeft = eRect.left - parentRect.left;
					cache.offsetTop = eRect.top - parentRect.top;
				} else {
					cache.offsetLeft = point1.x - parentRect.left;
					cache.offsetTop = point1.y - parentRect.top;
				}
				cache.offsetParent = offsetParent;
				i = _tempElements.length;
				while (--i > -1) {
					_tempElements[i].style[_transformProp] = _tempTransforms[i];
				}
				return cache;
			},
			_getOffsetTransformOrigin = function(e, decoratee) { //returns the x/y position of the transformOrigin of the element, in its own local coordinate system (pixels), offset from the top left corner.
				decoratee = decoratee || {};
				if (!e || e === _docElement || !e.parentNode || e === window) {
					return {x:0, y:0};
				}
				var cs = _getComputedStyle(e),
					v = (_transformOriginProp && cs) ? cs.getPropertyValue(_transformOriginProp) : "50% 50%",
					a = v.split(" "),
					x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
					y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1];
				if (y === "center" || y == null) {
					y = "50%";
				}
				if (x === "center" || isNaN(parseFloat(x))) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
					x = "50%";
				}
				if (e.getBBox && _isSVG(e)) { //SVG elements must be handled in a special way because their origins are calculated from the top left.
					if (!e._gsTransform) {
						TweenLite$3.set(e, {x:"+=0", overwrite:false}); //forces creation of the _gsTransform where we store all the transform components including xOrigin and yOrigin for SVG elements, as of GSAP 1.15.0 which also takes care of calculating the origin from the upper left corner of the SVG canvas.
						if (e._gsTransform.xOrigin === undefined) {
							console.log("Draggable requires at least GSAP 1.17.0");
						}
					}
					v = e.getBBox();
					decoratee.x = (e._gsTransform.xOrigin - v.x);
					decoratee.y = (e._gsTransform.yOrigin - v.y);
				} else {
					if (e.getBBox && (x + y).indexOf("%") !== -1) { //Firefox doesn't report offsetWidth/height on <svg> elements.
						e = e.getBBox();
						e = {offsetWidth: e.width, offsetHeight: e.height};
					}
					decoratee.x = ((x.indexOf("%") !== -1) ? e.offsetWidth * parseFloat(x) / 100 : parseFloat(x));
					decoratee.y = ((y.indexOf("%") !== -1) ? e.offsetHeight * parseFloat(y) / 100 : parseFloat(y));
				}
				return decoratee;
			},
			_cache = function(e) { //computes some important values and stores them in a _dCache object attached to the element itself so that we can optimize performance
				if (Draggable.cacheSVGData !== false && e._dCache && e._dCache.lastUpdate === TweenLite$3.ticker.frame) { //performance optimization. Assume that if the offsets are requested again on the same tick, we can just feed back the values we already calculated (no need to keep recalculating until another tick elapses).
					return e._dCache;
				}
				var cache = e._dCache = e._dCache || {},
					cs = _getComputedStyle(e),
					isSVG = (e.getBBox && _isSVG(e)),
					isSVGRoot = ((e.nodeName + "").toLowerCase() === "svg"),
					curSVG;
				cache.isSVG = isSVG;
				cache.isSVGRoot = isSVGRoot;
				cache.borderBox = (cs.boxSizing === "border-box");
				cache.computedStyle = cs;
				if (isSVGRoot) { //some browsers don't report parentNode on SVG elements.
					curSVG = e.parentNode || _docElement;
					curSVG.insertBefore(_tempDiv, e);
					cache.offsetParent = _tempDiv.offsetParent || _docElement; //in some cases, Firefox still reports offsetParent as null.
					curSVG.removeChild(_tempDiv);
				} else if (isSVG) {
					curSVG = e.parentNode;
					while (curSVG && (curSVG.nodeName + "").toLowerCase() !== "svg") { //offsetParent is always the SVG canvas for SVG elements.
						curSVG = curSVG.parentNode;
					}
					cache.offsetParent = curSVG;
				} else {
					cache.offsetParent = e.offsetParent;
				}
				return cache;
			},
			_getOffset2DMatrix = function(e, offsetOrigin, parentOffsetOrigin, zeroOrigin, isBase) {  //"isBase" helps us discern context - it should only be true when the element is the base one (the one at which we're starting to walk up the chain). It only matters in cases when it's an <svg> element itself because that's a case when we don't apply scaling.
				if (e === window || !e || !e.style || !e.parentNode) {
					return [1,0,0,1,0,0];
				}
				var cache = e._dCache || _cache(e),
					parent = e.parentNode,
					parentCache = parent._dCache || _cache(parent),
					cs = cache.computedStyle,
					parentOffsetParent = cache.isSVG ? parentCache.offsetParent : parent.offsetParent,
					m, isRoot, offsets, rect, t, sx, sy, offsetX, offsetY, parentRect, borderTop, borderLeft, borderTranslateX, borderTranslateY;
				m = (cache.isSVG && (e.style[_transformProp] + "").indexOf("matrix") !== -1) ? e.style[_transformProp] : cs ? cs.getPropertyValue(_transformPropCSS) : e.currentStyle ? e.currentStyle[_transformProp] : "1,0,0,1,0,0"; //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
				if (e.getBBox && (e.getAttribute("transform") + "").indexOf("matrix") !== -1) { //SVG can store transform data in its "transform" attribute instead of the CSS, so look for that here (only accept matrix()).
					m = e.getAttribute("transform");
				}
				m = (m + "").match(/(?:\-|\.|\b)(\d|\.|e\-)+/g) || [1,0,0,1,0,0];
				if (m.length > 6) {
					m = [m[0], m[1], m[4], m[5], m[12], m[13]];
				}
				if (zeroOrigin) {
					m[4] = m[5] = 0;
				} else if (cache.isSVG && (t = e._gsTransform) && (t.xOrigin || t.yOrigin)) {
					//SVGs handle origin very differently. Factor in GSAP's handling of origin values here:
					m[0] = parseFloat(m[0]);
					m[1] = parseFloat(m[1]);
					m[2] = parseFloat(m[2]);
					m[3] = parseFloat(m[3]);
					m[4] = parseFloat(m[4]) - (t.xOrigin - (t.xOrigin * m[0] + t.yOrigin * m[2]));
					m[5] = parseFloat(m[5]) - (t.yOrigin - (t.xOrigin * m[1] + t.yOrigin * m[3]));
				}
				if (offsetOrigin) {
					if (_svgBorderFactor === undefined) {
						_setEnvironmentVariables();
					}
					offsets = (cache.isSVG || cache.isSVGRoot) ? _getSVGOffsets(e) : e;
					if (cache.isSVG) { //don't just rely on "instanceof _SVGElement" because if the SVG is embedded via an object tag, it won't work (SVGElement is mapped to a different object))
						rect = e.getBBox();
						parentRect = (parentCache.isSVGRoot) ? {x:0, y:0} : parent.getBBox();
						offsets = {offsetLeft:rect.x - parentRect.x, offsetTop:rect.y - parentRect.y, offsetParent:cache.offsetParent};
					} else if (cache.isSVGRoot) {
						borderTop = parseInt(cs.borderTopWidth, 10) || 0;
						borderLeft = parseInt(cs.borderLeftWidth, 10) || 0;
						borderTranslateX = ((m[0] - _svgBorderFactor) * borderLeft + m[2] * borderTop);
						borderTranslateY = (m[1] * borderLeft + (m[3] - _svgBorderFactor) * borderTop);

						sx = offsetOrigin.x;
						sy = offsetOrigin.y;
						offsetX = (sx - (sx * m[0] + sy * m[2])); //accommodate the SVG root's transforms when the origin isn't in the top left.
						offsetY = (sy - (sx * m[1] + sy * m[3]));

						m[4] = parseFloat(m[4]) + offsetX;
						m[5] = parseFloat(m[5]) + offsetY;
						offsetOrigin.x -= offsetX;
						offsetOrigin.y -= offsetY;
						sx = offsets.scaleX;
						sy = offsets.scaleY;
						if (!isBase) { //when getting the matrix for a root <svg> element itself (NOT in the context of an SVG element that's nested inside of it like a <path>), we do NOT apply the scaling!
							offsetOrigin.x *= sx;
							offsetOrigin.y *= sy;
						}
						m[0] *= sx;
						m[1] *= sy;
						m[2] *= sx;
						m[3] *= sy;
						if (!_isIE10orBelow) {
							offsetOrigin.x += borderTranslateX;
							offsetOrigin.y += borderTranslateY;
						}
						if (parentOffsetParent === _doc.body && offsets.offsetParent === _docElement) { //to avoid issues with margin/padding on the <body>, we always set the offsetParent to _docElement in the _getSVGOffsets() function but there's a condition we check later in this function for (parentOffsetParent === offsets.offsetParent) which would fail if we don't run this logic. In other words, parentOffsetParent may be <body> and the <svg>'s offsetParent is also <body> but artificially set to _docElement to avoid margin/padding issues.
							parentOffsetParent = _docElement;
						}
					} else if (!_hasBorderBug && e.offsetParent) {
						offsetOrigin.x += parseInt(_getStyle(e.offsetParent, "borderLeftWidth"), 10) || 0;
						offsetOrigin.y += parseInt(_getStyle(e.offsetParent, "borderTopWidth"), 10) || 0;
					}
					isRoot = (parent === _docElement || parent === _doc.body);
					m[4] = Number(m[4]) + offsetOrigin.x + (offsets.offsetLeft || 0) - parentOffsetOrigin.x - (isRoot ? 0 : parent.scrollLeft || 0);
					m[5] = Number(m[5]) + offsetOrigin.y + (offsets.offsetTop || 0) - parentOffsetOrigin.y - (isRoot ? 0 : parent.scrollTop || 0);
					if (parent && _getStyle(e, "position", true) === "fixed") { //fixed position elements should factor in the scroll position of the document.
						m[4] += _getDocScrollLeft();
						m[5] += _getDocScrollTop();
						parent = parent.offsetParent;
						while (parent) {
							m[4] -= parent.offsetLeft;
							m[5] -= parent.offsetTop;
							parent = parent.offsetParent;
						}
					} else if (parent && parent !== _docElement && parentOffsetParent === offsets.offsetParent && !parentCache.isSVG && (!_hasReparentBug || _getOffset2DMatrix(parent).join("") === "100100")) {
						offsets = (parentCache.isSVGRoot) ? _getSVGOffsets(parent) : parent;
						m[4] -= offsets.offsetLeft || 0;
						m[5] -= offsets.offsetTop || 0;
						if (!_hasBorderBug && parentCache.offsetParent && !cache.isSVG && !cache.isSVGRoot) {
							m[4] -= parseInt(_getStyle(parentCache.offsetParent, "borderLeftWidth"), 10) || 0;
							m[5] -= parseInt(_getStyle(parentCache.offsetParent, "borderTopWidth"), 10) || 0;
						}
					}
				}
				return m;
			},
			_getConcatenatedMatrix = function(e, invert) {
				if (!e || e === window || !e.parentNode) {
					return [1,0,0,1,0,0];
				}
				//note: we keep reusing _point1 and _point2 in order to minimize memory usage and garbage collection chores.
				var originOffset = _getOffsetTransformOrigin(e, _point1),
					parentOriginOffset = _getOffsetTransformOrigin(e.parentNode, _point2),
					m = _getOffset2DMatrix(e, originOffset, parentOriginOffset, false, !invert),
					a, b, c, d, tx, ty, m2, determinant;
				while ((e = e.parentNode) && e.parentNode && e !== _docElement) {
					originOffset = parentOriginOffset;
					parentOriginOffset = _getOffsetTransformOrigin(e.parentNode, (originOffset === _point1) ? _point2 : _point1);
					m2 = _getOffset2DMatrix(e, originOffset, parentOriginOffset);
					a = m[0];
					b = m[1];
					c = m[2];
					d = m[3];
					tx = m[4];
					ty = m[5];
					m[0] = a * m2[0] + b * m2[2];
					m[1] = a * m2[1] + b * m2[3];
					m[2] = c * m2[0] + d * m2[2];
					m[3] = c * m2[1] + d * m2[3];
					m[4] = tx * m2[0] + ty * m2[2] + m2[4];
					m[5] = tx * m2[1] + ty * m2[3] + m2[5];
				}
				if (invert) {
					a = m[0];
					b = m[1];
					c = m[2];
					d = m[3];
					tx = m[4];
					ty = m[5];
					determinant = (a * d - b * c);
					m[0] = d / determinant;
					m[1] = -b / determinant;
					m[2] = -c / determinant;
					m[3] = a / determinant;
					m[4] = (c * ty - d * tx) / determinant;
					m[5] = -(a * ty - b * tx) / determinant;
				}
				return m;
			},
			_localToGlobal = function(e, p, fromTopLeft, decoratee) {
				e = _unwrapElement(e);
				var m = _getConcatenatedMatrix(e, false),
					x = p.x,
					y = p.y;
				if (fromTopLeft) {
					_getOffsetTransformOrigin(e, p);
					x -= p.x;
					y -= p.y;
				}
				decoratee = (decoratee === true) ? p : decoratee || {};
				decoratee.x = x * m[0] + y * m[2] + m[4];
				decoratee.y = x * m[1] + y * m[3] + m[5];
				return decoratee;
			},
			_localizePoint = function(p, localToGlobal, globalToLocal) {
				var x = p.x * localToGlobal[0] + p.y * localToGlobal[2] + localToGlobal[4],
					y = p.x * localToGlobal[1] + p.y * localToGlobal[3] + localToGlobal[5];
				p.x = x * globalToLocal[0] + y * globalToLocal[2] + globalToLocal[4];
				p.y = x * globalToLocal[1] + y * globalToLocal[3] + globalToLocal[5];
				return p;
			},

			_getElementBounds = function(e, context, fromTopLeft) {
				if (!(e = _unwrapElement(e))) {
					return null;
				}
				context = _unwrapElement(context);
				var isSVG = (e.getBBox && _isSVG(e)),
					origin, left, right, top, bottom, mLocalToGlobal, mGlobalToLocal, p1, p2, p3, p4, bbox, width, height, cache, borderLeft, borderTop, viewBox, viewBoxX, viewBoxY, computedDimensions, cs;
				if (e === window) {
					top = _getDocScrollTop();
					left = _getDocScrollLeft();
					right = left + (_docElement.clientWidth || e.innerWidth || _doc.body.clientWidth || 0);
					bottom = top + (((e.innerHeight || 0) - 20 < _docElement.clientHeight) ? _docElement.clientHeight : e.innerHeight || _doc.body.clientHeight || 0); //some browsers (like Firefox) ignore absolutely positioned elements, and collapse the height of the documentElement, so it could be 8px, for example, if you have just an absolutely positioned div. In that case, we use the innerHeight to resolve this.
				} else if (context === undefined || context === window) {
					return e.getBoundingClientRect();
				} else {
					origin = _getOffsetTransformOrigin(e);
					left = -origin.x;
					top = -origin.y;
					if (isSVG) {
						bbox = e.getBBox();
						width = bbox.width;
						height = bbox.height;
					} else if ((e.nodeName + "").toLowerCase() !== "svg" && e.offsetWidth) { //Chrome dropped support for "offsetWidth" on SVG elements
						width = e.offsetWidth;
						height = e.offsetHeight;
					} else {
						computedDimensions = _getComputedStyle(e);
						width = parseFloat(computedDimensions.width);
						height = parseFloat(computedDimensions.height);
					}
					right = left + width;
					bottom = top + height;
					if (e.nodeName.toLowerCase() === "svg" && !_isOldIE) { //root SVG elements are a special beast because they have 2 types of scaling - transforms on themselves as well as the stretching of the SVG canvas itself based on the outer size and the viewBox. If, for example, the SVG's viewbox is "0 0 100 100" but the CSS is set to width:200px; height:200px, that'd make it appear at 2x scale even though the element itself has no CSS transforms but the offsetWidth/offsetHeight are based on that css, not the viewBox so we need to adjust them accordingly.
						cache = _getSVGOffsets(e);
						cs = cache.computedStyle || {};
						viewBox = (e.getAttribute("viewBox") || "0 0").split(" ");
						viewBoxX = parseFloat(viewBox[0]);
						viewBoxY = parseFloat(viewBox[1]);
						borderLeft = parseFloat(cs.borderLeftWidth) || 0;
						borderTop = parseFloat(cs.borderTopWidth) || 0;
						left /= cache.scaleX;
						top /= cache.scaleY;
						right = left + width - (width - ((width - borderLeft) / cache.scaleX) - viewBoxX);
						bottom = top + height - (height - ((height - borderTop) / cache.scaleY) - viewBoxY);
						left -= borderLeft / cache.scaleX - viewBoxX;
						top -= borderTop / cache.scaleY - viewBoxY;
						if (computedDimensions) { //when we had to use computed styles, factor in the border now.
							right += (parseFloat(cs.borderRightWidth) + borderLeft) / cache.scaleX;
							bottom += (borderTop + parseFloat(cs.borderBottomWidth)) / cache.scaleY;
						}
					}
				}
				if (e === context) {
					return {left:left, top:top, width: right - left, height: bottom - top};
				}
				mLocalToGlobal = _getConcatenatedMatrix(e);
				mGlobalToLocal = _getConcatenatedMatrix(context, true);
				p1 = _localizePoint({x:left, y:top}, mLocalToGlobal, mGlobalToLocal);
				p2 = _localizePoint({x:right, y:top}, mLocalToGlobal, mGlobalToLocal);
				p3 = _localizePoint({x:right, y:bottom}, mLocalToGlobal, mGlobalToLocal);
				p4 = _localizePoint({x:left, y:bottom}, mLocalToGlobal, mGlobalToLocal);
				left = Math.min(p1.x, p2.x, p3.x, p4.x);
				top = Math.min(p1.y, p2.y, p3.y, p4.y);
				_temp1.x = _temp1.y = 0;
				if (fromTopLeft) {
					_getOffsetTransformOrigin(context, _temp1);
				}
				return {left:left + _temp1.x, top:top + _temp1.y, width:Math.max(p1.x, p2.x, p3.x, p4.x) - left, height:Math.max(p1.y, p2.y, p3.y, p4.y) - top};
			},
			// end matrix and point conversion methods



			_isArrayLike = function(e) {
				return (e && e.length && e[0] && ((e[0].nodeType && e[0].style && !e.nodeType) || (e[0].length && e[0][0]))) ? true : false; //could be an array of jQuery objects too, so accommodate that.
			},

			_flattenArray = function(a) {
				var result = [],
					l = a.length,
					i, e, j;
				for (i = 0; i < l; i++) {
					e = a[i];
					if (_isArrayLike(e)) {
						j = e.length;
						for (j = 0; j < e.length; j++) {
							result.push(e[j]);
						}
					} else if (e && e.length !== 0) {
						result.push(e);
					}
				}
				return result;
			},

			_isTouchDevice = (typeof(window) !== "undefined" && ("ontouchstart" in _docElement) && ("orientation" in window)),
			_touchEventLookup = (function(types) { //we create an object that makes it easy to translate touch event types into their "pointer" counterparts if we're in a browser that uses those instead. Like IE10 uses "MSPointerDown" instead of "touchstart", for example.
				var standard = types.split(","),
					converted = ((_tempDiv.onpointerdown !== undefined) ? "pointerdown,pointermove,pointerup,pointercancel" : (_tempDiv.onmspointerdown !== undefined) ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","),
					obj = {},
					i = 4;
				while (--i > -1) {
					obj[standard[i]] = converted[i];
					obj[converted[i]] = standard[i];
				}
				//to avoid problems in iOS 9, test to see if the browser supports the "passive" option on addEventListener().
				try {
					_docElement.addEventListener("test", null, Object.defineProperty({}, "passive", {
						get: function () {
							_supportsPassive = 1;
						}
					}));
				} catch (e) {}
				return obj;
			}("touchstart,touchmove,touchend,touchcancel")),

			_addListener = function(element, type, func, capture) {
				if (element.addEventListener) {
					var touchType = _touchEventLookup[type];
					capture = capture || (_supportsPassive ? {passive:false} : null);
					element.addEventListener(touchType || type, func, capture);
					if (touchType && type !== touchType) { //some browsers actually support both, so must we.
						element.addEventListener(type, func, capture);
					}
				} else if (element.attachEvent) {
					element.attachEvent("on" + type, func);
				}
			},

			_removeListener = function(element, type, func) {
				if (element.removeEventListener) {
					var touchType = _touchEventLookup[type];
					element.removeEventListener(touchType || type, func);
					if (touchType && type !== touchType) {
						element.removeEventListener(type, func);
					}
				} else if (element.detachEvent) {
					element.detachEvent("on" + type, func);
				}
			},

			_hasTouchID = function(list, ID) {
				var i = list.length;
				while (--i > -1) {
					if (list[i].identifier === ID) {
						return true;
					}
				}
				return false;
			},

			_onMultiTouchDocumentEnd = function(e) {
				_isMultiTouching = (e.touches && _dragCount < e.touches.length);
				_removeListener(e.target, "touchend", _onMultiTouchDocumentEnd);
			},

			_onMultiTouchDocument = function(e) {
				_isMultiTouching = (e.touches && _dragCount < e.touches.length);
				_addListener(e.target, "touchend", _onMultiTouchDocumentEnd);
			},

			_parseThrowProps = function(draggable, snap, max, min, factor, forceZeroVelocity) {
				var vars = {},
					a, i, l;
				if (snap) {
					if (factor !== 1 && snap instanceof Array) { //some data must be altered to make sense, like if the user passes in an array of rotational values in degrees, we must convert it to radians. Or for scrollLeft and scrollTop, we invert the values.
						vars.end = a = [];
						l = snap.length;
						if (typeof(snap[0]) === "object") { //if the array is populated with objects, like points ({x:100, y:200}), make copies before multiplying by the factor, otherwise we'll mess up the originals and the user may reuse it elsewhere.
							for (i = 0; i < l; i++) {
								a[i] = _copy(snap[i], factor);
							}
						} else {
							for (i = 0; i < l; i++) {
								a[i] = snap[i] * factor;
							}
						}
						max += 1.1; //allow 1.1 pixels of wiggle room when snapping in order to work around some browser inconsistencies in the way bounds are reported which can make them roughly a pixel off. For example, if "snap:[-$('#menu').width(), 0]" was defined and #menu had a wrapper that was used as the bounds, some browsers would be one pixel off, making the minimum -752 for example when snap was [-753,0], thus instead of snapping to -753, it would snap to 0 since -753 was below the minimum.
						min -= 1.1;
					} else if (typeof(snap) === "function") {
						vars.end = function(value) {
							var result = snap.call(draggable, value),
								copy, p;
							if (factor !== 1) {
								if (typeof(result) === "object") {
									copy = {};
									for (p in result) {
										copy[p] = result[p] * factor;
									}
									result = copy;
								} else {
									result *= factor;
								}
							}
							return result; //we need to ensure that we can scope the function call to the Draggable instance itself so that users can access important values like maxX, minX, maxY, minY, x, and y from within that function.
						};
					} else {
						vars.end = snap;
					}
				}
				if (max || max === 0) {
					vars.max = max;
				}
				if (min || min === 0) {
					vars.min = min;
				}
				if (forceZeroVelocity) {
					vars.velocity = 0;
				}
				return vars;
			},

			_isClickable = function(e) { //sometimes it's convenient to mark an element as clickable by adding a data-clickable="true" attribute (in which case we won't preventDefault() the mouse/touch event). This method checks if the element is an <a>, <input>, or <button> or has an onclick or has the data-clickable or contentEditable attribute set to true (or any of its parent elements).
				var data;
				return (!e || !e.getAttribute || e.nodeName === "BODY") ? false : ((data = e.getAttribute("data-clickable")) === "true" || (data !== "false" && (e.onclick || _clickableTagExp.test(e.nodeName + "") || e.getAttribute("contentEditable") === "true"))) ? true : _isClickable(e.parentNode);
			},

			_setSelectable = function(elements, selectable) {
				var i = elements.length,
					e;
				while (--i > -1) {
					e = elements[i];
					e.ondragstart = e.onselectstart = selectable ? null : _emptyFunc;
					_setStyle(e, "userSelect", (selectable ? "text" : "none"));
				}
			},

			_addPaddingBR = (function() { //this function is in charge of analyzing browser behavior related to padding. It sets the _addPaddingBR to true if the browser doesn't normally factor in the bottom or right padding on the element inside the scrolling area, and it sets _addPaddingLeft to true if it's a browser that requires the extra offset (offsetLeft) to be added to the paddingRight (like Opera).
				var div = _doc.createElement("div"),
					child = _doc.createElement("div"),
					childStyle = child.style,
					parent = _doc.body || _tempDiv,
					val;
				childStyle.display = "inline-block";
				childStyle.position = "relative";
				div.style.cssText = child.innerHTML = "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden";
				div.appendChild(child);
				parent.appendChild(div);
				val = (child.offsetHeight + 18 > div.scrollHeight); //div.scrollHeight should be child.offsetHeight + 20 because of the 10px of padding on each side, but some browsers ignore one side. We allow a 2px margin of error.
				parent.removeChild(div);
				return val;
			}()),




			//The ScrollProxy class wraps an element's contents into another div (we call it "content") that we either add padding when necessary or apply a translate3d() transform in order to overscroll (scroll past the boundaries). This allows us to simply set the scrollTop/scrollLeft (or top/left for easier reverse-axis orientation, which is what we do in Draggable) and it'll do all the work for us. For example, if we tried setting scrollTop to -100 on a normal DOM element, it wouldn't work - it'd look the same as setting it to 0, but if we set scrollTop of a ScrollProxy to -100, it'll give the correct appearance by either setting paddingTop of the wrapper to 100 or applying a 100-pixel translateY.
			ScrollProxy = function(element, vars) {
				element = _unwrapElement(element);
				vars = vars || {};
				var content = _doc.createElement("div"),
					style = content.style,
					node = element.firstChild,
					offsetTop = 0,
					offsetLeft = 0,
					prevTop = element.scrollTop,
					prevLeft = element.scrollLeft,
					scrollWidth = element.scrollWidth,
					scrollHeight = element.scrollHeight,
					extraPadRight = 0,
					maxLeft = 0,
					maxTop = 0,
					elementWidth, elementHeight, contentHeight, nextNode, transformStart, transformEnd;

				if (_supports3D && vars.force3D !== false) {
					transformStart = "translate3d(";
					transformEnd = "px,0px)";
				} else if (_transformProp) {
					transformStart = "translate(";
					transformEnd = "px)";
				}

				this.scrollTop = function(value, force) {
					if (!arguments.length) {
						return -this.top();
					}
					this.top(-value, force);
				};

				this.scrollLeft = function(value, force) {
					if (!arguments.length) {
						return -this.left();
					}
					this.left(-value, force);
				};

				this.left = function(value, force) {
					if (!arguments.length) {
						return -(element.scrollLeft + offsetLeft);
					}
					var dif = element.scrollLeft - prevLeft,
						oldOffset = offsetLeft;
					if ((dif > 2 || dif < -2) && !force) { //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
						prevLeft = element.scrollLeft;
						TweenLite$3.killTweensOf(this, true, {left:1, scrollLeft:1});
						this.left(-prevLeft);
						if (vars.onKill) {
							vars.onKill();
						}
						return;
					}
					value = -value; //invert because scrolling works in the opposite direction
					if (value < 0) {
						offsetLeft = (value - 0.5) | 0;
						value = 0;
					} else if (value > maxLeft) {
						offsetLeft = (value - maxLeft) | 0;
						value = maxLeft;
					} else {
						offsetLeft = 0;
					}
					if (offsetLeft || oldOffset) {
						if (transformStart) {
							if (!this._suspendTransforms) {
								style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
							}
						} else {
							style.left = -offsetLeft + "px";
						}
						if (offsetLeft + extraPadRight >= 0) {
							style.paddingRight = offsetLeft + extraPadRight + "px";
						}
					}
					element.scrollLeft = value | 0;
					prevLeft = element.scrollLeft; //don't merge this with the line above because some browsers adjsut the scrollLeft after it's set, so in order to be 100% accurate in tracking it, we need to ask the browser to report it.
				};

				this.top = function(value, force) {
					if (!arguments.length) {
						return -(element.scrollTop + offsetTop);
					}
					var dif = element.scrollTop - prevTop,
						oldOffset = offsetTop;
					if ((dif > 2 || dif < -2) && !force) { //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
						prevTop = element.scrollTop;
						TweenLite$3.killTweensOf(this, true, {top:1, scrollTop:1});
						this.top(-prevTop);
						if (vars.onKill) {
							vars.onKill();
						}
						return;
					}
					value = -value; //invert because scrolling works in the opposite direction
					if (value < 0) {
						offsetTop = (value - 0.5) | 0;
						value = 0;
					} else if (value > maxTop) {
						offsetTop = (value - maxTop) | 0;
						value = maxTop;
					} else {
						offsetTop = 0;
					}
					if (offsetTop || oldOffset) {
						if (transformStart) {
							if (!this._suspendTransforms) {
								style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
							}
						} else {
							style.top = -offsetTop + "px";
						}
					}
					element.scrollTop = value | 0;
					prevTop = element.scrollTop;
				};

				this.maxScrollTop = function() {
					return maxTop;
				};

				this.maxScrollLeft = function() {
					return maxLeft;
				};

				this.disable = function() {
					node = content.firstChild;
					while (node) {
						nextNode = node.nextSibling;
						element.appendChild(node);
						node = nextNode;
					}
					if (element === content.parentNode) { //in case disable() is called when it's already disabled.
						element.removeChild(content);
					}
				};

				this.enable = function() {
					node = element.firstChild;
					if (node === content) {
						return;
					}
					while (node) {
						nextNode = node.nextSibling;
						content.appendChild(node);
						node = nextNode;
					}
					element.appendChild(content);
					this.calibrate();
				};

				this.calibrate = function(force) {
					var widthMatches = (element.clientWidth === elementWidth),
						x, y;
					prevTop = element.scrollTop;
					prevLeft = element.scrollLeft;
					if (widthMatches && element.clientHeight === elementHeight && content.offsetHeight === contentHeight && scrollWidth === element.scrollWidth && scrollHeight === element.scrollHeight && !force) {
						return; //no need to recalculate things if the width and height haven't changed.
					}
					if (offsetTop || offsetLeft) {
						x = this.left();
						y = this.top();
						this.left(-element.scrollLeft);
						this.top(-element.scrollTop);
					}
					//first, we need to remove any width constraints to see how the content naturally flows so that we can see if it's wider than the containing element. If so, we've got to record the amount of overage so that we can apply that as padding in order for browsers to correctly handle things. Then we switch back to a width of 100% (without that, some browsers don't flow the content correctly)
					if (!widthMatches || force) {
						style.display = "block";
						style.width = "auto";
						style.paddingRight = "0px";
						extraPadRight = Math.max(0, element.scrollWidth - element.clientWidth);
						//if the content is wider than the container, we need to add the paddingLeft and paddingRight in order for things to behave correctly.
						if (extraPadRight) {
							extraPadRight += _getStyle(element, "paddingLeft") + (_addPaddingBR ? _getStyle(element, "paddingRight") : 0);
						}
					}
					style.display = "inline-block";
					style.position = "relative";
					style.overflow = "visible";
					style.verticalAlign = "top";
					style.width = "100%";
					style.paddingRight = extraPadRight + "px";
					//some browsers neglect to factor in the bottom padding when calculating the scrollHeight, so we need to add that padding to the content when that happens. Allow a 2px margin for error
					if (_addPaddingBR) {
						style.paddingBottom = _getStyle(element, "paddingBottom", true);
					}
					if (_isOldIE) {
						style.zoom = "1";
					}
					elementWidth = element.clientWidth;
					elementHeight = element.clientHeight;
					scrollWidth = element.scrollWidth;
					scrollHeight = element.scrollHeight;
					maxLeft = element.scrollWidth - elementWidth;
					maxTop = element.scrollHeight - elementHeight;
					contentHeight = content.offsetHeight;
					style.display = "block";
					if (x || y) {
						this.left(x);
						this.top(y);
					}
				};

				this.content = content;
				this.element = element;
				this._suspendTransforms = false;
				this.enable();
			},





			Draggable = function(target, vars) {
				EventDispatcher.call(this, target);
				target = _unwrapElement(target); //in case the target is a selector object or selector text
				if (!ThrowPropsPlugin) {
					ThrowPropsPlugin = _globals.com.greensock.plugins.ThrowPropsPlugin;
				}
				this.vars = vars = _copy(vars || {});
				this.target = target;
				this.x = this.y = this.rotation = 0;
				this.dragResistance = parseFloat(vars.dragResistance) || 0;
				this.edgeResistance = isNaN(vars.edgeResistance) ? 1 : parseFloat(vars.edgeResistance) || 0;
				this.lockAxis = vars.lockAxis;
				this.autoScroll = vars.autoScroll || 0;
				this.lockedAxis = null;
				this.allowEventDefault = !!vars.allowEventDefault;
				var type = (vars.type || (_isOldIE ? "top,left" : "x,y")).toLowerCase(),
					xyMode = (type.indexOf("x") !== -1 || type.indexOf("y") !== -1),
					rotationMode = (type.indexOf("rotation") !== -1),
					xProp = rotationMode ? "rotation" : xyMode ? "x" : "left",
					yProp = xyMode ? "y" : "top",
					allowX = (type.indexOf("x") !== -1 || type.indexOf("left") !== -1 || type === "scroll"),
					allowY = (type.indexOf("y") !== -1 || type.indexOf("top") !== -1 || type === "scroll"),
					minimumMovement = vars.minimumMovement || 2,
					self = this,
					triggers = _slice(vars.trigger || vars.handle || target),
					killProps = {},
					dragEndTime = 0,
					checkAutoScrollBounds = false,
					autoScrollMarginTop = vars.autoScrollMarginTop || 40,
					autoScrollMarginRight = vars.autoScrollMarginRight || 40,
					autoScrollMarginBottom = vars.autoScrollMarginBottom || 40,
					autoScrollMarginLeft = vars.autoScrollMarginLeft || 40,
					isClickable = vars.clickableTest || _isClickable,
					clickTime = 0,
					enabled, scrollProxy, startPointerX, startPointerY, startElementX, startElementY, hasBounds, hasDragCallback, maxX, minX, maxY, minY, tempVars, cssVars, touch, touchID, rotationOrigin, dirty, old, snapX, snapY, snapXY, isClicking, touchEventTarget, matrix, interrupted, startScrollTop, startScrollLeft, applyObj, allowNativeTouchScrolling, touchDragAxis, isDispatching, clickDispatch, trustedClickDispatch,

					onContextMenu = function(e) { //used to prevent long-touch from triggering a context menu.
						if (self.isPressed && e.which < 2) {
							self.endDrag();
						} else {
							e.preventDefault();
							e.stopPropagation();
							return false;
						}
					},

					//this method gets called on every tick of TweenLite.ticker which allows us to synchronize the renders to the core engine (which is typically synchronized with the display refresh via requestAnimationFrame). This is an optimization - it's better than applying the values inside the "mousemove" or "touchmove" event handler which may get called many times inbetween refreshes.
					render = function(suppressEvents) {
						if (self.autoScroll && self.isDragging && (checkAutoScrollBounds || dirty)) {
							var e = target,
								autoScrollFactor = self.autoScroll * 15, //multiplying by 15 just gives us a better "feel" speed-wise.
								parent, isRoot, rect, pointerX, pointerY, changeX, changeY, gap;
							checkAutoScrollBounds = false;
							_windowProxy.scrollTop = ((window.pageYOffset != null) ? window.pageYOffset : (_docElement.scrollTop != null) ? _docElement.scrollTop : _doc.body.scrollTop);
							_windowProxy.scrollLeft = ((window.pageXOffset != null) ? window.pageXOffset : (_docElement.scrollLeft != null) ? _docElement.scrollLeft : _doc.body.scrollLeft);
							pointerX = self.pointerX - _windowProxy.scrollLeft;
							pointerY = self.pointerY - _windowProxy.scrollTop;
							while (e && !isRoot) { //walk up the chain and sense wherever the pointer is within 40px of an edge that's scrollable.
								isRoot = _isRoot(e.parentNode);
								parent = isRoot ? _windowProxy : e.parentNode;
								rect = isRoot ? {bottom:Math.max(_docElement.clientHeight, window.innerHeight || 0), right: Math.max(_docElement.clientWidth, window.innerWidth || 0), left:0, top:0} : parent.getBoundingClientRect();
								changeX = changeY = 0;
								if (allowY) {
									gap = parent._gsMaxScrollY - parent.scrollTop;
									if (gap < 0) {
										changeY = gap;
									} else if (pointerY > rect.bottom - autoScrollMarginBottom && gap) {
										checkAutoScrollBounds = true;
										changeY = Math.min(gap, (autoScrollFactor * (1 - Math.max(0, (rect.bottom - pointerY)) / autoScrollMarginBottom)) | 0);
									} else if (pointerY < rect.top + autoScrollMarginTop && parent.scrollTop) {
										checkAutoScrollBounds = true;
										changeY = -Math.min(parent.scrollTop, (autoScrollFactor * (1 - Math.max(0, (pointerY - rect.top)) / autoScrollMarginTop)) | 0);
									}
									if (changeY) {
										parent.scrollTop += changeY;
									}
								}
								if (allowX) {
									gap = parent._gsMaxScrollX - parent.scrollLeft;
									if (gap < 0) {
										changeX = gap;
									} else if (pointerX > rect.right - autoScrollMarginRight && gap) {
										checkAutoScrollBounds = true;
										changeX = Math.min(gap, (autoScrollFactor * (1 - Math.max(0, (rect.right - pointerX)) / autoScrollMarginRight)) | 0);
									} else if (pointerX < rect.left + autoScrollMarginLeft && parent.scrollLeft) {
										checkAutoScrollBounds = true;
										changeX = -Math.min(parent.scrollLeft, (autoScrollFactor * (1 - Math.max(0, (pointerX - rect.left)) / autoScrollMarginLeft)) | 0);
									}
									if (changeX) {
										parent.scrollLeft += changeX;
									}
								}

								if (isRoot && (changeX || changeY)) {
									window.scrollTo(parent.scrollLeft, parent.scrollTop);
									setPointerPosition(self.pointerX + changeX, self.pointerY + changeY);
								}
								e = parent;
							}
						}
						if (dirty) {
							var x = self.x,
								y = self.y,
								min = 0.000001;
							if (x < min && x > -min) { //browsers don't handle super small decimals well.
								x = 0;
							}
							if (y < min && y > -min) {
								y = 0;
							}
							if (rotationMode) {
								self.deltaX = x - applyObj.data.rotation;
								applyObj.data.rotation = self.rotation = x;
								applyObj.setRatio(1); //note: instead of doing TweenLite.set(), as a performance optimization we skip right to the method that renders the transforms inside CSSPlugin. For old versions of IE, though, we do a normal TweenLite.set() to leverage its ability to re-reroute to an IE-specific 2D renderer.
							} else {
								if (scrollProxy) {
									if (allowY) {
										self.deltaY = y - scrollProxy.top();
										scrollProxy.top(y);
									}
									if (allowX) {
										self.deltaX = x - scrollProxy.left();
										scrollProxy.left(x);
									}
								} else if (xyMode) {
									if (allowY) {
										self.deltaY = y - applyObj.data.y;
										applyObj.data.y = y;
									}
									if (allowX) {
										self.deltaX = x - applyObj.data.x;
										applyObj.data.x = x;
									}
									applyObj.setRatio(1); //note: instead of doing TweenLite.set(), as a performance optimization we skip right to the method that renders the transforms inside CSSPlugin. For old versions of IE, though, we do a normal TweenLite.set() to leverage its ability to re-reroute to an IE-specific 2D renderer.
								} else {
									if (allowY) {
										self.deltaY = y - parseFloat(target.style.top || 0);
										target.style.top = y + "px";
									}
									if (allowX) {
										self.deltaY = x - parseFloat(target.style.left || 0);
										target.style.left = x + "px";
									}
								}
							}
							if (hasDragCallback && !suppressEvents && !isDispatching) {
								isDispatching = true; //in case onDrag has an update() call (avoid endless loop)
								_dispatchEvent(self, "drag", "onDrag");
								isDispatching = false;
							}
						}
						dirty = false;
					},

					//copies the x/y from the element (whether that be transforms, top/left, or ScrollProxy's top/left) to the Draggable's x and y (and rotation if necessary) properties so that they reflect reality and it also (optionally) applies any snapping necessary. This is used by the ThrowPropsPlugin tween in an onUpdate to ensure things are synced and snapped.
					syncXY = function(skipOnUpdate, skipSnap) {
						var x = self.x,
							y = self.y,
							snappedValue;
						if (!target._gsTransform && (xyMode || rotationMode)) { //just in case the _gsTransform got wiped, like if the user called clearProps on the transform or something (very rare), doing an x tween forces a re-parsing of the transforms and population of the _gsTransform.
							TweenLite$3.set(target, {x:"+=0", overwrite:false, data:"_draggable"});
						}
						if (xyMode) {
							self.y = target._gsTransform.y;
							self.x = target._gsTransform.x;
						} else if (rotationMode) {
							self.x = self.rotation = target._gsTransform.rotation;
						} else if (scrollProxy) {
							self.y = scrollProxy.top();
							self.x = scrollProxy.left();
						} else {
							self.y = parseInt(target.style.top, 10) || 0;
							self.x = parseInt(target.style.left, 10) || 0;
						}
						if ((snapX || snapY || snapXY) && !skipSnap && (self.isDragging || self.isThrowing)) {
							if (snapXY) {
								_temp1.x = self.x;
								_temp1.y = self.y;
								snappedValue = snapXY(_temp1);
								if (snappedValue.x !== self.x) {
									self.x = snappedValue.x;
									dirty = true;
								}
								if (snappedValue.y !== self.y) {
									self.y = snappedValue.y;
									dirty = true;
								}
							}
							if (snapX) {
								snappedValue = snapX(self.x);
								if (snappedValue !== self.x) {
									self.x = snappedValue;
									if (rotationMode) {
										self.rotation = snappedValue;
									}
									dirty = true;
								}
							}
							if (snapY) {
								snappedValue = snapY(self.y);
								if (snappedValue !== self.y) {
									self.y = snappedValue;
								}
								dirty = true;
							}
						}
						if (dirty) {
							render(true);
						}
						if (!skipOnUpdate) {
							self.deltaX = self.x - x;
							self.deltaY = self.y - y;
							_dispatchEvent(self, "throwupdate", "onThrowUpdate");
						}
					},

					calculateBounds = function() {
						var bounds, targetBounds, snap, snapIsRaw;
						hasBounds = false;
						if (scrollProxy) {
							scrollProxy.calibrate();
							self.minX = minX = -scrollProxy.maxScrollLeft();
							self.minY = minY = -scrollProxy.maxScrollTop();
							self.maxX = maxX = self.maxY = maxY = 0;
							hasBounds = true;
						} else if (!!vars.bounds) {
							bounds = _getBounds(vars.bounds, target.parentNode); //could be a selector/jQuery object or a DOM element or a generic object like {top:0, left:100, width:1000, height:800} or {minX:100, maxX:1100, minY:0, maxY:800}
							if (rotationMode) {
								self.minX = minX = bounds.left;
								self.maxX = maxX = bounds.left + bounds.width;
								self.minY = minY = self.maxY = maxY = 0;
							} else if (vars.bounds.maxX !== undefined || vars.bounds.maxY !== undefined) {
								bounds = vars.bounds;
								self.minX = minX = bounds.minX;
								self.minY = minY = bounds.minY;
								self.maxX = maxX = bounds.maxX;
								self.maxY = maxY = bounds.maxY;
							} else {
								targetBounds = _getBounds(target, target.parentNode);
								self.minX = minX = _getStyle(target, xProp) + bounds.left - targetBounds.left;
								self.minY = minY = _getStyle(target, yProp) + bounds.top - targetBounds.top;
								self.maxX = maxX = minX + (bounds.width - targetBounds.width);
								self.maxY = maxY = minY + (bounds.height - targetBounds.height);
							}
							if (minX > maxX) {
								self.minX = maxX;
								self.maxX = maxX = minX;
								minX = self.minX;
							}
							if (minY > maxY) {
								self.minY = maxY;
								self.maxY = maxY = minY;
								minY = self.minY;
							}
							if (rotationMode) {
								self.minRotation = minX;
								self.maxRotation = maxX;
							}
							hasBounds = true;
						}
						if (vars.liveSnap) {
							snap = (vars.liveSnap === true) ? (vars.snap || {}) : vars.liveSnap;
							snapIsRaw = (snap instanceof Array || typeof(snap) === "function");
							if (rotationMode) {
								snapX = buildSnapFunc((snapIsRaw ? snap : snap.rotation), minX, maxX, 1);
								snapY = null;
							} else {
								if (snap.points) {
									snapXY = buildPointSnapFunc((snapIsRaw ? snap : snap.points), minX, maxX, minY, maxY, snap.radius, scrollProxy ? -1 : 1);
								} else {
									if (allowX) {
										snapX = buildSnapFunc((snapIsRaw ? snap : snap.x || snap.left || snap.scrollLeft), minX, maxX, scrollProxy ? -1 : 1);
									}
									if (allowY) {
										snapY = buildSnapFunc((snapIsRaw ? snap : snap.y || snap.top || snap.scrollTop), minY, maxY, scrollProxy ? -1 : 1);
									}
								}
							}
						}

					},

					onThrowComplete = function() {
						self.isThrowing = false;
						_dispatchEvent(self, "throwcomplete", "onThrowComplete");
					},
					onThrowOverwrite = function() {
						self.isThrowing = false;
					},

					animate = function(throwProps, forceZeroVelocity) {
						var snap, snapIsRaw, tween, overshootTolerance;
						if (throwProps && ThrowPropsPlugin) {
							if (throwProps === true) {
								snap = vars.snap || vars.liveSnap || {};
								snapIsRaw = (snap instanceof Array || typeof(snap) === "function");
								throwProps = {resistance:(vars.throwResistance || vars.resistance || 1000) / (rotationMode ? 10 : 1)};
								if (rotationMode) {
									throwProps.rotation = _parseThrowProps(self, snapIsRaw ? snap : snap.rotation, maxX, minX, 1, forceZeroVelocity);
								} else {
									if (allowX) {
										throwProps[xProp] = _parseThrowProps(self, snapIsRaw ? snap : snap.points || snap.x || snap.left || snap.scrollLeft, maxX, minX, scrollProxy ? -1 : 1, forceZeroVelocity || (self.lockedAxis === "x"));
									}
									if (allowY) {
										throwProps[yProp] = _parseThrowProps(self, snapIsRaw ? snap : snap.points || snap.y || snap.top || snap.scrollTop, maxY, minY, scrollProxy ? -1 : 1, forceZeroVelocity || (self.lockedAxis === "y"));
									}
									if (snap.points || (snap instanceof Array && typeof(snap[0]) === "object")) {
										throwProps.linkedProps = xProp + "," + yProp;
										throwProps.radius = snap.radius; //note: we also disable liveSnapping while throwing if there's a "radius" defined, otherwise it looks weird to have the item thrown past a snapping point but live-snapping mid-tween. We do this by altering the onUpdateParams so that "skipSnap" parameter is true for syncXY.
									}
								}
							}
							self.isThrowing = true;
							overshootTolerance = (!isNaN(vars.overshootTolerance)) ? vars.overshootTolerance : (vars.edgeResistance === 1) ? 0 : (1 - self.edgeResistance) + 0.2;
							self.tween = tween = ThrowPropsPlugin.to(scrollProxy || target, {throwProps:throwProps, data:"_draggable", ease:(vars.ease || _globals.Power3.easeOut), onComplete:onThrowComplete, onOverwrite:onThrowOverwrite, onUpdate:(vars.fastMode ? _dispatchEvent : syncXY), onUpdateParams:(vars.fastMode ? [self, "onthrowupdate", "onThrowUpdate"] : (snap && snap.radius) ? [false, true] : _emptyArray)}, Math.max(vars.minDuration || 0, vars.maxDuration || 0) || 2, (!isNaN(vars.minDuration) ? vars.minDuration : (overshootTolerance === 0 || (typeof(throwProps) === "object" && throwProps.resistance > 1000)) ? 0 : 0.5), overshootTolerance);
							if (!vars.fastMode) {
								//to populate the end values, we just scrub the tween to the end, record the values, and then jump back to the beginning.
								if (scrollProxy) {
									scrollProxy._suspendTransforms = true; //Microsoft browsers have a bug that causes them to briefly render the position incorrectly (it flashes to the end state when we seek() the tween even though we jump right back to the current position, and this only seems to happen when we're affecting both top and left), so we set a _suspendTransforms flag to prevent it from actually applying the values in the ScrollProxy.
								}
								tween.render(tween.duration(), true, true);
								syncXY(true, true);
								self.endX = self.x;
								self.endY = self.y;
								if (rotationMode) {
									self.endRotation = self.x;
								}
								tween.play(0);
								syncXY(true, true);
								if (scrollProxy) {
									scrollProxy._suspendTransforms = false;
								}
							}
						} else if (hasBounds) {
							self.applyBounds();
						}
					},

					updateMatrix = function(shiftStart) {
						var start = matrix || [1,0,0,1,0,0],
							a, b, c, d, tx, ty, determinant, pointerX, pointerY;
						matrix = _getConcatenatedMatrix(target.parentNode, true);
						if (shiftStart && self.isPressed && start.join(",") !== matrix.join(",")) { //if the matrix changes WHILE the element is pressed, we must adjust the startPointerX and startPointerY accordingly, so we invert the original matrix and figure out where the pointerX and pointerY were in the global space, then apply the new matrix to get the updated coordinates.
							a = start[0];
							b = start[1];
							c = start[2];
							d = start[3];
							tx = start[4];
							ty = start[5];
							determinant = (a * d - b * c);
							pointerX = startPointerX * (d / determinant) + startPointerY * (-c / determinant) + ((c * ty - d * tx) / determinant);
							pointerY = startPointerX * (-b / determinant) + startPointerY * (a / determinant) + (-(a * ty - b * tx) / determinant);
							startPointerY = pointerX * matrix[1] + pointerY * matrix[3] + matrix[5];
							startPointerX = pointerX * matrix[0] + pointerY * matrix[2] + matrix[4];
						}
						if (!matrix[1] && !matrix[2] && matrix[0] == 1 && matrix[3] == 1 && matrix[4] == 0 && matrix[5] == 0) { //if there are no transforms, we can optimize performance by not factoring in the matrix
							matrix = null;
						}

					},

					recordStartPositions = function() {
						var edgeTolerance = 1 - self.edgeResistance;
						updateMatrix(false);
						if (matrix) {
							startPointerX = self.pointerX * matrix[0] + self.pointerY * matrix[2] + matrix[4]; //translate to local coordinate system
							startPointerY = self.pointerX * matrix[1] + self.pointerY * matrix[3] + matrix[5];
						}
						if (dirty) {
							setPointerPosition(self.pointerX, self.pointerY);
							render(true);
						}
						if (scrollProxy) {
							calculateBounds();
							startElementY = scrollProxy.top();
							startElementX = scrollProxy.left();
						} else {
							//if the element is in the process of tweening, don't force snapping to occur because it could make it jump. Imagine the user throwing, then before it's done, clicking on the element in its inbetween state.
							if (isTweening()) {
								syncXY(true, true);
								calculateBounds();
							} else {
								self.applyBounds();
							}
							if (rotationMode) {
								rotationOrigin = self.rotationOrigin = _localToGlobal(target, {x:0, y:0});
								syncXY(true, true);
								startElementX = self.x; //starting rotation (x always refers to rotation in type:"rotation", measured in degrees)
								startElementY = self.y = Math.atan2(rotationOrigin.y - self.pointerY, self.pointerX - rotationOrigin.x) * _RAD2DEG;
							} else {
								startScrollTop = target.parentNode ? target.parentNode.scrollTop || 0 : 0;
								startScrollLeft = target.parentNode ? target.parentNode.scrollLeft || 0 : 0;
								startElementY = _getStyle(target, yProp); //record the starting top and left values so that we can just add the mouse's movement to them later.
								startElementX = _getStyle(target, xProp);
							}
						}
						if (hasBounds && edgeTolerance) {
							if (startElementX > maxX) {
								startElementX = maxX + (startElementX - maxX) / edgeTolerance;
							} else if (startElementX < minX) {
								startElementX = minX - (minX - startElementX) / edgeTolerance;
							}
							if (!rotationMode) {
								if (startElementY > maxY) {
									startElementY = maxY + (startElementY - maxY) / edgeTolerance;
								} else if (startElementY < minY) {
									startElementY = minY - (minY - startElementY) / edgeTolerance;
								}
							}
						}
						self.startX = startElementX;
						self.startY = startElementY;
					},

					isTweening = function() {
						return (self.tween && self.tween.isActive());
					},

					removePlaceholder = function() {
						if (_placeholderDiv.parentNode && !isTweening() && !self.isDragging) { //_placeholderDiv just props open auto-scrolling containers so they don't collapse as the user drags left/up. We remove it after dragging (and throwing, if necessary) finishes.
							_placeholderDiv.parentNode.removeChild(_placeholderDiv);
						}
					},

					buildSnapFunc = function(snap, min, max, factor) {
						if (min == null) {
							min = -_max;
						}
						if (max == null) {
							max = _max;
						}
						if (typeof(snap) === "function") {
							return function(n) {
								var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)
								return snap.call(self, (n > max ? max + (n - max) * edgeTolerance : (n < min) ? min + (n - min) * edgeTolerance : n)) * factor;
							};
						}
						if (snap instanceof Array) {
							return function(n) {
								var i = snap.length,
									closest = 0,
									absDif = _max,
									val, dif;
								while (--i > -1) {
									val = snap[i];
									dif = val - n;
									if (dif < 0) {
										dif = -dif;
									}
									if (dif < absDif && val >= min && val <= max) {
										closest = i;
										absDif = dif;
									}
								}
								return snap[closest];
							};
						}
						return isNaN(snap) ? function(n) { return n; } : function() { return snap * factor; };
					},

					buildPointSnapFunc = function(snap, minX, maxX, minY, maxY, radius, factor) {
						radius = (radius && radius < _max) ? radius * radius : _max; //so we don't have to Math.sqrt() in the functions. Performance optimization.
						if (typeof(snap) === "function") {
							return function(point) {
								var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance,
									x = point.x,
									y = point.y,
									result, dx, dy; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)
								point.x = x = (x > maxX ? maxX + (x - maxX) * edgeTolerance : (x < minX) ? minX + (x - minX) * edgeTolerance : x);
								point.y = y = (y > maxY ? maxY + (y - maxY) * edgeTolerance : (y < minY) ? minY + (y - minY) * edgeTolerance : y);
								result = snap.call(self, point);
								if (result !== point) {
									point.x = result.x;
									point.y = result.y;
								}
								if (factor !== 1) {
									point.x *= factor;
									point.y *= factor;
								}
								if (radius < _max) {
									dx = point.x - x;
									dy = point.y - y;
									if (dx * dx + dy * dy > radius) {
										point.x = x;
										point.y = y;
									}
								}
								return point;
							};
						}
						if (snap instanceof Array) {
							return function(p) {
								var i = snap.length,
									closest = 0,
									minDist = _max,
									x, y, point, dist;
								while (--i > -1) {
									point = snap[i];
									x = point.x - p.x;
									y = point.y - p.y;
									dist = x * x + y * y;
									if (dist < minDist) {
										closest = i;
										minDist = dist;
									}
								}
								return (minDist <= radius) ? snap[closest] : p;
							};
						}
						return function(n) { return n; };
					},

					//called when the mouse is pressed (or touch starts)
					onPress = function(e, force) {
						var i;
						if (!enabled || self.isPressed || !e || ((e.type === "mousedown" || e.type === "pointerdown") && !force && _getTime() - clickTime < 30 && _touchEventLookup[self.pointerEvent.type])) { //when we DON'T preventDefault() in order to accommodate touch-scrolling and the user just taps, many browsers also fire a mousedown/mouseup sequence AFTER the touchstart/touchend sequence, thus it'd result in two quick "click" events being dispatched. This line senses that condition and halts it on the subsequent mousedown.
							return;
						}
						interrupted = isTweening();
						self.pointerEvent = e;
						if (_touchEventLookup[e.type]) { //note: on iOS, BOTH touchmove and mousemove are dispatched, but the mousemove has pageY and pageX of 0 which would mess up the calculations and needlessly hurt performance.
							touchEventTarget = (e.type.indexOf("touch") !== -1) ? (e.currentTarget || e.target) : _doc; //pointer-based touches (for Microsoft browsers) don't remain locked to the original target like other browsers, so we must use the document instead. The event type would be "MSPointerDown" or "pointerdown".
							_addListener(touchEventTarget, "touchend", onRelease);
							_addListener(touchEventTarget, "touchmove", onMove);
							_addListener(touchEventTarget, "touchcancel", onRelease);
							_addListener(_doc, "touchstart", _onMultiTouchDocument);
						} else {
							touchEventTarget = null;
							_addListener(_doc, "mousemove", onMove); //attach these to the document instead of the box itself so that if the user's mouse moves too quickly (and off of the box), things still work.
						}
						touchDragAxis = null;
						_addListener(_doc, "mouseup", onRelease);
						if (e && e.target) {
							_addListener(e.target, "mouseup", onRelease); //we also have to listen directly on the element because some browsers don't bubble up the event to the _doc on elements with contentEditable="true"
						}
						isClicking = (isClickable.call(self, e.target) && vars.dragClickables === false && !force);
						if (isClicking) {
							_addListener(e.target, "change", onRelease); //in some browsers, when you mousedown on a <select> element, no mouseup gets dispatched! So we listen for a "change" event instead.
							_dispatchEvent(self, "pressInit", "onPressInit");
							_dispatchEvent(self, "press", "onPress");
							_setSelectable(triggers, true); //accommodates things like inputs and elements with contentEditable="true" (otherwise user couldn't drag to select text)
							return;
						}
						allowNativeTouchScrolling = (!touchEventTarget || allowX === allowY || self.vars.allowNativeTouchScrolling === false || (self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2))) ? false : allowX ? "y" : "x"; //note: in Chrome, right-clicking (for a context menu) fires onPress and it doesn't have the event.which set properly, so we must look for event.ctrlKey. If the user wants to allow context menus we should of course sense it here and not allow native touch scrolling.
						if (_isOldIE) {
							e = _populateIEEvent(e, true);
						} else if (!allowNativeTouchScrolling && !self.allowEventDefault) {
							e.preventDefault();
							if (e.preventManipulation) {
								e.preventManipulation();  //for some Microsoft browsers
							}
						}
						if (e.changedTouches) { //touch events store the data slightly differently
							e = touch = e.changedTouches[0];
							touchID = e.identifier;
						} else if (e.pointerId) {
							touchID = e.pointerId; //for some Microsoft browsers
						} else {
							touch = touchID = null;
						}
						_dragCount++;
						_addToRenderQueue(render); //causes the Draggable to render on each "tick" of TweenLite.ticker (performance optimization - updating values in a mousemove can cause them to happen too frequently, like multiple times between frame redraws which is wasteful, and it also prevents values from updating properly in IE8)
						startPointerY = self.pointerY = e.pageY; //record the starting x and y so that we can calculate the movement from the original in _onMouseMove
						startPointerX = self.pointerX = e.pageX;
						_dispatchEvent(self, "pressInit", "onPressInit");
						if (allowNativeTouchScrolling || self.autoScroll) {
							_recordMaxScrolls(target.parentNode);
						}
						if (target.parentNode && self.autoScroll && !scrollProxy && !rotationMode && target.parentNode._gsMaxScrollX && !_placeholderDiv.parentNode && !target.getBBox) { //add a placeholder div to prevent the parent container from collapsing when the user drags the element left.
							_placeholderDiv.style.width = target.parentNode.scrollWidth + "px";
							target.parentNode.appendChild(_placeholderDiv);
						}
						recordStartPositions();
						if (self.tween) {
							self.tween.kill();
						}
						self.isThrowing = false;
						TweenLite$3.killTweensOf(scrollProxy || target, true, killProps); //in case the user tries to drag it before the last tween is done.
						if (scrollProxy) {
							TweenLite$3.killTweensOf(target, true, {scrollTo:1}); //just in case the original target's scroll position is being tweened somewhere else.
						}
						self.tween = self.lockedAxis = null;
						if (vars.zIndexBoost || (!rotationMode && !scrollProxy && vars.zIndexBoost !== false)) {
							target.style.zIndex = Draggable.zIndex++;
						}
						self.isPressed = true;
						hasDragCallback = !!(vars.onDrag || self._listeners.drag);
						if (!rotationMode && (vars.cursor !== false || vars.activeCursor)) {
							i = triggers.length;
							while (--i > -1) {
								_setStyle(triggers[i], "cursor", vars.activeCursor || vars.cursor || "move");
							}
						}
						_dispatchEvent(self, "press", "onPress");
					},

					//called every time the mouse/touch moves
					onMove = function(e) {
						var originalEvent = e,
							touches, pointerX, pointerY, i, dx, dy;
						if (!enabled || _isMultiTouching || !self.isPressed || !e) {
							return;
						}
						self.pointerEvent = e;
						touches = e.changedTouches;
						if (touches) { //touch events store the data slightly differently
							e = touches[0];
							if (e !== touch && e.identifier !== touchID) { //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
								i = touches.length;
								while (--i > -1 && (e = touches[i]).identifier !== touchID) {}
								if (i < 0) {
									return;
								}
							}
						} else if (e.pointerId && touchID && e.pointerId !== touchID) { //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
							return;
						}
						if (_isOldIE) {
							e = _populateIEEvent(e, true);
						} else {
							if (touchEventTarget && allowNativeTouchScrolling && !touchDragAxis) { //Android browsers force us to decide on the first "touchmove" event if we should allow the default (scrolling) behavior or preventDefault(). Otherwise, a "touchcancel" will be fired and then no "touchmove" or "touchend" will fire during the scrolling (no good).
								pointerX = e.pageX;
								pointerY = e.pageY;
								if (matrix) {
									i = pointerX * matrix[0] + pointerY * matrix[2] + matrix[4];
									pointerY = pointerX * matrix[1] + pointerY * matrix[3] + matrix[5];
									pointerX = i;
								}
								dx = Math.abs(pointerX - startPointerX);
								dy = Math.abs(pointerY - startPointerY);
								if ((dx !== dy && (dx > minimumMovement || dy > minimumMovement)) || (_isAndroid && allowNativeTouchScrolling === touchDragAxis)) {
									touchDragAxis = (dx > dy && allowX) ? "x" : "y";
									if (self.vars.lockAxisOnTouchScroll !== false) {
										self.lockedAxis = (touchDragAxis === "x") ? "y" : "x";
										if (typeof(self.vars.onLockAxis) === "function") {
											self.vars.onLockAxis.call(self, originalEvent);
										}
									}
									if (_isAndroid && allowNativeTouchScrolling === touchDragAxis) {
										onRelease(originalEvent);
										return;
									}
								}
							}
							if (!self.allowEventDefault && (!allowNativeTouchScrolling || (touchDragAxis && allowNativeTouchScrolling !== touchDragAxis)) && originalEvent.cancelable !== false) {
								originalEvent.preventDefault();
								if (originalEvent.preventManipulation) { //for some Microsoft browsers
									originalEvent.preventManipulation();
								}
							}
						}
						if (self.autoScroll) {
							checkAutoScrollBounds = true;
						}
						setPointerPosition(e.pageX, e.pageY);
					},

					setPointerPosition = function(pointerX, pointerY) {
						var dragTolerance = 1 - self.dragResistance,
							edgeTolerance = 1 - self.edgeResistance,
							xChange, yChange, x, y, dif, temp;

						self.pointerX = pointerX;
						self.pointerY = pointerY;
						if (rotationMode) {
							y = Math.atan2(rotationOrigin.y - pointerY, pointerX - rotationOrigin.x) * _RAD2DEG;
							dif = self.y - y;
							if (dif > 180) {
								startElementY -= 360;
								self.y = y;
							} else if (dif < -180) {
								startElementY += 360;
								self.y = y;
							}
							if (self.x !== startElementX || Math.abs(startElementY - y) > minimumMovement) {
								self.y = y;
								x = startElementX + (startElementY - y) * dragTolerance;
							} else {
								x = startElementX;
							}

						} else {
							if (matrix) {
								temp = pointerX * matrix[0] + pointerY * matrix[2] + matrix[4];
								pointerY = pointerX * matrix[1] + pointerY * matrix[3] + matrix[5];
								pointerX = temp;
							}
							yChange = (pointerY - startPointerY);
							xChange = (pointerX - startPointerX);
							if (yChange < minimumMovement && yChange > -minimumMovement) {
								yChange = 0;
							}
							if (xChange < minimumMovement && xChange > -minimumMovement) {
								xChange = 0;
							}
							if ((self.lockAxis || self.lockedAxis) && (xChange || yChange)) {
								temp = self.lockedAxis;
								if (!temp) {
									self.lockedAxis = temp = (allowX && Math.abs(xChange) > Math.abs(yChange)) ? "y" : allowY ? "x" : null;
									if (temp && typeof(self.vars.onLockAxis) === "function") {
										self.vars.onLockAxis.call(self, self.pointerEvent);
									}
								}
								if (temp === "y") {
									yChange = 0;
								} else if (temp === "x") {
									xChange = 0;
								}
							}
							x = startElementX + xChange * dragTolerance;
							y = startElementY + yChange * dragTolerance;
						}

						if ((snapX || snapY || snapXY) && (self.x !== x || (self.y !== y && !rotationMode))) {
							if (snapXY) {
								_temp1.x = x;
								_temp1.y = y;
								temp = snapXY(_temp1);
								x = temp.x;
								y = temp.y;
							}
							if (snapX) {
								x = snapX(x);
							}
							if (snapY) {
								y = snapY(y);
							}
						} else if (hasBounds) {
							if (x > maxX) {
								x = maxX + (x - maxX) * edgeTolerance;
							} else if (x < minX) {
								x = minX + (x - minX) * edgeTolerance;
							}
							if (!rotationMode) {
								if (y > maxY) {
									y = maxY + (y - maxY) * edgeTolerance;
								} else if (y < minY) {
									y = minY + (y - minY) * edgeTolerance;
								}
							}
						}
						if (!rotationMode && !matrix) {
							x = Math.round(x); //helps work around an issue with some Win Touch devices
							y = Math.round(y);
						}
						if (self.x !== x || (self.y !== y && !rotationMode)) {
							if (rotationMode) {
								self.endRotation = self.x = self.endX = x;
								dirty = true;
							} else {
								if (allowY) {
									self.y = self.endY = y;
									dirty = true; //a flag that indicates we need to render the target next time the TweenLite.ticker dispatches a "tick" event (typically on a requestAnimationFrame) - this is a performance optimization (we shouldn't render on every move because sometimes many move events can get dispatched between screen refreshes, and that'd be wasteful to render every time)
								}
								if (allowX) {
									self.x = self.endX = x;
									dirty = true;
								}
							}
							if (!self.isDragging && self.isPressed) {
								self.isDragging = true;
								_dispatchEvent(self, "dragstart", "onDragStart");
							}
						}
					},

					//called when the mouse/touch is released
					onRelease = function(e, force) {
						if (!enabled || !self.isPressed || (e && touchID != null && !force && ((e.pointerId && e.pointerId !== touchID) || (e.changedTouches && !_hasTouchID(e.changedTouches, touchID))))) {  //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
							return;
						}
						self.isPressed = false;
						var originalEvent = e,
							wasDragging = self.isDragging,
							isContextMenuRelease = (self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2)),
							placeholderDelayedCall = TweenLite$3.delayedCall(0.001, removePlaceholder),
							touches, i, syntheticEvent, eventTarget, syntheticClick;
						if (touchEventTarget) {
							_removeListener(touchEventTarget, "touchend", onRelease);
							_removeListener(touchEventTarget, "touchmove", onMove);
							_removeListener(touchEventTarget, "touchcancel", onRelease);
							_removeListener(_doc, "touchstart", _onMultiTouchDocument);
						} else {
							_removeListener(_doc, "mousemove", onMove);
						}
						_removeListener(_doc, "mouseup", onRelease);
						if (e && e.target) {
							_removeListener(e.target, "mouseup", onRelease);
						}
						dirty = false;
						if (isClicking && !isContextMenuRelease) {
							if (e) {
								_removeListener(e.target, "change", onRelease);
								self.pointerEvent = originalEvent;
							}
							_setSelectable(triggers, false);
							_dispatchEvent(self, "release", "onRelease");
							_dispatchEvent(self, "click", "onClick");
							isClicking = false;
							return;
						}
						_removeFromRenderQueue(render);
						if (!rotationMode) {
							i = triggers.length;
							while (--i > -1) {
								_setStyle(triggers[i], "cursor", vars.cursor || (vars.cursor !== false ? "move" : null));
							}
						}
						if (wasDragging) {
							dragEndTime = _lastDragTime = _getTime();
							self.isDragging = false;
						}
						_dragCount--;
						if (e) {
							if (_isOldIE) {
								e = _populateIEEvent(e, false);
							}
							touches = e.changedTouches;
							if (touches) { //touch events store the data slightly differently
								e = touches[0];
								if (e !== touch && e.identifier !== touchID) { //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
									i = touches.length;
									while (--i > -1 && (e = touches[i]).identifier !== touchID) {}
									if (i < 0) {
										return;
									}
								}
							}
							self.pointerEvent = originalEvent;
							self.pointerX = e.pageX;
							self.pointerY = e.pageY;
						}
						if (isContextMenuRelease && originalEvent) {
							originalEvent.preventDefault();
							if (originalEvent.preventManipulation) {
								originalEvent.preventManipulation();  //for some Microsoft browsers
							}
							_dispatchEvent(self, "release", "onRelease");
						} else if (originalEvent && !wasDragging) {
							if (interrupted && (vars.snap || vars.bounds)) { //otherwise, if the user clicks on the object while it's animating to a snapped position, and then releases without moving 3 pixels, it will just stay there (it should animate/snap)
								animate(vars.throwProps);
							}
							_dispatchEvent(self, "release", "onRelease");
							if ((!_isAndroid || originalEvent.type !== "touchmove") && originalEvent.type.indexOf("cancel") === -1) { //to accommodate native scrolling on Android devices, we have to immediately call onRelease() on the first touchmove event, but that shouldn't trigger a "click".
								_dispatchEvent(self, "click", "onClick");
								if (_getTime() - clickTime < 300) {
									_dispatchEvent(self, "doubleclick", "onDoubleClick");
								}
								eventTarget = originalEvent.target || originalEvent.srcElement || target; //old IE uses srcElement
								clickTime = _getTime();
								syntheticClick = function () { // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
									if (clickTime !== clickDispatch && self.enabled() && !self.isPressed) {
										if (eventTarget.click) { //some browsers (like mobile Safari) don't properly trigger the click event
											eventTarget.click();
										} else if (_doc.createEvent) {
											syntheticEvent = _doc.createEvent("MouseEvents");
											syntheticEvent.initMouseEvent("click", true, true, window, 1, self.pointerEvent.screenX, self.pointerEvent.screenY, self.pointerX, self.pointerY, false, false, false, false, 0, null);
											eventTarget.dispatchEvent(syntheticEvent);
										}
									}
								};
								if (!_isAndroid && !originalEvent.defaultPrevented) { //iOS Safari requires the synthetic click to happen immediately or else it simply won't work, but Android doesn't play nice.
									TweenLite$3.delayedCall(0.00001, syntheticClick); //in addition to the iOS bug workaround, there's a Firefox issue with clicking on things like a video to play, so we must fake a click event in a slightly delayed fashion. Previously, we listened for the "click" event with "capture" false which solved the video-click-to-play issue, but it would allow the "click" event to be dispatched twice like if you were using a jQuery.click() because that was handled in the capture phase, thus we had to switch to the capture phase to avoid the double-dispatching, but do the delayed synthetic click.
								}
							}
						} else {
							animate(vars.throwProps); //will skip if throwProps isn't defined or ThrowPropsPlugin isn't loaded.
							if (!_isOldIE && !self.allowEventDefault && originalEvent && (vars.dragClickables !== false || !isClickable.call(self, originalEvent.target)) && wasDragging && (!allowNativeTouchScrolling || (touchDragAxis && allowNativeTouchScrolling === touchDragAxis)) && originalEvent.cancelable !== false) {
								originalEvent.preventDefault();
								if (originalEvent.preventManipulation) {
									originalEvent.preventManipulation();  //for some Microsoft browsers
								}
							}
							_dispatchEvent(self, "release", "onRelease");
						}
						if (isTweening()) {
							placeholderDelayedCall.duration( self.tween.duration() ); //sync the timing so that the placeholder DIV gets
						}
						if (wasDragging) {
							_dispatchEvent(self, "dragend", "onDragEnd");
						}
						return true;
					},

					updateScroll = function(e) {
						if (e && self.isDragging && !scrollProxy) {
							var parent = e.target || e.srcElement || target.parentNode,
								deltaX = parent.scrollLeft - parent._gsScrollX,
								deltaY = parent.scrollTop - parent._gsScrollY;
							if (deltaX || deltaY) {
								if (matrix) {
									startPointerX -= deltaX * matrix[0] + deltaY * matrix[2];
									startPointerY -= deltaY * matrix[3] + deltaX * matrix[1];
								} else {
									startPointerX -= deltaX;
									startPointerY -= deltaY;
								}
								parent._gsScrollX += deltaX;
								parent._gsScrollY += deltaY;
								setPointerPosition(self.pointerX, self.pointerY);
							}
						}
					},

					onClick = function(e) { //this was a huge pain in the neck to align all the various browsers and their behaviors. Chrome, Firefox, Safari, Opera, Android, and Microsoft Edge all handle events differently! Some will only trigger native behavior (like checkbox toggling) from trusted events. Others don't even support isTrusted, but require 2 events to flow through before triggering native behavior. Edge treats everything as trusted but also mandates that 2 flow through to trigger the correct native behavior.
						var time = _getTime(),
							recentlyClicked = (time - clickTime < 40),
							recentlyDragged = (time - dragEndTime < 40),
							alreadyDispatched = (recentlyClicked && clickDispatch === clickTime),
							isModern = !!e.preventDefault,
							defaultPrevented = (self.pointerEvent && self.pointerEvent.defaultPrevented),
							alreadyDispatchedTrusted = (recentlyClicked && trustedClickDispatch === clickTime),
							trusted = e.isTrusted || (e.isTrusted == null && recentlyClicked && alreadyDispatched); //note: Safari doesn't support isTrusted, and it won't properly execute native behavior (like toggling checkboxes) on the first synthetic "click" event - we must wait for the 2nd and treat it as trusted (but stop propagation at that point). Confusing, I know. Don't you love cross-browser compatibility challenges?
						if (isModern && (alreadyDispatched || (recentlyDragged && self.vars.suppressClickOnDrag !== false) )) {
							e.stopImmediatePropagation();
						}
						if (recentlyClicked && !(self.pointerEvent && self.pointerEvent.defaultPrevented) && (!alreadyDispatched || (trusted !== alreadyDispatchedTrusted))) { //let the first click pass through unhindered. Let the next one only if it's trusted, then no more (stop quick-succession ones)
							if (trusted && alreadyDispatched) {
								trustedClickDispatch = clickTime;
							}
							clickDispatch = clickTime;
							return;
						}
						if (self.isPressed || recentlyDragged || recentlyClicked) {
							if (!isModern) {
								e.returnValue = false;
							} else if (!trusted || !e.detail || !recentlyClicked || defaultPrevented) {
								e.preventDefault();
								if (e.preventManipulation) {
									e.preventManipulation();  //for some Microsoft browsers
								}
							}
						}
					},

					localizePoint = function(p) {
						return matrix ? {x:p.x * matrix[0] + p.y * matrix[2] + matrix[4], y:p.x * matrix[1] + p.y * matrix[3] + matrix[5]} : {x:p.x, y:p.y};
					};

				old = Draggable.get(this.target);
				if (old) {
					old.kill(); // avoids duplicates (an element can only be controlled by one Draggable)
				}

				//give the user access to start/stop dragging...
				this.startDrag = function(e, align) {
					var r1, r2, p1, p2;
					onPress(e || self.pointerEvent, true);
					//if the pointer isn't on top of the element, adjust things accordingly
					if (align && !self.hitTest(e || self.pointerEvent)) {
						r1 = _parseRect(e || self.pointerEvent);
						r2 = _parseRect(target);
						p1 = localizePoint({x:r1.left + r1.width / 2, y:r1.top + r1.height / 2});
						p2 = localizePoint({x:r2.left + r2.width / 2, y:r2.top + r2.height / 2});
						startPointerX -= p1.x - p2.x;
						startPointerY -= p1.y - p2.y;
					}
					if (!self.isDragging) {
						self.isDragging = true;
						_dispatchEvent(self, "dragstart", "onDragStart");
					}
				};
				this.drag = onMove;
				this.endDrag = function(e) {
					onRelease(e || self.pointerEvent, true);
				};
				this.timeSinceDrag = function() {
					return self.isDragging ? 0 : (_getTime() - dragEndTime) / 1000;
				};
				this.timeSinceClick = function() {
					return (_getTime() - clickTime) / 1000;
				};
				this.hitTest = function(target, threshold) {
					return Draggable.hitTest(self.target, target, threshold);
				};

				this.getDirection = function(from, diagonalThreshold) { //from can be "start" (default), "velocity", or an element
					var mode = (from === "velocity" && ThrowPropsPlugin) ? from : (typeof(from) === "object" && !rotationMode) ? "element" : "start",
						xChange, yChange, ratio, direction, r1, r2;
					if (mode === "element") {
						r1 = _parseRect(self.target);
						r2 = _parseRect(from);
					}
					xChange = (mode === "start") ? self.x - startElementX : (mode === "velocity") ? ThrowPropsPlugin.getVelocity(this.target, xProp) : (r1.left + r1.width / 2) - (r2.left + r2.width / 2);
					if (rotationMode) {
						return xChange < 0 ? "counter-clockwise" : "clockwise";
					} else {
						diagonalThreshold = diagonalThreshold || 2;
						yChange = (mode === "start") ? self.y - startElementY : (mode === "velocity") ? ThrowPropsPlugin.getVelocity(this.target, yProp) : (r1.top + r1.height / 2) - (r2.top + r2.height / 2);
						ratio = Math.abs(xChange / yChange);
						direction = (ratio < 1 / diagonalThreshold) ? "" : (xChange < 0) ? "left" : "right";
						if (ratio < diagonalThreshold) {
							if (direction !== "") {
								direction += "-";
							}
							direction += (yChange < 0) ? "up" : "down";
						}
					}
					return direction;
				};


				this.applyBounds = function(newBounds) {
					var x, y, forceZeroVelocity, e, parent, isRoot;
					if (newBounds && vars.bounds !== newBounds) {
						vars.bounds = newBounds;
						return self.update(true);
					}
					syncXY(true);
					calculateBounds();
					if (hasBounds) {
						x = self.x;
						y = self.y;
						if (x > maxX) {
							x = maxX;
						} else if (x < minX) {
							x = minX;
						}
						if (y > maxY) {
							y = maxY;
						} else if (y < minY) {
							y = minY;
						}
						if (self.x !== x || self.y !== y) {
							forceZeroVelocity = true;
							self.x = self.endX = x;
							if (rotationMode) {
								self.endRotation = x;
							} else {
								self.y = self.endY = y;
							}
							dirty = true;
							render(true);
							if (self.autoScroll && !self.isDragging) {
								_recordMaxScrolls(target.parentNode);
								e = target;
								_windowProxy.scrollTop = ((window.pageYOffset != null) ? window.pageYOffset : (_docElement.scrollTop != null) ? _docElement.scrollTop : _doc.body.scrollTop);
								_windowProxy.scrollLeft = ((window.pageXOffset != null) ? window.pageXOffset : (_docElement.scrollLeft != null) ? _docElement.scrollLeft : _doc.body.scrollLeft);
								while (e && !isRoot) { //walk up the chain and sense wherever the scrollTop/scrollLeft exceeds the maximum.
									isRoot = _isRoot(e.parentNode);
									parent = isRoot ? _windowProxy : e.parentNode;
									if (allowY && parent.scrollTop > parent._gsMaxScrollY) {
										parent.scrollTop = parent._gsMaxScrollY;
									}
									if (allowX && parent.scrollLeft > parent._gsMaxScrollX) {
										parent.scrollLeft = parent._gsMaxScrollX;
									}
									e = parent;
								}
							}
						}
						if (self.isThrowing && (forceZeroVelocity || self.endX > maxX || self.endX < minX || self.endY > maxY || self.endY < minY)) {
							animate(vars.throwProps, forceZeroVelocity);
						}
					}
					return self;
				};

				this.update = function(applyBounds, sticky, ignoreExternalChanges) {
					var x = self.x,
						y = self.y;
					updateMatrix(!sticky);
					if (applyBounds) {
						self.applyBounds();
					} else {
						if (dirty && ignoreExternalChanges) {
							render(true);
						}
						syncXY(true);
					}
					if (sticky) {
						setPointerPosition(self.pointerX, self.pointerY);
						if (dirty) {
							render(true);
						}
					}
					if (self.isPressed && !sticky && ((allowX && Math.abs(x - self.x) > 0.01) || (allowY && (Math.abs(y - self.y) > 0.01 && !rotationMode)))) {
						recordStartPositions();
					}
					if (self.autoScroll) {
						_recordMaxScrolls(target.parentNode);
						checkAutoScrollBounds = self.isDragging;
						render(true);
					}
					if (self.autoScroll) { //in case reparenting occurred.
						_removeScrollListener(target, updateScroll);
						_addScrollListener(target, updateScroll);
					}
					return self;
				};

				this.enable = function(type) {
					var id, i, trigger;
					if (type !== "soft") {
						i = triggers.length;
						while (--i > -1) {
							trigger = triggers[i];
							_addListener(trigger, "mousedown", onPress);
							_addListener(trigger, "touchstart", onPress);
							_addListener(trigger, "click", onClick, true); //note: used to pass true for capture but it prevented click-to-play-video functionality in Firefox.
							if (!rotationMode && vars.cursor !== false) {
								_setStyle(trigger, "cursor", vars.cursor || "move");
							}
							_setStyle(trigger, "touchCallout", "none");
							_setStyle(trigger, "touchAction", (allowX === allowY) ? "none" : allowX ? "pan-y" : "pan-x");
							if (_isSVG(trigger)) { // a bug in chrome doesn't respect touch-action on SVG elements - it only works if we set it on the parent SVG.
								_setStyle(trigger.ownerSVGElement || trigger, "touchAction", (allowX === allowY) ? "none" : allowX ? "pan-y" : "pan-x");
							}
							if (!this.vars.allowContextMenu) {
								_addListener(trigger, "contextmenu", onContextMenu);
							}
						}
						_setSelectable(triggers, false);
					}
					_addScrollListener(target, updateScroll);
					enabled = true;
					if (ThrowPropsPlugin && type !== "soft") {
						ThrowPropsPlugin.track(scrollProxy || target, (xyMode ? "x,y" : rotationMode ? "rotation" : "top,left"));
					}
					if (scrollProxy) {
						scrollProxy.enable();
					}
					target._gsDragID = id = "d" + (_lookupCount++);
					_lookup[id] = this;
					if (scrollProxy) {
						scrollProxy.element._gsDragID = id;
					}
					TweenLite$3.set(target, {x:"+=0", overwrite:false, data:"_draggable"}); //simply ensures that there's a _gsTransform on the element.
					applyObj = {
						t:target,
						data:_isOldIE ? cssVars : target._gsTransform,
						tween:{},
						setRatio:(_isOldIE ? function() { TweenLite$3.set(target, tempVars); } : CSSPlugin._internals.setTransformRatio || CSSPlugin._internals.set3DTransformRatio)
					};
					recordStartPositions();
					self.update(true);
					return self;
				};

				this.disable = function(type) {
					var dragging = self.isDragging,
						i, trigger;
					if (!rotationMode) {
						i = triggers.length;
						while (--i > -1) {
							_setStyle(triggers[i], "cursor", null);
						}
					}
					if (type !== "soft") {
						i = triggers.length;
						while (--i > -1) {
							trigger = triggers[i];
							_setStyle(trigger, "touchCallout", null);
							_setStyle(trigger, "touchAction", null);
							_removeListener(trigger, "mousedown", onPress);
							_removeListener(trigger, "touchstart", onPress);
							_removeListener(trigger, "click", onClick);
							_removeListener(trigger, "contextmenu", onContextMenu);
						}
						_setSelectable(triggers, true);
						if (touchEventTarget) {
							_removeListener(touchEventTarget, "touchcancel", onRelease);
							_removeListener(touchEventTarget, "touchend", onRelease);
							_removeListener(touchEventTarget, "touchmove", onMove);
						}
						_removeListener(_doc, "mouseup", onRelease);
						_removeListener(_doc, "mousemove", onMove);
					}
					_removeScrollListener(target, updateScroll);
					enabled = false;
					if (ThrowPropsPlugin && type !== "soft") {
						ThrowPropsPlugin.untrack(scrollProxy || target, (xyMode ? "x,y" : rotationMode ? "rotation" : "top,left"));
					}
					if (scrollProxy) {
						scrollProxy.disable();
					}
					_removeFromRenderQueue(render);
					self.isDragging = self.isPressed = isClicking = false;
					if (dragging) {
						_dispatchEvent(self, "dragend", "onDragEnd");
					}
					return self;
				};

				this.enabled = function(value, type) {
					return arguments.length ? (value ? self.enable(type) : self.disable(type)) : enabled;
				};

				this.kill = function() {
					self.isThrowing = false;
					TweenLite$3.killTweensOf(scrollProxy || target, true, killProps);
					self.disable();
					TweenLite$3.set(triggers, {clearProps:"userSelect"});
					delete _lookup[target._gsDragID];
					return self;
				};

				if (type.indexOf("scroll") !== -1) {
					scrollProxy = this.scrollProxy = new ScrollProxy(target, _extend({onKill:function() { //ScrollProxy's onKill() gets called if/when the ScrollProxy senses that the user interacted with the scroll position manually (like using the scrollbar). IE9 doesn't fire the "mouseup" properly when users drag the scrollbar of an element, so this works around that issue.
						if (self.isPressed) {
							onRelease(null);
						}}}, vars));
					//a bug in many Android devices' stock browser causes scrollTop to get forced back to 0 after it is altered via JS, so we set overflow to "hidden" on mobile/touch devices (they hide the scroll bar anyway). That works around the bug. (This bug is discussed at https://code.google.com/p/android/issues/detail?id=19625)
					target.style.overflowY = (allowY && !_isTouchDevice) ? "auto" : "hidden";
					target.style.overflowX = (allowX && !_isTouchDevice) ? "auto" : "hidden";
					target = scrollProxy.content;
				}

				if (vars.force3D !== false) {
					TweenLite$3.set(target, {force3D:true}); //improve performance by forcing a GPU layer when possible
				}
				if (rotationMode) {
					killProps.rotation = 1;
				} else {
					if (allowX) {
						killProps[xProp] = 1;
					}
					if (allowY) {
						killProps[yProp] = 1;
					}
				}
				if (rotationMode) {
					tempVars = _tempVarsRotation;
					cssVars = tempVars.css;
					tempVars.overwrite = false;
				} else if (xyMode) {
					tempVars = (allowX && allowY) ? _tempVarsXY : allowX ? _tempVarsX : _tempVarsY;
					cssVars = tempVars.css;
					tempVars.overwrite = false;
				}

				this.enable();
			},
			p = Draggable.prototype = new EventDispatcher();

		p.constructor = Draggable;
		p.pointerX = p.pointerY = p.startX = p.startY = p.deltaX = p.deltaY = 0;
		p.isDragging = p.isPressed = false;
		Draggable.version = "0.17.1";
		Draggable.zIndex = 1000;

		_addListener(_doc, "touchcancel", function() {
			//some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document. Very strange indeed.
		});
		_addListener(_doc, "contextmenu", function(e) {
			var p;
			for (p in _lookup) {
				if (_lookup[p].isPressed) {
					_lookup[p].endDrag();
				}
			}
		});

		Draggable.create = function(targets, vars) {
			if (typeof(targets) === "string") {
				targets = TweenLite$3.selector(targets);
			}
			var a = (!targets || targets.length === 0) ? [] : _isArrayLike(targets) ? _flattenArray(targets) : [targets],
				i = a.length;
			while (--i > -1) {
				a[i] = new Draggable(a[i], vars);
			}
			return a;
		};

		Draggable.get = function(target) {
			return _lookup[(_unwrapElement(target) || {})._gsDragID];
		};

		Draggable.timeSinceDrag = function() {
			return (_getTime() - _lastDragTime) / 1000;
		};

		var _tempRect = {}, //reuse to reduce garbage collection tasks
			_oldIERect = function(e) { //IE8 doesn't support getBoundingClientRect(), so we use this as a backup.
				var top = 0,
					left = 0,
					width, height;
				e = _unwrapElement(e);
				width = e.offsetWidth;
				height = e.offsetHeight;
				while(e) {
					top += e.offsetTop;
					left += e.offsetLeft;
					e = e.offsetParent;
				}
				return {top: top, left: left, width: width, height: height};
			},
			_parseRect = function(e, undefined$1) { //accepts a DOM element, a mouse event, or a rectangle object and returns the corresponding rectangle with left, right, width, height, top, and bottom properties
				if (e === window) {
					_tempRect.left = _tempRect.top = 0;
					_tempRect.width = _tempRect.right = _docElement.clientWidth || e.innerWidth || _doc.body.clientWidth || 0;
					_tempRect.height = _tempRect.bottom = ((e.innerHeight || 0) - 20 < _docElement.clientHeight) ? _docElement.clientHeight : e.innerHeight || _doc.body.clientHeight || 0;
					return _tempRect;
				}
				var r = (e.pageX !== undefined$1) ? {left:e.pageX - _getDocScrollLeft(), top:e.pageY - _getDocScrollTop(), right:e.pageX - _getDocScrollLeft() + 1, bottom:e.pageY - _getDocScrollTop() + 1} : (!e.nodeType && e.left !== undefined$1 && e.top !== undefined$1) ? e : _isOldIE ? _oldIERect(e) : _unwrapElement(e).getBoundingClientRect();
				if (r.right === undefined$1 && r.width !== undefined$1) {
					r.right = r.left + r.width;
					r.bottom = r.top + r.height;
				} else if (r.width === undefined$1) { //some browsers don't include width and height properties. We can't just set them directly on r because some browsers throw errors, so create a new generic object.
					r = {width: r.right - r.left, height: r.bottom - r.top, right: r.right, left: r.left, bottom: r.bottom, top: r.top};
				}
				return r;
			};

		Draggable.hitTest = function(obj1, obj2, threshold) {
			if (obj1 === obj2) {
				return false;
			}
			var r1 = _parseRect(obj1),
				r2 = _parseRect(obj2),
				isOutside = (r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top),
				overlap, area, isRatio;
			if (isOutside || !threshold) {
				return !isOutside;
			}
			isRatio = ((threshold + "").indexOf("%") !== -1);
			threshold = parseFloat(threshold) || 0;
			overlap = {left:Math.max(r1.left, r2.left), top:Math.max(r1.top, r2.top)};
			overlap.width = Math.min(r1.right, r2.right) - overlap.left;
			overlap.height = Math.min(r1.bottom, r2.bottom) - overlap.top;
			if (overlap.width < 0 || overlap.height < 0) {
				return false;
			}
			if (isRatio) {
				threshold *= 0.01;
				area = overlap.width * overlap.height;
				return (area >= r1.width * r1.height * threshold || area >= r2.width * r2.height * threshold);
			}
			return (overlap.width > threshold && overlap.height > threshold);
		};

		_placeholderDiv.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;";

		return Draggable;

	}, true);

var Draggable = globals.Draggable;

/*!
 * VERSION: 2.1.2
 * DATE: 2019-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/

class YooFormRankingComponent {
    constructor() {
        this.rowsMargin = 10; // procentual margin between items
    }
    componentWillLoad() {
        this.items = [...this.values];
    }
    componentDidLoad() {
        this.prepareItems(this.readonly);
    }
    componentDidUpdate() {
        this.prepareItems(true);
    }
    prepareItems(calcBadges = false) {
        const listItems = Array.from(this.host.shadowRoot.querySelectorAll('.list-item'));
        this.rowHeight = this.calcRowHeight(listItems, this.rowsMargin);
        if (!this.readonly) {
            this.sortables = listItems.map((el, index) => this.sortable(el, index));
        }
        else {
            listItems.forEach((el, index) => this.setRowPosition(el, index, this.rowHeight));
        }
        if (calcBadges) {
            this.calcBadgesValues(listItems);
        }
    }
    calcRowHeight(elements, rowsMargin) {
        const count = elements.length;
        const totalHeight = elements.reduce((acc, el) => acc + el.offsetHeight, 0);
        return (totalHeight / count) * (100 / (100 - rowsMargin));
    }
    validate() {
        let isValid = true;
        let isCompleted = true;
        if (this.answers && this.answers.length) {
            isCompleted = this.value.length === this.answers.length;
        }
        if (this.required && !isCompleted) {
            isValid = false;
        }
        if (!this.validity || this.validity !== isValid) {
            this.validityChanged.emit(isValid);
            this.validity = isValid;
        }
        return this.validity;
    }
    updateAnswer() {
        this.value = this.items;
        setValueAndValidateInput(this.value, this);
    }
    calcBadgesValues(listItems) {
        // this is badges value fix
        // when the component is re-rendered because of this.value mutation, the badges stays with wrong value
        listItems.forEach((element, index) => {
            this.setBadgeValue(element.querySelector('.badge'), index);
        });
    }
    setBadgeValue(badgeElement, index) {
        badgeElement.textContent = (index + 1).toString();
        badgeElement.classList.add('active');
    }
    /**
     * This function apply sortable ability to element.
     * All necessary logic is encapsulated in this function
     * and can be moved into separate class and reused somewhere else.
     */
    sortable(element, index) {
        const contentElement = element.querySelector('.item-content');
        const badgeElement = element.querySelector('.badge');
        const totalItems = this.items.length;
        const rowHeight = this.rowHeight;
        const sortable = {
            dragger: null,
            element: element,
            index: index,
            setIndex: null
        };
        const animation = TweenLite$3.to(contentElement, 0.3, {
            boxShadow: 'rgba(40, 47, 54, 0.07) 0px 16px 32px 0px',
            force3D: true,
            scale: 1.1,
            paused: true
        });
        const dragStartAction = (scope) => {
            animation.play();
            scope.update();
        };
        const moveAnimation = () => {
            TweenLite$3.to(element, 0.3, { y: sortable.index * rowHeight });
        };
        const releaseAction = () => {
            animation.reverse();
            moveAnimation();
            this.updateAnswer();
        };
        const clickAction = () => {
            this.changeIndex(sortable, 0);
            this.updateAnswer();
        };
        const dragAction = (scope) => {
            // calculate the current index based on element's position
            const currentIndex = this.clamp(Math.round(scope.y / rowHeight), 0, totalItems - 1);
            if (currentIndex !== sortable.index) {
                this.changeIndex(sortable, currentIndex);
            }
        };
        const dragger = new Draggable(element, {
            onDragStart: function () { dragStartAction(this); },
            onRelease: function () { releaseAction(); },
            onDrag: function () { dragAction(this); },
            onClick: function () { clickAction(); },
            cursor: 'inherit',
            type: 'y'
        });
        sortable.dragger = dragger;
        const setIndex = (i) => {
            sortable.index = i;
            this.setBadgeValue(badgeElement, i);
            if (!dragger.isDragging) {
                moveAnimation();
            }
        };
        sortable.setIndex = setIndex;
        this.setRowPosition(element, index, rowHeight);
        return sortable;
    }
    setRowPosition(element, index, rowSize) {
        TweenLite$3.set(element, { y: index * rowSize });
    }
    changeIndex(item, to) {
        this.arrayMove(this.sortables, item.index, to);
        this.arrayMove(this.items, item.index, to);
        // re-indexing all sortables objects
        this.sortables.forEach((sortable, index) => sortable.setIndex(index));
    }
    arrayMove(array, from, to) {
        // changes an elements's position in array
        array.splice(to, 0, array.splice(from, 1)[0]);
    }
    clamp(value, a, b) {
        // clamps a value to a min/max
        return value < a ? a : (value > b ? b : value);
    }
    renderToggleIcon() {
        if (this.readonly) {
            return;
        }
        return (h("yoo-icon", { class: 'yo-ranking-toggle' }));
    }
    renderItem(value, index) {
        return (h("div", { class: "list-item" },
            h("div", { class: "item-content" },
                h("span", { class: "badge" }, this.readonly && (index + 1)),
                h("span", null, value),
                h("span", { class: "icon" }, this.renderToggleIcon()))));
    }
    renderItems(values) {
        return values.map((value, index) => this.renderItem(value, index));
    }
    hostData() {
        return {
            class: Object.assign({}, getAppContext())
        };
    }
    render() {
        const containerStyle = {
            height: (this.values.length * 2.8125) + 'rem'
        };
        return (h("div", { class: "outer-container", style: containerStyle }, this.renderItems(this.readonly ? this.value : this.items)));
    }
    static get is() { return "yoo-form-ranking"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "answers": {
            "type": "Any",
            "attr": "answers"
        },
        "host": {
            "elementRef": true
        },
        "readonly": {
            "type": Boolean,
            "attr": "readonly"
        },
        "required": {
            "type": Boolean,
            "attr": "required"
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        },
        "values": {
            "type": "Any",
            "attr": "values"
        }
    }; }
    static get events() { return [{
            "name": "validityChanged",
            "method": "validityChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "inputChanged",
            "method": "inputChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host .outer-container {\n  width: 100%; }\n\n:host .list-item {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 45px; }\n\n:host .item-content {\n  height: 100%;\n  padding: 0 1rem;\n  border-bottom: 1px solid var(--stable-30, #E6E6E6);\n  background-color: white; }\n  :host .item-content span {\n    display: inline-block;\n    max-width: calc(100vw - 120px);\n    margin-top: 0.6rem;\n    font-size: var(--font-l, 17px);\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden; }\n  :host .item-content .badge {\n    display: none; }\n  :host .item-content .icon {\n    display: block;\n    float: right;\n    color: var(--stable, #adadad); }\n  :host .item-content .badge.active {\n    display: block;\n    width: 1.25rem;\n    height: 1.25rem;\n    margin-top: 0.75rem;\n    margin-right: var(--padding-10, 0.625rem);\n    float: left;\n    border-radius: 50%;\n    background: var(--success, #04CC99);\n    color: var(--light, #ffffff);\n    font-size: var(--font-xs, 10px);\n    line-height: 1.25rem;\n    text-align: center; }\n\n:host(.boost) .item-content .badge.active {\n  background: var(--danger-light, #F46885); }"; }
}

export { YooFormRankingComponent as YooFormRanking };
