var socket = io();
var authed = false;
var textarea = document.getElementById("log");
var key = getApiKey();

socket.emit("auth", {action: "auth", apikey: key});

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

$(document).ready(function() {
    var $form = $('form');
    $form.submit(function() {
        var command = $("#command").val();
        console.log(command);
        $.post($(this).attr('action'), {
            Body: command,
            apikey: key
        }, function(response) {}, 'json');
        $('#command').val('');
        return false;
    });
});

function scrollToBottom() {
    $('#log').scrollTop($('#log')[0].scrollHeight);
}
