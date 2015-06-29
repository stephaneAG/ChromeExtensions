/* 
*  neatFramework: App logic
*
*  app_logic.js - A javascript module file holding the overall logic (..)
*  
*  by StephaneAG - 2013-2014
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
(function (theWindow, theDocument, theUndefined) {
  var _undef; // an undefined var
  var _undefined = 'undefined'; // another "undefined" var
  // some 'closures' tests ..
  //console.log('[ app_logic.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
  //console.log('[ app_logic.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
  //console.log('[ app_logic.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
  
  /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
    // LiveReload debug logic
    
    //var liveReloadScript = theDocument.getElementById('chromeLiveReloadPlaceHolder');
    //var liveReloadScript = theDocument.createElement('script');
    //liveReloadScript.classList.add('debugLiveReload');
    //liveReloadScript.src = 'http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; // init LiveReload ( try to make it work within Chrome Apps)
    //liveReloadScript.src= 'http://localhost:35729/livereload.js?snipver=1'; // LiveReload src URL automatically generated when using Chrome/Firefox browsers
    //theDocument.getElementsByTagName('body')[0].appendChild(liveReloadScript);
    //console.log('[ app_logic.js ] : ' + 'enabling LiveReload ..'); // debug message > LiveReload is activated
    
    // manifest.json junk:
    // "<all_urls>", "http://localhost:35729/livereload.js" -> not working for app
    //  "content_security_policy": "script-src 'self' http://localhost; object-src 'self'" , --> not working for packaged apps
    // "http://localhost" --> not working: Permission 'http://localhost' is unknown or URL pattern is malformed.
    
    var _loadLiveReload = function(){
      console.log('[ app_logic.js ] : ' + 'enabling LiveReload ..');
      var xhr = new XMLHttpRequest();
      //xhr.load = _handleLiveReloadInit;
      xhr.open('GET', 'http://localhost:35729/livereload.js?snipver=1', true);
      //xhr.open('GET', 'file:///home/stephaneag/Documents/Development/dev__Chrome_extensions/neatFramework_ChromeModuleOverlay/infos.tef', true); // nothing, even with permissions
      //xhr.open('GET', '/local_stuff/stef_tests', true); // works with no special permissions
      xhr.onreadystatechange = function() { if(xhr.readyState == 4) _handleLiveReloadInit(xhr.responseText); }
      xhr.send();
    };
    
    var _handleLiveReloadInit = function(response){
      //theDocument.querySelector("#livereload_content").innerHTML = response;
      //theDocument.querySelector("#chromeLiveReloadPlaceHolder").innerHTML = response; // ok, but does nothing more
      //theDocument.querySelector("#chromeLiveReloadPlaceHolder").src = 'blop!';
      //theDocument.querySelector("#chromeLiveReloadPlaceHolder").removeAttribute('src'); // try to remove the src: ok, but does nothing more
      theDocument.querySelector("#chromeLiveReloadPlaceHolder").src = 'http://localhost:35729/livereload.js?snipver=1'; // try to set the src
      console.log('[ app_logic.js ] : ' + 'LiveReload enabled ?!');
      console.log('[ app_logic.js ] : ' + 'content fetched: ' + response);
    }
    
    //_loadLiveReload();
    
  /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
    
  /* ************************************************************************************************************************************************ */
  // our actual 'App logic' code ..
 
  // a hlpr fcn to for the below function
  var _checkModule = function(moduleName){
    //( theWindow.neatFramework[moduleName].log_module_version || function(){ console.log("QUICK AND DIRTY: not found! ") } ); // working one-liner
    // - working multiline version that dosn't need the "log_module_version" fcn ( nb: all the modules 'll be updated WITH it ;D )
    if (theWindow.neatFramework.hasOwnProperty(moduleName) ){
      var nF_module_ver = theWindow.neatFramework[moduleName].module_version || '' ;
      //console.log("nF version: " + nF_module_ver);
      nF_module_ver !== '' ? console.log( '[ app_logic.js ] > '+moduleName+' module found: '+nF_module_ver) : console.log('[ app_logic.js ] > '+moduleName+' module is corrupted: version number not found !');
    } else console.log('[ app_logic.js ] > '+moduleName+' module not found !');
    
  };

  // a Fcn that checks if the modules are correctly loaded/present on the page (..)
  function _check_modules(){
    // ADD MODULES CHECKS BELOW
    _checkModule('Chrome_serial');
    _checkModule('Chrome_sockets');
    _checkModule('serial_console'); // check that the neatFramework "serial_console" module is present
    _checkModule('chrome_devtools'); // same as above
  }

  /* -- our Serial Module API callbacks -- */
  
  // define our callback functions
  var _onPopulateBauds     = function(){ console.log('IN-FILE:: (API-registered callback): baud rates populated !'); };
  var _onPopulateLineFeeds = function(){ console.log('IN-FILE:: (API-registered callback): line feeds populated !'); };
  var _onPopulatePorts     = function(){ console.log('IN-FILE:: (API-registered callback): ports populated !'); };
  var _onGetSerialDevices  = function(){ console.log('IN-FILE:: (API-registered callback): serial devices list gathered !'); };
  var _onSerialConnect     = function(){ 
    console.log('IN-FILE:: (API-registered callback): Serial device connected !'); 
    neatFramework.serial_console.consoleLogMessage(_serialConsole1, 'serialconnectedlog', 'Now connected to the Arduino on /dev/ttyACM0.');
  };
  var _onSerialDisConnect  = function(){ 
    console.log('IN-FILE:: (API-registered callback): Serial disconnected !'); 
    neatFramework.serial_console.consoleLogMessage(_serialConsole1, 'serialconnectedlog', 'Now disconnected from Arduino.');
  };
  var _onConnectionStatus  = function(){ console.log('IN-FILE:: (API-registered callback): Connection status gathered !'); };
  var _onSerialFlush       = function(){ console.log('IN-FILE:: (API-registered callback): Serial flushed !'); };
  var _onSerialWrite       = function(){ console.log('IN-FILE:: (API-registered callback): Serial written !'); };
  //var _onSerialReceive     = function(){ console.log('IN-FILE:: (API-registered callback): Serial data received !'); }; // original ( not accepting parameters )
  var _onSerialReceive     = function(messageReceivedStr){ 
    console.log('IN-FILE:: (API-registered callback): Serial data received > ' + messageReceivedStr + ' <' ); // log the data received in the javascript console
    neatFramework.serial_console.consoleReceive(_serialConsole1, messageReceivedStr); // Nb: we could also have used the alternative version of the function that do serial writing & takes a callback
  };

  // we "register" them to the module API callbacks in the "_initial_setup_app_init()" function
  
  /* ------------------------------------- */


  /* -- our Console Module API callbacks -- */
  
  // define our callback functions
  var _onConsoleClear      = function(){ console.log('IN-FILE:: (API-registered callback): Console cleared !'); };
  var _onConsoleConfigure  = function(){ console.log('IN-FILE:: (API-registered callback): Console configured !'); };
  var _onConsoleCreate     = function(){ console.log('IN-FILE:: (API-registered callback): Console created !'); };
  var _onConsoleReceive    = function(){ console.log('IN-FILE:: (API-registered callback): Console receive event !'); };
  var _onConsoleWrite      = function(){ console.log('IN-FILE:: (API-registered callback): Console write event !'); };

  // we "register" them to the module API callbacks in the "_initial_setup_app_init()" function

  /* ------------------------------------- */

  /* -- our Chrome sockets Module API callbacks -- */
  
  // define our callback functions
  var _onTCPSocketCreate                = function(){ console.log('IN-FILE:: (API-registered callback): TCP socket created !'); };
  var _onTCPSocketConnect               = function(){ console.log('IN-FILE:: (API-registered callback): TCP socket connected !'); };
  var _onTCPSocketGetConnectionStatus   = function(){ console.log('IN-FILE:: (API-registered callback): retrieved the TCP socket connection status & stuff !'); };
  var _onTCPSocketDisconnect            = function(){ console.log('IN-FILE:: (API-registered callback): TCP socket disconnected !'); };
  var _onTCPSocketReceive               = function(){ console.log('IN-FILE:: (API-registered callback): received from TCP socket !'); };
  var _onTCPSocketWrite                 = function(){ console.log('IN-FILE:: (API-registered callback): written to TCP socket !'); };

  // we "register" them to the module API callbacks in the "_initial_setup_app_init()" function

  /* ------------------------------------- */    
    
    

  /* -- our Overlays callbacks -- */
  
  // console overlay view
  var _onConsoleOverlayVisible = function(){ console.log('IN-FILE:: (Overlay callback): console overlay is now visible !'); };
  var _onConsoleOverlayHidden = function(){ console.log('IN-FILE:: (Overlay callback): console overlay is now hidden !'); };
  
  // config overlay wiew

  /* ------------------------------------- */


  /* -- our mini-test-app stuff -- */

  /* -- our App main variables -- */
  
  // serial connection settings
  var _portPicker = theDocument.getElementById('ports');
  var _baudPicker = theDocument.getElementById('baudrates');
  var _lineFeedPicker = theDocument.getElementById('linefeeds');
  var _serialToggle = theDocument.getElementById('serial-toggle'); // data-connectionstatus="close"
  //var _serialRefreshToggle = theDocument.getElementById('serial-refresh-toggle'); // allows not to reboot the app while connecting a device to a serial port after launching it


  // Arduino serial commands
  var _ArLEDtoggle = theDocument.getElementById('ArLED-toggle'); // data-arledstatus="off"
  var _ArLEDtoggle_serialConsoleTag = '<span class="arduino-led-toggle-serial-console-tag">(via Arduino LED toggle) </span>'; // displayed on serial console when Arduino LED toggle used to toggle LED

  // overlay serial console
  var _overlayConsole = theDocument.querySelector('.overlay'); // the console overlay view
  //var _overlayConsoleCloseBtn = _overlayConsole.querySelector('button.overlay-close');
  //var _overlayConsoleToggle = theDocument.querySelector('#trigger-overlay');
  //_overlayConsoleToggle = theDocument.getElementById('trigger-overlay');
  var _overlayConsoleCloseBtn = theDocument.getElementById('console-close');
  var _consoleToggle = theDocument.getElementById('console-toggle'); // the toggle that makes it visible

  // the debug serial console ( NOT overlayed :/ )
  var _serialConsole1 = theDocument.getElementById('serial-debugconsole');
  // the debug serial console clear button
  var _serialConsole1Clear = theDocument.getElementById('console-clear');
  // the debug serial console write button
  var _serialConsole1WriteBtn = theDocument.getElementById('console-write');
  // the debug serial console "serial text input box" ? :)
  var _serialConsole1InputBox = theDocument.getElementById('console-input');
  var _serialConsole1InputBox_serialConsoleTag = '<span class="serial-console-input-box-serial-console-tag">(via serial console 1 input box) </span>'; // displayed on serial console when a message is sent from the input box


  // vars of the test-implm serial-debugconsole ( aka just a <p> html element ;p )

  // fcns
  
  /* -- Bubbling Click Events Handler -- */
  // helper for links handling & some other events handling
  var _getEventTarget = function(e){ e = e || theWindow.event; return e.target || e.srcElement; };
  // handle clicks on links
  var _initClickEventsListener = function(){
    console.log("toggles click listeners init");
    theDocument.addEventListener('click', function(e){
      var target = _getEventTarget(e);
      if(target.tagName.toLowerCase() === 'a'){
        var ntfrmwrkLinkData = target.getAttribute('data-ntfrmwrkLink');
        if(ntfrmwrkLinkData == 'notweb'){ // not a link related to page loading or other web-related stuff
	  e.preventDefault();
	  // R: previously "tweakAccessControlOriginPolicy", then "Ajax.SwapContent", then "history.pushState", then "checkStandaloneSupport" & if in use, then "localStorage.setItem(pageStateURL)" ...
	  if(target.id == 'serial-toggle') _toggleSerial(); // connect/disconnect the serial port
	  else if(target.id == 'serial-refresh-toggle') _refreshSerialPortsList(); // refresh the list of the available serial ports
	  else if(target.id == 'ArLED-toggle') _toggleArduinoLED(); // toggle a LED connected on on-board pin 13 of an Arduino connected over serial
	  //else if( target.id == 'console-toggle' ) console.log("console toggled !");
	  else if( target.id == 'console-toggle' ) _toggleOverlayConsole(); // toggle the serial console displayed in an overlay view
	  else if(target.id == 'console-clear') neatFramework.serial_console.consoleClear(_serialConsole1); // clear the serial console 1
	  //else if( target.id == 'console-toggle' || target.id == 'console-close' ) _toggleOverlayConsole(); // toggle the serial console displayed in an overlay view
    else if(target.id == 'console-write') _writeToSerial(); // write the text contained in the serial input to the serial port with a function writing to the serial console as callback
	} else {
	  // do something else based on the value of the link's "data-ntfrmwrkLink" attribute 
	}
      } else if(target.tagName.toLowerCase() === 'button'){
         if( target.id == 'console-close' ) _toggleOverlayConsole(); // toggle the serial console displayed in an overlay view
      } else {
        // something other than a link or a button was "click-event bubbling" ;p
      }
      return false;
    });
  };
    
    
  var _initChangeEventsListener = function(){
    console.log("change listeners init");
    theDocument.addEventListener('change', function(e){
      var target = _getEventTarget(e);
      if(target.tagName.toLowerCase() === 'select'){
         //if( target.id == 'ports' ) neatFramework.serial_console.consoleUsingPort( _serialConsole1, _cleanedPort( _portPicker.options[_portPicker.selectedIndex].value ) ); // update the port that may be displayed in a corner
         if( target.id == 'ports' ) neatFramework.serial_console.consoleUsingPort( _serialConsole1, _portPicker.options[_portPicker.selectedIndex].value ); // update the port that may be displayed in a corner
         else if( target.id == 'baudrates' ) neatFramework.serial_console.consoleUsingBaudrate( _serialConsole1, _baudPicker.options[_baudPicker.selectedIndex].value ); // same for the baudrate 
         else if( target.id == 'linefeeds' ) neatFramework.serial_console.consoleUsingLinefeed( _serialConsole1, _cleanedLineFeed( _lineFeedPicker.options[_lineFeedPicker.selectedIndex].text ) ); // same for the linefeed
      } else {
        // something other than a <select> was "change-event bubbling" ;p
      }
      return false;
    });
  };
    
    
  // _cleanedLineFeed() - little fix consumed by the above function to have clean, uniform "unset" display when a parameter is missing/not set
  var _cleanedLineFeed = function(lineFeedStr){
      if( lineFeedStr == '-set linefeed-' ) return 'unset';
      else return lineFeedStr;
  };
    
  
  // _toggleSerial() - toggle the serial connection on & off
  var _toggleSerial = function(){
    var currConnStat = _serialToggle.getAttribute('data-connstatus');
    if( currConnStat == '' ){
      var selectedPort = _portPicker.options[_portPicker.selectedIndex].value;
      var selectedBaud = _baudPicker.options[_baudPicker.selectedIndex].value;
      // to add: lineEnding <select>
      
      // make sure that both selected port & baudrates are valid
      if( selectedPort != 'unset' && selectedBaud != 'unset' ){
        _serialToggle.setAttribute('data-connstatus', 'established');
        _serialToggle.innerText = 'toggle serial OFF';
        var connOpts = {bitrate: parseInt(selectedBaud)};
        neatFramework.Chrome_serial.connectSerialDevice( selectedPort, selectedBaud, connOpts, 'lineEnding' );
      } else {
        // inform the user it has to specify a valid port & baud rate prior to connectiong to a serial device
        console.log('Please set a valid port and a baud rate prior to connecting !'); // DEBUG / at least, prevent any error thrown when toggling ( .. )
      }

      // chrome.serial.connect(selectedPort, {bitrate: parseInt(selectedBaud)}, onConnect);
      // REPLACE THE ABOVE BY SOME OF THE MODULE STUFF ( .. )
      //console.log("Establishing connection to the serial.");

      //var connOpts = {bitrate: parseInt(selectedBaud)};
      //neatFramework.Chrome_serial.connectSerialDevice( selectedPort, selectedBaud, connOpts, 'lineEnding' );
    } else {
      _serialToggle.setAttribute('data-connstatus', '');
      _serialToggle.innerText = 'toggle serial ON';

      // chrome.serial.disconnect(connectionId, onDisconnect);
      // REPLACE THE ABOVE BY SOME OF THE MODULE STUFF ( .. )
      console.log("Disconnecting from the serial.");
      neatFramework.Chrome_serial.disconnectSerialDevice();
    }
  };


  // _refreshSerialPortsList() - refresh the serial ports list
  var _refreshSerialPortsList = function(){
    _portPicker.innerHTML = ""; // reset our listing ( aka the "<select>" content )
    var unsetOpt = theDocument.createElement('option');
    unsetOpt.innerText = 'not set';
    unsetOpt.value="unset";
    _portPicker.appendChild(unsetOpt); // append the default option
    neatFramework.Chrome_serial.populatePorts( _portPicker ); // append found serial ports
  };


  // toggleArduinoLED() - toggle a LED connected to the Arduino pin 13 ( ak, the onboard LED)
  var _toggleArduinoLED = function(){
    var currLEDStat = _ArLEDtoggle.getAttribute('data-ledstate');
    if( currLEDStat == '' ){
      _ArLEDtoggle.setAttribute('data-ledstate', 'HIGH');
      _ArLEDtoggle.innerText = 'toggle Arduino LED LOW';
      
      /*
      chrome.serial.send(connectionId, convertStringToArrayBuffer("1"), function(){ // to use if the serial protocol used is string-based
        console.log("Sent: 1");
      });
      */
      // REPLACE THE ABOVE BY SOME OF THE MODULE STUFF ( .. ) --> done ? ;D
      neatFramework.serial_console.consoleWrite(_serialConsole1, _ArLEDtoggle_serialConsoleTag + '1'); // write some log to the serial console ( after all, we're writing to it ;) )
      neatFramework.Chrome_serial.serialWriteAltCallback("1", _arduinoLEDtoggledHIGHcallback); // write "1" to the serial port
      //console.log("Toggling Arduino LED HIGH.");
    } else {
      _ArLEDtoggle.setAttribute('data-ledstate', '');
      _ArLEDtoggle.innerText = 'toggle Arduino LED HIGH';
      /*
      chrome.serial.send(connectionId, convertStringToArrayBuffer("1"), function(){ // to use if the serial protocol used is string-based
        console.log("Sent: 1");
      });
      */
      // REPLACE THE ABOVE BY SOME OF THE MODULE STUFF ( .. ) --> is isn't it done already ? ;P
      neatFramework.serial_console.consoleWrite(_serialConsole1, _ArLEDtoggle_serialConsoleTag + '0'); // write some log to the serial console ( after all, we're writing to it ;) )
      neatFramework.Chrome_serial.serialWriteAltCallback("0", _arduinoLEDtoggledLOWcallback);
      //console.log("Toggling Arduino LED LOW.");
    }
  };


  // above function callback on Arduino LED toggled HIGH
  var _arduinoLEDtoggledHIGHcallback = function(){
    console.log("Toggled Arduino LED HIGH.");
    // change some image/css class ...
  };


  // above-above ( :p !) function callback on Arduino LED toggled LOW
  var _arduinoLEDtoggledLOWcallback = function(){
    console.log("Toggled Arduino LED LOW.");
    // change some image/css class ...
  };

  
  // toggleOverlayConsole() - toggle the visibility of the serial console displayed in an overlay view
  var _toggleOverlayConsole = function(){
    console.log("toggle overlay console invoked !");
    if( _overlayConsole.getAttribute('data-overlay-status') == 'open' ){
      _overlayConsole.setAttribute('data-overlay-status', 'close');
      _overlayConsole.classList.remove('open');
      _overlayConsole.classList.add('close');
      _onConsoleOverlayHidden(); // trigger our callback ( only display a message fo the moment )
      // end of the transition here ( cross-browser if possible ( .. ) )
      /*
      if( _overlayConsole.getAttribute('data-overlay-out-delay') ){
        setTimeout(_overlayConsole.getAttribute('data-overlay-out-delay'), function(){ 
          // remove the close class / do other stuff ?
	}
	);
      }
      */
    } else if(  _overlayConsole.getAttribute('data-overlay-status') == 'close' ){
      _overlayConsole.setAttribute('data-overlay-status', 'open');
      _overlayConsole.classList.remove('close');
      _overlayConsole.classList.add('open');
      _onConsoleOverlayVisible(); // trigger our callback ( only display a message fo the moment )
    }
  };
  
  
  // writeToSerial() - use the nF serial console module to write to the serial console & the nF Chrome Serial module to write to the serial port connected
  // R: can be called from the funtion defined right below it or by a click on the button dedicated to writing to the serial console
  var _writeToSerial = function(){
    // get the text present in the input, check if not empty, & write it to the console ( R: linefeed param not yet taken in account ) & then to the serial console
    // ( not mandatory ) have a callback function passed to be called in addition to the set "onConsole..." callback
    // R: simple write: " neatFramework.Chrome_serial.serialWrite("0"); "
    //    write with callback: " neatFramework.Chrome_serial.serialWriteAltCallback("0", testFunc); "
    if( _serialConsole1InputBox.value != '' ){
      neatFramework.Chrome_serial.serialWriteAltCallback( _serialConsole1InputBox.value, function(){ // write to the serial port and pass a callback function that ..
        //neatFramework.serial_console.consoleWrite(_serialConsole1, _serialConsole1InputBox.value ); // .. writes to the serial console, ..
        neatFramework.serial_console.consoleWrite(_serialConsole1, _serialConsole1InputBox_serialConsoleTag + _serialConsole1InputBox.value); // same as aboe but with a dedicated tag   
        _serialConsole1InputBox.value = ''; // reset the serial input box value ( Nb: could be a possible parameter ( .. ) )
        _serialConsole1InputBox.placeholder = 'Serial written !'; // indicate that the message has been sent using the placeholder
      });
    } else console.log("Write something first, you silly ..idiiotta !");
  };


  // initSerialInput() - listen for "Enter" keyup events on the input dedicated to the serial input -> will invoke the above function internally ( as is the "write to console" button had been clicked ) 
  var _initSerialInput = function(){
    // init event listener that will call tha above function
    _serialConsole1InputBox.onkeypress = function(e){
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode == '13'){
        // Enter pressed
        console.log("ENter key pressed while serial input box focused: writing to serial ..");
        _writeToSerial(); // write the content of the status box to the serial ( R: as a string )
        return false;
      }
    }
  };

  /* ----------------------------- */



  /* ---- APP DEBUG UTILS ---- */
  // fake messages
  var _fakeMessages = function(){
    _fakeReceivedMessages();
    _fakeSentMessages();
  };

  // fake received messages
  var _fakeReceivedMessages = function(){
    var dummyCounter = 0;
    function dummyLoop(){
      neatFramework.serial_console.consoleReceive(_serialConsole1, "RECV-msg for the console !"); // log a "receive" message
      if( dummyCounter < 2 ){
        dummyCounter++;
        //theWindow.setTimeout(dummyLoop,1000);
        theWindow.setTimeout(dummyLoop, _increaseInt( _randomIntFromInterval( 1, 4 ) ) ); // randomized ;p
      }
    }
    theWindow.setTimeout(dummyLoop,3000);
  };
  // fake sent messages
  var _fakeSentMessages = function(){
    var dummyCounter = 0;
    function dummyLoop(){
      neatFramework.serial_console.consoleWrite(_serialConsole1, "SND-msg 2 for the console !"); // log another "write" message
      if( dummyCounter < 2 ){
        dummyCounter++;
        //theWindow.setTimeout(dummyLoop,1000);
        theWindow.setTimeout(dummyLoop, _increaseInt( _randomIntFromInterval( 1, 4 ) ) ); // randomized ;p
      }
    }
    theWindow.setTimeout(dummyLoop,3000);
  };
  // generate random numbers in a range
  var _randomIntFromInterval = function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  };
  var _increaseInt = function(int){
    return int*1000;
  };

  /* ------------------------- */
		
  // a Fcn that handles the 'initial setup', at App init (..)
  function _initial_setup_app_init(){
    console.log('[ app_logic.js ] : ' + 'configuring app ..');

    //initial setup config of our App
    // CONSUME FUNCTIONS & STUFF DEFINED IN THE FRAMEWORK MODULE FILES HERE
    
    // "register" our callback functions to the Chrome Serial module API / R: added stuff to prevent undefined functions calls ( not yet implemented )
    neatFramework.Chrome_serial.onPopulateBauds( _onPopulateBauds );
    neatFramework.Chrome_serial.onPopulateLineFeeds( _onPopulateLineFeeds );
    
    neatFramework.Chrome_serial.onPopulatePorts( _onPopulatePorts );

    neatFramework.Chrome_serial.onGetSerialDevices( _onGetSerialDevices );
    neatFramework.Chrome_serial.onSerialConnect( _onSerialConnect );
    neatFramework.Chrome_serial.onSerialDisconnect( _onSerialDisConnect );
    neatFramework.Chrome_serial.onConnectionStatus( _onConnectionStatus );
    neatFramework.Chrome_serial.onSerialFlush( _onSerialFlush );
    neatFramework.Chrome_serial.onSerialWrite( _onSerialWrite );
    neatFramework.Chrome_serial.onSerialReceive( _onSerialReceive );

    // "register" our callback functions to the Serial module API - Nb: if not set, 'll now just display a log informing that a callback function could have been invoked at a particular moment ( .. )
    neatFramework.serial_console.onConsoleClear( _onConsoleClear );
    neatFramework.serial_console.onConsoleCreate( _onConsoleCreate );
    neatFramework.serial_console.onConsoleConfigure( _onConsoleConfigure );
    neatFramework.serial_console.onConsoleReceive( _onConsoleReceive );
    neatFramework.serial_console.onConsoleWrite( _onConsoleWrite );

    // "register" our callback functions to the Chrome Sockets module API  - same as above
    neatFramework.Chrome_sockets.onTCPSocketCreate( _onTCPSocketCreate );
    neatFramework.Chrome_sockets.onTCPSocketConnect( _onTCPSocketConnect );
    neatFramework.Chrome_sockets.onTCPSocketGetConnectionStatus( _onTCPSocketGetConnectionStatus );
    neatFramework.Chrome_sockets.onTCPSocketDisconnect( _onTCPSocketDisconnect );
    neatFramework.Chrome_sockets.onTCPSocketWrite( _onTCPSocketWrite );
    neatFramework.Chrome_sockets.onTCPSocketReceive( _onTCPSocketReceive );
      
    // Chrome Serial Module inits
    neatFramework.Chrome_serial.serialReceive(); // initialize the Serial module event listeners handling data reception
    neatFramework.Chrome_serial.populateBauds( _baudPicker ); // populate the baud rates picker
    neatFramework.Chrome_serial.populateLineFeeds( _lineFeedPicker ); // populate the line feeds picker
    neatFramework.Chrome_serial.populatePorts( _portPicker ); // populate the the ports picker ( uses chrome API's "onGetDevices()" internally )

    /* // SERIAL CONSOLE MODULE TESTS // */
    // create a serial console ( not yet overlayed :/ )
    neatFramework.serial_console.consoleCreateDefault(_serialConsole1); // 'll init the <di> used as serial console
    //neatFramework.serial_console.consoleClear(_serialConsole1); // clear it ( make it fully empty & print a "cleared" message ) Nb: not necessary, but 'll be doable manually by btn press
    //_fakeMessages(); // fake messages ( debug ) in a randomized manner ( replaces the uncomented stuff right above )

      
    // WIP - WIP - WIP - WIP - WIP //
      
    // Chrome sockets module debug implementation
    neatFramework.Chrome_sockets.TCPSocketCreate();
    //neatFramework.Chrome_sockets.onTCPSocketConnect(); // used internally right after socket creation ( .. )
    neatFramework.Chrome_sockets.TCPSocketReceive();
    //neatFramework.Chrome_sockets.TCPSocketWrite('Hello Sockets World !'); // will throw an error if not yet connected
    //neatFramework.Chrome_sockets.TCPSocketGetConnectionStatus(); // will throw an error if not yet connected
      
    // WIP - WIP - WIP - WIP - WIP //

    // CONSUME FUNCTION & STUFF DEFINED IN THE CURRENT FILE HERE
    _initClickEventsListener(); // init the click handling on the serial & LED toggles
    _initChangeEventsListener(); // init the change handling on the <select>
    _initSerialInput(); // init the Enter key listening on the serial console input box
    // R: connecting & disconnecting to/from the serial device is done using a "link toggle", while sending very-simple-messages is currently handled with another "link-toggle"
    //    that's why there's no function related to writing or receiving to/from the serial here ( but it could have, like in Arduino & Processing code for example ;p ... maybe later ? ;D )
  }

  /* ************************************************************************************************************************************************ */
    
  // the module test variable
  var _module_version = '[ app_logic.js v0.1a ]';
		
  // framework scope
  var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
  theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
  // the App's init Fcn
  function _initApp(){
    console.log('[ app_logic.js ] : ' + 'initiating app ..'); // debug message > app is launching
    _check_modules(); // check if the necessary modules are present
    _initial_setup_app_init(); // actually init the app's 'initial setup' config/params (..)
  }
		
  // make available some fcns outside of the 'Self Executing Anonymous Function' of the 'app_logic' closure ..
  neatFramework.app_logic_version = _module_version; // attach it to 'theWindow' ( > wich is defined 'upon' window (..) )
  //neatFramework.app_logic_check_modules = _check_modules; // was nice to have for debug ;p
  //neatFramework.app_logic_initApp = _initApp; // same as above (..)



  /* ************************************************************************************************************************************************ */
  // actually init the App ..
  _initApp();
  /* ************************************************************************************************************************************************ */
		
})(window, document);
