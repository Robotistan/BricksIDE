/**
 * @preserve
 * Plugin Name: dflip
 * Description: dflip - 3D & 2D FlipBook
 *
 * Author: Deepak Ghimire
 * Author URI: http://codecanyon.net/user/deip?ref=deip
 */

'use strict';

var DFLIP = DFLIP || {};

// old fallback
// use DFLIP instead of PRESENTATION as of v 1.1
var PRESENTATION = DFLIP;

(function dFlip(DFLIP, $) {

  DFLIP.version = "1.4.31";

  DFLIP.PAGE_MODE = {SINGLE: 1, DOUBLE: 2, AUTO: null};
  DFLIP.SINGLE_PAGE_MODE = {ZOOM: 1, BOOKLET: 2, AUTO: null};
  DFLIP.CONTROLSPOSITION = {HIDDEN: 'hide', TOP: 'top', BOTTOM: 'bottom'};
  DFLIP.DIRECTION = {LTR: 1, RTL: 2};

  DFLIP.CORNERS = {TL: "tl", TR: "tr", BL: "bl", BR: "br", L: "l", R: "r", NONE: null};

  DFLIP.SOURCE_TYPE = {IMAGE: "image", PDF: "pdf", HTML: "html"};
  DFLIP.DISPLAY_TYPE = {WEBGL: "3D", HTML: "2D"};
  DFLIP.PAGE_SIZE = {AUTO: 0, SINGLE: 1, DOUBLEINTERNAL: 2};


  //defaults settings
  var defaults = DFLIP.defaults = {

    //sets if to use 3d or not (true|false)
    webgl: true,
    //if you want to turn of shadow in 3d set it to false
    webglShadow: true,

    // if enable sound at start (true|false)
    soundEnable: true,

    // height of the container
    // value(eg: 320) or percentage (eg: '50%')
    // calculaton limit: minimum 320, max window height
    height: '100%',

    // set to true to show outline on open (true|false)
    autoEnableOutline: false,

    // set to true to show thumbnail on open (true|false)
    autoEnableThumbnail: false,

    // set to true if PDF inbuilt outline is to be removed (true|false)
    overwritePDFOutline: false,

    // enableDownload of PDF files (true|false)
    enableDownload: true,

    // duration of page turn in milliseconds
    duration: 800,

    //direction of flipbook
    //DFLIP.DIRECTION.LTR or 1	for left to right(default),
    //DFLIP.DIRECTION.RTL or 2	for right to left,
    direction: DFLIP.DIRECTION.LTR,

    //set as
    //DFLIP.PAGE_MODE.AUTO	 				for auto-detect(default),
    //DFLIP.PAGE_MODE.SINGLE or 1 			for singleview,
    //DFLIP.PAGE_MODE.DOUBLE or 2 			for doubleview,
    pageMode: DFLIP.PAGE_MODE.AUTO,

    //set as
    //DFLIP.SINGLE_PAGE_MODE.AUTO	 				for auto-detect(default),
    //DFLIP.SINGLE_PAGE_MODE.ZOOM or 1 				for normal zoom single view,
    //DFLIP.SINGLE_PAGE_MODE.BOOKLET or 2 			for Booklet mode,
    singlePageMode: DFLIP.SINGLE_PAGE_MODE.AUTO,

    //color value in hexadecimal
    backgroundColor: "#fff",

    forceFit: true, //very rare usage leave it as true unless page are not fitting wrong...
    transparent: false, //true or false
    hard: "none", //possible values are "hard", "none", "cover"
    openPage: 1, //the pagenumber where the book should open

    annotationClass: "",

    autoPlay: false,
    autoPlayDuration: 5000,
    autoPlayStart: false,

    // texture settings
    maxTextureSize: 1600,	//max page size to be rendered. for pdf files only
    minTextureSize: 256,	//min page size to be rendered. for pdf files only
    rangeChunkSize: 524288,

    // icons for the buttons
    icons: {
      'altnext': 'ti-angle-right',
      'altprev': 'ti-angle-left',
      'next': 'ti-angle-right',
      'prev': 'ti-angle-left',
      'end': 'ti-angle-double-right',
      'start': 'ti-angle-double-left',
      'share': 'ti-sharethis',
      'help': 'ti-help-alt',
      'more': 'ti-more-alt',
      'download': 'ti-download',
      'zoomin': 'ti-zoom-in',
      'zoomout': 'ti-zoom-out',
      'fullscreen': 'ti-fullscreen',
      'fitscreen': 'ti-arrows-corner',
      'thumbnail': 'ti-layout-grid2',
      'outline': 'ti-menu-alt',
      'close': 'ti-close',
      'doublepage': 'ti-book',
      'singlepage': 'ti-file',
      'sound': 'ti-volume',
      'facebook': 'ti-facebook',
      'google': 'ti-google',
      'twitter': 'ti-twitter-alt',
      'mail': 'ti-email',
      'play': 'ti-control-play',
      'pause': 'ti-control-pause'
    },

    // TRANSLATION text to be displayed
    text: {

      toggleSound: "Turn on/off Sound",
      toggleThumbnails: "Toggle Thumbnails",
      toggleOutline: "Toggle Outline/Bookmark",
      previousPage: "Previous Page",
      nextPage: "Next Page",
      toggleFullscreen: "Toggle Fullscreen",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      toggleHelp: "Toggle Help",

      singlePageMode: "Single Page Mode",
      doublePageMode: "Double Page Mode",
      downloadPDFFile: "Download PDF File",
      gotoFirstPage: "Goto First Page",
      gotoLastPage: "Goto Last Page",
      play: "Start AutoPlay",
      pause: "Pause AutoPlay",

      share: "Share"
    },

    //valid controlnames:
    //altPrev,pageNumber,altNext,outline,thumbnail,zoomIn,zoomOut,fullScreen,share
    //more,download,pageMode,startPage,endPage,sound
    allControls: "altPrev,pageNumber,altNext,play,outline,thumbnail,zoomIn,zoomOut,fullScreen,share,download,more,pageMode,startPage,endPage,sound",
    moreControls: "download,pageMode,startPage,endPage,sound",
    hideControls: "",

    controlsPosition: DFLIP.CONTROLSPOSITION.BOTTOM,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,

    //set if the zoom changes on mouse scroll (true|false)
    scrollWheel: true,

    // callbacks
    onCreate: function (flipBook) {
      // after flip book is created is fired
    },
    onCreateUI: function (flipBook) {
      // after ui created event is fired
    },
    onFlip: function (flipBook) {
      // after flip event is fired
    },
    beforeFlip: function (flipBook) {
      // before flip event is fired
    },
    onReady: function (flipBook) {
      // after flip book is completely loaded
    },

    zoomRatio: 1.5,
    pageSize: DFLIP.PAGE_SIZE.AUTO,

    /**
     * NON-OPTIONS AREA
     * These options are not supposed to be sent from options variable
     */
    /**
     * dependency URLS (NON-OPTION):
     * Do not set them as options,
     * Refer to advance-examples
     */
    //(NON-OPTION) source link for PDF.JS file
    pdfjsSrc: "js/libs/pdf.min.js",
    //(NON-OPTION) source link for PDFcompatibility.JS file
    pdfjsCompatibilitySrc: "js/libs/compatibility.js",
    //(NON-OPTION) source link for PDF.WORKER.JS file
    pdfjsWorkerSrc: "js/libs/pdf.worker.min.js",
    //(NON-OPTION) source link for THREE.JS file
    threejsSrc: "js/libs/three.min.js",
    //(NON-OPTION) source link for MOCKUP.JS file
    mockupjsSrc: "js/libs/mockup.min.js",
    //(NON-OPTION) File path to the trun sound
    soundFile: "sound/turn2.mp3",
    imagesLocation: "images",
    imageResourcesPath: "images/pdfjs/",
    cMapUrl: "cmaps/", //it's quite wierd how cmaps don't work properly with relative urls like others.. but is relative to pdf.min.js path

    //(NON-OPTION) developer parameters
    enableDebugLog: false,
    canvasToBlob: false,//as of 1.2.9 canvas are better optimized and secure
    enableAnnotation: true,
    pdfRenderQuality: 0.90,


    /**
     * Let them be, change at your risk
     */
    // if texture fallback override is required
    // note: if set to anything other than "blank" the first page is changed
    // recommended : "blank"
    textureLoadFallback: "blank", //"images/textures/white.jpg",
    // controls the flexibility of the paper more value for more flexiblilty
    stiffness: 3,
    // minTopOffset: 30,
    // link to the images file that you want as background.
    // supported files are jpgs,png. smaller files are preffered for performance
    backgroundImage: "",//"images/textures/el.jpg",
    // or any number like 5, 500. recommended: "auto"

    pageRatio: null, 		//equals to width/height

    pixelRatio: window.devicePixelRatio || 1,
    thumbElement: 'div',

    /*3D settings*/
    spotLightIntensity: 0.22,
    ambientLightColor: "#fff",
    ambientLightIntensity: 0.8,
    shadowOpacity: 0.15
  };

  var has3d = 'WebKitCSSMatrix' in window
      || (document.body && 'MozPerspective' in document.body.style),
    hasMouse = 'onmousedown' in window,
    hasTouch = 'ontouchstart' in window;

  var userAgent = navigator.userAgent;

  var utils = DFLIP.utils = {

    drag: {
      left: 0,
      right: 1,
      none: -1
    },
    mouseEvents: (hasMouse)
      ? {type: "mouse", start: "mousedown", move: "mousemove", end: "mouseup"}
      : {type: "touch", start: "touchstart", move: "touchmove", end: "touchend"},

    html: {
      div: "<div/>",
      img: "<img/>",
      a: "<a>",
      input: "<input type='text'/>"
    },
    //functions or so
    toRad: function (deg) {
      return deg * Math.PI / 180;
    },
    isset: function (check, fallback) {
      return check == null ? fallback : check;
    },
    isnull: function (variable) {
      return variable == null || variable == null;
    },
    toDeg: function (rad) {
      return rad * 180 / Math.PI;
    },

    transition: function (hasTransition, duration) {
      return hasTransition ? duration / 1000 + "s ease-out" : "0s none";
    },

    display: function (hasDisplay) {
      return hasDisplay ? "block" : "none";
    },

    resetTranslate: function () {
      return translateStr(0, 0);
    },

    translateStr: function (x, y) {
      return has3d ? ' translate3d(' + x + 'px,' + y + 'px, 0px) ' : ' translate(' + x + 'px, ' + y + 'px) ';
    },
    httpsCorrection: function (url) {
      var location = window.location;
      if (location.href.indexOf("https://") > -1 && url.indexOf(location.hostname) > -1) {
        url = url.replace("http://", "https://");
      }
      return url;
    },
    resetBoxShadow: function () {
      return "rgba(0, 0, 0, 0) 0px 0px 20px";
    },

    rotateStr: function (deg) {
      return ' rotateZ(' + deg + 'deg) ';
    },

    bg: function (src) {
      return '#fff' + bgImage(src);
    },

    bgImage: function (src) {
      return (src == null || src == "blank" ? '' : ' url(' + src + ')');
    },

    src: function (src) {
      return (src != null ? '' + src + '' : '');
    },

    limitAt: function (x, min, max) {
      return x < min ? min : x > max ? max : x;
    },

    distOrigin: function (x, y) {
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    },

    distPoints: function (x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },
    calculateScale: function (startTouches, endTouches) {
      var startDistance = distPoints(startTouches[0].x, startTouches[0].y, startTouches[1].x, startTouches[1].y),
        endDistance = distPoints(endTouches[0].x, endTouches[0].y, endTouches[1].x, endTouches[1].y);
      return endDistance / startDistance;
    },
    /**
     * Calculates the average of multiple vectors (x, y values)
     */
    getVectorAvg: function (vectors) {
      return {
        x: vectors.map(function (v) {
          return v.x;
        }).reduce(utils.sum) / vectors.length,
        y: vectors.map(function (v) {
          return v.y;
        }).reduce(utils.sum) / vectors.length
      };
    },
    sum: function (a, b) {
      return a + b;
    },
    /**
     * Returns the touches of an event relative to the container offset
     * @param event
     * @return array touches
     */
    getTouches: function (event, position) {
      position = position || {left: 0, top: 0};
      return Array.prototype.slice.call(event.touches).map(function (touch) {
        return {
          x: touch.pageX - position.left,
          y: touch.pageY - position.top
        };
      });
    },

    angleByDistance: function (distance, fullWidth) {
      var h = fullWidth / 2;
      var d = limitAt(distance, 0, fullWidth);

      return d < h
        ? toDeg(Math.asin(d / h))
        : 90 + toDeg(Math.asin((d - h) / h));

    },

    log: function (args) {
      if (defaults.enableDebugLog == true && window.console)
        console.log(args);
    },
    lowerPowerOfTwo: function (value) {
      return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
    },
    nearestPowerOfTwo: function (value, max) {
      return Math.min(max || 2048, Math.pow(2, Math.ceil(Math.log(value) / Math.LN2)));
    },
    zoomStops: function (value, zoomRatio, ceil, min, max) {
      if (min == null) min = 256;
      if (max == null) max = 2048;
      //Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));

      var factor = Math.log(value / min) / Math.log(zoomRatio);

      return min * Math.pow(zoomRatio, ceil == null ? Math.round(factor) : (ceil == true ? Math.ceil(factor)
          : Math.floor(factor)));
    },

    extendOptions: function (defaults, options) {
      return $.extend(true, {}, defaults, options);
    },
    getFullscreenElement: function () {
      return document.fullscreenElement
        || document.mozFullScreenElement
        || document.webkitFullscreenElement
        || document.msFullscreenElement
    },
    hasFullscreenEnabled: function () {
      return document.fullscreenEnabled
        || document.mozFullScreenEnabled
        || document.webkitFullscreenEnabled
        || document.msFullscreenEnabled
    },
    getBasePage: function (pageNumber) {
      return Math.floor(pageNumber / 2) * 2;
    },

    loadResources: function loadResources(resourceTag, src, callback) {
      var doc = document,
        element = doc.createElement(resourceTag),
        refElement = doc.getElementsByTagName(resourceTag)[0];

      element.async = true;
      if (callback) {
        element.addEventListener('load', function (e) {
          callback(null, e);
        }, false);
      }

      element.src = src;

      refElement.parentNode.insertBefore(element, refElement);
    },
    getScript: function (source, callback, errorCallback) {
      var script = document.createElement('script');
      var prior = document.body.getElementsByTagName('script')[0];
      script.async = 1;
      script.setAttribute("data-cfasync", false);
      if (prior != null) {
        prior.parentNode.insertBefore(script, prior);
        prior = null;
      }
      else { //sometimes if script are loaded in head and no scripts are present in body
        document.body.appendChild(script);
      }

      function load(_, isAbort) {
        if (script != null) { //IE 10 doesn't regard
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            //console.log("aborted loading :" + source);
            script.onload = script.onreadystatechange = null;
            script = null;
            script = null;
            if (!isAbort) {
              if (callback) callback();
              callback = null;
              errorCallback = null;
            }

          }
        }
      }

      script.addEventListener("load", load, false);
      script.addEventListener("readystatechange", load, false);
      script.addEventListener("complete", load, false);

      if (errorCallback) {
        script.addEventListener("error", errorCallback, false);
      }
      //script.onload = script.onreadystatechange = load;

      script.src = source + (prefix.dom == "MS" ? ("?" + Math.random(1)) : "");
    },
    isHardPage: function (config, pageNumber, pageCount, isBooklet) {
      if (config != null) {

        // var config = this.hardConfig;

        if (config == "cover") {
          return pageNumber == 0 || (isBooklet && pageNumber == 1)  //front cover is 0
            || pageNumber == (Math.floor(pageCount / (isBooklet ? 1 : 2)) - (isBooklet ? 0 : 1)); //start with 0 so 1 minus
        }
        else if (config == "all") {
          return true;
        }
        else {
          var baseTest = ("," + config + ",").indexOf("," + (pageNumber * 2 + 1) + ",") > -1;
          var nextTest = ("," + config + ",").indexOf("," + (pageNumber * 2 + 2) + ",") > -1;
          return baseTest || nextTest;

        }
      }
      return false;
    },
    fixMouseEvent: function (event) {


      if (event) {
        var originalEvent = event.originalEvent || event;

        //noinspection JSUnresolvedVariable
        if (originalEvent.changedTouches && originalEvent.changedTouches.length > 0) {
          var _event = $.event.fix(event);
          //noinspection JSUnresolvedVariable
          var touch = originalEvent.changedTouches[0];
          _event.clientX = touch.clientX;
          _event.clientY = touch.clientY;
          _event.pageX = touch.pageX;
          _event.touches = originalEvent.touches;
          _event.pageY = touch.pageY;
          _event.movementX = touch.movementX;
          _event.movementY = touch.movementY;
          return _event;
        }
        else {
          return event;
        }
      }
      else {
        return event;
      }

    },

    //self Execution
    hasWebgl: (function () {
      try {
        var canvas = document.createElement('canvas');
        //noinspection JSUnresolvedVariable
        return !!( window.WebGLRenderingContext && ( canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ) );
      } catch (e) {
        return false;
      }
    })(),
    isBookletMode: function (book) {
      return book.pageMode == DFLIP.PAGE_MODE.SINGLE && book.singlePageMode == DFLIP.SINGLE_PAGE_MODE.BOOKLET
    },
    isRTLMode: function (book) {
      return book.direction == DFLIP.DIRECTION.RTL
    },
    isMobile: (function () {
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
      })(userAgent || navigator.vendor || window.opera);
      return check;
    })(),
    isIOS: /(iPad|iPhone|iPod)/g.test(userAgent),
    isSafari: /constructor/i.test(window.HTMLElement) || (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || safari.pushNotification),
    prefix: (function () {
      var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
          .call(styles)
          .join('')
          .match(/-(moz|webkit|ms)-/))[1],
        dom = ('WebKit|Moz|MS').match(new RegExp('(' + pre + ')', 'i'))[1];
      return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
      };
    })(),

    __extends: function (child, parent) {
      for (var key in parent)
        if (parent.hasOwnProperty(key)) child[key] = parent[key];
      function Ctor() {
        this.constructor = child;
      }

      Ctor.prototype = parent.prototype;
      child.prototype = new Ctor();
      child.__super = parent.prototype;
      return child;
    }

  };

  //caching the utils

  var SOURCE_TYPE = DFLIP.SOURCE_TYPE,
    DISPLAY_TYPE = DFLIP.DISPLAY_TYPE,

    drag = utils.drag,
    mouseEvents = utils.mouseEvents,
    html = utils.html,
    isset = utils.isset,
    isnull = utils.isnull,

    toRad = utils.toRad,
    toDeg = utils.toDeg,
    transition = utils.transition,
    translateStr = utils.translateStr,
    resetBoxShadow = utils.resetBoxShadow,
    rotateStr = utils.rotateStr,

    bg = utils.bg,
    bgImage = utils.bgImage,
    src = utils.src,

    limitAt = utils.limitAt,
    distOrigin = utils.distOrigin,
    distPoints = utils.distPoints,
    angleByDistance = utils.angleByDistance,
    log = utils.log,
    nearestPowerOfTwo = utils.nearestPowerOfTwo,
    extendOptions = utils.extendOptions,
    getBasePage = utils.getBasePage,
    getScript = utils.getScript,
    fixMouseEvent = utils.fixMouseEvent,
    prefix = utils.prefix,
    isBookletMode = utils.isBookletMode,
    isRTLMode = utils.isRTLMode,
    isMobile = utils.isMobile,
    hasWebgl = utils.hasWebgl,
    isSafari = utils.isSafari,
    isIOS = utils.isIOS,
    __extends = utils.__extends;

  // Support: IE<11, Chrome<21, Android<4.4, Safari<6
  (function checkSetPresenceInImageData() {
    // IE < 11 will use window.CanvasPixelArray which lacks set function.
    if (window.CanvasPixelArray) {
      if (typeof window.CanvasPixelArray.prototype.set !== 'function') {
        window.CanvasPixelArray.prototype.set = function (arr) {
          for (var i = 0, ii = this.length; i < ii; i++) {
            this[i] = arr[i];
          }
        };
      }
    } else {
      // Old Chrome and Android use an inaccessible CanvasPixelArray prototype.
      // Because we cannot feature detect it, we rely on user agent parsing.
      var polyfill = false, versionMatch;
      if (isSafari) {
        versionMatch = userAgent.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//);
        // Safari < 6 lacks the set function.
        polyfill = versionMatch && parseInt(versionMatch[1]) < 6;
      }

      if (polyfill) {
        var contextPrototype = window.CanvasRenderingContext2D.prototype;
        var createImageData = contextPrototype.createImageData;
        contextPrototype.createImageData = function (w, h) {
          var imageData = createImageData.call(this, w, h);
          imageData.data.set = function (arr) {
            for (var i = 0, ii = this.length; i < ii; i++) {
              this[i] = arr[i];
            }
          };
          return imageData;
        };
        // this closure will be kept referenced, so clear its vars
        contextPrototype = null;
      }
    }
  })();

  // Support: IE<10, Android<4.0, iOS
  (function checkRequestAnimationFrame() {
    function fakeRequestAnimationFrame(callback) {
      window.setTimeout(callback, 20);
    }

    if ('requestAnimationFrame' in window) {
      return;
    }
    window.requestAnimationFrame =
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      fakeRequestAnimationFrame;
  })();

  // Checking if the typed arrays are supported
  // Support: iOS<6.0 (subarray), IE<10, Android<4.0
  (function checkTypedArrayCompatibility() {
    if (typeof Uint8Array !== 'undefined') {
      // Support: iOS<6.0
      if (typeof Uint8Array.prototype.subarray === 'undefined') {
        Uint8Array.prototype.subarray = function subarray(start, end) {
          return new Uint8Array(this.slice(start, end));
        };
        Float32Array.prototype.subarray = function subarray(start, end) {
          return new Float32Array(this.slice(start, end));
        };
      }

      // Support: Android<4.1
      if (typeof Float64Array === 'undefined') {
        window.Float64Array = Float32Array;
      }
      return;
    }

    function subarray(start, end) {
      return new TypedArray(this.slice(start, end));
    }

    function setArrayOffset(array, offset) {
      if (arguments.length < 2) {
        offset = 0;
      }
      for (var i = 0, n = array.length; i < n; ++i, ++offset) {
        this[offset] = array[i] & 0xFF;
      }
    }

    function TypedArray(arg1) {
      var result, i, n;
      if (typeof arg1 === 'number') {
        result = [];
        for (i = 0; i < arg1; ++i) {
          result[i] = 0;
        }
      } else if ('slice' in arg1) {
        result = arg1.slice(0);
      } else {
        result = [];
        for (i = 0, n = arg1.length; i < n; ++i) {
          result[i] = arg1[i];
        }
      }

      result.subarray = subarray;
      result.buffer = result;
      result.byteLength = result.length;
      result.set = setArrayOffset;

      if (typeof arg1 === 'object' && arg1.buffer) {
        result.buffer = arg1.buffer;
      }
      return result;
    }

    window.Uint8Array = TypedArray;
    window.Int8Array = TypedArray;

    // we don't need support for set, byteLength for 32-bit array
    // so we can use the TypedArray as well
    window.Uint32Array = TypedArray;
    window.Int32Array = TypedArray;
    window.Uint16Array = TypedArray;
    window.Float32Array = TypedArray;
    window.Float64Array = TypedArray;
  })();

  var extendDFlipOptions = function (options) {
    return $.extend(true, {}, defaults, options);
  };

  //Creates ui for the flipbook
  var createUI = function (container, object) {

      var uiClass = "df-ui";
      var wrapperClass = "df-ui-wrapper";
      var buttonClass = uiClass + "-" + "btn";
      var ui = object.ui = $(html.div, {'class': uiClass});
      var options = object.options;

      ui.dispose = function () {
        container.find("." + buttonClass).each(function () {
          $(this).off();
        });
        help.off();
        next.off();
        prev.off();
        play.off();
        zoom.off();
        zoomIn.off();
        zoomOut.off();
        page.off();
        sound.off();
        more.off();
        fullScreen.off();
        fit.off();
        share.off();
        start.off();
        end.off();
        pageModeButton.off();
        altPrev.off();
        altNext.off();
        thumbnail.off();
        outline.off();

        controls.remove();
        sizeControls.remove();
        prev.remove();
        next.remove();
        zoom.remove();
        if (ui.shareBox) {
          if (ui.shareBox.dispose)
            ui.shareBox.dispose();
          ui.shareBox = null;
        }
        document.removeEventListener('keyup', onKeyUp, false);
        window.removeEventListener('click', closeMoreOptions, false);
        ui.update = null;
        object = null;
      };

      var validPage = function (pageNumber) {

        if (isNaN(pageNumber)) pageNumber = object.target._activePage;
        else if (pageNumber < 1) pageNumber = 1;
        else if (pageNumber > object.target.pageCount) pageNumber = object.target.pageCount;
        return pageNumber;

      };

      var next = ui.next = $(html.div, {

        class: buttonClass + " " + uiClass + "-next " + options.icons['next'],
        title: options.text.nextPage,
        html: "<span>" + options.text.nextPage + "</span>"

      }).on("click", function () {
        object.next();
      });

      var prev = ui.prev = $(html.div, {

        class: buttonClass + " " + uiClass + "-prev " + options.icons['prev'],
        title: options.text.previousPage,
        html: "<span>" + options.text.previousPage + "</span>"

      }).on("click", function () {

        object.prev();

      });
      var play = $(html.div, {

        class: buttonClass + " " + uiClass + "-play " + options.icons['play'],
        title: options.text.play,
        html: "<span>" + options.text.play + "</span>"

      }).on("click", function () {
        var el = $(this);
        object.setAutoPlay(!el.hasClass(options.icons['pause']));

      });
      if (options.autoPlay == true) {
        ui.play = play;
        object.setAutoPlay(options.autoPlayStart);
      }
      var zoom = $(html.div, {
        class: wrapperClass + " " + uiClass + "-zoom"
      });

      var zoomIn = ui.zoomIn = $(html.div, {

        class: buttonClass + " " + uiClass + "-zoomin " + options.icons['zoomin'],
        title: options.text.zoomIn,
        html: "<span>" + options.text.zoomIn + "</span>"

      }).on("click", function () {

        object.zoom(1);
        ui.update();
        if (object.target.startPoint && object.target.pan)
          object.target.pan(object.target.startPoint);

      });

      var zoomOut = ui.zoomOut = $(html.div, {

        class: buttonClass + " " + uiClass + "-zoomout " + options.icons['zoomout'],
        title: options.text.zoomOut,
        html: "<span>" + options.text.zoomOut + "</span>"

      }).on("click", function () {
        object.zoom(-1);
        ui.update();
        if (object.target.startPoint && object.target.pan)
          object.target.pan(object.target.startPoint);
      });
      zoom.append(zoomIn).append(zoomOut);

      var page = ui.pageNumber = $(html.div, {

        class: buttonClass + " " + uiClass + "-page",

      }).on("change", function () {

        var pageNumber = parseInt((ui.pageInput.val()), 10);

        pageNumber = validPage(pageNumber);
        object.gotoPage(pageNumber);

      }).on("keyup", function (event) {

        if (event.keyCode == 13) {
          var pageNumber = parseInt((ui.pageInput.val()), 10);

          pageNumber = validPage(pageNumber);
          if (pageNumber !== validPage(object.target._activePage || object._activePage))
            object.gotoPage(pageNumber);
        }

      });

      ui.pageInput = $('<input id="df_book_page_number" type="text"/>').appendTo(page);
      ui.pageLabel = $('<label for="df_book_page_number"/>').appendTo(page);

      var sizeControls = $(html.div, {
        class: wrapperClass + " " + uiClass + "-size"
      });

      var help = $(html.div, {
        class: buttonClass + " " + uiClass + "-help " + options.icons['help'],
        title: options.text.toggleHelp,
        html: "<span>" + options.text.toggleHelp + "</span>"
      }).on("click", function () {

      });


      //Sound Button
      var sound = ui.sound = $(html.div, {

        class: buttonClass + " " + uiClass + "-sound " + options.icons['sound'],
        title: options.text.toggleSound,
        html: "<span>" + options.text.toggleSound + "</span>"

      }).on("click", function () {

        options.soundEnable = !options.soundEnable;
        ui.updateSound();

      });

      //Updates sound on click of sound button
      ui.updateSound = function () {

        if (options.soundEnable == false || options.soundEnable == 'false')
          sound.addClass("disabled");
        else
          sound.removeClass("disabled");

      };

      //immediate check
      ui.updateSound();


      //More button
      var more = ui.more = $(html.div, {

        class: buttonClass + " " + uiClass + "-more " + options.icons['more']

      }).on("click", function (event) {
        if (!more.hasClass("df-active")) {
          $(this).addClass("df-active");
          event.stopPropagation();
        }
      });

      //closes moreoptions container
      function closeMoreOptions(event) {
        more.removeClass("df-active");
      }

      //register a click event on window to close the moreoptions
      window.addEventListener('click', closeMoreOptions, false);

      //more container that holds the moreoptions
      var moreContainer = $(html.div, {
        class: "more-container"
      });
      more.append(moreContainer);

      if (typeof options.source == 'string' && options.enableDownload == true) {
        var downloadClass = buttonClass + " " + uiClass + "-download " + options.icons['download'];
        var download = ui.download = $('<a download target="_blank" class="' + downloadClass + '"><span>' + options.text.downloadPDFFile + '</span></a>');
        download.attr("href", options.source).attr("title", options.text.downloadPDFFile);
        //moreContainer.append(download);
      }

      var fullscreenEnabled = utils.hasFullscreenEnabled();

      if (!fullscreenEnabled) {
        container.addClass("df-custom-fullscreen");
      }

      ui.switchFullscreen = function () {

        var fullscreenElement = utils.getFullscreenElement();

        var container = object.container[0];

        if (ui.isFullscreen != true) {

          object.container.addClass("df-fullscreen");
          if (container.requestFullscreen) {
            container.requestFullscreen();
          } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
          } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
          } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
          }

          ui.isFullscreen = true

        }
        else {

          object.container.removeClass("df-fullscreen");
          ui.isFullscreen = false;

          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }

        }

        if (!utils.hasFullscreenEnabled()) {
          setTimeout(function () {
            object.resize();
          }, 50);
        }
      };

      var fullScreen = ui.fullScreen = $(html.div, {

        class: buttonClass + " " + uiClass + "-fullscreen " + options.icons['fullscreen'],
        title: options.text.toggleFullscreen,
        html: "<span>" + options.text.toggleFullscreen + "</span>"

      }).on("click", ui.switchFullscreen);

      var fit = ui.fit = $(html.div, {

        class: buttonClass + " " + uiClass + "-fit " + options.icons['fitscreen']

      }).on("click", function () {

        $(this).toggleClass("df-button-fit-active");

      });
      sizeControls.append(fullScreen);

      var controls = $(html.div, {
        class: wrapperClass + " " + uiClass + "-controls"
      });

      var shareBox = ui.shareBox = new DFLIP.Share(container, options);

      var share = ui.share = $(html.div, {

        class: buttonClass + " " + uiClass + "-share " + options.icons['share'],
        title: options.text.share,
        html: "<span>" + options.text.share + "</span>"

      }).on("click", function (event) {
        if (ui.shareBox.isOpen == true)
          ui.shareBox.close();
        else {
          ui.shareBox.update(object.getURLHash());
          ui.shareBox.show();
        }
      });

      var start = ui.startPage = $(html.div, {

        class: buttonClass + " " + uiClass + "-start " + options.icons['start'],
        title: options.text.gotoFirstPage,
        html: "<span>" + options.text.gotoFirstPage + "</span>"

      }).on("click", function () {

        object.start();

      });


      var end = ui.endPage = $(html.div, {

        class: buttonClass + " " + uiClass + "-end " + options.icons['end'],
        title: options.text.gotoLastPage,
        html: "<span>" + options.text.gotoLastPage + "</span>"

      }).on("click", function () {

        object.end();

      });

      var pageModeButton = ui.pageMode = $(html.div, {

        class: buttonClass + " " + uiClass + "-pagemode " + options.icons['singlepage'],
        html: "<span>" + options.text.singlePageMode + "</span>"

      }).on("click", function () {

        var el = $(this);
        object.setPageMode(!el.hasClass(options.icons['doublepage']));

      });


      object.setPageMode(object.target.pageMode == DFLIP.PAGE_MODE.SINGLE)
      //moreContainer.append(pageModeButton).append(start).append(end).append(sound);

      var altPrev = ui.altPrev = $(html.div, {

        class: buttonClass + " " + uiClass + "-prev" + " " + uiClass + "-alt " + options.icons['prev'],
        title: options.text.previousPage,
        html: "<span>" + options.text.previousPage + "</span>"

      }).on("click", function () {
        object.prev();
      });

      var altNext = ui.altNext = $(html.div, {

        class: buttonClass + " " + uiClass + "-next" + " " + uiClass + "-alt " + options.icons['next'],
        title: options.text.nextPage,
        html: "<span>" + options.text.nextPage + "</span>"

      }).on("click", function () {
        object.next();
      });

      var thumbnail = ui.thumbnail = $(html.div, {

        class: buttonClass + " " + uiClass + "-thumbnail " + options.icons['thumbnail'],
        title: options.text.toggleThumbnails,
        html: "<span>" + options.text.toggleThumbnails + "</span>"

      }).on("click", function () {
        var $this = $(this);
        if (object.target.thumbContainer) {
          var thumbContainer = object.target.thumbContainer;
          thumbContainer.toggleClass("df-sidemenu-visible");
          $this.toggleClass("df-active");
        }
        else {
          object.contentProvider.initThumbs();
          $this.toggleClass("df-active");
        }
        if ($this.hasClass("df-active")) {
          $this.siblings(".df-active").trigger("click");
        }
        ui.update(true);
      });

      var outline = ui.outline = $(html.div, {

        class: buttonClass + " " + uiClass + "-outline " + options.icons['outline'],
        title: options.text.toggleOutline,
        html: "<span>" + options.text.toggleOutline + "</span>"

      }).on("click", function () {
        var $this = $(this);
        if (object.target.outlineContainer) {
          var outlineContainer = object.target.outlineContainer;
          $this.toggleClass("df-active");
          outlineContainer.toggleClass("df-sidemenu-visible");
          if ($this.hasClass("df-active")) {
            $this.siblings(".df-active").trigger("click");
          }
          ui.update(true);
        }
      });

      /**
       * Controls position and pplace ment is determined by options.moreControls and options.hideControls
       */
      var allControls = options.allControls.replace(/ /g, '').split(','),
        moreControls = "," + options.moreControls.replace(/ /g, '') + ",",
        hideControls = "," + options.hideControls.replace(/ /g, '') + ",";

      var moreControlsArray = moreControls.split(',');

      for (var controlCount = 0; controlCount < allControls.length; controlCount++) {
        //if hidden skip
        var controlName = allControls[controlCount];
        if (hideControls.indexOf("," + controlName + ",") < 0) { //not found in hide list
          var control = ui[controlName];
          if (control != null) {
            if (moreControls.indexOf("," + controlName + ",") > -1 && controlName !== 'more' && controlName !== 'pageNumber') {//found in more controls
              moreContainer.append(control);
            }
            else {
              controls.append(control);
            }
          }
        }
      }

      container.append(controls).append(prev).append(next).append(zoom);

      var ctrlDown = false, shiftDown = false, altDown = false;
      var shiftKey = 16, ctrlKey = 17, altKey = 18, sKey = 83, vKey = 86, cKey = 67, eKey = 69, gKey = 71, nKey = 78,
        oKey = 79, deleteKey = 46, rightKey = 39, leftKey = 37, escKey = 27;

      document.addEventListener('keyup', onKeyUp, false);

      function onKeyUp(event) {
        switch (event.keyCode) {
          case escKey:
            if (ui.isFullscreen == true) ui.fullScreen.trigger("click");
            break;
          case shiftKey:
            shiftDown = false;
            break;
          case ctrlKey:
            ctrlDown = false;
            break;
          case altKey:
            altDown = false;
            break;
          case leftKey:
            object.prev();
            break;
          case rightKey:
            object.next();
            break;
          default:
            break;
        }
        //log(event.keyCode);
      }

      ui.update = function (resize) {
        log("ui update");
        var target = object.target;

        var pageNumber = validPage(target._activePage || object._activePage);
        var pageCount = target.pageCount || object.pageCount;

        var isRTL = target.direction == DFLIP.DIRECTION.RTL,
          isStart = (pageNumber == 1 || pageNumber == 0),
          isEnd = pageNumber == pageCount;

        ui.next.show();
        ui.prev.show();
        ui.altNext.removeClass("disabled");
        ui.altPrev.removeClass("disabled");

        if ((isStart && !isRTL) || (isEnd && isRTL)) {
          ui.prev.hide();
          ui.altPrev.addClass("disabled");
        }
        if ((isEnd && !isRTL) || (isStart && isRTL)) {
          ui.next.hide();
          ui.altNext.addClass("disabled");
        }

        ui.pageInput.val(pageNumber);
        ui.pageLabel.html((pageNumber) + "/" + pageCount);


        if (container.find(".df-sidemenu-visible").length > 0) {
          container.addClass("df-sidemenu-open");
        }
        else {
          container.removeClass("df-sidemenu-open");
        }
        if (resize == true)
          object.resize();

        if (target.contentProvider.zoomScale == target.contentProvider.maxZoom) {
          ui.zoomIn.addClass("disabled");
        }
        else {
          ui.zoomIn.removeClass("disabled");
        }

        if (target.contentProvider.zoomScale == 1) {
          ui.zoomOut.addClass("disabled");
        }
        else {
          ui.zoomOut.removeClass("disabled");
        }

      };

      if (object.target != null) {
        object.target.ui = ui;
      }

      if (options.onCreateUI != null)
        options.onCreateUI(object);
    }
  ;

  var PreviewStage = null;
  //later updated via RegisterMockupObjects in case 3d is requested

  //Registers necessary mockup object when required
  function RegisterMockupObjects() {

    PreviewStage = (function (_super) {
      __extends(PreviewStage, _super);
      function PreviewStage(parameters) {
        parameters = parameters || {};
        var _this = this;
        _super.call(this, parameters);
        _this.options = parameters;
        _this.canvas = $(_this.renderer.domElement).addClass("df-3dcanvas");
        _this.container = parameters.container;
        _this.container.append(_this.canvas);
        //_this.container.height(parameters.height);
        _this.type = "PreviewStage";
        _this.mouse = new THREE.Vector2();
        _this.raycaster = new THREE.Raycaster();

        _this.camera.position.set(0, 20, 600);
        _this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        //shadows are zigzap due to shadow camera position
        _this.spotLight.position.set(-220, 330, 550);

        _this.spotLight.castShadow = isMobile ? false : parameters.webglShadow;
        //_this.spotLight.shadowDarkness = 0.6;
        if (_this.spotLight.shadow) {
          _this.spotLight.shadow.bias = -0.0008;
        }
        _this.spotLight.intensity = isset(parameters.spotLightIntensity, defaults.spotLightIntensity);
        _this.ambientLight.color = new THREE.Color(isset(parameters.ambientLightColor, defaults.ambientLightColor));
        _this.ambientLight.intensity = isset(parameters.ambientLightIntensity, defaults.ambientLightIntensity);

        var material = new THREE.ShadowMaterial();
        material.opacity = isset(parameters.shadowOpacity, defaults.shadowOpacity);

        _this.ground.material = material;
        _this.ground.position.z = -2;

        _this.orbitControl.maxAzimuthAngle = 0.4;
        _this.orbitControl.minAzimuthAngle = -0.4;
        _this.orbitControl.minPolarAngle = 1.4;
        _this.orbitControl.maxPolarAngle = 2.2;

        //_this.orbitControl.maxPolarAngle = 10;
        _this.orbitControl.mouseButtons.ORBIT = THREE.MOUSE.RIGHT;
        _this.orbitControl.mouseButtons.PAN = -1;
        _this.orbitControl.maxDistance = 5000;
        _this.orbitControl.minDistance = 50;
        _this.orbitControl.noZoom = true;

        _this.selectiveRendering = true;

        _this.orbitControl.zoomSpeed = 5;

        _this.orbitControl.keyPanSpeed = 0;
        _this.orbitControl.center.set(0, 0, 0);
        _this.orbitControl.update();

        _this.swipe_threshold = isMobile ? 15 : 20;

        var cssRenderer = _this.cssRenderer = new THREE.CSS3DRenderer();
        $(cssRenderer.domElement).css({
          position: "absolute",
          top: 0,
          pointerEvents: "none"
        }).addClass("df-3dcanvas df-csscanvas");
        _this.container[0].appendChild(cssRenderer.domElement);

        var cssScene = _this.cssScene = new THREE.Scene();

        var divLeftDOM = document.createElement("div");
        divLeftDOM.className = "df-page-content df-page-content-left";

        var divRightDOM = document.createElement("div");
        divRightDOM.className = "df-page-content df-page-content-right";

        var divLeft = cssScene.divLeft = new THREE.CSS3DObject(divLeftDOM);
        var divRight = cssScene.divRight = new THREE.CSS3DObject(divRightDOM);
        cssScene.add(divLeft);
        cssScene.add(divRight);

        _this.resizeCallback = function () {
          cssRenderer.setSize(_this.canvas.width(), _this.canvas.height());
        };

        function requestRender() {
          _this.renderRequestPending = true;
        }

        window.addEventListener(mouseEvents.move, requestRender, false);

        window.addEventListener('keyup', requestRender, false);


        _this.dispose = function () {

          _this.clearChild();
          _this.render();

          window.removeEventListener(mouseEvents.move, requestRender, false);

          if (_this.options.scrollWheel == true) {
            _this.renderer.domElement.removeEventListener('mousewheel', onMouseWheel, false);
            _this.renderer.domElement.removeEventListener('DOMMouseScroll', onMouseWheel, false); // firefox
          }

          window.removeEventListener('keyup', requestRender, false);

          _this.renderer.domElement.removeEventListener("mousemove", editor_mouseMove, false);
          _this.renderer.domElement.removeEventListener("touchmove", editor_mouseMove, false);

          _this.renderer.domElement.removeEventListener("mousedown", editor_mouseDown, false);
          _this.renderer.domElement.removeEventListener("touchstart", editor_mouseDown, false);
          _this.renderer.domElement.removeEventListener("mouseup", editor_mouseUp, false);
          _this.renderer.domElement.removeEventListener("touchend", editor_mouseUp, false);


          _this.canvas.remove();

          cssRenderer.domElement.parentNode.removeChild(cssRenderer.domElement);

          cssRenderer = null;

          _this.renderCallback = null;
          _this.renderCallback = null;
          _this.orbitControl.dispose();
          _this.orbitControl = null;


          _this.renderer.dispose();

          _this.cancelRAF();
        };

        _this.renderCallback = function () {
          if (TWEEN.getAll().length > 0)
            _this.renderRequestPending = true;
          TWEEN.update();
          cssRenderer.render(cssScene, _this.camera)
        };

        var onMouseWheel = function (event) {
          var delta = 0;

          if (event.wheelDelta != null) { // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;

          } else if (event.detail != null) { // Firefox

            delta = -event.detail;

          }
          if (delta) {
            var currentZoom = _this.previewObject.contentProvider.zoomScale;
            if ((delta > 0 && currentZoom == 1)
              || (delta < 0 && currentZoom > 1)) {
              event.preventDefault();
            }
            _this.previewObject.zoom(delta > 0 ? 1 : -1);
          }

          requestRender();
        };

        var editor_mouseMove = function (event) {

          _this.renderRequestPending = true;
          event = fixMouseEvent(event);
          if (_this.isMouseDown && event.movementX != 0 && event.movementY != 0) {
            _this.isMouseMoving = true;
          }
          if (event.touches != null && event.touches.length == 2 && _this.startTouches != null) {
            //return;
            // _this.startTouches = event.touches;
            _this.zoomDirty = true;
            var touchCenter = utils.getVectorAvg(utils.getTouches(event, _this.container.offset())),
              newScale = utils.calculateScale(_this.startTouches, utils.getTouches(event)),
              scale = newScale / _this.lastScale;

            var zoom = _this.previewObject.contentProvider.zoomScale,
              x = touchCenter.x,
              y = touchCenter.y;

            _this.camera.position.z = _this.originalZ / (newScale);
            _this.lastScale = newScale;

            _this.lastZoomCenter = touchCenter;
            event.preventDefault();
            return;
          }
          if (_this.isMouseDown == true && _this.previewObject.contentProvider.zoomScale == 1) {
            //check if swipe has happened

            var swipe_dist = event.pageX - _this.lastPos,
              swipe_time = performance.now() - _this.lastTime;

            //$("body > p").html(swipe_dist);

            if (Math.abs(swipe_dist) > _this.swipe_threshold) {
              //swipe has triggered
              //_this.dragPage.pendingPoint = point;
              if (swipe_dist < 0) {
                _this.target.next();
              }
              else {
                _this.target.prev();
              }
              event.preventDefault();
              _this.isMouseDown = false;
            }
            _this.lastPos = event.pageX;
            _this.lastTime = performance.now();

          }
        };

        var editor_mouseDown = function (event) {
          event = fixMouseEvent(event);
          if (event.touches != null && event.touches.length == 2 && _this.startTouches == null) {
            _this.startTouches = utils.getTouches(event);
            _this.lastScale = 1;
            _this.originalZ = _this.camera.position.z * 1;
          }
          document.activeElement.blur();
          _this.mouseValue = event.pageX + "," + event.pageY;
          _this.isMouseMoving = false;
          _this.isMouseDown = true;
          _this.lastPos = event.pageX;
          _this.lastTime = performance.now();
        };

        var editor_click = function (event) {
          _this.isMouseDown = false;
          //bail out if it's not left click
          if (event.button !== 0) return this;
          var mouseValue = event.pageX + "," + event.pageY;

          if (_this.isMouseMoving) {

          }
          else if (mouseValue == _this.mouseValue) {
            event = event || window.event;
            event = $.event.fix(event);

            var mouse = _this.mouse, raycaster = _this.raycaster;
            mouse.x = ( (event.offsetX) / _this.canvas.innerWidth() ) * 2 - 1;
            mouse.y = 1 - ( (event.offsetY ) / _this.canvas.innerHeight() ) * 2;

            raycaster.setFromCamera(mouse, _this.camera);

            var intersects = raycaster.intersectObjects(_this.target instanceof MOCKUP.Bundle
              ? _this.target.children : [_this.target], true);

            if (intersects.length > 0) {

              var object, objectCount = 0;
              do {
                object = intersects[objectCount] != null ? intersects[objectCount].object : null;
                //bookStage.clickFace = intersects[objectCount].face;
                objectCount++;
              } while ((object instanceof THREE.BoxHelper || !(object instanceof MOCKUP.Paper) || object.isFlipping == true) && objectCount < intersects.length);

              //if (object.parent instanceof  MOCKUP.Bundle) {
              //    object = object.parent;
              //}

              if (object.userData.object != null) {

                // helper

                //bookStage.selectObject(object.userData.object);

              } else {

                if (object.angles[1] > 90) {
                  if (object.isEdge != true) _this.target.next();
                }
                else {
                  if (object.isEdge != true) _this.target.prev();
                }

              }

            } else {

              //bookStage.selectObject(null);

            }
          }
          //bookStage.stage.render();
        };

        var editor_mouseUp = function (event) {
          event = fixMouseEvent(event);
          if (event.touches != null && event.touches.length == 0) {
            var zoom = _this.previewObject.contentProvider.zoomScale;
            if (_this.zoomDirty == true) {
              _this.previewObject.contentProvider.zoomScale =
                utils.limitAt(_this.previewObject.contentProvider.zoomScale * _this.lastScale,
                  1, _this.previewObject.contentProvider.maxZoom);
              _this.previewObject.zoomValue = _this.previewObject.contentProvider.zoomScale * 1;
              //_this.previewObject.zoom(_this.lastScale < 1 ? -1 : 1);
              //console.log(_this.previewObject.contentProvider.zoomScale * _this.lastScale,_this.previewObject.contentProvider.maxZoom)
              //_this.previewObject.pendingZoom = true;
              _this.previewObject.resize();
              _this.zoomDirty = false;
            }

            _this.lastScale = null;
            _this.startTouches = null;
          }
          if (event.touches != null && event.touches.length > 1) return;
          editor_click(event);
        };
        //if (MOCKUP.mode !== MOCKUP.MODE.PLUGIN) {

        //_this.renderer.domElement.addEventListener('click', editor_click, false);
        //bookStage.renderer.domElement.addEventListener('dblclick', editor_dblclick, false);
        _this.renderer.domElement.addEventListener("mousemove", editor_mouseMove, false);
        _this.renderer.domElement.addEventListener("touchmove", editor_mouseMove, false);

        _this.renderer.domElement.addEventListener("mousedown", editor_mouseDown, false);
        _this.renderer.domElement.addEventListener("touchstart", editor_mouseDown, false);
        _this.renderer.domElement.addEventListener("mouseup", editor_mouseUp, false);
        _this.renderer.domElement.addEventListener("touchend", editor_mouseUp, false);
        if (_this.options.scrollWheel == true) {
          _this.renderer.domElement.addEventListener('mousewheel', onMouseWheel, false);
          _this.renderer.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false); // firefox
        }

        //}

        $(_this.renderer.domElement).css({display: "block"});

        $(window).trigger("resize");

        return this;
      }

      PreviewStage.prototype.width = function () {
        return this.container.width();
      };

      PreviewStage.prototype.height = function () {
        return this.container.height();
      };

      return PreviewStage;

    })(MOCKUP.Stage);
    MOCKUP.PreviewStage = PreviewStage;

    var BookPaper = (function (_super) {
      __extends(BookPaper, _super);
      function BookPaper(parameters, stage) {
        parameters = parameters || {};
        parameters.folds = 1;
        _super.call(this, parameters, stage);
        this.angle = 0;
        this.isFlipping = false;
        this.material.materials[5].transparent = true;
        this.material.materials[4].transparent = true;
        this.type = "BookPaper";
      }

      BookPaper.prototype.tween = function (oldAngle, newAngle) {
        var page = this;
        var epsilon = 0.00001;
        page.originalStiff = page.stiffness;
        var oldTarget = page.newStiffness;
        var isBooklet = isBookletMode(page.parent);
        //console.log(page.stiffness);
        var diff = newAngle - oldAngle;//170 -5 == 165 :  5-170 = -165

        var isRight = oldAngle > 90;
        var isRTL = page.parent.direction == DFLIP.DIRECTION.RTL;
        page.init = {
          angle: oldAngle,
          angle2: (oldAngle < 90 ? 0 : 180),
          stiff: page.originalStiff,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 1 : 0
        };
        page.first = {
          angle: oldAngle + diff / 4,
          angle2: (oldAngle < 90 ? 90 : 90),
          stiff: page.originalStiff,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 1 : 0.25
        };
        page.mid = {
          angle: oldAngle + diff * 2 / 4,
          angle2: (oldAngle < 90 ? 135 : 45),
          stiff: page.newStiffness,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 0.5 : 0.5
        };
        page.mid2 = {
          angle: oldAngle + diff * 3 / 4,
          angle2: (oldAngle < 90 ? 180 : 0),
          stiff: page.newStiffness,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 0.25 : 1
        };
        page.end = {
          angle: newAngle,
          angle2: (oldAngle < 90 ? 180 : 0),
          stiff: page.newStiffness,
          index: (isRight && !isRTL) || (!isRight && isRTL) ? 0 : 1
        };

        //console.log(page.init, page.first, page.mid, page.end);
        page.isFlipping = true;

        var update = function (tween, event) {

          page.angles[1] = tween.angle;
          page.angles[4] = page.isHard ? tween.angle : tween.angle2;
          if (page.isHard == true) {
            page.stiffness = 0;
          } else {
            page.stiffness = tween.stiff / (oldTarget + epsilon) * (page.newStiffness + epsilon);
            page.stiffness = isNaN(page.stiffness) ? 0 : tween.stiff;
          }
          if (isBooklet) {
            page.material.materials[5].opacity = page.material.materials[4].opacity = tween.index;
            page.castShadow = (isRight && !isRTL) || (!isRight && isRTL) ? tween.index > 0.5 : tween.index > 0.5;
          }
          //check if any sibling is flipping and their stiff is more that this

          page.updateAngle(true);

        };

        if (isBooklet && ((!isRight && !isRTL) || (isRight && isRTL))) {
          page.material.materials[5].opacity = page.material.materials[4].opacity = 0;
          page.castShadow = false;
        }

        page.currentTween = new TWEEN.Tween(page.init)
          .to({
            angle: [page.first.angle, page.mid.angle, page.mid2.angle, page.end.angle],
            angle2: [page.first.angle2, page.mid.angle2, page.mid2.angle2, page.end.angle2],
            stiff: [page.first.stiff, page.mid.stiff, page.mid2.stiff, page.end.stiff],
            index: [page.first.index, page.mid.index, page.mid2.index, page.end.index]
          }, page.parent.duration)
          .onUpdate(function (event) {
            update(this, event);
          }).easing(TWEEN.Easing.Sinusoidal.Out)
          .onComplete(function (event) {
            page.stiffness = page.newStiffness;
            page.updateAngle();
            page.material.materials[5].opacity = page.material.materials[4].opacity = 1;
            page.castShadow = true;
            page.isFlipping = false;
            if (page.parent && page.parent.refresh)
              page.parent.refresh();
            //console.log(page.stiffness);
          }).start();

      };

      return BookPaper;
    })(MOCKUP.FlexBoxPaper);
    MOCKUP.BookPaper = BookPaper;

    var Book = (function (_super) {
      __extends(Book, _super);

      function Book(parameters, stage) {

        parameters = parameters || {};
        parameters.segments = parameters.segments || 50;
        this.pageCount = parameters.pageCount;

        this.height = parameters.height;
        this.width = parameters.width;

        //correcting page count as multiple of 2
        this.pageCount = (this.pageCount == 1 ? this.pageCount : Math.ceil(this.pageCount / 2) * 2);

        this.direction = parameters.direction || DFLIP.DIRECTION.LTR;

        this.startPage = 1;
        this.endPage = this.pageCount;

        this.stackCount = parameters.stackCount || 6;// = 15;
        this.materials = [];

        _super.call(this, parameters, stage);
        this.angles = [0, 0, 0, 0, 0, 0];
        this.stiffness = parameters.stiffness == null ? 1.5 : parameters.stiffness; //so that 0 can be set
        this.hardConfig = parameters.hard; //hard is not that good in 3d
        this._activePage = parameters.openPage || this.startPage;

        this.createStack(parameters);
        this.pageMode = parameters.pageMode || ((isMobile || this.pageCount <= 2) ? DFLIP.PAGE_MODE.SINGLE
            : DFLIP.PAGE_MODE.DOUBLE);

        this.singlePageMode = parameters.singlePageMode || (isMobile ? DFLIP.SINGLE_PAGE_MODE.BOOKLET
            : DFLIP.SINGLE_PAGE_MODE.ZOOM);


        this.type = "Book";

      }

      Book.prototype.getPageByNumber = function (pageNumber) {
        var relativePageNumber = isBookletMode(this) ? (isRTLMode(this) ? pageNumber + 1 : pageNumber)
          : Math.floor((pageNumber - 1) / 2);
        return this.getObjectByName(relativePageNumber.toString());
      };

      Book.prototype.isPageHard = function (pageNumber) {

        return utils.isHardPage(this.hardConfig, pageNumber, this.pageCount);

      };

      Book.prototype.activePage = function (pageNumber) {
        if (pageNumber == null) return this._activePage;
        this.gotoPage(pageNumber);
      };

      Book.prototype.gotoPage = function (pageNumber) {
        pageNumber = parseInt(pageNumber, 10);
        this._activePage = pageNumber;
        if (this.autoPlay == true) {
          this.previewObject.setAutoPlay(this.autoPlay);
        }
        this.updatePage(pageNumber);
        if (this && this.thumblist && this.thumblist.review)
          this.thumblist.review();
      };


      Book.prototype.moveBy = function (step) {
        var nextPage = this._activePage + step;
        nextPage = limitAt(nextPage, this.startPage, this.endPage);

        this.gotoPage(nextPage);
      };

      Book.prototype.next = function (step) {
        if (step == null)
          step =
            (this.direction == DFLIP.DIRECTION.RTL)
              ? -this.pageMode : this.pageMode;

        this.moveBy(step);
      };

      Book.prototype.prev = function (step) {
        if (step == null)
          step =
            (this.direction == DFLIP.DIRECTION.RTL)
              ? this.pageMode : -this.pageMode;

        this.moveBy(step);
      };

      Book.prototype.updateAngle = function () {

        var startAngle = this.angles[1];
        var endAngle = this.angles[4];

        var spreadAngle = endAngle - startAngle;
        var stacks = this.stackCount;

        for (var _stackCount = 0; _stackCount < stacks; _stackCount++) {
          var clone = this.children[_stackCount];
          //start from angle[1] and end at angles[4]
          clone.angles[1] = startAngle + _stackCount * spreadAngle / (stacks * 100);
          clone.stiffness = this.stiffness;//_stackCount/stacks;
          clone.updateAngle();
        }

      };

      Book.prototype.refresh = function () {
        this.updatePage(this._activePage);
        if (this.flipCallback != null) this.flipCallback();
      };


      Book.prototype.updatePage = function (pageNumber) {
        // this.contentProvider.setLoading(pageNumber, true);
        var isRTL = (this.direction == DFLIP.DIRECTION.RTL),
          isBooklet = isBookletMode(this),
          newBaseNumber = getBasePage(pageNumber);

        var pageDivisor = isBooklet ? 1 : 2;

        pageNumber = Math.floor((pageNumber / pageDivisor));

        if (isRTL) pageNumber = this.pageCount / pageDivisor - pageNumber;

        var oldBaseNumber = this.oldBaseNumber || 0;
        var pageCount = this.pageCount / pageDivisor;
        var stackCount = this.stackCount;
        var angleShift = 0.02;
        var depth = 0.4;
        var stiffFactor = isBooklet ? 0
          : (0.5 - Math.abs(pageCount / 2 - pageNumber) / pageCount) / this.stiffness;
        var positionFactor = 1;//(stiffFactor +width);
        // var centre = Math.floor(stackCount / 2);
        var midPoint = Math.floor(stackCount / 2);//pageNumber < centre ? pageNumber //starting center pages
        // : ((pageCount - pageNumber > centre) ? centre //other pages
        //: (pageNumber + centre - pageCount)) ;//remainig center page
        //console.log(midPoint);

        //var targetIndex = midPoint;
        //if(midPoint == centre) {
        /*This sitaution is good when there is icrement or decrement by 1*/
        var isLeft = false;
        if (oldBaseNumber > pageNumber) {
          isLeft = true;
          this.children[stackCount - 1].skipFlip = true;
          this.children.unshift(this.children.pop());

          // this.contentProvider.setLoading(pageNumber, true);
        }
        else if (oldBaseNumber < pageNumber) {
          this.children[0].skipFlip = true;
          this.children.push(this.children.shift());

          // this.contentProvider.setLoading(pageNumber, true);
        }

        var remainingPages = (pageCount - pageNumber);
        var stackDepth = (5) / pageCount;
        var leftDepth = stackDepth * pageNumber / 2;
        var rightDepth = stackDepth * remainingPages / 2;
        var maxDepth = (leftDepth < rightDepth ? rightDepth : leftDepth);
        //maxDepth = maxDepth > 5 ? 5: maxDepth;
        for (var _pageCount = 0; _pageCount < stackCount; _pageCount++) {
          var page = this.children[_pageCount];//this.getObjectByName("page"+_pageCount);//this.children[_pageCount];

          var color = page.color;
          var oldAngle = page.angles[1];
          var newAngle;
          var relativePageNumber = pageNumber - midPoint + _pageCount;
          if (isRTL) relativePageNumber = isBooklet ? this.pageCount - relativePageNumber
            : Math.floor(this.pageCount / 2) - relativePageNumber - 1;

          var isHard = page.isHard = this.isPageHard(relativePageNumber);
          var oldName = page.name;


          //Sizing
          page.isEdge = false; //true;
          if (_pageCount == 0) {
            page.depth = leftDepth < depth ? depth : leftDepth;
          }
          else if (_pageCount == stackCount - 1) {
            page.depth = rightDepth < depth ? depth : rightDepth;
          }
          else {
            page.depth = depth;
            page.isEdge = false;
          }
          if (page.isFlipping == true) {
            page.depth = depth;
          }
          page.position.x = 0;

          var leftAngle = angleShift * _pageCount,
            rightAngle = 180 - angleShift * (_pageCount - midPoint) + angleShift * _pageCount;

          if (_pageCount < midPoint) {
            page.newStiffness = isHard || this.stiffness == 0 ? 0 : stiffFactor / (pageNumber / pageCount) / 4;
            newAngle = leftAngle;
            page.position.z = maxDepth - ( -_pageCount + midPoint) * depth;//(pageNumber < pageCount / 2)
            if (isLeft == true) page.position.z -= depth;

          }
          else {
            newAngle = rightAngle;
            page.newStiffness = isHard || this.stiffness == 0 ? 0
              : stiffFactor / (Math.abs(pageCount - pageNumber) / pageCount) / 4;
            page.position.z = (maxDepth - (-stackCount + _pageCount + midPoint + 1) * depth) - page.depth;//(pageNumber < pageCount / 2)

          }

          if (page.isFlipping == false) {

            if (Math.abs(oldAngle - newAngle) > 20 && page.skipFlip == false) {
              page.depth = depth;
              //we need predicted stiffness so that there is no overlap issues
              var predicted = page.stiffness;

              if (oldAngle > newAngle) {//left
                predicted = stiffFactor / (Math.abs(pageCount - pageNumber) / pageCount) / 4;
              }
              else {//right
                predicted = stiffFactor / (pageNumber / pageCount) / 4;
              }
              page.position.z += depth;//((_pageCount < midPoint) ? 0 : depth) * 2;/// 2;

              page.stiffness = isNaN(predicted) ? page.stiffness : predicted;
              page.updateAngle(true);
              page.targetStiffness = isHard ? 0 : (_pageCount < pageNumber)
                ? stiffFactor / (Math.abs(pageCount - pageNumber) / pageCount) / 4
                : stiffFactor / (pageNumber / pageCount) / 4;

              page.targetStiffness = isHard ? 0 : (isNaN(page.targetStiffness) ? page.stiffness : page.targetStiffness);

              page.isFlipping = true;

              page.tween(oldAngle, newAngle);

              if (this.preFlipCallback != null)
                this.preFlipCallback();
            } else {
              page.skipFlip = false;
              page.newStiffness = isNaN(page.newStiffness) ? 0 : page.newStiffness;
              if (page.angles[1] != newAngle || page.stiffness != page.newStiffness || page.depth != page.oldDepth) {
                page.angles[1] = page.angles[4] = newAngle;
                page.stiffness = page.newStiffness;
                page.updateAngle(true);
              }
              else {
                //console.log("skipped");
              }
            }
          }

          page.visible = isBooklet
            ? (isRTL

              ? (_pageCount < midPoint || page.isFlipping)
              : (_pageCount >= midPoint || page.isFlipping))

            : ((relativePageNumber >= 0 && relativePageNumber < pageCount) || (isBooklet && relativePageNumber == pageCount));


          if (this.requestPage != null && page.visible == true) {
            page.name = relativePageNumber.toString();
            if (page.name != oldName) {

              page.textureLoaded = false;
              page.frontImage(defaults.textureLoadFallback);
              page.frontPageStamp = "-1";
              page.frontTextureLoaded = false;
              page.thumbLoaded = false;

              // if (!isBooklet) {
              page.backImage(defaults.textureLoadFallback);
              page.backPageStamp = "-1";
              page.backTextureLoaded = false;
              // }
              this.requestPage();
            }
          }

          //if (isBooklet && _pageCount < midPoint && page.isFlipping == false)
          //	page.visible = false;

          page.oldDepth = page.depth;
          var xPos = Math.abs(page.geometry.boundingBox.max.x) < Math.abs(page.geometry.boundingBox.min.x)
            ? page.geometry.boundingBox.max.x : page.geometry.boundingBox.min.x;
          page.position.x = (page.isEdge == true && page.isFlipping == false ) ? ((_pageCount < midPoint)
            ? xPos : -xPos) : 0;
        }
        //$(".quick-hint").html(pageNumber);
        //console.log("leftDepth:" + leftDepth, "rightDepth:" + rightDepth, "midPoint:" + midPoint, "oldBaseNumber:" + oldBaseNumber, "pageNumber:" + pageNumber);
        this.oldBaseNumber = pageNumber;

        if (this.updatePageCallback != null)
          this.updatePageCallback();

      };
      //if (window.flipBook != null)flipBook.book.refresh();
      //book.activePage(book.activePage());
      Book.prototype.createCover = function (parameters) {
        parameters.width = parameters.width * 2;
        this.cover = new MOCKUP.BiFold(parameters);
        this.add(this.cover);
      };

      Book.prototype.createStack = function (parameters) {

        var colors = "red,green,blue,yellow,orange,black".split(",");

        for (var _stackCount = 0; _stackCount < this.stackCount; _stackCount++) {
          parameters.angles = [, this.stackCount - _stackCount];//[1] = (this.stackCount - _stackCount);
          parameters.stiffness = (this.stackCount - _stackCount) / 100;

          var clone = new MOCKUP.BookPaper(parameters);
          clone.angles[1] = 180;
          //clone.name = "page" + _stackCount;
          clone.index = _stackCount;
          clone.updateAngle();
          clone.textureReady = false;
          clone.textureRequested = false;
          this.add(clone);
          clone.color = colors[_stackCount];
          //for (var _count = 0; _count < 4; _count++) {
          //    clone.material.materials[_count].color = new THREE.Color(THREE.ColorKeywords[colors[_stackCount]]);
          //}
          clone.position.z = -1 * _stackCount;// * (this.mainObject.depth * 1.05);
        }
      };


      Book.prototype.shininess = function (shininess) {
        if (shininess == null) {
          return this.mainObject.shininess();
        }
        else {
          this.mainObject.shininess(shininess);
        }
      };

      Book.prototype.bumpScale = function (bumpScale) {
        if (bumpScale == null) {
          return this.mainObject.bumpScale();
        }
        else {
          this.mainObject.bumpScale(bumpScale);
        }
      };


      Book.prototype.frontImage = function (frontImage) {
        if (frontImage == null) {
          return this.mainObject.frontImage();
        }
        else {
          this.mainObject.frontImage(frontImage);
        }
      };


      Book.prototype.backImage = function (backImage) {
        if (backImage == null) {
          return this.mainObject.backImage();
        }
        else {
          this.mainObject.backImage(backImage);
        }
      };

      return Book;
    })(MOCKUP.Bundle);
    MOCKUP.Book = Book;

  }

  //base object of flipbook or other trifold objects
  var PreviewObject = (function (_super) {

    function PreviewObject(parameters) {
      parameters = parameters || {};
      //_super.call(this, parameters);
      this.type = "PreviewObject";
      var _this = this;

      _this.zoomValue = 1;
      function resizeDelay() {
        setTimeout(function () {
          _this.resize()
        }, 50);
      }

      window.addEventListener("resize", resizeDelay, false);

      this.sound = document.createElement("audio");
      this.sound.setAttribute("src", parameters.soundFile + "?ver=" + DFLIP.version);
      this.sound.setAttribute("type", "audio/mpeg");

      this.autoPlayFunction = function () {
        if (_this && _this.target.autoPlay) {
          if (_this.target.direction == DFLIP.DIRECTION.RTL)
            _this.target.prev();
          else
            _this.target.next();
        }
      };
      //this.pageMode = DFLIP.PAGE_MODE.DOUBLE;
      this.dispose = function () {

        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
        this.autoPlayFunction = null;

        //complete any tweens left.
        if (this.target && this.target.children) {
          for (var count = 0; count < this.target.children.length; count++) {
            var page = this.target.children[count];
            if (page && page.currentTween) page.currentTween.stop();
          }
        }
        //first dispose internal objects
        if (this.zoomTween) {
          if (this.zoomTween.stop) this.zoomTween.stop();
          this.zoomTween = null;
        }
        if (this.container && this.container.info && this.container.info.remove)
          this.container.info.remove();

        if (this.target && this.target.dispose)
          this.target.dispose();
        this.target = null;

        if (this.stage && this.stage.dispose)
          this.stage.dispose();
        this.stage = null;

        //if (this.target && this.target.outlineContainer) this.target.outlineContainer.remove();

        if (this.ui && this.ui.dispose)
          this.ui.dispose();
        this.ui = null;

        if (this.contentProvider && this.contentProvider.dispose)
          this.contentProvider.dispose();
        this.contentProvider = null;

        window.removeEventListener("resize", resizeDelay);

      };
    }

    PreviewObject.prototype = {

      start: function () {

        this.target.gotoPage(this.target.startPage);

      },

      end: function () {
        this.target.gotoPage(this.target.endPage);
      },

      next: function () {

      },

      prev: function () {

      },

      zoom: function (delta) {

        this.pendingZoom = true;
        this.zoomDelta = delta;

        this.resize();
        this.ui.update();
      },

      resize: function () {

        var _this = this;

        if (_this.target == null ||
          _this.target.ui == null ||
          _this.target.contentProvider == null ||
          _this.target.contentProvider.viewport == null ||
          _this.target.stage == null)
          return;

        if (this.ui && this.ui.isFullscreen == true && utils.hasFullscreenEnabled() == true && utils.getFullscreenElement() == null) {
          this.ui.switchFullscreen();
        }

        //Variable Caches
        var target = _this.target,
          container = _this.container,
          options = _this.options,
          stage = target.stage,
          contentProvider = target.contentProvider,
          pageRatio = contentProvider.pageRatio,
          zoomViewport = contentProvider.zoomViewport,
          isRTL = isRTLMode(target),
          is3d = target.mode !== "css",
          isLandScape = contentProvider.pageRatio > 1,
          isWide, height, width, cameraZ, fov, zoom, maxZoom,
          sideShift = container.hasClass("df-sidemenu-open") ? 220 : 0,
          isSingle = this.target.pageMode == DFLIP.PAGE_MODE.SINGLE;

        /*SIZE CALCULATION*/
        //checking if the container height is more than the window height
        container.height(options.height);
        var containerHeight = Math.min(container.height(), $(window).height());
        container.height(containerHeight);//setting twice for failsafe


        //checking if the responsive width according to container
        var containerWidth = container.width();
        if (containerWidth < 400) {//rather than responsive lets use
          _this.container.addClass("df-xs");
        } else {
          _this.container.removeClass("df-xs");
        }

        var controlsHeight = container.find(".df-ui-controls").height();
        var paddingTop = options.paddingTop + (options.controlsPosition == DFLIP.CONTROLSPOSITION.TOP
              ? controlsHeight : 0),
          paddingRight = options.paddingRight,
          paddingBottom = options.paddingBottom + (options.controlsPosition == DFLIP.CONTROLSPOSITION.BOTTOM
              ? controlsHeight : 0),
          paddingLeft = options.paddingLeft;

        paddingTop = isNaN(paddingTop) ? 0 : limitAt(paddingTop, 0, paddingTop),
          paddingBottom = isNaN(paddingBottom) ? 0 : limitAt(paddingBottom, 0, paddingBottom),
          paddingLeft = isNaN(paddingLeft) ? 0 : limitAt(paddingLeft, 0, paddingLeft),
          paddingRight = isNaN(paddingRight) ? 0 : limitAt(paddingRight, 0, paddingRight);

        //containerHeight, containerWidth, controlsHeight above
        var stageWidth = containerWidth - sideShift, //if sideMenu for thumbnails is open?
          stageHeight = containerHeight;
        var paddingHeight = paddingTop + paddingBottom,
          paddingWidth = paddingLeft + paddingRight;

        var stageInnerWidth = stageWidth - paddingWidth,
          stageInnerHeight = stageHeight - paddingHeight;

        width = Math.floor(isSingle ? stageInnerWidth : stageInnerWidth / 2);
        height = Math.floor(width / pageRatio);

        //check if book fits by width
        isWide = height > stageInnerHeight;
        if (isWide) {
          height = stageInnerHeight;
          width = height * pageRatio;
        }

        /*ZOOM CALCULATION*/
        //update maxZoom for current Stage Dimension
        maxZoom = contentProvider.maxZoom = contentProvider.zoomViewport.height / height;

        //set to 1 if unset initally
        if (_this.zoomValue == null) _this.zoomValue = 1;
        if (contentProvider.zoomScale == null) contentProvider.zoomScale = 1;

        if (_this.pendingZoom == true && _this.zoomDelta != null) {

          var delta = _this.zoomDelta, predictedIndex, currentMaxDimension = Math.max(height, width);

          _this.zoomValue = _this.zoomDelta > 0 ? _this.zoomValue * _this.options.zoomRatio
            : _this.zoomValue / _this.options.zoomRatio;
          _this.zoomValue = limitAt(_this.zoomValue, 1, maxZoom);

          if (_this.zoomValue == 1) {
            contentProvider.zoomScale = 1;
          } else {
            predictedIndex = height * _this.zoomValue;
            //zoomStops matches the contentProvider internal calcuation and prediction stops so that the texture size won't differ
            predictedIndex = utils.zoomStops(predictedIndex, _this.options.zoomRatio, _this.zoomDelta > 0, Math.max(width, height));
            contentProvider.zoomScale = limitAt(predictedIndex / currentMaxDimension, 1, maxZoom);
          }

        }

        zoom = contentProvider.zoomScale;

        //Update Image CacheSize Index
        contentProvider.checkViewportSize(width, height, zoom);

        if (contentProvider.contentSourceType == SOURCE_TYPE.PDF) {
          //recalculation is required for pixel shift issue only if the source is PDF
          width = contentProvider.imageViewport.width / zoom;
          height = contentProvider.imageViewport.height / zoom;
        }

        if (contentProvider.zoomScale != 1) {
          this.target.container.addClass("df-zoom-enabled");
        }

        var zoomWidth = target.zoomWidth = Math.floor(width * zoom),
          zoomHeight = target.zoomHeight = Math.floor(height * zoom);
        var zoomFullWidth = zoomWidth * 2;

        if (is3d) {

          //zoomHeight is equal to target.height (normally 300) so relative calculation is required
          var proportion = zoomHeight / target.height,
            aspect = stageWidth / stageHeight;
          var relativeHeight = zoom * (height + paddingHeight) / proportion,
            relativeWidth = zoom * (width * (isSingle ? 1 : 2) + paddingWidth) / proportion;

          var focusSize = isWide ? relativeHeight : relativeWidth / aspect;
          stage.resizeCanvas(stageWidth, stageHeight);

          cameraZ = 1 / ( 2 * Math.tan(Math.PI * stage.camera.fov * 0.5 / 180) / (focusSize / zoom)) + 2.2;

          stage.camera.updateProjectionMatrix();

          stage.renderRequestPending = true;

          //pixel value to stage position value

          var shift = (paddingTop - paddingBottom) * ( target.height / height) / zoom / 2;

          //put a check if the existing gap is enough
          // _this.target.position.y = shift;
          // stage.cssScene.position.y = _this.target.position.y;

          var _reset = contentProvider.zoomScale == 1;
          if (stage.camera.position.z !== cameraZ && _this.pendingZoom == true) { //avoid recreating the tween if the target is same as before
            if (_this.zoomTween != null)
              _this.zoomTween.stop();
            _this.zoomTween = new TWEEN.Tween({
              campos: stage.camera.position.z,
              otx: stage.orbitControl.target.x,
              oty: stage.orbitControl.target.y,
              otz: stage.orbitControl.target.z
            }).delay(0)
              .to({
                  campos: cameraZ,
                  otx: 0,
                  oty: shift,
                  otz: 0
                },
                100)
              .onUpdate(function () {
                stage.camera.position.z = this.campos;
                if (_reset) {
                  stage.camera.position.y = this.oty;
                  stage.orbitControl.target = new THREE.Vector3(this.otx, this.oty, this.otz);
                }
                stage.orbitControl.update();
              }).easing(TWEEN.Easing.Linear.None)
              .onComplete(function () {
                stage.camera.position.z = cameraZ;
                if (contentProvider.zoomScale == 1) {
                  stage.camera.position.set(0, shift, cameraZ);
                  stage.orbitControl.target = new THREE.Vector3(0, shift, 0);
                }
                stage.orbitControl.update();
              })
              .start();
          }
          else {
            if (contentProvider.zoomScale == 1) {
              stage.camera.position.set(0, shift, cameraZ);
              stage.orbitControl.target = new THREE.Vector3(0, shift, 0);
            }
            /*else {
              stage.camera.position.z = cameraZ;
            }*/
            stage.orbitControl.update();
          }

          stage.orbitControl.update();
          stage.orbitControl.mouseButtons.ORBIT = zoom != 1 ? -1 : THREE.MOUSE.RIGHT;
          stage.orbitControl.mouseButtons.PAN = zoom != 1 ? THREE.MOUSE.LEFT : -1;

        }
        else {

          target.pageWidth = Math.round(width);
          target.fullWidth = target.pageWidth * 2;
          target.height = Math.round(height);

          var shiftHeight = target.shiftHeight = Math.round(limitAt((zoomHeight - stageHeight + paddingHeight) / 2, 0, zoomHeight)),
            shiftWidth = target.shiftWidth = Math.round(limitAt((zoomFullWidth - stageWidth + paddingWidth ) / 2, 0, zoomFullWidth));

          if (zoom == 1) {
            target.left = 0;
            target.top = 0;
          }
          target.stage.css({
            top: -shiftHeight,
            bottom: -shiftHeight,
            right: -shiftWidth + (isRTL ? sideShift : 0),
            left: -shiftWidth + (isRTL ? 0 : sideShift),
            paddingTop: paddingTop,
            paddingRight: paddingRight,
            paddingBottom: paddingBottom,
            paddingLeft: paddingLeft,
            transform: "translate3d(" + target.left + "px," + target.top + "px,0)"
          });
          target.stageHeight = stage.height();

          target.wrapper.css({
            width: zoomFullWidth,
            height: zoomHeight,
            marginTop: (containerHeight - zoomHeight - paddingHeight ) > 0
              ? (containerHeight - paddingHeight - zoomHeight) / 2
              : 0
          });

          var wrapperSize = Math.floor((distOrigin(width, height)) * zoom);

          target.stage.find(".df-page-wrapper").width(wrapperSize).height(wrapperSize);

          target.stage.find(".df-book-page, .df-page-front , .df-page-back, .df-page-fold-inner-shadow").height(zoomHeight).width(zoomWidth);

        }

        _this.checkCenter({type: "resize"});

        if (contentProvider.zoomScale == 1) {
          this.target.container.removeClass("df-zoom-enabled");
        }

        if (target.thumblist) {
          target.thumblist.reset($(target.thumblist.container).height());
        }

        _this.pendingZoom = false;

      },

      playSound: function () {
        try {
          if (this.options && this.options.soundEnable == true) {
            this.sound.currentTime = 0;
            this.sound.play();
          }
        } catch (error) {

        }
      },

      setPageMode: function (isSingle) {
        if (isSingle == true) {
          this.ui.pageMode.addClass(this.options.icons['doublepage']);
          this.ui.pageMode.html("<span>" + this.options.text.doublePageMode + "</span>");
          this.ui.pageMode.attr("title", this.options.text.doublePageMode);
          this.target.pageMode = DFLIP.PAGE_MODE.SINGLE;
        }
        else {
          this.ui.pageMode.removeClass(this.options.icons['doublepage']);
          this.ui.pageMode.html("<span>" + this.options.text.singlePageMode + "</span>");
          this.ui.pageMode.attr("title", this.options.text.singlePageMode);
          this.target.pageMode = DFLIP.PAGE_MODE.DOUBLE;
        }

        if (this.target && this.target.singlePageMode == DFLIP.SINGLE_PAGE_MODE.BOOKLET) {
          this.target.reset();
        }

        this.resize();
      },
      setAutoPlay: function (isPlay) {
        if (this.options.autoPlay) {
          isPlay = isPlay == true;
          var text = isPlay ? this.options.text.pause : this.options.text.play;
          this.ui.play.toggleClass(this.options.icons['pause'], isPlay);
          this.ui.play.html("<span>" + text + "</span>");
          this.ui.play.attr("title", text);

          clearInterval(this.autoPlayTimer);
          if (isPlay) {
            this.autoPlayTimer = setInterval(this.autoPlayFunction, this.options.autoPlayDuration);
          }

          this.target.autoPlay = isPlay;
        }
      },
      height: function (height) {
        if (height == null) {
          return this.container.height();
        } else {
          this.options.height = height;
          this.container.height(height);
          this.resize();
        }
      },
      /**
       *checks whether the book is closed and needs to be centered
       */
      checkCenter: function (options) {

        options = options == null ? {} : options;
        this.centerType = this.centerType || "start";
        var target = this.target;
        var singleShift = 0, left = 0, right = 0;
        var basePage = utils.getBasePage(target._activePage);
        var isEven = target._activePage % 2 == 0;
        var isRTL = target.direction == DFLIP.DIRECTION.RTL;
        var isSingle = target.pageMode == DFLIP.PAGE_MODE.SINGLE,
          isBooklet = isSingle && target.singlePageMode == DFLIP.SINGLE_PAGE_MODE.BOOKLET;
        var stageWidth = target.stage.width(),
          width;

        if (target.mode == 'css') {
          width = target.wrapper.width();
          //calculate the excess shift required for correction in case width is too small
          singleShift = Math.max((width - stageWidth) / 2, 0);

          left = -width / 4;
          right = width / 4;

          if (basePage == 0 || isBooklet) {
            target.wrapper.css({
              left: isSingle
                ? isRTL ? right - singleShift : left - singleShift
                : isRTL ? right : left
            });
            target.shadow.css({width: '50%', left: isRTL ? 0 : '50%', transitionDelay: ''});
          }
          else if (basePage == target.pageCount) {
            target.wrapper.css({
              left: isSingle
                ? isRTL ? left - singleShift : right - singleShift
                : isRTL ? left : right
            });
            target.shadow.css({width: '50%', left: isRTL ? '50%' : 0, transitionDelay: ''});
          }
          else {
            target.wrapper.css({
              left: isSingle
                ? isRTL
                      ? (isEven ? left - singleShift : right - singleShift )
                      : (isEven ? right - singleShift : left - singleShift )
                : 0
            });
            target.shadow.css({
              width: '100%',
              left: 0,
              transitionDelay: (parseInt(target.duration, 10) + 50) + 'ms'
            });
          }

          target.wrapper.css({transition: options.type == "resize" ? "none" : ""});

        }
        else if (target.stage != null) {
          var init = target.position.x, end;
          singleShift = target.width / 4;
          width = target.width;
          left = -width / 2;
          right = width / 2;

          if (basePage == 0 || isBooklet) {
            end = isRTL ? right : left;
          }
          else if (basePage == target.pageCount) {
            end = isRTL ? left : right;
          }
          else {
            end = isSingle
              ? isRTL
                    ? (isEven ? left : right )
                    : (isEven ? right : left )
              : 0;
          }
          //create a centertween
          if (end !== this.centerEnd) { //avoid recreating the tween if the target is same as before
            this.centerTween = new TWEEN.Tween({x: init}).delay(0)
              .to({x: end}, target.duration)
              .onUpdate(function () {
                target.position.x = this.x;
                target.stage.cssScene.position.x = this.x;
              }).easing(target.ease)
              .start();
            this.centerEnd = end;

          }
        }
        // log("checkcenter at : " + left);
      },

      width: function (width) {
        if (width == null) {
          return this.container.width();
        } else {
          this.options.width = width;
          this.container.width(width);
          this.resize();
        }
      }

    };

    return PreviewObject;

  })({});

  DFLIP.PreviewObject = PreviewObject;

  //contentprovider that handles the source of book
  var ContentProvider = (function (_super) {
    __extends(ContentProvider, _super);


    function ContentProvider(contentSource, callback, parameters, flipbook) {

      parameters = parameters || {};

      var _this = this;

      _this.contentRawSource = contentSource || [defaults.textureLoadFallback];
      _this.contentSource = _this.contentRawSource;
      _this.contentSourceType = null;
      _this.minDimension = parameters.minTextureSize || 256;
      _this.maxDimension = parameters.maxTextureSize || 2048;
      _this.pdfRenderQuality = parameters.pdfRenderQuality || DFLIP.defaults.pdfRenderQuality;
      _this.flipbook = flipbook;
      _this.waitPeriod = 50;
      _this.maxLength = 297;
      _this.enableDebug = false;
      _this.zoomScale = 1;
      _this.maxZoom = 2;
      _this.options = parameters;
      _this.outline = parameters.outline;
      _this.links = parameters.links;
      _this.html = parameters.html;
      _this.isCrossOrigin = parameters.isCrossOrigin;

      _this.normalViewport = {
        height: 297,
        width: 210,
        scale: 1
      };
      _this.viewport = {
        height: 297,
        width: 210,
        scale: 1
      };
      _this.imageViewport = {
        height: 297,
        width: 210,
        scale: 1
      };
      _this.bookSize = {
        height: 297,
        width: 210
      }
      _this.zoomViewport = {
        height: 297,
        width: 210
      };

      _this.thumbsize = 128;
      _this.cacheIndex = 256; //index of bigger dimension height or width
      _this.cache = [];

      _this.pageRatio = parameters.pageRatio || _this.viewport.width / _this.viewport.height;

      //texture load control so that it wont delay the transition
      _this.textureLoadTimeOut = null;

      _this.type = "TextureLibrary";

      if (Array === _this.contentSource.constructor || Array.isArray(_this.contentSource) || _this.contentSource instanceof Array) {

        //case of images and html content
        _this.contentSourceType = SOURCE_TYPE.IMAGE;
        _this.pageCount = _this.contentSource.length;

        //_this.setLoading(1, true);

        // Make in memory copy of image to avoid css issues
        $("<img/>")
          .attr("src", _this.contentSource[0])
          .on('load', (function () {
            _this.viewport.height = this.height;
            _this.viewport.width = this.width;

            _this.pageRatio = _this.viewport.width / _this.viewport.height;
            _this.bookSize = {
              width: (_this.pageRatio > 1 ? 1 : _this.pageRatio) * _this.maxLength,
              height: _this.maxLength / (_this.pageRatio < 1 ? 1 : _this.pageRatio)
            };
            _this.zoomViewport = {
              width: (_this.pageRatio > 1 ? 1 : _this.pageRatio) * _this.maxDimension,
              height: _this.maxDimension / (_this.pageRatio < 1 ? 1 : _this.pageRatio)
            };

            _this.linkService = new PDFLinkService();

            $(this).off();

            if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL) {
              _this.pageCount = _this.contentSource.length * 2 - 2;
              if (_this.options.webgl == true)
                _this.requiresImageTextureScaling = true;
            }

            if (callback != null) {
              callback(_this);
              callback = null;
            }
            //_this.setLoading(1);

            //console.log(_this.zoomViewport);
            log(this.height + ":" + this.width);
            //pic_real_width = this.width;   // Note: $(this).width() will not
            //pic_real_height = this.height; // work for in memory images.
            //moved to set target function
            //_this.
            // ();


          }));

      }
      else if (typeof _this.contentSource == 'string' || _this.contentSource instanceof String) { //case of link to pdf file

        var processSource = function () {
          if (_this) {
            //configurePDFJS(PDFJS);
            PDFJS.workerSrc = defaults.pdfjsWorkerSrc;

            _this.contentSourceType = SOURCE_TYPE.PDF;
            //PDFJS.disableWorker = true;
            PDFJS.disableAutoFetch = true;
            PDFJS.disableStream = true;
            if (isSafari || isIOS || _this.options.disableFontFace == true) {
              PDFJS.disableFontFace = isSafari || isIOS || _this.options.disableFontFace == true;
            }
            PDFJS.imageResourcesPath = defaults.imageResourcesPath;
            PDFJS.cMapUrl = defaults.cMapUrl;
            PDFJS.cMapPacked = !0;
            PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK;

            var loading = _this.loading = PDFJS.getDocument(_this.options.docParameters ? _this.options.docParameters
              : {
                url: utils.httpsCorrection(contentSource),
                rangeChunkSize: isNaN(DFLIP.defaults.rangeChunkSize) ? 524288 : DFLIP.defaults.rangeChunkSize
              });

            loading.then(function sourceLoaded(pdf) {

                _this.pdfDocument = pdf;
                pdf.getPage(1).then(function (page) {
                  _this.normalViewport = page.getViewport(1);
                  _this.viewport = page.getViewport(1);
                  _this.viewport.height = _this.viewport.height / 10;
                  _this.viewport.width = _this.viewport.width / 10;

                  _this.pageRatio = _this.viewport.width / _this.viewport.height;

                  _this.bookSize = {
                    width: (_this.pageRatio > 1 ? 1 : _this.pageRatio) * _this.maxLength,
                    height: _this.maxLength / (_this.pageRatio < 1 ? 1 : _this.pageRatio)
                  };

                  _this.zoomViewport = {
                    width: (_this.pageRatio > 1 ? 1 : _this.pageRatio) * _this.maxDimension,
                    height: _this.maxDimension / (_this.pageRatio < 1 ? 1 : _this.pageRatio)
                  };

                  _this.refPage = page;

                  //console.log(_this.zoomViewport);

                  //check if intenal pages are of double sizes.
                  if (pdf.numPages > 1) {
                    pdf.getPage(2).then(function (page) {
                      if (_this.options.pageSize == DFLIP.PAGE_SIZE.AUTO) {
                        var _viewport = page.getViewport(1);
                        //Update: doing width check gives false alarm if the internal pages are of different sizes yet follow same aspect ratio
                        //if (_viewport.width > _this.normalViewport.width * 1.5) {
                        var _pageRatio = _viewport.width / _viewport.height;
                        if (_pageRatio > _this.pageRatio * 1.5) {
                          _this.options.pageSize = DFLIP.PAGE_SIZE.DOUBLEINTERNAL;
                          _this.pageCount = pdf.numPages * 2 - 2;
                        }
                        else {
                          _this.options.pageSize = DFLIP.PAGE_SIZE.SINGLE;
                        }
                      }
                      if (callback != null) {
                        callback(_this);
                        callback = null;
                      }
                    });
                  } else {
                    if (callback != null) {
                      callback(_this);
                      callback = null;
                    }
                  }

                });
                _this.linkService = new PDFLinkService();
                _this.linkService.setDocument(pdf, null);

                //moved to set target function
                //_this.initThumbs();
                _this.pageCount = pdf.numPages;
                _this.contentSource = pdf;

              },
              function loadingError(error) {
                if (_this) {
                  var cors = "", tmp = document.createElement('a');
                  tmp.href = _this.contentSource;

                  if (tmp.hostname !== window.location.hostname)
                    cors = "CROSS ORIGIN!! ";

                  _this.updateInfo(cors + "Cannot access file!  " + _this.contentSource);
                }
              });

            loading.onProgress = function getDocumentProgress(progressData) {
              if (_this) {
                var percentage = 100 * progressData.loaded / progressData.total;
                if (isNaN(percentage)) {
                  if (progressData && progressData.loaded) {
                    _this.updateInfo("Loading PDF " + (Math.ceil(progressData.loaded / 10000) / 100).toString() + "MB ...");
                  } else {
                    _this.updateInfo("Loading PDF ...");
                  }
                } else {
                  _this.updateInfo("Loading PDF " + percentage.toString().split(".")[0] + "% ...");
                }
              }
            };
          }
        };
        var checkCORS = function () {
          if (_this) {
            defaults.pdfjsWorkerSrc += "?ver=" + DFLIP.version;

            _this.updateInfo("Loading PDF Worker ...");
            var tmp = document.createElement('a');
            tmp.href = defaults.pdfjsWorkerSrc;

            if (tmp.hostname !== window.location.hostname) {
              _this.updateInfo("Loading PDF Worker CORS ...");
              $.ajax({
                url: defaults.pdfjsWorkerSrc,
                cache: true,
                success: function (data) {
                  defaults.pdfjsWorkerSrc = DFLIP.createObjectURL(data, "text/javascript");
                  processSource();
                }
              });
            }
            else {
              processSource();
            }
          }
        };
        if (window.PDFJS == null) {
          if (_this) {
            _this.updateInfo("Loading PDF Service ...");
            //getScript(defaults.pdfjsCompatibilitySrc + "?ver=" + DFLIP.version, function () {

            getScript(defaults.pdfjsSrc + "?ver=" + DFLIP.version, function () {

              if (typeof define === 'function' && define.amd) {
                _this.updateInfo("Loading PDF Service (require) ...");
                require.config({paths: {'pdfjs-dist/build/pdf.worker': defaults.pdfjsWorkerSrc.replace(".js", "")}});
                require(['pdfjs-dist/build/pdf'], function (pdf) {
                  checkCORS();
                });
              } else {
                checkCORS();
              }
            }, function () {
              _this.updateInfo("Unable to load PDF service..");
            });
            //});
          }
        }
        else {

          processSource();
        }

      }
      else {
        console.error("Unknown source type. Please check documentation for help");
      }

      this.dispose = function () {
        if (_this.loading && _this.loading.destroy) {
          _this.loading.destroy();
        }
        _this.loading = null;
        if (_this.textureLoadTimeOut) {
          clearTimeout(_this.textureLoadTimeOut);
          _this.textureLoadTimeOut = null;
        }
        if (this.targetObject) {
          if (this.targetObject.thumbContainer && this.targetObject.thumbContainer.remove)
            this.targetObject.thumbContainer.remove();
          if (this.targetObject.outlineContainer && this.targetObject.outlineContainer.remove)
            this.targetObject.outlineContainer.remove();
          if (this.targetObject.dispose) this.targetObject.dispose();
          this.targetObject.processPage = null;
          this.targetObject.requestPage = null;
          if (this.targetObject.container && this.targetObject.container.off)
            this.targetObject.container.off();

        }
        if (this.pdfDocument && this.pdfDocument.destroy) this.pdfDocument.destroy();
        if (this.linkService && this.linkService.dispose) this.linkService.dispose();
        if (this.outlineViewer && this.outlineViewer.dispose) this.outlineViewer.dispose();
        if (this.thumblist && this.thumblist.dispose) {
          this.thumblist.review = null;
          this.thumblist.dispose();
        }

        this.activeThumb = null;
        this.targetObject = null;
        this.pdfDocument = null;
        this.linkService = null;
        this.outlineViewer = null;
        this.thumblist = null;
        _this = null;
      };
      return this;
    }

    ContentProvider.prototype.updateInfo = function (info) {
      if (this.flipbook && this.flipbook.updateInfo) {
        this.flipbook.updateInfo(info);
      }
    };

    ContentProvider.prototype.initThumbs = function () {

      var _this = this;
      if (_this.cache[_this.thumbsize] == null) _this.cache[_this.thumbsize] = [];
      var thumbLoadTimeOut;
      var review = function () {
        clearTimeout(thumbLoadTimeOut);
        thumbLoadTimeOut = setTimeout(function () {

          thumbLoadTimeOut = setTimeout(reviewThumbs, _this.waitPeriod / 2);

        }, _this.waitPeriod);
      };

      var reviewThumbs = function () {
        var requestCount = 0;
        if (Date.now() - _this.thumblist.lastScrolled < 100) {
          requestCount = 1;
        } else {
          _this.targetObject.container.find(".df-thumb-container .df-vrow").each(function () {
            var thumb = $(this);
            if (!thumb.hasClass("df-thumb-loaded")) {
              requestCount++;
              var id = $(this).attr("id").replace("df-thumb", "");
              _this.getPage(id, review, true);
              thumb.addClass("df-thumb-loaded");
              return false;
            }
          });
          if (requestCount == 0) {
            clearTimeout(thumbLoadTimeOut);
          }
        }

        if (requestCount > 0) {
          review();
        }
        //move to thumb if thumb is on
        if (_this.activeThumb != _this.targetObject._activePage) {
          var thumbVisible = _this.targetObject.thumbContainer != null && _this.targetObject.thumbContainer.hasClass("df-sidemenu-visible");

          if (thumbVisible) {
            var wrapper = _this.thumblist.container;
            var cScroll = wrapper.scrollTop,
              cHeight = wrapper.getBoundingClientRect().height;

            var thumb = _this.targetObject.thumbContainer.find("#df-thumb" + _this.targetObject._activePage);
            if (thumb.length > 0) {//TODO direct jumps won't work..
              _this.targetObject.thumbContainer.find(".df-selected").removeClass("df-selected");
              thumb.addClass("df-selected");
              //js calculation
              thumb = thumb[0];


              if (cScroll + cHeight < thumb.offsetTop + thumb.scrollHeight)
                thumb.scrollIntoView(false);
              else if (cScroll > thumb.offsetTop)
                thumb.scrollIntoView();

              _this.activeThumb = _this.targetObject._activePage;
            }
            else {
              $(wrapper).scrollTop(_this.targetObject._activePage * 124);
              review();
            }
          }
        }
      };

      _this.thumblist = _this.targetObject.thumblist = new ThumbList({
        //w: 128 * _this.viewport.width/_this.viewport.height,
        h: 500,
        addFn: function (row) {

        },
        scrollFn: review,
        itemHeight: 128,
        totalRows: _this.pageCount,
        generatorFn: function (row) {
          var el = document.createElement("div");
          var pageNumber = row + 1;
          el.id = "df-thumb" + pageNumber;
          var elText = document.createElement("div");
          elText.innerHTML = pageNumber;
          el.appendChild(elText);
          //el.style.position = "absolute";
          //el.callback = function_this.getPage(pageNumber,null,true);
          return el;
        }
      });

      _this.thumblist.lastScrolled = Date.now();
      _this.thumblist.review = review;
      review();

      //_this.thumblist.container.classList.add('thumb-container');
      var thumbContainer = $('<div>').addClass("df-thumb-container df-sidemenu-visible df-sidemenu");
      thumbContainer.append($(_this.thumblist.container).addClass("df-thumb-wrapper"));
      _this.targetObject.thumbContainer = thumbContainer;
      _this.targetObject.container.append(thumbContainer);

      var sideMenuClose = $(html.div, {
        class: "df-ui-btn df-ui-sidemenu-close ti-close"
      });
      thumbContainer.append(sideMenuClose);
      _this.thumblist.reset($(_this.thumblist.container).height());
      _this.targetObject.container.on('click', '.df-thumb-container .df-vrow', function (e) {
        e.stopPropagation();
        var id = $(this).attr("id").replace("df-thumb", "");
        _this.targetObject.gotoPage(parseInt(id, 10));
      });
    };

    ContentProvider.prototype.initOutline = function () {
      var _this = this;
      var outlineContainer = $('<div>').addClass("df-outline-container df-sidemenu");
      var outlineWrapper = $('<div>').addClass("df-outline-wrapper");

      var sideMenuClose = $(html.div, {
        class: "df-ui-btn df-ui-sidemenu-close ti-close"
      });

      outlineContainer.append(sideMenuClose).append(outlineWrapper);
      _this.targetObject.container.append(outlineContainer);
      _this.targetObject.outlineContainer = outlineContainer;

      _this.outlineViewer = new BookMarkViewer({
        container: outlineWrapper[0],
        linkService: _this.linkService,
        outlineItemClass: "df-outline-item",
        outlineToggleClass: "df-outline-toggle",
        outlineToggleHiddenClass: "df-outlines-hidden"
      });

      function processOutline(outline) {

        if (_this.options.overwritePDFOutline == true) {
          outline = [];
        }
        outline = outline || [];

        if (_this.outline) {
          for (var count = 0; count < _this.outline.length; count++) {
            _this.outline[count].custom = true;
            if (outline) outline.push(_this.outline[count]);
          }
          /*                    _this.outline.forEach(function(v) {
           //v.custom = true;
           this.push(v);
           }, this);
           outline.push(_this.outline)*/
        }

        _this.outlineViewer.render({outline: outline});
      }

      if (_this.pdfDocument) {
        _this.pdfDocument.getOutline().then(function (outline) {
          processOutline(outline);
        });
      }
      else {
        processOutline([]);
      }

      if (_this.options.autoEnableOutline == true) {
        _this.targetObject.ui.outline.trigger("click");
      }

      if (_this.options.autoEnableThumbnail == true) {
        _this.targetObject.ui.thumbnail.trigger("click");
      }

    };

    ContentProvider.prototype.checkViewportSize = function (width, height, zoom) {
      var _this = this;
      var target = _this.targetObject;
      var zoomWidth = width * zoom,
        zoomHeight = height * zoom;

      var oldCacheSize = _this.cacheIndex;

      /*            var height = target.mode == "css"
       ? (target.container.height() - (target.stage.innerWidth() - target.stage.width()) )
       : target.stage.height();

       var width = height * _this.normalViewport.width / _this.normalViewport.height;*/

      //var zoom = _this.zoomScale != 1;

      if (_this.contentSourceType == SOURCE_TYPE.PDF) {


        /*                _this.viewport.height = height;
         _this.viewport.width = width;*/
        _this.cacheIndex = Math.ceil(Math.max(zoomWidth, zoomHeight));

        // if (zoom !== 1) {

        _this.cacheIndex = Math.floor(Math.max(zoomWidth, zoomHeight));// * _this.zoomScale;//nearestPowerOfTwo(Math.max(_this.viewport.width,_this.viewport.height));
        // _this.cacheIndex = Math.floor(utils.zoomStops(Math.max(zoomWidth, zoomHeight), _this.options.zoomRatio, oldCacheSize < _this.cacheIndex, Math.max(width, height)));

        // }

        _this.cacheIndex = limitAt(_this.cacheIndex * defaults.pixelRatio, _this.minDimension, _this.maxDimension);
        //removed to force internal page size fit incase the internal pages are of different sizes.
        // _this.cacheScale = _this.cacheIndex / Math.max(_this.normalViewport.width, _this.normalViewport.height);

        if (_this.cache[_this.cacheIndex] == null) _this.cache[_this.cacheIndex] = [];

        if (oldCacheSize !== _this.cacheIndex) {
          for (var pageCount = 0; pageCount < target.children.length; pageCount++) {
            var page = target.children[pageCount];
            //page.name = '-2';
          }
          target.refresh();
        }

        //if(zoom !==1){
        //	zoomHeight = height> width ? _this.cacheIndex : _this.cacheIndex * _this.pageRatio;
        //}
        _this.imageViewport = _this.refPage.getViewport(zoomHeight / _this.normalViewport.height);
        _this.viewport = (target.mode == "css") ? _this.imageViewport
          : _this.refPage.getViewport(_this.bookSize.height / _this.normalViewport.height);

        log(_this.cacheIndex);

        var div = target.container.find(".linkAnnotation"),
          viewportClone = _this.viewport.clone({dontFlip: true});
        div.css({
          transform: 'matrix(' + viewportClone.transform.join(',') + ')'
        });
        //_this.zoomScale = (zoom == true) ? _this.normalViewport.height * _this.viewport.scale / _this.viewport.height : 1;

      }
      else {
        if (_this.cache[_this.cacheIndex] == null) _this.cache[_this.cacheIndex] = [];
        /*                _this.cacheIndex = _this.zoomScale == 1 ? limitAt(_this.cacheIndex, _this.minDimension, _this.maxDimension) : _this.maxDimension;*/

        //_this.zoomScale = (zoom == true) ? _this.zoomViewport.height / height : 1;
      }

      //_this.zoomScale = (zoom == true) ? _this.zoomViewport.height / height : 1;
    };

    ContentProvider.prototype.getCache = function (index, isThumb) {
      return (isThumb == true)
        ? this.cache[this.thumbsize] == null ? null : this.cache[this.thumbsize][index]
        : this.cache[this.cacheIndex] == null ? null : this.cache[this.cacheIndex][index];
    };

    ContentProvider.prototype.setCache = function (index, src, isThumb, cacheIndexSize) {
      if (isThumb == true) {
        if (this.cache[this.thumbsize] != null) this.cache[this.thumbsize][index] = src;
      }
      else {
        var cacheIndex = cacheIndexSize == null ? this.cacheIndex : cacheIndexSize;
        if (this.cache[cacheIndex] != null)
          this.cache[cacheIndex][index] = src;
      }

    };

    ContentProvider.prototype.setTarget = function (targetObject) {
      var _this = this;
      if (targetObject == null) {
        return this.targetObject;
      }
      else {
        this.targetObject = targetObject;
        targetObject.contentProvider = this;

        targetObject.container.removeClass("df-loading df-init");

        //_this.initThumbs();

        if (_this.linkService != null) {
          _this.linkService.setViewer(targetObject);

          _this.initOutline();
        }

        targetObject.processPage = function (pageNumber, callback) {
          if (pageNumber > 0 && pageNumber <= _this.pageCount) {
            //log("Loading page :" + pageNumber);
            _this.getPage(pageNumber, callback);
          }
          else {
            _this.setPage(pageNumber, defaults.textureLoadFallback, callback);
            //log("Invalid PageNumber :" + pageNumber);
          }
        };

        targetObject.requestPage = function () {

          _this.review("Request");

        };

        if (targetObject.resize != null)
          targetObject.resize();

      }
    };

    ContentProvider.prototype.review = function (message) {
      var _this = this;
      message = message || "timer review";
      clearTimeout(_this.textureLoadTimeOut);
      _this.textureLoadTimeOut = setTimeout(function () {

        _this.textureLoadTimeOut = setTimeout(_this.reviewPages, _this.waitPeriod / 2, _this, message);

      }, _this.waitPeriod);
    };

    ContentProvider.prototype.reviewPages = function (_this, message) {
      _this = _this || this;
      var target = _this.targetObject;

      if (target == null) return;

      var isBooklet = isBookletMode(target);
      if (message != null) log(message);
      var requiresRevisit = false;
      var pageCount, page;

      for (pageCount = 0; pageCount < _this.targetObject.children.length; pageCount++) {
        page = target.children[pageCount];
        if (page.isFlipping == true) { //requires revisit
          requiresRevisit = true;
          break;
        }
      }
      if (requiresRevisit == false) {

        var pageLength = target.children.length > 3 ? 3 : target.children.length;
        var midPoint = pageLength / 2;

        var basePage = isBooklet ? target._activePage : getBasePage(target._activePage);
        _this.baseNumber = basePage;

        if (_this.zoomScale > 1) {
          pageLength = 1;
        }

        for (pageCount = 0; pageCount < pageLength; pageCount++) {

          var dividend = Math.floor(pageCount / 2);
          var diff = pageCount % 2 == 0
            ? -dividend * (isBooklet ? 1 : 2)
            : (dividend == 0 ? 1 : dividend) * (isBooklet ? 1 : 2);

          var frontPageNumber = basePage + diff,
            backPageNumber = basePage + diff + 1;

          var page1 = target.getPageByNumber(frontPageNumber),
            page2 = target.getPageByNumber(backPageNumber),
            reqFrontPageStamp = frontPageNumber + "|" + _this.cacheIndex,
            reqBackPageStamp = backPageNumber + "|" + _this.cacheIndex;


          var requestCount = 0;
          if (page1 != null && page1.frontPageStamp != reqFrontPageStamp && page1.visible == true) {
            page1.frontTextureLoaded = false;
            target.processPage(frontPageNumber, function () {
              _this.review("Batch Call");
            });
            page1.frontPageStamp = reqFrontPageStamp;
            requestCount++;
          }
          if (page2 != null && page2.backPageStamp != reqBackPageStamp && page2.visible == true && !isBooklet) {
            page2.backTextureLoaded = false;
            target.processPage(backPageNumber, function () {
              _this.review("Batch Call");
            });
            page2.backPageStamp = reqBackPageStamp;
            requestCount++;
          }

          //diff is 0 only at the open pages
          if (diff == 0 && _this.annotedPage !== basePage) {// && target.mode !== "css") {
            _this.getAnnotations(frontPageNumber);
            if (!isBooklet) _this.getAnnotations(backPageNumber);
            _this.annotedPage = basePage;
          }

          if (requestCount > 0) {
            break;
          }
        }
        if (requestCount == 0) {
          if (target.mode !== "css") {
            _this.setLoading(basePage);
          }
          else {
            // _this.setLoading(basePage);
            // _this.setLoading(basePage + 1);
          }
        }
      }
      else {
        _this.review("Revisit request");
        if (_this.annotedPage != null && target.mode !== "css") {
          var baseActive = getBasePage(target._activePage);
          $(target.getContentLayer(baseActive)).html("");
          $(target.getContentLayer(baseActive + 1)).html("");
          _this.annotedPage = null;
        }
      }

    };

    ContentProvider.prototype.getPage = function (pageNumber, callbackFunction, isThumb) {
      var _this = this;

      pageNumber = parseInt(pageNumber, 10);
      var _pageNumber = pageNumber;
      var source = _this.contentSource;
      if (pageNumber <= 0 && pageNumber >= _this.pageCount) {
        _this.setPage(pageNumber, defaults.textureLoadFallback, callbackFunction, isThumb);
      }
      else {
        if (_this.contentSourceType == SOURCE_TYPE.PDF) {
          if (_this.getCache(pageNumber, isThumb) != null) {
            _this.setPage(pageNumber, _this.getCache(pageNumber, isThumb), callbackFunction, isThumb);
            log("Page " + pageNumber + " loaded from cache");
          }
          else {
            if (isThumb !== true) _this.setLoading(pageNumber, true);

            if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2) {
              _pageNumber = Math.ceil((pageNumber - 1) / 2) + 1;
            }
            source.getPage(_pageNumber, isThumb).then(function (page) {
              renderPage(page, pageNumber, callbackFunction, isThumb);
            });
          }
        }
        else if (_this.contentSourceType == SOURCE_TYPE.IMAGE || _this.contentSourceType == SOURCE_TYPE.HTML) {
          if (_this.getCache(pageNumber, isThumb) != null) {
            _this.setPage(pageNumber, _this.getCache(pageNumber, isThumb), callbackFunction, isThumb);
            log("Page " + pageNumber + " loaded from cache");
          }
          else {
            if (isThumb !== true) _this.setLoading(pageNumber, true);

            if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2) {
              _pageNumber = Math.ceil((pageNumber - 1) / 2) + 1;
            }

            //if (_this.isCrossOrigin == null) {
            //
            //	_this.setCache(pageNumber, source[_pageNumber - 1], isThumb, _this.cacheIndex);
            //	_this.setPage(pageNumber, source[_pageNumber - 1], callbackFunction, isThumb);
            //
            //	if (callbackFunction != null) callbackFunction();
            //
            //} else {
            loadImage(source[_pageNumber - 1], function (src) {

              _this.setCache(pageNumber, src, isThumb, _this.cacheIndex);
              _this.setPage(pageNumber, src, callbackFunction, isThumb);

              if (callbackFunction != null) callbackFunction();

            }, _this.isCrossOrigin);
            //}
          }

          //_this.setPage(pageNumber, source[pageNumber - 1], callbackFunction, isThumb);
        }
      }

      function loadImage(src, callback, isCrossOrigin) {

        var img = new Image;

        img.crossOrigin = "Anonymous";

        img.onload = function () {

          if (isCrossOrigin == true) {
            var canvas = document.createElement("canvas"),
              ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            //localStorage.setItem( "savedImageData", canvas.toDataURL("image/png") );

            if (defaults.canvasToBlob == true) {
              canvas.toBlob(function (blob) {
                var src = DFLIP.createObjectURL(blob, "image/jpeg");

                if (callback != null) callback(src);

              }, "image/jpeg", 0.85)


            }
            else {
              if (callback != null) callback(canvas);
            }
          }
          else {
            if (callback != null) callback(src);
          }
          //$(this).off();
          img.onload = null;
          img = null;

        };

        img.src = src;

        // make sure the load event fires for cached images too
        if (img.complete || img.complete === undefined) {
          img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          img.src = src;
        }

      }

      function renderPage(page, pageNumber, callbackFunction, isThumb) {


        var forceFit = _this.options.forceFit;
        var isDoublePage = _this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 1 && pageNumber < _this.pageCount;
        var widthFix = isDoublePage && forceFit ? 2 : 1;

        /*                var heightScale = _this.pageRatio < 1
         ? _this.cacheScale
         : _this.cacheScale / _this.pageRatio;*/
        //_this.cacheScale = _this.cacheIndex / Math.max(_this.normalViewport.width, _this.normalViewport.height);
        //scales are calculated based on perpage in case per page fitting is required.
        var viewport = forceFit ? page.getViewport(1) : _this.normalViewport;

        var scale = _this.cacheIndex / Math.max(viewport.width / widthFix, viewport.height);//heightScale /_this.normalViewport.height;
        if (_this.webgl == true) {
          scale = nearestPowerOfTwo(_this.cacheIndex) / (_this.pageRatio > 1
              ? viewport.width / widthFix : viewport.height);
        }

        var canvas = document.createElement('canvas');
        var start = performance.now();

        var requestedCacheSize = _this.cacheIndex;

        var context = canvas.getContext('2d');

        // scale = scale * defaults.pixelRatio;

        if (isThumb == true) {
          scale = _this.thumbsize / _this.normalViewport.height;
        }

        canvas.height = Math.round(viewport.height * scale); //causes fluctuation in value like 22.99999 as 22
        canvas.width = Math.round(viewport.width / widthFix * scale);

        if (_this.targetObject.mode == 'css' && Math.abs(_this.targetObject.zoomHeight - canvas.height) < 2) {
          canvas.height = _this.targetObject.zoomHeight + 0; //causes fluctuation in value like 22.99999 as 22
          canvas.width = _this.targetObject.zoomWidth + 0;
        }

        viewport = page.getViewport(scale);
        log("rendering " + pageNumber + " at " + canvas.width + "x" + canvas.height);

        if (isDoublePage) {
          if (isRTLMode(_this.targetObject)) {
            if (pageNumber % 2 == 0) {
              viewport.transform[4] = -canvas.width;
            }
          } else {
            if (pageNumber % 2 == 1) {
              viewport.transform[4] = -canvas.width;
            }
          }
        }
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        page.cleanupAfterRender = true;
        var pageRendering = page.render(renderContext);

        pageRendering.promise.then(
          function () {

            log(performance.now() - start);
            start = performance.now();
            if (isThumb == true || (_this.options.canvasToBlob == true && _this.webgl !== true)) {
              canvas.toBlob(function (blob) {
                var src = DFLIP.createObjectURL(blob, "image/jpeg");
                log(performance.now() - start);
                _this.setCache(pageNumber, src, isThumb, requestedCacheSize);
                _this.setPage(pageNumber, src, callbackFunction, isThumb);

                //canvas.width = canvas.height = 1;
                //context.clearRect( 0, 0, canvas.width, canvas.height );

                //page.cleanup();
              }, "image/jpeg", _this.pdfRenderQuality)
            }
            else {
              log("Setting Page " + pageNumber);
              _this.setPage(pageNumber, canvas, callbackFunction, isThumb);
            }
            renderContext = null;
          });

      }

    };

    ContentProvider.prototype.getTargetPage = function (pageNumber) {

    };

    ContentProvider.prototype.setLoading = function (pageNumber, show) {
      if (this.targetObject != null) {
        if (this.webgl == true) {
          var container = this.targetObject.container;
          if (show == true) {
            if (container.isLoading !== true) {
              container.addClass("df-loading");
              container.isLoading = true;
              log("Loading icon at " + pageNumber + " as " + show);
            }
          }
          else {
            if (container.isLoading != null) {
              container.removeClass("df-loading");
              container.isLoading = null;
              log("Loading icon at " + pageNumber + " as " + show);
            }
          }
        } else {
          var contentLayer = $(this.targetObject.getContentLayer(pageNumber));
          if (contentLayer != null) {
            if (show == true) contentLayer.addClass("df-page-loading");
            else contentLayer.removeClass("df-page-loading");
            log("Loading icon at " + pageNumber + " as " + show);
          }
        }
      }
    };

    ContentProvider.prototype.getAnnotations = function (pageNumber) {
      var _this = this;

      if (_this.options.enableAnnotation == false) return;

      var target = _this.targetObject;

      pageNumber = parseInt(pageNumber, 10);
      var source = _this.contentSource;
      var contentLayer = $(target.getContentLayer(pageNumber));
      contentLayer.empty();
      if (pageNumber > 0 && pageNumber <= _this.pageCount) {


        if (_this.contentSourceType == SOURCE_TYPE.PDF) {
          var basePage = getBasePage(pageNumber);

          var _pageNumber = pageNumber;
          if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2) {
            _pageNumber = Math.ceil((pageNumber - 1) / 2) + 1;
          }

          source.getPage(_pageNumber).then(function (page) {

            if (contentLayer != null && contentLayer.length > 0) {
              _this.setupAnnotations(page, _this.viewport, contentLayer, pageNumber);

              /*                            //it's just resizing nothing to do with annotation fetch
               if (target.mode != "css") {

               var page3d = target.getPageByNumber(pageNumber);
               if (page3d != null) {
               var isLeft = (pageNumber % 2 == 0);
               var width = Math.abs(page3d.geometry.boundingBox.max.x - page3d.geometry.boundingBox.min.x);
               var height = Math.abs(page3d.geometry.boundingBox.max.z - page3d.geometry.boundingBox.min.z);

               var div3d = isLeft ? target.parent.cssScene.divLeft : target.parent.cssScene.divRight;
               if (div3d != null) {
               div3d.rotation.y = (isLeft ? -1 : 1 ) * Math.atan2(height, width) * 0.9;
               div3d.position.z = height * 0.8;
               div3d.position.x = (isLeft ? 1 : -1 ) * height / 2.5;
               $(div3d.element).css({
               width: width,
               left: isLeft ? -width / 2 : width / 2
               });

               }
               }
               }*/
            }
          });
        }

        //render any custom liks available for page.

        if (_this.links != null && _this.links[pageNumber] != null) {
          var pageLinks = _this.links[pageNumber];
          for (var index = 0; index < pageLinks.length; index++) {
            var pageLink = pageLinks[index];

            var annotation;
            if (pageLink.dest && pageLink.dest.indexOf && pageLink.dest.indexOf('[html]') == 0) {
              annotation = document.createElement('div');
              annotation.innerHTML = pageLink.dest.substr(6);
              annotation.className = "customHtmlAnnotation";
            } else {
              annotation = document.createElement('a');
              annotation.setAttribute("dest", pageLink.dest);
              annotation.className = "customLinkAnnotation";
              annotation.href = "#" + pageLink.dest;
              annotation.onclick = function () {
                var dest = this.getAttribute("dest");
                if (dest) {
                  _this.linkService.customNavigateTo(dest);
                }
                return false;
              };

            }
            annotation.style.left = pageLink.x + "%";
            annotation.style.top = pageLink.y + "%";

            annotation.style.width = pageLink.w + "%";
            annotation.style.height = pageLink.h + "%";
            contentLayer[0].appendChild(annotation);
          }
        }

        //render any html available for page.

        if (_this.html != null && _this.html[pageNumber] != null) {
          var pageHTML = _this.html[pageNumber];
          contentLayer.append($("<div class='customHTMLAnnotation'>").html(pageHTML));
        }
      }
    };

    ContentProvider.prototype.setPage = function (pageNumber, textureSrc, callbackFunction, isThumb) {
      var _this = this;
      var target = _this.targetObject;
      var isRTL = isRTLMode(target);
      var isBooklet = isBookletMode(target);
      if (isThumb == true) {
        var page = _this.targetObject.container.find("#df-thumb" + pageNumber);
        //log("setting:" + pageNumber + " " + bgImage(textureSrc));
        page.css({
          backgroundImage: bgImage(textureSrc)
        });
      }
      else {

        if (textureSrc == defaults.textureLoadFallback) {
          log("Fallback on " + pageNumber);
        }

        var bookPage = target.getPageByNumber(pageNumber);
        if (bookPage != null) {
          if (
            (pageNumber % 2 != 0 && !isRTL) ||
            (pageNumber % 2 != 1 && isRTL && !isBooklet) || (isBooklet && !isRTL)
          ) {
            log(pageNumber + "rendered to back of " + bookPage.color);
            bookPage.backImage(textureSrc, function (object, texture) {
              bookPage.backTextureLoaded = true;
              _this.setLoading(pageNumber);
              if (_this.requiresImageTextureScaling && texture && pageNumber != 1 && pageNumber != _this.pageCount) {
                texture.repeat.x = 0.5;
                texture.offset.x = 0.5;
              }
              if (callbackFunction != null) callbackFunction();
            });

          }
          else {
            log(pageNumber + "rendered to front of " + bookPage.color);
            bookPage.frontImage(textureSrc, function (object, texture) {
              bookPage.frontTextureLoaded = true;
              _this.setLoading(pageNumber);
              if (_this.requiresImageTextureScaling && texture && pageNumber != 1 && pageNumber != _this.pageCount) {
                texture.repeat.x = 0.5;
              }
              if (callbackFunction != null) callbackFunction();
            });
            //}
          }
        }
        else {
          log("Invalid set request on Page " + pageNumber);
        }
      }
    };

    ContentProvider.prototype.setupAnnotations = function (page, viewport, pageDiv, pageNumber) {
      if (pageDiv == null || $(pageDiv).length == 0) return;
      var _this = this;
      return page.getAnnotations().then(function (annotationsData) {
        viewport = viewport.clone({
          dontFlip: true
        });

        if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2 && pageNumber % 2 == 1) {
          //viewport.transform[4]= -viewport.scale * page.view[2]/2;

        }
        else if (pageNumber == 1) {

        }
        if (pageDiv == null) {
          return;
        }
        pageDiv = $(pageDiv);
        if (pageDiv.find(".annotationDiv").length == 0) {
          pageDiv.append($("<div class='annotationDiv'>"));
        }
        var div = pageDiv.find(".annotationDiv");
        div.empty();
        if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2 && pageNumber % 2 == 1) {
          //viewport.transform[4]= -viewport.scale * page.view[2]/2;
          div.css({left: '-100%'});
        }
        else if (pageNumber == 1) {
          div.css({left: ''});
        }
        /*                div.css({
         transform:'matrix(' + _this.viewport.transform.join(',') + ')'
         });*/

        PDFJS.AnnotationLayer.render({
          annotations: annotationsData,
          div: div[0],
          page: page,
          viewport: viewport,
          linkService: _this.linkService
        });

        if (_this.options.annotationClass && _this.options.annotationClass !== "") {
          div.find(" > section").addClass(_this.options.annotationClass);
        }
        // div.find(" > section").addClass("someclass");
        /*				page.getTextContent().then(function(textContent){
         console.log( textContent );
         var textLayer = new DFLIP.TextLayerBuilder({
         textLayerDiv :div[0],
         pageIndex : null,
         viewport : viewport.clone({
         dontFlip: false
         })
         });

         textLayer.setTextContent(textContent);
         textLayer.render();
         });*/

      });

    };

    return ContentProvider;
  })({});

  var PageCSS = (function () {
    function PageCSS(parameters) {
      this.angles = parameters.angles || [0, 0, 0, 0, 0, 0];
      this.stiffness = parameters.angles || 0.1;
      this.segments = parameters.segments || 1;
      this.canvasMode = parameters.contentSourceType !== SOURCE_TYPE.IMAGE && parameters.canvasToBlob == false;
      this.initDOM();
    }

    function createInternals(pageSide) {
      var contentLayer = pageSide.contentLayer = $(html.div, {
        class: "df-page-content"
      });
      pageSide.append(contentLayer);
    }

    PageCSS.prototype = {
      initDOM: function () {
        var element = this.element = $(html.div, {
          class: "df-book-page"
        });
        var wrapper = this.wrapper = $(html.div, {
          class: "df-page-wrapper"
        });
        var front = this.front = $(html.div, {
          class: "df-page-front"
        });
        var back = this.back = $(html.div, {
          class: "df-page-back"
        });
        var foldInnerShadow = this.foldInnerShadow = $(html.div, {
          class: "df-page-fold-inner-shadow"
        });
        var foldOuterShadow = this.foldOuterShadow = $(html.div, {
          class: "df-page-fold-outer-shadow"
        });
        this.frontIMG = new Image();
        this.backIMG = new Image();

        createInternals(front, this.segments, true);
        createInternals(back, this.segments, false);
        element.append(wrapper).append(foldOuterShadow);
        wrapper.append(front).append(back).append(foldInnerShadow);

      },

      updatePoint: function (point) {

        if (point == null) return;

        //detect the current page
        var page = this.parent.dragPage != null ? this.parent.dragPage
          : point.page != null ? point.page : this;

        //get the pageWidth and pageHeight
        var pageWidth = page.element.width(),
          pageHeight = page.element.height();

        //the corner where the drag started
        var corner = this.parent.corner != null ? this.parent.corner : point.corner,
          corners = DFLIP.CORNERS;

        var
          isRight = page.side == drag.right,
          isBottom = (corner == corners.BL) || (corner == corners.BR);

        point.rx = (isRight == true)
          ? pageWidth * 2 - point.x
          : point.x;

        point.ry = (isBottom == true)
          ? pageHeight - point.y
          : point.y;

        var radAngle = Math.atan2(point.ry, point.rx);

        radAngle = Math.PI / 2 - limitAt(radAngle, 0, toRad(90));

        var correctionX = isRight
            ? point.x / 2
            : pageWidth - point.x / 2,

          correctionY = point.ry / 2,

          refLength = Math.max(0,
            Math.sin(radAngle - Math.atan2(correctionY, correctionX)) * distOrigin(correctionX,
              correctionY)),

          foldLength = 0.5 * distOrigin(point.rx, point.ry);

        var x = Math.round(pageWidth - refLength * Math.sin(radAngle)),
          y = Math.round(refLength * Math.cos(radAngle)),

          angle = toDeg(radAngle);

        var angle1 = isBottom
          ? isRight ? 180 + ( 90 - angle) : 180 + angle
          : isRight ? angle : 90 - angle;

        var angle2 = isBottom
            ? isRight ? 180 + ( 90 - angle) : angle
            : isRight ? angle + 180 : angle1,
          angleS = isBottom
            ? isRight ? 90 - angle : angle + 90
            : isRight ? angle1 - 90 : angle1 + 180,
          x1 = isRight ? pageWidth - x : x,
          y1 = isBottom ? pageHeight + y : -y,
          x2 = isRight ? -x : x - pageWidth,
          y2 = isBottom ? -pageHeight - y : y;

        var opacity = limitAt(point.distance * 0.5 / pageWidth, 0, 0.5);
        var foldOpacity = limitAt((pageWidth * 2 - point.rx) * 0.5 / pageWidth, 0.05, 0.3);

        page.element.addClass("df-folding");

        var front = isRight ? page.back : page.front;
        var back = isRight ? page.front : page.back;
        var outerShadow = page.foldOuterShadow;
        var innerShadow = page.foldInnerShadow;
        page.wrapper.css({
          transform: translateStr(x1, y1) + rotateStr(angle1)
        });

        front.css({
          transform: rotateStr(-angle1) + translateStr(-x1, -y1)
        });

        back.css({
          transform: rotateStr(angle2) + translateStr(x2, y2),
          boxShadow: "rgba(0, 0, 0, " + opacity + ") 0px 0px 20px"
        });

        innerShadow.css({
          transform: rotateStr(angle2) + translateStr(x2, y2),
          opacity: foldOpacity / 2,
          backgroundImage: prefix.css + "linear-gradient( " + angleS + "deg, rgba(0, 0, 0, 0.25) , rgb(0, 0, 0) " + foldLength * 0.7 + "px, rgb(255, 255, 255) " + foldLength + "px)"
        });

        outerShadow.css({
          //transform: rotateStr(angle - (isRight ? -180 : 0)) + translateStr(isRight ? -x : x - pageWidth, y),
          opacity: foldOpacity / 2,
          left: isRight ? "auto" : 0,
          right: isRight ? 0 : "auto",
          backgroundImage: prefix.css + "linear-gradient( " + (-angleS + 180) + "deg, rgba(0, 0, 0,0) " + foldLength / 3 + "px, rgb(0, 0, 0) " + foldLength + "px)"
        });

        //$("body > p").html(JSON.stringify({
        //	x: Math.round(point.rx),
        //	y: Math.round(point.ry),
        //	a: Math.round(angle),
        //	a1: Math.round(angle1),
        //	cx: Math.round(correctionX),
        //	cy: Math.round(correctionY),
        //	dx: Math.round(x),
        //	dy: Math.round(y),
        //	ref: Math.round(refLength),
        //	dis: Math.round(distOrigin(point.x, point.y))
        //}));
      },

      updateAngle: function (angle, isRight) {

        var width = this.element.width() * 5;

        //if(prefix.dom!=='MS') {
        this.wrapper.css({
          perspective: width,
          perspectiveOrigin: isRight == true ? "0% 50%" : "100% 50%"
        });
        //}

        this.front.css({
          display: (isRight == true ? (angle <= -90 ? 'block' : 'none') : (angle < 90 ? 'block' : 'none')),
          transform: (prefix.dom !== 'MfS' ? "" : "perspective(" + width + "px) ")
          + (isRight == true ? "translateX(-100%) " : "" )
          + "rotateY(" + ((isRight == true ? 180 : 0 ) + angle) + "deg)"
        });
        this.back.css({
          display: (isRight == true ? (angle > -90 ? 'block' : 'none') : (angle >= 90 ? 'block' : 'none')),
          transform: (prefix.dom !== 'MSd' ? "" : "perspective(" + width + "px) ")
          + (isRight == false ? "translateX(100%) " : "" )
          + "rotateY(" + ((isRight == false ? -180 : 0 ) + angle) + "deg)"
        });
        //$("body > p").html(JSON.stringify({
        //	a: Math.round(angle)
        //}));
        return;
        /*if(this.angles[1] != null) {
         var segsb = this.back.segments;
         var segsf = this.front.segments;
         var width = this.element.width();
         var angle1 = this.angles[1];
         var angle2 = this.angles[4]/segsb.length;
         var step = Math.floor(width/segsb.length);

         for (var count = 0; count < segsb.length; count++) {
         var segb = segsb[count];
         var segf = segsf[count];
         segb.css({
         transform: "rotate3d(0,1,0," + (count == 0 ? angle1 : angle2) + "deg)",
         //backgroundPositionX: -step * count,
         //backgroundSize: width + "px 100%"
         });

         segf.css({
         transform: "rotate3d(0,1,0," + (count == 0 ? 180 + angle1 : angle2) + "deg)",
         //backgroundPositionX: step * (count + 1),
         //backgroundSize: width + "px 100%"
         });
         }
         }
         else{
         this.element.find(".bg-segment").css({
         transform: "translate3d(0px,0,0) rotate3d(0,1,0,0deg)"
         });
         }*/

      },

      tween: function (point) {
        var page = this;
        if (page == null || page.parent == null) return;
        var isBooklet = isBookletMode(page.parent);
        var isRight = page.side == drag.right;
        var isRTL = page.parent.direction == DFLIP.DIRECTION.RTL;
        var isBottom = page.parent.corner == DFLIP.CORNERS.BL || page.parent.corner == DFLIP.CORNERS.BR;
        var isMagnetic = page.magnetic == true;
        var travelY = isBottom ? page.parent.height : 0;

        var init, first, mid, angle = 0;

        var end = page.end = (page && page.animateToReset == true)
          ? {x: isRight ? page.parent.fullWidth : 0, y: travelY}
          : {x: isRight ? 0 : page.parent.fullWidth, y: travelY};

        page.ease = page.isHard ? TWEEN.Easing.Quadratic.InOut : TWEEN.Easing.Linear.None;

        var tempDuration = page.parent.duration;

        if (page.isHard == true) {

          if (point != null) {
            angle = angleByDistance(point.distance, point.fullWidth);
          }

          init = page.init = {angle: angle * (isRight ? -1 : 1)};
          end = page.end = (page && page.animateToReset == true)
            ? {angle: isRight ? 0 : -0}
            : {angle: isRight ? -180 : 180};

        } else {

          if (point == null) {

            init = page.init = (page && page.animateToReset == true)
              ? {x: isRight ? 0 : page.parent.fullWidth, y: 0}
              : {x: isRight ? page.parent.fullWidth : 0, y: 0};

            first = page.first = {
              x: (isRight ? 3 : 1 ) * page.parent.fullWidth / 4,
              y: 0
            };

            mid = page.mid = {x: (isRight ? 1 : 3 ) * page.parent.fullWidth / 4, y: 0};

          }
          else {

            init = page.init = {x: point.x, y: point.y, opacity: 1};
            first = page.first = {x: point.x * 3 / 4, y: point.y * 3 / 4, opacity: 1};
            mid = page.mid = {x: point.x / 4, y: point.y / 4, opacity: 1};

            tempDuration = page.parent.duration * distPoints(init.x, init.y, end.x, end.y) / page.parent.fullWidth;

            tempDuration = limitAt(tempDuration, page.parent.duration / 3, page.parent.duration);

          }
        }
        init.index = 0;
        // first.index = 0;
        // mid.index = 0;
        end.index = 1;
        page.isFlipping = true;

        var update = function (tween) {

          if (page.isHard == true) {
            page.updateAngle(tween.angle, isRight);
            page.angle = tween.angle;
          } else {
            page.updatePoint({
              x: tween.x,
              y: tween.y
            });
            page.x = tween.x;
            page.y = tween.y;
          }
          if (isBooklet && !isMagnetic)
            page.element[0].style.opacity = (isRight && !isRTL) || (!isRight && isRTL)
              ? tween.index > 0.5 ? 2 * (1 - tween.index) : 1
              : tween.index < 0.5 ? 2 * tween.index : 1;

        };

        if (isBooklet && ((!isRight && !isRTL) || (isRight && isRTL)))
          page.element[0].style.opacity = 0;

        var completeTween = page.completeTween = page.completeTween || function (skipRefresh) {
            page.isFlipping = false;

            if (page.isHard == true) {

              page.updateAngle(page.end.angle);
              page.back.css({display: "block"});
              page.front.css({display: "block"});

            }
            else {

              page.updatePoint({
                x: page.end.x,
                y: page.end.y
              });

            }

            page.element[0].style.opacity = 1;

            if (page.animateToReset !== true) {
              page.side = page.side == drag.right ? drag.left : drag.right;
            }
            else
              page.animateToReset = null;

            page.currentTween = null;
            page.pendingPoint = null;
            page.magnetic = false;
            page.parent.dragPage = null;
            page.parent.corner = DFLIP.CORNERS.NONE;

            if (skipRefresh != true)
              page.parent.refresh();


            //log("Tween Completed");
          };
        if (page.isHard == true) {
          page.currentTween = new TWEEN.Tween(init).delay(0)
            .to(end, page.parent.duration)
            .onUpdate(function () {
              update(this);
            }).easing(page.ease)
            .onComplete(page.completeTween)
            .start();
        } else {
          if (point == null) {
            page.currentTween = new TWEEN.Tween(init).delay(0)
              .to(end, page.parent.duration)
              .onUpdate(function () {
                update(this);
              }).easing(TWEEN.Easing.Sinusoidal.Out)
              .onComplete(page.completeTween)
              .start();
          }
          else {
            page.currentTween = new TWEEN.Tween(init).delay(0)
              .to(end, tempDuration)
              .onUpdate(function () {
                update(this);
              }).easing(TWEEN.Easing.Sinusoidal.Out)
              .onComplete(page.completeTween);
            page.currentTween.start();
          }
        }
        //page.currentTween.parent= page;

      },
      frontImage: function (texture, callback) {
        var _this = this;

        function completed() {
          _this.front.css({
            backgroundImage: bgImage(texture)
          });
          if (callback != null) callback();
        }

        if (_this.canvasMode == true) {
          _this.front.find(">canvas").remove();
          if (texture !== defaults.textureLoadFallback) {
            _this.front.append($(texture));
          }
          if (callback != null) callback();
        }
        else {
          if (texture == defaults.textureLoadFallback) {
            completed();
          } else {
            _this.frontIMG.onload = completed;
            _this.frontIMG.src = texture;
          }
        }
      },
      backImage: function (texture, callback) {
        var _this = this;

        function completed() {
          _this.back.css({
            backgroundImage: bgImage(texture)
          });
          if (callback != null) callback();
        }

        if (_this.canvasMode == true) {
          _this.back.find(">canvas").remove();
          if (texture !== defaults.textureLoadFallback) {
            _this.back.append($(texture));
          }
          if (callback != null) callback();
        }
        else {
          if (texture == defaults.textureLoadFallback) {
            completed();
          } else {
            _this.backIMG.onload = completed;
            _this.backIMG.src = texture;
          }
        }

      },
      updateCSS: function (css) {
        this.element.css(css);
      },
      resetCSS: function () {
        this.wrapper.css({
          transform: ''
        });

        this.front.css({
          transform: '',
          boxShadow: ''
        });

        this.back.css({
          transform: '',
          boxShadow: ''
        });
      },
      clearTween: function (skipRefresh) {
        this.currentTween.stop();
        this.completeTween(skipRefresh == true);
        this.resetCSS();
      }

    };

    return PageCSS;
  })();

  var BookCSS = (function (_super) {
    __extends(BookCSS, _super);

    function updateFolding(dragPage) {
      dragPage.parent.container.find(".df-folding").removeClass("df-folding");
      dragPage.element.addClass("df-folding");
    }

    function hasFlipping(book) {
      var hasFlipping = false;
      for (var pageCount = 0; pageCount < book.pages.length; pageCount++) {
        var page = book.pages[pageCount];
        if (page.isFlipping == true) {
          hasFlipping = true;
          break;
        }
      }
      return hasFlipping;
    }

    function BookCSS(parameters, container) {
      //parameters = extendOptions(parameters);

      //_super.call(this, parameters, stage);
      var _this = this;
      _this.type = "BookCSS";
      _this.images = parameters.images || [];
      _this.pageCount = parameters.pageCount || 2;
      //_this.segments = parameters.segments = 5;

      _this.foldSense = 50;

      _this.stackCount = 4;
      _this.mode = "css";
      _this.pages = [];
      _this.duration = parameters.duration;

      _this.container = $(container);
      _this.options = parameters;
      _this.drag = drag.none;
      _this.pageCount = (_this.pageCount == 1 ? _this.pageCount : Math.ceil(_this.pageCount / 2) * 2);
      _this.pageMode = parameters.pageMode || ((isMobile || _this.pageCount <= 2) ? DFLIP.PAGE_MODE.SINGLE
          : DFLIP.PAGE_MODE.DOUBLE);

      _this.singlePageMode = parameters.singlePageMode || (isMobile ? DFLIP.SINGLE_PAGE_MODE.BOOKLET
          : DFLIP.SINGLE_PAGE_MODE.ZOOM);

      _this.swipe_threshold = isMobile ? 15 : 50;

      _this.direction = parameters.direction || DFLIP.DIRECTION.LTR;

      _this.startPage = 1;
      _this.endPage = _this.pageCount;

      _this._activePage = parameters.openPage || _this.startPage;

      _this.hardConfig = parameters.hard;
      //var foldTime = null;
      has3d = 'WebKitCSSMatrix' in window || (document.body && 'MozPerspective' in document.body.style);

      _this.animateF = function () {
        if (TWEEN.getAll().length > 0)
          TWEEN.update();
        else
          clearInterval(_this.animate);
      };

      _this.init(parameters);

      _this.skipDrag = false;

      function checkPage(point) {
        if (_this.dragPage != point.page && point.page.visible == true) {
          _this.dragPage.clearTween(true);
          _this.dragPage = point.page;
          _this.corner = point.corner;
          _this.dragPage.pendingPoint = point;
        }
      }

      var mouseMove = function (event) {
          //event.preventDefault();
          var point = _this.eventToPoint(event);
          if (event.touches != null && event.touches.length == 2 && _this.startTouches != null) {
            //return;
            // _this.startTouches = event.touches;
            _this.zoomDirty = true;
            var touchCenter = utils.getVectorAvg(utils.getTouches(event, _this.container.offset())),
              newScale = utils.calculateScale(_this.startTouches, utils.getTouches(event)),
              scale = newScale / _this.lastScale;

            var zoom = _this.contentProvider.zoomScale,
              x = touchCenter.x,
              y = touchCenter.y;

            _this.stage.css({
              transform: "translate3d(" + _this.left + "px," + _this.top + "px,0) scale3d(" + newScale + "," + newScale + ",1)"
            });

            _this.lastScale = newScale;

            _this.lastZoomCenter = touchCenter;
            event.preventDefault();
          }

          if ((event.touches != null && event.touches.length > 1) || _this.startPoint == null || _this.startTouches != null) return;

          var targetPage = _this.dragPage || point.page;

          if (_this.contentProvider.zoomScale !== 1) {
            if ((event.touches != null || _this.isPanning == true)) {
              _this.pan(point);
              event.preventDefault();
            }
          }
          else {
            if (_this.skipDrag !== true) {
              //if (_this.cancelMouse != true) {

              var distance = point.distance;//_this.getDistance(event);//point.x < _this.pageWidth ? point.x : _this.fullWidth - point.x;

              if (!hasFlipping(_this)) {


                if ((_this.dragPage != null ) || (point.isInside == true)) {
                  //$(".quick-hint").html(distance);
                  if (_this.dragPage != null) {
                    log("set mouse down move");
                  }
                  else {
                    point.y = limitAt(point.y, 1, _this.height - 1);
                    point.x = limitAt(point.x, 1, point.fullWidth - 1);
                  }

                  var corner = _this.corner || point.corner;
                  if (targetPage.isHard) {
                    var isRight = corner == DFLIP.CORNERS.BR || corner == DFLIP.CORNERS.TR;

                    var angle = angleByDistance(point.distance, point.fullWidth);

                    targetPage.updateAngle(angle * (isRight ? -1 : 1), isRight);

                  }
                  else {
                    targetPage.updatePoint(point, _this);
                  }

                  targetPage.magnetic = true;
                  targetPage.magneticCorner = point.corner;
                  event.preventDefault();
                  //point.page.updatePoint(point);
                }

                if (_this.dragPage == null && targetPage != null && point.isInside == false && targetPage.magnetic == true) {
                  targetPage.pendingPoint = point;
                  targetPage.animateToReset = true;
                  _this.corner = targetPage.magneticCorner;
                  _this.animatePage(targetPage);
                  targetPage.pendingPoint = null;
                  targetPage.magnetic = false;
                  targetPage.magneticCorner = null;
                }

                if (_this.isPanning == true && _this.dragPage == null && _this.contentProvider.zoomScale == 1) {
                  //check if swipe has happened
                  //console.log(_this.lastPos - point.x,performance.now()-_this.lastTime);
                  var swipe_dist = point.x - _this.lastPos,
                    swipe_time = performance.now() - _this.lastTime;
                  if (Math.abs(swipe_dist) > _this.swipe_threshold) {
                    //swipe has triggered
                    //_this.dragPage.pendingPoint = point;
                    if (swipe_dist < 0) {
                      _this.next();
                    }
                    else {
                      _this.prev();
                    }
                    _this.drag = drag.none;
                    _this.isPanning = false;
                    event.preventDefault();
                  }
                  _this.lastPos = point.x;
                  _this.lastTime = performance.now();

                }
              }
            }
          }

        },
        mouseUp = function (event) {
          if (event.touches != null && event.touches.length == 0) {
            var zoom = _this.contentProvider.zoomScale;
            if (_this.zoomDirty == true) {
              _this.previewObject.contentProvider.zoomScale =
                utils.limitAt(_this.previewObject.contentProvider.zoomScale * _this.lastScale,
                  1, _this.previewObject.contentProvider.maxZoom);
              _this.previewObject.zoomValue = _this.previewObject.contentProvider.zoomScale * 1;
              //_this.previewObject.zoom(_this.lastScale < 1 ? -1 : 1);
              //console.log(_this.previewObject.contentProvider.zoomScale * _this.lastScale,_this.previewObject.contentProvider.maxZoom)
              //_this.previewObject.pendingZoom = true;
              _this.previewObject.resize();
              _this.zoomDirty = false;
            }
            _this.wrapper.css({
              transform: ""
            });
            _this.lastScale = null;
            _this.startTouches = null;
          }
          _this.isPanning = false;
          if (event.touches != null && event.touches.length > 1) return;
          if (_this.skipDrag !== true) {
            //completeFold();
            var point = _this.eventToPoint(event);
            if (_this.dragPage) {
              event.preventDefault();

              /*							if (_this.animate != null) {
               clearInterval(_this.animate);
               }

               _this.animate = setInterval(_this.animateF, 30);

               _this.dragPage.tween(point);*/

              //use something like pending point
              // detect the next page anbd call the updatepage
              //will be better

              _this.dragPage.pendingPoint = point;
              if (point.x == _this.startPoint.x && point.y == _this.startPoint.y && point.isInside == true) {

                if (_this.corner == DFLIP.CORNERS.BR || _this.corner == DFLIP.CORNERS.TR) {
                  checkPage(point);
                  if (_this.dragPage.isFlipping !== true)
                    _this.next();
                }
                else if (_this.corner == DFLIP.CORNERS.BL || _this.corner == DFLIP.CORNERS.TL) {
                  checkPage(point);
                  if (_this.dragPage.isFlipping !== true)
                    _this.prev();
                }
              }
              else if (_this.dragPage.isFlipping !== true) {
                if (point.distance > point.fullWidth / 2) {
                  if (point.x > point.fullWidth / 2)
                    _this.prev();
                  else
                    _this.next();
                }
                else {
                  _this.dragPage.animateToReset = true;
                  _this.animatePage(_this.dragPage);
                }
              }
              //_this.dragPage.animateToReset = true;
              if (_this.dragPage) {
                _this.dragPage.pendingPoint = null;
                _this.dragPage.magnetic = false;
              }
            } else {
              //detect click
              /*if(_this.wrapper[0].contains(event.target) && _this.contentProvider.zoomScale == 1 && point.x == _this.startPoint.x && point.y == _this.startPoint.y && point.isInsidePage && _this.startPoint.page == point.page && !point.page.isFlipping && event.srcElement.nodeName!=="A"){
               if(_this.startPoint.page.side ==0){
               _this.prev();
               _this.startPoint.page = null;
               }
               else{
               _this.next();
               _this.startPoint.page = null;
               }
               }*/
            }

            _this.drag = drag.none;

            //_this.dragPage = null;
            //_this.corner = DFLIP.CORNERS.NONE;
            //log("set mouse up");
          }

        },
        mouseClick = function (event) {

          var point = _this.eventToPoint(event);

          var element = event.srcElement || event.originalTarget;

          if (_this.dragPage && _this.dragPage.magnetic) return;

          if (_this.wrapper[0].contains(event.target) && _this.contentProvider.zoomScale == 1 && point.x == _this.startPoint.x && point.y == _this.startPoint.y && point.isInsidePage && _this.startPoint.page == point.page && !point.page.isFlipping && element.nodeName !== "A") {

            if (_this.startPoint.page.side == 0) {
              _this.corner = DFLIP.CORNERS.TL;
              _this.prev();
              _this.startPoint.page = null;
            }
            else {
              _this.corner = DFLIP.CORNERS.TR;
              _this.next();
              _this.startPoint.page = null;
            }
            _this.isPanning = false;
          }

        },
        mouseDown = function (event) {
          if (event.touches != null && event.touches.length == 2 && _this.startTouches == null) {
            _this.startTouches = utils.getTouches(event);
            _this.lastScale = 1;
          }
          if ((event.touches != null && event.touches.length > 1) || (event.touches == null && event.button !== 0)) return;
          var point = _this.eventToPoint(event);
          _this.startPoint = point;
          _this.left = _this.left || 0;
          _this.top = _this.top || 0;
          _this.isPanning = true;
          _this.lastPos = point.x;
          _this.lastTime = performance.now();

          if (_this.skipDrag !== true) {

            if (point.isInside == true && !hasFlipping(_this)) {
              _this.startPoint = point;
              _this.drag = point.drag;
              _this.dragPage = point.page;

              _this.corner = point.corner;

              log(_this.corner);

              updateFolding(_this.dragPage);
              //log("set mouse down");
              if (point.page.isHard) {

              }
              else {
                point.page.updatePoint(point, _this);
              }
              if (point.page.name == "0") {
                _this.shadow.css({
                  width: '50%',
                  left: _this.direction == DFLIP.DIRECTION.RTL ? 0 : '50%',
                  transitionDelay: ''
                });
              } else if (point.page.name == Math.ceil(_this.pageCount / 2) - 1) {
                _this.shadow.css({
                  width: '50%',
                  left: _this.direction == DFLIP.DIRECTION.RTL ? '50%' : 0,
                  transitionDelay: ''
                });
              }
            }
          }
        },
        onMouseWheel = function (event) {
          var delta = 0;

          //var zoom = _this.contentProvider.zoomScale > 1;
          if (event.wheelDelta != null) { // WebKit / Opera / Explorer 9

            delta = event.wheelDelta / 120;

          } else if (event.detail != null) { // Firefox

            delta = -event.detail / 3;

          }

          var zoom1 = _this.contentProvider.zoomScale,
            maxZoom = _this.contentProvider.maxZoom;

          if (delta) {

            if ((delta > 0 && zoom1 < maxZoom) || (delta < 0 && zoom1 > 1)) {

              event.stopPropagation();
              event.preventDefault();

              var pointOld = _this.eventToPoint(event);
              var pointNew = _this.eventToPoint(event);

              var origin = {x: _this.container.width() / 2, y: -23 + _this.container.height() / 2};

              _this.previewObject.zoom(delta);

              var zoom2 = _this.contentProvider.zoomScale;
              if (zoom1 !== zoom2) {
                var dz = (zoom2 / zoom1);

                //fix zoom to previous center
                if (zoom2 == 1) {
                  _this.left = 0;
                  _this.top = 0;
                } else {
                  _this.left *= dz;
                  _this.top *= dz;
                }

                //fix zoom to previous pointer
                var dx = (pointOld.raw.x - origin.x ) * dz,
                  dy = (pointOld.raw.y - origin.y ) * dz;

                pointNew.raw.x = origin.x + dx;// origin.x + dz * (point.x-origin.x);
                pointNew.raw.y = origin.y + dy;// origin.y + dz * (point.y-origin.y);

                _this.startPoint = pointNew;
                //console.log(pointOld.raw.x - origin.x,dx,pointOld.raw.y - origin.y,dy,pointNew.raw,_this.startPoint.raw);
                _this.pan(pointOld);

                var targetPage = _this.dragPage || pointOld.page;
                if (_this.dragPage == null && targetPage != null && pointOld.isInside == true && targetPage.magnetic == true) {
                  targetPage.pendingPoint = pointOld;
                  targetPage.animateToReset = true;
                  _this.corner = targetPage.magneticCorner;
                  _this.animatePage(targetPage);
                  targetPage.pendingPoint = null;
                  targetPage.magnetic = false;
                  targetPage.magneticCorner = null;
                }
              }

            }
          }

        };

      var containerDom = _this.container[0];
      var stageDom = _this.stage[0];
      if (containerDom) {
        stageDom.addEventListener("mousemove", mouseMove, false);
        stageDom.addEventListener("touchmove", mouseMove, false);

        stageDom.addEventListener("mousedown", mouseDown, false);
        stageDom.addEventListener("click", mouseClick, false);
        stageDom.addEventListener("mouseup", mouseUp, false);
        stageDom.addEventListener("touchend", mouseUp, false);
        stageDom.addEventListener("touchstart", mouseDown, false);

        if (_this.options.scrollWheel == true) {
          //lets not trigger scroll when in outline or another
          stageDom.addEventListener('mousewheel', onMouseWheel, false);
          stageDom.addEventListener('DOMMouseScroll', onMouseWheel, false); // firefox
        }
      }

      this.dispose = function () {
        stageDom.removeEventListener("mousemove", mouseMove, false);
        stageDom.removeEventListener("touchmove", mouseMove, false);

        stageDom.removeEventListener("mousedown", mouseDown, false);
        stageDom.removeEventListener("click", mouseClick, false);
        stageDom.removeEventListener("mouseup", mouseUp, false);
        stageDom.removeEventListener("touchend", mouseUp, false);
        stageDom.removeEventListener("touchstart", mouseDown, false);

        if (_this.options.scrollWheel == true) {
          stageDom.removeEventListener('mousewheel', onMouseWheel, false);
          stageDom.removeEventListener('DOMMouseScroll', onMouseWheel, false); // firefox
        }
        _this.updatePageCallback = null;
        _this.flipCallback = null;
        _this.animateF = null;
        _this.stage.remove();

      };
    }

    BookCSS.prototype = {
      add: function (object) {
        if (object instanceof PageCSS)
          this.container.append($(object.element));
        else
          this.container.append($(object));
      },
      pan: function (point) {
        var origin = this.startPoint;
        var scale = this.contentProvider.zoomScale;

        var left = (this.left + (point.raw.x - origin.raw.x)),
          top = (this.top + (point.raw.y - origin.raw.y));

        //round removes blur due to decimal value in transform.
        this.left = Math.round(limitAt(left, -this.shiftWidth, this.shiftWidth));
        this.top = Math.round(limitAt(top, -this.shiftHeight, this.shiftHeight));

        if (scale == 1) {
          this.left = 0;
          this.top = 0;
        }

        this.startPoint = point;

        //console.log(point, origin);
        this.stage.css({
          transform: "translate3d(" + this.left + "px," + this.top + "px,0)"
        });

        //var a = book.wrapper.height();
      },
      getPageByNumber: function (pageNumber) {
        var relativePageNumber = isBookletMode(this) ? (isRTLMode(this) ? pageNumber + 1 : pageNumber)
          : Math.floor((pageNumber - 1) / 2);
        var page;
        for (var count = 0; count < this.pages.length; count++) {
          if (relativePageNumber == parseInt(this.pages[count].name, 10))
            page = this.pages[count];
        }
        return page;
      },
      getPageSide: function (pageNumber) {

        var isRTL = this.direction == DFLIP.DIRECTION.RTL;

        var page = this.getPageByNumber(pageNumber);
        if (page == null) return;
        if (isBookletMode(this)) return isRTL ? page.front : page.back;
        if (pageNumber % 2 == 0)
          return isRTL ? page.back : page.front;
        else
          return isRTL ? page.front : page.back;
      },
      getContentLayer: function (pageNumber) {
        var pageSide = this.getPageSide(pageNumber);
        return pageSide == null ? null : pageSide.contentLayer;
      }
    };

    BookCSS.prototype.init = function (parameters) {
      var _this = this;
      _this.stage = $(html.div, {
        class: "df-book-stage"
      });
      _this.wrapper = $(html.div, {
        class: "df-book-wrapper"
      });
      _this.shadow = $(html.div, {
        class: "df-book-shadow"
      });
      //_this.resize();
      _this.container.append(_this.stage);
      _this.stage.append(_this.wrapper);
      _this.wrapper.append(_this.shadow);
      /*			_this.nextButton = $(html.div, {
       class: "df-book-next-button df-book-side-buttons " + parameters.icons['altnext']
       }).appendTo(_this.wrapper).on("click", function () {
       _this.next();
       });
       _this.prevButton = $(html.div, {
       class: "df-book-prev-button df-book-side-buttons " + parameters.icons['altprev']
       }).appendTo(_this.wrapper).on("click", function () {
       _this.prev();
       });*/


      //_this.container.height(parameters.height);

      _this.createStack(parameters);
    };

    BookCSS.prototype.createStack = function (parameters) {

      var colors = "red,green,blue,yellow,orange,black".split(",");

      for (var _stackCount = 0; _stackCount < this.stackCount; _stackCount++) {
        parameters.angles = [, this.stackCount - _stackCount];//[1] = (this.stackCount - _stackCount);
        parameters.stiffness = (this.stackCount - _stackCount) / 100;

        var clone = new PageCSS(parameters);
        clone.angles[1] = 180;
        clone.index = _stackCount;
        clone.parent = this;
        clone.textureReady = false;
        clone.textureRequested = false;
        this.wrapper.append(clone.element);
        clone.isFlipping = false;
        this.pages.push(clone);
        clone.color = colors[_stackCount];
        //for (var _count = 0; _count < 4; _count++) {
        //    clone.element.css({
        //        backgroundColor : colors[_stackCount]
        //    });
        //}
      }

      this.children = this.pages;
    };

    BookCSS.prototype.isPageHard = function (pageNumber) {

      return utils.isHardPage(this.hardConfig, pageNumber, this.pageCount, isBookletMode(this));

    };

    BookCSS.prototype.setDuration = function (_duration) {
      this.duration = _duration;
    };

    BookCSS.prototype.moveBy = function (step) {
      var nextPage = this._activePage + step;

      nextPage = limitAt(nextPage, this.startPage, this.endPage);

      this.gotoPage(nextPage);
    };

    BookCSS.prototype.next = function (step) {
      if (step == null)
        step =
          (this.direction == DFLIP.DIRECTION.RTL)
            ? -this.pageMode : this.pageMode;

      this.moveBy(step);
    };

    BookCSS.prototype.prev = function (step) {
      if (step == null)
        step =
          (this.direction == DFLIP.DIRECTION.RTL)
            ? this.pageMode : -this.pageMode;

      this.moveBy(step);
    };
    BookCSS.prototype.eventToPoint = function (event) {

      event = fixMouseEvent(event);

      var wrapper = this.wrapper,
        pages = this.pages,
        pageWidth = this.pageWidth,
        fullWidth = this.fullWidth,
        height = this.height,
        win = $(window),
        point = {x: event.clientX, y: event.clientY};

      var left = point.x - wrapper[0].getBoundingClientRect().left;// + win['scrollLeft']();

      var top = point.y - wrapper[0].getBoundingClientRect().top;// + win['scrollTop']();

      point.x = point.x - this.container[0].getBoundingClientRect().left;
      point.y = point.y - this.container[0].getBoundingClientRect().top;

      var distance = (this.drag == drag.none)
        ? left < pageWidth ? left : fullWidth - left
        : this.drag == drag.left ? left : fullWidth - left;

      var page = //((left >= 0 && left <= fullWidth)?
        (left < pageWidth ? pages[this.stackCount / 2 - 1] : pages[this.stackCount / 2]);

      var pageDrag = left < this.foldSense ? drag.left
        : (left > fullWidth - this.foldSense) ? drag.right : drag.none;

      //determine the corner
      var x = left,
        y = top,
        h = height,
        w = fullWidth,
        delta = this.foldSense,
        corners = DFLIP.CORNERS,
        corner;

      if (x >= 0 && x < delta) {
        if (y >= 0 && y <= delta)
          corner = corners.TL;
        else if (y >= h - delta && y <= h)
          corner = corners.BL;
        else if (y > delta && y < h - delta)
          corner = corners.L;
        else
          corner = corners.NONE;
      }
      else if (x >= w - delta && x <= w) {
        if (y >= 0 && y <= delta)
          corner = corners.TR;
        else if (y >= h - delta && y <= h)
          corner = corners.BR;
        else if (y > delta && y < h - delta)
          corner = corners.R;
        else
          corner = corners.NONE;
      }
      else
        corner = corners.NONE;

      return {
        isInsidePage: x >= 0 && x <= w && y >= 0 && y <= h,
        isInside: corner !== corners.NONE && corner !== corners.L && corner !== corners.R,
        x: left,
        y: top,
        fullWidth: fullWidth,
        rawDistance: fullWidth - left,
        distance: distance,
        page: page,
        drag: pageDrag,
        foldSense: this.foldSense,
        event: event,
        raw: point,
        corner: corner
      };
    };

    BookCSS.prototype.gotoPage = function (pageNumber) {
      pageNumber = parseInt(pageNumber, 10);
      this._activePage = pageNumber;

      if (this.autoPlay == true) {
        this.previewObject.setAutoPlay(this.autoPlay);
      }
      this.updatePage(pageNumber);
      if (this && this.thumblist && this.thumblist.review)
        this.thumblist.review();
    };

    BookCSS.prototype.refresh = function () {
      this.updatePage(this._activePage);
      if (this.flipCallback != null) this.flipCallback();
    };

    BookCSS.prototype.updatePage = function (pageNumber) {

      var isRTL = (this.direction == DFLIP.DIRECTION.RTL),
        isBooklet = isBookletMode(this),
        newBaseNumber = getBasePage(pageNumber);

      var pageDivisor = isBooklet ? 1 : 2;

      pageNumber = Math.floor((pageNumber / pageDivisor));

      if (isRTL) pageNumber = this.pageCount / pageDivisor - pageNumber;

      var oldBaseNumber = this.oldBaseNumber || 0;
      var pageCount = this.pageCount / pageDivisor;
      var stackCount = this.stackCount;

      var midPoint = Math.floor(stackCount / 2);

      if (oldBaseNumber > pageNumber) {
        this.children[stackCount - 1].skipFlip = true;
        this.children.unshift(this.children.pop());
      }
      else if (oldBaseNumber < pageNumber) {
        this.children[0].skipFlip = true;
        this.children.push(this.children.shift());
      }

      for (var _pageCount = 0; _pageCount < stackCount; _pageCount++) {
        var page = this.children[_pageCount];

        if (oldBaseNumber !== pageNumber) {
          if (page.currentTween != null) {
            page.clearTween(true);
            //page.currentTween.stop();
            //page.completeTween(true);
            //page.resetCSS();
            //page.currentTween = null;
          }
        }

        var oldSide = page.side;
        var newSide;
        var relativePageNumber = pageNumber - midPoint + _pageCount;
        if (isRTL) relativePageNumber = isBooklet ? this.pageCount - relativePageNumber
          : Math.floor(this.pageCount / 2) - relativePageNumber - 1;

        var oldName = page.name;

        page.isHard = this.isPageHard(relativePageNumber);
        if (page.isHard) {
          page.element.addClass("df-hard-page");
        } else {
          page.element.removeClass("df-hard-page");
          page.front.css({display: "block"});
          page.back.css({display: "block"});
        }
        if (relativePageNumber == 0 || relativePageNumber == pageCount) {
          page.element.addClass("df-cover-page");
        } else {
          page.element.removeClass("df-cover-page");
        }

        var oldPageNumber = $(page.element).attr("pageNumber");
        if (oldPageNumber != relativePageNumber) {
          page.front.contentLayer.empty();
          page.back.contentLayer.empty();
        }
        $(page.element).attr("pageNumber", relativePageNumber);


        //Sizing
        page.isEdge = false; //true;
        if (_pageCount == 0) {

        }
        else if (_pageCount == stackCount - 1) {

        }
        else {

          page.isEdge = false;
        }


        if (_pageCount < midPoint) {
          newSide = drag.left;
        }
        else {
          newSide = drag.right;
        }


        if (page.isFlipping == false) {

          if (newSide !== oldSide && page.skipFlip == false) {

            this.animatePage(page);

            if (this.preFlipCallback != null)
              this.preFlipCallback();

          } else {
            page.skipFlip = false;
            page.element.removeClass("df-flipping df-quick-turn df-folding df-left-side df-right-side");
            page.element.addClass((_pageCount < midPoint) ? "df-left-side" : "df-right-side");
            page.side = newSide;
          }
        }

        page.visible = isBooklet
          ? (isRTL

            ? (_pageCount < midPoint || page.isFlipping)
            : (_pageCount >= midPoint || page.isFlipping))

          : ((relativePageNumber >= 0 && relativePageNumber < pageCount) || (isBooklet && relativePageNumber == pageCount));

        if (this.requestPage != null && page.visible == true) {

          page.name = relativePageNumber.toString();
          if (page.name != oldName) {

            page.backTextureLoaded = false;
            page.frontTextureLoaded = false;
            page.backPageStamp = "-1";
            page.frontPageStamp = "-1";
            page.thumbLoaded = false;
            page.front.contentLayer.html("");
            page.back.contentLayer.html("");
            //if (oldName !== '-2') {
            //canvas clearing
            page.frontImage(defaults.textureLoadFallback);
            page.backImage(defaults.textureLoadFallback);
            //}
            this.requestPage();

          }
        }

        page.oldDepth = page.depth;
        page.updateCSS({
          display: page.visible == true ? "block" : "none",
          zIndex: 6 + (_pageCount < midPoint ? (_pageCount - midPoint) : (midPoint - _pageCount)),
          transform: ''
        });

        if (page.pendingPoint == null && page.isFlipping == false) {
          page.resetCSS();
        }
      }

      if (TWEEN.getAll().length == 0) {
        clearInterval(this.animate);
      }
      $(".quick-hint").html(pageNumber);

      this.oldBaseNumber = pageNumber;

      if (this.updatePageCallback)
        this.updatePageCallback();

    };

    BookCSS.prototype.animatePage = function (page) {
      page.element.addClass("df-flipping");
      page.isFlipping = true;

      if (this.animate != null) {
        clearInterval(this.animate);
      }

      this.animate = setInterval(this.animateF, 30);

      page.tween(page.pendingPoint);
    };

    return BookCSS;
  })
  ({});

  var FlipBook = (function (_super) {

    __extends(FlipBook, _super);

    function FlipBook(container, source, parameters) {
      _super.call(this, parameters);
      var _this = this;

      _this.type = "FlipBook";
      _this.container = container;
      _this.options = parameters;
      _this.options.source = source;
      _this.contentSource = source;

      if (parameters.height != null && parameters.height.toString().indexOf('%') < 0) {
        _this.container.height(Math.min(parameters.height, $(window).height()));
      } else {
        _this.container.height(parameters.height);
      }

      if (_this.options.isLightBox) {
        window.dfLightBox.closeButton.addClass(_this.options.icons['close']);
      }
      if (_this.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL) {
        //currently booklet version cannot handle double sized image pages
        if (Array === _this.contentSource.constructor || Array.isArray(_this.contentSource) || _this.contentSource instanceof Array) {
          _this.options.singlePageMode = DFLIP.SINGLE_PAGE_MODE.ZOOM;
        }
        _this.container.addClass("df-double-internal");
      }
      if (!_this.options.isLightBox && _this.container.attr("id") != null) {
        _this.options.id = _this.container.attr("id");
      }

      if (_this.options.parsed !== true && _this.options.links != null) {
        DFLIP.parseLinks(_this.options.links);
      }
      var webgl = _this.webgl = parameters.webgl == true && hasWebgl == true;

      container.addClass("df-container df-loading df-init df-floating" + " df-controls-" + _this.options.controlsPosition);

      if (_this.options.transparent == true) {
        container.addClass("df-transparent");
      }
      if (_this.options.direction == DFLIP.DIRECTION.RTL) {
        container.addClass("df-rtl");
      }
      _this.container.info = $(html.div, {
        class: "loading-info"
      }).appendTo(_this.container).html("Loading...");

      if (userAgent.indexOf('MSIE') !== -1
        || navigator.appVersion.indexOf('Trident/') > 0 || (isSafari && !isIOS)) {
        _this.options.webgl = false; //IE 11
      }

      if (!!userAgent.match(/msie\s[5-9]/i)) {
        _this.container.info.html("Your browser (Internet Explorer) is out of date to run DFlip Flipbook Plugin. <br><a href='http://browsehappy.com/'>Upgrade to a new one</a>").addClass("df-old-browser");
        container.removeClass("df-loading");
        return _this;
      }

      var backgroundImage = parameters.backgroundImage == null || parameters.backgroundImage == '' ? ''
        : "url('" + parameters.backgroundImage + "')";

      _this.container.css({
        position: "relative",
        overflow: "hidden",
        backgroundColor: parameters.backgroundColor,
        backgroundImage: backgroundImage
      });

      _this.init(webgl, source);

      if (_this.options.onCreate != null)
        _this.options.onCreate(_this);

      return _this;

    }

    FlipBook.prototype.init = function (webgl) {
      var _this = this;
      var book = _this.target;

      var options = _this.options;

      if (webgl == true) {

        var updateMockupJs = function (callback) {

            var process3d = function () {
              MOCKUP.defaults.anisotropy = 0;
              MOCKUP.defaults.groundTexture = "blank";
              THREE.skipPowerOfTwo = true;

              RegisterMockupObjects();

              if (callback != null) callback();
            };

            if (window.MOCKUP == null) {
              _this.updateInfo("Loading WEBGL 3D ...");

              if (typeof define === 'function' && define.amd) {
                requirejs.config({
                  "paths": {
                    "three": defaults.threejsSrc.replace(".js", "")
                  },
                  shim: {
                    'three': {
                      exports: 'THREE'
                    }
                  }
                });
                require(['three'], function (THREE) {
                  window.THREE = THREE;
                  getScript(defaults.mockupjsSrc + "?ver=" + DFLIP.version, function () {
                    process3d();
                  });
                  return THREE;
                });
              }
              else {
                getScript(defaults.threejsSrc + "?ver=" + DFLIP.version, function () {
                  //_this.updateInfo("Loading 3D Pages ..."); this was retainnng _this and not releasing memory
                  getScript(defaults.mockupjsSrc + "?ver=" + DFLIP.version, function () {
                    process3d();
                  });
                });
              }
            }
            else {
              process3d();
            }
          }
        ;

        updateMockupJs(function () {

          //Todo: ability to use anisotropy

          _this.container.css({
            minHeight: 300,
            minWidth: 300
          });

          _this.stage = new PreviewStage(extendOptions(_this.options, {container: _this.container}));
          _this.stage.previewObject = _this;

          _this.contentProvider = new ContentProvider(_this.contentSource, function (contentProvider) {
            // _this.pageCount = contentProvider.pageCount = utils.limitAt(contentProvider.pageCount, 1, 2 * 5);
            var options = {
              pageCount: contentProvider.pageCount,//Math.ceil(contentProvider.pageCount / 2) * 2,
              stackCount: 6,
              segments: 20,
              width: contentProvider.bookSize.width,
              height: contentProvider.bookSize.height
            };

            _this.checkOpenPage();
            _this.target = book = _this.stage.target = new MOCKUP.Book(extendOptions(_this.options, options), _this.stage);
            _this.extendtarget();
            createUI(_this.container, _this);

            //bookStage.setTarget(_this.target);
            book.ui = _this.ui;
            book.container = _this.container;
            contentProvider.webgl = webgl;
            contentProvider.setTarget(_this.target);

            book.getContentLayer = function (pageNumber) {

              var isRTL = book.direction == DFLIP.DIRECTION.RTL,
                left = _this.stage.cssScene.divLeft.element,
                right = _this.stage.cssScene.divRight.element;

              var baseActive = getBasePage(book._activePage);

              //if(isRTL){
              //	if(pageNumber == 0 || pageNumber == 1) return right;
              //	if(pageNumber == book.pageCount) return left;
              //}

              if (isBookletMode(book)) return isRTL ? left : right;

              if (pageNumber % 2 == 0)
                return isRTL ? right : left;
              else
                return isRTL ? left : right;
              //else
              //	return null;
            };
            book.stage = _this.stage;

            book.flipCallback = function () {
              if (_this.contentProvider) {
                _this.contentProvider.review("flipCallback");

                var baseActive = getBasePage(book._activePage);

                var width, height;
                var pageLeft = book.getPageByNumber(baseActive),
                  pageRight = book.getPageByNumber(baseActive + 1);
                //if (page3d != null) {
                //    var isLeft = (pageNumber % 2 == 0);
                var divLeft = book.parent.cssScene.divLeft,
                  divRight = book.parent.cssScene.divRight;

                var isSingle = book.pageMode == DFLIP.PAGE_MODE.SINGLE;
                var isRTL = book.direction == DFLIP.DIRECTION.RTL;

                if (pageLeft != null && divLeft != null) {
                  width = Math.abs(pageLeft.geometry.boundingBox.max.x - pageLeft.geometry.boundingBox.min.x);
                  height = Math.abs(pageLeft.geometry.boundingBox.max.z - pageLeft.geometry.boundingBox.min.z);

                  divLeft.rotation.y = -Math.atan2(height, width) * 0.9;
                  divLeft.position.z = height * 0.8;
                  divLeft.position.x = height / 2.5;
                  $(divLeft.element).css({
                    width: width,
                    left: -width / 2//baseActive == 0 && isRTL == true? width
                    //: baseActive == book.pageCount && isRTL == true ? 0 : -width / 2
                  });

                }

                if (pageRight != null && divRight != null) {
                  width = Math.abs(pageRight.geometry.boundingBox.max.x - pageRight.geometry.boundingBox.min.x);
                  height = Math.abs(pageRight.geometry.boundingBox.max.z - pageRight.geometry.boundingBox.min.z);

                  divRight.rotation.y = Math.atan2(height, width) * 0.9;
                  divRight.position.z = height * 0.8;
                  divRight.position.x = -height / 2.5;
                  $(divRight.element).css({
                    width: width,
                    left: width / 2// == 0 && isRTL == true ? 0
                    //: baseActive == book.pageCount && isRTL == true ? -width : width / 2
                  });

                }

                if (_this.options.onFlip != null)
                  _this.options.onFlip(_this);
              }
            };

            book.resize = function () {
              _this.resize();
            }();

            book.updatePageCallback = function () {
              _this.ui.update();
              _this.checkCenter();
              _this.stage.renderRequestPending = true;
            };

            var divLeft = $(_this.stage.cssScene.divLeft.element);
            var divRight = $(_this.stage.cssScene.divRight.element);

            book.preFlipCallback = function () {
              divLeft.empty();
              divRight.empty();
              if (_this.options.beforeFlip != null)
                _this.options.beforeFlip(_this);

              _this.playSound();
            };

            $(window).trigger("resize");

            divLeft.css({
              width: contentProvider.bookSize.width,
              height: contentProvider.bookSize.height,
              left: -contentProvider.bookSize.width / 2
            });

            divRight.css({
              width: contentProvider.bookSize.width,
              height: contentProvider.bookSize.height,
              left: contentProvider.bookSize.width / 2
            });

            book.ease = TWEEN.Easing.Cubic.InOut;
            //book.ease = TWEEN.Easing.Quadratic.InOut;
            book.contentProvider = contentProvider;
            book.duration = _this.options.duration;
            book.gotoPage(book._activePage);
            book.flipCallback();

            if (_this.options.onReady != null)
              _this.options.onReady(_this);

          }, options, _this);
        });
      }
      else {

        _this.contentProvider = new ContentProvider(_this.contentSource, function (contentProvider) {
          // _this.pageCount = contentProvider.pageCount = utils.limitAt(contentProvider.pageCount, 1, 2 * 5);
          var options = {
            pageCount: contentProvider.pageCount,//Math.ceil(contentProvider.pageCount / 2) * 2,
            contentSourceType: contentProvider.contentSourceType
          };

          _this.checkOpenPage();
          _this.target = book = new BookCSS(extendOptions(_this.options, options), _this.container);
          _this.target.previewObject = _this;
          _this.extendtarget();
          createUI(_this.container, _this);
          contentProvider.webgl = webgl;
          contentProvider.setTarget(_this.target);
          contentProvider.waitPeriod = 2;
          book.ease = TWEEN.Easing.Quadratic.InOut;
          book.duration = _this.options.duration;

          /*					_this.ui.prev.hide();
           _this.ui.next.hide();

           _this.ui.prev = book.prevButton;
           _this.ui.next = book.nextButton;*/

          book.container = _this.container;
          book.updatePageCallback = function () {
            _this.ui.update();
            _this.checkCenter();
          };

          book.resize = function () {
            _this.resize();
          }();

          $(window).trigger("resize");

          book.flipCallback = function () {
            if (_this.contentProvider) {
              _this.contentProvider.review("flipCallback");

              if (_this.options.onFlip != null)
                _this.options.onFlip(_this);
            }
          };

          book.preFlipCallback = function () {
            if (_this.options.beforeFlip != null)
              _this.options.beforeFlip(_this);

            _this.playSound();
          };
          book.gotoPage(book._activePage);
          book.flipCallback();

          if (_this.options.onReady != null)
            _this.options.onReady(_this);

        }, options, _this);

      }


    }
    ;

    FlipBook.prototype.extendtarget = function () {
      var _this = this;
      _this.target.previewObject = _this;
      _this.target.reset = function () {
        for (var pageCount = 0; pageCount < _this.target.children.length; pageCount++) {
          var page = _this.target.children[pageCount];
          page.skipFlip = true;
          page.name = '-2';
        }
        _this.contentProvider.annotedPage = '-2';
        _this.target.refresh();

      }
    };

    FlipBook.prototype.getURLHash = function () {
      if (this.options.id != null) {
        var hash = "dflip-" + (this.options.slug != null ? this.options.slug : this.options.id) + "/";
        if (this.target != null && this.target._activePage != null) {
          hash += this.target._activePage + "/";
        }
        window.location.hash = hash;
      }
      return window.location.href;
    };

    FlipBook.prototype.checkOpenPage = function () {
      //options value is overridden by attribute
      if (this.options.id != null) {
        var book = $("#" + this.options.id);
        if (book.length > 0 && book.data("page") != null) {
          var pageNumber = parseInt(book.data("page"), 10);
          if (!isNaN(pageNumber))
            this.options.openPage = pageNumber;
        }
      }
    };

    FlipBook.prototype.end = function () {

      this.target.gotoPage(this.target.endPage);

    };

    FlipBook.prototype.gotoPage = function (pageNumber) {

      this.target.gotoPage(pageNumber);
      if (this.ui != null) this.ui.update();
    };

    FlipBook.prototype.prev = function () {

      this.target.prev();

    };

    FlipBook.prototype.next = function () {

      this.target.next();

    };

    FlipBook.prototype.updateInfo = function (info) {
      if (this.container && this.container.info && this.container.info.html)
        this.container.info.html(info);
    }
    return FlipBook;

  })(PreviewObject);

  $.fn.extend({

    shelf: function () {

    },
    flipBook: function (source, options) {
      return new FlipBook($(this), source, extendDFlipOptions(options));
    }
  });

})
(DFLIP, jQuery);


//Polyfills

/**
 * Blob.js Polyfill
 * A Blob implementation.
 * 2014-07-24
 *
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/dsamarin
 * License: X11/MIT
 */
(function (view) {
  "use strict";

  view.URL = view.URL || view.webkitURL;

  if (view.Blob && view.URL) {
    try {
      new Blob;
      return;
    } catch (e) {
    }
  }

  // Internally we use a BlobBuilder implementation to base Blob off of
  // in order to support older browsers that only have BlobBuilder
  var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || (function (view) {
      var
        get_class = function (object) {
          return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
        }, FakeBlobBuilder = function BlobBuilder() {
          this.data = [];
        }, FakeBlob = function Blob(data, type, encoding) {
          this.data = data;
          this.size = data.length;
          this.type = type;
          this.encoding = encoding;
        }, FBB_proto = FakeBlobBuilder.prototype, FB_proto = FakeBlob.prototype, FileReaderSync = view.FileReaderSync,
        FileException = function (type) {
          this.code = this[this.name = type];
        }, file_ex_codes = (
          "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "
          + "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
        ).split(" "), file_ex_code = file_ex_codes.length, real_URL = view.URL || view.webkitURL || view,
        real_create_object_URL = real_URL.createObjectURL, real_revoke_object_URL = real_URL.revokeObjectURL,
        URL = real_URL, btoa = view.btoa, atob = view.atob, ArrayBuffer = view.ArrayBuffer,
        Uint8Array = view.Uint8Array, origin = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/
      ;
      FakeBlob.fake = FB_proto.fake = true;
      while (file_ex_code--) {
        FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
      }
      // Polyfill URL
      if (!real_URL.createObjectURL) {
        URL = view.URL = function (uri) {
          var
            uri_info = document.createElementNS("http://www.w3.org/1999/xhtml", "a"), uri_origin
          ;
          uri_info.href = uri;
          if (!("origin" in uri_info)) {
            if (uri_info.protocol.toLowerCase() === "data:") {
              uri_info.origin = null;
            } else {
              uri_origin = uri.match(origin);
              uri_info.origin = uri_origin && uri_origin[1];
            }
          }
          return uri_info;
        };
      }
      URL.createObjectURL = function (blob) {
        var
          type = blob.type, data_URI_header
        ;
        if (type === null) {
          type = "application/octet-stream";
        }
        if (blob instanceof FakeBlob) {
          data_URI_header = "data:" + type;
          if (blob.encoding === "base64") {
            return data_URI_header + ";base64," + blob.data;
          } else if (blob.encoding === "URI") {
            return data_URI_header + "," + decodeURIComponent(blob.data);
          }
          if (btoa) {
            return data_URI_header + ";base64," + btoa(blob.data);
          } else {
            return data_URI_header + "," + encodeURIComponent(blob.data);
          }
        } else if (real_create_object_URL) {
          return real_create_object_URL.call(real_URL, blob);
        }
      };
      URL.revokeObjectURL = function (object_URL) {
        if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
          real_revoke_object_URL.call(real_URL, object_URL);
        }
      };
      FBB_proto.append = function (data/*, endings*/) {
        var bb = this.data;
        // decode data to a binary string
        if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
          var
            str = "", buf = new Uint8Array(data), i = 0, buf_len = buf.length
          ;
          for (; i < buf_len; i++) {
            str += String.fromCharCode(buf[i]);
          }
          bb.push(str);
        } else if (get_class(data) === "Blob" || get_class(data) === "File") {
          if (FileReaderSync) {
            var fr = new FileReaderSync;
            bb.push(fr.readAsBinaryString(data));
          } else {
            // async FileReader won't work as BlobBuilder is sync
            throw new FileException("NOT_READABLE_ERR");
          }
        } else if (data instanceof FakeBlob) {
          if (data.encoding === "base64" && atob) {
            bb.push(atob(data.data));
          } else if (data.encoding === "URI") {
            bb.push(decodeURIComponent(data.data));
          } else if (data.encoding === "raw") {
            bb.push(data.data);
          }
        } else {
          if (typeof data !== "string") {
            data += ""; // convert unsupported types to strings
          }
          // decode UTF-16 to binary string
          bb.push(unescape(encodeURIComponent(data)));
        }
      };
      FBB_proto.getBlob = function (type) {
        if (!arguments.length) {
          type = null;
        }
        return new FakeBlob(this.data.join(""), type, "raw");
      };
      FBB_proto.toString = function () {
        return "[object BlobBuilder]";
      };
      FB_proto.slice = function (start, end, type) {
        var args = arguments.length;
        if (args < 3) {
          type = null;
        }
        return new FakeBlob(
          this.data.slice(start, args > 1 ? end : this.data.length), type, this.encoding
        );
      };
      FB_proto.toString = function () {
        return "[object Blob]";
      };
      FB_proto.close = function () {
        this.size = 0;
        delete this.data;
      };
      return FakeBlobBuilder;
    }(view));

  view.Blob = function (blobParts, options) {
    var type = options ? (options.type || "") : "";
    var builder = new BlobBuilder();
    if (blobParts) {
      for (var i = 0, len = blobParts.length; i < len; i++) {
        if (Uint8Array && blobParts[i] instanceof Uint8Array) {
          builder.append(blobParts[i].buffer);
        }
        else {
          builder.append(blobParts[i]);
        }
      }
    }
    var blob = builder.getBlob(type);
    if (!blob.slice && blob.webkitSlice) {
      blob.slice = blob.webkitSlice;
    }
    return blob;
  };

  var getPrototypeOf = Object.getPrototypeOf || function (object) {
      return object.__proto__;
    };
  view.Blob.prototype = getPrototypeOf(new view.Blob());
}(window));

/**
 * canvas-toBlob.js Polyfill
 * A canvas.toBlob() implementation.
 * 2013-12-27
 *
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */
(function (view) {
  "use strict";
  var
    Uint8Array = view.Uint8Array, HTMLCanvasElement = view.HTMLCanvasElement,
    canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype, is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i,
    to_data_url = "toDataURL", base64_ranks, decode_base64 = function (base64) {
      var
        len = base64.length, buffer = new Uint8Array(len / 4 * 3 | 0), i = 0, outptr = 0, last = [0, 0], state = 0,
        save = 0, rank, code;
      while (len--) {
        code = base64.charCodeAt(i++);
        rank = base64_ranks[code - 43];
        if (rank !== 255 && rank != null) {
          last[1] = last[0];
          last[0] = code;
          save = (save << 6) | rank;
          state++;
          if (state === 4) {
            buffer[outptr++] = save >>> 16;
            if (last[1] !== 61 /* padding character */) {
              buffer[outptr++] = save >>> 8;
            }
            if (last[0] !== 61 /* padding character */) {
              buffer[outptr++] = save;
            }
            state = 0;
          }
        }
      }
      // 2/3 chance there's going to be some null bytes at the end, but that
      // doesn't really matter with most image formats.
      // If it somehow matters for you, truncate the buffer up outptr.
      return buffer;
    }
  ;
  if (Uint8Array) {
    base64_ranks = new Uint8Array([
      62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
    ]);
  }
  if (HTMLCanvasElement && !canvas_proto.toBlob) {
    canvas_proto.toBlob = function (callback, type /*, ...args*/) {
      if (!type) {
        type = "image/png";
      }
      if (this.mozGetAsFile) {
        callback(this.mozGetAsFile("canvas", type));
        return;
      }
      if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
        callback(this.msToBlob());
        return;
      }

      var
        args = Array.prototype.slice.call(arguments, 1),
        dataURI = this[to_data_url].apply(this, args),
        header_end = dataURI.indexOf(","),
        data = dataURI.substring(header_end + 1),
        is_base64 = is_base64_regex.test(dataURI.substring(0, header_end)),
        blob
      ;
      if (Blob.fake) {
        // no reason to decode a data: URI that's just going to become a data URI again
        blob = new Blob;
        if (is_base64) {
          blob.encoding = "base64";
        } else {
          blob.encoding = "URI";
        }
        blob.data = data;
        blob.size = data.length;
      } else if (Uint8Array) {
        if (is_base64) {
          blob = new Blob([decode_base64(data)], {type: type});
        } else {
          blob = new Blob([decodeURIComponent(data)], {type: type});
        }
      }
      callback(blob);
    };

    if (canvas_proto.toDataURLHD) {
      canvas_proto.toBlobHD = function () {
        to_data_url = "toDataURLHD";
        var blob = this.toBlob();
        to_data_url = "toDataURL";
        return blob;
      }
    } else {
      canvas_proto.toBlobHD = canvas_proto.toBlob;
    }
  }
}(window));

/**
 * performance.now polyfill
 **/
(function PerformanceNowPolyfill() {

  if ('performance' in window === false) {
    window.performance = {};
  }

  // IE 8
  Date.now = (Date.now || function () {
    return new Date().getTime();
  });

  if ('now' in window.performance === false) {
    var offset = window.performance.timing && window.performance.timing.navigationStart
      ? window.performance.timing.navigationStart
      : Date.now();

    window.performance.now = function () {
      return Date.now() - offset;
    };
  }

})();

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 */
(function TweenJs() {
  var TWEEN = TWEEN || (function () {

      var _tweens = [];

      return {

        getAll: function () {

          return _tweens;

        },

        removeAll: function () {

          _tweens = [];

        },

        add: function (tween) {

          _tweens.push(tween);

        },

        remove: function (tween) {

          var i = _tweens.indexOf(tween);

          if (i !== -1) {
            _tweens.splice(i, 1);
          }

        },

        update: function (time) {

          if (_tweens.length === 0) {
            return false;
          }

          var i = 0;

          time = time != null ? time : window.performance.now();

          while (i < _tweens.length) {

            if (_tweens[i].update(time)) {
              i++;
            } else {
              _tweens.splice(i, 1);
            }

          }

          return true;

        }
      };

    })();

  TWEEN.Tween = function (object) {

    var _object = object;
    var _valuesStart = {};
    var _valuesEnd = {};
    var _valuesStartRepeat = {};
    var _duration = 1000;
    var _repeat = 0;
    var _yoyo = false;
    var _isPlaying = false;
    var _reversed = false;
    var _delayTime = 0;
    var _startTime = null;
    var _easingFunction = TWEEN.Easing.Linear.None;
    var _interpolationFunction = TWEEN.Interpolation.Linear;
    var _chainedTweens = [];
    var _onStartCallback = null;
    var _onStartCallbackFired = false;
    var _onUpdateCallback = null;
    var _onCompleteCallback = null;
    var _onStopCallback = null;

    // Set all starting values present on the target object
    for (var field in object) {
      _valuesStart[field] = parseFloat(object[field], 10);
    }

    this.to = function (properties, duration) {

      if (duration != null) {
        _duration = duration;
      }

      _valuesEnd = properties;

      return this;

    };

    this.start = function (time) {

      TWEEN.add(this);

      _isPlaying = true;

      _onStartCallbackFired = false;

      _startTime = time != null ? time : window.performance.now();
      _startTime += _delayTime;

      for (var property in _valuesEnd) {

        // Check if an Array was provided as property value
        if (_valuesEnd[property] instanceof Array) {

          if (_valuesEnd[property].length === 0) {
            continue;
          }

          // Create a local copy of the Array with the start value at the front
          _valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);

        }

        // If `to()` specifies a property that doesn't exist in the source object,
        // we should not set that property in the object
        if (_valuesStart[property] === null) {
          continue;
        }

        _valuesStart[property] = _object[property];

        if ((_valuesStart[property] instanceof Array) === false) {
          _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
        }

        _valuesStartRepeat[property] = _valuesStart[property] || 0;

      }

      return this;

    };

    this.stop = function () {

      if (!_isPlaying) {
        return this;
      }

      TWEEN.remove(this);
      _isPlaying = false;

      if (_onStopCallback !== null) {
        _onStopCallback.call(_object);
      }

      this.stopChainedTweens();
      return this;

    };

    this.stopChainedTweens = function () {

      for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
        _chainedTweens[i].stop();
      }

    };

    this.complete = function () {
      if (!_isPlaying) {
        return this;
      }

      TWEEN.remove(this);
      _isPlaying = false;

      if (_onCompleteCallback !== null) {
        _onCompleteCallback.call(_object);
      }

      this.completeChainedTweens();
      return this;
    };

    this.completeChainedTweens = function () {

      for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
        _chainedTweens[i].complete();
      }

    };

    this.delay = function (amount) {

      _delayTime = amount;
      return this;

    };

    this.repeat = function (times) {

      _repeat = times;
      return this;

    };

    this.yoyo = function (yoyo) {

      _yoyo = yoyo;
      return this;

    };


    this.easing = function (easing) {

      _easingFunction = easing == null ? _easingFunction : easing;
      return this;

    };

    this.interpolation = function (interpolation) {

      _interpolationFunction = interpolation;
      return this;

    };

    this.chain = function () {

      _chainedTweens = arguments;
      return this;

    };

    this.onStart = function (callback) {

      _onStartCallback = callback;
      return this;

    };

    this.onUpdate = function (callback) {

      _onUpdateCallback = callback;
      return this;

    };

    this.onComplete = function (callback) {

      _onCompleteCallback = callback;
      return this;

    };

    this.onStop = function (callback) {

      _onStopCallback = callback;
      return this;

    };

    this.update = function (time) {

      var property;
      var elapsed;
      var value;

      if (time < _startTime) {
        return true;
      }

      if (_onStartCallbackFired === false) {

        if (_onStartCallback !== null) {
          _onStartCallback.call(_object);
        }

        _onStartCallbackFired = true;

      }

      elapsed = (time - _startTime) / _duration;
      elapsed = elapsed > 1 ? 1 : elapsed;

      value = _easingFunction(elapsed);

      for (property in _valuesEnd) {

        // Don't update properties that do not exist in the source object
        if (_valuesStart[property] === null) {
          continue;
        }

        var start = _valuesStart[property] || 0;
        var end = _valuesEnd[property];

        if (end instanceof Array) {

          _object[property] = _interpolationFunction(end, value);

        } else {

          // Parses relative end values with start as base (e.g.: +10, -3)
          if (typeof (end) === 'string') {

            if (end.startsWith('+') || end.startsWith('-')) {
              end = start + parseFloat(end, 10);
            } else {
              end = parseFloat(end, 10);
            }
          }

          // Protect against non numeric properties.
          if (typeof (end) === 'number') {
            _object[property] = start + (end - start) * value;
          }

        }

      }

      if (_onUpdateCallback !== null) {
        _onUpdateCallback.call(_object, value);
      }

      if (elapsed === 1) {

        if (_repeat > 0) {

          if (isFinite(_repeat)) {
            _repeat--;
          }

          // Reassign starting values, restart by making startTime = now
          for (property in _valuesStartRepeat) {

            if (typeof (_valuesEnd[property]) === 'string') {
              _valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
            }

            if (_yoyo) {
              var tmp = _valuesStartRepeat[property];

              _valuesStartRepeat[property] = _valuesEnd[property];
              _valuesEnd[property] = tmp;
            }

            _valuesStart[property] = _valuesStartRepeat[property];

          }

          if (_yoyo) {
            _reversed = !_reversed;
          }

          _startTime = time + _delayTime;

          return true;

        } else {

          if (_onCompleteCallback !== null) {
            _onCompleteCallback.call(_object);
          }

          for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
            // Make the chained tweens start exactly at the time they should,
            // even if the `update()` method was called way past the duration of the tween
            _chainedTweens[i].start(_startTime + _duration);
          }

          return false;

        }

      }

      return true;

    };

  };

  TWEEN.Easing = {

    Linear: {

      None: function (k) {

        return k;

      }

    },

    Quadratic: {

      In: function (k) {

        return k * k;

      },

      Out: function (k) {

        return k * (2 - k);

      },

      InOut: function (k) {

        if ((k *= 2) < 1) {
          return 0.5 * k * k;
        }

        return -0.5 * (--k * (k - 2) - 1);

      }

    },
    Quartic: {

      In: function (k) {

        return k * k * k * k;

      },

      Out: function (k) {

        return 1 - (--k * k * k * k);

      },

      InOut: function (k) {

        if ((k *= 2) < 1) {
          return 0.5 * k * k * k * k;
        }

        return -0.5 * ((k -= 2) * k * k * k - 2);

      }

    },
    Sinusoidal: {

      In: function (k) {

        return 1 - Math.cos(k * Math.PI / 2);

      },

      Out: function (k) {

        return Math.sin(k * Math.PI / 2);

      },

      InOut: function (k) {

        return 0.5 * (1 - Math.cos(Math.PI * k));

      }

    },
    Cubic: {

      In: function (k) {

        return k * k * k;

      },

      Out: function (k) {

        return --k * k * k + 1;

      },

      InOut: function (k) {

        if ((k *= 2) < 1) {
          return 0.5 * k * k * k;
        }

        return 0.5 * ((k -= 2) * k * k + 2);

      }

    }

  };

  TWEEN.Interpolation = {

    Linear: function (v, k) {

      var m = v.length - 1;
      var f = m * k;
      var i = Math.floor(f);
      var fn = TWEEN.Interpolation.Utils.Linear;

      if (k < 0) {
        return fn(v[0], v[1], f);
      }

      if (k > 1) {
        return fn(v[m], v[m - 1], m - f);
      }

      return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

    },

    Bezier: function (v, k) {

      var b = 0;
      var n = v.length - 1;
      var pw = Math.pow;
      var bn = TWEEN.Interpolation.Utils.Bernstein;

      for (var i = 0; i <= n; i++) {
        b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
      }

      return b;

    },

    Utils: {

      Linear: function (p0, p1, t) {

        return (p1 - p0) * t + p0;

      },

      Bernstein: function (n, i) {

        var fc = TWEEN.Interpolation.Utils.Factorial;

        return fc(n) / fc(i) / fc(n - i);

      },

      Factorial: (function () {

        var a = [1];

        return function (n) {

          var s = 1;

          if (a[n]) {
            return a[n];
          }

          for (var i = n; i > 1; i--) {
            s *= i;
          }

          a[n] = s;
          return s;

        };

      })(),

      CatmullRom: function (p0, p1, p2, p3, t) {

        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        var t2 = t * t;
        var t3 = t * t2;

        return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

      }

    }
  };

  window.TWEEN = TWEEN;
})();

DFLIP.createBlob = function createBlob(data, contentType) {
  if (typeof Blob !== 'undefined') {
    return new Blob([data], {type: contentType});
  }
  // Blob builder is deprecated in FF14 and removed in FF18.
  var bb = new MozBlobBuilder();
  bb.append(data);
  return bb.getBlob(contentType);
};

DFLIP.createObjectURL = (function createObjectURLClosure() {
  // Blob/createObjectURL is not available, falling back to data schema.
  var digits =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  return function createObjectURL(data, contentType) {
    if (typeof URL !== 'undefined' && URL.createObjectURL) {
      var blob = DFLIP.createBlob(data, contentType);
      return URL.createObjectURL(blob);
    }

    var buffer = 'data:' + contentType + ';base64,';
    for (var i = 0, ii = data.length; i < ii; i += 3) {
      var b1 = data[i] & 0xFF;
      var b2 = data[i + 1] & 0xFF;
      var b3 = data[i + 2] & 0xFF;
      var d1 = b1 >> 2, d2 = ((b1 & 3) << 4) | (b2 >> 4);
      var d3 = i + 1 < ii ? ((b2 & 0xF) << 2) | (b3 >> 6) : 64;
      var d4 = i + 2 < ii ? (b3 & 0x3F) : 64;
      buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
    }
    return buffer;
  };
})();

var ThumbList = (function ThumbListClosure() {
  function ThumbList(config) {
    var width = (config && config.w + 'px') || '100%';
    var height = (config && config.h + 'px') || '100%';
    var itemHeight = this.itemHeight = config.itemHeight;

    this.items = config.items;
    this.generatorFn = config.generatorFn;
    this.totalRows = config.totalRows || (config.items && config.items.length);

    this.addFn = config.addFn;
    this.scrollFn = config.scrollFn;

    var scroller = ThumbList.createScroller(itemHeight * this.totalRows);
    this.container = ThumbList.createContainer(width, height);
    this.container.appendChild(scroller);

    this.screenItemsLen = Math.ceil(config.h / itemHeight);
    this.offsetItems = this.screenItemsLen;
    // Cache 4 times the number of items that fit in the container viewport
    this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
    this._renderChunk(this.container, 0);

    var self = this;
    self.lastRepaintY = 0;
    var maxBuffer = this.screenItemsLen * itemHeight;
    var lastScrolled = 0;

    var requestInterval;

    function onScroll(e) {
      var scrollTop = e.target.scrollTop; // Triggers reflow
      if (!self.lastRepaintY || Math.abs(scrollTop - self.lastRepaintY) >= (self.offsetItems * self.itemHeight)) {
        var first = parseInt(scrollTop / itemHeight, 10) - self.offsetItems;
        self._renderChunk(self.container, first < 0 ? 0 : first);
        self.lastRepaintY = scrollTop;
      }

      self.lastScrolled = lastScrolled = Date.now();

      if (self.scrollFn != null) {
        self.scrollFn();
      }

      e.preventDefault && e.preventDefault();
    }

    self.dispose = function () {
      if (self.container) {
        if (self.container.parentNode) {
          self.container.parentNode.removeChild(self.container);
        }
      }

      self.container.removeEventListener('scroll', onScroll);
    };

    self.container.addEventListener('scroll', onScroll);
  }

  ThumbList.prototype.reset = function (height) {

    //container.find(".df-vrow").remove();
    this.screenItemsLen = Math.ceil(height / this.itemHeight);
    this.cachedItemsLen = this.screenItemsLen + this.offsetItems * 2;
    var first = parseInt(this.lastRepaintY / this.itemHeight, 10) - this.offsetItems;
    //this.lastRepaintY = 0;
    this.needReset = true;
    this._renderChunk(this.container, Math.max(first, 0));
  };

  ThumbList.prototype.createRow = function (i) {
    var item;
    if (this.generatorFn) {
      item = this.generatorFn(i);
      item.classList.add('df-vrow');
      item.style.position = 'absolute';
      item.style.top = (i * this.itemHeight) + 'px';
      item.setAttribute("index", i);
    }
    return item;
  };

  /**
   * Renders a particular, consecutive chunk of the total rows in the list. To
   * keep acceleration while scrolling, we mark the nodes that are candidate for
   * deletion instead of deleting them right away, which would suddenly stop the
   * acceleration. We delete them once scrolling has finished.
   *
   * @param {Node} node Parent node where we want to append the children chunk.
   * @param {Number} from Starting position, i.e. first children index.
   * @return {void}
   */
  ThumbList.prototype._renderChunk = function (node, from) {
    var isEmpty = this.range == null;
    this.range = this.range || {min: 0, max: this.cachedItemsLen};
    var range = this.range;

    var min = range.min, max = range.max;

    var isAdd = isEmpty ? true : from >= min;

    if (!isEmpty && from == min && this.needReset == false) return;

    var countVar;

    var start = isEmpty ? min : isAdd ? max : from;// - this.cachedItemsLen/3;

    start = start > this.totalRows ? this.totalRows
      : start < 0 ? 0 : start;

    var end = from + this.cachedItemsLen;//this.cachedItemsLen/3);

    end = end > this.totalRows ? this.totalRows : end;

    for (countVar = start; countVar < end; countVar++) {
      if (isAdd)
        node.appendChild(this.createRow(countVar));
      else
        node.insertBefore(this.createRow(countVar), node.childNodes[1 + countVar - start]);
      if (this.addFn != null) {
        this.addFn(countVar);
      }
    }
    var difference = Math.abs(from - min);
    this.needReset = false;
    if (!isEmpty && node.childNodes.length > (this.cachedItemsLen + 1)) {
      // Hide and mark obsolete nodes for deletion.
      var delStart = isAdd ? 1 : 1 + this.cachedItemsLen,
        delEnd = delStart + (end - start);

      for (var j = delEnd; j > delStart; j--) {
        if (node.childNodes[delStart])
          this.container.removeChild(node.childNodes[delStart]);
      }
    }
    this.range.min = from;
    this.range.max = end;
  };

  ThumbList.createContainer = function (w, h) {
    var c = document.createElement('div');
    c.style.width = w;
    c.style.height = h;
    c.style.overflow = 'auto';
    c.style.position = 'relative';
    c.style.padding = 0;
    //c.style.border = '1px solid black';
    return c;
  };

  ThumbList.createScroller = function (h) {
    var scroller = document.createElement('div');
    scroller.style.opacity = 0;
    scroller.style.position = 'absolute';
    scroller.style.top = 0;
    scroller.style.left = 0;
    scroller.style.width = '1px';
    scroller.style.height = h + 'px';
    return scroller;
  };
  return ThumbList;
})();


/**
 * @typedef {Object} BookMarkViewerOptions
 * @property {HTMLDivElement} container - The viewer element.
 * @property {IPDFLinkService} linkService - The navigation/linking service.
 */

/**
 * @typedef {Object} BookMarkViewerRenderParameters
 * @property {Array|null} outline - An array of outline objects.
 */

/**
 * @class
 */
var BookMarkViewer = (function BookMarkViewerClosure() {
  /**
   * @constructs BookMarkViewer
   * @param {BookMarkViewerOptions} options
   */
  function BookMarkViewer(options) {
    this.outline = null;
    this.lastToggleIsShow = true;
    this.container = options.container;
    this.linkService = options.linkService;
    this.outlineItemClass = options.outlineItemClass || "outlineItem";
    this.outlineToggleClass = options.outlineToggleClass || "outlineItemToggler";
    this.outlineToggleHiddenClass = options.outlineToggleHiddenClass || "outlineItemsHidden";
  }

  BookMarkViewer.prototype = {

    dispose: function () {
      if (this.container) {
        if (this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
      }
      this.linkService = null;

    },
    reset: function BookMarkViewer_reset() {
      this.outline = null;
      this.lastToggleIsShow = true;

      var container = this.container;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },

    /**
     * @private
     */
    _dispatchEvent: function BookMarkViewer_dispatchEvent(outlineCount) {
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('outlineloaded', true, true, {
        outlineCount: outlineCount
      });
      this.container.dispatchEvent(event);
    },

    /**
     * @private
     */
    _bindLink: function BookMarkViewer_bindLink(element, item) {
      var linkService = this.linkService;
      if (item.custom == true) {
        element.href = linkService.getCustomDestinationHash(item.dest);
        element.onclick = function goToDestination(e) {
          linkService.customNavigateTo(item.dest);
          return false;
        };
      }
      else {
        if (item.url) {
          PDFJS.addLinkAttributes(element, {url: item.url});
          return;
        }

        element.href = linkService.getDestinationHash(item.dest);
        element.onclick = function goToDestination(e) {
          linkService.navigateTo(item.dest);
          return false;
        };
      }
    },

    /**
     * Prepend a button before an outline item which allows the user to toggle
     * the visibility of all outline items at that level.
     *
     * @private
     */
    _addToggleButton: function BookMarkViewer_addToggleButton(div) {
      var toggler = document.createElement('div');
      toggler.className = this.outlineToggleClass + " " + this.outlineToggleHiddenClass;
      toggler.onclick = function (event) {
        event.stopPropagation();
        toggler.classList.toggle(this.outlineToggleHiddenClass);

        if (event.shiftKey) {
          var shouldShowAll = !toggler.classList.contains(this.outlineToggleHiddenClass);
          this._toggleOutlineItem(div, shouldShowAll);
        }
      }.bind(this);
      div.insertBefore(toggler, div.firstChild);
    },

    /**
     * Toggle the visibility of the subtree of an outline item.
     *
     * @param {Element} root - the root of the outline (sub)tree.
     * @param {boolean} show - whether to show the outline (sub)tree. If false,
     *   the outline subtree rooted at |root| will be collapsed.
     *
     * @private
     */
    _toggleOutlineItem: function BookMarkViewer_toggleOutlineItem(root, show) {
      this.lastToggleIsShow = show;
      var togglers = root.querySelectorAll('.' + this.outlineToggleClass);
      for (var i = 0, ii = togglers.length; i < ii; ++i) {
        togglers[i].classList[show ? 'remove' : 'add'](this.outlineToggleHiddenClass);
      }
    },

    /**
     * Collapse or expand all subtrees of the outline.
     */
    toggleOutlineTree: function BookMarkViewer_toggleOutlineTree() {
      if (!this.outline) {
        return;
      }
      this._toggleOutlineItem(this.container, !this.lastToggleIsShow);
    },

    /**
     * @param {BookMarkViewerRenderParameters} params
     */
    render: function BookMarkViewer_render(params) {
      var outline = (params && params.outline) || null;
      var outlineCount = 0;

      if (this.outline) {
        this.reset();
      }
      this.outline = outline;

      if (!outline) {
        //this._dispatchEvent(outlineCount);
        return;
      }

      var fragment = document.createDocumentFragment();
      var queue = [{parent: fragment, items: this.outline}];
      var hasAnyNesting = false;
      while (queue.length > 0) {
        var levelData = queue.shift();
        var isCustom = levelData.custom;
        for (var i = 0, len = levelData.items.length; i < len; i++) {
          var item = levelData.items[i];

          var div = document.createElement('div');
          div.className = this.outlineItemClass;

          var element = document.createElement('a');
          if (item.custom == null && isCustom != null)
            item.custom = isCustom;

          this._bindLink(element, item);
          //element.
          element.textContent = item.title.replace(/\x00/g, '');
          //PDFJS.removeNullCharacters(item.title) || "Untitled Bookmark";

          div.appendChild(element);

          if (item.items && item.items.length > 0) {
            hasAnyNesting = true;
            this._addToggleButton(div);

            var itemsDiv = document.createElement('div');
            itemsDiv.className = this.outlineItemClass + "s";
            div.appendChild(itemsDiv);
            queue.push({parent: itemsDiv, custom: item.custom, items: item.items});
          }

          levelData.parent.appendChild(div);
          outlineCount++;
        }
      }
      if (hasAnyNesting) {
        if (this.container.classList != null) {
          this.container.classList.add(this.outlineItemClass + "s");
        }
        else if (this.container.className != null) {
          this.container.className += " picWindow";
        }
      }

      this.container.appendChild(fragment);

      this._dispatchEvent(outlineCount);
    }

  };

  return BookMarkViewer;
})();
//PDFJS.PDFOutlineViewer = PDFOutlineViewer;

var DFLightBox = (function DFLightBoxClosure($) {
  /**
   * @constructs DFLightBox
   * @param closeCallback callBack function required to dispose object properly when lighbox is closed
   */
  function DFLightBox(closeCallback, options) {

    this.duration = 300;

    //cache this
    var _this = this;
    //lightbox wrapper div
    _this.lightboxWrapper = $("<div>").addClass("df-lightbox-wrapper");

    //lightbox container
    _this.container = $("<div>").addClass("df-container").appendTo(_this.lightboxWrapper);
    //lightbox controls
    _this.controls = $("<div>").addClass("df-lightbox-controls").appendTo(_this.lightboxWrapper);

    //lightbox close button
    _this.closeButton = $("<div>").addClass("df-lightbox-close df-ui-btn")
      .on("click", function () {
        _this.close(closeCallback);
      })
      .appendTo(_this.controls);

    _this.lightboxWrapper.append(_this.container);

    return _this;
  }

  DFLightBox.prototype.show = function (callback) {

    if (this.lightboxWrapper.parent().length == 0)
      $("body").append(this.lightboxWrapper);

    this.lightboxWrapper.fadeIn(this.duration, callback);

    return this;
  };

  DFLightBox.prototype.close = function (callback) {

    this.lightboxWrapper.fadeOut(this.duration);
    setTimeout(callback, this.duration);

    return this;
  };

  return DFLightBox;
})(jQuery);

DFLIP.Share = (function ShareClosure($) {

  function Share(container, options) {
    var _this = this;
    var htmlDiv = '<div>';
    var shareButtonClass = "df-share-button";
    var windowParameters = "width=500,height=400";
    _this.isOpen = false;
    _this.shareUrl = "";
    _this.wrapper = $('<div class="df-share-wrapper" style="display: none;">')
      .on("click", function (e) {
        _this.close();
      });
    _this.box = $('<div class="df-share-box">')
      .on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
      }).appendTo(_this.wrapper).html('<span class="df-share-title">' + options.text.share + '</span>');
    _this.urlInput = $('<textarea class="df-share-url">').on("click", function () {
      $(this).select();
    });

    _this.facebook = $(htmlDiv, {
      class: shareButtonClass + " df-share-facebook " + options.icons['facebook']
    }).on("click", function (e) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(_this.shareUrl), "Sharer", windowParameters);
    });
    _this.google = $(htmlDiv, {
      class: shareButtonClass + " df-share-google " + options.icons['google']
    }).on("click", function (e) {
      window.open('https://plus.google.com/share?url=' + encodeURIComponent(_this.shareUrl), "Sharer", windowParameters);
    });
    _this.twitter = $(htmlDiv, {
      class: shareButtonClass + " df-share-twitter " + options.icons['twitter']
    }).on("click", function (e) {
      window.open('http://twitter.com/share?url=' + encodeURIComponent(_this.shareUrl), "Sharer", windowParameters);
    });
    _this.mail = $('<a>', {
      class: shareButtonClass + " df-share-mail " + options.icons['mail'],
      href: 'mailto:?subject=I wanted you to see this FlipBook&body=Check out this site ' + encodeURIComponent(_this.shareUrl),
      target: '_blank'
    }).on("click", function (e) {
      $(this).attr('href', 'mailto:?subject=I wanted you to see this FlipBook&body=Check out this site ' + encodeURIComponent(_this.shareUrl));
      e.stopPropagation();//so the default event is not cancelled by parent element
    });

    _this.box.append(_this.urlInput).append(_this.facebook).append(_this.google).append(_this.twitter).append(_this.mail);
    $(container).append(_this.wrapper);

  }

  Share.prototype.show = function () {
    this.wrapper.fadeIn(300);
    this.urlInput.val(this.shareUrl);
    this.urlInput.trigger("click");
    this.isOpen = true;
  }

  Share.prototype.dispose = function () {
    var _this = this;
    _this.box.off();
    _this.google.off();
    _this.twitter.off();
    _this.facebook.off();
    _this.mail.off();
    _this.urlInput.off();
    _this.wrapper.off().remove();
  }

  Share.prototype.close = function () {
    this.wrapper.fadeOut(300);
    this.isOpen = false;
  }

  Share.prototype.update = function (url) {
    this.shareUrl = url;
  }

  return Share;
})(jQuery);
DFLIP.Popup = (function PopupClosure($) {

  function Popup(container, options) {
    var _this = this;
    var htmlDiv = '<div>';
    var windowParameters = "width=500,height=400";
    _this.isOpen = false;
    _this.wrapper = $('<div class="df-popup-wrapper" style="display: none;">')
      .on("click", function (e) {
        _this.close();
      });
    _this.box = $('<div class="df-popup-box">')
      .on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
      }).appendTo(_this.wrapper);

    $(container).append(_this.wrapper);

  }

  Popup.prototype.show = function () {
    this.wrapper.fadeIn(300);
    this.isOpen = true;
  }

  Popup.prototype.dispose = function () {
    var _this = this;
    _this.box.off();
    _this.wrapper.off().remove();
  }

  Popup.prototype.close = function () {
    this.wrapper.fadeOut(300);
    this.isOpen = false;
  }

  return Popup;
})(jQuery);

/**
 * Performs navigation functions inside PDF, such as opening specified page,
 * or destination.
 * @class
 * @implements {IPDFLinkService}
 */
var PDFLinkService = (function () {
  /**
   * @constructs PDFLinkService
   */
  function PDFLinkService() {
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;

    this._pagesRefCache = null;
  }

  PDFLinkService.prototype = {
    dispose: function () {
      this.baseUrl = null;
      this.pdfDocument = null;
      this.pdfViewer = null;
      this.pdfHistory = null;

      this._pagesRefCache = null;
    },
    setDocument: function PDFLinkService_setDocument(pdfDocument, baseUrl) {
      this.baseUrl = baseUrl;
      this.pdfDocument = pdfDocument;
      this._pagesRefCache = Object.create(null);
    },

    setViewer: function PDFLinkService_setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    },

    setHistory: function PDFLinkService_setHistory(pdfHistory) {
      this.pdfHistory = pdfHistory;
    },

    /**
     * @returns {number}
     */
    get pagesCount() {
      return this.pdfDocument.numPages;
    },

    /**
     * @returns {number}
     */
    get page() {
      return this.pdfViewer.currentPageNumber;
    },

    /**
     * @param {number} value
     */
    set page(value) {
      this.pdfViewer.currentPageNumber = value;
    },

    /**
     * @param dest - The PDF destination object.
     */
    navigateTo: function PDFLinkService_navigateTo(dest) {
      var destString = '';
      var self = this;

      var goToDestination = function (destRef) {
        // dest array looks like that: <page-ref> </XYZ|FitXXX> <args..>
        var pageNumber = destRef instanceof Object ? self._pagesRefCache[destRef.num + ' ' + destRef.gen + ' R']
          : (destRef + 1);
        if (pageNumber) {
          //case double internal
          if (self.pdfViewer.contentProvider.options.pageSize == DFLIP.PAGE_SIZE.DOUBLEINTERNAL && pageNumber > 2) {
            pageNumber = pageNumber * 2 - 1;
          }

          if (pageNumber > self.pdfViewer.pageCount) {
            pageNumber = self.pdfViewer.pageCount;
          }
          self.pdfViewer.gotoPage(pageNumber);
          // self.pdfViewer.scrollPageIntoView(pageNumber, dest);

          if (self.pdfHistory) {
            // Update the browsing history.
            self.pdfHistory.push({
              dest: dest,
              hash: destString,
              page: pageNumber
            });
          }
        } else {
          self.pdfDocument.getPageIndex(destRef).then(function (pageIndex) {
            var pageNum = pageIndex + 1;
            var cacheKey = destRef.num + ' ' + destRef.gen + ' R';
            self._pagesRefCache[cacheKey] = pageNum;
            goToDestination(destRef);
          });
        }
      };

      var destinationPromise;
      if (typeof dest === 'string') {
        destString = dest;
        destinationPromise = this.pdfDocument.getDestination(dest);
      } else {
        destinationPromise = Promise.resolve(dest);
      }
      destinationPromise.then(function (destination) {
        dest = destination;
        if (!(destination instanceof Array)) {
          return; // invalid destination
        }
        goToDestination(destination[0]);
      });
    },


    /**
     * @param dest - The PDF destination object.
     */
    customNavigateTo: function PDFLinkService_navigateTo(dest) {
      if (dest == '' || dest == null || dest == 'null') return;
      var pageNumber = null;
      if (!isNaN(Math.round(dest))) {
        pageNumber = dest;
      }
      else if (typeof dest === 'string') {
        pageNumber = parseInt(dest.replace("#", ""), 10);
        if (isNaN(pageNumber)) {
          window.open(dest);
          return;
        }
      }

      if (pageNumber != null)
        this.pdfViewer.gotoPage(pageNumber);

    },

    /**
     * @param dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
    getDestinationHash: function PDFLinkService_getDestinationHash(dest) {
      if (typeof dest === 'string') {
        return this.getAnchorUrl('#' + escape(dest));
      }
      if (dest instanceof Array) {
        var destRef = dest[0]; // see navigateTo method for dest format
        var pageNumber = destRef instanceof Object ? this._pagesRefCache[destRef.num + ' ' + destRef.gen + ' R']
          : (destRef + 1);
        if (pageNumber) {
          var pdfOpenParams = this.getAnchorUrl('#page=' + pageNumber);
          var destKind = dest[1];
          if (typeof destKind === 'object' && 'name' in destKind &&
            destKind.name === 'XYZ') {
            var scale = (dest[4] || this.pdfViewer.currentScaleValue);
            var scaleNumber = parseFloat(scale);
            if (scaleNumber) {
              scale = scaleNumber * 100;
            }
            pdfOpenParams += '&zoom=' + scale;
            if (dest[2] || dest[3]) {
              pdfOpenParams += ',' + (dest[2] || 0) + ',' + (dest[3] || 0);
            }
          }
          return pdfOpenParams;
        }
      }
      return this.getAnchorUrl('');
    },

    /**
     * @param dest - The PDF destination object.
     * @returns {string} The hyperlink to the PDF object.
     */
    getCustomDestinationHash: function PDFLinkService_getCustomDestinationHash(dest) {
      //if (typeof dest === 'string') {
      return '#' + escape(dest);
      //}
      //return this.getAnchorUrl('');
    },


    /**
     * Prefix the full url on anchor links to make sure that links are resolved
     * relative to the current URL instead of the one defined in <base href>.
     * @param {String} anchor The anchor hash, including the #.
     * @returns {string} The hyperlink to the PDF object.
     */
    getAnchorUrl: function PDFLinkService_getAnchorUrl(anchor) {
      return (this.baseUrl || '') + anchor;
    },

    /**
     * @param {string} hash
     */
    setHash: function PDFLinkService_setHash(hash) {
      if (hash.indexOf('=') >= 0) {
        var params = parseQueryString(hash);
        // borrowing syntax from "Parameters for Opening PDF Files"
        if ('nameddest' in params) {
          if (this.pdfHistory) {
            this.pdfHistory.updateNextHashParam(params.nameddest);
          }
          this.navigateTo(params.nameddest);
          return;
        }
        var pageNumber, dest;
        if ('page' in params) {
          pageNumber = (params.page | 0) || 1;
        }
        if ('zoom' in params) {
          // Build the destination array.
          var zoomArgs = params.zoom.split(','); // scale,left,top
          var zoomArg = zoomArgs[0];
          var zoomArgNumber = parseFloat(zoomArg);

          if (zoomArg.indexOf('Fit') === -1) {
            // If the zoomArg is a number, it has to get divided by 100. If it's
            // a string, it should stay as it is.
            dest = [null, {name: 'XYZ'},
              zoomArgs.length > 1 ? (zoomArgs[1] | 0) : null,
              zoomArgs.length > 2 ? (zoomArgs[2] | 0) : null,
              (zoomArgNumber ? zoomArgNumber / 100 : zoomArg)];
          } else {
            if (zoomArg === 'Fit' || zoomArg === 'FitB') {
              dest = [null, {name: zoomArg}];
            } else if ((zoomArg === 'FitH' || zoomArg === 'FitBH') ||
              (zoomArg === 'FitV' || zoomArg === 'FitBV')) {
              dest = [null, {name: zoomArg},
                zoomArgs.length > 1 ? (zoomArgs[1] | 0) : null];
            } else if (zoomArg === 'FitR') {
              if (zoomArgs.length !== 5) {
                console.error('PDFLinkService_setHash: ' +
                  'Not enough parameters for \'FitR\'.');
              } else {
                dest = [null, {name: zoomArg},
                  (zoomArgs[1] | 0), (zoomArgs[2] | 0),
                  (zoomArgs[3] | 0), (zoomArgs[4] | 0)];
              }
            } else {
              console.error('PDFLinkService_setHash: \'' + zoomArg +
                '\' is not a valid zoom value.');
            }
          }
        }
        if (dest) {
          this.pdfViewer.scrollPageIntoView(pageNumber || this.page, dest);
        } else if (pageNumber) {
          this.page = pageNumber; // simple page
        }
        if ('pagemode' in params) {
          var event = document.createEvent('CustomEvent');
          event.initCustomEvent('pagemode', true, true, {
            mode: params.pagemode
          });
          this.pdfViewer.container.dispatchEvent(event);
        }
      } else if (/^\d+$/.test(hash)) { // page number
        this.page = hash;
      } else { // named destination
        if (this.pdfHistory) {
          this.pdfHistory.updateNextHashParam(unescape(hash));
        }
        this.navigateTo(unescape(hash));
      }
    },

    /**
     * @param {string} action
     */
    executeNamedAction: function PDFLinkService_executeNamedAction(action) {
      // See PDF reference, table 8.45 - Named action
      switch (action) {
        case 'GoBack':
          if (this.pdfHistory) {
            this.pdfHistory.back();
          }
          break;

        case 'GoForward':
          if (this.pdfHistory) {
            this.pdfHistory.forward();
          }
          break;

        case 'NextPage':
          this.page++;
          break;

        case 'PrevPage':
          this.page--;
          break;

        case 'LastPage':
          this.page = this.pagesCount;
          break;

        case 'FirstPage':
          this.page = 1;
          break;

        default:
          break; // No action according to spec
      }

      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('namedaction', true, true, {
        action: action
      });
      this.pdfViewer.container.dispatchEvent(event);
    },

    /**
     * @param {number} pageNum - page number.
     * @param {Object} pageRef - reference to the page.
     */
    cachePageRef: function PDFLinkService_cachePageRef(pageNum, pageRef) {
      var refStr = pageRef.num + ' ' + pageRef.gen + ' R';
      this._pagesRefCache[refStr] = pageNum;
    }
  };

  return PDFLinkService;
})();
//PDFJS.PDFLinkService = PDFLinkService;

/**
 * @typedef {Object} TextLayerBuilderOptions
 * @property {HTMLDivElement} textLayerDiv - The text layer container.
 * @property {EventBus} eventBus - The application event bus.
 * @property {number} pageIndex - The page index.
 * @property {PageViewport} viewport - The viewport of the text layer.
 * @property {PDFFindController} findController
 * @property {boolean} enhanceTextSelection - Option to turn on improved
 *   text selection.
 */

/**
 * TextLayerBuilder provides text-selection functionality for the PDF.
 * It does this by creating overlay divs over the PDF text. These divs
 * contain text that matches the PDF text they are overlaying. This object
 * also provides a way to highlight text that is being searched for.
 * @class
 */
DFLIP.TextLayerBuilder = (function TextLayerBuilderClosure() {
  function TextLayerBuilder(options) {
    this.textLayerDiv = options.textLayerDiv;
    this.renderingDone = false;
    this.divContentDone = false;
    this.pageIdx = options.pageIndex;
    this.pageNumber = this.pageIdx + 1;
    this.matches = [];
    this.viewport = options.viewport;
    this.textDivs = [];
    this.findController = options.findController || null;
    this.textLayerRenderTask = null;
    this.enhanceTextSelection = options.enhanceTextSelection;
    this._bindMouse();
  }

  TextLayerBuilder.prototype = {
    _finishRendering: function TextLayerBuilder_finishRendering() {
      this.renderingDone = true;

      if (!this.enhanceTextSelection) {
        var endOfContent = document.createElement('div');
        endOfContent.className = 'endOfContent';
        this.textLayerDiv.appendChild(endOfContent);
      }

      /*			this.eventBus.dispatch('textlayerrendered', {
       source: this,
       pageNumber: this.pageNumber
       });*/
    },

    /**
     * Renders the text layer.
     * @param {number} timeout (optional) if specified, the rendering waits
     *   for specified amount of ms.
     */
    render: function TextLayerBuilder_render(timeout) {
      if (!this.divContentDone || this.renderingDone) {
        return;
      }

      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }

      this.textDivs = [];
      var textLayerFrag = document.createDocumentFragment();
      this.textLayerRenderTask = PDFJS.renderTextLayer({
        textContent: this.textContent,
        container: textLayerFrag,
        viewport: this.viewport,
        textDivs: this.textDivs,
        timeout: timeout,
        enhanceTextSelection: this.enhanceTextSelection,
      });
      this.textLayerRenderTask.promise.then(function () {
        this.textLayerDiv.appendChild(textLayerFrag);
        this._finishRendering();
        this.updateMatches();
      }.bind(this), function (reason) {
        // canceled or failed to render text layer -- skipping errors
      });
    },

    setTextContent: function TextLayerBuilder_setTextContent(textContent) {
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }
      this.textContent = textContent;
      this.divContentDone = true;
    },

    convertMatches: function TextLayerBuilder_convertMatches(matches,
                                                             matchesLength) {
      var i = 0;
      var iIndex = 0;
      var bidiTexts = this.textContent.items;
      var end = bidiTexts.length - 1;
      var queryLen = (this.findController === null ? 0 : this.findController.state.query.length);
      var ret = [];
      if (!matches) {
        return ret;
      }
      for (var m = 0, len = matches.length; m < len; m++) {
        // Calculate the start position.
        var matchIdx = matches[m];

        // Loop over the divIdxs.
        while (i !== end && matchIdx >= (iIndex + bidiTexts[i].str.length)) {
          iIndex += bidiTexts[i].str.length;
          i++;
        }

        if (i === bidiTexts.length) {
          console.error('Could not find a matching mapping');
        }

        var match = {
          begin: {
            divIdx: i,
            offset: matchIdx - iIndex
          }
        };

        // Calculate the end position.
        if (matchesLength) { // multiterm search
          matchIdx += matchesLength[m];
        } else { // phrase search
          matchIdx += queryLen;
        }

        // Somewhat the same array as above, but use > instead of >= to get
        // the end position right.
        while (i !== end && matchIdx > (iIndex + bidiTexts[i].str.length)) {
          iIndex += bidiTexts[i].str.length;
          i++;
        }

        match.end = {
          divIdx: i,
          offset: matchIdx - iIndex
        };
        ret.push(match);
      }

      return ret;
    },

    renderMatches: function TextLayerBuilder_renderMatches(matches) {
      // Early exit if there is nothing to render.
      if (matches.length === 0) {
        return;
      }

      var bidiTexts = this.textContent.items;
      var textDivs = this.textDivs;
      var prevEnd = null;
      var pageIdx = this.pageIdx;
      var isSelectedPage = (this.findController === null ? false : (pageIdx === this.findController.selected.pageIdx));
      var selectedMatchIdx = (this.findController === null ? -1 : this.findController.selected.matchIdx);
      var highlightAll = (this.findController === null ? false : this.findController.state.highlightAll);
      var infinity = {
        divIdx: -1,
        offset: undefined
      };

      function beginText(begin, className) {
        var divIdx = begin.divIdx;
        textDivs[divIdx].textContent = '';
        appendTextToDiv(divIdx, 0, begin.offset, className);
      }

      function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
        var div = textDivs[divIdx];
        var content = bidiTexts[divIdx].str.substring(fromOffset, toOffset);
        var node = document.createTextNode(content);
        if (className) {
          var span = document.createElement('span');
          span.className = className;
          span.appendChild(node);
          div.appendChild(span);
          return;
        }
        div.appendChild(node);
      }

      var i0 = selectedMatchIdx, i1 = i0 + 1;
      if (highlightAll) {
        i0 = 0;
        i1 = matches.length;
      } else if (!isSelectedPage) {
        // Not highlighting all and this isn't the selected page, so do nothing.
        return;
      }

      for (var i = i0; i < i1; i++) {
        var match = matches[i];
        var begin = match.begin;
        var end = match.end;
        var isSelected = (isSelectedPage && i === selectedMatchIdx);
        var highlightSuffix = (isSelected ? ' selected' : '');

        if (this.findController) {
          this.findController.updateMatchPosition(pageIdx, i, textDivs,
            begin.divIdx);
        }

        // Match inside new div.
        if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
          // If there was a previous div, then add the text at the end.
          if (prevEnd !== null) {
            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
          }
          // Clear the divs and set the content until the starting point.
          beginText(begin);
        } else {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
        }

        if (begin.divIdx === end.divIdx) {
          appendTextToDiv(begin.divIdx, begin.offset, end.offset,
            'highlight' + highlightSuffix);
        } else {
          appendTextToDiv(begin.divIdx, begin.offset, infinity.offset,
            'highlight begin' + highlightSuffix);
          for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
            textDivs[n0].className = 'highlight middle' + highlightSuffix;
          }
          beginText(end, 'highlight end' + highlightSuffix);
        }
        prevEnd = end;
      }

      if (prevEnd) {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
      }
    },

    updateMatches: function TextLayerBuilder_updateMatches() {
      // Only show matches when all rendering is done.
      if (!this.renderingDone) {
        return;
      }

      // Clear all matches.
      var matches = this.matches;
      var textDivs = this.textDivs;
      var bidiTexts = this.textContent.items;
      var clearedUntilDivIdx = -1;

      // Clear all current matches.
      for (var i = 0, len = matches.length; i < len; i++) {
        var match = matches[i];
        var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
        for (var n = begin, end = match.end.divIdx; n <= end; n++) {
          var div = textDivs[n];
          div.textContent = bidiTexts[n].str;
          div.className = '';
        }
        clearedUntilDivIdx = match.end.divIdx + 1;
      }

      if (this.findController === null || !this.findController.active) {
        return;
      }

      // Convert the matches on the page controller into the match format
      // used for the textLayer.
      var pageMatches, pageMatchesLength;
      if (this.findController !== null) {
        pageMatches = this.findController.pageMatches[this.pageIdx] || null;
        pageMatchesLength = (this.findController.pageMatchesLength)
          ? this.findController.pageMatchesLength[this.pageIdx] || null : null;
      }

      this.matches = this.convertMatches(pageMatches, pageMatchesLength);
      this.renderMatches(this.matches);
    },

    /**
     * Fixes text selection: adds additional div where mouse was clicked.
     * This reduces flickering of the content if mouse slowly dragged down/up.
     * @private
     */
    _bindMouse: function TextLayerBuilder_bindMouse() {
      var div = this.textLayerDiv;
      var self = this;
      div.addEventListener('mousedown', function (e) {
        if (self.enhanceTextSelection && self.textLayerRenderTask) {
          self.textLayerRenderTask.expandTextDivs(true);
          return;
        }
        var end = div.querySelector('.endOfContent');
        if (!end) {
          return;
        }
        // On non-Firefox browsers, the selection will feel better if the height
        // of the endOfContent div will be adjusted to start at mouse click
        // location -- this will avoid flickering when selections moves up.
        // However it does not work when selection started on empty space.
        var adjustTop = e.target !== div;
        adjustTop = adjustTop && window.getComputedStyle(end).getPropertyValue('-moz-user-select') !== 'none';
        if (adjustTop) {
          var divBounds = div.getBoundingClientRect();
          var r = Math.max(0, (e.pageY - divBounds.top) / divBounds.height);
          end.style.top = (r * 100).toFixed(2) + '%';
        }
        end.classList.add('active');
      });
      div.addEventListener('mouseup', function (e) {
        if (self.enhanceTextSelection && self.textLayerRenderTask) {
          self.textLayerRenderTask.expandTextDivs(false);
          return;
        }
        var end = div.querySelector('.endOfContent');
        if (!end) {
          return;
        }
        end.style.top = '';
        end.classList.remove('active');
      });
    },
  };
  return TextLayerBuilder;
})();

DFLIP.ConvertPageLinks = function () {

  var w = arguments[0] / 100, h = arguments[1] / 100;

  var toPercent = function (_x, _y, _w, _h, _dest) {
    return {
      x: _x / w,
      y: _y / h,
      w: _w / w,
      h: _h / h,
      dest: _dest
    };
  };

  var percents = [];
  var input;

  for (var index = 2; index < arguments.length; index++) {
    input = arguments[index];
    percents[index - 2] = toPercent.apply(this, input);
  }

  return percents;
};

DFLIP.parseLinks = function (links) {
  var _links;
  if (links != null && links.length > 0) {
    for (var index = 0; index < links.length; index++) {
      _links = links[index];

      if (_links != null && _links[0] != null && _links[0].dest == null) {

        _links = DFLIP.ConvertPageLinks.apply(this, _links);
        links[index] = _links;
      }
    }
  }
  return links;
};

/**
 * DFLIP.parseBooks
 */
(function ($) {

  //php and javascript interpret booleans differently so we use string checks
  function isTrue(val) {
    return val == "true" || val == true;
  }

  function checkValues(options) {

    //boolean values
    if (options.webgl != null) options.webgl = isTrue(options.webgl);
    if (options.enableDownload != null) options.enableDownload = isTrue(options.enableDownload);
    if (options.scrollWheel != null) options.scrollWheel = isTrue(options.scrollWheel);
    if (options.autoEnableOutline != null) options.autoEnableOutline = isTrue(options.autoEnableOutline);
    if (options.autoEnableThumbnail != null) options.autoEnableThumbnail = isTrue(options.autoEnableThumbnail);
    if (options.transparent != null) options.transparent = isTrue(options.transparent);
    if (options.overwritePDFOutline != null) options.overwritePDFOutline = isTrue(options.overwritePDFOutline);
    if (options.soundEnable != null) options.soundEnable = isTrue(options.soundEnable);
    if (options.forceFit != null) options.forceFit = isTrue(options.forceFit);
    if (options.enableAnnotation != null) options.enableAnnotation = isTrue(options.enableAnnotation);
    if (options.webglShadow != null) options.webglShadow = isTrue(options.webglShadow);
    if (options.autoPlay != null) options.autoPlay = isTrue(options.autoPlay);
    if (options.autoPlayStart != null) options.autoPlayStart = isTrue(options.autoPlayStart);

    //integer value
    if (options.paddingTop != null) options.paddingTop = parseInt(options.paddingTop, 10);
    if (options.paddingRight != null) options.paddingRight = parseInt(options.paddingRight, 10);
    if (options.paddingBottom != null) options.paddingBottom = parseInt(options.paddingBottom, 10);
    if (options.paddingLeft != null) options.paddingLeft = parseInt(options.paddingLeft, 10);
    if (options.zoomRatio != null) options.zoomRatio = parseFloat(options.zoomRatio, 10);
    if (options.stiffness != null) options.stiffness = parseFloat(options.stiffness, 10);
    if (options.autoPlayDuration != null) options.autoPlayDuration = parseInt(options.autoPlayDuration, 10);

    if (options.pageMode == 0 || options.pageMode == "0")
      options.pageMode = null;
    if (options.singlePageMode == 0 || options.singlePageMode == "0")
      options.singlePageMode = null;
  }

  function parseOptions(options) {

    //bail out if already parsed or failed
    if (options.parsed == true) return;

    options.parsed = true;
    //options.links are in json format
    //{"1":[]}
    //convert them to array format
    var links = [];
    checkValues(options);

    if (typeof dFlipWPGlobal !== 'undefined' && options.wpOptions == 'true') {

      try {
        for (var key in options.links) {
          var _pagelinks = options.links[key];
          var pagelink = [100, 100];
          for (var l = 0; l < _pagelinks.length; l++) {
            var _link = _pagelinks[l];
            var _values = _link.substr(1).slice(0, -1).split(",");
            var _linkarr = [];
            for (var v = 0; v < 5; v++) {
              _linkarr[v] = _values[v];
            }
            pagelink.push(_linkarr);
          }
          links[parseInt(key, 10) + 1] = pagelink;
        }
      }
      catch (error) {
        console.error(error.stack);
      }
      options.links = DFLIP.parseLinks(links);

    } else {
      options.links = DFLIP.parseLinks(options.links);
    }

  }

  DFLIP.getOptions = function (book) {

    book = $(book);

    var book_id = book.attr("id");

    var options = "option_" + book_id,
      source = book.attr("source") || book.attr("df-source");

    //verify and optimize the values
    options = options == null || options == "" || window[options] == null ? {} : window[options];

    options.source = source == null || source == "" ? options.source : source;

    /*As of 1.2.6 attribute values are also considered as options in some cases*/
    var attrOptions = {
      webgl: book.attr("webgl"),
      height: book.attr("height"),
      soundEnable: book.attr("sound"),
      transparent: book.attr("transparent"),
      enableDownload: book.attr("download"),
      duration: book.attr("duration"),
      hard: book.attr("hard"),
      pageMode: book.attr("pagemode"),
      direction: book.attr("direction"),
      backgroundColor: book.attr("backgroundcolor"),
      scrollWheel: book.attr("scrollwheel"),
      backgroundImage: book.attr("backgroundimage"),
      paddingTop: book.attr("paddingtop"),
      paddingRight: book.attr("paddingright"),
      paddingBottom: book.attr("paddingbottom"),
      paddingLeft: book.attr("paddingleft"),
      wpOptions: book.attr("wpoptions")
    };

    options = $.extend(true, {}, options, attrOptions);

    parseOptions(options);

    return options;
  }

  DFLIP.parseBooks = function () {

    $('._df_button, ._df_thumb, ._df_custom, ._df_book').each(function () {

      var book = $(this);

      //fetch any existing values
      var parsed = book.attr("parsed") || book.attr("df-parsed");

      //skip if already parsed or failed
      if (parsed !== "true") {
        book.attr("df-parsed", "true")

        if (book.hasClass("_df_book")) {

          var book_id = book.attr("id"),
            slug = book.attr("slug");
          var options = DFLIP.getOptions(book);
          options.id = book_id;
          if (slug != null)
            options.slug = slug;
          if (book_id) {
            window[book_id.toString()] = $(book).flipBook(options.source, options);
          }
          else {
            $(book).flipBook(options.source, options);
          }

        }
        else {

          if (book.hasClass("_df_thumb")) {
            var wrapper = $("<div class='_df_book-cover'>");

            var text = book.html().trim();
            book.html("");
            var title = $("<span class='_df_book-title'>").html(text).appendTo(wrapper);

            var thumb = book.attr("thumb") || book.attr("df-thumb"),
              thumbType = book.attr("thumbtype") || DFLIP.defaults.thumbElement || "div",
              tags = book.attr("tags") || book.attr("df-tags");

            if (tags) {
              tags = tags.split(",");

              if (tags.length > 0) {
                for (var tagcount = 0; tagcount < tags.length; tagcount++) {
                  book.append("<span class='_df_book-tag'>" + tags[tagcount] + "</span>");
                }
              }
            }

            if (thumb != null && thumb.toString().trim() != '') {
              if (thumbType == 'img') {
                wrapper.append('<img src="' + thumb + '" alt="' + text + '"/>');
                book.attr("thumb-type", "img");
              } else {
                wrapper.css({
                  backgroundImage: "url(" + thumb + ")"
                });
              }
            } else {
              wrapper.addClass("_df_thumb-not-found");
            }

            book.append(wrapper);
          }

        }

      }
    });

  };

  $(document).ready(function () {

    //Autodetection if the folder structure is copied properly
    if (typeof dFlipLocation == 'undefined' && DFLIP.autoDetectLocation != false) {
      $("script").each(function () {
        var src = $(this)[0].src;
        if ((src.indexOf("/dflip.js") > -1 || src.indexOf("/dflip.min.js") > -1 )
          && (src.indexOf("https://") > -1 || src.indexOf("http://") > -1 ) && src.indexOf("js/dflip.") > -1) {
          var splits = src.split("/");
          window.dFlipLocation = splits.slice(0, -2).join("/");
        }
      });
    }

    if (typeof dFlipLocation !== 'undefined') {

      //add ending forward slash trail for safety
      if (dFlipLocation.length > 2 && dFlipLocation.slice(-1) !== "/") {
        window.dFlipLocation += "/";
      }

      //PRESENTATION.defaults.backgroundImage = "blank"; "images/textures/white.jpg";
      //PRESENTATION.defaults.textureLoadFallback = dFlipLocation + "images/textures/white.jpg";
      DFLIP.defaults.mockupjsSrc = dFlipLocation + "js/libs/mockup.min.js";
      DFLIP.defaults.pdfjsSrc = dFlipLocation + "js/libs/pdf.min.js";
      DFLIP.defaults.pdfjsCompatibilitySrc = dFlipLocation + "js/libs/compatibility.js";
      DFLIP.defaults.threejsSrc = dFlipLocation + "js/libs/three.min.js";
      DFLIP.defaults.pdfjsWorkerSrc = dFlipLocation + "js/libs/pdf.worker.min.js";
      DFLIP.defaults.soundFile = dFlipLocation + "sound/turn2.mp3";
      DFLIP.defaults.imagesLocation = dFlipLocation + "images";
      DFLIP.defaults.imageResourcesPath = dFlipLocation + "images/pdfjs/";
      DFLIP.defaults.cMapUrl = dFlipLocation + "js/libs/cmaps/";

      if (typeof dFlipWPGlobal !== 'undefined') {

        checkValues(dFlipWPGlobal);

        $.extend(DFLIP.defaults, dFlipWPGlobal);
      }
    }

    DFLIP.preParseHash = window.location.hash;
    DFLIP.parseBooks();

    $('body').on('click', '._df_button, ._df_thumb, ._df_custom', function () {

      //cache the book element
      var book = $(this);

      if (!window.dfLightBox) {
        window.dfLightBox = new DFLightBox(function () {

          if (window.location.hash.indexOf("#dflip-") == 0)
            window.location.hash = "#_";
          window.dfActiveLightBoxBook.dispose();
          window.dfActiveLightBoxBook = null;
        });
      }

      window.dfLightBox.duration = 500;

      if (window.dfActiveLightBoxBook && window.dfActiveLightBoxBook.dispose) {
        window.dfActiveLightBoxBook.dispose();

      } else {
        window.dfLightBox.show(
          function () {
            //                            $("body").addClass("df-no-scroll");
            var options = DFLIP.getOptions(book);
            options.transparent = false;
            options.id = book.attr("id");
            var slug = book.attr("slug");
            if (slug != null)
              options.slug = slug;
            options.isLightBox = true;
            window.dfActiveLightBoxBook = $(window.dfLightBox.container).flipBook(options.source, options);
          }
        );
      }


    });

    if (DFLIP.utils.isSafari || DFLIP.utils.isIOS) {
      $('body').addClass("df-webkit");
    }
    //parse hash and check if any exists
    if (DFLIP.preParseHash && DFLIP.preParseHash.indexOf('dflip-') >= 0) {
      var id = DFLIP.preParseHash.split('dflip-')[1].split('/')[0];
      var page = DFLIP.preParseHash.split('dflip-')[1].split('/')[1];
      if (page != null) {
        page = page.split('/')[0];
      }
      var book;
      //first check for slug pattern
      book = $("[slug=" + id + "]");
      //then id pattern
      if (book.length == 0) book = $('#' + id);

      if (book.length > 0) {

        //var oldHash = window.location.hash;
        //window.location.hash = id;
        //window.location.hash = DFLIP.preParseHash;

        if (page != null) {
          book.data("page", page)
        }

        if (book.is('._df_button, ._df_thumb, ._df_custom')) {
          book.trigger("click");
        }
      }
    }

    $('body').on('click', '.df-ui-sidemenu-close', function () {
      var $this = $(this);
      $this.closest(".df-container").find(".df-ui-outline.df-active , .df-ui-thumbnail.df-active").trigger("click");
    });


  });

})(jQuery);