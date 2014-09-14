(function(global, doc, $, ns, undefined) {
	'use strict';
	ns = ns || {};
  var $slot = $('.slot');
  var $flag = $('.flag');
  var $flagImg = $flag.find('img');

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

    if( winRatio >= imgRatio){ // win vertical length is longer than the img one
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
      var markerWaitTime = 1000;
      var latlng = new global.google.maps.LatLng(ns.countryList[ns.nextNum].latlng[0], ns.countryList[ns.nextNum].latlng[1]);
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
      }, markerWaitTime); 
    }
  };

	global.kokki = ns;
})(this, document, jQuery, this.kokki);
