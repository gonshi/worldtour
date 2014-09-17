(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};
  var photoTmpl = [ 
    '<p class="photo">',
      '<img src="${photoSrc}" alt="写真">',
    '</p>'
  ].join("");
  var photoSrcTmpl = 'https://farm#{farm}.staticflickr.com/#{server}/#{id}_#{secret}_n.jpg'; 
  var $photoContainer = $( '.photoContainer' );

  /*
   * @param {Object}photos
   * @return {undefined}
   */
  ns.showPhotos = function( photos ){
    var i = 0;
    //var photosLength = photos.length;
    var photosLength = 20;
    var maxColumnNum = 3;
    var columnNum;
    var photoMargin = $(window).width() * 0.025;
    var photoWidth = $(window).width() * 0.3;
    var photoDOM;
    var left;
    var newImg = [];
    var imgHeight = [];
    var maxHeight = 0;
    var loadedCount = 0;

    var setImgTop = function( i ){
      var j;
      var sumHeight = 0;
      var start = i % maxColumnNum;

      imgHeight[ i ] = newImg[ i ].height * ( photoWidth / newImg[ i ].width );

      for ( j = start; j < photosLength; j += maxColumnNum ){
        if( !isNaN( imgHeight[ j ] ) ){
          sumHeight += imgHeight[ j ] + photoMargin;
        }

        if ( j < photosLength - maxColumnNum ){
          $( '.photo' ).eq( j + maxColumnNum ).css({ top: sumHeight });
        }
      }

      if ( sumHeight > maxHeight ){
        maxHeight = sumHeight;
      }

      loadedCount += 1;
      if ( loadedCount === photosLength ){
        $photoContainer.css({ height: maxHeight + 100, marginTop: 100 });
        $( '.moreBtn' ).css({ display: 'block' });
        window.scrollTo(0, 0);
      }
    };

    var imageLoader = function( i ){
      newImg[ i ] = new Image();
      newImg[ i ].onload = function(){
        setImgTop( i ); 
      };
      newImg[ i ].src = photoSrcTmpl.
        replace( '#{farm}', photos[ i ].farm ). 
        replace( '#{server}', photos[ i ].server ). 
        replace( '#{id}', photos[ i ].id ). 
        replace( '#{secret}', photos[ i ].secret ); 
    };

    for ( i = 0; i < photosLength; i++ ){
      imageLoader( i );

      // set photo css property
      columnNum = i % maxColumnNum;

      if ( columnNum === 0 ){
        left = photoMargin;
      }
      else if( columnNum === 1 ){
        left = photoWidth + photoMargin * 2;
      }
      else if( columnNum === 2 ){
        left = photoWidth * 2 + photoMargin * 3;
      }
      ////////////////////////////

      photoDOM = photoTmpl.replace( '${photoSrc}', newImg[ i ].src );

      $( photoDOM ).
        css({ left: left, width: photoWidth }).
        appendTo('.photoContainer');
    }
   };

  global.kokki = ns;
})(this, document, jQuery, this.kokki);
