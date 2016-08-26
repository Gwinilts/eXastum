function eX_launchApp(appName) {
    var apps = JSON.parse(mg_lStore("eX_apps"));
    eX_spawnWindow(apps[appName].win_width, apps[appName].win_height, apps[appName].name, apps[appName].url, apps[appName].icon_url, apps[appName].win_resize, apps[appName].win_min, apps[appName].win_max, apps[appName].use_sys_skin);
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

function eX_removeApp(appName) {
    var apps = JSON.parse(mg_lStore("eX_apps"));
}
