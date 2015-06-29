/* 
*  neatFramework: serial console Module
*
*  neatFramework_serial_console_MODULE.js - A javascript module file holding a scoped/closured/contained implementation of the Chrome serial API ( above Chrome v33 )
*  
*  by StephaneAG - 2014
 */

// Self_executing_Anonymous Fcn ( providing closure & preventing polluting the global namespace (..) )
// R: 'barebone syntax' : (function(){})(); 
(function(theWindow, theDocument, theUndefined){
  var _undef; // an undefined var
  var _undefined = ''; // another "undefined" var
  // some 'closures' tests ..
  //console.log('[ neatFramework_serial_console_MODULE.js ] theWindow == window ? : ' + ( theWindow == window ) ); // true
  //console.log('[ neatFramework_serial_console_MODULE.js ] theDocument == document ? : ' + ( theDocument == document ) ); // true
  //console.log('[ neatFramework_serial_console_MODULE.js ] theUndefined == "undefined" ? : ' + ( theUndefined == undef ) ); // true
  
  /* ************************************************************************************************************************************************ */
  // our actual 'Module' code .
  
  /*  ---- module API ----
  *
  *   The "app_logic.js" file ( or the "main.js" file if the app logic is handled in its own module ) has the following functions available:
  *   
  *   * The following can be used to "register" callback functions:
  *
  *   - onConsoleClear()              --> 'll be called each time the serial console has been cleared
  *   - onConsoleConfigure()          --> 'll be called each time the serial console configuration has been updated
  *   - onConsoleCreate()             --> 'll be called each time a serial console is created
  *   - onConsoleReceive()            --> 'll be called each time RECV data ( coming from the serial ) is written to the console
  *   - onConsoleWrite()              --> 'll be called each time SND data ( that'll be written to the serial ) is written to the console
  *   
  *   * The following can be used to interact with the module ( and thus maybe trigger one of the above )
  *
  *   - consoleClear()               --> 'll empty the console passed
  *   - consoleConfigure()           --> 'll update the settings ( mainly "data-..." stuff ) of the console passed
  *   - consoleCreate()              --> 'll add the necessary to the div passed to make it a console ( mainly "data-..." stuff )
  *   - consoleLogMessage()          --> 'll log the message passed to the serial console using "debug mode"  ( aka, applying the same formats as ready & cleared logs )
  *   - consoleReceive()             --> 'll write the specified text to the console passed ( the passed text 'll be displayed only if the console displays "receive" messages )
  *   - consoleWrite()               --> 'll write the specified text to the console passed ( the passed text 'll be displayed only if the console displays "write" messages )
  *   
  *   * The following can be used to update the infos displayed in the console name
  *
  *   - consoleUsingPort()           --> 'll update the "using-port" property of the serial console
  *   - consoleUsingBaudrate()       --> 'll update the "using-baudrate" property of the serial console
  *   - consoleUsingLinefeed()       --> 'll update the "using-linefeed" property of the serial console
  *
  *   * The following is PRIVATE API ( aka stuff only used internally to the current file )
  *   
  *   - _appendLine()                --> 'll append a new line at the top or bottom of the console text depending on the console configuration
  *   - _appendToTop()               --> 'll append a line above the current text present in the console
  *   - _appendToBottom()            --> 'll append a line after the current text present in the console
  *   - _configure()                 --> 'll configure the console (used internally by "consoleConfigure()" & "consoleCreate()"  )
  *   - _countLines()                --> 'll get the current number of lines in the console
  *   - _handleRefresh()             --> 'll refresh the console based on its configuration ( & thus, proceed with the above functions accordingly )
  *   - _saveScrollTop()             --> 'll save the current position of the scroll in the serial console text
  *   - _scrollToBottom()            --> 'll scoll down to the bottom of the serial console text
  *   - _restoreScrollTop()          --> 'll restore the previous position of the scroll in the serial console text ( aka scroll back to it )
  *   
  */

  // first, we define the closure/scope of our module
  /* ---------- MODULE CLOSURE ---------- */
  var serial_console_module = {}; // empty obj
  /* ------------------------------------ */

  /* -- module API functions -- */

  // helper
  var _callbackIfDefined = function(callbackfunc){ ( callbackfunc || function(){ console.log('info: no external callback has been set for the function that was just invoked.') } )() };
  //var _callbackIfDefined = function(callbackfunc){ if(callbackfunc == 'function'){ callbackfunc() } else console.log('info: no callbackset for the function that was just invoked.')  };

  // - onConsoleClear()
  var _onConsoleClear_callbackfunc = _undefined; // external callback
  var _onConsoleClear_callback = function(){ _callbackIfDefined( _onConsoleClear_callbackfunc ) }; // invoke the external callback if defined
  var onConsoleClear = function(callbackfunc){ _onConsoleClear_callbackfunc = callbackfunc; }; // invoked to set the external callback
  
  // - onConsoleConfigure()
  var _onConsoleConfigure_callbackfunc = _undefined; // external callback
  var _onConsoleConfigure_callback = function(){  _callbackIfDefined( _onConsoleConfigure_callbackfunc ) }; // invoke the external callback if defined
  var onConsoleConfigure = function(callbackfunc){ _onConsoleConfigure_callbackfunc = callbackfunc; }; // invoked to set the external callback

  // - onConsoleCreate()
  var _onConsoleCreate_callbackfunc = _undefined; // external callback
  var _onConsoleCreate_callback = function(){ _callbackIfDefined( _onConsoleCreate_callbackfunc ) }; // invoke the external callback if defined
  //var _onConsoleCreate_callback = function(){ _onConsoleCreate_callbackfunc() }; // without check
  var onConsoleCreate = function(callbackfunc){ _onConsoleCreate_callbackfunc = callbackfunc; }; // invoked to set the external callback
  
  // - onConsoleReceive()
  var _onConsoleReceive_callbackfunc = _undefined; // external callback
  var _onConsoleReceive_callback = function(){ _callbackIfDefined( _onConsoleReceive_callbackfunc ) }; // invoke the external callback if defined
  var onConsoleReceive = function(callbackfunc){ _onConsoleReceive_callbackfunc = callbackfunc; }; // invoked to set the external callback

  // - onConsoleWrite()
  var _onConsoleWrite_callbackfunc = _undefined; // external callback
  var _onConsoleWrite_callback = function(){ _callbackIfDefined( _onConsoleWrite_callbackfunc ) }; // invoke the external callback if defined
  var onConsoleWrite = function(callbackfunc){ _onConsoleWrite_callbackfunc = callbackfunc; }; // invoked to set the external callback
  

  /* -------------------------- */

  // fcn that ...
  var _helloWorld = function(){ console.log("Hello world !"); };
  var helloWorld2 = function(){ console.log("Hello world2 !"); };
  var log_module_version = function(){ console.log(_module_version) };

  /* ****************************** MODULE ******************************* */
  
  // useful stuff
  
  // TO DO / ADD / THNK ABOUT:
  //
  // * parameters:
  //
  // - data-ntfrmwrk-console-maxlines            --> 'll hold the maximum lines kept before discarding (removing) the most ancient one ( top or bottom depending on the configuration )
  // - data-ntfrmwrk-console-autoscroll          --> 'll auto scroll ( or not ) when new data is displayed in the console
  // - data-ntfrmwrk-console-direction           --> to implement for the fun ;D : specifies the scroll direction of the console ( top-to-bottom, or reversed )
  // - data-ntfrmwrk-console-terminaltype        --> to implement for the fun ;D : specifies the type of the serial console to be either 'single' or 'dual' ( thus, splitted horizontally or vertically )
  // - data-ntfrmwrk-console-terminaloutput      --> whether the console displays RECV, SND, or both
  // - data-ntfrmwrk-console-terminalsplit       --> whether the splitting, for a "dual" console, is done horizontally or vertically
  //
  // - data-ntfrmwrk-console-highlights          --> to implement for the fun :p : specifies a CSS highlights for the serial messages ( class names in the CSS file 'd be used to match line prefix(es) )
  // 
  // --> TO DO: ADDED DETAILS & STUFF FOR THE ABOVE "highlights" ! ;D
  //
  // - data-ntfrmwrk-console-background          --> the background to be used for the console
  //
  // - data-ntfrmwrk-console-name                      --> the name to be displayed in one of the corner|| middles of the console ( be default the type of the console )
  // - data-ntfrmwrk-console-nameposition              --> the disposition of the name of the console
  // - data-ntfrmwrk-console-namecolor                 --> the color of the above
  // - data-ntfrmwrk-console-namecssclass              --> alternative way to set the color of the name is to pass a CSS class name
  //
  // - data-ntfrmwrk-console-data-(..)                 --> the data to be show: can be either 'port', 'baudrate', 'linefeed', or any combo of the previous, specified as the following lines.
  // - data-ntfrmwrk-console-data-show-port                each of these will be added after one another with "/" appended in between if the corresponding parameters are set to true
  // - data-ntfrmwrk-console-data-show-baudrate
  // - data-ntfrmwrk-console-data-show-linefeed
  // - data-ntfrmwrk-console-showdata                  --> whether or not to show the port and/or baud rate after the name of the console
  // - data-ntfrmwrk-console-datacolor                 --> the color of the above
  // - data-ntfrmwrk-console-datacssclass              --> alternative way to set the color of the name is to pass a CSS class name
  // - data-ntfrmwrk-console-data-port-color           --> TO BE ADDED
  // - data-ntfrmwrk-console-data-port-cssclass        --> TO BE ADDED
  // - data-ntfrmwrk-console-data-baudrate-color       --> TO BE ADDED
  // - data-ntfrmwrk-console-data-baudrate-cssclass    --> TO BE ADDED
  // - data-ntfrmwrk-console-data-linefeed-color       --> TO BE ADDED
  // - data-ntfrmwrk-console-data-linefeed-cssclass    --> TO BE ADDED
  // - data-ntfrmwrk-console-namedatacombo             --> if true, the data to be show is placed after the console name, on the same block of text
  // - data-ntfrmwrk-console-dataposition              --> need the above to be false to be applied: specify an alternative location for the data to be shown instead of after the console name
  //
  // - data-ntfrmwrk-console-linesnum                  --> TO BE ADDED: if true, the line numbers are displayed on the right||left of each console line if we have more than one line 
  // - data-ntfrmwrk-console-prefixed                  --> if true, the messages will be prefixed by "[RECV] ", "[SND] ", or any custom-set prefix
  // - data-ntfrmwrk-console-recvprefix                --> if set, will override the default "[RECV] " prefix
  // - data-ntfrmwrk-console-recvprefix-only           --> if true, will prevent any snd prefix to be shown
  // - data-ntfrmwrk-console-recvprefixcolor           --> if set, will override the default "[RECV] " prefix color
  // - data-ntfrmwrk-console-recvprefixcssclass        --> alternative way to set the color of the RECV prefix is to pass a CSS class name
  // - data-ntfrmwrk-console-sndprefix                 --> if set, will override the default "[SND] " prefix
  // - data-ntfrmwrk-console-sndprefix-only            --> if true, will prevent any recv prefix to be shown
  // - data-ntfrmwrk-console-sndprefixcolor            --> if set, will override the default "[SND] " prefix color
  // - data-ntfrmwrk-console-sndprefixcssclass         --> alternative way to set the color of the SDN prefix is to pass a CSS class name
  //
  // - data-ntfrmwrk-console-suffixed                  --> if true, the messages will be suffixed by "[RECV] ", "[SND] ", or any custom-set suffix
  // - data-ntfrmwrk-console-recvsuffix                --> if set, will override the default "[RECV] " suffix
  // - data-ntfrmwrk-console-recvsuffix-only           --> if true, will prevent any snd suffix to be shown
  // - data-ntfrmwrk-console-recvsuffixcolor           --> if set, will override the default "[RECV] " suffix color
  // - data-ntfrmwrk-console-recvsuffixcssclass        --> alternative way to set the color of the RECV suffix is to pass a CSS class name  
  // - data-ntfrmwrk-console-sndsuffix                 --> if set, will override the default "[SND] " suffix
  // - data-ntfrmwrk-console-sndsuffix-only            --> if true, will prevent any recv suffix to be shown
  // - data-ntfrmwrk-console-sndsuffixcolor            --> if set, will override the default "[SND] " suffix color
  // - data-ntfrmwrk-console-sndsuffixcssclass         --> alternative way to set the color of the SND suffix is to pass a CSS class name


  // whether or not to provided "defaults" send & clear buttons ?
  
  /* -- useful intern variables -- */

  var _console_maxlines_default = 99; // the default line buffer size
  var _console_autoscroll_default = true; // autoscroll is desactivated by default
  var _console_direction_default = 'toptobottom'; // the standard direction, top-to-bottom, is the default
  var _console_terminal_type_default = 'single'; // by default, we only have a single-window console
  var _console_terminal_output_default = 'recvsnd'; // by default, we display both the RECV & SND messages
  var _console_terminal_split_default = 'horizontal'; // if the terminal is of "dual" type, then this is used to indicate whether to make the splitting horizontal or vertical

  var _console_highlights_default = 'none'; // no CSS file is used with "class names prefixers" to add specific colored outputs by default ( ny now .. )
  
  var _console_background_default = 'none'; // no default background image is set by default

  var _console_name_default = 'serial console'; // the default name displayed in the console, if activated
  var _console_name_position_default = 'topright'; // if set to " none ", won't be displayed
  var _console_name_color_default = 'none'; // sublimetext orange as the default console name color
  var _console_name_cssclass_default = 'console_name_default'; // the default CSS class for the console name

  var _console_data_show_port_default = true; // the port used will be shown in the displayed data ( by default after the name of the console )
  var _console_data_show_baudrate_default = true; // the baud rate used will be shown in the displayed data ( by default after the name of the console )
  var _console_data_show_linefeed_default = true; // the line feed used will be shown in the displayed data ( by default after the name of the console )
  var _console_show_data_default = true; // data is visible by default
  var _console_data_color_default = '#62C4BF'; // sublimetext blue as the default console data color
  var _console_data_cssclass_default = 'console_data_default'; // the default CSS class for the console data
  var _console_data_port_color_default = 'none'; // the default color for the console data port is set via the CSS class ( warn: setting a color overwrites the CSS class one ! )
  var _console_data_port_cssclass_default = 'console_data_port_default';  // the default CSS class for the console data port
  var _console_data_baudrate_color_default = 'none'; // the default color for the console data baudrate is set via the CSS class ( warn: setting a color overwrites the CSS class one ! )
  var _console_data_baudrate_cssclass_default = 'console_data_baudrate_default';  // the default CSS class for the console data baudrate
  var _console_data_linefeed_color_default = 'none'; // the default color for the console data linefeed is set via the CSS class ( warn: setting a color overwrites the CSS class one ! )
  var _console_data_linefeed_cssclass_default = 'console_data_linefeed_default';  // the default CSS class for the console data linefeed
  var _console_dataname_combo_default = true; // the data is placed after the console name by default
  var _console_data_position_default = ''; // Nb: needs the above to be true for this to be set ( the default is to have the data in the same box as the name, after it )

  var _console_prefixed_default = true; // the " RECV " & " SND " messages have a defaults prefix used to easily indentify them
  var _console_recv_prefix_default = '[RECV]> '; // the default " RECV " prefix
  var _console_recv_prefix_only_default = false; // by default, doesn't prevent snd prefixes to be displayed
  var _console_recv_prefix_color_default = '#AD779E'; // sublimetext purple as the default color for the RECV prefix
  var _console_recv_prefix_cssclass_default = 'console_recv_prefix_default'; // the default CSS class for the RECV prefix
  var _console_snd_prefix_default = '[SND]> '; // the default " SND " prefix
  var _console_snd_prefix_only_default = true; // by default, doesn't prevent recv prefixes to be displayed
  var _console_snd_prefix_color_default = '#F92672'; // sublimetext red as the default color for the SND prefix
  var _console_snd_prefix_cssclass_default = 'console_snd_prefix_default'; // the default CSS class for the RECV prefix

  var _console_suffixed_default = true; // the " RECV " & " SND " messages have a defaults suffix used to easily indentify them
  var _console_recv_suffix_default = ' <[RECV]'; // the default " RECV " suffix
  var _console_recv_suffix_only_default = true; // by default, doesn't prevent snd suffixes to be displayed
  var _console_recv_suffix_color_default = '#AD779E'; // sublimetext purple as the default color for the RECV suffix
  var _console_recv_suffix_cssclass_default = 'console_recv_suffix_default'; // the default CSS class for the RECV suffix
  var _console_snd_suffix_default = ' <[SND]'; // the default " SND " suffix
  var _console_snd_suffix_only_default = false; // by default, doesn't prevent recv suffixes to be displayed
  var _console_snd_suffix_color_default = '#F92672'; // sublimetext red as the default color for the SND suffix
  var _console_snd_suffix_cssclass_default = 'console_snd_suffix_default'; // the default CSS class for the RECV suffix  

  var _console_config_default = {
    maxlines:                  _console_maxlines_default,
    autoscroll:                _console_autoscroll_default,
    direction:                 _console_direction_default,
    terminal_type:             _console_terminal_type_default,
    terminal_output:           _console_terminal_output_default,
    terminal_split:            _console_terminal_split_default,

    highlights:                _console_highlights_default,

    terminal_background:       _console_background_default,

    terminal_name:             _console_name_default,
    name_position:             _console_name_position_default,
    name_color:                _console_name_color_default,
    name_cssclass:             _console_name_cssclass_default,

    data_show_port:            _console_data_show_port_default,
    data_show_baudrate:        _console_data_show_baudrate_default,
    data_show_linefeed:        _console_data_show_linefeed_default,
    show_data:                 _console_show_data_default,
    data_color:                _console_data_color_default,
    data_cssclass:             _console_data_cssclass_default,
    data_port_color:           _console_data_port_color_default,
    data_port_cssclass:        _console_data_port_cssclass_default,
    data_baudrate_color:       _console_data_baudrate_color_default,
    data_baudrate_cssclass:    _console_data_baudrate_cssclass_default,
    data_linefeed_color:       _console_data_linefeed_color_default,
    data_linefeed_cssclass:    _console_data_linefeed_cssclass_default,
    dataname_combo:            _console_dataname_combo_default,
    data_position:             _console_data_position_default,
    
    prefixed:                  _console_prefixed_default,
    recv_prefix:               _console_recv_prefix_default,
    recv_prefix_only:          _console_recv_prefix_only_default,
    recv_prefix_color:         _console_recv_prefix_color_default,
    recv_prefix_cssclass:      _console_recv_prefix_cssclass_default,
    snd_prefix:                _console_snd_prefix_default,
    snd_prefix_only:           _console_snd_prefix_only_default,
    snd_prefix_color:          _console_snd_prefix_color_default,
    snd_prefix_cssclass:       _console_snd_prefix_cssclass_default,

    suffixed:                  _console_suffixed_default,
    recv_suffix:               _console_recv_suffix_default,
    recv_suffix_only:          _console_recv_suffix_only_default,
    recv_suffix_color:         _console_recv_suffix_color_default,
    recv_suffix_cssclass:      _console_recv_suffix_cssclass_default,
    snd_suffix:                _console_snd_suffix_default,
    snd_suffix_only:           _console_snd_suffix_only_default,
    snd_suffix_color:          _console_snd_suffix_color_default,
    snd_suffix_cssclass:       _console_snd_suffix_cssclass_default
  };

  /* ----------------------------- */

  /* ---- public ModuleAPI functions ---- */

  // - consoleClear() - 'll clear the serial console
  var consoleClear = function(serialConsole){
    //serialConsole.innerHTML = '<span class="consolename"> serial console1 </span>'; // wip name of the console in the corner of the console
    // TO DO: replace the above by the fcn the parse the defaluts||parameters to properly format the displayed console name
    var debugFormattedName = _formatTerminalName(serialConsole);
    serialConsole.innerHTML = debugFormattedName;
    
    serialConsole.innerHTML += '<ul></ul>'; // empty the serial concsole content / append an EMPTY ul ( contrary to the 'old' way, right below )  
    //serialConsole.innerHTML += '<ul> <li class="consoleline clearedlog"> [ serial console cleared ] </li> </ul>'; // empty the serial console content
    // TO DO: replace the above by the function "neatFramework.serial_console.consoleLogMessage()" ( .. )
    consoleLogMessage(serialConsole, 'clearedlog', 'serial console cleared'); // does the same as the above commented function but consumes a public API function
    
    _onConsoleClear_callback(); // trigger an external callback function if it has been "registered"
  };


  // - consoleConfigure() - 'll update the configuration of te serial console
  //                        example of configObject: " { 'msgstype': 'recv', maxlines': 50, 'autoscroll': false, 'direction', 'highlights': 'highlights_css' } "
  var consoleConfigure = function(serialConsole, configObject){
    // parse the config object & add parameters, aka
    
    // "ultra-permissive" & UNTESTED (!) : for each key in configObject, add a 'data-<key>' & the corresponding value
    /*
    for(var key in configObject) { 
      if ( configObject.hasOwnProperty(key) ) {
        var attr = configObject[key];
        console.log("SERIAL CONSOLE CONFIG OBJECT -> attr: " + attr);
      }
    }
    */

    // simple yet useful
    /* - working quick& dirt code -
    var config_type  = configObject.msgstype ? configObject.msgstype : 'recvsnd'; // console is used for both RECV & SND
    var config_maxlines = configObject.maxlines ? configObject.maxlines : 99; // the default maximum of persistent console messages
    var config_autoscroll = configObject.autoscroll ? configObject.autoscroll : 'true'; // whether or not to use autoscrolling feature
    var config_direction  = configObject.direction ? configObject.direction : 'toptobottom';
    var config_highlights = configObject.highlights ? configObject.highlights : '';
    
    console.log("UPDATED CONSOLE CONFIGURATION:");
    console.log("type: " + config_type + " maxlines: " + config_maxlines + " autoscroll: " + config_autoscroll + " direction: " + config_direction + " highlights: " + config_highlights);

    serialConsole.setAttribute('data-ntfrmwrk-console-type', config_type);
    serialConsole.setAttribute('data-ntfrmwrk-console-maxlines', config_maxlines);
    serialConsole.setAttribute('data-ntfrmwrk-console-autoscroll', config_autoscroll);
    serialConsole.setAttribute('data-ntfrmwrk-console-direction', config_direction);
    serialConsole.setAttribute('data-ntfrmwrk-console-highlights', config_highlights);
    */
    _configure(serialConsole, configObject); // pass the config object as well as the console to our configuration handler

    _onConsoleConfigure_callback(); // trigger an external callback function if it has been "registered"
  };


  // - consoleCreate() - create a console using the html element passed as parameter
  var consoleCreateDefault = function(serialConsole){
    _configure(serialConsole, _console_config_default); // pass the config object as well as the console to our configuration handler

    // init
    //serialConsole.innerHTML = '<span class="consolename"> serial console1 </span>'; // wip name of the console in the corner of the console
    // TO DO: replace the above by the fcn the parse the defaluts||parameters to properly format the displayed console name
    var debugFormattedName = _formatTerminalName(serialConsole);
    serialConsole.innerHTML = debugFormattedName;
    
    serialConsole.innerHTML += '<ul></ul>'; // empty the serial concsole content / append an EMPTY ul ( contrary to the 'old' way, right below )
    //serialConsole.innerHTML += '<ul> <li class="consoleline readylog"> [ serial console ready ! ] </li> </ul>'; // set the "Serial console ready" text
    // TO DO: replace the above by the function "neatFramework.serial_console.consoleLogMessage()" ( .. )
    consoleLogMessage(serialConsole, 'readylog', 'serial console ready !'); // does the same as the above commented function but consumes a public API function
    
    _onConsoleCreate_callback(); // trigger an external callback function if it has been "registered"
  };
  var consoleCreate = function(serialConsole, configObject){
    // TO DO: if working, add stuff from the above function to have an optional "configObject" parameter passed  in addition to the html serial console element
    _configure(serialConsole, configObject); // pass the config object as well as the console to our configuration handler

    /* - working quick & dirty code -
    // set the necessay to make the passed div a simple console
    serialConsole.setAttribute('data-ntfrmwrk-console-type', 'recvsnd'); // console is used for both RECV & SND
    serialConsole.setAttribute('data-ntfrmwrk-console-maxlines', '99'); // the default maximum of persistent console messages
    serialConsole.setAttribute('data-ntfrmwrk-console-autoscroll', 'true'); // whether or not to use autoscrolling feature
    serialConsole.setAttribute('data-ntfrmwrk-console-direction', 'toptobottom');
    serialConsole.setAttribute('data-ntfrmwrk-console-highlights', ''); // no highlights yet :/
    */

    // init
    //serialConsole.innerHTML = '<span class="consolename"> serial console1 </span>'; // wip name of the console in the corner of the console
    // TO DO: change the above to use the fcn that display the name & config based on the default||passed position/color/..
    var debugFormattedName = _formatTerminalName(serialConsole);
    serialConsole.innerHTML = debugFormattedName;
      
    serialConsole.innerHTML += '<ul></ul>'; // empty the serial concsole content / append an EMPTY ul ( contrary to the 'old' way, right below )
    //serialConsole.innerHTML += '<ul> <li class="consoleline readylog"> [ serial console ready ! ] </li> </ul>'; // set the "Serial console ready" text
    // TO DO: replace the above by the function "neatFramework.serial_console.consoleLogMessage()" ( .. )
    consoleLogMessage(serialConsole, 'readylog', 'serial console ready !'); // does the same as the above commented function but consumes a public API function
      
    _onConsoleCreate_callback(); // trigger an external callback function if it has been "registered"
  };
    

  // - consoleLogMessage() - logs the message passed to the serial console, displaying it in "debug mode"
  var consoleLogMessage = function(serialConsole, className, logMessage){
    var buffer = serialConsole.getElementsByTagName('ul')[0],
        new_line = theDocument.createElement('li'),
        line_message = logMessage;
    new_line.innerHTML = ' [ ' + line_message + ' ] ';
    new_line.classList.add('consoleline'), new_line.classList.add(className);
        
      
    // TO DO: check direction of the serial console here ( .. )
    buffer.appendChild(new_line);
    // then:
    // either " _scrollToBottom(buffer); " or " _restoreScrollTop(buffer); "
    _scrollToBottom(buffer);
  };


  // - consoleReceive()
  var consoleReceive = function(serialConsole, messageStr){
    var console_type = serialConsole.getAttribute('data-ntfrmwrk-console-terminal-output');
    //if( console_type == 'recvsnd' || console_type == 'recv' ) _appendLine(serialConsole, messageStr); // old
    if( console_type == 'recvsnd' || console_type == 'recv' ) _appendLine(serialConsole, messageStr, 'recv');
    else console.log("warning: serial console is not configured to display messages received from the serial ");
   
    _onConsoleReceive_callback(); // trigger an external callback function if it has been "registered"
  }; 


  // - consoleWrite()
  var consoleWrite = function(serialConsole, messageStr){
    var console_type = serialConsole.getAttribute('data-ntfrmwrk-console-terminal-output');
    //if( console_type == 'recvsnd' || console_type == 'snd' ) _appendLine(serialConsole, messageStr); // old
    if( console_type == 'recvsnd' || console_type == 'snd' ) _appendLine(serialConsole, messageStr, 'snd');
    else console.log("warning: serial console is not configured to display messages received written to the serial ");

    _onConsoleWrite_callback(); // trigger an external callback function if it has been "registered"
  };


  /* ------------------------------------ */
  
  /* ---- private ModuleAPI functions ---- */

  // - appendLine() - append a new line at the top or bottom of the console text depending on the console configuration
  //var _appendLine = function(serialConsole, messageStr){ // old
  var _appendLine = function(serialConsole, messageStr, messageType){

    // check the current number of lines compare it to the maxlines parameter
    var console_maxlines = serialConsole.getAttribute('data-ntfrmwrk-console-maxlines');
    var console_direction = serialConsole.getAttribute('data-ntfrmwrk-console-direction');

    console.log('current lines: '+_countLines(serialConsole)+' / maxlines: '+console_maxlines ); // little log on the way ..

    if( _countLines(serialConsole) < console_maxlines ){ // there's enough space left in the configured lines buffer for us to write one more line to it
      
      //var console_direction = serialConsole.getAttribute('data-ntfrmwrk-console-direction'); // move up a littl' bit so as no to repeat ourselves ;D ( "DRY & KISS" ;p )
      //if( console_direction == 'toptobottom' ) _appendToBottom(serialConsole, messageStr); // append to the bottom ( most commonly found / terminals default behavior ) // old
      //else _appendToTop(serialConsole, messageStr); // append to the top ( may be classy-sweet with to different consoles, one in each direction :p ) // old
      if( console_direction == 'toptobottom' ) _appendToBottom(serialConsole, messageStr, messageType); // append to the bottom ( most commonly found / terminals default behavior )
      else _appendToTop(serialConsole, messageStr, messageType); // append to the top ( may be classy-sweet with to different consoles, one in each direction :p )
    
    } else { // not enough available lines in the configured buffer: we remove the top-most or bottom-most depending on the console direction & only then append content to its bottom or top
      
      if( console_direction == 'toptobottom' ){ // remove to top-most line & append to bottom
        var garbage_line_selector = serialConsole.id + ' ul li.consoleline::last-child', // hlpr
            garbage_line = serialConsole.querySelector(garbage_line_selector); // select the <li> to be deleted
        var lines_buffer_selector = serialConsole.id + ' ul', // hlpr
            lines_buffer = serialConsole.querySelector(lines_buffer_selector); // select our <ul>
        lines_buffer.removeChild(garbage_line); // may EVENTUALLY work .. but if what I read is true, nope  ( -> and manual iteration through li's :/ )

        
        //_appendToBottom(serialConsole, messageStr); // append to the bottom of the console // old
        _appendToBottom(serialConsole, messageStr, messageType); // append to the bottom of the console
      } 
      
      else { // we remove the bottom-most line & append to top
        
        var garbage_line = serialConsole.id + ' ul li.consoleline:first-child'; // hlpr
        var lines_buffer = serialConsole.id + ' ul'; // hlpr
        lines_buffer.removeChild(garbage_line); // may EVENTUALLY work .. but if what I read is true, nope  ( -> and manual iteration through li's :/ )

        
        //_appendToTop(serialConsole, messageStr); // append to the top of the console // old
        _appendToTop(serialConsole, messageStr, messageType); // append to the top of the console
      
      }
    
    }
      
    // else, remove a line from the top or the bottom to make just enough space to display one more line & then apend the stuff
  };


  // - countLines() - get the current number of lines in the console
  var _countLines = function(serialConsole){
    //var console_lines = serialConsole.id + ' ul li.consoleline'; // hlpr
    //var lines_count = theDocument.querySelectorAll(console_lines).length; // get number from query
    
    var buffer_lines = serialConsole.getElementsByTagName('ul')[0].getElementsByTagName('li');
    var buffer_lines_count = buffer_lines.length +1;
    //buffer_lines.forEach(buffer_lines_count++);
    //console.log('_countLines:: without querySelector: '+buffer_lines_count);

    return buffer_lines_count; // return the current number of displayed in the console
  };


  // - appendToTop() - append a line above the current text present in the serial console
  var _appendToTop = function(serialConsole, messageStr){
    /* - version using querySelector ( and NOT working ...) -
    var buffer_selector = serialConsole.id + ' ul', // hlpr
        buffer = serialConsole.querySelector(buffer_selector); // select our <ul>

    var firstline_selector = serialConsole.id + ' ul li.consoleline:first-child', // hlpr
        firstline = buffer.querySelector(firstline_selector); // select our <li.consoleline:first-child>
    */

    var buffer = serialConsole.getElementsByTagName('ul')[0]; // select our <ul>
      
    // create our <li>
    var new_line = document.createElement('li'),
        line_message = document.createTextNode(messageStr);
    new_line.appendChild(line_message); // append the message text to our <li>

    _saveScrollTop(); // save the current scroll position

    // append it to the top-most of our <ul>
    buffer.insertBefore(new_line, firstline); // insert our new <li> before the first <li> present in the <ul>

    _restoreScrollTop(buffer); // restore the previous scroll position
  };


  // - appendToBottom() - append a line above the current text present in the serial console
  //var _appendToBottom = function(serialConsole, messageStr){ // old
  var _appendToBottom = function(serialConsole, messageStr, messageType){

    /* - version using querySelector ( and NOT working ...) -
    var buffer_selector = serialConsole.id + ' ul', // hlpr
        buffer = serialConsole.querySelector(buffer_selector); // select our <ul>

    var lastline_selector = serialConsole.id + ' ul li.consoleline:last-child', // hlpr
        lastline = buffer.querySelector(lastline_selector); // select our <li.consoleline:first-child>
    */

    // - old-school working method -
    var buffer = serialConsole.getElementsByTagName('ul')[0]; // select our <ul>
    var last_line = buffer.getElementsByTagName('li')[0]; // select the last <li>
    //buffer.removeChild(last_line); // done in another function

    // TO ADD: check if the prefixes/suffixes are activated, in wich case we set data-.. stuff accordingly (old: we alter the message by appendding them at the message beginning/end )
    _consoleCheckPSFx(serialConsole);
    // TO ADD: check the 'console_output' to see if the console displays prefixes||suffixes/not from recv||snd||recvsnd messages
    // --> done in "formatMessage()" ,where we add the current settings to the message
    //var formattedMessage = _formatMessage(serialConsole, messageStr); // old
    var formattedMessage = _formatMessage(serialConsole, messageStr, messageType);
    //console.log('_formatMessage:: ' + 'Prefix currently set: ' + _consoleGetAttribute(serialConsole, 'recv-current-prefix') );
    console.log('_appendToBottom:: ' + 'Formatted message: ' + formattedMessage ); // IF THE PROBLEM IS NOT THERE ( WHAT I THNK ) , THEN REPLACE THE "TextNode" below by innerHTML ;D

    // create our <li>
    var new_line = document.createElement('li'),
        //line_message = document.createTextNode(formattedMessage); // line_message = document.createTextNode(messageStr); --> basic one, not caring about pre/suffixes
        line_message = formattedMessage; // this is NOT ONLY TEXT ;p
    //new_line.appendChild(line_message); // append the message text to our <li> // Nb: needed changes to take HTML instead of TextNode child (..)
    new_line.innerHTML = line_message;
    new_line.classList.add('consoleline'); // R: classList.toggle()
    //new_line.classList.add('recv'); // yup, 'd benefit from the message type to be passe as well ;D

    // append it to the top-most of our <ul>
    buffer.appendChild(new_line); // insert our new <li> after the last <li> present in the <ul>

    //if( serialConsole.getAttribute('data-ntfrmwrk-console-autoscroll') == true ) serialConsole.scrollTop = serialConsole.scrollHeight; // scroll down if autoscroll is activated
    //serialConsole.scrollTop = serialConsole.scrollHeight; // TESTING: scrolling down before appending data ...
    //buffer.scrollTop = buffer.scrollHeight;
    _scrollToBottom(buffer); // same the above but in a dedicated function
  };


  // - scrollToBottom()
  var _scrollToBottom = function(buffer){
    buffer.scrollTop = buffer.scrollHeight; // scroll to the end of the console text    
  };


  // - saveScrollTop()
  var _saveScrollTop = function(serialConsole, buffer){
    serialConsole.setAttribute('data-ntfrmwrk-console-currentscroll', 'buffer.scrollTop'); // save the current scroll position of the console text    
  };


  // - restoreScrollTop()
  var _restoreScrollTop = function(buffer){
    var previous_top = serialConsole.getAttribute('data-ntfrmwrk-console-currentscroll'); // get the previous scroll position of the console text
    buffer.scrollTop = previous_top; // scroll to the previous scroll position of the console text
  };


  // - configure()
  var _configure = function(serialConsole, configObject){
    //var new_config = configObject || _console_config_default; // if a configObject is passed as parameter, use it, else, apply the defaults -> never tested: see right below :D
    // R: some of the defaults are need anyway, so we may also check for parameters to be overwritten or use the default "all at once / in a row" ;p
    var maxlines =                  configObject.maxlines ? configObject.maxlines : _console_maxlines_default,
        autoscroll =                configObject.autoscroll ? configObject.autoscroll : _console_autoscroll_default,
        direction =                 configObject.direction ? configObject.direction : _console_direction_default,
        terminal_type =             configObject.terminal_type ? configObject.terminal_type : _console_terminal_type_default,
        terminal_output =           configObject.terminal_output ? configObject.terminal_output : _console_terminal_output_default,
        terminal_split =            configObject.terminal_split ? configObject.terminal_split : _console_terminal_split_default,

        highlights =                configObject.highlights ? configObject.highlights : _console_highlights_default,

        terminal_background =       configObject.terminal_background ? configObject.terminal_background : _console_background_default,
    
        terminal_name =             configObject.terminal_name ? configObject.terminal_name : _console_name_default,
        name_position =             configObject.name_position ? configObject.name_position : _console_name_position_default,
        name_color =                configObject.name_color ? configObject.name_color : _console_name_color_default,
        name_cssclass =             configObject.name_cssclass ? configObject.name_cssclass : _console_name_cssclass_default,
    
        data_show_port =            configObject.data_show_port ? configObject.data_show_port : _console_data_show_port_default,
        data_show_baudrate =        configObject.data_show_baudrate ? configObject.data_show_baudrate : _console_data_show_baudrate_default,
        data_show_linefeed =        configObject.data_show_linefeed ? configObject.data_show_linefeed : _console_data_show_linefeed_default,
        show_data =                 configObject.show_data ? configObject.show_data : _console_show_data_default,
        data_color =                configObject.data_color ? configObject.data_color : _console_data_color_default,
        data_cssclass =             configObject.data_cssclass ? configObject.data_cssclass : _console_data_cssclass_default,
        data_port_color =           configObject.data_port_color ? configObject.data_port_color : _console_data_port_color_default,
        data_port_cssclass =        configObject.data_port_cssclass ? configObject.data_port_cssclass : _console_data_port_cssclass_default,
        data_baudrate_color =       configObject.data_baudrate_color ? configObject.data_baudrate_color : _console_data_baudrate_color_default,
        data_baudrate_cssclass =    configObject.data_baudrate_cssclass ? configObject.data_baudrate_cssclass : _console_data_baudrate_cssclass_default,
        data_linefeed_color =       configObject.data_linefeed_color ? configObject.data_linefeed_color : _console_data_linefeed_color_default,
        data_linefeed_cssclass =    configObject.data_linefeed_cssclass ? configObject.data_linefeed_cssclass : _console_data_linefeed_cssclass_default,
        dataname_combo =            configObject.dataname_combo ? configObject.dataname_combo : _console_dataname_combo_default,
        data_position =             configObject.data_position ? configObject.data_position : _console_data_position_default,
        
        prefixed =                  configObject.prefixed ? configObject.prefixed : _console_prefixed_default,
        recv_prefix =               configObject.recv_prefix ? configObject.recv_prefix : _console_recv_prefix_default,
        recv_prefix_only =          configObject.recv_prefix_only ? configObject.recv_prefix_only : _console_recv_prefix_only_default,
        recv_prefix_color =         configObject.recv_prefix_color ? configObject.recv_prefix_color : _console_recv_prefix_color_default,
        recv_prefix_cssclass =      configObject.recv_prefix_cssclass ? configObject.recv_prefix_cssclass : _console_recv_prefix_cssclass_default,
        snd_prefix =                configObject.snd_prefix ? configObject.snd_prefix : _console_snd_prefix_default,
        snd_prefix_only =           configObject.snd_prefix_only ? configObject.snd_prefix_only : _console_snd_prefix_only_default,
        snd_prefix_color =          configObject.snd_prefix_color ? configObject.snd_prefix_color : _console_snd_prefix_color_default,
        snd_prefix_cssclass =       configObject.snd_prefix_cssclass ? configObject.snd_prefix_cssclass : _console_snd_prefix_cssclass_default,
    
        suffixed =                  configObject.suffixed ? configObject.suffixed : _console_suffixed_default,
        recv_suffix =               configObject.recv_suffix ? configObject.recv_suffix : _console_recv_suffix_default,
        recv_suffix_only =          configObject.recv_suffix_only ? configObject.recv_suffix_only : _console_recv_suffix_only_default,
        recv_suffix_color =         configObject.recv_suffix_color ? configObject.recv_suffix_color : _console_recv_suffix_color_default,
        recv_suffix_cssclass =      configObject.recv_suffix_cssclass ? configObject.recv_suffix_cssclass : _console_recv_suffix_cssclass_default,
        snd_suffix =                configObject.snd_suffix ? configObject.snd_suffix : _console_snd_suffix_default,
        snd_suffix_only =           configObject.snd_suffix_only ? configObject.snd_suffix_only : _console_snd_suffix_only_default,
        snd_suffix_color =          configObject.snd_suffix_color ? configObject.snd_suffix_color : _console_snd_suffix_color_default,
        snd_suffix_cssclass =       configObject.snd_suffix_cssclass ? configObject.snd_suffix_cssclass : _console_snd_suffix_cssclass_default;

    // yay ! now that we have our default config mixed with the optional second parameter "configObject", we can set the data attributes as usual
    // Nb: this time with a helper function, to F-A-C-T-O-R-I-Z-E-! ;D

    _consoleSetAttribute(serialConsole, 'maxlines', maxlines);
    _consoleSetAttribute(serialConsole, 'autoscroll', autoscroll);
    _consoleSetAttribute(serialConsole, 'direction', direction);
    _consoleSetAttribute(serialConsole, 'terminal-type', terminal_type);
    _consoleSetAttribute(serialConsole, 'terminal-output', terminal_output);
    _consoleSetAttribute(serialConsole, 'terminal-split', terminal_split);
    
    _consoleSetAttribute(serialConsole, 'highlights', highlights);

    _consoleSetAttribute(serialConsole, 'terminal-background', terminal_background);

    _consoleSetAttribute(serialConsole, 'terminal-name', terminal_name);
    _consoleSetAttribute(serialConsole, 'name-position', name_position);
    _consoleSetAttribute(serialConsole, 'name-color', name_color);
    _consoleSetAttribute(serialConsole, 'name-cssclass', name_cssclass);

    _consoleSetAttribute(serialConsole, 'data-show-port', data_show_port);
    _consoleSetAttribute(serialConsole, 'data-show-baudrate', data_show_baudrate);
    _consoleSetAttribute(serialConsole, 'data-show-linefeed', data_show_linefeed);
    _consoleSetAttribute(serialConsole, 'show-data', show_data);
    _consoleSetAttribute(serialConsole, 'data-color', data_color);
    _consoleSetAttribute(serialConsole, 'data-cssclass', data_cssclass);
    _consoleSetAttribute(serialConsole, 'data-port-color', data_port_color);
    _consoleSetAttribute(serialConsole, 'data-port-cssclass', data_port_cssclass);
    _consoleSetAttribute(serialConsole, 'data-baudrate-color', data_baudrate_color);
    _consoleSetAttribute(serialConsole, 'data-baudrate-cssclass', data_baudrate_cssclass);
    _consoleSetAttribute(serialConsole, 'data-linefeed-color', data_linefeed_color);
    _consoleSetAttribute(serialConsole, 'data-linefeed-cssclass', data_linefeed_cssclass);
    _consoleSetAttribute(serialConsole, 'dataname-combo', dataname_combo);
    _consoleSetAttribute(serialConsole, 'data-position', data_position);

    _consoleSetAttribute(serialConsole, 'prefixed', prefixed);
    _consoleSetAttribute(serialConsole, 'recv-prefix', recv_prefix);
    _consoleSetAttribute(serialConsole, 'recv-prefix-only', recv_prefix_only);
    _consoleSetAttribute(serialConsole, 'recv-prefix-color', recv_prefix_color);
    _consoleSetAttribute(serialConsole, 'recv-prefix-cssclass', recv_prefix_cssclass);
    _consoleSetAttribute(serialConsole, 'snd-prefix', snd_prefix);
    _consoleSetAttribute(serialConsole, 'snd-prefix-only', snd_prefix_only);
    _consoleSetAttribute(serialConsole, 'snd-prefix-color', snd_prefix_color);
    _consoleSetAttribute(serialConsole, 'snd-prefix-cssclass', snd_prefix_cssclass);

    _consoleSetAttribute(serialConsole, 'suffixed', suffixed);
    _consoleSetAttribute(serialConsole, 'recv-suffix', recv_suffix);
    _consoleSetAttribute(serialConsole, 'recv-suffix-only', recv_suffix_only);
    _consoleSetAttribute(serialConsole, 'recv-suffix-color', recv_suffix_color);
    _consoleSetAttribute(serialConsole, 'recv-suffix-cssclass', recv_suffix_cssclass);
    _consoleSetAttribute(serialConsole, 'snd-suffix', snd_suffix);
    _consoleSetAttribute(serialConsole, 'snd-suffix-only', snd_suffix_only);
    _consoleSetAttribute(serialConsole, 'snd-suffix-color', snd_suffix_color);
    _consoleSetAttribute(serialConsole, 'snd-suffix-cssclass', snd_suffix_cssclass);


  };

  
  // - consoleSetAttribute() - consumed by the above function
  //  R: equivalent to " serialConsole.dataset.ntfrmwrkConsole<Attribute> = '' ", but a little bit slower ( see specs )
  //  --> will be changed by dataset calls is the future ( .. )
  var _consoleSetAttribute = function(serialConsole, attribute, value){
     serialConsole.setAttribute('data-ntfrmwrk-console-'+attribute, value);
  };


  // - consoleGetAttribute() - consumed by the above function
  //  R: equivalent to " serialConsole.dataset.ntfrmwrkConsole<Attribute> ", but a little bit slower ( see specs )
  //  --> will be changed by dataset calls is the future ( .. )
  var _consoleGetAttribute = function(serialConsole, attribute){  
    return serialConsole.getAttribute('data-ntfrmwrk-console-'+attribute);
  };


  // - consoleCheckPSFx() - checks the current configuration of a console & alter the messageStr passed depending on the values of the options currently set before returning it
  var _consoleCheckPSFx = function(serialConsole){

    // CHECK PREFIXES SUPPORT
    if( _consoleGetAttribute(serialConsole, 'prefixed') == "true" ){ //console.log("[ SerialConsole ] Console1 supports prefixes !"); // if prefixes are activated
      if( _consoleGetAttribute(serialConsole, 'terminal-output') == "recvsnd" ){  // if the terminal output supports recv || snd prefixes
        
        // check if some output types are disabled ( as the current terminal supports both RECV & SND )
        if( _consoleGetAttribute(serialConsole, 'recv-prefix-only') == "false" && _consoleGetAttribute(serialConsole, 'snd-prefix-only') == "false" ){ // the console has no prefixes disabled
          // Nb / R: we could have just forgotten the above & put it below the two "if == true" checks ;p
          console.log("[ SerialConsole ] _consoleCheckPSFx:: Console1 allows both RECV & SND prefixes !");

          var recv_prefix = _consoleGetAttribute(serialConsole, 'recv-prefix'); // get recv prefix
          var recv_prefix_color = _consoleGetAttribute(serialConsole, 'recv-prefix-color'); // get recv prefix color ( nb: overwritten by the CSS class properties)
          var recv_prefix_cssclass = _consoleGetAttribute(serialConsole, 'recv-prefix-cssclass');// get recv prefix class
        
          var recv_current_prefix = '<span style="color: ' + recv_prefix_color +';" class"' + recv_prefix_cssclass + '" >' + recv_prefix + '</span> ';
          _consoleSetAttribute(serialConsole, 'recv-current-prefix', recv_current_prefix); // store it into a dataset attribute

          var snd_prefix = _consoleGetAttribute(serialConsole, 'snd-prefix'); // get snd prefix
          var snd_prefix_color = _consoleGetAttribute(serialConsole, 'snd-prefix-color'); // get snd prefix color
          var snd_prefix_cssclass = _consoleGetAttribute(serialConsole, 'snd-prefix-cssclass'); // get snd prefix class
        
          var snd_current_prefix = '<span style="color: ' + snd_prefix_color +';" class"' + snd_prefix_cssclass + '" >' + snd_prefix + '</span> ';
          _consoleSetAttribute(serialConsole, 'snd-current-prefix', snd_current_prefix); // store it into a dataset attribute 

        } else if( _consoleGetAttribute(serialConsole, 'recv-prefix-only') == "true" ){ // the console has RECV prefixes enabled & SND prefixes disabled
          console.log("[ SerialConsole ] _consoleCheckPSFx:: Console1 allows RECV prefixes only !");

          var recv_prefix = _consoleGetAttribute(serialConsole, 'recv-prefix'); // get recv prefix
          var recv_prefix_color = _consoleGetAttribute(serialConsole, 'recv-prefix-color'); // get recv prefix color ( nb: overwritten by the CSS class properties)
          var recv_prefix_cssclass = _consoleGetAttribute(serialConsole, 'recv-prefix-cssclass');// get recv prefix class
        
          var recv_current_prefix = '<span style="color: ' + recv_prefix_color +';" class"' + recv_prefix_cssclass + '" >' + recv_prefix + '</span> ';
          _consoleSetAttribute(serialConsole, 'recv-current-prefix', recv_current_prefix); // store it into a dataset attribute

          _consoleSetAttribute(serialConsole, 'snd-current-prefix', ''); //  empty it

        } else if( _consoleGetAttribute(serialConsole, 'snd-prefix-only') == "true" ){ // the console has SND prefixes enabled & RECV prefixes disabled
          console.log("[ SerialConsole ] _consoleCheckPSFx:: Console1 allows SND prefixes only !");

          var snd_prefix = _consoleGetAttribute(serialConsole, 'snd-prefix'); // get snd prefix
          var snd_prefix_color = _consoleGetAttribute(serialConsole, 'snd-prefix-color'); // get snd prefix color
          var snd_prefix_cssclass = _consoleGetAttribute(serialConsole, 'snd-prefix-cssclass'); // get snd prefix class
        
          var snd_current_prefix = '<span style="color: ' + snd_prefix_color +';" class"' + snd_prefix_cssclass + '" >' + snd_prefix + '</span> ';
          _consoleSetAttribute(serialConsole, 'snd-current-prefix', snd_current_prefix); // store it into a dataset attribute

          _consoleSetAttribute(serialConsole, 'recv-current-prefix', ''); // empty it

        } else {
          console.log("[ SerialConsole ] _consoleCheckPSFx:: Console1 block all prefixes ??????? !");
        }

      
      } else if( _consoleGetAttribute(serialConsole, 'terminal-output') == "recv" ){ // if the terminal output support only recv prefix
        
        
        var recv_prefix = _consoleGetAttribute(serialConsole, 'recv-prefix'); // get recv prefix
        var recv_prefix_color = _consoleGetAttribute(serialConsole, 'recv-prefix-color'); // get recv prefix color ( nb: overwritten by the CSS class properties)
        var recv_prefix_cssclass = _consoleGetAttribute(serialConsole, 'recv-prefix-cssclass');// get recv prefix class
        /*
        var recv_formattedMessageStr = '<span style="color: ' + recv_prefix_color +';" '+
                                  'class"' + recv_prefix_cssclass + '"' + '</span> ' + messageStr; // append to the messageStr the recv prefix built using the aboves
        */
        var recv_current_prefix = '<span style="color: ' + recv_prefix_color +';" class"' + recv_prefix_cssclass + '" >' + recv_prefix + '</span> ';
        
        _consoleSetAttribute(serialConsole, 'recv-current-prefix', recv_current_prefix); // instead of the above, store it into a dataset attribute

      } else if( _consoleGetAttribute(serialConsole, 'terminal-output') == "snd" ){ // if the terminal output support only snd prefix

        var snd_prefix = _consoleGetAttribute(serialConsole, 'snd-prefix'); // get snd prefix
        var snd_prefix_color = _consoleGetAttribute(serialConsole, 'snd-prefix-color'); // get snd prefix color
        var snd_prefix_cssclass = _consoleGetAttribute(serialConsole, 'snd-prefix-cssclass'); // get snd prefix class
        /*
        var recv_formattedMessageStr = '<span style="color: ' + recv_prefix_color +';" '+
                                  'class"' + recv_prefix_cssclass + '"' + '</span> ' + messageStr; // append to the messageStr the snd prefix built using the aboves
        */
        var snd_current_prefix = '<span style="color: ' + snd_prefix_color +';" class"' + snd_prefix_cssclass + '" >' + snd_prefix + '</span> ';
        _consoleSetAttribute(serialConsole, 'snd-current-prefix', snd_current_prefix); // instead of the above, store it into a dataset attribute

      }
    
    }

    // CHECK SUFFIXES SUPPORT
    if( _consoleGetAttribute(serialConsole, 'suffixed') == "true" ){ console.log("[ SerialConsole ] Console1 supports suffixes !"); // if suffixes are activated
      if( _consoleGetAttribute(serialConsole, 'terminal-output') == "recvsnd" ){  // if the terminal output supports recv || snd suffixes
        
        // check if some output types are disabled ( as the current terminal supports both RECV & SND )
        if( _consoleGetAttribute(serialConsole, 'recv-suffix-only') == "false" && _consoleGetAttribute(serialConsole, 'snd-suffix-only') == "false" ){ // the console has no prefixes disabled
          // Nb / R: we could have just forgotten the above & put it below the two "if == true" checks ;p
          console.log("[ SerialConsole ] _consoleCheckPSFx:: Console1 allows both RECV & SND suffixes !");

          var recv_suffix = _consoleGetAttribute(serialConsole, 'recv-suffix'); // get recv suffix
          var recv_suffix_color = _consoleGetAttribute(serialConsole, 'recv-suffix-color'); // get recv suffix color ( nb: overwritten by the CSS class properties)
          var recv_suffix_cssclass = _consoleGetAttribute(serialConsole, 'recv-suffix-cssclass');// get recv suffix class
        
          var recv_current_suffix = '<span style="color: ' + recv_suffix_color +';" class"' + recv_suffix_cssclass + '" >' + recv_suffix + '</span> ';
          _consoleSetAttribute(serialConsole, 'recv-current-suffix', recv_current_suffix); // store it into a dataset attribute

          var snd_suffix = _consoleGetAttribute(serialConsole, 'snd-suffix'); // get snd suffix
          var snd_suffix_color = _consoleGetAttribute(serialConsole, 'snd-suffix-color'); // get snd suffix color
          var snd_suffix_cssclass = _consoleGetAttribute(serialConsole, 'snd-suffix-cssclass'); // get snd suffix class
        
          var snd_current_suffix = '<span style="color: ' + snd_suffix_color +';" class"' + snd_suffix_cssclass + '" >' + snd_suffix + '</span> ';
          _consoleSetAttribute(serialConsole, 'snd-current-suffix', snd_current_suffix); // store it into a dataset attribute

        } else if( _consoleGetAttribute(serialConsole, 'recv-suffix-only') == "true" ){ // the console has RECV suffixes enabled & SND suffixes disabled
          console.log("[ SerialConsole ] _consoleCheckPSFx:: Console1 allows RECV suffixes only !");

          var recv_suffix = _consoleGetAttribute(serialConsole, 'recv-suffix'); // get recv suffix
          var recv_suffix_color = _consoleGetAttribute(serialConsole, 'recv-suffix-color'); // get recv suffix color ( nb: overwritten by the CSS class properties)
          var recv_suffix_cssclass = _consoleGetAttribute(serialConsole, 'recv-suffix-cssclass');// get recv suffix class
        
          var recv_current_suffix = '<span style="color: ' + recv_suffix_color +';" class"' + recv_suffix_cssclass + '" >' + recv_suffix + '</span> ';
          _consoleSetAttribute(serialConsole, 'recv-current-suffix', recv_current_suffix); // store it into a dataset attribute

          _consoleSetAttribute(serialConsole, 'snd-current-suffix', ''); // empty it

        } else if( _consoleGetAttribute(serialConsole, 'snd-suffix-only') == "true" ){ // the console has SND suffixes enabled & RECV suffixes disabled
          console.log("[ SerialConsole ] _consoleCheckPSFx:: Console1 allows SND suffixes only !");

          var snd_suffix = _consoleGetAttribute(serialConsole, 'snd-suffix'); // get snd suffix
          var snd_suffix_color = _consoleGetAttribute(serialConsole, 'snd-suffix-color'); // get snd suffix color
          var snd_suffix_cssclass = _consoleGetAttribute(serialConsole, 'snd-suffix-cssclass'); // get snd suffix class
        
          var snd_current_suffix = '<span style="color: ' + snd_suffix_color +';" class"' + snd_suffix_cssclass + '" >' + snd_suffix + '</span> ';
          _consoleSetAttribute(serialConsole, 'snd-current-suffix', snd_current_suffix); // store it into a dataset attribute

          _consoleSetAttribute(serialConsole, 'recv-current-suffix', ''); // empty it

        } else {
          console.log("[ SerialConsole ] _consoleCheckPSFx:: Console1 block all suffixes ??????? !");
        }
        
        

      
      } else if( _consoleGetAttribute(serialConsole, 'terminal-output') == "recv" ){ // if the terminal output support only recv suffix
        
        
        var recv_suffix = _consoleGetAttribute(serialConsole, 'recv-suffix'); // get recv suffix
        var recv_suffix_color = _consoleGetAttribute(serialConsole, 'recv-suffix-color'); // get recv suffix color ( nb: overwritten by the CSS class properties)
        var recv_suffix_cssclass = _consoleGetAttribute(serialConsole, 'recv-suffix-cssclass');// get recv suffix class
        /*
        var recv_formattedMessageStr = '<span style="color: ' + recv_suffix_color +';" '+
                                  'class"' + recv_suffix_cssclass + '"' + '</span> ' + messageStr; // append to the messageStr the recv suffix built using the aboves
        */
        var recv_current_suffix = '<span style="color: ' + recv_suffix_color +';" class"' + recv_suffix_cssclass + '" >' + recv_suffix + '</span> ';
        
        _consoleSetAttribute(serialConsole, 'recv-current-suffix', recv_current_suffix); // instead of the above, store it into a dataset attribute

      } else if( _consoleGetAttribute(serialConsole, 'terminal-output') == "snd" ){

        var snd_suffix = _consoleGetAttribute(serialConsole, 'snd-suffix'); // get snd suffix
        var snd_suffix_color = _consoleGetAttribute(serialConsole, 'snd-suffix-color'); // get snd suffix color
        var snd_suffix_cssclass = _consoleGetAttribute(serialConsole, 'snd-suffix-cssclass'); // get snd suffix class
        /*
        var recv_formattedMessageStr = '<span style="color: ' + recv_suffix_color +';" '+
                                  'class"' + recv_suffix_cssclass + '"' + '</span> ' + messageStr; // append to the messageStr the snd suffix built using the aboves
        */
        var snd_current_suffix = '<span style="color: ' + snd_suffix_color +';" class"' + snd_suffix_cssclass + '" >' + snd_suffix + '</span> ';
        _consoleSetAttribute(serialConsole, 'snd-current-suffix', snd_current_suffix); // instead of the above, store it into a dataset attribute

      }
    
    }

  };


  // - formatMessage() - add the current prefix set depending on if prefixed are activated, & the same for the suffix
  //var _formatMessage = function(serialConsole, messageStr){ // old
  var _formatMessage = function(serialConsole, messageStr, messageType){
    //console.log('_formatMessage:: ' + 'Prefix currently set: ' + _consoleGetAttribute(serialConsole, 'recv-current-prefix') );
    var fake_output_type = messageType; // fake the output type by now ( will be passed like: from "consoleReceive()"||"consoleWrite()" --> appendLine --> "appendToTop()"||"appendToBottom()" to here ;D )

    var formattedMessageStr = messageStr;
    
    if( _consoleGetAttribute(serialConsole, 'prefixed') == "true" ){  // if prefixes are activated
      console.log("[ SerialConsole ] Formatting message with prefix..");

      // check the message type ( RECV or SND ), check the console recv & snd prefix "only" , & act accordingly
      if( fake_output_type == 'recv' && _consoleGetAttribute(serialConsole, 'snd-prefix-only') == "false" ){
        formattedMessageStr = _consoleGetAttribute(serialConsole, 'recv-current-prefix') + formattedMessageStr;
      } else if( fake_output_type == 'snd' && _consoleGetAttribute(serialConsole, 'recv-prefix-only') == "false" ){
        formattedMessageStr = _consoleGetAttribute(serialConsole, 'snd-current-prefix') + formattedMessageStr;
      } else {
        // recv message BUT snd prefix only --> append nothing
        // snd message BUT recv prefix only --> append nothing
      }

      /*
      // if message is RECV
      //formattedMessageStr = _consoleGetAttribute(serialConsole, 'recv-current-prefix') + formattedMessageStr;
      //console.log('_formatMessage:: ' + 'Formatted Message Str: ' + formattedMessageStr );
      
      // if message is SND
      //formattedMessageStr = _consoleGetAttribute(serialConsole, 'snd-current-prefix') + formattedMessageStr;
      //console.log('_formatMessage:: ' + 'Formatted Message Str: ' + formattedMessageStr );
      */
    }

    if( _consoleGetAttribute(serialConsole, 'suffixed') == "true" ){  // if prefixes are activated
      console.log("[ SerialConsole ] Formatting message with suffix..");
      
      if( fake_output_type == 'recv' && _consoleGetAttribute(serialConsole, 'snd-suffix-only') == "false" ){
        //formattedMessageStr = _consoleGetAttribute(serialConsole, 'recv-current-suffix') + formattedMessageStr;
        formattedMessageStr = formattedMessageStr + _consoleGetAttribute(serialConsole, 'recv-current-suffix');
      } else if( fake_output_type == 'snd' && _consoleGetAttribute(serialConsole, 'recv-suffix-only') == "false" ){
        //formattedMessageStr = _consoleGetAttribute(serialConsole, 'snd-current-suffix') + formattedMessageStr;
        formattedMessageStr = formattedMessageStr + _consoleGetAttribute(serialConsole, 'snd-current-suffix');
      } else {
        // recv message BUT snd suffix only --> append nothing
        // snd message BUT recv suffix only --> append nothing
      }

      /*
      // if message is RECV
      formattedMessageStr +=_consoleGetAttribute(serialConsole, 'recv-current-suffix');
      
      // if message is SND
      //formattedMessageStr +=_consoleGetAttribute(serialConsole, 'snd-current-suffix');
      */
    }

    return formattedMessageStr; // return message with maybe suffix and no prefix
  }; 


  // TO DO: add a fcn that handles the positionning of the name & data ( .. )
  //        write the "usingPort()", "usingBaudrate()" & "usingLinefeed()" functions
  // - formatTerminalName() - add the port, baudrate & linefeed to the displayed console name depending on whether these have been set to be displayed
  var _formatTerminalName = function(serialConsole){
    
    // the terminal name beginnig & ending parts
    var terminalName_beginning = '<span class="consolename"> ',
        terminalName_ending = ' </span>';
      // fake params to test ...
    var termName = 'default console 1', // the text to wich we'll maybe add some data into ( depending on the dataname_combo parameter )
        termPort = '/dev/ttyACM0',
        termBaud = 9600,
        termLF = 'LF';
    var formattedTermName = terminalName_beginning;
      
    var terminalName =  _consoleGetAttribute(serialConsole, 'terminal-name') || termName ,
        terminalColor = _consoleGetAttribute(serialConsole, 'name-color'),
        terminalClassName = _consoleGetAttribute(serialConsole, 'name-cssclass');
        
    formattedTermName +='<span style="color: ' + terminalColor + ';" class="' + terminalClassName + '" > ' + terminalName + ' </span>';
    
    var splitterStr = ' : '; // yup, I prefer dots to ' | '
    var added_counter = 0; // littl' hackety trick to deduce if we need to have in-between ' / '
    if( _consoleGetAttribute(serialConsole, 'show-data') == "true" ){ // the serial console is set to the serial connection settings currently in use
        formattedTermName += ' [ ';
        if( _consoleGetAttribute(serialConsole, 'dataname-combo') == "true" ){ // the serial console is set to display the data in the same location as the name of the terminal
          if( _consoleGetAttribute(serialConsole, 'data-show-port') == "true" ){ // the serial console is set to display at least the port currently in use
            var portTxt = _consoleGetAttribute(serialConsole, 'using-port') || termPort,
                portColor = _consoleGetAttribute(serialConsole, 'data-port-color'),
                portClassName = _consoleGetAttribute(serialConsole, 'data-port-cssclass');
            //if( added_counter != 0 ) formattedTermName += ' / '; // add a separator -> not needed as this is the first one, but kept for example/ neat comments to refer to later ;D
            added_counter++; // only increase the counter to indicate that an element was there before
            formattedTermName +='<span style="color: ' + portColor + ';" class="' + portClassName + '" > ' + portTxt + ' </span>';
          }
          if( _consoleGetAttribute(serialConsole, 'data-show-baudrate') == "true" ){ // the serial console is set to display at least the baudrate currently in use
            var baudTxt = _consoleGetAttribute(serialConsole, 'using-baudrate') || termBaud,
                baudColor = _consoleGetAttribute(serialConsole, 'data-baudrate-color'),
                baudClassName = _consoleGetAttribute(serialConsole, 'data-baudrate-cssclass');
            if( added_counter != 0 ) { formattedTermName += splitterStr; added_counter++; } // add a separator & increase the counter
            formattedTermName += '<span style="color: ' + baudColor + ';" class="' + baudClassName + '" > ' + baudTxt + ' </span>';
          }
          if( _consoleGetAttribute(serialConsole, 'data-show-linefeed') == "true" ){ // the serial console is set to display at least the linefeed currently in use
            var lfTxt = _consoleGetAttribute(serialConsole, 'using-linefeed') || termLF,
                lfColor = _consoleGetAttribute(serialConsole, 'data-linefeed-color'),
                lfClassName = _consoleGetAttribute(serialConsole, 'data-linefeed-cssclass');
            if( added_counter != 0 ) { formattedTermName += splitterStr; added_counter++; } // add a separator & increase the counter
            formattedTermName += '<span style="color: ' + lfColor + ';" class="' + lfClassName + '" > ' + lfTxt + ' </span>';
          }
        }
        formattedTermName += ' ] ';
    }
    formattedTermName += terminalName_ending;
      
    return formattedTermName; // return the terminal name whether or not it was added elements within
  };
    
  
  // - consoleUsingPort() - specifies the port currently in use ( used to display it in one of the corner of the serial console )
  var consoleUsingPort = function(serialConsole, currentPort){
      _consoleSetAttribute(serialConsole, 'using-port', currentPort); // update config
      _refreshConsoleDisplayedConfig(serialConsole); // refresh displayed config
  };
    
    
  // - consoleUsingBaudrate() - specifies the baudrate currently in use ( used to display it in one of the corner of the serial console )
  var consoleUsingBaudrate = function(serialConsole, currentBaudrate){
      _consoleSetAttribute(serialConsole, 'using-baudrate', currentBaudrate); // update config
      _refreshConsoleDisplayedConfig(serialConsole); // refresh displayed config
  };
    
    
  // - consoleUsingLinefeed() - specifies the linefeed currently in use ( used to display it in one of the corner of the serial console )
  var consoleUsingLinefeed = function(serialConsole, currentLinefeed){
      _consoleSetAttribute(serialConsole, 'using-linefeed', currentLinefeed); // update config
      _refreshConsoleDisplayedConfig(serialConsole); // refresh displayed config
  };
    
    
  // - refreshConsoleDisplayedConfig() - function that refreshes the serial console data displayed in the corner (ex: after the name ) after one of the above function has been called
  var _refreshConsoleDisplayedConfig = function(serialConsole){
      // find the span & change its content
      var consoleInfosSpan = serialConsole.getElementsByTagName('span')[0]; // querySelector('span.consolename');
      serialConsole.removeChild(consoleInfosSpan);
      var buff = serialConsole.getElementsByTagName('ul')[0];
      var debugFormattedName = _formatTerminalName(serialConsole);
      serialConsole.innerHTML = debugFormattedName; // ypu, a littl' bit hackish, but here it goes, flawlessly ;D
      serialConsole.appendChild(buff);
  };
    
  /* ------------------------------------- */  

  /* ---- ChromeAPI-based functions ---- */
  /* ----------------------------------- */

  /* --- ChromeAPI callback functions -- */
  /* ----------------------------------- */

  /* ********************************************************************* */

  // a Fcn that handles the 'initial setup', at Module init (..)
  function _initial_setup_module_init(){
    //initial setup config of our module
  }

  /* ************************************************************************************************************************************************ */
    
  // the module test variable
  var _module_version = '[ neatFramework_serial_console_MODULE.js v0.1a ]';
		
  // framework scope
  var neatFramework = theWindow.neatFramework || {}; // if 'neatFramework' is not defined, we make it equal to an empty object
  theWindow.neatFramework = neatFramework; // and then use it as the window.neatFramework object (..)
		
  // the Module's init Fcn
  function _initModule(){
    console.log('[ neatFramework_serial_console_MODULE.js ] : ' + 'initiating module ..'); // debug message > app is launching
    _initial_setup_module_init(); // actually init the module's 'initial setup' config/params (..)
  }
		
  // make available some fcns outside of the 'Self Executing Anonymous Function' of the module closure ..
  serial_console_module.module_version = _module_version; // attach it not directly to 'theWindow' ( > wich is defined 'upon' window (..) ), but instead to the module closure
  serial_console_module.log_module_version = log_module_version; // for sure 'll be practical ( see new _checkModule() in app_logic.js )
  // "attach" our function not directly to the "neatFramework" object this time, but to the "closure"(/empty object) of the current module, called "callbackFunctions_module"
  serial_console_module.helloWorld = _helloWorld; // note: the names of the function inside the file and the one "attached" ( callable from outside the current scope ) can be different ( .. )
  serial_console_module.helloWorld2 = helloWorld2; // another test

  /* -- tiny API -- */
  
  // "callbacks registers"
  serial_console_module.onConsoleClear = onConsoleClear;
  serial_console_module.onConsoleConfigure = onConsoleConfigure;
  serial_console_module.onConsoleCreate = onConsoleCreate;
  serial_console_module.onConsoleReceive = onConsoleReceive;
  serial_console_module.onConsoleWrite = onConsoleWrite;
  
  // API functions
  serial_console_module.consoleClear = consoleClear;
  serial_console_module.consoleConfigure = consoleConfigure;
  serial_console_module.consoleCreate = consoleCreate;
  serial_console_module.consoleCreateDefault = consoleCreateDefault;
  serial_console_module.consoleLogMessage = consoleLogMessage;
  serial_console_module.consoleReceive = consoleReceive;
  serial_console_module.consoleWrite = consoleWrite;
    
  serial_console_module.consoleUsingPort = consoleUsingPort;    
  serial_console_module.consoleUsingBaudrate = consoleUsingBaudrate;
  serial_console_module.consoleUsingLinefeed = consoleUsingLinefeed;

  // example ( complete, default ) console configuration, accessible externally ( ex: to easily & quickly have some custom configs ;p )
  // customise as: var customConfig = neatFramework.serial_console.defaultConfig
  //               customConfig.autoscroll = true, ...
  // & then pass to the "consoleCreate()" or "consoleConfigure()" function :D
  serial_console_module.defaultConfig = _console_config_default;

  /* -------------- */

  neatFramework.serial_console = serial_console_module; // note: nearly the same as above, but "one parent level up", to add our module to the "neatFramework" object ;)  


  /* ************************************************************************************************************************************************ */
  // actually init the module ..
  _initModule();
  /* ************************************************************************************************************************************************ */
		
})(window, document);
