/*
    Copyright (c) 2016, Brian Millar
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this
      list of conditions and the following disclaimer.

    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/



var mgID = 0;

function print(x) {
    document.write(x);
}
function log(x) {
    console.log(x);
}

function macgrilInit() {
    $("macgril").style.display = "none";
}

/*
function $(name) {
    var id = document.getElementById(name);
    if ((id !== null) && (id !== undefined))
        return id;
    else {
        //switch these orders
        id = document.getElementsByTagName(name);
        if ((id[0] !== null) && (id[0] !== undefined))
            return id;
        else {
            id = [];
            var arr2 = document.body.childNodes;
            var j = 0;
            for (var i = 0; i < arr2.length; i++) {
                if (arr2[i].nodeType == 1) {
                    matcher = new RegExp("(" + x + ")"); //needs work
                    if (matcher.test(arr2[i].getAttribute("class"))) {
                        id[j] = arr2[i];
                        j++;
                    }
                }
            }
            if ((id[0] !== null) && (id[0] !== undefined))
                return id;
        }
    }
    return null;
}*/

function $(name) {
    var id = document.getElementById(name);
    if ((id !== null) && (id !== undefined))
        return id;
    else return undefined;
}

function generate(x, y, z) {
    var el = document.createElement(x);
    var id;
    if (z !== null) id = z;
    else id = "macgrilID" + (mgID++);
    el.setAttribute("id", id);
    $(y).appendChild(el);
    return id;
}

function genURL(x) {
    return URL.createObjectURL(x);
}

function elementIDToggle(id, element) {
    if ($(id) !== null && $(id) !== undefined)
        $(id).removeAttribute("id");
    element.id = id;
}

function switchTabs(id1, id2) {
    $(id1).style.display = "none";
    $(id2).style.display = "block";
}

function showHideIDs(idArray, x) {
    for (var i = 0; i < idArray.length; i++) {
        if (x === "show") $(idArray[i]).style.display = "block";
        else              $(idArray[i]).style.display = "none";
    }
}

function quickShake(element, passTwo) {
    $(element).style.transition       = "0.1s transform";
    $(element).style.MozTransition    = "0.1s transform";
    $(element).style.WebkitTransition = "0.1s transform";
    $(element).style.msTransition     = "0.1s transform";
    $(element).style.transform        = "translateX(-40px)";
    $(element).style.MozTransform     = "translateX(-40px)";
    $(element).style.WebkitTransform  = "translateX(-40px)";
    $(element).style.msTransform      = "translateX(-40px)";
    var timer1 = setTimeout(
        function() {
            $(element).style.transform       = "translateX(40px)";
            $(element).style.MozTransform    = "translateX(40px)";
            $(element).style.WebkitTransform = "translateX(40px)";
            $(element).style.msTransform     = "translateX(40px)";
            var timer2 = setTimeout(
                function() {
                    clearTimeout(timer1);
                    $(element).style.transform       = "translateX(0px)";
                    $(element).style.MozTransform    = "translateX(0px)";
                    $(element).style.WebkitTransform = "translateX(0px)";
                    $(element).style.msTransform     = "translateX(0px)";
                    clearTimeout(timer2);
                    if(!passTwo) quickShake(element, true);
                }, 100);
        }, 100);
}

function lStore(x, y) {
    if (y === "del")
        window.localStorage.removeItem(x);
    else if (y !== null && y !== undefined)
        window.localStorage.setItem(x, y);
    else
        return window.localStorage.getItem(x);
}

//Needs cleanup
function fOpen(accept) {
        if (($("fOpen") !== 0) && ($("fOpen") !== undefined))
            $("macgril").removeChild($("fOpen"));
        generate("input", "macgril", "fOpen");
        $("fOpen").setAttribute("type", "file");
        if ((accept !== null) && (accept !== undefined))
            $("fOpen").setAttribute("accept", accept);
        $("fOpen").click();
        var x = window.confirm("Are you sure you want to load this file from disk?");
        if (x)
            if ($('fOpen').files[0] != undefined)
                return window.URL.createObjectURL($('fOpen').files[0]);
}

//This file contains eXastum-specific code that should be generalised ASAP
/*
function clock() {
    $("sysClock").innerHTML = "|&#160;&#160;" + fDate(true) + "&#160;&#160;|&#160;&#160;" + fTime(true) + "&#160;";
    if ($("timePanel").style.display == "block")
        updateAnalogClock();
    setTimeout("clock()", 500);
}*/

function updateAnalogClock() {
    var today = new Date();
    genCal(today, "miniCal");
    var hrs = today.getHours();
    var min = today.getMinutes();
    if (hrs > 12) hrs -= 12;
    if (hrs == 0) hrs = 12;
    min *= 6;
    hrs *= 30;
    if (min > 180) hrs += 15;
    $("minsHand").style.Transform       = "rotate(" + min + "deg)";
    $("minsHand").style.WebkitTransform = "rotate(" + min + "deg)";
    $("minsHand").style.MozTransform    = "rotate(" + min + "deg)";
    $("minsHand").style.MSTransform     = "rotate(" + min + "deg)";

    $("hourHand").style.Transform       = "rotate(" + hrs + "deg)";
    $("hourHand").style.WebkitTransform = "rotate(" + hrs + "deg)";
    $("hourHand").style.MozTransform    = "rotate(" + hrs + "deg)";
    $("hourHand").style.MSTransform     = "rotate(" + hrs + "deg)";

    $("secsHand").style.Transform       = "rotate(" + (today.getSeconds() * 6) + "deg)";
    $("secsHand").style.WebkitTransform = "rotate(" + (today.getSeconds() * 6) + "deg)";
    $("secsHand").style.MozTransform    = "rotate(" + (today.getSeconds() * 6) + "deg)";
    $("secsHand").style.MSTransform     = "rotate(" + (today.getSeconds() * 6) + "deg)";
}

var mgDate = new Date();

function fDate(natural) {
    mgDate    = new Date();
    var day   = mgDate.getDay();
    var date  = mgDate.getDate();
    var month = mgDate.getMonth();
    var year  = mgDate.getFullYear().toString();
    if (natural) {
        var days   = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var extra  = "th";
        if      (date === 1 || date === 21 || date === 31) extra = "st";
        else if (date === 2 || date === 22)                extra = "nd";
        else if (date === 3 || date === 23)                extra = "rd";
        return days[day] + " " + date + "<sup>" + extra + "</sup> " + months[month];
    }
    else {
        month++;
        if (month < 10) month = "0" + month;
        return date + "/" + month + "/" + year.charAt(2) + year.charAt(3);
    }
}

function fTime(natural) {
    mgDate      = new Date();
    var hours   = mgDate.getHours();
    var minutes = mgDate.getMinutes();
    var seconds = mgDate.getSeconds();
    if (hours < 10)   hours   = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    if (natural) {
        var tick = " ";
        if (seconds % 2 === 0) tick = ":";
        return hours + tick + minutes;
    }
    else return hours + ":" + minutes + ":" + seconds;
}

function genCal(dateObj,cal) {
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isLeapYear(dateObj.getFullYear()))
        monthDays[1] = 29;
    var calStr = "";
    $(cal).innerHTML = calStr;
    for (var i = 0; i < 5; i++) {
        calStr += "<tr>";
        for (var j = 1; j <= 7; j++) {
            var tempDay = j + (7 * i);
            if (tempDay <= monthDays[dateObj.getMonth()]) {
                calStr += "<td";
                if (dateObj.getDate() === tempDay)
                    calStr += " style='border-width:1px; border-style:solid;' ";
                calStr += ">" + (j + (7 * i)) + "</td>";
            }
            else calStr += "&#160;";
        }
        calStr += "</tr>";
    }
    $(cal).innerHTML = calStr;
}

//May be incorrect, please revisit
function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0 && year % 400 === 0)
            return true;
        else
            return false;
    }
    return false;
}

function formatTime(s) {
    var timeModFloor = Math.floor(s % 60);
    var timeDiv      = s / 60;

    var mins  = Math.floor(timeDiv);
    var secs  = timeModFloor;
    var hours = null;

    if (mins > 60) {
        hours = Math.floor(timeDiv / 60);
        mins  = Math.floor(timeDiv % 60);
    }

    if (secs < 10) secs = "0" + secs;
    if (mins < 10) mins = "0" + mins;

    if (isNaN(mins) || isNaN(secs))
        return "00<span style='font-family:monospace'>:</span>00";
    else {
        if (hours !== null)
            return hours + "<span style='font-family:monospace'>:</span>" + mins + "<span style='font-family:monospace'>:</span>" + secs;
        else
            return mins + "<span style='font-family:monospace'>:</span>" + secs;
    }
}

//eXastum Specific Code

function clock() {
    $("sysClock").innerHTML = "|&#160;&#160;" + fDate(true) + "&#160;&#160;|&#160;&#160;" + fTime(true) + "&#160;";
    if ($("timePanel").style.display === "block")
        updateAnalogClock();
    setTimeout("clock()", 500);
}

function updateAnalogClock() {
    var today = new Date();
    genCal(today, "miniCal");
    var hrs = today.getHours();
    var min = today.getMinutes();
    if (hrs > 12)  hrs -= 12;
    if (hrs === 0) hrs = 12;
    min *= 6;
    hrs *= 30;
    if (min > 180) hrs += 15;
    $("minsHand").style.Transform       = "rotate(" + min + "deg)";
    $("minsHand").style.WebkitTransform = "rotate(" + min + "deg)";
    $("minsHand").style.MozTransform    = "rotate(" + min + "deg)";
    $("minsHand").style.MSTransform     = "rotate(" + min + "deg)";

    $("hourHand").style.Transform       = "rotate(" + hrs + "deg)";
    $("hourHand").style.WebkitTransform = "rotate(" + hrs + "deg)";
    $("hourHand").style.MozTransform    = "rotate(" + hrs + "deg)";
    $("hourHand").style.MSTransform     = "rotate(" + hrs + "deg)";

    $("secsHand").style.Transform       = "rotate(" + (today.getSeconds() * 6) + "deg)";
    $("secsHand").style.WebkitTransform = "rotate(" + (today.getSeconds() * 6) + "deg)";
    $("secsHand").style.MozTransform    = "rotate(" + (today.getSeconds() * 6) + "deg)";
    $("secsHand").style.MSTransform     = "rotate(" + (today.getSeconds() * 6) + "deg)";
}

function notify(notifier, msg, timeout) {
    notifier.innerText     = msg;
    notifier.style.display = "block";
    setTimeout(function () {notifier.style.display = "none";}, timeout);
}

function onStrikeEnter(func, ev, prvnt) {
    if ((ev.which === 13) || (ev.keyCode === 13)) {
        if (prvnt)
            ev.preventDefault();
        return (eval(func));
    }
}

/*
 * The knobLogic function handles setting values based on the rotation of a knob
 * The knob variable is an object reference to the turning knob element in the page
 * The ev variable is the mousedown event when the knob is clicked
 * The func variable is the function that will receive the knob value as a parameter
 * while the knob is turned.
 */

function knobLogic(knob, ev, func) {
    var startPos    = ev.clientY;
    var newPos      = startPos;
    var startingRot = knob.style.MozTransform;
    var startRot    = "";

    for (var i = 0; i < startingRot.length; i++)
        if (!isNaN(startingRot[i]))
            startRot = startRot + startingRot[i];

    document.onmousemove = function(ev) {
        var rotation = parseInt(startRot);
        newPos       = rotation + parseInt(startPos - ev.clientY);
        if (newPos > 120)  newPos = 120;
        if (newPos < -120) newPos = -120;
        //Add cross-browser support here
        knob.style.MozTransform   = "rotate(" + newPos + "deg)";
        rotation = 0;
        if ((func !== null) && (func !== undefined))
            func(newPos);
        document.onmouseup = function(ev) {
            newPos   = null;
            startPos = null;
            document.onmousemove = null;
            document.onmouseup   = null;
            return newPos;
        };
    };
}

//Check Behaviour
function randNum(x, y) {
    return (Math.random() * x).toFixed(y);
}

function consoleInit(console) {
    $(console).setAttribute("onkeypress", "onStrikeEnter('runConsoleCommand($(\\'" + console + "\\').value, $(\\'" + console + "\\'))',event,true);");
    $(console).focus();
}

function consoleOut(msg,console) {
    $(console).value = msg + "\n";
}

function runConsoleCommand(cmd,console) {
    eval(cmd);
    console.value = console.value + "\n";
    console.focus();
}

//TODO
function validateEmail(fieldId, validCol, invalidCol) {
    var patt = new RegExp("(.*)(\@)(.*)[.][a-z]{2,3}$");

    if (patt.test($(fieldId).value)) {
        $(fieldId).style.color = validCol;
        return true;
    } else {
        $(fieldId).style.color = invalidCol;
        return false;
    }
}

function validateCreditCard(fieldId, validCol, invalidCol) {
    var patt = new RegExp("^\\d{4}[-]\\d{4}[-]\\d{4}[-]\\d{4}$");

    var p1 = new RegExp("^\\d{4}$");
    var p2 = new RegExp("^\\d{4}[-]\\d{4}$");
    var p3 = new RegExp("^\\d{4}[-]\\d{4}[-]\\d{4}$");

    if (p1.test($(fieldId).value) || p2.test($(fieldId).value) || p3.test($(fieldId).value))
        $(fieldId).value = $(fieldId).value + "-";

    if (patt.test($(fieldId).value)) {
        $(fieldId).style.color = validCol;
        return true;
    } else {
        $(fieldId).style.color = invalidCol;
        return false;
    }
}

function initAudioSystem() {
    sysAudioContext   = new AudioContext();
    sysAudioAnalyser  = sysAudioContext.createAnalyser();
    sysAudioAnalyser2 = sysAudioContext.createAnalyser();
    sysAudioGain      = sysAudioContext.createGain();
    sysAudioGain.gain.value   = 0.5;
    sysAudioAnalyser.fftSize  = 128;
    sysAudioAnalyser2.fftSize = 128;
    sysAudioAnalyser.smoothingTimeConstant  = 0.3;
    sysAudioAnalyser2.smoothingTimeConstant = 0.9;
    sysAudioAnalyser.connect(sysAudioGain);
    sysAudioAnalyser2.connect(sysAudioGain);
    sysAudioGain.connect(sysAudioContext.destination);
}

function addAudioSource(src) {
    var audioSource = sysAudioContext.createMediaElementSource(src);
    audioSource.connect(sysAudioAnalyser);
    audioSource.connect(sysAudioAnalyser2);
}

function setSysVol(level) {
    sysAudioGain.gain.value = (level + 120) * 0.004166667;
}

function seek(src, x) {
    src.currentTime = x;
}

function startAudioVisualization(element, width, height) {
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 100);

    camera.position.set(0, 0, 50);
    camera.lookAt(scene.position);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});

    renderer.setSize(width, height);
    $(element).appendChild(renderer.domElement);

    bars = new Array(new Array(40), new Array(40), new Array(40));

    var j = -50.0;
    for (var i = 0; i < 64; i++) {
        bars[2][i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.2, 0.5), new THREE.MeshBasicMaterial({color:0x9F42C2})); //Wave
        bars[1][i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.2, 0.5), new THREE.MeshBasicMaterial({color:0x55B25B})); //Bars
        bars[0][i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.2, 0.5), new THREE.MeshBasicMaterial({color:0xFF7446})); //Tips
        bars[2][i].position.set(j, 10, 0);
        bars[1][i].position.set(j, -20.5, 0);
        bars[0][i].position.set(j, -20.5, 0);
        j += (0.7 * 2);
        scene.add(bars[1][i]);
        scene.add(bars[0][i]);
        scene.add(bars[2][i])
    }
    visualData = new Array(new Uint8Array(128), new Uint8Array(64), new Uint8Array(64));
    visualize();
}

function visualize() {
    sysAudioAnalyser2.getByteTimeDomainData(visualData[2]);
    sysAudioAnalyser2.getByteFrequencyData(visualData[0]);
    sysAudioAnalyser.getByteFrequencyData(visualData[1]);
    var data;
    for (var i = 0; i < 64; i++) {
        bars[2][i].position.y = ((visualData[2][i] - 128) / 5) + 10;
        data = (visualData[1][i] / 8);
        bars[1][i].position.y = (data / 4) - 20.5;
        bars[1][i].scale.y = data;
        bars[0][i].position.y = ((visualData[0][i] / 8) / 2) - 20.5;
        if (bars[0][i].scale.y === 0)
            bars[0][i].scale.y = 0.1;
        if (bars[1][i].scale.y === 0)
            bars[1][i].scale.y = 0.1;
        if (bars[2][i].scale.y === 0)
            bars[2][i].scale.y = 0.1;
    }
    setTimeout(requestAnimationFrame(visualize));
    renderer.render(scene, camera);
}

function newWindow(x, y, title, content, resize, min, max) {
    if((max === null) || (max === undefined)) max = true;
    if((min === null) || (min === undefined)) min = true;
    var newWindow = generate("div",  "windowSystem");
    var titleBar  = generate("span", newWindow);
    var windowTab = newTab(title);
    $(newWindow).setAttribute("class", "window");
    $(newWindow).setAttribute("onmouseover", "updateInfoBar('" + title + "');");
    $(newWindow).style.width   = parseInt(x) + 2  + "px";
    $(newWindow).style.height  = parseInt(y) + 32 + "px";
    $(newWindow).style.resize  = resize;
    $(newWindow).style.left    = randNum(600, 0) + "px";
    $(newWindow).style.top     = (parseInt(randNum(200, 0)) + 25) + "px";
    $(newWindow).style.display = "block";
    $(titleBar).style.width    = x;
    if(content !== null) {
        var appContent = generate("iframe", newWindow);
        $(appContent).setAttribute("src", content);
        $(appContent).setAttribute("class", "app");
    }
    var minString = "";
    var maxString = "";
    if(min)
        minString = "<img draggable=\"false\" ondragstart=\"return false;\" src=\"sys/skins/" +
                    lStore("skin") + "/ui/min.png\" onmouseover=\"this.src='sys/skins/" +
                    lStore("skin") + "/ui/minHover.png';\" onmouseout=\"this.src='sys/skins/" +
                    lStore("skin") + "/ui/min.png';\" onmousedown=\"this.src='sys/skins/" +
                    lStore("skin") + "/ui/minDown.png';\" onmouseup=\"this.src='sys/skins/" +
                    lStore("skin") + "/ui/min.png';\" class=\"minButton\" onclick=\"minMaxWindow('" +
                    newWindow + "','" + windowTab + "')\"/>";

    if(max)
        maxString = "<img draggable=\"false\" ondragstart=\"return false;\" src=\"sys/skins/" +
            lStore("skin") + "/ui/max.png\" onmouseover=\"this.src='sys/skins/" +
            lStore("skin") + "/ui/maxHover.png';\" onmouseout=\"this.src='sys/skins/" +
            lStore("skin") + "/ui/max.png';\" onmousedown=\"this.src='sys/skins/" +
            lStore("skin") + "/ui/maxDown.png';\" onmouseup=\"this.src='sys/skins/" +
            lStore("skin") + "/ui/max.png';\" class=\"maxButton\" onclick=\"maxRestoreWindow('" +
            newWindow + "','" + windowTab + "')\"/>";

    $(titleBar).innerHTML = "<span class='titleBarText'>" + title + "</span>" +
                            "<img draggable=\"false\" ondragstart=\"return false;\" src=\"sys/skins/" +
                            lStore("skin") + "/ui/close.png\" onmouseover=\"this.src='sys/skins/" +
                            lStore("skin") + "/ui/closeHover.png';\" onmouseout=\"this.src='sys/skins/" +
                            lStore("skin") + "/ui/close.png';\" onmousedown=\"this.src='sys/skins/" +
                            lStore("skin") + "/ui/closeDown.png';\" onmouseup=\"this.src='sys/skins/" +
                            lStore("skin") + "/ui/close.png';\" class=\"closeButton\" onclick=\"destroyWindow('" +
                            newWindow + "','" + windowTab + "')\"/>" + maxString + minString;

    $(titleBar).setAttribute("class", "titleBar");
    $(titleBar).setAttribute("onmousedown", "dragWindow('" + newWindow + "', event);");
    $(windowTab).setAttribute("onclick", "minMaxWindow('" + newWindow + "','" + windowTab + "')");

    return newWindow;
}

function destroyWindow(winID, tabID) {
    $(winID).remove();
    $(tabID).remove();
}

function minMaxWindow(winID, tabID) {
    if ($(winID).style.display === "block") {
        $(winID).style.display =  "none";
        $(tabID).style.backgroundImage = "URL('sys/skins/" + lStore("skin") + "/ui/backing_up.png')";
        document.onmousemove = function() {return false};
    }
    else {
        $(winID).style.display = "block";
        $(tabID).style.backgroundImage = "URL('sys/skins/" + lStore("skin") + "/ui/backing_down.png')";
    }
}

function maxWindow(winID) {
    lStore(winID + "Width",  $(winID).style.width);
    lStore(winID + "Height", $(winID).style.height);
    lStore(winID + "Left",   $(winID).style.left);
    lStore(winID + "Top",    $(winID).style.top);
    document.onmousemove  =  function() {return false};
    $(winID).style.top    =  "22px";
    $(winID).style.left   =  "0px";
    $(winID).style.width  =  "100%";
    $(winID).style.height =  "calc(100% - 44px)";
    $(winID).style.borderLeftStyle         = "none";
    $(winID).style.borderRightStyle        = "none";
    $(winID).style.borderTopLeftRadius     = "0px";
    $(winID).style.borderTopRightRadius    = "0px";
    $(winID).style.borderBottomLeftRadius  = "0px";
    $(winID).style.borderBottomRightRadius = "0px";
}

function restoreWindow(winID) {
    $(winID).style.width  = lStore(winID + "Width");
    $(winID).style.height = lStore(winID + "Height");
    $(winID).style.top    = lStore(winID + "Top");
    $(winID).style.left   = lStore(winID + "Left");
    lStore(winID + "Width",  "del");
    lStore(winID + "Height", "del");
    lStore(winID + "Left",   "del");
    lStore(winID + "Top",    "del");
    $(winID).style.borderLeftStyle         = "solid";
    $(winID).style.borderRightStyle        = "solid";
    $(winID).style.borderTopLeftRadius     = "20px";
    $(winID).style.borderTopRightRadius    = "20px";
    $(winID).style.borderBottomLeftRadius  = "16px";
    $(winID).style.borderBottomRightRadius = "16px";
}

function maxRestoreWindow(winID) {
    document.onmousemove = function() {return false};
    if(lStore(winID + "Width") !== null)
        restoreWindow(winID);
    else maxWindow(winID);
}

function dragWindow(appWindow,ev) {
    positionLeft = parseInt($(appWindow).style.left);
    positionTop  = parseInt($(appWindow).style.top);
    xcoor        = ev.clientX;
    ycoor        = ev.clientY;

    document.onmousemove = function(ev) {
        if($(appWindow) === undefined)
            return false;

        var leftdist    =  positionLeft + ev.clientX - xcoor;
        var topdist     =  positionTop  + ev.clientY - ycoor;

        if(topdist  < 33) topdist  = "23";
        if(leftdist < 10) leftdist = "0";

        if((leftdist === 0) && (topdist == 23))
            $(appWindow).style.borderTopLeftRadius = "0px";
        else
            $(appWindow).style.borderTopLeftRadius = "20px";

        $(appWindow).style.opacity = 0.7;
        $(appWindow).style.top     = topdist  + "px";
        $(appWindow).style.left    = leftdist + "px";

        document.onmouseup = function(ev) {
            $(appWindow).style.opacity = 1.0;
            document.onmousemove       = function() {return false};
            document.onmouseup         = function() {return false};
            leftdist                   = null;
            topdist                    = null;
            xcoor                      = null;
            ycoor                      = null;
            return false;
        }
    }
}

function newTab(title) {
    var newTab          = generate("span", "sysTasks");
    $(newTab).innerHTML = title;
    $(newTab).setAttribute("class", "workTab");
    return newTab;
}
