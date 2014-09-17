(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};  

  var originalConstructor;
  var instance;
  var $flagImg = $('.flag').find('img');
  var animationLayer =  [
    $('.firstLayer'),
    $('.secondLayer'),
    $('.thirdLayer')
  ];
  var layerLength = animationLayer.length; 
  var $filter = $( '#filter' );

  /*
  *  @param {number} interval 
  *  @return {undefined}
  */
  
  function Slot(interval){
    this.INTERVAL = interval || 10;
  }

  originalConstructor = Slot.prototype.constructor;
  Slot.prototype = new ns.EventDispatcher();
  Slot.prototype.constructor = originalConstructor;

  /*
   * @param {}
   * @return {undefined}
   */
  Slot.prototype.exec = function(){
    var that = this;
    var colorPattern = 0;
    var frame = 0;
    var maxColorPattern = ns.colorList.length;
    var GAP = [0, 4, 7];
    var i = 0;

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
    function changeColor(){
      if( frame  === that.INTERVAL ){
        for( i = 0; i < layerLength; i++){
          animationLayer[i].css({ 'background-color': ns.colorList[ ( colorPattern + GAP[i] ) % maxColorPattern ] });
        }
        frame = 0;
        colorPattern++;
        if( colorPattern === maxColorPattern ) colorPattern = 0;
      }
      frame++;
      window.requestAnimationFrame(changeColor);
    }
    window.requestAnimationFrame(changeColor);
  };

  /*
  * @param {string}className
  * @return {undefined}
  */
  Slot.prototype.stop = function( className ){
    var that = this;
    var layerNum;
    var layers = ['firstLayer', 'secondLayer', 'thirdLayer'];
    var i;
    var _animationLayer;
    var newImg;
    var newImgWidth;
    var newImgHeight;
    var waitTime = 1000; // time after slot finished

    for( i = 0; i < layerLength; i++ ){
      if( animationLayer[i].attr('class') === className){
        layerNum = i;
        break;
      }
    }
    _animationLayer = animationLayer[layerNum];

    animationLayer.splice(layerNum, 1);
    layerLength--;

    _animationLayer.addClass( 'selected' );
    _animationLayer.css({ 'background-color': '#' + ns.countryList[ ns.nextNum ].color[ layers.indexOf(className) ] });

    // slot has finished
    if( layerLength === 0 ){
      newImg = new Image();
      newImg.onload = function(){ // check size of the flag image
        newImgWidth = newImg.width;
        newImgHeight = newImg.height;
        loadImage();
      };
      newImg.src = ns.countryList[ns.nextNum].imgPath; 
    }

    function loadImage(){
      $flagImg.attr({ src: ns.countryList[ns.nextNum].imgPath });

      if($flagImg.get(0).complete){
        imageLoaded();
      }
      else{
        $flagImg.on('load', imageLoaded); 
      }
    }

    function imageLoaded(){
      setTimeout(function(){
        that.fireEvent('SLOT_FINISHED', that, newImgWidth, newImgHeight);
        $filter.addClass( 'hide' );
      }, waitTime); 
    }
  };

  Slot.prototype.reset = function(){
    animationLayer =  [
      $('.firstLayer'),
      $('.secondLayer'),
      $('.thirdLayer')
    ];
    layerLength = animationLayer.length; 
  };

  Slot.getInstance = function(interval) {
    if (!instance) {
      instance = new Slot(interval);
    }
    return instance;
  };

  ns.Slot = Slot;
  global.kokki = ns;
})(this, document, jQuery, this.kokki);
