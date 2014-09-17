(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};
  var $photoContainer = $( '.photoContainer' );
  var $countryName = $( '.countryName' );
  var $countryFlagWiki = $( '.countryFlagWiki .sentence' );
  var $filter = $( '#filter' );
  var $map = $( '#map' );
  var $slot = $( '.slot' );
  var $flag = $( '.flag' );
  var $flagImg = $( '.flag img' );
  var $moreBtn = $( '.moreBtn' );
  var $layers = $( '.firstLayer, .secondLayer, .thirdLayer' );

  ns.reset = function(){
    $flag.attr({ src: 'img/flag/white.jpg' });

    $slot.css({
      display: 'block',
      width: '100%',
      height: '100%',
      opacity: 1
    });

    $flag.css({
      width: '100%',
      height: '100%',
      opacity: 0
    });

    $flagImg.
      css({
        width: 'inherit',
        height: 'inherit',
        marginTop: 0
      }).
      attr({ src: 'img/flag/white.jpg' });

    $map.empty();
    $countryName.text( '' );
    $countryFlagWiki.text( '' );
    $photoContainer.empty().css({ height: 0, marginTop: 0 });
    $moreBtn.removeClass( 'show' );
    $filter.removeClass( 'hide' );
    $layers.removeClass( 'selected' );
    window.scrollTo(0, 0);
  };

  global.kokki = ns;
})(this, document, jQuery, this.kokki);
