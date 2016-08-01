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

var mgID;
var mgDate;

function mg_init() {
    mgID = 0;
    mgDate = new Date();
    $("macgril").style.display = "none";
}

function mg_print(x) {
    document.write(x);
}
function mg_log(x) {
    console.log(x);
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

function mg_generate(x, y, z) {
    var el = document.createElement(x);
    var id;
    if (z !== null && z !== undefined) id = z;
    else id = "macgrilID" + (mgID++);
    el.setAttribute("id", id);
    $(y).appendChild(el);
    return id;
}

function mg_genURL(x) {
    return URL.createObjectURL(x);
}

function mg_elementIDToggle(id, element) {
    if ($(id) !== null && $(id) !== undefined)
        $(id).removeAttribute("id");
    element.id = id;
}

function mg_switchTabs(id1, id2) {
    $(id1).style.display = "none";
    $(id2).style.display = "block";
}

function mg_showHideIDs(idArray, x) {
    for (var i = 0; i < idArray.length; i++) {
        if (x === "show") $(idArray[i]).style.display = "block";
        else              $(idArray[i]).style.display = "none";
    }
}

function mg_quickShake(element, passTwo) {
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
                    if(!passTwo) mg_quickShake(element, true);
                }, 100);
        }, 100);
}

function mg_lStore(x, y) {
    if (y === "del")
        window.localStorage.removeItem(x);
    else if (y !== null && y !== undefined)
        window.localStorage.setItem(x, y);
    else
        return window.localStorage.getItem(x);
}

//Needs cleanup
function mg_fOpen(func, accept) {
        if (($("fOpen") !== 0) && ($("fOpen") !== undefined))
            $("macgril").removeChild($("fOpen"));
        mg_generate("input", "macgril", "fOpen");
        $("fOpen").setAttribute("type", "file");
        if ((accept !== null) && (accept !== undefined))
            $("fOpen").setAttribute("accept", accept);
        $("fOpen").click();
        $("fOpen").addEventListener("change", function () {
            func(window.URL.createObjectURL($('fOpen').files[0]))
            }
        );
}

//This file contains eXastum-specific code that should be generalised ASAP
/*
function clock() {
    $("sysClock").innerHTML = "|&#160;&#160;" + fDate(true) + "&#160;&#160;|&#160;&#160;" + fTime(true) + "&#160;";
    if ($("timePanel").style.display == "block")
        updateAnalogClock();
    setTimeout("clock()", 500);
}*/

function mg_updateAnalogClock() {
    mgDate = new Date();
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

function mg_fDate(natural) {
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

function mg_fTime(natural) {
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

function mg_genCal(dateObj,cal) {
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mg_isLeapYear(dateObj.getFullYear()))
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

function mg_isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0 && year % 400 === 0)
            return true;
        else
            return false;
    }
    return false;
}

function mg_formatTime(s) {
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

function mg_clock() {
    $("sysClock").innerHTML = "|&#160;&#160;" + mg_fDate(true) + "&#160;&#160;|&#160;&#160;" + mg_fTime(true) + "&#160;";
    if ($("timePanel").style.display === "block")
        updateAnalogClock();
    setTimeout("clock()", 500);
}

function mg_notify(notifier, msg, timeout) {
    notifier.innerText     = msg;
    notifier.style.display = "block";
    setTimeout(function () {notifier.style.display = "none";}, timeout);
}

function mg_onStrikeEnter(func, ev, prvnt) {
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

function mg_knobLogic(knob, ev, func) {
    var startPos    = ev.clientY;
    var newPos      = startPos;
    var startingRot = knob.style.MozTransform;
    var startRot    = "";

    for (var i = 0; i < startingRot.length; i++)
        if (!isNaN(startingRot[i]))
            startRot = startRot + startingRot[i];

    document.onmousemove = function(ev) {
        var rotation = parseInt(startRot);
        newPos = rotation + parseInt(startPos - ev.clientY);
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
function mg_randNum(x, y) {
    return (Math.random() * x).toFixed(y);
}

function mg_consoleInit(console) {
    $(console).setAttribute("onkeypress", "onStrikeEnter('runConsoleCommand($(\\'" + console + "\\').value, $(\\'" + console + "\\'))',event,true);");
    $(console).focus();
}

function mg_consoleOut(msg,console) {
    $(console).value = msg + "\n";
}

function mg_runConsoleCommand(cmd,console) {
    eval(cmd);
    console.value = console.value + "\n";
    console.focus();
}

function mg_validateEmail(fieldId, validCol, invalidCol) {
    var patt = new RegExp("(.*)(\@)(.*)[.][a-z]{2,3}$");

    if (patt.test($(fieldId).value)) {
        $(fieldId).style.color = validCol;
        return true;
    } else {
        $(fieldId).style.color = invalidCol;
        return false;
    }
}

function mg_validateCreditCard(fieldId, validCol, invalidCol) {
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
