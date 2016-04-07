var key;

getAuthKey(function(authkey) {
    key = authkey;
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
         $.post('/command', {
         command: ban,
         key: key
         },
         function(res){});
        });
}

// Hide start on page load
$(document).ready(function() {
  $("#start").hide();
});