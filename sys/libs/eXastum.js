function eX_startScrSav() {
    clearTimeout(eX_scrsav_tmr);
    $("screenSaver").style.display = "block";
    eX_scrSavMove();
}

function eX_scrSavMove() {
    var x = Math.floor(Math.random() * (window.innerWidth  - 300)) + "px";
    var y = Math.floor(Math.random() * (window.innerHeight - 100)) + "px";
    $("scrSavLogo").style.top  = y;
    $("scrSavLogo").style.left = x;
    eX_scrsav_move_tmr = setTimeout(eX_scrSavMove, 3000);
}

function eX_clearScrSav() {
    $("screenSaver").style.display = "none";
    clearTimeout(eX_scrsav_move_tmr);
    eX_scrsav_tmr = setTimeout(eX_startScrSav, 5000);
}

function eX_mainMenu() {
    if ($("mainMenu").style.display == "block")
        $("mainMenu").style.display = "none";
    else
        $("mainMenu").style.display = "block";
}

function eX_showDock() {
    $("dock").style.bottom = "30px";
}

function eX_runSetup() {
    $("overlay").style.display = "block";
    $("setup").style.display = "block";
}

function eX_setupNext() {
    var steps = 5;
    $("setupProgress").value += 100 / steps;
    if ($("setupProgress").value == ((100 / steps) * 1)) {
        $("currentSetupStage").innerHTML = "<h1>Setup Local Database</h1><p>eXastum uses IndexedDB to store data locally on your machine. This database will be set up now.</p><br/>"
        var dbOpenRequest = indexedDB.open("eXastum", 1);

        dbOpenRequest.onupgradeneeded = function (e) {
            e.target.result.createObjectStore("eXObjStore");
        }

        dbOpenRequest.onsuccess = function () {
            $("currentSetupStage").innerHTML += "<h3 style='color:green;'>Successfully Created Database</h3>";
        }
    } else if ($("setupProgress").value == ((100 / steps) * 2)) {
        $("currentSetupStage").innerHTML = "<h1>Setup User Account</h1>";
    } else if ($("setupProgress").value == 100) {
        $("setupNextButton").innerText = "Finish";
        mg_lStore("firstUse", "false");
        $("setupNextButton").setAttribute("onclick", "location.reload()");
    }
}

function eX_systemReset() {
    mg_lStore("firstUse", "del");
}

function eX_launchApp(appName) {
    eX_loadManifest("sys/apps/" + appName + "/manifest.json");
    eX_spawnWindow(300, 250, appName, "sys/apps/" + appName + "/index.html", "horizontal", true, true);
}

function eX_loadManifest(appName) {
}

function eX_clockLoop() {
    $("clock").innerText = " | " + mg_fDate() + " | " + mg_fTime();
    setTimeout(eX_clockLoop, 500);
}
