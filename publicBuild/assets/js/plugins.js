/* TidyCMS form */
(function($){var config={handler:null,formName:null,$form:null,tidypath:'tidycms/',before:false,success:false,error:false,};var methods={init:function(options){config=$.extend(config,options);if(this[0].tagName!=='FORM')return $.error('tidyForm - wrong tag type for form.');if(!this.attr('data-tidy-name'))return $.error('tidyForm - missing form attribute data-tidy-name="Name of your form"');if(!this.attr('data-tidy-handler'))return $.error('tidyForm - missing form attribute data-tidy-handler="HANDLERID"');config.$form=this;config.formName=this.attr('data-tidy-name');config.handler=this.attr('data-tidy-handler');config.serverpath=config.tidypath+'server.php?c=forms';methods.pingTidy(function(){config.$form.on('submit',methods.submitForm);});},pingTidy:function(callbackFn){if(typeof window.tidyExists!='undefined'&&window.tidyExists==true){callbackFn();return;}
$.ajax({url:config.serverpath+'&m=tidyExists',data:{hid:config.handler},dataType:'json',cache:false,success:function(){window.tidyExists=true;callbackFn();},error:function(jqXHR,status){$.error("tidyForm - wrong path to tidy, please set tidypath parameter correctly in tidyform options eg. $('#myform').tidyform({ tidypath: '/path/to/tidycms/' })");},});},submitForm:function(e){e.preventDefault();var fdata=config.$form.serializeTidyForm();if(typeof config.before=='function'&&config.before()===false){var bf=config.before(fdata);if(bf===false)return false;if(typeof bf=='object')fdata=bf;}
$.getJSON(config.serverpath+'&m=loadHandler',{hid:config.handler},function(res){if(!res.success&&res.msg=='error.handler.notvalidated')return alert('The handler of this form is not yet validated.');if(!res.success)return $.error(res.msg);if(res.handler.captcha_enabled){var rand=methods.getRandomInt(1000,9999);if(prompt(res.handler.captcha_text1+': '+rand)!=rand)return false;}
var fromEmail=(config.$form.find('[type=email]:first').length>0)?config.$form.find('[type=email]').val():false;$.getJSON(config.serverpath+'&m=sendForm',{hid:config.handler,name:config.formName,form:fdata,ref:window.location.href,fromadr:fromEmail,},function(res){res.data=fdata;if(!res.success){if(typeof config.error=='function')return config.error(res);return false;}
config.$form[0].reset();if(typeof config.success=='function')return config.success(res);return true;});});},getRandomInt:function(min,max){return Math.floor(Math.random()*(max-min+1))+min;},};$.fn.tidyform=function(methodOrOptions){return methods.init.apply(this,arguments);};$.fn.serializeTidyForm=function(){var o={};var a=this.serializeArray();$.each(a,function(){if(o[this.name]!==undefined){if(!o[this.name].push){o[this.name]=[o[this.name]];}
o[this.name].push(this.value||'');}else{o[this.name]=this.value||'';}});return o;};})(jQuery);
/*
 *  Vide - v0.3.5
 *  Easy as hell jQuery plugin for video backgrounds.
 *  http://vodkabears.github.io/vide/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):b("object"==typeof exports?require("jquery"):a.jQuery)}(this,function(a){"use strict";function b(a){var b,c,d,e,f,g,h,i={};for(f=a.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,",").split(","),h=0,g=f.length;g>h&&(c=f[h],-1===c.search(/^(http|https|ftp):\/\//)&&-1!==c.search(":"));h++)b=c.indexOf(":"),d=c.substring(0,b),e=c.substring(b+1),e||(e=void 0),"string"==typeof e&&(e="true"===e||("false"===e?!1:e)),"string"==typeof e&&(e=isNaN(e)?e:+e),i[d]=e;return null==d&&null==e?a:i}function c(a){a=""+a;var b,c,d,e=a.split(/\s+/),f="50%",g="50%";for(d=0,b=e.length;b>d;d++)c=e[d],"left"===c?f="0%":"right"===c?f="100%":"top"===c?g="0%":"bottom"===c?g="100%":"center"===c?0===d?f="50%":g="50%":0===d?f=c:g=c;return{x:f,y:g}}function d(b,c){var d=function(){c(this.src)};a('<img src="'+b+'.gif">').load(d),a('<img src="'+b+'.jpg">').load(d),a('<img src="'+b+'.jpeg">').load(d),a('<img src="'+b+'.png">').load(d)}function e(c,d,e){if(this.$element=a(c),"string"==typeof d&&(d=b(d)),e?"string"==typeof e&&(e=b(e)):e={},"string"==typeof d)d=d.replace(/\.\w*$/,"");else if("object"==typeof d)for(var f in d)d.hasOwnProperty(f)&&(d[f]=d[f].replace(/\.\w*$/,""));this.settings=a.extend({},g,e),this.path=d,this.init()}var f="vide",g={volume:1,playbackRate:1,muted:!0,loop:!0,autoplay:!0,position:"50% 50%",posterType:"detect",resizing:!0};e.prototype.init=function(){var b,e=this,g=c(e.settings.position),h="";e.$wrapper=a("<div>").css({position:"absolute","z-index":-1,top:0,left:0,bottom:0,right:0,overflow:"hidden","-webkit-background-size":"cover","-moz-background-size":"cover","-o-background-size":"cover","background-size":"cover","background-repeat":"no-repeat","background-position":g.x+" "+g.y}),b=e.path,"object"==typeof e.path&&(e.path.poster?b=e.path.poster:e.path.mp4?b=e.path.mp4:e.path.webm?b=e.path.webm:e.path.ogv&&(b=e.path.ogv)),"detect"===e.settings.posterType?d(b,function(a){e.$wrapper.css("background-image","url("+a+")")}):"none"!==e.settings.posterType&&e.$wrapper.css("background-image","url("+b+"."+e.settings.posterType+")"),"static"===e.$element.css("position")&&e.$element.css("position","relative"),e.$element.prepend(e.$wrapper),"object"==typeof e.path?(e.path.mp4&&(h+='<source src="'+e.path.mp4+'.mp4" type="video/mp4">'),e.path.webm&&(h+='<source src="'+e.path.webm+'.webm" type="video/webm">'),e.path.ogv&&(h+='<source src="'+e.path.ogv+'.ogv" type="video/ogv">'),e.$video=a("<video>"+h+"</video>")):e.$video=a('<video><source src="'+e.path+'.mp4" type="video/mp4"><source src="'+e.path+'.webm" type="video/webm"><source src="'+e.path+'.ogv" type="video/ogg"></video>'),e.$video.prop({autoplay:e.settings.autoplay,loop:e.settings.loop,volume:e.settings.volume,muted:e.settings.muted,defaultMuted:e.settings.muted,playbackRate:e.settings.playbackRate,defaultPlaybackRate:e.settings.playbackRate}).css({margin:"auto",position:"absolute","z-index":-1,top:g.y,left:g.x,"-webkit-transform":"translate(-"+g.x+", -"+g.y+")","-ms-transform":"translate(-"+g.x+", -"+g.y+")","-moz-transform":"translate(-"+g.x+", -"+g.y+")",transform:"translate(-"+g.x+", -"+g.y+")",visibility:"hidden"}).one("canplaythrough."+f,function(){e.resize()}).one("playing."+f,function(){e.$video.css("visibility","visible"),e.$wrapper.css("background-image","none")}),e.$element.on("resize."+f,function(){e.settings.resizing&&e.resize()}),e.$wrapper.append(e.$video)},e.prototype.getVideoObject=function(){return this.$video[0]},e.prototype.resize=function(){if(this.$video){var a=this.$video[0].videoHeight,b=this.$video[0].videoWidth,c=this.$wrapper.height(),d=this.$wrapper.width();this.$video.css(d/b>c/a?{width:d+2,height:"auto"}:{width:"auto",height:c+2})}},e.prototype.destroy=function(){this.$element.off(f),this.$video&&this.$video.off(f),delete a[f].lookup[this.index],this.$element.removeData(f),this.$wrapper.remove()},a[f]={lookup:[]},a.fn[f]=function(b,c){var d;return this.each(function(){d=a.data(this,f),d&&d.destroy(),d=new e(this,b,c),d.index=a[f].lookup.push(d)-1,a.data(this,f,d)}),this},a(document).ready(function(){var b=a(window);b.on("resize."+f,function(){for(var b,c=a[f].lookup.length,d=0;c>d;d++)b=a[f].lookup[d],b&&b.settings.resizing&&b.resize()}),b.on("unload."+f,function(){return!1}),a(document).find("[data-"+f+"-bg]").each(function(b,c){var d=a(c),e=d.data(f+"-options"),g=d.data(f+"-bg");d[f](g,e)})})});
/*!
Waypoints - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var n in t){var r=t[n];for(var s in this.waypoints[n]){var a,l,h,p,u,c=this.waypoints[n][s],d=c.options.offset,f=c.triggerPoint,w=0,y=null==f;c.element!==c.element.window&&(w=c.adapter.offset()[r.offsetProp]),"function"==typeof d?d=d.apply(c):"string"==typeof d&&(d=parseFloat(d),c.options.offset.indexOf("%")>-1&&(d=Math.ceil(r.contextDimension*d/100))),a=r.contextScroll-r.contextOffset,c.triggerPoint=w+a-d,l=f<r.oldScroll,h=c.triggerPoint>=r.oldScroll,p=l&&h,u=!l&&!h,!y&&p?(c.queueTrigger(r.backward),o[c.group.id]=c.group):!y&&u?(c.queueTrigger(r.forward),o[c.group.id]=c.group):y&&r.oldScroll>=c.triggerPoint&&(c.queueTrigger(r.forward),o[c.group.id]=c.group)}}for(var g in o)o[g].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
/*!
 * viewport-units-buggyfill v0.5.4
 * @web: https://github.com/rodneyrehm/viewport-units-buggyfill/
 * @author: Rodney Rehm - http://rodneyrehm.de/en/
 */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.viewportUnitsBuggyfill = factory();
  }
}(this, function () {
  'use strict';
  /*global document, window, navigator, location, XMLHttpRequest, XDomainRequest*/

  var initialized = false;
  var options;
  var userAgent = window.navigator.userAgent;
  var viewportUnitExpression = /([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g;
  var forEach = [].forEach;
  var dimensions;
  var declarations;
  var styleNode;
  var isBuggyIE = /MSIE [0-9]\./i.test(userAgent);
  var isOldIE = /MSIE [0-8]\./i.test(userAgent);
  var isOperaMini = userAgent.indexOf('Opera Mini') > -1;

  var isMobileSafari = /(iPhone|iPod|iPad).+AppleWebKit/i.test(userAgent) && (function() {
    // Regexp for iOS-version tested against the following userAgent strings:
    // Example WebView UserAgents:
    // * iOS Chrome on iOS8: "Mozilla/5.0 (iPad; CPU OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/39.0.2171.50 Mobile/12B410 Safari/600.1.4"
    // * iOS Facebook on iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D201 [FBAN/FBIOS;FBAV/12.1.0.24.20; FBBV/3214247; FBDV/iPhone6,1;FBMD/iPhone; FBSN/iPhone OS;FBSV/7.1.1; FBSS/2; FBCR/AT&T;FBID/phone;FBLC/en_US;FBOP/5]"
    // Example Safari UserAgents:
    // * Safari iOS8: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4"
    // * Safari iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A4449d Safari/9537.53"
    var iOSversion = userAgent.match(/OS (\d)/);
    // viewport units work fine in mobile Safari and webView on iOS 8+
    return iOSversion && iOSversion.length>1 && parseInt(iOSversion[1]) < 8;
  })();

  var isBadStockAndroid = (function() {
    // Android stock browser test derived from
    // http://stackoverflow.com/questions/24926221/distinguish-android-chrome-from-stock-browser-stock-browsers-user-agent-contai
    var isAndroid = userAgent.indexOf(' Android ') > -1;
    if (!isAndroid) {
      return false;
    }

    var isStockAndroid = userAgent.indexOf('Version/') > -1;
    if (!isStockAndroid) {
      return false;
    }

    var versionNumber = parseFloat((userAgent.match('Android ([0-9.]+)') || [])[1]);
    // anything below 4.4 uses WebKit without *any* viewport support,
    // 4.4 has issues with viewport units within calc()
    return versionNumber <= 4.4;
  })();

  // added check for IE11, since it *still* doesn't understand vmax!!!
  if (!isBuggyIE) {
    isBuggyIE = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
  }
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      var callback = function() {
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(callback, wait);
    };
  }

  // from http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  function initialize(initOptions) {
    if (initialized) {
      return;
    }

    if (initOptions === true) {
      initOptions = {
        force: true
      };
    }

    options = initOptions || {};
    options.isMobileSafari = isMobileSafari;
    options.isBadStockAndroid = isBadStockAndroid;

    if (isOldIE || (!options.force && !isMobileSafari && !isBuggyIE && !isBadStockAndroid && !isOperaMini && (!options.hacks || !options.hacks.required(options)))) {
      // this buggyfill only applies to mobile safari, IE9-10 and the Stock Android Browser.
      if (window.console && isOldIE) {
        console.info('viewport-units-buggyfill requires a proper CSSOM and basic viewport unit support, which are not available in IE8 and below');
      }

      return {
        init: function () {}
      };
    }

    options.hacks && options.hacks.initialize(options);

    initialized = true;
    styleNode = document.createElement('style');
    styleNode.id = 'patched-viewport';
    document.head.appendChild(styleNode);

    // Issue #6: Cross Origin Stylesheets are not accessible through CSSOM,
    // therefore download and inject them as <style> to circumvent SOP.
    importCrossOriginLinks(function() {
      var _refresh = debounce(refresh, options.refreshDebounceWait || 100);
      // doing a full refresh rather than updateStyles because an orientationchange
      // could activate different stylesheets
      window.addEventListener('orientationchange', _refresh, true);
      // orientationchange might have happened while in a different window
      window.addEventListener('pageshow', _refresh, true);

      if (options.force || isBuggyIE || inIframe()) {
        window.addEventListener('resize', _refresh, true);
        options._listeningToResize = true;
      }

      options.hacks && options.hacks.initializeEvents(options, refresh, _refresh);

      refresh();
    });
  }

  function updateStyles() {
    styleNode.textContent = getReplacedViewportUnits();
    // move to the end in case inline <style>s were added dynamically
    styleNode.parentNode.appendChild(styleNode);
  }

  function refresh() {
    if (!initialized) {
      return;
    }

    findProperties();

    // iOS Safari will report window.innerWidth and .innerHeight as 0 unless a timeout is used here.
    // TODO: figure out WHY innerWidth === 0
    setTimeout(function() {
      updateStyles();
    }, 1);
  }

  function findProperties() {
    declarations = [];
    forEach.call(document.styleSheets, function(sheet) {
      if (sheet.ownerNode.id === 'patched-viewport' || !sheet.cssRules || sheet.ownerNode.getAttribute('data-viewport-units-buggyfill') === 'ignore') {
        // skip entire sheet because no rules are present, it's supposed to be ignored or it's the target-element of the buggyfill
        return;
      }

      if (sheet.media && sheet.media.mediaText && window.matchMedia && !window.matchMedia(sheet.media.mediaText).matches) {
        // skip entire sheet because media attribute doesn't match
        return;
      }

      forEach.call(sheet.cssRules, findDeclarations);
    });

    return declarations;
  }

  function findDeclarations(rule) {
    if (rule.type === 7) {
      var value;

      // there may be a case where accessing cssText throws an error.
      // I could not reproduce this issue, but the worst that can happen
      // this way is an animation not running properly.
      // not awesome, but probably better than a script error
      // see https://github.com/rodneyrehm/viewport-units-buggyfill/issues/21
      try {
        value = rule.cssText;
      } catch(e) {
        return;
      }

      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        // KeyframesRule does not have a CSS-PropertyName
        declarations.push([rule, null, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, null, value);
      }

      return;
    }

    if (!rule.style) {
      if (!rule.cssRules) {
        return;
      }

      forEach.call(rule.cssRules, function(_rule) {
        findDeclarations(_rule);
      });

      return;
    }

    forEach.call(rule.style, function(name) {
      var value = rule.style.getPropertyValue(name);
      // preserve those !important rules
      if (rule.style.getPropertyPriority(name)) {
        value += ' !important';
      }

      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        declarations.push([rule, name, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, name, value);
      }
    });
  }

  function getReplacedViewportUnits() {
    dimensions = getViewport();

    var css = [];
    var buffer = [];
    var open;
    var close;

    declarations.forEach(function(item) {
      var _item = overwriteDeclaration.apply(null, item);
      var _open = _item.selector.length ? (_item.selector.join(' {\n') + ' {\n') : '';
      var _close = new Array(_item.selector.length + 1).join('\n}');

      if (!_open || _open !== open) {
        if (buffer.length) {
          css.push(open + buffer.join('\n') + close);
          buffer.length = 0;
        }

        if (_open) {
          open = _open;
          close = _close;
          buffer.push(_item.content);
        } else {
          css.push(_item.content);
          open = null;
          close = null;
        }

        return;
      }

      if (_open && !open) {
        open = _open;
        close = _close;
      }

      buffer.push(_item.content);
    });

    if (buffer.length) {
      css.push(open + buffer.join('\n') + close);
    }

    // Opera Mini messes up on the content hack (it replaces the DOM node's innerHTML with the value).
    // This fixes it. We test for Opera Mini only since it is the most expensive CSS selector
    // see https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors
    if (isOperaMini) {
      css.push('* { content: normal !important; }');
    }

    return css.join('\n\n');
  }

  function overwriteDeclaration(rule, name, value) {
    var _value;
    var _selectors = [];

    _value = value.replace(viewportUnitExpression, replaceValues);

    if (options.hacks) {
      _value = options.hacks.overwriteDeclaration(rule, name, _value);
    }

    if (name) {
      // skipping KeyframesRule
      _selectors.push(rule.selectorText);
      _value = name + ': ' + _value + ';';
    }

    var _rule = rule.parentRule;
    while (_rule) {
      _selectors.unshift('@media ' + _rule.media.mediaText);
      _rule = _rule.parentRule;
    }

    return {
      selector: _selectors,
      content: _value
    };
  }

  function replaceValues(match, number, unit) {
    var _base = dimensions[unit];
    var _number = parseFloat(number) / 100;
    return (_number * _base) + 'px';
  }

  function getViewport() {
    var vh = window.innerHeight;
    var vw = window.innerWidth;

    return {
      vh: vh,
      vw: vw,
      vmax: Math.max(vw, vh),
      vmin: Math.min(vw, vh)
    };
  }

  function importCrossOriginLinks(next) {
    var _waiting = 0;
    var decrease = function() {
      _waiting--;
      if (!_waiting) {
        next();
      }
    };

    forEach.call(document.styleSheets, function(sheet) {
      if (!sheet.href || origin(sheet.href) === origin(location.href) || sheet.ownerNode.getAttribute('data-viewport-units-buggyfill') === 'ignore') {
        // skip <style> and <link> from same origin or explicitly declared to ignore
        return;
      }

      _waiting++;
      convertLinkToStyle(sheet.ownerNode, decrease);
    });

    if (!_waiting) {
      next();
    }
  }

  function origin(url) {
    return url.slice(0, url.indexOf('/', url.indexOf('://') + 3));
  }

  function convertLinkToStyle(link, next) {
    getCors(link.href, function() {
      var style = document.createElement('style');
      style.media = link.media;
      style.setAttribute('data-href', link.href);
      style.textContent = this.responseText;
      link.parentNode.replaceChild(style, link);
      next();
    }, next);
  }

  function getCors(url, success, error) {
    var xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open('GET', url, true);
    } else if (typeof XDomainRequest !== 'undefined') {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open('GET', url);
    } else {
      throw new Error('cross-domain XHR not supported');
    }

    xhr.onload = success;
    xhr.onerror = error;
    xhr.send();
    return xhr;
  }

  return {
    version: '0.5.4',
    findProperties: findProperties,
    getCss: getReplacedViewportUnits,
    init: initialize,
    refresh: refresh
  };

}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS50aWR5Zm9ybS5taW4uanMiLCJqcXVlcnkudmlkZS5taW4uanMiLCJqcXVlcnkud2F5cG9pbnRzLm1pbi5qcyIsInZpZXdwb3J0LXVuaXRzLWJ1Z2d5ZmlsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBsdWdpbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaWR5Q01TIGZvcm0gKi9cbihmdW5jdGlvbigkKXt2YXIgY29uZmlnPXtoYW5kbGVyOm51bGwsZm9ybU5hbWU6bnVsbCwkZm9ybTpudWxsLHRpZHlwYXRoOid0aWR5Y21zLycsYmVmb3JlOmZhbHNlLHN1Y2Nlc3M6ZmFsc2UsZXJyb3I6ZmFsc2UsfTt2YXIgbWV0aG9kcz17aW5pdDpmdW5jdGlvbihvcHRpb25zKXtjb25maWc9JC5leHRlbmQoY29uZmlnLG9wdGlvbnMpO2lmKHRoaXNbMF0udGFnTmFtZSE9PSdGT1JNJylyZXR1cm4gJC5lcnJvcigndGlkeUZvcm0gLSB3cm9uZyB0YWcgdHlwZSBmb3IgZm9ybS4nKTtpZighdGhpcy5hdHRyKCdkYXRhLXRpZHktbmFtZScpKXJldHVybiAkLmVycm9yKCd0aWR5Rm9ybSAtIG1pc3NpbmcgZm9ybSBhdHRyaWJ1dGUgZGF0YS10aWR5LW5hbWU9XCJOYW1lIG9mIHlvdXIgZm9ybVwiJyk7aWYoIXRoaXMuYXR0cignZGF0YS10aWR5LWhhbmRsZXInKSlyZXR1cm4gJC5lcnJvcigndGlkeUZvcm0gLSBtaXNzaW5nIGZvcm0gYXR0cmlidXRlIGRhdGEtdGlkeS1oYW5kbGVyPVwiSEFORExFUklEXCInKTtjb25maWcuJGZvcm09dGhpcztjb25maWcuZm9ybU5hbWU9dGhpcy5hdHRyKCdkYXRhLXRpZHktbmFtZScpO2NvbmZpZy5oYW5kbGVyPXRoaXMuYXR0cignZGF0YS10aWR5LWhhbmRsZXInKTtjb25maWcuc2VydmVycGF0aD1jb25maWcudGlkeXBhdGgrJ3NlcnZlci5waHA/Yz1mb3Jtcyc7bWV0aG9kcy5waW5nVGlkeShmdW5jdGlvbigpe2NvbmZpZy4kZm9ybS5vbignc3VibWl0JyxtZXRob2RzLnN1Ym1pdEZvcm0pO30pO30scGluZ1RpZHk6ZnVuY3Rpb24oY2FsbGJhY2tGbil7aWYodHlwZW9mIHdpbmRvdy50aWR5RXhpc3RzIT0ndW5kZWZpbmVkJyYmd2luZG93LnRpZHlFeGlzdHM9PXRydWUpe2NhbGxiYWNrRm4oKTtyZXR1cm47fVxuJC5hamF4KHt1cmw6Y29uZmlnLnNlcnZlcnBhdGgrJyZtPXRpZHlFeGlzdHMnLGRhdGE6e2hpZDpjb25maWcuaGFuZGxlcn0sZGF0YVR5cGU6J2pzb24nLGNhY2hlOmZhbHNlLHN1Y2Nlc3M6ZnVuY3Rpb24oKXt3aW5kb3cudGlkeUV4aXN0cz10cnVlO2NhbGxiYWNrRm4oKTt9LGVycm9yOmZ1bmN0aW9uKGpxWEhSLHN0YXR1cyl7JC5lcnJvcihcInRpZHlGb3JtIC0gd3JvbmcgcGF0aCB0byB0aWR5LCBwbGVhc2Ugc2V0IHRpZHlwYXRoIHBhcmFtZXRlciBjb3JyZWN0bHkgaW4gdGlkeWZvcm0gb3B0aW9ucyBlZy4gJCgnI215Zm9ybScpLnRpZHlmb3JtKHsgdGlkeXBhdGg6ICcvcGF0aC90by90aWR5Y21zLycgfSlcIik7fSx9KTt9LHN1Ym1pdEZvcm06ZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpO3ZhciBmZGF0YT1jb25maWcuJGZvcm0uc2VyaWFsaXplVGlkeUZvcm0oKTtpZih0eXBlb2YgY29uZmlnLmJlZm9yZT09J2Z1bmN0aW9uJyYmY29uZmlnLmJlZm9yZSgpPT09ZmFsc2Upe3ZhciBiZj1jb25maWcuYmVmb3JlKGZkYXRhKTtpZihiZj09PWZhbHNlKXJldHVybiBmYWxzZTtpZih0eXBlb2YgYmY9PSdvYmplY3QnKWZkYXRhPWJmO31cbiQuZ2V0SlNPTihjb25maWcuc2VydmVycGF0aCsnJm09bG9hZEhhbmRsZXInLHtoaWQ6Y29uZmlnLmhhbmRsZXJ9LGZ1bmN0aW9uKHJlcyl7aWYoIXJlcy5zdWNjZXNzJiZyZXMubXNnPT0nZXJyb3IuaGFuZGxlci5ub3R2YWxpZGF0ZWQnKXJldHVybiBhbGVydCgnVGhlIGhhbmRsZXIgb2YgdGhpcyBmb3JtIGlzIG5vdCB5ZXQgdmFsaWRhdGVkLicpO2lmKCFyZXMuc3VjY2VzcylyZXR1cm4gJC5lcnJvcihyZXMubXNnKTtpZihyZXMuaGFuZGxlci5jYXB0Y2hhX2VuYWJsZWQpe3ZhciByYW5kPW1ldGhvZHMuZ2V0UmFuZG9tSW50KDEwMDAsOTk5OSk7aWYocHJvbXB0KHJlcy5oYW5kbGVyLmNhcHRjaGFfdGV4dDErJzogJytyYW5kKSE9cmFuZClyZXR1cm4gZmFsc2U7fVxudmFyIGZyb21FbWFpbD0oY29uZmlnLiRmb3JtLmZpbmQoJ1t0eXBlPWVtYWlsXTpmaXJzdCcpLmxlbmd0aD4wKT9jb25maWcuJGZvcm0uZmluZCgnW3R5cGU9ZW1haWxdJykudmFsKCk6ZmFsc2U7JC5nZXRKU09OKGNvbmZpZy5zZXJ2ZXJwYXRoKycmbT1zZW5kRm9ybScse2hpZDpjb25maWcuaGFuZGxlcixuYW1lOmNvbmZpZy5mb3JtTmFtZSxmb3JtOmZkYXRhLHJlZjp3aW5kb3cubG9jYXRpb24uaHJlZixmcm9tYWRyOmZyb21FbWFpbCx9LGZ1bmN0aW9uKHJlcyl7cmVzLmRhdGE9ZmRhdGE7aWYoIXJlcy5zdWNjZXNzKXtpZih0eXBlb2YgY29uZmlnLmVycm9yPT0nZnVuY3Rpb24nKXJldHVybiBjb25maWcuZXJyb3IocmVzKTtyZXR1cm4gZmFsc2U7fVxuY29uZmlnLiRmb3JtWzBdLnJlc2V0KCk7aWYodHlwZW9mIGNvbmZpZy5zdWNjZXNzPT0nZnVuY3Rpb24nKXJldHVybiBjb25maWcuc3VjY2VzcyhyZXMpO3JldHVybiB0cnVlO30pO30pO30sZ2V0UmFuZG9tSW50OmZ1bmN0aW9uKG1pbixtYXgpe3JldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKG1heC1taW4rMSkpK21pbjt9LH07JC5mbi50aWR5Zm9ybT1mdW5jdGlvbihtZXRob2RPck9wdGlvbnMpe3JldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcyxhcmd1bWVudHMpO307JC5mbi5zZXJpYWxpemVUaWR5Rm9ybT1mdW5jdGlvbigpe3ZhciBvPXt9O3ZhciBhPXRoaXMuc2VyaWFsaXplQXJyYXkoKTskLmVhY2goYSxmdW5jdGlvbigpe2lmKG9bdGhpcy5uYW1lXSE9PXVuZGVmaW5lZCl7aWYoIW9bdGhpcy5uYW1lXS5wdXNoKXtvW3RoaXMubmFtZV09W29bdGhpcy5uYW1lXV07fVxub1t0aGlzLm5hbWVdLnB1c2godGhpcy52YWx1ZXx8JycpO31lbHNle29bdGhpcy5uYW1lXT10aGlzLnZhbHVlfHwnJzt9fSk7cmV0dXJuIG87fTt9KShqUXVlcnkpOyIsIi8qXG4gKiAgVmlkZSAtIHYwLjMuNVxuICogIEVhc3kgYXMgaGVsbCBqUXVlcnkgcGx1Z2luIGZvciB2aWRlbyBiYWNrZ3JvdW5kcy5cbiAqICBodHRwOi8vdm9ka2FiZWFycy5naXRodWIuaW8vdmlkZS9cbiAqXG4gKiAgTWFkZSBieSBJbHlhIE1ha2Fyb3ZcbiAqICBVbmRlciBNSVQgTGljZW5zZVxuICovXG4hZnVuY3Rpb24oYSxiKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcImpxdWVyeVwiXSxiKTpiKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP3JlcXVpcmUoXCJqcXVlcnlcIik6YS5qUXVlcnkpfSh0aGlzLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSl7dmFyIGIsYyxkLGUsZixnLGgsaT17fTtmb3IoZj1hLnJlcGxhY2UoL1xccyo6XFxzKi9nLFwiOlwiKS5yZXBsYWNlKC9cXHMqLFxccyovZyxcIixcIikuc3BsaXQoXCIsXCIpLGg9MCxnPWYubGVuZ3RoO2c+aCYmKGM9ZltoXSwtMT09PWMuc2VhcmNoKC9eKGh0dHB8aHR0cHN8ZnRwKTpcXC9cXC8vKSYmLTEhPT1jLnNlYXJjaChcIjpcIikpO2grKyliPWMuaW5kZXhPZihcIjpcIiksZD1jLnN1YnN0cmluZygwLGIpLGU9Yy5zdWJzdHJpbmcoYisxKSxlfHwoZT12b2lkIDApLFwic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1cInRydWVcIj09PWV8fChcImZhbHNlXCI9PT1lPyExOmUpKSxcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9aXNOYU4oZSk/ZTorZSksaVtkXT1lO3JldHVybiBudWxsPT1kJiZudWxsPT1lP2E6aX1mdW5jdGlvbiBjKGEpe2E9XCJcIithO3ZhciBiLGMsZCxlPWEuc3BsaXQoL1xccysvKSxmPVwiNTAlXCIsZz1cIjUwJVwiO2ZvcihkPTAsYj1lLmxlbmd0aDtiPmQ7ZCsrKWM9ZVtkXSxcImxlZnRcIj09PWM/Zj1cIjAlXCI6XCJyaWdodFwiPT09Yz9mPVwiMTAwJVwiOlwidG9wXCI9PT1jP2c9XCIwJVwiOlwiYm90dG9tXCI9PT1jP2c9XCIxMDAlXCI6XCJjZW50ZXJcIj09PWM/MD09PWQ/Zj1cIjUwJVwiOmc9XCI1MCVcIjowPT09ZD9mPWM6Zz1jO3JldHVybnt4OmYseTpnfX1mdW5jdGlvbiBkKGIsYyl7dmFyIGQ9ZnVuY3Rpb24oKXtjKHRoaXMuc3JjKX07YSgnPGltZyBzcmM9XCInK2IrJy5naWZcIj4nKS5sb2FkKGQpLGEoJzxpbWcgc3JjPVwiJytiKycuanBnXCI+JykubG9hZChkKSxhKCc8aW1nIHNyYz1cIicrYisnLmpwZWdcIj4nKS5sb2FkKGQpLGEoJzxpbWcgc3JjPVwiJytiKycucG5nXCI+JykubG9hZChkKX1mdW5jdGlvbiBlKGMsZCxlKXtpZih0aGlzLiRlbGVtZW50PWEoYyksXCJzdHJpbmdcIj09dHlwZW9mIGQmJihkPWIoZCkpLGU/XCJzdHJpbmdcIj09dHlwZW9mIGUmJihlPWIoZSkpOmU9e30sXCJzdHJpbmdcIj09dHlwZW9mIGQpZD1kLnJlcGxhY2UoL1xcLlxcdyokLyxcIlwiKTtlbHNlIGlmKFwib2JqZWN0XCI9PXR5cGVvZiBkKWZvcih2YXIgZiBpbiBkKWQuaGFzT3duUHJvcGVydHkoZikmJihkW2ZdPWRbZl0ucmVwbGFjZSgvXFwuXFx3KiQvLFwiXCIpKTt0aGlzLnNldHRpbmdzPWEuZXh0ZW5kKHt9LGcsZSksdGhpcy5wYXRoPWQsdGhpcy5pbml0KCl9dmFyIGY9XCJ2aWRlXCIsZz17dm9sdW1lOjEscGxheWJhY2tSYXRlOjEsbXV0ZWQ6ITAsbG9vcDohMCxhdXRvcGxheTohMCxwb3NpdGlvbjpcIjUwJSA1MCVcIixwb3N0ZXJUeXBlOlwiZGV0ZWN0XCIscmVzaXppbmc6ITB9O2UucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXt2YXIgYixlPXRoaXMsZz1jKGUuc2V0dGluZ3MucG9zaXRpb24pLGg9XCJcIjtlLiR3cmFwcGVyPWEoXCI8ZGl2PlwiKS5jc3Moe3Bvc2l0aW9uOlwiYWJzb2x1dGVcIixcInotaW5kZXhcIjotMSx0b3A6MCxsZWZ0OjAsYm90dG9tOjAscmlnaHQ6MCxvdmVyZmxvdzpcImhpZGRlblwiLFwiLXdlYmtpdC1iYWNrZ3JvdW5kLXNpemVcIjpcImNvdmVyXCIsXCItbW96LWJhY2tncm91bmQtc2l6ZVwiOlwiY292ZXJcIixcIi1vLWJhY2tncm91bmQtc2l6ZVwiOlwiY292ZXJcIixcImJhY2tncm91bmQtc2l6ZVwiOlwiY292ZXJcIixcImJhY2tncm91bmQtcmVwZWF0XCI6XCJuby1yZXBlYXRcIixcImJhY2tncm91bmQtcG9zaXRpb25cIjpnLngrXCIgXCIrZy55fSksYj1lLnBhdGgsXCJvYmplY3RcIj09dHlwZW9mIGUucGF0aCYmKGUucGF0aC5wb3N0ZXI/Yj1lLnBhdGgucG9zdGVyOmUucGF0aC5tcDQ/Yj1lLnBhdGgubXA0OmUucGF0aC53ZWJtP2I9ZS5wYXRoLndlYm06ZS5wYXRoLm9ndiYmKGI9ZS5wYXRoLm9ndikpLFwiZGV0ZWN0XCI9PT1lLnNldHRpbmdzLnBvc3RlclR5cGU/ZChiLGZ1bmN0aW9uKGEpe2UuJHdyYXBwZXIuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLFwidXJsKFwiK2ErXCIpXCIpfSk6XCJub25lXCIhPT1lLnNldHRpbmdzLnBvc3RlclR5cGUmJmUuJHdyYXBwZXIuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLFwidXJsKFwiK2IrXCIuXCIrZS5zZXR0aW5ncy5wb3N0ZXJUeXBlK1wiKVwiKSxcInN0YXRpY1wiPT09ZS4kZWxlbWVudC5jc3MoXCJwb3NpdGlvblwiKSYmZS4kZWxlbWVudC5jc3MoXCJwb3NpdGlvblwiLFwicmVsYXRpdmVcIiksZS4kZWxlbWVudC5wcmVwZW5kKGUuJHdyYXBwZXIpLFwib2JqZWN0XCI9PXR5cGVvZiBlLnBhdGg/KGUucGF0aC5tcDQmJihoKz0nPHNvdXJjZSBzcmM9XCInK2UucGF0aC5tcDQrJy5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+JyksZS5wYXRoLndlYm0mJihoKz0nPHNvdXJjZSBzcmM9XCInK2UucGF0aC53ZWJtKycud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+JyksZS5wYXRoLm9ndiYmKGgrPSc8c291cmNlIHNyYz1cIicrZS5wYXRoLm9ndisnLm9ndlwiIHR5cGU9XCJ2aWRlby9vZ3ZcIj4nKSxlLiR2aWRlbz1hKFwiPHZpZGVvPlwiK2grXCI8L3ZpZGVvPlwiKSk6ZS4kdmlkZW89YSgnPHZpZGVvPjxzb3VyY2Ugc3JjPVwiJytlLnBhdGgrJy5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+PHNvdXJjZSBzcmM9XCInK2UucGF0aCsnLndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPjxzb3VyY2Ugc3JjPVwiJytlLnBhdGgrJy5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+PC92aWRlbz4nKSxlLiR2aWRlby5wcm9wKHthdXRvcGxheTplLnNldHRpbmdzLmF1dG9wbGF5LGxvb3A6ZS5zZXR0aW5ncy5sb29wLHZvbHVtZTplLnNldHRpbmdzLnZvbHVtZSxtdXRlZDplLnNldHRpbmdzLm11dGVkLGRlZmF1bHRNdXRlZDplLnNldHRpbmdzLm11dGVkLHBsYXliYWNrUmF0ZTplLnNldHRpbmdzLnBsYXliYWNrUmF0ZSxkZWZhdWx0UGxheWJhY2tSYXRlOmUuc2V0dGluZ3MucGxheWJhY2tSYXRlfSkuY3NzKHttYXJnaW46XCJhdXRvXCIscG9zaXRpb246XCJhYnNvbHV0ZVwiLFwiei1pbmRleFwiOi0xLHRvcDpnLnksbGVmdDpnLngsXCItd2Via2l0LXRyYW5zZm9ybVwiOlwidHJhbnNsYXRlKC1cIitnLngrXCIsIC1cIitnLnkrXCIpXCIsXCItbXMtdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGUoLVwiK2cueCtcIiwgLVwiK2cueStcIilcIixcIi1tb3otdHJhbnNmb3JtXCI6XCJ0cmFuc2xhdGUoLVwiK2cueCtcIiwgLVwiK2cueStcIilcIix0cmFuc2Zvcm06XCJ0cmFuc2xhdGUoLVwiK2cueCtcIiwgLVwiK2cueStcIilcIix2aXNpYmlsaXR5OlwiaGlkZGVuXCJ9KS5vbmUoXCJjYW5wbGF5dGhyb3VnaC5cIitmLGZ1bmN0aW9uKCl7ZS5yZXNpemUoKX0pLm9uZShcInBsYXlpbmcuXCIrZixmdW5jdGlvbigpe2UuJHZpZGVvLmNzcyhcInZpc2liaWxpdHlcIixcInZpc2libGVcIiksZS4kd3JhcHBlci5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsXCJub25lXCIpfSksZS4kZWxlbWVudC5vbihcInJlc2l6ZS5cIitmLGZ1bmN0aW9uKCl7ZS5zZXR0aW5ncy5yZXNpemluZyYmZS5yZXNpemUoKX0pLGUuJHdyYXBwZXIuYXBwZW5kKGUuJHZpZGVvKX0sZS5wcm90b3R5cGUuZ2V0VmlkZW9PYmplY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kdmlkZW9bMF19LGUucHJvdG90eXBlLnJlc2l6ZT1mdW5jdGlvbigpe2lmKHRoaXMuJHZpZGVvKXt2YXIgYT10aGlzLiR2aWRlb1swXS52aWRlb0hlaWdodCxiPXRoaXMuJHZpZGVvWzBdLnZpZGVvV2lkdGgsYz10aGlzLiR3cmFwcGVyLmhlaWdodCgpLGQ9dGhpcy4kd3JhcHBlci53aWR0aCgpO3RoaXMuJHZpZGVvLmNzcyhkL2I+Yy9hP3t3aWR0aDpkKzIsaGVpZ2h0OlwiYXV0b1wifTp7d2lkdGg6XCJhdXRvXCIsaGVpZ2h0OmMrMn0pfX0sZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuJGVsZW1lbnQub2ZmKGYpLHRoaXMuJHZpZGVvJiZ0aGlzLiR2aWRlby5vZmYoZiksZGVsZXRlIGFbZl0ubG9va3VwW3RoaXMuaW5kZXhdLHRoaXMuJGVsZW1lbnQucmVtb3ZlRGF0YShmKSx0aGlzLiR3cmFwcGVyLnJlbW92ZSgpfSxhW2ZdPXtsb29rdXA6W119LGEuZm5bZl09ZnVuY3Rpb24oYixjKXt2YXIgZDtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ZD1hLmRhdGEodGhpcyxmKSxkJiZkLmRlc3Ryb3koKSxkPW5ldyBlKHRoaXMsYixjKSxkLmluZGV4PWFbZl0ubG9va3VwLnB1c2goZCktMSxhLmRhdGEodGhpcyxmLGQpfSksdGhpc30sYShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXt2YXIgYj1hKHdpbmRvdyk7Yi5vbihcInJlc2l6ZS5cIitmLGZ1bmN0aW9uKCl7Zm9yKHZhciBiLGM9YVtmXS5sb29rdXAubGVuZ3RoLGQ9MDtjPmQ7ZCsrKWI9YVtmXS5sb29rdXBbZF0sYiYmYi5zZXR0aW5ncy5yZXNpemluZyYmYi5yZXNpemUoKX0pLGIub24oXCJ1bmxvYWQuXCIrZixmdW5jdGlvbigpe3JldHVybiExfSksYShkb2N1bWVudCkuZmluZChcIltkYXRhLVwiK2YrXCItYmddXCIpLmVhY2goZnVuY3Rpb24oYixjKXt2YXIgZD1hKGMpLGU9ZC5kYXRhKGYrXCItb3B0aW9uc1wiKSxnPWQuZGF0YShmK1wiLWJnXCIpO2RbZl0oZyxlKX0pfSl9KTsiLCIvKiFcbldheXBvaW50cyAtIDMuMS4xXG5Db3B5cmlnaHQgwqkgMjAxMS0yMDE1IENhbGViIFRyb3VnaHRvblxuTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuaHR0cHM6Ly9naXRodWIuY29tL2ltYWtld2VidGhpbmdzL3dheXBvaW50cy9ibG9nL21hc3Rlci9saWNlbnNlcy50eHRcbiovXG4hZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KG8pe2lmKCFvKXRocm93IG5ldyBFcnJvcihcIk5vIG9wdGlvbnMgcGFzc2VkIHRvIFdheXBvaW50IGNvbnN0cnVjdG9yXCIpO2lmKCFvLmVsZW1lbnQpdGhyb3cgbmV3IEVycm9yKFwiTm8gZWxlbWVudCBvcHRpb24gcGFzc2VkIHRvIFdheXBvaW50IGNvbnN0cnVjdG9yXCIpO2lmKCFvLmhhbmRsZXIpdGhyb3cgbmV3IEVycm9yKFwiTm8gaGFuZGxlciBvcHRpb24gcGFzc2VkIHRvIFdheXBvaW50IGNvbnN0cnVjdG9yXCIpO3RoaXMua2V5PVwid2F5cG9pbnQtXCIrZSx0aGlzLm9wdGlvbnM9dC5BZGFwdGVyLmV4dGVuZCh7fSx0LmRlZmF1bHRzLG8pLHRoaXMuZWxlbWVudD10aGlzLm9wdGlvbnMuZWxlbWVudCx0aGlzLmFkYXB0ZXI9bmV3IHQuQWRhcHRlcih0aGlzLmVsZW1lbnQpLHRoaXMuY2FsbGJhY2s9by5oYW5kbGVyLHRoaXMuYXhpcz10aGlzLm9wdGlvbnMuaG9yaXpvbnRhbD9cImhvcml6b250YWxcIjpcInZlcnRpY2FsXCIsdGhpcy5lbmFibGVkPXRoaXMub3B0aW9ucy5lbmFibGVkLHRoaXMudHJpZ2dlclBvaW50PW51bGwsdGhpcy5ncm91cD10Lkdyb3VwLmZpbmRPckNyZWF0ZSh7bmFtZTp0aGlzLm9wdGlvbnMuZ3JvdXAsYXhpczp0aGlzLmF4aXN9KSx0aGlzLmNvbnRleHQ9dC5Db250ZXh0LmZpbmRPckNyZWF0ZUJ5RWxlbWVudCh0aGlzLm9wdGlvbnMuY29udGV4dCksdC5vZmZzZXRBbGlhc2VzW3RoaXMub3B0aW9ucy5vZmZzZXRdJiYodGhpcy5vcHRpb25zLm9mZnNldD10Lm9mZnNldEFsaWFzZXNbdGhpcy5vcHRpb25zLm9mZnNldF0pLHRoaXMuZ3JvdXAuYWRkKHRoaXMpLHRoaXMuY29udGV4dC5hZGQodGhpcyksaVt0aGlzLmtleV09dGhpcyxlKz0xfXZhciBlPTAsaT17fTt0LnByb3RvdHlwZS5xdWV1ZVRyaWdnZXI9ZnVuY3Rpb24odCl7dGhpcy5ncm91cC5xdWV1ZVRyaWdnZXIodGhpcyx0KX0sdC5wcm90b3R5cGUudHJpZ2dlcj1mdW5jdGlvbih0KXt0aGlzLmVuYWJsZWQmJnRoaXMuY2FsbGJhY2smJnRoaXMuY2FsbGJhY2suYXBwbHkodGhpcyx0KX0sdC5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuY29udGV4dC5yZW1vdmUodGhpcyksdGhpcy5ncm91cC5yZW1vdmUodGhpcyksZGVsZXRlIGlbdGhpcy5rZXldfSx0LnByb3RvdHlwZS5kaXNhYmxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW5hYmxlZD0hMSx0aGlzfSx0LnByb3RvdHlwZS5lbmFibGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0LnJlZnJlc2goKSx0aGlzLmVuYWJsZWQ9ITAsdGhpc30sdC5wcm90b3R5cGUubmV4dD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdyb3VwLm5leHQodGhpcyl9LHQucHJvdG90eXBlLnByZXZpb3VzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ3JvdXAucHJldmlvdXModGhpcyl9LHQuaW52b2tlQWxsPWZ1bmN0aW9uKHQpe3ZhciBlPVtdO2Zvcih2YXIgbyBpbiBpKWUucHVzaChpW29dKTtmb3IodmFyIG49MCxyPWUubGVuZ3RoO3I+bjtuKyspZVtuXVt0XSgpfSx0LmRlc3Ryb3lBbGw9ZnVuY3Rpb24oKXt0Lmludm9rZUFsbChcImRlc3Ryb3lcIil9LHQuZGlzYWJsZUFsbD1mdW5jdGlvbigpe3QuaW52b2tlQWxsKFwiZGlzYWJsZVwiKX0sdC5lbmFibGVBbGw9ZnVuY3Rpb24oKXt0Lmludm9rZUFsbChcImVuYWJsZVwiKX0sdC5yZWZyZXNoQWxsPWZ1bmN0aW9uKCl7dC5Db250ZXh0LnJlZnJlc2hBbGwoKX0sdC52aWV3cG9ydEhlaWdodD1mdW5jdGlvbigpe3JldHVybiB3aW5kb3cuaW5uZXJIZWlnaHR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR9LHQudmlld3BvcnRXaWR0aD1mdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGh9LHQuYWRhcHRlcnM9W10sdC5kZWZhdWx0cz17Y29udGV4dDp3aW5kb3csY29udGludW91czohMCxlbmFibGVkOiEwLGdyb3VwOlwiZGVmYXVsdFwiLGhvcml6b250YWw6ITEsb2Zmc2V0OjB9LHQub2Zmc2V0QWxpYXNlcz17XCJib3R0b20taW4tdmlld1wiOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dC5pbm5lckhlaWdodCgpLXRoaXMuYWRhcHRlci5vdXRlckhlaWdodCgpfSxcInJpZ2h0LWluLXZpZXdcIjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbnRleHQuaW5uZXJXaWR0aCgpLXRoaXMuYWRhcHRlci5vdXRlcldpZHRoKCl9fSx3aW5kb3cuV2F5cG9pbnQ9dH0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7d2luZG93LnNldFRpbWVvdXQodCwxZTMvNjApfWZ1bmN0aW9uIGUodCl7dGhpcy5lbGVtZW50PXQsdGhpcy5BZGFwdGVyPW4uQWRhcHRlcix0aGlzLmFkYXB0ZXI9bmV3IHRoaXMuQWRhcHRlcih0KSx0aGlzLmtleT1cIndheXBvaW50LWNvbnRleHQtXCIraSx0aGlzLmRpZFNjcm9sbD0hMSx0aGlzLmRpZFJlc2l6ZT0hMSx0aGlzLm9sZFNjcm9sbD17eDp0aGlzLmFkYXB0ZXIuc2Nyb2xsTGVmdCgpLHk6dGhpcy5hZGFwdGVyLnNjcm9sbFRvcCgpfSx0aGlzLndheXBvaW50cz17dmVydGljYWw6e30saG9yaXpvbnRhbDp7fX0sdC53YXlwb2ludENvbnRleHRLZXk9dGhpcy5rZXksb1t0LndheXBvaW50Q29udGV4dEtleV09dGhpcyxpKz0xLHRoaXMuY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlcigpLHRoaXMuY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlcigpfXZhciBpPTAsbz17fSxuPXdpbmRvdy5XYXlwb2ludCxyPXdpbmRvdy5vbmxvYWQ7ZS5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3ZhciBlPXQub3B0aW9ucy5ob3Jpem9udGFsP1wiaG9yaXpvbnRhbFwiOlwidmVydGljYWxcIjt0aGlzLndheXBvaW50c1tlXVt0LmtleV09dCx0aGlzLnJlZnJlc2goKX0sZS5wcm90b3R5cGUuY2hlY2tFbXB0eT1mdW5jdGlvbigpe3ZhciB0PXRoaXMuQWRhcHRlci5pc0VtcHR5T2JqZWN0KHRoaXMud2F5cG9pbnRzLmhvcml6b250YWwpLGU9dGhpcy5BZGFwdGVyLmlzRW1wdHlPYmplY3QodGhpcy53YXlwb2ludHMudmVydGljYWwpO3QmJmUmJih0aGlzLmFkYXB0ZXIub2ZmKFwiLndheXBvaW50c1wiKSxkZWxldGUgb1t0aGlzLmtleV0pfSxlLnByb3RvdHlwZS5jcmVhdGVUaHJvdHRsZWRSZXNpemVIYW5kbGVyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe2UuaGFuZGxlUmVzaXplKCksZS5kaWRSZXNpemU9ITF9dmFyIGU9dGhpczt0aGlzLmFkYXB0ZXIub24oXCJyZXNpemUud2F5cG9pbnRzXCIsZnVuY3Rpb24oKXtlLmRpZFJlc2l6ZXx8KGUuZGlkUmVzaXplPSEwLG4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHQpKX0pfSxlLnByb3RvdHlwZS5jcmVhdGVUaHJvdHRsZWRTY3JvbGxIYW5kbGVyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe2UuaGFuZGxlU2Nyb2xsKCksZS5kaWRTY3JvbGw9ITF9dmFyIGU9dGhpczt0aGlzLmFkYXB0ZXIub24oXCJzY3JvbGwud2F5cG9pbnRzXCIsZnVuY3Rpb24oKXsoIWUuZGlkU2Nyb2xsfHxuLmlzVG91Y2gpJiYoZS5kaWRTY3JvbGw9ITAsbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodCkpfSl9LGUucHJvdG90eXBlLmhhbmRsZVJlc2l6ZT1mdW5jdGlvbigpe24uQ29udGV4dC5yZWZyZXNoQWxsKCl9LGUucHJvdG90eXBlLmhhbmRsZVNjcm9sbD1mdW5jdGlvbigpe3ZhciB0PXt9LGU9e2hvcml6b250YWw6e25ld1Njcm9sbDp0aGlzLmFkYXB0ZXIuc2Nyb2xsTGVmdCgpLG9sZFNjcm9sbDp0aGlzLm9sZFNjcm9sbC54LGZvcndhcmQ6XCJyaWdodFwiLGJhY2t3YXJkOlwibGVmdFwifSx2ZXJ0aWNhbDp7bmV3U2Nyb2xsOnRoaXMuYWRhcHRlci5zY3JvbGxUb3AoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueSxmb3J3YXJkOlwiZG93blwiLGJhY2t3YXJkOlwidXBcIn19O2Zvcih2YXIgaSBpbiBlKXt2YXIgbz1lW2ldLG49by5uZXdTY3JvbGw+by5vbGRTY3JvbGwscj1uP28uZm9yd2FyZDpvLmJhY2t3YXJkO2Zvcih2YXIgcyBpbiB0aGlzLndheXBvaW50c1tpXSl7dmFyIGE9dGhpcy53YXlwb2ludHNbaV1bc10sbD1vLm9sZFNjcm9sbDxhLnRyaWdnZXJQb2ludCxoPW8ubmV3U2Nyb2xsPj1hLnRyaWdnZXJQb2ludCxwPWwmJmgsdT0hbCYmIWg7KHB8fHUpJiYoYS5xdWV1ZVRyaWdnZXIociksdFthLmdyb3VwLmlkXT1hLmdyb3VwKX19Zm9yKHZhciBjIGluIHQpdFtjXS5mbHVzaFRyaWdnZXJzKCk7dGhpcy5vbGRTY3JvbGw9e3g6ZS5ob3Jpem9udGFsLm5ld1Njcm9sbCx5OmUudmVydGljYWwubmV3U2Nyb2xsfX0sZS5wcm90b3R5cGUuaW5uZXJIZWlnaHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbGVtZW50PT10aGlzLmVsZW1lbnQud2luZG93P24udmlld3BvcnRIZWlnaHQoKTp0aGlzLmFkYXB0ZXIuaW5uZXJIZWlnaHQoKX0sZS5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKHQpe2RlbGV0ZSB0aGlzLndheXBvaW50c1t0LmF4aXNdW3Qua2V5XSx0aGlzLmNoZWNrRW1wdHkoKX0sZS5wcm90b3R5cGUuaW5uZXJXaWR0aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVsZW1lbnQ9PXRoaXMuZWxlbWVudC53aW5kb3c/bi52aWV3cG9ydFdpZHRoKCk6dGhpcy5hZGFwdGVyLmlubmVyV2lkdGgoKX0sZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3ZhciB0PVtdO2Zvcih2YXIgZSBpbiB0aGlzLndheXBvaW50cylmb3IodmFyIGkgaW4gdGhpcy53YXlwb2ludHNbZV0pdC5wdXNoKHRoaXMud2F5cG9pbnRzW2VdW2ldKTtmb3IodmFyIG89MCxuPXQubGVuZ3RoO24+bztvKyspdFtvXS5kZXN0cm95KCl9LGUucHJvdG90eXBlLnJlZnJlc2g9ZnVuY3Rpb24oKXt2YXIgdCxlPXRoaXMuZWxlbWVudD09dGhpcy5lbGVtZW50LndpbmRvdyxpPXRoaXMuYWRhcHRlci5vZmZzZXQoKSxvPXt9O3RoaXMuaGFuZGxlU2Nyb2xsKCksdD17aG9yaXpvbnRhbDp7Y29udGV4dE9mZnNldDplPzA6aS5sZWZ0LGNvbnRleHRTY3JvbGw6ZT8wOnRoaXMub2xkU2Nyb2xsLngsY29udGV4dERpbWVuc2lvbjp0aGlzLmlubmVyV2lkdGgoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueCxmb3J3YXJkOlwicmlnaHRcIixiYWNrd2FyZDpcImxlZnRcIixvZmZzZXRQcm9wOlwibGVmdFwifSx2ZXJ0aWNhbDp7Y29udGV4dE9mZnNldDplPzA6aS50b3AsY29udGV4dFNjcm9sbDplPzA6dGhpcy5vbGRTY3JvbGwueSxjb250ZXh0RGltZW5zaW9uOnRoaXMuaW5uZXJIZWlnaHQoKSxvbGRTY3JvbGw6dGhpcy5vbGRTY3JvbGwueSxmb3J3YXJkOlwiZG93blwiLGJhY2t3YXJkOlwidXBcIixvZmZzZXRQcm9wOlwidG9wXCJ9fTtmb3IodmFyIG4gaW4gdCl7dmFyIHI9dFtuXTtmb3IodmFyIHMgaW4gdGhpcy53YXlwb2ludHNbbl0pe3ZhciBhLGwsaCxwLHUsYz10aGlzLndheXBvaW50c1tuXVtzXSxkPWMub3B0aW9ucy5vZmZzZXQsZj1jLnRyaWdnZXJQb2ludCx3PTAseT1udWxsPT1mO2MuZWxlbWVudCE9PWMuZWxlbWVudC53aW5kb3cmJih3PWMuYWRhcHRlci5vZmZzZXQoKVtyLm9mZnNldFByb3BdKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkP2Q9ZC5hcHBseShjKTpcInN0cmluZ1wiPT10eXBlb2YgZCYmKGQ9cGFyc2VGbG9hdChkKSxjLm9wdGlvbnMub2Zmc2V0LmluZGV4T2YoXCIlXCIpPi0xJiYoZD1NYXRoLmNlaWwoci5jb250ZXh0RGltZW5zaW9uKmQvMTAwKSkpLGE9ci5jb250ZXh0U2Nyb2xsLXIuY29udGV4dE9mZnNldCxjLnRyaWdnZXJQb2ludD13K2EtZCxsPWY8ci5vbGRTY3JvbGwsaD1jLnRyaWdnZXJQb2ludD49ci5vbGRTY3JvbGwscD1sJiZoLHU9IWwmJiFoLCF5JiZwPyhjLnF1ZXVlVHJpZ2dlcihyLmJhY2t3YXJkKSxvW2MuZ3JvdXAuaWRdPWMuZ3JvdXApOiF5JiZ1PyhjLnF1ZXVlVHJpZ2dlcihyLmZvcndhcmQpLG9bYy5ncm91cC5pZF09Yy5ncm91cCk6eSYmci5vbGRTY3JvbGw+PWMudHJpZ2dlclBvaW50JiYoYy5xdWV1ZVRyaWdnZXIoci5mb3J3YXJkKSxvW2MuZ3JvdXAuaWRdPWMuZ3JvdXApfX1mb3IodmFyIGcgaW4gbylvW2ddLmZsdXNoVHJpZ2dlcnMoKTtyZXR1cm4gdGhpc30sZS5maW5kT3JDcmVhdGVCeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIGUuZmluZEJ5RWxlbWVudCh0KXx8bmV3IGUodCl9LGUucmVmcmVzaEFsbD1mdW5jdGlvbigpe2Zvcih2YXIgdCBpbiBvKW9bdF0ucmVmcmVzaCgpfSxlLmZpbmRCeUVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIG9bdC53YXlwb2ludENvbnRleHRLZXldfSx3aW5kb3cub25sb2FkPWZ1bmN0aW9uKCl7ciYmcigpLGUucmVmcmVzaEFsbCgpfSxuLnJlcXVlc3RBbmltYXRpb25GcmFtZT1mdW5jdGlvbihlKXt2YXIgaT13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx0O2kuY2FsbCh3aW5kb3csZSl9LG4uQ29udGV4dD1lfSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0LGUpe3JldHVybiB0LnRyaWdnZXJQb2ludC1lLnRyaWdnZXJQb2ludH1mdW5jdGlvbiBlKHQsZSl7cmV0dXJuIGUudHJpZ2dlclBvaW50LXQudHJpZ2dlclBvaW50fWZ1bmN0aW9uIGkodCl7dGhpcy5uYW1lPXQubmFtZSx0aGlzLmF4aXM9dC5heGlzLHRoaXMuaWQ9dGhpcy5uYW1lK1wiLVwiK3RoaXMuYXhpcyx0aGlzLndheXBvaW50cz1bXSx0aGlzLmNsZWFyVHJpZ2dlclF1ZXVlcygpLG9bdGhpcy5heGlzXVt0aGlzLm5hbWVdPXRoaXN9dmFyIG89e3ZlcnRpY2FsOnt9LGhvcml6b250YWw6e319LG49d2luZG93LldheXBvaW50O2kucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0aGlzLndheXBvaW50cy5wdXNoKHQpfSxpLnByb3RvdHlwZS5jbGVhclRyaWdnZXJRdWV1ZXM9ZnVuY3Rpb24oKXt0aGlzLnRyaWdnZXJRdWV1ZXM9e3VwOltdLGRvd246W10sbGVmdDpbXSxyaWdodDpbXX19LGkucHJvdG90eXBlLmZsdXNoVHJpZ2dlcnM9ZnVuY3Rpb24oKXtmb3IodmFyIGkgaW4gdGhpcy50cmlnZ2VyUXVldWVzKXt2YXIgbz10aGlzLnRyaWdnZXJRdWV1ZXNbaV0sbj1cInVwXCI9PT1pfHxcImxlZnRcIj09PWk7by5zb3J0KG4/ZTp0KTtmb3IodmFyIHI9MCxzPW8ubGVuZ3RoO3M+cjtyKz0xKXt2YXIgYT1vW3JdOyhhLm9wdGlvbnMuY29udGludW91c3x8cj09PW8ubGVuZ3RoLTEpJiZhLnRyaWdnZXIoW2ldKX19dGhpcy5jbGVhclRyaWdnZXJRdWV1ZXMoKX0saS5wcm90b3R5cGUubmV4dD1mdW5jdGlvbihlKXt0aGlzLndheXBvaW50cy5zb3J0KHQpO3ZhciBpPW4uQWRhcHRlci5pbkFycmF5KGUsdGhpcy53YXlwb2ludHMpLG89aT09PXRoaXMud2F5cG9pbnRzLmxlbmd0aC0xO3JldHVybiBvP251bGw6dGhpcy53YXlwb2ludHNbaSsxXX0saS5wcm90b3R5cGUucHJldmlvdXM9ZnVuY3Rpb24oZSl7dGhpcy53YXlwb2ludHMuc29ydCh0KTt2YXIgaT1uLkFkYXB0ZXIuaW5BcnJheShlLHRoaXMud2F5cG9pbnRzKTtyZXR1cm4gaT90aGlzLndheXBvaW50c1tpLTFdOm51bGx9LGkucHJvdG90eXBlLnF1ZXVlVHJpZ2dlcj1mdW5jdGlvbih0LGUpe3RoaXMudHJpZ2dlclF1ZXVlc1tlXS5wdXNoKHQpfSxpLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24odCl7dmFyIGU9bi5BZGFwdGVyLmluQXJyYXkodCx0aGlzLndheXBvaW50cyk7ZT4tMSYmdGhpcy53YXlwb2ludHMuc3BsaWNlKGUsMSl9LGkucHJvdG90eXBlLmZpcnN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMud2F5cG9pbnRzWzBdfSxpLnByb3RvdHlwZS5sYXN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMud2F5cG9pbnRzW3RoaXMud2F5cG9pbnRzLmxlbmd0aC0xXX0saS5maW5kT3JDcmVhdGU9ZnVuY3Rpb24odCl7cmV0dXJuIG9bdC5heGlzXVt0Lm5hbWVdfHxuZXcgaSh0KX0sbi5Hcm91cD1pfSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXt0aGlzLiRlbGVtZW50PWUodCl9dmFyIGU9d2luZG93LmpRdWVyeSxpPXdpbmRvdy5XYXlwb2ludDtlLmVhY2goW1wiaW5uZXJIZWlnaHRcIixcImlubmVyV2lkdGhcIixcIm9mZlwiLFwib2Zmc2V0XCIsXCJvblwiLFwib3V0ZXJIZWlnaHRcIixcIm91dGVyV2lkdGhcIixcInNjcm9sbExlZnRcIixcInNjcm9sbFRvcFwiXSxmdW5jdGlvbihlLGkpe3QucHJvdG90eXBlW2ldPWZ1bmN0aW9uKCl7dmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtyZXR1cm4gdGhpcy4kZWxlbWVudFtpXS5hcHBseSh0aGlzLiRlbGVtZW50LHQpfX0pLGUuZWFjaChbXCJleHRlbmRcIixcImluQXJyYXlcIixcImlzRW1wdHlPYmplY3RcIl0sZnVuY3Rpb24oaSxvKXt0W29dPWVbb119KSxpLmFkYXB0ZXJzLnB1c2goe25hbWU6XCJqcXVlcnlcIixBZGFwdGVyOnR9KSxpLkFkYXB0ZXI9dH0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGk9W10sbz1hcmd1bWVudHNbMF07cmV0dXJuIHQuaXNGdW5jdGlvbihhcmd1bWVudHNbMF0pJiYobz10LmV4dGVuZCh7fSxhcmd1bWVudHNbMV0pLG8uaGFuZGxlcj1hcmd1bWVudHNbMF0pLHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuPXQuZXh0ZW5kKHt9LG8se2VsZW1lbnQ6dGhpc30pO1wic3RyaW5nXCI9PXR5cGVvZiBuLmNvbnRleHQmJihuLmNvbnRleHQ9dCh0aGlzKS5jbG9zZXN0KG4uY29udGV4dClbMF0pLGkucHVzaChuZXcgZShuKSl9KSxpfX12YXIgZT13aW5kb3cuV2F5cG9pbnQ7d2luZG93LmpRdWVyeSYmKHdpbmRvdy5qUXVlcnkuZm4ud2F5cG9pbnQ9dCh3aW5kb3cualF1ZXJ5KSksd2luZG93LlplcHRvJiYod2luZG93LlplcHRvLmZuLndheXBvaW50PXQod2luZG93LlplcHRvKSl9KCk7IiwiLyohXG4gKiB2aWV3cG9ydC11bml0cy1idWdneWZpbGwgdjAuNS40XG4gKiBAd2ViOiBodHRwczovL2dpdGh1Yi5jb20vcm9kbmV5cmVobS92aWV3cG9ydC11bml0cy1idWdneWZpbGwvXG4gKiBAYXV0aG9yOiBSb2RuZXkgUmVobSAtIGh0dHA6Ly9yb2RuZXlyZWhtLmRlL2VuL1xuICovXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgIC8vIGxpa2UgTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgIHJvb3Qudmlld3BvcnRVbml0c0J1Z2d5ZmlsbCA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgLypnbG9iYWwgZG9jdW1lbnQsIHdpbmRvdywgbmF2aWdhdG9yLCBsb2NhdGlvbiwgWE1MSHR0cFJlcXVlc3QsIFhEb21haW5SZXF1ZXN0Ki9cblxuICB2YXIgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgdmFyIG9wdGlvbnM7XG4gIHZhciB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgdmFyIHZpZXdwb3J0VW5pdEV4cHJlc3Npb24gPSAvKFsrLV0/WzAtOS5dKykodmh8dnd8dm1pbnx2bWF4KS9nO1xuICB2YXIgZm9yRWFjaCA9IFtdLmZvckVhY2g7XG4gIHZhciBkaW1lbnNpb25zO1xuICB2YXIgZGVjbGFyYXRpb25zO1xuICB2YXIgc3R5bGVOb2RlO1xuICB2YXIgaXNCdWdneUlFID0gL01TSUUgWzAtOV1cXC4vaS50ZXN0KHVzZXJBZ2VudCk7XG4gIHZhciBpc09sZElFID0gL01TSUUgWzAtOF1cXC4vaS50ZXN0KHVzZXJBZ2VudCk7XG4gIHZhciBpc09wZXJhTWluaSA9IHVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYSBNaW5pJykgPiAtMTtcblxuICB2YXIgaXNNb2JpbGVTYWZhcmkgPSAvKGlQaG9uZXxpUG9kfGlQYWQpLitBcHBsZVdlYktpdC9pLnRlc3QodXNlckFnZW50KSAmJiAoZnVuY3Rpb24oKSB7XG4gICAgLy8gUmVnZXhwIGZvciBpT1MtdmVyc2lvbiB0ZXN0ZWQgYWdhaW5zdCB0aGUgZm9sbG93aW5nIHVzZXJBZ2VudCBzdHJpbmdzOlxuICAgIC8vIEV4YW1wbGUgV2ViVmlldyBVc2VyQWdlbnRzOlxuICAgIC8vICogaU9TIENocm9tZSBvbiBpT1M4OiBcIk1vemlsbGEvNS4wIChpUGFkOyBDUFUgT1MgOF8xIGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwMC4xLjQgKEtIVE1MLCBsaWtlIEdlY2tvKSBDcmlPUy8zOS4wLjIxNzEuNTAgTW9iaWxlLzEyQjQxMCBTYWZhcmkvNjAwLjEuNFwiXG4gICAgLy8gKiBpT1MgRmFjZWJvb2sgb24gaU9TNzogXCJNb3ppbGxhLzUuMCAoaVBob25lOyBDUFUgaVBob25lIE9TIDdfMV8xIGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzUzNy41MS4yIChLSFRNTCwgbGlrZSBHZWNrbykgTW9iaWxlLzExRDIwMSBbRkJBTi9GQklPUztGQkFWLzEyLjEuMC4yNC4yMDsgRkJCVi8zMjE0MjQ3OyBGQkRWL2lQaG9uZTYsMTtGQk1EL2lQaG9uZTsgRkJTTi9pUGhvbmUgT1M7RkJTVi83LjEuMTsgRkJTUy8yOyBGQkNSL0FUJlQ7RkJJRC9waG9uZTtGQkxDL2VuX1VTO0ZCT1AvNV1cIlxuICAgIC8vIEV4YW1wbGUgU2FmYXJpIFVzZXJBZ2VudHM6XG4gICAgLy8gKiBTYWZhcmkgaU9TODogXCJNb3ppbGxhLzUuMCAoaVBob25lOyBDUFUgaVBob25lIE9TIDhfMCBsaWtlIE1hYyBPUyBYKSBBcHBsZVdlYktpdC82MDAuMS4zIChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi84LjAgTW9iaWxlLzEyQTQzNDVkIFNhZmFyaS82MDAuMS40XCJcbiAgICAvLyAqIFNhZmFyaSBpT1M3OiBcIk1vemlsbGEvNS4wIChpUGhvbmU7IENQVSBpUGhvbmUgT1MgN18wIGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzUzNy41MS4xIChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi83LjAgTW9iaWxlLzExQTQ0NDlkIFNhZmFyaS85NTM3LjUzXCJcbiAgICB2YXIgaU9TdmVyc2lvbiA9IHVzZXJBZ2VudC5tYXRjaCgvT1MgKFxcZCkvKTtcbiAgICAvLyB2aWV3cG9ydCB1bml0cyB3b3JrIGZpbmUgaW4gbW9iaWxlIFNhZmFyaSBhbmQgd2ViVmlldyBvbiBpT1MgOCtcbiAgICByZXR1cm4gaU9TdmVyc2lvbiAmJiBpT1N2ZXJzaW9uLmxlbmd0aD4xICYmIHBhcnNlSW50KGlPU3ZlcnNpb25bMV0pIDwgODtcbiAgfSkoKTtcblxuICB2YXIgaXNCYWRTdG9ja0FuZHJvaWQgPSAoZnVuY3Rpb24oKSB7XG4gICAgLy8gQW5kcm9pZCBzdG9jayBicm93c2VyIHRlc3QgZGVyaXZlZCBmcm9tXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNDkyNjIyMS9kaXN0aW5ndWlzaC1hbmRyb2lkLWNocm9tZS1mcm9tLXN0b2NrLWJyb3dzZXItc3RvY2stYnJvd3NlcnMtdXNlci1hZ2VudC1jb250YWlcbiAgICB2YXIgaXNBbmRyb2lkID0gdXNlckFnZW50LmluZGV4T2YoJyBBbmRyb2lkICcpID4gLTE7XG4gICAgaWYgKCFpc0FuZHJvaWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdG9ja0FuZHJvaWQgPSB1c2VyQWdlbnQuaW5kZXhPZignVmVyc2lvbi8nKSA+IC0xO1xuICAgIGlmICghaXNTdG9ja0FuZHJvaWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdmVyc2lvbk51bWJlciA9IHBhcnNlRmxvYXQoKHVzZXJBZ2VudC5tYXRjaCgnQW5kcm9pZCAoWzAtOS5dKyknKSB8fCBbXSlbMV0pO1xuICAgIC8vIGFueXRoaW5nIGJlbG93IDQuNCB1c2VzIFdlYktpdCB3aXRob3V0ICphbnkqIHZpZXdwb3J0IHN1cHBvcnQsXG4gICAgLy8gNC40IGhhcyBpc3N1ZXMgd2l0aCB2aWV3cG9ydCB1bml0cyB3aXRoaW4gY2FsYygpXG4gICAgcmV0dXJuIHZlcnNpb25OdW1iZXIgPD0gNC40O1xuICB9KSgpO1xuXG4gIC8vIGFkZGVkIGNoZWNrIGZvciBJRTExLCBzaW5jZSBpdCAqc3RpbGwqIGRvZXNuJ3QgdW5kZXJzdGFuZCB2bWF4ISEhXG4gIGlmICghaXNCdWdneUlFKSB7XG4gICAgaXNCdWdneUlFID0gISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlsgOl0qMTFcXC4vKTtcbiAgfVxuICBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG4gICAgdmFyIHRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH07XG5cbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCB3YWl0KTtcbiAgICB9O1xuICB9XG5cbiAgLy8gZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMyNjA2OS9ob3ctdG8taWRlbnRpZnktaWYtYS13ZWJwYWdlLWlzLWJlaW5nLWxvYWRlZC1pbnNpZGUtYW4taWZyYW1lLW9yLWRpcmVjdGx5LWludG8tdFxuICBmdW5jdGlvbiBpbklmcmFtZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5zZWxmICE9PSB3aW5kb3cudG9wO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoaW5pdE9wdGlvbnMpIHtcbiAgICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW5pdE9wdGlvbnMgPT09IHRydWUpIHtcbiAgICAgIGluaXRPcHRpb25zID0ge1xuICAgICAgICBmb3JjZTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcHRpb25zID0gaW5pdE9wdGlvbnMgfHwge307XG4gICAgb3B0aW9ucy5pc01vYmlsZVNhZmFyaSA9IGlzTW9iaWxlU2FmYXJpO1xuICAgIG9wdGlvbnMuaXNCYWRTdG9ja0FuZHJvaWQgPSBpc0JhZFN0b2NrQW5kcm9pZDtcblxuICAgIGlmIChpc09sZElFIHx8ICghb3B0aW9ucy5mb3JjZSAmJiAhaXNNb2JpbGVTYWZhcmkgJiYgIWlzQnVnZ3lJRSAmJiAhaXNCYWRTdG9ja0FuZHJvaWQgJiYgIWlzT3BlcmFNaW5pICYmICghb3B0aW9ucy5oYWNrcyB8fCAhb3B0aW9ucy5oYWNrcy5yZXF1aXJlZChvcHRpb25zKSkpKSB7XG4gICAgICAvLyB0aGlzIGJ1Z2d5ZmlsbCBvbmx5IGFwcGxpZXMgdG8gbW9iaWxlIHNhZmFyaSwgSUU5LTEwIGFuZCB0aGUgU3RvY2sgQW5kcm9pZCBCcm93c2VyLlxuICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIGlzT2xkSUUpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCd2aWV3cG9ydC11bml0cy1idWdneWZpbGwgcmVxdWlyZXMgYSBwcm9wZXIgQ1NTT00gYW5kIGJhc2ljIHZpZXdwb3J0IHVuaXQgc3VwcG9ydCwgd2hpY2ggYXJlIG5vdCBhdmFpbGFibGUgaW4gSUU4IGFuZCBiZWxvdycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7fVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcHRpb25zLmhhY2tzICYmIG9wdGlvbnMuaGFja3MuaW5pdGlhbGl6ZShvcHRpb25zKTtcblxuICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBzdHlsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlTm9kZS5pZCA9ICdwYXRjaGVkLXZpZXdwb3J0JztcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlTm9kZSk7XG5cbiAgICAvLyBJc3N1ZSAjNjogQ3Jvc3MgT3JpZ2luIFN0eWxlc2hlZXRzIGFyZSBub3QgYWNjZXNzaWJsZSB0aHJvdWdoIENTU09NLFxuICAgIC8vIHRoZXJlZm9yZSBkb3dubG9hZCBhbmQgaW5qZWN0IHRoZW0gYXMgPHN0eWxlPiB0byBjaXJjdW12ZW50IFNPUC5cbiAgICBpbXBvcnRDcm9zc09yaWdpbkxpbmtzKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF9yZWZyZXNoID0gZGVib3VuY2UocmVmcmVzaCwgb3B0aW9ucy5yZWZyZXNoRGVib3VuY2VXYWl0IHx8IDEwMCk7XG4gICAgICAvLyBkb2luZyBhIGZ1bGwgcmVmcmVzaCByYXRoZXIgdGhhbiB1cGRhdGVTdHlsZXMgYmVjYXVzZSBhbiBvcmllbnRhdGlvbmNoYW5nZVxuICAgICAgLy8gY291bGQgYWN0aXZhdGUgZGlmZmVyZW50IHN0eWxlc2hlZXRzXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBfcmVmcmVzaCwgdHJ1ZSk7XG4gICAgICAvLyBvcmllbnRhdGlvbmNoYW5nZSBtaWdodCBoYXZlIGhhcHBlbmVkIHdoaWxlIGluIGEgZGlmZmVyZW50IHdpbmRvd1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BhZ2VzaG93JywgX3JlZnJlc2gsIHRydWUpO1xuXG4gICAgICBpZiAob3B0aW9ucy5mb3JjZSB8fCBpc0J1Z2d5SUUgfHwgaW5JZnJhbWUoKSkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX3JlZnJlc2gsIHRydWUpO1xuICAgICAgICBvcHRpb25zLl9saXN0ZW5pbmdUb1Jlc2l6ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMuaGFja3MgJiYgb3B0aW9ucy5oYWNrcy5pbml0aWFsaXplRXZlbnRzKG9wdGlvbnMsIHJlZnJlc2gsIF9yZWZyZXNoKTtcblxuICAgICAgcmVmcmVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU3R5bGVzKCkge1xuICAgIHN0eWxlTm9kZS50ZXh0Q29udGVudCA9IGdldFJlcGxhY2VkVmlld3BvcnRVbml0cygpO1xuICAgIC8vIG1vdmUgdG8gdGhlIGVuZCBpbiBjYXNlIGlubGluZSA8c3R5bGU+cyB3ZXJlIGFkZGVkIGR5bmFtaWNhbGx5XG4gICAgc3R5bGVOb2RlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoc3R5bGVOb2RlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgaWYgKCFpbml0aWFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZpbmRQcm9wZXJ0aWVzKCk7XG5cbiAgICAvLyBpT1MgU2FmYXJpIHdpbGwgcmVwb3J0IHdpbmRvdy5pbm5lcldpZHRoIGFuZCAuaW5uZXJIZWlnaHQgYXMgMCB1bmxlc3MgYSB0aW1lb3V0IGlzIHVzZWQgaGVyZS5cbiAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IFdIWSBpbm5lcldpZHRoID09PSAwXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHVwZGF0ZVN0eWxlcygpO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmluZFByb3BlcnRpZXMoKSB7XG4gICAgZGVjbGFyYXRpb25zID0gW107XG4gICAgZm9yRWFjaC5jYWxsKGRvY3VtZW50LnN0eWxlU2hlZXRzLCBmdW5jdGlvbihzaGVldCkge1xuICAgICAgaWYgKHNoZWV0Lm93bmVyTm9kZS5pZCA9PT0gJ3BhdGNoZWQtdmlld3BvcnQnIHx8ICFzaGVldC5jc3NSdWxlcyB8fCBzaGVldC5vd25lck5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXZpZXdwb3J0LXVuaXRzLWJ1Z2d5ZmlsbCcpID09PSAnaWdub3JlJykge1xuICAgICAgICAvLyBza2lwIGVudGlyZSBzaGVldCBiZWNhdXNlIG5vIHJ1bGVzIGFyZSBwcmVzZW50LCBpdCdzIHN1cHBvc2VkIHRvIGJlIGlnbm9yZWQgb3IgaXQncyB0aGUgdGFyZ2V0LWVsZW1lbnQgb2YgdGhlIGJ1Z2d5ZmlsbFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzaGVldC5tZWRpYSAmJiBzaGVldC5tZWRpYS5tZWRpYVRleHQgJiYgd2luZG93Lm1hdGNoTWVkaWEgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKHNoZWV0Lm1lZGlhLm1lZGlhVGV4dCkubWF0Y2hlcykge1xuICAgICAgICAvLyBza2lwIGVudGlyZSBzaGVldCBiZWNhdXNlIG1lZGlhIGF0dHJpYnV0ZSBkb2Vzbid0IG1hdGNoXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yRWFjaC5jYWxsKHNoZWV0LmNzc1J1bGVzLCBmaW5kRGVjbGFyYXRpb25zKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZWNsYXJhdGlvbnM7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kRGVjbGFyYXRpb25zKHJ1bGUpIHtcbiAgICBpZiAocnVsZS50eXBlID09PSA3KSB7XG4gICAgICB2YXIgdmFsdWU7XG5cbiAgICAgIC8vIHRoZXJlIG1heSBiZSBhIGNhc2Ugd2hlcmUgYWNjZXNzaW5nIGNzc1RleHQgdGhyb3dzIGFuIGVycm9yLlxuICAgICAgLy8gSSBjb3VsZCBub3QgcmVwcm9kdWNlIHRoaXMgaXNzdWUsIGJ1dCB0aGUgd29yc3QgdGhhdCBjYW4gaGFwcGVuXG4gICAgICAvLyB0aGlzIHdheSBpcyBhbiBhbmltYXRpb24gbm90IHJ1bm5pbmcgcHJvcGVybHkuXG4gICAgICAvLyBub3QgYXdlc29tZSwgYnV0IHByb2JhYmx5IGJldHRlciB0aGFuIGEgc2NyaXB0IGVycm9yXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3JvZG5leXJlaG0vdmlld3BvcnQtdW5pdHMtYnVnZ3lmaWxsL2lzc3Vlcy8yMVxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsdWUgPSBydWxlLmNzc1RleHQ7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2aWV3cG9ydFVuaXRFeHByZXNzaW9uLmxhc3RJbmRleCA9IDA7XG4gICAgICBpZiAodmlld3BvcnRVbml0RXhwcmVzc2lvbi50ZXN0KHZhbHVlKSkge1xuICAgICAgICAvLyBLZXlmcmFtZXNSdWxlIGRvZXMgbm90IGhhdmUgYSBDU1MtUHJvcGVydHlOYW1lXG4gICAgICAgIGRlY2xhcmF0aW9ucy5wdXNoKFtydWxlLCBudWxsLCB2YWx1ZV0pO1xuICAgICAgICBvcHRpb25zLmhhY2tzICYmIG9wdGlvbnMuaGFja3MuZmluZERlY2xhcmF0aW9ucyhkZWNsYXJhdGlvbnMsIHJ1bGUsIG51bGwsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghcnVsZS5zdHlsZSkge1xuICAgICAgaWYgKCFydWxlLmNzc1J1bGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yRWFjaC5jYWxsKHJ1bGUuY3NzUnVsZXMsIGZ1bmN0aW9uKF9ydWxlKSB7XG4gICAgICAgIGZpbmREZWNsYXJhdGlvbnMoX3J1bGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3JFYWNoLmNhbGwocnVsZS5zdHlsZSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIHZhbHVlID0gcnVsZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpO1xuICAgICAgLy8gcHJlc2VydmUgdGhvc2UgIWltcG9ydGFudCBydWxlc1xuICAgICAgaWYgKHJ1bGUuc3R5bGUuZ2V0UHJvcGVydHlQcmlvcml0eShuYW1lKSkge1xuICAgICAgICB2YWx1ZSArPSAnICFpbXBvcnRhbnQnO1xuICAgICAgfVxuXG4gICAgICB2aWV3cG9ydFVuaXRFeHByZXNzaW9uLmxhc3RJbmRleCA9IDA7XG4gICAgICBpZiAodmlld3BvcnRVbml0RXhwcmVzc2lvbi50ZXN0KHZhbHVlKSkge1xuICAgICAgICBkZWNsYXJhdGlvbnMucHVzaChbcnVsZSwgbmFtZSwgdmFsdWVdKTtcbiAgICAgICAgb3B0aW9ucy5oYWNrcyAmJiBvcHRpb25zLmhhY2tzLmZpbmREZWNsYXJhdGlvbnMoZGVjbGFyYXRpb25zLCBydWxlLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRSZXBsYWNlZFZpZXdwb3J0VW5pdHMoKSB7XG4gICAgZGltZW5zaW9ucyA9IGdldFZpZXdwb3J0KCk7XG5cbiAgICB2YXIgY3NzID0gW107XG4gICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgIHZhciBvcGVuO1xuICAgIHZhciBjbG9zZTtcblxuICAgIGRlY2xhcmF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHZhciBfaXRlbSA9IG92ZXJ3cml0ZURlY2xhcmF0aW9uLmFwcGx5KG51bGwsIGl0ZW0pO1xuICAgICAgdmFyIF9vcGVuID0gX2l0ZW0uc2VsZWN0b3IubGVuZ3RoID8gKF9pdGVtLnNlbGVjdG9yLmpvaW4oJyB7XFxuJykgKyAnIHtcXG4nKSA6ICcnO1xuICAgICAgdmFyIF9jbG9zZSA9IG5ldyBBcnJheShfaXRlbS5zZWxlY3Rvci5sZW5ndGggKyAxKS5qb2luKCdcXG59Jyk7XG5cbiAgICAgIGlmICghX29wZW4gfHwgX29wZW4gIT09IG9wZW4pIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICBjc3MucHVzaChvcGVuICsgYnVmZmVyLmpvaW4oJ1xcbicpICsgY2xvc2UpO1xuICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9vcGVuKSB7XG4gICAgICAgICAgb3BlbiA9IF9vcGVuO1xuICAgICAgICAgIGNsb3NlID0gX2Nsb3NlO1xuICAgICAgICAgIGJ1ZmZlci5wdXNoKF9pdGVtLmNvbnRlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNzcy5wdXNoKF9pdGVtLmNvbnRlbnQpO1xuICAgICAgICAgIG9wZW4gPSBudWxsO1xuICAgICAgICAgIGNsb3NlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKF9vcGVuICYmICFvcGVuKSB7XG4gICAgICAgIG9wZW4gPSBfb3BlbjtcbiAgICAgICAgY2xvc2UgPSBfY2xvc2U7XG4gICAgICB9XG5cbiAgICAgIGJ1ZmZlci5wdXNoKF9pdGVtLmNvbnRlbnQpO1xuICAgIH0pO1xuXG4gICAgaWYgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIGNzcy5wdXNoKG9wZW4gKyBidWZmZXIuam9pbignXFxuJykgKyBjbG9zZSk7XG4gICAgfVxuXG4gICAgLy8gT3BlcmEgTWluaSBtZXNzZXMgdXAgb24gdGhlIGNvbnRlbnQgaGFjayAoaXQgcmVwbGFjZXMgdGhlIERPTSBub2RlJ3MgaW5uZXJIVE1MIHdpdGggdGhlIHZhbHVlKS5cbiAgICAvLyBUaGlzIGZpeGVzIGl0LiBXZSB0ZXN0IGZvciBPcGVyYSBNaW5pIG9ubHkgc2luY2UgaXQgaXMgdGhlIG1vc3QgZXhwZW5zaXZlIENTUyBzZWxlY3RvclxuICAgIC8vIHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvVW5pdmVyc2FsX3NlbGVjdG9yc1xuICAgIGlmIChpc09wZXJhTWluaSkge1xuICAgICAgY3NzLnB1c2goJyogeyBjb250ZW50OiBub3JtYWwgIWltcG9ydGFudDsgfScpO1xuICAgIH1cblxuICAgIHJldHVybiBjc3Muam9pbignXFxuXFxuJyk7XG4gIH1cblxuICBmdW5jdGlvbiBvdmVyd3JpdGVEZWNsYXJhdGlvbihydWxlLCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBfdmFsdWU7XG4gICAgdmFyIF9zZWxlY3RvcnMgPSBbXTtcblxuICAgIF92YWx1ZSA9IHZhbHVlLnJlcGxhY2Uodmlld3BvcnRVbml0RXhwcmVzc2lvbiwgcmVwbGFjZVZhbHVlcyk7XG5cbiAgICBpZiAob3B0aW9ucy5oYWNrcykge1xuICAgICAgX3ZhbHVlID0gb3B0aW9ucy5oYWNrcy5vdmVyd3JpdGVEZWNsYXJhdGlvbihydWxlLCBuYW1lLCBfdmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChuYW1lKSB7XG4gICAgICAvLyBza2lwcGluZyBLZXlmcmFtZXNSdWxlXG4gICAgICBfc2VsZWN0b3JzLnB1c2gocnVsZS5zZWxlY3RvclRleHQpO1xuICAgICAgX3ZhbHVlID0gbmFtZSArICc6ICcgKyBfdmFsdWUgKyAnOyc7XG4gICAgfVxuXG4gICAgdmFyIF9ydWxlID0gcnVsZS5wYXJlbnRSdWxlO1xuICAgIHdoaWxlIChfcnVsZSkge1xuICAgICAgX3NlbGVjdG9ycy51bnNoaWZ0KCdAbWVkaWEgJyArIF9ydWxlLm1lZGlhLm1lZGlhVGV4dCk7XG4gICAgICBfcnVsZSA9IF9ydWxlLnBhcmVudFJ1bGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdG9yOiBfc2VsZWN0b3JzLFxuICAgICAgY29udGVudDogX3ZhbHVlXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2VWYWx1ZXMobWF0Y2gsIG51bWJlciwgdW5pdCkge1xuICAgIHZhciBfYmFzZSA9IGRpbWVuc2lvbnNbdW5pdF07XG4gICAgdmFyIF9udW1iZXIgPSBwYXJzZUZsb2F0KG51bWJlcikgLyAxMDA7XG4gICAgcmV0dXJuIChfbnVtYmVyICogX2Jhc2UpICsgJ3B4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFZpZXdwb3J0KCkge1xuICAgIHZhciB2aCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB2YXIgdncgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuICAgIHJldHVybiB7XG4gICAgICB2aDogdmgsXG4gICAgICB2dzogdncsXG4gICAgICB2bWF4OiBNYXRoLm1heCh2dywgdmgpLFxuICAgICAgdm1pbjogTWF0aC5taW4odncsIHZoKVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBpbXBvcnRDcm9zc09yaWdpbkxpbmtzKG5leHQpIHtcbiAgICB2YXIgX3dhaXRpbmcgPSAwO1xuICAgIHZhciBkZWNyZWFzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgX3dhaXRpbmctLTtcbiAgICAgIGlmICghX3dhaXRpbmcpIHtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3JFYWNoLmNhbGwoZG9jdW1lbnQuc3R5bGVTaGVldHMsIGZ1bmN0aW9uKHNoZWV0KSB7XG4gICAgICBpZiAoIXNoZWV0LmhyZWYgfHwgb3JpZ2luKHNoZWV0LmhyZWYpID09PSBvcmlnaW4obG9jYXRpb24uaHJlZikgfHwgc2hlZXQub3duZXJOb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS12aWV3cG9ydC11bml0cy1idWdneWZpbGwnKSA9PT0gJ2lnbm9yZScpIHtcbiAgICAgICAgLy8gc2tpcCA8c3R5bGU+IGFuZCA8bGluaz4gZnJvbSBzYW1lIG9yaWdpbiBvciBleHBsaWNpdGx5IGRlY2xhcmVkIHRvIGlnbm9yZVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIF93YWl0aW5nKys7XG4gICAgICBjb252ZXJ0TGlua1RvU3R5bGUoc2hlZXQub3duZXJOb2RlLCBkZWNyZWFzZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIV93YWl0aW5nKSB7XG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb3JpZ2luKHVybCkge1xuICAgIHJldHVybiB1cmwuc2xpY2UoMCwgdXJsLmluZGV4T2YoJy8nLCB1cmwuaW5kZXhPZignOi8vJykgKyAzKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0TGlua1RvU3R5bGUobGluaywgbmV4dCkge1xuICAgIGdldENvcnMobGluay5ocmVmLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZS5tZWRpYSA9IGxpbmsubWVkaWE7XG4gICAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicsIGxpbmsuaHJlZik7XG4gICAgICBzdHlsZS50ZXh0Q29udGVudCA9IHRoaXMucmVzcG9uc2VUZXh0O1xuICAgICAgbGluay5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChzdHlsZSwgbGluayk7XG4gICAgICBuZXh0KCk7XG4gICAgfSwgbmV4dCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb3JzKHVybCwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgLy8gWEhSIGZvciBDaHJvbWUvRmlyZWZveC9PcGVyYS9TYWZhcmkuXG4gICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBYRG9tYWluUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFhEb21haW5SZXF1ZXN0IGZvciBJRS5cbiAgICAgIHhociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3Jvc3MtZG9tYWluIFhIUiBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuXG4gICAgeGhyLm9ubG9hZCA9IHN1Y2Nlc3M7XG4gICAgeGhyLm9uZXJyb3IgPSBlcnJvcjtcbiAgICB4aHIuc2VuZCgpO1xuICAgIHJldHVybiB4aHI7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHZlcnNpb246ICcwLjUuNCcsXG4gICAgZmluZFByb3BlcnRpZXM6IGZpbmRQcm9wZXJ0aWVzLFxuICAgIGdldENzczogZ2V0UmVwbGFjZWRWaWV3cG9ydFVuaXRzLFxuICAgIGluaXQ6IGluaXRpYWxpemUsXG4gICAgcmVmcmVzaDogcmVmcmVzaFxuICB9O1xuXG59KSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
