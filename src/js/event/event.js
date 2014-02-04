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
