function eX_init() {
    if (mg_lStore("eX_1stUse") !== "false") eX_runSetup();
    $("buildNum").innerHTML = "eXastum Desktop<br/>Build " + eX_version;
    eX_initAudioSystem();
    eX_clockLoop();
    eX_scrsav_tmr = setTimeout(eX_startScrSav, eX_scrSavTime);
    document.addEventListener("mousemove", function () {eX_clearScrSav();});
    document.addEventListener("mousedown", function () {eX_clearScrSav();});
    document.addEventListener("keydown",   function () {eX_clearScrSav();});
}

function eX_reload() {
    location.reload();
}

function eX_shutdown() {
    window.close();
}
