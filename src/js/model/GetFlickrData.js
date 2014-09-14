(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};  

  var originalConstructor;
  var instance;
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0401edc0e96db4b374f30c94c10e9350&place_id=#{place_id}&format=json';

  /*
  *  @param {string} id
  *  @return {undefined}
  */

  function GetFlickrData(){
  }

  originalConstructor = GetFlickrData.prototype.constructor;
  GetFlickrData.prototype = new ns.EventDispatcher();
  GetFlickrData.prototype.constructor = originalConstructor;

  /*
  *  @param {}
  *  @return {undefined}
  */

  GetFlickrData.prototype.exec = function( place_id ){
    var that = this;
    $.ajax({
      type: 'get',
      dataType: 'jsonp',
      url: url.replace( '#{place_id}', place_id )
    });

    global.jsonFlickrApi = function( result ){
      that.fireEvent( 'PHOTO_LOADED', that, result.photos.photo );
    };
  };

  GetFlickrData.getInstance = function( id ) {
    if (!instance) {
      instance = new GetFlickrData(id);
    }
    return instance;
  };

  ns.GetFlickrData = GetFlickrData;
  global.kokki = ns;
})(this, document, jQuery, this.kokki);
