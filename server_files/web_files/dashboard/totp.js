/*
 * Functions to get, set, and manipulte cookie
 * containing tokens and to generate tokens from
 * TOTP passcodes
 */

var tokenCookie;

function checkAPIToken(callback) {
    tokenCookie = getCookie("apitoken");
    if (tokenCookie !== null && tokenCookie !== "") {
        callback(tokenCookie);
    } else {
        passcode = prompt("Please enter your passcode.");
        console.log("Verifying passcode " + passcode + "...");
        $.post("/verifykey", {key: passcode}, function(data) {
            console.log(data); // TESTINGNITSET
            if (data !== false) {
                setCookie("apitoken", data, 365);
                callback(data);
            } else {
                alert("Incorrect passcode.");
                callback(null);
            }
        }, "text");
    }
}

function getApiKey() { // TO BE REMOVED
    console.error("getApiKey is deprecated! Use getAuthKey()!");
    return null;
}

function getAuthKey(callback) {
    checkAPIToken(callback);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
