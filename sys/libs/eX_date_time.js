function eX_clockLoop() {
    $("clock").innerText = " | " + mg_fDate() + " | " + mg_fTime();
    setTimeout(eX_clockLoop, 500);
}
