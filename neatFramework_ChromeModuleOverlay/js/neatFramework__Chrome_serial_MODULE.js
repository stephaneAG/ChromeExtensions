/* 
*  neatFramework: Chrome serial Module
*
*  neatFramework__Chrome_serial_MODULE.js - A javascript module file holding a scoped/closured/contained implementation of the Chrome serial API ( above Chrome v33 )
*  
*  by StephaneAG - 2014
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
(function(theWindow, theDocument, theUndefined){
  var _undef; // an undefined var
  var _undefined = ''; // another "undefined" var
  // some 'closures' tests ..
  //console.log('[ neatFramework__Chrome_serial_MODULE.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
  //console.log('[ neatFramework__Chrome_serial_MODULE.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
  //console.log('[ neatFramework__Chrome_serial_MODULE.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
  
  /* ************************************************************************************************************************************************ */
  // our actual 'Module' code ..
  
  /*  ---- module API ----
  *
  *   The "app_logic.js" file ( or the "main.js" file if the app logic is handled in its own module ) has the following functions available:
  *   
  *   * The following can be used to "register" callback functions:
  *
  *   - onPopulateBauds()            --> 'll be called once the baud rates have populated an html "select" element as options
  *   - onPopulateLineFeeds()        --> 'll be called once the line feeds have populated an html "select" elemnt as options
  *   - onPopulatePorts()            --> 'll be called once the available serial ports ( actually, their pathes ) have populated an html "select" element as options
  *   - onGetSerialDevices()         --> 'll be called once a list of the available serial ports has been gathered
  *   - onSerialConnect()            --> 'll be called once a connection has been established with a serial device
  *   - onSerialDisconnect()         --> 'll be called once a serial connection with a device has been ended
  *   - onConnectionStatus()         --> 'll be called when the connection status is retrieved
  *   - onSerialFlush()              --> 'll be called once the serial connection has been flushed
  *   - onSerialWrite()              --> 'll be called after each time data is written to the serial
  *   - onSerialReceive()            --> 'll be called each time new data is "fully received" ( aka suffixed with  a "line feed" character ('\n') ) from the serial
  *
  *   
  *   * The following can be used to interact with the module ( and thus maybe trigger one of the above )
  *
  *   - setBaudRate()                --> 'll define the "selectedBaudRate" otherwise initialized to "_undef" ( "undefined" ) & set it to be used over the default
  *   - setPort()                    --> 'll define the "selectedPort" otherwise initialized to "_undef" ( "undefined" ) & set it to be used over the default ( being the harcoded one || the first one )
  *   - setConnection()              --> 'll define the "selectedConnectionParams otherwise initialized to "_undef" ( "undefined" )" & set it to be used over the default connection parameters
  *   - setLineEnding()              --> 'll define the "selectedLineEnding" otherwise initialized to "_undef" ( "undefined" ) & set it to be used over the default "line feed" ( '\n' )  character 
  *   
  *   - getSerialDevices()           --> 'll trigger the "onGetSerialDevices()" callback function if set externally
  *   - connectSerialDevice()        --> 'll trigger the "onSerialConnect()" callback function if set externally after connecting using the defaults||set port, baud rate, connection settings & line ending
  *   - disconnectSerialDevice()     --> 'll trigger the "onSerialDisconnect()" callback function if set externally after disconnectig from a previously connected serial device
  *   - getConnectionStatus()        --> 'll trigger the "onConnectionStatus()" callback function if set externally after retrieving the current state of a previously established serial connection
  *   - flushSerial()                --> 'll trigger the "onSerialFlush()" callback function if set externally after flushing the serial
  *   - serialWrite()                --> 'll trigger the "onSerialWrite()" callback function if set externally after writing to the serial
  *   - serialWriteAltCallback()     --> 'll trigger an external callback function passed as parameter after writing to the serial
  *   - serialReceive()              --> 'll trigger the "onSerialReceived()" function if set externally when a COMPLETE message has been received from the serial
  *   - serialReceiveUnbuff()        --> 'll trigger an external callback function passed as parameter after a COMPLETE message has been reeived from the serial
  *   - serialReceiveAltCallback()   --> 'll trigger an external callback function passed as parameter when receiving data from the serial
  */

  // first, we define the closure/scope of our module
  /* ---------- MODULE CLOSURE ---------- */
  var Chrome_serial_module = {}; // empty obj
  /* ------------------------------------ */

  /* -- module API functions -- */

  // helper
  //var _callbackIfDefined = function(callbackfunc){ callbackfunc =! _undef ? callbackfunc(); };
  var _callbackIfDefined = function(callbackfunc){ if(callbackfunc =! _undefined) callbackfunc(); }; // not currently used

  // - onPopulateBauds()
  var _onPopulateBauds_callbackfunc = _undefined; // initialized to "undefined", it may be set by an external file to further consuming the module API
  //var _onPopulateBauds_callback = function(){ _callbackIfDefined( _onPopulateBauds_callbackfunc ); }; // ADD: "if != _undef" .. / execute the callback function set from an external file
  var _onPopulateBauds_callback = function(){ _onPopulateBauds_callbackfunc(); };
  var onPopulateBauds = function(callbackfunc){ _onPopulateBauds_callbackfunc = callbackfunc; }; // CALLABLE FROM OUTSIDE

  // - onPopulateLineFeeds()
  var _onPopulateLineFeeds_callbackfunc = _undefined;
  var _onPopulateLineFeeds_callback = function(){ _onPopulateLineFeeds_callbackfunc() };
  var onPopulateLineFeeds = function(callbackfunc){ _onPopulateLineFeeds_callbackfunc = callbackfunc; };

  // - onPopulatePorts()
  var _onPopulatePorts_callbackfunc = _undefined;
  //var _onPopulatePorts_callback = function(){ _callbackIfDefined( _onPopulatePorts_callbackfunc ); };
  var _onPopulatePorts_callback = function(){ _onPopulatePorts_callbackfunc(); };
  var onPopulatePorts = function(callbackfunc){ _onPopulatePorts_callbackfunc = callbackfunc; }; // CALLABLE FROM OUTSIDE
  
  // - onGetSerialDevices()
  var _onGetSerialDevices_callbackfunc = _undefined;
  //var _onGetSerialDevices_callback = function(){ _callbackIfDefined( _onGetSerialDevices_callbackfunc ); }; // WITH "UNDEFINED TEST" -> doesn't work (yet & that way ;p )
  var _onGetSerialDevices_callback = function(){ _onGetSerialDevices_callbackfunc(); }; // WITHOUT ( WIP TESTING ) -> works
  var onGetSerialDevices = function(callbackfunc){ _onGetSerialDevices_callbackfunc = callbackfunc; }; // CALLABLE FROM OUTSIDE
  
  // - onSerialConnect()
  var _onSerialConnect_callbackfunc = _undefined;
  //var _onSerialConnect_callback = function(){ _callbackIfDefined( _onSerialConnect_callbackfunc ); };
  var _onSerialConnect_callback = function(){ _onSerialConnect_callbackfunc(); };
  var onSerialConnect = function(callbackfunc){ _onSerialConnect_callbackfunc = callbackfunc; }; // CALLABLE FROM OUTSIDE
  
  // - onSerialDisconnect()
  var _onSerialDisconnect_callbackfunc = _undefined;
  //var _onSerialDisconnect_callback = function(){ _callbackIfDefined( _onSerialDisconnect_callbackfunc ); };
  var _onSerialDisconnect_callback = function(){ _onSerialDisconnect_callbackfunc(); };
  var onSerialDisconnect = function(callbackfunc){ _onSerialDisconnect_callbackfunc = callbackfunc; }; // CALLABLE FROM OUTSIDE
  
  // - onConnectionStatus()
  var _onConnectionStatus_callbackfunc = _undefined;
  //var _onConnectionStatus_callback = function(){ _callbackIfDefined( _onConnectionStatus_callbackfunc ); };
  _onConnectionStatus_callback = function(){ _onConnectionStatus_callbackfunc(); };
  var onConnectionStatus = function(callbackfunc){ _onConnectionStatus_callbackfunc = callbackfunc; }; // CALLABLE FROM OUTSIDE
  
  // - onSerialFlush()
  var _onSerialFlush_callbackfunc = _undefined;
  //var _onSerialFlush_callback = function(){ _callbackIfDefined( _onSerialFlush_callbackfunc ); };
  _onSerialFlush_callback = function(){ _onSerialFlush_callbackfunc(); };
  var onSerialFlush = function(callbackfunc){ _onSerialFlush_callbackfunc = callbackfunc; }; // CALLABLE FROM OUTSIDE
  
  // - onSerialWrite()
  var _onSerialWrite_callbackfunc = _undefined;
  //var _onSerialWrite_callback = function(){ _callbackIfDefined( _onSerialWrite_callbackfunc ); };
  var _onSerialWrite_callback = function(){ _onSerialWrite_callbackfunc(); };
  var onSerialWrite = function(callbackfunc){ _onSerialWrite_callbackfunc = callbackfunc; }; // CALLABLE FROM OUTSIDE
  
  // - onSerialReceive()
  var _onSerialReceive_callbackfunc = _undefined;
  //var _onSerialReceive_callback = function(){ _callbackIfDefined( _onSerialReceive_callbackfunc ); };
  //var _onSerialReceive_callback = function(){ _onSerialReceive_callbackfunc(); }; // ORIGINAL // DEBUG: TRYING TO GET DATA FROM THE ARDUINO OUT OF THE CHROME SERIAL MODULE
  var _onSerialReceive_callback = function(messageReceivedStr){ _onSerialReceive_callbackfunc(messageReceivedStr); }; // WOOOOOOOOOOORKS ON FIIIIIRST TRYYYYYY !!!!! :D ( -> learn to draw ascii heart :) )
  var onSerialReceive = function(callbackfunc){ _onSerialReceive_callbackfunc = callbackfunc; }; // CALLABLE FROM OUTSIDE

  // - setBaudRate()
  var setBaudRate = function(baudRate){ _selectedBaudRate = baudRate; }; // CALLABLE FROM OUTSIDE
  // - setPort()
  var setPort = function(port){ _selectedPort = port; }; // CALLABLE FROM OUTSIDE
  // - setConnection()
  var setConnection = function(connectionParams){ _selectedConnectionParams = connectionParams; }; // CALLABLE FROM OUTSIDE
  // - setLineEnding()
  var setLineEnding = function(lineEnding){ _selectedLineEnding = lineEnding; }; // CALLABLE FROM OUTSIDE
  
  // - setSerialParameters()
  var _setSerialParameters = function(baudRate, port, connectionParams, lineEnding){
    setBaudRate(baudRate);
    setPort(port);
    setConnection(connectionParams);
    setLineEnding(lineEnding);
  };

  // - setPortPicker()
  var _setPortPicker = function(portPicker){ _passedPortPicker = portPicker; };

  /* -------------------------- */

  // fcn that ...
  var _helloWorld = function(){ console.log("Hello world !"); };
  var helloWorld2 = function(){ console.log("Hello world2 !"); };

  /* ****************************** MODULE ******************************* */
  
  // useful stuff
  var _baudRates = [300, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200 ]; // array of all possible baud rates
  var _lineFeeds = [' ', '\n', '\r', '\r\n' ]; // I'll see if it fits nicely to have an input inside a select's option (for both preset AND custom linefeed ;p )
  var _lineFeedsTxts = ['No line feed', 'New Line', 'Carriage Return', 'CR & LF' ];
  var _ports = []; // array that will be populated with the available ports on the machine
  var _recvBufferStr = ''; // the input buffer string, to receive data into
  var _connStatus = ""; // 'll be used later to display the connection status
  var _connectionId; // only single connections supported by now

  var _defaultPort = "/dev/ttyACM0"; // default serial port
  var _defaultBaudRate = 9600; // default baud rate
  var _defaultConnectionParams = {bitrate: parseInt(_defaultBaudRate)}; // default serial connection parameters
  var _defaultLineEnding = '\n'; // default line ending as the "line feed" character 

  var _selectedPort = _undef; // initialize to "undefined"
  var _selectedBaudRate = _undef; // same as above
  var _selectedConnectionParams = _undef; // same as above
  var _selectedLineEnding = _undef; // same as above

  var _passedPortPicker = _undef; // not yet used, but may be

  // populateBauds() - will populate options based on the above baud rates when passed a variable pointing to a "select" html element
  var populateBauds = function(baudPicker){
    console.log("Available baud rates:"); // DEBUG / log the available baud rates on the javascript console
    for(var i=0; i< _baudRates.length; i++){
      var option = theDocument.createElement('option');
      option.value = option.innerText = _baudRates[i];
      console.log(_baudRates[i]);
      baudPicker.appendChild(option);
    }
    _onPopulateBauds_callback(); // trigger an external callback function if it has been "registered"
  };


  // populateLineFeeds() - will populate options based on the above line feeds when passed a variable pointing to a "select" html element
  var populateLineFeeds = function(lineFeedPicker){
    for(var i=0; i< _lineFeeds.length; i++){
      console.log(_lineFeeds[i] + '  ->  ' + _lineFeedsTxts[i]);
      var option = theDocument.createElement('option');
      option.value = _lineFeeds[i];
      option.innerText = _lineFeedsTxts[i];
      lineFeedPicker.appendChild(option);
    }
    _onPopulateLineFeeds_callback(); // trigger an external callback function if it has been "registered"
  };


  // populatePorts() - will populate options based on the port present on the array populated by " _onGetDevices() " function
  var populatePorts = function(portPicker){
    //_getSerialDevices(); // get the serial ports available in our array & populate the portPicker
    console.log("Available ports:"); // DEBUG / log the available ports on the javascript console
    for(i=0; i < _ports.length; i++){
      var option = theDocument.createElement('option');
      option.value = option.innerText = _ports[i].path;
      console.log(_ports[i]);
      portPicker.appendChild(option);
    }
    _onPopulatePorts_callback(); // trigger an external callback function if it has been "registered"
  };


  /* WARN: the following is a mix between chrome stuff and serial logic stuff */
  // populateAvailablePorts() - replacement of the above function that includes it internally
  var populateAvailablePorts = function(portPicker){
    console.log("populateAvailablePorts:: invoked");
    _setPortPicker(portPicker);
    chrome.serial.getDevices(_onGetDevices);
    /*
    chrome.serial.getDevices(function(ports){
      _onGetSerialDevice_callback(); // trigger an external callback function if it has been "registered"
      console.log("Available ports:"); // DEBUG / log the available ports on the javascript console
      for(i=0; i < ports.length; i++){
        var option = theDocument.createElement('option');
	option.value = option.innerText = ports[i].path;
	console.log(ports[i]);
	portPicker.appendChild(option);
      }
      _onPopulatePorts_callback(); // trigger an external callback function if it has been "registered"
    });
    */
  };

  // this is also true for the following
  // connectSelectedSerialDevice
  var connectSelectedSerialDevice = function(port, baudRate, connectionParams, lineEnding){
    console.log("connectSelectedSerialDevice:: invoked !");
    //_setSerialParameters(baudRate, port, connectionParams, lineEnding);
    chrome.serial.connect(port, connectionParams, _onConnect);
  };

  // _convertArrayBufferToString() - as the name implies
  var _convertArrayBufferToString = function(buf){ return String.fromCharCode.apply( null, new Uint8Array(buf) ); };
  

  // _convertStringToArrayBuffer() - as the name implies
  var _convertStringToArrayBuffer = function(str){
    var buf=new ArrayBuffer(str.length);
    var bufView=new Uint8Array(buf);
    for(var i=0; i < str.length; i++){ bufView[i]=str.charCodeAt(i); }
    return buf;
  };



  /* ---- ChromeAPI-based functions ---- */

  var _getSerialDevices = function(){ chrome.serial.getDevices(_onGetDevices); }; // consume the Chrome API to get a list of the available ports passed to the "onGetDevices" callback function
  var getSerialDevices = function(){ 
    _getSerialDevices();
    //_onGetSerialDevices_callback(); // trigger an external callback function if it has been "registered" ( done at the end of each chrome's callback functions instead -> cleaner code :p )
  }; // CALLABLE FROM OUTSIDE

  var _connectSerialDevice = function( port, connectionParams, callback ){ chrome.serial.connect(_defaultPort, _defaultConnectionParams, _onConnect); }; // consume the Chrome API to connect to a serial device
  var connectSerialDevice = function(){ 
    _connectSerialDevice();
    //_onSerialConnect_callback(); // trigger an external callback function if it has been "registered"
  }; // CALLABLE FROM OUTSIDE

  var _disconnectSerialDevice = function(){ chrome.serial.disconnect(_connectionId, _onDisconnect); }; // consume the Chrome API to disconnect from a serial device
  var disconnectSerialDevice = function(){
    _disconnectSerialDevice(); 
    //_onSerialDisconnect_callback(); // trigger an external callback function if it has been "registered"
  }; // CALLABLE FROM OUTSIDE

  var _getConnectionStatus = function(){ chrome.serial.getInfo(_connectionId, _onConnStatus); }; // consume the Chrome API to get the current serial connection status
  var getConnectionStatus = function(){
    _getConnectionStatus();
    //_onConnectionStatus_callback(); // trigger an external callback function if it has been "registered"
  }; 

  var _flushSerial = function(){ chrome.serial.flush(_connectionId, _onFlush); }; // consume the Chrome API to flush the serial connection
  var flushSerial = function(){
    _flushSerial();
    //_onSerialFlush_callback(); // trigger an external callback function if it has been "registered"
  }; // CALLABLE FROM OUTSIDE

  var _serialWrite = function(str){ chrome.serial.send(_connectionId, _convertStringToArrayBuffer(str), _onSend); }; // consume the Chrome API to write something to the serial port
  var serialWrite = function(str){
    _serialWrite(str); 
    //_onSerialWrite_callback(); // trigger an external callback function if it has been "registered"
  }; // R: it's not passed a callback function directly but we can have "registered" to the "onSerialWrite" module API
  var _serialWriteAltCallback = function(str, callback){ chrome.serial.send(_connectionId, _convertStringToArrayBuffer(str), callback); }; // this time, we use the callback function passed "directly"
  var serialWriteAltCallback = function(str, callback){ _serialWriteAltCallback(str, callback); }; // CALLABLE FROM OUTSIDE

  var _serialReceive = function(){ chrome.serial.onReceive.addListener(_onReceiveCallback); }; // consume the Chrome API to be able to receive stuff from the serial port
  var serialReceive = function(){
    _serialReceive() 
    //_onSerialReceive_callback(); // trigger an external callback function if it has been "registered"
  }; // CALLABLE FROM OUTSIDE
  // R: the above callback is not directly calling an external function that may have "registered" the "onSerialReceive()" module API: it's called once a COMPLETE message has been received from the serial
  //    if we want the direct callback function, we have to use the following
  var _serialReceiveUnbuff = function(){ chrome.serial.onReceive.addListener(_onReceiveCallback); }; // TO ADD: in the "_onReceiveCallback()" fcn, a check for another "externally settable" callback function
  var serialReceiveUnbuff = function(){
    _serialReceiveUnbuff();
    //_onSerialReceiveUnbuff(); // TO WRITE / trigger an external callback function if it has been "registered"
  }; // CALLABLE FROM OUTSIDE

  // if more flexibility is needed, we can indeed even handle the parsing externally, somewhat a more "raw" processing ;p
  var _serialReceiveAltCallback = function(callback){ chrome.serial.onReceive.addListener(callback); }; // the most "direct" fashion possible while still encapsulating the Chrome API
  var serialReceiveAltCallback = function(callback){ _serialReceiveAltCallback(callback); }; // CALLABLE FROM OUTSIDE

  /* ----------------------------------- */

  

  /* --- ChromeAPI callback functions -- */

  // _onGetDevices() - callback of the " _getSerialDevices() " function
  var _onGetDevices = function(ports){
    console.log("IN-MODULE::_onGetDevices: invoked");
    for (var i=0; i<ports.length; i++){
      console.log(ports[i].path); // DEBUG / log the ports found on the javascript console
      //_ports[] = ports[i].path; // populate our array that holds the available ports on the machine
      //_ports.push(ports[i].path);

      
      // debugging simple ..
      console.log("Available ports:"); // DEBUG / log the available ports on the javascript console
      for(i=0; i < ports.length; i++){
        var option = theDocument.createElement('option');
        option.value = option.innerText = ports[i].path;
        console.log(ports[i]);
        //portPicker.appendChild(option);
	_passedPortPicker.appendChild(option);
      }
    }
    // shouldn't it do something more ? ;D
    // try "populatePort(_passedPortPicker)"( <-- to define ! ) if not working that way ( .. )
    _onGetSerialDevices_callback(); // trigger an external callback function if it has been "registered"
  }


  // _onConnect()
  var _onConnect = function(openInfo){
    
    // the following doesn't work and it should ?!
    _connectionId = openInfo.connectionId; // serial port now connected, save the Id for later
    console.log("Connection ID: " + _connectionId); // DEBUG / log the serial connection ID
    
    _onSerialConnect_callback(); // trigger an external callback function if it has been "registered"

    //_getConnStatus(); // NOT MANDATORY but NEAT FOR DEBUGGIN / log the current serial connection status
    //_flushSerial(); // NOT MANDATORY / flush the serial to discard any previous data received on the port
  };


  // _onDisconnect()
  var _onDisconnect = function(result){
    if(result){ console.log("Disconnected from the serial port"); } else { console.log("Disconnect failed"); }
    _onSerialDisconnect_callback(); // trigger an external callback function if it has been "registered"
  };


  // _onReceiveCallback() - callback of the "_onReceive()" function
  var _onReceiveCallback = function(info){
    console.log("_onReceiveCallback:: invoked !");
    if (info.connectionId == _connectionId && info.data) { // nb: we COULD have more than 1 device ( we'll see later .. )
      var str = _convertArrayBufferToString(info.data);
      if(str.charAt(str.length-1) === '\n'){ // FUTURE IMPLM: LET THE USER CHOOSE AN ALTERNATIVE LINE ENDING CHARACTER ( .. )
        _recvBufferStr += str.substring(0, str.length-1);
	    _onLineReceived(_recvBufferStr); // call our callback function with the "line" received from the serial
	    _recvBufferStr = ''; // reset the string buffer
      } else {
        _recvBufferStr += str; // now "line feed" character found, we keep adding to the string buffer
      }
    }
  };


  // _onLineReceived() - callback of the " _onReceiveCallback() " function
  var _onLineReceived = function(inputStr){
    console.log("Message received: " + inputStr);
    //_onSerialReceive_callback(); // trigger an external callback function if it has been "registered" // original ( when not yet ready to receive stuff from Arduino to the serial console :) )
    _onSerialReceive_callback(inputStr); // R: even if we passed a parameter to our external callback function, it is NOT MANDATORY that it cosumes it ( aka, accept a parameter itself ( .. ) )
  };


  // _onConnStatus() - callback of the " _getConnectionStatus() " function
  var _onConnStatus = function(connectionInfos){
    _connStatus = connInfos.connectionId; // "connInfos.name;" 'd have necessited a name to be set during connection ( .. )
    console.log("Connection status: " + _connStatus);
    _onConnectionStatus_callback(); // trigger an external callback function if it has been "registered"
  };


  // _onFlush() - callback of the " _flushSerial() " function
  var _onFlush = function(){ 
    console.log("serial flushed !");
    _onSerialFlush_callback(); // trigger an external callback function if it has been "registered"
  };


  // _onSend() - callback of the " _serialWrite() " function
  var _onSend = function(){
    console.log("serial written !");
    _onSerialWrite_callback(); // trigger an external callback function if it has been "registered"
  };


  /* ----------------------------------- */

  /* ********************************************************************* */

  // a Fcn that handles the 'initial setup', at App init (..)
  function _initial_setup_module_init(){
    //initial setup config of our module
  }

  /* ************************************************************************************************************************************************ */
    
  // the module test variable
  var _module_version = '[ neatFramework__Chrome_serial_MODULE.js v0.1a ]';
		
  // framework scope
  var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
  theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
  // the App's init Fcn
  function _initModule(){
    console.log('[ neatFramework__Chrome_serial_MODULE.js ] : ' + 'initiating module ..'); // debug message > app is launching
    _initial_setup_module_init(); // actually init the module's 'initial setup' config/params (..)
  }
		
  // make available some fcns outside of the 'Self Executing Anonymous Function' of the module closure ..
  Chrome_serial_module.module_version = _module_version; // attach it not directly to 'theWindow' ( > wich is defined 'upon' window (..) ), but instead to the module closure

  // "attach" our function not directly to the "neatFramework" object this time, but to the "closure"(/empty object) of the current module, called "callbackFunctions_module"
  Chrome_serial_module.helloWorld = _helloWorld; // note: the names of the function inside the file and the one "attached" ( callable from outside the current scope ) can be different ( .. )
  Chrome_serial_module.helloWorld2 = helloWorld2; // another test

  /* -- tiny API -- */
  
  Chrome_serial_module.onPopulateBauds = onPopulateBauds;
  Chrome_serial_module.onPopulateLineFeeds = onPopulateLineFeeds;
  Chrome_serial_module.onPopulatePorts = onPopulatePorts;
  Chrome_serial_module.onGetSerialDevices = onGetSerialDevices;
  Chrome_serial_module.onSerialConnect = onSerialConnect;
  Chrome_serial_module.onSerialDisconnect = onSerialDisconnect;
  Chrome_serial_module.onConnectionStatus = onConnectionStatus;
  Chrome_serial_module.onSerialFlush = onSerialFlush;
  Chrome_serial_module.onSerialWrite = onSerialWrite;
  Chrome_serial_module.onSerialReceive = onSerialReceive;
  
  Chrome_serial_module.setBaudRate = setBaudRate;
  Chrome_serial_module.setPort = setPort;
  Chrome_serial_module.setConnection = setConnection;
  Chrome_serial_module.setLineEnding = setLineEnding;

  Chrome_serial_module.setSerialParameters = _setSerialParameters;

  //Chrome_serial_module.setPortPicker = setPortPicker; // used internally, in a somewhat clever manner ;p

  Chrome_serial_module.populateBauds = populateBauds;
  Chrome_serial_module.populateLineFeeds = populateLineFeeds;
  //Chrome_serial_module.populatePorts = populatePorts; // deprecated, prefer it the below one ( that "getSerialDevices" internally )
  Chrome_serial_module.populatePorts = populateAvailablePorts;

  Chrome_serial_module.getSerialDevices = getSerialDevices; // will have its internals changed very soon
  //Chrome_serial_module.connectSerialDevice = connectSerialDevice; // deprecated, prefer it the below one ( that "serialConnect" internally )
  Chrome_serial_module.connectSerialDevice = connectSelectedSerialDevice;
  Chrome_serial_module.disconnectSerialDevice = disconnectSerialDevice;
  Chrome_serial_module.getConnectionStatus = getConnectionStatus;
  Chrome_serial_module.flushSerial = flushSerial;
  Chrome_serial_module.serialWrite = serialWrite;
  Chrome_serial_module.serialWriteAltCallback = serialWriteAltCallback;
  Chrome_serial_module.serialReceive = serialReceive;
  Chrome_serial_module.serialReceiveUnbuff = serialReceiveUnbuff;
  Chrome_serial_module.serialReceiveAltCallback = serialReceiveAltCallback;

  /* -------------- */

  neatFramework.Chrome_serial = Chrome_serial_module; // note: nearly the same as above, but "one parent level up", to add our module to the "neatFramework" object ;)  


  /* ************************************************************************************************************************************************ */
  // actually init the module ..
  _initModule();
  /* ************************************************************************************************************************************************ */
		
})(window, document);
