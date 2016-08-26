function eX_spawnWindow(x, y, title, content, icon, resize, min, max, use_sys_skin) {
    if((max === null) || (max === undefined)) max = true;
    if((min === null) || (min === undefined)) min = true;
    var newWindow = mg_generate("div", "windowSystem");
    var titleBar  = mg_generate("span", newWindow);
    var actionButtons = mg_generate("div", newWindow);
    var windowTab = eX_newTab(title);
    if (resize) {
        var resizeHandle = mg_generate("span", newWindow);
        $(resizeHandle).setAttribute("class", "rhandle");
        $(resizeHandle).addEventListener("mousedown", function (event) {eX_resizeWindow(newWindow, event);})
    }
    $(actionButtons).setAttribute("class", "actionButtons");
    $(newWindow).setAttribute("class", "window");
    $(newWindow).style.minWidth  = parseInt(x) + 2  + "px";
    $(newWindow).style.minHeight = parseInt(y) + 32 + "px";
    $(newWindow).style.left      = mg_randNum(600, 0) + "px";
    $(newWindow).style.top       = (parseInt(mg_randNum(200, 0)) + 25) + "px";
    $(newWindow).style.display   = "block";
    $(titleBar).style.width      = $(newWindow).style.width;
    if(content !== null) {
        var appContent = mg_generate("iframe", newWindow);
        $(appContent).setAttribute("src", content);
        $(appContent).setAttribute("class", "app");
        $(appContent).addEventListener("load", function () {
                var appDoc  = $(this.id).contentWindow.document;
                var eX_exit = "function eX_exit() {window.parent.$(tabID).remove(); window.parent.$(windowID).remove();}";
                var mg_elm  = appDoc.createElement("div");
                var style1  = appDoc.createElement("link");
                var style2  = appDoc.createElement("link");
                var script1 = appDoc.createElement("script");
                var script2 = appDoc.createElement("script");
                var script3 = appDoc.createElement("script");
                script1.innerText = "var windowID = '"   + newWindow  +
                                    "'; var frameID = '" + appContent +
                                    "'; var tabID = '"   + windowTab  +
                                    "'; "            + eX_exit;
                script2.setAttribute("src", "../../libs/macgril.js");
                script2.setAttribute("id", "mg_lib");
                script3.innerText = "init()";
                if (use_sys_skin) {
                    style1.setAttribute("rel", "stylesheet");
                    style2.setAttribute("rel", "stylesheet");
                    style1.setAttribute("type", "text/css");
                    style2.setAttribute("type", "text/css");
                    style1.setAttribute("href", "../../ui/reset.css");
                    style2.setAttribute("href", "../../ui/layout.css");
                    appDoc.head.appendChild(style1);
                    appDoc.head.appendChild(style2);
                }
                mg_elm.setAttribute("id", "macgril");
                appDoc.body.appendChild(mg_elm);
                appDoc.getElementById("macgril").appendChild(script2);
                appDoc.getElementById("mg_lib").addEventListener("load", function () {
                    appDoc.head.appendChild(script1);
                    appDoc.getElementById("macgril").appendChild(script3);
                });
        });
    }
    var minString = "";
    var maxString = "";
    if(min)
        minString = "<button class=\"minButton\" onclick=\"eX_minMaxWindow('" + newWindow + "','" + windowTab + "')\">_</button>";
    if(max)
        maxString = "<button class=\"maxButton\" onclick=\"eX_maxRestoreWindow('" + newWindow + "','" + windowTab + "')\">&#9633;</button>";

    $(actionButtons).innerHTML = "<button class=\"closeButton\" onclick=\"eX_destroyWindow('" + newWindow + "','" + windowTab + "')\">&#9747;</button>" + maxString + minString;
    $(titleBar).innerHTML = "<span class='titleBarText'><img class='appTitleBarIcon' src='" + icon + "'/>" + title + "</span>";
    $(titleBar).setAttribute("class", "titleBar");
    $(titleBar).setAttribute("onmousedown", "eX_dragWindow('" + newWindow + "', event);");
    $(windowTab).setAttribute("onclick", "eX_minMaxWindow('" + newWindow + "','" + windowTab + "')");

    return newWindow;
}

function eX_destroyWindow(winID, tabID) {
    $(tabID).remove();
    $(winID).remove();
}

function eX_minMaxWindow(winID, tabID) {
    if ($(winID).style.display === "block") {
        $(winID).style.display =  "none";
        $(tabID).style.backgroundImage = "URL('sys/skins/" + mg_lStore("skin") + "/ui/backing_up.png')";
        document.onmousemove = function() {return false};
    }
    else {
        $(winID).style.display = "block";
        $(tabID).style.backgroundImage = "URL('sys/skins/" + lStore("skin") + "/ui/backing_down.png')";
    }
}

function eX_maxWindow(winID) {
    eX_saveWindowState(winID);
    $(winID).style.top    = "22px";
    $(winID).style.left   = "0px";
    $(winID).style.width  = "100%";
    $(winID).style.height = "calc(100% - 44px)";
}

function eX_restoreWindow(winID) {
    $(winID).style.width  = mg_lStore(winID + "Width");
    $(winID).style.height = mg_lStore(winID + "Height");
    $(winID).style.top    = mg_lStore(winID + "Top");
    $(winID).style.left   = mg_lStore(winID + "Left");
    mg_lStore(winID + "Width",  "del");
    mg_lStore(winID + "Height", "del");
    mg_lStore(winID + "Left",   "del");
    mg_lStore(winID + "Top",    "del");
}

function eX_maxRestoreWindow(winID) {
    if (mg_lStore(winID + "Width") !== null && mg_lStore(winID + "Width") !== undefined)
        eX_restoreWindow(winID);
    else eX_maxWindow(winID);
}

function eX_saveWindowState(winID) {
    mg_lStore(winID + "Width",  $(winID).style.width);
    mg_lStore(winID + "Height", $(winID).style.height);
    mg_lStore(winID + "Left",   $(winID).style.left);
    mg_lStore(winID + "Top",    $(winID).style.top);
}

function eX_dragWindow(appWindow, ev) {
    positionLeft = parseInt($(appWindow).style.left);
    positionTop  = parseInt($(appWindow).style.top);
    xcoor        = ev.clientX;
    ycoor        = ev.clientY;
    var overlay  = mg_generate("div", appWindow);
    $(overlay).setAttribute("class", "windowOverlay");

    window.onmousemove = function(ev) {
        if($(appWindow) === undefined)
            return false;

        var leftdist = (positionLeft + ev.clientX) - xcoor;
        var topdist  = (positionTop  + ev.clientY) - ycoor;

        var sysWidth  = window.innerWidth;
        var sysHeight = window.innerHeight;

        var appWidth  = $(appWindow).scrollWidth;
        var appHeight = $(appWindow).scrollHeight;

        if(topdist < 32)
            topdist = "22";
        else if (topdist > (sysHeight - (appHeight + 32)))
            topdist = sysHeight - (appHeight + 22);

        if(leftdist < 10)
            leftdist = "0";
        else if (leftdist > (sysWidth - (appWidth + 10)))
            leftdist = sysWidth - appWidth;


        $(appWindow).style.opacity = 0.7;
        $(appWindow).style.top     = topdist  + "px";
        $(appWindow).style.left    = leftdist + "px";

        window.onmouseup = function(ev) {
            $(overlay).remove();
            $(appWindow).style.opacity = 1.0;
            window.onmousemove         = function() {return false};
            window.onmouseup           = function() {return false};
            leftdist                   = null;
            topdist                    = null;
            xcoor                      = null;
            ycoor                      = null;
            return false;
        }
    }
}

function eX_resizeWindow(win, ev) {
    var startWidth  = $(win).scrollWidth;
    var startHeight = $(win).scrollHeight;
    xcoor = ev.clientX;
    ycoor = ev.clientY;

    var overlay  = mg_generate("div", win);
    $(overlay).setAttribute("class", "windowOverlay");

    window.onmousemove = function(ev) {
        if($(win) === undefined)
            return false;

        $(win).style.opacity = 0.7;
        $(win).style.width  = startWidth  + (ev.clientX - xcoor) + "px";
        $(win).style.height = startHeight + (ev.clientY - ycoor) + "px";

        window.onmouseup = function(ev) {
            $(overlay).remove();
            $(win).style.opacity = 1.0;
            xcoor                      = null;
            ycoor                      = null;
            window.onmousemove         = function() {return false};
            window.onmouseup           = function() {return false};
            return false;
        }
    }
}

function eX_newTab(title) {
    var newTab          = mg_generate("span", "sysTasks");
    $(newTab).innerHTML = title;
    $(newTab).setAttribute("class", "workTab");
    return newTab;
}
