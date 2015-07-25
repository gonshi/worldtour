(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};
  var photoTmpl = [ 
    '<div class="photo">',
      '<p>',
        '<img src="${photoSrc}" alt="写真">',
      '</p>',
      '<p class="photo_copyright">',
        '<a href="https://www.flickr.com/photos/${copyright}" target="_blank">',
          '&copy;${copyright}',
        '</a>',
      '</p>',
    '</div>'
  ].join("");
  var photoSrcTmpl = 'https://farm#{farm}.staticflickr.com/#{server}/#{id}_#{secret}_n.jpg'; 
  var $photoContainer = $( '.photoContainer' );
  var $photoTitle = $( '.photoTitle' );
  var $loader = $( '.loader' );
  var $arrow  = $( '.arrow' );
  var $moreBtn = $( '.moreBtn' );
  var $footer  = $( '#footer' );

  /*
   * @param {Object}photos
   * @return {undefined}
   */
  ns.showPhotos = function( photos ){
    var i = 0;
    //var photosLength = photos.length;
    var photosLength = 40;
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
        $photoContainer.css({ height: maxHeight + 200 });
        $photoTitle.text( ns.countryList[ ns.nextNum ].name + 'の風景' ).show();
        $loader.removeClass( 'show' );
        $arrow.show();
        $footer.addClass( 'show' );

        if( ns.countryList.length > 1 ){
          $moreBtn.addClass( 'show' );
        }
        window.scrollTo(0, 1);

        $( window ).on( 'scroll', function(){
          if ( $( window ).scrollTop() > 100 ){
            $( window ).off( 'scroll' );
            $arrow.hide();
          }
        } );
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

    $loader.addClass( 'show' );
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

      photoDOM = photoTmpl.replace( '${photoSrc}', newImg[ i ].src ).
                           replace( /\${copyright}/g, photos[ i ].owner );

      $( photoDOM ).
        css({ left: left, width: photoWidth }).
        appendTo('.photoContainer');
    }
   };

  global.kokki = ns;
})(this, document, jQuery, this.kokki);
