(function(global, doc, $, ns, undefined) {
  'use strict';
  ns = ns || {};  

  var originalConstructor;
  var  instance;

  /*
  *  @param {string} id
  *  @return {undefined}
  */

  function GetData(id){
    if(id){
      this.src = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/basic?alt=json-in-script';
    }
    else{
      console.log('[ERROR] id is not defined');
    }
   }

  originalConstructor = GetData.prototype.constructor;
  GetData.prototype = new ns.EventDispatcher();
  GetData.prototype.constructor = originalConstructor;

  /*
  *  @param {}
  *  @return {undefined}
  */

  GetData.prototype.exec = function(){
    $('head').append( $(document.createElement('script')).attr('src', this.src) );
  };

  GetData.getInstance = function(id) {
    if (!instance) {
      instance = new GetData(id);
    }
    return instance;
  };

  ns.GetData = GetData;
  global.kokki = ns;
})(this, document, jQuery, this.kokki);

// google API callback 
var gdata = {
      io: {}
    };
var originalConstructor;

gdata.io.handleScriptLoaded = function(response){
  'use strict';
  var data = response.feed.entry;
  var colorExp = /カラーコード: (.*?),/;
  var nameEngExp = /国名英語表記: (.*?),/;
  var imgPathExp = /画像url: (.*?),/;
  var latlngExp = /緯度経度: (.*?)$/;
  var eachColorExp = /(#\w*)/g;
  var colors;
  var ns = window.kokki;
  ns.colorList = [];
  ns.countryList = [];

  for(var i = 0; i < data.length; i++){
    ns.countryList[i] = {
      name: data[i].title.$t,
      color: data[i].content.$t.match(colorExp)[1].split('#').splice(1, 3), // separate three color codes by '#', and delete the first ( it'll be empty )
      nameEng: data[i].content.$t.match(nameEngExp)[1],
      imgPath: data[i].content.$t.match(imgPathExp)[1],
      latlng: data[i].content.$t.match(latlngExp)[1].split(':')
    };

    colors = data[i].content.$t.match(eachColorExp);
    ns.colorList = ns.colorList.concat(colors);
  }
  gdata.io.handleScriptLoaded.prototype.fireEvent('LOADED');
};

originalConstructor = gdata.io.handleScriptLoaded.prototype.constructor;
gdata.io.handleScriptLoaded.prototype = new window.kokki.EventDispatcher();
gdata.io.handleScriptLoaded.prototype.constructor = originalConstructor;
/////////////////////
