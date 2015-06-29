(function(){
  // test code implementing just the necessary ( .. )
  
  // HTML5 fullscreen API
  function launchFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  /*
  // Launch fullscreen for browsers that support it!
  launchFullScreen(document.documentElement); // the whole page
  launchFullScreen(document.getElementById("videoElement")); // any individual element
  */
    
  // Whack fullscreen
  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  /* 
  // Cancel fullscreen for browsers that support it!
  exitFullscreen();
  */
    
    
  /* some focus test(s) */
  window.addEventListener("focus", function(event) { console.log("window has focus") }, false);
  window.addEventListener("blur",  function(event) { console.log("window lost focus") }, false);
    
    
  /* debug keyboard keys code */
  /*
  window.addEventListener('keypress', function (e) {
      console.log(e.keyCode);
  }, false);
  */


  /* would it .. do the trick ?*/
  chrome.app.window.current().onRestored.addListener(function(){
    window.blur();
    window.focus();
    chrome.app.window.current().focus();
    console.log('onRestoredCallback done');
  });
  chrome.app.window.current().onFullscreened.addListener(function(){
    console.log('onFullscreenedCallback done');
  });
    
  /* handle keypress to toggle fullscreen on/off & other stuff --> R: it may be finally triggered by an Arduino-made IR-to-Keyboard remote ;D */
  /* nb: the top/bottom/left & right arrows are emulated "as is", & only necessary shortcuts are implemented ( specifically, the needed for the expected usage of the remote ) */
  window.addEventListener('keypress', function (e) {
      //console.log(e.keyCode); // debug -> prints the keyCode to the javascript console
      switch(e.keyCode){
        case 97: // keyboard key: A
          console.log("keyboard key pressed: A");
          break;
        case 99: // keyboard key: C --> used to toggle the Chrome Packaged App "fullscreen" mode
          console.log("keyboard key pressed: C");
          console.log("Toggling fullscreen ..");
          //chrome.app.window.current().setAlwaysOnTop(true);
          chrome.app.window.current().isFullscreen() == true ? chrome.app.window.current().restore() : chrome.app.window.current().fullscreen() ; // toggle fullscreen on/off
          /* "all right :/" -> Ubuntu Chrome bug, not my fault, & not much I can do ( .. for now ? ;p )*/
          //var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
          //var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
          //document.webkitFullscreenEnabled == true ? exitFullscreen() : launchFullScreen(document.documentElement) ; // alternative good with the focus
          //chrome.app.window.current().focus(); // it seems that we loose focus after escaping the fullscreen mode ( from either using "Esc" or "C" )
          //chrome.app.window.current().drawAttention();
          //window.focus();
          //chrome.app.window.current().show();
          //document.documentElement.blur();
          /*
          setTimeout(function(){ 
            //chrome.app.window.current().show();
            //chrome.app.window.current().focus();
            //chrome.app.window.current().focus();
            //chrome.app.window.current().drawAttention();
            //document.documentElement.focus();
            //document.body.focus();
            //document.body.click();
            //window.focus();
            console.log('focused ?');
          }, 2000);
          */
          break;
        case 100: // keyboard key: D
          console.log("keyboard key pressed: D");
          break;
        case 101: // keyboard key: E
          console.log("keyboard key pressed: E");
          break;
        case 103: // keyboard key: G
          console.log("keyboard key pressed: G");
          break;
        case 105: // keyboard key: I
          console.log("keyboard key pressed: I");
          break;
        case 109: // keyboard key: M
          console.log("keyboard key pressed: M");
          break;
        case 113: // keyboard key: Q
          console.log("keyboard key pressed: Q");
          break;
        case 114: // keyboard key: R
          console.log("keyboard key pressed: R");
          break;
        case 116: // keyboard key: T
          console.log("keyboard key pressed: T");
          break;
        case 117: // keyboard key: U
          console.log("keyboard key pressed: U");
          break;
        case 118: // keyboard key: V
          console.log("keyboard key pressed: V");
          break;
        case 119: // keyboard key: W
          console.log("keyboard key pressed: W");
          break;
        case 120: // keyboard key: X
          console.log("keyboard key pressed: X");
          break;
        case 121: // keyboard key: Y
          console.log("keyboard key pressed: Y");
          break;
        case 122: // keyboard key: Z
          console.log("keyboard key pressed: Z");
          break;
      }
  }, false);
    
    
  /* CODE PREVIOUSLY DIRECTLY IN MAIN.HTML -> MOVE TO BE OK WITH CSP */
  
  /* was at the top of the main.html file */
  // If the query includes 'print-pdf', include the PDF print sheet
  if( window.location.search.match( /print-pdf/gi ) ) {
    var link = document.createElement( 'link' );
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/print/pdf.css';
    document.getElementsByTagName( 'head' )[0].appendChild( link );
  }
  
  /* Reveal setup */
  // Full list of configuration options available here:
  // https://github.com/hakimel/reveal.js#configuration
  Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
	transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none
	// Parallax scrolling
	// parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
	// parallaxBackgroundSize: '2100px 900px',
	// Optional libraries used to extend on reveal.js
	dependencies: [
		{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
		{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
		{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
		{ src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
	]
  });
    
})();