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
