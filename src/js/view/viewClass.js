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
