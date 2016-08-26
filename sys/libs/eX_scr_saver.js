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
