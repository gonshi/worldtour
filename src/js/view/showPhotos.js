(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};
  var photoUrlTmpl = [ 
    '<p class="photo">',
      '<img src="https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_z.jpg" alt="写真">',
    '</p>'
  ].join("");

  /*
   * @param {Object}photos
   * @return {undefined}
   */
  ns.showPhotos = function( photos ){
    var i = 0;
    //var photosLength = photos.length;
    var photosLength = 20;

    for( i = 0; i < photosLength; i++ ){
      console.log(photos[i].farm);
      $.tmpl( photoUrlTmpl,{
        'farm': photos[ i ].farm,
        'server': photos[ i ].server,
        'id': photos[ i ].id,
        'secret': photos[ i ].secret
      } ).appendTo('.photoContainer');
    }
  };

  global.kokki = ns;
})(this, document, jQuery, this.kokki);
