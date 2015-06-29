(function(){
  var portPicker = document.getElementById('ports');
  var open = document.getElementById('open');
  //var openStatus = 'close'; // we start with the serial port unconnected
  var on = document.getElementById('on');
  var off = document.getElementById('off');

  // to change to dynamic
  var baudrate = 9600; // the default baudrate, hardcoded by now
  var recvBufferStr = ''; // the input buffer string, to receive data into
  var connStatus = ""; // 'll be used later to display the connection stauts'

  /*  -- code using old API --
  var buildPortPicker = function(){
    chrome.serial.getPorts(function(ports){
      ports.forEach(function(port){
        var option = document.createElement('option');
	option.value = option.innerText = port;
	portPicker.appendChild(option);
      });
    });
  };
  buildPortPicker();
  */

  var connectionId; // single connId by now

  // trying an alternative from the google chrome serial API
  // -- code handling the listing of the available ports and adding them as options to our port picker
  var onGetDevices = function(ports) {
    for (var i=0; i<ports.length; i++) {
      console.log(ports[i].path); // log the ports found on the javascript console
      
      // follow the rest of the tutorial
      var option = document.createElement('option');
      option.value = option.innerText = ports[i].path;
      portPicker.appendChild(option);
    }
  }
  chrome.serial.getDevices(onGetDevices);

  // -- code handling opening a serial port --
  open.onclick = function(){
    // check whether we are willing to open or close the serial connection
    var currConnStatus = this.getAttribute('data-connstatus');
    if( currConnStatus == "closed" ){
      this.setAttribute('data-connstatus', "open");
      this.innerText = "close the serial port";
      var selectedPort = portPicker.options[portPicker.selectedIndex].value;
      chrome.serial.connect(selectedPort, {bitrate: baudrate}, onConnect);
    } else {
      this.setAttribute('data-connstatus', "closed");
      this.innerText = "open the serial port";
      chrome.serial.disconnect(connectionId, onDisconnect);
    }
  };

  // -- callbacks of the above function --
  var onConnect = function(openInfo){
    connectionId = openInfo.connectionId; // serial port now connected, save the Id for later
    console.log("Connection ID: " + connectionId); // littl' log
    // now we can do whatever we want with the serial port
    getConnStatus(); // log the current serial connection status
    flushSerial(); // flush the serial to discard any previous data received on the port
  };
  var onDisconnect = function(result) {
    if (result) {
      console.log("Disconnected from the serial port");
    } else {
      console.log("Disconnect failed");
    }
  };

  // -- callback of the "onReceive" function --
  var onReceiveCallback = function(info) {
    if (info.connectionId == connectionId && info.data) { // nb: we could have more than 1 device
      var str = convertArrayBufferToString(info.data);
      if (str.charAt(str.length-1) === '\n') {
        recvBufferStr += str.substring(0, str.length-1);
        onLineReceived(recvBufferStr);
        recvBufferStr = '';
      } else {
        recvBufferStr += str;
      }
    }
  };
  chrome.serial.onReceive.addListener(onReceiveCallback);
  // -- callback of the above function --
  var onLineReceived = function(inputStr){
    console.log("Message received: " + inputStr);
  };

  // -- code handling writing "on" to the serial port --
  on.onclick = function(){
    //writeSerial("1"); I need a quick callback log
    chrome.serial.send(connectionId, convertStringToArrayBuffer("1"), function(){ // to use if the serial protocol used is string-based
      console.log("Sent: 1");
    });
  };

  // -- code handling writing "off" to the serial port --
  off.onclick = function(){
    //writeSerial("1"); I need a quick callback log
    chrome.serial.send(connectionId, convertStringToArrayBuffer("0"), function(){ // to use if the serial protocol used is string-based
      console.log("Sent: 0");
    });
  };

  // -- new Chrome serial API helper fcns --

  // get the connection status
  var getConnStatus = function(){
    chrome.serial.getInfo(connectionId, function(connInfos){
      connStatus = connInfos.connectionId;//connInfos.name; // need a name set during connection
      console.log("Connection status: " + connStatus);
    });
  }
  
  // flush the serial port
  var flushSerial = function(){
    chrome.serial.flush(connectionId, onFlush);
  }
  // callback of the above function
  var onFlush = function(){
    console.log("serial flushed !");
  }

  // write to the serial port using the default (here, empty) callback function
  var writeSerial=function(str) {
    chrome.serial.send(connectionId, convertStringToArrayBuffer(str), onSend);
  }
  // callback of the above function
  var onSend = function(){  
    console.log("serial written !");
  };
  
  // Convert array buffer to string
  function convertArrayBufferToString(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

  // Convert string to ArrayBuffer
  var convertStringToArrayBuffer=function(str) {
    var buf=new ArrayBuffer(str.length);
    var bufView=new Uint8Array(buf);
    for (var i=0; i<str.length; i++) {
      bufView[i]=str.charCodeAt(i);
    }
    return buf;
  }

})();
