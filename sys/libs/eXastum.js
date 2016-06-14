var VERSION = "5.0.0.3-alpha";

function eXastumInit() {
    if (lStore("firstUse") !== "false")
        runSetup();
    $("buildNum").innerHTML = "eXastum Desktop<br/>Build " + VERSION;
    clockLoop();
}

function mainMenu() {
    if ($("mainMenu").style.display == "block")
        $("mainMenu").style.display = "none";
    else
        $("mainMenu").style.display = "block";
}

function showDock() {
    $("dock").style.bottom = "30px";
}

function runSetup() {
    $("overlay").style.display = "block";
    $("setup").style.display = "block";
}

function setupNext() {
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
        lStore("firstUse", "false");
        $("setupNextButton").setAttribute("onclick", "location.reload()");
    }
}

function systemReset() {
    lStore("firstUse", "del");
}

function eX_launchApp(appName) {
    loadManifest("sys/apps/" + appName + "/manifest.json");
    newWindow(300, 250, appName, "sys/apps/" + appName + "/index.html", "horizontal", true, true);
}

function loadManifest(appName) {
}

function clockLoop() {
    $("clock").innerText = " | " + fDate() + " | " + fTime();
    setTimeout(clockLoop, 500);
}
