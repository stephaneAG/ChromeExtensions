/* 
*  neatFramework-based Chrome Extension / Package App v0.0.1a 
*
*  background.js - the current file is set in "manifest.json" & is used to call the App's main html file & corresponding javascript sources ( src="" at the end of the html file )
*/

// the chrome app runtime
chrome.app.runtime.onLaunched.addListener(
  function(){
    // simplest way to init an app is the below one commented out
    //chrome.app.window.create('main.html'); // use "main.html" as the App's "main container", also, resides in the root directory ( where the manifest.json resides in ) & not in /js ( as does the current file )
    // debug bounds 'd be perfect 822x439
//});

    // specifying a little more stuff
    chrome.app.window.create('main.html', { id: "mainwin", 
                                            bounds: { top: 128,
                                                      left: 128,
                                                      width: 822,
                                                      height: 439
                                            },
	                                    minHeight: 439,
                                            maxWidth: 1000,
                                            minWidth: 822,
                                            //frame: 'none'
                                          });
});
