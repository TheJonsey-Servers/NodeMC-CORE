/*
 * Functions to get, set, and manipulte cookie
 * containing API key for requests.
 */

var successful = false;
var tokenCookie;

function checkAPIToken() {
    tokenCookie = getCookie("apitoken");
    if (tokenCookie !== null && tokenCookie !== "") {
        return tokenCookie;
    } else {
        passcode = prompt("Please enter your passcode.");
        $.post("/verifyk", {token: passcode}, function(data) {
            if (data !== false) {
                setCookie("apitoken", data, 365);
                return data;
            } else {
                alert("Incorrect passcode.");
                return null;
            }
        }, "json");
    }
}

function getApiKey() { // TO BE REMOVED
    console.warn("getApiKey is deprecated! Use getAuthKey()!");
    return checkAPIToken();
}

function getAuthKey() {
    return checkAPIToken();
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

checkAPIToken();