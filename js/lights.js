var animationLength = 1.5;
$(document).ready(function() {
    var bulbs = '';
    for (var a = 0; a < 14; a++)
        bulbs += '<div class="bulb" style="background-image: url(img/lights/L'+a+'.png); animation-delay: '+a%animationLength+'s;"></div>'
    $('.lights').html(bulbs);
});