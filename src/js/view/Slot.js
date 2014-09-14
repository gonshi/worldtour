(function(global, doc, $, ns, undefined) {
	'use strict';
	ns = ns || {};	

  var originalConstructor;
  var	instance;
	var $flagImg = $('.flag').find('img');

	/*
	*	@param {number} interval 
	*	@return {undefined}
	*/
	
	function Slot(interval){
		this.INTERVAL = interval || 10;
		this.animationLayer = [ $('.firstLayer'),
														$('.secondLayer'),
														$('.thirdLayer') ];
		this.layerLength = this.animationLayer.length;
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
		var colorNum = ns.colorList.length;
		var GAP = [0, 4, 7];
		var i = 0;

		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
																		window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
		function changeColor(){
			if( frame  === that.INTERVAL ){
				for( i = 0; i < that.layerLength; i++){
					that.animationLayer[i].css({ 'background-color': ns.colorList[ ( colorPattern + GAP[i] ) % colorNum ] });
				}
				frame = 0;
				colorPattern++;
				if( colorPattern === colorNum ) colorPattern = 0;
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
	Slot.prototype.stop = function(className){
		var that = this;
		var layerNum;
		var layers = ['firstLayer', 'secondLayer', 'thirdLayer'];
		var i;
		var _animationLayer;
		var newImg;
		var newImgWidth;
		var newImgHeight;
		var waitTime = 1000; // time after slot finished

		for( i = 0; i < this.layerLength; i++ ){
			if( this.animationLayer[i].attr('class') === className){
				layerNum = i;
				break;
			}
		}
		_animationLayer = this.animationLayer[layerNum];

		this.animationLayer.splice(layerNum, 1);
		this.layerLength--;

		_animationLayer.addClass('selected');
		_animationLayer.css({ 'background-color': '#' + ns.countryList[ns.nextNum].color[layers.indexOf(className)] });

		// slot has finished
		if( this.layerLength === 0 ){
			newImg = new Image();
			newImg.onload = function(){
				newImgWidth = newImg.width;
				newImgHeight = newImg.height;
				loadImage();
			};
			newImg.src = ns.countryList[ns.nextNum].imgPath; 
		}

		function loadImage(){
			$flagImg.attr({ src: ns.countryList[ns.nextNum].imgPath });

			if($flagImg[0].complete){
				imageLoaded();
			}
			else{
				$flagImg.on('load', imageLoaded); 
			}
		}

		function imageLoaded(){
			setTimeout(function(){
				that.fireEvent('SLOT_FINISHED', that, newImgWidth, newImgHeight);
			}, waitTime); 
		}
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
