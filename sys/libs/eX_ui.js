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
            list += "<li onmouseover=\"eX_menuShowAppDetails('" + apps[app].name + "', '" + apps[app].developer + "', '" + apps[app].desc + "', '" + apps[app].icon_url + "')\" onmouseout=\"eX_menuShowAppDetails('eXastum 5', 'Brian Millar', 'The eXastum Web Desktop', 'sys/ui/skins/default/imgs/default_icon.png')\" onclick=\"eX_launchApp('" + app + "')\">" + apps[app].name + "</li>";
        $("appsList").innerHTML = list;
    }
}

function eX_menuShowAppDetails(appName, dev, desc, icon) {
    $("appMenuName").innerText = appName;
    $("appMenuDev").innerText = "Dev: " + dev;
    $("appMenuDesc").innerText = desc;
    $("appMenuIcon").src = icon;
}
