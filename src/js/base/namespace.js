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
