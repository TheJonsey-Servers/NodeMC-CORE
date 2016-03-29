var socket = io();
var authed = false;
var textarea = document.getElementById("log");
var key;

getAuthKey(function(authkey) {
    key = authkey;
    socket.emit("auth", {action: "auth", apikey: key});
});

socket.on("authstatus", function (status) {
    if (status == "auth success" || status == "authed") {
        authed = true;
        socket.emit("fulllog");
    } else if (status == "deauth success" || status == "auth failed" || status == "not authed") {
        authed = false;
    }
});

socket.on("fulllog", function (fulllog) {
    $("#log").val(fulllog);
    $("#log").change();
    scrollToBottom();
});

socket.on("appendlog", function (append) {
    textarea.value = textarea.value + append;
    $("#log").change();
    scrollToBottom();
});

// Not Socket.IOified yet - left in for completeness

function runCommand(command) {
    console.log(command);
    $.post($(this).attr('action'), {
        command: command,
        key: key
    }, function(response) {}, 'json');
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
  $.post('/restartserver', {authkey: key}, function() {});
});
$("#stop").click(function() {
  $.post('/stopserver', {authkey: key}, function() {});
  $("#start").show();
  $("#stop").hide();
});
$("#start").click(function() {
  $.post('/startserver', {authkey: key}, function() {});
  $("#stop").show();
  $("#start").hide();
});

function gettext() {
        var ban = "tempban " + document.getElementsByName('usr')[0].value + " " + document.getElementsByName('rsn')[0].value;
        $("#ban").click(function() {
         $.post('/command', {
         Body: ban,
         apikey: key
         },
         function(res){});
        });
}

// Hide start on page load
$(document).ready(function() {
  $("#start").hide();
});

function scrollToBottom() {
    $('#log').scrollTop($('#log')[0].scrollHeight);
}
