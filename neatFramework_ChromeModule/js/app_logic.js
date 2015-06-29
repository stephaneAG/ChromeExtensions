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
  
  // a Fcn that checks if the modules are correctly loaded/present on the page (..)
  function _check_modules(){
    // check the 'views_module' version
    //if (typeof(theWindow.neatFramework.Chrome.serial_module_version) != 'undefined' && theWindow.neatFramework.Chrome.serial_module_version != null){ // it exists.
    if( typeof(theWindow.neatFramework.Chrome_serial) != _undefined ){ // seems that it has been loaded from within the html page
      console.log( '[ app_logic.js ] > Chrome serial module found !');
      if( typeof(theWindow.neatFramework.Chrome_serial.module_version) != _undefined){ // if different that "undefined"
        if( theWindow.neatFramework.Chrome_serial.module_version != null){ // it exists.
          console.log( '[ app_logic.js ] > Chrome serial module found : ' + theWindow.neatFramework.Chrome_serial.module_version );
        } else {
          console.log( '[ app_logic.js ] > Chrome serial module corrupted: !=undefined but missing version number.' );
        }
      } else {
        console.log( '[ app_logic.js ] > Chrome serial module corrupted: undefined version number.' );
      }
    } else {
      console.log( '[ app_logic.js ] > Chrome serial module not found !');
    }

    // ADD OTHER MODULES CHECKS HERE
  }

  /* -- our Serial Module API callbacks -- */
  
  // define our callback functions
  var _onPopulateBauds = function(){ console.log('IN-FILE:: (API-registered callback): baud rates populated !'); };
  var _onPopulateLineFeeds = function(){ console.log('IN-FILE:: (API-registered callback): line feeds populated !'); };
  var _onPopulatePorts = function(){ console.log('IN-FILE:: (API-registered callback): ports populated !'); };
  var _onGetSerialDevices = function(){ console.log('IN-FILE:: (API-registered callback): serial devices list gathered !'); };
  var _onSerialConnect = function(){ console.log('IN-FILE:: (API-registered callback): Serial device connected !'); };
  var _onSerialDisConnect = function(){ console.log('IN-FILE:: (API-registered callback): Serial disconnected !'); };
  var _onConnectionStatus  = function(){ console.log('IN-FILE:: (API-registered callback): Connection status gathered !'); };
  var _onSerialFlush  = function(){ console.log('IN-FILE:: (API-registered callback): Serial flushed !'); };
  var _onSerialWrite  = function(){ console.log('IN-FILE:: (API-registered callback): Serial written !'); };
  var _onSerialReceive  = function(){ console.log('IN-FILE:: (API-registered callback): Serial data received !'); };

  // we "register" them to the module API callbacks in the "_initial_setup_app_init()" function
  
  /* ------------------------------------- */

  /* -- our mini-test-app stuff -- */

  // vars
  var _portPicker = theDocument.getElementById('ports');
  var _baudPicker = theDocument.getElementById('baudrates');
  var _lineFeedPicker = theDocument.getElementById('linefeeds');
  var _serialToggle = theDocument.getElementById('serial-toggle'); // data-connectionstatus="close"
  var _ArLEDtoggle = theDocument.getElementById('ArLED-toggle'); // data-arledstatus="off"
  
  // vars of the test-implm serial-debugconsole ( aka just a <p> html element ;p )

  // fcns
  
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
	  if(target.id == 'serial-toggle') _toggleSerial();
	  else if(target.id == 'serial-refresh-toggle') _refreshSerialPortsList(); // refresh the list of the available serial ports
	  else if(target.id == 'ArLED-toggle') _toggleArduinoLED();
	} else {
	  // do something else based on the value of the link's "data-ntfrmwrkLink" attribute 
	}
      } else {
        // something other than a link was "click-event bubbling" ;p
      }
      return false;
    });
  };

  // _toggleSerial() - toggle the serial connection on & off
  var _toggleSerial = function(){
    var currConnStat = _serialToggle.getAttribute('data-connstatus');
    if( currConnStat == '' ){
      var selectedPort = _portPicker.options[_portPicker.selectedIndex].value;
      var selectedBaud = _baudPicker.options[_baudPicker.selectedIndex].value; // to add: if =='not set', then cancel ( .. )
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


  /* ----------------------------- */
		
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
    
    //neatFramework.Chrome_serial.helloWorld(); // silly test

    // initialize the Serial module event listeners handling data reception
    neatFramework.Chrome_serial.serialReceive();

    // populate the baud rates picker
    neatFramework.Chrome_serial.populateBauds( _baudPicker );

    // populate the line feeds picker
    neatFramework.Chrome_serial.populateLineFeeds( _lineFeedPicker ); 

    // populate the the ports picker ( uses chrome API's "onGetDevices()" internally )
    neatFramework.Chrome_serial.populatePorts( _portPicker ); // replaced by a function .. whose name changed INSIDE the module, but not on the outside of its scope ;p

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
