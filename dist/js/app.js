(function(global) {
    'use strict';
    var pns = 'namespace';

    global[pns] = global[pns] || {};

    function setNS(definition, namespace) {
        var ns = namespace || global[pns],
            def = definition.split('.');
        var i=0,
            len = def.length;
        for(;i<len;i++) {
            ns = _setProp(ns, def[i]);
        }
    }

    /**
     * [オブジェクトにプロパティを配置]
     * @param {[object]} obj
     * @param {[string]} prop
     */
    function _setProp(obj, prop) {
        obj[prop] = obj[prop] || {};
        return obj[prop];
    }

    global[pns].setNS = setNS;


})(this);

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

(function(global, doc, $, ns, undefined) {
    'use strict';
    ns.setNS('event');

    var hasTouchEvent = ('ontouchstart' in window);

    var Event = {
        Load: 'load',
        Click: 'click',
        Key: {
            down: 'keydown',
            up: 'keyup',
            press: 'keypress'
        },
        Change: 'change',
        Focus: {
            on: 'focus',
            out: 'blur'
        },
        Pointer: {
            start: hasTouchEvent?'touchstart':'mousedown',
            move : hasTouchEvent?'touchmove':'mousemove',
            end  : hasTouchEvent?'touchend':'mouseup'
        },
        Mouse: {
            on: "mouseenter",
            off: "mouseleave"
        }
    };



    // ------------------------------
    // Export
    // ------------------------------
    //
    ns.Event = Event;

})(this,this.document, jQuery, this.namespace);

(function(global, doc, $, ns, undefined) {
    'use strict';
    ns.setNS('view');

    //--------------------
    //  Import
    //--------------------

    //--------------------
    //  Const
    //--------------------
    var CONSTANT = 'constant';

    //--------------------
    //  Class definition
    //--------------------
    var ViewClass = {
        my_class_method: function() {
            return CONSTANT;
        }
    };


    //--------------------
    //  Exports
    //--------------------

    ns.view.ViewClass = ViewClass;

})(this, document, jQuery, this.namespace);

(function(global, doc, $, ns, undefined) {
    'use strict';

    //--------------------
    //  Import
    //--------------------

    //--------------------
    //  Initialize
    //--------------------
    $(function() {
        init();
    });

    function init() {
        return true;
    }

})(this, document, jQuery, this.namespace);
