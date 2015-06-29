/* 
*  neatFramework: Chrome sockets Module
*
*  neatFramework__Chrome_sockets_MODULE.js - A javascript module file holding a scoped/closured/contained implementation of the Chrome TCP & UDP sockets API
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
  *   - onTCPSocketCreate()             --> 'll be called once a TCP socket has been created
  *   - onTCPSocketClose()              --> 'll be called once a TCP Socket has been closed
  *   - onTCPSocketConnect()            --> 'll be called once a connection has been established with a TCP socket
  *   - onTCPSocketDisconnect()         --> 'll be called once a TCP connection with a socket has been ended
  *   - onTCPSocketConnectionStatus()   --> 'll be called when the TCP socket connection status is retrieved
  *   - onTCPSocketPause()              --> 'll be called once the TCP socket connection has been paused/unpaused
  *   - onTCPSocketWrite()              --> 'll be called after each time data is written to the TCP socket
  *   - onTCPSocketReceive()            --> 'll be called each time new data is "fully received" ( aka suffixed with  a "line feed" character ('\n') ) from the TCP socket
  *
  *   - onUDPSocketConnect()            --> 'll be called once a connection has been established with a UDP socket
  *   - onUDPSocketDisconnect()         --> 'll be called once a UDP connection with a socket has been ended
  *   - onUDPSocketConnectionStatus()   --> 'll be called when the UDP socket connection status is retrieved
  *   - onUDPSocketPause()              --> 'll be called once the UDP socket connection has been paused/unpaused
  *   - onUDPSocketWrite()              --> 'll be called after each time data is written to the UDP socket
  *   - onUDPSocketReceive()            --> 'll be called each time new data is "fully received" ( aka suffixed with  a "line feed" character ('\n') ) from the UDP socket
  *
  *   
  *   * The following can be used to interact with the module ( and thus maybe trigger one of the above )
  *
  *   - connectTCPSocket()              --> 'll trigger the "onTCPSocketConnect()" callback function if set externally after connecting
  *   - disconnectTCPSocket()           --> 'll trigger the "onTCPSocketDisconnect()" callback function if set externally after disconnectig from a previously connected TCP socket
  *   - getTCPSocketConnectionStatus()  --> 'll trigger the "onTCPSocketConnectionStatus()" callback function if set externally after retrieving the current state of a previously established TCP socket connection
  *   - pauseTCPSocket()                --> 'll trigger the "onTCPSocketPause()" callback function if set externally after pausing the TCP socket
  *   - TCPSocketWrite()                --> 'll trigger the "onTCPSocketWrite()" callback function if set externally after writing to the TCP socket
  *   - TCPSocketWriteAltCallback()     --> 'll trigger an external callback function passed as parameter after writing to the TCP socket
  *   - TCPSocketReceive()              --> 'll trigger the "onTCPSocketReceived()" function if set externally when a COMPLETE message has been received from the TCP socket
  *   - TCPSocketReceiveUnbuff()        --> 'll trigger an external callback function passed as parameter after a COMPLETE message has been reeived from the TCP socket
  *   - TCPSocketReceiveAltCallback()   --> 'll trigger an external callback function passed as parameter when receiving data from the TCP socket
  *
  *   - connectUDPSocket()              --> 'll trigger the "onUDPSocketConnect()" callback function if set externally after connecting
  *   - disconnectUDPSocket()           --> 'll trigger the "onUDPSocketDisconnect()" callback function if set externally after disconnectig from a previously connected UDP socket
  *   - getUDPSocketConnectionStatus()  --> 'll trigger the "onUDPSocketConnectionStatus()" callback function if set externally after retrieving the current state of a previously established UDP socket connection
  *   - pauseUDPSocket()                --> 'll trigger the "onUDPSocketFlush()" callback function if set externally after pausing the UDP socket
  *   - UDPSocketWrite()                --> 'll trigger the "onUDPSocketWrite()" callback function if set externally after writing to the UDP socket
  *   - UDPSocketWriteAltCallback()     --> 'll trigger an external callback function passed as parameter after writing to the UDP socket
  *   - UDPSocketReceive()              --> 'll trigger the "onUDPSocketReceived()" function if set externally when a COMPLETE message has been received from the UDP socket
  *   - UDPSocketReceiveUnbuff()        --> 'll trigger an external callback function passed as parameter after a COMPLETE message has been reeived from the UDP socket
  *   - UDPSocketReceiveAltCallback()   --> 'll trigger an external callback function passed as parameter when receiving data from the UDP socket
  */

  // first, we define the closure/scope of our module
  /* ---------- MODULE CLOSURE ---------- */
  var Chrome_sockets_module = {}; // empty obj
  /* ------------------------------------ */

  /* -- module API functions -- */
  // helpr
  var _callbackIfDefined = function(callbackfunc){ ( callbackfunc || function(){ console.log('info: no external callback has been set for the function that was just invoked.') } )() };
  
  // - onSomething()
  //var _onSomething_callbackfunc = _undefined; // external callback
  //var _onSomething_callback = function(){ _callbackIfDefined( _onSomething_callbackfunc ) }; // invoke the external callback if defined
  //var onSomething = function(callbackfunc){ _onSomething_callbackfunc = callbackfunc; }; // invoked to set the external callback

  // -- TCP -- //
    
  // - onCreateTCPSocket
  var _onCreateTCPSocket_callbackfunc = _undefined; // external callback
  var _onCreateTCPSocket_callback = function(){ _callbackIfDefined( _onCreateTCPSocket_callbackfunc ) }; // invoke the external callback if defined
  var onCreateTCPSocket = function(callbackfunc){ _onCreateTCPSocket_callbackfunc = callbackfunc; }; // invoked to set the external callback

  // - onCloseTCPSocket
  var _onCloseTCPSocket_callbackfunc = _undefined; // external callback
  var _onCloseTCPSocket_callback = function(){ _callbackIfDefined( _onCloseTCPSocket_callbackfunc ) }; // invoke the external callback if defined
  var onCloseTCPSocket = function(callbackfunc){ _onCloseTCPSocket_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  // - onConnectTCPSocket
  var _onConnectTCPSocket_callbackfunc = _undefined; // external callback
  var _onConnectTCPSocket_callback = function(){ _callbackIfDefined( _onConnectTCPSocket_callbackfunc ) }; // invoke the external callback if defined
  var onConnectTCPSocket = function(callbackfunc){ _onConnectTCPSocket_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  // - onDisconnectTCPSocket
  var _onDisconnectTCPSocket_callbackfunc = _undefined; // external callback
  var _onDisconnectTCPSocket_callback = function(){ _callbackIfDefined( _onDisconnectTCPSocket_callbackfunc ) }; // invoke the external callback if defined
  var onDisconnectTCPSocket = function(callbackfunc){ _onDisconnectTCPSocket_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  // - onTCPSocketConnectionStatus
  var _onTCPSocketConnectionStatus_callbackfunc = _undefined; // external callback
  var _onTCPSocketConnectionStatus_callback = function(){ _callbackIfDefined( _onTCPSocketConnectionStatus_callbackfunc ) }; // invoke the external callback if defined
  var onTCPSocketConnectionStatus = function(callbackfunc){ _onTCPSocketConnectionStatus_callbackfunc = callbackfunc }; // invoked to set the external callback
    
  // - onTCPSocketPause
  var _onTCPSocketPause_callbackfunc = _undefined; // external callback
  var _onTCPSocketPause_callback = function(){ _callbackIfDefined( _onTCPSocketPause_callbackfunc ) }; // invoke the external callback if defined
  var onTCPSocketPause = function(callbackfunc){ _onTCPSocketPause_callbackfunc = callbackfunc; }; // invoked to set the external callback    
    
  // - onTCPSocketReceive
  var _onTCPSocketReceive_callbackfunc = _undefined; // external callback
  var _onTCPSocketReceive_callback = function(){ _callbackIfDefined( _onTCPSocketReceive_callbackfunc ) }; // invoke the external callback if defined
  var onTCPSocketReceive = function(callbackfunc){ _onTCPSocketReceive_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  // - onTCPSocketLineReceived
  var _onTCPSocketLineReceived_callbackfunc = _undefined; // external callback
  var _onTCPSocketLineReceived_callback = function(){ _callbackIfDefined( _onTCPSocketLineReceived_callbackfunc ) }; // invoke the external callback if defined
  var onTCPSocketLineReceived = function(callbackfunc){ _onTCPSocketLineReceived_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  // - onTCPSocketWrite
  var _onTCPSocketWrite_callbackfunc = _undefined; // external callback
  var _onTCPSocketWrite_callback = function(){ _callbackIfDefined( _onTCPSocketWrite_callbackfunc ) }; // invoke the external callback if defined
  var onTCPSocketWrite = function(callbackfunc){ _onTCPSocketWrite_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  
  // -- UDP -- //
    
  // - onCreateUDPSocket
  var _onCreateUDPSocket_callbackfunc = _undefined; // external callback
  var _onCreateUDPSocket_callback = function(){ _callbackIfDefined( _onCreateUDPSocket_callbackfunc ) }; // invoke the external callback if defined
  var onCreateUDPSocket = function(callbackfunc){ _onCreateUDPSocket_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  // - onBindUDPSocket
  var _onBindUDPSocket_callbackfunc = _undefined; // external callback
  var _onBindUDPSocket_callback = function(){ _callbackIfDefined( _onBindUDPSocket_callbackfunc ) }; // invoke the external callback if defined
  var onBindUDPSocket = function(callbackfunc){ _onBindUDPSocket_callbackfunc = callbackfunc; }; // invoked to set the external callback

  // - onUDPSocketWrite
  var _onUDPSocketWrite_callbackfunc = _undefined; // external callback
  var _onUDPSocketWrite_callback = function(){ _callbackIfDefined( _onUDPSocketWrite_callbackfunc ) }; // invoke the external callback if defined
  var onUDPSocketWrite = function(callbackfunc){ _onUDPSocketWrite_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  // - onUDPSocketReceive
  var _onUDPSocketReceive_callbackfunc = _undefined; // external callback
  var _onUDPSocketReceive_callback = function(){ _callbackIfDefined( _onUDPSocketReceive_callbackfunc ) }; // invoke the external callback if defined
  var onUDPSocketReceive = function(callbackfunc){ _onUDPSocketReceive_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
    
  // -- TCP server -- //
    
  // - onCreateTCPserverSocket
  var _onCreateTCPserverSocket_callbackfunc = _undefined; // external callback
  var _onCreateTCPserverSocket_callback = function(){ _callbackIfDefined( _onCreateTCPserverSocket_callbackfunc ) }; // invoke the external callback if defined
  var onCreateTCPserverSocket = function(callbackfunc){ _onCreateTCPserverSocket_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  // - onTCPserverListenAndAccept
  var _onTCPserverListenAndAccept_callbackfunc = _undefined; // external callback
  var _onTCPserverListenAndAccept_callback = function(){ _callbackIfDefined( _onTCPserverListenAndAccept_callbackfunc ) }; // invoke the external callback if defined
  var onTCPserverListenAndAccept = function(callbackfunc){ _onTCPserverListenAndAccept_callbackfunc = callbackfunc; }; // invoked to set the external callback
    
  /* -------------------------- */

  // fcn that ...
  var _helloWorld = function(){ console.log("Hello world !"); };
  var helloWorld2 = function(){ console.log("Hello world2 !"); };

  /* ****************************** MODULE ******************************* */
  
  // useful stuff
   // -- TCP -- //
   var _TCPIpAddr = '127.0.0.1'; // hardcoded IP address for localhost by now ;)
   var _TCPport = 2345; // hardcoded port by now
   var _TCPrecvBufferStr = ''; // the input buffer string, to receive data into
   var _TCPSocketConnStatus = {}; // an empty object that 'll later hold the infos on the TCP socket connection ( id, status, ,local & peer ip, local & peer port )
   var _TCPSocketPaused = false; // initiated UNpaused ( .. )
   var _TCPSocketConnectionId; // only single connections supported by now
   // -- UDP -- //
   var _UDPIpAddr = '127.0.0.1'; // hardcoded IP address for localhost by now ;)
   var _UDPport = 2346; // hardcoded port by now
   var _UDP_bindIpAddr = '0.0.0.0';
   var _UDP_bindPort = 0;
   var _UDPrecvBufferStr = ''; // the input buffer string, to receive data into
   var _UDPSocketConnStatus = {}; // an empty object that 'll later hold the infos on the TCP socket connection ( id, status, ,local & peer ip, local & peer port )
   var _UDPSocketPaused = false; // initiated UNpaused ( .. )
   var _UDPSocketConnectionId; // only single connections supported by now
   // -- TCP server -- //
   var _TCPserverSocketConnectionId;
   var _TCPserverSocket_listenIpAddr = '127.0.0.1';
   var _TCPserverSocket_listenPort = 2347;
    
  // fcns

  // standard Chrome API's helprs
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
  var _getChromeRuntimeLastErrorMessage = function(){ return chrome.runtime.lastError.message; }; // consumes the chrome API
  var getChromeRuntimeLastErrorMessage = function(){ _getChromeRuntimeLastErrorMessage() }; // callable from outside

  // -- TCP -- //
  var _createTCPSocket = function(){ chrome.sockets.tcp.create({}, _onCreateTCPSocket) }; // consumes the chrome API
  var createTCPSocket = function(){ _createTCPSocket() }; // callable from outside
    
  var _closeTCPSocket = function(){ chrome.sockets.tcp.close(_TCPSocketConnectionId, _onCloseTCPSocket) }; // consumes the chrome API
  var closeTCPSocket = function(){ _closeTCPSocket() }; // callable from outside
    
  var _connectTCPSocket = function(TCPSocketId, IpAddr, portN){ chrome.sockets.tcp.connect(TCPSocketId, IpAddr, portN, _onConnectTCPSocket) }; // consumes the chrome API
  var connectTCPSocket = function(){ _connectTCPSocket(_TCPSocketConnectionId, _TCPIpAddr, _TCPport) }; // callable from outside
    
  var _disconnectTCPSocket = function(){ chrome.sockets.tcp.disconnect(_TCPSocketConnectionId) }; // consumes the chrome API
  var disconnectTCPSocket = function(){ _disconnectTCPSocket() }; // callable from outside

  var _getTCPSocketConnectionStatus = function(){ chrome.sockets.tcp.getInfo(_TCPSocketConnectionId, _onTCPSocketConnStatus) }; // consumes the chrome API
  var getTCPSocketConnectionStatus = function(){ _getTCPSocketConnectionStatus() }; // callable from outside
    
  var _pauseTCPSocket = function(){ _TCPSocketPaused = !_TCPSocketPaused; chrome.sockets.tcp.setPaused(_TCPSocketConnectionId, _TCPSocketPaused, _onTCPSocketPause) }; // consumes the chrome API
  var pauseTCPSocket = function(){ _pauseTCPSocket() }; // callable from outside
    
  var _TCPSocketReceive = function(){ chrome.sockets.tcp.onReceive.addListener( _onTCPSocketReceiveCallback ); }; // consumes the chrome API
  var TCPSocketReceive = function(){ _TCPSocketReceive() }; // callable from outside  
  
  var _TCPSocketWrite = function(str){ chrome.sockets.tcp.send(_TCPSocketConnectionId, _convertStringToArrayBuffer(str), _onTCPSocketWrite) }; // consumes the chrome API
  var TCPSocketWrite = function(str){ _TCPSocketWrite(str) }; // callable from outside
    
    
  // -- UDP -- //
  var _createUDPSocket = function(){ chrome.sockets.udp.create({}, _onCreateUDPSocket) }; // consumes the chrome API
  var createUDPSocket = function(){ _createTCPSocket() }; // callable from outside
    
  var _bindUDPSocket = function(UDPSocketId, IpAddr, portN){ chrome.sockets.udp.bind(UDPSocketId, IpAddr, portN, _onBindUDPSocket) }; // consumes the chrome API
  var bindUDPSocket = function(){ _bindUDPSocket(_UDPSocketConnectionId, _UDP_bindIpAddr, _UDP_bindPort) }; // callable from outside
    
  var _UDPSocketWrite = function(str){ chrome.sockets.udp.send(_UDPSocketConnectionId, _convertStringToArrayBuffer(str), _UDPIpAddr, _UDPport, _onUDPSocketWrite) }; // consumes the chrome API
  var UDPSocketWrite = function(str){ _UDPSocketWrite(str) }; // callable from outside
    
  var _UDPSocketReceive = function(){ chrome.sockets.udp.onReceive.addListener( _onUDPSocketReceive ) }; // consumes the chrome API
  var UDPSocketReceive = function(){ _UDPSocketReceive() }; // callable from outside
    
  
  // -- TCP server -- //
  var _createTCPserverSocket = function(){ chrome.sockets.tcpServer.create({}, _onCreateTCPserverSocket) }; // consumes the chrome API
  var createTCPserverSocket = function(){ _createTCPserverSocket() }; // callable from outside
    
  var _TCPserverSocketListenAndAccept = function(){ chrome.sockets.tcp.listen(_TCPserverSocketConnectionId, _TCPserverSocket_listenIpAddr, _TCPserverSocket_listenPort, _onTCPserverListenAndAccept) }; // consumes the chrome API
  var TCPserverSocketListenAndAccept = function(){ _TCPserverSocketListenAndAccept() }; // callable from outside
    
  var _TCPserverAccept = function(){ chrome.sockets.tcpServer.onAccept.addListener( _onTCPserverAccept ) }; // consumes the chrome API
  var TCPserverAccept = function(){ _TCPserverAccept() }; // callable from outside
    
  var _TCPserverStopListening = function(){ chrome.sockets.tcpServer.onAccept.removeListener( _onTCPserverAccept ); chrome.sockets.tcpServer.disconnect( _TCPserverSocketConnectionId ) }; // consumes the chrome API
  var TCPserverStopListening = function(){ _TCPserverStopListening() }; // callable from outside
    
  /* ----------------------------------- */

  

  /* --- ChromeAPI callback functions -- */

  // _onSomething() - callback of the " _getSomething() " function
  //var _onSomething = function(stuff){
  //console.log("IN-MODULE::_onSomething: invoked");
  //_onSomething_callback(); // trigger an external callback function if it has been "registered"
  //}
  
  
  // _onCreateTCPSocket
  var _onCreateTCPSocket = function(createInfo){
    console.log("IN-MODULE::_onCreateTCPSocket: invoked");
    _TCPSocketConnectionId = createInfo.socketId;
    _connectTCPSocket(_TCPSocketConnectionId, _TCPIpAddr, _TCPport);
    _onCreateTCPSocket_callback(); // trigger an external callback function if it has been "registered"
  };
    
    
  // _onCreateUDPSocket
  var _onCreateUDPSocket = function(createInfo){
    console.log("IN-MODULE::_onCreateTUDSocket: invoked");
    _UDPSocketConnectionId = createInfo.socketId;
    //_connectTCPSocket(_TCPSocketConnectionId, _TCPIpAddr, _TCPport); // UDP socket --> no need to "connect", we directly send/receive stuff
    _onCreateUDPSocket_callback(); // trigger an external callback function if it has been "registered"
  };
    
    
  // _onCreateTCPserverSocket
  var _onCreateTCPserverSocket = function(createInfo){
    console.log("IN-MODULE::_onCreateTCPserverSocket: invoked");
    _TCPserverSocketConnectionId = createInfo.socketId;
    // we could have listened & accept connections from here ( done is another fcn, callable from outside )
    _onCreateTCPserverSocket_callback(); // trigger an external callback function if it has been "registered"
  };
    
    
  // _onTCPserverListenAndAccept
  var _onTCPserverListenAndAccept = function(socketId, resultCode){
    console.log("IN-MODULE::_onTCPserverListenAndAccept: invoked");
    if( resultCode < 0 ){
      console.log("IN-MODULE::_onTCPserverListenAndAccept: Error listening: " + _getChromeRuntimeLastErrorMessage);
      return;
    }
    _TCPserverSocketConnectionId = socketId;
    TCPserverAccept(); // could also be done manually / invoked from outside
    _onTCPserverListenAndAccept_callback(); // trigger an external callback function if it has been "registered"
  };
    
    
  // _onTCPserverAccept
  var _onTCPserverAccept = function(acceptInfo){
    console.log("IN-MODULE::_onTCPserverAccept: invoked");
    if( acceptInfo.socketId == _TCPserverSocketConnectionId ){
      // a new connection has been established
      // - stuff below consumes the chrome API -> to move elsewhere ! - //
      chrome.sockets.tcp.send(acceptInfo.clientSocketId, someData, function(resultCode){
        console.log("IN-MODULE::_onTCPserverAccept: Data sent to new TCP client connection.") 
      });
      // - the above consumes the chrome API -> to move elsewhere ! - //
      // start receiving data
      chrome.sockets.tcp.onReceive(acceptInfo.clientSocketId, onReceive);
      chrome.sockets.tcpsetPaused(false);
    }
    _onTCPserverAccept_callback(); // trigger an external callback function if it has been "registered"
  };
    
    
  // _onCloseTCPSocket
  var _onCloseTCPSocket = function(){
    console.log("IN-MODULE::_onCloseTCPSocket: invoked");
    _onCloseTCPSocket_callback(); // trigger an external callback function if it has been "registered"
  };
  
    
  // _onConnectTCPSocket()
  var _onConnectTCPSocket = function(){
    console.log("IN-MODULE::_onConnectTCPSocket: invoked");
    // connected to the TCP socket ! :D
    _onConnectTCPSocket_callback(); // trigger an external callback function if it has been "registered"
    // DEBUG: print something to the TCP socket
    TCPSocketWrite('Hello TCP Sockets World ! \n');
  };
    
    
  // _onBindUDPSocket    
  var _onBindUDPSocket = function(result){
    console.log("IN-MODULE::_onBindUDPSocket: invoked");
    if( result < 0 ){
      console.log("IN-MODULE::_onBindUDPSocket: Error binding UDP socket.");
      return;
    }
    // connected to the TCP socket ! :D
    _onBindUDPSocket_callback(); // trigger an external callback function if it has been "registered"
    // DEBUG: print something to the TCP socket
    UDPSocketWrite('Hello UDP Sockets World ! \n');
  };

  // _onDisconnectTCPSocket()
  var _onDisconnectTCPSocket = function(){
    // disconnect from the TCP socket
    _onDisconnectTCPSocket_callback(); // trigger an external callback function if it has been "registered"
  };
    
    
  // _onTCPSocketConnStatus()
  var _onTCPSocketConnStatus = function(TCPSocketInfo){
    _TCPSocketConnStatus = {
      'id'          : TCPSocketInfo.socketId, // int
      'name'        : TCPSocketInfo.name, // string - optional
      'buffersize'  : TCPSocketInfo.bufferSize, // int - optional
      'connected'   : TCPSocketInfo.connected, // bool
      'paused'      : TCPSocketInfo.paused, // bool
      'persistent'  : TCPSocketInfo.persistent, // bool
      'localaddr'   : TCPSocketInfo.localAddress, // string - optional
      'localport'   : TCPSocketInfo.localPort, // int - optional
      'peeraddr'    : TCPSocketInfo.peerAddress, // string - optional
      'peerport'    : TCPSocketInfo.peerPort // int
    };
    console.log(_TCPSocketConnStatus);
    _onTCPSocketConnectionStatus_callback();
  };
    
    
  // _onTCPSocketPause()
  var _onTCPSocketPause = function(){
    console.log("_onTCPSocketPause:: invoked !");
    _onTCPSocketPause_callback(); // trigger an external callback function if it has been "registered"
  };
    
    
  // _onTCPSocketReceiveCallback()
  var _onTCPSocketReceiveCallback = function(info){
    console.log("_onTCPSocketReceiveCallback:: invoked !");
    if (info.socketId == _TCPSocketConnectionId && info.data) { 
      var str = _convertArrayBufferToString(info.data);
      if(str.charAt(str.length-1) === '\n'){ // FUTURE IMPLM: LET THE USER CHOOSE AN ALTERNATIVE LINE ENDING CHARACTER ( .. )
        _TCPrecvBufferStr += str.substring(0, str.length-1);
	    _onTCPSocketLineReceived(_TCPrecvBufferStr); // call our callback function with the "line" received from the serial
	    _TCPrecvBufferStr = ''; // reset the string buffer
      } else {
        _TCPrecvBufferStr += str; // now "line feed" character found, we keep adding to the string buffer
      }
    }
  };
    
    
  // _onLineReceived() - callback of the " _onTCPSocketReceiveCallback() " function
  var _onTCPSocketLineReceived = function(inputStr){
    console.log("TCP socket Message received: " + inputStr);
    //_onSerialReceive_callback(); // trigger an external callback function if it has been "registered" // original ( when not yet ready to receive stuff from Arduino to the serial console :) )
    _onTCPSocketReceive_callback(inputStr); // R: even if we passed a parameter to our external callback function, it is NOT MANDATORY that it cosumes it ( aka, accept a parameter itself ( .. ) )
    // DEBUG: write 'ack' ( acknowledge, if I remember correctly .. )
    _TCPSocketWrite('ACK::message written: ' + inputStr + '\n'); // this will be printed on the server side ( .. )
    // DEBUG: print the connection status in the javascript console
    _getTCPSocketConnectionStatus();
  };
    
    
  // _onTCPSocketWrite()
  var _onTCPSocketWrite = function(){
    console.log("TCP socket written !");
    _onTCPSocketWrite_callback(); // trigger an external callback function if it has been "registered"
  };
    
    
  // _onUDPSocketWrite()
  var _onUDPSocketWrite = function(writeInfo){
    console.log("UDP socket written ! -> bytes sent: " + writeInfo.bytesSent);
    _onUDPSocketWrite_callback(); // trigger an external callback function if it has been "registered"
  };
    

  /* ----------------------------------- */

  /* ********************************************************************* */

  // a Fcn that handles the 'initial setup', at App init (..)
  function _initial_setup_module_init(){
    //initial setup config of our module
  }

  /* ************************************************************************************************************************************************ */
    
  // the module test variable
  var _module_version = '[ neatFramework__Chrome_sockets_MODULE.js v0.1a ]';
		
  // framework scope
  var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
  theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
  // the App's init Fcn
  function _initModule(){
    console.log('[ neatFramework__Chrome_sockets_MODULE.js ] : ' + 'initiating module ..'); // debug message > app is launching
    _initial_setup_module_init(); // actually init the module's 'initial setup' config/params (..)
  }
		
  // make available some fcns outside of the 'Self Executing Anonymous Function' of the module closure ..
  Chrome_sockets_module.module_version = _module_version; // attach it not directly to 'theWindow' ( > wich is defined 'upon' window (..) ), but instead to the module closure

  // "attach" our function not directly to the "neatFramework" object this time, but to the "closure"(/empty object) of the current module, called "callbackFunctions_module"
  Chrome_sockets_module.helloWorld = _helloWorld; // note: the names of the function inside the file and the one "attached" ( callable from outside the current scope ) can be different ( .. )
  Chrome_sockets_module.helloWorld2 = helloWorld2; // another test

  /* -- tiny API --     */
  
  // "callback registers"
  // -- TCP -- //
  Chrome_sockets_module.onTCPSocketCreate = onCreateTCPSocket;
  Chrome_sockets_module.onTCPSocketClose = onCloseTCPSocket;
  Chrome_sockets_module.onTCPSocketConnect = onConnectTCPSocket;
  Chrome_sockets_module.onTCPSocketGetConnectionStatus = onTCPSocketConnectionStatus;
  Chrome_sockets_module.onTCPSocketDisconnect = onDisconnectTCPSocket;
  Chrome_sockets_module.onTCPSocketReceive = onTCPSocketReceive;
  Chrome_sockets_module.onTCPSocketLineReceived = onTCPSocketLineReceived;
  Chrome_sockets_module.onTCPSocketWrite = onTCPSocketWrite;
  // -- UDP -- //
  Chrome_sockets_module.onUDPSocketCreate = onCreateUDPSocket;
  Chrome_sockets_module.onUDPSocketBind = onBindUDPSocket;
  Chrome_sockets_module.onUDPSocketReceive = onUDPSocketReceive;
  Chrome_sockets_module.onUDPSocketWrite = onUDPSocketWrite;
    
  // API functions
  // -- TCP -- //
  Chrome_sockets_module.TCPSocketCreate = createTCPSocket;
  Chrome_sockets_module.TCPSocketClose = closeTCPSocket;
  Chrome_sockets_module.TCPSocketConnect = connectTCPSocket;
  Chrome_sockets_module.TCPSocketGetConnectionStatus = getTCPSocketConnectionStatus;
  Chrome_sockets_module.TCPSocketDisconnect = disconnectTCPSocket;
  Chrome_sockets_module.TCPSocketWrite = TCPSocketWrite;
  Chrome_sockets_module.TCPSocketReceive = TCPSocketReceive;
  // -- UDP -- //
  Chrome_sockets_module.UDPSocketCreate = createUDPSocket;
  Chrome_sockets_module.UDPSocketBind = bindUDPSocket;
  Chrome_sockets_module.UDPSocketWrite = UDPSocketWrite;
  Chrome_sockets_module.UDPSocketReceive = UDPSocketReceive;
    
  /* -------------- */

  neatFramework.Chrome_sockets = Chrome_sockets_module; // note: nearly the same as above, but "one parent level up", to add our module to the "neatFramework" object ;)  

  /* ************************************************************************************************************************************************ */
  // actually init the module ..
  _initModule();
  /* ************************************************************************************************************************************************ */
		
})(window, document);
