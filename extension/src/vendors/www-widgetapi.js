(function(){/*

  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
 */
 var r;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
 function t(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
 var ba="function"==typeof Object.create?Object.create:function(a){function b(){}
 b.prototype=a;return new b},ca;
 if("function"==typeof Object.setPrototypeOf)ca=Object.setPrototypeOf;else{var da;a:{var ea={a:!0},fa={};try{fa.__proto__=ea;da=fa.a;break a}catch(a){}da=!1}ca=da?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ha=ca;
 function ia(a,b){a.prototype=ba(b.prototype);a.prototype.constructor=a;if(ha)ha(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.B=b.prototype}
 var ka="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};
 function la(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
 var u=la(this);function w(a,b){if(b){for(var c=u,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];f in c||(c[f]={});c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ka(c,d,{configurable:!0,writable:!0,value:f})}}
 function ma(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
 w("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=ma(this,b,"endsWith");b+="";void 0===c&&(c=d.length);for(var e=Math.max(0,Math.min(c|0,d.length)),f=b.length;0<f&&0<e;)if(d[--e]!=b[--f])return!1;return 0>=f}});
 w("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=ma(this,b,"startsWith");b+="";for(var e=d.length,f=b.length,k=Math.max(0,Math.min(c|0,d.length)),g=0;g<f&&k<e;)if(d[k++]!=b[g++])return!1;return g>=f}});
 function na(){na=function(){};
 u.Symbol||(u.Symbol=oa)}
 function pa(a,b){this.f=a;ka(this,"description",{configurable:!0,writable:!0,value:b})}
 pa.prototype.toString=function(){return this.f};
 var oa=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new pa("jscomp_symbol_"+(c||"")+"_"+b++,c)}
 var b=0;return a}();
 function qa(){na();var a=u.Symbol.iterator;a||(a=u.Symbol.iterator=u.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&ka(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ra(aa(this))}});
 qa=function(){}}
 function ra(a){qa();a={next:a};a[u.Symbol.iterator]=function(){return this};
 return a}
 function x(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
 var sa="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)x(d,e)&&(a[e]=d[e])}return a};
 w("Object.assign",function(a){return a||sa});
 w("Promise",function(a){function b(k){this.g=0;this.j=void 0;this.f=[];var g=this.h();try{k(g.resolve,g.reject)}catch(h){g.reject(h)}}
 function c(){this.f=null}
 function d(k){return k instanceof b?k:new b(function(g){g(k)})}
 if(a)return a;c.prototype.g=function(k){if(null==this.f){this.f=[];var g=this;this.h(function(){g.j()})}this.f.push(k)};
 var e=u.setTimeout;c.prototype.h=function(k){e(k,0)};
 c.prototype.j=function(){for(;this.f&&this.f.length;){var k=this.f;this.f=[];for(var g=0;g<k.length;++g){var h=k[g];k[g]=null;try{h()}catch(l){this.i(l)}}}this.f=null};
 c.prototype.i=function(k){this.h(function(){throw k;})};
 b.prototype.h=function(){function k(l){return function(m){h||(h=!0,l.call(g,m))}}
 var g=this,h=!1;return{resolve:k(this.G),reject:k(this.i)}};
 b.prototype.G=function(k){if(k===this)this.i(new TypeError("A Promise cannot resolve to itself"));else if(k instanceof b)this.ha(k);else{a:switch(typeof k){case "object":var g=null!=k;break a;case "function":g=!0;break a;default:g=!1}g?this.F(k):this.l(k)}};
 b.prototype.F=function(k){var g=void 0;try{g=k.then}catch(h){this.i(h);return}"function"==typeof g?this.ia(g,k):this.l(k)};
 b.prototype.i=function(k){this.o(2,k)};
 b.prototype.l=function(k){this.o(1,k)};
 b.prototype.o=function(k,g){if(0!=this.g)throw Error("Cannot settle("+k+", "+g+"): Promise already settled in state"+this.g);this.g=k;this.j=g;this.A()};
 b.prototype.A=function(){if(null!=this.f){for(var k=0;k<this.f.length;++k)f.g(this.f[k]);this.f=null}};
 var f=new c;b.prototype.ha=function(k){var g=this.h();k.C(g.resolve,g.reject)};
 b.prototype.ia=function(k,g){var h=this.h();try{k.call(g,h.resolve,h.reject)}catch(l){h.reject(l)}};
 b.prototype.then=function(k,g){function h(n,q){return"function"==typeof n?function(v){try{l(n(v))}catch(z){m(z)}}:q}
 var l,m,p=new b(function(n,q){l=n;m=q});
 this.C(h(k,l),h(g,m));return p};
 b.prototype["catch"]=function(k){return this.then(void 0,k)};
 b.prototype.C=function(k,g){function h(){switch(l.g){case 1:k(l.j);break;case 2:g(l.j);break;default:throw Error("Unexpected state: "+l.g);}}
 var l=this;null==this.f?f.g(h):this.f.push(h)};
 b.resolve=d;b.reject=function(k){return new b(function(g,h){h(k)})};
 b.race=function(k){return new b(function(g,h){for(var l=t(k),m=l.next();!m.done;m=l.next())d(m.value).C(g,h)})};
 b.all=function(k){var g=t(k),h=g.next();return h.done?d([]):new b(function(l,m){function p(v){return function(z){n[v]=z;q--;0==q&&l(n)}}
 var n=[],q=0;do n.push(void 0),q++,d(h.value).C(p(n.length-1),m),h=g.next();while(!h.done)})};
 return b});
 w("WeakMap",function(a){function b(h){this.f=(g+=Math.random()+1).toString();if(h){h=t(h);for(var l;!(l=h.next()).done;)l=l.value,this.set(l[0],l[1])}}
 function c(){}
 function d(h){var l=typeof h;return"object"===l&&null!==h||"function"===l}
 function e(h){if(!x(h,k)){var l=new c;ka(h,k,{value:l})}}
 function f(h){var l=Object[h];l&&(Object[h]=function(m){if(m instanceof c)return m;e(m);return l(m)})}
 if(function(){if(!a||!Object.seal)return!1;try{var h=Object.seal({}),l=Object.seal({}),m=new a([[h,2],[l,3]]);if(2!=m.get(h)||3!=m.get(l))return!1;m["delete"](h);m.set(l,4);return!m.has(h)&&4==m.get(l)}catch(p){return!1}}())return a;
 var k="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var g=0;b.prototype.set=function(h,l){if(!d(h))throw Error("Invalid WeakMap key");e(h);if(!x(h,k))throw Error("WeakMap key fail: "+h);h[k][this.f]=l;return this};
 b.prototype.get=function(h){return d(h)&&x(h,k)?h[k][this.f]:void 0};
 b.prototype.has=function(h){return d(h)&&x(h,k)&&x(h[k],this.f)};
 b.prototype["delete"]=function(h){return d(h)&&x(h,k)&&x(h[k],this.f)?delete h[k][this.f]:!1};
 return b});
 w("Map",function(a){function b(){var g={};return g.previous=g.next=g.head=g}
 function c(g,h){var l=g.f;return ra(function(){if(l){for(;l.head!=g.f;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:h(l)};l=null}return{done:!0,value:void 0}})}
 function d(g,h){var l=h&&typeof h;"object"==l||"function"==l?f.has(h)?l=f.get(h):(l=""+ ++k,f.set(h,l)):l="p_"+h;var m=g.g[l];if(m&&x(g.g,l))for(var p=0;p<m.length;p++){var n=m[p];if(h!==h&&n.key!==n.key||h===n.key)return{id:l,list:m,index:p,m:n}}return{id:l,list:m,index:-1,m:void 0}}
 function e(g){this.g={};this.f=b();this.size=0;if(g){g=t(g);for(var h;!(h=g.next()).done;)h=h.value,this.set(h[0],h[1])}}
 if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var g=Object.seal({x:4}),h=new a(t([[g,"s"]]));if("s"!=h.get(g)||1!=h.size||h.get({x:4})||h.set({x:4},"t")!=h||2!=h.size)return!1;var l=h.entries(),m=l.next();if(m.done||m.value[0]!=g||"s"!=m.value[1])return!1;m=l.next();return m.done||4!=m.value[0].x||"t"!=m.value[1]||!l.next().done?!1:!0}catch(p){return!1}}())return a;
 qa();var f=new WeakMap;e.prototype.set=function(g,h){g=0===g?0:g;var l=d(this,g);l.list||(l.list=this.g[l.id]=[]);l.m?l.m.value=h:(l.m={next:this.f,previous:this.f.previous,head:this.f,key:g,value:h},l.list.push(l.m),this.f.previous.next=l.m,this.f.previous=l.m,this.size++);return this};
 e.prototype["delete"]=function(g){g=d(this,g);return g.m&&g.list?(g.list.splice(g.index,1),g.list.length||delete this.g[g.id],g.m.previous.next=g.m.next,g.m.next.previous=g.m.previous,g.m.head=null,this.size--,!0):!1};
 e.prototype.clear=function(){this.g={};this.f=this.f.previous=b();this.size=0};
 e.prototype.has=function(g){return!!d(this,g).m};
 e.prototype.get=function(g){return(g=d(this,g).m)&&g.value};
 e.prototype.entries=function(){return c(this,function(g){return[g.key,g.value]})};
 e.prototype.keys=function(){return c(this,function(g){return g.key})};
 e.prototype.values=function(){return c(this,function(g){return g.value})};
 e.prototype.forEach=function(g,h){for(var l=this.entries(),m;!(m=l.next()).done;)m=m.value,g.call(h,m[1],m[0],this)};
 e.prototype[Symbol.iterator]=e.prototype.entries;var k=0;return e});
 w("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)x(b,d)&&c.push([d,b[d]]);return c}});
 w("Set",function(a){function b(c){this.f=new Map;if(c){c=t(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.f.size}
 if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(t([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(k){return!1}}())return a;
 qa();b.prototype.add=function(c){c=0===c?0:c;this.f.set(c,c);this.size=this.f.size;return this};
 b.prototype["delete"]=function(c){c=this.f["delete"](c);this.size=this.f.size;return c};
 b.prototype.clear=function(){this.f.clear();this.size=0};
 b.prototype.has=function(c){return this.f.has(c)};
 b.prototype.entries=function(){return this.f.entries()};
 b.prototype.values=function(){return this.f.values()};
 b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.f.forEach(function(f){return c.call(d,f,f,e)})};
 return b});
 w("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==ma(this,b,"includes").indexOf(b,c||0)}});
 var y=this||self;function A(a,b){for(var c=a.split("."),d=b||y,e=0;e<c.length;e++)if(d=d[c[e]],null==d)return null;return d}
 function ta(){}
 function ua(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
 else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
 function va(a){var b=ua(a);return"array"==b||"object"==b&&"number"==typeof a.length}
 function wa(a){return"function"==ua(a)}
 function xa(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
 function ya(a){return Object.prototype.hasOwnProperty.call(a,za)&&a[za]||(a[za]=++Aa)}
 var za="closure_uid_"+(1E9*Math.random()>>>0),Aa=0;function Ba(a,b,c){return a.call.apply(a.bind,arguments)}
 function Ca(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
 function B(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?B=Ba:B=Ca;return B.apply(null,arguments)}
 function Da(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
 var C=Date.now||function(){return+new Date};
 function D(a,b){var c=a.split("."),d=y;c[0]in d||"undefined"==typeof d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]&&d[e]!==Object.prototype[e]?d=d[e]:d=d[e]={}:d[e]=b}
 function E(a,b){function c(){}
 c.prototype=b.prototype;a.B=b.prototype;a.prototype=new c;a.prototype.constructor=a}
 ;var Fa=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
 for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},F=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ga=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
 F(a,function(e,f){d=b.call(void 0,d,e,f,a)});
 return d};
 function Ha(a,b){a:{var c=a.length;for(var d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:"string"===typeof a?a.charAt(c):a[c]}
 function Ia(a){return Array.prototype.concat.apply([],arguments)}
 function Ja(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
 function Ka(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(va(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var k=0;k<f;k++)a[e+k]=d[k]}else a.push(d)}}
 ;function La(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
 ;function Ma(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
 function Na(a){var b=G,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
 function Oa(a){for(var b in a)return!1;return!0}
 function Pa(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
 function Qa(a){var b=ua(a);if("object"==b||"array"==b){if(wa(a.clone))return a.clone();b="array"==b?[]:{};for(var c in a)b[c]=Qa(a[c]);return b}return a}
 var Ra="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Sa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ra.length;f++)c=Ra[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
 ;var Ta=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},Ua=/&/g,Va=/</g,Wa=/>/g,Xa=/"/g,Ya=/'/g,Za=/\x00/g,$a=/[\x00&<>"']/;var ab;a:{var bb=y.navigator;if(bb){var cb=bb.userAgent;if(cb){ab=cb;break a}}ab=""}function H(a){return-1!=ab.indexOf(a)}
 ;function db(){}
 ;var eb=H("Opera"),fb=H("Trident")||H("MSIE"),gb=H("Edge"),hb=H("Gecko")&&!(-1!=ab.toLowerCase().indexOf("webkit")&&!H("Edge"))&&!(H("Trident")||H("MSIE"))&&!H("Edge"),ib=-1!=ab.toLowerCase().indexOf("webkit")&&!H("Edge");function jb(){var a=y.document;return a?a.documentMode:void 0}
 var kb;a:{var lb="",mb=function(){var a=ab;if(hb)return/rv:([^\);]+)(\)|;)/.exec(a);if(gb)return/Edge\/([\d\.]+)/.exec(a);if(fb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(ib)return/WebKit\/(\S+)/.exec(a);if(eb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
 mb&&(lb=mb?mb[1]:"");if(fb){var nb=jb();if(null!=nb&&nb>parseFloat(lb)){kb=String(nb);break a}}kb=lb}var ob=kb,pb;if(y.document&&fb){var qb=jb();pb=qb?qb:parseInt(ob,10)||void 0}else pb=void 0;var rb=pb;var tb={},ub=null;var I=window;function vb(a){var b=A("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(f){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||y.$googDebugFname||b}catch(f){e="Not available",c=!0}return!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:(b=a.message,null==b&&(a.constructor&&
 a.constructor instanceof Function?(a.constructor.name?b=a.constructor.name:(b=a.constructor,wb[b]?b=wb[b]:(b=String(b),wb[b]||(c=/function\s+([^\(]+)/m.exec(b),wb[b]=c?c[1]:"[Anonymous]"),b=wb[b])),b='Unknown Error of type "'+b+'"'):b="Unknown Error of unknown type"),{message:b,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:a.stack||"Not available"})}
 var wb={};function xb(a){this.f=a||{cookie:""}}
 r=xb.prototype;r.isEnabled=function(){return navigator.cookieEnabled};
 r.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.Ba;d=c.secure||!1;var f=c.domain||void 0;var k=c.path||void 0;var g=c.P}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===g&&(g=-1);c=f?";domain="+f:"";k=k?";path="+k:"";d=d?";secure":"";g=0>g?"":0==g?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(C()+1E3*g)).toUTCString();this.f.cookie=a+"="+b+c+k+g+d+(null!=e?";samesite="+e:"")};
 r.get=function(a,b){for(var c=a+"=",d=(this.f.cookie||"").split(";"),e=0,f;e<d.length;e++){f=Ta(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
 r.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{P:0,path:b,domain:c});return d};
 r.isEmpty=function(){return!this.f.cookie};
 r.clear=function(){for(var a=(this.f.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=Ta(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
 var yb=new xb("undefined"==typeof document?null:document);function zb(a,b){this.width=a;this.height=b}
 r=zb.prototype;r.clone=function(){return new zb(this.width,this.height)};
 r.aspectRatio=function(){return this.width/this.height};
 r.isEmpty=function(){return!(this.width*this.height)};
 r.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
 r.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
 r.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function Ab(a,b){var c,d;var e=document;e=b||e;if(e.querySelectorAll&&e.querySelector&&a)return e.querySelectorAll(a?"."+a:"");if(a&&e.getElementsByClassName){var f=e.getElementsByClassName(a);return f}f=e.getElementsByTagName("*");if(a){var k={};for(c=d=0;e=f[c];c++){var g=e.className,h;if(h="function"==typeof g.split)h=0<=Fa(g.split(/\s+/),a);h&&(k[d++]=e)}k.length=d;return k}return f}
 function Bb(){var a=document;var b="IFRAME";"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)}
 function Cb(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
 ;var Db=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function J(a){return a.match(Db)}
 function Eb(a){return a?decodeURI(a):a}
 function Fb(a){var b=J(a);a=b[1];var c=b[2],d=b[3];b=b[4];var e="";a&&(e+=a+":");d&&(e+="//",c&&(e+=c+"@"),e+=d,b&&(e+=":"+b));return e}
 function Gb(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)Gb(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
 function Hb(a){var b=[],c;for(c in a)Gb(c,a[c],b);return b.join("&")}
 var Ib=/#|$/;function Jb(a){var b=Kb;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a.call(void 0,b[c],c,b)}
 function Lb(){var a=[];Jb(function(b){a.push(b)});
 return a}
 var Kb={ja:"allow-forms",ka:"allow-modals",la:"allow-orientation-lock",ma:"allow-pointer-lock",na:"allow-popups",oa:"allow-popups-to-escape-sandbox",pa:"allow-presentation",qa:"allow-same-origin",ra:"allow-scripts",sa:"allow-top-navigation",ta:"allow-top-navigation-by-user-activation"},Mb=La(function(){return Lb()});
 function Nb(){var a=Bb(),b={};F(Mb(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
 return b}
 ;var Ob=(new Date).getTime();function Pb(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a&&"chrome-untrusted"!==a&&"app"!==a)throw Error("Invalid URI scheme in origin: "+a);c="";var d=b.indexOf(":");
 if(-1!=d){var e=b.substring(d+1);b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
 ;function Qb(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}
 function b(p){for(var n=k,q=0;64>q;q+=4)n[q/4]=p[q]<<24|p[q+1]<<16|p[q+2]<<8|p[q+3];for(q=16;80>q;q++)p=n[q-3]^n[q-8]^n[q-14]^n[q-16],n[q]=(p<<1|p>>>31)&4294967295;p=e[0];var v=e[1],z=e[2],V=e[3],sb=e[4];for(q=0;80>q;q++){if(40>q)if(20>q){var ja=V^v&(z^V);var Ea=1518500249}else ja=v^z^V,Ea=1859775393;else 60>q?(ja=v&z|V&(v|z),Ea=2400959708):(ja=v^z^V,Ea=3395469782);ja=((p<<5|p>>>27)&4294967295)+ja+sb+Ea+n[q]&4294967295;sb=V;V=z;z=(v<<30|v>>>2)&4294967295;v=p;p=ja}e[0]=e[0]+p&4294967295;e[1]=e[1]+
 v&4294967295;e[2]=e[2]+z&4294967295;e[3]=e[3]+V&4294967295;e[4]=e[4]+sb&4294967295}
 function c(p,n){if("string"===typeof p){p=unescape(encodeURIComponent(p));for(var q=[],v=0,z=p.length;v<z;++v)q.push(p.charCodeAt(v));p=q}n||(n=p.length);q=0;if(0==l)for(;q+64<n;)b(p.slice(q,q+64)),q+=64,m+=64;for(;q<n;)if(f[l++]=p[q++],m++,64==l)for(l=0,b(f);q+64<n;)b(p.slice(q,q+64)),q+=64,m+=64}
 function d(){var p=[],n=8*m;56>l?c(g,56-l):c(g,64-(l-56));for(var q=63;56<=q;q--)f[q]=n&255,n>>>=8;b(f);for(q=n=0;5>q;q++)for(var v=24;0<=v;v-=8)p[n++]=e[q]>>v&255;return p}
 for(var e=[],f=[],k=[],g=[128],h=1;64>h;++h)g[h]=0;var l,m;a();return{reset:a,update:c,digest:d,X:function(){for(var p=d(),n="",q=0;q<p.length;q++)n+="0123456789ABCDEF".charAt(Math.floor(p[q]/16))+"0123456789ABCDEF".charAt(p[q]%16);return n}}}
 ;function Rb(a,b,c){var d=[],e=[];if(1==("array"==ua(c)?2:1))return e=[b,a],F(d,function(g){e.push(g)}),Sb(e.join(" "));
 var f=[],k=[];F(c,function(g){k.push(g.key);f.push(g.value)});
 c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];F(d,function(g){e.push(g)});
 a=Sb(e.join(" "));a=[c,a];0==k.length||a.push(k.join(""));return a.join("_")}
 function Sb(a){var b=Qb();b.update(a);return b.X().toLowerCase()}
 ;function Tb(a){var b=Pb(String(y.location.href)),c;(c=y.__SAPISID||y.__APISID||y.__OVERRIDE_SID)?c=!0:(c=new xb(document),c=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID"),c=!!c);if(c&&(c=(b=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:"))?y.__SAPISID:y.__APISID,c||(c=new xb(document),c=c.get(b?"SAPISID":"APISID")||c.get("__Secure-3PAPISID")),c)){b=b?"SAPISIDHASH":"APISIDHASH";var d=String(y.location.href);return d&&c&&b?[b,Rb(Pb(d),c,a||null)].join(" "):null}return null}
 ;/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
 
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
 
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
 */
 function Ub(){this.g=[];this.f=-1}
 Ub.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.g[a]!=b&&(this.g[a]=b,this.f=-1)};
 Ub.prototype.get=function(a){return!!this.g[a]};
 function Vb(a){-1==a.f&&(a.f=Ga(a.g,function(b,c,d){return c?b+Math.pow(2,d):b},0));
 return a.f}
 ;function Wb(a,b){this.h=a;this.i=b;this.g=0;this.f=null}
 Wb.prototype.get=function(){if(0<this.g){this.g--;var a=this.f;this.f=a.next;a.next=null}else a=this.h();return a};function Xb(a){y.setTimeout(function(){throw a;},0)}
 var Yb;function Zb(){var a=y.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!H("Presto")&&(a=function(){var e=Bb();e.style.display="none";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.close();var k="callImmediate"+Math.random(),g="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=B(function(h){if(("*"==g||h.origin==g)&&h.data==k)this.port1.onmessage()},this);
 f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(k,g)}}});
 if("undefined"!==typeof a&&!H("Trident")&&!H("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.O;c.O=null;e()}};
 return function(e){d.next={O:e};d=d.next;b.port2.postMessage(0)}}return function(e){y.setTimeout(e,0)}}
 ;function $b(){this.g=this.f=null}
 var bc=new Wb(function(){return new ac},function(a){a.reset()});
 $b.prototype.add=function(a,b){var c=bc.get();c.set(a,b);this.g?this.g.next=c:this.f=c;this.g=c};
 $b.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.g=null),a.next=null);return a};
 function ac(){this.next=this.scope=this.f=null}
 ac.prototype.set=function(a,b){this.f=a;this.scope=b;this.next=null};
 ac.prototype.reset=function(){this.next=this.scope=this.f=null};function cc(a){dc||ec();fc||(dc(),fc=!0);gc.add(a,void 0)}
 var dc;function ec(){if(y.Promise&&y.Promise.resolve){var a=y.Promise.resolve(void 0);dc=function(){a.then(hc)}}else dc=function(){var b=hc;
 !wa(y.setImmediate)||y.Window&&y.Window.prototype&&!H("Edge")&&y.Window.prototype.setImmediate==y.setImmediate?(Yb||(Yb=Zb()),Yb(b)):y.setImmediate(b)}}
 var fc=!1,gc=new $b;function hc(){for(var a;a=gc.remove();){try{a.f.call(a.scope)}catch(c){Xb(c)}var b=bc;b.i(a);100>b.g&&(b.g++,a.next=b.f,b.f=a)}fc=!1}
 ;function ic(){this.g=-1}
 ;function jc(){this.g=64;this.f=[];this.l=[];this.o=[];this.i=[];this.i[0]=128;for(var a=1;a<this.g;++a)this.i[a]=0;this.j=this.h=0;this.reset()}
 E(jc,ic);jc.prototype.reset=function(){this.f[0]=1732584193;this.f[1]=4023233417;this.f[2]=2562383102;this.f[3]=271733878;this.f[4]=3285377520;this.j=this.h=0};
 function kc(a,b,c){c||(c=0);var d=a.o;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.f[0];c=a.f[1];var k=a.f[2],g=a.f[3],h=a.f[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=g^c&(k^g);var l=1518500249}else f=c^k^g,l=1859775393;else 60>e?(f=c&k|g&(c|k),l=2400959708):
 (f=c^k^g,l=3395469782);f=(b<<5|b>>>27)+f+h+l+d[e]&4294967295;h=g;g=k;k=(c<<30|c>>>2)&4294967295;c=b;b=f}a.f[0]=a.f[0]+b&4294967295;a.f[1]=a.f[1]+c&4294967295;a.f[2]=a.f[2]+k&4294967295;a.f[3]=a.f[3]+g&4294967295;a.f[4]=a.f[4]+h&4294967295}
 jc.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.g,d=0,e=this.l,f=this.h;d<b;){if(0==f)for(;d<=c;)kc(this,a,d),d+=this.g;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.g){kc(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.g){kc(this,e);f=0;break}}this.h=f;this.j+=b}};
 jc.prototype.digest=function(){var a=[],b=8*this.j;56>this.h?this.update(this.i,56-this.h):this.update(this.i,this.g-(this.h-56));for(var c=this.g-1;56<=c;c--)this.l[c]=b&255,b/=256;kc(this,this.l);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.f[c]>>d&255,++b;return a};function lc(){this.h=this.h;this.i=this.i}
 lc.prototype.h=!1;lc.prototype.dispose=function(){this.h||(this.h=!0,this.K())};
 lc.prototype.K=function(){if(this.i)for(;this.i.length;)this.i.shift()()};var mc="StopIteration"in y?y.StopIteration:{message:"StopIteration",stack:""};function K(){}
 K.prototype.next=function(){throw mc;};
 K.prototype.v=function(){return this};
 function nc(a){if(a instanceof K)return a;if("function"==typeof a.v)return a.v(!1);if(va(a)){var b=0,c=new K;c.next=function(){for(;;){if(b>=a.length)throw mc;if(b in a)return a[b++];b++}};
 return c}throw Error("Not implemented");}
 function oc(a,b){if(va(a))try{F(a,b,void 0)}catch(c){if(c!==mc)throw c;}else{a=nc(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==mc)throw c;}}}
 function pc(a){if(va(a))return Ja(a);a=nc(a);var b=[];oc(a,function(c){b.push(c)});
 return b}
 ;function qc(a,b){this.h={};this.f=[];this.i=this.g=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof qc)for(c=rc(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
 function rc(a){sc(a);return a.f.concat()}
 r=qc.prototype;r.equals=function(a,b){if(this===a)return!0;if(this.g!=a.g)return!1;var c=b||tc;sc(this);for(var d,e=0;d=this.f[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
 function tc(a,b){return a===b}
 r.isEmpty=function(){return 0==this.g};
 r.clear=function(){this.h={};this.i=this.g=this.f.length=0};
 r.remove=function(a){return Object.prototype.hasOwnProperty.call(this.h,a)?(delete this.h[a],this.g--,this.i++,this.f.length>2*this.g&&sc(this),!0):!1};
 function sc(a){if(a.g!=a.f.length){for(var b=0,c=0;b<a.f.length;){var d=a.f[b];Object.prototype.hasOwnProperty.call(a.h,d)&&(a.f[c++]=d);b++}a.f.length=c}if(a.g!=a.f.length){var e={};for(c=b=0;b<a.f.length;)d=a.f[b],Object.prototype.hasOwnProperty.call(e,d)||(a.f[c++]=d,e[d]=1),b++;a.f.length=c}}
 r.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.h,a)?this.h[a]:b};
 r.set=function(a,b){Object.prototype.hasOwnProperty.call(this.h,a)||(this.g++,this.f.push(a),this.i++);this.h[a]=b};
 r.forEach=function(a,b){for(var c=rc(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
 r.clone=function(){return new qc(this)};
 r.v=function(a){sc(this);var b=0,c=this.i,d=this,e=new K;e.next=function(){if(c!=d.i)throw Error("The map has changed since the iterator was created");if(b>=d.f.length)throw mc;var f=d.f[b++];return a?f:d.h[f]};
 return e};var uc=y.JSON.stringify;function L(a){lc.call(this);this.o=1;this.j=[];this.l=0;this.f=[];this.g={};this.A=!!a}
 E(L,lc);r=L.prototype;r.subscribe=function(a,b,c){var d=this.g[a];d||(d=this.g[a]=[]);var e=this.o;this.f[e]=a;this.f[e+1]=b;this.f[e+2]=c;this.o=e+3;d.push(e);return e};
 function vc(a,b,c){var d=wc;if(a=d.g[a]){var e=d.f;(a=Ha(a,function(f){return e[f+1]==b&&e[f+2]==c}))&&d.H(a)}}
 r.H=function(a){var b=this.f[a];if(b){var c=this.g[b];if(0!=this.l)this.j.push(a),this.f[a+1]=ta;else{if(c){var d=Fa(c,a);0<=d&&Array.prototype.splice.call(c,d,1)}delete this.f[a];delete this.f[a+1];delete this.f[a+2]}}return!!b};
 r.M=function(a,b){var c=this.g[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.A)for(e=0;e<c.length;e++){var k=c[e];xc(this.f[k+1],this.f[k+2],d)}else{this.l++;try{for(e=0,f=c.length;e<f;e++)k=c[e],this.f[k+1].apply(this.f[k+2],d)}finally{if(this.l--,0<this.j.length&&0==this.l)for(;c=this.j.pop();)this.H(c)}}return 0!=e}return!1};
 function xc(a,b,c){cc(function(){a.apply(b,c)})}
 r.clear=function(a){if(a){var b=this.g[a];b&&(F(b,this.H,this),delete this.g[a])}else this.f.length=0,this.g={}};
 r.K=function(){L.B.K.call(this);this.clear();this.j.length=0};function yc(a){this.f=a}
 yc.prototype.set=function(a,b){void 0===b?this.f.remove(a):this.f.set(a,uc(b))};
 yc.prototype.get=function(a){try{var b=this.f.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
 yc.prototype.remove=function(a){this.f.remove(a)};function zc(a){this.f=a}
 E(zc,yc);function Ac(a){this.data=a}
 function Bc(a){return void 0===a||a instanceof Ac?a:new Ac(a)}
 zc.prototype.set=function(a,b){zc.B.set.call(this,a,Bc(b))};
 zc.prototype.g=function(a){a=zc.B.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
 zc.prototype.get=function(a){if(a=this.g(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function M(a){this.f=a}
 E(M,zc);M.prototype.set=function(a,b,c){if(b=Bc(b)){if(c){if(c<C()){M.prototype.remove.call(this,a);return}b.expiration=c}b.creation=C()}M.B.set.call(this,a,b)};
 M.prototype.g=function(a){var b=M.B.g.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<C()||c&&c>C())M.prototype.remove.call(this,a);else return b}};function Cc(){}
 ;function Dc(){}
 E(Dc,Cc);Dc.prototype.clear=function(){var a=pc(this.v(!0)),b=this;F(a,function(c){b.remove(c)})};function Ec(a){this.f=a}
 E(Ec,Dc);r=Ec.prototype;r.isAvailable=function(){if(!this.f)return!1;try{return this.f.setItem("__sak","1"),this.f.removeItem("__sak"),!0}catch(a){return!1}};
 r.set=function(a,b){try{this.f.setItem(a,b)}catch(c){if(0==this.f.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
 r.get=function(a){a=this.f.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
 r.remove=function(a){this.f.removeItem(a)};
 r.v=function(a){var b=0,c=this.f,d=new K;d.next=function(){if(b>=c.length)throw mc;var e=c.key(b++);if(a)return e;e=c.getItem(e);if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
 return d};
 r.clear=function(){this.f.clear()};
 r.key=function(a){return this.f.key(a)};function Fc(){var a=null;try{a=window.localStorage||null}catch(b){}this.f=a}
 E(Fc,Ec);function Gc(a,b){this.g=a;this.f=null;var c;if(c=fb)c=!(9<=Number(rb));if(c){Hc||(Hc=new qc);this.f=Hc.get(a);this.f||(b?this.f=document.getElementById(b):(this.f=document.createElement("userdata"),this.f.addBehavior("#default#userData"),document.body.appendChild(this.f)),Hc.set(a,this.f));try{this.f.load(this.g)}catch(d){this.f=null}}}
 E(Gc,Dc);var Ic={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},Hc=null;function Jc(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return Ic[b]})}
 r=Gc.prototype;r.isAvailable=function(){return!!this.f};
 r.set=function(a,b){this.f.setAttribute(Jc(a),b);Kc(this)};
 r.get=function(a){a=this.f.getAttribute(Jc(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
 r.remove=function(a){this.f.removeAttribute(Jc(a));Kc(this)};
 r.v=function(a){var b=0,c=this.f.XMLDocument.documentElement.attributes,d=new K;d.next=function(){if(b>=c.length)throw mc;var e=c[b++];if(a)return decodeURIComponent(e.nodeName.replace(/\./g,"%")).substr(1);e=e.nodeValue;if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
 return d};
 r.clear=function(){for(var a=this.f.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);Kc(this)};
 function Kc(a){try{a.f.save(a.g)}catch(b){throw"Storage mechanism: Quota exceeded";}}
 ;function Lc(a,b){this.g=a;this.f=b+"::"}
 E(Lc,Dc);Lc.prototype.set=function(a,b){this.g.set(this.f+a,b)};
 Lc.prototype.get=function(a){return this.g.get(this.f+a)};
 Lc.prototype.remove=function(a){this.g.remove(this.f+a)};
 Lc.prototype.v=function(a){var b=this.g.v(!0),c=this,d=new K;d.next=function(){for(var e=b.next();e.substr(0,c.f.length)!=c.f;)e=b.next();return a?e.substr(c.f.length):c.g.get(e)};
 return d};var Mc=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};D("yt.config_",Mc);function Nc(a){var b=arguments;1<b.length?Mc[b[0]]=b[1]:1===b.length&&Object.assign(Mc,b[0])}
 function N(a,b){return a in Mc?Mc[a]:b}
 ;var Oc=[];function Pc(a){Oc.forEach(function(b){return b(a)})}
 function Qc(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){Rc(b),Pc(b)}}:a}
 function Rc(a){var b=A("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0):(b=N("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0]),Nc("ERRORS",b))}
 function Sc(a){var b=A("yt.logging.errors.log");b?b(a,"WARNING",void 0,void 0,void 0):(b=N("ERRORS",[]),b.push([a,"WARNING",void 0,void 0,void 0]),Nc("ERRORS",b))}
 ;var Tc=0;D("ytDomDomGetNextId",A("ytDomDomGetNextId")||function(){return++Tc});var Uc={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
 function Vc(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in Uc||(this[b]=a[b]);var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==
 this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey}}catch(e){}}
 Vc.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
 Vc.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
 Vc.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var G=A("ytEventsEventsListeners")||{};D("ytEventsEventsListeners",G);var Wc=A("ytEventsEventsCounter")||{count:0};D("ytEventsEventsCounter",Wc);
 function Xc(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return Na(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,k=xa(e[4])&&xa(d)&&Pa(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||k)})}
 function Yc(a){a&&("string"==typeof a&&(a=[a]),F(a,function(b){if(b in G){var c=G[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?Zc()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete G[b]}}))}
 var Zc=La(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
 window.addEventListener("test",null,b)}catch(c){}return a});
 function $c(a,b,c){var d=void 0===d?{}:d;if(a&&(a.addEventListener||a.attachEvent)){var e=Xc(a,b,c,d);if(!e){e=++Wc.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var k=f?function(g){g=new Vc(g);if(!Cb(g.relatedTarget,function(h){return h==a}))return g.currentTarget=a,g.type=b,c.call(a,g)}:function(g){g=new Vc(g);
 g.currentTarget=a;return c.call(a,g)};
 k=Qc(k);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),Zc()||"boolean"===typeof d?a.addEventListener(b,k,d):a.addEventListener(b,k,!!d.capture)):a.attachEvent("on"+b,k);G[e]=[a,b,c,k,d]}}}
 ;function ad(a,b){wa(a)&&(a=Qc(a));return window.setTimeout(a,b)}
 function bd(a){wa(a)&&(a=Qc(a));return window.setInterval(a,250)}
 function O(a){window.clearTimeout(a)}
 ;function cd(a){var b=[];Ma(a,function(c,d){var e=encodeURIComponent(String(d)),f;"array"==ua(c)?f=c:f=[c];F(f,function(k){""==k?b.push(e):b.push(e+"="+encodeURIComponent(String(k)))})});
 return b.join("&")}
 function dd(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length)try{var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),k=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?"array"==ua(b[f])?Ka(b[f],k):b[f]=[b[f],k]:b[f]=k}catch(h){if("q"!=e[0]){var g=Error("Error decoding URL component");g.params={key:e[0],value:e[1]};Rc(g)}}}return b}
 function ed(a,b){return fd(a,b||{},!0)}
 function fd(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=dd(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);b=a;a=Hb(e);a?(c=b.indexOf("#"),0>c&&(c=b.length),f=b.indexOf("?"),0>f||f>c?(f=c,e=""):e=b.substring(f+1,c),b=[b.substr(0,f),e,b.substr(c)],c=b[1],b[1]=a?c?c+"&"+a:a:c,a=b[0]+(b[1]?"?"+b[1]:"")+b[2]):a=b;return a+d}
 ;var gd={};function hd(a){return gd[a]||(gd[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
 ;var id={},jd=[],wc=new L,kd={};function ld(){for(var a=t(jd),b=a.next();!b.done;b=a.next())b=b.value,b()}
 function md(a,b){b||(b=document);var c=Ja(b.getElementsByTagName("yt:"+a)),d="yt-"+a,e=b||document;d=Ja(e.querySelectorAll&&e.querySelector?e.querySelectorAll("."+d):Ab(d,b));return Ia(c,d)}
 function P(a,b){var c;"yt:"==a.tagName.toLowerCase().substr(0,3)?c=a.getAttribute(b):c=a?a.dataset?a.dataset[hd(b)]:a.getAttribute("data-"+b):null;return c}
 function nd(a,b){wc.M.apply(wc,arguments)}
 ;function od(a){this.g=a||{};this.h=this.f=!1;a=document.getElementById("www-widgetapi-script");if(this.f=!!("https:"==document.location.protocol||a&&0==a.src.indexOf("https:"))){a=[this.g,window.YTConfig||{}];for(var b=0;b<a.length;b++)a[b].host&&(a[b].host=a[b].host.replace("http://","https://"))}}
 function Q(a,b){for(var c=[a.g,window.YTConfig||{}],d=0;d<c.length;d++){var e=c[d][b];if(void 0!=e)return e}return null}
 function pd(a,b,c){qd||(qd={},$c(window,"message",B(a.i,a)));qd[c]=b}
 od.prototype.i=function(a){if(a.origin==Q(this,"host")||a.origin==Q(this,"host").replace(/^http:/,"https:")){try{var b=JSON.parse(a.data)}catch(c){return}this.h=!0;this.f||0!=a.origin.indexOf("https:")||(this.f=!0);if(a=qd[b.id])a.A=!0,a.A&&(F(a.o,a.N,a),a.o.length=0),a.V(b)}};
 var qd=null;function R(a){a=rd(a);return"string"===typeof a&&"false"===a?!1:!!a}
 function sd(a,b){var c=rd(a);return void 0===c&&void 0!==b?b:Number(c||0)}
 function rd(a){var b=N("EXPERIMENTS_FORCED_FLAGS",{});return void 0!==b[a]?b[a]:N("EXPERIMENT_FLAGS",{})[a]}
 ;var td=A("ytPubsubPubsubInstance")||new L;L.prototype.subscribe=L.prototype.subscribe;L.prototype.unsubscribeByKey=L.prototype.H;L.prototype.publish=L.prototype.M;L.prototype.clear=L.prototype.clear;D("ytPubsubPubsubInstance",td);D("ytPubsubPubsubSubscribedKeys",A("ytPubsubPubsubSubscribedKeys")||{});D("ytPubsubPubsubTopicToKeys",A("ytPubsubPubsubTopicToKeys")||{});D("ytPubsubPubsubIsSynchronous",A("ytPubsubPubsubIsSynchronous")||{});var S=window,T=S.ytcsi&&S.ytcsi.now?S.ytcsi.now:S.performance&&S.performance.timing&&S.performance.now&&S.performance.timing.navigationStart?function(){return S.performance.timing.navigationStart+S.performance.now()}:function(){return(new Date).getTime()};var ud=sd("initial_gel_batch_timeout",1E3),vd=Math.pow(2,16)-1,wd=null,xd=0,yd=void 0,zd=0,Ad=0,Bd=0,Cd=!0,Dd=A("ytLoggingTransportLogPayloadsQueue_")||{};D("ytLoggingTransportLogPayloadsQueue_",Dd);var Ed=A("ytLoggingTransportGELQueue_")||new Map;D("ytLoggingTransportGELQueue_",Ed);var Fd=A("ytLoggingTransportTokensToCttTargetIds_")||{};D("ytLoggingTransportTokensToCttTargetIds_",Fd);
 function Gd(){O(zd);O(Ad);Ad=0;yd&&yd.isReady()?(Hd(Ed),"log_event"in Dd&&Hd(Object.entries(Dd.log_event)),Ed.clear(),delete Dd.log_event):Id()}
 function Id(){R("web_gel_timeout_cap")&&!Ad&&(Ad=ad(Gd,6E4));O(zd);var a=N("LOGGING_BATCH_TIMEOUT",sd("web_gel_debounce_ms",1E4));R("shorten_initial_gel_batch_timeout")&&Cd&&(a=ud);zd=ad(Gd,a)}
 function Hd(a){var b=yd,c=Math.round(T());a=t(a);for(var d=a.next();!d.done;d=a.next()){var e=t(d.value);d=e.next().value;var f=e.next().value;e=Qa({context:Jd(b.f||Kd())});e.events=f;(f=Fd[d])&&Ld(e,d,f);delete Fd[d];Md(e,c);Nd(b,"log_event",e,{retry:!0,onSuccess:function(){xd=Math.round(T()-c)}});
 Cd=!1}}
 function Md(a,b){a.requestTimeMs=String(b);R("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);var c=N("EVENT_ID",void 0);if(c){var d=N("BATCH_CLIENT_COUNTER",void 0)||0;!d&&R("web_client_counter_random_seed")&&(d=Math.floor(Math.random()*vd/2));d++;d>vd&&(d=1);Nc("BATCH_CLIENT_COUNTER",d);c={serializedEventId:c,clientCounter:String(d)};a.serializedClientEventId=c;wd&&xd&&R("log_gel_rtt_web")&&(a.previousBatchInfo={serializedClientEventId:wd,roundtripMs:String(xd)});wd=c;xd=0}}
 function Ld(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
 ;var Od=sd("initial_gel_batch_timeout",1E3),Pd=Math.pow(2,16)-1,Qd=null,Rd=0,Sd={log_event:"events",log_interaction:"interactions"},Td=new Set(["log_event"]),Ud={},Vd=0,Wd=0,Xd=0,Yd=!0,U=A("ytLoggingTransportLogPayloadsQueue_")||{};D("ytLoggingTransportLogPayloadsQueue_",U);var Zd=A("ytLoggingTransportTokensToCttTargetIds_")||{};D("ytLoggingTransportTokensToCttTargetIds_",Zd);
 function $d(){if(R("use_typescript_transport"))Gd();else if(O(Vd),O(Wd),Wd=0,!Oa(U)){for(var a in U){var b=Ud[a];if(b&&b.isReady()){var c=void 0,d=a,e=Sd[d],f=Math.round(T());for(c in U[d]){var k=Qa({context:Jd(b.f||Kd())});k[e]=ae(d,c);var g=Zd[c];if(g)a:{var h=k,l=c;if(g.videoId)var m="VIDEO";else if(g.playlistId)m="PLAYLIST";else break a;h.credentialTransferTokenTargetId=g;h.context=h.context||{};h.context.user=h.context.user||{};h.context.user.credentialTransferTokens=[{token:l,scope:m}]}delete Zd[c];
 g=k;g.requestTimeMs=f;R("unsplit_gel_payloads_in_logs")&&(g.unsplitGelPayloadsInLogs=!0);if(m=N("EVENT_ID",void 0))h=N("BATCH_CLIENT_COUNTER",void 0)||0,!h&&R("web_client_counter_random_seed")&&(h=Math.floor(Math.random()*Pd/2)),h++,h>Pd&&(h=1),Nc("BATCH_CLIENT_COUNTER",h),m={serializedEventId:m,clientCounter:h},g.serializedClientEventId=m,Qd&&Rd&&R("log_gel_rtt_web")&&(g.previousBatchInfo={serializedClientEventId:Qd,roundtripMs:Rd}),Qd=m,Rd=0;Nd(b,d,k,{retry:Td.has(d),onSuccess:Da(be,T())})}delete U[a];
 Yd=!1}}Oa(U)||ce()}}
 function ce(){R("web_gel_timeout_cap")&&!Wd&&(Wd=ad($d,6E4));O(Vd);var a=N("LOGGING_BATCH_TIMEOUT",sd("web_gel_debounce_ms",1E4));R("shorten_initial_gel_batch_timeout")&&Yd&&(a=Od);Vd=ad($d,a)}
 function ae(a,b){b=void 0===b?"":b;U[a]=U[a]||{};U[a][b]=U[a][b]||[];return U[a][b]}
 function be(a){Rd=Math.round(T()-a)}
 ;function de(){}
 function ee(a){var b=5E3;isNaN(b)&&(b=void 0);var c=A("yt.scheduler.instance.addJob");c?c(a,0,b):void 0===b?a():ad(a,b||0)}
 ;function W(){}
 ia(W,de);W.prototype.start=function(){var a=A("yt.scheduler.instance.start");a&&a()};
 W.f=void 0;W.g=function(){W.f||(W.f=new W)};
 W.g();var fe=A("ytLoggingGelSequenceIdObj_")||{};D("ytLoggingGelSequenceIdObj_",fe);function ge(a){var b=he;a=void 0===a?A("yt.ads.biscotti.lastId_")||"":a;b=Object.assign(ie(b),je(b));b.ca_type="image";a&&(b.bid=a);return b}
 function ie(a){var b={};b.dt=Ob;b.flash="0";a:{try{var c=a.f.top.location.href}catch(f){a=2;break a}a=c?c===a.g.location.href?0:1:2}b=(b.frm=a,b);b.u_tz=-(new Date).getTimezoneOffset();var d=void 0===d?I:d;try{var e=d.history.length}catch(f){e=0}b.u_his=e;b.u_java=!!I.navigator&&"unknown"!==typeof I.navigator.javaEnabled&&!!I.navigator.javaEnabled&&I.navigator.javaEnabled();I.screen&&(b.u_h=I.screen.height,b.u_w=I.screen.width,b.u_ah=I.screen.availHeight,b.u_aw=I.screen.availWidth,b.u_cd=I.screen.colorDepth);
 I.navigator&&I.navigator.plugins&&(b.u_nplug=I.navigator.plugins.length);I.navigator&&I.navigator.mimeTypes&&(b.u_nmime=I.navigator.mimeTypes.length);return b}
 function je(a){var b=a.f;try{var c=b.screenX;var d=b.screenY}catch(p){}try{var e=b.outerWidth;var f=b.outerHeight}catch(p){}try{var k=b.innerWidth;var g=b.innerHeight}catch(p){}b=[b.screenLeft,b.screenTop,c,d,b.screen?b.screen.availWidth:void 0,b.screen?b.screen.availTop:void 0,e,f,k,g];c=a.f.top;try{var h=(c||window).document,l="CSS1Compat"==h.compatMode?h.documentElement:h.body;var m=(new zb(l.clientWidth,l.clientHeight)).round()}catch(p){m=new zb(-12245933,-12245933)}h=m;m={};l=new Ub;y.SVGElement&&
 y.document.createElementNS&&l.set(0);c=Nb();c["allow-top-navigation-by-user-activation"]&&l.set(1);c["allow-popups-to-escape-sandbox"]&&l.set(2);y.crypto&&y.crypto.subtle&&l.set(3);y.TextDecoder&&y.TextEncoder&&l.set(4);l=Vb(l);m.bc=l;m.bih=h.height;m.biw=h.width;m.brdim=b.join();a=a.g;return m.vis={visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[a.visibilityState||a.webkitVisibilityState||a.mozVisibilityState||""]||0,m.wgl=!!I.WebGLRenderingContext,m}
 var he=new function(){var a=window.document;this.f=window;this.g=a};
 D("yt.ads_.signals_.getAdSignalsString",function(a){return cd(ge(a))});C();var ke=void 0!==XMLHttpRequest?function(){return new XMLHttpRequest}:void 0!==ActiveXObject?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:null;
 function le(){if(!ke)return null;var a=ke();return"open"in a?a:null}
 ;var me={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},ne="app debugcss debugjs expflag force_ad_params force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" "),
 oe=!1;
 function pe(a,b){b=void 0===b?{}:b;if(!c)var c=window.location.href;var d=J(a)[1]||null,e=Eb(J(a)[3]||null);d&&e?(d=c,c=J(a),d=J(d),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?Eb(J(c)[3]||null)==e&&(Number(J(c)[4]||null)||null)==(Number(J(a)[4]||null)||null):!0;d=R("web_ajax_ignore_global_headers_if_set");for(var f in me)e=N(me[f]),!e||!c&&!qe(a,f)||d&&void 0!==b[f]||(b[f]=e);if(c||qe(a,"X-YouTube-Utc-Offset"))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());(c||qe(a,"X-YouTube-Time-Zone"))&&(f=
 "undefined"!=typeof Intl?(new Intl.DateTimeFormat).resolvedOptions().timeZone:null)&&(b["X-YouTube-Time-Zone"]=f);if(c||qe(a,"X-YouTube-Ad-Signals"))b["X-YouTube-Ad-Signals"]=cd(ge(void 0));return b}
 function re(a){var b=window.location.search,c=Eb(J(a)[3]||null),d=Eb(J(a)[5]||null);d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=dd(b),f={};F(ne,function(k){e[k]&&(f[k]=e[k])});
 return fd(a,f||{},!1)}
 function qe(a,b){var c=N("CORS_HEADER_WHITELIST")||{},d=Eb(J(a)[3]||null);return d?(c=c[d])?0<=Fa(c,b):!1:!0}
 function se(a,b){if(window.fetch&&"XML"!=b.format){var c={method:b.method||"GET",credentials:"same-origin"};b.headers&&(c.headers=b.headers);a=te(a,b);var d=ue(a,b);d&&(c.body=d);b.withCredentials&&(c.credentials="include");var e=!1,f;fetch(a,c).then(function(k){if(!e){e=!0;f&&O(f);var g=k.ok,h=function(l){l=l||{};var m=b.context||y;g?b.onSuccess&&b.onSuccess.call(m,l,k):b.onError&&b.onError.call(m,l,k);b.L&&b.L.call(m,l,k)};
 "JSON"==(b.format||"JSON")&&(g||400<=k.status&&500>k.status)?k.json().then(h,function(){h(null)}):h(null)}});
 b.fa&&0<b.timeout&&(f=ad(function(){e||(e=!0,O(f))},b.timeout))}else ve(a,b)}
 function ve(a,b){var c=b.format||"JSON";a=te(a,b);var d=ue(a,b),e=!1,f,k=we(a,function(g){if(!e){e=!0;f&&O(f);a:switch(g&&"status"in g?g.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:var h=!0;break a;default:h=!1}var l=null,m=400<=g.status&&500>g.status,p=500<=g.status&&600>g.status;if(h||m||p)l=xe(c,g,b.wa);if(h)a:if(g&&204==g.status)h=!0;else{switch(c){case "XML":h=0==parseInt(l&&l.return_code,10);break a;case "RAW":h=!0;break a}h=!!l}l=l||{};m=b.context||y;
 h?b.onSuccess&&b.onSuccess.call(m,g,l):b.onError&&b.onError.call(m,g,l);b.L&&b.L.call(m,g,l)}},b.method,d,b.headers,b.responseType,b.withCredentials);
 b.S&&0<b.timeout&&(f=ad(function(){e||(e=!0,k.abort(),O(f))},b.timeout))}
 function te(a,b){b.za&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=N("XSRF_FIELD_NAME",void 0),d=b.ga;d&&(d[c]&&delete d[c],a=ed(a,d));return a}
 function ue(a,b){var c=N("XSRF_FIELD_NAME",void 0),d=N("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.s,k=N("XSRF_FIELD_NAME",void 0),g;b.headers&&(g=b.headers["Content-Type"]);b.ya||Eb(J(a)[3]||null)&&!b.withCredentials&&Eb(J(a)[3]||null)!=document.location.hostname||"POST"!=b.method||g&&"application/x-www-form-urlencoded"!=g||b.s&&b.s[k]||(f||(f={}),f[c]=d);f&&"string"===typeof e&&(e=dd(e),Sa(e,f),e=b.U&&"JSON"==b.U?JSON.stringify(e):Hb(e));f=e||f&&!Oa(f);!oe&&f&&"POST"!=b.method&&(oe=!0,Rc(Error("AJAX request with postData should use POST")));
 return e}
 function xe(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=JSON.parse(a));break;case "XML":if(b=(b=b.responseXML)?ye(b):null)d={},F(b.getElementsByTagName("*"),function(e){d[e.tagName]=ze(e)})}c&&Ae(d);
 return d}
 function Ae(a){if(xa(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);c?a[b]=new db:Ae(a[b])}}
 function ye(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
 function ze(a){var b="";F(a.childNodes,function(c){b+=c.nodeValue});
 return b}
 function we(a,b,c,d,e,f,k){function g(){4==(h&&"readyState"in h?h.readyState:0)&&b&&Qc(b)(h)}
 c=void 0===c?"GET":c;d=void 0===d?"":d;var h=le();if(!h)return null;"onloadend"in h?h.addEventListener("loadend",g,!1):h.onreadystatechange=g;R("debug_forward_web_query_parameters")&&(a=re(a));h.open(c,a,!0);f&&(h.responseType=f);k&&(h.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=pe(a,e))for(var l in e)h.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&h.setRequestHeader("Content-Type","application/x-www-form-urlencoded");h.send(d);
 return h}
 ;function Be(){for(var a={},b=t(Object.entries(dd(N("DEVICE","")))),c=b.next();!c.done;c=b.next()){var d=t(c.value);c=d.next().value;d=d.next().value;"cbrand"===c?a.deviceMake=d:"cmodel"===c?a.deviceModel=d:"cbr"===c?a.browserName=d:"cbrver"===c?a.browserVersion=d:"cos"===c?a.osName=d:"cosver"===c?a.osVersion=d:"cplatform"===c&&(a.platform=d)}return a}
 ;function Ce(){return"INNERTUBE_API_KEY"in Mc&&"INNERTUBE_API_VERSION"in Mc}
 function Kd(){return{innertubeApiKey:N("INNERTUBE_API_KEY",void 0),innertubeApiVersion:N("INNERTUBE_API_VERSION",void 0),Y:N("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),Z:N("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:N("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),ba:N("INNERTUBE_CONTEXT_HL",void 0),aa:N("INNERTUBE_CONTEXT_GL",void 0),ca:N("INNERTUBE_HOST_OVERRIDE",void 0)||"",da:!!N("INNERTUBE_USE_THIRD_PARTY_AUTH",!1)}}
 function Jd(a){a={client:{hl:a.ba,gl:a.aa,clientName:a.Z,clientVersion:a.innertubeContextClientVersion,configInfo:a.Y}};var b=window.devicePixelRatio;b&&1!=b&&(a.client.screenDensityFloat=String(b));b=N("EXPERIMENTS_TOKEN","");""!==b&&(a.client.experimentsToken=b);b=[];var c=N("EXPERIMENTS_FORCED_FLAGS",{});for(d in c)b.push({key:d,value:String(c[d])});var d=N("EXPERIMENT_FLAGS",{});for(var e in d)e.startsWith("force_")&&void 0===c[e]&&b.push({key:e,value:String(d[e])});0<b.length&&(a.request={internalExperimentFlags:b});
 N("DELEGATED_SESSION_ID")&&!R("pageid_as_header_web")&&(a.user={onBehalfOfUser:N("DELEGATED_SESSION_ID")});R("enable_device_forwarding_from_xhr_client")&&(a.client=Object.assign(a.client,Be()));return a}
 function De(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||N("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.va||N("AUTHORIZATION"))||(a?b="Bearer "+A("gapi.auth.getToken")().ua:b=Tb([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=N("SESSION_INDEX",0),R("pageid_as_header_web")&&(d["X-Goog-PageId"]=N("DELEGATED_SESSION_ID")));return d}
 function Ee(a){a=Object.assign({},a);delete a.Authorization;var b=Tb();if(b){var c=new jc;c.update(N("INNERTUBE_API_KEY",void 0));c.update(b);b=c.digest();c=3;void 0===c&&(c=0);if(!ub){ub={};for(var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var k=d.concat(e[f].split(""));tb[f]=k;for(var g=0;g<k.length;g++){var h=k[g];void 0===ub[h]&&(ub[h]=g)}}}c=tb[c];d=[];for(e=0;e<b.length;e+=3){var l=b[e],m=(f=e+1<b.length)?b[e+1]:
 0;h=(k=e+2<b.length)?b[e+2]:0;g=l>>2;l=(l&3)<<4|m>>4;m=(m&15)<<2|h>>6;h&=63;k||(h=64,f||(m=64));d.push(c[g],c[l],c[m]||"",c[h]||"")}a.hash=d.join("")}return a}
 ;function Fe(){var a=new Fc;(a=a.isAvailable()?new Lc(a,"yt.innertube"):null)||(a=new Gc("yt.innertube"),a=a.isAvailable()?a:null);this.f=a?new M(a):null;this.g=document.domain||window.location.hostname}
 Fe.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.f)try{this.f.set(a,b,C()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(uc(b))}catch(f){return}else e=escape(b);b=this.g;yb.set(""+a,e,{P:c,path:"/",domain:void 0===b?"youtube.com":b,secure:!1})};
 Fe.prototype.get=function(a,b){var c=void 0,d=!this.f;if(!d)try{c=this.f.get(a)}catch(e){d=!0}if(d&&(c=yb.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
 Fe.prototype.remove=function(a){this.f&&this.f.remove(a);var b=this.g;yb.remove(""+a,"/",void 0===b?"youtube.com":b)};var X=new Fe;function Ge(a,b,c,d){if(d)return null;d=X.get("nextId",!0)||1;var e=X.get("requests",!0)||{};e[d]={method:a,request:b,authState:Ee(c),requestTime:Math.round(T())};X.set("nextId",d+1,86400,!0);X.set("requests",e,86400,!0);return d}
 function He(a){var b=X.get("requests",!0)||{};delete b[a];X.set("requests",b,86400,!0)}
 function Ie(a){var b=X.get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(T())-d.requestTime)){var e=d.authState,f=Ee(De(!1));Pa(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(T())),Nd(a,d.method,e,{}));delete b[c]}}X.set("requests",b,86400,!0)}}
 ;function Je(a){var b=this;this.f=null;a?this.f=a:Ce()&&(this.f=Kd());ee(function(){Ie(b)})}
 Je.prototype.isReady=function(){!this.f&&Ce()&&(this.f=Kd());return!!this.f};
 function Nd(a,b,c,d){!N("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&Sc(Error("Missing VISITOR_DATA when sending innertube request."));var e={headers:{"Content-Type":"application/json"},method:"POST",s:c,U:"JSON",S:function(){},
 fa:d.S,onSuccess:function(n,q){if(d.onSuccess)d.onSuccess(q)},
 R:function(n){if(d.onSuccess)d.onSuccess(n)},
 onError:function(n,q){if(d.onError)d.onError(q)},
 Aa:function(n){if(d.onError)d.onError(n)},
 timeout:d.timeout,withCredentials:!0},f="",k=a.f.ca;k&&(f=k);k=a.f.da||!1;var g=De(k,f,d);Object.assign(e.headers,g);e.headers.Authorization&&!f&&(e.headers["x-origin"]=window.location.origin);var h=ed(""+f+("/youtubei/"+a.f.innertubeApiVersion+"/"+b),{alt:"json",key:a.f.innertubeApiKey}),l;if(d.retry&&R("retry_web_logging_batches")&&"www.youtube-nocookie.com"!=f&&(l=Ge(b,c,g,k))){var m=e.onSuccess,p=e.R;e.onSuccess=function(n,q){He(l);m(n,q)};
 c.R=function(n,q){He(l);p(n,q)}}try{R("use_fetch_for_op_xhr")?se(h,e):(e.method="POST",e.s||(e.s={}),ve(h,e))}catch(n){if("InvalidAccessError"==n)l&&(He(l),l=0),Sc(Error("An extension is blocking network request."));
 else throw n;}l&&ee(function(){Ie(a)})}
 ;var Ke=new Set,Le=0;function Me(a,b,c,d){c+="."+a;a=String(JSON.stringify(b)).substr(0,500);d[c]=a;return c.length+a.length}
 ;function Y(a,b,c){this.l=this.f=this.g=null;this.j=ya(this);this.h=0;this.A=!1;this.o=[];this.i=null;this.F=c;this.G={};c=document;if(a="string"===typeof a?c.getElementById(a):a)if(c="iframe"==a.tagName.toLowerCase(),b.host||(b.host=c?Fb(a.src):"https://www.youtube.com"),this.g=new od(b),c||(b=Ne(this,a),this.l=a,(c=a.parentNode)&&c.replaceChild(b,a),a=b),this.f=a,this.f.id||(this.f.id="widget"+ya(this.f)),id[this.f.id]=this,window.postMessage){this.i=new L;Oe(this);b=Q(this.g,"events");for(var d in b)b.hasOwnProperty(d)&&
 this.addEventListener(d,b[d]);for(var e in kd)Pe(this,e)}}
 r=Y.prototype;r.setSize=function(a,b){this.f.width=a;this.f.height=b;return this};
 r.ea=function(){return this.f};
 r.V=function(a){this.D(a.event,a)};
 r.addEventListener=function(a,b){var c=b;"string"==typeof b&&(c=function(){window[b].apply(window,arguments)});
 if(!c)return this;this.i.subscribe(a,c);Qe(this,a);return this};
 function Pe(a,b){var c=b.split(".");if(2==c.length){var d=c[1];a.F==c[0]&&Qe(a,d)}}
 r.destroy=function(){this.f.id&&(id[this.f.id]=null);var a=this.i;a&&"function"==typeof a.dispose&&a.dispose();if(this.l){a=this.f;var b=a.parentNode;b&&b.replaceChild(this.l,a)}else(a=this.f)&&a.parentNode&&a.parentNode.removeChild(a);qd&&(qd[this.j]=null);this.g=null;a=this.f;for(var c in G)G[c][0]==a&&Yc(c);this.l=this.f=null};
 r.I=function(){return{}};
 function Re(a,b,c){c=c||[];c=Array.prototype.slice.call(c);b={event:"command",func:b,args:c};a.A?a.N(b):a.o.push(b)}
 r.D=function(a,b){if(!this.i.h){var c={target:this,data:b};this.i.M(a,c);nd(this.F+"."+a,c)}};
 function Ne(a,b){for(var c=document.createElement("iframe"),d=b.attributes,e=0,f=d.length;e<f;e++){var k=d[e].value;null!=k&&""!=k&&"null"!=k&&c.setAttribute(d[e].name,k)}c.setAttribute("frameBorder",0);c.setAttribute("allowfullscreen",1);c.setAttribute("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");c.setAttribute("title","YouTube "+Q(a.g,"title"));(d=Q(a.g,"width"))&&c.setAttribute("width",d);(d=Q(a.g,"height"))&&c.setAttribute("height",d);var g=a.I();g.enablejsapi=
 window.postMessage?1:0;window.location.host&&(g.origin=window.location.protocol+"//"+window.location.host);g.widgetid=a.j;window.location.href&&F(["debugjs","debugcss"],function(h){var l=window.location.href;var m=l.search(Ib);b:{var p=0;for(var n=h.length;0<=(p=l.indexOf(h,p))&&p<m;){var q=l.charCodeAt(p-1);if(38==q||63==q)if(q=l.charCodeAt(p+n),!q||61==q||38==q||35==q)break b;p+=n+1}p=-1}if(0>p)l=null;else{n=l.indexOf("&",p);if(0>n||n>m)n=m;p+=h.length+1;l=decodeURIComponent(l.substr(p,n-p).replace(/\+/g,
 " "))}null!==l&&(g[h]=l)});
 c.src=Q(a.g,"host")+a.J()+"?"+Hb(g);return c}
 r.T=function(){this.f&&this.f.contentWindow?this.N({event:"listening"}):window.clearInterval(this.h)};
 function Oe(a){pd(a.g,a,a.j);a.h=bd(B(a.T,a));$c(a.f,"load",B(function(){window.clearInterval(this.h);this.h=bd(B(this.T,this))},a))}
 function Qe(a,b){a.G[b]||(a.G[b]=!0,Re(a,"addEventListener",[b]))}
 r.N=function(a){a.id=this.j;a.channel="widget";a=uc(a);var b=this.g;var c=Fb(this.f.src||"");b=0==c.indexOf("https:")?[c]:b.f?[c.replace("http:","https:")]:b.h?[c]:[c,c.replace("http:","https:")];if(this.f.contentWindow)for(c=0;c<b.length;c++)try{this.f.contentWindow.postMessage(a,b[c])}catch(z){if(z.name&&"SyntaxError"==z.name){if(!(z.message&&0<z.message.indexOf("target origin ''"))){var d=void 0,e=void 0,f=z;e=void 0===e?{}:e;e.name=N("INNERTUBE_CONTEXT_CLIENT_NAME",1);e.version=N("INNERTUBE_CONTEXT_CLIENT_VERSION",
 void 0);var k=e||{};e="WARNING";e=void 0===e?"ERROR":e;var g=window&&window.yterr||!1;if(f&&g&&!(5<=Le)){if(R("console_log_js_exceptions")){g=f;var h=[];h.push("Name: "+g.name);h.push("Message: "+g.message);g.hasOwnProperty("params")&&h.push("Error Params: "+JSON.stringify(g.params));h.push("File name: "+g.fileName);h.push("Stacktrace: "+g.stack);window.console.log(h.join("\n"),g)}if(0!==f.f){g=f.g;h=f.columnNumber;if(f.args&&f.args.length){var l=0;for(d=0;d<f.args.length;d++){var m=f.args[d],p="params."+
 d;l+=p.length;if(m)if(Array.isArray(m)){var n=m;m=p;p=k;for(var q=0;q<n.length&&!(n[q]&&(l+=Me(q,n[q],m,p),500<l));q++);}else if("object"===typeof m)for(n in n=void 0,q=k,m){if(m[n]&&(l+=Me(n,m[n],p,q),500<l))break}else k[p]=String(JSON.stringify(m)).substring(0,500),l+=k[p].length;else k[p]=String(JSON.stringify(m)).substring(0,500),l+=k[p].length;if(500<=l)break}}else if(f.hasOwnProperty("params"))if(l=f.params,"object"===typeof f.params)for(d in n=0,l){if(l[d]&&(m="params."+d,p=String(JSON.stringify(l[d])).substr(0,
 500),k[m]=p,n+=m.length+p.length,500<n))break}else k.params=String(JSON.stringify(l)).substr(0,500);f=vb(f);(g=g||f.stack)||(g="Not available");l={stackTrace:g};f.fileName&&(l.filename=f.fileName);d=f.lineNumber.toString();isNaN(d)||!h||isNaN(h)||(l.lineNumber=Number(d),l.columnNumber=Number(h),d=d+":"+h);window.yterr&&wa(window.yterr)&&(f.params=k,window.yterr(f));if(!(Ke.has(f.message)||0<=g.indexOf("/YouTubeCenter.js")||0<=g.indexOf("/mytube.js"))){if(R("kevlar_gel_error_routing")){h=void 0;m=
 e;p=l;l=k;n={level:"ERROR_LEVEL_UNKNOWN",message:f.message};"ERROR"===m?n.level="ERROR_LEVEL_ERROR":"WARNING"===m&&(n.level="ERROR_LEVEL_WARNNING");m={isObfuscated:!0,browserStackInfo:p};p={pageUrl:window.location.href,kvPairs:[]};q=t(Object.keys(l));for(var v=q.next();!v.done;v=q.next())v=v.value,p.kvPairs.push({key:"client."+v,value:String(l[v])});m={errorMetadata:p,stackTrace:m,logMessage:n};h=void 0===h?{}:h;l=Je;N("ytLoggingEventsDefaultDisabled",!1)&&Je==Je&&(l=null);h=void 0===h?{}:h;n={};
 n.eventTimeMs=Math.round(h.timestamp||T());n.clientError=m;m=String;h.timestamp?p=-1:(p=A("_lact",window),null==p?p=-1:p=Math.max(C()-p,0));n.context={lastActivityMs:m(p)};R("log_sequence_info_on_gel_web")&&h.W&&(m=n.context,p=h.W,fe[p]=p in fe?fe[p]+1:0,m.sequence={index:fe[p],groupKey:p},h.xa&&delete fe[h.W]);h={endpoint:"log_event",payload:n,u:h.u};R("use_typescript_transport")?"log_event"===h.endpoint&&(m="",h.u&&(n=h.u,m={},n.videoId?m.videoId=n.videoId:n.playlistId&&(m.playlistId=n.playlistId),
 Fd[h.u.token]=m,m=h.u.token),n=Ed.get(m)||[],Ed.set(m,n),n.push(h.payload),l&&(yd=new l),h=sd("web_logging_max_batch")||100,l=T(),n.length>=h?Gd():10<=l-Bd&&(Id(),Bd=l)):(h.u?(n=h.u,m={},n.videoId?m.videoId=n.videoId:n.playlistId&&(m.playlistId=n.playlistId),Zd[h.u.token]=m,n=ae(h.endpoint,h.u.token)):n=ae(h.endpoint),n.push(h.payload),l&&(Ud[h.endpoint]=new l),h=sd("web_logging_max_batch")||100,l=T(),n.length>=h?$d():10<=l-Xd&&(ce(),Xd=l));$d()}e={ga:{a:"logerror",t:"jserror",type:f.name,msg:f.message.substr(0,
 250),line:d,level:e,"client.name":k.name},s:{url:N("PAGE_NAME",window.location.href),file:f.fileName},method:"POST"};k.version&&(e["client.version"]=k.version);if(e.s){g&&(e.s.stack=g);g=t(Object.keys(k));for(d=g.next();!d.done;d=g.next())d=d.value,e.s["client."+d]=k[d];if(k=N("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(g=t(Object.keys(k)),d=g.next();!d.done;d=g.next())d=d.value,e.s[d]=k[d]}ve(N("ECATCHER_REPORT_HOST","")+"/error_204",e);Ke.add(f.message);Le++}}}}}else throw z;}else console&&
 console.warn&&console.warn("The YouTube player is not attached to the DOM. API calls should be made after the onReady event. See more: https://developers.google.com/youtube/iframe_api_reference#Events")};function Se(a){return(0===a.search("cue")||0===a.search("load"))&&"loadModule"!==a}
 function Te(a){return 0===a.search("get")||0===a.search("is")}
 ;function Z(a,b){if(!a)throw Error("YouTube player element ID required.");var c={title:"video player",videoId:"",width:640,height:360};if(b)for(var d in b)c[d]=b[d];Y.call(this,a,c,"player");this.w={};this.playerInfo={}}
 ia(Z,Y);r=Z.prototype;r.J=function(){return"/embed/"+Q(this.g,"videoId")};
 r.I=function(){var a=Q(this.g,"playerVars");if(a){var b={},c;for(c in a)b[c]=a[c];a=b}else a={};window!=window.top&&document.referrer&&(a.widget_referrer=document.referrer.substring(0,256));if(c=Q(this.g,"embedConfig")){if(xa(c))try{c=JSON.stringify(c)}catch(d){console.error("Invalid embed config JSON",d)}a.embed_config=c}return a};
 r.V=function(a){var b=a.event;a=a.info;switch(b){case "apiInfoDelivery":if(xa(a))for(var c in a)this.w[c]=a[c];break;case "infoDelivery":Ue(this,a);break;case "initialDelivery":window.clearInterval(this.h);this.playerInfo={};this.w={};Ve(this,a.apiInterface);Ue(this,a);break;default:this.D(b,a)}};
 function Ue(a,b){if(xa(b))for(var c in b)a.playerInfo[c]=b[c]}
 function Ve(a,b){F(b,function(c){this[c]||("getCurrentTime"==c?this[c]=function(){var d=this.playerInfo.currentTime;if(1==this.playerInfo.playerState){var e=(C()/1E3-this.playerInfo.currentTimeLastUpdated_)*this.playerInfo.playbackRate;0<e&&(d+=Math.min(e,1))}return d}:Se(c)?this[c]=function(){this.playerInfo={};
 this.w={};Re(this,c,arguments);return this}:Te(c)?this[c]=function(){var d=0;
 0===c.search("get")?d=3:0===c.search("is")&&(d=2);return this.playerInfo[c.charAt(d).toLowerCase()+c.substr(d+1)]}:this[c]=function(){Re(this,c,arguments);
 return this})},a)}
 r.getVideoEmbedCode=function(){var a=parseInt(Q(this.g,"width"),10);var b=parseInt(Q(this.g,"height"),10),c=Q(this.g,"host")+this.J();$a.test(c)&&(-1!=c.indexOf("&")&&(c=c.replace(Ua,"&amp;")),-1!=c.indexOf("<")&&(c=c.replace(Va,"&lt;")),-1!=c.indexOf(">")&&(c=c.replace(Wa,"&gt;")),-1!=c.indexOf('"')&&(c=c.replace(Xa,"&quot;")),-1!=c.indexOf("'")&&(c=c.replace(Ya,"&#39;")),-1!=c.indexOf("\x00")&&(c=c.replace(Za,"&#0;")));a='<iframe width="'+a+'" height="'+b+'" src="'+c+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
 return a};
 r.getOptions=function(a){return this.w.namespaces?a?this.w[a].options||[]:this.w.namespaces||[]:[]};
 r.getOption=function(a,b){if(this.w.namespaces&&a&&b)return this.w[a][b]};
 function We(a){if("iframe"!=a.tagName.toLowerCase()){var b=P(a,"videoid");b&&(b={videoId:b,width:P(a,"width"),height:P(a,"height")},new Z(a,b))}}
 ;function Xe(a,b){var c={title:"Thumbnail",videoId:"",width:120,height:68};if(b)for(var d in b)c[d]=b[d];Y.call(this,a,c,"thumbnail")}
 ia(Xe,Y);Xe.prototype.J=function(){return"/embed/"+Q(this.g,"videoId")};
 Xe.prototype.I=function(){return{player:0,thumb_width:Q(this.g,"thumbWidth"),thumb_height:Q(this.g,"thumbHeight"),thumb_align:Q(this.g,"thumbAlign")}};
 Xe.prototype.D=function(a,b){Y.prototype.D.call(this,a,b?b.info:void 0)};
 function Ye(a){if("iframe"!=a.tagName.toLowerCase()){var b=P(a,"videoid");if(b){b={videoId:b,events:{},width:P(a,"width"),height:P(a,"height"),thumbWidth:P(a,"thumb-width"),thumbHeight:P(a,"thumb-height"),thumbAlign:P(a,"thumb-align")};var c=P(a,"onclick");c&&(b.events.onClick=c);new Xe(a,b)}}}
 ;D("YT.PlayerState.UNSTARTED",-1);D("YT.PlayerState.ENDED",0);D("YT.PlayerState.PLAYING",1);D("YT.PlayerState.PAUSED",2);D("YT.PlayerState.BUFFERING",3);D("YT.PlayerState.CUED",5);D("YT.get",function(a){return id[a]});
 D("YT.scan",ld);D("YT.subscribe",function(a,b,c){wc.subscribe(a,b,c);kd[a]=!0;for(var d in id)Pe(id[d],a)});
 D("YT.unsubscribe",function(a,b,c){vc(a,b,c)});
 D("YT.Player",Z);D("YT.Thumbnail",Xe);Y.prototype.destroy=Y.prototype.destroy;Y.prototype.setSize=Y.prototype.setSize;Y.prototype.getIframe=Y.prototype.ea;Y.prototype.addEventListener=Y.prototype.addEventListener;Z.prototype.getVideoEmbedCode=Z.prototype.getVideoEmbedCode;Z.prototype.getOptions=Z.prototype.getOptions;Z.prototype.getOption=Z.prototype.getOption;jd.push(function(a){a=md("player",a);F(a,We)});
 jd.push(function(){var a=md("thumbnail");F(a,Ye)});
 "undefined"!=typeof YTConfig&&YTConfig.parsetags&&"onload"!=YTConfig.parsetags||ld();var Ze=A("onYTReady");Ze&&Ze();var $e=A("onYouTubeIframeAPIReady");$e&&$e();var af=A("onYouTubePlayerAPIReady");af&&af();}).call(this);
 