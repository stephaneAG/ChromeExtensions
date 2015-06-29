/* 
*  neatFramework: App logic
*
*  app_logic.js - A javascript module file holding the overall logic (..)
*  
*  by StephaneAG - 2013-2014
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
(function(theWindow, theDocument, theUndefined){
  var _undef; // an undefined var
  var _undefined = 'undefined'; // another "undefined" var
  // some 'closures' tests ..
  //console.log('[ app_logic.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
  //console.log('[ app_logic.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
  //console.log('[ app_logic.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
  
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
    _checkModule('serial_console'); // check that the neatFramework "serial_console" module is present
  }

  /* -- our Serial Module API callbacks -- */
  
  // define our callback functions
  var _onPopulateBauds     = function(){ console.log('IN-FILE:: (API-registered callback): baud rates populated !'); };
  var _onPopulateLineFeeds = function(){ console.log('IN-FILE:: (API-registered callback): line feeds populated !'); };
  var _onPopulatePorts     = function(){ console.log('IN-FILE:: (API-registered callback): ports populated !'); };
  var _onGetSerialDevices  = function(){ console.log('IN-FILE:: (API-registered callback): serial devices list gathered !'); };
  var _onSerialConnect     = function(){ console.log('IN-FILE:: (API-registered callback): Serial device connected !'); };
  var _onSerialDisConnect  = function(){ console.log('IN-FILE:: (API-registered callback): Serial disconnected !'); };
  var _onConnectionStatus  = function(){ console.log('IN-FILE:: (API-registered callback): Connection status gathered !'); };
  var _onSerialFlush       = function(){ console.log('IN-FILE:: (API-registered callback): Serial flushed !'); };
  var _onSerialWrite       = function(){ console.log('IN-FILE:: (API-registered callback): Serial written !'); };
  var _onSerialReceive     = function(){ console.log('IN-FILE:: (API-registered callback): Serial data received !'); };

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

  // overlay serial console
  var _overlayConsole = theDocument.querySelector('.overlay'); // the console overlay view
  //var _overlayConsoleCloseBtn = _overlayConsole.querySelector('button.overlay-close');
  //var _overlayConsoleToggle = theDocument.querySelector('#trigger-overlay');
  //_overlayConsoleToggle = theDocument.getElementById('trigger-overlay');
  var _overlayConsoleCloseBtn = theDocument.getElementById('console-close');
  var _consoleToggle = theDocument.getElementById('console-toggle'); // the toggle that makes it visible

  // the debug serial console ( NOT overlayed :/ )
  var _serialConsole1 = theDocument.getElementById('serial-debugconsole');
  // the debug serial console buttons & stuff
  var _serialConsole1Clear = theDocument.getElementById('console-clear');

  // vars of the test-implm serial-debugconsole ( aka just a <p> html element ;p )

  // fcns
  
  /* -- Bubbling Click Events Handler -- */
  // helper for links handling
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
      // REPLACE THE ABOVE BY SOME OF THE MODULE STUFF ( .. )
      console.log("Toggling Arduino LED HIGH.");
    } else {
      _ArLEDtoggle.setAttribute('data-ledstate', '');
      _ArLEDtoggle.innerText = 'toggle Arduino LED HIGH';
      /*
      chrome.serial.send(connectionId, convertStringToArrayBuffer("1"), function(){ // to use if the serial protocol used is string-based
        console.log("Sent: 1");
      });
      */
      // REPLACE THE ABOVE BY SOME OF THE MODULE STUFF ( .. )
      console.log("Toggling Arduino LED LOW.");
    }
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
      if( dummyCounter < 10 ){
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
      if( dummyCounter < 10 ){
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
    
    // "register" or callback functions to the Serial module API / R: added stuff to prevent undefined functions calls ( not yet implemented )
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

    // "register" or callback functions to the Serial module API - Nb: if not set, 'll now just display a log informing that a callback function could have been invoked at a particular moment ( .. )
    neatFramework.serial_console.onConsoleClear( _onConsoleClear );
    neatFramework.serial_console.onConsoleCreate( _onConsoleCreate );
    neatFramework.serial_console.onConsoleConfigure( _onConsoleConfigure );
    neatFramework.serial_console.onConsoleReceive( _onConsoleReceive );
    neatFramework.serial_console.onConsoleWrite( _onConsoleWrite );

    // initialize the Serial module event listeners handling data reception
    neatFramework.Chrome_serial.serialReceive();

    // populate the baud rates picker
    neatFramework.Chrome_serial.populateBauds( _baudPicker );

    // populate the line feeds picker
    neatFramework.Chrome_serial.populateLineFeeds( _lineFeedPicker ); 

    // populate the the ports picker ( uses chrome API's "onGetDevices()" internally )
    neatFramework.Chrome_serial.populatePorts( _portPicker ); // replaced by a function .. whose name changed INSIDE the module, but not on the outside of its scope ;p

    /* // SERIAL CONSOLE MODULE TESTS // */
    // create a serial console ( not yet overlayed :/ )
    neatFramework.serial_console.consoleCreateDefault(_serialConsole1); // 'll init the <di> used as serial console
    //neatFramework.serial_console.consoleClear(_serialConsole1); // clear it ( make it fully empty & print a "cleared" message ) Nb: not necessary, but 'll be doable manually by btn press
    neatFramework.serial_console.consoleWrite(_serialConsole1, "SND-msg for the console !"); // log a "write" message
    neatFramework.serial_console.consoleReceive(_serialConsole1, "RECV-msg for the console !"); // log a "receive" message
    neatFramework.serial_console.consoleWrite(_serialConsole1, "SND-msg 2 for the console !"); // log another "write" message
    
    /*
    theWindow.setTimeout(dummyLoop,3000);
    var dummyCounter = 0;
    function dummyLoop(){
      neatFramework.serial_console.consoleReceive(_serialConsole1, "RECV-msg for the console !"); // log a "receive" message
      neatFramework.serial_console.consoleWrite(_serialConsole1, "SND-msg 2 for the console !"); // log another "write" message
      if( dummyCounter < 10 ){
	      dummyCounter++;
        theWindow.setTimeout(dummyLoop,1000);
      }
    }
    */
    _fakeMessages(); // replaces the above fake messages ( debug ) in a randomized manner ( replaces the uncomented stuff right above )
  

    // CONSUME FUNCTION & STUFF DEFINED IN THE CURRENT FILE HERE
    _initClickEventsListener(); // init the click handling on the serial & LED toggles
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
