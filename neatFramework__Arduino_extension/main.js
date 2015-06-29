var app={}; // empty object for the app

var screenWidth = screen.availWidth, // screen width
    screenHeight = screen.availHeight, // screen height
    width=screenWidth/2, // def width: half screen width
    height=screenHeight/1.5, // def height: half screen height
    minWidth=800, // min width
    minHeight=600; // min height

chrome.runtime.requestUpdateCheck(updateCheck); // don't know yet

function updateCheck(status){ // consumed above, still don't know yet
    if(status=="no_update")
        return;
    chrome.runtime.reload();
}

// init the app (.. it seems ..)
chrome.app.runtime.onLaunched.addListener(
    function() {
        chrome.app.window.create(
            'index.html', 
            {
                bounds: {
                    width   : Math.round(width),
                    height  : Math.round(height),
                    left    : Math.round((screenWidth-width)/2),
                    top     : Math.round((screenHeight-height)/2)
                },
                frame       : 'none',
            },
            app.opened
        );
    }
);
    
app.opened=function(e){
    e.contentWindow.onload=app.onload;
}

app.onload=function(e){
    // to test: an "alert()" hello world :D
}