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
        var app;
        for (app in apps)
            list += "<li onmouseover=\"eX_menuShowAppDesc('" + apps[app].desc + "')\" onmouseout=\"eX_menuShowAppDesc('')\" onclick=\"eX_launchApp('" + app + "')\">" + apps[app].name + "</li>";
        $("appsList").innerHTML = list;
    }
}

function eX_menuShowAppDesc(desc) {
    $("appMenuDesc").innerText = desc;
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
        var browser      = {name: "Browser",       desc: "Browser Inception",                    url: "sys/apps/browser/index.html",      win_width: 800, win_height: 600, win_resize: true,  win_min: true,  win_max: true};
        var calculator   = {name: "Calculator",    desc: "Perform basic calculations",           url: "sys/apps/calculator/index.html",   win_width: 300, win_height: 350, win_resize: false, win_min: true,  win_max: false};
        var image_viewer = {name: "Image Viewer",  desc: "View Images",                          url: "sys/apps/image_viewer/index.html", win_width: 450, win_height: 400, win_resize: true,  win_min: true,  win_max: true};
        var music        = {name: "eXastum Music", desc: "The eXastum Music Application",        url: "sys/apps/music/index.html",        win_width: 450, win_height: 350, win_resize: true,  win_min: true,  win_max: true};
        var settings     = {name: "Settings",      desc: "eXastum System Settings",              url: "sys/apps/settings/index.html",     win_width: 450, win_height: 400, win_resize: false, win_min: true,  win_max: false};
        var stopwatch    = {name: "Stopwatch",     desc: "Time stuff",                           url: "sys/apps/stopwatch/index.html",    win_width: 300, win_height: 250, win_resize: false, win_min: true, win_max: false};
        var terminal     = {name: "Terminal",      desc: "The eXastum system terminal emulator", url: "sys/apps/terminal/index.html",     win_width: 450, win_height: 350, win_resize: true,  win_min: true,  win_max: true};
        var text_editor  = {name: "Text Editor",   desc: "A simple Text Editor",                 url: "sys/apps/text_editor/index.html",  win_width: 450, win_height: 350, win_resize: true,  win_min: true,  win_max: true};
        var video_player = {name: "Video Player",  desc: "Play Videos",                          url: "sys/apps/video_player/index.html", win_width: 450, win_height: 400, win_resize: true,  win_min: true,  win_max: true};

        var eX_apps = {};

        $("currentSetupStage").innerHTML = "<h1>Install System Applications</h1><p>eXastum includes a number of built in applications for you to use however you may not want to use all of them and would prefer to keep your menu clean with fewer apps. The default is to install them all but you may deselect the ones you don't want below.</p><div id='setupSysAppList'>"
        + "<input id='abbyInstallCheck' disabled type='checkbox'/>&#160;<label>Abby Photo Editor (Coming Soon)</label><br/>"
        + "<input id='browserInstallCheck' checked type='checkbox'/>&#160;<label>Browser</label><br/>"
        + "<input id='calcInstallCheck' checked type='checkbox'/>&#160;<label>Calculator</label><br/>"
        + "<input id='divDesInstallCheck' disabled type='checkbox'/>&#160;<label>Div Designer (Coming Soon)</label><br/>"
        + "<input id='imageViewInstallCheck' checked type='checkbox'/>&#160;<label>Image Viewer</label><br/>"
        + "<input id='musicInstallCheck' checked type='checkbox'/>&#160;<label>eXastum Music</label><br/>"
        + "<input id='eXStudioInstallCheck' disabled type='checkbox'/>&#160;<label>eXastum Studio (Coming Soon)</label><br/>"
        + "<input id='stopwatchInstallCheck' checked type='checkbox'/>&#160;<label>Stopwatch</label><br/>"
        + "<input id='terminalInstallCheck' checked type='checkbox'/>&#160;<label>Terminal</label><br/>"
        + "<input id='textEditInstallCheck' checked type='checkbox'/>&#160;<label>Text Editor</label><br/>"
        + "<input id='videoInstallCheck' checked type='checkbox'/>&#160;<label>Video Player</label><br/>"
        + "</div>";

        eX_apps.settings = settings;

        $("setupNextButton").innerText = "Finish";
        $("setupNextButton").removeAttribute("onclick");
        $("setupNextButton").addEventListener("click", function () {
            if ($("browserInstallCheck").checked)    eX_apps.browser      = browser;
            if ($("calcInstallCheck").checked)       eX_apps.calculator   = calculator;
            if ($("imageViewInstallCheck").checked)  eX_apps.image_viewer = image_viewer;
            if ($("musicInstallCheck").checked)      eX_apps.music        = music;
            if ($("stopwatchInstallCheck").checked)  eX_apps.stopwatch    = stopwatch;
            if ($("terminalInstallCheck").checked)   eX_apps.terminal     = terminal;
            if ($("textEditInstallCheck").checked)   eX_apps.text_editor  = text_editor;
            if ($("videoInstallCheck").checked)      eX_apps.video_player = video_player;

            mg_lStore("eX_apps", JSON.stringify(eX_apps));

            mg_lStore("firstUse", "false");
            location.reload();
        });
    }
}

function eX_systemReset() {
    mg_lStore("firstUse", "del");
}

function eX_launchApp(appName) {
    var apps = JSON.parse(mg_lStore("eX_apps"));
    eX_spawnWindow(apps[appName].win_width, apps[appName].win_height, apps[appName].name, apps[appName].url, apps[appName].win_resize, apps[appName].win_min, apps[appName].win_max);
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
