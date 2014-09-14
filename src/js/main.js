(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};

  $(function() {
    var getCountryData = ns.GetCountryData.getInstance( '1LoCcYSg8J3SYsa2mYmieu9h5osw7by9GJc8F1OHIbZM' );
    var getFlickrData = ns.GetFlickrData.getInstance();
    var slot = ns.Slot.getInstance(10); // param is interval
    var clickHandler = ns.ClickHandler.getInstance();

    // get country data from spread sheet
    global.gdata.io.handleScriptLoaded.prototype.addEventListener( 'LOADED', function(){
      slot.exec();
      setNext();
    });
    ////////////////////////////////////
    
    // click handler
    clickHandler.addEventListener( 'STOP', function( className ){
      slot.stop( className );
    });
    //////////////////////

    // after slot has finished
    slot.addEventListener( 'SLOT_FINISHED', function( newImgWidth, newImgHeight ){
      ns.showCountryContents( newImgWidth, newImgHeight );
      getFlickrData.exec( ns.countryList[ ns.nextNum ].place_id );
    });
    ///////////////////////////

    // flickr image has loaded 
    getFlickrData.addEventListener( 'PHOTO_LOADED', function( photos ){
      ns.showPhotos( photos );
    });
    getCountryData.exec();
    clickHandler.exec();

    function setNext(){
      ns.nextNum = Math.floor( Math.random() * ns.countryList.length );
    }
  });

  global.kokki = ns;
})(this, document, jQuery, this.kokki);
