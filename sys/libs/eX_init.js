function eX_init() {
    if (mg_lStore("firstUse") !== "false") eX_runSetup();
    $("buildNum").innerHTML = "eXastum Desktop<br/>Build " + eX_version;
    eX_initAudioSystem();
    eX_clockLoop();
    eX_scrsav_tmr = setTimeout(eX_startScrSav, eX_scrSavTime);
    document.addEventListener("mousemove", function () {eX_clearScrSav();});
    document.addEventListener("mousedown", function () {eX_clearScrSav();});
    document.addEventListener("keydown",   function () {eX_clearScrSav();});
}
