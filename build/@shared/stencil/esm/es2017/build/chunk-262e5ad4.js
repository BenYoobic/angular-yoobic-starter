import { h } from '../design-system.core.js';

import { a as createCommonjsModule, b as commonjsGlobal, c as cordova$1, d as IonicNativePlugin, e as checkAvailability, f as cordovaInstance, g as instanceAvailability, h as getPromise, i as cordovaPropertyGet, j as cordovaPropertySet, k as isCordova, l as showToast, m as translate, n as global, o as isIOS, p as isFile, q as Cloudinary, r as isSamsung, s as Device, t as clone, u as isChrome, v as isAndroid, w as filter, x as getSession, y as round, z as fromNow, A as dateFormat, B as isNumber, C as orderBy, D as getProtocol, E as isWKWebView, F as cleanupWKWebViewImagePath } from './chunk-30364fba.js';
import { a as Observable } from './chunk-c535de07.js';

var highcharts = createCommonjsModule(function (module) {
/*
 Highcharts JS v7.0.3 (2019-02-06)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(N,I){"object"==='object'&&module.exports?(I["default"]=I,module.exports=N.document?I(N):I):"function"===typeof undefined&&undefined.amd?undefined(function(){return I(N)}):N.Highcharts=I(N);})("undefined"!==typeof window?window:commonjsGlobal,function(N){var I=function(){var a="undefined"===typeof N?"undefined"!==typeof window?window:{}:N,y=a.document,F=a.navigator&&a.navigator.userAgent||"",G=y&&y.createElementNS&&!!y.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,k=/(edge|msie|trident)/i.test(F)&&
!a.opera,c=-1!==F.indexOf("Firefox"),p=-1!==F.indexOf("Chrome"),t=c&&4>parseInt(F.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",version:"7.0.3",deg2rad:2*Math.PI/360,doc:y,hasBidiBug:t,hasTouch:y&&void 0!==y.documentElement.ontouchstart,isMS:k,isWebKit:-1!==F.indexOf("AppleWebKit"),isFirefox:c,isChrome:p,isSafari:!p&&-1!==F.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(F),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},
symbolSizes:{},svg:G,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){a.timers=[];var y=a.charts,F=a.doc,G=a.win;a.error=function(k,c,p){var t=a.isNumber(k)?"Highcharts error #"+k+": www.highcharts.com/errors/"+k:k;p&&a.fireEvent(p,"displayError",{code:k});if(c)throw Error(t);G.console&&console.log(t);};a.Fx=function(a,c,p){this.options=c;this.elem=a;this.prop=p;};a.Fx.prototype={dSetter:function(){var a=this.paths[0],c=this.paths[1],
p=[],t=this.now,v=a.length,w;if(1===t)p=this.toD;else if(v===c.length&&1>t)for(;v--;)w=parseFloat(a[v]),p[v]=isNaN(w)?c[v]:t*parseFloat(c[v]-w)+w;else p=c;this.elem.attr("d",p,null,!0);},update:function(){var a=this.elem,c=this.prop,p=this.now,t=this.options.step;if(this[c+"Setter"])this[c+"Setter"]();else a.attr?a.element&&a.attr(c,p,null,!0):a.style[c]=p+this.unit;t&&t.call(a,p,this);},run:function(k,c,p){var t=this,v=t.options,w=function(a){return w.stopped?!1:t.step(a)},r=G.requestAnimationFrame||
function(a){setTimeout(a,13);},h=function(){for(var e=0;e<a.timers.length;e++)a.timers[e]()||a.timers.splice(e--,1);a.timers.length&&r(h);};k!==c||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=k,this.end=c,this.unit=p,this.now=this.start,this.pos=0,w.elem=this.elem,w.prop=this.prop,w()&&1===a.timers.push(w)&&r(h)):(delete v.curAnim[this.prop],v.complete&&0===Object.keys(v.curAnim).length&&v.complete.call(this.elem));},step:function(k){var c=+new Date,p,t=this.options,v=this.elem,
w=t.complete,r=t.duration,h=t.curAnim;v.attr&&!v.element?k=!1:k||c>=r+this.startTime?(this.now=this.end,this.pos=1,this.update(),p=h[this.prop]=!0,a.objectEach(h,function(a){!0!==a&&(p=!1);}),p&&w&&w.call(v),k=!1):(this.pos=t.easing((c-this.startTime)/r),this.now=this.start+(this.end-this.start)*this.pos,this.update(),k=!0);return k},initPath:function(k,c,p){function t(a){var d,g;for(b=a.length;b--;)d="M"===a[b]||"L"===a[b],g=/[a-zA-Z]/.test(a[b+3]),d&&g&&a.splice(b+1,0,a[b+1],a[b+2],a[b+1],a[b+2]);}
function v(a,g){for(;a.length<d;){a[0]=g[d-a.length];var e=a.slice(0,n);[].splice.apply(a,[0,0].concat(e));x&&(e=a.slice(a.length-n),[].splice.apply(a,[a.length,0].concat(e)),b--);}a[0]="M";}function w(a,b){for(var e=(d-a.length)/n;0<e&&e--;)g=a.slice().splice(a.length/u-n,n*u),g[0]=b[d-n-e*n],l&&(g[n-6]=g[n-2],g[n-5]=g[n-1]),[].splice.apply(a,[a.length/u,0].concat(g)),x&&e--;}c=c||"";var r,h=k.startX,e=k.endX,l=-1<c.indexOf("C"),n=l?7:3,d,g,b;c=c.split(" ");p=p.slice();var x=k.isArea,u=x?2:1,H;l&&(t(c),
t(p));if(h&&e){for(b=0;b<h.length;b++)if(h[b]===e[0]){r=b;break}else if(h[0]===e[e.length-h.length+b]){r=b;H=!0;break}void 0===r&&(c=[]);}c.length&&a.isNumber(r)&&(d=p.length+r*u*n,H?(v(c,p),w(p,c)):(v(p,c),w(c,p)));return [c,p]},fillSetter:function(){a.Fx.prototype.strokeSetter.apply(this,arguments);},strokeSetter:function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0);}};a.merge=function(){var k,c=arguments,p,t={},v=function(c,r){"object"!==typeof c&&(c=
{});a.objectEach(r,function(h,e){!a.isObject(h,!0)||a.isClass(h)||a.isDOMElement(h)?c[e]=r[e]:c[e]=v(c[e]||{},h);});return c};!0===c[0]&&(t=c[1],c=Array.prototype.slice.call(c,2));p=c.length;for(k=0;k<p;k++)t=v(t,c[k]);return t};a.pInt=function(a,c){return parseInt(a,c||10)};a.isString=function(a){return "string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return "[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(k,c){return !!k&&"object"===typeof k&&(!c||
!a.isArray(k))};a.isDOMElement=function(k){return a.isObject(k)&&"number"===typeof k.nodeType};a.isClass=function(k){var c=k&&k.constructor;return !(!a.isObject(k,!0)||a.isDOMElement(k)||!c||!c.name||"Object"===c.name)};a.isNumber=function(a){return "number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a};a.erase=function(a,c){for(var k=a.length;k--;)if(a[k]===c){a.splice(k,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(k,c,p){var t;a.isString(c)?a.defined(p)?k.setAttribute(c,
p):k&&k.getAttribute&&((t=k.getAttribute(c))||"class"!==c||(t=k.getAttribute(c+"Name"))):a.defined(c)&&a.isObject(c)&&a.objectEach(c,function(a,c){k.setAttribute(c,a);});return t};a.splat=function(k){return a.isArray(k)?k:[k]};a.syncTimeout=function(a,c,p){if(c)return setTimeout(a,c,p);a.call(0,p);};a.clearTimeout=function(k){a.defined(k)&&clearTimeout(k);};a.extend=function(a,c){var k;a||(a={});for(k in c)a[k]=c[k];return a};a.pick=function(){var a=arguments,c,p,t=a.length;for(c=0;c<t;c++)if(p=a[c],
void 0!==p&&null!==p)return p};a.css=function(k,c){a.isMS&&!a.svg&&c&&void 0!==c.opacity&&(c.filter="alpha(opacity\x3d"+100*c.opacity+")");a.extend(k.style,c);};a.createElement=function(k,c,p,t,v){k=F.createElement(k);var w=a.css;c&&a.extend(k,c);v&&w(k,{padding:0,border:"none",margin:0});p&&w(k,p);t&&t.appendChild(k);return k};a.extendClass=function(k,c){var p=function(){};p.prototype=new k;a.extend(p.prototype,c);return p};a.pad=function(a,c,p){return Array((c||2)+1-String(a).replace("-","").length).join(p||
0)+a};a.relativeLength=function(a,c,p){return /%$/.test(a)?c*parseFloat(a)/100+(p||0):parseFloat(a)};a.wrap=function(a,c,p){var k=a[c];a[c]=function(){var a=Array.prototype.slice.call(arguments),c=arguments,r=this;r.proceed=function(){k.apply(r,arguments.length?arguments:c);};a.unshift(k);a=p.apply(this,a);r.proceed=null;return a};};a.datePropsToTimestamps=function(k){a.objectEach(k,function(c,p){a.isObject(c)&&"function"===typeof c.getTime?k[p]=c.getTime():(a.isObject(c)||a.isArray(c))&&a.datePropsToTimestamps(c);});};
a.formatSingle=function(k,c,p){var t=/\.([0-9])/,v=a.defaultOptions.lang;/f$/.test(k)?(p=(p=k.match(t))?p[1]:-1,null!==c&&(c=a.numberFormat(c,p,v.decimalPoint,-1<k.indexOf(",")?v.thousandsSep:""))):c=(p||a.time).dateFormat(k,c);return c};a.format=function(k,c,p){for(var t="{",v=!1,w,r,h,e,l=[],n;k;){t=k.indexOf(t);if(-1===t)break;w=k.slice(0,t);if(v){w=w.split(":");r=w.shift().split(".");e=r.length;n=c;for(h=0;h<e;h++)n&&(n=n[r[h]]);w.length&&(n=a.formatSingle(w.join(":"),n,p));l.push(n);}else l.push(w);
k=k.slice(t+1);t=(v=!v)?"}":"{";}l.push(k);return l.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(k,c,p,t,v){var w,r=k;p=a.pick(p,1);w=k/p;c||(c=v?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===t&&(1===p?c=c.filter(function(a){return 0===a%1}):.1>=p&&(c=[1/p])));for(t=0;t<c.length&&!(r=c[t],v&&r*p>=k||!v&&w<=(c[t]+(c[t+1]||c[t]))/2);t++);return r=a.correctFloat(r*p,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=
function(a,c){var k=a.length,t,v;for(v=0;v<k;v++)a[v].safeI=v;a.sort(function(a,r){t=c(a,r);return 0===t?a.safeI-r.safeI:t});for(v=0;v<k;v++)delete a[v].safeI;};a.arrayMin=function(a){for(var c=a.length,k=a[0];c--;)a[c]<k&&(k=a[c]);return k};a.arrayMax=function(a){for(var c=a.length,k=a[0];c--;)a[c]>k&&(k=a[c]);return k};a.destroyObjectProperties=function(k,c){a.objectEach(k,function(a,t){a&&a!==c&&a.destroy&&a.destroy();delete k[t];});};a.discardElement=function(k){var c=a.garbageBin;c||(c=a.createElement("div"));
k&&c.appendChild(k);c.innerHTML="";};a.correctFloat=function(a,c){return parseFloat(a.toPrecision(c||14))};a.setAnimation=function(k,c){c.renderer.globalAnimation=a.pick(k,c.options.chart.animation,!0);};a.animObject=function(k){return a.isObject(k)?a.merge(k):{duration:k?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(k,c,p,t){k=+k||0;c=+c;var v=a.defaultOptions.lang,w=(k.toString().split(".")[1]||"").split("e")[0].length,
r,h,e=k.toString().split("e");-1===c?c=Math.min(w,20):a.isNumber(c)?c&&e[1]&&0>e[1]&&(r=c+ +e[1],0<=r?(e[0]=(+e[0]).toExponential(r).split("e")[0],c=r):(e[0]=e[0].split(".")[0]||0,k=20>c?(e[0]*Math.pow(10,e[1])).toFixed(c):0,e[1]=0)):c=2;h=(Math.abs(e[1]?e[0]:k)+Math.pow(10,-Math.max(c,w)-1)).toFixed(c);w=String(a.pInt(h));r=3<w.length?w.length%3:0;p=a.pick(p,v.decimalPoint);t=a.pick(t,v.thousandsSep);k=(0>k?"-":"")+(r?w.substr(0,r)+t:"");k+=w.substr(r).replace(/(\d{3})(?=\d)/g,"$1"+t);c&&(k+=p+h.slice(-c));
e[1]&&0!==+k&&(k+="e"+e[1]);return k};Math.easeInOutSine=function(a){return -.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(k,c,p){if("width"===c)return Math.max(0,Math.min(k.offsetWidth,k.scrollWidth,k.getBoundingClientRect&&"none"===a.getStyle(k,"transform",!1)?Math.floor(k.getBoundingClientRect().width):Infinity)-a.getStyle(k,"padding-left")-a.getStyle(k,"padding-right"));if("height"===c)return Math.max(0,Math.min(k.offsetHeight,k.scrollHeight)-a.getStyle(k,"padding-top")-a.getStyle(k,"padding-bottom"));
G.getComputedStyle||a.error(27,!0);if(k=G.getComputedStyle(k,void 0))k=k.getPropertyValue(c),a.pick(p,"opacity"!==c)&&(k=a.pInt(k));return k};a.inArray=function(a,c,p){return c.indexOf(a,p)};a.find=Array.prototype.find?function(a,c){return a.find(c)}:function(a,c){var k,t=a.length;for(k=0;k<t;k++)if(c(a[k],k))return a[k]};a.keys=Object.keys;a.offset=function(a){var c=F.documentElement;a=a.parentElement||a.parentNode?a.getBoundingClientRect():{top:0,left:0};return {top:a.top+(G.pageYOffset||c.scrollTop)-
(c.clientTop||0),left:a.left+(G.pageXOffset||c.scrollLeft)-(c.clientLeft||0)}};a.stop=function(k,c){for(var p=a.timers.length;p--;)a.timers[p].elem!==k||c&&c!==a.timers[p].prop||(a.timers[p].stopped=!0);};a.objectEach=function(a,c,p){for(var k in a)a.hasOwnProperty(k)&&c.call(p||a[k],a[k],k,a);};a.objectEach({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(k,c){a[c]=function(a){return Array.prototype[k].apply(a,[].slice.call(arguments,1))};});a.addEvent=function(k,c,p,t){var v,
w=k.addEventListener||a.addEventListenerPolyfill;v="function"===typeof k&&k.prototype?k.prototype.protoEvents=k.prototype.protoEvents||{}:k.hcEvents=k.hcEvents||{};a.Point&&k instanceof a.Point&&k.series&&k.series.chart&&(k.series.chart.runTrackerClick=!0);w&&w.call(k,c,p,!1);v[c]||(v[c]=[]);v[c].push(p);t&&a.isNumber(t.order)&&(p.order=t.order,v[c].sort(function(a,h){return a.order-h.order}));return function(){a.removeEvent(k,c,p);}};a.removeEvent=function(k,c,p){function t(h,e){var l=k.removeEventListener||
a.removeEventListenerPolyfill;l&&l.call(k,h,e,!1);}function v(h){var e,l;k.nodeName&&(c?(e={},e[c]=!0):e=h,a.objectEach(e,function(a,d){if(h[d])for(l=h[d].length;l--;)t(d,h[d][l]);}));}var w,r;["protoEvents","hcEvents"].forEach(function(a){var e=k[a];e&&(c?(w=e[c]||[],p?(r=w.indexOf(p),-1<r&&(w.splice(r,1),e[c]=w),t(c,p)):(v(e),e[c]=[])):(v(e),k[a]={}));});};a.fireEvent=function(k,c,p,t){var v,w,r,h,e;p=p||{};F.createEvent&&(k.dispatchEvent||k.fireEvent)?(v=F.createEvent("Events"),v.initEvent(c,!0,!0),
a.extend(v,p),k.dispatchEvent?k.dispatchEvent(v):k.fireEvent(c,v)):["protoEvents","hcEvents"].forEach(function(l){if(k[l])for(w=k[l][c]||[],r=w.length,p.target||a.extend(p,{preventDefault:function(){p.defaultPrevented=!0;},target:k,type:c}),h=0;h<r;h++)(e=w[h])&&!1===e.call(k,p)&&p.preventDefault();});t&&!p.defaultPrevented&&t.call(k,p);};a.animate=function(k,c,p){var t,v="",w,r,h;a.isObject(p)||(h=arguments,p={duration:h[2],easing:h[3],complete:h[4]});a.isNumber(p.duration)||(p.duration=400);p.easing=
"function"===typeof p.easing?p.easing:Math[p.easing]||Math.easeInOutSine;p.curAnim=a.merge(c);a.objectEach(c,function(e,h){a.stop(k,h);r=new a.Fx(k,p,h);w=null;"d"===h?(r.paths=r.initPath(k,k.d,c.d),r.toD=c.d,t=0,w=1):k.attr?t=k.attr(h):(t=parseFloat(a.getStyle(k,h))||0,"opacity"!==h&&(v="px"));w||(w=e);w&&w.match&&w.match("px")&&(w=w.replace(/px/g,""));r.run(t,w,v);});};a.seriesType=function(k,c,p,t,v){var w=a.getOptions(),r=a.seriesTypes;w.plotOptions[k]=a.merge(w.plotOptions[c],p);r[k]=a.extendClass(r[c]||
function(){},t);r[k].prototype.type=k;v&&(r[k].prototype.pointClass=a.extendClass(a.Point,v));return r[k]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),c=0;return function(){return "highcharts-"+a+"-"+c++}}();a.isFunction=function(a){return "function"===typeof a};G.jQuery&&(G.jQuery.fn.highcharts=function(){var k=[].slice.call(arguments);if(this[0])return k[0]?(new (a[a.isString(k[0])?k.shift():"Chart"])(this[0],k[0],k[1]),this):y[a.attr(this[0],"data-highcharts-chart")]});})(I);
(function(a){var y=a.isNumber,F=a.merge,G=a.pInt;a.Color=function(k){if(!(this instanceof a.Color))return new a.Color(k);this.init(k);};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return [G(a[1]),G(a[2]),G(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return [G(a[1]),G(a[2]),G(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},
init:function(k){var c,p,t,v;if((this.input=k=this.names[k&&k.toLowerCase?k.toLowerCase():""]||k)&&k.stops)this.stops=k.stops.map(function(c){return new a.Color(c[1])});else if(k&&k.charAt&&"#"===k.charAt()&&(c=k.length,k=parseInt(k.substr(1),16),7===c?p=[(k&16711680)>>16,(k&65280)>>8,k&255,1]:4===c&&(p=[(k&3840)>>4|(k&3840)>>8,(k&240)>>4|k&240,(k&15)<<4|k&15,1])),!p)for(t=this.parsers.length;t--&&!p;)v=this.parsers[t],(c=v.regex.exec(k))&&(p=v.parse(c));this.rgba=p||[];},get:function(a){var c=this.input,
k=this.rgba,t;this.stops?(t=F(c),t.stops=[].concat(t.stops),this.stops.forEach(function(c,k){t.stops[k]=[t.stops[k][0],c.get(a)];})):t=k&&y(k[0])?"rgb"===a||!a&&1===k[3]?"rgb("+k[0]+","+k[1]+","+k[2]+")":"a"===a?k[3]:"rgba("+k.join(",")+")":c;return t},brighten:function(a){var c,k=this.rgba;if(this.stops)this.stops.forEach(function(c){c.brighten(a);});else if(y(a)&&0!==a)for(c=0;3>c;c++)k[c]+=G(255*a),0>k[c]&&(k[c]=0),255<k[c]&&(k[c]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},
tweenTo:function(a,c){var k=this.rgba,t=a.rgba;t.length&&k&&k.length?(a=1!==t[3]||1!==k[3],c=(a?"rgba(":"rgb(")+Math.round(t[0]+(k[0]-t[0])*(1-c))+","+Math.round(t[1]+(k[1]-t[1])*(1-c))+","+Math.round(t[2]+(k[2]-t[2])*(1-c))+(a?","+(t[3]+(k[3]-t[3])*(1-c)):"")+")"):c=a.input||"none";return c}};a.color=function(k){return new a.Color(k)};})(I);(function(a){var y,F,G=a.addEvent,k=a.animate,c=a.attr,p=a.charts,t=a.color,v=a.css,w=a.createElement,r=a.defined,h=a.deg2rad,e=a.destroyObjectProperties,l=a.doc,
n=a.extend,d=a.erase,g=a.hasTouch,b=a.isArray,x=a.isFirefox,u=a.isMS,H=a.isObject,E=a.isString,B=a.isWebKit,m=a.merge,z=a.noop,D=a.objectEach,A=a.pick,f=a.pInt,q=a.removeEvent,L=a.splat,K=a.stop,T=a.svg,J=a.SVG_NS,M=a.symbolSizes,R=a.win;y=a.SVGElement=function(){return this};n(y.prototype,{opacity:1,SVG_NS:J,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),init:function(f,q){this.element="span"===
q?w(q):l.createElementNS(this.SVG_NS,q);this.renderer=f;a.fireEvent(this,"afterInit");},animate:function(f,q,d){var C=a.animObject(A(q,this.renderer.globalAnimation,!0));A(l.hidden,l.msHidden,l.webkitHidden,!1)&&(C.duration=0);0!==C.duration?(d&&(C.complete=d),k(this,f,C)):(this.attr(f,null,d),a.objectEach(f,function(a,f){C.step&&C.step.call(this,a,{prop:f,pos:1});},this));return this},complexColor:function(f,q,d){var C=this.renderer,g,e,n,h,J,z,l,P,x,c,u,K=[],L;a.fireEvent(this.renderer,"complexColor",
{args:arguments},function(){f.radialGradient?e="radialGradient":f.linearGradient&&(e="linearGradient");e&&(n=f[e],J=C.gradients,l=f.stops,c=d.radialReference,b(n)&&(f[e]=n={x1:n[0],y1:n[1],x2:n[2],y2:n[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===e&&c&&!r(n.gradientUnits)&&(h=n,n=m(n,C.getRadialAttr(c,h),{gradientUnits:"userSpaceOnUse"})),D(n,function(a,f){"id"!==f&&K.push(f,a);}),D(l,function(a){K.push(a);}),K=K.join(","),J[K]?u=J[K].attr("id"):(n.id=u=a.uniqueKey(),J[K]=z=C.createElement(e).attr(n).add(C.defs),
z.radAttr=h,z.stops=[],l.forEach(function(f){0===f[1].indexOf("rgba")?(g=a.color(f[1]),P=g.get("rgb"),x=g.get("a")):(P=f[1],x=1);f=C.createElement("stop").attr({offset:f[0],"stop-color":P,"stop-opacity":x}).add(z);z.stops.push(f);})),L="url("+C.url+"#"+u+")",d.setAttribute(q,L),d.gradient=K,f.toString=function(){return L});});},applyTextOutline:function(f){var C=this.element,q,b,g,e,m;-1!==f.indexOf("contrast")&&(f=f.replace(/contrast/g,this.renderer.getContrast(C.style.fill)));f=f.split(" ");b=f[f.length-
1];if((g=f[0])&&"none"!==g&&a.svg){this.fakeTS=!0;f=[].slice.call(C.getElementsByTagName("tspan"));this.ySetter=this.xSetter;g=g.replace(/(^[\d\.]+)(.*?)$/g,function(a,f,C){return 2*f+C});for(m=f.length;m--;)q=f[m],"highcharts-text-outline"===q.getAttribute("class")&&d(f,C.removeChild(q));e=C.firstChild;f.forEach(function(a,f){0===f&&(a.setAttribute("x",C.getAttribute("x")),f=C.getAttribute("y"),a.setAttribute("y",f||0),null===f&&C.setAttribute("y",0));a=a.cloneNode(1);c(a,{"class":"highcharts-text-outline",
fill:b,stroke:b,"stroke-width":g,"stroke-linejoin":"round"});C.insertBefore(a,e);});}},symbolCustomAttribs:"x y width height r start end innerR anchorX anchorY rounded".split(" "),attr:function(f,q,d,b){var C,g=this.element,e,m=this,n,h,J=this.symbolCustomAttribs;"string"===typeof f&&void 0!==q&&(C=f,f={},f[C]=q);"string"===typeof f?m=(this[f+"Getter"]||this._defaultGetter).call(this,f,g):(D(f,function(C,q){n=!1;b||K(this,q);this.symbolName&&-1!==a.inArray(q,J)&&(e||(this.symbolAttr(f),e=!0),n=!0);
!this.rotation||"x"!==q&&"y"!==q||(this.doTransform=!0);n||(h=this[q+"Setter"]||this._defaultSetter,h.call(this,C,q,g),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(q)&&this.updateShadows(q,C,h));},this),this.afterSetters());d&&d.call(this);return m},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1);},updateShadows:function(a,f,q){for(var C=this.shadows,d=C.length;d--;)q.call(C[d],"height"===a?Math.max(f-(C[d].cutHeight||
0),0):"d"===a?this.d:f,a,C[d]);},addClass:function(a,f){var C=this.attr("class")||"";-1===C.indexOf(a)&&(f||(a=(C+(C?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return -1!==(this.attr("class")||"").split(" ").indexOf(a)},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var f=this;"x y r start end width height innerR anchorX anchorY".split(" ").forEach(function(C){f[C]=A(a[C],f[C]);});f.attr({d:f.renderer.symbols[f.symbolName](f.x,
f.y,f.width,f.height,f)});},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,f){var C;f=f||a.strokeWidth||0;C=Math.round(f)%2/2;a.x=Math.floor(a.x||this.x||0)+C;a.y=Math.floor(a.y||this.y||0)+C;a.width=Math.floor((a.width||this.width||0)-2*C);a.height=Math.floor((a.height||this.height||0)-2*C);r(a.strokeWidth)&&(a.strokeWidth=f);return a},css:function(a){var C=this.styles,q={},d=this.element,b,g="",e,m=!C,h=["textOutline","textOverflow",
"width"];a&&a.color&&(a.fill=a.color);C&&D(a,function(a,f){a!==C[f]&&(q[f]=a,m=!0);});m&&(C&&(a=n(C,q)),a&&(null===a.width||"auto"===a.width?delete this.textWidth:"text"===d.nodeName.toLowerCase()&&a.width&&(b=this.textWidth=f(a.width))),this.styles=a,b&&!T&&this.renderer.forExport&&delete a.width,d.namespaceURI===this.SVG_NS?(e=function(a,f){return "-"+f.toLowerCase()},D(a,function(a,f){-1===h.indexOf(f)&&(g+=f.replace(/([A-Z])/g,e)+":"+a+";");}),g&&c(d,"style",g)):v(d,a),this.added&&("text"===this.element.nodeName&&
this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},getStyle:function(a){return R.getComputedStyle(this.element||this,"").getPropertyValue(a)},strokeWidth:function(){if(!this.renderer.styledMode)return this["stroke-width"]||0;var a=this.getStyle("stroke-width"),q;a.indexOf("px")===a.length-2?a=f(a):(q=l.createElementNS(J,"rect"),c(q,{width:a,"stroke-width":0}),this.element.parentNode.appendChild(q),a=q.getBBox().width,q.parentNode.removeChild(q));return a},
on:function(a,f){var C=this,q=C.element;g&&"click"===a?(q.ontouchstart=function(a){C.touchEventFired=Date.now();a.preventDefault();f.call(q,a);},q.onclick=function(a){(-1===R.navigator.userAgent.indexOf("Android")||1100<Date.now()-(C.touchEventFired||0))&&f.call(q,a);}):q["on"+a]=f;return this},setRadialReference:function(a){var f=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;f&&f.radAttr&&f.animate(this.renderer.getRadialAttr(a,f.radAttr));return this},translate:function(a,
f){return this.attr({translateX:a,translateY:f})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,f=this.translateY||0,q=this.scaleX,d=this.scaleY,b=this.inverted,g=this.rotation,e=this.matrix,m=this.element;b&&(a+=this.width,f+=this.height);a=["translate("+a+","+f+")"];r(e)&&a.push("matrix("+e.join(",")+")");b?a.push("rotate(90) scale(-1,1)"):g&&a.push("rotate("+g+" "+A(this.rotationOriginX,m.getAttribute("x"),0)+" "+A(this.rotationOriginY,
m.getAttribute("y")||0)+")");(r(q)||r(d))&&a.push("scale("+A(q,1)+" "+A(d,1)+")");a.length&&m.setAttribute("transform",a.join(" "));},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,f,q){var C,b,g,e,m={};b=this.renderer;g=b.alignedObjects;var n,h;if(a){if(this.alignOptions=a,this.alignByTranslate=f,!q||E(q))this.alignTo=C=q||"renderer",d(g,this),g.push(this),q=null;}else a=this.alignOptions,f=this.alignByTranslate,C=this.alignTo;q=A(q,b[C],b);C=a.align;
b=a.verticalAlign;g=(q.x||0)+(a.x||0);e=(q.y||0)+(a.y||0);"right"===C?n=1:"center"===C&&(n=2);n&&(g+=(q.width-(a.width||0))/n);m[f?"translateX":"x"]=Math.round(g);"bottom"===b?h=1:"middle"===b&&(h=2);h&&(e+=(q.height-(a.height||0))/h);m[f?"translateY":"y"]=Math.round(e);this[this.placed?"animate":"attr"](m);this.placed=!0;this.alignAttr=m;return this},getBBox:function(a,f){var q,C=this.renderer,d,b=this.element,g=this.styles,e,m=this.textStr,J,z=C.cache,l=C.cacheKeys,x=b.namespaceURI===this.SVG_NS,
c;f=A(f,this.rotation);d=f*h;e=C.styledMode?b&&y.prototype.getStyle.call(b,"font-size"):g&&g.fontSize;r(m)&&(c=m.toString(),-1===c.indexOf("\x3c")&&(c=c.replace(/[0-9]/g,"0")),c+=["",f||0,e,this.textWidth,g&&g.textOverflow].join());c&&!a&&(q=z[c]);if(!q){if(x||C.forExport){try{(J=this.fakeTS&&function(a){[].forEach.call(b.querySelectorAll(".highcharts-text-outline"),function(f){f.style.display=a;});})&&J("none"),q=b.getBBox?n({},b.getBBox()):{width:b.offsetWidth,height:b.offsetHeight},J&&J("");}catch(Y){}if(!q||
0>q.width)q={width:0,height:0};}else q=this.htmlGetBBox();C.isSVG&&(a=q.width,C=q.height,x&&(q.height=C={"11px,17":14,"13px,20":16}[g&&g.fontSize+","+Math.round(C)]||C),f&&(q.width=Math.abs(C*Math.sin(d))+Math.abs(a*Math.cos(d)),q.height=Math.abs(C*Math.cos(d))+Math.abs(a*Math.sin(d))));if(c&&0<q.height){for(;250<l.length;)delete z[l.shift()];z[c]||l.push(c);z[c]=q;}}return q},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},
fadeOut:function(a){var f=this;f.animate({opacity:0},{duration:a||150,complete:function(){f.attr({y:-9999});}});},add:function(a){var f=this.renderer,q=this.element,C;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&f.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)C=this.zIndexSetter();C||(a?a.element:f.box).appendChild(q);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var f=a.parentNode;f&&f.removeChild(a);},destroy:function(){var a=
this,f=a.element||{},q=a.renderer,b=q.isSVG&&"SPAN"===f.nodeName&&a.parentGroup,g=f.ownerSVGElement,e=a.clipPath;f.onclick=f.onmouseout=f.onmouseover=f.onmousemove=f.point=null;K(a);e&&g&&([].forEach.call(g.querySelectorAll("[clip-path],[CLIP-PATH]"),function(a){var f=a.getAttribute("clip-path"),q=e.element.id;(-1<f.indexOf("(#"+q+")")||-1<f.indexOf('("#'+q+'")'))&&a.removeAttribute("clip-path");}),a.clipPath=e.destroy());if(a.stops){for(g=0;g<a.stops.length;g++)a.stops[g]=a.stops[g].destroy();a.stops=
null;}a.safeRemoveChild(f);for(q.styledMode||a.destroyShadows();b&&b.div&&0===b.div.childNodes.length;)f=b.parentGroup,a.safeRemoveChild(b.div),delete b.div,b=f;a.alignTo&&d(q.alignedObjects,a);D(a,function(f,q){delete a[q];});return null},shadow:function(a,f,q){var d=[],C,b,g=this.element,e,m,n,h;if(!a)this.destroyShadows();else if(!this.shadows){m=A(a.width,3);n=(a.opacity||.15)/m;h=this.parentInverted?"(-1,-1)":"("+A(a.offsetX,1)+", "+A(a.offsetY,1)+")";for(C=1;C<=m;C++)b=g.cloneNode(0),e=2*m+1-
2*C,c(b,{stroke:a.color||"#000000","stroke-opacity":n*C,"stroke-width":e,transform:"translate"+h,fill:"none"}),b.setAttribute("class",(b.getAttribute("class")||"")+" highcharts-shadow"),q&&(c(b,"height",Math.max(c(b,"height")-e,0)),b.cutHeight=e),f?f.element.appendChild(b):g.parentNode&&g.parentNode.insertBefore(b,g),d.push(b);this.shadows=d;}return this},destroyShadows:function(){(this.shadows||[]).forEach(function(a){this.safeRemoveChild(a);},this);this.shadows=void 0;},xGetter:function(a){"circle"===
this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=A(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,f,q){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[f]!==a&&(q.setAttribute(f,a),this[f]=a);},dashstyleSetter:function(a){var q,b=this["stroke-width"];"inherit"===b&&(b=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot",
"3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(q=a.length;q--;)a[q]=f(a[q])*b;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a);}},alignSetter:function(a){var f={left:"start",center:"middle",right:"end"};f[a]&&(this.alignValue=a,this.element.setAttribute("text-anchor",f[a]));},opacitySetter:function(a,f,
q){this[f]=a;q.setAttribute(f,a);},titleSetter:function(a){var f=this.element.getElementsByTagName("title")[0];f||(f=l.createElementNS(this.SVG_NS,"title"),this.element.appendChild(f));f.firstChild&&f.removeChild(f.firstChild);f.appendChild(l.createTextNode(String(A(a),"").replace(/<[^>]*>/g,"").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")));},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this));},fillSetter:function(a,f,q){"string"===
typeof a?q.setAttribute(f,a):a&&this.complexColor(a,f,q);},visibilitySetter:function(a,f,q){"inherit"===a?q.removeAttribute(f):this[f]!==a&&q.setAttribute(f,a);this[f]=a;},zIndexSetter:function(a,q){var b=this.renderer,d=this.parentGroup,g=(d||b).element||b.box,e,m=this.element,C,n,b=g===b.box;e=this.added;var h;r(a)?(m.setAttribute("data-z-index",a),a=+a,this[q]===a&&(e=!1)):r(this[q])&&m.removeAttribute("data-z-index");this[q]=a;if(e){(a=this.zIndex)&&d&&(d.handleZ=!0);q=g.childNodes;for(h=q.length-
1;0<=h&&!C;h--)if(d=q[h],e=d.getAttribute("data-z-index"),n=!r(e),d!==m)if(0>a&&n&&!b&&!h)g.insertBefore(m,q[h]),C=!0;else if(f(e)<=a||n&&(!r(a)||0<=a))g.insertBefore(m,q[h+1]||null),C=!0;C||(g.insertBefore(m,q[b?3:0]||null),C=!0);}return C},_defaultSetter:function(a,f,q){q.setAttribute(f,a);}});y.prototype.yGetter=y.prototype.xGetter;y.prototype.translateXSetter=y.prototype.translateYSetter=y.prototype.rotationSetter=y.prototype.verticalAlignSetter=y.prototype.rotationOriginXSetter=y.prototype.rotationOriginYSetter=
y.prototype.scaleXSetter=y.prototype.scaleYSetter=y.prototype.matrixSetter=function(a,f){this[f]=a;this.doTransform=!0;};y.prototype["stroke-widthSetter"]=y.prototype.strokeSetter=function(a,f,q){this[f]=a;this.stroke&&this["stroke-width"]?(y.prototype.fillSetter.call(this,this.stroke,"stroke",q),q.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===f&&0===a&&this.hasStroke&&(q.removeAttribute("stroke"),this.hasStroke=!1);};F=a.SVGRenderer=function(){this.init.apply(this,
arguments);};n(F.prototype,{Element:y,SVG_NS:J,init:function(a,f,q,b,d,g,e){var m;m=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"});e||m.css(this.getStyle(b));b=m.element;a.appendChild(b);c(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&c(b,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=b;this.boxWrapper=m;this.alignedObjects=[];this.url=(x||B)&&l.getElementsByTagName("base").length?R.location.href.split("#")[0].replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,
"%20"):"";this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highcharts 7.0.3"));this.defs=this.createElement("defs").add();this.allowHTML=g;this.forExport=d;this.styledMode=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(f,q,!1);var n;x&&a.getBoundingClientRect&&(f=function(){v(a,{left:0,top:0});n=a.getBoundingClientRect();v(a,{left:Math.ceil(n.left)-n.left+"px",top:Math.ceil(n.top)-n.top+"px"});},f(),this.unSubPixelFix=G(R,"resize",
f));},definition:function(a){function f(a,b){var d;L(a).forEach(function(a){var g=q.createElement(a.tagName),e={};D(a,function(a,f){"tagName"!==f&&"children"!==f&&"textContent"!==f&&(e[f]=a);});g.attr(e);g.add(b||q.defs);a.textContent&&g.element.appendChild(l.createTextNode(a.textContent));f(a.children||[],g);d=g;});return d}var q=this;return f(a)},getStyle:function(a){return this.style=n({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a));},
isHidden:function(){return !this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();e(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var f=new this.Element;f.init(this,a);return f},draw:z,getRadialAttr:function(a,f){return {cx:a[0]-a[2]/2+f.cx*a[2],cy:a[1]-a[2]/2+f.cy*a[2],r:f.r*a[2]}},truncate:function(a,f,q,b,d,
g,e){var m=this,n=a.rotation,h,C=b?1:0,J=(q||b).length,z=J,c=[],r=function(a){f.firstChild&&f.removeChild(f.firstChild);a&&f.appendChild(l.createTextNode(a));},x=function(g,n){n=n||g;if(void 0===c[n])if(f.getSubStringLength)try{c[n]=d+f.getSubStringLength(0,b?n+1:n);}catch(Z){}else m.getSpanWidth&&(r(e(q||b,g)),c[n]=d+m.getSpanWidth(a,f));return c[n]},u,D;a.rotation=0;u=x(f.textContent.length);if(D=d+u>g){for(;C<=J;)z=Math.ceil((C+J)/2),b&&(h=e(b,z)),u=x(z,h&&h.length-1),C===J?C=J+1:u>g?J=z-1:C=z;0===
J?r(""):q&&J===q.length-1||r(h||e(q||b,z));}b&&b.splice(0,z);a.actualWidth=u;a.rotation=n;return D},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var q=a.element,b=this,d=b.forExport,g=A(a.textStr,"").toString(),e=-1!==g.indexOf("\x3c"),m=q.childNodes,n,h=c(q,"x"),C=a.styles,z=a.textWidth,r=C&&C.lineHeight,x=C&&C.textOutline,u=C&&"ellipsis"===C.textOverflow,K=C&&"nowrap"===C.whiteSpace,L=C&&C.fontSize,B,M,k=m.length,C=z&&!a.added&&
this.box,H=function(a){var g;b.styledMode||(g=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:L||b.style.fontSize||12);return r?f(r):b.fontMetrics(g,a.getAttribute("style")?a:q).h},E=function(a,f){D(b.escapes,function(q,b){f&&-1!==f.indexOf(q)||(a=a.toString().replace(new RegExp(q,"g"),b));});return a},w=function(a,f){var q;q=a.indexOf("\x3c");a=a.substring(q,a.indexOf("\x3e")-q);q=a.indexOf(f+"\x3d");if(-1!==q&&(q=q+f.length+1,f=a.charAt(q),'"'===f||"'"===f))return a=a.substring(q+1),a.substring(0,
a.indexOf(f))};B=[g,u,K,r,x,L,z].join();if(B!==a.textCache){for(a.textCache=B;k--;)q.removeChild(m[k]);e||x||u||z||-1!==g.indexOf(" ")?(C&&C.appendChild(q),e?(g=b.styledMode?g.replace(/<(b|strong)>/g,'\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g,'\x3cspan class\x3d"highcharts-emphasized"\x3e'):g.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e'),g=g.replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,
"\x3c/span\x3e").split(/<br.*?>/g)):g=[g],g=g.filter(function(a){return ""!==a}),g.forEach(function(f,g){var e,m=0,C=0;f=f.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");e=f.split("|||");e.forEach(function(f){if(""!==f||1===e.length){var r={},x=l.createElementNS(b.SVG_NS,"tspan"),D,A;(D=w(f,"class"))&&c(x,"class",D);if(D=w(f,"style"))D=D.replace(/(;| |^)color([ :])/,"$1fill$2"),c(x,"style",D);(A=w(f,"href"))&&!d&&(c(x,"onclick",'location.href\x3d"'+
A+'"'),c(x,"class","highcharts-anchor"),b.styledMode||v(x,{cursor:"pointer"}));f=E(f.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==f){x.appendChild(l.createTextNode(f));m?r.dx=0:g&&null!==h&&(r.x=h);c(x,r);q.appendChild(x);!m&&M&&(!T&&d&&v(x,{display:"block"}),c(x,"dy",H(x)));if(z){var B=f.replace(/([^\^])-/g,"$1- ").split(" "),r=!K&&(1<e.length||g||1<B.length);A=0;var k=H(x);if(u)n=b.truncate(a,x,f,void 0,0,Math.max(0,z-parseInt(L||12,10)),function(a,f){return a.substring(0,f)+"\u2026"});else if(r)for(;B.length;)B.length&&
!K&&0<A&&(x=l.createElementNS(J,"tspan"),c(x,{dy:k,x:h}),D&&c(x,"style",D),x.appendChild(l.createTextNode(B.join(" ").replace(/- /g,"-"))),q.appendChild(x)),b.truncate(a,x,null,B,0===A?C:0,z,function(a,f){return B.slice(0,f).join(" ").replace(/- /g,"-")}),C=a.actualWidth,A++;}m++;}}});M=M||q.childNodes.length;}),u&&n&&a.attr("title",E(a.textStr,["\x26lt;","\x26gt;"])),C&&C.removeChild(q),x&&a.applyTextOutline&&a.applyTextOutline(x)):q.appendChild(l.createTextNode(E(g)));}},getContrast:function(a){a=t(a).rgba;
a[0]*=1;a[1]*=1.2;a[2]*=.5;return 459<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,f,q,b,g,d,e,h,z){var C=this.label(a,f,q,z,null,null,null,null,"button"),J=0,x=this.styledMode;C.attr(m({padding:8,r:2},g));if(!x){var l,r,c,D;g=m({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},g);l=g.style;delete g.style;d=m(g,{fill:"#e6e6e6"},d);r=d.style;delete d.style;e=m(g,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},e);c=e.style;
delete e.style;h=m(g,{style:{color:"#cccccc"}},h);D=h.style;delete h.style;}G(C.element,u?"mouseover":"mouseenter",function(){3!==J&&C.setState(1);});G(C.element,u?"mouseout":"mouseleave",function(){3!==J&&C.setState(J);});C.setState=function(a){1!==a&&(C.state=J=a);C.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);x||C.attr([g,d,e,h][a||0]).css([l,r,c,D][a||0]);};x||C.attr(g).css(n({cursor:"default"},l));return C.on("click",
function(a){3!==J&&b.call(C,a);})},crispLine:function(a,f){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-f%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+f%2/2);return a},path:function(a){var f=this.styledMode?{}:{fill:"none"};b(a)?f.d=a:H(a)&&n(f,a);return this.createElement("path").attr(f)},circle:function(a,f,q){a=H(a)?a:void 0===a?{}:{x:a,y:f,r:q};f=this.createElement("circle");f.xSetter=f.ySetter=function(a,f,q){q.setAttribute("c"+f,a);};return f.attr(a)},arc:function(a,f,q,b,g,d){H(a)?(b=a,f=b.y,q=
b.r,a=b.x):b={innerR:b,start:g,end:d};a=this.symbol("arc",a,f,q,q,b);a.r=q;return a},rect:function(a,f,q,b,g,d){g=H(a)?a.r:g;var e=this.createElement("rect");a=H(a)?a:void 0===a?{}:{x:a,y:f,width:Math.max(q,0),height:Math.max(b,0)};this.styledMode||(void 0!==d&&(a.strokeWidth=d,a=e.crisp(a)),a.fill="none");g&&(a.r=g);e.rSetter=function(a,f,q){c(q,{rx:a,ry:a});};return e.attr(a)},setSize:function(a,f,q){var b=this.alignedObjects,g=b.length;this.width=a;this.height=f;for(this.boxWrapper.animate({width:a,
height:f},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")});},duration:A(q,!0)?void 0:0});g--;)b[g].align();},g:function(a){var f=this.createElement("g");return a?f.attr({"class":"highcharts-"+a}):f},image:function(a,f,q,b,g,d){var e={preserveAspectRatio:"none"},m,h=function(a,f){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink","href",f):a.setAttribute("hc-svg-href",f);},J=function(f){h(m.element,a);d.call(m,f);};1<arguments.length&&n(e,{x:f,y:q,width:b,
height:g});m=this.createElement("image").attr(e);d?(h(m.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),e=new R.Image,G(e,"load",J),e.src=a,e.complete&&J({})):h(m.element,a);return m},symbol:function(a,f,q,b,g,d){var e=this,m,h=/^url\((.*?)\)$/,J=h.test(a),z=!J&&(this.symbols[a]?a:"circle"),x=z&&this.symbols[z],c=r(f)&&x&&x.call(this.symbols,Math.round(f),Math.round(q),b,g,d),C,u;x?(m=this.path(c),e.styledMode||m.attr("fill","none"),n(m,{symbolName:z,x:f,
y:q,width:b,height:g}),d&&n(m,d)):J&&(C=a.match(h)[1],m=this.image(C),m.imgwidth=A(M[C]&&M[C].width,d&&d.width),m.imgheight=A(M[C]&&M[C].height,d&&d.height),u=function(){m.attr({width:m.width,height:m.height});},["width","height"].forEach(function(a){m[a+"Setter"]=function(a,f){var q={},b=this["img"+f],g="width"===f?"translateX":"translateY";this[f]=a;r(b)&&(this.element&&this.element.setAttribute(f,b),this.alignByTranslate||(q[g]=((this[f]||0)-b)/2,this.attr(q)));};}),r(f)&&m.attr({x:f,y:q}),m.isImg=
!0,r(m.imgwidth)&&r(m.imgheight)?u():(m.attr({width:0,height:0}),w("img",{onload:function(){var a=p[e.chartIndex];0===this.width&&(v(this,{position:"absolute",top:"-999em"}),l.body.appendChild(this));M[C]={width:this.width,height:this.height};m.imgwidth=this.width;m.imgheight=this.height;m.element&&u();this.parentNode&&this.parentNode.removeChild(this);e.imgCount--;if(!e.imgCount&&a&&a.onload)a.onload();},src:C}),this.imgCount++));return m},symbols:{circle:function(a,f,q,b){return this.arc(a+q/2,f+
b/2,q/2,b/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,f,q,b){return ["M",a,f,"L",a+q,f,a+q,f+b,a,f+b,"Z"]},triangle:function(a,f,q,b){return ["M",a+q/2,f,"L",a+q,f+b,a,f+b,"Z"]},"triangle-down":function(a,f,q,b){return ["M",a,f,"L",a+q,f,a+q/2,f+b,"Z"]},diamond:function(a,f,q,b){return ["M",a+q/2,f,"L",a+q,f+b/2,a+q/2,f+b,a,f+b/2,"Z"]},arc:function(a,f,q,b,g){var d=g.start,e=g.r||q,m=g.r||b||q,n=g.end-.001;q=g.innerR;b=A(g.open,.001>Math.abs(g.end-g.start-2*Math.PI));var h=Math.cos(d),J=Math.sin(d),
z=Math.cos(n),n=Math.sin(n);g=.001>g.end-d-Math.PI?0:1;e=["M",a+e*h,f+m*J,"A",e,m,0,g,1,a+e*z,f+m*n];r(q)&&e.push(b?"M":"L",a+q*z,f+q*n,"A",q,q,0,g,0,a+q*h,f+q*J);e.push(b?"":"Z");return e},callout:function(a,f,q,b,g){var d=Math.min(g&&g.r||0,q,b),e=d+6,m=g&&g.anchorX;g=g&&g.anchorY;var n;n=["M",a+d,f,"L",a+q-d,f,"C",a+q,f,a+q,f,a+q,f+d,"L",a+q,f+b-d,"C",a+q,f+b,a+q,f+b,a+q-d,f+b,"L",a+d,f+b,"C",a,f+b,a,f+b,a,f+b-d,"L",a,f+d,"C",a,f,a,f,a+d,f];m&&m>q?g>f+e&&g<f+b-e?n.splice(13,3,"L",a+q,g-6,a+q+6,
g,a+q,g+6,a+q,f+b-d):n.splice(13,3,"L",a+q,b/2,m,g,a+q,b/2,a+q,f+b-d):m&&0>m?g>f+e&&g<f+b-e?n.splice(33,3,"L",a,g+6,a-6,g,a,g-6,a,f+d):n.splice(33,3,"L",a,b/2,m,g,a,b/2,a,f+d):g&&g>b&&m>a+e&&m<a+q-e?n.splice(23,3,"L",m+6,f+b,m,f+b+6,m-6,f+b,a+d,f+b):g&&0>g&&m>a+e&&m<a+q-e&&n.splice(3,3,"L",m-6,f,m,f-6,m+6,f,q-d,f);return n}},clipRect:function(f,q,b,g){var d=a.uniqueKey(),e=this.createElement("clipPath").attr({id:d}).add(this.defs);f=this.rect(f,q,b,g,0).add(e);f.id=d;f.clipPath=e;f.count=0;return f},
text:function(a,f,q,b){var g={};if(b&&(this.allowHTML||!this.forExport))return this.html(a,f,q);g.x=Math.round(f||0);q&&(g.y=Math.round(q));r(a)&&(g.text=a);a=this.createElement("text").attr(g);b||(a.xSetter=function(a,f,q){var b=q.getElementsByTagName("tspan"),g,d=q.getAttribute(f),e;for(e=0;e<b.length;e++)g=b[e],g.getAttribute(f)===d&&g.setAttribute(f,a);q.setAttribute(f,a);});return a},fontMetrics:function(a,q){a=!this.styledMode&&/px/.test(a)||!R.getComputedStyle?a||q&&q.style&&q.style.fontSize||
this.style&&this.style.fontSize:q&&y.prototype.getStyle.call(q,"font-size");a=/px/.test(a)?f(a):12;q=24>a?a+3:Math.round(1.2*a);return {h:q,b:Math.round(.8*q),f:a}},rotCorr:function(a,f,q){var b=a;f&&q&&(b=Math.max(b*Math.cos(f*h),4));return {x:-a/3*Math.sin(f*h),y:b}},label:function(f,b,g,d,e,h,J,z,x){var l=this,c=l.styledMode,u=l.g("button"!==x&&"label"),D=u.text=l.text("",0,0,J).attr({zIndex:1}),K,L,C=0,A=3,B=0,M,k,E,H,T,w={},p,t,R=/^url\((.*?)\)$/.test(d),v=c||R,P=function(){return c?K.strokeWidth()%
2/2:(p?parseInt(p,10):0)%2/2},U,O,S;x&&u.addClass("highcharts-"+x);U=function(){var a=D.element.style,f={};L=(void 0===M||void 0===k||T)&&r(D.textStr)&&D.getBBox();u.width=(M||L.width||0)+2*A+B;u.height=(k||L.height||0)+2*A;t=A+Math.min(l.fontMetrics(a&&a.fontSize,D).b,L?L.height:Infinity);v&&(K||(u.box=K=l.symbols[d]||R?l.symbol(d):l.rect(),K.addClass(("button"===x?"":"highcharts-label-box")+(x?" highcharts-"+x+"-box":"")),K.add(u),a=P(),f.x=a,f.y=(z?-t:0)+a),f.width=Math.round(u.width),f.height=
Math.round(u.height),K.attr(n(f,w)),w={});};O=function(){var a=B+A,f;f=z?0:t;r(M)&&L&&("center"===T||"right"===T)&&(a+={center:.5,right:1}[T]*(M-L.width));if(a!==D.x||f!==D.y)D.attr("x",a),D.hasBoxWidthChanged&&(L=D.getBBox(!0),U()),void 0!==f&&D.attr("y",f);D.x=a;D.y=f;};S=function(a,f){K?K.attr(a,f):w[a]=f;};u.onAdd=function(){D.add(u);u.attr({text:f||0===f?f:"",x:b,y:g});K&&r(e)&&u.attr({anchorX:e,anchorY:h});};u.widthSetter=function(f){M=a.isNumber(f)?f:null;};u.heightSetter=function(a){k=a;};u["text-alignSetter"]=
function(a){T=a;};u.paddingSetter=function(a){r(a)&&a!==A&&(A=u.padding=a,O());};u.paddingLeftSetter=function(a){r(a)&&a!==B&&(B=a,O());};u.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==C&&(C=a,L&&u.attr({x:E}));};u.textSetter=function(a){void 0!==a&&D.textSetter(a);U();O();};u["stroke-widthSetter"]=function(a,f){a&&(v=!0);p=this["stroke-width"]=a;S(f,a);};c?u.rSetter=function(a,f){S(f,a);}:u.strokeSetter=u.fillSetter=u.rSetter=function(a,f){"r"!==f&&("fill"===f&&a&&(v=!0),u[f]=a);S(f,a);};
u.anchorXSetter=function(a,f){e=u.anchorX=a;S(f,Math.round(a)-P()-E);};u.anchorYSetter=function(a,f){h=u.anchorY=a;S(f,a-H);};u.xSetter=function(a){u.x=a;C&&(a-=C*((M||L.width)+2*A),u["forceAnimate:x"]=!0);E=Math.round(a);u.attr("translateX",E);};u.ySetter=function(a){H=u.y=Math.round(a);u.attr("translateY",H);};var G=u.css;J={css:function(a){if(a){var f={};a=m(a);u.textProps.forEach(function(q){void 0!==a[q]&&(f[q]=a[q],delete a[q]);});D.css(f);"width"in f&&U();"fontSize"in f&&(U(),O());}return G.call(u,
a)},getBBox:function(){return {width:L.width+2*A,height:L.height+2*A,x:L.x-A,y:L.y-A}},destroy:function(){q(u.element,"mouseenter");q(u.element,"mouseleave");D&&(D=D.destroy());K&&(K=K.destroy());y.prototype.destroy.call(u);u=l=U=O=S=null;}};c||(J.shadow=function(a){a&&(U(),K&&K.shadow(a));return u});return n(u,J)}});a.Renderer=F;})(I);(function(a){var y=a.attr,F=a.createElement,G=a.css,k=a.defined,c=a.extend,p=a.isFirefox,t=a.isMS,v=a.isWebKit,w=a.pick,r=a.pInt,h=a.SVGElement,e=a.SVGRenderer,l=a.win;
c(h.prototype,{htmlCss:function(a){var d="SPAN"===this.element.tagName&&a&&"width"in a,g=w(d&&a.width,void 0),b;d&&(delete a.width,this.textWidth=g,b=!0);a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=c(this.styles,a);G(this.element,a);b&&this.htmlUpdateTransform();return this},htmlGetBBox:function(){var a=this.element;return {x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,
d=this.element,g=this.translateX||0,b=this.translateY||0,e=this.x||0,h=this.y||0,l=this.textAlign||"left",c={left:0,center:.5,right:1}[l],B=this.styles,m=B&&B.whiteSpace;G(d,{marginLeft:g,marginTop:b});!a.styledMode&&this.shadows&&this.shadows.forEach(function(a){G(a,{marginLeft:g+1,marginTop:b+1});});this.inverted&&[].forEach.call(d.childNodes,function(f){a.invertChild(f,d);});if("SPAN"===d.tagName){var B=this.rotation,z=this.textWidth&&r(this.textWidth),D=[B,l,d.innerHTML,this.textWidth,this.textAlign].join(),
A;(A=z!==this.oldTextWidth)&&!(A=z>this.oldTextWidth)&&((A=this.textPxLength)||(G(d,{width:"",whiteSpace:m||"nowrap"}),A=d.offsetWidth),A=A>z);A&&(/[ \-]/.test(d.textContent||d.innerText)||"ellipsis"===d.style.textOverflow)?(G(d,{width:z+"px",display:"block",whiteSpace:m||"normal"}),this.oldTextWidth=z,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;D!==this.cTT&&(m=a.fontMetrics(d.style.fontSize,d).b,!k(B)||B===(this.oldRotation||0)&&l===this.oldAlign||this.setSpanRotation(B,c,m),this.getSpanCorrection(!k(B)&&
this.textPxLength||d.offsetWidth,m,c,B,l));G(d,{left:e+(this.xCorr||0)+"px",top:h+(this.yCorr||0)+"px"});this.cTT=D;this.oldRotation=B;this.oldAlign=l;}}else this.alignOnAdd=!0;},setSpanRotation:function(a,d,g){var b={},e=this.renderer.getTransformKey();b[e]=b.transform="rotate("+a+"deg)";b[e+(p?"Origin":"-origin")]=b.transformOrigin=100*d+"% "+g+"px";G(this.element,b);},getSpanCorrection:function(a,d,g){this.xCorr=-a*g;this.yCorr=-d;}});c(e.prototype,{getTransformKey:function(){return t&&!/Edge/.test(l.navigator.userAgent)?
"-ms-transform":v?"-webkit-transform":p?"MozTransform":l.opera?"-o-transform":""},html:function(e,d,g){var b=this.createElement("span"),n=b.element,u=b.renderer,l=u.isSVG,r=function(a,b){["opacity","visibility"].forEach(function(g){a[g+"Setter"]=function(a,f,q){h.prototype[g+"Setter"].call(this,a,f,q);b[f]=a;};});a.addedSetters=!0;},B=a.charts[u.chartIndex],B=B&&B.styledMode;b.textSetter=function(a){a!==n.innerHTML&&delete this.bBox;this.textStr=a;n.innerHTML=w(a,"");b.doTransform=!0;};l&&r(b,b.element.style);
b.xSetter=b.ySetter=b.alignSetter=b.rotationSetter=function(a,g){"align"===g&&(g="textAlign");b[g]=a;b.doTransform=!0;};b.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1);};b.attr({text:e,x:Math.round(d),y:Math.round(g)}).css({position:"absolute"});B||b.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});n.style.whiteSpace="nowrap";b.css=b.htmlCss;l&&(b.add=function(a){var g,d=u.box.parentNode,e=[];if(this.parentGroup=a){if(g=a.div,!g){for(;a;)e.push(a),
a=a.parentGroup;e.reverse().forEach(function(a){function f(f,q){a[q]=f;"translateX"===q?m.left=f+"px":m.top=f+"px";a.doTransform=!0;}var m,h=y(a.element,"class");h&&(h={className:h});g=a.div=a.div||F("div",h,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},g||d);m=g.style;c(a,{classSetter:function(a){return function(f){this.element.setAttribute("class",f);a.className=f;}}(g),on:function(){e[0].div&&
b.on.apply({element:e[0].div},arguments);return a},translateXSetter:f,translateYSetter:f});a.addedSetters||r(a,m);});}}else g=d;g.appendChild(n);b.added=!0;b.alignOnAdd&&b.htmlUpdateTransform();return b});return b}});})(I);(function(a){var y=a.defined,F=a.extend,G=a.merge,k=a.pick,c=a.timeUnits,p=a.win;a.Time=function(a){this.update(a,!1);};a.Time.prototype={defaultOptions:{},update:function(a){var c=k(a&&a.useUTC,!0),w=this;this.options=a=G(!0,this.options||{},a);this.Date=a.Date||p.Date||Date;this.timezoneOffset=
(this.useUTC=c)&&a.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=!(c&&!a.getTimezoneOffset&&!a.timezone))||this.timezoneOffset?(this.get=function(a,h){var e=h.getTime(),l=e-w.getTimezoneOffset(h);h.setTime(l);a=h["getUTC"+a]();h.setTime(e);return a},this.set=function(a,h,e){var l;if("Milliseconds"===a||"Seconds"===a||"Minutes"===a&&0===h.getTimezoneOffset()%60)h["set"+a](e);else l=w.getTimezoneOffset(h),l=h.getTime()-l,h.setTime(l),h["setUTC"+a](e),a=w.getTimezoneOffset(h),
l=h.getTime()+a,h.setTime(l);}):c?(this.get=function(a,h){return h["getUTC"+a]()},this.set=function(a,h,e){return h["setUTC"+a](e)}):(this.get=function(a,h){return h["get"+a]()},this.set=function(a,h,e){return h["set"+a](e)});},makeTime:function(c,p,w,r,h,e){var l,n,d;this.useUTC?(l=this.Date.UTC.apply(0,arguments),n=this.getTimezoneOffset(l),l+=n,d=this.getTimezoneOffset(l),n!==d?l+=d-n:n-36E5!==this.getTimezoneOffset(l-36E5)||a.isSafari||(l-=36E5)):l=(new this.Date(c,p,k(w,1),k(r,0),k(h,0),k(e,0))).getTime();
return l},timezoneOffsetFunction:function(){var c=this,k=this.options,w=p.moment;if(!this.useUTC)return function(a){return 6E4*(new Date(a)).getTimezoneOffset()};if(k.timezone){if(w)return function(a){return 6E4*-w.tz(a,k.timezone).utcOffset()};a.error(25);}return this.useUTC&&k.getTimezoneOffset?function(a){return 6E4*k.getTimezoneOffset(a)}:function(){return 6E4*(c.timezoneOffset||0)}},dateFormat:function(c,k,w){if(!a.defined(k)||isNaN(k))return a.defaultOptions.lang.invalidDate||"";c=a.pick(c,"%Y-%m-%d %H:%M:%S");
var r=this,h=new this.Date(k),e=this.get("Hours",h),l=this.get("Day",h),n=this.get("Date",h),d=this.get("Month",h),g=this.get("FullYear",h),b=a.defaultOptions.lang,x=b.weekdays,u=b.shortWeekdays,H=a.pad,h=a.extend({a:u?u[l]:x[l].substr(0,3),A:x[l],d:H(n),e:H(n,2," "),w:l,b:b.shortMonths[d],B:b.months[d],m:H(d+1),o:d+1,y:g.toString().substr(2,2),Y:g,H:H(e),k:e,I:H(e%12||12),l:e%12||12,M:H(r.get("Minutes",h)),p:12>e?"AM":"PM",P:12>e?"am":"pm",S:H(h.getSeconds()),L:H(Math.floor(k%1E3),3)},a.dateFormats);
a.objectEach(h,function(a,b){for(;-1!==c.indexOf("%"+b);)c=c.replace("%"+b,"function"===typeof a?a.call(r,k):a);});return w?c.substr(0,1).toUpperCase()+c.substr(1):c},resolveDTLFormat:function(c){return a.isObject(c,!0)?c:(c=a.splat(c),{main:c[0],from:c[1],to:c[2]})},getTimeTicks:function(a,p,w,r){var h=this,e=[],l,n={},d;l=new h.Date(p);var g=a.unitRange,b=a.count||1,x;r=k(r,1);if(y(p)){h.set("Milliseconds",l,g>=c.second?0:b*Math.floor(h.get("Milliseconds",l)/b));g>=c.second&&h.set("Seconds",l,g>=
c.minute?0:b*Math.floor(h.get("Seconds",l)/b));g>=c.minute&&h.set("Minutes",l,g>=c.hour?0:b*Math.floor(h.get("Minutes",l)/b));g>=c.hour&&h.set("Hours",l,g>=c.day?0:b*Math.floor(h.get("Hours",l)/b));g>=c.day&&h.set("Date",l,g>=c.month?1:Math.max(1,b*Math.floor(h.get("Date",l)/b)));g>=c.month&&(h.set("Month",l,g>=c.year?0:b*Math.floor(h.get("Month",l)/b)),d=h.get("FullYear",l));g>=c.year&&h.set("FullYear",l,d-d%b);g===c.week&&(d=h.get("Day",l),h.set("Date",l,h.get("Date",l)-d+r+(d<r?-7:0)));d=h.get("FullYear",
l);r=h.get("Month",l);var u=h.get("Date",l),H=h.get("Hours",l);p=l.getTime();h.variableTimezone&&(x=w-p>4*c.month||h.getTimezoneOffset(p)!==h.getTimezoneOffset(w));p=l.getTime();for(l=1;p<w;)e.push(p),p=g===c.year?h.makeTime(d+l*b,0):g===c.month?h.makeTime(d,r+l*b):!x||g!==c.day&&g!==c.week?x&&g===c.hour&&1<b?h.makeTime(d,r,u,H+l*b):p+g*b:h.makeTime(d,r,u+l*b*(g===c.day?1:7)),l++;e.push(p);g<=c.hour&&1E4>e.length&&e.forEach(function(a){0===a%18E5&&"000000000"===h.dateFormat("%H%M%S%L",a)&&(n[a]="day");});}e.info=
F(a,{higherRanks:n,totalRange:g*b});return e}};})(I);(function(a){var y=a.color,F=a.merge;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:a.Time.prototype.defaultOptions,chart:{styledMode:!1,borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",
margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},
shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",
day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',backgroundColor:y("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",
whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(y){a.defaultOptions=F(!0,a.defaultOptions,y);a.time.update(F(a.defaultOptions.global,a.defaultOptions.time),!1);return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;a.time=new a.Time(F(a.defaultOptions.global,
a.defaultOptions.time));a.dateFormat=function(y,k,c){return a.time.dateFormat(y,k,c)};})(I);(function(a){var y=a.correctFloat,F=a.defined,G=a.destroyObjectProperties,k=a.fireEvent,c=a.isNumber,p=a.merge,t=a.pick,v=a.deg2rad;a.Tick=function(a,c,h,e,l){this.axis=a;this.pos=c;this.type=h||"";this.isNewLabel=this.isNew=!0;this.parameters=l||{};this.tickmarkOffset=this.parameters.tickmarkOffset;this.options=this.parameters.options;h||e||this.addLabel();};a.Tick.prototype={addLabel:function(){var c=this,
r=c.axis,h=r.options,e=r.chart,l=r.categories,n=r.names,d=c.pos,g=t(c.options&&c.options.labels,h.labels),b=r.tickPositions,x=d===b[0],u=d===b[b.length-1],l=this.parameters.category||(l?t(l[d],n[d],d):d),k=c.label,b=b.info,E,B,m,z;r.isDatetimeAxis&&b&&(B=e.time.resolveDTLFormat(h.dateTimeLabelFormats[!h.grid&&b.higherRanks[d]||b.unitName]),E=B.main);c.isFirst=x;c.isLast=u;c.formatCtx={axis:r,chart:e,isFirst:x,isLast:u,dateTimeLabelFormat:E,tickPositionInfo:b,value:r.isLog?y(r.lin2log(l)):l,pos:d};
h=r.labelFormatter.call(c.formatCtx,this.formatCtx);if(z=B&&B.list)c.shortenLabel=function(){for(m=0;m<z.length;m++)if(k.attr({text:r.labelFormatter.call(a.extend(c.formatCtx,{dateTimeLabelFormat:z[m]}))}),k.getBBox().width<r.getSlotWidth(c)-2*t(g.padding,5))return;k.attr({text:""});};if(F(k))k&&k.textStr!==h&&(!k.textWidth||g.style&&g.style.width||k.styles.width||k.css({width:null}),k.attr({text:h}));else{if(c.label=k=F(h)&&g.enabled?e.renderer.text(h,0,0,g.useHTML).add(r.labelGroup):null)e.styledMode||
k.css(p(g.style)),k.textPxLength=k.getBBox().width;c.rotation=0;}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var c=this.axis,h=c.options.labels,e=a.x,l=c.chart.chartWidth,n=c.chart.spacing,d=t(c.labelLeft,Math.min(c.pos,n[3])),n=t(c.labelRight,Math.max(c.isRadial?0:c.pos+c.len,l-n[1])),g=this.label,b=this.rotation,x={left:0,center:.5,right:1}[c.labelAlign||g.attr("align")],u=g.getBBox().width,k=c.getSlotWidth(this),
E=k,B=1,m,z={};if(b||"justify"!==t(h.overflow,"justify"))0>b&&e-x*u<d?m=Math.round(e/Math.cos(b*v)-d):0<b&&e+x*u>n&&(m=Math.round((l-e)/Math.cos(b*v)));else if(l=e+(1-x)*u,e-x*u<d?E=a.x+E*(1-x)-d:l>n&&(E=n-a.x+E*x,B=-1),E=Math.min(k,E),E<k&&"center"===c.labelAlign&&(a.x+=B*(k-E-x*(k-Math.min(u,E)))),u>E||c.autoRotation&&(g.styles||{}).width)m=E;m&&(this.shortenLabel?this.shortenLabel():(z.width=Math.floor(m),(h.style||{}).textOverflow||(z.textOverflow="ellipsis"),g.css(z)));},getPosition:function(c,
r,h,e){var l=this.axis,n=l.chart,d=e&&n.oldChartHeight||n.chartHeight;c={x:c?a.correctFloat(l.translate(r+h,null,null,e)+l.transB):l.left+l.offset+(l.opposite?(e&&n.oldChartWidth||n.chartWidth)-l.right-l.left:0),y:c?d-l.bottom+l.offset-(l.opposite?l.height:0):a.correctFloat(d-l.translate(r+h,null,null,e)-l.transB)};k(this,"afterGetPosition",{pos:c});return c},getLabelPosition:function(a,c,h,e,l,n,d,g){var b=this.axis,x=b.transA,u=b.reversed,r=b.staggerLines,E=b.tickRotCorr||{x:0,y:0},B=l.y,m=e||b.reserveSpaceDefault?
0:-b.labelOffset*("center"===b.labelAlign?.5:1),z={};F(B)||(B=0===b.side?h.rotation?-8:-h.getBBox().height:2===b.side?E.y+8:Math.cos(h.rotation*v)*(E.y-h.getBBox(!1,0).height/2));a=a+l.x+m+E.x-(n&&e?n*x*(u?-1:1):0);c=c+B-(n&&!e?n*x*(u?1:-1):0);r&&(h=d/(g||1)%r,b.opposite&&(h=r-h-1),c+=b.labelOffset/r*h);z.x=a;z.y=Math.round(c);k(this,"afterGetLabelPosition",{pos:z,tickmarkOffset:n,index:d});return z},getMarkPath:function(a,c,h,e,l,n){return n.crispLine(["M",a,c,"L",a+(l?0:-h),c+(l?h:0)],e)},renderGridLine:function(a,
c,h){var e=this.axis,l=e.options,n=this.gridLine,d={},g=this.pos,b=this.type,x=t(this.tickmarkOffset,e.tickmarkOffset),u=e.chart.renderer,r=b?b+"Grid":"grid",k=l[r+"LineWidth"],B=l[r+"LineColor"],l=l[r+"LineDashStyle"];n||(e.chart.styledMode||(d.stroke=B,d["stroke-width"]=k,l&&(d.dashstyle=l)),b||(d.zIndex=1),a&&(c=0),this.gridLine=n=u.path().attr(d).addClass("highcharts-"+(b?b+"-":"")+"grid-line").add(e.gridGroup));if(n&&(h=e.getPlotLinePath(g+x,n.strokeWidth()*h,a,"pass")))n[a||this.isNew?"attr":
"animate"]({d:h,opacity:c});},renderMark:function(a,c,h){var e=this.axis,l=e.options,n=e.chart.renderer,d=this.type,g=d?d+"Tick":"tick",b=e.tickSize(g),x=this.mark,u=!x,r=a.x;a=a.y;var k=t(l[g+"Width"],!d&&e.isXAxis?1:0),l=l[g+"Color"];b&&(e.opposite&&(b[0]=-b[0]),u&&(this.mark=x=n.path().addClass("highcharts-"+(d?d+"-":"")+"tick").add(e.axisGroup),e.chart.styledMode||x.attr({stroke:l,"stroke-width":k})),x[u?"attr":"animate"]({d:this.getMarkPath(r,a,b[0],x.strokeWidth()*h,e.horiz,n),opacity:c}));},
renderLabel:function(a,r,h,e){var l=this.axis,n=l.horiz,d=l.options,g=this.label,b=d.labels,x=b.step,l=t(this.tickmarkOffset,l.tickmarkOffset),u=!0,k=a.x;a=a.y;g&&c(k)&&(g.xy=a=this.getLabelPosition(k,a,g,n,b,l,e,x),this.isFirst&&!this.isLast&&!t(d.showFirstLabel,1)||this.isLast&&!this.isFirst&&!t(d.showLastLabel,1)?u=!1:!n||b.step||b.rotation||r||0===h||this.handleOverflow(a),x&&e%x&&(u=!1),u&&c(a.y)?(a.opacity=h,g[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(g.attr("y",-9999),this.isNewLabel=
!0));},render:function(c,r,h){var e=this.axis,l=e.horiz,n=this.pos,d=t(this.tickmarkOffset,e.tickmarkOffset),n=this.getPosition(l,n,d,r),d=n.x,g=n.y,e=l&&d===e.pos+e.len||!l&&g===e.pos?-1:1;h=t(h,1);this.isActive=!0;this.renderGridLine(r,h,e);this.renderMark(n,h,e);this.renderLabel(n,r,h,c);this.isNew=!1;a.fireEvent(this,"afterRender");},destroy:function(){G(this,this.axis);}};})(I);var X=function(a){var y=a.addEvent,F=a.animObject,G=a.arrayMax,k=a.arrayMin,c=a.color,p=a.correctFloat,t=a.defaultOptions,
v=a.defined,w=a.deg2rad,r=a.destroyObjectProperties,h=a.extend,e=a.fireEvent,l=a.format,n=a.getMagnitude,d=a.isArray,g=a.isNumber,b=a.isString,x=a.merge,u=a.normalizeTickInterval,H=a.objectEach,E=a.pick,B=a.removeEvent,m=a.splat,z=a.syncTimeout,D=a.Tick,A=function(){this.init.apply(this,arguments);};a.extend(A.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",range:!1},second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},
week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,labels:{enabled:!0,indentation:10,x:0,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",
lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{color:"#000000",fontSize:"11px",fontWeight:"bold",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},
title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},init:function(a,q){var f=q.isX,b=this;b.chart=a;b.horiz=a.inverted&&!b.isZAxis?!f:f;b.isXAxis=f;b.coll=b.coll||(f?"xAxis":"yAxis");e(this,"init",{userOptions:q});b.opposite=q.opposite;b.side=q.side||(b.horiz?b.opposite?0:2:b.opposite?1:3);b.setOptions(q);var g=this.options,d=g.type;b.labelFormatter=g.labels.formatter||
b.defaultLabelFormatter;b.userOptions=q;b.minPixelPadding=0;b.reversed=g.reversed;b.visible=!1!==g.visible;b.zoomEnabled=!1!==g.zoomEnabled;b.hasNames="category"===d||!0===g.categories;b.categories=g.categories||b.hasNames;b.names||(b.names=[],b.names.keys={});b.plotLinesAndBandsGroups={};b.isLog="logarithmic"===d;b.isDatetimeAxis="datetime"===d;b.positiveValuesOnly=b.isLog&&!b.allowNegativeLog;b.isLinked=v(g.linkedTo);b.ticks={};b.labelEdge=[];b.minorTicks={};b.plotLinesAndBands=[];b.alternateBands=
{};b.len=0;b.minRange=b.userMinRange=g.minRange||g.maxZoom;b.range=g.range;b.offset=g.offset||0;b.stacks={};b.oldStacks={};b.stacksTouched=0;b.max=null;b.min=null;b.crosshair=E(g.crosshair,m(a.options.tooltip.crosshairs)[f?0:1],!1);q=b.options.events;-1===a.axes.indexOf(b)&&(f?a.axes.splice(a.xAxis.length,0,b):a.axes.push(b),a[b.coll].push(b));b.series=b.series||[];a.inverted&&!b.isZAxis&&f&&void 0===b.reversed&&(b.reversed=!0);H(q,function(a,f){y(b,f,a);});b.lin2log=g.linearToLogConverter||b.lin2log;
b.isLog&&(b.val2lin=b.log2lin,b.lin2val=b.lin2log);e(this,"afterInit");},setOptions:function(a){this.options=x(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],x(t[this.coll],a));e(this,"afterSetOptions",{userOptions:a});},defaultLabelFormatter:function(){var f=this.axis,q=this.value,b=f.chart.time,g=f.categories,d=this.dateTimeLabelFormat,e=t.lang,m=e.numericSymbols,
e=e.numericSymbolMagnitude||1E3,h=m&&m.length,n,c=f.options.labels.format,f=f.isLog?Math.abs(q):f.tickInterval;if(c)n=l(c,this,b);else if(g)n=q;else if(d)n=b.dateFormat(d,q);else if(h&&1E3<=f)for(;h--&&void 0===n;)b=Math.pow(e,h+1),f>=b&&0===10*q%b&&null!==m[h]&&0!==q&&(n=a.numberFormat(q/b,-1)+m[h]);void 0===n&&(n=1E4<=Math.abs(q)?a.numberFormat(q,-1):a.numberFormat(q,-1,void 0,""));return n},getSeriesExtremes:function(){var a=this,q=a.chart;e(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=
!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();a.series.forEach(function(f){if(f.visible||!q.options.chart.ignoreHiddenSeries){var b=f.options,d=b.threshold,e;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=d&&(d=null);if(a.isXAxis)b=f.xData,b.length&&(f=k(b),e=G(b),g(f)||f instanceof Date||(b=b.filter(g),f=k(b),e=G(b)),b.length&&(a.dataMin=Math.min(E(a.dataMin,b[0],f),f),a.dataMax=Math.max(E(a.dataMax,b[0],e),e)));else if(f.getExtremes(),e=f.dataMax,
f=f.dataMin,v(f)&&v(e)&&(a.dataMin=Math.min(E(a.dataMin,f),f),a.dataMax=Math.max(E(a.dataMax,e),e)),v(d)&&(a.threshold=d),!b.softThreshold||a.positiveValuesOnly)a.softThreshold=!1;}});});e(this,"afterGetSeriesExtremes");},translate:function(a,q,b,d,e,m){var f=this.linkedParent||this,h=1,n=0,c=d?f.oldTransA:f.transA;d=d?f.oldMin:f.min;var u=f.minPixelPadding;e=(f.isOrdinal||f.isBroken||f.isLog&&e)&&f.lin2val;c||(c=f.transA);b&&(h*=-1,n=f.len);f.reversed&&(h*=-1,n-=h*(f.sector||f.len));q?(a=(a*h+n-u)/
c+d,e&&(a=f.lin2val(a))):(e&&(a=f.val2lin(a)),a=g(d)?h*(a-d)*c+n+h*u+(g(m)?c*m:0):void 0);return a},toPixels:function(a,q){return this.translate(a,!1,!this.horiz,null,!0)+(q?0:this.pos)},toValue:function(a,q){return this.translate(a-(q?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,q,b,d,m){var f=this,h=f.chart,n=f.left,c=f.top,u,l,z,x,D=b&&h.oldChartHeight||h.chartHeight,r=b&&h.oldChartWidth||h.chartWidth,k,L=f.transB,A,B=function(a,f,q){if("pass"!==d&&a<f||a>q)d?a=Math.min(Math.max(f,
a),q):k=!0;return a};A={value:a,lineWidth:q,old:b,force:d,translatedValue:m};e(this,"getPlotLinePath",A,function(e){m=E(m,f.translate(a,null,null,b));m=Math.min(Math.max(-1E5,m),1E5);u=z=Math.round(m+L);l=x=Math.round(D-m-L);g(m)?f.horiz?(l=c,x=D-f.bottom,u=z=B(u,n,n+f.width)):(u=n,z=r-f.right,l=x=B(l,c,c+f.height)):(k=!0,d=!1);e.path=k&&!d?null:h.renderer.crispLine(["M",u,l,"L",z,x],q||1);});return A.path},getLinearTickPositions:function(a,q,b){var f,g=p(Math.floor(q/a)*a);b=p(Math.ceil(b/a)*a);var d=
[],e;p(g+a)===g&&(e=20);if(this.single)return [q];for(q=g;q<=b;){d.push(q);q=p(q+a,e);if(q===f)break;f=q;}return d},getMinorTickInterval:function(){var a=this.options;return !0===a.minorTicks?E(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,q=a.options,b=a.tickPositions,g=a.minorTickInterval,d=[],e=a.pointRangePadding||0,m=a.min-e,e=a.max+e,h=e-m;if(h&&h/g<a.len/3)if(a.isLog)this.paddedTicks.forEach(function(f,q,b){q&&d.push.apply(d,
a.getLogTickPositions(g,b[q-1],b[q],!0));});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())d=d.concat(a.getTimeTicks(a.normalizeTimeTickInterval(g),m,e,q.startOfWeek));else for(q=m+(b[0]-m)%g;q<=e&&q!==d[0];q+=g)d.push(q);0!==d.length&&a.trimTicks(d);return d},adjustForMinRange:function(){var a=this.options,q=this.min,b=this.max,g,d,e,m,h,n,c,u;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(v(a.min)||v(a.max)?this.minRange=null:(this.series.forEach(function(a){n=a.xData;for(m=
c=a.xIncrement?1:n.length-1;0<m;m--)if(h=n[m]-n[m-1],void 0===e||h<e)e=h;}),this.minRange=Math.min(5*e,this.dataMax-this.dataMin)));b-q<this.minRange&&(d=this.dataMax-this.dataMin>=this.minRange,u=this.minRange,g=(u-b+q)/2,g=[q-g,E(a.min,q-g)],d&&(g[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),q=G(g),b=[q+u,E(a.max,q+u)],d&&(b[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),b=k(b),b-q<u&&(g[0]=b-u,g[1]=E(a.min,b-u),q=G(g)));this.min=q;this.max=b;},getClosest:function(){var a;this.categories?
a=1:this.series.forEach(function(f){var q=f.closestPointRange,b=f.visible||!f.chart.options.chart.ignoreHiddenSeries;!f.noSharedTooltip&&v(q)&&b&&(a=v(a)?Math.min(a,q):q);});return a},nameToX:function(a){var f=d(this.categories),b=f?this.categories:this.names,g=a.options.x,e;a.series.requireSorting=!1;v(g)||(g=!1===this.options.uniqueNames?a.series.autoIncrement():f?b.indexOf(a.name):E(b.keys[a.name],-1));-1===g?f||(e=b.length):e=g;void 0!==e&&(this.names[e]=a.name,this.names.keys[a.name]=e);return e},
updateNames:function(){var a=this,q=this.names;0<q.length&&(Object.keys(q.keys).forEach(function(a){delete q.keys[a];}),q.length=0,this.minRange=this.userMinRange,(this.series||[]).forEach(function(f){f.xIncrement=null;if(!f.points||f.isDirtyData)a.max=Math.max(a.max,f.xData.length-1),f.processData(),f.generatePoints();f.data.forEach(function(q,b){var g;q&&q.options&&void 0!==q.name&&(g=a.nameToX(q),void 0!==g&&g!==q.x&&(q.x=g,f.xData[b]=g));});}));},setAxisTranslation:function(a){var f=this,g=f.max-
f.min,d=f.axisPointRange||0,m,h=0,n=0,c=f.linkedParent,u=!!f.categories,l=f.transA,z=f.isXAxis;if(z||u||d)m=f.getClosest(),c?(h=c.minPointOffset,n=c.pointRangePadding):f.series.forEach(function(a){var q=u?1:z?E(a.options.pointRange,m,0):f.axisPointRange||0;a=a.options.pointPlacement;d=Math.max(d,q);f.single||(h=Math.max(h,z&&b(a)?0:q/2),n=Math.max(n,z&&"on"===a?0:q));}),c=f.ordinalSlope&&m?f.ordinalSlope/m:1,f.minPointOffset=h*=c,f.pointRangePadding=n*=c,f.pointRange=Math.min(d,g),z&&(f.closestPointRange=
m);a&&(f.oldTransA=l);f.translationSlope=f.transA=l=f.staticScale||f.len/(g+n||1);f.transB=f.horiz?f.left:f.bottom;f.minPixelPadding=l*h;e(this,"afterSetAxisTranslation");},minFromRange:function(){return this.max-this.range},setTickInterval:function(f){var b=this,d=b.chart,m=b.options,h=b.isLog,c=b.isDatetimeAxis,l=b.isXAxis,z=b.isLinked,x=m.maxPadding,D=m.minPadding,r,k=m.tickInterval,A=m.tickPixelInterval,B=b.categories,H=g(b.threshold)?b.threshold:null,w=b.softThreshold,t,y,G;c||B||z||this.getTickAmount();
y=E(b.userMin,m.min);G=E(b.userMax,m.max);z?(b.linkedParent=d[b.coll][m.linkedTo],r=b.linkedParent.getExtremes(),b.min=E(r.min,r.dataMin),b.max=E(r.max,r.dataMax),m.type!==b.linkedParent.options.type&&a.error(11,1,d)):(!w&&v(H)&&(b.dataMin>=H?(r=H,D=0):b.dataMax<=H&&(t=H,x=0)),b.min=E(y,r,b.dataMin),b.max=E(G,t,b.dataMax));h&&(b.positiveValuesOnly&&!f&&0>=Math.min(b.min,E(b.dataMin,b.min))&&a.error(10,1,d),b.min=p(b.log2lin(b.min),15),b.max=p(b.log2lin(b.max),15));b.range&&v(b.max)&&(b.userMin=b.min=
y=Math.max(b.dataMin,b.minFromRange()),b.userMax=G=b.max,b.range=null);e(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();!(B||b.axisPointRange||b.usePercentage||z)&&v(b.min)&&v(b.max)&&(d=b.max-b.min)&&(!v(y)&&D&&(b.min-=d*D),!v(G)&&x&&(b.max+=d*x));g(m.softMin)&&!g(b.userMin)&&(b.min=Math.min(b.min,m.softMin));g(m.softMax)&&!g(b.userMax)&&(b.max=Math.max(b.max,m.softMax));g(m.floor)&&(b.min=Math.min(Math.max(b.min,m.floor),Number.MAX_VALUE));g(m.ceiling)&&(b.max=Math.max(Math.min(b.max,
m.ceiling),E(b.userMax,-Number.MAX_VALUE)));w&&v(b.dataMin)&&(H=H||0,!v(y)&&b.min<H&&b.dataMin>=H?b.min=H:!v(G)&&b.max>H&&b.dataMax<=H&&(b.max=H));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:z&&!k&&A===b.linkedParent.options.tickPixelInterval?k=b.linkedParent.tickInterval:E(k,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,B?1:(b.max-b.min)*A/Math.max(b.len,A));l&&!f&&b.series.forEach(function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax);});b.setAxisTranslation(!0);
b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!k&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));f=E(m.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);!k&&b.tickInterval<f&&(b.tickInterval=f);c||h||k||(b.tickInterval=u(b.tickInterval,null,n(b.tickInterval),E(m.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=
b.unsquish());this.setTickPositions();},setTickPositions:function(){var f=this.options,b,g=f.tickPositions;b=this.getMinorTickInterval();var d=f.tickPositioner,m=f.startOnTick,h=f.endOnTick;this.tickmarkOffset=this.categories&&"between"===f.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===b&&this.tickInterval?this.tickInterval/5:b;this.single=this.min===this.max&&v(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==f.allowDecimals);this.tickPositions=
b=g&&g.slice();!b&&(!this.ordinalPositions&&(this.max-this.min)/this.tickInterval>Math.max(2*this.len,200)?(b=[this.min,this.max],a.error(19,!1,this.chart)):b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,f.units),this.min,this.max,f.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],
b.pop()],b[0]===b[1]&&(b.length=1)),this.tickPositions=b,d&&(d=d.apply(this,[this.min,this.max])))&&(this.tickPositions=b=d);this.paddedTicks=b.slice(0);this.trimTicks(b,m,h);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),g||d||this.adjustTickAmount());e(this,"afterSetTickPositions");},trimTicks:function(a,b,g){var f=a[0],d=a[a.length-1],q=this.minPointOffset||0;e(this,"trimTicks");if(!this.isLinked){if(b&&-Infinity!==f)this.min=f;else for(;this.min-q>a[0];)a.shift();if(g)this.max=
d;else for(;this.max+q<a[a.length-1];)a.pop();0===a.length&&v(f)&&!this.options.tickPositions&&a.push((d+f)/2);}},alignToOthers:function(){var a={},b,g=this.options;!1===this.chart.options.chart.alignTicks||!1===g.alignTicks||!1===g.startOnTick||!1===g.endOnTick||this.isLog||this.chart[this.coll].forEach(function(f){var g=f.options,g=[f.horiz?g.left:g.top,g.width,g.height,g.pane].join();f.series.length&&(a[g]?b=!0:a[g]=1);});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,g=a.tickPixelInterval;
!v(a.tickInterval)&&this.len<g&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/g)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b;},adjustTickAmount:function(){var a=this.options,b=this.tickInterval,g=this.tickPositions,d=this.tickAmount,e=this.finalTickAmt,m=g&&g.length,h=E(this.threshold,this.softThreshold?0:null),n;if(this.hasData()){if(m<d){for(n=this.min;g.length<d;)g.length%2||n===h?g.push(p(g[g.length-1]+b)):g.unshift(p(g[0]-
b));this.transA*=(m-1)/(d-1);this.min=a.startOnTick?g[0]:Math.min(this.min,g[0]);this.max=a.endOnTick?g[g.length-1]:Math.max(this.max,g[g.length-1]);}else m>d&&(this.tickInterval*=2,this.setTickPositions());if(v(e)){for(b=a=g.length;b--;)(3===e&&1===b%2||2>=e&&0<b&&b<a-1)&&g.splice(b,1);this.finalTickAmt=void 0;}}},setScale:function(){var a=this.series.some(function(a){return a.isDirtyData||a.isDirty||a.xAxis.isDirty}),b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();
(b=this.len!==this.oldAxisLength)||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();e(this,"afterSetScale");},setExtremes:function(a,b,g,d,m){var f=this,
q=f.chart;g=E(g,!0);f.series.forEach(function(a){delete a.kdTree;});m=h(m,{min:a,max:b});e(f,"setExtremes",m,function(){f.userMin=a;f.userMax=b;f.eventArgs=m;g&&q.redraw(d);});},zoom:function(a,b){var f=this.dataMin,g=this.dataMax,d=this.options,q=Math.min(f,E(d.min,f)),m=Math.max(g,E(d.max,g));a={newMin:a,newMax:b};e(this,"zoom",a,function(a){var b=a.newMin,d=a.newMax;if(b!==this.min||d!==this.max)this.allowZoomOutside||(v(f)&&(b<q&&(b=q),b>m&&(b=m)),v(g)&&(d<q&&(d=q),d>m&&(d=m))),this.displayBtn=void 0!==
b||void 0!==d,this.setExtremes(b,d,!1,void 0,{trigger:"zoom"});a.zoomed=!0;});return a.zoomed},setAxisSize:function(){var f=this.chart,b=this.options,g=b.offsets||[0,0,0,0],d=this.horiz,e=this.width=Math.round(a.relativeLength(E(b.width,f.plotWidth-g[3]+g[1]),f.plotWidth)),m=this.height=Math.round(a.relativeLength(E(b.height,f.plotHeight-g[0]+g[2]),f.plotHeight)),h=this.top=Math.round(a.relativeLength(E(b.top,f.plotTop+g[0]),f.plotHeight,f.plotTop)),b=this.left=Math.round(a.relativeLength(E(b.left,
f.plotLeft+g[3]),f.plotWidth,f.plotLeft));this.bottom=f.chartHeight-m-h;this.right=f.chartWidth-e-b;this.len=Math.max(d?e:m,0);this.pos=d?b:h;},getExtremes:function(){var a=this.isLog;return {min:a?p(this.lin2log(this.min)):this.min,max:a?p(this.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var f=this.isLog,b=f?this.lin2log(this.min):this.min,f=f?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=b:Infinity===
a?a=f:b>a?a=b:f<a&&(a=f);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){var f=(E(a,0)-90*this.side+720)%360;a={align:"center"};e(this,"autoLabelAlign",a,function(a){15<f&&165>f?a.align="right":195<f&&345>f&&(a.align="left");});return a.align},tickSize:function(a){var f=this.options,b=f[a+"Length"],g=E(f[a+"Width"],"tick"===a&&this.isXAxis?1:0),d;g&&b&&("inside"===f[a+"Position"]&&(b=-b),d=[b,g]);a={tickSize:d};e(this,"afterTickSize",a);return a.tickSize},labelMetrics:function(){var a=
this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,g=this.tickInterval,d=g,e=this.len/(((this.categories?1:0)+this.max-this.min)/g),m,h=a.rotation,n=this.labelMetrics(),c,u=Number.MAX_VALUE,z,l=this.max-this.min,x=function(a){var f=a/(e||1),f=1<f?Math.ceil(f):1;f*g>l&&Infinity!==a&&Infinity!==e&&(f=Math.ceil(l/
g));return p(f*g)};b?(z=!a.staggerLines&&!a.step&&(v(h)?[h]:e<E(a.autoRotationLimit,80)&&a.autoRotation))&&z.forEach(function(a){var f;if(a===h||a&&-90<=a&&90>=a)c=x(Math.abs(n.h/Math.sin(w*a))),f=c+Math.abs(a/360),f<u&&(u=f,m=a,d=c);}):a.step||(d=x(n.h));this.autoRotation=z;this.labelRotation=E(m,h);return d},getSlotWidth:function(a){var f=this.chart,b=this.horiz,g=this.options.labels,d=Math.max(this.tickPositions.length-(this.categories?0:1),1),e=f.margin[3];return a&&a.slotWidth||b&&2>(g.step||
0)&&!g.rotation&&(this.staggerLines||1)*this.len/d||!b&&(g.style&&parseInt(g.style.width,10)||e&&e-f.spacing[3]||.33*f.chartWidth)},renderUnsquish:function(){var a=this.chart,g=a.renderer,d=this.tickPositions,e=this.ticks,m=this.options.labels,h=m&&m.style||{},n=this.horiz,c=this.getSlotWidth(),u=Math.max(1,Math.round(c-2*(m.padding||5))),z={},l=this.labelMetrics(),x=m.style&&m.style.textOverflow,D,r,k=0,A;b(m.rotation)||(z.rotation=m.rotation||0);d.forEach(function(a){(a=e[a])&&a.label&&a.label.textPxLength>
k&&(k=a.label.textPxLength);});this.maxLabelLength=k;if(this.autoRotation)k>u&&k>l.h?z.rotation=this.labelRotation:this.labelRotation=0;else if(c&&(D=u,!x))for(r="clip",u=d.length;!n&&u--;)if(A=d[u],A=e[A].label)A.styles&&"ellipsis"===A.styles.textOverflow?A.css({textOverflow:"clip"}):A.textPxLength>c&&A.css({width:c+"px"}),A.getBBox().height>this.len/d.length-(l.h-l.f)&&(A.specificTextOverflow="ellipsis");z.rotation&&(D=k>.5*a.chartHeight?.33*a.chartHeight:k,x||(r="ellipsis"));if(this.labelAlign=
m.align||this.autoLabelAlign(this.labelRotation))z.align=this.labelAlign;d.forEach(function(a){var f=(a=e[a])&&a.label,b=h.width,g={};f&&(f.attr(z),a.shortenLabel?a.shortenLabel():D&&!b&&"nowrap"!==h.whiteSpace&&(D<f.textPxLength||"SPAN"===f.element.tagName)?(g.width=D,x||(g.textOverflow=f.specificTextOverflow||r),f.css(g)):f.styles&&f.styles.width&&!g.width&&!b&&f.css({width:null}),delete f.specificTextOverflow,a.rotation=z.rotation);},this);this.tickRotCorr=g.rotCorr(l.b,this.labelRotation||0,0!==
this.side);},hasData:function(){return this.hasVisibleSeries||v(this.min)&&v(this.max)&&this.tickPositions&&0<this.tickPositions.length},addTitle:function(a){var f=this.chart.renderer,b=this.horiz,g=this.opposite,d=this.options.title,e,m=this.chart.styledMode;this.axisTitle||((e=d.textAlign)||(e=(b?{low:"left",middle:"center",high:"right"}:{low:g?"right":"left",middle:"center",high:g?"left":"right"})[d.align]),this.axisTitle=f.text(d.text,0,0,d.useHTML).attr({zIndex:7,rotation:d.rotation||0,align:e}).addClass("highcharts-axis-title"),
m||this.axisTitle.css(x(d.style)),this.axisTitle.add(this.axisGroup),this.axisTitle.isNew=!0);m||d.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0);},generateTick:function(a){var f=this.ticks;f[a]?f[a].addLabel():f[a]=new D(this,a);},getOffset:function(){var a=this,b=a.chart,g=b.renderer,d=a.options,m=a.tickPositions,h=a.ticks,n=a.horiz,c=a.side,u=b.inverted&&!a.isZAxis?[1,0,3,2][c]:c,z,l,x=0,D,r=0,k=d.title,A=d.labels,B=0,p=b.axisOffset,b=b.clipOffset,
w=[-1,1,1,-1][c],t=d.className,y=a.axisParent;z=a.hasData();a.showAxis=l=z||E(d.showEmpty,!0);a.staggerLines=a.horiz&&A.staggerLines;a.axisGroup||(a.gridGroup=g.g("grid").attr({zIndex:d.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(t||"")).add(y),a.axisGroup=g.g("axis").attr({zIndex:d.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(t||"")).add(y),a.labelGroup=g.g("axis-labels").attr({zIndex:A.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+
(t||"")).add(y));z||a.isLinked?(m.forEach(function(b,f){a.generateTick(b,f);}),a.renderUnsquish(),a.reserveSpaceDefault=0===c||2===c||{1:"left",3:"right"}[c]===a.labelAlign,E(A.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&m.forEach(function(a){B=Math.max(h[a].getLabelSize(),B);}),a.staggerLines&&(B*=a.staggerLines),a.labelOffset=B*(a.opposite?-1:1)):H(h,function(a,b){a.destroy();delete h[b];});k&&k.text&&!1!==k.enabled&&(a.addTitle(l),l&&!1!==k.reserveSpace&&(a.titleOffset=x=
a.axisTitle.getBBox()[n?"height":"width"],D=k.offset,r=v(D)?0:E(k.margin,n?5:10)));a.renderLine();a.offset=w*E(d.offset,p[c]?p[c]+(d.margin||0):0);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};g=0===c?-a.labelMetrics().h:2===c?a.tickRotCorr.y:0;r=Math.abs(B)+r;B&&(r=r-g+w*(n?E(A.y,a.tickRotCorr.y+8*w):A.x));a.axisTitleMargin=E(D,r);a.getMaxLabelDimensions&&(a.maxLabelDimensions=a.getMaxLabelDimensions(h,m));n=this.tickSize("tick");p[c]=Math.max(p[c],a.axisTitleMargin+x+w*a.offset,r,z&&m.length&&n?n[0]+w*
a.offset:0);d=d.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[u]=Math.max(b[u],d);e(this,"afterGetOffset");},getLinePath:function(a){var b=this.chart,f=this.opposite,g=this.offset,d=this.horiz,e=this.left+(f?this.width:0)+g,g=b.chartHeight-this.bottom-(f?this.height:0)+g;f&&(a*=-1);return b.renderer.crispLine(["M",d?this.left:e,d?g:this.top,"L",d?b.chartWidth-this.right:e,d?g:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}));},getTitlePosition:function(){var a=this.horiz,b=this.left,g=this.top,d=this.len,m=this.options.title,h=a?b:g,n=this.opposite,c=this.offset,u=m.x||0,z=m.y||0,l=this.axisTitle,x=this.chart.renderer.fontMetrics(m.style&&m.style.fontSize,l),l=Math.max(l.getBBox(null,0).height-x.h-1,0),d={low:h+(a?0:d),middle:h+d/2,high:h+(a?d:0)}[m.align],b=(a?g+this.height:b)+(a?1:-1)*(n?-1:1)*this.axisTitleMargin+
[-l,l,x.f,-l][this.side],a={x:a?d+u:b+(n?this.width:0)+c+u,y:a?b+z-(n?this.height:0)+c:d+z};e(this,"afterGetTitlePosition",{titlePosition:a});return a},renderMinorTick:function(a){var b=this.chart.hasRendered&&g(this.oldMin),f=this.minorTicks;f[a]||(f[a]=new D(this,a,"minor"));b&&f[a].isNew&&f[a].render(null,!0);f[a].render(null,!1,1);},renderTick:function(a,b){var f=this.isLinked,d=this.ticks,e=this.chart.hasRendered&&g(this.oldMin);if(!f||a>=this.min&&a<=this.max)d[a]||(d[a]=new D(this,a)),e&&d[a].isNew&&
d[a].render(b,!0,-1),d[a].render(b);},render:function(){var b=this,d=b.chart,m=b.options,h=b.isLog,n=b.isLinked,c=b.tickPositions,u=b.axisTitle,l=b.ticks,x=b.minorTicks,r=b.alternateBands,k=m.stackLabels,A=m.alternateGridColor,B=b.tickmarkOffset,E=b.axisLine,p=b.showAxis,w=F(d.renderer.globalAnimation),t,v;b.labelEdge.length=0;b.overlap=!1;[l,x,r].forEach(function(a){H(a,function(a){a.isActive=!1;});});if(b.hasData()||n)b.minorTickInterval&&!b.categories&&b.getMinorTickPositions().forEach(function(a){b.renderMinorTick(a);}),
c.length&&(c.forEach(function(a,f){b.renderTick(a,f);}),B&&(0===b.min||b.single)&&(l[-1]||(l[-1]=new D(b,-1,null,!0)),l[-1].render(-1))),A&&c.forEach(function(f,g){v=void 0!==c[g+1]?c[g+1]+B:b.max-B;0===g%2&&f<b.max&&v<=b.max+(d.polar?-B:B)&&(r[f]||(r[f]=new a.PlotLineOrBand(b)),t=f+B,r[f].options={from:h?b.lin2log(t):t,to:h?b.lin2log(v):v,color:A},r[f].render(),r[f].isActive=!0);}),b._addedPlotLB||((m.plotLines||[]).concat(m.plotBands||[]).forEach(function(a){b.addPlotBandOrLine(a);}),b._addedPlotLB=
!0);[l,x,r].forEach(function(a){var b,f=[],g=w.duration;H(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,f.push(b));});z(function(){for(b=f.length;b--;)a[f[b]]&&!a[f[b]].isActive&&(a[f[b]].destroy(),delete a[f[b]]);},a!==r&&d.hasRendered&&g?g:0);});E&&(E[E.isPlaced?"animate":"attr"]({d:this.getLinePath(E.strokeWidth())}),E.isPlaced=!0,E[p?"show":"hide"](!0));u&&p&&(m=b.getTitlePosition(),g(m.y)?(u[u.isNew?"attr":"animate"](m),u.isNew=!1):(u.attr("y",-9999),u.isNew=!0));k&&k.enabled&&b.renderStackTotals();
b.isDirty=!1;e(this,"afterRender");},redraw:function(){this.visible&&(this.render(),this.plotLinesAndBands.forEach(function(a){a.render();}));this.series.forEach(function(a){a.isDirty=!0;});},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,f=b.stacks,g=b.plotLinesAndBands,d;e(this,"destroy",{keepEvents:a});a||B(b);H(f,function(a,b){r(a);f[b]=null;});[b.ticks,b.minorTicks,b.alternateBands].forEach(function(a){r(a);});if(g)for(a=g.length;a--;)g[a].destroy();
"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a){b[a]&&(b[a]=b[a].destroy());});for(d in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[d]=b.plotLinesAndBandsGroups[d].destroy();H(b,function(a,f){-1===b.keepProps.indexOf(f)&&delete b[f];});},drawCrosshair:function(a,b){var f,g=this.crosshair,d=E(g.snap,!0),m,h=this.cross;e(this,"drawCrosshair",{e:a,point:b});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(v(b)||!d)){d?v(b)&&
(m=E(b.crosshairPos,this.isXAxis?b.plotX:this.len-b.plotY)):m=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos);v(m)&&(f=this.getPlotLinePath(b&&(this.isXAxis?b.x:E(b.stackY,b.y)),null,null,null,m)||null);if(!v(f)){this.hideCrosshair();return}d=this.categories&&!this.isRadial;h||(this.cross=h=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(d?"category ":"thin ")+g.className).attr({zIndex:E(g.zIndex,2)}).add(),this.chart.styledMode||(h.attr({stroke:g.color||
(d?c("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":E(g.width,1)}).css({"pointer-events":"none"}),g.dashStyle&&h.attr({dashstyle:g.dashStyle})));h.show().attr({d:f});d&&!g.width&&h.attr({"stroke-width":this.transA});this.cross.e=a;}else this.hideCrosshair();e(this,"afterDrawCrosshair",{e:a,point:b});},hideCrosshair:function(){this.cross&&this.cross.hide();e(this,"afterHideCrosshair");}});return a.Axis=A}(I);(function(a){var y=a.Axis,F=a.getMagnitude,G=a.normalizeTickInterval,k=a.timeUnits;
y.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};y.prototype.normalizeTimeTickInterval=function(a,p){var c=p||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];p=c[c.length-1];var v=k[p[0]],w=p[1],r;for(r=0;r<c.length&&!(p=c[r],v=k[p[0]],w=p[1],c[r+1]&&a<=(v*w[w.length-1]+k[c[r+1][0]])/2);r++);v===
k.year&&a<5*v&&(w=[1,2,5]);a=G(a/v,w,"year"===p[0]?Math.max(F(a/v),1):1);return {unitRange:v,count:a,unitName:p[0]}};})(I);(function(a){var y=a.Axis,F=a.getMagnitude,G=a.normalizeTickInterval,k=a.pick;y.prototype.getLogTickPositions=function(a,p,t,v){var c=this.options,r=this.len,h=[];v||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),h=this.getLinearTickPositions(a,p,t);else if(.08<=a)for(var r=Math.floor(p),e,l,n,d,g,c=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];r<t+1&&!g;r++)for(l=
c.length,e=0;e<l&&!g;e++)n=this.log2lin(this.lin2log(r)*c[e]),n>p&&(!v||d<=t)&&void 0!==d&&h.push(d),d>t&&(g=!0),d=n;else p=this.lin2log(p),t=this.lin2log(t),a=v?this.getMinorTickInterval():c.tickInterval,a=k("auto"===a?null:a,this._minorAutoInterval,c.tickPixelInterval/(v?5:1)*(t-p)/((v?r/this.tickPositions.length:r)||1)),a=G(a,null,F(a)),h=this.getLinearTickPositions(a,p,t).map(this.log2lin),v||(this._minorAutoInterval=a/5);v||(this.tickInterval=a);return h};y.prototype.log2lin=function(a){return Math.log(a)/
Math.LN10};y.prototype.lin2log=function(a){return Math.pow(10,a)};})(I);(function(a,y){var F=a.arrayMax,G=a.arrayMin,k=a.defined,c=a.destroyObjectProperties,p=a.erase,t=a.merge,v=a.pick;a.PlotLineOrBand=function(a,c){this.axis=a;c&&(this.options=c,this.id=c.id);};a.PlotLineOrBand.prototype={render:function(){a.fireEvent(this,"render");var c=this,r=c.axis,h=r.horiz,e=c.options,l=e.label,n=c.label,d=e.to,g=e.from,b=e.value,x=k(g)&&k(d),u=k(b),p=c.svgElem,E=!p,B=[],m=e.color,z=v(e.zIndex,0),D=e.events,
B={"class":"highcharts-plot-"+(x?"band ":"line ")+(e.className||"")},A={},f=r.chart.renderer,q=x?"bands":"lines";r.isLog&&(g=r.log2lin(g),d=r.log2lin(d),b=r.log2lin(b));r.chart.styledMode||(u?(B.stroke=m,B["stroke-width"]=e.width,e.dashStyle&&(B.dashstyle=e.dashStyle)):x&&(m&&(B.fill=m),e.borderWidth&&(B.stroke=e.borderColor,B["stroke-width"]=e.borderWidth)));A.zIndex=z;q+="-"+z;(m=r.plotLinesAndBandsGroups[q])||(r.plotLinesAndBandsGroups[q]=m=f.g("plot-"+q).attr(A).add());E&&(c.svgElem=p=f.path().attr(B).add(m));
if(u)B=r.getPlotLinePath(b,p.strokeWidth());else if(x)B=r.getPlotBandPath(g,d,e);else return;E&&B&&B.length?(p.attr({d:B}),D&&a.objectEach(D,function(a,b){p.on(b,function(a){D[b].apply(c,[a]);});})):p&&(B?(p.show(),p.animate({d:B})):(p.hide(),n&&(c.label=n=n.destroy())));l&&k(l.text)&&B&&B.length&&0<r.width&&0<r.height&&!B.isFlat?(l=t({align:h&&x&&"center",x:h?!x&&4:10,verticalAlign:!h&&x&&"middle",y:h?x?16:10:x?6:-4,rotation:h&&!x&&90},l),this.renderLabel(l,B,x,z)):n&&n.hide();return c},renderLabel:function(a,
c,h,e){var l=this.label,n=this.axis.chart.renderer;l||(l={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(h?"band":"line")+"-label "+(a.className||"")},l.zIndex=e,this.label=l=n.text(a.text,0,0,a.useHTML).attr(l).add(),this.axis.chart.styledMode||l.css(a.style));e=c.xBounds||[c[1],c[4],h?c[6]:c[1]];c=c.yBounds||[c[2],c[5],h?c[7]:c[2]];h=G(e);n=G(c);l.align(a,!1,{x:h,y:n,width:F(e)-h,height:F(c)-n});l.show();},destroy:function(){p(this.axis.plotLinesAndBands,this);delete this.axis;
c(this);}};a.extend(y.prototype,{getPlotBandPath:function(a,c){var h=this.getPlotLinePath(c,null,null,!0),e=this.getPlotLinePath(a,null,null,!0),l=[],n=this.horiz,d=1,g;a=a<this.min&&c<this.min||a>this.max&&c>this.max;if(e&&h)for(a&&(g=e.toString()===h.toString(),d=0),a=0;a<e.length;a+=6)n&&h[a+1]===e[a+1]?(h[a+1]+=d,h[a+4]+=d):n||h[a+2]!==e[a+2]||(h[a+2]+=d,h[a+5]+=d),l.push("M",e[a+1],e[a+2],"L",e[a+4],e[a+5],h[a+4],h[a+5],h[a+1],h[a+2],"z"),l.isFlat=g;return l},addPlotBand:function(a){return this.addPlotBandOrLine(a,
"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(c,r){var h=(new a.PlotLineOrBand(this,c)).render(),e=this.userOptions;h&&(r&&(e[r]=e[r]||[],e[r].push(c)),this.plotLinesAndBands.push(h));return h},removePlotBandOrLine:function(a){for(var c=this.plotLinesAndBands,h=this.options,e=this.userOptions,l=c.length;l--;)c[l].id===a&&c[l].destroy();[h.plotLines||[],e.plotLines||[],h.plotBands||[],e.plotBands||[]].forEach(function(e){for(l=e.length;l--;)e[l].id===
a&&p(e,e[l]);});},removePlotBand:function(a){this.removePlotBandOrLine(a);},removePlotLine:function(a){this.removePlotBandOrLine(a);}});})(I,X);(function(a){var y=a.doc,F=a.extend,G=a.format,k=a.isNumber,c=a.merge,p=a.pick,t=a.splat,v=a.syncTimeout,w=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments);};a.Tooltip.prototype={init:function(a,h){this.chart=a;this.options=h;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=h.split&&!a.inverted;this.shared=h.shared||this.split;this.outside=
h.outside&&!this.split;},cleanSplit:function(a){this.chart.series.forEach(function(h){var e=h&&h.tt;e&&(!e.isActive||a?h.tt=e.destroy():e.isActive=!1);});},applyFilter:function(){var a=this.chart;a.renderer.definition({tagName:"filter",id:"drop-shadow-"+a.index,opacity:.5,children:[{tagName:"feGaussianBlur","in":"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},
{tagName:"feMergeNode","in":"SourceGraphic"}]}]});a.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+a.index+"{filter:url(#drop-shadow-"+a.index+")}"});},getLabel:function(){var c=this,h=this.chart.renderer,e=this.chart.styledMode,l=this.options,n,d;this.label||(this.outside&&(this.container=n=a.doc.createElement("div"),n.className="highcharts-tooltip-container",a.css(n,{position:"absolute",top:"1px",pointerEvents:l.style&&l.style.pointerEvents}),a.doc.body.appendChild(n),this.renderer=
h=new a.Renderer(n,0,0)),this.split?this.label=h.g("tooltip"):(this.label=h.label("",0,0,l.shape||"callout",null,null,l.useHTML,null,"tooltip").attr({padding:l.padding,r:l.borderRadius}),e||this.label.attr({fill:l.backgroundColor,"stroke-width":l.borderWidth}).css(l.style).shadow(l.shadow)),e&&(this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index)),this.outside&&(d={x:this.label.xSetter,y:this.label.ySetter},this.label.xSetter=function(a,b){d[b].call(this.label,c.distance);
n.style.left=a+"px";},this.label.ySetter=function(a,b){d[b].call(this.label,c.distance);n.style.top=a+"px";}),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();c(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,c(!0,this.options,a));},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),a.discardElement(this.container));
a.clearTimeout(this.hideTimer);a.clearTimeout(this.tooltipTimeout);},move:function(c,h,e,l){var n=this,d=n.now,g=!1!==n.options.animation&&!n.isHidden&&(1<Math.abs(c-d.x)||1<Math.abs(h-d.y)),b=n.followPointer||1<n.len;F(d,{x:g?(2*d.x+c)/3:c,y:g?(d.y+h)/2:h,anchorX:b?void 0:g?(2*d.anchorX+e)/3:e,anchorY:b?void 0:g?(d.anchorY+l)/2:l});n.getLabel().attr(d);g&&(a.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){n&&n.move(c,h,e,l);},32));},hide:function(c){var h=this;a.clearTimeout(this.hideTimer);
c=p(c,this.options.hideDelay,500);this.isHidden||(this.hideTimer=v(function(){h.getLabel()[c?"fadeOut":"hide"]();h.isHidden=!0;},c));},getAnchor:function(a,c){var e=this.chart,h=e.pointer,n=e.inverted,d=e.plotTop,g=e.plotLeft,b=0,x=0,u,k;a=t(a);this.followPointer&&c?(void 0===c.chartX&&(c=h.normalize(c)),a=[c.chartX-e.plotLeft,c.chartY-d]):a[0].tooltipPos?a=a[0].tooltipPos:(a.forEach(function(a){u=a.series.yAxis;k=a.series.xAxis;b+=a.plotX+(!n&&k?k.left-g:0);x+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+
(!n&&u?u.top-d:0);}),b/=a.length,x/=a.length,a=[n?e.plotWidth-x:b,this.shared&&!n&&1<a.length&&c?c.chartY-d:n?e.plotHeight-b:x]);return a.map(Math.round)},getPosition:function(a,c,e){var h=this.chart,n=this.distance,d={},g=h.inverted&&e.h||0,b,x=this.outside,u=x?y.documentElement.clientWidth-2*n:h.chartWidth,k=x?Math.max(y.body.scrollHeight,y.documentElement.scrollHeight,y.body.offsetHeight,y.documentElement.offsetHeight,y.documentElement.clientHeight):h.chartHeight,r=h.pointer.chartPosition,B=["y",
k,c,(x?r.top-n:0)+e.plotY+h.plotTop,x?0:h.plotTop,x?k:h.plotTop+h.plotHeight],m=["x",u,a,(x?r.left-n:0)+e.plotX+h.plotLeft,x?0:h.plotLeft,x?u:h.plotLeft+h.plotWidth],z=!this.followPointer&&p(e.ttBelow,!h.inverted===!!e.negative),D=function(a,b,f,e,m,c){var h=f<e-n,q=e+n+f<b,u=e-n-f;e+=n;if(z&&q)d[a]=e;else if(!z&&h)d[a]=u;else if(h)d[a]=Math.min(c-f,0>u-g?u:u-g);else if(q)d[a]=Math.max(m,e+g+f>b?e:e+g);else return !1},A=function(a,b,f,g){var e;g<n||g>b-n?e=!1:d[a]=g<f/2?1:g>b-f/2?b-f-2:g-f/2;return e},
f=function(a){var f=B;B=m;m=f;b=a;},q=function(){!1!==D.apply(0,B)?!1!==A.apply(0,m)||b||(f(!0),q()):b?d.x=d.y=0:(f(!0),q());};(h.inverted||1<this.len)&&f();q();return d},defaultFormatter:function(a){var c=this.points||t(this),e;e=[a.tooltipFooterHeaderFormatter(c[0])];e=e.concat(a.bodyFormatter(c));e.push(a.tooltipFooterHeaderFormatter(c[0],!0));return e},refresh:function(c,h){var e,l=this.options,n,d=c,g,b={},x=[];e=l.formatter||this.defaultFormatter;var b=this.shared,u,k=this.chart.styledMode;l.enabled&&
(a.clearTimeout(this.hideTimer),this.followPointer=t(d)[0].series.tooltipOptions.followPointer,g=this.getAnchor(d,h),h=g[0],n=g[1],!b||d.series&&d.series.noSharedTooltip?b=d.getLabelConfig():(d.forEach(function(a){a.setState("hover");x.push(a.getLabelConfig());}),b={x:d[0].category,y:d[0].y},b.points=x,d=d[0]),this.len=x.length,b=e.call(b,this),u=d.series,this.distance=p(u.tooltipOptions.distance,16),!1===b?this.hide():(e=this.getLabel(),this.isHidden&&e.attr({opacity:1}).show(),this.split?this.renderSplit(b,
t(c)):(l.style.width&&!k||e.css({width:this.chart.spacingBox.width}),e.attr({text:b&&b.join?b.join(""):b}),e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+p(d.colorIndex,u.colorIndex)),k||e.attr({stroke:l.borderColor||d.color||u.color||"#666666"}),this.updatePosition({plotX:h,plotY:n,negative:d.negative,ttBelow:d.ttBelow,h:g[2]||0})),this.isHidden=!1));},renderSplit:function(c,h){var e=this,l=[],n=this.chart,d=n.renderer,g=!0,b=this.options,x=0,u,k=this.getLabel(),r=n.plotTop;
a.isString(c)&&(c=[!1,c]);c.slice(0,h.length+1).forEach(function(a,m){if(!1!==a&&""!==a){m=h[m-1]||{isHeader:!0,plotX:h[0].plotX,plotY:n.plotHeight};var c=m.series||e,D=c.tt,A=m.series||{},f="highcharts-color-"+p(m.colorIndex,A.colorIndex,"none");D||(D={padding:b.padding,r:b.borderRadius},n.styledMode||(D.fill=b.backgroundColor,D.stroke=b.borderColor||m.color||A.color||"#333333",D["stroke-width"]=b.borderWidth),c.tt=D=d.label(null,null,null,(m.isHeader?b.headerShape:b.shape)||"callout",null,null,
b.useHTML).addClass("highcharts-tooltip-box "+f).attr(D).add(k));D.isActive=!0;D.attr({text:a});n.styledMode||D.css(b.style).shadow(b.shadow);a=D.getBBox();A=a.width+D.strokeWidth();m.isHeader?(x=a.height,n.xAxis[0].opposite&&(u=!0,r-=x),A=Math.max(0,Math.min(m.plotX+n.plotLeft-A/2,n.chartWidth+(n.scrollablePixels?n.scrollablePixels-n.marginRight:0)-A))):A=m.plotX+n.plotLeft-p(b.distance,16)-A;0>A&&(g=!1);a=(m.series&&m.series.yAxis&&m.series.yAxis.pos)+(m.plotY||0);a-=r;m.isHeader&&(a=u?-x:n.plotHeight+
x);l.push({target:a,rank:m.isHeader?1:0,size:c.tt.getBBox().height+1,point:m,x:A,tt:D});}});this.cleanSplit();b.positioner&&l.forEach(function(a){var g=b.positioner.call(e,a.tt.getBBox().width,a.size,a.point);a.x=g.x;a.align=0;a.target=g.y;a.rank=p(g.rank,a.rank);});a.distribute(l,n.plotHeight+x);l.forEach(function(a){var d=a.point,c=d.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:g||d.isHeader||b.positioner?a.x:d.plotX+n.plotLeft+e.distance,y:a.pos+r,anchorX:d.isHeader?d.plotX+n.plotLeft:
d.plotX+c.xAxis.pos,anchorY:d.isHeader?n.plotTop+n.plotHeight/2:d.plotY+c.yAxis.pos});});},updatePosition:function(a){var c=this.chart,e=this.getLabel(),l=(this.options.positioner||this.getPosition).call(this,e.width,e.height,a),n=a.plotX+c.plotLeft;a=a.plotY+c.plotTop;var d;this.outside&&(d=(this.options.borderWidth||0)+2*this.distance,this.renderer.setSize(e.width+d,e.height+d,!1),n+=c.pointer.chartPosition.left-l.x,a+=c.pointer.chartPosition.top-l.y);this.move(Math.round(l.x),Math.round(l.y||0),
n,a);},getDateFormat:function(a,c,e,l){var h=this.chart.time,d=h.dateFormat("%m-%d %H:%M:%S.%L",c),g,b,x={millisecond:15,second:12,minute:9,hour:6,day:3},u="millisecond";for(b in w){if(a===w.week&&+h.dateFormat("%w",c)===e&&"00:00:00.000"===d.substr(6)){b="week";break}if(w[b]>a){b=u;break}if(x[b]&&d.substr(x[b])!=="01-01 00:00:00.000".substr(x[b]))break;"week"!==b&&(u=b);}b&&(g=h.resolveDTLFormat(l[b]).main);return g},getXDateFormat:function(a,c,e){c=c.dateTimeLabelFormats;var h=e&&e.closestPointRange;
return (h?this.getDateFormat(h,a.x,e.options.startOfWeek,c):c.day)||c.year},tooltipFooterHeaderFormatter:function(c,h){var e=h?"footer":"header",l=c.series,n=l.tooltipOptions,d=n.xDateFormat,g=l.xAxis,b=g&&"datetime"===g.options.type&&k(c.key),x=n[e+"Format"];h={isFooter:h,labelConfig:c};a.fireEvent(this,"headerFormatter",h,function(a){b&&!d&&(d=this.getXDateFormat(c,n,g));b&&d&&(c.point&&c.point.tooltipDateKeys||["key"]).forEach(function(a){x=x.replace("{point."+a+"}","{point."+a+":"+d+"}");});l.chart.styledMode&&
(x=this.styledModeFormat(x));a.text=G(x,{point:c,series:l},this.chart.time);});return h.text},bodyFormatter:function(a){return a.map(function(a){var e=a.series.tooltipOptions;return (e[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,e[(a.point.formatPrefix||"point")+"Format"]||"")})},styledModeFormat:function(a){return a.replace('style\x3d"font-size: 10px"','class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class\x3d"highcharts-color-{$1.colorIndex}"')}};})(I);
(function(a){var y=a.addEvent,F=a.attr,G=a.charts,k=a.color,c=a.css,p=a.defined,t=a.extend,v=a.find,w=a.fireEvent,r=a.isNumber,h=a.isObject,e=a.offset,l=a.pick,n=a.splat,d=a.Tooltip;a.Pointer=function(a,b){this.init(a,b);};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};d&&(a.tooltip=new d(a,b.tooltip),this.followTouchMove=l(b.tooltip.followTouchMove,!0));this.setDOMEvents();},zoomOption:function(a){var b=
this.chart,g=b.options.chart,d=g.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(d=l(g.pinchType,d));this.zoomX=a=/x/.test(d);this.zoomY=d=/y/.test(d);this.zoomHor=a&&!b||d&&b;this.zoomVert=d&&!b||a&&b;this.hasZoom=a||d;},normalize:function(a,b){var g;g=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=e(this.chart.container));return t(a,{chartX:Math.round(g.pageX-b.left),chartY:Math.round(g.pageY-b.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};
this.chart.axes.forEach(function(g){b[g.isXAxis?"xAxis":"yAxis"].push({axis:g,value:g.toValue(a[g.horiz?"chartX":"chartY"])});});return b},findNearestKDPoint:function(a,b,d){var g;a.forEach(function(a){var e=!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(d,e);if((e=h(a,!0))&&!(e=!h(g,!0)))var e=g.distX-a.distX,c=g.dist-a.dist,m=(a.series.group&&a.series.group.zIndex)-(g.series.group&&g.series.group.zIndex),e=0<(0!==e&&b?e:0!==c?c:0!==m?m:g.series.index>a.series.index?
-1:1);e&&(g=a);});return g},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var g=a.series,d=g.xAxis,g=g.yAxis,e=l(a.clientX,a.plotX),c=a.shapeArgs;if(d&&g)return b?{chartX:d.len+d.pos-e,chartY:g.len+g.pos-a.plotY}:{chartX:e+d.pos,chartY:a.plotY+g.pos};if(c&&c.x&&c.y)return {chartX:c.x,chartY:c.y}},getHoverData:function(a,b,d,e,c,n){var g,m=[];e=!(!e||!a);var z=b&&!b.stickyTracking?[b]:d.filter(function(a){return a.visible&&
!(!c&&a.directTouch)&&l(a.options.enableMouseTracking,!0)&&a.stickyTracking});b=(g=e?a:this.findNearestKDPoint(z,c,n))&&g.series;g&&(c&&!b.noSharedTooltip?(z=d.filter(function(a){return a.visible&&!(!c&&a.directTouch)&&l(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),z.forEach(function(a){var b=v(a.points,function(a){return a.x===g.x&&!a.isNull});h(b)&&(a.chart.isBoosting&&(b=a.getPoint(b)),m.push(b));})):m.push(g));return {hoverPoint:g,hoverSeries:b,hoverPoints:m}},runPointActions:function(g,
b){var d=this.chart,e=d.tooltip&&d.tooltip.options.enabled?d.tooltip:void 0,c=e?e.shared:!1,h=b||d.hoverPoint,n=h&&h.series||d.hoverSeries,n=this.getHoverData(h,n,d.series,"touchmove"!==g.type&&(!!b||n&&n.directTouch&&this.isDirectTouch),c,g),m,h=n.hoverPoint;m=n.hoverPoints;b=(n=n.hoverSeries)&&n.tooltipOptions.followPointer;c=c&&n&&!n.noSharedTooltip;if(h&&(h!==d.hoverPoint||e&&e.isHidden)){(d.hoverPoints||[]).forEach(function(a){-1===m.indexOf(a)&&a.setState();});(m||[]).forEach(function(a){a.setState("hover");});
if(d.hoverSeries!==n)n.onMouseOver();d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");if(!h.series)return;h.firePointEvent("mouseOver");d.hoverPoints=m;d.hoverPoint=h;e&&e.refresh(c?m:h,g);}else b&&e&&!e.isHidden&&(h=e.getAnchor([{}],g),e.updatePosition({plotX:h[0],plotY:h[1]}));this.unDocMouseMove||(this.unDocMouseMove=y(d.container.ownerDocument,"mousemove",function(b){var g=G[a.hoverChartIndex];if(g)g.pointer.onDocumentMouseMove(b);}));d.axes.forEach(function(b){var d=l(b.crosshair.snap,!0),
e=d?a.find(m,function(a){return a.series[b.coll]===b}):void 0;e||!d?b.drawCrosshair(g,e):b.hideCrosshair();});},reset:function(a,b){var g=this.chart,d=g.hoverSeries,e=g.hoverPoint,c=g.hoverPoints,h=g.tooltip,m=h&&h.shared?c:e;a&&m&&n(m).forEach(function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1);});if(a)h&&m&&n(m).length&&(h.refresh(m),h.shared&&c?c.forEach(function(a){a.setState(a.state,!0);a.series.isCartesian&&(a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,a),a.series.yAxis.crosshair&&
a.series.yAxis.drawCrosshair(null,a));}):e&&(e.setState(e.state,!0),g.axes.forEach(function(a){a.crosshair&&a.drawCrosshair(null,e);})));else{if(e)e.onMouseOut();c&&c.forEach(function(a){a.setState();});if(d)d.onMouseOut();h&&h.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());g.axes.forEach(function(a){a.hideCrosshair();});this.hoverX=g.hoverPoints=g.hoverPoint=null;}},scaleGroups:function(a,b){var g=this.chart,d;g.series.forEach(function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&
e.group&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?g.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d));});g.clipRect.attr(b||g.clipBox);},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY;},drag:function(a){var b=this.chart,g=b.options.chart,d=a.chartX,e=a.chartY,c=this.zoomHor,h=this.zoomVert,m=b.plotLeft,n=b.plotTop,l=b.plotWidth,A=b.plotHeight,f,q=this.selectionMarker,
r=this.mouseDownX,p=this.mouseDownY,t=g.panKey&&a[g.panKey+"Key"];q&&q.touch||(d<m?d=m:d>m+l&&(d=m+l),e<n?e=n:e>n+A&&(e=n+A),this.hasDragged=Math.sqrt(Math.pow(r-d,2)+Math.pow(p-e,2)),10<this.hasDragged&&(f=b.isInsidePlot(r-m,p-n),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&f&&!t&&!q&&(this.selectionMarker=q=b.renderer.rect(m,n,c?1:l,h?1:A,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add(),b.styledMode||q.attr({fill:g.selectionMarkerFill||k("#335cad").setOpacity(.25).get()})),q&&
c&&(d-=r,q.attr({width:Math.abs(d),x:(0<d?0:d)+r})),q&&h&&(d=e-p,q.attr({height:Math.abs(d),y:(0<d?0:d)+p})),f&&!q&&g.panning&&b.pan(a,g.panning)));},drop:function(a){var b=this,d=this.chart,g=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},h=this.selectionMarker,n=h.attr?h.attr("x"):h.x,m=h.attr?h.attr("y"):h.y,l=h.attr?h.attr("width"):h.width,D=h.attr?h.attr("height"):h.height,k;if(this.hasDragged||g)d.axes.forEach(function(f){if(f.zoomEnabled&&p(f.min)&&(g||b[{xAxis:"zoomX",
yAxis:"zoomY"}[f.coll]])){var d=f.horiz,c="touchend"===a.type?f.minPixelPadding:0,h=f.toValue((d?n:m)+c),d=f.toValue((d?n+l:m+D)-c);e[f.coll].push({axis:f,min:Math.min(h,d),max:Math.max(h,d)});k=!0;}}),k&&w(d,"selection",e,function(a){d.zoom(t(a,g?{animation:!1}:null));});r(d.index)&&(this.selectionMarker=this.selectionMarker.destroy());g&&this.scaleGroups();}d&&r(d.index)&&(c(d.container,{cursor:d._cursor}),d.cancelClick=10<this.hasDragged,d.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=
[]);},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a));},onDocumentMouseUp:function(d){G[a.hoverChartIndex]&&G[a.hoverChartIndex].pointer.drop(d);},onDocumentMouseMove:function(a){var b=this.chart,d=this.chartPosition;a=this.normalize(a,d);!d||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset();},onContainerMouseLeave:function(d){var b=G[a.hoverChartIndex];
b&&(d.relatedTarget||d.toElement)&&(b.pointer.reset(),b.pointer.chartPosition=null);},onContainerMouseMove:function(d){var b=this.chart;p(a.hoverChartIndex)&&G[a.hoverChartIndex]&&G[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=b.index);d=this.normalize(d);d.preventDefault||(d.returnValue=!1);"mousedown"===b.mouseIsDown&&this.drag(d);!this.inClass(d.target,"highcharts-tracker")&&!b.isInsidePlot(d.chartX-b.plotLeft,d.chartY-b.plotTop)||b.openMenu||this.runPointActions(d);},inClass:function(a,b){for(var d;a;){if(d=
F(a,"class")){if(-1!==d.indexOf(b))return !0;if(-1!==d.indexOf("highcharts-container"))return !1}a=a.parentNode;}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut();},onContainerClick:function(a){var b=this.chart,d=b.hoverPoint,g=b.plotLeft,e=b.plotTop;a=this.normalize(a);b.cancelClick||
(d&&this.inClass(a.target,"highcharts-tracker")?(w(d.series,"click",t(a,{point:d})),b.hoverPoint&&d.firePointEvent("click",a)):(t(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-g,a.chartY-e)&&w(b,"click",a)));},setDOMEvents:function(){var d=this,b=d.chart.container,e=b.ownerDocument;b.onmousedown=function(a){d.onContainerMouseDown(a);};b.onmousemove=function(a){d.onContainerMouseMove(a);};b.onclick=function(a){d.onContainerClick(a);};this.unbindContainerMouseLeave=y(b,"mouseleave",d.onContainerMouseLeave);
a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=y(e,"mouseup",d.onDocumentMouseUp));a.hasTouch&&(b.ontouchstart=function(a){d.onContainerTouchStart(a);},b.ontouchmove=function(a){d.onContainerTouchMove(a);},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=y(e,"touchend",d.onDocumentTouchEnd)));},destroy:function(){var d=this;d.unDocMouseMove&&d.unDocMouseMove();this.unbindContainerMouseLeave();a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&
(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(d.tooltipTimeout);a.objectEach(d,function(a,g){d[g]=null;});}};})(I);(function(a){var y=a.charts,F=a.extend,G=a.noop,k=a.pick;F(a.Pointer.prototype,{pinchTranslate:function(a,k,t,v,w,r){this.zoomHor&&this.pinchTranslateDirection(!0,a,k,t,v,w,r);this.zoomVert&&this.pinchTranslateDirection(!1,a,k,t,v,w,r);},pinchTranslateDirection:function(a,k,t,v,w,r,h,e){var c=this.chart,n=a?"x":"y",d=a?"X":"Y",g="chart"+d,b=a?"width":"height",x=c["plot"+
(a?"Left":"Top")],u,p,E=e||1,B=c.inverted,m=c.bounds[a?"h":"v"],z=1===k.length,D=k[0][g],A=t[0][g],f=!z&&k[1][g],q=!z&&t[1][g],L;t=function(){!z&&20<Math.abs(D-f)&&(E=e||Math.abs(A-q)/Math.abs(D-f));p=(x-A)/E+D;u=c["plot"+(a?"Width":"Height")]/E;};t();k=p;k<m.min?(k=m.min,L=!0):k+u>m.max&&(k=m.max-u,L=!0);L?(A-=.8*(A-h[n][0]),z||(q-=.8*(q-h[n][1])),t()):h[n]=[A,q];B||(r[n]=p-x,r[b]=u);r=B?1/E:E;w[b]=u;w[n]=k;v[B?a?"scaleY":"scaleX":"scale"+d]=E;v["translate"+d]=r*x+(A-r*D);},pinch:function(a){var c=
this,t=c.chart,v=c.pinchDown,w=a.touches,r=w.length,h=c.lastValidTouch,e=c.hasZoom,l=c.selectionMarker,n={},d=1===r&&(c.inClass(a.target,"highcharts-tracker")&&t.runTrackerClick||c.runChartClick),g={};1<r&&(c.initiated=!0);e&&c.initiated&&!d&&a.preventDefault();[].map.call(w,function(a){return c.normalize(a)});"touchstart"===a.type?([].forEach.call(w,function(a,d){v[d]={chartX:a.chartX,chartY:a.chartY};}),h.x=[v[0].chartX,v[1]&&v[1].chartX],h.y=[v[0].chartY,v[1]&&v[1].chartY],t.axes.forEach(function(a){if(a.zoomEnabled){var b=
t.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,g=a.toPixels(k(a.options.min,a.dataMin)),e=a.toPixels(k(a.options.max,a.dataMax)),c=Math.max(g,e);b.min=Math.min(a.pos,Math.min(g,e)-d);b.max=Math.max(a.pos+a.len,c+d);}}),c.res=!0):c.followTouchMove&&1===r?this.runPointActions(c.normalize(a)):v.length&&(l||(c.selectionMarker=l=F({destroy:G,touch:!0},t.plotBox)),c.pinchTranslate(v,w,n,l,g,h),c.hasPinched=e,c.scaleGroups(n,g),c.res&&(c.res=!1,this.reset(!1,0)));},touch:function(c,p){var t=this.chart,v,w;
if(t.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=t.index;1===c.touches.length?(c=this.normalize(c),(w=t.isInsidePlot(c.chartX-t.plotLeft,c.chartY-t.plotTop))&&!t.openMenu?(p&&this.runPointActions(c),"touchmove"===c.type&&(p=this.pinchDown,v=p[0]?4<=Math.sqrt(Math.pow(p[0].chartX-c.chartX,2)+Math.pow(p[0].chartY-c.chartY,2)):!1),k(v,!0)&&this.pinch(c)):p&&this.reset()):2===c.touches.length&&this.pinch(c);},onContainerTouchStart:function(a){this.zoomOption(a);
this.touch(a,!0);},onContainerTouchMove:function(a){this.touch(a);},onDocumentTouchEnd:function(c){y[a.hoverChartIndex]&&y[a.hoverChartIndex].pointer.drop(c);}});})(I);(function(a){var y=a.addEvent,F=a.charts,G=a.css,k=a.doc,c=a.extend,p=a.noop,t=a.Pointer,v=a.removeEvent,w=a.win,r=a.wrap;if(!a.hasTouch&&(w.PointerEvent||w.MSPointerEvent)){var h={},e=!!w.PointerEvent,l=function(){var d=[];d.item=function(a){return this[a]};a.objectEach(h,function(a){d.push({pageX:a.pageX,pageY:a.pageY,target:a.target});});
return d},n=function(d,g,b,e){"touch"!==d.pointerType&&d.pointerType!==d.MSPOINTER_TYPE_TOUCH||!F[a.hoverChartIndex]||(e(d),e=F[a.hoverChartIndex].pointer,e[g]({type:b,target:d.currentTarget,preventDefault:p,touches:l()}));};c(t.prototype,{onContainerPointerDown:function(a){n(a,"onContainerTouchStart","touchstart",function(a){h[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget};});},onContainerPointerMove:function(a){n(a,"onContainerTouchMove","touchmove",function(a){h[a.pointerId]={pageX:a.pageX,
pageY:a.pageY};h[a.pointerId].target||(h[a.pointerId].target=a.currentTarget);});},onDocumentPointerUp:function(a){n(a,"onDocumentTouchEnd","touchend",function(a){delete h[a.pointerId];});},batchMSEvents:function(a){a(this.chart.container,e?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,e?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(k,e?"pointerup":"MSPointerUp",this.onDocumentPointerUp);}});r(t.prototype,"init",function(a,g,b){a.call(this,g,b);this.hasZoom&&
G(g.container,{"-ms-touch-action":"none","touch-action":"none"});});r(t.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(y);});r(t.prototype,"destroy",function(a){this.batchMSEvents(v);a.call(this);});}})(I);(function(a){var y=a.addEvent,F=a.css,G=a.discardElement,k=a.defined,c=a.fireEvent,p=a.isFirefox,t=a.marginNames,v=a.merge,w=a.pick,r=a.setAnimation,h=a.stableSort,e=a.win,l=a.wrap;a.Legend=function(a,d){this.init(a,d);};a.Legend.prototype=
{init:function(a,d){this.chart=a;this.setOptions(d);d.enabled&&(this.render(),y(this.chart,"endResize",function(){this.legend.positionCheckboxes();}),this.proximate?this.unchartrender=y(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems();}):this.unchartrender&&this.unchartrender());},setOptions:function(a){var d=w(a.padding,8);this.options=a;this.chart.styledMode||(this.itemStyle=a.itemStyle,this.itemHiddenStyle=v(this.itemStyle,a.itemHiddenStyle));this.itemMarginTop=
a.itemMarginTop||0;this.padding=d;this.initialItemY=d-5;this.symbolWidth=w(a.symbolWidth,16);this.pages=[];this.proximate="proximate"===a.layout&&!this.chart.inverted;},update:function(a,d){var g=this.chart;this.setOptions(v(!0,this.options,a));this.destroy();g.isDirtyLegend=g.isDirtyBox=!0;w(d,!0)&&g.redraw();c(this,"afterUpdate");},colorizeItem:function(a,d){a.legendGroup[d?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var g=this.options,b=a.legendItem,e=a.legendLine,
h=a.legendSymbol,n=this.itemHiddenStyle.color,g=d?g.itemStyle.color:n,l=d?a.color||n:n,k=a.options&&a.options.marker,m={fill:l};b&&b.css({fill:g,color:g});e&&e.attr({stroke:l});h&&(k&&h.isMarker&&(m=a.pointAttribs(),d||(m.stroke=m.fill=n)),h.attr(m));}c(this,"afterColorizeItem",{item:a,visible:d});},positionItems:function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes();},positionItem:function(a){var d=this.options,e=d.symbolPadding,d=!d.rtl,b=a._legendItemPos,
c=b[0],b=b[1],h=a.checkbox;if((a=a.legendGroup)&&a.element)a[k(a.translateY)?"animate":"attr"]({translateX:d?c:this.legendWidth-c-2*e-4,translateY:b});h&&(h.x=c,h.y=b);},destroyItem:function(a){var d=a.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(d){a[d]&&(a[d]=a[d].destroy());});d&&G(a.checkbox);},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy());}this.getAllItems().forEach(function(d){["legendItem","legendGroup"].forEach(a,d);});"clipRect up down pager nav box title group".split(" ").forEach(a,
this);this.display=null;},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,d,e=this.clipHeight||this.legendHeight,b=this.titleHeight;a&&(d=a.translateY,this.allItems.forEach(function(g){var c=g.checkbox,h;c&&(h=d+b+c.y+(this.scrollOffset||0)+3,F(c,{left:a.translateX+g.checkboxOffset+c.x-20+"px",top:h+"px",display:this.proximate||h>d-6&&h<d+e-6?"":"none"}));},this));},renderTitle:function(){var a=this.options,d=this.padding,e=a.title,b=0;e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,
d-3,d-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}),this.chart.styledMode||this.title.css(e.style),this.title.add(this.group)),e.width||this.title.css({width:this.maxLegendWidth+"px"}),a=this.title.getBBox(),b=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:b}));this.titleHeight=b;},setText:function(e){var d=this.options;e.legendItem.attr({text:d.labelFormat?a.format(d.labelFormat,e,this.chart.time):d.labelFormatter.call(e)});},renderItem:function(a){var d=this.chart,
e=d.renderer,b=this.options,c=this.symbolWidth,h=b.symbolPadding,n=this.itemStyle,l=this.itemHiddenStyle,k="horizontal"===b.layout?w(b.itemDistance,20):0,m=!b.rtl,z=a.legendItem,D=!a.series,A=!D&&a.series.drawLegendSymbol?a.series:a,f=A.options,f=this.createCheckboxForItem&&f&&f.showCheckbox,k=c+h+k+(f?20:0),q=b.useHTML,r=a.options.className;z||(a.legendGroup=e.g("legend-item").addClass("highcharts-"+A.type+"-series highcharts-color-"+a.colorIndex+(r?" "+r:"")+(D?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),
a.legendItem=z=e.text("",m?c+h:-h,this.baseline||0,q),d.styledMode||z.css(v(a.visible?n:l)),z.attr({align:m?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(this.fontMetrics=e.fontMetrics(d.styledMode?12:n.fontSize,z),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,z.attr("y",this.baseline)),this.symbolHeight=b.symbolHeight||this.fontMetrics.f,A.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,z,q),f&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);
!d.styledMode&&n.width||z.css({width:(b.itemWidth||this.widthOption||d.spacingBox.width)-k});this.setText(a);d=z.getBBox();a.itemWidth=a.checkboxOffset=b.itemWidth||a.legendItemWidth||d.width+k;this.maxItemWidth=Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||d.height||this.symbolHeight);},layoutItem:function(a){var d=this.options,e=this.padding,b="horizontal"===d.layout,c=a.itemHeight,h=d.itemMarginBottom||0,n=this.itemMarginTop,
l=b?w(d.itemDistance,20):0,k=this.maxLegendWidth,d=d.alignColumns&&this.totalItemWidth>k?this.maxItemWidth:a.itemWidth;b&&this.itemX-e+d>k&&(this.itemX=e,this.itemY+=n+this.lastLineHeight+h,this.lastLineHeight=0);this.lastItemY=n+this.itemY+h;this.lastLineHeight=Math.max(c,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];b?this.itemX+=d:(this.itemY+=n+c+h,this.lastLineHeight=c);this.offsetWidth=this.widthOption||Math.max((b?this.itemX-e-(a.checkbox?0:l):d)+e,this.offsetWidth);},getAllItems:function(){var a=
[];this.chart.series.forEach(function(d){var e=d&&d.options;d&&w(e.showInLegend,k(e.linkedTo)?!1:void 0,!0)&&(a=a.concat(d.legendItems||("point"===e.legendType?d.data:d)));});c(this,"afterGetAllItems",{allItems:a});return a},getAlignment:function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,d){var e=this.chart,b=this.options,c=this.getAlignment(),h=void 0!==e.options.title.margin?
e.titleOffset+e.options.title.margin:0;c&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(g,n){g.test(c)&&!k(a[n])&&(e[t[n]]=Math.max(e[t[n]],e.legend[(n+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][n]*b[n%2?"x":"y"]+w(b.margin,12)+d[n]+(0===n&&(0===e.titleOffset?0:h))));});},proximatePositions:function(){var e=this.chart,d=[],g="left"===this.options.align;this.allItems.forEach(function(b){var c,h;c=g;b.xAxis&&b.points&&(b.xAxis.options.reversed&&(c=!c),c=a.find(c?b.points:
b.points.slice(0).reverse(),function(b){return a.isNumber(b.plotY)}),h=b.legendGroup.getBBox().height,d.push({target:b.visible?(c?c.plotY:b.xAxis.height)-.3*h:e.plotHeight,size:h,item:b}));},this);a.distribute(d,e.plotHeight);d.forEach(function(a){a.item._legendItemPos[1]=e.plotTop-e.spacing[0]+a.pos;});},render:function(){var e=this.chart,d=e.renderer,g=this.group,b,l,k,r=this.box,p=this.options,B=this.padding;this.itemX=B;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;this.widthOption=
a.relativeLength(p.width,e.spacingBox.width-B);b=e.spacingBox.width-2*B-p.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,2))&&(b/=2);this.maxLegendWidth=this.widthOption||b;g||(this.group=g=d.g("legend").attr({zIndex:7}).add(),this.contentGroup=d.g().attr({zIndex:1}).add(g),this.scrollGroup=d.g().add(this.contentGroup));this.renderTitle();b=this.getAllItems();h(b,function(a,b){return (a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});p.reversed&&b.reverse();this.allItems=
b;this.display=l=!!b.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;b.forEach(this.renderItem,this);b.forEach(this.layoutItem,this);b=(this.widthOption||this.offsetWidth)+B;k=this.lastItemY+this.lastLineHeight+this.titleHeight;k=this.handleOverflow(k);k+=B;r||(this.box=r=d.rect().addClass("highcharts-legend-box").attr({r:p.borderRadius}).add(g),r.isNew=!0);e.styledMode||r.attr({stroke:p.borderColor,"stroke-width":p.borderWidth||0,fill:p.backgroundColor||"none"}).shadow(p.shadow);
0<b&&0<k&&(r[r.isNew?"attr":"animate"](r.crisp.call({},{x:0,y:0,width:b,height:k},r.strokeWidth())),r.isNew=!1);r[l?"show":"hide"]();e.styledMode&&"none"===g.getStyle("display")&&(b=k=0);this.legendWidth=b;this.legendHeight=k;l&&(d=e.spacingBox,/(lth|ct|rth)/.test(this.getAlignment())&&(r=d.y+e.titleOffset,d=v(d,{y:0<e.titleOffset?r+=e.options.title.margin:r})),g.align(v(p,{width:b,height:k,verticalAlign:this.proximate?"top":p.verticalAlign}),!0,d));this.proximate||this.positionItems();c(this,"afterRender");},
handleOverflow:function(a){var d=this,e=this.chart,b=e.renderer,c=this.options,h=c.y,n=this.padding,h=e.spacingBox.height+("top"===c.verticalAlign?-h:h)-n,l=c.maxHeight,k,m=this.clipRect,z=c.navigation,D=w(z.animation,!0),r=z.arrowSize||12,f=this.nav,q=this.pages,p,t=this.allItems,v=function(a){"number"===typeof a?m.attr({height:a}):m&&(d.clipRect=m.destroy(),d.contentGroup.clip());d.contentGroup.div&&(d.contentGroup.div.style.clip=a?"rect("+n+"px,9999px,"+(n+a)+"px,0)":"auto");};"horizontal"!==c.layout||
"middle"===c.verticalAlign||c.floating||(h/=2);l&&(h=Math.min(h,l));q.length=0;a>h&&!1!==z.enabled?(this.clipHeight=k=Math.max(h-20-this.titleHeight-n,0),this.currentPage=w(this.currentPage,1),this.fullHeight=a,t.forEach(function(a,b){var f=a._legendItemPos[1],d=Math.round(a.legendItem.getBBox().height),e=q.length;if(!e||f-q[e-1]>k&&(p||f)!==q[e-1])q.push(p||f),e++;a.pageIx=e-1;p&&(t[b-1].pageIx=e-1);b===t.length-1&&f+d-q[e-1]>k&&f!==p&&(q.push(f),a.pageIx=e);f!==p&&(p=f);}),m||(m=d.clipRect=b.clipRect(0,
n,9999,0),d.contentGroup.clip(m)),v(k),f||(this.nav=f=b.g().attr({zIndex:1}).add(this.group),this.up=b.symbol("triangle",0,0,r,r).on("click",function(){d.scroll(-1,D);}).add(f),this.pager=b.text("",15,10).addClass("highcharts-legend-navigation"),e.styledMode||this.pager.css(z.style),this.pager.add(f),this.down=b.symbol("triangle-down",0,0,r,r).on("click",function(){d.scroll(1,D);}).add(f)),d.scroll(0),a=h):f&&(v(),this.nav=f.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},
scroll:function(a,d){var e=this.pages,b=e.length;a=this.currentPage+a;var c=this.clipHeight,h=this.options.navigation,l=this.pager,n=this.padding;a>b&&(a=b);0<a&&(void 0!==d&&r(d,this.chart),this.nav.attr({translateX:n,translateY:c+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),l.attr({text:a+"/"+b}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===b?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),
this.chart.styledMode||(this.up.attr({fill:1===a?h.inactiveColor:h.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===b?h.inactiveColor:h.activeColor}).css({cursor:a===b?"default":"pointer"})),this.scrollOffset=-e[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=a,this.positionCheckboxes());}};a.LegendSymbolMixin={drawRectangle:function(a,d){var e=a.symbolHeight,b=a.options.squareSymbol;d.legendSymbol=this.chart.renderer.rect(b?
(a.symbolWidth-e)/2:0,a.baseline-e+1,b?e:a.symbolWidth,e,w(a.options.symbolRadius,e/2)).addClass("highcharts-point").attr({zIndex:3}).add(d.legendGroup);},drawLineMarker:function(a){var d=this.options,e=d.marker,b=a.symbolWidth,c=a.symbolHeight,h=c/2,l=this.chart.renderer,n=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var k={};this.chart.styledMode||(k={"stroke-width":d.lineWidth||0},d.dashStyle&&(k.dashstyle=d.dashStyle));this.legendLine=l.path(["M",0,a,"L",b,a]).addClass("highcharts-graph").attr(k).add(n);
e&&!1!==e.enabled&&b&&(d=Math.min(w(e.radius,h),h),0===this.symbol.indexOf("url")&&(e=v(e,{width:c,height:c}),d=0),this.legendSymbol=e=l.symbol(this.symbol,b/2-d,a-d,2*d,2*d,e).addClass("highcharts-point").add(n),e.isMarker=!0);}};(/Trident\/7\.0/.test(e.navigator&&e.navigator.userAgent)||p)&&l(a.Legend.prototype,"positionItem",function(a,d){var e=this,b=function(){d._legendItemPos&&a.call(e,d);};b();e.bubbleLegend||setTimeout(b);});})(I);(function(a){var y=a.addEvent,F=a.animate,G=a.animObject,k=a.attr,
c=a.doc,p=a.Axis,t=a.createElement,v=a.defaultOptions,w=a.discardElement,r=a.charts,h=a.css,e=a.defined,l=a.extend,n=a.find,d=a.fireEvent,g=a.isNumber,b=a.isObject,x=a.isString,u=a.Legend,H=a.marginNames,E=a.merge,B=a.objectEach,m=a.Pointer,z=a.pick,D=a.pInt,A=a.removeEvent,f=a.seriesTypes,q=a.splat,L=a.syncTimeout,K=a.win,T=a.Chart=function(){this.getArgs.apply(this,arguments);};a.chart=function(a,b,f){return new T(a,b,f)};l(T.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);
if(x(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1]);},init:function(b,f){var e,g,c=b.series,m=b.plotOptions||{};d(this,"init",{args:arguments},function(){b.series=null;e=E(v,b);for(g in e.plotOptions)e.plotOptions[g].tooltip=m[g]&&E(m[g].tooltip)||void 0;e.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;e.series=b.series=c;this.userOptions=b;var h=e.chart,q=h.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=
f;this.isResizing=0;this.options=e;this.axes=[];this.series=[];this.time=b.time&&Object.keys(b.time).length?new a.Time(b.time):a.time;this.styledMode=h.styledMode;this.hasCartesianSeries=h.showAxes;var l=this;l.index=r.length;r.push(l);a.chartCount++;q&&B(q,function(a,b){y(l,b,a);});l.xAxis=[];l.yAxis=[];l.pointCount=l.colorCounter=l.symbolCounter=0;d(l,"afterInit");l.firstRender();});},initSeries:function(b){var d=this.options.chart;(d=f[b.type||d.type||d.defaultSeriesType])||a.error(17,!0,this);d=
new d;d.init(this,b);return d},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName());},isInsidePlot:function(a,b,f){var d=f?b:a;a=f?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){d(this,"beforeRedraw");var f=this.axes,e=this.series,g=this.pointer,c=this.legend,m=this.userOptions.legend,h=this.isDirtyLegend,q,n,z=this.hasCartesianSeries,k=this.isDirtyBox,D,u=this.renderer,r=u.isHidden(),A=[];this.setResponsive&&
this.setResponsive(!1);a.setAnimation(b,this);r&&this.temporaryDisplay();this.layOutTitles();for(b=e.length;b--;)if(D=e[b],D.options.stacking&&(q=!0,D.isDirty)){n=!0;break}if(n)for(b=e.length;b--;)D=e[b],D.options.stacking&&(D.isDirty=!0);e.forEach(function(a){a.isDirty&&("point"===a.options.legendType?(a.updateTotals&&a.updateTotals(),h=!0):m&&(m.labelFormatter||m.labelFormat)&&(h=!0));a.isDirtyData&&d(a,"updatedData");});h&&c&&c.options.enabled&&(c.render(),this.isDirtyLegend=!1);q&&this.getStacks();
z&&f.forEach(function(a){a.updateNames();a.setScale();});this.getMargins();z&&(f.forEach(function(a){a.isDirty&&(k=!0);}),f.forEach(function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,A.push(function(){d(a,"afterSetExtremes",l(a.eventArgs,a.getExtremes()));delete a.eventArgs;}));(k||q)&&a.redraw();}));k&&this.drawChartBox();d(this,"predraw");e.forEach(function(a){(k||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1;});g&&g.reset(!0);u.draw();d(this,"redraw");d(this,"render");r&&this.temporaryDisplay(!0);
A.forEach(function(a){a.call();});},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var f,d=this.series,e;f=n(this.axes,b)||n(this.series,b);for(e=0;!f&&e<d.length;e++)f=n(d[e].points||[],b);return f},getAxes:function(){var a=this,b=this.options,f=b.xAxis=q(b.xAxis||{}),b=b.yAxis=q(b.yAxis||{});d(this,"getAxes");f.forEach(function(a,b){a.index=b;a.isX=!0;});b.forEach(function(a,b){a.index=b;});f.concat(b).forEach(function(b){new p(a,b);});d(this,"afterGetAxes");},getSelectedPoints:function(){var a=
[];this.series.forEach(function(b){a=a.concat((b[b.hasGroupedData?"points":"data"]||[]).filter(function(a){return a.selected}));});return a},getSelectedSeries:function(){return this.series.filter(function(a){return a.selected})},setTitle:function(a,b,f){var d=this,e=d.options,g=d.styledMode,c;c=e.title=E(!g&&{style:{color:"#333333",fontSize:e.isStock?"16px":"18px"}},e.title,a);e=e.subtitle=E(!g&&{style:{color:"#666666"}},e.subtitle,b);[["title",a,c],["subtitle",b,e]].forEach(function(a,b){var f=a[0],
e=d[f],c=a[1];a=a[2];e&&c&&(d[f]=e=e.destroy());a&&!e&&(d[f]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+f,zIndex:a.zIndex||4}).add(),d[f].update=function(a){d.setTitle(!b&&a,b&&a);},g||d[f].css(a.style));});d.layOutTitles(f);},layOutTitles:function(a){var b=0,f,d=this.renderer,e=this.spacingBox;["title","subtitle"].forEach(function(a){var f=this[a],g=this.options[a];a="title"===a?-3:g.verticalAlign?0:b+2;var c;f&&(this.styledMode||(c=g.style.fontSize),c=d.fontMetrics(c,
f).b,f.css({width:(g.width||e.width+g.widthAdjust)+"px"}).align(l({y:a+c},g),!1,"spacingBox"),g.floating||g.verticalAlign||(b=Math.ceil(b+f.getBBox(g.useHTML).height)));},this);f=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&f&&(this.isDirtyBox=this.isDirtyLegend=f,this.hasRendered&&z(a,!0)&&this.isDirtyBox&&this.redraw());},getChartSize:function(){var b=this.options.chart,f=b.width,b=b.height,d=this.renderTo;e(f)||(this.containerWidth=a.getStyle(d,"width"));e(b)||(this.containerHeight=
a.getStyle(d,"height"));this.chartWidth=Math.max(0,f||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400));},temporaryDisplay:function(b){var f=this.renderTo;if(b)for(;f&&f.style;)f.hcOrigStyle&&(a.css(f,f.hcOrigStyle),delete f.hcOrigStyle),f.hcOrigDetached&&(c.body.removeChild(f),f.hcOrigDetached=!1),f=f.parentNode;else for(;f&&f.style;){c.body.contains(f)||f.parentNode||(f.hcOrigDetached=!0,c.body.appendChild(f));
if("none"===a.getStyle(f,"display",!1)||f.hcOricDetached)f.hcOrigStyle={display:f.style.display,height:f.style.height,overflow:f.style.overflow},b={display:"block",overflow:"hidden"},f!==this.renderTo&&(b.height=0),a.css(f,b),f.offsetWidth||f.style.setProperty("display","block","important");f=f.parentNode;if(f===c.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"");},getContainer:function(){var b,f=this.options,e=f.chart,m,q;b=this.renderTo;var n=a.uniqueKey(),
z,u;b||(this.renderTo=b=e.renderTo);x(b)&&(this.renderTo=b=c.getElementById(b));b||a.error(13,!0,this);m=D(k(b,"data-highcharts-chart"));g(m)&&r[m]&&r[m].hasRendered&&r[m].destroy();k(b,"data-highcharts-chart",this.index);b.innerHTML="";e.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();m=this.chartWidth;q=this.chartHeight;h(b,{overflow:"hidden"});this.styledMode||(z=l({position:"relative",overflow:"hidden",width:m+"px",height:q+"px",textAlign:"left",lineHeight:"normal",zIndex:0,
"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},e.style));this.container=b=t("div",{id:n},z,b);this._cursor=b.style.cursor;this.renderer=new (a[e.renderer]||a.Renderer)(b,m,q,null,e.forExport,f.exporting&&f.exporting.allowHTML,this.styledMode);this.setClassName(e.className);if(this.styledMode)for(u in f.defs)this.renderer.definition(f.defs[u]);else this.renderer.setStyle(e.style);this.renderer.chartIndex=this.index;d(this,"afterGetContainer");},getMargins:function(a){var b=this.spacing,f=this.margin,
g=this.titleOffset;this.resetMargins();g&&!e(f[0])&&(this.plotTop=Math.max(this.plotTop,g+this.options.title.margin+b[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(f,b);d(this,"getMargins");a||this.getAxisMargins();},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],f=a.margin;a.hasCartesianSeries&&a.axes.forEach(function(a){a.visible&&a.getOffset();});H.forEach(function(d,g){e(f[g])||(a[d]+=b[g]);});a.setChartSize();},reflow:function(b){var f=this,d=f.options.chart,g=f.renderTo,
m=e(d.width)&&e(d.height),h=d.width||a.getStyle(g,"width"),d=d.height||a.getStyle(g,"height"),g=b?b.target:K;if(!m&&!f.isPrinting&&h&&d&&(g===K||g===c)){if(h!==f.containerWidth||d!==f.containerHeight)a.clearTimeout(f.reflowTimeout),f.reflowTimeout=L(function(){f.container&&f.setSize(void 0,void 0,!1);},b?100:0);f.containerWidth=h;f.containerHeight=d;}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=y(K,
"resize",function(a){b.reflow(a);}),y(this,"destroy",this.unbindReflow));},setSize:function(b,f,e){var g=this,c=g.renderer,m;g.isResizing+=1;a.setAnimation(e,g);g.oldChartHeight=g.chartHeight;g.oldChartWidth=g.chartWidth;void 0!==b&&(g.options.chart.width=b);void 0!==f&&(g.options.chart.height=f);g.getChartSize();g.styledMode||(m=c.globalAnimation,(m?F:h)(g.container,{width:g.chartWidth+"px",height:g.chartHeight+"px"},m));g.setChartSize(!0);c.setSize(g.chartWidth,g.chartHeight,e);g.axes.forEach(function(a){a.isDirty=
!0;a.setScale();});g.isDirtyLegend=!0;g.isDirtyBox=!0;g.layOutTitles();g.getMargins();g.redraw(e);g.oldChartHeight=null;d(g,"resize");L(function(){g&&d(g,"endResize",null,function(){--g.isResizing;});},G(m).duration);},setChartSize:function(a){var b=this.inverted,f=this.renderer,e=this.chartWidth,g=this.chartHeight,c=this.options.chart,m=this.spacing,h=this.clipOffset,q,l,n,z;this.plotLeft=q=Math.round(this.plotLeft);this.plotTop=l=Math.round(this.plotTop);this.plotWidth=n=Math.max(0,Math.round(e-q-this.marginRight));
this.plotHeight=z=Math.max(0,Math.round(g-l-this.marginBottom));this.plotSizeX=b?z:n;this.plotSizeY=b?n:z;this.plotBorderWidth=c.plotBorderWidth||0;this.spacingBox=f.spacingBox={x:m[3],y:m[0],width:e-m[3]-m[1],height:g-m[0]-m[2]};this.plotBox=f.plotBox={x:q,y:l,width:n,height:z};e=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(e,h[3])/2);f=Math.ceil(Math.max(e,h[0])/2);this.clipBox={x:b,y:f,width:Math.floor(this.plotSizeX-Math.max(e,h[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-
Math.max(e,h[2])/2-f))};a||this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation();});d(this,"afterSetChartSize",{skipAxes:a});},resetMargins:function(){d(this,"resetMargins");var a=this,f=a.options.chart;["margin","spacing"].forEach(function(d){var e=f[d],g=b(e)?e:[e,e,e,e];["Top","Right","Bottom","Left"].forEach(function(b,e){a[d][e]=z(f[d+b],g[e]);});});H.forEach(function(b,f){a[b]=z(a.margin[f],a.spacing[f]);});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0];},drawChartBox:function(){var a=
this.options.chart,b=this.renderer,f=this.chartWidth,e=this.chartHeight,g=this.chartBackground,c=this.plotBackground,m=this.plotBorder,h,q=this.styledMode,l=this.plotBGImage,n=a.backgroundColor,z=a.plotBackgroundColor,k=a.plotBackgroundImage,D,u=this.plotLeft,r=this.plotTop,A=this.plotWidth,x=this.plotHeight,p=this.plotBox,B=this.clipRect,t=this.clipBox,v="animate";g||(this.chartBackground=g=b.rect().addClass("highcharts-background").add(),v="attr");if(q)h=D=g.strokeWidth();else{h=a.borderWidth||
0;D=h+(a.shadow?8:0);n={fill:n||"none"};if(h||g["stroke-width"])n.stroke=a.borderColor,n["stroke-width"]=h;g.attr(n).shadow(a.shadow);}g[v]({x:D/2,y:D/2,width:f-D-h%2,height:e-D-h%2,r:a.borderRadius});v="animate";c||(v="attr",this.plotBackground=c=b.rect().addClass("highcharts-plot-background").add());c[v](p);q||(c.attr({fill:z||"none"}).shadow(a.plotShadow),k&&(l?l.animate(p):this.plotBGImage=b.image(k,u,r,A,x).add()));B?B.animate({width:t.width,height:t.height}):this.clipRect=b.clipRect(t);v="animate";
m||(v="attr",this.plotBorder=m=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());q||m.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});m[v](m.crisp({x:u,y:r,width:A,height:x},-m.strokeWidth()));this.isDirtyBox=!1;d(this,"afterDrawChartBox");},propFromSeries:function(){var a=this,b=a.options.chart,d,e=a.options.series,g,c;["inverted","angular","polar"].forEach(function(m){d=f[b.type||b.defaultSeriesType];c=b[m]||d&&d.prototype[m];for(g=e&&e.length;!c&&
g--;)(d=f[e[g].type])&&d.prototype[m]&&(c=!0);a[m]=c;});},linkSeries:function(){var a=this,b=a.series;b.forEach(function(a){a.linkedSeries.length=0;});b.forEach(function(b){var f=b.options.linkedTo;x(f)&&(f=":previous"===f?a.series[b.index-1]:a.get(f))&&f.linkedParent!==b&&(f.linkedSeries.push(b),b.linkedParent=f,b.visible=z(b.options.visible,f.options.visible,b.visible));});d(this,"afterLinkSeries");},renderSeries:function(){this.series.forEach(function(a){a.translate();a.render();});},renderLabels:function(){var a=
this,b=a.options.labels;b.items&&b.items.forEach(function(f){var d=l(b.style,f.style),e=D(d.left)+a.plotLeft,g=D(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(f.html,e,g).attr({zIndex:2}).css(d).add();});},render:function(){var a=this.axes,b=this.renderer,f=this.options,d=0,e,g,c;this.setTitle();this.legend=new u(this,f.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();f=this.plotWidth;a.some(function(a){if(a.horiz&&a.visible&&a.options.labels.enabled&&
a.series.length)return d=21,!0});e=this.plotHeight=Math.max(this.plotHeight-d,0);a.forEach(function(a){a.setScale();});this.getAxisMargins();g=1.1<f/this.plotWidth;c=1.05<e/this.plotHeight;if(g||c)a.forEach(function(a){(a.horiz&&g||!a.horiz&&c)&&a.setTickInterval(!0);}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&a.forEach(function(a){a.visible&&a.render();});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();
this.setResponsive&&this.setResponsive();this.hasRendered=!0;},addCredits:function(a){var b=this;a=E(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(K.location.href=a.href);}).attr({align:a.position.align,zIndex:8}),b.styledMode||this.credits.css(a.style),this.credits.add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a);});},
destroy:function(){var b=this,f=b.axes,e=b.series,g=b.container,c,m=g&&g.parentNode;d(b,"destroy");b.renderer.forExport?a.erase(r,b):r[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");A(b);for(c=f.length;c--;)f[c]=f[c].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(c=e.length;c--;)e[c]=e[c].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a){var f=
b[a];f&&f.destroy&&(b[a]=f.destroy());});g&&(g.innerHTML="",A(g),m&&w(g));B(b,function(a,f){delete b[f];});},firstRender:function(){var b=this,f=b.options;if(!b.isReadyToRender||b.isReadyToRender()){b.getContainer();b.resetMargins();b.setChartSize();b.propFromSeries();b.getAxes();(a.isArray(f.series)?f.series:[]).forEach(function(a){b.initSeries(a);});b.linkSeries();d(b,"beforeRender");m&&(b.pointer=new m(b,f));b.render();if(!b.renderer.imgCount&&b.onload)b.onload();b.temporaryDisplay(!0);}},onload:function(){[this.callback].concat(this.callbacks).forEach(function(a){a&&
void 0!==this.index&&a.apply(this,[this]);},this);d(this,"load");d(this,"render");e(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null;}});})(I);(function(a){var y=a.addEvent,F=a.Chart;y(F,"afterSetChartSize",function(y){var k=this.options.chart.scrollablePlotArea;(k=k&&k.minWidth)&&!this.renderer.forExport&&(this.scrollablePixels=k=Math.max(0,k-this.chartWidth))&&(this.plotWidth+=k,this.clipBox.width+=k,y.skipAxes||this.axes.forEach(function(c){1===c.side?c.getPlotLinePath=function(){var k=
this.right,t;this.right=k-c.chart.scrollablePixels;t=a.Axis.prototype.getPlotLinePath.apply(this,arguments);this.right=k;return t}:(c.setAxisSize(),c.setAxisTranslation());}));});y(F,"render",function(){this.scrollablePixels?(this.setUpScrolling&&this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed();});F.prototype.setUpScrolling=function(){this.scrollingContainer=a.createElement("div",{className:"highcharts-scrolling"},{overflowX:"auto",WebkitOverflowScrolling:"touch"},this.renderTo);
this.innerContainer=a.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null;};F.prototype.applyFixed=function(){var y=this.container,k,c,p=!this.fixedDiv;p&&(this.fixedDiv=a.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.renderTo.style.overflow=
"visible",this.fixedRenderer=k=new a.Renderer(this.fixedDiv,0,0),this.scrollableMask=k.path().attr({fill:a.color(this.options.chart.backgroundColor||"#fff").setOpacity(.85).get(),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),[this.inverted?".highcharts-xaxis":".highcharts-yaxis",this.inverted?".highcharts-xaxis-labels":".highcharts-yaxis-labels",".highcharts-contextbutton",".highcharts-credits",".highcharts-legend",".highcharts-subtitle",".highcharts-title",".highcharts-legend-checkbox"].forEach(function(a){[].forEach.call(y.querySelectorAll(a),
function(a){(a.namespaceURI===k.SVG_NS?k.box:k.box.parentNode).appendChild(a);a.style.pointerEvents="auto";});}));this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);c=this.chartWidth+this.scrollablePixels;a.stop(this.container);this.container.style.width=c+"px";this.renderer.boxWrapper.attr({width:c,height:this.chartHeight,viewBox:[0,0,c,this.chartHeight].join(" ")});this.chartBackground.attr({width:c});p&&(c=this.options.chart.scrollablePlotArea,c.scrollPositionX&&(this.scrollingContainer.scrollLeft=
this.scrollablePixels*c.scrollPositionX));p=this.axisOffset;c=this.plotTop-p[0]-1;var p=this.plotTop+this.plotHeight+p[2],t=this.plotLeft+this.plotWidth-this.scrollablePixels;this.scrollableMask.attr({d:this.scrollablePixels?["M",0,c,"L",this.plotLeft-1,c,"L",this.plotLeft-1,p,"L",0,p,"Z","M",t,c,"L",this.chartWidth,c,"L",this.chartWidth,p,"L",t,p,"Z"]:["M",0,0]});};})(I);(function(a){var y,F=a.extend,G=a.erase,k=a.fireEvent,c=a.format,p=a.isArray,t=a.isNumber,v=a.pick,w=a.uniqueKey,r=a.defined,h=a.removeEvent;
a.Point=y=function(){};a.Point.prototype={init:function(a,c,h){var d;d=a.chart.options.chart.colorCount;var e=a.chart.styledMode;this.series=a;e||(this.color=a.color);this.applyOptions(c,h);this.id=r(this.id)?this.id:w();a.options.colorByPoint?(e||(d=a.options.colors||a.chart.options.colors,this.color=this.color||d[a.colorCounter],d=d.length),c=a.colorCounter,a.colorCounter++,a.colorCounter===d&&(a.colorCounter=0)):c=a.colorIndex;this.colorIndex=v(this.colorIndex,c);a.chart.pointCount++;k(this,"afterInit");
return this},applyOptions:function(a,c){var e=this.series,d=e.options.pointValKey||e.pointValKey;a=y.prototype.optionsToObject.call(this,a);F(this,a);this.options=this.options?F(this.options,a):a;a.group&&delete this.group;a.dataLabels&&delete this.dataLabels;d&&(this.y=this[d]);this.isNull=v(this.isValid&&!this.isValid(),null===this.x||!t(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===c&&e.xAxis&&e.xAxis.hasNames&&(this.x=e.xAxis.nameToX(this));void 0===this.x&&e&&(this.x=
void 0===c?e.autoIncrement(this):c);return this},setNestedProperty:function(e,c,h){h.split(".").reduce(function(d,e,b,h){d[e]=h.length-1===b?c:a.isObject(d[e],!0)?d[e]:{};return d[e]},e);return e},optionsToObject:function(e){var c={},h=this.series,d=h.options.keys,g=d||h.pointArrayMap||["y"],b=g.length,k=0,u=0;if(t(e)||null===e)c[g[0]]=e;else if(p(e))for(!d&&e.length>b&&(h=typeof e[0],"string"===h?c.name=e[0]:"number"===h&&(c.x=e[0]),k++);u<b;)d&&void 0===e[k]||(0<g[u].indexOf(".")?a.Point.prototype.setNestedProperty(c,
e[k],g[u]):c[g[u]]=e[k]),k++,u++;else"object"===typeof e&&(c=e,e.dataLabels&&(h._hasPointLabels=!0),e.marker&&(h._hasPointMarkers=!0));return c},getClassName:function(){return "highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",
""):"")},getZone:function(){var a=this.series,c=a.zones,a=a.zoneAxis||"y",h=0,d;for(d=c[h];this[a]>=d.value;)d=c[++h];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=d&&d.color&&!this.options.color?d.color:this.nonZonedColor;return d},destroy:function(){var a=this.series.chart,c=a.hoverPoints,n;a.pointCount--;c&&(this.setState(),G(c,this),c.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel||this.dataLabels)h(this),this.destroyElements();
this.legendItem&&a.legend.destroyItem(this);for(n in this)this[n]=null;},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],c,h=6;h--;)c=a[h],this[c]&&(this[c]=this[c].destroy());this.dataLabels&&(this.dataLabels.forEach(function(a){a.element&&a.destroy();}),delete this.dataLabels);this.connectors&&(this.connectors.forEach(function(a){a.element&&a.destroy();}),delete this.connectors);},getLabelConfig:function(){return {x:this.category,y:this.y,color:this.color,
colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var e=this.series,h=e.tooltipOptions,d=v(h.valueDecimals,""),g=h.valuePrefix||"",b=h.valueSuffix||"";e.chart.styledMode&&(a=e.chart.tooltip.styledModeFormat(a));(e.pointArrayMap||["y"]).forEach(function(e){e="{point."+e;if(g||b)a=a.replace(RegExp(e+"}","g"),g+e+"}"+b);a=a.replace(RegExp(e+"}","g"),e+":,."+d+"f}");});return c(a,
{point:this,series:this.series},e.chart.time)},firePointEvent:function(a,c,h){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();"click"===a&&e.allowPointSelect&&(h=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey);});k(this,a,c,h);},visible:!0};})(I);(function(a){var y=a.addEvent,F=a.animObject,G=a.arrayMax,k=a.arrayMin,c=a.correctFloat,p=a.defaultOptions,t=a.defaultPlotOptions,v=a.defined,w=a.erase,r=a.extend,
h=a.fireEvent,e=a.isArray,l=a.isNumber,n=a.isString,d=a.merge,g=a.objectEach,b=a.pick,x=a.removeEvent,u=a.splat,H=a.SVGElement,E=a.syncTimeout,B=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},
point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{animation:{duration:0}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},
{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",cropShoulder:1,init:function(a,d){h(this,"init",{options:d});var e=this,c,f=a.series,m;e.chart=a;e.options=d=e.setOptions(d);e.linkedSeries=[];e.bindAxes();r(e,{name:d.name,state:"",visible:!1!==d.visible,selected:!0===d.selected});c=d.events;g(c,function(a,b){e.hcEvents&&e.hcEvents[b]&&-1!==e.hcEvents[b].indexOf(a)||y(e,b,a);});if(c&&c.click||
d.point&&d.point.events&&d.point.events.click||d.allowPointSelect)a.runTrackerClick=!0;e.getColor();e.getSymbol();e.parallelArrays.forEach(function(a){e[a+"Data"]=[];});e.setData(d.data,!1);e.isCartesian&&(a.hasCartesianSeries=!0);f.length&&(m=f[f.length-1]);e._i=b(m&&m._i,-1)+1;a.orderSeries(this.insert(f));h(this,"afterInit");},insert:function(a){var d=this.options.index,e;if(l(d)){for(e=a.length;e--;)if(d>=b(a[e].options.index,a[e]._i)){a.splice(e+1,0,this);break}-1===e&&a.unshift(this);e+=1;}else a.push(this);
return b(e,a.length-1)},bindAxes:function(){var b=this,d=b.options,e=b.chart,g;h(this,"bindAxes",null,function(){(b.axisTypes||[]).forEach(function(f){e[f].forEach(function(a){g=a.options;if(d[f]===g.index||void 0!==d[f]&&d[f]===g.id||void 0===d[f]&&0===g.index)b.insert(a.series),b[f]=a,a.isDirty=!0;});b[f]||b.optionalAxis===f||a.error(18,!0,e);});});},updateParallelArrays:function(a,b){var d=a.series,e=arguments,f=l(b)?function(f){var e="y"===f&&d.toYData?d.toYData(a):a[f];d[f+"Data"][b]=e;}:function(a){Array.prototype[b].apply(d[a+
"Data"],Array.prototype.slice.call(e,2));};d.parallelArrays.forEach(f);},autoIncrement:function(){var a=this.options,d=this.xIncrement,e,g=a.pointIntervalUnit,f=this.chart.time,d=b(d,a.pointStart,0);this.pointInterval=e=b(this.pointInterval,a.pointInterval,1);g&&(a=new f.Date(d),"day"===g?f.set("Date",a,f.get("Date",a)+e):"month"===g?f.set("Month",a,f.get("Month",a)+e):"year"===g&&f.set("FullYear",a,f.get("FullYear",a)+e),e=a.getTime()-d);this.xIncrement=d+e;return d},setOptions:function(a){var e=this.chart,
g=e.options,c=g.plotOptions,f=(e.userOptions||{}).plotOptions||{},m=c[this.type],l=d(a);a=e.styledMode;h(this,"setOptions",{userOptions:l});this.userOptions=l;e=d(m,c.series,l);this.tooltipOptions=d(p.tooltip,p.plotOptions.series&&p.plotOptions.series.tooltip,p.plotOptions[this.type].tooltip,g.tooltip.userOptions,c.series&&c.series.tooltip,c[this.type].tooltip,l.tooltip);this.stickyTracking=b(l.stickyTracking,f[this.type]&&f[this.type].stickyTracking,f.series&&f.series.stickyTracking,this.tooltipOptions.shared&&
!this.noSharedTooltip?!0:e.stickyTracking);null===m.marker&&delete e.marker;this.zoneAxis=e.zoneAxis;g=this.zones=(e.zones||[]).slice();!e.negativeColor&&!e.negativeFillColor||e.zones||(c={value:e[this.zoneAxis+"Threshold"]||e.threshold||0,className:"highcharts-negative"},a||(c.color=e.negativeColor,c.fillColor=e.negativeFillColor),g.push(c));g.length&&v(g[g.length-1].value)&&g.push(a?{}:{color:this.color,fillColor:this.fillColor});h(this,"afterSetOptions",{options:e});return e},getName:function(){return b(this.options.name,
"Series "+(this.index+1))},getCyclic:function(a,d,e){var g,f=this.chart,c=this.userOptions,h=a+"Index",m=a+"Counter",l=e?e.length:b(f.options.chart[a+"Count"],f[a+"Count"]);d||(g=b(c[h],c["_"+h]),v(g)||(f.series.length||(f[m]=0),c["_"+h]=g=f[m]%l,f[m]+=1),e&&(d=e[g]));void 0!==g&&(this[h]=g);this[a]=d;},getColor:function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||t[this.type].color,this.chart.options.colors);},
getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols);},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,updateData:function(b){var d=this.options,e=this.points,g=[],f,c,h,m=this.requireSorting;this.xIncrement=null;b.forEach(function(b){var c,q,k;c=a.defined(b)&&this.pointClass.prototype.optionsToObject.call({series:this},b)||{};k=c.x;if((c=c.id)||l(k))c&&(q=(q=this.chart.get(c))&&q.index),void 0===q&&l(k)&&(q=this.xData.indexOf(k,h)),-1!==q&&void 0!==
q&&this.cropped&&(q=q>=this.cropStart?q-this.cropStart:q),-1===q||void 0===q||e[q]&&e[q].touched?g.push(b):b!==d.data[q]?(e[q].update(b,!1,null,!1),e[q].touched=!0,m&&(h=q+1)):e[q]&&(e[q].touched=!0),f=!0;},this);if(f)for(b=e.length;b--;)c=e[b],c.touched||c.remove(!1),c.touched=!1;else if(b.length===e.length)b.forEach(function(a,b){e[b].update&&a!==d.data[b]&&e[b].update(a,!1,null,!1);});else return !1;g.forEach(function(a){this.addPoint(a,!1);},this);return !0},setData:function(d,g,c,h){var f=this,m=
f.points,k=m&&m.length||0,z,u=f.options,r=f.chart,D=null,x=f.xAxis,A=u.turboThreshold,p=this.xData,B=this.yData,t=(z=f.pointArrayMap)&&z.length,v=u.keys,E=0,w=1,H;d=d||[];z=d.length;g=b(g,!0);!1!==h&&z&&k&&!f.cropped&&!f.hasGroupedData&&f.visible&&!f.isSeriesBoosting&&(H=this.updateData(d));if(!H){f.xIncrement=null;f.colorCounter=0;this.parallelArrays.forEach(function(a){f[a+"Data"].length=0;});if(A&&z>A){for(c=0;null===D&&c<z;)D=d[c],c++;if(l(D))for(c=0;c<z;c++)p[c]=this.autoIncrement(),B[c]=d[c];
else if(e(D))if(t)for(c=0;c<z;c++)D=d[c],p[c]=D[0],B[c]=D.slice(1,t+1);else for(v&&(E=v.indexOf("x"),w=v.indexOf("y"),E=0<=E?E:0,w=0<=w?w:1),c=0;c<z;c++)D=d[c],p[c]=D[E],B[c]=D[w];else a.error(12,!1,r);}else for(c=0;c<z;c++)void 0!==d[c]&&(D={series:f},f.pointClass.prototype.applyOptions.apply(D,[d[c]]),f.updateParallelArrays(D,c));B&&n(B[0])&&a.error(14,!0,r);f.data=[];f.options.data=f.userOptions.data=d;for(c=k;c--;)m[c]&&m[c].destroy&&m[c].destroy();x&&(x.minRange=x.userMinRange);f.isDirty=r.isDirtyBox=
!0;f.isDirtyData=!!m;c=!1;}"point"===u.legendType&&(this.processData(),this.generatePoints());g&&r.redraw(c);},processData:function(b){var d=this.xData,e=this.yData,c=d.length,f;f=0;var g,h,m=this.xAxis,l,k=this.options;l=k.cropThreshold;var n=this.getExtremesFromAll||k.getExtremesFromAll,u=this.isCartesian,k=m&&m.val2lin,r=m&&m.isLog,x=this.requireSorting,p,B;if(u&&!this.isDirty&&!m.isDirty&&!this.yAxis.isDirty&&!b)return !1;m&&(b=m.getExtremes(),p=b.min,B=b.max);u&&this.sorted&&!n&&(!l||c>l||this.forceCrop)&&
(d[c-1]<p||d[0]>B?(d=[],e=[]):this.yData&&(d[0]<p||d[c-1]>B)&&(f=this.cropData(this.xData,this.yData,p,B),d=f.xData,e=f.yData,f=f.start,g=!0));for(l=d.length||1;--l;)c=r?k(d[l])-k(d[l-1]):d[l]-d[l-1],0<c&&(void 0===h||c<h)?h=c:0>c&&x&&(a.error(15,!1,this.chart),x=!1);this.cropped=g;this.cropStart=f;this.processedXData=d;this.processedYData=e;this.closestPointRange=h;},cropData:function(a,d,e,c,f){var g=a.length,h=0,m=g,l;f=b(f,this.cropShoulder);for(l=0;l<g;l++)if(a[l]>=e){h=Math.max(0,l-f);break}for(e=
l;e<g;e++)if(a[e]>c){m=e+f;break}return {xData:a.slice(h,m),yData:d.slice(h,m),start:h,end:m}},generatePoints:function(){var a=this.options,b=a.data,d=this.data,e,f=this.processedXData,c=this.processedYData,g=this.pointClass,l=f.length,k=this.cropStart||0,n,x=this.hasGroupedData,a=a.keys,p,B=[],t;d||x||(d=[],d.length=b.length,d=this.data=d);a&&x&&(this.options.keys=!1);for(t=0;t<l;t++)n=k+t,x?(p=(new g).init(this,[f[t]].concat(u(c[t]))),p.dataGroup=this.groupMap[t],p.dataGroup.options&&(p.options=
p.dataGroup.options,r(p,p.dataGroup.options),delete p.dataLabels)):(p=d[n])||void 0===b[n]||(d[n]=p=(new g).init(this,b[n],f[t])),p&&(p.index=n,B[t]=p);this.options.keys=a;if(d&&(l!==(e=d.length)||x))for(t=0;t<e;t++)t!==k||x||(t+=l),d[t]&&(d[t].destroyElements(),d[t].plotX=void 0);this.data=d;this.points=B;h(this,"afterGeneratePoints");},getExtremes:function(a){var b=this.yAxis,d=this.processedXData,c,f=[],g=0;c=this.xAxis.getExtremes();var m=c.min,n=c.max,u,r,x=this.requireSorting?this.cropShoulder:
0,p,B;a=a||this.stackedYData||this.processedYData||[];c=a.length;for(B=0;B<c;B++)if(r=d[B],p=a[B],u=(l(p,!0)||e(p))&&(!b.positiveValuesOnly||p.length||0<p),r=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(d[B+x]||r)>=m&&(d[B-x]||r)<=n,u&&r)if(u=p.length)for(;u--;)"number"===typeof p[u]&&(f[g++]=p[u]);else f[g++]=p;this.dataMin=k(f);this.dataMax=G(f);h(this,"afterGetExtremes");},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,
d=a.stacking,e=this.xAxis,g=e.categories,f=this.yAxis,q=this.points,k=q.length,n=!!this.modifyValue,u,r=this.pointPlacementToXValue(),x=l(r),p=a.threshold,B=a.startFromThreshold?p:0,t,E,w,H,y=this.zoneAxis||"y",G=Number.MAX_VALUE;for(u=0;u<k;u++){var F=q[u],I=F.x,Q=F.y;E=F.low;var N=d&&f.stacks[(this.negStacks&&Q<(B?0:p)?"-":"")+this.stackKey],V;f.positiveValuesOnly&&null!==Q&&0>=Q&&(F.isNull=!0);F.plotX=t=c(Math.min(Math.max(-1E5,e.translate(I,0,0,0,1,r,"flags"===this.type)),1E5));d&&this.visible&&
!F.isNull&&N&&N[I]&&(H=this.getStackIndicator(H,I,this.index),V=N[I],Q=V.points[H.key],E=Q[0],Q=Q[1],E===B&&H.key===N[I].base&&(E=b(l(p)&&p,f.min)),f.positiveValuesOnly&&0>=E&&(E=null),F.total=F.stackTotal=V.total,F.percentage=V.total&&F.y/V.total*100,F.stackY=Q,V.setOffset(this.pointXOffset||0,this.barW||0));F.yBottom=v(E)?Math.min(Math.max(-1E5,f.translate(E,0,1,0,1)),1E5):null;n&&(Q=this.modifyValue(Q,F));F.plotY=E="number"===typeof Q&&Infinity!==Q?Math.min(Math.max(-1E5,f.translate(Q,0,1,0,1)),
1E5):void 0;F.isInside=void 0!==E&&0<=E&&E<=f.len&&0<=t&&t<=e.len;F.clientX=x?c(e.translate(I,0,0,0,1,r)):t;F.negative=F[y]<(a[y+"Threshold"]||p||0);F.category=g&&void 0!==g[F.x]?g[F.x]:F.x;F.isNull||(void 0!==w&&(G=Math.min(G,Math.abs(t-w))),w=t);F.zone=this.zones.length&&F.getZone();}this.closestPointRangePx=G;h(this,"afterTranslate");},getValidPoints:function(a,b,d){var e=this.chart;return (a||this.points||[]).filter(function(a){return b&&!e.isInsidePlot(a.plotX,a.plotY,e.inverted)?!1:d||!a.isNull})},
setClip:function(a){var b=this.chart,d=this.options,e=b.renderer,f=b.inverted,c=this.clipBox,g=c||b.clipBox,h=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,g.height,d.xAxis,d.yAxis].join(),m=b[h],l=b[h+"m"];m||(a&&(g.width=0,f&&(g.x=b.plotSizeX),b[h+"m"]=l=e.clipRect(f?b.plotSizeX+99:-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),b[h]=m=e.clipRect(g),m.count={length:0});a&&!m.count[this.index]&&(m.count[this.index]=!0,m.count.length+=1);!1!==d.clip&&(this.group.clip(a||
c?m:b.clipRect),this.markerGroup.clip(l),this.sharedClipKey=h);a||(m.count[this.index]&&(delete m.count[this.index],--m.count.length),0===m.count.length&&h&&b[h]&&(c||(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())));},animate:function(a){var b=this.chart,d=F(this.options.animation),e;a?this.setClip(d):(e=this.sharedClipKey,(a=b[e])&&a.animate({width:b.plotSizeX,x:0},d),b[e+"m"]&&b[e+"m"].animate({width:b.plotSizeX+99,x:0},d),this.animate=null);},afterAnimate:function(){this.setClip();
h(this,"afterAnimate");this.finishedAnimating=!0;},drawPoints:function(){var a=this.points,d=this.chart,e,c,f,g,h=this.options.marker,l,k,n,u=this[this.specialGroup]||this.markerGroup;e=this.xAxis;var r,x=b(h.enabled,!e||e.isRadial?!0:null,this.closestPointRangePx>=h.enabledThreshold*h.radius);if(!1!==h.enabled||this._hasPointMarkers)for(e=0;e<a.length;e++)c=a[e],g=c.graphic,l=c.marker||{},k=!!c.marker,f=x&&void 0===l.enabled||l.enabled,n=!1!==c.isInside,f&&!c.isNull?(f=b(l.symbol,this.symbol),r=this.markerAttribs(c,
c.selected&&"select"),g?g[n?"show":"hide"](!0).animate(r):n&&(0<r.width||c.hasImage)&&(c.graphic=g=d.renderer.symbol(f,r.x,r.y,r.width,r.height,k?l:h).add(u)),g&&!d.styledMode&&g.attr(this.pointAttribs(c,c.selected&&"select")),g&&g.addClass(c.getClassName(),!0)):g&&(c.graphic=g.destroy());},markerAttribs:function(a,d){var e=this.options.marker,c=a.marker||{},f=c.symbol||e.symbol,g=b(c.radius,e.radius);d&&(e=e.states[d],d=c.states&&c.states[d],g=b(d&&d.radius,e&&e.radius,g+(e&&e.radiusPlus||0)));a.hasImage=
f&&0===f.indexOf("url");a.hasImage&&(g=0);a={x:Math.floor(a.plotX)-g,y:a.plotY-g};g&&(a.width=a.height=2*g);return a},pointAttribs:function(a,d){var e=this.options.marker,c=a&&a.options,f=c&&c.marker||{},g=this.color,h=c&&c.color,m=a&&a.color,c=b(f.lineWidth,e.lineWidth);a=a&&a.zone&&a.zone.color;g=h||a||m||g;a=f.fillColor||e.fillColor||g;g=f.lineColor||e.lineColor||g;d&&(e=e.states[d],d=f.states&&f.states[d]||{},c=b(d.lineWidth,e.lineWidth,c+b(d.lineWidthPlus,e.lineWidthPlus,0)),a=d.fillColor||e.fillColor||
a,g=d.lineColor||e.lineColor||g);return {stroke:g,"stroke-width":c,fill:a}},destroy:function(b){var d=this,e=d.chart,c=/AppleWebKit\/533/.test(B.navigator.userAgent),f,m,l=d.data||[],k,n;h(d,"destroy");b||x(d);(d.axisTypes||[]).forEach(function(a){(n=d[a])&&n.series&&(w(n.series,d),n.isDirty=n.forceRedraw=!0);});d.legendItem&&d.chart.legend.destroyItem(d);for(m=l.length;m--;)(k=l[m])&&k.destroy&&k.destroy();d.points=null;a.clearTimeout(d.animationTimeout);g(d,function(a,b){a instanceof H&&!a.survive&&
(f=c&&"group"===b?"hide":"destroy",a[f]());});e.hoverSeries===d&&(e.hoverSeries=null);w(e.series,d);e.orderSeries();g(d,function(a,f){b&&"hcEvents"===f||delete d[f];});},getGraphPath:function(a,b,d){var e=this,f=e.options,c=f.step,g,h=[],m=[],l;a=a||e.points;(g=a.reversed)&&a.reverse();(c={right:1,center:2}[c]||c&&3)&&g&&(c=4-c);!f.connectNulls||b||d||(a=this.getValidPoints(a));a.forEach(function(g,q){var k=g.plotX,n=g.plotY,u=a[q-1];(g.leftCliff||u&&u.rightCliff)&&!d&&(l=!0);g.isNull&&!v(b)&&0<q?l=
!f.connectNulls:g.isNull&&!b?l=!0:(0===q||l?q=["M",g.plotX,g.plotY]:e.getPointSpline?q=e.getPointSpline(a,g,q):c?(q=1===c?["L",u.plotX,n]:2===c?["L",(u.plotX+k)/2,u.plotY,"L",(u.plotX+k)/2,n]:["L",k,u.plotY],q.push("L",k,n)):q=["L",k,n],m.push(g.x),c&&(m.push(g.x),2===c&&m.push(g.x)),h.push.apply(h,q),l=!1);});h.xMap=m;return e.graphPath=h},drawGraph:function(){var a=this,b=this.options,d=(this.gappedPath||this.getGraphPath).call(this),e=this.chart.styledMode,f=[["graph","highcharts-graph"]];e||f[0].push(b.lineColor||
this.color,b.dashStyle);f=a.getZonesGraphs(f);f.forEach(function(f,c){var g=f[0],h=a[g];h?(h.endX=a.preventGraphAnimation?null:d.xMap,h.animate({d:d})):d.length&&(a[g]=a.chart.renderer.path(d).addClass(f[1]).attr({zIndex:1}).add(a.group),e||(h={stroke:f[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},f[3]?h.dashstyle=f[3]:"square"!==b.linecap&&(h["stroke-linecap"]=h["stroke-linejoin"]="round"),h=a[g].attr(h).shadow(2>c&&b.shadow)));h&&(h.startX=d.xMap,h.isArea=d.isArea);});},getZonesGraphs:function(a){this.zones.forEach(function(b,
d){d=["zone-graph-"+d,"highcharts-graph highcharts-zone-graph-"+d+" "+(b.className||"")];this.chart.styledMode||d.push(b.color||this.color,b.dashStyle||this.options.dashStyle);a.push(d);},this);return a},applyZones:function(){var a=this,d=this.chart,e=d.renderer,c=this.zones,f,g,h=this.clips||[],l,k=this.graph,n=this.area,u=Math.max(d.chartWidth,d.chartHeight),r=this[(this.zoneAxis||"y")+"Axis"],x,p,B=d.inverted,t,v,E,w,H=!1;c.length&&(k||n)&&r&&void 0!==r.min&&(p=r.reversed,t=r.horiz,k&&!this.showLine&&
k.hide(),n&&n.hide(),x=r.getExtremes(),c.forEach(function(c,m){f=p?t?d.plotWidth:0:t?0:r.toPixels(x.min)||0;f=Math.min(Math.max(b(g,f),0),u);g=Math.min(Math.max(Math.round(r.toPixels(b(c.value,x.max),!0)||0),0),u);H&&(f=g=r.toPixels(x.max));v=Math.abs(f-g);E=Math.min(f,g);w=Math.max(f,g);r.isXAxis?(l={x:B?w:E,y:0,width:v,height:u},t||(l.x=d.plotHeight-l.x)):(l={x:0,y:B?w:E,width:u,height:v},t&&(l.y=d.plotWidth-l.y));B&&e.isVML&&(l=r.isXAxis?{x:0,y:p?E:w,height:l.width,width:d.chartWidth}:{x:l.y-d.plotLeft-
d.spacingBox.x,y:0,width:l.height,height:d.chartHeight});h[m]?h[m].animate(l):(h[m]=e.clipRect(l),k&&a["zone-graph-"+m].clip(h[m]),n&&a["zone-area-"+m].clip(h[m]));H=c.value>x.max;a.resetZones&&0===g&&(g=void 0);}),this.clips=h);},invertGroups:function(a){function b(){["group","markerGroup"].forEach(function(b){d[b]&&(e.renderer.isVML&&d[b].attr({width:d.yAxis.len,height:d.xAxis.len}),d[b].width=d.yAxis.len,d[b].height=d.xAxis.len,d[b].invert(a));});}var d=this,e=d.chart,f;d.xAxis&&(f=y(e,"resize",b),
y(d,"destroy",f),b(a),d.invertGroups=b);},plotGroup:function(a,b,d,e,f){var c=this[a],g=!c;g&&(this[a]=c=this.chart.renderer.g().attr({zIndex:e||.1}).add(f));c.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(v(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(c.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);c.attr({visibility:d})[g?"attr":"animate"](this.getPlotBox());return c},getPlotBox:function(){var a=
this.chart,b=this.xAxis,d=this.yAxis;a.inverted&&(b=d,d=this.xAxis);return {translateX:b?b.left:a.plotLeft,translateY:d?d.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,d,e=a.options,f=!!a.animate&&b.renderer.isSVG&&F(e.animation).duration,c=a.visible?"inherit":"hidden",g=e.zIndex,l=a.hasRendered,k=b.seriesGroup,n=b.inverted;h(this,"render");d=a.plotGroup("group","series",c,g,k);a.markerGroup=a.plotGroup("markerGroup","markers",c,g,k);f&&a.animate(!0);d.inverted=a.isCartesian?
n:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(n);!1===e.clip||a.sharedClipKey||l||d.clip(b.clipRect);f&&a.animate();l||(a.animationTimeout=E(function(){a.afterAnimate();},f));a.isDirty=!1;a.hasRendered=!0;h(a,"afterRender");},redraw:function(){var a=this.chart,d=this.isDirty||this.isDirtyData,e=this.group,c=this.xAxis,f=this.yAxis;e&&(a.inverted&&e.attr({width:a.plotWidth,
height:a.plotHeight}),e.animate({translateX:b(c&&c.left,a.plotLeft),translateY:b(f&&f.top,a.plotTop)}));this.translate();this.render();d&&delete this.kdTree;},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var d=this.xAxis,e=this.yAxis,f=this.chart.inverted;return this.searchKDTree({clientX:f?d.len-a.chartY+d.pos:a.chartX-d.pos,plotY:f?e.len-a.chartX+e.pos:a.chartY-e.pos},b,a)},buildKDTree:function(a){function b(a,e,c){var f,g;if(g=a&&a.length)return f=d.kdAxisArray[e%c],a.sort(function(a,
b){return a[f]-b[f]}),g=Math.floor(g/2),{point:a[g],left:b(a.slice(0,g),e+1,c),right:b(a.slice(g+1),e+1,c)}}this.buildingKdTree=!0;var d=this,e=-1<d.options.findNearestPointBy.indexOf("y")?2:1;delete d.kdTree;E(function(){d.kdTree=b(d.getValidPoints(null,!d.directTouch),e,e);d.buildingKdTree=!1;},d.options.kdNow||a&&"touchstart"===a.type?0:1);},searchKDTree:function(a,b,d){function e(a,b,d,m){var l=b.point,k=f.kdAxisArray[d%m],q,n,u=l;n=v(a[c])&&v(l[c])?Math.pow(a[c]-l[c],2):null;q=v(a[g])&&v(l[g])?
Math.pow(a[g]-l[g],2):null;q=(n||0)+(q||0);l.dist=v(q)?Math.sqrt(q):Number.MAX_VALUE;l.distX=v(n)?Math.sqrt(n):Number.MAX_VALUE;k=a[k]-l[k];q=0>k?"left":"right";n=0>k?"right":"left";b[q]&&(q=e(a,b[q],d+1,m),u=q[h]<u[h]?q:l);b[n]&&Math.sqrt(k*k)<u[h]&&(a=e(a,b[n],d+1,m),u=a[h]<u[h]?a:u);return u}var f=this,c=this.kdAxisArray[0],g=this.kdAxisArray[1],h=b?"distX":"dist";b=-1<f.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree(d);if(this.kdTree)return e(a,
this.kdTree,b,b)},pointPlacementToXValue:function(){var a=this.options.pointPlacement;"between"===a&&(a=.5);l(a)&&(a*=b(this.options.pointRange||this.xAxis.pointRange));return a}});})(I);(function(a){var y=a.Axis,F=a.Chart,G=a.correctFloat,k=a.defined,c=a.destroyObjectProperties,p=a.format,t=a.objectEach,v=a.pick,w=a.Series;a.StackItem=function(a,c,e,l,k){var d=a.chart.inverted;this.axis=a;this.isNegative=e;this.options=c;this.x=l;this.total=null;this.points={};this.stack=k;this.rightCliff=this.leftCliff=
0;this.alignOptions={align:c.align||(d?e?"left":"right":"center"),verticalAlign:c.verticalAlign||(d?"middle":e?"bottom":"top"),y:v(c.y,d?4:e?14:-6),x:v(c.x,d?e?-6:6:0)};this.textAlign=c.textAlign||(d?e?"right":"left":"center");};a.StackItem.prototype={destroy:function(){c(this,this.axis);},render:function(a){var c=this.axis.chart,e=this.options,l=e.format,l=l?p(l,this,c.time):e.formatter.call(this);this.label?this.label.attr({text:l,visibility:"hidden"}):this.label=c.renderer.text(l,null,null,e.useHTML).css(e.style).attr({align:this.textAlign,
rotation:e.rotation,visibility:"hidden"}).add(a);this.label.labelrank=c.plotHeight;},setOffset:function(a,c){var e=this.axis,h=e.chart,n=e.translate(e.usePercentage?100:this.total,0,0,0,1),d=e.translate(0),d=k(n)&&Math.abs(n-d);a=h.xAxis[0].translate(this.x)+a;e=k(n)&&this.getStackBox(h,this,a,n,c,d,e);(c=this.label)&&e&&(c.align(this.alignOptions,null,e),e=c.alignAttr,c[!1===this.options.crop||h.isInsidePlot(e.x,e.y)?"show":"hide"](!0));},getStackBox:function(a,c,e,l,k,d,g){var b=c.axis.reversed,h=
a.inverted;a=g.height+g.pos-(h?a.plotLeft:a.plotTop);c=c.isNegative&&!b||!c.isNegative&&b;return {x:h?c?l:l-d:e,y:h?a-e-k:c?a-l-d:a-l,width:h?d:k,height:h?k:d}}};F.prototype.getStacks=function(){var a=this;a.yAxis.forEach(function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks);});a.series.forEach(function(c){!c.options.stacking||!0!==c.visible&&!1!==a.options.chart.ignoreHiddenSeries||(c.stackKey=c.type+v(c.options.stack,""));});};y.prototype.buildStacks=function(){var a=this.series,c=v(this.options.reversedStacks,
!0),e=a.length,l;if(!this.isXAxis){this.usePercentage=!1;for(l=e;l--;)a[c?l:e-l-1].setStackedPoints();for(l=0;l<e;l++)a[l].modifyStacks();}};y.prototype.renderStackTotals=function(){var a=this.chart,c=a.renderer,e=this.stacks,l=this.stackTotalGroup;l||(this.stackTotalGroup=l=c.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());l.translate(a.plotLeft,a.plotTop);t(e,function(a){t(a,function(a){a.render(l);});});};y.prototype.resetStacks=function(){var a=this,c=a.stacks;a.isXAxis||t(c,function(e){t(e,
function(c,h){c.touched<a.stacksTouched?(c.destroy(),delete e[h]):(c.total=null,c.cumulative=null);});});};y.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),t(a,function(a){t(a,function(a){a.cumulative=a.total;});}));};w.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var c=this.processedXData,h=this.processedYData,e=[],l=h.length,n=this.options,d=n.threshold,g=v(n.startFromThreshold&&
d,0),b=n.stack,n=n.stacking,x=this.stackKey,u="-"+x,p=this.negStacks,t=this.yAxis,B=t.stacks,m=t.oldStacks,z,D,A,f,q,w,y;t.stacksTouched+=1;for(q=0;q<l;q++)w=c[q],y=h[q],z=this.getStackIndicator(z,w,this.index),f=z.key,A=(D=p&&y<(g?0:d))?u:x,B[A]||(B[A]={}),B[A][w]||(m[A]&&m[A][w]?(B[A][w]=m[A][w],B[A][w].total=null):B[A][w]=new a.StackItem(t,t.options.stackLabels,D,w,b)),A=B[A][w],null!==y?(A.points[f]=A.points[this.index]=[v(A.cumulative,g)],k(A.cumulative)||(A.base=f),A.touched=t.stacksTouched,
0<z.index&&!1===this.singleStacks&&(A.points[f][0]=A.points[this.index+","+w+",0"][0])):A.points[f]=A.points[this.index]=null,"percent"===n?(D=D?x:u,p&&B[D]&&B[D][w]?(D=B[D][w],A.total=D.total=Math.max(D.total,A.total)+Math.abs(y)||0):A.total=G(A.total+(Math.abs(y)||0))):A.total=G(A.total+(y||0)),A.cumulative=v(A.cumulative,g)+(y||0),null!==y&&(A.points[f].push(A.cumulative),e[q]=A.cumulative);"percent"===n&&(t.usePercentage=!0);this.stackedYData=e;t.oldStacks={};}};w.prototype.modifyStacks=function(){var a=
this,c=a.stackKey,e=a.yAxis.stacks,l=a.processedXData,k,d=a.options.stacking;a[d+"Stacker"]&&[c,"-"+c].forEach(function(c){for(var b=l.length,g,h;b--;)if(g=l[b],k=a.getStackIndicator(k,g,a.index,c),h=(g=e[c]&&e[c][g])&&g.points[k.key])a[d+"Stacker"](h,g,b);});};w.prototype.percentStacker=function(a,c,e){c=c.total?100/c.total:0;a[0]=G(a[0]*c);a[1]=G(a[1]*c);this.stackedYData[e]=a[1];};w.prototype.getStackIndicator=function(a,c,e,l){!k(a)||a.x!==c||l&&a.key!==l?a={x:c,index:0,key:l}:a.index++;a.key=[e,
c,a.index].join();return a};})(I);(function(a){var y=a.addEvent,F=a.animate,G=a.Axis,k=a.Chart,c=a.createElement,p=a.css,t=a.defined,v=a.erase,w=a.extend,r=a.fireEvent,h=a.isNumber,e=a.isObject,l=a.isArray,n=a.merge,d=a.objectEach,g=a.pick,b=a.Point,x=a.Series,u=a.seriesTypes,H=a.setAnimation,E=a.splat;a.cleanRecursively=function(b,c){var g={};d(b,function(d,h){if(e(b[h],!0)&&c[h])d=a.cleanRecursively(b[h],c[h]),Object.keys(d).length&&(g[h]=d);else if(e(b[h])||b[h]!==c[h])g[h]=b[h];});return g};w(k.prototype,
{addSeries:function(a,b,d){var e,c=this;a&&(b=g(b,!0),r(c,"addSeries",{options:a},function(){e=c.initSeries(a);c.isDirtyLegend=!0;c.linkSeries();r(c,"afterAddSeries");b&&c.redraw(d);}));return e},addAxis:function(a,b,d,e){var c=b?"xAxis":"yAxis",f=this.options;a=n(a,{index:this[c].length,isX:b});b=new G(this,a);f[c]=E(f[c]||{});f[c].push(a);g(d,!0)&&this.redraw(e);return b},showLoading:function(a){var b=this,d=b.options,e=b.loadingDiv,g=d.loading,f=function(){e&&p(e,{left:b.plotLeft+"px",top:b.plotTop+
"px",width:b.plotWidth+"px",height:b.plotHeight+"px"});};e||(b.loadingDiv=e=c("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=c("span",{className:"highcharts-loading-inner"},null,e),y(b,"redraw",f));e.className="highcharts-loading";b.loadingSpan.innerHTML=a||d.lang.loading;b.styledMode||(p(e,w(g.style,{zIndex:10})),p(b.loadingSpan,g.labelStyle),b.loadingShown||(p(e,{opacity:0,display:""}),F(e,{opacity:g.style.opacity||.5},{duration:g.showDuration||0})));
b.loadingShown=!0;f();},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",this.styledMode||F(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){p(b,{display:"none"});}}));this.loadingShown=!1;},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),collectionsWithUpdate:"xAxis yAxis zAxis series colorAxis pane".split(" "),update:function(b,e,c,l){var m=this,f={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},k,u,p,x=[];r(m,"update",{options:b});b.isResponsiveOptions||m.setResponsive(!1,!0);b=a.cleanRecursively(b,m.options);if(k=b.chart){n(!0,m.options.chart,k);"className"in k&&m.setClassName(k.className);
"reflow"in k&&m.setReflow(k.reflow);if("inverted"in k||"polar"in k||"type"in k)m.propFromSeries(),u=!0;"alignTicks"in k&&(u=!0);d(k,function(a,b){-1!==m.propsRequireUpdateSeries.indexOf("chart."+b)&&(p=!0);-1!==m.propsRequireDirtyBox.indexOf(b)&&(m.isDirtyBox=!0);});!m.styledMode&&"style"in k&&m.renderer.setStyle(k.style);}!m.styledMode&&b.colors&&(this.options.colors=b.colors);b.plotOptions&&n(!0,this.options.plotOptions,b.plotOptions);d(b,function(a,b){if(m[b]&&"function"===typeof m[b].update)m[b].update(a,
!1);else if("function"===typeof m[f[b]])m[f[b]](a);"chart"!==b&&-1!==m.propsRequireUpdateSeries.indexOf(b)&&(p=!0);});this.collectionsWithUpdate.forEach(function(a){var d;b[a]&&("series"===a&&(d=[],m[a].forEach(function(a,b){a.options.isInternal||d.push(g(a.options.index,b));})),E(b[a]).forEach(function(b,f){(f=t(b.id)&&m.get(b.id)||m[a][d?d[f]:f])&&f.coll===a&&(f.update(b,!1),c&&(f.touched=!0));if(!f&&c)if("series"===a)m.addSeries(b,!1).touched=!0;else if("xAxis"===a||"yAxis"===a)m.addAxis(b,"xAxis"===
a,!1).touched=!0;}),c&&m[a].forEach(function(a){a.touched||a.options.isInternal?delete a.touched:x.push(a);}));});x.forEach(function(a){a.remove&&a.remove(!1);});u&&m.axes.forEach(function(a){a.update({},!1);});p&&m.series.forEach(function(a){a.update({},!1);});b.loading&&n(!0,m.options.loading,b.loading);u=k&&k.width;k=k&&k.height;h(u)&&u!==m.chartWidth||h(k)&&k!==m.chartHeight?m.setSize(u,k,l):g(e,!0)&&m.redraw(l);r(m,"afterUpdate",{options:b});},setSubtitle:function(a){this.setTitle(void 0,a);}});w(b.prototype,
{update:function(a,b,d,c){function h(){f.applyOptions(a);null===f.y&&l&&(f.graphic=l.destroy());e(a,!0)&&(l&&l.element&&a&&a.marker&&void 0!==a.marker.symbol&&(f.graphic=l.destroy()),a&&a.dataLabels&&f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()),f.connector&&(f.connector=f.connector.destroy()));k=f.index;m.updateParallelArrays(f,k);u.data[k]=e(u.data[k],!0)||e(a,!0)?f.options:g(a,u.data[k]);m.isDirty=m.isDirtyData=!0;!m.fixedBox&&m.hasCartesianSeries&&(n.isDirtyBox=!0);"point"===u.legendType&&
(n.isDirtyLegend=!0);b&&n.redraw(d);}var f=this,m=f.series,l=f.graphic,k,n=m.chart,u=m.options;b=g(b,!0);!1===c?h():f.firePointEvent("update",{options:a},h);},remove:function(a,b){this.series.removePoint(this.series.data.indexOf(this),a,b);}});w(x.prototype,{addPoint:function(a,b,d,e){var c=this.options,f=this.data,h=this.chart,m=this.xAxis,m=m&&m.hasNames&&m.names,l=c.data,k,n,u=this.xData,p,r;b=g(b,!0);k={series:this};this.pointClass.prototype.applyOptions.apply(k,[a]);r=k.x;p=u.length;if(this.requireSorting&&
r<u[p-1])for(n=!0;p&&u[p-1]>r;)p--;this.updateParallelArrays(k,"splice",p,0,0);this.updateParallelArrays(k,p);m&&k.name&&(m[r]=k.name);l.splice(p,0,a);n&&(this.data.splice(p,0,null),this.processData());"point"===c.legendType&&this.generatePoints();d&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(k,"shift"),l.shift()));this.isDirtyData=this.isDirty=!0;b&&h.redraw(e);},removePoint:function(a,b,d){var e=this,c=e.data,f=c[a],h=e.points,m=e.chart,l=function(){h&&h.length===c.length&&
h.splice(a,1);c.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(f||{series:e},"splice",a,1);f&&f.destroy();e.isDirty=!0;e.isDirtyData=!0;b&&m.redraw();};H(d,m);b=g(b,!0);f?f.firePointEvent("remove",null,l):l();},remove:function(a,b,d,e){function c(){f.destroy(e);f.remove=null;h.isDirtyLegend=h.isDirtyBox=!0;h.linkSeries();g(a,!0)&&h.redraw(b);}var f=this,h=f.chart;!1!==d?r(f,"remove",null,c):c();},update:function(b,d){b=a.cleanRecursively(b,this.userOptions);var e=this,c=e.chart,h=e.userOptions,
f=e.initialType||e.type,m=b.type||h.type||c.options.chart.type,l=u[f].prototype,k,p=["group","markerGroup","dataLabelsGroup"],x=["navigatorSeries","baseSeries"],t=e.finishedAnimating&&{animation:!1},v=["data","name","turboThreshold"],B=Object.keys(b),E=0<B.length;B.forEach(function(a){-1===v.indexOf(a)&&(E=!1);});if(E)b.data&&this.setData(b.data,!1),b.name&&this.setName(b.name,!1);else{x=p.concat(x);x.forEach(function(a){x[a]=e[a];delete e[a];});b=n(h,t,{index:e.index,pointStart:g(h.pointStart,e.xData[0])},
{data:e.options.data},b);e.remove(!1,null,!1,!0);for(k in l)e[k]=void 0;u[m||f]?w(e,u[m||f].prototype):a.error(17,!0,c);x.forEach(function(a){e[a]=x[a];});e.init(c,b);b.zIndex!==h.zIndex&&p.forEach(function(a){e[a]&&e[a].attr({zIndex:b.zIndex});});e.initialType=f;c.linkSeries();}r(this,"afterUpdate");g(d,!0)&&c.redraw(E?void 0:!1);},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0;}});w(G.prototype,{update:function(a,b){var e=this.chart,c=a&&a.events||
{};a=n(this.userOptions,a);e.options[this.coll].indexOf&&(e.options[this.coll][e.options[this.coll].indexOf(this.userOptions)]=a);d(e.options[this.coll].events,function(a,b){"undefined"===typeof c[b]&&(c[b]=void 0);});this.destroy(!0);this.init(e,w(a,{events:c}));e.isDirtyBox=!0;g(b,!0)&&e.redraw();},remove:function(a){for(var b=this.chart,d=this.coll,e=this.series,c=e.length;c--;)e[c]&&e[c].remove(!1);v(b.axes,this);v(b[d],this);l(b.options[d])?b.options[d].splice(this.options.index,1):delete b.options[d];
b[d].forEach(function(a,b){a.options.index=a.userOptions.index=b;});this.destroy();b.isDirtyBox=!0;g(a,!0)&&b.redraw();},setTitle:function(a,b){this.update({title:a},b);},setCategories:function(a,b){this.update({categories:a},b);}});})(I);(function(a){var y=a.color,F=a.pick,G=a.Series,k=a.seriesType;k("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(c){var k=[],t=[],v=this.xAxis,w=this.yAxis,r=w.stacks[this.stackKey],h={},e=this.index,l=w.series,n=l.length,d,g=F(w.options.reversedStacks,
!0)?1:-1,b;c=c||this.points;if(this.options.stacking){for(b=0;b<c.length;b++)c[b].leftNull=c[b].rightNull=null,h[c[b].x]=c[b];a.objectEach(r,function(a,b){null!==a.total&&t.push(b);});t.sort(function(a,b){return a-b});d=l.map(function(a){return a.visible});t.forEach(function(a,c){var l=0,u,p;if(h[a]&&!h[a].isNull)k.push(h[a]),[-1,1].forEach(function(l){var k=1===l?"rightNull":"leftNull",m=0,x=r[t[c+l]];if(x)for(b=e;0<=b&&b<n;)u=x.points[b],u||(b===e?h[a][k]=!0:d[b]&&(p=r[a].points[b])&&(m-=p[1]-p[0])),
b+=g;h[a][1===l?"rightCliff":"leftCliff"]=m;});else{for(b=e;0<=b&&b<n;){if(u=r[a].points[b]){l=u[1];break}b+=g;}l=w.translate(l,0,1,0,1);k.push({isNull:!0,plotX:v.translate(a,0,0,0,1),x:a,plotY:l,yBottom:l});}});}return k},getGraphPath:function(a){var c=G.prototype.getGraphPath,k=this.options,v=k.stacking,w=this.yAxis,r,h,e=[],l=[],n=this.index,d,g=w.stacks[this.stackKey],b=k.threshold,x=w.getThreshold(k.threshold),u,k=k.connectNulls||"percent"===v,H=function(c,h,k){var m=a[c];c=v&&g[m.x].points[n];var u=
m[k+"Null"]||0;k=m[k+"Cliff"]||0;var p,f,m=!0;k||u?(p=(u?c[0]:c[1])+k,f=c[0]+k,m=!!u):!v&&a[h]&&a[h].isNull&&(p=f=b);void 0!==p&&(l.push({plotX:d,plotY:null===p?x:w.getThreshold(p),isNull:m,isCliff:!0}),e.push({plotX:d,plotY:null===f?x:w.getThreshold(f),doCurve:!1}));};a=a||this.points;v&&(a=this.getStackPoints(a));for(r=0;r<a.length;r++)if(h=a[r].isNull,d=F(a[r].rectPlotX,a[r].plotX),u=F(a[r].yBottom,x),!h||k)k||H(r,r-1,"left"),h&&!v&&k||(l.push(a[r]),e.push({x:r,plotX:d,plotY:u})),k||H(r,r+1,"right");
r=c.call(this,l,!0,!0);e.reversed=!0;h=c.call(this,e,!0,!0);h.length&&(h[0]="L");h=r.concat(h);c=c.call(this,l,!1,k);h.xMap=r.xMap;this.areaPath=h;return c},drawGraph:function(){this.areaPath=[];G.prototype.drawGraph.apply(this);var a=this,k=this.areaPath,t=this.options,v=[["area","highcharts-area",this.color,t.fillColor]];this.zones.forEach(function(c,k){v.push(["zone-area-"+k,"highcharts-area highcharts-zone-area-"+k+" "+c.className,c.color||a.color,c.fillColor||t.fillColor]);});v.forEach(function(c){var p=
c[0],h=a[p];h?(h.endX=a.preventGraphAnimation?null:k.xMap,h.animate({d:k})):(h={zIndex:0},a.chart.styledMode||(h.fill=F(c[3],y(c[2]).setOpacity(F(t.fillOpacity,.75)).get())),h=a[p]=a.chart.renderer.path(k).addClass(c[1]).attr(h).add(a.group),h.isArea=!0);h.startX=k.xMap;h.shiftUnit=t.step?2:1;});},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle});})(I);(function(a){var y=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,G,k){var c=G.plotX,p=G.plotY,t=a[k-1];k=a[k+1];var v,w,r,
h;if(t&&!t.isNull&&!1!==t.doCurve&&!G.isCliff&&k&&!k.isNull&&!1!==k.doCurve&&!G.isCliff){a=t.plotY;r=k.plotX;k=k.plotY;var e=0;v=(1.5*c+t.plotX)/2.5;w=(1.5*p+a)/2.5;r=(1.5*c+r)/2.5;h=(1.5*p+k)/2.5;r!==v&&(e=(h-w)*(r-c)/(r-v)+p-h);w+=e;h+=e;w>a&&w>p?(w=Math.max(a,p),h=2*p-w):w<a&&w<p&&(w=Math.min(a,p),h=2*p-w);h>k&&h>p?(h=Math.max(k,p),w=2*p-h):h<k&&h<p&&(h=Math.min(k,p),w=2*p-h);G.rightContX=r;G.rightContY=h;}G=["C",y(t.rightContX,t.plotX),y(t.rightContY,t.plotY),y(v,c),y(w,p),c,p];t.rightContX=t.rightContY=
null;return G}});})(I);(function(a){var y=a.seriesTypes.area.prototype,F=a.seriesType;F("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:y.getStackPoints,getGraphPath:y.getGraphPath,drawGraph:y.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle});})(I);(function(a){var y=a.animObject,F=a.color,G=a.extend,k=a.defined,c=a.isNumber,p=a.merge,t=a.pick,v=a.Series,w=a.seriesType,r=a.svg;w("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,
cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){v.prototype.init.apply(this,arguments);var a=this,e=a.chart;e.hasRendered&&e.series.forEach(function(e){e.type===a.type&&
(e.isDirty=!0);});},getColumnMetrics:function(){var a=this,e=a.options,c=a.xAxis,k=a.yAxis,d=c.options.reversedStacks,d=c.reversed&&!d||!c.reversed&&d,g,b={},p=0;!1===e.grouping?p=1:a.chart.series.forEach(function(d){var e=d.options,c=d.yAxis,h;d.type!==a.type||!d.visible&&a.chart.options.chart.ignoreHiddenSeries||k.len!==c.len||k.pos!==c.pos||(e.stacking?(g=d.stackKey,void 0===b[g]&&(b[g]=p++),h=b[g]):!1!==e.grouping&&(h=p++),d.columnIndex=h);});var u=Math.min(Math.abs(c.transA)*(c.ordinalSlope||e.pointRange||
c.closestPointRange||c.tickInterval||1),c.len),r=u*e.groupPadding,v=(u-2*r)/(p||1),e=Math.min(e.maxPointWidth||c.len,t(e.pointWidth,v*(1-2*e.pointPadding)));a.columnMetrics={width:e,offset:(v-e)/2+(r+((a.columnIndex||0)+(d?1:0))*v-u/2)*(d?-1:1)};return a.columnMetrics},crispCol:function(a,e,c,k){var d=this.chart,g=this.borderWidth,b=-(g%2?.5:0),g=g%2?.5:1;d.inverted&&d.renderer.isVML&&(g+=1);this.options.crisp&&(c=Math.round(a+c)+b,a=Math.round(a)+b,c-=a);k=Math.round(e+k)+g;b=.5>=Math.abs(e)&&.5<
k;e=Math.round(e)+g;k-=e;b&&k&&(--e,k+=1);return {x:a,y:e,width:c,height:k}},translate:function(){var a=this,e=a.chart,c=a.options,n=a.dense=2>a.closestPointRange*a.xAxis.transA,n=a.borderWidth=t(c.borderWidth,n?0:1),d=a.yAxis,g=c.threshold,b=a.translatedThreshold=d.getThreshold(g),p=t(c.minPointLength,5),u=a.getColumnMetrics(),r=u.width,E=a.barW=Math.max(r,1+2*n),B=a.pointXOffset=u.offset;e.inverted&&(b-=.5);c.pointPadding&&(E=Math.ceil(E));v.prototype.translate.apply(a);a.points.forEach(function(c){var h=
t(c.yBottom,b),l=999+Math.abs(h),m=r,l=Math.min(Math.max(-l,c.plotY),d.len+l),f=c.plotX+B,n=E,u=Math.min(l,h),x,v=Math.max(l,h)-u;p&&Math.abs(v)<p&&(v=p,x=!d.reversed&&!c.negative||d.reversed&&c.negative,c.y===g&&a.dataMax<=g&&d.min<g&&(x=!x),u=Math.abs(u-b)>p?h-p:b-(x?p:0));k(c.options.pointWidth)&&(m=n=Math.ceil(c.options.pointWidth),f-=Math.round((m-r)/2));c.barX=f;c.pointWidth=m;c.tooltipPos=e.inverted?[d.len+d.pos-e.plotLeft-l,a.xAxis.len-f-n/2,v]:[f+n/2,l+d.pos-e.plotTop,v];c.shapeType=c.shapeType||
"rect";c.shapeArgs=a.crispCol.apply(a,c.isNull?[f,b,n,0]:[f,u,n,v]);});},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data");},pointAttribs:function(a,e){var c=this.options,h,d=this.pointAttrToOptions||{};h=d.stroke||"borderColor";var g=d["stroke-width"]||"borderWidth",b=a&&a.color||this.color,k=a&&a[h]||c[h]||this.color||b,u=a&&a[g]||c[g]||this[g]||0,d=c.dashStyle;a&&this.zones.length&&(b=a.getZone(),
b=a.options.color||b&&b.color||this.color);e&&(a=p(c.states[e],a.options.states&&a.options.states[e]||{}),e=a.brightness,b=a.color||void 0!==e&&F(b).brighten(a.brightness).get()||b,k=a[h]||k,u=a[g]||u,d=a.dashStyle||d);h={fill:b,stroke:k,"stroke-width":u};d&&(h.dashstyle=d);return h},drawPoints:function(){var a=this,e=this.chart,k=a.options,n=e.renderer,d=k.animationLimit||250,g;a.points.forEach(function(b){var h=b.graphic,l=h&&e.pointCount<d?"animate":"attr";if(c(b.plotY)&&null!==b.y){g=b.shapeArgs;
if(h)h[l](p(g));else b.graphic=h=n[b.shapeType](g).add(b.group||a.group);k.borderRadius&&h.attr({r:k.borderRadius});e.styledMode||h[l](a.pointAttribs(b,b.selected&&"select")).shadow(k.shadow,null,k.stacking&&!k.borderRadius);h.addClass(b.getClassName(),!0);}else h&&(b.graphic=h.destroy());});},animate:function(a){var e=this,c=this.yAxis,h=e.options,d=this.chart.inverted,g={},b=d?"translateX":"translateY",k;r&&(a?(g.scaleY=.001,a=Math.min(c.pos+c.len,Math.max(c.pos,c.toPixels(h.threshold))),d?g.translateX=
a-c.len:g.translateY=a,e.clipBox&&e.setClip(),e.group.attr(g)):(k=e.group.attr(b),e.group.animate({scaleY:1},G(y(e.options.animation),{step:function(a,d){g[b]=k+d.pos*(c.pos-k);e.group.attr(g);}})),e.animate=null));},remove:function(){var a=this,e=a.chart;e.hasRendered&&e.series.forEach(function(e){e.type===a.type&&(e.isDirty=!0);});v.prototype.remove.apply(a,arguments);}});})(I);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0});})(I);(function(a){var y=a.Series,F=a.seriesType;F("scatter",
"line",{lineWidth:0,findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&
y.prototype.drawGraph.call(this);},applyJitter:function(){var a=this,k=this.options.jitter,c=this.points.length;k&&this.points.forEach(function(p,t){["x","y"].forEach(function(v,w){var r,h="plot"+v.toUpperCase(),e,l;k[v]&&!p.isNull&&(r=a[v+"Axis"],l=k[v]*r.transA,r&&!r.isLog&&(e=Math.max(0,p[h]-l),r=Math.min(r.len,p[h]+l),w=1E4*Math.sin(t+w*c),p[h]=e+(r-e)*(w-Math.floor(w)),"x"===v&&(p.clientX=p.plotX)));});});}});a.addEvent(y,"afterTranslate",function(){this.applyJitter&&this.applyJitter();});})(I);(function(a){var y=
a.deg2rad,F=a.isNumber,G=a.pick,k=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,p=this.chart,t=2*(a.slicedOffset||0),v=p.plotWidth-2*t,p=p.plotHeight-2*t,w=a.center,w=[G(w[0],"50%"),G(w[1],"50%"),a.size||"100%",a.innerSize||0],r=Math.min(v,p),h,e;for(h=0;4>h;++h)e=w[h],a=2>h||2===h&&/%$/.test(e),w[h]=k(e,[v,p,r,w[2]][h])+(a?t:0);w[3]>w[2]&&(w[3]=w[2]);return w},getStartAndEndRadians:function(a,k){a=F(a)?a:0;k=F(k)&&k>a&&360>k-a?k:a+360;return {start:y*(a+-90),end:y*
(k+-90)}}};})(I);(function(a){var y=a.addEvent,F=a.CenteredSeriesMixin,G=a.defined,k=a.extend,c=F.getStartAndEndRadians,p=a.noop,t=a.pick,v=a.Point,w=a.Series,r=a.seriesType,h=a.setAnimation;r("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,connectorPadding:5,distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},softConnector:!0,x:0,connectorShape:"fixedOffset",crookDistance:"70%"},ignoreHiddenPoint:!0,legendType:"point",marker:null,
size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var e=this,c=e.points,d=e.startAngleRad;a||(c.forEach(function(a){var b=a.graphic,c=a.shapeArgs;b&&(b.attr({r:a.startR||e.center[3]/2,start:d,end:d}),
b.animate({r:c.r,start:c.start,end:c.end},e.options.animation));}),e.animate=null);},updateTotals:function(){var a,c=0,h=this.points,d=h.length,g,b=this.options.ignoreHiddenPoint;for(a=0;a<d;a++)g=h[a],c+=b&&!g.visible?0:g.isNull?0:g.y;this.total=c;for(a=0;a<d;a++)g=h[a],g.percentage=0<c&&(g.visible||!b)?g.y/c*100:0,g.total=c;},generatePoints:function(){w.prototype.generatePoints.call(this);this.updateTotals();},getX:function(a,c,h){var d=this.center,e=this.radii?this.radii[h.index]:d[2]/2;return d[0]+
(c?-1:1)*Math.cos(Math.asin(Math.max(Math.min((a-d[1])/(e+h.labelDistance),1),-1)))*(e+h.labelDistance)+(0<h.labelDistance?(c?-1:1)*this.options.dataLabels.padding:0)},translate:function(a){this.generatePoints();var e=0,h=this.options,d=h.slicedOffset,g=d+(h.borderWidth||0),b,k,u=c(h.startAngle,h.endAngle),p=this.startAngleRad=u.start,u=(this.endAngleRad=u.end)-p,r=this.points,v,m,z=h.dataLabels.distance,h=h.ignoreHiddenPoint,w,A=r.length,f;a||(this.center=a=this.getCenter());for(w=0;w<A;w++){f=r[w];
f.labelDistance=t(f.options.dataLabels&&f.options.dataLabels.distance,z);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,f.labelDistance);b=p+e*u;if(!h||f.visible)e+=f.percentage/100;k=p+e*u;f.shapeType="arc";f.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*b)/1E3,end:Math.round(1E3*k)/1E3};k=(k+b)/2;k>1.5*Math.PI?k-=2*Math.PI:k<-Math.PI/2&&(k+=2*Math.PI);f.slicedTranslation={translateX:Math.round(Math.cos(k)*d),translateY:Math.round(Math.sin(k)*d)};v=Math.cos(k)*a[2]/
2;m=Math.sin(k)*a[2]/2;f.tooltipPos=[a[0]+.7*v,a[1]+.7*m];f.half=k<-Math.PI/2||k>Math.PI/2?1:0;f.angle=k;b=Math.min(g,f.labelDistance/5);f.labelPosition={natural:{x:a[0]+v+Math.cos(k)*f.labelDistance,y:a[1]+m+Math.sin(k)*f.labelDistance},"final":{},alignment:0>f.labelDistance?"center":f.half?"right":"left",connectorPosition:{breakAt:{x:a[0]+v+Math.cos(k)*b,y:a[1]+m+Math.sin(k)*b},touchingSliceAt:{x:a[0]+v,y:a[1]+m}}};}},drawGraph:null,drawPoints:function(){var a=this,c=a.chart,h=c.renderer,d,g,b,p,
u=a.options.shadow;!u||a.shadowGroup||c.styledMode||(a.shadowGroup=h.g("shadow").add(a.group));a.points.forEach(function(e){g=e.graphic;if(e.isNull)g&&(e.graphic=g.destroy());else{p=e.shapeArgs;d=e.getTranslate();if(!c.styledMode){var l=e.shadowGroup;u&&!l&&(l=e.shadowGroup=h.g("shadow").add(a.shadowGroup));l&&l.attr(d);b=a.pointAttribs(e,e.selected&&"select");}g?(g.setRadialReference(a.center),c.styledMode||g.attr(b),g.animate(k(p,d))):(e.graphic=g=h[e.shapeType](p).setRadialReference(a.center).attr(d).add(a.group),
c.styledMode||g.attr(b).attr({"stroke-linejoin":"round"}).shadow(u,l));g.attr({visibility:e.visible?"inherit":"hidden"});g.addClass(e.getClassName());}});},searchPoint:p,sortByAngle:function(a,c){a.sort(function(a,d){return void 0!==a.angle&&(d.angle-a.angle)*c});},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:F.getCenter,getSymbol:p},{init:function(){v.prototype.init.apply(this,arguments);var a=this,c;a.name=t(a.name,"Slice");c=function(e){a.slice("select"===e.type);};y(a,"select",c);
y(a,"unselect",c);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,c){var e=this,d=e.series,g=d.chart,b=d.options.ignoreHiddenPoint;c=t(c,b);a!==e.visible&&(e.visible=e.options.visible=a=void 0===a?!e.visible:a,d.options.data[d.data.indexOf(e)]=e.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(b){if(e[b])e[b][a?"show":"hide"](!0);}),e.legendItem&&g.legend.colorizeItem(e,a),a||"hover"!==e.state||e.setState(""),b&&(d.isDirty=!0),c&&
g.redraw());},slice:function(a,c,k){var d=this.series;h(k,d.chart);t(c,!0);this.sliced=this.options.sliced=G(a)?a:!this.sliced;d.options.data[d.data.indexOf(this)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate());},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var e=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(e.x,e.y,
e.r+a,e.r+a,{innerR:this.shapeArgs.r-1,start:e.start,end:e.end})},connectorShapes:{fixedOffset:function(a,c,h){var d=c.breakAt;c=c.touchingSliceAt;return ["M",a.x,a.y].concat(h.softConnector?["C",a.x+("left"===a.alignment?-5:5),a.y,2*d.x-c.x,2*d.y-c.y,d.x,d.y]:["L",d.x,d.y]).concat(["L",c.x,c.y])},straight:function(a,c){c=c.touchingSliceAt;return ["M",a.x,a.y,"L",c.x,c.y]},crookedLine:function(e,c,h){c=c.touchingSliceAt;var d=this.series,g=d.center[0],b=d.chart.plotWidth,k=d.chart.plotLeft,d=e.alignment,
l=this.shapeArgs.r;h=a.relativeLength(h.crookDistance,1);h="left"===d?g+l+(b+k-g-l)*(1-h):k+(g-l)*h;g=["L",h,e.y];if("left"===d?h>e.x||h<c.x:h<e.x||h>c.x)g=[];return ["M",e.x,e.y].concat(g).concat(["L",c.x,c.y])}},getConnectorPath:function(){var a=this.labelPosition,c=this.series.options.dataLabels,h=c.connectorShape,d=this.connectorShapes;d[h]&&(h=d[h]);return h.call(this,{x:a.final.x,y:a.final.y,alignment:a.alignment},a.connectorPosition,c)}});})(I);(function(a){var y=a.addEvent,F=a.arrayMax,G=a.defined,
k=a.extend,c=a.format,p=a.merge,t=a.noop,v=a.pick,w=a.relativeLength,r=a.Series,h=a.seriesTypes,e=a.stableSort,l=a.isArray,n=a.splat;a.distribute=function(d,c,b){function g(a,b){return a.target-b.target}var h,k=!0,l=d,n=[],m;m=0;var p=l.reducedLen||c;for(h=d.length;h--;)m+=d[h].size;if(m>p){e(d,function(a,b){return (b.rank||0)-(a.rank||0)});for(m=h=0;m<=p;)m+=d[h].size,h++;n=d.splice(h-1,d.length);}e(d,g);for(d=d.map(function(a){return {size:a.size,targets:[a.target],align:v(a.align,.5)}});k;){for(h=
d.length;h--;)k=d[h],m=(Math.min.apply(0,k.targets)+Math.max.apply(0,k.targets))/2,k.pos=Math.min(Math.max(0,m-k.size*k.align),c-k.size);h=d.length;for(k=!1;h--;)0<h&&d[h-1].pos+d[h-1].size>d[h].pos&&(d[h-1].size+=d[h].size,d[h-1].targets=d[h-1].targets.concat(d[h].targets),d[h-1].align=.5,d[h-1].pos+d[h-1].size>c&&(d[h-1].pos=c-d[h-1].size),d.splice(h,1),k=!0);}l.push.apply(l,n);h=0;d.some(function(d){var e=0;if(d.targets.some(function(){l[h].pos=d.pos+e;if(Math.abs(l[h].pos-l[h].target)>b)return l.slice(0,
h+1).forEach(function(a){delete a.pos;}),l.reducedLen=(l.reducedLen||c)-.1*c,l.reducedLen>.1*c&&a.distribute(l,c,b),!0;e+=l[h].size;h++;}))return !0});e(l,g);};r.prototype.drawDataLabels=function(){function d(a,b){var d=b.filter;return d?(b=d.operator,a=a[d.property],d=d.value,"\x3e"===b&&a>d||"\x3c"===b&&a<d||"\x3e\x3d"===b&&a>=d||"\x3c\x3d"===b&&a<=d||"\x3d\x3d"===b&&a==d||"\x3d\x3d\x3d"===b&&a===d?!0:!1):!0}function e(a,b){var d=[],c;if(l(a)&&!l(b))d=a.map(function(a){return p(a,b)});else if(l(b)&&
!l(a))d=b.map(function(b){return p(a,b)});else if(l(a)||l(b))for(c=Math.max(a.length,b.length);c--;)d[c]=p(a[c],b[c]);else d=p(a,b);return d}var b=this,h=b.chart,k=b.options,r=k.dataLabels,t=b.points,w,m=b.hasRendered||0,z,D=v(r.defer,!!k.animation),A=h.renderer,r=e(e(h.options.plotOptions&&h.options.plotOptions.series&&h.options.plotOptions.series.dataLabels,h.options.plotOptions&&h.options.plotOptions[b.type]&&h.options.plotOptions[b.type].dataLabels),r);a.fireEvent(this,"drawDataLabels");if(l(r)||
r.enabled||b._hasPointLabels)z=b.plotGroup("dataLabelsGroup","data-labels",D&&!m?"hidden":"visible",r.zIndex||6),D&&(z.attr({opacity:+m}),m||y(b,"afterAnimate",function(){b.visible&&z.show(!0);z[k.animation?"animate":"attr"]({opacity:1},{duration:200});})),t.forEach(function(f){w=n(e(r,f.dlOptions||f.options&&f.options.dataLabels));w.forEach(function(e,g){var m=e.enabled&&!f.isNull&&d(f,e),l,n,q,u,p=f.dataLabels?f.dataLabels[g]:f.dataLabel,r=f.connectors?f.connectors[g]:f.connector,t=!p;m&&(l=f.getLabelConfig(),
n=e[f.formatPrefix+"Format"]||e.format,l=G(n)?c(n,l,h.time):(e[f.formatPrefix+"Formatter"]||e.formatter).call(l,e),n=e.style,q=e.rotation,h.styledMode||(n.color=v(e.color,n.color,b.color,"#000000"),"contrast"===n.color&&(f.contrastColor=A.getContrast(f.color||b.color),n.color=e.inside||0>v(e.distance,f.labelDistance)||k.stacking?f.contrastColor:"#000000"),k.cursor&&(n.cursor=k.cursor)),u={r:e.borderRadius||0,rotation:q,padding:e.padding,zIndex:1},h.styledMode||(u.fill=e.backgroundColor,u.stroke=e.borderColor,
u["stroke-width"]=e.borderWidth),a.objectEach(u,function(a,b){void 0===a&&delete u[b];}));!p||m&&G(l)?m&&G(l)&&(p?u.text=l:(f.dataLabels=f.dataLabels||[],p=f.dataLabels[g]=q?A.text(l,0,-9999).addClass("highcharts-data-label"):A.label(l,0,-9999,e.shape,null,null,e.useHTML,null,"data-label"),g||(f.dataLabel=p),p.addClass(" highcharts-data-label-color-"+f.colorIndex+" "+(e.className||"")+(e.useHTML?" highcharts-tracker":""))),p.options=e,p.attr(u),h.styledMode||p.css(n).shadow(e.shadow),p.added||p.add(z),
b.alignDataLabel(f,p,e,null,t)):(f.dataLabel=f.dataLabel&&f.dataLabel.destroy(),f.dataLabels&&(1===f.dataLabels.length?delete f.dataLabels:delete f.dataLabels[g]),g||delete f.dataLabel,r&&(f.connector=f.connector.destroy(),f.connectors&&(1===f.connectors.length?delete f.connectors:delete f.connectors[g])));});});a.fireEvent(this,"afterDrawDataLabels");};r.prototype.alignDataLabel=function(a,e,b,c,h){var d=this.chart,g=this.isCartesian&&d.inverted,l=v(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),m=v(a.plotY,
-9999),n=e.getBBox(),u,p=b.rotation,f=b.align,q=this.visible&&(a.series.forceDL||d.isInsidePlot(l,Math.round(m),g)||c&&d.isInsidePlot(l,g?c.x+1:c.y+c.height-1,g)),r="justify"===v(b.overflow,"justify");if(q&&(u=d.renderer.fontMetrics(d.styledMode?void 0:b.style.fontSize,e).b,c=k({x:g?this.yAxis.len-m:l,y:Math.round(g?this.xAxis.len-l:m),width:0,height:0},c),k(b,{width:n.width,height:n.height}),p?(r=!1,l=d.renderer.rotCorr(u,p),l={x:c.x+b.x+c.width/2+l.x,y:c.y+b.y+{top:0,middle:.5,bottom:1}[b.verticalAlign]*
c.height},e[h?"attr":"animate"](l).attr({align:f}),m=(p+720)%360,m=180<m&&360>m,"left"===f?l.y-=m?n.height:0:"center"===f?(l.x-=n.width/2,l.y-=n.height/2):"right"===f&&(l.x-=n.width,l.y-=m?0:n.height),e.placed=!0,e.alignAttr=l):(e.align(b,null,c),l=e.alignAttr),r&&0<=c.height?a.isLabelJustified=this.justifyDataLabel(e,b,l,n,c,h):v(b.crop,!0)&&(q=d.isInsidePlot(l.x,l.y)&&d.isInsidePlot(l.x+n.width,l.y+n.height)),b.shape&&!p))e[h?"attr":"animate"]({anchorX:g?d.plotWidth-a.plotY:a.plotX,anchorY:g?d.plotHeight-
a.plotX:a.plotY});q||(e.attr({y:-9999}),e.placed=!1);};r.prototype.justifyDataLabel=function(a,e,b,c,h,k){var d=this.chart,g=e.align,m=e.verticalAlign,l,n,u=a.box?0:a.padding||0;l=b.x+u;0>l&&("right"===g?e.align="left":e.x=-l,n=!0);l=b.x+c.width-u;l>d.plotWidth&&("left"===g?e.align="right":e.x=d.plotWidth-l,n=!0);l=b.y+u;0>l&&("bottom"===m?e.verticalAlign="top":e.y=-l,n=!0);l=b.y+c.height-u;l>d.plotHeight&&("top"===m?e.verticalAlign="bottom":e.y=d.plotHeight-l,n=!0);n&&(a.placed=!k,a.align(e,null,
h));return n};h.pie&&(h.pie.prototype.dataLabelPositioners={radialDistributionY:function(a){return a.top+a.distributeBox.pos},radialDistributionX:function(a,e,b,c){return a.getX(b<e.top+2||b>e.bottom-2?c:b,e.half,e)},justify:function(a,e,b){return b[0]+(a.half?-1:1)*(e+a.labelDistance)},alignToPlotEdges:function(a,e,b,c){a=a.getBBox().width;return e?a+c:b-a-c},alignToConnectors:function(a,e,b,c){var d=0,g;a.forEach(function(a){g=a.dataLabel.getBBox().width;g>d&&(d=g);});return e?d+c:b-d-c}},h.pie.prototype.drawDataLabels=
function(){var d=this,e=d.data,b,c=d.chart,h=d.options.dataLabels,k=h.connectorPadding,l=v(h.connectorWidth,1),n=c.plotWidth,m=c.plotHeight,p=c.plotLeft,t=Math.round(c.chartWidth/3),w,f=d.center,q=f[2]/2,y=f[1],K,I,J,M,R=[[],[]],C,P,N,S,O=[0,0,0,0],W=d.dataLabelPositioners;d.visible&&(h.enabled||d._hasPointLabels)&&(e.forEach(function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1);}),r.prototype.drawDataLabels.apply(d),
e.forEach(function(a){a.dataLabel&&(a.visible?(R[a.half].push(a),a.dataLabel._pos=null,!G(h.style.width)&&!G(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>t&&(a.dataLabel.css({width:.7*t}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&1===a.dataLabels.length&&delete a.dataLabels));}),R.forEach(function(e,g){var l,u,r=e.length,t=[],x;if(r)for(d.sortByAngle(e,g-.5),0<d.maxLabelDistance&&(l=Math.max(0,y-q-
d.maxLabelDistance),u=Math.min(y+q+d.maxLabelDistance,c.plotHeight),e.forEach(function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,y-q-a.labelDistance),a.bottom=Math.min(y+q+a.labelDistance,c.plotHeight),x=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPosition.natural.y-a.top+x/2,size:x,rank:a.y},t.push(a.distributeBox));}),l=u+x-l,a.distribute(t,l,l/5)),S=0;S<r;S++){b=e[S];J=b.labelPosition;K=b.dataLabel;N=!1===b.visible?"hidden":"inherit";P=l=J.natural.y;t&&G(b.distributeBox)&&
(void 0===b.distributeBox.pos?N="hidden":(M=b.distributeBox.size,P=W.radialDistributionY(b)));delete b.positionIndex;if(h.justify)C=W.justify(b,q,f);else switch(h.alignTo){case "connectors":C=W.alignToConnectors(e,g,n,p);break;case "plotEdges":C=W.alignToPlotEdges(K,g,n,p);break;default:C=W.radialDistributionX(d,b,P,l);}K._attr={visibility:N,align:J.alignment};K._pos={x:C+h.x+({left:k,right:-k}[J.alignment]||0),y:P+h.y-10};J.final.x=C;J.final.y=P;v(h.crop,!0)&&(I=K.getBBox().width,l=null,C-I<k&&1===
g?(l=Math.round(I-C+k),O[3]=Math.max(l,O[3])):C+I>n-k&&0===g&&(l=Math.round(C+I-n+k),O[1]=Math.max(l,O[1])),0>P-M/2?O[0]=Math.max(Math.round(-P+M/2),O[0]):P+M/2>m&&(O[2]=Math.max(Math.round(P+M/2-m),O[2])),K.sideOverflow=l);}}),0===F(O)||this.verifyDataLabelOverflow(O))&&(this.placeDataLabels(),l&&this.points.forEach(function(a){var b;w=a.connector;if((K=a.dataLabel)&&K._pos&&a.visible&&0<a.labelDistance){N=K._attr.visibility;if(b=!w)a.connector=w=c.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+
a.colorIndex+(a.className?" "+a.className:"")).add(d.dataLabelsGroup),c.styledMode||w.attr({"stroke-width":l,stroke:h.connectorColor||a.color||"#666666"});w[b?"attr":"animate"]({d:a.getConnectorPath()});w.attr("visibility",N);}else w&&(a.connector=w.destroy());}));},h.pie.prototype.placeDataLabels=function(){this.points.forEach(function(a){var d=a.dataLabel;d&&a.visible&&((a=d._pos)?(d.sideOverflow&&(d._attr.width=d.getBBox().width-d.sideOverflow,d.css({width:d._attr.width+"px",textOverflow:(this.options.dataLabels.style||
{}).textOverflow||"ellipsis"}),d.shortened=!0),d.attr(d._attr),d[d.moved?"animate":"attr"](a),d.moved=!0):d&&d.attr({y:-9999}));},this);},h.pie.prototype.alignDataLabel=t,h.pie.prototype.verifyDataLabelOverflow=function(a){var d=this.center,b=this.options,e=b.center,c=b.minSize||80,h,k=null!==b.size;k||(null!==e[0]?h=Math.max(d[2]-Math.max(a[1],a[3]),c):(h=Math.max(d[2]-a[1]-a[3],c),d[0]+=(a[3]-a[1])/2),null!==e[1]?h=Math.max(Math.min(h,d[2]-Math.max(a[0],a[2])),c):(h=Math.max(Math.min(h,d[2]-a[0]-
a[2]),c),d[1]+=(a[0]-a[2])/2),h<d[2]?(d[2]=h,d[3]=Math.min(w(b.innerSize||0,h),h),this.translate(d),this.drawDataLabels&&this.drawDataLabels()):k=!0);return k});h.column&&(h.column.prototype.alignDataLabel=function(a,e,b,c,h){var d=this.chart.inverted,g=a.series,k=a.dlBox||a.shapeArgs,l=v(a.below,a.plotY>v(this.translatedThreshold,g.yAxis.len)),n=v(b.inside,!!this.options.stacking);k&&(c=p(k),0>c.y&&(c.height+=c.y,c.y=0),k=c.y+c.height-g.yAxis.len,0<k&&(c.height-=k),d&&(c={x:g.yAxis.len-c.y-c.height,
y:g.xAxis.len-c.x-c.width,width:c.height,height:c.width}),n||(d?(c.x+=l?0:c.width,c.width=0):(c.y+=l?c.height:0,c.height=0)));b.align=v(b.align,!d||n?"center":l?"right":"left");b.verticalAlign=v(b.verticalAlign,d||n?"middle":l?"top":"bottom");r.prototype.alignDataLabel.call(this,a,e,b,c,h);a.isLabelJustified&&a.contrastColor&&e.css({color:a.contrastColor});});})(I);(function(a){var y=a.Chart,F=a.isArray,G=a.objectEach,k=a.pick,c=a.addEvent,p=a.fireEvent;c(y,"render",function(){var a=[];(this.labelCollectors||
[]).forEach(function(c){a=a.concat(c());});(this.yAxis||[]).forEach(function(c){c.options.stackLabels&&!c.options.stackLabels.allowOverlap&&G(c.stacks,function(c){G(c,function(c){a.push(c.label);});});});(this.series||[]).forEach(function(c){var p=c.options.dataLabels;c.visible&&(!1!==p.enabled||c._hasPointLabels)&&c.points.forEach(function(c){c.visible&&(F(c.dataLabels)?c.dataLabels:c.dataLabel?[c.dataLabel]:[]).forEach(function(h){var e=h.options;h.labelrank=k(e.labelrank,c.labelrank,c.shapeArgs&&c.shapeArgs.height);
e.allowOverlap||a.push(h);});});});this.hideOverlappingLabels(a);});y.prototype.hideOverlappingLabels=function(a){var c=this,k=a.length,r=c.renderer,h,e,l,n,d,g,b=function(a,b,c,d,e,g,h,k){return !(e>a+c||e+h<a||g>b+d||g+k<b)};l=function(a){var b,c,d,e=a.box?0:a.padding||0;d=0;if(a&&(!a.alignAttr||a.placed))return b=a.alignAttr||{x:a.attr("x"),y:a.attr("y")},c=a.parentGroup,a.width||(d=a.getBBox(),a.width=d.width,a.height=d.height,d=r.fontMetrics(null,a.element).h),{x:b.x+(c.translateX||0)+e,y:b.y+(c.translateY||
0)+e-d,width:a.width-2*e,height:a.height-2*e}};for(e=0;e<k;e++)if(h=a[e])h.oldOpacity=h.opacity,h.newOpacity=1,h.absoluteBox=l(h);a.sort(function(a,b){return (b.labelrank||0)-(a.labelrank||0)});for(e=0;e<k;e++)for(g=(l=a[e])&&l.absoluteBox,h=e+1;h<k;++h)if(d=(n=a[h])&&n.absoluteBox,g&&d&&l!==n&&0!==l.newOpacity&&0!==n.newOpacity&&(d=b(g.x,g.y,g.width,g.height,d.x,d.y,d.width,d.height)))(l.labelrank<n.labelrank?l:n).newOpacity=0;a.forEach(function(a){var b,d;a&&(d=a.newOpacity,a.oldOpacity!==d&&(a.alignAttr&&
a.placed?(d?a.show(!0):b=function(){a.hide();},a.alignAttr.opacity=d,a[a.isOld?"animate":"attr"](a.alignAttr,null,b),p(c,"afterHideOverlappingLabels")):a.attr({opacity:d})),a.isOld=!0);});};})(I);(function(a){var y=a.addEvent,F=a.Chart,G=a.createElement,k=a.css,c=a.defaultOptions,p=a.defaultPlotOptions,t=a.extend,v=a.fireEvent,w=a.hasTouch,r=a.isObject,h=a.Legend,e=a.merge,l=a.pick,n=a.Point,d=a.Series,g=a.seriesTypes,b=a.svg,x;x=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,
d=function(a){var b=c.getPointFromEvent(a);void 0!==b&&(c.isDirectTouch=!0,b.onMouseOver(a));};a.points.forEach(function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a);});a._hasTracking||(a.trackerGroups.forEach(function(e){if(a[e]){a[e].addClass("highcharts-tracker").on("mouseover",d).on("mouseout",function(a){c.onTrackerMouseOut(a);});if(w)a[e].on("touchstart",d);!b.styledMode&&a.options.cursor&&a[e].css(k).css({cursor:a.options.cursor});}}),
a._hasTracking=!0);v(this,"afterDrawTracker");},drawTrackerGraph:function(){var a=this,c=a.options,d=c.trackByArea,e=[].concat(d?a.areaPath:a.graphPath),g=e.length,h=a.chart,k=h.pointer,l=h.renderer,f=h.options.tooltip.snap,n=a.tracker,p,r=function(){if(h.hoverSeries!==a)a.onMouseOver();},t="rgba(192,192,192,"+(b?.0001:.002)+")";if(g&&!d)for(p=g+1;p--;)"M"===e[p]&&e.splice(p+1,0,e[p+1]-f,e[p+2],"L"),(p&&"M"===e[p]||p===g)&&e.splice(p,0,"L",e[p-2]+f,e[p-1]);n?n.attr({d:e}):a.graph&&(a.tracker=l.path(e).attr({visibility:a.visible?
"visible":"hidden",zIndex:2}).addClass(d?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),h.styledMode||a.tracker.attr({"stroke-linejoin":"round",stroke:t,fill:d?t:"none","stroke-width":a.graph.strokeWidth()+(d?0:2*f)}),[a.tracker,a.markerGroup].forEach(function(a){a.addClass("highcharts-tracker").on("mouseover",r).on("mouseout",function(a){k.onTrackerMouseOut(a);});c.cursor&&!h.styledMode&&a.css({cursor:c.cursor});if(w)a.on("touchstart",r);}));v(this,"afterDrawTracker");}};g.column&&
(g.column.prototype.drawTracker=x.drawTrackerPoint);g.pie&&(g.pie.prototype.drawTracker=x.drawTrackerPoint);g.scatter&&(g.scatter.prototype.drawTracker=x.drawTrackerPoint);t(h.prototype,{setItemEvents:function(a,b,c){var d=this,g=d.chart.renderer.boxWrapper,h="highcharts-legend-"+(a instanceof n?"point":"series")+"-active",k=d.chart.styledMode;(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");g.addClass(h);k||b.css(d.options.itemHoverStyle);}).on("mouseout",function(){d.styledMode||
b.css(e(a.visible?d.itemStyle:d.itemHiddenStyle));g.removeClass(h);a.setState();}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible();};g.removeClass(h);b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):v(a,"legendItemClick",b,c);});},createCheckboxForItem:function(a){a.checkbox=G("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);y(a.checkbox,"click",
function(b){v(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select();});});}});t(F.prototype,{showResetZoom:function(){function a(){b.zoomOut();}var b=this,d=c.lang,e=b.options.chart.resetZoomButton,g=e.theme,h=g.states,k="chart"===e.relativeTo?null:"plotBox";v(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=b.renderer.button(d.resetZoom,null,null,a,g,h&&h.hover).attr({align:e.position.align,title:d.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(e.position,
!1,k);});},zoomOut:function(){v(this,"selection",{resetSelection:!0},this.zoom);},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?(this.axes.forEach(function(a){b=a.zoom();}),c.initiated=!1):a.xAxis.concat(a.yAxis).forEach(function(a){var e=a.axis;c[e.isXAxis?"zoomX":"zoomY"]&&(b=e.zoom(a.min,a.max),e.displayBtn&&(d=!0));});e=this.resetZoomButton;d&&!e?this.showResetZoom():!d&&r(e)&&(this.resetZoomButton=e.destroy());b&&this.redraw(l(this.options.chart.animation,a&&a.animation,100>this.pointCount));},
pan:function(a,b){var c=this,d=c.hoverPoints,e;v(this,"pan",{originalEvent:a},function(){d&&d.forEach(function(a){a.setState();});("xy"===b?[1,0]:[1]).forEach(function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,g=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",f=c[d],h=(b.pointRange||0)/2,k=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,l=b.getExtremes(),m=b.toValue(f-g,!0)+h*k,k=b.toValue(f+b.len-g,!0)-h*k,n=k<m,f=n?k:m,m=n?m:k,k=Math.min(l.dataMin,h?l.min:b.toValue(b.toPixels(l.min)-
b.minPixelPadding)),h=Math.max(l.dataMax,h?l.max:b.toValue(b.toPixels(l.max)+b.minPixelPadding)),n=k-f;0<n&&(m+=n,f=k);n=m-h;0<n&&(m=h,f-=n);b.series.length&&f!==l.min&&m!==l.max&&(b.setExtremes(f,m,!1,!1,{trigger:"pan"}),e=!0);c[d]=g;});e&&c.redraw(!1);k(c.container,{cursor:"move"});});}});t(n.prototype,{select:function(a,b){var c=this,d=c.series,e=d.chart;a=l(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[d.data.indexOf(c)]=
c.options;c.setState(a&&"select");b||e.getSelectedPoints().forEach(function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,d.options.data[d.data.indexOf(a)]=a.options,a.setState(""),a.firePointEvent("unselect"));});});},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this);},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");(a.hoverPoints||[]).forEach(function(a){a.setState();});
a.hoverPoints=a.hoverPoint=null;},importEvents:function(){if(!this.hasImportedEvents){var b=this,c=e(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(a,c){y(b,c,a);});this.hasImportedEvents=!0;}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,e=this.series,g=e.options.states[a||"normal"]||{},h=p[e.type].marker&&e.options.marker,k=h&&!1===h.enabled,f=h&&h.states&&h.states[a||"normal"]||{},n=!1===f.enabled,r=e.stateMarkerGraphic,u=this.marker||{},w=e.chart,
x=e.halo,y,F=h&&e.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===g.enabled||a&&(n||k&&!1===f.enabled)||a&&u.states&&u.states[a]&&!1===u.states[a].enabled)){F&&(y=e.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),w.styledMode||this.graphic.animate(e.pointAttribs(this,a),l(w.options.chart.animation,g.animation)),y&&this.graphic.animate(y,l(w.options.chart.animation,
f.animation,h.animation)),r&&r.hide();else{if(a&&f){h=u.symbol||e.symbol;r&&r.currentSymbol!==h&&(r=r.destroy());if(r)r[b?"animate":"attr"]({x:y.x,y:y.y});else h&&(e.stateMarkerGraphic=r=w.renderer.symbol(h,y.x,y.y,y.width,y.height).add(e.markerGroup),r.currentSymbol=h);!w.styledMode&&r&&r.attr(e.pointAttribs(this,a));}r&&(r[a&&w.isInsidePlot(c,d,w.inverted)?"show":"hide"](),r.element.point=this);}(c=g.halo)&&c.size?(x||(e.halo=x=w.renderer.path().add((this.graphic||r).parentGroup)),x.show()[b?"animate":
"attr"]({d:this.haloPath(c.size)}),x.attr({"class":"highcharts-halo highcharts-color-"+l(this.colorIndex,e.colorIndex)+(this.className?" "+this.className:""),zIndex:-1}),x.point=this,w.styledMode||x.attr(t({fill:this.color||e.color,"fill-opacity":c.opacity},c.attributes))):x&&x.point&&x.point.haloPath&&x.animate({d:x.point.haloPath(0)},null,x.hide);this.state=a;v(this,"afterSetState");}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,
2*a)}});t(d.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&v(this,"mouseOver");this.setState("hover");a.hoverSeries=this;},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&v(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState();},setState:function(a){var b=this,c=b.options,d=b.graph,
e=c.states,g=c.lineWidth,c=0;a=a||"";if(b.state!==a&&([b.group,b.markerGroup,b.dataLabelsGroup].forEach(function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a));}),b.state=a,!(b.chart.styledMode||e[a]&&!1===e[a].enabled)&&(a&&(g=e[a].lineWidth||g+(e[a].lineWidthPlus||0)),d&&!d.dashstyle)))for(g={"stroke-width":g},d.animate(g,l(e[a||"normal"]&&e[a||"normal"].animation,b.chart.options.chart.animation));b["zone-graph-"+c];)b["zone-graph-"+c].attr(g),
c+=1;},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,g,h=d.options.chart.ignoreHiddenSeries,k=c.visible;g=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!k:a)?"show":"hide";["group","dataLabelsGroup","markerGroup","tracker","tt"].forEach(function(a){if(c[a])c[a][g]();});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d.series.forEach(function(a){a.options.stacking&&a.visible&&
(a.isDirty=!0);});c.linkedSeries.forEach(function(b){b.setVisible(a,!1);});h&&(d.isDirtyBox=!0);v(c,g);!1!==b&&d.redraw();},show:function(){this.setVisible(!0);},hide:function(){this.setVisible(!1);},select:function(a){this.selected=a=this.options.selected=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);v(this,a?"select":"unselect");},drawTracker:x.drawTrackerGraph});})(I);(function(a){var y=a.Chart,F=a.isArray,G=a.isObject,k=a.pick,c=a.splat;y.prototype.setResponsive=function(c,k){var p=
this.options.responsive,t=[],r=this.currentResponsive;!k&&p&&p.rules&&p.rules.forEach(function(h){void 0===h._id&&(h._id=a.uniqueKey());this.matchResponsiveRule(h,t,c);},this);k=a.merge.apply(0,t.map(function(c){return a.find(p.rules,function(a){return a._id===c}).chartOptions}));k.isResponsiveOptions=!0;t=t.toString()||void 0;t!==(r&&r.ruleIds)&&(r&&this.update(r.undoOptions,c),t?(r=this.currentOptions(k),r.isResponsiveOptions=!0,this.currentResponsive={ruleIds:t,mergedOptions:k,undoOptions:r},this.update(k,
c)):this.currentResponsive=void 0);};y.prototype.matchResponsiveRule=function(a,c){var p=a.condition;(p.callback||function(){return this.chartWidth<=k(p.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=k(p.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=k(p.minWidth,0)&&this.chartHeight>=k(p.minHeight,0)}).call(this)&&c.push(a._id);};y.prototype.currentOptions=function(k){function p(k,r,h,e){var l;a.objectEach(k,function(a,d){if(!e&&-1<["series","xAxis","yAxis"].indexOf(d))for(a=c(a),h[d]=[],l=0;l<a.length;l++)r[d][l]&&
(h[d][l]={},p(a[l],r[d][l],h[d][l],e+1));else G(a)?(h[d]=F(a)?[]:{},p(a,r[d]||{},h[d],e+1)):h[d]=r[d]||null;});}var v={};p(k,this.options,v,0);return v};})(I);return I});

});

var highchartsMore = createCommonjsModule(function (module) {
/*
 Highcharts JS v7.0.3 (2019-02-06)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(z){"object"==='object'&&module.exports?(z["default"]=z,module.exports=z):"function"===typeof undefined&&undefined.amd?undefined(function(){return z}):z("undefined"!==typeof Highcharts?Highcharts:void 0);})(function(z){(function(a){function w(a,b){this.init(a,b);}var x=a.CenteredSeriesMixin,g=a.extend,h=a.merge,u=a.splat;g(w.prototype,{coll:"pane",init:function(a,b){this.chart=b;this.background=[];b.pane.push(this);this.setOptions(a);},setOptions:function(a){this.options=h(this.defaultOptions,this.chart.angular?
{background:{}}:void 0,a);},render:function(){var a=this.options,b=this.options.background,d=this.chart.renderer;this.group||(this.group=d.g("pane-group").attr({zIndex:a.zIndex||0}).add());this.updateCenter();if(b)for(b=u(b),a=Math.max(b.length,this.background.length||0),d=0;d<a;d++)b[d]&&this.axis?this.renderBackground(h(this.defaultBackgroundOptions,b[d]),d):this.background[d]&&(this.background[d]=this.background[d].destroy(),this.background.splice(d,1));},renderBackground:function(a,b){var d="animate",
e={"class":"highcharts-pane "+(a.className||"")};this.chart.styledMode||g(e,{fill:a.backgroundColor,stroke:a.borderColor,"stroke-width":a.borderWidth});this.background[b]||(this.background[b]=this.chart.renderer.path().add(this.group),d="attr");this.background[b][d]({d:this.axis.getPlotBandPath(a.from,a.to,a)}).attr(e);},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,
x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(a){this.center=(a||this.axis||{}).center=x.getCenter.call(this);},update:function(a,b){h(!0,this.options,a);this.setOptions(this.options);this.render();this.chart.axes.forEach(function(a){a.pane===this&&(a.pane=null,a.update({},b));},this);}});a.Pane=w;})(z);(function(a){var w=a.addEvent,x=a.Axis,g=a.extend,h=a.merge,u=a.noop,p=a.pick,b=a.pInt,d=a.Tick,e=a.wrap,
c=a.correctFloat,q,t,v=x.prototype,m=d.prototype;a.radialAxisExtended||(a.radialAxisExtended=!0,q={getOffset:u,redraw:function(){this.isDirty=!1;},render:function(){this.isDirty=!1;},setScale:u,setCategories:u,setTitle:u},t={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,
labels:{align:null,distance:15,x:0,y:null,style:{textOverflow:"none"}},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(l){l=this.options=h(this.defaultOptions,this.defaultRadialOptions,l);l.plotBands||(l.plotBands=[]);a.fireEvent(this,"afterSetOptions");},getOffset:function(){v.getOffset.call(this);this.chart.axisOffset[this.side]=0;},
getLinePath:function(l,n){l=this.center;var f=this.chart,k=p(n,l[2]/2-this.offset);this.isCircular||void 0!==n?(n=this.chart.renderer.symbols.arc(this.left+l[0],this.top+l[1],k,k,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}),n.xBounds=[this.left+l[0]],n.yBounds=[this.top+l[1]-k]):(n=this.postTranslate(this.angleRad,k),n=["M",l[0]+f.plotLeft,l[1]+f.plotTop,"L",n.x,n.y]);return n},setAxisTranslation:function(){v.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?
(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0);},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===p(this.userMax,this.options.max)&&c(this.endAngleRad-this.startAngleRad)===c(2*Math.PI))this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0;},setAxisSize:function(){v.setAxisSize.call(this);this.isRadial&&(this.pane.updateCenter(this),
this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*p(this.sector,1)/2);},getPosition:function(l,n){return this.postTranslate(this.isCircular?this.translate(l):this.angleRad,p(this.isCircular?n:this.translate(l),this.center[2]/2)-this.offset)},postTranslate:function(l,n){var f=this.chart,k=this.center;l=this.startAngleRad+l;return {x:f.plotLeft+k[0]+Math.cos(l)*n,y:f.plotTop+k[1]+Math.sin(l)*n}},getPlotBandPath:function(l,n,f){var k=this.center,
c=this.startAngleRad,m=k[2]/2,a=[p(f.outerRadius,"100%"),f.innerRadius,p(f.thickness,10)],e=Math.min(this.offset,0),v=/%$/,d,q=this.isCircular;"polygon"===this.options.gridLineInterpolation?k=this.getPlotLinePath(l).concat(this.getPlotLinePath(n,!0)):(l=Math.max(l,this.min),n=Math.min(n,this.max),q||(a[0]=this.translate(l),a[1]=this.translate(n)),a=a.map(function(f){v.test(f)&&(f=b(f,10)*m/100);return f}),"circle"!==f.shape&&q?(l=c+this.translate(l),n=c+this.translate(n)):(l=-Math.PI/2,n=1.5*Math.PI,
d=!0),a[0]-=e,a[2]-=e,k=this.chart.renderer.symbols.arc(this.left+k[0],this.top+k[1],a[0],a[0],{start:Math.min(l,n),end:Math.max(l,n),innerR:p(a[1],a[0]-a[2]),open:d}));return k},getPlotLinePath:function(l,c){var f=this,k=f.center,n=f.chart,a=f.getPosition(l),b,m,e;f.isCircular?e=["M",k[0]+n.plotLeft,k[1]+n.plotTop,"L",a.x,a.y]:"circle"===f.options.gridLineInterpolation?(l=f.translate(l),e=f.getLinePath(0,l)):(n.xAxis.forEach(function(k){k.pane===f.pane&&(b=k);}),e=[],l=f.translate(l),k=b.tickPositions,
b.autoConnect&&(k=k.concat([k[0]])),c&&(k=[].concat(k).reverse()),k.forEach(function(f,k){m=b.getPosition(f,l);e.push(k?"L":"M",m.x,m.y);}));return e},getTitlePosition:function(){var l=this.center,c=this.chart,f=this.options.title;return {x:c.plotLeft+l[0]+(f.x||0),y:c.plotTop+l[1]-{high:.5,middle:.25,low:0}[f.align]*l[2]+(f.y||0)}}},w(x,"init",function(l){var c=this,f=this.chart,k=f.angular,a=f.polar,b=this.isXAxis,m=k&&b,e,v=f.options;l=l.userOptions.pane||0;l=this.pane=f.pane&&f.pane[l];if(k){if(g(this,
m?q:t),e=!b)this.defaultRadialOptions=this.defaultRadialGaugeOptions;}else a&&(g(this,t),this.defaultRadialOptions=(e=b)?this.defaultRadialXOptions:h(this.defaultYAxisOptions,this.defaultRadialYOptions));k||a?(this.isRadial=!0,f.inverted=!1,v.chart.zoomType=null,f.labelCollectors.push(function(){if(c.isRadial&&c.tickPositions&&!0!==c.options.labels.allowOverlap)return c.tickPositions.map(function(f){return c.ticks[f]&&c.ticks[f].label}).filter(function(f){return !!f})})):this.isRadial=!1;l&&e&&(l.axis=
this);this.isCircular=e;}),w(x,"afterInit",function(){var c=this.chart,a=this.options,f=this.pane,k=f&&f.options;c.angular&&this.isXAxis||!f||!c.angular&&!c.polar||(this.angleRad=(a.angle||0)*Math.PI/180,this.startAngleRad=(k.startAngle-90)*Math.PI/180,this.endAngleRad=(p(k.endAngle,k.startAngle+360)-90)*Math.PI/180,this.offset=a.offset||0);}),w(x,"autoLabelAlign",function(c){this.isRadial&&(c.align=void 0,c.preventDefault());}),w(d,"afterGetPosition",function(c){this.axis.getPosition&&g(c.pos,this.axis.getPosition(this.pos));}),
w(d,"afterGetLabelPosition",function(c){var a=this.axis,f=this.label,k=a.options.labels,l=k.y,b,m=20,e=k.align,v=(a.translate(this.pos)+a.startAngleRad+Math.PI/2)/Math.PI*180%360;a.isRadial&&(b=a.getPosition(this.pos,a.center[2]/2+p(k.distance,-25)),"auto"===k.rotation?f.attr({rotation:v}):null===l&&(l=a.chart.renderer.fontMetrics(f.styles&&f.styles.fontSize).b-f.getBBox().height/2),null===e&&(a.isCircular?(this.label.getBBox().width>a.len*a.tickInterval/(a.max-a.min)&&(m=0),e=v>m&&v<180-m?"left":
v>180+m&&v<360-m?"right":"center"):e="center",f.attr({align:e})),c.pos.x=b.x+k.x,c.pos.y=b.y+l);}),e(m,"getMarkPath",function(c,a,f,k,b,m,e){var l=this.axis;l.isRadial?(c=l.getPosition(this.pos,l.center[2]/2+k),a=["M",a,f,"L",c.x,c.y]):a=c.call(this,a,f,k,b,m,e);return a}));})(z);(function(a){var w=a.pick,x=a.extend,g=a.isArray,h=a.defined,u=a.seriesType,p=a.seriesTypes,b=a.Series.prototype,d=a.Point.prototype;u("arearange","area",{lineWidth:1,threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},
trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},{pointArrayMap:["low","high"],toYData:function(a){return [a.low,a.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(a){var c=this.chart,b=this.xAxis.postTranslate(a.rectPlotX,this.yAxis.len-a.plotHigh);a.plotHighX=b.x-c.plotLeft;a.plotHigh=b.y-c.plotTop;a.plotLowX=a.plotX;},translate:function(){var a=this,c=a.yAxis,b=!!a.modifyValue;p.area.prototype.translate.apply(a);a.points.forEach(function(e){var v=
e.low,m=e.high,l=e.plotY;null===m||null===v?(e.isNull=!0,e.plotY=null):(e.plotLow=l,e.plotHigh=c.translate(b?a.modifyValue(m,e):m,0,1,0,1),b&&(e.yBottom=e.plotHigh));});this.chart.polar&&this.points.forEach(function(c){a.highToXY(c);c.tooltipPos=[(c.plotHighX+c.plotLowX)/2,(c.plotHigh+c.plotLow)/2];});},getGraphPath:function(a){var c=[],b=[],e,v=p.area.prototype.getGraphPath,m,l,n;n=this.options;var f=this.chart.polar&&!1!==n.connectEnds,k=n.connectNulls,d=n.step;a=a||this.points;for(e=a.length;e--;)m=
a[e],m.isNull||f||k||a[e+1]&&!a[e+1].isNull||b.push({plotX:m.plotX,plotY:m.plotY,doCurve:!1}),l={polarPlotY:m.polarPlotY,rectPlotX:m.rectPlotX,yBottom:m.yBottom,plotX:w(m.plotHighX,m.plotX),plotY:m.plotHigh,isNull:m.isNull},b.push(l),c.push(l),m.isNull||f||k||a[e-1]&&!a[e-1].isNull||b.push({plotX:m.plotX,plotY:m.plotY,doCurve:!1});a=v.call(this,a);d&&(!0===d&&(d="left"),n.step={left:"right",center:"center",right:"left"}[d]);c=v.call(this,c);b=v.call(this,b);n.step=d;n=[].concat(a,c);this.chart.polar||
"M"!==b[0]||(b[0]="L");this.graphPath=n;this.areaPath=a.concat(b);n.isArea=!0;n.xMap=a.xMap;this.areaPath.xMap=a.xMap;return n},drawDataLabels:function(){var a=this.points,c=a.length,d,h=[],v=this.options.dataLabels,m,l,n=this.chart.inverted,f,k;g(v)?1<v.length?(f=v[0],k=v[1]):(f=v[0],k={enabled:!1}):(f=x({},v),f.x=v.xHigh,f.y=v.yHigh,k=x({},v),k.x=v.xLow,k.y=v.yLow);if(f.enabled||this._hasPointLabels){for(d=c;d--;)if(m=a[d])l=f.inside?m.plotHigh<m.plotLow:m.plotHigh>m.plotLow,m.y=m.high,m._plotY=
m.plotY,m.plotY=m.plotHigh,h[d]=m.dataLabel,m.dataLabel=m.dataLabelUpper,m.below=l,n?f.align||(f.align=l?"right":"left"):f.verticalAlign||(f.verticalAlign=l?"top":"bottom");this.options.dataLabels=f;b.drawDataLabels&&b.drawDataLabels.apply(this,arguments);for(d=c;d--;)if(m=a[d])m.dataLabelUpper=m.dataLabel,m.dataLabel=h[d],delete m.dataLabels,m.y=m.low,m.plotY=m._plotY;}if(k.enabled||this._hasPointLabels){for(d=c;d--;)if(m=a[d])l=k.inside?m.plotHigh<m.plotLow:m.plotHigh>m.plotLow,m.below=!l,n?k.align||
(k.align=l?"left":"right"):k.verticalAlign||(k.verticalAlign=l?"bottom":"top");this.options.dataLabels=k;b.drawDataLabels&&b.drawDataLabels.apply(this,arguments);}if(f.enabled)for(d=c;d--;)if(m=a[d])m.dataLabels=[m.dataLabelUpper,m.dataLabel].filter(function(f){return !!f});this.options.dataLabels=v;},alignDataLabel:function(){p.column.prototype.alignDataLabel.apply(this,arguments);},drawPoints:function(){var d=this.points.length,c,q;b.drawPoints.apply(this,arguments);for(q=0;q<d;)c=this.points[q],c.origProps=
{plotY:c.plotY,plotX:c.plotX,isInside:c.isInside,negative:c.negative,zone:c.zone,y:c.y},c.lowerGraphic=c.graphic,c.graphic=c.upperGraphic,c.plotY=c.plotHigh,h(c.plotHighX)&&(c.plotX=c.plotHighX),c.y=c.high,c.negative=c.high<(this.options.threshold||0),c.zone=this.zones.length&&c.getZone(),this.chart.polar||(c.isInside=c.isTopInside=void 0!==c.plotY&&0<=c.plotY&&c.plotY<=this.yAxis.len&&0<=c.plotX&&c.plotX<=this.xAxis.len),q++;b.drawPoints.apply(this,arguments);for(q=0;q<d;)c=this.points[q],c.upperGraphic=
c.graphic,c.graphic=c.lowerGraphic,a.extend(c,c.origProps),delete c.origProps,q++;},setStackedPoints:a.noop},{setState:function(){var a=this.state,c=this.series,b=c.chart.polar;h(this.plotHigh)||(this.plotHigh=c.yAxis.toPixels(this.high,!0));h(this.plotLow)||(this.plotLow=this.plotY=c.yAxis.toPixels(this.low,!0));c.stateMarkerGraphic&&(c.lowerStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.upperStateMarkerGraphic);this.graphic=this.upperGraphic;this.plotY=this.plotHigh;b&&(this.plotX=
this.plotHighX);d.setState.apply(this,arguments);this.state=a;this.plotY=this.plotLow;this.graphic=this.lowerGraphic;b&&(this.plotX=this.plotLowX);c.stateMarkerGraphic&&(c.upperStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.lowerStateMarkerGraphic,c.lowerStateMarkerGraphic=void 0);d.setState.apply(this,arguments);},haloPath:function(){var a=this.series.chart.polar,c=[];this.plotY=this.plotLow;a&&(this.plotX=this.plotLowX);this.isInside&&(c=d.haloPath.apply(this,arguments));this.plotY=
this.plotHigh;a&&(this.plotX=this.plotHighX);this.isTopInside&&(c=c.concat(d.haloPath.apply(this,arguments)));return c},destroyElements:function(){["lowerGraphic","upperGraphic"].forEach(function(a){this[a]&&(this[a]=this[a].destroy());},this);this.graphic=null;return d.destroyElements.apply(this,arguments)}});})(z);(function(a){var w=a.seriesType;w("areasplinerange","arearange",null,{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline});})(z);(function(a){var w=a.defaultPlotOptions,x=a.merge,
g=a.noop,h=a.pick,u=a.seriesType,p=a.seriesTypes.column.prototype;u("columnrange","arearange",x(w.column,w.arearange,{pointRange:null,marker:null,states:{hover:{halo:!1}}}),{translate:function(){var a=this,d=a.yAxis,e=a.xAxis,c=e.startAngleRad,q,t=a.chart,v=a.xAxis.isRadial,m=Math.max(t.chartWidth,t.chartHeight)+999,l;p.translate.apply(a);a.points.forEach(function(b){var f=b.shapeArgs,k=a.options.minPointLength,n,y;b.plotHigh=l=Math.min(Math.max(-m,d.translate(b.high,0,1,0,1)),m);b.plotLow=Math.min(Math.max(-m,
b.plotY),m);y=l;n=h(b.rectPlotY,b.plotY)-l;Math.abs(n)<k?(k-=n,n+=k,y-=k/2):0>n&&(n*=-1,y-=n);v?(q=b.barX+c,b.shapeType="path",b.shapeArgs={d:a.polarArc(y+n,y,q,q+b.pointWidth)}):(f.height=n,f.y=y,b.tooltipPos=t.inverted?[d.len+d.pos-t.plotLeft-y-n/2,e.len+e.pos-t.plotTop-f.x-f.width/2,n]:[e.left-t.plotLeft+f.x+f.width/2,d.pos-t.plotTop+y+n/2,n]);});},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:g,getSymbol:g,crispCol:function(){return p.crispCol.apply(this,arguments)},drawPoints:function(){return p.drawPoints.apply(this,
arguments)},drawTracker:function(){return p.drawTracker.apply(this,arguments)},getColumnMetrics:function(){return p.getColumnMetrics.apply(this,arguments)},pointAttribs:function(){return p.pointAttribs.apply(this,arguments)},animate:function(){return p.animate.apply(this,arguments)},polarArc:function(){return p.polarArc.apply(this,arguments)},translate3dPoints:function(){return p.translate3dPoints.apply(this,arguments)},translate3dShapes:function(){return p.translate3dShapes.apply(this,arguments)}},
{setState:p.pointClass.prototype.setState});})(z);(function(a){var w=a.pick,x=a.seriesType,g=a.seriesTypes.column.prototype;x("columnpyramid","column",{},{translate:function(){var a=this,u=a.chart,p=a.options,b=a.dense=2>a.closestPointRange*a.xAxis.transA,b=a.borderWidth=w(p.borderWidth,b?0:1),d=a.yAxis,e=p.threshold,c=a.translatedThreshold=d.getThreshold(e),q=w(p.minPointLength,5),t=a.getColumnMetrics(),v=t.width,m=a.barW=Math.max(v,1+2*b),l=a.pointXOffset=t.offset;u.inverted&&(c-=.5);p.pointPadding&&
(m=Math.ceil(m));g.translate.apply(a);a.points.forEach(function(b){var f=w(b.yBottom,c),k=999+Math.abs(f),n=Math.min(Math.max(-k,b.plotY),d.len+k),k=b.plotX+l,y=m/2,B=Math.min(n,f),f=Math.max(n,f)-B,h,r,t,g,x,D;b.barX=k;b.pointWidth=v;b.tooltipPos=u.inverted?[d.len+d.pos-u.plotLeft-n,a.xAxis.len-k-y,f]:[k+y,n+d.pos-u.plotTop,f];n=e+(b.total||b.y);"percent"===p.stacking&&(n=e+(0>b.y)?-100:100);n=d.toPixels(n,!0);h=u.plotHeight-n-(u.plotHeight-c);r=y*(B-n)/h;t=y*(B+f-n)/h;h=k-r+y;r=k+r+y;g=k+t+y;t=
k-t+y;x=B-q;D=B+f;0>b.y&&(x=B,D=B+f+q);u.inverted&&(g=u.plotWidth-B,h=n-(u.plotWidth-c),r=y*(n-g)/h,t=y*(n-(g-f))/h,h=k+y+r,r=h-2*r,g=k-t+y,t=k+t+y,x=B,D=B+f-q,0>b.y&&(D=B+f+q));b.shapeType="path";b.shapeArgs={x:h,y:x,width:r-h,height:f,d:["M",h,x,"L",r,x,g,D,t,D,"Z"]};});}});})(z);(function(a){var w=a.isNumber,x=a.merge,g=a.pick,h=a.pInt,u=a.Series,p=a.seriesType,b=a.TrackerMixin;p("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,
borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var a=this.yAxis,b=this.options,c=a.center;this.generatePoints();this.points.forEach(function(d){var e=x(b.dial,d.dial),v=h(g(e.radius,80))*c[2]/200,m=h(g(e.baseLength,70))*v/100,l=h(g(e.rearLength,10))*v/100,n=e.baseWidth||3,f=e.topWidth||1,k=b.overshoot,C=a.startAngleRad+
a.translate(d.y,null,null,null,!0);w(k)?(k=k/180*Math.PI,C=Math.max(a.startAngleRad-k,Math.min(a.endAngleRad+k,C))):!1===b.wrap&&(C=Math.max(a.startAngleRad,Math.min(a.endAngleRad,C)));C=180*C/Math.PI;d.shapeType="path";d.shapeArgs={d:e.path||["M",-l,-n/2,"L",m,-n/2,v,-f/2,v,f/2,m,n/2,-l,n/2,"z"],translateX:c[0],translateY:c[1],rotation:C};d.plotX=c[0];d.plotY=c[1];});},drawPoints:function(){var a=this,b=a.chart,c=a.yAxis.center,q=a.pivot,h=a.options,v=h.pivot,m=b.renderer;a.points.forEach(function(c){var l=
c.graphic,f=c.shapeArgs,k=f.d,d=x(h.dial,c.dial);l?(l.animate(f),f.d=k):(c.graphic=m[c.shapeType](f).attr({rotation:f.rotation,zIndex:1}).addClass("highcharts-dial").add(a.group),b.styledMode||c.graphic.attr({stroke:d.borderColor||"none","stroke-width":d.borderWidth||0,fill:d.backgroundColor||"#000000"}));});q?q.animate({translateX:c[0],translateY:c[1]}):(a.pivot=m.circle(0,0,g(v.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(c[0],c[1]).add(a.group),b.styledMode||a.pivot.attr({"stroke-width":v.borderWidth||
0,stroke:v.borderColor||"#cccccc",fill:v.backgroundColor||"#000000"}));},animate:function(a){var b=this;a||(b.points.forEach(function(a){var c=a.graphic;c&&(c.attr({rotation:180*b.yAxis.startAngleRad/Math.PI}),c.animate({rotation:a.shapeArgs.rotation},b.options.animation));}),b.animate=null);},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);u.prototype.render.call(this);this.group.clip(this.chart.clipRect);},setData:function(a,
b){u.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();g(b,!0)&&this.chart.redraw();},drawTracker:b&&b.drawTrackerPoint},{setState:function(a){this.state=a;}});})(z);(function(a){var w=a.noop,x=a.pick,g=a.seriesType,h=a.seriesTypes;g("boxplot","column",{threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},
whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return [a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",pointAttribs:function(){return {}},drawDataLabels:w,translate:function(){var a=this.yAxis,g=this.pointArrayMap;h.column.prototype.translate.apply(this);this.points.forEach(function(b){g.forEach(function(d){null!==b[d]&&(b[d+"Plot"]=a.translate(b[d],0,1,0,1));});});},drawPoints:function(){var a=
this,h=a.options,b=a.chart,d=b.renderer,e,c,q,g,v,m,l=0,n,f,k,C,y=!1!==a.doQuartiles,B,F=a.options.whiskerLength;a.points.forEach(function(r){var t=r.graphic,p=t?"animate":"attr",u=r.shapeArgs,w={},E={},A={},z={},G=r.color||a.color;void 0!==r.plotY&&(n=u.width,f=Math.floor(u.x),k=f+n,C=Math.round(n/2),e=Math.floor(y?r.q1Plot:r.lowPlot),c=Math.floor(y?r.q3Plot:r.lowPlot),q=Math.floor(r.highPlot),g=Math.floor(r.lowPlot),t||(r.graphic=t=d.g("point").add(a.group),r.stem=d.path().addClass("highcharts-boxplot-stem").add(t),
F&&(r.whiskers=d.path().addClass("highcharts-boxplot-whisker").add(t)),y&&(r.box=d.path(void 0).addClass("highcharts-boxplot-box").add(t)),r.medianShape=d.path(void 0).addClass("highcharts-boxplot-median").add(t)),b.styledMode||(E.stroke=r.stemColor||h.stemColor||G,E["stroke-width"]=x(r.stemWidth,h.stemWidth,h.lineWidth),E.dashstyle=r.stemDashStyle||h.stemDashStyle,r.stem.attr(E),F&&(A.stroke=r.whiskerColor||h.whiskerColor||G,A["stroke-width"]=x(r.whiskerWidth,h.whiskerWidth,h.lineWidth),r.whiskers.attr(A)),
y&&(w.fill=r.fillColor||h.fillColor||G,w.stroke=h.lineColor||G,w["stroke-width"]=h.lineWidth||0,r.box.attr(w)),z.stroke=r.medianColor||h.medianColor||G,z["stroke-width"]=x(r.medianWidth,h.medianWidth,h.lineWidth),r.medianShape.attr(z)),m=r.stem.strokeWidth()%2/2,l=f+C+m,r.stem[p]({d:["M",l,c,"L",l,q,"M",l,e,"L",l,g]}),y&&(m=r.box.strokeWidth()%2/2,e=Math.floor(e)+m,c=Math.floor(c)+m,f+=m,k+=m,r.box[p]({d:["M",f,c,"L",f,e,"L",k,e,"L",k,c,"L",f,c,"z"]})),F&&(m=r.whiskers.strokeWidth()%2/2,q+=m,g+=m,
B=/%$/.test(F)?C*parseFloat(F)/100:F/2,r.whiskers[p]({d:["M",l-B,q,"L",l+B,q,"M",l-B,g,"L",l+B,g]})),v=Math.round(r.medianPlot),m=r.medianShape.strokeWidth()%2/2,v+=m,r.medianShape[p]({d:["M",f,v,"L",k,v]}));});},setStackedPoints:w});})(z);(function(a){var w=a.noop,x=a.seriesType,g=a.seriesTypes;x("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},
whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a){return [a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:g.arearange?function(){var a=this.pointValKey;g.arearange.prototype.drawDataLabels.call(this);this.data.forEach(function(h){h.y=h[a];});}:w,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||g.column.prototype.getColumnMetrics.call(this)}});})(z);(function(a){var w=a.correctFloat,x=a.isNumber,g=a.pick,h=a.objectEach,
u=a.arrayMin,p=a.arrayMax,b=a.addEvent,d=a.Chart,e=a.Point,c=a.Series,q=a.seriesType,t=a.seriesTypes;b(a.Axis,"afterInit",function(){this.isXAxis||(this.waterfallStacks={});});b(d,"beforeRedraw",function(){for(var a=this.axes,b=this.series,c=b.length;c--;)b[c].options.stacking&&(a.forEach(function(a){a.isXAxis||(a.waterfallStacks={});}),c=0);});q("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"Dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",
showLine:!0,generatePoints:function(){var a,b,c,d;t.column.prototype.generatePoints.apply(this);c=0;for(b=this.points.length;c<b;c++)if(a=this.points[c],d=this.processedYData[c],a.isIntermediateSum||a.isSum)a.y=w(d);},translate:function(){var a=this.options,b=this.yAxis,c,d,f,k,e,y,h,q,r,p=g(a.minPointLength,5),u=p/2,w=a.threshold,x=a.stacking,E=b.waterfallStacks[this.stackKey],A;t.column.prototype.translate.apply(this);h=q=w;d=this.points;c=0;for(a=d.length;c<a;c++)f=d[c],y=this.processedYData[c],
k=f.shapeArgs,r=[0,y],A=f.y,x?E&&(r=E[c],"overlap"===x?(e=r.threshold+r.total,r.total-=A,e=0<=A?e:e-A):0<=A?(e=r.threshold+r.posTotal,r.posTotal-=A):(e=r.threshold+r.negTotal,r.negTotal-=A,e-=A),f.isSum||(r.connectorThreshold=r.threshold+r.stackTotal),b.reversed?(y=0<=A?e-A:e+A,A=e):(y=e,A=e-A),f.below=y<=g(w,0),k.y=b.translate(y,0,1,0,1),k.height=Math.abs(k.y-b.translate(A,0,1,0,1))):(e=Math.max(h,h+A)+r[0],k.y=b.translate(e,0,1,0,1),f.isSum?(k.y=b.translate(r[1],0,1,0,1),k.height=Math.min(b.translate(r[0],
0,1,0,1),b.len)-k.y):f.isIntermediateSum?(0<=A?(y=r[1]+q,A=q):(y=q,A=r[1]+q),b.reversed&&(y^=A,A^=y,y^=A),k.y=b.translate(y,0,1,0,1),k.height=Math.abs(k.y-Math.min(b.translate(A,0,1,0,1),b.len)),q+=r[1]):(k.height=0<y?b.translate(h,0,1,0,1)-k.y:b.translate(h,0,1,0,1)-b.translate(h-y,0,1,0,1),h+=y,f.below=h<g(w,0)),0>k.height&&(k.y+=k.height,k.height*=-1)),f.plotY=k.y=Math.round(k.y)-this.borderWidth%2/2,k.height=Math.max(Math.round(k.height),.001),f.yBottom=k.y+k.height,k.height<=p&&!f.isNull?(k.height=
p,k.y-=u,f.plotY=k.y,f.minPointLengthOffset=0>f.y?-u:u):(f.isNull&&(k.width=0),f.minPointLengthOffset=0),k=f.plotY+(f.negative?k.height:0),this.chart.inverted?f.tooltipPos[0]=b.len-k:f.tooltipPos[1]=k;},processData:function(a){var b=this.options,l=this.yData,d=b.data,f,k=l.length,e=b.threshold||0,v,h,q,r,g,t;for(t=h=v=q=r=0;t<k;t++)g=l[t],f=d&&d[t]?d[t]:{},"sum"===g||f.isSum?l[t]=w(h):"intermediateSum"===g||f.isIntermediateSum?(l[t]=w(v),v=0):(h+=g,v+=g),q=Math.min(h,q),r=Math.max(h,r);c.prototype.processData.call(this,
a);b.stacking||(this.dataMin=q+e,this.dataMax=r);},toYData:function(a){return a.isSum?0===a.x?null:"sum":a.isIntermediateSum?0===a.x?null:"intermediateSum":a.y},pointAttribs:function(a,b){var c=this.options.upColor;c&&!a.options.color&&(a.color=0<a.y?c:null);a=t.column.prototype.pointAttribs.call(this,a,b);delete a.dashstyle;return a},getGraphPath:function(){return ["M",0,0]},getCrispPath:function(){var a=this.data,b=this.yAxis,c=a.length,d=Math.round(this.graph.strokeWidth())%2/2,f=Math.round(this.borderWidth)%
2/2,k=this.xAxis.reversed,e=this.yAxis.reversed,h=this.options.stacking,q=[],g,r,t,p,u,w,x;for(w=1;w<c;w++){u=a[w].shapeArgs;r=a[w-1];p=a[w-1].shapeArgs;g=b.waterfallStacks[this.stackKey];t=0<r.y?-p.height:0;g&&(g=g[w-1],h?(g=g.connectorThreshold,t=Math.round(b.translate(g,0,1,0,1)+(e?t:0))-d):t=p.y+r.minPointLengthOffset+f-d,x=["M",p.x+(k?0:p.width),t,"L",u.x+(k?u.width:0),t]);if(!h&&0>r.y&&!e||0<r.y&&e)x[2]+=p.height,x[5]+=p.height;q=q.concat(x);}return q},drawGraph:function(){c.prototype.drawGraph.call(this);
this.graph.attr({d:this.getCrispPath()});},setStackedPoints:function(){var a=this.options,b=this.yAxis.waterfallStacks,c=a.threshold,d=c||0,f=c||0,k=this.stackKey,e=this.xData,h=e.length,g,q,r,t;if(this.visible||!this.chart.options.chart.ignoreHiddenSeries)for(b[k]||(b[k]={}),b=b[k],k=0;k<h;k++)g=e[k],b[g]||(b[g]={negTotal:0,posTotal:0,total:0,stackTotal:0,threshold:0,stackState:[d]}),g=b[g],q=this.yData[k],0<=q?g.posTotal+=q:g.negTotal+=q,t=a.data[k],q=g.posTotal,r=g.negTotal,t&&t.isIntermediateSum?
(d^=f,f^=d,d^=f):t&&t.isSum&&(d=c),g.stackTotal=q+r,g.total=g.stackTotal,g.threshold=d,g.stackState[0]=d,g.stackState.push(g.stackTotal),d+=g.stackTotal;},getExtremes:function(){var a=this.options.stacking,b,c,d,f,k;a&&(b=this.yAxis,b=b.waterfallStacks,c=this.stackedYNeg=[],d=this.stackedYPos=[],"overlap"===a?h(b[this.stackKey],function(a){f=[];a.stackState.forEach(function(b,c){k=a.stackState[0];c?f.push(b+k):f.push(k);});c.push(u(f));d.push(p(f));}):h(b[this.stackKey],function(a){c.push(a.negTotal+
a.threshold);d.push(a.posTotal+a.threshold);}),this.dataMin=u(c),this.dataMax=p(d));}},{getClassName:function(){var a=e.prototype.getClassName.call(this);this.isSum?a+=" highcharts-sum":this.isIntermediateSum&&(a+=" highcharts-intermediate-sum");return a},isValid:function(){return x(this.y,!0)||this.isSum||this.isIntermediateSum}});})(z);(function(a){var w=a.Series,x=a.seriesType,g=a.seriesTypes;x("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,
pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=w.prototype.getGraphPath.call(this),g=a.length+1;g--;)(g===a.length||"M"===a[g])&&0<g&&a.splice(g,0,"z");return this.areaPath=a},drawGraph:function(){this.options.fillColor=this.color;g.area.prototype.drawGraph.call(this);},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawTracker:w.prototype.drawTracker,setStackedPoints:a.noop});})(z);(function(a){var w=a.Series,x=a.Legend,g=a.Chart,h=a.addEvent,u=a.wrap,p=a.color,
b=a.isNumber,d=a.numberFormat,e=a.objectEach,c=a.merge,q=a.noop,t=a.pick,v=a.stableSort,m=a.setOptions,l=a.arrayMin,n=a.arrayMax;m({legend:{bubbleLegend:{borderColor:void 0,borderWidth:2,className:void 0,color:void 0,connectorClassName:void 0,connectorColor:void 0,connectorDistance:60,connectorWidth:1,enabled:!1,labels:{className:void 0,allowOverlap:!1,format:"",formatter:void 0,align:"right",style:{fontSize:10,color:void 0},x:0,y:0},maxSize:60,minSize:10,legendIndex:0,ranges:{value:void 0,borderColor:void 0,
color:void 0,connectorColor:void 0},sizeBy:"area",sizeByAbsoluteValue:!1,zIndex:1,zThreshold:0}}});a.BubbleLegend=function(a,b){this.init(a,b);};a.BubbleLegend.prototype={init:function(a,b){this.options=a;this.visible=!0;this.chart=b.chart;this.legend=b;},setState:q,addToLegend:function(a){a.splice(this.options.legendIndex,0,this);},drawLegendSymbol:function(a){var f=this.chart,c=this.options,d=t(a.options.itemDistance,20),e,l=c.ranges;e=c.connectorDistance;this.fontMetrics=f.renderer.fontMetrics(c.labels.style.fontSize.toString()+
"px");l&&l.length&&b(l[0].value)?(v(l,function(a,b){return b.value-a.value}),this.ranges=l,this.setOptions(),this.render(),f=this.getMaxLabelSize(),l=this.ranges[0].radius,a=2*l,e=e-l+f.width,e=0<e?e:0,this.maxLabel=f,this.movementX="left"===c.labels.align?e:0,this.legendItemWidth=a+e+d,this.legendItemHeight=a+this.fontMetrics.h/2):a.options.bubbleLegend.autoRanges=!0;},setOptions:function(){var a=this,b=a.ranges,d=a.options,e=a.chart.series[d.seriesIndex],l=a.legend.baseline,g={"z-index":d.zIndex,
"stroke-width":d.borderWidth},m={"z-index":d.zIndex,"stroke-width":d.connectorWidth},h=a.getLabelStyles(),n=e.options.marker.fillOpacity,q=a.chart.styledMode;b.forEach(function(f,k){q||(g.stroke=t(f.borderColor,d.borderColor,e.color),g.fill=t(f.color,d.color,1!==n?p(e.color).setOpacity(n).get("rgba"):e.color),m.stroke=t(f.connectorColor,d.connectorColor,e.color));b[k].radius=a.getRangeRadius(f.value);b[k]=c(b[k],{center:b[0].radius-b[k].radius+l});q||c(!0,b[k],{bubbleStyle:c(!1,g),connectorStyle:c(!1,
m),labelStyle:h});});},getLabelStyles:function(){var a=this.options,b={},d="left"===a.labels.align,l=this.legend.options.rtl;e(a.labels.style,function(a,f){"color"!==f&&"fontSize"!==f&&"z-index"!==f&&(b[f]=a);});return c(!1,b,{"font-size":a.labels.style.fontSize,fill:t(a.labels.style.color,"#000000"),"z-index":a.zIndex,align:l||d?"right":"left"})},getRangeRadius:function(a){var b=this.options;return this.chart.series[this.options.seriesIndex].getRadius.call(this,b.ranges[b.ranges.length-1].value,b.ranges[0].value,
b.minSize,b.maxSize,a)},render:function(){var a=this,b=a.chart.renderer,c=a.options.zThreshold;a.symbols||(a.symbols={connectors:[],bubbleItems:[],labels:[]});a.legendSymbol=b.g("bubble-legend");a.legendItem=b.g("bubble-legend-item");a.legendSymbol.translateX=0;a.legendSymbol.translateY=0;a.ranges.forEach(function(b){b.value>=c&&a.renderRange(b);});a.legendSymbol.add(a.legendItem);a.legendItem.add(a.legendGroup);a.hideOverlappingLabels();},renderRange:function(a){var b=this.options,c=b.labels,f=this.chart.renderer,
d=this.symbols,e=d.labels,l=a.center,g=Math.abs(a.radius),m=b.connectorDistance,h=c.align,n=c.style.fontSize,m=this.legend.options.rtl||"left"===h?-m:m,c=b.connectorWidth,q=this.ranges[0].radius,v=l-g-b.borderWidth/2+c/2,t,n=n/2-(this.fontMetrics.h-n)/2,p=f.styledMode;"center"===h&&(m=0,b.connectorDistance=0,a.labelStyle.align="center");h=v+b.labels.y;t=q+m+b.labels.x;d.bubbleItems.push(f.circle(q,l+((v%1?1:.5)-(c%2?0:.5)),g).attr(p?{}:a.bubbleStyle).addClass((p?"highcharts-color-"+this.options.seriesIndex+
" ":"")+"highcharts-bubble-legend-symbol "+(b.className||"")).add(this.legendSymbol));d.connectors.push(f.path(f.crispLine(["M",q,v,"L",q+m,v],b.connectorWidth)).attr(p?{}:a.connectorStyle).addClass((p?"highcharts-color-"+this.options.seriesIndex+" ":"")+"highcharts-bubble-legend-connectors "+(b.connectorClassName||"")).add(this.legendSymbol));a=f.text(this.formatLabel(a),t,h+n).attr(p?{}:a.labelStyle).addClass("highcharts-bubble-legend-labels "+(b.labels.className||"")).add(this.legendSymbol);e.push(a);
a.placed=!0;a.alignAttr={x:t,y:h+n};},getMaxLabelSize:function(){var a,b;this.symbols.labels.forEach(function(c){b=c.getBBox(!0);a=a?b.width>a.width?b:a:b;});return a||{}},formatLabel:function(b){var c=this.options,f=c.labels.formatter;return (c=c.labels.format)?a.format(c,b):f?f.call(b):d(b.value,1)},hideOverlappingLabels:function(){var a=this.chart,b=this.symbols;!this.options.labels.allowOverlap&&b&&(a.hideOverlappingLabels(b.labels),b.labels.forEach(function(a,c){a.newOpacity?a.newOpacity!==a.oldOpacity&&
b.connectors[c].show():b.connectors[c].hide();}));},getRanges:function(){var a=this.legend.bubbleLegend,k,d=a.options.ranges,e,g=Number.MAX_VALUE,m=-Number.MAX_VALUE;a.chart.series.forEach(function(a){a.isBubble&&!a.ignoreSeries&&(e=a.zData.filter(b),e.length&&(g=t(a.options.zMin,Math.min(g,Math.max(l(e),!1===a.options.displayNegative?a.options.zThreshold:-Number.MAX_VALUE))),m=t(a.options.zMax,Math.max(m,n(e)))));});k=g===m?[{value:m}]:[{value:g},{value:(g+m)/2},{value:m,autoRanges:!0}];d.length&&d[0].radius&&
k.reverse();k.forEach(function(a,b){d&&d[b]&&(k[b]=c(!1,d[b],a));});return k},predictBubbleSizes:function(){var a=this.chart,b=this.fontMetrics,c=a.legend.options,d="horizontal"===c.layout,e=d?a.legend.lastLineHeight:0,l=a.plotSizeX,g=a.plotSizeY,m=a.series[this.options.seriesIndex],a=Math.ceil(m.minPxSize),h=Math.ceil(m.maxPxSize),m=m.options.maxSize,n=Math.min(g,l);if(c.floating||!/%$/.test(m))b=h;else if(m=parseFloat(m),b=(n+e-b.h/2)*m/100/(m/100+1),d&&g-b>=l||!d&&l-b>=g)b=h;return [a,Math.ceil(b)]},
updateRanges:function(a,b){var c=this.legend.options.bubbleLegend;c.minSize=a;c.maxSize=b;c.ranges=this.getRanges();},correctSizes:function(){var a=this.legend,b=this.chart.series[this.options.seriesIndex];1<Math.abs(Math.ceil(b.maxPxSize)-this.options.maxSize)&&(this.updateRanges(this.options.minSize,b.maxPxSize),a.render());}};h(a.Legend,"afterGetAllItems",function(b){var c=this.bubbleLegend,f=this.options,d=f.bubbleLegend,e=this.chart.getVisibleBubbleSeriesIndex();c&&c.ranges&&c.ranges.length&&(d.ranges.length&&
(d.autoRanges=!!d.ranges[0].autoRanges),this.destroyItem(c));0<=e&&f.enabled&&d.enabled&&(d.seriesIndex=e,this.bubbleLegend=new a.BubbleLegend(d,this),this.bubbleLegend.addToLegend(b.allItems));});g.prototype.getVisibleBubbleSeriesIndex=function(){for(var a=this.series,b=0;b<a.length;){if(a[b]&&a[b].isBubble&&a[b].visible&&a[b].zData.length)return b;b++;}return -1};x.prototype.getLinesHeights=function(){var a=this.allItems,b=[],c,d=a.length,e,l=0;for(e=0;e<d;e++)if(a[e].legendItemHeight&&(a[e].itemHeight=
a[e].legendItemHeight),a[e]===a[d-1]||a[e+1]&&a[e]._legendItemPos[1]!==a[e+1]._legendItemPos[1]){b.push({height:0});c=b[b.length-1];for(l;l<=e;l++)a[l].itemHeight>c.height&&(c.height=a[l].itemHeight);c.step=e;}return b};x.prototype.retranslateItems=function(a){var b,c,d,f=this.options.rtl,e=0;this.allItems.forEach(function(l,k){b=l.legendGroup.translateX;c=l._legendItemPos[1];if((d=l.movementX)||f&&l.ranges)d=f?b-l.options.maxSize/2:b+d,l.legendGroup.attr({translateX:d});k>a[e].step&&e++;l.legendGroup.attr({translateY:Math.round(c+
a[e].height/2)});l._legendItemPos[1]=c+a[e].height/2;});};h(w,"legendItemClick",function(){var a=this.chart,b=this.visible,c=this.chart.legend;c&&c.bubbleLegend&&(this.visible=!b,this.ignoreSeries=b,a=0<=a.getVisibleBubbleSeriesIndex(),c.bubbleLegend.visible!==a&&(c.update({bubbleLegend:{enabled:a}}),c.bubbleLegend.visible=a),this.visible=b);});u(g.prototype,"drawChartBox",function(a,b,c){var d=this.legend,f=0<=this.getVisibleBubbleSeriesIndex(),l;d&&d.options.enabled&&d.bubbleLegend&&d.options.bubbleLegend.autoRanges&&
f?(l=d.bubbleLegend.options,f=d.bubbleLegend.predictBubbleSizes(),d.bubbleLegend.updateRanges(f[0],f[1]),l.placed||(d.group.placed=!1,d.allItems.forEach(function(a){a.legendGroup.translateY=null;})),d.render(),this.getMargins(),this.axes.forEach(function(a){a.render();l.placed||(a.setScale(),a.updateNames(),e(a.ticks,function(a){a.isNew=!0;a.isNewLabel=!0;}));}),l.placed=!0,this.getMargins(),a.call(this,b,c),d.bubbleLegend.correctSizes(),d.retranslateItems(d.getLinesHeights())):(a.call(this,b,c),d&&
d.options.enabled&&d.bubbleLegend&&(d.render(),d.retranslateItems(d.getLinesHeights())));});})(z);(function(a){var w=a.arrayMax,x=a.arrayMin,g=a.Axis,h=a.color,u=a.isNumber,p=a.noop,b=a.pick,d=a.pInt,e=a.Point,c=a.Series,q=a.seriesType,t=a.seriesTypes;q("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},animationLimit:250,marker:{lineColor:null,lineWidth:1,fillOpacity:.5,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",
softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,isBubble:!0,pointAttribs:function(a,b){var d=this.options.marker.fillOpacity;a=c.prototype.pointAttribs.call(this,a,b);1!==d&&(a.fill=h(a.fill).setOpacity(d).get("rgba"));return a},getRadii:function(a,
b,c){var d,f=this.zData,e=c.minPxSize,l=c.maxPxSize,m=[],g;d=0;for(c=f.length;d<c;d++)g=f[d],m.push(this.getRadius(a,b,e,l,g));this.radii=m;},getRadius:function(a,b,c,d,f){var e=this.options,l="width"!==e.sizeBy,g=e.zThreshold,m=b-a;e.sizeByAbsoluteValue&&null!==f&&(f=Math.abs(f-g),m=Math.max(b-g,Math.abs(a-g)),a=0);u(f)?f<a?c=c/2-1:(a=0<m?(f-a)/m:.5,l&&0<=a&&(a=Math.sqrt(a)),c=Math.ceil(c+a*(d-c))/2):c=null;return c},animate:function(a){!a&&this.points.length<this.options.animationLimit&&(this.points.forEach(function(a){var b=
a.graphic,c;b&&b.width&&(c={x:b.x,y:b.y,width:b.width,height:b.height},b.attr({x:a.plotX,y:a.plotY,width:1,height:1}),b.animate(c,this.options.animation));},this),this.animate=null);},translate:function(){var b,c=this.data,d,e,f=this.radii;t.scatter.prototype.translate.call(this);for(b=c.length;b--;)d=c[b],e=f?f[b]:0,u(e)&&e>=this.minPxSize/2?(d.marker=a.extend(d.marker,{radius:e,width:2*e,height:2*e}),d.dlBox={x:d.plotX-e,y:d.plotY-e,width:2*e,height:2*e}):d.shapeArgs=d.plotY=d.dlBox=void 0;},alignDataLabel:t.column.prototype.alignDataLabel,
buildKDTree:p,applyZones:p},{haloPath:function(a){return e.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});g.prototype.beforePadding=function(){var c=this,e=this.len,g=this.chart,h=0,f=e,k=this.isXAxis,q=k?"xData":"yData",t=this.min,p={},z=Math.min(g.plotWidth,g.plotHeight),r=Number.MAX_VALUE,I=-Number.MAX_VALUE,J=this.max-t,H=e/J,D=[];this.series.forEach(function(e){var f=e.options;!e.bubblePadding||!e.visible&&g.options.chart.ignoreHiddenSeries||(c.allowZoomOutside=
!0,D.push(e),k&&(["minSize","maxSize"].forEach(function(a){var b=f[a],c=/%$/.test(b),b=d(b);p[a]=c?z*b/100:b;}),e.minPxSize=p.minSize,e.maxPxSize=Math.max(p.maxSize,p.minSize),e=e.zData.filter(a.isNumber),e.length&&(r=b(f.zMin,Math.min(r,Math.max(x(e),!1===f.displayNegative?f.zThreshold:-Number.MAX_VALUE))),I=b(f.zMax,Math.max(I,w(e))))));});D.forEach(function(a){var b=a[q],d=b.length,e;k&&a.getRadii(r,I,a);if(0<J)for(;d--;)u(b[d])&&c.dataMin<=b[d]&&b[d]<=c.dataMax&&(e=a.radii[d],h=Math.min((b[d]-t)*
H-e,h),f=Math.max((b[d]-t)*H+e,f));});D.length&&0<J&&!this.isLog&&(f-=e,H*=(e+Math.max(0,h)-Math.min(f,e))/e,[["min","userMin",h],["max","userMax",f]].forEach(function(a){void 0===b(c.options[a[0]],c[a[1]])&&(c[a[0]]+=a[2]/H);}));};})(z);(function(a){var w=a.seriesType,x=a.defined;w("packedbubble","bubble",{minSize:"10%",maxSize:"100%",sizeBy:"radius",zoneAxis:"y",tooltip:{pointFormat:"Value: {point.value}"}},{pointArrayMap:["value"],pointValKey:"value",isCartesian:!1,axisTypes:[],accumulateAllPoints:function(a){var g=
a.chart,u=[],p,b;for(p=0;p<g.series.length;p++)if(a=g.series[p],a.visible||!g.options.chart.ignoreHiddenSeries)for(b=0;b<a.yData.length;b++)u.push([null,null,a.yData[b],a.index,b]);return u},translate:function(){var g,h=this.chart,u=this.data,p=this.index,b,d,e;this.processedXData=this.xData;this.generatePoints();x(h.allDataPoints)||(h.allDataPoints=this.accumulateAllPoints(this),this.getPointRadius());g=this.placeBubbles(h.allDataPoints);for(e=0;e<g.length;e++)g[e][3]===p&&(b=u[g[e][4]],d=g[e][2],
b.plotX=g[e][0]-h.plotLeft+h.diffX,b.plotY=g[e][1]-h.plotTop+h.diffY,b.marker=a.extend(b.marker,{radius:d,width:2*d,height:2*d}));},checkOverlap:function(a,h){var g=a[0]-h[0],p=a[1]-h[1];return -.001>Math.sqrt(g*g+p*p)-Math.abs(a[2]+h[2])},positionBubble:function(a,h,u){var g=Math.sqrt,b=Math.asin,d=Math.acos,e=Math.pow,c=Math.abs,g=g(e(a[0]-h[0],2)+e(a[1]-h[1],2)),d=d((e(g,2)+e(u[2]+h[2],2)-e(u[2]+a[2],2))/(2*(u[2]+h[2])*g)),b=b(c(a[0]-h[0])/g);a=(0>a[1]-h[1]?0:Math.PI)+d+b*(0>(a[0]-h[0])*(a[1]-h[1])?
1:-1);return [h[0]+(h[2]+u[2])*Math.sin(a),h[1]-(h[2]+u[2])*Math.cos(a),u[2],u[3],u[4]]},placeBubbles:function(a){var g=this.checkOverlap,u=this.positionBubble,p=[],b=1,d=0,e=0,c,q;c=a.sort(function(a,b){return b[2]-a[2]});if(!c.length)return [];if(2>c.length)return [0,0,c[0][0],c[0][1],c[0][2]];p.push([[0,0,c[0][2],c[0][3],c[0][4]]]);p.push([[0,0-c[1][2]-c[0][2],c[1][2],c[1][3],c[1][4]]]);for(q=2;q<c.length;q++)c[q][2]=c[q][2]||1,a=u(p[b][d],p[b-1][e],c[q]),g(a,p[b][0])?(p.push([]),e=0,p[b+1].push(u(p[b][d],
p[b][0],c[q])),b++,d=0):1<b&&p[b-1][e+1]&&g(a,p[b-1][e+1])?(e++,p[b].push(u(p[b][d],p[b-1][e],c[q])),d++):(d++,p[b].push(a));this.chart.stages=p;this.chart.rawPositions=[].concat.apply([],p);this.resizeRadius();return this.chart.rawPositions},resizeRadius:function(){var a=this.chart,h=a.rawPositions,u=Math.min,p=Math.max,b=a.plotLeft,d=a.plotTop,e=a.plotHeight,c=a.plotWidth,q,t,v,m,l,n;q=v=Number.POSITIVE_INFINITY;t=m=Number.NEGATIVE_INFINITY;for(n=0;n<h.length;n++)l=h[n][2],q=u(q,h[n][0]-l),t=p(t,
h[n][0]+l),v=u(v,h[n][1]-l),m=p(m,h[n][1]+l);n=[t-q,m-v];u=u.apply([],[(c-b)/n[0],(e-d)/n[1]]);if(1e-10<Math.abs(u-1)){for(n=0;n<h.length;n++)h[n][2]*=u;this.placeBubbles(h);}else a.diffY=e/2+d-v-(m-v)/2,a.diffX=c/2+b-q-(t-q)/2;},getPointRadius:function(){var a=this,h=a.chart,u=a.options,p=Math.min(h.plotWidth,h.plotHeight),b={},d=[],e=h.allDataPoints,c,q,t,v;["minSize","maxSize"].forEach(function(a){var c=parseInt(u[a],10),d=/%$/.test(c);b[a]=d?p*c/100:c;});h.minRadius=c=b.minSize;h.maxRadius=q=b.maxSize;
(e||[]).forEach(function(b,l){t=b[2];v=a.getRadius(c,q,c,q,t);0===t&&(v=null);e[l][2]=v;d.push(v);});this.radii=d;},alignDataLabel:a.Series.prototype.alignDataLabel});a.addEvent(a.seriesTypes.packedbubble,"updatedData",function(){var a=this;this.chart.series.forEach(function(g){g.type===a.type&&(g.isDirty=!0);});});a.addEvent(a.Chart,"beforeRedraw",function(){this.allDataPoints&&delete this.allDataPoints;});})(z);(function(a){var w=a.pick,x=a.Series,g=a.seriesTypes,h=a.wrap,u=x.prototype,p=a.Pointer.prototype;
a.polarExtended||(a.polarExtended=!0,u.searchPointByAngle=function(a){var b=this.chart,e=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(a.chartX-e[0]-b.plotLeft,a.chartY-e[1]-b.plotTop)})},u.getConnectors=function(a,d,e,c){var b,g,h,m,l,n,f,k;g=c?1:0;b=0<=d&&d<=a.length-1?d:0>d?a.length-1+d:0;d=0>b-1?a.length-(1+g):b-1;g=b+1>a.length-1?g:b+1;h=a[d];g=a[g];m=h.plotX;h=h.plotY;l=g.plotX;n=g.plotY;g=a[b].plotX;b=a[b].plotY;m=(1.5*g+m)/2.5;h=(1.5*b+h)/2.5;l=(1.5*
g+l)/2.5;f=(1.5*b+n)/2.5;n=Math.sqrt(Math.pow(m-g,2)+Math.pow(h-b,2));k=Math.sqrt(Math.pow(l-g,2)+Math.pow(f-b,2));m=Math.atan2(h-b,m-g);f=Math.PI/2+(m+Math.atan2(f-b,l-g))/2;Math.abs(m-f)>Math.PI/2&&(f-=Math.PI);m=g+Math.cos(f)*n;h=b+Math.sin(f)*n;l=g+Math.cos(Math.PI+f)*k;f=b+Math.sin(Math.PI+f)*k;g={rightContX:l,rightContY:f,leftContX:m,leftContY:h,plotX:g,plotY:b};e&&(g.prevPointCont=this.getConnectors(a,d,!1,c));return g},u.toXY=function(a){var b,e=this.chart,c=a.plotX;b=a.plotY;a.rectPlotX=
c;a.rectPlotY=b;b=this.xAxis.postTranslate(a.plotX,this.yAxis.len-b);a.plotX=a.polarPlotX=b.x-e.plotLeft;a.plotY=a.polarPlotY=b.y-e.plotTop;this.kdByAngle?(e=(c/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>e&&(e+=360),a.clientX=e):a.clientX=a.plotX;},g.spline&&(h(g.spline.prototype,"getPointSpline",function(a,d,e,c){this.chart.polar?c?(a=this.getConnectors(d,c,!0,this.connectEnds),a=["C",a.prevPointCont.rightContX,a.prevPointCont.rightContY,a.leftContX,a.leftContY,a.plotX,a.plotY]):a=["M",
e.plotX,e.plotY]:a=a.call(this,d,e,c);return a}),g.areasplinerange&&(g.areasplinerange.prototype.getPointSpline=g.spline.prototype.getPointSpline)),a.addEvent(x,"afterTranslate",function(){var b=this.chart,d,e;if(b.polar){(this.kdByAngle=b.tooltip&&b.tooltip.shared)?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy";if(!this.preventPostTranslate)for(d=this.points,e=d.length;e--;)this.toXY(d[e]);this.hasClipCircleSetter||(this.hasClipCircleSetter=!!a.addEvent(this,"afterRender",
function(){var c;b.polar&&(c=this.yAxis.center,this.group.clip(b.renderer.clipCircle(c[0],c[1],c[2]/2)),this.setClip=a.noop);}));}},{order:2}),h(u,"getGraphPath",function(a,d){var b=this,c,g,h;if(this.chart.polar){d=d||this.points;for(c=0;c<d.length;c++)if(!d[c].isNull){g=c;break}!1!==this.options.connectEnds&&void 0!==g&&(this.connectEnds=!0,d.splice(d.length,0,d[g]),h=!0);d.forEach(function(a){void 0===a.polarPlotY&&b.toXY(a);});}c=a.apply(this,[].slice.call(arguments,1));h&&d.pop();return c}),x=function(a,
d){var b=this.chart,c=this.options.animation,g=this.group,h=this.markerGroup,p=this.xAxis.center,m=b.plotLeft,l=b.plotTop;b.polar?b.renderer.isSVG&&(!0===c&&(c={}),d?(a={translateX:p[0]+m,translateY:p[1]+l,scaleX:.001,scaleY:.001},g.attr(a),h&&h.attr(a)):(a={translateX:m,translateY:l,scaleX:1,scaleY:1},g.animate(a,c),h&&h.animate(a,c),this.animate=null)):a.call(this,d);},h(u,"animate",x),g.column&&(g=g.column.prototype,g.polarArc=function(a,d,e,c){var b=this.xAxis.center,g=this.yAxis.len;return this.chart.renderer.symbols.arc(b[0],
b[1],g-d,null,{start:e,end:c,innerR:g-w(a,g)})},h(g,"animate",x),h(g,"translate",function(a){var b=this.xAxis,e=b.startAngleRad,c,g,h;this.preventPostTranslate=!0;a.call(this);if(b.isRadial)for(c=this.points,h=c.length;h--;)g=c[h],a=g.barX+e,g.shapeType="path",g.shapeArgs={d:this.polarArc(g.yBottom,g.plotY,a,a+g.pointWidth)},this.toXY(g),g.tooltipPos=[g.plotX,g.plotY],g.ttBelow=g.plotY>b.center[1];}),h(g,"alignDataLabel",function(a,d,e,c,g,h){this.chart.polar?(a=d.rectPlotX/Math.PI*180,null===c.align&&
(c.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===c.verticalAlign&&(c.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),u.alignDataLabel.call(this,d,e,c,g,h)):a.call(this,d,e,c,g,h);})),h(p,"getCoordinates",function(a,d){var b=this.chart,c={xAxis:[],yAxis:[]};b.polar?b.axes.forEach(function(a){var e=a.isXAxis,g=a.center,h=d.chartX-g[0]-b.plotLeft,g=d.chartY-g[1]-b.plotTop;c[e?"xAxis":"yAxis"].push({axis:a,value:a.translate(e?Math.PI-Math.atan2(h,g):Math.sqrt(Math.pow(h,
2)+Math.pow(g,2)),!0)});}):c=a.call(this,d);return c}),a.SVGRenderer.prototype.clipCircle=function(b,d,e){var c=a.uniqueKey(),g=this.createElement("clipPath").attr({id:c}).add(this.defs);b=this.circle(b,d,e).add(g);b.id=c;b.clipPath=g;return b},a.addEvent(a.Chart,"getAxes",function(){this.pane||(this.pane=[]);a.splat(this.options.pane).forEach(function(b){new a.Pane(b,this);},this);}),a.addEvent(a.Chart,"afterDrawChartBox",function(){this.pane.forEach(function(a){a.render();});}),h(a.Chart.prototype,"get",
function(b,d){return a.find(this.pane,function(a){return a.options.id===d})||b.call(this,d)}));})(z);});

});

var treemap = createCommonjsModule(function (module) {
/*
 Highcharts JS v7.0.3 (2019-02-06)

 (c) 2014-2019 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(m){"object"==='object'&&module.exports?(m["default"]=m,module.exports=m):"function"===typeof undefined&&undefined.amd?undefined(function(){return m}):m("undefined"!==typeof Highcharts?Highcharts:void 0);})(function(m){var F=function(c){var w=c.extend,m=c.isArray,l=c.isObject,C=c.isNumber,r=c.merge,A=c.pick;return {getColor:function(p,e){var u=e.index,g=e.mapOptionsToLevel,l=e.parentColor,y=e.parentColorIndex,B=e.series,v=e.colors,m=e.siblings,h=B.points,q=B.chart.options.chart,z,w,x,r;if(p){h=
h[p.i];p=g[p.level]||{};if(g=h&&p.colorByPoint)w=h.index%(v?v.length:q.colorCount),z=v&&v[w];if(!B.chart.styledMode){v=h&&h.options.color;q=p&&p.color;if(x=l)x=(x=p&&p.colorVariation)&&"brightness"===x.key?c.color(l).brighten(u/m*x.to).get():l;x=A(v,q,z,x,B.color);}r=A(h&&h.options.colorIndex,p&&p.colorIndex,w,y,e.colorIndex);}return {color:x,colorIndex:r}},getLevelOptions:function(c){var e=null,u,g,p,y;if(l(c))for(e={},p=C(c.from)?c.from:1,y=c.levels,g={},u=l(c.defaults)?c.defaults:{},m(y)&&(g=y.reduce(function(c,
e){var g,h;l(e)&&C(e.level)&&(h=r({},e),g="boolean"===typeof h.levelIsConstant?h.levelIsConstant:u.levelIsConstant,delete h.levelIsConstant,delete h.level,e=e.level+(g?0:p-1),l(c[e])?w(c[e],h):c[e]=h);return c},{})),y=C(c.to)?c.to:1,c=0;c<=y;c++)e[c]=r({},u,l(g[c])?g[c]:{});return e},setTreeValues:function e(c,g){var l=g.before,u=g.idRoot,m=g.mapIdToNode[u],v=g.points[c.i],r=v&&v.options||{},h=0,q=[];w(c,{levelDynamic:c.level-(("boolean"===typeof g.levelIsConstant?g.levelIsConstant:1)?0:m.level),
name:A(v&&v.name,""),visible:u===c.id||("boolean"===typeof g.visible?g.visible:!1)});"function"===typeof l&&(c=l(c,g));c.children.forEach(function(l,u){var m=w({},g);w(m,{index:u,siblings:c.children.length,visible:c.visible});l=e(l,m);q.push(l);l.visible&&(h+=l.val);});c.visible=0<h||c.visible;l=A(r.value,h);w(c,{children:q,childrenTotal:h,isLeaf:c.visible&&!h,val:l});return c},updateRootId:function(c){var e;l(c)&&(e=l(c.options)?c.options:{},e=A(c.rootNode,e.rootId,""),l(c.userOptions)&&(c.userOptions.rootId=
e),c.rootNode=e);return e}}}(m);(function(c,m){var w=c.seriesType,l=c.seriesTypes,C=c.addEvent,r=c.merge,A=c.extend,p=c.error,e=c.defined,u=c.noop,g=c.fireEvent,F=m.getColor,y=m.getLevelOptions,B=c.isArray,v=c.isNumber,H=c.isObject,h=c.isString,q=c.pick,z=c.Series,I=c.stableSort,x=c.Color,J=function(a,b,d){d=d||this;c.objectEach(a,function(n,f){b.call(d,n,f,a);});},E=function(a,b,d){d=d||this;a=b.call(d,a);!1!==a&&E(a,b,d);},K=m.updateRootId;w("treemap","scatter",{allowTraversingTree:!1,showInLegend:!1,
marker:!1,colorByPoint:!1,dataLabels:{enabled:!0,defer:!1,verticalAlign:"middle",formatter:function(){var a=this&&this.point?this.point:{};return h(a.name)?a.name:""},inside:!0},tooltip:{headerFormat:"",pointFormat:"\x3cb\x3e{point.name}\x3c/b\x3e: {point.value}\x3cbr/\x3e"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},traverseUpButton:{position:{align:"right",
x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,opacity:.15,states:{hover:{borderColor:"#999999",brightness:l.heatmap?0:.1,halo:!1,opacity:.75,shadow:!1}}},{pointArrayMap:["value"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:u,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,b){a=B(a)?a:[];var d=B(b)?b:[];b=a.reduce(function(a,b,d){b=q(b.parent,"");void 0===a[b]&&(a[b]=[]);a[b].push(d);return a},{"":[]});
J(b,function(a,b,c){""!==b&&-1===d.indexOf(b)&&(a.forEach(function(a){c[""].push(a);}),delete c[b]);});return b},getTree:function(){var a=this.data.map(function(a){return a.id}),a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},init:function(a,b){var d=c.colorSeriesMixin;c.colorSeriesMixin&&(this.translateColors=d.translateColors,this.colorAttribs=d.colorAttribs,this.axisTypes=d.axisTypes);C(this,"setOptions",function(a){a=a.userOptions;e(a.allowDrillToNode)&&
!e(a.allowTraversingTree)&&(a.allowTraversingTree=a.allowDrillToNode,delete a.allowDrillToNode);e(a.drillUpButton)&&!e(a.traverseUpButton)&&(a.traverseUpButton=a.drillUpButton,delete a.drillUpButton);});z.prototype.init.call(this,a,b);this.options.allowTraversingTree&&C(this,"click",this.onClickDrillToNode);},buildNode:function(a,b,d,c,f){var n=this,t=[],k=n.points[b],G=0,e;(c[a]||[]).forEach(function(b){e=n.buildNode(n.points[b].id,b,d+1,c,a);G=Math.max(e.height+1,G);t.push(e);});b={id:a,i:b,children:t,
height:G,level:d,parent:f,visible:!1};n.nodeMap[b.id]=b;k&&(k.node=b);return b},setTreeValues:function(a){var b=this,d=b.options,c=b.nodeMap[b.rootNode],d="boolean"===typeof d.levelIsConstant?d.levelIsConstant:!0,f=0,D=[],t,k=b.points[a.i];a.children.forEach(function(a){a=b.setTreeValues(a);D.push(a);a.ignore||(f+=a.val);});I(D,function(a,b){return a.sortIndex-b.sortIndex});t=q(k&&k.options.value,f);k&&(k.value=t);A(a,{children:D,childrenTotal:f,ignore:!(q(k&&k.visible,!0)&&0<t),isLeaf:a.visible&&
!f,levelDynamic:a.level-(d?0:c.level),name:q(k&&k.name,""),sortIndex:q(k&&k.sortIndex,-t),val:t});return a},calculateChildrenAreas:function(a,b){var d=this,c=d.options,f=d.mapOptionsToLevel[a.level+1],D=q(d[f&&f.layoutAlgorithm]&&f.layoutAlgorithm,c.layoutAlgorithm),t=c.alternateStartingDirection,k=[];a=a.children.filter(function(a){return !a.ignore});f&&f.layoutStartingDirection&&(b.direction="vertical"===f.layoutStartingDirection?0:1);k=d[D](b,a);a.forEach(function(a,c){c=k[c];a.values=r(c,{val:a.childrenTotal,
direction:t?1-b.direction:b.direction});a.pointValues=r(c,{x:c.x/d.axisRatio,width:c.width/d.axisRatio});a.children.length&&d.calculateChildrenAreas(a,a.values);});},setPointValues:function(){var a=this,b=a.xAxis,d=a.yAxis;a.points.forEach(function(c){var f=c.node,n=f.pointValues,t,k,e=0;a.chart.styledMode||(e=(a.pointAttribs(c)["stroke-width"]||0)%2/2);n&&f.visible?(f=Math.round(b.translate(n.x,0,0,0,1))-e,t=Math.round(b.translate(n.x+n.width,0,0,0,1))-e,k=Math.round(d.translate(n.y,0,0,0,1))-e,n=
Math.round(d.translate(n.y+n.height,0,0,0,1))-e,c.shapeType="rect",c.shapeArgs={x:Math.min(f,t),y:Math.min(k,n),width:Math.abs(t-f),height:Math.abs(n-k)},c.plotX=c.shapeArgs.x+c.shapeArgs.width/2,c.plotY=c.shapeArgs.y+c.shapeArgs.height/2):(delete c.plotX,delete c.plotY);});},setColorRecursive:function(a,b,d,c,f){var n=this,e=n&&n.chart,e=e&&e.options&&e.options.colors,k;if(a){k=F(a,{colors:e,index:c,mapOptionsToLevel:n.mapOptionsToLevel,parentColor:b,parentColorIndex:d,series:n,siblings:f});if(b=n.points[a.i])b.color=
k.color,b.colorIndex=k.colorIndex;(a.children||[]).forEach(function(b,d){n.setColorRecursive(b,k.color,k.colorIndex,d,a.children.length);});}},algorithmGroup:function(a,b,d,c){this.height=a;this.width=b;this.plot=c;this.startDirection=this.direction=d;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,b){return Math.max(a/b,b/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===
this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a);};this.reset=function(){this.lW=this.nW=
0;this.elArr=[];this.total=0;};},algorithmCalcPoints:function(a,b,d,n){var f,e,t,k,l=d.lW,h=d.lH,g=d.plot,m,q=0,p=d.elArr.length-1;b?(l=d.nW,h=d.nH):m=d.elArr[d.elArr.length-1];d.elArr.forEach(function(a){if(b||q<p)0===d.direction?(f=g.x,e=g.y,t=l,k=a/t):(f=g.x,e=g.y,k=h,t=a/k),n.push({x:f,y:e,width:t,height:c.correctFloat(k)}),0===d.direction?g.y+=k:g.x+=t;q+=1;});d.reset();0===d.direction?d.width-=l:d.height-=h;g.y=g.parent.y+(g.parent.height-d.height);g.x=g.parent.x+(g.parent.width-d.width);a&&(d.direction=
1-d.direction);b||d.addElement(m);},algorithmLowAspectRatio:function(a,b,d){var c=[],f=this,e,g={x:b.x,y:b.y,parent:b},k=0,l=d.length-1,h=new this.algorithmGroup(b.height,b.width,b.direction,g);d.forEach(function(d){e=d.val/b.val*b.height*b.width;h.addElement(e);h.lP.nR>h.lP.lR&&f.algorithmCalcPoints(a,!1,h,c,g);k===l&&f.algorithmCalcPoints(a,!0,h,c,g);k+=1;});return c},algorithmFill:function(a,b,d){var c=[],f,e=b.direction,g=b.x,k=b.y,h=b.width,l=b.height,m,q,p,r;d.forEach(function(d){f=d.val/b.val*
b.height*b.width;m=g;q=k;0===e?(r=l,p=f/r,h-=p,g+=p):(p=h,r=f/p,l-=r,k+=r);c.push({x:m,y:q,width:p,height:r});a&&(e=1-e);});return c},strip:function(a,b){return this.algorithmLowAspectRatio(!1,a,b)},squarified:function(a,b){return this.algorithmLowAspectRatio(!0,a,b)},sliceAndDice:function(a,b){return this.algorithmFill(!0,a,b)},stripes:function(a,b){return this.algorithmFill(!1,a,b)},translate:function(){var a=this,b=a.options,d=K(a),c,f;z.prototype.translate.call(a);f=a.tree=a.getTree();c=a.nodeMap[d];
a.renderTraverseUpButton(d);a.mapOptionsToLevel=y({from:c.level+1,levels:b.levels,to:f.height,defaults:{levelIsConstant:a.options.levelIsConstant,colorByPoint:b.colorByPoint}});""===d||c&&c.children.length||(a.setRootNode("",!1),d=a.rootNode,c=a.nodeMap[d]);E(a.nodeMap[a.rootNode],function(b){var c=!1,d=b.parent;b.visible=!0;if(d||""===d)c=a.nodeMap[d];return c});E(a.nodeMap[a.rootNode].children,function(a){var b=!1;a.forEach(function(a){a.visible=!0;a.children.length&&(b=(b||[]).concat(a.children));});
return b});a.setTreeValues(f);a.axisRatio=a.xAxis.len/a.yAxis.len;a.nodeMap[""].pointValues=d={x:0,y:0,width:100,height:100};a.nodeMap[""].values=d=r(d,{width:d.width*a.axisRatio,direction:"vertical"===b.layoutStartingDirection?0:1,val:f.val});a.calculateChildrenAreas(f,d);a.colorAxis?a.translateColors():b.colorByPoint||a.setColorRecursive(a.tree);b.allowTraversingTree&&(b=c.pointValues,a.xAxis.setExtremes(b.x,b.x+b.width,!1),a.yAxis.setExtremes(b.y,b.y+b.height,!1),a.xAxis.setScale(),a.yAxis.setScale());
a.setPointValues();},drawDataLabels:function(){var a=this,b=a.mapOptionsToLevel,d,c;a.points.filter(function(a){return a.node.visible}).forEach(function(f){c=b[f.node.level];d={style:{}};f.node.isLeaf||(d.enabled=!1);c&&c.dataLabels&&(d=r(d,c.dataLabels),a._hasPointLabels=!0);f.shapeArgs&&(d.style.width=f.shapeArgs.width,f.dataLabel&&f.dataLabel.css({width:f.shapeArgs.width+"px"}));f.dlOptions=r(d,f.options.dataLabels);});z.prototype.drawDataLabels.call(this);},alignDataLabel:function(a,b,d){var e=d.style;
!c.defined(e.textOverflow)&&b.text&&b.getBBox().width>b.text.textWidth&&b.css({textOverflow:"ellipsis",width:e.width+="px"});l.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||0)+1});},pointAttribs:function(a,b){var c=H(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},e=a&&c[a.node.level]||{},c=this.options,f=b&&c.states[b]||{},g=a&&a.getClassName()||"";a={stroke:a&&a.borderColor||e.borderColor||f.borderColor||c.borderColor,"stroke-width":q(a&&
a.borderWidth,e.borderWidth,f.borderWidth,c.borderWidth),dashstyle:a&&a.borderDashStyle||e.borderDashStyle||f.borderDashStyle||c.borderDashStyle,fill:a&&a.color||this.color};-1!==g.indexOf("highcharts-above-level")?(a.fill="none",a["stroke-width"]=0):-1!==g.indexOf("highcharts-internal-node-interactive")?(b=q(f.opacity,c.opacity),a.fill=x(a.fill).setOpacity(b).get(),a.cursor="pointer"):-1!==g.indexOf("highcharts-internal-node")?a.fill="none":b&&(a.fill=x(a.fill).brighten(f.brightness).get());return a},
drawPoints:function(){var a=this,b=a.points.filter(function(a){return a.node.visible});b.forEach(function(b){var c="level-group-"+b.node.levelDynamic;a[c]||(a[c]=a.chart.renderer.g(c).attr({zIndex:1E3-b.node.levelDynamic}).add(a.group));b.group=a[c];});l.column.prototype.drawPoints.call(this);this.colorAttribs&&a.chart.styledMode&&this.points.forEach(function(a){a.graphic&&a.graphic.css(this.colorAttribs(a));},this);a.options.allowTraversingTree&&b.forEach(function(b){b.graphic&&(b.drillId=a.options.interactByLeaf?
a.drillToByLeaf(b):a.drillToByGroup(b));});},onClickDrillToNode:function(a){var b=(a=a.point)&&a.drillId;h(b)&&(a.setState(""),this.setRootNode(b,!0,{trigger:"click"}));},drillToByGroup:function(a){var b=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(b=a.id);return b},drillToByLeaf:function(a){var b=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!b;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(b=a.id);return b},drillUp:function(){var a=this.nodeMap[this.rootNode];
a&&h(a.parent)&&this.setRootNode(a.parent,!0,{trigger:"traverseUpButton"});},drillToNode:function(a,b){p("WARNING: treemap.drillToNode has been renamed to treemap.setRootNode, and will be removed in the next major version.");this.setRootNode(a,b);},setRootNode:function(a,b,c){a=A({newRootId:a,previousRootId:this.rootNode,redraw:q(b,!0),series:this},c);g(this,"setRootNode",a,function(a){var b=a.series;b.idPreviousRoot=a.previousRootId;b.rootNode=a.newRootId;b.isDirty=!0;a.redraw&&b.chart.redraw();});},
renderTraverseUpButton:function(a){var b=this,c=b.options.traverseUpButton,e=q(c.text,b.nodeMap[a].name,"\x3c Back"),f;""===a?b.drillUpButton&&(b.drillUpButton=b.drillUpButton.destroy()):this.drillUpButton?(this.drillUpButton.placed=!1,this.drillUpButton.attr({text:e}).align()):(f=(a=c.theme)&&a.states,this.drillUpButton=this.chart.renderer.button(e,null,null,function(){b.drillUp();},a,f&&f.hover,f&&f.select).addClass("highcharts-drillup-button").attr({align:c.position.align,zIndex:7}).add().align(c.position,
!1,c.relativeTo||"plotBox"));},buildKDTree:u,drawLegendSymbol:c.LegendSymbolMixin.drawRectangle,getExtremes:function(){z.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;z.prototype.getExtremes.call(this);},getExtremesFromAll:!0,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};z.prototype.bindAxes.call(this);c.extend(this.yAxis.options,
a);c.extend(this.xAxis.options,a);},utils:{recursive:E}},{getClassName:function(){var a=c.Point.prototype.getClassName.call(this),b=this.series,d=b.options;this.node.level<=b.nodeMap[b.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||q(d.interactByLeaf,!d.allowTraversingTree)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return this.id||v(this.value)},setState:function(a){c.Point.prototype.setState.call(this,
a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0});},setVisible:l.pie.prototype.pointClass.prototype.setVisible});})(m,F);});

});

var heatmap = createCommonjsModule(function (module) {
/*
 Highcharts JS v7.0.3 (2019-02-06)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(h){"object"==='object'&&module.exports?(h["default"]=h,module.exports=h):"function"===typeof undefined&&undefined.amd?undefined(function(){return h}):h("undefined"!==typeof Highcharts?Highcharts:void 0);})(function(h){(function(b){var h=b.addEvent,k=b.Axis,q=b.Chart,l=b.color,n,r=b.extend,p=b.isNumber,e=b.Legend,c=b.LegendSymbolMixin,v=b.noop,u=b.merge,t=b.pick;b.ColorAxis||(n=b.ColorAxis=function(){this.init.apply(this,arguments);},r(n.prototype,k.prototype),r(n.prototype,{defaultColorAxisOptions:{lineWidth:0,
minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(k.prototype.keepProps),init:function(a,d){var f="vertical"!==a.options.legend.layout,g;this.coll="colorAxis";g=u(this.defaultColorAxisOptions,
{side:f?2:1,reversed:!f},d,{opposite:!f,showEmpty:!1,title:null,visible:a.options.legend.enabled});k.prototype.init.call(this,a,g);d.dataClasses&&this.initDataClasses(d);this.initStops();this.horiz=f;this.zoomEnabled=!1;this.defaultLegendLength=200;},initDataClasses:function(a){var d=this.chart,f,g=0,m=d.options.chart.colorCount,b=this.options,e=a.dataClasses.length;this.dataClasses=f=[];this.legendItems=[];a.dataClasses.forEach(function(a,c){a=u(a);f.push(a);if(d.styledMode||!a.color)"category"===
b.dataClassColor?(d.styledMode||(c=d.options.colors,m=c.length,a.color=c[g]),a.colorIndex=g,g++,g===m&&(g=0)):a.color=l(b.minColor).tweenTo(l(b.maxColor),2>e?.5:c/(e-1));});},setTickPositions:function(){if(!this.dataClasses)return k.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(a){a.color=l(a[1]);});},setOptions:function(a){k.prototype.setOptions.call(this,a);this.options.crosshair=
this.options.marker;},setAxisSize:function(){var a=this.legendSymbol,d=this.chart,f=d.options.legend||{},g,m;a?(this.left=f=a.attr("x"),this.top=g=a.attr("y"),this.width=m=a.attr("width"),this.height=a=a.attr("height"),this.right=d.chartWidth-f-m,this.bottom=d.chartHeight-g-a,this.len=this.horiz?m:a,this.pos=this.horiz?f:g):this.len=(this.horiz?f.symbolWidth:f.symbolHeight)||this.defaultLegendLength;},normalizedValue:function(a){this.isLog&&(a=this.val2lin(a));return 1-(this.max-a)/(this.max-this.min||
1)},toColor:function(a,d){var f=this.stops,g,m,b=this.dataClasses,c,e;if(b)for(e=b.length;e--;){if(c=b[e],g=c.from,f=c.to,(void 0===g||a>=g)&&(void 0===f||a<=f)){m=c.color;d&&(d.dataClass=e,d.colorIndex=c.colorIndex);break}}else{a=this.normalizedValue(a);for(e=f.length;e--&&!(a>f[e][0]););g=f[e]||f[e+1];f=f[e+1]||g;a=1-(f[0]-a)/(f[0]-g[0]||1);m=g.color.tweenTo(f.color,a);}return m},getOffset:function(){var a=this.legendGroup,d=this.chart.axisOffset[this.side];a&&(this.axisParent=a,k.prototype.getOffset.call(this),
this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=d);},setLegendColor:function(){var a,d=this.reversed;a=d?1:0;d=d?0:1;a=this.horiz?[a,0,d,0]:[0,d,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],y2:a[3]},stops:this.stops};},drawLegendSymbol:function(a,d){var f=a.padding,g=a.options,e=this.horiz,c=t(g.symbolWidth,e?this.defaultLegendLength:12),b=t(g.symbolHeight,e?12:this.defaultLegendLength),l=t(g.labelPadding,e?16:30),g=t(g.itemDistance,
10);this.setLegendColor();d.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,c,b).attr({zIndex:1}).add(d.legendGroup);this.legendItemWidth=c+f+(e?g:l);this.legendItemHeight=b+f+(e?l:0);},setState:function(a){this.series.forEach(function(d){d.setState(a);});},visible:!0,setVisible:v,getSeriesExtremes:function(){var a=this.series,d=a.length;this.dataMin=Infinity;for(this.dataMax=-Infinity;d--;)a[d].getExtremes(),void 0!==a[d].valueMin&&(this.dataMin=Math.min(this.dataMin,a[d].valueMin),this.dataMax=
Math.max(this.dataMax,a[d].valueMax));},drawCrosshair:function(a,d){var f=d&&d.plotX,e=d&&d.plotY,c,b=this.pos,l=this.len;d&&(c=this.toPixels(d[d.series.colorKey]),c<b?c=b-2:c>b+l&&(c=b+l+2),d.plotX=c,d.plotY=this.len-c,k.prototype.drawCrosshair.call(this,a,d),d.plotX=f,d.plotY=e,this.cross&&!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.chart.styledMode||this.cross.attr({fill:this.crosshair.color})));},
getPlotLinePath:function(a,d,f,e,c){return p(c)?this.horiz?["M",c-4,this.top-6,"L",c+4,this.top-6,c,this.top,"Z"]:["M",this.left,c,"L",this.left-6,c+6,this.left-6,c-6,"Z"]:k.prototype.getPlotLinePath.call(this,a,d,f,e)},update:function(a,d){var c=this.chart,e=c.legend;this.series.forEach(function(a){a.isDirtyData=!0;});a.dataClasses&&e.allItems&&(e.allItems.forEach(function(a){a.isDataClass&&a.legendGroup&&a.legendGroup.destroy();}),c.isDirtyLegend=!0);c.options[this.coll]=u(this.userOptions,a);k.prototype.update.call(this,
a,d);this.legendItem&&(this.setLegendColor(),e.colorizeItem(this,!0));},remove:function(){this.legendItem&&this.chart.legend.destroyItem(this);k.prototype.remove.call(this);},getDataClassLegendSymbols:function(){var a=this,d=this.chart,e=this.legendItems,g=d.options.legend,l=g.valueDecimals,n=g.valueSuffix||"",h;e.length||this.dataClasses.forEach(function(f,g){var k=!0,m=f.from,p=f.to;h="";void 0===m?h="\x3c ":void 0===p&&(h="\x3e ");void 0!==m&&(h+=b.numberFormat(m,l)+n);void 0!==m&&void 0!==p&&(h+=
" - ");void 0!==p&&(h+=b.numberFormat(p,l)+n);e.push(r({chart:d,name:h,options:{},drawLegendSymbol:c.drawRectangle,visible:!0,setState:v,isDataClass:!0,setVisible:function(){k=this.visible=!k;a.series.forEach(function(a){a.points.forEach(function(a){a.dataClass===g&&a.setVisible(k);});});d.legend.colorizeItem(this,k);}},f));});return e},name:""}),["fill","stroke"].forEach(function(a){b.Fx.prototype[a+"Setter"]=function(){this.elem.attr(a,l(this.start).tweenTo(l(this.end),this.pos),null,!0);};}),h(q,"afterGetAxes",
function(){var a=this.options.colorAxis;this.colorAxis=[];a&&new n(this,a);}),h(e,"afterGetAllItems",function(a){var d=[],c=this.chart.colorAxis[0];c&&c.options&&c.options.showInLegend&&(c.options.dataClasses?d=c.getDataClassLegendSymbols():d.push(c),c.series.forEach(function(c){b.erase(a.allItems,c);}));for(c=d.length;c--;)a.allItems.unshift(d[c]);}),h(e,"afterColorizeItem",function(a){a.visible&&a.item.legendColor&&a.item.legendSymbol.attr({fill:a.item.legendColor});}),h(e,"afterUpdate",function(a,
c,e){this.chart.colorAxis[0]&&this.chart.colorAxis[0].update({},e);}));})(h);(function(b){var h=b.defined,k=b.noop,q=b.seriesTypes;b.colorPointMixin={isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setVisible:function(b){var l=this,h=b?"show":"hide";l.visible=!!b;["graphic","dataLabel"].forEach(function(b){if(l[b])l[b][h]();});},setState:function(l){b.Point.prototype.setState.call(this,l);this.graphic&&this.graphic.attr({zIndex:"hover"===l?1:0});}};b.colorSeriesMixin=
{pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:k,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:q.column.prototype.pointAttribs,translateColors:function(){var b=this,h=this.options.nullColor,k=this.colorAxis,p=this.colorKey;this.data.forEach(function(e){var c=e[p];if(c=e.options.color||(e.isNull?h:k&&void 0!==c?k.toColor(c,e):e.color||b.color))e.color=c;});},colorAttribs:function(b){var l=
{};h(b.color)&&(l[this.colorProp||"fill"]=b.color);return l}};})(h);(function(b){var h=b.colorPointMixin,k=b.merge,q=b.noop,l=b.pick,n=b.Series,r=b.seriesType,p=b.seriesTypes;r("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},states:{hover:{halo:!1,brightness:.2}}},
k(b.colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){var e;p.scatter.prototype.init.apply(this,arguments);e=this.options;e.pointRange=l(e.pointRange,e.colsize||1);this.yAxis.axisPointRange=e.rowsize||1;},translate:function(){var e=this.options,c=this.xAxis,b=this.yAxis,h=e.pointPadding||0,k=function(a,c,b){return Math.min(Math.max(c,a),b)},a=this.pointPlacementToXValue();this.generatePoints();this.points.forEach(function(d){var f=
(e.colsize||1)/2,g=(e.rowsize||1)/2,m=k(Math.round(c.len-c.translate(d.x-f,0,1,0,1,-a)),-c.len,2*c.len),f=k(Math.round(c.len-c.translate(d.x+f,0,1,0,1,-a)),-c.len,2*c.len),p=k(Math.round(b.translate(d.y-g,0,1,0,1)),-b.len,2*b.len),g=k(Math.round(b.translate(d.y+g,0,1,0,1)),-b.len,2*b.len),n=l(d.pointPadding,h);d.plotX=d.clientX=(m+f)/2;d.plotY=(p+g)/2;d.shapeType="rect";d.shapeArgs={x:Math.min(m,f)+n,y:Math.min(p,g)+n,width:Math.abs(f-m)-2*n,height:Math.abs(g-p)-2*n};});this.translateColors();},drawPoints:function(){var b=
this.chart.styledMode?"css":"attr";p.column.prototype.drawPoints.call(this);this.points.forEach(function(c){c.graphic[b](this.colorAttribs(c));},this);},getValidPoints:function(b,c){return n.prototype.getValidPoints.call(this,b,c,!0)},animate:q,getBox:q,drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,alignDataLabel:p.column.prototype.alignDataLabel,getExtremes:function(){n.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;n.prototype.getExtremes.call(this);}}),
b.extend({haloPath:function(b){if(!b)return [];var c=this.shapeArgs;return ["M",c.x-b,c.y-b,"L",c.x-b,c.y+c.height+b,c.x+c.width+b,c.y+c.height+b,c.x+c.width+b,c.y-b,"Z"]}},h));})(h);});

});

var drilldown = createCommonjsModule(function (module) {
/*
 Highcharts JS v7.0.3 (2019-02-06)
 Highcharts Drilldown module

 Author: Torstein Honsi
 License: www.highcharts.com/license

*/
(function(l){"object"==='object'&&module.exports?(l["default"]=l,module.exports=l):"function"===typeof undefined&&undefined.amd?undefined(function(){return l}):l("undefined"!==typeof Highcharts?Highcharts:void 0);})(function(l){(function(e){var l=e.animObject,w=e.noop,x=e.color,y=e.defaultOptions,r=e.extend,D=e.format,z=e.objectEach,t=e.pick,n=e.Chart,p=e.seriesTypes,A=p.pie,p=p.column,B=e.Tick,u=e.fireEvent,C=1;r(y.lang,{drillUpText:"\u25c1 Back to {series.name}"});y.drilldown={activeAxisLabelStyle:{cursor:"pointer",
color:"#003399",fontWeight:"bold",textDecoration:"underline"},activeDataLabelStyle:{cursor:"pointer",color:"#003399",fontWeight:"bold",textDecoration:"underline"},animation:{duration:500},drillUpButton:{position:{align:"right",x:-10,y:10}}};e.SVGRenderer.prototype.Element.prototype.fadeIn=function(a){this.attr({opacity:.1,visibility:"inherit"}).animate({opacity:t(this.newOpacity,1)},a||{duration:250});};n.prototype.addSeriesAsDrilldown=function(a,b){this.addSingleSeriesAsDrilldown(a,b);this.applyDrilldown();};
n.prototype.addSingleSeriesAsDrilldown=function(a,b){var c=a.series,d=c.xAxis,f=c.yAxis,h,g=[],m=[],k,q,l;l=this.styledMode?{colorIndex:t(a.colorIndex,c.colorIndex)}:{color:a.color||c.color};this.drilldownLevels||(this.drilldownLevels=[]);k=c.options._levelNumber||0;(q=this.drilldownLevels[this.drilldownLevels.length-1])&&q.levelNumber!==k&&(q=void 0);b=r(r({_ddSeriesId:C++},l),b);h=c.points.indexOf(a);c.chart.series.forEach(function(a){a.xAxis!==d||a.isDrilling||(a.options._ddSeriesId=a.options._ddSeriesId||
C++,a.options._colorIndex=a.userOptions._colorIndex,a.options._levelNumber=a.options._levelNumber||k,q?(g=q.levelSeries,m=q.levelSeriesOptions):(g.push(a),m.push(a.options)));});a=r({levelNumber:k,seriesOptions:c.options,levelSeriesOptions:m,levelSeries:g,shapeArgs:a.shapeArgs,bBox:a.graphic?a.graphic.getBBox():{},color:a.isNull?(new e.Color(x)).setOpacity(0).get():x,lowerSeriesOptions:b,pointOptions:c.options.data[h],pointIndex:h,oldExtremes:{xMin:d&&d.userMin,xMax:d&&d.userMax,yMin:f&&f.userMin,
yMax:f&&f.userMax},resetZoomButton:this.resetZoomButton},l);this.drilldownLevels.push(a);d&&d.names&&(d.names.length=0);b=a.lowerSeries=this.addSeries(b,!1);b.options._levelNumber=k+1;d&&(d.oldPos=d.pos,d.userMin=d.userMax=null,f.userMin=f.userMax=null);c.type===b.type&&(b.animate=b.animateDrilldown||w,b.options.animation=!0);};n.prototype.applyDrilldown=function(){var a=this.drilldownLevels,b;a&&0<a.length&&(b=a[a.length-1].levelNumber,this.drilldownLevels.forEach(function(a){a.levelNumber===b&&a.levelSeries.forEach(function(a){a.options&&
a.options._levelNumber===b&&a.remove(!1);});}));this.resetZoomButton&&(this.resetZoomButton.hide(),delete this.resetZoomButton);this.pointer.reset();this.redraw();this.showDrillUpButton();};n.prototype.getDrilldownBackText=function(){var a=this.drilldownLevels;if(a&&0<a.length)return a=a[a.length-1],a.series=a.seriesOptions,D(this.options.lang.drillUpText,a)};n.prototype.showDrillUpButton=function(){var a=this,b=this.getDrilldownBackText(),c=a.options.drilldown.drillUpButton,d,f;this.drillUpButton?this.drillUpButton.attr({text:b}).align():
(f=(d=c.theme)&&d.states,this.drillUpButton=this.renderer.button(b,null,null,function(){a.drillUp();},d,f&&f.hover,f&&f.select).addClass("highcharts-drillup-button").attr({align:c.position.align,zIndex:7}).add().align(c.position,!1,c.relativeTo||"plotBox"));};n.prototype.drillUp=function(){if(this.drilldownLevels&&0!==this.drilldownLevels.length){for(var a=this,b=a.drilldownLevels,c=b[b.length-1].levelNumber,d=b.length,f=a.series,h,g,e,k,q=function(b){var c;f.forEach(function(a){a.options._ddSeriesId===
b._ddSeriesId&&(c=a);});c=c||a.addSeries(b,!1);c.type===e.type&&c.animateDrillupTo&&(c.animate=c.animateDrillupTo);b===g.seriesOptions&&(k=c);};d--;)if(g=b[d],g.levelNumber===c){b.pop();e=g.lowerSeries;if(!e.chart)for(h=f.length;h--;)if(f[h].options.id===g.lowerSeriesOptions.id&&f[h].options._levelNumber===c+1){e=f[h];break}e.xData=[];g.levelSeriesOptions.forEach(q);u(a,"drillup",{seriesOptions:g.seriesOptions});k.type===e.type&&(k.drilldownLevel=g,k.options.animation=a.options.drilldown.animation,
e.animateDrillupFrom&&e.chart&&e.animateDrillupFrom(g));k.options._levelNumber=c;e.remove(!1);k.xAxis&&(h=g.oldExtremes,k.xAxis.setExtremes(h.xMin,h.xMax,!1),k.yAxis.setExtremes(h.yMin,h.yMax,!1));g.resetZoomButton&&(a.resetZoomButton=g.resetZoomButton,a.resetZoomButton.show());}u(a,"drillupall");this.redraw();0===this.drilldownLevels.length?this.drillUpButton=this.drillUpButton.destroy():this.drillUpButton.attr({text:this.getDrilldownBackText()}).align();this.ddDupes.length=[];}};n.prototype.callbacks.push(function(){var a=
this;a.drilldown={update:function(b,c){e.merge(!0,a.options.drilldown,b);t(c,!0)&&a.redraw();}};});e.addEvent(n,"beforeShowResetZoom",function(){if(this.drillUpButton)return !1});e.addEvent(n,"render",function(){(this.xAxis||[]).forEach(function(a){a.ddPoints={};a.series.forEach(function(b){var c,d=b.xData||[],f=b.points,h;for(c=0;c<d.length;c++)h=b.options.data[c],"number"!==typeof h&&(h=b.pointClass.prototype.optionsToObject.call({series:b},h),h.drilldown&&(a.ddPoints[d[c]]||(a.ddPoints[d[c]]=[]),
a.ddPoints[d[c]].push(f?f[c]:!0)));});z(a.ticks,B.prototype.drillable);});});p.prototype.animateDrillupTo=function(a){if(!a){var b=this,c=b.drilldownLevel;this.points.forEach(function(a){var b=a.dataLabel;a.graphic&&a.graphic.hide();b&&(b.hidden="hidden"===b.attr("visibility"),b.hidden||(b.hide(),a.connector&&a.connector.hide()));});e.syncTimeout(function(){b.points&&b.points.forEach(function(a,b){b=b===(c&&c.pointIndex)?"show":"fadeIn";var d="show"===b?!0:void 0,f=a.dataLabel;if(a.graphic)a.graphic[b](d);
f&&!f.hidden&&(f.fadeIn(),a.connector&&a.connector.fadeIn());});},Math.max(this.chart.options.drilldown.animation.duration-50,0));this.animate=w;}};p.prototype.animateDrilldown=function(a){var b=this,c=this.chart,d=c.drilldownLevels,f,e=l(c.options.drilldown.animation),g=this.xAxis,m=c.styledMode;a||(d.forEach(function(a){b.options._ddSeriesId===a.lowerSeriesOptions._ddSeriesId&&(f=a.shapeArgs,m||(f.fill=a.color));}),f.x+=t(g.oldPos,g.pos)-g.pos,this.points.forEach(function(a){var c=a.shapeArgs;m||(c.fill=
a.color);a.graphic&&a.graphic.attr(f).animate(r(a.shapeArgs,{fill:a.color||b.color}),e);a.dataLabel&&a.dataLabel.fadeIn(e);}),this.animate=null);};p.prototype.animateDrillupFrom=function(a){var b=l(this.chart.options.drilldown.animation),c=this.group,d=c!==this.chart.columnGroup,f=this;f.trackerGroups.forEach(function(a){if(f[a])f[a].on("mouseover");});d&&delete this.group;this.points.forEach(function(h){var g=h.graphic,m=a.shapeArgs,k=function(){g.destroy();c&&d&&(c=c.destroy());};g&&(delete h.graphic,
f.chart.styledMode||(m.fill=a.color),b.duration?g.animate(m,e.merge(b,{complete:k})):(g.attr(m),k()));});};A&&r(A.prototype,{animateDrillupTo:p.prototype.animateDrillupTo,animateDrillupFrom:p.prototype.animateDrillupFrom,animateDrilldown:function(a){var b=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],c=this.chart.options.drilldown.animation,d=b.shapeArgs,f=d.start,h=(d.end-f)/this.points.length,g=this.chart.styledMode;a||(this.points.forEach(function(a,k){var m=a.shapeArgs;g||(d.fill=
b.color,m.fill=a.color);if(a.graphic)a.graphic.attr(e.merge(d,{start:f+k*h,end:f+(k+1)*h}))[c?"animate":"attr"](m,c);}),this.animate=null);}});e.Point.prototype.doDrilldown=function(a,b,c){var d=this.series.chart,f=d.options.drilldown,e=(f.series||[]).length,g;d.ddDupes||(d.ddDupes=[]);for(;e--&&!g;)f.series[e].id===this.drilldown&&-1===d.ddDupes.indexOf(this.drilldown)&&(g=f.series[e],d.ddDupes.push(this.drilldown));u(d,"drilldown",{point:this,seriesOptions:g,category:b,originalEvent:c,points:void 0!==
b&&this.series.xAxis.getDDPoints(b).slice(0)},function(b){var c=b.point.series&&b.point.series.chart,d=b.seriesOptions;c&&d&&(a?c.addSingleSeriesAsDrilldown(b.point,d):c.addSeriesAsDrilldown(b.point,d));});};e.Axis.prototype.drilldownCategory=function(a,b){z(this.getDDPoints(a),function(c){c&&c.series&&c.series.visible&&c.doDrilldown&&c.doDrilldown(!0,a,b);});this.chart.applyDrilldown();};e.Axis.prototype.getDDPoints=function(a){return this.ddPoints&&this.ddPoints[a]};B.prototype.drillable=function(){var a=
this.pos,b=this.label,c=this.axis,d="xAxis"===c.coll&&c.getDDPoints,f=d&&c.getDDPoints(a),h=c.chart.styledMode;d&&(b&&f&&f.length?(b.drillable=!0,b.basicStyles||h||(b.basicStyles=e.merge(b.styles)),b.addClass("highcharts-drilldown-axis-label").on("click",function(b){c.drilldownCategory(a,b);}),h||b.css(c.chart.options.drilldown.activeAxisLabelStyle)):b&&b.drillable&&(h||(b.styles={},b.css(b.basicStyles)),b.on("click",null),b.removeClass("highcharts-drilldown-axis-label")));};e.addEvent(e.Point,"afterInit",
function(){var a=this,b=a.series;a.drilldown&&e.addEvent(a,"click",function(c){b.xAxis&&!1===b.chart.options.drilldown.allowPointDrilldown?b.xAxis.drilldownCategory(a.x,c):a.doDrilldown(void 0,void 0,c);});return a});e.addEvent(e.Series,"afterDrawDataLabels",function(){var a=this.chart.options.drilldown.activeDataLabelStyle,b=this.chart.renderer,c=this.chart.styledMode;this.points.forEach(function(d){var f=d.options.dataLabels,e=t(d.dlOptions,f&&f.style,{});d.drilldown&&d.dataLabel&&("contrast"!==
a.color||c||(e.color=b.getContrast(d.color||this.color)),f&&f.color&&(e.color=f.color),d.dataLabel.addClass("highcharts-drilldown-data-label"),c||d.dataLabel.css(a).css(e));},this);});var v=function(a,b,c,d){a[c?"addClass":"removeClass"]("highcharts-drilldown-point");d||a.css({cursor:b});};e.addEvent(e.Series,"afterDrawTracker",function(){var a=this.chart.styledMode;this.points.forEach(function(b){b.drilldown&&b.graphic&&v(b.graphic,"pointer",!0,a);});});e.addEvent(e.Point,"afterSetState",function(){var a=
this.series.chart.styledMode;this.drilldown&&this.series.halo&&"hover"===this.state?v(this.series.halo,"pointer",!0,a):this.series.halo&&v(this.series.halo,"auto",!1,a);});})(l);});

});

var exporting = createCommonjsModule(function (module) {
/*
 Highcharts JS v7.0.3 (2019-02-06)
 Exporting module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(h){"object"==='object'&&module.exports?(h["default"]=h,module.exports=h):"function"===typeof undefined&&undefined.amd?undefined(function(){return h}):h("undefined"!==typeof Highcharts?Highcharts:void 0);})(function(h){var D=function(){return {initUpdate:function(f){f.navigation||(f.navigation={updates:[],update:function(f,p){this.updates.forEach(function(q){q.update.call(q.context,f,p);});}});},addUpdate:function(f,h){h.navigation||this.initUpdate(h);h.navigation.updates.push({update:f,context:h});}}}();
(function(f,h){var p=f.defaultOptions,q=f.doc,B=f.Chart,r=f.addEvent,D=f.removeEvent,E=f.fireEvent,w=f.createElement,F=f.discardElement,y=f.css,n=f.merge,u=f.pick,G=f.objectEach,z=f.extend,K=f.isTouchDevice,A=f.win,I=A.navigator.userAgent,H=f.SVGRenderer,J=f.Renderer.prototype.symbols,L=/Edge\/|Trident\/|MSIE /.test(I),M=/firefox/i.test(I);z(p.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",
contextButtonTitle:"Chart context menu"});p.navigation||(p.navigation={});n(!0,p.navigation,{buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}});n(!0,p.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",color:"#333333",background:"none",fontSize:K?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",
color:"#ffffff"},buttonOptions:{symbolFill:"#666666",symbolStroke:"#666666",symbolStrokeWidth:3,theme:{padding:5}}});p.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",titleKey:"contextButtonTitle",menuItems:"printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")}},menuItemDefinitions:{printChart:{textKey:"printChart",
onclick:function(){this.print();}},separator:{separator:!0},downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChart();}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"});}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"});}},downloadSVG:{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"});}}}};f.post=function(b,a,d){var c=w("form",n({method:"post",action:b,enctype:"multipart/form-data"},
d),{display:"none"},q.body);G(a,function(a,b){w("input",{type:"hidden",name:b,value:a},null,c);});c.submit();F(c);};z(B.prototype,{sanitizeSVG:function(b,a){if(a&&a.exporting&&a.exporting.allowHTML){var d=b.match(/<\/svg>(.*?$)/);d&&d[1]&&(d='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+a.chart.width+'" height\x3d"'+a.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+d[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",b=b.replace("\x3c/svg\x3e",d+"\x3c/svg\x3e"));}b=b.replace(/zIndex="[^"]+"/g,
"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (|NS[0-9]+\:)href=/g," xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad");
this.ieSanitizeSVG&&(b=this.ieSanitizeSVG(b));return b},getChartHTML:function(){this.styledMode&&this.inlineStyles();return this.container.innerHTML},getSVG:function(b){var a,d,c,v,m,k=n(this.options,b);d=w("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},q.body);c=this.renderTo.style.width;m=this.renderTo.style.height;c=k.exporting.sourceWidth||k.chart.width||/px$/.test(c)&&parseInt(c,10)||(k.isGantt?800:600);m=k.exporting.sourceHeight||k.chart.height||
/px$/.test(m)&&parseInt(m,10)||400;z(k.chart,{animation:!1,renderTo:d,forExport:!0,renderer:"SVGRenderer",width:c,height:m});k.exporting.enabled=!1;delete k.data;k.series=[];this.series.forEach(function(a){v=n(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});v.isInternal||k.series.push(v);});this.axes.forEach(function(a){a.userOptions.internalKey||(a.userOptions.internalKey=f.uniqueKey());});a=new f.Chart(k,this.callback);b&&["xAxis","yAxis","series"].forEach(function(c){var d=
{};b[c]&&(d[c]=b[c],a.update(d));});this.axes.forEach(function(b){var c=f.find(a.axes,function(a){return a.options.internalKey===b.userOptions.internalKey}),d=b.getExtremes(),e=d.userMin,d=d.userMax;c&&(void 0!==e&&e!==c.min||void 0!==d&&d!==c.max)&&c.setExtremes(e,d,!0,!1);});c=a.getChartHTML();E(this,"getSVG",{chartCopy:a});c=this.sanitizeSVG(c,k);k=null;a.destroy();F(d);return c},getSVGForExport:function(b,a){var d=this.options.exporting;return this.getSVG(n({chart:{borderRadius:0}},d.chartOptions,
a,{exporting:{sourceWidth:b&&b.sourceWidth||d.sourceWidth,sourceHeight:b&&b.sourceHeight||d.sourceHeight}}))},getFilename:function(){var b=this.userOptions.title&&this.userOptions.title.text,a=this.options.exporting.filename;if(a)return a;"string"===typeof b&&(a=b.toLowerCase().replace(/<\/?[^>]+(>|$)/g,"").replace(/[\s_]+/g,"-").replace(/[^a-z0-9\-]/g,"").replace(/^[\-]+/g,"").replace(/[\-]+/g,"-").substr(0,24).replace(/[\-]+$/g,""));if(!a||5>a.length)a="chart";return a},exportChart:function(b,a){a=
this.getSVGForExport(b,a);b=n(this.options.exporting,b);f.post(b.url,{filename:b.filename||this.getFilename(),type:b.type,width:b.width||0,scale:b.scale,svg:a},b.formAttributes);},print:function(){function b(b){(a.fixedDiv?[a.fixedDiv,a.scrollingContainer]:[a.container]).forEach(function(a){b.appendChild(a);});}var a=this,d=[],c=q.body,f=c.childNodes,m=a.options.exporting.printMaxWidth,k,e;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,0);E(a,"beforePrint");if(e=m&&a.chartWidth>m)k=[a.options.chart.width,
void 0,!1],a.setSize(m,void 0,!1);f.forEach(function(a,b){1===a.nodeType&&(d[b]=a.style.display,a.style.display="none");});b(c);setTimeout(function(){A.focus();A.print();setTimeout(function(){b(a.renderTo);f.forEach(function(a,b){1===a.nodeType&&(a.style.display=d[b]);});a.isPrinting=!1;e&&a.setSize.apply(a,k);E(a,"afterPrint");},1E3);},1);}},contextMenu:function(b,a,d,c,v,m,k){var e=this,x=e.options.navigation,l=e.chartWidth,t=e.chartHeight,h="cache-"+b,g=e[h],C=Math.max(v,m),n;g||(e.exportContextMenu=
e[h]=g=w("div",{className:b},{position:"absolute",zIndex:1E3,padding:C+"px",pointerEvents:"auto"},e.fixedDiv||e.container),n=w("div",{className:"highcharts-menu"},null,g),e.styledMode||y(n,z({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},x.menuStyle)),g.hideMenu=function(){y(g,{display:"none"});k&&k.setState(0);e.openMenu=!1;f.clearTimeout(g.hideTimer);},e.exportEvents.push(r(g,"mouseleave",function(){g.hideTimer=setTimeout(g.hideMenu,500);}),r(g,
"mouseenter",function(){f.clearTimeout(g.hideTimer);}),r(q,"mouseup",function(a){e.pointer.inClass(a.target,b)||g.hideMenu();}),r(g,"click",function(){e.openMenu&&g.hideMenu();})),a.forEach(function(a){"string"===typeof a&&(a=e.options.exporting.menuItemDefinitions[a]);if(f.isObject(a,!0)){var b;a.separator?b=w("hr",null,null,n):(b=w("div",{className:"highcharts-menu-item",onclick:function(b){b&&b.stopPropagation();g.hideMenu();a.onclick&&a.onclick.apply(e,arguments);},innerHTML:a.text||e.options.lang[a.textKey]},
null,n),e.styledMode||(b.onmouseover=function(){y(this,x.menuItemHoverStyle);},b.onmouseout=function(){y(this,x.menuItemStyle);},y(b,z({cursor:"pointer"},x.menuItemStyle))));e.exportDivElements.push(b);}}),e.exportDivElements.push(n,g),e.exportMenuWidth=g.offsetWidth,e.exportMenuHeight=g.offsetHeight);a={display:"block"};d+e.exportMenuWidth>l?a.right=l-d-v-C+"px":a.left=d-C+"px";c+m+e.exportMenuHeight>t&&"top"!==k.alignOptions.verticalAlign?a.bottom=t-c-C+"px":a.top=c+m-C+"px";y(g,a);e.openMenu=!0;},
addButton:function(b){var a=this,d=a.renderer,c=n(a.options.navigation.buttonOptions,b),f=c.onclick,m=c.menuItems,k,e,h=c.symbolSize||12;a.btnCount||(a.btnCount=0);a.exportDivElements||(a.exportDivElements=[],a.exportSVGElements=[]);if(!1!==c.enabled){var l=c.theme,t=l.states,q=t&&t.hover,t=t&&t.select,g;a.styledMode||(l.fill=u(l.fill,"#ffffff"),l.stroke=u(l.stroke,"none"));delete l.states;f?g=function(b){b&&b.stopPropagation();f.call(a,b);}:m&&(g=function(b){b&&b.stopPropagation();a.contextMenu(e.menuClassName,
m,e.translateX,e.translateY,e.width,e.height,e);e.setState(2);});c.text&&c.symbol?l.paddingLeft=u(l.paddingLeft,25):c.text||z(l,{width:c.width,height:c.height,padding:0});a.styledMode||(l["stroke-linecap"]="round",l.fill=u(l.fill,"#ffffff"),l.stroke=u(l.stroke,"none"));e=d.button(c.text,0,0,g,l,q,t).addClass(b.className).attr({title:u(a.options.lang[c._titleKey||c.titleKey],"")});e.menuClassName=b.menuClassName||"highcharts-menu-"+a.btnCount++;c.symbol&&(k=d.symbol(c.symbol,c.symbolX-h/2,c.symbolY-
h/2,h,h,{width:h,height:h}).addClass("highcharts-button-symbol").attr({zIndex:1}).add(e),a.styledMode||k.attr({stroke:c.symbolStroke,fill:c.symbolFill,"stroke-width":c.symbolStrokeWidth||1}));e.add(a.exportingGroup).align(z(c,{width:e.width,x:u(c.x,a.buttonOffset)}),!0,"spacingBox");a.buttonOffset+=(e.width+c.buttonSpacing)*("right"===c.align?-1:1);a.exportSVGElements.push(e,k);}},destroyExport:function(b){var a=b?b.target:this;b=a.exportSVGElements;var d=a.exportDivElements,c=a.exportEvents,h;b&&
(b.forEach(function(b,c){b&&(b.onclick=b.ontouchstart=null,h="cache-"+b.menuClassName,a[h]&&delete a[h],a.exportSVGElements[c]=b.destroy());}),b.length=0);a.exportingGroup&&(a.exportingGroup.destroy(),delete a.exportingGroup);d&&(d.forEach(function(b,c){f.clearTimeout(b.hideTimer);D(b,"mouseleave");a.exportDivElements[c]=b.onmouseout=b.onmouseover=b.ontouchstart=b.onclick=null;F(b);}),d.length=0);c&&(c.forEach(function(a){a();}),c.length=0);}});H.prototype.inlineToAttributes="fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");
H.prototype.inlineBlacklist=[/-/,/^(clipPath|cssText|d|height|width)$/,/^font$/,/[lL]ogical(Width|Height)$/,/perspective/,/TapHighlightColor/,/^transition/,/^length$/];H.prototype.unstyledElements=["clipPath","defs","desc"];B.prototype.inlineStyles=function(){function b(a){return a.replace(/([A-Z])/g,function(a,b){return "-"+b.toLowerCase()})}function a(d){function m(a,g){p=v=!1;if(h){for(r=h.length;r--&&!v;)v=h[r].test(g);p=!v;}"transform"===g&&"none"===a&&(p=!0);for(r=f.length;r--&&!p;)p=f[r].test(g)||
"function"===typeof a;p||q[g]===a&&"svg"!==d.nodeName||e[d.nodeName][g]===a||(-1!==c.indexOf(g)?d.setAttribute(b(g),a):u+=b(g)+":"+a+";");}var g,q,u="",t,p,v,r;if(1===d.nodeType&&-1===k.indexOf(d.nodeName)){g=A.getComputedStyle(d,null);q="svg"===d.nodeName?{}:A.getComputedStyle(d.parentNode,null);e[d.nodeName]||(x=l.getElementsByTagName("svg")[0],t=l.createElementNS(d.namespaceURI,d.nodeName),x.appendChild(t),e[d.nodeName]=n(A.getComputedStyle(t,null)),"text"===d.nodeName&&delete e.text.fill,x.removeChild(t));
if(M||L)for(var w in g)m(g[w],w);else G(g,m);u&&(g=d.getAttribute("style"),d.setAttribute("style",(g?g+";":"")+u));"svg"===d.nodeName&&d.setAttribute("stroke-width","1px");"text"!==d.nodeName&&[].forEach.call(d.children||d.childNodes,a);}}var d=this.renderer,c=d.inlineToAttributes,f=d.inlineBlacklist,h=d.inlineWhitelist,k=d.unstyledElements,e={},x,l,d=q.createElement("iframe");y(d,{width:"1px",height:"1px",visibility:"hidden"});q.body.appendChild(d);l=d.contentWindow.document;l.open();l.write('\x3csvg xmlns\x3d"http://www.w3.org/2000/svg"\x3e\x3c/svg\x3e');
l.close();a(this.container.querySelector("svg"));x.parentNode.removeChild(x);};J.menu=function(b,a,d,c){return ["M",b,a+2.5,"L",b+d,a+2.5,"M",b,a+c/2+.5,"L",b+d,a+c/2+.5,"M",b,a+c-1.5,"L",b+d,a+c-1.5]};J.menuball=function(b,a,d,c){b=[];c=c/3-2;return b=b.concat(this.circle(d-c,a,c,c),this.circle(d-c,a+c+4,c,c),this.circle(d-c,a+2*(c+4),c,c))};B.prototype.renderExporting=function(){var b=this,a=b.options.exporting,d=a.buttons,c=b.isDirtyExporting||!b.exportSVGElements;b.buttonOffset=0;b.isDirtyExporting&&
b.destroyExport();c&&!1!==a.enabled&&(b.exportEvents=[],b.exportingGroup=b.exportingGroup||b.renderer.g("exporting-group").attr({zIndex:3}).add(),G(d,function(a){b.addButton(a);}),b.isDirtyExporting=!1);r(b,"destroy",b.destroyExport);};r(B,"init",function(){var b=this;b.exporting={update:function(a,d){b.isDirtyExporting=!0;n(!0,b.options.exporting,a);u(d,!0)&&b.redraw();}};h.addUpdate(function(a,d){b.isDirtyExporting=!0;n(!0,b.options.navigation,a);u(d,!0)&&b.redraw();},b);});B.prototype.callbacks.push(function(b){b.renderExporting();
r(b,"redraw",b.renderExporting);});})(h,D);});

});

var offlineExporting = createCommonjsModule(function (module) {
/*
 Highcharts JS v7.0.3 (2019-02-06)
 Client side exporting module

 (c) 2015-2019 Torstein Honsi / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(e){"object"==='object'&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof undefined&&undefined.amd?undefined(function(){return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0);})(function(e){(function(a){var b=a.win,e=b.navigator,n=b.document,d=b.URL||b.webkitURL||b,r=/Edge\/\d+/.test(e.userAgent);a.dataURLtoBlob=function(a){if((a=a.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/))&&3<a.length&&b.atob&&b.ArrayBuffer&&b.Uint8Array&&b.Blob&&d.createObjectURL){for(var g=
b.atob(a[3]),f=new b.ArrayBuffer(g.length),f=new b.Uint8Array(f),e=0;e<f.length;++e)f[e]=g.charCodeAt(e);a=new b.Blob([f],{type:a[1]});return d.createObjectURL(a)}};a.downloadURL=function(g,d){var f=n.createElement("a"),x;if("string"===typeof g||g instanceof String||!e.msSaveOrOpenBlob){if(r||2E6<g.length)if(g=a.dataURLtoBlob(g),!g)throw Error("Failed to convert to blob");if(void 0!==f.download)f.href=g,f.download=d,n.body.appendChild(f),f.click(),n.body.removeChild(f);else try{if(x=b.open(g,"chart"),
void 0===x||null===x)throw Error("Failed to open window");}catch(k){b.location.href=g;}}else e.msSaveOrOpenBlob(g,d);};})(e);(function(a){function b(k,b){var h=g.getElementsByTagName("head")[0],c=g.createElement("script");c.type="text/javascript";c.src=k;c.onload=b;c.onerror=function(){a.error("Error loading script "+k);};h.appendChild(c);}var e=a.addEvent,n=a.merge,d=a.win,r=d.navigator,g=d.document,B=d.URL||d.webkitURL||d,f=/Edge\/|Trident\/|MSIE /.test(r.userAgent),x=f?150:0;a.CanVGRenderer={};a.svgToDataUrl=
function(a){var k=-1<r.userAgent.indexOf("WebKit")&&0>r.userAgent.indexOf("Chrome");try{if(!k&&0>r.userAgent.toLowerCase().indexOf("firefox"))return B.createObjectURL(new d.Blob([a],{type:"image/svg+xml;charset-utf-16"}))}catch(h){}return "data:image/svg+xml;charset\x3dUTF-8,"+encodeURIComponent(a)};a.imageToDataUrl=function(a,b,h,c,e,f,q,t,p){var l=new d.Image,k,y=function(){setTimeout(function(){var d=g.createElement("canvas"),f=d.getContext&&d.getContext("2d"),z;try{if(f){d.height=l.height*c;d.width=
l.width*c;f.drawImage(l,0,0,d.width,d.height);try{z=d.toDataURL(b),e(z,b,h,c);}catch(C){k(a,b,h,c);}}else q(a,b,h,c);}finally{p&&p(a,b,h,c);}},x);},u=function(){t(a,b,h,c);p&&p(a,b,h,c);};k=function(){l=new d.Image;k=f;l.crossOrigin="Anonymous";l.onload=y;l.onerror=u;l.src=a;};l.onload=y;l.onerror=u;l.src=a;};a.downloadSVGLocal=function(k,e,h,c){function f(a,c){c=new d.jsPDF("l","pt",[a.width.baseVal.value+2*c,a.height.baseVal.value+2*c]);[].forEach.call(a.querySelectorAll('*[visibility\x3d"hidden"]'),function(a){a.parentNode.removeChild(a);});
d.svg2pdf(a,c,{removeInvalid:!0});return c.output("datauristring")}function u(){A.innerHTML=k;var b=A.getElementsByTagName("text"),d;[].forEach.call(b,function(a){["font-family","font-size"].forEach(function(c){for(var b=a;b&&b!==A;){if(b.style[c]){a.style[c]=b.style[c];break}b=b.parentNode;}});a.style["font-family"]=a.style["font-family"]&&a.style["font-family"].split(" ").splice(-1);d=a.getElementsByTagName("title");[].forEach.call(d,function(c){a.removeChild(c);});});b=f(A.firstChild,0);try{a.downloadURL(b,
v),c&&c();}catch(D){h(D);}}var q,t,p=!0,l,m=e.libURL||a.getOptions().exporting.libURL,A=g.createElement("div"),w=e.type||"image/png",v=(e.filename||"chart")+"."+("image/svg+xml"===w?"svg":w.split("/")[1]),n=e.scale||1,m="/"!==m.slice(-1)?m+"/":m;if("image/svg+xml"===w)try{r.msSaveOrOpenBlob?(t=new MSBlobBuilder,t.append(k),q=t.getBlob("image/svg+xml")):q=a.svgToDataUrl(k),a.downloadURL(q,v),c&&c();}catch(z){h(z);}else"application/pdf"===w?d.jsPDF&&d.svg2pdf?u():(p=!0,b(m+"jspdf.js",function(){b(m+"svg2pdf.js",
function(){u();});})):(q=a.svgToDataUrl(k),l=function(){try{B.revokeObjectURL(q);}catch(z){}},a.imageToDataUrl(q,w,{},n,function(b){try{a.downloadURL(b,v),c&&c();}catch(C){h(C);}},function(){var e=g.createElement("canvas"),f=e.getContext("2d"),u=k.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*n,y=k.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*n,q=function(){f.drawSvg(k,0,0,u,y);try{a.downloadURL(r.msSaveOrOpenBlob?e.msToBlob():e.toDataURL(w),v),c&&c();}catch(E){h(E);}finally{l();}};e.width=
u;e.height=y;d.canvg?q():(p=!0,b(m+"rgbcolor.js",function(){b(m+"canvg.js",function(){q();});}));},h,h,function(){p&&l();}));};a.Chart.prototype.getSVGForLocalExport=function(b,d,h,c){var f=this,g,k=0,t,p,l,m,n,r=function(a,b,e){++k;e.imageElement.setAttributeNS("http://www.w3.org/1999/xlink","href",a);k===g.length&&c(f.sanitizeSVG(t.innerHTML,p));};f.unbindGetSVG=e(f,"getSVG",function(a){p=a.chartCopy.options;t=a.chartCopy.container.cloneNode(!0);});f.getSVGForExport(b,d);g=t.getElementsByTagName("image");
try{if(!g.length){c(f.sanitizeSVG(t.innerHTML,p));return}m=0;for(n=g.length;m<n;++m)l=g[m],a.imageToDataUrl(l.getAttributeNS("http://www.w3.org/1999/xlink","href"),"image/png",{imageElement:l},b.scale,r,h,h,h);}catch(v){h(v);}f.unbindGetSVG();};a.Chart.prototype.exportChartLocal=function(b,e){var d=this,c=a.merge(d.options.exporting,b),g=function(b){!1===c.fallbackToExportServer?c.error?c.error(c,b):a.error(28,!0):d.exportChart(c);};f&&d.styledMode&&(a.SVGRenderer.prototype.inlineWhitelist=[/^blockSize/,
/^border/,/^caretColor/,/^color/,/^columnRule/,/^columnRuleColor/,/^cssFloat/,/^cursor/,/^fill$/,/^fillOpacity/,/^font/,/^inlineSize/,/^length/,/^lineHeight/,/^opacity/,/^outline/,/^parentRule/,/^rx$/,/^ry$/,/^stroke/,/^textAlign/,/^textAnchor/,/^textDecoration/,/^transform/,/^vectorEffect/,/^visibility/,/^x$/,/^y$/]);f&&("application/pdf"===c.type||d.container.getElementsByTagName("image").length&&"image/svg+xml"!==c.type)||"application/pdf"===c.type&&d.container.getElementsByTagName("image").length?
g("Image type not supported for this chart/browser."):d.getSVGForLocalExport(c,e,g,function(b){-1<b.indexOf("\x3cforeignObject")&&"image/svg+xml"!==c.type?g("Image type not supported for charts with embedded HTML"):a.downloadSVGLocal(b,a.extend({filename:d.getFilename()},c),g);});};n(!0,a.getOptions().exporting,{libURL:"https://code.highcharts.com/7.0.3/lib/",menuItemDefinitions:{downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChartLocal();}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChartLocal({type:"image/jpeg"});}},
downloadSVG:{textKey:"downloadSVG",onclick:function(){this.exportChartLocal({type:"image/svg+xml"});}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChartLocal({type:"application/pdf"});}}}});})(e);});

});

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @hidden
 *
 * Wraps method that returns an observable that can be completed. Provided opts.resultFinalPredicate dictates when the observable completes.
 */
function CordovaFiniteObservable(opts) {
    if (opts === void 0) { opts = {}; }
    opts.observable = true;
    return function (target, methodName, descriptor) {
        return {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var wrappedObservable = wrap(this, methodName, opts).apply(this, args);
                return new Observable(function (observer) {
                    var wrappedSubscription = wrappedObservable.subscribe({
                        next: function (x) {
                            observer.next(opts.resultTransform ? x[opts.resultTransform] : x);
                            if (opts.resultFinalPredicate && x[opts.resultFinalPredicate]) {
                                observer.complete();
                            }
                        },
                        error: function (err) {
                            observer.error(err);
                        },
                        complete: function () {
                            observer.complete();
                        }
                    });
                    return function () {
                        wrappedSubscription.unsubscribe();
                    };
                });
            },
            enumerable: true
        };
    };
}
var PhotoLibraryOriginal = /** @class */ (function (_super) {
    __extends(PhotoLibraryOriginal, _super);
    function PhotoLibraryOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhotoLibraryOriginal.prototype.getLibrary = function (options) { return cordova$1(this, "getLibrary", { "observable": true }, arguments); };
    PhotoLibraryOriginal.prototype.requestAuthorization = function (options) { return cordova$1(this, "requestAuthorization", { "callbackOrder": "reverse" }, arguments); };
    PhotoLibraryOriginal.prototype.getAlbums = function () { return cordova$1(this, "getAlbums", { "callbackOrder": "reverse" }, arguments); };
    PhotoLibraryOriginal.prototype.getThumbnailURL = function (photo, options) { return cordova$1(this, "getThumbnailURL", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    PhotoLibraryOriginal.prototype.getPhotoURL = function (photo, options) { return cordova$1(this, "getPhotoURL", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    PhotoLibraryOriginal.prototype.getThumbnail = function (photo, options) { return cordova$1(this, "getThumbnail", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    PhotoLibraryOriginal.prototype.getPhoto = function (photo, options) { return cordova$1(this, "getPhoto", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    PhotoLibraryOriginal.prototype.saveImage = function (url, album, options) { return cordova$1(this, "saveImage", { "successIndex": 2, "errorIndex": 3 }, arguments); };
    PhotoLibraryOriginal.prototype.saveVideo = function (url, album) { return cordova$1(this, "saveVideo", { "successIndex": 2, "errorIndex": 3 }, arguments); };
    PhotoLibraryOriginal.pluginName = "PhotoLibrary";
    PhotoLibraryOriginal.plugin = "cordova-plugin-photo-library";
    PhotoLibraryOriginal.pluginRef = "cordova.plugins.photoLibrary";
    PhotoLibraryOriginal.repo = "https://github.com/terikon/cordova-plugin-photo-library";
    PhotoLibraryOriginal.install = "ionic cordova plugin add cordova-plugin-photo-library --variable PHOTO_LIBRARY_USAGE_DESCRIPTION=\"To choose photos\"";
    PhotoLibraryOriginal.installVariables = ["PHOTO_LIBRARY_USAGE_DESCRIPTION"];
    PhotoLibraryOriginal.platforms = ["Android", "Browser", "iOS"];
    return PhotoLibraryOriginal;
}(IonicNativePlugin));
var PhotoLibrary = new PhotoLibraryOriginal();

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FileTransferOriginal = /** @class */ (function (_super) {
    __extends$1(FileTransferOriginal, _super);
    function FileTransferOriginal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Error code rejected from upload with FileTransferError
         * Defined in FileTransferError.
         *      FILE_NOT_FOUND_ERR: 1   Return when file was not found
         *      INVALID_URL_ERR: 2,     Return when url was invalid
         *      CONNECTION_ERR: 3,      Return on connection error
         *      ABORT_ERR: 4,           Return on aborting
         *      NOT_MODIFIED_ERR: 5     Return on '304 Not Modified' HTTP response
         * @enum {number}
         */
        _this.FileTransferErrorCode = {
            FILE_NOT_FOUND_ERR: 1,
            INVALID_URL_ERR: 2,
            CONNECTION_ERR: 3,
            ABORT_ERR: 4,
            NOT_MODIFIED_ERR: 5
        };
        return _this;
    }
    /**
     * Creates a new FileTransferOriginal object
     * @return {FileTransferObject}
     */
    FileTransferOriginal.prototype.create = function () {
        return new FileTransferObject();
    };
    FileTransferOriginal.pluginName = "FileTransfer";
    FileTransferOriginal.plugin = "cordova-plugin-file-transfer";
    FileTransferOriginal.pluginRef = "FileTransfer";
    FileTransferOriginal.repo = "https://github.com/apache/cordova-plugin-file-transfer";
    FileTransferOriginal.platforms = ["Amazon Fire OS", "Android", "Browser", "iOS", "Ubuntu", "Windows", "Windows Phone"];
    return FileTransferOriginal;
}(IonicNativePlugin));
var FileTransfer$1 = new FileTransferOriginal();
var FileTransferObject = /** @class */ (function () {
    function FileTransferObject() {
        if (checkAvailability(FileTransferOriginal.getPluginRef(), null, FileTransferOriginal.getPluginName()) === true) {
            this._objectInstance = new (FileTransferOriginal.getPlugin())();
        }
    }
    FileTransferObject.prototype.upload = function (fileUrl, url, options, trustAllHosts) { return cordovaInstance(this, "upload", { "successIndex": 2, "errorIndex": 3 }, arguments); };
    FileTransferObject.prototype.download = function (source, target, trustAllHosts, options) { return cordovaInstance(this, "download", { "successIndex": 2, "errorIndex": 3 }, arguments); };
    FileTransferObject.prototype.onProgress = function (listener) {
        var _this = this;
        return (function () {
            if (instanceAvailability(_this) === true) {
                _this._objectInstance.onprogress = listener;
            }
        })();
    };
    FileTransferObject.prototype.abort = function () { return cordovaInstance(this, "abort", { "sync": true }, arguments); };
    FileTransferObject.plugin = "cordova-plugin-file-transfer";
    FileTransferObject.pluginName = "FileTransfer";
    return FileTransferObject;
}());

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FileOriginal = /** @class */ (function (_super) {
    __extends$2(FileOriginal, _super);
    function FileOriginal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cordovaFileError = {
            1: 'NOT_FOUND_ERR',
            2: 'SECURITY_ERR',
            3: 'ABORT_ERR',
            4: 'NOT_READABLE_ERR',
            5: 'ENCODING_ERR',
            6: 'NO_MODIFICATION_ALLOWED_ERR',
            7: 'INVALID_STATE_ERR',
            8: 'SYNTAX_ERR',
            9: 'INVALID_MODIFICATION_ERR',
            10: 'QUOTA_EXCEEDED_ERR',
            11: 'TYPE_MISMATCH_ERR',
            12: 'PATH_EXISTS_ERR',
            13: 'WRONG_ENTRY_TYPE',
            14: 'DIR_READ_ERR'
        };
        return _this;
    }
    FileOriginal.prototype.getFreeDiskSpace = function () {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve, reject) {
                    cordova.exec(resolve, reject, 'File', 'getFreeDiskSpace', []);
                });
            }
        })();
    };
    FileOriginal.prototype.checkDir = function (path, dir) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(dir)) {
                    var err = new FileError(5);
                    err.message = 'directory cannot start with /';
                    return Promise.reject(err);
                }
                var fullPath = path + dir;
                return _this.resolveDirectoryUrl(fullPath).then(function () {
                    return true;
                });
            }
        })();
    };
    FileOriginal.prototype.createDir = function (path, dirName, replace) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(dirName)) {
                    var err = new FileError(5);
                    err.message = 'directory cannot start with /';
                    return Promise.reject(err);
                }
                var options = {
                    create: true
                };
                if (!replace) {
                    options.exclusive = true;
                }
                return _this.resolveDirectoryUrl(path).then(function (fse) {
                    return _this.getDirectory(fse, dirName, options);
                });
            }
        })();
    };
    FileOriginal.prototype.removeDir = function (path, dirName) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(dirName)) {
                    var err = new FileError(5);
                    err.message = 'directory cannot start with /';
                    return Promise.reject(err);
                }
                return _this.resolveDirectoryUrl(path)
                    .then(function (fse) {
                    return _this.getDirectory(fse, dirName, { create: false });
                })
                    .then(function (de) {
                    return _this.remove(de);
                });
            }
        })();
    };
    FileOriginal.prototype.moveDir = function (path, dirName, newPath, newDirName) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                newDirName = newDirName || dirName;
                if (/^\//.test(newDirName)) {
                    var err = new FileError(5);
                    err.message = 'directory cannot start with /';
                    return Promise.reject(err);
                }
                return _this.resolveDirectoryUrl(path)
                    .then(function (fse) {
                    return _this.getDirectory(fse, dirName, { create: false });
                })
                    .then(function (srcde) {
                    return _this.resolveDirectoryUrl(newPath).then(function (destenation) {
                        return _this.move(srcde, destenation, newDirName);
                    });
                });
            }
        })();
    };
    FileOriginal.prototype.copyDir = function (path, dirName, newPath, newDirName) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(newDirName)) {
                    var err = new FileError(5);
                    err.message = 'directory cannot start with /';
                    return Promise.reject(err);
                }
                return _this.resolveDirectoryUrl(path)
                    .then(function (fse) {
                    return _this.getDirectory(fse, dirName, { create: false });
                })
                    .then(function (srcde) {
                    return _this.resolveDirectoryUrl(newPath).then(function (deste) {
                        return _this.copy(srcde, deste, newDirName);
                    });
                });
            }
        })();
    };
    FileOriginal.prototype.listDir = function (path, dirName) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(dirName)) {
                    var err = new FileError(5);
                    err.message = 'directory cannot start with /';
                    return Promise.reject(err);
                }
                return _this.resolveDirectoryUrl(path)
                    .then(function (fse) {
                    return _this.getDirectory(fse, dirName, {
                        create: false,
                        exclusive: false
                    });
                })
                    .then(function (de) {
                    var reader = de.createReader();
                    return _this.readEntries(reader);
                });
            }
        })();
    };
    FileOriginal.prototype.removeRecursively = function (path, dirName) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(dirName)) {
                    var err = new FileError(5);
                    err.message = 'directory cannot start with /';
                    return Promise.reject(err);
                }
                return _this.resolveDirectoryUrl(path)
                    .then(function (fse) {
                    return _this.getDirectory(fse, dirName, { create: false });
                })
                    .then(function (de) {
                    return _this.rimraf(de);
                });
            }
        })();
    };
    FileOriginal.prototype.checkFile = function (path, file) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(file)) {
                    var err = new FileError(5);
                    err.message = 'file cannot start with /';
                    return Promise.reject(err);
                }
                return _this.resolveLocalFilesystemUrl(path + file).then(function (fse) {
                    if (fse.isFile) {
                        return true;
                    }
                    else {
                        var err = new FileError(13);
                        err.message = 'input is not a file';
                        return Promise.reject(err);
                    }
                });
            }
        })();
    };
    FileOriginal.prototype.createFile = function (path, fileName, replace) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(fileName)) {
                    var err = new FileError(5);
                    err.message = 'file-name cannot start with /';
                    return Promise.reject(err);
                }
                var options = {
                    create: true
                };
                if (!replace) {
                    options.exclusive = true;
                }
                return _this.resolveDirectoryUrl(path).then(function (fse) {
                    return _this.getFile(fse, fileName, options);
                });
            }
        })();
    };
    FileOriginal.prototype.removeFile = function (path, fileName) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(fileName)) {
                    var err = new FileError(5);
                    err.message = 'file-name cannot start with /';
                    return Promise.reject(err);
                }
                return _this.resolveDirectoryUrl(path)
                    .then(function (fse) {
                    return _this.getFile(fse, fileName, { create: false });
                })
                    .then(function (fe) {
                    return _this.remove(fe);
                });
            }
        })();
    };
    FileOriginal.prototype.writeFile = function (path, fileName, text, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return (function () {
            if (checkAvailability(_this) === true) {
                if (/^\//.test(fileName)) {
                    var err = new FileError(5);
                    err.message = 'file-name cannot start with /';
                    return Promise.reject(err);
                }
                var getFileOpts = {
                    create: !options.append,
                    exclusive: !options.replace
                };
                return _this.resolveDirectoryUrl(path)
                    .then(function (directoryEntry) {
                    return _this.getFile(directoryEntry, fileName, getFileOpts);
                })
                    .then(function (fileEntry) {
                    return _this.writeFileEntry(fileEntry, text, options);
                });
            }
        })();
    };
    /**
     * Write content to FileEntry.
     * @hidden
     * Write to an existing file.
     * @param {FileEntry} fe file entry object
     * @param {string | Blob | ArrayBuffer} text text content or blob to write
     * @param {IWriteOptions} options replace file if set to true. See WriteOptions for more information.
     * @returns {Promise<FileEntry>}  Returns a Promise that resolves to updated file entry or rejects with an error.
     */
    FileOriginal.prototype.writeFileEntry = function (fe, text, options) {
        var _this = this;
        return this.createWriter(fe)
            .then(function (writer) {
            if (options.append) {
                writer.seek(writer.length);
            }
            if (options.truncate) {
                writer.truncate(options.truncate);
            }
            return _this.write(writer, text);
        })
            .then(function () { return fe; });
    };
    FileOriginal.prototype.writeExistingFile = function (path, fileName, text) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return _this.writeFile(path, fileName, text, { replace: true });
            }
        })();
    };
    FileOriginal.prototype.readAsText = function (path, file) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return _this.readFile(path, file, 'Text');
            }
        })();
    };
    FileOriginal.prototype.readAsDataURL = function (path, file) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return _this.readFile(path, file, 'DataURL');
            }
        })();
    };
    FileOriginal.prototype.readAsBinaryString = function (path, file) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return _this.readFile(path, file, 'BinaryString');
            }
        })();
    };
    FileOriginal.prototype.readAsArrayBuffer = function (path, file) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return _this.readFile(path, file, 'ArrayBuffer');
            }
        })();
    };
    FileOriginal.prototype.moveFile = function (path, fileName, newPath, newFileName) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                newFileName = newFileName || fileName;
                if (/^\//.test(newFileName)) {
                    var err = new FileError(5);
                    err.message = 'file name cannot start with /';
                    return Promise.reject(err);
                }
                return _this.resolveDirectoryUrl(path)
                    .then(function (fse) {
                    return _this.getFile(fse, fileName, { create: false });
                })
                    .then(function (srcfe) {
                    return _this.resolveDirectoryUrl(newPath).then(function (deste) {
                        return _this.move(srcfe, deste, newFileName);
                    });
                });
            }
        })();
    };
    FileOriginal.prototype.copyFile = function (path, fileName, newPath, newFileName) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                newFileName = newFileName || fileName;
                if (/^\//.test(newFileName)) {
                    var err = new FileError(5);
                    err.message = 'file name cannot start with /';
                    return Promise.reject(err);
                }
                return _this.resolveDirectoryUrl(path)
                    .then(function (fse) {
                    return _this.getFile(fse, fileName, { create: false });
                })
                    .then(function (srcfe) {
                    return _this.resolveDirectoryUrl(newPath).then(function (deste) {
                        return _this.copy(srcfe, deste, newFileName);
                    });
                });
            }
        })();
    };
    /**
     * @hidden
     */
    FileOriginal.prototype.fillErrorMessage = function (err) {
        try {
            err.message = this.cordovaFileError[err.code];
        }
        catch (e) { }
    };
    FileOriginal.prototype.resolveLocalFilesystemUrl = function (fileUrl) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve, reject) {
                    try {
                        window.resolveLocalFileSystemURL(fileUrl, function (entry) {
                            resolve(entry);
                        }, function (err) {
                            _this.fillErrorMessage(err);
                            reject(err);
                        });
                    }
                    catch (xc) {
                        _this.fillErrorMessage(xc);
                        reject(xc);
                    }
                });
            }
        })();
    };
    FileOriginal.prototype.resolveDirectoryUrl = function (directoryUrl) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return _this.resolveLocalFilesystemUrl(directoryUrl).then(function (de) {
                    if (de.isDirectory) {
                        return de;
                    }
                    else {
                        var err = new FileError(13);
                        err.message = 'input is not a directory';
                        return Promise.reject(err);
                    }
                });
            }
        })();
    };
    FileOriginal.prototype.getDirectory = function (directoryEntry, directoryName, flags) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return new Promise(function (resolve, reject) {
                    try {
                        directoryEntry.getDirectory(directoryName, flags, function (de) {
                            resolve(de);
                        }, function (err) {
                            _this.fillErrorMessage(err);
                            reject(err);
                        });
                    }
                    catch (xc) {
                        _this.fillErrorMessage(xc);
                        reject(xc);
                    }
                });
            }
        })();
    };
    FileOriginal.prototype.getFile = function (directoryEntry, fileName, flags) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return new Promise(function (resolve, reject) {
                    try {
                        directoryEntry.getFile(fileName, flags, resolve, function (err) {
                            _this.fillErrorMessage(err);
                            reject(err);
                        });
                    }
                    catch (xc) {
                        _this.fillErrorMessage(xc);
                        reject(xc);
                    }
                });
            }
        })();
    };
    FileOriginal.prototype.readFile = function (path, file, readAs) {
        var _this = this;
        if (/^\//.test(file)) {
            var err = new FileError(5);
            err.message = 'file-name cannot start with /';
            return Promise.reject(err);
        }
        return this.resolveDirectoryUrl(path)
            .then(function (directoryEntry) {
            return _this.getFile(directoryEntry, file, { create: false });
        })
            .then(function (fileEntry) {
            var reader = new FileReader();
            return getPromise(function (resolve, reject) {
                reader.onloadend = function () {
                    if (reader.result !== undefined || reader.result !== null) {
                        resolve(reader.result);
                    }
                    else if (reader.error !== undefined || reader.error !== null) {
                        reject(reader.error);
                    }
                    else {
                        reject({ code: null, message: 'READER_ONLOADEND_ERR' });
                    }
                };
                fileEntry.file(function (file) {
                    reader["readAs" + readAs].call(reader, file);
                }, function (error) {
                    reject(error);
                });
            });
        });
    };
    /**
     * @hidden
     */
    FileOriginal.prototype.remove = function (fe) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fe.remove(function () {
                resolve({ success: true, fileRemoved: fe });
            }, function (err) {
                _this.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @hidden
     */
    FileOriginal.prototype.move = function (srce, destdir, newName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            srce.moveTo(destdir, newName, function (deste) {
                resolve(deste);
            }, function (err) {
                _this.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @hidden
     */
    FileOriginal.prototype.copy = function (srce, destdir, newName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            srce.copyTo(destdir, newName, function (deste) {
                resolve(deste);
            }, function (err) {
                _this.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @hidden
     */
    FileOriginal.prototype.readEntries = function (dr) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            dr.readEntries(function (entries) {
                resolve(entries);
            }, function (err) {
                _this.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @hidden
     */
    FileOriginal.prototype.rimraf = function (de) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            de.removeRecursively(function () {
                resolve({ success: true, fileRemoved: de });
            }, function (err) {
                _this.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @hidden
     */
    FileOriginal.prototype.createWriter = function (fe) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fe.createWriter(function (writer) {
                resolve(writer);
            }, function (err) {
                _this.fillErrorMessage(err);
                reject(err);
            });
        });
    };
    /**
     * @hidden
     */
    FileOriginal.prototype.write = function (writer, gu) {
        if (gu instanceof Blob) {
            return this.writeFileInChunks(writer, gu);
        }
        return new Promise(function (resolve, reject) {
            writer.onwriteend = function (evt) {
                if (writer.error) {
                    reject(writer.error);
                }
                else {
                    resolve(evt);
                }
            };
            writer.write(gu);
        });
    };
    /**
     * @hidden
     */
    FileOriginal.prototype.writeFileInChunks = function (writer, file) {
        var BLOCK_SIZE = 1024 * 1024;
        var writtenSize = 0;
        function writeNextChunk() {
            var size = Math.min(BLOCK_SIZE, file.size - writtenSize);
            var chunk = file.slice(writtenSize, writtenSize + size);
            writtenSize += size;
            writer.write(chunk);
        }
        return getPromise(function (resolve, reject) {
            writer.onerror = reject;
            writer.onwrite = function () {
                if (writtenSize < file.size) {
                    writeNextChunk();
                }
                else {
                    resolve();
                }
            };
            writeNextChunk();
        });
    };
    Object.defineProperty(FileOriginal.prototype, "applicationDirectory", {
        get: function () { return cordovaPropertyGet(this, "applicationDirectory"); },
        set: function (value) { cordovaPropertySet(this, "applicationDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "applicationStorageDirectory", {
        get: function () { return cordovaPropertyGet(this, "applicationStorageDirectory"); },
        set: function (value) { cordovaPropertySet(this, "applicationStorageDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "dataDirectory", {
        get: function () { return cordovaPropertyGet(this, "dataDirectory"); },
        set: function (value) { cordovaPropertySet(this, "dataDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "cacheDirectory", {
        get: function () { return cordovaPropertyGet(this, "cacheDirectory"); },
        set: function (value) { cordovaPropertySet(this, "cacheDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "externalApplicationStorageDirectory", {
        get: function () { return cordovaPropertyGet(this, "externalApplicationStorageDirectory"); },
        set: function (value) { cordovaPropertySet(this, "externalApplicationStorageDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "externalDataDirectory", {
        get: function () { return cordovaPropertyGet(this, "externalDataDirectory"); },
        set: function (value) { cordovaPropertySet(this, "externalDataDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "externalCacheDirectory", {
        get: function () { return cordovaPropertyGet(this, "externalCacheDirectory"); },
        set: function (value) { cordovaPropertySet(this, "externalCacheDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "externalRootDirectory", {
        get: function () { return cordovaPropertyGet(this, "externalRootDirectory"); },
        set: function (value) { cordovaPropertySet(this, "externalRootDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "tempDirectory", {
        get: function () { return cordovaPropertyGet(this, "tempDirectory"); },
        set: function (value) { cordovaPropertySet(this, "tempDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "syncedDataDirectory", {
        get: function () { return cordovaPropertyGet(this, "syncedDataDirectory"); },
        set: function (value) { cordovaPropertySet(this, "syncedDataDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "documentsDirectory", {
        get: function () { return cordovaPropertyGet(this, "documentsDirectory"); },
        set: function (value) { cordovaPropertySet(this, "documentsDirectory", value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileOriginal.prototype, "sharedDirectory", {
        get: function () { return cordovaPropertyGet(this, "sharedDirectory"); },
        set: function (value) { cordovaPropertySet(this, "sharedDirectory", value); },
        enumerable: true,
        configurable: true
    });
    FileOriginal.pluginName = "File";
    FileOriginal.plugin = "cordova-plugin-file";
    FileOriginal.pluginRef = "cordova.file";
    FileOriginal.repo = "https://github.com/apache/cordova-plugin-file";
    FileOriginal.platforms = ["Android", "Browser", "iOS", "macOS", "Windows"];
    return FileOriginal;
}(IonicNativePlugin));
var File = new FileOriginal();

function download(data, strFileName, strMimeType) {
  var self = window, // this script is only for browsers anyway...
    defaultMime = 'application/octet-stream', // this default mime also triggers iframe downloads
    mimeType = strMimeType || defaultMime,
    payload = data,
    url = !strFileName && !strMimeType && payload,
    anchor = document.createElement('a'),
    toString = function(a) {
      return String(a);
    },
    myBlob = self.Blob || self.MozBlob || self.WebKitBlob || toString,
    fileName = strFileName || 'download',
    blob,
    reader;
  myBlob = myBlob.call ? myBlob.bind(self) : Blob;

  if (String(this) === 'true') {
    //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
    payload = [payload, mimeType];
    mimeType = payload[0];
    payload = payload[1];
  }

  if (url && url.length < 2048) {
    // if no filename and no mime, assume a url was passed as the only argument
    fileName = url
      .split('/')
      .pop()
      .split('?')[0];
    anchor.href = url; // assign href prop to temp anchor
    if (anchor.href.indexOf(url) !== -1) {
      // if the browser determines that it's a potentially valid url path:
      var ajax = new XMLHttpRequest();
      ajax.open('GET', url, true);
      ajax.responseType = 'blob';
      ajax.onload = function(e) {
        download(e.target.response, fileName, defaultMime);
      };
      setTimeout(function() {
        ajax.send();
      }, 0); // allows setting custom ajax headers using the return:
      return ajax;
    } // end if valid url?
  } // end if url?

  //go ahead and download dataURLs right away
  if (/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)) {
    if (payload.length > 1024 * 1024 * 1.999 && myBlob !== toString) {
      payload = dataUrlToBlob(payload);
      mimeType = payload.type || defaultMime;
    } else {
      return navigator.msSaveBlob // IE10 can't do a[download], only Blobs:
        ? navigator.msSaveBlob(dataUrlToBlob(payload), fileName)
        : saver(payload); // everyone else can save dataURLs un-processed
    }
  } //end if dataURL passed?

  blob = payload instanceof myBlob ? payload : new myBlob([payload], { type: mimeType });

  function dataUrlToBlob(strUrl) {
    var parts = strUrl.split(/[:;,]/),
      type = parts[1],
      decoder = parts[2] == 'base64' ? atob : decodeURIComponent,
      binData = decoder(parts.pop()),
      mx = binData.length,
      i = 0,
      uiArr = new Uint8Array(mx);

    for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);

    return new myBlob([uiArr], { type: type });
  }

  function saver(url, winMode) {
    if ('download' in anchor) {
      //html5 A[download]
      anchor.href = url;
      anchor.setAttribute('download', fileName);
      anchor.className = 'download-js-link';
      anchor.innerHTML = 'downloading...';
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      setTimeout(function() {
        anchor.click();
        document.body.removeChild(anchor);
        if (winMode === true) {
          setTimeout(function() {
            self.URL.revokeObjectURL(anchor.href);
          }, 250);
        }
      }, 66);
      return true;
    }

    // handle non-a[download] safari as best we can:
    if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
      url = url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
      if (!window.open(url)) {
        // popup blocked, offer direct download:
        if (confirm('Displaying New Document\n\nUse Save As... to download, then click back to return to this page.')) {
          location.href = url;
        }
      }
      return true;
    }

    //do iframe dataURL download (old ch+FF):
    var f = document.createElement('iframe');
    document.body.appendChild(f);

    if (!winMode) {
      // force a mime that will download:
      url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
    }
    f.src = url;
    setTimeout(function() {
      document.body.removeChild(f);
    }, 333);
  } //end saver

  if (navigator.msSaveBlob) {
    // IE10+ : (has Blob, but not a[download] or URL)
    return navigator.msSaveBlob(blob, fileName);
  }

  if (self.URL) {
    // simple fast and modern way using Blob and URL:
    saver(self.URL.createObjectURL(blob), true);
  } else {
    // handle non-Blob()+non-URL browsers:
    if (typeof blob === 'string' || blob.constructor === toString) {
      try {
        return saver('data:' + mimeType + ';base64,' + self.btoa(blob));
      } catch (y) {
        return saver('data:' + mimeType + ',' + encodeURIComponent(blob));
      }
    }

    // Blob but not URL support:
    reader = new FileReader();
    reader.onload = function(e) {
      saver(this.result);
    };
    reader.readAsDataURL(blob);
  }
  return true;
}

const videos = ['mp4', 'avi', 'mov', 'm4v', '3gp', '3gpp'];
const audios = ['mp3', 'wav', 'm4a'];
const images = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'];
const documents = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'csv', 'txt'];
function getExtension(file) {
    if (file) {
        let url = file._filename || file._downloadURL || file.name || file;
        if (url && url.split) {
            return url
                .split('.')
                .pop()
                .toLowerCase();
        }
    }
    return '';
}
function isImage(file) {
    let extension = getExtension(file);
    return images.indexOf(extension) >= 0;
}
function isVideo(file) {
    let extension = getExtension(file);
    return videos.indexOf(extension) >= 0;
}
function isAudio(file) {
    let extension = getExtension(file);
    return audios.indexOf(extension) >= 0;
}
function isDocument(file) {
    let extension = getExtension(file);
    return documents.indexOf(extension) >= 0;
}
function getType(file) {
    if (isImage(file)) {
        return 'image';
    }
    else if (isDocument(file)) {
        return 'document';
    }
    else if (isVideo(file)) {
        return 'video';
    }
    else if (isAudio(file)) {
        return 'audio';
    }
    return 'unknown';
}
function downloadFile(url, fileName) {
    if (!fileName) {
        let name = url.split('/');
        fileName = name[name.length - 1];
    }
    if (isCordova()) {
        downloadFileMobile(url, fileName);
    }
    else {
        downloadFileWeb(url, fileName);
    }
}
function downloadFileMobile(url, fileName) {
    let saver = () => {
        if (isImage(url)) {
            return PhotoLibrary.saveImage(url, 'YOOBIC');
        }
        else if (isVideo(url)) {
            const fileTransfer = FileTransfer$1.create();
            url = url.substr(0, url.lastIndexOf('.')) + '.mp4';
            return fileTransfer.download(url, File.dataDirectory + fileName).then(entry => {
                return PhotoLibrary.saveVideo(entry.toURL(), 'YOOBIC');
            });
        }
    };
    return PhotoLibrary.requestAuthorization({ read: true, write: true }).then(() => {
        return saver()
            .then(() => showToast({
            message: translate('DOWNLOADSUCCESS'),
            duration: 2000,
            showCloseButton: true
        }))
            .catch(() => showToast({
            message: translate('DOWNLOADFAILED'),
            duration: 2000,
            showCloseButton: true
        }));
    });
}
function downloadFileWeb(url, fileName) {
    let oReq = new XMLHttpRequest();
    oReq.open('GET', url, true);
    oReq.responseType = 'blob';
    oReq.onreadystatechange = function () {
        if (oReq.readyState === 4) {
            showToast({
                message: translate('DOWNLOADSUCCESS'),
                duration: 2000,
                icon: 'yo-icon success'
            });
        }
    };
    oReq.onload = function (oEvent) {
        return download(oReq.response, fileName);
    };
    oReq.send(null);
}

class ExifRestorer {
    constructor() {
        this.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    }
    encode64(input) {
        let output = '';
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        do {
            chr1 = input[i++];
            chr2 = input[i++];
            chr3 = input[i++];
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';
        } while (i < input.length);
        return output;
    }
    restore(origFileBase64, resizedFileBase64) {
        if (!origFileBase64.match('data:image/jpeg;base64,')) {
            return resizedFileBase64;
        }
        let rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));
        let segments = this.slice2Segments(rawImage);
        let image = this.exifManipulation(resizedFileBase64, segments);
        return 'data:image/jpeg;base64,' + this.encode64(image);
    }
    exifManipulation(resizedFileBase64, segments) {
        let exifArray = this.getExifArray(segments);
        let newImageArray = this.insertExif(resizedFileBase64, exifArray);
        let aBuffer = new Uint8Array(newImageArray);
        return aBuffer;
    }
    getExifArray(segments) {
        let seg;
        for (let x = 0; x < segments.length; x++) {
            seg = segments[x];
            if (seg[0] === 255 && seg[1] === 225) {
                return seg;
            }
        }
        return [];
    }
    insertExif(resizedFileBase64, exifArray) {
        let imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');
        let buf = this.decode64(imageData);
        let separatePoint = buf.indexOf(255, 3);
        let mae = buf.slice(0, separatePoint);
        let ato = buf.slice(separatePoint);
        let array = mae;
        array = array.concat(exifArray);
        array = array.concat(ato);
        return array;
    }
    slice2Segments(rawImageArray) {
        let head = 0;
        let segments = [];
        while (1) {
            if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 218) {
                break;
            }
            if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 216) {
                head += 2;
            }
            else {
                let length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
                let endPoint = head + length + 2;
                let seg = rawImageArray.slice(head, endPoint);
                segments.push(seg);
                head = endPoint;
            }
            if (head > rawImageArray.length) {
                break;
            }
        }
        return segments;
    }
    decode64(input) {
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        let buf = [];
        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        let base64test = /[^A-Za-z0-9\+\/\=]/g;
        // if (base64test.exec(input)) {
        //     alert('There were invalid base64 characters in the input text.\n' +
        //         'Valid base64 characters are A-Z, a-z, 0-9, ' + ', ' / ',and ' = '\n' +
        //         'Expect errors in decoding.');
        // }
        input = input.replace(base64test, '');
        do {
            enc1 = this.KEY_STR.indexOf(input.charAt(i++));
            enc2 = this.KEY_STR.indexOf(input.charAt(i++));
            enc3 = this.KEY_STR.indexOf(input.charAt(i++));
            enc4 = this.KEY_STR.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            buf.push(chr1);
            if (enc3 !== 64) {
                buf.push(chr2);
            }
            if (enc4 !== 64) {
                buf.push(chr3);
            }
            chr1 = chr2 = chr3 = '';
            enc1 = enc2 = enc3 = enc4 = '';
        } while (i < input.length);
        return buf;
    }
}

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DocumentViewerOriginal = /** @class */ (function (_super) {
    __extends$3(DocumentViewerOriginal, _super);
    function DocumentViewerOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentViewerOriginal.prototype.getSupportInfo = function () { return cordova$1(this, "getSupportInfo", {}, arguments); };
    DocumentViewerOriginal.prototype.canViewDocument = function (url, contentType, options, onPossible, onMissingApp, onImpossible, onError) { return cordova$1(this, "canViewDocument", { "sync": true }, arguments); };
    DocumentViewerOriginal.prototype.viewDocument = function (url, contentType, options, onShow, onClose, onMissingApp, onError) { return cordova$1(this, "viewDocument", { "sync": true }, arguments); };
    DocumentViewerOriginal.pluginName = "Document Viewer";
    DocumentViewerOriginal.plugin = "cordova-plugin-document-viewer";
    DocumentViewerOriginal.pluginRef = "SitewaertsDocumentViewer";
    DocumentViewerOriginal.repo = "https://github.com/sitewaerts/cordova-plugin-document-viewer";
    DocumentViewerOriginal.platforms = ["Android", "iOS", "Windows"];
    return DocumentViewerOriginal;
}(IonicNativePlugin));
var DocumentViewer = new DocumentViewerOriginal();

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FileOpenerOriginal = /** @class */ (function (_super) {
    __extends$4(FileOpenerOriginal, _super);
    function FileOpenerOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileOpenerOriginal.prototype.open = function (filePath, fileMIMEType) { return cordova$1(this, "open", { "callbackStyle": "object", "successName": "success", "errorName": "error" }, arguments); };
    FileOpenerOriginal.prototype.uninstall = function (packageId) { return cordova$1(this, "uninstall", { "callbackStyle": "object", "successName": "success", "errorName": "error" }, arguments); };
    FileOpenerOriginal.prototype.appIsInstalled = function (packageId) { return cordova$1(this, "appIsInstalled", { "callbackStyle": "object", "successName": "success", "errorName": "error" }, arguments); };
    FileOpenerOriginal.pluginName = "FileOpener";
    FileOpenerOriginal.plugin = "cordova-plugin-file-opener2";
    FileOpenerOriginal.pluginRef = "cordova.plugins.fileOpener2";
    FileOpenerOriginal.repo = "https://github.com/pwlin/cordova-plugin-file-opener2";
    FileOpenerOriginal.platforms = ["Android", "iOS", "Windows", "Windows Phone 8"];
    return FileOpenerOriginal;
}(IonicNativePlugin));
var FileOpener = new FileOpenerOriginal();

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
var _kMaxLength = kMaxLength();
function typedArraySupport () {
  return true;
  // rollup issues
  // try {
  //   var arr = new Uint8Array(1)
  //   arr.__proto__ = {
  //     __proto__: Uint8Array.prototype,
  //     foo: function () { return 42 }
  //   }
  //   return arr.foo() === 42 && // typed array instances can be augmented
  //       typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
  //       arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  // } catch (e) {
  //   return false
  // }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    // Object.defineProperty(Buffer, Symbol.species, {
    //   value: null,
    //   configurable: true
    // })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

var jsUuid = createCommonjsModule(function (module) {
// Written by Robert Kieffer – https://github.com/broofa/node-uuid
// MIT License - http://opensource.org/licenses/mit-license.php
// The wrapped node-uuid library is at version 1.4.7

function UUID () {
  'use strict';

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng, _mathRNG, _whatwgRNG;

  // Allow for MSIE11 msCrypto
  var _crypto = window.crypto || window.msCrypto;

  if (!_rng && _crypto && _crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    try {
      var _rnds8 = new Uint8Array(16);
      _whatwgRNG = _rng = function whatwgRNG() {
        _crypto.getRandomValues(_rnds8);
        return _rnds8;
      };
      _rng();
    } catch(e) {}
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _mathRNG = _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) { r = Math.random() * 0x100000000; }
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
    if ('undefined' !== typeof console && console.warn) {
      console.warn('[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()');
    }
  }

  // Buffer class to use
  var BufferClass = ('function' === typeof Buffer) ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = (options.clockseq != null) ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = (options.msecs != null) ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = (options.nsecs != null) ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) === 'string') {
      buf = (options === 'binary') ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;
  uuid._rng = _rng;
  uuid._mathRNG = _mathRNG;
  uuid._whatwgRNG = _whatwgRNG;

  return uuid;
}

// check for Module/AMD support, otherwise call the uuid function to setup the angular module.
if ('object' !== 'undefined' && module.exports) {
  module.exports = new UUID();

} else if (typeof undefined !== 'undefined' && undefined.amd) {
  // AMD. Register as an anonymous module.
  undefined (function() {
    return new UUID();
  });
  
} else {
  window.uuid = UUID();
}
});

const exifRestorer = new ExifRestorer();
function getUUID() {
    return jsUuid.v4();
}
function isBase64(file) {
    let retVal = file && file.indexOf && file.indexOf('data:') === 0 && file !== 'data:,';
    return retVal;
}
function isFileUri(file) {
    let retVal;
    if (isIOS()) {
        retVal = file && file.indexOf && (file.indexOf('file:') === 0 || file.indexOf('/var/mobile') === 0);
    }
    else {
        retVal = file && file.indexOf && file.indexOf('file:') === 0;
    }
    return retVal;
}
function isImageFile(file) {
    return isFile(file) || isBase64(file) || isFileUri(file);
}
function read$1(nativeFile, type = 'blob', encoding) {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            resolve(e.target.result);
        };
        fileReader.onerror = e => reject(e);
        if (type === 'blob') {
            fileReader.readAsDataURL(nativeFile);
        }
        else if (type === 'binary') {
            fileReader.readAsBinaryString(nativeFile);
        }
        else {
            fileReader.readAsText(nativeFile, encoding);
        }
    });
}
function changeExtension(filename, extension) {
    let split = filename.split('.');
    split[split.length - 1] = extension;
    return split.reduce((a, b) => a + '.' + b);
}
function toPng(value) {
    if (value) {
        return value.substr(0, value.lastIndexOf('.')) + '.png';
    }
    return '';
}
function getMaxSize(extension) {
    return 100000000;
}
function isValid(file) {
    let extension = getExtension(file);
    if (file.size < getMaxSize(extension)) {
        return true;
    }
    return false;
}
function getMimeType(file) {
    let extension = getExtension(file);
    switch (extension) {
        case 'pdf':
            return 'application/pdf';
        case 'xls':
            return 'application/vnd.ms-excel';
        case 'xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        case 'csv':
            return 'text/csv';
        case 'ppt':
            return 'application/vnd.ms-powerpoint';
        case 'pptx':
            return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        case 'doc':
            return 'application/msword';
        case 'docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        case 'png':
            return 'image/png';
        case 'jpeg':
        case 'jpg':
            return 'image/jpeg';
        case 'gif':
            return 'image/gif';
        case 'bmp':
            return 'image/bmp';
        case 'mp4':
        case 'm4v':
            return 'video/mp4';
        case '3gp':
        case '3gpp':
            return 'video/3gpp';
        case 'mov':
            return 'video/mp4';
        case 'mpg':
            return 'video/mpg';
        case 'avi':
            return 'video/avi';
        case 'mp3':
            return 'audio/mpeg';
        case 'wav':
            return 'audio/wav';
        default:
            return 'image/jpeg';
    }
}
function fileHasIcon(file) {
    if (isImage(file) || isVideo(file)) {
        return false;
    }
    return true;
}
function getIcon(file) {
    let extension = getExtension(file);
    switch (extension) {
        case 'pdf':
            return 'yo-file-pdf danger';
        case 'xls':
        case 'xlsx':
        case 'csv':
            return 'yo-file-excel success';
        case 'ppt':
        case 'pptx':
            return 'yo-file-powerpoint warning';
        case 'doc':
        case 'docx':
            return 'yo-file-word accent';
        default:
            if (isImage(file)) {
                return 'yo-image royal';
            }
            if (isVideo(file)) {
                return 'yo-svg-play';
            }
            if (isAudio(file)) {
                return 'yo-play';
            }
            return 'yo-attach-file';
    }
}
function getVideoPoster(value) {
    if (isVideo(value)) {
        value = value.substr(0, value.lastIndexOf('.')) + '.png';
    }
    return value;
}
function b64toBlob(b64Data, contentType = null, sliceSize = 512) {
    if (!contentType) {
        contentType = getBase64MimeType(b64Data);
    }
    b64Data = b64Data.replace('data:' + contentType + ';base64,', '').replace(/\s/g, '');
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
function blobToFile(blob) {
    if (blob) {
        blob.lastModifiedDate = new Date();
        blob.name = getUUID() + '.jpg';
    }
    return blob;
}
function b64ToFile(data, file) {
    let blob = b64toBlob(data);
    blob.lastModifiedDate = new Date();
    blob.name = file.name;
    return blob;
}
function saveBase64AsImageFile(data) {
    let newName = Math.random()
        .toString(36)
        .substr(2) + getBase64Extension(data);
    let dataBlob = b64toBlob(data);
    return getNativeDirectory('images').then((directory) => {
        return fileNativeWriteFile(directory.nativeURL, newName, dataBlob, { replace: true });
    }, err => { });
}
function resizeBase64Image(base64, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let ratio = 1;
            if (img.width > maxWidth || img.height > maxHeight) {
                ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                img.width *= ratio;
                img.height *= ratio;
            }
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            let data = canvas.toDataURL('image/jpeg', 0.7);
            data = exifRestorer.restore(base64, data);
            canvas = null;
            resolve(data);
        };
        img.src = base64;
    });
}
function rotateBase64Image(base64data, degrees, enableURI, useFile = false) {
    return new Promise(function (resolve, reject) {
        //assume 90 degrees if not provided
        degrees = degrees || degrees === 0 ? degrees : 90;
        let canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'hidden-canvas');
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        let image = new Image();
        //assume png if not provided
        if (useFile) {
            image.src = new Cloudinary(base64data).getUrl();
        }
        else {
            image.src = (base64data.indexOf(',') === -1 ? 'data:image/png;base64,' : '') + base64data;
        }
        image.onload = function () {
            let w = image.width;
            let h = image.height;
            let rads = (degrees * Math.PI) / 180;
            let c = Math.cos(rads);
            let s = Math.sin(rads);
            if (s < 0) {
                s = -s;
            }
            if (c < 0) {
                c = -c;
            }
            //use translated width and height for new canvas
            canvas.width = h * s + w * c;
            canvas.height = h * c + w * s;
            //draw the rect in the center of the newly sized canvas
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((degrees * Math.PI) / 180);
            ctx.drawImage(image, -image.width / 2, -image.height / 2);
            //assume plain base64 if not provided
            resolve(enableURI ? canvas.toDataURL() : canvas.toDataURL().split(',')[1]);
            document.body.removeChild(canvas);
        };
        image.onerror = function () {
            reject('Unable to rotate data\n' + image.src);
        };
    });
}
function getBase64MimeType(base64) {
    return base64.split(';')[0].replace('data:', '');
}
function getBase64Extension(base64) {
    let mimeType = getBase64MimeType(base64);
    switch (mimeType) {
        case 'image/png':
            return '.png';
        case 'image/jpeg':
        case 'image/jpg':
            return '.jpg';
        default:
            return '.' + mimeType.split('/')[1];
    }
}
function resizeImage(file, maxWidth, maxHeight) {
    if (!maxWidth || !maxHeight) {
        return Promise.resolve(file);
    }
    return read$1(file)
        .then((base64) => {
        return resizeBase64Image(base64, maxWidth, maxHeight);
    })
        .then((data) => {
        let f = b64ToFile(data, file);
        return f;
    });
}
function getNativeDirectory(subfolder) {
    if (isCordova()) {
        return File.resolveDirectoryUrl(File.dataDirectory).then(dataDirectory => {
            return File.getDirectory(dataDirectory, subfolder, { create: true });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, fileSys => {
                fileSys.root.getDirectory(subfolder, {
                    create: true
                }, directory => {
                    resolve(directory);
                });
            });
        });
    }
}
function updatePathSessionId(oldPath) {
    if (!oldPath) {
        return Promise.resolve(oldPath);
    }
    return resolveFilePath(oldPath).then(res => {
        return Promise.resolve(res.nativeURL);
    });
}
function urlToFileBlob(filePath) {
    let newPath = filePath;
    if (filePath && filePath.startsWith('_file_')) {
        newPath = `${window.WEBVIEW_SERVER_URL}/${newPath}`;
    }
    return fetch(newPath).then(res => {
        if (res && res.blob) {
            return res.blob();
        }
        else {
            return null;
        }
    });
}
function resolveFilePath(filePath) {
    if (isCordova()) {
        if (filePath.indexOf('/var/mobile') === 0) {
            filePath = 'file://' + filePath;
        }
        return File.resolveLocalFilesystemUrl(filePath)
            .then((fileEntry) => {
            return fileEntry;
        })
            .catch(err => {
            let fileError = err && err.message ? err.message : 'File Error';
            // For IOS, if the app is updated, the original file path won't be found because the image directory url is changed.
            // Therefore, we need to change the incorrect directory url part in the original file path to retrieve the file successfully.
            if (isIOS() && fileError === 'NOT_FOUND_ERR') {
                return getNativeDirectory('images').then((directory) => {
                    let pathPartials = filePath.split('/');
                    let directoryPartials = directory.nativeURL.split('/');
                    // directoryPartials[8] is the changed part
                    filePath = filePath.replace(pathPartials[8], directoryPartials[8]);
                    return File.resolveLocalFilesystemUrl(filePath).then((fileEntry) => {
                        return fileEntry;
                    }, () => {
                        return Promise.reject(fileError);
                    });
                }, () => {
                    return Promise.reject(fileError);
                });
            }
            return Promise.reject(fileError);
        });
    }
    else {
        return new Promise((resolve, reject) => {
            window.resolveLocalFileSystemURL(filePath, fileEntry => resolve(fileEntry), err => reject(err));
        });
    }
}
function fixImageOrientation(path, fileName) {
    return File.readAsArrayBuffer(path, fileName).then(arrayBuffer => {
        let view;
        try {
            view = new DataView(arrayBuffer);
        }
        catch (error) {
            return Promise.reject(error);
        }
        if (view.getUint16(0, false) !== 0xffd8) {
            return view;
        }
        let length = view.byteLength, offset = 2;
        while (offset < length) {
            let marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xffe1) {
                if (view.getUint32((offset += 2), false) !== 0x45786966) {
                    return view;
                }
                let little = view.getUint16((offset += 6), false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                let tags = view.getUint16(offset, little);
                offset += 2;
                for (let i = 0; i < tags; i++) {
                    if (view.getUint16(offset + i * 12, little) === 0x0112) {
                        let orientation = view.getUint16(offset + i * 12 + 8, little);
                        if (orientation !== 0) {
                            view.setUint16(offset + i * 12 + 8, 0);
                        }
                        return view;
                    }
                }
            }
            else if ((marker & 0xff00) !== 0xff00) {
                break;
            }
            else {
                offset += view.getUint16(offset, false);
            }
        }
        return view;
    });
}
//should only be called in cordova
function moveToImageDirectory(originalFilePath, disableOrientationFix = false, fileName = '') {
    if (!isCordova()) {
        return Promise.resolve(originalFilePath);
    }
    else {
        return File.resolveLocalFilesystemUrl(originalFilePath).then((fileEntry) => {
            // For samsung device image, modify the image exif before saving to the new path
            let pathPartials = originalFilePath.split('/');
            pathPartials.pop();
            let fileDirPath = pathPartials.join('/');
            let newName;
            try {
                newName = getUUID() + (fileName || '') + '.' + getExtension(originalFilePath);
            }
            catch (err) {
                newName =
                    Math.random()
                        .toString(36)
                        .substr(2) +
                        (fileName || '') +
                        '.' +
                        getExtension(originalFilePath);
            }
            if (disableOrientationFix !== true && isCordova() && isSamsung()) {
                return promiseTimeout(5000, fixImageOrientation(fileDirPath, fileEntry.name)).then(fixedDataView => {
                    return getNativeDirectory('images').then((directory) => {
                        let blob = new Blob([fixedDataView], { type: 'octet/stream' });
                        return fileNativeWriteFile(directory.nativeURL, newName, blob, { replace: true });
                    }, err => {
                        return originalFilePath;
                    });
                }, err => {
                    return moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath);
                });
            }
            else {
                return moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath);
            }
        });
    }
}
function moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath) {
    return getNativeDirectory('images').then((directory) => {
        return File.copyFile(fileDirPath, fileEntry.name, directory.nativeURL, newName).then(newFileEntry => {
            return newFileEntry.nativeURL;
        });
    }, err => {
        return originalFilePath;
    });
}
function fileNativeWriteFile(path, fileName, text, options) {
    return File.writeFile(path, fileName, text, options).then((fileEntry) => {
        return fileEntry.nativeURL;
    }, err => { });
}
function fileNativeCheckFile(path, fileName) {
    return File.checkFile(path, fileName).then(fileExists => {
        return true;
    }, err => {
        return false;
    });
}
function fixAbsolutePath(data) {
    if (isCordova() && Device.platform === 'iOS') {
        if (data && data.indexOf('file://') >= 0) {
            let path = data;
            let indexApp = path.indexOf('/Application/');
            let indexLibrary = path.indexOf('/Library/');
            if (indexApp > 0 && indexLibrary > 0) {
                return getNativeDirectory('images').then((directory) => {
                    let directoryPath = directory.nativeURL;
                    let indexAppDirectory = directoryPath.indexOf('/Application/');
                    let indexLibraryDirectory = directoryPath.indexOf('/Library/');
                    let UUID = directoryPath.substring(indexAppDirectory + 13, indexLibraryDirectory);
                    data = path.substring(0, indexApp) + '/Application/' + UUID + path.substring(indexLibrary);
                    return data;
                }, err => {
                    return data;
                });
            }
            else {
                return Promise.resolve(data);
            }
        }
        else {
            return Promise.resolve(data);
        }
    }
    else {
        return Promise.resolve(data);
    }
}
function getCloudinaryUrl(retVal) {
    if (!retVal || !retVal.cloudinary) {
        return null;
    }
    return retVal.cloudinary.eager && retVal.cloudinary.eager.length > 0 ? retVal.cloudinary.eager[0].secure_url || retVal.cloudinary.eager[0].url : retVal.cloudinary.secure_url || retVal.cloudinary.url;
}
function getLocalFilePath() {
    let path = '';
    if (isIOS()) {
        path = window.cordova.file.documentsDirectory;
    }
    else {
        path = window.cordova.file.externalDataDirectory;
    }
    return path;
}
function getLocalFileName(fileName) {
    let newfileName = cleanFileName(fileName);
    newfileName = newfileName.toLowerCase().replace(/[^a-zA-Z0-9.]+/g, '_');
    return newfileName;
}
function saveToLocalFile(blob, fileName) {
    let path = getLocalFilePath();
    fileName = getLocalFileName(fileName);
    let promise = File.writeFile(path, fileName, blob, {
        append: false,
        replace: true
    });
    // log.log(path);
    // log.log(fileName);
    return promise;
}
function downloadPdfToStorage(document) {
    let target = getLocalFilePath() + document._id + '.pdf';
    return downloadFileToDevice(document._downloadURL, target).then((fileEntry) => {
        let filepath = fileEntry.nativeURL;
        showToast({
            message: translate('DOWNLOADSUCCESS'),
            duration: 2000,
            showCloseButton: true
        });
        return filepath;
    });
}
function getUrlWithAnnotations(src, photo) {
    let value = clone(src);
    if (photo && photo.edit && photo.edit.indexOf('cloudinary') > 0) {
        let i = photo.edit.lastIndexOf('/');
        let j = photo.edit.lastIndexOf('.');
        let publicId = photo.edit.substr(i + 1, j - i - 1);
        let k = value.indexOf('upload/') + 7;
        value = value.slice(0, k) + 'l_' + publicId + ',w_1.0,h_1.0,fl_relative,c_fill' + value.slice(k - 1);
    }
    else if (photo && photo.edit && photo.edit.indexOf('storage.googleapis.com') > 0) {
        value = photo.edit;
    }
    return value;
}
function cleanFileName(fileName) {
    if (fileName && fileName.normalize) {
        fileName = fileName.normalize('NFD');
    }
    if (fileName && fileName.replace) {
        fileName = fileName.replace(/[\u0300-\u036f]/g, '');
    }
    return fileName || 'EMPTY';
}
function showPdfOnDevice(filePath, fileName = null) {
    return new Promise((resolve, reject) => {
        const onClose = res => {
            resolve(null);
        };
        const options = {
            title: fileName || 'PDF',
            autoClose: { onPause: true }
        };
        const onError = err => { }; //console.log('error in process can view', err);
        const onMissingApp = (appId, installer) => {
            if (confirm(translate('ANDROIDPDFCONFIRM'))) {
                installer();
            }
        };
        const onShow = () => { };
        DocumentViewer.viewDocument(filePath, 'application/pdf', options, onShow, onClose, onMissingApp, onError);
    });
}
function downloadFileToDevice(source, target) {
    let fileTransfer = FileTransfer$1.create();
    return fileTransfer.download(source, target);
}
function openBlob(blob, fileName, mimeType) {
    return saveToLocalFile(blob, fileName)
        .then((file) => {
        afterOpenBlob(file.nativeURL, mimeType);
    }, err => {
        this.log.error(err);
    })
        .catch(err => {
        this.log.error(err);
    });
}
function afterOpenBlob(filePath, mimeType) {
    return FileOpener.open(filePath, mimeType).then(() => { }, err => {
        this.log.error(err);
    });
}
function promiseTimeout(ms, promise) {
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in ' + ms + 'ms.');
        }, ms);
    });
    // Returns a race between our timeout and the passed in promise
    return Promise.race([promise, timeout]);
}

var hammer = createCommonjsModule(function (module) {
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined$1) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined$1) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined$1 || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined$1 && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined$1)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined$1 : undefined$1, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined$1) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined$1;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined$1;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined$1)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined$1;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined$1) {
            return;
        }
        if (handler === undefined$1) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined$1) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (typeof undefined$1 === 'function' && undefined$1.amd) {
    undefined$1(function() {
        return Hammer;
    });
} else if ('object' != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');
});

const Hammer = hammer;
const PAN = 'pan';
const PINCH = 'pinch';
const PRESS = 'press';
const ROTATE = 'rotate';
const SWIPE = 'swipe';
const TAP = 'tap';
const hammerTypes = {
    PAN,
    PINCH,
    PRESS,
    ROTATE,
    SWIPE,
    TAP
};
// These are numbers
const hammerDirections = {
    vertical: Hammer.DIRECTION_VERTICAL,
    horizontal: Hammer.DIRECTION_HORIZONTAL,
    all: Hammer.DIRECTION_ALL
};
function setupHammer(element, gestureType, hammerOptions) {
    let hammerController = new Hammer(element, hammerOptions);
    hammerController.on(gestureType, ev => {
        hammerOptions.handleFn(ev);
    });
    if (hammerOptions.direction) {
        switch (gestureType) {
            case hammerTypes.SWIPE:
            case hammerTypes.PAN: {
                hammerController.get(gestureType).set({ direction: hammerOptions.direction });
                break;
            }
        }
    }
}
function isTopSwipe(deltaY) {
    return deltaY < 0;
}
function isBottomSwipe(deltaY) {
    return deltaY > 0;
}

/*!
 * https://github.com/john-doherty/long-press
 */
function longPress(el) {
    let timer = null;
    // check if we're using a touch screen
    let isTouch = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    // switch to touch events if using a touch screen
    let mouseDown = isTouch ? 'touchstart' : 'mousedown';
    let mouseOut = isTouch ? 'touchcancel' : 'mouseout';
    let mouseUp = isTouch ? 'touchend' : 'mouseup';
    let mouseMove = isTouch ? 'touchmove' : 'mousemove';
    el.addEventListener(mouseDown, function (e) {
        let longPressDelayInMs = parseInt(el.getAttribute('data-long-press-delay') || '1500', 10);
        timer = setTimeout(fireLongPressEvent.bind(el), longPressDelayInMs);
    });
    // clear the timeout if the user releases the mouse/touch
    el.addEventListener(mouseUp, function (e) {
        clearTimeout(timer);
    });
    // clear the timeout if the user leaves the element
    el.addEventListener(mouseOut, function (e) {
        clearTimeout(timer);
    });
    // clear if the mouse moves
    el.addEventListener(mouseMove, function (e) {
        clearTimeout(timer);
    });
    function fireLongPressEvent() {
        this.dispatchEvent(new CustomEvent('long-press', { bubbles: true, cancelable: true }));
        clearTimeout(timer);
    }
}

var imgcache = createCommonjsModule(function (module) {
/*! imgcache.js
  Copyright 2012-2018 Christophe BENOIT

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/*jslint browser:true*/
/*global console,LocalFileSystem,device,FileTransfer,define,module,cordova,phonegap*/

var ImgCache = {
  version: '2.1.0',
  // options to override before using the library (but after loading this script!)
  options: {
    debug: false,                           /* call the log method ? */
    localCacheFolder: 'imgcache',           /* name of the cache folder */
    useDataURI: false,                      /* use src="data:.."? otherwise will use src="filesystem:.." */
    chromeQuota: 10 * 1024 * 1024,          /* allocated cache space : here 10MB */
    usePersistentCache: true,               /* false = use temporary cache storage */
    cacheClearSize: 0,                      /* size in MB that triggers cache clear on init, 0 to disable */
    headers: {},                            /* HTTP headers for the download requests -- e.g: headers: { 'Accept': 'application/jpg' } */
    withCredentials: false,                 /* indicates whether or not cross-site Access-Control requests should be made using credentials */
    skipURIencoding: false,                 /* enable if URIs are already encoded (skips call to sanitizeURI) */
    cordovaFilesystemRoot: null,            /* if specified, use one of the Cordova File plugin's app directories for storage */
    timeout: 0                              /* timeout delay in ms for xhr request */
  },
  overridables: {
    hash: function (s) {
      /* tiny-sha1 r4 (11/2011) - MIT License - http://code.google.com/p/tiny-sha1/ */
      /* jshint ignore:start */
      function U(a,b,c){while(0<c--)a.push(b);}function L(a,b){return (a<<b)|(a>>>(32-b))}function P(a,b,c){return a^b^c}function A(a,b){var c=(b&0xFFFF)+(a&0xFFFF),d=(b>>>16)+(a>>>16)+(c>>>16);return ((d&0xFFFF)<<16)|(c&0xFFFF)}var B="0123456789abcdef";return(function(a){var c=[],d=a.length*4,e;for(var i=0;i<d;i++){e=a[i>>2]>>((3-(i%4))*8);c.push(B.charAt((e>>4)&0xF)+B.charAt(e&0xF));}return c.join('')}((function(a,b){var c,d,e,f,g,h=a.length,v=0x67452301,w=0xefcdab89,x=0x98badcfe,y=0x10325476,z=0xc3d2e1f0,M=[];U(M,0x5a827999,20);U(M,0x6ed9eba1,20);U(M,0x8f1bbcdc,20);U(M,0xca62c1d6,20);a[b>>5]|=0x80<<(24-(b%32));a[(((b+65)>>9)<<4)+15]=b;for(var i=0;i<h;i+=16){c=v;d=w;e=x;f=y;g=z;for(var j=0,O=[];j<80;j++){O[j]=j<16?a[j+i]:L(O[j-3]^O[j-8]^O[j-14]^O[j-16],1);var k=(function(a,b,c,d,e){var f=(e&0xFFFF)+(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF),g=(e>>>16)+(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(f>>>16);return ((g&0xFFFF)<<16)|(f&0xFFFF)})(j<20?(function(t,a,b){return (t&a)^(~t&b)}(d,e,f)):j<40?P(d,e,f):j<60?(function(t,a,b){return (t&a)^(t&b)^(a&b)}(d,e,f)):P(d,e,f),g,M[j],O[j],L(c,5));g=f;f=e;e=L(d,30);d=c;c=k;}v=A(v,c);w=A(w,d);x=A(x,e);y=A(y,f);z=A(z,g);}return [v,w,x,y,z]}((function(t){var a=[],b=255,c=t.length*8;for(var i=0;i<c;i+=8){a[i>>5]|=(t.charCodeAt(i/8)&b)<<(24-(i%32));}return a}(s)).slice(),s.length*8))));
      /* jshint ignore:end */
    },
    log: function (str, level) {
      'use strict';
      if (ImgCache.options.debug) {
        if (level === LOG_LEVEL_INFO) { str = 'INFO: ' + str; }
        if (level === LOG_LEVEL_WARNING) { str = 'WARN: ' + str; }
        if (level === LOG_LEVEL_ERROR) { str = 'ERROR: ' + str; }
        console.log(str);
      }
    }
  },
  ready: false,
  attributes: {}
},
LOG_LEVEL_INFO = 1,
LOG_LEVEL_WARNING = 2,
LOG_LEVEL_ERROR = 3;

(function ($) {
  'use strict';

  /** Helpers *****************************************************************/
  var Helpers = {};

  // make sure the url does not contain funny characters like spaces that might make the download fail
  Helpers.sanitizeURI = function (uri) {
    if (ImgCache.options.skipURIencoding) {
      return uri;
    } else {
      if (uri.length >= 2 && uri[0] === '"' && uri[uri.length - 1] === '"') {
        uri = uri.substr(1, uri.length - 2);
      }
      var encodedURI = encodeURI(uri);
      /*
      TODO: The following bit of code will have to be checked first (#30)
      if (Helpers.isCordova()) {
          return encodedURI.replace(/%/g, '%25');
      }
      */
      return encodedURI;
    }
  };

  // with a little help from http://code.google.com/p/js-uri/
  Helpers.URI = function (str) {
    if (!str) { str = ''; }
    // Based on the regex in RFC2396 Appendix B.
    var parser = /^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/,
        result = str.match(parser);
    this.scheme    = result[1] || null;
    this.authority = result[2] || null;
    this.path      = result[3] || null;
    this.query     = result[4] || null;
    this.fragment  = result[5] || null;
  };
  // returns lower cased filename from full URI
  Helpers.URIGetFileName = function (fullpath) {
    if (!fullpath) {
      return;
    }
    //TODO: there must be a better way here.. (url encoded strings fail)
    var idx = fullpath.lastIndexOf('/');
    if (!idx) {
      return;
    }
    return fullpath.substr(idx + 1).toLowerCase();
  };

  // returns lower cased path from full URI
  Helpers.URIGetPath = function (str) {
    if (!str) {
      return;
    }
    var uri = Helpers.URI(str);
    return uri.path.toLowerCase();
  };

  // returns extension from filename (without leading '.')
  Helpers.fileGetExtension = function (filename) {
    if (!filename) {
      return '';
    }
    filename = filename.split('?')[0];
    var ext = filename.split('.').pop();
    // make sure it's a realistic file extension - for images no more than 4 characters long (.jpeg)
    if (!ext || ext.length > 4) {
      return '';
    }
    return ext;
  };

  Helpers.appendPaths = function (path1, path2) {
    if (!path2) {
      path2 = '';
    }
    if (!path1 || path1 === '') {
      return (path2.length > 0 && path2[0] == '/' ? '' : '/') + path2;
    }
    return path1 + ( ((path1[path1.length - 1] == '/') || (path2.length > 0 && path2[0] == '/')) ? '' : '/' ) + path2;
  };

  Helpers.hasJqueryOrJqueryLite = function () {
    return (ImgCache.jQuery || ImgCache.jQueryLite);
  };

  Helpers.isCordova = function () {
    return (typeof cordova !== 'undefined' || typeof phonegap !== 'undefined') && (cordova||phonegap).platformId !== 'browser';
  };

  Helpers.isCordovaAndroid = function () {
    return (Helpers.isCordova() && device && device.platform && device.platform.toLowerCase().indexOf('android') >= 0);
  };

  Helpers.isCordovaWindowsPhone = function () {
    return (Helpers.isCordova() && device && device.platform && ((device.platform.toLowerCase().indexOf('win32nt') >= 0) || (device.platform.toLowerCase().indexOf('windows') >= 0)));
  };

  Helpers.isCordovaIOS = function () {
    return (Helpers.isCordova() && device && device.platform && device.platform.toLowerCase() === 'ios');
  };

  // special case for #93
  Helpers.isCordovaAndroidOlderThan3_3 = function () {
    return (Helpers.isCordovaAndroid() && device.version && (
      device.version.indexOf('2.') === 0 ||
      device.version.indexOf('3.0') === 0 ||
      device.version.indexOf('3.1') === 0 ||
      device.version.indexOf('3.2') === 0
    ));
  };

  // special case for #47
  Helpers.isCordovaAndroidOlderThan4 = function () {
    return (Helpers.isCordovaAndroid() && device.version && (device.version.indexOf('2.') === 0 || device.version.indexOf('3.') === 0));
  };

  // Fix for #42 (Cordova versions < 4.0)
  Helpers.EntryToURL = function (entry) {
    if (Helpers.isCordovaAndroidOlderThan4() && typeof entry.toNativeURL === 'function') {
      return entry.toNativeURL();
    } else if (typeof entry.toInternalURL === 'function') {
      // Fix for #97
      return entry.toInternalURL();
    } else {
      return entry.toURL();
    }
  };

  // Returns a URL that can be used to locate a file
  Helpers.EntryGetURL = function (entry) {
    // toURL for html5, toURI for cordova 1.x
    return (typeof entry.toURL === 'function' ? Helpers.EntryToURL(entry) : entry.toURI());
  };

  // Returns the full absolute path from the root to the FileEntry
  Helpers.EntryGetPath = function (entry) {
    if (Helpers.isCordova()) {
      // #93
      if (Helpers.isCordovaIOS()) {
        if (Helpers.isCordovaAndroidOlderThan3_3()) {
          return entry.fullPath;
        } else {
          return entry.nativeURL;
        }
      }
      // From Cordova 3.3 onward toURL() seems to be required instead of fullPath (#38)
      return (typeof entry.toURL === 'function' ? Helpers.EntryToURL(entry) : entry.fullPath);
    } else {
      return entry.fullPath;
    }
  };

  Helpers.getCordovaStorageType = function (isPersistent) {
    // From Cordova 3.1 onward those constants have moved to the window object (#38)
    if (typeof LocalFileSystem !== 'undefined') {
      if (isPersistent && LocalFileSystem.hasOwnProperty('PERSISTENT')) {
        return LocalFileSystem.PERSISTENT;
      }
      if (!isPersistent && LocalFileSystem.hasOwnProperty('TEMPORARY')) {
        return LocalFileSystem.TEMPORARY;
      }
    }
    return (isPersistent ? window.PERSISTENT : window.TEMPORARY);
  };

  /****************************************************************************/

  /** DomHelpers **************************************************************/
  var DomHelpers = {};

  DomHelpers.trigger = function (DomElement, eventName) {
    if (ImgCache.jQuery) {
      $(DomElement).trigger(eventName);
    } else {
      /* CustomEvent polyfill */
      if (Helpers.isCordovaWindowsPhone() || !window.CustomEvent) {
        // CustomEvent for browsers which don't natively support the Constructor method
        window.CustomEvent = function CustomEvent(type, params) {
          var event;
          params = params || {bubbles: false, cancelable: false, detail: undefined};
          try {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
          } catch (error) {
            // for browsers that don't support CustomEvent at all, we use a regular event instead
            event = document.createEvent('Event');
            event.initEvent(type, params.bubbles, params.cancelable);
            event.detail = params.detail;
          }
          return event;
        };
      }
      DomElement.dispatchEvent(new CustomEvent(eventName));
    }
  };

  DomHelpers.removeAttribute = function (element, attrName) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      element.removeAttr(attrName);
    } else {
      element.removeAttribute(attrName);
    }
  };
  DomHelpers.setAttribute = function (element, attrName, value) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      element.attr(attrName, value);
    } else {
      element.setAttribute(attrName, value);
    }
  };
  DomHelpers.getAttribute = function (element, attrName) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      return element.attr(attrName);
    } else {
      return element.getAttribute(attrName);
    }
  };
  DomHelpers.getBackgroundImage = function (element) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      return element.attr('data-old-background') ? "url(" + element.attr('data-old-background') + ")" : element.css('background-image');
    } else {
      var style = window.getComputedStyle(element, null);
      if (!style) {
        return;
      }
      return element.getAttribute("data-old-background") ? "url(" + element.getAttribute("data-old-background") + ")" : style.backgroundImage;
    }
  };
  DomHelpers.setBackgroundImage = function (element, styleValue) {
    if (Helpers.hasJqueryOrJqueryLite()) {
      element.css('background-image', styleValue);
    } else {
      element.style.backgroundImage = styleValue;
    }
  };

  /****************************************************************************/

  /** Private *****************************************************************/
  var Private = { attributes: {} };

  Private.isImgCacheLoaded = function () {
    if (!ImgCache.attributes.filesystem || !ImgCache.attributes.dirEntry) {
      ImgCache.overridables.log('ImgCache not loaded yet! - Have you called ImgCache.init() first?', LOG_LEVEL_WARNING);
      return false;
    }
    return true;
  };

  Private.attributes.hasLocalStorage = false;
  Private.hasLocalStorage = function () {
    // if already tested, avoid doing the check again
    if (Private.attributes.hasLocalStorage) {
      return Private.attributes.hasLocalStorage;
    }
    try {
      var mod = ImgCache.overridables.hash('imgcache_test');
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      Private.attributes.hasLocalStorage = true;
      return true;
    } catch (e) {
      // this is an info, not an error
      ImgCache.overridables.log('Could not write to local storage: ' + e.message, LOG_LEVEL_INFO);
      return false;
    }
  };

  Private.setCurrentSize = function (curSize) {
    ImgCache.overridables.log('current size: ' + curSize, LOG_LEVEL_INFO);
    if (Private.hasLocalStorage()) {
      localStorage.setItem('imgcache:' + ImgCache.options.localCacheFolder, curSize);
    }
  };

  Private.getCachedFilePath = function (img_src) {
    return Helpers.appendPaths(ImgCache.options.localCacheFolder, Private.getCachedFileName(img_src));
  };

  // used for FileTransfer.download only
  Private.getCachedFileFullPath = function (img_src) {
    var local_root = Helpers.EntryGetPath(ImgCache.attributes.dirEntry);
    return Helpers.appendPaths(local_root, Private.getCachedFileName(img_src));
  };

  Private.getCachedFileName = function (img_src) {
    if (!img_src) {
      ImgCache.overridables.log('No source given to getCachedFileName', LOG_LEVEL_WARNING);
      return;
    }
    var hash = ImgCache.overridables.hash(img_src);
    var ext = Helpers.fileGetExtension(Helpers.URIGetFileName(img_src));
    return hash + (ext ? ('.' + ext) : '');
  };

  Private.setNewImgPath = function ($img, new_src, old_src) {
    DomHelpers.setAttribute($img, 'src', new_src);
    // store previous url in case we need to reload it
    DomHelpers.setAttribute($img, OLD_SRC_ATTR, old_src);
  };

  Private.createCacheDir = function (success_callback, error_callback) {
    if (!ImgCache.attributes.filesystem) {
      ImgCache.overridables.log('Filesystem instance was not initialised', LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(); }
      return;
    }
    var _fail = function (error) {
      ImgCache.overridables.log('Failed to get/create local cache directory: ' + error.code, LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(); }
    };
    var _getDirSuccess = function (dirEntry) {
      ImgCache.attributes.dirEntry = dirEntry;
      ImgCache.overridables.log('Local cache folder opened: ' + Helpers.EntryGetPath(dirEntry), LOG_LEVEL_INFO);

      //Put .nomedia file in cache directory so Android doesn't index it.
      if (Helpers.isCordovaAndroid()) {
        var _androidNoMediaFileCreated = function () {
          ImgCache.overridables.log('.nomedia file created.', LOG_LEVEL_INFO);
          if (success_callback) { success_callback(); }
        };

        dirEntry.getFile('.nomedia', {create: true, exclusive: false}, _androidNoMediaFileCreated, _fail);
      } else if (!Helpers.isCordovaWindowsPhone()) {
        // #73 - iOS: the directory should not be backed up in iCloud
        if (Helpers.isCordovaIOS() && dirEntry.setMetadata) {
          dirEntry.setMetadata(function () {
            /* success*/
            ImgCache.overridables.log('com.apple.MobileBackup metadata set', LOG_LEVEL_INFO);
          }, function () {
            /* failure */
            ImgCache.overridables.log('com.apple.MobileBackup metadata could not be set', LOG_LEVEL_WARNING);
          },
          {
            // 1=NO backup oddly enough..
            'com.apple.MobileBackup': 1
          });
        }

        if (success_callback) { success_callback(); }
      } else {
        if (success_callback) { success_callback(); }
      }

      ImgCache.ready = true;
      DomHelpers.trigger(document, IMGCACHE_READY_TRIGGERED_EVENT);
    };
    ImgCache.attributes.filesystem.root.getDirectory(ImgCache.options.localCacheFolder, {create: true, exclusive: false}, _getDirSuccess, _fail);
  };

  // This is a wrapper for phonegap's FileTransfer object in order to implement the same feature
  // in Chrome (and possibly extra browsers in the future)
  Private.FileTransferWrapper = function (filesystem) {
    if (Helpers.isCordova()) {
      // PHONEGAP
      this.fileTransfer = new FileTransfer();
    }
    this.filesystem = filesystem;    // only useful for CHROME
  };
  Private.FileTransferWrapper.prototype.download = function (uri, localPath, success_callback, error_callback, on_progress) {
    var headers = ImgCache.options.headers || {};
    var isOnProgressAvailable = (typeof on_progress === 'function');

    if (this.fileTransfer) {
      if (isOnProgressAvailable) {
        this.fileTransfer.onprogress = on_progress;
      }
      return this.fileTransfer.download(uri, localPath, success_callback, error_callback, false, { 'headers': headers });
    }

    var filesystem = this.filesystem;

    // CHROME - browsers
    var _fail = function (str, level, error_callback) {
      ImgCache.overridables.log(str, level);
      // mock up FileTransferError, so at least caller knows there was a problem.
      // Normally, the error.code in the callback is a FileWriter error, we return 0 if the error was an XHR error
      if (error_callback) {
        error_callback({code: 0, source: uri, target: localPath});
      }
    };
    var xhr = new XMLHttpRequest();
    xhr.open('GET', uri, true);
    if (isOnProgressAvailable) {
      xhr.onprogress = on_progress;
    }
    if (ImgCache.options.withCredentials) {
      xhr.withCredentials = true;
    }
    xhr.timeout = ImgCache.options.timeout;
    xhr.responseType = 'blob';
    for (var key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
    xhr.onload = function () {
      if (xhr.response && (xhr.status === 200 || xhr.status === 0)) {
        filesystem.root.getFile(localPath, { create:true }, function (fileEntry) {
          fileEntry.createWriter(function (writer) {
            writer.onerror = error_callback;
            writer.onwriteend = function () { success_callback(fileEntry);  };
            writer.write(xhr.response, error_callback);
          }, error_callback);
        }, error_callback);
      } else {
        _fail('Image ' + uri + ' could not be downloaded - status: ' + xhr.status, 3, error_callback);
      }
    };
    xhr.onerror = function () {
      _fail('XHR error - Image ' + uri + ' could not be downloaded - status: ' + xhr.status, 3, error_callback);
    };
    xhr.ontimeout = function () {
      _fail('XHR error - Image ' + uri + ' timed out - status: ' + xhr.status, 3, error_callback);
    };
    xhr.send();
  };

  Private.getBackgroundImageURL = function ($div) {
    var backgroundImageProperty = DomHelpers.getBackgroundImage($div);
    if (!backgroundImageProperty) {
      return;
    }
    var regexp = /url\s?\((.+)\)/;
    var img_src = regexp.exec(backgroundImageProperty)[1];
    return img_src.replace(/(['"])/g, '');
  };

  Private.getBase64DataFromEntry = function (entry, filename, success_callback, error_callback) {
    var _success = function (file) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        var base64content = e.target.result;
        if (base64content) {
          ImgCache.overridables.log('File ' + filename + ' loaded from cache', LOG_LEVEL_INFO);
          if (success_callback) { success_callback(base64content); }
        } else {
          ImgCache.overridables.log('File in cache ' + filename + ' is empty', LOG_LEVEL_WARNING);
          if (error_callback) { error_callback(filename); }
        }
      };
      reader.readAsDataURL(file);
    };
    var _failure = function (error) {
      ImgCache.overridables.log('Failed to read file ' + error.code, LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(filename); }
    };

    entry.file(_success, _failure);
  };

  Private.loadCachedFile = function ($element, img_src, set_path_callback, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    if (!$element) {
      ImgCache.overridables.log('First parameter of loadCachedFile is empty, should be a DOM element', LOG_LEVEL_ERROR);
      return;
    }

    var filename = Helpers.URIGetFileName(img_src);

    var _gotFileEntry = function (entry) {
      if (ImgCache.options.useDataURI) {
        Private.getBase64DataFromEntry(entry, filename, function (base64content) {
          set_path_callback($element, base64content, img_src);
          if (success_callback) { success_callback($element); }
        }, function () {
          if (error_callback) { error_callback($element); }
        });
      } else {
        // using src="filesystem:" kind of url
        var new_url = Helpers.EntryGetURL(entry);
        set_path_callback($element, new_url, img_src);
        ImgCache.overridables.log('File ' + filename + ' loaded from cache', LOG_LEVEL_INFO);
        if (success_callback) { success_callback($element); }
      }
    };
    // if file does not exist in cache, cache it now!
    var _fail = function () {
      ImgCache.overridables.log('File ' + filename + ' not in cache', LOG_LEVEL_INFO);
      if (error_callback) { error_callback($element); }
    };
    ImgCache.attributes.filesystem.root.getFile(Private.getCachedFilePath(img_src), {create: false}, _gotFileEntry, _fail);
  };

  Private.setBackgroundImagePath = function ($element, new_src, old_src) {
    DomHelpers.setBackgroundImage($element, 'url("' + new_src + '")');
    // store previous url in case we need to reload it
    DomHelpers.setAttribute($element, OLD_BACKGROUND_ATTR, old_src);
  };

  /****************************************************************************/


  var OLD_SRC_ATTR = 'data-old-src',
      OLD_BACKGROUND_ATTR = 'data-old-background',
      IMGCACHE_READY_TRIGGERED_EVENT = 'ImgCacheReady';

  ImgCache.init = function (success_callback, error_callback) {
    ImgCache.jQuery = (window.jQuery || window.Zepto) ? true : false;        /* using jQuery if it's available otherwise the DOM API */
    ImgCache.jQueryLite = (typeof window.angular !== 'undefined' && window.angular.element) ? true : false;    /* is AngularJS jQueryLite available */

    ImgCache.attributes.init_callback = success_callback;

    ImgCache.overridables.log('ImgCache initialising', LOG_LEVEL_INFO);

    var _checkSize = function (callback) {
      if (ImgCache.options.cacheClearSize > 0) {
        var curSize = ImgCache.getCurrentSize();
        if (curSize > (ImgCache.options.cacheClearSize * 1024 * 1024)) {
          ImgCache.clearCache(callback, callback);
        } else {
          if (callback) { callback(); }
        }
      } else {
        if (callback) { callback(); }
      }
    };
    var _gotFS = function (filesystem) {
      ImgCache.overridables.log('LocalFileSystem opened', LOG_LEVEL_INFO);

      // store filesystem handle
      ImgCache.attributes.filesystem = filesystem;

      Private.createCacheDir(function () {
        _checkSize(ImgCache.attributes.init_callback);
      }, error_callback);
    };
    var _fail = function (error) {
      ImgCache.overridables.log('Failed to initialise LocalFileSystem ' + error.code, LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(); }
    };
    if (Helpers.isCordova() && window.requestFileSystem) {
      // PHONEGAP
      if (ImgCache.options.cordovaFilesystemRoot) {
        try {
          window.resolveLocalFileSystemURL(
            ImgCache.options.cordovaFilesystemRoot,
            function (dirEntry) {
                _gotFS({ root: dirEntry });
            },
            _fail
          );
        } catch (e) {
          _fail({ code: e.message });
        }
      } else {
        window.requestFileSystem(Helpers.getCordovaStorageType(ImgCache.options.usePersistentCache), 0, _gotFS, _fail);
      }
    } else {
      //CHROME
      var savedFS = window.requestFileSystem || window.webkitRequestFileSystem;
      window.storageInfo = window.storageInfo || (ImgCache.options.usePersistentCache ? navigator.webkitPersistentStorage : navigator.webkitTemporaryStorage);
      if (!window.storageInfo) {
        ImgCache.overridables.log('Your browser does not support the html5 File API', LOG_LEVEL_WARNING);
        if (error_callback) { error_callback(); }
        return;
      }
      // request space for storage
      var quota_size = ImgCache.options.chromeQuota;
      window.storageInfo.requestQuota(
        quota_size,
        function () {
          /* success*/
          var persistence = (ImgCache.options.usePersistentCache ? window.PERSISTENT : window.TEMPORARY);
          savedFS(persistence, quota_size, _gotFS, _fail);
        },
        function (error) {
          /* error*/
          ImgCache.overridables.log('Failed to request quota: ' + error.message, LOG_LEVEL_ERROR);
          if (error_callback) { error_callback(); }
        }
      );
    }
  };

  ImgCache.getCurrentSize = function () {
    if (Private.hasLocalStorage()) {
      var curSize = localStorage.getItem('imgcache:' + ImgCache.options.localCacheFolder);
      if (curSize === null) {
        return 0;
      }
      return parseInt(curSize, 10);
    } else {
      return 0;
    }
  };

  // this function will not check if the image is already cached or not => it will overwrite existing data
  // on_progress callback follows this spec: http://www.w3.org/TR/2014/REC-progress-events-20140211/ -- see #54
  ImgCache.cacheFile = function (img_src, success_callback, error_callback, on_progress) {
    if (!Private.isImgCacheLoaded() || !img_src) {
      return;
    }

    img_src = Helpers.sanitizeURI(img_src);

    var filePath = Private.getCachedFileFullPath(img_src);

    var fileTransfer = new Private.FileTransferWrapper(ImgCache.attributes.filesystem);
    fileTransfer.download(
      img_src,
      filePath,
      function (entry) {
        entry.getMetadata(function (metadata) {
          if (metadata && ('size' in metadata)) {
            ImgCache.overridables.log('Cached file size: ' + metadata.size, LOG_LEVEL_INFO);
            Private.setCurrentSize(ImgCache.getCurrentSize() + parseInt(metadata.size, 10));
          } else {
            ImgCache.overridables.log('No metadata size property available', LOG_LEVEL_INFO);
          }
        });
        ImgCache.overridables.log('Download complete: ' + Helpers.EntryGetPath(entry), LOG_LEVEL_INFO);

        // iOS: the file should not be backed up in iCloud
        // new from cordova 1.8 only
        if (entry.setMetadata) {
          entry.setMetadata(
            function () {
              /* success*/
              ImgCache.overridables.log('com.apple.MobileBackup metadata set', LOG_LEVEL_INFO);
            },
            function () {
              /* failure */
              ImgCache.overridables.log('com.apple.MobileBackup metadata could not be set', LOG_LEVEL_WARNING);
            },
            {
              // 1=NO backup oddly enough..
              'com.apple.MobileBackup': 1
            }
          );
        }

        if (success_callback) {
          success_callback(entry.toURL());
        }
      },
      function (error) {
        if (error.source) { ImgCache.overridables.log('Download error source: ' + error.source, LOG_LEVEL_ERROR); }
        if (error.target) { ImgCache.overridables.log('Download error target: ' + error.target, LOG_LEVEL_ERROR); }
        ImgCache.overridables.log('Download error code: ' + error.code, LOG_LEVEL_ERROR);
        if (error_callback) { error_callback(); }
      },
      on_progress
    );
  };

  // Returns the file already available in the cached
  // Reminder: this is an asynchronous method!
  // Answer to the question comes in response_callback as the second argument (first being the path)
  ImgCache.getCachedFile = function (img_src, response_callback) {
    // sanity check
    if (!Private.isImgCacheLoaded() || !response_callback) {
      return;
    }

    var original_img_src = img_src;
    img_src = Helpers.sanitizeURI(img_src);

    var path = Private.getCachedFilePath(img_src);
    if (Helpers.isCordovaAndroid()) {
      // This hack is probably only used for older versions of Cordova
      if (path.indexOf('file://') === 0) {
        // issue #4 -- android cordova specific
        path = path.substr(7);
      }
    }

    // try to get the file entry: if it fails, there's no such file in the cache
    ImgCache.attributes.filesystem.root.getFile(
      path,
      { create: false },
      function (file_entry) { response_callback(img_src, file_entry); },
      function () { response_callback(original_img_src, null); }
    );
  };

  // Returns the local url of a file already available in the cache
  ImgCache.getCachedFileURL = function (img_src, success_callback, error_callback) {
    var _getURL = function (img_src, entry) {
      if (entry) {
        success_callback(img_src, Helpers.EntryGetURL(entry));
      } else {
        if (error_callback) { error_callback(img_src); }
      }
    };

    ImgCache.getCachedFile(img_src, _getURL);
  };

  ImgCache.getCachedFileBase64Data = function (img_src, success_callback, error_callback) {
    var _getData = function(img_src, entry) {
      if (entry) {
        Private.getBase64DataFromEntry(entry, img_src, function (base64content) {
          success_callback(img_src, base64content);
        }, error_callback);
      } else {
        if (error_callback) { error_callback(img_src); }
      }
    };

    ImgCache.getCachedFile(img_src, _getData);
  };

  // checks if a copy of the file has already been cached
  // Reminder: this is an asynchronous method!
  // Answer to the question comes in response_callback as the second argument (first being the path)
  ImgCache.isCached = function (img_src, response_callback) {
    ImgCache.getCachedFile(img_src, function (src, file_entry) {
      response_callback(src, file_entry !== null);
    });
  };

  // $img: jQuery object of an <img/> element
  // Synchronous method
  ImgCache.useOnlineFile = function ($img) {
    if (!Private.isImgCacheLoaded() || !$img) {
      return;
    }

    var prev_src = DomHelpers.getAttribute($img, OLD_SRC_ATTR);
    if (prev_src) {
      DomHelpers.setAttribute($img, 'src', prev_src);
    }
    DomHelpers.removeAttribute($img, OLD_SRC_ATTR);
  };


  // $img: jQuery object of an <img/> element
  ImgCache.useCachedFile = function ($img, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    var img_url = Helpers.sanitizeURI(DomHelpers.getAttribute($img, 'src'));

    Private.loadCachedFile($img, img_url, Private.setNewImgPath, success_callback, error_callback);
  };

  // When the source url is not the 'src' attribute of the given img element
  ImgCache.useCachedFileWithSource = function ($img, image_url, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    var img_url = Helpers.sanitizeURI(image_url);

    Private.loadCachedFile($img, img_url, Private.setNewImgPath, success_callback, error_callback);
  };

  // clears the cache
  ImgCache.clearCache = function (success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    // delete cache dir completely
    ImgCache.attributes.dirEntry.removeRecursively(
      function () {
        ImgCache.overridables.log('Local cache cleared', LOG_LEVEL_INFO);
        Private.setCurrentSize(0);
        // recreate the cache dir now
        Private.createCacheDir(success_callback, error_callback);
      },
      function (error) {
        ImgCache.overridables.log('Failed to remove directory or its contents: ' + error.code, LOG_LEVEL_ERROR);
        if (error_callback) { error_callback(); }
      }
    );
  };

  ImgCache.removeFile = function (img_src, success_callback, error_callback) {
    img_src = Helpers.sanitizeURI(img_src);

    var filePath = Private.getCachedFilePath(img_src);
    var _fail = function (error) {
      ImgCache.overridables.log('Failed to remove file due to ' + error.code, LOG_LEVEL_ERROR);
      if (error_callback) { error_callback(); }
    };
    ImgCache.attributes.filesystem.root.getFile(filePath, { create: false }, function (fileEntry) {
      fileEntry.remove(
        function () {
          if (success_callback) { success_callback(); }
        },
        _fail
      );
    }, _fail);
  };

  ImgCache.isBackgroundCached = function ($div, response_callback) {
    var img_src = Private.getBackgroundImageURL($div);
    ImgCache.getCachedFile(img_src, function (src, file_entry) {
      response_callback(src, file_entry !== null);
    });
  };

  ImgCache.cacheBackground = function ($div, success_callback, error_callback, on_progress) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    var img_src = Private.getBackgroundImageURL($div);
    if (!img_src) {
      ImgCache.overridables.log('No background to cache', LOG_LEVEL_WARNING);
      if (error_callback) { error_callback(); }
      return;
    }

    ImgCache.overridables.log('Background image URL: ' + img_src, LOG_LEVEL_INFO);
    ImgCache.cacheFile(img_src, success_callback, error_callback, on_progress);
  };

  ImgCache.useCachedBackground = function ($div, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    var img_src = Private.getBackgroundImageURL($div);
    if (!img_src) {
      ImgCache.overridables.log('No background to cache', LOG_LEVEL_WARNING);
      if (error_callback) { error_callback(); }
      return;
    }

    Private.loadCachedFile($div, img_src, Private.setBackgroundImagePath, success_callback, error_callback);
  };

  ImgCache.useCachedBackgroundWithSource = function ($div, image_url, success_callback, error_callback) {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    Private.loadCachedFile($div, image_url, Private.setBackgroundImagePath, success_callback, error_callback);
  };

  // $div: jQuery object of an element
  // Synchronous method
  // Method used to revert call to useCachedBackground
  ImgCache.useBackgroundOnlineFile = function ($div) {
    if (!$div) {
      return;
    }

    var prev_src = DomHelpers.getAttribute($div, OLD_BACKGROUND_ATTR);
    if (prev_src) {
      DomHelpers.setBackgroundImage($div, 'url("' + prev_src + '")');
    }
    DomHelpers.removeAttribute($div, OLD_BACKGROUND_ATTR);
  };

  // returns the URI of the local cache folder (filesystem:)
  // this function is more useful for the examples than for anything else..
  // Synchronous method
  ImgCache.getCacheFolderURI = function () {
    if (!Private.isImgCacheLoaded()) {
      return;
    }

    return Helpers.EntryGetURL(ImgCache.attributes.dirEntry);
  };

  // private methods can now be used publicly
  ImgCache.helpers = Helpers;
  ImgCache.domHelpers = DomHelpers;
  ImgCache.private = Private;

  /****************************************************************************/

  // Expose the class either via AMD, CommonJS or the global object
  if (typeof undefined === 'function' && undefined.amd) {
    undefined('imgcache', [], function () {
      return ImgCache;
    });
  }
  else if ('object' === 'object' && module.exports){
    module.exports = ImgCache;
  }
  else {
    window.ImgCache = ImgCache;
  }

})(window.jQuery || window.Zepto || function () { throw "jQuery is not available"; } );
});

imgcache.options.chromeQuota = 50 * 1024 * 1024;
// Need to set this location and decide where.
// ImgCache.options.localCacheFolder = '/image-cache';
// Until this is set use temp cache with setting below
// ImgCache.options.usePersistentCache = false;
imgcache.options.debug = false;
if (isCordova() && cordova.file && cordova.file.dataDirectory) {
    imgcache.options.cordovaFilesystemRoot = cordova.file.dataDirectory;
}
function isImageCacheAvailable() {
    return (window['isImageCacheAvailable'] !== false && isChrome()) || isCordova();
}
function imageCacheInit() {
    if (!isImageCacheAvailable()) {
        return Promise.resolve();
    }
    if (!window['isImgCacheInit']) {
        window['isImgCacheInit'] = true;
        return new Promise((resolve, reject) => {
            imgcache.init(() => {
                // tslint:disable-next-line:no-console
                console.log('image cache is init');
                resolve();
            }, () => {
                window['isImageCacheAvailable'] = false;
            });
        });
    }
    else {
        return Promise.resolve();
    }
}
function cacheFile(url, progress) {
    if (!isImageCacheAvailable()) {
        return Promise.resolve(url);
    }
    return imageCacheInit().then(() => {
        return new Promise((resolve, reject) => {
            imgcache.isCached(url, function (src, success) {
                if (!success) {
                    return imgcache.cacheFile(url, resolve, () => {
                        resolve();
                    }, progress);
                }
            });
        });
    });
}
function getCachedFileURL(url) {
    if (!isImageCacheAvailable()) {
        return Promise.resolve(url);
    }
    return imageCacheInit().then(() => {
        return new Promise((resolve, reject) => {
            imgcache.getCachedFileURL(url, (img_src, file_url) => {
                if (file_url === null) {
                    reject(null);
                }
                else {
                    if (isIOS() && isCordova()) {
                        return updatePathSessionId(file_url).then(updatedPath => resolve(updatedPath));
                    }
                    else if (isAndroid() && isCordova()) {
                        resolve(img_src);
                    }
                    else {
                        resolve(file_url);
                    }
                }
            });
        });
    });
}
function getCachedFileBase64Data(url) {
    if (!isImageCacheAvailable()) {
        return Promise.resolve(url);
    }
    return imageCacheInit().then(() => {
        return new Promise((resolve, reject) => {
            imgcache.getCachedFileBase64Data(url, (img_src, file_url) => {
                if (file_url === null) {
                    reject();
                }
                else {
                    resolve(file_url);
                }
            });
        });
    });
}

class Pipe {
    transform(value, options = {}) {
        return null;
    }
}

class CurrencyPipe extends Pipe {
    transform(value, options = '€') {
        let precision;
        if (!value && value !== 0) {
            return '';
        }
        if (Math.abs(value) >= 1 || value === 0) {
            precision = 0;
        }
        else {
            precision = 2;
        }
        let symbol = translate('CURRENCY');
        let rates = filter(getSession().currencies, c => c.symbol === symbol);
        let rate = 1;
        if (rates.length > 0) {
            rate = rates[0].rate;
        }
        let displayValue = round(value * rate, precision);
        if (symbol === '£') {
            return symbol + ' ' + displayValue;
        }
        else {
            return displayValue + ' ' + symbol;
        }
    }
}

class DateFormatPipe extends Pipe {
    transform(value, options = '') {
        if (value) {
            let isTime = /^\d\d:\d\d/.test(value.toString());
            if (options === 'fromNow') {
                return fromNow(isTime ? dateFormat(value, 'HH:mm') : value);
            }
            return dateFormat(isTime ? dateFormat(value, 'HH:mm') : value, options);
        }
        return '';
    }
}

class DecimalPipe extends Pipe {
    transform(value, format) {
        return value.toString();
    }
}

class DistancePipe extends Pipe {
    transform(value, options) {
        if (!value && !isNumber(value)) {
            return '';
        }
        let unit = translate('DISTANCEUNIT');
        if (unit === 'mi') {
            value = value / 1.609;
            if (value > 1) {
                return value.toFixed(0) + ' ' + unit;
            }
            else {
                return value.toFixed(1) + ' ' + unit;
            }
        }
        else {
            if (value > 1) {
                return value.toFixed(0) + ' k' + unit;
            }
            else {
                return value.toFixed(1) + ' ' + unit;
            }
        }
    }
}

class FileSizePipe extends Pipe {
    transform(value) {
        if (!isFinite(value)) {
            //isNaN(parseFloat(value)) ||
            return '';
        }
        let units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
        let calc = Math.floor(Math.log(value) / Math.log(1024));
        let size = value / Math.pow(1024, Math.floor(calc));
        return size.toFixed(1) + ' ' + units[calc];
    }
}

class NumberPipe extends Pipe {
    transform(value, options) {
        if (Math.abs(value) <= 999) {
            return value.toString();
        }
        else if (Math.abs(value) <= 999999) {
            return Math.round(value / 1000) + ' K';
        }
        else if (Math.abs(value) <= 999999999) {
            return Math.round(value / 1000000) + ' M';
        }
        else {
            return Math.round(value / 1000000) + ' M';
        }
    }
}

class OrderByPipe extends Pipe {
    transform(value, options) {
        let keys = options.map(k => k.replace('-', ''));
        let orders = options.map(k => (k.indexOf('-') === 0 ? 'desc' : 'asc'));
        return orderBy(value, keys, orders);
    }
}

class HttpsPipe extends Pipe {
    transform(value) {
        if (value && value.replace) {
            let protocol = getProtocol();
            value = value.replace(/http:/g, protocol);
            if (isWKWebView() && value.indexOf('file:') >= 0) {
                value = cleanupWKWebViewImagePath(value);
            }
        }
        return value;
    }
}

class PercentPipe extends Pipe {
    transform(value, format) {
        return (Math.round(value * 100) / 100).toString() + ' %';
    }
}

class RoundPipe extends Pipe {
    transform(value) {
        return Math.round(value);
    }
}

class TimeAgoPipe extends Pipe {
    transform(value) {
        if (value) {
            return fromNow(value);
        }
        return value;
    }
}

class TimerPipe {
    transform(value, options = 'seconds') {
        let precision = options;
        return this.secondParser(value, precision);
    }
    secondParser(time, precision = 'seconds') {
        let seconds = time % 60;
        let mins = (time - seconds) / 60;
        let minutes = mins % 60;
        let hours = (mins - minutes) / 60;
        let displaySeconds = this.padder(seconds);
        let displayMinutes = this.padder(minutes);
        let displayHours = this.padder(hours);
        switch (precision) {
            case 'seconds':
                return displayHours + ':' + displayMinutes + ':' + displaySeconds;
            case 'minutes':
                return displayHours + ':' + displayMinutes;
            case 'hours':
                return displayHours;
        }
    }
    padder(num) {
        let numberString = num.toString();
        if (numberString.length === 1) {
            numberString = '0' + numberString;
        }
        return numberString;
    }
}

class UserInitialPipe {
    transform(user) {
        if (user) {
            let initials = '';
            if (typeof user !== 'undefined' && user) {
                if (user.firstName && user.lastName) {
                    initials += user.firstName.toString().substring(0, 1);
                    initials += user.lastName.toString().substring(0, 1);
                }
                else if (user.username) {
                    initials = user.username.toString().substring(0, 2);
                }
            }
            return initials;
        }
        return '';
    }
}

const pipes = {
    currency: new CurrencyPipe(),
    dateFormat: new DateFormatPipe(),
    decimal: new DecimalPipe(),
    fileSize: new FileSizePipe(),
    number: new NumberPipe(),
    orderBy: new OrderByPipe(),
    round: new RoundPipe(),
    timeAgo: new TimeAgoPipe(),
    timer: new TimerPipe(),
    userInitial: new UserInitialPipe(),
    https: new HttpsPipe(),
    distance: new DistancePipe(),
    percent: new PercentPipe()
};

// ALL texts coming from the previous version are DOT annotations so we set them as such should they exist
function setDotAnnotations(texts) {
    if (texts) {
        texts.map(annotation => {
            if (annotation.type !== null && !isTextAnnotation(annotation)) {
                annotation.type = 'dot';
            }
            return annotation;
        });
        return texts;
    }
}
function adjustTextArea(target, adjustWidth = true) {
    target.style.overflow = 'hidden';
    target.style.height = '1px';
    if (adjustWidth) {
        target.style.width = '1px';
    }
    target.style.height = `${target.scrollHeight}px`;
    // Add some extra pixels to get around the issue where annotations get cropped on iOS if they were created in Android
    target.style.width = `${target.scrollWidth + 5}px`;
}
function limitDragPosition(finalPosition, imageHeight, imageWidth, containerDimensions, isPortraitImage) {
    if (finalPosition.x < 0) {
        finalPosition.x = 0;
    }
    if (finalPosition.x + containerDimensions.width > imageWidth) {
        finalPosition.x = imageWidth - containerDimensions.width;
    }
    if (finalPosition.y < 0) {
        finalPosition.y = 0;
    }
    if (isPortraitImage && finalPosition.y < 50) {
        finalPosition.y = 50;
    }
    if (finalPosition.y + containerDimensions.height > imageHeight) {
        finalPosition.y = imageHeight - containerDimensions.height;
    }
    return finalPosition;
}
function hasAnnotationMoved(oldAnnotation, updatedAnnotation) {
    if (oldAnnotation.percent_x !== updatedAnnotation.percent_x) {
        return true;
    }
    else if (oldAnnotation.percent_y !== updatedAnnotation.percent_y) {
        return true;
    }
    return false;
}
// This function will appropriately scale all the SVG annotations
// Each SVG will have the viewbox corresponding to the width and height of the original SVG
// We only need to modify the width and height to make it work
function scaleSVGData(svgData, width, height) {
    return svgData.replace(/height="[0-9]+"/, `height="${height}"`).replace(/width="[0-9]+"/, `width="${width}"`);
}
function extractViewBoxValues(viewbox) {
    // Viewbox format '0 0 width height'
    const viewboxWidth = viewbox.baseVal.width;
    const viewboxHeight = viewbox.baseVal.height;
    return [viewboxWidth, viewboxHeight];
}
function isSameViewbox(currentHeight, currentWidth, viewbox) {
    const [viewboxWidth, viewboxHeight] = extractViewBoxValues(viewbox);
    return viewboxWidth === currentWidth && viewboxHeight === currentHeight;
}
function computeViewboxZoom(currentHeight, currentWidth, viewbox) {
    const [viewboxWidth] = extractViewBoxValues(viewbox);
    const viewboxZoomValue = currentWidth / viewboxWidth;
    return viewboxZoomValue;
}
function parseSVG(svgData) {
    const parser = new DOMParser();
    const svgOverlay = parser.parseFromString(svgData, 'image/svg+xml');
    return svgOverlay.firstChild;
}
function isTextBackgroundOn(backgroundStatus) {
    return backgroundStatus === 'on';
}
function isTextBackgroundOff(backgroundStatus) {
    return backgroundStatus === 'off';
}
function isTextMode(editorMode) {
    return editorMode === 'text';
}
function isDrawMode(editorMode) {
    return editorMode === 'draw';
}
function isZoomMode(editorMode) {
    return editorMode === 'zoom';
}
function isAnnotationMode(editorMode) {
    return editorMode === 'annotation';
}
function isLandscape(imageOrientation) {
    return imageOrientation === 'landscape';
}
function isPortrait(imageOrientation) {
    return imageOrientation === 'portrait';
}
function isCanvasCurrentTarget(event) {
    if (event.currentTarget) {
        return event.currentTarget.tagName === 'CANVAS';
    }
    return false;
}
function isTargetSpan(event) {
    return event.target.tagName === 'SPAN';
}
function isTargetTextArea(event) {
    if (event && event.target) {
        return event.target.tagName === 'TEXTAREA';
    }
}
function isDotAnnotation(annotation) {
    return annotation.type === 'dot';
}
function isTextAnnotation(annotation) {
    return annotation.type === 'text';
}
function isItemAnnotated(item) {
    return item.edit || item.texts;
}

export { imageCacheInit as a, pipes as b, getCachedFileURL as c, cacheFile as d, highcharts as e, parseSVG as f, setDotAnnotations as g, isPortrait as h, isTextMode as i, isAnnotationMode as j, isBase64 as k, scaleSVGData as l, isTargetTextArea as m, isLandscape as n, isTextBackgroundOn as o, adjustTextArea as p, isDrawMode as q, isTextBackgroundOff as r, limitDragPosition as s, isCanvasCurrentTarget as t, isSameViewbox as u, computeViewboxZoom as v, isTargetSpan as w, downloadFile as x, isDotAnnotation as y, isTextAnnotation as z, isZoomMode as A, Hammer as B, getType as C, rotateBase64Image as D, moveToImageDirectory as E, saveBase64AsImageFile as F, updatePathSessionId as G, isImage as H, read$1 as I, getMimeType as J, videos as K, audios as L, images as M, isVideo as N, isDocument as O, getExtension as P, toPng as Q, getIcon as R, changeExtension as S, showPdfOnDevice as T, getNativeDirectory as U, fileNativeCheckFile as V, downloadFileToDevice as W, fileHasIcon as X, urlToFileBlob as Y, getVideoPoster as Z, setupHammer as _, hammerTypes as $, isBottomSwipe as a0, isTopSwipe as a1, hammerDirections as a2, isItemAnnotated as a3, getUUID as a4, isFileUri as a5, isImageFile as a6, getMaxSize as a7, isValid as a8, b64toBlob as a9, blobToFile as aa, b64ToFile as ab, resizeBase64Image as ac, getBase64MimeType as ad, getBase64Extension as ae, resizeImage as af, resolveFilePath as ag, fixImageOrientation as ah, moveToImageDirectoryBase as ai, fileNativeWriteFile as aj, fixAbsolutePath as ak, getCloudinaryUrl as al, getLocalFilePath as am, getLocalFileName as an, saveToLocalFile as ao, downloadPdfToStorage as ap, getUrlWithAnnotations as aq, cleanFileName as ar, openBlob as as, afterOpenBlob as at, documents as au, isAudio as av, downloadFileMobile as aw, downloadFileWeb as ax, longPress as ay, isImageCacheAvailable as az, getCachedFileBase64Data as aA, CurrencyPipe as aB, DateFormatPipe as aC, DecimalPipe as aD, DistancePipe as aE, FileSizePipe as aF, NumberPipe as aG, OrderByPipe as aH, HttpsPipe as aI, RoundPipe as aJ, TimeAgoPipe as aK, TimerPipe as aL, UserInitialPipe as aM, hasAnnotationMoved as aN };
