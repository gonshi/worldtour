(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};

  var originalConstructor;
  var instance;
  var $slotContainer = $( '.slotContainer' );

  /*
  *  @param {}
  *  @return {undefined}
  */

  function ResizeHandler(){
   }

  originalConstructor = ResizeHandler.prototype.constructor;
  ResizeHandler.prototype = new ns.EventDispatcher();
  ResizeHandler.prototype.constructor = originalConstructor;

  ResizeHandler.prototype.exec = function(){
    $(window).on( 'load resize', function(){
      $slotContainer.css({ height: $(this).height() });
    });
  };

  ResizeHandler.getInstance = function() {
    if (!instance) {
      instance = new ResizeHandler();
    }
    return instance;
  };

  ns.ResizeHandler = ResizeHandler;
  global.kokki = ns;
})(this, document, jQuery, this.kokki);
