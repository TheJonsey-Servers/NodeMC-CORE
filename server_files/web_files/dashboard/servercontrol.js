var key;

getAuthKey(function(authkey) {
    key = authkey;
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