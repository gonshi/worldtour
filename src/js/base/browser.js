(function(global, doc, $, ns, undefined) {
    'use strict';
    ns.setNS('browser');

    var ua = global.navigator.userAgent,
        b = {};

    switch(true) {
    case /MSIE/i.test(ua):
        b.ie = true;
        b.version = /MSIE 10.0/i.test(ua) ? 10 :
            /MSIE 9.0/i.test(ua) ? 9 :
            /MSIE 8.0/i.test(ua) ? 8 :
            /MSIE 7.0/i.test(ua) ? 7 :
            /MSIE 6.0/i.test(ua) ? 6 : undefined;
        b.prefix = '-ms-';
        if (!b.version) {
        }
        break;
    case /Firefox/i.test(ua):
        b.ff = true;
        b.prefix = '-moz-';
        break;
    case /Chrome/i.test(ua):
        b.ch = true;
        b.webkit = true;
        b.prefix = '-webkit-';
        break;
    case /Safari/i.test(ua):
        b.sf = true;
        b.webkit = true;
        b.prefix = '-webkit-';
        break;
    case /Opera/i.test(ua):
        b.op = true;
        b.prefix = '-o-';
        break;
    default:
        b.prefix = '';
        break;
    }

    if(/iPhone/.test(ua)) {
        b.ipn = true;
        ua.match(/iPhone OS (\w+){1,3}/g);
        var iosv=(RegExp.$1.replace(/[\._]/g, '')+'00').slice(0,3);
        if(iosv >= 500) {
            //iPhone iOS5 Over
            b.ipn5 = true;
        }
    }

    if(/Android/.test(ua)) {
        b.adr = true;
        ua.match(/Android (\w+){1,3}/g);
        var adrv = (RegExp.$1.replace(/_/g, '')+'00').slice(0,3);
        if(+adrv <= 300) {
            // Android 3 Under
            b.adr2 = true;
        } else if(+adrv >= 400) {
            b.adr4 = true;
        }
    }

    b.file = !!(global.File && global.FileReader && global.FileList);

    ns.browser = b;

})(this,this.document, jQuery, this.namespace);
