(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};

  var originalConstructor;
  var instance;

  /*
  *  @param {}
  *  @return {undefined}
  */

  function ClickHandler(){
   }

  originalConstructor = ClickHandler.prototype.constructor;
  ClickHandler.prototype = new ns.EventDispatcher();
  ClickHandler.prototype.constructor = originalConstructor;

  ClickHandler.prototype.layer = function(){
    var that = this;
    var layers = [
      $('.firstLayer'),
      $('.secondLayer'),
      $('.thirdLayer')
    ];
    var i;

    for( i = 0; i < layers.length; i++ ){
      layerClick(i);
    }

    function layerClick(i){
      layers[i].on('click', function(){
        if( !$(this).hasClass('selected') ){
          that.fireEvent('STOP', that, $(this).attr('class') );
        }
      });
    }
  };


  ClickHandler.prototype.reset = function(){
    var that = this;
    $( '.moreBtn' ).on( 'click', function(){
      that.fireEvent( 'RESET' );
    });
  };

  ClickHandler.getInstance = function() {
    if (!instance) {
      instance = new ClickHandler();
    }
    return instance;
  };

  ns.ClickHandler = ClickHandler;
  global.kokki = ns;
})(this, document, jQuery, this.kokki);
