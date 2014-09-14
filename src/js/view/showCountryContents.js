(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};
  var $slot = $('.slot');
  var $flag = $('.flag');
  var $flagImg = $flag.find('img');
  var $countryName = $('.countryName');
  var $countryFlagWiki = $('.countryFlagWiki .sentence');

  /*
   * @param {number}newImgWidth, {number}newImgHeight, {number}duration(optional)
   * @return {undefined}
   */
  ns.showCountryContents = function(newImgWidth, newImgHeight, duration){
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    var winRatio = winHeight / winWidth;
    var imgRatio = newImgHeight / newImgWidth;
    var imgTargetWidth;
    var imgTargetHeight;
    var marginTop = 0;
    duration = duration || 1000;

    if( winRatio >= imgRatio ){ // win vertical length is longer than the img one
      imgTargetWidth = winWidth / 2;
      imgTargetHeight = imgTargetWidth * imgRatio;
      marginTop = ( winHeight / 2 - imgTargetHeight ) / 2;
    }
    else{
      imgTargetHeight = winHeight / 2;
      imgTargetWidth = imgTargetHeight / imgRatio;
    }

    // fade animation from slot to flag
    $slot.animate({
      width: winWidth / 2,
      height: winHeight / 2,
      opacity: 0
    }, duration, function(){
      $slot.css({display: 'none'});
      drawMap();
    });

    $flag.
      css({ opacity: 0 }).
      animate({
        width: winWidth / 2,
        height: winHeight / 2,
        opacity: 1
    }, duration);

    $flagImg.animate({
      width: imgTargetWidth,
      height: imgTargetHeight,
      marginTop: marginTop
    }, duration);
    ////////////////////////////////
    
    function drawMap() {
      var waitTime = 1000;
      var latlng = new global.google.maps.LatLng(ns.countryList[ ns.nextNum ].latlng[0], ns.countryList[ ns.nextNum ].latlng[1]);
      var mapOptions = {
        center: latlng,
        zoom: 3,
        mapTypeId: global.google.maps.MapTypeId.ROADMAP
      };
      var map = new global.google.maps.Map(document.getElementById("map"), mapOptions);
      $('#map').addClass('show');

      setTimeout(function(){
        new global.google.maps.Marker({
          animation: global.google.maps.Animation.DROP,
          position: latlng,
          map: map
        });

        showCountryName();
        showCountryFlagWiki();
      }, waitTime); 
    }

    function showCountryName(){
      $countryName.
        css({ 'line-height': ( winHeight / 2 ) + 'px' }).
        text( ns.countryList[ ns.nextNum ].name ).
        addClass('show');
    }

    function showCountryFlagWiki(){

      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url: 'http://ja.wikipedia.org/w/api.php?action=query&format=json&titles=' + ns.countryList[ ns.nextNum ].name + 'の国旗&prop=extracts&redirects=1&exchars=120&explaintext=1',
        success: function( result ){
          for( var j in result.query.pages ){
            if( result.query.pages.hasOwnProperty(j) && result.query.pages[j].extract ){

              $countryFlagWiki.
                css({
                  width: winWidth / 2,
                  height: winHeight / 2
                }).
                text( result.query.pages[j].extract ).
                addClass( 'show' );
              break;

            }
          }
        }
      });

    }
  };

  global.kokki = ns;
})(this, document, jQuery, this.kokki);
