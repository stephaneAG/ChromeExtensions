/* 
  Talks! remote - NodeJS version
  stephaneAG - 2014
*/

/* to be able to interact with xdotool */
var exec = require('child_process').exec;
/* to be able to parse url stuff */
var url = require('url');
/* to be able to serve static files -> R: not the most-most effiscient design/way, but 'll suffice for a little POC :D (..)*/
var fs = require('fs');

var http = require('http');
http.createServer(function (req, res) {
  //handleURL(req, res);
  console.log('received a conn ..');

  var pathnameObject = url.parse(req.url, true).pathname; // aka <host>/this/is/the/path/name
  console.log(pathnameObject);
  var queryObject = url.parse(req.url, true).query; // aka <host><pathname>?<query -> maybe stg like blop=lolo&blip=lala>
  console.log(queryObject);

  // split the pathname & act accordingly
  var pathArr = pathnameObject.split('/'); // aka ['this', 'is', 'the', 'path', 'name']
  console.log('path array: ' + pathArr);
  if (pathArr[1] == 'Talks'){ // ok, it's about the talks ..
    console.log('TALKS !!!');
    if (pathArr[2] == 'Slides'){ // ok, we're requested to server a talk slides, but wich one ?
      console.log('Slides !!!');
      if (pathArr[3] == 'Moldr'){ // ok, we're interested in the 'Moldr' project for AirLiquide_iLab
        fs.readFile('../main.html', function(error, content) { // display the Chrome Packaged App main // does not work yet
	//fs.readFile('Moldr.html', function(error, content) { // works ! :D
          if (error) {
	    res.writeHead(500);
	    res.end();
	  } else {
	    res.writeHead(200, { 'Content-Type': 'text/html' });
	    res.end(content, 'utf-8');
	  }
	});
      } else {
        console.log(pathArr[0] + '/' + pathArr[1] + '/' + pathArr[2] + '/...' + ' does not exist.');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Are you lost ?\n');
      }
    } else if (pathArr[2] == 'Remote'){ // ok, we're requested to serve the page(s) hosting the Talks! remote(s)
      console.log('Remote !!!');
      var remoteButton = pathArr[3];
      switch(remoteButton){
        case 'Up':
          // get Talks! WinId
          handleRemoteButton('Up');
          break;
        case 'Down':
          handleRemoteButton('Down');
          // xdotool focus
          // xdotool key wodn
          break;
        case 'Left':
          handleRemoteButton('Left');
          // xdotool focus
          // xdotool key left
          break;
        case 'Right':
          handleRemoteButton('Right');
          // xdotool focus
          // xdotool key right
          break;
        case 'PlayPause':
          handleRemoteButton('c'); // hackety trick ^^ ( -> allows focusing back to the window after a 'restore()' from fullscreen on Ubuntu :D !)
          //refocusApp('Talks!'); // added just in case we eventually switch between using the computer keyboard & a remote app on a tablet during a Talk ( prevent losing app focus after fullscreen ) 
          refocusWin();
          // xdotool focus
          // xdotool key c (toggle fullscreen on/off)
          // xdotool focus ! IMPORTANT -> bug on, at least, Ubuntu, after a 'restore()' from the fullscreen

          break;
        case 'Menu':
          handleRemoteButton('b');
          // xdotool focus
          // xdotool key b (dim screen brightness)
          break;
        default:
          // unsupported command
          //res.writeHead(200, {'Content-Type': 'text/plain'});
          //res.end('Sorry, unsupported remote command for Talks!\n');
          
          // unsupported ? display the remote ;D
          fs.readFile('./Remote.html', function(error, content) {
	    if (error) {
	      res.writeHead(500);
	      res.end();
	    } else {
	      res.writeHead(200, { 'Content-Type': 'text/html' });
	      res.end(content, 'utf-8');
	    }
	  });         
 
          break;
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Talks! => Remote "'+remoteButton+'" executed :D !\n');
    } else {
      // unsupported path
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Sorry, unsupported path\n');
    }
  } else {  
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }
//}).listen(8337, '127.0.0.1'); // localhost only
}).listen(8337, '0.0.0.0'); // available on LAN ( iPad, iPhone, .. )

console.log('Server running at http://127.0.0.1:8337/');

/* -- // Hlpr Fcns // -- */

// handles "remote controls binding" using xdotool
var handleRemoteButton = function(button){
  exec('xdotool search --onlyvisible --name Talks!', function(error, stdout){
    var winId = stdout.trim(); // get the Talks! winId
    console.log('Talks! Window ID: ' + winId );
    // xdotool focus & key <button>
    //exec('xdotool windowfocus ' + winId + '; xdotool key '+button); // remote button :D ! // WORKS !
    exec('xdotool windowfocus ' + winId + '; xdotool key '+ button + '; sleep 1; xdotool windowfocus ' + winId); // a delay in xdotool cmd & 'd be ok, but as we focused the WinId before, pb's already solved !  
    console.log('Talks! => Remote "'+button+'" executed :D !');
  });
};


var refocusWin = function(){
  exec('xdotool search --onlyvisible --name Talks! windowfocus', function(error, stdout){  
    console.log('Talks! => Remote re-focus executed :D !');
  });
};
/*
var refocusApp = function(appName){
  exec('xdotool search --onlyvisible --name '+ appName, function(error, stdout){
    var winId = stdout.trim(); // get the Talks! winId
    console.log(appName + ' Window ID: ' + winId );
    // xdotool focus
    //exec('sleep 2; xdotool windowfocus ' + winId); // refocus the window/app
    exec('xdotool windowfocus ' + winId + '; xdotool key Right'); // remote button :D ! // WORKS !
    console.log('Talks! => Re-focus "'+appName+'" executed :D !');
  });
};
*/


/* backup */
/*
var handleRemoteButton = function(button){
  exec('xdotool search --onlyvisible --name Talks!', function(error, stdout){
    var winId = stdout.trim(); // get the Talks! winId
    console.log('Talks! Window ID: ' + winId );
    // xdotool focus & key <button>
    switch(button){
      case 'c': // the fullscreen handling needs the focus to be re-added after toggling off fullscreen mode -> fixes that ;p ( Chrome Packaged Apps bug (on Ubuntu, at least) )
        exec('xdotool windowfocus ' + winId + '; xdotool key '+ button + '; sleep 1; xdotool windowfocus ' + winId);
        console.log('Talks! => Remote "'+button+'" -> fullscreen fix applied :D !');
        break;
      default:
        exec('xdotool windowfocus ' + winId + '; xdotool key '+button);
        break;
    }
    //exec('xdotool windowfocus ' + winId + '; xdotool key '+button); // remote button :D ! // WORKS !
    //exec('xdotool windowfocus ' + winId + '; xdotool key '+ button + '; sleep 1; xdotool windowfocus ' + winId); // a delay in xdotool cmd & 'd be ok, but as we focused the WinId before, pb's already solved !  
    console.log('Talks! => Remote "'+button+'" executed :D !');
  });
};
*/
