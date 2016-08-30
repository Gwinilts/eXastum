function eX_systemReset() {
    var cfrm = confirm("Are you sure you wish to delete all of your settings and return eXastum to it's default state?");
    if (cfrm) {
        mg_lStore("eX_user",   "del");
        mg_lStore("eX_skin",   "del");
        mg_lStore("eX_apps",   "del");
        mg_lStore("eX_1stUse", "del");
        alert("Reset Complete");
    }
}
