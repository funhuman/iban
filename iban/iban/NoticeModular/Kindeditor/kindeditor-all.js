/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2013 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @website http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
* @version 4.1.10 (2013-11-23)
*******************************************************************************/
(function (window, undefined) {
	if (window.KindEditor) {
		return;
	}
if (!window.console) {
	window.console = {};
}
if (!console.log) {
	console.log = function () {};
}
var _VERSION = '4.1.10 (2013-11-23)',
	_ua = navigator.userAgent.toLowerCase(),
	_IE = _ua.indexOf('msie') > -1 && _ua.indexOf('opera') == -1,
	_NEWIE = _ua.indexOf('msie') == -1 && _ua.indexOf('trident') > -1,
	_GECKO = _ua.indexOf('gecko') > -1 && _ua.indexOf('khtml') == -1,
	_WEBKIT = _ua.indexOf('applewebkit') > -1,
	_OPERA = _ua.indexOf('opera') > -1,
	_MOBILE = _ua.indexOf('mobile') > -1,
	_IOS = /ipad|iphone|ipod/.test(_ua),
	_QUIRKS = document.compatMode != 'CSS1Compat',
	_IERANGE = !window.getSelection,
	_matches = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(_ua),
	_V = _matches ? _matches[1] : '0',
	_TIME = new Date().getTime();
function _isArray(val) {
	if (!val) {
		return false;
	}
	return Object.prototype.toString.call(val) === '[object Array]';
}
function _isFunction(val) {
	if (!val) {
		return false;
	}
	return Object.prototype.toString.call(val) === '[object Function]';
}
function _inArray(val, arr) {
	for (var i = 0, len = arr.length; i < len; i++) {
		if (val === arr[i]) {
			return i;
		}
	}
	return -1;
}
function _each(obj, fn) {
	if (_isArray(obj)) {
		for (var i = 0, len = obj.length; i < len; i++) {
			if (fn.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn.call(obj[key], key, obj[key]) === false) {
					break;
				}
			}
		}
	}
}
function _trim(str) {
	return str.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '');
}
function _inString(val, str, delimiter) {
	delimiter = delimiter === undefined ? ',' : delimiter;
	return (delimiter + str + delimiter).indexOf(delimiter + val + delimiter) >= 0;
}
function _addUnit(val, unit) {
	unit = unit || 'px';
	return val && /^\d+$/.test(val) ? val + unit : val;
}
function _removeUnit(val) {
	var match;
	return val && (match = /(\d+)/.exec(val)) ? parseInt(match[1], 10) : 0;
}
function _escape(val) {
	return val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function _unescape(val) {
	return val.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}
function _toCamel(str) {
	var arr = str.split('-');
	str = '';
	_each(arr, function(key, val) {
		str += (key > 0) ? val.charAt(0).toUpperCase() + val.substr(1) : val;
	});
	return str;
}
function _toHex(val) {
	function hex(d) {
		var s = parseInt(d, 10).toString(16).toUpperCase();
		return s.length > 1 ? s : '0' + s;
	}
	return val.replace(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/ig,
		function($0, $1, $2, $3) {
			return '#' + hex($1) + hex($2) + hex($3);
		}
	);
}
function _toMap(val, delimiter) {
	delimiter = delimiter === undefined ? ',' : delimiter;
	var map = {}, arr = _isArray(val) ? val : val.split(delimiter), match;
	_each(arr, function(key, val) {
		if ((match = /^(\d+)\.\.(\d+)$/.exec(val))) {
			for (var i = parseInt(match[1], 10); i <= parseInt(match[2], 10); i++) {
				map[i.toString()] = true;
			}
		} else {
			map[val] = true;
		}
	});
	return map;
}
function _toArray(obj, offset) {
	return Array.prototype.slice.call(obj, offset || 0);
}
function _undef(val, defaultVal) {
	return val === undefined ? defaultVal : val;
}
function _invalidUrl(url) {
	return !url || /[<>"]/.test(url);
}
function _addParam(url, param) {
	return url.indexOf('?') >= 0 ? url + '&' + param : url + '?' + param;
}
function _extend(child, parent, proto) {
	if (!proto) {
		proto = parent;
		parent = null;
	}
	var childProto;
	if (parent) {
		var fn = function () {};
		fn.prototype = parent.prototype;
		childProto = new fn();
		_each(proto, function(key, val) {
			childProto[key] = val;
		});
	} else {
		childProto = proto;
	}
	childProto.constructor = child;
	child.prototype = childProto;
	child.parent = parent ? parent.prototype : null;
}
function _json(text) {
	var match;
	if ((match = /\{[\s\S]*\}|\[[\s\S]*\]/.exec(text))) {
		text = match[0];
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	cx.lastIndex = 0;
	if (cx.test(text)) {
		text = text.replace(cx, function (a) {
			return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		});
	}
	if (/^[\],:{}\s]*$/.
	test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
	replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
	replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		return eval('(' + text + ')');
	}
	throw 'JSON parse error';
}
var _round = Math.round;
var K = {
	DEBUG : false,
	VERSION : _VERSION,
	IE : _IE,
	GECKO : _GECKO,
	WEBKIT : _WEBKIT,
	OPERA : _OPERA,
	V : _V,
	TIME : _TIME,
	each : _each,
	isArray : _isArray,
	isFunction : _isFunction,
	inArray : _inArray,
	inString : _inString,
	trim : _trim,
	addUnit : _addUnit,
	removeUnit : _removeUnit,
	escape : _escape,
	unescape : _unescape,
	toCamel : _toCamel,
	toHex : _toHex,
	toMap : _toMap,
	toArray : _toArray,
	undef : _undef,
	invalidUrl : _invalidUrl,
	addParam : _addParam,
	extend : _extend,
	json : _json
};
var _INLINE_TAG_MAP = _toMap('a,abbr,acronym,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,img,input,ins,kbd,label,map,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'),
	_BLOCK_TAG_MAP = _toMap('address,applet,blockquote,body,center,dd,dir,div,dl,dt,fieldset,form,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,iframe,ins,isindex,li,map,menu,meta,noframes,noscript,object,ol,p,pre,script,style,table,tbody,td,tfoot,th,thead,title,tr,ul'),
	_SINGLE_TAG_MAP = _toMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed'),
	_STYLE_TAG_MAP = _toMap('b,basefont,big,del,em,font,i,s,small,span,strike,strong,sub,sup,u'),
	_CONTROL_TAG_MAP = _toMap('img,table,input,textarea,button'),
	_PRE_TAG_MAP = _toMap('pre,style,script'),
	_NOSPLIT_TAG_MAP = _toMap('html,head,body,td,tr,table,ol,ul,li'),
	_AUTOCLOSE_TAG_MAP = _toMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr'),
	_FILL_ATTR_MAP = _toMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'),
	_VALUE_TAG_MAP = _toMap('input,button,textarea,select');
function _getBasePath() {
	var els = document.getElementsByTagName('script'), src;
	for (var i = 0, len = els.length; i < len; i++) {
		src = els[i].src || '';
		if (/kindeditor[\w\-\.]*\.js/.test(src)) {
			return src.substring(0, src.lastIndexOf('/') + 1);
		}
	}
	return '';
}
K.basePath = _getBasePath();
K.options = {
	designMode : true,
	fullscreenMode : false,
	filterMode : true,
	wellFormatMode : true,
	shadowMode : true,
	loadStyleMode : true,
	basePath : K.basePath,
	themesPath : K.basePath + 'themes/',
	langPath : K.basePath + 'lang/',
	pluginsPath : K.basePath + 'plugins/',
	themeType : 'default',
	langType : 'zh_CN',
	urlType : '',
	newlineTag : 'p',
	resizeType : 2,
	syncType : 'form',
	pasteType : 2,
	dialogAlignType : 'page',
	useContextmenu : true,
	fullscreenShortcut : false,
	bodyClass : 'ke-content',
	indentChar : '\t',
	cssPath : '',
	cssData : '',
	minWidth : 650,
	minHeight : 100,
	minChangeSize : 50,
	zIndex : 811213,
	items : [
		'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
		'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
		'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
		'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
		'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
		'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
		'anchor', 'link', 'unlink', '|', 'about'
	],
	noDisableItems : ['source', 'fullscreen'],
	colorTable : [
		['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
		['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
		['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
		['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
	],
	fontSizeTable : ['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px'],
	htmlTags : {
		font : ['id', 'class', 'color', 'size', 'face', '.background-color'],
		span : [
			'id', 'class', '.color', '.background-color', '.font-size', '.font-family', '.background',
			'.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'
		],
		div : [
			'id', 'class', 'align', '.border', '.margin', '.padding', '.text-align', '.color',
			'.background-color', '.font-size', '.font-family', '.font-weight', '.background',
			'.font-style', '.text-decoration', '.vertical-align', '.margin-left'
		],
		table: [
			'id', 'class', 'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor',
			'.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
			'.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
			'.width', '.height', '.border-collapse'
		],
		'td,th': [
			'id', 'class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor',
			'.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight',
			'.font-style', '.text-decoration', '.vertical-align', '.background', '.border'
		],
		a : ['id', 'class', 'href', 'target', 'name'],
		embed : ['id', 'class', 'src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
		img : ['id', 'class', 'src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
		'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : [
			'id', 'class', 'align', '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.background',
			'.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
		],
		pre : ['id', 'class'],
		hr : ['id', 'class', '.page-break-after'],
		'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del' : ['id', 'class'],
		iframe : ['id', 'class', 'src', 'frameborder', 'width', 'height', '.width', '.height']
	},
	layout : '<div class="container"><div class="toolbar"></div><div class="edit"></div><div class="statusbar"></div></div>'
};
var _useCapture = false;
var _INPUT_KEY_MAP = _toMap('8,9,13,32,46,48..57,59,61,65..90,106,109..111,188,190..192,219..222');
var _CURSORMOVE_KEY_MAP = _toMap('33..40');
var _CHANGE_KEY_MAP = {};
_each(_INPUT_KEY_MAP, function(key, val) {
	_CHANGE_KEY_MAP[key] = val;
});
_each(_CURSORMOVE_KEY_MAP, function(key, val) {
	_CHANGE_KEY_MAP[key] = val;
});
function _bindEvent(el, type, fn) {
	if (el.addEventListener){
		el.addEventListener(type, fn, _useCapture);
	} else if (el.attachEvent){
		el.attachEvent('on' + type, fn);
	}
}
function _unbindEvent(el, type, fn) {
	if (el.removeEventListener){
		el.removeEventListener(type, fn, _useCapture);
	} else if (el.detachEvent){
		el.detachEvent('on' + type, fn);
	}
}
var _EVENT_PROPS = ('altKey,attrChange,attrName,bubbles,button,cancelable,charCode,clientX,clientY,ctrlKey,currentTarget,' +
	'data,detail,eventPhase,fromElement,handler,keyCode,metaKey,newValue,offsetX,offsetY,originalTarget,pageX,' +
	'pageY,prevValue,relatedNode,relatedTarget,screenX,screenY,shiftKey,srcElement,target,toElement,view,wheelDelta,which').spli$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC$œ’m…Îmo“LÒDüÜ;?g?wêÁÅ·?îùovH0õÉa?£Ú*î Ø’ÃÌlÍ››S iyä”rÕO7ª“%L]İ×%±ºÇhk ¶«·÷>v1­HB£®?ßŞÚd\?eoIx?3?6BS%ÌØá“(
œÛf$Ãh??¿¶åeÔôÚèH??‚`İ¶f{?Fo?Yò¿Ôó@00uMb’z-ëìXI$&ÂgfÖú?Ó´Şu|'K.ÌoP
PİÀùF?Ğıoûò9B<~. ’ïÅË[’´˜Ë<Ù­?¯•¢·ä{1¹A•.?bKxºL ¯??¯u8n5?’ºe ,]?H©–’ÆV¨ŒWw?ùC?el¹“|zys«™KŠi-?qÊİ¬bk,wnGÿ?¥  ~ÖeÉrÍ’‰Ü?~'1`Vâ¦«¹-*[ÉñLÔK?2@?ÜşĞä»ª ²n‘Í?¸N?ˆÆ¶µG•¢ói/U¢µ'Eï@¦`Hæ¹?J??¼¼?Å+Jén#»¼?Ú´?Ä¹G•ü¡NÒG?—Z!öá?¸‰Wi»NJ @óàšAûÜZ|ª[¨ï$q}iÒ·µQbtTEC) {
				if (isStart) {
					self.setStartBefore(node);
				} else {
					self.setEndBefore(node);
				}
			} else if (pos == node.nodeValue.length) {
				if (isStart) {
					self.setStartAfter(node);
				} else {
					self.setEndAfter(node);
				}
			}
		}
		upPos(self.startContainer, self.startOffset, true);
		upPos(self.endContainer, self.endOffset, false);
		return self;
	},
	enlarge : function(toBlock) {
		var self = this;
		self.up();
		function enlargePos(node, pos, isStart) {
			var knode = K(node), parent;
			if (knode.type == 3 || _NOSPLIT_TAG_MAP[knode.name] || !toBlock && knode.isBlock()) {
				return;
			}
			if (pos === 0) {
				while (!knode.prev()) {
					parent = knode.parent();
					if (!parent || _NOSPLIT_TAG_MAP[parent.name] || !toBlock && parent.isBlock()) {
						break;
					}
					knode = parent;
				}
				if (isStart) {
					self.setStartBefore(knode[0]);
				} else {
					self.setEndBefore(knode[0]);
				}
			} else if (pos == knode.children().length) {
				while (!knode.next()) {
					parent = knode.parent();
					if (!parent || _NOSPLIT_TAG_MAP[parent.name] || !toBlock && parent.isBlock()) {
						break;
					}
					knode = parent;
				}
				if (isStart) {
					self.setStartAfter(knode[0]);
				} else {
					self.setEndAfter(knode[0]);
				}
			}
		}
		enlargePos(self.startContainer, self.startOffset, true);
		enlargePos(self.endContainer, self.endOffset, false);
		return self;
	},
	shrink : function() {
		var self = this, child, collapsed = self.collapsed;
		while (self.startContainer.nodeType == 1 && (child = self.startContainer.childNodes[self.startOffset]) && child.nodeType == 1 && !K(child).isSingle()) {
			self.setStart(child, 0);
		}
		if (collapsed) {
			return self.collapse(collapsed);
		}
		while (self.endContainer.nodeType == 1 && self.endOffset > 0 && (child = self.endContainer.childNodes[self.endOffset - 1]) && child.nodeType == 1 && !K(child).isSingle()) {
			self.setEnd(child, child.childNodes.length);
		}
		return self;
	},
	createBookmark : function(serialize) {
		var self = this, doc = self.doc, endNode,
			startNode = K('<span style="display:none;"></span>', doc)[0];
		startNode.id = '__kindeditor_bookmark_start_' + (_BOOKMARK_ID++) + '__';
		if (!self.collapsed) {
			endNode = startNode.cloneNode(true);
			endNode.id = '__kindeditor_bookmark_end_' + (_BOOKMARK_ID++) + '__';
		}
		if (endNode) {
			self.cloneRange().collapse(false).insertNode(endNode).setEndBefore(endNode);
		}
		self.insertNode(startNode).setStartAfter(startNode);
		return {
			start : serialize ? '#' + startNode.id : startNode,
			end : endNode ? (serialize ? '#' + endNode.id : endNode) : null
		};
	},
	moveToBookmark : function(bookmark) {
		var self = this, doc = self.doc,
			start = K(bookmark.start, doc), end = bookmark.end ? K(bookmark.end, doc) : null;
		if (!start || start.length < 1) {
			return self;
		}
		self.setStartBefore(start[0]);
		start.remove();
		if (end && end.length > 0) {
			self.setEndBefore(end[0]);
			end.remove();
		} else {
			self.collapse(true);
		}
		return self;
	},
	dump : function() {
		console.log('--------------------');
		console.log(this.startContainer.nodeType == 3 ? this.startContainer.nodeValue : this.startContainer, this.startOffset);
		console.log(this.endContainer.nodeType == 3 ? this.endContainer.nodeValue : this.endContainer, this.endOffset);
	}
});
function _range(mixed) {
	if (!mixed.nodeName) {
		return mixed.constructor === KRange ? mixed : _toRange(mixed);
	}
	return new KRange(mixed);
}
K.RangeClass = KRange;
K.range = _range;
K.START_TO_START = _START_TO_START;
K.START_TO_END = _START_TO_END;
K.END_TO_END = _END_TO_END;
K.END_TO_START = _END_TO_START;
function _nativeCommand(doc, key, val) {
	try {
		doc.execCommand(key, false, val);
	} catch(e) {}
}
function _nativeCommandValue(doc, key) {
	var val = '';
	try {
		val = doc.queryCommandValue(key);
	} catch (e) {}
	if (typeof val !== 'string') {
		val = '';
	}
	return val;
}
function _getSel(doc) {
	var win = _getWin(doc);
	return _IERANGE ? doc.selection : win.getSelection();
}
function _getRng(doc) {
	var sel = _getSel(doc), rng;
	try {
		if (sel.rangeCount > 0) {
			rng = sel.getRangeAt(0);
		} else {
			rng = sel.createRange();
		}
	} catch(e) {}
	if (_IERANGE && (!rng || (!rng.item && rng.parentElement().ownerDocument !== doc))) {
		return null;
	}
	return rng;
}
function _singleKeyMap(map) {
	var newMap = {}, arr, v;
	_each(map, function(key, val) {
		arr = key.split(',');
		for (var i = 0, len = arr.length; i < len; i++) {
			v = arr[i];
			newMap[v] = val;
		}
	});
	return newMap;
}
function _hasAttrOrCss(knode, map) {
	return _hasAttrOrCssByKey(knode, map, '*') || _hasAttrOrCssByKey(knode, map);
}
function _hasAttrOrCssByKey(knode, map, mapKey) {
	mapKey = mapKey || knode.name;
	if (knode.type !== 1) {
		return false;
	}
	var newMap = _singleKeyMap(map);
	if (!newMap[mapKey]) {
		return false;
	}
	var arr = newMap[mapKey].split(',');
	for (var i = 0, len = arr.length; i < len; i++) {
		var key = arr[i];
		if (key === '*') {
			return true;
		}
		var match = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(key);
		var method = match[1] ? 'css' : 'attr';
		key = match[2];
		var val = match[3] || '';
		if (val === '' && knode[method](key) !== '') {
			return true;
		}
		if (val !== '' && knode[method](key) === val) {
			return true;
		}
	}
	return false;
}
function _removeAttrOrCss(knode, map) {
	if (knode.type != 1) {
		return;
	}
	_removeAttrOrCssByKey(knode, map, '*');
	_removeAttrOrCssByKey(knode, map);
}
function _removeAttrOrCssByKey(knode, map, mapKey) {
	mapKey = mapKey || knode.name;
	if (knode.type !== 1) {
		return;
	}
	var newMap = _singleKeyMap(map);
	if (!newMap[mapKey]) {
		return;
	}
	var arr = newMap[mapKey].split(','), allFlag = false;
	for (var i = 0, len = arr.length; i < len; i++) {
		var key = arr[i];
		if (key === '*') {
			allFlag = true;
			break;
		}
		var match = /^(\.?)([^=]+)(?:=([^=]*))?$/.exec(key);
		key = match[2];
		if (match[1]) {
			key = _toCamel(key);
			if (knode[0].style[key]) {
				knode[0].style[key] = '';
			}
		} else {
			knode.removeAttr(key);
		}
	}
	if (allFlag) {
		knode.remove(true);
	}
}
function _getInnerNode(knode) {
	var inner = knode;
	while (inner.first()) {
		inner = inner.first();
	}
	return inner;
}
function _isEmptyNode(knode) {
	if (knode.type != 1 || knode.isSingle()) {
		return false;
	}
	return knode.html().replace(/<[^>]+>/g, '') === '';
}
function _mergeWrapper(a, b) {
	a = a.clone(true);
	var lastA = _getInnerNode(a), childA = a, merged = false;
	while (b) {
		while (childA) {
			if (childA.name === b.name) {
				_mergeAttrs(childA, b.attr(), b.css());
				merged = true;
			}
			childA = childA.first();
		}
		if (!merged) {
			lastA.append(b.clone(false));
		}
		merged = false;
		b = b.first();
	}
	return a;
}
function _wrapNode(knode, wrapper) {
	wrapper = wrapper.clone(true);
	if (knode.type == 3) {
		_getInnerNode(wrapper).append(knode.clone(false));
		knode.replaceWith(wrapper);
		return wrapper;
	}
	var nodeWrapper = knode, child;
	while ((child = knode.first()) && child.children().length == 1) {
		knode = child;
	}
	child = knode.first();
	var frag = knode.doc.createDocumentFragment();
	while (child) {
		frag.appendChild(child[0]);
		child = child.next();
	}
	wrapper = _mergeWrapper(nodeWrapper, wrapper);
	if (frag.firstChild) {
		_getInnerNode(wrapper).append(frag);
	}
	nodeWrapper.replaceWith(wrapper);
	return wrapper;
}
function _mergeAttrs(knode, attrs, styles) {
	_each(attrs, function(key, val) {
		if (key !== 'style') {
			knode.attr(key, val);
		}
	});
	_each(styles, function(key, val) {
		knode.css(key, val);
	});
}
function _inPreElement(knode) {
	while (knode && knode.name != 'body') {
		if (_PRE_TAG_MAP[knode.name] || knode.name == 'div' && knode.hasClass('ke-script')) {
			return true;
		}
		knode = knode.parent();
	}
	return false;
}
function KCmd(range) {
	this.init(range);
}
_extend(KCmd, {
	init : function(range) {
		var self = this, doc = range.doc;
		self.doc = doc;
		self.win = _getWin(doc);
		self.sel = _getSel(doc);
		self.range = range;
	},
	selection : function(forceReset) {
		var self = this, doc = self.doc, rng = _getRng(doc);
		self.sel = _getSel(doc);
		if (rng) {
			self.range = _range(rng);
			if (K(self.range.startContainer).name == 'html') {
				self.range.selectNodeContents(doc.body).collapse(false);
			}
			return self;
		}
		if (forceReset) {
			self.range.selectNodeContents(doc.body).collapse(false);
		}
		return self;
	},
	select : function(hasDummy) {
		hasDummy = _undef(hasDummy, true);
		var self = this, sel = self.sel, range = self.range.cloneRange().shrink(),
			sc = range.startContainer, so = range.startOffset,
			ec = range.endContainer, eo = range.endOffset,
			doc = _getDoc(sc), win = self.win, rng, hasU200b = false;
		if (hasDummy && sc.nodeType == 1 && range.collapsed) {
			if (_IERANGE) {
				var dummy = K('<span>&nbsp;</span>', doc);
				range.insertNode(dummy[0]);
				rng = doc.body.createTextRange();
				try {
					rng.moveToElementText(dummy[0]);
				} catch(ex) {}
				rng.collapse(false);
				rng.select();
				dummy.remove();
				win.focus();
				return self;
			}
			if (_WEBKIT) {
				var children = sc.childNodes;
				if (K(sc).isInline() || so > 0 && K(children[so - 1]).isInline() || children[so] && K(children[so]).isInline()) {
					range.insertNode(doc.createTextNode('\u200B'));
					hasU200b = true;
				}
			}
		}
		if (_IERANGE) {
			try {
				rng = range.get(true);
				rng.select();
			} catch(e) {}
		} else {
			if (hasU200b) {
				range.collapse(false);
			}
			rng = range.get(true);
			sel.removeAllRanges();
			sel.addRange(rng);
			if (doc !== document) {
				var pos = K(rng.endContainer).pos();
				win.scrollTo(pos.x, pos.y);
			}
		}
		win.focus();
		return self;
	},
	wrap : function(val) {
		var self = this, doc = self.doc, range = self.range, wrapper;
		wrapper = K(val, doc);
		if (range.collapsed) {
			range.shrink();
			range.insertNode(wrapper[0]).selectNodeContents(wrapper[0]);
			return self;
		}
		if (wrapper.isBlock()) {
			var copyWrapper = wrapper.clone(true), child = copyWrapper;
			while (child.first()) {
				child = child.first();
			}
			child.append(range.extractContents());
			range.insertNode(copyWrapper[0]).selectNode(copyWrapper[0]);
			return self;
		}
		range.enlarge();
		var bookmark = range.createBookmark(), ancestor = range.commonAncestor(), isStart = false;
		K(ancestor).scan(function(node) {
			if (!isStart && node == bookmark.start) {
				isStart = true;
				return;
			}
			if (isStart) {
				if (node == bookmark.end) {
					return false;
				}
				var knode = K(node);
				if (_inPreElement(knode)) {
					return;
				}
				if (knode.type == 3 && _trim(node.nodeValue).length > 0) {
					var parent;
					while ((parent = knode.parent()) && parent.isStyle() && parent.children().length == 1) {
						knode = parent;
					}
					_wrapNode(knode, wrapper);
				}
			}
		});
		range.moveToBookmark(bookmark);
		return self;
	},
	split : function(isStart, map) {
		var range = this.range, doc = range.doc;
		var tempRange = range.cloneRange().collapse(isStart);
		var node = tempRange.startContainer, pos = tempRange.startOffset,
			parent = node.nodeType == 3 ? node.parentNode : node,
			needSplit = false, knode;
		while (parent && parent.parentNode) {
			knode = K(parent);
			if (map) {
				if (!knode.isStyle()) {
					break;
				}
				if (!_hasAttrOrCss(knode, map)) {
					break;
				}
			} else {
				if (_NOSPLIT_TAG_MAP[knode.name]) {
					break;
				}
			}
			needSplit = true;
			parent = parent.parentNode;
		}
		if (needSplit) {
			var dummy = doc.createElement('span');
			range.cloneRange().collapse(!isStart).insertNode(dummy);
			if (isStart) {
				tempRange.setStartBefore(parent.firstChild).setEnd(node, pos);
			} else {
				tempRange.setStart(node, pos).setEndAfter(parent.lastChild);
			}
			var frag = tempRange.extractContents(),
				first = frag.firstChild, last = frag.lastChild;
			if (isStart) {
				tempRange.insertNode(frag);
				range.setStartAfter(last).setEndBefore(dummy);
			} else {
				parent.appendChild(frag);
				range.setStartBefore(dummy).setEndBefore(first);
			}
			var dummyParent = dummy.parentNode;
			if (dummyParent == range.endContainer) {
				var prev = K(dummy).prev(), next = K(dummy).next();
				if (prev && next && prev.type == 3 && next.type == 3) {
					range.setEnd(prev[0], prev[0].nodeValue.length);
				} else if (!isStart) {
					range.setEnd(range.endContainer, range.endOffset - 1);
				}
			}
			dummyParent.removeChild(dummy);
		}
		return this;
	},
	remove : function(map) {
		var self = this, doc = self.doc, range = self.range;
		range.enlarge();
		if (range.startOffset === 0) {
			var ksc = K(range.startContainer), parent;
			while ((parent = ksc.parent()) && parent.isStyle() && parent.children().length == 1) {
				ksc = parent;
			}
			range.setStart(ksc[0], 0);
			ksc = K(range.startContainer);
			if (ksc.isBlock()) {
				_removeAttrOrCss(ksc, map);
			}
			var kscp = ksc.parent();
			if (kscp && kscp.isBlock()) {
				_removeAttrOrCss(kscp, map);
			}
		}
		var sc, so;
		if (range.collapsed) {
			self.split(true, map);
			sc = range.startContainer;
			so = range.startOffset;
			if (so > 0) {
				var sb = K(sc.childNodes[so - 1]);
				if (sb && _isEmptyNode(sb)) {
					sb.remove();
					range.setStart(sc, so - 1);
				}
			}
			var sa = K(sc.childNodes[so]);
			if (sa && _isEmptyNode(sa)) {
				sa.remove();
			}
			if (_isEmptyNode(sc)) {
				range.startBefore(sc);
				sc.remove();
			}
			range.collapse(true);
			return self;
		}
		self.split(true, map);
		self.split(false, map);
		var startDummy = doc.createElement('span'), endDummy = doc.createElement('span');
		range.cloneRange().collapse(false).insertNode(endDummy);
		range.cloneRange().collapse(true).insertNode(startDummy);
		var nodeList = [], cmpStart = false;
		K(range.commonAncestor()).scan(function(node) {
			if (!cmpStart && node == startDummy) {
				cmpStart = true;
				return;
			}
			if (node == endDummy) {
				return false;
			}
			if (cmpStart) {
				nodeList.push(node);
			}
		});
		K(startDummy).remove();
		K(endDummy).remove();
		sc = range.startContainer;
		so = range.startOffset;
		var ec = range.endContainer, eo = range.endOffset;
		if (so > 0) {
			var startBefore = K(sc.childNodes[so - 1]);
			if (startBefore && _isEmptyNode(startBefore)) {
				startBefore.remove();
				range.setStart(sc, so - 1);
				if (sc == ec) {
					range.setEnd(ec, eo - 1);
				}
			}
			var startAfter = K(sc.childNodes[so]);
			if (startAfter && _isEmptyNode(startAfter)) {
				startAfter.remove();
				if (sc == ec) {
					range.setEnd(ec, eo - 1);
				}
			}
		}
		var endAfter = K(ec.childNodes[range.endOffset]);
		if (endAfter && _isEmptyNode(endAfter)) {
			endAfter.remove();
		}
		var bookmark = range.createBookmark(true);
		_each(nodeList, function(i, node) {
			_removeAttrOrCss(K(node), map);
		});
		range.moveToBookmark(bookmark);
		return self;
	},
	commonNode : function(map) {
		var range = this.range;
		var ec = range.endContainer, eo = range.endOffset,
			node = (ec.nodeType == 3 || eo === 0) ? ec : ec.childNodes[eo - 1];
		function find(node) {
			var child = node, parent = node;
			while (parent) {
				if (_hasAttrOrCss(K(parent), map)) {
					return K(parent);
				}
				parent = parent.parentNode;
			}
			while (child && (child = child.lastChild)) {
				if (_hasAttrOrCss(K(child), map)) {
					return K(child);
				}
			}
			return null;
		}
		var cNode = find(node);
		if (cNode) {
			return cNode;
		}
		if (node.nodeType == 1 || (ec.nodeType == 3 && eo === 0)) {
			var prev = K(node).prev();
			if (prev) {
				return find(prev);
			}
		}
		return null;
	},
	commonAncestor : function(tagName) {
		var range = this.range,
			sc = range.startContainer, so = range.startOffset,
			ec = range.endContainer, eo = range.endOffset,
			startNode = (sc.nodeType == 3 || so === 0) ? sc : sc.childNodes[so - 1],
			endNode = (ec.nodeType == 3 || eo === 0) ? ec : ec.childNodes[eo - 1];
		function find(node) {
			while (node) {
				if (node.nodeType == 1) {
					if (node.tagName.toLowerCase() === tagName) {
						return node;
					}
				}
				node = node.parentNode;
			}
			return null;
		}
		var start = find(startNode), end = find(endNode);
		if (start && end && start === end) {
			return K(start);
		}
		return null;
	},
	state : function(key) {
		var self = this, doc = self.doc, bool = false;
		try {
			bool = doc.queryCommandState(key);
		} catch (e) {}
		return bool;
	},
	val : function(key) {
		var self = this, doc = self.doc, range = self.range;
		function lc(val) {
			return val.toLowerCase();
		}
		key = lc(key);
		var val = '', knode;
		if (key === 'fontfamily' || key === 'fontname') {
			val = _nativeCommandValue(doc, 'fontname');
			val = val.replace(/['"]/g, '');
			return lc(val);
		}
		if (key === 'formatblock') {
			val = _nativeCommandValue(doc, key);
			if (val === '') {
				knode = self.commonNode({'h1,h2,h3,h4,h5,h6,p,div,pre,address' : '*'});
				if (knode) {
					val = knode.name;
				}
			}
			if (val === 'Normal') {
				val = 'p';
			}
			return lc(val);
		}
		if (key === 'fontsize') {
			knode = self.commonNode({'*' : '.font-size'});
			if (knode) {
				val = knode.css('font-size');
			}
			return lc(val);
		}
		if (key === 'forecolor') {
			knode = self.commonNode({'*' : '.color'});
			if (knode) {
				val = knode.css('color');
			}
			val = _toHex(val);
			if (val === '') {
				val = 'default';
			}
			return lc(val);
		}
		if (key === 'hilitecolor') {
			knode = self.commonNode({'*' : '.background-color'});
			if (knode) {
				val = knode.css('background-color');
			}
			val = _toHex(val);
			if (val === '') {
				val = 'default';
			}
			return lc(val);
		}
		return val;
	},
	toggle : function(wrapper, map) {
		var self = this;
		if (self.commonNode(map)) {
			self.remove(map);
		} else {
			self.wrap(wrapper);
		}
		return self.select();
	},
	bold : function() {
		return this.toggle('<strong></strong>', {
			span : '.font-weight=bold',
			strong : '*',
			b : '*'
		});
	},
	italic : function() {
		return this.toggle('<em></em>', {
			span : '.font-style=italic',
			em : '*',
			i : '*'
		});
	},
	underline : function() {
		return this.toggle('<u></u>', {
			span : '.text-decoration=underline',
			u : '*'
		});
	},
	strikethrough : function() {
		return this.toggle('<s></s>', {
			span : '.text-decoration=line-through',
			s : '*'
		});
	},
	forecolor : function(val) {
		return this.wrap('<span style="color:' + val + ';"></span>').select();
	},
	hilitecolor : function(val) {
		return this.wrap('<span style="background-color:' + val + ';"></span>').select();
	},
	fontsize : function(val) {
		return this.wrap('<span style="font-size:' + val + ';"></span>').select();
	},
	fontname : function(val) {
		return this.fontfamily(val);
	},
	fontfamily : function(val) {
		return this.wrap('<span style="font-family:' + val + ';"></span>').select();
	},
	removeformat : function() {
		var map = {
			'*' : '.font-weight,.font-style,.text-decoration,.color,.background-color,.font-size,.font-family,.text-indent'
		},
		tags = _STYLE_TAG_MAP;
		_each(tags, function(key, val) {
			map[key] = '*';
		});
		this.remove(map);
		return this.select();
	},
	inserthtml : function(val, quickMode) {
		var self = this, range = self.range;
		if (val === '') {
			return self;
		}
		function pasteHtml(range, val) {
			val = '<img id="__kindeditor_temp_tag__" width="0" height="0" style="display:none;" />' + val;
			var rng = range.get();
			if (rng.item) {
				rng.item(0).outerHTML = val;
			} else {
				rng.pasteHTML(val);
			}
			var temp = range.doc.getElementById('__kindeditor_temp_tag__');
			temp.parentNode.removeChild(temp);
			var newRange = _toRange(rng);
			range.setEnd(newRange.endContainer, newRange.endOffset);
			range.collapse(false);
			self.select(false);
		}
		function insertHtml(range, val) {
			var doc = range.doc,
				frag = doc.createDocumentFragment();
			K('@' + val, doc).each(function() {
				frag.appendChild(this);
			});
			range.deleteContents();
			range.insertNode(frag);
			range.collapse(false);
			self.select(false);
		}
		if (_IERANGE && quickMode) {
			try {
				pasteHtml(range, val);
			} catch(e) {
				insertHtml(range, val);
			}
			return self;
		}
		insertHtml(range, val);
		return self;
	},
	hr : function() {
		return this.inserthtml('<hr />');
	},
	print : function() {
		this.win.print();
		return this;
	},
	insertimage : function(url, title, width, height, border, align) {
		title = _undef(title, '');
		border = _undef(border, 0);
		var html = '<img src="' + _escape(url) + '" data-ke-src="' + _escape(url) + '" ';
		if (width) {
			html += 'width="' + _escape(width) + '" ';
		}
		if (height) {
			html += 'height="' + _escape(height) + '" ';
		}
		if (title) {
			html += 'title="' + _escape(title) + '" ';
		}
		if (align) {
			html += 'align="' + _escape(align) + '" ';
		}
		html += 'alt="' + _escape(title) + '" ';
		html += '/>';
		return this.inserthtml(html);
	},
	createlink : function(url, type) {
		var self = this, doc = self.doc, range = self.range;
		self.select();
		var a = self.commonNode({ a : '*' });
		if (a && !range.isControl()) {
			range.selectNode(a.get());
			self.select();
		}
		var html = '<a href="' + _escape(url) + '" data-ke-src="' + _escape(url) + '" ';
		if (type) {
			html += ' target="' + _escape(type) + '"';
		}
		if (range.collapsed) {
			html += '>' + _escape(url) + '</a>';
			return self.inserthtml(html);
		}
		if (range.isControl()) {
			var node = K(range.startContainer.childNodes[range.startOffset]);
			html += '></a>';
			node.after(K(html, doc));
			node.next().append(node);
			range.selectNode(node[0]);
			return self.select();
		}
		function setAttr(node, url, type) {
			K(node).attr('href', url).attr('data-ke-src', url);
			if (type) {
				K(node).attr('target', type);
			} else {
				K(node).removeAttr('target');
			}
		}
		var sc = range.startContainer, so = range.startOffset,
			ec = range.endContainer, eo = range.endOffset;
		if (sc.nodeType == 1 && sc === ec && so + 1 === eo) {
			var child = sc.childNodes[so];
			if (child.nodeName.toLowerCase() == 'a') {
				setAttr(child, url, type);
				return self;
			}
		}
		_nativeCommand(doc, 'createlink', '__kindeditor_temp_url__');
		K('a[href="__kindeditor_temp_url__"]', doc).each(function() {
			setAttr(this, url, type);
		});
		return self;
	},
	unlink : function() {
		var self = this, doc = self.doc, range = self.range;
		self.select();
		if (range.collapsed) {
			var a = self.commonNode({ a : '*' });
			if (a) {
				range.selectNode(a.get());
				self.select();
			}
			_nativeCommand(doc, 'unlink', null);
			if (_WEBKIT && K(range.startContainer).name === 'img') {
				var parent = K(range.startContainer).parent();
				if (parent.name === 'a') {
					parent.remove(true);
				}
			}
		} else {
			_nativeCommand(doc, 'unlink', null);
		}
		return self;
	}
});
_each(('formatblock,selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,' +
	'insertunorderedlist,indent,outdent,subscript,superscript').split(','), function(i, name) {
	KCmd.prototype[name] = function(val) {
		var self = this;
		self.select();
		_nativeCommand(self.doc, name, val);
		if (_IERANGE && _inArray(name, 'justifyleft,justifycenter,justifyright,justifyfull'.split(',')) >= 0) {
			self.selection();
		}
		if (!_IERANGE || _inArray(name, 'formatblock,selectall,insertorderedlist,insertunorderedlist'.split(',')) >= 0) {
			self.selection();
		}
		return self;
	};
});
_each('cut,copy,paste'.split(','), function(i, name) {
	KCmd.prototype[name] = function() {
		var self = this;
		if (!self.doc.queryCommandSupported(name)) {
			throw 'not supported';
		}
		self.select();
		_nativeCommand(self.doc, name, null);
		return self;
	};
});
function _cmd(mixed) {
	if (mixed.nodeName) {
		var doc = _getDoc(mixed);
		mixed = _range(doc).selectNodeContents(doc.body).collapse(false);
	}
	return new KCmd(mixed);
}
K.CmdClass = KCmd;
K.cmd = _cmd;
function _drag(options) {
	var moveEl = options.moveEl,
		moveFn = options.moveFn,
		clickEl = options.clickEl || moveEl,
		beforeDrag = options.beforeDrag,
		iframeFix = options.iframeFix === undefined ? true : options.iframeFix;
	var docs = [document];
	if (iframeFix) {
		K('iframe').each(function() {
			var src = _formatUrl(this.src || '', 'absolute');
			if (/^https?:\/\//.test(src)) {
				return;
			}
			var doc;
			try {
				doc = _iframeDoc(this);
			} catch(e) {}
			if (doc) {
				var pos = K(this).pos();
				K(doc).data('pos-x', pos.x);
				K(doc).data('pos-y', pos.y);
				docs.push(doc);
			}
		});
	}
	clickEl.mousedown(function(e) {
		e.stopPropagation();
		var self = clickEl.get(),
			x = _removeUnit(moveEl.css('left')),
			y = _removeUnit(moveEl.css('top')),
			width = moveEl.width(),
			height = moveEl.height(),
			pageX = e.pageX,
			pageY = e.pageY;
		if (beforeDrag) {
			beforeDrag();
		}
		function moveListener(e) {
			e.preventDefault();
			var kdoc = K(_getDoc(e.target));
			var diffX = _round((kdoc.data('pos-x') || 0) + e.pageX - pageX);
			var diffY = _round((kdoc.data('pos-y') || 0) + e.pageY - pageY);
			moveFn.call(clickEl, x, y, width, height, diffX, diffY);
		}
		function selectListener(e) {
			e.preventDefault();
		}
		function upListener(e) {
			e.preventDefault();
			K(docs).unbind('mousemove', moveListener)
				.unbind('mouseup', upListener)
				.unbind('selectstart', selectListener);
			if (self.releaseCapture) {
				self.releaseCapture();
			}
		}
		K(docs).mousemove(moveListener)
			.mouseup(upListener)
			.bind('selectstart', selectListener);
		if (self.setCapture) {
			self.setCapture();
		}
	});
}
function KWidget(options) {
	this.init(options);
}
_extend(KWidget, {
	init : function(options) {
		var self = this;
		self.name = options.name || '';
		self.doc = options.doc || document;
		self.win = _getWin(self.doc);
		self.x = _addUnit(options.x);
		self.y = _addUnit(options.y);
		self.z = options.z;
		self.width = _addUnit(options.width);
		self.height = _addUnit(options.height);
		self.div = K('<div style="display:block;"></div>');
		self.options = options;
		self._alignEl = options.alignEl;
		if (self.width) {
			self.div.css('width', self.width);
		}
		if (self.height) {
			self.div.css('height', self.height);
		}
		if (self.z) {
			self.div.css({
				position : 'absolute',
				left : self.x,
				top : self.y,
				'z-index' : self.z
			});
		}
		if (self.z && (self.x === undefined || self.y === undefined)) {
			self.autoPos(self.width, self.height);
		}
		if (options.cls) {
			self.div.addClass(options.cls);
		}
		if (options.shadowMode) {
			self.div.addClass('ke-shadow');
		}
		if (options.css) {
			self.div.css(options.css);
		}
		if (options.src) {
			K(options.src).replaceWith(self.div);
		} else {
			K(self.doc.body).append(self.div);
		}
		if (options.html) {
			self.div.html(options.html);
		}
		if (options.autoScroll) {
			if (_IE && _V < 7 || _QUIRKS) {
				var scrollPos = _getScrollPos();
				K(self.win).bind('scroll', function(e) {
					var pos = _getScrollPos(),
						diffX = pos.x - scrollPos.x,
						diffY = pos.y - scrollPos.y;
					self.pos(_removeUnit(self.x) + diffX, _removeUnit(self.y) + diffY, false);
				});
			} else {
				self.div.css('position', 'fixed');
			}
		}
	},
	pos : function(x, y, updateProp) {
		var self = this;
		updateProp = _undef(updateProp, true);
		if (x !== null) {
			x = x < 0 ? 0 : _addUnit(x);
			self.div.css('left', x);
			if (updateProp) {
				self.x = x;
			}
		}
		if (y !== null) {
			y = y < 0 ? 0 : _addUnit(y);
			self.div.css('top', y);
			if (updateProp) {
				self.y = y;
			}
		}
		return self;
	},
	autoPos : function(width, height) {
		var self = this,
			w = _removeUnit(width) || 0,
			h = _removeUnit(height) || 0,
			scrollPos = _getScrollPos();
		if (self._alignEl) {
			var knode = K(self._alignEl),
				pos = knode.pos(),
				diffX = _round(knode[0].clientWidth / 2 - w / 2),
				diffY = _round(knode[0].clientHeight / 2 - h / 2);
			x = diffX < 0 ? pos.x : pos.x + diffX;
			y = diffY < 0 ? pos.y : pos.y + diffY;
		} else {
			var docEl = _docElement(self.doc);
			x = _round(scrollPos.x + (docEl.clientWidth - w) / 2);
			y = _round(scrollPos.y + (docEl.clientHeight - h) / 2);
		}
		if (!(_IE && _V < 7 || _QUIRKS)) {
			x -= scrollPos.x;
			y -= scrollPos.y;
		}
		return self.pos(x, y);
	},
	remove : function() {
		var self = this;
		if (_IE && _V < 7 || _QUIRKS) {
			K(self.win).unbind('scroll');
		}
		self.div.remove();
		_each(self, function(i) {
			self[i] = null;
		});
		return this;
	},
	show : function() {
		this.div.show();
		return this;
	},
	hide : function() {
		this.div.hide();
		return this;
	},
	draggable : function(options) {
		var self = this;
		options = options || {};
		options.moveEl = self.div;
		options.moveFn = function(x, y, width, height, diffX, diffY) {
			if ((x = x + diffX) < 0) {
				x = 0;
			}
			if ((y = y + diffY) < 0) {
				y = 0;
			}
			self.pos(x, y);
		};
		_drag(options);
		return self;
	}
});
function _widget(options) {
	return new KWidget(options);
}
K.WidgetClass = KWidget;
K.widget = _widget;
function _iframeDoc(iframe) {
	iframe = _get(iframe);
	return iframe.contentDocument || iframe.contentWindow.document;
}
var html, _direction = '';
if ((html = document.getElementsByTagName('html'))) {
	_direction = html[0].dir;
}
function _getInitHtml(themesPath, bodyClass, cssPath, cssData) {
	var arr = [
		(_direction === '' ? '<html>' : '<html dir="' + _direction + '">'),
		'<head><meta charset="utf-8" /><title></title>',
		'<style>',
		'html {margin:0;padding:0;}',
		'body {margin:0;padding:5px;}',
		'body, td {font:12px/1.5 "sans serif",tahoma,verdana,helvetica;}',
		'body, p, div {word-wrap: break-word;}',
		'p {margin:5px 0;}',
		'table {border-collapse:collapse;}',
		'img {border:0;}',
		'noscript {display:none;}',
		'table.ke-zeroborder td {border:1px dotted #AAA;}',
		'img.ke-flash {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/flash.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-rm {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/rm.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-media {',
		'	border:1px solid #AAA;',
		'	background-image:url(' + themesPath + 'common/media.gif);',
		'	background-position:center center;',
		'	background-repeat:no-repeat;',
		'	width:100px;',
		'	height:100px;',
		'}',
		'img.ke-anchor {',
		'	border:1px dashed #666;',
		'	width:16px;',
		'	height:16px;',
		'}',
		'.ke-script, .ke-noscript, .ke-display-none {',
		'	display:none;',
		'	font-size:0;',
		'	width:0;',
		'	height:0;',
		'}',
		'.ke-pagebreak {',
		'	border:1px dotted #AAA;',
		'	font-size:0;',
		'	height:2px;',
		'}',
		'</style>'
	];
	if (!_isArray(cssPath)) {
		cssPath = [cssPath];
	}
	_each(cssPath, function(i, path) {
		if (path) {
			arr.push('<link href="' + path + '" rel="stylesheet" />');
		}
	});
	if (cssData) {
		arr.push('<style>' + cssData + '</style>');
	}
	arr.push('</head><body ' + (bodyClass ? 'class="' + bodyClass + '"' : '') + '></body></html>');
	return arr.join('\n');
}
function _elementVal(knode, val) {
	if (knode.hasVal()) {
		if (val === undefined) {
			var html = knode.val();
			html = html.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/ig, '');
			return html;
		}
		return knode.val(val);
	}
	return knode.html(val);
}
function KEdit(options) {
	this.init(options);
}
_extend(KEdit, KWidget, {
	init : function(options) {
		var self = this;
		KEdit.parent.init.call(self, options);
		self.srcElement = K(options.srcElement);
		self.div.addClass('ke-edit');
		self.designMode = _undef(options.designMode, true);
		self.beforeGetHtml = options.beforeGetHtml;
		self.beforeSetHtml = options.beforeSetHtml;
		self.afterSetHtml = options.afterSetHtml;
		var themesPath = _undef(options.themesPath, ''),
			bodyClass = options.bodyClass,
			cssPath = options.cssPath,
			cssData = options.cssData,
			isDocumentDomain = location.protocol != 'res:' && location.host.replace(/:\d+/, '') !== document.domain,
			srcScript = ('document.open();' +
				(isDocumentDomain ? 'document.domain="' + document.domain + '";' : '') +
				'document.close();'),
			iframeSrc = _IE ? ' src="javascript:void(function(){' + encodeURIComponent(srcScript) + '}())"' : '';
		self.iframe = K('<iframe class="ke-edit-iframe" hidefocus="true" frameborder="0"' + iframeSrc + '></iframe>').css('width', '100%');
		self.textarea = K('<textarea class="ke-edit-textarea" hidefocus="true"></textarea>').css('width', '100%');
		self.tabIndex = isNaN(parseInt(options.tabIndex, 10)) ? self.srcElement.attr('tabindex') : parseInt(options.tabIndex, 10);
		self.iframe.attr('tabindex', self.tabIndex);
		self.textarea.attr('tabindex', self.tabIndex);
		if (self.width) {
			self.setWidth(self.width);
		}
		if (self.height) {
			self.setHeight(self.height);
		}
		if (self.designMode) {
			self.textarea.hide();
		} else {
			self.iframe.hide();
		}
		function ready() {
			var doc = _iframeDoc(self.iframe);
			doc.open();
			if (isDocumentDomain) {
				doc.domain = document.domain;
			}
			doc.write(_getInitHtml(themesPath, bodyClass, cssPath, cssData));
			doc.close();
			self.win = self.iframe[0].contentWindow;
			self.doc = doc;
			var cmd = _cmd(doc);
			self.afterChange(function(e) {
				cmd.selection();
			});
			if (_WEBKIT) {
				K(doc).click(function(e) {
					if (K(e.target).name === 'img') {
						cmd.selection(true);
						cmd.range.selectNode(e.target);
						cmd.select();
					}
				});
			}
			if (_IE) {
				self._mousedownHandler = function() {
					var newRange = cmd.range.cloneRange();
					newRange.shrink();
					if (newRange.isControl()) {
						self.blur();
					}
				};
				K(document).mousedown(self._mousedownHandler);
				K(doc).keydown(function(e) {
					if (e.which == 8) {
						cmd.selection();
						var rng = cmd.range;
						if (rng.isControl()) {
							rng.collapse(true);
							K(rng.startContainer.childNodes[rng.startOffset]).remove();
							e.preventDefault();
						}
					}
				});
			}
			self.cmd = cmd;
			self.html(_elementVal(self.srcElement));
			if (_IE) {
				doc.body.disabled = true;
				doc.body.contentEditable = true;
				doc.body.removeAttribute('disabled');
			} else {
				doc.designMode = 'on';
			}
			if (options.afterCreate) {
				options.afterCreate.call(self);
			}
		}
		if (isDocumentDomain) {
			self.iframe.bind('load', function(e) {
				self.iframe.unbind('load');
				if (_IE) {
					ready();
				} else {
					setTimeout(ready, 0);
				}
			});
		}
		self.div.append(self.iframe);
		self.div.append(self.textarea);
		self.srcElement.hide();
		!isDocumentDomain && ready();
	},
	setWidth : function(val) {
		var self = this;
		val = _addUnit(val);
		self.width = val;
		self.div.css('width', val);
		return self;
	},
	setHeight : function(val) {
		var self = this;
		val = _addUnit(val);
		self.height = val;
		self.div.css('height', val);
		self.iframe.css('height', val);
		if ((_IE && _V < 8) || _QUIRKS) {
			val = _addUnit(_removeUnit(val) - 2);
		}
		self.textarea.css('height', val);
		return self;
	},
	remove : function() {
		var self = this, doc = self.doc;
		K(doc.body).unbind();
		K(doc).unbind();
		K(self.win).unbind();
		if (self._mousedownHandler) {
			K(document).unbind('mousedown', self._mousedownHandler);
		}
		_elementVal(self.srcElement, self.html());
		self.srcElement.show();
		doc.write('');
		self.iframe.unbind();
		self.textarea.unbind();
		KEdit.parent.remove.call(self);
	},
	html : function(val, isFull) {
		var self = this, doc = self.doc;
		if (self.designMode) {
			var body = doc.body;
			if (val === undefined) {
				if (isFull) {
					val = '<!doctype html><html>' + body.parentNode.innerHTML + '</html>';
				} else {
					val = body.innerHTML;
				}
				if (self.beforeGetHtml) {
					val = self.beforeGetHtml(val);
				}
				if (_GECKO && val == '<br />') {
					val = '';
				}
				return val;
			}
			if (self.beforeSetHtml) {
				val = self.beforeSetHtml(val);
			}
			if (_IE && _V >= 9) {
				val = val.replace(/(<.*?checked=")checked(".*>)/ig, '$1$2');
			}
			K(body).html(val);
			if (self.afterSetHtml) {
				self.afterSetHtml();
			}
			return self;
		}
		if (val === undefined) {
			return self.textarea.val();
		}
		self.textarea.val(val);
		return self;
	},
	design : function(bool) {
		var self = this, val;
		if (bool === undefined ? !self.designMode : bool) {
			if (!self.designMode) {
				val = self.html();
				self.designMode = true;
				self.html(val);
				self.textarea.hide();
				self.iframe.show();
			}
		} else {
			if (self.designMode) {
				val = self.html();
				self.designMode = false;
				self.html(val);
				self.iframe.hide();
				self.textarea.show();
			}
		}
		return self.focus();
	},
	focus : function() {
		var self = this;
		self.designMode ? self.win.focus() : self.textarea[0].focus();
		return self;
	},
	blur : function() {
		var self = this;
		if (_IE) {
			var input = K('<input type="text" style="float:left;width:0;height:0;padding:0;margin:0;border:0;" value="" />', self.div);
			self.div.append(input);
			input[0].focus();
			input.remove();
		} else {
			self.designMode ? self.win.blur() : self.textarea[0].blur();
		}
		return self;
	},
	afterChange : function(fn) {
		var self = this, doc = self.doc, body = doc.body;
		K(doc).keyup(function(e) {
			if (!e.ctrlKey && !e.altKey && _CHANGE_KEY_MAP[e.which]) {
				fn(e);
			}
		});
		K(doc).mouseup(fn).contextmenu(fn);
		K(self.win).blur(fn);
		function timeoutHandler(e) {
			setTimeout(function() {
				fn(e);
			}, 1);
		}
		K(body).bind('paste', timeoutHandler);
		K(body).bind('cut', timeoutHandler);
		return self;
	}
});
function _edit(options) {
	return new KEdit(options);
}
K.EditClass = KEdit;
K.edit = _edit;
K.iframeDoc = _iframeDoc;
function _selectToolbar(name, fn) {
	var self = this,
		knode = self.get(name);
	if (knode) {
		if (knode.hasClass('ke-disabled')) {
			return;
		}
		fn(knode);
	}
}
function KToolbar(options) {
	this.init(options);
}
_extend(KToolbar, KWidget, {
	init : function(options) {
		var self = this;
		KToolbar.parent.init.call(self, options);
		self.disableMode = _undef(options.disableMode, false);
		self.noDisableItemMap = _toMap(_undef(options.noDisableItems, []));
		self._itemMap = {};
		self.div.addClass('ke-toolbar').bind('contextmenu,mousedown,mousemove', function(e) {
			e.preventDefault();
		}).attr('unselectable', 'on');
		function find(target) {
			var knode = K(target);
			if (knode.hasClass('ke-outline')) {
				return knode;
			}
			if (knode.hasClass('ke-toolbar-icon')) {
				return knode.parent();
			}
		}
		function hover(e, method) {
			var knode = find(e.target);
			if (knode) {
				if (knode.hasClass('ke-disabled')) {
					return;
				}
				if (knode.hasClass('ke-selected')) {
					return;
				}
				knode[method]('ke-on');
			}
		}
		self.div.mouseover(function(e) {
			hover(e, 'addClass');
		})
		.mouseout(function(e) {
			hover(e, 'removeClass');
		})
		.click(function(e) {
			var knode = find(e.target);
			if (knode) {
				if (knode.hasClass('ke-disabled')) {
					return;
				}
				self.options.click.call(this, e, knode.attr('data-name'));
			}
		});
	},
	get : function(name) {
		if (this._itemMap[name]) {
			return this._itemMap[name];
		}
		return (this._itemMap[name] = K('span.ke-icon-' + name, this.div).parent());
	},
	select : function(name) {
		_selectToolbar.call(this, name, function(knode) {
			knode.addClass('ke-selected');
		});
		return self;
	},
	unselect : function(name) {
		_selectToolbar.call(this, name, function(knode) {
			knode.removeClass('ke-selected').removeClass('ke-on');
		});
		return self;
	},
	enable : function(name) {
		var self = this,
			knode = name.get ? name : self.get(name);
		if (knode) {
			knode.removeClass('ke-disabled');
			knode.opacity(1);
		}
		return self;
	},
	disable : function(name) {
		var self = this,
			knode = name.get ? name : self.get(name);
		if (knode) {
			knode.removeClass('ke-selected').addClass('ke-disabled');
			knode.opacity(0.5);
		}
		return self;
	},
	disableAll : function(bool, noDisableItems) {
		var self = this, map = self.noDisableItemMap, item;
		if (noDisableItems) {
			map = _toMap(noDisableItems);
		}
		if (bool === undefined ? !self.disableMode : bool) {
			K('span.ke-outline', self.div).each(function() {
				var knode = K(this),
					name = knode[0].getAttribute('data-name', 2);
				if (!map[name]) {
					self.disable(knode);
				}
			});
			self.disableMode = true;
		} else {
			K('span.ke-outline', self.div).each(function() {
				var knode = K(this),
					name = knode[0].getAttribute('data-name', 2);
				if (!map[name]) {
					self.enable(knode);
				}
			});
			self.disableMode = false;
		}
		return self;
	}
});
function _toolbar(options) {
	return new KToolbar(options);
}
K.ToolbarClass = KToolbar;
K.toolbar = _toolbar;
function KMenu(options) {
	this.init(options);
}
_extend(KMenu, KWidget, {
	init : function(options) {
		var self = this;
		options.z = options.z || 811213;
		KMenu.parent.init.call(self, options);
		self.centerLineMode = _undef(options.centerLineMode, true);
		self.div.addClass('ke-menu').bind('click,mousedown', function(e){
			e.stopPropagation();
		}).attr('unselectable', 'on');
	},
	addItem : function(item) {
		var self = this;
		if (item.title === '-') {
			self.div.append(K('<div class="ke-menu-separator"></div>'));
			return;
		}
		var itemDiv = K('<div class="ke-menu-item" unselectable="on"></div>'),
			leftDiv = K('<div class="ke-inline-block ke-menu-item-left"></div>'),
			rightDiv = K('<div class="ke-inline-block ke-menu-item-right"></div>'),
			height = _addUnit(item.height),
			iconClass = _undef(item.iconClass, '');
		self.div.append(itemDiv);
		if (height) {
			itemDiv.css('height', height);
			rightDiv.css('line-height', height);
		}
		var centerDiv;
		if (self.centerLineMode) {
			centerDiv = K('<div class="ke-inline-block ke-menu-item-center"></div>');
			if (height) {
				centerDiv.css('height', height);
			}
		}
		itemDiv.mouseover(function(e) {
			K(this).addClass('ke-menu-item-on');
			if (centerDiv) {
				centerDiv.addClass('ke-menu-item-center-on');
			}
		})
		.mouseout(function(e) {
			K(this).removeClass('ke-menu-item-on');
			if (centerDiv) {
				centerDiv.removeClass('ke-menu-item-center-on');
			}
		})
		.click(function(e) {
			item.click.call(K(this));
			e.stopPropagation();
		})
		.append(leftDiv);
		if (centerDiv) {
			itemDiv.append(centerDiv);
		}
		itemDiv.append(rightDiv);
		if (item.checked) {
			iconClass = 'ke-icon-checked';
		}
		if (iconClass !== '') {
			leftDiv.html('<span class="ke-inline-block ke-toolbar-icon ke-toolbar-icon-url ' + iconClass + '"></span>');
		}
		rightDiv.html(item.title);
		return self;
	},
	remove : function() {
		var self = this;
		if (self.options.beforeRemove) {
			self.options.beforeRemove.call(self);
		}
		K('.ke-menu-item', self.div[0]).unbind();
		KMenu.parent.remove.call(self);
		return self;
	}
});
function _menu(options) {
	return new KMenu(options);
}
K.MenuClass = KMenu;
K.menu = _menu;
function KColorPicker(options) {
	this.init(options);
}
_extend(KColorPicker, KWidget, {
	init : function(options) {
		var self = this;
		options.z = options.z || 811213;
		KColorPicker.parent.init.call(self, options);
		var colors = options.colors || [
			['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500'],
			['#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#00D5FF'],
			['#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE'],
			['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000']
		];
		self.selectedColor = (options.selectedColor || '').toLowerCase();
		self._cells = [];
		self.div.addClass('ke-colorpicker').bind('click,mousedown', function(e){
			e.stopPropagation();
		}).attr('unselectable', 'on');
		var table = self.doc.createElement('table');
		self.div.append(table);
		table.className = 'ke-colorpicker-table';
		table.cellPadding = 0;
		table.cellSpacing = 0;
		table.border = 0;
		var row = table.insertRow(0), cell = row.insertCell(0);
		cell.colSpan = colors[0].length;
		self._addAttr(cell, '', 'ke-colorpicker-cell-top');
		for (var i = 0; i < colors.length; i++) {
			row = table.insertRow(i + 1);
			for (var j = 0; j < colors[i].length; j++) {
				cell = row.insertCell(j);
				self._addAttr(cell, colors[i][j], 'ke-colorpicker-cell');
			}
		}
	},
	_addAttr : function(cell, color, cls) {
		var self = this;
		cell = K(cell).addClass(cls);
		if (self.selectedColor === color.toLowerCase()) {
			cell.addClass('ke-colorpicker-cell-selected');
		}
		cell.attr('title', color || self.options.noColor);
		cell.mouseover(function(e) {
			K(this).addClass('ke-colorpicker-cell-on');
		});
		cell.mouseout(function(e) {
			K(this).removeClass('ke-colorpicker-cell-on');
		});
		cell.click(function(e) {
			e.stop();
			self.options.click.call(K(this), color);
		});
		if (color) {
			cell.append(K('<div class="ke-colorpicker-cell-color" unselectable="on"></div>').css('background-color', color));
		} else {
			cell.html(self.options.noColor);
		}
		K(cell).attr('unselectable', 'on');
		self._cells.push(cell);
	},
	remove : function() {
		var self = this;
		_each(self._cells, function() {
			this.unbind();
		});
		KColorPicker.parent.remove.call(self);
		return self;
	}
});
function _colorpicker(options) {
	return new KColorPicker(options);
}
K.ColorPickerClass = KColorPicker;
K.colorpicker = _colorpicker;
function KUploadButton(options) {
	this.init(options);
}
_extend(KUploadButton, {
	init : function(options) {
		var self = this,
			button = K(options.button),
			fieldName = options.fieldName || 'file',
			url = options.url || '',
			title = button.val(),
			extraParams = options.extraParams || {},
			cls = button[0].className || '',
			target = options.target || 'kindeditor_upload_iframe_' + new Date().getTime();
		options.afterError = options.afterError || function(str) {
			alert(str);
		};
		var hiddenElements = [];
		for(var k in extraParams){
			hiddenElements.push('<input type="hidden" name="' + k + '" value="' + extraParams[k] + '" />');
		}
		var html = [
			'<div class="ke-inline-block ' + cls + '">',
			(options.target ? '' : '<iframe name="' + target + '" style="display:none;"></iframe>'),
			(options.form ? '<div class="ke-upload-area">' : '<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + target + '" action="' + url + '">'),
			'<span class="ke-button-common">',
			hiddenElements.join(''),
			'<input type="button" class="ke-button-common ke-button" value="' + title + '" />',
			'</span>',
			'<input type="file" class="ke-upload-file" name="' + fieldName + '" tabindex="-1" />',
			(options.form ? '</div>' : '</form>'),
			'</div>'].join('');
		var div = K(html, button.doc);
		button.hide();
		button.before(div);
		self.div = div;
		self.button = button;
		self.iframe = options.target ? K('iframe[name="' + target + '"]') : K('iframe', div);
		self.form = options.form ? K(options.form) : K('form', div);
		self.fileBox = K('.ke-upload-file', div);
		var width = options.width || K('.ke-button-common', div).width();
		K('.ke-upload-area', div).width(width);
		self.options = options;
	},
	submit : function() {
		var self = this,
			iframe = self.iframe;
		iframe.bind('load', function() {
			iframe.unbind();
			var tempForm = document.createElement('form');
			self.fileBox.before(tempForm);
			K(tempForm).append(self.fileBox);
			tempForm.reset();
			K(tempForm).remove(true);
			var doc = K.iframeDoc(iframe),
				pre = doc.getElementsByTagName('pre')[0],
				str = '', data;
			if (pre) {
				str = pre.innerHTML;
			} else {
				str = doc.body.innerHTML;
			}
			str = _unescape(str);
			iframe[0].src = 'javascript:false';
			try {
				data = K.json(str);
			} catch (e) {
				self.options.afterError.call(self, '<!doctype html><html>' + doc.body.parentNode.innerHTML + '</html>');
			}
			if (data) {
				self.options.afterUpload.call(self, data);
			}
		});
		self.form[0].submit();
		return self;
	},
	remove : function() {
		var self = this;
		if (self.fileBox) {
			self.fileBox.unbind();
		}
		self.iframe.remove();
		self.div.remove();
		self.button.show();
		return self;
	}
});
function _uploadbutton(options) {
	return new KUploadButton(options);
}
K.UploadButtonClass = KUploadButton;
K.uploadbutton = _uploadbutton;
function _createButton(arg) {
	arg = arg || {};
	var name = arg.name || '',
		span = K('<span class="ke-button-common ke-button-outer" title="' + name + '"></span>'),
		btn = K('<input class="ke-button-common ke-button" type="button" value="' + name + '" />');
	if (arg.click) {
		btn.click(arg.click);
	}
	span.append(btn);
	return span;
}
function KDialog(options) {
	this.init(options);
}
_extend(KDialog, KWidget, {
	init : function(options) {
		var self = this;
		var shadowMode = _undef(options.shadowMode, true);
		options.z = options.z || 811213;
		options.shadowMode = false;
		options.autoScroll = _undef(options.autoScroll, true);
		KDialog.parent.init.call(self, options);
		var title = options.title,
			body = K(options.body, self.doc),
			previewBtn = options.previewBtn,
			yesBtn = options.yesBtn,
			noBtn = options.noBtn,
			closeBtn = options.closeBtn,
			showMask = _undef(options.showMask, true);
		self.div.addClass('ke-dialog').bind('click,mousedown', function(e){
			e.stopPropagation();
		});
		var contentDiv = K('<div class="ke-dialog-content"></div>').appendTo(self.div);
		if (_IE && _V < 7) {
			self.iframeMask = K('<iframe src="about:blank" class="ke-dialog-shadow"></iframe>').appendTo(self.div);
		} else if (shadowMode) {
			K('<div class="ke-dialog-shadow"></div>').appendTo(self.div);
		}
		var headerDiv = K('<div class="ke-dialog-header"></div>');
		contentDiv.append(headerDiv);
		headerDiv.html(title);
		self.closeIcon = K('<span class="ke-dialog-icon-close" title="' + closeBtn.name + '"></span>').click(closeBtn.click);
		headerDiv.append(self.closeIcon);
		self.draggable({
			clickEl : headerDiv,
			beforeDrag : options.beforeDrag
		});
		var bodyDiv = K('<div class="ke-dialog-body"></div>');
		contentDiv.append(bodyDiv);
		bodyDiv.append(body);
		var footerDiv = K('<div class="ke-dialog-footer"></div>');
		if (previewBtn || yesBtn || noBtn) {
			contentDiv.append(footerDiv);
		}
		_each([
			{ btn : previewBtn, name : 'preview' },
			{ btn : yesBtn, name : 'yes' },
			{ btn : noBtn, name : 'no' }
		], function() {
			if (this.btn) {
				var button = _createButton(this.btn);
				button.addClass('ke-dialog-' + this.name);
				footerDiv.append(button);
			}
		});
		if (self.height) {
			bodyDiv.height(_removeUnit(self.height) - headerDiv.height() - footerDiv.height());
		}
		self.div.width(self.div.width());
		self.div.height(self.div.height());
		self.mask = null;
		if (showMask) {
			var docEl = _docElement(self.doc),
				docWidth = Math.max(docEl.scrollWidth, docEl.clientWidth),
				docHeight = Math.max(docEl.scrollHeight, docEl.clientHeight);
			self.mask = _widget({
				x : 0,
				y : 0,
				z : self.z - 1,
				cls : 'ke-dialog-mask',
				width : docWidth,
				height : docHeight
			});
		}
		self.autoPos(self.div.width(), self.div.height());
		self.footerDiv = footerDiv;
		self.bodyDiv = bodyDiv;
		self.headerDiv = headerDiv;
		self.isLoading = false;
	},
	setMaskIndex : function(z) {
		var self = this;
		self.mask.div.css('z-index', z);
	},
	showLoading : function(msg) {
		msg = _undef(msg, '');
		var self = this, body = self.bodyDiv;
		self.loading = K('<div class="ke-dialog-loading"><div class="ke-inline-block ke-dialog-loading-content" style="margin-top:' + Math.round(body.height() / 3) + 'px;">' + msg + '</div></div>')
			.width(body.width()).height(body.height())
			.css('top', self.headerDiv.height() + 'px');
		body.css('visibility', 'hidden').after(self.loading);
		self.isLoading = true;
		return self;
	},
	hideLoading : function() {
		this.loading && this.loading.remove();
		this.bodyDiv.css('visibility', 'visible');
		this.isLoading = false;
		return this;
	},
	remove : function() {
		var self = this;
		if (self.options.beforeRemove) {
			self.options.beforeRemove.call(self);
		}
		self.mask && self.mask.remove();
		self.iframeMask && self.iframeMask.remove();
		self.closeIcon.unbind();
		K('input', self.div).unbind();
		K('button', self.div).unbind();
		self.footerDiv.unbind();
		self.bodyDiv.unbind();
		self.headerDiv.unbind();
		K('iframe', self.div).each(function() {
			K(this).remove();
		});
		KDialog.parent.remove.call(self);
		return self;
	}
});
function _dialog(options) {
	return new KDialog(options);
}
K.DialogClass = KDialog;
K.dialog = _dialog;
function _tabs(options) {
	var self = _widget(options),
		remove = self.remove,
		afterSelect = options.afterSelect,
		div = self.div,
		liList = [];
	div.addClass('ke-tabs')
		.bind('contextmenu,mousedown,mousemove', function(e) {
			e.preventDefault();
		});
	var ul = K('<ul class="ke-tabs-ul ke-clearfix"></ul>');
	div.append(ul);
	self.add = function(tab) {
		var li = K('<li class="ke-tabs-li">' + tab.title + '</li>');
		li.data('tab', tab);
		liList.push(li);
		ul.append(li);
	};
	self.selectedIndex = 0;
	self.select = function(index) {
		self.selectedIndex = index;
		_each(liList, function(i, li) {
			li.unbind();
			if (i === index) {
				li.addClass('ke-tabs-li-selected');
				K(li.data('tab').panel).show('');
			} else {
				li.removeClass('ke-tabs-li-selected').removeClass('ke-tabs-li-on')
				.mouseover(function() {
					K(this).addClass('ke-tabs-li-on');
				})
				.mouseout(function() {
					K(this).removeClass('ke-tabs-li-on');
				})
				.click(function() {
					self.select(i);
				});
				K(li.data('tab').panel).hide();
			}
		});
		if (afterSelect) {
			afterSelect.call(self, index);
		}
	};
	self.remove = function() {
		_each(liList, function() {
			this.remove();
		});
		ul.remove();
		remove.call(self);
	};
	return self;
}
K.tabs = _tabs;
function _loadScript(url, fn) {
	var head = document.getElementsByTagName('head')[0] || (_QUIRKS ? document.body : document.documentElement),
		script = document.createElement('script');
	head.appendChild(script);
	script.src = url;
	script.charset = 'utf-8';
	script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState === 'loaded') {
			if (fn) {
				fn();
			}
			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
		}
	};
}
function _chopQuery(url) {
	var index = url.indexOf('?');
	return index > 0 ? url.substr(0, index) : url;
}
function _loadStyle(url) {
	var head = document.getElementsByTagName('head')[0] || (_QUIRKS ? document.body : document.documentElement),
		link = document.createElement('link'),
		absoluteUrl = _chopQuery(_formatUrl(url, 'absolute'));
	var links = K('link[rel="stylesheet"]', head);
	for (var i = 0, len = links.length; i < len; i++) {
		if (_chopQuery(_formatUrl(links[i].href, 'absolute')) === absoluteUrl) {
			return;
		}
	}
	head.appendChild(link);
	link.href = url;
	link.rel = 'stylesheet';
}
function _ajax(url, fn, method, param, dataType) {
	method = method || 'GET';
	dataType = dataType || 'json';
	var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open(method, url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			if (fn) {
				var data = _trim(xhr.responseText);
				if (dataType == 'json') {
					data = _json(data);
				}
				fn(data);
			}
		}
	};
	if (method == 'POST') {
		var params = [];
		_each(param, function(key, val) {
			params.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
		});
		try {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		} catch (e) {}
		xhr.send(params.join('&'));
	} else {
		xhr.send(null);
	}
}
K.loadScript = _loadScript;
K.loadStyle = _loadStyle;
K.ajax = _ajax;
var _plugins = {};
function _plugin(name, fn) {
	if (name === undefined) {
		return _plugins;
	}
	if (!fn) {
		return _plugins[name];
	}
	_plugins[name] = fn;
}
var _language = {};
function _parseLangKey(key) {
	var match, ns = 'core';
	if ((match = /^(\w+)\.(\w+)$/.exec(key))) {
		ns = match[1];
		key = match[2];
	}
	return { ns : ns, key : key };
}
function _lang(mixed, langType) {
	langType = langType === undefined ? K.options.langType : langType;
	if (typeof mixed === 'string') {
		if (!_language[langType]) {
			return 'no language';
		}
		var pos = mixed.length - 1;
		if (mixed.substr(pos) === '.') {
			return _language[langType][mixed.substr(0, pos)];
		}
		var obj = _parseLangKey(mixed);
		return _language[langType][obj.ns][obj.key];
	}
	_each(mixed, function(key, val) {
		var obj = _parseLangKey(key);
		if (!_language[langType]) {
			_language[langType] = {};
		}
		if (!_language[langType][obj.ns]) {
			_language[langType][obj.ns] = {};
		}
		_language[langType][obj.ns][obj.key] = val;
	});
}
function _getImageFromRange(range, fn) {
	if (range.collapsed) {
		return;
	}
	range = range.cloneRange().up();
	var sc = range.startContainer, so = range.startOffset;
	if (!_WEBKIT && !range.isControl()) {
		return;
	}
	var img = K(sc.childNodes[so]);
	if (!img || img.name != 'img') {
		return;
	}
	if (fn(img)) {
		return img;
	}
}
function _bindContextmenuEvent() {
	var self = this, doc = self.edit.doc;
	K(doc).contextmenu(function(e) {
		if (self.menu) {
			self.hideMenu();
		}
		if (!self.useContextmenu) {
			e.preventDefault();
			return;
		}
		if (self._contextmenus.length === 0) {
			return;
		}
		var maxWidth = 0, items = [];
		_each(self._contextmenus, function() {
			if (this.title == '-') {
				items.push(this);
				return;
			}
			if (this.cond && this.cond()) {
				items.push(this);
				if (this.width && this.width > maxWidth) {
					maxWidth = this.width;
				}
			}
		});
		while (items.length > 0 && items[0].title == '-') {
			items.shift();
		}
		while (items.length > 0 && items[items.length - 1].title == '-') {
			items.pop();
		}
		var prevItem = null;
		_each(items, function(i) {
			if (this.title == '-' && prevItem.title == '-') {
				delete items[i];
			}
			prevItem = this;
		});
		if (items.length > 0) {
			e.preventDefault();
			var pos = K(self.edit.iframe).pos(),
				menu = _menu({
					x : pos.x + e.clientX,
					y : pos.y + e.clientY,
					width : maxWidth,
					css : { visibility: 'hidden' },
					shadowMode : self.shadowMode
				});
			_each(items, function() {
				if (this.title) {
					menu.addItem(this);
				}
			});
			var docEl = _docElement(menu.doc),
				menuHeight = menu.div.height();
			if (e.clientY + menuHeight >= docEl.clientHeight - 100) {
				menu.pos(menu.x, _removeUnit(menu.y) - menuHeight);
			}
			menu.div.css('visibility', 'visible');
			self.menu = menu;
		}
	});
}
function _bindNewlineEvent() {
	var self = this, doc = self.edit.doc, newlineTag = self.newlineTag;
	if (_IE && newlineTag !== 'br') {
		return;
	}
	if (_GECKO && _V < 3 && newlineTag !== 'p') {
		return;
	}
	if (_OPERA && _V < 9) {
		return;
	}
	var brSkipTagMap = _toMap('h1,h2,h3,h4,h5,h6,pre,li'),
		pSkipTagMap = _toMap('p,h1,h2,h3,h4,h5,h6,pre,li,blockquote');
	function getAncestorTagName(range) {
		var ancestor = K(range.commonAncestor());
		while (ancestor) {
			if (ancestor.type == 1 && !ancestor.isStyle()) {
				break;
			}
			ancestor = ancestor.parent();
		}
		return ancestor.name;
	}
	K(doc).keydown(function(e) {
		if (e.which != 13 || e.shiftKey || e.ctrlKey || e.altKey) {
			return;
		}
		self.cmd.selection();
		var tagName = getAncestorTagName(self.cmd.range);
		if (tagName == 'marquee' || tagName == 'select') {
			return;
		}
		if (newlineTag === 'br' && !brSkipTagMap[tagName]) {
			e.preventDefault();
			self.insertHtml('<br />' + (_IE && _V < 9 ? '' : '\u200B'));
			return;
		}
		if (!pSkipTagMap[tagName]) {
			_nativeCommand(doc, 'formatblock', '<p>');
		}
	});
	K(doc).keyup(function(e) {
		if (e.which != 13 || e.shiftKey || e.ctrlKey || e.altKey) {
			return;
		}
		if (newlineTag == 'br') {
			return;
		}
		if (_GECKO) {
			var root = self.cmd.commonAncestor('p');
			var a = self.cmd.commonAncestor('a');
			if (a && a.text() == '') {
				a.remove(true);
				self.cmd.range.selectNodeContents(root[0]).collapse(true);
				self.cmd.select();
			}
			return;
		}
		self.cmd.selection();
		var tagName = getAncestorTagName(self.cmd.range);
		if (tagName == 'marquee' || tagName == 'select') {
			return;
		}
		if (!pSkipTagMap[tagName]) {
			_nativeCommand(doc, 'formatblock', '<p>');
		}
		var div = self.cmd.commonAncestor('div');
		if (div) {
			var p = K('<p></p>'),
				child = div[0].firstChild;
			while (child) {
				var next = child.nextSibling;
				p.append(child);
				child = next;
			}
			div.before(p);
			div.remove();
			self.cmd.range.selectNodeContents(p[0]);
			self.cmd.select();
		}
	});
}
function _bindTabEvent() {
	var self = this, doc = self.edit.doc;
	K(doc).keydown(function(e) {
		if (e.which == 9) {
			e.preventDefault();
			if (self.afterTab) {
				self.afterTab.call(self, e);
				return;
			}
			var cmd = self.cmd, range = cmd.range;
			range.shrink();
			if (range.collapsed && range.startContainer.nodeType == 1) {
				range.insertNode(K('@&nbsp;', doc)[0]);
				cmd.select();
			}
			self.insertHtml('&nbsp;&nbsp;&nbsp;&nbsp;');
		}
	});
}
function _bindFocusEvent() {
	var self = this;
	K(self.edit.textarea[0], self.edit.win).focus(function(e) {
		if (self.afterFocus) {
			self.afterFocus.call(self, e);
		}
	}).blur(function(e) {
		if (self.afterBlur) {
			self.afterBlur.call(self, e);
		}
	});
}
function _removeBookmarkTag(html) {
	return _trim(html.replace(/<span [^>]*id="?__kindeditor_bookmark_\w+_\d+__"?[^>]*><\/span>/ig, ''));
}
function _removeTempTag(html) {
	return html.replace(/<div[^>]+class="?__kindeditor_paste__"?[^>]*>[\s\S]*?<\/div>/ig, '');
}
function _addBookmarkToStack(stack, bookmark) {
	if (stack.length === 0) {
		stack.push(bookmark);
		return;
	}
	var prev = stack[stack.length - 1];
	if (_removeBookmarkTag(bookmark.html) !== _removeBookmarkTag(prev.html)) {
		stack.push(bookmark);
	}
}
function _undoToRedo(fromStack, toStack) {
	var self = this, edit = self.edit,
		body = edit.doc.body,
		range, bookmark;
	if (fromStack.length === 0) {
		return self;
	}
	if (edit.designMode) {
		range = self.cmd.range;
		bookmark = range.createBookmark(true);
		bookmark.html = body.innerHTML;
	} else {
		bookmark = {
			html : body.innerHTML
		};
	}
	_addBookmarkToStack(toStack, bookmark);
	var prev = fromStack.pop();
	if (_removeBookmarkTag(bookmark.html) === _removeBookmarkTag(prev.html) && fromStack.length > 0) {
		prev = fromStack.pop();
	}
	if (edit.designMode) {
		edit.html(prev.html);
		if (prev.start) {
			range.moveToBookmark(prev);
			self.select();
		}
	} else {
		K(body).html(_removeBookmarkTag(prev.html));
	}
	return self;
}
function KEditor(options) {
	var self = this;
	self.options = {};
	function setOption(key, val) {
		if (KEditor.prototype[key] === undefined) {
			self[key] = val;
		}
		self.options[key] = val;
	}
	_each(options, function(key, val) {
		setOption(key, options[key]);
	});
	_each(K.options, function(key, val) {
		if (self[key] === undefined) {
			setOption(key, val);
		}
	});
	var se = K(self.srcElement || '<textarea/>');
	if (!self.width) {
		self.width = se[0].style.width || se.width();
	}
	if (!self.height) {
		self.height = se[0].style.height || se.height();
	}
	setOption('width', _undef(self.width, self.minWidth));
	setOption('height', _undef(self.height, self.minHeight));
	setOption('width', _addUnit(self.width));
	setOption('height', _addUnit(self.height));
	if (_MOBILE && (!_IOS || _V < 534)) {
		self.designMode = false;
	}
	self.srcElement = se;
	self.initContent = '';
	self.plugin = {};
	self.isCreated = false;
	self._handlers = {};
	self._contextmenus = [];
	self._undoStack = [];
	self._redoStack = [];
	self._firstAddBookmark = true;
	self.menu = self.contextmenu = null;
	self.dialogs = [];
}
KEditor.prototype = {
	lang : function(mixed) {
		return _lang(mixed, this.langType);
	},
	loadPlugin : function(name, fn) {
		var self = this;
		if (_plugins[name]) {
			if (!_isFunction(_plugins[name])) {
				setTimeout(function() {
					self.loadPlugin(name, fn);
				}, 100);
				return self;
			}
			_plugins[name].call(self, KindEditor);
			if (fn) {
				fn.call(self);
			}
			return self;
		}
		_plugins[name] = 'loading';
		_loadScript(self.pluginsPath + name + '/' + name + '.js?ver=' + encodeURIComponent(K.DEBUG ? _TIME : _VERSION), function() {
			setTimeout(function() {
				if (_plugins[name]) {
					self.loadPlugin(name, fn);
				}
			}, 0);
		});
		return self;
	},
	handler : function(key, fn) {
		var self = this;
		if (!self._handlers[key]) {
			self._handlers[key] = [];
		}
		if (_isFunction(fn)) {
			self._handlers[key].push(fn);
			return self;
		}
		_each(self._handlers[key], function() {
			fn = this.call(self, fn);
		});
		return fn;
	},
	clickToolbar : function(name, fn) {
		var self = this, key = 'clickToolbar' + name;
		if (fn === undefined) {
			if (self._handlers[key]) {
				return self.handler(key);
			}
			self.loadPlugin(name, function() {
				self.handler(key);
			});
			return self;
		}
		return self.handler(key, fn);
	},
	updateState : function() {
		var self = this;
		_each(('justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,insertunorderedlist,' +
			'subscript,superscript,bold,italic,underline,strikethrough').split(','), function(i, name) {
			self.cmd.state(name) ? self.toolbar.select(name) : self.toolbar.unselect(name);
		});
		return self;
	},
	addContextmenu : function(item) {
		this._contextmenus.push(item);
		return this;
	},
	afterCreate : function(fn) {
		return this.handler('afterCreate', fn);
	},
	beforeRemove : function(fn) {
		return this.handler('beforeRemove', fn);
	},
	beforeGetHtml : function(fn) {
		return this.handler('beforeGetHtml', fn);
	},
	beforeSetHtml : function(fn) {
		return this.handler('beforeSetHtml', fn);
	},
	afterSetHtml : function(fn) {
		return this.handler('afterSetHtml', fn);
	},
	create : function() {
		var self = this, fullscreenMode = self.fullscreenMode;
		if (self.isCreated) {
			return self;
		}
		if (self.srcElement.data('kindeditor')) {
			return self;
		}
		self.srcElement.data('kindeditor', 'true');
		if (fullscreenMode) {
			_docElement().style.overflow = 'hidden';
		} else {
			_docElement().style.overflow = '';
		}
		var width = fullscreenMode ? _docElement().clientWidth + 'px' : self.width,
			height = fullscreenMode ? _docElement().clientHeight + 'px' : self.height;
		if ((_IE && _V < 8) || _QUIRKS) {
			height = _addUnit(_removeUnit(height) + 2);
		}
		var container = self.container = K(self.layout);
		if (fullscreenMode) {
			K(document.body).append(container);
		} else {
			self.srcElement.before(container);
		}
		var toolbarDiv = K('.toolbar', container),
			editDiv = K('.edit', container),
			statusbar = self.statusbar = K('.statusbar', container);
		container.removeClass('container')
			.addClass('ke-container ke-container-' + self.themeType).css('width', width);
		if (fullscreenMode) {
			container.css({
				position : 'absolute',
				left : 0,
				top : 0,
				'z-index' : 811211
			});
			if (!_GECKO) {
				self._scrollPos = _getScrollPos();
			}
			window.scrollTo(0, 0);
			K(document.body).css({
				'height' : '1px',
				'overflow' : 'hidden'
			});
			K(document.body.parentNode).css('overflow', 'hidden');
			self._fullscreenExecuted = true;
		} else {
			if (self._fullscreenExecuted) {
				K(document.body).css({
					'height' : '',
					'overflow' : ''
				});
				K(document.body.parentNode).css('overflow', '');
			}
			if (self._scrollPos) {
				window.scrollTo(self._scrollPos.x, self._scrollPos.y);
			}
		}
		var htmlList = [];
		K.each(self.items, function(i, name) {
			if (name == '|') {
				htmlList.push('<span class="ke-inline-block ke-separator"></span>');
			} else if (name == '/') {
				htmlList.push('<div class="ke-hr"></div>');
			} else {
				htmlList.push('<span class="ke-outline" data-name="' + name + '" title="' + self.lang(name) + '" unselectable="on">');
				htmlList.push('<span class="ke-toolbar-icon ke-toolbar-icon-url ke-icon-' + name + '" unselectable="on"></span></span>');
			}
		});
		var toolbar = self.toolbar = _toolbar({
			src : toolbarDiv,
			html : htmlList.join(''),
			noDisableItems : self.noDisableItems,
			click : function(e, name) {
				e.stop();
				if (self.menu) {
					var menuName = self.menu.name;
					self.hideMenu();
					if (menuName === name) {
						return;
					}
				}
				self.clickToolbar(name);
			}
		});
		var editHeight = _removeUnit(height) - toolbar.div.height();
		var edit = self.edit = _edit({
			height : editHeight > 0 && _removeUnit(height) > self.minHeight ? editHeight : self.minHeight,
			src : editDiv,
			srcElement : self.srcElement,
			designMode : self.designMode,
			themesPath : self.themesPath,
			bodyClass : self.bodyClass,
			cssPath : self.cssPath,
			cssData : self.cssData,
			beforeGetHtml : function(html) {
				html = self.beforeGetHtml(html);
				html = _removeBookmarkTag(_removeTempTag(html));
				return _formatHtml(html, self.filterMode ? self.htmlTags : null, self.urlType, self.wellFormatMode, self.indentChar);
			},
			beforeSetHtml : function(html) {
				html = _formatHtml(html, self.filterMode ? self.htmlTags : null, '', false);
				return self.beforeSetHtml(html);
			},
			afterSetHtml : function() {
				self.edit = edit = this;
				self.afterSetHtml();
			},
			afterCreate : function() {
				self.edit = edit = this;
				self.cmd = edit.cmd;
				self._docMousedownFn = function(e) {
					if (self.menu) {
						self.hideMenu();
					}
				};
				K(edit.doc, document).mousedown(self._docMousedownFn);
				_bindContextmenuEvent.call(self);
				_bindNewlineEvent.call(self);
				_bindTabEvent.call(self);
				_bindFocusEvent.call(self);
				edit.afterChange(function(e) {
					if (!edit.designMode) {
						return;
					}
					self.updateState();
					self.addBookmark();
					if (self.options.afterChange) {
						self.options.afterChange.call(self);
					}
				});
				edit.textarea.keyup(function(e) {
					if (!e.ctrlKey && !e.altKey && _INPUT_KEY_MAP[e.which]) {
						if (self.options.afterChange) {
							self.options.afterChange.call(self);
						}
					}
				});
				if (self.readonlyMode) {
					self.readonly();
				}
				self.isCreated = true;
				if (self.initContent === '') {
					self.initContent = self.html();
				}
				if (self._undoStack.length > 0) {
					var prev = self._undoStack.pop();
					if (prev.start) {
						self.html(prev.html);
						edit.cmd.range.moveToBookmark(prev);
						self.select();
					}
				}
				self.afterCreate();
				if (self.options.afterCreate) {
					self.options.afterCreate.call(self);
				}
			}
		});
		statusbar.removeClass('statusbar').addClass('ke-statusbar')
			.append('<span class="ke-inline-block ke-statusbar-center-icon"></span>')
			.append('<span class="ke-inline-block ke-statusbar-right-icon"></span>');
		if (self._fullscreenResizeHandler) {
			K(window).unbind('resize', self._fullscreenResizeHandler);
			self._fullscreenResizeHandler = null;
		}
		function initResize() {
			if (statusbar.height() === 0) {
				setTimeout(initResize, 100);
				return;
			}
			self.resize(width, height, false);
		}
		initResize();
		if (fullscreenMode) {
			self._fullscreenResizeHandler = function(e) {
				if (self.isCreated) {
					self.resize(_docElement().clientWidth, _docElement().clientHeight, false);
				}
			};
			K(window).bind('resize', self._fullscreenResizeHandler);
			toolbar.select('fullscreen');
			statusbar.first().css('visibility', 'hidden');
			statusbar.last().css('visibility', 'hidden');
		} else {
			if (_GECKO) {
				K(window).bind('scroll', function(e) {
					self._scrollPos = _getScrollPos();
				});
			}
			if (self.resizeType > 0) {
				_drag({
					moveEl : container,
					clickEl : statusbar,
					moveFn : function(x, y, width, height, diffX, diffY) {
						height += diffY;
						self.resize(null, height);
					}
				});
			} else {
				statusbar.first().css('visibility', 'hidden');
			}
			if (self.resizeType === 2) {
				_drag({
					moveEl : container,
					clickEl : statusbar.last(),
					moveFn : function(x, y, width, height, diffX, diffY) {
						width += diffX;
						height += diffY;
						self.resize(width, height);
					}
				});
			} else {
				statusbar.last().css('visibility', 'hidden');
			}
		}
		return self;
	},
	remove : function() {
		var self = this;
		if (!self.isCreated) {
			return self;
		}
		self.beforeRemove();
		self.srcElement.data('kindeditor', '');
		if (self.menu) {
			self.hideMenu();
		}
		_each(self.dialogs, function() {
			self.hideDialog();
		});
		K(document).unbind('mousedown', self._docMousedownFn);
		self.toolbar.remove();
		self.edit.remove();
		self.statusbar.last().unbind();
		self.statusbar.unbind();
		self.container.remove();
		self.container = self.toolbar = self.edit = self.menu = null;
		self.dialogs = [];
		self.isCreated = false;
		return self;
	},
	resize : function(width, height, updateProp) {
		var self = this;
		updateProp = _undef(updateProp, true);
		if (width) {
			if (!/%/.test(width)) {
				width = _removeUnit(width);
				width = width < self.minWidth ? self.minWidth : width;
			}
			self.container.css('width', _addUnit(width));
			if (updateProp) {
				self.width = _addUnit(width);
			}
		}
		if (height) {
			height = _removeUnit(height);
			editHeight = _removeUnit(height) - self.toolbar.div.height() - self.statusbar.height();
			editHeight = editHeight < self.minHeight ? self.minHeight : editHeight;
			self.edit.setHeight(editHeight);
			if (updateProp) {
				self.height = _addUnit(height);
			}
		}
		return self;
	},
	select : function() {
		this.isCreated && this.cmd.select();
		return this;
	},
	html : function(val) {
		var self = this;
		if (val === undefined) {
			return self.isCreated ? self.edit.html() : _elementVal(self.srcElement);
		}
		self.isCreated ? self.edit.html(val) : _elementVal(self.srcElement, val);
		if (self.isCreated) {
			self.cmd.selection();
		}
		return self;
	},
	fullHtml : function() {
		return this.isCreated ? this.edit.html(undefined, true) : '';
	},
	text : function(val) {
		var self = this;
		if (val === undefined) {
			return _trim(self.html().replace(/<(?!img|embed).*?>/ig, '').replace(/&nbsp;/ig, ' '));
		} else {
			return self.html(_escape(val));
		}
	},
	isEmpty : function() {
		return _trim(this.text().replace(/\r\n|\n|\r/, '')) === '';
	},
	isDirty : function() {
		return _trim(this.initContent.replace(/\r\n|\n|\r|t/g, '')) !== _trim(this.html().replace(/\r\n|\n|\r|t/g, ''));
	},
	selectedHtml : function() {
		var val = this.isCreated ? this.cmd.range.html() : '';
		val = _removeBookmarkTag(_removeTempTag(val));
		return val;
	},
	count : function(mode) {
		var self = this;
		mode = (mode || 'html').toLowerCase();
		if (mode === 'html') {
			return self.html().length;
		}
		if (mode === 'text') {
			return self.text().replace(/<(?:img|embed).*?>/ig, 'K').replace(/\r\n|\n|\r/g, '').length;
		}
		return 0;
	},
	exec : function(key) {
		key = key.toLowerCase();
		var self = this, cmd = self.cmd,
			changeFlag = _inArray(key, 'selectall,copy,paste,print'.split(',')) < 0;
		if (changeFlag) {
			self.addBookmark(false);
		}
		cmd[key].apply(cmd, _toArray(arguments, 1));
		if (changeFlag) {
			self.updateState();
			self.addBookmark(false);
			if (self.options.afterChange) {
				self.options.afterChange.call(self);
			}
		}
		return self;
	},
	insertHtml : function(val, quickMode) {
		if (!this.isCreated) {
			return this;
		}
		val = this.beforeSetHtml(val);
		this.exec('inserthtml', val, quickMode);
		return this;
	},
	appendHtml : function(val) {
		this.html(this.html() + val);
		if (this.isCreated) {
			var cmd = this.cmd;
			cmd.range.selectNodeContents(cmd.doc.body).collapse(false);
			cmd.select();
		}
		return this;
	},
	sync : function() {
		_elementVal(this.srcElement, this.html());
		return this;
	},
	focus : function() {
		this.isCreated ? this.edit.focus() : this.srcElement[0].focus();
		return this;
	},
	blur : function() {
		this.isCreated ? this.edit.blur() : this.srcElement[0].blur();
		return this;
	},
	addBookmark : function(checkSize) {
		checkSize = _undef(checkSize, true);
		var self = this, edit = self.edit,
			body = edit.doc.body,
			html = _removeTempTag(body.innerHTML), bookmark;
		if (checkSize && self._undoStack.length > 0) {
			var prev = self._undoStack[self._undoStack.length - 1];
			if (Math.abs(html.length - _removeBookmarkTag(prev.html).length) < self.minChangeSize) {
				return self;
			}
		}
		if (edit.designMode && !self._firstAddBookmark) {
			var range = self.cmd.range;
			bookmark = range.createBookmark(true);
			bookmark.html = _removeTempTag(body.innerHTML);
			range.moveToBookmark(bookmark);
		} else {
			bookmark = {
				html : html
			};
		}
		self._firstAddBookmark = false;
		_addBookmarkToStack(self._undoStack, bookmark);
		return self;
	},
	undo : function() {
		return _undoToRedo.call(this, this._undoStack, this._redoStack);
	},
	redo : function() {
		return _undoToRedo.call(this, this._redoStack, this._undoStack);
	},
	fullscreen : function(bool) {
		this.fullscreenMode = (bool === undefined ? !this.fullscreenMode : bool);
		this.addBookmark(false);
		return this.remove().create();
	},
	readonly : function(isReadonly) {
		isReadonly = _undef(isReadonly, true);
		var self = this, edit = self.edit, doc = edit.doc;
		if (self.designMode) {
			self.toolbar.disableAll(isReadonly, []);
		} else {
			_each(self.noDisableItems, function() {
				self.toolbar[isReadonly ? 'disable' : 'enable'](this);
			});
		}
		if (_IE) {
			doc.body.contentEditable = !isReadonly;
		} else {
			doc.designMode = isReadonly ? 'off' : 'on';
		}
		edit.textarea[0].disabled = isReadonly;
	},
	createMenu : function(options) {
		var self = this,
			name = options.name,
			knode = self.toolbar.get(name),
			pos = knode.pos();
		options.x = pos.x;
		options.y = pos.y + knode.height();
		options.z = self.options.zIndex;
		options.shadowMode = _undef(options.shadowMode, self.shadowMode);
		if (options.selectedColor !== undefined) {
			options.cls = 'ke-colorpicker-' + self.themeType;
			options.noColor = self.lang('noColor');
			self.menu = _colorpicker(options);
		} else {
			options.cls = 'ke-menu-' + self.themeType;
			options.centerLineMode = false;
			self.menu = _menu(options);
		}
		return self.menu;
	},
	hideMenu : function() {
		this.menu.remove();
		this.menu = null;
		return this;
	},
	hideContextmenu : function() {
		this.contextmenu.remove();
		this.contextmenu = null;
		return this;
	},
	createDialog : function(options) {
		var self = this, name = options.name;
		options.z = self.options.zIndex;
		options.shadowMode = _undef(options.shadowMode, self.shadowMode);
		options.closeBtn = _undef(options.closeBtn, {
			name : self.lang('close'),
			click : function(e) {
				self.hideDialog();
				if (_IE && self.cmd) {
					self.cmd.select();
				}
			}
		});
		options.noBtn = _undef(options.noBtn, {
			name : self.lang(options.yesBtn ? 'no' : 'close'),
			click : function(e) {
				self.hideDialog();
				if (_IE && self.cmd) {
					self.cmd.select();
				}
			}
		});
		if (self.dialogAlignType != 'page') {
			options.alignEl = self.container;
		}
		options.cls = 'ke-dialog-' + self.themeType;
		if (self.dialogs.length > 0) {
			var firstDialog = self.dialogs[0],
				parentDialog = self.dialogs[self.dialogs.length - 1];
			firstDialog.setMaskIndex(parentDialog.z + 2);
			options.z = parentDialog.z + 3;
			options.showMask = false;
		}
		var dialog = _dialog(options);
		self.dialogs.push(dialog);
		return dialog;
	},
	hideDialog : function() {
		var self = this;
		if (self.dialogs.length > 0) {
			self.dialogs.pop().remove();
		}
		if (self.dialogs.length > 0) {
			var firstDialog = self.dialogs[0],
				parentDialog = self.dialogs[self.dialogs.length - 1];
			firstDialog.setMaskIndex(parentDialog.z - 1);
		}
		return self;
	},
	errorDialog : function(html) {
		var self = this;
		var dialog = self.createDialog({
			width : 750,
			title : self.lang('uploadError'),
			body : '<div style="padding:10px 20px;"><iframe frameborder="0" style="width:708px;height:400px;"></iframe></div>'
		});
		var iframe = K('iframe', dialog.div), doc = K.iframeDoc(iframe);
		doc.open();
		doc.write(html);
		doc.close();
		K(doc.body).css('background-color', '#FFF');
		iframe[0].contentWindow.focus();
		return self;
	}
};
function _editor(options) {
	return new KEditor(options);
}
_instances = [];
function _create(expr, options) {
	options = options || {};
	options.basePath = _undef(options.basePath, K.basePath);
	options.themesPath = _undef(options.themesPath, options.basePath + 'themes/');
	options.langPath = _undef(options.langPath, options.basePath + 'lang/');
	options.pluginsPath = _undef(options.pluginsPath, options.basePath + 'plugins/');
	if (_undef(options.loadStyleMode, K.options.loadStyleMode)) {
		var themeType = _undef(options.themeType, K.options.themeType);
		_loadStyle(options.themesPath + 'default/default.css');
		_loadStyle(options.themesPath + themeType + '/' + themeType + '.css');
	}
	function create(editor) {
		_each(_plugins, function(name, fn) {
			if (_isFunction(fn)) {
				fn.call(editor, KindEditor);
			}
		});
		return editor.create();
	}
	var knode = K(expr);
	if (!knode || knode.length === 0) {
		return;
	}
	if (knode.length > 1) {
		knode.each(function() {
			_create(this, options);
		});
		return _instances[0];
	}
	options.srcElement = knode[0];
	var editor = new KEditor(options);
	_instances.push(editor);
	if (_language[editor.langType]) {
		return create(editor);
	}
	_loadScript(editor.langPath + editor.langType + '.js?ver=' + encodeURIComponent(K.DEBUG ? _TIME : _VERSION), function() {
		create(editor);
	});
	return editor;
}
function _eachEditor(expr, fn) {
	K(expr).each(function(i, el) {
		K.each(_instances, function(j, editor) {
			if (editor && editor.srcElement[0] == el) {
				fn.call(editor, j);
				return false;
			}
		});
	});
}
K.remove = function(expr) {
	_eachEditor(expr, function(i) {
		this.remove();
		_instances.splice(i, 1);
	});
};
K.sync = function(expr) {
	_eachEditor(expr, function() {
		this.sync();
	});
};
K.html = function(expr, val) {
	_eachEditor(expr, function() {
		this.html(val);
	});
};
K.insertHtml = function(expr, val) {
	_eachEditor(expr, function() {
		this.insertHtml(val);
	});
};
K.appendHtml = function(expr, val) {
	_eachEditor(expr, function() {
		this.appendHtml(val);
	});
};
if (_IE && _V < 7) {
	_nativeCommand(document, 'BackgroundImageCache', true);
}
K.EditorClass = KEditor;
K.editor = _editor;
K.create = _create;
K.instances = _instances;
K.plugin = _plugin;
K.lang = _lang;
_plugin('core', function(K) {
	var self = this,
		shortcutKeys = {
			undo : 'Z', redo : 'Y', bold : 'B', italic : 'I', underline : 'U', print : 'P', selectall : 'A'
		};
	self.afterSetHtml(function() {
		if (self.options.afterChange) {
			self.options.afterChange.call(self);
		}
	});
	self.afterCreate(function() {
		if (self.syncType != 'form') {
			return;
		}
		var el = K(self.srcElement), hasForm = false;
		while ((el = el.parent())) {
			if (el.name == 'form') {
				hasForm = true;
				break;
			}
		}
		if (hasForm) {
			el.bind('submit', function(e) {
				self.sync();
				K(window).bind('unload', function() {
					self.edit.textarea.remove();
				});
			});
			var resetBtn = K('[type="reset"]', el);
			resetBtn.click(function() {
				self.html(self.initContent);
				self.cmd.selection();
			});
			self.beforeRemove(function() {
				el.unbind();
				resetBtn.unbind();
			});
		}
	});
	self.clickToolbar('source', function() {
		if (self.edit.designMode) {
			self.toolbar.disableAll(true);
			self.edit.design(false);
			self.toolbar.select('source');
		} else {
			self.toolbar.disableAll(false);
			self.edit.design(true);
			self.toolbar.unselect('source');
			if (_GECKO) {
				setTimeout(function() {
					self.cmd.selection();
				}, 0);
			} else {
				self.cmd.selection();
			}
		}
		self.designMode = self.edit.designMode;
	});
	self.afterCreate(function() {
		if (!self.designMode) {
			self.toolbar.disableAll(true).select('source');
		}
	});
	self.clickToolbar('fullscreen', function() {
		self.fullscreen();
	});
	if (self.fullscreenShortcut) {
		var loaded = false;
		self.afterCreate(function() {
			K(self.edit.doc, self.edit.textarea).keyup(function(e) {
				if (e.which == 27) {
					setTimeout(function() {
						self.fullscreen();
					}, 0);
				}
			});
			if (loaded) {
				if (_IE && !self.designMode) {
					return;
				}
				self.focus();
			}
			if (!loaded) {
				loaded = true;
			}
		});
	}
	_each('undo,redo'.split(','), function(i, name) {
		if (shortcutKeys[name]) {
			self.afterCreate(function() {
				_ctrl(this.edit.doc, shortcutKeys[name], function() {
					self.clickToolbar(name);
				});
			});
		}
		self.clickToolbar(name, function() {
			self[name]();
		});
	});
	self.clickToolbar('formatblock', function() {
		var blocks = self.lang('formatblock.formatBlock'),
			heights = {
				h1 : 28,
				h2 : 24,
				h3 : 18,
				H4 : 14,
				p : 12
			},
			curVal = self.cmd.val('formatblock'),
			menu = self.createMenu({
				name : 'formatblock',
				width : self.langType == 'en' ? 200 : 150
			});
		_each(blocks, function(key, val) {
			var style = 'font-size:' + heights[key] + 'px;';
			if (key.charAt(0) === 'h') {
				style += 'font-weight:bold;';
			}
			menu.addItem({
				title : '<span style="' + style + '" unselectable="on">' + val + '</span>',
				height : heights[key] + 12,
				checked : (curVal === key || curVal === val),
				click : function() {
					self.select().exec('formatblock', '<' + key + '>').hideMenu();
				}
			});
		});
	});
	self.clickToolbar('fontname', function() {
		var curVal = self.cmd.val('fontname'),
			menu = self.createMenu({
				name : 'fontname',
				width : 150
			});
		_each(self.lang('fontname.fontName'), function(key, val) {
			menu.addItem({
				title : '<span style="font-family: ' + key + ';" unselectable="on">' + val + '</span>',
				checked : (curVal === key.toLowerCase() || curVal === val.toLowerCase()),
				click : function() {
					self.exec('fontname', key).hideMenu();
				}
			});
		});
	});
	self.clickToolbar('fontsize', function() {
		var curVal = self.cmd.val('fontsize'),
			menu = self.createMenu({
				name : 'fontsize',
				width : 150
			});
		_each(self.fontSizeTable, function(i, val) {
			menu.addItem({
				title : '<span style="font-size:' + val + ';" unselectable="on">' + val + '</span>',
				height : _removeUnit(val) + 12,
				checked : curVal === val,
				click : function() {
					self.exec('fontsize', val).hideMenu();
				}
			});
		});
	});
	_each('forecolor,hilitecolor'.split(','), function(i, name) {
		self.clickToolbar(name, function() {
			self.createMenu({
				name : name,
				selectedColor : self.cmd.val(name) || 'default',
				colors : self.colorTable,
				click : function(color) {
					self.exec(name, color).hideMenu();
				}
			});
		});
	});
	_each(('cut,copy,paste').split(','), function(i, name) {
		self.clickToolbar(name, function() {
			self.focus();
			try {
				self.exec(name, null);
			} catch(e) {
				alert(self.lang(name + 'Error'));
			}
		});
	});
	self.clickToolbar('about', function() {
		var html = '<div style="margin:20px;">' +
			'<div>KindEditor ' + _VERSION + '</div>' +
			'<div>Copyright &copy; <a href="http://www.kindsoft.net/" target="_blank">kindsoft.net</a> All rights reserved.</div>' +
			'</div>';
		self.createDialog({
			name : 'about',
			width : 350,
			title : self.lang('about'),
			body : html
		});
	});
	self.plugin.getSelectedLink = function() {
		return self.cmd.commonAncestor('a');
	};
	self.plugin.getSelectedImage = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return !/^ke-\w+$/i.test(img[0].className);
		});
	};
	self.plugin.getSelectedFlash = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return img[0].className == 'ke-flash';
		});
	};
	self.plugin.getSelectedMedia = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return img[0].className == 'ke-media' || img[0].className == 'ke-rm';
		});
	};
	self.plugin.getSelectedAnchor = function() {
		return _getImageFromRange(self.edit.cmd.range, function(img) {
			return img[0].className == 'ke-anchor';
		});
	};
	_each('link,image,flash,media,anchor'.split(','), function(i, name) {
		var uName = name.charAt(0).toUpperCase() + name.substr(1);
		_each('edit,delete'.split(','), function(j, val) {
			self.addContextmenu({
				title : self.lang(val + uName),
				click : function() {
					self.loadPlugin(name, function() {
						self.plugin[name][val]();
						self.hideMenu();
					});
				},
				cond : self.plugin['getSelected' + uName],
				width : 150,
				iconClass : val == 'edit' ? 'ke-icon-' + name : undefined
			});
		});
		self.addContextmenu({ title : '-' });
	});
	self.plugin.getSelectedTable = function() {
		return self.cmd.commonAncestor('table');
	};
	self.plugin.getSelectedRow = function() {
		return self.cmd.commonAncestor('tr');
	};
	self.plugin.getSelectedCell = function() {
		return self.cmd.commonAncestor('td');
	};
	_each(('prop,cellprop,colinsertleft,colinsertright,rowinsertabove,rowinsertbelow,rowmerge,colmerge,' +
	'rowsplit,colsplit,coldelete,rowdelete,insert,delete').split(','), function(i, val) {
		var cond = _inArray(val, ['prop', 'delete']) < 0 ? self.plugin.getSelectedCell : self.plugin.getSelectedTable;
		self.addContextmenu({
			title : self.lang('table' + val),
			click : function() {
				self.loadPlugin('table', function() {
					self.plugin.table[val]();
					self.hideMenu();
				});
			},
			cond : cond,
			width : 170,
			iconClass : 'ke-icon-table' + val
		});
	});
	self.addContextmenu({ title : '-' });
	_each(('selectall,justifyleft,justifycenter,justifyright,justifyfull,insertorderedlist,' +
		'insertunorderedlist,indent,outdent,subscript,superscript,hr,print,' +
		'bold,italic,underline,strikethrough,removeformat,unlink').split(','), function(i, name) {
		if (shortcutKeys[name]) {
			self.afterCreate(function() {
				_ctrl(this.edit.doc, shortcutKeys[name], function() {
					self.cmd.selection();
					self.clickToolbar(name);
				});
			});
		}
		self.clickToolbar(name, function() {
			self.focus().exec(name, null);
		});
	});
	self.afterCreate(function() {
		var doc = self.edit.doc, cmd, bookmark, div,
			cls = '__kindeditor_paste__', pasting = false;
		function movePastedData() {
			cmd.range.moveToBookmark(bookmark);
			cmd.select();
			if (_WEBKIT) {
				K('div.' + cls, div).each(function() {
					K(this).after('<br />').remove(true);
				});
				K('span.Apple-style-span', div).remove(true);
				K('span.Apple-tab-span', div).remove(true);
				K('span[style]', div).each(function() {
					if (K(this).css('white-space') == 'nowrap') {
						K(this).remove(true);
					}
				});
				K('meta', div).remove();
			}
			var html = div[0].innerHTML;
			div.remove();
			if (html === '') {
				return;
			}
			if (_WEBKIT) {
				html = html.replace(/(<br>)\1/ig, '$1');
			}
			if (self.pasteType === 2) {
				html = html.replace(/(<(?:p|p\s[^>]*)>) *(<\/p>)/ig, '');
				if (/schemas-microsoft-com|worddocument|mso-\w+/i.test(html)) {
					html = _clearMsWord(html, self.filterMode ? self.htmlTags : K.options.htmlTags);
				} else {
					html = _formatHtml(html, self.filterMode ? self.htmlTags : null);
					html = self.beforeSetHtml(html);
				}
			}
			if (self.pasteType === 1) {
				html = html.replace(/&nbsp;/ig, ' ');
				html = html.replace(/\n\s*\n/g, '\n');
				html = html.replace(/<br[^>]*>/ig, '\n');
				html = html.replace(/<\/p><p[^>]*>/ig, '\n');
				html = html.replace(/<[^>]+>/g, '');
				html = html.replace(/ {2}/g, ' &nbsp;');
				if (self.newlineTag == 'p') {
					if (/\n/.test(html)) {
						html = html.replace(/^/, '<p>').replace(/$/, '<br /></p>').replace(/\n/g, '<br /></p><p>');
					}
				} else {
					html = html.replace(/\n/g, '<br />$&');
				}
			}
			self.insertHtml(html, true);
		}
		K(doc.body).bind('paste', function(e){
			if (self.pasteType === 0) {
				e.stop();
				return;
			}
			if (pasting) {
				return;
			}
			pasting = true;
			K('div.' + cls, doc).remove();
			cmd = self.cmd.selection();
			bookmark = cmd.range.createBookmark();
			div = K('<div class="' + cls + '"></div>', doc).css({
				position : 'absolute',
				width : '1px',
				height : '1px',
				overflow : 'hidden',
				left : '-1981px',
				top : K(bookmark.start).pos().y + 'px',
				'white-space' : 'nowrap'
			});
			K(doc.body).append(div);
			if (_IE) {
				var rng = cmd.range.get(true);
				rng.moveToElementText(div[0]);
				rng.select();
				rng.execCommand('paste');
				e.preventDefault();
			} else {
				cmd.range.selectNodeContents(div[0]);
				cmd.select();
			}
			setTimeout(function() {
				movePastedData();
				pasting = false;
			}, 0);
		});
	});
	self.beforeGetHtml(function(html) {
		if (_IE && _V <= 8) {
			html = html.replace(/<div\s+[^>]*data-ke-input-tag="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, tag) {
				return unescape(tag);
			});
			html = html.replace(/(<input)((?:\s+[^>]*)?>)/ig, function($0, $1, $2) {
				if (!/\s+type="[^"]+"/i.test($0)) {
					return $1 + ' type="text"' + $2;
				}
				return $0;
			});
		}
		return html.replace(/(<(?:noscript|noscript\s[^>]*)>)([\s\S]*?)(<\/noscript>)/ig, function($0, $1, $2, $3) {
			return $1 + _unescape($2).replace(/\s+/g, ' ') + $3;
		})
		.replace(/<img[^>]*class="?ke-(flash|rm|media)"?[^>]*>/ig, function(full) {
			var imgAttrs = _getAttrList(full);
			var styles = _getCssList(imgAttrs.style || '');
			var attrs = _mediaAttrs(imgAttrs['data-ke-tag']);
			var width = _undef(styles.width, '');
			var height = _undef(styles.height, '');
			if (/px/i.test(width)) {
				width = _removeUnit(width);
			}
			if (/px/i.test(height)) {
				height = _removeUnit(height);
			}
			attrs.width = _undef(imgAttrs.width, width);
			attrs.height = _undef(imgAttrs.height, height);
			return _mediaEmbed(attrs);
		})
		.replace(/<img[^>]*class="?ke-anchor"?[^>]*>/ig, function(full) {
			var imgAttrs = _getAttrList(full);
			return '<a name="' + unescape(imgAttrs['data-ke-name']) + '"></a>';
		})
		.replace(/<div\s+[^>]*data-ke-script-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, attr, code) {
			return '<script' + unescape(attr) + '>' + unescape(code) + '</script>';
		})
		.replace(/<div\s+[^>]*data-ke-noscript-attr="([^"]*)"[^>]*>([\s\S]*?)<\/div>/ig, function(full, attr, code) {
			return '<noscript' + unescape(attr) + '>' + unescape(code) + '</noscript>';
		})
		.replace(/(<[^>]*)data-ke-src="([^"]*)"([^>]*>)/ig, function(full, start, src, end) {
			full = full.replace(/(\s+(?:href|src)=")[^"]*(")/i, function($0, $1, $2) {
				return $1 + _unescape(src) + $2;
			});
			full = full.replace(/\s+data-ke-src="[^"]*"/i, '');
			return full;
		})
		.replace(/(<[^>]+\s)data-ke-(on\w+="[^"]*"[^>]*>)/ig, function(full, start, end) {
			return start + end;
		});
	});
	self.beforeSetHtml(function(html) {
		if (_IE && _V <= 8) {
			html = html.replace(/<input[^>]*>|<(select|button)[^>]*>[\s\S]*?<\/\1>/ig, function(full) {
				var attrs = _getAttrList(full);
				var styles = _getCssList(attrs.style || '');
				if (styles.display == 'none') {
					return '<div class="ke-display-none" data-ke-input-tag="' + escape(full) + '"></div>';
				}
				return full;
			});
		}
		return html.replace(/<embed[^>]*type="([^"]+)"[^>]*>(?:<\/embed>)?/ig, function(full) {
			var attrs = _getAttrList(full);
			attrs.src = _undef(attrs.src, '');
			attrs.width = _undef(attrs.width, 0);
			attrs.height = _undef(attrs.height, 0);
			return _mediaImg(self.themesPath + 'common/blank.gif', attrs);
		})
		.replace(/<a[^>]*name="([^"]+)"[^>]*>(?:<\/a>)?/ig, function(full) {
			var attrs = _getAttrList(full);
			if (attrs.href !== undefined) {
				return full;
			}
			return '<img class="ke-anchor" src="' + self.themesPath + 'common/anchor.gif" data-ke-name="' + escape(attrs.name) + '" />';
		})
		.replace(/<script([^>]*)>([\s\S]*?)<\/script>/ig, function(full, attr, code) {
			return '<div class="ke-script" data-ke-script-attr="' + escape(attr) + '">' + escape(code) + '</div>';
		})
		.replace(/<noscript([^>]*)>([\s\S]*?)<\/noscript>/ig, function(full, attr, code) {
			return '<div class="ke-noscript" data-ke-noscript-attr="' + escape(attr) + '">' + escape(code) + '</div>';
		})
		.replace(/(<[^>]*)(href|src)="([^"]*)"([^>]*>)/ig, function(full, start, key, src, end) {
			if (full.match(/\sdata-ke-src="[^"]*"/i)) {
				return full;
			}
			full = start + key + '="' + src + '"' + ' data-ke-src="' + _escape(src) + '"' + end;
			return full;
		})
		.replace(/(<[^>]+\s)(on\w+="[^"]*"[^>]*>)/ig, function(full, start, end) {
			return start + 'data-ke-' + end;
		})
		.replace(/<table[^>]*\s+border="0"[^>]*>/ig, function(full) {
			if (full.indexOf('ke-zeroborder') >= 0) {
				return full;
			}
			return _addClassToTag(full, 'ke-zeroborder');
		});
	});
});
})(window);
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.lang({
	source : 'HTMLä»£ç ',
	preview : 'é¢„è§ˆ',
	undo : 'åé€€(Ctrl+Z)',
	redo : 'å‰è¿›(Ctrl+Y)',
	cut : 'å‰ªåˆ‡(Ctrl+X)',
	copy : 'å¤åˆ¶(Ctrl+C)',
	paste : 'ç²˜è´´(Ctrl+V)',
	plainpaste : 'ç²˜è´´ä¸ºæ— æ ¼å¼æ–‡æœ¬',
	wordpaste : 'ä»Wordç²˜è´´',
	selectall : 'å…¨é€?Ctrl+A)',
	justifyleft : 'å·¦å¯¹é½?,
	justifycenter : 'å±…ä¸­',
	justifyright : 'å³å¯¹é½?,
	justifyfull : 'ä¸¤ç«¯å¯¹é½',
	insertorderedlist : 'ç¼–å·',
	insertunorderedlist : 'é¡¹ç›®ç¬¦å·',
	indent : 'å¢åŠ ç¼©è¿›',
	outdent : 'å‡å°‘ç¼©è¿›',
	subscript : 'ä¸‹æ ‡',
	superscript : 'ä¸Šæ ‡',
	formatblock : 'æ®µè½',
	fontname : 'å­—ä½“',
	fontsize : 'æ–‡å­—å¤§å°',
	forecolor : 'æ–‡å­—é¢œè‰²',
	hilitecolor : 'æ–‡å­—èƒŒæ™¯',
	bold : 'ç²—ä½“(Ctrl+B)',
	italic : 'æ–œä½“(Ctrl+I)',
	underline : 'ä¸‹åˆ’çº?Ctrl+U)',
	strikethrough : 'åˆ é™¤çº?,
	removeformat : 'åˆ é™¤æ ¼å¼',
	image : 'å›¾ç‰‡',
	multiimage : 'æ‰¹é‡å›¾ç‰‡ä¸Šä¼ ',
	flash : 'Flash',
	media : 'è§†éŸ³é¢?,
	table : 'è¡¨æ ¼',
	tablecell : 'å•å…ƒæ ?,
	hr : 'æ’å…¥æ¨ªçº¿',
	emoticons : 'æ’å…¥è¡¨æƒ…',
	link : 'è¶…çº§é“¾æ¥',
	unlink : 'å–æ¶ˆè¶…çº§é“¾æ¥',
	fullscreen : 'å…¨å±æ˜¾ç¤º',
	about : 'å…³äº',
	print : 'æ‰“å°(Ctrl+P)',
	filemanager : 'æ–‡ä»¶ç©ºé—´',
	code : 'æ’å…¥ç¨‹åºä»£ç ',
	map : 'Googleåœ°å›¾',
	baidumap : 'ç™¾åº¦åœ°å›¾',
	lineheight : 'è¡Œè·',
	clearhtml : 'æ¸…ç†HTMLä»£ç ',
	pagebreak : 'æ’å…¥åˆ†é¡µç¬?,
	quickformat : 'ä¸€é”®æ’ç‰?,
	insertfile : 'æ’å…¥æ–‡ä»¶',
	template : 'æ’å…¥æ¨¡æ¿',
	anchor : 'é”šç‚¹',
	yes : 'ç¡®å®š',
	no : 'å–æ¶ˆ',
	close : 'å…³é—­',
	editImage : 'å›¾ç‰‡å±æ€?,
	deleteImage : 'åˆ é™¤å›¾ç‰‡',
	editFlash : 'Flashå±æ€?,
	deleteFlash : 'åˆ é™¤Flash',
	editMedia : 'è§†éŸ³é¢‘å±æ€?,
	deleteMedia : 'åˆ é™¤è§†éŸ³é¢?,
	editLink : 'è¶…çº§é“¾æ¥å±æ€?,
	deleteLink : 'å–æ¶ˆè¶…çº§é“¾æ¥',
	editAnchor : 'é”šç‚¹å±æ€?,
	deleteAnchor : 'åˆ é™¤é”šç‚¹',
	tableprop : 'è¡¨æ ¼å±æ€?,
	tablecellprop : 'å•å…ƒæ ¼å±æ€?,
	tableinsert : 'æ’å…¥è¡¨æ ¼',
	tabledelete : 'åˆ é™¤è¡¨æ ¼',
	tablecolinsertleft : 'å·¦ä¾§æ’å…¥åˆ?,
	tablecolinsertright : 'å³ä¾§æ’å…¥åˆ?,
	tablerowinsertabove : 'ä¸Šæ–¹æ’å…¥è¡?,
	tablerowinsertbelow : 'ä¸‹æ–¹æ’å…¥è¡?,
	tablerowmerge : 'å‘ä¸‹åˆå¹¶å•å…ƒæ ?,
	tablecolmerge : 'å‘å³åˆå¹¶å•å…ƒæ ?,
	tablerowsplit : 'æ‹†åˆ†è¡?,
	tablecolsplit : 'æ‹†åˆ†åˆ?,
	tablecoldelete : 'åˆ é™¤åˆ?,
	tablerowdelete : 'åˆ é™¤è¡?,
	noColor : 'æ— é¢œè‰?,
	pleaseSelectFile : 'è¯·é€‰æ‹©æ–‡ä»¶ã€?,
	invalidImg : "è¯·è¾“å…¥æœ‰æ•ˆçš„URLåœ°å€ã€‚\nåªå…è®¸jpg,gif,bmp,pngæ ¼å¼ã€?,
	invalidMedia : "è¯·è¾“å…¥æœ‰æ•ˆçš„URLåœ°å€ã€‚\nåªå…è®¸swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvbæ ¼å¼ã€?,
	invalidWidth : "å®½åº¦å¿…é¡»ä¸ºæ•°å­—ã€?,
	invalidHeight : "é«˜åº¦å¿…é¡»ä¸ºæ•°å­—ã€?,
	invalidBorder : "è¾¹æ¡†å¿…é¡»ä¸ºæ•°å­—ã€?,
	invalidUrl : "è¯·è¾“å…¥æœ‰æ•ˆçš„URLåœ°å€ã€?,
	invalidRows : 'è¡Œæ•°ä¸ºå¿…é€‰é¡¹ï¼Œåªå…è®¸è¾“å…¥å¤§äº0çš„æ•°å­—ã€?,
	invalidCols : 'åˆ—æ•°ä¸ºå¿…é€‰é¡¹ï¼Œåªå…è®¸è¾“å…¥å¤§äº0çš„æ•°å­—ã€?,
	invalidPadding : 'è¾¹è·å¿…é¡»ä¸ºæ•°å­—ã€?,
	invalidSpacing : 'é—´è·å¿…é¡»ä¸ºæ•°å­—ã€?,
	invalidJson : 'æœåŠ¡å™¨å‘ç”Ÿæ•…éšœã€?,
	uploadSuccess : 'ä¸Šä¼ æˆåŠŸã€?,
	cutError : 'æ‚¨çš„æµè§ˆå™¨å®‰å…¨è®¾ç½®ä¸å…è®¸ä½¿ç”¨å‰ªåˆ‡æ“ä½œï¼Œè¯·ä½¿ç”¨å¿«æ·é”?Ctrl+X)æ¥å®Œæˆã€?,
	copyError : 'æ‚¨çš„æµè§ˆå™¨å®‰å…¨è®¾ç½®ä¸å…è®¸ä½¿ç”¨å¤åˆ¶æ“ä½œï¼Œè¯·ä½¿ç”¨å¿«æ·é”?Ctrl+C)æ¥å®Œæˆã€?,
	pasteError : 'æ‚¨çš„æµè§ˆå™¨å®‰å…¨è®¾ç½®ä¸å…è®¸ä½¿ç”¨ç²˜è´´æ“ä½œï¼Œè¯·ä½¿ç”¨å¿«æ·é”?Ctrl+V)æ¥å®Œæˆã€?,
	ajaxLoading : 'åŠ è½½ä¸­ï¼Œè¯·ç¨å€?...',
	uploadLoading : 'ä¸Šä¼ ä¸­ï¼Œè¯·ç¨å€?...',
	uploadError : 'ä¸Šä¼ é”™è¯¯',
	'plainpaste.comment' : 'è¯·ä½¿ç”¨å¿«æ·é”®(Ctrl+V)æŠŠå†…å®¹ç²˜è´´åˆ°ä¸‹é¢çš„æ–¹æ¡†é‡Œã€?,
	'wordpaste.comment' : 'è¯·ä½¿ç”¨å¿«æ·é”®(Ctrl+V)æŠŠå†…å®¹ç²˜è´´åˆ°ä¸‹é¢çš„æ–¹æ¡†é‡Œã€?,
	'code.pleaseInput' : 'è¯·è¾“å…¥ç¨‹åºä»£ç ã€?,
	'link.url' : 'URL',
	'link.linkType' : 'æ‰“å¼€ç±»å‹',
	'link.newWindow' : 'æ–°çª—å?,
	'link.selfWindow' : 'å½“å‰çª—å£',
	'flash.url' : 'URL',
	'flash.width' : 'å®½åº¦',
	'flash.height' : 'é«˜åº¦',
	'flash.upload' : 'ä¸Šä¼ ',
	'flash.viewServer' : 'æ–‡ä»¶ç©ºé—´',
	'media.url' : 'URL',
	'media.width' : 'å®½åº¦',
	'media.height' : 'é«˜åº¦',
	'media.autostart' : 'è‡ªåŠ¨æ’­æ”¾',
	'media.upload' : 'ä¸Šä¼ ',
	'media.viewServer' : 'æ–‡ä»¶ç©ºé—´',
	'image.remoteImage' : 'ç½‘ç»œå›¾ç‰‡',
	'image.localImage' : 'æœ¬åœ°ä¸Šä¼ ',
	'image.remoteUrl' : 'å›¾ç‰‡åœ°å€',
	'image.localUrl' : 'ä¸Šä¼ æ–‡ä»¶',
	'image.size' : 'å›¾ç‰‡å¤§å°',
	'image.width' : 'å®?,
	'image.height' : 'é«?,
	'image.resetSize' : 'é‡ç½®å¤§å°',
	'image.align' : 'å¯¹é½æ–¹å¼',
	'image.defaultAlign' : 'é»˜è®¤æ–¹å¼',
	'image.leftAlign' : 'å·¦å¯¹é½?,
	'image.rightAlign' : 'å³å¯¹é½?,
	'image.imgTitle' : 'å›¾ç‰‡è¯´æ˜',
	'image.upload' : 'æµè§ˆ...',
	'image.viewServer' : 'å›¾ç‰‡ç©ºé—´',
	'multiimage.uploadDesc' : 'å…è®¸ç”¨æˆ·åŒæ—¶ä¸Šä¼ <%=uploadLimit%>å¼ å›¾ç‰‡ï¼Œå•å¼ å›¾ç‰‡å®¹é‡ä¸è¶…è¿?%=sizeLimit%>',
	'multiimage.startUpload' : 'å¼€å§‹ä¸Šä¼?,
	'multiimage.clearAll' : 'å…¨éƒ¨æ¸…ç©º',
	'multiimage.insertAll' : 'å…¨éƒ¨æ’å…¥',
	'multiimage.queueLimitExceeded' : 'æ–‡ä»¶æ•°é‡è¶…è¿‡é™åˆ¶ã€?,
	'multiimage.fileExceedsSizeLimit' : 'æ–‡ä»¶å¤§å°è¶…è¿‡é™åˆ¶ã€?,
	'multiimage.zeroByteFile' : 'æ— æ³•ä¸Šä¼ ç©ºæ–‡ä»¶ã€?,
	'multiimage.invalidFiletype' : 'æ–‡ä»¶ç±»å‹ä¸æ­£ç¡®ã€?,
	'multiimage.unknownError' : 'å‘ç”Ÿå¼‚å¸¸ï¼Œæ— æ³•ä¸Šä¼ ã€?,
	'multiimage.pending' : 'ç­‰å¾…ä¸Šä¼ ',
	'multiimage.uploadError' : 'ä¸Šä¼ å¤±è´¥',
	'filemanager.emptyFolder' : 'ç©ºæ–‡ä»¶å¤¹',
	'filemanager.moveup' : 'ç§»åˆ°ä¸Šä¸€çº§æ–‡ä»¶å¤¹',
	'filemanager.viewType' : 'æ˜¾ç¤ºæ–¹å¼ï¼?,
	'filemanager.viewImage' : 'ç¼©ç•¥å›?,
	'filemanager.listImage' : 'è¯¦ç»†ä¿¡æ¯',
	'filemanager.orderType' : 'æ’åºæ–¹å¼ï¼?,
	'filemanager.fileName' : 'åç§°',
	'filemanager.fileSize' : 'å¤§å°',
	'filemanager.fileType' : 'ç±»å‹',
	'insertfile.url' : 'URL',
	'insertfile.title' : 'æ–‡ä»¶è¯´æ˜',
	'insertfile.upload' : 'ä¸Šä¼ ',
	'insertfile.viewServer' : 'æ–‡ä»¶ç©ºé—´',
	'table.cells' : 'å•å…ƒæ ¼æ•°',
	'table.rows' : 'è¡Œæ•°',
	'table.cols' : 'åˆ—æ•°',
	'table.size' : 'å¤§å°',
	'table.width' : 'å®½åº¦',
	'table.height' : 'é«˜åº¦',
	'table.percent' : '%',
	'table.px' : 'px',
	'table.space' : 'è¾¹è·é—´è·',
	'table.padding' : 'è¾¹è·',
	'table.spacing' : 'é—´è·',
	'table.align' : 'å¯¹é½æ–¹å¼',
	'table.textAlign' : 'æ°´å¹³å¯¹é½',
	'table.verticalAlign' : 'å‚ç›´å¯¹é½',
	'table.alignDefault' : 'é»˜è®¤',
	'table.alignLeft' : 'å·¦å¯¹é½?,
	'table.alignCenter' : 'å±…ä¸­',
	'table.alignRight' : 'å³å¯¹é½?,
	'table.alignTop' : 'é¡¶éƒ¨',
	'table.alignMiddle' : 'ä¸­éƒ¨',
	'table.alignBottom' : 'åº•éƒ¨',
	'table.alignBaseline' : 'åŸºçº¿',
	'table.border' : 'è¾¹æ¡†',
	'table.borderWidth' : 'è¾¹æ¡†',
	'table.borderColor' : 'é¢œè‰²',
	'table.backgroundColor' : 'èƒŒæ™¯é¢œè‰²',
	'map.address' : 'åœ°å€: ',
	'map.search' : 'æœç´¢',
	'baidumap.address' : 'åœ°å€: ',
	'baidumap.search' : 'æœç´¢',
	'baidumap.insertDynamicMap' : 'æ’å…¥åŠ¨æ€åœ°å›?,
	'anchor.name' : 'é”šç‚¹åç§°',
	'formatblock.formatBlock' : {
		h1 : 'æ ‡é¢˜ 1',
		h2 : 'æ ‡é¢˜ 2',
		h3 : 'æ ‡é¢˜ 3',
		h4 : 'æ ‡é¢˜ 4',
		p : 'æ­?æ–?
	},
	'fontname.fontName' : {
		'SimSun' : 'å®‹ä½“',
		'NSimSun' : 'æ–°å®‹ä½?,
		'FangSong_GB2312' : 'ä»¿å®‹_GB2312',
		'KaiTi_GB2312' : 'æ¥·ä½“_GB2312',
		'SimHei' : 'é»‘ä½“',
		'Microsoft YaHei' : 'å¾®è½¯é›…é»‘',
		'Arial' : 'Arial',
		'Arial Black' : 'Arial Black',
		'Times New Roman' : 'Times New Roman',
		'Courier New' : 'Courier New',
		'Tahoma' : 'Tahoma',
		'Verdana' : 'Verdana'
	},
	'lineheight.lineHeight' : [
		{'1' : 'å•å€è¡Œè·?},
		{'1.5' : '1.5å€è¡Œè·?},
		{'2' : '2å€è¡Œè·?},
		{'2.5' : '2.5å€è¡Œè·?},
		{'3' : '3å€è¡Œè·?}
	],
	'template.selectTemplate' : 'å¯é€‰æ¨¡æ?,
	'template.replaceContent' : 'æ›¿æ¢å½“å‰å†…å®¹',
	'template.fileList' : {
		'1.html' : 'å›¾ç‰‡å’Œæ–‡å­?,
		'2.html' : 'è¡¨æ ¼',
		'3.html' : 'é¡¹ç›®ç¼–å·'
	}
}, 'zh_CN');
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('anchor', function(K) {
	var self = this, name = 'anchor', lang = self.lang(name + '.');
	self.plugin.anchor = {
		edit : function() {
			var html = ['<div style="padding:20px;">',
					'<div class="ke-dialog-row">',
					'<label for="keName">' + lang.name + '</label>',
					'<input class="ke-input-text" type="text" id="keName" name="name" value="" style="width:100px;" />',
					'</div>',
					'</div>'].join('');
			var dialog = self.createDialog({
				name : name,
				width : 300,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						self.insertHtml('<a name="' + nameBox.val() + '">').hideDialog().focus();
					}
				}
			});
			var div = dialog.div,
				nameBox = K('input[name="name"]', div);
			var img = self.plugin.getSelectedAnchor();
			if (img) {
				nameBox.val(unescape(img.attr('data-ke-name')));
			}
			nameBox[0].focus();
			nameBox[0].select();
		},
		'delete' : function() {
			self.plugin.getSelectedAnchor().remove();
		}
	};
	self.clickToolbar(name, self.plugin.anchor.edit);
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('autoheight', function(K) {
	var self = this;

	if (!self.autoHeightMode) {
		return;
	}

	var minHeight;

	function hideScroll() {
		var edit = self.edit;
		var body = edit.doc.body;
		edit.iframe[0].scroll = 'no';
		body.style.overflowY = 'hidden';
	}

	function resetHeight() {
		var edit = self.edit;
		var body = edit.doc.body;
		edit.iframe.height(minHeight);
		self.resize(null, Math.max((K.IE ? body.scrollHeight : body.offsetHeight) + 76, minHeight));
	}

	function init() {
		minHeight = K.removeUnit(self.height);

		self.edit.afterChange(resetHeight);
		hideScroll();
		resetHeight();
	}

	if (self.isCreated) {
		init();
	} else {
		self.afterCreate(init);
	}
});

/*
* å¦‚ä½•å®ç°çœŸæ­£çš„è‡ªåŠ¨é«˜åº¦ï¼Ÿ
* ä¿®æ”¹ç¼–è¾‘å™¨é«˜åº¦ä¹‹åï¼Œå†æ¬¡è·å–bodyå†…å®¹é«˜åº¦æ—¶ï¼Œæœ€å°å€¼åªä¼šæ˜¯å½“å‰iframeçš„è®¾ç½®é«˜åº¦ï¼Œè¿™æ ·å°±å¯¼è‡´é«˜åº¦åªå¢ä¸å‡ã€?
* æ‰€ä»¥æ¯æ¬¡è·å–bodyå†…å®¹é«˜åº¦ä¹‹å‰ï¼Œå…ˆå°†iframeçš„é«˜åº¦é‡ç½®ä¸ºæœ€å°é«˜åº¦ï¼Œè¿™æ ·å°±èƒ½è·å–bodyçš„å®é™…é«˜åº¦ã€?
* ç”±æ­¤å°±å®ç°äº†çœŸæ­£çš„è‡ªåŠ¨é«˜åº?
* æµ‹è¯•ï¼šchromeã€firefoxã€IE9ã€IE8
* */
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

// Baidu Maps: http://dev.baidu.com/wiki/map/index.php?title=%E9%A6%96%E9%A1%B5

KindEditor.plugin('baidumap', function(K) {
	var self = this, name = 'baidumap', lang = self.lang(name + '.');
	var mapWidth = K.undef(self.mapWidth, 558);
	var mapHeight = K.undef(self.mapHeight, 360);
	self.clickToolbar(name, function() {
		var html = ['<div style="padding:10px 20px;">',
			'<div class="ke-header">',
			// left start
			'<div class="ke-left">',
			lang.address + ' <input id="kindeditor_plugin_map_address" name="address" class="ke-input-text" value="" style="width:200px;" /> ',
			'<span class="ke-button-common ke-button-outer">',
			'<input type="button" name="searchBtn" class="ke-button-common ke-button" value="' + lang.search + '" />',
			'</span>',
			'</div>',
			// right start
			'<div class="ke-right">',
			'<input type="checkbox" id="keInsertDynamicMap" name="insertDynamicMap" value="1" /> <label for="keInsertDynamicMap">' + lang.insertDynamicMap + '</label>',
			'</div>',
			'<div class="ke-clearfix"></div>',
			'</div>',
			'<div class="ke-map" style="width:' + mapWidth + 'px;height:' + mapHeight + 'px;"></div>',
			'</div>'].join('');
		var dialog = self.createDialog({
			name : name,
			width : mapWidth + 42,
			title : self.lang(name),
			body : html,
			yesBtn : {
				name : self.lang('yes'),
				click : function(e) {
					var map = win.map;
					var centerObj = map.getCenter();
					var center = centerObj.lng + ',' + centerObj.lat;
					var zoom = map.getZoom();
					var url = [checkbox[0].checked ? self.pluginsPath + 'baidumap/index.html' : 'http://api.map.baidu.com/staticimage',
						'?center=' + encodeURIComponent(center),
						'&zoom=' + encodeURIComponent(zoom),
						'&width=' + mapWidth,
						'&height=' + mapHeight,
						'&markers=' + encodeURIComponent(center),
						'&markerStyles=' + encodeURIComponent('l,A')].join('');
					if (checkbox[0].checked) {
						self.insertHtml('<iframe src="' + url + '" frameborder="0" style="width:' + (mapWidth + 2) + 'px;height:' + (mapHeight + 2) + 'px;"></iframe>');
					} else {
						self.exec('insertimage', url);
					}
					self.hideDialog().focus();
				}
			},
			beforeRemove : function() {
				searchBtn.remove();
				if (doc) {
					doc.write('');
				}
				iframe.remove();
			}
		});
		var div = dialog.div,
			addressBox = K('[name="address"]', div),
			searchBtn = K('[name="searchBtn"]', div),
			checkbox = K('[name="insertDynamicMap"]', dialog.div),
			win, doc;
		var iframe = K('<iframe class="ke-textarea" frameborder="0" src="' + self.pluginsPath + 'baidumap/map.html" style="width:' + mapWidth + 'px;height:' + mapHeight + 'px;"></iframe>');
		function ready() {
			win = iframe[0].contentWindow;
			doc = K.iframeDoc(iframe);
		}
		iframe.bind('load', function() {
			iframe.unbind('load');
			if (K.IE) {
				ready();
			} else {
				setTimeout(ready, 0);
			}
		});
		K('.ke-map', div).replaceWith(iframe);
		// search map
		searchBtn.click(function() {
			win.search(addressBox.val());
		});
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('clearhtml', function(K) {
	var self = this, name = 'clearhtml';
	self.clickToolbar(name, function() {
		self.focus();
		var html = self.html();
		html = html.replace(/(<script[^>]*>)([\s\S]*?)(<\/script>)/ig, '');
		html = html.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/ig, '');
		html = K.formatHtml(html, {
			a : ['href', 'target'],
			embed : ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
			img : ['src', 'width', 'height', 'border', 'alt', 'title', '.width', '.height'],
			table : ['border'],
			'td,th' : ['rowspan', 'colspan'],
			'div,hr,br,tbody,tr,p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6' : []
		});
		self.html(html);
		self.cmd.selection(true);
		self.addBookmark();
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

// google code prettify: http://google-code-prettify.googlecode.com/
// http://google-code-prettify.googlecode.com/

KindEditor.plugin('code', function(K) {
	var self = this, name = 'code';
	self.clickToolbar(name, function() {
		var lang = self.lang(name + '.'),
			html = ['<div style="padding:10px 20px;">',
				'<div class="ke-dialog-row">',
				'<select class="ke-code-type">',
				'<option value="js">JavaScript</option>',
				'<option value="html">HTML</option>',
				'<option value="css">CSS</option>',
				'<option value="php">PHP</option>',
				'<option value="pl">Perl</option>',
				'<option value="py">Python</option>',
				'<option value="rb">Ruby</option>',
				'<option value="java">Java</option>',
				'<option value="vb">ASP/VB</option>',
				'<option value="cpp">C/C++</option>',
				'<option value="cs">C#</option>',
				'<option value="xml">XML</option>',
				'<option value="bsh">Shell</option>',
				'<option value="">Other</option>',
				'</select>',
				'</div>',
				'<textarea class="ke-textarea" style="width:408px;height:260px;"></textarea>',
				'</div>'].join(''),
			dialog = self.createDialog({
				name : name,
				width : 450,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var type = K('.ke-code-type', dialog.div).val(),
							code = textarea.val(),
							cls = type === '' ? '' :  ' lang-' + type,
							html = '<pre class="prettyprint' + cls + '">\n' + K.escape(code) + '</pre> ';
						if (K.trim(code) === '') {
							alert(lang.pleaseInput);
							textarea[0].focus();
							return;
						}
						self.insertHtml(html).hideDialog().focus();
					}
				}
			}),
			textarea = K('textarea', dialog.div);
		textarea[0].focus();
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('emoticons', function(K) {
	var self = this, name = 'emoticons',
		path = (self.emoticonsPath || self.pluginsPath + 'emoticons/images/'),
		allowPreview = self.allowPreviewEmoticons === undefined ? true : self.allowPreviewEmoticons,
		currentPageNum = 1;
	self.clickToolbar(name, function() {
		var rows = 5, cols = 9, total = 135, startNum = 0,
			cells = rows * cols, pages = Math.ceil(total / cells),
			colsHalf = Math.floor(cols / 2),
			wrapperDiv = K('<div class="ke-plugin-emoticons"></div>'),
			elements = [],
			menu = self.createMenu({
				name : name,
				beforeRemove : function() {
					removeEvent();
				}
			});
		menu.div.append(wrapperDiv);
		var previewDiv, previewImg;
		if (allowPreview) {
			previewDiv = K('<div class="ke-preview"></div>').css('right', 0);
			previewImg = K('<img class="ke-preview-img" src="' + path + startNum + '.gif" />');
			wrapperDiv.append(previewDiv);
			previewDiv.append(previewImg);
		}
		function bindCellEvent(cell, j, num) {
			if (previewDiv) {
				cell.mouseover(function() {
					if (j > colsHalf) {
						previewDiv.css('left', 0);
						previewDiv.css('right', '');
					} else {
						previewDiv.css('left', '');
						previewDiv.css('right', 0);
					}
					previewImg.attr('src', path + num + '.gif');
					K(this).addClass('ke-on');
				});
			} else {
				cell.mouseover(function() {
					K(this).addClass('ke-on');
				});
			}
			cell.mouseout(function() {
				K(this).removeClass('ke-on');
			});
			cell.click(function(e) {
				self.insertHtml('<img src="' + path + num + '.gif" border="0" alt="" />').hideMenu().focus();
				e.stop();
			});
		}
		function createEmoticonsTable(pageNum, parentDiv) {
			var table = document.createElement('table');
			parentDiv.append(table);
			if (previewDiv) {
				K(table).mouseover(function() {
					previewDiv.show('block');
				});
				K(table).mouseout(function() {
					previewDiv.hide();
				});
				elements.push(K(table));
			}
			table.className = 'ke-table';
			table.cellPadding = 0;
			table.cellSpacing = 0;
			table.border = 0;
			var num = (pageNum - 1) * cells + startNum;
			for (var i = 0; i < rows; i++) {
				var row = table.insertRow(i);
				for (var j = 0; j < cols; j++) {
					var cell = K(row.insertCell(j));
					cell.addClass('ke-cell');
					bindCellEvent(cell, j, num);
					var span = K('<span class="ke-img"></span>')
						.css('background-position', '-' + (24 * num) + 'px 0px')
						.css('background-image', 'url(' + path + 'static.gif)');
					cell.append(span);
					elements.push(cell);
					num++;
				}
			}
			return table;
		}
		var table = createEmoticonsTable(currentPageNum, wrapperDiv);
		function removeEvent() {
			K.each(elements, function() {
				this.unbind();
			});
		}
		var pageDiv;
		function bindPageEvent(el, pageNum) {
			el.click(function(e) {
				removeEvent();
				table.parentNode.removeChild(table);
				pageDiv.remove();
				table = createEmoticonsTable(pageNum, wrapperDiv);
				createPageTable(pageNum);
				currentPageNum = pageNum;
				e.stop();
			});
		}
		function createPageTable(currentPageNum) {
			pageDiv = K('<div class="ke-page"></div>');
			wrapperDiv.append(pageDiv);
			for (var pageNum = 1; pageNum <= pages; pageNum++) {
				if (currentPageNum !== pageNum) {
					var a = K('<a href="javascript:;">[' + pageNum + ']</a>');
					bindPageEvent(a, pageNum);
					pageDiv.append(a);
					elements.push(a);
				} else {
					pageDiv.append(K('@[' + pageNum + ']'));
				}
				pageDiv.append(K('@&nbsp;'));
			}
		}
		createPageTable(currentPageNum);
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('filemanager', function(K) {
	var self = this, name = 'filemanager',
		fileManagerJson = K.undef(self.fileManagerJson, self.basePath + 'php/file_manager_json.php'),
		imgPath = self.pluginsPath + name + '/images/',
		lang = self.lang(name + '.');
	function makeFileTitle(filename, filesize, datetime) {
		return filename + ' (' + Math.ceil(filesize / 1024) + 'KB, ' + datetime + ')';
	}
	function bindTitle(el, data) {
		if (data.is_dir) {
			el.attr('title', data.filename);
		} else {
			el.attr('title', makeFileTitle(data.filename, data.filesize, data.datetime));
		}
	}
	self.plugin.filemanagerDialog = function(options) {
		var width = K.undef(options.width, 650),
			height = K.undef(options.height, 510),
			dirName = K.undef(options.dirName, ''),
			viewType = K.undef(options.viewType, 'VIEW').toUpperCase(), // "LIST" or "VIEW"
			clickFn = options.clickFn;
		var html = [
			'<div style="padding:10px 20px;">',
			// header start
			'<div class="ke-plugin-filemanager-header">',
			// left start
			'<div class="ke-left">',
			'<img class="ke-inline-block" name="moveupImg" src="' + imgPath + 'go-up.gif" width="16" height="16" border="0" alt="" /> ',
			'<a class="ke-inline-block" name="moveupLink" href="javascript:;">' + lang.moveup + '</a>',
			'</div>',
			// right start
			'<div class="ke-right">',
			lang.viewType + ' <select class="ke-inline-block" name="viewType">',
			'<option value="VIEW">' + lang.viewImage + '</option>',
			'<option value="LIST">' + lang.listImage + '</option>',
			'</select> ',
			lang.orderType + ' <select class="ke-inline-block" name="orderType">',
			'<option value="NAME">' + lang.fileName + '</option>',
			'<option value="SIZE">' + lang.fileSize + '</option>',
			'<option value="TYPE">' + lang.fileType + '</option>',
			'</select>',
			'</div>',
			'<div class="ke-clearfix"></div>',
			'</div>',
			// body start
			'<div class="ke-plugin-filemanager-body"></div>',
			'</div>'
		].join('');
		var dialog = self.createDialog({
			name : name,
			width : width,
			height : height,
			title : self.lang(name),
			body : html
		}),
		div = dialog.div,
		bodyDiv = K('.ke-plugin-filemanager-body', div),
		moveupImg = K('[name="moveupImg"]', div),
		moveupLink = K('[name="moveupLink"]', div),
		viewServerBtn = K('[name="viewServer"]', div),
		viewTypeBox = K('[name="viewType"]', div),
		orderTypeBox = K('[name="orderType"]', div);
		function reloadPage(path, order, func) {
			var param = 'path=' + path + '&order=' + order + '&dir=' + dirName;
			dialog.showLoading(self.lang('ajaxLoading'));
			K.ajax(K.addParam(fileManagerJson, param + '&' + new Date().getTime()), function(data) {
				dialog.hideLoading();
				func(data);
			});
		}
		var elList = [];
		function bindEvent(el, result, data, createFunc) {
			var fileUrl = K.formatUrl(result.current_url + data.filename, 'absolute'),
				dirPath = encodeURIComponent(result.current_dir_path + data.filename + '/');
			if (data.is_dir) {
				el.click(function(e) {
					reloadPage(dirPath, orderTypeBox.val(), createFunc);
				});
			} else if (data.is_photo) {
				el.click(function(e) {
					clickFn.call(this, fileUrl, data.filename);
				});
			} else {
				el.click(function(e) {
					clickFn.call(this, fileUrl, data.filename);
				});
			}
			elList.push(el);
		}
		function createCommon(result, createFunc) {
			// remove events
			K.each(elList, function() {
				this.unbind();
			});
			moveupLink.unbind();
			viewTypeBox.unbind();
			orderTypeBox.unbind();
			// add events
			if (result.current_dir_path) {
				moveupLink.click(function(e) {
					reloadPage(result.moveup_dir_path, orderTypeBox.val(), createFunc);
				});
			}
			function changeFunc() {
				if (viewTypeBox.val() == 'VIEW') {
					reloadPage(result.current_dir_path, orderTypeBox.val(), createView);
				} else {
					reloadPage(result.current_dir_path, orderTypeBox.val(), createList);
				}
			}
			viewTypeBox.change(changeFunc);
			orderTypeBox.change(changeFunc);
			bodyDiv.html('');
		}
		function createList(result) {
			createCommon(result, createList);
			var table = document.createElement('table');
			table.className = 'ke-table';
			table.cellPadding = 0;
			table.cellSpacing = 0;
			table.border = 0;
			bodyDiv.append(table);
			var fileList = result.file_list;
			for (var i = 0, len = fileList.length; i < len; i++) {
				var data = fileList[i], row = K(table.insertRow(i));
				row.mouseover(function(e) {
					K(this).addClass('ke-on');
				})
				.mouseout(function(e) {
					K(this).removeClass('ke-on');
				});
				var iconUrl = imgPath + (data.is_dir ? 'folder-16.gif' : 'file-16.gif'),
					img = K('<img src="' + iconUrl + '" width="16" height="16" alt="' + data.filename + '" align="absmiddle" />'),
					cell0 = K(row[0].insertCell(0)).addClass('ke-cell ke-name').append(img).append(document.createTextNode(' ' + data.filename));
				if (!data.is_dir || data.has_file) {
					row.css('cursor', 'pointer');
					cell0.attr('title', data.filename);
					bindEvent(cell0, result, data, createList);
				} else {
					cell0.attr('title', lang.emptyFolder);
				}
				K(row[0].insertCell(1)).addClass('ke-cell ke-size').html(data.is_dir ? '-' : Math.ceil(data.filesize / 1024) + 'KB');
				K(row[0].insertCell(2)).addClass('ke-cell ke-datetime').html(data.datetime);
			}
		}
		function createView(result) {
			createCommon(result, createView);
			var fileList = result.file_list;
			for (var i = 0, len = fileList.length; i < len; i++) {
				var data = fileList[i],
					div = K('<div class="ke-inline-block ke-item"></div>');
				bodyDiv.append(div);
				var photoDiv = K('<div class="ke-inline-block ke-photo"></div>')
					.mouseover(function(e) {
						K(this).addClass('ke-on');
					})
					.mouseout(function(e) {
						K(this).removeClass('ke-on');
					});
				div.append(photoDiv);
				var fileUrl = result.current_url + data.filename,
					iconUrl = data.is_dir ? imgPath + 'folder-64.gif' : (data.is_photo ? fileUrl : imgPath + 'file-64.gif');
				var img = K('<img src="' + iconUrl + '" width="80" height="80" alt="' + data.filename + '" />');
				if (!data.is_dir || data.has_file) {
					photoDiv.css('cursor', 'pointer');
					bindTitle(photoDiv, data);
					bindEvent(photoDiv, result, data, createView);
				} else {
					photoDiv.attr('title', lang.emptyFolder);
				}
				photoDiv.append(img);
				div.append('<div class="ke-name" title="' + data.filename + '">' + data.filename + '</div>');
			}
		}
		viewTypeBox.val(viewType);
		reloadPage('', orderTypeBox.val(), viewType == 'VIEW' ? createView : createList);
		return dialog;
	}

});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('flash', function(K) {
	var self = this, name = 'flash', lang = self.lang(name + '.'),
		allowFlashUpload = K.undef(self.allowFlashUpload, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php');
	self.plugin.flash = {
		edit : function() {
			var html = [
				'<div style="padding:20px;">',
				//url
				'<div class="ke-dialog-row">',
				'<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
				'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:160px;" /> &nbsp;',
				'<input type="button" class="ke-upload-button" value="' + lang.upload + '" /> &nbsp;',
				'<span class="ke-button-common ke-button-outer">',
				'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
				'</span>',
				'</div>',
				//width
				'<div class="ke-dialog-row">',
				'<label for="keWidth" style="width:60px;">' + lang.width + '</label>',
				'<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="550" maxlength="4" /> ',
				'</div>',
				//height
				'<div class="ke-dialog-row">',
				'<label for="keHeight" style="width:60px;">' + lang.height + '</label>',
				'<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="400" maxlength="4" /> ',
				'</div>',
				'</div>'
			].join('');
			var dialog = self.createDialog({
				name : name,
				width : 450,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var url = K.trim(urlBox.val()),
							width = widthBox.val(),
							height = heightBox.val();
						if (url == 'http://' || K.invalidUrl(url)) {
							alert(self.lang('invalidUrl'));
							urlBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(width)) {
							alert(self.lang('invalidWidth'));
							widthBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(height)) {
							alert(self.lang('invalidHeight'));
							heightBox[0].focus();
							return;
						}
						var html = K.mediaImg(self.themesPath + 'common/blank.gif', {
								src : url,
								type : K.mediaType('.swf'),
								width : width,
								height : height,
								quality : 'high'
							});
						self.insertHtml(html).hideDialog().focus();
					}
				}
			}),
			div = dialog.div,
			urlBox = K('[name="url"]', div),
			viewServerBtn = K('[name="viewServer"]', div),
			widthBox = K('[name="width"]', div),
			heightBox = K('[name="height"]', div);
			urlBox.val('http://');

			if (allowFlashUpload) {
				var uploadbutton = K.uploadbutton({
					button : K('.ke-upload-button', div)[0],
					fieldName : filePostName,
					extraParams : extraParams,
					url : K.addParam(uploadJson, 'dir=flash'),
					afterUpload : function(data) {
						dialog.hideLoading();
						if (data.error === 0) {
							var url = data.url;
							if (formatUploadUrl) {
								url = K.formatUrl(url, 'absolute');
							}
							urlBox.val(url);
							if (self.afterUpload) {
								self.afterUpload.call(self, url, data, name);
							}
							alert(self.lang('uploadSuccess'));
						} else {
							alert(data.message);
						}
					},
					afterError : function(html) {
						dialog.hideLoading();
						self.errorDialog(html);
					}
				});
				uploadbutton.fileBox.change(function(e) {
					dialog.showLoading(self.lang('uploadLoading'));
					uploadbutton.submit();
				});
			} else {
				K('.ke-upload-button', div).hide();
			}

			if (allowFileManager) {
				viewServerBtn.click(function(e) {
					self.loadPlugin('filemanager', function() {
						self.plugin.filemanagerDialog({
							viewType : 'LIST',
							dirName : 'flash',
							clickFn : function(url, title) {
								if (self.dialogs.length > 1) {
									K('[name="url"]', div).val(url);
									if (self.afterSelectFile) {
										self.afterSelectFile.call(self, url);
									}
									self.hideDialog();
								}
							}
						});
					});
				});
			} else {
				viewServerBtn.hide();
			}

			var img = self.plugin.getSelectedFlash();
			if (img) {
				var attrs = K.mediaAttrs(img.attr('data-ke-tag'));
				urlBox.val(attrs.src);
				widthBox.val(K.removeUnit(img.css('width')) || attrs.width || 0);
				heightBox.val(K.removeUnit(img.css('height')) || attrs.height || 0);
			}
			urlBox[0].focus();
			urlBox[0].select();
		},
		'delete' : function() {
			self.plugin.getSelectedFlash().remove();
			// [IE] åˆ é™¤å›¾ç‰‡åç«‹å³ç‚¹å‡»å›¾ç‰‡æŒ‰é’®å‡ºé”?
			self.addBookmark();
		}
	};
	self.clickToolbar(name, self.plugin.flash.edit);
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('image', function(K) {
	var self = this, name = 'image',
		allowImageUpload = K.undef(self.allowImageUpload, true),
		allowImageRemote = K.undef(self.allowImageRemote, true),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php'),
		imageTabIndex = K.undef(self.imageTabIndex, 0),
		imgPath = self.pluginsPath + 'image/images/',
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		fillDescAfterUploadImage = K.undef(self.fillDescAfterUploadImage, false),
		lang = self.lang(name + '.');

	self.plugin.imageDialog = function(options) {
		var imageUrl = options.imageUrl,
			imageWidth = K.undef(options.imageWidth, ''),
			imageHeight = K.undef(options.imageHeight, ''),
			imageTitle = K.undef(options.imageTitle, ''),
			imageAlign = K.undef(options.imageAlign, ''),
			showRemote = K.undef(options.showRemote, true),
			showLocal = K.undef(options.showLocal, true),
			tabIndex = K.undef(options.tabIndex, 0),
			clickFn = options.clickFn;
		var target = 'kindeditor_upload_iframe_' + new Date().getTime();
		var hiddenElements = [];
		for(var k in extraParams){
			hiddenElements.push('<input type="hidden" name="' + k + '" value="' + extraParams[k] + '" />');
		}
		var html = [
			'<div style="padding:20px;">',
			//tabs
			'<div class="tabs"></div>',
			//remote image - start
			'<div class="tab1" style="display:none;">',
			//url
			'<div class="ke-dialog-row">',
			'<label for="remoteUrl" style="width:60px;">' + lang.remoteUrl + '</label>',
			'<input type="text" id="remoteUrl" class="ke-input-text" name="url" value="" style="width:200px;" /> &nbsp;',
			'<span class="ke-button-common ke-button-outer">',
			'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
			'</span>',
			'</div>',
			//size
			'<div class="ke-dialog-row">',
			'<label for="remoteWidth" style="width:60px;">' + lang.size + '</label>',
			lang.width + ' <input type="text" id="remoteWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> ',
			lang.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> ',
			'<img class="ke-refresh-btn" src="' + imgPath + 'refresh.png" width="16" height="16" alt="" style="cursor:pointer;" title="' + lang.resetSize + '" />',
			'</div>',
			//align
			'<div class="ke-dialog-row">',
			'<label style="width:60px;">' + lang.align + '</label>',
			'<input type="radio" name="align" class="ke-inline-block" value="" checked="checked" /> <img name="defaultImg" src="' + imgPath + 'align_top.gif" width="23" height="25" alt="" />',
			' <input type="radio" name="align" class="ke-inline-block" value="left" /> <img name="leftImg" src="' + imgPath + 'align_left.gif" width="23" height="25" alt="" />',
			' <input type="radio" name="align" class="ke-inline-block" value="right" /> <img name="rightImg" src="' + imgPath + 'align_right.gif" width="23" height="25" alt="" />',
			'</div>',
			//title
			'<div class="ke-dialog-row">',
			'<label for="remoteTitle" style="width:60px;">' + lang.imgTitle + '</label>',
			'<input type="text" id="remoteTitle" class="ke-input-text" name="title" value="" style="width:200px;" />',
			'</div>',
			'</div>',
			//remote image - end
			//local upload - start
			'<div class="tab2" style="display:none;">',
			'<iframe name="' + target + '" style="display:none;"></iframe>',
			'<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + target + '" action="' + K.addParam(uploadJson, 'dir=image') + '">',
			//file
			'<div class="ke-dialog-row">',
			hiddenElements.join(''),
			'<label style="width:60px;">' + lang.localUrl + '</label>',
			'<input type="text" name="localUrl" class="ke-input-text" tabindex="-1" style="width:200px;" readonly="true" /> &nbsp;',
			'<input type="button" class="ke-upload-button" value="' + lang.upload + '" />',
			'</div>',
			'</form>',
			'</div>',
			//local upload - end
			'</div>'
		].join('');
		var dialogWidth = showLocal || allowFileManager ? 450 : 400,
			dialogHeight = showLocal && showRemote ? 300 : 250;
		var dialog = self.createDialog({
			name : name,
			width : dialogWidth,
			height : dialogHeight,
			title : self.lang(name),
			body : html,
			yesBtn : {
				name : self.lang('yes'),
				click : function(e) {
					// Bugfix: http://code.google.com/p/kindeditor/issues/detail?id=319
					if (dialog.isLoading) {
						return;
					}
					// insert local image
					if (showLocal && showRemote && tabs && tabs.selectedIndex === 1 || !showRemote) {
						if (uploadbutton.fileBox.val() == '') {
							alert(self.lang('pleaseSelectFile'));
							return;
						}
						dialog.showLoading(self.lang('uploadLoading'));
						uploadbutton.submit();
						localUrlBox.val('');
						return;
					}
					// insert remote image
					var url = K.trim(urlBox.val()),
						width = widthBox.val(),
						height = heightBox.val(),
						title = titleBox.val(),
						align = '';
					alignBox.each(function() {
						if (this.checked) {
							align = this.value;
							return false;
						}
					});
					if (url == 'http://' || K.invalidUrl(url)) {
						alert(self.lang('invalidUrl'));
						urlBox[0].focus();
						return;
					}
					if (!/^\d*$/.test(width)) {
						alert(self.lang('invalidWidth'));
						widthBox[0].focus();
						return;
					}
					if (!/^\d*$/.test(height)) {
						alert(self.lang('invalidHeight'));
						heightBox[0].focus();
						return;
					}
					clickFn.call(self, url, title, width, height, 0, align);
				}
			},
			beforeRemove : function() {
				viewServerBtn.unbind();
				widthBox.unbind();
				heightBox.unbind();
				refreshBtn.unbind();
			}
		}),
		div = dialog.div;

		var urlBox = K('[name="url"]', div),
			localUrlBox = K('[name="localUrl"]', div),
			viewServerBtn = K('[name="viewServer"]', div),
			widthBox = K('.tab1 [name="width"]', div),
			heightBox = K('.tab1 [name="height"]', div),
			refreshBtn = K('.ke-refresh-btn', div),
			titleBox = K('.tab1 [name="title"]', div),
			alignBox = K('.tab1 [name="align"]', div);

		var tabs;
		if (showRemote && showLocal) {
			tabs = K.tabs({
				src : K('.tabs', div),
				afterSelect : function(i) {}
			});
			tabs.add({
				title : lang.remoteImage,
				panel : K('.tab1', div)
			});
			tabs.add({
				title : lang.localImage,
				panel : K('.tab2', div)
			});
			tabs.select(tabIndex);
		} else if (showRemote) {
			K('.tab1', div).show();
		} else if (showLocal) {
			K('.tab2', div).show();
		}

		var uploadbutton = K.uploadbutton({
			button : K('.ke-upload-button', div)[0],
			fieldName : filePostName,
			form : K('.ke-form', div),
			target : target,
			width: 60,
			afterUpload : function(data) {
				dialog.hideLoading();
				if (data.error === 0) {
					var url = data.url;
					if (formatUploadUrl) {
						url = K.formatUrl(url, 'absolute');
					}
					if (self.afterUpload) {
						self.afterUpload.call(self, url, data, name);
					}
					if (!fillDescAfterUploadImage) {
						clickFn.call(self, url, data.title, data.width, data.height, data.border, data.align);
					} else {
						K(".ke-dialog-row #remoteUrl", div).val(url);
						K(".ke-tabs-li", div)[0].click();
						K(".ke-refresh-btn", div).click();
					}
				} else {
					alert(data.message);
				}
			},
			afterError : function(html) {
				dialog.hideLoading();
				self.errorDialog(html);
			}
		});
		uploadbutton.fileBox.change(function(e) {
			localUrlBox.val(uploadbutton.fileBox.val());
		});
		if (allowFileManager) {
			viewServerBtn.click(function(e) {
				self.loadPlugin('filemanager', function() {
					self.plugin.filemanagerDialog({
						viewType : 'VIEW',
						dirName : 'image',
						clickFn : function(url, title) {
							if (self.dialogs.length > 1) {
								K('[name="url"]', div).val(url);
								if (self.afterSelectFile) {
									self.afterSelectFile.call(self, url);
								}
								self.hideDialog();
							}
						}
					});
				});
			});
		} else {
			viewServerBtn.hide();
		}
		var originalWidth = 0, originalHeight = 0;
		function setSize(width, height) {
			widthBox.val(width);
			heightBox.val(height);
			originalWidth = width;
			originalHeight = height;
		}
		refreshBtn.click(function(e) {
			var tempImg = K('<img src="' + urlBox.val() + '" />', document).css({
				position : 'absolute',
				visibility : 'hidden',
				top : 0,
				left : '-1000px'
			});
			tempImg.bind('load', function() {
				setSize(tempImg.width(), tempImg.height());
				tempImg.remove();
			});
			K(document.body).append(tempImg);
		});
		widthBox.change(function(e) {
			if (originalWidth > 0) {
				heightBox.val(Math.round(originalHeight / originalWidth * parseInt(this.value, 10)));
			}
		});
		heightBox.change(function(e) {
			if (originalHeight > 0) {
				widthBox.val(Math.round(originalWidth / originalHeight * parseInt(this.value, 10)));
			}
		});
		urlBox.val(options.imageUrl);
		setSize(options.imageWidth, options.imageHeight);
		titleBox.val(options.imageTitle);
		alignBox.each(function() {
			if (this.value === options.imageAlign) {
				this.checked = true;
				return false;
			}
		});
		if (showRemote && tabIndex === 0) {
			urlBox[0].focus();
			urlBox[0].select();
		}
		return dialog;
	};
	self.plugin.image = {
		edit : function() {
			var img = self.plugin.getSelectedImage();
			self.plugin.imageDialog({
				imageUrl : img ? img.attr('data-ke-src') : 'http://',
				imageWidth : img ? img.width() : '',
				imageHeight : img ? img.height() : '',
				imageTitle : img ? img.attr('title') : '',
				imageAlign : img ? img.attr('align') : '',
				showRemote : allowImageRemote,
				showLocal : allowImageUpload,
				tabIndex: img ? 0 : imageTabIndex,
				clickFn : function(url, title, width, height, border, align) {
					if (img) {
						img.attr('src', url);
						img.attr('data-ke-src', url);
						img.attr('width', width);
						img.attr('height', height);
						img.attr('title', title);
						img.attr('align', align);
						img.attr('alt', title);
					} else {
						self.exec('insertimage', url, title, width, height, border, align);
					}
					// Bugfix: [Firefox] ä¸Šä¼ å›¾ç‰‡åï¼Œæ€»æ˜¯å‡ºç°æ­£åœ¨åŠ è½½çš„æ ·å¼ï¼Œéœ€è¦å»¶è¿Ÿæ‰§è¡ŒhideDialog
					setTimeout(function() {
						self.hideDialog().focus();
					}, 0);
				}
			});
		},
		'delete' : function() {
			var target = self.plugin.getSelectedImage();
			if (target.parent().name == 'a') {
				target = target.parent();
			}
			target.remove();
			// [IE] åˆ é™¤å›¾ç‰‡åç«‹å³ç‚¹å‡»å›¾ç‰‡æŒ‰é’®å‡ºé”?
			self.addBookmark();
		}
	};
	self.clickToolbar(name, self.plugin.image.edit);
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('insertfile', function(K) {
	var self = this, name = 'insertfile',
		allowFileUpload = K.undef(self.allowFileUpload, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php'),
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		lang = self.lang(name + '.');
	self.plugin.fileDialog = function(options) {
		var fileUrl = K.undef(options.fileUrl, 'http://'),
			fileTitle = K.undef(options.fileTitle, ''),
			clickFn = options.clickFn;
		var html = [
			'<div style="padding:20px;">',
			'<div class="ke-dialog-row">',
			'<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
			'<input type="text" id="keUrl" name="url" class="ke-input-text" style="width:160px;" /> &nbsp;',
			'<input type="button" class="ke-upload-button" value="' + lang.upload + '" /> &nbsp;',
			'<span class="ke-button-common ke-button-outer">',
			'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
			'</span>',
			'</div>',
			//title
			'<div class="ke-dialog-row">',
			'<label for="keTitle" style="width:60px;">' + lang.title + '</label>',
			'<input type="text" id="keTitle" class="ke-input-text" name="title" value="" style="width:160px;" /></div>',
			'</div>',
			//form end
			'</form>',
			'</div>'
			].join('');
		var dialog = self.createDialog({
			name : name,
			width : 450,
			title : self.lang(name),
			body : html,
			yesBtn : {
				name : self.lang('yes'),
				click : function(e) {
					var url = K.trim(urlBox.val()),
						title = titleBox.val();
					if (url == 'http://' || K.invalidUrl(url)) {
						alert(self.lang('invalidUrl'));
						urlBox[0].focus();
						return;
					}
					if (K.trim(title) === '') {
						title = url;
					}
					clickFn.call(self, url, title);
				}
			}
		}),
		div = dialog.div;

		var urlBox = K('[name="url"]', div),
			viewServerBtn = K('[name="viewServer"]', div),
			titleBox = K('[name="title"]', div);

		if (allowFileUpload) {
			var uploadbutton = K.uploadbutton({
				button : K('.ke-upload-button', div)[0],
				fieldName : filePostName,
				url : K.addParam(uploadJson, 'dir=file'),
				extraParams : extraParams,
				afterUpload : function(data) {
					dialog.hideLoading();
					if (data.error === 0) {
						var url = data.url;
						if (formatUploadUrl) {
							url = K.formatUrl(url, 'absolute');
						}
						urlBox.val(url);
						if (self.afterUpload) {
							self.afterUpload.call(self, url, data, name);
						}
						alert(self.lang('uploadSuccess'));
					} else {
						alert(data.message);
					}
				},
				afterError : function(html) {
					dialog.hideLoading();
					self.errorDialog(html);
				}
			});
			uploadbutton.fileBox.change(function(e) {
				dialog.showLoading(self.lang('uploadLoading'));
				uploadbutton.submit();
			});
		} else {
			K('.ke-upload-button', div).hide();
		}
		if (allowFileManager) {
			viewServerBtn.click(function(e) {
				self.loadPlugin('filemanager', function() {
					self.plugin.filemanagerDialog({
						viewType : 'LIST',
						dirName : 'file',
						clickFn : function(url, title) {
							if (self.dialogs.length > 1) {
								K('[name="url"]', div).val(url);
								if (self.afterSelectFile) {
									self.afterSelectFile.call(self, url);
								}
								self.hideDialog();
							}
						}
					});
				});
			});
		} else {
			viewServerBtn.hide();
		}
		urlBox.val(fileUrl);
		titleBox.val(fileTitle);
		urlBox[0].focus();
		urlBox[0].select();
	};
	self.clickToolbar(name, function() {
		self.plugin.fileDialog({
			clickFn : function(url, title) {
				var html = '<a class="ke-insertfile" href="' + url + '" data-ke-src="' + url + '" target="_blank">' + title + '</a>';
				self.insertHtml(html).hideDialog().focus();
			}
		});
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('lineheight', function(K) {
	var self = this, name = 'lineheight', lang = self.lang(name + '.');
	self.clickToolbar(name, function() {
		var curVal = '', commonNode = self.cmd.commonNode({'*' : '.line-height'});
		if (commonNode) {
			curVal = commonNode.css('line-height');
		}
		var menu = self.createMenu({
			name : name,
			width : 150
		});
		K.each(lang.lineHeight, function(i, row) {
			K.each(row, function(key, val) {
				menu.addItem({
					title : val,
					checked : curVal === key,
					click : function() {
						self.cmd.toggle('<span style="line-height:' + key + ';"></span>', {
							span : '.line-height=' + key
						});
						self.updateState();
						self.addBookmark();
						self.hideMenu();
					}
				});
			});
		});
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('link', function(K) {
	var self = this, name = 'link';
	self.plugin.link = {
		edit : function() {
			var lang = self.lang(name + '.'),
				html = '<div style="padding:20px;">' +
					//url
					'<div class="ke-dialog-row">' +
					'<label for="keUrl" style="width:60px;">' + lang.url + '</label>' +
					'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:260px;" /></div>' +
					//type
					'<div class="ke-dialog-row"">' +
					'<label for="keType" style="width:60px;">' + lang.linkType + '</label>' +
					'<select id="keType" name="type"></select>' +
					'</div>' +
					'</div>',
				dialog = self.createDialog({
					name : name,
					width : 450,
					title : self.lang(name),
					body : html,
					yesBtn : {
						name : self.lang('yes'),
						click : function(e) {
							var url = K.trim(urlBox.val());
							if (url == 'http://' || K.invalidUrl(url)) {
								alert(self.lang('invalidUrl'));
								urlBox[0].focus();
								return;
							}
							self.exec('createlink', url, typeBox.val()).hideDialog().focus();
						}
					}
				}),
				div = dialog.div,
				urlBox = K('input[name="url"]', div),
				typeBox = K('select[name="type"]', div);
			urlBox.val('http://');
			typeBox[0].options[0] = new Option(lang.newWindow, '_blank');
			typeBox[0].options[1] = new Option(lang.selfWindow, '');
			self.cmd.selection();
			var a = self.plugin.getSelectedLink();
			if (a) {
				self.cmd.range.selectNode(a[0]);
				self.cmd.select();
				urlBox.val(a.attr('data-ke-src'));
				typeBox.val(a.attr('target'));
			}
			urlBox[0].focus();
			urlBox[0].select();
		},
		'delete' : function() {
			self.exec('unlink', null);
		}
	};
	self.clickToolbar(name, self.plugin.link.edit);
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

// Google Maps: http://code.google.com/apis/maps/index.html

KindEditor.plugin('map', function(K) {
	var self = this, name = 'map', lang = self.lang(name + '.');
	self.clickToolbar(name, function() {
		var html = ['<div style="padding:10px 20px;">',
			'<div class="ke-dialog-row">',
			lang.address + ' <input id="kindeditor_plugin_map_address" name="address" class="ke-input-text" value="" style="width:200px;" /> ',
			'<span class="ke-button-common ke-button-outer">',
			'<input type="button" name="searchBtn" class="ke-button-common ke-button" value="' + lang.search + '" />',
			'</span>',
			'</div>',
			'<div class="ke-map" style="width:558px;height:360px;"></div>',
			'</div>'].join('');
		var dialog = self.createDialog({
			name : name,
			width : 600,
			title : self.lang(name),
			body : html,
			yesBtn : {
				name : self.lang('yes'),
				click : function(e) {
					var geocoder = win.geocoder,
						map = win.map,
						center = map.getCenter().lat() + ',' + map.getCenter().lng(),
						zoom = map.getZoom(),
						maptype = map.getMapTypeId(),
						url = 'http://maps.googleapis.com/maps/api/staticmap';
						url += '?center=' + encodeURIComponent(center);
						url += '&zoom=' + encodeURIComponent(zoom);
						url += '&size=558x360';
						url += '&maptype=' + encodeURIComponent(maptype);
						url += '&markers=' + encodeURIComponent(center);
						url += '&language=' + self.langType;
						url += '&sensor=false';
					self.exec('insertimage', url).hideDialog().focus();
				}
			},
			beforeRemove : function() {
				searchBtn.remove();
				if (doc) {
					doc.write('');
				}
				iframe.remove();
			}
		});
		var div = dialog.div,
			addressBox = K('[name="address"]', div),
			searchBtn = K('[name="searchBtn"]', div),
			win, doc;
		var iframeHtml = ['<!doctype html><html><head>',
			'<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />',
			'<style>',
			'	html { height: 100% }',
			'	body { height: 100%; margin: 0; padding: 0; background-color: #FFF }',
			'	#map_canvas { height: 100% }',
			'</style>',
			'<script src="http://maps.googleapis.com/maps/api/js?sensor=false&language=' + self.langType + '"></script>',
			'<script>',
			'var map, geocoder;',
			'function initialize() {',
			'	var latlng = new google.maps.LatLng(31.230393, 121.473704);',
			'	var options = {',
			'		zoom: 11,',
			'		center: latlng,',
			'		disableDefaultUI: true,',
			'		panControl: true,',
			'		zoomControl: true,',
			'		mapTypeControl: true,',
			'		scaleControl: true,',
			'		streetViewControl: false,',
			'		overviewMapControl: true,',
			'		mapTypeId: google.maps.MapTypeId.ROADMAP',
			'	};',
			'	map = new google.maps.Map(document.getElementById("map_canvas"), options);',
			'	geocoder = new google.maps.Geocoder();',
			'	geocoder.geocode({latLng: latlng}, function(results, status) {',
			'		if (status == google.maps.GeocoderStatus.OK) {',
			'			if (results[3]) {',
			'				parent.document.getElementById("kindeditor_plugin_map_address").value = results[3].formatted_address;',
			'			}',
			'		}',
			'	});',
			'}',
			'function search(address) {',
			'	if (!map) return;',
			'	geocoder.geocode({address : address}, function(results, status) {',
			'		if (status == google.maps.GeocoderStatus.OK) {',
			'			map.setZoom(11);',
			'			map.setCenter(results[0].geometry.location);',
			'			var marker = new google.maps.Marker({',
			'				map: map,',
			'				position: results[0].geometry.location',
			'			});',
			'		} else {',
			'			alert("Invalid address: " + address);',
			'		}',
			'	});',
			'}',
			'</script>',
			'</head>',
			'<body onload="initialize();">',
			'<div id="map_canvas" style="width:100%; height:100%"></div>',
			'</body></html>'].join('\n');
		// TODOï¼šç”¨doc.write(iframeHtml)æ–¹å¼åŠ è½½æ—¶ï¼Œåœ¨IE6ä¸Šç¬¬ä¸€æ¬¡åŠ è½½æŠ¥é”™ï¼Œæš‚æ—¶ä½¿ç”¨srcæ–¹å¼
		var iframe = K('<iframe class="ke-textarea" frameborder="0" src="' + self.pluginsPath + 'map/map.html" style="width:558px;height:360px;"></iframe>');
		function ready() {
			win = iframe[0].contentWindow;
			doc = K.iframeDoc(iframe);
			//doc.open();
			//doc.write(iframeHtml);
			//doc.close();
		}
		iframe.bind('load', function() {
			iframe.unbind('load');
			if (K.IE) {
				ready();
			} else {
				setTimeout(ready, 0);
			}
		});
		K('.ke-map', div).replaceWith(iframe);
		// search map
		searchBtn.click(function() {
			win.search(addressBox.val());
		});
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('media', function(K) {
	var self = this, name = 'media', lang = self.lang(name + '.'),
		allowMediaUpload = K.undef(self.allowMediaUpload, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php');
	self.plugin.media = {
		edit : function() {
			var html = [
				'<div style="padding:20px;">',
				//url
				'<div class="ke-dialog-row">',
				'<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
				'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:160px;" /> &nbsp;',
				'<input type="button" class="ke-upload-button" value="' + lang.upload + '" /> &nbsp;',
				'<span class="ke-button-common ke-button-outer">',
				'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
				'</span>',
				'</div>',
				//width
				'<div class="ke-dialog-row">',
				'<label for="keWidth" style="width:60px;">' + lang.width + '</label>',
				'<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="550" maxlength="4" />',
				'</div>',
				//height
				'<div class="ke-dialog-row">',
				'<label for="keHeight" style="width:60px;">' + lang.height + '</label>',
				'<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="400" maxlength="4" />',
				'</div>',
				//autostart
				'<div class="ke-dialog-row">',
				'<label for="keAutostart">' + lang.autostart + '</label>',
				'<input type="checkbox" id="keAutostart" name="autostart" value="" /> ',
				'</div>',
				'</div>'
			].join('');
			var dialog = self.createDialog({
				name : name,
				width : 450,
				height : 230,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var url = K.trim(urlBox.val()),
							width = widthBox.val(),
							height = heightBox.val();
						if (url == 'http://' || K.invalidUrl(url)) {
							alert(self.lang('invalidUrl'));
							urlBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(width)) {
							alert(self.lang('invalidWidth'));
							widthBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(height)) {
							alert(self.lang('invalidHeight'));
							heightBox[0].focus();
							return;
						}
						var html = K.mediaImg(self.themesPath + 'common/blank.gif', {
								src : url,
								type : K.mediaType(url),
								width : width,
								height : height,
								autostart : autostartBox[0].checked ? 'true' : 'false',
								loop : 'true'
							});
						self.insertHtml(html).hideDialog().focus();
					}
				}
			}),
			div = dialog.div,
			urlBox = K('[name="url"]', div),
			viewServerBtn = K('[name="viewServer"]', div),
			widthBox = K('[name="width"]', div),
			heightBox = K('[name="height"]', div),
			autostartBox = K('[name="autostart"]', div);
			urlBox.val('http://');

			if (allowMediaUpload) {
				var uploadbutton = K.uploadbutton({
					button : K('.ke-upload-button', div)[0],
					fieldName : filePostName,
					extraParams : extraParams,
					url : K.addParam(uploadJson, 'dir=media'),
					afterUpload : function(data) {
						dialog.hideLoading();
						if (data.error === 0) {
							var url = data.url;
							if (formatUploadUrl) {
								url = K.formatUrl(url, 'absolute');
							}
							urlBox.val(url);
							if (self.afterUpload) {
								self.afterUpload.call(self, url, data, name);
							}
							alert(self.lang('uploadSuccess'));
						} else {
							alert(data.message);
						}
					},
					afterError : function(html) {
						dialog.hideLoading();
						self.errorDialog(html);
					}
				});
				uploadbutton.fileBox.change(function(e) {
					dialog.showLoading(self.lang('uploadLoading'));
					uploadbutton.submit();
				});
			} else {
				K('.ke-upload-button', div).hide();
			}

			if (allowFileManager) {
				viewServerBtn.click(function(e) {
					self.loadPlugin('filemanager', function() {
						self.plugin.filemanagerDialog({
							viewType : 'LIST',
							dirName : 'media',
							clickFn : function(url, title) {
								if (self.dialogs.length > 1) {
									K('[name="url"]', div).val(url);
									if (self.afterSelectFile) {
										self.afterSelectFile.call(self, url);
									}
									self.hideDialog();
								}
							}
						});
					});
				});
			} else {
				viewServerBtn.hide();
			}

			var img = self.plugin.getSelectedMedia();
			if (img) {
				var attrs = K.mediaAttrs(img.attr('data-ke-tag'));
				urlBox.val(attrs.src);
				widthBox.val(K.removeUnit(img.css('width')) || attrs.width || 0);
				heightBox.val(K.removeUnit(img.css('height')) || attrs.height || 0);
				autostartBox[0].checked = (attrs.autostart === 'true');
			}
			urlBox[0].focus();
			urlBox[0].select();
		},
		'delete' : function() {
			self.plugin.getSelectedMedia().remove();
			// [IE] åˆ é™¤å›¾ç‰‡åç«‹å³ç‚¹å‡»å›¾ç‰‡æŒ‰é’®å‡ºé”?
			self.addBookmark();
		}
	};
	self.clickToolbar(name, self.plugin.media.edit);
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/


(function(K) {

function KSWFUpload(options) {
	this.init(options);
}
K.extend(KSWFUpload, {
	init : function(options) {
		var self = this;
		options.afterError = options.afterError || function(str) {
			alert(str);
		};
		self.options = options;
		self.progressbars = {};
		// template
		self.div = K(options.container).html([
			'<div class="ke-swfupload">',
			'<div class="ke-swfupload-top">',
			'<div class="ke-inline-block ke-swfupload-button">',
			'<input type="button" value="Browse" />',
			'</div>',
			'<div class="ke-inline-block ke-swfupload-desc">' + options.uploadDesc + '</div>',
			'<span class="ke-button-common ke-button-outer ke-swfupload-startupload">',
			'<input type="button" class="ke-button-common ke-button" value="' + options.startButtonValue + '" />',
			'</span>',
			'</div>',
			'<div class="ke-swfupload-body"></div>',
			'</div>'
		].join(''));
		self.bodyDiv = K('.ke-swfupload-body', self.div);

		function showError(itemDiv, msg) {
			K('.ke-status > div', itemDiv).hide();
			K('.ke-message', itemDiv).addClass('ke-error').show().html(K.escape(msg));
		}

		var settings = {
			debug : false,
			upload_url : options.uploadUrl,
			flash_url : options.flashUrl,
			file_post_name : options.filePostName,
			button_placeholder : K('.ke-swfupload-button > input', self.div)[0],
			button_image_url: options.buttonImageUrl,
			button_width: options.buttonWidth,
			button_height: options.buttonHeight,
			button_cursor : SWFUpload.CURSOR.HAND,
			file_types : options.fileTypes,
			file_types_description : options.fileTypesDesc,
			file_upload_limit : options.fileUploadLimit,
			file_size_limit : options.fileSizeLimit,
			post_params : options.postParams,
			file_queued_handler : function(file) {
				file.url = self.options.fileIconUrl;
				self.appendFile(file);
			},
			file_queue_error_handler : function(file, errorCode, message) {
				var errorName = '';
				switch (errorCode) {
					case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
						errorName = options.queueLimitExceeded;
						break;
					case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
						errorName = options.fileExceedsSizeLimit;
						break;
					case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
						errorName = options.zeroByteFile;
						break;
					case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
						errorName = options.invalidFiletype;
						break;
					default:
						errorName = options.unknownError;
						break;
				}
				K.DEBUG && alert(errorName);
			},
			upload_start_handler : function(file) {
				var self = this;
				var itemDiv = K('div[data-id="' + file.id + '"]', self.bodyDiv);
				K('.ke-status > div', itemDiv).hide();
				K('.ke-progressbar', itemDiv).show();
			},
			upload_progress_handler : function(file, bytesLoaded, bytesTotal) {
				var percent = Math.round(bytesLoaded * 100 / bytesTotal);
				var progressbar = self.progressbars[file.id];
				progressbar.bar.css('width', Math.round(percent * 80 / 100) + 'px');
				progressbar.percent.html(percent + '%');
			},
			upload_error_handler : function(file, errorCode, message) {
				if (file && file.filestatus == SWFUpload.FILE_STATUS.ERROR) {
					var itemDiv = K('div[data-id="' + file.id + '"]', self.bodyDiv).eq(0);
					showError(itemDiv, self.options.errorMessage);
				}
			},
			upload_success_handler : function(file, serverData) {
				var itemDiv = K('div[data-id="' + file.id + '"]', self.bodyDiv).eq(0);
				var data = {};
				try {
					data = K.json(serverData);
				} catch (e) {
					self.options.afterError.call(this, '<!doctype html><html>' + serverData + '</html>');
				}
				if (data.error !== 0) {
					showError(itemDiv, K.DEBUG ? data.message : self.options.errorMessage);
					return;
				}
				file.url = data.url;
				K('.ke-img', itemDiv).attr('src', file.url).attr('data-status', file.filestatus).data('data', data);
				K('.ke-status > div', itemDiv).hide();
			}
		};
		self.swfu = new SWFUpload(settings);

		K('.ke-swfupload-startupload input', self.div).click(function() {
			self.swfu.startUpload();
		});
	},
	getUrlList : function() {
		var list = [];
		K('.ke-img', self.bodyDiv).each(function() {
			var img = K(this);
			var status = img.attr('data-status');
			if (status == SWFUpload.FILE_STATUS.COMPLETE) {
				list.push(img.data('data'));
			}
		});
		return list;
	},
	removeFile : function(fileId) {
		var self = this;
		self.swfu.cancelUpload(fileId);
		var itemDiv = K('div[data-id="' + fileId + '"]', self.bodyDiv);
		K('.ke-photo', itemDiv).unbind();
		K('.ke-delete', itemDiv).unbind();
		itemDiv.remove();
	},
	removeFiles : function() {
		var self = this;
		K('.ke-item', self.bodyDiv).each(function() {
			self.removeFile(K(this).attr('data-id'));
		});
	},
	appendFile : function(file) {
		var self = this;
		var itemDiv = K('<div class="ke-inline-block ke-item" data-id="' + file.id + '"></div>');
		self.bodyDiv.append(itemDiv);
		var photoDiv = K('<div class="ke-inline-block ke-photo"></div>')
			.mouseover(function(e) {
				K(this).addClass('ke-on');
			})
			.mouseout(function(e) {
				K(this).removeClass('ke-on');
			});
		itemDiv.append(photoDiv);

		var img = K('<img src="' + file.url + '" class="ke-img" data-status="' + file.filestatus + '" width="80" height="80" alt="' + file.name + '" />');
		photoDiv.append(img);
		K('<span class="ke-delete"></span>').appendTo(photoDiv).click(function() {
			self.removeFile(file.id);
		});
		var statusDiv = K('<div class="ke-status"></div>').appendTo(photoDiv);
		// progressbar
		K(['<div class="ke-progressbar">',
			'<div class="ke-progressbar-bar"><div class="ke-progressbar-bar-inner"></div></div>',
			'<div class="ke-progressbar-percent">0%</div></div>'].join('')).hide().appendTo(statusDiv);
		// message
		K('<div class="ke-message">' + self.options.pendingMessage + '</div>').appendTo(statusDiv);

		itemDiv.append('<div class="ke-name">' + file.name + '</div>');

		self.progressbars[file.id] = {
			bar : K('.ke-progressbar-bar-inner', photoDiv),
			percent : K('.ke-progressbar-percent', photoDiv)
		};
	},
	remove : function() {
		this.removeFiles();
		this.swfu.destroy();
		this.div.html('');
	}
});

K.swfupload = function(element, options) {
	return new KSWFUpload(element, options);
};

})(KindEditor);

KindEditor.plugin('multiimage', function(K) {
	var self = this, name = 'multiimage',
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php'),
		imgPath = self.pluginsPath + 'multiimage/images/',
		imageSizeLimit = K.undef(self.imageSizeLimit, '1MB'),
		imageFileTypes = K.undef(self.imageFileTypes, '*.jpg;*.gif;*.png'),
		imageUploadLimit = K.undef(self.imageUploadLimit, 20),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		lang = self.lang(name + '.');

	self.plugin.multiImageDialog = function(options) {
		var clickFn = options.clickFn,
			uploadDesc = K.tmpl(lang.uploadDesc, {uploadLimit : imageUploadLimit, sizeLimit : imageSizeLimit});
		var html = [
			'<div style="padding:20px;">',
			'<div class="swfupload">',
			'</div>',
			'</div>'
		].join('');
		var dialog = self.createDialog({
			name : name,
			width : 650,
			height : 510,
			title : self.lang(name),
			body : html,
			previewBtn : {
				name : lang.insertAll,
				click : function(e) {
					clickFn.call(self, swfupload.getUrlList());
				}
			},
			yesBtn : {
				name : lang.clearAll,
				click : function(e) {
					swfupload.removeFiles();
				}
			},
			beforeRemove : function() {
				// IE9 bugfix: https://github.com/kindsoft/kindeditor/issues/72
				if (!K.IE || K.V <= 8) {
					swfupload.remove();
				}
			}
		}),
		div = dialog.div;

		var swfupload = K.swfupload({
			container : K('.swfupload', div),
			buttonImageUrl : imgPath + (self.langType == 'zh_CN' ? 'select-files-zh_CN.png' : 'select-files-en.png'),
			buttonWidth : self.langType == 'zh_CN' ? 72 : 88,
			buttonHeight : 23,
			fileIconUrl : imgPath + 'image.png',
			uploadDesc : uploadDesc,
			startButtonValue : lang.startUpload,
			uploadUrl : K.addParam(uploadJson, 'dir=image'),
			flashUrl : imgPath + 'swfupload.swf',
			filePostName : filePostName,
			fileTypes : '*.jpg;*.jpeg;*.gif;*.png;*.bmp',
			fileTypesDesc : 'Image Files',
			fileUploadLimit : imageUploadLimit,
			fileSizeLimit : imageSizeLimit,
			postParams :  K.undef(self.extraFileUploadParams, {}),
			queueLimitExceeded : lang.queueLimitExceeded,
			fileExceedsSizeLimit : lang.fileExceedsSizeLimit,
			zeroByteFile : lang.zeroByteFile,
			invalidFiletype : lang.invalidFiletype,
			unknownError : lang.unknownError,
			pendingMessage : lang.pending,
			errorMessage : lang.uploadError,
			afterError : function(html) {
				self.errorDialog(html);
			}
		});

		return dialog;
	};
	self.clickToolbar(name, function() {
		self.plugin.multiImageDialog({
			clickFn : function (urlList) {
				if (urlList.length === 0) {
					return;
				}
				K.each(urlList, function(i, data) {
					if (self.afterUpload) {
						self.afterUpload.call(self, data.url, data, 'multiimage');
					}
					self.exec('insertimage', data.url, data.title, data.width, data.height, data.border, data.align);
				});
				// Bugfix: [Firefox] ä¸Šä¼ å›¾ç‰‡åï¼Œæ€»æ˜¯å‡ºç°æ­£åœ¨åŠ è½½çš„æ ·å¼ï¼Œéœ€è¦å»¶è¿Ÿæ‰§è¡ŒhideDialog
				setTimeout(function() {
					self.hideDialog().focus();
				}, 0);
			}
		});
	});
});


/**
 * SWFUpload: http://www.swfupload.org, http://swfupload.googlecode.com
 *
 * mmSWFUpload 1.0: Flash upload dialog - http://profandesign.se/swfupload/,  http://www.vinterwebb.se/
 *
 * SWFUpload is (c) 2006-2007 Lars Huring, Olov Nilzé–?and Mammon Media and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * SWFUpload 2 is (c) 2007-2008 Jake Roberts and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


/* ******************* */
/* Constructor & Init  */
/* ******************* */

(function() {

window.SWFUpload = function (settings) {
	this.initSWFUpload(settings);
};

SWFUpload.prototype.initSWFUpload = function (settings) {
	try {
		this.customSettings = {};	// A container where developers can place their own settings associated with this instance.
		this.settings = settings;
		this.eventQueue = [];
		this.movieName = "KindEditor_SWFUpload_" + SWFUpload.movieCount++;
		this.movieElement = null;


		// Setup global control tracking
		SWFUpload.instances[this.movieName] = this;

		// Load the settings.  Load the Flash movie.
		this.initSettings();
		this.loadFlash();
		this.displayDebugInfo();
	} catch (ex) {
		delete SWFUpload.instances[this.movieName];
		throw ex;
	}
};

/* *************** */
/* Static Members  */
/* *************** */
SWFUpload.instances = {};
SWFUpload.movieCount = 0;
SWFUpload.version = "2.2.0 2009-03-25";
SWFUpload.QUEUE_ERROR = {
	QUEUE_LIMIT_EXCEEDED	  		: -100,
	FILE_EXCEEDS_SIZE_LIMIT  		: -110,
	ZERO_BYTE_FILE			  		: -120,
	INVALID_FILETYPE		  		: -130
};
SWFUpload.UPLOAD_ERROR = {
	HTTP_ERROR				  		: -200,
	MISSING_UPLOAD_URL	      		: -210,
	IO_ERROR				  		: -220,
	SECURITY_ERROR			  		: -230,
	UPLOAD_LIMIT_EXCEEDED	  		: -240,
	UPLOAD_FAILED			  		: -250,
	SPECIFIED_FILE_ID_NOT_FOUND		: -260,
	FILE_VALIDATION_FAILED	  		: -270,
	FILE_CANCELLED			  		: -280,
	UPLOAD_STOPPED					: -290
};
SWFUpload.FILE_STATUS = {
	QUEUED		 : -1,
	IN_PROGRESS	 : -2,
	ERROR		 : -3,
	COMPLETE	 : -4,
	CANCELLED	 : -5
};
SWFUpload.BUTTON_ACTION = {
	SELECT_FILE  : -100,
	SELECT_FILES : -110,
	START_UPLOAD : -120
};
SWFUpload.CURSOR = {
	ARROW : -1,
	HAND : -2
};
SWFUpload.WINDOW_MODE = {
	WINDOW : "window",
	TRANSPARENT : "transparent",
	OPAQUE : "opaque"
};

// Private: takes a URL, determines if it is relative and converts to an absolute URL
// using the current site. Only processes the URL if it can, otherwise returns the URL untouched
SWFUpload.completeURL = function(url) {
	if (typeof(url) !== "string" || url.match(/^https?:\/\//i) || url.match(/^\//)) {
		return url;
	}

	var currentURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");

	var indexSlash = window.location.pathname.lastIndexOf("/");
	if (indexSlash <= 0) {
		path = "/";
	} else {
		path = window.location.pathname.substr(0, indexSlash) + "/";
	}

	return /*currentURL +*/ path + url;

};


/* ******************** */
/* Instance Members  */
/* ******************** */

// Private: initSettings ensures that all the
// settings are set, getting a default value if one was not assigned.
SWFUpload.prototype.initSettings = function () {
	this.ensureDefault = function (settingName, defaultValue) {
		this.settings[settingName] = (this.settings[settingName] == undefined) ? defaultValue : this.settings[settingName];
	};

	// Upload backend settings
	this.ensureDefault("upload_url", "");
	this.ensureDefault("preserve_relative_urls", false);
	this.ensureDefault("file_post_name", "Filedata");
	this.ensureDefault("post_params", {});
	this.ensureDefault("use_query_string", false);
	this.ensureDefault("requeue_on_error", false);
	this.ensureDefault("http_success", []);
	this.ensureDefault("assume_success_timeout", 0);

	// File Settings
	this.ensureDefault("file_types", "*.*");
	this.ensureDefault("file_types_description", "All Files");
	this.ensureDefault("file_size_limit", 0);	// Default zero means "unlimited"
	this.ensureDefault("file_upload_limit", 0);
	this.ensureDefault("file_queue_limit", 0);

	// Flash Settings
	this.ensureDefault("flash_url", "swfupload.swf");
	this.ensureDefault("prevent_swf_caching", true);

	// Button Settings
	this.ensureDefault("button_image_url", "");
	this.ensureDefault("button_width", 1);
	this.ensureDefault("button_height", 1);
	this.ensureDefault("button_text", "");
	this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
	this.ensureDefault("button_text_top_padding", 0);
	this.ensureDefault("button_text_left_padding", 0);
	this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
	this.ensureDefault("button_disabled", false);
	this.ensureDefault("button_placeholder_id", "");
	this.ensureDefault("button_placeholder", null);
	this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
	this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW);

	// Debug Settings
	this.ensureDefault("debug", false);
	this.settings.debug_enabled = this.settings.debug;	// Here to maintain v2 API

	// Event Handlers
	this.settings.return_upload_start_handler = this.returnUploadStart;
	this.ensureDefault("swfupload_loaded_handler", null);
	this.ensureDefault("file_dialog_start_handler", null);
	this.ensureDefault("file_queued_handler", null);
	this.ensureDefault("file_queue_error_handler", null);
	this.ensureDefault("file_dialog_complete_handler", null);

	this.ensureDefault("upload_start_handler", null);
	this.ensureDefault("upload_progress_handler", null);
	this.ensureDefault("upload_error_handler", null);
	this.ensureDefault("upload_success_handler", null);
	this.ensureDefault("upload_complete_handler", null);

	this.ensureDefault("debug_handler", this.debugMessage);

	this.ensureDefault("custom_settings", {});

	// Other settings
	this.customSettings = this.settings.custom_settings;

	// Update the flash url if needed
	if (!!this.settings.prevent_swf_caching) {
		this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + new Date().getTime();
	}

	if (!this.settings.preserve_relative_urls) {
		//this.settings.flash_url = SWFUpload.completeURL(this.settings.flash_url);	// Don't need to do this one since flash doesn't look at it
		this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url);
		this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url);
	}

	delete this.ensureDefault;
};

// Private: loadFlash replaces the button_placeholder element with the flash movie.
SWFUpload.prototype.loadFlash = function () {
	var targetElement, tempParent;

	// Make sure an element with the ID we are going to use doesn't already exist
	if (document.getElementById(this.movieName) !== null) {
		throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
	}

	// Get the element where we will be placing the flash movie
	targetElement = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;

	if (targetElement == undefined) {
		throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
	}

	// Append the container and load the flash
	tempParent = document.createElement("div");
	tempParent.innerHTML = this.getFlashHTML();	// Using innerHTML is non-standard but the only sensible way to dynamically add Flash in IE (and maybe other browsers)
	targetElement.parentNode.replaceChild(tempParent.firstChild, targetElement);

	// Fix IE Flash/Form bug
	if (window[this.movieName] == undefined) {
		window[this.movieName] = this.getMovieElement();
	}

};

// Private: getFlashHTML generates the object tag needed to embed the flash in to the document
SWFUpload.prototype.getFlashHTML = function () {
	// Flash Satay object syntax: http://www.alistapart.com/articles/flashsatay
	// Fix bug for IE9
	// http://www.kindsoft.net/view.php?bbsid=7&postid=5825&pagenum=1
	var classid = '';
	if (KindEditor.IE && KindEditor.V > 8) {
		classid = ' classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
	}
	return ['<object id="', this.movieName, '"' + classid + ' type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">',
				'<param name="wmode" value="', this.settings.button_window_mode, '" />',
				'<param name="movie" value="', this.settings.flash_url, '" />',
				'<param name="quality" value="high" />',
				'<param name="menu" value="false" />',
				'<param name="allowScriptAccess" value="always" />',
				'<param name="flashvars" value="' + this.getFlashVars() + '" />',
				'</object>'].join("");
};

// Private: getFlashVars builds the parameter string that will be passed
// to flash in the flashvars param.
SWFUpload.prototype.getFlashVars = function () {
	// Build a string from the post param object
	var paramString = this.buildParamString();
	var httpSuccessString = this.settings.http_success.join(",");

	// Build the parameter string
	return ["movieName=", encodeURIComponent(this.movieName),
			"&amp;uploadURL=", encodeURIComponent(this.settings.upload_url),
			"&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string),
			"&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error),
			"&amp;httpSuccess=", encodeURIComponent(httpSuccessString),
			"&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout),
			"&amp;params=", encodeURIComponent(paramString),
			"&amp;filePostName=", encodeURIComponent(this.settings.file_post_name),
			"&amp;fileTypes=", encodeURIComponent(this.settings.file_types),
			"&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description),
			"&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit),
			"&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit),
			"&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit),
			"&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled),
			"&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url),
			"&amp;buttonWidth=", encodeURIComponent(this.settings.button_width),
			"&amp;buttonHeight=", encodeURIComponent(this.settings.button_height),
			"&amp;buttonText=", encodeURIComponent(this.settings.button_text),
			"&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding),
			"&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding),
			"&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style),
			"&amp;buttonAction=", encodeURIComponent(this.settings.button_action),
			"&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled),
			"&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)
		].join("");
};

// Public: getMovieElement retrieves the DOM reference to the Flash element added by SWFUpload
// The element is cached after the first lookup
SWFUpload.prototype.getMovieElement = function () {
	if (this.movieElement == undefined) {
		this.movieElement = document.getElementById(this.movieName);
	}

	if (this.movieElement === null) {
		throw "Could not find Flash element";
	}

	return this.movieElement;
};

// Private: buildParamString takes the name/value pairs in the post_params setting object
// and joins them up in to a string formatted "name=value&amp;name=value"
SWFUpload.prototype.buildParamString = function () {
	var postParams = this.settings.post_params;
	var paramStringPairs = [];

	if (typeof(postParams) === "object") {
		for (var name in postParams) {
			if (postParams.hasOwnProperty(name)) {
				paramStringPairs.push(encodeURIComponent(name.toString()) + "=" + encodeURIComponent(postParams[name].toString()));
			}
		}
	}

	return paramStringPairs.join("&amp;");
};

// Public: Used to remove a SWFUpload instance from the page. This method strives to remove
// all references to the SWF, and other objects so memory is properly freed.
// Returns true if everything was destroyed. Returns a false if a failure occurs leaving SWFUpload in an inconsistant state.
// Credits: Major improvements provided by steffen
SWFUpload.prototype.destroy = function () {
	try {
		// Make sure Flash is done before we try to remove it
		this.cancelUpload(null, false);


		// Remove the SWFUpload DOM nodes
		var movieElement = null;
		movieElement = this.getMovieElement();

		if (movieElement && typeof(movieElement.CallFunction) === "unknown") { // We only want to do this in IE
			// Loop through all the movie's properties and remove all function references (DOM/JS IE 6/7 memory leak workaround)
			for (var i in movieElement) {
				try {
					if (typeof(movieElement[i]) === "function") {
						movieElement[i] = null;
					}
				} catch (ex1) {}
			}

			// Remove the Movie Element from the page
			try {
				movieElement.parentNode.removeChild(movieElement);
			} catch (ex) {}
		}

		// Remove IE form fix reference
		window[this.movieName] = null;

		// Destroy other references
		SWFUpload.instances[this.movieName] = null;
		delete SWFUpload.instances[this.movieName];

		this.movieElement = null;
		this.settings = null;
		this.customSettings = null;
		this.eventQueue = null;
		this.movieName = null;


		return true;
	} catch (ex2) {
		return false;
	}
};


// Public: displayDebugInfo prints out settings and configuration
// information about this SWFUpload instance.
// This function (and any references to it) can be deleted when placing
// SWFUpload in production.
SWFUpload.prototype.displayDebugInfo = function () {
	this.debug(
		[
			"---SWFUpload Instance Info---\n",
			"Version: ", SWFUpload.version, "\n",
			"Movie Name: ", this.movieName, "\n",
			"Settings:\n",
			"\t", "upload_url:               ", this.settings.upload_url, "\n",
			"\t", "flash_url:                ", this.settings.flash_url, "\n",
			"\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n",
			"\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n",
			"\t", "http_success:             ", this.settings.http_success.join(", "), "\n",
			"\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n",
			"\t", "file_post_name:           ", this.settings.file_post_name, "\n",
			"\t", "post_params:              ", this.settings.post_params.toString(), "\n",
			"\t", "file_types:               ", this.settings.file_types, "\n",
			"\t", "file_types_description:   ", this.settings.file_types_description, "\n",
			"\t", "file_size_limit:          ", this.settings.file_size_limit, "\n",
			"\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n",
			"\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n",
			"\t", "debug:                    ", this.settings.debug.toString(), "\n",

			"\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n",

			"\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n",
			"\t", "button_placeholder:       ", (this.settings.button_placeholder ? "Set" : "Not Set"), "\n",
			"\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n",
			"\t", "button_width:             ", this.settings.button_width.toString(), "\n",
			"\t", "button_height:            ", this.settings.button_height.toString(), "\n",
			"\t", "button_text:              ", this.settings.button_text.toString(), "\n",
			"\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n",
			"\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n",
			"\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n",
			"\t", "button_action:            ", this.settings.button_action.toString(), "\n",
			"\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n",

			"\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n",
			"Event Handlers:\n",
			"\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n",
			"\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n",
			"\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n",
			"\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n",
			"\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n",
			"\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n",
			"\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n",
			"\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n",
			"\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n",
			"\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n"
		].join("")
	);
};

/* Note: addSetting and getSetting are no longer used by SWFUpload but are included
	the maintain v2 API compatibility
*/
// Public: (Deprecated) addSetting adds a setting value. If the value given is undefined or null then the default_value is used.
SWFUpload.prototype.addSetting = function (name, value, default_value) {
    if (value == undefined) {
        return (this.settings[name] = default_value);
    } else {
        return (this.settings[name] = value);
	}
};

// Public: (Deprecated) getSetting gets a setting. Returns an empty string if the setting was not found.
SWFUpload.prototype.getSetting = function (name) {
    if (this.settings[name] != undefined) {
        return this.settings[name];
	}

    return "";
};



// Private: callFlash handles function calls made to the Flash element.
// Calls are made with a setTimeout for some functions to work around
// bugs in the ExternalInterface library.
SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
	argumentArray = argumentArray || [];

	var movieElement = this.getMovieElement();
	var returnValue, returnString;

	// Flash's method if calling ExternalInterface methods (code adapted from MooTools).
	try {
		returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + '</invoke>');
		returnValue = eval(returnString);
	} catch (ex) {
		throw "Call to " + functionName + " failed";
	}

	// Unescape file post param values
	if (returnValue != undefined && typeof returnValue.post === "object") {
		returnValue = this.unescapeFilePostParams(returnValue);
	}

	return returnValue;
};

/* *****************************
	-- Flash control methods --
	Your UI should use these
	to operate SWFUpload
   ***************************** */

// WARNING: this function does not work in Flash Player 10
// Public: selectFile causes a File Selection Dialog window to appear.  This
// dialog only allows 1 file to be selected.
SWFUpload.prototype.selectFile = function () {
	this.callFlash("SelectFile");
};

// WARNING: this function does not work in Flash Player 10
// Public: selectFiles causes a File Selection Dialog window to appear/ This
// dialog allows the user to select any number of files
// Flash Bug Warning: Flash limits the number of selectable files based on the combined length of the file names.
// If the selection name length is too long the dialog will fail in an unpredictable manner.  There is no work-around
// for this bug.
SWFUpload.prototype.selectFiles = function () {
	this.callFlash("SelectFiles");
};


// Public: startUpload starts uploading the first file in the queue unless
// the optional parameter 'fileID' specifies the ID
SWFUpload.prototype.startUpload = function (fileID) {
	this.callFlash("StartUpload", [fileID]);
};

// Public: cancelUpload cancels any queued file.  The fileID parameter may be the file ID or index.
// If you do not specify a fileID the current uploading file or first file in the queue is cancelled.
// If you do not want the uploadError event to trigger you can specify false for the triggerErrorEvent parameter.
SWFUpload.prototype.cancelUpload = function (fileID, triggerErrorEvent) {
	if (triggerErrorEvent !== false) {
		triggerErrorEvent = true;
	}
	this.callFlash("CancelUpload", [fileID, triggerErrorEvent]);
};

// Public: stopUpload stops the current upload and requeues the file at the beginning of the queue.
// If nothing is currently uploading then nothing happens.
SWFUpload.prototype.stopUpload = function () {
	this.callFlash("StopUpload");
};

/* ************************
 * Settings methods
 *   These methods change the SWFUpload settings.
 *   SWFUpload settings should not be changed directly on the settings object
 *   since many of the settings need to be passed to Flash in order to take
 *   effect.
 * *********************** */

// Public: getStats gets the file statistics object.
SWFUpload.prototype.getStats = function () {
	return this.callFlash("GetStats");
};

// Public: setStats changes the SWFUpload statistics.  You shouldn't need to
// change the statistics but you can.  Changing the statistics does not
// affect SWFUpload accept for the successful_uploads count which is used
// by the upload_limit setting to determine how many files the user may upload.
SWFUpload.prototype.setStats = function (statsObject) {
	this.callFlash("SetStats", [statsObject]);
};

// Public: getFile retrieves a File object by ID or Index.  If the file is
// not found then 'null' is returned.
SWFUpload.prototype.getFile = function (fileID) {
	if (typeof(fileID) === "number") {
		return this.callFlash("GetFileByIndex", [fileID]);
	} else {
		return this.callFlash("GetFile", [fileID]);
	}
};

// Public: addFileParam sets a name/value pair that will be posted with the
// file specified by the Files ID.  If the name already exists then the
// exiting value will be overwritten.
SWFUpload.prototype.addFileParam = function (fileID, name, value) {
	return this.callFlash("AddFileParam", [fileID, name, value]);
};

// Public: removeFileParam removes a previously set (by addFileParam) name/value
// pair from the specified file.
SWFUpload.prototype.removeFileParam = function (fileID, name) {
	this.callFlash("RemoveFileParam", [fileID, name]);
};

// Public: setUploadUrl changes the upload_url setting.
SWFUpload.prototype.setUploadURL = function (url) {
	this.settings.upload_url = url.toString();
	this.callFlash("SetUploadURL", [url]);
};

// Public: setPostParams changes the post_params setting
SWFUpload.prototype.setPostParams = function (paramsObject) {
	this.settings.post_params = paramsObject;
	this.callFlash("SetPostParams", [paramsObject]);
};

// Public: addPostParam adds post name/value pair.  Each name can have only one value.
SWFUpload.prototype.addPostParam = function (name, value) {
	this.settings.post_params[name] = value;
	this.callFlash("SetPostParams", [this.settings.post_params]);
};

// Public: removePostParam deletes post name/value pair.
SWFUpload.prototype.removePostParam = function (name) {
	delete this.settings.post_params[name];
	this.callFlash("SetPostParams", [this.settings.post_params]);
};

// Public: setFileTypes changes the file_types setting and the file_types_description setting
SWFUpload.prototype.setFileTypes = function (types, description) {
	this.settings.file_types = types;
	this.settings.file_types_description = description;
	this.callFlash("SetFileTypes", [types, description]);
};

// Public: setFileSizeLimit changes the file_size_limit setting
SWFUpload.prototype.setFileSizeLimit = function (fileSizeLimit) {
	this.settings.file_size_limit = fileSizeLimit;
	this.callFlash("SetFileSizeLimit", [fileSizeLimit]);
};

// Public: setFileUploadLimit changes the file_upload_limit setting
SWFUpload.prototype.setFileUploadLimit = function (fileUploadLimit) {
	this.settings.file_upload_limit = fileUploadLimit;
	this.callFlash("SetFileUploadLimit", [fileUploadLimit]);
};

// Public: setFileQueueLimit changes the file_queue_limit setting
SWFUpload.prototype.setFileQueueLimit = function (fileQueueLimit) {
	this.settings.file_queue_limit = fileQueueLimit;
	this.callFlash("SetFileQueueLimit", [fileQueueLimit]);
};

// Public: setFilePostName changes the file_post_name setting
SWFUpload.prototype.setFilePostName = function (filePostName) {
	this.settings.file_post_name = filePostName;
	this.callFlash("SetFilePostName", [filePostName]);
};

// Public: setUseQueryString changes the use_query_string setting
SWFUpload.prototype.setUseQueryString = function (useQueryString) {
	this.settings.use_query_string = useQueryString;
	this.callFlash("SetUseQueryString", [useQueryString]);
};

// Public: setRequeueOnError changes the requeue_on_error setting
SWFUpload.prototype.setRequeueOnError = function (requeueOnError) {
	this.settings.requeue_on_error = requeueOnError;
	this.callFlash("SetRequeueOnError", [requeueOnError]);
};

// Public: setHTTPSuccess changes the http_success setting
SWFUpload.prototype.setHTTPSuccess = function (http_status_codes) {
	if (typeof http_status_codes === "string") {
		http_status_codes = http_status_codes.replace(" ", "").split(",");
	}

	this.settings.http_success = http_status_codes;
	this.callFlash("SetHTTPSuccess", [http_status_codes]);
};

// Public: setHTTPSuccess changes the http_success setting
SWFUpload.prototype.setAssumeSuccessTimeout = function (timeout_seconds) {
	this.settings.assume_success_timeout = timeout_seconds;
	this.callFlash("SetAssumeSuccessTimeout", [timeout_seconds]);
};

// Public: setDebugEnabled changes the debug_enabled setting
SWFUpload.prototype.setDebugEnabled = function (debugEnabled) {
	this.settings.debug_enabled = debugEnabled;
	this.callFlash("SetDebugEnabled", [debugEnabled]);
};

// Public: setButtonImageURL loads a button image sprite
SWFUpload.prototype.setButtonImageURL = function (buttonImageURL) {
	if (buttonImageURL == undefined) {
		buttonImageURL = "";
	}

	this.settings.button_image_url = buttonImageURL;
	this.callFlash("SetButtonImageURL", [buttonImageURL]);
};

// Public: setButtonDimensions resizes the Flash Movie and button
SWFUpload.prototype.setButtonDimensions = function (width, height) {
	this.settings.button_width = width;
	this.settings.button_height = height;

	var movie = this.getMovieElement();
	if (movie != undefined) {
		movie.style.width = width + "px";
		movie.style.height = height + "px";
	}

	this.callFlash("SetButtonDimensions", [width, height]);
};
// Public: setButtonText Changes the text overlaid on the button
SWFUpload.prototype.setButtonText = function (html) {
	this.settings.button_text = html;
	this.callFlash("SetButtonText", [html]);
};
// Public: setButtonTextPadding changes the top and left padding of the text overlay
SWFUpload.prototype.setButtonTextPadding = function (left, top) {
	this.settings.button_text_top_padding = top;
	this.settings.button_text_left_padding = left;
	this.callFlash("SetButtonTextPadding", [left, top]);
};

// Public: setButtonTextStyle changes the CSS used to style the HTML/Text overlaid on the button
SWFUpload.prototype.setButtonTextStyle = function (css) {
	this.settings.button_text_style = css;
	this.callFlash("SetButtonTextStyle", [css]);
};
// Public: setButtonDisabled disables/enables the button
SWFUpload.prototype.setButtonDisabled = function (isDisabled) {
	this.settings.button_disabled = isDisabled;
	this.callFlash("SetButtonDisabled", [isDisabled]);
};
// Public: setButtonAction sets the action that occurs when the button is clicked
SWFUpload.prototype.setButtonAction = function (buttonAction) {
	this.settings.button_action = buttonAction;
	this.callFlash("SetButtonAction", [buttonAction]);
};

// Public: setButtonCursor changes the mouse cursor displayed when hovering over the button
SWFUpload.prototype.setButtonCursor = function (cursor) {
	this.settings.button_cursor = cursor;
	this.callFlash("SetButtonCursor", [cursor]);
};

/* *******************************
	Flash Event Interfaces
	These functions are used by Flash to trigger the various
	events.

	All these functions a Private.

	Because the ExternalInterface library is buggy the event calls
	are added to a queue and the queue then executed by a setTimeout.
	This ensures that events are executed in a determinate order and that
	the ExternalInterface bugs are avoided.
******************************* */

SWFUpload.prototype.queueEvent = function (handlerName, argumentArray) {
	// Warning: Don't call this.debug inside here or you'll create an infinite loop

	if (argumentArray == undefined) {
		argumentArray = [];
	} else if (!(argumentArray instanceof Array)) {
		argumentArray = [argumentArray];
	}

	var self = this;
	if (typeof this.settings[handlerName] === "function") {
		// Queue the event
		this.eventQueue.push(function () {
			this.settings[handlerName].apply(this, argumentArray);
		});

		// Execute the next queued event
		setTimeout(function () {
			self.executeNextEvent();
		}, 0);

	} else if (this.settings[handlerName] !== null) {
		throw "Event handler " + handlerName + " is unknown or is not a function";
	}
};

// Private: Causes the next event in the queue to be executed.  Since events are queued using a setTimeout
// we must queue them in order to garentee that they are executed in order.
SWFUpload.prototype.executeNextEvent = function () {
	// Warning: Don't call this.debug inside here or you'll create an infinite loop

	var  f = this.eventQueue ? this.eventQueue.shift() : null;
	if (typeof(f) === "function") {
		f.apply(this);
	}
};

// Private: unescapeFileParams is part of a workaround for a flash bug where objects passed through ExternalInterface cannot have
// properties that contain characters that are not valid for JavaScript identifiers. To work around this
// the Flash Component escapes the parameter names and we must unescape again before passing them along.
SWFUpload.prototype.unescapeFilePostParams = function (file) {
	var reg = /[$]([0-9a-f]{4})/i;
	var unescapedPost = {};
	var uk;

	if (file != undefined) {
		for (var k in file.post) {
			if (file.post.hasOwnProperty(k)) {
				uk = k;
				var match;
				while ((match = reg.exec(uk)) !== null) {
					uk = uk.replace(match[0], String.fromCharCode(parseInt("0x" + match[1], 16)));
				}
				unescapedPost[uk] = file.post[k];
			}
		}

		file.post = unescapedPost;
	}

	return file;
};

// Private: Called by Flash to see if JS can call in to Flash (test if External Interface is working)
SWFUpload.prototype.testExternalInterface = function () {
	try {
		return this.callFlash("TestExternalInterface");
	} catch (ex) {
		return false;
	}
};

// Private: This event is called by Flash when it has finished loading. Don't modify this.
// Use the swfupload_loaded_handler event setting to execute custom code when SWFUpload has loaded.
SWFUpload.prototype.flashReady = function () {
	// Check that the movie element is loaded correctly with its ExternalInterface methods defined
	var movieElement = this.getMovieElement();

	if (!movieElement) {
		this.debug("Flash called back ready but the flash movie can't be found.");
		return;
	}

	this.cleanUp(movieElement);

	this.queueEvent("swfupload_loaded_handler");
};

// Private: removes Flash added fuctions to the DOM node to prevent memory leaks in IE.
// This function is called by Flash each time the ExternalInterface functions are created.
SWFUpload.prototype.cleanUp = function (movieElement) {
	// Pro-actively unhook all the Flash functions
	try {
		if (this.movieElement && typeof(movieElement.CallFunction) === "unknown") { // We only want to do this in IE
			this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
			for (var key in movieElement) {
				try {
					if (typeof(movieElement[key]) === "function") {
						movieElement[key] = null;
					}
				} catch (ex) {
				}
			}
		}
	} catch (ex1) {

	}

	// Fix Flashes own cleanup code so if the SWFMovie was removed from the page
	// it doesn't display errors.
	window["__flash__removeCallback"] = function (instance, name) {
		try {
			if (instance) {
				instance[name] = null;
			}
		} catch (flashEx) {

		}
	};

};


/* This is a chance to do something before the browse window opens */
SWFUpload.prototype.fileDialogStart = function () {
	this.queueEvent("file_dialog_start_handler");
};


/* Called when a file is successfully added to the queue. */
SWFUpload.prototype.fileQueued = function (file) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("file_queued_handler", file);
};


/* Handle errors that occur when an attempt to queue a file fails. */
SWFUpload.prototype.fileQueueError = function (file, errorCode, message) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("file_queue_error_handler", [file, errorCode, message]);
};

/* Called after the file dialog has closed and the selected files have been queued.
	You could call startUpload here if you want the queued files to begin uploading immediately. */
SWFUpload.prototype.fileDialogComplete = function (numFilesSelected, numFilesQueued, numFilesInQueue) {
	this.queueEvent("file_dialog_complete_handler", [numFilesSelected, numFilesQueued, numFilesInQueue]);
};

SWFUpload.prototype.uploadStart = function (file) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("return_upload_start_handler", file);
};

SWFUpload.prototype.returnUploadStart = function (file) {
	var returnValue;
	if (typeof this.settings.upload_start_handler === "function") {
		file = this.unescapeFilePostParams(file);
		returnValue = this.settings.upload_start_handler.call(this, file);
	} else if (this.settings.upload_start_handler != undefined) {
		throw "upload_start_handler must be a function";
	}

	// Convert undefined to true so if nothing is returned from the upload_start_handler it is
	// interpretted as 'true'.
	if (returnValue === undefined) {
		returnValue = true;
	}

	returnValue = !!returnValue;

	this.callFlash("ReturnUploadStart", [returnValue]);
};



SWFUpload.prototype.uploadProgress = function (file, bytesComplete, bytesTotal) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("upload_progress_handler", [file, bytesComplete, bytesTotal]);
};

SWFUpload.prototype.uploadError = function (file, errorCode, message) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("upload_error_handler", [file, errorCode, message]);
};

SWFUpload.prototype.uploadSuccess = function (file, serverData, responseReceived) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("upload_success_handler", [file, serverData, responseReceived]);
};

SWFUpload.prototype.uploadComplete = function (file) {
	file = this.unescapeFilePostParams(file);
	this.queueEvent("upload_complete_handler", file);
};

/* Called by SWFUpload JavaScript and Flash functions when debug is enabled. By default it writes messages to the
   internal debug console.  You can override this event and have messages written where you want. */
SWFUpload.prototype.debug = function (message) {
	this.queueEvent("debug_handler", message);
};


/* **********************************
	Debug Console
	The debug console is a self contained, in page location
	for debug message to be sent.  The Debug Console adds
	itself to the body if necessary.

	The console is automatically scrolled as messages appear.

	If you are using your own debug handler or when you deploy to production and
	have debug disabled you can remove these functions to reduce the file size
	and complexity.
********************************** */

// Private: debugMessage is the default debug_handler.  If you want to print debug messages
// call the debug() function.  When overriding the function your own function should
// check to see if the debug setting is true before outputting debug information.
SWFUpload.prototype.debugMessage = function (message) {
	if (this.settings.debug) {
		var exceptionMessage, exceptionValues = [];

		// Check for an exception object and print it nicely
		if (typeof message === "object" && typeof message.name === "string" && typeof message.message === "string") {
			for (var key in message) {
				if (message.hasOwnProperty(key)) {
					exceptionValues.push(key + ": " + message[key]);
				}
			}
			exceptionMessage = exceptionValues.join("\n") || "";
			exceptionValues = exceptionMessage.split("\n");
			exceptionMessage = "EXCEPTION: " + exceptionValues.join("\nEXCEPTION: ");
			SWFUpload.Console.writeLine(exceptionMessage);
		} else {
			SWFUpload.Console.writeLine(message);
		}
	}
};

SWFUpload.Console = {};
SWFUpload.Console.writeLine = function (message) {
	var console, documentForm;

	try {
		console = document.getElementById("SWFUpload_Console");

		if (!console) {
			documentForm = document.createElement("form");
			document.getElementsByTagName("body")[0].appendChild(documentForm);

			console = document.createElement("textarea");
			console.id = "SWFUpload_Console";
			console.style.fontFamily = "monospace";
			console.setAttribute("wrap", "off");
			console.wrap = "off";
			console.style.overflow = "auto";
			console.style.width = "700px";
			console.style.height = "350px";
			console.style.margin = "5px";
			documentForm.appendChild(console);
		}

		console.value += message + "\n";

		console.scrollTop = console.scrollHeight - console.clientHeight;
	} catch (ex) {
		alert("Exception: " + ex.name + " Message: " + ex.message);
	}
};

})();

(function() {
/*
	Queue Plug-in

	Features:
		*Adds a cancelQueue() method for cancelling the entire queue.
		*All queued files are uploaded when startUpload() is called.
		*If false is returned from uploadComplete then the queue upload is stopped.
		 If false is not returned (strict comparison) then the queue upload is continued.
		*Adds a QueueComplete event that is fired when all the queued files have finished uploading.
		 Set the event handler with the queue_complete_handler setting.

	*/

if (typeof(SWFUpload) === "function") {
	SWFUpload.queue = {};

	SWFUpload.prototype.initSettings = (function (oldInitSettings) {
		return function () {
			if (typeof(oldInitSettings) === "function") {
				oldInitSettings.call(this);
			}

			this.queueSettings = {};

			this.queueSettings.queue_cancelled_flag = false;
			this.queueSettings.queue_upload_count = 0;

			this.queueSettings.user_upload_complete_handler = this.settings.upload_complete_handler;
			this.queueSettings.user_upload_start_handler = this.settings.upload_start_handler;
			this.settings.upload_complete_handler = SWFUpload.queue.uploadCompleteHandler;
			this.settings.upload_start_handler = SWFUpload.queue.uploadStartHandler;

			this.settings.queue_complete_handler = this.settings.queue_complete_handler || null;
		};
	})(SWFUpload.prototype.initSettings);

	SWFUpload.prototype.startUpload = function (fileID) {
		this.queueSettings.queue_cancelled_flag = false;
		this.callFlash("StartUpload", [fileID]);
	};

	SWFUpload.prototype.cancelQueue = function () {
		this.queueSettings.queue_cancelled_flag = true;
		this.stopUpload();

		var stats = this.getStats();
		while (stats.files_queued > 0) {
			this.cancelUpload();
			stats = this.getStats();
		}
	};

	SWFUpload.queue.uploadStartHandler = function (file) {
		var returnValue;
		if (typeof(this.queueSettings.user_upload_start_handler) === "function") {
			returnValue = this.queueSettings.user_upload_start_handler.call(this, file);
		}

		// To prevent upload a real "FALSE" value must be returned, otherwise default to a real "TRUE" value.
		returnValue = (returnValue === false) ? false : true;

		this.queueSettings.queue_cancelled_flag = !returnValue;

		return returnValue;
	};

	SWFUpload.queue.uploadCompleteHandler = function (file) {
		var user_upload_complete_handler = this.queueSettings.user_upload_complete_handler;
		var continueUpload;

		if (file.filestatus === SWFUpload.FILE_STATUS.COMPLETE) {
			this.queueSettings.queue_upload_count++;
		}

		if (typeof(user_upload_complete_handler) === "function") {
			continueUpload = (user_upload_complete_handler.call(this, file) === false) ? false : true;
		} else if (file.filestatus === SWFUpload.FILE_STATUS.QUEUED) {
			// If the file was stopped and re-queued don't restart the upload
			continueUpload = false;
		} else {
			continueUpload = true;
		}

		if (continueUpload) {
			var stats = this.getStats();
			if (stats.files_queued > 0 && this.queueSettings.queue_cancelled_flag === false) {
				this.startUpload();
			} else if (this.queueSettings.queue_cancelled_flag === false) {
				this.queueEvent("queue_complete_handler", [this.queueSettings.queue_upload_count]);
				this.queueSettings.queue_upload_count = 0;
			} else {
				this.queueSettings.queue_cancelled_flag = false;
				this.queueSettings.queue_upload_count = 0;
			}
		}
	};
}

})();
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('pagebreak', function(K) {
	var self = this;
	var name = 'pagebreak';
	var pagebreakHtml = K.undef(self.pagebreakHtml, '<hr style="page-break-after: always;" class="ke-pagebreak" />');

	self.clickToolbar(name, function() {
		var cmd = self.cmd, range = cmd.range;
		self.focus();
		var tail = self.newlineTag == 'br' || K.WEBKIT ? '' : '<span id="__kindeditor_tail_tag__"></span>';
		self.insertHtml(pagebreakHtml + tail);
		if (tail !== '') {
			var p = K('#__kindeditor_tail_tag__', self.edit.doc);
			range.selectNodeContents(p[0]);
			p.removeAttr('id');
			cmd.select();
		}
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('plainpaste', function(K) {
	var self = this, name = 'plainpaste';
	self.clickToolbar(name, function() {
		var lang = self.lang(name + '.'),
			html = '<div style="padding:10px 20px;">' +
				'<div style="margin-bottom:10px;">' + lang.comment + '</div>' +
				'<textarea class="ke-textarea" style="width:408px;height:260px;"></textarea>' +
				'</div>',
			dialog = self.createDialog({
				name : name,
				width : 450,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var html = textarea.val();
						html = K.escape(html);
						html = html.replace(/ {2}/g, ' &nbsp;');
						if (self.newlineTag == 'p') {
							html = html.replace(/^/, '<p>').replace(/$/, '</p>').replace(/\n/g, '</p><p>');
						} else {
							html = html.replace(/\n/g, '<br />$&');
						}
						self.insertHtml(html).hideDialog().focus();
					}
				}
			}),
			textarea = K('textarea', dialog.div);
		textarea[0].focus();
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('preview', function(K) {
	var self = this, name = 'preview', undefined;
	self.clickToolbar(name, function() {
		var lang = self.lang(name + '.'),
			html = '<div style="padding:10px 20px;">' +
				'<iframe class="ke-textarea" frameborder="0" style="width:708px;height:400px;"></iframe>' +
				'</div>',
			dialog = self.createDialog({
				name : name,
				width : 750,
				title : self.lang(name),
				body : html
			}),
			iframe = K('iframe', dialog.div),
			doc = K.iframeDoc(iframe);
		doc.open();
		doc.write(self.fullHtml());
		doc.close();
		K(doc.body).css('background-color', '#FFF');
		iframe[0].contentWindow.focus();
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('quickformat', function(K) {
	var self = this, name = 'quickformat',
		blockMap = K.toMap('blockquote,center,div,h1,h2,h3,h4,h5,h6,p');
	function getFirstChild(knode) {
		var child = knode.first();
		while (child && child.first()) {
			child = child.first();
		}
		return child;
	}
	self.clickToolbar(name, function() {
		self.focus();
		var doc = self.edit.doc,
			range = self.cmd.range,
			child = K(doc.body).first(), next,
			nodeList = [], subList = [],
			bookmark = range.createBookmark(true);
		while(child) {
			next = child.next();
			var firstChild = getFirstChild(child);
			if (!firstChild || firstChild.name != 'img') {
				if (blockMap[child.name]) {
					child.html(child.html().replace(/^(\s|&nbsp;|ã€€)+/ig, ''));
					child.css('text-indent', '2em');
				} else {
					subList.push(child);
				}
				if (!next || (blockMap[next.name] || blockMap[child.name] && !blockMap[next.name])) {
					if (subList.length > 0) {
						nodeList.push(subList);
					}
					subList = [];
				}
			}
			child = next;
		}
		K.each(nodeList, function(i, subList) {
			var wrapper = K('<p style="text-indent:2em;"></p>', doc);
			subList[0].before(wrapper);
			K.each(subList, function(i, knode) {
				wrapper.append(knode);
			});
		});
		range.moveToBookmark(bookmark);
		self.addBookmark();
	});
});

/**
--------------------------
abcd<br />
1234<br />

to

<p style="text-indent:2em;">
	abcd<br />
	1234<br />
</p>

--------------------------

&nbsp; abcd<img>1233
<p>1234</p>

to

<p style="text-indent:2em;">abcd<img>1233</p>
<p style="text-indent:2em;">1234</p>

--------------------------
*//*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('table', function(K) {
	var self = this, name = 'table', lang = self.lang(name + '.'), zeroborder = 'ke-zeroborder';
	// è®¾ç½®é¢œè‰²
	function _setColor(box, color) {
		color = color.toUpperCase();
		box.css('background-color', color);
		box.css('color', color === '#000000' ? '#FFFFFF' : '#000000');
		box.html(color);
	}
	// åˆå§‹åŒ–å–è‰²å™¨
	var pickerList = [];
	function _initColorPicker(dialogDiv, colorBox) {
		colorBox.bind('click,mousedown', function(e){
			e.stopPropagation();
		});
		function removePicker() {
			K.each(pickerList, function() {
				this.remove();
			});
			pickerList = [];
			K(document).unbind('click,mousedown', removePicker);
			dialogDiv.unbind('click,mousedown', removePicker);
		}
		colorBox.click(function(e) {
			removePicker();
			var box = K(this),
				pos = box.pos();
			var picker = K.colorpicker({
				x : pos.x,
				y : pos.y + box.height(),
				z : 811214,
				selectedColor : K(this).html(),
				colors : self.colorTable,
				noColor : self.lang('noColor'),
				shadowMode : self.shadowMode,
				click : function(color) {
					_setColor(box, color);
					removePicker();
				}
			});
			pickerList.push(picker);
			K(document).bind('click,mousedown', removePicker);
			dialogDiv.bind('click,mousedown', removePicker);
		});
	}
	// å–å¾—ä¸‹ä¸€è¡Œcellçš„index
	function _getCellIndex(table, row, cell) {
		var rowSpanCount = 0;
		for (var i = 0, len = row.cells.length; i < len; i++) {
			if (row.cells[i] == cell) {
				break;
			}
			rowSpanCount += row.cells[i].rowSpan - 1;
		}
		return cell.cellIndex - rowSpanCount;
	}
	self.plugin.table = {
		//insert or modify table
		prop : function(isInsert) {
			var html = [
				'<div style="padding:20px;">',
				//rows, cols
				'<div class="ke-dialog-row">',
				'<label for="keRows" style="width:90px;">' + lang.cells + '</label>',
				lang.rows + ' <input type="text" id="keRows" class="ke-input-text ke-input-number" name="rows" value="" maxlength="4" /> &nbsp; ',
				lang.cols + ' <input type="text" class="ke-input-text ke-input-number" name="cols" value="" maxlength="4" />',
				'</div>',
				//width, height
				'<div class="ke-dialog-row">',
				'<label for="keWidth" style="width:90px;">' + lang.size + '</label>',
				lang.width + ' <input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> &nbsp; ',
				'<select name="widthType">',
				'<option value="%">' + lang.percent + '</option>',
				'<option value="px">' + lang.px + '</option>',
				'</select> &nbsp; ',
				lang.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> &nbsp; ',
				'<select name="heightType">',
				'<option value="%">' + lang.percent + '</option>',
				'<option value="px">' + lang.px + '</option>',
				'</select>',
				'</div>',
				//space, padding
				'<div class="ke-dialog-row">',
				'<label for="kePadding" style="width:90px;">' + lang.space + '</label>',
				lang.padding + ' <input type="text" id="kePadding" class="ke-input-text ke-input-number" name="padding" value="" maxlength="4" /> &nbsp; ',
				lang.spacing + ' <input type="text" class="ke-input-text ke-input-number" name="spacing" value="" maxlength="4" />',
				'</div>',
				//align
				'<div class="ke-dialog-row">',
				'<label for="keAlign" style="width:90px;">' + lang.align + '</label>',
				'<select id="keAlign" name="align">',
				'<option value="">' + lang.alignDefault + '</option>',
				'<option value="left">' + lang.alignLeft + '</option>',
				'<option value="center">' + lang.alignCenter + '</option>',
				'<option value="right">' + lang.alignRight + '</option>',
				'</select>',
				'</div>',
				//border
				'<div class="ke-dialog-row">',
				'<label for="keBorder" style="width:90px;">' + lang.border + '</label>',
				lang.borderWidth + ' <input type="text" id="keBorder" class="ke-input-text ke-input-number" name="border" value="" maxlength="4" /> &nbsp; ',
				lang.borderColor + ' <span class="ke-inline-block ke-input-color"></span>',
				'</div>',
				//background color
				'<div class="ke-dialog-row">',
				'<label for="keBgColor" style="width:90px;">' + lang.backgroundColor + '</label>',
				'<span class="ke-inline-block ke-input-color"></span>',
				'</div>',
				'</div>'
			].join('');
			var bookmark = self.cmd.range.createBookmark();
			var dialog = self.createDialog({
				name : name,
				width : 500,
				title : self.lang(name),
				body : html,
				beforeRemove : function() {
					colorBox.unbind();
				},
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var rows = rowsBox.val(),
							cols = colsBox.val(),
							width = widthBox.val(),
							height = heightBox.val(),
							widthType = widthTypeBox.val(),
							heightType = heightTypeBox.val(),
							padding = paddingBox.val(),
							spacing = spacingBox.val(),
							align = alignBox.val(),
							border = borderBox.val(),
							borderColor = K(colorBox[0]).html() || '',
							bgColor = K(colorBox[1]).html() || '';
						if (rows == 0 || !/^\d+$/.test(rows)) {
							alert(self.lang('invalidRows'));
							rowsBox[0].focus();
							return;
						}
						if (cols == 0 || !/^\d+$/.test(cols)) {
							alert(self.lang('invalidRows'));
							colsBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(width)) {
							alert(self.lang('invalidWidth'));
							widthBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(height)) {
							alert(self.lang('invalidHeight'));
							heightBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(padding)) {
							alert(self.lang('invalidPadding'));
							paddingBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(spacing)) {
							alert(self.lang('invalidSpacing'));
							spacingBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(border)) {
							alert(self.lang('invalidBorder'));
							borderBox[0].focus();
							return;
						}
						//modify table
						if (table) {
							if (width !== '') {
								table.width(width + widthType);
							} else {
								table.css('width', '');
							}
							if (table[0].width !== undefined) {
								table.removeAttr('width');
							}
							if (height !== '') {
								table.height(height + heightType);
							} else {
								table.css('height', '');
							}
							if (table[0].height !== undefined) {
								table.removeAttr('height');
							}
							table.css('background-color', bgColor);
							if (table[0].bgColor !== undefined) {
								table.removeAttr('bgColor');
							}
							if (padding !== '') {
								table[0].cellPadding = padding;
							} else {
								table.removeAttr('cellPadding');
							}
							if (spacing !== '') {
								table[0].cellSpacing = spacing;
							} else {
								table.removeAttr('cellSpacing');
							}
							if (align !== '') {
								table[0].align = align;
							} else {
								table.removeAttr('align');
							}
							if (border !== '') {
								table.attr('border', border);
							} else {
								table.removeAttr('border');
							}
							if (border === '' || border === '0') {
								table.addClass(zeroborder);
							} else {
								table.removeClass(zeroborder);
							}
							if (borderColor !== '') {
								table.attr('borderColor', borderColor);
							} else {
								table.removeAttr('borderColor');
							}
							self.hideDialog().focus();
							self.cmd.range.moveToBookmark(bookmark);
							self.cmd.select();
							self.addBookmark();
							return;
						}
						//insert new table
						var style = '';
						if (width !== '') {
							style += 'width:' + width + widthType + ';';
						}
						if (height !== '') {
							style += 'height:' + height + heightType + ';';
						}
						if (bgColor !== '') {
							style += 'background-color:' + bgColor + ';';
						}
						var html = '<table';
						if (style !== '') {
							html += ' style="' + style + '"';
						}
						if (padding !== '') {
							html += ' cellpadding="' + padding + '"';
						}
						if (spacing !== '') {
							html += ' cellspacing="' + spacing + '"';
						}
						if (align !== '') {
							html += ' align="' + align + '"';
						}
						if (border !== '') {
							html += ' border="' + border + '"';
						}
						if (border === '' || border === '0') {
							html += ' class="' + zeroborder + '"';
						}
						if (borderColor !== '') {
							html += ' bordercolor="' + borderColor + '"';
						}
						html += '>';
						for (var i = 0; i < rows; i++) {
							html += '<tr>';
							for (var j = 0; j < cols; j++) {
								html += '<td>' + (K.IE ? '&nbsp;' : '<br />') + '</td>';
							}
							html += '</tr>';
						}
						html += '</table>';
						if (!K.IE) {
							html += '<br />';
						}
						self.insertHtml(html);
						self.select().hideDialog().focus();
						self.addBookmark();
					}
				}
			}),
			div = dialog.div,
			rowsBox = K('[name="rows"]', div).val(3),
			colsBox = K('[name="cols"]', div).val(2),
			widthBox = K('[name="width"]', div).val(100),
			heightBox = K('[name="height"]', div),
			widthTypeBox = K('[name="widthType"]', div),
			heightTypeBox = K('[name="heightType"]', div),
			paddingBox = K('[name="padding"]', div).val(2),
			spacingBox = K('[name="spacing"]', div).val(0),
			alignBox = K('[name="align"]', div),
			borderBox = K('[name="border"]', div).val(1),
			colorBox = K('.ke-input-color', div);
			_initColorPicker(div, colorBox.eq(0));
			_initColorPicker(div, colorBox.eq(1));
			_setColor(colorBox.eq(0), '#000000');
			_setColor(colorBox.eq(1), '');
			// foucs and select
			rowsBox[0].focus();
			rowsBox[0].select();
			var table;
			if (isInsert) {
				return;
			}
			//get selected table node
			table = self.plugin.getSelectedTable();
			if (table) {
				rowsBox.val(table[0].rows.length);
				colsBox.val(table[0].rows.length > 0 ? table[0].rows[0].cells.length : 0);
				rowsBox.attr('disabled', true);
				colsBox.attr('disabled', true);
				var match,
					tableWidth = table[0].style.width || table[0].width,
					tableHeight = table[0].style.height || table[0].height;
				if (tableWidth !== undefined && (match = /^(\d+)((?:px|%)*)$/.exec(tableWidth))) {
					widthBox.val(match[1]);
					widthTypeBox.val(match[2]);
				} else {
					widthBox.val('');
				}
				if (tableHeight !== undefined && (match = /^(\d+)((?:px|%)*)$/.exec(tableHeight))) {
					heightBox.val(match[1]);
					heightTypeBox.val(match[2]);
				}
				paddingBox.val(table[0].cellPadding || '');
				spacingBox.val(table[0].cellSpacing || '');
				alignBox.val(table[0].align || '');
				borderBox.val(table[0].border === undefined ? '' : table[0].border);
				_setColor(colorBox.eq(0), K.toHex(table.attr('borderColor') || ''));
				_setColor(colorBox.eq(1), K.toHex(table[0].style.backgroundColor || table[0].bgColor || ''));
				widthBox[0].focus();
				widthBox[0].select();
			}
		},
		//modify cell
		cellprop : function() {
			var html = [
				'<div style="padding:20px;">',
				//width, height
				'<div class="ke-dialog-row">',
				'<label for="keWidth" style="width:90px;">' + lang.size + '</label>',
				lang.width + ' <input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> &nbsp; ',
				'<select name="widthType">',
				'<option value="%">' + lang.percent + '</option>',
				'<option value="px">' + lang.px + '</option>',
				'</select> &nbsp; ',
				lang.height + ' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> &nbsp; ',
				'<select name="heightType">',
				'<option value="%">' + lang.percent + '</option>',
				'<option value="px">' + lang.px + '</option>',
				'</select>',
				'</div>',
				//align
				'<div class="ke-dialog-row">',
				'<label for="keAlign" style="width:90px;">' + lang.align + '</label>',
				lang.textAlign + ' <select id="keAlign" name="textAlign">',
				'<option value="">' + lang.alignDefault + '</option>',
				'<option value="left">' + lang.alignLeft + '</option>',
				'<option value="center">' + lang.alignCenter + '</option>',
				'<option value="right">' + lang.alignRight + '</option>',
				'</select> ',
				lang.verticalAlign + ' <select name="verticalAlign">',
				'<option value="">' + lang.alignDefault + '</option>',
				'<option value="top">' + lang.alignTop + '</option>',
				'<option value="middle">' + lang.alignMiddle + '</option>',
				'<option value="bottom">' + lang.alignBottom + '</option>',
				'<option value="baseline">' + lang.alignBaseline + '</option>',
				'</select>',
				'</div>',
				//border
				'<div class="ke-dialog-row">',
				'<label for="keBorder" style="width:90px;">' + lang.border + '</label>',
				lang.borderWidth + ' <input type="text" id="keBorder" class="ke-input-text ke-input-number" name="border" value="" maxlength="4" /> &nbsp; ',
				lang.borderColor + ' <span class="ke-inline-block ke-input-color"></span>',
				'</div>',
				//background color
				'<div class="ke-dialog-row">',
				'<label for="keBgColor" style="width:90px;">' + lang.backgroundColor + '</label>',
				'<span class="ke-inline-block ke-input-color"></span>',
				'</div>',
				'</div>'
			].join('');
			var bookmark = self.cmd.range.createBookmark();
			var dialog = self.createDialog({
				name : name,
				width : 500,
				title : self.lang('tablecell'),
				body : html,
				beforeRemove : function() {
					colorBox.unbind();
				},
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var width = widthBox.val(),
							height = heightBox.val(),
							widthType = widthTypeBox.val(),
							heightType = heightTypeBox.val(),
							padding = paddingBox.val(),
							spacing = spacingBox.val(),
							textAlign = textAlignBox.val(),
							verticalAlign = verticalAlignBox.val(),
							border = borderBox.val(),
							borderColor = K(colorBox[0]).html() || '',
							bgColor = K(colorBox[1]).html() || '';
						if (!/^\d*$/.test(width)) {
							alert(self.lang('invalidWidth'));
							widthBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(height)) {
							alert(self.lang('invalidHeight'));
							heightBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(border)) {
							alert(self.lang('invalidBorder'));
							borderBox[0].focus();
							return;
						}
						cell.css({
							width : width !== '' ? (width + widthType) : '',
							height : height !== '' ? (height + heightType) : '',
							'background-color' : bgColor,
							'text-align' : textAlign,
							'vertical-align' : verticalAlign,
							'border-width' : border,
							'border-style' : border !== '' ? 'solid' : '',
							'border-color' : borderColor
						});
						self.hideDialog().focus();
						self.cmd.range.moveToBookmark(bookmark);
						self.cmd.select();
						self.addBookmark();
					}
				}
			}),
			div = dialog.div,
			widthBox = K('[name="width"]', div).val(100),
			heightBox = K('[name="height"]', div),
			widthTypeBox = K('[name="widthType"]', div),
			heightTypeBox = K('[name="heightType"]', div),
			paddingBox = K('[name="padding"]', div).val(2),
			spacingBox = K('[name="spacing"]', div).val(0),
			textAlignBox = K('[name="textAlign"]', div),
			verticalAlignBox = K('[name="verticalAlign"]', div),
			borderBox = K('[name="border"]', div).val(1),
			colorBox = K('.ke-input-color', div);
			_initColorPicker(div, colorBox.eq(0));
			_initColorPicker(div, colorBox.eq(1));
			_setColor(colorBox.eq(0), '#000000');
			_setColor(colorBox.eq(1), '');
			// foucs and select
			widthBox[0].focus();
			widthBox[0].select();
			// get selected cell
			var cell = self.plugin.getSelectedCell();
			var match,
				cellWidth = cell[0].style.width || cell[0].width || '',
				cellHeight = cell[0].style.height || cell[0].height || '';
			if ((match = /^(\d+)((?:px|%)*)$/.exec(cellWidth))) {
				widthBox.val(match[1]);
				widthTypeBox.val(match[2]);
			} else {
				widthBox.val('');
			}
			if ((match = /^(\d+)((?:px|%)*)$/.exec(cellHeight))) {
				heightBox.val(match[1]);
				heightTypeBox.val(match[2]);
			}
			textAlignBox.val(cell[0].style.textAlign || '');
			verticalAlignBox.val(cell[0].style.verticalAlign || '');
			var border = cell[0].style.borderWidth || '';
			if (border) {
				border = parseInt(border);
			}
			borderBox.val(border);
			_setColor(colorBox.eq(0), K.toHex(cell[0].style.borderColor || ''));
			_setColor(colorBox.eq(1), K.toHex(cell[0].style.backgroundColor || ''));
			widthBox[0].focus();
			widthBox[0].select();
		},
		insert : function() {
			this.prop(true);
		},
		'delete' : function() {
			var table = self.plugin.getSelectedTable();
			self.cmd.range.setStartBefore(table[0]).collapse(true);
			self.cmd.select();
			table.remove();
			self.addBookmark();
		},
		colinsert : function(offset) {
			var table = self.plugin.getSelectedTable()[0],
				row = self.plugin.getSelectedRow()[0],
				cell = self.plugin.getSelectedCell()[0],
				index = cell.cellIndex + offset;
			// å–å¾—ç¬¬ä¸€è¡Œçš„index
			index += table.rows[0].cells.length - row.cells.length;

			for (var i = 0, len = table.rows.length; i < len; i++) {
				var newRow = table.rows[i],
					newCell = newRow.insertCell(index);
				newCell.innerHTML = K.IE ? '' : '<br />';
				// è°ƒæ•´ä¸‹ä¸€è¡Œçš„å•å…ƒæ ¼index
				index = _getCellIndex(table, newRow, newCell);
			}
			self.cmd.range.selectNodeContents(cell).collapse(true);
			self.cmd.select();
			self.addBookmark();
		},
		colinsertleft : function() {
			this.colinsert(0);
		},
		colinsertright : function() {
			this.colinsert(1);
		},
		rowinsert : function(offset) {
			var table = self.plugin.getSelectedTable()[0],
				row = self.plugin.getSelectedRow()[0],
				cell = self.plugin.getSelectedCell()[0];
			var rowIndex = row.rowIndex;
			if (offset === 1) {
				rowIndex = row.rowIndex + (cell.rowSpan - 1) + offset;
			}
			var newRow = table.insertRow(rowIndex);

			for (var i = 0, len = row.cells.length; i < len; i++) {
				// è°ƒæ•´cellä¸ªæ•°
				if (row.cells[i].rowSpan > 1) {
					len -= row.cells[i].rowSpan - 1;
				}
				var newCell = newRow.insertCell(i);
				// copy colspan
				if (offset === 1 && row.cells[i].colSpan > 1) {
					newCell.colSpan = row.cells[i].colSpan;
				}
				newCell.innerHTML = K.IE ? '' : '<br />';
			}
			// è°ƒæ•´rowspan
			for (var j = rowIndex; j >= 0; j--) {
				var cells = table.rows[j].cells;
				if (cells.length > i) {
					for (var k = cell.cellIndex; k >= 0; k--) {
						if (cells[k].rowSpan > 1) {
							cells[k].rowSpan += 1;
						}
					}
					break;
				}
			}
			self.cmd.range.selectNodeContents(cell).collapse(true);
			self.cmd.select();
			self.addBookmark();
		},
		rowinsertabove : function() {
			this.rowinsert(0);
		},
		rowinsertbelow : function() {
			this.rowinsert(1);
		},
		rowmerge : function() {
			var table = self.plugin.getSelectedTable()[0],
				row = self.plugin.getSelectedRow()[0],
				cell = self.plugin.getSelectedCell()[0],
				rowIndex = row.rowIndex, // å½“å‰è¡Œçš„index
				nextRowIndex = rowIndex + cell.rowSpan, // ä¸‹ä¸€è¡Œçš„index
				nextRow = table.rows[nextRowIndex]; // ä¸‹ä¸€è¡?
			// æœ€åä¸€è¡Œä¸èƒ½åˆå¹?
			if (table.rows.length <= nextRowIndex) {
				return;
			}
			var cellIndex = cell.cellIndex; // ä¸‹ä¸€è¡Œå•å…ƒæ ¼çš„index
			if (nextRow.cells.length <= cellIndex) {
				return;
			}
			var nextCell = nextRow.cells[cellIndex]; // ä¸‹ä¸€è¡Œå•å…ƒæ ¼
			// ä¸Šä¸‹è¡Œçš„colspanä¸ä¸€è‡´æ—¶ä¸èƒ½åˆå¹¶
			if (cell.colSpan !== nextCell.colSpan) {
				return;
			}
			cell.rowSpan += nextCell.rowSpan;
			nextRow.deleteCell(cellIndex);
			self.cmd.range.selectNodeContents(cell).collapse(true);
			self.cmd.select();
			self.addBookmark();
		},
		colmerge : function() {
			var table = self.plugin.getSelectedTable()[0],
				row = self.plugin.getSelectedRow()[0],
				cell = self.plugin.getSelectedCell()[0],
				rowIndex = row.rowIndex, // å½“å‰è¡Œçš„index
				cellIndex = cell.cellIndex,
				nextCellIndex = cellIndex + 1;
			// æœ€åä¸€åˆ—ä¸èƒ½åˆå¹?
			if (row.cells.length <= nextCellIndex) {
				return;
			}
			var nextCell = row.cells[nextCellIndex];
			// å·¦å³åˆ—çš„rowspanä¸ä¸€è‡´æ—¶ä¸èƒ½åˆå¹¶
			if (cell.rowSpan !== nextCell.rowSpan) {
				return;
			}
			cell.colSpan += nextCell.colSpan;
			row.deleteCell(nextCellIndex);
			self.cmd.range.selectNodeContents(cell).collapse(true);
			self.cmd.select();
			self.addBookmark();
		},
		rowsplit : function() {
			var table = self.plugin.getSelectedTable()[0],
				row = self.plugin.getSelectedRow()[0],
				cell = self.plugin.getSelectedCell()[0],
				rowIndex = row.rowIndex;
			// ä¸æ˜¯å¯åˆ†å‰²å•å…ƒæ ¼
			if (cell.rowSpan === 1) {
				return;
			}
			var cellIndex = _getCellIndex(table, row, cell);
			for (var i = 1, len = cell.rowSpan; i < len; i++) {
				var newRow = table.rows[rowIndex + i],
					newCell = newRow.insertCell(cellIndex);
				if (cell.colSpan > 1) {
					newCell.colSpan = cell.colSpan;
				}
				newCell.innerHTML = K.IE ? '' : '<br />';
				// è°ƒæ•´ä¸‹ä¸€è¡Œçš„å•å…ƒæ ¼index
				cellIndex = _getCellIndex(table, newRow, newCell);
			}
			K(cell).removeAttr('rowSpan');
			self.cmd.range.selectNodeContents(cell).collapse(true);
			self.cmd.select();
			self.addBookmark();
		},
		colsplit : function() {
			var table = self.plugin.getSelectedTable()[0],
				row = self.plugin.getSelectedRow()[0],
				cell = self.plugin.getSelectedCell()[0],
				cellIndex = cell.cellIndex;
			// ä¸æ˜¯å¯åˆ†å‰²å•å…ƒæ ¼
			if (cell.colSpan === 1) {
				return;
			}
			for (var i = 1, len = cell.colSpan; i < len; i++) {
				var newCell = row.insertCell(cellIndex + i);
				if (cell.rowSpan > 1) {
					newCell.rowSpan = cell.rowSpan;
				}
				newCell.innerHTML = K.IE ? '' : '<br />';
			}
			K(cell).removeAttr('colSpan');
			self.cmd.range.selectNodeContents(cell).collapse(true);
			self.cmd.select();
			self.addBookmark();
		},
		coldelete : function() {
			var table = self.plugin.getSelectedTable()[0],
				row = self.plugin.getSelectedRow()[0],
				cell = self.plugin.getSelectedCell()[0],
				index = cell.cellIndex;
			for (var i = 0, len = table.rows.length; i < len; i++) {
				var newRow = table.rows[i],
					newCell = newRow.cells[index];
				if (newCell.colSpan > 1) {
					newCell.colSpan -= 1;
					if (newCell.colSpan === 1) {
						K(newCell).removeAttr('colSpan');
					}
				} else {
					newRow.deleteCell(index);
				}
				// è·³è¿‡ä¸éœ€è¦åˆ é™¤çš„è¡?
				if (newCell.rowSpan > 1) {
					i += newCell.rowSpan - 1;
				}
			}
			if (row.cells.length === 0) {
				self.cmd.range.setStartBefore(table).collapse(true);
				self.cmd.select();
				K(table).remove();
			} else {
				self.cmd.selection(true);
			}
			self.addBookmark();
		},
		rowdelete : function() {
			var table = self.plugin.getSelectedTable()[0],
				row = self.plugin.getSelectedRow()[0],
				cell = self.plugin.getSelectedCell()[0],
				rowIndex = row.rowIndex;
			// ä»ä¸‹åˆ°ä¸Šåˆ é™¤
			for (var i = cell.rowSpan - 1; i >= 0; i--) {
				table.deleteRow(rowIndex + i);
			}
			if (table.rows.length === 0) {
				self.cmd.range.setStartBefore(table).collapse(true);
				self.cmd.select();
				K(table).remove();
			} else {
				self.cmd.selection(true);
			}
			self.addBookmark();
		}
	};
	self.clickToolbar(name, self.plugin.table.prop);
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('template', function(K) {
	var self = this, name = 'template', lang = self.lang(name + '.'),
		htmlPath = self.pluginsPath + name + '/html/';
	function getFilePath(fileName) {
		return htmlPath + fileName + '?ver=' + encodeURIComponent(K.DEBUG ? K.TIME : K.VERSION);
	}
	self.clickToolbar(name, function() {
		var lang = self.lang(name + '.'),
			arr = ['<div style="padding:10px 20px;">',
				'<div class="ke-header">',
				// left start
				'<div class="ke-left">',
				lang. selectTemplate + ' <select>'];
			K.each(lang.fileList, function(key, val) {
				arr.push('<option value="' + key + '">' + val + '</option>');
			});
			html = [arr.join(''),
				'</select></div>',
				// right start
				'<div class="ke-right">',
				'<input type="checkbox" id="keReplaceFlag" name="replaceFlag" value="1" /> <label for="keReplaceFlag">' + lang.replaceContent + '</label>',
				'</div>',
				'<div class="ke-clearfix"></div>',
				'</div>',
				'<iframe class="ke-textarea" frameborder="0" style="width:458px;height:260px;background-color:#FFF;"></iframe>',
				'</div>'].join('');
		var dialog = self.createDialog({
			name : name,
			width : 500,
			title : self.lang(name),
			body : html,
			yesBtn : {
				name : self.lang('yes'),
				click : function(e) {
					var doc = K.iframeDoc(iframe);
					self[checkbox[0].checked ? 'html' : 'insertHtml'](doc.body.innerHTML).hideDialog().focus();
				}
			}
		});
		var selectBox = K('select', dialog.div),
			checkbox = K('[name="replaceFlag"]', dialog.div),
			iframe = K('iframe', dialog.div);
		checkbox[0].checked = true;
		iframe.attr('src', getFilePath(selectBox.val()));
		selectBox.change(function() {
			iframe.attr('src', getFilePath(this.value));
		});
	});
});
/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('wordpaste', function(K) {
	var self = this, name = 'wordpaste';
	self.clickToolbar(name, function() {
		var lang = self.lang(name + '.'),
			html = '<div style="padding:10px 20px;">' +
				'<div style="margin-bottom:10px;">' + lang.comment + '</div>' +
				'<iframe class="ke-textarea" frameborder="0" style="width:408px;height:260px;"></iframe>' +
				'</div>',
			dialog = self.createDialog({
				name : name,
				width : 450,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var str = doc.body.innerHTML;
						str = K.clearMsWord(str, self.filterMode ? self.htmlTags : K.options.htmlTags);
						self.insertHtml(str).hideDialog().focus();
					}
				}
			}),
			div = dialog.div,
			iframe = K('iframe', div),
			doc = K.iframeDoc(iframe);
		if (!K.IE) {
			doc.designMode = 'on';
		}
		doc.open();
		doc.write('<!doctype html><html><head><title>WordPaste</title></head>');
		doc.write('<body style="background-color:#FFF;font-size:12px;margin:2px;">');
		if (!K.IE) {
			doc.write('<br />');
		}
		doc.write('</body></html>');
		doc.close();
		if (K.IE) {
			doc.body.contentEditable = 'true';
		}
		iframe[0].contentWindow.focus();
	});
});
