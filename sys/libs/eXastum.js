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
    eX_scrsav_tmr = setTimeout(eX_startScrSav, eX_scrSavTime);
}

function eX_mainMenu() {
    if ($("mainMenu").style.display == "block") {
        $("mainMenu").style.display = "none";
        $("menuButton").src = "sys/ui/skins/default/imgs/menuIcon.png";
    }
    else {
        $("mainMenu").style.display = "block";
        $("menuButton").src = "sys/ui/skins/default/imgs/menuPress.png";
        var list = "";
        var apps = JSON.parse(mg_lStore("eX_apps"));
        console.log(apps.music);
        var app;
        for (app in apps)
            list += "<li onclick=\"eX_launchApp('" + app + "')\">" + apps[app].name + "</li>";
        $("appsList").innerHTML = list;
    }
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
        var terminal = {
            name: "Terminal",
            desc: "The eXastum system terminal emulator",
            url:  "sys/apps/terminal/index.html"
        };

        var music = {
            name: "eXastum Music",
            desc: "The eXastum Music Application",
            url:  "sys/apps/music/index.html"
        };

        var eX_apps = {};
        eX_apps.terminal = terminal;
        eX_apps.music = music;

        mg_lStore("eX_apps", JSON.stringify(eX_apps));
        $("currentSetupStage").innerHTML = "<h1>Install System Applications</h1><p>eXastum includes a number of built in applications for you to use however you may not want to use all of them and would prefer to keep your menu clean with fewer apps. The default is to install them all but you may deselect the ones you don't want below.</p><div id='setupSysAppList'>"
        + "<input disabled type='checkbox'/>&#160;<label>Abby Photo Editor (Coming Soon)</label><br/>"
        + "<input disabled type='checkbox'/>&#160;<label>Browser (Coming Soon)</label><br/>"
        + "<input disabled type='checkbox'/>&#160;<label>Div Designer (Coming Soon)</label><br/>"
        + "<input checked type='checkbox'/>&#160;<label>eXastum Music</label><br/>"
        + "<input disabled type='checkbox'/>&#160;<label>eXastum Studio (Coming Soon)</label><br/>"
        + "<input checked type='checkbox'/>&#160;<label>Video Player</label><br/>"
        + "<input checked type='checkbox'/>&#160;<label>Text Editor</label><br/>"
        + "<input checked type='checkbox'/>&#160;<label>Stopwatch</label><br/>"
        + "<input disabled checked type='checkbox'/>&#160;<label>Terminal</label><br/>"
        + "</div>";
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
    var apps = JSON.parse(mg_lStore("eX_apps"));
    eX_spawnWindow(300, 250, apps[appName].name, apps[appName].url, "horizontal", true, true);
}

function eX_loadManifest(appName) {
}

function eX_clockLoop() {
    $("clock").innerText = " | " + mg_fDate() + " | " + mg_fTime();
    setTimeout(eX_clockLoop, 500);
}

function eX_installApp(manifest) {
    var obj = JSON.parse(manifest);
    var apps = mg_lStore("eX_apps");
    var app;
    app.name = obj.name;
    app.desc = obj.desc;
    app.url  = obj.url;
    apps[apps.length] = app;
    mg_lStore("eX_apps", apps);
}
