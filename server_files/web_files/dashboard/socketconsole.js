var socket = io();
var authed = false;
var textarea = document.getElementById("log");
var key;

function auth() {
    getAuthKey(function(authkey) {
        key = authkey;
        socket.emit("auth", {action: "auth", key: key});
    });
}

auth();

socket.on("authstatus", function (status) {
    console.log(status);
    if (status == "auth success" || status == "authed") {
        authed = true;
        socket.emit("fulllog");
    } else if (status == "deauth success" || status == "auth failed" || status == "not authed") {
        authed = false;
    }
});

socket.on("fulllog", function (fulllog) {
    $("#log").val(fulllog.split("\n").slice(-500).join("\n"));
    $("#log").change();
    scrollToBottom();
});

socket.on("appendlog", function (append) {
    $("#log").val($("#log").val().split("\n").slice(-500).join("\n") + append);
    $("#log").change();
    scrollToBottom();
});

// Not Socket.IOified yet - left in for completeness

function runCommand(command) {
    console.log(command);
    $.post("/command", {
        command: command,
        key: key
    }, function(response) {
        if (response == "Invalid API key") {
            authed = false;
            auth();
        }
    }, 'text');
}

$(document).ready(function() {
    var $form = $('form');
    $form.submit(function() {
        var command = $("#command").val();
        runCommand(command);
        $('#command').val('');
        return false;
    });
});

$("#restart").click(function() {
  $.post('/restartserver', {key: key}, function() {});
});
$("#stop").click(function() {
  $.post('/stopserver', {key: key}, function() {});
  $("#start").show();
  $("#stop").hide();
});
$("#start").click(function() {
  $.post('/startserver', {key: key}, function() {});
  $("#stop").show();
  $("#start").hide();
});

function gettext() {
        var ban = "tempban " + document.getElementsByName('usr')[0].value + " " + document.getElementsByName('rsn')[0].value;
        $("#ban").click(function() {
            runCommand(ban);
        });
}

// Hide start on page load
$(document).ready(function() {
  $("#start").hide();
});

function scrollToBottom() {
    $('#log').scrollTop($('#log')[0].scrollHeight);
}
