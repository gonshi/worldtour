(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};

  $(function() {
    var getData = ns.GetData.getInstance( '1LoCcYSg8J3SYsa2mYmieu9h5osw7by9GJc8F1OHIbZM' );
    var slot = ns.Slot.getInstance(10); // param is interval
    var clickHandler = ns.ClickHandler.getInstance();

    // get country data from spread sheet
    getData.exec();
    global.gdata.io.handleScriptLoaded.prototype.addEventListener( 'LOADED', function(){
      slot.exec();
      setNext();
    });
    ////////////////////////////////////
    
    // layer click handler
    clickHandler.exec();
    clickHandler.addEventListener( 'STOP', function( className ){
      slot.stop( className );
    });
    //////////////////////

    // after slot has finished
    // @param {number}newImgWidth, {number}newImgHeight
    slot.addEventListener( 'SLOT_FINISHED', function( newImgWidth, newImgHeight ){
      ns.showCountryContents( newImgWidth, newImgHeight );
    });

    function setNext(){
      ns.nextNum = Math.floor( Math.random() * ns.countryList.length );
    }
  });

  global.kokki = ns;
})(this, document, jQuery, this.kokki);
